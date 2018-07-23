import { StyleSheet, View, WebView, AsyncStorage, Text } from 'react-native'
import React, { Component } from 'react'
import queryString from 'query-string'
import { LOGIN_URL, CALLBACK_URL } from 'react-native-dotenv'

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

export default class Login extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header: null,
    };



    onNavigationStateChange(navState) {
        // If we get redirected back to the HOME_URL we know that we are logged in. If your backend does something different than this
        
        if (navState.url.indexOf(CALLBACK_URL) === 0) {
            let parseUrl = queryString.parseUrl(navState.url)
            this.extractData(parseUrl)
            this.props.navigation.navigate('App')
        }
    }

    extractData(parseUrl) {
        let username = parseUrl.query.username
        let expires_in = parseUrl.query.expires_in
        let access_token = parseUrl.query.access_token
        AsyncStorage.setItem('access_token', access_token)
        AsyncStorage.setItem('expires_in', expires_in)
        AsyncStorage.setItem('username', username)
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
                    scalesPageToFit={true}
                />
            </View>
        );
    }
}