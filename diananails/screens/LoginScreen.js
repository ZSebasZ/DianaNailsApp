import { View, Text, StatusBar, Image, useColorScheme, TextInput, Pressable } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Stack, router } from 'expo-router';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { loginStyles } from '../styles/loginStyles';
import { Icono } from '../components/Icono';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { LogoPrincipal } from "../components/LogoPrincipal";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";
import { ContenedorInputs } from "../components/ContenedorInputs";
import { CampoTextoInput } from "../components/CampoTextoInput";
import { BotonTexto } from "../components/BotonTexto";

//Pantalla de Login
export const LoginScreen = () => {

    //Estilos
    const styles = useThemedStyles(loginStyles);
    const colors = useThemedStyles();
    const tema = useContext(ThemeContext); // Acceder al contexto
    const fuenteTexto = fuenteTextoStyles();

    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                    headerTintColor: colors.onBackground,
                    headerTitle: "",
                }}
            />
            <View style={styles.contenedorPrincipal}>
                <StatusBar style="auto" />
                <LogoPrincipal screen={"login"} />
                <View>
                    <Text style={[fuenteTexto.gantariBold, styles.textTitulo]}>Inicia sesión</Text>
                    <ContenedorInputs>
                        <CampoTextoInput
                            conIcono={true}
                            fuenteTexto={fuenteTexto.gantariRegular}
                            nombreIcono={"email"}
                            placeHolder={"Email"}
                            contrasena={false}
                        />
                        <CampoTextoInput
                            conIcono={true}
                            fuenteTexto={fuenteTexto.gantariRegular}
                            nombreIcono={"lock"}
                            placeHolder={"Contraseña"}
                            contrasena={true}
                        />
                    </ContenedorInputs>
                    <View style={styles.contenedorBotones}>
                        <BotonTexto
                            botonPrincipal={true}
                            esLink={false}
                            fondo={true}
                            fuenteTexto={fuenteTexto.gantariBold}
                            textoBoton={"Iniciar sesión"}
                            onPress={() => {
                                //A MODO DE PRUEBA
                                const valid = true;

                                if (valid) {
                                    router.replace('/(tabs-cliente)/(agendarCita)');
                                } else {
                                    alert('Datos inválidos');
                                }
                            }}
                        />
                        <BotonTexto
                            botonPrincipal={true}
                            esLink={true}
                            href={"/(auth)/registro"}
                            fondo={false}
                            fuenteTexto={fuenteTexto.gantariBold}
                            textoBoton={"Registrarme"}
                        />
                    </View>
                </View>
            </View>
        </Screen>

    );
}