public with sharing class RandomApex { 
    public RandomApex() { 

    }

    //Devuelve un número aleatorio entre 0(incluido) y 1(sin incluir)
    @AuraEnabled
    public static Double random() {
        return Math.random(); 
    }

    @AuraEnabled
    public static Void insertScore(String nombre, String puntuacion) {
        /*Name y DunsNumber son columnas de la tabla Account. 
        Cuando tengamos que usar más tenemos que mirar cuales existen y elegir cualquiera que coincida el tipo de dato*/

        Account account = new Account(Name=nombre, DunsNumber=puntuacion);
        insert account; //Se añade el registro a la base de datos

        //También se puede hacer: delete account, con este se elimina el registro de la base de datos
        //Si quisieramos hacer un update, sería:
        /*
        Account[] accounts =[SELECT Name, DunsNumber
                        FROM Account WHERE DunsNumber=:condition limit 1]; Primero se hace una consulta para obtener el registro que queremos modificar
        accounts[0].DunsNumber = '1234567890';                             Se modifica el registro
        UPDATE accounts;                                                   Se actualiza el registro
        */
    }

    @AuraEnabled
    public static List<Account> getListScores(){
        try {
            //Se hace una consulta SELECT a la base de datos. 
            //Account es una tabla de la base de datos de Salesforce, en la que hemos elegido guardar el nombre y la puntuación
            Account[] accounts = [SELECT Name, DunsNumber FROM Account]; 
            return accounts; //Se devuelve la lista de registros
            
        } catch (Exception e) { //Si hay un error, se devuelve un mensaje de error
            throw new AuraHandledException(e.getMessage());
        }
    }
}