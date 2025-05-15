import { Pressable, StyleSheet, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Icono } from "./Icono";



export const EstrellasOpinion = (props) => {
    const tema = useThemedStyles()

    const styles = StyleSheet.create({
        contenedor: {
            flexDirection: "row",
            justifyContent: "center",
            gap: 15,
        },
        iconoEstrella: {
            color: tema.primary,
            fontSize: hp(4)
        },
    })

    return (
        <View style={styles.contenedor}>
            <Pressable style={{}}>
                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
            </Pressable>
            <Pressable style={{}}>
                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
            </Pressable>
            <Pressable style={{}}>
                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
            </Pressable>
            <Pressable style={{}}>
                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
            </Pressable>
            <Pressable style={{}}>
                <Icono IconComponent={MaterialCommunityIcons} name="star-outline" onPrimary={false} style={styles.iconoEstrella} />
            </Pressable>
        </View>
    )
}
