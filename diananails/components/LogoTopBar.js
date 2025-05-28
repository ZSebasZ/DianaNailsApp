import { Image, useColorScheme } from "react-native"
import {useLogoTopBar} from "./../hooks/useLogoTopBar"

// Componente LogoTopBar
export const LogoTopBar = () => {

    // Usamos el hook useLogoTopBar
    const logo = useLogoTopBar()

    // Renderizamos el componente
    return (
        <Image source={logo} style={{resizeMode: "center", height: 50, width: 200}}/>
    )

}