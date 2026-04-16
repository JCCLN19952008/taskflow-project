# El modelo MVC y el juego de llamadas entre front-end , back-end y base de datos 

Tal como ha ido evolucionando el desarrollo  de TaskFlow-Planner durante estas ultimas dos semanas finalmente ha adoptado el patron de diseño  esestructurado conocido como patrón **MVC** en tres capas.

## El Modelo (M)

El modelo se define en server/src/models/task.model.js utilizando Mongoose: define la estructura de un documento de tarea en MongoDB con campos para id, título, categoría, fecha y completado, cada uno con sus tipos y valores predeterminados. 

## El Controlador (C)

El controlador, ubicado en server/src/controllers/task.controller.js, contiene cinco funciones:

getTasks : Que recupera todas las tareas de MongoDB utilizando Task.find(). 

createTask : Que valida el cuerpo de la solicitud y guarda una nueva tarea utilizando Task.create(); updateTask, que busca una tarea por su campo id numérico y actualiza su estado de finalización utilizando findOneAndUpdate(). 

deleteTask : Que elimina una sola tarea por su id utilizando findOneAndDelete().

deleteCompleted : Que elimina de forma masiva todas las tareas finalizadas utilizando deleteMany(). 

Cada función está envuelta en un bloque try/catch y devuelve los códigos de estado HTTP apropiados:

201 para la creación.

204 para la eliminación.

400 para datos faltantes.

404 para tareas no encontradas.

500 para errores inesperados del servidor.

Las rutas en server/src/routes/task.routes.js asignan los verbos HTTP a estas funciones del controlador utilizando un enrutador Express; la ruta de eliminación masiva se coloca deliberadamente por encima de la ruta de eliminación individual para evitar que el patrón /:id la intercepte. A continuación, el enrutador se monta en index.js bajo el prefijo /api/v1/tasks, lo que hace que el control de versiones de la API sea explícito y profesional.

## La Vista (V)

Desarrollada usando HTML5 , CSS3 y pequeños fragmentso de Tailwind, sin mayor complejidad ni excesiva evolcuio con respecto al aspecto originalde la app cuando aun no contaba con un backend propiamente.
