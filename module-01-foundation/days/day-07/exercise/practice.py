import time
from collections import deque

# ==========================================================
# EXERCISE 1: NAME THE BIG-O[cite: 2]
# ==========================================================
"""
1. A list index lookup: O(1) - Python lists are arrays; accessing by index jumps straight to the memory address[cite: 2].
2. A single loop: O(n) - The runtime scales linearly with the number of elements[cite: 2].
3. A nested loop over same data: O(n^2) - Every item is compared against every other item (quadratic growth)[cite: 2].
4. A dictionary lookup: O(1) - Uses a hash function to jump instantly to the value without scanning[cite: 2].
5. A binary search: O(log n) - The problem space is cut in half at each step[cite: 2].
"""

# ==========================================================
# EXERCISE 2: LIST VS. DICT LOOKUP BENCHMARK[cite: 2]
# ==========================================================
def run_lookup_benchmark():
    print("--- Exercise 2: List vs. Dict Lookup ---")
    size = 100000
    target_account = "CBE-99999"  # Near the end to show worst-case performance[cite: 2]

    # Create datasets
    account_list = [f"CBE-{i}" for i in range(size)]
    account_dict = {f"CBE-{i}": i for i in range(size)}

    # Time List Lookup (O(n))
    start_time = time.perf_counter()
    _ = target_account in account_list
    list_duration = time.perf_counter() - start_time
    print(f"List Lookup (O(n)): {list_duration:.6f} seconds[cite: 2]")

    # Time Dict Lookup (O(1))
    start_time = time.perf_counter()
    _ = target_account in account_dict
    dict_duration = time.perf_counter() - start_time
    print(f"Dict Lookup (O(1)): {dict_duration:.6f} seconds[cite: 2]")
    print(f"Dictionary was roughly {list_duration / max(dict_duration, 1e-9):.1f}x faster!\n")


# ==========================================================
# EXERCISE 3: BUILD A STACK (LIFO)[cite: 2]
# ==========================================================
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)  # O(1)[cite: 2]

    def pop(self):
        if not self.is_empty():
            return self.items.pop()  # O(1)[cite: 2]
        return None

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None

    def is_empty(self):
        return len(self.items) == 0


def reverse_names_with_stack():
    print("--- Exercise 3: Stack Name Reversal ---")
    names = ["Almaz", "Dawit", "Kebede", "Aster"]
    print(f"Original list: {names}")
    
    stack = Stack()
    for name in names:
        stack.push(name)
        
    reversed_names = []
    while not stack.is_empty():
        reversed_names.append(stack.pop())
        
    print(f"Reversed via Stack (LIFO): {reversed_names}\n")


# ==========================================================
# EXERCISE 4: BUILD A QUEUE (FIFO)[cite: 2]
# ==========================================================
def run_bank_queue():
    print("--- Exercise 4: Bank Line Queue ---")
    # Using collections.deque for true O(1) front pops[cite: 2]
    bank_line = deque()

    # Enqueue 5 customers[cite: 2]
    customers = ["Almaz", "Dawit", "Bekele", "Chaltu", "Ephrem"]
    for customer in customers:
        bank_line.append(customer)
        print(f"-> {customer} joined the queue.")

    print("\nServing customers in fair order:")
    # Serve them in order (FIFO)[cite: 2]
    while bank_line:
        served = bank_line.popleft()  # O(1)[cite: 2]
        print(f"<- Serving Customer: {served}")
    print()


# ==========================================================
# EXERCISE 5: SINGLY LINKED LIST[cite: 2]
# ==========================================================
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None  # Points to the next node, or None[cite: 2]


class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, data):
        """Inserts an element at the very front. Time Complexity: O(1)[cite: 2]"""
        new_node = Node(data)
        new_node.next = self.head  # Repoint new node to current head[cite: 2]
        self.head = new_node       # Move head to the new node[cite: 2]

    def print_all(self):
        """Walks the chain from head to tail. Time Complexity: O(n)[cite: 2]"""
        current = self.head
        chain = []
        while current:
            chain.append(str(current.data))
            current = current.next
        print(" -> ".join(chain) + " -> None")


def run_linked_list_demo():
    print("--- Exercise 5: Singly Linked List ---")
    ll = LinkedList()
    ll.push_front("Account 3")
    ll.push_front("Account 2")
    ll.push_front("Account 1")
    
    print("Linked List structure:")
    ll.print_all()


# ==========================================================
# RUNNER
# ==========================================================
if __name__ == "__main__":
    run_lookup_benchmark()
    reverse_names_with_stack()
    run_bank_queue()
    run_linked_list_demo()