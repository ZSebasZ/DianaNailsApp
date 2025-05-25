import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { Stack } from 'expo-router';
//import { Screen } from '../../../../components/Screen';
import { TiendaScreen } from '../../../../../screens/TiendaScreen';

export default function Index() {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <TiendaScreen />
        </>

    );
}