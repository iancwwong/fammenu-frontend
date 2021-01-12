// This file is used to decipher errors
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
    } catch (interpretError) {
        // Some undeciphered error - return a JSON string of original one
        return JSON.stringify(err);
    }
}

module.exports = {
    getErrorMessage
}