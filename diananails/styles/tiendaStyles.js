import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const tiendaStyles = (colors) => StyleSheet.create({
    contenedorProductos: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        padding: hp(1.5),
        justifyContent: "space-evenly",
        gap: hp(2.5)
    }
});