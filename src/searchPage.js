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
const QUERY_GENERIC_SEARCH = `
    query SearchFoodItemsByGenericTerm($searchTerm: String!) {
        searchFoodItemsByGenericTerm(searchTerm:$searchTerm) {
            id
            name
            cuisine
            labels
        }
    }
`;

// Backend URL for querying
const BACKEND_URL = 'http://127.0.0.1:3000/graphql';


// FUNCTIONS
// -----------------------------------------------------

const searchFoodItemsByGenericTerm = (eventObj) => {
    eventObj.preventDefault();    // Prevent full page refresh

    // Search from backend with the search term
    let searchTerm = eventObj.target.elements.genericSearchTerm.value;
    console.log("Searching with search term: '" + searchTerm + "'");

    fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: QUERY_GENERIC_SEARCH,
                variables: {searchTerm}
            })
        })
        .then((response) => {
            if (!response.ok) {
                console.error(response);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.data);
            RenderSearchPageApp(data.data.searchFoodItemsByGenericTerm);
        })
        .catch((err) => {
            console.error(err);
        });
}


// APP PAGE
// -----------------------------------------------------
const RenderSearchPageApp = (foodItems) => {
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

RenderSearchPageApp([]);