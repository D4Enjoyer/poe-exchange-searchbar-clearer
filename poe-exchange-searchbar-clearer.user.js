// ==UserScript==
// @name         poe-exchange-searchbar-clearer
// @namespace    https://github.com/D4Enjoyer/poe-exchange-searchbar-clearer
// @version      1.1
// @description  Clears the search bar when clicking exchange items on Path of Exile Trade Exchange if it contains text
// @author       A God Gamer with his dear friend ChatGPT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pathofexile.com
// @match        https://www.pathofexile.com/trade*
// @grant        none
// @require      https://code.jquery.com/jquery-latest.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// Function to clear the search bar and trigger input event
function clearSearchBar() {
    console.log('Clearing search bar...');
    var searchBar = $('.search-select.form-control.text');

    if (searchBar.length) {
        searchBar.val(''); // Empty the search bar
        // Trigger input event using vanilla JavaScript dispatchEvent
        searchBar[0].dispatchEvent(new Event('input', { bubbles: true }));
        console.log('Search bar cleared.');
    } else {
        console.log('Search bar not found.');
    }
}

// Function to check if the search bar contains text
function shouldClearSearchBar() {
    var searchBar = $('.search-select.form-control.text');
    var searchBarContainsText = searchBar.length && searchBar.val().trim() !== '';
    console.log('Search bar contains text:', searchBarContainsText);
    return searchBarContainsText;
}

// Event handler for clicking on exchange items
function handleExchangeItemClick(event) {
    if ($(event.target).closest('.exchange-filter-item').length && shouldClearSearchBar()) {
        console.log('Clicked on .exchange-filter-item');
        clearSearchBar(); // Call the function to clear the search bar if it contains text
    }
}

// Initialization function
function initializeScript() {
    console.log('Starting the script...');

    // Wait for the search bar element to be available
    waitForKeyElements('.search-select.form-control.text', function() {
        console.log('Search bar element found.');

        // Add event listener for clicks on exchange items
        $('.search-advanced-items.exchange').on('click', handleExchangeItemClick);

        console.log('Script initialized.');
    });
}

// Initialize the script
initializeScript();
