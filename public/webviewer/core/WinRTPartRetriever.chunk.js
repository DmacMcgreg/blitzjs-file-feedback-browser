/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [17],
    {
      393: function (ia, da, e) {
        e.r(da)
        var ba = e(1),
          ea = e(232)
        ia = e(383)
        var aa = e(88)
        e = e(351)
        var ha = {},
          ca = (function (e) {
            function w(w, r) {
              var n = e.call(this, w, r) || this
              n.url = w
              n.range = r
              n.status = ea.a.NOT_STARTED
              return n
            }
            Object(ba.c)(w, e)
            w.prototype.start = function (e) {
              var r = this
              "undefined" === typeof ha[this.range.start] &&
                ((ha[this.range.start] = {
                  Os: function (n) {
                    var h = atob(n),
                      f,
                      w = h.length
                    n = new Uint8Array(w)
                    for (f = 0; f < w; ++f) n[f] = h.charCodeAt(f)
                    h = n.length
                    f = ""
                    for (var y = 0; y < h; )
                      (w = n.subarray(y, y + 1024)),
                        (y += 1024),
                        (f += String.fromCharCode.apply(null, w))
                    r.Os(f, e)
                  },
                  dQ: function () {
                    r.status = ea.a.ERROR
                    e({ code: r.status })
                  },
                }),
                window.external.Vka(this.url),
                (this.status = ea.a.STARTED))
              r.NA()
            }
            return w
          })(ia.ByteRangeRequest)
        ia = (function (e) {
          function w(w, r, n, h) {
            w = e.call(this, w, n, h) || this
            w.pw = ca
            return w
          }
          Object(ba.c)(w, e)
          w.prototype.zu = function (e, r) {
            return e + "?" + r.start + "&" + (r.stop ? r.stop : "")
          }
          return w
        })(aa.a)
        Object(e.a)(ia)
        Object(e.b)(ia)
        da["default"] = ia
      },
    },
  ])
}.call(this || window))
