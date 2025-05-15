import { View, useColorScheme, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { citasClienteStyles } from '../styles/citasClienteStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardCita } from "../components/CardCita";


//Pantalla de Login
export const CitasClienteScreen = () => {

    const insets = useSafeAreaInsets();

    const fuenteTexto = fuenteTextoStyles();

    const manicurista = require("./../assets/images/manicurista.jpg")

    //Estilos
    const styles = useThemedStyles(citasClienteStyles);
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
                        tituloSeccion={"Mis citas"}
                        textInfo1={"Aqui se muestran las próximas citas que tienes agendadas"}
                        textInfo2={"Para cancelar una cita, solo haga click sobre ella"}
                    />
                    <View style={styles.contenedorCitas}>
                        <CardCita
                            manicuristaImg={manicurista}
                            manicuristaNombre={"Sara Ramirez"}
                            mostrarCliente={false}
                        />
                        <CardCita
                            manicuristaImg={manicurista}
                            manicuristaNombre={"Sara Ramirez"}
                            mostrarCliente={false}
                        />
                        <CardCita
                            manicuristaImg={manicurista}
                            manicuristaNombre={"Sara Ramirez"}
                            mostrarCliente={false}
                        />
                        <CardCita
                            manicuristaImg={manicurista}
                            manicuristaNombre={"Sara Ramirez"}
                            mostrarCliente={false}
                        />
                    </View>
                </ScrollView>
            </View>
        </Screen>
    );
}