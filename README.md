Event Count Tracker.
====================

A small library to track count of events in Redis.It is very useful for tracking page views,page likes or any event happening on your page or website.

## Installation

  npm install event-count-tracker --save

## Usage

 var  eventTracker = require('../index'),
 eventTracking = eventTracker.eventTracking;
 var options={"total":true,"daily":true};
 var eventName='pv';//event name you want to track like page views
 eventTracking(eventName,options);


## Tests

  npm test