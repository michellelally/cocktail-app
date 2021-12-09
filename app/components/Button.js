import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(225, 84, 0, 0.9)",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,

  },
  text: {
    color: "#ffffff",
    fontSize: 15,
    textAlign: "center",
    fontFamily: 'sans-serif-light',
    textTransform: 'uppercase'
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 0,
    justifyContent: "space-between"
  }
});

export const Button = ({ text, onPress = () => { } }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export const ButtonContainer = ({ children }) => (
  <View style={styles.buttonContainer}>{children}</View>
);