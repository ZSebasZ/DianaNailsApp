import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const loginStyles = (colors) => StyleSheet.create({
    screen: {
        backgroundColor: colors.background
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        
    },
    containerLogo: {
        alignItems: 'center',
    },
    logo : {
        resizeMode: "contain",
        width: wp(60),
        height: hp(30),
    },
    textTitle: {
        fontSize: hp(3.5),
        fontFamily: 'GantariBold',
        color: colors.onBackground,
        textAlign: 'center',
        marginVertical: hp(2),
    },
    containerFormulario: {},
    containerField: {
        marginHorizontal: wp(15),
        marginBottom: hp(2),
    },
    textLabel:{
        color: colors.onBackground,
        fontFamily: 'GantariBold',
        fontSize: hp(2.5),
        textAlign: 'center',
    },
    containerInput: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.primary,
        color: colors.primary,
        marginVertical: hp(0.5),
        alignItems: 'center',
        padding: 10,
        height: hp(6),
    },
    iconInput: {
        marginRight: 10,
        color: colors.primary,
        fontSize: hp(3),
    },
    textInput: {
        flex: 1,
        fontFamily: 'GantariRegular',
        color: colors.onBackground,
        fontSize: hp(2),
    },
    containerButtons: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
        marginBottom: hp(2),
    },
    buttonRegister: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    textButtons: {
        color: colors.onPrimary,
        fontFamily: 'GantariBold',
        fontSize: hp(2.5),
        
    },
    textButtonRegister: {
        color: colors.primary,
    }
});