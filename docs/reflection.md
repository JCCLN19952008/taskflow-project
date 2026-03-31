# Reflexion Final sobre el uso de la IA para el proyecto Taskflow-Planner

## Uso específico 

### Contexto

En lo que concierne al uso de la IA para esta parte especifcia del proyecto,
principalmente desde el punto de vista de profundizar en como trabaja cada uno de los asistentes mas usados y cuales son sus puntos fuertes y sus puntos debiles, 
he observado que la mayor parte de ellos generan unas ganancias abismales en cuanto a productividad y velocidad para generar codigo en muchso casos comparable al de cualqueir senior con conocimiento en varias ramas del desarrollo.

Si bien me hubiera gustado seguir prfundizando con el uso de Cursor por tener integrado un Agente de IA para el desarrollo esto no me ha sido posible , sin embargo en el uso de todas las plataformas, tanto Chat-GPT como Claude diria que Cursor es la mas potente a la hora de usar por el mero hecho que esta integrada y ya tiene de serie el contexto del proyecto, por tanto pudiendo analizar y ofrecer mejoras en tiempo real a la vez qeu ejecutar directamente comandos por ella misma.

Para este proyecto no obstante me he centrado en la logica del codigo JS, no he querido hacer una modificacion estetica de la app sino simplemente romper lo que ya funcionaba en la app originaria para ver de que manera la IA corregia errores random o codigo incompleto expresamente hecho por mi con el fin de testar capabilidades, con el fin de analizar cuanto de bien se defendia en estos contextos y para preservar la integridad de mi app original, todos los experimentos realizados con la IA han sido alojados en un rama del proyecto alternativa a la main, de manera que la app original no se vea afectada por lo hecho.

### Observaciones

No obstante todo lo anterior tengon unas pocas observaciones qe hacer con respecto al usod e la IA , ene ste caso Cursor especificamente(aunque en su modelo free-tier):

1-Tiende a ofuscarse en un mismo problema que previamente se supone ha tenido que resolver al no conservar la memoria de lo que ya ha reescrito ,generando codigo repetido que debia haber podido ser removido de la app.

2- Este "rizar el rizo" conelleva entrar en una espiral de corregir un error pero no recordar haberlo hecho generando con ello el mismo codigo erroneo que no recordaba haber corregido y multiplicando el codigo mas de una vez sospecho no deriva de no conocer el contexto de la app o no poder leer los  archivos o no tener memmoria de ello, puesto que desde un principio ha sido capaz de analizar files y ofrecer soluciones en todos y cada uno de los files y como interactuan con cada uno, sospecho que este bucle es simplemente producto de la tan conocida "alucinacion" que conlleva que la IA se ofusque y termine dando datos erroneos o actuando de manera "rogue"

3- Es mayor la profundiad y la riqueza de las respuestas cuando no empleaba el MCP FileSystem que cuando lo usaba, por algun motivo es mi apreciacion que antes de hacer el set-up del MCP Server y activarlo las respuestas del Asistente en Cursor eran mas logradas y rapidas.

4- Le cuesta ofrecer alternativas a su codigo directamente generado que pueda ser considerado redundante.

5- En cuanto al uso de Chat-GPT y Claude , es mi apreciacion que Claude esta bastante mas  dirigido a desarrolladores mas experimentados, la profundidad de las respuestas qeu puede alcanzar y su conocmineto del contexto inscluso sin definirselo es mayor de lo que me parece con Chat-GPT, no obstante  para un proyecto de estas caracteristicas Claude se me antoja un tanto innecesario debido a la poca complejidad de las funciones a implementar.

6- Chat-GPT no tiene un conocimiento del contexto automatico e inmediato tan amplio como Claude pero para un proyecto pequeño de estas caracteristicas sus limitaciones se antojan irelevantes, siendo a todas luces peor que Claude para tareas intensivas de desarrollo de software(estoy usando el plan de pago mas asequible).

### Conclusion

Las tres herrameintas utilizadas tienen sus ventajas y desventajas asi como casos de uso, un desarrollador con experiencia ,conocimiento amplio y que necesite de una asistente veloz que pueda ejecutar comandos directamente y revisar cantidades ingentes de codigo en archivos  puede sacar una ventaja clara de usar Cursor, un desarrollador senior que bsuca mejorar competencias o fotalecer areas de su arsenal como desarrollador asi com revisar bases de codigo propias puede tener una gran ayuda con Claude, un ingeniero junior o entusiasta /estudiante tiene  a mi parecer  mas que suficiente con las capabilidades que le ofrece Chat-GPT, si bien sospecho que todas las herramientas(incluyendo Claude aunque no lo he testado directametene como corrige su propio codigo si es erroneo o complejo en exceos) tienen dificultades para detectar directamente errores en su codigo generado mas alla de unos primeros intentos y tienden a no recordar lo que ya han corregido.
