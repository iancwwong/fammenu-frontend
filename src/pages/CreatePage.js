import React from 'react';
import Navbar from '../components/Navbar';

export default class CreatePage extends React.Component {

    handleCreateFoodItem = (eventObj) => {

        eventObj.preventDefault();

        // Sanitise inputs
        let name = eventObj.target.elements.name.value.trim();
        let cuisine = eventObj.target.elements.cuisine.value.trim();
        let labels = eventObj.target.elements.labels.value
                        .trim().split(";")
                        .map((label) => label.trim())
                        .filter((label) => label);

        const newFoodItem = {
            name: name,
            cuisine: cuisine,
            labels: labels
        };

        console.log("Creating new food item: ")
        console.log(newFoodItem);
    }

    render() {
        return (
            <div>
                <Navbar />

                <h2>Create Page!</h2>
                <form onSubmit={this.handleCreateFoodItem}>
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
                    <button>Create</button>
                </form>
            </div>
        );
    }
}