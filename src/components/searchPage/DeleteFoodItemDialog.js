import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteFoodItemDialog = (props) => (
    <Dialog 
        open={!!props.foodItemToDelete}
        onClose={props.resetFoodItemToDelete}
    >
        <DialogTitle>Delete Food Item</DialogTitle>
        <p>Are you sure you want to remove the following food item?</p>
        <p>{props.foodItemToDelete.name}</p>
    </Dialog>
);

export default DeleteFoodItemDialog;