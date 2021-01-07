import React from 'react';
import Navbar from '../components/Navbar';
import SearchForm from '../components/viewFoodItemsPage/SearchForm';
import SearchResults from '../components/viewFoodItemsPage/SearchResults';
import DeleteFoodItemDialog from '../components/viewFoodItemsPage/DeleteFoodItemDialog';
import EditFoodItemDialog from '../components/viewFoodItemsPage/EditFoodItemDialog';
import Divider from '@material-ui/core/Divider';

export default class ViewFoodItems extends React.Component {

    state = {
        foundFoodItems: [],
        foodItemToDelete: undefined,
        foodItemToEdit: undefined
    };

    handleSearchFoodItems = (results)  => {
        // Alphabetical order by default
        results.sort(this.nameComparison);
        this.setState(() => ({ foundFoodItems: results }));
    }

    handleDeleteFoodItem = (foodItem) => {
        this.setState(() => ({
            foodItemToDelete: foodItem
        }));
    }

    resetFoodItemToDelete = () => {
        this.setState(() => ({
            foodItemToDelete: undefined
        }));
    }

    // Refresh of list after successful deletion
    resetFoodItemToDeleteAfterSuccessfulDeletion = (deletedFoodItem) => {
        this.setState((prevState) => ({
            foodItemToDelete: undefined,
            foundFoodItems: prevState.foundFoodItems.filter((foodItem) => foodItem.id !== deletedFoodItem.id)
        }));
    }

    handleEditFoodItem = (foodItem) => {
        this.setState(() => ({
            foodItemToEdit: foodItem
        }));
    }

    resetFoodItemToEdit = () => {
        this.setState(() => ({
            foodItemToEdit: undefined
        }));
    }

    resetFoodItemToEditAfterSuccessfulEdit = (editedFoodItem) => {
        this.setState(() => ({
            foundFoodItems: [editedFoodItem],
            foodItemToEdit: undefined
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
                <h2>Food Items Viewing Page</h2> 
                <SearchForm 
                    handleSearchFoodItems={this.handleSearchFoodItems} 
                />
                <br />
                <Divider />
                <SearchResults 
                    foundFoodItems={this.state.foundFoodItems}
                    handleDeleteFoodItem={this.handleDeleteFoodItem}
                    handleEditFoodItem={this.handleEditFoodItem}
                />
                
                {this.state.foodItemToDelete && 
                    <DeleteFoodItemDialog 
                        foodItemToDelete={this.state.foodItemToDelete}
                        resetFoodItemToDelete={this.resetFoodItemToDelete}
                        resetFoodItemToDeleteAfterSuccessfulDeletion={this.resetFoodItemToDeleteAfterSuccessfulDeletion}
                    />
                }

                {
                    this.state.foodItemToEdit &&
                    <EditFoodItemDialog 
                        foodItemToEdit={this.state.foodItemToEdit}
                        resetFoodItemToEdit={this.resetFoodItemToEdit}
                        resetFoodItemToEditAfterSuccessfulEdit={this.resetFoodItemToEditAfterSuccessfulEdit}
                    />
                }

            </div>
        )
    }
}