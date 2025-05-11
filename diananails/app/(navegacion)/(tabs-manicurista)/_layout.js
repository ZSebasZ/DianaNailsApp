import { Tabs, Link } from "expo-router";
import { Stack } from 'expo-router';
import { tabsMainLabelStyles } from "../../../styles/tabsMainLabelStyles";
import { useThemedStyles } from '../../../hooks/useThemeStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icono } from '../../../components/Icono';
import { View, Pressable } from "react-native";
import { LogoTopBar } from "../../../components/LogoTopBar"

export default function TabsManicuristaLayout() {

    const styles = useThemedStyles(tabsMainLabelStyles);
    const colors = useThemedStyles();

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    statusBarStyle: "auto",
                    animation: 'none',
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.primary },
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
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar,
                    tabBarHideOnKeyboard: true,
                    tabBarActiveTintColor: colors.onPrimary,
                    tabBarInactiveTintColor: colors.secondary,
                    tabBarActiveBackgroundColor: colors.primary,
                }}
            >

                <Tabs.Screen
                    name="citas"
                    options={{
                        title: "Citas",

                        tabBarLabelStyle: styles.label,
                        tabBarIcon: ({ color }) => (
                            <Icono
                                IconComponent={MaterialCommunityIcons}
                                name="calendar-month"
                                style={[styles.iconTab, { color: color }]}
                            />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}