# Exercise 02: Grade Assignment

# 1. Ask the user to input a score
score = int(input("Enter the student's score (0-100): "))

# 2. Determine the grade using conditional logic
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
elif score >= 60:
    print("Grade: D")
else:
    print("Grade: F")