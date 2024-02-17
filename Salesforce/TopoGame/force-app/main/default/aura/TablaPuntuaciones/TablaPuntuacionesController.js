({
    myAction : function(component, event, helper) {

    },
    doInit: function(component) {
    
        //Guardamos en la variable getListScores la llamada al método getListScores del controlador de Apex
        var getListScores = component.get("c.getListScores"); 

        //Es una llamada asíncrona, cuando se reciba la respuesta se ejecutará la función que se le pasa como parámetro
        getListScores.setCallback(this, function(response){ 
            var state = response.getState(); //Recuperamos el estado de la respuesta que puede ser (SUCCESS, INCOMPLETE, ERROR, ABORTED)

            if(state === "SUCCESS"){ //Si la llamada al método getListScores ha sido exitosa, se ejecuta el siguiente código
                //Recuperamos la respuesta del controlador de Apex y la guardamos en la variable accounts
                var accounts = response.getReturnValue(); 

                //Cambiamos el array de puntuaciones por el que hemos recuperado del controlador de Apex
                component.set("v.puntuaciones", accounts); 
                //v.puntuaciones es un atributo de la vista, es un array del tipo Account[]
            }
        });
        //Ponemos en cola la llamada
        $A.enqueueAction(getListScores); //Hay que poner en cola la llamada para que se ejecute. ESTO ES NECESARIO PARA QUE FUNCIONE
    }
})
