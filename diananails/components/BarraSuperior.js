import { Stack } from 'expo-router';
import { tabsMainLabelStyles } from "../styles/tabsMainLabelStyles";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { View } from "react-native";
import { LogoTopBar } from './LogoTopBar';
import { BotonIcono } from "./BotonIcono";

export default function BarraSuperior(props) {

    const styles = useThemedStyles(tabsMainLabelStyles);
    const colors = useThemedStyles();
    const tema = useThemedStyles()

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
                                esLink={true}
                                href={"/(perfil)/perfil"}
                                fondo={true}
                                nombreIcono={"logout"}
                                esPerfil={true}
                            />
                        </View>)
                        :
                        (
                            <View style={[styles.subContenederosBarraResumen, styles.subContenedorRight]}>
                                <BotonIcono
                                    botonNavegacion={true}
                                    esLink={true}
                                    href={"/(perfil)/perfil"}
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