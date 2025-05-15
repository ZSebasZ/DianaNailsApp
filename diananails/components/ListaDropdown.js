import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';

export const ListaDropdown = (props) => {

    const tema = useThemedStyles() // Acceder al contexto

    const [open, setOpen] = useState(false); // Estado para abrir/cerrar el dropdown
    const [value, setValue] = useState(null); // Estado para el valor seleccionado
    const [items, setItems] = useState(props.items);

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




