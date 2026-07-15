class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self._balance = balance

    @property
    def balance(self):
        """Read-only property to access the private balance."""
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount

    def withdraw(self, amount):
        """Withdraws money. Rejects non-positive amounts and overdrafts."""
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds: Overdraft rejected")
        self._balance -= amount

    def statement(self):
        """Prints the owner, account number, and balance in ETB."""
        print(f"Owner: {self.owner} | Account Number: {self.account_number} | Balance: {self._balance} ETB")