import { Linking } from 'react-native';

export const abrirPerfilInstagram = async () => {
    const username = 'dianal_nails';
    const appUrl = `instagram://user?username=${username}`;
    const webUrl = `https://www.instagram.com/${username}/`;

    try {
        const supported = await Linking.canOpenURL(appUrl);
        await Linking.openURL(supported ? appUrl : webUrl);
    } catch (error) {
        console.error('No se pudo abrir el perfil de Instagram', error);
    }
};
