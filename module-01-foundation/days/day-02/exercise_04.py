# Exercise 04: Working with Lists

# 1. Create a list of your favorite programming languages
languages = ["Python", "JavaScript", "HTML", "CSS"]

print("My target languages:")
# 2. Loop through and print each language
for lang in languages:
    print(f"- {lang}")

print("-" * 20)

# 3. Modify the list (add a new item)
languages.append("SQL")
print(f"Updated list: {languages}")
print(f"Total languages tracked: {len(languages)}")