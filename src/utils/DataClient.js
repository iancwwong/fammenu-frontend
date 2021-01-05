// This file is used for data query / manipulation with back end
import { GraphQLClient, gql } from 'graphql-request';

// ------------------------
// GLOBAL VARS
// ------------------------

// Backend URL for querying
const BACKEND_URL = 'http://127.0.0.1:3000/graphql';
const GraphqlClient = new GraphQLClient(BACKEND_URL);

// ------------------------
// GRAPHQL QUERIES AND MUTATIONS
// ------------------------

const MUTATION_UPDATE_FOOD_ITEM_BY_ID = gql `
    mutation UpdateFoodItemById($id:ID!,$name:String!,$cuisine:String!,$labels:[String!]!) {
        updateFoodItem(id:$id,name:$name,cuisine:$cuisine,labels:$labels) {
            id
            name
            cuisine
            labels
        }
    }
`;

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

const updateFoodItemById = (foodItemToUpdate, callback, errorCallback) => {
    GraphqlClient.request(MUTATION_UPDATE_FOOD_ITEM_BY_ID, foodItemToUpdate)
    .then((data) => {
        if(!data.updateFoodItem) {
            throw new Error("No data returned when updating food item of id: " + foodItemToUpdate.id);
        }
        callback(data.updateFoodItem);
    })
    .catch((err) => errorCallback(err));
}

module.exports = {
    getFoodItemById,
    updateFoodItemById
};