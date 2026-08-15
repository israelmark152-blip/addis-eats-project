# Day 21 In-Class Exercise: Persistent Signup Form

A lightweight, validated web form that captures user signups, performs client-side regex validation, and persists entry data locally.

## Features

* **Client-Side Validation**: Validates full name length and enforces Ethiopian mobile phone formatting using regular expressions (`09...` or `+2519...`).
* **Persistent Storage**: Utilizes browser `localStorage` and `JSON` serialization to keep track of user signups across reloads.
* **Dynamic UI**: Updates total signup count on initial load and following each successful submission.
* **Error Handling**: Displays clear, user-friendly error messages without disrupting page flow.

## Project Structure

```text
in-class-exercise/
├── index.html       # Form markup, UI styling, and input labels
├── app.js           # Form events, regex validation, and localStorage logic
├── expected.txt     # Behavioural requirements and test criteria
└── README.md        # Project overview and instructions