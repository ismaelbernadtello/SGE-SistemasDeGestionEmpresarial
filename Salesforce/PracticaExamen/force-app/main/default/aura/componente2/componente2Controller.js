({
    myAction : function(component, event, helper) {

    },
    //Funcion que se ejecuta al hacer click en el boton grabar y que cambia el valor del atributo recording a true y concatena una coma al atributo str
    grabar : function(component, event, helper) {
        component.set("v.recording", true); //Seteamos el valor del atributo booleano recording
        var str = component.get("v.str") //Obtenemos el valor del atributo str

        //Si el atributo str no esta vacio y el ultimo caracter no es una coma, le concatenamos una coma
        if(str != '' && (str.charAt(str.length-1) != ',')){ 
            str += ',';
            component.set("v.str", str);
        }
        console.log('recording: ' + component.get("v.recording"));
    },

    //Funcion que se ejecuta al hacer click en el boton stop y que cambia el valor del atributo recording a false
    stop : function(component, event, helper) { 
        component.set("v.recording", false);
        console.log('recording: ' + component.get("v.recording"));
    },

    //Funcion que se ejecuta al hacer click en el boton play y que llama al metodo getStr del controlador de Apex
    play : function(component, event, helper) {
        var getStrApex = component.get("c.getStr"); //Obtenemos el metodo getStr del controlador de Apex
        
        getStrApex.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                console.log("Success");
                //Obtenemos el valor devuelto por el metodo getStr del controlador de Apex
                var response = String(response.getReturnValue()); 
                //Separamos el valor devuelto por el metodo getStr del controlador de Apex por las comas y lo guardamos en un array
                var strs = response.split(','); 
                for(var i = 0; i < strs.length; i++){
                    var mensaje = strs[i];
                    console.log('jugada ' + (i+1) + ': ' + mensaje);
                    //component.set("v.str", mensaje);
                }
            }else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(getStrApex); //Metemos en la cola de acciones el metodo getStr del controlador de Apex
    },

    //Funcion que se ejecuta al hacer click en el boton guardar y que llama al metodo insertStr del controlador de Apex pasandole el valor del atributo str
    guardar : function(component, event, helper) {
        var str = component.get("v.str")
        
        console.log('recording: ' + component.get("v.recording"));
        
        var insertStrApex = component.get("c.insertStr");
        
        insertStrApex.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                console.log("Success");
            }else{
                console.log(response.getError());
            }
        });
        insertStrApex.setParams({ //Pasamos el valor del atributo str al metodo insertStr del controlador de Apex
            "str": str
        });
        $A.enqueueAction(insertStrApex); //Metemos en la cola de acciones el metodo insertStr del controlador de Apex
    },

    //Funcion que se ejecuta al recibir el evento y que concatena el valor del mensaje al atributo str
    handleEvent : function(component, event, helper) {
        var recording = component.get("v.recording"); //Obtenemos el valor del atributo recording
        console.log('recording: ' + recording);
        
        if(!recording){
            return;//Si no se esta grabando, sales de la función
        }

        var mensaje = event.getParam("mensaje"); //Obtenemos el valor del mensaje

        console.log('mensaje: ' + mensaje);
        var str = component.get("v.str") //Obtenemos el valor del atributo str
        str += mensaje; //Concatenamos el valor del mensaje al atributo str
        component.set("v.str", str); //Seteamos el valor del atributo str
        console.log('str: ' + str);
    },
    
    //Funcion
    borrar : function(component, event, helper) {
        var deleteApex = component.get("c.deleteRecords");
        
        deleteApex.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                console.log("Success");
            }else{
                console.log(response.getError());
            }
        });
        alert('Se han borrado los registros');
        $A.enqueueAction(deleteApex); //Metemos en la cola de acciones el metodo deleteRecords del controlador de Apex
    },
})
