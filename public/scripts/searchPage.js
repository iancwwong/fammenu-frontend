"use strict";

// GLOBAL
// -----------------------------------------------------
/*
    Schema of food items:
    {
        name: String
        labels: [String]

    }
*/

// GraphQL query to search for food items by generic term
var QUERY_GENERIC_SEARCH = "\n    query SearchFoodItemsByGenericTerm($searchTerm: String!) {\n        searchFoodItemsByGenericTerm(searchTerm:$searchTerm) {\n            id\n            name\n            cuisine\n            labels\n        }\n    }\n";

// Backend URL for querying
var BACKEND_URL = 'http://127.0.0.1:3000/graphql';

// FUNCTIONS
// -----------------------------------------------------

var searchFoodItemsByGenericTerm = function searchFoodItemsByGenericTerm(eventObj) {
    eventObj.preventDefault(); // Prevent full page refresh

    // Search from backend with the search term
    var searchTerm = eventObj.target.elements.genericSearchTerm.value;
    console.log("Searching with search term: '" + searchTerm + "'");

    fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query: QUERY_GENERIC_SEARCH,
            variables: { searchTerm: searchTerm }
        })
    }).then(function (response) {
        if (!response.ok) {
            console.error(response);
        }
        return response.json();
    }).then(function (data) {
        console.log(data.data);
        RenderSearchPageApp(data.data.searchFoodItemsByGenericTerm);
    }).catch(function (err) {
        console.error(err);
    });
};

// APP PAGE
// -----------------------------------------------------
var RenderSearchPageApp = function RenderSearchPageApp(foodItems) {
    var searchPageApp = React.createElement(
        "div",
        null,
        React.createElement(
            "p",
            null,
            "This is the search component!"
        ),
        React.createElement(
            "form",
            { onSubmit: searchFoodItemsByGenericTerm },
            React.createElement("input", { type: "text", name: "genericSearchTerm" }),
            React.createElement(
                "button",
                null,
                "Search"
            )
        ),
        React.createElement(
            "p",
            null,
            React.createElement(
                "ul",
                null,
                foodItems.map(function (foodItem) {
                    return React.createElement(
                        "li",
                        { key: foodItem.name },
                        foodItem.name
                    );
                })
            )
        )
    );

    ReactDOM.render(searchPageApp, document.getElementById('searchPage'));
};

RenderSearchPageApp([]);
