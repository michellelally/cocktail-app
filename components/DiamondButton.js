import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    Button,
    View,
    Text,
} from 'react-native';

export const Button = ({ text, onPress = () => { } }) => (
    <TouchableOpacity onPress={onPress} style={[styles.box, styles.transforms]}>
        <Text style={[styles.text, {
            transform: [
                { rotateZ: "-50deg" }
            ]
        }]}> {text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'violet',
        borderRadius: 10
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
            { rotateZ: "50deg" }
        ]
    }
});