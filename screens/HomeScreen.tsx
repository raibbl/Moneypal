import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles/HomeScreenStyles";
import { List } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Transactions</Text> */}
      <ScrollView>
        <List.Section>
          <List.Subheader>Some title</List.Subheader>
          <List.Item title="First Item" />
          <List.Item title="Second Item" />
        </List.Section>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
