import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light gray background
    padding: 15,
  },
  card: {
    width: "100%",
    alignSelf: "center", // Ensures it does not float awkwardly
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 }, // Reduce height to avoid "floating" effect
    shadowOpacity: 0.1, // Lower shadow intensity
    shadowRadius: 3,
    elevation: 3, // Reduce elevation to make it more subtle
    backgroundColor: "#fff",
  },
});
