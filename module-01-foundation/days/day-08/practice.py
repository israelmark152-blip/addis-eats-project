import random

# ==========================================================
# EXERCISE 1: RECURSIVE SUM & COUNT DOWN
# ==========================================================
def recursive_total(nums):
    """Sums a list recursively. Time Complexity: O(n)"""
    if not nums:  # Base case: empty list
        return 0
    return nums[0] + recursive_total(nums[1:])  # Recursive case

def count_down(n):
    """Prints numbers from n down to 1 recursively. Time Complexity: O(n)"""
    if n < 1:  # Base case
        return
    print(n, end=" ")
    count_down(n - 1)  # Recursive case


# ==========================================================
# EXERCISE 2: BINARY SEARCH ON BALANCES
# ==========================================================
def binary_search(items, target):
    """Performs binary search on a sorted list. Time Complexity: O(log n)"""
    lo, hi = 0, len(items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if items[mid] == target:
            return mid  # Target index found
        elif items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1  # Target absent


# ==========================================================
# EXERCISE 3: MERGE SORT IMPLEMENTATION
# ==========================================================
def merge_sort(items):
    """Sorts a list recursively using Divide and Conquer. Time Complexity: O(n log n)"""
    if len(items) <= 1:  # Base case
        return items
        
    mid = len(items) // 2
    left = merge_sort(items[:mid])   # Recurse left
    right = merge_sort(items[mid:])  # Recurse right
    
    return merge(left, right)

def merge(left, right):
    """Helper function to combine two sorted lists."""
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result


# ==========================================================
# EXERCISE 4: SORT WITH A KEY (DESCENDING BALANCES)
# ==========================================================
def sort_accounts_descending(account_tuples):
    """Sorts (name, balance) tuples by balance high-to-low using sorted keys. Time Complexity: O(n log n)"""
    return sorted(account_tuples, key=lambda x: x[1], reverse=True)


# ==========================================================
# EXERCISE 5: TWO POINTERS TARGET PAIR MATCHING
# ==========================================================
def has_pair(nums, target):
    """Checks if any two elements in a sorted list sum up to target. Time Complexity: O(n)"""
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        current_sum = nums[lo] + nums[hi]
        if current_sum == target:
            return True
        elif current_sum < target:
            lo += 1  # Need a larger number
        else:
            hi -= 1  # Need a smaller number
    return False


# ==========================================================
# EXECUTION SUITE
# ==========================================================
if __name__ == "__main__":
    print("--- Exercise 1: Recursion ---")
    print(f"Recursive Sum of [10, 20, 30, 40]: {recursive_total([10, 20, 30, 40])}")
    print("Count Down from 5:")
    count_down(5)
    print("\n")

    print("--- Exercise 2: Binary Search ---")
    balances = sorted([1200, 4500, 950, 3100, 1500])
    target_bal = 3100
    print(f"Sorted balances: {balances}")
    idx = binary_search(balances, target_bal)
    print(f"Index of {target_bal} ETB: {idx}")
    print("\n")

    print("--- Exercise 3: Merge Sort ---")
    unsorted_data = [64, 34, 25, 12, 22, 11, 90]
    print(f"Unsorted: {unsorted_data}")
    print(f"Merge Sorted: {merge_sort(unsorted_data)}")
    print("\n")

    print("--- Exercise 4: Key Sorting ---")
    accounts = [("Almaz", 1200), ("Dawit", 4500), ("Bekele", 950), ("Chaltu", 3100)]
    print("Leaderboard Sorting (Highest Balance First):")
    print(sort_accounts_descending(accounts))
    print("\n")

    print("--- Exercise 5: Two Pointers ---")
    sorted_nums = [10, 20, 35, 50, 75, 80]
    target_sum = 70
    print(f"Does {sorted_nums} contain a pair that sums to {target_sum}?: {has_pair(sorted_nums, target_sum)}")