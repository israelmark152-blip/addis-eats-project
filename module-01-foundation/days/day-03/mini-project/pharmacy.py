# =====================================================================
# Day 3 Mini-Project: Pharmacy Inventory Tracker
# File: module-01-foundation/days/day-03/mini-project/pharmacy.py
# =====================================================================

# Step A: Initialize an empty stock dictionary
stock = {}

# Step B: Read stock.txt into the dictionary, wrapped in a try/except
try:
    with open("stock.txt", "r") as f:
        for line in f:
            line = line.strip()
            if line:  # Skip empty lines
                item, qty = line.split(",")
                stock[item] = int(qty)
    print("Stock successfully loaded from 'stock.txt'.")
except FileNotFoundError:
    # This prevents the program from crashing if the file is missing
    print("No stock file yet - starting empty.")

# Step C: Define a function to increase or decrease item quantities
def adjust(item, amount):
    """
    Safely adjusts stock. Using .get() prevents KeyError for new items.
    """
    stock[item] = stock.get(item, 0) + amount
    print(f"Adjusted '{item}' by {amount:+.0f}. Current quantity: {stock[item]}")

# Let's test some stock adjustments
print("\n--- Making Stock Adjustments ---")
adjust("Paracetamol", -15)   # Sell 15 units (Decreases stock)
adjust("Amoxicillin", 10)     # Restock 10 units (Increases stock)
adjust("Surgical Mask", 25)   # Add a brand new item safely

# Step D: Identify and print low-stock items (< 10 units) using a list comprehension
low_stock = [item for item, qty in stock.items() if qty < 10]
print("\n--- Low Stock Alert (< 10 units) ---")
if low_stock:
    print("Items running low:", low_stock)
else:
    print("No items are currently low on stock.")

# Step E: Save the updated dictionary back to stock.txt
try:
    with open("stock.txt", "w") as f:
        for item, qty in stock.items():
            f.write(f"{item},{qty}\n")
    print("\nUpdated stock database successfully saved to 'stock.txt'.")
except Exception as e:
    print(f"An error occurred while saving: {e}")