# 💅 DianaNailsApp

**DianaNailsApp** es una aplicación móvil desarrollada con **React Native + Expo** y un backend en **Node.js + Express**, creada para gestionar integralmente un salón de uñas o cualquier negocio que maneje citas y ventas de productos.

La app está dividida en tres roles principales:

### 👤 Clientes
- Reservan citas con manicuristas.
- Realizan pedidos de productos.
- Gestionan sus citas y pedidos.
- Pueden dejar opiniones sobre las citas.
- Visualizan opiniones de otros usuarios.

### 🛠️ Administradores
- Visualizan todas las citas agendadas por los clientes.
- Gestionan el estado de los pedidos.
- Administran productos, servicios y manicuristas.
- Visualizan y moderan opiniones.

### 💅 Manicuristas
- Ven únicamente las citas que les han sido asignadas.

---

## 📁 Estructura del Proyecto

```
DianaNailsApp/
├── backend/         # Servidor backend en Node.js
└── diananails/      # Aplicación móvil en React Native con Expo
```

---

## ⚙️ Requisitos previos

- Node.js (>= 16.x)
- npm (>= 8.x)
- Expo CLI (`npm install -g expo-cli`)
- Base de datos MySQL
- Cuenta en Expo (para builds)

---

## 🧩 Instalación de dependencias

Ejecuta estos comandos desde la raíz del proyecto:

```bash
# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias de la app móvil
cd ../diananails
npm install
```

---

## 🌐 Configuración del entorno

### Backend - `.env`

Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:

```env
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=nombre_base_de_datos
DB_PORT=puerto_base_de_datos
PORT=5001
```

---

## 🔧 Backend (Node.js + Express)

### 📦 Dependencias del backend

```json
{
  "express": "^5.1.0",
  "mysql2": "^3.14.0",
  "cors": "^2.8.5",
  "dotenv": "^16.5.0",
  "bcrypt": "^6.0.0"
}
```

### ▶️ Iniciar servidor

Desde la carpeta `backend`:

```bash
node index.js
```

> Esto iniciará la API REST en el puerto especificado en `.env` (por defecto `5001`).

---

## 📱 Aplicación móvil (React Native + Expo)

### 📦 Dependencias destacadas

```json
{
  "@expo/vector-icons": "~14.1.0",
  "@react-native-async-storage/async-storage": "1.23.1",
  "@react-native-picker/picker": "2.9.0",
  "axios": "^1.9.0",
  "expo": "~52.0.46",
  "expo-constants": "~17.0.8",
  "expo-font": "~13.0.4",
  "expo-image-picker": "~16.0.6",
  "expo-linking": "~7.0.5",
  "expo-modules-core": "~2.2.3",
  "expo-router": "~4.0.21",
  "expo-splash-screen": "~0.29.24",
  "expo-status-bar": "~2.0.1",
  "expo-system-ui": "~4.0.9",
  "react": "18.3.1",
  "react-native": "0.76.9",
  "react-native-calendars": "^1.1312.0",
  "react-native-dropdown-picker": "^5.4.6",
  "react-native-keyboard-aware-scroll-view": "^0.9.5",
  "react-native-responsive-screen": "^1.4.2",
  "react-native-safe-area-context": "4.12.0",
  "react-native-screens": "~4.4.0",
  "react-native-svg": "15.8.0"
}
```

### ▶️ Ejecutar en desarrollo

Desde la carpeta `diananails`:

```bash
npm start
```

O para correr en un emulador/dispositivo:

```bash
npm run android
npm run ios
npm run web
```

---

## 📦 Generar build (Producción)

Este proyecto usa **EAS Build** de Expo.

1. Asegúrate de tener el archivo `eas.json` y estar autenticado con Expo:
```bash
eas login
```

2. Ejecuta la build para Android:

```bash
eas build --profile production --platform android
```

Para iOS:

```bash
eas build --profile production --platform ios
```

> 💡 Asegúrate de tener configurados los certificados requeridos para iOS.

---

## 🧪 Scripts útiles

### Backend

```bash
node index.js        # Iniciar servidor
```

### App móvil

```bash
npm start            # Iniciar en modo desarrollo
npm run android      # Ejecutar en Android
npm run ios          # Ejecutar en iOS
npm run web          # Ejecutar en navegador
```

---

## 🛡️ Licencia

© 2025 **Sebastian Jimenez Dev**.  
Todos los derechos reservados.

Este proyecto es propiedad intelectual de su autor.  
No se permite la copia, distribución o modificación sin autorización previa.


---

## 🙌 Agradecimientos

Gracias por interesarte en **DianaNailsApp**. Si deseas colaborar, reportar errores o sugerir mejoras, ¡eres bienvenido!
