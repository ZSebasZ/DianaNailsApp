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
export const PerfilScreen = () => {

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
                        tituloSeccion={"Mi perfil"}
                        textInfo1={"Mira y/o actualiza tus datos personales"}
                    />
                    <View style={{ gap: 20 }}>
                        <View style={{ gap: 10 }}>
                            <Text style={styles.textTituloSeccion}>Foto de perfil</Text>
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
                                <BotonIconoTexto
                                    esLink={false}
                                    nombreIcono={"image-remove"}
                                    fondo={false}
                                    fuenteTextoNormal={fuenteTexto.gantariBold}
                                    textoBoton={"Eliminar foto"}
                                    enTab={true}
                                    onPress={() => { }}
                                    tipoError={true}
                                />
                                <BotonIconoTexto
                                    esLink={false}
                                    nombreIcono={"content-save"}
                                    fondo={true}
                                    fuenteTextoNormal={fuenteTexto.gantariBold}
                                    textoBoton={"Guardar foto"}
                                    enTab={true}
                                    onPress={() => { }}
                                />
                            </View>
                        </View>
                        <View style={{ gap: 10, marginBottom: 15 }}>
                            <Text style={styles.textTituloSeccion}>Datos personales</Text>
                            <View style={{gap: 15}}>
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
                                    nombreIcono={"map-marker"}
                                    fuenteTexto={fuenteTexto.gantariRegular}
                                    placeHolder={"Direccion de envio"}
                                    conLabel={true}
                                    textLabel={"Direccion de envio"}
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
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", gap: 10, marginTop: 10 }}>
                                <BotonTexto
                                    botonNavegacion={true}
                                    esLink={false}
                                    fondo={true}
                                    fuenteTexto={fuenteTexto.gantariBold}
                                    textoBoton={"Guardar cambios"}
                                />
                                <BotonTexto
                                    botonNavegacion={true}
                                    esLink={false}
                                    fondo={true}
                                    tipoError={true}
                                    fuenteTexto={fuenteTexto.gantariBold}
                                    textoBoton={"Eliminar cuenta"}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Screen>
    );
}