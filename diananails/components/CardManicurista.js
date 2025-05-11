import { Pressable, StyleSheet, Text, Image, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { Link } from "expo-router"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const CardManicurista = (props) => {
    const tema = useThemedStyles()

    const styles = StyleSheet.create({
        contenedorManicurista: {
            backgroundColor: props.estaSeleccionada ? tema.primary : tema.background,
            borderColor: tema.primary,
            borderWidth: 2,
            borderRadius: 10,
        },
        manicuristaImg: {
            width: "100%",
            height: 100,
            resizeMode: "cemter",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
        },
        textTituloManicurista: {
            color: props.estaSeleccionada ? tema.onPrimary : tema.onBackground,
            fontSize: hp(2.5),
            padding: 10,
            textAlign: "center"
        },
    })

    return (
        props.esLink ? (
            <View>
                <Link href={props.href}>
                    <Pressable style={styles.contenedorManicurista}>
                        <Image source={props.manicuristaImg} style={styles.manicuristaImg}></Image>
                        <Text style={[props.fuenteTextoBold, styles.textTituloManicurista]}>{props.nombreManicurista}</Text>
                    </Pressable>
                </Link>
            </View>
        ) : (
            <View>
                <Pressable style={styles.contenedorManicurista}>
                    <Image source={props.manicuristaImg} style={styles.manicuristaImg}></Image>
                    <Text style={[props.fuenteTextoBold, styles.textTituloManicurista]}>{props.nombreManicurista}</Text>
                </Pressable>
            </View>
        )
    )
}
