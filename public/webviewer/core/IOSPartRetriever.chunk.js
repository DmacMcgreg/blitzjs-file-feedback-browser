/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [9],
    {
      391: function (ia, da, e) {
        e.r(da)
        var ba = e(1),
          ea = e(232)
        ia = e(383)
        var aa = e(29)
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
              ha[this.range.start] = {
                Os: function (h) {
                  var f = atob(h),
                    n,
                    w = f.length
                  h = new Uint8Array(w)
                  for (n = 0; n < w; ++n) h[n] = f.charCodeAt(n)
                  f = h.length
                  n = ""
                  var y = 0
                  if (Object(aa.q)())
                    for (; y < f; )
                      (w = h.subarray(y, y + 1024)),
                        (y += 1024),
                        (n += String.fromCharCode.apply(null, w))
                  else
                    for (w = Array(1024); y < f; ) {
                      for (var z = 0, ca = Math.min(y + 1024, f); y < ca; z++, y++) w[z] = h[y]
                      n += String.fromCharCode.apply(null, 1024 > z ? w.slice(0, z) : w)
                    }
                  r.Os(n, e)
                },
                dQ: function () {
                  r.status = ea.a.ERROR
                  e({ code: r.status })
                },
              }
              var n = document.createElement("IFRAME")
              n.setAttribute("src", this.url)
              document.documentElement.appendChild(n)
              n.parentNode.removeChild(n)
              n = null
              this.status = ea.a.STARTED
              r.NA()
            }
            return w
          })(ia.ByteRangeRequest)
        ia = (function (e) {
          function w(w, r, n, h) {
            w = e.call(this, w, r, n, h) || this
            w.pw = ca
            return w
          }
          Object(ba.c)(w, e)
          w.prototype.zu = function (e, r) {
            return e + "#" + r.start + "&" + (r.stop ? r.stop : "")
          }
          w.gla = function (e, r) {
            var n = ha[r]
            delete ha[r]
            n.Os(e)
          }
          w.fla = function (e, r) {
            e = ha[r]
            delete ha[r]
            e.dQ()
          }
          return w
        })(ia["default"])
        Object(e.a)(ia)
        Object(e.b)(ia)
        da["default"] = ia
      },
    },
  ])
}.call(this || window))
