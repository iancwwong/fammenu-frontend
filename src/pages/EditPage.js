import React from 'react';
import Navbar from '../components/Navbar';

export default class EditPage extends React.Component {

    state = {
        foodItemId: this.props.match.params.foodItemId
    }

    render() {
        return (
            <div>
                <Navbar />
                <h2>Edit Food Item: {this.state.foodItemId}</h2>
                <p>{JSON.stringify(this.props)}</p>
                <p>{this.props.match.params.foodItemId}</p>
            </div>
        );
    }
}