// This file is used for data query / manipulation with back end
import { GraphQLClient, gql } from 'graphql-request';

// ------------------------
// GLOBAL VARS
// ------------------------
// GraphQL query to search for food items by generic term
const QUERY_SEARCH_BY_ID = gql `
    query SearchFoodItemsByGenericTerm($searchTerm: String!) {
        searchFoodItemsByGenericTerm(searchTerm:$searchTerm) {
            id
            name
            cuisine
            labels
        }
    }
`;

// Backend URL for querying
const BACKEND_URL = 'http://127.0.0.1:3000/graphql';


// ------------------------
// USEFUL METHODS
// ------------------------
const getFoodItemById = (foodItemId, callback, errorCallback) => {
    console.log("Fetching data for food item with id: " + foodItemId);
}

module.exports = {
    getFoodItemById
};