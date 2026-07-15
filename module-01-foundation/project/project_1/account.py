# ==========================================================
# DAY 4: BASE ACCOUNT CLASS
# ==========================================================

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner  # Public attribute [cite: 57]
        self.account_number = number  # Public attribute [cite: 57]
        self._balance = balance  # Protected/private attribute [cite: 57]

    @property
    def balance(self):
        """Read-only property to safely access the private balance."""
        return self._balance  # [cite: 58]

    def deposit(self, amount):
        """Deposits money. Rejects non-positive amounts."""
        if amount <= 0:
            raise ValueError("Amount must be positive")  # [cite: 59]
        self._balance += amount

    def withdraw(self, amount):
        """Withdraws money. Rejects non-positive amounts and overdrafts."""
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")  # [cite: 59]
        if amount > self._balance:
            raise ValueError("Insufficient funds: Overdraft rejected")  # [cite: 59]
        self._balance -= amount

    def statement(self):
        """Prints the owner, account number, and balance in ETB."""
        print(f"Owner: {self.owner} | Account Number: {self.account_number} | Balance: {self._balance:.2f} ETB")  # [cite: 60]


# ==========================================================
# DAY 5: SUBCLASSES (THE ACCOUNT FAMILY)
# ==========================================================

class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.05):
        # super() lets the parent class set up owner, number, and balance [cite: 129, 130]
        super().__init__(owner, number, balance)  # [cite: 129, 130]
        self.rate = rate  # Unique attribute for SavingsAccount [cite: 127]

    def add_interest(self):
        """Calculates interest and deposits it using the inherited deposit() method."""
        interest = self.balance * self.rate  # [cite: 127]
        self.deposit(interest)  # [cite: 127]

    def statement(self):
        """Overrides statement() to label as [Savings]."""
        print(f"[Savings] Owner: {self.owner} | Account Number: {self.account_number} | Balance: {self.balance:.2f} ETB (Rate: {self.rate * 100}%)")  # [cite: 129]


class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=1000):
        # super() sets up parent attributes [cite: 129, 130]
        super().__init__(owner, number, balance)  # [cite: 129, 130]
        self.overdraft = overdraft  # Unique overdraft attribute [cite: 128]

    def withdraw(self, amount):
        """Overrides withdraw() to allow balances down to the overdraft limit."""
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        
        # Check if the withdrawal exceeds the available balance plus the overdraft limit [cite: 128]
        if amount > (self.balance + self.overdraft):
            raise ValueError("Insufficient funds: Exceeds overdraft limit")  # [cite: 128]
        
        # Subtract directly from the protected balance
        self._balance -= amount

    def statement(self):
        """Overrides statement() to label as [Current]."""
        print(f"[Current] Owner: {self.owner} | Account Number: {self.account_number} | Balance: {self.balance:.2f} ETB (Overdraft Limit: {self.overdraft} ETB)")  # [cite: 129]


# ==========================================================
# POLYMORPHIC LOOP (Required for Day 5 Verification)
# ==========================================================
if __name__ == "__main__":
    print("--- Testing Addis Bank Account Family V2 ---")
    
    # Create a mixed list of accounts (Polymorphism) [cite: 131]
    accounts = [
        Account("Hanna", "ADDIS-100", 1500),
        SavingsAccount("Almaz", "ADDIS-200", 1500, rate=0.05),
        CurrentAccount("Dawit", "ADDIS-300", 800, overdraft=1000)
    ]
    
    # 1. Print statements polymorphically [cite: 131]
    print("\n--- Initial Statements ---")
    for acc in accounts:
        acc.statement()  # [cite: 131]
        
    # 2. Test unique child class behavior (Interest) [cite: 127]
    print("\n--- Processing Savings Interest ---")
    savings_acc = accounts[1]  # Almaz's savings
    savings_acc.add_interest()  # [cite: 127]
    savings_acc.statement()
    
    # 3. Test unique child class overdraft behavior [cite: 128]
    print("\n--- Processing Current Overdraft Withdrawal ---")
    current_acc = accounts[2]  # Dawit's current
    print("Withdrawing 1200 ETB (balance is 800, overdraft limit is 1000)...")
    current_acc.withdraw(1200)  # [cite: 128]
    current_acc.statement()