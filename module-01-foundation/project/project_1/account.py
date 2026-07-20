from collections import deque

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


class SMSAlert:
    def update(self, event):
        print(f"[TeleBirr SMS Notification] Alert: {event}")


class AuditLog:
    def update(self, event):
        print(f"[System Security Audit Log] Event: {event}")


# ==========================================================
# [DAY 7 MILESTONE]: LINEAR STRUCTURES & BIG-O WAREHOUSE
# ==========================================================
class AccountRegistry:
    def __init__(self):
        self.by_number = {}  # Map: account_number -> Account object
        self.order = []      # List: tracking insertion sequence

    def add(self, acc):
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)

    def find(self, number):
        return self.by_number.get(number)

    def list_all(self):
        return [self.by_number[num] for num in self.order]

    def undo_last(self, number):
        account = self.find(number)
        if not account or not account.history:
            return
        tx_type, amount = account.history.pop()
        if tx_type == "deposit":
            account._balance -= amount
        elif tx_type == "withdraw":
            account._balance += amount


# ==========================================================
# [DAY 8 MILESTONE]: RECURSION, SEARCHING & SORTING
# ==========================================================
# Core requirements met:
# - Leaderboard sorting using custom key functions (O(n log n))
# - Standalone Binary Search implementation algorithm (O(log n))
# - Deep calculation using recursive stack traces (no loops allowed)
# ==========================================================

    # --- Day 8 Task 1: Timsort Balance Leaderboard ---
    def top_by_balance(self, n=5):
        """Returns the top n highest-balance accounts in order using Timsort."""
        accts = sorted(self.by_number.values(), key=lambda a: a.balance, reverse=True)
        return accts[:n]

    # --- Day 8 Task 2: Pure Binary Search Implementation ---
    def find_by_number(self, number):
        """Finds an account using a pure O(log n) binary search on sorted keys."""
        sorted_numbers = sorted(self.by_number.keys())
        
        # Binary search logic bounds
        lo, hi = 0, len(sorted_numbers) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if sorted_numbers[mid] == number:
                # Target matched, retrieve the instance from dictionary mapping
                return self.by_number[sorted_numbers[mid]]
            elif sorted_numbers[mid] < number:
                lo = mid + 1  # Target is in the upper half
            else:
                hi = mid - 1  # Target is in the lower half
        return None

    # --- Day 8 Task 3: Recursive Transaction Valuation ---
    def total_transactions(self, number):
        """Sums an account's total transaction volume recursively (no loops)."""
        account = self.find_by_number(number)
        if not account:
            return 0.0

        # Inner helper to process history stack list recursively
        def _recursive_sum(history_list, index):
            # Base case: we reached the end of the history array
            if index >= len(history_list):
                return 0.0
            
            # Recursive case: process current element and add to remaining stack
            _, amount = history_list[index]
            return amount + _recursive_sum(history_list, index + 1)

        return _recursive_sum(account.history, 0)


# ==========================================================
# DAY 8 COMPREHENSIVE VERIFICATION SUITE
# ==========================================================
if __name__ == "__main__":
    print("--- Initializing Day 8 Verification Suite ---")
    registry = AccountRegistry()

    # Create several tracking test entries
    a1 = AccountFactory.create("savings", "Almaz", "CBE-101", 1200)
    a2 = AccountFactory.create("current", "Dawit", "CBE-102", 4500)
    a3 = AccountFactory.create("savings", "Bekele", "CBE-103", 950)
    a4 = AccountFactory.create("current", "Chaltu", "CBE-104", 3100)

    registry.add(a1)
    registry.add(a2)
    registry.add(a3)
    registry.add(a4)

    print("\n--- Testing Day 8 Task 1: Leaderboard Generation ---")
    print("Top 3 accounts ranking by balance:")
    for rank, account in enumerate(registry.top_by_balance(3), start=1):
        print(f"Rank #{rank}: {account.owner} | Balance: {account.balance} ETB")

    print("\n--- Testing Day 8 Task 2: Binary Search Optimization ---")
    search_target = "CBE-104"
    print(f"Executing binary search lookup for account number '{search_target}'...")
    found_account = registry.find_by_number(search_target)
    if found_account:
        print(f"Target located! Account Details -> Owner: {found_account.owner} | Balance: {found_account.balance} ETB")
    else:
        print("Error: Target account not found.")

    print("\n--- Testing Day 8 Task 3: Recursive Transaction Summing ---")
    # Execute a stream of operations on Dawit's account
    print("Simulating transaction stream for Dawit...")
    a2.deposit(500)   # tx 1: 500
    a2.withdraw(200)  # tx 2: 200
    a2.deposit(100)   # tx 3: 100

    total_volume = registry.total_transactions("CBE-102")
    print(f"Calculation complete! Total transactional changes calculated recursively: {total_volume:.2f} ETB")