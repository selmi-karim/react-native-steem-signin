import { StyleSheet, View, WebView, AsyncStorage, Text } from 'react-native';
import React, { Component } from 'react';

import LoggedIn from './LoggedIn'

// Change these to reflect
// fetch url
//const LOGIN_URL = "https://5bff8907.ngrok.io/api/login"
const LOGIN_URL = "https://v2.steemconnect.com/oauth2/authorize?client_id=steemitgram&redirect_uri=http%3A%2F%2Flocalhost%3A4040%2Fapi%2Fauth%2Flogin%2F&scope=login";

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            loadedCookie: false
        };
    }

    async componentWillMount() {
        let isAuthenticated
        try {
            const value = await AsyncStorage.getItem('userToken');
            if (value !== null) {
                // We have data!!
                console.log(value);
                isAuthenticated = true;
            }
        } catch (error) {
            // Error retrieving data
            isAuthenticated = false;
        }
        this.setState({
            loggedIn: isAuthenticated,
            loadedCookie: true
        });

    }

    onNavigationStateChange(navState) {
        // If we get redirected back to the HOME_URL we know that we are logged in. If your backend does something different than this
        // change this line.
        console.log('new url: ' + navState.url)
        /*if (navState.url == HOME_URL) {
            this.setState({
                loggedIn: true,
            });
        }*/
    }

    render() {

        return (
            <View style={[styles.container]}>
                <WebView
                    ref={'webview'}
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{ uri: LOGIN_URL }}
                    javaScriptEnabled={true}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                />
            </View>
        );
    }
}