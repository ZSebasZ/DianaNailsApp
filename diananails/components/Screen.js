import { View } from "react-native";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { screenStyles } from '../styles/screenStyles';

export const Screen = ({children}) => {

    const styles = useThemedStyles(screenStyles);

    return (
        <View style={styles.screen}>
            {children}
        </View>
    );
}
