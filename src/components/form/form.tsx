import React, { ChangeEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import {
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    TextField,
} from '@mui/material';
import { DISH_TYPES } from '../../constants';

const ERROR_MESSAGES = {
    required: 'Field is required.',
    invalidValue: 'Please enter a valid value.',
};

export const Form: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const validatePrepTime = (value: string): string | undefined =>
        value === '00:00:00' ? 'Please enter a valid value.' : undefined;

    const handleSelectType = (event: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedType(event.target.value);
    };

    const onSubmit = async (data: FieldValues): Promise<void> => {
        console.log(data);

        const URL =
            'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(URL, options);
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <TextField
                    type="text"
                    id="name"
                    label="Name"
                    size="small"
                    margin="normal"
                    error={errors.name?.type === 'required'}
                    helperText={
                        errors.name?.type === 'required'
                            ? ERROR_MESSAGES.required
                            : ''
                    }
                    sx={{ width: 200 }}
                    {...register('name', { required: true })}
                />
            </div>
            <div>
                <TextField
                    type="time"
                    id="prep-time"
                    label="Preparation time"
                    size="small"
                    defaultValue="00:00:00"
                    inputProps={{ step: 1 }}
                    margin="normal"
                    sx={{ width: 200 }}
                    error={!!errors['preparation_time']}
                    helperText={
                        !!errors['preparation_time']
                            ? ERROR_MESSAGES.invalidValue
                            : ''
                    }
                    {...register('preparation_time', {
                        required: true,
                        validate: validatePrepTime,
                    })}
                />
            </div>
            <div>
                <FormControl margin="normal" size="small" sx={{ width: 200 }}>
                    <InputLabel
                        id="dish-type-label"
                        error={errors.type?.type === 'required'}
                    >
                        Type
                    </InputLabel>
                    <Select
                        labelId="dish-type-label"
                        id="dish-type"
                        label="Type"
                        defaultValue=""
                        error={errors.type?.type === 'required'}
                        {...register('type', {
                            required: true,
                            onChange: event => handleSelectType(event),
                        })}
                    >
                        {DISH_TYPES.map(({ label, value }) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.type?.type === 'required' && (
                        <FormHelperText error>
                            {ERROR_MESSAGES.required}
                        </FormHelperText>
                    )}
                </FormControl>
            </div>
            {selectedType === 'pizza' && (
                <>
                    <div>
                        <TextField
                            type="number"
                            id="no-of-slices"
                            label="Number of slices"
                            size="small"
                            margin="normal"
                            inputProps={{ min: 1 }}
                            error={errors['no_of_slices']?.type === 'required'}
                            helperText={
                                errors['no_of_slices']?.type === 'required'
                                    ? ERROR_MESSAGES.required
                                    : ''
                            }
                            sx={{ width: 200 }}
                            {...register('no_of_slices', {
                                required: selectedType === 'pizza',
                            })}
                        />
                    </div>
                    <div>
                        <TextField
                            type="number"
                            id="diameter"
                            label="Diameter"
                            size="small"
                            margin="normal"
                            inputProps={{ min: 0.1, step: 0.1 }}
                            error={errors.diameter?.type === 'required'}
                            helperText={
                                errors.diameter?.type === 'required'
                                    ? ERROR_MESSAGES.required
                                    : ''
                            }
                            sx={{ width: 200 }}
                            {...register('diameter', {
                                required: selectedType === 'pizza',
                            })}
                        />
                    </div>
                </>
            )}
            {selectedType === 'soup' && (
                <div>
                    <FormControl margin="normal" sx={{ width: 200 }}>
                        <label>Spiciness</label>
                        <Controller
                            name="spiciness_scale"
                            control={control}
                            /*TO DO: add requirements to this field
                        {...register('spiciness_scale', {
                            required: selectedType === 'soup',
                            min: 1,
                        })}*/
                            render={({ field }) => (
                                <Slider
                                    step={1}
                                    min={0}
                                    max={10}
                                    marks={Array.from(Array(11).keys()).map(
                                        el => ({
                                            value: el,
                                            label: el !== 0 ? el : '',
                                        })
                                    )}
                                    onChange={(_, value) => {
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />
                        {errors['spiciness_scale']?.type === 'required' && (
                            <p role="alert">{ERROR_MESSAGES.required}</p>
                        )}
                    </FormControl>
                </div>
            )}
            {selectedType === 'sandwich' && (
                <div>
                    <TextField
                        type="number"
                        id="slices-of-bread"
                        label="Slices of bread"
                        size="small"
                        margin="normal"
                        error={errors['slices_of_bread']?.type === 'required'}
                        helperText={
                            errors['slices_of_bread']?.type === 'required'
                                ? ERROR_MESSAGES.required
                                : ''
                        }
                        sx={{ width: 200 }}
                        {...register('slices_of_bread', {
                            required: selectedType === 'sandwich',
                            min: 1,
                        })}
                    />
                </div>
            )}
            <div>
                <FormControl margin="normal">
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </FormControl>
            </div>
        </form>
    );
};
