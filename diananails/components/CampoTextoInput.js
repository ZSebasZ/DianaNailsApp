import { StyleSheet, View, TextInput, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icono } from "./Icono";
import { ContadorCantidadProducto } from "./ContadorCantidadProducto";


export const CampoTextoInput = (props) => {

    const tema = useThemedStyles() // Acceder al contexto

    const styles = StyleSheet.create({
        contenedorCampoLoginRegister: {
            marginHorizontal: props.anchoCompleto ? 10 : wp(15),
        },
        contenedorInputs: {
            flexDirection: 'row',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: tema.primary,
            color: tema.primary,
            alignItems: 'center',
            padding: 10,
            height: hp(6),
        },
        icono: {
            marginRight: 10,
            color: tema.primary,
            fontSize: hp(3),
        },
        textInput: {
            flex: 1,
            color: tema.onBackground,
            fontSize: hp(2),
        },
        textLabel: {
            color: tema.onBackground,
            fontSize: hp(2.2),
            marginBottom: 5,
        }
    })

    return (
        props.conIcono ? (
            <View style={styles.contenedorCampoLoginRegister}>
                {props.conLabel &&
                    <Text style={[props.fuenteTextoLabel, styles.textLabel, props.labelCentrado && { textAlign: "center" }]}>{props.textLabel}</Text>
                }
                <View style={[styles.contenedorInputs, props.esTextArea && { height: 120, alignItems: "flex-start" }]}>
                    <Icono IconComponent={MaterialCommunityIcons} name={props.nombreIcono} onPrimary={false} style={styles.icono} />
                    <TextInput style={[props.fuenteTexto, styles.textInput, props.esTextArea && { textAlignVertical: 'top' }]}  {...(props.esTextArea ? { multiline: true, numberOfLines: 6 } : {})} placeholder={props.placeHolder} placeholderTextColor={tema.secondary} secureTextEntry={props.contrasena} />
                </View>
            </View>
        ) : (
            <View style={styles.contenedorCampoLoginRegister}>
                {props.conLabel &&
                    <Text style={[props.fuenteTextoLabel, styles.textLabel, props.labelCentrado && { textAlign: "center" }]}>{props.textLabel}</Text>
                }
                {props.esTiempoRequerido ?
                    <ContadorCantidadProducto esTiempoRequerido={true}/>
                    :
                    <View style={[styles.contenedorInputs, props.esTextArea && { height: 120, alignItems: "flex-start" }]}>
                        <TextInput style={[props.fuenteTexto, styles.textInput, props.esTextArea && { textAlignVertical: 'top' }]}  {...(props.esTextArea ? { multiline: true, numberOfLines: 6 } : {})} placeholder={props.placeHolder} placeholderTextColor={tema.secondary} secureTextEntry={props.contrasena} />
                    </View>
                }

            </View>
        )
    )
}