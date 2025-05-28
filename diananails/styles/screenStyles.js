import { StyleSheet } from 'react-native';

// Estilos del componenente Screen
export const screenStyles = (colors, insets) => StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom
    },
});
