import { View, ScrollView, FlatList, Text } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { useEffect, useState } from "react";
import { manicuristaMetodoPagoStyles } from "../styles/manicuristaMetodoPagoStyles";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { CardManicurista } from "../components/CardManicurista";
import { useContext, useCallback } from "react";
import { obtenerManicuristasAdmin } from "../api/ManicuristasController";
import { AuthContext } from "../contexts/authContext";
import { useFocusEffect } from "expo-router";
import { ModalErrorAPI } from "../components/ModalErrorAPI";


//Pantalla de ManicuristasAdmin
export const ManicuristasAdminScreen = () => {

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(manicuristaMetodoPagoStyles);

    // Usamos el contexto de autenticación
    const { usuario } = useContext(AuthContext)

    // Estado de las manicuristas
    const [manicuristas, setManicuristas] = useState(null);

    const [modalErrorAPI, setModalErrorAPI] = useState(false)


    // UseEffect para cargar las manicuristas
    useEffect(() => {
        const obtenerManicuristas = async () => {
            try {
                const respuesta = await obtenerManicuristasAdmin(usuario.datosUsuario.id);
                setManicuristas(respuesta);
            } catch (error) {
                setModalErrorAPI(true)
            }
        }
        obtenerManicuristas()
    }, [])

    // UseFocusEffect para cargar las manicuristas
    useFocusEffect(
        useCallback(() => {
            const obtenerManicuristas = async () => {
                try {
                    const respuesta = await obtenerManicuristasAdmin(usuario.datosUsuario.id);
                    setManicuristas(respuesta);
                } catch (error) {
                    setModalErrorAPI(true)
                }
            }
            obtenerManicuristas()
        }, [])
    );

    // Renderizamos la pantalla
    return (
        <Screen enTab={true}>

            <ModalErrorAPI
                visible={modalErrorAPI}
                textInfo={"Ha ocurrido un error del lado del servidor"}
                cerrar={() => { setModalErrorAPI(false) }}
            />

            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Manicuristas"}
                        textInfo1={"Aqui pueder ver todas las manicuristas que tienes contratadas"}
                        textInfo2={"Si quiere editar alguna, solo pulsela"}
                    />
                    {manicuristas == null ? (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.textInfo]}>Cargando manicuristas...</Text>
                        </View>
                    ) : (
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
                                    href={`/navegacion/admin/(gestionAdmin)/manicurista/${item.id}`}
                                    fuenteTextoBold={fuenteTexto.gantariBold}
                                    manicuristaImg={item.url_imagen}
                                    nombreManicurista={item.manicurista}
                                    onPress={() => { }}
                                />
                            }
                            scrollEnabled={false}

                        >
                        </FlatList>
                    )}

                </ScrollView>
            </View>
        </Screen>
    );
}