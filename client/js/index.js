import '../css/index.scss';

// @formatter:off
import jQuery from 'jquery/dist/jquery.slim'
window.$ = window.jQuery = jQuery;
import 'popper.js';
import 'bootstrap';
// @formatter:on

import {addMilliseconds, differenceInMilliseconds, differenceInMinutes, differenceInSeconds} from 'date-fns';
import * as workerTimers from 'worker-timers';

var countdown3Audio = new Audio('/audio/countdown-3.mp3');
var countdown2Audio = new Audio('/audio/countdown-2.mp3');
var countdown1Audio = new Audio('/audio/countdown-1.mp3');
var countdown0Audio = new Audio('/audio/countdown-0.mp3');
let timerInterval;

$(function () {
    // Add the number of ms it took for jQuery to become ready
    var timeToLoad = new Date() - timeToLoadStart;
    addMilliseconds(currentTime, timeToLoad);

    // TODO Remove this
    eventTime = addMilliseconds(currentTime, 5000);

    startTimer();
});

function startTimer() {
    updateTimer();
    timerInterval = workerTimers.setInterval(updateTimer, 100);
}

function updateTimer() {
    let m = differenceInMinutes(eventTime, currentTime);
    if (m < 1) {
        let s = differenceInSeconds(eventTime, currentTime) % 60;
        let ms = Math.round((differenceInMilliseconds(eventTime, currentTime) % 1000) / 100) * 100;
        $('#time').text(`${s}.${String(ms).charAt(0)}s`);

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
        $('#time').text(`${m}m ${differenceInSeconds(eventTime, currentTime) % 60}s`);
    }
    currentTime = addMilliseconds(currentTime, 100);
}
