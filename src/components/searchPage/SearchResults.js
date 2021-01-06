import React from 'react';
import FoodItemResult from './FoodItemResult';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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

                            <ListItemSecondaryAction onClick={(foodItem) => props.handleDeleteFoodItem(foodItem)}>
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