# Desafio para desarrollador Backend

## Objetivo del desafío

1. Resolver una situación desconocida desde un enfoque algorítmico.
2. Publicar la solución através de una API REST.
3. Publicar solución a través de socket.io.
4. Plantear una solución que contenga pruebas.
5. Utilizar ecosistema Node.js
6. Crear un PR a este repo con la resolución.

## Pedido del cliente
Mengenlehreuhr Inc. creadores del reloj [Berlin Clock](https://en.wikipedia.org/wiki/Mengenlehreuhr) necesita brindar los siguientes servicios:

1. Conocer el horario actual, pero expresandolo en el formato *Berlin Clock*
2. Dado un horario expresado en format [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) conocer su correspondiente *Berlin Clock*

Para llevar a cabo esta tarea necesitarían definir un formato estructurado de respuesta (JSON). Adicionalmente la empresa Mengenlehreuhr Inc. valorará que este servicio cuente con end-points en los cuales se puedan consultar estos horarios obteniendo una representación gráfica.  **_Esta última característica es opcional_**

## Objetivo técnico del desafío

Construir una servicio REST que permita:

1. Consultar la hora actual, 
2. Convertir un horario expresado en formato ISO 8601.

En ambos casos respondiendo un json o una imagen (renderizar la imagen es **opcional**) generada por el servidor. 

Queda a juicio del postulante como estructurar los datos así como también como renderizar la imagen.

El cliente requiere que esta funcionalidad este testeada con una cobertura que permita garantizar una calidad que se considere prudente.

### Bounus track

Generar una imagen docker y registrarla en [DockerRegistry](https://hub.docker.com/) de forma publica para poder desplegar el servicio (el despliegue queda a cargo de la empresa).


## Tips

1. Para crear el servicio REST es conveniente [RESTify](http://restify.com/) si bien se puede utilizar [Express](https://expressjs.com/)
2. Para escribir las pruebas [Mocha](https://mochajs.org/)

## Solucion

1. Iniciar con "node server.js"

2. Para obtener la hora actual ingresar la siguiente URL. 
```
http://localhost:8080/current
```
La respuesta será un JSON con la siguiente estructura:
```
{
  seconds: true, (Si el indicador de segundos debe estar encendido o apagado)
  hours1: 4,	(Cuantos indicadores deben encenderse en el 2do renglon horario)
  hours5: 3,  (Indicadores del 1er renglon horario)
  minutes1: 4, (Indicadores del 2do renglon de minutos)
  minutes5: 1 (Indicadores del 1er renglon de minutos)
}
```

3. Ingresar la forma en formato ISO-8601 como se indica a continuacion. La estructura del Json sera similar a la detallada en el punto anterior
```
http://localhost:8080/convert/2007-04-05T14:30
```

4. Para una visualizacion grafica ingresar a http://localhost:8080/display. Ademas del Berlin Clock se mostrará la cantidad de usuarios que se encuentren mirando el reloj en ese momento (uso de socket.io).

5. Con http://localhost:8080/shutdown se puede detener el servidor (no es para uso en produccion, pensado solo para cuestiones de desarrollo).

Para testear el software usar "npm test".
