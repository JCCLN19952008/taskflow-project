# Prompts de utilidad para desarrollo de proyecto

## Casos de Uso 

### 10 Prompts genericos que generan resultados para bases de codigo simples o numero de files inferior a 15 (Chat-GPT Go , Claude y Cursor)

1- Could you please take a look at the code snippet i copypasted and compare it to the codebase i will upload(the one file above) and where it might fit best?

2- Could you please explain why this function was implemented in that place inside the file instead of another?

3- Where  should i place that piece of code inside the file you just generated?

4- Could you please go back to the precious files i uploaded and check through them whether there is any logical issue outstanding?

5- Could you help make this function i just copypasted more simple without it breaking the rest of the logic within the app?

6- Could you please refresh you knowledge by going once again through the files i shared yesterday?

7- Can you explain carefully why this function behaves the way it does and the interplay iwth any other function in or out of this file it is contained in ?

8-Could you plese take another look at it and confirm your observations before i change anything?

9-Could we make this function less convoluted?

10-Could you please explain what this snippet of code i am copypasting does?

### 5 Prompts especificos que generan resultados para bases de codigo simples o numero de files inferior a 15 (Cursor, para Taskflow-Planner)

 1- I would like you to introduce changes to the html file so that it better adapts to the changes and functions i introduced in the JS file.

 2- Could you please undo all the changes i made to all of the files since the beginning of this session? Even including the first functions i asked you about or i told you to generate.

 3- As per the folder /directory structure you can see within this  taskflow-project, where each of the components for it to be ran is modularized and organized in folders and so on, do you think there is any possibility to its structure being improved upon in any way that doesn't disturb how it works ?

 4- If you got to the tasks.js file , wherein we have included the original renderTasks function in order to have it modularized, you will notice it sits there quite comfortably,  i don't know whether any modification could be introduced to make it at least a little bit less convoluted, if possible, is it feasible to make any syntax modification to the way the function is written without the changes breaking how the other components of the app work ? If it is already at its most improved state then don't bother suggesting it.

 5- As you will see in the js files alongside the html and css files, this project contains some validations and inputs required from the user in order to let some specific tasks be created/deleted  depending on date, etc. Most of these validations were done to make the user experience more streamlined, is it possible to introduce some additional validations or confirmation requiring input from the user to any of the functions now contained in the ./src files that might also require the html and css files to be modified to better reflect that behaviours required from the users?

 ---
 ---
 
 Estos son los prompts empleados por mi con mayor frecuencia , tanto para cuestines generalees en programacion como cuando se trata del contexto en el que desarrollo la app que nos ocupa.