import { View, Text, StatusBar, Image, useColorScheme, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { carritoClienteStyles } from '../styles/carritoClienteStyles';
import { Icono } from '../components/Icono';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { fechaHoraStyles } from "../styles/fechaHoraStyles";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';


//Pantalla de Login
export const CarritoClienteScreen = () => {

    const insets = useSafeAreaInsets();

    const manicurista = require("./../assets/images/manicurista.jpg")

    //Estilos
    const styles = useThemedStyles(carritoClienteStyles);
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
            <View style={{ flex: 1 }}>

                <Text style={styles.textTitle}>Mi carrito</Text>
                <Text style={[styles.textInfo, { paddingHorizontal: 5 }]}>Productos</Text>
                <ScrollView style={{ paddingHorizontal: 20 }}>
                    <Pressable style={styles.containerProducto}>
                        <View>
                            <Image source={manicurista} style={styles.productoImg}></Image>
                            <View>
                                <View style={styles.containerSeccionInfoProducto}>
                                    <Text style={styles.textSubTitleInfoProducto}>Producto: </Text>
                                    <Text style={styles.textInfoProducto}>Lima de grano 5</Text>
                                </View>
                                <View style={styles.containerSeccionInfoProducto}>
                                    <Text style={styles.textSubTitleInfoProducto}>Precio: </Text>
                                    <Text style={styles.textInfoProducto}>19.00 $</Text>
                                </View>
                                <View style={[styles.containerSeccionInfoProducto, {justifyContent: "center"}]}>
                                    <View>
                                        <Text style={styles.textTitleInfoProducto}>Cantidad</Text>
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
                                </View>
                                <View style={styles.containerSeccionInfoProducto}>
                                    <Text style={styles.textSubTitleInfoProducto}>Subtotal: </Text>
                                    <Text style={styles.textInfoProducto}>40.00 $</Text>
                                </View>
                                <View style={[styles.containerSeccionInfoProducto, {justifyContent: "center"}]}>
                                    <Pressable style={styles.botonEliminarProducto}>
                                        <Text style={styles.textBotonEliminarProducto}>Eliminar del carrito</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={styles.containerProducto}>
                        <View>
                            <Image source={manicurista} style={styles.productoImg}></Image>
                            <View>
                                <View style={styles.containerSeccionInfoProducto}>
                                    <Text style={styles.textSubTitleInfoProducto}>Producto: </Text>
                                    <Text style={styles.textInfoProducto}>Lima de grano 5</Text>
                                </View>
                                <View style={styles.containerSeccionInfoProducto}>
                                    <Text style={styles.textSubTitleInfoProducto}>Precio: </Text>
                                    <Text style={styles.textInfoProducto}>19.00 $</Text>
                                </View>
                                <View style={[styles.containerSeccionInfoProducto, {justifyContent: "center"}]}>
                                    <View>
                                        <Text style={styles.textTitleInfoProducto}>Cantidad</Text>
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
                                </View>
                                <View style={styles.containerSeccionInfoProducto}>
                                    <Text style={styles.textSubTitleInfoProducto}>Subtotal: </Text>
                                    <Text style={styles.textInfoProducto}>40.00 $</Text>
                                </View>
                                <View style={[styles.containerSeccionInfoProducto, {justifyContent: "center"}]}>
                                    <Pressable style={styles.botonEliminarProducto}>
                                        <Text style={styles.textBotonEliminarProducto}>Eliminar del carrito</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={styles.containerProducto}>
                        <View>
                            <Image source={manicurista} style={styles.productoImg}></Image>
                            <View>
                                <View style={styles.containerSeccionInfoProducto}>
                                    <Text style={styles.textSubTitleInfoProducto}>Producto: </Text>
                                    <Text style={styles.textInfoProducto}>Lima de grano 5</Text>
                                </View>
                                <View style={styles.containerSeccionInfoProducto}>
                                    <Text style={styles.textSubTitleInfoProducto}>Precio: </Text>
                                    <Text style={styles.textInfoProducto}>19.00 $</Text>
                                </View>
                                <View style={[styles.containerSeccionInfoProducto, {justifyContent: "center"}]}>
                                    <View>
                                        <Text style={styles.textTitleInfoProducto}>Cantidad</Text>
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
                                </View>
                                <View style={styles.containerSeccionInfoProducto}>
                                    <Text style={styles.textSubTitleInfoProducto}>Subtotal: </Text>
                                    <Text style={styles.textInfoProducto}>40.00 $</Text>
                                </View>
                                <View style={[styles.containerSeccionInfoProducto, {justifyContent: "center"}]}>
                                    <Pressable style={styles.botonEliminarProducto}>
                                        <Text style={styles.textBotonEliminarProducto}>Eliminar del carrito</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                </ScrollView>
                <View style={styles.resumeBar}>
                    <View style={[styles.resumenBarContainers, styles.resumenBarContainerCenter]}>
                        <Text style={styles.resumenBarContainerCenterTextTitle}>Total</Text>
                        <Text style={styles.resumenBarContainerCenterTextPrecio}>00.00 $</Text>
                    </View>
                    <View style={[styles.resumenBarContainers, styles.resumenBarContainerRight]}>
                        <Pressable style={styles.resumenBarContainerRightBoton} >
                            <Text style={styles.resumenBarContainerRightBotonText}>Hacer pedido</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}