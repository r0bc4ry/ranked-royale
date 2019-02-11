import '../css/play.scss';

import {addMilliseconds, differenceInMilliseconds, differenceInMinutes, differenceInSeconds} from 'date-fns';
import * as workerTimers from 'worker-timers';

const socket = io('http://localhost:3000/');

var countdown5MinutesAudio = new Audio('/audio/5-minutes.wav');
var countdown3MinutesAudio = new Audio('/audio/3-minutes.wav');
var countdown1MinuteAudio = new Audio('/audio/1-minute.wav');
var countdownStartingBronze = new Audio('/audio/5.wav');
var countdown3Audio = new Audio('/audio/3.wav');
var countdown2Audio = new Audio('/audio/2.wav');
var countdown1Audio = new Audio('/audio/1.wav');
var countdown0Audio = new Audio('/audio/0.wav');
let currentTime, eventTime;
let countdownInterval;

$(function () {
    var ajaxTimeStart = Date.now();
    $.get('/api/countdown', function (response) {
        // Add the number of ms it took for the Ajax request to complete
        let ajaxTime = Date.now() - ajaxTimeStart;
        currentTime = addMilliseconds(new Date(response.data.currentTime), ajaxTime);
        eventTime = new Date(response.data.eventTime);
        eventTime = addMilliseconds(currentTime, 1000);
        startCountdown();
    });

    socket.on('onlineCounter', function (data) {
        $('#online-counter').text(data);
    });

    $('#step-2 .form-control').keypress(onStep2InputKeypress);
    $('#step-2 button').click(onStep2ButtonClick);
});

function startCountdown() {
    updateCountdown();
    countdownInterval = workerTimers.setInterval(updateCountdown, 100);
}

function updateCountdown() {
    let countdown = $('#step-1 h1');

    let m = differenceInMinutes(eventTime, currentTime);
    let s = differenceInSeconds(eventTime, currentTime) % 60;
    if (m < 1) {
        let ms = Math.floor((differenceInMilliseconds(eventTime, currentTime) % 1000) / 100) * 100;
        countdown.text(`${s}.${String(ms).charAt(0)}s`);

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
        if (s <= 0 && ms <= 0) {
            countdown0Audio.play();
            workerTimers.clearInterval(countdownInterval);
            countdown.text('Go!');
            $('#step-1 p').hide();
            setTimeout(onStep1End, 2500);
        }
    } else {
        countdown.text(`${m}m ${s}s`);

        if (m === 5 && s === 0) {
            countdown5MinutesAudio.play()
        }
        if (m === 3 && s === 0) {
            countdown3MinutesAudio.play()
        }
        if (m === 1 && s === 0) {
            countdown1MinuteAudio.play()
        }
    }
    currentTime = addMilliseconds(currentTime, 100);
}

function onStep1End() {
    $('#step-1').fadeOut(250, function () {
        $('#step-2').fadeIn(300, function () {
            // Fading animations complete
        });
    });
}

function onStep2InputKeypress(event) {
    let code = event.keyCode || event.which;
    if (code === 13) {
        onStep2ButtonClick(event);
    }
}

function onStep2ButtonClick(event) {
    event.preventDefault();

    let alert = $('#step-2 .alert.alert-danger');
    alert.addClass('d-none');

    // Validate form
    let form = $('#step-2 .needs-validation').get(0);
    let isValid = form.checkValidity();
    $(form).addClass('was-validated');
    if (isValid === false) {
        return;
    }

    // Disable button and show spinner
    let button = $('#step-2 .btn.btn-primary');
    let buttonHtml = button.html();
    button.html('<span class="spinner-border spinner-border-sm"></span> Loading...');
    button.attr('disabled', true);

    let serverId = $('#step-2 input[name=serverId]').val();

    // Send Ajax
    $.ajax({
        url: `/api/matches/${serverId}`,
        type: 'PUT'
    }).done(function (response) {
        $('#in-match-counter').text(response.data);
        socket.on(serverId, function (data) {
            $('#in-match-counter').text(data);
            if (data < 5) {
                $('#step-3 .alert.alert-warning').removeClass('d-none');
            } else {
                $('#step-3 .alert.alert-warning').addClass('d-none');
            }
        });
        onStep2End();
    }).fail(function (response) {
        // Error
        button.html(buttonHtml);
        button.attr('disabled', false);
        alert.text(response.responseJSON.message ? response.responseJSON.message : 'Uh-oh! An error occurred.');
        alert.removeClass('d-none');
    });
}

function onStep2End() {
    $('#step-2').fadeOut(250, function () {
        $('#step-3').fadeIn(300, function () {
            // Fading animations complete
            setTimeout(function () {
                location.reload();
            }, 1000 * 60);
        });
    });
}
