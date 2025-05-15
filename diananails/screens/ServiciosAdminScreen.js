import { View, useColorScheme, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { agendarCitaStyles } from '../styles/agendarCitaStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { CardServicio } from "../components/CardServicio";

//Pantalla de Login
export const ServiciosAdminScreen = () => {

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
                        tituloSeccion={"Mis servicios"}
                        textInfo1={"Aqui pueder ver todos los servicios que ofreces"}
                        textInfo2={"Si quiere editar alguna, solo pulselo"}
                    />
                    <View style={styles.contenedorServicios}>
                        <CardServicio
                            esLink={true}
                            href={"/(gestionAdmin)/servicio/1"}
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
        </Screen>
    );
}