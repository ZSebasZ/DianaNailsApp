import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const ContenedorInputs = ({ children }) => {
    return (
        <View style={styles.contenedorInputs}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    contenedorInputs: {
        gap: hp(2),
        marginBottom: hp(2)
    },
})