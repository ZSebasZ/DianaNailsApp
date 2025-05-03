import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';

export const Icono = ({ IconComponent, name, size = 24, onPrimary}) => {
  const { colors } = useContext(ThemeContext);

  return (
    <IconComponent
      name={name}
      size={size}
      color={onPrimary ? colors.onPrimary : colors.primary}
    />
  );
};
