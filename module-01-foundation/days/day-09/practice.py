import heapq
from collections import deque

# ==========================================================
# EXERCISE 1: BINARY SEARCH TREE (BST) & IN-ORDER TRAVERSAL
# ==========================================================
class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    """Inserts a value into the Binary Search Tree."""
    if root is None:
        return BSTNode(value)
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    return root

def in_order(node):
    """In-order traversal yields sorted values."""
    if node is None:
        return []
    return in_order(node.left) + [node.value] + in_order(node.right)


# ==========================================================
# EXERCISE 2: RECURSIVE TREE DEPTH / HEIGHT
# ==========================================================
def tree_height(node):
    """Returns maximum depth of a binary tree."""
    if node is None:
        return 0
    return 1 + max(tree_height(node.left), tree_height(node.right))


# ==========================================================
# EXERCISE 3: GRAPH BREADTH-FIRST SEARCH (BFS)
# ==========================================================
def bfs(graph, start):
    """Level-by-level graph traversal using a queue."""
    seen = {start}
    q = deque([start])
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                q.append(neighbor)
    return order


# ==========================================================
# EXERCISE 4: GRAPH DEPTH-FIRST SEARCH (DFS)
# ==========================================================
def dfs(graph, start, visited=None):
    """Explores path deeply before backtracking using recursion."""
    if visited is None:
        visited = []
    visited.append(start)
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited


# ==========================================================
# EXERCISE 5: PRIORITY QUEUE WITH HEAPQ
# ==========================================================
def run_priority_queue():
    """Pushes tuples into min-heap and pops them in priority order."""
    queue = []
    tasks = [(5, "Audit Report"), (1, "Critical System Patch"), (3, "Database Backup"), (2, "High-Value Transfer"), (4, "User Support")]
    
    for item in tasks:
        heapq.heappush(queue, item)
        
    popped_order = []
    while queue:
        popped_order.append(heapq.heappop(queue))
    return popped_order


# ==========================================================
# EXECUTION SUITE
# ==========================================================
if __name__ == "__main__":
    print("--- Exercise 1: BST In-Order Traversal ---")
    balances = [4500, 1200, 950, 3100, 1500]
    root = None
    for b in balances:
        root = insert(root, b)
    print(f"Inserted: {balances}")
    print(f"In-Order Sorted Output: {in_order(root)}\n")

    print("--- Exercise 2: Tree Height ---")
    print(f"Tree Depth / Height: {tree_height(root)}\n")

    print("--- Exercise 3 & 4: Graph BFS vs DFS ---")
    sample_graph = {
        "Almaz": ["Dawit", "Tigist"],
        "Dawit": ["Samuel"],
        "Tigist": ["Hanna"],
        "Samuel": [],
        "Hanna": []
    }
    print(f"BFS Order: {bfs(sample_graph, 'Almaz')}")
    print(f"DFS Order: {dfs(sample_graph, 'Almaz')}\n")

    print("--- Exercise 5: Priority Queue (heapq) ---")
    print("Tasks popped by highest priority (lowest rank number):")
    for priority, task in run_priority_queue():
        print(f" Priority {priority}: {task}")