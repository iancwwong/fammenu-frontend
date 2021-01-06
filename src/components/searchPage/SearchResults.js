import React from 'react';
import FoodItemResult from './FoodItemResult';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const SearchResults = (props) => (
    <div>
        {
            (props.foundFoodItems && props.foundFoodItems.length > 0) ? 
                (<p>{props.foundFoodItems.length} food items found!</p>)
            :
                (<p>No results</p>)
        }

        {
            (props.foundFoodItems && props.foundFoodItems.length > 0) &&
            <Paper style={{maxHeight: 300, overflow: 'auto'}}>
                <List>
                    {props.foundFoodItems.map((foodItem) => 
                    (
                        <ListItem button component={Link} to={`/edit/${foodItem.id}`}>
                            <FoodItemResult foodItem={foodItem} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        }

    </div>
);

export default SearchResults;