import { View, useColorScheme, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { agendarCitaStyles } from '../styles/agendarCitaStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { CardServicio } from "../components/CardServicio";
import { BotonesCancelarVerServicios } from "../components/BotonesCancelarVerServicios";
import { BarraResumen } from "../components/BarraResumen";

//Pantalla de Login
export const AgendarCitaScreen = () => {

    const insets = useSafeAreaInsets();

    const fuenteTexto = fuenteTextoStyles();
    //Estilos
    const styles = useThemedStyles(agendarCitaStyles);
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
                        tituloSeccion={"Agenda tu cita"}
                        textInfo1={"Selecciona los servicios deseados"}
                        textInfo2={"3 como máximo"}
                    />
                    <View style={styles.contenedorServicios}>
                        <CardServicio
                            esLink={true}
                            href={""}
                            estaSeleccionado={false}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            tituloServicio={"Pedicura completa con decoración"}
                            tiempoServicio={"1 hora y 45 minutos"}
                            precioServicio={"12.00 $"}
                        />
                        <CardServicio
                            esLink={true}
                            href={""}
                            estaSeleccionado={false}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            tituloServicio={"Pedicura completa con decoración"}
                            tiempoServicio={"1 hora y 45 minutos"}
                            precioServicio={"12.00 $"}
                        />
                        <CardServicio
                            esLink={true}
                            href={""}
                            estaSeleccionado={false}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            tituloServicio={"Pedicura completa con decoración"}
                            tiempoServicio={"1 hora y 45 minutos"}
                            precioServicio={"12.00 $"}
                        />
                        <CardServicio
                            esLink={true}
                            href={""}
                            estaSeleccionado={false}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            tituloServicio={"Pedicura completa con decoración"}
                            tiempoServicio={"1 hora y 45 minutos"}
                            precioServicio={"12.00 $"}
                        />
                        <CardServicio
                            esLink={true}
                            href={""}
                            estaSeleccionado={false}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            tituloServicio={"Pedicura completa con decoración"}
                            tiempoServicio={"1 hora y 45 minutos"}
                            precioServicio={"12.00 $"}
                        />
                        <CardServicio
                            esLink={true}
                            href={""}
                            estaSeleccionado={false}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            tituloServicio={"Pedicura completa con decoración"}
                            tiempoServicio={"1 hora y 45 minutos"}
                            precioServicio={"12.00 $"}
                        />
                        <CardServicio
                            esLink={true}
                            href={""}
                            estaSeleccionado={false}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            tituloServicio={"Pedicura completa con decoración"}
                            tiempoServicio={"1 hora y 45 minutos"}
                            precioServicio={"12.00 $"}
                        />
                        <CardServicio
                            esLink={true}
                            href={""}
                            estaSeleccionado={false}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            tituloServicio={"Pedicura completa con decoración"}
                            tiempoServicio={"1 hora y 45 minutos"}
                            precioServicio={"12.00 $"}
                        />
                        <CardServicio
                            esLink={true}
                            href={""}
                            estaSeleccionado={false}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            tituloServicio={"Pedicura completa con decoración"}
                            tiempoServicio={"1 hora y 45 minutos"}
                            precioServicio={"12.00 $"}
                        />
                    </View>
                </ScrollView>
            </View>
            <BotonesCancelarVerServicios/>
            <BarraResumen
                botonSiguiente={true}
                hrefSiguiente={"/(tabs-cliente)/(agendarCita)/(screens)/elegirFechaHora"}
            />
        </Screen>
    );
}