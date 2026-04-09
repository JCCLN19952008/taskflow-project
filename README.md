# TaskFlow Planner


Una aplicación web de gestión de tareas desarrollada con JavaScript  en el front-end y que para este caso de uso emplea   Node.js/Express para el back-end .


## Estructura de Carpetas

```bash
taskflow-project/
├── client/          **Frontend (HTML, CSS, JS)**
│   ├── src/
│   │   └── api/
│   │       └── client.js   **Capa de Network**
│   ├── app.js
│   ├── index.html
│   └── style.css
├── server/          **Backend (Node.js/Express)**
│   ├── src/
│   │   ├── index.js         **Punto de acceso**
│   │   ├── config/
│   │   │   └── env.js       **Validacion de Variables de Entorno*
│   │   ├── controllers/
│   │   │   └── task.controller.js
│   │   ├── routes/
│   │   │   └── task.routes.js
│   │   └── data/
│   │       └── tasks.js     **Capa de Persistencia**
│   └── tasks.json           **Almacenamiento en archivo JSON**
├── .env
└── package.json

```

## Arranque de la App

1-Se intalan las dependencias que seran necesarias para el proyecto:

```bash
   npm install
```

2-Crear un archivo .env en el qeu se define el puerto a usar por defecto para el entorno:

```bash
   PORT=3000
```

3- Se arranca el servidor de desarrollo para valorar el renidmiento de la app

```bash
   npm run dev
```

4. Se abre la direccion siguiente y se comprueba su funcionamiento:

```bash
   http://localhost:3000
```

## Endpoints de la API

**Metodos** : GET | POST | PATCH | DELETE(ONE) | DELETE(ALL)

**Endpoints** : /api/v1/tasks | /api/v1/tasks | /api/v1/tasks/:id | /api/v1/tasks/:id | /api/v1/tasks

**Descripcion** : Obtener una tarea | Crear una tarea | Actualizar o modificar una tarea | Borrar una tarea | Borrar todas las tareas

## Middlewares

**cors** : Permite que el front-end se comunique con el backend a través de diferentes orígenes

**express.json()** — Analiza el contenido de las solicitudes JSON entrantes

**express.static()** — Provee los archivos del frontend desde la carpeta «client»

**error handler** — Middleware global de 4 parámetros que detecta los errores no gestionados y devuelve los códigos de estado HTTP adecuados

## Herramientas usadas(Tech stack)

**Front-end** : HTML, CSS, Vanilla JavaScript, Tailwind CSS, Lucide Icons

**Backend** : Node.js, Express

**Persistence** : JSON file storage

**Dev tools** : Demon , dotenv


