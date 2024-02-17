({
    myAction: function (component, event, helper) {
    },
    doInit: function (component) {
        //Llamamos al método getListScores del controlador de Apex
        var getListScores = component.get("c.getListScores") 

        getListScores.setCallback(this, function (response) {
            var estadoDeLaPeticion = response.getState();
            if (estadoDeLaPeticion === "SUCCESS") {
                var accounts = response.getReturnValue();
                component.set("v.puntuaciones", accounts) //Cambiamos el valor del atributo puntuaciones por el valor obtenido de la base de datos
            }
        });
        $A.enqueueAction(getListScores); //Metemos la llamada al método getListScores en la cola de acciones
    },
    
    /*Método que llama al método resetScores del controlador de Apex para vaciar la base de datos y recarga la página */
    reset: function (component) {
        var resetScoresApex = component.get("c.resetScores")
        resetScoresApex.setCallback(this, function (response) {
            var estadoDeLaPeticion = response.getState();
            if (estadoDeLaPeticion === "SUCCESS") {
                alert("Puntuaciones reseteadas")
            }
        });
        $A.enqueueAction(resetScoresApex);
        
        setTimeout(function(){
            location.reload();
        }, 1000);
    },

    /*Método que llama al método getWinner del controlador de Apex para calcular el ganador y recarga la página */
    resultados: function (component){
        var getWinnerApex = component.get("c.getWinner")
        getWinnerApex.setCallback(this, function (response) {
            var estadoDeLaPeticion = response.getState();
            if (estadoDeLaPeticion === "SUCCESS") {
                alert("Puntuaciones calculadas")
            }
        });
        $A.enqueueAction(getWinnerApex);
        
        setTimeout(function(){
            location.reload();
        }, 1000);
    }
})
