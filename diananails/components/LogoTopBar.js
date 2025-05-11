import { Image, useColorScheme } from "react-native"
import {useLogoTopBar} from "./../hooks/useLogoTopBar"

export const LogoTopBar = () => {

    //Detectamos el tema del sistema para saber que solo mostrar
    const colorScheme = useColorScheme();
    const logo = useLogoTopBar()

    return (
        <Image source={logo} style={{resizeMode: "center", height: 50, width: 200}}/>
    )

}