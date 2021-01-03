// Main goal is to execute search query, obtain and change food items in state
import React from 'react';

// ----------------------------------
// GLOBAL VARIABLES
// ----------------------------------
// GraphQL query to search for food items by generic term
const QUERY_GENERIC_SEARCH = `
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

    // Todo: Support multiple search modes

    constructor(props) {
        super(props);
        this.searchByGenericTerm = this.searchByGenericTerm.bind(this);
    }

    searchByGenericTerm(eventObj) {
        
        eventObj.preventDefault();

        // ToDo: Sanitise check searchTerm
        const searchTerm = eventObj.target.elements.searchTerm.value;
        console.log("Searhing with search term: " + searchTerm);

        fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: QUERY_GENERIC_SEARCH,
                variables: {searchTerm}
            })
        })
        .then((response) => {
            if (!response.ok) {
                console.error(response);
            }
            return response.json();
        })
        .then(data => {
            const searchResults = data.data.searchFoodItemsByGenericTerm;
            this.props.handleSearchOptions(searchResults);
        })
        .catch((err) => {
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