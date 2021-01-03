import React from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

export default class SearchPage extends React.Component {

    state = {
        foundFoodItems: []
    };

    handleSearchOptions = (results)  => {
        this.setState(() => ({ foundFoodItems: results }));
    }

    render() {
        return (
            <div>
                <h2>Food Items Search Page</h2> 
                <SearchForm handleSearchOptions={this.handleSearchOptions}/>
                <hr />
                <SearchResults foundFoodItems={this.state.foundFoodItems}/>
            </div>
        )
    }
}