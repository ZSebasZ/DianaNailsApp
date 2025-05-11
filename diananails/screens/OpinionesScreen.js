import { View, Text, StatusBar, Image, useColorScheme, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { opinionesStyles } from '../styles/opinionesStyles';
import { Icono } from '../components/Icono';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { fechaHoraStyles } from "../styles/fechaHoraStyles";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';


//Pantalla de Login
export const OpinionesScreen = () => {

    const insets = useSafeAreaInsets();

    //Estilos
    const styles = useThemedStyles(opinionesStyles);
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
                    <Text style={styles.textTitle}>Opina</Text>
                    <Text style={[styles.textInfo, { paddingHorizontal: 5 }]}>Danos tu opinión</Text>
                    <View>
                        <View style={styles.containerField}>
                            <Text style={styles.textTitleInput}>Titulo</Text>
                            <View style={styles.containerInput}>
                                <TextInput style={styles.textInput} placeholder="Excelente servicio..." placeholderTextColor={colors.secondary} />
                            </View>
                        </View>
                        <View style={styles.containerField}>
                            <Text style={styles.textTitleInput}>Opinion</Text>
                            <View style={[styles.containerInput, { height: 120, alignItems: "flex-start" }]}>
                                <TextInput style={[styles.textInput, { textAlignVertical: 'top' }]} multiline numberOfLines={6} placeholder="Me gustó mucho el servicio al cliente, tienen un buen personal..." placeholderTextColor={colors.secondary} />
                            </View>
                        </View>
                        <View style={styles.containerField}>
                            <Text style={[styles.textTitleInput, { textAlign: "center" }]}>Estrellas</Text>
                            <View style={styles.containerFiltros}>
                                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
                            </View>
                        </View>
                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <Pressable style={styles.botonEnviarOpinion}>
                                <Text style={styles.textBotonEnviarOpinion}>Enviar opinión</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.lineaDivisora}></View>
                <View style={[styles.containerSeccion]}>
                    <Text style={styles.textTitle}>Opiniones</Text>
                    <Text style={[styles.textInfo, { paddingHorizontal: 5 }]}>Mira las opiniones de los demas</Text>
                    <View style={styles.containerSeccionFiltro}>
                        <Text style={styles.textTitleFiltro}>Antiguedad</Text>
                        <View style={styles.containerFiltros}>
                            <Pressable style={styles.botonFiltroAntiguedad}>
                                <Text style={styles.textBotonFiltroAntiguedad}>Recientes</Text>
                            </Pressable>
                            <Pressable style={styles.botonFiltroAntiguedadSelec}>
                                <Text style={styles.textBotonFiltroAntiguedadSelec}>Antiguas</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.containerSeccionFiltro}>
                        <Text style={styles.textTitleFiltro}>Estrellas</Text>
                        <View style={styles.containerFiltros}>
                            <Pressable style={{}}>
                                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
                            </Pressable>
                            <Pressable style={{}}>
                                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
                            </Pressable>
                            <Pressable style={{}}>
                                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
                            </Pressable>
                            <Pressable style={{}}>
                                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
                            </Pressable>
                            <Pressable style={{}}>
                                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.containerOpiniones}>
                        <View style={styles.containerOpinion}>
                            <Text style={styles.textTituloOpinion}>Titulo opinion</Text>
                            <Text style={styles.textClienteOpinion}>Sebastian</Text>
                            <Text style={styles.textFechaOpinion}>2024/10/10</Text>
                            <Text style={styles.textTextoOpinion}>Tuve una experiencia realmente positiva. El servicio al cliente fue impecable, el personal se mostró siempre atento, cordial y dispuesto a ayudar. Las instalaciones estaban limpias y bien organizadas. Sin duda, superaron mis expectativas.</Text>
                            <View style={[styles.containerFiltros, {justifyContent: "flex-start", marginTop: 0}]}>
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                            </View>
                        </View>
                        <View style={styles.containerOpinion}>
                            <Text style={styles.textTituloOpinion}>Titulo opinion</Text>
                            <Text style={styles.textClienteOpinion}>Sebastian</Text>
                            <Text style={styles.textFechaOpinion}>2024/10/10</Text>
                            <Text style={styles.textTextoOpinion}>Tuve una experiencia realmente positiva. El servicio al cliente fue impecable, el personal se mostró siempre atento, cordial y dispuesto a ayudar. Las instalaciones estaban limpias y bien organizadas. Sin duda, superaron mis expectativas.</Text>
                            <View style={[styles.containerFiltros, {justifyContent: "flex-start", marginTop: 0}]}>
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                            </View>
                        </View>
                        <View style={styles.containerOpinion}>
                            <Text style={styles.textTituloOpinion}>Titulo opinion</Text>
                            <Text style={styles.textClienteOpinion}>Sebastian</Text>
                            <Text style={styles.textFechaOpinion}>2024/10/10</Text>
                            <Text style={styles.textTextoOpinion}>Tuve una experiencia realmente positiva. El servicio al cliente fue impecable, el personal se mostró siempre atento, cordial y dispuesto a ayudar. Las instalaciones estaban limpias y bien organizadas. Sin duda, superaron mis expectativas.</Text>
                            <View style={[styles.containerFiltros, {justifyContent: "flex-start", marginTop: 0}]}>
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                            </View>
                        </View>
                        <View style={styles.containerOpinion}>
                            <Text style={styles.textTituloOpinion}>Titulo opinion</Text>
                            <Text style={styles.textClienteOpinion}>Sebastian</Text>
                            <Text style={styles.textFechaOpinion}>2024/10/10</Text>
                            <Text style={styles.textTextoOpinion}>Tuve una experiencia realmente positiva. El servicio al cliente fue impecable, el personal se mostró siempre atento, cordial y dispuesto a ayudar. Las instalaciones estaban limpias y bien organizadas. Sin duda, superaron mis expectativas.</Text>
                            <View style={[styles.containerFiltros, {justifyContent: "flex-start", marginTop: 0}]}>
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                            </View>
                        </View>
                        <View style={styles.containerOpinion}>
                            <Text style={styles.textTituloOpinion}>Titulo opinion</Text>
                            <Text style={styles.textClienteOpinion}>Sebastian</Text>
                            <Text style={styles.textFechaOpinion}>2024/10/10</Text>
                            <Text style={styles.textTextoOpinion}>Tuve una experiencia realmente positiva. El servicio al cliente fue impecable, el personal se mostró siempre atento, cordial y dispuesto a ayudar. Las instalaciones estaban limpias y bien organizadas. Sin duda, superaron mis expectativas.</Text>
                            <View style={[styles.containerFiltros, {justifyContent: "flex-start", marginTop: 0}]}>
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                                <Icono IconComponent={MaterialCommunityIcons} name="star" onPrimary={false} style={styles.iconoEstrellaOpiniones} />
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}