({
    myAction : function(component, event, helper) {

    },

    // Es como un diccionario la key es el nombre del evento y el value es el nombre de la función
    saludar : function(component, event, helper) {
        alert("Antes de darle al botón ponía: " + component.get("v.nombre"));
        component.set("v.nombre", "Alert!");
        alert("Después de darle al botón pone: " + component.get("v.nombre"));
    }

})
