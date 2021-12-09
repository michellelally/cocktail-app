import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import image from '../assets/harrys.png'


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: "center"
    },
})
export const Background = ({ children }) => (
    <ImageBackground
        source={image}
        resizeMode="contain"
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.05 }}
    >
        {children}
    </ImageBackground>
)

export const BackgroundContainer = ({ children }) => (
    <View>
        <ImageBackground
            source={image}
            resizeMode="contain"
            style={styles.backgroundImage}
            imageStyle={{ opacity: 0.05 }}
        >
            {children}

        </ImageBackground>
    </View>
);