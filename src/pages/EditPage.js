import React from 'react';
import Navbar from '../components/Navbar';
import EditFoodItemForm from '../components/editPage/EditFoodItemForm';
const dataClient = require('../utils/DataClient');

export default class EditPage extends React.Component {

    state = {
        foodItemId: this.props.match.params.foodItemId,
        foodItem: this.get
    }

    handleSetFoodItemObj = (foodItemObj) => {
        this.setState(() => ({
            foodItem: foodItemObj
        }));
    }

    componentDidMount() {
        console.log("Created Edit page component! Loading in the food item obj with id: " + this.state.foodItemId);
        dataClient.getFoodItemById(this.state.foodItemId, this.handleSetFoodItemObj, (err) => console.error(err));
    }

    render() {
        return (
            <div>
                <Navbar />
                <h2>Edit Food Item</h2>
                {this.state.foodItem && 
                    <EditFoodItemForm 
                        foodItem={this.state.foodItem}
                        handleSetFoodItemObj={this.handleSetFoodItemObj}
                    />
                }
            </div>
        );
    }
}