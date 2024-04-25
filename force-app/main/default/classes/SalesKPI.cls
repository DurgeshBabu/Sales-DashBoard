public with sharing class SalesKPI {
    public with sharing class YourApexClass {
        @AuraEnabled(cacheable=true)
        public static List<ProductWrapper> getProducts() {
            List<ProductWrapper> products = new List<ProductWrapper>();
            
            // Query for products
            List<Product__c> productRecords = [SELECT Id, Name, Quantity__c, Amount__c FROM Product__c];
            
            // Convert records to wrapper objects
            for (Product__c record : productRecords) {
                ProductWrapper wrapper = new ProductWrapper();
                wrapper.Id = record.Id;
                wrapper.Name = record.Name;
                wrapper.Quantity = record.Quantity__c;
                wrapper.Amount = record.Amount__c;
                products.add(wrapper);
            }
            
            return products;
        }
    
        public class ProductWrapper {
            @AuraEnabled
            public Id Id { get; set; }
            @AuraEnabled
            public String Name { get; set; }
            @AuraEnabled
            public Integer Quantity { get; set; }
            @AuraEnabled
            public Decimal Amount { get; set; }
        }
    }
    
}