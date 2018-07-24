# react-native-steem-signin

Steem SignIn for react native applications With SteemConnet V2 and AsyncStorage for LocalStorage.

After success sign in the authentication data saved in the AsyncStorage under the key <strong> auth </strong>. 

<strong>AsyncStorage</strong>  is a simple, unencrypted, asynchronous, persistent, key-value storage system that is global to the app.

<p align="center"> 
<img src="screenshots/test.gif" height= "500" width="350" >
</p>

<strong>Note</strong>: Demo above includes debug text to confirm signin (i.e. user name, expires time and access token). 
<SteemConnect />, by default, will only display the native 'Sign in with SteemConnect' button.


# Setup

```
npm install --save react-native-steem-signin

or

yarn add react-native-steem-signin

```

### Create .env file and fill the env vars:

```
LOGIN_URL=
CALLBACK_URL=
```

 * <strong>CALLBACK_URL</strong>: This is the URL that users will be redirected to after interacting with SC2. It must be listed in the "Redirect URI(s)" list in the app settings EXACTLY the same as it is specified here.
 
 * <strong>LOGIN_URL</strong>: URL that you can redirect the user to so that they may log in to your app through SC2.
 
 <strong>Note</strong> : You can generate LOGIN_URL with 
 <a href="https://github.com/steemit/steemconnect-sdk"> steemconnect sdk</a>

```
var link = api.getLoginURL(state);
console.log(link)
// => https://steemconnect.com/oauth2/authorize?client_id=[app]&redirect_uri=[callbackURL]&scope=vote,comment&state=[state]
```


# Component props


Property	|	Type		|	Default		|	Description |
:---------|:--------|:----------|:------------|
onLoggedIn() | function  | `required` | Fires after each Sign in and return auth data.
btnWidth | number | 180 | The Width of the Sign in button.
btnHeight | number | 80 | The Height of the Sign in button.
fontFamily | string | `System` | The font family to be used.


# Usage 

```
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SteemConnect from 'react-native-steem-signin'

export default class SteemSignIn extends Component {
  
  _signIn(auth) {
    Alert.alert('Auth data: '+auth);
  }

  render() {
    return (
      <SteemConnect
        onLoggedIn={(auth) => this._signIn(auth)}
        btnWidth= 180
        btnHeight= 80 
        fontFamily= 22
      />
    );

}
```



# Demo 

<p align="center"> 
<img src="screenshots/qrcode.png" height= "350" width="500" >
</p>


<a href="https://exp.host/@karimation/steem-sign-in-component">Expo Link</a>

# Next

* Sign up on Steem 
     

# Author

kerim selmi <a href="http://www.karimation.com">karimation</a>

# License

This project is licensed under the  <a href="LICENSE">MIT License</a>