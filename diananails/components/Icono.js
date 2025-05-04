import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';

export const Icono = ({ IconComponent, name, style}) => {
  const { colors } = useContext(ThemeContext);

  return (
    <IconComponent
      name={name}
      style={style}
    />
  );
};
