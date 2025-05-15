import { View, useColorScheme, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { pedidosClienteStyles } from '../styles/pedidosClienteStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { BotonTexto } from "../components/BotonTexto";
import { CardPedido } from "../components/CardPedido";


//Pantalla de Login
export const PedidosAdminScreen = () => {

    const insets = useSafeAreaInsets();

    const fuenteTexto = fuenteTextoStyles();

    const manicurista = require("./../assets/images/manicurista.jpg")

    //Estilos
    const styles = useThemedStyles(pedidosClienteStyles);
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
                        tituloSeccion={"Pedidos"}
                        textInfo1={"Aqui se muestran los pedidos que han hecho los clientes"}
                    />
                    <View style={styles.contenedorFiltroPedidos}>
                        <BotonTexto
                            botonNavegacion={true}
                            esLink={false}
                            fondo={true}
                            fuenteTexto={fuenteTexto.gantariBold}
                            textoBoton={"Pendientes"}
                        />
                        <BotonTexto
                            botonNavegacion={true}
                            esLink={false}
                            fondo={false}
                            fuenteTexto={fuenteTexto.gantariBold}
                            textoBoton={"Enviados"}
                        />
                        <BotonTexto
                            botonNavegacion={true}
                            esLink={false}
                            fondo={false}
                            fuenteTexto={fuenteTexto.gantariBold}
                            textoBoton={"Entregados"}
                        />
                    </View>
                    <View style={styles.contenedorPedidos}>
                        <CardPedido
                            productos={"PASAR LOS PRODUCTOS AQUI, DEL JSON"}
                            mostrarCliente={true}
                            clienteImg={manicurista}
                            clienteNombre={"Sebastian Jimenez"}
                        />
                         <CardPedido
                            productos={"PASAR LOS PRODUCTOS AQUI, DEL JSON"}
                            mostrarCliente={true}
                            clienteImg={manicurista}
                            clienteNombre={"Sebastian Jimenez"}
                        />
                    </View>
                </ScrollView>
            </View>
        </Screen>
    );
}