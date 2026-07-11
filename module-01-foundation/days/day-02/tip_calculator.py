# tip_calculator.py - Day 2 Final Challenge

print(" Welcome to the Tip Calculator!")

# 1. Gather inputs from the user
total_bill = float(input("What was the total bill amount? $"))
tip_percentage = int(input("What percentage tip would you like to give? (10, 12, 15, etc.): "))
people_count = int(input("How many people are splitting the bill? "))

# 2. Perform calculations
tip_amount = total_bill * (tip_percentage / 100)
final_total = total_bill + tip_amount
amount_per_person = final_total / people_count

# 3. Output results
print("-" * 30)
print(f"Total Tip: ${tip_amount:.2f}")
print(f"Total Bill (with tip): ${final_total:.2f}")
print(f"Each person should pay: ${amount_per_person:.2f}")
print("-" * 30)