({
    doInit : function(component, event, helper) {
        var getRoundApex = component.get("c.getRound");
        getRoundApex.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var round = response.getReturnValue();
                component.set("v.round", round);
            }else{
                return NaN;
            }
        });
        $A.enqueueAction(getRoundApex);

        var getPlayerApex = component.get("c.getPlayer");
        getPlayerApex.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var player = response.getReturnValue();
                component.set("v.playerNumber", player);
            }else{
                return NaN;
            }
        });
        $A.enqueueAction(getPlayerApex);
    },

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
   
    play : function(component, event, helper) {
        var playerChoice = component.get("v.playerChoice");
        var playerNumber = component.get("v.playerNumber");
        var round = component.get("v.round");
        var insertRoundApex = component.get("c.insertRound");
        console.log("playerChoice: " + playerChoice + " playerNumber: " + playerNumber + " round: " + round);
        insertRoundApex.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                console.log("Success");
            }else{
                console.log(response.getError());
            }
        });

        insertRoundApex.setParams({
            "round": round,
            "playerNumber": playerNumber,
            "playerChoice": playerChoice,
        });
        $A.enqueueAction(insertRoundApex);
        
        setTimeout(function(){
            location.reload();
        }, 100);
    }


})
