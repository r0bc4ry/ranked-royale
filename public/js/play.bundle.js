/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/js/play.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/css/play.scss":
/*!******************************!*\
  !*** ./client/css/play.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./client/js/play.js":
/*!***************************!*\
  !*** ./client/js/play.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_play_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/play.scss */ "./client/css/play.scss");
/* harmony import */ var _css_play_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_play_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var worker_timers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! worker-timers */ "./node_modules/worker-timers/build/es2018/module.js");



var socket = io(host);
var countdown5MinutesAudio = new Audio('/audio/5-minutes.wav');
var countdown3MinutesAudio = new Audio('/audio/3-minutes.wav');
var countdown1MinuteAudio = new Audio('/audio/1-minute.wav');
var countdown5Audio = new Audio('/audio/5.wav');
var countdown3Audio = new Audio('/audio/3.wav');
var countdown2Audio = new Audio('/audio/2.wav');
var countdown1Audio = new Audio('/audio/1.wav');
var countdown0Audio = new Audio('/audio/0.wav');
var currentTime, eventTime;
var ajaxInterval, countdownInterval;
$(function () {
  if ($('#step-1, #step-2, #step-3').length === 0) {
    return;
  }

  getTimeFromServer().then(function () {
    // If page was reloaded within the first minute of the countdown ending, skip to step 2
    if (Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["isBefore"])(currentTime, Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["subMinutes"])(eventTime, 29))) {
      $('#step-1').hide();
      $('#step-2').show();
      setTimeout(function () {
        window.location.reload();
      }, 1000 * 60);
      return;
    }

    startCountdown();
    ajaxInterval = worker_timers__WEBPACK_IMPORTED_MODULE_2__["setInterval"](getTimeFromServer, 1000 * 15);
  });
  socket.on('onlineCounter', function (data) {
    $('#online-counter').text(data);
  });
  $('#step-2 .form-control').keypress(onStep2InputKeypress);
  $('#step-2 button').click(onStep2ButtonClick);
});

function getTimeFromServer() {
  var ajaxTimeStart = Date.now();
  return $.get('/api/countdown', function (response) {
    // Add the number of ms it took for the Ajax request to complete
    var ajaxTime = Date.now() - ajaxTimeStart;
    currentTime = Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["addMilliseconds"])(new Date(response.data.currentTime), ajaxTime);
    eventTime = new Date(response.data.eventTime);
    eventTime = Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["addMilliseconds"])(currentTime, 1000);
  });
}

function startCountdown() {
  updateCountdown();
  countdownInterval = worker_timers__WEBPACK_IMPORTED_MODULE_2__["setInterval"](updateCountdown, 100);
}

function updateCountdown() {
  var countdown = $('#step-1 h1');
  var m = Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["differenceInMinutes"])(eventTime, currentTime);
  var s = Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["differenceInSeconds"])(eventTime, currentTime) % 60;

  if (m < 1) {
    var ms = Math.floor(Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["differenceInMilliseconds"])(eventTime, currentTime) % 1000 / 100) * 100;
    countdown.text("".concat(s, ".").concat(String(ms).charAt(0), "s"));

    if (s === 5 && ms === 0) {
      countdown5Audio.play().catch(function (err) {// Do nothing, just catch the error
      });
    }

    if (s === 3 && ms === 0) {
      countdown3Audio.play().catch(function (err) {// Do nothing, just catch the error
      });
    }

    if (s === 2 && ms === 0) {
      countdown2Audio.play().catch(function (err) {// Do nothing, just catch the error
      });
    }

    if (s === 1 && ms === 0) {
      countdown1Audio.play().catch(function (err) {// Do nothing, just catch the error
      });
    }

    if (s <= 0 && ms <= 0) {
      countdown0Audio.play().catch(function (err) {// Do nothing, just catch the error
      });
      worker_timers__WEBPACK_IMPORTED_MODULE_2__["clearInterval"](countdownInterval);
      countdown.text('Go!');
      $('#step-1 p').hide();
      setTimeout(onStep1End, 2500);
    }
  } else {
    countdown.text("".concat(m, "m ").concat(s, "s"));

    if (m === 5 && s === 0) {
      countdown5MinutesAudio.play().catch(function (err) {// Do nothing, just catch the error
      });
    }

    if (m === 3 && s === 0) {
      countdown3MinutesAudio.play().catch(function (err) {// Do nothing, just catch the error
      });
    }

    if (m === 1 && s === 0) {
      countdown1MinuteAudio.play().catch(function (err) {// Do nothing, just catch the error
      });
    }
  }

  currentTime = Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["addMilliseconds"])(currentTime, 100);
}

function onStep1End() {
  $('#step-1').fadeOut(250, function () {
    $('#step-2').fadeIn(300, function () {
      // Fading animations complete
      worker_timers__WEBPACK_IMPORTED_MODULE_2__["clearInterval"](ajaxInterval);
    });
  });
}

function onStep2InputKeypress(event) {
  var code = event.keyCode || event.which;

  if (code === 13) {
    onStep2ButtonClick(event);
  }
}

function onStep2ButtonClick(event) {
  event.preventDefault();
  var alert = $('#step-2 .alert.alert-danger');
  alert.addClass('d-none'); // Validate form

  var form = $('#step-2 .needs-validation').get(0);
  var isValid = form.checkValidity();
  $(form).addClass('was-validated');

  if (isValid === false) {
    return;
  } // Disable button and show spinner


  var button = $('#step-2 .btn.btn-primary');
  var buttonHtml = button.html();
  button.html('<span class="spinner-border spinner-border-sm"></span> Loading...');
  button.attr('disabled', true);
  var serverId = $('#step-2 input[name=serverId]').val(); // Send Ajax

  $.ajax({
    url: "/api/matches/".concat(serverId),
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
        window.location.reload();
      }, 1000 * 60);
    });
  });
}

/***/ }),

/***/ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var MILLISECONDS_IN_MINUTE = 60000

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
module.exports = function getTimezoneOffsetInMilliseconds (dirtyDate) {
  var date = new Date(dirtyDate.getTime())
  var baseTimezoneOffset = date.getTimezoneOffset()
  date.setSeconds(0, 0)
  var millisecondsPartOfTimezoneOffset = date.getTime() % MILLISECONDS_IN_MINUTE

  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset
}


/***/ }),

/***/ "./node_modules/date-fns/add_days/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/add_days/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added
 * @returns {Date} the new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * var result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays (dirtyDate, dirtyAmount) {
  var date = parse(dirtyDate)
  var amount = Number(dirtyAmount)
  date.setDate(date.getDate() + amount)
  return date
}

module.exports = addDays


/***/ }),

/***/ "./node_modules/date-fns/add_hours/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/add_hours/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addMilliseconds = __webpack_require__(/*! ../add_milliseconds/index.js */ "./node_modules/date-fns/add_milliseconds/index.js")

var MILLISECONDS_IN_HOUR = 3600000

/**
 * @category Hour Helpers
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of hours to be added
 * @returns {Date} the new date with the hours added
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * var result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */
function addHours (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_HOUR)
}

module.exports = addHours


/***/ }),

/***/ "./node_modules/date-fns/add_iso_years/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/add_iso_years/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getISOYear = __webpack_require__(/*! ../get_iso_year/index.js */ "./node_modules/date-fns/get_iso_year/index.js")
var setISOYear = __webpack_require__(/*! ../set_iso_year/index.js */ "./node_modules/date-fns/set_iso_year/index.js")

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Add the specified number of ISO week-numbering years to the given date.
 *
 * @description
 * Add the specified number of ISO week-numbering years to the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of ISO week-numbering years to be added
 * @returns {Date} the new date with the ISO week-numbering years added
 *
 * @example
 * // Add 5 ISO week-numbering years to 2 July 2010:
 * var result = addISOYears(new Date(2010, 6, 2), 5)
 * //=> Fri Jun 26 2015 00:00:00
 */
function addISOYears (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return setISOYear(dirtyDate, getISOYear(dirtyDate) + amount)
}

module.exports = addISOYears


/***/ }),

/***/ "./node_modules/date-fns/add_milliseconds/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/add_milliseconds/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added
 * @returns {Date} the new date with the milliseconds added
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds (dirtyDate, dirtyAmount) {
  var timestamp = parse(dirtyDate).getTime()
  var amount = Number(dirtyAmount)
  return new Date(timestamp + amount)
}

module.exports = addMilliseconds


/***/ }),

/***/ "./node_modules/date-fns/add_minutes/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/add_minutes/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addMilliseconds = __webpack_require__(/*! ../add_milliseconds/index.js */ "./node_modules/date-fns/add_milliseconds/index.js")

var MILLISECONDS_IN_MINUTE = 60000

/**
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be added
 * @returns {Date} the new date with the minutes added
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * var result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */
function addMinutes (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE)
}

module.exports = addMinutes


/***/ }),

/***/ "./node_modules/date-fns/add_months/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/add_months/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var getDaysInMonth = __webpack_require__(/*! ../get_days_in_month/index.js */ "./node_modules/date-fns/get_days_in_month/index.js")

/**
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added
 * @returns {Date} the new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * var result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */
function addMonths (dirtyDate, dirtyAmount) {
  var date = parse(dirtyDate)
  var amount = Number(dirtyAmount)
  var desiredMonth = date.getMonth() + amount
  var dateWithDesiredMonth = new Date(0)
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1)
  dateWithDesiredMonth.setHours(0, 0, 0, 0)
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth)
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()))
  return date
}

module.exports = addMonths


/***/ }),

/***/ "./node_modules/date-fns/add_quarters/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/add_quarters/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addMonths = __webpack_require__(/*! ../add_months/index.js */ "./node_modules/date-fns/add_months/index.js")

/**
 * @category Quarter Helpers
 * @summary Add the specified number of year quarters to the given date.
 *
 * @description
 * Add the specified number of year quarters to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of quarters to be added
 * @returns {Date} the new date with the quarters added
 *
 * @example
 * // Add 1 quarter to 1 September 2014:
 * var result = addQuarters(new Date(2014, 8, 1), 1)
 * //=> Mon Dec 01 2014 00:00:00
 */
function addQuarters (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  var months = amount * 3
  return addMonths(dirtyDate, months)
}

module.exports = addQuarters


/***/ }),

/***/ "./node_modules/date-fns/add_seconds/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/add_seconds/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addMilliseconds = __webpack_require__(/*! ../add_milliseconds/index.js */ "./node_modules/date-fns/add_milliseconds/index.js")

/**
 * @category Second Helpers
 * @summary Add the specified number of seconds to the given date.
 *
 * @description
 * Add the specified number of seconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of seconds to be added
 * @returns {Date} the new date with the seconds added
 *
 * @example
 * // Add 30 seconds to 10 July 2014 12:45:00:
 * var result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:45:30
 */
function addSeconds (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addMilliseconds(dirtyDate, amount * 1000)
}

module.exports = addSeconds


/***/ }),

/***/ "./node_modules/date-fns/add_weeks/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/add_weeks/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addDays = __webpack_require__(/*! ../add_days/index.js */ "./node_modules/date-fns/add_days/index.js")

/**
 * @category Week Helpers
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of week to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be added
 * @returns {Date} the new date with the weeks added
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * var result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */
function addWeeks (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  var days = amount * 7
  return addDays(dirtyDate, days)
}

module.exports = addWeeks


/***/ }),

/***/ "./node_modules/date-fns/add_years/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/add_years/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addMonths = __webpack_require__(/*! ../add_months/index.js */ "./node_modules/date-fns/add_months/index.js")

/**
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added
 * @returns {Date} the new date with the years added
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * var result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addMonths(dirtyDate, amount * 12)
}

module.exports = addYears


/***/ }),

/***/ "./node_modules/date-fns/are_ranges_overlapping/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/are_ranges_overlapping/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Range Helpers
 * @summary Is the given date range overlapping with another date range?
 *
 * @description
 * Is the given date range overlapping with another date range?
 *
 * @param {Date|String|Number} initialRangeStartDate - the start of the initial range
 * @param {Date|String|Number} initialRangeEndDate - the end of the initial range
 * @param {Date|String|Number} comparedRangeStartDate - the start of the range to compare it with
 * @param {Date|String|Number} comparedRangeEndDate - the end of the range to compare it with
 * @returns {Boolean} whether the date ranges are overlapping
 * @throws {Error} startDate of a date range cannot be after its endDate
 *
 * @example
 * // For overlapping date ranges:
 * areRangesOverlapping(
 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 17), new Date(2014, 0, 21)
 * )
 * //=> true
 *
 * @example
 * // For non-overlapping date ranges:
 * areRangesOverlapping(
 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 21), new Date(2014, 0, 22)
 * )
 * //=> false
 */
function areRangesOverlapping (dirtyInitialRangeStartDate, dirtyInitialRangeEndDate, dirtyComparedRangeStartDate, dirtyComparedRangeEndDate) {
  var initialStartTime = parse(dirtyInitialRangeStartDate).getTime()
  var initialEndTime = parse(dirtyInitialRangeEndDate).getTime()
  var comparedStartTime = parse(dirtyComparedRangeStartDate).getTime()
  var comparedEndTime = parse(dirtyComparedRangeEndDate).getTime()

  if (initialStartTime > initialEndTime || comparedStartTime > comparedEndTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  return initialStartTime < comparedEndTime && comparedStartTime < initialEndTime
}

module.exports = areRangesOverlapping


/***/ }),

/***/ "./node_modules/date-fns/closest_index_to/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/closest_index_to/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Common Helpers
 * @summary Return an index of the closest date from the array comparing to the given date.
 *
 * @description
 * Return an index of the closest date from the array comparing to the given date.
 *
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @param {Date[]|String[]|Number[]} datesArray - the array to search
 * @returns {Number} an index of the date closest to the given date
 * @throws {TypeError} the second argument must be an instance of Array
 *
 * @example
 * // Which date is closer to 6 September 2015?
 * var dateToCompare = new Date(2015, 8, 6)
 * var datesArray = [
 *   new Date(2015, 0, 1),
 *   new Date(2016, 0, 1),
 *   new Date(2017, 0, 1)
 * ]
 * var result = closestIndexTo(dateToCompare, datesArray)
 * //=> 1
 */
function closestIndexTo (dirtyDateToCompare, dirtyDatesArray) {
  if (!(dirtyDatesArray instanceof Array)) {
    throw new TypeError(toString.call(dirtyDatesArray) + ' is not an instance of Array')
  }

  var dateToCompare = parse(dirtyDateToCompare)
  var timeToCompare = dateToCompare.getTime()

  var result
  var minDistance

  dirtyDatesArray.forEach(function (dirtyDate, index) {
    var currentDate = parse(dirtyDate)
    var distance = Math.abs(timeToCompare - currentDate.getTime())
    if (result === undefined || distance < minDistance) {
      result = index
      minDistance = distance
    }
  })

  return result
}

module.exports = closestIndexTo


/***/ }),

/***/ "./node_modules/date-fns/closest_to/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/closest_to/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Common Helpers
 * @summary Return a date from the array closest to the given date.
 *
 * @description
 * Return a date from the array closest to the given date.
 *
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @param {Date[]|String[]|Number[]} datesArray - the array to search
 * @returns {Date} the date from the array closest to the given date
 * @throws {TypeError} the second argument must be an instance of Array
 *
 * @example
 * // Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?
 * var dateToCompare = new Date(2015, 8, 6)
 * var result = closestTo(dateToCompare, [
 *   new Date(2000, 0, 1),
 *   new Date(2030, 0, 1)
 * ])
 * //=> Tue Jan 01 2030 00:00:00
 */
function closestTo (dirtyDateToCompare, dirtyDatesArray) {
  if (!(dirtyDatesArray instanceof Array)) {
    throw new TypeError(toString.call(dirtyDatesArray) + ' is not an instance of Array')
  }

  var dateToCompare = parse(dirtyDateToCompare)
  var timeToCompare = dateToCompare.getTime()

  var result
  var minDistance

  dirtyDatesArray.forEach(function (dirtyDate) {
    var currentDate = parse(dirtyDate)
    var distance = Math.abs(timeToCompare - currentDate.getTime())
    if (result === undefined || distance < minDistance) {
      result = currentDate
      minDistance = distance
    }
  })

  return result
}

module.exports = closestTo


/***/ }),

/***/ "./node_modules/date-fns/compare_asc/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/compare_asc/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|String|Number} dateLeft - the first date to compare
 * @param {Date|String|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * var result = compareAsc(
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * )
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * var result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var timeLeft = dateLeft.getTime()
  var dateRight = parse(dirtyDateRight)
  var timeRight = dateRight.getTime()

  if (timeLeft < timeRight) {
    return -1
  } else if (timeLeft > timeRight) {
    return 1
  } else {
    return 0
  }
}

module.exports = compareAsc


/***/ }),

/***/ "./node_modules/date-fns/compare_desc/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/compare_desc/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Common Helpers
 * @summary Compare the two dates reverse chronologically and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return -1 if the first date is after the second,
 * 1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|String|Number} dateLeft - the first date to compare
 * @param {Date|String|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989 reverse chronologically:
 * var result = compareDesc(
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * )
 * //=> 1
 *
 * @example
 * // Sort the array of dates in reverse chronological order:
 * var result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareDesc)
 * //=> [
 * //   Sun Jul 02 1995 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Wed Feb 11 1987 00:00:00
 * // ]
 */
function compareDesc (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var timeLeft = dateLeft.getTime()
  var dateRight = parse(dirtyDateRight)
  var timeRight = dateRight.getTime()

  if (timeLeft > timeRight) {
    return -1
  } else if (timeLeft < timeRight) {
    return 1
  } else {
    return 0
  }
}

module.exports = compareDesc


/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_days/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_days/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(/*! ../start_of_day/index.js */ "./node_modules/date-fns/start_of_day/index.js")

var MILLISECONDS_IN_MINUTE = 60000
var MILLISECONDS_IN_DAY = 86400000

/**
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 */
function differenceInCalendarDays (dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay(dirtyDateLeft)
  var startOfDayRight = startOfDay(dirtyDateRight)

  var timestampLeft = startOfDayLeft.getTime() -
    startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE
  var timestampRight = startOfDayRight.getTime() -
    startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)
}

module.exports = differenceInCalendarDays


/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_iso_weeks/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_iso_weeks/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfISOWeek = __webpack_require__(/*! ../start_of_iso_week/index.js */ "./node_modules/date-fns/start_of_iso_week/index.js")

var MILLISECONDS_IN_MINUTE = 60000
var MILLISECONDS_IN_WEEK = 604800000

/**
 * @category ISO Week Helpers
 * @summary Get the number of calendar ISO weeks between the given dates.
 *
 * @description
 * Get the number of calendar ISO weeks between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar ISO weeks
 *
 * @example
 * // How many calendar ISO weeks are between 6 July 2014 and 21 July 2014?
 * var result = differenceInCalendarISOWeeks(
 *   new Date(2014, 6, 21),
 *   new Date(2014, 6, 6)
 * )
 * //=> 3
 */
function differenceInCalendarISOWeeks (dirtyDateLeft, dirtyDateRight) {
  var startOfISOWeekLeft = startOfISOWeek(dirtyDateLeft)
  var startOfISOWeekRight = startOfISOWeek(dirtyDateRight)

  var timestampLeft = startOfISOWeekLeft.getTime() -
    startOfISOWeekLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE
  var timestampRight = startOfISOWeekRight.getTime() -
    startOfISOWeekRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK)
}

module.exports = differenceInCalendarISOWeeks


/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_iso_years/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_iso_years/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getISOYear = __webpack_require__(/*! ../get_iso_year/index.js */ "./node_modules/date-fns/get_iso_year/index.js")

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of calendar ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of calendar ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar ISO week-numbering years
 *
 * @example
 * // How many calendar ISO week-numbering years are 1 January 2010 and 1 January 2012?
 * var result = differenceInCalendarISOYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * //=> 2
 */
function differenceInCalendarISOYears (dirtyDateLeft, dirtyDateRight) {
  return getISOYear(dirtyDateLeft) - getISOYear(dirtyDateRight)
}

module.exports = differenceInCalendarISOYears


/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_months/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_months/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)

  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear()
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth()

  return yearDiff * 12 + monthDiff
}

module.exports = differenceInCalendarMonths


/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_quarters/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_quarters/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getQuarter = __webpack_require__(/*! ../get_quarter/index.js */ "./node_modules/date-fns/get_quarter/index.js")
var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Quarter Helpers
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar quarters
 *
 * @example
 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
 * var result = differenceInCalendarQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 3
 */
function differenceInCalendarQuarters (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)

  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear()
  var quarterDiff = getQuarter(dateLeft) - getQuarter(dateRight)

  return yearDiff * 4 + quarterDiff
}

module.exports = differenceInCalendarQuarters


/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_weeks/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_weeks/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfWeek = __webpack_require__(/*! ../start_of_week/index.js */ "./node_modules/date-fns/start_of_week/index.js")

var MILLISECONDS_IN_MINUTE = 60000
var MILLISECONDS_IN_WEEK = 604800000

/**
 * @category Week Helpers
 * @summary Get the number of calendar weeks between the given dates.
 *
 * @description
 * Get the number of calendar weeks between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Number} the number of calendar weeks
 *
 * @example
 * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
 * var result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5)
 * )
 * //=> 3
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
 * var result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5),
 *   {weekStartsOn: 1}
 * )
 * //=> 2
 */
function differenceInCalendarWeeks (dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  var startOfWeekLeft = startOfWeek(dirtyDateLeft, dirtyOptions)
  var startOfWeekRight = startOfWeek(dirtyDateRight, dirtyOptions)

  var timestampLeft = startOfWeekLeft.getTime() -
    startOfWeekLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE
  var timestampRight = startOfWeekRight.getTime() -
    startOfWeekRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK)
}

module.exports = differenceInCalendarWeeks


/***/ }),

/***/ "./node_modules/date-fns/difference_in_calendar_years/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_calendar_years/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Year Helpers
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar years
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * var result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * )
 * //=> 2
 */
function differenceInCalendarYears (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)

  return dateLeft.getFullYear() - dateRight.getFullYear()
}

module.exports = differenceInCalendarYears


/***/ }),

/***/ "./node_modules/date-fns/difference_in_days/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/difference_in_days/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var differenceInCalendarDays = __webpack_require__(/*! ../difference_in_calendar_days/index.js */ "./node_modules/date-fns/difference_in_calendar_days/index.js")
var compareAsc = __webpack_require__(/*! ../compare_asc/index.js */ "./node_modules/date-fns/compare_asc/index.js")

/**
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full days
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 */
function differenceInDays (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)

  var sign = compareAsc(dateLeft, dateRight)
  var difference = Math.abs(differenceInCalendarDays(dateLeft, dateRight))
  dateLeft.setDate(dateLeft.getDate() - sign * difference)

  // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastDayNotFull = compareAsc(dateLeft, dateRight) === -sign
  return sign * (difference - isLastDayNotFull)
}

module.exports = differenceInDays


/***/ }),

/***/ "./node_modules/date-fns/difference_in_hours/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_hours/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var differenceInMilliseconds = __webpack_require__(/*! ../difference_in_milliseconds/index.js */ "./node_modules/date-fns/difference_in_milliseconds/index.js")

var MILLISECONDS_IN_HOUR = 3600000

/**
 * @category Hour Helpers
 * @summary Get the number of hours between the given dates.
 *
 * @description
 * Get the number of hours between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of hours
 *
 * @example
 * // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
 * var result = differenceInHours(
 *   new Date(2014, 6, 2, 19, 0),
 *   new Date(2014, 6, 2, 6, 50)
 * )
 * //=> 12
 */
function differenceInHours (dirtyDateLeft, dirtyDateRight) {
  var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_HOUR
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

module.exports = differenceInHours


/***/ }),

/***/ "./node_modules/date-fns/difference_in_iso_years/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_iso_years/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var differenceInCalendarISOYears = __webpack_require__(/*! ../difference_in_calendar_iso_years/index.js */ "./node_modules/date-fns/difference_in_calendar_iso_years/index.js")
var compareAsc = __webpack_require__(/*! ../compare_asc/index.js */ "./node_modules/date-fns/compare_asc/index.js")
var subISOYears = __webpack_require__(/*! ../sub_iso_years/index.js */ "./node_modules/date-fns/sub_iso_years/index.js")

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of full ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of full ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full ISO week-numbering years
 *
 * @example
 * // How many full ISO week-numbering years are between 1 January 2010 and 1 January 2012?
 * var result = differenceInISOYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * //=> 1
 */
function differenceInISOYears (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)

  var sign = compareAsc(dateLeft, dateRight)
  var difference = Math.abs(differenceInCalendarISOYears(dateLeft, dateRight))
  dateLeft = subISOYears(dateLeft, sign * difference)

  // Math.abs(diff in full ISO years - diff in calendar ISO years) === 1
  // if last calendar ISO year is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastISOYearNotFull = compareAsc(dateLeft, dateRight) === -sign
  return sign * (difference - isLastISOYearNotFull)
}

module.exports = differenceInISOYears


/***/ }),

/***/ "./node_modules/date-fns/difference_in_milliseconds/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_milliseconds/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of milliseconds
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * var result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */
function differenceInMilliseconds (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)
  return dateLeft.getTime() - dateRight.getTime()
}

module.exports = differenceInMilliseconds


/***/ }),

/***/ "./node_modules/date-fns/difference_in_minutes/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_minutes/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var differenceInMilliseconds = __webpack_require__(/*! ../difference_in_milliseconds/index.js */ "./node_modules/date-fns/difference_in_milliseconds/index.js")

var MILLISECONDS_IN_MINUTE = 60000

/**
 * @category Minute Helpers
 * @summary Get the number of minutes between the given dates.
 *
 * @description
 * Get the number of minutes between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of minutes
 *
 * @example
 * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
 * var result = differenceInMinutes(
 *   new Date(2014, 6, 2, 12, 20, 0),
 *   new Date(2014, 6, 2, 12, 7, 59)
 * )
 * //=> 12
 */
function differenceInMinutes (dirtyDateLeft, dirtyDateRight) {
  var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_MINUTE
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

module.exports = differenceInMinutes


/***/ }),

/***/ "./node_modules/date-fns/difference_in_months/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_months/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var differenceInCalendarMonths = __webpack_require__(/*! ../difference_in_calendar_months/index.js */ "./node_modules/date-fns/difference_in_calendar_months/index.js")
var compareAsc = __webpack_require__(/*! ../compare_asc/index.js */ "./node_modules/date-fns/compare_asc/index.js")

/**
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @description
 * Get the number of full months between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full months
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 7
 */
function differenceInMonths (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)

  var sign = compareAsc(dateLeft, dateRight)
  var difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight))
  dateLeft.setMonth(dateLeft.getMonth() - sign * difference)

  // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign
  return sign * (difference - isLastMonthNotFull)
}

module.exports = differenceInMonths


/***/ }),

/***/ "./node_modules/date-fns/difference_in_quarters/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_quarters/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var differenceInMonths = __webpack_require__(/*! ../difference_in_months/index.js */ "./node_modules/date-fns/difference_in_months/index.js")

/**
 * @category Quarter Helpers
 * @summary Get the number of full quarters between the given dates.
 *
 * @description
 * Get the number of full quarters between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full quarters
 *
 * @example
 * // How many full quarters are between 31 December 2013 and 2 July 2014?
 * var result = differenceInQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 2
 */
function differenceInQuarters (dirtyDateLeft, dirtyDateRight) {
  var diff = differenceInMonths(dirtyDateLeft, dirtyDateRight) / 3
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

module.exports = differenceInQuarters


/***/ }),

/***/ "./node_modules/date-fns/difference_in_seconds/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_seconds/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var differenceInMilliseconds = __webpack_require__(/*! ../difference_in_milliseconds/index.js */ "./node_modules/date-fns/difference_in_milliseconds/index.js")

/**
 * @category Second Helpers
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of seconds
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * var result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */
function differenceInSeconds (dirtyDateLeft, dirtyDateRight) {
  var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / 1000
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

module.exports = differenceInSeconds


/***/ }),

/***/ "./node_modules/date-fns/difference_in_weeks/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_weeks/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var differenceInDays = __webpack_require__(/*! ../difference_in_days/index.js */ "./node_modules/date-fns/difference_in_days/index.js")

/**
 * @category Week Helpers
 * @summary Get the number of full weeks between the given dates.
 *
 * @description
 * Get the number of full weeks between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full weeks
 *
 * @example
 * // How many full weeks are between 5 July 2014 and 20 July 2014?
 * var result = differenceInWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5)
 * )
 * //=> 2
 */
function differenceInWeeks (dirtyDateLeft, dirtyDateRight) {
  var diff = differenceInDays(dirtyDateLeft, dirtyDateRight) / 7
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

module.exports = differenceInWeeks


/***/ }),

/***/ "./node_modules/date-fns/difference_in_years/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/difference_in_years/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var differenceInCalendarYears = __webpack_require__(/*! ../difference_in_calendar_years/index.js */ "./node_modules/date-fns/difference_in_calendar_years/index.js")
var compareAsc = __webpack_require__(/*! ../compare_asc/index.js */ "./node_modules/date-fns/compare_asc/index.js")

/**
 * @category Year Helpers
 * @summary Get the number of full years between the given dates.
 *
 * @description
 * Get the number of full years between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full years
 *
 * @example
 * // How many full years are between 31 December 2013 and 11 February 2015?
 * var result = differenceInYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * )
 * //=> 1
 */
function differenceInYears (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)

  var sign = compareAsc(dateLeft, dateRight)
  var difference = Math.abs(differenceInCalendarYears(dateLeft, dateRight))
  dateLeft.setFullYear(dateLeft.getFullYear() - sign * difference)

  // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastYearNotFull = compareAsc(dateLeft, dateRight) === -sign
  return sign * (difference - isLastYearNotFull)
}

module.exports = differenceInYears


/***/ }),

/***/ "./node_modules/date-fns/distance_in_words/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/distance_in_words/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var compareDesc = __webpack_require__(/*! ../compare_desc/index.js */ "./node_modules/date-fns/compare_desc/index.js")
var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var differenceInSeconds = __webpack_require__(/*! ../difference_in_seconds/index.js */ "./node_modules/date-fns/difference_in_seconds/index.js")
var differenceInMonths = __webpack_require__(/*! ../difference_in_months/index.js */ "./node_modules/date-fns/difference_in_months/index.js")
var enLocale = __webpack_require__(/*! ../locale/en/index.js */ "./node_modules/date-fns/locale/en/index.js")

var MINUTES_IN_DAY = 1440
var MINUTES_IN_ALMOST_TWO_DAYS = 2520
var MINUTES_IN_MONTH = 43200
var MINUTES_IN_TWO_MONTHS = 86400

/**
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
 *
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @param {Date|String|Number} date - the other date
 * @param {Object} [options] - the object with options
 * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the distance in words
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * var result = distanceInWords(
 *   new Date(2014, 6, 2),
 *   new Date(2015, 0, 1)
 * )
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * var result = distanceInWords(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   {includeSeconds: true}
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * var result = distanceInWords(
 *   new Date(2016, 0, 1),
 *   new Date(2015, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'about 1 year ago'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * var eoLocale = require('date-fns/locale/eo')
 * var result = distanceInWords(
 *   new Date(2016, 7, 1),
 *   new Date(2015, 0, 1),
 *   {locale: eoLocale}
 * )
 * //=> 'pli ol 1 jaro'
 */
function distanceInWords (dirtyDateToCompare, dirtyDate, dirtyOptions) {
  var options = dirtyOptions || {}

  var comparison = compareDesc(dirtyDateToCompare, dirtyDate)

  var locale = options.locale
  var localize = enLocale.distanceInWords.localize
  if (locale && locale.distanceInWords && locale.distanceInWords.localize) {
    localize = locale.distanceInWords.localize
  }

  var localizeOptions = {
    addSuffix: Boolean(options.addSuffix),
    comparison: comparison
  }

  var dateLeft, dateRight
  if (comparison > 0) {
    dateLeft = parse(dirtyDateToCompare)
    dateRight = parse(dirtyDate)
  } else {
    dateLeft = parse(dirtyDate)
    dateRight = parse(dirtyDateToCompare)
  }

  var seconds = differenceInSeconds(dateRight, dateLeft)
  var offset = dateRight.getTimezoneOffset() - dateLeft.getTimezoneOffset()
  var minutes = Math.round(seconds / 60) - offset
  var months

  // 0 up to 2 mins
  if (minutes < 2) {
    if (options.includeSeconds) {
      if (seconds < 5) {
        return localize('lessThanXSeconds', 5, localizeOptions)
      } else if (seconds < 10) {
        return localize('lessThanXSeconds', 10, localizeOptions)
      } else if (seconds < 20) {
        return localize('lessThanXSeconds', 20, localizeOptions)
      } else if (seconds < 40) {
        return localize('halfAMinute', null, localizeOptions)
      } else if (seconds < 60) {
        return localize('lessThanXMinutes', 1, localizeOptions)
      } else {
        return localize('xMinutes', 1, localizeOptions)
      }
    } else {
      if (minutes === 0) {
        return localize('lessThanXMinutes', 1, localizeOptions)
      } else {
        return localize('xMinutes', minutes, localizeOptions)
      }
    }

  // 2 mins up to 0.75 hrs
  } else if (minutes < 45) {
    return localize('xMinutes', minutes, localizeOptions)

  // 0.75 hrs up to 1.5 hrs
  } else if (minutes < 90) {
    return localize('aboutXHours', 1, localizeOptions)

  // 1.5 hrs up to 24 hrs
  } else if (minutes < MINUTES_IN_DAY) {
    var hours = Math.round(minutes / 60)
    return localize('aboutXHours', hours, localizeOptions)

  // 1 day up to 1.75 days
  } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
    return localize('xDays', 1, localizeOptions)

  // 1.75 days up to 30 days
  } else if (minutes < MINUTES_IN_MONTH) {
    var days = Math.round(minutes / MINUTES_IN_DAY)
    return localize('xDays', days, localizeOptions)

  // 1 month up to 2 months
  } else if (minutes < MINUTES_IN_TWO_MONTHS) {
    months = Math.round(minutes / MINUTES_IN_MONTH)
    return localize('aboutXMonths', months, localizeOptions)
  }

  months = differenceInMonths(dateRight, dateLeft)

  // 2 months up to 12 months
  if (months < 12) {
    var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH)
    return localize('xMonths', nearestMonth, localizeOptions)

  // 1 year up to max Date
  } else {
    var monthsSinceStartOfYear = months % 12
    var years = Math.floor(months / 12)

    // N years up to 1 years 3 months
    if (monthsSinceStartOfYear < 3) {
      return localize('aboutXYears', years, localizeOptions)

    // N years 3 months up to N years 9 months
    } else if (monthsSinceStartOfYear < 9) {
      return localize('overXYears', years, localizeOptions)

    // N years 9 months up to N year 12 months
    } else {
      return localize('almostXYears', years + 1, localizeOptions)
    }
  }
}

module.exports = distanceInWords


/***/ }),

/***/ "./node_modules/date-fns/distance_in_words_strict/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/distance_in_words_strict/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var compareDesc = __webpack_require__(/*! ../compare_desc/index.js */ "./node_modules/date-fns/compare_desc/index.js")
var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var differenceInSeconds = __webpack_require__(/*! ../difference_in_seconds/index.js */ "./node_modules/date-fns/difference_in_seconds/index.js")
var enLocale = __webpack_require__(/*! ../locale/en/index.js */ "./node_modules/date-fns/locale/en/index.js")

var MINUTES_IN_DAY = 1440
var MINUTES_IN_MONTH = 43200
var MINUTES_IN_YEAR = 525600

/**
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `distanceInWords`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @param {Date|String|Number} date - the other date
 * @param {Object} [options] - the object with options
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {'s'|'m'|'h'|'d'|'M'|'Y'} [options.unit] - if specified, will force a unit
 * @param {'floor'|'ceil'|'round'} [options.partialMethod='floor'] - which way to round partial units
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the distance in words
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * var result = distanceInWordsStrict(
 *   new Date(2014, 6, 2),
 *   new Date(2015, 0, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00?
 * var result = distanceInWordsStrict(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 * )
 * //=> '15 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * var result = distanceInWordsStrict(
 *   new Date(2016, 0, 1),
 *   new Date(2015, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> '1 year ago'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, in minutes?
 * var result = distanceInWordsStrict(
 *   new Date(2016, 0, 1),
 *   new Date(2015, 0, 1),
 *   {unit: 'm'}
 * )
 * //=> '525600 minutes'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 28 January 2015, in months, rounded up?
 * var result = distanceInWordsStrict(
 *   new Date(2015, 0, 28),
 *   new Date(2015, 0, 1),
 *   {unit: 'M', partialMethod: 'ceil'}
 * )
 * //=> '1 month'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * var eoLocale = require('date-fns/locale/eo')
 * var result = distanceInWordsStrict(
 *   new Date(2016, 7, 1),
 *   new Date(2015, 0, 1),
 *   {locale: eoLocale}
 * )
 * //=> '1 jaro'
 */
function distanceInWordsStrict (dirtyDateToCompare, dirtyDate, dirtyOptions) {
  var options = dirtyOptions || {}

  var comparison = compareDesc(dirtyDateToCompare, dirtyDate)

  var locale = options.locale
  var localize = enLocale.distanceInWords.localize
  if (locale && locale.distanceInWords && locale.distanceInWords.localize) {
    localize = locale.distanceInWords.localize
  }

  var localizeOptions = {
    addSuffix: Boolean(options.addSuffix),
    comparison: comparison
  }

  var dateLeft, dateRight
  if (comparison > 0) {
    dateLeft = parse(dirtyDateToCompare)
    dateRight = parse(dirtyDate)
  } else {
    dateLeft = parse(dirtyDate)
    dateRight = parse(dirtyDateToCompare)
  }

  var unit
  var mathPartial = Math[options.partialMethod ? String(options.partialMethod) : 'floor']
  var seconds = differenceInSeconds(dateRight, dateLeft)
  var offset = dateRight.getTimezoneOffset() - dateLeft.getTimezoneOffset()
  var minutes = mathPartial(seconds / 60) - offset
  var hours, days, months, years

  if (options.unit) {
    unit = String(options.unit)
  } else {
    if (minutes < 1) {
      unit = 's'
    } else if (minutes < 60) {
      unit = 'm'
    } else if (minutes < MINUTES_IN_DAY) {
      unit = 'h'
    } else if (minutes < MINUTES_IN_MONTH) {
      unit = 'd'
    } else if (minutes < MINUTES_IN_YEAR) {
      unit = 'M'
    } else {
      unit = 'Y'
    }
  }

  // 0 up to 60 seconds
  if (unit === 's') {
    return localize('xSeconds', seconds, localizeOptions)

  // 1 up to 60 mins
  } else if (unit === 'm') {
    return localize('xMinutes', minutes, localizeOptions)

  // 1 up to 24 hours
  } else if (unit === 'h') {
    hours = mathPartial(minutes / 60)
    return localize('xHours', hours, localizeOptions)

  // 1 up to 30 days
  } else if (unit === 'd') {
    days = mathPartial(minutes / MINUTES_IN_DAY)
    return localize('xDays', days, localizeOptions)

  // 1 up to 12 months
  } else if (unit === 'M') {
    months = mathPartial(minutes / MINUTES_IN_MONTH)
    return localize('xMonths', months, localizeOptions)

  // 1 year up to max Date
  } else if (unit === 'Y') {
    years = mathPartial(minutes / MINUTES_IN_YEAR)
    return localize('xYears', years, localizeOptions)
  }

  throw new Error('Unknown unit: ' + unit)
}

module.exports = distanceInWordsStrict


/***/ }),

/***/ "./node_modules/date-fns/distance_in_words_to_now/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/distance_in_words_to_now/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var distanceInWords = __webpack_require__(/*! ../distance_in_words/index.js */ "./node_modules/date-fns/distance_in_words/index.js")

/**
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 *
 * @description
 * Return the distance between the given date and now in words.
 *
 * | Distance to now                                                   | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance to now     | Result               |
 * |---------------------|----------------------|
 * | 0 secs ... 5 secs   | less than 5 seconds  |
 * | 5 secs ... 10 secs  | less than 10 seconds |
 * | 10 secs ... 20 secs | less than 20 seconds |
 * | 20 secs ... 40 secs | half a minute        |
 * | 40 secs ... 60 secs | less than a minute   |
 * | 60 secs ... 90 secs | 1 minute             |
 *
 * @param {Date|String|Number} date - the given date
 * @param {Object} [options] - the object with options
 * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
 * @param {Boolean} [options.addSuffix=false] - result specifies if the second date is earlier or later than the first
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the distance in words
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * var result = distanceInWordsToNow(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * var result = distanceInWordsToNow(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   {includeSeconds: true}
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * var result = distanceInWordsToNow(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in about 1 year'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 August 2016 in Esperanto?
 * var eoLocale = require('date-fns/locale/eo')
 * var result = distanceInWordsToNow(
 *   new Date(2016, 7, 1),
 *   {locale: eoLocale}
 * )
 * //=> 'pli ol 1 jaro'
 */
function distanceInWordsToNow (dirtyDate, dirtyOptions) {
  return distanceInWords(Date.now(), dirtyDate, dirtyOptions)
}

module.exports = distanceInWordsToNow


/***/ }),

/***/ "./node_modules/date-fns/each_day/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/each_day/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Day Helpers
 * @summary Return the array of dates within the specified range.
 *
 * @description
 * Return the array of dates within the specified range.
 *
 * @param {Date|String|Number} startDate - the first date
 * @param {Date|String|Number} endDate - the last date
 * @param {Number} [step=1] - the step between each day
 * @returns {Date[]} the array with starts of days from the day of startDate to the day of endDate
 * @throws {Error} startDate cannot be after endDate
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * var result = eachDay(
 *   new Date(2014, 9, 6),
 *   new Date(2014, 9, 10)
 * )
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
function eachDay (dirtyStartDate, dirtyEndDate, dirtyStep) {
  var startDate = parse(dirtyStartDate)
  var endDate = parse(dirtyEndDate)
  var step = dirtyStep !== undefined ? dirtyStep : 1

  var endTime = endDate.getTime()

  if (startDate.getTime() > endTime) {
    throw new Error('The first date cannot be after the second date')
  }

  var dates = []

  var currentDate = startDate
  currentDate.setHours(0, 0, 0, 0)

  while (currentDate.getTime() <= endTime) {
    dates.push(parse(currentDate))
    currentDate.setDate(currentDate.getDate() + step)
  }

  return dates
}

module.exports = eachDay


/***/ }),

/***/ "./node_modules/date-fns/end_of_day/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/end_of_day/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * var result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay (dirtyDate) {
  var date = parse(dirtyDate)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfDay


/***/ }),

/***/ "./node_modules/date-fns/end_of_hour/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/end_of_hour/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Hour Helpers
 * @summary Return the end of an hour for the given date.
 *
 * @description
 * Return the end of an hour for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of an hour
 *
 * @example
 * // The end of an hour for 2 September 2014 11:55:00:
 * var result = endOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:59:59.999
 */
function endOfHour (dirtyDate) {
  var date = parse(dirtyDate)
  date.setMinutes(59, 59, 999)
  return date
}

module.exports = endOfHour


/***/ }),

/***/ "./node_modules/date-fns/end_of_iso_week/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/end_of_iso_week/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var endOfWeek = __webpack_require__(/*! ../end_of_week/index.js */ "./node_modules/date-fns/end_of_week/index.js")

/**
 * @category ISO Week Helpers
 * @summary Return the end of an ISO week for the given date.
 *
 * @description
 * Return the end of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of an ISO week
 *
 * @example
 * // The end of an ISO week for 2 September 2014 11:55:00:
 * var result = endOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfISOWeek (dirtyDate) {
  return endOfWeek(dirtyDate, {weekStartsOn: 1})
}

module.exports = endOfISOWeek


/***/ }),

/***/ "./node_modules/date-fns/end_of_iso_year/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/end_of_iso_year/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getISOYear = __webpack_require__(/*! ../get_iso_year/index.js */ "./node_modules/date-fns/get_iso_year/index.js")
var startOfISOWeek = __webpack_require__(/*! ../start_of_iso_week/index.js */ "./node_modules/date-fns/start_of_iso_week/index.js")

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the end of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the end of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of an ISO week-numbering year
 *
 * @example
 * // The end of an ISO week-numbering year for 2 July 2005:
 * var result = endOfISOYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 23:59:59.999
 */
function endOfISOYear (dirtyDate) {
  var year = getISOYear(dirtyDate)
  var fourthOfJanuaryOfNextYear = new Date(0)
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4)
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0)
  var date = startOfISOWeek(fourthOfJanuaryOfNextYear)
  date.setMilliseconds(date.getMilliseconds() - 1)
  return date
}

module.exports = endOfISOYear


/***/ }),

/***/ "./node_modules/date-fns/end_of_minute/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/end_of_minute/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Minute Helpers
 * @summary Return the end of a minute for the given date.
 *
 * @description
 * Return the end of a minute for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a minute
 *
 * @example
 * // The end of a minute for 1 December 2014 22:15:45.400:
 * var result = endOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:59.999
 */
function endOfMinute (dirtyDate) {
  var date = parse(dirtyDate)
  date.setSeconds(59, 999)
  return date
}

module.exports = endOfMinute


/***/ }),

/***/ "./node_modules/date-fns/end_of_month/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/end_of_month/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * var result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth (dirtyDate) {
  var date = parse(dirtyDate)
  var month = date.getMonth()
  date.setFullYear(date.getFullYear(), month + 1, 0)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfMonth


/***/ }),

/***/ "./node_modules/date-fns/end_of_quarter/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/end_of_quarter/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Quarter Helpers
 * @summary Return the end of a year quarter for the given date.
 *
 * @description
 * Return the end of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a quarter
 *
 * @example
 * // The end of a quarter for 2 September 2014 11:55:00:
 * var result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfQuarter (dirtyDate) {
  var date = parse(dirtyDate)
  var currentMonth = date.getMonth()
  var month = currentMonth - currentMonth % 3 + 3
  date.setMonth(month, 0)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfQuarter


/***/ }),

/***/ "./node_modules/date-fns/end_of_second/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/end_of_second/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Second Helpers
 * @summary Return the end of a second for the given date.
 *
 * @description
 * Return the end of a second for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a second
 *
 * @example
 * // The end of a second for 1 December 2014 22:15:45.400:
 * var result = endOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.999
 */
function endOfSecond (dirtyDate) {
  var date = parse(dirtyDate)
  date.setMilliseconds(999)
  return date
}

module.exports = endOfSecond


/***/ }),

/***/ "./node_modules/date-fns/end_of_today/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/end_of_today/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var endOfDay = __webpack_require__(/*! ../end_of_day/index.js */ "./node_modules/date-fns/end_of_day/index.js")

/**
 * @category Day Helpers
 * @summary Return the end of today.
 *
 * @description
 * Return the end of today.
 *
 * @returns {Date} the end of today
 *
 * @example
 * // If today is 6 October 2014:
 * var result = endOfToday()
 * //=> Mon Oct 6 2014 23:59:59.999
 */
function endOfToday () {
  return endOfDay(new Date())
}

module.exports = endOfToday


/***/ }),

/***/ "./node_modules/date-fns/end_of_tomorrow/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/end_of_tomorrow/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @category Day Helpers
 * @summary Return the end of tomorrow.
 *
 * @description
 * Return the end of tomorrow.
 *
 * @returns {Date} the end of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * var result = endOfTomorrow()
 * //=> Tue Oct 7 2014 23:59:59.999
 */
function endOfTomorrow () {
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth()
  var day = now.getDate()

  var date = new Date(0)
  date.setFullYear(year, month, day + 1)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfTomorrow


/***/ }),

/***/ "./node_modules/date-fns/end_of_week/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/end_of_week/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0

  var date = parse(dirtyDate)
  var day = date.getDay()
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn)

  date.setDate(date.getDate() + diff)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfWeek


/***/ }),

/***/ "./node_modules/date-fns/end_of_year/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/end_of_year/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Year Helpers
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * var result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
function endOfYear (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()
  date.setFullYear(year + 1, 0, 0)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfYear


/***/ }),

/***/ "./node_modules/date-fns/end_of_yesterday/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/end_of_yesterday/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @category Day Helpers
 * @summary Return the end of yesterday.
 *
 * @description
 * Return the end of yesterday.
 *
 * @returns {Date} the end of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * var result = endOfYesterday()
 * //=> Sun Oct 5 2014 23:59:59.999
 */
function endOfYesterday () {
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth()
  var day = now.getDate()

  var date = new Date(0)
  date.setFullYear(year, month, day - 1)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfYesterday


/***/ }),

/***/ "./node_modules/date-fns/format/index.js":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/format/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getDayOfYear = __webpack_require__(/*! ../get_day_of_year/index.js */ "./node_modules/date-fns/get_day_of_year/index.js")
var getISOWeek = __webpack_require__(/*! ../get_iso_week/index.js */ "./node_modules/date-fns/get_iso_week/index.js")
var getISOYear = __webpack_require__(/*! ../get_iso_year/index.js */ "./node_modules/date-fns/get_iso_year/index.js")
var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var isValid = __webpack_require__(/*! ../is_valid/index.js */ "./node_modules/date-fns/is_valid/index.js")
var enLocale = __webpack_require__(/*! ../locale/en/index.js */ "./node_modules/date-fns/locale/en/index.js")

/**
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format.
 *
 * Accepted tokens:
 * | Unit                    | Token | Result examples                  |
 * |-------------------------|-------|----------------------------------|
 * | Month                   | M     | 1, 2, ..., 12                    |
 * |                         | Mo    | 1st, 2nd, ..., 12th              |
 * |                         | MM    | 01, 02, ..., 12                  |
 * |                         | MMM   | Jan, Feb, ..., Dec               |
 * |                         | MMMM  | January, February, ..., December |
 * | Quarter                 | Q     | 1, 2, 3, 4                       |
 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Day of month            | D     | 1, 2, ..., 31                    |
 * |                         | Do    | 1st, 2nd, ..., 31st              |
 * |                         | DD    | 01, 02, ..., 31                  |
 * | Day of year             | DDD   | 1, 2, ..., 366                   |
 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         | DDDD  | 001, 002, ..., 366               |
 * | Day of week             | d     | 0, 1, ..., 6                     |
 * |                         | do    | 0th, 1st, ..., 6th               |
 * |                         | dd    | Su, Mo, ..., Sa                  |
 * |                         | ddd   | Sun, Mon, ..., Sat               |
 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
 * | ISO week                | W     | 1, 2, ..., 53                    |
 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         | WW    | 01, 02, ..., 53                  |
 * | Year                    | YY    | 00, 01, ..., 99                  |
 * |                         | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
 * |                         | GGGG  | 1900, 1901, ..., 2099            |
 * | AM/PM                   | A     | AM, PM                           |
 * |                         | a     | am, pm                           |
 * |                         | aa    | a.m., p.m.                       |
 * | Hour                    | H     | 0, 1, ... 23                     |
 * |                         | HH    | 00, 01, ... 23                   |
 * |                         | h     | 1, 2, ..., 12                    |
 * |                         | hh    | 01, 02, ..., 12                  |
 * | Minute                  | m     | 0, 1, ..., 59                    |
 * |                         | mm    | 00, 01, ..., 59                  |
 * | Second                  | s     | 0, 1, ..., 59                    |
 * |                         | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | SSS   | 000, 001, ..., 999               |
 * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |
 * |                         | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | X     | 512969520                        |
 * | Milliseconds timestamp  | x     | 512969520900                     |
 *
 * The characters wrapped in square brackets are escaped.
 *
 * The result may vary by locale.
 *
 * @param {Date|String|Number} date - the original date
 * @param {String} [format='YYYY-MM-DDTHH:mm:ss.SSSZ'] - the string of tokens
 * @param {Object} [options] - the object with options
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the formatted date string
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(
 *   new Date(2014, 1, 11),
 *   'MM/DD/YYYY'
 * )
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * var eoLocale = require('date-fns/locale/eo')
 * var result = format(
 *   new Date(2014, 6, 2),
 *   'Do [de] MMMM YYYY',
 *   {locale: eoLocale}
 * )
 * //=> '2-a de julio 2014'
 */
function format (dirtyDate, dirtyFormatStr, dirtyOptions) {
  var formatStr = dirtyFormatStr ? String(dirtyFormatStr) : 'YYYY-MM-DDTHH:mm:ss.SSSZ'
  var options = dirtyOptions || {}

  var locale = options.locale
  var localeFormatters = enLocale.format.formatters
  var formattingTokensRegExp = enLocale.format.formattingTokensRegExp
  if (locale && locale.format && locale.format.formatters) {
    localeFormatters = locale.format.formatters

    if (locale.format.formattingTokensRegExp) {
      formattingTokensRegExp = locale.format.formattingTokensRegExp
    }
  }

  var date = parse(dirtyDate)

  if (!isValid(date)) {
    return 'Invalid Date'
  }

  var formatFn = buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp)

  return formatFn(date)
}

var formatters = {
  // Month: 1, 2, ..., 12
  'M': function (date) {
    return date.getMonth() + 1
  },

  // Month: 01, 02, ..., 12
  'MM': function (date) {
    return addLeadingZeros(date.getMonth() + 1, 2)
  },

  // Quarter: 1, 2, 3, 4
  'Q': function (date) {
    return Math.ceil((date.getMonth() + 1) / 3)
  },

  // Day of month: 1, 2, ..., 31
  'D': function (date) {
    return date.getDate()
  },

  // Day of month: 01, 02, ..., 31
  'DD': function (date) {
    return addLeadingZeros(date.getDate(), 2)
  },

  // Day of year: 1, 2, ..., 366
  'DDD': function (date) {
    return getDayOfYear(date)
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': function (date) {
    return addLeadingZeros(getDayOfYear(date), 3)
  },

  // Day of week: 0, 1, ..., 6
  'd': function (date) {
    return date.getDay()
  },

  // Day of ISO week: 1, 2, ..., 7
  'E': function (date) {
    return date.getDay() || 7
  },

  // ISO week: 1, 2, ..., 53
  'W': function (date) {
    return getISOWeek(date)
  },

  // ISO week: 01, 02, ..., 53
  'WW': function (date) {
    return addLeadingZeros(getISOWeek(date), 2)
  },

  // Year: 00, 01, ..., 99
  'YY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4).substr(2)
  },

  // Year: 1900, 1901, ..., 2099
  'YYYY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4)
  },

  // ISO week-numbering year: 00, 01, ..., 99
  'GG': function (date) {
    return String(getISOYear(date)).substr(2)
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': function (date) {
    return getISOYear(date)
  },

  // Hour: 0, 1, ... 23
  'H': function (date) {
    return date.getHours()
  },

  // Hour: 00, 01, ..., 23
  'HH': function (date) {
    return addLeadingZeros(date.getHours(), 2)
  },

  // Hour: 1, 2, ..., 12
  'h': function (date) {
    var hours = date.getHours()
    if (hours === 0) {
      return 12
    } else if (hours > 12) {
      return hours % 12
    } else {
      return hours
    }
  },

  // Hour: 01, 02, ..., 12
  'hh': function (date) {
    return addLeadingZeros(formatters['h'](date), 2)
  },

  // Minute: 0, 1, ..., 59
  'm': function (date) {
    return date.getMinutes()
  },

  // Minute: 00, 01, ..., 59
  'mm': function (date) {
    return addLeadingZeros(date.getMinutes(), 2)
  },

  // Second: 0, 1, ..., 59
  's': function (date) {
    return date.getSeconds()
  },

  // Second: 00, 01, ..., 59
  'ss': function (date) {
    return addLeadingZeros(date.getSeconds(), 2)
  },

  // 1/10 of second: 0, 1, ..., 9
  'S': function (date) {
    return Math.floor(date.getMilliseconds() / 100)
  },

  // 1/100 of second: 00, 01, ..., 99
  'SS': function (date) {
    return addLeadingZeros(Math.floor(date.getMilliseconds() / 10), 2)
  },

  // Millisecond: 000, 001, ..., 999
  'SSS': function (date) {
    return addLeadingZeros(date.getMilliseconds(), 3)
  },

  // Timezone: -01:00, +00:00, ... +12:00
  'Z': function (date) {
    return formatTimezone(date.getTimezoneOffset(), ':')
  },

  // Timezone: -0100, +0000, ... +1200
  'ZZ': function (date) {
    return formatTimezone(date.getTimezoneOffset())
  },

  // Seconds timestamp: 512969520
  'X': function (date) {
    return Math.floor(date.getTime() / 1000)
  },

  // Milliseconds timestamp: 512969520900
  'x': function (date) {
    return date.getTime()
  }
}

function buildFormatFn (formatStr, localeFormatters, formattingTokensRegExp) {
  var array = formatStr.match(formattingTokensRegExp)
  var length = array.length

  var i
  var formatter
  for (i = 0; i < length; i++) {
    formatter = localeFormatters[array[i]] || formatters[array[i]]
    if (formatter) {
      array[i] = formatter
    } else {
      array[i] = removeFormattingTokens(array[i])
    }
  }

  return function (date) {
    var output = ''
    for (var i = 0; i < length; i++) {
      if (array[i] instanceof Function) {
        output += array[i](date, formatters)
      } else {
        output += array[i]
      }
    }
    return output
  }
}

function removeFormattingTokens (input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '')
  }
  return input.replace(/\\/g, '')
}

function formatTimezone (offset, delimeter) {
  delimeter = delimeter || ''
  var sign = offset > 0 ? '-' : '+'
  var absOffset = Math.abs(offset)
  var hours = Math.floor(absOffset / 60)
  var minutes = absOffset % 60
  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2)
}

function addLeadingZeros (number, targetLength) {
  var output = Math.abs(number).toString()
  while (output.length < targetLength) {
    output = '0' + output
  }
  return output
}

module.exports = format


/***/ }),

/***/ "./node_modules/date-fns/get_date/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/get_date/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Day Helpers
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of month
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * var result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */
function getDate (dirtyDate) {
  var date = parse(dirtyDate)
  var dayOfMonth = date.getDate()
  return dayOfMonth
}

module.exports = getDate


/***/ }),

/***/ "./node_modules/date-fns/get_day/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/get_day/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of week
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * var result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
function getDay (dirtyDate) {
  var date = parse(dirtyDate)
  var day = date.getDay()
  return day
}

module.exports = getDay


/***/ }),

/***/ "./node_modules/date-fns/get_day_of_year/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/get_day_of_year/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var startOfYear = __webpack_require__(/*! ../start_of_year/index.js */ "./node_modules/date-fns/start_of_year/index.js")
var differenceInCalendarDays = __webpack_require__(/*! ../difference_in_calendar_days/index.js */ "./node_modules/date-fns/difference_in_calendar_days/index.js")

/**
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * var result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear (dirtyDate) {
  var date = parse(dirtyDate)
  var diff = differenceInCalendarDays(date, startOfYear(date))
  var dayOfYear = diff + 1
  return dayOfYear
}

module.exports = getDayOfYear


/***/ }),

/***/ "./node_modules/date-fns/get_days_in_month/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/get_days_in_month/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * var result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()
  var monthIndex = date.getMonth()
  var lastDayOfMonth = new Date(0)
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0)
  lastDayOfMonth.setHours(0, 0, 0, 0)
  return lastDayOfMonth.getDate()
}

module.exports = getDaysInMonth


/***/ }),

/***/ "./node_modules/date-fns/get_days_in_year/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/get_days_in_year/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isLeapYear = __webpack_require__(/*! ../is_leap_year/index.js */ "./node_modules/date-fns/is_leap_year/index.js")

/**
 * @category Year Helpers
 * @summary Get the number of days in a year of the given date.
 *
 * @description
 * Get the number of days in a year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the number of days in a year
 *
 * @example
 * // How many days are in 2012?
 * var result = getDaysInYear(new Date(2012, 0, 1))
 * //=> 366
 */
function getDaysInYear (dirtyDate) {
  return isLeapYear(dirtyDate) ? 366 : 365
}

module.exports = getDaysInYear


/***/ }),

/***/ "./node_modules/date-fns/get_hours/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/get_hours/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Hour Helpers
 * @summary Get the hours of the given date.
 *
 * @description
 * Get the hours of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the hours
 *
 * @example
 * // Get the hours of 29 February 2012 11:45:00:
 * var result = getHours(new Date(2012, 1, 29, 11, 45))
 * //=> 11
 */
function getHours (dirtyDate) {
  var date = parse(dirtyDate)
  var hours = date.getHours()
  return hours
}

module.exports = getHours


/***/ }),

/***/ "./node_modules/date-fns/get_iso_day/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/get_iso_day/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Weekday Helpers
 * @summary Get the day of the ISO week of the given date.
 *
 * @description
 * Get the day of the ISO week of the given date,
 * which is 7 for Sunday, 1 for Monday etc.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of ISO week
 *
 * @example
 * // Which day of the ISO week is 26 February 2012?
 * var result = getISODay(new Date(2012, 1, 26))
 * //=> 7
 */
function getISODay (dirtyDate) {
  var date = parse(dirtyDate)
  var day = date.getDay()

  if (day === 0) {
    day = 7
  }

  return day
}

module.exports = getISODay


/***/ }),

/***/ "./node_modules/date-fns/get_iso_week/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/get_iso_week/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var startOfISOWeek = __webpack_require__(/*! ../start_of_iso_week/index.js */ "./node_modules/date-fns/start_of_iso_week/index.js")
var startOfISOYear = __webpack_require__(/*! ../start_of_iso_year/index.js */ "./node_modules/date-fns/start_of_iso_year/index.js")

var MILLISECONDS_IN_WEEK = 604800000

/**
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * var result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek (dirtyDate) {
  var date = parse(dirtyDate)
  var diff = startOfISOWeek(date).getTime() - startOfISOYear(date).getTime()

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
}

module.exports = getISOWeek


/***/ }),

/***/ "./node_modules/date-fns/get_iso_weeks_in_year/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/get_iso_weeks_in_year/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfISOYear = __webpack_require__(/*! ../start_of_iso_year/index.js */ "./node_modules/date-fns/start_of_iso_year/index.js")
var addWeeks = __webpack_require__(/*! ../add_weeks/index.js */ "./node_modules/date-fns/add_weeks/index.js")

var MILLISECONDS_IN_WEEK = 604800000

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * @description
 * Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the number of ISO weeks in a year
 *
 * @example
 * // How many weeks are in ISO week-numbering year 2015?
 * var result = getISOWeeksInYear(new Date(2015, 1, 11))
 * //=> 53
 */
function getISOWeeksInYear (dirtyDate) {
  var thisYear = startOfISOYear(dirtyDate)
  var nextYear = startOfISOYear(addWeeks(thisYear, 60))
  var diff = nextYear.valueOf() - thisYear.valueOf()
  // Round the number of weeks to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK)
}

module.exports = getISOWeeksInYear


/***/ }),

/***/ "./node_modules/date-fns/get_iso_year/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/get_iso_year/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var startOfISOWeek = __webpack_require__(/*! ../start_of_iso_week/index.js */ "./node_modules/date-fns/start_of_iso_week/index.js")

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * var result = getISOYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOYear (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()

  var fourthOfJanuaryOfNextYear = new Date(0)
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4)
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0)
  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear)

  var fourthOfJanuaryOfThisYear = new Date(0)
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4)
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0)
  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear)

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}

module.exports = getISOYear


/***/ }),

/***/ "./node_modules/date-fns/get_milliseconds/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/get_milliseconds/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Millisecond Helpers
 * @summary Get the milliseconds of the given date.
 *
 * @description
 * Get the milliseconds of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the milliseconds
 *
 * @example
 * // Get the milliseconds of 29 February 2012 11:45:05.123:
 * var result = getMilliseconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 123
 */
function getMilliseconds (dirtyDate) {
  var date = parse(dirtyDate)
  var milliseconds = date.getMilliseconds()
  return milliseconds
}

module.exports = getMilliseconds


/***/ }),

/***/ "./node_modules/date-fns/get_minutes/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/get_minutes/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Minute Helpers
 * @summary Get the minutes of the given date.
 *
 * @description
 * Get the minutes of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the minutes
 *
 * @example
 * // Get the minutes of 29 February 2012 11:45:05:
 * var result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 45
 */
function getMinutes (dirtyDate) {
  var date = parse(dirtyDate)
  var minutes = date.getMinutes()
  return minutes
}

module.exports = getMinutes


/***/ }),

/***/ "./node_modules/date-fns/get_month/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/get_month/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Month Helpers
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the month
 *
 * @example
 * // Which month is 29 February 2012?
 * var result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
function getMonth (dirtyDate) {
  var date = parse(dirtyDate)
  var month = date.getMonth()
  return month
}

module.exports = getMonth


/***/ }),

/***/ "./node_modules/date-fns/get_overlapping_days_in_ranges/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/get_overlapping_days_in_ranges/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

var MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000

/**
 * @category Range Helpers
 * @summary Get the number of days that overlap in two date ranges
 *
 * @description
 * Get the number of days that overlap in two date ranges
 *
 * @param {Date|String|Number} initialRangeStartDate - the start of the initial range
 * @param {Date|String|Number} initialRangeEndDate - the end of the initial range
 * @param {Date|String|Number} comparedRangeStartDate - the start of the range to compare it with
 * @param {Date|String|Number} comparedRangeEndDate - the end of the range to compare it with
 * @returns {Number} the number of days that overlap in two date ranges
 * @throws {Error} startDate of a date range cannot be after its endDate
 *
 * @example
 * // For overlapping date ranges adds 1 for each started overlapping day:
 * getOverlappingDaysInRanges(
 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 17), new Date(2014, 0, 21)
 * )
 * //=> 3
 *
 * @example
 * // For non-overlapping date ranges returns 0:
 * getOverlappingDaysInRanges(
 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 21), new Date(2014, 0, 22)
 * )
 * //=> 0
 */
function getOverlappingDaysInRanges (dirtyInitialRangeStartDate, dirtyInitialRangeEndDate, dirtyComparedRangeStartDate, dirtyComparedRangeEndDate) {
  var initialStartTime = parse(dirtyInitialRangeStartDate).getTime()
  var initialEndTime = parse(dirtyInitialRangeEndDate).getTime()
  var comparedStartTime = parse(dirtyComparedRangeStartDate).getTime()
  var comparedEndTime = parse(dirtyComparedRangeEndDate).getTime()

  if (initialStartTime > initialEndTime || comparedStartTime > comparedEndTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  var isOverlapping = initialStartTime < comparedEndTime && comparedStartTime < initialEndTime

  if (!isOverlapping) {
    return 0
  }

  var overlapStartDate = comparedStartTime < initialStartTime
    ? initialStartTime
    : comparedStartTime

  var overlapEndDate = comparedEndTime > initialEndTime
    ? initialEndTime
    : comparedEndTime

  var differenceInMs = overlapEndDate - overlapStartDate

  return Math.ceil(differenceInMs / MILLISECONDS_IN_DAY)
}

module.exports = getOverlappingDaysInRanges


/***/ }),

/***/ "./node_modules/date-fns/get_quarter/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/get_quarter/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Quarter Helpers
 * @summary Get the year quarter of the given date.
 *
 * @description
 * Get the year quarter of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the quarter
 *
 * @example
 * // Which quarter is 2 July 2014?
 * var result = getQuarter(new Date(2014, 6, 2))
 * //=> 3
 */
function getQuarter (dirtyDate) {
  var date = parse(dirtyDate)
  var quarter = Math.floor(date.getMonth() / 3) + 1
  return quarter
}

module.exports = getQuarter


/***/ }),

/***/ "./node_modules/date-fns/get_seconds/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/get_seconds/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Second Helpers
 * @summary Get the seconds of the given date.
 *
 * @description
 * Get the seconds of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the seconds
 *
 * @example
 * // Get the seconds of 29 February 2012 11:45:05.123:
 * var result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 5
 */
function getSeconds (dirtyDate) {
  var date = parse(dirtyDate)
  var seconds = date.getSeconds()
  return seconds
}

module.exports = getSeconds


/***/ }),

/***/ "./node_modules/date-fns/get_time/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/get_time/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Timestamp Helpers
 * @summary Get the milliseconds timestamp of the given date.
 *
 * @description
 * Get the milliseconds timestamp of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the timestamp
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05.123:
 * var result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 1330515905123
 */
function getTime (dirtyDate) {
  var date = parse(dirtyDate)
  var timestamp = date.getTime()
  return timestamp
}

module.exports = getTime


/***/ }),

/***/ "./node_modules/date-fns/get_year/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/get_year/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Year Helpers
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the year
 *
 * @example
 * // Which year is 2 July 2014?
 * var result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
function getYear (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()
  return year
}

module.exports = getYear


/***/ }),

/***/ "./node_modules/date-fns/index.js":
/*!****************************************!*\
  !*** ./node_modules/date-fns/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  addDays: __webpack_require__(/*! ./add_days/index.js */ "./node_modules/date-fns/add_days/index.js"),
  addHours: __webpack_require__(/*! ./add_hours/index.js */ "./node_modules/date-fns/add_hours/index.js"),
  addISOYears: __webpack_require__(/*! ./add_iso_years/index.js */ "./node_modules/date-fns/add_iso_years/index.js"),
  addMilliseconds: __webpack_require__(/*! ./add_milliseconds/index.js */ "./node_modules/date-fns/add_milliseconds/index.js"),
  addMinutes: __webpack_require__(/*! ./add_minutes/index.js */ "./node_modules/date-fns/add_minutes/index.js"),
  addMonths: __webpack_require__(/*! ./add_months/index.js */ "./node_modules/date-fns/add_months/index.js"),
  addQuarters: __webpack_require__(/*! ./add_quarters/index.js */ "./node_modules/date-fns/add_quarters/index.js"),
  addSeconds: __webpack_require__(/*! ./add_seconds/index.js */ "./node_modules/date-fns/add_seconds/index.js"),
  addWeeks: __webpack_require__(/*! ./add_weeks/index.js */ "./node_modules/date-fns/add_weeks/index.js"),
  addYears: __webpack_require__(/*! ./add_years/index.js */ "./node_modules/date-fns/add_years/index.js"),
  areRangesOverlapping: __webpack_require__(/*! ./are_ranges_overlapping/index.js */ "./node_modules/date-fns/are_ranges_overlapping/index.js"),
  closestIndexTo: __webpack_require__(/*! ./closest_index_to/index.js */ "./node_modules/date-fns/closest_index_to/index.js"),
  closestTo: __webpack_require__(/*! ./closest_to/index.js */ "./node_modules/date-fns/closest_to/index.js"),
  compareAsc: __webpack_require__(/*! ./compare_asc/index.js */ "./node_modules/date-fns/compare_asc/index.js"),
  compareDesc: __webpack_require__(/*! ./compare_desc/index.js */ "./node_modules/date-fns/compare_desc/index.js"),
  differenceInCalendarDays: __webpack_require__(/*! ./difference_in_calendar_days/index.js */ "./node_modules/date-fns/difference_in_calendar_days/index.js"),
  differenceInCalendarISOWeeks: __webpack_require__(/*! ./difference_in_calendar_iso_weeks/index.js */ "./node_modules/date-fns/difference_in_calendar_iso_weeks/index.js"),
  differenceInCalendarISOYears: __webpack_require__(/*! ./difference_in_calendar_iso_years/index.js */ "./node_modules/date-fns/difference_in_calendar_iso_years/index.js"),
  differenceInCalendarMonths: __webpack_require__(/*! ./difference_in_calendar_months/index.js */ "./node_modules/date-fns/difference_in_calendar_months/index.js"),
  differenceInCalendarQuarters: __webpack_require__(/*! ./difference_in_calendar_quarters/index.js */ "./node_modules/date-fns/difference_in_calendar_quarters/index.js"),
  differenceInCalendarWeeks: __webpack_require__(/*! ./difference_in_calendar_weeks/index.js */ "./node_modules/date-fns/difference_in_calendar_weeks/index.js"),
  differenceInCalendarYears: __webpack_require__(/*! ./difference_in_calendar_years/index.js */ "./node_modules/date-fns/difference_in_calendar_years/index.js"),
  differenceInDays: __webpack_require__(/*! ./difference_in_days/index.js */ "./node_modules/date-fns/difference_in_days/index.js"),
  differenceInHours: __webpack_require__(/*! ./difference_in_hours/index.js */ "./node_modules/date-fns/difference_in_hours/index.js"),
  differenceInISOYears: __webpack_require__(/*! ./difference_in_iso_years/index.js */ "./node_modules/date-fns/difference_in_iso_years/index.js"),
  differenceInMilliseconds: __webpack_require__(/*! ./difference_in_milliseconds/index.js */ "./node_modules/date-fns/difference_in_milliseconds/index.js"),
  differenceInMinutes: __webpack_require__(/*! ./difference_in_minutes/index.js */ "./node_modules/date-fns/difference_in_minutes/index.js"),
  differenceInMonths: __webpack_require__(/*! ./difference_in_months/index.js */ "./node_modules/date-fns/difference_in_months/index.js"),
  differenceInQuarters: __webpack_require__(/*! ./difference_in_quarters/index.js */ "./node_modules/date-fns/difference_in_quarters/index.js"),
  differenceInSeconds: __webpack_require__(/*! ./difference_in_seconds/index.js */ "./node_modules/date-fns/difference_in_seconds/index.js"),
  differenceInWeeks: __webpack_require__(/*! ./difference_in_weeks/index.js */ "./node_modules/date-fns/difference_in_weeks/index.js"),
  differenceInYears: __webpack_require__(/*! ./difference_in_years/index.js */ "./node_modules/date-fns/difference_in_years/index.js"),
  distanceInWords: __webpack_require__(/*! ./distance_in_words/index.js */ "./node_modules/date-fns/distance_in_words/index.js"),
  distanceInWordsStrict: __webpack_require__(/*! ./distance_in_words_strict/index.js */ "./node_modules/date-fns/distance_in_words_strict/index.js"),
  distanceInWordsToNow: __webpack_require__(/*! ./distance_in_words_to_now/index.js */ "./node_modules/date-fns/distance_in_words_to_now/index.js"),
  eachDay: __webpack_require__(/*! ./each_day/index.js */ "./node_modules/date-fns/each_day/index.js"),
  endOfDay: __webpack_require__(/*! ./end_of_day/index.js */ "./node_modules/date-fns/end_of_day/index.js"),
  endOfHour: __webpack_require__(/*! ./end_of_hour/index.js */ "./node_modules/date-fns/end_of_hour/index.js"),
  endOfISOWeek: __webpack_require__(/*! ./end_of_iso_week/index.js */ "./node_modules/date-fns/end_of_iso_week/index.js"),
  endOfISOYear: __webpack_require__(/*! ./end_of_iso_year/index.js */ "./node_modules/date-fns/end_of_iso_year/index.js"),
  endOfMinute: __webpack_require__(/*! ./end_of_minute/index.js */ "./node_modules/date-fns/end_of_minute/index.js"),
  endOfMonth: __webpack_require__(/*! ./end_of_month/index.js */ "./node_modules/date-fns/end_of_month/index.js"),
  endOfQuarter: __webpack_require__(/*! ./end_of_quarter/index.js */ "./node_modules/date-fns/end_of_quarter/index.js"),
  endOfSecond: __webpack_require__(/*! ./end_of_second/index.js */ "./node_modules/date-fns/end_of_second/index.js"),
  endOfToday: __webpack_require__(/*! ./end_of_today/index.js */ "./node_modules/date-fns/end_of_today/index.js"),
  endOfTomorrow: __webpack_require__(/*! ./end_of_tomorrow/index.js */ "./node_modules/date-fns/end_of_tomorrow/index.js"),
  endOfWeek: __webpack_require__(/*! ./end_of_week/index.js */ "./node_modules/date-fns/end_of_week/index.js"),
  endOfYear: __webpack_require__(/*! ./end_of_year/index.js */ "./node_modules/date-fns/end_of_year/index.js"),
  endOfYesterday: __webpack_require__(/*! ./end_of_yesterday/index.js */ "./node_modules/date-fns/end_of_yesterday/index.js"),
  format: __webpack_require__(/*! ./format/index.js */ "./node_modules/date-fns/format/index.js"),
  getDate: __webpack_require__(/*! ./get_date/index.js */ "./node_modules/date-fns/get_date/index.js"),
  getDay: __webpack_require__(/*! ./get_day/index.js */ "./node_modules/date-fns/get_day/index.js"),
  getDayOfYear: __webpack_require__(/*! ./get_day_of_year/index.js */ "./node_modules/date-fns/get_day_of_year/index.js"),
  getDaysInMonth: __webpack_require__(/*! ./get_days_in_month/index.js */ "./node_modules/date-fns/get_days_in_month/index.js"),
  getDaysInYear: __webpack_require__(/*! ./get_days_in_year/index.js */ "./node_modules/date-fns/get_days_in_year/index.js"),
  getHours: __webpack_require__(/*! ./get_hours/index.js */ "./node_modules/date-fns/get_hours/index.js"),
  getISODay: __webpack_require__(/*! ./get_iso_day/index.js */ "./node_modules/date-fns/get_iso_day/index.js"),
  getISOWeek: __webpack_require__(/*! ./get_iso_week/index.js */ "./node_modules/date-fns/get_iso_week/index.js"),
  getISOWeeksInYear: __webpack_require__(/*! ./get_iso_weeks_in_year/index.js */ "./node_modules/date-fns/get_iso_weeks_in_year/index.js"),
  getISOYear: __webpack_require__(/*! ./get_iso_year/index.js */ "./node_modules/date-fns/get_iso_year/index.js"),
  getMilliseconds: __webpack_require__(/*! ./get_milliseconds/index.js */ "./node_modules/date-fns/get_milliseconds/index.js"),
  getMinutes: __webpack_require__(/*! ./get_minutes/index.js */ "./node_modules/date-fns/get_minutes/index.js"),
  getMonth: __webpack_require__(/*! ./get_month/index.js */ "./node_modules/date-fns/get_month/index.js"),
  getOverlappingDaysInRanges: __webpack_require__(/*! ./get_overlapping_days_in_ranges/index.js */ "./node_modules/date-fns/get_overlapping_days_in_ranges/index.js"),
  getQuarter: __webpack_require__(/*! ./get_quarter/index.js */ "./node_modules/date-fns/get_quarter/index.js"),
  getSeconds: __webpack_require__(/*! ./get_seconds/index.js */ "./node_modules/date-fns/get_seconds/index.js"),
  getTime: __webpack_require__(/*! ./get_time/index.js */ "./node_modules/date-fns/get_time/index.js"),
  getYear: __webpack_require__(/*! ./get_year/index.js */ "./node_modules/date-fns/get_year/index.js"),
  isAfter: __webpack_require__(/*! ./is_after/index.js */ "./node_modules/date-fns/is_after/index.js"),
  isBefore: __webpack_require__(/*! ./is_before/index.js */ "./node_modules/date-fns/is_before/index.js"),
  isDate: __webpack_require__(/*! ./is_date/index.js */ "./node_modules/date-fns/is_date/index.js"),
  isEqual: __webpack_require__(/*! ./is_equal/index.js */ "./node_modules/date-fns/is_equal/index.js"),
  isFirstDayOfMonth: __webpack_require__(/*! ./is_first_day_of_month/index.js */ "./node_modules/date-fns/is_first_day_of_month/index.js"),
  isFriday: __webpack_require__(/*! ./is_friday/index.js */ "./node_modules/date-fns/is_friday/index.js"),
  isFuture: __webpack_require__(/*! ./is_future/index.js */ "./node_modules/date-fns/is_future/index.js"),
  isLastDayOfMonth: __webpack_require__(/*! ./is_last_day_of_month/index.js */ "./node_modules/date-fns/is_last_day_of_month/index.js"),
  isLeapYear: __webpack_require__(/*! ./is_leap_year/index.js */ "./node_modules/date-fns/is_leap_year/index.js"),
  isMonday: __webpack_require__(/*! ./is_monday/index.js */ "./node_modules/date-fns/is_monday/index.js"),
  isPast: __webpack_require__(/*! ./is_past/index.js */ "./node_modules/date-fns/is_past/index.js"),
  isSameDay: __webpack_require__(/*! ./is_same_day/index.js */ "./node_modules/date-fns/is_same_day/index.js"),
  isSameHour: __webpack_require__(/*! ./is_same_hour/index.js */ "./node_modules/date-fns/is_same_hour/index.js"),
  isSameISOWeek: __webpack_require__(/*! ./is_same_iso_week/index.js */ "./node_modules/date-fns/is_same_iso_week/index.js"),
  isSameISOYear: __webpack_require__(/*! ./is_same_iso_year/index.js */ "./node_modules/date-fns/is_same_iso_year/index.js"),
  isSameMinute: __webpack_require__(/*! ./is_same_minute/index.js */ "./node_modules/date-fns/is_same_minute/index.js"),
  isSameMonth: __webpack_require__(/*! ./is_same_month/index.js */ "./node_modules/date-fns/is_same_month/index.js"),
  isSameQuarter: __webpack_require__(/*! ./is_same_quarter/index.js */ "./node_modules/date-fns/is_same_quarter/index.js"),
  isSameSecond: __webpack_require__(/*! ./is_same_second/index.js */ "./node_modules/date-fns/is_same_second/index.js"),
  isSameWeek: __webpack_require__(/*! ./is_same_week/index.js */ "./node_modules/date-fns/is_same_week/index.js"),
  isSameYear: __webpack_require__(/*! ./is_same_year/index.js */ "./node_modules/date-fns/is_same_year/index.js"),
  isSaturday: __webpack_require__(/*! ./is_saturday/index.js */ "./node_modules/date-fns/is_saturday/index.js"),
  isSunday: __webpack_require__(/*! ./is_sunday/index.js */ "./node_modules/date-fns/is_sunday/index.js"),
  isThisHour: __webpack_require__(/*! ./is_this_hour/index.js */ "./node_modules/date-fns/is_this_hour/index.js"),
  isThisISOWeek: __webpack_require__(/*! ./is_this_iso_week/index.js */ "./node_modules/date-fns/is_this_iso_week/index.js"),
  isThisISOYear: __webpack_require__(/*! ./is_this_iso_year/index.js */ "./node_modules/date-fns/is_this_iso_year/index.js"),
  isThisMinute: __webpack_require__(/*! ./is_this_minute/index.js */ "./node_modules/date-fns/is_this_minute/index.js"),
  isThisMonth: __webpack_require__(/*! ./is_this_month/index.js */ "./node_modules/date-fns/is_this_month/index.js"),
  isThisQuarter: __webpack_require__(/*! ./is_this_quarter/index.js */ "./node_modules/date-fns/is_this_quarter/index.js"),
  isThisSecond: __webpack_require__(/*! ./is_this_second/index.js */ "./node_modules/date-fns/is_this_second/index.js"),
  isThisWeek: __webpack_require__(/*! ./is_this_week/index.js */ "./node_modules/date-fns/is_this_week/index.js"),
  isThisYear: __webpack_require__(/*! ./is_this_year/index.js */ "./node_modules/date-fns/is_this_year/index.js"),
  isThursday: __webpack_require__(/*! ./is_thursday/index.js */ "./node_modules/date-fns/is_thursday/index.js"),
  isToday: __webpack_require__(/*! ./is_today/index.js */ "./node_modules/date-fns/is_today/index.js"),
  isTomorrow: __webpack_require__(/*! ./is_tomorrow/index.js */ "./node_modules/date-fns/is_tomorrow/index.js"),
  isTuesday: __webpack_require__(/*! ./is_tuesday/index.js */ "./node_modules/date-fns/is_tuesday/index.js"),
  isValid: __webpack_require__(/*! ./is_valid/index.js */ "./node_modules/date-fns/is_valid/index.js"),
  isWednesday: __webpack_require__(/*! ./is_wednesday/index.js */ "./node_modules/date-fns/is_wednesday/index.js"),
  isWeekend: __webpack_require__(/*! ./is_weekend/index.js */ "./node_modules/date-fns/is_weekend/index.js"),
  isWithinRange: __webpack_require__(/*! ./is_within_range/index.js */ "./node_modules/date-fns/is_within_range/index.js"),
  isYesterday: __webpack_require__(/*! ./is_yesterday/index.js */ "./node_modules/date-fns/is_yesterday/index.js"),
  lastDayOfISOWeek: __webpack_require__(/*! ./last_day_of_iso_week/index.js */ "./node_modules/date-fns/last_day_of_iso_week/index.js"),
  lastDayOfISOYear: __webpack_require__(/*! ./last_day_of_iso_year/index.js */ "./node_modules/date-fns/last_day_of_iso_year/index.js"),
  lastDayOfMonth: __webpack_require__(/*! ./last_day_of_month/index.js */ "./node_modules/date-fns/last_day_of_month/index.js"),
  lastDayOfQuarter: __webpack_require__(/*! ./last_day_of_quarter/index.js */ "./node_modules/date-fns/last_day_of_quarter/index.js"),
  lastDayOfWeek: __webpack_require__(/*! ./last_day_of_week/index.js */ "./node_modules/date-fns/last_day_of_week/index.js"),
  lastDayOfYear: __webpack_require__(/*! ./last_day_of_year/index.js */ "./node_modules/date-fns/last_day_of_year/index.js"),
  max: __webpack_require__(/*! ./max/index.js */ "./node_modules/date-fns/max/index.js"),
  min: __webpack_require__(/*! ./min/index.js */ "./node_modules/date-fns/min/index.js"),
  parse: __webpack_require__(/*! ./parse/index.js */ "./node_modules/date-fns/parse/index.js"),
  setDate: __webpack_require__(/*! ./set_date/index.js */ "./node_modules/date-fns/set_date/index.js"),
  setDay: __webpack_require__(/*! ./set_day/index.js */ "./node_modules/date-fns/set_day/index.js"),
  setDayOfYear: __webpack_require__(/*! ./set_day_of_year/index.js */ "./node_modules/date-fns/set_day_of_year/index.js"),
  setHours: __webpack_require__(/*! ./set_hours/index.js */ "./node_modules/date-fns/set_hours/index.js"),
  setISODay: __webpack_require__(/*! ./set_iso_day/index.js */ "./node_modules/date-fns/set_iso_day/index.js"),
  setISOWeek: __webpack_require__(/*! ./set_iso_week/index.js */ "./node_modules/date-fns/set_iso_week/index.js"),
  setISOYear: __webpack_require__(/*! ./set_iso_year/index.js */ "./node_modules/date-fns/set_iso_year/index.js"),
  setMilliseconds: __webpack_require__(/*! ./set_milliseconds/index.js */ "./node_modules/date-fns/set_milliseconds/index.js"),
  setMinutes: __webpack_require__(/*! ./set_minutes/index.js */ "./node_modules/date-fns/set_minutes/index.js"),
  setMonth: __webpack_require__(/*! ./set_month/index.js */ "./node_modules/date-fns/set_month/index.js"),
  setQuarter: __webpack_require__(/*! ./set_quarter/index.js */ "./node_modules/date-fns/set_quarter/index.js"),
  setSeconds: __webpack_require__(/*! ./set_seconds/index.js */ "./node_modules/date-fns/set_seconds/index.js"),
  setYear: __webpack_require__(/*! ./set_year/index.js */ "./node_modules/date-fns/set_year/index.js"),
  startOfDay: __webpack_require__(/*! ./start_of_day/index.js */ "./node_modules/date-fns/start_of_day/index.js"),
  startOfHour: __webpack_require__(/*! ./start_of_hour/index.js */ "./node_modules/date-fns/start_of_hour/index.js"),
  startOfISOWeek: __webpack_require__(/*! ./start_of_iso_week/index.js */ "./node_modules/date-fns/start_of_iso_week/index.js"),
  startOfISOYear: __webpack_require__(/*! ./start_of_iso_year/index.js */ "./node_modules/date-fns/start_of_iso_year/index.js"),
  startOfMinute: __webpack_require__(/*! ./start_of_minute/index.js */ "./node_modules/date-fns/start_of_minute/index.js"),
  startOfMonth: __webpack_require__(/*! ./start_of_month/index.js */ "./node_modules/date-fns/start_of_month/index.js"),
  startOfQuarter: __webpack_require__(/*! ./start_of_quarter/index.js */ "./node_modules/date-fns/start_of_quarter/index.js"),
  startOfSecond: __webpack_require__(/*! ./start_of_second/index.js */ "./node_modules/date-fns/start_of_second/index.js"),
  startOfToday: __webpack_require__(/*! ./start_of_today/index.js */ "./node_modules/date-fns/start_of_today/index.js"),
  startOfTomorrow: __webpack_require__(/*! ./start_of_tomorrow/index.js */ "./node_modules/date-fns/start_of_tomorrow/index.js"),
  startOfWeek: __webpack_require__(/*! ./start_of_week/index.js */ "./node_modules/date-fns/start_of_week/index.js"),
  startOfYear: __webpack_require__(/*! ./start_of_year/index.js */ "./node_modules/date-fns/start_of_year/index.js"),
  startOfYesterday: __webpack_require__(/*! ./start_of_yesterday/index.js */ "./node_modules/date-fns/start_of_yesterday/index.js"),
  subDays: __webpack_require__(/*! ./sub_days/index.js */ "./node_modules/date-fns/sub_days/index.js"),
  subHours: __webpack_require__(/*! ./sub_hours/index.js */ "./node_modules/date-fns/sub_hours/index.js"),
  subISOYears: __webpack_require__(/*! ./sub_iso_years/index.js */ "./node_modules/date-fns/sub_iso_years/index.js"),
  subMilliseconds: __webpack_require__(/*! ./sub_milliseconds/index.js */ "./node_modules/date-fns/sub_milliseconds/index.js"),
  subMinutes: __webpack_require__(/*! ./sub_minutes/index.js */ "./node_modules/date-fns/sub_minutes/index.js"),
  subMonths: __webpack_require__(/*! ./sub_months/index.js */ "./node_modules/date-fns/sub_months/index.js"),
  subQuarters: __webpack_require__(/*! ./sub_quarters/index.js */ "./node_modules/date-fns/sub_quarters/index.js"),
  subSeconds: __webpack_require__(/*! ./sub_seconds/index.js */ "./node_modules/date-fns/sub_seconds/index.js"),
  subWeeks: __webpack_require__(/*! ./sub_weeks/index.js */ "./node_modules/date-fns/sub_weeks/index.js"),
  subYears: __webpack_require__(/*! ./sub_years/index.js */ "./node_modules/date-fns/sub_years/index.js")
}


/***/ }),

/***/ "./node_modules/date-fns/is_after/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/is_after/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param {Date|String|Number} date - the date that should be after the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is after the second date
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter (dirtyDate, dirtyDateToCompare) {
  var date = parse(dirtyDate)
  var dateToCompare = parse(dirtyDateToCompare)
  return date.getTime() > dateToCompare.getTime()
}

module.exports = isAfter


/***/ }),

/***/ "./node_modules/date-fns/is_before/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/is_before/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param {Date|String|Number} date - the date that should be before the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore (dirtyDate, dirtyDateToCompare) {
  var date = parse(dirtyDate)
  var dateToCompare = parse(dirtyDateToCompare)
  return date.getTime() < dateToCompare.getTime()
}

module.exports = isBefore


/***/ }),

/***/ "./node_modules/date-fns/is_date/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/is_date/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @category Common Helpers
 * @summary Is the given argument an instance of Date?
 *
 * @description
 * Is the given argument an instance of Date?
 *
 * @param {*} argument - the argument to check
 * @returns {Boolean} the given argument is an instance of Date
 *
 * @example
 * // Is 'mayonnaise' a Date?
 * var result = isDate('mayonnaise')
 * //=> false
 */
function isDate (argument) {
  return argument instanceof Date
}

module.exports = isDate


/***/ }),

/***/ "./node_modules/date-fns/is_equal/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/is_equal/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Common Helpers
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * @param {Date|String|Number} dateLeft - the first date to compare
 * @param {Date|String|Number} dateRight - the second date to compare
 * @returns {Boolean} the dates are equal
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * var result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0)
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
function isEqual (dirtyLeftDate, dirtyRightDate) {
  var dateLeft = parse(dirtyLeftDate)
  var dateRight = parse(dirtyRightDate)
  return dateLeft.getTime() === dateRight.getTime()
}

module.exports = isEqual


/***/ }),

/***/ "./node_modules/date-fns/is_first_day_of_month/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/is_first_day_of_month/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Month Helpers
 * @summary Is the given date the first day of a month?
 *
 * @description
 * Is the given date the first day of a month?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is the first day of a month
 *
 * @example
 * // Is 1 September 2014 the first day of a month?
 * var result = isFirstDayOfMonth(new Date(2014, 8, 1))
 * //=> true
 */
function isFirstDayOfMonth (dirtyDate) {
  return parse(dirtyDate).getDate() === 1
}

module.exports = isFirstDayOfMonth


/***/ }),

/***/ "./node_modules/date-fns/is_friday/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/is_friday/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Weekday Helpers
 * @summary Is the given date Friday?
 *
 * @description
 * Is the given date Friday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Friday
 *
 * @example
 * // Is 26 September 2014 Friday?
 * var result = isFriday(new Date(2014, 8, 26))
 * //=> true
 */
function isFriday (dirtyDate) {
  return parse(dirtyDate).getDay() === 5
}

module.exports = isFriday


/***/ }),

/***/ "./node_modules/date-fns/is_future/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/is_future/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Common Helpers
 * @summary Is the given date in the future?
 *
 * @description
 * Is the given date in the future?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in the future
 *
 * @example
 * // If today is 6 October 2014, is 31 December 2014 in the future?
 * var result = isFuture(new Date(2014, 11, 31))
 * //=> true
 */
function isFuture (dirtyDate) {
  return parse(dirtyDate).getTime() > new Date().getTime()
}

module.exports = isFuture


/***/ }),

/***/ "./node_modules/date-fns/is_last_day_of_month/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/is_last_day_of_month/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var endOfDay = __webpack_require__(/*! ../end_of_day/index.js */ "./node_modules/date-fns/end_of_day/index.js")
var endOfMonth = __webpack_require__(/*! ../end_of_month/index.js */ "./node_modules/date-fns/end_of_month/index.js")

/**
 * @category Month Helpers
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is the last day of a month
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * var result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */
function isLastDayOfMonth (dirtyDate) {
  var date = parse(dirtyDate)
  return endOfDay(date).getTime() === endOfMonth(date).getTime()
}

module.exports = isLastDayOfMonth


/***/ }),

/***/ "./node_modules/date-fns/is_leap_year/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_leap_year/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Year Helpers
 * @summary Is the given date in the leap year?
 *
 * @description
 * Is the given date in the leap year?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in the leap year
 *
 * @example
 * // Is 1 September 2012 in the leap year?
 * var result = isLeapYear(new Date(2012, 8, 1))
 * //=> true
 */
function isLeapYear (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0
}

module.exports = isLeapYear


/***/ }),

/***/ "./node_modules/date-fns/is_monday/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/is_monday/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Weekday Helpers
 * @summary Is the given date Monday?
 *
 * @description
 * Is the given date Monday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Monday
 *
 * @example
 * // Is 22 September 2014 Monday?
 * var result = isMonday(new Date(2014, 8, 22))
 * //=> true
 */
function isMonday (dirtyDate) {
  return parse(dirtyDate).getDay() === 1
}

module.exports = isMonday


/***/ }),

/***/ "./node_modules/date-fns/is_past/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/is_past/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Common Helpers
 * @summary Is the given date in the past?
 *
 * @description
 * Is the given date in the past?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in the past
 *
 * @example
 * // If today is 6 October 2014, is 2 July 2014 in the past?
 * var result = isPast(new Date(2014, 6, 2))
 * //=> true
 */
function isPast (dirtyDate) {
  return parse(dirtyDate).getTime() < new Date().getTime()
}

module.exports = isPast


/***/ }),

/***/ "./node_modules/date-fns/is_same_day/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/is_same_day/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(/*! ../start_of_day/index.js */ "./node_modules/date-fns/start_of_day/index.js")

/**
 * @category Day Helpers
 * @summary Are the given dates in the same day?
 *
 * @description
 * Are the given dates in the same day?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * var result = isSameDay(
 *   new Date(2014, 8, 4, 6, 0),
 *   new Date(2014, 8, 4, 18, 0)
 * )
 * //=> true
 */
function isSameDay (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft)
  var dateRightStartOfDay = startOfDay(dirtyDateRight)

  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime()
}

module.exports = isSameDay


/***/ }),

/***/ "./node_modules/date-fns/is_same_hour/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_same_hour/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfHour = __webpack_require__(/*! ../start_of_hour/index.js */ "./node_modules/date-fns/start_of_hour/index.js")

/**
 * @category Hour Helpers
 * @summary Are the given dates in the same hour?
 *
 * @description
 * Are the given dates in the same hour?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same hour
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?
 * var result = isSameHour(
 *   new Date(2014, 8, 4, 6, 0),
 *   new Date(2014, 8, 4, 6, 30)
 * )
 * //=> true
 */
function isSameHour (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfHour = startOfHour(dirtyDateLeft)
  var dateRightStartOfHour = startOfHour(dirtyDateRight)

  return dateLeftStartOfHour.getTime() === dateRightStartOfHour.getTime()
}

module.exports = isSameHour


/***/ }),

/***/ "./node_modules/date-fns/is_same_iso_week/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/is_same_iso_week/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isSameWeek = __webpack_require__(/*! ../is_same_week/index.js */ "./node_modules/date-fns/is_same_week/index.js")

/**
 * @category ISO Week Helpers
 * @summary Are the given dates in the same ISO week?
 *
 * @description
 * Are the given dates in the same ISO week?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same ISO week
 *
 * @example
 * // Are 1 September 2014 and 7 September 2014 in the same ISO week?
 * var result = isSameISOWeek(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 8, 7)
 * )
 * //=> true
 */
function isSameISOWeek (dirtyDateLeft, dirtyDateRight) {
  return isSameWeek(dirtyDateLeft, dirtyDateRight, {weekStartsOn: 1})
}

module.exports = isSameISOWeek


/***/ }),

/***/ "./node_modules/date-fns/is_same_iso_year/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/is_same_iso_year/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfISOYear = __webpack_require__(/*! ../start_of_iso_year/index.js */ "./node_modules/date-fns/start_of_iso_year/index.js")

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Are the given dates in the same ISO week-numbering year?
 *
 * @description
 * Are the given dates in the same ISO week-numbering year?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same ISO week-numbering year
 *
 * @example
 * // Are 29 December 2003 and 2 January 2005 in the same ISO week-numbering year?
 * var result = isSameISOYear(
 *   new Date(2003, 11, 29),
 *   new Date(2005, 0, 2)
 * )
 * //=> true
 */
function isSameISOYear (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfYear = startOfISOYear(dirtyDateLeft)
  var dateRightStartOfYear = startOfISOYear(dirtyDateRight)

  return dateLeftStartOfYear.getTime() === dateRightStartOfYear.getTime()
}

module.exports = isSameISOYear


/***/ }),

/***/ "./node_modules/date-fns/is_same_minute/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/is_same_minute/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfMinute = __webpack_require__(/*! ../start_of_minute/index.js */ "./node_modules/date-fns/start_of_minute/index.js")

/**
 * @category Minute Helpers
 * @summary Are the given dates in the same minute?
 *
 * @description
 * Are the given dates in the same minute?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same minute
 *
 * @example
 * // Are 4 September 2014 06:30:00 and 4 September 2014 06:30:15
 * // in the same minute?
 * var result = isSameMinute(
 *   new Date(2014, 8, 4, 6, 30),
 *   new Date(2014, 8, 4, 6, 30, 15)
 * )
 * //=> true
 */
function isSameMinute (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfMinute = startOfMinute(dirtyDateLeft)
  var dateRightStartOfMinute = startOfMinute(dirtyDateRight)

  return dateLeftStartOfMinute.getTime() === dateRightStartOfMinute.getTime()
}

module.exports = isSameMinute


/***/ }),

/***/ "./node_modules/date-fns/is_same_month/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/is_same_month/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Month Helpers
 * @summary Are the given dates in the same month?
 *
 * @description
 * Are the given dates in the same month?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same month
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * var result = isSameMonth(
 *   new Date(2014, 8, 2),
 *   new Date(2014, 8, 25)
 * )
 * //=> true
 */
function isSameMonth (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)
  return dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth()
}

module.exports = isSameMonth


/***/ }),

/***/ "./node_modules/date-fns/is_same_quarter/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/is_same_quarter/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfQuarter = __webpack_require__(/*! ../start_of_quarter/index.js */ "./node_modules/date-fns/start_of_quarter/index.js")

/**
 * @category Quarter Helpers
 * @summary Are the given dates in the same year quarter?
 *
 * @description
 * Are the given dates in the same year quarter?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same quarter
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * var result = isSameQuarter(
 *   new Date(2014, 0, 1),
 *   new Date(2014, 2, 8)
 * )
 * //=> true
 */
function isSameQuarter (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfQuarter = startOfQuarter(dirtyDateLeft)
  var dateRightStartOfQuarter = startOfQuarter(dirtyDateRight)

  return dateLeftStartOfQuarter.getTime() === dateRightStartOfQuarter.getTime()
}

module.exports = isSameQuarter


/***/ }),

/***/ "./node_modules/date-fns/is_same_second/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/is_same_second/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfSecond = __webpack_require__(/*! ../start_of_second/index.js */ "./node_modules/date-fns/start_of_second/index.js")

/**
 * @category Second Helpers
 * @summary Are the given dates in the same second?
 *
 * @description
 * Are the given dates in the same second?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same second
 *
 * @example
 * // Are 4 September 2014 06:30:15.000 and 4 September 2014 06:30.15.500
 * // in the same second?
 * var result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 30, 15),
 *   new Date(2014, 8, 4, 6, 30, 15, 500)
 * )
 * //=> true
 */
function isSameSecond (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfSecond = startOfSecond(dirtyDateLeft)
  var dateRightStartOfSecond = startOfSecond(dirtyDateRight)

  return dateLeftStartOfSecond.getTime() === dateRightStartOfSecond.getTime()
}

module.exports = isSameSecond


/***/ }),

/***/ "./node_modules/date-fns/is_same_week/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_same_week/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfWeek = __webpack_require__(/*! ../start_of_week/index.js */ "./node_modules/date-fns/start_of_week/index.js")

/**
 * @category Week Helpers
 * @summary Are the given dates in the same week?
 *
 * @description
 * Are the given dates in the same week?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the dates are in the same week
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * var result = isSameWeek(
 *   new Date(2014, 7, 31),
 *   new Date(2014, 8, 4)
 * )
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * var result = isSameWeek(
 *   new Date(2014, 7, 31),
 *   new Date(2014, 8, 4),
 *   {weekStartsOn: 1}
 * )
 * //=> false
 */
function isSameWeek (dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  var dateLeftStartOfWeek = startOfWeek(dirtyDateLeft, dirtyOptions)
  var dateRightStartOfWeek = startOfWeek(dirtyDateRight, dirtyOptions)

  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime()
}

module.exports = isSameWeek


/***/ }),

/***/ "./node_modules/date-fns/is_same_year/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_same_year/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Year Helpers
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same year
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * var result = isSameYear(
 *   new Date(2014, 8, 2),
 *   new Date(2014, 8, 25)
 * )
 * //=> true
 */
function isSameYear (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)
  return dateLeft.getFullYear() === dateRight.getFullYear()
}

module.exports = isSameYear


/***/ }),

/***/ "./node_modules/date-fns/is_saturday/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/is_saturday/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Weekday Helpers
 * @summary Is the given date Saturday?
 *
 * @description
 * Is the given date Saturday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Saturday
 *
 * @example
 * // Is 27 September 2014 Saturday?
 * var result = isSaturday(new Date(2014, 8, 27))
 * //=> true
 */
function isSaturday (dirtyDate) {
  return parse(dirtyDate).getDay() === 6
}

module.exports = isSaturday


/***/ }),

/***/ "./node_modules/date-fns/is_sunday/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/is_sunday/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Weekday Helpers
 * @summary Is the given date Sunday?
 *
 * @description
 * Is the given date Sunday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Sunday
 *
 * @example
 * // Is 21 September 2014 Sunday?
 * var result = isSunday(new Date(2014, 8, 21))
 * //=> true
 */
function isSunday (dirtyDate) {
  return parse(dirtyDate).getDay() === 0
}

module.exports = isSunday


/***/ }),

/***/ "./node_modules/date-fns/is_this_hour/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_this_hour/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isSameHour = __webpack_require__(/*! ../is_same_hour/index.js */ "./node_modules/date-fns/is_same_hour/index.js")

/**
 * @category Hour Helpers
 * @summary Is the given date in the same hour as the current date?
 *
 * @description
 * Is the given date in the same hour as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this hour
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:00:00 in this hour?
 * var result = isThisHour(new Date(2014, 8, 25, 18))
 * //=> true
 */
function isThisHour (dirtyDate) {
  return isSameHour(new Date(), dirtyDate)
}

module.exports = isThisHour


/***/ }),

/***/ "./node_modules/date-fns/is_this_iso_week/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/is_this_iso_week/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isSameISOWeek = __webpack_require__(/*! ../is_same_iso_week/index.js */ "./node_modules/date-fns/is_same_iso_week/index.js")

/**
 * @category ISO Week Helpers
 * @summary Is the given date in the same ISO week as the current date?
 *
 * @description
 * Is the given date in the same ISO week as the current date?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this ISO week
 *
 * @example
 * // If today is 25 September 2014, is 22 September 2014 in this ISO week?
 * var result = isThisISOWeek(new Date(2014, 8, 22))
 * //=> true
 */
function isThisISOWeek (dirtyDate) {
  return isSameISOWeek(new Date(), dirtyDate)
}

module.exports = isThisISOWeek


/***/ }),

/***/ "./node_modules/date-fns/is_this_iso_year/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/is_this_iso_year/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isSameISOYear = __webpack_require__(/*! ../is_same_iso_year/index.js */ "./node_modules/date-fns/is_same_iso_year/index.js")

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Is the given date in the same ISO week-numbering year as the current date?
 *
 * @description
 * Is the given date in the same ISO week-numbering year as the current date?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this ISO week-numbering year
 *
 * @example
 * // If today is 25 September 2014,
 * // is 30 December 2013 in this ISO week-numbering year?
 * var result = isThisISOYear(new Date(2013, 11, 30))
 * //=> true
 */
function isThisISOYear (dirtyDate) {
  return isSameISOYear(new Date(), dirtyDate)
}

module.exports = isThisISOYear


/***/ }),

/***/ "./node_modules/date-fns/is_this_minute/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/is_this_minute/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isSameMinute = __webpack_require__(/*! ../is_same_minute/index.js */ "./node_modules/date-fns/is_same_minute/index.js")

/**
 * @category Minute Helpers
 * @summary Is the given date in the same minute as the current date?
 *
 * @description
 * Is the given date in the same minute as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this minute
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:00 in this minute?
 * var result = isThisMinute(new Date(2014, 8, 25, 18, 30))
 * //=> true
 */
function isThisMinute (dirtyDate) {
  return isSameMinute(new Date(), dirtyDate)
}

module.exports = isThisMinute


/***/ }),

/***/ "./node_modules/date-fns/is_this_month/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/is_this_month/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isSameMonth = __webpack_require__(/*! ../is_same_month/index.js */ "./node_modules/date-fns/is_same_month/index.js")

/**
 * @category Month Helpers
 * @summary Is the given date in the same month as the current date?
 *
 * @description
 * Is the given date in the same month as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this month
 *
 * @example
 * // If today is 25 September 2014, is 15 September 2014 in this month?
 * var result = isThisMonth(new Date(2014, 8, 15))
 * //=> true
 */
function isThisMonth (dirtyDate) {
  return isSameMonth(new Date(), dirtyDate)
}

module.exports = isThisMonth


/***/ }),

/***/ "./node_modules/date-fns/is_this_quarter/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/is_this_quarter/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isSameQuarter = __webpack_require__(/*! ../is_same_quarter/index.js */ "./node_modules/date-fns/is_same_quarter/index.js")

/**
 * @category Quarter Helpers
 * @summary Is the given date in the same quarter as the current date?
 *
 * @description
 * Is the given date in the same quarter as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this quarter
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this quarter?
 * var result = isThisQuarter(new Date(2014, 6, 2))
 * //=> true
 */
function isThisQuarter (dirtyDate) {
  return isSameQuarter(new Date(), dirtyDate)
}

module.exports = isThisQuarter


/***/ }),

/***/ "./node_modules/date-fns/is_this_second/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/is_this_second/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isSameSecond = __webpack_require__(/*! ../is_same_second/index.js */ "./node_modules/date-fns/is_same_second/index.js")

/**
 * @category Second Helpers
 * @summary Is the given date in the same second as the current date?
 *
 * @description
 * Is the given date in the same second as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this second
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:15.000 in this second?
 * var result = isThisSecond(new Date(2014, 8, 25, 18, 30, 15))
 * //=> true
 */
function isThisSecond (dirtyDate) {
  return isSameSecond(new Date(), dirtyDate)
}

module.exports = isThisSecond


/***/ }),

/***/ "./node_modules/date-fns/is_this_week/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_this_week/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isSameWeek = __webpack_require__(/*! ../is_same_week/index.js */ "./node_modules/date-fns/is_same_week/index.js")

/**
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the date is in this week
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * var result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * var result = isThisWeek(new Date(2014, 8, 21), {weekStartsOn: 1})
 * //=> false
 */
function isThisWeek (dirtyDate, dirtyOptions) {
  return isSameWeek(new Date(), dirtyDate, dirtyOptions)
}

module.exports = isThisWeek


/***/ }),

/***/ "./node_modules/date-fns/is_this_year/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_this_year/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isSameYear = __webpack_require__(/*! ../is_same_year/index.js */ "./node_modules/date-fns/is_same_year/index.js")

/**
 * @category Year Helpers
 * @summary Is the given date in the same year as the current date?
 *
 * @description
 * Is the given date in the same year as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this year
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this year?
 * var result = isThisYear(new Date(2014, 6, 2))
 * //=> true
 */
function isThisYear (dirtyDate) {
  return isSameYear(new Date(), dirtyDate)
}

module.exports = isThisYear


/***/ }),

/***/ "./node_modules/date-fns/is_thursday/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/is_thursday/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Weekday Helpers
 * @summary Is the given date Thursday?
 *
 * @description
 * Is the given date Thursday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Thursday
 *
 * @example
 * // Is 25 September 2014 Thursday?
 * var result = isThursday(new Date(2014, 8, 25))
 * //=> true
 */
function isThursday (dirtyDate) {
  return parse(dirtyDate).getDay() === 4
}

module.exports = isThursday


/***/ }),

/***/ "./node_modules/date-fns/is_today/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/is_today/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(/*! ../start_of_day/index.js */ "./node_modules/date-fns/start_of_day/index.js")

/**
 * @category Day Helpers
 * @summary Is the given date today?
 *
 * @description
 * Is the given date today?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is today
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * var result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday (dirtyDate) {
  return startOfDay(dirtyDate).getTime() === startOfDay(new Date()).getTime()
}

module.exports = isToday


/***/ }),

/***/ "./node_modules/date-fns/is_tomorrow/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/is_tomorrow/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(/*! ../start_of_day/index.js */ "./node_modules/date-fns/start_of_day/index.js")

/**
 * @category Day Helpers
 * @summary Is the given date tomorrow?
 *
 * @description
 * Is the given date tomorrow?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is tomorrow
 *
 * @example
 * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
 * var result = isTomorrow(new Date(2014, 9, 7, 14, 0))
 * //=> true
 */
function isTomorrow (dirtyDate) {
  var tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return startOfDay(dirtyDate).getTime() === startOfDay(tomorrow).getTime()
}

module.exports = isTomorrow


/***/ }),

/***/ "./node_modules/date-fns/is_tuesday/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/is_tuesday/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Weekday Helpers
 * @summary Is the given date Tuesday?
 *
 * @description
 * Is the given date Tuesday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Tuesday
 *
 * @example
 * // Is 23 September 2014 Tuesday?
 * var result = isTuesday(new Date(2014, 8, 23))
 * //=> true
 */
function isTuesday (dirtyDate) {
  return parse(dirtyDate).getDay() === 2
}

module.exports = isTuesday


/***/ }),

/***/ "./node_modules/date-fns/is_valid/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/is_valid/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isDate = __webpack_require__(/*! ../is_date/index.js */ "./node_modules/date-fns/is_date/index.js")

/**
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {Date} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} argument must be an instance of Date
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */
function isValid (dirtyDate) {
  if (isDate(dirtyDate)) {
    return !isNaN(dirtyDate)
  } else {
    throw new TypeError(toString.call(dirtyDate) + ' is not an instance of Date')
  }
}

module.exports = isValid


/***/ }),

/***/ "./node_modules/date-fns/is_wednesday/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_wednesday/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Weekday Helpers
 * @summary Is the given date Wednesday?
 *
 * @description
 * Is the given date Wednesday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Wednesday
 *
 * @example
 * // Is 24 September 2014 Wednesday?
 * var result = isWednesday(new Date(2014, 8, 24))
 * //=> true
 */
function isWednesday (dirtyDate) {
  return parse(dirtyDate).getDay() === 3
}

module.exports = isWednesday


/***/ }),

/***/ "./node_modules/date-fns/is_weekend/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/is_weekend/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Weekday Helpers
 * @summary Does the given date fall on a weekend?
 *
 * @description
 * Does the given date fall on a weekend?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date falls on a weekend
 *
 * @example
 * // Does 5 October 2014 fall on a weekend?
 * var result = isWeekend(new Date(2014, 9, 5))
 * //=> true
 */
function isWeekend (dirtyDate) {
  var date = parse(dirtyDate)
  var day = date.getDay()
  return day === 0 || day === 6
}

module.exports = isWeekend


/***/ }),

/***/ "./node_modules/date-fns/is_within_range/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/is_within_range/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Range Helpers
 * @summary Is the given date within the range?
 *
 * @description
 * Is the given date within the range?
 *
 * @param {Date|String|Number} date - the date to check
 * @param {Date|String|Number} startDate - the start of range
 * @param {Date|String|Number} endDate - the end of range
 * @returns {Boolean} the date is within the range
 * @throws {Error} startDate cannot be after endDate
 *
 * @example
 * // For the date within the range:
 * isWithinRange(
 *   new Date(2014, 0, 3), new Date(2014, 0, 1), new Date(2014, 0, 7)
 * )
 * //=> true
 *
 * @example
 * // For the date outside of the range:
 * isWithinRange(
 *   new Date(2014, 0, 10), new Date(2014, 0, 1), new Date(2014, 0, 7)
 * )
 * //=> false
 */
function isWithinRange (dirtyDate, dirtyStartDate, dirtyEndDate) {
  var time = parse(dirtyDate).getTime()
  var startTime = parse(dirtyStartDate).getTime()
  var endTime = parse(dirtyEndDate).getTime()

  if (startTime > endTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  return time >= startTime && time <= endTime
}

module.exports = isWithinRange


/***/ }),

/***/ "./node_modules/date-fns/is_yesterday/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_yesterday/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(/*! ../start_of_day/index.js */ "./node_modules/date-fns/start_of_day/index.js")

/**
 * @category Day Helpers
 * @summary Is the given date yesterday?
 *
 * @description
 * Is the given date yesterday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is yesterday
 *
 * @example
 * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
 * var result = isYesterday(new Date(2014, 9, 5, 14, 0))
 * //=> true
 */
function isYesterday (dirtyDate) {
  var yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return startOfDay(dirtyDate).getTime() === startOfDay(yesterday).getTime()
}

module.exports = isYesterday


/***/ }),

/***/ "./node_modules/date-fns/last_day_of_iso_week/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/last_day_of_iso_week/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var lastDayOfWeek = __webpack_require__(/*! ../last_day_of_week/index.js */ "./node_modules/date-fns/last_day_of_week/index.js")

/**
 * @category ISO Week Helpers
 * @summary Return the last day of an ISO week for the given date.
 *
 * @description
 * Return the last day of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the last day of an ISO week
 *
 * @example
 * // The last day of an ISO week for 2 September 2014 11:55:00:
 * var result = lastDayOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 00:00:00
 */
function lastDayOfISOWeek (dirtyDate) {
  return lastDayOfWeek(dirtyDate, {weekStartsOn: 1})
}

module.exports = lastDayOfISOWeek


/***/ }),

/***/ "./node_modules/date-fns/last_day_of_iso_year/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/last_day_of_iso_year/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getISOYear = __webpack_require__(/*! ../get_iso_year/index.js */ "./node_modules/date-fns/get_iso_year/index.js")
var startOfISOWeek = __webpack_require__(/*! ../start_of_iso_week/index.js */ "./node_modules/date-fns/start_of_iso_week/index.js")

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the last day of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the last day of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of an ISO week-numbering year
 *
 * @example
 * // The last day of an ISO week-numbering year for 2 July 2005:
 * var result = lastDayOfISOYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 00:00:00
 */
function lastDayOfISOYear (dirtyDate) {
  var year = getISOYear(dirtyDate)
  var fourthOfJanuary = new Date(0)
  fourthOfJanuary.setFullYear(year + 1, 0, 4)
  fourthOfJanuary.setHours(0, 0, 0, 0)
  var date = startOfISOWeek(fourthOfJanuary)
  date.setDate(date.getDate() - 1)
  return date
}

module.exports = lastDayOfISOYear


/***/ }),

/***/ "./node_modules/date-fns/last_day_of_month/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/last_day_of_month/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Month Helpers
 * @summary Return the last day of a month for the given date.
 *
 * @description
 * Return the last day of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the last day of a month
 *
 * @example
 * // The last day of a month for 2 September 2014 11:55:00:
 * var result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfMonth (dirtyDate) {
  var date = parse(dirtyDate)
  var month = date.getMonth()
  date.setFullYear(date.getFullYear(), month + 1, 0)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = lastDayOfMonth


/***/ }),

/***/ "./node_modules/date-fns/last_day_of_quarter/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/last_day_of_quarter/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Quarter Helpers
 * @summary Return the last day of a year quarter for the given date.
 *
 * @description
 * Return the last day of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the last day of a quarter
 *
 * @example
 * // The last day of a quarter for 2 September 2014 11:55:00:
 * var result = lastDayOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfQuarter (dirtyDate) {
  var date = parse(dirtyDate)
  var currentMonth = date.getMonth()
  var month = currentMonth - currentMonth % 3 + 3
  date.setMonth(month, 0)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = lastDayOfQuarter


/***/ }),

/***/ "./node_modules/date-fns/last_day_of_week/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/last_day_of_week/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Week Helpers
 * @summary Return the last day of a week for the given date.
 *
 * @description
 * Return the last day of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the last day of a week
 *
 * @example
 * // The last day of a week for 2 September 2014 11:55:00:
 * var result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the last day of the week for 2 September 2014 11:55:00:
 * var result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Sun Sep 07 2014 00:00:00
 */
function lastDayOfWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0

  var date = parse(dirtyDate)
  var day = date.getDay()
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn)

  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + diff)
  return date
}

module.exports = lastDayOfWeek


/***/ }),

/***/ "./node_modules/date-fns/last_day_of_year/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/last_day_of_year/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Year Helpers
 * @summary Return the last day of a year for the given date.
 *
 * @description
 * Return the last day of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the last day of a year
 *
 * @example
 * // The last day of a year for 2 September 2014 11:55:00:
 * var result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 00:00:00
 */
function lastDayOfYear (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()
  date.setFullYear(year + 1, 0, 0)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = lastDayOfYear


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/build_formatting_tokens_reg_exp/index.js":
/*!************************************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/build_formatting_tokens_reg_exp/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var commonFormatterKeys = [
  'M', 'MM', 'Q', 'D', 'DD', 'DDD', 'DDDD', 'd',
  'E', 'W', 'WW', 'YY', 'YYYY', 'GG', 'GGGG',
  'H', 'HH', 'h', 'hh', 'm', 'mm',
  's', 'ss', 'S', 'SS', 'SSS',
  'Z', 'ZZ', 'X', 'x'
]

function buildFormattingTokensRegExp (formatters) {
  var formatterKeys = []
  for (var key in formatters) {
    if (formatters.hasOwnProperty(key)) {
      formatterKeys.push(key)
    }
  }

  var formattingTokens = commonFormatterKeys
    .concat(formatterKeys)
    .sort()
    .reverse()
  var formattingTokensRegExp = new RegExp(
    '(\\[[^\\[]*\\])|(\\\\)?' + '(' + formattingTokens.join('|') + '|.)', 'g'
  )

  return formattingTokensRegExp
}

module.exports = buildFormattingTokensRegExp


/***/ }),

/***/ "./node_modules/date-fns/locale/en/build_distance_in_words_locale/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/date-fns/locale/en/build_distance_in_words_locale/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function buildDistanceInWordsLocale () {
  var distanceInWordsLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },

    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },

    halfAMinute: 'half a minute',

    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },

    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },

    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },

    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },

    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },

    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },

    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },

    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },

    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },

    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },

    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  }

  function localize (token, count, options) {
    options = options || {}

    var result
    if (typeof distanceInWordsLocale[token] === 'string') {
      result = distanceInWordsLocale[token]
    } else if (count === 1) {
      result = distanceInWordsLocale[token].one
    } else {
      result = distanceInWordsLocale[token].other.replace('{{count}}', count)
    }

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result
      } else {
        return result + ' ago'
      }
    }

    return result
  }

  return {
    localize: localize
  }
}

module.exports = buildDistanceInWordsLocale


/***/ }),

/***/ "./node_modules/date-fns/locale/en/build_format_locale/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/locale/en/build_format_locale/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var buildFormattingTokensRegExp = __webpack_require__(/*! ../../_lib/build_formatting_tokens_reg_exp/index.js */ "./node_modules/date-fns/locale/_lib/build_formatting_tokens_reg_exp/index.js")

function buildFormatLocale () {
  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  var months3char = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var weekdays2char = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  var weekdays3char = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  var weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var meridiemUppercase = ['AM', 'PM']
  var meridiemLowercase = ['am', 'pm']
  var meridiemFull = ['a.m.', 'p.m.']

  var formatters = {
    // Month: Jan, Feb, ..., Dec
    'MMM': function (date) {
      return months3char[date.getMonth()]
    },

    // Month: January, February, ..., December
    'MMMM': function (date) {
      return monthsFull[date.getMonth()]
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': function (date) {
      return weekdays2char[date.getDay()]
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': function (date) {
      return weekdays3char[date.getDay()]
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': function (date) {
      return weekdaysFull[date.getDay()]
    },

    // AM, PM
    'A': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
    },

    // am, pm
    'a': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
    },

    // a.m., p.m.
    'aa': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
    }
  }

  // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
  var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + 'o'] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date))
    }
  })

  return {
    formatters: formatters,
    formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
  }
}

function ordinal (number) {
  var rem100 = number % 100
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
    }
  }
  return number + 'th'
}

module.exports = buildFormatLocale


/***/ }),

/***/ "./node_modules/date-fns/locale/en/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/locale/en/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var buildDistanceInWordsLocale = __webpack_require__(/*! ./build_distance_in_words_locale/index.js */ "./node_modules/date-fns/locale/en/build_distance_in_words_locale/index.js")
var buildFormatLocale = __webpack_require__(/*! ./build_format_locale/index.js */ "./node_modules/date-fns/locale/en/build_format_locale/index.js")

/**
 * @category Locales
 * @summary English locale.
 */
module.exports = {
  distanceInWords: buildDistanceInWordsLocale(),
  format: buildFormatLocale()
}


/***/ }),

/***/ "./node_modules/date-fns/max/index.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/max/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Common Helpers
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * @param {...(Date|String|Number)} dates - the dates to compare
 * @returns {Date} the latest of the dates
 *
 * @example
 * // Which of these dates is the latest?
 * var result = max(
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * )
 * //=> Sun Jul 02 1995 00:00:00
 */
function max () {
  var dirtyDates = Array.prototype.slice.call(arguments)
  var dates = dirtyDates.map(function (dirtyDate) {
    return parse(dirtyDate)
  })
  var latestTimestamp = Math.max.apply(null, dates)
  return new Date(latestTimestamp)
}

module.exports = max


/***/ }),

/***/ "./node_modules/date-fns/min/index.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/min/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Common Helpers
 * @summary Return the earliest of the given dates.
 *
 * @description
 * Return the earliest of the given dates.
 *
 * @param {...(Date|String|Number)} dates - the dates to compare
 * @returns {Date} the earliest of the dates
 *
 * @example
 * // Which of these dates is the earliest?
 * var result = min(
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * )
 * //=> Wed Feb 11 1987 00:00:00
 */
function min () {
  var dirtyDates = Array.prototype.slice.call(arguments)
  var dates = dirtyDates.map(function (dirtyDate) {
    return parse(dirtyDate)
  })
  var earliestTimestamp = Math.min.apply(null, dates)
  return new Date(earliestTimestamp)
}

module.exports = min


/***/ }),

/***/ "./node_modules/date-fns/parse/index.js":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/parse/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getTimezoneOffsetInMilliseconds = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js")
var isDate = __webpack_require__(/*! ../is_date/index.js */ "./node_modules/date-fns/is_date/index.js")

var MILLISECONDS_IN_HOUR = 3600000
var MILLISECONDS_IN_MINUTE = 60000
var DEFAULT_ADDITIONAL_DIGITS = 2

var parseTokenDateTimeDelimeter = /[T ]/
var parseTokenPlainTime = /:/

// year tokens
var parseTokenYY = /^(\d{2})$/
var parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
]

var parseTokenYYYY = /^(\d{4})/
var parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
]

// date tokens
var parseTokenMM = /^-(\d{2})$/
var parseTokenDDD = /^-?(\d{3})$/
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/
var parseTokenWww = /^-?W(\d{2})$/
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/

// time tokens
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/

// timezone tokens
var parseTokenTimezone = /([Z+-].*)$/
var parseTokenTimezoneZ = /^(Z)$/
var parseTokenTimezoneHH = /^([+-])(\d{2})$/
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/

/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} [options] - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * var result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function parse (argument, dirtyOptions) {
  if (isDate(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  var options = dirtyOptions || {}
  var additionalDigits = options.additionalDigits
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS
  } else {
    additionalDigits = Number(additionalDigits)
  }

  var dateStrings = splitDateString(argument)

  var parseYearResult = parseYear(dateStrings.date, additionalDigits)
  var year = parseYearResult.year
  var restDateString = parseYearResult.restDateString

  var date = parseDate(restDateString, year)

  if (date) {
    var timestamp = date.getTime()
    var time = 0
    var offset

    if (dateStrings.time) {
      time = parseTime(dateStrings.time)
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone) * MILLISECONDS_IN_MINUTE
    } else {
      var fullTime = timestamp + time
      var fullTimeDate = new Date(fullTime)

      offset = getTimezoneOffsetInMilliseconds(fullTimeDate)

      // Adjust time when it's coming from DST
      var fullTimeDateNextDay = new Date(fullTime)
      fullTimeDateNextDay.setDate(fullTimeDate.getDate() + 1)
      var offsetDiff =
        getTimezoneOffsetInMilliseconds(fullTimeDateNextDay) -
        getTimezoneOffsetInMilliseconds(fullTimeDate)
      if (offsetDiff > 0) {
        offset += offsetDiff
      }
    }

    return new Date(timestamp + time + offset)
  } else {
    return new Date(argument)
  }
}

function splitDateString (dateString) {
  var dateStrings = {}
  var array = dateString.split(parseTokenDateTimeDelimeter)
  var timeString

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null
    timeString = array[0]
  } else {
    dateStrings.date = array[0]
    timeString = array[1]
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString)
    if (token) {
      dateStrings.time = timeString.replace(token[1], '')
      dateStrings.timezone = token[1]
    } else {
      dateStrings.time = timeString
    }
  }

  return dateStrings
}

function parseYear (dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits]
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits]

  var token

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString)
  if (token) {
    var yearString = token[1]
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString)
  if (token) {
    var centuryString = token[1]
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

function parseDate (dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null
  }

  var token
  var date
  var month
  var week

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0)
    date.setUTCFullYear(year)
    return date
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    date.setUTCFullYear(year, month)
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString)
  if (token) {
    date = new Date(0)
    var dayOfYear = parseInt(token[1], 10)
    date.setUTCFullYear(year, 0, dayOfYear)
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    var day = parseInt(token[2], 10)
    date.setUTCFullYear(year, month, day)
    return date
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    var dayOfWeek = parseInt(token[2], 10) - 1
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime (timeString) {
  var token
  var hours
  var minutes

  // hh
  token = parseTokenHH.exec(timeString)
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseFloat(token[2].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseInt(token[2], 10)
    var seconds = parseFloat(token[3].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone (timezoneString) {
  var token
  var absoluteOffset

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString)
  if (token) {
    return 0
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear (isoYear, week, day) {
  week = week || 0
  day = day || 0
  var date = new Date(0)
  date.setUTCFullYear(isoYear, 0, 4)
  var fourthOfJanuaryDay = date.getUTCDay() || 7
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay
  date.setUTCDate(date.getUTCDate() + diff)
  return date
}

module.exports = parse


/***/ }),

/***/ "./node_modules/date-fns/set_date/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/set_date/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Day Helpers
 * @summary Set the day of the month to the given date.
 *
 * @description
 * Set the day of the month to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} dayOfMonth - the day of the month of the new date
 * @returns {Date} the new date with the day of the month setted
 *
 * @example
 * // Set the 30th day of the month to 1 September 2014:
 * var result = setDate(new Date(2014, 8, 1), 30)
 * //=> Tue Sep 30 2014 00:00:00
 */
function setDate (dirtyDate, dirtyDayOfMonth) {
  var date = parse(dirtyDate)
  var dayOfMonth = Number(dirtyDayOfMonth)
  date.setDate(dayOfMonth)
  return date
}

module.exports = setDate


/***/ }),

/***/ "./node_modules/date-fns/set_day/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/set_day/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var addDays = __webpack_require__(/*! ../add_days/index.js */ "./node_modules/date-fns/add_days/index.js")

/**
 * @category Weekday Helpers
 * @summary Set the day of the week to the given date.
 *
 * @description
 * Set the day of the week to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} day - the day of the week of the new date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the new date with the day of the week setted
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * var result = setDay(new Date(2014, 8, 1), 0)
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If week starts with Monday, set Sunday to 1 September 2014:
 * var result = setDay(new Date(2014, 8, 1), 0, {weekStartsOn: 1})
 * //=> Sun Sep 07 2014 00:00:00
 */
function setDay (dirtyDate, dirtyDay, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0
  var date = parse(dirtyDate)
  var day = Number(dirtyDay)
  var currentDay = date.getDay()

  var remainder = day % 7
  var dayIndex = (remainder + 7) % 7

  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay
  return addDays(date, diff)
}

module.exports = setDay


/***/ }),

/***/ "./node_modules/date-fns/set_day_of_year/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/set_day_of_year/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Day Helpers
 * @summary Set the day of the year to the given date.
 *
 * @description
 * Set the day of the year to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} dayOfYear - the day of the year of the new date
 * @returns {Date} the new date with the day of the year setted
 *
 * @example
 * // Set the 2nd day of the year to 2 July 2014:
 * var result = setDayOfYear(new Date(2014, 6, 2), 2)
 * //=> Thu Jan 02 2014 00:00:00
 */
function setDayOfYear (dirtyDate, dirtyDayOfYear) {
  var date = parse(dirtyDate)
  var dayOfYear = Number(dirtyDayOfYear)
  date.setMonth(0)
  date.setDate(dayOfYear)
  return date
}

module.exports = setDayOfYear


/***/ }),

/***/ "./node_modules/date-fns/set_hours/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/set_hours/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Hour Helpers
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} hours - the hours of the new date
 * @returns {Date} the new date with the hours setted
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * var result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */
function setHours (dirtyDate, dirtyHours) {
  var date = parse(dirtyDate)
  var hours = Number(dirtyHours)
  date.setHours(hours)
  return date
}

module.exports = setHours


/***/ }),

/***/ "./node_modules/date-fns/set_iso_day/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/set_iso_day/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var addDays = __webpack_require__(/*! ../add_days/index.js */ "./node_modules/date-fns/add_days/index.js")
var getISODay = __webpack_require__(/*! ../get_iso_day/index.js */ "./node_modules/date-fns/get_iso_day/index.js")

/**
 * @category Weekday Helpers
 * @summary Set the day of the ISO week to the given date.
 *
 * @description
 * Set the day of the ISO week to the given date.
 * ISO week starts with Monday.
 * 7 is the index of Sunday, 1 is the index of Monday etc.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} day - the day of the ISO week of the new date
 * @returns {Date} the new date with the day of the ISO week setted
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * var result = setISODay(new Date(2014, 8, 1), 7)
 * //=> Sun Sep 07 2014 00:00:00
 */
function setISODay (dirtyDate, dirtyDay) {
  var date = parse(dirtyDate)
  var day = Number(dirtyDay)
  var currentDay = getISODay(date)
  var diff = day - currentDay
  return addDays(date, diff)
}

module.exports = setISODay


/***/ }),

/***/ "./node_modules/date-fns/set_iso_week/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/set_iso_week/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var getISOWeek = __webpack_require__(/*! ../get_iso_week/index.js */ "./node_modules/date-fns/get_iso_week/index.js")

/**
 * @category ISO Week Helpers
 * @summary Set the ISO week to the given date.
 *
 * @description
 * Set the ISO week to the given date, saving the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} isoWeek - the ISO week of the new date
 * @returns {Date} the new date with the ISO week setted
 *
 * @example
 * // Set the 53rd ISO week to 7 August 2004:
 * var result = setISOWeek(new Date(2004, 7, 7), 53)
 * //=> Sat Jan 01 2005 00:00:00
 */
function setISOWeek (dirtyDate, dirtyISOWeek) {
  var date = parse(dirtyDate)
  var isoWeek = Number(dirtyISOWeek)
  var diff = getISOWeek(date) - isoWeek
  date.setDate(date.getDate() - diff * 7)
  return date
}

module.exports = setISOWeek


/***/ }),

/***/ "./node_modules/date-fns/set_iso_year/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/set_iso_year/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var startOfISOYear = __webpack_require__(/*! ../start_of_iso_year/index.js */ "./node_modules/date-fns/start_of_iso_year/index.js")
var differenceInCalendarDays = __webpack_require__(/*! ../difference_in_calendar_days/index.js */ "./node_modules/date-fns/difference_in_calendar_days/index.js")

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Set the ISO week-numbering year to the given date.
 *
 * @description
 * Set the ISO week-numbering year to the given date,
 * saving the week number and the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} isoYear - the ISO week-numbering year of the new date
 * @returns {Date} the new date with the ISO week-numbering year setted
 *
 * @example
 * // Set ISO week-numbering year 2007 to 29 December 2008:
 * var result = setISOYear(new Date(2008, 11, 29), 2007)
 * //=> Mon Jan 01 2007 00:00:00
 */
function setISOYear (dirtyDate, dirtyISOYear) {
  var date = parse(dirtyDate)
  var isoYear = Number(dirtyISOYear)
  var diff = differenceInCalendarDays(date, startOfISOYear(date))
  var fourthOfJanuary = new Date(0)
  fourthOfJanuary.setFullYear(isoYear, 0, 4)
  fourthOfJanuary.setHours(0, 0, 0, 0)
  date = startOfISOYear(fourthOfJanuary)
  date.setDate(date.getDate() + diff)
  return date
}

module.exports = setISOYear


/***/ }),

/***/ "./node_modules/date-fns/set_milliseconds/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/set_milliseconds/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Millisecond Helpers
 * @summary Set the milliseconds to the given date.
 *
 * @description
 * Set the milliseconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} milliseconds - the milliseconds of the new date
 * @returns {Date} the new date with the milliseconds setted
 *
 * @example
 * // Set 300 milliseconds to 1 September 2014 11:30:40.500:
 * var result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)
 * //=> Mon Sep 01 2014 11:30:40.300
 */
function setMilliseconds (dirtyDate, dirtyMilliseconds) {
  var date = parse(dirtyDate)
  var milliseconds = Number(dirtyMilliseconds)
  date.setMilliseconds(milliseconds)
  return date
}

module.exports = setMilliseconds


/***/ }),

/***/ "./node_modules/date-fns/set_minutes/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/set_minutes/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Minute Helpers
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} minutes - the minutes of the new date
 * @returns {Date} the new date with the minutes setted
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * var result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */
function setMinutes (dirtyDate, dirtyMinutes) {
  var date = parse(dirtyDate)
  var minutes = Number(dirtyMinutes)
  date.setMinutes(minutes)
  return date
}

module.exports = setMinutes


/***/ }),

/***/ "./node_modules/date-fns/set_month/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/set_month/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var getDaysInMonth = __webpack_require__(/*! ../get_days_in_month/index.js */ "./node_modules/date-fns/get_days_in_month/index.js")

/**
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} month - the month of the new date
 * @returns {Date} the new date with the month setted
 *
 * @example
 * // Set February to 1 September 2014:
 * var result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
function setMonth (dirtyDate, dirtyMonth) {
  var date = parse(dirtyDate)
  var month = Number(dirtyMonth)
  var year = date.getFullYear()
  var day = date.getDate()

  var dateWithDesiredMonth = new Date(0)
  dateWithDesiredMonth.setFullYear(year, month, 15)
  dateWithDesiredMonth.setHours(0, 0, 0, 0)
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth)
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(month, Math.min(day, daysInMonth))
  return date
}

module.exports = setMonth


/***/ }),

/***/ "./node_modules/date-fns/set_quarter/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/set_quarter/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")
var setMonth = __webpack_require__(/*! ../set_month/index.js */ "./node_modules/date-fns/set_month/index.js")

/**
 * @category Quarter Helpers
 * @summary Set the year quarter to the given date.
 *
 * @description
 * Set the year quarter to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} quarter - the quarter of the new date
 * @returns {Date} the new date with the quarter setted
 *
 * @example
 * // Set the 2nd quarter to 2 July 2014:
 * var result = setQuarter(new Date(2014, 6, 2), 2)
 * //=> Wed Apr 02 2014 00:00:00
 */
function setQuarter (dirtyDate, dirtyQuarter) {
  var date = parse(dirtyDate)
  var quarter = Number(dirtyQuarter)
  var oldQuarter = Math.floor(date.getMonth() / 3) + 1
  var diff = quarter - oldQuarter
  return setMonth(date, date.getMonth() + diff * 3)
}

module.exports = setQuarter


/***/ }),

/***/ "./node_modules/date-fns/set_seconds/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/set_seconds/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Second Helpers
 * @summary Set the seconds to the given date.
 *
 * @description
 * Set the seconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} seconds - the seconds of the new date
 * @returns {Date} the new date with the seconds setted
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * var result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */
function setSeconds (dirtyDate, dirtySeconds) {
  var date = parse(dirtyDate)
  var seconds = Number(dirtySeconds)
  date.setSeconds(seconds)
  return date
}

module.exports = setSeconds


/***/ }),

/***/ "./node_modules/date-fns/set_year/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/set_year/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} year - the year of the new date
 * @returns {Date} the new date with the year setted
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * var result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
function setYear (dirtyDate, dirtyYear) {
  var date = parse(dirtyDate)
  var year = Number(dirtyYear)
  date.setFullYear(year)
  return date
}

module.exports = setYear


/***/ }),

/***/ "./node_modules/date-fns/start_of_day/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/start_of_day/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay (dirtyDate) {
  var date = parse(dirtyDate)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfDay


/***/ }),

/***/ "./node_modules/date-fns/start_of_hour/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/start_of_hour/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Hour Helpers
 * @summary Return the start of an hour for the given date.
 *
 * @description
 * Return the start of an hour for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an hour
 *
 * @example
 * // The start of an hour for 2 September 2014 11:55:00:
 * var result = startOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:00:00
 */
function startOfHour (dirtyDate) {
  var date = parse(dirtyDate)
  date.setMinutes(0, 0, 0)
  return date
}

module.exports = startOfHour


/***/ }),

/***/ "./node_modules/date-fns/start_of_iso_week/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/start_of_iso_week/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfWeek = __webpack_require__(/*! ../start_of_week/index.js */ "./node_modules/date-fns/start_of_week/index.js")

/**
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * var result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek (dirtyDate) {
  return startOfWeek(dirtyDate, {weekStartsOn: 1})
}

module.exports = startOfISOWeek


/***/ }),

/***/ "./node_modules/date-fns/start_of_iso_year/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/start_of_iso_year/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getISOYear = __webpack_require__(/*! ../get_iso_year/index.js */ "./node_modules/date-fns/get_iso_year/index.js")
var startOfISOWeek = __webpack_require__(/*! ../start_of_iso_week/index.js */ "./node_modules/date-fns/start_of_iso_week/index.js")

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * var result = startOfISOYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOYear (dirtyDate) {
  var year = getISOYear(dirtyDate)
  var fourthOfJanuary = new Date(0)
  fourthOfJanuary.setFullYear(year, 0, 4)
  fourthOfJanuary.setHours(0, 0, 0, 0)
  var date = startOfISOWeek(fourthOfJanuary)
  return date
}

module.exports = startOfISOYear


/***/ }),

/***/ "./node_modules/date-fns/start_of_minute/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/start_of_minute/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Minute Helpers
 * @summary Return the start of a minute for the given date.
 *
 * @description
 * Return the start of a minute for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a minute
 *
 * @example
 * // The start of a minute for 1 December 2014 22:15:45.400:
 * var result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:00
 */
function startOfMinute (dirtyDate) {
  var date = parse(dirtyDate)
  date.setSeconds(0, 0)
  return date
}

module.exports = startOfMinute


/***/ }),

/***/ "./node_modules/date-fns/start_of_month/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/start_of_month/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * var result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth (dirtyDate) {
  var date = parse(dirtyDate)
  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfMonth


/***/ }),

/***/ "./node_modules/date-fns/start_of_quarter/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/start_of_quarter/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Quarter Helpers
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a quarter
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * var result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */
function startOfQuarter (dirtyDate) {
  var date = parse(dirtyDate)
  var currentMonth = date.getMonth()
  var month = currentMonth - currentMonth % 3
  date.setMonth(month, 1)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfQuarter


/***/ }),

/***/ "./node_modules/date-fns/start_of_second/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/start_of_second/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Second Helpers
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a second
 *
 * @example
 * // The start of a second for 1 December 2014 22:15:45.400:
 * var result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.000
 */
function startOfSecond (dirtyDate) {
  var date = parse(dirtyDate)
  date.setMilliseconds(0)
  return date
}

module.exports = startOfSecond


/***/ }),

/***/ "./node_modules/date-fns/start_of_today/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/start_of_today/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(/*! ../start_of_day/index.js */ "./node_modules/date-fns/start_of_day/index.js")

/**
 * @category Day Helpers
 * @summary Return the start of today.
 *
 * @description
 * Return the start of today.
 *
 * @returns {Date} the start of today
 *
 * @example
 * // If today is 6 October 2014:
 * var result = startOfToday()
 * //=> Mon Oct 6 2014 00:00:00
 */
function startOfToday () {
  return startOfDay(new Date())
}

module.exports = startOfToday


/***/ }),

/***/ "./node_modules/date-fns/start_of_tomorrow/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/start_of_tomorrow/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @category Day Helpers
 * @summary Return the start of tomorrow.
 *
 * @description
 * Return the start of tomorrow.
 *
 * @returns {Date} the start of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * var result = startOfTomorrow()
 * //=> Tue Oct 7 2014 00:00:00
 */
function startOfTomorrow () {
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth()
  var day = now.getDate()

  var date = new Date(0)
  date.setFullYear(year, month, day + 1)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfTomorrow


/***/ }),

/***/ "./node_modules/date-fns/start_of_week/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/start_of_week/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0

  var date = parse(dirtyDate)
  var day = date.getDay()
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn

  date.setDate(date.getDate() - diff)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfWeek


/***/ }),

/***/ "./node_modules/date-fns/start_of_year/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/start_of_year/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear (dirtyDate) {
  var cleanDate = parse(dirtyDate)
  var date = new Date(0)
  date.setFullYear(cleanDate.getFullYear(), 0, 1)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfYear


/***/ }),

/***/ "./node_modules/date-fns/start_of_yesterday/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/start_of_yesterday/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @category Day Helpers
 * @summary Return the start of yesterday.
 *
 * @description
 * Return the start of yesterday.
 *
 * @returns {Date} the start of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * var result = startOfYesterday()
 * //=> Sun Oct 5 2014 00:00:00
 */
function startOfYesterday () {
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth()
  var day = now.getDate()

  var date = new Date(0)
  date.setFullYear(year, month, day - 1)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfYesterday


/***/ }),

/***/ "./node_modules/date-fns/sub_days/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/sub_days/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addDays = __webpack_require__(/*! ../add_days/index.js */ "./node_modules/date-fns/add_days/index.js")

/**
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be subtracted
 * @returns {Date} the new date with the days subtracted
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * var result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addDays(dirtyDate, -amount)
}

module.exports = subDays


/***/ }),

/***/ "./node_modules/date-fns/sub_hours/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/sub_hours/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addHours = __webpack_require__(/*! ../add_hours/index.js */ "./node_modules/date-fns/add_hours/index.js")

/**
 * @category Hour Helpers
 * @summary Subtract the specified number of hours from the given date.
 *
 * @description
 * Subtract the specified number of hours from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of hours to be subtracted
 * @returns {Date} the new date with the hours subtracted
 *
 * @example
 * // Subtract 2 hours from 11 July 2014 01:00:00:
 * var result = subHours(new Date(2014, 6, 11, 1, 0), 2)
 * //=> Thu Jul 10 2014 23:00:00
 */
function subHours (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addHours(dirtyDate, -amount)
}

module.exports = subHours


/***/ }),

/***/ "./node_modules/date-fns/sub_iso_years/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/sub_iso_years/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addISOYears = __webpack_require__(/*! ../add_iso_years/index.js */ "./node_modules/date-fns/add_iso_years/index.js")

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Subtract the specified number of ISO week-numbering years from the given date.
 *
 * @description
 * Subtract the specified number of ISO week-numbering years from the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of ISO week-numbering years to be subtracted
 * @returns {Date} the new date with the ISO week-numbering years subtracted
 *
 * @example
 * // Subtract 5 ISO week-numbering years from 1 September 2014:
 * var result = subISOYears(new Date(2014, 8, 1), 5)
 * //=> Mon Aug 31 2009 00:00:00
 */
function subISOYears (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addISOYears(dirtyDate, -amount)
}

module.exports = subISOYears


/***/ }),

/***/ "./node_modules/date-fns/sub_milliseconds/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/sub_milliseconds/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addMilliseconds = __webpack_require__(/*! ../add_milliseconds/index.js */ "./node_modules/date-fns/add_milliseconds/index.js")

/**
 * @category Millisecond Helpers
 * @summary Subtract the specified number of milliseconds from the given date.
 *
 * @description
 * Subtract the specified number of milliseconds from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be subtracted
 * @returns {Date} the new date with the milliseconds subtracted
 *
 * @example
 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
 * var result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:29.250
 */
function subMilliseconds (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addMilliseconds(dirtyDate, -amount)
}

module.exports = subMilliseconds


/***/ }),

/***/ "./node_modules/date-fns/sub_minutes/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/sub_minutes/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addMinutes = __webpack_require__(/*! ../add_minutes/index.js */ "./node_modules/date-fns/add_minutes/index.js")

/**
 * @category Minute Helpers
 * @summary Subtract the specified number of minutes from the given date.
 *
 * @description
 * Subtract the specified number of minutes from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be subtracted
 * @returns {Date} the new date with the mintues subtracted
 *
 * @example
 * // Subtract 30 minutes from 10 July 2014 12:00:00:
 * var result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 11:30:00
 */
function subMinutes (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addMinutes(dirtyDate, -amount)
}

module.exports = subMinutes


/***/ }),

/***/ "./node_modules/date-fns/sub_months/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/sub_months/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addMonths = __webpack_require__(/*! ../add_months/index.js */ "./node_modules/date-fns/add_months/index.js")

/**
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be subtracted
 * @returns {Date} the new date with the months subtracted
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * var result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */
function subMonths (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addMonths(dirtyDate, -amount)
}

module.exports = subMonths


/***/ }),

/***/ "./node_modules/date-fns/sub_quarters/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/sub_quarters/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addQuarters = __webpack_require__(/*! ../add_quarters/index.js */ "./node_modules/date-fns/add_quarters/index.js")

/**
 * @category Quarter Helpers
 * @summary Subtract the specified number of year quarters from the given date.
 *
 * @description
 * Subtract the specified number of year quarters from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of quarters to be subtracted
 * @returns {Date} the new date with the quarters subtracted
 *
 * @example
 * // Subtract 3 quarters from 1 September 2014:
 * var result = subQuarters(new Date(2014, 8, 1), 3)
 * //=> Sun Dec 01 2013 00:00:00
 */
function subQuarters (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addQuarters(dirtyDate, -amount)
}

module.exports = subQuarters


/***/ }),

/***/ "./node_modules/date-fns/sub_seconds/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/sub_seconds/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addSeconds = __webpack_require__(/*! ../add_seconds/index.js */ "./node_modules/date-fns/add_seconds/index.js")

/**
 * @category Second Helpers
 * @summary Subtract the specified number of seconds from the given date.
 *
 * @description
 * Subtract the specified number of seconds from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of seconds to be subtracted
 * @returns {Date} the new date with the seconds subtracted
 *
 * @example
 * // Subtract 30 seconds from 10 July 2014 12:45:00:
 * var result = subSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:44:30
 */
function subSeconds (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addSeconds(dirtyDate, -amount)
}

module.exports = subSeconds


/***/ }),

/***/ "./node_modules/date-fns/sub_weeks/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/sub_weeks/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addWeeks = __webpack_require__(/*! ../add_weeks/index.js */ "./node_modules/date-fns/add_weeks/index.js")

/**
 * @category Week Helpers
 * @summary Subtract the specified number of weeks from the given date.
 *
 * @description
 * Subtract the specified number of weeks from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be subtracted
 * @returns {Date} the new date with the weeks subtracted
 *
 * @example
 * // Subtract 4 weeks from 1 September 2014:
 * var result = subWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Aug 04 2014 00:00:00
 */
function subWeeks (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addWeeks(dirtyDate, -amount)
}

module.exports = subWeeks


/***/ }),

/***/ "./node_modules/date-fns/sub_years/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/sub_years/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addYears = __webpack_require__(/*! ../add_years/index.js */ "./node_modules/date-fns/add_years/index.js")

/**
 * @category Year Helpers
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be subtracted
 * @returns {Date} the new date with the years subtracted
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * var result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */
function subYears (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addYears(dirtyDate, -amount)
}

module.exports = subYears


/***/ }),

/***/ "./node_modules/fast-unique-numbers/build/es5/bundle.js":
/*!**************************************************************!*\
  !*** ./node_modules/fast-unique-numbers/build/es5/bundle.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
     true ? factory(exports) :
    undefined;
}(this, function (exports) { 'use strict';

    var LAST_NUMBER_WEAK_MAP = new WeakMap();
    /*
     * The value of the constant Number.MAX_SAFE_INTEGER equals (2 ** 53 - 1) but it
     * is fairly new.
     */

    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER === undefined ? 9007199254740991 : Number.MAX_SAFE_INTEGER;

    var cache = function cache(collection, nextNumber) {
      LAST_NUMBER_WEAK_MAP.set(collection, nextNumber);
      return nextNumber;
    };

    var generateUniqueNumber = function generateUniqueNumber(collection) {
      var lastNumber = LAST_NUMBER_WEAK_MAP.get(collection);
      /*
       * Let's try the cheapest algorithm first. It might fail to produce a new
       * number, but it is so cheap that it is okay to take the risk. Just
       * increase the last number by one or reset it to 0 if we reached the upper
       * bound of SMIs (which stands for small integers). When the last number is
       * unknown it is assumed that the collection contains zero based consecutive
       * numbers.
       */

      var nextNumber = lastNumber === undefined ? collection.size : lastNumber > 2147483648 ? 0 : lastNumber + 1;

      if (!collection.has(nextNumber)) {
        return cache(collection, nextNumber);
      }
      /*
       * If there are less than half of 2 ** 31 numbers stored in the collection,
       * the chance to generate a new random number in the range from 0 to 2 ** 31
       * is at least 50%. It's benifitial to use only SMIs because they perform
       * much better in any environment based on V8.
       */


      if (collection.size < 1073741824) {
        while (collection.has(nextNumber)) {
          nextNumber = Math.floor(Math.random() * 2147483648);
        }

        return cache(collection, nextNumber);
      } // Quickly check if there is a theoretical chance to generate a new number.


      if (collection.size > MAX_SAFE_INTEGER) {
        throw new Error('Congratulations, you created a collection of unique numbers which uses all available integers!');
      } // Otherwise use the full scale of safely usable integers.


      while (collection.has(nextNumber)) {
        nextNumber = Math.floor(Math.random() * MAX_SAFE_INTEGER);
      }

      return cache(collection, nextNumber);
    };

    var addUniqueNumber = function addUniqueNumber(set) {
      var number = generateUniqueNumber(set);
      set.add(number);
      return number;
    };

    exports.addUniqueNumber = addUniqueNumber;
    exports.generateUniqueNumber = generateUniqueNumber;

    Object.defineProperty(exports, '__esModule', { value: true });

}));


/***/ }),

/***/ "./node_modules/worker-timers-broker/build/es2018/guards/call-notification.js":
/*!************************************************************************************!*\
  !*** ./node_modules/worker-timers-broker/build/es2018/guards/call-notification.js ***!
  \************************************************************************************/
/*! exports provided: isCallNotification */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCallNotification", function() { return isCallNotification; });
const isCallNotification = (message) => {
    return (message.method !== undefined && message.method === 'call');
};
//# sourceMappingURL=/build/es2018/guards/call-notification.js.map

/***/ }),

/***/ "./node_modules/worker-timers-broker/build/es2018/guards/clear-response.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/worker-timers-broker/build/es2018/guards/clear-response.js ***!
  \*********************************************************************************/
/*! exports provided: isClearResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isClearResponse", function() { return isClearResponse; });
const isClearResponse = (message) => {
    return (message.error === null && typeof message.id === 'number');
};
//# sourceMappingURL=/build/es2018/guards/clear-response.js.map

/***/ }),

/***/ "./node_modules/worker-timers-broker/build/es2018/module.js":
/*!******************************************************************!*\
  !*** ./node_modules/worker-timers-broker/build/es2018/module.js ***!
  \******************************************************************/
/*! exports provided: load */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load", function() { return load; });
/* harmony import */ var fast_unique_numbers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-unique-numbers */ "./node_modules/fast-unique-numbers/build/es5/bundle.js");
/* harmony import */ var fast_unique_numbers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_unique_numbers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _guards_call_notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./guards/call-notification */ "./node_modules/worker-timers-broker/build/es2018/guards/call-notification.js");
/* harmony import */ var _guards_clear_response__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./guards/clear-response */ "./node_modules/worker-timers-broker/build/es2018/guards/clear-response.js");



const load = (url) => {
    const scheduledIntervalFunctions = new Map();
    const scheduledTimeoutFunctions = new Map();
    const unrespondedRequests = new Map();
    const worker = new Worker(url);
    worker.addEventListener('message', ({ data }) => {
        if (Object(_guards_call_notification__WEBPACK_IMPORTED_MODULE_1__["isCallNotification"])(data)) {
            const { params: { timerId, timerType } } = data;
            if (timerType === 'interval') {
                const idOrFunc = scheduledIntervalFunctions.get(timerId);
                if (typeof idOrFunc === 'number') {
                    const timerIdAndTimerType = unrespondedRequests.get(idOrFunc);
                    if (timerIdAndTimerType === undefined
                        || timerIdAndTimerType.timerId !== timerId
                        || timerIdAndTimerType.timerType !== timerType) {
                        throw new Error('The timer is in an undefined state.');
                    }
                }
                else if (typeof idOrFunc !== 'undefined') {
                    idOrFunc();
                }
                else {
                    throw new Error('The timer is in an undefined state.');
                }
            }
            else if (timerType === 'timeout') {
                const idOrFunc = scheduledTimeoutFunctions.get(timerId);
                if (typeof idOrFunc === 'number') {
                    const timerIdAndTimerType = unrespondedRequests.get(idOrFunc);
                    if (timerIdAndTimerType === undefined
                        || timerIdAndTimerType.timerId !== timerId
                        || timerIdAndTimerType.timerType !== timerType) {
                        throw new Error('The timer is in an undefined state.');
                    }
                }
                else if (typeof idOrFunc !== 'undefined') {
                    idOrFunc();
                    // A timeout can be savely deleted because it is only called once.
                    scheduledTimeoutFunctions.delete(timerId);
                }
                else {
                    throw new Error('The timer is in an undefined state.');
                }
            }
        }
        else if (Object(_guards_clear_response__WEBPACK_IMPORTED_MODULE_2__["isClearResponse"])(data)) {
            const { id } = data;
            const timerIdAndTimerType = unrespondedRequests.get(id);
            if (timerIdAndTimerType === undefined) {
                throw new Error('The timer is in an undefined state.');
            }
            else {
                const { timerId, timerType } = timerIdAndTimerType;
                unrespondedRequests.delete(id);
                if (timerType === 'interval') {
                    scheduledIntervalFunctions.delete(timerId);
                }
                else {
                    scheduledTimeoutFunctions.delete(timerId);
                }
            }
        }
        else {
            const { error: { message } } = data;
            throw new Error(message);
        }
    });
    const clearInterval = (timerId) => {
        const id = Object(fast_unique_numbers__WEBPACK_IMPORTED_MODULE_0__["generateUniqueNumber"])(unrespondedRequests);
        unrespondedRequests.set(id, { timerId, timerType: 'interval' });
        scheduledIntervalFunctions.set(timerId, id);
        worker.postMessage({
            id,
            method: 'clear',
            params: { timerId, timerType: 'interval' }
        });
    };
    const clearTimeout = (timerId) => {
        const id = Object(fast_unique_numbers__WEBPACK_IMPORTED_MODULE_0__["generateUniqueNumber"])(unrespondedRequests);
        unrespondedRequests.set(id, { timerId, timerType: 'timeout' });
        scheduledTimeoutFunctions.set(timerId, id);
        worker.postMessage({
            id,
            method: 'clear',
            params: { timerId, timerType: 'timeout' }
        });
    };
    const setInterval = (func, delay) => {
        const timerId = Object(fast_unique_numbers__WEBPACK_IMPORTED_MODULE_0__["generateUniqueNumber"])(scheduledIntervalFunctions);
        scheduledIntervalFunctions.set(timerId, () => {
            func();
            // Doublecheck if the interval should still be rescheduled because it could have been cleared inside of func().
            if (typeof scheduledIntervalFunctions.get(timerId) === 'function') {
                worker.postMessage({
                    id: null,
                    method: 'set',
                    params: {
                        delay,
                        now: performance.now(),
                        timerId,
                        timerType: 'interval'
                    }
                });
            }
        });
        worker.postMessage({
            id: null,
            method: 'set',
            params: {
                delay,
                now: performance.now(),
                timerId,
                timerType: 'interval'
            }
        });
        return timerId;
    };
    const setTimeout = (func, delay) => {
        const timerId = Object(fast_unique_numbers__WEBPACK_IMPORTED_MODULE_0__["generateUniqueNumber"])(scheduledTimeoutFunctions);
        scheduledTimeoutFunctions.set(timerId, func);
        worker.postMessage({
            id: null,
            method: 'set',
            params: {
                delay,
                now: performance.now(),
                timerId,
                timerType: 'timeout'
            }
        });
        return timerId;
    };
    return {
        clearInterval,
        clearTimeout,
        setInterval,
        setTimeout
    };
};
//# sourceMappingURL=/build/es2018/module.js.map

/***/ }),

/***/ "./node_modules/worker-timers/build/es2018/module.js":
/*!***********************************************************!*\
  !*** ./node_modules/worker-timers/build/es2018/module.js ***!
  \***********************************************************/
/*! exports provided: clearInterval, clearTimeout, setInterval, setTimeout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearInterval", function() { return clearInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTimeout", function() { return clearTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInterval", function() { return setInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return setTimeout; });
/* harmony import */ var worker_timers_broker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-timers-broker */ "./node_modules/worker-timers-broker/build/es2018/module.js");
/* harmony import */ var _worker_worker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./worker/worker */ "./node_modules/worker-timers/build/es2018/worker/worker.js");


const blob = new Blob([_worker_worker__WEBPACK_IMPORTED_MODULE_1__["worker"]], { type: 'application/javascript; charset=utf-8' });
const url = URL.createObjectURL(blob);
const workerTimers = Object(worker_timers_broker__WEBPACK_IMPORTED_MODULE_0__["load"])(url);
const clearInterval = workerTimers.clearInterval;
const clearTimeout = workerTimers.clearTimeout;
const setInterval = workerTimers.setInterval;
const setTimeout = workerTimers.setTimeout;
URL.revokeObjectURL(url);
//# sourceMappingURL=/build/es2018/module.js.map

/***/ }),

/***/ "./node_modules/worker-timers/build/es2018/worker/worker.js":
/*!******************************************************************!*\
  !*** ./node_modules/worker-timers/build/es2018/worker/worker.js ***!
  \******************************************************************/
/*! exports provided: worker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "worker", function() { return worker; });
// tslint:disable-next-line:max-line-length
const worker = `!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);const n=new Map,o=new Map,i=(e,t)=>{let r,n;if("performance"in self){const o=performance.now();r=o,n=e-Math.max(0,o-t)}else r=Date.now(),n=e;return{expected:r+n,remainingDelay:n}},s=(e,t,r,n)=>{const o="performance"in self?performance.now():Date.now();o>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:n}}):e.set(t,setTimeout(s,r-o,e,t,r,n))};addEventListener("message",e=>{let t=e.data;try{if("clear"===t.method){const e=t.id,r=t.params,i=r.timerId,s=r.timerType;if("interval"===s)(e=>{const t=n.get(e);if(void 0===t)throw new Error('There is no interval scheduled with the given id "'.concat(e,'".'));clearTimeout(t),n.delete(e)})(i),postMessage({error:null,id:e});else{if("timeout"!==s)throw new Error('The given type "'.concat(s,'" is not supported'));(e=>{const t=o.get(e);if(void 0===t)throw new Error('There is no timeout scheduled with the given id "'.concat(e,'".'));clearTimeout(t),o.delete(e)})(i),postMessage({error:null,id:e})}}else{if("set"!==t.method)throw new Error('The given method "'.concat(t.method,'" is not supported'));{const e=t.params,r=e.delay,a=e.now,l=e.timerId,c=e.timerType;if("interval"===c)((e,t,r)=>{const o=i(e,r),a=o.expected,l=o.remainingDelay;n.set(t,setTimeout(s,l,n,t,a,"interval"))})(r,l,a);else{if("timeout"!==c)throw new Error('The given type "'.concat(c,'" is not supported'));((e,t,r)=>{const n=i(e,r),a=n.expected,l=n.remainingDelay;o.set(t,setTimeout(s,l,o,t,a,"timeout"))})(r,l,a)}}}}catch(e){postMessage({error:{message:e.message},id:t.id,result:null})}})}]);`;
//# sourceMappingURL=/build/es2018/worker/worker.js.map

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2Nzcy9wbGF5LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkX2RheXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2FkZF9ob3Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkX2lzb195ZWFycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkX21pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkX21pbnV0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2FkZF9tb250aHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2FkZF9xdWFydGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkX3NlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2FkZF93ZWVrcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkX3llYXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9hcmVfcmFuZ2VzX292ZXJsYXBwaW5nL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9jbG9zZXN0X2luZGV4X3RvL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9jbG9zZXN0X3RvL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9jb21wYXJlX2FzYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29tcGFyZV9kZXNjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX2RheXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfaXNvX3dlZWtzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX2lzb195ZWFycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl9tb250aHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfcXVhcnRlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfd2Vla3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfeWVhcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fZGF5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZGlmZmVyZW5jZV9pbl9ob3Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZGlmZmVyZW5jZV9pbl9pc29feWVhcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fbWlsbGlzZWNvbmRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX21pbnV0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fbW9udGhzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX3F1YXJ0ZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX3NlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fd2Vla3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5feWVhcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2Rpc3RhbmNlX2luX3dvcmRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaXN0YW5jZV9pbl93b3Jkc19zdHJpY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2Rpc3RhbmNlX2luX3dvcmRzX3RvX25vdy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZWFjaF9kYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VuZF9vZl9kYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VuZF9vZl9ob3VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lbmRfb2ZfaXNvX3dlZWsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VuZF9vZl9pc29feWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZW5kX29mX21pbnV0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZW5kX29mX21vbnRoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lbmRfb2ZfcXVhcnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZW5kX29mX3NlY29uZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZW5kX29mX3RvZGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lbmRfb2ZfdG9tb3Jyb3cvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VuZF9vZl93ZWVrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lbmRfb2ZfeWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZW5kX29mX3llc3RlcmRheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZm9ybWF0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRfZGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X2RheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X2RheV9vZl95ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRfZGF5c19pbl9tb250aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X2RheXNfaW5feWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X2hvdXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRfaXNvX2RheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X2lzb193ZWVrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRfaXNvX3dlZWtzX2luX3llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldF9pc29feWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X21pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X21pbnV0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldF9tb250aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X292ZXJsYXBwaW5nX2RheXNfaW5fcmFuZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRfcXVhcnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X3NlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldF90aW1lL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRfeWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX2FmdGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19iZWZvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX2RhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX2VxdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19maXJzdF9kYXlfb2ZfbW9udGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX2ZyaWRheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfZnV0dXJlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19sYXN0X2RheV9vZl9tb250aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfbGVhcF95ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19tb25kYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3Bhc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3NhbWVfZGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19zYW1lX2hvdXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3NhbWVfaXNvX3dlZWsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3NhbWVfaXNvX3llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3NhbWVfbWludXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19zYW1lX21vbnRoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19zYW1lX3F1YXJ0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3NhbWVfc2Vjb25kL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19zYW1lX3dlZWsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3NhbWVfeWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfc2F0dXJkYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3N1bmRheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfdGhpc19ob3VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc190aGlzX2lzb193ZWVrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc190aGlzX2lzb195ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc190aGlzX21pbnV0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfdGhpc19tb250aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfdGhpc19xdWFydGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc190aGlzX3NlY29uZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfdGhpc193ZWVrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc190aGlzX3llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3RodXJzZGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc190b2RheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfdG9tb3Jyb3cvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3R1ZXNkYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3ZhbGlkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc193ZWRuZXNkYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3dlZWtlbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3dpdGhpbl9yYW5nZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfeWVzdGVyZGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sYXN0X2RheV9vZl9pc29fd2Vlay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbGFzdF9kYXlfb2ZfaXNvX3llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xhc3RfZGF5X29mX21vbnRoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sYXN0X2RheV9vZl9xdWFydGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sYXN0X2RheV9vZl93ZWVrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sYXN0X2RheV9vZl95ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZF9mb3JtYXR0aW5nX3Rva2Vuc19yZWdfZXhwL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4vYnVpbGRfZGlzdGFuY2VfaW5fd29yZHNfbG9jYWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4vYnVpbGRfZm9ybWF0X2xvY2FsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9tYXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL21pbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvcGFyc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3NldF9kYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zZXRfZGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zZXRfZGF5X29mX3llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3NldF9ob3Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc2V0X2lzb19kYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3NldF9pc29fd2Vlay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc2V0X2lzb195ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zZXRfbWlsbGlzZWNvbmRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zZXRfbWludXRlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc2V0X21vbnRoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zZXRfcXVhcnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc2V0X3NlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3NldF95ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydF9vZl9kYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0X29mX2hvdXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0X29mX2lzb193ZWVrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydF9vZl9pc29feWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRfb2ZfbWludXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydF9vZl9tb250aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRfb2ZfcXVhcnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRfb2Zfc2Vjb25kL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydF9vZl90b2RheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRfb2ZfdG9tb3Jyb3cvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0X29mX3dlZWsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0X29mX3llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0X29mX3llc3RlcmRheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3ViX2RheXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N1Yl9ob3Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3ViX2lzb195ZWFycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3ViX21pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3ViX21pbnV0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N1Yl9tb250aHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N1Yl9xdWFydGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3ViX3NlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N1Yl93ZWVrcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3ViX3llYXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYXN0LXVuaXF1ZS1udW1iZXJzL2J1aWxkL2VzNS9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lcnMtYnJva2VyL2J1aWxkL2VzMjAxOC9ndWFyZHMvY2FsbC1ub3RpZmljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lcnMtYnJva2VyL2J1aWxkL2VzMjAxOC9ndWFyZHMvY2xlYXItcmVzcG9uc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lcnMtYnJva2VyL2J1aWxkL2VzMjAxOC9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lcnMvYnVpbGQvZXMyMDE4L21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd29ya2VyLXRpbWVycy9idWlsZC9lczIwMTgvd29ya2VyL3dvcmtlci5qcyJdLCJuYW1lcyI6WyJzb2NrZXQiLCJpbyIsImhvc3QiLCJjb3VudGRvd241TWludXRlc0F1ZGlvIiwiQXVkaW8iLCJjb3VudGRvd24zTWludXRlc0F1ZGlvIiwiY291bnRkb3duMU1pbnV0ZUF1ZGlvIiwiY291bnRkb3duNUF1ZGlvIiwiY291bnRkb3duM0F1ZGlvIiwiY291bnRkb3duMkF1ZGlvIiwiY291bnRkb3duMUF1ZGlvIiwiY291bnRkb3duMEF1ZGlvIiwiY3VycmVudFRpbWUiLCJldmVudFRpbWUiLCJhamF4SW50ZXJ2YWwiLCJjb3VudGRvd25JbnRlcnZhbCIsIiQiLCJsZW5ndGgiLCJnZXRUaW1lRnJvbVNlcnZlciIsInRoZW4iLCJpc0JlZm9yZSIsInN1Yk1pbnV0ZXMiLCJoaWRlIiwic2hvdyIsInNldFRpbWVvdXQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsInN0YXJ0Q291bnRkb3duIiwid29ya2VyVGltZXJzIiwib24iLCJkYXRhIiwidGV4dCIsImtleXByZXNzIiwib25TdGVwMklucHV0S2V5cHJlc3MiLCJjbGljayIsIm9uU3RlcDJCdXR0b25DbGljayIsImFqYXhUaW1lU3RhcnQiLCJEYXRlIiwibm93IiwiZ2V0IiwicmVzcG9uc2UiLCJhamF4VGltZSIsImFkZE1pbGxpc2Vjb25kcyIsInVwZGF0ZUNvdW50ZG93biIsImNvdW50ZG93biIsIm0iLCJkaWZmZXJlbmNlSW5NaW51dGVzIiwicyIsImRpZmZlcmVuY2VJblNlY29uZHMiLCJtcyIsIk1hdGgiLCJmbG9vciIsImRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyIsIlN0cmluZyIsImNoYXJBdCIsInBsYXkiLCJjYXRjaCIsImVyciIsIm9uU3RlcDFFbmQiLCJmYWRlT3V0IiwiZmFkZUluIiwiZXZlbnQiLCJjb2RlIiwia2V5Q29kZSIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJhbGVydCIsImFkZENsYXNzIiwiZm9ybSIsImlzVmFsaWQiLCJjaGVja1ZhbGlkaXR5IiwiYnV0dG9uIiwiYnV0dG9uSHRtbCIsImh0bWwiLCJhdHRyIiwic2VydmVySWQiLCJ2YWwiLCJhamF4IiwidXJsIiwidHlwZSIsImRvbmUiLCJyZW1vdmVDbGFzcyIsIm9uU3RlcDJFbmQiLCJmYWlsIiwicmVzcG9uc2VKU09OIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLHVDOzs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBUUE7QUFFQSxJQUFNQSxNQUFNLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBRCxDQUFqQjtBQUVBLElBQUlDLHNCQUFzQixHQUFHLElBQUlDLEtBQUosQ0FBVSxzQkFBVixDQUE3QjtBQUNBLElBQUlDLHNCQUFzQixHQUFHLElBQUlELEtBQUosQ0FBVSxzQkFBVixDQUE3QjtBQUNBLElBQUlFLHFCQUFxQixHQUFHLElBQUlGLEtBQUosQ0FBVSxxQkFBVixDQUE1QjtBQUNBLElBQUlHLGVBQWUsR0FBRyxJQUFJSCxLQUFKLENBQVUsY0FBVixDQUF0QjtBQUNBLElBQUlJLGVBQWUsR0FBRyxJQUFJSixLQUFKLENBQVUsY0FBVixDQUF0QjtBQUNBLElBQUlLLGVBQWUsR0FBRyxJQUFJTCxLQUFKLENBQVUsY0FBVixDQUF0QjtBQUNBLElBQUlNLGVBQWUsR0FBRyxJQUFJTixLQUFKLENBQVUsY0FBVixDQUF0QjtBQUNBLElBQUlPLGVBQWUsR0FBRyxJQUFJUCxLQUFKLENBQVUsY0FBVixDQUF0QjtBQUNBLElBQUlRLFdBQUosRUFBaUJDLFNBQWpCO0FBQ0EsSUFBSUMsWUFBSixFQUFrQkMsaUJBQWxCO0FBRUFDLENBQUMsQ0FBQyxZQUFZO0FBQ1YsTUFBSUEsQ0FBQyxDQUFDLDJCQUFELENBQUQsQ0FBK0JDLE1BQS9CLEtBQTBDLENBQTlDLEVBQWlEO0FBQzdDO0FBQ0g7O0FBRURDLG1CQUFpQixHQUFHQyxJQUFwQixDQUF5QixZQUFZO0FBQ2pDO0FBQ0EsUUFBSUMseURBQVEsQ0FBQ1IsV0FBRCxFQUFjUywyREFBVSxDQUFDUixTQUFELEVBQVksRUFBWixDQUF4QixDQUFaLEVBQXNEO0FBQ2xERyxPQUFDLENBQUMsU0FBRCxDQUFELENBQWFNLElBQWI7QUFDQU4sT0FBQyxDQUFDLFNBQUQsQ0FBRCxDQUFhTyxJQUFiO0FBRUFDLGdCQUFVLENBQUMsWUFBWTtBQUNuQkMsY0FBTSxDQUFDQyxRQUFQLENBQWdCQyxNQUFoQjtBQUNILE9BRlMsRUFFUCxPQUFPLEVBRkEsQ0FBVjtBQUlBO0FBQ0g7O0FBRURDLGtCQUFjO0FBQ2RkLGdCQUFZLEdBQUdlLHlEQUFBLENBQXlCWCxpQkFBekIsRUFBNEMsT0FBTyxFQUFuRCxDQUFmO0FBQ0gsR0FmRDtBQWlCQWxCLFFBQU0sQ0FBQzhCLEVBQVAsQ0FBVSxlQUFWLEVBQTJCLFVBQVVDLElBQVYsRUFBZ0I7QUFDdkNmLEtBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCZ0IsSUFBckIsQ0FBMEJELElBQTFCO0FBQ0gsR0FGRDtBQUlBZixHQUFDLENBQUMsdUJBQUQsQ0FBRCxDQUEyQmlCLFFBQTNCLENBQW9DQyxvQkFBcEM7QUFDQWxCLEdBQUMsQ0FBQyxnQkFBRCxDQUFELENBQW9CbUIsS0FBcEIsQ0FBMEJDLGtCQUExQjtBQUNILENBNUJBLENBQUQ7O0FBOEJBLFNBQVNsQixpQkFBVCxHQUE2QjtBQUN6QixNQUFJbUIsYUFBYSxHQUFHQyxJQUFJLENBQUNDLEdBQUwsRUFBcEI7QUFDQSxTQUFPdkIsQ0FBQyxDQUFDd0IsR0FBRixDQUFNLGdCQUFOLEVBQXdCLFVBQVVDLFFBQVYsRUFBb0I7QUFDL0M7QUFDQSxRQUFJQyxRQUFRLEdBQUdKLElBQUksQ0FBQ0MsR0FBTCxLQUFhRixhQUE1QjtBQUNBekIsZUFBVyxHQUFHK0IsZ0VBQWUsQ0FBQyxJQUFJTCxJQUFKLENBQVNHLFFBQVEsQ0FBQ1YsSUFBVCxDQUFjbkIsV0FBdkIsQ0FBRCxFQUFzQzhCLFFBQXRDLENBQTdCO0FBQ0E3QixhQUFTLEdBQUcsSUFBSXlCLElBQUosQ0FBU0csUUFBUSxDQUFDVixJQUFULENBQWNsQixTQUF2QixDQUFaO0FBQ0FBLGFBQVMsR0FBRzhCLGdFQUFlLENBQUMvQixXQUFELEVBQWMsSUFBZCxDQUEzQjtBQUNILEdBTk0sQ0FBUDtBQU9IOztBQUVELFNBQVNnQixjQUFULEdBQTBCO0FBQ3RCZ0IsaUJBQWU7QUFDZjdCLG1CQUFpQixHQUFHYyx5REFBQSxDQUF5QmUsZUFBekIsRUFBMEMsR0FBMUMsQ0FBcEI7QUFDSDs7QUFFRCxTQUFTQSxlQUFULEdBQTJCO0FBQ3ZCLE1BQUlDLFNBQVMsR0FBRzdCLENBQUMsQ0FBQyxZQUFELENBQWpCO0FBRUEsTUFBSThCLENBQUMsR0FBR0Msb0VBQW1CLENBQUNsQyxTQUFELEVBQVlELFdBQVosQ0FBM0I7QUFDQSxNQUFJb0MsQ0FBQyxHQUFHQyxvRUFBbUIsQ0FBQ3BDLFNBQUQsRUFBWUQsV0FBWixDQUFuQixHQUE4QyxFQUF0RDs7QUFDQSxNQUFJa0MsQ0FBQyxHQUFHLENBQVIsRUFBVztBQUNQLFFBQUlJLEVBQUUsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVlDLHlFQUF3QixDQUFDeEMsU0FBRCxFQUFZRCxXQUFaLENBQXhCLEdBQW1ELElBQXBELEdBQTRELEdBQXZFLElBQThFLEdBQXZGO0FBQ0FpQyxhQUFTLENBQUNiLElBQVYsV0FBa0JnQixDQUFsQixjQUF1Qk0sTUFBTSxDQUFDSixFQUFELENBQU4sQ0FBV0ssTUFBWCxDQUFrQixDQUFsQixDQUF2Qjs7QUFFQSxRQUFJUCxDQUFDLEtBQUssQ0FBTixJQUFXRSxFQUFFLEtBQUssQ0FBdEIsRUFBeUI7QUFDckIzQyxxQkFBZSxDQUFDaUQsSUFBaEIsR0FBdUJDLEtBQXZCLENBQTZCLFVBQVVDLEdBQVYsRUFBZSxDQUN4QztBQUNILE9BRkQ7QUFHSDs7QUFDRCxRQUFJVixDQUFDLEtBQUssQ0FBTixJQUFXRSxFQUFFLEtBQUssQ0FBdEIsRUFBeUI7QUFDckIxQyxxQkFBZSxDQUFDZ0QsSUFBaEIsR0FBdUJDLEtBQXZCLENBQTZCLFVBQVVDLEdBQVYsRUFBZSxDQUN4QztBQUNILE9BRkQ7QUFHSDs7QUFDRCxRQUFJVixDQUFDLEtBQUssQ0FBTixJQUFXRSxFQUFFLEtBQUssQ0FBdEIsRUFBeUI7QUFDckJ6QyxxQkFBZSxDQUFDK0MsSUFBaEIsR0FBdUJDLEtBQXZCLENBQTZCLFVBQVVDLEdBQVYsRUFBZSxDQUN4QztBQUNILE9BRkQ7QUFHSDs7QUFDRCxRQUFJVixDQUFDLEtBQUssQ0FBTixJQUFXRSxFQUFFLEtBQUssQ0FBdEIsRUFBeUI7QUFDckJ4QyxxQkFBZSxDQUFDOEMsSUFBaEIsR0FBdUJDLEtBQXZCLENBQTZCLFVBQVVDLEdBQVYsRUFBZSxDQUN4QztBQUNILE9BRkQ7QUFHSDs7QUFDRCxRQUFJVixDQUFDLElBQUksQ0FBTCxJQUFVRSxFQUFFLElBQUksQ0FBcEIsRUFBdUI7QUFDbkJ2QyxxQkFBZSxDQUFDNkMsSUFBaEIsR0FBdUJDLEtBQXZCLENBQTZCLFVBQVVDLEdBQVYsRUFBZSxDQUN4QztBQUNILE9BRkQ7QUFHQTdCLGlFQUFBLENBQTJCZCxpQkFBM0I7QUFDQThCLGVBQVMsQ0FBQ2IsSUFBVixDQUFlLEtBQWY7QUFDQWhCLE9BQUMsQ0FBQyxXQUFELENBQUQsQ0FBZU0sSUFBZjtBQUNBRSxnQkFBVSxDQUFDbUMsVUFBRCxFQUFhLElBQWIsQ0FBVjtBQUNIO0FBQ0osR0FqQ0QsTUFpQ087QUFDSGQsYUFBUyxDQUFDYixJQUFWLFdBQWtCYyxDQUFsQixlQUF3QkUsQ0FBeEI7O0FBRUEsUUFBSUYsQ0FBQyxLQUFLLENBQU4sSUFBV0UsQ0FBQyxLQUFLLENBQXJCLEVBQXdCO0FBQ3BCN0MsNEJBQXNCLENBQUNxRCxJQUF2QixHQUE4QkMsS0FBOUIsQ0FBb0MsVUFBVUMsR0FBVixFQUFlLENBQy9DO0FBQ0gsT0FGRDtBQUdIOztBQUNELFFBQUlaLENBQUMsS0FBSyxDQUFOLElBQVdFLENBQUMsS0FBSyxDQUFyQixFQUF3QjtBQUNwQjNDLDRCQUFzQixDQUFDbUQsSUFBdkIsR0FBOEJDLEtBQTlCLENBQW9DLFVBQVVDLEdBQVYsRUFBZSxDQUMvQztBQUNILE9BRkQ7QUFHSDs7QUFDRCxRQUFJWixDQUFDLEtBQUssQ0FBTixJQUFXRSxDQUFDLEtBQUssQ0FBckIsRUFBd0I7QUFDcEIxQywyQkFBcUIsQ0FBQ2tELElBQXRCLEdBQTZCQyxLQUE3QixDQUFtQyxVQUFVQyxHQUFWLEVBQWUsQ0FDOUM7QUFDSCxPQUZEO0FBR0g7QUFDSjs7QUFDRDlDLGFBQVcsR0FBRytCLGdFQUFlLENBQUMvQixXQUFELEVBQWMsR0FBZCxDQUE3QjtBQUNIOztBQUVELFNBQVMrQyxVQUFULEdBQXNCO0FBQ2xCM0MsR0FBQyxDQUFDLFNBQUQsQ0FBRCxDQUFhNEMsT0FBYixDQUFxQixHQUFyQixFQUEwQixZQUFZO0FBQ2xDNUMsS0FBQyxDQUFDLFNBQUQsQ0FBRCxDQUFhNkMsTUFBYixDQUFvQixHQUFwQixFQUF5QixZQUFZO0FBQ2pDO0FBQ0FoQyxpRUFBQSxDQUEyQmYsWUFBM0I7QUFDSCxLQUhEO0FBSUgsR0FMRDtBQU1IOztBQUVELFNBQVNvQixvQkFBVCxDQUE4QjRCLEtBQTlCLEVBQXFDO0FBQ2pDLE1BQUlDLElBQUksR0FBR0QsS0FBSyxDQUFDRSxPQUFOLElBQWlCRixLQUFLLENBQUNHLEtBQWxDOztBQUNBLE1BQUlGLElBQUksS0FBSyxFQUFiLEVBQWlCO0FBQ2IzQixzQkFBa0IsQ0FBQzBCLEtBQUQsQ0FBbEI7QUFDSDtBQUNKOztBQUVELFNBQVMxQixrQkFBVCxDQUE0QjBCLEtBQTVCLEVBQW1DO0FBQy9CQSxPQUFLLENBQUNJLGNBQU47QUFFQSxNQUFJQyxLQUFLLEdBQUduRCxDQUFDLENBQUMsNkJBQUQsQ0FBYjtBQUNBbUQsT0FBSyxDQUFDQyxRQUFOLENBQWUsUUFBZixFQUorQixDQU0vQjs7QUFDQSxNQUFJQyxJQUFJLEdBQUdyRCxDQUFDLENBQUMsMkJBQUQsQ0FBRCxDQUErQndCLEdBQS9CLENBQW1DLENBQW5DLENBQVg7QUFDQSxNQUFJOEIsT0FBTyxHQUFHRCxJQUFJLENBQUNFLGFBQUwsRUFBZDtBQUNBdkQsR0FBQyxDQUFDcUQsSUFBRCxDQUFELENBQVFELFFBQVIsQ0FBaUIsZUFBakI7O0FBQ0EsTUFBSUUsT0FBTyxLQUFLLEtBQWhCLEVBQXVCO0FBQ25CO0FBQ0gsR0FaOEIsQ0FjL0I7OztBQUNBLE1BQUlFLE1BQU0sR0FBR3hELENBQUMsQ0FBQywwQkFBRCxDQUFkO0FBQ0EsTUFBSXlELFVBQVUsR0FBR0QsTUFBTSxDQUFDRSxJQUFQLEVBQWpCO0FBQ0FGLFFBQU0sQ0FBQ0UsSUFBUCxDQUFZLG1FQUFaO0FBQ0FGLFFBQU0sQ0FBQ0csSUFBUCxDQUFZLFVBQVosRUFBd0IsSUFBeEI7QUFFQSxNQUFJQyxRQUFRLEdBQUc1RCxDQUFDLENBQUMsOEJBQUQsQ0FBRCxDQUFrQzZELEdBQWxDLEVBQWYsQ0FwQitCLENBc0IvQjs7QUFDQTdELEdBQUMsQ0FBQzhELElBQUYsQ0FBTztBQUNIQyxPQUFHLHlCQUFrQkgsUUFBbEIsQ0FEQTtBQUVISSxRQUFJLEVBQUU7QUFGSCxHQUFQLEVBR0dDLElBSEgsQ0FHUSxVQUFVeEMsUUFBVixFQUFvQjtBQUN4QnpCLEtBQUMsQ0FBQyxtQkFBRCxDQUFELENBQXVCZ0IsSUFBdkIsQ0FBNEJTLFFBQVEsQ0FBQ1YsSUFBckM7QUFDQS9CLFVBQU0sQ0FBQzhCLEVBQVAsQ0FBVThDLFFBQVYsRUFBb0IsVUFBVTdDLElBQVYsRUFBZ0I7QUFDaENmLE9BQUMsQ0FBQyxtQkFBRCxDQUFELENBQXVCZ0IsSUFBdkIsQ0FBNEJELElBQTVCOztBQUNBLFVBQUlBLElBQUksR0FBRyxDQUFYLEVBQWM7QUFDVmYsU0FBQyxDQUFDLDhCQUFELENBQUQsQ0FBa0NrRSxXQUFsQyxDQUE4QyxRQUE5QztBQUNILE9BRkQsTUFFTztBQUNIbEUsU0FBQyxDQUFDLDhCQUFELENBQUQsQ0FBa0NvRCxRQUFsQyxDQUEyQyxRQUEzQztBQUNIO0FBQ0osS0FQRDtBQVFBZSxjQUFVO0FBQ2IsR0FkRCxFQWNHQyxJQWRILENBY1EsVUFBVTNDLFFBQVYsRUFBb0I7QUFDeEI7QUFDQStCLFVBQU0sQ0FBQ0UsSUFBUCxDQUFZRCxVQUFaO0FBQ0FELFVBQU0sQ0FBQ0csSUFBUCxDQUFZLFVBQVosRUFBd0IsS0FBeEI7QUFDQVIsU0FBSyxDQUFDbkMsSUFBTixDQUFXUyxRQUFRLENBQUM0QyxZQUFULENBQXNCQyxPQUF0QixHQUFnQzdDLFFBQVEsQ0FBQzRDLFlBQVQsQ0FBc0JDLE9BQXRELEdBQWdFLDJCQUEzRTtBQUNBbkIsU0FBSyxDQUFDZSxXQUFOLENBQWtCLFFBQWxCO0FBQ0gsR0FwQkQ7QUFxQkg7O0FBRUQsU0FBU0MsVUFBVCxHQUFzQjtBQUNsQm5FLEdBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYTRDLE9BQWIsQ0FBcUIsR0FBckIsRUFBMEIsWUFBWTtBQUNsQzVDLEtBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYTZDLE1BQWIsQ0FBb0IsR0FBcEIsRUFBeUIsWUFBWTtBQUNqQztBQUNBckMsZ0JBQVUsQ0FBQyxZQUFZO0FBQ25CQyxjQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLE1BQWhCO0FBQ0gsT0FGUyxFQUVQLE9BQU8sRUFGQSxDQUFWO0FBR0gsS0FMRDtBQU1ILEdBUEQ7QUFRSCxDOzs7Ozs7Ozs7OztBQzFNRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwQkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLE9BQU87QUFDbEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDekJBLHNCQUFzQixtQkFBTyxDQUFDLHVGQUE4Qjs7QUFFNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLE9BQU87QUFDbEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN6QkEsaUJBQWlCLG1CQUFPLENBQUMsK0VBQTBCO0FBQ25ELGlCQUFpQixtQkFBTyxDQUFDLCtFQUEwQjs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDMUJBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN4QkEsc0JBQXNCLG1CQUFPLENBQUMsdUZBQThCOztBQUU1RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsT0FBTztBQUNsQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3pCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1CO0FBQ3ZDLHFCQUFxQixtQkFBTyxDQUFDLHlGQUErQjs7QUFFNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLE9BQU87QUFDbEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNqQ0EsZ0JBQWdCLG1CQUFPLENBQUMsMkVBQXdCOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsT0FBTztBQUNsQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDeEJBLHNCQUFzQixtQkFBTyxDQUFDLHVGQUE4Qjs7QUFFNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLE9BQU87QUFDbEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN2QkEsY0FBYyxtQkFBTyxDQUFDLHVFQUFzQjs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLE9BQU87QUFDbEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3hCQSxnQkFBZ0IsbUJBQU8sQ0FBQywyRUFBd0I7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdkJBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxRQUFRO0FBQ3JCLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMzQ0EsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLHlCQUF5QjtBQUNwQyxhQUFhLE9BQU87QUFDcEIsWUFBWSxVQUFVO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDaERBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyx5QkFBeUI7QUFDcEMsYUFBYSxLQUFLO0FBQ2xCLFlBQVksVUFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDOUNBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNsREEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ2xEQSxpQkFBaUIsbUJBQU8sQ0FBQywrRUFBMEI7O0FBRW5EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDeENBLHFCQUFxQixtQkFBTyxDQUFDLHlGQUErQjs7QUFFNUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3pDQSxpQkFBaUIsbUJBQU8sQ0FBQywrRUFBMEI7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzNCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMvQkEsaUJBQWlCLG1CQUFPLENBQUMsNkVBQXlCO0FBQ2xELFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ2hDQSxrQkFBa0IsbUJBQU8sQ0FBQyxpRkFBMkI7O0FBRXJEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ25EQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDNUJBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7QUFDdkMsK0JBQStCLG1CQUFPLENBQUMsNkdBQXlDO0FBQ2hGLGlCQUFpQixtQkFBTyxDQUFDLDZFQUF5Qjs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3RDQSwrQkFBK0IsbUJBQU8sQ0FBQywyR0FBd0M7O0FBRS9FOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM1QkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjtBQUN2QyxtQ0FBbUMsbUJBQU8sQ0FBQyx1SEFBOEM7QUFDekYsaUJBQWlCLG1CQUFPLENBQUMsNkVBQXlCO0FBQ2xELGtCQUFrQixtQkFBTyxDQUFDLGlGQUEyQjs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN6Q0EsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM1QkEsK0JBQStCLG1CQUFPLENBQUMsMkdBQXdDOztBQUUvRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDNUJBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7QUFDdkMsaUNBQWlDLG1CQUFPLENBQUMsaUhBQTJDO0FBQ3BGLGlCQUFpQixtQkFBTyxDQUFDLDZFQUF5Qjs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNyQ0EseUJBQXlCLG1CQUFPLENBQUMsK0ZBQWtDOztBQUVuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDMUJBLCtCQUErQixtQkFBTyxDQUFDLDJHQUF3Qzs7QUFFL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDM0JBLHVCQUF1QixtQkFBTyxDQUFDLDJGQUFnQzs7QUFFL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzFCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1CO0FBQ3ZDLGdDQUFnQyxtQkFBTyxDQUFDLCtHQUEwQztBQUNsRixpQkFBaUIsbUJBQU8sQ0FBQyw2RUFBeUI7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDckNBLGtCQUFrQixtQkFBTyxDQUFDLCtFQUEwQjtBQUNwRCxZQUFZLG1CQUFPLENBQUMsaUVBQW1CO0FBQ3ZDLDBCQUEwQixtQkFBTyxDQUFDLGlHQUFtQztBQUNyRSx5QkFBeUIsbUJBQU8sQ0FBQywrRkFBa0M7QUFDbkUsZUFBZSxtQkFBTyxDQUFDLHlFQUF1Qjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMxTUEsa0JBQWtCLG1CQUFPLENBQUMsK0VBQTBCO0FBQ3BELFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7QUFDdkMsMEJBQTBCLG1CQUFPLENBQUMsaUdBQW1DO0FBQ3JFLGVBQWUsbUJBQU8sQ0FBQyx5RUFBdUI7O0FBRTlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixXQUFXLE9BQU87QUFDbEIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsd0JBQXdCO0FBQ25DLFdBQVcsdUJBQXVCO0FBQ2xDLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMvS0Esc0JBQXNCLG1CQUFPLENBQUMseUZBQStCOztBQUU3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLE9BQU87QUFDbEIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDcEZBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQixZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDckRBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDeEJBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDeEJBLGdCQUFnQixtQkFBTyxDQUFDLDZFQUF5Qjs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZ0JBQWdCO0FBQy9DOztBQUVBOzs7Ozs7Ozs7Ozs7QUN4QkEsaUJBQWlCLG1CQUFPLENBQUMsK0VBQTBCO0FBQ25ELHFCQUFxQixtQkFBTyxDQUFDLHlGQUErQjs7QUFFNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ2hDQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3hCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMxQkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMzQkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN4QkEsZUFBZSxtQkFBTyxDQUFDLDJFQUF3Qjs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMxQkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsZ0JBQWdCO0FBQzVFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDckNBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzFCQSxtQkFBbUIsbUJBQU8sQ0FBQyxxRkFBNkI7QUFDeEQsaUJBQWlCLG1CQUFPLENBQUMsK0VBQTBCO0FBQ25ELGlCQUFpQixtQkFBTyxDQUFDLCtFQUEwQjtBQUNuRCxZQUFZLG1CQUFPLENBQUMsaUVBQW1CO0FBQ3ZDLGNBQWMsbUJBQU8sQ0FBQyx1RUFBc0I7QUFDNUMsZUFBZSxtQkFBTyxDQUFDLHlFQUF1Qjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdlVBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3ZCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN2QkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjtBQUN2QyxrQkFBa0IsbUJBQU8sQ0FBQyxpRkFBMkI7QUFDckQsK0JBQStCLG1CQUFPLENBQUMsNkdBQXlDOztBQUVoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzFCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzNCQSxpQkFBaUIsbUJBQU8sQ0FBQywrRUFBMEI7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDckJBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3ZCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQy9CQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1CO0FBQ3ZDLHFCQUFxQixtQkFBTyxDQUFDLHlGQUErQjtBQUM1RCxxQkFBcUIsbUJBQU8sQ0FBQyx5RkFBK0I7O0FBRTVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDakNBLHFCQUFxQixtQkFBTyxDQUFDLHlGQUErQjtBQUM1RCxlQUFlLG1CQUFPLENBQUMseUVBQXVCOztBQUU5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNoQ0EsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjtBQUN2QyxxQkFBcUIsbUJBQU8sQ0FBQyx5RkFBK0I7O0FBRTVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDNUNBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3ZCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN2QkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdkJBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxPQUFPO0FBQ3BCLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM3REEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdkJBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3ZCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN2QkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0EsV0FBVyxtQkFBTyxDQUFDLHNFQUFxQjtBQUN4QyxZQUFZLG1CQUFPLENBQUMsd0VBQXNCO0FBQzFDLGVBQWUsbUJBQU8sQ0FBQyxnRkFBMEI7QUFDakQsbUJBQW1CLG1CQUFPLENBQUMsc0ZBQTZCO0FBQ3hELGNBQWMsbUJBQU8sQ0FBQyw0RUFBd0I7QUFDOUMsYUFBYSxtQkFBTyxDQUFDLDBFQUF1QjtBQUM1QyxlQUFlLG1CQUFPLENBQUMsOEVBQXlCO0FBQ2hELGNBQWMsbUJBQU8sQ0FBQyw0RUFBd0I7QUFDOUMsWUFBWSxtQkFBTyxDQUFDLHdFQUFzQjtBQUMxQyxZQUFZLG1CQUFPLENBQUMsd0VBQXNCO0FBQzFDLHdCQUF3QixtQkFBTyxDQUFDLGtHQUFtQztBQUNuRSxrQkFBa0IsbUJBQU8sQ0FBQyxzRkFBNkI7QUFDdkQsYUFBYSxtQkFBTyxDQUFDLDBFQUF1QjtBQUM1QyxjQUFjLG1CQUFPLENBQUMsNEVBQXdCO0FBQzlDLGVBQWUsbUJBQU8sQ0FBQyw4RUFBeUI7QUFDaEQsNEJBQTRCLG1CQUFPLENBQUMsNEdBQXdDO0FBQzVFLGdDQUFnQyxtQkFBTyxDQUFDLHNIQUE2QztBQUNyRixnQ0FBZ0MsbUJBQU8sQ0FBQyxzSEFBNkM7QUFDckYsOEJBQThCLG1CQUFPLENBQUMsZ0hBQTBDO0FBQ2hGLGdDQUFnQyxtQkFBTyxDQUFDLG9IQUE0QztBQUNwRiw2QkFBNkIsbUJBQU8sQ0FBQyw4R0FBeUM7QUFDOUUsNkJBQTZCLG1CQUFPLENBQUMsOEdBQXlDO0FBQzlFLG9CQUFvQixtQkFBTyxDQUFDLDBGQUErQjtBQUMzRCxxQkFBcUIsbUJBQU8sQ0FBQyw0RkFBZ0M7QUFDN0Qsd0JBQXdCLG1CQUFPLENBQUMsb0dBQW9DO0FBQ3BFLDRCQUE0QixtQkFBTyxDQUFDLDBHQUF1QztBQUMzRSx1QkFBdUIsbUJBQU8sQ0FBQyxnR0FBa0M7QUFDakUsc0JBQXNCLG1CQUFPLENBQUMsOEZBQWlDO0FBQy9ELHdCQUF3QixtQkFBTyxDQUFDLGtHQUFtQztBQUNuRSx1QkFBdUIsbUJBQU8sQ0FBQyxnR0FBa0M7QUFDakUscUJBQXFCLG1CQUFPLENBQUMsNEZBQWdDO0FBQzdELHFCQUFxQixtQkFBTyxDQUFDLDRGQUFnQztBQUM3RCxtQkFBbUIsbUJBQU8sQ0FBQyx3RkFBOEI7QUFDekQseUJBQXlCLG1CQUFPLENBQUMsc0dBQXFDO0FBQ3RFLHdCQUF3QixtQkFBTyxDQUFDLHNHQUFxQztBQUNyRSxXQUFXLG1CQUFPLENBQUMsc0VBQXFCO0FBQ3hDLFlBQVksbUJBQU8sQ0FBQywwRUFBdUI7QUFDM0MsYUFBYSxtQkFBTyxDQUFDLDRFQUF3QjtBQUM3QyxnQkFBZ0IsbUJBQU8sQ0FBQyxvRkFBNEI7QUFDcEQsZ0JBQWdCLG1CQUFPLENBQUMsb0ZBQTRCO0FBQ3BELGVBQWUsbUJBQU8sQ0FBQyxnRkFBMEI7QUFDakQsY0FBYyxtQkFBTyxDQUFDLDhFQUF5QjtBQUMvQyxnQkFBZ0IsbUJBQU8sQ0FBQyxrRkFBMkI7QUFDbkQsZUFBZSxtQkFBTyxDQUFDLGdGQUEwQjtBQUNqRCxjQUFjLG1CQUFPLENBQUMsOEVBQXlCO0FBQy9DLGlCQUFpQixtQkFBTyxDQUFDLG9GQUE0QjtBQUNyRCxhQUFhLG1CQUFPLENBQUMsNEVBQXdCO0FBQzdDLGFBQWEsbUJBQU8sQ0FBQyw0RUFBd0I7QUFDN0Msa0JBQWtCLG1CQUFPLENBQUMsc0ZBQTZCO0FBQ3ZELFVBQVUsbUJBQU8sQ0FBQyxrRUFBbUI7QUFDckMsV0FBVyxtQkFBTyxDQUFDLHNFQUFxQjtBQUN4QyxVQUFVLG1CQUFPLENBQUMsb0VBQW9CO0FBQ3RDLGdCQUFnQixtQkFBTyxDQUFDLG9GQUE0QjtBQUNwRCxrQkFBa0IsbUJBQU8sQ0FBQyx3RkFBOEI7QUFDeEQsaUJBQWlCLG1CQUFPLENBQUMsc0ZBQTZCO0FBQ3RELFlBQVksbUJBQU8sQ0FBQyx3RUFBc0I7QUFDMUMsYUFBYSxtQkFBTyxDQUFDLDRFQUF3QjtBQUM3QyxjQUFjLG1CQUFPLENBQUMsOEVBQXlCO0FBQy9DLHFCQUFxQixtQkFBTyxDQUFDLGdHQUFrQztBQUMvRCxjQUFjLG1CQUFPLENBQUMsOEVBQXlCO0FBQy9DLG1CQUFtQixtQkFBTyxDQUFDLHNGQUE2QjtBQUN4RCxjQUFjLG1CQUFPLENBQUMsNEVBQXdCO0FBQzlDLFlBQVksbUJBQU8sQ0FBQyx3RUFBc0I7QUFDMUMsOEJBQThCLG1CQUFPLENBQUMsa0hBQTJDO0FBQ2pGLGNBQWMsbUJBQU8sQ0FBQyw0RUFBd0I7QUFDOUMsY0FBYyxtQkFBTyxDQUFDLDRFQUF3QjtBQUM5QyxXQUFXLG1CQUFPLENBQUMsc0VBQXFCO0FBQ3hDLFdBQVcsbUJBQU8sQ0FBQyxzRUFBcUI7QUFDeEMsV0FBVyxtQkFBTyxDQUFDLHNFQUFxQjtBQUN4QyxZQUFZLG1CQUFPLENBQUMsd0VBQXNCO0FBQzFDLFVBQVUsbUJBQU8sQ0FBQyxvRUFBb0I7QUFDdEMsV0FBVyxtQkFBTyxDQUFDLHNFQUFxQjtBQUN4QyxxQkFBcUIsbUJBQU8sQ0FBQyxnR0FBa0M7QUFDL0QsWUFBWSxtQkFBTyxDQUFDLHdFQUFzQjtBQUMxQyxZQUFZLG1CQUFPLENBQUMsd0VBQXNCO0FBQzFDLG9CQUFvQixtQkFBTyxDQUFDLDhGQUFpQztBQUM3RCxjQUFjLG1CQUFPLENBQUMsOEVBQXlCO0FBQy9DLFlBQVksbUJBQU8sQ0FBQyx3RUFBc0I7QUFDMUMsVUFBVSxtQkFBTyxDQUFDLG9FQUFvQjtBQUN0QyxhQUFhLG1CQUFPLENBQUMsNEVBQXdCO0FBQzdDLGNBQWMsbUJBQU8sQ0FBQyw4RUFBeUI7QUFDL0MsaUJBQWlCLG1CQUFPLENBQUMsc0ZBQTZCO0FBQ3RELGlCQUFpQixtQkFBTyxDQUFDLHNGQUE2QjtBQUN0RCxnQkFBZ0IsbUJBQU8sQ0FBQyxrRkFBMkI7QUFDbkQsZUFBZSxtQkFBTyxDQUFDLGdGQUEwQjtBQUNqRCxpQkFBaUIsbUJBQU8sQ0FBQyxvRkFBNEI7QUFDckQsZ0JBQWdCLG1CQUFPLENBQUMsa0ZBQTJCO0FBQ25ELGNBQWMsbUJBQU8sQ0FBQyw4RUFBeUI7QUFDL0MsY0FBYyxtQkFBTyxDQUFDLDhFQUF5QjtBQUMvQyxjQUFjLG1CQUFPLENBQUMsNEVBQXdCO0FBQzlDLFlBQVksbUJBQU8sQ0FBQyx3RUFBc0I7QUFDMUMsY0FBYyxtQkFBTyxDQUFDLDhFQUF5QjtBQUMvQyxpQkFBaUIsbUJBQU8sQ0FBQyxzRkFBNkI7QUFDdEQsaUJBQWlCLG1CQUFPLENBQUMsc0ZBQTZCO0FBQ3RELGdCQUFnQixtQkFBTyxDQUFDLGtGQUEyQjtBQUNuRCxlQUFlLG1CQUFPLENBQUMsZ0ZBQTBCO0FBQ2pELGlCQUFpQixtQkFBTyxDQUFDLG9GQUE0QjtBQUNyRCxnQkFBZ0IsbUJBQU8sQ0FBQyxrRkFBMkI7QUFDbkQsY0FBYyxtQkFBTyxDQUFDLDhFQUF5QjtBQUMvQyxjQUFjLG1CQUFPLENBQUMsOEVBQXlCO0FBQy9DLGNBQWMsbUJBQU8sQ0FBQyw0RUFBd0I7QUFDOUMsV0FBVyxtQkFBTyxDQUFDLHNFQUFxQjtBQUN4QyxjQUFjLG1CQUFPLENBQUMsNEVBQXdCO0FBQzlDLGFBQWEsbUJBQU8sQ0FBQywwRUFBdUI7QUFDNUMsV0FBVyxtQkFBTyxDQUFDLHNFQUFxQjtBQUN4QyxlQUFlLG1CQUFPLENBQUMsOEVBQXlCO0FBQ2hELGFBQWEsbUJBQU8sQ0FBQywwRUFBdUI7QUFDNUMsaUJBQWlCLG1CQUFPLENBQUMsb0ZBQTRCO0FBQ3JELGVBQWUsbUJBQU8sQ0FBQyw4RUFBeUI7QUFDaEQsb0JBQW9CLG1CQUFPLENBQUMsOEZBQWlDO0FBQzdELG9CQUFvQixtQkFBTyxDQUFDLDhGQUFpQztBQUM3RCxrQkFBa0IsbUJBQU8sQ0FBQyx3RkFBOEI7QUFDeEQsb0JBQW9CLG1CQUFPLENBQUMsNEZBQWdDO0FBQzVELGlCQUFpQixtQkFBTyxDQUFDLHNGQUE2QjtBQUN0RCxpQkFBaUIsbUJBQU8sQ0FBQyxzRkFBNkI7QUFDdEQsT0FBTyxtQkFBTyxDQUFDLDREQUFnQjtBQUMvQixPQUFPLG1CQUFPLENBQUMsNERBQWdCO0FBQy9CLFNBQVMsbUJBQU8sQ0FBQyxnRUFBa0I7QUFDbkMsV0FBVyxtQkFBTyxDQUFDLHNFQUFxQjtBQUN4QyxVQUFVLG1CQUFPLENBQUMsb0VBQW9CO0FBQ3RDLGdCQUFnQixtQkFBTyxDQUFDLG9GQUE0QjtBQUNwRCxZQUFZLG1CQUFPLENBQUMsd0VBQXNCO0FBQzFDLGFBQWEsbUJBQU8sQ0FBQyw0RUFBd0I7QUFDN0MsY0FBYyxtQkFBTyxDQUFDLDhFQUF5QjtBQUMvQyxjQUFjLG1CQUFPLENBQUMsOEVBQXlCO0FBQy9DLG1CQUFtQixtQkFBTyxDQUFDLHNGQUE2QjtBQUN4RCxjQUFjLG1CQUFPLENBQUMsNEVBQXdCO0FBQzlDLFlBQVksbUJBQU8sQ0FBQyx3RUFBc0I7QUFDMUMsY0FBYyxtQkFBTyxDQUFDLDRFQUF3QjtBQUM5QyxjQUFjLG1CQUFPLENBQUMsNEVBQXdCO0FBQzlDLFdBQVcsbUJBQU8sQ0FBQyxzRUFBcUI7QUFDeEMsY0FBYyxtQkFBTyxDQUFDLDhFQUF5QjtBQUMvQyxlQUFlLG1CQUFPLENBQUMsZ0ZBQTBCO0FBQ2pELGtCQUFrQixtQkFBTyxDQUFDLHdGQUE4QjtBQUN4RCxrQkFBa0IsbUJBQU8sQ0FBQyx3RkFBOEI7QUFDeEQsaUJBQWlCLG1CQUFPLENBQUMsb0ZBQTRCO0FBQ3JELGdCQUFnQixtQkFBTyxDQUFDLGtGQUEyQjtBQUNuRCxrQkFBa0IsbUJBQU8sQ0FBQyxzRkFBNkI7QUFDdkQsaUJBQWlCLG1CQUFPLENBQUMsb0ZBQTRCO0FBQ3JELGdCQUFnQixtQkFBTyxDQUFDLGtGQUEyQjtBQUNuRCxtQkFBbUIsbUJBQU8sQ0FBQyx3RkFBOEI7QUFDekQsZUFBZSxtQkFBTyxDQUFDLGdGQUEwQjtBQUNqRCxlQUFlLG1CQUFPLENBQUMsZ0ZBQTBCO0FBQ2pELG9CQUFvQixtQkFBTyxDQUFDLDBGQUErQjtBQUMzRCxXQUFXLG1CQUFPLENBQUMsc0VBQXFCO0FBQ3hDLFlBQVksbUJBQU8sQ0FBQyx3RUFBc0I7QUFDMUMsZUFBZSxtQkFBTyxDQUFDLGdGQUEwQjtBQUNqRCxtQkFBbUIsbUJBQU8sQ0FBQyxzRkFBNkI7QUFDeEQsY0FBYyxtQkFBTyxDQUFDLDRFQUF3QjtBQUM5QyxhQUFhLG1CQUFPLENBQUMsMEVBQXVCO0FBQzVDLGVBQWUsbUJBQU8sQ0FBQyw4RUFBeUI7QUFDaEQsY0FBYyxtQkFBTyxDQUFDLDRFQUF3QjtBQUM5QyxZQUFZLG1CQUFPLENBQUMsd0VBQXNCO0FBQzFDLFlBQVksbUJBQU8sQ0FBQyx3RUFBc0I7QUFDMUM7Ozs7Ozs7Ozs7OztBQzNKQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN4QkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDbkJBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzNCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3JCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3JCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3JCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1CO0FBQ3ZDLGVBQWUsbUJBQU8sQ0FBQywyRUFBd0I7QUFDL0MsaUJBQWlCLG1CQUFPLENBQUMsK0VBQTBCOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDeEJBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3ZCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3JCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3JCQSxpQkFBaUIsbUJBQU8sQ0FBQywrRUFBMEI7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM1QkEsa0JBQWtCLG1CQUFPLENBQUMsaUZBQTJCOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDNUJBLGlCQUFpQixtQkFBTyxDQUFDLCtFQUEwQjs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGdCQUFnQjtBQUNwRTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDM0JBLHFCQUFxQixtQkFBTyxDQUFDLHlGQUErQjs7QUFFNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM5QkEsb0JBQW9CLG1CQUFPLENBQUMscUZBQTZCOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM3QkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM1QkEscUJBQXFCLG1CQUFPLENBQUMsdUZBQThCOztBQUUzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDNUJBLG9CQUFvQixtQkFBTyxDQUFDLHFGQUE2Qjs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDN0JBLGtCQUFrQixtQkFBTyxDQUFDLGlGQUEyQjs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3hDQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMzQkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNyQkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNyQkEsaUJBQWlCLG1CQUFPLENBQUMsK0VBQTBCOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdEJBLG9CQUFvQixtQkFBTyxDQUFDLHVGQUE4Qjs7QUFFMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdkJBLG9CQUFvQixtQkFBTyxDQUFDLHVGQUE4Qjs7QUFFMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN4QkEsbUJBQW1CLG1CQUFPLENBQUMsbUZBQTRCOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdEJBLGtCQUFrQixtQkFBTyxDQUFDLGlGQUEyQjs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNyQkEsb0JBQW9CLG1CQUFPLENBQUMscUZBQTZCOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3JCQSxtQkFBbUIsbUJBQU8sQ0FBQyxtRkFBNEI7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN0QkEsaUJBQWlCLG1CQUFPLENBQUMsK0VBQTBCOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxnQkFBZ0I7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDN0JBLGlCQUFpQixtQkFBTyxDQUFDLCtFQUEwQjs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNyQkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNyQkEsaUJBQWlCLG1CQUFPLENBQUMsK0VBQTBCOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3JCQSxpQkFBaUIsbUJBQU8sQ0FBQywrRUFBMEI7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3ZCQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3JCQSxhQUFhLG1CQUFPLENBQUMscUVBQXFCOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixhQUFhLFFBQVE7QUFDckIsWUFBWSxVQUFVO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNsQ0EsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNyQkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdkJBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxRQUFRO0FBQ3JCLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDekNBLGlCQUFpQixtQkFBTyxDQUFDLCtFQUEwQjs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdkJBLG9CQUFvQixtQkFBTyxDQUFDLHVGQUE4Qjs7QUFFMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0JBQWdCO0FBQ25EOztBQUVBOzs7Ozs7Ozs7Ozs7QUN4QkEsaUJBQWlCLG1CQUFPLENBQUMsK0VBQTBCO0FBQ25ELHFCQUFxQixtQkFBTyxDQUFDLHlGQUErQjs7QUFFNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ2hDQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMxQkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMzQkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsZ0JBQWdCO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDckNBLFlBQVksbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsT0FBTztBQUNqQyxLQUFLOztBQUVMO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QixLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEIsT0FBTztBQUNqQyxLQUFLOztBQUVMO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QixLQUFLOztBQUVMO0FBQ0E7QUFDQSxzQkFBc0IsT0FBTztBQUM3QixLQUFLOztBQUVMO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QixLQUFLOztBQUVMO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QixLQUFLOztBQUVMO0FBQ0E7QUFDQSxzQkFBc0IsT0FBTztBQUM3QixLQUFLOztBQUVMO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QixLQUFLOztBQUVMO0FBQ0E7QUFDQSxzQkFBc0IsT0FBTztBQUM3QixLQUFLOztBQUVMO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QixLQUFLOztBQUVMO0FBQ0E7QUFDQSxxQkFBcUIsT0FBTztBQUM1QixLQUFLOztBQUVMO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMLDZEQUE2RCxPQUFPO0FBQ3BFOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDbEdBLGtDQUFrQyxtQkFBTyxDQUFDLHlJQUFxRDs7QUFFL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3ZGQSxpQ0FBaUMsbUJBQU8sQ0FBQyw0SEFBMkM7QUFDcEYsd0JBQXdCLG1CQUFPLENBQUMsc0dBQWdDOztBQUVoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWQSxZQUFZLG1CQUFPLENBQUMsaUVBQW1COztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsd0JBQXdCO0FBQ25DLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMvQkEsWUFBWSxtQkFBTyxDQUFDLGlFQUFtQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHdCQUF3QjtBQUNuQyxhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDL0JBLHNDQUFzQyxtQkFBTyxDQUFDLCtIQUFrRDtBQUNoRyxhQUFhLG1CQUFPLENBQUMscUVBQXFCOztBQUUxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QixFQUFFO0FBQzNCO0FBQ0EsWUFBWSxFQUFFO0FBQ2QsWUFBWSxFQUFFO0FBQ2QsWUFBWSxFQUFFO0FBQ2Q7O0FBRUEsMkJBQTJCLEVBQUU7QUFDN0I7QUFDQSxZQUFZLEVBQUU7QUFDZCxZQUFZLEVBQUU7QUFDZCxZQUFZLEVBQUU7QUFDZDs7QUFFQTtBQUNBLDBCQUEwQixFQUFFO0FBQzVCLDRCQUE0QixFQUFFO0FBQzlCLDZCQUE2QixFQUFFLE9BQU8sRUFBRTtBQUN4Qyw2QkFBNkIsRUFBRTtBQUMvQiw4QkFBOEIsRUFBRSxPQUFPLEVBQUU7O0FBRXpDO0FBQ0EseUJBQXlCLEVBQUU7QUFDM0IsMkJBQTJCLEVBQUUsT0FBTyxFQUFFO0FBQ3RDLDZCQUE2QixFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxFQUFFO0FBQ3pDLHlDQUF5QyxFQUFFLE9BQU8sRUFBRTs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsT0FBTztBQUNsQixXQUFXLFVBQVU7QUFDckIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxvQkFBb0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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QUFBQTtBQUNPLDZCQUE2QixTQUFTLGNBQWMsNEJBQTRCLFlBQVkscUJBQXFCLDJEQUEyRCxnQ0FBZ0MscUNBQXFDLG9CQUFvQixFQUFFLGlCQUFpQiw0RkFBNEYsZUFBZSx3Q0FBd0MsU0FBUyxFQUFFLG1CQUFtQiw4QkFBOEIscURBQXFELDBCQUEwQiw2Q0FBNkMsc0JBQXNCLDZEQUE2RCxZQUFZLGVBQWUsU0FBUyxpQkFBaUIsaUNBQWlDLGlCQUFpQixZQUFZLFVBQVUsc0JBQXNCLG1CQUFtQixpREFBaUQsaUJBQWlCLGtCQUFrQixhQUFhLE9BQU8sb0NBQW9DLFFBQVEseUJBQXlCLDBCQUEwQix3QkFBd0Isc0JBQXNCLE9BQU8sK0JBQStCLGVBQWUsMERBQTBELGlCQUFpQiw4QkFBOEIsdUJBQXVCLHNDQUFzQywrQkFBK0IsYUFBYSxJQUFJLHVCQUF1QixrREFBa0QsdUJBQXVCLGlCQUFpQixtR0FBbUcsNEJBQTRCLGtCQUFrQixnQkFBZ0IsRUFBRSxLQUFLLG9GQUFvRixLQUFLLGlCQUFpQixrR0FBa0csNEJBQTRCLGtCQUFrQixnQkFBZ0IsR0FBRyxLQUFLLGlHQUFpRyw2REFBNkQsNkJBQTZCLCtDQUErQywwQ0FBMEMsU0FBUyxLQUFLLG9GQUFvRixXQUFXLCtDQUErQyx5Q0FBeUMsWUFBWSxTQUFTLGFBQWEsT0FBTyxrQkFBa0IscUJBQXFCLEdBQUcsRUFBRSxHQUFHO0FBQy83RSx1RCIsImZpbGUiOiJwbGF5LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY2xpZW50L2pzL3BsYXkuanNcIik7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgJy4uL2Nzcy9wbGF5LnNjc3MnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFkZE1pbGxpc2Vjb25kcyxcclxuICAgIGRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyxcclxuICAgIGRpZmZlcmVuY2VJbk1pbnV0ZXMsXHJcbiAgICBkaWZmZXJlbmNlSW5TZWNvbmRzLFxyXG4gICAgaXNCZWZvcmUsXHJcbiAgICBzdWJNaW51dGVzXHJcbn0gZnJvbSAnZGF0ZS1mbnMnO1xyXG5pbXBvcnQgKiBhcyB3b3JrZXJUaW1lcnMgZnJvbSAnd29ya2VyLXRpbWVycyc7XHJcblxyXG5jb25zdCBzb2NrZXQgPSBpbyhob3N0KTtcclxuXHJcbnZhciBjb3VudGRvd241TWludXRlc0F1ZGlvID0gbmV3IEF1ZGlvKCcvYXVkaW8vNS1taW51dGVzLndhdicpO1xyXG52YXIgY291bnRkb3duM01pbnV0ZXNBdWRpbyA9IG5ldyBBdWRpbygnL2F1ZGlvLzMtbWludXRlcy53YXYnKTtcclxudmFyIGNvdW50ZG93bjFNaW51dGVBdWRpbyA9IG5ldyBBdWRpbygnL2F1ZGlvLzEtbWludXRlLndhdicpO1xyXG52YXIgY291bnRkb3duNUF1ZGlvID0gbmV3IEF1ZGlvKCcvYXVkaW8vNS53YXYnKTtcclxudmFyIGNvdW50ZG93bjNBdWRpbyA9IG5ldyBBdWRpbygnL2F1ZGlvLzMud2F2Jyk7XHJcbnZhciBjb3VudGRvd24yQXVkaW8gPSBuZXcgQXVkaW8oJy9hdWRpby8yLndhdicpO1xyXG52YXIgY291bnRkb3duMUF1ZGlvID0gbmV3IEF1ZGlvKCcvYXVkaW8vMS53YXYnKTtcclxudmFyIGNvdW50ZG93bjBBdWRpbyA9IG5ldyBBdWRpbygnL2F1ZGlvLzAud2F2Jyk7XHJcbmxldCBjdXJyZW50VGltZSwgZXZlbnRUaW1lO1xyXG5sZXQgYWpheEludGVydmFsLCBjb3VudGRvd25JbnRlcnZhbDtcclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCQoJyNzdGVwLTEsICNzdGVwLTIsICNzdGVwLTMnKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGltZUZyb21TZXJ2ZXIoKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBJZiBwYWdlIHdhcyByZWxvYWRlZCB3aXRoaW4gdGhlIGZpcnN0IG1pbnV0ZSBvZiB0aGUgY291bnRkb3duIGVuZGluZywgc2tpcCB0byBzdGVwIDJcclxuICAgICAgICBpZiAoaXNCZWZvcmUoY3VycmVudFRpbWUsIHN1Yk1pbnV0ZXMoZXZlbnRUaW1lLCAyOSkpKSB7XHJcbiAgICAgICAgICAgICQoJyNzdGVwLTEnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJyNzdGVwLTInKS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxyXG4gICAgICAgICAgICB9LCAxMDAwICogNjApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnRDb3VudGRvd24oKTtcclxuICAgICAgICBhamF4SW50ZXJ2YWwgPSB3b3JrZXJUaW1lcnMuc2V0SW50ZXJ2YWwoZ2V0VGltZUZyb21TZXJ2ZXIsIDEwMDAgKiAxNSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzb2NrZXQub24oJ29ubGluZUNvdW50ZXInLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICQoJyNvbmxpbmUtY291bnRlcicpLnRleHQoZGF0YSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjc3RlcC0yIC5mb3JtLWNvbnRyb2wnKS5rZXlwcmVzcyhvblN0ZXAySW5wdXRLZXlwcmVzcyk7XHJcbiAgICAkKCcjc3RlcC0yIGJ1dHRvbicpLmNsaWNrKG9uU3RlcDJCdXR0b25DbGljayk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZ2V0VGltZUZyb21TZXJ2ZXIoKSB7XHJcbiAgICB2YXIgYWpheFRpbWVTdGFydCA9IERhdGUubm93KCk7XHJcbiAgICByZXR1cm4gJC5nZXQoJy9hcGkvY291bnRkb3duJywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgLy8gQWRkIHRoZSBudW1iZXIgb2YgbXMgaXQgdG9vayBmb3IgdGhlIEFqYXggcmVxdWVzdCB0byBjb21wbGV0ZVxyXG4gICAgICAgIGxldCBhamF4VGltZSA9IERhdGUubm93KCkgLSBhamF4VGltZVN0YXJ0O1xyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gYWRkTWlsbGlzZWNvbmRzKG5ldyBEYXRlKHJlc3BvbnNlLmRhdGEuY3VycmVudFRpbWUpLCBhamF4VGltZSk7XHJcbiAgICAgICAgZXZlbnRUaW1lID0gbmV3IERhdGUocmVzcG9uc2UuZGF0YS5ldmVudFRpbWUpO1xyXG4gICAgICAgIGV2ZW50VGltZSA9IGFkZE1pbGxpc2Vjb25kcyhjdXJyZW50VGltZSwgMTAwMCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRDb3VudGRvd24oKSB7XHJcbiAgICB1cGRhdGVDb3VudGRvd24oKTtcclxuICAgIGNvdW50ZG93bkludGVydmFsID0gd29ya2VyVGltZXJzLnNldEludGVydmFsKHVwZGF0ZUNvdW50ZG93biwgMTAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQ291bnRkb3duKCkge1xyXG4gICAgbGV0IGNvdW50ZG93biA9ICQoJyNzdGVwLTEgaDEnKTtcclxuXHJcbiAgICBsZXQgbSA9IGRpZmZlcmVuY2VJbk1pbnV0ZXMoZXZlbnRUaW1lLCBjdXJyZW50VGltZSk7XHJcbiAgICBsZXQgcyA9IGRpZmZlcmVuY2VJblNlY29uZHMoZXZlbnRUaW1lLCBjdXJyZW50VGltZSkgJSA2MDtcclxuICAgIGlmIChtIDwgMSkge1xyXG4gICAgICAgIGxldCBtcyA9IE1hdGguZmxvb3IoKGRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyhldmVudFRpbWUsIGN1cnJlbnRUaW1lKSAlIDEwMDApIC8gMTAwKSAqIDEwMDtcclxuICAgICAgICBjb3VudGRvd24udGV4dChgJHtzfS4ke1N0cmluZyhtcykuY2hhckF0KDApfXNgKTtcclxuXHJcbiAgICAgICAgaWYgKHMgPT09IDUgJiYgbXMgPT09IDApIHtcclxuICAgICAgICAgICAgY291bnRkb3duNUF1ZGlvLnBsYXkoKS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3RoaW5nLCBqdXN0IGNhdGNoIHRoZSBlcnJvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHMgPT09IDMgJiYgbXMgPT09IDApIHtcclxuICAgICAgICAgICAgY291bnRkb3duM0F1ZGlvLnBsYXkoKS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3RoaW5nLCBqdXN0IGNhdGNoIHRoZSBlcnJvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHMgPT09IDIgJiYgbXMgPT09IDApIHtcclxuICAgICAgICAgICAgY291bnRkb3duMkF1ZGlvLnBsYXkoKS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3RoaW5nLCBqdXN0IGNhdGNoIHRoZSBlcnJvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHMgPT09IDEgJiYgbXMgPT09IDApIHtcclxuICAgICAgICAgICAgY291bnRkb3duMUF1ZGlvLnBsYXkoKS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3RoaW5nLCBqdXN0IGNhdGNoIHRoZSBlcnJvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHMgPD0gMCAmJiBtcyA8PSAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZG93bjBBdWRpby5wbGF5KCkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgLy8gRG8gbm90aGluZywganVzdCBjYXRjaCB0aGUgZXJyb3JcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHdvcmtlclRpbWVycy5jbGVhckludGVydmFsKGNvdW50ZG93bkludGVydmFsKTtcclxuICAgICAgICAgICAgY291bnRkb3duLnRleHQoJ0dvIScpO1xyXG4gICAgICAgICAgICAkKCcjc3RlcC0xIHAnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQob25TdGVwMUVuZCwgMjUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb3VudGRvd24udGV4dChgJHttfW0gJHtzfXNgKTtcclxuXHJcbiAgICAgICAgaWYgKG0gPT09IDUgJiYgcyA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb3VudGRvd241TWludXRlc0F1ZGlvLnBsYXkoKS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3RoaW5nLCBqdXN0IGNhdGNoIHRoZSBlcnJvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG0gPT09IDMgJiYgcyA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb3VudGRvd24zTWludXRlc0F1ZGlvLnBsYXkoKS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3RoaW5nLCBqdXN0IGNhdGNoIHRoZSBlcnJvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG0gPT09IDEgJiYgcyA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb3VudGRvd24xTWludXRlQXVkaW8ucGxheSgpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIC8vIERvIG5vdGhpbmcsIGp1c3QgY2F0Y2ggdGhlIGVycm9yXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGN1cnJlbnRUaW1lID0gYWRkTWlsbGlzZWNvbmRzKGN1cnJlbnRUaW1lLCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblN0ZXAxRW5kKCkge1xyXG4gICAgJCgnI3N0ZXAtMScpLmZhZGVPdXQoMjUwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnI3N0ZXAtMicpLmZhZGVJbigzMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gRmFkaW5nIGFuaW1hdGlvbnMgY29tcGxldGVcclxuICAgICAgICAgICAgd29ya2VyVGltZXJzLmNsZWFySW50ZXJ2YWwoYWpheEludGVydmFsKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblN0ZXAySW5wdXRLZXlwcmVzcyhldmVudCkge1xyXG4gICAgbGV0IGNvZGUgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKGNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgb25TdGVwMkJ1dHRvbkNsaWNrKGV2ZW50KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gb25TdGVwMkJ1dHRvbkNsaWNrKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGxldCBhbGVydCA9ICQoJyNzdGVwLTIgLmFsZXJ0LmFsZXJ0LWRhbmdlcicpO1xyXG4gICAgYWxlcnQuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG5cclxuICAgIC8vIFZhbGlkYXRlIGZvcm1cclxuICAgIGxldCBmb3JtID0gJCgnI3N0ZXAtMiAubmVlZHMtdmFsaWRhdGlvbicpLmdldCgwKTtcclxuICAgIGxldCBpc1ZhbGlkID0gZm9ybS5jaGVja1ZhbGlkaXR5KCk7XHJcbiAgICAkKGZvcm0pLmFkZENsYXNzKCd3YXMtdmFsaWRhdGVkJyk7XHJcbiAgICBpZiAoaXNWYWxpZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGlzYWJsZSBidXR0b24gYW5kIHNob3cgc3Bpbm5lclxyXG4gICAgbGV0IGJ1dHRvbiA9ICQoJyNzdGVwLTIgLmJ0bi5idG4tcHJpbWFyeScpO1xyXG4gICAgbGV0IGJ1dHRvbkh0bWwgPSBidXR0b24uaHRtbCgpO1xyXG4gICAgYnV0dG9uLmh0bWwoJzxzcGFuIGNsYXNzPVwic3Bpbm5lci1ib3JkZXIgc3Bpbm5lci1ib3JkZXItc21cIj48L3NwYW4+IExvYWRpbmcuLi4nKTtcclxuICAgIGJ1dHRvbi5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cclxuICAgIGxldCBzZXJ2ZXJJZCA9ICQoJyNzdGVwLTIgaW5wdXRbbmFtZT1zZXJ2ZXJJZF0nKS52YWwoKTtcclxuXHJcbiAgICAvLyBTZW5kIEFqYXhcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiBgL2FwaS9tYXRjaGVzLyR7c2VydmVySWR9YCxcclxuICAgICAgICB0eXBlOiAnUFVUJ1xyXG4gICAgfSkuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAkKCcjaW4tbWF0Y2gtY291bnRlcicpLnRleHQocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgc29ja2V0Lm9uKHNlcnZlcklkLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAkKCcjaW4tbWF0Y2gtY291bnRlcicpLnRleHQoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhIDwgNSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI3N0ZXAtMyAuYWxlcnQuYWxlcnQtd2FybmluZycpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJyNzdGVwLTMgLmFsZXJ0LmFsZXJ0LXdhcm5pbmcnKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBvblN0ZXAyRW5kKCk7XHJcbiAgICB9KS5mYWlsKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIC8vIEVycm9yXHJcbiAgICAgICAgYnV0dG9uLmh0bWwoYnV0dG9uSHRtbCk7XHJcbiAgICAgICAgYnV0dG9uLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgIGFsZXJ0LnRleHQocmVzcG9uc2UucmVzcG9uc2VKU09OLm1lc3NhZ2UgPyByZXNwb25zZS5yZXNwb25zZUpTT04ubWVzc2FnZSA6ICdVaC1vaCEgQW4gZXJyb3Igb2NjdXJyZWQuJyk7XHJcbiAgICAgICAgYWxlcnQucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uU3RlcDJFbmQoKSB7XHJcbiAgICAkKCcjc3RlcC0yJykuZmFkZU91dCgyNTAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcjc3RlcC0zJykuZmFkZUluKDMwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBGYWRpbmcgYW5pbWF0aW9ucyBjb21wbGV0ZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxyXG4gICAgICAgICAgICB9LCAxMDAwICogNjApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuIiwidmFyIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSA2MDAwMFxuXG4vKipcbiAqIEdvb2dsZSBDaHJvbWUgYXMgb2YgNjcuMC4zMzk2Ljg3IGludHJvZHVjZWQgdGltZXpvbmVzIHdpdGggb2Zmc2V0IHRoYXQgaW5jbHVkZXMgc2Vjb25kcy5cbiAqIFRoZXkgdXN1YWxseSBhcHBlYXIgZm9yIGRhdGVzIHRoYXQgZGVub3RlIHRpbWUgYmVmb3JlIHRoZSB0aW1lem9uZXMgd2VyZSBpbnRyb2R1Y2VkXG4gKiAoZS5nLiBmb3IgJ0V1cm9wZS9QcmFndWUnIHRpbWV6b25lIHRoZSBvZmZzZXQgaXMgR01UKzAwOjU3OjQ0IGJlZm9yZSAxIE9jdG9iZXIgMTg5MVxuICogYW5kIEdNVCswMTowMDowMCBhZnRlciB0aGF0IGRhdGUpXG4gKlxuICogRGF0ZSNnZXRUaW1lem9uZU9mZnNldCByZXR1cm5zIHRoZSBvZmZzZXQgaW4gbWludXRlcyBhbmQgd291bGQgcmV0dXJuIDU3IGZvciB0aGUgZXhhbXBsZSBhYm92ZSxcbiAqIHdoaWNoIHdvdWxkIGxlYWQgdG8gaW5jb3JyZWN0IGNhbGN1bGF0aW9ucy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHRpbWV6b25lIG9mZnNldCBpbiBtaWxsaXNlY29uZHMgdGhhdCB0YWtlcyBzZWNvbmRzIGluIGFjY291bnQuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gbmV3IERhdGUoZGlydHlEYXRlLmdldFRpbWUoKSlcbiAgdmFyIGJhc2VUaW1lem9uZU9mZnNldCA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKVxuICBkYXRlLnNldFNlY29uZHMoMCwgMClcbiAgdmFyIG1pbGxpc2Vjb25kc1BhcnRPZlRpbWV6b25lT2Zmc2V0ID0gZGF0ZS5nZXRUaW1lKCkgJSBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFXG5cbiAgcmV0dXJuIGJhc2VUaW1lem9uZU9mZnNldCAqIE1JTExJU0VDT05EU19JTl9NSU5VVEUgKyBtaWxsaXNlY29uZHNQYXJ0T2ZUaW1lem9uZU9mZnNldFxufVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRheXMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgZGF5cyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIGRheXMgdG8gYmUgYWRkZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgZGF5cyBhZGRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBZGQgMTAgZGF5cyB0byAxIFNlcHRlbWJlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IGFkZERheXMobmV3IERhdGUoMjAxNCwgOCwgMSksIDEwKVxuICogLy89PiBUaHUgU2VwIDExIDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gYWRkRGF5cyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgYW1vdW50KVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZERheXNcbiIsInZhciBhZGRNaWxsaXNlY29uZHMgPSByZXF1aXJlKCcuLi9hZGRfbWlsbGlzZWNvbmRzL2luZGV4LmpzJylcblxudmFyIE1JTExJU0VDT05EU19JTl9IT1VSID0gMzYwMDAwMFxuXG4vKipcbiAqIEBjYXRlZ29yeSBIb3VyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBob3VycyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBob3VycyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIGhvdXJzIHRvIGJlIGFkZGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIGhvdXJzIGFkZGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFkZCAyIGhvdXJzIHRvIDEwIEp1bHkgMjAxNCAyMzowMDowMDpcbiAqIHZhciByZXN1bHQgPSBhZGRIb3VycyhuZXcgRGF0ZSgyMDE0LCA2LCAxMCwgMjMsIDApLCAyKVxuICogLy89PiBGcmkgSnVsIDExIDIwMTQgMDE6MDA6MDBcbiAqL1xuZnVuY3Rpb24gYWRkSG91cnMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgcmV0dXJuIGFkZE1pbGxpc2Vjb25kcyhkaXJ0eURhdGUsIGFtb3VudCAqIE1JTExJU0VDT05EU19JTl9IT1VSKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZEhvdXJzXG4iLCJ2YXIgZ2V0SVNPWWVhciA9IHJlcXVpcmUoJy4uL2dldF9pc29feWVhci9pbmRleC5qcycpXG52YXIgc2V0SVNPWWVhciA9IHJlcXVpcmUoJy4uL3NldF9pc29feWVhci9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IElTTyBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFycyB0byBiZSBhZGRlZFxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgYWRkZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQWRkIDUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIHRvIDIgSnVseSAyMDEwOlxuICogdmFyIHJlc3VsdCA9IGFkZElTT1llYXJzKG5ldyBEYXRlKDIwMTAsIDYsIDIpLCA1KVxuICogLy89PiBGcmkgSnVuIDI2IDIwMTUgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gYWRkSVNPWWVhcnMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgcmV0dXJuIHNldElTT1llYXIoZGlydHlEYXRlLCBnZXRJU09ZZWFyKGRpcnR5RGF0ZSkgKyBhbW91bnQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkSVNPWWVhcnNcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTWlsbGlzZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBtaWxsaXNlY29uZHMgdG8gYmUgYWRkZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbWlsbGlzZWNvbmRzIGFkZGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFkZCA3NTAgbWlsbGlzZWNvbmRzIHRvIDEwIEp1bHkgMjAxNCAxMjo0NTozMC4wMDA6XG4gKiB2YXIgcmVzdWx0ID0gYWRkTWlsbGlzZWNvbmRzKG5ldyBEYXRlKDIwMTQsIDYsIDEwLCAxMiwgNDUsIDMwLCAwKSwgNzUwKVxuICogLy89PiBUaHUgSnVsIDEwIDIwMTQgMTI6NDU6MzAuNzUwXG4gKi9cbmZ1bmN0aW9uIGFkZE1pbGxpc2Vjb25kcyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICB2YXIgdGltZXN0YW1wID0gcGFyc2UoZGlydHlEYXRlKS5nZXRUaW1lKClcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgcmV0dXJuIG5ldyBEYXRlKHRpbWVzdGFtcCArIGFtb3VudClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGRNaWxsaXNlY29uZHNcbiIsInZhciBhZGRNaWxsaXNlY29uZHMgPSByZXF1aXJlKCcuLi9hZGRfbWlsbGlzZWNvbmRzL2luZGV4LmpzJylcblxudmFyIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSA2MDAwMFxuXG4vKipcbiAqIEBjYXRlZ29yeSBNaW51dGUgSGVscGVyc1xuICogQHN1bW1hcnkgQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbnV0ZXMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWludXRlcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIG1pbnV0ZXMgdG8gYmUgYWRkZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbWludXRlcyBhZGRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBZGQgMzAgbWludXRlcyB0byAxMCBKdWx5IDIwMTQgMTI6MDA6MDA6XG4gKiB2YXIgcmVzdWx0ID0gYWRkTWludXRlcyhuZXcgRGF0ZSgyMDE0LCA2LCAxMCwgMTIsIDApLCAzMClcbiAqIC8vPT4gVGh1IEp1bCAxMCAyMDE0IDEyOjMwOjAwXG4gKi9cbmZ1bmN0aW9uIGFkZE1pbnV0ZXMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgcmV0dXJuIGFkZE1pbGxpc2Vjb25kcyhkaXJ0eURhdGUsIGFtb3VudCAqIE1JTExJU0VDT05EU19JTl9NSU5VVEUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkTWludXRlc1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxudmFyIGdldERheXNJbk1vbnRoID0gcmVxdWlyZSgnLi4vZ2V0X2RheXNfaW5fbW9udGgvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbW9udGhzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1vbnRocyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIG1vbnRocyB0byBiZSBhZGRlZFxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBtb250aHMgYWRkZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQWRkIDUgbW9udGhzIHRvIDEgU2VwdGVtYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gYWRkTW9udGhzKG5ldyBEYXRlKDIwMTQsIDgsIDEpLCA1KVxuICogLy89PiBTdW4gRmViIDAxIDIwMTUgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gYWRkTW9udGhzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KVxuICB2YXIgZGVzaXJlZE1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgYW1vdW50XG4gIHZhciBkYXRlV2l0aERlc2lyZWRNb250aCA9IG5ldyBEYXRlKDApXG4gIGRhdGVXaXRoRGVzaXJlZE1vbnRoLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGVzaXJlZE1vbnRoLCAxKVxuICBkYXRlV2l0aERlc2lyZWRNb250aC5zZXRIb3VycygwLCAwLCAwLCAwKVxuICB2YXIgZGF5c0luTW9udGggPSBnZXREYXlzSW5Nb250aChkYXRlV2l0aERlc2lyZWRNb250aClcbiAgLy8gU2V0IHRoZSBsYXN0IGRheSBvZiB0aGUgbmV3IG1vbnRoXG4gIC8vIGlmIHRoZSBvcmlnaW5hbCBkYXRlIHdhcyB0aGUgbGFzdCBkYXkgb2YgdGhlIGxvbmdlciBtb250aFxuICBkYXRlLnNldE1vbnRoKGRlc2lyZWRNb250aCwgTWF0aC5taW4oZGF5c0luTW9udGgsIGRhdGUuZ2V0RGF0ZSgpKSlcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGRNb250aHNcbiIsInZhciBhZGRNb250aHMgPSByZXF1aXJlKCcuLi9hZGRfbW9udGhzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgUXVhcnRlciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgeWVhciBxdWFydGVycyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiB5ZWFyIHF1YXJ0ZXJzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgcXVhcnRlcnMgdG8gYmUgYWRkZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgcXVhcnRlcnMgYWRkZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQWRkIDEgcXVhcnRlciB0byAxIFNlcHRlbWJlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IGFkZFF1YXJ0ZXJzKG5ldyBEYXRlKDIwMTQsIDgsIDEpLCAxKVxuICogLy89PiBNb24gRGVjIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gYWRkUXVhcnRlcnMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgdmFyIG1vbnRocyA9IGFtb3VudCAqIDNcbiAgcmV0dXJuIGFkZE1vbnRocyhkaXJ0eURhdGUsIG1vbnRocylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGRRdWFydGVyc1xuIiwidmFyIGFkZE1pbGxpc2Vjb25kcyA9IHJlcXVpcmUoJy4uL2FkZF9taWxsaXNlY29uZHMvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBTZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIHNlY29uZHMgdG8gYmUgYWRkZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgc2Vjb25kcyBhZGRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBZGQgMzAgc2Vjb25kcyB0byAxMCBKdWx5IDIwMTQgMTI6NDU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gYWRkU2Vjb25kcyhuZXcgRGF0ZSgyMDE0LCA2LCAxMCwgMTIsIDQ1LCAwKSwgMzApXG4gKiAvLz0+IFRodSBKdWwgMTAgMjAxNCAxMjo0NTozMFxuICovXG5mdW5jdGlvbiBhZGRTZWNvbmRzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHJldHVybiBhZGRNaWxsaXNlY29uZHMoZGlydHlEYXRlLCBhbW91bnQgKiAxMDAwKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZFNlY29uZHNcbiIsInZhciBhZGREYXlzID0gcmVxdWlyZSgnLi4vYWRkX2RheXMvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiB3ZWVrcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiB3ZWVrIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2Ygd2Vla3MgdG8gYmUgYWRkZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgd2Vla3MgYWRkZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQWRkIDQgd2Vla3MgdG8gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBhZGRXZWVrcyhuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgNClcbiAqIC8vPT4gTW9uIFNlcCAyOSAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIGFkZFdlZWtzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHZhciBkYXlzID0gYW1vdW50ICogN1xuICByZXR1cm4gYWRkRGF5cyhkaXJ0eURhdGUsIGRheXMpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkV2Vla3NcbiIsInZhciBhZGRNb250aHMgPSByZXF1aXJlKCcuLi9hZGRfbW9udGhzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgeWVhcnMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgeWVhcnMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiB5ZWFycyB0byBiZSBhZGRlZFxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSB5ZWFycyBhZGRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBZGQgNSB5ZWFycyB0byAxIFNlcHRlbWJlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IGFkZFllYXJzKG5ldyBEYXRlKDIwMTQsIDgsIDEpLCA1KVxuICogLy89PiBTdW4gU2VwIDAxIDIwMTkgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gYWRkWWVhcnMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgcmV0dXJuIGFkZE1vbnRocyhkaXJ0eURhdGUsIGFtb3VudCAqIDEyKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZFllYXJzXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFJhbmdlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHJhbmdlIG92ZXJsYXBwaW5nIHdpdGggYW5vdGhlciBkYXRlIHJhbmdlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgcmFuZ2Ugb3ZlcmxhcHBpbmcgd2l0aCBhbm90aGVyIGRhdGUgcmFuZ2U/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGluaXRpYWxSYW5nZVN0YXJ0RGF0ZSAtIHRoZSBzdGFydCBvZiB0aGUgaW5pdGlhbCByYW5nZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGluaXRpYWxSYW5nZUVuZERhdGUgLSB0aGUgZW5kIG9mIHRoZSBpbml0aWFsIHJhbmdlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gY29tcGFyZWRSYW5nZVN0YXJ0RGF0ZSAtIHRoZSBzdGFydCBvZiB0aGUgcmFuZ2UgdG8gY29tcGFyZSBpdCB3aXRoXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gY29tcGFyZWRSYW5nZUVuZERhdGUgLSB0aGUgZW5kIG9mIHRoZSByYW5nZSB0byBjb21wYXJlIGl0IHdpdGhcbiAqIEByZXR1cm5zIHtCb29sZWFufSB3aGV0aGVyIHRoZSBkYXRlIHJhbmdlcyBhcmUgb3ZlcmxhcHBpbmdcbiAqIEB0aHJvd3Mge0Vycm9yfSBzdGFydERhdGUgb2YgYSBkYXRlIHJhbmdlIGNhbm5vdCBiZSBhZnRlciBpdHMgZW5kRGF0ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3Igb3ZlcmxhcHBpbmcgZGF0ZSByYW5nZXM6XG4gKiBhcmVSYW5nZXNPdmVybGFwcGluZyhcbiAqICAgbmV3IERhdGUoMjAxNCwgMCwgMTApLCBuZXcgRGF0ZSgyMDE0LCAwLCAyMCksIG5ldyBEYXRlKDIwMTQsIDAsIDE3KSwgbmV3IERhdGUoMjAxNCwgMCwgMjEpXG4gKiApXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIG5vbi1vdmVybGFwcGluZyBkYXRlIHJhbmdlczpcbiAqIGFyZVJhbmdlc092ZXJsYXBwaW5nKFxuICogICBuZXcgRGF0ZSgyMDE0LCAwLCAxMCksIG5ldyBEYXRlKDIwMTQsIDAsIDIwKSwgbmV3IERhdGUoMjAxNCwgMCwgMjEpLCBuZXcgRGF0ZSgyMDE0LCAwLCAyMilcbiAqIClcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gYXJlUmFuZ2VzT3ZlcmxhcHBpbmcgKGRpcnR5SW5pdGlhbFJhbmdlU3RhcnREYXRlLCBkaXJ0eUluaXRpYWxSYW5nZUVuZERhdGUsIGRpcnR5Q29tcGFyZWRSYW5nZVN0YXJ0RGF0ZSwgZGlydHlDb21wYXJlZFJhbmdlRW5kRGF0ZSkge1xuICB2YXIgaW5pdGlhbFN0YXJ0VGltZSA9IHBhcnNlKGRpcnR5SW5pdGlhbFJhbmdlU3RhcnREYXRlKS5nZXRUaW1lKClcbiAgdmFyIGluaXRpYWxFbmRUaW1lID0gcGFyc2UoZGlydHlJbml0aWFsUmFuZ2VFbmREYXRlKS5nZXRUaW1lKClcbiAgdmFyIGNvbXBhcmVkU3RhcnRUaW1lID0gcGFyc2UoZGlydHlDb21wYXJlZFJhbmdlU3RhcnREYXRlKS5nZXRUaW1lKClcbiAgdmFyIGNvbXBhcmVkRW5kVGltZSA9IHBhcnNlKGRpcnR5Q29tcGFyZWRSYW5nZUVuZERhdGUpLmdldFRpbWUoKVxuXG4gIGlmIChpbml0aWFsU3RhcnRUaW1lID4gaW5pdGlhbEVuZFRpbWUgfHwgY29tcGFyZWRTdGFydFRpbWUgPiBjb21wYXJlZEVuZFRpbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBzdGFydCBvZiB0aGUgcmFuZ2UgY2Fubm90IGJlIGFmdGVyIHRoZSBlbmQgb2YgdGhlIHJhbmdlJylcbiAgfVxuXG4gIHJldHVybiBpbml0aWFsU3RhcnRUaW1lIDwgY29tcGFyZWRFbmRUaW1lICYmIGNvbXBhcmVkU3RhcnRUaW1lIDwgaW5pdGlhbEVuZFRpbWVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcmVSYW5nZXNPdmVybGFwcGluZ1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIGFuIGluZGV4IG9mIHRoZSBjbG9zZXN0IGRhdGUgZnJvbSB0aGUgYXJyYXkgY29tcGFyaW5nIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIGFuIGluZGV4IG9mIHRoZSBjbG9zZXN0IGRhdGUgZnJvbSB0aGUgYXJyYXkgY29tcGFyaW5nIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlVG9Db21wYXJlIC0gdGhlIGRhdGUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcGFyYW0ge0RhdGVbXXxTdHJpbmdbXXxOdW1iZXJbXX0gZGF0ZXNBcnJheSAtIHRoZSBhcnJheSB0byBzZWFyY2hcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGFuIGluZGV4IG9mIHRoZSBkYXRlIGNsb3Nlc3QgdG8gdGhlIGdpdmVuIGRhdGVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gdGhlIHNlY29uZCBhcmd1bWVudCBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIEFycmF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIGRhdGUgaXMgY2xvc2VyIHRvIDYgU2VwdGVtYmVyIDIwMTU/XG4gKiB2YXIgZGF0ZVRvQ29tcGFyZSA9IG5ldyBEYXRlKDIwMTUsIDgsIDYpXG4gKiB2YXIgZGF0ZXNBcnJheSA9IFtcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMTYsIDAsIDEpLFxuICogICBuZXcgRGF0ZSgyMDE3LCAwLCAxKVxuICogXVxuICogdmFyIHJlc3VsdCA9IGNsb3Nlc3RJbmRleFRvKGRhdGVUb0NvbXBhcmUsIGRhdGVzQXJyYXkpXG4gKiAvLz0+IDFcbiAqL1xuZnVuY3Rpb24gY2xvc2VzdEluZGV4VG8gKGRpcnR5RGF0ZVRvQ29tcGFyZSwgZGlydHlEYXRlc0FycmF5KSB7XG4gIGlmICghKGRpcnR5RGF0ZXNBcnJheSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IodG9TdHJpbmcuY2FsbChkaXJ0eURhdGVzQXJyYXkpICsgJyBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgQXJyYXknKVxuICB9XG5cbiAgdmFyIGRhdGVUb0NvbXBhcmUgPSBwYXJzZShkaXJ0eURhdGVUb0NvbXBhcmUpXG4gIHZhciB0aW1lVG9Db21wYXJlID0gZGF0ZVRvQ29tcGFyZS5nZXRUaW1lKClcblxuICB2YXIgcmVzdWx0XG4gIHZhciBtaW5EaXN0YW5jZVxuXG4gIGRpcnR5RGF0ZXNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJ0eURhdGUsIGluZGV4KSB7XG4gICAgdmFyIGN1cnJlbnREYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICAgIHZhciBkaXN0YW5jZSA9IE1hdGguYWJzKHRpbWVUb0NvbXBhcmUgLSBjdXJyZW50RGF0ZS5nZXRUaW1lKCkpXG4gICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkIHx8IGRpc3RhbmNlIDwgbWluRGlzdGFuY2UpIHtcbiAgICAgIHJlc3VsdCA9IGluZGV4XG4gICAgICBtaW5EaXN0YW5jZSA9IGRpc3RhbmNlXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9zZXN0SW5kZXhUb1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIGEgZGF0ZSBmcm9tIHRoZSBhcnJheSBjbG9zZXN0IHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIGEgZGF0ZSBmcm9tIHRoZSBhcnJheSBjbG9zZXN0IHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlVG9Db21wYXJlIC0gdGhlIGRhdGUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcGFyYW0ge0RhdGVbXXxTdHJpbmdbXXxOdW1iZXJbXX0gZGF0ZXNBcnJheSAtIHRoZSBhcnJheSB0byBzZWFyY2hcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZGF0ZSBmcm9tIHRoZSBhcnJheSBjbG9zZXN0IHRvIHRoZSBnaXZlbiBkYXRlXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IHRoZSBzZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBBcnJheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCBkYXRlIGlzIGNsb3NlciB0byA2IFNlcHRlbWJlciAyMDE1OiAxIEphbnVhcnkgMjAwMCBvciAxIEphbnVhcnkgMjAzMD9cbiAqIHZhciBkYXRlVG9Db21wYXJlID0gbmV3IERhdGUoMjAxNSwgOCwgNilcbiAqIHZhciByZXN1bHQgPSBjbG9zZXN0VG8oZGF0ZVRvQ29tcGFyZSwgW1xuICogICBuZXcgRGF0ZSgyMDAwLCAwLCAxKSxcbiAqICAgbmV3IERhdGUoMjAzMCwgMCwgMSlcbiAqIF0pXG4gKiAvLz0+IFR1ZSBKYW4gMDEgMjAzMCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBjbG9zZXN0VG8gKGRpcnR5RGF0ZVRvQ29tcGFyZSwgZGlydHlEYXRlc0FycmF5KSB7XG4gIGlmICghKGRpcnR5RGF0ZXNBcnJheSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IodG9TdHJpbmcuY2FsbChkaXJ0eURhdGVzQXJyYXkpICsgJyBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgQXJyYXknKVxuICB9XG5cbiAgdmFyIGRhdGVUb0NvbXBhcmUgPSBwYXJzZShkaXJ0eURhdGVUb0NvbXBhcmUpXG4gIHZhciB0aW1lVG9Db21wYXJlID0gZGF0ZVRvQ29tcGFyZS5nZXRUaW1lKClcblxuICB2YXIgcmVzdWx0XG4gIHZhciBtaW5EaXN0YW5jZVxuXG4gIGRpcnR5RGF0ZXNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJ0eURhdGUpIHtcbiAgICB2YXIgY3VycmVudERhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gICAgdmFyIGRpc3RhbmNlID0gTWF0aC5hYnModGltZVRvQ29tcGFyZSAtIGN1cnJlbnREYXRlLmdldFRpbWUoKSlcbiAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQgfHwgZGlzdGFuY2UgPCBtaW5EaXN0YW5jZSkge1xuICAgICAgcmVzdWx0ID0gY3VycmVudERhdGVcbiAgICAgIG1pbkRpc3RhbmNlID0gZGlzdGFuY2VcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb3Nlc3RUb1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29tcGFyZSB0aGUgdHdvIGRhdGVzIGFuZCByZXR1cm4gLTEsIDAgb3IgMS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIDEgaWYgdGhlIGZpcnN0IGRhdGUgaXMgYWZ0ZXIgdGhlIHNlY29uZCxcbiAqIC0xIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIG9yIDAgaWYgZGF0ZXMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIHJlc3VsdCBvZiB0aGUgY29tcGFyaXNvblxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb21wYXJlIDExIEZlYnJ1YXJ5IDE5ODcgYW5kIDEwIEp1bHkgMTk4OTpcbiAqIHZhciByZXN1bHQgPSBjb21wYXJlQXNjKFxuICogICBuZXcgRGF0ZSgxOTg3LCAxLCAxMSksXG4gKiAgIG5ldyBEYXRlKDE5ODksIDYsIDEwKVxuICogKVxuICogLy89PiAtMVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTb3J0IHRoZSBhcnJheSBvZiBkYXRlczpcbiAqIHZhciByZXN1bHQgPSBbXG4gKiAgIG5ldyBEYXRlKDE5OTUsIDYsIDIpLFxuICogICBuZXcgRGF0ZSgxOTg3LCAxLCAxMSksXG4gKiAgIG5ldyBEYXRlKDE5ODksIDYsIDEwKVxuICogXS5zb3J0KGNvbXBhcmVBc2MpXG4gKiAvLz0+IFtcbiAqIC8vICAgV2VkIEZlYiAxMSAxOTg3IDAwOjAwOjAwLFxuICogLy8gICBNb24gSnVsIDEwIDE5ODkgMDA6MDA6MDAsXG4gKiAvLyAgIFN1biBKdWwgMDIgMTk5NSAwMDowMDowMFxuICogLy8gXVxuICovXG5mdW5jdGlvbiBjb21wYXJlQXNjIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgdGltZUxlZnQgPSBkYXRlTGVmdC5nZXRUaW1lKClcbiAgdmFyIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5RGF0ZVJpZ2h0KVxuICB2YXIgdGltZVJpZ2h0ID0gZGF0ZVJpZ2h0LmdldFRpbWUoKVxuXG4gIGlmICh0aW1lTGVmdCA8IHRpbWVSaWdodCkge1xuICAgIHJldHVybiAtMVxuICB9IGVsc2UgaWYgKHRpbWVMZWZ0ID4gdGltZVJpZ2h0KSB7XG4gICAgcmV0dXJuIDFcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29tcGFyZUFzY1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29tcGFyZSB0aGUgdHdvIGRhdGVzIHJldmVyc2UgY2hyb25vbG9naWNhbGx5IGFuZCByZXR1cm4gLTEsIDAgb3IgMS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIC0xIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGFmdGVyIHRoZSBzZWNvbmQsXG4gKiAxIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIG9yIDAgaWYgZGF0ZXMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIHJlc3VsdCBvZiB0aGUgY29tcGFyaXNvblxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb21wYXJlIDExIEZlYnJ1YXJ5IDE5ODcgYW5kIDEwIEp1bHkgMTk4OSByZXZlcnNlIGNocm9ub2xvZ2ljYWxseTpcbiAqIHZhciByZXN1bHQgPSBjb21wYXJlRGVzYyhcbiAqICAgbmV3IERhdGUoMTk4NywgMSwgMTEpLFxuICogICBuZXcgRGF0ZSgxOTg5LCA2LCAxMClcbiAqIClcbiAqIC8vPT4gMVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTb3J0IHRoZSBhcnJheSBvZiBkYXRlcyBpbiByZXZlcnNlIGNocm9ub2xvZ2ljYWwgb3JkZXI6XG4gKiB2YXIgcmVzdWx0ID0gW1xuICogICBuZXcgRGF0ZSgxOTk1LCA2LCAyKSxcbiAqICAgbmV3IERhdGUoMTk4NywgMSwgMTEpLFxuICogICBuZXcgRGF0ZSgxOTg5LCA2LCAxMClcbiAqIF0uc29ydChjb21wYXJlRGVzYylcbiAqIC8vPT4gW1xuICogLy8gICBTdW4gSnVsIDAyIDE5OTUgMDA6MDA6MDAsXG4gKiAvLyAgIE1vbiBKdWwgMTAgMTk4OSAwMDowMDowMCxcbiAqIC8vICAgV2VkIEZlYiAxMSAxOTg3IDAwOjAwOjAwXG4gKiAvLyBdXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVEZXNjIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgdGltZUxlZnQgPSBkYXRlTGVmdC5nZXRUaW1lKClcbiAgdmFyIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5RGF0ZVJpZ2h0KVxuICB2YXIgdGltZVJpZ2h0ID0gZGF0ZVJpZ2h0LmdldFRpbWUoKVxuXG4gIGlmICh0aW1lTGVmdCA+IHRpbWVSaWdodCkge1xuICAgIHJldHVybiAtMVxuICB9IGVsc2UgaWYgKHRpbWVMZWZ0IDwgdGltZVJpZ2h0KSB7XG4gICAgcmV0dXJuIDFcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29tcGFyZURlc2NcbiIsInZhciBzdGFydE9mRGF5ID0gcmVxdWlyZSgnLi4vc3RhcnRfb2ZfZGF5L2luZGV4LmpzJylcblxudmFyIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSA2MDAwMFxudmFyIE1JTExJU0VDT05EU19JTl9EQVkgPSA4NjQwMDAwMFxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgZGF5cyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgZGF5cyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTEgMjM6MDA6MDAgYW5kIDIgSnVseSAyMDEyIDAwOjAwOjAwP1xuICogdmFyIHJlc3VsdCA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhcbiAqICAgbmV3IERhdGUoMjAxMiwgNiwgMiwgMCwgMCksXG4gKiAgIG5ldyBEYXRlKDIwMTEsIDYsIDIsIDIzLCAwKVxuICogKVxuICogLy89PiAzNjZcbiAqL1xuZnVuY3Rpb24gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgc3RhcnRPZkRheUxlZnQgPSBzdGFydE9mRGF5KGRpcnR5RGF0ZUxlZnQpXG4gIHZhciBzdGFydE9mRGF5UmlnaHQgPSBzdGFydE9mRGF5KGRpcnR5RGF0ZVJpZ2h0KVxuXG4gIHZhciB0aW1lc3RhbXBMZWZ0ID0gc3RhcnRPZkRheUxlZnQuZ2V0VGltZSgpIC1cbiAgICBzdGFydE9mRGF5TGVmdC5nZXRUaW1lem9uZU9mZnNldCgpICogTUlMTElTRUNPTkRTX0lOX01JTlVURVxuICB2YXIgdGltZXN0YW1wUmlnaHQgPSBzdGFydE9mRGF5UmlnaHQuZ2V0VGltZSgpIC1cbiAgICBzdGFydE9mRGF5UmlnaHQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIE1JTExJU0VDT05EU19JTl9NSU5VVEVcblxuICAvLyBSb3VuZCB0aGUgbnVtYmVyIG9mIGRheXMgdG8gdGhlIG5lYXJlc3QgaW50ZWdlclxuICAvLyBiZWNhdXNlIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGluIGEgZGF5IGlzIG5vdCBjb25zdGFudFxuICAvLyAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgZGF5IG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcbiAgcmV0dXJuIE1hdGgucm91bmQoKHRpbWVzdGFtcExlZnQgLSB0aW1lc3RhbXBSaWdodCkgLyBNSUxMSVNFQ09ORFNfSU5fREFZKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5c1xuIiwidmFyIHN0YXJ0T2ZJU09XZWVrID0gcmVxdWlyZSgnLi4vc3RhcnRfb2ZfaXNvX3dlZWsvaW5kZXguanMnKVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX01JTlVURSA9IDYwMDAwXG52YXIgTUlMTElTRUNPTkRTX0lOX1dFRUsgPSA2MDQ4MDAwMDBcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgSVNPIHdlZWtzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgSVNPIHdlZWtzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgSVNPIHdlZWtzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGNhbGVuZGFyIElTTyB3ZWVrcyBhcmUgYmV0d2VlbiA2IEp1bHkgMjAxNCBhbmQgMjEgSnVseSAyMDE0P1xuICogdmFyIHJlc3VsdCA9IGRpZmZlcmVuY2VJbkNhbGVuZGFySVNPV2Vla3MoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIxKSxcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgNilcbiAqIClcbiAqIC8vPT4gM1xuICovXG5mdW5jdGlvbiBkaWZmZXJlbmNlSW5DYWxlbmRhcklTT1dlZWtzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgc3RhcnRPZklTT1dlZWtMZWZ0ID0gc3RhcnRPZklTT1dlZWsoZGlydHlEYXRlTGVmdClcbiAgdmFyIHN0YXJ0T2ZJU09XZWVrUmlnaHQgPSBzdGFydE9mSVNPV2VlayhkaXJ0eURhdGVSaWdodClcblxuICB2YXIgdGltZXN0YW1wTGVmdCA9IHN0YXJ0T2ZJU09XZWVrTGVmdC5nZXRUaW1lKCkgLVxuICAgIHN0YXJ0T2ZJU09XZWVrTGVmdC5nZXRUaW1lem9uZU9mZnNldCgpICogTUlMTElTRUNPTkRTX0lOX01JTlVURVxuICB2YXIgdGltZXN0YW1wUmlnaHQgPSBzdGFydE9mSVNPV2Vla1JpZ2h0LmdldFRpbWUoKSAtXG4gICAgc3RhcnRPZklTT1dlZWtSaWdodC5nZXRUaW1lem9uZU9mZnNldCgpICogTUlMTElTRUNPTkRTX0lOX01JTlVURVxuXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2YgZGF5cyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyXG4gIC8vIGJlY2F1c2UgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSB3ZWVrIGlzIG5vdCBjb25zdGFudFxuICAvLyAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgd2VlayBvZiB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpXG4gIHJldHVybiBNYXRoLnJvdW5kKCh0aW1lc3RhbXBMZWZ0IC0gdGltZXN0YW1wUmlnaHQpIC8gTUlMTElTRUNPTkRTX0lOX1dFRUspXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJJU09XZWVrc1xuIiwidmFyIGdldElTT1llYXIgPSByZXF1aXJlKCcuLi9nZXRfaXNvX3llYXIvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBjYWxlbmRhciBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIGFyZSAxIEphbnVhcnkgMjAxMCBhbmQgMSBKYW51YXJ5IDIwMTI/XG4gKiB2YXIgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJJU09ZZWFycyhcbiAqICAgbmV3IERhdGUoMjAxMiwgMCwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMTAsIDAsIDEpXG4gKiApXG4gKiAvLz0+IDJcbiAqL1xuZnVuY3Rpb24gZGlmZmVyZW5jZUluQ2FsZW5kYXJJU09ZZWFycyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgcmV0dXJuIGdldElTT1llYXIoZGlydHlEYXRlTGVmdCkgLSBnZXRJU09ZZWFyKGRpcnR5RGF0ZVJpZ2h0KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZlcmVuY2VJbkNhbGVuZGFySVNPWWVhcnNcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgbW9udGhzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgbW9udGhzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBjYWxlbmRhciBtb250aHNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgbW9udGhzIGFyZSBiZXR3ZWVuIDMxIEphbnVhcnkgMjAxNCBhbmQgMSBTZXB0ZW1iZXIgMjAxND9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDAsIDMxKVxuICogKVxuICogLy89PiA4XG4gKi9cbmZ1bmN0aW9uIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgZGF0ZVJpZ2h0ID0gcGFyc2UoZGlydHlEYXRlUmlnaHQpXG5cbiAgdmFyIHllYXJEaWZmID0gZGF0ZUxlZnQuZ2V0RnVsbFllYXIoKSAtIGRhdGVSaWdodC5nZXRGdWxsWWVhcigpXG4gIHZhciBtb250aERpZmYgPSBkYXRlTGVmdC5nZXRNb250aCgpIC0gZGF0ZVJpZ2h0LmdldE1vbnRoKClcblxuICByZXR1cm4geWVhckRpZmYgKiAxMiArIG1vbnRoRGlmZlxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzXG4iLCJ2YXIgZ2V0UXVhcnRlciA9IHJlcXVpcmUoJy4uL2dldF9xdWFydGVyL2luZGV4LmpzJylcbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgUXVhcnRlciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBxdWFydGVycyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIHF1YXJ0ZXJzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBjYWxlbmRhciBxdWFydGVyc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBjYWxlbmRhciBxdWFydGVycyBhcmUgYmV0d2VlbiAzMSBEZWNlbWJlciAyMDEzIGFuZCAyIEp1bHkgMjAxND9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyKSxcbiAqICAgbmV3IERhdGUoMjAxMywgMTEsIDMxKVxuICogKVxuICogLy89PiAzXG4gKi9cbmZ1bmN0aW9uIGRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkYXRlTGVmdCA9IHBhcnNlKGRpcnR5RGF0ZUxlZnQpXG4gIHZhciBkYXRlUmlnaHQgPSBwYXJzZShkaXJ0eURhdGVSaWdodClcblxuICB2YXIgeWVhckRpZmYgPSBkYXRlTGVmdC5nZXRGdWxsWWVhcigpIC0gZGF0ZVJpZ2h0LmdldEZ1bGxZZWFyKClcbiAgdmFyIHF1YXJ0ZXJEaWZmID0gZ2V0UXVhcnRlcihkYXRlTGVmdCkgLSBnZXRRdWFydGVyKGRhdGVSaWdodClcblxuICByZXR1cm4geWVhckRpZmYgKiA0ICsgcXVhcnRlckRpZmZcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzXG4iLCJ2YXIgc3RhcnRPZldlZWsgPSByZXF1aXJlKCcuLi9zdGFydF9vZl93ZWVrL2luZGV4LmpzJylcblxudmFyIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSA2MDAwMFxudmFyIE1JTExJU0VDT05EU19JTl9XRUVLID0gNjA0ODAwMDAwXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgd2Vla3MgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciB3ZWVrcyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLndlZWtTdGFydHNPbj0wXSAtIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrICgwIC0gU3VuZGF5KVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBjYWxlbmRhciB3ZWVrc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBjYWxlbmRhciB3ZWVrcyBhcmUgYmV0d2VlbiA1IEp1bHkgMjAxNCBhbmQgMjAgSnVseSAyMDE0P1xuICogdmFyIHJlc3VsdCA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyV2Vla3MoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIwKSxcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgNSlcbiAqIClcbiAqIC8vPT4gM1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0aGUgd2VlayBzdGFydHMgb24gTW9uZGF5LFxuICogLy8gaG93IG1hbnkgY2FsZW5kYXIgd2Vla3MgYXJlIGJldHdlZW4gNSBKdWx5IDIwMTQgYW5kIDIwIEp1bHkgMjAxND9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhcldlZWtzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyMCksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDUpLFxuICogICB7d2Vla1N0YXJ0c09uOiAxfVxuICogKVxuICogLy89PiAyXG4gKi9cbmZ1bmN0aW9uIGRpZmZlcmVuY2VJbkNhbGVuZGFyV2Vla3MgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0LCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIHN0YXJ0T2ZXZWVrTGVmdCA9IHN0YXJ0T2ZXZWVrKGRpcnR5RGF0ZUxlZnQsIGRpcnR5T3B0aW9ucylcbiAgdmFyIHN0YXJ0T2ZXZWVrUmlnaHQgPSBzdGFydE9mV2VlayhkaXJ0eURhdGVSaWdodCwgZGlydHlPcHRpb25zKVxuXG4gIHZhciB0aW1lc3RhbXBMZWZ0ID0gc3RhcnRPZldlZWtMZWZ0LmdldFRpbWUoKSAtXG4gICAgc3RhcnRPZldlZWtMZWZ0LmdldFRpbWV6b25lT2Zmc2V0KCkgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFXG4gIHZhciB0aW1lc3RhbXBSaWdodCA9IHN0YXJ0T2ZXZWVrUmlnaHQuZ2V0VGltZSgpIC1cbiAgICBzdGFydE9mV2Vla1JpZ2h0LmdldFRpbWV6b25lT2Zmc2V0KCkgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFXG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIHdlZWsgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSB3ZWVrIG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcbiAgcmV0dXJuIE1hdGgucm91bmQoKHRpbWVzdGFtcExlZnQgLSB0aW1lc3RhbXBSaWdodCkgLyBNSUxMSVNFQ09ORFNfSU5fV0VFSylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5DYWxlbmRhcldlZWtzXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgeWVhcnMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciB5ZWFycyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgeWVhcnNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgeWVhcnMgYXJlIGJldHdlZW4gMzEgRGVjZW1iZXIgMjAxMyBhbmQgMTEgRmVicnVhcnkgMjAxNT9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKFxuICogICBuZXcgRGF0ZSgyMDE1LCAxLCAxMSksXG4gKiAgIG5ldyBEYXRlKDIwMTMsIDExLCAzMSlcbiAqIClcbiAqIC8vPT4gMlxuICovXG5mdW5jdGlvbiBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgZGF0ZVJpZ2h0ID0gcGFyc2UoZGlydHlEYXRlUmlnaHQpXG5cbiAgcmV0dXJuIGRhdGVMZWZ0LmdldEZ1bGxZZWFyKCkgLSBkYXRlUmlnaHQuZ2V0RnVsbFllYXIoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnNcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMgPSByZXF1aXJlKCcuLi9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX2RheXMvaW5kZXguanMnKVxudmFyIGNvbXBhcmVBc2MgPSByZXF1aXJlKCcuLi9jb21wYXJlX2FzYy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBmdWxsIGRheXMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBmdWxsIGRheXMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIGZ1bGwgZGF5c1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBmdWxsIGRheXMgYXJlIGJldHdlZW5cbiAqIC8vIDIgSnVseSAyMDExIDIzOjAwOjAwIGFuZCAyIEp1bHkgMjAxMiAwMDowMDowMD9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5EYXlzKFxuICogICBuZXcgRGF0ZSgyMDEyLCA2LCAyLCAwLCAwKSxcbiAqICAgbmV3IERhdGUoMjAxMSwgNiwgMiwgMjMsIDApXG4gKiApXG4gKiAvLz0+IDM2NVxuICovXG5mdW5jdGlvbiBkaWZmZXJlbmNlSW5EYXlzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgZGF0ZVJpZ2h0ID0gcGFyc2UoZGlydHlEYXRlUmlnaHQpXG5cbiAgdmFyIHNpZ24gPSBjb21wYXJlQXNjKGRhdGVMZWZ0LCBkYXRlUmlnaHQpXG4gIHZhciBkaWZmZXJlbmNlID0gTWF0aC5hYnMoZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRhdGVMZWZ0LCBkYXRlUmlnaHQpKVxuICBkYXRlTGVmdC5zZXREYXRlKGRhdGVMZWZ0LmdldERhdGUoKSAtIHNpZ24gKiBkaWZmZXJlbmNlKVxuXG4gIC8vIE1hdGguYWJzKGRpZmYgaW4gZnVsbCBkYXlzIC0gZGlmZiBpbiBjYWxlbmRhciBkYXlzKSA9PT0gMSBpZiBsYXN0IGNhbGVuZGFyIGRheSBpcyBub3QgZnVsbFxuICAvLyBJZiBzbywgcmVzdWx0IG11c3QgYmUgZGVjcmVhc2VkIGJ5IDEgaW4gYWJzb2x1dGUgdmFsdWVcbiAgdmFyIGlzTGFzdERheU5vdEZ1bGwgPSBjb21wYXJlQXNjKGRhdGVMZWZ0LCBkYXRlUmlnaHQpID09PSAtc2lnblxuICByZXR1cm4gc2lnbiAqIChkaWZmZXJlbmNlIC0gaXNMYXN0RGF5Tm90RnVsbClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5EYXlzXG4iLCJ2YXIgZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzID0gcmVxdWlyZSgnLi4vZGlmZmVyZW5jZV9pbl9taWxsaXNlY29uZHMvaW5kZXguanMnKVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX0hPVVIgPSAzNjAwMDAwXG5cbi8qKlxuICogQGNhdGVnb3J5IEhvdXIgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgaG91cnMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBob3VycyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgaG91cnNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgaG91cnMgYXJlIGJldHdlZW4gMiBKdWx5IDIwMTQgMDY6NTA6MDAgYW5kIDIgSnVseSAyMDE0IDE5OjAwOjAwP1xuICogdmFyIHJlc3VsdCA9IGRpZmZlcmVuY2VJbkhvdXJzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCAxOSwgMCksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDYsIDUwKVxuICogKVxuICogLy89PiAxMlxuICovXG5mdW5jdGlvbiBkaWZmZXJlbmNlSW5Ib3VycyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRpZmYgPSBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIC8gTUlMTElTRUNPTkRTX0lOX0hPVVJcbiAgcmV0dXJuIGRpZmYgPiAwID8gTWF0aC5mbG9vcihkaWZmKSA6IE1hdGguY2VpbChkaWZmKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZlcmVuY2VJbkhvdXJzXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG52YXIgZGlmZmVyZW5jZUluQ2FsZW5kYXJJU09ZZWFycyA9IHJlcXVpcmUoJy4uL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfaXNvX3llYXJzL2luZGV4LmpzJylcbnZhciBjb21wYXJlQXNjID0gcmVxdWlyZSgnLi4vY29tcGFyZV9hc2MvaW5kZXguanMnKVxudmFyIHN1YklTT1llYXJzID0gcmVxdWlyZSgnLi4vc3ViX2lzb195ZWFycy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IElTTyBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGZ1bGwgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgZnVsbCBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBmdWxsIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBmdWxsIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFycyBhcmUgYmV0d2VlbiAxIEphbnVhcnkgMjAxMCBhbmQgMSBKYW51YXJ5IDIwMTI/XG4gKiB2YXIgcmVzdWx0ID0gZGlmZmVyZW5jZUluSVNPWWVhcnMoXG4gKiAgIG5ldyBEYXRlKDIwMTIsIDAsIDEpLFxuICogICBuZXcgRGF0ZSgyMDEwLCAwLCAxKVxuICogKVxuICogLy89PiAxXG4gKi9cbmZ1bmN0aW9uIGRpZmZlcmVuY2VJbklTT1llYXJzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgZGF0ZVJpZ2h0ID0gcGFyc2UoZGlydHlEYXRlUmlnaHQpXG5cbiAgdmFyIHNpZ24gPSBjb21wYXJlQXNjKGRhdGVMZWZ0LCBkYXRlUmlnaHQpXG4gIHZhciBkaWZmZXJlbmNlID0gTWF0aC5hYnMoZGlmZmVyZW5jZUluQ2FsZW5kYXJJU09ZZWFycyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSlcbiAgZGF0ZUxlZnQgPSBzdWJJU09ZZWFycyhkYXRlTGVmdCwgc2lnbiAqIGRpZmZlcmVuY2UpXG5cbiAgLy8gTWF0aC5hYnMoZGlmZiBpbiBmdWxsIElTTyB5ZWFycyAtIGRpZmYgaW4gY2FsZW5kYXIgSVNPIHllYXJzKSA9PT0gMVxuICAvLyBpZiBsYXN0IGNhbGVuZGFyIElTTyB5ZWFyIGlzIG5vdCBmdWxsXG4gIC8vIElmIHNvLCByZXN1bHQgbXVzdCBiZSBkZWNyZWFzZWQgYnkgMSBpbiBhYnNvbHV0ZSB2YWx1ZVxuICB2YXIgaXNMYXN0SVNPWWVhck5vdEZ1bGwgPSBjb21wYXJlQXNjKGRhdGVMZWZ0LCBkYXRlUmlnaHQpID09PSAtc2lnblxuICByZXR1cm4gc2lnbiAqIChkaWZmZXJlbmNlIC0gaXNMYXN0SVNPWWVhck5vdEZ1bGwpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZUluSVNPWWVhcnNcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTWlsbGlzZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgbWlsbGlzZWNvbmRzIGFyZSBiZXR3ZWVuXG4gKiAvLyAyIEp1bHkgMjAxNCAxMjozMDoyMC42MDAgYW5kIDIgSnVseSAyMDE0IDEyOjMwOjIxLjcwMD9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDEyLCAzMCwgMjEsIDcwMCksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDEyLCAzMCwgMjAsIDYwMClcbiAqIClcbiAqIC8vPT4gMTEwMFxuICovXG5mdW5jdGlvbiBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkYXRlTGVmdCA9IHBhcnNlKGRpcnR5RGF0ZUxlZnQpXG4gIHZhciBkYXRlUmlnaHQgPSBwYXJzZShkaXJ0eURhdGVSaWdodClcbiAgcmV0dXJuIGRhdGVMZWZ0LmdldFRpbWUoKSAtIGRhdGVSaWdodC5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHNcbiIsInZhciBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPSByZXF1aXJlKCcuLi9kaWZmZXJlbmNlX2luX21pbGxpc2Vjb25kcy9pbmRleC5qcycpXG5cbnZhciBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFID0gNjAwMDBcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTWludXRlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIG1pbnV0ZXMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBtaW51dGVzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBtaW51dGVzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IG1pbnV0ZXMgYXJlIGJldHdlZW4gMiBKdWx5IDIwMTQgMTI6MDc6NTkgYW5kIDIgSnVseSAyMDE0IDEyOjIwOjAwP1xuICogdmFyIHJlc3VsdCA9IGRpZmZlcmVuY2VJbk1pbnV0ZXMoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDEyLCAyMCwgMCksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDEyLCA3LCA1OSlcbiAqIClcbiAqIC8vPT4gMTJcbiAqL1xuZnVuY3Rpb24gZGlmZmVyZW5jZUluTWludXRlcyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRpZmYgPSBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIC8gTUlMTElTRUNPTkRTX0lOX01JTlVURVxuICByZXR1cm4gZGlmZiA+IDAgPyBNYXRoLmZsb29yKGRpZmYpIDogTWF0aC5jZWlsKGRpZmYpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZUluTWludXRlc1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxudmFyIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzID0gcmVxdWlyZSgnLi4vZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl9tb250aHMvaW5kZXguanMnKVxudmFyIGNvbXBhcmVBc2MgPSByZXF1aXJlKCcuLi9jb21wYXJlX2FzYy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGZ1bGwgbW9udGhzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgZnVsbCBtb250aHMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIGZ1bGwgbW9udGhzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGZ1bGwgbW9udGhzIGFyZSBiZXR3ZWVuIDMxIEphbnVhcnkgMjAxNCBhbmQgMSBTZXB0ZW1iZXIgMjAxND9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5Nb250aHMoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDEpLFxuICogICBuZXcgRGF0ZSgyMDE0LCAwLCAzMSlcbiAqIClcbiAqIC8vPT4gN1xuICovXG5mdW5jdGlvbiBkaWZmZXJlbmNlSW5Nb250aHMgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkYXRlTGVmdCA9IHBhcnNlKGRpcnR5RGF0ZUxlZnQpXG4gIHZhciBkYXRlUmlnaHQgPSBwYXJzZShkaXJ0eURhdGVSaWdodClcblxuICB2YXIgc2lnbiA9IGNvbXBhcmVBc2MoZGF0ZUxlZnQsIGRhdGVSaWdodClcbiAgdmFyIGRpZmZlcmVuY2UgPSBNYXRoLmFicyhkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSlcbiAgZGF0ZUxlZnQuc2V0TW9udGgoZGF0ZUxlZnQuZ2V0TW9udGgoKSAtIHNpZ24gKiBkaWZmZXJlbmNlKVxuXG4gIC8vIE1hdGguYWJzKGRpZmYgaW4gZnVsbCBtb250aHMgLSBkaWZmIGluIGNhbGVuZGFyIG1vbnRocykgPT09IDEgaWYgbGFzdCBjYWxlbmRhciBtb250aCBpcyBub3QgZnVsbFxuICAvLyBJZiBzbywgcmVzdWx0IG11c3QgYmUgZGVjcmVhc2VkIGJ5IDEgaW4gYWJzb2x1dGUgdmFsdWVcbiAgdmFyIGlzTGFzdE1vbnRoTm90RnVsbCA9IGNvbXBhcmVBc2MoZGF0ZUxlZnQsIGRhdGVSaWdodCkgPT09IC1zaWduXG4gIHJldHVybiBzaWduICogKGRpZmZlcmVuY2UgLSBpc0xhc3RNb250aE5vdEZ1bGwpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZUluTW9udGhzXG4iLCJ2YXIgZGlmZmVyZW5jZUluTW9udGhzID0gcmVxdWlyZSgnLi4vZGlmZmVyZW5jZV9pbl9tb250aHMvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBRdWFydGVyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGZ1bGwgcXVhcnRlcnMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBmdWxsIHF1YXJ0ZXJzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBmdWxsIHF1YXJ0ZXJzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGZ1bGwgcXVhcnRlcnMgYXJlIGJldHdlZW4gMzEgRGVjZW1iZXIgMjAxMyBhbmQgMiBKdWx5IDIwMTQ/XG4gKiB2YXIgcmVzdWx0ID0gZGlmZmVyZW5jZUluUXVhcnRlcnMoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIpLFxuICogICBuZXcgRGF0ZSgyMDEzLCAxMSwgMzEpXG4gKiApXG4gKiAvLz0+IDJcbiAqL1xuZnVuY3Rpb24gZGlmZmVyZW5jZUluUXVhcnRlcnMgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkaWZmID0gZGlmZmVyZW5jZUluTW9udGhzKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSAvIDNcbiAgcmV0dXJuIGRpZmYgPiAwID8gTWF0aC5mbG9vcihkaWZmKSA6IE1hdGguY2VpbChkaWZmKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZlcmVuY2VJblF1YXJ0ZXJzXG4iLCJ2YXIgZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzID0gcmVxdWlyZSgnLi4vZGlmZmVyZW5jZV9pbl9taWxsaXNlY29uZHMvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBTZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2Ygc2Vjb25kcyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIHNlY29uZHMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIHNlY29uZHNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgc2Vjb25kcyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTQgMTI6MzA6MDcuOTk5IGFuZCAyIEp1bHkgMjAxNCAxMjozMDoyMC4wMDA/XG4gKiB2YXIgcmVzdWx0ID0gZGlmZmVyZW5jZUluU2Vjb25kcyhcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgMiwgMTIsIDMwLCAyMCwgMCksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDEyLCAzMCwgNywgOTk5KVxuICogKVxuICogLy89PiAxMlxuICovXG5mdW5jdGlvbiBkaWZmZXJlbmNlSW5TZWNvbmRzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGlmZiA9IGRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyhkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkgLyAxMDAwXG4gIHJldHVybiBkaWZmID4gMCA/IE1hdGguZmxvb3IoZGlmZikgOiBNYXRoLmNlaWwoZGlmZilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5TZWNvbmRzXG4iLCJ2YXIgZGlmZmVyZW5jZUluRGF5cyA9IHJlcXVpcmUoJy4uL2RpZmZlcmVuY2VfaW5fZGF5cy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgZnVsbCB3ZWVrcyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGZ1bGwgd2Vla3MgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIGZ1bGwgd2Vla3NcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgZnVsbCB3ZWVrcyBhcmUgYmV0d2VlbiA1IEp1bHkgMjAxNCBhbmQgMjAgSnVseSAyMDE0P1xuICogdmFyIHJlc3VsdCA9IGRpZmZlcmVuY2VJbldlZWtzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyMCksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDUpXG4gKiApXG4gKiAvLz0+IDJcbiAqL1xuZnVuY3Rpb24gZGlmZmVyZW5jZUluV2Vla3MgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkaWZmID0gZGlmZmVyZW5jZUluRGF5cyhkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkgLyA3XG4gIHJldHVybiBkaWZmID4gMCA/IE1hdGguZmxvb3IoZGlmZikgOiBNYXRoLmNlaWwoZGlmZilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5XZWVrc1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxudmFyIGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMgPSByZXF1aXJlKCcuLi9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX3llYXJzL2luZGV4LmpzJylcbnZhciBjb21wYXJlQXNjID0gcmVxdWlyZSgnLi4vY29tcGFyZV9hc2MvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGZ1bGwgeWVhcnMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBmdWxsIHllYXJzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBmdWxsIHllYXJzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGZ1bGwgeWVhcnMgYXJlIGJldHdlZW4gMzEgRGVjZW1iZXIgMjAxMyBhbmQgMTEgRmVicnVhcnkgMjAxNT9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5ZZWFycyhcbiAqICAgbmV3IERhdGUoMjAxNSwgMSwgMTEpLFxuICogICBuZXcgRGF0ZSgyMDEzLCAxMSwgMzEpXG4gKiApXG4gKiAvLz0+IDFcbiAqL1xuZnVuY3Rpb24gZGlmZmVyZW5jZUluWWVhcnMgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkYXRlTGVmdCA9IHBhcnNlKGRpcnR5RGF0ZUxlZnQpXG4gIHZhciBkYXRlUmlnaHQgPSBwYXJzZShkaXJ0eURhdGVSaWdodClcblxuICB2YXIgc2lnbiA9IGNvbXBhcmVBc2MoZGF0ZUxlZnQsIGRhdGVSaWdodClcbiAgdmFyIGRpZmZlcmVuY2UgPSBNYXRoLmFicyhkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKGRhdGVMZWZ0LCBkYXRlUmlnaHQpKVxuICBkYXRlTGVmdC5zZXRGdWxsWWVhcihkYXRlTGVmdC5nZXRGdWxsWWVhcigpIC0gc2lnbiAqIGRpZmZlcmVuY2UpXG5cbiAgLy8gTWF0aC5hYnMoZGlmZiBpbiBmdWxsIHllYXJzIC0gZGlmZiBpbiBjYWxlbmRhciB5ZWFycykgPT09IDEgaWYgbGFzdCBjYWxlbmRhciB5ZWFyIGlzIG5vdCBmdWxsXG4gIC8vIElmIHNvLCByZXN1bHQgbXVzdCBiZSBkZWNyZWFzZWQgYnkgMSBpbiBhYnNvbHV0ZSB2YWx1ZVxuICB2YXIgaXNMYXN0WWVhck5vdEZ1bGwgPSBjb21wYXJlQXNjKGRhdGVMZWZ0LCBkYXRlUmlnaHQpID09PSAtc2lnblxuICByZXR1cm4gc2lnbiAqIChkaWZmZXJlbmNlIC0gaXNMYXN0WWVhck5vdEZ1bGwpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZUluWWVhcnNcbiIsInZhciBjb21wYXJlRGVzYyA9IHJlcXVpcmUoJy4uL2NvbXBhcmVfZGVzYy9pbmRleC5qcycpXG52YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG52YXIgZGlmZmVyZW5jZUluU2Vjb25kcyA9IHJlcXVpcmUoJy4uL2RpZmZlcmVuY2VfaW5fc2Vjb25kcy9pbmRleC5qcycpXG52YXIgZGlmZmVyZW5jZUluTW9udGhzID0gcmVxdWlyZSgnLi4vZGlmZmVyZW5jZV9pbl9tb250aHMvaW5kZXguanMnKVxudmFyIGVuTG9jYWxlID0gcmVxdWlyZSgnLi4vbG9jYWxlL2VuL2luZGV4LmpzJylcblxudmFyIE1JTlVURVNfSU5fREFZID0gMTQ0MFxudmFyIE1JTlVURVNfSU5fQUxNT1NUX1RXT19EQVlTID0gMjUyMFxudmFyIE1JTlVURVNfSU5fTU9OVEggPSA0MzIwMFxudmFyIE1JTlVURVNfSU5fVFdPX01PTlRIUyA9IDg2NDAwXG5cbi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzIGluIHdvcmRzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcyBpbiB3b3Jkcy5cbiAqXG4gKiB8IERpc3RhbmNlIGJldHdlZW4gZGF0ZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUmVzdWx0ICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IDAgLi4uIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbGVzcyB0aGFuIGEgbWludXRlICB8XG4gKiB8IDMwIHNlY3MgLi4uIDEgbWluIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMSBtaW51dGUgICAgICAgICAgICB8XG4gKiB8IDEgbWluIDMwIHNlY3MgLi4uIDQ0IG1pbnMgMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWzIuLjQ0XSBtaW51dGVzICAgICB8XG4gKiB8IDQ0IG1pbnMgLi4uIDMwIHNlY3MgLi4uIDg5IG1pbnMgMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWJvdXQgMSBob3VyICAgICAgICB8XG4gKiB8IDg5IG1pbnMgMzAgc2VjcyAuLi4gMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgIHwgYWJvdXQgWzIuLjI0XSBob3VycyB8XG4gKiB8IDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDQxIGhycyA1OSBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgIHwgMSBkYXkgICAgICAgICAgICAgICB8XG4gKiB8IDQxIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDI5IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAgICAgICAgIHwgWzIuLjMwXSBkYXlzICAgICAgICB8XG4gKiB8IDI5IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gNDQgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIHwgYWJvdXQgMSBtb250aCAgICAgICB8XG4gKiB8IDQ0IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gNTkgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIHwgYWJvdXQgMiBtb250aHMgICAgICB8XG4gKiB8IDU5IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gMSB5ciAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWzIuLjEyXSBtb250aHMgICAgICB8XG4gKiB8IDEgeXIgLi4uIDEgeXIgMyBtb250aHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWJvdXQgMSB5ZWFyICAgICAgICB8XG4gKiB8IDEgeXIgMyBtb250aHMgLi4uIDEgeXIgOSBtb250aCBzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgb3ZlciAxIHllYXIgICAgICAgICB8XG4gKiB8IDEgeXIgOSBtb250aHMgLi4uIDIgeXJzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWxtb3N0IDIgeWVhcnMgICAgICB8XG4gKiB8IE4geXJzIC4uLiBOIHlycyAzIG1vbnRocyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWJvdXQgTiB5ZWFycyAgICAgICB8XG4gKiB8IE4geXJzIDMgbW9udGhzIC4uLiBOIHlycyA5IG1vbnRocyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgb3ZlciBOIHllYXJzICAgICAgICB8XG4gKiB8IE4geXJzIDkgbW9udGhzIC4uLiBOKzEgeXJzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWxtb3N0IE4rMSB5ZWFycyAgICB8XG4gKlxuICogV2l0aCBgb3B0aW9ucy5pbmNsdWRlU2Vjb25kcyA9PSB0cnVlYDpcbiAqIHwgRGlzdGFuY2UgYmV0d2VlbiBkYXRlcyB8IFJlc3VsdCAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgMCBzZWNzIC4uLiA1IHNlY3MgICAgICB8IGxlc3MgdGhhbiA1IHNlY29uZHMgIHxcbiAqIHwgNSBzZWNzIC4uLiAxMCBzZWNzICAgICB8IGxlc3MgdGhhbiAxMCBzZWNvbmRzIHxcbiAqIHwgMTAgc2VjcyAuLi4gMjAgc2VjcyAgICB8IGxlc3MgdGhhbiAyMCBzZWNvbmRzIHxcbiAqIHwgMjAgc2VjcyAuLi4gNDAgc2VjcyAgICB8IGhhbGYgYSBtaW51dGUgICAgICAgIHxcbiAqIHwgNDAgc2VjcyAuLi4gNjAgc2VjcyAgICB8IGxlc3MgdGhhbiBhIG1pbnV0ZSAgIHxcbiAqIHwgNjAgc2VjcyAuLi4gOTAgc2VjcyAgICB8IDEgbWludXRlICAgICAgICAgICAgIHxcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVRvQ29tcGFyZSAtIHRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3RoZXIgZGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmluY2x1ZGVTZWNvbmRzPWZhbHNlXSAtIGRpc3RhbmNlcyBsZXNzIHRoYW4gYSBtaW51dGUgYXJlIG1vcmUgZGV0YWlsZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWRkU3VmZml4PWZhbHNlXSAtIHJlc3VsdCBpbmRpY2F0ZXMgaWYgdGhlIHNlY29uZCBkYXRlIGlzIGVhcmxpZXIgb3IgbGF0ZXIgdGhhbiB0aGUgZmlyc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5sb2NhbGU9ZW5Mb2NhbGVdIC0gdGhlIGxvY2FsZSBvYmplY3RcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBkaXN0YW5jZSBpbiB3b3Jkc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIDIgSnVseSAyMDE0IGFuZCAxIEphbnVhcnkgMjAxNT9cbiAqIHZhciByZXN1bHQgPSBkaXN0YW5jZUluV29yZHMoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIpLFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxKVxuICogKVxuICogLy89PiAnNiBtb250aHMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gMSBKYW51YXJ5IDIwMTUgMDA6MDA6MTVcbiAqIC8vIGFuZCAxIEphbnVhcnkgMjAxNSAwMDowMDowMCwgaW5jbHVkaW5nIHNlY29uZHM/XG4gKiB2YXIgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzKFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxLCAwLCAwLCAxNSksXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEsIDAsIDAsIDApLFxuICogICB7aW5jbHVkZVNlY29uZHM6IHRydWV9XG4gKiApXG4gKiAvLz0+ICdsZXNzIHRoYW4gMjAgc2Vjb25kcydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgZnJvbSAxIEphbnVhcnkgMjAxNlxuICogLy8gdG8gMSBKYW51YXJ5IDIwMTUsIHdpdGggYSBzdWZmaXg/XG4gKiB2YXIgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzKFxuICogICBuZXcgRGF0ZSgyMDE2LCAwLCAxKSxcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSksXG4gKiAgIHthZGRTdWZmaXg6IHRydWV9XG4gKiApXG4gKiAvLz0+ICdhYm91dCAxIHllYXIgYWdvJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIDEgQXVndXN0IDIwMTYgYW5kIDEgSmFudWFyeSAyMDE1IGluIEVzcGVyYW50bz9cbiAqIHZhciBlb0xvY2FsZSA9IHJlcXVpcmUoJ2RhdGUtZm5zL2xvY2FsZS9lbycpXG4gKiB2YXIgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzKFxuICogICBuZXcgRGF0ZSgyMDE2LCA3LCAxKSxcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSksXG4gKiAgIHtsb2NhbGU6IGVvTG9jYWxlfVxuICogKVxuICogLy89PiAncGxpIG9sIDEgamFybydcbiAqL1xuZnVuY3Rpb24gZGlzdGFuY2VJbldvcmRzIChkaXJ0eURhdGVUb0NvbXBhcmUsIGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKSB7XG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9XG5cbiAgdmFyIGNvbXBhcmlzb24gPSBjb21wYXJlRGVzYyhkaXJ0eURhdGVUb0NvbXBhcmUsIGRpcnR5RGF0ZSlcblxuICB2YXIgbG9jYWxlID0gb3B0aW9ucy5sb2NhbGVcbiAgdmFyIGxvY2FsaXplID0gZW5Mb2NhbGUuZGlzdGFuY2VJbldvcmRzLmxvY2FsaXplXG4gIGlmIChsb2NhbGUgJiYgbG9jYWxlLmRpc3RhbmNlSW5Xb3JkcyAmJiBsb2NhbGUuZGlzdGFuY2VJbldvcmRzLmxvY2FsaXplKSB7XG4gICAgbG9jYWxpemUgPSBsb2NhbGUuZGlzdGFuY2VJbldvcmRzLmxvY2FsaXplXG4gIH1cblxuICB2YXIgbG9jYWxpemVPcHRpb25zID0ge1xuICAgIGFkZFN1ZmZpeDogQm9vbGVhbihvcHRpb25zLmFkZFN1ZmZpeCksXG4gICAgY29tcGFyaXNvbjogY29tcGFyaXNvblxuICB9XG5cbiAgdmFyIGRhdGVMZWZ0LCBkYXRlUmlnaHRcbiAgaWYgKGNvbXBhcmlzb24gPiAwKSB7XG4gICAgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVUb0NvbXBhcmUpXG4gICAgZGF0ZVJpZ2h0ID0gcGFyc2UoZGlydHlEYXRlKVxuICB9IGVsc2Uge1xuICAgIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlEYXRlKVxuICAgIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5RGF0ZVRvQ29tcGFyZSlcbiAgfVxuXG4gIHZhciBzZWNvbmRzID0gZGlmZmVyZW5jZUluU2Vjb25kcyhkYXRlUmlnaHQsIGRhdGVMZWZ0KVxuICB2YXIgb2Zmc2V0ID0gZGF0ZVJpZ2h0LmdldFRpbWV6b25lT2Zmc2V0KCkgLSBkYXRlTGVmdC5nZXRUaW1lem9uZU9mZnNldCgpXG4gIHZhciBtaW51dGVzID0gTWF0aC5yb3VuZChzZWNvbmRzIC8gNjApIC0gb2Zmc2V0XG4gIHZhciBtb250aHNcblxuICAvLyAwIHVwIHRvIDIgbWluc1xuICBpZiAobWludXRlcyA8IDIpIHtcbiAgICBpZiAob3B0aW9ucy5pbmNsdWRlU2Vjb25kcykge1xuICAgICAgaWYgKHNlY29uZHMgPCA1KSB7XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZSgnbGVzc1RoYW5YU2Vjb25kcycsIDUsIGxvY2FsaXplT3B0aW9ucylcbiAgICAgIH0gZWxzZSBpZiAoc2Vjb25kcyA8IDEwKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZSgnbGVzc1RoYW5YU2Vjb25kcycsIDEwLCBsb2NhbGl6ZU9wdGlvbnMpXG4gICAgICB9IGVsc2UgaWYgKHNlY29uZHMgPCAyMCkge1xuICAgICAgICByZXR1cm4gbG9jYWxpemUoJ2xlc3NUaGFuWFNlY29uZHMnLCAyMCwgbG9jYWxpemVPcHRpb25zKVxuICAgICAgfSBlbHNlIGlmIChzZWNvbmRzIDwgNDApIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplKCdoYWxmQU1pbnV0ZScsIG51bGwsIGxvY2FsaXplT3B0aW9ucylcbiAgICAgIH0gZWxzZSBpZiAoc2Vjb25kcyA8IDYwKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZSgnbGVzc1RoYW5YTWludXRlcycsIDEsIGxvY2FsaXplT3B0aW9ucylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZSgneE1pbnV0ZXMnLCAxLCBsb2NhbGl6ZU9wdGlvbnMpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtaW51dGVzID09PSAwKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZSgnbGVzc1RoYW5YTWludXRlcycsIDEsIGxvY2FsaXplT3B0aW9ucylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZSgneE1pbnV0ZXMnLCBtaW51dGVzLCBsb2NhbGl6ZU9wdGlvbnMpXG4gICAgICB9XG4gICAgfVxuXG4gIC8vIDIgbWlucyB1cCB0byAwLjc1IGhyc1xuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCA0NSkge1xuICAgIHJldHVybiBsb2NhbGl6ZSgneE1pbnV0ZXMnLCBtaW51dGVzLCBsb2NhbGl6ZU9wdGlvbnMpXG5cbiAgLy8gMC43NSBocnMgdXAgdG8gMS41IGhyc1xuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCA5MCkge1xuICAgIHJldHVybiBsb2NhbGl6ZSgnYWJvdXRYSG91cnMnLCAxLCBsb2NhbGl6ZU9wdGlvbnMpXG5cbiAgLy8gMS41IGhycyB1cCB0byAyNCBocnNcbiAgfSBlbHNlIGlmIChtaW51dGVzIDwgTUlOVVRFU19JTl9EQVkpIHtcbiAgICB2YXIgaG91cnMgPSBNYXRoLnJvdW5kKG1pbnV0ZXMgLyA2MClcbiAgICByZXR1cm4gbG9jYWxpemUoJ2Fib3V0WEhvdXJzJywgaG91cnMsIGxvY2FsaXplT3B0aW9ucylcblxuICAvLyAxIGRheSB1cCB0byAxLjc1IGRheXNcbiAgfSBlbHNlIGlmIChtaW51dGVzIDwgTUlOVVRFU19JTl9BTE1PU1RfVFdPX0RBWVMpIHtcbiAgICByZXR1cm4gbG9jYWxpemUoJ3hEYXlzJywgMSwgbG9jYWxpemVPcHRpb25zKVxuXG4gIC8vIDEuNzUgZGF5cyB1cCB0byAzMCBkYXlzXG4gIH0gZWxzZSBpZiAobWludXRlcyA8IE1JTlVURVNfSU5fTU9OVEgpIHtcbiAgICB2YXIgZGF5cyA9IE1hdGgucm91bmQobWludXRlcyAvIE1JTlVURVNfSU5fREFZKVxuICAgIHJldHVybiBsb2NhbGl6ZSgneERheXMnLCBkYXlzLCBsb2NhbGl6ZU9wdGlvbnMpXG5cbiAgLy8gMSBtb250aCB1cCB0byAyIG1vbnRoc1xuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBNSU5VVEVTX0lOX1RXT19NT05USFMpIHtcbiAgICBtb250aHMgPSBNYXRoLnJvdW5kKG1pbnV0ZXMgLyBNSU5VVEVTX0lOX01PTlRIKVxuICAgIHJldHVybiBsb2NhbGl6ZSgnYWJvdXRYTW9udGhzJywgbW9udGhzLCBsb2NhbGl6ZU9wdGlvbnMpXG4gIH1cblxuICBtb250aHMgPSBkaWZmZXJlbmNlSW5Nb250aHMoZGF0ZVJpZ2h0LCBkYXRlTGVmdClcblxuICAvLyAyIG1vbnRocyB1cCB0byAxMiBtb250aHNcbiAgaWYgKG1vbnRocyA8IDEyKSB7XG4gICAgdmFyIG5lYXJlc3RNb250aCA9IE1hdGgucm91bmQobWludXRlcyAvIE1JTlVURVNfSU5fTU9OVEgpXG4gICAgcmV0dXJuIGxvY2FsaXplKCd4TW9udGhzJywgbmVhcmVzdE1vbnRoLCBsb2NhbGl6ZU9wdGlvbnMpXG5cbiAgLy8gMSB5ZWFyIHVwIHRvIG1heCBEYXRlXG4gIH0gZWxzZSB7XG4gICAgdmFyIG1vbnRoc1NpbmNlU3RhcnRPZlllYXIgPSBtb250aHMgJSAxMlxuICAgIHZhciB5ZWFycyA9IE1hdGguZmxvb3IobW9udGhzIC8gMTIpXG5cbiAgICAvLyBOIHllYXJzIHVwIHRvIDEgeWVhcnMgMyBtb250aHNcbiAgICBpZiAobW9udGhzU2luY2VTdGFydE9mWWVhciA8IDMpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZSgnYWJvdXRYWWVhcnMnLCB5ZWFycywgbG9jYWxpemVPcHRpb25zKVxuXG4gICAgLy8gTiB5ZWFycyAzIG1vbnRocyB1cCB0byBOIHllYXJzIDkgbW9udGhzXG4gICAgfSBlbHNlIGlmIChtb250aHNTaW5jZVN0YXJ0T2ZZZWFyIDwgOSkge1xuICAgICAgcmV0dXJuIGxvY2FsaXplKCdvdmVyWFllYXJzJywgeWVhcnMsIGxvY2FsaXplT3B0aW9ucylcblxuICAgIC8vIE4geWVhcnMgOSBtb250aHMgdXAgdG8gTiB5ZWFyIDEyIG1vbnRoc1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUoJ2FsbW9zdFhZZWFycycsIHllYXJzICsgMSwgbG9jYWxpemVPcHRpb25zKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3RhbmNlSW5Xb3Jkc1xuIiwidmFyIGNvbXBhcmVEZXNjID0gcmVxdWlyZSgnLi4vY29tcGFyZV9kZXNjL2luZGV4LmpzJylcbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBkaWZmZXJlbmNlSW5TZWNvbmRzID0gcmVxdWlyZSgnLi4vZGlmZmVyZW5jZV9pbl9zZWNvbmRzL2luZGV4LmpzJylcbnZhciBlbkxvY2FsZSA9IHJlcXVpcmUoJy4uL2xvY2FsZS9lbi9pbmRleC5qcycpXG5cbnZhciBNSU5VVEVTX0lOX0RBWSA9IDE0NDBcbnZhciBNSU5VVEVTX0lOX01PTlRIID0gNDMyMDBcbnZhciBNSU5VVEVTX0lOX1lFQVIgPSA1MjU2MDBcblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMgaW4gd29yZHMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzIGluIHdvcmRzLCB1c2luZyBzdHJpY3QgdW5pdHMuXG4gKiBUaGlzIGlzIGxpa2UgYGRpc3RhbmNlSW5Xb3Jkc2AsIGJ1dCBkb2VzIG5vdCB1c2UgaGVscGVycyBsaWtlICdhbG1vc3QnLCAnb3ZlcicsXG4gKiAnbGVzcyB0aGFuJyBhbmQgdGhlIGxpa2UuXG4gKlxuICogfCBEaXN0YW5jZSBiZXR3ZWVuIGRhdGVzIHwgUmVzdWx0ICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgMCAuLi4gNTkgc2VjcyAgICAgICAgICB8IFswLi41OV0gc2Vjb25kcyAgICAgfFxuICogfCAxIC4uLiA1OSBtaW5zICAgICAgICAgIHwgWzEuLjU5XSBtaW51dGVzICAgICB8XG4gKiB8IDEgLi4uIDIzIGhycyAgICAgICAgICAgfCBbMS4uMjNdIGhvdXJzICAgICAgIHxcbiAqIHwgMSAuLi4gMjkgZGF5cyAgICAgICAgICB8IFsxLi4yOV0gZGF5cyAgICAgICAgfFxuICogfCAxIC4uLiAxMSBtb250aHMgICAgICAgIHwgWzEuLjExXSBtb250aHMgICAgICB8XG4gKiB8IDEgLi4uIE4geWVhcnMgICAgICAgICAgfCBbMS4uTl0gIHllYXJzICAgICAgIHxcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVRvQ29tcGFyZSAtIHRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3RoZXIgZGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFkZFN1ZmZpeD1mYWxzZV0gLSByZXN1bHQgaW5kaWNhdGVzIGlmIHRoZSBzZWNvbmQgZGF0ZSBpcyBlYXJsaWVyIG9yIGxhdGVyIHRoYW4gdGhlIGZpcnN0XG4gKiBAcGFyYW0geydzJ3wnbSd8J2gnfCdkJ3wnTSd8J1knfSBbb3B0aW9ucy51bml0XSAtIGlmIHNwZWNpZmllZCwgd2lsbCBmb3JjZSBhIHVuaXRcbiAqIEBwYXJhbSB7J2Zsb29yJ3wnY2VpbCd8J3JvdW5kJ30gW29wdGlvbnMucGFydGlhbE1ldGhvZD0nZmxvb3InXSAtIHdoaWNoIHdheSB0byByb3VuZCBwYXJ0aWFsIHVuaXRzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMubG9jYWxlPWVuTG9jYWxlXSAtIHRoZSBsb2NhbGUgb2JqZWN0XG4gKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgZGlzdGFuY2UgaW4gd29yZHNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAyIEp1bHkgMjAxNCBhbmQgMSBKYW51YXJ5IDIwMTU/XG4gKiB2YXIgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzU3RyaWN0KFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyKSxcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMilcbiAqIClcbiAqIC8vPT4gJzYgbW9udGhzJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIDEgSmFudWFyeSAyMDE1IDAwOjAwOjE1XG4gKiAvLyBhbmQgMSBKYW51YXJ5IDIwMTUgMDA6MDA6MDA/XG4gKiB2YXIgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzU3RyaWN0KFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxLCAwLCAwLCAxNSksXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEsIDAsIDAsIDApLFxuICogKVxuICogLy89PiAnMTUgc2Vjb25kcydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgZnJvbSAxIEphbnVhcnkgMjAxNlxuICogLy8gdG8gMSBKYW51YXJ5IDIwMTUsIHdpdGggYSBzdWZmaXg/XG4gKiB2YXIgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzU3RyaWN0KFxuICogICBuZXcgRGF0ZSgyMDE2LCAwLCAxKSxcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSksXG4gKiAgIHthZGRTdWZmaXg6IHRydWV9XG4gKiApXG4gKiAvLz0+ICcxIHllYXIgYWdvJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBmcm9tIDEgSmFudWFyeSAyMDE2XG4gKiAvLyB0byAxIEphbnVhcnkgMjAxNSwgaW4gbWludXRlcz9cbiAqIHZhciByZXN1bHQgPSBkaXN0YW5jZUluV29yZHNTdHJpY3QoXG4gKiAgIG5ldyBEYXRlKDIwMTYsIDAsIDEpLFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxKSxcbiAqICAge3VuaXQ6ICdtJ31cbiAqIClcbiAqIC8vPT4gJzUyNTYwMCBtaW51dGVzJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBmcm9tIDEgSmFudWFyeSAyMDE2XG4gKiAvLyB0byAyOCBKYW51YXJ5IDIwMTUsIGluIG1vbnRocywgcm91bmRlZCB1cD9cbiAqIHZhciByZXN1bHQgPSBkaXN0YW5jZUluV29yZHNTdHJpY3QoXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDI4KSxcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSksXG4gKiAgIHt1bml0OiAnTScsIHBhcnRpYWxNZXRob2Q6ICdjZWlsJ31cbiAqIClcbiAqIC8vPT4gJzEgbW9udGgnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gMSBBdWd1c3QgMjAxNiBhbmQgMSBKYW51YXJ5IDIwMTUgaW4gRXNwZXJhbnRvP1xuICogdmFyIGVvTG9jYWxlID0gcmVxdWlyZSgnZGF0ZS1mbnMvbG9jYWxlL2VvJylcbiAqIHZhciByZXN1bHQgPSBkaXN0YW5jZUluV29yZHNTdHJpY3QoXG4gKiAgIG5ldyBEYXRlKDIwMTYsIDcsIDEpLFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxKSxcbiAqICAge2xvY2FsZTogZW9Mb2NhbGV9XG4gKiApXG4gKiAvLz0+ICcxIGphcm8nXG4gKi9cbmZ1bmN0aW9uIGRpc3RhbmNlSW5Xb3Jkc1N0cmljdCAoZGlydHlEYXRlVG9Db21wYXJlLCBkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucykge1xuICB2YXIgb3B0aW9ucyA9IGRpcnR5T3B0aW9ucyB8fCB7fVxuXG4gIHZhciBjb21wYXJpc29uID0gY29tcGFyZURlc2MoZGlydHlEYXRlVG9Db21wYXJlLCBkaXJ0eURhdGUpXG5cbiAgdmFyIGxvY2FsZSA9IG9wdGlvbnMubG9jYWxlXG4gIHZhciBsb2NhbGl6ZSA9IGVuTG9jYWxlLmRpc3RhbmNlSW5Xb3Jkcy5sb2NhbGl6ZVxuICBpZiAobG9jYWxlICYmIGxvY2FsZS5kaXN0YW5jZUluV29yZHMgJiYgbG9jYWxlLmRpc3RhbmNlSW5Xb3Jkcy5sb2NhbGl6ZSkge1xuICAgIGxvY2FsaXplID0gbG9jYWxlLmRpc3RhbmNlSW5Xb3Jkcy5sb2NhbGl6ZVxuICB9XG5cbiAgdmFyIGxvY2FsaXplT3B0aW9ucyA9IHtcbiAgICBhZGRTdWZmaXg6IEJvb2xlYW4ob3B0aW9ucy5hZGRTdWZmaXgpLFxuICAgIGNvbXBhcmlzb246IGNvbXBhcmlzb25cbiAgfVxuXG4gIHZhciBkYXRlTGVmdCwgZGF0ZVJpZ2h0XG4gIGlmIChjb21wYXJpc29uID4gMCkge1xuICAgIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlEYXRlVG9Db21wYXJlKVxuICAgIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgfSBlbHNlIHtcbiAgICBkYXRlTGVmdCA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgICBkYXRlUmlnaHQgPSBwYXJzZShkaXJ0eURhdGVUb0NvbXBhcmUpXG4gIH1cblxuICB2YXIgdW5pdFxuICB2YXIgbWF0aFBhcnRpYWwgPSBNYXRoW29wdGlvbnMucGFydGlhbE1ldGhvZCA/IFN0cmluZyhvcHRpb25zLnBhcnRpYWxNZXRob2QpIDogJ2Zsb29yJ11cbiAgdmFyIHNlY29uZHMgPSBkaWZmZXJlbmNlSW5TZWNvbmRzKGRhdGVSaWdodCwgZGF0ZUxlZnQpXG4gIHZhciBvZmZzZXQgPSBkYXRlUmlnaHQuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIGRhdGVMZWZ0LmdldFRpbWV6b25lT2Zmc2V0KClcbiAgdmFyIG1pbnV0ZXMgPSBtYXRoUGFydGlhbChzZWNvbmRzIC8gNjApIC0gb2Zmc2V0XG4gIHZhciBob3VycywgZGF5cywgbW9udGhzLCB5ZWFyc1xuXG4gIGlmIChvcHRpb25zLnVuaXQpIHtcbiAgICB1bml0ID0gU3RyaW5nKG9wdGlvbnMudW5pdClcbiAgfSBlbHNlIHtcbiAgICBpZiAobWludXRlcyA8IDEpIHtcbiAgICAgIHVuaXQgPSAncydcbiAgICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCA2MCkge1xuICAgICAgdW5pdCA9ICdtJ1xuICAgIH0gZWxzZSBpZiAobWludXRlcyA8IE1JTlVURVNfSU5fREFZKSB7XG4gICAgICB1bml0ID0gJ2gnXG4gICAgfSBlbHNlIGlmIChtaW51dGVzIDwgTUlOVVRFU19JTl9NT05USCkge1xuICAgICAgdW5pdCA9ICdkJ1xuICAgIH0gZWxzZSBpZiAobWludXRlcyA8IE1JTlVURVNfSU5fWUVBUikge1xuICAgICAgdW5pdCA9ICdNJ1xuICAgIH0gZWxzZSB7XG4gICAgICB1bml0ID0gJ1knXG4gICAgfVxuICB9XG5cbiAgLy8gMCB1cCB0byA2MCBzZWNvbmRzXG4gIGlmICh1bml0ID09PSAncycpIHtcbiAgICByZXR1cm4gbG9jYWxpemUoJ3hTZWNvbmRzJywgc2Vjb25kcywgbG9jYWxpemVPcHRpb25zKVxuXG4gIC8vIDEgdXAgdG8gNjAgbWluc1xuICB9IGVsc2UgaWYgKHVuaXQgPT09ICdtJykge1xuICAgIHJldHVybiBsb2NhbGl6ZSgneE1pbnV0ZXMnLCBtaW51dGVzLCBsb2NhbGl6ZU9wdGlvbnMpXG5cbiAgLy8gMSB1cCB0byAyNCBob3Vyc1xuICB9IGVsc2UgaWYgKHVuaXQgPT09ICdoJykge1xuICAgIGhvdXJzID0gbWF0aFBhcnRpYWwobWludXRlcyAvIDYwKVxuICAgIHJldHVybiBsb2NhbGl6ZSgneEhvdXJzJywgaG91cnMsIGxvY2FsaXplT3B0aW9ucylcblxuICAvLyAxIHVwIHRvIDMwIGRheXNcbiAgfSBlbHNlIGlmICh1bml0ID09PSAnZCcpIHtcbiAgICBkYXlzID0gbWF0aFBhcnRpYWwobWludXRlcyAvIE1JTlVURVNfSU5fREFZKVxuICAgIHJldHVybiBsb2NhbGl6ZSgneERheXMnLCBkYXlzLCBsb2NhbGl6ZU9wdGlvbnMpXG5cbiAgLy8gMSB1cCB0byAxMiBtb250aHNcbiAgfSBlbHNlIGlmICh1bml0ID09PSAnTScpIHtcbiAgICBtb250aHMgPSBtYXRoUGFydGlhbChtaW51dGVzIC8gTUlOVVRFU19JTl9NT05USClcbiAgICByZXR1cm4gbG9jYWxpemUoJ3hNb250aHMnLCBtb250aHMsIGxvY2FsaXplT3B0aW9ucylcblxuICAvLyAxIHllYXIgdXAgdG8gbWF4IERhdGVcbiAgfSBlbHNlIGlmICh1bml0ID09PSAnWScpIHtcbiAgICB5ZWFycyA9IG1hdGhQYXJ0aWFsKG1pbnV0ZXMgLyBNSU5VVEVTX0lOX1lFQVIpXG4gICAgcmV0dXJuIGxvY2FsaXplKCd4WWVhcnMnLCB5ZWFycywgbG9jYWxpemVPcHRpb25zKVxuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHVuaXQ6ICcgKyB1bml0KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3RhbmNlSW5Xb3Jkc1N0cmljdFxuIiwidmFyIGRpc3RhbmNlSW5Xb3JkcyA9IHJlcXVpcmUoJy4uL2Rpc3RhbmNlX2luX3dvcmRzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZSBhbmQgbm93IGluIHdvcmRzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlIGFuZCBub3cgaW4gd29yZHMuXG4gKlxuICogfCBEaXN0YW5jZSB0byBub3cgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJlc3VsdCAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAwIC4uLiAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGxlc3MgdGhhbiBhIG1pbnV0ZSAgfFxuICogfCAzMCBzZWNzIC4uLiAxIG1pbiAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDEgbWludXRlICAgICAgICAgICAgfFxuICogfCAxIG1pbiAzMCBzZWNzIC4uLiA0NCBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFsyLi40NF0gbWludXRlcyAgICAgfFxuICogfCA0NCBtaW5zIC4uLiAzMCBzZWNzIC4uLiA4OSBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IDEgaG91ciAgICAgICAgfFxuICogfCA4OSBtaW5zIDMwIHNlY3MgLi4uIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IFsyLi4yNF0gaG91cnMgfFxuICogfCAyMyBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiA0MSBocnMgNTkgbWlucyAzMCBzZWNzICAgICAgICAgICAgICAgICB8IDEgZGF5ICAgICAgICAgICAgICAgfFxuICogfCA0MSBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiAyOSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgICAgICAgICB8IFsyLi4zMF0gZGF5cyAgICAgICAgfFxuICogfCAyOSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDQ0IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyB8IGFib3V0IDEgbW9udGggICAgICAgfFxuICogfCA0NCBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDU5IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyB8IGFib3V0IDIgbW9udGhzICAgICAgfFxuICogfCA1OSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDEgeXIgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFsyLi4xMl0gbW9udGhzICAgICAgfFxuICogfCAxIHlyIC4uLiAxIHlyIDMgbW9udGhzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IDEgeWVhciAgICAgICAgfFxuICogfCAxIHlyIDMgbW9udGhzIC4uLiAxIHlyIDkgbW9udGggcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG92ZXIgMSB5ZWFyICAgICAgICAgfFxuICogfCAxIHlyIDkgbW9udGhzIC4uLiAyIHlycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFsbW9zdCAyIHllYXJzICAgICAgfFxuICogfCBOIHlycyAuLi4gTiB5cnMgMyBtb250aHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IE4geWVhcnMgICAgICAgfFxuICogfCBOIHlycyAzIG1vbnRocyAuLi4gTiB5cnMgOSBtb250aHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG92ZXIgTiB5ZWFycyAgICAgICAgfFxuICogfCBOIHlycyA5IG1vbnRocyAuLi4gTisxIHlycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFsbW9zdCBOKzEgeWVhcnMgICAgfFxuICpcbiAqIFdpdGggYG9wdGlvbnMuaW5jbHVkZVNlY29uZHMgPT0gdHJ1ZWA6XG4gKiB8IERpc3RhbmNlIHRvIG5vdyAgICAgfCBSZXN1bHQgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IDAgc2VjcyAuLi4gNSBzZWNzICAgfCBsZXNzIHRoYW4gNSBzZWNvbmRzICB8XG4gKiB8IDUgc2VjcyAuLi4gMTAgc2VjcyAgfCBsZXNzIHRoYW4gMTAgc2Vjb25kcyB8XG4gKiB8IDEwIHNlY3MgLi4uIDIwIHNlY3MgfCBsZXNzIHRoYW4gMjAgc2Vjb25kcyB8XG4gKiB8IDIwIHNlY3MgLi4uIDQwIHNlY3MgfCBoYWxmIGEgbWludXRlICAgICAgICB8XG4gKiB8IDQwIHNlY3MgLi4uIDYwIHNlY3MgfCBsZXNzIHRoYW4gYSBtaW51dGUgICB8XG4gKiB8IDYwIHNlY3MgLi4uIDkwIHNlY3MgfCAxIG1pbnV0ZSAgICAgICAgICAgICB8XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZ2l2ZW4gZGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmluY2x1ZGVTZWNvbmRzPWZhbHNlXSAtIGRpc3RhbmNlcyBsZXNzIHRoYW4gYSBtaW51dGUgYXJlIG1vcmUgZGV0YWlsZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWRkU3VmZml4PWZhbHNlXSAtIHJlc3VsdCBzcGVjaWZpZXMgaWYgdGhlIHNlY29uZCBkYXRlIGlzIGVhcmxpZXIgb3IgbGF0ZXIgdGhhbiB0aGUgZmlyc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5sb2NhbGU9ZW5Mb2NhbGVdIC0gdGhlIGxvY2FsZSBvYmplY3RcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBkaXN0YW5jZSBpbiB3b3Jkc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAxIEphbnVhcnkgMjAxNSwgd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMiBKdWx5IDIwMTQ/XG4gKiB2YXIgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzVG9Ob3coXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIpXG4gKiApXG4gKiAvLz0+ICc2IG1vbnRocydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgbm93IGlzIDEgSmFudWFyeSAyMDE1IDAwOjAwOjAwLFxuICogLy8gd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMSBKYW51YXJ5IDIwMTUgMDA6MDA6MTUsIGluY2x1ZGluZyBzZWNvbmRzP1xuICogdmFyIHJlc3VsdCA9IGRpc3RhbmNlSW5Xb3Jkc1RvTm93KFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxLCAwLCAwLCAxNSksXG4gKiAgIHtpbmNsdWRlU2Vjb25kczogdHJ1ZX1cbiAqIClcbiAqIC8vPT4gJ2xlc3MgdGhhbiAyMCBzZWNvbmRzJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAxIEphbnVhcnkgMjAxNSxcbiAqIC8vIHdoYXQgaXMgdGhlIGRpc3RhbmNlIHRvIDEgSmFudWFyeSAyMDE2LCB3aXRoIGEgc3VmZml4P1xuICogdmFyIHJlc3VsdCA9IGRpc3RhbmNlSW5Xb3Jkc1RvTm93KFxuICogICBuZXcgRGF0ZSgyMDE2LCAwLCAxKSxcbiAqICAge2FkZFN1ZmZpeDogdHJ1ZX1cbiAqIClcbiAqIC8vPT4gJ2luIGFib3V0IDEgeWVhcidcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMSBKYW51YXJ5IDIwMTUsXG4gKiAvLyB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAxIEF1Z3VzdCAyMDE2IGluIEVzcGVyYW50bz9cbiAqIHZhciBlb0xvY2FsZSA9IHJlcXVpcmUoJ2RhdGUtZm5zL2xvY2FsZS9lbycpXG4gKiB2YXIgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzVG9Ob3coXG4gKiAgIG5ldyBEYXRlKDIwMTYsIDcsIDEpLFxuICogICB7bG9jYWxlOiBlb0xvY2FsZX1cbiAqIClcbiAqIC8vPT4gJ3BsaSBvbCAxIGphcm8nXG4gKi9cbmZ1bmN0aW9uIGRpc3RhbmNlSW5Xb3Jkc1RvTm93IChkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucykge1xuICByZXR1cm4gZGlzdGFuY2VJbldvcmRzKERhdGUubm93KCksIGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3RhbmNlSW5Xb3Jkc1RvTm93XG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGFycmF5IG9mIGRhdGVzIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBhcnJheSBvZiBkYXRlcyB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gc3RhcnREYXRlIC0gdGhlIGZpcnN0IGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBlbmREYXRlIC0gdGhlIGxhc3QgZGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzdGVwPTFdIC0gdGhlIHN0ZXAgYmV0d2VlbiBlYWNoIGRheVxuICogQHJldHVybnMge0RhdGVbXX0gdGhlIGFycmF5IHdpdGggc3RhcnRzIG9mIGRheXMgZnJvbSB0aGUgZGF5IG9mIHN0YXJ0RGF0ZSB0byB0aGUgZGF5IG9mIGVuZERhdGVcbiAqIEB0aHJvd3Mge0Vycm9yfSBzdGFydERhdGUgY2Fubm90IGJlIGFmdGVyIGVuZERhdGVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRWFjaCBkYXkgYmV0d2VlbiA2IE9jdG9iZXIgMjAxNCBhbmQgMTAgT2N0b2JlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IGVhY2hEYXkoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDksIDYpLFxuICogICBuZXcgRGF0ZSgyMDE0LCA5LCAxMClcbiAqIClcbiAqIC8vPT4gW1xuICogLy8gICBNb24gT2N0IDA2IDIwMTQgMDA6MDA6MDAsXG4gKiAvLyAgIFR1ZSBPY3QgMDcgMjAxNCAwMDowMDowMCxcbiAqIC8vICAgV2VkIE9jdCAwOCAyMDE0IDAwOjAwOjAwLFxuICogLy8gICBUaHUgT2N0IDA5IDIwMTQgMDA6MDA6MDAsXG4gKiAvLyAgIEZyaSBPY3QgMTAgMjAxNCAwMDowMDowMFxuICogLy8gXVxuICovXG5mdW5jdGlvbiBlYWNoRGF5IChkaXJ0eVN0YXJ0RGF0ZSwgZGlydHlFbmREYXRlLCBkaXJ0eVN0ZXApIHtcbiAgdmFyIHN0YXJ0RGF0ZSA9IHBhcnNlKGRpcnR5U3RhcnREYXRlKVxuICB2YXIgZW5kRGF0ZSA9IHBhcnNlKGRpcnR5RW5kRGF0ZSlcbiAgdmFyIHN0ZXAgPSBkaXJ0eVN0ZXAgIT09IHVuZGVmaW5lZCA/IGRpcnR5U3RlcCA6IDFcblxuICB2YXIgZW5kVGltZSA9IGVuZERhdGUuZ2V0VGltZSgpXG5cbiAgaWYgKHN0YXJ0RGF0ZS5nZXRUaW1lKCkgPiBlbmRUaW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZmlyc3QgZGF0ZSBjYW5ub3QgYmUgYWZ0ZXIgdGhlIHNlY29uZCBkYXRlJylcbiAgfVxuXG4gIHZhciBkYXRlcyA9IFtdXG5cbiAgdmFyIGN1cnJlbnREYXRlID0gc3RhcnREYXRlXG4gIGN1cnJlbnREYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApXG5cbiAgd2hpbGUgKGN1cnJlbnREYXRlLmdldFRpbWUoKSA8PSBlbmRUaW1lKSB7XG4gICAgZGF0ZXMucHVzaChwYXJzZShjdXJyZW50RGF0ZSkpXG4gICAgY3VycmVudERhdGUuc2V0RGF0ZShjdXJyZW50RGF0ZS5nZXREYXRlKCkgKyBzdGVwKVxuICB9XG5cbiAgcmV0dXJuIGRhdGVzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZWFjaERheVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBlbmQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVuZCBvZiBhIGRheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGEgZGF5IGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogdmFyIHJlc3VsdCA9IGVuZE9mRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFR1ZSBTZXAgMDIgMjAxNCAyMzo1OTo1OS45OTlcbiAqL1xuZnVuY3Rpb24gZW5kT2ZEYXkgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgZGF0ZS5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW5kT2ZEYXlcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSG91ciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGVuZCBvZiBhbiBob3VyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGFuIGhvdXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVuZCBvZiBhbiBob3VyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBlbmQgb2YgYW4gaG91ciBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBlbmRPZkhvdXIobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1KSlcbiAqIC8vPT4gVHVlIFNlcCAwMiAyMDE0IDExOjU5OjU5Ljk5OVxuICovXG5mdW5jdGlvbiBlbmRPZkhvdXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgZGF0ZS5zZXRNaW51dGVzKDU5LCA1OSwgOTk5KVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuZE9mSG91clxuIiwidmFyIGVuZE9mV2VlayA9IHJlcXVpcmUoJy4uL2VuZF9vZl93ZWVrL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgYW4gSVNPIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBlbmQgb2YgYW4gSVNPIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBlbmQgb2YgYW4gSVNPIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIGVuZCBvZiBhbiBJU08gd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBlbmRPZklTT1dlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gU3VuIFNlcCAwNyAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5mdW5jdGlvbiBlbmRPZklTT1dlZWsgKGRpcnR5RGF0ZSkge1xuICByZXR1cm4gZW5kT2ZXZWVrKGRpcnR5RGF0ZSwge3dlZWtTdGFydHNPbjogMX0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW5kT2ZJU09XZWVrXG4iLCJ2YXIgZ2V0SVNPWWVhciA9IHJlcXVpcmUoJy4uL2dldF9pc29feWVhci9pbmRleC5qcycpXG52YXIgc3RhcnRPZklTT1dlZWsgPSByZXF1aXJlKCcuLi9zdGFydF9vZl9pc29fd2Vlay9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IElTTyBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyLFxuICogd2hpY2ggYWx3YXlzIHN0YXJ0cyAzIGRheXMgYmVmb3JlIHRoZSB5ZWFyJ3MgZmlyc3QgVGh1cnNkYXkuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVuZCBvZiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciAyIEp1bHkgMjAwNTpcbiAqIHZhciByZXN1bHQgPSBlbmRPZklTT1llYXIobmV3IERhdGUoMjAwNSwgNiwgMikpXG4gKiAvLz0+IFN1biBKYW4gMDEgMjAwNiAyMzo1OTo1OS45OTlcbiAqL1xuZnVuY3Rpb24gZW5kT2ZJU09ZZWFyIChkaXJ0eURhdGUpIHtcbiAgdmFyIHllYXIgPSBnZXRJU09ZZWFyKGRpcnR5RGF0ZSlcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIgPSBuZXcgRGF0ZSgwKVxuICBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyLnNldEZ1bGxZZWFyKHllYXIgKyAxLCAwLCA0KVxuICBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyLnNldEhvdXJzKDAsIDAsIDAsIDApXG4gIHZhciBkYXRlID0gc3RhcnRPZklTT1dlZWsoZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhcilcbiAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAtIDEpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW5kT2ZJU09ZZWFyXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1pbnV0ZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGVuZCBvZiBhIG1pbnV0ZSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiBhIG1pbnV0ZSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZW5kIG9mIGEgbWludXRlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBlbmQgb2YgYSBtaW51dGUgZm9yIDEgRGVjZW1iZXIgMjAxNCAyMjoxNTo0NS40MDA6XG4gKiB2YXIgcmVzdWx0ID0gZW5kT2ZNaW51dGUobmV3IERhdGUoMjAxNCwgMTEsIDEsIDIyLCAxNSwgNDUsIDQwMCkpXG4gKiAvLz0+IE1vbiBEZWMgMDEgMjAxNCAyMjoxNTo1OS45OTlcbiAqL1xuZnVuY3Rpb24gZW5kT2ZNaW51dGUgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgZGF0ZS5zZXRTZWNvbmRzKDU5LCA5OTkpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW5kT2ZNaW51dGVcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgYSBtb250aCBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiBhIG1vbnRoIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBlbmQgb2YgYSBtb250aFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGEgbW9udGggZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gZW5kT2ZNb250aChuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgU2VwIDMwIDIwMTQgMjM6NTk6NTkuOTk5XG4gKi9cbmZ1bmN0aW9uIGVuZE9mTW9udGggKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aCArIDEsIDApXG4gIGRhdGUuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuZE9mTW9udGhcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgUXVhcnRlciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGVuZCBvZiBhIHllYXIgcXVhcnRlciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiBhIHllYXIgcXVhcnRlciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZW5kIG9mIGEgcXVhcnRlclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGEgcXVhcnRlciBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBlbmRPZlF1YXJ0ZXIobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAzMCAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5mdW5jdGlvbiBlbmRPZlF1YXJ0ZXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGN1cnJlbnRNb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICB2YXIgbW9udGggPSBjdXJyZW50TW9udGggLSBjdXJyZW50TW9udGggJSAzICsgM1xuICBkYXRlLnNldE1vbnRoKG1vbnRoLCAwKVxuICBkYXRlLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSlcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbmRPZlF1YXJ0ZXJcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgU2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIGEgc2Vjb25kIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGEgc2Vjb25kIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBlbmQgb2YgYSBzZWNvbmRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIGVuZCBvZiBhIHNlY29uZCBmb3IgMSBEZWNlbWJlciAyMDE0IDIyOjE1OjQ1LjQwMDpcbiAqIHZhciByZXN1bHQgPSBlbmRPZlNlY29uZChuZXcgRGF0ZSgyMDE0LCAxMSwgMSwgMjIsIDE1LCA0NSwgNDAwKSlcbiAqIC8vPT4gTW9uIERlYyAwMSAyMDE0IDIyOjE1OjQ1Ljk5OVxuICovXG5mdW5jdGlvbiBlbmRPZlNlY29uZCAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICBkYXRlLnNldE1pbGxpc2Vjb25kcyg5OTkpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW5kT2ZTZWNvbmRcbiIsInZhciBlbmRPZkRheSA9IHJlcXVpcmUoJy4uL2VuZF9vZl9kYXkvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgdG9kYXkuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiB0b2RheS5cbiAqXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVuZCBvZiB0b2RheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyA2IE9jdG9iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBlbmRPZlRvZGF5KClcbiAqIC8vPT4gTW9uIE9jdCA2IDIwMTQgMjM6NTk6NTkuOTk5XG4gKi9cbmZ1bmN0aW9uIGVuZE9mVG9kYXkgKCkge1xuICByZXR1cm4gZW5kT2ZEYXkobmV3IERhdGUoKSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbmRPZlRvZGF5XG4iLCIvKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgdG9tb3Jyb3cuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiB0b21vcnJvdy5cbiAqXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVuZCBvZiB0b21vcnJvd1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyA2IE9jdG9iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBlbmRPZlRvbW9ycm93KClcbiAqIC8vPT4gVHVlIE9jdCA3IDIwMTQgMjM6NTk6NTkuOTk5XG4gKi9cbmZ1bmN0aW9uIGVuZE9mVG9tb3Jyb3cgKCkge1xuICB2YXIgbm93ID0gbmV3IERhdGUoKVxuICB2YXIgeWVhciA9IG5vdy5nZXRGdWxsWWVhcigpXG4gIHZhciBtb250aCA9IG5vdy5nZXRNb250aCgpXG4gIHZhciBkYXkgPSBub3cuZ2V0RGF0ZSgpXG5cbiAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgwKVxuICBkYXRlLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoLCBkYXkgKyAxKVxuICBkYXRlLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSlcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbmRPZlRvbW9ycm93XG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLndlZWtTdGFydHNPbj0wXSAtIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrICgwIC0gU3VuZGF5KVxuICogQHJldHVybnMge0RhdGV9IHRoZSBlbmQgb2YgYSB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBlbmQgb2YgYSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogdmFyIHJlc3VsdCA9IGVuZE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBTYXQgU2VwIDA2IDIwMTQgMjM6NTk6NTkuOTk5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRoZSB3ZWVrIHN0YXJ0cyBvbiBNb25kYXksIHRoZSBlbmQgb2YgdGhlIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gZW5kT2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCksIHt3ZWVrU3RhcnRzT246IDF9KVxuICogLy89PiBTdW4gU2VwIDA3IDIwMTQgMjM6NTk6NTkuOTk5XG4gKi9cbmZ1bmN0aW9uIGVuZE9mV2VlayAoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIHdlZWtTdGFydHNPbiA9IGRpcnR5T3B0aW9ucyA/IChOdW1iZXIoZGlydHlPcHRpb25zLndlZWtTdGFydHNPbikgfHwgMCkgOiAwXG5cbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBkYXkgPSBkYXRlLmdldERheSgpXG4gIHZhciBkaWZmID0gKGRheSA8IHdlZWtTdGFydHNPbiA/IC03IDogMCkgKyA2IC0gKGRheSAtIHdlZWtTdGFydHNPbilcblxuICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBkaWZmKVxuICBkYXRlLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSlcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbmRPZldlZWtcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGVuZCBvZiBhIHllYXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBlbmQgb2YgYSB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBlbmQgb2YgYSB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBlbmQgb2YgYSB5ZWFyIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogdmFyIHJlc3VsdCA9IGVuZE9mWWVhcihuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDAwKSlcbiAqIC8vPT4gV2VkIERlYyAzMSAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5mdW5jdGlvbiBlbmRPZlllYXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgZGF0ZS5zZXRGdWxsWWVhcih5ZWFyICsgMSwgMCwgMClcbiAgZGF0ZS5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW5kT2ZZZWFyXG4iLCIvKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgeWVzdGVyZGF5LlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBlbmQgb2YgeWVzdGVyZGF5LlxuICpcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZW5kIG9mIHllc3RlcmRheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyA2IE9jdG9iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBlbmRPZlllc3RlcmRheSgpXG4gKiAvLz0+IFN1biBPY3QgNSAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5mdW5jdGlvbiBlbmRPZlllc3RlcmRheSAoKSB7XG4gIHZhciBub3cgPSBuZXcgRGF0ZSgpXG4gIHZhciB5ZWFyID0gbm93LmdldEZ1bGxZZWFyKClcbiAgdmFyIG1vbnRoID0gbm93LmdldE1vbnRoKClcbiAgdmFyIGRheSA9IG5vdy5nZXREYXRlKClcblxuICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDApXG4gIGRhdGUuc2V0RnVsbFllYXIoeWVhciwgbW9udGgsIGRheSAtIDEpXG4gIGRhdGUuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuZE9mWWVzdGVyZGF5XG4iLCJ2YXIgZ2V0RGF5T2ZZZWFyID0gcmVxdWlyZSgnLi4vZ2V0X2RheV9vZl95ZWFyL2luZGV4LmpzJylcbnZhciBnZXRJU09XZWVrID0gcmVxdWlyZSgnLi4vZ2V0X2lzb193ZWVrL2luZGV4LmpzJylcbnZhciBnZXRJU09ZZWFyID0gcmVxdWlyZSgnLi4vZ2V0X2lzb195ZWFyL2luZGV4LmpzJylcbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBpc1ZhbGlkID0gcmVxdWlyZSgnLi4vaXNfdmFsaWQvaW5kZXguanMnKVxudmFyIGVuTG9jYWxlID0gcmVxdWlyZSgnLi4vbG9jYWxlL2VuL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEZvcm1hdCB0aGUgZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nIGluIHRoZSBnaXZlbiBmb3JtYXQuXG4gKlxuICogQWNjZXB0ZWQgdG9rZW5zOlxuICogfCBVbml0ICAgICAgICAgICAgICAgICAgICB8IFRva2VuIHwgUmVzdWx0IGV4YW1wbGVzICAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCBNb250aCAgICAgICAgICAgICAgICAgICB8IE0gICAgIHwgMSwgMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IE1vICAgIHwgMXN0LCAybmQsIC4uLiwgMTJ0aCAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NICAgIHwgMDEsIDAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NTSAgIHwgSmFuLCBGZWIsIC4uLiwgRGVjICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NTU0gIHwgSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXIgfFxuICogfCBRdWFydGVyICAgICAgICAgICAgICAgICB8IFEgICAgIHwgMSwgMiwgMywgNCAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IFFvICAgIHwgMXN0LCAybmQsIDNyZCwgNHRoICAgICAgICAgICAgICAgfFxuICogfCBEYXkgb2YgbW9udGggICAgICAgICAgICB8IEQgICAgIHwgMSwgMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IERvICAgIHwgMXN0LCAybmQsIC4uLiwgMzFzdCAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IEREICAgIHwgMDEsIDAyLCAuLi4sIDMxICAgICAgICAgICAgICAgICAgfFxuICogfCBEYXkgb2YgeWVhciAgICAgICAgICAgICB8IERERCAgIHwgMSwgMiwgLi4uLCAzNjYgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IERERG8gIHwgMXN0LCAybmQsIC4uLiwgMzY2dGggICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IEREREQgIHwgMDAxLCAwMDIsIC4uLiwgMzY2ICAgICAgICAgICAgICAgfFxuICogfCBEYXkgb2Ygd2VlayAgICAgICAgICAgICB8IGQgICAgIHwgMCwgMSwgLi4uLCA2ICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IGRvICAgIHwgMHRoLCAxc3QsIC4uLiwgNnRoICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IGRkICAgIHwgU3UsIE1vLCAuLi4sIFNhICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IGRkZCAgIHwgU3VuLCBNb24sIC4uLiwgU2F0ICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IGRkZGQgIHwgU3VuZGF5LCBNb25kYXksIC4uLiwgU2F0dXJkYXkgICAgfFxuICogfCBEYXkgb2YgSVNPIHdlZWsgICAgICAgICB8IEUgICAgIHwgMSwgMiwgLi4uLCA3ICAgICAgICAgICAgICAgICAgICAgfFxuICogfCBJU08gd2VlayAgICAgICAgICAgICAgICB8IFcgICAgIHwgMSwgMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IFdvICAgIHwgMXN0LCAybmQsIC4uLiwgNTNyZCAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IFdXICAgIHwgMDEsIDAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgfFxuICogfCBZZWFyICAgICAgICAgICAgICAgICAgICB8IFlZICAgIHwgMDAsIDAxLCAuLi4sIDk5ICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZWVkgIHwgMTkwMCwgMTkwMSwgLi4uLCAyMDk5ICAgICAgICAgICAgfFxuICogfCBJU08gd2Vlay1udW1iZXJpbmcgeWVhciB8IEdHICAgIHwgMDAsIDAxLCAuLi4sIDk5ICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IEdHR0cgIHwgMTkwMCwgMTkwMSwgLi4uLCAyMDk5ICAgICAgICAgICAgfFxuICogfCBBTS9QTSAgICAgICAgICAgICAgICAgICB8IEEgICAgIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IGEgICAgIHwgYW0sIHBtICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IGFhICAgIHwgYS5tLiwgcC5tLiAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCBIb3VyICAgICAgICAgICAgICAgICAgICB8IEggICAgIHwgMCwgMSwgLi4uIDIzICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IEhIICAgIHwgMDAsIDAxLCAuLi4gMjMgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IGggICAgIHwgMSwgMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IGhoICAgIHwgMDEsIDAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgfFxuICogfCBNaW51dGUgICAgICAgICAgICAgICAgICB8IG0gICAgIHwgMCwgMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IG1tICAgIHwgMDAsIDAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgfFxuICogfCBTZWNvbmQgICAgICAgICAgICAgICAgICB8IHMgICAgIHwgMCwgMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IHNzICAgIHwgMDAsIDAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgfFxuICogfCAxLzEwIG9mIHNlY29uZCAgICAgICAgICB8IFMgICAgIHwgMCwgMSwgLi4uLCA5ICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAxLzEwMCBvZiBzZWNvbmQgICAgICAgICB8IFNTICAgIHwgMDAsIDAxLCAuLi4sIDk5ICAgICAgICAgICAgICAgICAgfFxuICogfCBNaWxsaXNlY29uZCAgICAgICAgICAgICB8IFNTUyAgIHwgMDAwLCAwMDEsIC4uLiwgOTk5ICAgICAgICAgICAgICAgfFxuICogfCBUaW1lem9uZSAgICAgICAgICAgICAgICB8IFogICAgIHwgLTAxOjAwLCArMDA6MDAsIC4uLiArMTI6MDAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8IFpaICAgIHwgLTAxMDAsICswMDAwLCAuLi4sICsxMjAwICAgICAgICAgfFxuICogfCBTZWNvbmRzIHRpbWVzdGFtcCAgICAgICB8IFggICAgIHwgNTEyOTY5NTIwICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCBNaWxsaXNlY29uZHMgdGltZXN0YW1wICB8IHggICAgIHwgNTEyOTY5NTIwOTAwICAgICAgICAgICAgICAgICAgICAgfFxuICpcbiAqIFRoZSBjaGFyYWN0ZXJzIHdyYXBwZWQgaW4gc3F1YXJlIGJyYWNrZXRzIGFyZSBlc2NhcGVkLlxuICpcbiAqIFRoZSByZXN1bHQgbWF5IHZhcnkgYnkgbG9jYWxlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZm9ybWF0PSdZWVlZLU1NLUREVEhIOm1tOnNzLlNTU1onXSAtIHRoZSBzdHJpbmcgb2YgdG9rZW5zXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5sb2NhbGU9ZW5Mb2NhbGVdIC0gdGhlIGxvY2FsZSBvYmplY3RcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDExIEZlYnJ1YXJ5IDIwMTQgaW4gbWlkZGxlLWVuZGlhbiBmb3JtYXQ6XG4gKiB2YXIgcmVzdWx0ID0gZm9ybWF0KFxuICogICBuZXcgRGF0ZSgyMDE0LCAxLCAxMSksXG4gKiAgICdNTS9ERC9ZWVlZJ1xuICogKVxuICogLy89PiAnMDIvMTEvMjAxNCdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDIgSnVseSAyMDE0IGluIEVzcGVyYW50bzpcbiAqIHZhciBlb0xvY2FsZSA9IHJlcXVpcmUoJ2RhdGUtZm5zL2xvY2FsZS9lbycpXG4gKiB2YXIgcmVzdWx0ID0gZm9ybWF0KFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyKSxcbiAqICAgJ0RvIFtkZV0gTU1NTSBZWVlZJyxcbiAqICAge2xvY2FsZTogZW9Mb2NhbGV9XG4gKiApXG4gKiAvLz0+ICcyLWEgZGUganVsaW8gMjAxNCdcbiAqL1xuZnVuY3Rpb24gZm9ybWF0IChkaXJ0eURhdGUsIGRpcnR5Rm9ybWF0U3RyLCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIGZvcm1hdFN0ciA9IGRpcnR5Rm9ybWF0U3RyID8gU3RyaW5nKGRpcnR5Rm9ybWF0U3RyKSA6ICdZWVlZLU1NLUREVEhIOm1tOnNzLlNTU1onXG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9XG5cbiAgdmFyIGxvY2FsZSA9IG9wdGlvbnMubG9jYWxlXG4gIHZhciBsb2NhbGVGb3JtYXR0ZXJzID0gZW5Mb2NhbGUuZm9ybWF0LmZvcm1hdHRlcnNcbiAgdmFyIGZvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSBlbkxvY2FsZS5mb3JtYXQuZm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cFxuICBpZiAobG9jYWxlICYmIGxvY2FsZS5mb3JtYXQgJiYgbG9jYWxlLmZvcm1hdC5mb3JtYXR0ZXJzKSB7XG4gICAgbG9jYWxlRm9ybWF0dGVycyA9IGxvY2FsZS5mb3JtYXQuZm9ybWF0dGVyc1xuXG4gICAgaWYgKGxvY2FsZS5mb3JtYXQuZm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCkge1xuICAgICAgZm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IGxvY2FsZS5mb3JtYXQuZm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cFxuICAgIH1cbiAgfVxuXG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuXG4gIGlmICghaXNWYWxpZChkYXRlKSkge1xuICAgIHJldHVybiAnSW52YWxpZCBEYXRlJ1xuICB9XG5cbiAgdmFyIGZvcm1hdEZuID0gYnVpbGRGb3JtYXRGbihmb3JtYXRTdHIsIGxvY2FsZUZvcm1hdHRlcnMsIGZvcm1hdHRpbmdUb2tlbnNSZWdFeHApXG5cbiAgcmV0dXJuIGZvcm1hdEZuKGRhdGUpXG59XG5cbnZhciBmb3JtYXR0ZXJzID0ge1xuICAvLyBNb250aDogMSwgMiwgLi4uLCAxMlxuICAnTSc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgfSxcblxuICAvLyBNb250aDogMDEsIDAyLCAuLi4sIDEyXG4gICdNTSc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldE1vbnRoKCkgKyAxLCAyKVxuICB9LFxuXG4gIC8vIFF1YXJ0ZXI6IDEsIDIsIDMsIDRcbiAgJ1EnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBNYXRoLmNlaWwoKGRhdGUuZ2V0TW9udGgoKSArIDEpIC8gMylcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDEsIDIsIC4uLiwgMzFcbiAgJ0QnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERhdGUoKVxuICB9LFxuXG4gIC8vIERheSBvZiBtb250aDogMDEsIDAyLCAuLi4sIDMxXG4gICdERCc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldERhdGUoKSwgMilcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMSwgMiwgLi4uLCAzNjZcbiAgJ0RERCc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGdldERheU9mWWVhcihkYXRlKVxuICB9LFxuXG4gIC8vIERheSBvZiB5ZWFyOiAwMDEsIDAwMiwgLi4uLCAzNjZcbiAgJ0REREQnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZ2V0RGF5T2ZZZWFyKGRhdGUpLCAzKVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiAwLCAxLCAuLi4sIDZcbiAgJ2QnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERheSgpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIElTTyB3ZWVrOiAxLCAyLCAuLi4sIDdcbiAgJ0UnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERheSgpIHx8IDdcbiAgfSxcblxuICAvLyBJU08gd2VlazogMSwgMiwgLi4uLCA1M1xuICAnVyc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGdldElTT1dlZWsoZGF0ZSlcbiAgfSxcblxuICAvLyBJU08gd2VlazogMDEsIDAyLCAuLi4sIDUzXG4gICdXVyc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhnZXRJU09XZWVrKGRhdGUpLCAyKVxuICB9LFxuXG4gIC8vIFllYXI6IDAwLCAwMSwgLi4uLCA5OVxuICAnWVknOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KS5zdWJzdHIoMilcbiAgfSxcblxuICAvLyBZZWFyOiAxOTAwLCAxOTAxLCAuLi4sIDIwOTlcbiAgJ1lZWVknOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KVxuICB9LFxuXG4gIC8vIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiAwMCwgMDEsIC4uLiwgOTlcbiAgJ0dHJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gU3RyaW5nKGdldElTT1llYXIoZGF0ZSkpLnN1YnN0cigyKVxuICB9LFxuXG4gIC8vIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiAxOTAwLCAxOTAxLCAuLi4sIDIwOTlcbiAgJ0dHR0cnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBnZXRJU09ZZWFyKGRhdGUpXG4gIH0sXG5cbiAgLy8gSG91cjogMCwgMSwgLi4uIDIzXG4gICdIJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpXG4gIH0sXG5cbiAgLy8gSG91cjogMDAsIDAxLCAuLi4sIDIzXG4gICdISCc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldEhvdXJzKCksIDIpXG4gIH0sXG5cbiAgLy8gSG91cjogMSwgMiwgLi4uLCAxMlxuICAnaCc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpXG4gICAgaWYgKGhvdXJzID09PSAwKSB7XG4gICAgICByZXR1cm4gMTJcbiAgICB9IGVsc2UgaWYgKGhvdXJzID4gMTIpIHtcbiAgICAgIHJldHVybiBob3VycyAlIDEyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBob3Vyc1xuICAgIH1cbiAgfSxcblxuICAvLyBIb3VyOiAwMSwgMDIsIC4uLiwgMTJcbiAgJ2hoJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGZvcm1hdHRlcnNbJ2gnXShkYXRlKSwgMilcbiAgfSxcblxuICAvLyBNaW51dGU6IDAsIDEsIC4uLiwgNTlcbiAgJ20nOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1pbnV0ZXMoKVxuICB9LFxuXG4gIC8vIE1pbnV0ZTogMDAsIDAxLCAuLi4sIDU5XG4gICdtbSc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldE1pbnV0ZXMoKSwgMilcbiAgfSxcblxuICAvLyBTZWNvbmQ6IDAsIDEsIC4uLiwgNTlcbiAgJ3MnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFNlY29uZHMoKVxuICB9LFxuXG4gIC8vIFNlY29uZDogMDAsIDAxLCAuLi4sIDU5XG4gICdzcyc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFNlY29uZHMoKSwgMilcbiAgfSxcblxuICAvLyAxLzEwIG9mIHNlY29uZDogMCwgMSwgLi4uLCA5XG4gICdTJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwKVxuICB9LFxuXG4gIC8vIDEvMTAwIG9mIHNlY29uZDogMDAsIDAxLCAuLi4sIDk5XG4gICdTUyc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhNYXRoLmZsb29yKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMCksIDIpXG4gIH0sXG5cbiAgLy8gTWlsbGlzZWNvbmQ6IDAwMCwgMDAxLCAuLi4sIDk5OVxuICAnU1NTJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCksIDMpXG4gIH0sXG5cbiAgLy8gVGltZXpvbmU6IC0wMTowMCwgKzAwOjAwLCAuLi4gKzEyOjAwXG4gICdaJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUoZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpLCAnOicpXG4gIH0sXG5cbiAgLy8gVGltZXpvbmU6IC0wMTAwLCArMDAwMCwgLi4uICsxMjAwXG4gICdaWic6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSlcbiAgfSxcblxuICAvLyBTZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwXG4gICdYJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihkYXRlLmdldFRpbWUoKSAvIDEwMDApXG4gIH0sXG5cbiAgLy8gTWlsbGlzZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwOTAwXG4gICd4JzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKClcbiAgfVxufVxuXG5mdW5jdGlvbiBidWlsZEZvcm1hdEZuIChmb3JtYXRTdHIsIGxvY2FsZUZvcm1hdHRlcnMsIGZvcm1hdHRpbmdUb2tlbnNSZWdFeHApIHtcbiAgdmFyIGFycmF5ID0gZm9ybWF0U3RyLm1hdGNoKGZvcm1hdHRpbmdUb2tlbnNSZWdFeHApXG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGhcblxuICB2YXIgaVxuICB2YXIgZm9ybWF0dGVyXG4gIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGZvcm1hdHRlciA9IGxvY2FsZUZvcm1hdHRlcnNbYXJyYXlbaV1dIHx8IGZvcm1hdHRlcnNbYXJyYXlbaV1dXG4gICAgaWYgKGZvcm1hdHRlcikge1xuICAgICAgYXJyYXlbaV0gPSBmb3JtYXR0ZXJcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyYXlbaV0gPSByZW1vdmVGb3JtYXR0aW5nVG9rZW5zKGFycmF5W2ldKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHZhciBvdXRwdXQgPSAnJ1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJheVtpXSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIG91dHB1dCArPSBhcnJheVtpXShkYXRlLCBmb3JtYXR0ZXJzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0ICs9IGFycmF5W2ldXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVGb3JtYXR0aW5nVG9rZW5zIChpbnB1dCkge1xuICBpZiAoaW5wdXQubWF0Y2goL1xcW1tcXHNcXFNdLykpIHtcbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXlxcW3xdJC9nLCAnJylcbiAgfVxuICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxcXC9nLCAnJylcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltZXpvbmUgKG9mZnNldCwgZGVsaW1ldGVyKSB7XG4gIGRlbGltZXRlciA9IGRlbGltZXRlciB8fCAnJ1xuICB2YXIgc2lnbiA9IG9mZnNldCA+IDAgPyAnLScgOiAnKydcbiAgdmFyIGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldClcbiAgdmFyIGhvdXJzID0gTWF0aC5mbG9vcihhYnNPZmZzZXQgLyA2MClcbiAgdmFyIG1pbnV0ZXMgPSBhYnNPZmZzZXQgJSA2MFxuICByZXR1cm4gc2lnbiArIGFkZExlYWRpbmdaZXJvcyhob3VycywgMikgKyBkZWxpbWV0ZXIgKyBhZGRMZWFkaW5nWmVyb3MobWludXRlcywgMilcbn1cblxuZnVuY3Rpb24gYWRkTGVhZGluZ1plcm9zIChudW1iZXIsIHRhcmdldExlbmd0aCkge1xuICB2YXIgb3V0cHV0ID0gTWF0aC5hYnMobnVtYmVyKS50b1N0cmluZygpXG4gIHdoaWxlIChvdXRwdXQubGVuZ3RoIDwgdGFyZ2V0TGVuZ3RoKSB7XG4gICAgb3V0cHV0ID0gJzAnICsgb3V0cHV0XG4gIH1cbiAgcmV0dXJuIG91dHB1dFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvcm1hdFxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBkYXkgb2YgdGhlIG1vbnRoIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBkYXkgb2YgdGhlIG1vbnRoIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBkYXkgb2YgbW9udGhcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggZGF5IG9mIHRoZSBtb250aCBpcyAyOSBGZWJydWFyeSAyMDEyP1xuICogdmFyIHJlc3VsdCA9IGdldERhdGUobmV3IERhdGUoMjAxMiwgMSwgMjkpKVxuICogLy89PiAyOVxuICovXG5mdW5jdGlvbiBnZXREYXRlIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBkYXlPZk1vbnRoID0gZGF0ZS5nZXREYXRlKClcbiAgcmV0dXJuIGRheU9mTW9udGhcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXREYXRlXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWtkYXkgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBkYXkgb2YgdGhlIHdlZWsgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIGRheSBvZiB0aGUgd2VlayBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBnaXZlbiBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgZGF5IG9mIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggZGF5IG9mIHRoZSB3ZWVrIGlzIDI5IEZlYnJ1YXJ5IDIwMTI/XG4gKiB2YXIgcmVzdWx0ID0gZ2V0RGF5KG5ldyBEYXRlKDIwMTIsIDEsIDI5KSlcbiAqIC8vPT4gM1xuICovXG5mdW5jdGlvbiBnZXREYXkgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGRheSA9IGRhdGUuZ2V0RGF5KClcbiAgcmV0dXJuIGRheVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldERheVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxudmFyIHN0YXJ0T2ZZZWFyID0gcmVxdWlyZSgnLi4vc3RhcnRfb2ZfeWVhci9pbmRleC5qcycpXG52YXIgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzID0gcmVxdWlyZSgnLi4vZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl9kYXlzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgZGF5IG9mIHRoZSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBkYXkgb2YgdGhlIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZ2l2ZW4gZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIGRheSBvZiB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIGRheSBvZiB0aGUgeWVhciBpcyAyIEp1bHkgMjAxND9cbiAqIHZhciByZXN1bHQgPSBnZXREYXlPZlllYXIobmV3IERhdGUoMjAxNCwgNiwgMikpXG4gKiAvLz0+IDE4M1xuICovXG5mdW5jdGlvbiBnZXREYXlPZlllYXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGRpZmYgPSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZSwgc3RhcnRPZlllYXIoZGF0ZSkpXG4gIHZhciBkYXlPZlllYXIgPSBkaWZmICsgMVxuICByZXR1cm4gZGF5T2ZZZWFyXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0RGF5T2ZZZWFyXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBnaXZlbiBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBtb250aFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBkYXlzIGFyZSBpbiBGZWJydWFyeSAyMDAwP1xuICogdmFyIHJlc3VsdCA9IGdldERheXNJbk1vbnRoKG5ldyBEYXRlKDIwMDAsIDEpKVxuICogLy89PiAyOVxuICovXG5mdW5jdGlvbiBnZXREYXlzSW5Nb250aCAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICB2YXIgbW9udGhJbmRleCA9IGRhdGUuZ2V0TW9udGgoKVxuICB2YXIgbGFzdERheU9mTW9udGggPSBuZXcgRGF0ZSgwKVxuICBsYXN0RGF5T2ZNb250aC5zZXRGdWxsWWVhcih5ZWFyLCBtb250aEluZGV4ICsgMSwgMClcbiAgbGFzdERheU9mTW9udGguc2V0SG91cnMoMCwgMCwgMCwgMClcbiAgcmV0dXJuIGxhc3REYXlPZk1vbnRoLmdldERhdGUoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldERheXNJbk1vbnRoXG4iLCJ2YXIgaXNMZWFwWWVhciA9IHJlcXVpcmUoJy4uL2lzX2xlYXBfeWVhci9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBnaXZlbiBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGRheXMgYXJlIGluIDIwMTI/XG4gKiB2YXIgcmVzdWx0ID0gZ2V0RGF5c0luWWVhcihuZXcgRGF0ZSgyMDEyLCAwLCAxKSlcbiAqIC8vPT4gMzY2XG4gKi9cbmZ1bmN0aW9uIGdldERheXNJblllYXIgKGRpcnR5RGF0ZSkge1xuICByZXR1cm4gaXNMZWFwWWVhcihkaXJ0eURhdGUpID8gMzY2IDogMzY1XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0RGF5c0luWWVhclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBIb3VyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgaG91cnMgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIGhvdXJzIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBob3Vyc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBHZXQgdGhlIGhvdXJzIG9mIDI5IEZlYnJ1YXJ5IDIwMTIgMTE6NDU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gZ2V0SG91cnMobmV3IERhdGUoMjAxMiwgMSwgMjksIDExLCA0NSkpXG4gKiAvLz0+IDExXG4gKi9cbmZ1bmN0aW9uIGdldEhvdXJzIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKVxuICByZXR1cm4gaG91cnNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRIb3Vyc1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrZGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgZGF5IG9mIHRoZSBJU08gd2VlayBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgZGF5IG9mIHRoZSBJU08gd2VlayBvZiB0aGUgZ2l2ZW4gZGF0ZSxcbiAqIHdoaWNoIGlzIDcgZm9yIFN1bmRheSwgMSBmb3IgTW9uZGF5IGV0Yy5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZ2l2ZW4gZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIGRheSBvZiBJU08gd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCBkYXkgb2YgdGhlIElTTyB3ZWVrIGlzIDI2IEZlYnJ1YXJ5IDIwMTI/XG4gKiB2YXIgcmVzdWx0ID0gZ2V0SVNPRGF5KG5ldyBEYXRlKDIwMTIsIDEsIDI2KSlcbiAqIC8vPT4gN1xuICovXG5mdW5jdGlvbiBnZXRJU09EYXkgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGRheSA9IGRhdGUuZ2V0RGF5KClcblxuICBpZiAoZGF5ID09PSAwKSB7XG4gICAgZGF5ID0gN1xuICB9XG5cbiAgcmV0dXJuIGRheVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldElTT0RheVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxudmFyIHN0YXJ0T2ZJU09XZWVrID0gcmVxdWlyZSgnLi4vc3RhcnRfb2ZfaXNvX3dlZWsvaW5kZXguanMnKVxudmFyIHN0YXJ0T2ZJU09ZZWFyID0gcmVxdWlyZSgnLi4vc3RhcnRfb2ZfaXNvX3llYXIvaW5kZXguanMnKVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX1dFRUsgPSA2MDQ4MDAwMDBcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBJU08gd2VlayBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgSVNPIHdlZWsgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBJU08gd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCB3ZWVrIG9mIHRoZSBJU08td2VlayBudW1iZXJpbmcgeWVhciBpcyAyIEphbnVhcnkgMjAwNT9cbiAqIHZhciByZXN1bHQgPSBnZXRJU09XZWVrKG5ldyBEYXRlKDIwMDUsIDAsIDIpKVxuICogLy89PiA1M1xuICovXG5mdW5jdGlvbiBnZXRJU09XZWVrIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBkaWZmID0gc3RhcnRPZklTT1dlZWsoZGF0ZSkuZ2V0VGltZSgpIC0gc3RhcnRPZklTT1llYXIoZGF0ZSkuZ2V0VGltZSgpXG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIHdlZWsgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSB3ZWVrIG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcbiAgcmV0dXJuIE1hdGgucm91bmQoZGlmZiAvIE1JTExJU0VDT05EU19JTl9XRUVLKSArIDFcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRJU09XZWVrXG4iLCJ2YXIgc3RhcnRPZklTT1llYXIgPSByZXF1aXJlKCcuLi9zdGFydF9vZl9pc29feWVhci9pbmRleC5qcycpXG52YXIgYWRkV2Vla3MgPSByZXF1aXJlKCcuLi9hZGRfd2Vla3MvaW5kZXguanMnKVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX1dFRUsgPSA2MDQ4MDAwMDBcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWstTnVtYmVyaW5nIFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2Ygd2Vla3MgaW4gYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiB3ZWVrcyBpbiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZ2l2ZW4gZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBJU08gd2Vla3MgaW4gYSB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IHdlZWtzIGFyZSBpbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhciAyMDE1P1xuICogdmFyIHJlc3VsdCA9IGdldElTT1dlZWtzSW5ZZWFyKG5ldyBEYXRlKDIwMTUsIDEsIDExKSlcbiAqIC8vPT4gNTNcbiAqL1xuZnVuY3Rpb24gZ2V0SVNPV2Vla3NJblllYXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgdGhpc1llYXIgPSBzdGFydE9mSVNPWWVhcihkaXJ0eURhdGUpXG4gIHZhciBuZXh0WWVhciA9IHN0YXJ0T2ZJU09ZZWFyKGFkZFdlZWtzKHRoaXNZZWFyLCA2MCkpXG4gIHZhciBkaWZmID0gbmV4dFllYXIudmFsdWVPZigpIC0gdGhpc1llYXIudmFsdWVPZigpXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2Ygd2Vla3MgdG8gdGhlIG5lYXJlc3QgaW50ZWdlclxuICAvLyBiZWNhdXNlIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGluIGEgd2VlayBpcyBub3QgY29uc3RhbnRcbiAgLy8gKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIHdlZWsgb2YgdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KVxuICByZXR1cm4gTWF0aC5yb3VuZChkaWZmIC8gTUlMTElTRUNPTkRTX0lOX1dFRUspXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SVNPV2Vla3NJblllYXJcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBzdGFydE9mSVNPV2VlayA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX2lzb193ZWVrL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWstTnVtYmVyaW5nIFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUsXG4gKiB3aGljaCBhbHdheXMgc3RhcnRzIDMgZGF5cyBiZWZvcmUgdGhlIHllYXIncyBmaXJzdCBUaHVyc2RheS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZ2l2ZW4gZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIElTTy13ZWVrIG51bWJlcmluZyB5ZWFyIGlzIDIgSmFudWFyeSAyMDA1P1xuICogdmFyIHJlc3VsdCA9IGdldElTT1llYXIobmV3IERhdGUoMjAwNSwgMCwgMikpXG4gKiAvLz0+IDIwMDRcbiAqL1xuZnVuY3Rpb24gZ2V0SVNPWWVhciAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuXG4gIHZhciBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyID0gbmV3IERhdGUoMClcbiAgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhci5zZXRGdWxsWWVhcih5ZWFyICsgMSwgMCwgNClcbiAgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhci5zZXRIb3VycygwLCAwLCAwLCAwKVxuICB2YXIgc3RhcnRPZk5leHRZZWFyID0gc3RhcnRPZklTT1dlZWsoZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhcilcblxuICB2YXIgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhciA9IG5ldyBEYXRlKDApXG4gIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIuc2V0RnVsbFllYXIoeWVhciwgMCwgNClcbiAgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhci5zZXRIb3VycygwLCAwLCAwLCAwKVxuICB2YXIgc3RhcnRPZlRoaXNZZWFyID0gc3RhcnRPZklTT1dlZWsoZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhcilcblxuICBpZiAoZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZk5leHRZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyICsgMVxuICB9IGVsc2UgaWYgKGRhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZUaGlzWWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhclxuICB9IGVsc2Uge1xuICAgIHJldHVybiB5ZWFyIC0gMVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SVNPWWVhclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNaWxsaXNlY29uZCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG1pbGxpc2Vjb25kcyBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbWlsbGlzZWNvbmRzIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBtaWxsaXNlY29uZHNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gR2V0IHRoZSBtaWxsaXNlY29uZHMgb2YgMjkgRmVicnVhcnkgMjAxMiAxMTo0NTowNS4xMjM6XG4gKiB2YXIgcmVzdWx0ID0gZ2V0TWlsbGlzZWNvbmRzKG5ldyBEYXRlKDIwMTIsIDEsIDI5LCAxMSwgNDUsIDUsIDEyMykpXG4gKiAvLz0+IDEyM1xuICovXG5mdW5jdGlvbiBnZXRNaWxsaXNlY29uZHMgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIG1pbGxpc2Vjb25kcyA9IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKClcbiAgcmV0dXJuIG1pbGxpc2Vjb25kc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1pbGxpc2Vjb25kc1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNaW51dGUgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBtaW51dGVzIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBtaW51dGVzIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBtaW51dGVzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEdldCB0aGUgbWludXRlcyBvZiAyOSBGZWJydWFyeSAyMDEyIDExOjQ1OjA1OlxuICogdmFyIHJlc3VsdCA9IGdldE1pbnV0ZXMobmV3IERhdGUoMjAxMiwgMSwgMjksIDExLCA0NSwgNSkpXG4gKiAvLz0+IDQ1XG4gKi9cbmZ1bmN0aW9uIGdldE1pbnV0ZXMgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIG1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKVxuICByZXR1cm4gbWludXRlc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1pbnV0ZXNcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbW9udGggb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZ2l2ZW4gZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG1vbnRoXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIG1vbnRoIGlzIDI5IEZlYnJ1YXJ5IDIwMTI/XG4gKiB2YXIgcmVzdWx0ID0gZ2V0TW9udGgobmV3IERhdGUoMjAxMiwgMSwgMjkpKVxuICogLy89PiAxXG4gKi9cbmZ1bmN0aW9uIGdldE1vbnRoIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICByZXR1cm4gbW9udGhcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRNb250aFxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX0RBWSA9IDI0ICogNjAgKiA2MCAqIDEwMDBcblxuLyoqXG4gKiBAY2F0ZWdvcnkgUmFuZ2UgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgZGF5cyB0aGF0IG92ZXJsYXAgaW4gdHdvIGRhdGUgcmFuZ2VzXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBkYXlzIHRoYXQgb3ZlcmxhcCBpbiB0d28gZGF0ZSByYW5nZXNcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gaW5pdGlhbFJhbmdlU3RhcnREYXRlIC0gdGhlIHN0YXJ0IG9mIHRoZSBpbml0aWFsIHJhbmdlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gaW5pdGlhbFJhbmdlRW5kRGF0ZSAtIHRoZSBlbmQgb2YgdGhlIGluaXRpYWwgcmFuZ2VcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBjb21wYXJlZFJhbmdlU3RhcnREYXRlIC0gdGhlIHN0YXJ0IG9mIHRoZSByYW5nZSB0byBjb21wYXJlIGl0IHdpdGhcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBjb21wYXJlZFJhbmdlRW5kRGF0ZSAtIHRoZSBlbmQgb2YgdGhlIHJhbmdlIHRvIGNvbXBhcmUgaXQgd2l0aFxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBkYXlzIHRoYXQgb3ZlcmxhcCBpbiB0d28gZGF0ZSByYW5nZXNcbiAqIEB0aHJvd3Mge0Vycm9yfSBzdGFydERhdGUgb2YgYSBkYXRlIHJhbmdlIGNhbm5vdCBiZSBhZnRlciBpdHMgZW5kRGF0ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3Igb3ZlcmxhcHBpbmcgZGF0ZSByYW5nZXMgYWRkcyAxIGZvciBlYWNoIHN0YXJ0ZWQgb3ZlcmxhcHBpbmcgZGF5OlxuICogZ2V0T3ZlcmxhcHBpbmdEYXlzSW5SYW5nZXMoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDAsIDEwKSwgbmV3IERhdGUoMjAxNCwgMCwgMjApLCBuZXcgRGF0ZSgyMDE0LCAwLCAxNyksIG5ldyBEYXRlKDIwMTQsIDAsIDIxKVxuICogKVxuICogLy89PiAzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBub24tb3ZlcmxhcHBpbmcgZGF0ZSByYW5nZXMgcmV0dXJucyAwOlxuICogZ2V0T3ZlcmxhcHBpbmdEYXlzSW5SYW5nZXMoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDAsIDEwKSwgbmV3IERhdGUoMjAxNCwgMCwgMjApLCBuZXcgRGF0ZSgyMDE0LCAwLCAyMSksIG5ldyBEYXRlKDIwMTQsIDAsIDIyKVxuICogKVxuICogLy89PiAwXG4gKi9cbmZ1bmN0aW9uIGdldE92ZXJsYXBwaW5nRGF5c0luUmFuZ2VzIChkaXJ0eUluaXRpYWxSYW5nZVN0YXJ0RGF0ZSwgZGlydHlJbml0aWFsUmFuZ2VFbmREYXRlLCBkaXJ0eUNvbXBhcmVkUmFuZ2VTdGFydERhdGUsIGRpcnR5Q29tcGFyZWRSYW5nZUVuZERhdGUpIHtcbiAgdmFyIGluaXRpYWxTdGFydFRpbWUgPSBwYXJzZShkaXJ0eUluaXRpYWxSYW5nZVN0YXJ0RGF0ZSkuZ2V0VGltZSgpXG4gIHZhciBpbml0aWFsRW5kVGltZSA9IHBhcnNlKGRpcnR5SW5pdGlhbFJhbmdlRW5kRGF0ZSkuZ2V0VGltZSgpXG4gIHZhciBjb21wYXJlZFN0YXJ0VGltZSA9IHBhcnNlKGRpcnR5Q29tcGFyZWRSYW5nZVN0YXJ0RGF0ZSkuZ2V0VGltZSgpXG4gIHZhciBjb21wYXJlZEVuZFRpbWUgPSBwYXJzZShkaXJ0eUNvbXBhcmVkUmFuZ2VFbmREYXRlKS5nZXRUaW1lKClcblxuICBpZiAoaW5pdGlhbFN0YXJ0VGltZSA+IGluaXRpYWxFbmRUaW1lIHx8IGNvbXBhcmVkU3RhcnRUaW1lID4gY29tcGFyZWRFbmRUaW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgc3RhcnQgb2YgdGhlIHJhbmdlIGNhbm5vdCBiZSBhZnRlciB0aGUgZW5kIG9mIHRoZSByYW5nZScpXG4gIH1cblxuICB2YXIgaXNPdmVybGFwcGluZyA9IGluaXRpYWxTdGFydFRpbWUgPCBjb21wYXJlZEVuZFRpbWUgJiYgY29tcGFyZWRTdGFydFRpbWUgPCBpbml0aWFsRW5kVGltZVxuXG4gIGlmICghaXNPdmVybGFwcGluZykge1xuICAgIHJldHVybiAwXG4gIH1cblxuICB2YXIgb3ZlcmxhcFN0YXJ0RGF0ZSA9IGNvbXBhcmVkU3RhcnRUaW1lIDwgaW5pdGlhbFN0YXJ0VGltZVxuICAgID8gaW5pdGlhbFN0YXJ0VGltZVxuICAgIDogY29tcGFyZWRTdGFydFRpbWVcblxuICB2YXIgb3ZlcmxhcEVuZERhdGUgPSBjb21wYXJlZEVuZFRpbWUgPiBpbml0aWFsRW5kVGltZVxuICAgID8gaW5pdGlhbEVuZFRpbWVcbiAgICA6IGNvbXBhcmVkRW5kVGltZVxuXG4gIHZhciBkaWZmZXJlbmNlSW5NcyA9IG92ZXJsYXBFbmREYXRlIC0gb3ZlcmxhcFN0YXJ0RGF0ZVxuXG4gIHJldHVybiBNYXRoLmNlaWwoZGlmZmVyZW5jZUluTXMgLyBNSUxMSVNFQ09ORFNfSU5fREFZKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE92ZXJsYXBwaW5nRGF5c0luUmFuZ2VzXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFF1YXJ0ZXIgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSB5ZWFyIHF1YXJ0ZXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIHllYXIgcXVhcnRlciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBnaXZlbiBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgcXVhcnRlclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCBxdWFydGVyIGlzIDIgSnVseSAyMDE0P1xuICogdmFyIHJlc3VsdCA9IGdldFF1YXJ0ZXIobmV3IERhdGUoMjAxNCwgNiwgMikpXG4gKiAvLz0+IDNcbiAqL1xuZnVuY3Rpb24gZ2V0UXVhcnRlciAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgcXVhcnRlciA9IE1hdGguZmxvb3IoZGF0ZS5nZXRNb250aCgpIC8gMykgKyAxXG4gIHJldHVybiBxdWFydGVyXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UXVhcnRlclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBTZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBzZWNvbmRzIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBzZWNvbmRzIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBzZWNvbmRzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEdldCB0aGUgc2Vjb25kcyBvZiAyOSBGZWJydWFyeSAyMDEyIDExOjQ1OjA1LjEyMzpcbiAqIHZhciByZXN1bHQgPSBnZXRTZWNvbmRzKG5ldyBEYXRlKDIwMTIsIDEsIDI5LCAxMSwgNDUsIDUsIDEyMykpXG4gKiAvLz0+IDVcbiAqL1xuZnVuY3Rpb24gZ2V0U2Vjb25kcyAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgc2Vjb25kcyA9IGRhdGUuZ2V0U2Vjb25kcygpXG4gIHJldHVybiBzZWNvbmRzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2Vjb25kc1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBUaW1lc3RhbXAgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBtaWxsaXNlY29uZHMgdGltZXN0YW1wIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBtaWxsaXNlY29uZHMgdGltZXN0YW1wIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSB0aW1lc3RhbXBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gR2V0IHRoZSB0aW1lc3RhbXAgb2YgMjkgRmVicnVhcnkgMjAxMiAxMTo0NTowNS4xMjM6XG4gKiB2YXIgcmVzdWx0ID0gZ2V0VGltZShuZXcgRGF0ZSgyMDEyLCAxLCAyOSwgMTEsIDQ1LCA1LCAxMjMpKVxuICogLy89PiAxMzMwNTE1OTA1MTIzXG4gKi9cbmZ1bmN0aW9uIGdldFRpbWUgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIHRpbWVzdGFtcCA9IGRhdGUuZ2V0VGltZSgpXG4gIHJldHVybiB0aW1lc3RhbXBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRUaW1lXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIHllYXIgaXMgMiBKdWx5IDIwMTQ/XG4gKiB2YXIgcmVzdWx0ID0gZ2V0WWVhcihuZXcgRGF0ZSgyMDE0LCA2LCAyKSlcbiAqIC8vPT4gMjAxNFxuICovXG5mdW5jdGlvbiBnZXRZZWFyIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gIHJldHVybiB5ZWFyXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0WWVhclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZERheXM6IHJlcXVpcmUoJy4vYWRkX2RheXMvaW5kZXguanMnKSxcbiAgYWRkSG91cnM6IHJlcXVpcmUoJy4vYWRkX2hvdXJzL2luZGV4LmpzJyksXG4gIGFkZElTT1llYXJzOiByZXF1aXJlKCcuL2FkZF9pc29feWVhcnMvaW5kZXguanMnKSxcbiAgYWRkTWlsbGlzZWNvbmRzOiByZXF1aXJlKCcuL2FkZF9taWxsaXNlY29uZHMvaW5kZXguanMnKSxcbiAgYWRkTWludXRlczogcmVxdWlyZSgnLi9hZGRfbWludXRlcy9pbmRleC5qcycpLFxuICBhZGRNb250aHM6IHJlcXVpcmUoJy4vYWRkX21vbnRocy9pbmRleC5qcycpLFxuICBhZGRRdWFydGVyczogcmVxdWlyZSgnLi9hZGRfcXVhcnRlcnMvaW5kZXguanMnKSxcbiAgYWRkU2Vjb25kczogcmVxdWlyZSgnLi9hZGRfc2Vjb25kcy9pbmRleC5qcycpLFxuICBhZGRXZWVrczogcmVxdWlyZSgnLi9hZGRfd2Vla3MvaW5kZXguanMnKSxcbiAgYWRkWWVhcnM6IHJlcXVpcmUoJy4vYWRkX3llYXJzL2luZGV4LmpzJyksXG4gIGFyZVJhbmdlc092ZXJsYXBwaW5nOiByZXF1aXJlKCcuL2FyZV9yYW5nZXNfb3ZlcmxhcHBpbmcvaW5kZXguanMnKSxcbiAgY2xvc2VzdEluZGV4VG86IHJlcXVpcmUoJy4vY2xvc2VzdF9pbmRleF90by9pbmRleC5qcycpLFxuICBjbG9zZXN0VG86IHJlcXVpcmUoJy4vY2xvc2VzdF90by9pbmRleC5qcycpLFxuICBjb21wYXJlQXNjOiByZXF1aXJlKCcuL2NvbXBhcmVfYXNjL2luZGV4LmpzJyksXG4gIGNvbXBhcmVEZXNjOiByZXF1aXJlKCcuL2NvbXBhcmVfZGVzYy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXM6IHJlcXVpcmUoJy4vZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl9kYXlzL2luZGV4LmpzJyksXG4gIGRpZmZlcmVuY2VJbkNhbGVuZGFySVNPV2Vla3M6IHJlcXVpcmUoJy4vZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl9pc29fd2Vla3MvaW5kZXguanMnKSxcbiAgZGlmZmVyZW5jZUluQ2FsZW5kYXJJU09ZZWFyczogcmVxdWlyZSgnLi9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX2lzb195ZWFycy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRoczogcmVxdWlyZSgnLi9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX21vbnRocy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzOiByZXF1aXJlKCcuL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfcXVhcnRlcnMvaW5kZXguanMnKSxcbiAgZGlmZmVyZW5jZUluQ2FsZW5kYXJXZWVrczogcmVxdWlyZSgnLi9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX3dlZWtzL2luZGV4LmpzJyksXG4gIGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnM6IHJlcXVpcmUoJy4vZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl95ZWFycy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5EYXlzOiByZXF1aXJlKCcuL2RpZmZlcmVuY2VfaW5fZGF5cy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5Ib3VyczogcmVxdWlyZSgnLi9kaWZmZXJlbmNlX2luX2hvdXJzL2luZGV4LmpzJyksXG4gIGRpZmZlcmVuY2VJbklTT1llYXJzOiByZXF1aXJlKCcuL2RpZmZlcmVuY2VfaW5faXNvX3llYXJzL2luZGV4LmpzJyksXG4gIGRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kczogcmVxdWlyZSgnLi9kaWZmZXJlbmNlX2luX21pbGxpc2Vjb25kcy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5NaW51dGVzOiByZXF1aXJlKCcuL2RpZmZlcmVuY2VfaW5fbWludXRlcy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5Nb250aHM6IHJlcXVpcmUoJy4vZGlmZmVyZW5jZV9pbl9tb250aHMvaW5kZXguanMnKSxcbiAgZGlmZmVyZW5jZUluUXVhcnRlcnM6IHJlcXVpcmUoJy4vZGlmZmVyZW5jZV9pbl9xdWFydGVycy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5TZWNvbmRzOiByZXF1aXJlKCcuL2RpZmZlcmVuY2VfaW5fc2Vjb25kcy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5XZWVrczogcmVxdWlyZSgnLi9kaWZmZXJlbmNlX2luX3dlZWtzL2luZGV4LmpzJyksXG4gIGRpZmZlcmVuY2VJblllYXJzOiByZXF1aXJlKCcuL2RpZmZlcmVuY2VfaW5feWVhcnMvaW5kZXguanMnKSxcbiAgZGlzdGFuY2VJbldvcmRzOiByZXF1aXJlKCcuL2Rpc3RhbmNlX2luX3dvcmRzL2luZGV4LmpzJyksXG4gIGRpc3RhbmNlSW5Xb3Jkc1N0cmljdDogcmVxdWlyZSgnLi9kaXN0YW5jZV9pbl93b3Jkc19zdHJpY3QvaW5kZXguanMnKSxcbiAgZGlzdGFuY2VJbldvcmRzVG9Ob3c6IHJlcXVpcmUoJy4vZGlzdGFuY2VfaW5fd29yZHNfdG9fbm93L2luZGV4LmpzJyksXG4gIGVhY2hEYXk6IHJlcXVpcmUoJy4vZWFjaF9kYXkvaW5kZXguanMnKSxcbiAgZW5kT2ZEYXk6IHJlcXVpcmUoJy4vZW5kX29mX2RheS9pbmRleC5qcycpLFxuICBlbmRPZkhvdXI6IHJlcXVpcmUoJy4vZW5kX29mX2hvdXIvaW5kZXguanMnKSxcbiAgZW5kT2ZJU09XZWVrOiByZXF1aXJlKCcuL2VuZF9vZl9pc29fd2Vlay9pbmRleC5qcycpLFxuICBlbmRPZklTT1llYXI6IHJlcXVpcmUoJy4vZW5kX29mX2lzb195ZWFyL2luZGV4LmpzJyksXG4gIGVuZE9mTWludXRlOiByZXF1aXJlKCcuL2VuZF9vZl9taW51dGUvaW5kZXguanMnKSxcbiAgZW5kT2ZNb250aDogcmVxdWlyZSgnLi9lbmRfb2ZfbW9udGgvaW5kZXguanMnKSxcbiAgZW5kT2ZRdWFydGVyOiByZXF1aXJlKCcuL2VuZF9vZl9xdWFydGVyL2luZGV4LmpzJyksXG4gIGVuZE9mU2Vjb25kOiByZXF1aXJlKCcuL2VuZF9vZl9zZWNvbmQvaW5kZXguanMnKSxcbiAgZW5kT2ZUb2RheTogcmVxdWlyZSgnLi9lbmRfb2ZfdG9kYXkvaW5kZXguanMnKSxcbiAgZW5kT2ZUb21vcnJvdzogcmVxdWlyZSgnLi9lbmRfb2ZfdG9tb3Jyb3cvaW5kZXguanMnKSxcbiAgZW5kT2ZXZWVrOiByZXF1aXJlKCcuL2VuZF9vZl93ZWVrL2luZGV4LmpzJyksXG4gIGVuZE9mWWVhcjogcmVxdWlyZSgnLi9lbmRfb2ZfeWVhci9pbmRleC5qcycpLFxuICBlbmRPZlllc3RlcmRheTogcmVxdWlyZSgnLi9lbmRfb2ZfeWVzdGVyZGF5L2luZGV4LmpzJyksXG4gIGZvcm1hdDogcmVxdWlyZSgnLi9mb3JtYXQvaW5kZXguanMnKSxcbiAgZ2V0RGF0ZTogcmVxdWlyZSgnLi9nZXRfZGF0ZS9pbmRleC5qcycpLFxuICBnZXREYXk6IHJlcXVpcmUoJy4vZ2V0X2RheS9pbmRleC5qcycpLFxuICBnZXREYXlPZlllYXI6IHJlcXVpcmUoJy4vZ2V0X2RheV9vZl95ZWFyL2luZGV4LmpzJyksXG4gIGdldERheXNJbk1vbnRoOiByZXF1aXJlKCcuL2dldF9kYXlzX2luX21vbnRoL2luZGV4LmpzJyksXG4gIGdldERheXNJblllYXI6IHJlcXVpcmUoJy4vZ2V0X2RheXNfaW5feWVhci9pbmRleC5qcycpLFxuICBnZXRIb3VyczogcmVxdWlyZSgnLi9nZXRfaG91cnMvaW5kZXguanMnKSxcbiAgZ2V0SVNPRGF5OiByZXF1aXJlKCcuL2dldF9pc29fZGF5L2luZGV4LmpzJyksXG4gIGdldElTT1dlZWs6IHJlcXVpcmUoJy4vZ2V0X2lzb193ZWVrL2luZGV4LmpzJyksXG4gIGdldElTT1dlZWtzSW5ZZWFyOiByZXF1aXJlKCcuL2dldF9pc29fd2Vla3NfaW5feWVhci9pbmRleC5qcycpLFxuICBnZXRJU09ZZWFyOiByZXF1aXJlKCcuL2dldF9pc29feWVhci9pbmRleC5qcycpLFxuICBnZXRNaWxsaXNlY29uZHM6IHJlcXVpcmUoJy4vZ2V0X21pbGxpc2Vjb25kcy9pbmRleC5qcycpLFxuICBnZXRNaW51dGVzOiByZXF1aXJlKCcuL2dldF9taW51dGVzL2luZGV4LmpzJyksXG4gIGdldE1vbnRoOiByZXF1aXJlKCcuL2dldF9tb250aC9pbmRleC5qcycpLFxuICBnZXRPdmVybGFwcGluZ0RheXNJblJhbmdlczogcmVxdWlyZSgnLi9nZXRfb3ZlcmxhcHBpbmdfZGF5c19pbl9yYW5nZXMvaW5kZXguanMnKSxcbiAgZ2V0UXVhcnRlcjogcmVxdWlyZSgnLi9nZXRfcXVhcnRlci9pbmRleC5qcycpLFxuICBnZXRTZWNvbmRzOiByZXF1aXJlKCcuL2dldF9zZWNvbmRzL2luZGV4LmpzJyksXG4gIGdldFRpbWU6IHJlcXVpcmUoJy4vZ2V0X3RpbWUvaW5kZXguanMnKSxcbiAgZ2V0WWVhcjogcmVxdWlyZSgnLi9nZXRfeWVhci9pbmRleC5qcycpLFxuICBpc0FmdGVyOiByZXF1aXJlKCcuL2lzX2FmdGVyL2luZGV4LmpzJyksXG4gIGlzQmVmb3JlOiByZXF1aXJlKCcuL2lzX2JlZm9yZS9pbmRleC5qcycpLFxuICBpc0RhdGU6IHJlcXVpcmUoJy4vaXNfZGF0ZS9pbmRleC5qcycpLFxuICBpc0VxdWFsOiByZXF1aXJlKCcuL2lzX2VxdWFsL2luZGV4LmpzJyksXG4gIGlzRmlyc3REYXlPZk1vbnRoOiByZXF1aXJlKCcuL2lzX2ZpcnN0X2RheV9vZl9tb250aC9pbmRleC5qcycpLFxuICBpc0ZyaWRheTogcmVxdWlyZSgnLi9pc19mcmlkYXkvaW5kZXguanMnKSxcbiAgaXNGdXR1cmU6IHJlcXVpcmUoJy4vaXNfZnV0dXJlL2luZGV4LmpzJyksXG4gIGlzTGFzdERheU9mTW9udGg6IHJlcXVpcmUoJy4vaXNfbGFzdF9kYXlfb2ZfbW9udGgvaW5kZXguanMnKSxcbiAgaXNMZWFwWWVhcjogcmVxdWlyZSgnLi9pc19sZWFwX3llYXIvaW5kZXguanMnKSxcbiAgaXNNb25kYXk6IHJlcXVpcmUoJy4vaXNfbW9uZGF5L2luZGV4LmpzJyksXG4gIGlzUGFzdDogcmVxdWlyZSgnLi9pc19wYXN0L2luZGV4LmpzJyksXG4gIGlzU2FtZURheTogcmVxdWlyZSgnLi9pc19zYW1lX2RheS9pbmRleC5qcycpLFxuICBpc1NhbWVIb3VyOiByZXF1aXJlKCcuL2lzX3NhbWVfaG91ci9pbmRleC5qcycpLFxuICBpc1NhbWVJU09XZWVrOiByZXF1aXJlKCcuL2lzX3NhbWVfaXNvX3dlZWsvaW5kZXguanMnKSxcbiAgaXNTYW1lSVNPWWVhcjogcmVxdWlyZSgnLi9pc19zYW1lX2lzb195ZWFyL2luZGV4LmpzJyksXG4gIGlzU2FtZU1pbnV0ZTogcmVxdWlyZSgnLi9pc19zYW1lX21pbnV0ZS9pbmRleC5qcycpLFxuICBpc1NhbWVNb250aDogcmVxdWlyZSgnLi9pc19zYW1lX21vbnRoL2luZGV4LmpzJyksXG4gIGlzU2FtZVF1YXJ0ZXI6IHJlcXVpcmUoJy4vaXNfc2FtZV9xdWFydGVyL2luZGV4LmpzJyksXG4gIGlzU2FtZVNlY29uZDogcmVxdWlyZSgnLi9pc19zYW1lX3NlY29uZC9pbmRleC5qcycpLFxuICBpc1NhbWVXZWVrOiByZXF1aXJlKCcuL2lzX3NhbWVfd2Vlay9pbmRleC5qcycpLFxuICBpc1NhbWVZZWFyOiByZXF1aXJlKCcuL2lzX3NhbWVfeWVhci9pbmRleC5qcycpLFxuICBpc1NhdHVyZGF5OiByZXF1aXJlKCcuL2lzX3NhdHVyZGF5L2luZGV4LmpzJyksXG4gIGlzU3VuZGF5OiByZXF1aXJlKCcuL2lzX3N1bmRheS9pbmRleC5qcycpLFxuICBpc1RoaXNIb3VyOiByZXF1aXJlKCcuL2lzX3RoaXNfaG91ci9pbmRleC5qcycpLFxuICBpc1RoaXNJU09XZWVrOiByZXF1aXJlKCcuL2lzX3RoaXNfaXNvX3dlZWsvaW5kZXguanMnKSxcbiAgaXNUaGlzSVNPWWVhcjogcmVxdWlyZSgnLi9pc190aGlzX2lzb195ZWFyL2luZGV4LmpzJyksXG4gIGlzVGhpc01pbnV0ZTogcmVxdWlyZSgnLi9pc190aGlzX21pbnV0ZS9pbmRleC5qcycpLFxuICBpc1RoaXNNb250aDogcmVxdWlyZSgnLi9pc190aGlzX21vbnRoL2luZGV4LmpzJyksXG4gIGlzVGhpc1F1YXJ0ZXI6IHJlcXVpcmUoJy4vaXNfdGhpc19xdWFydGVyL2luZGV4LmpzJyksXG4gIGlzVGhpc1NlY29uZDogcmVxdWlyZSgnLi9pc190aGlzX3NlY29uZC9pbmRleC5qcycpLFxuICBpc1RoaXNXZWVrOiByZXF1aXJlKCcuL2lzX3RoaXNfd2Vlay9pbmRleC5qcycpLFxuICBpc1RoaXNZZWFyOiByZXF1aXJlKCcuL2lzX3RoaXNfeWVhci9pbmRleC5qcycpLFxuICBpc1RodXJzZGF5OiByZXF1aXJlKCcuL2lzX3RodXJzZGF5L2luZGV4LmpzJyksXG4gIGlzVG9kYXk6IHJlcXVpcmUoJy4vaXNfdG9kYXkvaW5kZXguanMnKSxcbiAgaXNUb21vcnJvdzogcmVxdWlyZSgnLi9pc190b21vcnJvdy9pbmRleC5qcycpLFxuICBpc1R1ZXNkYXk6IHJlcXVpcmUoJy4vaXNfdHVlc2RheS9pbmRleC5qcycpLFxuICBpc1ZhbGlkOiByZXF1aXJlKCcuL2lzX3ZhbGlkL2luZGV4LmpzJyksXG4gIGlzV2VkbmVzZGF5OiByZXF1aXJlKCcuL2lzX3dlZG5lc2RheS9pbmRleC5qcycpLFxuICBpc1dlZWtlbmQ6IHJlcXVpcmUoJy4vaXNfd2Vla2VuZC9pbmRleC5qcycpLFxuICBpc1dpdGhpblJhbmdlOiByZXF1aXJlKCcuL2lzX3dpdGhpbl9yYW5nZS9pbmRleC5qcycpLFxuICBpc1llc3RlcmRheTogcmVxdWlyZSgnLi9pc195ZXN0ZXJkYXkvaW5kZXguanMnKSxcbiAgbGFzdERheU9mSVNPV2VlazogcmVxdWlyZSgnLi9sYXN0X2RheV9vZl9pc29fd2Vlay9pbmRleC5qcycpLFxuICBsYXN0RGF5T2ZJU09ZZWFyOiByZXF1aXJlKCcuL2xhc3RfZGF5X29mX2lzb195ZWFyL2luZGV4LmpzJyksXG4gIGxhc3REYXlPZk1vbnRoOiByZXF1aXJlKCcuL2xhc3RfZGF5X29mX21vbnRoL2luZGV4LmpzJyksXG4gIGxhc3REYXlPZlF1YXJ0ZXI6IHJlcXVpcmUoJy4vbGFzdF9kYXlfb2ZfcXVhcnRlci9pbmRleC5qcycpLFxuICBsYXN0RGF5T2ZXZWVrOiByZXF1aXJlKCcuL2xhc3RfZGF5X29mX3dlZWsvaW5kZXguanMnKSxcbiAgbGFzdERheU9mWWVhcjogcmVxdWlyZSgnLi9sYXN0X2RheV9vZl95ZWFyL2luZGV4LmpzJyksXG4gIG1heDogcmVxdWlyZSgnLi9tYXgvaW5kZXguanMnKSxcbiAgbWluOiByZXF1aXJlKCcuL21pbi9pbmRleC5qcycpLFxuICBwYXJzZTogcmVxdWlyZSgnLi9wYXJzZS9pbmRleC5qcycpLFxuICBzZXREYXRlOiByZXF1aXJlKCcuL3NldF9kYXRlL2luZGV4LmpzJyksXG4gIHNldERheTogcmVxdWlyZSgnLi9zZXRfZGF5L2luZGV4LmpzJyksXG4gIHNldERheU9mWWVhcjogcmVxdWlyZSgnLi9zZXRfZGF5X29mX3llYXIvaW5kZXguanMnKSxcbiAgc2V0SG91cnM6IHJlcXVpcmUoJy4vc2V0X2hvdXJzL2luZGV4LmpzJyksXG4gIHNldElTT0RheTogcmVxdWlyZSgnLi9zZXRfaXNvX2RheS9pbmRleC5qcycpLFxuICBzZXRJU09XZWVrOiByZXF1aXJlKCcuL3NldF9pc29fd2Vlay9pbmRleC5qcycpLFxuICBzZXRJU09ZZWFyOiByZXF1aXJlKCcuL3NldF9pc29feWVhci9pbmRleC5qcycpLFxuICBzZXRNaWxsaXNlY29uZHM6IHJlcXVpcmUoJy4vc2V0X21pbGxpc2Vjb25kcy9pbmRleC5qcycpLFxuICBzZXRNaW51dGVzOiByZXF1aXJlKCcuL3NldF9taW51dGVzL2luZGV4LmpzJyksXG4gIHNldE1vbnRoOiByZXF1aXJlKCcuL3NldF9tb250aC9pbmRleC5qcycpLFxuICBzZXRRdWFydGVyOiByZXF1aXJlKCcuL3NldF9xdWFydGVyL2luZGV4LmpzJyksXG4gIHNldFNlY29uZHM6IHJlcXVpcmUoJy4vc2V0X3NlY29uZHMvaW5kZXguanMnKSxcbiAgc2V0WWVhcjogcmVxdWlyZSgnLi9zZXRfeWVhci9pbmRleC5qcycpLFxuICBzdGFydE9mRGF5OiByZXF1aXJlKCcuL3N0YXJ0X29mX2RheS9pbmRleC5qcycpLFxuICBzdGFydE9mSG91cjogcmVxdWlyZSgnLi9zdGFydF9vZl9ob3VyL2luZGV4LmpzJyksXG4gIHN0YXJ0T2ZJU09XZWVrOiByZXF1aXJlKCcuL3N0YXJ0X29mX2lzb193ZWVrL2luZGV4LmpzJyksXG4gIHN0YXJ0T2ZJU09ZZWFyOiByZXF1aXJlKCcuL3N0YXJ0X29mX2lzb195ZWFyL2luZGV4LmpzJyksXG4gIHN0YXJ0T2ZNaW51dGU6IHJlcXVpcmUoJy4vc3RhcnRfb2ZfbWludXRlL2luZGV4LmpzJyksXG4gIHN0YXJ0T2ZNb250aDogcmVxdWlyZSgnLi9zdGFydF9vZl9tb250aC9pbmRleC5qcycpLFxuICBzdGFydE9mUXVhcnRlcjogcmVxdWlyZSgnLi9zdGFydF9vZl9xdWFydGVyL2luZGV4LmpzJyksXG4gIHN0YXJ0T2ZTZWNvbmQ6IHJlcXVpcmUoJy4vc3RhcnRfb2Zfc2Vjb25kL2luZGV4LmpzJyksXG4gIHN0YXJ0T2ZUb2RheTogcmVxdWlyZSgnLi9zdGFydF9vZl90b2RheS9pbmRleC5qcycpLFxuICBzdGFydE9mVG9tb3Jyb3c6IHJlcXVpcmUoJy4vc3RhcnRfb2ZfdG9tb3Jyb3cvaW5kZXguanMnKSxcbiAgc3RhcnRPZldlZWs6IHJlcXVpcmUoJy4vc3RhcnRfb2Zfd2Vlay9pbmRleC5qcycpLFxuICBzdGFydE9mWWVhcjogcmVxdWlyZSgnLi9zdGFydF9vZl95ZWFyL2luZGV4LmpzJyksXG4gIHN0YXJ0T2ZZZXN0ZXJkYXk6IHJlcXVpcmUoJy4vc3RhcnRfb2ZfeWVzdGVyZGF5L2luZGV4LmpzJyksXG4gIHN1YkRheXM6IHJlcXVpcmUoJy4vc3ViX2RheXMvaW5kZXguanMnKSxcbiAgc3ViSG91cnM6IHJlcXVpcmUoJy4vc3ViX2hvdXJzL2luZGV4LmpzJyksXG4gIHN1YklTT1llYXJzOiByZXF1aXJlKCcuL3N1Yl9pc29feWVhcnMvaW5kZXguanMnKSxcbiAgc3ViTWlsbGlzZWNvbmRzOiByZXF1aXJlKCcuL3N1Yl9taWxsaXNlY29uZHMvaW5kZXguanMnKSxcbiAgc3ViTWludXRlczogcmVxdWlyZSgnLi9zdWJfbWludXRlcy9pbmRleC5qcycpLFxuICBzdWJNb250aHM6IHJlcXVpcmUoJy4vc3ViX21vbnRocy9pbmRleC5qcycpLFxuICBzdWJRdWFydGVyczogcmVxdWlyZSgnLi9zdWJfcXVhcnRlcnMvaW5kZXguanMnKSxcbiAgc3ViU2Vjb25kczogcmVxdWlyZSgnLi9zdWJfc2Vjb25kcy9pbmRleC5qcycpLFxuICBzdWJXZWVrczogcmVxdWlyZSgnLi9zdWJfd2Vla3MvaW5kZXguanMnKSxcbiAgc3ViWWVhcnM6IHJlcXVpcmUoJy4vc3ViX3llYXJzL2luZGV4LmpzJylcbn1cbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBmaXJzdCBkYXRlIGFmdGVyIHRoZSBzZWNvbmQgb25lP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGZpcnN0IGRhdGUgYWZ0ZXIgdGhlIHNlY29uZCBvbmU/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0aGF0IHNob3VsZCBiZSBhZnRlciB0aGUgb3RoZXIgb25lIHRvIHJldHVybiB0cnVlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVRvQ29tcGFyZSAtIHRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBmaXJzdCBkYXRlIGlzIGFmdGVyIHRoZSBzZWNvbmQgZGF0ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJcyAxMCBKdWx5IDE5ODkgYWZ0ZXIgMTEgRmVicnVhcnkgMTk4Nz9cbiAqIHZhciByZXN1bHQgPSBpc0FmdGVyKG5ldyBEYXRlKDE5ODksIDYsIDEwKSwgbmV3IERhdGUoMTk4NywgMSwgMTEpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzQWZ0ZXIgKGRpcnR5RGF0ZSwgZGlydHlEYXRlVG9Db21wYXJlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgZGF0ZVRvQ29tcGFyZSA9IHBhcnNlKGRpcnR5RGF0ZVRvQ29tcGFyZSlcbiAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpID4gZGF0ZVRvQ29tcGFyZS5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FmdGVyXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZmlyc3QgZGF0ZSBiZWZvcmUgdGhlIHNlY29uZCBvbmU/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZmlyc3QgZGF0ZSBiZWZvcmUgdGhlIHNlY29uZCBvbmU/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0aGF0IHNob3VsZCBiZSBiZWZvcmUgdGhlIG90aGVyIG9uZSB0byByZXR1cm4gdHJ1ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVUb0NvbXBhcmUgLSB0aGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBkYXRlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElzIDEwIEp1bHkgMTk4OSBiZWZvcmUgMTEgRmVicnVhcnkgMTk4Nz9cbiAqIHZhciByZXN1bHQgPSBpc0JlZm9yZShuZXcgRGF0ZSgxOTg5LCA2LCAxMCksIG5ldyBEYXRlKDE5ODcsIDEsIDExKSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCZWZvcmUgKGRpcnR5RGF0ZSwgZGlydHlEYXRlVG9Db21wYXJlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgZGF0ZVRvQ29tcGFyZSA9IHBhcnNlKGRpcnR5RGF0ZVRvQ29tcGFyZSlcbiAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIDwgZGF0ZVRvQ29tcGFyZS5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0JlZm9yZVxuIiwiLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBhcmd1bWVudCBhbiBpbnN0YW5jZSBvZiBEYXRlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGFyZ3VtZW50IGFuIGluc3RhbmNlIG9mIERhdGU/XG4gKlxuICogQHBhcmFtIHsqfSBhcmd1bWVudCAtIHRoZSBhcmd1bWVudCB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElzICdtYXlvbm5haXNlJyBhIERhdGU/XG4gKiB2YXIgcmVzdWx0ID0gaXNEYXRlKCdtYXlvbm5haXNlJylcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgaW5zdGFuY2VvZiBEYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNEYXRlXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGVxdWFsP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQXJlIHRoZSBnaXZlbiBkYXRlcyBlcXVhbD9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZXMgYXJlIGVxdWFsXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSAyIEp1bHkgMjAxNCAwNjozMDo0NS4wMDAgYW5kIDIgSnVseSAyMDE0IDA2OjMwOjQ1LjUwMCBlcXVhbD9cbiAqIHZhciByZXN1bHQgPSBpc0VxdWFsKFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCA2LCAzMCwgNDUsIDApXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDYsIDMwLCA0NSwgNTAwKVxuICogKVxuICogLy89PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0VxdWFsIChkaXJ0eUxlZnREYXRlLCBkaXJ0eVJpZ2h0RGF0ZSkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eUxlZnREYXRlKVxuICB2YXIgZGF0ZVJpZ2h0ID0gcGFyc2UoZGlydHlSaWdodERhdGUpXG4gIHJldHVybiBkYXRlTGVmdC5nZXRUaW1lKCkgPT09IGRhdGVSaWdodC5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VxdWFsXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHRoZSBmaXJzdCBkYXkgb2YgYSBtb250aD9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIHRoZSBmaXJzdCBkYXkgb2YgYSBtb250aD9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgdGhlIGZpcnN0IGRheSBvZiBhIG1vbnRoXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElzIDEgU2VwdGVtYmVyIDIwMTQgdGhlIGZpcnN0IGRheSBvZiBhIG1vbnRoP1xuICogdmFyIHJlc3VsdCA9IGlzRmlyc3REYXlPZk1vbnRoKG5ldyBEYXRlKDIwMTQsIDgsIDEpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzRmlyc3REYXlPZk1vbnRoIChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIHBhcnNlKGRpcnR5RGF0ZSkuZ2V0RGF0ZSgpID09PSAxXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGaXJzdERheU9mTW9udGhcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgV2Vla2RheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBGcmlkYXk/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSBGcmlkYXk/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIEZyaWRheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJcyAyNiBTZXB0ZW1iZXIgMjAxNCBGcmlkYXk/XG4gKiB2YXIgcmVzdWx0ID0gaXNGcmlkYXkobmV3IERhdGUoMjAxNCwgOCwgMjYpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzRnJpZGF5IChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIHBhcnNlKGRpcnR5RGF0ZSkuZ2V0RGF5KCkgPT09IDVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZyaWRheVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIGZ1dHVyZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBmdXR1cmU/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIGluIHRoZSBmdXR1cmVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQsIGlzIDMxIERlY2VtYmVyIDIwMTQgaW4gdGhlIGZ1dHVyZT9cbiAqIHZhciByZXN1bHQgPSBpc0Z1dHVyZShuZXcgRGF0ZSgyMDE0LCAxMSwgMzEpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzRnV0dXJlIChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIHBhcnNlKGRpcnR5RGF0ZSkuZ2V0VGltZSgpID4gbmV3IERhdGUoKS5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1dHVyZVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxudmFyIGVuZE9mRGF5ID0gcmVxdWlyZSgnLi4vZW5kX29mX2RheS9pbmRleC5qcycpXG52YXIgZW5kT2ZNb250aCA9IHJlcXVpcmUoJy4uL2VuZF9vZl9tb250aC9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHRoZSBsYXN0IGRheSBvZiBhIG1vbnRoP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgdGhlIGxhc3QgZGF5IG9mIGEgbW9udGg/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIHRoZSBsYXN0IGRheSBvZiBhIG1vbnRoXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElzIDI4IEZlYnJ1YXJ5IDIwMTQgdGhlIGxhc3QgZGF5IG9mIGEgbW9udGg/XG4gKiB2YXIgcmVzdWx0ID0gaXNMYXN0RGF5T2ZNb250aChuZXcgRGF0ZSgyMDE0LCAxLCAyOCkpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNMYXN0RGF5T2ZNb250aCAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICByZXR1cm4gZW5kT2ZEYXkoZGF0ZSkuZ2V0VGltZSgpID09PSBlbmRPZk1vbnRoKGRhdGUpLmdldFRpbWUoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGFzdERheU9mTW9udGhcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgbGVhcCB5ZWFyP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIGxlYXAgeWVhcj9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgaW4gdGhlIGxlYXAgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJcyAxIFNlcHRlbWJlciAyMDEyIGluIHRoZSBsZWFwIHllYXI/XG4gKiB2YXIgcmVzdWx0ID0gaXNMZWFwWWVhcihuZXcgRGF0ZSgyMDEyLCA4LCAxKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc0xlYXBZZWFyIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gIHJldHVybiB5ZWFyICUgNDAwID09PSAwIHx8IHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlYXBZZWFyXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWtkYXkgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgTW9uZGF5P1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgTW9uZGF5P1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBNb25kYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSXMgMjIgU2VwdGVtYmVyIDIwMTQgTW9uZGF5P1xuICogdmFyIHJlc3VsdCA9IGlzTW9uZGF5KG5ldyBEYXRlKDIwMTQsIDgsIDIyKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc01vbmRheSAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBwYXJzZShkaXJ0eURhdGUpLmdldERheSgpID09PSAxXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNNb25kYXlcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBwYXN0P1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHBhc3Q/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIGluIHRoZSBwYXN0XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDYgT2N0b2JlciAyMDE0LCBpcyAyIEp1bHkgMjAxNCBpbiB0aGUgcGFzdD9cbiAqIHZhciByZXN1bHQgPSBpc1Bhc3QobmV3IERhdGUoMjAxNCwgNiwgMikpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQYXN0IChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIHBhcnNlKGRpcnR5RGF0ZSkuZ2V0VGltZSgpIDwgbmV3IERhdGUoKS5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Bhc3RcbiIsInZhciBzdGFydE9mRGF5ID0gcmVxdWlyZSgnLi4vc3RhcnRfb2ZfZGF5L2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgZGF5P1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSBkYXk/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZXMgYXJlIGluIHRoZSBzYW1lIGRheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgNCBTZXB0ZW1iZXIgMDY6MDA6MDAgYW5kIDQgU2VwdGVtYmVyIDE4OjAwOjAwIGluIHRoZSBzYW1lIGRheT9cbiAqIHZhciByZXN1bHQgPSBpc1NhbWVEYXkoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDQsIDYsIDApLFxuICogICBuZXcgRGF0ZSgyMDE0LCA4LCA0LCAxOCwgMClcbiAqIClcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1NhbWVEYXkgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkYXRlTGVmdFN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KGRpcnR5RGF0ZUxlZnQpXG4gIHZhciBkYXRlUmlnaHRTdGFydE9mRGF5ID0gc3RhcnRPZkRheShkaXJ0eURhdGVSaWdodClcblxuICByZXR1cm4gZGF0ZUxlZnRTdGFydE9mRGF5LmdldFRpbWUoKSA9PT0gZGF0ZVJpZ2h0U3RhcnRPZkRheS5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1NhbWVEYXlcbiIsInZhciBzdGFydE9mSG91ciA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX2hvdXIvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBIb3VyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgaG91cj9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgaG91cj9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgaG91clxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgNCBTZXB0ZW1iZXIgMjAxNCAwNjowMDowMCBhbmQgNCBTZXB0ZW1iZXIgMDY6MzA6MDAgaW4gdGhlIHNhbWUgaG91cj9cbiAqIHZhciByZXN1bHQgPSBpc1NhbWVIb3VyKFxuICogICBuZXcgRGF0ZSgyMDE0LCA4LCA0LCA2LCAwKSxcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgNCwgNiwgMzApXG4gKiApXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNTYW1lSG91ciAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRhdGVMZWZ0U3RhcnRPZkhvdXIgPSBzdGFydE9mSG91cihkaXJ0eURhdGVMZWZ0KVxuICB2YXIgZGF0ZVJpZ2h0U3RhcnRPZkhvdXIgPSBzdGFydE9mSG91cihkaXJ0eURhdGVSaWdodClcblxuICByZXR1cm4gZGF0ZUxlZnRTdGFydE9mSG91ci5nZXRUaW1lKCkgPT09IGRhdGVSaWdodFN0YXJ0T2ZIb3VyLmdldFRpbWUoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2FtZUhvdXJcbiIsInZhciBpc1NhbWVXZWVrID0gcmVxdWlyZSgnLi4vaXNfc2FtZV93ZWVrL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSBJU08gd2Vlaz9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgSVNPIHdlZWs/XG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSBJU08gd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgMSBTZXB0ZW1iZXIgMjAxNCBhbmQgNyBTZXB0ZW1iZXIgMjAxNCBpbiB0aGUgc2FtZSBJU08gd2Vlaz9cbiAqIHZhciByZXN1bHQgPSBpc1NhbWVJU09XZWVrKFxuICogICBuZXcgRGF0ZSgyMDE0LCA4LCAxKSxcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgNylcbiAqIClcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1NhbWVJU09XZWVrIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICByZXR1cm4gaXNTYW1lV2VlayhkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCwge3dlZWtTdGFydHNPbjogMX0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTYW1lSVNPV2Vla1xuIiwidmFyIHN0YXJ0T2ZJU09ZZWFyID0gcmVxdWlyZSgnLi4vc3RhcnRfb2ZfaXNvX3llYXIvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhcj9cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZXMgYXJlIGluIHRoZSBzYW1lIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSAyOSBEZWNlbWJlciAyMDAzIGFuZCAyIEphbnVhcnkgMjAwNSBpbiB0aGUgc2FtZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhcj9cbiAqIHZhciByZXN1bHQgPSBpc1NhbWVJU09ZZWFyKFxuICogICBuZXcgRGF0ZSgyMDAzLCAxMSwgMjkpLFxuICogICBuZXcgRGF0ZSgyMDA1LCAwLCAyKVxuICogKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzU2FtZUlTT1llYXIgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkYXRlTGVmdFN0YXJ0T2ZZZWFyID0gc3RhcnRPZklTT1llYXIoZGlydHlEYXRlTGVmdClcbiAgdmFyIGRhdGVSaWdodFN0YXJ0T2ZZZWFyID0gc3RhcnRPZklTT1llYXIoZGlydHlEYXRlUmlnaHQpXG5cbiAgcmV0dXJuIGRhdGVMZWZ0U3RhcnRPZlllYXIuZ2V0VGltZSgpID09PSBkYXRlUmlnaHRTdGFydE9mWWVhci5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1NhbWVJU09ZZWFyXG4iLCJ2YXIgc3RhcnRPZk1pbnV0ZSA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX21pbnV0ZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1pbnV0ZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIG1pbnV0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgbWludXRlP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSBtaW51dGVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyIDIwMTQgMDY6MzA6MDAgYW5kIDQgU2VwdGVtYmVyIDIwMTQgMDY6MzA6MTVcbiAqIC8vIGluIHRoZSBzYW1lIG1pbnV0ZT9cbiAqIHZhciByZXN1bHQgPSBpc1NhbWVNaW51dGUoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDQsIDYsIDMwKSxcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgNCwgNiwgMzAsIDE1KVxuICogKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzU2FtZU1pbnV0ZSAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRhdGVMZWZ0U3RhcnRPZk1pbnV0ZSA9IHN0YXJ0T2ZNaW51dGUoZGlydHlEYXRlTGVmdClcbiAgdmFyIGRhdGVSaWdodFN0YXJ0T2ZNaW51dGUgPSBzdGFydE9mTWludXRlKGRpcnR5RGF0ZVJpZ2h0KVxuXG4gIHJldHVybiBkYXRlTGVmdFN0YXJ0T2ZNaW51dGUuZ2V0VGltZSgpID09PSBkYXRlUmlnaHRTdGFydE9mTWludXRlLmdldFRpbWUoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2FtZU1pbnV0ZVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIG1vbnRoP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSBtb250aD9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgbW9udGhcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDIgU2VwdGVtYmVyIDIwMTQgYW5kIDI1IFNlcHRlbWJlciAyMDE0IGluIHRoZSBzYW1lIG1vbnRoP1xuICogdmFyIHJlc3VsdCA9IGlzU2FtZU1vbnRoKFxuICogICBuZXcgRGF0ZSgyMDE0LCA4LCAyKSxcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgMjUpXG4gKiApXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNTYW1lTW9udGggKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkYXRlTGVmdCA9IHBhcnNlKGRpcnR5RGF0ZUxlZnQpXG4gIHZhciBkYXRlUmlnaHQgPSBwYXJzZShkaXJ0eURhdGVSaWdodClcbiAgcmV0dXJuIGRhdGVMZWZ0LmdldEZ1bGxZZWFyKCkgPT09IGRhdGVSaWdodC5nZXRGdWxsWWVhcigpICYmXG4gICAgZGF0ZUxlZnQuZ2V0TW9udGgoKSA9PT0gZGF0ZVJpZ2h0LmdldE1vbnRoKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1NhbWVNb250aFxuIiwidmFyIHN0YXJ0T2ZRdWFydGVyID0gcmVxdWlyZSgnLi4vc3RhcnRfb2ZfcXVhcnRlci9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFF1YXJ0ZXIgSGVscGVyc1xuICogQHN1bW1hcnkgQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSB5ZWFyIHF1YXJ0ZXI/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIHllYXIgcXVhcnRlcj9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgcXVhcnRlclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgMSBKYW51YXJ5IDIwMTQgYW5kIDggTWFyY2ggMjAxNCBpbiB0aGUgc2FtZSBxdWFydGVyP1xuICogdmFyIHJlc3VsdCA9IGlzU2FtZVF1YXJ0ZXIoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDAsIDEpLFxuICogICBuZXcgRGF0ZSgyMDE0LCAyLCA4KVxuICogKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzU2FtZVF1YXJ0ZXIgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkYXRlTGVmdFN0YXJ0T2ZRdWFydGVyID0gc3RhcnRPZlF1YXJ0ZXIoZGlydHlEYXRlTGVmdClcbiAgdmFyIGRhdGVSaWdodFN0YXJ0T2ZRdWFydGVyID0gc3RhcnRPZlF1YXJ0ZXIoZGlydHlEYXRlUmlnaHQpXG5cbiAgcmV0dXJuIGRhdGVMZWZ0U3RhcnRPZlF1YXJ0ZXIuZ2V0VGltZSgpID09PSBkYXRlUmlnaHRTdGFydE9mUXVhcnRlci5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1NhbWVRdWFydGVyXG4iLCJ2YXIgc3RhcnRPZlNlY29uZCA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX3NlY29uZC9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFNlY29uZCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIHNlY29uZD9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgc2Vjb25kP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSBzZWNvbmRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyIDIwMTQgMDY6MzA6MTUuMDAwIGFuZCA0IFNlcHRlbWJlciAyMDE0IDA2OjMwLjE1LjUwMFxuICogLy8gaW4gdGhlIHNhbWUgc2Vjb25kP1xuICogdmFyIHJlc3VsdCA9IGlzU2FtZVNlY29uZChcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgNCwgNiwgMzAsIDE1KSxcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgNCwgNiwgMzAsIDE1LCA1MDApXG4gKiApXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNTYW1lU2Vjb25kIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnRTdGFydE9mU2Vjb25kID0gc3RhcnRPZlNlY29uZChkaXJ0eURhdGVMZWZ0KVxuICB2YXIgZGF0ZVJpZ2h0U3RhcnRPZlNlY29uZCA9IHN0YXJ0T2ZTZWNvbmQoZGlydHlEYXRlUmlnaHQpXG5cbiAgcmV0dXJuIGRhdGVMZWZ0U3RhcnRPZlNlY29uZC5nZXRUaW1lKCkgPT09IGRhdGVSaWdodFN0YXJ0T2ZTZWNvbmQuZ2V0VGltZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTYW1lU2Vjb25kXG4iLCJ2YXIgc3RhcnRPZldlZWsgPSByZXF1aXJlKCcuLi9zdGFydF9vZl93ZWVrL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIHdlZWs/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIHdlZWs/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLndlZWtTdGFydHNPbj0wXSAtIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrICgwIC0gU3VuZGF5KVxuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgMzEgQXVndXN0IDIwMTQgYW5kIDQgU2VwdGVtYmVyIDIwMTQgaW4gdGhlIHNhbWUgd2Vlaz9cbiAqIHZhciByZXN1bHQgPSBpc1NhbWVXZWVrKFxuICogICBuZXcgRGF0ZSgyMDE0LCA3LCAzMSksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDQpXG4gKiApXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgd2VlayBzdGFydHMgd2l0aCBNb25kYXksXG4gKiAvLyBhcmUgMzEgQXVndXN0IDIwMTQgYW5kIDQgU2VwdGVtYmVyIDIwMTQgaW4gdGhlIHNhbWUgd2Vlaz9cbiAqIHZhciByZXN1bHQgPSBpc1NhbWVXZWVrKFxuICogICBuZXcgRGF0ZSgyMDE0LCA3LCAzMSksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDQpLFxuICogICB7d2Vla1N0YXJ0c09uOiAxfVxuICogKVxuICogLy89PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1NhbWVXZWVrIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCwgZGlydHlPcHRpb25zKSB7XG4gIHZhciBkYXRlTGVmdFN0YXJ0T2ZXZWVrID0gc3RhcnRPZldlZWsoZGlydHlEYXRlTGVmdCwgZGlydHlPcHRpb25zKVxuICB2YXIgZGF0ZVJpZ2h0U3RhcnRPZldlZWsgPSBzdGFydE9mV2VlayhkaXJ0eURhdGVSaWdodCwgZGlydHlPcHRpb25zKVxuXG4gIHJldHVybiBkYXRlTGVmdFN0YXJ0T2ZXZWVrLmdldFRpbWUoKSA9PT0gZGF0ZVJpZ2h0U3RhcnRPZldlZWsuZ2V0VGltZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTYW1lV2Vla1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgeWVhcj9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgeWVhcj9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgMiBTZXB0ZW1iZXIgMjAxNCBhbmQgMjUgU2VwdGVtYmVyIDIwMTQgaW4gdGhlIHNhbWUgeWVhcj9cbiAqIHZhciByZXN1bHQgPSBpc1NhbWVZZWFyKFxuICogICBuZXcgRGF0ZSgyMDE0LCA4LCAyKSxcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgMjUpXG4gKiApXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNTYW1lWWVhciAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlEYXRlTGVmdClcbiAgdmFyIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5RGF0ZVJpZ2h0KVxuICByZXR1cm4gZGF0ZUxlZnQuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZVJpZ2h0LmdldEZ1bGxZZWFyKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1NhbWVZZWFyXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWtkYXkgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgU2F0dXJkYXk/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSBTYXR1cmRheT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgU2F0dXJkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSXMgMjcgU2VwdGVtYmVyIDIwMTQgU2F0dXJkYXk/XG4gKiB2YXIgcmVzdWx0ID0gaXNTYXR1cmRheShuZXcgRGF0ZSgyMDE0LCA4LCAyNykpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNTYXR1cmRheSAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBwYXJzZShkaXJ0eURhdGUpLmdldERheSgpID09PSA2XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTYXR1cmRheVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrZGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIFN1bmRheT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIFN1bmRheT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgU3VuZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElzIDIxIFNlcHRlbWJlciAyMDE0IFN1bmRheT9cbiAqIHZhciByZXN1bHQgPSBpc1N1bmRheShuZXcgRGF0ZSgyMDE0LCA4LCAyMSkpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNTdW5kYXkgKGRpcnR5RGF0ZSkge1xuICByZXR1cm4gcGFyc2UoZGlydHlEYXRlKS5nZXREYXkoKSA9PT0gMFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3VuZGF5XG4iLCJ2YXIgaXNTYW1lSG91ciA9IHJlcXVpcmUoJy4uL2lzX3NhbWVfaG91ci9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IEhvdXIgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgaG91ciBhcyB0aGUgY3VycmVudCBkYXRlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgaG91ciBhcyB0aGUgY3VycmVudCBkYXRlP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBpbiB0aGlzIGhvdXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgbm93IGlzIDI1IFNlcHRlbWJlciAyMDE0IDE4OjMwOjE1LjUwMCxcbiAqIC8vIGlzIDI1IFNlcHRlbWJlciAyMDE0IDE4OjAwOjAwIGluIHRoaXMgaG91cj9cbiAqIHZhciByZXN1bHQgPSBpc1RoaXNIb3VyKG5ldyBEYXRlKDIwMTQsIDgsIDI1LCAxOCkpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNUaGlzSG91ciAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBpc1NhbWVIb3VyKG5ldyBEYXRlKCksIGRpcnR5RGF0ZSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1RoaXNIb3VyXG4iLCJ2YXIgaXNTYW1lSVNPV2VlayA9IHJlcXVpcmUoJy4uL2lzX3NhbWVfaXNvX3dlZWsvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBJU08gV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgc2FtZSBJU08gd2VlayBhcyB0aGUgY3VycmVudCBkYXRlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgSVNPIHdlZWsgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIGluIHRoaXMgSVNPIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMjUgU2VwdGVtYmVyIDIwMTQsIGlzIDIyIFNlcHRlbWJlciAyMDE0IGluIHRoaXMgSVNPIHdlZWs/XG4gKiB2YXIgcmVzdWx0ID0gaXNUaGlzSVNPV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyMikpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNUaGlzSVNPV2VlayAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBpc1NhbWVJU09XZWVrKG5ldyBEYXRlKCksIGRpcnR5RGF0ZSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1RoaXNJU09XZWVrXG4iLCJ2YXIgaXNTYW1lSVNPWWVhciA9IHJlcXVpcmUoJy4uL2lzX3NhbWVfaXNvX3llYXIvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgc2FtZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBhcyB0aGUgY3VycmVudCBkYXRlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIGluIHRoaXMgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMjUgU2VwdGVtYmVyIDIwMTQsXG4gKiAvLyBpcyAzMCBEZWNlbWJlciAyMDEzIGluIHRoaXMgSVNPIHdlZWstbnVtYmVyaW5nIHllYXI/XG4gKiB2YXIgcmVzdWx0ID0gaXNUaGlzSVNPWWVhcihuZXcgRGF0ZSgyMDEzLCAxMSwgMzApKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzVGhpc0lTT1llYXIgKGRpcnR5RGF0ZSkge1xuICByZXR1cm4gaXNTYW1lSVNPWWVhcihuZXcgRGF0ZSgpLCBkaXJ0eURhdGUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUaGlzSVNPWWVhclxuIiwidmFyIGlzU2FtZU1pbnV0ZSA9IHJlcXVpcmUoJy4uL2lzX3NhbWVfbWludXRlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTWludXRlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIG1pbnV0ZSBhcyB0aGUgY3VycmVudCBkYXRlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgbWludXRlIGFzIHRoZSBjdXJyZW50IGRhdGU/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIGluIHRoaXMgbWludXRlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIG5vdyBpcyAyNSBTZXB0ZW1iZXIgMjAxNCAxODozMDoxNS41MDAsXG4gKiAvLyBpcyAyNSBTZXB0ZW1iZXIgMjAxNCAxODozMDowMCBpbiB0aGlzIG1pbnV0ZT9cbiAqIHZhciByZXN1bHQgPSBpc1RoaXNNaW51dGUobmV3IERhdGUoMjAxNCwgOCwgMjUsIDE4LCAzMCkpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNUaGlzTWludXRlIChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIGlzU2FtZU1pbnV0ZShuZXcgRGF0ZSgpLCBkaXJ0eURhdGUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUaGlzTWludXRlXG4iLCJ2YXIgaXNTYW1lTW9udGggPSByZXF1aXJlKCcuLi9pc19zYW1lX21vbnRoL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgbW9udGggYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIG1vbnRoIGFzIHRoZSBjdXJyZW50IGRhdGU/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIGluIHRoaXMgbW9udGhcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMjUgU2VwdGVtYmVyIDIwMTQsIGlzIDE1IFNlcHRlbWJlciAyMDE0IGluIHRoaXMgbW9udGg/XG4gKiB2YXIgcmVzdWx0ID0gaXNUaGlzTW9udGgobmV3IERhdGUoMjAxNCwgOCwgMTUpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzVGhpc01vbnRoIChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIGlzU2FtZU1vbnRoKG5ldyBEYXRlKCksIGRpcnR5RGF0ZSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1RoaXNNb250aFxuIiwidmFyIGlzU2FtZVF1YXJ0ZXIgPSByZXF1aXJlKCcuLi9pc19zYW1lX3F1YXJ0ZXIvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBRdWFydGVyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIHF1YXJ0ZXIgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIHF1YXJ0ZXIgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgaW4gdGhpcyBxdWFydGVyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDI1IFNlcHRlbWJlciAyMDE0LCBpcyAyIEp1bHkgMjAxNCBpbiB0aGlzIHF1YXJ0ZXI/XG4gKiB2YXIgcmVzdWx0ID0gaXNUaGlzUXVhcnRlcihuZXcgRGF0ZSgyMDE0LCA2LCAyKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1RoaXNRdWFydGVyIChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIGlzU2FtZVF1YXJ0ZXIobmV3IERhdGUoKSwgZGlydHlEYXRlKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVGhpc1F1YXJ0ZXJcbiIsInZhciBpc1NhbWVTZWNvbmQgPSByZXF1aXJlKCcuLi9pc19zYW1lX3NlY29uZC9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFNlY29uZCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgc2FtZSBzZWNvbmQgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIHNlY29uZCBhcyB0aGUgY3VycmVudCBkYXRlP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBpbiB0aGlzIHNlY29uZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiBub3cgaXMgMjUgU2VwdGVtYmVyIDIwMTQgMTg6MzA6MTUuNTAwLFxuICogLy8gaXMgMjUgU2VwdGVtYmVyIDIwMTQgMTg6MzA6MTUuMDAwIGluIHRoaXMgc2Vjb25kP1xuICogdmFyIHJlc3VsdCA9IGlzVGhpc1NlY29uZChuZXcgRGF0ZSgyMDE0LCA4LCAyNSwgMTgsIDMwLCAxNSkpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNUaGlzU2Vjb25kIChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIGlzU2FtZVNlY29uZChuZXcgRGF0ZSgpLCBkaXJ0eURhdGUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUaGlzU2Vjb25kXG4iLCJ2YXIgaXNTYW1lV2VlayA9IHJlcXVpcmUoJy4uL2lzX3NhbWVfd2Vlay9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgd2VlayBhcyB0aGUgY3VycmVudCBkYXRlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgd2VlayBhcyB0aGUgY3VycmVudCBkYXRlP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLndlZWtTdGFydHNPbj0wXSAtIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrICgwIC0gU3VuZGF5KVxuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIGluIHRoaXMgd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAyNSBTZXB0ZW1iZXIgMjAxNCwgaXMgMjEgU2VwdGVtYmVyIDIwMTQgaW4gdGhpcyB3ZWVrP1xuICogdmFyIHJlc3VsdCA9IGlzVGhpc1dlZWsobmV3IERhdGUoMjAxNCwgOCwgMjEpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDI1IFNlcHRlbWJlciAyMDE0IGFuZCB3ZWVrIHN0YXJ0cyB3aXRoIE1vbmRheVxuICogLy8gaXMgMjEgU2VwdGVtYmVyIDIwMTQgaW4gdGhpcyB3ZWVrP1xuICogdmFyIHJlc3VsdCA9IGlzVGhpc1dlZWsobmV3IERhdGUoMjAxNCwgOCwgMjEpLCB7d2Vla1N0YXJ0c09uOiAxfSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNUaGlzV2VlayAoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgcmV0dXJuIGlzU2FtZVdlZWsobmV3IERhdGUoKSwgZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUaGlzV2Vla1xuIiwidmFyIGlzU2FtZVllYXIgPSByZXF1aXJlKCcuLi9pc19zYW1lX3llYXIvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIHllYXIgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIHllYXIgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgaW4gdGhpcyB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDI1IFNlcHRlbWJlciAyMDE0LCBpcyAyIEp1bHkgMjAxNCBpbiB0aGlzIHllYXI/XG4gKiB2YXIgcmVzdWx0ID0gaXNUaGlzWWVhcihuZXcgRGF0ZSgyMDE0LCA2LCAyKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1RoaXNZZWFyIChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIGlzU2FtZVllYXIobmV3IERhdGUoKSwgZGlydHlEYXRlKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVGhpc1llYXJcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgV2Vla2RheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBUaHVyc2RheT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIFRodXJzZGF5P1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBUaHVyc2RheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJcyAyNSBTZXB0ZW1iZXIgMjAxNCBUaHVyc2RheT9cbiAqIHZhciByZXN1bHQgPSBpc1RodXJzZGF5KG5ldyBEYXRlKDIwMTQsIDgsIDI1KSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1RodXJzZGF5IChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIHBhcnNlKGRpcnR5RGF0ZSkuZ2V0RGF5KCkgPT09IDRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1RodXJzZGF5XG4iLCJ2YXIgc3RhcnRPZkRheSA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX2RheS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB0b2RheT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIHRvZGF5P1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyB0b2RheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyA2IE9jdG9iZXIgMjAxNCwgaXMgNiBPY3RvYmVyIDE0OjAwOjAwIHRvZGF5P1xuICogdmFyIHJlc3VsdCA9IGlzVG9kYXkobmV3IERhdGUoMjAxNCwgOSwgNiwgMTQsIDApKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzVG9kYXkgKGRpcnR5RGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZkRheShkaXJ0eURhdGUpLmdldFRpbWUoKSA9PT0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKS5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1RvZGF5XG4iLCJ2YXIgc3RhcnRPZkRheSA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX2RheS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB0b21vcnJvdz9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIHRvbW9ycm93P1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyB0b21vcnJvd1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyA2IE9jdG9iZXIgMjAxNCwgaXMgNyBPY3RvYmVyIDE0OjAwOjAwIHRvbW9ycm93P1xuICogdmFyIHJlc3VsdCA9IGlzVG9tb3Jyb3cobmV3IERhdGUoMjAxNCwgOSwgNywgMTQsIDApKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzVG9tb3Jyb3cgKGRpcnR5RGF0ZSkge1xuICB2YXIgdG9tb3Jyb3cgPSBuZXcgRGF0ZSgpXG4gIHRvbW9ycm93LnNldERhdGUodG9tb3Jyb3cuZ2V0RGF0ZSgpICsgMSlcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkoZGlydHlEYXRlKS5nZXRUaW1lKCkgPT09IHN0YXJ0T2ZEYXkodG9tb3Jyb3cpLmdldFRpbWUoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVG9tb3Jyb3dcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgV2Vla2RheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBUdWVzZGF5P1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgVHVlc2RheT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgVHVlc2RheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJcyAyMyBTZXB0ZW1iZXIgMjAxNCBUdWVzZGF5P1xuICogdmFyIHJlc3VsdCA9IGlzVHVlc2RheShuZXcgRGF0ZSgyMDE0LCA4LCAyMykpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNUdWVzZGF5IChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIHBhcnNlKGRpcnR5RGF0ZSkuZ2V0RGF5KCkgPT09IDJcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R1ZXNkYXlcbiIsInZhciBpc0RhdGUgPSByZXF1aXJlKCcuLi9pc19kYXRlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHZhbGlkP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyBmYWxzZSBpZiBhcmd1bWVudCBpcyBJbnZhbGlkIERhdGUgYW5kIHRydWUgb3RoZXJ3aXNlLlxuICogSW52YWxpZCBEYXRlIGlzIGEgRGF0ZSwgd2hvc2UgdGltZSB2YWx1ZSBpcyBOYU4uXG4gKlxuICogVGltZSB2YWx1ZSBvZiBEYXRlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjkuMS4xXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyB2YWxpZFxuICogQHRocm93cyB7VHlwZUVycm9yfSBhcmd1bWVudCBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIERhdGVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSB2YWxpZCBkYXRlOlxuICogdmFyIHJlc3VsdCA9IGlzVmFsaWQobmV3IERhdGUoMjAxNCwgMSwgMzEpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgaW52YWxpZCBkYXRlOlxuICogdmFyIHJlc3VsdCA9IGlzVmFsaWQobmV3IERhdGUoJycpKVxuICogLy89PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1ZhbGlkIChkaXJ0eURhdGUpIHtcbiAgaWYgKGlzRGF0ZShkaXJ0eURhdGUpKSB7XG4gICAgcmV0dXJuICFpc05hTihkaXJ0eURhdGUpXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcih0b1N0cmluZy5jYWxsKGRpcnR5RGF0ZSkgKyAnIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBEYXRlJylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVmFsaWRcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgV2Vla2RheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBXZWRuZXNkYXk/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSBXZWRuZXNkYXk/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIFdlZG5lc2RheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJcyAyNCBTZXB0ZW1iZXIgMjAxNCBXZWRuZXNkYXk/XG4gKiB2YXIgcmVzdWx0ID0gaXNXZWRuZXNkYXkobmV3IERhdGUoMjAxNCwgOCwgMjQpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzV2VkbmVzZGF5IChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIHBhcnNlKGRpcnR5RGF0ZSkuZ2V0RGF5KCkgPT09IDNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1dlZG5lc2RheVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrZGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IERvZXMgdGhlIGdpdmVuIGRhdGUgZmFsbCBvbiBhIHdlZWtlbmQ/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBEb2VzIHRoZSBnaXZlbiBkYXRlIGZhbGwgb24gYSB3ZWVrZW5kP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBmYWxscyBvbiBhIHdlZWtlbmRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRG9lcyA1IE9jdG9iZXIgMjAxNCBmYWxsIG9uIGEgd2Vla2VuZD9cbiAqIHZhciByZXN1bHQgPSBpc1dlZWtlbmQobmV3IERhdGUoMjAxNCwgOSwgNSkpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNXZWVrZW5kIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBkYXkgPSBkYXRlLmdldERheSgpXG4gIHJldHVybiBkYXkgPT09IDAgfHwgZGF5ID09PSA2XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNXZWVrZW5kXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFJhbmdlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHdpdGhpbiB0aGUgcmFuZ2U/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSB3aXRoaW4gdGhlIHJhbmdlP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBzdGFydERhdGUgLSB0aGUgc3RhcnQgb2YgcmFuZ2VcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBlbmREYXRlIC0gdGhlIGVuZCBvZiByYW5nZVxuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIHdpdGhpbiB0aGUgcmFuZ2VcbiAqIEB0aHJvd3Mge0Vycm9yfSBzdGFydERhdGUgY2Fubm90IGJlIGFmdGVyIGVuZERhdGVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSBkYXRlIHdpdGhpbiB0aGUgcmFuZ2U6XG4gKiBpc1dpdGhpblJhbmdlKFxuICogICBuZXcgRGF0ZSgyMDE0LCAwLCAzKSwgbmV3IERhdGUoMjAxNCwgMCwgMSksIG5ldyBEYXRlKDIwMTQsIDAsIDcpXG4gKiApXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSBkYXRlIG91dHNpZGUgb2YgdGhlIHJhbmdlOlxuICogaXNXaXRoaW5SYW5nZShcbiAqICAgbmV3IERhdGUoMjAxNCwgMCwgMTApLCBuZXcgRGF0ZSgyMDE0LCAwLCAxKSwgbmV3IERhdGUoMjAxNCwgMCwgNylcbiAqIClcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNXaXRoaW5SYW5nZSAoZGlydHlEYXRlLCBkaXJ0eVN0YXJ0RGF0ZSwgZGlydHlFbmREYXRlKSB7XG4gIHZhciB0aW1lID0gcGFyc2UoZGlydHlEYXRlKS5nZXRUaW1lKClcbiAgdmFyIHN0YXJ0VGltZSA9IHBhcnNlKGRpcnR5U3RhcnREYXRlKS5nZXRUaW1lKClcbiAgdmFyIGVuZFRpbWUgPSBwYXJzZShkaXJ0eUVuZERhdGUpLmdldFRpbWUoKVxuXG4gIGlmIChzdGFydFRpbWUgPiBlbmRUaW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgc3RhcnQgb2YgdGhlIHJhbmdlIGNhbm5vdCBiZSBhZnRlciB0aGUgZW5kIG9mIHRoZSByYW5nZScpXG4gIH1cblxuICByZXR1cm4gdGltZSA+PSBzdGFydFRpbWUgJiYgdGltZSA8PSBlbmRUaW1lXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNXaXRoaW5SYW5nZVxuIiwidmFyIHN0YXJ0T2ZEYXkgPSByZXF1aXJlKCcuLi9zdGFydF9vZl9kYXkvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgeWVzdGVyZGF5P1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgeWVzdGVyZGF5P1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyB5ZXN0ZXJkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQsIGlzIDUgT2N0b2JlciAxNDowMDowMCB5ZXN0ZXJkYXk/XG4gKiB2YXIgcmVzdWx0ID0gaXNZZXN0ZXJkYXkobmV3IERhdGUoMjAxNCwgOSwgNSwgMTQsIDApKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzWWVzdGVyZGF5IChkaXJ0eURhdGUpIHtcbiAgdmFyIHllc3RlcmRheSA9IG5ldyBEYXRlKClcbiAgeWVzdGVyZGF5LnNldERhdGUoeWVzdGVyZGF5LmdldERhdGUoKSAtIDEpXG4gIHJldHVybiBzdGFydE9mRGF5KGRpcnR5RGF0ZSkuZ2V0VGltZSgpID09PSBzdGFydE9mRGF5KHllc3RlcmRheSkuZ2V0VGltZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNZZXN0ZXJkYXlcbiIsInZhciBsYXN0RGF5T2ZXZWVrID0gcmVxdWlyZSgnLi4vbGFzdF9kYXlfb2Zfd2Vlay9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IElTTyBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgbGFzdCBkYXkgb2YgYW4gSVNPIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBsYXN0IGRheSBvZiBhbiBJU08gd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGxhc3QgZGF5IG9mIGFuIElTTyB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBsYXN0IGRheSBvZiBhbiBJU08gd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBsYXN0RGF5T2ZJU09XZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFN1biBTZXAgMDcgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBsYXN0RGF5T2ZJU09XZWVrIChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIGxhc3REYXlPZldlZWsoZGlydHlEYXRlLCB7d2Vla1N0YXJ0c09uOiAxfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsYXN0RGF5T2ZJU09XZWVrXG4iLCJ2YXIgZ2V0SVNPWWVhciA9IHJlcXVpcmUoJy4uL2dldF9pc29feWVhci9pbmRleC5qcycpXG52YXIgc3RhcnRPZklTT1dlZWsgPSByZXF1aXJlKCcuLi9zdGFydF9vZl9pc29fd2Vlay9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IElTTyBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgbGFzdCBkYXkgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBsYXN0IGRheSBvZiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcixcbiAqIHdoaWNoIGFsd2F5cyBzdGFydHMgMyBkYXlzIGJlZm9yZSB0aGUgeWVhcidzIGZpcnN0IFRodXJzZGF5LlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBlbmQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIGxhc3QgZGF5IG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciAyIEp1bHkgMjAwNTpcbiAqIHZhciByZXN1bHQgPSBsYXN0RGF5T2ZJU09ZZWFyKG5ldyBEYXRlKDIwMDUsIDYsIDIpKVxuICogLy89PiBTdW4gSmFuIDAxIDIwMDYgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gbGFzdERheU9mSVNPWWVhciAoZGlydHlEYXRlKSB7XG4gIHZhciB5ZWFyID0gZ2V0SVNPWWVhcihkaXJ0eURhdGUpXG4gIHZhciBmb3VydGhPZkphbnVhcnkgPSBuZXcgRGF0ZSgwKVxuICBmb3VydGhPZkphbnVhcnkuc2V0RnVsbFllYXIoeWVhciArIDEsIDAsIDQpXG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRIb3VycygwLCAwLCAwLCAwKVxuICB2YXIgZGF0ZSA9IHN0YXJ0T2ZJU09XZWVrKGZvdXJ0aE9mSmFudWFyeSlcbiAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gMSlcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsYXN0RGF5T2ZJU09ZZWFyXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgbGFzdCBkYXkgb2YgYSBtb250aCBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGxhc3QgZGF5IG9mIGEgbW9udGggZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGxhc3QgZGF5IG9mIGEgbW9udGhcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIGxhc3QgZGF5IG9mIGEgbW9udGggZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gbGFzdERheU9mTW9udGgobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAzMCAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIGxhc3REYXlPZk1vbnRoIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICBkYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSwgbW9udGggKyAxLCAwKVxuICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGFzdERheU9mTW9udGhcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgUXVhcnRlciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGxhc3QgZGF5IG9mIGEgeWVhciBxdWFydGVyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgbGFzdCBkYXkgb2YgYSB5ZWFyIHF1YXJ0ZXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGxhc3QgZGF5IG9mIGEgcXVhcnRlclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgbGFzdCBkYXkgb2YgYSBxdWFydGVyIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogdmFyIHJlc3VsdCA9IGxhc3REYXlPZlF1YXJ0ZXIobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAzMCAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIGxhc3REYXlPZlF1YXJ0ZXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGN1cnJlbnRNb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICB2YXIgbW9udGggPSBjdXJyZW50TW9udGggLSBjdXJyZW50TW9udGggJSAzICsgM1xuICBkYXRlLnNldE1vbnRoKG1vbnRoLCAwKVxuICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGFzdERheU9mUXVhcnRlclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgbGFzdCBkYXkgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgbGFzdCBkYXkgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2Vla1N0YXJ0c09uPTBdIC0gdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgKDAgLSBTdW5kYXkpXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGxhc3QgZGF5IG9mIGEgd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgbGFzdCBkYXkgb2YgYSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogdmFyIHJlc3VsdCA9IGxhc3REYXlPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gU2F0IFNlcCAwNiAyMDE0IDAwOjAwOjAwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRoZSB3ZWVrIHN0YXJ0cyBvbiBNb25kYXksIHRoZSBsYXN0IGRheSBvZiB0aGUgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBsYXN0RGF5T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCksIHt3ZWVrU3RhcnRzT246IDF9KVxuICogLy89PiBTdW4gU2VwIDA3IDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gbGFzdERheU9mV2VlayAoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIHdlZWtTdGFydHNPbiA9IGRpcnR5T3B0aW9ucyA/IChOdW1iZXIoZGlydHlPcHRpb25zLndlZWtTdGFydHNPbikgfHwgMCkgOiAwXG5cbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBkYXkgPSBkYXRlLmdldERheSgpXG4gIHZhciBkaWZmID0gKGRheSA8IHdlZWtTdGFydHNPbiA/IC03IDogMCkgKyA2IC0gKGRheSAtIHdlZWtTdGFydHNPbilcblxuICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApXG4gIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIGRpZmYpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGFzdERheU9mV2Vla1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgbGFzdCBkYXkgb2YgYSB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgbGFzdCBkYXkgb2YgYSB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBsYXN0IGRheSBvZiBhIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIGxhc3QgZGF5IG9mIGEgeWVhciBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBsYXN0RGF5T2ZZZWFyKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMDApKVxuICogLy89PiBXZWQgRGVjIDMxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gbGFzdERheU9mWWVhciAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICBkYXRlLnNldEZ1bGxZZWFyKHllYXIgKyAxLCAwLCAwKVxuICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGFzdERheU9mWWVhclxuIiwidmFyIGNvbW1vbkZvcm1hdHRlcktleXMgPSBbXG4gICdNJywgJ01NJywgJ1EnLCAnRCcsICdERCcsICdEREQnLCAnRERERCcsICdkJyxcbiAgJ0UnLCAnVycsICdXVycsICdZWScsICdZWVlZJywgJ0dHJywgJ0dHR0cnLFxuICAnSCcsICdISCcsICdoJywgJ2hoJywgJ20nLCAnbW0nLFxuICAncycsICdzcycsICdTJywgJ1NTJywgJ1NTUycsXG4gICdaJywgJ1paJywgJ1gnLCAneCdcbl1cblxuZnVuY3Rpb24gYnVpbGRGb3JtYXR0aW5nVG9rZW5zUmVnRXhwIChmb3JtYXR0ZXJzKSB7XG4gIHZhciBmb3JtYXR0ZXJLZXlzID0gW11cbiAgZm9yICh2YXIga2V5IGluIGZvcm1hdHRlcnMpIHtcbiAgICBpZiAoZm9ybWF0dGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBmb3JtYXR0ZXJLZXlzLnB1c2goa2V5KVxuICAgIH1cbiAgfVxuXG4gIHZhciBmb3JtYXR0aW5nVG9rZW5zID0gY29tbW9uRm9ybWF0dGVyS2V5c1xuICAgIC5jb25jYXQoZm9ybWF0dGVyS2V5cylcbiAgICAuc29ydCgpXG4gICAgLnJldmVyc2UoKVxuICB2YXIgZm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IG5ldyBSZWdFeHAoXG4gICAgJyhcXFxcW1teXFxcXFtdKlxcXFxdKXwoXFxcXFxcXFwpPycgKyAnKCcgKyBmb3JtYXR0aW5nVG9rZW5zLmpvaW4oJ3wnKSArICd8LiknLCAnZydcbiAgKVxuXG4gIHJldHVybiBmb3JtYXR0aW5nVG9rZW5zUmVnRXhwXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnVpbGRGb3JtYXR0aW5nVG9rZW5zUmVnRXhwXG4iLCJmdW5jdGlvbiBidWlsZERpc3RhbmNlSW5Xb3Jkc0xvY2FsZSAoKSB7XG4gIHZhciBkaXN0YW5jZUluV29yZHNMb2NhbGUgPSB7XG4gICAgbGVzc1RoYW5YU2Vjb25kczoge1xuICAgICAgb25lOiAnbGVzcyB0aGFuIGEgc2Vjb25kJyxcbiAgICAgIG90aGVyOiAnbGVzcyB0aGFuIHt7Y291bnR9fSBzZWNvbmRzJ1xuICAgIH0sXG5cbiAgICB4U2Vjb25kczoge1xuICAgICAgb25lOiAnMSBzZWNvbmQnLFxuICAgICAgb3RoZXI6ICd7e2NvdW50fX0gc2Vjb25kcydcbiAgICB9LFxuXG4gICAgaGFsZkFNaW51dGU6ICdoYWxmIGEgbWludXRlJyxcblxuICAgIGxlc3NUaGFuWE1pbnV0ZXM6IHtcbiAgICAgIG9uZTogJ2xlc3MgdGhhbiBhIG1pbnV0ZScsXG4gICAgICBvdGhlcjogJ2xlc3MgdGhhbiB7e2NvdW50fX0gbWludXRlcydcbiAgICB9LFxuXG4gICAgeE1pbnV0ZXM6IHtcbiAgICAgIG9uZTogJzEgbWludXRlJyxcbiAgICAgIG90aGVyOiAne3tjb3VudH19IG1pbnV0ZXMnXG4gICAgfSxcblxuICAgIGFib3V0WEhvdXJzOiB7XG4gICAgICBvbmU6ICdhYm91dCAxIGhvdXInLFxuICAgICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0gaG91cnMnXG4gICAgfSxcblxuICAgIHhIb3Vyczoge1xuICAgICAgb25lOiAnMSBob3VyJyxcbiAgICAgIG90aGVyOiAne3tjb3VudH19IGhvdXJzJ1xuICAgIH0sXG5cbiAgICB4RGF5czoge1xuICAgICAgb25lOiAnMSBkYXknLFxuICAgICAgb3RoZXI6ICd7e2NvdW50fX0gZGF5cydcbiAgICB9LFxuXG4gICAgYWJvdXRYTW9udGhzOiB7XG4gICAgICBvbmU6ICdhYm91dCAxIG1vbnRoJyxcbiAgICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IG1vbnRocydcbiAgICB9LFxuXG4gICAgeE1vbnRoczoge1xuICAgICAgb25lOiAnMSBtb250aCcsXG4gICAgICBvdGhlcjogJ3t7Y291bnR9fSBtb250aHMnXG4gICAgfSxcblxuICAgIGFib3V0WFllYXJzOiB7XG4gICAgICBvbmU6ICdhYm91dCAxIHllYXInLFxuICAgICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0geWVhcnMnXG4gICAgfSxcblxuICAgIHhZZWFyczoge1xuICAgICAgb25lOiAnMSB5ZWFyJyxcbiAgICAgIG90aGVyOiAne3tjb3VudH19IHllYXJzJ1xuICAgIH0sXG5cbiAgICBvdmVyWFllYXJzOiB7XG4gICAgICBvbmU6ICdvdmVyIDEgeWVhcicsXG4gICAgICBvdGhlcjogJ292ZXIge3tjb3VudH19IHllYXJzJ1xuICAgIH0sXG5cbiAgICBhbG1vc3RYWWVhcnM6IHtcbiAgICAgIG9uZTogJ2FsbW9zdCAxIHllYXInLFxuICAgICAgb3RoZXI6ICdhbG1vc3Qge3tjb3VudH19IHllYXJzJ1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxvY2FsaXplICh0b2tlbiwgY291bnQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gICAgdmFyIHJlc3VsdFxuICAgIGlmICh0eXBlb2YgZGlzdGFuY2VJbldvcmRzTG9jYWxlW3Rva2VuXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJlc3VsdCA9IGRpc3RhbmNlSW5Xb3Jkc0xvY2FsZVt0b2tlbl1cbiAgICB9IGVsc2UgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgICByZXN1bHQgPSBkaXN0YW5jZUluV29yZHNMb2NhbGVbdG9rZW5dLm9uZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBkaXN0YW5jZUluV29yZHNMb2NhbGVbdG9rZW5dLm90aGVyLnJlcGxhY2UoJ3t7Y291bnR9fScsIGNvdW50KVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmFkZFN1ZmZpeCkge1xuICAgICAgaWYgKG9wdGlvbnMuY29tcGFyaXNvbiA+IDApIHtcbiAgICAgICAgcmV0dXJuICdpbiAnICsgcmVzdWx0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzdWx0ICsgJyBhZ28nXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsb2NhbGl6ZTogbG9jYWxpemVcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkRGlzdGFuY2VJbldvcmRzTG9jYWxlXG4iLCJ2YXIgYnVpbGRGb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gcmVxdWlyZSgnLi4vLi4vX2xpYi9idWlsZF9mb3JtYXR0aW5nX3Rva2Vuc19yZWdfZXhwL2luZGV4LmpzJylcblxuZnVuY3Rpb24gYnVpbGRGb3JtYXRMb2NhbGUgKCkge1xuICAvLyBOb3RlOiBpbiBFbmdsaXNoLCB0aGUgbmFtZXMgb2YgZGF5cyBvZiB0aGUgd2VlayBhbmQgbW9udGhzIGFyZSBjYXBpdGFsaXplZC5cbiAgLy8gSWYgeW91IGFyZSBtYWtpbmcgYSBuZXcgbG9jYWxlIGJhc2VkIG9uIHRoaXMgb25lLCBjaGVjayBpZiB0aGUgc2FtZSBpcyB0cnVlIGZvciB0aGUgbGFuZ3VhZ2UgeW91J3JlIHdvcmtpbmcgb24uXG4gIC8vIEdlbmVyYWxseSwgZm9ybWF0dGVkIGRhdGVzIHNob3VsZCBsb29rIGxpa2UgdGhleSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIHNlbnRlbmNlLFxuICAvLyBlLmcuIGluIFNwYW5pc2ggbGFuZ3VhZ2UgdGhlIHdlZWtkYXlzIGFuZCBtb250aHMgc2hvdWxkIGJlIGluIHRoZSBsb3dlcmNhc2UuXG4gIHZhciBtb250aHMzY2hhciA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuICB2YXIgbW9udGhzRnVsbCA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddXG4gIHZhciB3ZWVrZGF5czJjaGFyID0gWydTdScsICdNbycsICdUdScsICdXZScsICdUaCcsICdGcicsICdTYSddXG4gIHZhciB3ZWVrZGF5czNjaGFyID0gWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXVxuICB2YXIgd2Vla2RheXNGdWxsID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddXG4gIHZhciBtZXJpZGllbVVwcGVyY2FzZSA9IFsnQU0nLCAnUE0nXVxuICB2YXIgbWVyaWRpZW1Mb3dlcmNhc2UgPSBbJ2FtJywgJ3BtJ11cbiAgdmFyIG1lcmlkaWVtRnVsbCA9IFsnYS5tLicsICdwLm0uJ11cblxuICB2YXIgZm9ybWF0dGVycyA9IHtcbiAgICAvLyBNb250aDogSmFuLCBGZWIsIC4uLiwgRGVjXG4gICAgJ01NTSc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICByZXR1cm4gbW9udGhzM2NoYXJbZGF0ZS5nZXRNb250aCgpXVxuICAgIH0sXG5cbiAgICAvLyBNb250aDogSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXJcbiAgICAnTU1NTSc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICByZXR1cm4gbW9udGhzRnVsbFtkYXRlLmdldE1vbnRoKCldXG4gICAgfSxcblxuICAgIC8vIERheSBvZiB3ZWVrOiBTdSwgTW8sIC4uLiwgU2FcbiAgICAnZGQnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgcmV0dXJuIHdlZWtkYXlzMmNoYXJbZGF0ZS5nZXREYXkoKV1cbiAgICB9LFxuXG4gICAgLy8gRGF5IG9mIHdlZWs6IFN1biwgTW9uLCAuLi4sIFNhdFxuICAgICdkZGQnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgcmV0dXJuIHdlZWtkYXlzM2NoYXJbZGF0ZS5nZXREYXkoKV1cbiAgICB9LFxuXG4gICAgLy8gRGF5IG9mIHdlZWs6IFN1bmRheSwgTW9uZGF5LCAuLi4sIFNhdHVyZGF5XG4gICAgJ2RkZGQnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgcmV0dXJuIHdlZWtkYXlzRnVsbFtkYXRlLmdldERheSgpXVxuICAgIH0sXG5cbiAgICAvLyBBTSwgUE1cbiAgICAnQSc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICByZXR1cm4gKGRhdGUuZ2V0SG91cnMoKSAvIDEyKSA+PSAxID8gbWVyaWRpZW1VcHBlcmNhc2VbMV0gOiBtZXJpZGllbVVwcGVyY2FzZVswXVxuICAgIH0sXG5cbiAgICAvLyBhbSwgcG1cbiAgICAnYSc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICByZXR1cm4gKGRhdGUuZ2V0SG91cnMoKSAvIDEyKSA+PSAxID8gbWVyaWRpZW1Mb3dlcmNhc2VbMV0gOiBtZXJpZGllbUxvd2VyY2FzZVswXVxuICAgIH0sXG5cbiAgICAvLyBhLm0uLCBwLm0uXG4gICAgJ2FhJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgIHJldHVybiAoZGF0ZS5nZXRIb3VycygpIC8gMTIpID49IDEgPyBtZXJpZGllbUZ1bGxbMV0gOiBtZXJpZGllbUZ1bGxbMF1cbiAgICB9XG4gIH1cblxuICAvLyBHZW5lcmF0ZSBvcmRpbmFsIHZlcnNpb24gb2YgZm9ybWF0dGVyczogTSAtPiBNbywgRCAtPiBEbywgZXRjLlxuICB2YXIgb3JkaW5hbEZvcm1hdHRlcnMgPSBbJ00nLCAnRCcsICdEREQnLCAnZCcsICdRJywgJ1cnXVxuICBvcmRpbmFsRm9ybWF0dGVycy5mb3JFYWNoKGZ1bmN0aW9uIChmb3JtYXR0ZXJUb2tlbikge1xuICAgIGZvcm1hdHRlcnNbZm9ybWF0dGVyVG9rZW4gKyAnbyddID0gZnVuY3Rpb24gKGRhdGUsIGZvcm1hdHRlcnMpIHtcbiAgICAgIHJldHVybiBvcmRpbmFsKGZvcm1hdHRlcnNbZm9ybWF0dGVyVG9rZW5dKGRhdGUpKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4ge1xuICAgIGZvcm1hdHRlcnM6IGZvcm1hdHRlcnMsXG4gICAgZm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cDogYnVpbGRGb3JtYXR0aW5nVG9rZW5zUmVnRXhwKGZvcm1hdHRlcnMpXG4gIH1cbn1cblxuZnVuY3Rpb24gb3JkaW5hbCAobnVtYmVyKSB7XG4gIHZhciByZW0xMDAgPSBudW1iZXIgJSAxMDBcbiAgaWYgKHJlbTEwMCA+IDIwIHx8IHJlbTEwMCA8IDEwKSB7XG4gICAgc3dpdGNoIChyZW0xMDAgJSAxMCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ3N0J1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ25kJ1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ3JkJ1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVtYmVyICsgJ3RoJ1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkRm9ybWF0TG9jYWxlXG4iLCJ2YXIgYnVpbGREaXN0YW5jZUluV29yZHNMb2NhbGUgPSByZXF1aXJlKCcuL2J1aWxkX2Rpc3RhbmNlX2luX3dvcmRzX2xvY2FsZS9pbmRleC5qcycpXG52YXIgYnVpbGRGb3JtYXRMb2NhbGUgPSByZXF1aXJlKCcuL2J1aWxkX2Zvcm1hdF9sb2NhbGUvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBMb2NhbGVzXG4gKiBAc3VtbWFyeSBFbmdsaXNoIGxvY2FsZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRpc3RhbmNlSW5Xb3JkczogYnVpbGREaXN0YW5jZUluV29yZHNMb2NhbGUoKSxcbiAgZm9ybWF0OiBidWlsZEZvcm1hdExvY2FsZSgpXG59XG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGxhdGVzdCBvZiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGxhdGVzdCBvZiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIHsuLi4oRGF0ZXxTdHJpbmd8TnVtYmVyKX0gZGF0ZXMgLSB0aGUgZGF0ZXMgdG8gY29tcGFyZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBsYXRlc3Qgb2YgdGhlIGRhdGVzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIG9mIHRoZXNlIGRhdGVzIGlzIHRoZSBsYXRlc3Q/XG4gKiB2YXIgcmVzdWx0ID0gbWF4KFxuICogICBuZXcgRGF0ZSgxOTg5LCA2LCAxMCksXG4gKiAgIG5ldyBEYXRlKDE5ODcsIDEsIDExKSxcbiAqICAgbmV3IERhdGUoMTk5NSwgNiwgMiksXG4gKiAgIG5ldyBEYXRlKDE5OTAsIDAsIDEpXG4gKiApXG4gKiAvLz0+IFN1biBKdWwgMDIgMTk5NSAwMDowMDowMFxuICovXG5mdW5jdGlvbiBtYXggKCkge1xuICB2YXIgZGlydHlEYXRlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgdmFyIGRhdGVzID0gZGlydHlEYXRlcy5tYXAoZnVuY3Rpb24gKGRpcnR5RGF0ZSkge1xuICAgIHJldHVybiBwYXJzZShkaXJ0eURhdGUpXG4gIH0pXG4gIHZhciBsYXRlc3RUaW1lc3RhbXAgPSBNYXRoLm1heC5hcHBseShudWxsLCBkYXRlcylcbiAgcmV0dXJuIG5ldyBEYXRlKGxhdGVzdFRpbWVzdGFtcClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXhcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZWFybGllc3Qgb2YgdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBlYXJsaWVzdCBvZiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIHsuLi4oRGF0ZXxTdHJpbmd8TnVtYmVyKX0gZGF0ZXMgLSB0aGUgZGF0ZXMgdG8gY29tcGFyZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBlYXJsaWVzdCBvZiB0aGUgZGF0ZXNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggb2YgdGhlc2UgZGF0ZXMgaXMgdGhlIGVhcmxpZXN0P1xuICogdmFyIHJlc3VsdCA9IG1pbihcbiAqICAgbmV3IERhdGUoMTk4OSwgNiwgMTApLFxuICogICBuZXcgRGF0ZSgxOTg3LCAxLCAxMSksXG4gKiAgIG5ldyBEYXRlKDE5OTUsIDYsIDIpLFxuICogICBuZXcgRGF0ZSgxOTkwLCAwLCAxKVxuICogKVxuICogLy89PiBXZWQgRmViIDExIDE5ODcgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gbWluICgpIHtcbiAgdmFyIGRpcnR5RGF0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gIHZhciBkYXRlcyA9IGRpcnR5RGF0ZXMubWFwKGZ1bmN0aW9uIChkaXJ0eURhdGUpIHtcbiAgICByZXR1cm4gcGFyc2UoZGlydHlEYXRlKVxuICB9KVxuICB2YXIgZWFybGllc3RUaW1lc3RhbXAgPSBNYXRoLm1pbi5hcHBseShudWxsLCBkYXRlcylcbiAgcmV0dXJuIG5ldyBEYXRlKGVhcmxpZXN0VGltZXN0YW1wKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1pblxuIiwidmFyIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMgPSByZXF1aXJlKCcuLi9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMvaW5kZXguanMnKVxudmFyIGlzRGF0ZSA9IHJlcXVpcmUoJy4uL2lzX2RhdGUvaW5kZXguanMnKVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX0hPVVIgPSAzNjAwMDAwXG52YXIgTUlMTElTRUNPTkRTX0lOX01JTlVURSA9IDYwMDAwXG52YXIgREVGQVVMVF9BRERJVElPTkFMX0RJR0lUUyA9IDJcblxudmFyIHBhcnNlVG9rZW5EYXRlVGltZURlbGltZXRlciA9IC9bVCBdL1xudmFyIHBhcnNlVG9rZW5QbGFpblRpbWUgPSAvOi9cblxuLy8geWVhciB0b2tlbnNcbnZhciBwYXJzZVRva2VuWVkgPSAvXihcXGR7Mn0pJC9cbnZhciBwYXJzZVRva2Vuc1lZWSA9IFtcbiAgL14oWystXVxcZHsyfSkkLywgLy8gMCBhZGRpdGlvbmFsIGRpZ2l0c1xuICAvXihbKy1dXFxkezN9KSQvLCAvLyAxIGFkZGl0aW9uYWwgZGlnaXRcbiAgL14oWystXVxcZHs0fSkkLyAvLyAyIGFkZGl0aW9uYWwgZGlnaXRzXG5dXG5cbnZhciBwYXJzZVRva2VuWVlZWSA9IC9eKFxcZHs0fSkvXG52YXIgcGFyc2VUb2tlbnNZWVlZWSA9IFtcbiAgL14oWystXVxcZHs0fSkvLCAvLyAwIGFkZGl0aW9uYWwgZGlnaXRzXG4gIC9eKFsrLV1cXGR7NX0pLywgLy8gMSBhZGRpdGlvbmFsIGRpZ2l0XG4gIC9eKFsrLV1cXGR7Nn0pLyAvLyAyIGFkZGl0aW9uYWwgZGlnaXRzXG5dXG5cbi8vIGRhdGUgdG9rZW5zXG52YXIgcGFyc2VUb2tlbk1NID0gL14tKFxcZHsyfSkkL1xudmFyIHBhcnNlVG9rZW5EREQgPSAvXi0/KFxcZHszfSkkL1xudmFyIHBhcnNlVG9rZW5NTUREID0gL14tPyhcXGR7Mn0pLT8oXFxkezJ9KSQvXG52YXIgcGFyc2VUb2tlbld3dyA9IC9eLT9XKFxcZHsyfSkkL1xudmFyIHBhcnNlVG9rZW5Xd3dEID0gL14tP1coXFxkezJ9KS0/KFxcZHsxfSkkL1xuXG4vLyB0aW1lIHRva2Vuc1xudmFyIHBhcnNlVG9rZW5ISCA9IC9eKFxcZHsyfShbLixdXFxkKik/KSQvXG52YXIgcGFyc2VUb2tlbkhITU0gPSAvXihcXGR7Mn0pOj8oXFxkezJ9KFsuLF1cXGQqKT8pJC9cbnZhciBwYXJzZVRva2VuSEhNTVNTID0gL14oXFxkezJ9KTo/KFxcZHsyfSk6PyhcXGR7Mn0oWy4sXVxcZCopPykkL1xuXG4vLyB0aW1lem9uZSB0b2tlbnNcbnZhciBwYXJzZVRva2VuVGltZXpvbmUgPSAvKFtaKy1dLiopJC9cbnZhciBwYXJzZVRva2VuVGltZXpvbmVaID0gL14oWikkL1xudmFyIHBhcnNlVG9rZW5UaW1lem9uZUhIID0gL14oWystXSkoXFxkezJ9KSQvXG52YXIgcGFyc2VUb2tlblRpbWV6b25lSEhNTSA9IC9eKFsrLV0pKFxcZHsyfSk6PyhcXGR7Mn0pJC9cblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIGFuIGFyZ3VtZW50IGlzIGEgc3RyaW5nLCB0aGUgZnVuY3Rpb24gdHJpZXMgdG8gcGFyc2UgaXQuXG4gKiBGdW5jdGlvbiBhY2NlcHRzIGNvbXBsZXRlIElTTyA4NjAxIGZvcm1hdHMgYXMgd2VsbCBhcyBwYXJ0aWFsIGltcGxlbWVudGF0aW9ucy5cbiAqIElTTyA4NjAxOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT184NjAxXG4gKlxuICogSWYgYWxsIGFib3ZlIGZhaWxzLCB0aGUgZnVuY3Rpb24gcGFzc2VzIHRoZSBnaXZlbiBhcmd1bWVudCB0byBEYXRlIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqIEBwYXJhbSB7MCB8IDEgfCAyfSBbb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzPTJdIC0gdGhlIGFkZGl0aW9uYWwgbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgZXh0ZW5kZWQgeWVhciBmb3JtYXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHN0cmluZyAnMjAxNC0wMi0xMVQxMTozMDozMCcgdG8gZGF0ZTpcbiAqIHZhciByZXN1bHQgPSBwYXJzZSgnMjAxNC0wMi0xMVQxMTozMDozMCcpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBQYXJzZSBzdHJpbmcgJyswMjAxNDEwMScsXG4gKiAvLyBpZiB0aGUgYWRkaXRpb25hbCBudW1iZXIgb2YgZGlnaXRzIGluIHRoZSBleHRlbmRlZCB5ZWFyIGZvcm1hdCBpcyAxOlxuICogdmFyIHJlc3VsdCA9IHBhcnNlKCcrMDIwMTQxMDEnLCB7YWRkaXRpb25hbERpZ2l0czogMX0pXG4gKiAvLz0+IEZyaSBBcHIgMTEgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBwYXJzZSAoYXJndW1lbnQsIGRpcnR5T3B0aW9ucykge1xuICBpZiAoaXNEYXRlKGFyZ3VtZW50KSkge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudC5nZXRUaW1lKCkpXG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50ICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudClcbiAgfVxuXG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9XG4gIHZhciBhZGRpdGlvbmFsRGlnaXRzID0gb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzXG4gIGlmIChhZGRpdGlvbmFsRGlnaXRzID09IG51bGwpIHtcbiAgICBhZGRpdGlvbmFsRGlnaXRzID0gREVGQVVMVF9BRERJVElPTkFMX0RJR0lUU1xuICB9IGVsc2Uge1xuICAgIGFkZGl0aW9uYWxEaWdpdHMgPSBOdW1iZXIoYWRkaXRpb25hbERpZ2l0cylcbiAgfVxuXG4gIHZhciBkYXRlU3RyaW5ncyA9IHNwbGl0RGF0ZVN0cmluZyhhcmd1bWVudClcblxuICB2YXIgcGFyc2VZZWFyUmVzdWx0ID0gcGFyc2VZZWFyKGRhdGVTdHJpbmdzLmRhdGUsIGFkZGl0aW9uYWxEaWdpdHMpXG4gIHZhciB5ZWFyID0gcGFyc2VZZWFyUmVzdWx0LnllYXJcbiAgdmFyIHJlc3REYXRlU3RyaW5nID0gcGFyc2VZZWFyUmVzdWx0LnJlc3REYXRlU3RyaW5nXG5cbiAgdmFyIGRhdGUgPSBwYXJzZURhdGUocmVzdERhdGVTdHJpbmcsIHllYXIpXG5cbiAgaWYgKGRhdGUpIHtcbiAgICB2YXIgdGltZXN0YW1wID0gZGF0ZS5nZXRUaW1lKClcbiAgICB2YXIgdGltZSA9IDBcbiAgICB2YXIgb2Zmc2V0XG5cbiAgICBpZiAoZGF0ZVN0cmluZ3MudGltZSkge1xuICAgICAgdGltZSA9IHBhcnNlVGltZShkYXRlU3RyaW5ncy50aW1lKVxuICAgIH1cblxuICAgIGlmIChkYXRlU3RyaW5ncy50aW1lem9uZSkge1xuICAgICAgb2Zmc2V0ID0gcGFyc2VUaW1lem9uZShkYXRlU3RyaW5ncy50aW1lem9uZSkgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBmdWxsVGltZSA9IHRpbWVzdGFtcCArIHRpbWVcbiAgICAgIHZhciBmdWxsVGltZURhdGUgPSBuZXcgRGF0ZShmdWxsVGltZSlcblxuICAgICAgb2Zmc2V0ID0gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhmdWxsVGltZURhdGUpXG5cbiAgICAgIC8vIEFkanVzdCB0aW1lIHdoZW4gaXQncyBjb21pbmcgZnJvbSBEU1RcbiAgICAgIHZhciBmdWxsVGltZURhdGVOZXh0RGF5ID0gbmV3IERhdGUoZnVsbFRpbWUpXG4gICAgICBmdWxsVGltZURhdGVOZXh0RGF5LnNldERhdGUoZnVsbFRpbWVEYXRlLmdldERhdGUoKSArIDEpXG4gICAgICB2YXIgb2Zmc2V0RGlmZiA9XG4gICAgICAgIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoZnVsbFRpbWVEYXRlTmV4dERheSkgLVxuICAgICAgICBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGZ1bGxUaW1lRGF0ZSlcbiAgICAgIGlmIChvZmZzZXREaWZmID4gMCkge1xuICAgICAgICBvZmZzZXQgKz0gb2Zmc2V0RGlmZlxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKyB0aW1lICsgb2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudClcbiAgfVxufVxuXG5mdW5jdGlvbiBzcGxpdERhdGVTdHJpbmcgKGRhdGVTdHJpbmcpIHtcbiAgdmFyIGRhdGVTdHJpbmdzID0ge31cbiAgdmFyIGFycmF5ID0gZGF0ZVN0cmluZy5zcGxpdChwYXJzZVRva2VuRGF0ZVRpbWVEZWxpbWV0ZXIpXG4gIHZhciB0aW1lU3RyaW5nXG5cbiAgaWYgKHBhcnNlVG9rZW5QbGFpblRpbWUudGVzdChhcnJheVswXSkpIHtcbiAgICBkYXRlU3RyaW5ncy5kYXRlID0gbnVsbFxuICAgIHRpbWVTdHJpbmcgPSBhcnJheVswXVxuICB9IGVsc2Uge1xuICAgIGRhdGVTdHJpbmdzLmRhdGUgPSBhcnJheVswXVxuICAgIHRpbWVTdHJpbmcgPSBhcnJheVsxXVxuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcpIHtcbiAgICB2YXIgdG9rZW4gPSBwYXJzZVRva2VuVGltZXpvbmUuZXhlYyh0aW1lU3RyaW5nKVxuICAgIGlmICh0b2tlbikge1xuICAgICAgZGF0ZVN0cmluZ3MudGltZSA9IHRpbWVTdHJpbmcucmVwbGFjZSh0b2tlblsxXSwgJycpXG4gICAgICBkYXRlU3RyaW5ncy50aW1lem9uZSA9IHRva2VuWzFdXG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWUgPSB0aW1lU3RyaW5nXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGVTdHJpbmdzXG59XG5cbmZ1bmN0aW9uIHBhcnNlWWVhciAoZGF0ZVN0cmluZywgYWRkaXRpb25hbERpZ2l0cykge1xuICB2YXIgcGFyc2VUb2tlbllZWSA9IHBhcnNlVG9rZW5zWVlZW2FkZGl0aW9uYWxEaWdpdHNdXG4gIHZhciBwYXJzZVRva2VuWVlZWVkgPSBwYXJzZVRva2Vuc1lZWVlZW2FkZGl0aW9uYWxEaWdpdHNdXG5cbiAgdmFyIHRva2VuXG5cbiAgLy8gWVlZWSBvciDCsVlZWVlZXG4gIHRva2VuID0gcGFyc2VUb2tlbllZWVkuZXhlYyhkYXRlU3RyaW5nKSB8fCBwYXJzZVRva2VuWVlZWVkuZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICB2YXIgeWVhclN0cmluZyA9IHRva2VuWzFdXG4gICAgcmV0dXJuIHtcbiAgICAgIHllYXI6IHBhcnNlSW50KHllYXJTdHJpbmcsIDEwKSxcbiAgICAgIHJlc3REYXRlU3RyaW5nOiBkYXRlU3RyaW5nLnNsaWNlKHllYXJTdHJpbmcubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIC8vIFlZIG9yIMKxWVlZXG4gIHRva2VuID0gcGFyc2VUb2tlbllZLmV4ZWMoZGF0ZVN0cmluZykgfHwgcGFyc2VUb2tlbllZWS5leGVjKGRhdGVTdHJpbmcpXG4gIGlmICh0b2tlbikge1xuICAgIHZhciBjZW50dXJ5U3RyaW5nID0gdG9rZW5bMV1cbiAgICByZXR1cm4ge1xuICAgICAgeWVhcjogcGFyc2VJbnQoY2VudHVyeVN0cmluZywgMTApICogMTAwLFxuICAgICAgcmVzdERhdGVTdHJpbmc6IGRhdGVTdHJpbmcuc2xpY2UoY2VudHVyeVN0cmluZy5sZW5ndGgpXG4gICAgfVxuICB9XG5cbiAgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHllYXJcbiAgcmV0dXJuIHtcbiAgICB5ZWFyOiBudWxsXG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VEYXRlIChkYXRlU3RyaW5nLCB5ZWFyKSB7XG4gIC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB5ZWFyXG4gIGlmICh5ZWFyID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHZhciB0b2tlblxuICB2YXIgZGF0ZVxuICB2YXIgbW9udGhcbiAgdmFyIHdlZWtcblxuICAvLyBZWVlZXG4gIGlmIChkYXRlU3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgIGRhdGUgPSBuZXcgRGF0ZSgwKVxuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeWVhcilcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgLy8gWVlZWS1NTVxuICB0b2tlbiA9IHBhcnNlVG9rZW5NTS5leGVjKGRhdGVTdHJpbmcpXG4gIGlmICh0b2tlbikge1xuICAgIGRhdGUgPSBuZXcgRGF0ZSgwKVxuICAgIG1vbnRoID0gcGFyc2VJbnQodG9rZW5bMV0sIDEwKSAtIDFcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIsIG1vbnRoKVxuICAgIHJldHVybiBkYXRlXG4gIH1cblxuICAvLyBZWVlZLURERCBvciBZWVlZREREXG4gIHRva2VuID0gcGFyc2VUb2tlbkRERC5leGVjKGRhdGVTdHJpbmcpXG4gIGlmICh0b2tlbikge1xuICAgIGRhdGUgPSBuZXcgRGF0ZSgwKVxuICAgIHZhciBkYXlPZlllYXIgPSBwYXJzZUludCh0b2tlblsxXSwgMTApXG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcih5ZWFyLCAwLCBkYXlPZlllYXIpXG4gICAgcmV0dXJuIGRhdGVcbiAgfVxuXG4gIC8vIFlZWVktTU0tREQgb3IgWVlZWU1NRERcbiAgdG9rZW4gPSBwYXJzZVRva2VuTU1ERC5leGVjKGRhdGVTdHJpbmcpXG4gIGlmICh0b2tlbikge1xuICAgIGRhdGUgPSBuZXcgRGF0ZSgwKVxuICAgIG1vbnRoID0gcGFyc2VJbnQodG9rZW5bMV0sIDEwKSAtIDFcbiAgICB2YXIgZGF5ID0gcGFyc2VJbnQodG9rZW5bMl0sIDEwKVxuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeWVhciwgbW9udGgsIGRheSlcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgLy8gWVlZWS1Xd3cgb3IgWVlZWVd3d1xuICB0b2tlbiA9IHBhcnNlVG9rZW5Xd3cuZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICB3ZWVrID0gcGFyc2VJbnQodG9rZW5bMV0sIDEwKSAtIDFcbiAgICByZXR1cm4gZGF5T2ZJU09ZZWFyKHllYXIsIHdlZWspXG4gIH1cblxuICAvLyBZWVlZLVd3dy1EIG9yIFlZWVlXd3dEXG4gIHRva2VuID0gcGFyc2VUb2tlbld3d0QuZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICB3ZWVrID0gcGFyc2VJbnQodG9rZW5bMV0sIDEwKSAtIDFcbiAgICB2YXIgZGF5T2ZXZWVrID0gcGFyc2VJbnQodG9rZW5bMl0sIDEwKSAtIDFcbiAgICByZXR1cm4gZGF5T2ZJU09ZZWFyKHllYXIsIHdlZWssIGRheU9mV2VlaylcbiAgfVxuXG4gIC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCBkYXRlXG4gIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZSAodGltZVN0cmluZykge1xuICB2YXIgdG9rZW5cbiAgdmFyIGhvdXJzXG4gIHZhciBtaW51dGVzXG5cbiAgLy8gaGhcbiAgdG9rZW4gPSBwYXJzZVRva2VuSEguZXhlYyh0aW1lU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBob3VycyA9IHBhcnNlRmxvYXQodG9rZW5bMV0ucmVwbGFjZSgnLCcsICcuJykpXG4gICAgcmV0dXJuIChob3VycyAlIDI0KSAqIE1JTExJU0VDT05EU19JTl9IT1VSXG4gIH1cblxuICAvLyBoaDptbSBvciBoaG1tXG4gIHRva2VuID0gcGFyc2VUb2tlbkhITU0uZXhlYyh0aW1lU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBob3VycyA9IHBhcnNlSW50KHRva2VuWzFdLCAxMClcbiAgICBtaW51dGVzID0gcGFyc2VGbG9hdCh0b2tlblsyXS5yZXBsYWNlKCcsJywgJy4nKSlcbiAgICByZXR1cm4gKGhvdXJzICUgMjQpICogTUlMTElTRUNPTkRTX0lOX0hPVVIgK1xuICAgICAgbWludXRlcyAqIE1JTExJU0VDT05EU19JTl9NSU5VVEVcbiAgfVxuXG4gIC8vIGhoOm1tOnNzIG9yIGhobW1zc1xuICB0b2tlbiA9IHBhcnNlVG9rZW5ISE1NU1MuZXhlYyh0aW1lU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBob3VycyA9IHBhcnNlSW50KHRva2VuWzFdLCAxMClcbiAgICBtaW51dGVzID0gcGFyc2VJbnQodG9rZW5bMl0sIDEwKVxuICAgIHZhciBzZWNvbmRzID0gcGFyc2VGbG9hdCh0b2tlblszXS5yZXBsYWNlKCcsJywgJy4nKSlcbiAgICByZXR1cm4gKGhvdXJzICUgMjQpICogTUlMTElTRUNPTkRTX0lOX0hPVVIgK1xuICAgICAgbWludXRlcyAqIE1JTExJU0VDT05EU19JTl9NSU5VVEUgK1xuICAgICAgc2Vjb25kcyAqIDEwMDBcbiAgfVxuXG4gIC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB0aW1lXG4gIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZXpvbmUgKHRpbWV6b25lU3RyaW5nKSB7XG4gIHZhciB0b2tlblxuICB2YXIgYWJzb2x1dGVPZmZzZXRcblxuICAvLyBaXG4gIHRva2VuID0gcGFyc2VUb2tlblRpbWV6b25lWi5leGVjKHRpbWV6b25lU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICByZXR1cm4gMFxuICB9XG5cbiAgLy8gwrFoaFxuICB0b2tlbiA9IHBhcnNlVG9rZW5UaW1lem9uZUhILmV4ZWModGltZXpvbmVTdHJpbmcpXG4gIGlmICh0b2tlbikge1xuICAgIGFic29sdXRlT2Zmc2V0ID0gcGFyc2VJbnQodG9rZW5bMl0sIDEwKSAqIDYwXG4gICAgcmV0dXJuICh0b2tlblsxXSA9PT0gJysnKSA/IC1hYnNvbHV0ZU9mZnNldCA6IGFic29sdXRlT2Zmc2V0XG4gIH1cblxuICAvLyDCsWhoOm1tIG9yIMKxaGhtbVxuICB0b2tlbiA9IHBhcnNlVG9rZW5UaW1lem9uZUhITU0uZXhlYyh0aW1lem9uZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgYWJzb2x1dGVPZmZzZXQgPSBwYXJzZUludCh0b2tlblsyXSwgMTApICogNjAgKyBwYXJzZUludCh0b2tlblszXSwgMTApXG4gICAgcmV0dXJuICh0b2tlblsxXSA9PT0gJysnKSA/IC1hYnNvbHV0ZU9mZnNldCA6IGFic29sdXRlT2Zmc2V0XG4gIH1cblxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBkYXlPZklTT1llYXIgKGlzb1llYXIsIHdlZWssIGRheSkge1xuICB3ZWVrID0gd2VlayB8fCAwXG4gIGRheSA9IGRheSB8fCAwXG4gIHZhciBkYXRlID0gbmV3IERhdGUoMClcbiAgZGF0ZS5zZXRVVENGdWxsWWVhcihpc29ZZWFyLCAwLCA0KVxuICB2YXIgZm91cnRoT2ZKYW51YXJ5RGF5ID0gZGF0ZS5nZXRVVENEYXkoKSB8fCA3XG4gIHZhciBkaWZmID0gd2VlayAqIDcgKyBkYXkgKyAxIC0gZm91cnRoT2ZKYW51YXJ5RGF5XG4gIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIGRpZmYpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFNldCB0aGUgZGF5IG9mIHRoZSBtb250aCB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFNldCB0aGUgZGF5IG9mIHRoZSBtb250aCB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBkYXlPZk1vbnRoIC0gdGhlIGRheSBvZiB0aGUgbW9udGggb2YgdGhlIG5ldyBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIGRheSBvZiB0aGUgbW9udGggc2V0dGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNldCB0aGUgMzB0aCBkYXkgb2YgdGhlIG1vbnRoIHRvIDEgU2VwdGVtYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gc2V0RGF0ZShuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgMzApXG4gKiAvLz0+IFR1ZSBTZXAgMzAgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzZXREYXRlIChkaXJ0eURhdGUsIGRpcnR5RGF5T2ZNb250aCkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGRheU9mTW9udGggPSBOdW1iZXIoZGlydHlEYXlPZk1vbnRoKVxuICBkYXRlLnNldERhdGUoZGF5T2ZNb250aClcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXREYXRlXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG52YXIgYWRkRGF5cyA9IHJlcXVpcmUoJy4uL2FkZF9kYXlzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgV2Vla2RheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTZXQgdGhlIGRheSBvZiB0aGUgd2VlayB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFNldCB0aGUgZGF5IG9mIHRoZSB3ZWVrIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGRheSAtIHRoZSBkYXkgb2YgdGhlIHdlZWsgb2YgdGhlIG5ldyBkYXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53ZWVrU3RhcnRzT249MF0gLSB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayAoMCAtIFN1bmRheSlcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgZGF5IG9mIHRoZSB3ZWVrIHNldHRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTZXQgU3VuZGF5IHRvIDEgU2VwdGVtYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gc2V0RGF5KG5ldyBEYXRlKDIwMTQsIDgsIDEpLCAwKVxuICogLy89PiBTdW4gQXVnIDMxIDIwMTQgMDA6MDA6MDBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgd2VlayBzdGFydHMgd2l0aCBNb25kYXksIHNldCBTdW5kYXkgdG8gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBzZXREYXkobmV3IERhdGUoMjAxNCwgOCwgMSksIDAsIHt3ZWVrU3RhcnRzT246IDF9KVxuICogLy89PiBTdW4gU2VwIDA3IDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc2V0RGF5IChkaXJ0eURhdGUsIGRpcnR5RGF5LCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIHdlZWtTdGFydHNPbiA9IGRpcnR5T3B0aW9ucyA/IChOdW1iZXIoZGlydHlPcHRpb25zLndlZWtTdGFydHNPbikgfHwgMCkgOiAwXG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgZGF5ID0gTnVtYmVyKGRpcnR5RGF5KVxuICB2YXIgY3VycmVudERheSA9IGRhdGUuZ2V0RGF5KClcblxuICB2YXIgcmVtYWluZGVyID0gZGF5ICUgN1xuICB2YXIgZGF5SW5kZXggPSAocmVtYWluZGVyICsgNykgJSA3XG5cbiAgdmFyIGRpZmYgPSAoZGF5SW5kZXggPCB3ZWVrU3RhcnRzT24gPyA3IDogMCkgKyBkYXkgLSBjdXJyZW50RGF5XG4gIHJldHVybiBhZGREYXlzKGRhdGUsIGRpZmYpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0RGF5XG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTZXQgdGhlIGRheSBvZiB0aGUgeWVhciB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFNldCB0aGUgZGF5IG9mIHRoZSB5ZWFyIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGRheU9mWWVhciAtIHRoZSBkYXkgb2YgdGhlIHllYXIgb2YgdGhlIG5ldyBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIGRheSBvZiB0aGUgeWVhciBzZXR0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU2V0IHRoZSAybmQgZGF5IG9mIHRoZSB5ZWFyIHRvIDIgSnVseSAyMDE0OlxuICogdmFyIHJlc3VsdCA9IHNldERheU9mWWVhcihuZXcgRGF0ZSgyMDE0LCA2LCAyKSwgMilcbiAqIC8vPT4gVGh1IEphbiAwMiAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHNldERheU9mWWVhciAoZGlydHlEYXRlLCBkaXJ0eURheU9mWWVhcikge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGRheU9mWWVhciA9IE51bWJlcihkaXJ0eURheU9mWWVhcilcbiAgZGF0ZS5zZXRNb250aCgwKVxuICBkYXRlLnNldERhdGUoZGF5T2ZZZWFyKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldERheU9mWWVhclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBIb3VyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFNldCB0aGUgaG91cnMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXQgdGhlIGhvdXJzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGhvdXJzIC0gdGhlIGhvdXJzIG9mIHRoZSBuZXcgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBob3VycyBzZXR0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU2V0IDQgaG91cnMgdG8gMSBTZXB0ZW1iZXIgMjAxNCAxMTozMDowMDpcbiAqIHZhciByZXN1bHQgPSBzZXRIb3VycyhuZXcgRGF0ZSgyMDE0LCA4LCAxLCAxMSwgMzApLCA0KVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDQ6MzA6MDBcbiAqL1xuZnVuY3Rpb24gc2V0SG91cnMgKGRpcnR5RGF0ZSwgZGlydHlIb3Vycykge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGhvdXJzID0gTnVtYmVyKGRpcnR5SG91cnMpXG4gIGRhdGUuc2V0SG91cnMoaG91cnMpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0SG91cnNcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBhZGREYXlzID0gcmVxdWlyZSgnLi4vYWRkX2RheXMvaW5kZXguanMnKVxudmFyIGdldElTT0RheSA9IHJlcXVpcmUoJy4uL2dldF9pc29fZGF5L2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgV2Vla2RheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTZXQgdGhlIGRheSBvZiB0aGUgSVNPIHdlZWsgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXQgdGhlIGRheSBvZiB0aGUgSVNPIHdlZWsgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKiBJU08gd2VlayBzdGFydHMgd2l0aCBNb25kYXkuXG4gKiA3IGlzIHRoZSBpbmRleCBvZiBTdW5kYXksIDEgaXMgdGhlIGluZGV4IG9mIE1vbmRheSBldGMuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gZGF5IC0gdGhlIGRheSBvZiB0aGUgSVNPIHdlZWsgb2YgdGhlIG5ldyBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIGRheSBvZiB0aGUgSVNPIHdlZWsgc2V0dGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNldCBTdW5kYXkgdG8gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBzZXRJU09EYXkobmV3IERhdGUoMjAxNCwgOCwgMSksIDcpXG4gKiAvLz0+IFN1biBTZXAgMDcgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzZXRJU09EYXkgKGRpcnR5RGF0ZSwgZGlydHlEYXkpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBkYXkgPSBOdW1iZXIoZGlydHlEYXkpXG4gIHZhciBjdXJyZW50RGF5ID0gZ2V0SVNPRGF5KGRhdGUpXG4gIHZhciBkaWZmID0gZGF5IC0gY3VycmVudERheVxuICByZXR1cm4gYWRkRGF5cyhkYXRlLCBkaWZmKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldElTT0RheVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxudmFyIGdldElTT1dlZWsgPSByZXF1aXJlKCcuLi9nZXRfaXNvX3dlZWsvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBJU08gV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTZXQgdGhlIElTTyB3ZWVrIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU2V0IHRoZSBJU08gd2VlayB0byB0aGUgZ2l2ZW4gZGF0ZSwgc2F2aW5nIHRoZSB3ZWVrZGF5IG51bWJlci5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gaXNvV2VlayAtIHRoZSBJU08gd2VlayBvZiB0aGUgbmV3IGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgSVNPIHdlZWsgc2V0dGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNldCB0aGUgNTNyZCBJU08gd2VlayB0byA3IEF1Z3VzdCAyMDA0OlxuICogdmFyIHJlc3VsdCA9IHNldElTT1dlZWsobmV3IERhdGUoMjAwNCwgNywgNyksIDUzKVxuICogLy89PiBTYXQgSmFuIDAxIDIwMDUgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc2V0SVNPV2VlayAoZGlydHlEYXRlLCBkaXJ0eUlTT1dlZWspIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBpc29XZWVrID0gTnVtYmVyKGRpcnR5SVNPV2VlaylcbiAgdmFyIGRpZmYgPSBnZXRJU09XZWVrKGRhdGUpIC0gaXNvV2Vla1xuICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSBkaWZmICogNylcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRJU09XZWVrXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG52YXIgc3RhcnRPZklTT1llYXIgPSByZXF1aXJlKCcuLi9zdGFydF9vZl9pc29feWVhci9pbmRleC5qcycpXG52YXIgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzID0gcmVxdWlyZSgnLi4vZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl9kYXlzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWstTnVtYmVyaW5nIFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgU2V0IHRoZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhciB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFNldCB0aGUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgdG8gdGhlIGdpdmVuIGRhdGUsXG4gKiBzYXZpbmcgdGhlIHdlZWsgbnVtYmVyIGFuZCB0aGUgd2Vla2RheSBudW1iZXIuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGlzb1llYXIgLSB0aGUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgb2YgdGhlIG5ldyBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIHNldHRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTZXQgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgMjAwNyB0byAyOSBEZWNlbWJlciAyMDA4OlxuICogdmFyIHJlc3VsdCA9IHNldElTT1llYXIobmV3IERhdGUoMjAwOCwgMTEsIDI5KSwgMjAwNylcbiAqIC8vPT4gTW9uIEphbiAwMSAyMDA3IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHNldElTT1llYXIgKGRpcnR5RGF0ZSwgZGlydHlJU09ZZWFyKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgaXNvWWVhciA9IE51bWJlcihkaXJ0eUlTT1llYXIpXG4gIHZhciBkaWZmID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRhdGUsIHN0YXJ0T2ZJU09ZZWFyKGRhdGUpKVxuICB2YXIgZm91cnRoT2ZKYW51YXJ5ID0gbmV3IERhdGUoMClcbiAgZm91cnRoT2ZKYW51YXJ5LnNldEZ1bGxZZWFyKGlzb1llYXIsIDAsIDQpXG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRIb3VycygwLCAwLCAwLCAwKVxuICBkYXRlID0gc3RhcnRPZklTT1llYXIoZm91cnRoT2ZKYW51YXJ5KVxuICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBkaWZmKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldElTT1llYXJcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTWlsbGlzZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgU2V0IHRoZSBtaWxsaXNlY29uZHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXQgdGhlIG1pbGxpc2Vjb25kcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBtaWxsaXNlY29uZHMgLSB0aGUgbWlsbGlzZWNvbmRzIG9mIHRoZSBuZXcgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBtaWxsaXNlY29uZHMgc2V0dGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNldCAzMDAgbWlsbGlzZWNvbmRzIHRvIDEgU2VwdGVtYmVyIDIwMTQgMTE6MzA6NDAuNTAwOlxuICogdmFyIHJlc3VsdCA9IHNldE1pbGxpc2Vjb25kcyhuZXcgRGF0ZSgyMDE0LCA4LCAxLCAxMSwgMzAsIDQwLCA1MDApLCAzMDApXG4gKiAvLz0+IE1vbiBTZXAgMDEgMjAxNCAxMTozMDo0MC4zMDBcbiAqL1xuZnVuY3Rpb24gc2V0TWlsbGlzZWNvbmRzIChkaXJ0eURhdGUsIGRpcnR5TWlsbGlzZWNvbmRzKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgbWlsbGlzZWNvbmRzID0gTnVtYmVyKGRpcnR5TWlsbGlzZWNvbmRzKVxuICBkYXRlLnNldE1pbGxpc2Vjb25kcyhtaWxsaXNlY29uZHMpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0TWlsbGlzZWNvbmRzXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1pbnV0ZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTZXQgdGhlIG1pbnV0ZXMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXQgdGhlIG1pbnV0ZXMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gbWludXRlcyAtIHRoZSBtaW51dGVzIG9mIHRoZSBuZXcgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBtaW51dGVzIHNldHRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTZXQgNDUgbWludXRlcyB0byAxIFNlcHRlbWJlciAyMDE0IDExOjMwOjQwOlxuICogdmFyIHJlc3VsdCA9IHNldE1pbnV0ZXMobmV3IERhdGUoMjAxNCwgOCwgMSwgMTEsIDMwLCA0MCksIDQ1KVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMTE6NDU6NDBcbiAqL1xuZnVuY3Rpb24gc2V0TWludXRlcyAoZGlydHlEYXRlLCBkaXJ0eU1pbnV0ZXMpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBtaW51dGVzID0gTnVtYmVyKGRpcnR5TWludXRlcylcbiAgZGF0ZS5zZXRNaW51dGVzKG1pbnV0ZXMpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0TWludXRlc1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxudmFyIGdldERheXNJbk1vbnRoID0gcmVxdWlyZSgnLi4vZ2V0X2RheXNfaW5fbW9udGgvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTZXQgdGhlIG1vbnRoIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU2V0IHRoZSBtb250aCB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBtb250aCAtIHRoZSBtb250aCBvZiB0aGUgbmV3IGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbW9udGggc2V0dGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNldCBGZWJydWFyeSB0byAxIFNlcHRlbWJlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IHNldE1vbnRoKG5ldyBEYXRlKDIwMTQsIDgsIDEpLCAxKVxuICogLy89PiBTYXQgRmViIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc2V0TW9udGggKGRpcnR5RGF0ZSwgZGlydHlNb250aCkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIG1vbnRoID0gTnVtYmVyKGRpcnR5TW9udGgpXG4gIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKVxuXG4gIHZhciBkYXRlV2l0aERlc2lyZWRNb250aCA9IG5ldyBEYXRlKDApXG4gIGRhdGVXaXRoRGVzaXJlZE1vbnRoLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoLCAxNSlcbiAgZGF0ZVdpdGhEZXNpcmVkTW9udGguc2V0SG91cnMoMCwgMCwgMCwgMClcbiAgdmFyIGRheXNJbk1vbnRoID0gZ2V0RGF5c0luTW9udGgoZGF0ZVdpdGhEZXNpcmVkTW9udGgpXG4gIC8vIFNldCB0aGUgbGFzdCBkYXkgb2YgdGhlIG5ldyBtb250aFxuICAvLyBpZiB0aGUgb3JpZ2luYWwgZGF0ZSB3YXMgdGhlIGxhc3QgZGF5IG9mIHRoZSBsb25nZXIgbW9udGhcbiAgZGF0ZS5zZXRNb250aChtb250aCwgTWF0aC5taW4oZGF5LCBkYXlzSW5Nb250aCkpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0TW9udGhcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBzZXRNb250aCA9IHJlcXVpcmUoJy4uL3NldF9tb250aC9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFF1YXJ0ZXIgSGVscGVyc1xuICogQHN1bW1hcnkgU2V0IHRoZSB5ZWFyIHF1YXJ0ZXIgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXQgdGhlIHllYXIgcXVhcnRlciB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBxdWFydGVyIC0gdGhlIHF1YXJ0ZXIgb2YgdGhlIG5ldyBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIHF1YXJ0ZXIgc2V0dGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNldCB0aGUgMm5kIHF1YXJ0ZXIgdG8gMiBKdWx5IDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gc2V0UXVhcnRlcihuZXcgRGF0ZSgyMDE0LCA2LCAyKSwgMilcbiAqIC8vPT4gV2VkIEFwciAwMiAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHNldFF1YXJ0ZXIgKGRpcnR5RGF0ZSwgZGlydHlRdWFydGVyKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgcXVhcnRlciA9IE51bWJlcihkaXJ0eVF1YXJ0ZXIpXG4gIHZhciBvbGRRdWFydGVyID0gTWF0aC5mbG9vcihkYXRlLmdldE1vbnRoKCkgLyAzKSArIDFcbiAgdmFyIGRpZmYgPSBxdWFydGVyIC0gb2xkUXVhcnRlclxuICByZXR1cm4gc2V0TW9udGgoZGF0ZSwgZGF0ZS5nZXRNb250aCgpICsgZGlmZiAqIDMpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0UXVhcnRlclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBTZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgU2V0IHRoZSBzZWNvbmRzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU2V0IHRoZSBzZWNvbmRzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNlY29uZHMgLSB0aGUgc2Vjb25kcyBvZiB0aGUgbmV3IGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgc2Vjb25kcyBzZXR0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU2V0IDQ1IHNlY29uZHMgdG8gMSBTZXB0ZW1iZXIgMjAxNCAxMTozMDo0MDpcbiAqIHZhciByZXN1bHQgPSBzZXRTZWNvbmRzKG5ldyBEYXRlKDIwMTQsIDgsIDEsIDExLCAzMCwgNDApLCA0NSlcbiAqIC8vPT4gTW9uIFNlcCAwMSAyMDE0IDExOjMwOjQ1XG4gKi9cbmZ1bmN0aW9uIHNldFNlY29uZHMgKGRpcnR5RGF0ZSwgZGlydHlTZWNvbmRzKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgc2Vjb25kcyA9IE51bWJlcihkaXJ0eVNlY29uZHMpXG4gIGRhdGUuc2V0U2Vjb25kcyhzZWNvbmRzKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFNlY29uZHNcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTZXQgdGhlIHllYXIgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXQgdGhlIHllYXIgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0geWVhciAtIHRoZSB5ZWFyIG9mIHRoZSBuZXcgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSB5ZWFyIHNldHRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTZXQgeWVhciAyMDEzIHRvIDEgU2VwdGVtYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gc2V0WWVhcihuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgMjAxMylcbiAqIC8vPT4gU3VuIFNlcCAwMSAyMDEzIDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHNldFllYXIgKGRpcnR5RGF0ZSwgZGlydHlZZWFyKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgeWVhciA9IE51bWJlcihkaXJ0eVllYXIpXG4gIGRhdGUuc2V0RnVsbFllYXIoeWVhcilcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRZZWFyXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIGEgZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIGRheSBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBzdGFydE9mRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFR1ZSBTZXAgMDIgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzdGFydE9mRGF5IChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMClcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFydE9mRGF5XG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IEhvdXIgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhbiBob3VyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYW4gaG91ciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgc3RhcnQgb2YgYW4gaG91clxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYW4gaG91ciBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBzdGFydE9mSG91cihuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUpKVxuICogLy89PiBUdWUgU2VwIDAyIDIwMTQgMTE6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc3RhcnRPZkhvdXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgZGF0ZS5zZXRNaW51dGVzKDAsIDAsIDApXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhcnRPZkhvdXJcbiIsInZhciBzdGFydE9mV2VlayA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX3dlZWsvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBJU08gV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYW4gSVNPIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiBhbiBJU08gd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYW4gSVNPIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gc3RhcnRPZklTT1dlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gTW9uIFNlcCAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0T2ZJU09XZWVrIChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZXZWVrKGRpcnR5RGF0ZSwge3dlZWtTdGFydHNPbjogMX0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhcnRPZklTT1dlZWtcbiIsInZhciBnZXRJU09ZZWFyID0gcmVxdWlyZSgnLi4vZ2V0X2lzb195ZWFyL2luZGV4LmpzJylcbnZhciBzdGFydE9mSVNPV2VlayA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX2lzb193ZWVrL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWstTnVtYmVyaW5nIFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyLFxuICogd2hpY2ggYWx3YXlzIHN0YXJ0cyAzIGRheXMgYmVmb3JlIHRoZSB5ZWFyJ3MgZmlyc3QgVGh1cnNkYXkuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIGFuIElTTyB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgMiBKdWx5IDIwMDU6XG4gKiB2YXIgcmVzdWx0ID0gc3RhcnRPZklTT1llYXIobmV3IERhdGUoMjAwNSwgNiwgMikpXG4gKiAvLz0+IE1vbiBKYW4gMDMgMjAwNSAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzdGFydE9mSVNPWWVhciAoZGlydHlEYXRlKSB7XG4gIHZhciB5ZWFyID0gZ2V0SVNPWWVhcihkaXJ0eURhdGUpXG4gIHZhciBmb3VydGhPZkphbnVhcnkgPSBuZXcgRGF0ZSgwKVxuICBmb3VydGhPZkphbnVhcnkuc2V0RnVsbFllYXIoeWVhciwgMCwgNClcbiAgZm91cnRoT2ZKYW51YXJ5LnNldEhvdXJzKDAsIDAsIDAsIDApXG4gIHZhciBkYXRlID0gc3RhcnRPZklTT1dlZWsoZm91cnRoT2ZKYW51YXJ5KVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXJ0T2ZJU09ZZWFyXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1pbnV0ZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgbWludXRlIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBtaW51dGUgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIGEgbWludXRlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIG1pbnV0ZSBmb3IgMSBEZWNlbWJlciAyMDE0IDIyOjE1OjQ1LjQwMDpcbiAqIHZhciByZXN1bHQgPSBzdGFydE9mTWludXRlKG5ldyBEYXRlKDIwMTQsIDExLCAxLCAyMiwgMTUsIDQ1LCA0MDApKVxuICogLy89PiBNb24gRGVjIDAxIDIwMTQgMjI6MTU6MDBcbiAqL1xuZnVuY3Rpb24gc3RhcnRPZk1pbnV0ZSAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICBkYXRlLnNldFNlY29uZHMoMCwgMClcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFydE9mTWludXRlXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSBtb250aCBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgbW9udGggZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIGEgbW9udGhcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgbW9udGggZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gc3RhcnRPZk1vbnRoKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IE1vbiBTZXAgMDEgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzdGFydE9mTW9udGggKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgZGF0ZS5zZXREYXRlKDEpXG4gIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMClcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFydE9mTW9udGhcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgUXVhcnRlciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgeWVhciBxdWFydGVyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSB5ZWFyIHF1YXJ0ZXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIGEgcXVhcnRlclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSBxdWFydGVyIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogdmFyIHJlc3VsdCA9IHN0YXJ0T2ZRdWFydGVyKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFR1ZSBKdWwgMDEgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzdGFydE9mUXVhcnRlciAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgY3VycmVudE1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gIHZhciBtb250aCA9IGN1cnJlbnRNb250aCAtIGN1cnJlbnRNb250aCAlIDNcbiAgZGF0ZS5zZXRNb250aChtb250aCwgMSlcbiAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXJ0T2ZRdWFydGVyXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFNlY29uZCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgc2Vjb25kIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBzZWNvbmQgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIGEgc2Vjb25kXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIHNlY29uZCBmb3IgMSBEZWNlbWJlciAyMDE0IDIyOjE1OjQ1LjQwMDpcbiAqIHZhciByZXN1bHQgPSBzdGFydE9mU2Vjb25kKG5ldyBEYXRlKDIwMTQsIDExLCAxLCAyMiwgMTUsIDQ1LCA0MDApKVxuICogLy89PiBNb24gRGVjIDAxIDIwMTQgMjI6MTU6NDUuMDAwXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0T2ZTZWNvbmQgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMClcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFydE9mU2Vjb25kXG4iLCJ2YXIgc3RhcnRPZkRheSA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX2RheS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIHRvZGF5LlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiB0b2RheS5cbiAqXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIHRvZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDYgT2N0b2JlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IHN0YXJ0T2ZUb2RheSgpXG4gKiAvLz0+IE1vbiBPY3QgNiAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0T2ZUb2RheSAoKSB7XG4gIHJldHVybiBzdGFydE9mRGF5KG5ldyBEYXRlKCkpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhcnRPZlRvZGF5XG4iLCIvKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiB0b21vcnJvdy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgdG9tb3Jyb3cuXG4gKlxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiB0b21vcnJvd1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyA2IE9jdG9iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBzdGFydE9mVG9tb3Jyb3coKVxuICogLy89PiBUdWUgT2N0IDcgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzdGFydE9mVG9tb3Jyb3cgKCkge1xuICB2YXIgbm93ID0gbmV3IERhdGUoKVxuICB2YXIgeWVhciA9IG5vdy5nZXRGdWxsWWVhcigpXG4gIHZhciBtb250aCA9IG5vdy5nZXRNb250aCgpXG4gIHZhciBkYXkgPSBub3cuZ2V0RGF0ZSgpXG5cbiAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgwKVxuICBkYXRlLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoLCBkYXkgKyAxKVxuICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhcnRPZlRvbW9ycm93XG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53ZWVrU3RhcnRzT249MF0gLSB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayAoMCAtIFN1bmRheSlcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgc3RhcnQgb2YgYSB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gc3RhcnRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gU3VuIEF1ZyAzMSAyMDE0IDAwOjAwOjAwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRoZSB3ZWVrIHN0YXJ0cyBvbiBNb25kYXksIHRoZSBzdGFydCBvZiB0aGUgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApLCB7d2Vla1N0YXJ0c09uOiAxfSlcbiAqIC8vPT4gTW9uIFNlcCAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0T2ZXZWVrIChkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucykge1xuICB2YXIgd2Vla1N0YXJ0c09uID0gZGlydHlPcHRpb25zID8gKE51bWJlcihkaXJ0eU9wdGlvbnMud2Vla1N0YXJ0c09uKSB8fCAwKSA6IDBcblxuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGRheSA9IGRhdGUuZ2V0RGF5KClcbiAgdmFyIGRpZmYgPSAoZGF5IDwgd2Vla1N0YXJ0c09uID8gNyA6IDApICsgZGF5IC0gd2Vla1N0YXJ0c09uXG5cbiAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gZGlmZilcbiAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXJ0T2ZXZWVrXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIHllYXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIHllYXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIGEgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSB5ZWFyIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogdmFyIHJlc3VsdCA9IHN0YXJ0T2ZZZWFyKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMDApKVxuICogLy89PiBXZWQgSmFuIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc3RhcnRPZlllYXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgY2xlYW5EYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDApXG4gIGRhdGUuc2V0RnVsbFllYXIoY2xlYW5EYXRlLmdldEZ1bGxZZWFyKCksIDAsIDEpXG4gIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMClcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFydE9mWWVhclxuIiwiLyoqXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgeWVzdGVyZGF5LlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiB5ZXN0ZXJkYXkuXG4gKlxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiB5ZXN0ZXJkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gc3RhcnRPZlllc3RlcmRheSgpXG4gKiAvLz0+IFN1biBPY3QgNSAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0T2ZZZXN0ZXJkYXkgKCkge1xuICB2YXIgbm93ID0gbmV3IERhdGUoKVxuICB2YXIgeWVhciA9IG5vdy5nZXRGdWxsWWVhcigpXG4gIHZhciBtb250aCA9IG5vdy5nZXRNb250aCgpXG4gIHZhciBkYXkgPSBub3cuZ2V0RGF0ZSgpXG5cbiAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgwKVxuICBkYXRlLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoLCBkYXkgLSAxKVxuICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhcnRPZlllc3RlcmRheVxuIiwidmFyIGFkZERheXMgPSByZXF1aXJlKCcuLi9hZGRfZGF5cy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkYXlzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkYXlzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBkYXlzIHRvIGJlIHN1YnRyYWN0ZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgZGF5cyBzdWJ0cmFjdGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN1YnRyYWN0IDEwIGRheXMgZnJvbSAxIFNlcHRlbWJlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IHN1YkRheXMobmV3IERhdGUoMjAxNCwgOCwgMSksIDEwKVxuICogLy89PiBGcmkgQXVnIDIyIDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc3ViRGF5cyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KVxuICByZXR1cm4gYWRkRGF5cyhkaXJ0eURhdGUsIC1hbW91bnQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3ViRGF5c1xuIiwidmFyIGFkZEhvdXJzID0gcmVxdWlyZSgnLi4vYWRkX2hvdXJzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSG91ciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBob3VycyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgaG91cnMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIGhvdXJzIHRvIGJlIHN1YnRyYWN0ZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgaG91cnMgc3VidHJhY3RlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdWJ0cmFjdCAyIGhvdXJzIGZyb20gMTEgSnVseSAyMDE0IDAxOjAwOjAwOlxuICogdmFyIHJlc3VsdCA9IHN1YkhvdXJzKG5ldyBEYXRlKDIwMTQsIDYsIDExLCAxLCAwKSwgMilcbiAqIC8vPT4gVGh1IEp1bCAxMCAyMDE0IDIzOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHN1YkhvdXJzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHJldHVybiBhZGRIb3VycyhkaXJ0eURhdGUsIC1hbW91bnQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3ViSG91cnNcbiIsInZhciBhZGRJU09ZZWFycyA9IHJlcXVpcmUoJy4uL2FkZF9pc29feWVhcnMvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFycyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFycyB0byBiZSBzdWJ0cmFjdGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFycyBzdWJ0cmFjdGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN1YnRyYWN0IDUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIGZyb20gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBzdWJJU09ZZWFycyhuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgNSlcbiAqIC8vPT4gTW9uIEF1ZyAzMSAyMDA5IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHN1YklTT1llYXJzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHJldHVybiBhZGRJU09ZZWFycyhkaXJ0eURhdGUsIC1hbW91bnQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3ViSVNPWWVhcnNcbiIsInZhciBhZGRNaWxsaXNlY29uZHMgPSByZXF1aXJlKCcuLi9hZGRfbWlsbGlzZWNvbmRzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTWlsbGlzZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaWxsaXNlY29uZHMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIG1pbGxpc2Vjb25kcyB0byBiZSBzdWJ0cmFjdGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1pbGxpc2Vjb25kcyBzdWJ0cmFjdGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN1YnRyYWN0IDc1MCBtaWxsaXNlY29uZHMgZnJvbSAxMCBKdWx5IDIwMTQgMTI6NDU6MzAuMDAwOlxuICogdmFyIHJlc3VsdCA9IHN1Yk1pbGxpc2Vjb25kcyhuZXcgRGF0ZSgyMDE0LCA2LCAxMCwgMTIsIDQ1LCAzMCwgMCksIDc1MClcbiAqIC8vPT4gVGh1IEp1bCAxMCAyMDE0IDEyOjQ1OjI5LjI1MFxuICovXG5mdW5jdGlvbiBzdWJNaWxsaXNlY29uZHMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgcmV0dXJuIGFkZE1pbGxpc2Vjb25kcyhkaXJ0eURhdGUsIC1hbW91bnQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3ViTWlsbGlzZWNvbmRzXG4iLCJ2YXIgYWRkTWludXRlcyA9IHJlcXVpcmUoJy4uL2FkZF9taW51dGVzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTWludXRlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbnV0ZXMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbnV0ZXMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIG1pbnV0ZXMgdG8gYmUgc3VidHJhY3RlZFxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBtaW50dWVzIHN1YnRyYWN0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3VidHJhY3QgMzAgbWludXRlcyBmcm9tIDEwIEp1bHkgMjAxNCAxMjowMDowMDpcbiAqIHZhciByZXN1bHQgPSBzdWJNaW51dGVzKG5ldyBEYXRlKDIwMTQsIDYsIDEwLCAxMiwgMCksIDMwKVxuICogLy89PiBUaHUgSnVsIDEwIDIwMTQgMTE6MzA6MDBcbiAqL1xuZnVuY3Rpb24gc3ViTWludXRlcyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KVxuICByZXR1cm4gYWRkTWludXRlcyhkaXJ0eURhdGUsIC1hbW91bnQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3ViTWludXRlc1xuIiwidmFyIGFkZE1vbnRocyA9IHJlcXVpcmUoJy4uL2FkZF9tb250aHMvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtb250aHMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1vbnRocyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgbW9udGhzIHRvIGJlIHN1YnRyYWN0ZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbW9udGhzIHN1YnRyYWN0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3VidHJhY3QgNSBtb250aHMgZnJvbSAxIEZlYnJ1YXJ5IDIwMTU6XG4gKiB2YXIgcmVzdWx0ID0gc3ViTW9udGhzKG5ldyBEYXRlKDIwMTUsIDEsIDEpLCA1KVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc3ViTW9udGhzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHJldHVybiBhZGRNb250aHMoZGlydHlEYXRlLCAtYW1vdW50KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1Yk1vbnRoc1xuIiwidmFyIGFkZFF1YXJ0ZXJzID0gcmVxdWlyZSgnLi4vYWRkX3F1YXJ0ZXJzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgUXVhcnRlciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiB5ZWFyIHF1YXJ0ZXJzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiB5ZWFyIHF1YXJ0ZXJzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBxdWFydGVycyB0byBiZSBzdWJ0cmFjdGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIHF1YXJ0ZXJzIHN1YnRyYWN0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3VidHJhY3QgMyBxdWFydGVycyBmcm9tIDEgU2VwdGVtYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gc3ViUXVhcnRlcnMobmV3IERhdGUoMjAxNCwgOCwgMSksIDMpXG4gKiAvLz0+IFN1biBEZWMgMDEgMjAxMyAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzdWJRdWFydGVycyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KVxuICByZXR1cm4gYWRkUXVhcnRlcnMoZGlydHlEYXRlLCAtYW1vdW50KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1YlF1YXJ0ZXJzXG4iLCJ2YXIgYWRkU2Vjb25kcyA9IHJlcXVpcmUoJy4uL2FkZF9zZWNvbmRzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgU2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIHNlY29uZHMgdG8gYmUgc3VidHJhY3RlZFxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBzZWNvbmRzIHN1YnRyYWN0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3VidHJhY3QgMzAgc2Vjb25kcyBmcm9tIDEwIEp1bHkgMjAxNCAxMjo0NTowMDpcbiAqIHZhciByZXN1bHQgPSBzdWJTZWNvbmRzKG5ldyBEYXRlKDIwMTQsIDYsIDEwLCAxMiwgNDUsIDApLCAzMClcbiAqIC8vPT4gVGh1IEp1bCAxMCAyMDE0IDEyOjQ0OjMwXG4gKi9cbmZ1bmN0aW9uIHN1YlNlY29uZHMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgcmV0dXJuIGFkZFNlY29uZHMoZGlydHlEYXRlLCAtYW1vdW50KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1YlNlY29uZHNcbiIsInZhciBhZGRXZWVrcyA9IHJlcXVpcmUoJy4uL2FkZF93ZWVrcy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2Ygd2Vla3MgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHdlZWtzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiB3ZWVrcyB0byBiZSBzdWJ0cmFjdGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIHdlZWtzIHN1YnRyYWN0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3VidHJhY3QgNCB3ZWVrcyBmcm9tIDEgU2VwdGVtYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gc3ViV2Vla3MobmV3IERhdGUoMjAxNCwgOCwgMSksIDQpXG4gKiAvLz0+IE1vbiBBdWcgMDQgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzdWJXZWVrcyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KVxuICByZXR1cm4gYWRkV2Vla3MoZGlydHlEYXRlLCAtYW1vdW50KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1YldlZWtzXG4iLCJ2YXIgYWRkWWVhcnMgPSByZXF1aXJlKCcuLi9hZGRfeWVhcnMvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHllYXJzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiB5ZWFycyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgeWVhcnMgdG8gYmUgc3VidHJhY3RlZFxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSB5ZWFycyBzdWJ0cmFjdGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN1YnRyYWN0IDUgeWVhcnMgZnJvbSAxIFNlcHRlbWJlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IHN1YlllYXJzKG5ldyBEYXRlKDIwMTQsIDgsIDEpLCA1KVxuICogLy89PiBUdWUgU2VwIDAxIDIwMDkgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc3ViWWVhcnMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgcmV0dXJuIGFkZFllYXJzKGRpcnR5RGF0ZSwgLWFtb3VudClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdWJZZWFyc1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsID0gZ2xvYmFsIHx8IHNlbGYsIGZhY3RvcnkoZ2xvYmFsLmZhc3RVbmlxdWVOdW1iZXJzID0ge30pKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIExBU1RfTlVNQkVSX1dFQUtfTUFQID0gbmV3IFdlYWtNYXAoKTtcbiAgICAvKlxuICAgICAqIFRoZSB2YWx1ZSBvZiB0aGUgY29uc3RhbnQgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgZXF1YWxzICgyICoqIDUzIC0gMSkgYnV0IGl0XG4gICAgICogaXMgZmFpcmx5IG5ldy5cbiAgICAgKi9cblxuICAgIHZhciBNQVhfU0FGRV9JTlRFR0VSID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgPT09IHVuZGVmaW5lZCA/IDkwMDcxOTkyNTQ3NDA5OTEgOiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuICAgIHZhciBjYWNoZSA9IGZ1bmN0aW9uIGNhY2hlKGNvbGxlY3Rpb24sIG5leHROdW1iZXIpIHtcbiAgICAgIExBU1RfTlVNQkVSX1dFQUtfTUFQLnNldChjb2xsZWN0aW9uLCBuZXh0TnVtYmVyKTtcbiAgICAgIHJldHVybiBuZXh0TnVtYmVyO1xuICAgIH07XG5cbiAgICB2YXIgZ2VuZXJhdGVVbmlxdWVOdW1iZXIgPSBmdW5jdGlvbiBnZW5lcmF0ZVVuaXF1ZU51bWJlcihjb2xsZWN0aW9uKSB7XG4gICAgICB2YXIgbGFzdE51bWJlciA9IExBU1RfTlVNQkVSX1dFQUtfTUFQLmdldChjb2xsZWN0aW9uKTtcbiAgICAgIC8qXG4gICAgICAgKiBMZXQncyB0cnkgdGhlIGNoZWFwZXN0IGFsZ29yaXRobSBmaXJzdC4gSXQgbWlnaHQgZmFpbCB0byBwcm9kdWNlIGEgbmV3XG4gICAgICAgKiBudW1iZXIsIGJ1dCBpdCBpcyBzbyBjaGVhcCB0aGF0IGl0IGlzIG9rYXkgdG8gdGFrZSB0aGUgcmlzay4gSnVzdFxuICAgICAgICogaW5jcmVhc2UgdGhlIGxhc3QgbnVtYmVyIGJ5IG9uZSBvciByZXNldCBpdCB0byAwIGlmIHdlIHJlYWNoZWQgdGhlIHVwcGVyXG4gICAgICAgKiBib3VuZCBvZiBTTUlzICh3aGljaCBzdGFuZHMgZm9yIHNtYWxsIGludGVnZXJzKS4gV2hlbiB0aGUgbGFzdCBudW1iZXIgaXNcbiAgICAgICAqIHVua25vd24gaXQgaXMgYXNzdW1lZCB0aGF0IHRoZSBjb2xsZWN0aW9uIGNvbnRhaW5zIHplcm8gYmFzZWQgY29uc2VjdXRpdmVcbiAgICAgICAqIG51bWJlcnMuXG4gICAgICAgKi9cblxuICAgICAgdmFyIG5leHROdW1iZXIgPSBsYXN0TnVtYmVyID09PSB1bmRlZmluZWQgPyBjb2xsZWN0aW9uLnNpemUgOiBsYXN0TnVtYmVyID4gMjE0NzQ4MzY0OCA/IDAgOiBsYXN0TnVtYmVyICsgMTtcblxuICAgICAgaWYgKCFjb2xsZWN0aW9uLmhhcyhuZXh0TnVtYmVyKSkge1xuICAgICAgICByZXR1cm4gY2FjaGUoY29sbGVjdGlvbiwgbmV4dE51bWJlcik7XG4gICAgICB9XG4gICAgICAvKlxuICAgICAgICogSWYgdGhlcmUgYXJlIGxlc3MgdGhhbiBoYWxmIG9mIDIgKiogMzEgbnVtYmVycyBzdG9yZWQgaW4gdGhlIGNvbGxlY3Rpb24sXG4gICAgICAgKiB0aGUgY2hhbmNlIHRvIGdlbmVyYXRlIGEgbmV3IHJhbmRvbSBudW1iZXIgaW4gdGhlIHJhbmdlIGZyb20gMCB0byAyICoqIDMxXG4gICAgICAgKiBpcyBhdCBsZWFzdCA1MCUuIEl0J3MgYmVuaWZpdGlhbCB0byB1c2Ugb25seSBTTUlzIGJlY2F1c2UgdGhleSBwZXJmb3JtXG4gICAgICAgKiBtdWNoIGJldHRlciBpbiBhbnkgZW52aXJvbm1lbnQgYmFzZWQgb24gVjguXG4gICAgICAgKi9cblxuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zaXplIDwgMTA3Mzc0MTgyNCkge1xuICAgICAgICB3aGlsZSAoY29sbGVjdGlvbi5oYXMobmV4dE51bWJlcikpIHtcbiAgICAgICAgICBuZXh0TnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjE0NzQ4MzY0OCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2FjaGUoY29sbGVjdGlvbiwgbmV4dE51bWJlcik7XG4gICAgICB9IC8vIFF1aWNrbHkgY2hlY2sgaWYgdGhlcmUgaXMgYSB0aGVvcmV0aWNhbCBjaGFuY2UgdG8gZ2VuZXJhdGUgYSBuZXcgbnVtYmVyLlxuXG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnNpemUgPiBNQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ29uZ3JhdHVsYXRpb25zLCB5b3UgY3JlYXRlZCBhIGNvbGxlY3Rpb24gb2YgdW5pcXVlIG51bWJlcnMgd2hpY2ggdXNlcyBhbGwgYXZhaWxhYmxlIGludGVnZXJzIScpO1xuICAgICAgfSAvLyBPdGhlcndpc2UgdXNlIHRoZSBmdWxsIHNjYWxlIG9mIHNhZmVseSB1c2FibGUgaW50ZWdlcnMuXG5cblxuICAgICAgd2hpbGUgKGNvbGxlY3Rpb24uaGFzKG5leHROdW1iZXIpKSB7XG4gICAgICAgIG5leHROdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNQVhfU0FGRV9JTlRFR0VSKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhY2hlKGNvbGxlY3Rpb24sIG5leHROdW1iZXIpO1xuICAgIH07XG5cbiAgICB2YXIgYWRkVW5pcXVlTnVtYmVyID0gZnVuY3Rpb24gYWRkVW5pcXVlTnVtYmVyKHNldCkge1xuICAgICAgdmFyIG51bWJlciA9IGdlbmVyYXRlVW5pcXVlTnVtYmVyKHNldCk7XG4gICAgICBzZXQuYWRkKG51bWJlcik7XG4gICAgICByZXR1cm4gbnVtYmVyO1xuICAgIH07XG5cbiAgICBleHBvcnRzLmFkZFVuaXF1ZU51bWJlciA9IGFkZFVuaXF1ZU51bWJlcjtcbiAgICBleHBvcnRzLmdlbmVyYXRlVW5pcXVlTnVtYmVyID0gZ2VuZXJhdGVVbmlxdWVOdW1iZXI7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSk7XG4iLCJleHBvcnQgY29uc3QgaXNDYWxsTm90aWZpY2F0aW9uID0gKG1lc3NhZ2UpID0+IHtcbiAgICByZXR1cm4gKG1lc3NhZ2UubWV0aG9kICE9PSB1bmRlZmluZWQgJiYgbWVzc2FnZS5tZXRob2QgPT09ICdjYWxsJyk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9L2J1aWxkL2VzMjAxOC9ndWFyZHMvY2FsbC1ub3RpZmljYXRpb24uanMubWFwIiwiZXhwb3J0IGNvbnN0IGlzQ2xlYXJSZXNwb25zZSA9IChtZXNzYWdlKSA9PiB7XG4gICAgcmV0dXJuIChtZXNzYWdlLmVycm9yID09PSBudWxsICYmIHR5cGVvZiBtZXNzYWdlLmlkID09PSAnbnVtYmVyJyk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9L2J1aWxkL2VzMjAxOC9ndWFyZHMvY2xlYXItcmVzcG9uc2UuanMubWFwIiwiaW1wb3J0IHsgZ2VuZXJhdGVVbmlxdWVOdW1iZXIgfSBmcm9tICdmYXN0LXVuaXF1ZS1udW1iZXJzJztcbmltcG9ydCB7IGlzQ2FsbE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vZ3VhcmRzL2NhbGwtbm90aWZpY2F0aW9uJztcbmltcG9ydCB7IGlzQ2xlYXJSZXNwb25zZSB9IGZyb20gJy4vZ3VhcmRzL2NsZWFyLXJlc3BvbnNlJztcbmV4cG9ydCBjb25zdCBsb2FkID0gKHVybCkgPT4ge1xuICAgIGNvbnN0IHNjaGVkdWxlZEludGVydmFsRnVuY3Rpb25zID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IHNjaGVkdWxlZFRpbWVvdXRGdW5jdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgdW5yZXNwb25kZWRSZXF1ZXN0cyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCB3b3JrZXIgPSBuZXcgV29ya2VyKHVybCk7XG4gICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgaWYgKGlzQ2FsbE5vdGlmaWNhdGlvbihkYXRhKSkge1xuICAgICAgICAgICAgY29uc3QgeyBwYXJhbXM6IHsgdGltZXJJZCwgdGltZXJUeXBlIH0gfSA9IGRhdGE7XG4gICAgICAgICAgICBpZiAodGltZXJUeXBlID09PSAnaW50ZXJ2YWwnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWRPckZ1bmMgPSBzY2hlZHVsZWRJbnRlcnZhbEZ1bmN0aW9ucy5nZXQodGltZXJJZCk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpZE9yRnVuYyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZXJJZEFuZFRpbWVyVHlwZSA9IHVucmVzcG9uZGVkUmVxdWVzdHMuZ2V0KGlkT3JGdW5jKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVySWRBbmRUaW1lclR5cGUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgdGltZXJJZEFuZFRpbWVyVHlwZS50aW1lcklkICE9PSB0aW1lcklkXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aW1lcklkQW5kVGltZXJUeXBlLnRpbWVyVHlwZSAhPT0gdGltZXJUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB0aW1lciBpcyBpbiBhbiB1bmRlZmluZWQgc3RhdGUuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGlkT3JGdW5jICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZE9yRnVuYygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdGltZXIgaXMgaW4gYW4gdW5kZWZpbmVkIHN0YXRlLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRpbWVyVHlwZSA9PT0gJ3RpbWVvdXQnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWRPckZ1bmMgPSBzY2hlZHVsZWRUaW1lb3V0RnVuY3Rpb25zLmdldCh0aW1lcklkKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlkT3JGdW5jID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lcklkQW5kVGltZXJUeXBlID0gdW5yZXNwb25kZWRSZXF1ZXN0cy5nZXQoaWRPckZ1bmMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGltZXJJZEFuZFRpbWVyVHlwZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aW1lcklkQW5kVGltZXJUeXBlLnRpbWVySWQgIT09IHRpbWVySWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHRpbWVySWRBbmRUaW1lclR5cGUudGltZXJUeXBlICE9PSB0aW1lclR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHRpbWVyIGlzIGluIGFuIHVuZGVmaW5lZCBzdGF0ZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgaWRPckZ1bmMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkT3JGdW5jKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgdGltZW91dCBjYW4gYmUgc2F2ZWx5IGRlbGV0ZWQgYmVjYXVzZSBpdCBpcyBvbmx5IGNhbGxlZCBvbmNlLlxuICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWRUaW1lb3V0RnVuY3Rpb25zLmRlbGV0ZSh0aW1lcklkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHRpbWVyIGlzIGluIGFuIHVuZGVmaW5lZCBzdGF0ZS4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNDbGVhclJlc3BvbnNlKGRhdGEpKSB7XG4gICAgICAgICAgICBjb25zdCB7IGlkIH0gPSBkYXRhO1xuICAgICAgICAgICAgY29uc3QgdGltZXJJZEFuZFRpbWVyVHlwZSA9IHVucmVzcG9uZGVkUmVxdWVzdHMuZ2V0KGlkKTtcbiAgICAgICAgICAgIGlmICh0aW1lcklkQW5kVGltZXJUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB0aW1lciBpcyBpbiBhbiB1bmRlZmluZWQgc3RhdGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHRpbWVySWQsIHRpbWVyVHlwZSB9ID0gdGltZXJJZEFuZFRpbWVyVHlwZTtcbiAgICAgICAgICAgICAgICB1bnJlc3BvbmRlZFJlcXVlc3RzLmRlbGV0ZShpZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVyVHlwZSA9PT0gJ2ludGVydmFsJykge1xuICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWRJbnRlcnZhbEZ1bmN0aW9ucy5kZWxldGUodGltZXJJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWRUaW1lb3V0RnVuY3Rpb25zLmRlbGV0ZSh0aW1lcklkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB7IGVycm9yOiB7IG1lc3NhZ2UgfSB9ID0gZGF0YTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGNsZWFySW50ZXJ2YWwgPSAodGltZXJJZCkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IGdlbmVyYXRlVW5pcXVlTnVtYmVyKHVucmVzcG9uZGVkUmVxdWVzdHMpO1xuICAgICAgICB1bnJlc3BvbmRlZFJlcXVlc3RzLnNldChpZCwgeyB0aW1lcklkLCB0aW1lclR5cGU6ICdpbnRlcnZhbCcgfSk7XG4gICAgICAgIHNjaGVkdWxlZEludGVydmFsRnVuY3Rpb25zLnNldCh0aW1lcklkLCBpZCk7XG4gICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIG1ldGhvZDogJ2NsZWFyJyxcbiAgICAgICAgICAgIHBhcmFtczogeyB0aW1lcklkLCB0aW1lclR5cGU6ICdpbnRlcnZhbCcgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGNsZWFyVGltZW91dCA9ICh0aW1lcklkKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkID0gZ2VuZXJhdGVVbmlxdWVOdW1iZXIodW5yZXNwb25kZWRSZXF1ZXN0cyk7XG4gICAgICAgIHVucmVzcG9uZGVkUmVxdWVzdHMuc2V0KGlkLCB7IHRpbWVySWQsIHRpbWVyVHlwZTogJ3RpbWVvdXQnIH0pO1xuICAgICAgICBzY2hlZHVsZWRUaW1lb3V0RnVuY3Rpb25zLnNldCh0aW1lcklkLCBpZCk7XG4gICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIG1ldGhvZDogJ2NsZWFyJyxcbiAgICAgICAgICAgIHBhcmFtczogeyB0aW1lcklkLCB0aW1lclR5cGU6ICd0aW1lb3V0JyB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3Qgc2V0SW50ZXJ2YWwgPSAoZnVuYywgZGVsYXkpID0+IHtcbiAgICAgICAgY29uc3QgdGltZXJJZCA9IGdlbmVyYXRlVW5pcXVlTnVtYmVyKHNjaGVkdWxlZEludGVydmFsRnVuY3Rpb25zKTtcbiAgICAgICAgc2NoZWR1bGVkSW50ZXJ2YWxGdW5jdGlvbnMuc2V0KHRpbWVySWQsICgpID0+IHtcbiAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgICAgIC8vIERvdWJsZWNoZWNrIGlmIHRoZSBpbnRlcnZhbCBzaG91bGQgc3RpbGwgYmUgcmVzY2hlZHVsZWQgYmVjYXVzZSBpdCBjb3VsZCBoYXZlIGJlZW4gY2xlYXJlZCBpbnNpZGUgb2YgZnVuYygpLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzY2hlZHVsZWRJbnRlcnZhbEZ1bmN0aW9ucy5nZXQodGltZXJJZCkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdzogcGVyZm9ybWFuY2Uubm93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXJUeXBlOiAnaW50ZXJ2YWwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgIG1ldGhvZDogJ3NldCcsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBkZWxheSxcbiAgICAgICAgICAgICAgICBub3c6IHBlcmZvcm1hbmNlLm5vdygpLFxuICAgICAgICAgICAgICAgIHRpbWVySWQsXG4gICAgICAgICAgICAgICAgdGltZXJUeXBlOiAnaW50ZXJ2YWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGltZXJJZDtcbiAgICB9O1xuICAgIGNvbnN0IHNldFRpbWVvdXQgPSAoZnVuYywgZGVsYXkpID0+IHtcbiAgICAgICAgY29uc3QgdGltZXJJZCA9IGdlbmVyYXRlVW5pcXVlTnVtYmVyKHNjaGVkdWxlZFRpbWVvdXRGdW5jdGlvbnMpO1xuICAgICAgICBzY2hlZHVsZWRUaW1lb3V0RnVuY3Rpb25zLnNldCh0aW1lcklkLCBmdW5jKTtcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgbWV0aG9kOiAnc2V0JyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgIGRlbGF5LFxuICAgICAgICAgICAgICAgIG5vdzogcGVyZm9ybWFuY2Uubm93KCksXG4gICAgICAgICAgICAgICAgdGltZXJJZCxcbiAgICAgICAgICAgICAgICB0aW1lclR5cGU6ICd0aW1lb3V0J1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRpbWVySWQ7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBjbGVhckludGVydmFsLFxuICAgICAgICBjbGVhclRpbWVvdXQsXG4gICAgICAgIHNldEludGVydmFsLFxuICAgICAgICBzZXRUaW1lb3V0XG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD0vYnVpbGQvZXMyMDE4L21vZHVsZS5qcy5tYXAiLCJpbXBvcnQgeyBsb2FkIH0gZnJvbSAnd29ya2VyLXRpbWVycy1icm9rZXInO1xuaW1wb3J0IHsgd29ya2VyIH0gZnJvbSAnLi93b3JrZXIvd29ya2VyJztcbmNvbnN0IGJsb2IgPSBuZXcgQmxvYihbd29ya2VyXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vamF2YXNjcmlwdDsgY2hhcnNldD11dGYtOCcgfSk7XG5jb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuY29uc3Qgd29ya2VyVGltZXJzID0gbG9hZCh1cmwpO1xuZXhwb3J0IGNvbnN0IGNsZWFySW50ZXJ2YWwgPSB3b3JrZXJUaW1lcnMuY2xlYXJJbnRlcnZhbDtcbmV4cG9ydCBjb25zdCBjbGVhclRpbWVvdXQgPSB3b3JrZXJUaW1lcnMuY2xlYXJUaW1lb3V0O1xuZXhwb3J0IGNvbnN0IHNldEludGVydmFsID0gd29ya2VyVGltZXJzLnNldEludGVydmFsO1xuZXhwb3J0IGNvbnN0IHNldFRpbWVvdXQgPSB3b3JrZXJUaW1lcnMuc2V0VGltZW91dDtcblVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS9idWlsZC9lczIwMTgvbW9kdWxlLmpzLm1hcCIsIi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbmV4cG9ydCBjb25zdCB3b3JrZXIgPSBgIWZ1bmN0aW9uKGUpe3ZhciB0PXt9O2Z1bmN0aW9uIHIobil7aWYodFtuXSlyZXR1cm4gdFtuXS5leHBvcnRzO3ZhciBvPXRbbl09e2k6bixsOiExLGV4cG9ydHM6e319O3JldHVybiBlW25dLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLHIpLG8ubD0hMCxvLmV4cG9ydHN9ci5tPWUsci5jPXQsci5kPWZ1bmN0aW9uKGUsdCxuKXtyLm8oZSx0KXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6bn0pfSxyLnI9ZnVuY3Rpb24oZSl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX0sci50PWZ1bmN0aW9uKGUsdCl7aWYoMSZ0JiYoZT1yKGUpKSw4JnQpcmV0dXJuIGU7aWYoNCZ0JiZcIm9iamVjdFwiPT10eXBlb2YgZSYmZSYmZS5fX2VzTW9kdWxlKXJldHVybiBlO3ZhciBuPU9iamVjdC5jcmVhdGUobnVsbCk7aWYoci5yKG4pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuLFwiZGVmYXVsdFwiLHtlbnVtZXJhYmxlOiEwLHZhbHVlOmV9KSwyJnQmJlwic3RyaW5nXCIhPXR5cGVvZiBlKWZvcih2YXIgbyBpbiBlKXIuZChuLG8sZnVuY3Rpb24odCl7cmV0dXJuIGVbdF19LmJpbmQobnVsbCxvKSk7cmV0dXJuIG59LHIubj1mdW5jdGlvbihlKXt2YXIgdD1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gci5kKHQsXCJhXCIsdCksdH0sci5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSxyLnA9XCJcIixyKHIucz0wKX0oW2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtyLnIodCk7Y29uc3Qgbj1uZXcgTWFwLG89bmV3IE1hcCxpPShlLHQpPT57bGV0IHIsbjtpZihcInBlcmZvcm1hbmNlXCJpbiBzZWxmKXtjb25zdCBvPXBlcmZvcm1hbmNlLm5vdygpO3I9byxuPWUtTWF0aC5tYXgoMCxvLXQpfWVsc2Ugcj1EYXRlLm5vdygpLG49ZTtyZXR1cm57ZXhwZWN0ZWQ6cituLHJlbWFpbmluZ0RlbGF5Om59fSxzPShlLHQscixuKT0+e2NvbnN0IG89XCJwZXJmb3JtYW5jZVwiaW4gc2VsZj9wZXJmb3JtYW5jZS5ub3coKTpEYXRlLm5vdygpO28+cj9wb3N0TWVzc2FnZSh7aWQ6bnVsbCxtZXRob2Q6XCJjYWxsXCIscGFyYW1zOnt0aW1lcklkOnQsdGltZXJUeXBlOm59fSk6ZS5zZXQodCxzZXRUaW1lb3V0KHMsci1vLGUsdCxyLG4pKX07YWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixlPT57bGV0IHQ9ZS5kYXRhO3RyeXtpZihcImNsZWFyXCI9PT10Lm1ldGhvZCl7Y29uc3QgZT10LmlkLHI9dC5wYXJhbXMsaT1yLnRpbWVySWQscz1yLnRpbWVyVHlwZTtpZihcImludGVydmFsXCI9PT1zKShlPT57Y29uc3QgdD1uLmdldChlKTtpZih2b2lkIDA9PT10KXRocm93IG5ldyBFcnJvcignVGhlcmUgaXMgbm8gaW50ZXJ2YWwgc2NoZWR1bGVkIHdpdGggdGhlIGdpdmVuIGlkIFwiJy5jb25jYXQoZSwnXCIuJykpO2NsZWFyVGltZW91dCh0KSxuLmRlbGV0ZShlKX0pKGkpLHBvc3RNZXNzYWdlKHtlcnJvcjpudWxsLGlkOmV9KTtlbHNle2lmKFwidGltZW91dFwiIT09cyl0aHJvdyBuZXcgRXJyb3IoJ1RoZSBnaXZlbiB0eXBlIFwiJy5jb25jYXQocywnXCIgaXMgbm90IHN1cHBvcnRlZCcpKTsoZT0+e2NvbnN0IHQ9by5nZXQoZSk7aWYodm9pZCAwPT09dCl0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIG5vIHRpbWVvdXQgc2NoZWR1bGVkIHdpdGggdGhlIGdpdmVuIGlkIFwiJy5jb25jYXQoZSwnXCIuJykpO2NsZWFyVGltZW91dCh0KSxvLmRlbGV0ZShlKX0pKGkpLHBvc3RNZXNzYWdlKHtlcnJvcjpudWxsLGlkOmV9KX19ZWxzZXtpZihcInNldFwiIT09dC5tZXRob2QpdGhyb3cgbmV3IEVycm9yKCdUaGUgZ2l2ZW4gbWV0aG9kIFwiJy5jb25jYXQodC5tZXRob2QsJ1wiIGlzIG5vdCBzdXBwb3J0ZWQnKSk7e2NvbnN0IGU9dC5wYXJhbXMscj1lLmRlbGF5LGE9ZS5ub3csbD1lLnRpbWVySWQsYz1lLnRpbWVyVHlwZTtpZihcImludGVydmFsXCI9PT1jKSgoZSx0LHIpPT57Y29uc3Qgbz1pKGUsciksYT1vLmV4cGVjdGVkLGw9by5yZW1haW5pbmdEZWxheTtuLnNldCh0LHNldFRpbWVvdXQocyxsLG4sdCxhLFwiaW50ZXJ2YWxcIikpfSkocixsLGEpO2Vsc2V7aWYoXCJ0aW1lb3V0XCIhPT1jKXRocm93IG5ldyBFcnJvcignVGhlIGdpdmVuIHR5cGUgXCInLmNvbmNhdChjLCdcIiBpcyBub3Qgc3VwcG9ydGVkJykpOygoZSx0LHIpPT57Y29uc3Qgbj1pKGUsciksYT1uLmV4cGVjdGVkLGw9bi5yZW1haW5pbmdEZWxheTtvLnNldCh0LHNldFRpbWVvdXQocyxsLG8sdCxhLFwidGltZW91dFwiKSl9KShyLGwsYSl9fX19Y2F0Y2goZSl7cG9zdE1lc3NhZ2Uoe2Vycm9yOnttZXNzYWdlOmUubWVzc2FnZX0saWQ6dC5pZCxyZXN1bHQ6bnVsbH0pfX0pfV0pO2A7XG4vLyMgc291cmNlTWFwcGluZ1VSTD0vYnVpbGQvZXMyMDE4L3dvcmtlci93b3JrZXIuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==