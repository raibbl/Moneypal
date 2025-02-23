import { Screens } from "@/App";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./styles/AddTransactionStyles";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { TransactionService } from "@/services/services";

export function AddTransaction() {
  const navigation = useNavigation<StackNavigationProp<Screens>>();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // Save Transaction
  const handleSaveTransaction = async () => {
    const success = await TransactionService.saveTransaction(
      amount,
      description
    );
    if (success) {
      Alert.alert("Success", "Transaction added!");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Please enter all fields");
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={{ fontSize: 18 }}>Amount:</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={{ fontSize: 18 }}>Description:</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
          value={description}
          onChangeText={setDescription}
        />
        <Button onPress={handleSaveTransaction}>Save Transaction</Button>
      </Card>
    </View>
  );
}
