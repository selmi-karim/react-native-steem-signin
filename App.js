import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReactNativeLogin from './src/index'
export default class App extends React.Component {
  render() {
    return (
      <ReactNativeLogin />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
