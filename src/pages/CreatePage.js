import React from 'react';
import Navbar from '../components/Navbar';
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

export default class CreatePage extends React.Component {

    state = {
        createdFoodItem: undefined,
        error: undefined,
        attemptedToCreateFoodItem: false
    }

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
            this.setState(() => ({
                attemptedToCreateFoodItem: true
            }));
            console.log(data);
            if (!data.addFoodItem) {
                console.log("Whoops, no food item was created!");
            } else {
                console.log("Successfully created food item!");
                this.setState(() => ({
                    createdFoodItem: data.addFoodItem
                }));
            }
        })
        .catch((err) => {
            console.error(err);
            const exceptionObj = err.response.errors[0].extensions.exception;
            this.handleFoodItemCreationErrors(exceptionObj);
        });
    }

    // Used to display the error meaningfully to the user
    handleFoodItemCreationErrors = (exception) => {

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

        this.setState(() => ({
            attemptedToCreateFoodItem: true,
            error: errorMsg
        }));
    }

    render() {
        return (
            <div>
                <Navbar />

                <h2>Create Page!</h2>

                {this.state.createdFoodItem && <p>Successfully created food item with id: {this.state.createdFoodItem.id}</p>}
                <p>Error: {this.state.error}</p>

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