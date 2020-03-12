public with sharing class testApexController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT Id, LastName, FirstName, Phone, Email 
            FROM Contact 
            LIMIT 50000
        ];
    }

}
