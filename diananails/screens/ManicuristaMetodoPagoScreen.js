import { View, useColorScheme, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { useState } from "react";
import { manicuristaMetodoPagoStyles } from "../styles/manicuristaMetodoPagoStyles";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { BotonesCancelarVerServicios } from "../components/BotonesCancelarVerServicios";
import { BarraResumen } from "../components/BarraResumen";
import { CardManicurista } from "../components/CardManicurista";
import { ListaDropdown } from "../components/ListaDropdown";

//Pantalla de Login
export const ManicuristaMetodoPagoScreen = () => {

    const insets = useSafeAreaInsets();

    const [open, setOpen] = useState(false); // Estado para abrir/cerrar el dropdown
    const [value, setValue] = useState(null); // Estado para el valor seleccionado
    const items = [
        { label: 'Pagar en el local', value: 'efectivo' },
        { label: 'Tarjeta', value: 'tarjeta' }
    ];

    const manicurista = require("./../assets/images/manicurista.jpg")



    const fuenteTexto = fuenteTextoStyles();
    //Estilos
    const styles = useThemedStyles(manicuristaMetodoPagoStyles);
    const colors = useThemedStyles();
    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../assets/images/logoDark.png')
        : require('./../assets/images/logoLight.png');

    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView nestedScrollEnabled={true}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Manicuristas"}
                        textInfo1={"Seleccione la manicurista que quiere que la atienda"}
                    />
                    <View style={styles.contenedorManicuristas}>
                        <CardManicurista
                            estaSeleccionada={false}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            manicuristaImg={manicurista}
                            nombreManicurista={"Sofia Ramirez"}
                        />
                        <CardManicurista
                            estaSeleccionada={true}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            manicuristaImg={manicurista}
                            nombreManicurista={"Sofia Ramirez"}
                        />
                        <CardManicurista
                            estaSeleccionada={false}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            manicuristaImg={manicurista}
                            nombreManicurista={"Sofia Ramirez"}
                        />
                        <CardManicurista
                            estaSeleccionada={false}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            manicuristaImg={manicurista}
                            nombreManicurista={"Sofia Ramirez"}
                        />
                    </View>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Metodo de pago"}
                        textInfo1={"Seleccione el metodo de pago"}
                    />
                    <ListaDropdown
                        items={items}
                        fuenteTexto={fuenteTexto.gantariRegular}
                    />
                </ScrollView>
            </View>
            <BotonesCancelarVerServicios />
            <BarraResumen
                botonVolver={true}
                hrefAtras={"../"}
                botonSiguiente={true}
                hrefSiguiente={"./resumenCita"}
            />
        </Screen>
    );
}