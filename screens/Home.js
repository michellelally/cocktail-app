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