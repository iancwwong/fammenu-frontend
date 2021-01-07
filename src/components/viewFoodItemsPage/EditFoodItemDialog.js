import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const dataClient = require('../../utils/DataClient');

export default class EditFoodItemDialog extends React.Component {

    state = {
        nameError: undefined,
        cuisineError: undefined,
        labelsError: undefined
    }

    handleValidateUpdateForm = () => {
        // Get values of update fields
        let name = document.getElementById('editName').value.trim();
        let cuisine = document.getElementById('editCuisine').value.trim();
        let labels = document.getElementById('editLabels').value
                        .trim().split(";")
                        .map((label) => label.trim())
                        .filter((label) => label);          // Remove empty labels

        // Validate fields
        if (!name) {
            this.setState(() => ({
                nameError: "Name not given"
            }));
        } else {
            this.setState(() => ({
                nameError: undefined
            }))
        }

        if (!cuisine) {
            this.setState(() => ({
                cuisineError: "Cuisine not given"
            }));
        } else {
            this.setState(() => ({
                cuisineError: undefined
            }));
        }
    }

    handleUpdateFoodItem = (originalFoodItem) => {
        // Get values of update fields
        let name = document.getElementById('editName').value.trim();
        let cuisine = document.getElementById('editCuisine').value.trim();
        let labels = document.getElementById('editLabels').value
                        .trim().split(";")
                        .map((label) => label.trim())
                        .filter((label) => label);          // Remove empty labels

        const foodItemToUpdate = {
            id: originalFoodItem.id,
            name: name,
            cuisine: cuisine,
            labels: labels
        };
        console.log("Updating food item: ");
        console.log(foodItemToUpdate);
                                    
        dataClient.updateFoodItemById(
            foodItemToUpdate,
            this.props.resetFoodItemToEditAfterSuccessfulEdit,

            // Error callback
            (err) => console.error(err));
    }

    render() {
        return (
            <Dialog 
                open={!!this.props.foodItemToEdit}
                onClose={this.props.resetFoodItemToEdit}
            >
                <DialogTitle>Edit Food Item</DialogTitle>
        
                <DialogContent>
                    <DialogContentText>
                        Details for '{this.props.foodItemToEdit.name}'...
                    </DialogContentText>
        
                    <TextField
                        autoFocus
                        id="editName"
                        label="Name"
                        required
                        error={!!this.state.nameError}
                        helperText={this.state.nameError}
                        type="text"
                        fullWidth
                        defaultValue={this.props.foodItemToEdit.name}
                        onChange={this.handleValidateUpdateForm}
                    />
        
                    <TextField
                        id="editCuisine"
                        label="Cuisine"
                        required
                        error={!!this.state.cuisineError}
                        helperText={this.state.cuisineError}
                        type="text"
                        fullWidth
                        defaultValue={this.props.foodItemToEdit.cuisine}
                        onChange={this.handleValidateUpdateForm}
                    />
        
                    <TextField
                        id="editLabels"
                        label="Labels"
                        type="text"
                        fullWidth
                        defaultValue={this.props.foodItemToEdit.labels.join("; ")}
                        onChange={this.handleValidateUpdateForm}
                    />
        
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.resetFoodItemToEdit} color="default">
                        Cancel
                    </Button>
                    <Button 
                        disabled={
                            this.state.nameError ||
                            this.state.cuisineError ||
                            this.state.labelsError}
                        onClick={() => this.handleUpdateFoodItem(this.props.foodItemToEdit)}
                        style={{color: "green"}}
                    >
                        Update
                    </Button>
                </DialogActions>
        
            </Dialog>
        );
    }
}