import React, { Component, useEffect, useState } from 'react';
import Video from "react-native-video";
import { StyleSheet } from "react-native";

import {
    StyleSheet,
    Button,
    View,
    Text,
} from 'react-native';


const [arr, setArr] = useState([]);

// array of questions
// this stores the different types of alcohol and flavour descriptions that the user can choose from
const questions = [
    {
        // the heading
        questionText: 'PICK YOUR POISON',
        answerOptions: [
            // the options
            { answerText: 'Vodka' },
            { answerText: 'Whiskey' },
            { answerText: 'Gin' },
            { answerText: 'Rum' },
            { answerText: 'Tequila' },
            { answerText: 'Other' },
        ],
    },
    {
        // the heading
        questionText: 'PICK YOUR FLAVOUR',
        answerOptions: [
            // the options
            { answerText: 'Sweet' },
            { answerText: 'Boozy' },
            { answerText: 'Sour' },
            { answerText: 'Refreshing' },
            { answerText: 'Spicy' },
            { answerText: 'All' },
        ],
    },
];

// stores the questions
const [currentQuestion, setCurrentQuestion] = useState(0);

// used for knowing when the user has made their choices
const [complete, setComplete] = useState(false);

// i got this function from the tutorial mentioned above
// it is called when the user clicks a button to display the next set of choices
const handleAnswerButtonClick = (answerOption) => {
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);

    // checking if it has reached the end of the questions
    if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
    } else {
        setComplete(true);
    }
};

// this is for storing the choices the user picked to an array to be passed to the cocktail component
const handleValue = (e) => {
    const value = e.target.value
    setArr((oldArray) => oldArray.concat(value))
}

function Preferences() {
    return(
        <View>
            <Text>Preferences</Text>
        </View>
    );
};

export default Preferences;

import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Button,
  View,
  Text,
} from 'react-native';

export default function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.transforms]}>
        <Text style={[styles.text, {
          transform: [
            { rotateZ: "-50deg" }
          ]
        }]}> BEGIN</Text >
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   box: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'violet',
//     borderRadius: 10
//   },
//   text: {
//     marginLeft: 8,
//     marginTop: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: 20
//   },
//   transforms: {
//     transform: [
//       { rotateZ: "50deg" }
//     ]
//   }
// });