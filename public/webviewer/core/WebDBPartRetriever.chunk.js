/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [15],
    {
      395: function (ia, da, e) {
        e.r(da)
        var ba = e(1),
          ea = e(0)
        e.n(ea)
        ia = e(88)
        e = e(351)
        ia = (function (e) {
          function aa(aa, z, w) {
            z = e.call(this, aa, z, w) || this
            z.db = aa
            return z
          }
          Object(ba.c)(aa, e)
          aa.prototype.request = function (e) {
            var z = this
            Object(ea.each)(e, function (e) {
              z.db.get(e, function (w, r, n) {
                return w
                  ? z.trigger("partReady", { bb: e, error: w })
                  : z.trigger("partReady", { bb: e, data: r, Uh: !1, Jf: !1, error: null, Vc: n })
              })
            })
          }
          aa.prototype.Vr = function (e) {
            e()
          }
          return aa
        })(ia.a)
        Object(e.a)(ia)
        Object(e.b)(ia)
        da["default"] = ia
      },
    },
  ])
}.call(this || window))
