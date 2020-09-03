import React from 'react';
import User from './src/containers/User';
import {Dimensions, StyleSheet, View} from 'react-native';
console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <User />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
});
