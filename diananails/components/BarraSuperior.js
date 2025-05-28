import { Stack } from 'expo-router';
import { tabsMainLabelStyles } from "../styles/tabsMainLabelStyles";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { View } from "react-native";
import { LogoTopBar } from './LogoTopBar';
import { BotonIcono } from "./BotonIcono";
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

// Componente BarraSuperior
export default function BarraSuperior(props) {

    // Obtenemos los colores del tema y las fuentes
    const styles = useThemedStyles(tabsMainLabelStyles);
    const tema = useThemedStyles()

    // Usamos el contexto de autenticación
    const {cerrarSesion, usuario} = useContext(AuthContext)

    // Renderizamos el componente
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
                                    fotoPerfil={usuario.datosUsuario.url_imagen ? usuario.datosUsuario.url_imagen : null}
                                />
                            </View>
                        )
                )
            }}
        />

    );
}