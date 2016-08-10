/**
 * Created by ttnd on 10/8/16.
 */
var redis = require('redis');
var config = require('./config.json');
var client = redis.createClient(config.redis.port,config.redis.host);

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

    }
}