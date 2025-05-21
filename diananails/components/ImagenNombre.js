import { StyleSheet, Text, Image, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ImagenNombre = (props) => {
    const tema = useThemedStyles()

    const imgDefault = require("./../assets/images/perfilDefault.png");

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
                <Image source={props.imagen ? { uri: props.imagen } : imgDefault} style={{width: wp(10), height: wp(10), borderRadius: 100, resizeMode: "cover", backgroundColor: tema.background}} />
            </View>
            <Text style={styles.textClienteOpinion}>{props.nombre}</Text>
        </View>
    )
}
