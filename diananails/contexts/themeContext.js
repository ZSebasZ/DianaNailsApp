import React, { createContext, useState, useEffect } from 'react'; //Importamos React y los hooks useState y useEffect para manejar el estado y los efectos secundarios
import { Appearance } from 'react-native'; //Importamos el módulo Appearance de react-native para detectar el esquema de color del dispositivo
import { lightTheme, darkTheme } from './../themes/theme'; //Importamos los temas claro y oscuro que hemos definido en otro archivo

//Creamos un contexto para el tema de la aplicación
//Este contexto nos permitirá acceder al tema actual desde cualquier componente de la aplicación
// sin necesidad de pasar props manualmente a través de cada nivel del árbol de componentes
export const ThemeContext = createContext();

//Creamos un proveedor de contexto que envolverá nuestra aplicación
export const ThemeProvider = ({ children }) => {
    //Función para obtener el tema actual basado en el esquema de color del dispositivo
    const getCurrentTheme = () => {
        const colorScheme = Appearance.getColorScheme();
        return colorScheme === 'dark' ? darkTheme : lightTheme;
    };

    //Estado para almacenar el tema actual
    const [theme, setTheme] = useState(getCurrentTheme());

    //Efecto secundario para escuchar cambios en el esquema de color del dispositivo
    //Cuando el esquema de color cambia, actualizamos el estado del tema
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
        });

        //Limpiamos el efecto al desmontar el componente para evitar fugas de memoria
        //y asegurarnos de que no estamos escuchando cambios innecesarios
        return () => subscription.remove();
    }, []);

    //Devolvemos el proveedor de contexto con el tema actual y los hijos pasados como props
    //Esto permite que cualquier componente dentro de ThemeProvider tenga acceso al tema actual
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};
