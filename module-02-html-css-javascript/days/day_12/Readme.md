# Day 12 - HTML Forms, Tables, Media & Accessibility

## Files Overview
* `exercise.html`: Contains all Day 12 homework exercises (Ethio Telecom Form, Ethiopian Airlines Flight Schedule Table, Media Block, and Accessibility Code Refactoring).
* `in_class_exercise.html`: Practice exercises completed during class.
* `mini_project/`: Folder containing the Habesha Eatery multi-page website (`index.html` & `contact.html`).

---

## Exercise Implementations & Decisions

### 1. Ethio Telecom Registration Form (`exercise.html`)
* **HTTP Method Selection**: Used `method="POST"`. Since registration submits personal user data, using `GET` would dangerously append phone numbers and emails to the visible URL address bar.
* **Input Types & Validation**: Applied `type="email"`, `type="tel"`, and native HTML5 `pattern="\+251[0-9]{9}"` for phone number validation.
* **Accessibility**: Every form control is explicitly bound to a `<label>` using matching `for` and `id` attributes. Helper instructions are connected with `aria-describedby`.

### 2. Ethiopian Airlines Schedule Table (`exercise.html`)
* Structured with `<caption>`, `<thead>`, and `<tbody>` tags.
* Included `scope="col"` on header cells and `scope="row"` on flight numbers to ensure screen readers can announce contextual table headings properly.

### 3. Media Block (`exercise.html`)
* Used responsive `figure` and `figcaption` tags for image markup.
* Included explicit `width`, `height`, `loading="lazy"`, and informative `alt` text for screen readers.
* Wrapped embedded Google Maps in `<iframe>` with a descriptive `title` attribute.

### 4. Accessibility Code Refactoring (`exercise.html`)
* **Refactored Clickable Div**: Replaced `<div onclick="...">` with native `<button type="submit">`. This allows full keyboard navigation (focusing via `Tab`, activating via `Space`/`Enter`) without custom JavaScript.
* **Added Labels**: Bound `<label>` to email inputs for screen reader support and enlarged hit area.
* **Added Alternative Text**: Supplied informative `alt` attributes on image tags.

---

## Mini-Project: Habesha Eatery (`mini_project/`)
* **Structure**: Created a two-page layout (`index.html` for reservations & menu; `contact.html` for contact form & opening hours).
* **Semantic HTML**: Built using `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` tags.
* **Forms & Tables**: Built accessible table reservation and contact forms alongside menu and business hours tables using `scope` attributes.