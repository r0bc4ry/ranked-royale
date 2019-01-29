var ranks = require('../ranks');

var addHours = require('date-fns/add_hours');
var getDate = require('date-fns/get_date');
var getHours = require('date-fns/get_hours');
var getMinutes = require('date-fns/get_minutes');
var getMonth = require('date-fns/get_month');
var getTime = require('date-fns/get_time');
var getYear = require('date-fns/get_year');
var startOfHour = require('date-fns/start_of_hour');
var setMinutes = require('date-fns/set_minutes');

module.exports = function () {
    let currentTime = new Date();

    // TODO Get user's rank

    let rank = ranks.find(x => {
        return x.name === 'Bronze'
    });

    // TODO Check if rank exists?

    let eventTime = null;

    for (let minutes of rank.minutes) {
        if (minutes > getMinutes(currentTime)) {
            eventTime = new Date(getYear(currentTime), getMonth(currentTime), getDate(currentTime), getHours(currentTime), minutes, 0, 0);
            break;
        }
    }

    if (eventTime === null) {
        eventTime = setMinutes(startOfHour(addHours(currentTime, 1)), rank.minutes[0]);
    }

    return {
        currentTime: getTime(currentTime),
        eventTime: getTime(eventTime)
    };
};
