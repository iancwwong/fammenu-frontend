// Main goal is to execute search query, obtain and change food items in state
import React from 'react';
const dataClient = require('../../utils/DataClient');

export default class SearchForm extends React.Component {

    // Todo: Support multiple search modes
    searchByGenericTerm = (eventObj) => {
        
        eventObj.preventDefault();

        // ToDo: Sanitise check searchTerm
        const searchTerm = eventObj.target.elements.searchTerm.value.trim();

        dataClient.searchFoodItemsByGenericTerm(searchTerm, this.props.handleSearchOptions, (err) => console.error(err));

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