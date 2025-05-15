import { View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { fechaHoraStyles } from "../styles/fechaHoraStyles";
import { Calendar } from 'react-native-calendars';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { BotonesCancelarVerServicios } from "../components/BotonesCancelarVerServicios";
import { BarraResumen } from "../components/BarraResumen";
import { ListaDropdown } from "../components/ListaDropdown";


//Pantalla de Login
export const FechaHoraCitaScreen = () => {

    const insets = useSafeAreaInsets();

    const items = [
        { label: 'Javaaa', value: 'java' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'Python', value: 'python' },
        { label: 'C#', value: 'csharp' },
        { label: 'Rubyy', value: 'rubyY' },
        { label: 'Rubyyy', value: 'rubyYY' },
        { label: 'Rubyyy', value: 'rubyYYY' },
        { label: 'Rubyyyy', value: 'rubyYYYY' },
    ];


    const fuenteTexto = fuenteTextoStyles();
    //Estilos
    const styles = useThemedStyles(fechaHoraStyles);
    const colors = useThemedStyles();
    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../assets/images/logoDark.png')
        : require('./../assets/images/logoLight.png');

    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <View>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Fecha"}
                        textInfo1={"Selecciona la fecha de la cita"}
                    />
                    <View style={styles.contenedorCalendarioPicker}>
                        <Calendar/>
                    </View>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Hora"}
                        textInfo1={"Selecciona la hora de la cita"}
                    />
                    <ListaDropdown
                        items={items}
                        fuenteTexto={fuenteTexto.gantariRegular}
                    />
                </View>
            </View>
            <BotonesCancelarVerServicios />
            <BarraResumen
                botonVolver={true}
                hrefAtras={"../"}
                botonSiguiente={true}
                hrefSiguiente={"./elegirManicuristaMetodoPago"}
            />
        </Screen>
    );
}