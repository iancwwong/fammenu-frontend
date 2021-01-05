import React from 'react';
import { GraphQLClient, gql } from 'graphql-request';
const dataClient = require('../../utils/DataClient');

// -------------------------
export default class CreateFoodItemForm extends React.Component {

    handleCreateFoodItem = (eventObj) => {

        eventObj.preventDefault();

        // Sanitise inputs
        let name = eventObj.target.elements.name.value.trim();
        let cuisine = eventObj.target.elements.cuisine.value.trim();
        let labels = eventObj.target.elements.labels.value
                        .trim().split(";")
                        .map((label) => label.trim())
                        .filter((label) => label);          // Remove empty labels

        const newFoodItem = {
            name: name,
            cuisine: cuisine,
            labels: labels
        };

        dataClient.createFoodItem(newFoodItem, 

            // Success callback
            (createdFoodItem) => {
                this.props.handleCreateFoodItem(createdFoodItem, undefined);
            }, 
            
            // Error callback
            (err) => {
                console.error(err);
                this.props.handleCreateFoodItem(undefined, err);
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleCreateFoodItem}>
                    <label>
                        Name:
                        <input type="text" name="name" />
                    </label>
                    <br></br>
                    <label>
                        Cuisine:
                        <input type="text" name="cuisine" />
                    </label>
                    <br></br>
                    <label>
                        Labels:
                        <input type="text" name="labels" />
                    </label>
                    <br></br>
                    <button>Create</button>
                </form>
            </div>
        );
    }
}