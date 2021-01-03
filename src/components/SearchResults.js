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