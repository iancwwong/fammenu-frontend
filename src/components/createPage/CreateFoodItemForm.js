import React from 'react';
import { GraphQLClient, gql } from 'graphql-request';
const dataClient = require('../../utils/DataClient');

// -------------------------
export default class CreateFoodItemForm extends React.Component {

    state = {
        readyToCreate: false
    }

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

    checkReadyToCreate = () => {
        const isNameEmpty = document.getElementById('nameField').value.length == 0;
        const isCuisineEmpty = document.getElementById('cuisineField').value.length == 0;
        // No need to check for labels
        this.setState(() => ({
            readyToCreate: (!isNameEmpty) && (!isCuisineEmpty)
        }));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleCreateFoodItem}>
                    <label>
                        Name:
                        <input type="text" id="nameField" name="name" onChange={this.checkReadyToCreate}/>
                    </label>
                    <br></br>
                    <label>
                        Cuisine:
                        <input type="text" id="cuisineField" name="cuisine" onChange={this.checkReadyToCreate}/>
                    </label>
                    <br></br>
                    <label>
                        Labels:
                        <input type="text" id="labelsField" name="labels"/>
                    </label>
                    <br></br>
                    <button disabled={!this.state.readyToCreate}>Create</button>
                </form>
            </div>
        );
    }
}