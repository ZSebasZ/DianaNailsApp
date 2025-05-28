import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icono } from '../../../../../components/Icono';
import { useThemedStyles } from '../../../../../hooks/useThemeStyles';
import { tabsMainLabelStyles } from "../../../../../styles/tabsMainLabelStyles";
import { LogoTopBar } from '../../../../../components/LogoTopBar';

export default function TiendaLayout() {

  const styles = useThemedStyles(tabsMainLabelStyles);
  const colors = useThemedStyles();

  return (
    <Stack
      screenOptions={{
        statusBarStyle: "auto",
        animation: 'none',
        headerShown: false,
        headerStyle: { backgroundColor: colors.primary },
        headerShadowVisible: false,
        headerTintColor: "black",
        headerTitle: "",
        headerLeft: () => (
          <LogoTopBar/>
        ),
        headerRight: () => (
          <Icono
            IconComponent={MaterialCommunityIcons}
            name="account-circle"
            style={styles.iconTabBar}
          ></Icono>
        )
      }}
    />
  )
}
