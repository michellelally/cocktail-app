import React, { Component, TouchableOpacity, Fragment } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from "react-native";
import styled from "styled-components/native";
import Video from "react-native-video";
import questions from "../data/questions";
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RowItem } from "../components/RowItem";
import { ScrollView, StatusBar } from "react-native";
import Footer from '../components/Footer'

const { width, height } = Dimensions.get("window");

export default function Home() {

  const navigation = useNavigation();

  function navigateToMenu() {
    navigation.navigate("ListCocktails");
  }

  function navigateToPreferences() {
    navigation.navigate("Preferences", {
      title: "Preferences",
      questions: questions,
      color: "#36b1f0"
    })
  }

  return (
    <View>
      {/* <Video
          source={require("../assets/harrys.mp4")}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
        /> */}

      <Wrapper>
        <Logo
          source={require("../assets/harrys.png")}
          width={50}
          height={50}
          resizeMode="contain"
        />
        <Title>Can't decide on what to drink?</Title>
        <TextDescription>
          Click begin for our interactive cocktail menu!
          </TextDescription>
        <ButtonWrapper>
          <Fragment>
            <Button title="Begin"
              onPress={() => navigateToPreferences()}
            />
            <Button transparent title="Menu"
              onPress={() => navigateToMenu()}
            />
          </Fragment>
        </ButtonWrapper>
      </Wrapper>

    {/* <NavigationContainer>
      <Footer></Footer>
    </NavigationContainer> */}
    {/* <Footer/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  }
});

// styled-component

export const Wrapper = styled.View`
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  flex-direction: column;
`;
export const Logo = styled.Image`
  max-width: 100px;
  width: 100px;
  height: 100px;
`;
export const TextDescription = styled.Text`
  color: #f4f4f4;
  text-align: center;
  text-transform: uppercase;
`;
export const ButtonWrapper = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
export const Title = styled.Text`
  color: #f4f4f4;
  margin: 30% 0px 20px;
  font-size: 30;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
`;
const StyledButton = styled.TouchableHighlight`
 width:250px;
 background-color:${props => (props.transparent ? "transparent" : "#f3f8ff")};
 padding:15px;
border:${props => (props.transparent ? "1px solid #f3f8ff " : 0)}
 justify-content:center;
 margin-bottom:20px;
 border-radius:24px
`;
export const StyledTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  color: ${props => (props.transparent ? "#f3f8ff " : "#666")};
`;

export const Button = ({ onPress, color, ...props }) => {
  return (
    <StyledButton {...props} onPress={onPress}>
      <StyledTitle {...props}>{props.title}</StyledTitle>
    </StyledButton>
  );
};
