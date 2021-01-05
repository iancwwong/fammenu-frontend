import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const FoodItemResult = (props) => (
    <div>
        <Avatar alt={props.foodItem.id} src={determineFoodItemAvatar(props.foodItem)}/>
        <ListItemText primary={props.foodItem.name}/>
    </div>
);

const MEAT_AVATAR_PATH = './static/images/avatars/meat.svg';
const VEGETABLE_AVATAR_PATH = './static/images/avatars/cabbage.svg';
const WET_AVATAR_PATH = './static/images/avatars/drop.svg';
const SOUP_AVATAR_PATH = './static/images/avatars/soup.svg';
const SET_MEAL_AVATAR_PATH = './static/images/avatars/dinner.svg';
const UNKNOWN_AVATAR_PATH = './static/images/avatars/question.svg';

const determineFoodItemAvatar = (foodItem) => {

    if (foodItem.labels.includes('vegetable')) {
        return VEGETABLE_AVATAR_PATH;
    }

    else if (foodItem.labels.includes('meat')) {
        return MEAT_AVATAR_PATH;
    }

    else if (foodItem.labels.includes('set meal')) {
        return SET_MEAL_AVATAR_PATH;
    }

    else if (foodItem.labels.includes('wet')) {
        return WET_AVATAR_PATH;
    }

    else if (foodItem.labels.includes('soup')) {
        return SOUP_AVATAR_PATH;
    }

    // undetermined
    else {
        return UNKNOWN_AVATAR_PATH;
    }

}

export default FoodItemResult;