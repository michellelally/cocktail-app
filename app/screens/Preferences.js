import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";
import { Button, ButtonContainer } from "../components/Button";
import { Alert } from "../components/Alert";
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { NavigationEvents } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between"
  }
});

class Preferences extends React.Component {

  arr = [];

  state = {
    activeQuestionIndex: 0,
    answered: false,
    totalCount: 2
  };

  answer = text => {
    this.setState(
      state => {
        const nextState = { answered: true };
        this.arr.push(text);
        return nextState;
      },
      () => {
        this.nextQuestion();
      }
    );
  };

  nextQuestion() {
    this.setState(state => {
      const nextIndex = state.activeQuestionIndex + 1;

      if (nextIndex >= state.totalCount) {
        this.setState({ activeQuestionIndex: 0 })
        return this.props.navigation.navigate("DisplayCocktails", {
          preferences: this.arr,
        });
      }

      return {
        activeQuestionIndex: nextIndex,
        answered: false
      };
    });
  }

  render() {

    const questions = this.props.route.params.questions;
    const question = questions[this.state.activeQuestionIndex];

    return (
      <View
        style={[
          styles.container
        ]}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          <View>
            <Text style={styles.text}>{question.question}</Text>
            <ButtonContainer>
              {question.answers.map(answer => (
                <Button
                  key={answer.id}
                  text={answer.text}
                  onPress={() => this.answer(answer.text)}
                />
              ))}
            </ButtonContainer>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default Preferences;
