/**
 * Created by ttnd on 10/8/16.
 */
var redis = require('redis');
var config = require('./config.json');
var client = redis.createClient(config.redis.port,config.redis.host);
var async = require('async');
/**
 * Track Event count in Redis based upon event name.
 *
 * @param  {String} html
 * @return {String}
 */
module.exports = {
    eventTracking: function (eventName, options) {

        // Use connect method to connect to the Server
        var dateTime = new Date();
        var d = dateTime.toDateString();
        var timeInSec = new Date(d).getTime();
        if(typeof(options)=='undefined'||options==null){
            console.log(options);
            options={};
            options.total=true;
        }
        if(Object.keys(options).length===0){
            options.total=true;
        }
        if (options.total) {
            console.log(eventName);
            client.incr(eventName, function (err, reply) {
                console.log(reply);
            });
        }
        if (options.daily) {
            var keyD = eventName + "." + timeInSec;
            console.log(keyD);
            client.incr(keyD, function (err, count) {
                console.log(count);
                return count;
            });
        }

    },
    getEventCount:function (eventName,options) {
        var dateTime = new Date();
        var d = dateTime.toDateString();
        var timeInSec = new Date(d).getTime();
        var data={count:{}};
        if(typeof(options)=='undefined'||options==null){
            options={};
            options.total=true;
        }
        if(Object.keys(options).length===0){
            options.total=true;
        }
        async.parallel([
            function (callback) { //This is the first task, and `callback` is its callback task
                if (options.total) {
                    client.get(eventName, function (err, count) {
                        data['count']['total'] = count;
                        callback(null,count);
                    });
                }
            },

            function(callback) { //This is the second task, and `callback` is its callback task
                if (options.daily) {
                    var keyD = eventName + "." + timeInSec;
                    client.get(keyD, function (err, count) {
                        data['count']['daily']=count;
                        callback(null,count);
                    });
                }
            }
        ], function(err,results) { //This is the final callback
            console.log(results);
            console.log(data);
        });
        return data;
    }
}