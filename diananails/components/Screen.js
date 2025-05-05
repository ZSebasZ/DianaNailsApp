import { View } from "react-native";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { screenStyles } from '../styles/screenStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Screen = ({children}) => {

    const styles = useThemedStyles(screenStyles);
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.screen, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
            {children}
        </View>
    );
}
