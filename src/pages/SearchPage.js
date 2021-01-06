import React from 'react';
import Navbar from '../components/Navbar';
import SearchForm from '../components/searchPage/SearchForm';
import SearchResults from '../components/searchPage/SearchResults';
import DeleteFoodItemDialog from '../components/searchPage/DeleteFoodItemDialog';
import Divider from '@material-ui/core/Divider';

export default class SearchPage extends React.Component {

    state = {
        foundFoodItems: [],
        foodItemToDelete: undefined
    };

    handleSearchFoodItems = (results)  => {
        // Alphabetical order by default
        results.sort(this.nameComparison);
        this.setState(() => ({ foundFoodItems: results }));
    }

    handleDeleteFoodItem = (foodItem) => {
        console.log("Attempting to delete food item: " + foodItem.id);
        this.setState(() => ({
            foodItemToDelete: foodItem
        }));
    }

    resetFoodItemToDelete = () => {
        this.setState(() => ({
            foodItemToDelete: undefined
        }));
    }

    // Sorting by alphabetical order
    nameComparison = (foodItemA, foodItemB) => {
        return foodItemA.name.localeCompare(foodItemB.name);
    }

    render() {
        return (
            <div>
                <Navbar />
                <h2>Food Items Search Page</h2> 
                <SearchForm 
                    handleSearchFoodItems={this.handleSearchFoodItems} 
                />
                <br />
                <Divider />
                <SearchResults 
                    foundFoodItems={this.state.foundFoodItems}
                    handleDeleteFoodItem={this.handleDeleteFoodItem}
                />
                
                {this.state.foodItemToDelete && 
                    <DeleteFoodItemDialog 
                        foodItemToDelete={this.state.foodItemToDelete}
                        resetFoodItemToDelete={this.resetFoodItemToDelete}
                    />}

            </div>
        )
    }
}