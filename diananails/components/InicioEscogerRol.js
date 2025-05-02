import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, StyleSheet, Button } from 'react-native';
import { useThemedStyles } from '../hooks/useThemeStyles';

//Pantalla de bienvenida a la aplicacion
export const InicioEscogerRol = () => {

    //Estilos
    const styles = useThemedStyles((colors) => StyleSheet.create({
        container: {
            fontFamily: 'Gantari',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.background,
        },
        text: {
            fontFamily: 'GantariBold',
            fontSize: 25,
            color: colors.onBackground,
            textAlign: 'center',
        },

        button: {
            backgroundColor: colors.primary,
            padding: 10,
            borderRadius: 5,
        },
        buttonText: {
            fontFamily: 'CaveatBold',
            fontSize: 30,
            color: colors.onPrimary,
            textAlign: 'center',
        },
        containerButtons: {
            marginTop: 20,
            justifyContent: 'space-between',
            gap: 5,
        }

    }));

    //Devolvemos la vista de la pantalla de bienvenida
    return (
        <View style={styles.container}>

            <StatusBar style="auto" />
            <Text style={styles.text}>Bienvenido a la App de Diana Nails</Text>
            <Text style={styles.text}>Iniciar comoo:</Text>

            <View style={styles.containerButtons}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? 'red' : styles.button.backgroundColor,
                        },
                    ]}
                    onPress={() => alert('Cliente')}
                >
                    <Text style={styles.buttonText}>Cliente</Text>
                </Pressable>


                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Manicurista</Text>
                </Pressable>
            </View>
        </View>
    );
}