import { View, Text, ScrollView, FlatList } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { opinionesStyles } from '../styles/opinionesStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { BotonTexto } from "../components/BotonTexto";
import { EstrellasOpinion } from "../components/EstrellasOpinion";
import { CardOpinion } from "../components/CardOpinion";
import { useEffect, useState } from "react";
import { obtenerOpiniones } from "../api/OpinionesController";
import { ModalErrorAPI } from "../components/ModalErrorAPI";


//Pantalla de OpinionesAdmin
export const OpinionesAdminScreen = () => {

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(opinionesStyles);

    // Estado de las opiniones
    const [opiniones, setOpiniones] = useState(null)

    // Estado para el filtro
    const [valoresFiltro, setValoresFiltro] = useState({
        antiguedad: "recientes",
        estrellas: 0
    })

    const [modalErrorAPI, setModalErrorAPI] = useState(false)


    // Funciones que se encargan de la obtencion de las opiniones
    const cargarOpiniones = async () => {
        try {
            const respuesta = await obtenerOpiniones(valoresFiltro);
            if (respuesta.length != 0) {
                setOpiniones(respuesta);
            } else {
                setOpiniones(null)
            }
        } catch (error) {
            setModalErrorAPI(true)
        }

    };

    // UseEffect para cargar las citas
    useEffect(() => {
        try {
            cargarOpiniones();
        } catch (error) {
            setModalErrorAPI(true)
        }
    }, [])

    // Funciones para alternar el filtro
    const seleccionarAntiguedad = (tipo) => {
        setValoresFiltro((prev) => ({
            ...prev,
            antiguedad: tipo, // "recientes" o "antiguas"
        }));
    };

    // UseEffect para cargar las citas segun el filtro
    useEffect(() => {
        try {
            cargarOpiniones();
        } catch (error) {
            setModalErrorAPI(true)
        }
    }, [valoresFiltro]);

    // Renderizamos la pantalla
    return (
        <Screen enTab={true}>

            <ModalErrorAPI
                visible={modalErrorAPI}
                textInfo={"Ha ocurrido un error del lado del servidor"}
                cerrar={() => { setModalErrorAPI(false) }}
            />

            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Opiniones"}
                        textInfo1={"Mira las opiniones de los clientes"}
                    />
                    <View>
                        <Text style={[styles.textTituloInput, { textAlign: "center", marginBottom: 10 }]}>Antiguedad</Text>
                        <View style={styles.contenedorFiltroOpiniones}>
                            <BotonTexto
                                botonNavegacion={true}
                                esLink={false}
                                fondo={valoresFiltro.antiguedad === "recientes"}
                                fuenteTexto={fuenteTexto.gantariBold}
                                textoBoton={"Recientes"}
                                onPress={() => seleccionarAntiguedad("recientes")}
                            />
                            <BotonTexto
                                botonNavegacion={true}
                                esLink={false}
                                fondo={valoresFiltro.antiguedad === "antiguas"}
                                fuenteTexto={fuenteTexto.gantariBold}
                                textoBoton={"Antiguas"}
                                onPress={() => seleccionarAntiguedad("antiguas")}
                            />
                        </View>
                        <View>
                            <Text style={[styles.textTituloInput, { textAlign: "center", marginBottom: 5 }]}>Estrellas</Text>
                            <EstrellasOpinion
                                tipo={"filtro"}
                                valor={valoresFiltro.estrellas}
                                onSeleccion={(valor) => {
                                    setValoresFiltro((prev) => ({
                                        ...prev,
                                        estrellas: valor
                                    }))
                                }}
                            />
                        </View>
                    </View>
                    {opiniones == null ? (
                        <View style={{ marginVertical: 15, alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.textInfo]}>No hay opiniones para el filtro aplicado</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={opiniones}
                            contentContainerStyle={{
                                gap: 20,
                                marginVertical: 15
                            }}
                            renderItem={({ item }) =>
                                <CardOpinion
                                    titulo={item.titulo}
                                    clienteImg={item.clienteImg}
                                    clienteNombre={item.clienteNombre}
                                    fecha={item.fecha}
                                    opinion={item.descripcion}
                                    estrellas={item.estrellas}
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