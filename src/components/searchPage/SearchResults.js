import React from 'react';
import FoodItemResult from './FoodItemResult';

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
            <FoodItemResult foodItem={foodItem} />
        ))}
    </div>
);

export default SearchResults;