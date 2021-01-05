import React from 'react';
import { Link } from 'react-router-dom';

const FoodItem = (props) => (
    <div>
        <ul>
            <li key={props.foodItem.id + props.foodItem.name}>
                {props.foodItem.name}
                <Link to={`/edit/${props.foodItem.id}`}>
                    <button>Edit</button>
                </Link>
            </li>
        </ul>
    </div>
);

export default FoodItem;