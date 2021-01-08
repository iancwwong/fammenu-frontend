import React from 'react';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input';

const CreateEditFoodItemForm = (props) => (
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

        <ChipInput 
            id="createLabels"
            label="Labels"
            onChange={(chips) => props.handleLabelChips(chips)}
            placeholder="e.g meat; vegetable"
            newChipKeys={['Enter', ';']}
        />
    </div>
);

const handleChangeChips = (chips) => {
    console.log(chips);
}

export default CreateEditFoodItemForm;