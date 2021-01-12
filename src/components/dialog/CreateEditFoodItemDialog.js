import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import UpdateFeedbackSnackbar from '../feedback/UpdateFeedbackSnackbar';
import CreateEditFoodItemForm from '../forms/CreateEditFoodItemForm';

const dataClient = require('../../utils/DataClient');

export default class CreateEditFoodItemDialog extends React.Component {

    state = {
        nameError: undefined,
        cuisineError: undefined,
        labelsError: undefined,
        attemptedUpdateSuccessful: false
    }

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

    updateName = ((this.props.foodItemToUpdate) ? this.props.foodItemToUpdate.name : '');
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

    updateCuisine = ((this.props.foodItemToUpdate) ? this.props.foodItemToUpdate.cuisine : '');;
    handleOnChangeCuisine = () => {
        let candidateUpdateCuisine = document.getElementById('foodItemCuisine').value.toLowerCase();
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

    updateLabels = ((this.props.foodItemToUpdate) ? this.props.foodItemToUpdate.labels : []);
    handleOnChangeLabels = (chips) => {
        // Convert all labels to lowercase
        this.updateLabels = chips.map((chipLabel) => chipLabel.toLowerCase());
    }

    // The actual update
    handleUpdateFoodItem = (originalFoodItem) => {

        let foodItemToUpdate = {
            name: this.updateName,
            cuisine: this.updateCuisine,
            labels: this.updateLabels
        };

        if (this.updateMode === 'edit') {
            foodItemToUpdate.id = originalFoodItem.id;
            console.log("Editing food item from new edit/create dialog: " );
            console.log(foodItemToUpdate);

            dataClient.updateFoodItemById(
                foodItemToUpdate,
                (editedFoodItem) => {
                    this.triggerFeedbackSnackbar();
                    this.props.successFoodItemUpdateHandler(editedFoodItem)
                },
    
                // Error callback
                (err) => console.error(err)
            );
        }

        else if (this.updateMode === 'create') {
            console.log("Creating food item from new edit/create dialog: ");
            console.log(foodItemToUpdate);
            dataClient.createFoodItem(
                foodItemToUpdate,
                (createdFoodItem) => {
                    this.triggerFeedbackSnackbar();
                    this.props.successFoodItemUpdateHandler(createdFoodItem)
                },

                // Error callback
                (err) => console.error(err)
            );
        }
    }

    triggerFeedbackSnackbar = () => {
        this.setState(() => ({
            attemptedUpdateSuccessful: true
        }));
    }

    closeFeedbackSnackbar = () => {
        this.setState(() => ({
            attemptedUpdateSuccessful: false
        }));
    }

    // Initial render: Handle case of edit
    componentDidMount() {
        if (this.updateMode === 'create') {
            this.setState(() => ({
                nameError: 'No name supplied',
                cuisineError: 'No cuisine supplied'
            }));
        }
    }

    render() {
        return (
            <div>
                <Dialog 
                    open={!!this.updateMode}
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
                            Close
                        </Button>
                        <Button 
                            disabled={
                                this.state.nameError ||
                                this.state.cuisineError ||
                                this.state.labelsError}
                            onClick={() => this.handleUpdateFoodItem(this.props.foodItemToUpdate)}
                            style={(this.updateMode === 'edit') ? 
                                    {color: "green"} : {color:"primary"}}
                        >
                            {(this.updateMode === 'edit') ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>

                </Dialog>

                <UpdateFeedbackSnackbar
                    open={this.state.attemptedUpdateSuccessful}
                    onClose={this.closeFeedbackSnackbar}
                    updateMode={this.updateMode}
                />

            </div>
        );
    }
}
