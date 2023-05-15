import React, { ChangeEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FieldError, FieldValues } from 'react-hook-form/dist/types';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    TextField,
} from '@mui/material';
import { postData } from './post-data';
import { DISH_TYPES } from '../../constants';

const ERROR_MESSAGES = {
    required: 'Field is required.',
    invalidValue: 'Please enter a valid value.',
};

export const Form: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleSelectType = (event: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedType(event.target.value);
    };

    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        setError,
    } = useForm();

    const validatePrepTime = (value: string): string | undefined =>
        value === '00:00:00' ? 'Please enter a valid value.' : undefined;

    const onSubmit = async (data: FieldValues): Promise<void> => {
        await postData(data, setError);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
                <TextField
                    type="text"
                    id="name"
                    label="Name"
                    size="small"
                    margin="normal"
                    sx={{ width: 200 }}
                    error={!!errors.name}
                    helperText={(errors.name as FieldError)?.message || ''}
                    {...register('name', { required: ERROR_MESSAGES.required })}
                />
            </Box>
            <Box>
                <TextField
                    type="time"
                    id="preparation_time"
                    label="Preparation time"
                    defaultValue="00:00:00"
                    inputProps={{ step: 1 }}
                    size="small"
                    margin="normal"
                    sx={{ width: 200 }}
                    error={!!errors.preparation_time}
                    helperText={
                        (errors.preparation_time as FieldError)?.message || ''
                    }
                    {...register('preparation_time', {
                        required: ERROR_MESSAGES.required,
                        validate: validatePrepTime,
                    })}
                />
            </Box>
            <Box>
                <FormControl size="small" margin="normal" sx={{ width: 200 }}>
                    <InputLabel id="type-label" error={!!errors.type}>
                        Type
                    </InputLabel>
                    <Select
                        id="type"
                        labelId="type-label"
                        label="Type"
                        defaultValue=""
                        error={!!errors.type}
                        {...register('type', {
                            required: ERROR_MESSAGES.required,
                            onChange: event => handleSelectType(event),
                        })}
                    >
                        {DISH_TYPES.map(({ label, value }) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                    {!!errors.type && (
                        <FormHelperText error>
                            {(errors.type as FieldError)?.message}
                        </FormHelperText>
                    )}
                </FormControl>
            </Box>
            {selectedType === 'pizza' && (
                <>
                    <Box>
                        <TextField
                            type="number"
                            id="no_of_slices"
                            label="Number of slices"
                            size="small"
                            margin="normal"
                            sx={{ width: 200 }}
                            error={!!errors.no_of_slices}
                            helperText={
                                (errors.no_of_slices as FieldError)?.message ||
                                ''
                            }
                            {...register('no_of_slices', {
                                required:
                                    selectedType === 'pizza' &&
                                    ERROR_MESSAGES.required,
                            })}
                        />
                    </Box>
                    <Box>
                        <TextField
                            type="number"
                            id="diameter"
                            label="Diameter"
                            size="small"
                            margin="normal"
                            sx={{ width: 200 }}
                            inputProps={{ step: 0.1 }}
                            error={!!errors.diameter}
                            helperText={
                                (errors.diameter as FieldError)?.message || ''
                            }
                            {...register('diameter', {
                                required:
                                    selectedType === 'pizza' &&
                                    ERROR_MESSAGES.required,
                            })}
                        />
                    </Box>
                </>
            )}
            {selectedType === 'soup' && (
                <Box>
                    <FormControl margin="normal" sx={{ width: 200 }}>
                        <label>Spiciness</label>
                        <Controller
                            name="spiciness_scale"
                            control={control}
                            render={({ field }) => (
                                <Slider
                                    size="small"
                                    min={1}
                                    max={10}
                                    step={1}
                                    marks={Array.from(
                                        { length: 10 },
                                        (_, i) => ({
                                            value: i + 1,
                                            label: i + 1,
                                        })
                                    )}
                                    onChange={(_, value) => {
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />
                    </FormControl>
                </Box>
            )}
            {selectedType === 'sandwich' && (
                <Box>
                    <TextField
                        type="number"
                        id="slices_of_bread"
                        label="Slices of bread"
                        size="small"
                        margin="normal"
                        sx={{ width: 200 }}
                        error={!!errors.slices_of_bread}
                        helperText={
                            (errors.slices_of_bread as FieldError)?.message ||
                            ''
                        }
                        {...register('slices_of_bread', {
                            required:
                                selectedType === 'sandwich' &&
                                ERROR_MESSAGES.required,
                        })}
                    />
                </Box>
            )}
            <Box>
                <FormControl margin="normal">
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </FormControl>
            </Box>
        </form>
    );
};
