import React from 'react';
import Navbar from '../components/Navbar';

import CreationError from '../components/createPage/CreationError';
import CreateFoodItemForm from '../components/createPage/CreateFoodItemForm';

export default class CreatePage extends React.Component {

    state = {
        createdFoodItem: undefined,
        error: undefined
    }

    handleCreateFoodItem = (createdFoodItem, errorObj) => {
        this.setState(() => ({
            createdFoodItem: createdFoodItem,
            error: errorObj
        }));
    }

    render() {
        return (
            <div>
                <Navbar />

                <h2>Create Page!</h2>

                {this.state.createdFoodItem && <p>Successfully created food item with id: {this.state.createdFoodItem.id}</p>}
                {this.state.error && <CreationError error={this.state.error} />}

                <CreateFoodItemForm handleCreateFoodItem={this.handleCreateFoodItem}/>
            </div>
        );
    }
}