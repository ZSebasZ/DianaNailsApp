import { View, Text, StatusBar, Image, useColorScheme, TextInput, Pressable } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import { Screen } from '../Screen';
import { useThemedStyles } from '../../hooks/useThemeStyles';
import { loginStyles } from '../../styles/loginStyles';
import { Icono } from '../Icono';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";

//Pantalla de Login
export const LoginScreen = () => {

    const insets = useSafeAreaInsets();

    //Estilos
    const styles = useThemedStyles(loginStyles);
    const colors = useThemedStyles();
    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark'
        ? require('./../../assets/images/logoDark.png')
        : require('./../../assets/images/logoLight.png');

    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                    headerTintColor: colors.onBackground,
                    headerTitle: ""
                }}
            />
            <View style={styles.mainContainer}>
                <StatusBar style="auto" />
                <View style={styles.containerLogo}>
                    <Image source={logo} style={styles.logo}></Image>
                </View>
                <View style={styles.containerFormulario}>
                    <Text style={styles.textTitle}>Inicia sesión</Text>
                    <View style={styles.containerField}>
                        <View style={styles.containerInput}>
                            <Icono IconComponent={Ionicons} name="mail" onPrimary={false} style={styles.iconInput} />
                            <TextInput style={styles.textInput} placeholder="Email" placeholderTextColor={colors.secondary} />
                        </View>
                    </View>
                    <View style={styles.containerField}>
                        <View style={styles.containerInput}>
                            <Icono IconComponent={FontAwesome6} name="lock" onPrimary={false} style={styles.iconInput} />
                            <TextInput style={styles.textInput} placeholder="Contraseña" placeholderTextColor={colors.secondary} secureTextEntry />
                        </View>
                    </View>
                    <View style={styles.containerButtons}>
                        <Link asChild href={"/home"} style={styles.buttons}>
                            <Pressable
                                onPress={() => { }}
                            >
                                <Text style={styles.textButtons}>Iniciar sesion</Text>
                            </Pressable>
                        </Link>
                        <Link asChild href={"/registro"} replace style={[styles.buttons, styles.buttonRegister]}>
                            <Pressable
                                onPress={() => { }}
                            >
                                <Text style={[styles.textButtons, styles.textButtonRegister]}>Registrarme</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </View>
        </Screen>

    );
}