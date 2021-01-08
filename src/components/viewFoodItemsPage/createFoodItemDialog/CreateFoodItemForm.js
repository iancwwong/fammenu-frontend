import React from 'react';
import TextField from '@material-ui/core/TextField';
import CreateFoodItemDialog from '../CreateFoodItemDialog';

const CreateFoodItemForm = (props) => (
    <div>
        <TextField
            autoFocus
            id="createName"
            label="Name"
            required
            error={!!props.nameError}
            helperText={props.nameError}
            type="text"
            fullWidth
            placeholder="e.g Boiled Vegetables"
            onChange={props.handleValidateCreateForm}
        />

        <TextField
            id="createCuisine"
            label="Cuisine"
            required
            error={!!props.cuisineError}
            helperText={props.cuisineError}
            type="text"
            fullWidth
            placeholder="e.g chinese"
            onChange={props.handleValidateCreateForm}
        />

        <TextField
            id="createLabels"
            label="Labels"
            type="text"
            fullWidth
            placeholder="e.g meat; assortment"
            onChange={props.handleValidateUpdateForm}
        />
    </div>
);

export default CreateFoodItemForm;