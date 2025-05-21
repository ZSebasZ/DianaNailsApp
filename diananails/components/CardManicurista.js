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
            width: wp(40),
            flex: props.enVistaResumen ? 0 : 1
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
                <Link href={props.href} asChild>
                    <Pressable
                        style={styles.contenedorManicurista}
                        onPress={props.onPress}
                    >
                        <Image source={{ uri: props.manicuristaImg }} style={styles.manicuristaImg}></Image>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={[props.fuenteTextoBold, styles.textTituloManicurista]}>{props.nombreManicurista}</Text>
                        </View>
                    </Pressable>
                </Link>
            </View>
        ) : (
            <View>
                <Pressable
                    style={styles.contenedorManicurista}
                    onPress={props.onPress}
                >
                    <Image source={{ uri: props.manicuristaImg }} style={styles.manicuristaImg}></Image>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={[props.fuenteTextoBold, styles.textTituloManicurista]}>{props.nombreManicurista}</Text>
                    </View>
                </Pressable>
            </View>
        )
    )
}
