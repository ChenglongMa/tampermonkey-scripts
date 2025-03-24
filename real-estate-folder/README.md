# Real Estate Folder

**Real Estate Folder** is a userscript that lets you hide real estate listings you’re not interested in by toggling them open or closed. It supports popular property listing websites such as [realestate.com.au](https://www.realestate.com.au/) and [domain.com.au](https://www.domain.com.au/).

## Features

- **Toggle Visibility:** Click on a listing to hide or show it.
- **Persistent State:** The script uses cookies to remember which properties you have hidden.
- **SPA Support:** Works with sites that use partial page refreshes by listening to history changes.
- **Lightweight & Fast:** Adds only minimal elements to the page without affecting performance.

## How It Works

- The script wraps each property listing in a `<details>` element.
- A `<summary>` is added to each listing, displaying a clickable title.
- When a listing is toggled, the script saves the state (open or closed) as a cookie.
- The script listens for changes via the History API (`pushState`/`replaceState`) and waits for the page to update before reapplying its functionality.

## Installation

1. **Install a Userscript Manager:**  
   To use this script, you’ll need a userscript manager such as [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/).

2. **Add the Script:**  
   You can install the script via [GreasyFork](https://greasyfork.org/scripts/529675).

3. **Visit a Supported Site:**  
   Navigate to either [realestate.com.au](https://www.realestate.com.au/) or [domain.com.au](https://www.domain.com.au/). The script will automatically run and add toggle functionality to the property listings.

## Usage

- **Toggle a Property:**  
  Click on the listing title to hide or show the property.

- **Cookie Persistence:**  
  The state of each listing (hidden or visible) is stored in cookies, so the preferences are maintained even after you refresh the page.

- **SPA Compatibility:**  
  The script detects when the page updates via the History API and waits for the page to finish loading before applying the changes.

## Code Overview

The key parts of the script include:
- **Cookie Management:** Functions to get and set cookies safely.
- **DOM Manipulation:** Wrapping property nodes in `<details>` and `<summary>` elements.
- **Event Handling:** Listening to toggle events and history changes to reapply functionality when the page content is dynamically updated.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests with improvements or bug fixes.