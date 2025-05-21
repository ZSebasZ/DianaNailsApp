import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const fechaHoraStyles = (colors) => StyleSheet.create({
    contenedorManicuristas: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
        paddingTop: 0,
        paddingBottom: hp(9),
        justifyContent: "space-evenly",
        gap: hp(2.5)
    },
    contenedorCalendarioPicker: {
        marginHorizontal: 10,
        borderColor: colors.primary,
        borderWidth: 2,
        borderRadius: 10,
        overflow: "hidden"
    },
});