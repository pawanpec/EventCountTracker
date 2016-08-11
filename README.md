Event Count Tracker.
====================

A small and simple library to track count of events in Redis.It is very useful for tracking page views,page likes or any event happening on your page or website.

## Installation

  npm install event-count-tracker --save
  update your redis server details in config.json.
   
   {
      "redis":{
        "host":"127.0.0.1",
        "port":6379
      }
   }

## Usage

 var eventTracker = require('event-count-tracker');

 var options={"total":true,"daily":true};

 var eventName='pv';//event name you want to track like page views
 
 eventTracker.eventTracking(eventName,options);

## How it works

By Default if you do not pass options or options is empty ,total count of the event is tracked.
If you want to track the daily count of event pass daily true in options object.

key for daily count for event will be <EventName>.<Date in miliseconds> (not date time);

eg. pv.1470767400000
## Tests

  npm test