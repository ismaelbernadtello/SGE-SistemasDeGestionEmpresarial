({
    


    saludar : function(component, event, helper) {
        alert("antes eras "+component.get("v.nombre")+" y ahora eres Alert!");
        component.set("v.nombre", "Alert!");
        //triggers an event
        var evt = $A.get("e.c:evtData");
        var obj =     {
            "nombre" : component.get("v.nombre"),
            "apellido" : "Alert!",
            };
        evt.setParams(obj);
        evt.fire();
    }

})

