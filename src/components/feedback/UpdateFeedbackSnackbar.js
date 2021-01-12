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
            severity={(props.updateErrorMessage) ? 'error' : 'success'}
        >

            { !(props.updateErrorMessage) && (props.updateMode === 'edit') && 'Successfully updated!' }
            { !(props.updateErrorMessage) && (props.updateMode === 'create') && 'Successfully created!' }
            { (props.updateErrorMessage) && 'Error: ' + props.updateErrorMessage }
        </MuiAlert>
    </Snackbar>
);

export default UpdateFeedbackSnackbar;