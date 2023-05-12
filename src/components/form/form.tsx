import React from 'react';
import { DISH_TYPES } from '../../constants';

export const Form: React.FC = () => (
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
                <select id="dish-type">
                    {DISH_TYPES.map(({ label, value }) => (
                        <option value={value}>{label}</option>
                    ))}
                </select>
            </div>
            {/* for pizza */}
            <div>
                <label htmlFor="no-of-slices">Number of slices</label>
                <input type="number" id="no-of-slices" />
            </div>
            <div>
                <label htmlFor="diameter">Diameter</label>
                <input type="number" id="diameter" />
            </div>
            {/* for soup */}
            <div>
                <label htmlFor="spiciness">Spiciness</label>
                <input type="range" id="spiciness" min={1} max={10} />
            </div>
            {/* for sandwich */}
            <div>
                <label htmlFor="slices-of-bread">Slices of bread</label>
                <input type="number" id="slices-of-bread" min={1} />
            </div>
            <div>
                <input type="submit" value="Submit" />
            </div>
        </form>
    </div>
);
