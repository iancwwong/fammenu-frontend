// This file is used for data query / manipulation with back end
import { GraphQLClient, gql } from 'graphql-request';

// ------------------------
// GLOBAL VARS
// ------------------------
// GraphQL query to search for food items by generic term
const QUERY_SEARCH_BY_ID = gql `
    query SearchFoodItemsById($id:ID!) {
        getFoodItemById(id:$id) {
        id
        name
        cuisine
        labels
        }
    }
`;

// Backend URL for querying
const BACKEND_URL = 'http://127.0.0.1:3000/graphql';
const GraphqlClient = new GraphQLClient(BACKEND_URL);

// ------------------------
// USEFUL METHODS
// ------------------------
const getFoodItemById = (foodItemId, callback, errorCallback) => {
    console.log("Fetching data for food item with id: " + foodItemId);

    GraphqlClient.request(QUERY_SEARCH_BY_ID, {id: foodItemId})
    .then((data) => {
        if (!data.getFoodItemById) {
            throw new Error("No food item data obtained with id: " + foodItemId);
        }
        callback(data.getFoodItemById);
    })
    .catch((err) => {
        errorCallback(err);
    })
}

module.exports = {
    getFoodItemById
};