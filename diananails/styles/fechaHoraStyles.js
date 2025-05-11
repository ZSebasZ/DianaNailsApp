import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const fechaHoraStyles = (colors) => StyleSheet.create({
    contenedorManicuristas: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
        paddingBottom: hp(9),
        justifyContent: "space-evenly",
        gap: hp(2.5)
    },
    contenedorCalendarioPicker: {
        marginVertical: hp(2),
        marginHorizontal: wp(2),
    },
    containerPicker: {
        marginHorizontal: wp(20),
        marginVertical: hp(2)
    },
    dropdown: {
        backgroundColor: colors.background,
        borderColor: colors.primary,
        borderWidth: 2,
        borderRadius: 10,
    },
    dropdownItemLabelText: {
        fontFamily: "GantariRegular",
        justifyContent: 'flex-start',
        fontSize: hp(2),
        color: colors.onBackground
    },
    dropdownList: {
       backgroundColor: colors.background,
       borderColor: colors.primary,
       borderWidth: 1,
       borderRadius: 10,
    },
    dropdownItemSelec: {
        backgroundColor: colors.primary,
        
    },
    dropdownLabelSelec: {
        color: colors.onPrimary
    },
    dropdownIcon: {
        tintColor: colors.primary, // Color de la flecha
    },

});