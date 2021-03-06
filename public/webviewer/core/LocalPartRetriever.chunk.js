/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [10],
    {
      385: function (ia, da, e) {
        e.r(da)
        var ba = e(1),
          ea = e(2),
          aa = e(138)
        ia = e(88)
        var ha = e(233)
        e = e(351)
        var ca = window
        ia = (function (e) {
          function w(w, r, n) {
            r = e.call(this, w, r, n) || this
            if (w.name && "xod" !== w.name.toLowerCase().split(".").pop())
              throw Error("Not an XOD file")
            if (!ca.FileReader || !ca.File || !ca.Blob)
              throw Error("File API is not supported in this browser")
            r.file = w
            r.zz = []
            r.MF = 0
            return r
          }
          Object(ba.c)(w, e)
          w.prototype.yI = function (e, r, n) {
            var h = this,
              f = new FileReader()
            f.onloadend = function (e) {
              if (0 < h.zz.length) {
                var w = h.zz.shift()
                w.Mca.readAsBinaryString(w.file)
              } else h.MF--
              if (f.error) {
                e = f.error
                if (e.code === e.ABORT_ERR) {
                  Object(ea.i)("Request for chunk " + r.start + "-" + r.stop + " was aborted")
                  return
                }
                return n(e)
              }
              if ((e = f.content || e.target.result)) return n(!1, e)
              Object(ea.i)("No data was returned from FileReader.")
            }
            r && (e = (e.slice || e.webkitSlice || e.mozSlice || e.cka).call(e, r.start, r.stop))
            0 === h.zz.length && 50 > h.MF
              ? (f.readAsBinaryString(e), h.MF++)
              : h.zz.push({ Mca: f, file: e })
            return function () {
              f.abort()
            }
          }
          w.prototype.Vr = function (e) {
            var r = this
            r.vz = !0
            var n = aa.a
            r.yI(r.file, { start: -n, stop: r.file.size }, function (h, f) {
              if (h) return Object(ea.i)("Error loading end header: %s " + h), e(h)
              if (f.length !== n) throw Error("Zip end header data is wrong size!")
              r.Ld = new ha.a(f)
              var w = r.Ld.KQ()
              r.yI(r.file, w, function (f, h) {
                if (f) return Object(ea.i)("Error loading central directory: %s " + f), e(f)
                if (h.length !== w.stop - w.start)
                  throw Error("Zip central directory data is wrong size!")
                r.Ld.pU(h)
                r.yF = !0
                r.vz = !1
                return e(!1)
              })
            })
          }
          w.prototype.tJ = function (e, r) {
            var n = this,
              h = n.vh[e]
            if (n.Ld.iP(e)) {
              var f = n.Ld.$u(e),
                w = n.yI(n.file, f, function (h, w) {
                  delete n.vh[e]
                  if (h) return Object(ea.i)('Error loading part "%s": %s, ' + e + ", " + h), r(h)
                  if (w.length !== f.stop - f.start) throw Error("Part data is wrong size!")
                  r(!1, e, w, n.Ld.dS(e))
                })
              h.rW = !0
              h.cancel = w
            } else r(Error('File not found: "' + e + '"'), e)
          }
          return w
        })(ia.a)
        Object(e.a)(ia)
        Object(e.b)(ia)
        da["default"] = ia
      },
    },
  ])
}.call(this || window))
