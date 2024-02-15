
({
    doInit: function(cmp) { /*Esta función se ejecuta al crear los topos y sirve para definir cuales dan puntuación (son topos) */
        //Math.random() < 0.5 ? $A.util.addClass(topo, 'active') : $A.util.addClass(topo, 'inactive') ;
        //var number =Math.random() ;
        var topo = cmp.find("topo"); //Recuperamos el componente topo
        var randomNumberGenerator = cmp.get("c.random"); //Llamamos al método random del controlador de Apex. Para obtener un número aleatorio
                                                        //Esta está dentro de classes/RandomApex.cls

        //Es una llamada asíncrona, cuando se reciba la respuesta se ejecutará la función que se le pasa como parámetro
        randomNumberGenerator.setCallback(this, function(response){ 
            var state = response.getState(); //Recuperamos el estado de la respuesta que puede ser (SUCCESS, INCOMPLETE, ERROR, ABORTED)

            if(state === "SUCCESS"){ //Si la llamada al método random ha sido exitosa, se ejecuta el siguiente código
                var number = response.getReturnValue();  //Recuperamos el número aleatorio que nos devuelve el método random del controlador de Apex
                if(number < 0.5){  //Si el número aleatorio es menor que 0.5, el topo es activo
                    $A.util.addClass(topo, 'active'); //Cambiamos la clase CSS del span con el id topo que hemos guardado antes, a active
                    cmp.set("v.isTopo",true) //Guardamos en el atributo isTopo el valor true

                }else{ //Si el número aleatorio es mayor que 0.5, el topo es inactivo
                    $A.util.addClass(topo, 'inactive'); //Cambiamos la clase CSS del span con el id topo que hemos guardado antes, a inactive
                    cmp.set("v.isTopo",false) //Guardamos en el atributo isTopo el valor false
                }
            }
        });

        // randomNumberGenerator.setParams({
        //     "min": 0,
        //     "max": 1
        // });

        //Como hacemos una llamada asíncrona, necesitamos encolar la llamada para que se ejecute
        $A.enqueueAction(randomNumberGenerator); 
        //Hay que ponerlo SI O SI

    },
    topoClick: function(cmp, event, helper) { 
        /*Función que dispara un evento que luego manejamos con un handler 
        y sirve para saber si el topo sobre el que se ha hecho clic era correcto */
        var isTopo = cmp.get("v.isTopo"); //Recuperamos el valor del booleano isTopo, este valor se le da en la función doInit
        console.log("isTopo: " + isTopo); //Comprobacion por consola de que tiene valor
        var evt = $A.get("e.c:Puntuacion"); //Asignamos a evt el evento que queremos lanzar
        console.log("evt: " + evt); //Mostramos por consola el evento
        evt.setParams({ //Le asignamos los parámetros que queremos que tenga el evento
            "molePoint": isTopo ? 2 : 0 //Si isTopo es true, el topo da 2 puntos, si no, da 0
        });
        evt.fire(); //Lanzamos el evento
    }

})

