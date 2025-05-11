import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const agendarCitaStyles = (colors) => StyleSheet.create({
    contenedorServicios: {
        flex: 1, 
        flexDirection: "row", 
        flexWrap: "wrap", 
        padding: 10, 
        paddingBottom: hp(9),
        justifyContent: "space-evenly", 
        gap: hp(2.5)
    }
});