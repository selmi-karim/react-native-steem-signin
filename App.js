import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SteemConnect from './src/index'

export default class HelloWorldApp extends Component {
  render() {
    return (
      <SteemConnect />
      /**
       *  style={{ width: 48, height: 48 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn}
       */
    );
  }
}
