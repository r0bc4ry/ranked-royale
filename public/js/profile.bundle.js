!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=165)}({165:function(e,n,t){"use strict";t.r(n);t(166);function o(e){if(e.preventDefault(),$("#connect-modal-step-1").is(":visible"))$("#connect-modal-step-1").addClass("d-none"),$("#connect-modal-step-2").removeClass("d-none");else{var n=$("#connect-modal .alert.alert-danger");n.addClass("d-none");var t=$(".needs-validation").get(0),o=t.checkValidity();if($(t).addClass("was-validated"),!1===o)return;var r=$(this),a=r.html();r.html('<span class="spinner-border spinner-border-sm"></span> Loading...'),r.attr("disabled",!0),$.post("/api/connections/epic",$(".needs-validation").serialize(),function(e){location.reload()}).fail(function(e){r.html(a),r.attr("disabled",!1),n.text(e.responseJSON.message?e.responseJSON.message:"Uh-oh! An error occurred."),n.removeClass("d-none")})}}function r(e){13===(e.keyCode||e.which)&&o(e)}$(function(){$("#connect-modal").on("show.bs.modal",function(){$("#connect-modal-step-1").removeClass("d-none"),$("#connect-modal-step-2").addClass("d-none")}),$("#connect-modal .modal-footer .btn-primary").click(o),$("#connect-modal-step-2 .form-control[name=code]").keypress(r)})},166:function(e,n,t){}});