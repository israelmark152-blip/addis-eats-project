# Addis Eats - Day 39: Route Handlers & Server Actions

## API Endpoints

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/dishes` | Retrieves full menu as JSON | `200 OK` |
| **GET** | `/api/dishes/[id]` | Retrieves single dish by ID | `200 OK`, `404 Not Found` |
| **POST** | `/api/orders` | Validates & creates a new order | `201 Created`, `422 Unprocessable Entity` |

## Server Actions (`app/actions.js`)

- `placeOrder`: Parses `formData` with Zod schema (`lib/schema.js`), returns `fieldErrors` on validation failure, and calls `revalidatePath("/checkout")` upon success.
- `cancelOrder`: Server-side authorization check verifying session identity against record ownership (`401`/`403` logic).