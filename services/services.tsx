import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Transaction {
  amount: string;
  description: string;
  date: string;
}

export class TransactionService {
  private static STORAGE_KEY = "transactions";

  // Save a transaction
  static async saveTransaction(
    amount: string,
    description: string
  ): Promise<boolean> {
    if (!amount || !description) {
      return false;
    }

    try {
      const newTransaction: Transaction = {
        amount,
        description,
        date: new Date().toISOString(),
      };

      // Get existing transactions from AsyncStorage
      const existing = await AsyncStorage.getItem(this.STORAGE_KEY);
      const transactions: Transaction[] = existing ? JSON.parse(existing) : [];

      // Add new transaction & save back to AsyncStorage
      transactions.push(newTransaction);
      await AsyncStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(transactions)
      );

      return true;
    } catch (error) {
      console.error("Error saving transaction:", error);
      return false;
    }
  }

  // Get all transactions
  static async getTransactions(): Promise<Transaction[]> {
    try {
      const existing = await AsyncStorage.getItem(this.STORAGE_KEY);
      return existing ? JSON.parse(existing) : [];
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  }

  static async clearTransactions(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing transactions:", error);
    }
  }
}
