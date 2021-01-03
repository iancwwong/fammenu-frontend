import React from 'react';

const FoodItem = (props) => (
    <div>
        <ul>
            <li key={props.foodItem.id + props.foodItem.name}>{props.foodItem.name}</li>
            <li key={props.foodItem.id + props.foodItem.cuisine}>{props.foodItem.cuisine}</li>
        </ul>
    </div>
);

export default FoodItem;