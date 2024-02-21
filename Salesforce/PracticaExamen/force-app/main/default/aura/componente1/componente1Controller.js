({
    myAction : function(component, event, helper) {

    },
    uno : function(component, event, helper) { //Funcion que se ejecuta al hacer click en el boton 1 y que dispara el evento pasando el valor 1
        component.set("v.selectedNum", "1"); //Seteamos el valor del atributo selectedNum
        var numero = component.get("v.selectedNum"); //Obtenemos el valor del atributo selectedNum
        console.log('numero: ' + numero);
        var evt = $A.get("e.c:mensajeEvt"); //Obtenemos el evento
        console.log('evt: ' + evt);
        evt.setParams({ //Seteamos el valor del mensaje
            "mensaje": numero
        });
        console.log('mensaje: ' + evt.getParam("mensaje"));
        evt.fire();//disparamos el evento
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
