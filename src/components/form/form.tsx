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

    const onSubmit = (data: FieldValues): void => {
        console.log(data);
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
                        {...register('prep-time', { required: true })}
                    />
                    {errors['prep-time']?.type === 'required' && (
                        <p role="alert">{ERROR_MESSAGE}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="dish-type">Type</label>
                    <select
                        id="dish-type"
                        defaultValue=""
                        {...register('dish-type', {
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
                    {errors['dish-type']?.type === 'required' && (
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
                                {...register('no-of-slices', {
                                    required: selectedType === 'pizza',
                                })}
                            />
                            {errors['no-of-slices']?.type === 'required' && (
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
                            {...register('spiciness', {
                                required: selectedType === 'soup',
                                min: 1,
                            })}
                        />
                        {errors.spiciness?.type === 'required' && (
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
                            {...register('slices-of-bread', {
                                required: selectedType === 'sandwich',
                                min: 1,
                            })}
                        />
                        {errors['slices-of-bread']?.type === 'required' && (
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
