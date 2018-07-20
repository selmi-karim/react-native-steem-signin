import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'SteemConnect',
    };

    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.titleText} title="Sign in with Steem" onPress={this._signInAsync} />
            </View>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        width: 200,
        height: 200,
    },
});


