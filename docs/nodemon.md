# La actualizacion inmediata desde el lado servidor a los cambios durante le desarrollo


Durante el desarrollo del backend de TaskFlow-Planner, cada cambio realizado en archivos como index.js, task.controller.js o task.routes.js requería detener manualmente el servidor con Ctrl+C y reiniciarlo con el comando `node server/src/index.js` para ver el resultado. 

Nodemon me ha ayudado a  eliminar esta necesidad al supervisar todos los archivos del proyecto y reiniciar automáticamente el servidor cada vez que se guarda un cambio. Se instala como una dependencia de desarrollo, lo que significa que solo está disponible localmente y no se incluye en la compilación de producción. El script dev de package.json está configurado como nodemon server/src/index.js, por lo que al ejecutar npm run dev en la terminal se inicia el servidor con Nodemon vigilando los cambios. 

Nodemon me ha resultado la herramienta de configuracion mas útil durante la migración de la persistencia de archivos JSON a MongoDB Atlas, ya que se realizaban cambios frecuentes en los archivos de configuración del controlador y de la base de datos.