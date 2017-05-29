import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, Linking, DeviceEventEmitter } from 'react-native'
// import { configurePush, testLocalNotification, cancelAllNotifications } from './helpers.js'


DeviceEventEmitter.addListener('remoteNotificationReceived', function(action){
    console.log(action)
  });

export default class PushNotificationPo extends Component {

    componentDidMount() {
        var PushNotification = require('react-native-push-notification');


        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log('TOKEN:', token);
            },

            // // (required) Called when a remote or local notification is opened or received
            // onNotification: function (notification) {
            //     console.log('NOTIFICATION:', notification);

            // },

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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>Push Notification</Text>
            </View>
        );
    }
}

