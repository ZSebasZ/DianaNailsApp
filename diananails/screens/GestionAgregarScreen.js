import { View, Text, ScrollView, Alert, Keyboard } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { perfilStyles } from '../styles/perfilStyles';
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { BotonIconoTexto } from "../components/BotonIconoTexto";
import { BotonTexto } from "../components/BotonTexto";
import { TomarEscogerImagen } from "../components/TomarEscogerImagen";
import { CampoTextoInput } from "../components/CampoTextoInput";
import { servicioValidacionOnBlur, validacionServicio } from "../validaciones/servicioValidacion";
import { ModalLoader } from "../components/ModalLoader";
import { ModalFeedback } from "../components/ModalFeedback";
import { nuevoServicio } from "../api/ServiciosController";
import { productoValidacionOnBlur, validacionProducto } from "../validaciones/productoValidacion";
import { nuevoProducto, subirImagenImgur } from "../api/ProductosController";
import { manicuristaValidacionOnBlur, validacionManicurista } from "../validaciones/manicuristaValidacion";
import { nuevaManicurista } from "../api/ManicuristasController";
import { ModalErrorAPI } from "../components/ModalErrorAPI";



//Pantalla de GestionAgregar
export const GestionAgregarScreen = (props) => {

    //Estilos y fuentes
    const styles = useThemedStyles(perfilStyles);
    const fuenteTexto = fuenteTextoStyles();

    // Estados para la imagen
    const [imageUri, setImageUri] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);

    // Funcion que pide permisos para abrir la camara y acceder a la galeria
    const pedirPermisos = async () => {
        const permisoCamara = await ImagePicker.requestCameraPermissionsAsync();
        const permisoGaleria = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permisoCamara.granted || !permisoGaleria.granted) {
            //Alert.alert('Permisos requeridos', 'Necesitas otorgar permisos para usar la cámara y la galería.');
            return false;
        }
        return true;
    };

    // Funcion para tomar una foto
    const tomarFoto = async () => {
        const permiso = await pedirPermisos();
        if (!permiso) return;

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            base64: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const { uri, base64 } = result.assets[0]
            setImageUri(uri);
            setImageBase64(base64)
            setValoresCampos({ ...valoresCampos, imagen: base64 })
            const nuevosErrores = { ...errores };
            delete nuevosErrores.imagen;
            setErrores(nuevosErrores);
        } else {
            setErrores({ ...errores, imagen: "La imagen del producto es obligatoria" })
        }
    };

    // Funcion para seleccionar una foto de la galeria
    const seleccionarDeGaleria = async () => {
        const permiso = await pedirPermisos();
        if (!permiso) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const { uri, base64 } = result.assets[0]
            setImageUri(uri);
            setImageBase64(base64)
            setValoresCampos({ ...valoresCampos, imagen: base64 })
            const nuevosErrores = { ...errores };
            delete nuevosErrores.imagen;
            setErrores(nuevosErrores);
        } else {
            setErrores({ ...errores, imagen: "La imagen del producto es obligatoria" })
        }
    };

    // Estados de los modales
    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)
    const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false)
    const [modalErrorAPI, setModalErrorAPI] = useState(false)


    // Estados para la validacion
    const [errores, setErrores] = useState({});
    const [valoresCampos, setValoresCampos] = useState(
        props.tipo === "servicio"
            ? {
                nombre: null,
                precio: null,
                tiempo: 1,
            }
            : props.tipo == "producto" ? {
                imagen: null,
                nombre: "Prueba producto",
                descripcion: "Descrpcion del prioeucto de prueba",
                precio: "10.99",
                stock: "10"
            } : props.tipo == "manicurista" && {
                imagen: null,
                dniNie: "98789878A",
                nombre: "PruebaM",
                apellidos: "Apellidos M",
                telefono: "675757686",
                email: "pruebam1@diananails.com",
                contrasena: "Abc123.",
                confirmarContrasena: "Abc123."
            }
    );

    //Estados para el contador en caso de sea un SERVICIO
    const [tiempoContador, setTiempoContador] = useState(1);
    const MAX_TIEMPO = 8;

    // Funcion para incrementar el contador
    const incrementarTiempo = () => {
        if (tiempoContador < MAX_TIEMPO) {
            setTiempoContador(tiempoContador + 1);
            setValoresCampos({ ...valoresCampos, tiempo: tiempoContador + 1 })
        }
    };

    // Funcion para decrementar el contador
    const decrementarTiempo = () => {
        if (tiempoContador > 1) {
            setTiempoContador(tiempoContador - 1);
            setValoresCampos({ ...valoresCampos, tiempo: tiempoContador - 1 })
        }
    };

    // Funcion para resetear el formulario
    const resetFormulario = () => {
        setValoresCampos(
            props.tipo === "servicio"
                ? {
                    nombre: null,
                    precio: null,
                    tiempo: 1,
                }
                : props.tipo == "producto" ? {
                    imagen: null,
                    nombre: null,
                    descripcion: null,
                    precio: null,
                    stock: null
                } : props.tipo == "manicurista" && {
                    imagen: null,
                    dniNie: null,
                    nombre: null,
                    apellidos: null,
                    telefono: null,
                    email: null,
                    contrasena: null,
                    confirmarContrasena: null
                }
        )

        switch (props.tipo) {
            case "servicio":
                setTiempoContador(1)
                break;
            case "producto":
                setImageUri(null);
                setImageBase64(null)
                break;
            case "manicurista":
                setImageUri(null);
                setImageBase64(null)
                break;
        }

    }

    // Funcion para ir asignando valores al estado valoresCampos
    const onValueChange = (nombreCampo, valor) => {
        setValoresCampos({ ...valoresCampos, [nombreCampo]: valor })
    }

    // Funcion para enviar el formulario de servicio
    const onSubmitServicio = async () => {
        Keyboard.dismiss()

        const validacionErrores = validacionServicio(valoresCampos)

        setErrores(validacionErrores)
        if (Object.keys(validacionErrores).length == 0) {
            try {
                setModalLoaderVisible(true)
                await nuevoServicio(valoresCampos.nombre, valoresCampos.precio, valoresCampos.tiempo)
                resetFormulario()
                setModalLoaderVisible(false)
                setModalFeedbackVisible(true)
            } catch (error) {
                setModalLoaderVisible(false)
                setModalErrorAPI(true)
            }
        }
    }

    // Funcion para enviar el formulario de producto
    const onSubmitProducto = async () => {
        Keyboard.dismiss()

        const validacionErrores = validacionProducto(valoresCampos)

        setErrores(validacionErrores)
        if (Object.keys(validacionErrores).length == 0) {
            try {
                setModalLoaderVisible(true)
                const imagenUrl = await subirImagen()
                await nuevoProducto(imagenUrl, valoresCampos.nombre, valoresCampos.descripcion, valoresCampos.precio, valoresCampos.stock)
                resetFormulario()
                setModalLoaderVisible(false)
                setModalFeedbackVisible(true)
            } catch (error) {
                setModalLoaderVisible(false)
                setModalErrorAPI(true)
            }
        }
    }

    // Funcion para enviar el formulario de manicurista
    const onSubmitManicurista = async () => {
        Keyboard.dismiss()

        const validacionErrores = validacionManicurista(valoresCampos)

        setErrores(validacionErrores)
        if (Object.keys(validacionErrores).length == 0) {
            try {
                setModalLoaderVisible(true)
                const imagenUrl = await subirImagen()
                await nuevaManicurista(imagenUrl, valoresCampos.dniNie, valoresCampos.nombre, valoresCampos.apellidos, valoresCampos.telefono, valoresCampos.email, valoresCampos.contrasena)
                resetFormulario()
                setModalLoaderVisible(false)
                setModalFeedbackVisible(true)
            } catch (error) {
                setModalLoaderVisible(false)
                setModalErrorAPI(true)
            }
        }
    }

    // Funcion para subir la imagen a Imgur
    const subirImagen = async () => {
        if (imageUri != null) {
            try {
                const respuesta = await subirImagenImgur({
                    imagenBase64: imageBase64,
                });
                setValoresCampos({ ...valoresCampos, imagen: respuesta })
                return respuesta
            } catch (error) {
                setModalLoaderVisible(false)
                setModalErrorAPI(true)
            }
        }
    };

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
                titulo={
                    props.tipo == "servicio" ? "Servicio añadido"
                        : props.tipo == "producto" ? "Producto añadido"
                            : props.tipo == "manicurista" && "Manicurista añadida"
                }
                feedback={
                    props.tipo == "servicio" ? "El servicio se ha añadico correctamente y esta a disposicion de los clientes"
                        : props.tipo == "producto" ? "El prodcuto se ha añadico correctamente y esta a disponible en la tienda"
                            : props.tipo == "manicurista" && "La manicurista se ha añadico correctamente y esta lista para atender citas"
                }
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
                        tituloSeccion={`Agregar ${props.tipo == "producto" || props.tipo == "servicio" ? "un nuevo" : "una nueva"} ${props.tipo}`}
                        textInfo1={`Completa todos los campos para agregar ${props.tipo == "manicurista" ? "una nueva" : "un nuevo"} ${props.tipo}`}
                    />
                    <View style={{ gap: 20 }}>
                        {(props.tipo == "producto" || props.tipo == "manicurista") && (
                            <View style={{ gap: 10 }}>
                                <Text style={styles.textTituloSeccion}>{`Imagen ${props.tipo == "producto" || props.tipo == "servicio" ? "del" : "de la"} ${props.tipo}`}</Text>
                                <TomarEscogerImagen
                                    fuenteTexto={fuenteTexto.gantariBold}
                                    tomarFoto={tomarFoto}
                                    seleccionarDeGaleria={seleccionarDeGaleria}
                                    imageUri={imageUri != null && imageUri}
                                />
                                <View style={{ justifyContent: "center", alignItems: "center", gap: 10 }}>
                                    <BotonIconoTexto
                                        esLink={false}

                                        nombreIcono={"camera"}
                                        fondo={false}
                                        fuenteTextoNormal={fuenteTexto.gantariBold}
                                        textoBoton={"Tomar foto"}
                                        enTab={true}
                                        onPress={tomarFoto}
                                    />
                                    <BotonIconoTexto
                                        esLink={false}
                                        nombreIcono={"image-multiple"}
                                        fondo={false}
                                        fuenteTextoNormal={fuenteTexto.gantariBold}
                                        textoBoton={"Seleccionar desde mi galeria"}
                                        enTab={true}
                                        onPress={seleccionarDeGaleria}
                                    />
                                </View>
                                {errores.imagen && (
                                    <Text style={styles.textImagenRequerida}>{errores.imagen}</Text>
                                )}
                            </View>
                        )}
                        <View style={{ gap: 10, marginBottom: (props.tipo == "producto" || props.tipo == "manicurista") ? 15 : 0 }}>
                            <Text style={styles.textTituloSeccion}>{`Datos ${props.tipo == "producto" || props.tipo == "servicio" ? "del nuevo" : "de la nueva"} ${props.tipo}`}</Text>
                            <View style={{ gap: 15 }}>
                                {props.tipo == "servicio" && (
                                    <>
                                        <CampoTextoInput
                                            conIcono={true}
                                            nombreIcono={"assistant"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"Manicura clasica"}
                                            conLabel={true}
                                            textLabel={"Nombre"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                            nombreCampo={"nombre"}
                                            valorCampo={valoresCampos.nombre}
                                            onValueChange={onValueChange}
                                            errorValidacion={errores.nombre}
                                            onBlurValidacion={servicioValidacionOnBlur}
                                        />
                                        <CampoTextoInput
                                            tipoCantidad={true}
                                            conIcono={true}
                                            nombreIcono={"currency-eur"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"19.00"}
                                            conLabel={true}
                                            textLabel={"Precio"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                            nombreCampo={"precio"}
                                            valorCampo={valoresCampos.precio}
                                            onValueChange={onValueChange}
                                            errorValidacion={errores.precio}
                                            onBlurValidacion={servicioValidacionOnBlur}
                                        />
                                        <CampoTextoInput
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            conLabel={true}
                                            textLabel={"Tiempo requerido"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            esTiempoRequerido={true}
                                            tiempoRequerido={tiempoContador}
                                            maxTiempo={MAX_TIEMPO}
                                            onIncrementar={incrementarTiempo}
                                            onDecrementar={decrementarTiempo}
                                        />
                                    </>
                                )}
                                {props.tipo == "producto" && (
                                    <>
                                        <CampoTextoInput
                                            conIcono={true}
                                            nombreIcono={"shopping"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"Nombre del producto"}
                                            conLabel={true}
                                            textLabel={"Nombre"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                            nombreCampo={"nombre"}
                                            valorCampo={valoresCampos.nombre}
                                            onValueChange={onValueChange}
                                            errorValidacion={errores.nombre}
                                            onBlurValidacion={productoValidacionOnBlur}
                                        />
                                        <CampoTextoInput
                                            conIcono={false}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"Lima de grano 5 especial para uñas gruesas..."}
                                            conLabel={true}
                                            textLabel={"Descripcion"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                            anchoCompleto={true}
                                            esTextArea={true}
                                            nombreCampo={"descripcion"}
                                            valorCampo={valoresCampos.descripcion}
                                            onValueChange={onValueChange}
                                            errorValidacion={errores.descripcion}
                                            onBlurValidacion={productoValidacionOnBlur}
                                        />
                                        <CampoTextoInput
                                            tipoCantidad={true}
                                            conIcono={true}
                                            nombreIcono={"currency-eur"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"99.99"}
                                            conLabel={true}
                                            textLabel={"Precio"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                            nombreCampo={"precio"}
                                            valorCampo={valoresCampos.precio}
                                            onValueChange={onValueChange}
                                            errorValidacion={errores.precio}
                                            onBlurValidacion={productoValidacionOnBlur}
                                        />
                                        <CampoTextoInput
                                            tipoCantidad={true}
                                            conIcono={true}
                                            nombreIcono={"package-variant"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"999"}
                                            conLabel={true}
                                            textLabel={"Stock"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                            nombreCampo={"stock"}
                                            valorCampo={valoresCampos.stock}
                                            onValueChange={onValueChange}
                                            errorValidacion={errores.stock}
                                            onBlurValidacion={productoValidacionOnBlur}
                                        />
                                    </>
                                )}
                                {props.tipo == "manicurista" && (
                                    <>
                                        <CampoTextoInput
                                            conIcono={true}
                                            nombreIcono={"card-account-details"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"57463456A"}
                                            conLabel={true}
                                            textLabel={"DNI"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                            nombreCampo={"dniNie"}
                                            valorCampo={valoresCampos.dniNie}
                                            onValueChange={onValueChange}
                                            errorValidacion={errores.dniNie}
                                            onBlurValidacion={manicuristaValidacionOnBlur}
                                        />
                                        <CampoTextoInput
                                            conIcono={true}
                                            nombreIcono={"account"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"Nombre"}
                                            conLabel={true}
                                            textLabel={"Nombre"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                            nombreCampo={"nombre"}
                                            valorCampo={valoresCampos.nombre}
                                            onValueChange={onValueChange}
                                            errorValidacion={errores.nombre}
                                            onBlurValidacion={manicuristaValidacionOnBlur}
                                        />
                                        <CampoTextoInput
                                            conIcono={true}
                                            nombreIcono={"account"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"Apellidos"}
                                            conLabel={true}
                                            textLabel={"Apellidos"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                            nombreCampo={"apellidos"}
                                            valorCampo={valoresCampos.apellidos}
                                            onValueChange={onValueChange}
                                            errorValidacion={errores.apellidos}
                                            onBlurValidacion={manicuristaValidacionOnBlur}
                                        />
                                        <CampoTextoInput
                                            conIcono={true}
                                            nombreIcono={"phone"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"Telefono"}
                                            conLabel={true}
                                            textLabel={"Telefono"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                            nombreCampo={"telefono"}
                                            valorCampo={valoresCampos.telefono}
                                            onValueChange={onValueChange}
                                            errorValidacion={errores.telefono}
                                            onBlurValidacion={manicuristaValidacionOnBlur}
                                        />
                                        <CampoTextoInput
                                            conIcono={true}
                                            nombreIcono={"email"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"Email"}
                                            conLabel={true}
                                            textLabel={"Email"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                            nombreCampo={"email"}
                                            valorCampo={valoresCampos.email}
                                            onValueChange={onValueChange}
                                            errorValidacion={errores.email}
                                            onBlurValidacion={manicuristaValidacionOnBlur}
                                        />
                                        <CampoTextoInput
                                            conIcono={true}
                                            nombreIcono={"lock"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"Contraseña"}
                                            conLabel={true}
                                            textLabel={"Contraseña"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={true}
                                            nombreCampo={"contrasena"}
                                            valorCampo={valoresCampos.contrasena}
                                            onValueChange={onValueChange}
                                            errorValidacion={errores.contrasena}
                                            onBlurValidacion={manicuristaValidacionOnBlur}
                                        />
                                        <CampoTextoInput
                                            conIcono={true}
                                            nombreIcono={"lock-check"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"Confirmar contraseña"}
                                            conLabel={true}
                                            textLabel={"Confirmar contraseña"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={true}
                                            nombreCampo={"confirmarContrasena"}
                                            valorCampo={valoresCampos.confirmarContrasena}
                                            onValueChange={onValueChange}
                                            errorValidacion={errores.confirmarContrasena}
                                            verificarContrasena={valoresCampos.contrasena}
                                            onBlurValidacion={manicuristaValidacionOnBlur}
                                        />
                                    </>
                                )}
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", gap: 10, marginTop: 10 }}>
                                <BotonTexto
                                    botonNavegacion={true}
                                    esLink={false}
                                    fondo={true}
                                    fuenteTexto={fuenteTexto.gantariBold}
                                    textoBoton={`Agregar ${props.tipo}`}
                                    onPress={() => {
                                        switch (props.tipo) {
                                            case "servicio":
                                                onSubmitServicio()
                                                //console.log("onsubmit servicio")
                                                break;
                                            case "producto":
                                                onSubmitProducto()
                                                //console.log("onsubmit producto")
                                                break;
                                            case "manicurista":
                                                onSubmitManicurista()
                                                //console.log("onsubmit manicurista")
                                                break;
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Screen>
    );
}