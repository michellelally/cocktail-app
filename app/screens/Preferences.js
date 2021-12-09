import React, { useState } from "react";
import { ImageBackground, View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";
import { Button, ButtonContainer } from "../components/Button";
import image from '../assets/harrys.png'
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
        {/* <ImageBackground
          source={image}
          resizeMode="contain"
          style={styles.image}
          imageStyle={{ opacity: 0.5 }}
        > */}
          <StatusBar barStyle="light-content" />
          <SafeAreaView style={styles.safearea}>
            <View>
              <Text style={styles.text}>{question.question}</Text>
              <ButtonContainer>
                {question.answers.map(answer => (
                  <Button
                    styles={styles.text}
                    key={answer.id}
                    text={answer.text}
                    onPress={() => this.answer(answer.text)}
                  />
                ))}
              </ButtonContainer>
            </View>
          </SafeAreaView>
        {/* </ImageBackground> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(169, 169, 169)',
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    color: "#000000",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: 'Poppins-ExtraLight.ttf'
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  safearea: {
    flex: 1,
    marginTop: 75,
    justifyContent: "space-between"
  }
});

export default Preferences;
