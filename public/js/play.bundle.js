!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=224)}([function(e,t,n){var r=n(92),o=n(20),a=36e5,u=6e4,i=2,s=/[T ]/,c=/:/,f=/^(\d{2})$/,l=[/^([+-]\d{2})$/,/^([+-]\d{3})$/,/^([+-]\d{4})$/],d=/^(\d{4})/,v=[/^([+-]\d{4})/,/^([+-]\d{5})/,/^([+-]\d{6})/],p=/^-(\d{2})$/,m=/^-?(\d{3})$/,g=/^-?(\d{2})-?(\d{2})$/,h=/^-?W(\d{2})$/,x=/^-?W(\d{2})-?(\d{1})$/,M=/^(\d{2}([.,]\d*)?)$/,D=/^(\d{2}):?(\d{2}([.,]\d*)?)$/,T=/^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,y=/([Z+-].*)$/,w=/^(Z)$/,b=/^([+-])(\d{2})$/,S=/^([+-])(\d{2}):?(\d{2})$/;function O(e,t,n){t=t||0,n=n||0;var r=new Date(0);r.setUTCFullYear(e,0,4);var o=7*t+n+1-(r.getUTCDay()||7);return r.setUTCDate(r.getUTCDate()+o),r}e.exports=function(e,t){if(o(e))return new Date(e.getTime());if("string"!=typeof e)return new Date(e);var n=(t||{}).additionalDigits;n=null==n?i:Number(n);var Y=function(e){var t,n={},r=e.split(s);if(c.test(r[0])?(n.date=null,t=r[0]):(n.date=r[0],t=r[1]),t){var o=y.exec(t);o?(n.time=t.replace(o[1],""),n.timezone=o[1]):n.time=t}return n}(e),I=function(e,t){var n,r=l[t],o=v[t];if(n=d.exec(e)||o.exec(e)){var a=n[1];return{year:parseInt(a,10),restDateString:e.slice(a.length)}}if(n=f.exec(e)||r.exec(e)){var u=n[1];return{year:100*parseInt(u,10),restDateString:e.slice(u.length)}}return{year:null}}(Y.date,n),F=I.year,H=function(e,t){if(null===t)return null;var n,r,o,a;if(0===e.length)return(r=new Date(0)).setUTCFullYear(t),r;if(n=p.exec(e))return r=new Date(0),o=parseInt(n[1],10)-1,r.setUTCFullYear(t,o),r;if(n=m.exec(e)){r=new Date(0);var u=parseInt(n[1],10);return r.setUTCFullYear(t,0,u),r}if(n=g.exec(e)){r=new Date(0),o=parseInt(n[1],10)-1;var i=parseInt(n[2],10);return r.setUTCFullYear(t,o,i),r}if(n=h.exec(e))return a=parseInt(n[1],10)-1,O(t,a);if(n=x.exec(e)){a=parseInt(n[1],10)-1;var s=parseInt(n[2],10)-1;return O(t,a,s)}return null}(I.restDateString,F);if(H){var N,W=H.getTime(),k=0;if(Y.time&&(k=function(e){var t,n,r;if(t=M.exec(e))return(n=parseFloat(t[1].replace(",",".")))%24*a;if(t=D.exec(e))return n=parseInt(t[1],10),r=parseFloat(t[2].replace(",",".")),n%24*a+r*u;if(t=T.exec(e)){n=parseInt(t[1],10),r=parseInt(t[2],10);var o=parseFloat(t[3].replace(",","."));return n%24*a+r*u+1e3*o}return null}(Y.time)),Y.timezone)z=Y.timezone,N=((C=w.exec(z))?0:(C=b.exec(z))?(X=60*parseInt(C[2],10),"+"===C[1]?-X:X):(C=S.exec(z))?(X=60*parseInt(C[2],10)+parseInt(C[3],10),"+"===C[1]?-X:X):0)*u;else{var E=W+k,$=new Date(E);N=r($);var A=new Date(E);A.setDate($.getDate()+1);var j=r(A)-r($);j>0&&(N+=j)}return new Date(W+k+N)}var z,C,X;return new Date(e)}},function(e,t,n){var r=n(0),o=n(2);e.exports=function(e){var t=r(e),n=t.getFullYear(),a=new Date(0);a.setFullYear(n+1,0,4),a.setHours(0,0,0,0);var u=o(a),i=new Date(0);i.setFullYear(n,0,4),i.setHours(0,0,0,0);var s=o(i);return t.getTime()>=u.getTime()?n+1:t.getTime()>=s.getTime()?n:n-1}},function(e,t,n){var r=n(12);e.exports=function(e){return r(e,{weekStartsOn:1})}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setHours(0,0,0,0),t}},,,function(e,t,n){e.exports={addDays:n(7),addHours:n(38),addISOYears:n(39),addMilliseconds:n(8),addMinutes:n(41),addMonths:n(14),addQuarters:n(42),addSeconds:n(43),addWeeks:n(22),addYears:n(44),areRangesOverlapping:n(93),closestIndexTo:n(94),closestTo:n(95),compareAsc:n(10),compareDesc:n(23),differenceInCalendarDays:n(13),differenceInCalendarISOWeeks:n(96),differenceInCalendarISOYears:n(45),differenceInCalendarMonths:n(46),differenceInCalendarQuarters:n(97),differenceInCalendarWeeks:n(98),differenceInCalendarYears:n(48),differenceInDays:n(49),differenceInHours:n(99),differenceInISOYears:n(100),differenceInMilliseconds:n(15),differenceInMinutes:n(101),differenceInMonths:n(24),differenceInQuarters:n(102),differenceInSeconds:n(25),differenceInWeeks:n(103),differenceInYears:n(104),distanceInWords:n(51),distanceInWordsStrict:n(108),distanceInWordsToNow:n(109),eachDay:n(110),endOfDay:n(27),endOfHour:n(111),endOfISOWeek:n(112),endOfISOYear:n(113),endOfMinute:n(114),endOfMonth:n(53),endOfQuarter:n(115),endOfSecond:n(116),endOfToday:n(117),endOfTomorrow:n(118),endOfWeek:n(52),endOfYear:n(119),endOfYesterday:n(120),format:n(121),getDate:n(122),getDay:n(123),getDayOfYear:n(54),getDaysInMonth:n(21),getDaysInYear:n(124),getHours:n(125),getISODay:n(58),getISOWeek:n(28),getISOWeeksInYear:n(126),getISOYear:n(1),getMilliseconds:n(127),getMinutes:n(128),getMonth:n(129),getOverlappingDaysInRanges:n(130),getQuarter:n(47),getSeconds:n(131),getTime:n(132),getYear:n(133),isAfter:n(134),isBefore:n(135),isDate:n(20),isEqual:n(136),isFirstDayOfMonth:n(137),isFriday:n(138),isFuture:n(139),isLastDayOfMonth:n(140),isLeapYear:n(57),isMonday:n(141),isPast:n(142),isSameDay:n(143),isSameHour:n(59),isSameISOWeek:n(61),isSameISOYear:n(62),isSameMinute:n(63),isSameMonth:n(65),isSameQuarter:n(66),isSameSecond:n(68),isSameWeek:n(29),isSameYear:n(70),isSaturday:n(144),isSunday:n(145),isThisHour:n(146),isThisISOWeek:n(147),isThisISOYear:n(148),isThisMinute:n(149),isThisMonth:n(150),isThisQuarter:n(151),isThisSecond:n(152),isThisWeek:n(153),isThisYear:n(154),isThursday:n(155),isToday:n(156),isTomorrow:n(157),isTuesday:n(158),isValid:n(56),isWednesday:n(159),isWeekend:n(160),isWithinRange:n(161),isYesterday:n(162),lastDayOfISOWeek:n(163),lastDayOfISOYear:n(164),lastDayOfMonth:n(165),lastDayOfQuarter:n(166),lastDayOfWeek:n(71),lastDayOfYear:n(167),max:n(168),min:n(169),parse:n(0),setDate:n(170),setDay:n(171),setDayOfYear:n(172),setHours:n(173),setISODay:n(174),setISOWeek:n(175),setISOYear:n(40),setMilliseconds:n(176),setMinutes:n(177),setMonth:n(72),setQuarter:n(178),setSeconds:n(179),setYear:n(180),startOfDay:n(3),startOfHour:n(60),startOfISOWeek:n(2),startOfISOYear:n(9),startOfMinute:n(64),startOfMonth:n(181),startOfQuarter:n(67),startOfSecond:n(69),startOfToday:n(182),startOfTomorrow:n(183),startOfWeek:n(12),startOfYear:n(55),startOfYesterday:n(184),subDays:n(185),subHours:n(186),subISOYears:n(50),subMilliseconds:n(187),subMinutes:n(188),subMonths:n(189),subQuarters:n(190),subSeconds:n(191),subWeeks:n(192),subYears:n(193)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setDate(n.getDate()+o),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e).getTime(),o=Number(t);return new Date(n+o)}},function(e,t,n){var r=n(1),o=n(2);e.exports=function(e){var t=r(e),n=new Date(0);return n.setFullYear(t,0,4),n.setHours(0,0,0,0),o(n)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e).getTime(),o=r(t).getTime();return n<o?-1:n>o?1:0}},function(e,t,n){!function(e){"use strict";var t=new WeakMap,n=void 0===Number.MAX_SAFE_INTEGER?9007199254740991:Number.MAX_SAFE_INTEGER,r=function(e,n){return t.set(e,n),n},o=function(e){var o=t.get(e),a=void 0===o?e.size:o>2147483648?0:o+1;if(!e.has(a))return r(e,a);if(e.size<1073741824){for(;e.has(a);)a=Math.floor(2147483648*Math.random());return r(e,a)}if(e.size>n)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;e.has(a);)a=Math.floor(Math.random()*n);return r(e,a)};e.addUniqueNumber=function(e){var t=o(e);return e.add(t),t},e.generateUniqueNumber=o,Object.defineProperty(e,"__esModule",{value:!0})}(t)},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=t&&Number(t.weekStartsOn)||0,o=r(e),a=o.getDay(),u=(a<n?7:0)+a-n;return o.setDate(o.getDate()-u),o.setHours(0,0,0,0),o}},function(e,t,n){var r=n(3),o=6e4,a=864e5;e.exports=function(e,t){var n=r(e),u=r(t),i=n.getTime()-n.getTimezoneOffset()*o,s=u.getTime()-u.getTimezoneOffset()*o;return Math.round((i-s)/a)}},function(e,t,n){var r=n(0),o=n(21);e.exports=function(e,t){var n=r(e),a=Number(t),u=n.getMonth()+a,i=new Date(0);i.setFullYear(n.getFullYear(),u,1),i.setHours(0,0,0,0);var s=o(i);return n.setMonth(u,Math.min(s,n.getDate())),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()-o.getTime()}},,,,,function(e,t){e.exports=function(e){return e instanceof Date}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getFullYear(),o=t.getMonth(),a=new Date(0);return a.setFullYear(n,o+1,0),a.setHours(0,0,0,0),a.getDate()}},function(e,t,n){var r=n(7);e.exports=function(e,t){var n=Number(t);return r(e,7*n)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e).getTime(),o=r(t).getTime();return n>o?-1:n<o?1:0}},function(e,t,n){var r=n(0),o=n(46),a=n(10);e.exports=function(e,t){var n=r(e),u=r(t),i=a(n,u),s=Math.abs(o(n,u));return n.setMonth(n.getMonth()-i*s),i*(s-(a(n,u)===-i))}},function(e,t,n){var r=n(15);e.exports=function(e,t){var n=r(e,t)/1e3;return n>0?Math.floor(n):Math.ceil(n)}},function(e,t,n){var r=n(105),o=n(106);e.exports={distanceInWords:r(),format:o()}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setHours(23,59,59,999),t}},function(e,t,n){var r=n(0),o=n(2),a=n(9),u=6048e5;e.exports=function(e){var t=r(e),n=o(t).getTime()-a(t).getTime();return Math.round(n/u)+1}},function(e,t,n){var r=n(12);e.exports=function(e,t,n){var o=r(e,n),a=r(t,n);return o.getTime()===a.getTime()}},,,,,,,,,function(e,t,n){var r=n(8),o=36e5;e.exports=function(e,t){var n=Number(t);return r(e,n*o)}},function(e,t,n){var r=n(1),o=n(40);e.exports=function(e,t){var n=Number(t);return o(e,r(e)+n)}},function(e,t,n){var r=n(0),o=n(9),a=n(13);e.exports=function(e,t){var n=r(e),u=Number(t),i=a(n,o(n)),s=new Date(0);return s.setFullYear(u,0,4),s.setHours(0,0,0,0),(n=o(s)).setDate(n.getDate()+i),n}},function(e,t,n){var r=n(8),o=6e4;e.exports=function(e,t){var n=Number(t);return r(e,n*o)}},function(e,t,n){var r=n(14);e.exports=function(e,t){var n=Number(t);return r(e,3*n)}},function(e,t,n){var r=n(8);e.exports=function(e,t){var n=Number(t);return r(e,1e3*n)}},function(e,t,n){var r=n(14);e.exports=function(e,t){var n=Number(t);return r(e,12*n)}},function(e,t,n){var r=n(1);e.exports=function(e,t){return r(e)-r(t)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return 12*(n.getFullYear()-o.getFullYear())+(n.getMonth()-o.getMonth())}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return Math.floor(t.getMonth()/3)+1}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getFullYear()-o.getFullYear()}},function(e,t,n){var r=n(0),o=n(13),a=n(10);e.exports=function(e,t){var n=r(e),u=r(t),i=a(n,u),s=Math.abs(o(n,u));return n.setDate(n.getDate()-i*s),i*(s-(a(n,u)===-i))}},function(e,t,n){var r=n(39);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(23),o=n(0),a=n(25),u=n(24),i=n(26),s=1440,c=2520,f=43200,l=86400;e.exports=function(e,t,n){var d=n||{},v=r(e,t),p=d.locale,m=i.distanceInWords.localize;p&&p.distanceInWords&&p.distanceInWords.localize&&(m=p.distanceInWords.localize);var g,h,x={addSuffix:Boolean(d.addSuffix),comparison:v};v>0?(g=o(e),h=o(t)):(g=o(t),h=o(e));var M,D=a(h,g),T=h.getTimezoneOffset()-g.getTimezoneOffset(),y=Math.round(D/60)-T;if(y<2)return d.includeSeconds?D<5?m("lessThanXSeconds",5,x):D<10?m("lessThanXSeconds",10,x):D<20?m("lessThanXSeconds",20,x):D<40?m("halfAMinute",null,x):m(D<60?"lessThanXMinutes":"xMinutes",1,x):0===y?m("lessThanXMinutes",1,x):m("xMinutes",y,x);if(y<45)return m("xMinutes",y,x);if(y<90)return m("aboutXHours",1,x);if(y<s)return m("aboutXHours",Math.round(y/60),x);if(y<c)return m("xDays",1,x);if(y<f)return m("xDays",Math.round(y/s),x);if(y<l)return m("aboutXMonths",M=Math.round(y/f),x);if((M=u(h,g))<12)return m("xMonths",Math.round(y/f),x);var w=M%12,b=Math.floor(M/12);return w<3?m("aboutXYears",b,x):w<9?m("overXYears",b,x):m("almostXYears",b+1,x)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=t&&Number(t.weekStartsOn)||0,o=r(e),a=o.getDay(),u=6+(a<n?-7:0)-(a-n);return o.setDate(o.getDate()+u),o.setHours(23,59,59,999),o}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getMonth();return t.setFullYear(t.getFullYear(),n+1,0),t.setHours(23,59,59,999),t}},function(e,t,n){var r=n(0),o=n(55),a=n(13);e.exports=function(e){var t=r(e);return a(t,o(t))+1}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=new Date(0);return n.setFullYear(t.getFullYear(),0,1),n.setHours(0,0,0,0),n}},function(e,t,n){var r=n(20);e.exports=function(e){if(r(e))return!isNaN(e);throw new TypeError(toString.call(e)+" is not an instance of Date")}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e).getFullYear();return t%400==0||t%4==0&&t%100!=0}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e).getDay();return 0===t&&(t=7),t}},function(e,t,n){var r=n(60);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setMinutes(0,0,0),t}},function(e,t,n){var r=n(29);e.exports=function(e,t){return r(e,t,{weekStartsOn:1})}},function(e,t,n){var r=n(9);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(64);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setSeconds(0,0),t}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getFullYear()===o.getFullYear()&&n.getMonth()===o.getMonth()}},function(e,t,n){var r=n(67);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getMonth(),o=n-n%3;return t.setMonth(o,1),t.setHours(0,0,0,0),t}},function(e,t,n){var r=n(69);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setMilliseconds(0),t}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getFullYear()===o.getFullYear()}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=t&&Number(t.weekStartsOn)||0,o=r(e),a=o.getDay(),u=6+(a<n?-7:0)-(a-n);return o.setHours(0,0,0,0),o.setDate(o.getDate()+u),o}},function(e,t,n){var r=n(0),o=n(21);e.exports=function(e,t){var n=r(e),a=Number(t),u=n.getFullYear(),i=n.getDate(),s=new Date(0);s.setFullYear(u,a,15),s.setHours(0,0,0,0);var c=o(s);return n.setMonth(a,Math.min(i,c)),n}},,,,,,,,,,,,,,,,,,,function(e,t,n){},function(e,t){e.exports=function(e){var t=new Date(e.getTime()),n=t.getTimezoneOffset();return t.setSeconds(0,0),6e4*n+t.getTime()%6e4}},function(e,t,n){var r=n(0);e.exports=function(e,t,n,o){var a=r(e).getTime(),u=r(t).getTime(),i=r(n).getTime(),s=r(o).getTime();if(a>u||i>s)throw new Error("The start of the range cannot be after the end of the range");return a<s&&i<u}},function(e,t,n){var r=n(0);e.exports=function(e,t){if(!(t instanceof Array))throw new TypeError(toString.call(t)+" is not an instance of Array");var n,o,a=r(e).getTime();return t.forEach(function(e,t){var u=r(e),i=Math.abs(a-u.getTime());(void 0===n||i<o)&&(n=t,o=i)}),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){if(!(t instanceof Array))throw new TypeError(toString.call(t)+" is not an instance of Array");var n,o,a=r(e).getTime();return t.forEach(function(e){var t=r(e),u=Math.abs(a-t.getTime());(void 0===n||u<o)&&(n=t,o=u)}),n}},function(e,t,n){var r=n(2),o=6e4,a=6048e5;e.exports=function(e,t){var n=r(e),u=r(t),i=n.getTime()-n.getTimezoneOffset()*o,s=u.getTime()-u.getTimezoneOffset()*o;return Math.round((i-s)/a)}},function(e,t,n){var r=n(47),o=n(0);e.exports=function(e,t){var n=o(e),a=o(t);return 4*(n.getFullYear()-a.getFullYear())+(r(n)-r(a))}},function(e,t,n){var r=n(12),o=6e4,a=6048e5;e.exports=function(e,t,n){var u=r(e,n),i=r(t,n),s=u.getTime()-u.getTimezoneOffset()*o,c=i.getTime()-i.getTimezoneOffset()*o;return Math.round((s-c)/a)}},function(e,t,n){var r=n(15),o=36e5;e.exports=function(e,t){var n=r(e,t)/o;return n>0?Math.floor(n):Math.ceil(n)}},function(e,t,n){var r=n(0),o=n(45),a=n(10),u=n(50);e.exports=function(e,t){var n=r(e),i=r(t),s=a(n,i),c=Math.abs(o(n,i));return n=u(n,s*c),s*(c-(a(n,i)===-s))}},function(e,t,n){var r=n(15),o=6e4;e.exports=function(e,t){var n=r(e,t)/o;return n>0?Math.floor(n):Math.ceil(n)}},function(e,t,n){var r=n(24);e.exports=function(e,t){var n=r(e,t)/3;return n>0?Math.floor(n):Math.ceil(n)}},function(e,t,n){var r=n(49);e.exports=function(e,t){var n=r(e,t)/7;return n>0?Math.floor(n):Math.ceil(n)}},function(e,t,n){var r=n(0),o=n(48),a=n(10);e.exports=function(e,t){var n=r(e),u=r(t),i=a(n,u),s=Math.abs(o(n,u));return n.setFullYear(n.getFullYear()-i*s),i*(s-(a(n,u)===-i))}},function(e,t){e.exports=function(){var e={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};return{localize:function(t,n,r){var o;return r=r||{},o="string"==typeof e[t]?e[t]:1===n?e[t].one:e[t].other.replace("{{count}}",n),r.addSuffix?r.comparison>0?"in "+o:o+" ago":o}}}},function(e,t,n){var r=n(107);e.exports=function(){var e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],t=["January","February","March","April","May","June","July","August","September","October","November","December"],n=["Su","Mo","Tu","We","Th","Fr","Sa"],o=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],u=["AM","PM"],i=["am","pm"],s=["a.m.","p.m."],c={MMM:function(t){return e[t.getMonth()]},MMMM:function(e){return t[e.getMonth()]},dd:function(e){return n[e.getDay()]},ddd:function(e){return o[e.getDay()]},dddd:function(e){return a[e.getDay()]},A:function(e){return e.getHours()/12>=1?u[1]:u[0]},a:function(e){return e.getHours()/12>=1?i[1]:i[0]},aa:function(e){return e.getHours()/12>=1?s[1]:s[0]}};return["M","D","DDD","d","Q","W"].forEach(function(e){c[e+"o"]=function(t,n){return function(e){var t=e%100;if(t>20||t<10)switch(t%10){case 1:return e+"st";case 2:return e+"nd";case 3:return e+"rd"}return e+"th"}(n[e](t))}}),{formatters:c,formattingTokensRegExp:r(c)}}},function(e,t){var n=["M","MM","Q","D","DD","DDD","DDDD","d","E","W","WW","YY","YYYY","GG","GGGG","H","HH","h","hh","m","mm","s","ss","S","SS","SSS","Z","ZZ","X","x"];e.exports=function(e){var t=[];for(var r in e)e.hasOwnProperty(r)&&t.push(r);var o=n.concat(t).sort().reverse();return new RegExp("(\\[[^\\[]*\\])|(\\\\)?("+o.join("|")+"|.)","g")}},function(e,t,n){var r=n(23),o=n(0),a=n(25),u=n(26),i=1440,s=43200,c=525600;e.exports=function(e,t,n){var f=n||{},l=r(e,t),d=f.locale,v=u.distanceInWords.localize;d&&d.distanceInWords&&d.distanceInWords.localize&&(v=d.distanceInWords.localize);var p,m,g,h={addSuffix:Boolean(f.addSuffix),comparison:l};l>0?(p=o(e),m=o(t)):(p=o(t),m=o(e));var x=Math[f.partialMethod?String(f.partialMethod):"floor"],M=a(m,p),D=m.getTimezoneOffset()-p.getTimezoneOffset(),T=x(M/60)-D;if("s"===(g=f.unit?String(f.unit):T<1?"s":T<60?"m":T<i?"h":T<s?"d":T<c?"M":"Y"))return v("xSeconds",M,h);if("m"===g)return v("xMinutes",T,h);if("h"===g)return v("xHours",x(T/60),h);if("d"===g)return v("xDays",x(T/i),h);if("M"===g)return v("xMonths",x(T/s),h);if("Y"===g)return v("xYears",x(T/c),h);throw new Error("Unknown unit: "+g)}},function(e,t,n){var r=n(51);e.exports=function(e,t){return r(Date.now(),e,t)}},function(e,t,n){var r=n(0);e.exports=function(e,t,n){var o=r(e),a=void 0!==n?n:1,u=r(t).getTime();if(o.getTime()>u)throw new Error("The first date cannot be after the second date");var i=[],s=o;for(s.setHours(0,0,0,0);s.getTime()<=u;)i.push(r(s)),s.setDate(s.getDate()+a);return i}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setMinutes(59,59,999),t}},function(e,t,n){var r=n(52);e.exports=function(e){return r(e,{weekStartsOn:1})}},function(e,t,n){var r=n(1),o=n(2);e.exports=function(e){var t=r(e),n=new Date(0);n.setFullYear(t+1,0,4),n.setHours(0,0,0,0);var a=o(n);return a.setMilliseconds(a.getMilliseconds()-1),a}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setSeconds(59,999),t}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getMonth(),o=n-n%3+3;return t.setMonth(o,0),t.setHours(23,59,59,999),t}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setMilliseconds(999),t}},function(e,t,n){var r=n(27);e.exports=function(){return r(new Date)}},function(e,t){e.exports=function(){var e=new Date,t=e.getFullYear(),n=e.getMonth(),r=e.getDate(),o=new Date(0);return o.setFullYear(t,n,r+1),o.setHours(23,59,59,999),o}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getFullYear();return t.setFullYear(n+1,0,0),t.setHours(23,59,59,999),t}},function(e,t){e.exports=function(){var e=new Date,t=e.getFullYear(),n=e.getMonth(),r=e.getDate(),o=new Date(0);return o.setFullYear(t,n,r-1),o.setHours(23,59,59,999),o}},function(e,t,n){var r=n(54),o=n(28),a=n(1),u=n(0),i=n(56),s=n(26);var c={M:function(e){return e.getMonth()+1},MM:function(e){return l(e.getMonth()+1,2)},Q:function(e){return Math.ceil((e.getMonth()+1)/3)},D:function(e){return e.getDate()},DD:function(e){return l(e.getDate(),2)},DDD:function(e){return r(e)},DDDD:function(e){return l(r(e),3)},d:function(e){return e.getDay()},E:function(e){return e.getDay()||7},W:function(e){return o(e)},WW:function(e){return l(o(e),2)},YY:function(e){return l(e.getFullYear(),4).substr(2)},YYYY:function(e){return l(e.getFullYear(),4)},GG:function(e){return String(a(e)).substr(2)},GGGG:function(e){return a(e)},H:function(e){return e.getHours()},HH:function(e){return l(e.getHours(),2)},h:function(e){var t=e.getHours();return 0===t?12:t>12?t%12:t},hh:function(e){return l(c.h(e),2)},m:function(e){return e.getMinutes()},mm:function(e){return l(e.getMinutes(),2)},s:function(e){return e.getSeconds()},ss:function(e){return l(e.getSeconds(),2)},S:function(e){return Math.floor(e.getMilliseconds()/100)},SS:function(e){return l(Math.floor(e.getMilliseconds()/10),2)},SSS:function(e){return l(e.getMilliseconds(),3)},Z:function(e){return f(e.getTimezoneOffset(),":")},ZZ:function(e){return f(e.getTimezoneOffset())},X:function(e){return Math.floor(e.getTime()/1e3)},x:function(e){return e.getTime()}};function f(e,t){t=t||"";var n=e>0?"-":"+",r=Math.abs(e),o=r%60;return n+l(Math.floor(r/60),2)+t+l(o,2)}function l(e,t){for(var n=Math.abs(e).toString();n.length<t;)n="0"+n;return n}e.exports=function(e,t,n){var r=t?String(t):"YYYY-MM-DDTHH:mm:ss.SSSZ",o=(n||{}).locale,a=s.format.formatters,f=s.format.formattingTokensRegExp;o&&o.format&&o.format.formatters&&(a=o.format.formatters,o.format.formattingTokensRegExp&&(f=o.format.formattingTokensRegExp));var l=u(e);return i(l)?function(e,t,n){var r,o,a,u=e.match(n),i=u.length;for(r=0;r<i;r++)o=t[u[r]]||c[u[r]],u[r]=o||((a=u[r]).match(/\[[\s\S]/)?a.replace(/^\[|]$/g,""):a.replace(/\\/g,""));return function(e){for(var t="",n=0;n<i;n++)u[n]instanceof Function?t+=u[n](e,c):t+=u[n];return t}}(r,a,f)(l):"Invalid Date"}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getDate()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getDay()}},function(e,t,n){var r=n(57);e.exports=function(e){return r(e)?366:365}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getHours()}},function(e,t,n){var r=n(9),o=n(22),a=6048e5;e.exports=function(e){var t=r(e),n=r(o(t,60)).valueOf()-t.valueOf();return Math.round(n/a)}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getMilliseconds()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getMinutes()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getMonth()}},function(e,t,n){var r=n(0),o=864e5;e.exports=function(e,t,n,a){var u=r(e).getTime(),i=r(t).getTime(),s=r(n).getTime(),c=r(a).getTime();if(u>i||s>c)throw new Error("The start of the range cannot be after the end of the range");if(!(u<c&&s<i))return 0;var f=(c>i?i:c)-(s<u?u:s);return Math.ceil(f/o)}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getSeconds()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getFullYear()}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()>o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()<o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){return 1===r(e).getDate()}},function(e,t,n){var r=n(0);e.exports=function(e){return 5===r(e).getDay()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getTime()>(new Date).getTime()}},function(e,t,n){var r=n(0),o=n(27),a=n(53);e.exports=function(e){var t=r(e);return o(t).getTime()===a(t).getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){return 1===r(e).getDay()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getTime()<(new Date).getTime()}},function(e,t,n){var r=n(3);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){return 6===r(e).getDay()}},function(e,t,n){var r=n(0);e.exports=function(e){return 0===r(e).getDay()}},function(e,t,n){var r=n(59);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(61);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(62);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(63);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(65);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(66);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(68);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(29);e.exports=function(e,t){return r(new Date,e,t)}},function(e,t,n){var r=n(70);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(0);e.exports=function(e){return 4===r(e).getDay()}},function(e,t,n){var r=n(3);e.exports=function(e){return r(e).getTime()===r(new Date).getTime()}},function(e,t,n){var r=n(3);e.exports=function(e){var t=new Date;return t.setDate(t.getDate()+1),r(e).getTime()===r(t).getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){return 2===r(e).getDay()}},function(e,t,n){var r=n(0);e.exports=function(e){return 3===r(e).getDay()}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e).getDay();return 0===t||6===t}},function(e,t,n){var r=n(0);e.exports=function(e,t,n){var o=r(e).getTime(),a=r(t).getTime(),u=r(n).getTime();if(a>u)throw new Error("The start of the range cannot be after the end of the range");return o>=a&&o<=u}},function(e,t,n){var r=n(3);e.exports=function(e){var t=new Date;return t.setDate(t.getDate()-1),r(e).getTime()===r(t).getTime()}},function(e,t,n){var r=n(71);e.exports=function(e){return r(e,{weekStartsOn:1})}},function(e,t,n){var r=n(1),o=n(2);e.exports=function(e){var t=r(e),n=new Date(0);n.setFullYear(t+1,0,4),n.setHours(0,0,0,0);var a=o(n);return a.setDate(a.getDate()-1),a}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getMonth();return t.setFullYear(t.getFullYear(),n+1,0),t.setHours(0,0,0,0),t}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getMonth(),o=n-n%3+3;return t.setMonth(o,0),t.setHours(0,0,0,0),t}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getFullYear();return t.setFullYear(n+1,0,0),t.setHours(0,0,0,0),t}},function(e,t,n){var r=n(0);e.exports=function(){var e=Array.prototype.slice.call(arguments).map(function(e){return r(e)}),t=Math.max.apply(null,e);return new Date(t)}},function(e,t,n){var r=n(0);e.exports=function(){var e=Array.prototype.slice.call(arguments).map(function(e){return r(e)}),t=Math.min.apply(null,e);return new Date(t)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setDate(o),n}},function(e,t,n){var r=n(0),o=n(7);e.exports=function(e,t,n){var a=n&&Number(n.weekStartsOn)||0,u=r(e),i=Number(t),s=u.getDay();return o(u,((i%7+7)%7<a?7:0)+i-s)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setMonth(0),n.setDate(o),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setHours(o),n}},function(e,t,n){var r=n(0),o=n(7),a=n(58);e.exports=function(e,t){var n=r(e),u=Number(t),i=a(n);return o(n,u-i)}},function(e,t,n){var r=n(0),o=n(28);e.exports=function(e,t){var n=r(e),a=Number(t),u=o(n)-a;return n.setDate(n.getDate()-7*u),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setMilliseconds(o),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setMinutes(o),n}},function(e,t,n){var r=n(0),o=n(72);e.exports=function(e,t){var n=r(e),a=Number(t)-(Math.floor(n.getMonth()/3)+1);return o(n,n.getMonth()+3*a)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setSeconds(o),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setFullYear(o),n}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setDate(1),t.setHours(0,0,0,0),t}},function(e,t,n){var r=n(3);e.exports=function(){return r(new Date)}},function(e,t){e.exports=function(){var e=new Date,t=e.getFullYear(),n=e.getMonth(),r=e.getDate(),o=new Date(0);return o.setFullYear(t,n,r+1),o.setHours(0,0,0,0),o}},function(e,t){e.exports=function(){var e=new Date,t=e.getFullYear(),n=e.getMonth(),r=e.getDate(),o=new Date(0);return o.setFullYear(t,n,r-1),o.setHours(0,0,0,0),o}},function(e,t,n){var r=n(7);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(38);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(8);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(41);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(14);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(42);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(43);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(22);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(44);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";n.r(t);n(91);var r=n(6),o=n(11);const a=new Blob(['!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);const n=new Map,o=new Map,i=(e,t)=>{let r,n;if("performance"in self){const o=performance.now();r=o,n=e-Math.max(0,o-t)}else r=Date.now(),n=e;return{expected:r+n,remainingDelay:n}},s=(e,t,r,n)=>{const o="performance"in self?performance.now():Date.now();o>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:n}}):e.set(t,setTimeout(s,r-o,e,t,r,n))};addEventListener("message",e=>{let t=e.data;try{if("clear"===t.method){const e=t.id,r=t.params,i=r.timerId,s=r.timerType;if("interval"===s)(e=>{const t=n.get(e);if(void 0===t)throw new Error(\'There is no interval scheduled with the given id "\'.concat(e,\'".\'));clearTimeout(t),n.delete(e)})(i),postMessage({error:null,id:e});else{if("timeout"!==s)throw new Error(\'The given type "\'.concat(s,\'" is not supported\'));(e=>{const t=o.get(e);if(void 0===t)throw new Error(\'There is no timeout scheduled with the given id "\'.concat(e,\'".\'));clearTimeout(t),o.delete(e)})(i),postMessage({error:null,id:e})}}else{if("set"!==t.method)throw new Error(\'The given method "\'.concat(t.method,\'" is not supported\'));{const e=t.params,r=e.delay,a=e.now,l=e.timerId,c=e.timerType;if("interval"===c)((e,t,r)=>{const o=i(e,r),a=o.expected,l=o.remainingDelay;n.set(t,setTimeout(s,l,n,t,a,"interval"))})(r,l,a);else{if("timeout"!==c)throw new Error(\'The given type "\'.concat(c,\'" is not supported\'));((e,t,r)=>{const n=i(e,r),a=n.expected,l=n.remainingDelay;o.set(t,setTimeout(s,l,o,t,a,"timeout"))})(r,l,a)}}}}catch(e){postMessage({error:{message:e.message},id:t.id,result:null})}})}]);'],{type:"application/javascript; charset=utf-8"}),u=URL.createObjectURL(a),i=(e=>{const t=new Map,n=new Map,r=new Map,a=new Worker(e);a.addEventListener("message",({data:e})=>{if((e=>void 0!==e.method&&"call"===e.method)(e)){const{params:{timerId:o,timerType:a}}=e;if("interval"===a){const e=t.get(o);if("number"==typeof e){const t=r.get(e);if(void 0===t||t.timerId!==o||t.timerType!==a)throw new Error("The timer is in an undefined state.")}else{if(void 0===e)throw new Error("The timer is in an undefined state.");e()}}else if("timeout"===a){const e=n.get(o);if("number"==typeof e){const t=r.get(e);if(void 0===t||t.timerId!==o||t.timerType!==a)throw new Error("The timer is in an undefined state.")}else{if(void 0===e)throw new Error("The timer is in an undefined state.");e(),n.delete(o)}}}else{if(!(e=>null===e.error&&"number"==typeof e.id)(e)){const{error:{message:t}}=e;throw new Error(t)}{const{id:o}=e,a=r.get(o);if(void 0===a)throw new Error("The timer is in an undefined state.");{const{timerId:e,timerType:u}=a;r.delete(o),"interval"===u?t.delete(e):n.delete(e)}}}});return{clearInterval:e=>{const n=Object(o.generateUniqueNumber)(r);r.set(n,{timerId:e,timerType:"interval"}),t.set(e,n),a.postMessage({id:n,method:"clear",params:{timerId:e,timerType:"interval"}})},clearTimeout:e=>{const t=Object(o.generateUniqueNumber)(r);r.set(t,{timerId:e,timerType:"timeout"}),n.set(e,t),a.postMessage({id:t,method:"clear",params:{timerId:e,timerType:"timeout"}})},setInterval:(e,n)=>{const r=Object(o.generateUniqueNumber)(t);return t.set(r,()=>{e(),"function"==typeof t.get(r)&&a.postMessage({id:null,method:"set",params:{delay:n,now:performance.now(),timerId:r,timerType:"interval"}})}),a.postMessage({id:null,method:"set",params:{delay:n,now:performance.now(),timerId:r,timerType:"interval"}}),r},setTimeout:(e,t)=>{const r=Object(o.generateUniqueNumber)(n);return n.set(r,e),a.postMessage({id:null,method:"set",params:{delay:t,now:performance.now(),timerId:r,timerType:"timeout"}}),r}}})(u),s=i.clearInterval,c=(i.clearTimeout,i.setInterval);i.setTimeout;URL.revokeObjectURL(u);var f,l,d,v=io(host),p=new Audio("/audio/5-minutes.wav"),m=new Audio("/audio/3-minutes.wav"),g=new Audio("/audio/1-minute.wav"),h=new Audio("/audio/5.wav"),x=new Audio("/audio/3.wav"),M=new Audio("/audio/2.wav"),D=new Audio("/audio/1.wav"),T=new Audio("/audio/0.wav");function y(){var e=Date.now();return $.get("/api/countdown",function(t){var n=Date.now()-e;f=Object(r.addMilliseconds)(new Date(t.data.currentTime),n),l=new Date(t.data.eventTime)})}function w(){var e=$("#step-1 h1"),t=Object(r.differenceInMinutes)(l,f),n=Object(r.differenceInSeconds)(l,f)%60;if(t<1){var o=100*Math.floor(Object(r.differenceInMilliseconds)(l,f)%1e3/100);e.text("".concat(n,".").concat(String(o).charAt(0),"s")),5===n&&0===o&&h.play(),3===n&&0===o&&x.play(),2===n&&0===o&&M.play(),1===n&&0===o&&D.play(),n<=0&&o<=0&&(T.play(),s(d),e.text("Go!"),$("#step-1 p").hide(),setTimeout(b,2500))}else e.text("".concat(t,"m ").concat(n,"s")),5===t&&0===n&&p.play(),3===t&&0===n&&m.play(),1===t&&0===n&&g.play();f=Object(r.addMilliseconds)(f,100)}function b(){$("#step-1").fadeOut(250,function(){$("#step-2").fadeIn(300,function(){})})}function S(e){13===(e.keyCode||e.which)&&O(e)}function O(e){e.preventDefault();var t=$("#step-2 .alert.alert-danger");t.addClass("d-none");var n=$("#step-2 .needs-validation").get(0),r=n.checkValidity();if($(n).addClass("was-validated"),!1!==r){var o=$("#step-2 .btn.btn-primary"),a=o.html();o.html('<span class="spinner-border spinner-border-sm"></span> Loading...'),o.attr("disabled",!0);var u=$("#step-2 input[name=serverId]").val();$.ajax({url:"/api/matches/".concat(u),type:"PUT"}).done(function(e){$("#in-match-counter").text(e.data),v.on(u,function(e){$("#in-match-counter").text(e),e<5?$("#step-3 .alert.alert-warning").removeClass("d-none"):$("#step-3 .alert.alert-warning").addClass("d-none")}),$("#step-2").fadeOut(250,function(){$("#step-3").fadeIn(300,function(){setTimeout(function(){location.reload()},6e4)})})}).fail(function(e){o.html(a),o.attr("disabled",!1),t.text(e.responseJSON.message?e.responseJSON.message:"Uh-oh! An error occurred."),t.removeClass("d-none")})}}$(function(){0!==$("#step-1, #step-2, #step-3").length&&(y().then(function(){w(),d=c(w,100),setInterval(function(){y()},15e3)}),v.on("onlineCounter",function(e){$("#online-counter").text(e)}),$("#step-2 .form-control").keypress(S),$("#step-2 button").click(O))})}]);