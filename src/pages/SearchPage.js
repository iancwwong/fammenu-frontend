import React from 'react';
import Navbar from '../components/Navbar';
import SearchForm from '../components/searchPage/SearchForm';
import SearchResults from '../components/searchPage/SearchResults';
import Divider from '@material-ui/core/Divider';

export default class SearchPage extends React.Component {

    state = {
        foundFoodItems: []
    };

    handleSearchOptions = (results)  => {
        // Alphabetical order by default
        results.sort(this.nameComparison);
        this.setState(() => ({ foundFoodItems: results }));
    }

    // Sorting by alphabetical order
    nameComparison = (foodItemA, foodItemB) => {
        return foodItemA.name > foodItemB.name;
    }

    render() {
        return (
            <div>
                <Navbar />
                <h2>Food Items Search Page</h2> 
                <SearchForm handleSearchOptions={this.handleSearchOptions}/>
                <br />
                <Divider />
                <SearchResults foundFoodItems={this.state.foundFoodItems}/>
            </div>
        )
    }
}