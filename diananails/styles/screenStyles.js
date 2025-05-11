import { StyleSheet } from 'react-native';

export const screenStyles = (colors, insets) => StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom
    },
});
