import React from 'react';

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
    }

    render() {
        return (
            <div>
                {this.props.foodItem && <p>Form below is for food item: {this.props.foodItem.id}</p>}
                <form onSubmit={this.handleUpdateFoodItem}>
                    <label>
                        Id:
                        <input type="text" name="id" disabled="true" value={this.props.foodItem.id} />
                    </label>
                    <br></br>
                    <label>
                        Name:
                        <input type="text" name="name" value={this.props.foodItem.name}/>
                    </label>
                    <br></br>
                    <label>
                        Cuisine:
                        <input type="text" name="cuisine" value={this.props.foodItem.cuisine}/>
                    </label>
                    <br></br>
                    <label>
                        Labels:
                        <input type="text" name="labels" value={this.props.foodItem.labels.join(";")}/>
                    </label>
                    <br></br>
                    <button>Update</button>
                </form>
            </div>
        );
    }
}