import { Tabs } from "expo-router";
import { Stack, Link } from 'expo-router';
import { tabsMainLabelStyles } from "../styles/tabsMainLabelStyles";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icono } from './Icono';
import { View } from "react-native";
import { LogoTopBar } from './LogoTopBar';
import { Pressable } from 'react-native';
import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";

export default function BarraSuperior() {

    const styles = useThemedStyles(tabsMainLabelStyles);
    const colors = useThemedStyles();
    const tema = useThemedStyles()

    return (
        <Stack.Screen
            options={{
                statusBarStyle: "auto",
                animation: 'none',
                headerShown: true,
                headerStyle: { backgroundColor: tema.primary },
                headerShadowVisible: false,
                headerTintColor: "black",
                headerTitle: "",
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

    );
}