import React from 'react';
const dataClient = require('../../utils/DataClient');

export default class EditFoodItemForm extends React.Component {
    
    handleUpdateFoodItem = (eventObj) => {
        eventObj.preventDefault();

        // Todo: Sanitise input
        let name = eventObj.target.elements.name.value.trim();
        let cuisine = eventObj.target.elements.cuisine.value.trim();
        let labels = eventObj.target.elements.labels.value
                        .trim().split(";")
                        .map((label) => label.trim())
                        .filter((label) => label);          // Remove empty labels

        const foodItemToUpdate = {
            id: this.props.foodItem.id,
            name: name,
            cuisine: cuisine,
            labels: labels
        };

        console.log("Updating food item: ");
        console.log(foodItemToUpdate);
        dataClient.updateFoodItemById(foodItemToUpdate, this.props.handleSetFoodItemObj, (err) => console.log(err));
    }

    render() {
        return (
            <div>
                {this.props.foodItem && <p>Form below is for food item: {this.props.foodItem.id}</p>}
                <form onSubmit={this.handleUpdateFoodItem}>
                    <label>
                        Id:
                    </label>
                <input type="text" name="id" disabled={true} defaultValue={this.props.foodItem.id} />
                    
                    <br></br>
                    <label>
                        Name:
                    </label>
                    <input type="text" name="name" defaultValue={this.props.foodItem.name}/>
                    <br></br>
                    <label>
                        Cuisine:
                    </label>
                    <input type="text" name="cuisine" defaultValue={this.props.foodItem.cuisine}/>
                    
                    <br></br>
                    <label>
                        Labels:
                    </label>
                    <input type="text" name="labels" defaultValue={this.props.foodItem.labels.join(";")}/>
                    
                    <br></br>
                    <button>Update</button>
                </form>
            </div>
        );
    }
}