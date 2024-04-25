trigger RealTimeDataUpdateTrigger on Account (after insert) {
    //publish a event platform
    RealTimeUpdateEvent__e event = new RealTimeUpdateEvent__e();
    event.message__c = 'New Account was Created';
    EventBus.publish(event);
}