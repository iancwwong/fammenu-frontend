import React from 'react';

// Used to display a meaningful error message to user when food item is created
const CreationError = (props) => (
    <div>
        <p>Error: {getErrorMessage(props.error)}</p>
    </div>
);

const getErrorMessage = (err) => {

    // Not sure what other error objects could look like
    try {
        const exception = err.response.errors[0].extensions.exception;
        let errorMsg = '';
        switch(exception.name) {
            case 'MongoError':
                switch(exception.code) {
                    
                    // Duplicate key error
                    case 11000:
                        errorMsg = 'Food Item already exists with this name';
                        break;
    
                    default:
                        errorMsg = 'MongoError: Code ' + exception.code;
                }
                break;
    
            // Some unencountered error
            default:
                errorMsg = JSON.stringify(exception);
        }
        return errorMsg;
    } catch (err) {
        return err;
    }
 
}

export default CreationError;