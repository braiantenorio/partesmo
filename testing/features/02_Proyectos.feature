# language: es

Característica: Gestionar proyectos
   Gestionar la carga de proyectos y tareas

   Esquema del escenario: Cargar proyecto (sin Tareas)
   Dada la empresa con nombre "<nombre>" y cuit "<cuit>" 
   Y que se ingresa el proyecto con código "<codigo>" y descripción "<descripcion>"
   Cuando se solicitan guardar el nuevo proyecto
   Entonces se obtiene la siguiente "<respuesta>"

   Ejemplos:
   | nombre          | cuit      | codigo | descripcion                   | respuesta    |
   | Matriz Hierros  | 10100100  | 1000   | Escalera lateral fundición    | Proyecto 1000 para Matriz Hierros ingresado correctamente |
   | Delivery        | 20200200  | 2000   | Montaje galpón norte          | Proyecto 2000 para Delivery ingresado correctamente |
   | Golfo Nuevo     | 30300300  | 3000   | Construcción vereda sur       | Proyecto 3000 para Golfo Nuevo ingresado correctamente |
   | Martín Quintana | 50500500  | 4000   | Granallado edificio municipal | Proyecto 4000 para Martín Quintana ingresado correctamente |
  
   Esquema del escenario: Cargar tareas al proyecto
   Dado el proyecto con código "<codigoProyecto>" que pertenece al cliente cuit "<cuit>"
   Y que se ingresa la tarea con codigo "<codigo>" y descripción "<descripcion>"
   Cuando se solicitan guardar una nueva tarea en el proyecto
   Entonces se obtiene la siguiente "<respuesta>"

   Ejemplos:
   | nombre          | cuit      | codigoProyecto | codigo | descripcion                | respuesta |
   | Matriz Hierros  | 10100100  | 1000           | 1001   | Corte chapa pantógrafo     | Proyecto 1000 para Matriz Hierros ingresado correctamente | 
   | Matriz Hierros  | 10100100  | 1000           | 1002   | Plegadora perfiles         | Proyecto 1000 para Matriz Hierros ingresado correctamente | 
   | Matriz Hierros  | 10100100  | 1000           | 1003   | Limpieza                   | Proyecto 1000 para Matriz Hierros ingresado correctamente | 
   | Delivery        | 20200200  | 2000           | 2004   | Limpieza sector montaje    | Proyecto 2000 para Delivery ingresado correctamente | 
   | Delivery        | 20200200  | 2000           | 2010   | Encofrado                  | Proyecto 2000 para Delivery ingresado correctamente | 
   | Golfo Nuevo     | 30300300  | 3000           | 3002   | Hormigonado                | Proyecto 3000 para Golfo Nuevo ingresado correctamente | 
   | Martín Quintana | 50500500  | 4000           | 4004   | Limpieza sector granallado | Proyecto 4000 para Martín Quintana ingresado correctamente | 
   | Martín Quintana | 50500500  | 4000           | 4010   | Preparación                | Proyecto 4000 para Martín Quintana ingresado correctamente | 
   | Martín Quintana | 50500500  | 4000           | 4002   | Granallado                 | Proyecto 4000 para Martín Quintana ingresado correctamente | 
  
