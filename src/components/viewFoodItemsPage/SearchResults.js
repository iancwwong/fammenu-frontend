import React from 'react';
import FoodItemResult from './FoodItemResult';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const SearchResults = (props) => (
    <div>
        <h3>
            {
                (props.foundFoodItems && props.foundFoodItems.length > 0) ? 
                    (<p>{props.foundFoodItems.length} food items found!</p>)
                :
                    (<p>No results</p>)
            }
        </h3>

        {
            (props.foundFoodItems && props.foundFoodItems.length > 0) &&
            <Paper style={{maxHeight: 400, overflow: 'auto'}}>
                <List>
                    {props.foundFoodItems.map((foodItem) => 
                    (
                        <ListItem button onClick={() => props.triggerFoodItemUpdate(foodItem, 'edit')}>
                            <FoodItemResult foodItem={foodItem} />  
                            <ListItemSecondaryAction onClick={() => props.handleDeleteFoodItem(foodItem)}>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>  
                        </ListItem>
                    ))}
                </List>
            </Paper>
        }
    </div>
);

export default SearchResults;