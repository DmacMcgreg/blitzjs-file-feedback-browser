/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [4],
    {
      388: function (ia, da, e) {
        e.r(da)
        ia = e(48)
        e = e(351)
        var ba = (function () {
          function e(e) {
            this.buffer = e
            this.fileSize = null === e || void 0 === e ? void 0 : e.byteLength
          }
          e.prototype.getFileData = function (e) {
            e(new Uint8Array(this.buffer))
          }
          e.prototype.getFile = function () {
            return Promise.resolve(null)
          }
          return e
        })()
        Object(ia.a)(ba)
        Object(e.a)(ba)
        Object(e.b)(ba)
        da["default"] = ba
      },
    },
  ])
}.call(this || window))
