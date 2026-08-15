# Day 20: In-Class Exercise - Async Live Data Fetcher

A dynamic web application built with HTML, CSS, and asynchronous JavaScript (`async`/`await`) that fetches, parses, and displays live data from a public API while managing UI loading and error states.

## Features
- **Async Data Fetching**: Utilizes `async/await` and the native `fetch()` API.
- **HTTP Response Verification**: Validates `res.ok` to catch HTTP errors before parsing.
- **Robust Error Handling**: Employs `try...catch...finally` blocks to display friendly error messages on failure and clear loading states.
- **Dynamic DOM Rendering**: Appends parsed items as list elements into an HTML list container.
- **Data Refresh**: Includes a refresh action to re-fetch and render fresh API data.

## API Used
- **JSONPlaceholder API**: `https://jsonplaceholder.typicode.com/posts`

## How to Run
1. Open the `day_20/in-class-exercise/` folder in VS Code.
2. Right-click `index.html` and select **Open with Live Server** (or open directly in any web browser).
3. Click **Refresh Data** or submit a search term to trigger the fetch request.