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
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/js/profile.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/css/profile.scss":
/*!*********************************!*\
  !*** ./client/css/profile.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./client/js/profile.js":
/*!******************************!*\
  !*** ./client/js/profile.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_profile_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/profile.scss */ "./client/css/profile.scss");
/* harmony import */ var _css_profile_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_profile_scss__WEBPACK_IMPORTED_MODULE_0__);

$(function () {
  $('#connect-modal').on('show.bs.modal', function () {
    $('#connect-modal-step-1').removeClass('d-none');
    $('#connect-modal-step-2').addClass('d-none');
  });
  $('#connect-modal .modal-footer .btn-primary').click(onConnectContinue);
  $('#connect-modal-step-2 .form-control[name=code]').keypress(onConnectCodeKeypress);
});

function onConnectContinue(event) {
  event.preventDefault();

  if ($('#connect-modal-step-1').is(":visible")) {
    $('#connect-modal-step-1').addClass('d-none');
    $('#connect-modal-step-2').removeClass('d-none');
  } else {
    var alert = $('#connect-modal .alert.alert-danger');
    alert.addClass('d-none');
    var form = $('.needs-validation').get(0);
    var isValid = form.checkValidity();
    $(form).addClass('was-validated');

    if (isValid === false) {
      return;
    }

    var button = $(this);
    var buttonHtml = button.html();
    button.html('<span class="spinner-border spinner-border-sm"></span> Loading...');
    button.attr('disabled', true); // TODO

    $.post('/api/connections/epic', $('.needs-validation').serialize(), function (response) {
      location.reload();
    }).fail(function (response) {
      button.html(buttonHtml);
      button.attr('disabled', false);
      alert.text(response.responseJSON.message ? response.responseJSON.message : 'Uh-oh! An error occurred.');
      alert.removeClass('d-none');
    });
  }
}

function onConnectCodeKeypress(event) {
  var code = event.keyCode || event.which;

  if (code === 13) {
    onConnectContinue(event);
  }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2Nzcy9wcm9maWxlLnNjc3M/ZmJlNiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvanMvcHJvZmlsZS5qcyJdLCJuYW1lcyI6WyIkIiwib24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY2xpY2siLCJvbkNvbm5lY3RDb250aW51ZSIsImtleXByZXNzIiwib25Db25uZWN0Q29kZUtleXByZXNzIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImlzIiwiYWxlcnQiLCJmb3JtIiwiZ2V0IiwiaXNWYWxpZCIsImNoZWNrVmFsaWRpdHkiLCJidXR0b24iLCJidXR0b25IdG1sIiwiaHRtbCIsImF0dHIiLCJwb3N0Iiwic2VyaWFsaXplIiwicmVzcG9uc2UiLCJsb2NhdGlvbiIsInJlbG9hZCIsImZhaWwiLCJ0ZXh0IiwicmVzcG9uc2VKU09OIiwibWVzc2FnZSIsImNvZGUiLCJrZXlDb2RlIiwid2hpY2giXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hE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bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY2xpZW50L2pzL3Byb2ZpbGUuanNcIik7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgJy4uL2Nzcy9wcm9maWxlLnNjc3MnO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjY29ubmVjdC1tb2RhbCcpLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJyNjb25uZWN0LW1vZGFsLXN0ZXAtMScpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgICAkKCcjY29ubmVjdC1tb2RhbC1zdGVwLTInKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICB9KTtcclxuICAgICQoJyNjb25uZWN0LW1vZGFsIC5tb2RhbC1mb290ZXIgLmJ0bi1wcmltYXJ5JykuY2xpY2sob25Db25uZWN0Q29udGludWUpO1xyXG4gICAgJCgnI2Nvbm5lY3QtbW9kYWwtc3RlcC0yIC5mb3JtLWNvbnRyb2xbbmFtZT1jb2RlXScpLmtleXByZXNzKG9uQ29ubmVjdENvZGVLZXlwcmVzcyk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gb25Db25uZWN0Q29udGludWUoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYgKCQoJyNjb25uZWN0LW1vZGFsLXN0ZXAtMScpLmlzKFwiOnZpc2libGVcIikpIHtcclxuICAgICAgICAkKCcjY29ubmVjdC1tb2RhbC1zdGVwLTEnKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgICAgJCgnI2Nvbm5lY3QtbW9kYWwtc3RlcC0yJykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgYWxlcnQgPSAkKCcjY29ubmVjdC1tb2RhbCAuYWxlcnQuYWxlcnQtZGFuZ2VyJyk7XHJcbiAgICAgICAgYWxlcnQuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG5cclxuICAgICAgICBsZXQgZm9ybSA9ICQoJy5uZWVkcy12YWxpZGF0aW9uJykuZ2V0KDApO1xyXG4gICAgICAgIGxldCBpc1ZhbGlkID0gZm9ybS5jaGVja1ZhbGlkaXR5KCk7XHJcbiAgICAgICAgJChmb3JtKS5hZGRDbGFzcygnd2FzLXZhbGlkYXRlZCcpO1xyXG4gICAgICAgIGlmIChpc1ZhbGlkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYnV0dG9uID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgYnV0dG9uSHRtbCA9IGJ1dHRvbi5odG1sKCk7XHJcbiAgICAgICAgYnV0dG9uLmh0bWwoJzxzcGFuIGNsYXNzPVwic3Bpbm5lci1ib3JkZXIgc3Bpbm5lci1ib3JkZXItc21cIj48L3NwYW4+IExvYWRpbmcuLi4nKTtcclxuICAgICAgICBidXR0b24uYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICQucG9zdCgnL2FwaS9jb25uZWN0aW9ucy9lcGljJywgJCgnLm5lZWRzLXZhbGlkYXRpb24nKS5zZXJpYWxpemUoKSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5odG1sKGJ1dHRvbkh0bWwpO1xyXG4gICAgICAgICAgICBidXR0b24uYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGFsZXJ0LnRleHQocmVzcG9uc2UucmVzcG9uc2VKU09OLm1lc3NhZ2UgPyByZXNwb25zZS5yZXNwb25zZUpTT04ubWVzc2FnZSA6ICdVaC1vaCEgQW4gZXJyb3Igb2NjdXJyZWQuJyk7XHJcbiAgICAgICAgICAgIGFsZXJ0LnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gb25Db25uZWN0Q29kZUtleXByZXNzKGV2ZW50KSB7XHJcbiAgICBsZXQgY29kZSA9IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoY29kZSA9PT0gMTMpIHtcclxuICAgICAgICBvbkNvbm5lY3RDb250aW51ZShldmVudCk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==