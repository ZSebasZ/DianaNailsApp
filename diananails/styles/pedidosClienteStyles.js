import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const pedidosClienteStyles = (colors) => StyleSheet.create({
    
    contenedorFiltroPedidos: {
        flexDirection: "column",
        
        justifyContent: "center",
        alignItems: "center",
        gap: wp(2),
        marginHorizontal: wp(1),
        marginBottom: hp(2)
    },
    contenedorPedidos: {
        padding: 10,
        paddingTop: 0,
        gap: hp(2)
    }
});