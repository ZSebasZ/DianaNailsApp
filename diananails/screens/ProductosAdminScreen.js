import { View, useColorScheme, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { useState } from "react";
import { tiendaStyles } from "../styles/tiendaStyles";
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardProducto } from "../components/CardProducto";



//Pantalla de Login
export const ProductosAdminScreen = () => {

    const insets = useSafeAreaInsets();

    const [open, setOpen] = useState(false); // Estado para abrir/cerrar el dropdown
    const [value, setValue] = useState(null); // Estado para el valor seleccionado
    const [items, setItems] = useState([
        { label: 'Efectivo (pagar en el local)', value: 'efectivo' },
        { label: 'Tarjeta', value: 'tarjeta' }
    ]);

    const producto = require("./../assets/images/manicurista.jpg")

    const fuenteTexto = fuenteTextoStyles();

    //Estilos
    const styles = useThemedStyles(tiendaStyles);
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
                        tituloSeccion={"Productos"}
                        textInfo1={"Aqui pueder ver todos los productos que vendes"}
                        textInfo2={"Si quiere editar alguno, solo pulselo"}
                    />
                    <View style={styles.contenedorProductos}>
                        <CardProducto
                            href={"/(gestionAdmin)/producto/1"}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            productoImg={producto}
                        />
                        <CardProducto
                            href={"/"}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            productoImg={producto}
                        />
                        <CardProducto
                            href={"/"}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            productoImg={producto}
                        />
                        <CardProducto
                            href={"/"}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            productoImg={producto}
                        />
                        <CardProducto
                            href={"/"}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            productoImg={producto}
                        />
                        <CardProducto
                            href={"/"}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            productoImg={producto}
                        />
                    </View>
                </ScrollView>
            </View>
        </Screen>
    );
}