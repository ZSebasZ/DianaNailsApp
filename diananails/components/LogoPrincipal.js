import { View, Image, StyleSheet } from "react-native";
import { useLogoPrincipal } from "../hooks/useLogoPrincipal";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Componente LogoPrincipal
export const LogoPrincipal = (props) => {

    // Usamos el hook useLogoPrincipal
    const logoPrincipal = useLogoPrincipal()

    // Renderizamos el componente
    return (
        <View style={{alignItems: "center"}}>
            <Image source={logoPrincipal} style={props.screen == "inicio" ? styles.logoInicioScreen : styles.logoLoginScreen} />
        </View>
    )
}

// Estilos del componente
const styles = StyleSheet.create({
    logo: {
        resizeMode: "contain",
    },
    logoInicioScreen: {
        width: wp(80),
        height: hp(40),
    },
    logoLoginScreen: {
        width: wp(60),
        height: hp(30),
    }
})