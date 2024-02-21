({
    myAction : function(component, event, helper) {

    },
    uno : function(component, event, helper) {
        component.set("v.selectedNum", "1");
        var numero = component.get("v.selectedNum");
        console.log('numero: ' + numero);
        var evt = $A.get("e.c:mensajeEvt");
        console.log('evt: ' + evt);
        evt.setParams({
            "mensaje": numero 
        });
        console.log('mensaje: ' + evt.getParam("mensaje"));
        evt.fire();//fire 
    },
    dos : function(component, event, helper) {
        component.set("v.selectedNum", "2");
        var numero = component.get("v.selectedNum");
        console.log('numero: ' + numero);
        var evt = $A.get("e.c:mensajeEvt");
        console.log('evt: ' + evt);
        evt.setParams({
            "mensaje": numero 
        });
        console.log('mensaje: ' + evt.getParam("mensaje"));
        evt.fire();//fire 
    },
    tres : function(component, event, helper) {
        component.set("v.selectedNum", "3");
        var numero = component.get("v.selectedNum");
        console.log('numero: ' + numero);
        var evt = $A.get("e.c:mensajeEvt");
        console.log('evt: ' + evt);
        evt.setParams({
            "mensaje": numero 
        });
        console.log('mensaje: ' + evt.getParam("mensaje"));
        evt.fire();//fire 
    }

})
