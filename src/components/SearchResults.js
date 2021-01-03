import React from 'react';
import FoodItem from './FoodItem';

const SearchResults = (props) => (
    <div>
        <p>{props.foundFoodItems.length} food items found!</p>
        <ul>
            {props.foundFoodItems.map((foodItem) => 
            (
                <li key={foodItem.id}><FoodItem foodItem={foodItem} /></li>
            )
            )}
        </ul>
    </div>
);

export default SearchResults;