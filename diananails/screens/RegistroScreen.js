import { View, Text, StatusBar, Image, useColorScheme, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { registroStyles } from '../styles/registroStyles';
import { Icono } from '../components/Icono';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { ContenedorInputs } from "../components/ContenedorInputs";
import { CampoTextoInput } from "../components/CampoTextoInput";
import { BotonTexto } from "../components/BotonTexto";

//Pantalla de Login
export const RegistroScreen = () => {

    //Estilos
    const styles = useThemedStyles(registroStyles);
    const colors = useThemedStyles();
    const fuenteTexto = fuenteTextoStyles();


    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={[styles.contenedorPrincipal]}>
                    <StatusBar style="auto" />
                    <View>
                        <Text style={[fuenteTexto.gantariBold, styles.textTitulo]}>Registrate</Text>
                        <ContenedorInputs>
                            <CampoTextoInput
                                conIcono={true}
                                fuenteTexto={fuenteTexto.gantariRegular}
                                nombreIcono={"account"}
                                placeHolder={"Nombre"}
                                contrasena={false}
                            />
                            <CampoTextoInput
                                conIcono={true}
                                fuenteTexto={fuenteTexto.gantariRegular}
                                nombreIcono={"account"}
                                placeHolder={"Apellidos"}
                                contrasena={false}
                            />
                            <CampoTextoInput
                                conIcono={true}
                                fuenteTexto={fuenteTexto.gantariRegular}
                                nombreIcono={"phone"}
                                placeHolder={"Telefono"}
                                contrasena={false}
                            />
                            <CampoTextoInput
                                conIcono={true}
                                fuenteTexto={fuenteTexto.gantariRegular}
                                nombreIcono={"map-marker"}
                                placeHolder={"Direccion de envio"}
                                contrasena={false}
                            />
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
                            <CampoTextoInput
                                conIcono={true}
                                fuenteTexto={fuenteTexto.gantariRegular}
                                nombreIcono={"lock-check"}
                                placeHolder={"Confirmar contraseña"}
                                contrasena={true}
                            />
                        </ContenedorInputs>
                        <View style={styles.contenedorBotones}>
                            <BotonTexto
                                botonPrincipal={true}
                                esLink={false}
                                fondo={true}
                                fuenteTexto={fuenteTexto.gantariBold}
                                textoBoton={"Registrarme"}
                                onPress={() => {
                                    //A MODO DE PRUEBA
                                    const valid = true;

                                    if (valid) {
                                        router.replace('/(auth)/login');
                                    } else {
                                        alert('Datos inválidos');
                                    }
                                }}
                            />
                            <BotonTexto
                                botonPrincipal={true}
                                esLink={true}
                                href={"/(auth)/login"}
                                fondo={false}
                                fuenteTexto={fuenteTexto.gantariBold}
                                textoBoton={"Volver"}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
}