import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';

const FoodItemResult = (props) => (
    <div>
        <ListItemText primary={props.foodItem.name}/>
    </div>
);

export default FoodItemResult;