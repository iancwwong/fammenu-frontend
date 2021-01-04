import React from 'react';
import Navbar from '../components/Navbar';
import SearchForm from '../components/searchPage/SearchForm';
import SearchResults from '../components/searchPage/SearchResults';

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
                <Navbar />
                <h2>Food Items Search Page</h2> 
                <SearchForm handleSearchOptions={this.handleSearchOptions}/>
                <hr />
                <SearchResults foundFoodItems={this.state.foundFoodItems}/>
            </div>
        )
    }
}