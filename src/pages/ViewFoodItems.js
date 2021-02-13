import React from 'react';
import Navbar from '../components/Navbar';
import SearchForm from '../components/forms/SearchForm';
import SearchResults from '../components/viewFoodItemsPage/SearchResults';
import DeleteFoodItemDialog from '../components/dialog/DeleteFoodItemDialog';
import CreateEditFoodItemDialog from '../components/dialog/CreateEditFoodItemDialog';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default class ViewFoodItems extends React.Component {

    state = {
        foundFoodItems: [],
        foodItemToDelete: undefined,
        foodItemToEdit: undefined,
        foodItemToUpdate: undefined,
        updateMode: undefined
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

    // Trigger dialog box for editing / creating
    triggerFoodItemUpdate = (foodItemToUpdate, updateMode) => {
        console.log("Triggering a food item update with mode: " + updateMode);
        this.setState(() => ({
            foodItemToUpdate: foodItemToUpdate,
            updateMode: updateMode
        }));
    }

    resetFoodItemToUpdate = () => {
        this.setState(() => ({
            foodItemToUpdate: undefined,
            updateMode: undefined
        }));
    }

    successFoodItemUpdateHandler = (updatedFoodItem) => {

        switch (this.state.updateMode) {

            // If it's a successful edit, replace the existing food item with updated one
            case 'edit':
                this.setState((prevState) => ({
                    foundFoodItems: prevState.foundFoodItems.map((foodItem) =>
                        (foodItem.id === updatedFoodItem.id) ?
                            foodItem = updatedFoodItem :
                            foodItem
                )}));
                break;

            // If it's a successful create, add the newly created food item to food results
            case 'create':
                this.setState((prevState) => ({
                    foundFoodItems: prevState.foundFoodItems.concat(updatedFoodItem).sort(this.nameComparison)
                }));
                break;

            default:
                console.log("Oh, some weird update mode specified... no handler for that!");

        }
    }

    // Sorting by alphabetical order
    nameComparison = (foodItemA, foodItemB) => {
        return foodItemA.name.localeCompare(foodItemB.name);
    }

    componentDidUpdate() {
        // make sure food items are always sorted
        this.state.foundFoodItems.sort(this.nameComparison);
    }

    render() {
        return (
            <div>
                <Navbar />
                <h1 className="header__title">Food Items Viewing Page</h1>

                <Grid container direction="row">
                    <SearchForm 
                        handleSearchFoodItems={this.handleSearchFoodItems} 
                    />
                    <Fab 
                        size="small"
                        color="primary" aria-label="add" 
                        onClick={() => this.triggerFoodItemUpdate(undefined, 'create')}
                    >
                        <AddIcon />
                    </Fab>
                </Grid>
                
                <br />
                <Divider />
                <SearchResults 
                    foundFoodItems={this.state.foundFoodItems}
                    handleDeleteFoodItem={this.handleDeleteFoodItem}
                    triggerFoodItemUpdate={this.triggerFoodItemUpdate}
                />
                
                {
                    this.state.foodItemToDelete && 
                    <DeleteFoodItemDialog 
                        foodItemToDelete={this.state.foodItemToDelete}
                        resetFoodItemToDelete={this.resetFoodItemToDelete}
                        resetFoodItemToDeleteAfterSuccessfulDeletion={this.resetFoodItemToDeleteAfterSuccessfulDeletion}
                    />
                }

                {
                    this.state.updateMode &&
                    <CreateEditFoodItemDialog 
                        foodItemToUpdate={this.state.foodItemToUpdate}
                        updateMode={this.state.updateMode}
                        resetFoodItemToUpdate={this.resetFoodItemToUpdate}
                        successFoodItemUpdateHandler={this.successFoodItemUpdateHandler}
                    />
                }

            </div>
        )
    }
}