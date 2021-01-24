// This file is used for data query / manipulation with back end
import { GraphQLClient, gql } from 'graphql-request';
import { DATA_HOST } from '../conf/conf';

// ------------------------
// GLOBAL VARS
// ------------------------

// Backend URL for querying
const BACKEND_URL = `http://${DATA_HOST}:3000/graphql`;
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

const MUTATION_DELETE_FOOD_ITEM = gql `
    mutation DeleteFoodItem($id:ID!) {
        deleteFoodItem(id:$id) {
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

const QUERY_GENERIC_SEARCH = gql `
    query SearchFoodItemsByGenericTerm($searchTerm: String!) {
        searchFoodItemsByGenericTerm(searchTerm:$searchTerm) {
            id
            name
            cuisine
            labels
        }
    }
`;

// ------------------------
// QUERIES
// ------------------------
const getFoodItemById = (foodItemId, callback, errorCallback) => {
    console.log("Fetching data for food item with id: " + foodItemId);

    GraphqlClient.request(QUERY_SEARCH_BY_ID, {id: foodItemId})
    .then((data) => {
        if (!data.getFoodItemById) {
            throw new Error("No food item data obtained with id: " + foodItemId);
        }
        callback(data.getFoodItemById);
    }).catch((err) => {
        errorCallback(err);
    })
}

const searchFoodItemsByGenericTerm = (searchTerm, callback, errorCallback) => {
    console.log("Searching generically with term: " + searchTerm);
    GraphqlClient.request(QUERY_GENERIC_SEARCH, {searchTerm: searchTerm})
    .then((data) => {

        if (!data.searchFoodItemsByGenericTerm) {
            throw new Error("No food item data could be obtained");
        }
        callback(data.searchFoodItemsByGenericTerm);
    }).catch((err) => {
        errorCallback(err);
    });
}

const updateFoodItemById = (foodItemToUpdate, callback, errorCallback) => {
    GraphqlClient.request(MUTATION_UPDATE_FOOD_ITEM_BY_ID, foodItemToUpdate)
    .then((data) => {
        if(!data.updateFoodItem) {
            throw new Error("No data returned when updating food item of id: " + foodItemToUpdate.id);
        }
        callback(data.updateFoodItem);
    }).catch((err) => errorCallback(err));
}

const createFoodItem = (foodItemToCreate, callback, errorCallback) => {
    console.log("Creating food item: " );
    console.log(foodItemToCreate);
    GraphqlClient.request(MUTATION_CREATE_FOOD_ITEM, foodItemToCreate)
    .then((data) => {
        if (!data.addFoodItem) {
            throw new Error("No food item was created");
        }
        callback(data.addFoodItem);
    }).catch((err) => {
        errorCallback(err);
    });
}

const deleteFoodItem = (foodItemToDelete, callback, errorCallback) => {
    console.log("Deleting food item: " + foodItemToDelete.id);
    GraphqlClient.request(MUTATION_DELETE_FOOD_ITEM, {id: foodItemToDelete.id})
    .then((data) => {
        if (data.deleteFoodItem !== null) {             // Graphql returns 'null' for this attribute if successful deletion
            throw new Error("No food item was deleted");
        }
        callback(foodItemToDelete);
    }).catch((err) => {
        errorCallback(err);
    });
}

module.exports = {
    getFoodItemById,
    searchFoodItemsByGenericTerm,
    updateFoodItemById,
    createFoodItem,
    deleteFoodItem
};