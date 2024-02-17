({
    myAction : function(component, event, helper) {

    },

    //Funcion que se encarga de actualizar el atributo marcador cada vez que se ejecuta el evento Puntuacion
    manejarEvento : function(component, event, helper) {
        var pointsToAdd = event.getParam("molePoint"); //Recuperamos el valor del evento Puntuacion. Este puede ser 2 o 0 puntos
        var marcador = component.get("v.marcador"); //Recuperamos el valor del atributo marcador
        if (pointsToAdd == 0){ //Si el valor del evento es 0, el marcador se reinicia.
            marcador = 0; 
        }else{
            marcador += pointsToAdd; //Sino se le suma el valor del evento al marcador
        }
        component.set("v.marcador", marcador); //Actualizamos el valor del atributo marcador
    },

    guardarScore : function(component, event, helper) {
        //Almacenamos en la variable insertScoreApex la llamada al método insertScore del controlador de Apex
        var insertScoreApex = component.get("c.insertScore"); 

        //Recuperamos el valor del input con el string del nombre del jugador
        var jugador = component.find("nombrejugador").getElement().value;
        console.log("jugador: " + component.find("nombrejugador").getElement().value);

        
        //Funcion que se ejecuta cuando el servidor responde
        insertScoreApex.setCallback(this, function(response){
            var state = response.getState(); //Recuperamos el estado de la respuesta que puede ser (SUCCESS, INCOMPLETE, ERROR, ABORTED)
            if(state === "SUCCESS"){ //Si la llamada al método insertScore ha sido exitosa, se ejecuta el siguiente código
                alert("exito"); //Mostramos un mensaje de éxito
            }
        });
        insertScoreApex.setParams({ //Le asignamos los parámetros que queremos que tenga la llamada al método insertScoreApex
            "nombre": jugador,
            "puntuacion": component.get("v.marcador")
        });

        //Ponemos en cola la llamada
        $A.enqueueAction(insertScoreApex); 
    },
})
