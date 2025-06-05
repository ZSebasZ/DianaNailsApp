import { View, ScrollView } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { gestionStyles } from '../styles/gestionStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { BotonIconoTexto } from "../components/BotonIconoTexto";


//Pantalla de Gestion
export const GestionScreen = () => {

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(gestionStyles);

    // Renderizamos la pantalla
    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Gestión"}
                        textInfo1={"Aquí puedes gestionar los servicios, productos y manicuristas de tu negocio"}
                    />
                    <View style={styles.containerSeccion}>
                        <BotonIconoTexto
                            esLink={true}
                            href={"/navegacion/admin/(gestionAdmin)/(tabs-servicios)/servicios"}
                            nombreIcono={"assistant"}
                            fondo={true}
                            fuenteTextoNormal={fuenteTexto.gantariBold}
                            textoBoton={"Gestionar servicios"}
                            enTab={true}
                        />
                        <BotonIconoTexto
                            esLink={true}
                            href={"/navegacion/admin/(gestionAdmin)/(tabs-productos)/productos"}
                            nombreIcono={"store"}
                            fondo={true}
                            fuenteTextoNormal={fuenteTexto.gantariBold}
                            textoBoton={"Gestionar productos"}
                            enTab={true}
                        />
                        <BotonIconoTexto
                            esLink={true}
                            href={"/navegacion/admin/(gestionAdmin)/(tabs-manicuristas)/manicuristas"}
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