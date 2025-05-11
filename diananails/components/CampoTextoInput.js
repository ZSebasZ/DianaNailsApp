import { StyleSheet, View, TextInput } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icono } from "./Icono";


export const CampoTextoInput = (props) => {

    const tema = useThemedStyles() // Acceder al contexto

    const styles = StyleSheet.create({
        contenedorCampoLoginRegister: {
            marginHorizontal: wp(15),
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
    })

    return (
        props.conIcono ? (
            <View style={styles.contenedorCampoLoginRegister}>
                <View style={styles.contenedorInputs}>
                    <Icono IconComponent={MaterialCommunityIcons} name={props.nombreIcono} onPrimary={false} style={styles.icono} />
                    <TextInput style={[props.fuenteTexto, styles.textInput]} placeholder={props.placeHolder} placeholderTextColor={tema.secondary} secureTextEntry={props.contrasena}/>
                </View>
            </View>
        ) : (
            <View style={styles.contenedorCampoLoginRegister}>
                <View style={styles.contenedorInputs}>
                    <TextInput style={[props.fuenteTexto, styles.textInput]} placeholder="Email" placeholderTextColor={tema.secondary} />
                </View>
            </View>
        )
    )
}