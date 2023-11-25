// ==UserScript==
// @name         poe-exchange-searchbar-clearer
// @namespace    https://github.com/D4Enjoyer/poe-exchange-searchbar-clearer
// @version      1.0
// @description  Clears the search bar when clicking exchange items on Path of Exile Trade Exchange if it contains text
// @author       A God Gamer with his dear friend ChatGPT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pathofexile.com
// @match        https://www.pathofexile.com/trade*
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// Function to clear the search bar and trigger input event
function clearSearchBar() {
    console.log('Clearing search bar...');
    var searchBar = document.querySelector('.search-select.form-control.text');

    if (searchBar) {
        searchBar.value = ''; // Empty the search bar
        searchBar.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event
        console.log('Search bar cleared.');
    } else {
        console.log('Search bar not found.');
    }
}

// Function to check if the search bar contains text
function shouldClearSearchBar() {
    var searchBar = document.querySelector('.search-select.form-control.text');
    var searchBarContainsText = searchBar && searchBar.value.trim() !== '';
    console.log('Search bar contains text:', searchBarContainsText);
    return searchBarContainsText;
}

// Event handler for clicking on exchange items
function handleExchangeItemClick(event) {
    if (event.target.closest('.exchange-filter-item') && shouldClearSearchBar()) {
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
        document.querySelector('.search-advanced-items.exchange').addEventListener('click', handleExchangeItemClick);

        console.log('Script initialized.');
    });
}

// Initialize the script
initializeScript();
