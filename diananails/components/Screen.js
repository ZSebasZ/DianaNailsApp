import { View } from "react-native";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { screenStyles } from '../styles/screenStyles';

// Componente Screen
export const Screen = (props) => {

    // Obtenemos los estilos
    const styles = useThemedStyles(screenStyles, true);

    // Renderizamos el componente
    return (
        <View style={[styles.screen, props.enTab ? {paddingTop: 0} : {}]}>
            {props.children}
        </View>
    );
}
