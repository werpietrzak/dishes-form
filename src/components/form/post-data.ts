import { FieldValues } from 'react-hook-form/dist/types';

export const postData = async (data: FieldValues): Promise<void> => {
    const {
        name,
        preparation_time,
        type,
        no_of_slices,
        diameter,
        spiciness_scale,
        slices_of_bread,
    } = data;

    const requestBody = {
        name,
        preparation_time,
        type,
        ...(type === 'pizza' && { no_of_slices }),
        ...(type === 'pizza' && { diameter }),
        ...(type === 'soup' && { spiciness_scale: spiciness_scale || 1 }),
        ...(type === 'sandwich' && { slices_of_bread }),
    };

    const URL =
        'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    };

    try {
        const response = await fetch(URL, options);
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.log(error);
    }
};
