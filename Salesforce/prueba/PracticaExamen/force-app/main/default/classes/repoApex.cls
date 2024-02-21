public with sharing class repoApex {
    public repoApex() {

    }
    @AuraEnabled
    public static void insertStr(String str) {
        System.debug('str: ' + str);
        Account acc0 = [SELECT BillingStreet FROM Account WHERE Name = 'examen' LIMIT 1];
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

    @AuraEnabled
    public static String getStr() {
        Account acc = [SELECT BillingStreet FROM Account WHERE Name = 'examen' LIMIT 1];
        return acc.BillingStreet;
    }
}