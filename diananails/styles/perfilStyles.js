import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const perfilStyles = (colors) => StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.background,
        flex: 1,
    },
    textTitle: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        textAlign: "center",
        fontSize: hp(3.5),
        marginBottom: hp(1)
    },
    textInfo: {
        color: colors.onBackground,
        fontFamily: "GantariRegular",
        textAlign: "center",
        fontSize: hp(2.2)
    },
    containerSeccion: {
        marginTop: hp(1),
        
    },
    recuadroImagen: {
        width: wp(60),
        height: wp(60),
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 130,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    imagen: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 130,
    },
    placeholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ddd',
        borderRadius: 200
    },
    botonesFoto: {
        gap: hp(2),
        alignItems: "center"
    },
    botonFoto: {
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
        padding: 10
    },
    textoBotonFoto: {
        color: colors.onPrimary,
        fontFamily: "GantariBold",
        fontSize: hp(2)
    },
    containerField: {
        marginHorizontal: wp(15),
        marginBottom: hp(2),
    },
    textTitleInput: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(2.2),
        textAlign: "center"
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
    boton: {
        padding: 10,
        borderWidth: 1,
        width: wp(40),
        marginBottom: hp(2),
        borderRadius: 10
    },
    botonGuardarCambios: {
        backgroundColor: colors.primary,
        borderColor: colors.primary
    },
    botonEliminarCuenta: {
        backgroundColor: colors.error,
        borderColor: colors.error
    },
    textBoton: {
        textAlign: "center",
        fontFamily: "GantariBold",
        fontSize: hp(2)
    },
    textBotonGuardarCambios: {
        color: colors.onPrimary
    },
    textBotonEliminarCuenta: {
        color: colors.onError
    },
    textTitloSeccion: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        textAlign: "center",
        fontSize: hp(3),
        marginBottom: hp(1)
    },
});