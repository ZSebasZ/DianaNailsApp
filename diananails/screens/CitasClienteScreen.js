import { View, Text, StatusBar, Image, useColorScheme, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { citasClienteStyles } from '../styles/citasClienteStyles';
import { Icono } from '../components/Icono';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { fechaHoraStyles } from "../styles/fechaHoraStyles";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { LogoTopBar } from "../components/LogoTopBar";


//Pantalla de Login
export const CitasClienteScreen = () => {

    const insets = useSafeAreaInsets();

    //Estilos
    const styles = useThemedStyles(citasClienteStyles);
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
                    statusBarStyle: "auto",
                    animation: 'none',
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.primary },
                    headerBackVisible: true,
                    headerTintColor: colors.onPrimary,
                    headerShadowVisible: false,
                    headerTintColor: "black",
                    headerTitle: "",
                    headerLeft: () => (
                        <LogoTopBar />
                    ),
                    headerRight: () => (
                        <Link href={"/(perfil)/"} asChild>
                            <Pressable>
                                <Icono
                                    IconComponent={MaterialCommunityIcons}
                                    name="account-circle"
                                    style={styles.iconTabBar}
                                ></Icono>
                            </Pressable>
                        </Link>
                    )
                }}
            />
            <View style={{ flex: 1 }}>

                <Text style={styles.textTitle}>Mis citas</Text>
                <Text style={[styles.textInfo, { paddingHorizontal: 5 }]}>Aqui se muestran las próximas citas que tienes agendadas</Text>
                <Text style={[styles.textInfo, { paddingHorizontal: 5 }]}>Para cancelar una cita, solo haga click sobre ella</Text>
                <ScrollView style={{ paddingHorizontal: 20 }}>
                    <Pressable style={styles.containerCita}>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Servicios</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Fecha y hora</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Fecha: </Text>
                                <Text style={styles.textInfoCita}>10/10/2025</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Hora: </Text>
                                <Text style={styles.textInfoCita}>09:45 a 10:30</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Manicurista</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Sara Ramirez</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Metodo de pago</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Efectivo</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={styles.containerCita}>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Servicios</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Fecha y hora</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Fecha: </Text>
                                <Text style={styles.textInfoCita}>10/10/2025</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Hora: </Text>
                                <Text style={styles.textInfoCita}>09:45 a 10:30</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Manicurista</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Sara Ramirez</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Metodo de pago</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Efectivo</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={styles.containerCita}>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Servicios</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Fecha y hora</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Fecha: </Text>
                                <Text style={styles.textInfoCita}>10/10/2025</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Hora: </Text>
                                <Text style={styles.textInfoCita}>09:45 a 10:30</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Manicurista</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Sara Ramirez</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Metodo de pago</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Efectivo</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={styles.containerCita}>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Servicios</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Fecha y hora</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Fecha: </Text>
                                <Text style={styles.textInfoCita}>10/10/2025</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Hora: </Text>
                                <Text style={styles.textInfoCita}>09:45 a 10:30</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Manicurista</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Sara Ramirez</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Metodo de pago</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Efectivo</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={styles.containerCita}>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Servicios</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Fecha y hora</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Fecha: </Text>
                                <Text style={styles.textInfoCita}>10/10/2025</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Hora: </Text>
                                <Text style={styles.textInfoCita}>09:45 a 10:30</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Manicurista</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Sara Ramirez</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Metodo de pago</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Efectivo</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={styles.containerCita}>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Servicios</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Fecha y hora</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Fecha: </Text>
                                <Text style={styles.textInfoCita}>10/10/2025</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Hora: </Text>
                                <Text style={styles.textInfoCita}>09:45 a 10:30</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Manicurista</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Sara Ramirez</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Metodo de pago</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Efectivo</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={styles.containerCita}>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Servicios</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Fecha y hora</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Fecha: </Text>
                                <Text style={styles.textInfoCita}>10/10/2025</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Hora: </Text>
                                <Text style={styles.textInfoCita}>09:45 a 10:30</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Manicurista</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Sara Ramirez</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Metodo de pago</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Efectivo</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={styles.containerCita}>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Servicios</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                                <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Fecha y hora</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Fecha: </Text>
                                <Text style={styles.textInfoCita}>10/10/2025</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textSubTitleInfoCita}>Hora: </Text>
                                <Text style={styles.textInfoCita}>09:45 a 10:30</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Manicurista</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Sara Ramirez</Text>
                            </View>
                        </View>
                        <View style={styles.containerSeccionCita}>
                            <Text style={styles.textTitleSeccionCita}>Metodo de pago</Text>
                            <View>
                                <Text style={styles.textInfoCita}>Efectivo</Text>
                            </View>
                        </View>
                    </Pressable>
                </ScrollView>
            </View>
        </View>
    );
}