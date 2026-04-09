# Herramientas de uso para el testeo de funcionalidad y rendimiento en las API del Back-End

Solo una de las herramientas descritas en este documetno han sido usada durante el desarrollo del programa puesto que debido a la naturaleza del programa muchas de estas herrramientas no era necesario utilizarlas , siendo posible si en el futruo se siguen añadiendo funcionalidades a la app.

---

## Thunder Client

Thunder Client es una alternativa "light-weight" a Postman con la que testear y documetnar REST API's.

**Permite a los desarrolladores**

- Realizar solicitudes HTTP (GET, POST, PATCH, DELETE).
- Inspeccionar los encabezados, los códigos de estado y el contenido de las solicitudes y respuestas.
- Guardar colecciones de solicitudes para repetir las pruebas
- Simular situaciones de error

**Caso de uso para los desarrolladores**

Es esencial para probar y depurar API durante 
el desarrollo antes de que la interfaz esté listao para forzar estados de error que son difíciles de provocar de forma natural.

**En este proyecto**

Se ha utlizado Thunder Client para probar todos los puntos finales de la API y verificar los códigos de estado HTTP correctos (200, 201, 400, 404, 500).


## Sentry

Sentry es una plataforma de supervisión de errores y seguimiento del rendimiento. 

**Permite a los desarrolladores**

Captura automáticamente:

- Excepciones no gestionadas y fallos del sistema
- Cuellos de botella en el rendimiento
- Rastros completos de la pila con contexto (qué usuario, qué navegador, qué datos)

**Caso de uso para los desarrolladores**

En las aplicaciones en producción, no se puede abrir la 
consola del navegador para ver los errores por lo que 
Sentry envía alertas y registra los errores 
automáticamente, de esta manera  los desarrolladores saben cuándo el programa no esta funcionando correctamente
sin tener que esperar a que un usuario lo notifique.

**En este proyecto**

No se ha implementado, ya que la aplicación se ejecuta localmente, pero este sería el siguiente paso lógico antes de la implementación en producción.


## Swagger

Swagger es un estándar para documentar API REST. 
Genera documentación interactiva a partir del código o de un archivo de configuración.

**Permite a los desarrolladores**

- Explorar visualmente todos los puntos finales disponibles
- Ver los parámetros obligatorios y los formatos de respuesta
- Probar las llamadas a la API directamente desde la página de documentación

**Caso de uso para los desarrolladores**

Sustituye a la documentación manual, que rápidamente queda obsoleta. La documentación está siempre sincronizada con la API real.

**En este proyecto**

No se ha implementado, pero los puntos finales de la API documentados en `README.md` cumplen la misma función.


## Axios

Axios es una biblioteca de JavaScript para realizar solicitudes HTTP tanto desde el navegador 
como desde Node.js(que usamos en este programa).
Es una evolución de la API nativa "fetch" que ofrece algunas funcionalidades adicionales.


**Permite a los desarrolladores**

- Analiza automáticamente las respuestas JSON (sin necesidad de llamar a `.json()`)
- Interceptores de solicitud/respuesta integrados: útiles para añadir tokens de autenticación  a cada solicitud automáticamente
- Mejor gestión de errores: lanza errores automáticamente para cualquier respuesta fuera del rango 2xx 

**Caso de uso para los desarrolladores**

Sintaxis más limpia y más funciones listas para usar 
en comparación con fetch, especialmente útil en aplicaciones más grandes con muchas llamadas a la API.

**En este proyecto**

Utilizamos la API nativa `fetch` a través de nuestra capa de red `client.js`, lo que cumple los mismos objetivos para nuestro caso de uso; por lo se ha tenido enceisdad de implementar.
