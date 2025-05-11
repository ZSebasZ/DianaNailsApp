import { View, Text, StatusBar, Image, useColorScheme, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { gestionStyles } from '../styles/gestionStyles';
import { Icono } from '../components/Icono';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { fechaHoraStyles } from "../styles/fechaHoraStyles";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';


//Pantalla de Login
export const ActividadClienteScreen = () => {

    const insets = useSafeAreaInsets();

    //Estilos
    const styles = useThemedStyles(gestionStyles);
    const colors = useThemedStyles();
    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../assets/images/logoDark.png')
        : require('./../assets/images/logoLight.png');

    return (
        <View style={[styles.mainContainer, { flex: 1 }]}>
            <Stack.Screen
                            options={{
                                headerShown: false
                            }}
                        />
            <View>
                <Text style={styles.textTitle}>Mi actividad</Text>
                <Text style={[styles.textInfo]}>Desde aqui puede ver tus citas, opinar, ver opiniones y ver tus pedidos</Text>
                <View style={[styles.containerSeccion]}>
                    <Link href={"/(clienteScreens)/(citasOpiniones)/citasCliente"} asChild>
                        <Pressable style={styles.botonGestion}>
                            <Icono IconComponent={MaterialCommunityIcons} name="calendar-month" onPrimary={false} style={styles.iconoGestion} />
                            <Text style={styles.textoBotonGestion}>Mis citas</Text>
                        </Pressable>
                    </Link>
                    <Link href={"/(gestionAdmin)/(tabs-productos)/productos"} asChild>
                        <Pressable style={styles.botonGestion}>
                            <Icono IconComponent={MaterialCommunityIcons} name="truck-delivery" onPrimary={false} style={styles.iconoGestion} />
                            <Text style={styles.textoBotonGestion}>Mis pedidos</Text>
                        </Pressable>
                    </Link>
                    <Link href={"/(gestionAdmin)/(tabs-manicuristas)/manicuristas"} asChild>
                        <Pressable style={styles.botonGestion}>
                            <Icono IconComponent={MaterialCommunityIcons} name="message-star" onPrimary={false} style={styles.iconoGestion} />
                            <Text style={styles.textoBotonGestion}>Opinar/Opiniones</Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </View>
    );
}