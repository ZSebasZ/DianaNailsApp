import { View, useColorScheme, ScrollView, FlatList } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { useEffect, useState } from "react";
import { manicuristaMetodoPagoStyles } from "../styles/manicuristaMetodoPagoStyles";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { BotonesCancelarVerServicios } from "../components/BotonesCancelarVerServicios";
import { BarraResumen } from "../components/BarraResumen";
import { CardManicurista } from "../components/CardManicurista";
import { ListaDropdown } from "../components/ListaDropdown";
import { useContext } from "react";
import { AgendarCitaContext } from "../contexts/agendarCitaContext";
import { BotonTexto } from "../components/BotonTexto";
import { obtenerManicuristasAdmin } from "../api/ManicuristasController";
import { AuthContext } from "../contexts/authContext";

//Pantalla de Login
export const ManicuristasAdminScreen = () => {

    const {usuario} = useContext(AuthContext)
    const [manicuristas, setManicuristas] = useState();

    const fuenteTexto = fuenteTextoStyles();
    //Estilos
    const styles = useThemedStyles(manicuristaMetodoPagoStyles);

    useEffect(() => {
        const obtenerManicuristas = async () => {
            const respuesta = await obtenerManicuristasAdmin(usuario.datosUsuario.id);
            setManicuristas(respuesta);
        }
        obtenerManicuristas()
    }, [])

    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Manicuristas"}
                        textInfo1={"Aqui pueder ver todas las manicuristas que tienes contratadas"}
                        textInfo2={"Si quiere editar alguna, solo pulsela"}
                    />
                    <FlatList
                        data={manicuristas}
                        numColumns={2}

                        contentContainerStyle={{
                            gap: 20,
                            marginBottom: 20
                        }}
                        columnWrapperStyle={{
                            justifyContent: "center",
                            gap: 20
                        }}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <CardManicurista
                                esLink={true}
                                href={`/navegacion/(gestionAdmin)/manicurista/${item.id}`}
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                manicuristaImg={item.url_imagen}
                                nombreManicurista={item.manicurista}
                                onPress={() => {}}
                            />
                        }
                        scrollEnabled={false}

                    >
                    </FlatList>
                </ScrollView>
            </View>
        </Screen>
    );
}