import { View, Text, useColorScheme, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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


//Pantalla de Login
export const GestionAgregarScreen = (props) => {

    const insets = useSafeAreaInsets();

    //Estilos
    const styles = useThemedStyles(perfilStyles);
    const colors = useThemedStyles();

    const fuenteTexto = fuenteTextoStyles();

    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../assets/images/logoDark.png')
        : require('./../assets/images/logoLight.png');
    const perfilImgDefault = require("./../assets/images/perfilDefault.png");

    const [imageUri, setImageUri] = useState(null);

    const pedirPermisos = async () => {
        const permisoCamara = await ImagePicker.requestCameraPermissionsAsync();
        const permisoGaleria = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permisoCamara.granted || !permisoGaleria.granted) {
            Alert.alert('Permisos requeridos', 'Necesitas otorgar permisos para usar la cámara y la galería.');
            return false;
        }
        return true;
    };

    const tomarFoto = async () => {
        const permiso = await pedirPermisos();
        if (!permiso) return;

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const seleccionarDeGaleria = async () => {
        const permiso = await pedirPermisos();
        if (!permiso) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <Screen enTab={true}>
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
                                            placeHolder={"Nombre del servicio"}
                                            conLabel={true}
                                            textLabel={"Nombre"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                        />
                                        <CampoTextoInput
                                            conIcono={true}
                                            nombreIcono={"currency-eur"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"Precio del servicio"}
                                            conLabel={true}
                                            textLabel={"Precio"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                        />
                                        <CampoTextoInput
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            conLabel={true}
                                            textLabel={"Tiempo requerido"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            esTiempoRequerido={true}
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
                                        />
                                        <CampoTextoInput
                                            conIcono={true}
                                            nombreIcono={"currency-eur"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"Precio del producto"}
                                            conLabel={true}
                                            textLabel={"Precio"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
                                        />
                                        <CampoTextoInput
                                            conIcono={true}
                                            nombreIcono={"package-variant"}
                                            fuenteTexto={fuenteTexto.gantariRegular}
                                            placeHolder={"Stock del producto"}
                                            conLabel={true}
                                            textLabel={"Stock"}
                                            labelCentrado={true}
                                            fuenteTextoLabel={fuenteTexto.gantariBold}
                                            contrasena={false}
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
                                            contrasena={false}
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
                                            contrasena={false}
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
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Screen>
    );
}