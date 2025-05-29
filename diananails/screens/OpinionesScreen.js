import { View, Text, ScrollView, Keyboard, FlatList } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { opinionesStyles } from '../styles/opinionesStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { BotonTexto } from "../components/BotonTexto";
import { CampoTextoInput } from "../components/CampoTextoInput";
import { EstrellasOpinion } from "../components/EstrellasOpinion";
import { CardOpinion } from "../components/CardOpinion";
import { useContext, useEffect, useState } from "react";
import { validacionOpinion, opinionValidacionOnBlur } from "../validaciones/opinionValidacion";
import { ModalLoader } from "../components/ModalLoader";
import { ModalFeedback } from "../components/ModalFeedback";
import { AuthContext } from "../contexts/authContext";
import { obtenerOpiniones, realizarOpinion } from "../api/OpinionesController";
import { ModalErrorAPI } from "../components/ModalErrorAPI";


//Pantalla de Opiniones
export const OpinionesScreen = () => {

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(opinionesStyles);

    // Usamos el contexto de autenticación
    const { usuario } = useContext(AuthContext)

    // Estado de las opiniones
    const [opiniones, setOpiniones] = useState(null)

    // Estados para los campos, errores y filtro
    const [errores, setErrores] = useState({})
    const [valoresCampos, setValoresCampos] = useState({
        idCliente: usuario.datosUsuario.id,
        titulo: null,
        descripcion: null,
        estrellas: 3,
    })
    const [valoresFiltro, setValoresFiltro] = useState({
        antiguedad: "recientes",
        estrellas: 0
    })

    // Estados para los modales
    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)
    const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false)
    const [modalErrorAPI, setModalErrorAPI] = useState(false)


    //Funcion en ir asignando valores al estado valoresCampos
    const onValueChange = (nombreCampo, valor) => {
        setValoresCampos({ ...valoresCampos, [nombreCampo]: valor })
    }

    // Funciones para enviar la opinion
    const onSubmit = async () => {
        Keyboard.dismiss()

        const validacionErrores = validacionOpinion(valoresCampos)
        setErrores(validacionErrores)
        if (Object.keys(validacionErrores).length == 0) {
            try {
                setModalLoaderVisible(true)
                const respuesta = await realizarOpinion(valoresCampos);
                resetFormulario()
                setModalLoaderVisible(false)
                setModalFeedbackVisible(true)
                cargarOpiniones()
            } catch (error) {
                setModalLoaderVisible(false)
                setModalErrorAPI(true)
            }
        }
    }

    // Funcion para resetear el formulario
    const resetFormulario = () => {
        setValoresCampos({
            idCliente: usuario.datosUsuario.id,
            titulo: null,
            descripcion: null,
            estrellas: 3,
        })
    }

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
            setModalLoaderVisible(false)
            setModalErrorAPI(true)
        }

    };

    // UseEffect para cargar las opiniones
    useEffect(() => {
        try {
            cargarOpiniones();
        } catch {
            setModalLoaderVisible(false)
            setModalErrorAPI(true)
        }
    }, [])

    //Funcion para alternar el filtro
    const seleccionarAntiguedad = (tipo) => {
        setValoresFiltro((prev) => ({
            ...prev,
            antiguedad: tipo,
        }));
    };

    // UseEffect para cargar las opiniones segun el filtro
    useEffect(() => {
        try {
            cargarOpiniones();
        } catch {
            setModalLoaderVisible(false)
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

            <ModalLoader
                visible={modalLoaderVisible}
            />

            <ModalFeedback
                titulo={"Opinion enviada"}
                feedback={"Tu opinion de ha realizado con exito"}
                visible={modalFeedbackVisible}
                fuenteTexto={fuenteTexto.gantariBold}
                cerrar={() => {
                    setModalFeedbackVisible(false)
                }}
            />

            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Opina"}
                        textInfo1={"Danos tu opinión"}
                    />
                    <View style={{ gap: 15 }}>
                        <CampoTextoInput
                            conIcono={false}
                            fuenteTexto={fuenteTexto.gantariRegular}
                            placeHolder={"Excelente servicio..."}
                            conLabel={true}
                            textLabel={"Titulo"}
                            labelCentrado={false}
                            fuenteTextoLabel={fuenteTexto.gantariBold}
                            contrasena={false}
                            nombreCampo={"titulo"}
                            valorCampo={valoresCampos.titulo}
                            onValueChange={onValueChange}
                            errorValidacion={errores.titulo}
                            anchoCompleto={true}
                            onBlurValidacion={opinionValidacionOnBlur}
                        />
                        <CampoTextoInput
                            conIcono={false}
                            fuenteTexto={fuenteTexto.gantariRegular}
                            placeHolder={"Me gustó mucho el servicio al cliente, tienen un buen personal..."}
                            conLabel={true}
                            textLabel={"Opinión"}
                            labelCentrado={false}
                            fuenteTextoLabel={fuenteTexto.gantariBold}
                            contrasena={false}
                            nombreCampo={"descripcion"}
                            valorCampo={valoresCampos.descripcion}
                            onValueChange={onValueChange}
                            errorValidacion={errores.descripcion}
                            anchoCompleto={true}
                            esTextArea={true}
                            onBlurValidacion={opinionValidacionOnBlur}
                        />

                        <View>
                            <Text style={[styles.textTituloInput, { textAlign: "center", marginBottom: 5 }]}>Estrellas</Text>
                            <EstrellasOpinion
                                valor={valoresCampos.estrellas}
                                onSeleccion={(valor) => {
                                    setValoresCampos((prev) => ({
                                        ...prev,
                                        estrellas: valor
                                    }))
                                }}
                            />
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <BotonTexto
                                botonNavegacion={true}
                                esLink={false}
                                fondo={true}
                                fuenteTexto={fuenteTexto.gantariBold}
                                textoBoton={"Enviar opinión"}
                                onPress={onSubmit}
                            />
                        </View>
                    </View>
                    <View style={styles.lineaDivisora}></View>
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