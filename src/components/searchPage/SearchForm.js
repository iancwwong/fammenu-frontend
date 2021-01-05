// Main goal is to execute search query, obtain and change food items in state
import React from 'react';
import { GraphQLClient, gql } from 'graphql-request';

// ----------------------------------
// GLOBAL VARIABLES
// ----------------------------------
// GraphQL query to search for food items by generic term
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

// Backend URL for querying
const BACKEND_URL = 'http://127.0.0.1:3000/graphql';

// ----------------------------------
// Actual class def
// ----------------------------------
export default class SearchForm extends React.Component {

    graphqlClient = new GraphQLClient(BACKEND_URL);

    // Todo: Support multiple search modes
    searchByGenericTerm = (eventObj) => {
        
        eventObj.preventDefault();

        // ToDo: Sanitise check searchTerm
        const searchTerm = eventObj.target.elements.searchTerm.value;
        console.log("Searching with search term: " + searchTerm);

        const queryVars = {
            searchTerm: searchTerm
        }
        this.graphqlClient.request(QUERY_GENERIC_SEARCH, queryVars)
        .then((data) => {
            try {
                let searchResults = data.searchFoodItemsByGenericTerm;

                // Handle no data return
                if (!searchResults) {
                    searchResults = [];
                }
                this.props.handleSearchOptions(searchResults);
            } catch (err) {
                console.error(err);
            }
        })
        .catch((err) => {
            console.error("Error: Could not obtain data from Fammenu-backend!");
            console.error(err);
        });

        // Empty out the text field
        eventObj.target.elements.searchTerm.value = "";
    }

    render() {
        return (
            <div>
                <form onSubmit={this.searchByGenericTerm}>
                    <input type="text" name="searchTerm"></input>
                    <button>Search</button>
                </form>
            </div>
        );
    }
}