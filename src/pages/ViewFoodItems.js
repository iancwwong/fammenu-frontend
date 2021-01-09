import React from 'react';
import Navbar from '../components/Navbar';
import SearchForm from '../components/viewFoodItemsPage/SearchForm';
import SearchResults from '../components/viewFoodItemsPage/SearchResults';
import DeleteFoodItemDialog from '../components/viewFoodItemsPage/DeleteFoodItemDialog';
import EditFoodItemDialog from '../components/viewFoodItemsPage/EditFoodItemDialog';
import CreateFoodItemDialog from '../components/viewFoodItemsPage/CreateFoodItemDialog';
import CreateEditFoodItemDialog from '../components/viewFoodItemsPage/CreateEditFoodItemDialog';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default class ViewFoodItems extends React.Component {

    state = {
        foundFoodItems: [],
        foodItemToDelete: undefined,
        foodItemToEdit: undefined,
        creatingFoodItem: false,
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

    handleCreateFoodItem = (createdFoodItem) => {
        this.setState(() => ({
            foundFoodItems: [createdFoodItem],
            creatingFoodItem: false
        }));
    }

    resetCreatingFoodItem = () => {
        this.setState(() => ({ creatingFoodItem: false }));
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

    sucessFoodItemUpdateHandler = (updatedFoodItem) => {
        this.setState(() => ({
            foundFoodItems: [updatedFoodItem],
            foodItemToUpdate: undefined,
            updateMode: undefined
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

                <Grid container direction="row">
                    <SearchForm 
                        handleSearchFoodItems={this.handleSearchFoodItems} 
                    />
                    <Fab 
                        size="small"
                        color="primary" aria-label="add" 
                        onClick={() => this.setState(() => ({ creatingFoodItem: true }))}
                    >
                        <AddIcon />
                    </Fab>
                </Grid>
                
                <br />
                <Divider />
                <SearchResults 
                    foundFoodItems={this.state.foundFoodItems}
                    handleDeleteFoodItem={this.handleDeleteFoodItem}        // Deprecate
                    handleUpdateFoodItem={this.triggerFoodItemUpdate}       // Deprecate
                    triggerFoodItemUpdate={this.triggerFoodItemUpdate}
                />

                {/* {
                    this.state.creatingFoodItem &&
                    <CreateFoodItemDialog
                        resetCreatingFoodItem={this.resetCreatingFoodItem}
                        handleCreateFoodItem={this.handleCreateFoodItem}
                    />
                }
                
                {
                    this.state.foodItemToDelete && 
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
                } */}

                {
                    this.state.foodItemToUpdate &&
                    this.state.updateMode &&
                    <CreateEditFoodItemDialog 
                        foodItemToUpdate={this.state.foodItemToUpdate}
                        updateMode={this.state.updateMode}
                        resetFoodItemToUpdate={this.resetFoodItemToUpdate}
                        sucessFoodItemUpdateHandler={this.sucessFoodItemUpdateHandler}
                    />
                }

            </div>
        )
    }
}