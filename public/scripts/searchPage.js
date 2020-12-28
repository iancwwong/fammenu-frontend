'use strict';

console.log("Alrighty, we're ready to go!");

// GLOBAL
// -----------------------------------------------------
/*
    Schema of food items:
    {
        name: String
        labels: [String]

    }
*/
var foodItems = [{
    name: 'Potato Chicken'
}, {
    name: 'Curry'
}];

// FUNCTIONS
// -----------------------------------------------------

var searchFoodItemsByGenericTerm = function searchFoodItemsByGenericTerm(eventObj) {
    eventObj.preventDefault(); // Prevent full page refresh

    // Search from backend with the search term
    var searchTerm = eventObj.target.elements.genericSearchTerm.value;
    console.log("Searching with search term: '" + searchTerm + "'");

    RenderSearchPageApp();
};

// APP PAGE
// -----------------------------------------------------
var RenderSearchPageApp = function RenderSearchPageApp() {
    var searchPageApp = React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            'This is the search component!'
        ),
        React.createElement(
            'form',
            { onSubmit: searchFoodItemsByGenericTerm },
            React.createElement('input', { type: 'text', name: 'genericSearchTerm' }),
            React.createElement(
                'button',
                null,
                'Search'
            )
        ),
        React.createElement(
            'p',
            null,
            React.createElement(
                'ul',
                null,
                foodItems.map(function (foodItem) {
                    return React.createElement(
                        'li',
                        { key: foodItem.name },
                        foodItem.name
                    );
                })
            )
        )
    );

    ReactDOM.render(searchPageApp, document.getElementById('searchPage'));
};

RenderSearchPageApp();
