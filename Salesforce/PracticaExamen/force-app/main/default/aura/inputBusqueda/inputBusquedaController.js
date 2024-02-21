({
    myAction : function(component, event, helper) {
    },
    buscar : function(component, event, helper) {
        // Obtenemos el valor del campo de texto
        var getStrApex = component.get("c.getStr"); //Obtenemos el metodo getStr del controlador de Apex
        //Obtenemos el valor del input de busqueda
        var busqueda = component.find("inputBusqueda").getElement().value; 
        
        getStrApex.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                console.log("Success");
                //Obtenemos el valor devuelto por el metodo getStr del controlador de Apex
                var response = String(response.getReturnValue()); 
                //Separamos el valor devuelto por el metodo getStr del controlador de Apex por las comas y lo guardamos en un array
                var grabacionesSeparadas = response.split(','); 
                
                // Guardamos el valor de la busqueda en el atributo solucionBusqueda
                component.set("v.solucionBusqueda",grabacionesSeparadas[busqueda-1]);
            }else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(getStrApex); //Metemos en la cola de acciones el metodo getStr del controlador de Apex
    }
})