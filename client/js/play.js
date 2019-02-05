import '../css/play.scss';

import {addMilliseconds, differenceInMilliseconds, differenceInMinutes, differenceInSeconds} from 'date-fns';
import * as workerTimers from 'worker-timers';

var countdown5MinutesAudio = new Audio('/audio/5-minutes.wav');
var countdown1MinuteAudio = new Audio('/audio/1-minute.wav');
var countdownStartingBronze = new Audio('/audio/5.wav');
var countdown3Audio = new Audio('/audio/3.wav');
var countdown2Audio = new Audio('/audio/2.wav');
var countdown1Audio = new Audio('/audio/1.wav');
var countdown0Audio = new Audio('/audio/0.wav');
let timerInterval;

let currentTime, eventTime;

$(function () {
    var ajaxTimeStart = Date.now();
    $.get('/api/countdown', function (data) {
        // Add the number of ms it took for the AJAX request to complete
        let ajaxTime = Date.now() - ajaxTimeStart;
        currentTime = addMilliseconds(new Date(data.currentTime), ajaxTime);
        eventTime = new Date(data.eventTime);
    });

    startTimer();

    $('button').click(function (event) {
        event.preventDefault();
        $.ajax({
            url: '/api/matches/abc',
            type: 'PUT',
            success: function (result) {
                console.log(result);
            }
        });
    });
});

function startTimer() {
    updateTimer();
    timerInterval = workerTimers.setInterval(updateTimer, 100);
}

function updateTimer() {
    let m = differenceInMinutes(eventTime, currentTime);
    let s = differenceInSeconds(eventTime, currentTime) % 60;
    if (m < 1) {
        let ms = Math.floor((differenceInMilliseconds(eventTime, currentTime) % 1000) / 100) * 100;
        $('#countdown').text(`${s}.${String(ms).charAt(0)}s`);

        if (s === 5 && ms === 0) {
            countdownStartingBronze.play();
        }
        if (s === 3 && ms === 0) {
            countdown3Audio.play();
        }
        if (s === 2 && ms === 0) {
            countdown2Audio.play();
        }
        if (s === 1 && ms === 0) {
            countdown1Audio.play();
        }
        if (s === 0 && ms === 0) {
            countdown0Audio.play();
            workerTimers.clearInterval(timerInterval);
        }
    } else {
        $('#countdown').text(`${m}m ${s}s`);

        if (m === 5 && s === 0) {
            countdown5MinutesAudio.play()
        }
        if (m === 1 && s === 0) {
            countdown1MinuteAudio.play()
        }
    }
    currentTime = addMilliseconds(currentTime, 100);
}
