import { View, useColorScheme, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { gestionStyles } from '../styles/gestionStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { BotonIconoTexto } from "../components/BotonIconoTexto";


//Pantalla de Login
export const ActividadClienteScreen = () => {

    const insets = useSafeAreaInsets();

    const fuenteTexto = fuenteTextoStyles();

    //Estilos
    const styles = useThemedStyles(gestionStyles);
    const colors = useThemedStyles();
    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../assets/images/logoDark.png')
        : require('./../assets/images/logoLight.png');

    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Mi actividad"}
                        textInfo1={"Desde aqui puede ver tus citas, opinar, ver opiniones y ver tus pedidos"}
                    />
                    <View style={styles.containerSeccion}>
                        <BotonIconoTexto
                            esLink={true}
                            href={"/(clienteScreens)/(citasOpiniones)/citasCliente"}
                            nombreIcono={"calendar-month"}
                            fondo={true}
                            fuenteTextoNormal={fuenteTexto.gantariBold}
                            textoBoton={"Mis citas"}
                            enTab={true}
                        />
                        <BotonIconoTexto
                            esLink={true}
                            href={"/(clienteScreens)/(pedidosCarrito)/pedidosCliente"}
                            nombreIcono={"truck-delivery"}
                            fondo={true}
                            fuenteTextoNormal={fuenteTexto.gantariBold}
                            textoBoton={"Mis pedidos"}
                            enTab={true}
                        />
                        <BotonIconoTexto
                            esLink={true}
                            href={"/(clienteScreens)/(citasOpiniones)/opiniones"}
                            nombreIcono={"message-star"}
                            fondo={true}
                            fuenteTextoNormal={fuenteTexto.gantariBold}
                            textoBoton={"Opinar/Opiniones"}
                            enTab={true}
                        />
                    </View>
                </ScrollView>
            </View>
        </Screen>
    );
}