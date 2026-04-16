# El despliegue/hosting en Vercel

## Implementación original  en Vercel:


TaskFlow-Planner se implementó inicialmente en Vercel como un sitio estático desde la rama principal, sirviendo únicamente los archivos HTML, CSS y JavaScript con localStorage para la persistencia.

## Evolucion hacia Vercel


Tras desarrollar el backend de Express en una rama de Git independiente, el reto consistió en fusionar ambas en una única implementación de Vercel. Para ello, necesite seguir tres etapas. 

**En primer lugar** : Añadí un archivo de configuración vercel.json en la raíz del proyecto para indicar a Vercel que compilara el servidor Express utilizando @vercel/node como función sin servidor y la carpeta client como archivos estáticos, con reglas de enrutamiento que dirigieran cualquier solicitud /api/ al servidor Express y todo lo demás al frontend. 

**En segundo lugar** : Configuré MongoDB Atlas para permitir conexiones desde cualquier dirección IP (0.0.0.0/0), ya que las funciones sin servidor de Vercel se ejecutan desde direcciones IP dinámicas que cambian con cada invocación. 

**En tercer lugar** : Añadí la variable de entorno MONGODB_URI directamente al panel de control de Vercel, en la sección Variables de entorno, para que la función desplegada pudiera conectarse a la base de datos sin necesidad de un archivo .env. Actualicé configuración de env.js para omitir dotenv en producción, ya que Vercel inyecta las variables directamente en process.env. 

## Merging de las ramas 


Tras fusionar la rama del backend con la principal y enviarla a GitHub, Vercel detectó automáticamente los cambios y volvió a implementar la aplicación.

La ligera latencia que he notado en las primeras solicitudes tras un periodo de inactividad es una característica que segun parece es comun en las funciones sin servidor denominada «arranque en frío»: la función necesita iniciarse antes de gestionar la solicitud.