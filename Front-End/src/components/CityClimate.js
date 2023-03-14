import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function CityClimate({ exercise }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>           
        </tr>
    );
}

export default CityClimate;