import '../css/play.scss';

import * as moment from 'moment';
import * as workerTimers from 'worker-timers';

const socket = io(host);
socket.on('connect', function () {
    socket.emit('ready', gameMode);
});
socket.on('onlineCounter', function (data) {
    $(function () {
        $('#online-counter').text(data);
    });
});

const countdown5MinutesAudio = new Audio('/audio/5-minutes.wav');
const countdown3MinutesAudio = new Audio('/audio/3-minutes.wav');
const countdown1MinuteAudio = new Audio('/audio/1-minute.wav');
const countdown5Audio = new Audio('/audio/5.wav');
const countdown3Audio = new Audio('/audio/3.wav');
const countdown2Audio = new Audio('/audio/2.wav');
const countdown1Audio = new Audio('/audio/1.wav');
const countdown0Audio = new Audio('/audio/0.wav');
let currentTime, eventTime;
let ajaxInterval, countdownInterval;

$(function () {
    if ($('#step-1, #step-2').length === 0) {
        return;
    }

    getTimeFromServer().then(function () {
        startCountdown();
        ajaxInterval = workerTimers.setInterval(getTimeFromServer, 1000 * 30);
    });
});

function getTimeFromServer() {
    let ajaxTimeStart = moment();
    return $.get(`/api/countdown?gameMode=${gameMode}`, function (response) {
        // Add the number of ms it took for the Ajax request to complete
        let ajaxTime = moment().diff(ajaxTimeStart);
        currentTime = moment(response.data.currentTime).add(ajaxTime, 'milliseconds');
        eventTime = moment(response.data.eventTime);
    });
}

function startCountdown() {
    updateCountdown();
    countdownInterval = workerTimers.setInterval(updateCountdown, 100);
}

function updateCountdown() {
    let $countdown = $('#step-1 h1');

    let duration = moment.duration(eventTime.diff(currentTime));

    let m = duration.minutes();
    let s = duration.seconds();
    if (m < 1) {
        let ms = Math.floor(duration.milliseconds() / 100) * 100;
        $countdown.text(`${s}.${String(ms).charAt(0)}s`);

        if (s === 5 && ms === 0) {
            countdown5Audio.play().catch(function (err) {
                // Do nothing, just catch the error
            });
        }
        if (s === 3 && ms === 0) {
            countdown3Audio.play().catch(function (err) {
                // Do nothing, just catch the error
            });
        }
        if (s === 2 && ms === 0) {
            countdown2Audio.play().catch(function (err) {
                // Do nothing, just catch the error
            });
        }
        if (s === 1 && ms === 0) {
            countdown1Audio.play().catch(function (err) {
                // Do nothing, just catch the error
            });
        }
        if (s <= 0 && ms <= 0) {
            countdown0Audio.play().catch(function (err) {
                // Do nothing, just catch the error
            });
            workerTimers.clearInterval(countdownInterval);
            $countdown.text('Go!');
            $('#step-1 p').hide();
            setTimeout(onStep1End, 2500);
        }
    } else {
        $countdown.text(`${m}m ${s}s`);

        if (m === 5 && s === 0) {
            countdown5MinutesAudio.play().catch(function (err) {
                // Do nothing, just catch the error
            });
        }
        if (m === 3 && s === 0) {
            countdown3MinutesAudio.play().catch(function (err) {
                // Do nothing, just catch the error
            });
        }
        if (m === 1 && s === 0) {
            countdown1MinuteAudio.play().catch(function (err) {
                // Do nothing, just catch the error
            });
        }
    }

    currentTime.add(100, 'milliseconds');
}

function onStep1End() {
    $('#step-1').fadeOut(250, function () {
        $('#step-2').fadeIn(300, function () {
            // Fading animations complete
            workerTimers.clearInterval(ajaxInterval);
            workerTimers.setTimeout(() => {
                window.location.reload();
            }, 1000 * 120);
        });
    });

    // Update information about all matches
    socket.on('playerJoinedMatch', function (data) {
        let sessionIdSubstr = data.sessionId.substr(data.sessionId.length - 3);
        let $card = $(`#step-2 .row .col-4:contains(${sessionIdSubstr})`);
        if ($card.length > 0) {
            let $badge = $card.find('.badge');
            let $i = $badge.find('i');
            $badge.html(`${data.cardinality} `);
            $badge.append($i);
        } else {
            $('#step-2 .row').append(`<div class="col-4 mb-1"><div class="bg-light p-2 border rounded text-center">${sessionIdSubstr} <span class="badge badge-dark">${data.cardinality} <i class="fas fa-users"></i></span></div></div>`);
        }
    });

    // Update information about this user's match
    socket.on(userId, function (data) {
        $('#in-match-counter').text(data);
    });
}
