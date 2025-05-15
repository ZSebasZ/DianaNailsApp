import { View, Text, useColorScheme, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { opinionesStyles } from '../styles/opinionesStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { BotonTexto } from "../components/BotonTexto";
import { EstrellasOpinion } from "../components/EstrellasOpinion";
import { CardOpinion } from "../components/CardOpinion";



//Pantalla de Login
export const OpinionesAdminScreen = () => {

    const insets = useSafeAreaInsets();

    const fuenteTexto = fuenteTextoStyles();

    const cliente = require("./../assets/images/manicurista.jpg")

    //Estilos
    const styles = useThemedStyles(opinionesStyles);
    const colors = useThemedStyles();
    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../assets/images/logoDark.png')
        : require('./../assets/images/logoLight.png');

    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 10}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Opiniones"}
                        textInfo1={"Mira las opiniones de los demas"}
                    />
                    <View>
                        <Text style={[styles.textTituloInput, { textAlign: "center", marginBottom: 10 }]}>Antiguedad</Text>
                        <View style={styles.contenedorFiltroOpiniones}>
                            <BotonTexto
                                botonNavegacion={true}
                                esLink={false}
                                fondo={true}
                                fuenteTexto={fuenteTexto.gantariBold}
                                textoBoton={"Recientes"}
                            />
                            <BotonTexto
                                botonNavegacion={true}
                                esLink={false}
                                fondo={false}
                                fuenteTexto={fuenteTexto.gantariBold}
                                textoBoton={"Antiguas"}
                            />
                        </View>
                        <View>
                            <Text style={[styles.textTituloInput, { textAlign: "center", marginBottom: 5 }]}>Estrellas</Text>
                            <EstrellasOpinion />
                        </View>
                    </View>
                    <View style={styles.contenedorOpiniones}>
                        <CardOpinion 
                            titulo={"Titulo opinion"}
                            clienteImg={cliente}
                            clienteNombre={"Sebastian"}
                            fecha={"2024/10/10"}
                            opinion={"Tuve una experiencia realmente positiva. El servicio al cliente fue impecable, el personal se mostró siempre atento, cordial y dispuesto a ayudar. Las instalaciones estaban limpias y bien organizadas. Sin duda, superaron mis expectativas."}
                            estrellas={5}
                        />
                        <CardOpinion 
                            titulo={"Titulo opinion"}
                            clienteImg={cliente}
                            clienteNombre={"Sebastian"}
                            fecha={"2024/10/10"}
                            opinion={"Tuve una experiencia realmente positiva. El servicio al cliente fue impecable, el personal se mostró siempre atento, cordial y dispuesto a ayudar. Las instalaciones estaban limpias y bien organizadas. Sin duda, superaron mis expectativas."}
                            estrellas={5}
                        />
                        <CardOpinion 
                            titulo={"Titulo opinion"}
                            clienteImg={cliente}
                            clienteNombre={"Sebastian"}
                            fecha={"2024/10/10"}
                            opinion={"Tuve una experiencia realmente positiva. El servicio al cliente fue impecable, el personal se mostró siempre atento, cordial y dispuesto a ayudar. Las instalaciones estaban limpias y bien organizadas. Sin duda, superaron mis expectativas."}
                            estrellas={5}
                        />
                    </View>
                </ScrollView>
            </View>
        </Screen>
    );
}