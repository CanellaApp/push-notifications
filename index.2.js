'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    BackAndroid,
    Linking,
    Platform,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import { Navigator } from 'react-native-deprecated-custom-components';

let initialRoute = { id: 'loginview' }

var that = this;

console.log('hello')





export default class MainClass extends Component {
    constructor(props) {
        super(props);

        this.handleNotification = this.handleNotification.bind(this);

    }

    handleNotification(notification) {
        console.log('handleNotification');
        var notificationId = ''
        //your logic to get relevant information from the notification

        //here you navigate to a scene in your app based on the notification info
        this.navigator.push({ id: 'mainview', item: 'item' });
    }

    componentWillMount() {

    }

    componentDidMount() {
        // configurePush()
        // testLocalNotification()
        //    cancelAllNotifications()
        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log('TOKEN:', token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
                Linking.canOpenURL('fb://notifications').then(supported => {
                    if (supported) {
                        Linking.openURL('fb://notifications');
                    } else {
                        console.log('Don\'t know how to open URI: ' + 'fb://notifications');
                    }
                });
            },

            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
            // senderID: "564504385511",
            senderID: "1034964634886",

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
              * (optional) default: true
              * - Specified if permissions (ios) and token (android and ios) will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
            requestPermissions: true,
        });

    }

    render() {

        return (
            <Navigator
                ref={(nav) => this.navigator = nav}
                initialRoute={initialRoute}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FadeAndroid;
                }
                }
            />
        );
    }

    renderScene(route, navigator) {

        switch (route.id) {
            // do your routing here
            case 'mainview':
                return (<MainView navigator={navigator} />);

            default:
                return (<Teto navigator={navigator} />);
        }
    }
}

class MainView extends Component {
    render() {
        return <Text style={{ fontSize: 80 }}>Hello</Text>
    }
}

class Teto extends Component {
    render() {
        return <Text style={{ fontSize: 80 }}>Teto</Text>
    }
}