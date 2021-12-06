import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {

    },
    box: {
        width: 200,
        height: 200,
        float: 'left',
        backgroundColor: 'violet',
        flexDirection: 'row',  
        borderRadius: 10,
        marginLeft: 41,
        marginRight: 40,
        marginTop: 43
    },
    text: {
        marginLeft: 8,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20
    },
    transforms: {
        transform: [
            { rotateZ: "48deg" }
        ]
    }
});

export const Button = ({ text, onPress = () => { } }) => (
    <TouchableOpacity onPress={onPress} style={[styles.box, styles.transforms]}>
        <Text style={[styles.text, {
            transform: [
                { rotateZ: "-50deg" }
            ]
        }]}> {text}</Text>
    </TouchableOpacity>
);
