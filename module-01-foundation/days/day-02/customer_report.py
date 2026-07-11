# Create a dictionary representing a customer order
customer = {
    "name": "Abel",
    "item": "Laptop",
    "price": 850,
    "quantity": 1
}

# Calculate total cost
total = customer["price"] * customer["quantity"]

# Print a formatted report
print("--- CUSTOMER REPORT ---")
print(f"Customer Name: {customer['name']}")
print(f"Purchased: {customer['item']}")
print(f"Total Bill: ${total}")
print("-----------------------")