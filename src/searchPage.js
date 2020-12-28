console.log("Alrighty, we're ready to go!");

const searchFoodItemsByGenericTerm = (eventObj) => {
    eventObj.preventDefault();    // Prevent full page refresh

    // Search from backend with the search term
    let searchTerm = eventObj.target.elements.genericSearchTerm.value;
    console.log("Searching with search term: '" + searchTerm + "'");


    RenderSearchPageApp();
}


// -----------------------------------------------------
const RenderSearchPageApp = () => {
    const searchPageApp = (
        <div>
    
            <p>This is the search component!</p>
    
            <form onSubmit={searchFoodItemsByGenericTerm}>
                <input type="text" name="genericSearchTerm"></input>
                <button>Search</button>
            </form>
    
        </div>
    );
    
    ReactDOM.render(searchPageApp, document.getElementById('searchPage'));
};

RenderSearchPageApp();