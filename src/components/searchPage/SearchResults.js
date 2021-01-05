import React from 'react';
import FoodItem from './FoodItem';

const SearchResults = (props) => (
    <div>
        {
            (props.foundFoodItems && props.foundFoodItems.length > 0) ? 
                (<p>{props.foundFoodItems.length} food items found!</p>)
            :
                (<p>No results</p>)
        }
        {props.foundFoodItems.map((foodItem) => 
        (
            <FoodItem foodItem={foodItem} />
        ))}
    </div>
);

export default SearchResults;