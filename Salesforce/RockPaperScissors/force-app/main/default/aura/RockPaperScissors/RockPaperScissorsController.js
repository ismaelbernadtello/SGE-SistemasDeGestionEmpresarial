({
    /*Al cargar la página se llama al método getRoundApex para obtener el número de ronda 
    y al método getPlayerApex para obtener el número de jugador*/
    doInit : function(component, event, helper) {
        var getRoundApex = component.get("c.getRound");
        getRoundApex.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var round = response.getReturnValue(); 
                component.set("v.round", round); //Cambiamos el valor del atributo round por el valor obtenido de la base de datos
            }else{
                return NaN;
            }
        });
        $A.enqueueAction(getRoundApex); //Metemos la llamada al método getRoundApex en la cola de acciones

        var getPlayerApex = component.get("c.getPlayer");
        getPlayerApex.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var player = response.getReturnValue();
                component.set("v.playerNumber", player); //Cambiamos el valor del atributo playerNumber por el valor obtenido de la base de datos
            }else{
                return NaN;
            }
        });
        $A.enqueueAction(getPlayerApex); //Metemos la llamada al método getPlayerApex en la cola de acciones
    },

    /*Métodos que cambian el valor del atributo playerChoice según el botón/imagen en la que hace clic el jugador */
    rock : function(component, event, helper) {
        //alert('You selected Rock');
        component.set("v.playerChoice", "Rock");
    },
    paper : function(component, event, helper) {
        //alert('You selected Paper');
        component.set("v.playerChoice", "Paper");
    },
    scissors : function(component, event, helper) {
        //alert('You selected Scissors');
        component.set("v.playerChoice", "Scissors");
    },

    /*Método que llama al método insertRoundApex para insertar en la base de datos el número de ronda, el número de jugador y la elección del jugador*/
    play : function(component, event, helper) {
        var playerChoice = component.get("v.playerChoice"); //Obtenemos el valor del atributo playerChoice
        var playerNumber = component.get("v.playerNumber"); //Obtenemos el valor del atributo playerNumber
        var round = component.get("v.round"); //Obtenemos el valor del atributo round

        var insertRoundApex = component.get("c.insertRound"); //Llamamos al método insertRoundApex
        console.log("playerChoice: " + playerChoice + " playerNumber: " + playerNumber + " round: " + round);

        insertRoundApex.setCallback(this, function(response){ //Callback del método insertRoundApex
            var state = response.getState();
            if(state === "SUCCESS"){
                console.log("Success");
            }else{
                console.log(response.getError());
            }
        });

        insertRoundApex.setParams({ //Pasamos los parámetros al método insertRoundApex
            "round": round,
            "playerNumber": playerNumber,
            "playerChoice": playerChoice,
        });
        $A.enqueueAction(insertRoundApex); //Metemos la llamada al método insertRoundApex en la cola de acciones
        
        setTimeout(function(){ //Recargamos la página para que el jugador pueda volver a jugar otra ronda
            location.reload();
        }, 100);
    }

})
