import { Tabs } from "expo-router";
import { tabsMainLabelStyles } from "../../../../../styles/tabsMainLabelStyles";
import { useThemedStyles } from '../../../../../hooks/useThemeStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icono } from '../../../../../components/Icono';
import { View } from "react-native";
import BarraSuperior from "../../../../../components/BarraSuperior";

export default function TabsAdminLayout() {

    const styles = useThemedStyles(tabsMainLabelStyles);
    const colors = useThemedStyles();

    //Definimos las tabs de la gestión de manicuristas
    return (
        <View style={{ flex: 1 }}>
            <BarraSuperior mostrarVolverAtras={true}/>
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
                    name="manicuristas"
                    options={{
                        title: "Manicuristas",
                        tabBarLabelStyle: styles.label,
                        tabBarIcon: ({ color }) => (
                            <Icono
                                IconComponent={MaterialCommunityIcons}
                                name="card-account-details"
                                style={[styles.iconTab, { color: color }]}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="nuevaManicurista"
                    options={{
                        title: "Nueva manicurista",

                        tabBarLabelStyle: styles.label,
                        tabBarIcon: ({ color }) => (
                            <Icono
                                IconComponent={MaterialCommunityIcons}
                                name="account-plus"
                                style={[styles.iconTab, { color: color }]}
                            />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}