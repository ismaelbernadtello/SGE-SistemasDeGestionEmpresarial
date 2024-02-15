( //Hace que el codigo que tenga dentro se inicialice como un objeto
    { //Esto es un objeto de JavaScript

    saludar : function(component, event, helper) {
        alert("antes eras "+component.get("v.nombre")+" y ahora eres Alert!");
        component.set("v.nombre", "Alert!");
        
        //triggers an event Lanza un evento
        //$A.get es un metodo de Aura que obtiene un evento
        // e.c:evtData es el nombre del evento que vamos a buscar
        var evt = $A.get("e.c:evtData");
        var obj =     { //Ejemplo de como se crearia un objeto en JS
            "nombre" : component.get("v.nombre"), //Obtiene el valor del input nombre de la vista
            "apellido" : "Alert!",
            };
        evt.setParams(obj); //Rellena los parametros del evento con el objeto que hemos creado y tiene atributos nombre y apellido
        evt.fire(); //Dispara el evento
    }

    }
)

