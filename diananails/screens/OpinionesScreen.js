import { View, Text, useColorScheme, ScrollView, Keyboard, FlatList } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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



//Pantalla de Login
export const OpinionesScreen = () => {

    const { usuario } = useContext(AuthContext)
    const [opiniones, setOpiniones] = useState(null)

    const fuenteTexto = fuenteTextoStyles();
    //Estilos
    const styles = useThemedStyles(opinionesStyles);


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

    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)
    const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false)

    const onValueChange = (nombreCampo, valor) => {
        setValoresCampos({ ...valoresCampos, [nombreCampo]: valor })
    }

    const onSubmit = async () => {
        Keyboard.dismiss()

        const validacionErrores = validacionOpinion(valoresCampos)
        setErrores(validacionErrores)
        if (Object.keys(validacionErrores).length == 0) {
            try {
                setModalLoaderVisible(true)
                const respuesta = await realizarOpinion(valoresCampos);
                //console.log('Opinion hecha:', respuesta);

                //Alert.alert('Éxito', 'Cliente registrado correctamente');
                // Aquí puedes redirigir a otra pantalla si quieres
                resetFormulario()
                setModalLoaderVisible(false)
                setModalFeedbackVisible(true)
                cargarOpiniones()
            } catch (error) {
                const mensajeError = error.response?.data?.mensaje || 'Ocurrió un error inesperado';
                //Alert.alert('Error', mensajeError);

                // Ejemplo: si el error es del campo `email`, puedes mostrarlo directamente
                if (mensajeError.includes("correo")) {
                    setErrores({ ...errores, email: mensajeError });
                }
            }
        }
    }

    const resetFormulario = () => {
        setValoresCampos({
            idCliente: usuario.datosUsuario.id,
            titulo: null,
            descripcion: null,
            estrellas: 3,
        })
    }

    const cargarOpiniones = async () => {
        const respuesta = await obtenerOpiniones(valoresFiltro); // esto ya es el array correcto
        if(respuesta.length != 0){
            setOpiniones(respuesta);
        } else {
            setOpiniones(null)
        }
        
        //console.log(respuesta)
    };

    useEffect(() => {
        try {
            cargarOpiniones();
        } catch {
            console.error("Error al obtener las citas")
        }
    }, [])

    const seleccionarAntiguedad = (tipo) => {
        setValoresFiltro((prev) => ({
            ...prev,
            antiguedad: tipo, // "recientes" o "antiguas"
        }));
    };

    useEffect(() => {
        cargarOpiniones();
    }, [valoresFiltro]);

    return (
        <Screen enTab={true}>

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