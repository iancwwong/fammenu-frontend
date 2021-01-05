import React from 'react';

export default class EditFoodItemForm extends React.Component {
    
    handleUpdateFoodItem = (eventObj) => {
        eventObj.preventDefault();
        console.log("Updating food item...");
    }

    render() {
        return (
            <div>
                {this.props.foodItem && <p>Form below is for food item: {this.props.foodItem.id}</p>}
                <form onSubmit={this.handleUpdateFoodItem}>
                    <label>
                        Name:
                        <input type="text" name="name" />
                    </label>
                    <br></br>
                    <label>
                        Cuisine:
                        <input type="text" name="cuisine" />
                    </label>
                    <br></br>
                    <label>
                        Labels:
                        <input type="text" name="labels" />
                    </label>
                    <br></br>
                    <button>Update</button>
                </form>
            </div>
        );
    }
}