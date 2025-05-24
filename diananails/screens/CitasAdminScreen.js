import { View, useColorScheme, ScrollView, FlatList } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { citasClienteStyles } from '../styles/citasClienteStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardCita } from "../components/CardCita";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { cancelarCita, obtenerCitasClientes } from "../api/CitasController";
import { ModalConfirmarAccion } from "../components/ModalConfirmarAccion";
import { ModalLoader } from "../components/ModalLoader";
import { ModalFeedback } from "../components/ModalFeedback";


//Pantalla de Login
export const CitasAdminScreen = () => {

    const { usuario } = useContext(AuthContext)
    const [citas, setCitas] = useState([])

    const fuenteTexto = fuenteTextoStyles();
    //Estilos
    const styles = useThemedStyles(citasClienteStyles);

    const cargarCitas = async () => {
        const respuesta = await obtenerCitasClientes(usuario.datosUsuario.id)// esto ya es el array correcto
        setCitas(respuesta.citas);
        //console.log(respuesta.citas)
    };

    useEffect(() => {
        cargarCitas();
    }, [])

    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Citas"}
                        textInfo1={"Proximas citas de los clientes"}
                    />
                    <FlatList
                        data={citas}
                        contentContainerStyle={{
                            gap: 20,
                            marginBottom: 15
                        }}
                        renderItem={({ item }) =>
                            <CardCita
                                mostrarCliente={true}
                                datosCita={item.cita}
                                onPress={undefined}
                            />
                        }
                        scrollEnabled={false}

                    >
                    </FlatList>

                    {/*<View style={styles.contenedorCitas}>
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
                    </View>*/}
                </ScrollView>
            </View>
        </Screen>
    );
}