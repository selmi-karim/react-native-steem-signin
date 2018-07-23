import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    Modal,
    WebView,
    TouchableOpacity,
    Text
} from 'react-native'
import PropTypes from 'prop-types'


import { LOGIN_URL, CALLBACK_URL } from "react-native-dotenv"

export default class SteemConnect extends React.Component {

    static propTypes = {
        onLoggedIn: PropTypes.func,
        btnWidth: PropTypes.number,
        btnHeight: PropTypes.number,
        textSize: PropTypes.number,
        textColor: PropTypes.string,
    }

    static defaultProps = {
        onLoggedIn: () => { },
        btnWidth: 180,
        btnHeight: 80,
        textSize: 22,
        textColor: '#1194f6',

    }
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            logged: false,
        }
    }

    componentWillMount() {
        this._bootstrapAsync().then((query) => {
            // Checks if the current visitor is a logged in user.
            if (query) {
                this.setState({
                    modalVisible: false,
                    logged: true,
                })
                this.hide()
            }
        })

    }
    /**
     * show Webview if user not logged in
     */
    show() {
        this.setState({ modalVisible: true })
    }
    /**
     * hide Webview if user not logged in
     */
    hide() {
        this.setState({ modalVisible: false })
    }


    /**
     * Function that is invoked when the WebView loading starts or ends.
     * 
     * @param {url} navState Object 
     */
    _onNavigationStateChange(navState) {
        // If we get redirected back to the HOME_URL we know that we are logged in. 
        // If your backend does something different than this
        if (navState.url.indexOf(CALLBACK_URL) === 0) {
            AsyncStorage.setItem('query', navState.url)
            this.setState({ logged: true })
            this.hide()
        }
    }
    /**
     * sign out function
     * clear storage local data
     */
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.setState({ logged: false })
    };

    /**
     *  Fetch the token from storage then navigate to our appropriate place
     */
    _bootstrapAsync = async () => {
        try {
            return await AsyncStorage.getItem('query');
        } catch (e) {
            console.warn(e)
            return null
        }
    };

    /**
     * Checks if the current visitor is a logged in user.
     */
    _isUserLoggedIn() {
        if (!this.state.logged) {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: this.props.btnWidth,
                    height: this.props.btnHeight
                }}>
                    <Button title="Sign In With SteemConnect" onPress={this.show.bind(this)} color={this.props.textColor} />
                </View >
            )
        } else {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: this.props.btnWidth,
                    height: this.props.btnHeight
                }}>
                    <Button title="Sign out" onPress={this._signOutAsync} color={this.props.textColor} />
                </View>
            )
        }

    }

    render() {
        const {
            btnWidth,
            btnHeight,
            textSize,
            textColor
        } = this.props
        return (
            <View style={styles.container}>
                <Modal
                    animationType={'slide'}
                    visible={this.state.modalVisible}
                    onRequestClose={this.hide.bind(this)}
                    transparent
                >
                    <View style={styles.container}>
                        <WebView
                            style={[{ flex: 1 }, this.props.styles]}
                            source={{ uri: LOGIN_URL }}
                            scalesPageToFit
                            startInLoadingState
                            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                            onError={this._onNavigationStateChange.bind(this)}
                        />
                    </View>

                </Modal >
                {this._isUserLoggedIn()}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',

    }
});