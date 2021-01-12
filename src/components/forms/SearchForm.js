// Main goal is to execute search query, obtain and change food items in state
import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
const dataClient = require('../../utils/DataClient');

export default class SearchForm extends React.Component {

    // Todo: Support multiple search modes
    searchByGenericTerm = (eventObj) => {
        
        eventObj.preventDefault();

        // ToDo: Sanitise check searchTerm
        const searchTerm = eventObj.target.elements.searchTerm.value.trim();

        dataClient.searchFoodItemsByGenericTerm(searchTerm, this.props.handleSearchFoodItems, (err) => console.error(err));

        // Empty out the text field
        eventObj.target.elements.searchTerm.value = "";
    }

    componentDidMount () {
        dataClient.searchFoodItemsByGenericTerm("", this.props.handleSearchFoodItems, (err) => console.error(err));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.searchByGenericTerm}>
                    <TextField 
                        id="searchTerm"
                        placeholder="e.g set meal"
                    />
                    <IconButton type="submit">
                        <SearchIcon />
                    </IconButton>
                </form>
            </div>
        );
    }
}