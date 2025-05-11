import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const tabsMainLabelStyles = (colors) => StyleSheet.create({
    label: {
        fontFamily: "GantariBold",
        fontSize: hp(1.8),
    },

    tabBar: {
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderColor: colors.primary,
        height: hp(7),
    },

    iconTab: {
        fontSize: hp(3),
    },
    iconTabBar: {
        fontSize: hp(4),
        color: colors.onPrimary
    }
});