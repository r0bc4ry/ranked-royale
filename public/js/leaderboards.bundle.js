!function(e){var n={};function r(o){if(n[o])return n[o].exports;var t=n[o]={i:o,l:!1,exports:{}};return e[o].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=e,r.c=n,r.d=function(e,n,o){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)r.d(o,t,function(n){return e[n]}.bind(null,t));return o},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=160)}({160:function(e,n,r){"use strict";r.r(n);r(161);$(function(){var e=$(".form-control[name=gameMode]"),n=$(".form-control[name=inputType]"),r=$(".form-control[name=region]");$(".form-control[name=gameMode], .form-control[name=inputType], .form-control[name=region]").change(function(){window.location="/leaderboards?"+$.param({gameMode:e.val(),inputType:n.val(),region:r.val()})})})},161:function(e,n,r){}});