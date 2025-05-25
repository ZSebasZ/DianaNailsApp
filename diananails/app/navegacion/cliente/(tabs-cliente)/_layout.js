import { Tabs } from "expo-router";
import { tabsMainLabelStyles } from "../../../../styles/tabsMainLabelStyles";
import { useThemedStyles } from '../../../../hooks/useThemeStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icono } from '../../../../components/Icono';
import { View } from "react-native";
import BarraSuperior from "../../../../components/BarraSuperior";

export default function TabsClienteLayout() {

    const styles = useThemedStyles(tabsMainLabelStyles);
    const colors = useThemedStyles();

    return (
        <View style={{ flex: 1 }}>
            {<BarraSuperior/>}
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
                    name="actividadCliente"
                    options={{
                        title: "Actividad",
                        tabBarLabelStyle: styles.label,
                        tabBarIcon: ({ color }) => (
                            <Icono
                                IconComponent={MaterialCommunityIcons}
                                name="history"
                                style={[styles.iconTab, { color: color }]}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="(agendarCita)"
                    options={{
                        title: "Agendar cita",

                        tabBarLabelStyle: styles.label,
                        tabBarIcon: ({ color }) => (
                            <Icono
                                IconComponent={MaterialCommunityIcons}
                                name="calendar"
                                style={[styles.iconTab, { color: color }]}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="(tienda)"
                    options={{
                        title: "Tienda",
                        tabBarLabelStyle: styles.label,
                        tabBarIcon: ({ color }) => (
                            <Icono
                                IconComponent={MaterialCommunityIcons}
                                name="shopping"
                                style={[styles.iconTab, { color: color }]}
                            />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}