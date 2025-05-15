import { View, useColorScheme, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { productoStyles } from '../styles/productoStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { BarraResumen } from "../components/BarraResumen";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardProductoDetalles } from "../components/CardProductoDetalles";

//Pantalla de Login
export const ProductoScreen = (props) => {

    const insets = useSafeAreaInsets();

    const fuenteTexto = fuenteTextoStyles();

    const producto = require("./../assets/images/manicurista.jpg")
    const manicurista = require("./../assets/images/manicurista.jpg")
    //Estilos
    const styles = useThemedStyles(productoStyles);
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
                        tituloSeccion={props.idProducto == 1 ? "Lima de tipo B cobre 5" : ""}
                        textInfo1={"Detalles del producto"}

                    />
                    <View style={styles.contenedorProductos}>
                        <CardProductoDetalles
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            producto={producto}
                        /*
                            enCarrito={true}
                            agotado={true}
                        */
                        />
                    </View>
                </ScrollView>
            </View>
            <BarraResumen
                botonVolver={true}
                hrefAtras={"../"}
                botonCarrito={true}
                hrefCarrito={"/(clienteScreens)/(pedidosCarrito)/carritoCliente"}
            />
        </Screen>
    );
}