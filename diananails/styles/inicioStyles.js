import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const inicioStyles = (colors) => StyleSheet.create({

    screen: {
        backgroundColor: colors.background
    },

    mainContainer: {
        flex: 1,
        alignItems: 'center'
    },
    subMainContainer: {
        paddingTop: hp(3),
    },
    logoTextContainer: {
       
    },
    logo : {
        resizeMode: "contain",
        width: wp(80),
        height: hp(40),
    },
    textNameApp: {
        fontFamily: 'CaveatBold',
        textAlign: 'center',
        color: colors.onBackground,
        fontSize: hp(6),
        marginBottom: hp(3)
    },
    text: {
        fontFamily: 'GantariBold',
        fontSize: hp(3),
        color: colors.onBackground,
        textAlign: 'center',
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        gap: wp(1),
        //width: wp(90),
    },
    iconButton: {
        color: colors.onPrimary,
        fontSize: hp(3),
    },
    buttonText: {
        fontFamily: 'CaveatBold',
        fontSize: 30,
        
        color: colors.onPrimary,
        textAlign: 'center',
    },
    containerButtons: {
        alignItems: 'center',
        marginTop: 20,
        gap: 10,
    },
    instagramIcon: {
        alignItems: 'center',
        marginTop: hp(5),
    },
    iconRedSocial: {
        color: colors.primary,
        fontSize: hp(3),
    }


});
