import React from "react";
import { ScrollView, StatusBar } from "react-native";

import questions from "../data/questions";

import { RowItem } from "../components/RowItem";

export default ({ navigation }) => (
  <ScrollView>
    <StatusBar barStyle="dark-content" />
    <RowItem
      name="Begin"
      color="#36b1f0"
      onPress={() =>
        navigation.navigate("Preferences", {
          title: "Preferences",
          questions: questions,
          color: "#36b1f0"
        })
      }
    />
  </ScrollView>
);
