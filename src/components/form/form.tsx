import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { DISH_TYPES } from '../../constants';
import './form.scss';

const CN = 'form';
const ERROR_MESSAGE = 'Field is required.';

export const Form: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: true })}
                    />
                    {errors.name?.type === 'required' && (
                        <p role="alert">{ERROR_MESSAGE}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="prep-time">Preparation time</label>
                    <input
                        type="time"
                        id="prep-time"
                        {...register('preparation_time', { required: true })}
                    />
                    {errors['preparation_time']?.type === 'required' && (
                        <p role="alert">{ERROR_MESSAGE}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="dish-type">Type</label>
                    <select
                        id="dish-type"
                        defaultValue=""
                        {...register('type', {
                            required: true,
                            onChange: event => handleSelectType(event),
                        })}
                    >
                        <option value="" className={`${CN}__select-option`} />
                        {DISH_TYPES.map(({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    {errors.type?.type === 'required' && (
                        <p role="alert">{ERROR_MESSAGE}</p>
                    )}
                </div>
                {selectedType === 'pizza' && (
                    <>
                        <div>
                            <label htmlFor="no-of-slices">
                                Number of slices
                            </label>
                            <input
                                type="number"
                                id="no-of-slices"
                                {...register('no_of_slices', {
                                    required: selectedType === 'pizza',
                                })}
                            />
                            {errors['no_of_slices']?.type === 'required' && (
                                <p role="alert">{ERROR_MESSAGE}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="diameter">Diameter</label>
                            <input
                                type="number"
                                id="diameter"
                                {...register('diameter', {
                                    required: selectedType === 'pizza',
                                })}
                            />
                            {errors.diameter?.type === 'required' && (
                                <p role="alert">{ERROR_MESSAGE}</p>
                            )}
                        </div>
                    </>
                )}
                {selectedType === 'soup' && (
                    <div>
                        <label htmlFor="spiciness">Spiciness</label>
                        <input
                            type="range"
                            id="spiciness"
                            min={0}
                            max={10}
                            defaultValue={0}
                            {...register('spiciness_scale', {
                                required: selectedType === 'soup',
                                min: 1,
                            })}
                        />
                        {errors['spiciness_scale']?.type === 'required' && (
                            <p role="alert">{ERROR_MESSAGE}</p>
                        )}
                    </div>
                )}
                {selectedType === 'sandwich' && (
                    <div>
                        <label htmlFor="slices-of-bread">Slices of bread</label>
                        <input
                            type="number"
                            id="slices-of-bread"
                            {...register('slices_of_bread', {
                                required: selectedType === 'sandwich',
                                min: 1,
                            })}
                        />
                        {errors['slices_of_bread']?.type === 'required' && (
                            <p role="alert">{ERROR_MESSAGE}</p>
                        )}
                    </div>
                )}
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
};
