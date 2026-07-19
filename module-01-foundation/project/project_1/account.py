from collections import deque

# ==========================================================
# [DAY 4 MILESTONE]: BASE ACCOUNT CLASS & ENCAPSULATION
# ==========================================================
class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self._balance = balance
        self._observers = []  # Added in Day 6
        
        # --- Day 7 Addition: Per-Account Transaction History Stack ---
        # Stacks follow Last-In, First-Out (LIFO). We store tuples: (type, amount)
        self.history = []

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
        
        # Day 7: Record transaction onto the history stack
        self.history.append(("deposit", amount))
        
        self._notify(f"[Deposit] {amount:.2f} ETB. New Balance: {self._balance:.2f} ETB")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds: Overdraft rejected")
        self._balance -= amount
        
        # Day 7: Record transaction onto the history stack
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
        # Day 7: Record specialized withdrawal onto the history stack
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
# Core requirements met:
# - AccountRegistry uses a Dict for O(1) searches by account number.
# - Maintains an internal list alongside it to retain exact insertion order.
# - Implements undo_last() reversing mutations utilizing a history stack (LIFO).
# ==========================================================

class AccountRegistry:
    def __init__(self):
        self.by_number = {}  # Map: account_number -> Account object (O(1) lookups)
        self.order = []      # List: tracking insertion sequence for sequential rendering

    def add(self, acc):
        """Adds an account to the registry. Time Complexity: O(1)"""
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)

    def find(self, number):
        """Finds an account via dictionary lookup. Time Complexity: O(1)"""
        return self.by_number.get(number)

    def list_all(self):
        """Returns all registered accounts in the order they were added. Time Complexity: O(n)"""
        return [self.by_number[num] for num in self.order]

    def undo_last(self, number):
        """Pops the most recent transaction from the stack and reverses its operation (LIFO)."""
        account = self.find(number)
        if not account:
            print("Account not found.")
            return

        if not account.history:
            print(f"No transactions to undo for account {number}.")
            return

        # Pop the latest transaction record from the stack
        tx_type, amount = account.history.pop()
        print(f"\n[UNDOING] Last action was a '{tx_type}' of {amount:.2f} ETB...")

        # Reverse the exact effect on the private balance variable directly
        if tx_type == "deposit":
            account._balance -= amount
            account._notify(f"[Undo Deposit] Removed {amount:.2f} ETB. Rolled back balance: {account.balance:.2f} ETB")
        elif tx_type == "withdraw":
            account._balance += amount
            account._notify(f"[Undo Withdrawal] Restored {amount:.2f} ETB. Rolled back balance: {account.balance:.2f} ETB")


# ==========================================================
# COMPREHENSIVE VERIFICATION SUITE
# ==========================================================
if __name__ == "__main__":
    print("--- Verify Day 7: Account Registry Operations ---")
    registry = AccountRegistry()

    # Create accounts using our Day 6 Factory
    acc1 = AccountFactory.create("savings", "Almaz", "CBE-001", 1000)
    acc2 = AccountFactory.create("current", "Dawit", "CBE-002", 500)

    # Attach Day 6 Observers
    sms = SMSAlert()
    acc1.subscribe(sms)
    acc2.subscribe(sms)

    # Add to Day 7 Registry
    registry.add(acc1)
    registry.add(acc2)

    print("\nListing all accounts in insertion order:")
    for account in registry.list_all():
        account.statement()

    print("\nTesting O(1) lookup functionality:")
    found = registry.find("CBE-001")
    if found:
        print(f"Successfully located account! Owner: {found.owner}")

    print("\n--- Testing Day 7 Stack Mutation & Undo ---")
    # Perform transactions
    acc1.deposit(500)   # Balance becomes 1500
    acc1.withdraw(200)  # Balance becomes 1300

    # Undo the last transaction (the 200 withdrawal)
    registry.undo_last("CBE-001")
    
    # Undo the transaction before that (the 500 deposit)
    registry.undo_last("CBE-001")

    print("\nFinal verified account status after rollbacks:")
    acc1.statement()