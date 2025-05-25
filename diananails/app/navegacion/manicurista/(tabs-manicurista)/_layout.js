import { Tabs } from "expo-router";
import { tabsMainLabelStyles } from "../../../../styles/tabsMainLabelStyles";
import { useThemedStyles } from '../../../../hooks/useThemeStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icono } from '../../../../components/Icono';
import { View } from "react-native";
import BarraSuperior from "../../../../components/BarraSuperior";


export default function TabsManicuristaLayout() {

    const styles = useThemedStyles(tabsMainLabelStyles);
    const colors = useThemedStyles();

    return (
        <View style={{ flex: 1 }}>
            <BarraSuperior/>
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