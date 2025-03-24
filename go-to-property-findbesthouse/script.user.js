// ==UserScript==
// @name         Visit property.com.au and findbesthouse.com.au
// @namespace    https://github.com/ChenglongMa/tampermonkey-scripts
// @version      1.0.0
// @description  Add buttons to navigate to property.com.au and findbesthouse.com.au
// @author       Chenglong Ma
// @match        *://*.realestate.com.au/*
// @match        *://*.domain.com.au/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=realestate.com.au
// @grant        none
// @license MIT
// ==/UserScript==

(function () {
    'use strict';

    function getPropertyAddress() {
        const addressElement = document.querySelector('h1.property-info-address, div[data-testid="listing-details__button-copy-wrapper"] > h1');
        if (!addressElement) return undefined;
        return addressElement.textContent;
    }

    async function openPropertyLink(address) {
        // Step 1: Construct the GET request URL
        const query = encodeURIComponent(address);
        const requestUrl = `https://suggest.realestate.com.au/consumer-suggest/suggestions?max=1&type=address%2Csuburb%2Cpostcode%2Cstate%2Cregion&src=reax-multi-intent-search-modal&query=${query}`;

        try {
            // Step 2: Fetch the JSON response
            const response = await fetch(requestUrl);
            const data = await response.json();

            // Step 3: Extract the property URL from the JSON response
            const propertyUrl = data._embedded.suggestions[0].source.url;

            // Step 4: Fetch the HTML content of the property URL
            const propertyResponse = await fetch(propertyUrl);
            const propertyHtml = await propertyResponse.text();

            // Step 5: Parse the HTML and extract the href value of the <a> tag with class containing "PropertyLinkWrapper"
            const parser = new DOMParser();
            const doc = parser.parseFromString(propertyHtml, 'text/html');
            const propertyLink = doc.querySelector('a[class*="PropertyLinkWrapper"]').href;

            // Step 6: Open the extracted href URL in a new tab
            window.open(propertyLink, '_blank');
        } catch (error) {
            console.error('Error fetching property link:', error);
        }
    }

    function openFindBestHouseLink(address) {
        // Encode the address to be URL-friendly
        const encodedAddress = encodeURIComponent(address.replace(/,/g, '')).replace(/%20/g, '-').toLowerCase();
        // Construct the URL
        const url = `https://www.findbesthouse.com/en/property/${encodedAddress}`;
        // Open the URL in a new tab
        window.open(url, '_blank');
    }

    function addLinkButton() {
        const rightPanel = document.querySelector('div[class="contact-agent-panel"], div[data-testid="listing-details__agent-details"]');
        if (!rightPanel) return;

        let stackDiv = rightPanel.querySelector('div[class^="Stack__StackContainer"], div[class="css-jmaqhc"]');
        if (!stackDiv) {
            stackDiv = rightPanel.lastElementChild;
        }
        if (!stackDiv) return;

        // Create a new button element
        const propertyComAuButton = document.createElement('button');
        const findBestHouseButton = document.createElement('button');

        const lastButton = stackDiv.querySelector('button[class*="SaveButton__StyledButton"], button[data-testid="listing-details__phone-cta-button"], button');

        if (lastButton) {
            propertyComAuButton.className = lastButton.className;
            findBestHouseButton.className = lastButton.className;
        }
        propertyComAuButton.title = 'View in property.com.au';
        propertyComAuButton.textContent = 'View in property.com.au';
        const address = getPropertyAddress();

        propertyComAuButton.addEventListener('click', function () {
            openPropertyLink(address);
        });

        findBestHouseButton.title = 'View in FindBestHouse.com.au';
        findBestHouseButton.textContent = 'View in FindBestHouse.com.au';

        findBestHouseButton.addEventListener('click', function () {
            openFindBestHouseLink(address);
        });

        // Append the new button to the stackDiv
        stackDiv.appendChild(propertyComAuButton);
        stackDiv.appendChild(findBestHouseButton);
    }

    // Run the function to add the link button
    addLinkButton();
})();