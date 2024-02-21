public with sharing class repoApex {
    public repoApex() {

    }
    @AuraEnabled //Funcion que inserta el valor del string en la base de datos
    public static void insertStr(String str) {
        System.debug('str: ' + str);
        Account acc0;
        try{
            acc0 = [SELECT BillingStreet FROM Account WHERE Name = 'examen' LIMIT 1];
        }
        catch(Exception e){
            Account acc = new Account(Name = 'examen', BillingStreet = str);
            insert acc;
        }

        if(acc0 != null) {
            acc0.BillingStreet = str;
            update acc0;
            return;
        }else{
            Account acc = new Account(Name = 'examen', BillingStreet = str);
            try{
                insert acc;
            } catch(Exception e) {
                System.debug('Error: ' + e.getMessage());
            }
        }
    }

    @AuraEnabled //Funcion que obtiene el valor del string de la base de datos
    public static String getStr() {
        Account acc = [SELECT BillingStreet FROM Account WHERE Name = 'examen' LIMIT 1];
        return acc.BillingStreet;
    }

    @AuraEnabled //Funcion que elimina los registros de la base de datos
    public static void deleteRecords() {
        List<Account> acc = [SELECT Id FROM Account WHERE Name = 'examen'];
        if(acc.size() != 0) {
            try{
                delete acc;
            } catch(Exception e) {
                System.debug('Error: ' + e.getMessage());
            }
        }
    }

}