import { View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';

// Componente ListaDropdown
export const ListaDropdown = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles() 

    // Estados para la lista
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(props.items);

    // Estilos del componente
    const styles = StyleSheet.create({
        dropdown: {
            backgroundColor: tema.background,
            borderColor: tema.primary,
            borderWidth: 2,
            borderRadius: 10,
            width: 210,
        },
        dropdownItemLabelText: {
            justifyContent: 'flex-start',
            fontSize: hp(2),
            color: tema.onBackground,
        },
        dropdownList: {
            backgroundColor: tema.background,
            borderColor: tema.primary,
            borderWidth: 1,
            borderRadius: 10,
            width: 210,
        },
        dropdownItemSelec: {
            backgroundColor: tema.primary,

        },
        dropdownLabelSelec: {
            color: tema.onPrimary
        },
        dropdownIcon: {
            tintColor: tema.primary, // Color de la flecha
        },
    })

    // Renderizamos el componente
    return (
        <View style={styles.contenedorPicker}>
            <DropDownPicker
                placeholder="Seleccion una hora..."
                dropDownDirection="CENTER"
                containerStyle={{ alignItems: "center" }}
                open={open} // Estado de apertura/cierre
                value={value} // Valor seleccionado
                items={items} // Lista de opciones
                setOpen={setOpen} // Función para cambiar el estado de apertura
                setValue={setValue} // Función para establecer el valor seleccionado
                setItems={setItems} // Función para actualizar los ítems (opcional)
                style={styles.dropdown} // Estilo del dropdown
                textStyle={[props.fuenteTexto, styles.dropdownItemLabelText]}
                listItemLabelStyle={[props.fuenteTexto, styles.dropdownItemLabelText]} // Estilo de cada ítem
                dropDownContainerStyle={styles.dropdownList} // Estilo del desplegable
                arrowIconStyle={styles.dropdownIcon} // Estilo de la flecha
                tickIconStyle={styles.dropdownIcon}
                showTickIcon={false}
                defaultValue={value} // Valor predeterminado
                selectedItemContainerStyle={styles.dropdownItemSelec}
                selectedItemLabelStyle={styles.dropdownLabelSelec}
                scrollViewProps={{
                    showsVerticalScrollIndicator: false
                }}
                listMode="SCROLLVIEW"
            />
        </View>
    )
}




