# language: es

Característica: Gestión de operarios

   Esquema del escenario: ingreso de nuevo Operario
      Dado que se ingresa el operario con legajo "<legajo>", con nombre "<nombre>" cuya categoría es "<categoria>" y pertenece al turno "<turno>" a partir de "<fechaTurnoDesde>"
      Cuando presiono el botón de guardar
      Entonces se espera la siguiente respuesta "<respuesta>"

   Ejemplos:
   | legajo | nombre             | categoria             | turno | fechaTurnoDesde | respuesta    |
   | 1000   | Hermenegildo Sabat | Oficial Albañil       | 7a15  | 2023-05-12      | Operario/a 1000 Hermenegildo Sabat ingresado/a correctamente |
   | 2000   | Mariela Williams   | Medio Oficial Albañil | 7a15  | 2023-05-12      | Operario/a 2000 Mariela Williams ingresado/a correctamente |
   | 3000   | Pedro Almodovar    | Oficial Carpintero    | 7a15  | 2023-05-12      | Operario/a 3000 Pedro Almodovar ingresado/a correctamente |
   | 4000   | Manuel Belgrano    | Oficial Armador       | 15a21 | 2023-05-12      | Operario/a 4000 Manuel Belgrano ingresado/a correctamente |
   | 5000   | Soledad Solari     | Medio Oficial Armador | 15a21 | 2023-05-12      | Operario/a 5000 Soledad Solari ingresado/a correctamente |
   | 6000   | Mariano Moreno     | Ayudante              | 15a21 | 2023-05-12      | Operario/a 6000 Mariano Moreno ingresado/a correctamente |

