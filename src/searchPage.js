// ----------------------------------
// GLOBAL VARIABLES
// ----------------------------------
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

// ----------------------------------
// REACT COMPONENTS
// ----------------------------------
class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foundFoodItems: []
        };
        this.handleSearchOptions = this.handleSearchOptions.bind(this);
    }

    handleSearchOptions(results) {
        this.setState(() => ({ foundFoodItems: results }));
    }

    render() {
        return (
            <div>
                <h2>Food Items Search Page</h2> 
                <SearchForm handleSearchOptions={this.handleSearchOptions}/>
                <hr />
                <SearchResults foundFoodItems={this.state.foundFoodItems}/>
            </div>
        )
    }
}

// Main goal is to execute search query, obtain and change food items in state
class SearchForm extends React.Component {

    // Todo: Support multiple search modes

    constructor(props) {
        super(props);
        this.searchByGenericTerm = this.searchByGenericTerm.bind(this);
    }

    searchByGenericTerm(eventObj) {
        eventObj.preventDefault();

        // ToDo: Sanitise check searchTerm
        const searchTerm = eventObj.target.elements.searchTerm.value;
        console.log("Searhing with search term: " + searchTerm);

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
            const searchResults = data.data.searchFoodItemsByGenericTerm;
            this.props.handleSearchOptions(searchResults);
        })
        .catch((err) => {
            console.error(err);
        });

        // Empty out the text field
        eventObj.target.elements.searchTerm.value = "";
    }

    render() {
        return (
            <div>
                <form onSubmit={this.searchByGenericTerm}>
                    <input type="text" name="searchTerm"></input>
                    <button>Search</button>
                </form>
            </div>
        );
    }
}

const SearchResults = (props) => (
    <div>
        <ul>
            {props.foundFoodItems.map((foodItem) => 
            (
                <li key={foodItem.id}><FoodItem foodItem={foodItem} /></li>
            )
            )}
        </ul>
    </div>
);

const FoodItem = (props)> (
    <div>
        <ul>
            <li key={props.foodItem.id + props.foodItem.name}>{props.foodItem.name}</li>
            <li key={props.foodItem.id + props.foodItem.cuisine}>{props.foodItem.cuisine}</li>
        </ul>
    </div>
);

// ----------------------------------
// PAGE SETUP
// ----------------------------------
ReactDOM.render(<SearchPage />, document.getElementById('searchPage'));