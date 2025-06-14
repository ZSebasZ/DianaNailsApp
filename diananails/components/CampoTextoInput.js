import { StyleSheet, View, TextInput, Text, Keyboard } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icono } from "./Icono";
import { ContadorCantidadProducto } from "./ContadorCantidadProducto";
import { useEffect, useState, useRef } from "react";

// Componente CampoTextoInput
export const CampoTextoInput = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Estados para mostrar los errores
    const [mostrarError, setMostrarError] = useState(false)
    const [estilosError, setEstilosError] = useState(false)
    const [errorOnBlur, setErrorOnBlur] = useState(null)
    const [campoActivo, setCampoActivo] = useState(false)
    const inputRef = useRef(null);

    // UseEffect para mostrar los errores
    useEffect(() => {
        if (errorOnBlur) {
            setMostrarError(true)
            setEstilosError(true)
        } else {
            if (props.errorValidacion) {
                if (!mostrarError && !errorOnBlur) {
                    setMostrarError(true)
                    setEstilosError(true)
                } else {
                    if (mostrarError && !errorOnBlur) {
                        setMostrarError(false)
                        setEstilosError(false)
                    }
                }
            } else {
                if (!errorOnBlur) {
                    setMostrarError(false)
                    setEstilosError(false)
                }
            }
        }
    }, [props.errorValidacion, errorOnBlur, props.credencialesIncorrectas]);

    // UseEffect para ocultar el teclado
    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            if (inputRef.current) {
                inputRef.current.blur();
            }
        });

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    // Funcion para manejar el onBlur del campo
    const onBlur = () => {
        setCampoActivo(false)
        if (props.verificarContrasena) {
            setErrorOnBlur(props.onBlurValidacion(props.nombreCampo, props.valorCampo?.trim(), props.verificarContrasena))
            inputRef.current.setNativeProps({ text: props.valorCampo?.trim() });
        } else {
            if (props.tipoLogin == 0) {
                setErrorOnBlur(props.onBlurValidacion(props.nombreCampo, props.valorCampo?.trim(), props.tipoLogin))
                inputRef.current.setNativeProps({ text: props.valorCampo?.trim() });
            } else {
                setErrorOnBlur(props.onBlurValidacion(props.nombreCampo, props.valorCampo?.trim()))
                inputRef.current.setNativeProps({ text: props.valorCampo?.trim() });
            }

        }

        if (errorOnBlur == 0) {
            setErrorOnBlur(null)
        }
    }

    // Estilos del componente
    const styles = StyleSheet.create({
        contenedorCampoLoginRegister: {
            marginHorizontal: props.anchoCompleto ? 10 : props.tipoCantidad ? wp(30) : wp(15),
        },
        contenedorInputs: {
            flexDirection: 'row',
            borderWidth: campoActivo ? 2 : 1,
            borderRadius: 10,
            borderColor: estilosError ? tema.error : tema.primary,
            color: tema.primary,
            alignItems: 'center',
            padding: 10,
            height: hp(6),
            opacity: props.deshabilitado ? 0.5 : 1
        },
        icono: {
            marginRight: 10,
            color: estilosError ? tema.error : tema.primary,
            fontSize: hp(3),
        },
        textInput: {
            flex: 1,
            color: estilosError ? tema.error : tema.onBackground,
            fontSize: hp(2),
        },
        textLabel: {
            color: tema.onBackground,
            fontSize: hp(2.2),
            marginBottom: 5,
        },
        textError: {
            color: tema.error
        }
    })

    // Retornamos el componente
    return (
        props.conIcono ? (
            <View style={styles.contenedorCampoLoginRegister}>
                {props.conLabel &&
                    <Text style={[props.fuenteTextoLabel, styles.textLabel, props.labelCentrado && { textAlign: "center" }]}>{props.textLabel}</Text>
                }
                <View style={[styles.contenedorInputs, props.esTextArea && { height: "auto", minHeight: 120, alignItems: "flex-start" }]}>
                    <Icono IconComponent={MaterialCommunityIcons} name={props.nombreIcono} onPrimary={false} style={styles.icono} />
                    <TextInput
                        style={[props.fuenteTexto, styles.textInput, props.esTextArea && { textAlignVertical: 'top', height: "auto", minHeight: 120 }]}
                        {...(props.esTextArea ? { multiline: true, numberOfLines: 6 } : {})}
                        placeholder={props.placeHolder}
                        placeholderTextColor={tema.secondary}
                        secureTextEntry={props.contrasena}
                        value={props.valorCampo}
                        autoCapitalize={props.nombreCampo == "email" ? "none" : undefined}
                        onChangeText={(text) => {
                            //const valor = props.nombreCampo === "email" ? text.toLowerCase() : text;

                            if (props.tipoLogin) {
                                props.onValueChange(props.nombreCampo, text, props.tipoLogin)
                            } else {
                                props.onValueChange(props.nombreCampo, text)
                            }
                        }}
                        onBlur={onBlur}
                        ref={inputRef}
                        editable={props.deshabilitado && false}
                        onFocus={() => setCampoActivo(true)}
                        returnKeyType={props.returnKeyType}
                    />
                </View>
                {mostrarError &&
                    <Text style={[props.fuenteTexto, styles.textError]}>{errorOnBlur ? errorOnBlur : (props.errorValidacion && !errorOnBlur) && props.errorValidacion}</Text>
                }
            </View>
        ) : (
            <View style={styles.contenedorCampoLoginRegister}>
                {props.conLabel &&
                    <Text style={[props.fuenteTextoLabel, styles.textLabel, props.labelCentrado && { textAlign: "center" }]}>{props.textLabel}</Text>
                }
                {props.esTiempoRequerido ?
                    <ContadorCantidadProducto
                        esTiempoRequerido={true}
                        tiempoRequerido={props.tiempoRequerido}
                        maxTiempo={props.maxTiempo}
                        onIncrementar={props.onIncrementar}
                        onDecrementar={props.onDecrementar}
                    />
                    :
                    <>
                        <View style={[styles.contenedorInputs, props.esTextArea && { height: "auto", minHeight: 120, alignItems: "flex-start" }]}>
                            <TextInput
                                style={[props.fuenteTexto, styles.textInput, props.esTextArea && { textAlignVertical: 'top', height: "auto", minHeight: 120 }]}
                                {...(props.esTextArea ? { multiline: true, numberOfLines: 6 } : {})}
                                placeholder={props.placeHolder}
                                placeholderTextColor={tema.secondary}
                                secureTextEntry={props.contrasena}
                                value={props.valorCampo}
                                autoCapitalize={props.nombreCampo == "email" ? "none" : undefined}
                                onChangeText={(text) => {
                                    if (props.tipoLogin) {
                                        props.onValueChange(props.nombreCampo, text, props.tipoLogin)
                                    } else {
                                        props.onValueChange(props.nombreCampo, text)
                                    }
                                }}
                                onBlur={onBlur}
                                ref={inputRef}
                                editable={props.deshabilitado && false}
                                onFocus={() => setCampoActivo(true)}
                                returnKeyType={props.returnKeyType}
                            />
                        </View>
                        {mostrarError &&
                            <Text style={[props.fuenteTexto, styles.textError]}>{errorOnBlur ? errorOnBlur : (props.errorValidacion && !errorOnBlur) && props.errorValidacion}</Text>
                        }
                    </>
                }

            </View>
        )
    )
}