# 🛒 Addis Market List

A dynamic, interactive web application designed to help users track and manage market items in real-time. Built using vanilla JavaScript, HTML5, and CSS3.

---

## 🚀 Features

* **Add Market Items**: Easily submit new items through an interactive form.
* **Toggle Completed**: Click on item names to cross them off as purchased.
* **Delete Items**: Remove items instantly from the list.
* **Persistent Data**: Powered by `localStorage` so items remain saved even after refreshing the page.
* **Responsive UI**: Clean, modern card interface built with modern CSS.

---

## 🛠️ Concepts Applied

* **DOM Manipulation**: Creating (`createElement`), populating (`textContent`), and appending (`appendChild`) elements dynamically.
* **Event Handling**: Using `e.preventDefault()` on form submissions and using **Event Delegation** on parent containers (`<ul>`).
* **State Management**: Keeping JavaScript array objects as the single source of truth (`marketItems`) and updating the DOM through a dedicated `render()` loop.
* **Local Storage API**: Saving (`JSON.stringify`) and retrieving (`JSON.parse`) state to preserve application data across browser sessions.

---

## 📁 Project Structure

```text
addis_market_list/
├── index.html      # HTML markup & form elements
├── styles.css      # Custom UI layout & responsiveness
├── app.js          # DOM logic, event listeners & localStorage
└── readme.md       # Project documentation