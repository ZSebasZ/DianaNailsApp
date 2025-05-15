import { StyleSheet, Text, Image, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ImagenNombre = (props) => {
    const tema = useThemedStyles()

    const styles = StyleSheet.create({
       textClienteOpinion: {
            fontFamily: props.textNormal ? "GantariRegular" : "GantariBold",
            color: tema.onSecondaryContainer,
            fontSize: hp(2.2),
        },
    })

    return (
        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
            <View>
                <Image source={props.imagen} style={{width: wp(10), height: wp(10), borderRadius: 100, resizeMode: "cover"}} />
            </View>
            <Text style={styles.textClienteOpinion}>{props.nombre}</Text>
        </View>
    )
}
