/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [5],
    {
      389: function (ia, da, e) {
        e.r(da)
        var ba = e(1),
          ea = e(138)
        ia = e(383)
        e = e(351)
        ia = (function (e) {
          function aa(aa, z, w, y) {
            return e.call(this, aa, z, w, y) || this
          }
          Object(ba.c)(aa, e)
          aa.prototype.OQ = function () {
            return { start: this.eQ - ea.a, stop: this.eQ }
          }
          aa.prototype.Vr = function (aa) {
            var z = this
            this.Um(this.url, { start: 0, stop: 1 }, function (w, y, r) {
              if (w) return aa(w)
              w = r.request.getResponseHeader("Content-Range")
              z.eQ = w.split("/")[1]
              e.prototype.Vr.call(z, aa)
            })
          }
          return aa
        })(ia["default"])
        Object(e.a)(ia)
        Object(e.b)(ia)
        da["default"] = ia
      },
    },
  ])
}.call(this || window))
