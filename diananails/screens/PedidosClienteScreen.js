import { View, Text, StatusBar, Image, useColorScheme, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { pedidosClienteStyles } from '../styles/pedidosClienteStyles';
import { Icono } from '../components/Icono';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { fechaHoraStyles } from "../styles/fechaHoraStyles";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';


//Pantalla de Login
export const PedidosClienteScreen = () => {

    const insets = useSafeAreaInsets();

    //Estilos
    const styles = useThemedStyles(pedidosClienteStyles);
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

                <Text style={styles.textTitle}>Mis pedidos</Text>
                <Text style={[styles.textInfo, { paddingHorizontal: 5 }]}>Aqui se muestran todos tus pedidos</Text>
                <View style={styles.filtroPedidos}>
                    <Pressable style={styles.botonFiltroSelec}>
                        <Text style={styles.textBotonFiltroSelec}>Pendientes</Text>
                    </Pressable>
                    <Pressable style={styles.botonFiltro}>
                        <Text style={styles.textBotonFiltro}>Enviados</Text>
                    </Pressable>
                    <Pressable style={styles.botonFiltro}>
                        <Text style={styles.textBotonFiltro}>Recibidos</Text>
                    </Pressable>
                </View>
                <ScrollView style={{ paddingHorizontal: 20 }}>
                    <Pressable style={styles.containerPedido}>
                        <View style={styles.containerSeccionPedido}>
                            <Text style={styles.textTitleSeccionPedido}>Productos</Text>
                            <View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textSubTitleInfoPedido}>Producto: </Text>
                                    <Text style={styles.textInfoPedido}>Lima de grano 5</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textSubTitleInfoPedido}>Cantidad: </Text>
                                    <Text style={styles.textInfoPedido}>3</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textSubTitleInfoPedido}>Precio: </Text>
                                    <Text style={styles.textInfoPedido}>19.11 $</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textSubTitleInfoPedido}>Subtotal: </Text>
                                    <Text style={styles.textInfoPedido}>45.99 $</Text>
                                </View>
                            </View>
                            <View style={styles.lineaDivisora}></View>
                            <View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textSubTitleInfoPedido}>Producto: </Text>
                                    <Text style={styles.textInfoPedido}>Lima de grano 5</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textSubTitleInfoPedido}>Cantidad: </Text>
                                    <Text style={styles.textInfoPedido}>3</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textSubTitleInfoPedido}>Precio: </Text>
                                    <Text style={styles.textInfoPedido}>19.11 $</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textSubTitleInfoPedido}>Subtotal: </Text>
                                    <Text style={styles.textInfoPedido}>45.99 $</Text>
                                </View>
                            </View>
                            <View style={styles.lineaDivisora}></View>
                            <View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textSubTitleInfoPedido}>Producto: </Text>
                                    <Text style={styles.textInfoPedido}>Lima de grano 5</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textSubTitleInfoPedido}>Cantidad: </Text>
                                    <Text style={styles.textInfoPedido}>3</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textSubTitleInfoPedido}>Precio: </Text>
                                    <Text style={styles.textInfoPedido}>19.11 $</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textSubTitleInfoPedido}>Subtotal: </Text>
                                    <Text style={styles.textInfoPedido}>45.99 $</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.containerSeccionPedido}>
                            <Text style={styles.textTitleSeccionPedido}>Fecha del pedido</Text>
                            <View>
                                <Text style={styles.textInfoPedido}>10/10/2025</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionPedido}>
                            <Text style={styles.textTitleSeccionPedido}>Fecha de entrega estimada</Text>
                            <View>
                                <Text style={styles.textInfoPedido}>10/10/2025</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionPedido}>
                            <Text style={styles.textTitleSeccionPedido}>Estado del pedido</Text>
                            <View>
                                <Text style={styles.textInfoPedido}>Pendiente</Text>
                            </View>
                        </View>
                        <View style={[styles.containerSeccionPedido, {marginBottom: 0}]}>
                            <Text style={styles.textTitleSeccionPedido}>Total</Text>
                            <View>
                                <Text style={styles.textInfoPedido}>87.99 $</Text>
                            </View>
                        </View>
                    </Pressable>
                </ScrollView>
            </View>
        </View>
    );
}