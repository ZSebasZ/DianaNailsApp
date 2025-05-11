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
import { fechaHoraStyles } from "../styles/fechaHoraStyles";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { BotonesCancelarVerServicios } from "../components/BotonesCancelarVerServicios";
import { BarraResumen } from "../components/BarraResumen";


//Pantalla de Login
export const FechaHoraCitaScreen = () => {

    const insets = useSafeAreaInsets();

    const [open, setOpen] = useState(false); // Estado para abrir/cerrar el dropdown
    const [value, setValue] = useState(null); // Estado para el valor seleccionado
    const [items, setItems] = useState([
        { label: 'Java', value: 'java' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'Python', value: 'python' },
        { label: 'C#', value: 'csharp' },
        { label: 'Ruby', value: 'ruby' },
    ]);


    const fuenteTexto = fuenteTextoStyles();
    //Estilos
    const styles = useThemedStyles(fechaHoraStyles);
    const colors = useThemedStyles();
    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../assets/images/logoDark.png')
        : require('./../assets/images/logoLight.png');

    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <View>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Fecha"}
                        textInfo1={"Selecciona la fecha de la cita"}
                    />
                    <View style={styles.contenedorCalendarioPicker}>
                        <Calendar/>
                    </View>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Hora"}
                        textInfo1={"Selecciona la hora de la cita"}
                    />
                    <View style={styles.containerPicker}>
                        <DropDownPicker
                            placeholder="Seleccion una hora..."
                            dropDownDirection="TOP"
                            open={open} // Estado de apertura/cierre
                            value={value} // Valor seleccionado
                            items={items} // Lista de opciones
                            setOpen={setOpen} // Función para cambiar el estado de apertura
                            setValue={setValue} // Función para establecer el valor seleccionado
                            setItems={setItems} // Función para actualizar los ítems (opcional)
                            style={styles.dropdown} // Estilo del dropdown
                            textStyle={styles.dropdownItemLabelText}
                            listItemLabelStyle={styles.dropdownItemLabelText} // Estilo de cada ítem
                            dropDownContainerStyle={styles.dropdownList} // Estilo del desplegable
                            arrowIconStyle={styles.dropdownIcon} // Estilo de la flecha
                            tickIconStyle={styles.dropdownIcon}
                            showTickIcon={false}
                            defaultValue={value} // Valor predeterminado
                            selectedItemContainerStyle={styles.dropdownItemSelec}
                            selectedItemLabelStyle={styles.dropdownLabelSelec}

                        />
                    </View>
                </View>
            </View>
            <BotonesCancelarVerServicios />
            <BarraResumen
                botonVolver={true}
                hrefAtras={"../"}
                botonSiguiente={true}
                hrefSiguiente={"./elegirManicuristaMetodoPago"}
            />
        </Screen>
    );
}