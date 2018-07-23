import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SteemConnect from './src/index'

export default class HelloWorldApp extends Component {
  render() {
    return (
      <SteemConnect />
    );
  }
}
