# Exercise 05: Working with Dictionaries

# 1. Create a dictionary to store student data
student_profile = {
    "name": "Abel",
    "age": 22,
    "course": "Software Engineering",
    "status": "Active"
}

# 2. Access and print specific values using keys
print(f"Student Name: {student_profile['name']}")
print(f"Enrolled Course: {student_profile['course']}")

print("-" * 20)

# 3. Add a new key-value pair to the dictionary
student_profile["grade"] = "A"
print("Updated Profile Information:")
print(student_profile)