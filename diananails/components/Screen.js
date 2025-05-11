import { View } from "react-native";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { screenStyles } from '../styles/screenStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Screen = (props) => {

    const styles = useThemedStyles(screenStyles, true);

    return (
        <View style={[styles.screen, props.enTab ? {paddingTop: 0} : {}]}>
            {props.children}
        </View>
    );
}
