import React, { useState } from "react";
import { View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { styles } from "./styles/HomeScreenStyles";
import { ScrollView } from "react-native-gesture-handler";
import { Card, List } from "react-native-paper";
import { TransactionService, Transaction } from "@/services/services";
import { useEffect } from "react";

const HomeScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadTransactions = async () => {
      const transactionList = await TransactionService.getTransactions();
      setTransactions(transactionList);
    };

    loadTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {transactions.map((transaction: Transaction) => (
          <TransactionItem key={transaction.date} transaction={transaction} />
        ))}
      </ScrollView>
    </View>
  );
};

interface TransactionProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionProps) => {
  return (
    <Card style={styles.item}>
      <List.Item
        title={transaction.description}
        description={transaction.amount}
        left={(defaultProps) => (
          <List.Icon
            {...defaultProps}
            icon={() => <Fontisto name="dollar" size={30} />}
          />
        )}
      />
    </Card>
  );
};

export default HomeScreen;
