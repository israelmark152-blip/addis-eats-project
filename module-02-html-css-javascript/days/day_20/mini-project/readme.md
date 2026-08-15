# Day 20: Mini-Project - World Country Explorer

An interactive single-page web application that asynchronously fetches live country facts, renders dynamic country details, and handles network and user input exceptions gracefully.

## Features
- **Default Startup View**: Automatically fetches and renders facts for **Ethiopia** on initial page load.
- **Targeted Country Search**: Enables real-time country search queries via user input.
- **Formatted Data Display**: Formats raw numerical population figures into readable comma-separated strings (e.g., `123,000,000`).
- **UI State Management**: Displays a loading spinner during network requests and clears it in a `finally` block once resolved.
- **Error & Network Resilience**: Checks `res.ok` for valid HTTP status codes, presents friendly error messages for non-existent countries, and provides fallback data for offline or blocked environments.

## API Used
- **REST Countries API v3.1**: `https://restcountries.com/v3.1/name/{name}`

## How to Run
1. Navigate to the `day_20/mini-project/` directory.
2. Launch `index.html` using VS Code **Live Server**.
3. View Ethiopia's facts default card on startup.
4. Type any country name (e.g., *Kenya*, *Japan*, *Canada*) into the search field and press **Search**.
5. Click **Show All** to reset the view back to default settings.