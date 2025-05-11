import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { Stack } from 'expo-router';
import { Screen } from '../../../components/Screen';
import { TiendaScreen } from '../../../screens/TiendaScreen';
import { useThemedStyles } from '../../../hooks/useThemeStyles';
import { ActividadClienteScreen } from '../../../screens/ActividadClienteScreen';

export default function ActividadCliente() {

        const colors = useThemedStyles();
    return (
        <ActividadClienteScreen/>
    );
}