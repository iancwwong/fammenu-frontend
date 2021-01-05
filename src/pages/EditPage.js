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
            foodItemObj: foodItemObj
        }));
    }

    componentDidMount() {
        console.log("Created Edit page component! Loading in the food item obj with id: " + this.state.foodItemId);
        dataClient.getFoodItemById(this.state.foodItemId);
    }

    render() {
        return (
            <div>
                <Navbar />
                <h2>Edit Food Item: {this.state.foodItemId}</h2>
                <EditFoodItemForm foodItem={this.state.foodItem} />
            </div>
        );
    }
}