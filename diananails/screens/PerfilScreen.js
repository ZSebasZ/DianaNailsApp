import { View, Text, StatusBar, Image, useColorScheme, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { perfilStyles } from '../styles/perfilStyles';
import { Icono } from '../components/Icono';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from "react";
import { fechaHoraStyles } from "../styles/fechaHoraStyles";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';


//Pantalla de Login
export const PerfilScreen = () => {

    const insets = useSafeAreaInsets();

    //Estilos
    const styles = useThemedStyles(perfilStyles);
    const colors = useThemedStyles();
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
            aspect: [1,1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <Stack.Screen
                options={{
                    headerBackVisible: true,
                    headerTintColor: colors.onPrimary,
                    headerRight: () => (
                        <></>
                    )
                }}
            />
            <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
                <View>
                    <Text style={styles.textTitle}>Mi perfil</Text>
                    <Text style={[styles.textInfo, { paddingHorizontal: 5 }]}>Mira y/o actualiza tus datos personales</Text>
                    <View style={[styles.containerSeccion, {alignItems: "center"}]}>
                        <Text style={styles.textTitloSeccion}>Foto de perfil</Text>
                        <View style={styles.recuadroImagen}>
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} style={styles.imagen} />
                            ) : (
                                <Image source={perfilImgDefault} style={[styles.imagen, {opacity: 0.7}]} />
                            )}
                        </View>

                        <View style={styles.botonesFoto}>
                            <Pressable onPress={tomarFoto} style={styles.botonFoto}>
                                <Text style={styles.textoBotonFoto}>Tomar foto</Text>
                            </Pressable>
                            <Pressable onPress={seleccionarDeGaleria} style={styles.botonFoto}>
                                <Text style={styles.textoBotonFoto}>Seleccionar desde mi galeria</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.containerSeccion}>
                        <Text style={styles.textTitloSeccion}>Datos personales</Text>
                        <View style={styles.containerField}>
                            <Text style={styles.textTitleInput}>Nombre</Text>
                            <View style={styles.containerInput}>
                                <Icono IconComponent={MaterialCommunityIcons} name="account" onPrimary={false} style={styles.iconInput} />
                                <TextInput style={styles.textInput} placeholder="Nombre" placeholderTextColor={colors.secondary} />
                            </View>
                        </View>
                        <View style={styles.containerField}>
                            <Text style={styles.textTitleInput}>Apellidos</Text>
                            <View style={styles.containerInput}>
                                <Icono IconComponent={MaterialCommunityIcons} name="account" onPrimary={false} style={styles.iconInput} />
                                <TextInput style={styles.textInput} placeholder="Apellidos" placeholderTextColor={colors.secondary} secureTextEntry />
                            </View>
                        </View>
                        <View style={styles.containerField}>
                            <Text style={styles.textTitleInput}>Telefono</Text>
                            <View style={styles.containerInput}>
                                <Icono IconComponent={MaterialCommunityIcons} name="phone" onPrimary={false} style={styles.iconInput} />
                                <TextInput style={styles.textInput} placeholder="Telefono" placeholderTextColor={colors.secondary} />
                            </View>
                        </View>
                        <View style={styles.containerField}>
                            <Text style={styles.textTitleInput}>Direccion de envio</Text>
                            <View style={styles.containerInput}>
                                <Icono IconComponent={MaterialCommunityIcons} name="map-marker" onPrimary={false} style={styles.iconInput} />
                                <TextInput style={styles.textInput} placeholder="Direccion de envio" placeholderTextColor={colors.secondary} />
                            </View>
                        </View>
                        <View style={styles.containerField}>
                            <Text style={styles.textTitleInput}>Email</Text>
                            <View style={styles.containerInput}>
                                <Icono IconComponent={MaterialCommunityIcons} name="email" onPrimary={false} style={styles.iconInput} />
                                <TextInput style={styles.textInput} placeholder="Email" placeholderTextColor={colors.secondary} />
                            </View>
                        </View>
                        <View style={[styles.containerField, { alignItems: "center" }]}>
                            <Pressable style={[styles.boton, styles.botonGuardarCambios]}>
                                <Text style={[styles.textBoton, styles.textBotonGuardarCambios]}>Guardar cambios</Text>
                            </Pressable>
                            <Pressable style={[styles.boton, styles.botonEliminarCuenta]}>
                                <Text style={[styles.textBoton, styles.textBotonEliminarCuenta]}>Eliminar cuenta</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}