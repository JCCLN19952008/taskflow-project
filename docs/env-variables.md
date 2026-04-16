# Implementacion y uso de Variables de Entorno para el proyecto Taskflow con Backend Express.js

En TaskFlow-Planner se utilizan dos variables de entorno: 


**PORT**: Que define el puerto en el que escucha el servidor Express, y MONGODB_URI, que contiene la cadena de conexión completa de MongoDB Atlas, incluyendo el nombre de usuario, la contraseña y la dirección del clúster. Estas se almacenan en un archivo .env en la raíz del proyecto durante el desarrollo y se añaden directamente al panel de control de Vercel para la fase de producción. 

El archivo **server/src/config/env.js**: Se encarga de cargar estas variables mediante require(“dotenv”).config() y de validarlas antes de que se inicie el servidor. Si falta MONGODB_URI, el servidor lanza un error inmediatamente, en lugar de iniciarse y fallar más tarde cuando se intente realizar una operación en la base de datos. En producción en Vercel, dotenv se omite por completo, ya que Vercel inyecta las variables de entorno directamente en process.env; esto se gestiona mediante la comprobación if (bash process.env.NODE_ENV !== “production”) en env.js. El archivo .env aparece en .gitignore, por lo que las credenciales de MongoDB nunca se envían al repositorio público de GitHub.

