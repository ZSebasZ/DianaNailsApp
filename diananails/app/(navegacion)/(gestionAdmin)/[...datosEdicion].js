import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Stack, Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { tabsMainLabelStyles } from "./../../../styles/tabsMainLabelStyles";
import { useThemedStyles } from './../../../hooks/useThemeStyles';
import { LogoTopBar } from '../../../components/LogoTopBar';
import { Icono } from '../../../components/Icono';

export default function GestionEdicion() {

    const styles = useThemedStyles(tabsMainLabelStyles);
    const colors = useThemedStyles();

    const { datosEdicion } = useLocalSearchParams();
    const [tipo, id] = datosEdicion;

    return (
        <View>
            <Stack.Screen
                options={{
                    statusBarStyle: "auto",
                    animation: 'none',
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.primary },
                    headerShadowVisible: false,
                    headerTintColor: "black",
                    headerTitle: "",
                    headerBackVisible: true,
                    headerTintColor: colors.onPrimary,
                    headerLeft: () => (
                        <LogoTopBar />
                    ),
                    headerRight: () => (
                        <Link href={"/(perfil)/"} asChild>
                            <Pressable>
                                <Icono
                                    IconComponent={MaterialCommunityIcons}
                                    name="account-circle"
                                    style={styles.iconTabBar}
                                ></Icono>
                            </Pressable>
                        </Link>
                    )
                }}
            />
            <Text>{tipo} - {id}</Text>
        </View>

    );
}