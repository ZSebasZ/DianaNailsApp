import { View, Text, useColorScheme, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { useState } from "react";
import { resumenCitaStyles } from "../styles/resumenCitaStyles";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { BotonesCancelarVerServicios } from "../components/BotonesCancelarVerServicios";
import { BarraResumen } from "../components/BarraResumen";
import { CardManicurista } from "../components/CardManicurista";
import { CardServicioResumen } from "../components/CardServicioResumen";




//Pantalla de Login
export const ResumenCitaScreen = () => {

    const insets = useSafeAreaInsets();

    const [open, setOpen] = useState(false); // Estado para abrir/cerrar el dropdown
    const [value, setValue] = useState(null); // Estado para el valor seleccionado
    const [items, setItems] = useState([
        { label: 'Efectivo (pagar en el local)', value: 'efectivo' },
        { label: 'Tarjeta', value: 'tarjeta' }
    ]);

    const manicurista = require("./../assets/images/manicurista.jpg")
    const fuenteTexto = fuenteTextoStyles();

    //Estilos
    const styles = useThemedStyles(resumenCitaStyles);
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
                        tituloSeccion={"Resumen de tu cita"}
                        textInfo1={"La cita se agendará con los siguientes detalles"}
                    />
                    <View style={styles.contenedorSeccionDetalle}>
                        <Text style={styles.textTituloSubSeccion}>Servicios</Text>
                        <View style={styles.contenedorServiciosSeleccionados}>
                            <CardServicioResumen
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                fuenteTextoRegular={fuenteTexto.gantariRegular}
                                nombreServicio={"Manicura y pedicura"}
                                tiempoServicio={"1 hora y 30 minutos"}
                                precioServicio={"19.99 $"}
                            />
                            <CardServicioResumen
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                fuenteTextoRegular={fuenteTexto.gantariRegular}
                                nombreServicio={"Manicura y pedicura"}
                                tiempoServicio={"1 hora y 30 minutos"}
                                precioServicio={"19.99 $"}
                            />
                            <CardServicioResumen
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                fuenteTextoRegular={fuenteTexto.gantariRegular}
                                nombreServicio={"Manicura y pedicura"}
                                tiempoServicio={"1 hora y 30 minutos"}
                                precioServicio={"19.99 $"}
                            />
                        </View>
                    </View>
                    <View style={styles.contenedorSeccionDetalle}>
                        <Text style={styles.textTituloSubSeccion}>Tiempo total</Text>
                        <Text style={styles.textInfoSubSeccion}>1 hora y 30 minutos</Text>
                    </View>
                    <View style={styles.contenedorSeccionDetalle}>
                        <Text style={styles.textTituloSubSeccion}>Fecha y hora</Text>
                        <View style={styles.contenedorFechaHora}>
                            <Text style={styles.textSubTituloSubSeccion}>Fecha: </Text>
                            <Text style={styles.textInfoSubSeccion}>10/10/2025</Text>
                        </View>
                        <View style={styles.contenedorFechaHora}>
                            <Text style={styles.textSubTituloSubSeccion}>Hora: </Text>
                            <Text style={styles.textInfoSubSeccion}>19:30</Text>
                        </View>
                    </View>
                    <View style={styles.contenedorSeccionDetalle}>
                        <Text style={styles.textTituloSubSeccion}>Manicurista</Text>
                        <View style={{ alignItems: "center" }}>
                            <CardManicurista
                                estaSeleccionada={true}
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                manicuristaImg={manicurista}
                                nombreManicurista={"Sofia Ramirez"}
                            />
                        </View>
                    </View>
                    <View style={[styles.contenedorSeccionDetalle, { paddingBottom: 70 }]}>
                        <Text style={styles.textTituloSubSeccion}>Metodo de pago</Text>
                        <Text style={styles.textInfoSubSeccion}>Efectivo (pagar en el local)</Text>
                    </View>

                </ScrollView>
            </View>
            <BotonesCancelarVerServicios />
            <BarraResumen
                botonVolver={true}
                hrefAtras={"../"}
                botonAgendarCita={true}
                hrefAgendarCita={"./../../../"}
                esTotal={true}
            />
        </Screen>
    );
}