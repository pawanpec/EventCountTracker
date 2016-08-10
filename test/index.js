var should = require('chai').should();
 var eventTracker = require('../index');
 var   eventTracking = eventTracker.eventTracking;
describe('#eventTracking', function() {
    it('EventCountTrackingTest with options', function() {
        var options={"total":true,"daily":true};
        var eventName='pv';
        eventTracking(eventName,options);
    });
});
describe('#eventTracking', function() {
    it('EventCountTrackingTest with empty options', function() {
        var options={"total":true,"daily":true};
        var eventName='pv';
        eventTracking(eventName,{});
    });
});
describe('#eventTracking', function() {
    it('EventCountTrackingTest with options not provided', function() {
        var options={"total":true,"daily":true};
        var eventName='pv';
        eventTracking(eventName);
    });
});
describe('#eventTracking', function() {
    it('EventCountTrackingTest with options is null', function() {
        var options={"total":true,"daily":true};
        var eventName='pv';
        eventTracking(eventName,null);
    });
});