import React, { ChangeEvent, useState } from 'react';
import { DISH_TYPES } from '../../constants';
import './form.scss';

const CN = 'form';

export const Form: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleSelectType = (event: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedType(event.target.value);
    };

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                </div>
                <div>
                    <label htmlFor="prep-time">Preparation time</label>
                    <input type="time" id="prep-time" />
                </div>
                <div>
                    <label htmlFor="dish-type">Type</label>
                    <select
                        id="dish-type"
                        defaultValue=""
                        onChange={handleSelectType}
                    >
                        <option value="" className={`${CN}__select-option`} />
                        {DISH_TYPES.map(({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedType === 'pizza' && (
                    <>
                        <div>
                            <label htmlFor="no-of-slices">
                                Number of slices
                            </label>
                            <input type="number" id="no-of-slices" />
                        </div>
                        <div>
                            <label htmlFor="diameter">Diameter</label>
                            <input type="number" id="diameter" />
                        </div>
                    </>
                )}
                {selectedType === 'soup' && (
                    <div>
                        <label htmlFor="spiciness">Spiciness</label>
                        <input type="range" id="spiciness" min={1} max={10} />
                    </div>
                )}
                {selectedType === 'sandwich' && (
                    <div>
                        <label htmlFor="slices-of-bread">Slices of bread</label>
                        <input type="number" id="slices-of-bread" min={1} />
                    </div>
                )}
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
};
