import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const FoodItemResult = (props) => (
    <div>
        <ListItemAvatar>
            <Grid
                container
                direction="row"
            >
                {props.foodItem.labels.map((label) => determineFoodItemAvatar(label))}
            </Grid>
        </ListItemAvatar>

        <ListItemText primary={props.foodItem.name}/>

        <Grid direction="row">
            {props.foodItem.labels.map(
                (label) => getFoodItemLabelChip(label)
            )}
        </Grid>
    </div>
);
export default FoodItemResult;

// --------------------------------

const MEAT_AVATAR_PATH = './static/images/avatars/meat.svg';
const VEGETABLE_AVATAR_PATH = './static/images/avatars/cabbage.svg';
const WET_AVATAR_PATH = './static/images/avatars/drop.svg';
const SOUP_AVATAR_PATH = './static/images/avatars/soup.svg';
const SET_MEAL_AVATAR_PATH = './static/images/avatars/dinner.svg';
const FISH_AVATAR_PATH = './static/images/avatars/fish.svg'

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

        case 'seafood':
            avatarSrc = FISH_AVATAR_PATH;
            break;

        default:
            return;
    }

    return (
        <Avatar 
            alt={label}
            src={avatarSrc}
        />
    );
}

const getFoodItemLabelChip = (label) => {
    let color = "";

    switch(label) {

        case 'vegetable':
            color = "ForestGreen";
            break;

        case 'meat':
            color = "crimson";
            break;

        case 'set meal':
            color = "blue";
            break;
        
        case 'wet':
            color = "teal";
            break;

        case 'soup':
            color = "violet";
            break;

        case 'seafood':
            color = "aqua";
            break;

        default:
            return;
    }
    
    return (
        <Chip 
            size="small" 
            label={label} 
            style={{color:color}}
            variant='outlined'
        />
    );
};