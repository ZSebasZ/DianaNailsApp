import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, StyleSheet, Button, useColorScheme, Image } from 'react-native';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { Link } from 'expo-router';
import { inicioStyles } from '../styles/inicioStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Icono } from './Icono';
import { abrirPerfilInstagram } from '../utils/instagramUtils';
import { Screen } from './Screen';

//Pantalla de bienvenida a la aplicacion
export const Inicio = () => {

    const insets = useSafeAreaInsets();

    //Estilos
    const styles = useThemedStyles(inicioStyles);

    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../assets/images/logoDark.png')
        : require('./../assets/images/logoLight.png');

    //Devolvemos la vista de la pantalla de bienvenida
    return (
        <Screen style={styles.screen}>
            <View style={[styles.mainContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
                <StatusBar style="auto" />
                <View style={styles.subMainContainer}>
                    <View style={styles.logoTextContainer}>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={logo} style={styles.logo}></Image>
                        </View>
                        <View>
                            <Text style={styles.text}>Bienvenido a</Text>
                            <Text style={styles.textNameApp}>DianaNails App</Text>
                            <Text style={styles.text}>¿Como desea iniciar?</Text>
                        </View>
                    </View>

                    <View style={styles.containerButtons}>
                        <Link asChild href={"/login"} style={styles.button}>
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed ? 'red' : styles.button.backgroundColor,
                                    },
                                ]}
                            >
                                <Icono IconComponent={FontAwesome6} name="user-large" style={styles.iconButton} />
                                <Text style={styles.buttonText}> Soy cliente </Text>
                            </Pressable>
                        </Link>

                        <Pressable style={styles.button}>
                            <Icono IconComponent={FontAwesome6} name="building-user" style={styles.iconButton} />
                            <Text style={styles.buttonText}> Soy manicurista </Text>
                        </Pressable>
                    </View>
                    <View style={styles.instagramIcon}>
                        <Pressable onPress={() => abrirPerfilInstagram()}>
                            <Icono IconComponent={FontAwesome6} name="instagram" style={styles.iconRedSocial} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </Screen>

    );
}