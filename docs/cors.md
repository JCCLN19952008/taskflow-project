# Implementacion de CORS para evitar el rechazo a llamadas proveniente de un mismo origen


Cuando TaskFlow-Planner se implementa en Vercel, tanto el frontend como la API se sirven técnicamente desde el mismo dominio, por lo que CORS no supone un gran problema en ese caso. 

Sin embargo, durante las fases de  desarrollo local, el frontend se servia  mediante Express en localhost:3000 y, sin el middleware CORS, cualquier política de seguridad del navegador podía bloquear las solicitudes fetch realizadas desde client/src/api/client.js. El paquete cors se añadió como middleware en server/src/index.js mediante app.use(cors()), lo que añade el encabezado Access-Control-Allow-Origin a cada respuesta, indicando al navegador que se permiten las solicitudes de origen cruzado. 

Esto es especialmente importante dado que la aplicación se desarrolló y probó originalmente en Edge, que tiene políticas de prevención de rastreo más estrictas y ya bloqueaba el acceso a localStorage durante el desarrollo.
