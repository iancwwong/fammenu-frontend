import React from 'react';

const FoodItem = (props) => (
    <div>
        <li key={props.foodItem.id + props.foodItem.name}>{props.foodItem.name}</li>
    </div>
);

export default FoodItem;