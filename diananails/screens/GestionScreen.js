import { View, useColorScheme, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { gestionStyles } from '../styles/gestionStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { BotonIconoTexto } from "../components/BotonIconoTexto";


//Pantalla de Login
export const GestionScreen = () => {

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
                            tituloSeccion={"Gestión"}
                            textInfo1={"Desde puedes gestionar tus servicios, productos y manicuristas"}
                        />
                        <View style={styles.containerSeccion}>
                            <BotonIconoTexto
                                esLink={true}
                                href={"/(gestionAdmin)/(tabs-servicios)/servicios"}
                                nombreIcono={"assistant"}
                                fondo={true}
                                fuenteTextoNormal={fuenteTexto.gantariBold}
                                textoBoton={"Gestionar servicios"}
                                enTab={true}
                            />
                            <BotonIconoTexto
                                esLink={true}
                                href={"/(gestionAdmin)/(tabs-productos)/productos"}
                                nombreIcono={"store"}
                                fondo={true}
                                fuenteTextoNormal={fuenteTexto.gantariBold}
                                textoBoton={"Gestionar productos"}
                                enTab={true}
                            />
                            <BotonIconoTexto
                                esLink={true}
                                href={"/(gestionAdmin)/(tabs-manicuristas)/manicuristas"}
                                nombreIcono={"card-account-details"}
                                fondo={true}
                                fuenteTextoNormal={fuenteTexto.gantariBold}
                                textoBoton={"Gestionar manicuristas"}
                                enTab={true}
                            />
                        </View>
                    </ScrollView>
                </View>
            </Screen>
        );
}