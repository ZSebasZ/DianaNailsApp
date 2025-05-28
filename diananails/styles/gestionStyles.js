import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
 
//Estilos para la screen de gestion
export const gestionStyles = (colors) => StyleSheet.create({
    containerSeccion: {
        marginTop: hp(2),
        justifyContent: "center",
        alignItems: "center",
        gap: hp(3)
    },
});