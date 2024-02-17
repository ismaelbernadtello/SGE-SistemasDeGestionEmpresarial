({
    myAction: function (component, event, helper) {
    },
    doInit: function (component) {

        var getListScores = component.get("c.getListScores")

        getListScores.setCallback(this, function (response) {
            var estadoDeLaPeticion = response.getState();
            if (estadoDeLaPeticion === "SUCCESS") {
                var accounts = response.getReturnValue();
                component.set("v.puntuaciones", accounts)

            }
        });
        $A.enqueueAction(getListScores);
    },
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
