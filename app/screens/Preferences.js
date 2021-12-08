import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";
import { Button, ButtonContainer } from "../components/Button";

class Preferences extends React.Component {

  preferences = [];
  
  state = {
    activeQuestionIndex: 0,
    answered: false,
    totalCount: 2
  };


  answer = text => {
    this.setState(
      state => {
        const nextState = { answered: true };
        this.preferences.push(text);
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
        this.props.navigation.navigate("DisplayCocktails", {
          preferences: this.preferences
        });
        this.preferences = []
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
    // Get it from props
    return (
      <View style={styles.container}>
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

export default Preferences;
