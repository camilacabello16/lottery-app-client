import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { LINK_WEBSITE } from '../constants';
import mqtt from 'precompiled-mqtt';
import { makeid } from '../utils';
import { CONFIG_SOCKET } from '../constants/socket';
import PushNotification from 'react-native-push-notification';
import _BackgroundTimer from 'react-native-background-timer';

const WebViewComponent = () => {
    const [mqttCli, setMqttCli] = useState<any>();

    useEffect(() => {
        const options = {
            clientId: 'APPUSER_' + makeid(6),
            username: CONFIG_SOCKET.username,
            password: CONFIG_SOCKET.password,
            path: CONFIG_SOCKET.path
        };
        const mqttClient = mqtt.connect(CONFIG_SOCKET.host, options);
        setMqttCli(mqttClient);

        mqttClient.on('connect', () => {
            console.log('Connected to MQTT broker 123');
            mqttClient.subscribe('oder_done');
        });

        mqttClient.on('message', (topic, message) => {
            console.log(`Received message on topic ${topic}: ${message.toString()}`);

            PushNotification.createChannel({
                channelId: '1',
                channelName: 'c1'
            },
                created => console.log(123)
            )

            PushNotification.localNotification({
                title: 'test notification',
                message: 'new notification',
                channelId: '1'
            })
        });

        mqttClient.on('error', (error) => {
            console.error('MQTT Error:', error);
        });

        return () => {
            mqttClient.end();
        };
    }, [])

    return <WebView source={{ uri: LINK_WEBSITE }} />;
}

export default WebViewComponent;