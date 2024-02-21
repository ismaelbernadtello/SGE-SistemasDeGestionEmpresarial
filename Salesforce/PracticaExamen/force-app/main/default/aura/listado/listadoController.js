({
    myAction : function(component, event, helper) {

    },

    doInit : function(component, event, helper) {
        var getStrApex = component.get("c.getStr"); //Obtenemos el metodo getStr del controlador de Apex

        getStrApex.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var response = String(response.getReturnValue()); 
                //Separamos el valor devuelto por el metodo getStr del controlador de Apex por las comas y lo guardamos en un array
                var strs = response.split(','); 
                //Guardamos el array de strings en el atributo strings de la vista
                component.set("v.strings", strs); 
            }else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(getStrApex);
    },
})
