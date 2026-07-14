import os

# Define file names
INPUT_FILE = "transactions.txt"
OUTPUT_FILE = "report.txt"


def generate_sample_data():
    """Helper function to create a sample transactions file if it doesn't exist."""
    sample_data = """Abebe,150.50
Mulu,300.00
Abebe,50.25
Chala,450.00
Mulu,120.00
Aster,95.10
"""
    with open(INPUT_FILE, "w") as f:
        f.write(sample_data.strip())
    print(f"Created a sample '{INPUT_FILE}' for testing.")


def main():
    # Step 4: Wrap the file read in try / except for a missing file
    try:
        # If the file doesn't exist, we'll auto-generate it for testing purposes
        if not os.path.exists(INPUT_FILE):
            print(f"Warning: '{INPUT_FILE}' not found.")
            generate_sample_data()

        # Step 2: Build a dict mapping each customer to their total spend
        customer_totals = {}

        # Step 1: Read transactions.txt line by line (name, amount per line)
        with open(INPUT_FILE, "r") as file:
            for line_num, line in enumerate(file, 1):
                line = line.strip()
                if not line:
                    continue  # Skip empty lines

                try:
                    name, amount_str = line.split(",")
                    amount = float(amount_str)

                    # Update customer total spend
                    customer_totals[name] = (
                        customer_totals.get(name, 0.0) + amount
                    )

                except ValueError:
                    print(
                        f"Skipping malformed data at line {line_num}: '{line}'"
                    )

        # Step 3: Sort each customer and total, highest spend first
        # sorted() returns a list of tuples: (name, total)
        sorted_customers = sorted(
            customer_totals.items(), key=lambda item: item[1], reverse=True
        )

        # Print the results to console (Step 3 verification)
        print("\n--- Transaction Summary (Sorted Highest First) ---")
        for name, total in sorted_customers:
            print(f"{name}: {total:.2f}")

        # Step 5: Write the summary to report.txt
        with open(OUTPUT_FILE, "w") as out_file:
            out_file.write("Customer Transaction Summary Report\n")
            out_file.write("====================================\n")
            for name, total in sorted_customers:
                out_file.write(f"{name}: {total:.2f}\n")

        print(f"\nSuccess! Summary report written to '{OUTPUT_FILE}'.")

    except FileNotFoundError:
        # This block catches the error if auto-generation is disabled or fails
        print(
            f"Error: Could not find the input file '{INPUT_FILE}'. Please ensure it is in the same folder."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


if __name__ == "__main__":
    main()