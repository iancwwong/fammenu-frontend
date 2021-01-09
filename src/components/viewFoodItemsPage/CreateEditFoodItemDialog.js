import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input';

export default class CreateEditFoodItemDialog extends React.Component {

    state = {
        nameError: undefined,
        cuisineError: undefined,
        labelsError: undefined
    }

    updateMode = '';
    constructor(props) {
        // Safety check of updateMode
        super(props);
        if (props.updateMode === 'edit') {
            this.updateMode = 'edit';
        } else if (props.updateMode === 'create') {
            this.updateMode = 'create';
        } else {
            throw new Error('Incorrect update mode supplied to dialog: ' + props.updateMode);
        }
    }

    updateName = '';
    handleOnChangeName = () => {
        let candidateUpdateName = document.getElementById('foodItemName').value;
        if (!candidateUpdateName) {
            this.setState(() => ({
                nameError: 'Name not given'
            }));
        } else {
            this.setState(() => ({
                nameError: undefined
            }));
        }
        this.updateName = candidateUpdateName;
    }

    updateCuisine = '';
    handleOnChangeCuisine = () => {
        let candidateUpdateCuisine = document.getElementById('foodItemCuisine').value;      // Todo: Convert to lowercase
        if (!candidateUpdateCuisine) {
            this.setState(() => ({
                cuisineError: 'Cuisine not given'
            }));
        } else {
            this.setState(() => ({
                cuisineError: undefined
            }));
        }
        this.updateCuisine = candidateUpdateCuisine;
    }

    updateLabels = [];
    handleOnChangeLabels = (chips) => {
        // Todo: Sanitise chips??
        this.updateLabels = chips;
    }

    // The actual update
    handleUpdateFoodItem = (originalFoodItem) => {
        if (this.state.updateMode === 'edit') {
            console.log("Editing food item from new edit/create dialog: " );
            console.log(originalFoodItem);
        }

        else if (this.state.updateMode === 'create') {
            console.log("Creating food item from new edit/create dialog: ");
        }
    }

    render() {
        return (
            <Dialog 
                open={!!this.props.foodItemToUpdate}
                onClose={this.props.resetFoodItemToUpdate}
            >
                <DialogTitle>
                    {
                        (this.updateMode === 'edit') ?
                            ('Edit food item') : ('Create food item')
                    }
                </DialogTitle>
                <DialogContent>
                    <CreateEditFoodItemForm
                        foodItemToUpdate={this.props.foodItemToUpdate}
                        nameError={this.state.nameError}
                        handleOnChangeName={this.handleOnChangeName}
                        cuisineError={this.state.cuisineError}
                        handleOnChangeCuisine={this.handleOnChangeCuisine}
                        labelsError={this.state.labelsError}
                        handleOnChangeLabels={this.handleOnChangeLabels}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.resetFoodItemToUpdate} color="default">
                        Cancel
                    </Button>
                    <Button 
                        disabled={
                            this.state.nameError ||
                            this.state.cuisineError ||
                            this.state.labelsError}
                        onClick={() => this.handleUpdateFoodItem(this.props.foodItemToUpdate)}
                        style={(this.props.updateMode === 'edit') ? 
                                {color: "green"} : {color:"primary"}}
                    >
                        Update
                    </Button>
                </DialogActions>

            </Dialog>
        );
        
    }
}

// -----------------
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
