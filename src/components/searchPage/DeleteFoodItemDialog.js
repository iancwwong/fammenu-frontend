import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

const dataClient = require('../../utils/DataClient');

const DeleteFoodItemDialog = (props) => (
    <Dialog 
        open={!!props.foodItemToDelete}
        onClose={props.resetFoodItemToDelete}
    >
        <DialogTitle>Delete Food Item</DialogTitle>

        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete the food item '{props.foodItemToDelete.name}'?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.resetFoodItemToDelete} color="default">
                Cancel
            </Button>
            <Button 
                onClick={() => dataClient.deleteFoodItem(
                    props.foodItemToDelete,
                    
                    // Success callback
                    props.resetFoodItemToDeleteAfterSuccessfulDeletion,

                    // Error callback
                    (err) => console.error(err))} 
                style={{color: "red"}}
            >
                Delete
            </Button>
        </DialogActions>

    </Dialog>
);

export default DeleteFoodItemDialog;