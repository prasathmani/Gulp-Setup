'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var odds = evens.map(function (v) {
    return v + 1;
});
var nums = evens.map(function (v, i) {
    return v + i;
});

var am = 'Developer Ujjwal';

var Hello = function Hello() {
    _classCallCheck(this, Hello);

    console.log('World');
};

new Hello();