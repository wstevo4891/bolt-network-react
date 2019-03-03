// app/javascript/main/services/LocalStorageSpace.js

export default class LocalStorageSpace {
  constructor() {
    this._lsTotal = 0
  }

  call = () => {
    for (let _x in localStorage) {
      if (!localStorage.hasOwnProperty(_x)) continue

      let _xLen = ((localStorage[_x].length + _x.length) * 2)

      this._lsTotal += _xLen

      console.log(_x.substr(0, 50)+" = "+ (_xLen / 1024).toFixed(2)+" KB")
    }

    console.log("Total = " + (this._lsTotal / 1024).toFixed(2) + " KB")
  }
}
