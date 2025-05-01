import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useThemedStyles } from '../hooks/useThemeStyles';

//Pantalla de bienvenida a la aplicacion
const BienvenidaScreen = () => {

    //Estilos
    const styles = useThemedStyles((colors) => StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.background,
        },
        text: {
            color: colors.text,
        },
    }));

    //Devolvemos la vista de la pantalla de bienvenida
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => alert('Hello DianaNails!')}>
                <Text style={styles.text}>DianaNails App</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}
export default BienvenidaScreen;