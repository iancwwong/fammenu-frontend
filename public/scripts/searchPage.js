'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ----------------------------------
// GLOBAL VARIABLES
// ----------------------------------
// GraphQL query to search for food items by generic term
var QUERY_GENERIC_SEARCH = '\n    query SearchFoodItemsByGenericTerm($searchTerm: String!) {\n        searchFoodItemsByGenericTerm(searchTerm:$searchTerm) {\n            id\n            name\n            cuisine\n            labels\n        }\n    }\n';

// Backend URL for querying
var BACKEND_URL = 'http://127.0.0.1:3000/graphql';

// ----------------------------------
// REACT COMPONENTS
// ----------------------------------


var SearchPage = function (_React$Component) {
    _inherits(SearchPage, _React$Component);

    function SearchPage(props) {
        _classCallCheck(this, SearchPage);

        var _this = _possibleConstructorReturn(this, (SearchPage.__proto__ || Object.getPrototypeOf(SearchPage)).call(this, props));

        _this.state = {
            foundFoodItems: []
        };
        _this.handleSearchOptions = _this.handleSearchOptions.bind(_this);
        return _this;
    }

    _createClass(SearchPage, [{
        key: 'handleSearchOptions',
        value: function handleSearchOptions(results) {
            this.setState(function () {
                return {
                    foundFoodItems: results
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h2',
                    null,
                    'Food Items Search Page'
                ),
                React.createElement(SearchForm, { handleSearchOptions: this.handleSearchOptions }),
                React.createElement('hr', null),
                React.createElement(SearchResults, { foundFoodItems: this.state.foundFoodItems })
            );
        }
    }]);

    return SearchPage;
}(React.Component);

// Main goal is to execute search query, obtain and change food items in state


var SearchForm = function (_React$Component2) {
    _inherits(SearchForm, _React$Component2);

    // Todo: Support multiple search modes

    function SearchForm(props) {
        _classCallCheck(this, SearchForm);

        var _this2 = _possibleConstructorReturn(this, (SearchForm.__proto__ || Object.getPrototypeOf(SearchForm)).call(this, props));

        _this2.searchByGenericTerm = _this2.searchByGenericTerm.bind(_this2);
        return _this2;
    }

    _createClass(SearchForm, [{
        key: 'searchByGenericTerm',
        value: function searchByGenericTerm(eventObj) {
            var _this3 = this;

            eventObj.preventDefault();

            // ToDo: Sanitise check searchTerm
            var searchTerm = eventObj.target.elements.searchTerm.value;
            console.log("Searhing with search term: " + searchTerm);

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
                var searchResults = data.data.searchFoodItemsByGenericTerm;
                console.log(searchResults);
                _this3.props.handleSearchOptions(searchResults);
            }).catch(function (err) {
                console.error(err);
            });

            // Empty out the text field
            eventObj.target.elements.searchTerm.value = "";
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { onSubmit: this.searchByGenericTerm },
                    React.createElement('input', { type: 'text', name: 'searchTerm' }),
                    React.createElement(
                        'button',
                        null,
                        'Search'
                    )
                )
            );
        }
    }]);

    return SearchForm;
}(React.Component);

var SearchResults = function (_React$Component3) {
    _inherits(SearchResults, _React$Component3);

    function SearchResults() {
        _classCallCheck(this, SearchResults);

        return _possibleConstructorReturn(this, (SearchResults.__proto__ || Object.getPrototypeOf(SearchResults)).apply(this, arguments));
    }

    _createClass(SearchResults, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'ul',
                    null,
                    this.props.foundFoodItems.map(function (foodItem) {
                        return React.createElement(
                            'li',
                            null,
                            React.createElement(FoodItem, { foodItem: foodItem })
                        );
                    })
                )
            );
        }
    }]);

    return SearchResults;
}(React.Component);

var FoodItem = function (_React$Component4) {
    _inherits(FoodItem, _React$Component4);

    function FoodItem(props) {
        _classCallCheck(this, FoodItem);

        var _this5 = _possibleConstructorReturn(this, (FoodItem.__proto__ || Object.getPrototypeOf(FoodItem)).call(this, props));

        _this5.foodItem = _this5.props.foodItem;
        return _this5;
    }

    _createClass(FoodItem, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'ul',
                    null,
                    React.createElement(
                        'li',
                        { key: this.foodItem.id + this.foodItem.name },
                        this.foodItem.name
                    ),
                    React.createElement(
                        'li',
                        { key: this.foodItem.id + this.foodItem.cuisine },
                        this.foodItem.cuisine
                    )
                )
            );
        }
    }]);

    return FoodItem;
}(React.Component);

// ----------------------------------
// PAGE SETUP
// ----------------------------------


ReactDOM.render(React.createElement(SearchPage, null), document.getElementById('searchPage'));
