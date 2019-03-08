// app/assets/javascripts/printLocalStorageSpace.js

function printLocalStorageSpace() {
  var _lsTotal = 0;
  var keys = Object.keys(localStorage);
  var limit = keys.length;
  var _x;

  for (var i = 0; i < limit; i++) {
    _x = keys[i];

    if (!localStorage.hasOwnProperty(_x)) continue;

    var _xLen = ((localStorage[_x].length + _x.length) * 2);

    _lsTotal += _xLen;

    console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2)+ " KB");
  }

  console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
}
