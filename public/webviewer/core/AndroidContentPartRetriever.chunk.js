/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [3],
    {
      387: function (ia, da, e) {
        e.r(da)
        var ba = e(1),
          ea = e(232)
        ia = e(383)
        e = e(351)
        var aa = window,
          ha = (function (e) {
            function z(w, y) {
              var r = e.call(this, w, y) || this
              r.url = w
              r.range = y
              r.request = new XMLHttpRequest()
              r.request.open("GET", r.url, !0)
              aa.Uint8Array && (r.request.responseType = "arraybuffer")
              r.request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
              r.status = ea.a.NOT_STARTED
              return r
            }
            Object(ba.c)(z, e)
            return z
          })(ia.ByteRangeRequest)
        ia = (function (e) {
          function z(w, y, r, n) {
            w = e.call(this, w, y, r, n) || this
            w.pw = ha
            return w
          }
          Object(ba.c)(z, e)
          z.prototype.zu = function (e, y) {
            return e + "/bytes=" + y.start + "," + (y.stop ? y.stop : "")
          }
          return z
        })(ia["default"])
        Object(e.a)(ia)
        Object(e.b)(ia)
        da["default"] = ia
      },
    },
  ])
}.call(this || window))
