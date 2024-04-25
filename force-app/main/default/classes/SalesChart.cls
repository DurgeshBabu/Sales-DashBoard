public with sharing class SalesChart {
    @AuraEnabled(cacheable=true)
    public static List<Integer> getSalesData() {
        List<Integer> salesData = new List<Integer>();
        
        // Query for sales data
        List<AggregateResult> results = [SELECT SUM(Amount__c) totalAmount FROM Sales_Data__c GROUP BY CreatedDate ORDER BY CreatedDate DESC LIMIT 7];
        
        // Extract sales amount from records
        for (AggregateResult result : results) {
            Decimal totalAmount = (Decimal)result.get('totalAmount');
            salesData.add(totalAmount.intValue());
        }
        
        return salesData;
    }
}