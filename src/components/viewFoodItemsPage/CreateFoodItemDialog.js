import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import CreateEditFoodItemForm from './createFoodItemDialog/CreateEditFoodItemForm';

const dataClient = require('../../utils/DataClient');

export default class CreateFoodItemDialog extends React.Component {

    state = {
        nameError: "Please supply",
        cuisineError: "Please supply",
        labelsError: undefined
    }

    handleValidateCreateForm = () => {
        // Get values of update fields
        let name = document.getElementById('createName').value.trim();
        let cuisine = document.getElementById('createCuisine').value.trim();    // Todo: Convert to lowercase

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

    labelChips = [];
    handleLabelChips = (chips) => {
        // Todo: Sanitise chips??
        this.labelChips = chips;
    }

    handleCreateFoodItem = () => {
        // Get values of update fields
        let name = document.getElementById('createName').value.trim();
        let cuisine = document.getElementById('createCuisine').value.trim();

        const foodItemToCreate = {
            name: name,
            cuisine: cuisine,
            labels: this.labelChips
        };
        dataClient.createFoodItem(
            foodItemToCreate,
            this.props.handleCreateFoodItem,
            (err) => console.log(err)
        );
    }

    render() {
        return (
            <Dialog 
                open
                onClose={this.props.resetCreatingFoodItem}
            >
                <DialogTitle>Create Food Item</DialogTitle>
        
                <DialogContent>

                    <CreateEditFoodItemForm 
                        nameError={this.state.nameError}
                        cuisineError={this.state.cuisineError}
                        labelsError={this.state.labelsError}
                        handleValidateCreateForm={this.handleValidateCreateForm}
                        handleOnChangeName={this.handleOnChangeName}
                        handleLabelChips={this.handleLabelChips}
                    />
        
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.resetCreatingFoodItem} color="default">
                        Cancel
                    </Button>
                    <Button 
                        disabled={
                            (this.state.nameError ||
                            this.state.cuisineError ||
                            this.state.labelsError)}
                        onClick={() => this.handleCreateFoodItem()}
                        color="primary"
                    >
                        Create
                    </Button>
                </DialogActions>
        
            </Dialog>
        );
    }
}