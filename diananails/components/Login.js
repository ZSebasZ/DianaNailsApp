import { View, Text, StatusBar, Image, useColorScheme } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from './Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { loginStyles } from '../styles/loginStyles';

//Pantalla de Login
export const Login = () => {

    const insets = useSafeAreaInsets();

    //Estilos
    const styles = useThemedStyles(loginStyles);

    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../assets/images/logoDark.png')
        : require('./../assets/images/logoLight.png');



    return (
        <Screen>
            <View style={[styles.mainContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
                <StatusBar style="auto" />
                <View>
                    <Image source={logo} style={styles.logo}></Image>
                </View>
                <View>

                </View>
            </View>
        </Screen>

    );
}