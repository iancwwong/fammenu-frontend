import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

const dataClient = require('../../utils/DataClient');

const EditFoodItemDialog = (props) => (
    <Dialog 
        open={!!props.foodItemToEdit}
        onClose={props.resetFoodItemToEdit}
    >
        <DialogTitle>Edit Food Item</DialogTitle>

        <DialogContent>
            <DialogContentText>
                Editing '{props.foodItemToEdit.name}'...
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.resetFoodItemToEdit} color="default">
                Cancel
            </Button>
            <Button 
                onClick={() => dataClient.updateFoodItemById(
                    props.foodItemToEdit,
                    
                    // Success callback
                    props.resetFoodItemToEditAfterSuccessfulEdit,

                    // Error callback
                    (err) => console.error(err))} 
                style={{color: "green"}}
            >
                Update
            </Button>
        </DialogActions>

    </Dialog>
);

export default EditFoodItemDialog;