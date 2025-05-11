import { View, Text, StatusBar, Image, useColorScheme, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { productoStyles } from '../styles/productoStyles';
import { Icono } from '../components/Icono';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { fechaHoraStyles } from "../styles/fechaHoraStyles";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';


//Pantalla de Login
export const ProductoScreen = (props) => {

    const insets = useSafeAreaInsets();

    const manicurista = require("./../assets/images/manicurista.jpg")
    //Estilos
    const styles = useThemedStyles(productoStyles);
    const colors = useThemedStyles();
    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../assets/images/logoDark.png')
        : require('./../assets/images/logoLight.png');

    return (
        <View style={styles.mainContainer}>
            <Stack.Screen
                options={{
                    headerBackVisible: true,
                    headerTintColor: colors.onPrimary
                }}
            />
            <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
                <View style={[styles.containerSeccion]}>
                    <Text style={styles.textTitle}>{props.idProducto}</Text>
                    <View style={{ alignItems: "center" }}>
                        <Image source={manicurista} style={styles.productoImg}></Image>
                    </View>
                    <View style={styles.lineaDivisora}></View>
                    <View>
                        <View style={styles.containerSeccionInfo}>
                            <Text style={styles.textTitleInfoProducto}>Descripcion</Text>
                            <Text style={styles.textInfoProducto}>Hklklfj sd fd sflsd lkjsdlk fj djfks d fsda flsjd fds sd kjhg kd fkjsd kfjsdfkjhds kjhfdskj hfksjd fjksd jk jk sdjkfsdkjfsd jkfjk sdjk hfjksd hfjk sdjksdf jksdfjk hsdkj fhsdkj hfsdjk fkjsd fkjds</Text>
                        </View>
                        <View style={styles.containerSeccionInfo}>
                            <Text style={styles.textTitleInfoProducto}>Precio</Text>
                            <Text style={styles.textInfoProducto}>12.99 $</Text>
                        </View>
                        <View style={styles.containerSeccionInfo}>
                            <Text style={[styles.textTitleInfoProducto, { textAlign: "center" }]}>Cantidad</Text>
                            <View style={styles.containerCantidadProducto}>
                                <Pressable style={styles.botonCantidadProducto}>
                                    <Icono IconComponent={MaterialCommunityIcons} name="minus" onPrimary={false} style={styles.iconoCantidadProducto} />
                                </Pressable>
                                <Text style={styles.textInfoProducto}>1</Text>
                                <Pressable style={styles.botonCantidadProducto}>
                                    <Icono IconComponent={MaterialCommunityIcons} name="plus" onPrimary={false} style={styles.iconoCantidadProducto} />
                                </Pressable>
                            </View>
                        </View>
                        <View style={[styles.containerSeccionInfo,{ alignItems: "center" }]}>
                            <Pressable style={styles.botonAnadir}>
                                <Text style={styles.textBotonAnadir}>Añadir</Text>
                            </Pressable>
                        </View>
                        {/** 
                         <View style={[styles.containerSeccionInfo,{ alignItems: "center" }]}>
                            <Pressable style={styles.botonEnCarrito}>
                                <Text style={styles.textBotonEnCarrito}>Este producto ya está en tu carrito</Text>
                            </Pressable>
                        </View>
                        */}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.resumeBar}>
                <View style={[styles.resumenBarContainers, styles.resumenBarContainerLeft]}>
                    <Pressable style={styles.resumenBarContainerLeftBoton}>
                        <Icono IconComponent={MaterialCommunityIcons} name="truck-delivery" onPrimary={false} style={styles.resumenBarContainerLeftIcon} />
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", top: -2, right: -2, width: 15, height: 15, backgroundColor: "red", borderRadius: 100 }}>
                            <Text style={{ color: "white", fontSize: 10 }}>3</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={[styles.resumenBarContainers, styles.resumenBarContainerCenter]}>
                    <Text style={styles.resumenBarContainerCenterTextTitle}>Subtotal</Text>
                    <Text style={styles.resumenBarContainerCenterTextPrecio}>00.00 $</Text>
                </View>
                <View style={[styles.resumenBarContainers, styles.resumenBarContainerRight]}>
                    <Pressable style={styles.resumenBarContainerLeftBoton}>
                        <Icono IconComponent={MaterialCommunityIcons} name="cart" onPrimary={false} style={styles.resumenBarContainerLeftIcon} />
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", top: -2, right: -2, width: 15, height: 15, backgroundColor: "red", borderRadius: 100 }}>
                            <Text style={{ color: "white", fontSize: 10 }}>3</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}