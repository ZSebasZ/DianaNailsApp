import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const agendarCitaStyles = (colors) => StyleSheet.create({
    contenedorServicios: {
        
        padding: 10, 
        paddingTop: 0,
        paddingBottom: hp(9),
        alignItems: "center",
        gap: hp(2.5)
    }
});