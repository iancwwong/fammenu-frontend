import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const UpdateFeedbackSnackbar = (props) => (
    <Snackbar 
        open={props.open}
        autoHideDuration={6000} 
        onClose={props.onClose}
    >
        <MuiAlert 
            elevation={6} 
            variant="filled" 
            onClose={props.onClose} 
            severity="success"
        >
            {(props.updateMode === 'edit') ? 'Successfully updated!' : 'Successfully created!'}
        </MuiAlert>
    </Snackbar>
);

export default UpdateFeedbackSnackbar;