import React from 'react';

import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input';

const CreateEditFoodItemForm = (props) => (
    <div>
        <TextField
            autoFocus
            id="foodItemName"
            label="Name"
            required
            error={!!props.nameError}
            helperText={props.nameError}
            type="text"
            fullWidth
            placeholder="e.g Boiled Vegetables"
            defaultValue={(props.foodItemToUpdate) ? props.foodItemToUpdate.name : ''}
            onChange={props.handleOnChangeName}
        />

        <TextField
            id="foodItemCuisine"
            label="Cuisine"
            required
            error={!!props.cuisineError}
            helperText={props.cuisineError}
            type="text"
            fullWidth
            placeholder="e.g chinese"
            defaultValue={(props.foodItemToUpdate) ? props.foodItemToUpdate.cuisine : ''}
            onChange={props.handleOnChangeCuisine}
        />

        <ChipInput 
            id="foodItemLabels"
            label="Labels"
            onChange={(chips) => props.handleOnChangeLabels(chips)}
            placeholder="e.g meat; vegetable"
            defaultValue={(props.foodItemToUpdate) ? props.foodItemToUpdate.labels : []}
            newChipKeys={['Enter', ';']}
        />
    </div>
);

export default CreateEditFoodItemForm;