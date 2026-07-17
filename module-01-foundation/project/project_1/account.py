# ==========================================================
# [DAY 4 MILESTONE]: BASE ACCOUNT CLASS & ENCAPSULATION
# ==========================================================
# Core requirements met: 
# - Protected attributes (_balance) and Read-only Properties
# - Basic balance-logic checks (deposits/withdrawals validation)
# ==========================================================

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self._balance = balance
        self._observers = []  # Added in Day 6 for the Observer Pattern

    @property
    def balance(self):
        """Day 4 property: Read-only access to protected balance."""
        return self._balance

    def subscribe(self, observer):
        """Day 6 addition: Allows notification systems to attach."""
        self._observers.append(observer)

    def _notify(self, event_message):
        """Day 6 addition: Dispatches transaction notifications."""
        for observer in self._observers:
            observer.update(event_message)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
        # Day 6 integration: Triggers observers when balance alters
        self._notify(f"[Deposit] {amount:.2f} ETB. New Balance: {self._balance:.2f} ETB")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds: Overdraft rejected")
        self._balance -= amount
        # Day 6 integration: Triggers observers when balance alters
        self._notify(f"[Withdrawal] {amount:.2f} ETB. New Balance: {self._balance:.2f} ETB")

    def statement(self):
        print(f"Owner: {self.owner} | Account Number: {self.account_number} | Balance: {self._balance:.2f} ETB")


# ==========================================================
# [DAY 5 MILESTONE]: INHERITANCE, OVERRIDING & POLYMORPHISM
# ==========================================================
# Core requirements met:
# - Created specialized child types (SavingsAccount & CurrentAccount)
# - Used super().__init__() to invoke base constructor logic
# - Overrode withdraw() and statement() to custom-handle account variations
# ==========================================================

class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        # Configured to fetch setting from Day 6 Singleton instead of raw variables
        self.rate = BankConfig().interest_rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print(f"[Savings] Owner: {self.owner} | Account Number: {self.account_number} | Balance: {self.balance:.2f} ETB (Rate: {self.rate * 100}%)")


class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        # Configured to fetch setting from Day 6 Singleton instead of raw variables
        self.overdraft = BankConfig().overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > (self.balance + self.overdraft):
            raise ValueError("Insufficient funds: Exceeds overdraft limit")
        
        self._balance -= amount
        # Day 6 integration: Triggers notification for specialized transactions
        self._notify(f"[Overdraft Withdrawal] {amount:.2f} ETB. New Balance: {self._balance:.2f} ETB")

    def statement(self):
        print(f"[Current] Owner: {self.owner} | Account Number: {self.account_number} | Balance: {self.balance:.2f} ETB (Overdraft Limit: {self.overdraft} ETB)")


# ==========================================================
# [DAY 6 MILESTONE]: CLEAN OOP ARCHITECTURE & PATTERNS
# ==========================================================
# Core requirements met:
# - Applied SRP: Removed tracking/notifying responsibilities from Account
# - Singleton Pattern: Centralized bank rates and limitations
# - Factory Pattern: Dynamic object instantiation by keyword 
# - Observer Pattern: Decoupled notification streams from business logic
# ==========================================================

# --- PATTERN 1: SINGLETON CONFIGURATION ---
class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


# --- PATTERN 2: CREATIONAL ACCOUNT FACTORY ---
class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        kind = kind.lower().strip()
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        if kind == "current":
            return CurrentAccount(owner, number, balance)
        raise ValueError(f"Unknown type: {kind}")


# --- PATTERN 3: BEHAVIOURAL OBSERVER CONCRETES ---
class SMSAlert:
    def update(self, event):
        print(f"[TeleBirr SMS Notification] Alert: {event}")


class AuditLog:
    def update(self, event):
        print(f"[System Security Audit Log] Event: {event}")


# ==========================================================
# COMPREHENSIVE VERIFICATION SUITE
# ==========================================================
if __name__ == "__main__":
    print("--- Verify Day 6 Pattern 1: Singleton ---")
    config1 = BankConfig()
    config2 = BankConfig()
    print(f"Are instances identical? {config1 is config2}\n")

    print("--- Verify Day 6 Pattern 2: Factory Creation ---")
    almaz_savings = AccountFactory.create("savings", "Almaz", "CBE-001", 1500)
    dawit_current = AccountFactory.create("current", "Dawit", "CBE-002", 800)
    
    almaz_savings.statement()
    dawit_current.statement()

    print("\n--- Verify Day 6 Pattern 3: Observer Alerting (SRP) ---")
    sms = SMSAlert()
    log = AuditLog()
    
    almaz_savings.subscribe(sms)
    almaz_savings.subscribe(log)
    dawit_current.subscribe(sms)

    print("\nExecuting transactions to watch observers trigger...")
    almaz_savings.add_interest()     # Fires SMS & Log streams simultaneously
    print("-" * 50)
    dawit_current.withdraw(1200)     # Fires SMS stream only