// Componente Icono
export const Icono = ({ IconComponent, name, style}) => {

  // Renderizamos el componenete
  return (
    <IconComponent
      name={name}
      style={style}
    />
  );
};
