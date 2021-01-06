import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const FoodItemResult = (props) => (
    <div>
        <ListItemAvatar>
            {getFoodItemAvatars(props.foodItem)}
        </ListItemAvatar>

        <ListItemText primary={props.foodItem.name}/>
    </div>
);
export default FoodItemResult;

// --------------------------------

const MEAT_AVATAR_PATH = './static/images/avatars/meat.svg';
const VEGETABLE_AVATAR_PATH = './static/images/avatars/cabbage.svg';
const WET_AVATAR_PATH = './static/images/avatars/drop.svg';
const SOUP_AVATAR_PATH = './static/images/avatars/soup.svg';
const SET_MEAL_AVATAR_PATH = './static/images/avatars/dinner.svg';
const UNKNOWN_AVATAR_PATH = './static/images/avatars/question.svg';

const getFoodItemAvatars = (foodItem) => (
    <Grid
        container
        direction="row"
    >
        {foodItem.labels.map((label) => determineFoodItemAvatar(label))}
    </Grid>
);

const determineFoodItemAvatar = (label) => {

    let avatarSrc = "";
    switch(label) {

        case 'vegetable':
            avatarSrc = VEGETABLE_AVATAR_PATH;
            break;

        case 'meat':
            avatarSrc = MEAT_AVATAR_PATH;
            break;

        case 'set meal':
            avatarSrc = SET_MEAL_AVATAR_PATH;
            break;
        
        case 'wet':
            avatarSrc = WET_AVATAR_PATH;
            break;

        case 'soup':
            avatarSrc = SOUP_AVATAR_PATH;
            break;

        default:
            avatarSrc = UNKNOWN_AVATAR_PATH;
    }

    return (
        <Avatar 
            alt={label}
            src={avatarSrc}
        />
    );
}

