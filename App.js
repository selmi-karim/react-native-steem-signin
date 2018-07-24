import React, { Component } from 'react'
import { Text, View, Alert, AsyncStorage } from 'react-native'
import SteemConnect from './src/index'

export default class HelloWorldApp extends Component {

  _signIn(auth) {
    Alert.alert('Auth data: ' + auth);
  }

  render() {
    return (
      <SteemConnect
        onLoggedIn={(auth) => this._signIn(auth)}
      />

    );
  }
}
