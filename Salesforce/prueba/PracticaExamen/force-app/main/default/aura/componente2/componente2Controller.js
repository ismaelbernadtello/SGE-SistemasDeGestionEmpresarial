({
    myAction : function(component, event, helper) {

    },
    grabar : function(component, event, helper) {
        //alert('Grabar');
        component.set("v.recording", true);
        var str = component.get("v.str")
        if(str != ''){
            str += ',';
            component.set("v.str", str);
        }
        console.log('recording: ' + component.get("v.recording"));
    },
    stop : function(component, event, helper) {
        //alert('Stop');
        component.set("v.recording", false);
        console.log('recording: ' + component.get("v.recording"));
    },
    play : function(component, event, helper) {
        //('Play');
        var getStrApex = component.get("c.getStr");
        
        getStrApex.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                console.log("Success");
                var response = String(response.getReturnValue());
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

        $A.enqueueAction(getStrApex);
        
    },
    guardar : function(component, event, helper) {
        //alert('Guardar');
        var str = component.get("v.str")
        //str += '\n';
        
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

        insertStrApex.setParams({
            "str": str
        });
        $A.enqueueAction(insertStrApex);
    
    },
    handleEvent : function(component, event, helper) {
        //alert('handleEvent');
        var recording = component.get("v.recording");
        console.log('recording: ' + recording);
        
        if(!recording){
            return;//sales de la función
        }

        var mensaje = event.getParam("mensaje");

        console.log('mensaje: ' + mensaje);
        var str = component.get("v.str")
        str += mensaje;
        component.set("v.str", str);
        console.log('str: ' + str);
    }
})
