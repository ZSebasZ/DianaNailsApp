import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const loginStyles = (colors) => StyleSheet.create({
    screen: {
        backgroundColor: colors.background
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center'
    },
    logo : {
        resizeMode: "contain",
        width: wp(60),
        height: hp(30),
        borderColor: "white",
        borderWidth: 1,
    }
});