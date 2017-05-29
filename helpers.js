var PushNotification = require('react-native-push-notification');
import { Linking } from 'react-native';

export function configurePush() {

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

export function testLocalNotification() {
    PushNotification.localNotification({
        message: "My Notification Message", // (required)
        date: new Date(Date.now())
    })
}

export function cancelAllNotifications() {
    PushNotification.cancelAllLocalNotifications()
}