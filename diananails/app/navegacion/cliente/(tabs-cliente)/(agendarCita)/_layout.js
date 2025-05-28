import { Stack, Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icono } from '../../../../../components/Icono';
import { useThemedStyles } from '../../../../../hooks/useThemeStyles';
import { tabsMainLabelStyles } from "../../../../../styles/tabsMainLabelStyles";
import { LogoTopBar } from '../../../../../components/LogoTopBar';
import { Pressable } from 'react-native';
import { AgendarCitaProvider } from '../../../../../contexts/agendarCitaContext';

export default function AgendarCitaLayout() {

  const styles = useThemedStyles(tabsMainLabelStyles);
  const colors = useThemedStyles();

  //Envolvemos el Stack con el AgendarCitaProvider
  return (
    <AgendarCitaProvider>
      <Stack
        initialRouteName='index'
        screenOptions={{
          statusBarStyle: "auto",
          animation: 'none',
          headerShown: false,
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
    </AgendarCitaProvider>
  )
}
