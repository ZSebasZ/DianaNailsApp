import { View, Text, StatusBar, Image, useColorScheme, TextInput, Pressable } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import { Screen } from '../Screen';
import { useThemedStyles } from '../../hooks/useThemeStyles';
import { registroStyles } from '../../styles/registroStyles';
import { Icono } from '../Icono';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";

//Pantalla de Login
export const RegistroScreen = () => {

    const insets = useSafeAreaInsets();

    //Estilos
    const styles = useThemedStyles(registroStyles);
    const colors = useThemedStyles();
    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../../assets/images/logoDark.png')
        : require('./../../assets/images/logoLight.png');

    const [showError, setShowError] = useState("none");

    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <View style={[styles.mainContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
                <StatusBar style="auto" />
                {/*<View style={styles.containerLogo}>
                    <Image source={logo} style={styles.logo}></Image>
                </View>*/}
                <View style={styles.containerFormulario}>
                    <Text style={styles.textTitle}>Registrate</Text>
                    <View style={styles.containerField}>
                        <View style={styles.containerInput}>
                            <Icono IconComponent={FontAwesome6} name="user-large" onPrimary={false} style={styles.iconInput} />
                            <TextInput style={styles.textInput} placeholder="Nombre" placeholderTextColor={colors.secondary} />
                        </View>
                        <Text style={[styles.textError, { display: showError }]}>Este campo es obligatorio</Text>
                    </View>
                    <View style={styles.containerField}>
                        <View style={styles.containerInput}>
                            <Icono IconComponent={FontAwesome6} name="user-large" onPrimary={false} style={styles.iconInput} />
                            <TextInput style={styles.textInput} placeholder="Apellidos" placeholderTextColor={colors.secondary} secureTextEntry />
                        </View>
                        <Text style={[styles.textError, { display: showError }]}>Este campo es obligatorio</Text>
                    </View>
                    <View style={styles.containerField}>
                        <View style={styles.containerInput}>
                            <Icono IconComponent={FontAwesome6} name="phone" onPrimary={false} style={styles.iconInput} />
                            <TextInput style={styles.textInput} placeholder="Telefono" placeholderTextColor={colors.secondary} />
                        </View>
                        <Text style={[styles.textError, { display: showError }]}>Este campo es obligatorio</Text>
                    </View>
                    <View style={styles.containerField}>
                        <View style={styles.containerInput}>
                            <Icono IconComponent={FontAwesome6} name="map-location-dot" onPrimary={false} style={styles.iconInput} />
                            <TextInput style={styles.textInput} placeholder="Direccion de envio" placeholderTextColor={colors.secondary} />
                        </View>
                        <Text style={[styles.textError, { display: showError }]}>Este campo es obligatorio</Text>
                    </View>
                    <View style={styles.containerField}>
                        <View style={styles.containerInput}>
                            <Icono IconComponent={Ionicons} name="mail" onPrimary={false} style={styles.iconInput} />
                            <TextInput style={styles.textInput} placeholder="Email" placeholderTextColor={colors.secondary} />
                        </View>
                        <Text style={[styles.textError, { display: showError }]}>Este campo es obligatorio</Text>
                    </View>
                    <View style={styles.containerField}>
                        <View style={styles.containerInput}>
                            <Icono IconComponent={FontAwesome6} name="lock" onPrimary={false} style={styles.iconInput} />
                            <TextInput style={styles.textInput} placeholder="Contraseña" placeholderTextColor={colors.secondary} secureTextEntry/>
                        </View>
                        <Text style={[styles.textError, { display: showError }]}>Este campo es obligatorio</Text>
                    </View>
                    <View style={styles.containerField}>
                        <View style={styles.containerInput}>
                            <Icono IconComponent={FontAwesome6} name="user-lock" onPrimary={false} style={styles.iconInput} />
                            <TextInput style={styles.textInput} placeholder="Confirmar contraseña" placeholderTextColor={colors.secondary} secureTextEntry/>
                        </View>
                        <Text style={[styles.textError, { display: showError }]}>Este campo es obligatorio</Text>
                    </View>
                    <View style={styles.containerButtons}>
                        <Link asChild href={"/login"} replace style={styles.buttons}>
                            <Pressable
                                onPress={() => { }}
                            >
                                <Text style={styles.textButtons}>Registrarme</Text>
                            </Pressable>
                        </Link>
                        <Link asChild href={"/login"} replace style={[styles.buttons, styles.buttonRegister]}>
                            <Pressable
                                onPress={() => { }}
                            >
                                <Text style={[styles.textButtons, styles.textButtonRegister]}>Volver</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </View>
        </Screen>

    );
}