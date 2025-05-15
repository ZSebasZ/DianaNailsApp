import { StyleSheet, Image, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const TomarEscogerImagen = (props) => {
    const tema = useThemedStyles()

    const perfilImgDefault = require("./../assets/images/perfilDefault.png");

    const styles = StyleSheet.create({
        recuadroImagen: {
            width: wp(60),
            height: wp(60),
            borderWidth: 1,
            borderColor: tema.primary,
            borderRadius: 130,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#eee',
        },
        imagen: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            borderRadius: 130,
        },
        botonesFoto: {
            gap: hp(2),
            alignItems: "center"
        },
    })

    return (
        <View style={{ alignItems: "center" }}>
            <View style={styles.recuadroImagen}>
                {props.imageUri ? (
                    <Image source={{ uri: props.imageUri }} style={styles.imagen} />
                ) : (
                    <Image source={perfilImgDefault} style={[styles.imagen, { opacity: 0.7 }]} />
                )}
            </View>
        </View>
    )
}
