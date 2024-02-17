({
    myAction : function(component, event, helper) {

    },
    doInit: function(component) {
    
        //De aquí se devuelve la respuesta de la llamada al método getListScores del controlador de Apex
        var getListScores = component.get("c.getListScores"); 

        //Es una llamada asíncrona, cuando se reciba la respuesta se ejecutará la función que se le pasa como parámetro
        getListScores.setCallback(this, function(response){ 
            var state = response.getState(); //Recuperamos el estado de la respuesta que puede ser (SUCCESS, INCOMPLETE, ERROR, ABORTED)
            if(state === "SUCCESS"){ //Si la llamada al método getListScores ha sido exitosa, se ejecuta el siguiente código
                var accounts = response.getReturnValue(); //Recuperamos el valor de la llamada al controlador
                component.set("v.puntuaciones", accounts); //Guardamos en el atributo puntuaciones el valor de la respuesta
                //v.puntuaciones es un atributo de la vista, que se puede usar para mostrar los datos en la vista
            }
        });

        $A.enqueueAction(getListScores); 

    }
})
