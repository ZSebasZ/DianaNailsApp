import { router, Stack } from 'expo-router';
import { tabsMainLabelStyles } from "../styles/tabsMainLabelStyles";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { View } from "react-native";
import { LogoTopBar } from './LogoTopBar';
import { BotonIcono } from "./BotonIcono";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

export default function BarraSuperior(props) {

    const styles = useThemedStyles(tabsMainLabelStyles);
    const tema = useThemedStyles()
    const {cerrarSesion} = useContext(AuthContext)

    return (
        <Stack.Screen
            options={{
                statusBarStyle: "auto",
                animation: 'none',
                headerShown: true,
                headerTitle: "",
                headerStyle: { backgroundColor: tema.primary },
                headerShadowVisible: false,
                headerTintColor: tema.onPrimary,
                headerBackVisible: props.mostrarVolverAtras ? true : false,
                headerLeft: () => (
                    <LogoTopBar />
                ),
                headerRight: () => (
                    props.mostrarCerrarSesion ? (
                        <View style={[styles.subContenederosBarraResumen, styles.subContenedorRight]}>
                            <BotonIcono
                                botonNavegacion={true}
                                esLink={false}
                                fondo={true}
                                nombreIcono={"logout"}
                                esPerfil={true}
                                onPress={cerrarSesion}
                            />
                        </View>)
                        :
                        (
                            <View style={[styles.subContenederosBarraResumen, styles.subContenedorRight]}>
                                <BotonIcono
                                    botonNavegacion={true}
                                    esLink={true}
                                    href={"/navegacion/(perfil)/perfil"}
                                    fondo={true}
                                    nombreIcono={"account-circle"}
                                    esPerfil={true}
                                />
                            </View>
                        )
                )
            }}
        />

    );
}