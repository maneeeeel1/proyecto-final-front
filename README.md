#🎮 Frontend Proyecto Final

Este es el componente de frontend del proyecto final, una Single Page Application (SPA) construida con React. Permite a los usuarios explorar productos, añadirlos al carrito, gestionar cantidades, cambiar entre temas claro/oscuro, y visualizar información detallada de Pokémon, incluyendo megaevoluciones. También incluye una vista de administración para la gestión de productos. Un apartado para jugar con un amigo a Piedra, Papel o Tijera.



##🌟 Características Principales

-Interfaz de Usuario Interactiva:

--Navegación fluida y responsiva.

-Gestión de Productos: 

--Visualización de productos disponibles en la tienda.

--Añadir productos al carrito de compras.

--Ajuste de cantidades de productos en el carrito.

-Temas Visuales:

--Soporte para tema claro y oscuro, configurable por el usuario.

-Pokédex Interactiva:

--Visualización de una lista de Pokémon.

--Detalles de megaevoluciones al pasar ratón.

-Vista de Administración:

--Funcionalidades para editar y eliminar productos (requiere        autenticación).

-Comunicación en Tiempo Real:

--Integración con Socket.IO para funcionalidades en tiempo real (ej. juego con amigos).



###🛠️ Tecnologías Utilizadas

-React: Librería de JavaScript para construir interfaces de usuario.

-React Hooks: Para la gestión de estado y efectos secundarios.

-Context API: Para la gestión de estado global (carrito, tema).

-CSS: Para estilizado y diseño responsivo.

-fetch API: Para realizar solicitudes HTTP al backend.

-Vite: Herramienta de construcción para React.

-Dotenv: Para la gestión de variables de entorno en el frontend.



####🚀 Puesta en Marcha

Sigue estos pasos para levantar el frontend en tu entorno local.



--Prerequisitos--
Antes de comenzar, asegúrate de tener instalado lo siguiente:

Node.js (versión 14 o superior recomendada)



--Backend en ejecución:--

 Asegúrate de que el backend de la aplicación esté corriendo y accesible.



--Instalación--

Instala las dependencias:

npm install



--Configura las variables de entorno:--

Crea un archivo llamado .env en la raíz de la carpeta frontend con la URL de tu API backend:

VITE_API_BASE_URL=https://proyecto-final-back-x6cc.onrender.com/api 



--Iniciar la Aplicación--

Desde la carpeta frontend, ejecuta el siguiente comando: npm run dev 

La aplicación frontend debería iniciarse y abrirse automáticamente en tu navegador.

🔗 Conexión con el Backend
El frontend se conecta al backend utilizando la URL definida en la variable de entorno REACT_APP_API_BASE_URL (o VITE_API_BASE_URL). Todas las solicitudes a la API se realizan a esta URL base.

#####A TENER EN CUENTA:

Por falta de tiempo, faltan pulir detalles:

-Web no responsive: La sección jugar esta hecha, el resto NO.

-El juego una vez terminado, si vais a Inicio no se puede repetir ID de Sala. La detecta como llena, fácil de resolver con un par de horitas más!