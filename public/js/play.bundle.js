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
var countdownStartingBronze = new Audio('/audio/5.wav');
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
      worker_timers__WEBPACK_IMPORTED_MODULE_2__["clearInterval"](countdownInterval);
      countdown.text('Go!');
      $('#step-1 p').hide();
      setTimeout(onStep1End, 2500);
    }
  } else {
    countdown.text("".concat(m, "m ").concat(s, "s"));

    if (m === 5 && s === 0) {
      countdown5MinutesAudio.play();
    }

    if (m === 3 && s === 0) {
      countdown3MinutesAudio.play();
    }

    if (m === 1 && s === 0) {
      countdown1MinuteAudio.play();
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
        location.reload();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2Nzcy9wbGF5LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkX2RheXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2FkZF9ob3Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkX2lzb195ZWFycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkX21pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkX21pbnV0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2FkZF9tb250aHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2FkZF9xdWFydGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkX3NlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2FkZF93ZWVrcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkX3llYXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9hcmVfcmFuZ2VzX292ZXJsYXBwaW5nL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9jbG9zZXN0X2luZGV4X3RvL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9jbG9zZXN0X3RvL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9jb21wYXJlX2FzYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29tcGFyZV9kZXNjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX2RheXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfaXNvX3dlZWtzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX2lzb195ZWFycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl9tb250aHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfcXVhcnRlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfd2Vla3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfeWVhcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fZGF5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZGlmZmVyZW5jZV9pbl9ob3Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZGlmZmVyZW5jZV9pbl9pc29feWVhcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fbWlsbGlzZWNvbmRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX21pbnV0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fbW9udGhzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX3F1YXJ0ZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX3NlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fd2Vla3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5feWVhcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2Rpc3RhbmNlX2luX3dvcmRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaXN0YW5jZV9pbl93b3Jkc19zdHJpY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2Rpc3RhbmNlX2luX3dvcmRzX3RvX25vdy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZWFjaF9kYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VuZF9vZl9kYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VuZF9vZl9ob3VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lbmRfb2ZfaXNvX3dlZWsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VuZF9vZl9pc29feWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZW5kX29mX21pbnV0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZW5kX29mX21vbnRoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lbmRfb2ZfcXVhcnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZW5kX29mX3NlY29uZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZW5kX29mX3RvZGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lbmRfb2ZfdG9tb3Jyb3cvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VuZF9vZl93ZWVrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lbmRfb2ZfeWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZW5kX29mX3llc3RlcmRheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZm9ybWF0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRfZGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X2RheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X2RheV9vZl95ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRfZGF5c19pbl9tb250aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X2RheXNfaW5feWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X2hvdXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRfaXNvX2RheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X2lzb193ZWVrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRfaXNvX3dlZWtzX2luX3llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldF9pc29feWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X21pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X21pbnV0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldF9tb250aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X292ZXJsYXBwaW5nX2RheXNfaW5fcmFuZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRfcXVhcnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0X3NlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldF90aW1lL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRfeWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX2FmdGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19iZWZvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX2RhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX2VxdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19maXJzdF9kYXlfb2ZfbW9udGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX2ZyaWRheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfZnV0dXJlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19sYXN0X2RheV9vZl9tb250aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfbGVhcF95ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19tb25kYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3Bhc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3NhbWVfZGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19zYW1lX2hvdXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3NhbWVfaXNvX3dlZWsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3NhbWVfaXNvX3llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3NhbWVfbWludXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19zYW1lX21vbnRoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19zYW1lX3F1YXJ0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3NhbWVfc2Vjb25kL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19zYW1lX3dlZWsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3NhbWVfeWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfc2F0dXJkYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3N1bmRheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfdGhpc19ob3VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc190aGlzX2lzb193ZWVrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc190aGlzX2lzb195ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc190aGlzX21pbnV0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfdGhpc19tb250aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfdGhpc19xdWFydGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc190aGlzX3NlY29uZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfdGhpc193ZWVrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc190aGlzX3llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3RodXJzZGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc190b2RheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfdG9tb3Jyb3cvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3R1ZXNkYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3ZhbGlkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc193ZWRuZXNkYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3dlZWtlbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX3dpdGhpbl9yYW5nZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNfeWVzdGVyZGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sYXN0X2RheV9vZl9pc29fd2Vlay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbGFzdF9kYXlfb2ZfaXNvX3llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xhc3RfZGF5X29mX21vbnRoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sYXN0X2RheV9vZl9xdWFydGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sYXN0X2RheV9vZl93ZWVrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sYXN0X2RheV9vZl95ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZF9mb3JtYXR0aW5nX3Rva2Vuc19yZWdfZXhwL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4vYnVpbGRfZGlzdGFuY2VfaW5fd29yZHNfbG9jYWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4vYnVpbGRfZm9ybWF0X2xvY2FsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9tYXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL21pbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvcGFyc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3NldF9kYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zZXRfZGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zZXRfZGF5X29mX3llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3NldF9ob3Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc2V0X2lzb19kYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3NldF9pc29fd2Vlay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc2V0X2lzb195ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zZXRfbWlsbGlzZWNvbmRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zZXRfbWludXRlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc2V0X21vbnRoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zZXRfcXVhcnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc2V0X3NlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3NldF95ZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydF9vZl9kYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0X29mX2hvdXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0X29mX2lzb193ZWVrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydF9vZl9pc29feWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRfb2ZfbWludXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydF9vZl9tb250aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRfb2ZfcXVhcnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRfb2Zfc2Vjb25kL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydF9vZl90b2RheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRfb2ZfdG9tb3Jyb3cvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0X29mX3dlZWsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0X29mX3llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0X29mX3llc3RlcmRheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3ViX2RheXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N1Yl9ob3Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3ViX2lzb195ZWFycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3ViX21pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3ViX21pbnV0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N1Yl9tb250aHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N1Yl9xdWFydGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3ViX3NlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N1Yl93ZWVrcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3ViX3llYXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYXN0LXVuaXF1ZS1udW1iZXJzL2J1aWxkL2VzNS9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lcnMtYnJva2VyL2J1aWxkL2VzMjAxOC9ndWFyZHMvY2FsbC1ub3RpZmljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lcnMtYnJva2VyL2J1aWxkL2VzMjAxOC9ndWFyZHMvY2xlYXItcmVzcG9uc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lcnMtYnJva2VyL2J1aWxkL2VzMjAxOC9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lcnMvYnVpbGQvZXMyMDE4L21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd29ya2VyLXRpbWVycy9idWlsZC9lczIwMTgvd29ya2VyL3dvcmtlci5qcyJdLCJuYW1lcyI6WyJzb2NrZXQiLCJpbyIsImhvc3QiLCJjb3VudGRvd241TWludXRlc0F1ZGlvIiwiQXVkaW8iLCJjb3VudGRvd24zTWludXRlc0F1ZGlvIiwiY291bnRkb3duMU1pbnV0ZUF1ZGlvIiwiY291bnRkb3duU3RhcnRpbmdCcm9uemUiLCJjb3VudGRvd24zQXVkaW8iLCJjb3VudGRvd24yQXVkaW8iLCJjb3VudGRvd24xQXVkaW8iLCJjb3VudGRvd24wQXVkaW8iLCJjdXJyZW50VGltZSIsImV2ZW50VGltZSIsImFqYXhJbnRlcnZhbCIsImNvdW50ZG93bkludGVydmFsIiwiJCIsImxlbmd0aCIsImdldFRpbWVGcm9tU2VydmVyIiwidGhlbiIsInN0YXJ0Q291bnRkb3duIiwid29ya2VyVGltZXJzIiwib24iLCJkYXRhIiwidGV4dCIsImtleXByZXNzIiwib25TdGVwMklucHV0S2V5cHJlc3MiLCJjbGljayIsIm9uU3RlcDJCdXR0b25DbGljayIsImFqYXhUaW1lU3RhcnQiLCJEYXRlIiwibm93IiwiZ2V0IiwicmVzcG9uc2UiLCJhamF4VGltZSIsImFkZE1pbGxpc2Vjb25kcyIsInVwZGF0ZUNvdW50ZG93biIsImNvdW50ZG93biIsIm0iLCJkaWZmZXJlbmNlSW5NaW51dGVzIiwicyIsImRpZmZlcmVuY2VJblNlY29uZHMiLCJtcyIsIk1hdGgiLCJmbG9vciIsImRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyIsIlN0cmluZyIsImNoYXJBdCIsInBsYXkiLCJoaWRlIiwic2V0VGltZW91dCIsIm9uU3RlcDFFbmQiLCJmYWRlT3V0IiwiZmFkZUluIiwiZXZlbnQiLCJjb2RlIiwia2V5Q29kZSIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJhbGVydCIsImFkZENsYXNzIiwiZm9ybSIsImlzVmFsaWQiLCJjaGVja1ZhbGlkaXR5IiwiYnV0dG9uIiwiYnV0dG9uSHRtbCIsImh0bWwiLCJhdHRyIiwic2VydmVySWQiLCJ2YWwiLCJhamF4IiwidXJsIiwidHlwZSIsImRvbmUiLCJyZW1vdmVDbGFzcyIsIm9uU3RlcDJFbmQiLCJmYWlsIiwicmVzcG9uc2VKU09OIiwibWVzc2FnZSIsImxvY2F0aW9uIiwicmVsb2FkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFF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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Qyx1QkFBdUIscURBQU0sSUFBSSwrQkFBK0IsaUJBQWlCO0FBQ2pGO0FBQ0EscUJBQXFCLGlFQUFJO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ1A7QUFDQSxnRDs7Ozs7Ozs7Ozs7O0FDVkE7QUFBQTtBQUFBO0FBQ08sNkJBQTZCLFNBQVMsY0FBYyw0QkFBNEIsWUFBWSxxQkFBcUIsMkRBQTJELGdDQUFnQyxxQ0FBcUMsb0JBQW9CLEVBQUUsaUJBQWlCLDRGQUE0RixlQUFlLHdDQUF3QyxTQUFTLEVBQUUsbUJBQW1CLDhCQUE4QixxREFBcUQsMEJBQTBCLDZDQUE2QyxzQkFBc0IsNkRBQTZELFlBQVksZUFBZSxTQUFTLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxpQkFBaUIsa0JBQWtCLGFBQWEsT0FBTyxvQ0FBb0MsUUFBUSx5QkFBeUIsMEJBQTBCLHdCQUF3QixzQkFBc0IsT0FBTywrQkFBK0IsZUFBZSwwREFBMEQsaUJBQWlCLDhCQUE4Qix1QkFBdUIsc0NBQXNDLCtCQUErQixhQUFhLElBQUksdUJBQXVCLGtEQUFrRCx1QkFBdUIsaUJBQWlCLG1HQUFtRyw0QkFBNEIsa0JBQWtCLGdCQUFnQixFQUFFLEtBQUssb0ZBQW9GLEtBQUssaUJBQWlCLGtHQUFrRyw0QkFBNEIsa0JBQWtCLGdCQUFnQixHQUFHLEtBQUssaUdBQWlHLDZEQUE2RCw2QkFBNkIsK0NBQStDLDBDQUEwQyxTQUFTLEtBQUssb0ZBQW9GLFdBQVcsK0NBQStDLHlDQUF5QyxZQUFZLFNBQVMsYUFBYSxPQUFPLGtCQUFrQixxQkFBcUIsR0FBRyxFQUFFLEdBQUc7QUFDLzdFLHVEIiwiZmlsZSI6InBsYXkuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9jbGllbnQvanMvcGxheS5qc1wiKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCAnLi4vY3NzL3BsYXkuc2Nzcyc7XHJcblxyXG5pbXBvcnQge2FkZE1pbGxpc2Vjb25kcywgZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzLCBkaWZmZXJlbmNlSW5NaW51dGVzLCBkaWZmZXJlbmNlSW5TZWNvbmRzfSBmcm9tICdkYXRlLWZucyc7XHJcbmltcG9ydCAqIGFzIHdvcmtlclRpbWVycyBmcm9tICd3b3JrZXItdGltZXJzJztcclxuXHJcbmNvbnN0IHNvY2tldCA9IGlvKGhvc3QpO1xyXG5cclxudmFyIGNvdW50ZG93bjVNaW51dGVzQXVkaW8gPSBuZXcgQXVkaW8oJy9hdWRpby81LW1pbnV0ZXMud2F2Jyk7XHJcbnZhciBjb3VudGRvd24zTWludXRlc0F1ZGlvID0gbmV3IEF1ZGlvKCcvYXVkaW8vMy1taW51dGVzLndhdicpO1xyXG52YXIgY291bnRkb3duMU1pbnV0ZUF1ZGlvID0gbmV3IEF1ZGlvKCcvYXVkaW8vMS1taW51dGUud2F2Jyk7XHJcbnZhciBjb3VudGRvd25TdGFydGluZ0Jyb256ZSA9IG5ldyBBdWRpbygnL2F1ZGlvLzUud2F2Jyk7XHJcbnZhciBjb3VudGRvd24zQXVkaW8gPSBuZXcgQXVkaW8oJy9hdWRpby8zLndhdicpO1xyXG52YXIgY291bnRkb3duMkF1ZGlvID0gbmV3IEF1ZGlvKCcvYXVkaW8vMi53YXYnKTtcclxudmFyIGNvdW50ZG93bjFBdWRpbyA9IG5ldyBBdWRpbygnL2F1ZGlvLzEud2F2Jyk7XHJcbnZhciBjb3VudGRvd24wQXVkaW8gPSBuZXcgQXVkaW8oJy9hdWRpby8wLndhdicpO1xyXG5sZXQgY3VycmVudFRpbWUsIGV2ZW50VGltZTtcclxubGV0IGFqYXhJbnRlcnZhbCwgY291bnRkb3duSW50ZXJ2YWw7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgkKCcjc3RlcC0xLCAjc3RlcC0yLCAjc3RlcC0zJykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRpbWVGcm9tU2VydmVyKCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc3RhcnRDb3VudGRvd24oKTtcclxuXHJcbiAgICAgICAgYWpheEludGVydmFsID0gd29ya2VyVGltZXJzLnNldEludGVydmFsKGdldFRpbWVGcm9tU2VydmVyLCAxMDAwICogMTUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc29ja2V0Lm9uKCdvbmxpbmVDb3VudGVyJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAkKCcjb25saW5lLWNvdW50ZXInKS50ZXh0KGRhdGEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI3N0ZXAtMiAuZm9ybS1jb250cm9sJykua2V5cHJlc3Mob25TdGVwMklucHV0S2V5cHJlc3MpO1xyXG4gICAgJCgnI3N0ZXAtMiBidXR0b24nKS5jbGljayhvblN0ZXAyQnV0dG9uQ2xpY2spO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGdldFRpbWVGcm9tU2VydmVyKCkge1xyXG4gICAgdmFyIGFqYXhUaW1lU3RhcnQgPSBEYXRlLm5vdygpO1xyXG4gICAgcmV0dXJuICQuZ2V0KCcvYXBpL2NvdW50ZG93bicsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIC8vIEFkZCB0aGUgbnVtYmVyIG9mIG1zIGl0IHRvb2sgZm9yIHRoZSBBamF4IHJlcXVlc3QgdG8gY29tcGxldGVcclxuICAgICAgICBsZXQgYWpheFRpbWUgPSBEYXRlLm5vdygpIC0gYWpheFRpbWVTdGFydDtcclxuICAgICAgICBjdXJyZW50VGltZSA9IGFkZE1pbGxpc2Vjb25kcyhuZXcgRGF0ZShyZXNwb25zZS5kYXRhLmN1cnJlbnRUaW1lKSwgYWpheFRpbWUpO1xyXG4gICAgICAgIGV2ZW50VGltZSA9IG5ldyBEYXRlKHJlc3BvbnNlLmRhdGEuZXZlbnRUaW1lKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydENvdW50ZG93bigpIHtcclxuICAgIHVwZGF0ZUNvdW50ZG93bigpO1xyXG4gICAgY291bnRkb3duSW50ZXJ2YWwgPSB3b3JrZXJUaW1lcnMuc2V0SW50ZXJ2YWwodXBkYXRlQ291bnRkb3duLCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVDb3VudGRvd24oKSB7XHJcbiAgICBsZXQgY291bnRkb3duID0gJCgnI3N0ZXAtMSBoMScpO1xyXG5cclxuICAgIGxldCBtID0gZGlmZmVyZW5jZUluTWludXRlcyhldmVudFRpbWUsIGN1cnJlbnRUaW1lKTtcclxuICAgIGxldCBzID0gZGlmZmVyZW5jZUluU2Vjb25kcyhldmVudFRpbWUsIGN1cnJlbnRUaW1lKSAlIDYwO1xyXG4gICAgaWYgKG0gPCAxKSB7XHJcbiAgICAgICAgbGV0IG1zID0gTWF0aC5mbG9vcigoZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzKGV2ZW50VGltZSwgY3VycmVudFRpbWUpICUgMTAwMCkgLyAxMDApICogMTAwO1xyXG4gICAgICAgIGNvdW50ZG93bi50ZXh0KGAke3N9LiR7U3RyaW5nKG1zKS5jaGFyQXQoMCl9c2ApO1xyXG5cclxuICAgICAgICBpZiAocyA9PT0gNSAmJiBtcyA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb3VudGRvd25TdGFydGluZ0Jyb256ZS5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzID09PSAzICYmIG1zID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZG93bjNBdWRpby5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzID09PSAyICYmIG1zID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZG93bjJBdWRpby5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzID09PSAxICYmIG1zID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZG93bjFBdWRpby5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzIDw9IDAgJiYgbXMgPD0gMCkge1xyXG4gICAgICAgICAgICBjb3VudGRvd24wQXVkaW8ucGxheSgpO1xyXG4gICAgICAgICAgICB3b3JrZXJUaW1lcnMuY2xlYXJJbnRlcnZhbChjb3VudGRvd25JbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIGNvdW50ZG93bi50ZXh0KCdHbyEnKTtcclxuICAgICAgICAgICAgJCgnI3N0ZXAtMSBwJykuaGlkZSgpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KG9uU3RlcDFFbmQsIDI1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY291bnRkb3duLnRleHQoYCR7bX1tICR7c31zYCk7XHJcblxyXG4gICAgICAgIGlmIChtID09PSA1ICYmIHMgPT09IDApIHtcclxuICAgICAgICAgICAgY291bnRkb3duNU1pbnV0ZXNBdWRpby5wbGF5KClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG0gPT09IDMgJiYgcyA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb3VudGRvd24zTWludXRlc0F1ZGlvLnBsYXkoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobSA9PT0gMSAmJiBzID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZG93bjFNaW51dGVBdWRpby5wbGF5KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjdXJyZW50VGltZSA9IGFkZE1pbGxpc2Vjb25kcyhjdXJyZW50VGltZSwgMTAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25TdGVwMUVuZCgpIHtcclxuICAgICQoJyNzdGVwLTEnKS5mYWRlT3V0KDI1MCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJyNzdGVwLTInKS5mYWRlSW4oMzAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIEZhZGluZyBhbmltYXRpb25zIGNvbXBsZXRlXHJcbiAgICAgICAgICAgIHdvcmtlclRpbWVycy5jbGVhckludGVydmFsKGFqYXhJbnRlcnZhbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25TdGVwMklucHV0S2V5cHJlc3MoZXZlbnQpIHtcclxuICAgIGxldCBjb2RlID0gZXZlbnQua2V5Q29kZSB8fCBldmVudC53aGljaDtcclxuICAgIGlmIChjb2RlID09PSAxMykge1xyXG4gICAgICAgIG9uU3RlcDJCdXR0b25DbGljayhldmVudCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uU3RlcDJCdXR0b25DbGljayhldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBsZXQgYWxlcnQgPSAkKCcjc3RlcC0yIC5hbGVydC5hbGVydC1kYW5nZXInKTtcclxuICAgIGFsZXJ0LmFkZENsYXNzKCdkLW5vbmUnKTtcclxuXHJcbiAgICAvLyBWYWxpZGF0ZSBmb3JtXHJcbiAgICBsZXQgZm9ybSA9ICQoJyNzdGVwLTIgLm5lZWRzLXZhbGlkYXRpb24nKS5nZXQoMCk7XHJcbiAgICBsZXQgaXNWYWxpZCA9IGZvcm0uY2hlY2tWYWxpZGl0eSgpO1xyXG4gICAgJChmb3JtKS5hZGRDbGFzcygnd2FzLXZhbGlkYXRlZCcpO1xyXG4gICAgaWYgKGlzVmFsaWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERpc2FibGUgYnV0dG9uIGFuZCBzaG93IHNwaW5uZXJcclxuICAgIGxldCBidXR0b24gPSAkKCcjc3RlcC0yIC5idG4uYnRuLXByaW1hcnknKTtcclxuICAgIGxldCBidXR0b25IdG1sID0gYnV0dG9uLmh0bWwoKTtcclxuICAgIGJ1dHRvbi5odG1sKCc8c3BhbiBjbGFzcz1cInNwaW5uZXItYm9yZGVyIHNwaW5uZXItYm9yZGVyLXNtXCI+PC9zcGFuPiBMb2FkaW5nLi4uJyk7XHJcbiAgICBidXR0b24uYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuXHJcbiAgICBsZXQgc2VydmVySWQgPSAkKCcjc3RlcC0yIGlucHV0W25hbWU9c2VydmVySWRdJykudmFsKCk7XHJcblxyXG4gICAgLy8gU2VuZCBBamF4XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogYC9hcGkvbWF0Y2hlcy8ke3NlcnZlcklkfWAsXHJcbiAgICAgICAgdHlwZTogJ1BVVCdcclxuICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgJCgnI2luLW1hdGNoLWNvdW50ZXInKS50ZXh0KHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgIHNvY2tldC5vbihzZXJ2ZXJJZCwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgJCgnI2luLW1hdGNoLWNvdW50ZXInKS50ZXh0KGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YSA8IDUpIHtcclxuICAgICAgICAgICAgICAgICQoJyNzdGVwLTMgLmFsZXJ0LmFsZXJ0LXdhcm5pbmcnKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjc3RlcC0zIC5hbGVydC5hbGVydC13YXJuaW5nJykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgb25TdGVwMkVuZCgpO1xyXG4gICAgfSkuZmFpbChmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAvLyBFcnJvclxyXG4gICAgICAgIGJ1dHRvbi5odG1sKGJ1dHRvbkh0bWwpO1xyXG4gICAgICAgIGJ1dHRvbi5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICBhbGVydC50ZXh0KHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlID8gcmVzcG9uc2UucmVzcG9uc2VKU09OLm1lc3NhZ2UgOiAnVWgtb2ghIEFuIGVycm9yIG9jY3VycmVkLicpO1xyXG4gICAgICAgIGFsZXJ0LnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblN0ZXAyRW5kKCkge1xyXG4gICAgJCgnI3N0ZXAtMicpLmZhZGVPdXQoMjUwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnI3N0ZXAtMycpLmZhZGVJbigzMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gRmFkaW5nIGFuaW1hdGlvbnMgY29tcGxldGVcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSwgMTAwMCAqIDYwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbiIsInZhciBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFID0gNjAwMDBcblxuLyoqXG4gKiBHb29nbGUgQ2hyb21lIGFzIG9mIDY3LjAuMzM5Ni44NyBpbnRyb2R1Y2VkIHRpbWV6b25lcyB3aXRoIG9mZnNldCB0aGF0IGluY2x1ZGVzIHNlY29uZHMuXG4gKiBUaGV5IHVzdWFsbHkgYXBwZWFyIGZvciBkYXRlcyB0aGF0IGRlbm90ZSB0aW1lIGJlZm9yZSB0aGUgdGltZXpvbmVzIHdlcmUgaW50cm9kdWNlZFxuICogKGUuZy4gZm9yICdFdXJvcGUvUHJhZ3VlJyB0aW1lem9uZSB0aGUgb2Zmc2V0IGlzIEdNVCswMDo1Nzo0NCBiZWZvcmUgMSBPY3RvYmVyIDE4OTFcbiAqIGFuZCBHTVQrMDE6MDA6MDAgYWZ0ZXIgdGhhdCBkYXRlKVxuICpcbiAqIERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyB0aGUgb2Zmc2V0IGluIG1pbnV0ZXMgYW5kIHdvdWxkIHJldHVybiA1NyBmb3IgdGhlIGV4YW1wbGUgYWJvdmUsXG4gKiB3aGljaCB3b3VsZCBsZWFkIHRvIGluY29ycmVjdCBjYWxjdWxhdGlvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0aW1lem9uZSBvZmZzZXQgaW4gbWlsbGlzZWNvbmRzIHRoYXQgdGFrZXMgc2Vjb25kcyBpbiBhY2NvdW50LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGRpcnR5RGF0ZS5nZXRUaW1lKCkpXG4gIHZhciBiYXNlVGltZXpvbmVPZmZzZXQgPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgZGF0ZS5zZXRTZWNvbmRzKDAsIDApXG4gIHZhciBtaWxsaXNlY29uZHNQYXJ0T2ZUaW1lem9uZU9mZnNldCA9IGRhdGUuZ2V0VGltZSgpICUgTUlMTElTRUNPTkRTX0lOX01JTlVURVxuXG4gIHJldHVybiBiYXNlVGltZXpvbmVPZmZzZXQgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFICsgbWlsbGlzZWNvbmRzUGFydE9mVGltZXpvbmVPZmZzZXRcbn1cbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkYXlzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRheXMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBkYXlzIHRvIGJlIGFkZGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIGRheXMgYWRkZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQWRkIDEwIGRheXMgdG8gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBhZGREYXlzKG5ldyBEYXRlKDIwMTQsIDgsIDEpLCAxMClcbiAqIC8vPT4gVGh1IFNlcCAxMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIGFkZERheXMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIGFtb3VudClcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGREYXlzXG4iLCJ2YXIgYWRkTWlsbGlzZWNvbmRzID0gcmVxdWlyZSgnLi4vYWRkX21pbGxpc2Vjb25kcy9pbmRleC5qcycpXG5cbnZhciBNSUxMSVNFQ09ORFNfSU5fSE9VUiA9IDM2MDAwMDBcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSG91ciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgaG91cnMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgaG91cnMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBob3VycyB0byBiZSBhZGRlZFxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBob3VycyBhZGRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBZGQgMiBob3VycyB0byAxMCBKdWx5IDIwMTQgMjM6MDA6MDA6XG4gKiB2YXIgcmVzdWx0ID0gYWRkSG91cnMobmV3IERhdGUoMjAxNCwgNiwgMTAsIDIzLCAwKSwgMilcbiAqIC8vPT4gRnJpIEp1bCAxMSAyMDE0IDAxOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIGFkZEhvdXJzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHJldHVybiBhZGRNaWxsaXNlY29uZHMoZGlydHlEYXRlLCBhbW91bnQgKiBNSUxMSVNFQ09ORFNfSU5fSE9VUilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGRIb3Vyc1xuIiwidmFyIGdldElTT1llYXIgPSByZXF1aXJlKCcuLi9nZXRfaXNvX3llYXIvaW5kZXguanMnKVxudmFyIHNldElTT1llYXIgPSByZXF1aXJlKCcuLi9zZXRfaXNvX3llYXIvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFycyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgdG8gYmUgYWRkZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIGFkZGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFkZCA1IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFycyB0byAyIEp1bHkgMjAxMDpcbiAqIHZhciByZXN1bHQgPSBhZGRJU09ZZWFycyhuZXcgRGF0ZSgyMDEwLCA2LCAyKSwgNSlcbiAqIC8vPT4gRnJpIEp1biAyNiAyMDE1IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIGFkZElTT1llYXJzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHJldHVybiBzZXRJU09ZZWFyKGRpcnR5RGF0ZSwgZ2V0SVNPWWVhcihkaXJ0eURhdGUpICsgYW1vdW50KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZElTT1llYXJzXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1pbGxpc2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRvIGJlIGFkZGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1pbGxpc2Vjb25kcyBhZGRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBZGQgNzUwIG1pbGxpc2Vjb25kcyB0byAxMCBKdWx5IDIwMTQgMTI6NDU6MzAuMDAwOlxuICogdmFyIHJlc3VsdCA9IGFkZE1pbGxpc2Vjb25kcyhuZXcgRGF0ZSgyMDE0LCA2LCAxMCwgMTIsIDQ1LCAzMCwgMCksIDc1MClcbiAqIC8vPT4gVGh1IEp1bCAxMCAyMDE0IDEyOjQ1OjMwLjc1MFxuICovXG5mdW5jdGlvbiBhZGRNaWxsaXNlY29uZHMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIHRpbWVzdGFtcCA9IHBhcnNlKGRpcnR5RGF0ZSkuZ2V0VGltZSgpXG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKyBhbW91bnQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkTWlsbGlzZWNvbmRzXG4iLCJ2YXIgYWRkTWlsbGlzZWNvbmRzID0gcmVxdWlyZSgnLi4vYWRkX21pbGxpc2Vjb25kcy9pbmRleC5qcycpXG5cbnZhciBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFID0gNjAwMDBcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTWludXRlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaW51dGVzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbnV0ZXMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBtaW51dGVzIHRvIGJlIGFkZGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1pbnV0ZXMgYWRkZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQWRkIDMwIG1pbnV0ZXMgdG8gMTAgSnVseSAyMDE0IDEyOjAwOjAwOlxuICogdmFyIHJlc3VsdCA9IGFkZE1pbnV0ZXMobmV3IERhdGUoMjAxNCwgNiwgMTAsIDEyLCAwKSwgMzApXG4gKiAvLz0+IFRodSBKdWwgMTAgMjAxNCAxMjozMDowMFxuICovXG5mdW5jdGlvbiBhZGRNaW51dGVzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHJldHVybiBhZGRNaWxsaXNlY29uZHMoZGlydHlEYXRlLCBhbW91bnQgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZE1pbnV0ZXNcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBnZXREYXlzSW5Nb250aCA9IHJlcXVpcmUoJy4uL2dldF9kYXlzX2luX21vbnRoL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1vbnRocyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtb250aHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBtb250aHMgdG8gYmUgYWRkZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbW9udGhzIGFkZGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFkZCA1IG1vbnRocyB0byAxIFNlcHRlbWJlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IGFkZE1vbnRocyhuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgNSlcbiAqIC8vPT4gU3VuIEZlYiAwMSAyMDE1IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIGFkZE1vbnRocyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgdmFyIGRlc2lyZWRNb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIGFtb3VudFxuICB2YXIgZGF0ZVdpdGhEZXNpcmVkTW9udGggPSBuZXcgRGF0ZSgwKVxuICBkYXRlV2l0aERlc2lyZWRNb250aC5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCksIGRlc2lyZWRNb250aCwgMSlcbiAgZGF0ZVdpdGhEZXNpcmVkTW9udGguc2V0SG91cnMoMCwgMCwgMCwgMClcbiAgdmFyIGRheXNJbk1vbnRoID0gZ2V0RGF5c0luTW9udGgoZGF0ZVdpdGhEZXNpcmVkTW9udGgpXG4gIC8vIFNldCB0aGUgbGFzdCBkYXkgb2YgdGhlIG5ldyBtb250aFxuICAvLyBpZiB0aGUgb3JpZ2luYWwgZGF0ZSB3YXMgdGhlIGxhc3QgZGF5IG9mIHRoZSBsb25nZXIgbW9udGhcbiAgZGF0ZS5zZXRNb250aChkZXNpcmVkTW9udGgsIE1hdGgubWluKGRheXNJbk1vbnRoLCBkYXRlLmdldERhdGUoKSkpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkTW9udGhzXG4iLCJ2YXIgYWRkTW9udGhzID0gcmVxdWlyZSgnLi4vYWRkX21vbnRocy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFF1YXJ0ZXIgSGVscGVyc1xuICogQHN1bW1hcnkgQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHllYXIgcXVhcnRlcnMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgeWVhciBxdWFydGVycyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIHF1YXJ0ZXJzIHRvIGJlIGFkZGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIHF1YXJ0ZXJzIGFkZGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFkZCAxIHF1YXJ0ZXIgdG8gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBhZGRRdWFydGVycyhuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgMSlcbiAqIC8vPT4gTW9uIERlYyAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIGFkZFF1YXJ0ZXJzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHZhciBtb250aHMgPSBhbW91bnQgKiAzXG4gIHJldHVybiBhZGRNb250aHMoZGlydHlEYXRlLCBtb250aHMpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkUXVhcnRlcnNcbiIsInZhciBhZGRNaWxsaXNlY29uZHMgPSByZXF1aXJlKCcuLi9hZGRfbWlsbGlzZWNvbmRzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgU2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBzZWNvbmRzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBzZWNvbmRzIHRvIGJlIGFkZGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIHNlY29uZHMgYWRkZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQWRkIDMwIHNlY29uZHMgdG8gMTAgSnVseSAyMDE0IDEyOjQ1OjAwOlxuICogdmFyIHJlc3VsdCA9IGFkZFNlY29uZHMobmV3IERhdGUoMjAxNCwgNiwgMTAsIDEyLCA0NSwgMCksIDMwKVxuICogLy89PiBUaHUgSnVsIDEwIDIwMTQgMTI6NDU6MzBcbiAqL1xuZnVuY3Rpb24gYWRkU2Vjb25kcyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KVxuICByZXR1cm4gYWRkTWlsbGlzZWNvbmRzKGRpcnR5RGF0ZSwgYW1vdW50ICogMTAwMClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGRTZWNvbmRzXG4iLCJ2YXIgYWRkRGF5cyA9IHJlcXVpcmUoJy4uL2FkZF9kYXlzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2Ygd2Vla3MgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2Ygd2VlayB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIHdlZWtzIHRvIGJlIGFkZGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIHdlZWtzIGFkZGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFkZCA0IHdlZWtzIHRvIDEgU2VwdGVtYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gYWRkV2Vla3MobmV3IERhdGUoMjAxNCwgOCwgMSksIDQpXG4gKiAvLz0+IE1vbiBTZXAgMjkgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBhZGRXZWVrcyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KVxuICB2YXIgZGF5cyA9IGFtb3VudCAqIDdcbiAgcmV0dXJuIGFkZERheXMoZGlydHlEYXRlLCBkYXlzKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZFdlZWtzXG4iLCJ2YXIgYWRkTW9udGhzID0gcmVxdWlyZSgnLi4vYWRkX21vbnRocy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHllYXJzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHllYXJzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgeWVhcnMgdG8gYmUgYWRkZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgeWVhcnMgYWRkZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQWRkIDUgeWVhcnMgdG8gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBhZGRZZWFycyhuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgNSlcbiAqIC8vPT4gU3VuIFNlcCAwMSAyMDE5IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIGFkZFllYXJzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHJldHVybiBhZGRNb250aHMoZGlydHlEYXRlLCBhbW91bnQgKiAxMilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGRZZWFyc1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBSYW5nZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSByYW5nZSBvdmVybGFwcGluZyB3aXRoIGFub3RoZXIgZGF0ZSByYW5nZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIHJhbmdlIG92ZXJsYXBwaW5nIHdpdGggYW5vdGhlciBkYXRlIHJhbmdlP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBpbml0aWFsUmFuZ2VTdGFydERhdGUgLSB0aGUgc3RhcnQgb2YgdGhlIGluaXRpYWwgcmFuZ2VcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBpbml0aWFsUmFuZ2VFbmREYXRlIC0gdGhlIGVuZCBvZiB0aGUgaW5pdGlhbCByYW5nZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGNvbXBhcmVkUmFuZ2VTdGFydERhdGUgLSB0aGUgc3RhcnQgb2YgdGhlIHJhbmdlIHRvIGNvbXBhcmUgaXQgd2l0aFxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGNvbXBhcmVkUmFuZ2VFbmREYXRlIC0gdGhlIGVuZCBvZiB0aGUgcmFuZ2UgdG8gY29tcGFyZSBpdCB3aXRoXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gd2hldGhlciB0aGUgZGF0ZSByYW5nZXMgYXJlIG92ZXJsYXBwaW5nXG4gKiBAdGhyb3dzIHtFcnJvcn0gc3RhcnREYXRlIG9mIGEgZGF0ZSByYW5nZSBjYW5ub3QgYmUgYWZ0ZXIgaXRzIGVuZERhdGVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIG92ZXJsYXBwaW5nIGRhdGUgcmFuZ2VzOlxuICogYXJlUmFuZ2VzT3ZlcmxhcHBpbmcoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDAsIDEwKSwgbmV3IERhdGUoMjAxNCwgMCwgMjApLCBuZXcgRGF0ZSgyMDE0LCAwLCAxNyksIG5ldyBEYXRlKDIwMTQsIDAsIDIxKVxuICogKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBub24tb3ZlcmxhcHBpbmcgZGF0ZSByYW5nZXM6XG4gKiBhcmVSYW5nZXNPdmVybGFwcGluZyhcbiAqICAgbmV3IERhdGUoMjAxNCwgMCwgMTApLCBuZXcgRGF0ZSgyMDE0LCAwLCAyMCksIG5ldyBEYXRlKDIwMTQsIDAsIDIxKSwgbmV3IERhdGUoMjAxNCwgMCwgMjIpXG4gKiApXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGFyZVJhbmdlc092ZXJsYXBwaW5nIChkaXJ0eUluaXRpYWxSYW5nZVN0YXJ0RGF0ZSwgZGlydHlJbml0aWFsUmFuZ2VFbmREYXRlLCBkaXJ0eUNvbXBhcmVkUmFuZ2VTdGFydERhdGUsIGRpcnR5Q29tcGFyZWRSYW5nZUVuZERhdGUpIHtcbiAgdmFyIGluaXRpYWxTdGFydFRpbWUgPSBwYXJzZShkaXJ0eUluaXRpYWxSYW5nZVN0YXJ0RGF0ZSkuZ2V0VGltZSgpXG4gIHZhciBpbml0aWFsRW5kVGltZSA9IHBhcnNlKGRpcnR5SW5pdGlhbFJhbmdlRW5kRGF0ZSkuZ2V0VGltZSgpXG4gIHZhciBjb21wYXJlZFN0YXJ0VGltZSA9IHBhcnNlKGRpcnR5Q29tcGFyZWRSYW5nZVN0YXJ0RGF0ZSkuZ2V0VGltZSgpXG4gIHZhciBjb21wYXJlZEVuZFRpbWUgPSBwYXJzZShkaXJ0eUNvbXBhcmVkUmFuZ2VFbmREYXRlKS5nZXRUaW1lKClcblxuICBpZiAoaW5pdGlhbFN0YXJ0VGltZSA+IGluaXRpYWxFbmRUaW1lIHx8IGNvbXBhcmVkU3RhcnRUaW1lID4gY29tcGFyZWRFbmRUaW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgc3RhcnQgb2YgdGhlIHJhbmdlIGNhbm5vdCBiZSBhZnRlciB0aGUgZW5kIG9mIHRoZSByYW5nZScpXG4gIH1cblxuICByZXR1cm4gaW5pdGlhbFN0YXJ0VGltZSA8IGNvbXBhcmVkRW5kVGltZSAmJiBjb21wYXJlZFN0YXJ0VGltZSA8IGluaXRpYWxFbmRUaW1lXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJlUmFuZ2VzT3ZlcmxhcHBpbmdcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiBhbiBpbmRleCBvZiB0aGUgY2xvc2VzdCBkYXRlIGZyb20gdGhlIGFycmF5IGNvbXBhcmluZyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiBhbiBpbmRleCBvZiB0aGUgY2xvc2VzdCBkYXRlIGZyb20gdGhlIGFycmF5IGNvbXBhcmluZyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVRvQ29tcGFyZSAtIHRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHBhcmFtIHtEYXRlW118U3RyaW5nW118TnVtYmVyW119IGRhdGVzQXJyYXkgLSB0aGUgYXJyYXkgdG8gc2VhcmNoXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBhbiBpbmRleCBvZiB0aGUgZGF0ZSBjbG9zZXN0IHRvIHRoZSBnaXZlbiBkYXRlXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IHRoZSBzZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBBcnJheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCBkYXRlIGlzIGNsb3NlciB0byA2IFNlcHRlbWJlciAyMDE1P1xuICogdmFyIGRhdGVUb0NvbXBhcmUgPSBuZXcgRGF0ZSgyMDE1LCA4LCA2KVxuICogdmFyIGRhdGVzQXJyYXkgPSBbXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEpLFxuICogICBuZXcgRGF0ZSgyMDE2LCAwLCAxKSxcbiAqICAgbmV3IERhdGUoMjAxNywgMCwgMSlcbiAqIF1cbiAqIHZhciByZXN1bHQgPSBjbG9zZXN0SW5kZXhUbyhkYXRlVG9Db21wYXJlLCBkYXRlc0FycmF5KVxuICogLy89PiAxXG4gKi9cbmZ1bmN0aW9uIGNsb3Nlc3RJbmRleFRvIChkaXJ0eURhdGVUb0NvbXBhcmUsIGRpcnR5RGF0ZXNBcnJheSkge1xuICBpZiAoIShkaXJ0eURhdGVzQXJyYXkgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHRvU3RyaW5nLmNhbGwoZGlydHlEYXRlc0FycmF5KSArICcgaXMgbm90IGFuIGluc3RhbmNlIG9mIEFycmF5JylcbiAgfVxuXG4gIHZhciBkYXRlVG9Db21wYXJlID0gcGFyc2UoZGlydHlEYXRlVG9Db21wYXJlKVxuICB2YXIgdGltZVRvQ29tcGFyZSA9IGRhdGVUb0NvbXBhcmUuZ2V0VGltZSgpXG5cbiAgdmFyIHJlc3VsdFxuICB2YXIgbWluRGlzdGFuY2VcblxuICBkaXJ0eURhdGVzQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoZGlydHlEYXRlLCBpbmRleCkge1xuICAgIHZhciBjdXJyZW50RGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLmFicyh0aW1lVG9Db21wYXJlIC0gY3VycmVudERhdGUuZ2V0VGltZSgpKVxuICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCB8fCBkaXN0YW5jZSA8IG1pbkRpc3RhbmNlKSB7XG4gICAgICByZXN1bHQgPSBpbmRleFxuICAgICAgbWluRGlzdGFuY2UgPSBkaXN0YW5jZVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gcmVzdWx0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvc2VzdEluZGV4VG9cbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiBhIGRhdGUgZnJvbSB0aGUgYXJyYXkgY2xvc2VzdCB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiBhIGRhdGUgZnJvbSB0aGUgYXJyYXkgY2xvc2VzdCB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVRvQ29tcGFyZSAtIHRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHBhcmFtIHtEYXRlW118U3RyaW5nW118TnVtYmVyW119IGRhdGVzQXJyYXkgLSB0aGUgYXJyYXkgdG8gc2VhcmNoXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGRhdGUgZnJvbSB0aGUgYXJyYXkgY2xvc2VzdCB0byB0aGUgZ2l2ZW4gZGF0ZVxuICogQHRocm93cyB7VHlwZUVycm9yfSB0aGUgc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgQXJyYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggZGF0ZSBpcyBjbG9zZXIgdG8gNiBTZXB0ZW1iZXIgMjAxNTogMSBKYW51YXJ5IDIwMDAgb3IgMSBKYW51YXJ5IDIwMzA/XG4gKiB2YXIgZGF0ZVRvQ29tcGFyZSA9IG5ldyBEYXRlKDIwMTUsIDgsIDYpXG4gKiB2YXIgcmVzdWx0ID0gY2xvc2VzdFRvKGRhdGVUb0NvbXBhcmUsIFtcbiAqICAgbmV3IERhdGUoMjAwMCwgMCwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMzAsIDAsIDEpXG4gKiBdKVxuICogLy89PiBUdWUgSmFuIDAxIDIwMzAgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gY2xvc2VzdFRvIChkaXJ0eURhdGVUb0NvbXBhcmUsIGRpcnR5RGF0ZXNBcnJheSkge1xuICBpZiAoIShkaXJ0eURhdGVzQXJyYXkgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHRvU3RyaW5nLmNhbGwoZGlydHlEYXRlc0FycmF5KSArICcgaXMgbm90IGFuIGluc3RhbmNlIG9mIEFycmF5JylcbiAgfVxuXG4gIHZhciBkYXRlVG9Db21wYXJlID0gcGFyc2UoZGlydHlEYXRlVG9Db21wYXJlKVxuICB2YXIgdGltZVRvQ29tcGFyZSA9IGRhdGVUb0NvbXBhcmUuZ2V0VGltZSgpXG5cbiAgdmFyIHJlc3VsdFxuICB2YXIgbWluRGlzdGFuY2VcblxuICBkaXJ0eURhdGVzQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoZGlydHlEYXRlKSB7XG4gICAgdmFyIGN1cnJlbnREYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICAgIHZhciBkaXN0YW5jZSA9IE1hdGguYWJzKHRpbWVUb0NvbXBhcmUgLSBjdXJyZW50RGF0ZS5nZXRUaW1lKCkpXG4gICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkIHx8IGRpc3RhbmNlIDwgbWluRGlzdGFuY2UpIHtcbiAgICAgIHJlc3VsdCA9IGN1cnJlbnREYXRlXG4gICAgICBtaW5EaXN0YW5jZSA9IGRpc3RhbmNlXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9zZXN0VG9cbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIC0xLCAwIG9yIDEuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb21wYXJlIHRoZSB0d28gZGF0ZXMgYW5kIHJldHVybiAxIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGFmdGVyIHRoZSBzZWNvbmQsXG4gKiAtMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBvciAwIGlmIGRhdGVzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSByZXN1bHQgb2YgdGhlIGNvbXBhcmlzb25cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29tcGFyZSAxMSBGZWJydWFyeSAxOTg3IGFuZCAxMCBKdWx5IDE5ODk6XG4gKiB2YXIgcmVzdWx0ID0gY29tcGFyZUFzYyhcbiAqICAgbmV3IERhdGUoMTk4NywgMSwgMTEpLFxuICogICBuZXcgRGF0ZSgxOTg5LCA2LCAxMClcbiAqIClcbiAqIC8vPT4gLTFcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU29ydCB0aGUgYXJyYXkgb2YgZGF0ZXM6XG4gKiB2YXIgcmVzdWx0ID0gW1xuICogICBuZXcgRGF0ZSgxOTk1LCA2LCAyKSxcbiAqICAgbmV3IERhdGUoMTk4NywgMSwgMTEpLFxuICogICBuZXcgRGF0ZSgxOTg5LCA2LCAxMClcbiAqIF0uc29ydChjb21wYXJlQXNjKVxuICogLy89PiBbXG4gKiAvLyAgIFdlZCBGZWIgMTEgMTk4NyAwMDowMDowMCxcbiAqIC8vICAgTW9uIEp1bCAxMCAxOTg5IDAwOjAwOjAwLFxuICogLy8gICBTdW4gSnVsIDAyIDE5OTUgMDA6MDA6MDBcbiAqIC8vIF1cbiAqL1xuZnVuY3Rpb24gY29tcGFyZUFzYyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlEYXRlTGVmdClcbiAgdmFyIHRpbWVMZWZ0ID0gZGF0ZUxlZnQuZ2V0VGltZSgpXG4gIHZhciBkYXRlUmlnaHQgPSBwYXJzZShkaXJ0eURhdGVSaWdodClcbiAgdmFyIHRpbWVSaWdodCA9IGRhdGVSaWdodC5nZXRUaW1lKClcblxuICBpZiAodGltZUxlZnQgPCB0aW1lUmlnaHQpIHtcbiAgICByZXR1cm4gLTFcbiAgfSBlbHNlIGlmICh0aW1lTGVmdCA+IHRpbWVSaWdodCkge1xuICAgIHJldHVybiAxXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBhcmVBc2NcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbXBhcmUgdGhlIHR3byBkYXRlcyByZXZlcnNlIGNocm9ub2xvZ2ljYWxseSBhbmQgcmV0dXJuIC0xLCAwIG9yIDEuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb21wYXJlIHRoZSB0d28gZGF0ZXMgYW5kIHJldHVybiAtMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBhZnRlciB0aGUgc2Vjb25kLFxuICogMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBvciAwIGlmIGRhdGVzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSByZXN1bHQgb2YgdGhlIGNvbXBhcmlzb25cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29tcGFyZSAxMSBGZWJydWFyeSAxOTg3IGFuZCAxMCBKdWx5IDE5ODkgcmV2ZXJzZSBjaHJvbm9sb2dpY2FsbHk6XG4gKiB2YXIgcmVzdWx0ID0gY29tcGFyZURlc2MoXG4gKiAgIG5ldyBEYXRlKDE5ODcsIDEsIDExKSxcbiAqICAgbmV3IERhdGUoMTk4OSwgNiwgMTApXG4gKiApXG4gKiAvLz0+IDFcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU29ydCB0aGUgYXJyYXkgb2YgZGF0ZXMgaW4gcmV2ZXJzZSBjaHJvbm9sb2dpY2FsIG9yZGVyOlxuICogdmFyIHJlc3VsdCA9IFtcbiAqICAgbmV3IERhdGUoMTk5NSwgNiwgMiksXG4gKiAgIG5ldyBEYXRlKDE5ODcsIDEsIDExKSxcbiAqICAgbmV3IERhdGUoMTk4OSwgNiwgMTApXG4gKiBdLnNvcnQoY29tcGFyZURlc2MpXG4gKiAvLz0+IFtcbiAqIC8vICAgU3VuIEp1bCAwMiAxOTk1IDAwOjAwOjAwLFxuICogLy8gICBNb24gSnVsIDEwIDE5ODkgMDA6MDA6MDAsXG4gKiAvLyAgIFdlZCBGZWIgMTEgMTk4NyAwMDowMDowMFxuICogLy8gXVxuICovXG5mdW5jdGlvbiBjb21wYXJlRGVzYyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlEYXRlTGVmdClcbiAgdmFyIHRpbWVMZWZ0ID0gZGF0ZUxlZnQuZ2V0VGltZSgpXG4gIHZhciBkYXRlUmlnaHQgPSBwYXJzZShkaXJ0eURhdGVSaWdodClcbiAgdmFyIHRpbWVSaWdodCA9IGRhdGVSaWdodC5nZXRUaW1lKClcblxuICBpZiAodGltZUxlZnQgPiB0aW1lUmlnaHQpIHtcbiAgICByZXR1cm4gLTFcbiAgfSBlbHNlIGlmICh0aW1lTGVmdCA8IHRpbWVSaWdodCkge1xuICAgIHJldHVybiAxXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBhcmVEZXNjXG4iLCJ2YXIgc3RhcnRPZkRheSA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX2RheS9pbmRleC5qcycpXG5cbnZhciBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFID0gNjAwMDBcbnZhciBNSUxMSVNFQ09ORFNfSU5fREFZID0gODY0MDAwMDBcblxuLyoqXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBkYXlzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBjYWxlbmRhciBkYXlzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGNhbGVuZGFyIGRheXMgYXJlIGJldHdlZW5cbiAqIC8vIDIgSnVseSAyMDExIDIzOjAwOjAwIGFuZCAyIEp1bHkgMjAxMiAwMDowMDowMD9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoXG4gKiAgIG5ldyBEYXRlKDIwMTIsIDYsIDIsIDAsIDApLFxuICogICBuZXcgRGF0ZSgyMDExLCA2LCAyLCAyMywgMClcbiAqIClcbiAqIC8vPT4gMzY2XG4gKi9cbmZ1bmN0aW9uIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIHN0YXJ0T2ZEYXlMZWZ0ID0gc3RhcnRPZkRheShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgc3RhcnRPZkRheVJpZ2h0ID0gc3RhcnRPZkRheShkaXJ0eURhdGVSaWdodClcblxuICB2YXIgdGltZXN0YW1wTGVmdCA9IHN0YXJ0T2ZEYXlMZWZ0LmdldFRpbWUoKSAtXG4gICAgc3RhcnRPZkRheUxlZnQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIE1JTExJU0VDT05EU19JTl9NSU5VVEVcbiAgdmFyIHRpbWVzdGFtcFJpZ2h0ID0gc3RhcnRPZkRheVJpZ2h0LmdldFRpbWUoKSAtXG4gICAgc3RhcnRPZkRheVJpZ2h0LmdldFRpbWV6b25lT2Zmc2V0KCkgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFXG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIGRheSBpcyBub3QgY29uc3RhbnRcbiAgLy8gKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIGRheSBvZiB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpXG4gIHJldHVybiBNYXRoLnJvdW5kKCh0aW1lc3RhbXBMZWZ0IC0gdGltZXN0YW1wUmlnaHQpIC8gTUlMTElTRUNPTkRTX0lOX0RBWSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXNcbiIsInZhciBzdGFydE9mSVNPV2VlayA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX2lzb193ZWVrL2luZGV4LmpzJylcblxudmFyIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSA2MDAwMFxudmFyIE1JTExJU0VDT05EU19JTl9XRUVLID0gNjA0ODAwMDAwXG5cbi8qKlxuICogQGNhdGVnb3J5IElTTyBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIElTTyB3ZWVrcyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIElTTyB3ZWVrcyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIElTTyB3ZWVrc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBjYWxlbmRhciBJU08gd2Vla3MgYXJlIGJldHdlZW4gNiBKdWx5IDIwMTQgYW5kIDIxIEp1bHkgMjAxND9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhcklTT1dlZWtzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyMSksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDYpXG4gKiApXG4gKiAvLz0+IDNcbiAqL1xuZnVuY3Rpb24gZGlmZmVyZW5jZUluQ2FsZW5kYXJJU09XZWVrcyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIHN0YXJ0T2ZJU09XZWVrTGVmdCA9IHN0YXJ0T2ZJU09XZWVrKGRpcnR5RGF0ZUxlZnQpXG4gIHZhciBzdGFydE9mSVNPV2Vla1JpZ2h0ID0gc3RhcnRPZklTT1dlZWsoZGlydHlEYXRlUmlnaHQpXG5cbiAgdmFyIHRpbWVzdGFtcExlZnQgPSBzdGFydE9mSVNPV2Vla0xlZnQuZ2V0VGltZSgpIC1cbiAgICBzdGFydE9mSVNPV2Vla0xlZnQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIE1JTExJU0VDT05EU19JTl9NSU5VVEVcbiAgdmFyIHRpbWVzdGFtcFJpZ2h0ID0gc3RhcnRPZklTT1dlZWtSaWdodC5nZXRUaW1lKCkgLVxuICAgIHN0YXJ0T2ZJU09XZWVrUmlnaHQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIE1JTExJU0VDT05EU19JTl9NSU5VVEVcblxuICAvLyBSb3VuZCB0aGUgbnVtYmVyIG9mIGRheXMgdG8gdGhlIG5lYXJlc3QgaW50ZWdlclxuICAvLyBiZWNhdXNlIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGluIGEgd2VlayBpcyBub3QgY29uc3RhbnRcbiAgLy8gKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIHdlZWsgb2YgdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KVxuICByZXR1cm4gTWF0aC5yb3VuZCgodGltZXN0YW1wTGVmdCAtIHRpbWVzdGFtcFJpZ2h0KSAvIE1JTExJU0VDT05EU19JTl9XRUVLKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZlcmVuY2VJbkNhbGVuZGFySVNPV2Vla3NcbiIsInZhciBnZXRJU09ZZWFyID0gcmVxdWlyZSgnLi4vZ2V0X2lzb195ZWFyL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWstTnVtYmVyaW5nIFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGNhbGVuZGFyIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFycyBhcmUgMSBKYW51YXJ5IDIwMTAgYW5kIDEgSmFudWFyeSAyMDEyP1xuICogdmFyIHJlc3VsdCA9IGRpZmZlcmVuY2VJbkNhbGVuZGFySVNPWWVhcnMoXG4gKiAgIG5ldyBEYXRlKDIwMTIsIDAsIDEpLFxuICogICBuZXcgRGF0ZSgyMDEwLCAwLCAxKVxuICogKVxuICogLy89PiAyXG4gKi9cbmZ1bmN0aW9uIGRpZmZlcmVuY2VJbkNhbGVuZGFySVNPWWVhcnMgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHJldHVybiBnZXRJU09ZZWFyKGRpcnR5RGF0ZUxlZnQpIC0gZ2V0SVNPWWVhcihkaXJ0eURhdGVSaWdodClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5DYWxlbmRhcklTT1llYXJzXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIG1vbnRocyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIG1vbnRocyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgbW9udGhzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGNhbGVuZGFyIG1vbnRocyBhcmUgYmV0d2VlbiAzMSBKYW51YXJ5IDIwMTQgYW5kIDEgU2VwdGVtYmVyIDIwMTQ/XG4gKiB2YXIgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDEpLFxuICogICBuZXcgRGF0ZSgyMDE0LCAwLCAzMSlcbiAqIClcbiAqIC8vPT4gOFxuICovXG5mdW5jdGlvbiBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlEYXRlTGVmdClcbiAgdmFyIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5RGF0ZVJpZ2h0KVxuXG4gIHZhciB5ZWFyRGlmZiA9IGRhdGVMZWZ0LmdldEZ1bGxZZWFyKCkgLSBkYXRlUmlnaHQuZ2V0RnVsbFllYXIoKVxuICB2YXIgbW9udGhEaWZmID0gZGF0ZUxlZnQuZ2V0TW9udGgoKSAtIGRhdGVSaWdodC5nZXRNb250aCgpXG5cbiAgcmV0dXJuIHllYXJEaWZmICogMTIgKyBtb250aERpZmZcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRoc1xuIiwidmFyIGdldFF1YXJ0ZXIgPSByZXF1aXJlKCcuLi9nZXRfcXVhcnRlci9pbmRleC5qcycpXG52YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFF1YXJ0ZXIgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgcXVhcnRlcnMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBxdWFydGVycyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgcXVhcnRlcnNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgcXVhcnRlcnMgYXJlIGJldHdlZW4gMzEgRGVjZW1iZXIgMjAxMyBhbmQgMiBKdWx5IDIwMTQ/XG4gKiB2YXIgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyhcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgMiksXG4gKiAgIG5ldyBEYXRlKDIwMTMsIDExLCAzMSlcbiAqIClcbiAqIC8vPT4gM1xuICovXG5mdW5jdGlvbiBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgZGF0ZVJpZ2h0ID0gcGFyc2UoZGlydHlEYXRlUmlnaHQpXG5cbiAgdmFyIHllYXJEaWZmID0gZGF0ZUxlZnQuZ2V0RnVsbFllYXIoKSAtIGRhdGVSaWdodC5nZXRGdWxsWWVhcigpXG4gIHZhciBxdWFydGVyRGlmZiA9IGdldFF1YXJ0ZXIoZGF0ZUxlZnQpIC0gZ2V0UXVhcnRlcihkYXRlUmlnaHQpXG5cbiAgcmV0dXJuIHllYXJEaWZmICogNCArIHF1YXJ0ZXJEaWZmXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVyc1xuIiwidmFyIHN0YXJ0T2ZXZWVrID0gcmVxdWlyZSgnLi4vc3RhcnRfb2Zfd2Vlay9pbmRleC5qcycpXG5cbnZhciBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFID0gNjAwMDBcbnZhciBNSUxMSVNFQ09ORFNfSU5fV0VFSyA9IDYwNDgwMDAwMFxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIHdlZWtzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgd2Vla3MgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53ZWVrU3RhcnRzT249MF0gLSB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayAoMCAtIFN1bmRheSlcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgd2Vla3NcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgd2Vla3MgYXJlIGJldHdlZW4gNSBKdWx5IDIwMTQgYW5kIDIwIEp1bHkgMjAxND9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhcldlZWtzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyMCksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDUpXG4gKiApXG4gKiAvLz0+IDNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdGhlIHdlZWsgc3RhcnRzIG9uIE1vbmRheSxcbiAqIC8vIGhvdyBtYW55IGNhbGVuZGFyIHdlZWtzIGFyZSBiZXR3ZWVuIDUgSnVseSAyMDE0IGFuZCAyMCBKdWx5IDIwMTQ/XG4gKiB2YXIgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJXZWVrcyhcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgMjApLFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCA1KSxcbiAqICAge3dlZWtTdGFydHNPbjogMX1cbiAqIClcbiAqIC8vPT4gMlxuICovXG5mdW5jdGlvbiBkaWZmZXJlbmNlSW5DYWxlbmRhcldlZWtzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCwgZGlydHlPcHRpb25zKSB7XG4gIHZhciBzdGFydE9mV2Vla0xlZnQgPSBzdGFydE9mV2VlayhkaXJ0eURhdGVMZWZ0LCBkaXJ0eU9wdGlvbnMpXG4gIHZhciBzdGFydE9mV2Vla1JpZ2h0ID0gc3RhcnRPZldlZWsoZGlydHlEYXRlUmlnaHQsIGRpcnR5T3B0aW9ucylcblxuICB2YXIgdGltZXN0YW1wTGVmdCA9IHN0YXJ0T2ZXZWVrTGVmdC5nZXRUaW1lKCkgLVxuICAgIHN0YXJ0T2ZXZWVrTGVmdC5nZXRUaW1lem9uZU9mZnNldCgpICogTUlMTElTRUNPTkRTX0lOX01JTlVURVxuICB2YXIgdGltZXN0YW1wUmlnaHQgPSBzdGFydE9mV2Vla1JpZ2h0LmdldFRpbWUoKSAtXG4gICAgc3RhcnRPZldlZWtSaWdodC5nZXRUaW1lem9uZU9mZnNldCgpICogTUlMTElTRUNPTkRTX0lOX01JTlVURVxuXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2YgZGF5cyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyXG4gIC8vIGJlY2F1c2UgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSB3ZWVrIGlzIG5vdCBjb25zdGFudFxuICAvLyAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgd2VlayBvZiB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpXG4gIHJldHVybiBNYXRoLnJvdW5kKCh0aW1lc3RhbXBMZWZ0IC0gdGltZXN0YW1wUmlnaHQpIC8gTUlMTElTRUNPTkRTX0lOX1dFRUspXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJXZWVrc1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIHllYXJzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgeWVhcnMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIHllYXJzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGNhbGVuZGFyIHllYXJzIGFyZSBiZXR3ZWVuIDMxIERlY2VtYmVyIDIwMTMgYW5kIDExIEZlYnJ1YXJ5IDIwMTU/XG4gKiB2YXIgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhcbiAqICAgbmV3IERhdGUoMjAxNSwgMSwgMTEpLFxuICogICBuZXcgRGF0ZSgyMDEzLCAxMSwgMzEpXG4gKiApXG4gKiAvLz0+IDJcbiAqL1xuZnVuY3Rpb24gZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlEYXRlTGVmdClcbiAgdmFyIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5RGF0ZVJpZ2h0KVxuXG4gIHJldHVybiBkYXRlTGVmdC5nZXRGdWxsWWVhcigpIC0gZGF0ZVJpZ2h0LmdldEZ1bGxZZWFyKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG52YXIgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzID0gcmVxdWlyZSgnLi4vZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl9kYXlzL2luZGV4LmpzJylcbnZhciBjb21wYXJlQXNjID0gcmVxdWlyZSgnLi4vY29tcGFyZV9hc2MvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgZnVsbCBkYXlzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgZnVsbCBkYXlzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBmdWxsIGRheXNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgZnVsbCBkYXlzIGFyZSBiZXR3ZWVuXG4gKiAvLyAyIEp1bHkgMjAxMSAyMzowMDowMCBhbmQgMiBKdWx5IDIwMTIgMDA6MDA6MDA/XG4gKiB2YXIgcmVzdWx0ID0gZGlmZmVyZW5jZUluRGF5cyhcbiAqICAgbmV3IERhdGUoMjAxMiwgNiwgMiwgMCwgMCksXG4gKiAgIG5ldyBEYXRlKDIwMTEsIDYsIDIsIDIzLCAwKVxuICogKVxuICogLy89PiAzNjVcbiAqL1xuZnVuY3Rpb24gZGlmZmVyZW5jZUluRGF5cyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlEYXRlTGVmdClcbiAgdmFyIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5RGF0ZVJpZ2h0KVxuXG4gIHZhciBzaWduID0gY29tcGFyZUFzYyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KVxuICB2YXIgZGlmZmVyZW5jZSA9IE1hdGguYWJzKGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSlcbiAgZGF0ZUxlZnQuc2V0RGF0ZShkYXRlTGVmdC5nZXREYXRlKCkgLSBzaWduICogZGlmZmVyZW5jZSlcblxuICAvLyBNYXRoLmFicyhkaWZmIGluIGZ1bGwgZGF5cyAtIGRpZmYgaW4gY2FsZW5kYXIgZGF5cykgPT09IDEgaWYgbGFzdCBjYWxlbmRhciBkYXkgaXMgbm90IGZ1bGxcbiAgLy8gSWYgc28sIHJlc3VsdCBtdXN0IGJlIGRlY3JlYXNlZCBieSAxIGluIGFic29sdXRlIHZhbHVlXG4gIHZhciBpc0xhc3REYXlOb3RGdWxsID0gY29tcGFyZUFzYyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSA9PT0gLXNpZ25cbiAgcmV0dXJuIHNpZ24gKiAoZGlmZmVyZW5jZSAtIGlzTGFzdERheU5vdEZ1bGwpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZUluRGF5c1xuIiwidmFyIGRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyA9IHJlcXVpcmUoJy4uL2RpZmZlcmVuY2VfaW5fbWlsbGlzZWNvbmRzL2luZGV4LmpzJylcblxudmFyIE1JTExJU0VDT05EU19JTl9IT1VSID0gMzYwMDAwMFxuXG4vKipcbiAqIEBjYXRlZ29yeSBIb3VyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGhvdXJzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgaG91cnMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIGhvdXJzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGhvdXJzIGFyZSBiZXR3ZWVuIDIgSnVseSAyMDE0IDA2OjUwOjAwIGFuZCAyIEp1bHkgMjAxNCAxOTowMDowMD9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5Ib3VycyhcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgMiwgMTksIDApLFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCA2LCA1MClcbiAqIClcbiAqIC8vPT4gMTJcbiAqL1xuZnVuY3Rpb24gZGlmZmVyZW5jZUluSG91cnMgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkaWZmID0gZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSAvIE1JTExJU0VDT05EU19JTl9IT1VSXG4gIHJldHVybiBkaWZmID4gMCA/IE1hdGguZmxvb3IoZGlmZikgOiBNYXRoLmNlaWwoZGlmZilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5Ib3Vyc1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxudmFyIGRpZmZlcmVuY2VJbkNhbGVuZGFySVNPWWVhcnMgPSByZXF1aXJlKCcuLi9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX2lzb195ZWFycy9pbmRleC5qcycpXG52YXIgY29tcGFyZUFzYyA9IHJlcXVpcmUoJy4uL2NvbXBhcmVfYXNjL2luZGV4LmpzJylcbnZhciBzdWJJU09ZZWFycyA9IHJlcXVpcmUoJy4uL3N1Yl9pc29feWVhcnMvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBmdWxsIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFycyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGZ1bGwgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgZnVsbCBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgZnVsbCBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgYXJlIGJldHdlZW4gMSBKYW51YXJ5IDIwMTAgYW5kIDEgSmFudWFyeSAyMDEyP1xuICogdmFyIHJlc3VsdCA9IGRpZmZlcmVuY2VJbklTT1llYXJzKFxuICogICBuZXcgRGF0ZSgyMDEyLCAwLCAxKSxcbiAqICAgbmV3IERhdGUoMjAxMCwgMCwgMSlcbiAqIClcbiAqIC8vPT4gMVxuICovXG5mdW5jdGlvbiBkaWZmZXJlbmNlSW5JU09ZZWFycyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlEYXRlTGVmdClcbiAgdmFyIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5RGF0ZVJpZ2h0KVxuXG4gIHZhciBzaWduID0gY29tcGFyZUFzYyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KVxuICB2YXIgZGlmZmVyZW5jZSA9IE1hdGguYWJzKGRpZmZlcmVuY2VJbkNhbGVuZGFySVNPWWVhcnMoZGF0ZUxlZnQsIGRhdGVSaWdodCkpXG4gIGRhdGVMZWZ0ID0gc3ViSVNPWWVhcnMoZGF0ZUxlZnQsIHNpZ24gKiBkaWZmZXJlbmNlKVxuXG4gIC8vIE1hdGguYWJzKGRpZmYgaW4gZnVsbCBJU08geWVhcnMgLSBkaWZmIGluIGNhbGVuZGFyIElTTyB5ZWFycykgPT09IDFcbiAgLy8gaWYgbGFzdCBjYWxlbmRhciBJU08geWVhciBpcyBub3QgZnVsbFxuICAvLyBJZiBzbywgcmVzdWx0IG11c3QgYmUgZGVjcmVhc2VkIGJ5IDEgaW4gYWJzb2x1dGUgdmFsdWVcbiAgdmFyIGlzTGFzdElTT1llYXJOb3RGdWxsID0gY29tcGFyZUFzYyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSA9PT0gLXNpZ25cbiAgcmV0dXJuIHNpZ24gKiAoZGlmZmVyZW5jZSAtIGlzTGFzdElTT1llYXJOb3RGdWxsKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZlcmVuY2VJbklTT1llYXJzXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1pbGxpc2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IG1pbGxpc2Vjb25kcyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTQgMTI6MzA6MjAuNjAwIGFuZCAyIEp1bHkgMjAxNCAxMjozMDoyMS43MDA/XG4gKiB2YXIgcmVzdWx0ID0gZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCAxMiwgMzAsIDIxLCA3MDApLFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCAxMiwgMzAsIDIwLCA2MDApXG4gKiApXG4gKiAvLz0+IDExMDBcbiAqL1xuZnVuY3Rpb24gZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgZGF0ZVJpZ2h0ID0gcGFyc2UoZGlydHlEYXRlUmlnaHQpXG4gIHJldHVybiBkYXRlTGVmdC5nZXRUaW1lKCkgLSBkYXRlUmlnaHQuZ2V0VGltZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzXG4iLCJ2YXIgZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzID0gcmVxdWlyZSgnLi4vZGlmZmVyZW5jZV9pbl9taWxsaXNlY29uZHMvaW5kZXguanMnKVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX01JTlVURSA9IDYwMDAwXG5cbi8qKlxuICogQGNhdGVnb3J5IE1pbnV0ZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBtaW51dGVzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgbWludXRlcyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgbWludXRlc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBtaW51dGVzIGFyZSBiZXR3ZWVuIDIgSnVseSAyMDE0IDEyOjA3OjU5IGFuZCAyIEp1bHkgMjAxNCAxMjoyMDowMD9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5NaW51dGVzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCAxMiwgMjAsIDApLFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCAxMiwgNywgNTkpXG4gKiApXG4gKiAvLz0+IDEyXG4gKi9cbmZ1bmN0aW9uIGRpZmZlcmVuY2VJbk1pbnV0ZXMgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkaWZmID0gZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSAvIE1JTExJU0VDT05EU19JTl9NSU5VVEVcbiAgcmV0dXJuIGRpZmYgPiAwID8gTWF0aC5mbG9vcihkaWZmKSA6IE1hdGguY2VpbChkaWZmKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZlcmVuY2VJbk1pbnV0ZXNcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyA9IHJlcXVpcmUoJy4uL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfbW9udGhzL2luZGV4LmpzJylcbnZhciBjb21wYXJlQXNjID0gcmVxdWlyZSgnLi4vY29tcGFyZV9hc2MvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBmdWxsIG1vbnRocyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGZ1bGwgbW9udGhzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBmdWxsIG1vbnRoc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBmdWxsIG1vbnRocyBhcmUgYmV0d2VlbiAzMSBKYW51YXJ5IDIwMTQgYW5kIDEgU2VwdGVtYmVyIDIwMTQ/XG4gKiB2YXIgcmVzdWx0ID0gZGlmZmVyZW5jZUluTW9udGhzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA4LCAxKSxcbiAqICAgbmV3IERhdGUoMjAxNCwgMCwgMzEpXG4gKiApXG4gKiAvLz0+IDdcbiAqL1xuZnVuY3Rpb24gZGlmZmVyZW5jZUluTW9udGhzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgZGF0ZVJpZ2h0ID0gcGFyc2UoZGlydHlEYXRlUmlnaHQpXG5cbiAgdmFyIHNpZ24gPSBjb21wYXJlQXNjKGRhdGVMZWZ0LCBkYXRlUmlnaHQpXG4gIHZhciBkaWZmZXJlbmNlID0gTWF0aC5hYnMoZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMoZGF0ZUxlZnQsIGRhdGVSaWdodCkpXG4gIGRhdGVMZWZ0LnNldE1vbnRoKGRhdGVMZWZ0LmdldE1vbnRoKCkgLSBzaWduICogZGlmZmVyZW5jZSlcblxuICAvLyBNYXRoLmFicyhkaWZmIGluIGZ1bGwgbW9udGhzIC0gZGlmZiBpbiBjYWxlbmRhciBtb250aHMpID09PSAxIGlmIGxhc3QgY2FsZW5kYXIgbW9udGggaXMgbm90IGZ1bGxcbiAgLy8gSWYgc28sIHJlc3VsdCBtdXN0IGJlIGRlY3JlYXNlZCBieSAxIGluIGFic29sdXRlIHZhbHVlXG4gIHZhciBpc0xhc3RNb250aE5vdEZ1bGwgPSBjb21wYXJlQXNjKGRhdGVMZWZ0LCBkYXRlUmlnaHQpID09PSAtc2lnblxuICByZXR1cm4gc2lnbiAqIChkaWZmZXJlbmNlIC0gaXNMYXN0TW9udGhOb3RGdWxsKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZlcmVuY2VJbk1vbnRoc1xuIiwidmFyIGRpZmZlcmVuY2VJbk1vbnRocyA9IHJlcXVpcmUoJy4uL2RpZmZlcmVuY2VfaW5fbW9udGhzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgUXVhcnRlciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBmdWxsIHF1YXJ0ZXJzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgZnVsbCBxdWFydGVycyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgZnVsbCBxdWFydGVyc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBmdWxsIHF1YXJ0ZXJzIGFyZSBiZXR3ZWVuIDMxIERlY2VtYmVyIDIwMTMgYW5kIDIgSnVseSAyMDE0P1xuICogdmFyIHJlc3VsdCA9IGRpZmZlcmVuY2VJblF1YXJ0ZXJzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyKSxcbiAqICAgbmV3IERhdGUoMjAxMywgMTEsIDMxKVxuICogKVxuICogLy89PiAyXG4gKi9cbmZ1bmN0aW9uIGRpZmZlcmVuY2VJblF1YXJ0ZXJzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGlmZiA9IGRpZmZlcmVuY2VJbk1vbnRocyhkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkgLyAzXG4gIHJldHVybiBkaWZmID4gMCA/IE1hdGguZmxvb3IoZGlmZikgOiBNYXRoLmNlaWwoZGlmZilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5RdWFydGVyc1xuIiwidmFyIGRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyA9IHJlcXVpcmUoJy4uL2RpZmZlcmVuY2VfaW5fbWlsbGlzZWNvbmRzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgU2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIHNlY29uZHMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBzZWNvbmRzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBzZWNvbmRzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IHNlY29uZHMgYXJlIGJldHdlZW5cbiAqIC8vIDIgSnVseSAyMDE0IDEyOjMwOjA3Ljk5OSBhbmQgMiBKdWx5IDIwMTQgMTI6MzA6MjAuMDAwP1xuICogdmFyIHJlc3VsdCA9IGRpZmZlcmVuY2VJblNlY29uZHMoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDEyLCAzMCwgMjAsIDApLFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCAxMiwgMzAsIDcsIDk5OSlcbiAqIClcbiAqIC8vPT4gMTJcbiAqL1xuZnVuY3Rpb24gZGlmZmVyZW5jZUluU2Vjb25kcyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRpZmYgPSBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIC8gMTAwMFxuICByZXR1cm4gZGlmZiA+IDAgPyBNYXRoLmZsb29yKGRpZmYpIDogTWF0aC5jZWlsKGRpZmYpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZUluU2Vjb25kc1xuIiwidmFyIGRpZmZlcmVuY2VJbkRheXMgPSByZXF1aXJlKCcuLi9kaWZmZXJlbmNlX2luX2RheXMvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGZ1bGwgd2Vla3MgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBmdWxsIHdlZWtzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBmdWxsIHdlZWtzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGZ1bGwgd2Vla3MgYXJlIGJldHdlZW4gNSBKdWx5IDIwMTQgYW5kIDIwIEp1bHkgMjAxND9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5XZWVrcyhcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgMjApLFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCA1KVxuICogKVxuICogLy89PiAyXG4gKi9cbmZ1bmN0aW9uIGRpZmZlcmVuY2VJbldlZWtzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGlmZiA9IGRpZmZlcmVuY2VJbkRheXMoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIC8gN1xuICByZXR1cm4gZGlmZiA+IDAgPyBNYXRoLmZsb29yKGRpZmYpIDogTWF0aC5jZWlsKGRpZmYpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZUluV2Vla3NcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzID0gcmVxdWlyZSgnLi4vZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl95ZWFycy9pbmRleC5qcycpXG52YXIgY29tcGFyZUFzYyA9IHJlcXVpcmUoJy4uL2NvbXBhcmVfYXNjL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBmdWxsIHllYXJzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgZnVsbCB5ZWFycyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgZnVsbCB5ZWFyc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBmdWxsIHllYXJzIGFyZSBiZXR3ZWVuIDMxIERlY2VtYmVyIDIwMTMgYW5kIDExIEZlYnJ1YXJ5IDIwMTU/XG4gKiB2YXIgcmVzdWx0ID0gZGlmZmVyZW5jZUluWWVhcnMoXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDEsIDExKSxcbiAqICAgbmV3IERhdGUoMjAxMywgMTEsIDMxKVxuICogKVxuICogLy89PiAxXG4gKi9cbmZ1bmN0aW9uIGRpZmZlcmVuY2VJblllYXJzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgZGF0ZVJpZ2h0ID0gcGFyc2UoZGlydHlEYXRlUmlnaHQpXG5cbiAgdmFyIHNpZ24gPSBjb21wYXJlQXNjKGRhdGVMZWZ0LCBkYXRlUmlnaHQpXG4gIHZhciBkaWZmZXJlbmNlID0gTWF0aC5hYnMoZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSlcbiAgZGF0ZUxlZnQuc2V0RnVsbFllYXIoZGF0ZUxlZnQuZ2V0RnVsbFllYXIoKSAtIHNpZ24gKiBkaWZmZXJlbmNlKVxuXG4gIC8vIE1hdGguYWJzKGRpZmYgaW4gZnVsbCB5ZWFycyAtIGRpZmYgaW4gY2FsZW5kYXIgeWVhcnMpID09PSAxIGlmIGxhc3QgY2FsZW5kYXIgeWVhciBpcyBub3QgZnVsbFxuICAvLyBJZiBzbywgcmVzdWx0IG11c3QgYmUgZGVjcmVhc2VkIGJ5IDEgaW4gYWJzb2x1dGUgdmFsdWVcbiAgdmFyIGlzTGFzdFllYXJOb3RGdWxsID0gY29tcGFyZUFzYyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSA9PT0gLXNpZ25cbiAgcmV0dXJuIHNpZ24gKiAoZGlmZmVyZW5jZSAtIGlzTGFzdFllYXJOb3RGdWxsKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZlcmVuY2VJblllYXJzXG4iLCJ2YXIgY29tcGFyZURlc2MgPSByZXF1aXJlKCcuLi9jb21wYXJlX2Rlc2MvaW5kZXguanMnKVxudmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxudmFyIGRpZmZlcmVuY2VJblNlY29uZHMgPSByZXF1aXJlKCcuLi9kaWZmZXJlbmNlX2luX3NlY29uZHMvaW5kZXguanMnKVxudmFyIGRpZmZlcmVuY2VJbk1vbnRocyA9IHJlcXVpcmUoJy4uL2RpZmZlcmVuY2VfaW5fbW9udGhzL2luZGV4LmpzJylcbnZhciBlbkxvY2FsZSA9IHJlcXVpcmUoJy4uL2xvY2FsZS9lbi9pbmRleC5qcycpXG5cbnZhciBNSU5VVEVTX0lOX0RBWSA9IDE0NDBcbnZhciBNSU5VVEVTX0lOX0FMTU9TVF9UV09fREFZUyA9IDI1MjBcbnZhciBNSU5VVEVTX0lOX01PTlRIID0gNDMyMDBcbnZhciBNSU5VVEVTX0lOX1RXT19NT05USFMgPSA4NjQwMFxuXG4vKipcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcyBpbiB3b3Jkcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMgaW4gd29yZHMuXG4gKlxuICogfCBEaXN0YW5jZSBiZXR3ZWVuIGRhdGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJlc3VsdCAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAwIC4uLiAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGxlc3MgdGhhbiBhIG1pbnV0ZSAgfFxuICogfCAzMCBzZWNzIC4uLiAxIG1pbiAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDEgbWludXRlICAgICAgICAgICAgfFxuICogfCAxIG1pbiAzMCBzZWNzIC4uLiA0NCBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFsyLi40NF0gbWludXRlcyAgICAgfFxuICogfCA0NCBtaW5zIC4uLiAzMCBzZWNzIC4uLiA4OSBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IDEgaG91ciAgICAgICAgfFxuICogfCA4OSBtaW5zIDMwIHNlY3MgLi4uIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IFsyLi4yNF0gaG91cnMgfFxuICogfCAyMyBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiA0MSBocnMgNTkgbWlucyAzMCBzZWNzICAgICAgICAgICAgICAgICB8IDEgZGF5ICAgICAgICAgICAgICAgfFxuICogfCA0MSBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiAyOSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgICAgICAgICB8IFsyLi4zMF0gZGF5cyAgICAgICAgfFxuICogfCAyOSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDQ0IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyB8IGFib3V0IDEgbW9udGggICAgICAgfFxuICogfCA0NCBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDU5IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyB8IGFib3V0IDIgbW9udGhzICAgICAgfFxuICogfCA1OSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDEgeXIgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFsyLi4xMl0gbW9udGhzICAgICAgfFxuICogfCAxIHlyIC4uLiAxIHlyIDMgbW9udGhzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IDEgeWVhciAgICAgICAgfFxuICogfCAxIHlyIDMgbW9udGhzIC4uLiAxIHlyIDkgbW9udGggcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG92ZXIgMSB5ZWFyICAgICAgICAgfFxuICogfCAxIHlyIDkgbW9udGhzIC4uLiAyIHlycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFsbW9zdCAyIHllYXJzICAgICAgfFxuICogfCBOIHlycyAuLi4gTiB5cnMgMyBtb250aHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IE4geWVhcnMgICAgICAgfFxuICogfCBOIHlycyAzIG1vbnRocyAuLi4gTiB5cnMgOSBtb250aHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG92ZXIgTiB5ZWFycyAgICAgICAgfFxuICogfCBOIHlycyA5IG1vbnRocyAuLi4gTisxIHlycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFsbW9zdCBOKzEgeWVhcnMgICAgfFxuICpcbiAqIFdpdGggYG9wdGlvbnMuaW5jbHVkZVNlY29uZHMgPT0gdHJ1ZWA6XG4gKiB8IERpc3RhbmNlIGJldHdlZW4gZGF0ZXMgfCBSZXN1bHQgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IDAgc2VjcyAuLi4gNSBzZWNzICAgICAgfCBsZXNzIHRoYW4gNSBzZWNvbmRzICB8XG4gKiB8IDUgc2VjcyAuLi4gMTAgc2VjcyAgICAgfCBsZXNzIHRoYW4gMTAgc2Vjb25kcyB8XG4gKiB8IDEwIHNlY3MgLi4uIDIwIHNlY3MgICAgfCBsZXNzIHRoYW4gMjAgc2Vjb25kcyB8XG4gKiB8IDIwIHNlY3MgLi4uIDQwIHNlY3MgICAgfCBoYWxmIGEgbWludXRlICAgICAgICB8XG4gKiB8IDQwIHNlY3MgLi4uIDYwIHNlY3MgICAgfCBsZXNzIHRoYW4gYSBtaW51dGUgICB8XG4gKiB8IDYwIHNlY3MgLi4uIDkwIHNlY3MgICAgfCAxIG1pbnV0ZSAgICAgICAgICAgICB8XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVUb0NvbXBhcmUgLSB0aGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG90aGVyIGRhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9uc1xuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5pbmNsdWRlU2Vjb25kcz1mYWxzZV0gLSBkaXN0YW5jZXMgbGVzcyB0aGFuIGEgbWludXRlIGFyZSBtb3JlIGRldGFpbGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFkZFN1ZmZpeD1mYWxzZV0gLSByZXN1bHQgaW5kaWNhdGVzIGlmIHRoZSBzZWNvbmQgZGF0ZSBpcyBlYXJsaWVyIG9yIGxhdGVyIHRoYW4gdGhlIGZpcnN0XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMubG9jYWxlPWVuTG9jYWxlXSAtIHRoZSBsb2NhbGUgb2JqZWN0XG4gKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgZGlzdGFuY2UgaW4gd29yZHNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAyIEp1bHkgMjAxNCBhbmQgMSBKYW51YXJ5IDIwMTU/XG4gKiB2YXIgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyKSxcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSlcbiAqIClcbiAqIC8vPT4gJzYgbW9udGhzJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIDEgSmFudWFyeSAyMDE1IDAwOjAwOjE1XG4gKiAvLyBhbmQgMSBKYW51YXJ5IDIwMTUgMDA6MDA6MDAsIGluY2x1ZGluZyBzZWNvbmRzP1xuICogdmFyIHJlc3VsdCA9IGRpc3RhbmNlSW5Xb3JkcyhcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSwgMCwgMCwgMTUpLFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxLCAwLCAwLCAwKSxcbiAqICAge2luY2x1ZGVTZWNvbmRzOiB0cnVlfVxuICogKVxuICogLy89PiAnbGVzcyB0aGFuIDIwIHNlY29uZHMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGZyb20gMSBKYW51YXJ5IDIwMTZcbiAqIC8vIHRvIDEgSmFudWFyeSAyMDE1LCB3aXRoIGEgc3VmZml4P1xuICogdmFyIHJlc3VsdCA9IGRpc3RhbmNlSW5Xb3JkcyhcbiAqICAgbmV3IERhdGUoMjAxNiwgMCwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEpLFxuICogICB7YWRkU3VmZml4OiB0cnVlfVxuICogKVxuICogLy89PiAnYWJvdXQgMSB5ZWFyIGFnbydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAxIEF1Z3VzdCAyMDE2IGFuZCAxIEphbnVhcnkgMjAxNSBpbiBFc3BlcmFudG8/XG4gKiB2YXIgZW9Mb2NhbGUgPSByZXF1aXJlKCdkYXRlLWZucy9sb2NhbGUvZW8nKVxuICogdmFyIHJlc3VsdCA9IGRpc3RhbmNlSW5Xb3JkcyhcbiAqICAgbmV3IERhdGUoMjAxNiwgNywgMSksXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEpLFxuICogICB7bG9jYWxlOiBlb0xvY2FsZX1cbiAqIClcbiAqIC8vPT4gJ3BsaSBvbCAxIGphcm8nXG4gKi9cbmZ1bmN0aW9uIGRpc3RhbmNlSW5Xb3JkcyAoZGlydHlEYXRlVG9Db21wYXJlLCBkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucykge1xuICB2YXIgb3B0aW9ucyA9IGRpcnR5T3B0aW9ucyB8fCB7fVxuXG4gIHZhciBjb21wYXJpc29uID0gY29tcGFyZURlc2MoZGlydHlEYXRlVG9Db21wYXJlLCBkaXJ0eURhdGUpXG5cbiAgdmFyIGxvY2FsZSA9IG9wdGlvbnMubG9jYWxlXG4gIHZhciBsb2NhbGl6ZSA9IGVuTG9jYWxlLmRpc3RhbmNlSW5Xb3Jkcy5sb2NhbGl6ZVxuICBpZiAobG9jYWxlICYmIGxvY2FsZS5kaXN0YW5jZUluV29yZHMgJiYgbG9jYWxlLmRpc3RhbmNlSW5Xb3Jkcy5sb2NhbGl6ZSkge1xuICAgIGxvY2FsaXplID0gbG9jYWxlLmRpc3RhbmNlSW5Xb3Jkcy5sb2NhbGl6ZVxuICB9XG5cbiAgdmFyIGxvY2FsaXplT3B0aW9ucyA9IHtcbiAgICBhZGRTdWZmaXg6IEJvb2xlYW4ob3B0aW9ucy5hZGRTdWZmaXgpLFxuICAgIGNvbXBhcmlzb246IGNvbXBhcmlzb25cbiAgfVxuXG4gIHZhciBkYXRlTGVmdCwgZGF0ZVJpZ2h0XG4gIGlmIChjb21wYXJpc29uID4gMCkge1xuICAgIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlEYXRlVG9Db21wYXJlKVxuICAgIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgfSBlbHNlIHtcbiAgICBkYXRlTGVmdCA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgICBkYXRlUmlnaHQgPSBwYXJzZShkaXJ0eURhdGVUb0NvbXBhcmUpXG4gIH1cblxuICB2YXIgc2Vjb25kcyA9IGRpZmZlcmVuY2VJblNlY29uZHMoZGF0ZVJpZ2h0LCBkYXRlTGVmdClcbiAgdmFyIG9mZnNldCA9IGRhdGVSaWdodC5nZXRUaW1lem9uZU9mZnNldCgpIC0gZGF0ZUxlZnQuZ2V0VGltZXpvbmVPZmZzZXQoKVxuICB2YXIgbWludXRlcyA9IE1hdGgucm91bmQoc2Vjb25kcyAvIDYwKSAtIG9mZnNldFxuICB2YXIgbW9udGhzXG5cbiAgLy8gMCB1cCB0byAyIG1pbnNcbiAgaWYgKG1pbnV0ZXMgPCAyKSB7XG4gICAgaWYgKG9wdGlvbnMuaW5jbHVkZVNlY29uZHMpIHtcbiAgICAgIGlmIChzZWNvbmRzIDwgNSkge1xuICAgICAgICByZXR1cm4gbG9jYWxpemUoJ2xlc3NUaGFuWFNlY29uZHMnLCA1LCBsb2NhbGl6ZU9wdGlvbnMpXG4gICAgICB9IGVsc2UgaWYgKHNlY29uZHMgPCAxMCkge1xuICAgICAgICByZXR1cm4gbG9jYWxpemUoJ2xlc3NUaGFuWFNlY29uZHMnLCAxMCwgbG9jYWxpemVPcHRpb25zKVxuICAgICAgfSBlbHNlIGlmIChzZWNvbmRzIDwgMjApIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplKCdsZXNzVGhhblhTZWNvbmRzJywgMjAsIGxvY2FsaXplT3B0aW9ucylcbiAgICAgIH0gZWxzZSBpZiAoc2Vjb25kcyA8IDQwKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZSgnaGFsZkFNaW51dGUnLCBudWxsLCBsb2NhbGl6ZU9wdGlvbnMpXG4gICAgICB9IGVsc2UgaWYgKHNlY29uZHMgPCA2MCkge1xuICAgICAgICByZXR1cm4gbG9jYWxpemUoJ2xlc3NUaGFuWE1pbnV0ZXMnLCAxLCBsb2NhbGl6ZU9wdGlvbnMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbG9jYWxpemUoJ3hNaW51dGVzJywgMSwgbG9jYWxpemVPcHRpb25zKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobWludXRlcyA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbG9jYWxpemUoJ2xlc3NUaGFuWE1pbnV0ZXMnLCAxLCBsb2NhbGl6ZU9wdGlvbnMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbG9jYWxpemUoJ3hNaW51dGVzJywgbWludXRlcywgbG9jYWxpemVPcHRpb25zKVxuICAgICAgfVxuICAgIH1cblxuICAvLyAyIG1pbnMgdXAgdG8gMC43NSBocnNcbiAgfSBlbHNlIGlmIChtaW51dGVzIDwgNDUpIHtcbiAgICByZXR1cm4gbG9jYWxpemUoJ3hNaW51dGVzJywgbWludXRlcywgbG9jYWxpemVPcHRpb25zKVxuXG4gIC8vIDAuNzUgaHJzIHVwIHRvIDEuNSBocnNcbiAgfSBlbHNlIGlmIChtaW51dGVzIDwgOTApIHtcbiAgICByZXR1cm4gbG9jYWxpemUoJ2Fib3V0WEhvdXJzJywgMSwgbG9jYWxpemVPcHRpb25zKVxuXG4gIC8vIDEuNSBocnMgdXAgdG8gMjQgaHJzXG4gIH0gZWxzZSBpZiAobWludXRlcyA8IE1JTlVURVNfSU5fREFZKSB7XG4gICAgdmFyIGhvdXJzID0gTWF0aC5yb3VuZChtaW51dGVzIC8gNjApXG4gICAgcmV0dXJuIGxvY2FsaXplKCdhYm91dFhIb3VycycsIGhvdXJzLCBsb2NhbGl6ZU9wdGlvbnMpXG5cbiAgLy8gMSBkYXkgdXAgdG8gMS43NSBkYXlzXG4gIH0gZWxzZSBpZiAobWludXRlcyA8IE1JTlVURVNfSU5fQUxNT1NUX1RXT19EQVlTKSB7XG4gICAgcmV0dXJuIGxvY2FsaXplKCd4RGF5cycsIDEsIGxvY2FsaXplT3B0aW9ucylcblxuICAvLyAxLjc1IGRheXMgdXAgdG8gMzAgZGF5c1xuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBNSU5VVEVTX0lOX01PTlRIKSB7XG4gICAgdmFyIGRheXMgPSBNYXRoLnJvdW5kKG1pbnV0ZXMgLyBNSU5VVEVTX0lOX0RBWSlcbiAgICByZXR1cm4gbG9jYWxpemUoJ3hEYXlzJywgZGF5cywgbG9jYWxpemVPcHRpb25zKVxuXG4gIC8vIDEgbW9udGggdXAgdG8gMiBtb250aHNcbiAgfSBlbHNlIGlmIChtaW51dGVzIDwgTUlOVVRFU19JTl9UV09fTU9OVEhTKSB7XG4gICAgbW9udGhzID0gTWF0aC5yb3VuZChtaW51dGVzIC8gTUlOVVRFU19JTl9NT05USClcbiAgICByZXR1cm4gbG9jYWxpemUoJ2Fib3V0WE1vbnRocycsIG1vbnRocywgbG9jYWxpemVPcHRpb25zKVxuICB9XG5cbiAgbW9udGhzID0gZGlmZmVyZW5jZUluTW9udGhzKGRhdGVSaWdodCwgZGF0ZUxlZnQpXG5cbiAgLy8gMiBtb250aHMgdXAgdG8gMTIgbW9udGhzXG4gIGlmIChtb250aHMgPCAxMikge1xuICAgIHZhciBuZWFyZXN0TW9udGggPSBNYXRoLnJvdW5kKG1pbnV0ZXMgLyBNSU5VVEVTX0lOX01PTlRIKVxuICAgIHJldHVybiBsb2NhbGl6ZSgneE1vbnRocycsIG5lYXJlc3RNb250aCwgbG9jYWxpemVPcHRpb25zKVxuXG4gIC8vIDEgeWVhciB1cCB0byBtYXggRGF0ZVxuICB9IGVsc2Uge1xuICAgIHZhciBtb250aHNTaW5jZVN0YXJ0T2ZZZWFyID0gbW9udGhzICUgMTJcbiAgICB2YXIgeWVhcnMgPSBNYXRoLmZsb29yKG1vbnRocyAvIDEyKVxuXG4gICAgLy8gTiB5ZWFycyB1cCB0byAxIHllYXJzIDMgbW9udGhzXG4gICAgaWYgKG1vbnRoc1NpbmNlU3RhcnRPZlllYXIgPCAzKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUoJ2Fib3V0WFllYXJzJywgeWVhcnMsIGxvY2FsaXplT3B0aW9ucylcblxuICAgIC8vIE4geWVhcnMgMyBtb250aHMgdXAgdG8gTiB5ZWFycyA5IG1vbnRoc1xuICAgIH0gZWxzZSBpZiAobW9udGhzU2luY2VTdGFydE9mWWVhciA8IDkpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZSgnb3ZlclhZZWFycycsIHllYXJzLCBsb2NhbGl6ZU9wdGlvbnMpXG5cbiAgICAvLyBOIHllYXJzIDkgbW9udGhzIHVwIHRvIE4geWVhciAxMiBtb250aHNcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGxvY2FsaXplKCdhbG1vc3RYWWVhcnMnLCB5ZWFycyArIDEsIGxvY2FsaXplT3B0aW9ucylcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXN0YW5jZUluV29yZHNcbiIsInZhciBjb21wYXJlRGVzYyA9IHJlcXVpcmUoJy4uL2NvbXBhcmVfZGVzYy9pbmRleC5qcycpXG52YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG52YXIgZGlmZmVyZW5jZUluU2Vjb25kcyA9IHJlcXVpcmUoJy4uL2RpZmZlcmVuY2VfaW5fc2Vjb25kcy9pbmRleC5qcycpXG52YXIgZW5Mb2NhbGUgPSByZXF1aXJlKCcuLi9sb2NhbGUvZW4vaW5kZXguanMnKVxuXG52YXIgTUlOVVRFU19JTl9EQVkgPSAxNDQwXG52YXIgTUlOVVRFU19JTl9NT05USCA9IDQzMjAwXG52YXIgTUlOVVRFU19JTl9ZRUFSID0gNTI1NjAwXG5cbi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzIGluIHdvcmRzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcyBpbiB3b3JkcywgdXNpbmcgc3RyaWN0IHVuaXRzLlxuICogVGhpcyBpcyBsaWtlIGBkaXN0YW5jZUluV29yZHNgLCBidXQgZG9lcyBub3QgdXNlIGhlbHBlcnMgbGlrZSAnYWxtb3N0JywgJ292ZXInLFxuICogJ2xlc3MgdGhhbicgYW5kIHRoZSBsaWtlLlxuICpcbiAqIHwgRGlzdGFuY2UgYmV0d2VlbiBkYXRlcyB8IFJlc3VsdCAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IDAgLi4uIDU5IHNlY3MgICAgICAgICAgfCBbMC4uNTldIHNlY29uZHMgICAgIHxcbiAqIHwgMSAuLi4gNTkgbWlucyAgICAgICAgICB8IFsxLi41OV0gbWludXRlcyAgICAgfFxuICogfCAxIC4uLiAyMyBocnMgICAgICAgICAgIHwgWzEuLjIzXSBob3VycyAgICAgICB8XG4gKiB8IDEgLi4uIDI5IGRheXMgICAgICAgICAgfCBbMS4uMjldIGRheXMgICAgICAgIHxcbiAqIHwgMSAuLi4gMTEgbW9udGhzICAgICAgICB8IFsxLi4xMV0gbW9udGhzICAgICAgfFxuICogfCAxIC4uLiBOIHllYXJzICAgICAgICAgIHwgWzEuLk5dICB5ZWFycyAgICAgICB8XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVUb0NvbXBhcmUgLSB0aGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG90aGVyIGRhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9uc1xuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hZGRTdWZmaXg9ZmFsc2VdIC0gcmVzdWx0IGluZGljYXRlcyBpZiB0aGUgc2Vjb25kIGRhdGUgaXMgZWFybGllciBvciBsYXRlciB0aGFuIHRoZSBmaXJzdFxuICogQHBhcmFtIHsncyd8J20nfCdoJ3wnZCd8J00nfCdZJ30gW29wdGlvbnMudW5pdF0gLSBpZiBzcGVjaWZpZWQsIHdpbGwgZm9yY2UgYSB1bml0XG4gKiBAcGFyYW0geydmbG9vcid8J2NlaWwnfCdyb3VuZCd9IFtvcHRpb25zLnBhcnRpYWxNZXRob2Q9J2Zsb29yJ10gLSB3aGljaCB3YXkgdG8gcm91bmQgcGFydGlhbCB1bml0c1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmxvY2FsZT1lbkxvY2FsZV0gLSB0aGUgbG9jYWxlIG9iamVjdFxuICogQHJldHVybnMge1N0cmluZ30gdGhlIGRpc3RhbmNlIGluIHdvcmRzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gMiBKdWx5IDIwMTQgYW5kIDEgSmFudWFyeSAyMDE1P1xuICogdmFyIHJlc3VsdCA9IGRpc3RhbmNlSW5Xb3Jkc1N0cmljdChcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgMiksXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDIpXG4gKiApXG4gKiAvLz0+ICc2IG1vbnRocydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAxIEphbnVhcnkgMjAxNSAwMDowMDoxNVxuICogLy8gYW5kIDEgSmFudWFyeSAyMDE1IDAwOjAwOjAwP1xuICogdmFyIHJlc3VsdCA9IGRpc3RhbmNlSW5Xb3Jkc1N0cmljdChcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSwgMCwgMCwgMTUpLFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxLCAwLCAwLCAwKSxcbiAqIClcbiAqIC8vPT4gJzE1IHNlY29uZHMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGZyb20gMSBKYW51YXJ5IDIwMTZcbiAqIC8vIHRvIDEgSmFudWFyeSAyMDE1LCB3aXRoIGEgc3VmZml4P1xuICogdmFyIHJlc3VsdCA9IGRpc3RhbmNlSW5Xb3Jkc1N0cmljdChcbiAqICAgbmV3IERhdGUoMjAxNiwgMCwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEpLFxuICogICB7YWRkU3VmZml4OiB0cnVlfVxuICogKVxuICogLy89PiAnMSB5ZWFyIGFnbydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgZnJvbSAxIEphbnVhcnkgMjAxNlxuICogLy8gdG8gMSBKYW51YXJ5IDIwMTUsIGluIG1pbnV0ZXM/XG4gKiB2YXIgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzU3RyaWN0KFxuICogICBuZXcgRGF0ZSgyMDE2LCAwLCAxKSxcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSksXG4gKiAgIHt1bml0OiAnbSd9XG4gKiApXG4gKiAvLz0+ICc1MjU2MDAgbWludXRlcydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgZnJvbSAxIEphbnVhcnkgMjAxNlxuICogLy8gdG8gMjggSmFudWFyeSAyMDE1LCBpbiBtb250aHMsIHJvdW5kZWQgdXA/XG4gKiB2YXIgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzU3RyaWN0KFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAyOCksXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEpLFxuICogICB7dW5pdDogJ00nLCBwYXJ0aWFsTWV0aG9kOiAnY2VpbCd9XG4gKiApXG4gKiAvLz0+ICcxIG1vbnRoJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIDEgQXVndXN0IDIwMTYgYW5kIDEgSmFudWFyeSAyMDE1IGluIEVzcGVyYW50bz9cbiAqIHZhciBlb0xvY2FsZSA9IHJlcXVpcmUoJ2RhdGUtZm5zL2xvY2FsZS9lbycpXG4gKiB2YXIgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzU3RyaWN0KFxuICogICBuZXcgRGF0ZSgyMDE2LCA3LCAxKSxcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSksXG4gKiAgIHtsb2NhbGU6IGVvTG9jYWxlfVxuICogKVxuICogLy89PiAnMSBqYXJvJ1xuICovXG5mdW5jdGlvbiBkaXN0YW5jZUluV29yZHNTdHJpY3QgKGRpcnR5RGF0ZVRvQ29tcGFyZSwgZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIG9wdGlvbnMgPSBkaXJ0eU9wdGlvbnMgfHwge31cblxuICB2YXIgY29tcGFyaXNvbiA9IGNvbXBhcmVEZXNjKGRpcnR5RGF0ZVRvQ29tcGFyZSwgZGlydHlEYXRlKVxuXG4gIHZhciBsb2NhbGUgPSBvcHRpb25zLmxvY2FsZVxuICB2YXIgbG9jYWxpemUgPSBlbkxvY2FsZS5kaXN0YW5jZUluV29yZHMubG9jYWxpemVcbiAgaWYgKGxvY2FsZSAmJiBsb2NhbGUuZGlzdGFuY2VJbldvcmRzICYmIGxvY2FsZS5kaXN0YW5jZUluV29yZHMubG9jYWxpemUpIHtcbiAgICBsb2NhbGl6ZSA9IGxvY2FsZS5kaXN0YW5jZUluV29yZHMubG9jYWxpemVcbiAgfVxuXG4gIHZhciBsb2NhbGl6ZU9wdGlvbnMgPSB7XG4gICAgYWRkU3VmZml4OiBCb29sZWFuKG9wdGlvbnMuYWRkU3VmZml4KSxcbiAgICBjb21wYXJpc29uOiBjb21wYXJpc29uXG4gIH1cblxuICB2YXIgZGF0ZUxlZnQsIGRhdGVSaWdodFxuICBpZiAoY29tcGFyaXNvbiA+IDApIHtcbiAgICBkYXRlTGVmdCA9IHBhcnNlKGRpcnR5RGF0ZVRvQ29tcGFyZSlcbiAgICBkYXRlUmlnaHQgPSBwYXJzZShkaXJ0eURhdGUpXG4gIH0gZWxzZSB7XG4gICAgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGUpXG4gICAgZGF0ZVJpZ2h0ID0gcGFyc2UoZGlydHlEYXRlVG9Db21wYXJlKVxuICB9XG5cbiAgdmFyIHVuaXRcbiAgdmFyIG1hdGhQYXJ0aWFsID0gTWF0aFtvcHRpb25zLnBhcnRpYWxNZXRob2QgPyBTdHJpbmcob3B0aW9ucy5wYXJ0aWFsTWV0aG9kKSA6ICdmbG9vciddXG4gIHZhciBzZWNvbmRzID0gZGlmZmVyZW5jZUluU2Vjb25kcyhkYXRlUmlnaHQsIGRhdGVMZWZ0KVxuICB2YXIgb2Zmc2V0ID0gZGF0ZVJpZ2h0LmdldFRpbWV6b25lT2Zmc2V0KCkgLSBkYXRlTGVmdC5nZXRUaW1lem9uZU9mZnNldCgpXG4gIHZhciBtaW51dGVzID0gbWF0aFBhcnRpYWwoc2Vjb25kcyAvIDYwKSAtIG9mZnNldFxuICB2YXIgaG91cnMsIGRheXMsIG1vbnRocywgeWVhcnNcblxuICBpZiAob3B0aW9ucy51bml0KSB7XG4gICAgdW5pdCA9IFN0cmluZyhvcHRpb25zLnVuaXQpXG4gIH0gZWxzZSB7XG4gICAgaWYgKG1pbnV0ZXMgPCAxKSB7XG4gICAgICB1bml0ID0gJ3MnXG4gICAgfSBlbHNlIGlmIChtaW51dGVzIDwgNjApIHtcbiAgICAgIHVuaXQgPSAnbSdcbiAgICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBNSU5VVEVTX0lOX0RBWSkge1xuICAgICAgdW5pdCA9ICdoJ1xuICAgIH0gZWxzZSBpZiAobWludXRlcyA8IE1JTlVURVNfSU5fTU9OVEgpIHtcbiAgICAgIHVuaXQgPSAnZCdcbiAgICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBNSU5VVEVTX0lOX1lFQVIpIHtcbiAgICAgIHVuaXQgPSAnTSdcbiAgICB9IGVsc2Uge1xuICAgICAgdW5pdCA9ICdZJ1xuICAgIH1cbiAgfVxuXG4gIC8vIDAgdXAgdG8gNjAgc2Vjb25kc1xuICBpZiAodW5pdCA9PT0gJ3MnKSB7XG4gICAgcmV0dXJuIGxvY2FsaXplKCd4U2Vjb25kcycsIHNlY29uZHMsIGxvY2FsaXplT3B0aW9ucylcblxuICAvLyAxIHVwIHRvIDYwIG1pbnNcbiAgfSBlbHNlIGlmICh1bml0ID09PSAnbScpIHtcbiAgICByZXR1cm4gbG9jYWxpemUoJ3hNaW51dGVzJywgbWludXRlcywgbG9jYWxpemVPcHRpb25zKVxuXG4gIC8vIDEgdXAgdG8gMjQgaG91cnNcbiAgfSBlbHNlIGlmICh1bml0ID09PSAnaCcpIHtcbiAgICBob3VycyA9IG1hdGhQYXJ0aWFsKG1pbnV0ZXMgLyA2MClcbiAgICByZXR1cm4gbG9jYWxpemUoJ3hIb3VycycsIGhvdXJzLCBsb2NhbGl6ZU9wdGlvbnMpXG5cbiAgLy8gMSB1cCB0byAzMCBkYXlzXG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gJ2QnKSB7XG4gICAgZGF5cyA9IG1hdGhQYXJ0aWFsKG1pbnV0ZXMgLyBNSU5VVEVTX0lOX0RBWSlcbiAgICByZXR1cm4gbG9jYWxpemUoJ3hEYXlzJywgZGF5cywgbG9jYWxpemVPcHRpb25zKVxuXG4gIC8vIDEgdXAgdG8gMTIgbW9udGhzXG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gJ00nKSB7XG4gICAgbW9udGhzID0gbWF0aFBhcnRpYWwobWludXRlcyAvIE1JTlVURVNfSU5fTU9OVEgpXG4gICAgcmV0dXJuIGxvY2FsaXplKCd4TW9udGhzJywgbW9udGhzLCBsb2NhbGl6ZU9wdGlvbnMpXG5cbiAgLy8gMSB5ZWFyIHVwIHRvIG1heCBEYXRlXG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gJ1knKSB7XG4gICAgeWVhcnMgPSBtYXRoUGFydGlhbChtaW51dGVzIC8gTUlOVVRFU19JTl9ZRUFSKVxuICAgIHJldHVybiBsb2NhbGl6ZSgneFllYXJzJywgeWVhcnMsIGxvY2FsaXplT3B0aW9ucylcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcignVW5rbm93biB1bml0OiAnICsgdW5pdClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXN0YW5jZUluV29yZHNTdHJpY3RcbiIsInZhciBkaXN0YW5jZUluV29yZHMgPSByZXF1aXJlKCcuLi9kaXN0YW5jZV9pbl93b3Jkcy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGdpdmVuIGRhdGUgYW5kIG5vdyBpbiB3b3Jkcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZSBhbmQgbm93IGluIHdvcmRzLlxuICpcbiAqIHwgRGlzdGFuY2UgdG8gbm93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSZXN1bHQgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgMCAuLi4gMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBsZXNzIHRoYW4gYSBtaW51dGUgIHxcbiAqIHwgMzAgc2VjcyAuLi4gMSBtaW4gMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAxIG1pbnV0ZSAgICAgICAgICAgIHxcbiAqIHwgMSBtaW4gMzAgc2VjcyAuLi4gNDQgbWlucyAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBbMi4uNDRdIG1pbnV0ZXMgICAgIHxcbiAqIHwgNDQgbWlucyAuLi4gMzAgc2VjcyAuLi4gODkgbWlucyAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYm91dCAxIGhvdXIgICAgICAgIHxcbiAqIHwgODkgbWlucyAzMCBzZWNzIC4uLiAyMyBocnMgNTkgbWlucyAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgfCBhYm91dCBbMi4uMjRdIGhvdXJzIHxcbiAqIHwgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gNDEgaHJzIDU5IG1pbnMgMzAgc2VjcyAgICAgICAgICAgICAgICAgfCAxIGRheSAgICAgICAgICAgICAgIHxcbiAqIHwgNDEgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gMjkgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzICAgICAgICAgfCBbMi4uMzBdIGRheXMgICAgICAgIHxcbiAqIHwgMjkgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiA0NCBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgfCBhYm91dCAxIG1vbnRoICAgICAgIHxcbiAqIHwgNDQgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiA1OSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgfCBhYm91dCAyIG1vbnRocyAgICAgIHxcbiAqIHwgNTkgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiAxIHlyICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBbMi4uMTJdIG1vbnRocyAgICAgIHxcbiAqIHwgMSB5ciAuLi4gMSB5ciAzIG1vbnRocyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYm91dCAxIHllYXIgICAgICAgIHxcbiAqIHwgMSB5ciAzIG1vbnRocyAuLi4gMSB5ciA5IG1vbnRoIHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBvdmVyIDEgeWVhciAgICAgICAgIHxcbiAqIHwgMSB5ciA5IG1vbnRocyAuLi4gMiB5cnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhbG1vc3QgMiB5ZWFycyAgICAgIHxcbiAqIHwgTiB5cnMgLi4uIE4geXJzIDMgbW9udGhzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYm91dCBOIHllYXJzICAgICAgIHxcbiAqIHwgTiB5cnMgMyBtb250aHMgLi4uIE4geXJzIDkgbW9udGhzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBvdmVyIE4geWVhcnMgICAgICAgIHxcbiAqIHwgTiB5cnMgOSBtb250aHMgLi4uIE4rMSB5cnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhbG1vc3QgTisxIHllYXJzICAgIHxcbiAqXG4gKiBXaXRoIGBvcHRpb25zLmluY2x1ZGVTZWNvbmRzID09IHRydWVgOlxuICogfCBEaXN0YW5jZSB0byBub3cgICAgIHwgUmVzdWx0ICAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAwIHNlY3MgLi4uIDUgc2VjcyAgIHwgbGVzcyB0aGFuIDUgc2Vjb25kcyAgfFxuICogfCA1IHNlY3MgLi4uIDEwIHNlY3MgIHwgbGVzcyB0aGFuIDEwIHNlY29uZHMgfFxuICogfCAxMCBzZWNzIC4uLiAyMCBzZWNzIHwgbGVzcyB0aGFuIDIwIHNlY29uZHMgfFxuICogfCAyMCBzZWNzIC4uLiA0MCBzZWNzIHwgaGFsZiBhIG1pbnV0ZSAgICAgICAgfFxuICogfCA0MCBzZWNzIC4uLiA2MCBzZWNzIHwgbGVzcyB0aGFuIGEgbWludXRlICAgfFxuICogfCA2MCBzZWNzIC4uLiA5MCBzZWNzIHwgMSBtaW51dGUgICAgICAgICAgICAgfFxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9uc1xuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5pbmNsdWRlU2Vjb25kcz1mYWxzZV0gLSBkaXN0YW5jZXMgbGVzcyB0aGFuIGEgbWludXRlIGFyZSBtb3JlIGRldGFpbGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFkZFN1ZmZpeD1mYWxzZV0gLSByZXN1bHQgc3BlY2lmaWVzIGlmIHRoZSBzZWNvbmQgZGF0ZSBpcyBlYXJsaWVyIG9yIGxhdGVyIHRoYW4gdGhlIGZpcnN0XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMubG9jYWxlPWVuTG9jYWxlXSAtIHRoZSBsb2NhbGUgb2JqZWN0XG4gKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgZGlzdGFuY2UgaW4gd29yZHNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMSBKYW51YXJ5IDIwMTUsIHdoYXQgaXMgdGhlIGRpc3RhbmNlIHRvIDIgSnVseSAyMDE0P1xuICogdmFyIHJlc3VsdCA9IGRpc3RhbmNlSW5Xb3Jkc1RvTm93KFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyKVxuICogKVxuICogLy89PiAnNiBtb250aHMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIG5vdyBpcyAxIEphbnVhcnkgMjAxNSAwMDowMDowMCxcbiAqIC8vIHdoYXQgaXMgdGhlIGRpc3RhbmNlIHRvIDEgSmFudWFyeSAyMDE1IDAwOjAwOjE1LCBpbmNsdWRpbmcgc2Vjb25kcz9cbiAqIHZhciByZXN1bHQgPSBkaXN0YW5jZUluV29yZHNUb05vdyhcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSwgMCwgMCwgMTUpLFxuICogICB7aW5jbHVkZVNlY29uZHM6IHRydWV9XG4gKiApXG4gKiAvLz0+ICdsZXNzIHRoYW4gMjAgc2Vjb25kcydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMSBKYW51YXJ5IDIwMTUsXG4gKiAvLyB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAxIEphbnVhcnkgMjAxNiwgd2l0aCBhIHN1ZmZpeD9cbiAqIHZhciByZXN1bHQgPSBkaXN0YW5jZUluV29yZHNUb05vdyhcbiAqICAgbmV3IERhdGUoMjAxNiwgMCwgMSksXG4gKiAgIHthZGRTdWZmaXg6IHRydWV9XG4gKiApXG4gKiAvLz0+ICdpbiBhYm91dCAxIHllYXInXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDEgSmFudWFyeSAyMDE1LFxuICogLy8gd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMSBBdWd1c3QgMjAxNiBpbiBFc3BlcmFudG8/XG4gKiB2YXIgZW9Mb2NhbGUgPSByZXF1aXJlKCdkYXRlLWZucy9sb2NhbGUvZW8nKVxuICogdmFyIHJlc3VsdCA9IGRpc3RhbmNlSW5Xb3Jkc1RvTm93KFxuICogICBuZXcgRGF0ZSgyMDE2LCA3LCAxKSxcbiAqICAge2xvY2FsZTogZW9Mb2NhbGV9XG4gKiApXG4gKiAvLz0+ICdwbGkgb2wgMSBqYXJvJ1xuICovXG5mdW5jdGlvbiBkaXN0YW5jZUluV29yZHNUb05vdyAoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgcmV0dXJuIGRpc3RhbmNlSW5Xb3JkcyhEYXRlLm5vdygpLCBkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXN0YW5jZUluV29yZHNUb05vd1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBhcnJheSBvZiBkYXRlcyB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgYXJyYXkgb2YgZGF0ZXMgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IHN0YXJ0RGF0ZSAtIHRoZSBmaXJzdCBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZW5kRGF0ZSAtIHRoZSBsYXN0IGRhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc3RlcD0xXSAtIHRoZSBzdGVwIGJldHdlZW4gZWFjaCBkYXlcbiAqIEByZXR1cm5zIHtEYXRlW119IHRoZSBhcnJheSB3aXRoIHN0YXJ0cyBvZiBkYXlzIGZyb20gdGhlIGRheSBvZiBzdGFydERhdGUgdG8gdGhlIGRheSBvZiBlbmREYXRlXG4gKiBAdGhyb3dzIHtFcnJvcn0gc3RhcnREYXRlIGNhbm5vdCBiZSBhZnRlciBlbmREYXRlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEVhY2ggZGF5IGJldHdlZW4gNiBPY3RvYmVyIDIwMTQgYW5kIDEwIE9jdG9iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBlYWNoRGF5KFxuICogICBuZXcgRGF0ZSgyMDE0LCA5LCA2KSxcbiAqICAgbmV3IERhdGUoMjAxNCwgOSwgMTApXG4gKiApXG4gKiAvLz0+IFtcbiAqIC8vICAgTW9uIE9jdCAwNiAyMDE0IDAwOjAwOjAwLFxuICogLy8gICBUdWUgT2N0IDA3IDIwMTQgMDA6MDA6MDAsXG4gKiAvLyAgIFdlZCBPY3QgMDggMjAxNCAwMDowMDowMCxcbiAqIC8vICAgVGh1IE9jdCAwOSAyMDE0IDAwOjAwOjAwLFxuICogLy8gICBGcmkgT2N0IDEwIDIwMTQgMDA6MDA6MDBcbiAqIC8vIF1cbiAqL1xuZnVuY3Rpb24gZWFjaERheSAoZGlydHlTdGFydERhdGUsIGRpcnR5RW5kRGF0ZSwgZGlydHlTdGVwKSB7XG4gIHZhciBzdGFydERhdGUgPSBwYXJzZShkaXJ0eVN0YXJ0RGF0ZSlcbiAgdmFyIGVuZERhdGUgPSBwYXJzZShkaXJ0eUVuZERhdGUpXG4gIHZhciBzdGVwID0gZGlydHlTdGVwICE9PSB1bmRlZmluZWQgPyBkaXJ0eVN0ZXAgOiAxXG5cbiAgdmFyIGVuZFRpbWUgPSBlbmREYXRlLmdldFRpbWUoKVxuXG4gIGlmIChzdGFydERhdGUuZ2V0VGltZSgpID4gZW5kVGltZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIGZpcnN0IGRhdGUgY2Fubm90IGJlIGFmdGVyIHRoZSBzZWNvbmQgZGF0ZScpXG4gIH1cblxuICB2YXIgZGF0ZXMgPSBbXVxuXG4gIHZhciBjdXJyZW50RGF0ZSA9IHN0YXJ0RGF0ZVxuICBjdXJyZW50RGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKVxuXG4gIHdoaWxlIChjdXJyZW50RGF0ZS5nZXRUaW1lKCkgPD0gZW5kVGltZSkge1xuICAgIGRhdGVzLnB1c2gocGFyc2UoY3VycmVudERhdGUpKVxuICAgIGN1cnJlbnREYXRlLnNldERhdGUoY3VycmVudERhdGUuZ2V0RGF0ZSgpICsgc3RlcClcbiAgfVxuXG4gIHJldHVybiBkYXRlc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVhY2hEYXlcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBlbmQgb2YgYSBkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIGVuZCBvZiBhIGRheSBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBlbmRPZkRheShuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgU2VwIDAyIDIwMTQgMjM6NTk6NTkuOTk5XG4gKi9cbmZ1bmN0aW9uIGVuZE9mRGF5IChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIGRhdGUuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuZE9mRGF5XG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IEhvdXIgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgYW4gaG91ciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiBhbiBob3VyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBlbmQgb2YgYW4gaG91clxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGFuIGhvdXIgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gZW5kT2ZIb3VyKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSkpXG4gKiAvLz0+IFR1ZSBTZXAgMDIgMjAxNCAxMTo1OTo1OS45OTlcbiAqL1xuZnVuY3Rpb24gZW5kT2ZIb3VyIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIGRhdGUuc2V0TWludXRlcyg1OSwgNTksIDk5OSlcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbmRPZkhvdXJcbiIsInZhciBlbmRPZldlZWsgPSByZXF1aXJlKCcuLi9lbmRfb2Zfd2Vlay9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IElTTyBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIGFuIElTTyB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGFuIElTTyB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZW5kIG9mIGFuIElTTyB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBlbmQgb2YgYW4gSVNPIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gZW5kT2ZJU09XZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFN1biBTZXAgMDcgMjAxNCAyMzo1OTo1OS45OTlcbiAqL1xuZnVuY3Rpb24gZW5kT2ZJU09XZWVrIChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIGVuZE9mV2VlayhkaXJ0eURhdGUsIHt3ZWVrU3RhcnRzT246IDF9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuZE9mSVNPV2Vla1xuIiwidmFyIGdldElTT1llYXIgPSByZXF1aXJlKCcuLi9nZXRfaXNvX3llYXIvaW5kZXguanMnKVxudmFyIHN0YXJ0T2ZJU09XZWVrID0gcmVxdWlyZSgnLi4vc3RhcnRfb2ZfaXNvX3dlZWsvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGVuZCBvZiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcixcbiAqIHdoaWNoIGFsd2F5cyBzdGFydHMgMyBkYXlzIGJlZm9yZSB0aGUgeWVhcidzIGZpcnN0IFRodXJzZGF5LlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBlbmQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIGVuZCBvZiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgMiBKdWx5IDIwMDU6XG4gKiB2YXIgcmVzdWx0ID0gZW5kT2ZJU09ZZWFyKG5ldyBEYXRlKDIwMDUsIDYsIDIpKVxuICogLy89PiBTdW4gSmFuIDAxIDIwMDYgMjM6NTk6NTkuOTk5XG4gKi9cbmZ1bmN0aW9uIGVuZE9mSVNPWWVhciAoZGlydHlEYXRlKSB7XG4gIHZhciB5ZWFyID0gZ2V0SVNPWWVhcihkaXJ0eURhdGUpXG4gIHZhciBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyID0gbmV3IERhdGUoMClcbiAgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhci5zZXRGdWxsWWVhcih5ZWFyICsgMSwgMCwgNClcbiAgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhci5zZXRIb3VycygwLCAwLCAwLCAwKVxuICB2YXIgZGF0ZSA9IHN0YXJ0T2ZJU09XZWVrKGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIpXG4gIGRhdGUuc2V0TWlsbGlzZWNvbmRzKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLSAxKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuZE9mSVNPWWVhclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNaW51dGUgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgYSBtaW51dGUgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBlbmQgb2YgYSBtaW51dGUgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVuZCBvZiBhIG1pbnV0ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGEgbWludXRlIGZvciAxIERlY2VtYmVyIDIwMTQgMjI6MTU6NDUuNDAwOlxuICogdmFyIHJlc3VsdCA9IGVuZE9mTWludXRlKG5ldyBEYXRlKDIwMTQsIDExLCAxLCAyMiwgMTUsIDQ1LCA0MDApKVxuICogLy89PiBNb24gRGVjIDAxIDIwMTQgMjI6MTU6NTkuOTk5XG4gKi9cbmZ1bmN0aW9uIGVuZE9mTWludXRlIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIGRhdGUuc2V0U2Vjb25kcyg1OSwgOTk5KVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuZE9mTWludXRlXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIGEgbW9udGggZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBlbmQgb2YgYSBtb250aCBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZW5kIG9mIGEgbW9udGhcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIGVuZCBvZiBhIG1vbnRoIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogdmFyIHJlc3VsdCA9IGVuZE9mTW9udGgobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAzMCAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5mdW5jdGlvbiBlbmRPZk1vbnRoIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICBkYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSwgbW9udGggKyAxLCAwKVxuICBkYXRlLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSlcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbmRPZk1vbnRoXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFF1YXJ0ZXIgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgYSB5ZWFyIHF1YXJ0ZXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBlbmQgb2YgYSB5ZWFyIHF1YXJ0ZXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVuZCBvZiBhIHF1YXJ0ZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIGVuZCBvZiBhIHF1YXJ0ZXIgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gZW5kT2ZRdWFydGVyKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFR1ZSBTZXAgMzAgMjAxNCAyMzo1OTo1OS45OTlcbiAqL1xuZnVuY3Rpb24gZW5kT2ZRdWFydGVyIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBjdXJyZW50TW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgdmFyIG1vbnRoID0gY3VycmVudE1vbnRoIC0gY3VycmVudE1vbnRoICUgMyArIDNcbiAgZGF0ZS5zZXRNb250aChtb250aCwgMClcbiAgZGF0ZS5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW5kT2ZRdWFydGVyXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFNlY29uZCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGVuZCBvZiBhIHNlY29uZCBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiBhIHNlY29uZCBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZW5kIG9mIGEgc2Vjb25kXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBlbmQgb2YgYSBzZWNvbmQgZm9yIDEgRGVjZW1iZXIgMjAxNCAyMjoxNTo0NS40MDA6XG4gKiB2YXIgcmVzdWx0ID0gZW5kT2ZTZWNvbmQobmV3IERhdGUoMjAxNCwgMTEsIDEsIDIyLCAxNSwgNDUsIDQwMCkpXG4gKiAvLz0+IE1vbiBEZWMgMDEgMjAxNCAyMjoxNTo0NS45OTlcbiAqL1xuZnVuY3Rpb24gZW5kT2ZTZWNvbmQgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoOTk5KVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuZE9mU2Vjb25kXG4iLCJ2YXIgZW5kT2ZEYXkgPSByZXF1aXJlKCcuLi9lbmRfb2ZfZGF5L2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIHRvZGF5LlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBlbmQgb2YgdG9kYXkuXG4gKlxuICogQHJldHVybnMge0RhdGV9IHRoZSBlbmQgb2YgdG9kYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gZW5kT2ZUb2RheSgpXG4gKiAvLz0+IE1vbiBPY3QgNiAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5mdW5jdGlvbiBlbmRPZlRvZGF5ICgpIHtcbiAgcmV0dXJuIGVuZE9mRGF5KG5ldyBEYXRlKCkpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW5kT2ZUb2RheVxuIiwiLyoqXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIHRvbW9ycm93LlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBlbmQgb2YgdG9tb3Jyb3cuXG4gKlxuICogQHJldHVybnMge0RhdGV9IHRoZSBlbmQgb2YgdG9tb3Jyb3dcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gZW5kT2ZUb21vcnJvdygpXG4gKiAvLz0+IFR1ZSBPY3QgNyAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5mdW5jdGlvbiBlbmRPZlRvbW9ycm93ICgpIHtcbiAgdmFyIG5vdyA9IG5ldyBEYXRlKClcbiAgdmFyIHllYXIgPSBub3cuZ2V0RnVsbFllYXIoKVxuICB2YXIgbW9udGggPSBub3cuZ2V0TW9udGgoKVxuICB2YXIgZGF5ID0gbm93LmdldERhdGUoKVxuXG4gIHZhciBkYXRlID0gbmV3IERhdGUoMClcbiAgZGF0ZS5zZXRGdWxsWWVhcih5ZWFyLCBtb250aCwgZGF5ICsgMSlcbiAgZGF0ZS5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW5kT2ZUb21vcnJvd1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiBhIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53ZWVrU3RhcnRzT249MF0gLSB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayAoMCAtIFN1bmRheSlcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZW5kIG9mIGEgd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGEgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBlbmRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gU2F0IFNlcCAwNiAyMDE0IDIzOjU5OjU5Ljk5OVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0aGUgd2VlayBzdGFydHMgb24gTW9uZGF5LCB0aGUgZW5kIG9mIHRoZSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogdmFyIHJlc3VsdCA9IGVuZE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApLCB7d2Vla1N0YXJ0c09uOiAxfSlcbiAqIC8vPT4gU3VuIFNlcCAwNyAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5mdW5jdGlvbiBlbmRPZldlZWsgKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKSB7XG4gIHZhciB3ZWVrU3RhcnRzT24gPSBkaXJ0eU9wdGlvbnMgPyAoTnVtYmVyKGRpcnR5T3B0aW9ucy53ZWVrU3RhcnRzT24pIHx8IDApIDogMFxuXG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgZGF5ID0gZGF0ZS5nZXREYXkoKVxuICB2YXIgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyAtNyA6IDApICsgNiAtIChkYXkgLSB3ZWVrU3RhcnRzT24pXG5cbiAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgZGlmZilcbiAgZGF0ZS5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW5kT2ZXZWVrXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgYSB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGEgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZW5kIG9mIGEgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGEgeWVhciBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBlbmRPZlllYXIobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwMCkpXG4gKiAvLz0+IFdlZCBEZWMgMzEgMjAxNCAyMzo1OTo1OS45OTlcbiAqL1xuZnVuY3Rpb24gZW5kT2ZZZWFyIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gIGRhdGUuc2V0RnVsbFllYXIoeWVhciArIDEsIDAsIDApXG4gIGRhdGUuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuZE9mWWVhclxuIiwiLyoqXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIHllc3RlcmRheS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIHllc3RlcmRheS5cbiAqXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVuZCBvZiB5ZXN0ZXJkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gZW5kT2ZZZXN0ZXJkYXkoKVxuICogLy89PiBTdW4gT2N0IDUgMjAxNCAyMzo1OTo1OS45OTlcbiAqL1xuZnVuY3Rpb24gZW5kT2ZZZXN0ZXJkYXkgKCkge1xuICB2YXIgbm93ID0gbmV3IERhdGUoKVxuICB2YXIgeWVhciA9IG5vdy5nZXRGdWxsWWVhcigpXG4gIHZhciBtb250aCA9IG5vdy5nZXRNb250aCgpXG4gIHZhciBkYXkgPSBub3cuZ2V0RGF0ZSgpXG5cbiAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgwKVxuICBkYXRlLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoLCBkYXkgLSAxKVxuICBkYXRlLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSlcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbmRPZlllc3RlcmRheVxuIiwidmFyIGdldERheU9mWWVhciA9IHJlcXVpcmUoJy4uL2dldF9kYXlfb2ZfeWVhci9pbmRleC5qcycpXG52YXIgZ2V0SVNPV2VlayA9IHJlcXVpcmUoJy4uL2dldF9pc29fd2Vlay9pbmRleC5qcycpXG52YXIgZ2V0SVNPWWVhciA9IHJlcXVpcmUoJy4uL2dldF9pc29feWVhci9pbmRleC5qcycpXG52YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG52YXIgaXNWYWxpZCA9IHJlcXVpcmUoJy4uL2lzX3ZhbGlkL2luZGV4LmpzJylcbnZhciBlbkxvY2FsZSA9IHJlcXVpcmUoJy4uL2xvY2FsZS9lbi9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBGb3JtYXQgdGhlIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZyBpbiB0aGUgZ2l2ZW4gZm9ybWF0LlxuICpcbiAqIEFjY2VwdGVkIHRva2VuczpcbiAqIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgfCBUb2tlbiB8IFJlc3VsdCBleGFtcGxlcyAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgTW9udGggICAgICAgICAgICAgICAgICAgfCBNICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBNbyAgICB8IDFzdCwgMm5kLCAuLi4sIDEydGggICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTSAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU0gICB8IEphbiwgRmViLCAuLi4sIERlYyAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU1NICB8IEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyIHxcbiAqIHwgUXVhcnRlciAgICAgICAgICAgICAgICAgfCBRICAgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBRbyAgICB8IDFzdCwgMm5kLCAzcmQsIDR0aCAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgfCBEICAgICB8IDEsIDIsIC4uLiwgMzEgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBEbyAgICB8IDFzdCwgMm5kLCAuLi4sIDMxc3QgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBERCAgICB8IDAxLCAwMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIHllYXIgICAgICAgICAgICAgfCBEREQgICB8IDEsIDIsIC4uLiwgMzY2ICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBERERvICB8IDFzdCwgMm5kLCAuLi4sIDM2NnRoICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBEREREICB8IDAwMSwgMDAyLCAuLi4sIDM2NiAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIHdlZWsgICAgICAgICAgICAgfCBkICAgICB8IDAsIDEsIC4uLiwgNiAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBkbyAgICB8IDB0aCwgMXN0LCAuLi4sIDZ0aCAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBkZCAgICB8IFN1LCBNbywgLi4uLCBTYSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBkZGQgICB8IFN1biwgTW9uLCAuLi4sIFNhdCAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBkZGRkICB8IFN1bmRheSwgTW9uZGF5LCAuLi4sIFNhdHVyZGF5ICAgIHxcbiAqIHwgRGF5IG9mIElTTyB3ZWVrICAgICAgICAgfCBFICAgICB8IDEsIDIsIC4uLiwgNyAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgSVNPIHdlZWsgICAgICAgICAgICAgICAgfCBXICAgICB8IDEsIDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBXbyAgICB8IDFzdCwgMm5kLCAuLi4sIDUzcmQgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBXVyAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgIHxcbiAqIHwgWWVhciAgICAgICAgICAgICAgICAgICAgfCBZWSAgICB8IDAwLCAwMSwgLi4uLCA5OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVlZICB8IDE5MDAsIDE5MDEsIC4uLiwgMjA5OSAgICAgICAgICAgIHxcbiAqIHwgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgfCBHRyAgICB8IDAwLCAwMSwgLi4uLCA5OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBHR0dHICB8IDE5MDAsIDE5MDEsIC4uLiwgMjA5OSAgICAgICAgICAgIHxcbiAqIHwgQU0vUE0gICAgICAgICAgICAgICAgICAgfCBBICAgICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBhICAgICB8IGFtLCBwbSAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYSAgICB8IGEubS4sIHAubS4gICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgSG91ciAgICAgICAgICAgICAgICAgICAgfCBIICAgICB8IDAsIDEsIC4uLiAyMyAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBISCAgICB8IDAwLCAwMSwgLi4uIDIzICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBoICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBoaCAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTWludXRlICAgICAgICAgICAgICAgICAgfCBtICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBtbSAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgU2Vjb25kICAgICAgICAgICAgICAgICAgfCBzICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBzcyAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgMS8xMCBvZiBzZWNvbmQgICAgICAgICAgfCBTICAgICB8IDAsIDEsIC4uLiwgOSAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgMS8xMDAgb2Ygc2Vjb25kICAgICAgICAgfCBTUyAgICB8IDAwLCAwMSwgLi4uLCA5OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTWlsbGlzZWNvbmQgICAgICAgICAgICAgfCBTU1MgICB8IDAwMCwgMDAxLCAuLi4sIDk5OSAgICAgICAgICAgICAgIHxcbiAqIHwgVGltZXpvbmUgICAgICAgICAgICAgICAgfCBaICAgICB8IC0wMTowMCwgKzAwOjAwLCAuLi4gKzEyOjAwICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBaWiAgICB8IC0wMTAwLCArMDAwMCwgLi4uLCArMTIwMCAgICAgICAgIHxcbiAqIHwgU2Vjb25kcyB0aW1lc3RhbXAgICAgICAgfCBYICAgICB8IDUxMjk2OTUyMCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTWlsbGlzZWNvbmRzIHRpbWVzdGFtcCAgfCB4ICAgICB8IDUxMjk2OTUyMDkwMCAgICAgICAgICAgICAgICAgICAgIHxcbiAqXG4gKiBUaGUgY2hhcmFjdGVycyB3cmFwcGVkIGluIHNxdWFyZSBicmFja2V0cyBhcmUgZXNjYXBlZC5cbiAqXG4gKiBUaGUgcmVzdWx0IG1heSB2YXJ5IGJ5IGxvY2FsZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gW2Zvcm1hdD0nWVlZWS1NTS1ERFRISDptbTpzcy5TU1NaJ10gLSB0aGUgc3RyaW5nIG9mIHRva2Vuc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMubG9jYWxlPWVuTG9jYWxlXSAtIHRoZSBsb2NhbGUgb2JqZWN0XG4gKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAxMSBGZWJydWFyeSAyMDE0IGluIG1pZGRsZS1lbmRpYW4gZm9ybWF0OlxuICogdmFyIHJlc3VsdCA9IGZvcm1hdChcbiAqICAgbmV3IERhdGUoMjAxNCwgMSwgMTEpLFxuICogICAnTU0vREQvWVlZWSdcbiAqIClcbiAqIC8vPT4gJzAyLzExLzIwMTQnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAyIEp1bHkgMjAxNCBpbiBFc3BlcmFudG86XG4gKiB2YXIgZW9Mb2NhbGUgPSByZXF1aXJlKCdkYXRlLWZucy9sb2NhbGUvZW8nKVxuICogdmFyIHJlc3VsdCA9IGZvcm1hdChcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgMiksXG4gKiAgICdEbyBbZGVdIE1NTU0gWVlZWScsXG4gKiAgIHtsb2NhbGU6IGVvTG9jYWxlfVxuICogKVxuICogLy89PiAnMi1hIGRlIGp1bGlvIDIwMTQnXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdCAoZGlydHlEYXRlLCBkaXJ0eUZvcm1hdFN0ciwgZGlydHlPcHRpb25zKSB7XG4gIHZhciBmb3JtYXRTdHIgPSBkaXJ0eUZvcm1hdFN0ciA/IFN0cmluZyhkaXJ0eUZvcm1hdFN0cikgOiAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1NaJ1xuICB2YXIgb3B0aW9ucyA9IGRpcnR5T3B0aW9ucyB8fCB7fVxuXG4gIHZhciBsb2NhbGUgPSBvcHRpb25zLmxvY2FsZVxuICB2YXIgbG9jYWxlRm9ybWF0dGVycyA9IGVuTG9jYWxlLmZvcm1hdC5mb3JtYXR0ZXJzXG4gIHZhciBmb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gZW5Mb2NhbGUuZm9ybWF0LmZvcm1hdHRpbmdUb2tlbnNSZWdFeHBcbiAgaWYgKGxvY2FsZSAmJiBsb2NhbGUuZm9ybWF0ICYmIGxvY2FsZS5mb3JtYXQuZm9ybWF0dGVycykge1xuICAgIGxvY2FsZUZvcm1hdHRlcnMgPSBsb2NhbGUuZm9ybWF0LmZvcm1hdHRlcnNcblxuICAgIGlmIChsb2NhbGUuZm9ybWF0LmZvcm1hdHRpbmdUb2tlbnNSZWdFeHApIHtcbiAgICAgIGZvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSBsb2NhbGUuZm9ybWF0LmZvcm1hdHRpbmdUb2tlbnNSZWdFeHBcbiAgICB9XG4gIH1cblxuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcblxuICBpZiAoIWlzVmFsaWQoZGF0ZSkpIHtcbiAgICByZXR1cm4gJ0ludmFsaWQgRGF0ZSdcbiAgfVxuXG4gIHZhciBmb3JtYXRGbiA9IGJ1aWxkRm9ybWF0Rm4oZm9ybWF0U3RyLCBsb2NhbGVGb3JtYXR0ZXJzLCBmb3JtYXR0aW5nVG9rZW5zUmVnRXhwKVxuXG4gIHJldHVybiBmb3JtYXRGbihkYXRlKVxufVxuXG52YXIgZm9ybWF0dGVycyA9IHtcbiAgLy8gTW9udGg6IDEsIDIsIC4uLiwgMTJcbiAgJ00nOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1vbnRoKCkgKyAxXG4gIH0sXG5cbiAgLy8gTW9udGg6IDAxLCAwMiwgLi4uLCAxMlxuICAnTU0nOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRNb250aCgpICsgMSwgMilcbiAgfSxcblxuICAvLyBRdWFydGVyOiAxLCAyLCAzLCA0XG4gICdRJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5jZWlsKChkYXRlLmdldE1vbnRoKCkgKyAxKSAvIDMpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIG1vbnRoOiAxLCAyLCAuLi4sIDMxXG4gICdEJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKClcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDAxLCAwMiwgLi4uLCAzMVxuICAnREQnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXREYXRlKCksIDIpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHllYXI6IDEsIDIsIC4uLiwgMzY2XG4gICdEREQnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBnZXREYXlPZlllYXIoZGF0ZSlcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMDAxLCAwMDIsIC4uLiwgMzY2XG4gICdEREREJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGdldERheU9mWWVhcihkYXRlKSwgMylcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogMCwgMSwgLi4uLCA2XG4gICdkJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXkoKVxuICB9LFxuXG4gIC8vIERheSBvZiBJU08gd2VlazogMSwgMiwgLi4uLCA3XG4gICdFJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXkoKSB8fCA3XG4gIH0sXG5cbiAgLy8gSVNPIHdlZWs6IDEsIDIsIC4uLiwgNTNcbiAgJ1cnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBnZXRJU09XZWVrKGRhdGUpXG4gIH0sXG5cbiAgLy8gSVNPIHdlZWs6IDAxLCAwMiwgLi4uLCA1M1xuICAnV1cnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZ2V0SVNPV2VlayhkYXRlKSwgMilcbiAgfSxcblxuICAvLyBZZWFyOiAwMCwgMDEsIC4uLiwgOTlcbiAgJ1lZJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0RnVsbFllYXIoKSwgNCkuc3Vic3RyKDIpXG4gIH0sXG5cbiAgLy8gWWVhcjogMTkwMCwgMTkwMSwgLi4uLCAyMDk5XG4gICdZWVlZJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0RnVsbFllYXIoKSwgNClcbiAgfSxcblxuICAvLyBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogMDAsIDAxLCAuLi4sIDk5XG4gICdHRyc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIFN0cmluZyhnZXRJU09ZZWFyKGRhdGUpKS5zdWJzdHIoMilcbiAgfSxcblxuICAvLyBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogMTkwMCwgMTkwMSwgLi4uLCAyMDk5XG4gICdHR0dHJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0SVNPWWVhcihkYXRlKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAsIDEsIC4uLiAyM1xuICAnSCc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAwLCAwMSwgLi4uLCAyM1xuICAnSEgnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRIb3VycygpLCAyKVxuICB9LFxuXG4gIC8vIEhvdXI6IDEsIDIsIC4uLiwgMTJcbiAgJ2gnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKVxuICAgIGlmIChob3VycyA9PT0gMCkge1xuICAgICAgcmV0dXJuIDEyXG4gICAgfSBlbHNlIGlmIChob3VycyA+IDEyKSB7XG4gICAgICByZXR1cm4gaG91cnMgJSAxMlxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaG91cnNcbiAgICB9XG4gIH0sXG5cbiAgLy8gSG91cjogMDEsIDAyLCAuLi4sIDEyXG4gICdoaCc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhmb3JtYXR0ZXJzWydoJ10oZGF0ZSksIDIpXG4gIH0sXG5cbiAgLy8gTWludXRlOiAwLCAxLCAuLi4sIDU5XG4gICdtJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKClcbiAgfSxcblxuICAvLyBNaW51dGU6IDAwLCAwMSwgLi4uLCA1OVxuICAnbW0nOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRNaW51dGVzKCksIDIpXG4gIH0sXG5cbiAgLy8gU2Vjb25kOiAwLCAxLCAuLi4sIDU5XG4gICdzJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKClcbiAgfSxcblxuICAvLyBTZWNvbmQ6IDAwLCAwMSwgLi4uLCA1OVxuICAnc3MnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRTZWNvbmRzKCksIDIpXG4gIH0sXG5cbiAgLy8gMS8xMCBvZiBzZWNvbmQ6IDAsIDEsIC4uLiwgOVxuICAnUyc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwMClcbiAgfSxcblxuICAvLyAxLzEwMCBvZiBzZWNvbmQ6IDAwLCAwMSwgLi4uLCA5OVxuICAnU1MnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoTWF0aC5mbG9vcihkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTApLCAyKVxuICB9LFxuXG4gIC8vIE1pbGxpc2Vjb25kOiAwMDAsIDAwMSwgLi4uLCA5OTlcbiAgJ1NTUyc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldE1pbGxpc2Vjb25kcygpLCAzKVxuICB9LFxuXG4gIC8vIFRpbWV6b25lOiAtMDE6MDAsICswMDowMCwgLi4uICsxMjowMFxuICAnWic6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSwgJzonKVxuICB9LFxuXG4gIC8vIFRpbWV6b25lOiAtMDEwMCwgKzAwMDAsIC4uLiArMTIwMFxuICAnWlonOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBmb3JtYXRUaW1lem9uZShkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkpXG4gIH0sXG5cbiAgLy8gU2Vjb25kcyB0aW1lc3RhbXA6IDUxMjk2OTUyMFxuICAnWCc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoZGF0ZS5nZXRUaW1lKCkgLyAxMDAwKVxuICB9LFxuXG4gIC8vIE1pbGxpc2Vjb25kcyB0aW1lc3RhbXA6IDUxMjk2OTUyMDkwMFxuICAneCc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gYnVpbGRGb3JtYXRGbiAoZm9ybWF0U3RyLCBsb2NhbGVGb3JtYXR0ZXJzLCBmb3JtYXR0aW5nVG9rZW5zUmVnRXhwKSB7XG4gIHZhciBhcnJheSA9IGZvcm1hdFN0ci5tYXRjaChmb3JtYXR0aW5nVG9rZW5zUmVnRXhwKVxuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoXG5cbiAgdmFyIGlcbiAgdmFyIGZvcm1hdHRlclxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBmb3JtYXR0ZXIgPSBsb2NhbGVGb3JtYXR0ZXJzW2FycmF5W2ldXSB8fCBmb3JtYXR0ZXJzW2FycmF5W2ldXVxuICAgIGlmIChmb3JtYXR0ZXIpIHtcbiAgICAgIGFycmF5W2ldID0gZm9ybWF0dGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIGFycmF5W2ldID0gcmVtb3ZlRm9ybWF0dGluZ1Rva2VucyhhcnJheVtpXSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICB2YXIgb3V0cHV0ID0gJydcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXJyYXlbaV0gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICBvdXRwdXQgKz0gYXJyYXlbaV0oZGF0ZSwgZm9ybWF0dGVycylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dCArPSBhcnJheVtpXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlRm9ybWF0dGluZ1Rva2VucyAoaW5wdXQpIHtcbiAgaWYgKGlucHV0Lm1hdGNoKC9cXFtbXFxzXFxTXS8pKSB7XG4gICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL15cXFt8XSQvZywgJycpXG4gIH1cbiAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL1xcXFwvZywgJycpXG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lIChvZmZzZXQsIGRlbGltZXRlcikge1xuICBkZWxpbWV0ZXIgPSBkZWxpbWV0ZXIgfHwgJydcbiAgdmFyIHNpZ24gPSBvZmZzZXQgPiAwID8gJy0nIDogJysnXG4gIHZhciBhYnNPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpXG4gIHZhciBob3VycyA9IE1hdGguZmxvb3IoYWJzT2Zmc2V0IC8gNjApXG4gIHZhciBtaW51dGVzID0gYWJzT2Zmc2V0ICUgNjBcbiAgcmV0dXJuIHNpZ24gKyBhZGRMZWFkaW5nWmVyb3MoaG91cnMsIDIpICsgZGVsaW1ldGVyICsgYWRkTGVhZGluZ1plcm9zKG1pbnV0ZXMsIDIpXG59XG5cbmZ1bmN0aW9uIGFkZExlYWRpbmdaZXJvcyAobnVtYmVyLCB0YXJnZXRMZW5ndGgpIHtcbiAgdmFyIG91dHB1dCA9IE1hdGguYWJzKG51bWJlcikudG9TdHJpbmcoKVxuICB3aGlsZSAob3V0cHV0Lmxlbmd0aCA8IHRhcmdldExlbmd0aCkge1xuICAgIG91dHB1dCA9ICcwJyArIG91dHB1dFxuICB9XG4gIHJldHVybiBvdXRwdXRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmb3JtYXRcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgZGF5IG9mIHRoZSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgZGF5IG9mIHRoZSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBnaXZlbiBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgZGF5IG9mIG1vbnRoXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIGRheSBvZiB0aGUgbW9udGggaXMgMjkgRmVicnVhcnkgMjAxMj9cbiAqIHZhciByZXN1bHQgPSBnZXREYXRlKG5ldyBEYXRlKDIwMTIsIDEsIDI5KSlcbiAqIC8vPT4gMjlcbiAqL1xuZnVuY3Rpb24gZ2V0RGF0ZSAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgZGF5T2ZNb250aCA9IGRhdGUuZ2V0RGF0ZSgpXG4gIHJldHVybiBkYXlPZk1vbnRoXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0RGF0ZVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrZGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgZGF5IG9mIHRoZSB3ZWVrIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBkYXkgb2YgdGhlIHdlZWsgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZ2l2ZW4gZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIGRheSBvZiB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIGRheSBvZiB0aGUgd2VlayBpcyAyOSBGZWJydWFyeSAyMDEyP1xuICogdmFyIHJlc3VsdCA9IGdldERheShuZXcgRGF0ZSgyMDEyLCAxLCAyOSkpXG4gKiAvLz0+IDNcbiAqL1xuZnVuY3Rpb24gZ2V0RGF5IChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBkYXkgPSBkYXRlLmdldERheSgpXG4gIHJldHVybiBkYXlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXREYXlcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBzdGFydE9mWWVhciA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX3llYXIvaW5kZXguanMnKVxudmFyIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyA9IHJlcXVpcmUoJy4uL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfZGF5cy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIGRheSBvZiB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgZGF5IG9mIHRoZSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBkYXkgb2YgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCBkYXkgb2YgdGhlIHllYXIgaXMgMiBKdWx5IDIwMTQ/XG4gKiB2YXIgcmVzdWx0ID0gZ2V0RGF5T2ZZZWFyKG5ldyBEYXRlKDIwMTQsIDYsIDIpKVxuICogLy89PiAxODNcbiAqL1xuZnVuY3Rpb24gZ2V0RGF5T2ZZZWFyIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBkaWZmID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRhdGUsIHN0YXJ0T2ZZZWFyKGRhdGUpKVxuICB2YXIgZGF5T2ZZZWFyID0gZGlmZiArIDFcbiAgcmV0dXJuIGRheU9mWWVhclxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldERheU9mWWVhclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgbW9udGggb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgbW9udGggb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZ2l2ZW4gZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBkYXlzIGluIGEgbW9udGhcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgZGF5cyBhcmUgaW4gRmVicnVhcnkgMjAwMD9cbiAqIHZhciByZXN1bHQgPSBnZXREYXlzSW5Nb250aChuZXcgRGF0ZSgyMDAwLCAxKSlcbiAqIC8vPT4gMjlcbiAqL1xuZnVuY3Rpb24gZ2V0RGF5c0luTW9udGggKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgdmFyIG1vbnRoSW5kZXggPSBkYXRlLmdldE1vbnRoKClcbiAgdmFyIGxhc3REYXlPZk1vbnRoID0gbmV3IERhdGUoMClcbiAgbGFzdERheU9mTW9udGguc2V0RnVsbFllYXIoeWVhciwgbW9udGhJbmRleCArIDEsIDApXG4gIGxhc3REYXlPZk1vbnRoLnNldEhvdXJzKDAsIDAsIDAsIDApXG4gIHJldHVybiBsYXN0RGF5T2ZNb250aC5nZXREYXRlKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXREYXlzSW5Nb250aFxuIiwidmFyIGlzTGVhcFllYXIgPSByZXF1aXJlKCcuLi9pc19sZWFwX3llYXIvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZ2l2ZW4gZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBkYXlzIGluIGEgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBkYXlzIGFyZSBpbiAyMDEyP1xuICogdmFyIHJlc3VsdCA9IGdldERheXNJblllYXIobmV3IERhdGUoMjAxMiwgMCwgMSkpXG4gKiAvLz0+IDM2NlxuICovXG5mdW5jdGlvbiBnZXREYXlzSW5ZZWFyIChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIGlzTGVhcFllYXIoZGlydHlEYXRlKSA/IDM2NiA6IDM2NVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldERheXNJblllYXJcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSG91ciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIGhvdXJzIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBob3VycyBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBnaXZlbiBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgaG91cnNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gR2V0IHRoZSBob3VycyBvZiAyOSBGZWJydWFyeSAyMDEyIDExOjQ1OjAwOlxuICogdmFyIHJlc3VsdCA9IGdldEhvdXJzKG5ldyBEYXRlKDIwMTIsIDEsIDI5LCAxMSwgNDUpKVxuICogLy89PiAxMVxuICovXG5mdW5jdGlvbiBnZXRIb3VycyAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKClcbiAgcmV0dXJuIGhvdXJzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SG91cnNcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgV2Vla2RheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIGRheSBvZiB0aGUgSVNPIHdlZWsgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIGRheSBvZiB0aGUgSVNPIHdlZWsgb2YgdGhlIGdpdmVuIGRhdGUsXG4gKiB3aGljaCBpcyA3IGZvciBTdW5kYXksIDEgZm9yIE1vbmRheSBldGMuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBkYXkgb2YgSVNPIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggZGF5IG9mIHRoZSBJU08gd2VlayBpcyAyNiBGZWJydWFyeSAyMDEyP1xuICogdmFyIHJlc3VsdCA9IGdldElTT0RheShuZXcgRGF0ZSgyMDEyLCAxLCAyNikpXG4gKiAvLz0+IDdcbiAqL1xuZnVuY3Rpb24gZ2V0SVNPRGF5IChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBkYXkgPSBkYXRlLmdldERheSgpXG5cbiAgaWYgKGRheSA9PT0gMCkge1xuICAgIGRheSA9IDdcbiAgfVxuXG4gIHJldHVybiBkYXlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRJU09EYXlcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBzdGFydE9mSVNPV2VlayA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX2lzb193ZWVrL2luZGV4LmpzJylcbnZhciBzdGFydE9mSVNPWWVhciA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX2lzb195ZWFyL2luZGV4LmpzJylcblxudmFyIE1JTExJU0VDT05EU19JTl9XRUVLID0gNjA0ODAwMDAwXG5cbi8qKlxuICogQGNhdGVnb3J5IElTTyBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgSVNPIHdlZWsgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIElTTyB3ZWVrIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBnaXZlbiBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgSVNPIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBvZiB0aGUgSVNPLXdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMiBKYW51YXJ5IDIwMDU/XG4gKiB2YXIgcmVzdWx0ID0gZ2V0SVNPV2VlayhuZXcgRGF0ZSgyMDA1LCAwLCAyKSlcbiAqIC8vPT4gNTNcbiAqL1xuZnVuY3Rpb24gZ2V0SVNPV2VlayAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgZGlmZiA9IHN0YXJ0T2ZJU09XZWVrKGRhdGUpLmdldFRpbWUoKSAtIHN0YXJ0T2ZJU09ZZWFyKGRhdGUpLmdldFRpbWUoKVxuXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2YgZGF5cyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyXG4gIC8vIGJlY2F1c2UgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSB3ZWVrIGlzIG5vdCBjb25zdGFudFxuICAvLyAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgd2VlayBvZiB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpXG4gIHJldHVybiBNYXRoLnJvdW5kKGRpZmYgLyBNSUxMSVNFQ09ORFNfSU5fV0VFSykgKyAxXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SVNPV2Vla1xuIiwidmFyIHN0YXJ0T2ZJU09ZZWFyID0gcmVxdWlyZSgnLi4vc3RhcnRfb2ZfaXNvX3llYXIvaW5kZXguanMnKVxudmFyIGFkZFdlZWtzID0gcmVxdWlyZSgnLi4vYWRkX3dlZWtzL2luZGV4LmpzJylcblxudmFyIE1JTExJU0VDT05EU19JTl9XRUVLID0gNjA0ODAwMDAwXG5cbi8qKlxuICogQGNhdGVnb3J5IElTTyBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIHdlZWtzIGluIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2Ygd2Vla3MgaW4gYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgSVNPIHdlZWtzIGluIGEgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSB3ZWVrcyBhcmUgaW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgMjAxNT9cbiAqIHZhciByZXN1bHQgPSBnZXRJU09XZWVrc0luWWVhcihuZXcgRGF0ZSgyMDE1LCAxLCAxMSkpXG4gKiAvLz0+IDUzXG4gKi9cbmZ1bmN0aW9uIGdldElTT1dlZWtzSW5ZZWFyIChkaXJ0eURhdGUpIHtcbiAgdmFyIHRoaXNZZWFyID0gc3RhcnRPZklTT1llYXIoZGlydHlEYXRlKVxuICB2YXIgbmV4dFllYXIgPSBzdGFydE9mSVNPWWVhcihhZGRXZWVrcyh0aGlzWWVhciwgNjApKVxuICB2YXIgZGlmZiA9IG5leHRZZWFyLnZhbHVlT2YoKSAtIHRoaXNZZWFyLnZhbHVlT2YoKVxuICAvLyBSb3VuZCB0aGUgbnVtYmVyIG9mIHdlZWtzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIHdlZWsgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSB3ZWVrIG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcbiAgcmV0dXJuIE1hdGgucm91bmQoZGlmZiAvIE1JTExJU0VDT05EU19JTl9XRUVLKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldElTT1dlZWtzSW5ZZWFyXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG52YXIgc3RhcnRPZklTT1dlZWsgPSByZXF1aXJlKCcuLi9zdGFydF9vZl9pc29fd2Vlay9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IElTTyBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLFxuICogd2hpY2ggYWx3YXlzIHN0YXJ0cyAzIGRheXMgYmVmb3JlIHRoZSB5ZWFyJ3MgZmlyc3QgVGh1cnNkYXkuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCBJU08td2VlayBudW1iZXJpbmcgeWVhciBpcyAyIEphbnVhcnkgMjAwNT9cbiAqIHZhciByZXN1bHQgPSBnZXRJU09ZZWFyKG5ldyBEYXRlKDIwMDUsIDAsIDIpKVxuICogLy89PiAyMDA0XG4gKi9cbmZ1bmN0aW9uIGdldElTT1llYXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcblxuICB2YXIgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhciA9IG5ldyBEYXRlKDApXG4gIGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIuc2V0RnVsbFllYXIoeWVhciArIDEsIDAsIDQpXG4gIGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIuc2V0SG91cnMoMCwgMCwgMCwgMClcbiAgdmFyIHN0YXJ0T2ZOZXh0WWVhciA9IHN0YXJ0T2ZJU09XZWVrKGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIpXG5cbiAgdmFyIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIgPSBuZXcgRGF0ZSgwKVxuICBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyLnNldEZ1bGxZZWFyKHllYXIsIDAsIDQpXG4gIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIuc2V0SG91cnMoMCwgMCwgMCwgMClcbiAgdmFyIHN0YXJ0T2ZUaGlzWWVhciA9IHN0YXJ0T2ZJU09XZWVrKGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIpXG5cbiAgaWYgKGRhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZOZXh0WWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhciArIDFcbiAgfSBlbHNlIGlmIChkYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mVGhpc1llYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXJcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geWVhciAtIDFcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldElTT1llYXJcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTWlsbGlzZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBtaWxsaXNlY29uZHMgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG1pbGxpc2Vjb25kcyBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBnaXZlbiBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbWlsbGlzZWNvbmRzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEdldCB0aGUgbWlsbGlzZWNvbmRzIG9mIDI5IEZlYnJ1YXJ5IDIwMTIgMTE6NDU6MDUuMTIzOlxuICogdmFyIHJlc3VsdCA9IGdldE1pbGxpc2Vjb25kcyhuZXcgRGF0ZSgyMDEyLCAxLCAyOSwgMTEsIDQ1LCA1LCAxMjMpKVxuICogLy89PiAxMjNcbiAqL1xuZnVuY3Rpb24gZ2V0TWlsbGlzZWNvbmRzIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBtaWxsaXNlY29uZHMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG4gIHJldHVybiBtaWxsaXNlY29uZHNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRNaWxsaXNlY29uZHNcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTWludXRlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbWludXRlcyBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbWludXRlcyBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBnaXZlbiBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbWludXRlc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBHZXQgdGhlIG1pbnV0ZXMgb2YgMjkgRmVicnVhcnkgMjAxMiAxMTo0NTowNTpcbiAqIHZhciByZXN1bHQgPSBnZXRNaW51dGVzKG5ldyBEYXRlKDIwMTIsIDEsIDI5LCAxMSwgNDUsIDUpKVxuICogLy89PiA0NVxuICovXG5mdW5jdGlvbiBnZXRNaW51dGVzIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBtaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKClcbiAgcmV0dXJuIG1pbnV0ZXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRNaW51dGVzXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbW9udGggb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG1vbnRoIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBtb250aFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCBtb250aCBpcyAyOSBGZWJydWFyeSAyMDEyP1xuICogdmFyIHJlc3VsdCA9IGdldE1vbnRoKG5ldyBEYXRlKDIwMTIsIDEsIDI5KSlcbiAqIC8vPT4gMVxuICovXG5mdW5jdGlvbiBnZXRNb250aCAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgcmV0dXJuIG1vbnRoXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TW9udGhcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxudmFyIE1JTExJU0VDT05EU19JTl9EQVkgPSAyNCAqIDYwICogNjAgKiAxMDAwXG5cbi8qKlxuICogQGNhdGVnb3J5IFJhbmdlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGRheXMgdGhhdCBvdmVybGFwIGluIHR3byBkYXRlIHJhbmdlc1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgZGF5cyB0aGF0IG92ZXJsYXAgaW4gdHdvIGRhdGUgcmFuZ2VzXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGluaXRpYWxSYW5nZVN0YXJ0RGF0ZSAtIHRoZSBzdGFydCBvZiB0aGUgaW5pdGlhbCByYW5nZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGluaXRpYWxSYW5nZUVuZERhdGUgLSB0aGUgZW5kIG9mIHRoZSBpbml0aWFsIHJhbmdlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gY29tcGFyZWRSYW5nZVN0YXJ0RGF0ZSAtIHRoZSBzdGFydCBvZiB0aGUgcmFuZ2UgdG8gY29tcGFyZSBpdCB3aXRoXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gY29tcGFyZWRSYW5nZUVuZERhdGUgLSB0aGUgZW5kIG9mIHRoZSByYW5nZSB0byBjb21wYXJlIGl0IHdpdGhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgZGF5cyB0aGF0IG92ZXJsYXAgaW4gdHdvIGRhdGUgcmFuZ2VzXG4gKiBAdGhyb3dzIHtFcnJvcn0gc3RhcnREYXRlIG9mIGEgZGF0ZSByYW5nZSBjYW5ub3QgYmUgYWZ0ZXIgaXRzIGVuZERhdGVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIG92ZXJsYXBwaW5nIGRhdGUgcmFuZ2VzIGFkZHMgMSBmb3IgZWFjaCBzdGFydGVkIG92ZXJsYXBwaW5nIGRheTpcbiAqIGdldE92ZXJsYXBwaW5nRGF5c0luUmFuZ2VzKFxuICogICBuZXcgRGF0ZSgyMDE0LCAwLCAxMCksIG5ldyBEYXRlKDIwMTQsIDAsIDIwKSwgbmV3IERhdGUoMjAxNCwgMCwgMTcpLCBuZXcgRGF0ZSgyMDE0LCAwLCAyMSlcbiAqIClcbiAqIC8vPT4gM1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3Igbm9uLW92ZXJsYXBwaW5nIGRhdGUgcmFuZ2VzIHJldHVybnMgMDpcbiAqIGdldE92ZXJsYXBwaW5nRGF5c0luUmFuZ2VzKFxuICogICBuZXcgRGF0ZSgyMDE0LCAwLCAxMCksIG5ldyBEYXRlKDIwMTQsIDAsIDIwKSwgbmV3IERhdGUoMjAxNCwgMCwgMjEpLCBuZXcgRGF0ZSgyMDE0LCAwLCAyMilcbiAqIClcbiAqIC8vPT4gMFxuICovXG5mdW5jdGlvbiBnZXRPdmVybGFwcGluZ0RheXNJblJhbmdlcyAoZGlydHlJbml0aWFsUmFuZ2VTdGFydERhdGUsIGRpcnR5SW5pdGlhbFJhbmdlRW5kRGF0ZSwgZGlydHlDb21wYXJlZFJhbmdlU3RhcnREYXRlLCBkaXJ0eUNvbXBhcmVkUmFuZ2VFbmREYXRlKSB7XG4gIHZhciBpbml0aWFsU3RhcnRUaW1lID0gcGFyc2UoZGlydHlJbml0aWFsUmFuZ2VTdGFydERhdGUpLmdldFRpbWUoKVxuICB2YXIgaW5pdGlhbEVuZFRpbWUgPSBwYXJzZShkaXJ0eUluaXRpYWxSYW5nZUVuZERhdGUpLmdldFRpbWUoKVxuICB2YXIgY29tcGFyZWRTdGFydFRpbWUgPSBwYXJzZShkaXJ0eUNvbXBhcmVkUmFuZ2VTdGFydERhdGUpLmdldFRpbWUoKVxuICB2YXIgY29tcGFyZWRFbmRUaW1lID0gcGFyc2UoZGlydHlDb21wYXJlZFJhbmdlRW5kRGF0ZSkuZ2V0VGltZSgpXG5cbiAgaWYgKGluaXRpYWxTdGFydFRpbWUgPiBpbml0aWFsRW5kVGltZSB8fCBjb21wYXJlZFN0YXJ0VGltZSA+IGNvbXBhcmVkRW5kVGltZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIHN0YXJ0IG9mIHRoZSByYW5nZSBjYW5ub3QgYmUgYWZ0ZXIgdGhlIGVuZCBvZiB0aGUgcmFuZ2UnKVxuICB9XG5cbiAgdmFyIGlzT3ZlcmxhcHBpbmcgPSBpbml0aWFsU3RhcnRUaW1lIDwgY29tcGFyZWRFbmRUaW1lICYmIGNvbXBhcmVkU3RhcnRUaW1lIDwgaW5pdGlhbEVuZFRpbWVcblxuICBpZiAoIWlzT3ZlcmxhcHBpbmcpIHtcbiAgICByZXR1cm4gMFxuICB9XG5cbiAgdmFyIG92ZXJsYXBTdGFydERhdGUgPSBjb21wYXJlZFN0YXJ0VGltZSA8IGluaXRpYWxTdGFydFRpbWVcbiAgICA/IGluaXRpYWxTdGFydFRpbWVcbiAgICA6IGNvbXBhcmVkU3RhcnRUaW1lXG5cbiAgdmFyIG92ZXJsYXBFbmREYXRlID0gY29tcGFyZWRFbmRUaW1lID4gaW5pdGlhbEVuZFRpbWVcbiAgICA/IGluaXRpYWxFbmRUaW1lXG4gICAgOiBjb21wYXJlZEVuZFRpbWVcblxuICB2YXIgZGlmZmVyZW5jZUluTXMgPSBvdmVybGFwRW5kRGF0ZSAtIG92ZXJsYXBTdGFydERhdGVcblxuICByZXR1cm4gTWF0aC5jZWlsKGRpZmZlcmVuY2VJbk1zIC8gTUlMTElTRUNPTkRTX0lOX0RBWSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRPdmVybGFwcGluZ0RheXNJblJhbmdlc1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBRdWFydGVyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgeWVhciBxdWFydGVyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSB5ZWFyIHF1YXJ0ZXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZ2l2ZW4gZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIHF1YXJ0ZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggcXVhcnRlciBpcyAyIEp1bHkgMjAxND9cbiAqIHZhciByZXN1bHQgPSBnZXRRdWFydGVyKG5ldyBEYXRlKDIwMTQsIDYsIDIpKVxuICogLy89PiAzXG4gKi9cbmZ1bmN0aW9uIGdldFF1YXJ0ZXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIHF1YXJ0ZXIgPSBNYXRoLmZsb29yKGRhdGUuZ2V0TW9udGgoKSAvIDMpICsgMVxuICByZXR1cm4gcXVhcnRlclxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFF1YXJ0ZXJcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgU2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgc2Vjb25kcyBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgc2Vjb25kcyBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBnaXZlbiBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgc2Vjb25kc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBHZXQgdGhlIHNlY29uZHMgb2YgMjkgRmVicnVhcnkgMjAxMiAxMTo0NTowNS4xMjM6XG4gKiB2YXIgcmVzdWx0ID0gZ2V0U2Vjb25kcyhuZXcgRGF0ZSgyMDEyLCAxLCAyOSwgMTEsIDQ1LCA1LCAxMjMpKVxuICogLy89PiA1XG4gKi9cbmZ1bmN0aW9uIGdldFNlY29uZHMgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIHNlY29uZHMgPSBkYXRlLmdldFNlY29uZHMoKVxuICByZXR1cm4gc2Vjb25kc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlY29uZHNcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgVGltZXN0YW1wIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbWlsbGlzZWNvbmRzIHRpbWVzdGFtcCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbWlsbGlzZWNvbmRzIHRpbWVzdGFtcCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBnaXZlbiBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgdGltZXN0YW1wXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEdldCB0aGUgdGltZXN0YW1wIG9mIDI5IEZlYnJ1YXJ5IDIwMTIgMTE6NDU6MDUuMTIzOlxuICogdmFyIHJlc3VsdCA9IGdldFRpbWUobmV3IERhdGUoMjAxMiwgMSwgMjksIDExLCA0NSwgNSwgMTIzKSlcbiAqIC8vPT4gMTMzMDUxNTkwNTEyM1xuICovXG5mdW5jdGlvbiBnZXRUaW1lIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciB0aW1lc3RhbXAgPSBkYXRlLmdldFRpbWUoKVxuICByZXR1cm4gdGltZXN0YW1wXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VGltZVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBnaXZlbiBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCB5ZWFyIGlzIDIgSnVseSAyMDE0P1xuICogdmFyIHJlc3VsdCA9IGdldFllYXIobmV3IERhdGUoMjAxNCwgNiwgMikpXG4gKiAvLz0+IDIwMTRcbiAqL1xuZnVuY3Rpb24gZ2V0WWVhciAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICByZXR1cm4geWVhclxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFllYXJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGREYXlzOiByZXF1aXJlKCcuL2FkZF9kYXlzL2luZGV4LmpzJyksXG4gIGFkZEhvdXJzOiByZXF1aXJlKCcuL2FkZF9ob3Vycy9pbmRleC5qcycpLFxuICBhZGRJU09ZZWFyczogcmVxdWlyZSgnLi9hZGRfaXNvX3llYXJzL2luZGV4LmpzJyksXG4gIGFkZE1pbGxpc2Vjb25kczogcmVxdWlyZSgnLi9hZGRfbWlsbGlzZWNvbmRzL2luZGV4LmpzJyksXG4gIGFkZE1pbnV0ZXM6IHJlcXVpcmUoJy4vYWRkX21pbnV0ZXMvaW5kZXguanMnKSxcbiAgYWRkTW9udGhzOiByZXF1aXJlKCcuL2FkZF9tb250aHMvaW5kZXguanMnKSxcbiAgYWRkUXVhcnRlcnM6IHJlcXVpcmUoJy4vYWRkX3F1YXJ0ZXJzL2luZGV4LmpzJyksXG4gIGFkZFNlY29uZHM6IHJlcXVpcmUoJy4vYWRkX3NlY29uZHMvaW5kZXguanMnKSxcbiAgYWRkV2Vla3M6IHJlcXVpcmUoJy4vYWRkX3dlZWtzL2luZGV4LmpzJyksXG4gIGFkZFllYXJzOiByZXF1aXJlKCcuL2FkZF95ZWFycy9pbmRleC5qcycpLFxuICBhcmVSYW5nZXNPdmVybGFwcGluZzogcmVxdWlyZSgnLi9hcmVfcmFuZ2VzX292ZXJsYXBwaW5nL2luZGV4LmpzJyksXG4gIGNsb3Nlc3RJbmRleFRvOiByZXF1aXJlKCcuL2Nsb3Nlc3RfaW5kZXhfdG8vaW5kZXguanMnKSxcbiAgY2xvc2VzdFRvOiByZXF1aXJlKCcuL2Nsb3Nlc3RfdG8vaW5kZXguanMnKSxcbiAgY29tcGFyZUFzYzogcmVxdWlyZSgnLi9jb21wYXJlX2FzYy9pbmRleC5qcycpLFxuICBjb21wYXJlRGVzYzogcmVxdWlyZSgnLi9jb21wYXJlX2Rlc2MvaW5kZXguanMnKSxcbiAgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzOiByZXF1aXJlKCcuL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfZGF5cy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5DYWxlbmRhcklTT1dlZWtzOiByZXF1aXJlKCcuL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfaXNvX3dlZWtzL2luZGV4LmpzJyksXG4gIGRpZmZlcmVuY2VJbkNhbGVuZGFySVNPWWVhcnM6IHJlcXVpcmUoJy4vZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl9pc29feWVhcnMvaW5kZXguanMnKSxcbiAgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHM6IHJlcXVpcmUoJy4vZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl9tb250aHMvaW5kZXguanMnKSxcbiAgZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVyczogcmVxdWlyZSgnLi9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX3F1YXJ0ZXJzL2luZGV4LmpzJyksXG4gIGRpZmZlcmVuY2VJbkNhbGVuZGFyV2Vla3M6IHJlcXVpcmUoJy4vZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl93ZWVrcy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzOiByZXF1aXJlKCcuL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfeWVhcnMvaW5kZXguanMnKSxcbiAgZGlmZmVyZW5jZUluRGF5czogcmVxdWlyZSgnLi9kaWZmZXJlbmNlX2luX2RheXMvaW5kZXguanMnKSxcbiAgZGlmZmVyZW5jZUluSG91cnM6IHJlcXVpcmUoJy4vZGlmZmVyZW5jZV9pbl9ob3Vycy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5JU09ZZWFyczogcmVxdWlyZSgnLi9kaWZmZXJlbmNlX2luX2lzb195ZWFycy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHM6IHJlcXVpcmUoJy4vZGlmZmVyZW5jZV9pbl9taWxsaXNlY29uZHMvaW5kZXguanMnKSxcbiAgZGlmZmVyZW5jZUluTWludXRlczogcmVxdWlyZSgnLi9kaWZmZXJlbmNlX2luX21pbnV0ZXMvaW5kZXguanMnKSxcbiAgZGlmZmVyZW5jZUluTW9udGhzOiByZXF1aXJlKCcuL2RpZmZlcmVuY2VfaW5fbW9udGhzL2luZGV4LmpzJyksXG4gIGRpZmZlcmVuY2VJblF1YXJ0ZXJzOiByZXF1aXJlKCcuL2RpZmZlcmVuY2VfaW5fcXVhcnRlcnMvaW5kZXguanMnKSxcbiAgZGlmZmVyZW5jZUluU2Vjb25kczogcmVxdWlyZSgnLi9kaWZmZXJlbmNlX2luX3NlY29uZHMvaW5kZXguanMnKSxcbiAgZGlmZmVyZW5jZUluV2Vla3M6IHJlcXVpcmUoJy4vZGlmZmVyZW5jZV9pbl93ZWVrcy9pbmRleC5qcycpLFxuICBkaWZmZXJlbmNlSW5ZZWFyczogcmVxdWlyZSgnLi9kaWZmZXJlbmNlX2luX3llYXJzL2luZGV4LmpzJyksXG4gIGRpc3RhbmNlSW5Xb3JkczogcmVxdWlyZSgnLi9kaXN0YW5jZV9pbl93b3Jkcy9pbmRleC5qcycpLFxuICBkaXN0YW5jZUluV29yZHNTdHJpY3Q6IHJlcXVpcmUoJy4vZGlzdGFuY2VfaW5fd29yZHNfc3RyaWN0L2luZGV4LmpzJyksXG4gIGRpc3RhbmNlSW5Xb3Jkc1RvTm93OiByZXF1aXJlKCcuL2Rpc3RhbmNlX2luX3dvcmRzX3RvX25vdy9pbmRleC5qcycpLFxuICBlYWNoRGF5OiByZXF1aXJlKCcuL2VhY2hfZGF5L2luZGV4LmpzJyksXG4gIGVuZE9mRGF5OiByZXF1aXJlKCcuL2VuZF9vZl9kYXkvaW5kZXguanMnKSxcbiAgZW5kT2ZIb3VyOiByZXF1aXJlKCcuL2VuZF9vZl9ob3VyL2luZGV4LmpzJyksXG4gIGVuZE9mSVNPV2VlazogcmVxdWlyZSgnLi9lbmRfb2ZfaXNvX3dlZWsvaW5kZXguanMnKSxcbiAgZW5kT2ZJU09ZZWFyOiByZXF1aXJlKCcuL2VuZF9vZl9pc29feWVhci9pbmRleC5qcycpLFxuICBlbmRPZk1pbnV0ZTogcmVxdWlyZSgnLi9lbmRfb2ZfbWludXRlL2luZGV4LmpzJyksXG4gIGVuZE9mTW9udGg6IHJlcXVpcmUoJy4vZW5kX29mX21vbnRoL2luZGV4LmpzJyksXG4gIGVuZE9mUXVhcnRlcjogcmVxdWlyZSgnLi9lbmRfb2ZfcXVhcnRlci9pbmRleC5qcycpLFxuICBlbmRPZlNlY29uZDogcmVxdWlyZSgnLi9lbmRfb2Zfc2Vjb25kL2luZGV4LmpzJyksXG4gIGVuZE9mVG9kYXk6IHJlcXVpcmUoJy4vZW5kX29mX3RvZGF5L2luZGV4LmpzJyksXG4gIGVuZE9mVG9tb3Jyb3c6IHJlcXVpcmUoJy4vZW5kX29mX3RvbW9ycm93L2luZGV4LmpzJyksXG4gIGVuZE9mV2VlazogcmVxdWlyZSgnLi9lbmRfb2Zfd2Vlay9pbmRleC5qcycpLFxuICBlbmRPZlllYXI6IHJlcXVpcmUoJy4vZW5kX29mX3llYXIvaW5kZXguanMnKSxcbiAgZW5kT2ZZZXN0ZXJkYXk6IHJlcXVpcmUoJy4vZW5kX29mX3llc3RlcmRheS9pbmRleC5qcycpLFxuICBmb3JtYXQ6IHJlcXVpcmUoJy4vZm9ybWF0L2luZGV4LmpzJyksXG4gIGdldERhdGU6IHJlcXVpcmUoJy4vZ2V0X2RhdGUvaW5kZXguanMnKSxcbiAgZ2V0RGF5OiByZXF1aXJlKCcuL2dldF9kYXkvaW5kZXguanMnKSxcbiAgZ2V0RGF5T2ZZZWFyOiByZXF1aXJlKCcuL2dldF9kYXlfb2ZfeWVhci9pbmRleC5qcycpLFxuICBnZXREYXlzSW5Nb250aDogcmVxdWlyZSgnLi9nZXRfZGF5c19pbl9tb250aC9pbmRleC5qcycpLFxuICBnZXREYXlzSW5ZZWFyOiByZXF1aXJlKCcuL2dldF9kYXlzX2luX3llYXIvaW5kZXguanMnKSxcbiAgZ2V0SG91cnM6IHJlcXVpcmUoJy4vZ2V0X2hvdXJzL2luZGV4LmpzJyksXG4gIGdldElTT0RheTogcmVxdWlyZSgnLi9nZXRfaXNvX2RheS9pbmRleC5qcycpLFxuICBnZXRJU09XZWVrOiByZXF1aXJlKCcuL2dldF9pc29fd2Vlay9pbmRleC5qcycpLFxuICBnZXRJU09XZWVrc0luWWVhcjogcmVxdWlyZSgnLi9nZXRfaXNvX3dlZWtzX2luX3llYXIvaW5kZXguanMnKSxcbiAgZ2V0SVNPWWVhcjogcmVxdWlyZSgnLi9nZXRfaXNvX3llYXIvaW5kZXguanMnKSxcbiAgZ2V0TWlsbGlzZWNvbmRzOiByZXF1aXJlKCcuL2dldF9taWxsaXNlY29uZHMvaW5kZXguanMnKSxcbiAgZ2V0TWludXRlczogcmVxdWlyZSgnLi9nZXRfbWludXRlcy9pbmRleC5qcycpLFxuICBnZXRNb250aDogcmVxdWlyZSgnLi9nZXRfbW9udGgvaW5kZXguanMnKSxcbiAgZ2V0T3ZlcmxhcHBpbmdEYXlzSW5SYW5nZXM6IHJlcXVpcmUoJy4vZ2V0X292ZXJsYXBwaW5nX2RheXNfaW5fcmFuZ2VzL2luZGV4LmpzJyksXG4gIGdldFF1YXJ0ZXI6IHJlcXVpcmUoJy4vZ2V0X3F1YXJ0ZXIvaW5kZXguanMnKSxcbiAgZ2V0U2Vjb25kczogcmVxdWlyZSgnLi9nZXRfc2Vjb25kcy9pbmRleC5qcycpLFxuICBnZXRUaW1lOiByZXF1aXJlKCcuL2dldF90aW1lL2luZGV4LmpzJyksXG4gIGdldFllYXI6IHJlcXVpcmUoJy4vZ2V0X3llYXIvaW5kZXguanMnKSxcbiAgaXNBZnRlcjogcmVxdWlyZSgnLi9pc19hZnRlci9pbmRleC5qcycpLFxuICBpc0JlZm9yZTogcmVxdWlyZSgnLi9pc19iZWZvcmUvaW5kZXguanMnKSxcbiAgaXNEYXRlOiByZXF1aXJlKCcuL2lzX2RhdGUvaW5kZXguanMnKSxcbiAgaXNFcXVhbDogcmVxdWlyZSgnLi9pc19lcXVhbC9pbmRleC5qcycpLFxuICBpc0ZpcnN0RGF5T2ZNb250aDogcmVxdWlyZSgnLi9pc19maXJzdF9kYXlfb2ZfbW9udGgvaW5kZXguanMnKSxcbiAgaXNGcmlkYXk6IHJlcXVpcmUoJy4vaXNfZnJpZGF5L2luZGV4LmpzJyksXG4gIGlzRnV0dXJlOiByZXF1aXJlKCcuL2lzX2Z1dHVyZS9pbmRleC5qcycpLFxuICBpc0xhc3REYXlPZk1vbnRoOiByZXF1aXJlKCcuL2lzX2xhc3RfZGF5X29mX21vbnRoL2luZGV4LmpzJyksXG4gIGlzTGVhcFllYXI6IHJlcXVpcmUoJy4vaXNfbGVhcF95ZWFyL2luZGV4LmpzJyksXG4gIGlzTW9uZGF5OiByZXF1aXJlKCcuL2lzX21vbmRheS9pbmRleC5qcycpLFxuICBpc1Bhc3Q6IHJlcXVpcmUoJy4vaXNfcGFzdC9pbmRleC5qcycpLFxuICBpc1NhbWVEYXk6IHJlcXVpcmUoJy4vaXNfc2FtZV9kYXkvaW5kZXguanMnKSxcbiAgaXNTYW1lSG91cjogcmVxdWlyZSgnLi9pc19zYW1lX2hvdXIvaW5kZXguanMnKSxcbiAgaXNTYW1lSVNPV2VlazogcmVxdWlyZSgnLi9pc19zYW1lX2lzb193ZWVrL2luZGV4LmpzJyksXG4gIGlzU2FtZUlTT1llYXI6IHJlcXVpcmUoJy4vaXNfc2FtZV9pc29feWVhci9pbmRleC5qcycpLFxuICBpc1NhbWVNaW51dGU6IHJlcXVpcmUoJy4vaXNfc2FtZV9taW51dGUvaW5kZXguanMnKSxcbiAgaXNTYW1lTW9udGg6IHJlcXVpcmUoJy4vaXNfc2FtZV9tb250aC9pbmRleC5qcycpLFxuICBpc1NhbWVRdWFydGVyOiByZXF1aXJlKCcuL2lzX3NhbWVfcXVhcnRlci9pbmRleC5qcycpLFxuICBpc1NhbWVTZWNvbmQ6IHJlcXVpcmUoJy4vaXNfc2FtZV9zZWNvbmQvaW5kZXguanMnKSxcbiAgaXNTYW1lV2VlazogcmVxdWlyZSgnLi9pc19zYW1lX3dlZWsvaW5kZXguanMnKSxcbiAgaXNTYW1lWWVhcjogcmVxdWlyZSgnLi9pc19zYW1lX3llYXIvaW5kZXguanMnKSxcbiAgaXNTYXR1cmRheTogcmVxdWlyZSgnLi9pc19zYXR1cmRheS9pbmRleC5qcycpLFxuICBpc1N1bmRheTogcmVxdWlyZSgnLi9pc19zdW5kYXkvaW5kZXguanMnKSxcbiAgaXNUaGlzSG91cjogcmVxdWlyZSgnLi9pc190aGlzX2hvdXIvaW5kZXguanMnKSxcbiAgaXNUaGlzSVNPV2VlazogcmVxdWlyZSgnLi9pc190aGlzX2lzb193ZWVrL2luZGV4LmpzJyksXG4gIGlzVGhpc0lTT1llYXI6IHJlcXVpcmUoJy4vaXNfdGhpc19pc29feWVhci9pbmRleC5qcycpLFxuICBpc1RoaXNNaW51dGU6IHJlcXVpcmUoJy4vaXNfdGhpc19taW51dGUvaW5kZXguanMnKSxcbiAgaXNUaGlzTW9udGg6IHJlcXVpcmUoJy4vaXNfdGhpc19tb250aC9pbmRleC5qcycpLFxuICBpc1RoaXNRdWFydGVyOiByZXF1aXJlKCcuL2lzX3RoaXNfcXVhcnRlci9pbmRleC5qcycpLFxuICBpc1RoaXNTZWNvbmQ6IHJlcXVpcmUoJy4vaXNfdGhpc19zZWNvbmQvaW5kZXguanMnKSxcbiAgaXNUaGlzV2VlazogcmVxdWlyZSgnLi9pc190aGlzX3dlZWsvaW5kZXguanMnKSxcbiAgaXNUaGlzWWVhcjogcmVxdWlyZSgnLi9pc190aGlzX3llYXIvaW5kZXguanMnKSxcbiAgaXNUaHVyc2RheTogcmVxdWlyZSgnLi9pc190aHVyc2RheS9pbmRleC5qcycpLFxuICBpc1RvZGF5OiByZXF1aXJlKCcuL2lzX3RvZGF5L2luZGV4LmpzJyksXG4gIGlzVG9tb3Jyb3c6IHJlcXVpcmUoJy4vaXNfdG9tb3Jyb3cvaW5kZXguanMnKSxcbiAgaXNUdWVzZGF5OiByZXF1aXJlKCcuL2lzX3R1ZXNkYXkvaW5kZXguanMnKSxcbiAgaXNWYWxpZDogcmVxdWlyZSgnLi9pc192YWxpZC9pbmRleC5qcycpLFxuICBpc1dlZG5lc2RheTogcmVxdWlyZSgnLi9pc193ZWRuZXNkYXkvaW5kZXguanMnKSxcbiAgaXNXZWVrZW5kOiByZXF1aXJlKCcuL2lzX3dlZWtlbmQvaW5kZXguanMnKSxcbiAgaXNXaXRoaW5SYW5nZTogcmVxdWlyZSgnLi9pc193aXRoaW5fcmFuZ2UvaW5kZXguanMnKSxcbiAgaXNZZXN0ZXJkYXk6IHJlcXVpcmUoJy4vaXNfeWVzdGVyZGF5L2luZGV4LmpzJyksXG4gIGxhc3REYXlPZklTT1dlZWs6IHJlcXVpcmUoJy4vbGFzdF9kYXlfb2ZfaXNvX3dlZWsvaW5kZXguanMnKSxcbiAgbGFzdERheU9mSVNPWWVhcjogcmVxdWlyZSgnLi9sYXN0X2RheV9vZl9pc29feWVhci9pbmRleC5qcycpLFxuICBsYXN0RGF5T2ZNb250aDogcmVxdWlyZSgnLi9sYXN0X2RheV9vZl9tb250aC9pbmRleC5qcycpLFxuICBsYXN0RGF5T2ZRdWFydGVyOiByZXF1aXJlKCcuL2xhc3RfZGF5X29mX3F1YXJ0ZXIvaW5kZXguanMnKSxcbiAgbGFzdERheU9mV2VlazogcmVxdWlyZSgnLi9sYXN0X2RheV9vZl93ZWVrL2luZGV4LmpzJyksXG4gIGxhc3REYXlPZlllYXI6IHJlcXVpcmUoJy4vbGFzdF9kYXlfb2ZfeWVhci9pbmRleC5qcycpLFxuICBtYXg6IHJlcXVpcmUoJy4vbWF4L2luZGV4LmpzJyksXG4gIG1pbjogcmVxdWlyZSgnLi9taW4vaW5kZXguanMnKSxcbiAgcGFyc2U6IHJlcXVpcmUoJy4vcGFyc2UvaW5kZXguanMnKSxcbiAgc2V0RGF0ZTogcmVxdWlyZSgnLi9zZXRfZGF0ZS9pbmRleC5qcycpLFxuICBzZXREYXk6IHJlcXVpcmUoJy4vc2V0X2RheS9pbmRleC5qcycpLFxuICBzZXREYXlPZlllYXI6IHJlcXVpcmUoJy4vc2V0X2RheV9vZl95ZWFyL2luZGV4LmpzJyksXG4gIHNldEhvdXJzOiByZXF1aXJlKCcuL3NldF9ob3Vycy9pbmRleC5qcycpLFxuICBzZXRJU09EYXk6IHJlcXVpcmUoJy4vc2V0X2lzb19kYXkvaW5kZXguanMnKSxcbiAgc2V0SVNPV2VlazogcmVxdWlyZSgnLi9zZXRfaXNvX3dlZWsvaW5kZXguanMnKSxcbiAgc2V0SVNPWWVhcjogcmVxdWlyZSgnLi9zZXRfaXNvX3llYXIvaW5kZXguanMnKSxcbiAgc2V0TWlsbGlzZWNvbmRzOiByZXF1aXJlKCcuL3NldF9taWxsaXNlY29uZHMvaW5kZXguanMnKSxcbiAgc2V0TWludXRlczogcmVxdWlyZSgnLi9zZXRfbWludXRlcy9pbmRleC5qcycpLFxuICBzZXRNb250aDogcmVxdWlyZSgnLi9zZXRfbW9udGgvaW5kZXguanMnKSxcbiAgc2V0UXVhcnRlcjogcmVxdWlyZSgnLi9zZXRfcXVhcnRlci9pbmRleC5qcycpLFxuICBzZXRTZWNvbmRzOiByZXF1aXJlKCcuL3NldF9zZWNvbmRzL2luZGV4LmpzJyksXG4gIHNldFllYXI6IHJlcXVpcmUoJy4vc2V0X3llYXIvaW5kZXguanMnKSxcbiAgc3RhcnRPZkRheTogcmVxdWlyZSgnLi9zdGFydF9vZl9kYXkvaW5kZXguanMnKSxcbiAgc3RhcnRPZkhvdXI6IHJlcXVpcmUoJy4vc3RhcnRfb2ZfaG91ci9pbmRleC5qcycpLFxuICBzdGFydE9mSVNPV2VlazogcmVxdWlyZSgnLi9zdGFydF9vZl9pc29fd2Vlay9pbmRleC5qcycpLFxuICBzdGFydE9mSVNPWWVhcjogcmVxdWlyZSgnLi9zdGFydF9vZl9pc29feWVhci9pbmRleC5qcycpLFxuICBzdGFydE9mTWludXRlOiByZXF1aXJlKCcuL3N0YXJ0X29mX21pbnV0ZS9pbmRleC5qcycpLFxuICBzdGFydE9mTW9udGg6IHJlcXVpcmUoJy4vc3RhcnRfb2ZfbW9udGgvaW5kZXguanMnKSxcbiAgc3RhcnRPZlF1YXJ0ZXI6IHJlcXVpcmUoJy4vc3RhcnRfb2ZfcXVhcnRlci9pbmRleC5qcycpLFxuICBzdGFydE9mU2Vjb25kOiByZXF1aXJlKCcuL3N0YXJ0X29mX3NlY29uZC9pbmRleC5qcycpLFxuICBzdGFydE9mVG9kYXk6IHJlcXVpcmUoJy4vc3RhcnRfb2ZfdG9kYXkvaW5kZXguanMnKSxcbiAgc3RhcnRPZlRvbW9ycm93OiByZXF1aXJlKCcuL3N0YXJ0X29mX3RvbW9ycm93L2luZGV4LmpzJyksXG4gIHN0YXJ0T2ZXZWVrOiByZXF1aXJlKCcuL3N0YXJ0X29mX3dlZWsvaW5kZXguanMnKSxcbiAgc3RhcnRPZlllYXI6IHJlcXVpcmUoJy4vc3RhcnRfb2ZfeWVhci9pbmRleC5qcycpLFxuICBzdGFydE9mWWVzdGVyZGF5OiByZXF1aXJlKCcuL3N0YXJ0X29mX3llc3RlcmRheS9pbmRleC5qcycpLFxuICBzdWJEYXlzOiByZXF1aXJlKCcuL3N1Yl9kYXlzL2luZGV4LmpzJyksXG4gIHN1YkhvdXJzOiByZXF1aXJlKCcuL3N1Yl9ob3Vycy9pbmRleC5qcycpLFxuICBzdWJJU09ZZWFyczogcmVxdWlyZSgnLi9zdWJfaXNvX3llYXJzL2luZGV4LmpzJyksXG4gIHN1Yk1pbGxpc2Vjb25kczogcmVxdWlyZSgnLi9zdWJfbWlsbGlzZWNvbmRzL2luZGV4LmpzJyksXG4gIHN1Yk1pbnV0ZXM6IHJlcXVpcmUoJy4vc3ViX21pbnV0ZXMvaW5kZXguanMnKSxcbiAgc3ViTW9udGhzOiByZXF1aXJlKCcuL3N1Yl9tb250aHMvaW5kZXguanMnKSxcbiAgc3ViUXVhcnRlcnM6IHJlcXVpcmUoJy4vc3ViX3F1YXJ0ZXJzL2luZGV4LmpzJyksXG4gIHN1YlNlY29uZHM6IHJlcXVpcmUoJy4vc3ViX3NlY29uZHMvaW5kZXguanMnKSxcbiAgc3ViV2Vla3M6IHJlcXVpcmUoJy4vc3ViX3dlZWtzL2luZGV4LmpzJyksXG4gIHN1YlllYXJzOiByZXF1aXJlKCcuL3N1Yl95ZWFycy9pbmRleC5qcycpXG59XG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZmlyc3QgZGF0ZSBhZnRlciB0aGUgc2Vjb25kIG9uZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBmaXJzdCBkYXRlIGFmdGVyIHRoZSBzZWNvbmQgb25lP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdGhhdCBzaG91bGQgYmUgYWZ0ZXIgdGhlIG90aGVyIG9uZSB0byByZXR1cm4gdHJ1ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVUb0NvbXBhcmUgLSB0aGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZmlyc3QgZGF0ZSBpcyBhZnRlciB0aGUgc2Vjb25kIGRhdGVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSXMgMTAgSnVseSAxOTg5IGFmdGVyIDExIEZlYnJ1YXJ5IDE5ODc/XG4gKiB2YXIgcmVzdWx0ID0gaXNBZnRlcihuZXcgRGF0ZSgxOTg5LCA2LCAxMCksIG5ldyBEYXRlKDE5ODcsIDEsIDExKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc0FmdGVyIChkaXJ0eURhdGUsIGRpcnR5RGF0ZVRvQ29tcGFyZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGRhdGVUb0NvbXBhcmUgPSBwYXJzZShkaXJ0eURhdGVUb0NvbXBhcmUpXG4gIHJldHVybiBkYXRlLmdldFRpbWUoKSA+IGRhdGVUb0NvbXBhcmUuZ2V0VGltZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBZnRlclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGZpcnN0IGRhdGUgYmVmb3JlIHRoZSBzZWNvbmQgb25lP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGZpcnN0IGRhdGUgYmVmb3JlIHRoZSBzZWNvbmQgb25lP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdGhhdCBzaG91bGQgYmUgYmVmb3JlIHRoZSBvdGhlciBvbmUgdG8gcmV0dXJuIHRydWVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlVG9Db21wYXJlIC0gdGhlIGRhdGUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGZpcnN0IGRhdGUgaXMgYmVmb3JlIHRoZSBzZWNvbmQgZGF0ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJcyAxMCBKdWx5IDE5ODkgYmVmb3JlIDExIEZlYnJ1YXJ5IDE5ODc/XG4gKiB2YXIgcmVzdWx0ID0gaXNCZWZvcmUobmV3IERhdGUoMTk4OSwgNiwgMTApLCBuZXcgRGF0ZSgxOTg3LCAxLCAxMSkpXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmVmb3JlIChkaXJ0eURhdGUsIGRpcnR5RGF0ZVRvQ29tcGFyZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGRhdGVUb0NvbXBhcmUgPSBwYXJzZShkaXJ0eURhdGVUb0NvbXBhcmUpXG4gIHJldHVybiBkYXRlLmdldFRpbWUoKSA8IGRhdGVUb0NvbXBhcmUuZ2V0VGltZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNCZWZvcmVcbiIsIi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gYXJndW1lbnQgYW4gaW5zdGFuY2Ugb2YgRGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBhcmd1bWVudCBhbiBpbnN0YW5jZSBvZiBEYXRlP1xuICpcbiAqIEBwYXJhbSB7Kn0gYXJndW1lbnQgLSB0aGUgYXJndW1lbnQgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJcyAnbWF5b25uYWlzZScgYSBEYXRlP1xuICogdmFyIHJlc3VsdCA9IGlzRGF0ZSgnbWF5b25uYWlzZScpXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRGF0ZVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQXJlIHRoZSBnaXZlbiBkYXRlcyBlcXVhbD9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgZXF1YWw/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGVzIGFyZSBlcXVhbFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgMiBKdWx5IDIwMTQgMDY6MzA6NDUuMDAwIGFuZCAyIEp1bHkgMjAxNCAwNjozMDo0NS41MDAgZXF1YWw/XG4gKiB2YXIgcmVzdWx0ID0gaXNFcXVhbChcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgMiwgNiwgMzAsIDQ1LCAwKVxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCA2LCAzMCwgNDUsIDUwMClcbiAqIClcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNFcXVhbCAoZGlydHlMZWZ0RGF0ZSwgZGlydHlSaWdodERhdGUpIHtcbiAgdmFyIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlMZWZ0RGF0ZSlcbiAgdmFyIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5UmlnaHREYXRlKVxuICByZXR1cm4gZGF0ZUxlZnQuZ2V0VGltZSgpID09PSBkYXRlUmlnaHQuZ2V0VGltZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFcXVhbFxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB0aGUgZmlyc3QgZGF5IG9mIGEgbW9udGg/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSB0aGUgZmlyc3QgZGF5IG9mIGEgbW9udGg/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIHRoZSBmaXJzdCBkYXkgb2YgYSBtb250aFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJcyAxIFNlcHRlbWJlciAyMDE0IHRoZSBmaXJzdCBkYXkgb2YgYSBtb250aD9cbiAqIHZhciByZXN1bHQgPSBpc0ZpcnN0RGF5T2ZNb250aChuZXcgRGF0ZSgyMDE0LCA4LCAxKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc0ZpcnN0RGF5T2ZNb250aCAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBwYXJzZShkaXJ0eURhdGUpLmdldERhdGUoKSA9PT0gMVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRmlyc3REYXlPZk1vbnRoXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWtkYXkgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgRnJpZGF5P1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgRnJpZGF5P1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBGcmlkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSXMgMjYgU2VwdGVtYmVyIDIwMTQgRnJpZGF5P1xuICogdmFyIHJlc3VsdCA9IGlzRnJpZGF5KG5ldyBEYXRlKDIwMTQsIDgsIDI2KSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc0ZyaWRheSAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBwYXJzZShkaXJ0eURhdGUpLmdldERheSgpID09PSA1XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGcmlkYXlcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBmdXR1cmU/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgZnV0dXJlP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBpbiB0aGUgZnV0dXJlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDYgT2N0b2JlciAyMDE0LCBpcyAzMSBEZWNlbWJlciAyMDE0IGluIHRoZSBmdXR1cmU/XG4gKiB2YXIgcmVzdWx0ID0gaXNGdXR1cmUobmV3IERhdGUoMjAxNCwgMTEsIDMxKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc0Z1dHVyZSAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBwYXJzZShkaXJ0eURhdGUpLmdldFRpbWUoKSA+IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdXR1cmVcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBlbmRPZkRheSA9IHJlcXVpcmUoJy4uL2VuZF9vZl9kYXkvaW5kZXguanMnKVxudmFyIGVuZE9mTW9udGggPSByZXF1aXJlKCcuLi9lbmRfb2ZfbW9udGgvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB0aGUgbGFzdCBkYXkgb2YgYSBtb250aD9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIHRoZSBsYXN0IGRheSBvZiBhIG1vbnRoP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyB0aGUgbGFzdCBkYXkgb2YgYSBtb250aFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJcyAyOCBGZWJydWFyeSAyMDE0IHRoZSBsYXN0IGRheSBvZiBhIG1vbnRoP1xuICogdmFyIHJlc3VsdCA9IGlzTGFzdERheU9mTW9udGgobmV3IERhdGUoMjAxNCwgMSwgMjgpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzTGFzdERheU9mTW9udGggKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgcmV0dXJuIGVuZE9mRGF5KGRhdGUpLmdldFRpbWUoKSA9PT0gZW5kT2ZNb250aChkYXRlKS5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xhc3REYXlPZk1vbnRoXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIGxlYXAgeWVhcj9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBsZWFwIHllYXI/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIGluIHRoZSBsZWFwIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSXMgMSBTZXB0ZW1iZXIgMjAxMiBpbiB0aGUgbGVhcCB5ZWFyP1xuICogdmFyIHJlc3VsdCA9IGlzTGVhcFllYXIobmV3IERhdGUoMjAxMiwgOCwgMSkpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNMZWFwWWVhciAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICByZXR1cm4geWVhciAlIDQwMCA9PT0gMCB8fCB5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZWFwWWVhclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrZGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIE1vbmRheT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIE1vbmRheT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgTW9uZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElzIDIyIFNlcHRlbWJlciAyMDE0IE1vbmRheT9cbiAqIHZhciByZXN1bHQgPSBpc01vbmRheShuZXcgRGF0ZSgyMDE0LCA4LCAyMikpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNNb25kYXkgKGRpcnR5RGF0ZSkge1xuICByZXR1cm4gcGFyc2UoZGlydHlEYXRlKS5nZXREYXkoKSA9PT0gMVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTW9uZGF5XG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgcGFzdD9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBwYXN0P1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBpbiB0aGUgcGFzdFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyA2IE9jdG9iZXIgMjAxNCwgaXMgMiBKdWx5IDIwMTQgaW4gdGhlIHBhc3Q/XG4gKiB2YXIgcmVzdWx0ID0gaXNQYXN0KG5ldyBEYXRlKDIwMTQsIDYsIDIpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGFzdCAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBwYXJzZShkaXJ0eURhdGUpLmdldFRpbWUoKSA8IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQYXN0XG4iLCJ2YXIgc3RhcnRPZkRheSA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX2RheS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIGRheT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgZGF5P1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSBkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyIDA2OjAwOjAwIGFuZCA0IFNlcHRlbWJlciAxODowMDowMCBpbiB0aGUgc2FtZSBkYXk/XG4gKiB2YXIgcmVzdWx0ID0gaXNTYW1lRGF5KFxuICogICBuZXcgRGF0ZSgyMDE0LCA4LCA0LCA2LCAwKSxcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgNCwgMTgsIDApXG4gKiApXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNTYW1lRGF5IChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnRTdGFydE9mRGF5ID0gc3RhcnRPZkRheShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgZGF0ZVJpZ2h0U3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkoZGlydHlEYXRlUmlnaHQpXG5cbiAgcmV0dXJuIGRhdGVMZWZ0U3RhcnRPZkRheS5nZXRUaW1lKCkgPT09IGRhdGVSaWdodFN0YXJ0T2ZEYXkuZ2V0VGltZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTYW1lRGF5XG4iLCJ2YXIgc3RhcnRPZkhvdXIgPSByZXF1aXJlKCcuLi9zdGFydF9vZl9ob3VyL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSG91ciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIGhvdXI/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIGhvdXI/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZXMgYXJlIGluIHRoZSBzYW1lIGhvdXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyIDIwMTQgMDY6MDA6MDAgYW5kIDQgU2VwdGVtYmVyIDA2OjMwOjAwIGluIHRoZSBzYW1lIGhvdXI/XG4gKiB2YXIgcmVzdWx0ID0gaXNTYW1lSG91cihcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgNCwgNiwgMCksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDQsIDYsIDMwKVxuICogKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzU2FtZUhvdXIgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkYXRlTGVmdFN0YXJ0T2ZIb3VyID0gc3RhcnRPZkhvdXIoZGlydHlEYXRlTGVmdClcbiAgdmFyIGRhdGVSaWdodFN0YXJ0T2ZIb3VyID0gc3RhcnRPZkhvdXIoZGlydHlEYXRlUmlnaHQpXG5cbiAgcmV0dXJuIGRhdGVMZWZ0U3RhcnRPZkhvdXIuZ2V0VGltZSgpID09PSBkYXRlUmlnaHRTdGFydE9mSG91ci5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1NhbWVIb3VyXG4iLCJ2YXIgaXNTYW1lV2VlayA9IHJlcXVpcmUoJy4uL2lzX3NhbWVfd2Vlay9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IElTTyBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgSVNPIHdlZWs/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIElTTyB3ZWVrP1xuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgSVNPIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDEgU2VwdGVtYmVyIDIwMTQgYW5kIDcgU2VwdGVtYmVyIDIwMTQgaW4gdGhlIHNhbWUgSVNPIHdlZWs/XG4gKiB2YXIgcmVzdWx0ID0gaXNTYW1lSVNPV2VlayhcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDcpXG4gKiApXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNTYW1lSVNPV2VlayAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgcmV0dXJuIGlzU2FtZVdlZWsoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQsIHt3ZWVrU3RhcnRzT246IDF9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2FtZUlTT1dlZWtcbiIsInZhciBzdGFydE9mSVNPWWVhciA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX2lzb195ZWFyL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWstTnVtYmVyaW5nIFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhcj9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXI/XG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgMjkgRGVjZW1iZXIgMjAwMyBhbmQgMiBKYW51YXJ5IDIwMDUgaW4gdGhlIHNhbWUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXI/XG4gKiB2YXIgcmVzdWx0ID0gaXNTYW1lSVNPWWVhcihcbiAqICAgbmV3IERhdGUoMjAwMywgMTEsIDI5KSxcbiAqICAgbmV3IERhdGUoMjAwNSwgMCwgMilcbiAqIClcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1NhbWVJU09ZZWFyIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnRTdGFydE9mWWVhciA9IHN0YXJ0T2ZJU09ZZWFyKGRpcnR5RGF0ZUxlZnQpXG4gIHZhciBkYXRlUmlnaHRTdGFydE9mWWVhciA9IHN0YXJ0T2ZJU09ZZWFyKGRpcnR5RGF0ZVJpZ2h0KVxuXG4gIHJldHVybiBkYXRlTGVmdFN0YXJ0T2ZZZWFyLmdldFRpbWUoKSA9PT0gZGF0ZVJpZ2h0U3RhcnRPZlllYXIuZ2V0VGltZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTYW1lSVNPWWVhclxuIiwidmFyIHN0YXJ0T2ZNaW51dGUgPSByZXF1aXJlKCcuLi9zdGFydF9vZl9taW51dGUvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNaW51dGUgSGVscGVyc1xuICogQHN1bW1hcnkgQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSBtaW51dGU/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIG1pbnV0ZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgbWludXRlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSA0IFNlcHRlbWJlciAyMDE0IDA2OjMwOjAwIGFuZCA0IFNlcHRlbWJlciAyMDE0IDA2OjMwOjE1XG4gKiAvLyBpbiB0aGUgc2FtZSBtaW51dGU/XG4gKiB2YXIgcmVzdWx0ID0gaXNTYW1lTWludXRlKFxuICogICBuZXcgRGF0ZSgyMDE0LCA4LCA0LCA2LCAzMCksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDQsIDYsIDMwLCAxNSlcbiAqIClcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1NhbWVNaW51dGUgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkYXRlTGVmdFN0YXJ0T2ZNaW51dGUgPSBzdGFydE9mTWludXRlKGRpcnR5RGF0ZUxlZnQpXG4gIHZhciBkYXRlUmlnaHRTdGFydE9mTWludXRlID0gc3RhcnRPZk1pbnV0ZShkaXJ0eURhdGVSaWdodClcblxuICByZXR1cm4gZGF0ZUxlZnRTdGFydE9mTWludXRlLmdldFRpbWUoKSA9PT0gZGF0ZVJpZ2h0U3RhcnRPZk1pbnV0ZS5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1NhbWVNaW51dGVcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSBtb250aD9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgbW9udGg/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZXMgYXJlIGluIHRoZSBzYW1lIG1vbnRoXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSAyIFNlcHRlbWJlciAyMDE0IGFuZCAyNSBTZXB0ZW1iZXIgMjAxNCBpbiB0aGUgc2FtZSBtb250aD9cbiAqIHZhciByZXN1bHQgPSBpc1NhbWVNb250aChcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgMiksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDI1KVxuICogKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzU2FtZU1vbnRoIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgZGF0ZVJpZ2h0ID0gcGFyc2UoZGlydHlEYXRlUmlnaHQpXG4gIHJldHVybiBkYXRlTGVmdC5nZXRGdWxsWWVhcigpID09PSBkYXRlUmlnaHQuZ2V0RnVsbFllYXIoKSAmJlxuICAgIGRhdGVMZWZ0LmdldE1vbnRoKCkgPT09IGRhdGVSaWdodC5nZXRNb250aCgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTYW1lTW9udGhcbiIsInZhciBzdGFydE9mUXVhcnRlciA9IHJlcXVpcmUoJy4uL3N0YXJ0X29mX3F1YXJ0ZXIvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBRdWFydGVyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgeWVhciBxdWFydGVyP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSB5ZWFyIHF1YXJ0ZXI/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZXMgYXJlIGluIHRoZSBzYW1lIHF1YXJ0ZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDEgSmFudWFyeSAyMDE0IGFuZCA4IE1hcmNoIDIwMTQgaW4gdGhlIHNhbWUgcXVhcnRlcj9cbiAqIHZhciByZXN1bHQgPSBpc1NhbWVRdWFydGVyKFxuICogICBuZXcgRGF0ZSgyMDE0LCAwLCAxKSxcbiAqICAgbmV3IERhdGUoMjAxNCwgMiwgOClcbiAqIClcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1NhbWVRdWFydGVyIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnRTdGFydE9mUXVhcnRlciA9IHN0YXJ0T2ZRdWFydGVyKGRpcnR5RGF0ZUxlZnQpXG4gIHZhciBkYXRlUmlnaHRTdGFydE9mUXVhcnRlciA9IHN0YXJ0T2ZRdWFydGVyKGRpcnR5RGF0ZVJpZ2h0KVxuXG4gIHJldHVybiBkYXRlTGVmdFN0YXJ0T2ZRdWFydGVyLmdldFRpbWUoKSA9PT0gZGF0ZVJpZ2h0U3RhcnRPZlF1YXJ0ZXIuZ2V0VGltZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTYW1lUXVhcnRlclxuIiwidmFyIHN0YXJ0T2ZTZWNvbmQgPSByZXF1aXJlKCcuLi9zdGFydF9vZl9zZWNvbmQvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBTZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSBzZWNvbmQ/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIHNlY29uZD9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgc2Vjb25kXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSA0IFNlcHRlbWJlciAyMDE0IDA2OjMwOjE1LjAwMCBhbmQgNCBTZXB0ZW1iZXIgMjAxNCAwNjozMC4xNS41MDBcbiAqIC8vIGluIHRoZSBzYW1lIHNlY29uZD9cbiAqIHZhciByZXN1bHQgPSBpc1NhbWVTZWNvbmQoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDQsIDYsIDMwLCAxNSksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDQsIDYsIDMwLCAxNSwgNTAwKVxuICogKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzU2FtZVNlY29uZCAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRhdGVMZWZ0U3RhcnRPZlNlY29uZCA9IHN0YXJ0T2ZTZWNvbmQoZGlydHlEYXRlTGVmdClcbiAgdmFyIGRhdGVSaWdodFN0YXJ0T2ZTZWNvbmQgPSBzdGFydE9mU2Vjb25kKGRpcnR5RGF0ZVJpZ2h0KVxuXG4gIHJldHVybiBkYXRlTGVmdFN0YXJ0T2ZTZWNvbmQuZ2V0VGltZSgpID09PSBkYXRlUmlnaHRTdGFydE9mU2Vjb25kLmdldFRpbWUoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2FtZVNlY29uZFxuIiwidmFyIHN0YXJ0T2ZXZWVrID0gcmVxdWlyZSgnLi4vc3RhcnRfb2Zfd2Vlay9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSB3ZWVrP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSB3ZWVrP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53ZWVrU3RhcnRzT249MF0gLSB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayAoMCAtIFN1bmRheSlcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZXMgYXJlIGluIHRoZSBzYW1lIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDMxIEF1Z3VzdCAyMDE0IGFuZCA0IFNlcHRlbWJlciAyMDE0IGluIHRoZSBzYW1lIHdlZWs/XG4gKiB2YXIgcmVzdWx0ID0gaXNTYW1lV2VlayhcbiAqICAgbmV3IERhdGUoMjAxNCwgNywgMzEpLFxuICogICBuZXcgRGF0ZSgyMDE0LCA4LCA0KVxuICogKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHdlZWsgc3RhcnRzIHdpdGggTW9uZGF5LFxuICogLy8gYXJlIDMxIEF1Z3VzdCAyMDE0IGFuZCA0IFNlcHRlbWJlciAyMDE0IGluIHRoZSBzYW1lIHdlZWs/XG4gKiB2YXIgcmVzdWx0ID0gaXNTYW1lV2VlayhcbiAqICAgbmV3IERhdGUoMjAxNCwgNywgMzEpLFxuICogICBuZXcgRGF0ZSgyMDE0LCA4LCA0KSxcbiAqICAge3dlZWtTdGFydHNPbjogMX1cbiAqIClcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTYW1lV2VlayAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQsIGRpcnR5T3B0aW9ucykge1xuICB2YXIgZGF0ZUxlZnRTdGFydE9mV2VlayA9IHN0YXJ0T2ZXZWVrKGRpcnR5RGF0ZUxlZnQsIGRpcnR5T3B0aW9ucylcbiAgdmFyIGRhdGVSaWdodFN0YXJ0T2ZXZWVrID0gc3RhcnRPZldlZWsoZGlydHlEYXRlUmlnaHQsIGRpcnR5T3B0aW9ucylcblxuICByZXR1cm4gZGF0ZUxlZnRTdGFydE9mV2Vlay5nZXRUaW1lKCkgPT09IGRhdGVSaWdodFN0YXJ0T2ZXZWVrLmdldFRpbWUoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2FtZVdlZWtcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIHllYXI/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIHllYXI/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZXMgYXJlIGluIHRoZSBzYW1lIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDIgU2VwdGVtYmVyIDIwMTQgYW5kIDI1IFNlcHRlbWJlciAyMDE0IGluIHRoZSBzYW1lIHllYXI/XG4gKiB2YXIgcmVzdWx0ID0gaXNTYW1lWWVhcihcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgMiksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDI1KVxuICogKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzU2FtZVllYXIgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkYXRlTGVmdCA9IHBhcnNlKGRpcnR5RGF0ZUxlZnQpXG4gIHZhciBkYXRlUmlnaHQgPSBwYXJzZShkaXJ0eURhdGVSaWdodClcbiAgcmV0dXJuIGRhdGVMZWZ0LmdldEZ1bGxZZWFyKCkgPT09IGRhdGVSaWdodC5nZXRGdWxsWWVhcigpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTYW1lWWVhclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrZGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIFNhdHVyZGF5P1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgU2F0dXJkYXk/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIFNhdHVyZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElzIDI3IFNlcHRlbWJlciAyMDE0IFNhdHVyZGF5P1xuICogdmFyIHJlc3VsdCA9IGlzU2F0dXJkYXkobmV3IERhdGUoMjAxNCwgOCwgMjcpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzU2F0dXJkYXkgKGRpcnR5RGF0ZSkge1xuICByZXR1cm4gcGFyc2UoZGlydHlEYXRlKS5nZXREYXkoKSA9PT0gNlxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2F0dXJkYXlcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgV2Vla2RheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBTdW5kYXk/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSBTdW5kYXk/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIFN1bmRheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJcyAyMSBTZXB0ZW1iZXIgMjAxNCBTdW5kYXk/XG4gKiB2YXIgcmVzdWx0ID0gaXNTdW5kYXkobmV3IERhdGUoMjAxNCwgOCwgMjEpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzU3VuZGF5IChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIHBhcnNlKGRpcnR5RGF0ZSkuZ2V0RGF5KCkgPT09IDBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N1bmRheVxuIiwidmFyIGlzU2FtZUhvdXIgPSByZXF1aXJlKCcuLi9pc19zYW1lX2hvdXIvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBIb3VyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIGhvdXIgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIGhvdXIgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgaW4gdGhpcyBob3VyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIG5vdyBpcyAyNSBTZXB0ZW1iZXIgMjAxNCAxODozMDoxNS41MDAsXG4gKiAvLyBpcyAyNSBTZXB0ZW1iZXIgMjAxNCAxODowMDowMCBpbiB0aGlzIGhvdXI/XG4gKiB2YXIgcmVzdWx0ID0gaXNUaGlzSG91cihuZXcgRGF0ZSgyMDE0LCA4LCAyNSwgMTgpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzVGhpc0hvdXIgKGRpcnR5RGF0ZSkge1xuICByZXR1cm4gaXNTYW1lSG91cihuZXcgRGF0ZSgpLCBkaXJ0eURhdGUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUaGlzSG91clxuIiwidmFyIGlzU2FtZUlTT1dlZWsgPSByZXF1aXJlKCcuLi9pc19zYW1lX2lzb193ZWVrL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgSVNPIHdlZWsgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIElTTyB3ZWVrIGFzIHRoZSBjdXJyZW50IGRhdGU/XG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBpbiB0aGlzIElTTyB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDI1IFNlcHRlbWJlciAyMDE0LCBpcyAyMiBTZXB0ZW1iZXIgMjAxNCBpbiB0aGlzIElTTyB3ZWVrP1xuICogdmFyIHJlc3VsdCA9IGlzVGhpc0lTT1dlZWsobmV3IERhdGUoMjAxNCwgOCwgMjIpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzVGhpc0lTT1dlZWsgKGRpcnR5RGF0ZSkge1xuICByZXR1cm4gaXNTYW1lSVNPV2VlayhuZXcgRGF0ZSgpLCBkaXJ0eURhdGUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUaGlzSVNPV2Vla1xuIiwidmFyIGlzU2FtZUlTT1llYXIgPSByZXF1aXJlKCcuLi9pc19zYW1lX2lzb195ZWFyL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWstTnVtYmVyaW5nIFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIGFzIHRoZSBjdXJyZW50IGRhdGU/XG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBpbiB0aGlzIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDI1IFNlcHRlbWJlciAyMDE0LFxuICogLy8gaXMgMzAgRGVjZW1iZXIgMjAxMyBpbiB0aGlzIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyP1xuICogdmFyIHJlc3VsdCA9IGlzVGhpc0lTT1llYXIobmV3IERhdGUoMjAxMywgMTEsIDMwKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1RoaXNJU09ZZWFyIChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIGlzU2FtZUlTT1llYXIobmV3IERhdGUoKSwgZGlydHlEYXRlKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVGhpc0lTT1llYXJcbiIsInZhciBpc1NhbWVNaW51dGUgPSByZXF1aXJlKCcuLi9pc19zYW1lX21pbnV0ZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1pbnV0ZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgc2FtZSBtaW51dGUgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIG1pbnV0ZSBhcyB0aGUgY3VycmVudCBkYXRlP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBpbiB0aGlzIG1pbnV0ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiBub3cgaXMgMjUgU2VwdGVtYmVyIDIwMTQgMTg6MzA6MTUuNTAwLFxuICogLy8gaXMgMjUgU2VwdGVtYmVyIDIwMTQgMTg6MzA6MDAgaW4gdGhpcyBtaW51dGU/XG4gKiB2YXIgcmVzdWx0ID0gaXNUaGlzTWludXRlKG5ldyBEYXRlKDIwMTQsIDgsIDI1LCAxOCwgMzApKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzVGhpc01pbnV0ZSAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBpc1NhbWVNaW51dGUobmV3IERhdGUoKSwgZGlydHlEYXRlKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVGhpc01pbnV0ZVxuIiwidmFyIGlzU2FtZU1vbnRoID0gcmVxdWlyZSgnLi4vaXNfc2FtZV9tb250aC9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIG1vbnRoIGFzIHRoZSBjdXJyZW50IGRhdGU/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgc2FtZSBtb250aCBhcyB0aGUgY3VycmVudCBkYXRlP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBpbiB0aGlzIG1vbnRoXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDI1IFNlcHRlbWJlciAyMDE0LCBpcyAxNSBTZXB0ZW1iZXIgMjAxNCBpbiB0aGlzIG1vbnRoP1xuICogdmFyIHJlc3VsdCA9IGlzVGhpc01vbnRoKG5ldyBEYXRlKDIwMTQsIDgsIDE1KSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1RoaXNNb250aCAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBpc1NhbWVNb250aChuZXcgRGF0ZSgpLCBkaXJ0eURhdGUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUaGlzTW9udGhcbiIsInZhciBpc1NhbWVRdWFydGVyID0gcmVxdWlyZSgnLi4vaXNfc2FtZV9xdWFydGVyL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgUXVhcnRlciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgc2FtZSBxdWFydGVyIGFzIHRoZSBjdXJyZW50IGRhdGU/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgc2FtZSBxdWFydGVyIGFzIHRoZSBjdXJyZW50IGRhdGU/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIGluIHRoaXMgcXVhcnRlclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAyNSBTZXB0ZW1iZXIgMjAxNCwgaXMgMiBKdWx5IDIwMTQgaW4gdGhpcyBxdWFydGVyP1xuICogdmFyIHJlc3VsdCA9IGlzVGhpc1F1YXJ0ZXIobmV3IERhdGUoMjAxNCwgNiwgMikpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNUaGlzUXVhcnRlciAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBpc1NhbWVRdWFydGVyKG5ldyBEYXRlKCksIGRpcnR5RGF0ZSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1RoaXNRdWFydGVyXG4iLCJ2YXIgaXNTYW1lU2Vjb25kID0gcmVxdWlyZSgnLi4vaXNfc2FtZV9zZWNvbmQvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBTZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgc2Vjb25kIGFzIHRoZSBjdXJyZW50IGRhdGU/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgc2FtZSBzZWNvbmQgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgaW4gdGhpcyBzZWNvbmRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgbm93IGlzIDI1IFNlcHRlbWJlciAyMDE0IDE4OjMwOjE1LjUwMCxcbiAqIC8vIGlzIDI1IFNlcHRlbWJlciAyMDE0IDE4OjMwOjE1LjAwMCBpbiB0aGlzIHNlY29uZD9cbiAqIHZhciByZXN1bHQgPSBpc1RoaXNTZWNvbmQobmV3IERhdGUoMjAxNCwgOCwgMjUsIDE4LCAzMCwgMTUpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzVGhpc1NlY29uZCAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBpc1NhbWVTZWNvbmQobmV3IERhdGUoKSwgZGlydHlEYXRlKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVGhpc1NlY29uZFxuIiwidmFyIGlzU2FtZVdlZWsgPSByZXF1aXJlKCcuLi9pc19zYW1lX3dlZWsvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIHdlZWsgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIHdlZWsgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53ZWVrU3RhcnRzT249MF0gLSB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayAoMCAtIFN1bmRheSlcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBpbiB0aGlzIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMjUgU2VwdGVtYmVyIDIwMTQsIGlzIDIxIFNlcHRlbWJlciAyMDE0IGluIHRoaXMgd2Vlaz9cbiAqIHZhciByZXN1bHQgPSBpc1RoaXNXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAyNSBTZXB0ZW1iZXIgMjAxNCBhbmQgd2VlayBzdGFydHMgd2l0aCBNb25kYXlcbiAqIC8vIGlzIDIxIFNlcHRlbWJlciAyMDE0IGluIHRoaXMgd2Vlaz9cbiAqIHZhciByZXN1bHQgPSBpc1RoaXNXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIxKSwge3dlZWtTdGFydHNPbjogMX0pXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVGhpc1dlZWsgKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKSB7XG4gIHJldHVybiBpc1NhbWVXZWVrKG5ldyBEYXRlKCksIGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVGhpc1dlZWtcbiIsInZhciBpc1NhbWVZZWFyID0gcmVxdWlyZSgnLi4vaXNfc2FtZV95ZWFyL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgc2FtZSB5ZWFyIGFzIHRoZSBjdXJyZW50IGRhdGU/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgc2FtZSB5ZWFyIGFzIHRoZSBjdXJyZW50IGRhdGU/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIGluIHRoaXMgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAyNSBTZXB0ZW1iZXIgMjAxNCwgaXMgMiBKdWx5IDIwMTQgaW4gdGhpcyB5ZWFyP1xuICogdmFyIHJlc3VsdCA9IGlzVGhpc1llYXIobmV3IERhdGUoMjAxNCwgNiwgMikpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNUaGlzWWVhciAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBpc1NhbWVZZWFyKG5ldyBEYXRlKCksIGRpcnR5RGF0ZSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1RoaXNZZWFyXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWtkYXkgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgVGh1cnNkYXk/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSBUaHVyc2RheT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgVGh1cnNkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSXMgMjUgU2VwdGVtYmVyIDIwMTQgVGh1cnNkYXk/XG4gKiB2YXIgcmVzdWx0ID0gaXNUaHVyc2RheShuZXcgRGF0ZSgyMDE0LCA4LCAyNSkpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNUaHVyc2RheSAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBwYXJzZShkaXJ0eURhdGUpLmdldERheSgpID09PSA0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUaHVyc2RheVxuIiwidmFyIHN0YXJ0T2ZEYXkgPSByZXF1aXJlKCcuLi9zdGFydF9vZl9kYXkvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgdG9kYXk/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSB0b2RheT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgdG9kYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQsIGlzIDYgT2N0b2JlciAxNDowMDowMCB0b2RheT9cbiAqIHZhciByZXN1bHQgPSBpc1RvZGF5KG5ldyBEYXRlKDIwMTQsIDksIDYsIDE0LCAwKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1RvZGF5IChkaXJ0eURhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkoZGlydHlEYXRlKS5nZXRUaW1lKCkgPT09IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSkuZ2V0VGltZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUb2RheVxuIiwidmFyIHN0YXJ0T2ZEYXkgPSByZXF1aXJlKCcuLi9zdGFydF9vZl9kYXkvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgdG9tb3Jyb3c/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSB0b21vcnJvdz9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgdG9tb3Jyb3dcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQsIGlzIDcgT2N0b2JlciAxNDowMDowMCB0b21vcnJvdz9cbiAqIHZhciByZXN1bHQgPSBpc1RvbW9ycm93KG5ldyBEYXRlKDIwMTQsIDksIDcsIDE0LCAwKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1RvbW9ycm93IChkaXJ0eURhdGUpIHtcbiAgdmFyIHRvbW9ycm93ID0gbmV3IERhdGUoKVxuICB0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93LmdldERhdGUoKSArIDEpXG4gIHJldHVybiBzdGFydE9mRGF5KGRpcnR5RGF0ZSkuZ2V0VGltZSgpID09PSBzdGFydE9mRGF5KHRvbW9ycm93KS5nZXRUaW1lKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1RvbW9ycm93XG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWtkYXkgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgVHVlc2RheT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIFR1ZXNkYXk/XG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIFR1ZXNkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSXMgMjMgU2VwdGVtYmVyIDIwMTQgVHVlc2RheT9cbiAqIHZhciByZXN1bHQgPSBpc1R1ZXNkYXkobmV3IERhdGUoMjAxNCwgOCwgMjMpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzVHVlc2RheSAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBwYXJzZShkaXJ0eURhdGUpLmdldERheSgpID09PSAyXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUdWVzZGF5XG4iLCJ2YXIgaXNEYXRlID0gcmVxdWlyZSgnLi4vaXNfZGF0ZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB2YWxpZD9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybnMgZmFsc2UgaWYgYXJndW1lbnQgaXMgSW52YWxpZCBEYXRlIGFuZCB0cnVlIG90aGVyd2lzZS5cbiAqIEludmFsaWQgRGF0ZSBpcyBhIERhdGUsIHdob3NlIHRpbWUgdmFsdWUgaXMgTmFOLlxuICpcbiAqIFRpbWUgdmFsdWUgb2YgRGF0ZTogaHR0cDovL2VzNS5naXRodWIuaW8vI3gxNS45LjEuMVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgdmFsaWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gYXJndW1lbnQgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBEYXRlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgdmFsaWQgZGF0ZTpcbiAqIHZhciByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKDIwMTQsIDEsIDMxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIGludmFsaWQgZGF0ZTpcbiAqIHZhciByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKCcnKSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNWYWxpZCAoZGlydHlEYXRlKSB7XG4gIGlmIChpc0RhdGUoZGlydHlEYXRlKSkge1xuICAgIHJldHVybiAhaXNOYU4oZGlydHlEYXRlKVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IodG9TdHJpbmcuY2FsbChkaXJ0eURhdGUpICsgJyBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgRGF0ZScpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1ZhbGlkXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWtkYXkgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgV2VkbmVzZGF5P1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgV2VkbmVzZGF5P1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBXZWRuZXNkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSXMgMjQgU2VwdGVtYmVyIDIwMTQgV2VkbmVzZGF5P1xuICogdmFyIHJlc3VsdCA9IGlzV2VkbmVzZGF5KG5ldyBEYXRlKDIwMTQsIDgsIDI0KSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1dlZG5lc2RheSAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBwYXJzZShkaXJ0eURhdGUpLmdldERheSgpID09PSAzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNXZWRuZXNkYXlcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgV2Vla2RheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBEb2VzIHRoZSBnaXZlbiBkYXRlIGZhbGwgb24gYSB3ZWVrZW5kP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogRG9lcyB0aGUgZ2l2ZW4gZGF0ZSBmYWxsIG9uIGEgd2Vla2VuZD9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgZmFsbHMgb24gYSB3ZWVrZW5kXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIERvZXMgNSBPY3RvYmVyIDIwMTQgZmFsbCBvbiBhIHdlZWtlbmQ/XG4gKiB2YXIgcmVzdWx0ID0gaXNXZWVrZW5kKG5ldyBEYXRlKDIwMTQsIDksIDUpKVxuICogLy89PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzV2Vla2VuZCAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgZGF5ID0gZGF0ZS5nZXREYXkoKVxuICByZXR1cm4gZGF5ID09PSAwIHx8IGRheSA9PT0gNlxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzV2Vla2VuZFxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBSYW5nZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB3aXRoaW4gdGhlIHJhbmdlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgd2l0aGluIHRoZSByYW5nZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gc3RhcnREYXRlIC0gdGhlIHN0YXJ0IG9mIHJhbmdlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZW5kRGF0ZSAtIHRoZSBlbmQgb2YgcmFuZ2VcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyB3aXRoaW4gdGhlIHJhbmdlXG4gKiBAdGhyb3dzIHtFcnJvcn0gc3RhcnREYXRlIGNhbm5vdCBiZSBhZnRlciBlbmREYXRlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgZGF0ZSB3aXRoaW4gdGhlIHJhbmdlOlxuICogaXNXaXRoaW5SYW5nZShcbiAqICAgbmV3IERhdGUoMjAxNCwgMCwgMyksIG5ldyBEYXRlKDIwMTQsIDAsIDEpLCBuZXcgRGF0ZSgyMDE0LCAwLCA3KVxuICogKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgZGF0ZSBvdXRzaWRlIG9mIHRoZSByYW5nZTpcbiAqIGlzV2l0aGluUmFuZ2UoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDAsIDEwKSwgbmV3IERhdGUoMjAxNCwgMCwgMSksIG5ldyBEYXRlKDIwMTQsIDAsIDcpXG4gKiApXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzV2l0aGluUmFuZ2UgKGRpcnR5RGF0ZSwgZGlydHlTdGFydERhdGUsIGRpcnR5RW5kRGF0ZSkge1xuICB2YXIgdGltZSA9IHBhcnNlKGRpcnR5RGF0ZSkuZ2V0VGltZSgpXG4gIHZhciBzdGFydFRpbWUgPSBwYXJzZShkaXJ0eVN0YXJ0RGF0ZSkuZ2V0VGltZSgpXG4gIHZhciBlbmRUaW1lID0gcGFyc2UoZGlydHlFbmREYXRlKS5nZXRUaW1lKClcblxuICBpZiAoc3RhcnRUaW1lID4gZW5kVGltZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIHN0YXJ0IG9mIHRoZSByYW5nZSBjYW5ub3QgYmUgYWZ0ZXIgdGhlIGVuZCBvZiB0aGUgcmFuZ2UnKVxuICB9XG5cbiAgcmV0dXJuIHRpbWUgPj0gc3RhcnRUaW1lICYmIHRpbWUgPD0gZW5kVGltZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzV2l0aGluUmFuZ2VcbiIsInZhciBzdGFydE9mRGF5ID0gcmVxdWlyZSgnLi4vc3RhcnRfb2ZfZGF5L2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHllc3RlcmRheT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIHllc3RlcmRheT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgeWVzdGVyZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDYgT2N0b2JlciAyMDE0LCBpcyA1IE9jdG9iZXIgMTQ6MDA6MDAgeWVzdGVyZGF5P1xuICogdmFyIHJlc3VsdCA9IGlzWWVzdGVyZGF5KG5ldyBEYXRlKDIwMTQsIDksIDUsIDE0LCAwKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1llc3RlcmRheSAoZGlydHlEYXRlKSB7XG4gIHZhciB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpXG4gIHllc3RlcmRheS5zZXREYXRlKHllc3RlcmRheS5nZXREYXRlKCkgLSAxKVxuICByZXR1cm4gc3RhcnRPZkRheShkaXJ0eURhdGUpLmdldFRpbWUoKSA9PT0gc3RhcnRPZkRheSh5ZXN0ZXJkYXkpLmdldFRpbWUoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzWWVzdGVyZGF5XG4iLCJ2YXIgbGFzdERheU9mV2VlayA9IHJlcXVpcmUoJy4uL2xhc3RfZGF5X29mX3dlZWsvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBJU08gV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGxhc3QgZGF5IG9mIGFuIElTTyB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgbGFzdCBkYXkgb2YgYW4gSVNPIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBsYXN0IGRheSBvZiBhbiBJU08gd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgbGFzdCBkYXkgb2YgYW4gSVNPIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gbGFzdERheU9mSVNPV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBTdW4gU2VwIDA3IDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gbGFzdERheU9mSVNPV2VlayAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBsYXN0RGF5T2ZXZWVrKGRpcnR5RGF0ZSwge3dlZWtTdGFydHNPbjogMX0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGFzdERheU9mSVNPV2Vla1xuIiwidmFyIGdldElTT1llYXIgPSByZXF1aXJlKCcuLi9nZXRfaXNvX3llYXIvaW5kZXguanMnKVxudmFyIHN0YXJ0T2ZJU09XZWVrID0gcmVxdWlyZSgnLi4vc3RhcnRfb2ZfaXNvX3dlZWsvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGxhc3QgZGF5IG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgbGFzdCBkYXkgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXIsXG4gKiB3aGljaCBhbHdheXMgc3RhcnRzIDMgZGF5cyBiZWZvcmUgdGhlIHllYXIncyBmaXJzdCBUaHVyc2RheS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZW5kIG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBsYXN0IGRheSBvZiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgMiBKdWx5IDIwMDU6XG4gKiB2YXIgcmVzdWx0ID0gbGFzdERheU9mSVNPWWVhcihuZXcgRGF0ZSgyMDA1LCA2LCAyKSlcbiAqIC8vPT4gU3VuIEphbiAwMSAyMDA2IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIGxhc3REYXlPZklTT1llYXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgeWVhciA9IGdldElTT1llYXIoZGlydHlEYXRlKVxuICB2YXIgZm91cnRoT2ZKYW51YXJ5ID0gbmV3IERhdGUoMClcbiAgZm91cnRoT2ZKYW51YXJ5LnNldEZ1bGxZZWFyKHllYXIgKyAxLCAwLCA0KVxuICBmb3VydGhPZkphbnVhcnkuc2V0SG91cnMoMCwgMCwgMCwgMClcbiAgdmFyIGRhdGUgPSBzdGFydE9mSVNPV2Vlayhmb3VydGhPZkphbnVhcnkpXG4gIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIDEpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGFzdERheU9mSVNPWWVhclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGxhc3QgZGF5IG9mIGEgbW9udGggZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBsYXN0IGRheSBvZiBhIG1vbnRoIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBsYXN0IGRheSBvZiBhIG1vbnRoXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBsYXN0IGRheSBvZiBhIG1vbnRoIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogdmFyIHJlc3VsdCA9IGxhc3REYXlPZk1vbnRoKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFR1ZSBTZXAgMzAgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBsYXN0RGF5T2ZNb250aCAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgZGF0ZS5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCksIG1vbnRoICsgMSwgMClcbiAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxhc3REYXlPZk1vbnRoXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFF1YXJ0ZXIgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBsYXN0IGRheSBvZiBhIHllYXIgcXVhcnRlciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGxhc3QgZGF5IG9mIGEgeWVhciBxdWFydGVyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBsYXN0IGRheSBvZiBhIHF1YXJ0ZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIGxhc3QgZGF5IG9mIGEgcXVhcnRlciBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBsYXN0RGF5T2ZRdWFydGVyKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFR1ZSBTZXAgMzAgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBsYXN0RGF5T2ZRdWFydGVyIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBjdXJyZW50TW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgdmFyIG1vbnRoID0gY3VycmVudE1vbnRoIC0gY3VycmVudE1vbnRoICUgMyArIDNcbiAgZGF0ZS5zZXRNb250aChtb250aCwgMClcbiAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxhc3REYXlPZlF1YXJ0ZXJcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGxhc3QgZGF5IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGxhc3QgZGF5IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLndlZWtTdGFydHNPbj0wXSAtIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrICgwIC0gU3VuZGF5KVxuICogQHJldHVybnMge0RhdGV9IHRoZSBsYXN0IGRheSBvZiBhIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIGxhc3QgZGF5IG9mIGEgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBsYXN0RGF5T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFNhdCBTZXAgMDYgMjAxNCAwMDowMDowMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0aGUgd2VlayBzdGFydHMgb24gTW9uZGF5LCB0aGUgbGFzdCBkYXkgb2YgdGhlIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gbGFzdERheU9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApLCB7d2Vla1N0YXJ0c09uOiAxfSlcbiAqIC8vPT4gU3VuIFNlcCAwNyAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIGxhc3REYXlPZldlZWsgKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKSB7XG4gIHZhciB3ZWVrU3RhcnRzT24gPSBkaXJ0eU9wdGlvbnMgPyAoTnVtYmVyKGRpcnR5T3B0aW9ucy53ZWVrU3RhcnRzT24pIHx8IDApIDogMFxuXG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgZGF5ID0gZGF0ZS5nZXREYXkoKVxuICB2YXIgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyAtNyA6IDApICsgNiAtIChkYXkgLSB3ZWVrU3RhcnRzT24pXG5cbiAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKVxuICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBkaWZmKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxhc3REYXlPZldlZWtcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGxhc3QgZGF5IG9mIGEgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGxhc3QgZGF5IG9mIGEgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbGFzdCBkYXkgb2YgYSB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBsYXN0IGRheSBvZiBhIHllYXIgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gbGFzdERheU9mWWVhcihuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDAwKSlcbiAqIC8vPT4gV2VkIERlYyAzMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIGxhc3REYXlPZlllYXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgZGF0ZS5zZXRGdWxsWWVhcih5ZWFyICsgMSwgMCwgMClcbiAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxhc3REYXlPZlllYXJcbiIsInZhciBjb21tb25Gb3JtYXR0ZXJLZXlzID0gW1xuICAnTScsICdNTScsICdRJywgJ0QnLCAnREQnLCAnREREJywgJ0REREQnLCAnZCcsXG4gICdFJywgJ1cnLCAnV1cnLCAnWVknLCAnWVlZWScsICdHRycsICdHR0dHJyxcbiAgJ0gnLCAnSEgnLCAnaCcsICdoaCcsICdtJywgJ21tJyxcbiAgJ3MnLCAnc3MnLCAnUycsICdTUycsICdTU1MnLFxuICAnWicsICdaWicsICdYJywgJ3gnXG5dXG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCAoZm9ybWF0dGVycykge1xuICB2YXIgZm9ybWF0dGVyS2V5cyA9IFtdXG4gIGZvciAodmFyIGtleSBpbiBmb3JtYXR0ZXJzKSB7XG4gICAgaWYgKGZvcm1hdHRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgZm9ybWF0dGVyS2V5cy5wdXNoKGtleSlcbiAgICB9XG4gIH1cblxuICB2YXIgZm9ybWF0dGluZ1Rva2VucyA9IGNvbW1vbkZvcm1hdHRlcktleXNcbiAgICAuY29uY2F0KGZvcm1hdHRlcktleXMpXG4gICAgLnNvcnQoKVxuICAgIC5yZXZlcnNlKClcbiAgdmFyIGZvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSBuZXcgUmVnRXhwKFxuICAgICcoXFxcXFtbXlxcXFxbXSpcXFxcXSl8KFxcXFxcXFxcKT8nICsgJygnICsgZm9ybWF0dGluZ1Rva2Vucy5qb2luKCd8JykgKyAnfC4pJywgJ2cnXG4gIClcblxuICByZXR1cm4gZm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cFxuIiwiZnVuY3Rpb24gYnVpbGREaXN0YW5jZUluV29yZHNMb2NhbGUgKCkge1xuICB2YXIgZGlzdGFuY2VJbldvcmRzTG9jYWxlID0ge1xuICAgIGxlc3NUaGFuWFNlY29uZHM6IHtcbiAgICAgIG9uZTogJ2xlc3MgdGhhbiBhIHNlY29uZCcsXG4gICAgICBvdGhlcjogJ2xlc3MgdGhhbiB7e2NvdW50fX0gc2Vjb25kcydcbiAgICB9LFxuXG4gICAgeFNlY29uZHM6IHtcbiAgICAgIG9uZTogJzEgc2Vjb25kJyxcbiAgICAgIG90aGVyOiAne3tjb3VudH19IHNlY29uZHMnXG4gICAgfSxcblxuICAgIGhhbGZBTWludXRlOiAnaGFsZiBhIG1pbnV0ZScsXG5cbiAgICBsZXNzVGhhblhNaW51dGVzOiB7XG4gICAgICBvbmU6ICdsZXNzIHRoYW4gYSBtaW51dGUnLFxuICAgICAgb3RoZXI6ICdsZXNzIHRoYW4ge3tjb3VudH19IG1pbnV0ZXMnXG4gICAgfSxcblxuICAgIHhNaW51dGVzOiB7XG4gICAgICBvbmU6ICcxIG1pbnV0ZScsXG4gICAgICBvdGhlcjogJ3t7Y291bnR9fSBtaW51dGVzJ1xuICAgIH0sXG5cbiAgICBhYm91dFhIb3Vyczoge1xuICAgICAgb25lOiAnYWJvdXQgMSBob3VyJyxcbiAgICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IGhvdXJzJ1xuICAgIH0sXG5cbiAgICB4SG91cnM6IHtcbiAgICAgIG9uZTogJzEgaG91cicsXG4gICAgICBvdGhlcjogJ3t7Y291bnR9fSBob3VycydcbiAgICB9LFxuXG4gICAgeERheXM6IHtcbiAgICAgIG9uZTogJzEgZGF5JyxcbiAgICAgIG90aGVyOiAne3tjb3VudH19IGRheXMnXG4gICAgfSxcblxuICAgIGFib3V0WE1vbnRoczoge1xuICAgICAgb25lOiAnYWJvdXQgMSBtb250aCcsXG4gICAgICBvdGhlcjogJ2Fib3V0IHt7Y291bnR9fSBtb250aHMnXG4gICAgfSxcblxuICAgIHhNb250aHM6IHtcbiAgICAgIG9uZTogJzEgbW9udGgnLFxuICAgICAgb3RoZXI6ICd7e2NvdW50fX0gbW9udGhzJ1xuICAgIH0sXG5cbiAgICBhYm91dFhZZWFyczoge1xuICAgICAgb25lOiAnYWJvdXQgMSB5ZWFyJyxcbiAgICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IHllYXJzJ1xuICAgIH0sXG5cbiAgICB4WWVhcnM6IHtcbiAgICAgIG9uZTogJzEgeWVhcicsXG4gICAgICBvdGhlcjogJ3t7Y291bnR9fSB5ZWFycydcbiAgICB9LFxuXG4gICAgb3ZlclhZZWFyczoge1xuICAgICAgb25lOiAnb3ZlciAxIHllYXInLFxuICAgICAgb3RoZXI6ICdvdmVyIHt7Y291bnR9fSB5ZWFycydcbiAgICB9LFxuXG4gICAgYWxtb3N0WFllYXJzOiB7XG4gICAgICBvbmU6ICdhbG1vc3QgMSB5ZWFyJyxcbiAgICAgIG90aGVyOiAnYWxtb3N0IHt7Y291bnR9fSB5ZWFycydcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsb2NhbGl6ZSAodG9rZW4sIGNvdW50LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICAgIHZhciByZXN1bHRcbiAgICBpZiAodHlwZW9mIGRpc3RhbmNlSW5Xb3Jkc0xvY2FsZVt0b2tlbl0gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXN1bHQgPSBkaXN0YW5jZUluV29yZHNMb2NhbGVbdG9rZW5dXG4gICAgfSBlbHNlIGlmIChjb3VudCA9PT0gMSkge1xuICAgICAgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzTG9jYWxlW3Rva2VuXS5vbmVcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gZGlzdGFuY2VJbldvcmRzTG9jYWxlW3Rva2VuXS5vdGhlci5yZXBsYWNlKCd7e2NvdW50fX0nLCBjb3VudClcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5hZGRTdWZmaXgpIHtcbiAgICAgIGlmIChvcHRpb25zLmNvbXBhcmlzb24gPiAwKSB7XG4gICAgICAgIHJldHVybiAnaW4gJyArIHJlc3VsdFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCArICcgYWdvJ1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbG9jYWxpemU6IGxvY2FsaXplXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZERpc3RhbmNlSW5Xb3Jkc0xvY2FsZVxuIiwidmFyIGJ1aWxkRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IHJlcXVpcmUoJy4uLy4uL19saWIvYnVpbGRfZm9ybWF0dGluZ190b2tlbnNfcmVnX2V4cC9pbmRleC5qcycpXG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybWF0TG9jYWxlICgpIHtcbiAgLy8gTm90ZTogaW4gRW5nbGlzaCwgdGhlIG5hbWVzIG9mIGRheXMgb2YgdGhlIHdlZWsgYW5kIG1vbnRocyBhcmUgY2FwaXRhbGl6ZWQuXG4gIC8vIElmIHlvdSBhcmUgbWFraW5nIGEgbmV3IGxvY2FsZSBiYXNlZCBvbiB0aGlzIG9uZSwgY2hlY2sgaWYgdGhlIHNhbWUgaXMgdHJ1ZSBmb3IgdGhlIGxhbmd1YWdlIHlvdSdyZSB3b3JraW5nIG9uLlxuICAvLyBHZW5lcmFsbHksIGZvcm1hdHRlZCBkYXRlcyBzaG91bGQgbG9vayBsaWtlIHRoZXkgYXJlIGluIHRoZSBtaWRkbGUgb2YgYSBzZW50ZW5jZSxcbiAgLy8gZS5nLiBpbiBTcGFuaXNoIGxhbmd1YWdlIHRoZSB3ZWVrZGF5cyBhbmQgbW9udGhzIHNob3VsZCBiZSBpbiB0aGUgbG93ZXJjYXNlLlxuICB2YXIgbW9udGhzM2NoYXIgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgdmFyIG1vbnRoc0Z1bGwgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXVxuICB2YXIgd2Vla2RheXMyY2hhciA9IFsnU3UnLCAnTW8nLCAnVHUnLCAnV2UnLCAnVGgnLCAnRnInLCAnU2EnXVxuICB2YXIgd2Vla2RheXMzY2hhciA9IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J11cbiAgdmFyIHdlZWtkYXlzRnVsbCA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXVxuICB2YXIgbWVyaWRpZW1VcHBlcmNhc2UgPSBbJ0FNJywgJ1BNJ11cbiAgdmFyIG1lcmlkaWVtTG93ZXJjYXNlID0gWydhbScsICdwbSddXG4gIHZhciBtZXJpZGllbUZ1bGwgPSBbJ2EubS4nLCAncC5tLiddXG5cbiAgdmFyIGZvcm1hdHRlcnMgPSB7XG4gICAgLy8gTW9udGg6IEphbiwgRmViLCAuLi4sIERlY1xuICAgICdNTU0nOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgcmV0dXJuIG1vbnRoczNjaGFyW2RhdGUuZ2V0TW9udGgoKV1cbiAgICB9LFxuXG4gICAgLy8gTW9udGg6IEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICAgJ01NTU0nOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgcmV0dXJuIG1vbnRoc0Z1bGxbZGF0ZS5nZXRNb250aCgpXVxuICAgIH0sXG5cbiAgICAvLyBEYXkgb2Ygd2VlazogU3UsIE1vLCAuLi4sIFNhXG4gICAgJ2RkJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgIHJldHVybiB3ZWVrZGF5czJjaGFyW2RhdGUuZ2V0RGF5KCldXG4gICAgfSxcblxuICAgIC8vIERheSBvZiB3ZWVrOiBTdW4sIE1vbiwgLi4uLCBTYXRcbiAgICAnZGRkJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgIHJldHVybiB3ZWVrZGF5czNjaGFyW2RhdGUuZ2V0RGF5KCldXG4gICAgfSxcblxuICAgIC8vIERheSBvZiB3ZWVrOiBTdW5kYXksIE1vbmRheSwgLi4uLCBTYXR1cmRheVxuICAgICdkZGRkJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgIHJldHVybiB3ZWVrZGF5c0Z1bGxbZGF0ZS5nZXREYXkoKV1cbiAgICB9LFxuXG4gICAgLy8gQU0sIFBNXG4gICAgJ0EnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgcmV0dXJuIChkYXRlLmdldEhvdXJzKCkgLyAxMikgPj0gMSA/IG1lcmlkaWVtVXBwZXJjYXNlWzFdIDogbWVyaWRpZW1VcHBlcmNhc2VbMF1cbiAgICB9LFxuXG4gICAgLy8gYW0sIHBtXG4gICAgJ2EnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgcmV0dXJuIChkYXRlLmdldEhvdXJzKCkgLyAxMikgPj0gMSA/IG1lcmlkaWVtTG93ZXJjYXNlWzFdIDogbWVyaWRpZW1Mb3dlcmNhc2VbMF1cbiAgICB9LFxuXG4gICAgLy8gYS5tLiwgcC5tLlxuICAgICdhYSc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICByZXR1cm4gKGRhdGUuZ2V0SG91cnMoKSAvIDEyKSA+PSAxID8gbWVyaWRpZW1GdWxsWzFdIDogbWVyaWRpZW1GdWxsWzBdXG4gICAgfVxuICB9XG5cbiAgLy8gR2VuZXJhdGUgb3JkaW5hbCB2ZXJzaW9uIG9mIGZvcm1hdHRlcnM6IE0gLT4gTW8sIEQgLT4gRG8sIGV0Yy5cbiAgdmFyIG9yZGluYWxGb3JtYXR0ZXJzID0gWydNJywgJ0QnLCAnREREJywgJ2QnLCAnUScsICdXJ11cbiAgb3JkaW5hbEZvcm1hdHRlcnMuZm9yRWFjaChmdW5jdGlvbiAoZm9ybWF0dGVyVG9rZW4pIHtcbiAgICBmb3JtYXR0ZXJzW2Zvcm1hdHRlclRva2VuICsgJ28nXSA9IGZ1bmN0aW9uIChkYXRlLCBmb3JtYXR0ZXJzKSB7XG4gICAgICByZXR1cm4gb3JkaW5hbChmb3JtYXR0ZXJzW2Zvcm1hdHRlclRva2VuXShkYXRlKSlcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBmb3JtYXR0ZXJzOiBmb3JtYXR0ZXJzLFxuICAgIGZvcm1hdHRpbmdUb2tlbnNSZWdFeHA6IGJ1aWxkRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cChmb3JtYXR0ZXJzKVxuICB9XG59XG5cbmZ1bmN0aW9uIG9yZGluYWwgKG51bWJlcikge1xuICB2YXIgcmVtMTAwID0gbnVtYmVyICUgMTAwXG4gIGlmIChyZW0xMDAgPiAyMCB8fCByZW0xMDAgPCAxMCkge1xuICAgIHN3aXRjaCAocmVtMTAwICUgMTApIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICdzdCdcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICduZCdcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICdyZCdcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bWJlciArICd0aCdcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZEZvcm1hdExvY2FsZVxuIiwidmFyIGJ1aWxkRGlzdGFuY2VJbldvcmRzTG9jYWxlID0gcmVxdWlyZSgnLi9idWlsZF9kaXN0YW5jZV9pbl93b3Jkc19sb2NhbGUvaW5kZXguanMnKVxudmFyIGJ1aWxkRm9ybWF0TG9jYWxlID0gcmVxdWlyZSgnLi9idWlsZF9mb3JtYXRfbG9jYWxlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTG9jYWxlc1xuICogQHN1bW1hcnkgRW5nbGlzaCBsb2NhbGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICBkaXN0YW5jZUluV29yZHM6IGJ1aWxkRGlzdGFuY2VJbldvcmRzTG9jYWxlKCksXG4gIGZvcm1hdDogYnVpbGRGb3JtYXRMb2NhbGUoKVxufVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBsYXRlc3Qgb2YgdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBsYXRlc3Qgb2YgdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7Li4uKERhdGV8U3RyaW5nfE51bWJlcil9IGRhdGVzIC0gdGhlIGRhdGVzIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbGF0ZXN0IG9mIHRoZSBkYXRlc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCBvZiB0aGVzZSBkYXRlcyBpcyB0aGUgbGF0ZXN0P1xuICogdmFyIHJlc3VsdCA9IG1heChcbiAqICAgbmV3IERhdGUoMTk4OSwgNiwgMTApLFxuICogICBuZXcgRGF0ZSgxOTg3LCAxLCAxMSksXG4gKiAgIG5ldyBEYXRlKDE5OTUsIDYsIDIpLFxuICogICBuZXcgRGF0ZSgxOTkwLCAwLCAxKVxuICogKVxuICogLy89PiBTdW4gSnVsIDAyIDE5OTUgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gbWF4ICgpIHtcbiAgdmFyIGRpcnR5RGF0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gIHZhciBkYXRlcyA9IGRpcnR5RGF0ZXMubWFwKGZ1bmN0aW9uIChkaXJ0eURhdGUpIHtcbiAgICByZXR1cm4gcGFyc2UoZGlydHlEYXRlKVxuICB9KVxuICB2YXIgbGF0ZXN0VGltZXN0YW1wID0gTWF0aC5tYXguYXBwbHkobnVsbCwgZGF0ZXMpXG4gIHJldHVybiBuZXcgRGF0ZShsYXRlc3RUaW1lc3RhbXApXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWF4XG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGVhcmxpZXN0IG9mIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZWFybGllc3Qgb2YgdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7Li4uKERhdGV8U3RyaW5nfE51bWJlcil9IGRhdGVzIC0gdGhlIGRhdGVzIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZWFybGllc3Qgb2YgdGhlIGRhdGVzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIG9mIHRoZXNlIGRhdGVzIGlzIHRoZSBlYXJsaWVzdD9cbiAqIHZhciByZXN1bHQgPSBtaW4oXG4gKiAgIG5ldyBEYXRlKDE5ODksIDYsIDEwKSxcbiAqICAgbmV3IERhdGUoMTk4NywgMSwgMTEpLFxuICogICBuZXcgRGF0ZSgxOTk1LCA2LCAyKSxcbiAqICAgbmV3IERhdGUoMTk5MCwgMCwgMSlcbiAqIClcbiAqIC8vPT4gV2VkIEZlYiAxMSAxOTg3IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIG1pbiAoKSB7XG4gIHZhciBkaXJ0eURhdGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICB2YXIgZGF0ZXMgPSBkaXJ0eURhdGVzLm1hcChmdW5jdGlvbiAoZGlydHlEYXRlKSB7XG4gICAgcmV0dXJuIHBhcnNlKGRpcnR5RGF0ZSlcbiAgfSlcbiAgdmFyIGVhcmxpZXN0VGltZXN0YW1wID0gTWF0aC5taW4uYXBwbHkobnVsbCwgZGF0ZXMpXG4gIHJldHVybiBuZXcgRGF0ZShlYXJsaWVzdFRpbWVzdGFtcClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtaW5cbiIsInZhciBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzID0gcmVxdWlyZSgnLi4vX2xpYi9nZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzL2luZGV4LmpzJylcbnZhciBpc0RhdGUgPSByZXF1aXJlKCcuLi9pc19kYXRlL2luZGV4LmpzJylcblxudmFyIE1JTExJU0VDT05EU19JTl9IT1VSID0gMzYwMDAwMFxudmFyIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSA2MDAwMFxudmFyIERFRkFVTFRfQURESVRJT05BTF9ESUdJVFMgPSAyXG5cbnZhciBwYXJzZVRva2VuRGF0ZVRpbWVEZWxpbWV0ZXIgPSAvW1QgXS9cbnZhciBwYXJzZVRva2VuUGxhaW5UaW1lID0gLzovXG5cbi8vIHllYXIgdG9rZW5zXG52YXIgcGFyc2VUb2tlbllZID0gL14oXFxkezJ9KSQvXG52YXIgcGFyc2VUb2tlbnNZWVkgPSBbXG4gIC9eKFsrLV1cXGR7Mn0pJC8sIC8vIDAgYWRkaXRpb25hbCBkaWdpdHNcbiAgL14oWystXVxcZHszfSkkLywgLy8gMSBhZGRpdGlvbmFsIGRpZ2l0XG4gIC9eKFsrLV1cXGR7NH0pJC8gLy8gMiBhZGRpdGlvbmFsIGRpZ2l0c1xuXVxuXG52YXIgcGFyc2VUb2tlbllZWVkgPSAvXihcXGR7NH0pL1xudmFyIHBhcnNlVG9rZW5zWVlZWVkgPSBbXG4gIC9eKFsrLV1cXGR7NH0pLywgLy8gMCBhZGRpdGlvbmFsIGRpZ2l0c1xuICAvXihbKy1dXFxkezV9KS8sIC8vIDEgYWRkaXRpb25hbCBkaWdpdFxuICAvXihbKy1dXFxkezZ9KS8gLy8gMiBhZGRpdGlvbmFsIGRpZ2l0c1xuXVxuXG4vLyBkYXRlIHRva2Vuc1xudmFyIHBhcnNlVG9rZW5NTSA9IC9eLShcXGR7Mn0pJC9cbnZhciBwYXJzZVRva2VuREREID0gL14tPyhcXGR7M30pJC9cbnZhciBwYXJzZVRva2VuTU1ERCA9IC9eLT8oXFxkezJ9KS0/KFxcZHsyfSkkL1xudmFyIHBhcnNlVG9rZW5Xd3cgPSAvXi0/VyhcXGR7Mn0pJC9cbnZhciBwYXJzZVRva2VuV3d3RCA9IC9eLT9XKFxcZHsyfSktPyhcXGR7MX0pJC9cblxuLy8gdGltZSB0b2tlbnNcbnZhciBwYXJzZVRva2VuSEggPSAvXihcXGR7Mn0oWy4sXVxcZCopPykkL1xudmFyIHBhcnNlVG9rZW5ISE1NID0gL14oXFxkezJ9KTo/KFxcZHsyfShbLixdXFxkKik/KSQvXG52YXIgcGFyc2VUb2tlbkhITU1TUyA9IC9eKFxcZHsyfSk6PyhcXGR7Mn0pOj8oXFxkezJ9KFsuLF1cXGQqKT8pJC9cblxuLy8gdGltZXpvbmUgdG9rZW5zXG52YXIgcGFyc2VUb2tlblRpbWV6b25lID0gLyhbWistXS4qKSQvXG52YXIgcGFyc2VUb2tlblRpbWV6b25lWiA9IC9eKFopJC9cbnZhciBwYXJzZVRva2VuVGltZXpvbmVISCA9IC9eKFsrLV0pKFxcZHsyfSkkL1xudmFyIHBhcnNlVG9rZW5UaW1lem9uZUhITU0gPSAvXihbKy1dKShcXGR7Mn0pOj8oXFxkezJ9KSQvXG5cbi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiBhbiBhcmd1bWVudCBpcyBhIHN0cmluZywgdGhlIGZ1bmN0aW9uIHRyaWVzIHRvIHBhcnNlIGl0LlxuICogRnVuY3Rpb24gYWNjZXB0cyBjb21wbGV0ZSBJU08gODYwMSBmb3JtYXRzIGFzIHdlbGwgYXMgcGFydGlhbCBpbXBsZW1lbnRhdGlvbnMuXG4gKiBJU08gODYwMTogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMVxuICpcbiAqIElmIGFsbCBhYm92ZSBmYWlscywgdGhlIGZ1bmN0aW9uIHBhc3NlcyB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gRGF0ZSBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gYXJndW1lbnQgLSB0aGUgdmFsdWUgdG8gY29udmVydFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKiBAcGFyYW0gezAgfCAxIHwgMn0gW29wdGlvbnMuYWRkaXRpb25hbERpZ2l0cz0yXSAtIHRoZSBhZGRpdGlvbmFsIG51bWJlciBvZiBkaWdpdHMgaW4gdGhlIGV4dGVuZGVkIHllYXIgZm9ybWF0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCBzdHJpbmcgJzIwMTQtMDItMTFUMTE6MzA6MzAnIHRvIGRhdGU6XG4gKiB2YXIgcmVzdWx0ID0gcGFyc2UoJzIwMTQtMDItMTFUMTE6MzA6MzAnKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUGFyc2Ugc3RyaW5nICcrMDIwMTQxMDEnLFxuICogLy8gaWYgdGhlIGFkZGl0aW9uYWwgbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgZXh0ZW5kZWQgeWVhciBmb3JtYXQgaXMgMTpcbiAqIHZhciByZXN1bHQgPSBwYXJzZSgnKzAyMDE0MTAxJywge2FkZGl0aW9uYWxEaWdpdHM6IDF9KVxuICogLy89PiBGcmkgQXByIDExIDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gcGFyc2UgKGFyZ3VtZW50LCBkaXJ0eU9wdGlvbnMpIHtcbiAgaWYgKGlzRGF0ZShhcmd1bWVudCkpIHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkYXRlIHRvIGxvc2UgdGhlIG1pbGxpc2Vjb25kcyB3aGVuIHBhc3NlZCB0byBuZXcgRGF0ZSgpIGluIElFMTBcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQuZ2V0VGltZSgpKVxuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpXG4gIH1cblxuICB2YXIgb3B0aW9ucyA9IGRpcnR5T3B0aW9ucyB8fCB7fVxuICB2YXIgYWRkaXRpb25hbERpZ2l0cyA9IG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0c1xuICBpZiAoYWRkaXRpb25hbERpZ2l0cyA9PSBudWxsKSB7XG4gICAgYWRkaXRpb25hbERpZ2l0cyA9IERFRkFVTFRfQURESVRJT05BTF9ESUdJVFNcbiAgfSBlbHNlIHtcbiAgICBhZGRpdGlvbmFsRGlnaXRzID0gTnVtYmVyKGFkZGl0aW9uYWxEaWdpdHMpXG4gIH1cblxuICB2YXIgZGF0ZVN0cmluZ3MgPSBzcGxpdERhdGVTdHJpbmcoYXJndW1lbnQpXG5cbiAgdmFyIHBhcnNlWWVhclJlc3VsdCA9IHBhcnNlWWVhcihkYXRlU3RyaW5ncy5kYXRlLCBhZGRpdGlvbmFsRGlnaXRzKVxuICB2YXIgeWVhciA9IHBhcnNlWWVhclJlc3VsdC55ZWFyXG4gIHZhciByZXN0RGF0ZVN0cmluZyA9IHBhcnNlWWVhclJlc3VsdC5yZXN0RGF0ZVN0cmluZ1xuXG4gIHZhciBkYXRlID0gcGFyc2VEYXRlKHJlc3REYXRlU3RyaW5nLCB5ZWFyKVxuXG4gIGlmIChkYXRlKSB7XG4gICAgdmFyIHRpbWVzdGFtcCA9IGRhdGUuZ2V0VGltZSgpXG4gICAgdmFyIHRpbWUgPSAwXG4gICAgdmFyIG9mZnNldFxuXG4gICAgaWYgKGRhdGVTdHJpbmdzLnRpbWUpIHtcbiAgICAgIHRpbWUgPSBwYXJzZVRpbWUoZGF0ZVN0cmluZ3MudGltZSlcbiAgICB9XG5cbiAgICBpZiAoZGF0ZVN0cmluZ3MudGltZXpvbmUpIHtcbiAgICAgIG9mZnNldCA9IHBhcnNlVGltZXpvbmUoZGF0ZVN0cmluZ3MudGltZXpvbmUpICogTUlMTElTRUNPTkRTX0lOX01JTlVURVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZnVsbFRpbWUgPSB0aW1lc3RhbXAgKyB0aW1lXG4gICAgICB2YXIgZnVsbFRpbWVEYXRlID0gbmV3IERhdGUoZnVsbFRpbWUpXG5cbiAgICAgIG9mZnNldCA9IGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoZnVsbFRpbWVEYXRlKVxuXG4gICAgICAvLyBBZGp1c3QgdGltZSB3aGVuIGl0J3MgY29taW5nIGZyb20gRFNUXG4gICAgICB2YXIgZnVsbFRpbWVEYXRlTmV4dERheSA9IG5ldyBEYXRlKGZ1bGxUaW1lKVxuICAgICAgZnVsbFRpbWVEYXRlTmV4dERheS5zZXREYXRlKGZ1bGxUaW1lRGF0ZS5nZXREYXRlKCkgKyAxKVxuICAgICAgdmFyIG9mZnNldERpZmYgPVxuICAgICAgICBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGZ1bGxUaW1lRGF0ZU5leHREYXkpIC1cbiAgICAgICAgZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhmdWxsVGltZURhdGUpXG4gICAgICBpZiAob2Zmc2V0RGlmZiA+IDApIHtcbiAgICAgICAgb2Zmc2V0ICs9IG9mZnNldERpZmZcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERhdGUodGltZXN0YW1wICsgdGltZSArIG9mZnNldClcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpXG4gIH1cbn1cblxuZnVuY3Rpb24gc3BsaXREYXRlU3RyaW5nIChkYXRlU3RyaW5nKSB7XG4gIHZhciBkYXRlU3RyaW5ncyA9IHt9XG4gIHZhciBhcnJheSA9IGRhdGVTdHJpbmcuc3BsaXQocGFyc2VUb2tlbkRhdGVUaW1lRGVsaW1ldGVyKVxuICB2YXIgdGltZVN0cmluZ1xuXG4gIGlmIChwYXJzZVRva2VuUGxhaW5UaW1lLnRlc3QoYXJyYXlbMF0pKSB7XG4gICAgZGF0ZVN0cmluZ3MuZGF0ZSA9IG51bGxcbiAgICB0aW1lU3RyaW5nID0gYXJyYXlbMF1cbiAgfSBlbHNlIHtcbiAgICBkYXRlU3RyaW5ncy5kYXRlID0gYXJyYXlbMF1cbiAgICB0aW1lU3RyaW5nID0gYXJyYXlbMV1cbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nKSB7XG4gICAgdmFyIHRva2VuID0gcGFyc2VUb2tlblRpbWV6b25lLmV4ZWModGltZVN0cmluZylcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWUgPSB0aW1lU3RyaW5nLnJlcGxhY2UodG9rZW5bMV0sICcnKVxuICAgICAgZGF0ZVN0cmluZ3MudGltZXpvbmUgPSB0b2tlblsxXVxuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlU3RyaW5ncy50aW1lID0gdGltZVN0cmluZ1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRlU3RyaW5nc1xufVxuXG5mdW5jdGlvbiBwYXJzZVllYXIgKGRhdGVTdHJpbmcsIGFkZGl0aW9uYWxEaWdpdHMpIHtcbiAgdmFyIHBhcnNlVG9rZW5ZWVkgPSBwYXJzZVRva2Vuc1lZWVthZGRpdGlvbmFsRGlnaXRzXVxuICB2YXIgcGFyc2VUb2tlbllZWVlZID0gcGFyc2VUb2tlbnNZWVlZWVthZGRpdGlvbmFsRGlnaXRzXVxuXG4gIHZhciB0b2tlblxuXG4gIC8vIFlZWVkgb3IgwrFZWVlZWVxuICB0b2tlbiA9IHBhcnNlVG9rZW5ZWVlZLmV4ZWMoZGF0ZVN0cmluZykgfHwgcGFyc2VUb2tlbllZWVlZLmV4ZWMoZGF0ZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgdmFyIHllYXJTdHJpbmcgPSB0b2tlblsxXVxuICAgIHJldHVybiB7XG4gICAgICB5ZWFyOiBwYXJzZUludCh5ZWFyU3RyaW5nLCAxMCksXG4gICAgICByZXN0RGF0ZVN0cmluZzogZGF0ZVN0cmluZy5zbGljZSh5ZWFyU3RyaW5nLmxlbmd0aClcbiAgICB9XG4gIH1cblxuICAvLyBZWSBvciDCsVlZWVxuICB0b2tlbiA9IHBhcnNlVG9rZW5ZWS5leGVjKGRhdGVTdHJpbmcpIHx8IHBhcnNlVG9rZW5ZWVkuZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICB2YXIgY2VudHVyeVN0cmluZyA9IHRva2VuWzFdXG4gICAgcmV0dXJuIHtcbiAgICAgIHllYXI6IHBhcnNlSW50KGNlbnR1cnlTdHJpbmcsIDEwKSAqIDEwMCxcbiAgICAgIHJlc3REYXRlU3RyaW5nOiBkYXRlU3RyaW5nLnNsaWNlKGNlbnR1cnlTdHJpbmcubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB5ZWFyXG4gIHJldHVybiB7XG4gICAgeWVhcjogbnVsbFxuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGF0ZSAoZGF0ZVN0cmluZywgeWVhcikge1xuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgeWVhclxuICBpZiAoeWVhciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICB2YXIgdG9rZW5cbiAgdmFyIGRhdGVcbiAgdmFyIG1vbnRoXG4gIHZhciB3ZWVrXG5cbiAgLy8gWVlZWVxuICBpZiAoZGF0ZVN0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICBkYXRlID0gbmV3IERhdGUoMClcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIpXG4gICAgcmV0dXJuIGRhdGVcbiAgfVxuXG4gIC8vIFlZWVktTU1cbiAgdG9rZW4gPSBwYXJzZVRva2VuTU0uZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBkYXRlID0gbmV3IERhdGUoMClcbiAgICBtb250aCA9IHBhcnNlSW50KHRva2VuWzFdLCAxMCkgLSAxXG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcih5ZWFyLCBtb250aClcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgLy8gWVlZWS1EREQgb3IgWVlZWURERFxuICB0b2tlbiA9IHBhcnNlVG9rZW5EREQuZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBkYXRlID0gbmV3IERhdGUoMClcbiAgICB2YXIgZGF5T2ZZZWFyID0gcGFyc2VJbnQodG9rZW5bMV0sIDEwKVxuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgZGF5T2ZZZWFyKVxuICAgIHJldHVybiBkYXRlXG4gIH1cblxuICAvLyBZWVlZLU1NLUREIG9yIFlZWVlNTUREXG4gIHRva2VuID0gcGFyc2VUb2tlbk1NREQuZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBkYXRlID0gbmV3IERhdGUoMClcbiAgICBtb250aCA9IHBhcnNlSW50KHRva2VuWzFdLCAxMCkgLSAxXG4gICAgdmFyIGRheSA9IHBhcnNlSW50KHRva2VuWzJdLCAxMClcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIsIG1vbnRoLCBkYXkpXG4gICAgcmV0dXJuIGRhdGVcbiAgfVxuXG4gIC8vIFlZWVktV3d3IG9yIFlZWVlXd3dcbiAgdG9rZW4gPSBwYXJzZVRva2VuV3d3LmV4ZWMoZGF0ZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgd2VlayA9IHBhcnNlSW50KHRva2VuWzFdLCAxMCkgLSAxXG4gICAgcmV0dXJuIGRheU9mSVNPWWVhcih5ZWFyLCB3ZWVrKVxuICB9XG5cbiAgLy8gWVlZWS1Xd3ctRCBvciBZWVlZV3d3RFxuICB0b2tlbiA9IHBhcnNlVG9rZW5Xd3dELmV4ZWMoZGF0ZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgd2VlayA9IHBhcnNlSW50KHRva2VuWzFdLCAxMCkgLSAxXG4gICAgdmFyIGRheU9mV2VlayA9IHBhcnNlSW50KHRva2VuWzJdLCAxMCkgLSAxXG4gICAgcmV0dXJuIGRheU9mSVNPWWVhcih5ZWFyLCB3ZWVrLCBkYXlPZldlZWspXG4gIH1cblxuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgZGF0ZVxuICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBwYXJzZVRpbWUgKHRpbWVTdHJpbmcpIHtcbiAgdmFyIHRva2VuXG4gIHZhciBob3Vyc1xuICB2YXIgbWludXRlc1xuXG4gIC8vIGhoXG4gIHRva2VuID0gcGFyc2VUb2tlbkhILmV4ZWModGltZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgaG91cnMgPSBwYXJzZUZsb2F0KHRva2VuWzFdLnJlcGxhY2UoJywnLCAnLicpKVxuICAgIHJldHVybiAoaG91cnMgJSAyNCkgKiBNSUxMSVNFQ09ORFNfSU5fSE9VUlxuICB9XG5cbiAgLy8gaGg6bW0gb3IgaGhtbVxuICB0b2tlbiA9IHBhcnNlVG9rZW5ISE1NLmV4ZWModGltZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgaG91cnMgPSBwYXJzZUludCh0b2tlblsxXSwgMTApXG4gICAgbWludXRlcyA9IHBhcnNlRmxvYXQodG9rZW5bMl0ucmVwbGFjZSgnLCcsICcuJykpXG4gICAgcmV0dXJuIChob3VycyAlIDI0KSAqIE1JTExJU0VDT05EU19JTl9IT1VSICtcbiAgICAgIG1pbnV0ZXMgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFXG4gIH1cblxuICAvLyBoaDptbTpzcyBvciBoaG1tc3NcbiAgdG9rZW4gPSBwYXJzZVRva2VuSEhNTVNTLmV4ZWModGltZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgaG91cnMgPSBwYXJzZUludCh0b2tlblsxXSwgMTApXG4gICAgbWludXRlcyA9IHBhcnNlSW50KHRva2VuWzJdLCAxMClcbiAgICB2YXIgc2Vjb25kcyA9IHBhcnNlRmxvYXQodG9rZW5bM10ucmVwbGFjZSgnLCcsICcuJykpXG4gICAgcmV0dXJuIChob3VycyAlIDI0KSAqIE1JTExJU0VDT05EU19JTl9IT1VSICtcbiAgICAgIG1pbnV0ZXMgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFICtcbiAgICAgIHNlY29uZHMgKiAxMDAwXG4gIH1cblxuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgdGltZVxuICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBwYXJzZVRpbWV6b25lICh0aW1lem9uZVN0cmluZykge1xuICB2YXIgdG9rZW5cbiAgdmFyIGFic29sdXRlT2Zmc2V0XG5cbiAgLy8gWlxuICB0b2tlbiA9IHBhcnNlVG9rZW5UaW1lem9uZVouZXhlYyh0aW1lem9uZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIC8vIMKxaGhcbiAgdG9rZW4gPSBwYXJzZVRva2VuVGltZXpvbmVISC5leGVjKHRpbWV6b25lU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBhYnNvbHV0ZU9mZnNldCA9IHBhcnNlSW50KHRva2VuWzJdLCAxMCkgKiA2MFxuICAgIHJldHVybiAodG9rZW5bMV0gPT09ICcrJykgPyAtYWJzb2x1dGVPZmZzZXQgOiBhYnNvbHV0ZU9mZnNldFxuICB9XG5cbiAgLy8gwrFoaDptbSBvciDCsWhobW1cbiAgdG9rZW4gPSBwYXJzZVRva2VuVGltZXpvbmVISE1NLmV4ZWModGltZXpvbmVTdHJpbmcpXG4gIGlmICh0b2tlbikge1xuICAgIGFic29sdXRlT2Zmc2V0ID0gcGFyc2VJbnQodG9rZW5bMl0sIDEwKSAqIDYwICsgcGFyc2VJbnQodG9rZW5bM10sIDEwKVxuICAgIHJldHVybiAodG9rZW5bMV0gPT09ICcrJykgPyAtYWJzb2x1dGVPZmZzZXQgOiBhYnNvbHV0ZU9mZnNldFxuICB9XG5cbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gZGF5T2ZJU09ZZWFyIChpc29ZZWFyLCB3ZWVrLCBkYXkpIHtcbiAgd2VlayA9IHdlZWsgfHwgMFxuICBkYXkgPSBkYXkgfHwgMFxuICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDApXG4gIGRhdGUuc2V0VVRDRnVsbFllYXIoaXNvWWVhciwgMCwgNClcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeURheSA9IGRhdGUuZ2V0VVRDRGF5KCkgfHwgN1xuICB2YXIgZGlmZiA9IHdlZWsgKiA3ICsgZGF5ICsgMSAtIGZvdXJ0aE9mSmFudWFyeURheVxuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBkaWZmKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTZXQgdGhlIGRheSBvZiB0aGUgbW9udGggdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXQgdGhlIGRheSBvZiB0aGUgbW9udGggdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gZGF5T2ZNb250aCAtIHRoZSBkYXkgb2YgdGhlIG1vbnRoIG9mIHRoZSBuZXcgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBkYXkgb2YgdGhlIG1vbnRoIHNldHRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTZXQgdGhlIDMwdGggZGF5IG9mIHRoZSBtb250aCB0byAxIFNlcHRlbWJlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IHNldERhdGUobmV3IERhdGUoMjAxNCwgOCwgMSksIDMwKVxuICogLy89PiBUdWUgU2VwIDMwIDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc2V0RGF0ZSAoZGlydHlEYXRlLCBkaXJ0eURheU9mTW9udGgpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBkYXlPZk1vbnRoID0gTnVtYmVyKGRpcnR5RGF5T2ZNb250aClcbiAgZGF0ZS5zZXREYXRlKGRheU9mTW9udGgpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0RGF0ZVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxudmFyIGFkZERheXMgPSByZXF1aXJlKCcuLi9hZGRfZGF5cy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWtkYXkgSGVscGVyc1xuICogQHN1bW1hcnkgU2V0IHRoZSBkYXkgb2YgdGhlIHdlZWsgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXQgdGhlIGRheSBvZiB0aGUgd2VlayB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBkYXkgLSB0aGUgZGF5IG9mIHRoZSB3ZWVrIG9mIHRoZSBuZXcgZGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2Vla1N0YXJ0c09uPTBdIC0gdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgKDAgLSBTdW5kYXkpXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIGRheSBvZiB0aGUgd2VlayBzZXR0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU2V0IFN1bmRheSB0byAxIFNlcHRlbWJlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IHNldERheShuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgMClcbiAqIC8vPT4gU3VuIEF1ZyAzMSAyMDE0IDAwOjAwOjAwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHdlZWsgc3RhcnRzIHdpdGggTW9uZGF5LCBzZXQgU3VuZGF5IHRvIDEgU2VwdGVtYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gc2V0RGF5KG5ldyBEYXRlKDIwMTQsIDgsIDEpLCAwLCB7d2Vla1N0YXJ0c09uOiAxfSlcbiAqIC8vPT4gU3VuIFNlcCAwNyAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHNldERheSAoZGlydHlEYXRlLCBkaXJ0eURheSwgZGlydHlPcHRpb25zKSB7XG4gIHZhciB3ZWVrU3RhcnRzT24gPSBkaXJ0eU9wdGlvbnMgPyAoTnVtYmVyKGRpcnR5T3B0aW9ucy53ZWVrU3RhcnRzT24pIHx8IDApIDogMFxuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGRheSA9IE51bWJlcihkaXJ0eURheSlcbiAgdmFyIGN1cnJlbnREYXkgPSBkYXRlLmdldERheSgpXG5cbiAgdmFyIHJlbWFpbmRlciA9IGRheSAlIDdcbiAgdmFyIGRheUluZGV4ID0gKHJlbWFpbmRlciArIDcpICUgN1xuXG4gIHZhciBkaWZmID0gKGRheUluZGV4IDwgd2Vla1N0YXJ0c09uID8gNyA6IDApICsgZGF5IC0gY3VycmVudERheVxuICByZXR1cm4gYWRkRGF5cyhkYXRlLCBkaWZmKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldERheVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgU2V0IHRoZSBkYXkgb2YgdGhlIHllYXIgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXQgdGhlIGRheSBvZiB0aGUgeWVhciB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBkYXlPZlllYXIgLSB0aGUgZGF5IG9mIHRoZSB5ZWFyIG9mIHRoZSBuZXcgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBkYXkgb2YgdGhlIHllYXIgc2V0dGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNldCB0aGUgMm5kIGRheSBvZiB0aGUgeWVhciB0byAyIEp1bHkgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBzZXREYXlPZlllYXIobmV3IERhdGUoMjAxNCwgNiwgMiksIDIpXG4gKiAvLz0+IFRodSBKYW4gMDIgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzZXREYXlPZlllYXIgKGRpcnR5RGF0ZSwgZGlydHlEYXlPZlllYXIpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBkYXlPZlllYXIgPSBOdW1iZXIoZGlydHlEYXlPZlllYXIpXG4gIGRhdGUuc2V0TW9udGgoMClcbiAgZGF0ZS5zZXREYXRlKGRheU9mWWVhcilcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXREYXlPZlllYXJcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSG91ciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTZXQgdGhlIGhvdXJzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU2V0IHRoZSBob3VycyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBob3VycyAtIHRoZSBob3VycyBvZiB0aGUgbmV3IGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgaG91cnMgc2V0dGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNldCA0IGhvdXJzIHRvIDEgU2VwdGVtYmVyIDIwMTQgMTE6MzA6MDA6XG4gKiB2YXIgcmVzdWx0ID0gc2V0SG91cnMobmV3IERhdGUoMjAxNCwgOCwgMSwgMTEsIDMwKSwgNClcbiAqIC8vPT4gTW9uIFNlcCAwMSAyMDE0IDA0OjMwOjAwXG4gKi9cbmZ1bmN0aW9uIHNldEhvdXJzIChkaXJ0eURhdGUsIGRpcnR5SG91cnMpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBob3VycyA9IE51bWJlcihkaXJ0eUhvdXJzKVxuICBkYXRlLnNldEhvdXJzKGhvdXJzKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEhvdXJzXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG52YXIgYWRkRGF5cyA9IHJlcXVpcmUoJy4uL2FkZF9kYXlzL2luZGV4LmpzJylcbnZhciBnZXRJU09EYXkgPSByZXF1aXJlKCcuLi9nZXRfaXNvX2RheS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFdlZWtkYXkgSGVscGVyc1xuICogQHN1bW1hcnkgU2V0IHRoZSBkYXkgb2YgdGhlIElTTyB3ZWVrIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU2V0IHRoZSBkYXkgb2YgdGhlIElTTyB3ZWVrIHRvIHRoZSBnaXZlbiBkYXRlLlxuICogSVNPIHdlZWsgc3RhcnRzIHdpdGggTW9uZGF5LlxuICogNyBpcyB0aGUgaW5kZXggb2YgU3VuZGF5LCAxIGlzIHRoZSBpbmRleCBvZiBNb25kYXkgZXRjLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGRheSAtIHRoZSBkYXkgb2YgdGhlIElTTyB3ZWVrIG9mIHRoZSBuZXcgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBkYXkgb2YgdGhlIElTTyB3ZWVrIHNldHRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTZXQgU3VuZGF5IHRvIDEgU2VwdGVtYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gc2V0SVNPRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDEpLCA3KVxuICogLy89PiBTdW4gU2VwIDA3IDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc2V0SVNPRGF5IChkaXJ0eURhdGUsIGRpcnR5RGF5KSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgZGF5ID0gTnVtYmVyKGRpcnR5RGF5KVxuICB2YXIgY3VycmVudERheSA9IGdldElTT0RheShkYXRlKVxuICB2YXIgZGlmZiA9IGRheSAtIGN1cnJlbnREYXlcbiAgcmV0dXJuIGFkZERheXMoZGF0ZSwgZGlmZilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRJU09EYXlcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBnZXRJU09XZWVrID0gcmVxdWlyZSgnLi4vZ2V0X2lzb193ZWVrL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgU2V0IHRoZSBJU08gd2VlayB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFNldCB0aGUgSVNPIHdlZWsgdG8gdGhlIGdpdmVuIGRhdGUsIHNhdmluZyB0aGUgd2Vla2RheSBudW1iZXIuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGlzb1dlZWsgLSB0aGUgSVNPIHdlZWsgb2YgdGhlIG5ldyBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIElTTyB3ZWVrIHNldHRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTZXQgdGhlIDUzcmQgSVNPIHdlZWsgdG8gNyBBdWd1c3QgMjAwNDpcbiAqIHZhciByZXN1bHQgPSBzZXRJU09XZWVrKG5ldyBEYXRlKDIwMDQsIDcsIDcpLCA1MylcbiAqIC8vPT4gU2F0IEphbiAwMSAyMDA1IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHNldElTT1dlZWsgKGRpcnR5RGF0ZSwgZGlydHlJU09XZWVrKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgaXNvV2VlayA9IE51bWJlcihkaXJ0eUlTT1dlZWspXG4gIHZhciBkaWZmID0gZ2V0SVNPV2VlayhkYXRlKSAtIGlzb1dlZWtcbiAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gZGlmZiAqIDcpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0SVNPV2Vla1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxudmFyIHN0YXJ0T2ZJU09ZZWFyID0gcmVxdWlyZSgnLi4vc3RhcnRfb2ZfaXNvX3llYXIvaW5kZXguanMnKVxudmFyIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyA9IHJlcXVpcmUoJy4uL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfZGF5cy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IElTTyBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFNldCB0aGUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXQgdGhlIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIHRvIHRoZSBnaXZlbiBkYXRlLFxuICogc2F2aW5nIHRoZSB3ZWVrIG51bWJlciBhbmQgdGhlIHdlZWtkYXkgbnVtYmVyLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBpc29ZZWFyIC0gdGhlIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIG9mIHRoZSBuZXcgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBzZXR0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU2V0IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIDIwMDcgdG8gMjkgRGVjZW1iZXIgMjAwODpcbiAqIHZhciByZXN1bHQgPSBzZXRJU09ZZWFyKG5ldyBEYXRlKDIwMDgsIDExLCAyOSksIDIwMDcpXG4gKiAvLz0+IE1vbiBKYW4gMDEgMjAwNyAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzZXRJU09ZZWFyIChkaXJ0eURhdGUsIGRpcnR5SVNPWWVhcikge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGlzb1llYXIgPSBOdW1iZXIoZGlydHlJU09ZZWFyKVxuICB2YXIgZGlmZiA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlLCBzdGFydE9mSVNPWWVhcihkYXRlKSlcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeSA9IG5ldyBEYXRlKDApXG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRGdWxsWWVhcihpc29ZZWFyLCAwLCA0KVxuICBmb3VydGhPZkphbnVhcnkuc2V0SG91cnMoMCwgMCwgMCwgMClcbiAgZGF0ZSA9IHN0YXJ0T2ZJU09ZZWFyKGZvdXJ0aE9mSmFudWFyeSlcbiAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgZGlmZilcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRJU09ZZWFyXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1pbGxpc2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFNldCB0aGUgbWlsbGlzZWNvbmRzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU2V0IHRoZSBtaWxsaXNlY29uZHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gbWlsbGlzZWNvbmRzIC0gdGhlIG1pbGxpc2Vjb25kcyBvZiB0aGUgbmV3IGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbWlsbGlzZWNvbmRzIHNldHRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTZXQgMzAwIG1pbGxpc2Vjb25kcyB0byAxIFNlcHRlbWJlciAyMDE0IDExOjMwOjQwLjUwMDpcbiAqIHZhciByZXN1bHQgPSBzZXRNaWxsaXNlY29uZHMobmV3IERhdGUoMjAxNCwgOCwgMSwgMTEsIDMwLCA0MCwgNTAwKSwgMzAwKVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMTE6MzA6NDAuMzAwXG4gKi9cbmZ1bmN0aW9uIHNldE1pbGxpc2Vjb25kcyAoZGlydHlEYXRlLCBkaXJ0eU1pbGxpc2Vjb25kcykge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIG1pbGxpc2Vjb25kcyA9IE51bWJlcihkaXJ0eU1pbGxpc2Vjb25kcylcbiAgZGF0ZS5zZXRNaWxsaXNlY29uZHMobWlsbGlzZWNvbmRzKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldE1pbGxpc2Vjb25kc1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNaW51dGUgSGVscGVyc1xuICogQHN1bW1hcnkgU2V0IHRoZSBtaW51dGVzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU2V0IHRoZSBtaW51dGVzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG1pbnV0ZXMgLSB0aGUgbWludXRlcyBvZiB0aGUgbmV3IGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbWludXRlcyBzZXR0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU2V0IDQ1IG1pbnV0ZXMgdG8gMSBTZXB0ZW1iZXIgMjAxNCAxMTozMDo0MDpcbiAqIHZhciByZXN1bHQgPSBzZXRNaW51dGVzKG5ldyBEYXRlKDIwMTQsIDgsIDEsIDExLCAzMCwgNDApLCA0NSlcbiAqIC8vPT4gTW9uIFNlcCAwMSAyMDE0IDExOjQ1OjQwXG4gKi9cbmZ1bmN0aW9uIHNldE1pbnV0ZXMgKGRpcnR5RGF0ZSwgZGlydHlNaW51dGVzKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICB2YXIgbWludXRlcyA9IE51bWJlcihkaXJ0eU1pbnV0ZXMpXG4gIGRhdGUuc2V0TWludXRlcyhtaW51dGVzKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldE1pbnV0ZXNcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcbnZhciBnZXREYXlzSW5Nb250aCA9IHJlcXVpcmUoJy4uL2dldF9kYXlzX2luX21vbnRoL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgU2V0IHRoZSBtb250aCB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFNldCB0aGUgbW9udGggdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gbW9udGggLSB0aGUgbW9udGggb2YgdGhlIG5ldyBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1vbnRoIHNldHRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTZXQgRmVicnVhcnkgdG8gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBzZXRNb250aChuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgMSlcbiAqIC8vPT4gU2F0IEZlYiAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHNldE1vbnRoIChkaXJ0eURhdGUsIGRpcnR5TW9udGgpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBtb250aCA9IE51bWJlcihkaXJ0eU1vbnRoKVxuICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKClcblxuICB2YXIgZGF0ZVdpdGhEZXNpcmVkTW9udGggPSBuZXcgRGF0ZSgwKVxuICBkYXRlV2l0aERlc2lyZWRNb250aC5zZXRGdWxsWWVhcih5ZWFyLCBtb250aCwgMTUpXG4gIGRhdGVXaXRoRGVzaXJlZE1vbnRoLnNldEhvdXJzKDAsIDAsIDAsIDApXG4gIHZhciBkYXlzSW5Nb250aCA9IGdldERheXNJbk1vbnRoKGRhdGVXaXRoRGVzaXJlZE1vbnRoKVxuICAvLyBTZXQgdGhlIGxhc3QgZGF5IG9mIHRoZSBuZXcgbW9udGhcbiAgLy8gaWYgdGhlIG9yaWdpbmFsIGRhdGUgd2FzIHRoZSBsYXN0IGRheSBvZiB0aGUgbG9uZ2VyIG1vbnRoXG4gIGRhdGUuc2V0TW9udGgobW9udGgsIE1hdGgubWluKGRheSwgZGF5c0luTW9udGgpKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldE1vbnRoXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG52YXIgc2V0TW9udGggPSByZXF1aXJlKCcuLi9zZXRfbW9udGgvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBRdWFydGVyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFNldCB0aGUgeWVhciBxdWFydGVyIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU2V0IHRoZSB5ZWFyIHF1YXJ0ZXIgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gcXVhcnRlciAtIHRoZSBxdWFydGVyIG9mIHRoZSBuZXcgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBxdWFydGVyIHNldHRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTZXQgdGhlIDJuZCBxdWFydGVyIHRvIDIgSnVseSAyMDE0OlxuICogdmFyIHJlc3VsdCA9IHNldFF1YXJ0ZXIobmV3IERhdGUoMjAxNCwgNiwgMiksIDIpXG4gKiAvLz0+IFdlZCBBcHIgMDIgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzZXRRdWFydGVyIChkaXJ0eURhdGUsIGRpcnR5UXVhcnRlcikge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIHF1YXJ0ZXIgPSBOdW1iZXIoZGlydHlRdWFydGVyKVxuICB2YXIgb2xkUXVhcnRlciA9IE1hdGguZmxvb3IoZGF0ZS5nZXRNb250aCgpIC8gMykgKyAxXG4gIHZhciBkaWZmID0gcXVhcnRlciAtIG9sZFF1YXJ0ZXJcbiAgcmV0dXJuIHNldE1vbnRoKGRhdGUsIGRhdGUuZ2V0TW9udGgoKSArIGRpZmYgKiAzKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFF1YXJ0ZXJcbiIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgU2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFNldCB0aGUgc2Vjb25kcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFNldCB0aGUgc2Vjb25kcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzZWNvbmRzIC0gdGhlIHNlY29uZHMgb2YgdGhlIG5ldyBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIHNlY29uZHMgc2V0dGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNldCA0NSBzZWNvbmRzIHRvIDEgU2VwdGVtYmVyIDIwMTQgMTE6MzA6NDA6XG4gKiB2YXIgcmVzdWx0ID0gc2V0U2Vjb25kcyhuZXcgRGF0ZSgyMDE0LCA4LCAxLCAxMSwgMzAsIDQwKSwgNDUpXG4gKiAvLz0+IE1vbiBTZXAgMDEgMjAxNCAxMTozMDo0NVxuICovXG5mdW5jdGlvbiBzZXRTZWNvbmRzIChkaXJ0eURhdGUsIGRpcnR5U2Vjb25kcykge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIHNlY29uZHMgPSBOdW1iZXIoZGlydHlTZWNvbmRzKVxuICBkYXRlLnNldFNlY29uZHMoc2Vjb25kcylcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRTZWNvbmRzXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgU2V0IHRoZSB5ZWFyIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU2V0IHRoZSB5ZWFyIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IHllYXIgLSB0aGUgeWVhciBvZiB0aGUgbmV3IGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgeWVhciBzZXR0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU2V0IHllYXIgMjAxMyB0byAxIFNlcHRlbWJlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IHNldFllYXIobmV3IERhdGUoMjAxNCwgOCwgMSksIDIwMTMpXG4gKiAvLz0+IFN1biBTZXAgMDEgMjAxMyAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzZXRZZWFyIChkaXJ0eURhdGUsIGRpcnR5WWVhcikge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIHllYXIgPSBOdW1iZXIoZGlydHlZZWFyKVxuICBkYXRlLnNldEZ1bGxZZWFyKHllYXIpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0WWVhclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIGRheSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiBhIGRheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSBkYXkgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgU2VwIDAyIDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc3RhcnRPZkRheSAoZGlydHlEYXRlKSB7XG4gIHZhciBkYXRlID0gcGFyc2UoZGlydHlEYXRlKVxuICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhcnRPZkRheVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBIb3VyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYW4gaG91ciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIGhvdXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIGFuIGhvdXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGFuIGhvdXIgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gc3RhcnRPZkhvdXIobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1KSlcbiAqIC8vPT4gVHVlIFNlcCAwMiAyMDE0IDExOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0T2ZIb3VyIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIGRhdGUuc2V0TWludXRlcygwLCAwLCAwKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXJ0T2ZIb3VyXG4iLCJ2YXIgc3RhcnRPZldlZWsgPSByZXF1aXJlKCcuLi9zdGFydF9vZl93ZWVrL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhbiBJU08gd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgc3RhcnQgb2YgYW4gSVNPIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogdmFyIHJlc3VsdCA9IHN0YXJ0T2ZJU09XZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IE1vbiBTZXAgMDEgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzdGFydE9mSVNPV2VlayAoZGlydHlEYXRlKSB7XG4gIHJldHVybiBzdGFydE9mV2VlayhkaXJ0eURhdGUsIHt3ZWVrU3RhcnRzT246IDF9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXJ0T2ZJU09XZWVrXG4iLCJ2YXIgZ2V0SVNPWWVhciA9IHJlcXVpcmUoJy4uL2dldF9pc29feWVhci9pbmRleC5qcycpXG52YXIgc3RhcnRPZklTT1dlZWsgPSByZXF1aXJlKCcuLi9zdGFydF9vZl9pc29fd2Vlay9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IElTTyBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhbiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcixcbiAqIHdoaWNoIGFsd2F5cyBzdGFydHMgMyBkYXlzIGJlZm9yZSB0aGUgeWVhcidzIGZpcnN0IFRodXJzZGF5LlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiBhbiBJU08geWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgZm9yIDIgSnVseSAyMDA1OlxuICogdmFyIHJlc3VsdCA9IHN0YXJ0T2ZJU09ZZWFyKG5ldyBEYXRlKDIwMDUsIDYsIDIpKVxuICogLy89PiBNb24gSmFuIDAzIDIwMDUgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc3RhcnRPZklTT1llYXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgeWVhciA9IGdldElTT1llYXIoZGlydHlEYXRlKVxuICB2YXIgZm91cnRoT2ZKYW51YXJ5ID0gbmV3IERhdGUoMClcbiAgZm91cnRoT2ZKYW51YXJ5LnNldEZ1bGxZZWFyKHllYXIsIDAsIDQpXG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRIb3VycygwLCAwLCAwLCAwKVxuICB2YXIgZGF0ZSA9IHN0YXJ0T2ZJU09XZWVrKGZvdXJ0aE9mSmFudWFyeSlcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFydE9mSVNPWWVhclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNaW51dGUgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIG1pbnV0ZSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgbWludXRlIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiBhIG1pbnV0ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSBtaW51dGUgZm9yIDEgRGVjZW1iZXIgMjAxNCAyMjoxNTo0NS40MDA6XG4gKiB2YXIgcmVzdWx0ID0gc3RhcnRPZk1pbnV0ZShuZXcgRGF0ZSgyMDE0LCAxMSwgMSwgMjIsIDE1LCA0NSwgNDAwKSlcbiAqIC8vPT4gTW9uIERlYyAwMSAyMDE0IDIyOjE1OjAwXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0T2ZNaW51dGUgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgZGF0ZS5zZXRTZWNvbmRzKDAsIDApXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhcnRPZk1pbnV0ZVxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgbW9udGggZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIG1vbnRoIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiBhIG1vbnRoXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIG1vbnRoIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogdmFyIHJlc3VsdCA9IHN0YXJ0T2ZNb250aChuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc3RhcnRPZk1vbnRoIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIGRhdGUuc2V0RGF0ZSgxKVxuICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhcnRPZk1vbnRoXG4iLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFF1YXJ0ZXIgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIHllYXIgcXVhcnRlciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgeWVhciBxdWFydGVyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiBhIHF1YXJ0ZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgcXVhcnRlciBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBzdGFydE9mUXVhcnRlcihuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgSnVsIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc3RhcnRPZlF1YXJ0ZXIgKGRpcnR5RGF0ZSkge1xuICB2YXIgZGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGN1cnJlbnRNb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICB2YXIgbW9udGggPSBjdXJyZW50TW9udGggLSBjdXJyZW50TW9udGggJSAzXG4gIGRhdGUuc2V0TW9udGgobW9udGgsIDEpXG4gIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMClcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFydE9mUXVhcnRlclxuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBTZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIHNlY29uZCBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgc2Vjb25kIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiBhIHNlY29uZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSBzZWNvbmQgZm9yIDEgRGVjZW1iZXIgMjAxNCAyMjoxNTo0NS40MDA6XG4gKiB2YXIgcmVzdWx0ID0gc3RhcnRPZlNlY29uZChuZXcgRGF0ZSgyMDE0LCAxMSwgMSwgMjIsIDE1LCA0NSwgNDAwKSlcbiAqIC8vPT4gTW9uIERlYyAwMSAyMDE0IDIyOjE1OjQ1LjAwMFxuICovXG5mdW5jdGlvbiBzdGFydE9mU2Vjb25kIChkaXJ0eURhdGUpIHtcbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhcnRPZlNlY29uZFxuIiwidmFyIHN0YXJ0T2ZEYXkgPSByZXF1aXJlKCcuLi9zdGFydF9vZl9kYXkvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiB0b2RheS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgdG9kYXkuXG4gKlxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiB0b2RheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyA2IE9jdG9iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBzdGFydE9mVG9kYXkoKVxuICogLy89PiBNb24gT2N0IDYgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzdGFydE9mVG9kYXkgKCkge1xuICByZXR1cm4gc3RhcnRPZkRheShuZXcgRGF0ZSgpKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXJ0T2ZUb2RheVxuIiwiLyoqXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgdG9tb3Jyb3cuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIHRvbW9ycm93LlxuICpcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgc3RhcnQgb2YgdG9tb3Jyb3dcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gc3RhcnRPZlRvbW9ycm93KClcbiAqIC8vPT4gVHVlIE9jdCA3IDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc3RhcnRPZlRvbW9ycm93ICgpIHtcbiAgdmFyIG5vdyA9IG5ldyBEYXRlKClcbiAgdmFyIHllYXIgPSBub3cuZ2V0RnVsbFllYXIoKVxuICB2YXIgbW9udGggPSBub3cuZ2V0TW9udGgoKVxuICB2YXIgZGF5ID0gbm93LmdldERhdGUoKVxuXG4gIHZhciBkYXRlID0gbmV3IERhdGUoMClcbiAgZGF0ZS5zZXRGdWxsWWVhcih5ZWFyLCBtb250aCwgZGF5ICsgMSlcbiAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXJ0T2ZUb21vcnJvd1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2Vla1N0YXJ0c09uPTBdIC0gdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgKDAgLSBTdW5kYXkpXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIGEgd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogdmFyIHJlc3VsdCA9IHN0YXJ0T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFN1biBBdWcgMzEgMjAxNCAwMDowMDowMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0aGUgd2VlayBzdGFydHMgb24gTW9uZGF5LCB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gc3RhcnRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSwge3dlZWtTdGFydHNPbjogMX0pXG4gKiAvLz0+IE1vbiBTZXAgMDEgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzdGFydE9mV2VlayAoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIHdlZWtTdGFydHNPbiA9IGRpcnR5T3B0aW9ucyA/IChOdW1iZXIoZGlydHlPcHRpb25zLndlZWtTdGFydHNPbikgfHwgMCkgOiAwXG5cbiAgdmFyIGRhdGUgPSBwYXJzZShkaXJ0eURhdGUpXG4gIHZhciBkYXkgPSBkYXRlLmdldERheSgpXG4gIHZhciBkaWZmID0gKGRheSA8IHdlZWtTdGFydHNPbiA/IDcgOiAwKSArIGRheSAtIHdlZWtTdGFydHNPblxuXG4gIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIGRpZmYpXG4gIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMClcbiAgcmV0dXJuIGRhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFydE9mV2Vla1xuIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiBhIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgeWVhciBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIHZhciByZXN1bHQgPSBzdGFydE9mWWVhcihuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDAwKSlcbiAqIC8vPT4gV2VkIEphbiAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0T2ZZZWFyIChkaXJ0eURhdGUpIHtcbiAgdmFyIGNsZWFuRGF0ZSA9IHBhcnNlKGRpcnR5RGF0ZSlcbiAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgwKVxuICBkYXRlLnNldEZ1bGxZZWFyKGNsZWFuRGF0ZS5nZXRGdWxsWWVhcigpLCAwLCAxKVxuICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhcnRPZlllYXJcbiIsIi8qKlxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIHllc3RlcmRheS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgeWVzdGVyZGF5LlxuICpcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgc3RhcnQgb2YgeWVzdGVyZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDYgT2N0b2JlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IHN0YXJ0T2ZZZXN0ZXJkYXkoKVxuICogLy89PiBTdW4gT2N0IDUgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzdGFydE9mWWVzdGVyZGF5ICgpIHtcbiAgdmFyIG5vdyA9IG5ldyBEYXRlKClcbiAgdmFyIHllYXIgPSBub3cuZ2V0RnVsbFllYXIoKVxuICB2YXIgbW9udGggPSBub3cuZ2V0TW9udGgoKVxuICB2YXIgZGF5ID0gbm93LmdldERhdGUoKVxuXG4gIHZhciBkYXRlID0gbmV3IERhdGUoMClcbiAgZGF0ZS5zZXRGdWxsWWVhcih5ZWFyLCBtb250aCwgZGF5IC0gMSlcbiAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXJ0T2ZZZXN0ZXJkYXlcbiIsInZhciBhZGREYXlzID0gcmVxdWlyZSgnLi4vYWRkX2RheXMvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgZGF5cyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgZGF5cyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgZGF5cyB0byBiZSBzdWJ0cmFjdGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIGRheXMgc3VidHJhY3RlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdWJ0cmFjdCAxMCBkYXlzIGZyb20gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBzdWJEYXlzKG5ldyBEYXRlKDIwMTQsIDgsIDEpLCAxMClcbiAqIC8vPT4gRnJpIEF1ZyAyMiAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHN1YkRheXMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgcmV0dXJuIGFkZERheXMoZGlydHlEYXRlLCAtYW1vdW50KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1YkRheXNcbiIsInZhciBhZGRIb3VycyA9IHJlcXVpcmUoJy4uL2FkZF9ob3Vycy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IEhvdXIgSGVscGVyc1xuICogQHN1bW1hcnkgU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgaG91cnMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGhvdXJzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBob3VycyB0byBiZSBzdWJ0cmFjdGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIGhvdXJzIHN1YnRyYWN0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3VidHJhY3QgMiBob3VycyBmcm9tIDExIEp1bHkgMjAxNCAwMTowMDowMDpcbiAqIHZhciByZXN1bHQgPSBzdWJIb3VycyhuZXcgRGF0ZSgyMDE0LCA2LCAxMSwgMSwgMCksIDIpXG4gKiAvLz0+IFRodSBKdWwgMTAgMjAxNCAyMzowMDowMFxuICovXG5mdW5jdGlvbiBzdWJIb3VycyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KVxuICByZXR1cm4gYWRkSG91cnMoZGlydHlEYXRlLCAtYW1vdW50KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1YkhvdXJzXG4iLCJ2YXIgYWRkSVNPWWVhcnMgPSByZXF1aXJlKCcuLi9hZGRfaXNvX3llYXJzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWstTnVtYmVyaW5nIFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgdG8gYmUgc3VidHJhY3RlZFxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgc3VidHJhY3RlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdWJ0cmFjdCA1IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFycyBmcm9tIDEgU2VwdGVtYmVyIDIwMTQ6XG4gKiB2YXIgcmVzdWx0ID0gc3ViSVNPWWVhcnMobmV3IERhdGUoMjAxNCwgOCwgMSksIDUpXG4gKiAvLz0+IE1vbiBBdWcgMzEgMjAwOSAwMDowMDowMFxuICovXG5mdW5jdGlvbiBzdWJJU09ZZWFycyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KVxuICByZXR1cm4gYWRkSVNPWWVhcnMoZGlydHlEYXRlLCAtYW1vdW50KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1YklTT1llYXJzXG4iLCJ2YXIgYWRkTWlsbGlzZWNvbmRzID0gcmVxdWlyZSgnLi4vYWRkX21pbGxpc2Vjb25kcy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1pbGxpc2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBtaWxsaXNlY29uZHMgdG8gYmUgc3VidHJhY3RlZFxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBtaWxsaXNlY29uZHMgc3VidHJhY3RlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdWJ0cmFjdCA3NTAgbWlsbGlzZWNvbmRzIGZyb20gMTAgSnVseSAyMDE0IDEyOjQ1OjMwLjAwMDpcbiAqIHZhciByZXN1bHQgPSBzdWJNaWxsaXNlY29uZHMobmV3IERhdGUoMjAxNCwgNiwgMTAsIDEyLCA0NSwgMzAsIDApLCA3NTApXG4gKiAvLz0+IFRodSBKdWwgMTAgMjAxNCAxMjo0NToyOS4yNTBcbiAqL1xuZnVuY3Rpb24gc3ViTWlsbGlzZWNvbmRzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHJldHVybiBhZGRNaWxsaXNlY29uZHMoZGlydHlEYXRlLCAtYW1vdW50KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1Yk1pbGxpc2Vjb25kc1xuIiwidmFyIGFkZE1pbnV0ZXMgPSByZXF1aXJlKCcuLi9hZGRfbWludXRlcy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1pbnV0ZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaW51dGVzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaW51dGVzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBtaW51dGVzIHRvIGJlIHN1YnRyYWN0ZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbWludHVlcyBzdWJ0cmFjdGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN1YnRyYWN0IDMwIG1pbnV0ZXMgZnJvbSAxMCBKdWx5IDIwMTQgMTI6MDA6MDA6XG4gKiB2YXIgcmVzdWx0ID0gc3ViTWludXRlcyhuZXcgRGF0ZSgyMDE0LCA2LCAxMCwgMTIsIDApLCAzMClcbiAqIC8vPT4gVGh1IEp1bCAxMCAyMDE0IDExOjMwOjAwXG4gKi9cbmZ1bmN0aW9uIHN1Yk1pbnV0ZXMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgcmV0dXJuIGFkZE1pbnV0ZXMoZGlydHlEYXRlLCAtYW1vdW50KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1Yk1pbnV0ZXNcbiIsInZhciBhZGRNb250aHMgPSByZXF1aXJlKCcuLi9hZGRfbW9udGhzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbW9udGhzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtb250aHMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIG1vbnRocyB0byBiZSBzdWJ0cmFjdGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1vbnRocyBzdWJ0cmFjdGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN1YnRyYWN0IDUgbW9udGhzIGZyb20gMSBGZWJydWFyeSAyMDE1OlxuICogdmFyIHJlc3VsdCA9IHN1Yk1vbnRocyhuZXcgRGF0ZSgyMDE1LCAxLCAxKSwgNSlcbiAqIC8vPT4gTW9uIFNlcCAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHN1Yk1vbnRocyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KVxuICByZXR1cm4gYWRkTW9udGhzKGRpcnR5RGF0ZSwgLWFtb3VudClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdWJNb250aHNcbiIsInZhciBhZGRRdWFydGVycyA9IHJlcXVpcmUoJy4uL2FkZF9xdWFydGVycy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFF1YXJ0ZXIgSGVscGVyc1xuICogQHN1bW1hcnkgU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgeWVhciBxdWFydGVycyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgeWVhciBxdWFydGVycyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgcXVhcnRlcnMgdG8gYmUgc3VidHJhY3RlZFxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBxdWFydGVycyBzdWJ0cmFjdGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN1YnRyYWN0IDMgcXVhcnRlcnMgZnJvbSAxIFNlcHRlbWJlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IHN1YlF1YXJ0ZXJzKG5ldyBEYXRlKDIwMTQsIDgsIDEpLCAzKVxuICogLy89PiBTdW4gRGVjIDAxIDIwMTMgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc3ViUXVhcnRlcnMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgcmV0dXJuIGFkZFF1YXJ0ZXJzKGRpcnR5RGF0ZSwgLWFtb3VudClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdWJRdWFydGVyc1xuIiwidmFyIGFkZFNlY29uZHMgPSByZXF1aXJlKCcuLi9hZGRfc2Vjb25kcy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IFNlY29uZCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBzZWNvbmRzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBzZWNvbmRzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBzZWNvbmRzIHRvIGJlIHN1YnRyYWN0ZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgc2Vjb25kcyBzdWJ0cmFjdGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN1YnRyYWN0IDMwIHNlY29uZHMgZnJvbSAxMCBKdWx5IDIwMTQgMTI6NDU6MDA6XG4gKiB2YXIgcmVzdWx0ID0gc3ViU2Vjb25kcyhuZXcgRGF0ZSgyMDE0LCA2LCAxMCwgMTIsIDQ1LCAwKSwgMzApXG4gKiAvLz0+IFRodSBKdWwgMTAgMjAxNCAxMjo0NDozMFxuICovXG5mdW5jdGlvbiBzdWJTZWNvbmRzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHJldHVybiBhZGRTZWNvbmRzKGRpcnR5RGF0ZSwgLWFtb3VudClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdWJTZWNvbmRzXG4iLCJ2YXIgYWRkV2Vla3MgPSByZXF1aXJlKCcuLi9hZGRfd2Vla3MvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHdlZWtzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiB3ZWVrcyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2Ygd2Vla3MgdG8gYmUgc3VidHJhY3RlZFxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSB3ZWVrcyBzdWJ0cmFjdGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN1YnRyYWN0IDQgd2Vla3MgZnJvbSAxIFNlcHRlbWJlciAyMDE0OlxuICogdmFyIHJlc3VsdCA9IHN1YldlZWtzKG5ldyBEYXRlKDIwMTQsIDgsIDEpLCA0KVxuICogLy89PiBNb24gQXVnIDA0IDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gc3ViV2Vla3MgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudClcbiAgcmV0dXJuIGFkZFdlZWtzKGRpcnR5RGF0ZSwgLWFtb3VudClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdWJXZWVrc1xuIiwidmFyIGFkZFllYXJzID0gcmVxdWlyZSgnLi4vYWRkX3llYXJzL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiB5ZWFycyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgeWVhcnMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIHllYXJzIHRvIGJlIHN1YnRyYWN0ZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgeWVhcnMgc3VidHJhY3RlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdWJ0cmFjdCA1IHllYXJzIGZyb20gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIHZhciByZXN1bHQgPSBzdWJZZWFycyhuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgNSlcbiAqIC8vPT4gVHVlIFNlcCAwMSAyMDA5IDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHN1YlllYXJzIChkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpXG4gIHJldHVybiBhZGRZZWFycyhkaXJ0eURhdGUsIC1hbW91bnQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3ViWWVhcnNcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gICAgKGdsb2JhbCA9IGdsb2JhbCB8fCBzZWxmLCBmYWN0b3J5KGdsb2JhbC5mYXN0VW5pcXVlTnVtYmVycyA9IHt9KSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBMQVNUX05VTUJFUl9XRUFLX01BUCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgLypcbiAgICAgKiBUaGUgdmFsdWUgb2YgdGhlIGNvbnN0YW50IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIGVxdWFscyAoMiAqKiA1MyAtIDEpIGJ1dCBpdFxuICAgICAqIGlzIGZhaXJseSBuZXcuXG4gICAgICovXG5cbiAgICB2YXIgTUFYX1NBRkVfSU5URUdFUiA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSID09PSB1bmRlZmluZWQgPyA5MDA3MTk5MjU0NzQwOTkxIDogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cbiAgICB2YXIgY2FjaGUgPSBmdW5jdGlvbiBjYWNoZShjb2xsZWN0aW9uLCBuZXh0TnVtYmVyKSB7XG4gICAgICBMQVNUX05VTUJFUl9XRUFLX01BUC5zZXQoY29sbGVjdGlvbiwgbmV4dE51bWJlcik7XG4gICAgICByZXR1cm4gbmV4dE51bWJlcjtcbiAgICB9O1xuXG4gICAgdmFyIGdlbmVyYXRlVW5pcXVlTnVtYmVyID0gZnVuY3Rpb24gZ2VuZXJhdGVVbmlxdWVOdW1iZXIoY29sbGVjdGlvbikge1xuICAgICAgdmFyIGxhc3ROdW1iZXIgPSBMQVNUX05VTUJFUl9XRUFLX01BUC5nZXQoY29sbGVjdGlvbik7XG4gICAgICAvKlxuICAgICAgICogTGV0J3MgdHJ5IHRoZSBjaGVhcGVzdCBhbGdvcml0aG0gZmlyc3QuIEl0IG1pZ2h0IGZhaWwgdG8gcHJvZHVjZSBhIG5ld1xuICAgICAgICogbnVtYmVyLCBidXQgaXQgaXMgc28gY2hlYXAgdGhhdCBpdCBpcyBva2F5IHRvIHRha2UgdGhlIHJpc2suIEp1c3RcbiAgICAgICAqIGluY3JlYXNlIHRoZSBsYXN0IG51bWJlciBieSBvbmUgb3IgcmVzZXQgaXQgdG8gMCBpZiB3ZSByZWFjaGVkIHRoZSB1cHBlclxuICAgICAgICogYm91bmQgb2YgU01JcyAod2hpY2ggc3RhbmRzIGZvciBzbWFsbCBpbnRlZ2VycykuIFdoZW4gdGhlIGxhc3QgbnVtYmVyIGlzXG4gICAgICAgKiB1bmtub3duIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGUgY29sbGVjdGlvbiBjb250YWlucyB6ZXJvIGJhc2VkIGNvbnNlY3V0aXZlXG4gICAgICAgKiBudW1iZXJzLlxuICAgICAgICovXG5cbiAgICAgIHZhciBuZXh0TnVtYmVyID0gbGFzdE51bWJlciA9PT0gdW5kZWZpbmVkID8gY29sbGVjdGlvbi5zaXplIDogbGFzdE51bWJlciA+IDIxNDc0ODM2NDggPyAwIDogbGFzdE51bWJlciArIDE7XG5cbiAgICAgIGlmICghY29sbGVjdGlvbi5oYXMobmV4dE51bWJlcikpIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlKGNvbGxlY3Rpb24sIG5leHROdW1iZXIpO1xuICAgICAgfVxuICAgICAgLypcbiAgICAgICAqIElmIHRoZXJlIGFyZSBsZXNzIHRoYW4gaGFsZiBvZiAyICoqIDMxIG51bWJlcnMgc3RvcmVkIGluIHRoZSBjb2xsZWN0aW9uLFxuICAgICAgICogdGhlIGNoYW5jZSB0byBnZW5lcmF0ZSBhIG5ldyByYW5kb20gbnVtYmVyIGluIHRoZSByYW5nZSBmcm9tIDAgdG8gMiAqKiAzMVxuICAgICAgICogaXMgYXQgbGVhc3QgNTAlLiBJdCdzIGJlbmlmaXRpYWwgdG8gdXNlIG9ubHkgU01JcyBiZWNhdXNlIHRoZXkgcGVyZm9ybVxuICAgICAgICogbXVjaCBiZXR0ZXIgaW4gYW55IGVudmlyb25tZW50IGJhc2VkIG9uIFY4LlxuICAgICAgICovXG5cblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc2l6ZSA8IDEwNzM3NDE4MjQpIHtcbiAgICAgICAgd2hpbGUgKGNvbGxlY3Rpb24uaGFzKG5leHROdW1iZXIpKSB7XG4gICAgICAgICAgbmV4dE51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIxNDc0ODM2NDgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhY2hlKGNvbGxlY3Rpb24sIG5leHROdW1iZXIpO1xuICAgICAgfSAvLyBRdWlja2x5IGNoZWNrIGlmIHRoZXJlIGlzIGEgdGhlb3JldGljYWwgY2hhbmNlIHRvIGdlbmVyYXRlIGEgbmV3IG51bWJlci5cblxuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zaXplID4gTUFYX1NBRkVfSU5URUdFUikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbmdyYXR1bGF0aW9ucywgeW91IGNyZWF0ZWQgYSBjb2xsZWN0aW9uIG9mIHVuaXF1ZSBudW1iZXJzIHdoaWNoIHVzZXMgYWxsIGF2YWlsYWJsZSBpbnRlZ2VycyEnKTtcbiAgICAgIH0gLy8gT3RoZXJ3aXNlIHVzZSB0aGUgZnVsbCBzY2FsZSBvZiBzYWZlbHkgdXNhYmxlIGludGVnZXJzLlxuXG5cbiAgICAgIHdoaWxlIChjb2xsZWN0aW9uLmhhcyhuZXh0TnVtYmVyKSkge1xuICAgICAgICBuZXh0TnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTUFYX1NBRkVfSU5URUdFUik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYWNoZShjb2xsZWN0aW9uLCBuZXh0TnVtYmVyKTtcbiAgICB9O1xuXG4gICAgdmFyIGFkZFVuaXF1ZU51bWJlciA9IGZ1bmN0aW9uIGFkZFVuaXF1ZU51bWJlcihzZXQpIHtcbiAgICAgIHZhciBudW1iZXIgPSBnZW5lcmF0ZVVuaXF1ZU51bWJlcihzZXQpO1xuICAgICAgc2V0LmFkZChudW1iZXIpO1xuICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICB9O1xuXG4gICAgZXhwb3J0cy5hZGRVbmlxdWVOdW1iZXIgPSBhZGRVbmlxdWVOdW1iZXI7XG4gICAgZXhwb3J0cy5nZW5lcmF0ZVVuaXF1ZU51bWJlciA9IGdlbmVyYXRlVW5pcXVlTnVtYmVyO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpO1xuIiwiZXhwb3J0IGNvbnN0IGlzQ2FsbE5vdGlmaWNhdGlvbiA9IChtZXNzYWdlKSA9PiB7XG4gICAgcmV0dXJuIChtZXNzYWdlLm1ldGhvZCAhPT0gdW5kZWZpbmVkICYmIG1lc3NhZ2UubWV0aG9kID09PSAnY2FsbCcpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS9idWlsZC9lczIwMTgvZ3VhcmRzL2NhbGwtbm90aWZpY2F0aW9uLmpzLm1hcCIsImV4cG9ydCBjb25zdCBpc0NsZWFyUmVzcG9uc2UgPSAobWVzc2FnZSkgPT4ge1xuICAgIHJldHVybiAobWVzc2FnZS5lcnJvciA9PT0gbnVsbCAmJiB0eXBlb2YgbWVzc2FnZS5pZCA9PT0gJ251bWJlcicpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS9idWlsZC9lczIwMTgvZ3VhcmRzL2NsZWFyLXJlc3BvbnNlLmpzLm1hcCIsImltcG9ydCB7IGdlbmVyYXRlVW5pcXVlTnVtYmVyIH0gZnJvbSAnZmFzdC11bmlxdWUtbnVtYmVycyc7XG5pbXBvcnQgeyBpc0NhbGxOb3RpZmljYXRpb24gfSBmcm9tICcuL2d1YXJkcy9jYWxsLW5vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBpc0NsZWFyUmVzcG9uc2UgfSBmcm9tICcuL2d1YXJkcy9jbGVhci1yZXNwb25zZSc7XG5leHBvcnQgY29uc3QgbG9hZCA9ICh1cmwpID0+IHtcbiAgICBjb25zdCBzY2hlZHVsZWRJbnRlcnZhbEZ1bmN0aW9ucyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBzY2hlZHVsZWRUaW1lb3V0RnVuY3Rpb25zID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IHVucmVzcG9uZGVkUmVxdWVzdHMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3Qgd29ya2VyID0gbmV3IFdvcmtlcih1cmwpO1xuICAgIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgIGlmIChpc0NhbGxOb3RpZmljYXRpb24oZGF0YSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcGFyYW1zOiB7IHRpbWVySWQsIHRpbWVyVHlwZSB9IH0gPSBkYXRhO1xuICAgICAgICAgICAgaWYgKHRpbWVyVHlwZSA9PT0gJ2ludGVydmFsJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkT3JGdW5jID0gc2NoZWR1bGVkSW50ZXJ2YWxGdW5jdGlvbnMuZ2V0KHRpbWVySWQpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaWRPckZ1bmMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVySWRBbmRUaW1lclR5cGUgPSB1bnJlc3BvbmRlZFJlcXVlc3RzLmdldChpZE9yRnVuYyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aW1lcklkQW5kVGltZXJUeXBlID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHRpbWVySWRBbmRUaW1lclR5cGUudGltZXJJZCAhPT0gdGltZXJJZFxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgdGltZXJJZEFuZFRpbWVyVHlwZS50aW1lclR5cGUgIT09IHRpbWVyVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdGltZXIgaXMgaW4gYW4gdW5kZWZpbmVkIHN0YXRlLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBpZE9yRnVuYyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWRPckZ1bmMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHRpbWVyIGlzIGluIGFuIHVuZGVmaW5lZCBzdGF0ZS4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aW1lclR5cGUgPT09ICd0aW1lb3V0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkT3JGdW5jID0gc2NoZWR1bGVkVGltZW91dEZ1bmN0aW9ucy5nZXQodGltZXJJZCk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpZE9yRnVuYyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZXJJZEFuZFRpbWVyVHlwZSA9IHVucmVzcG9uZGVkUmVxdWVzdHMuZ2V0KGlkT3JGdW5jKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVySWRBbmRUaW1lclR5cGUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgdGltZXJJZEFuZFRpbWVyVHlwZS50aW1lcklkICE9PSB0aW1lcklkXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aW1lcklkQW5kVGltZXJUeXBlLnRpbWVyVHlwZSAhPT0gdGltZXJUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB0aW1lciBpcyBpbiBhbiB1bmRlZmluZWQgc3RhdGUuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGlkT3JGdW5jICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZE9yRnVuYygpO1xuICAgICAgICAgICAgICAgICAgICAvLyBBIHRpbWVvdXQgY2FuIGJlIHNhdmVseSBkZWxldGVkIGJlY2F1c2UgaXQgaXMgb25seSBjYWxsZWQgb25jZS5cbiAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkVGltZW91dEZ1bmN0aW9ucy5kZWxldGUodGltZXJJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB0aW1lciBpcyBpbiBhbiB1bmRlZmluZWQgc3RhdGUuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzQ2xlYXJSZXNwb25zZShkYXRhKSkge1xuICAgICAgICAgICAgY29uc3QgeyBpZCB9ID0gZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVySWRBbmRUaW1lclR5cGUgPSB1bnJlc3BvbmRlZFJlcXVlc3RzLmdldChpZCk7XG4gICAgICAgICAgICBpZiAodGltZXJJZEFuZFRpbWVyVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdGltZXIgaXMgaW4gYW4gdW5kZWZpbmVkIHN0YXRlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyB0aW1lcklkLCB0aW1lclR5cGUgfSA9IHRpbWVySWRBbmRUaW1lclR5cGU7XG4gICAgICAgICAgICAgICAgdW5yZXNwb25kZWRSZXF1ZXN0cy5kZWxldGUoaWQpO1xuICAgICAgICAgICAgICAgIGlmICh0aW1lclR5cGUgPT09ICdpbnRlcnZhbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkSW50ZXJ2YWxGdW5jdGlvbnMuZGVsZXRlKHRpbWVySWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkVGltZW91dEZ1bmN0aW9ucy5kZWxldGUodGltZXJJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgeyBlcnJvcjogeyBtZXNzYWdlIH0gfSA9IGRhdGE7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBjbGVhckludGVydmFsID0gKHRpbWVySWQpID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBnZW5lcmF0ZVVuaXF1ZU51bWJlcih1bnJlc3BvbmRlZFJlcXVlc3RzKTtcbiAgICAgICAgdW5yZXNwb25kZWRSZXF1ZXN0cy5zZXQoaWQsIHsgdGltZXJJZCwgdGltZXJUeXBlOiAnaW50ZXJ2YWwnIH0pO1xuICAgICAgICBzY2hlZHVsZWRJbnRlcnZhbEZ1bmN0aW9ucy5zZXQodGltZXJJZCwgaWQpO1xuICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBtZXRob2Q6ICdjbGVhcicsXG4gICAgICAgICAgICBwYXJhbXM6IHsgdGltZXJJZCwgdGltZXJUeXBlOiAnaW50ZXJ2YWwnIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCBjbGVhclRpbWVvdXQgPSAodGltZXJJZCkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IGdlbmVyYXRlVW5pcXVlTnVtYmVyKHVucmVzcG9uZGVkUmVxdWVzdHMpO1xuICAgICAgICB1bnJlc3BvbmRlZFJlcXVlc3RzLnNldChpZCwgeyB0aW1lcklkLCB0aW1lclR5cGU6ICd0aW1lb3V0JyB9KTtcbiAgICAgICAgc2NoZWR1bGVkVGltZW91dEZ1bmN0aW9ucy5zZXQodGltZXJJZCwgaWQpO1xuICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBtZXRob2Q6ICdjbGVhcicsXG4gICAgICAgICAgICBwYXJhbXM6IHsgdGltZXJJZCwgdGltZXJUeXBlOiAndGltZW91dCcgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IHNldEludGVydmFsID0gKGZ1bmMsIGRlbGF5KSA9PiB7XG4gICAgICAgIGNvbnN0IHRpbWVySWQgPSBnZW5lcmF0ZVVuaXF1ZU51bWJlcihzY2hlZHVsZWRJbnRlcnZhbEZ1bmN0aW9ucyk7XG4gICAgICAgIHNjaGVkdWxlZEludGVydmFsRnVuY3Rpb25zLnNldCh0aW1lcklkLCAoKSA9PiB7XG4gICAgICAgICAgICBmdW5jKCk7XG4gICAgICAgICAgICAvLyBEb3VibGVjaGVjayBpZiB0aGUgaW50ZXJ2YWwgc2hvdWxkIHN0aWxsIGJlIHJlc2NoZWR1bGVkIGJlY2F1c2UgaXQgY291bGQgaGF2ZSBiZWVuIGNsZWFyZWQgaW5zaWRlIG9mIGZ1bmMoKS5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NoZWR1bGVkSW50ZXJ2YWxGdW5jdGlvbnMuZ2V0KHRpbWVySWQpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ3NldCcsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXksXG4gICAgICAgICAgICAgICAgICAgICAgICBub3c6IHBlcmZvcm1hbmNlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyVHlwZTogJ2ludGVydmFsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICBtZXRob2Q6ICdzZXQnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgZGVsYXksXG4gICAgICAgICAgICAgICAgbm93OiBwZXJmb3JtYW5jZS5ub3coKSxcbiAgICAgICAgICAgICAgICB0aW1lcklkLFxuICAgICAgICAgICAgICAgIHRpbWVyVHlwZTogJ2ludGVydmFsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRpbWVySWQ7XG4gICAgfTtcbiAgICBjb25zdCBzZXRUaW1lb3V0ID0gKGZ1bmMsIGRlbGF5KSA9PiB7XG4gICAgICAgIGNvbnN0IHRpbWVySWQgPSBnZW5lcmF0ZVVuaXF1ZU51bWJlcihzY2hlZHVsZWRUaW1lb3V0RnVuY3Rpb25zKTtcbiAgICAgICAgc2NoZWR1bGVkVGltZW91dEZ1bmN0aW9ucy5zZXQodGltZXJJZCwgZnVuYyk7XG4gICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgIG1ldGhvZDogJ3NldCcsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBkZWxheSxcbiAgICAgICAgICAgICAgICBub3c6IHBlcmZvcm1hbmNlLm5vdygpLFxuICAgICAgICAgICAgICAgIHRpbWVySWQsXG4gICAgICAgICAgICAgICAgdGltZXJUeXBlOiAndGltZW91dCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aW1lcklkO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCxcbiAgICAgICAgY2xlYXJUaW1lb3V0LFxuICAgICAgICBzZXRJbnRlcnZhbCxcbiAgICAgICAgc2V0VGltZW91dFxuICAgIH07XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9L2J1aWxkL2VzMjAxOC9tb2R1bGUuanMubWFwIiwiaW1wb3J0IHsgbG9hZCB9IGZyb20gJ3dvcmtlci10aW1lcnMtYnJva2VyJztcbmltcG9ydCB7IHdvcmtlciB9IGZyb20gJy4vd29ya2VyL3dvcmtlcic7XG5jb25zdCBibG9iID0gbmV3IEJsb2IoW3dvcmtlcl0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQ7IGNoYXJzZXQ9dXRmLTgnIH0pO1xuY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbmNvbnN0IHdvcmtlclRpbWVycyA9IGxvYWQodXJsKTtcbmV4cG9ydCBjb25zdCBjbGVhckludGVydmFsID0gd29ya2VyVGltZXJzLmNsZWFySW50ZXJ2YWw7XG5leHBvcnQgY29uc3QgY2xlYXJUaW1lb3V0ID0gd29ya2VyVGltZXJzLmNsZWFyVGltZW91dDtcbmV4cG9ydCBjb25zdCBzZXRJbnRlcnZhbCA9IHdvcmtlclRpbWVycy5zZXRJbnRlcnZhbDtcbmV4cG9ydCBjb25zdCBzZXRUaW1lb3V0ID0gd29ya2VyVGltZXJzLnNldFRpbWVvdXQ7XG5VUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD0vYnVpbGQvZXMyMDE4L21vZHVsZS5qcy5tYXAiLCIvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG5leHBvcnQgY29uc3Qgd29ya2VyID0gYCFmdW5jdGlvbihlKXt2YXIgdD17fTtmdW5jdGlvbiByKG4pe2lmKHRbbl0pcmV0dXJuIHRbbl0uZXhwb3J0czt2YXIgbz10W25dPXtpOm4sbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtuXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyxyKSxvLmw9ITAsby5leHBvcnRzfXIubT1lLHIuYz10LHIuZD1mdW5jdGlvbihlLHQsbil7ci5vKGUsdCl8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLHQse2VudW1lcmFibGU6ITAsZ2V0Om59KX0sci5yPWZ1bmN0aW9uKGUpe1widW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC50b1N0cmluZ1RhZyYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsU3ltYm9sLnRvU3RyaW5nVGFnLHt2YWx1ZTpcIk1vZHVsZVwifSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSl9LHIudD1mdW5jdGlvbihlLHQpe2lmKDEmdCYmKGU9cihlKSksOCZ0KXJldHVybiBlO2lmKDQmdCYmXCJvYmplY3RcIj09dHlwZW9mIGUmJmUmJmUuX19lc01vZHVsZSlyZXR1cm4gZTt2YXIgbj1PYmplY3QuY3JlYXRlKG51bGwpO2lmKHIucihuKSxPYmplY3QuZGVmaW5lUHJvcGVydHkobixcImRlZmF1bHRcIix7ZW51bWVyYWJsZTohMCx2YWx1ZTplfSksMiZ0JiZcInN0cmluZ1wiIT10eXBlb2YgZSlmb3IodmFyIG8gaW4gZSlyLmQobixvLGZ1bmN0aW9uKHQpe3JldHVybiBlW3RdfS5iaW5kKG51bGwsbykpO3JldHVybiBufSxyLm49ZnVuY3Rpb24oZSl7dmFyIHQ9ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHIuZCh0LFwiYVwiLHQpLHR9LHIubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sci5wPVwiXCIscihyLnM9MCl9KFtmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ci5yKHQpO2NvbnN0IG49bmV3IE1hcCxvPW5ldyBNYXAsaT0oZSx0KT0+e2xldCByLG47aWYoXCJwZXJmb3JtYW5jZVwiaW4gc2VsZil7Y29uc3Qgbz1wZXJmb3JtYW5jZS5ub3coKTtyPW8sbj1lLU1hdGgubWF4KDAsby10KX1lbHNlIHI9RGF0ZS5ub3coKSxuPWU7cmV0dXJue2V4cGVjdGVkOnIrbixyZW1haW5pbmdEZWxheTpufX0scz0oZSx0LHIsbik9Pntjb25zdCBvPVwicGVyZm9ybWFuY2VcImluIHNlbGY/cGVyZm9ybWFuY2Uubm93KCk6RGF0ZS5ub3coKTtvPnI/cG9zdE1lc3NhZ2Uoe2lkOm51bGwsbWV0aG9kOlwiY2FsbFwiLHBhcmFtczp7dGltZXJJZDp0LHRpbWVyVHlwZTpufX0pOmUuc2V0KHQsc2V0VGltZW91dChzLHItbyxlLHQscixuKSl9O2FkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsZT0+e2xldCB0PWUuZGF0YTt0cnl7aWYoXCJjbGVhclwiPT09dC5tZXRob2Qpe2NvbnN0IGU9dC5pZCxyPXQucGFyYW1zLGk9ci50aW1lcklkLHM9ci50aW1lclR5cGU7aWYoXCJpbnRlcnZhbFwiPT09cykoZT0+e2NvbnN0IHQ9bi5nZXQoZSk7aWYodm9pZCAwPT09dCl0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIG5vIGludGVydmFsIHNjaGVkdWxlZCB3aXRoIHRoZSBnaXZlbiBpZCBcIicuY29uY2F0KGUsJ1wiLicpKTtjbGVhclRpbWVvdXQodCksbi5kZWxldGUoZSl9KShpKSxwb3N0TWVzc2FnZSh7ZXJyb3I6bnVsbCxpZDplfSk7ZWxzZXtpZihcInRpbWVvdXRcIiE9PXMpdGhyb3cgbmV3IEVycm9yKCdUaGUgZ2l2ZW4gdHlwZSBcIicuY29uY2F0KHMsJ1wiIGlzIG5vdCBzdXBwb3J0ZWQnKSk7KGU9Pntjb25zdCB0PW8uZ2V0KGUpO2lmKHZvaWQgMD09PXQpdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBubyB0aW1lb3V0IHNjaGVkdWxlZCB3aXRoIHRoZSBnaXZlbiBpZCBcIicuY29uY2F0KGUsJ1wiLicpKTtjbGVhclRpbWVvdXQodCksby5kZWxldGUoZSl9KShpKSxwb3N0TWVzc2FnZSh7ZXJyb3I6bnVsbCxpZDplfSl9fWVsc2V7aWYoXCJzZXRcIiE9PXQubWV0aG9kKXRocm93IG5ldyBFcnJvcignVGhlIGdpdmVuIG1ldGhvZCBcIicuY29uY2F0KHQubWV0aG9kLCdcIiBpcyBub3Qgc3VwcG9ydGVkJykpO3tjb25zdCBlPXQucGFyYW1zLHI9ZS5kZWxheSxhPWUubm93LGw9ZS50aW1lcklkLGM9ZS50aW1lclR5cGU7aWYoXCJpbnRlcnZhbFwiPT09YykoKGUsdCxyKT0+e2NvbnN0IG89aShlLHIpLGE9by5leHBlY3RlZCxsPW8ucmVtYWluaW5nRGVsYXk7bi5zZXQodCxzZXRUaW1lb3V0KHMsbCxuLHQsYSxcImludGVydmFsXCIpKX0pKHIsbCxhKTtlbHNle2lmKFwidGltZW91dFwiIT09Yyl0aHJvdyBuZXcgRXJyb3IoJ1RoZSBnaXZlbiB0eXBlIFwiJy5jb25jYXQoYywnXCIgaXMgbm90IHN1cHBvcnRlZCcpKTsoKGUsdCxyKT0+e2NvbnN0IG49aShlLHIpLGE9bi5leHBlY3RlZCxsPW4ucmVtYWluaW5nRGVsYXk7by5zZXQodCxzZXRUaW1lb3V0KHMsbCxvLHQsYSxcInRpbWVvdXRcIikpfSkocixsLGEpfX19fWNhdGNoKGUpe3Bvc3RNZXNzYWdlKHtlcnJvcjp7bWVzc2FnZTplLm1lc3NhZ2V9LGlkOnQuaWQscmVzdWx0Om51bGx9KX19KX1dKTtgO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9L2J1aWxkL2VzMjAxOC93b3JrZXIvd29ya2VyLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=