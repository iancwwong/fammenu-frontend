import React from 'react';
import { GraphQLClient, gql } from 'graphql-request';

// Todo: Move the query and backend URL to separate configuration / file
const MUTATION_CREATE_FOOD_ITEM = gql `
    mutation AddFoodItem($name:String!,$cuisine:String!,$labels:[String!]!) {
        addFoodItem(name:$name,cuisine:$cuisine,labels:$labels) {
        id
        name
        cuisine
        labels
        }
    }
`;

const BACKEND_URL = 'http://127.0.0.1:3000/graphql';

// -------------------------
export default class CreateFoodItemForm extends React.Component {

    graphqlClient = new GraphQLClient(BACKEND_URL);

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

        console.log("Creating new food item: ")
        console.log(newFoodItem);

        this.graphqlClient.request(MUTATION_CREATE_FOOD_ITEM, newFoodItem)
        .then((data) => {
            console.log(data);
            if (!data.addFoodItem) {
                console.log("Whoops, no food item was created!");
            } else {
                console.log("Successfully created food item!");
                this.props.handleCreateFoodItem(data.addFoodItem, undefined);
            }
        })
        .catch((err) => {
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