import React from 'react';

const EditPage = (props) => (
    <div>
        <p>This is the edit page!</p>
        <p>{props.match.params.foodItemId}</p>
    </div>
);

export default EditPage;