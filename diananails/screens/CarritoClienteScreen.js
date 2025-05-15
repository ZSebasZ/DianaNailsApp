import { View, useColorScheme, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { carritoClienteStyles } from '../styles/carritoClienteStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { BarraResumen } from "../components/BarraResumen";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardProductoCarrito } from "../components/CardProductoCarrito";


//Pantalla de Login
export const CarritoClienteScreen = () => {

    const insets = useSafeAreaInsets();

    const productoImg = require("./../assets/images/manicurista.jpg");

    const fuenteTexto = fuenteTextoStyles();

    //Estilos
    const styles = useThemedStyles(carritoClienteStyles);
    const colors = useThemedStyles();
    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../assets/images/logoDark.png')
        : require('./../assets/images/logoLight.png');

    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Mi carrito"}
                        textInfo1={"Productos en mi carrito"}
                    />
                    <View style={styles.contenedorProductosCarrito}>
                        <CardProductoCarrito
                            productoImg={productoImg}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                        />
                        <CardProductoCarrito
                            productoImg={productoImg}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                        />
                        <CardProductoCarrito
                            productoImg={productoImg}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                        />
                    </View>
                </ScrollView>
            </View>
            <BarraResumen
                botonVolver={true}
                hrefAtras={"../"}
                botonSiguiente={true}
                esRealizarPedido={true}
                hrefSiguiente={"../"}
            />
        </Screen>
    );
}