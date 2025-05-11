import { View, Text, StatusBar, Image, useColorScheme, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { agendarCitaStyles } from '../styles/agendarCitaStyles';
import { Icono } from '../components/Icono';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { tiendaStyles } from "../styles/tiendaStyles";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';




//Pantalla de Login
export const TiendaScreen = () => {

    const insets = useSafeAreaInsets();

    const [open, setOpen] = useState(false); // Estado para abrir/cerrar el dropdown
    const [value, setValue] = useState(null); // Estado para el valor seleccionado
    const [items, setItems] = useState([
        { label: 'Efectivo (pagar en el local)', value: 'efectivo' },
        { label: 'Tarjeta', value: 'tarjeta' }
    ]);

    const manicurista = require("./../assets/images/manicurista.jpg")


    //Estilos
    const styles = useThemedStyles(tiendaStyles);
    const colors = useThemedStyles();
    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../assets/images/logoDark.png')
        : require('./../assets/images/logoLight.png');

    return (
        <View style={styles.mainContainer}>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: "" }} nestedScrollEnabled={true}>
                    <View>
                        <Text style={styles.textTitle}>Tienda</Text>
                        <Text style={styles.textInfo}>Bienvenid@ a nuestra tienda, aqui encontraras productos sobre manicura y pedicura</Text>
                    </View>
                    <View style={styles.containerProductos}>
                        <Link href={`/tienda/${"limagrano5"}`} asChild>
                            <Pressable style={styles.containerProducto}>
                                <Image source={manicurista} style={styles.productoImg}></Image>
                                <View style={styles.containerInfoProducto}>
                                    <Text style={styles.textTitleProducto}>Lima grano 5</Text>
                                    <Text style={styles.textPrecioProducto}>12.99 $</Text>

                                    <View style={styles.containerBotonAnadirProducto}>
                                        <Pressable style={styles.botonAnadirProducto}>
                                            <Text style={styles.textBotonAnadirProducto}>Añadir</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Pressable>
                        </Link>
                        <Pressable style={styles.containerProducto}>
                            <Image source={manicurista} style={styles.productoImg}></Image>
                            <View style={styles.containerInfoProducto}>
                                <Text style={styles.textTitleProducto}>Lima grano 5</Text>
                                <Text style={styles.textPrecioProducto}>12.99 $</Text>

                                <View style={styles.containerBotonAnadirProducto}>
                                    <Pressable style={styles.botonAnadirProducto}>
                                        <Text style={styles.textBotonAnadirProducto}>Añadir</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Pressable>
                        <Pressable style={styles.containerProducto}>
                            <Image source={manicurista} style={styles.productoImg}></Image>
                            <View style={styles.containerInfoProducto}>
                                <Text style={styles.textTitleProducto}>Lima grano 5</Text>
                                <Text style={styles.textPrecioProducto}>12.99 $</Text>

                                <View style={styles.containerBotonAnadirProducto}>
                                    <Pressable style={[styles.botonAnadirProducto, styles.botonEnCarrito]}>
                                        <Text style={styles.textBotonAnadirProducto}>Este producto ya está en tu carrito</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Pressable>
                        <Pressable style={styles.containerProducto}>
                            <Image source={manicurista} style={styles.productoImg}></Image>
                            <View style={styles.containerInfoProducto}>
                                <Text style={styles.textTitleProducto}>Lima grano 5</Text>
                                <Text style={styles.textPrecioProducto}>12.99 $</Text>

                                <View style={styles.containerBotonAnadirProducto}>
                                    <Pressable style={styles.botonAnadirProducto}>
                                        <Text style={styles.textBotonAnadirProducto}>Añadir</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Pressable>

                    </View>
                </ScrollView>
            </View>
            <View style={styles.resumeBar}>
                <View style={[styles.resumenBarContainers, styles.resumenBarContainerLeft]}>
                    <Link href={"/tienda/pedidosCliente"} asChild>
                        <Pressable style={styles.resumenBarContainerLeftBoton}>
                            <Icono IconComponent={MaterialCommunityIcons} name="truck-delivery" onPrimary={false} style={styles.resumenBarContainerLeftIcon} />
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", top: -2, right: -2, width: 15, height: 15, backgroundColor: "red", borderRadius: 100 }}>
                                <Text style={{ color: "white", fontSize: 10 }}>3</Text>
                            </View>
                        </Pressable>
                    </Link>
                </View>
                <View style={[styles.resumenBarContainers, styles.resumenBarContainerCenter]}>
                    <Text style={styles.resumenBarContainerCenterTextTitle}>Subtotal</Text>
                    <Text style={styles.resumenBarContainerCenterTextPrecio}>00.00 $</Text>
                </View>
                <View style={[styles.resumenBarContainers, styles.resumenBarContainerRight]}>
                    <Link href={"/tienda/carritoCliente"} asChild>
                        <Pressable style={styles.resumenBarContainerLeftBoton}>
                            <Icono IconComponent={MaterialCommunityIcons} name="cart" onPrimary={false} style={styles.resumenBarContainerLeftIcon} />
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", top: -2, right: -2, width: 15, height: 15, backgroundColor: "red", borderRadius: 100 }}>
                                <Text style={{ color: "white", fontSize: 10 }}>3</Text>
                            </View>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </View>
    );
}