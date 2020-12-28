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
var foodItems = [
    {
        name: 'Potato Chicken',
    },
    {
        name: 'Curry'
    }
];

// FUNCTIONS
// -----------------------------------------------------

const searchFoodItemsByGenericTerm = (eventObj) => {
    eventObj.preventDefault();    // Prevent full page refresh

    // Search from backend with the search term
    let searchTerm = eventObj.target.elements.genericSearchTerm.value;
    console.log("Searching with search term: '" + searchTerm + "'");

    RenderSearchPageApp();
}


// APP PAGE
// -----------------------------------------------------
const RenderSearchPageApp = () => {
    const searchPageApp = (
        <div>
    
            <p>This is the search component!</p>
    
            <form onSubmit={searchFoodItemsByGenericTerm}>
                <input type="text" name="genericSearchTerm"></input>
                <button>Search</button>
            </form>

            {/* // Display food items */}
            <p>
                <ul>
                    {
                        foodItems.map((foodItem) => <li key={foodItem.name}>{foodItem.name}</li>)
                    }
                </ul>
            </p>
    
        </div>
    );
    
    ReactDOM.render(searchPageApp, document.getElementById('searchPage'));
};

RenderSearchPageApp();