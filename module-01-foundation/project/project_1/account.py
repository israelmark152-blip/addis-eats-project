from collections import deque
import heapq

# ==========================================================
# [DAY 4 MILESTONE]: BASE ACCOUNT CLASS & ENCAPSULATION
# ==========================================================
class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self._balance = balance
        self._observers = []
        self.history = []  # Day 7: Transaction history stack (LIFO)

    @property
    def balance(self):
        return self._balance

    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, event_message):
        for observer in self._observers:
            observer.update(event_message)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
        self.history.append(("deposit", amount))
        self._notify(f"[Deposit] {amount:.2f} ETB. New Balance: {self._balance:.2f} ETB")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds: Overdraft rejected")
        self._balance -= amount
        self.history.append(("withdraw", amount))
        self._notify(f"[Withdrawal] {amount:.2f} ETB. New Balance: {self._balance:.2f} ETB")

    def statement(self):
        print(f"Owner: {self.owner} | Account Number: {self.account_number} | Balance: {self._balance:.2f} ETB")


# ==========================================================
# [DAY 5 MILESTONE]: INHERITANCE, OVERRIDING & POLYMORPHISM
# ==========================================================
class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.rate = BankConfig().interest_rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print(f"[Savings] Owner: {self.owner} | Account Number: {self.account_number} | Balance: {self.balance:.2f} ETB (Rate: {self.rate * 100}%)")


class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.overdraft = BankConfig().overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > (self.balance + self.overdraft):
            raise ValueError("Insufficient funds: Exceeds overdraft limit")
        
        self._balance -= amount
        self.history.append(("withdraw", amount))
        self._notify(f"[Overdraft Withdrawal] {amount:.2f} ETB. New Balance: {self._balance:.2f} ETB")

    def statement(self):
        print(f"[Current] Owner: {self.owner} | Account Number: {self.account_number} | Balance: {self.balance:.2f} ETB (Overdraft Limit: {self.overdraft} ETB)")


# ==========================================================
# [DAY 6 MILESTONE]: CLEAN OOP ARCHITECTURE & PATTERNS
# ==========================================================
class BankConfig:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        kind = kind.lower().strip()
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        if kind == "current":
            return CurrentAccount(owner, number, balance)
        raise ValueError(f"Unknown type: {kind}")


# ==========================================================
# [DAY 7 MILESTONE]: ACCOUNT REGISTRY & LINEAR STRUCTURES
# ==========================================================
class AccountRegistry:
    def __init__(self):
        self.by_number = {}
        self.order = []

    def add(self, acc):
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)

    def list_all(self):
        return [self.by_number[num] for num in self.order]

    def undo_last(self, number):
        account = self.by_number.get(number)
        if not account or not account.history:
            return
        tx_type, amount = account.history.pop()
        if tx_type == "deposit":
            account._balance -= amount
        elif tx_type == "withdraw":
            account._balance += amount

# ==========================================================
# [DAY 8 MILESTONE]: SEARCHING, SORTING & RECURSION
# ==========================================================
    def top_by_balance(self, n=5):
        return sorted(self.by_number.values(), key=lambda a: a.balance, reverse=True)[:n]

    def find_by_number(self, number):
        sorted_numbers = sorted(self.by_number.keys())
        lo, hi = 0, len(sorted_numbers) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if sorted_numbers[mid] == number:
                return self.by_number[sorted_numbers[mid]]
            elif sorted_numbers[mid] < number:
                lo = mid + 1
            else:
                hi = mid - 1
        return None

    def total_transactions(self, number):
        account = self.find_by_number(number)
        if not account:
            return 0.0

        def _recursive_sum(history_list, index):
            if index >= len(history_list):
                return 0.0
            _, amount = history_list[index]
            return amount + _recursive_sum(history_list, index + 1)

        return _recursive_sum(account.history, 0)


# ==========================================================
# [DAY 9 MILESTONE]: TREES & GRAPHS MODELING
# ==========================================================
class Branch:
    """Models organizational structure as a hierarchical tree."""
    def __init__(self, name):
        self.name = name
        self.children = []  # Sub-branches (children nodes)
        self.accounts = []  # Accounts belonging to this branch

    def add_child(self, branch_node):
        self.children.append(branch_node)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):
        """Recursively sums the balances of this branch and all sub-branches."""
        total = sum(a.balance for a in self.accounts)
        for child in self.children:
            total += child.total_balance()
        return total


def bfs_reachable_transfers(transfers_graph, start_account):
    """Breadth-First Search (BFS) to trace all accounts reachable via transfer network."""
    seen = {start_account}
    queue = deque([start_account])
    
    while queue:
        current = queue.popleft()
        for neighbor in transfers_graph.get(current, []):
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)
    return seen


# ==========================================================
# DAY 9 VERIFICATION SUITE
# ==========================================================
if __name__ == "__main__":
    print("--- Testing Day 9: Branch Hierarchy Tree ---")
    head_office = Branch("Head Office - Addis Ababa")
    regional_north = Branch("Northern Region")
    sub_branch_mekelle = Branch("Mekelle Main")
    
    # Establish 3-level tree hierarchy
    head_office.add_child(regional_north)
    regional_north.add_child(sub_branch_mekelle)

    # Attach accounts
    a1 = AccountFactory.create("savings", "Almaz", "CBE-101", 1200)
    a2 = AccountFactory.create("current", "Dawit", "CBE-102", 4500)
    a3 = AccountFactory.create("savings", "Bekele", "CBE-103", 950)

    head_office.add_account(a1)
    regional_north.add_account(a2)
    sub_branch_mekelle.add_account(a3)

    print(f"Total Bank System Reserve Balance (Recursive Tree Sum): {head_office.total_balance():.2f} ETB")

    print("\n--- Testing Day 9: Transfer Network Graph (BFS) ---")
    transfers = {
        "CBE-101": ["CBE-102", "CBE-103"],
        "CBE-102": ["CBE-104"],
        "CBE-103": ["CBE-102"],
        "CBE-104": []
    }

    reachable = bfs_reachable_transfers(transfers, "CBE-101")
    print(f"Accounts reachable from CBE-101 via transfer paths: {reachable}")