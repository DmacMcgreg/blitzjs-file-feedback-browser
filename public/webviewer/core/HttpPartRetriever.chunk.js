/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [0],
    {
      383: function (ia, da, e) {
        e.r(da)
        e.d(da, "ByteRangeRequest", function () {
          return ma
        })
        var ba = e(1),
          ea = e(0)
        e.n(ea)
        var aa = e(2),
          ha = e(138)
        ia = e(88)
        var ca = e(233),
          z = e(68),
          w = e(64),
          y = e(232),
          r = e(158)
        e = e(351)
        var n = [],
          h = [],
          f = window,
          x = (function () {
            return function () {
              this.sl = 1
            }
          })(),
          fa
        ;(function (f) {
          f[(f.UNSENT = 0)] = "UNSENT"
          f[(f.DONE = 4)] = "DONE"
        })(fa || (fa = {}))
        var ma = (function () {
            function e(e, h, n, r) {
              var w = this
              this.url = e
              this.range = h
              this.Ue = n
              this.withCredentials = r
              this.FZ = fa
              this.request = new XMLHttpRequest()
              this.request.open("GET", this.url, !0)
              f.Uint8Array && (this.request.responseType = "arraybuffer")
              r && (this.request.withCredentials = r)
              ja.DISABLE_RANGE_HEADER ||
                (Object(ea.isUndefined)(h.stop)
                  ? this.request.setRequestHeader("Range", "bytes=" + h.start)
                  : this.request.setRequestHeader(
                      "Range",
                      ["bytes=", h.start, "-", h.stop - 1].join("")
                    ))
              this.request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
              n &&
                Object.keys(n).forEach(function (f) {
                  w.request.setRequestHeader(f, n[f])
                })
              this.request.overrideMimeType
                ? this.request.overrideMimeType("text/plain; charset=x-user-defined")
                : this.request.setRequestHeader("Accept-Charset", "x-user-defined")
              this.status = y.a.NOT_STARTED
            }
            e.prototype.start = function (e) {
              var h = this,
                n = this.request
              n.onreadystatechange = function () {
                if (h.aborted) return (h.status = y.a.ABORTED), e({ code: y.a.ABORTED })
                if (this.readyState === h.FZ.DONE) {
                  h.NA()
                  var r = 0 === window.document.URL.indexOf("file:///")
                  200 === n.status || 206 === n.status || (r && 0 === n.status)
                    ? ((r = f.iR(this)), h.Os(r, e))
                    : ((h.status = y.a.ERROR), e({ code: h.status, status: h.status }))
                }
              }
              this.request.send(null)
              this.status = y.a.STARTED
            }
            e.prototype.Os = function (f, e) {
              this.status = y.a.SUCCESS
              if (e) return e(!1, f)
            }
            e.prototype.abort = function () {
              this.NA()
              this.aborted = !0
              this.request.abort()
            }
            e.prototype.NA = function () {
              var f = Object(r.c)(this.url, this.range, h)
              ;-1 !== f && h.splice(f, 1)
              if (0 < n.length) {
                f = n.shift()
                var w = new e(f.url, f.range, this.Ue, this.withCredentials)
                f.request = w
                h.push(f)
                w.start(Object(r.d)(f))
              }
            }
            e.prototype.extend = function (f) {
              var e = Object.assign({}, this, f.prototype)
              e.constructor = f
              return e
            }
            return e
          })(),
          ja = (function (f) {
            function e(e, h, n, r, w) {
              n = f.call(this, e, n, r) || this
              n.ul = {}
              n.oz = h
              n.url = e
              n.DISABLE_RANGE_HEADER = !1
              n.pw = ma
              n.AL = 3
              n.Ue = w || {}
              return n
            }
            Object(ba.c)(e, f)
            e.prototype.zu = function (f, e, h) {
              var n = -1 === f.indexOf("?") ? "?" : "&"
              switch (h) {
                case !1:
                case w.a.NEVER_CACHE:
                  f = f + n + "_=" + Object(ea.uniqueId)()
                  break
                case !0:
                case w.a.CACHE:
                  f = f + n + "_=" + e.start + "," + (Object(ea.isUndefined)(e.stop) ? "" : e.stop)
              }
              return f
            }
            e.prototype.sP = function (f, e, h, n) {
              void 0 === h && (h = {})
              return new this.pw(f, e, h, n)
            }
            e.prototype.h6 = function (f, e, r, w, x) {
              for (var y = 0; y < n.length; y++)
                if (Object(ea.isEqual)(n[y].range, e) && Object(ea.isEqual)(n[y].url, f))
                  return n[y].og.push(w), n[y].NB++, null
              for (y = 0; y < h.length; y++)
                if (Object(ea.isEqual)(h[y].range, e) && Object(ea.isEqual)(h[y].url, f))
                  return h[y].og.push(w), h[y].NB++, null
              r = { url: f, range: e, oz: r, og: [w], NB: 1 }
              if (0 === n.length && h.length < this.AL)
                return h.push(r), (r.request = this.sP(f, e, x, this.withCredentials)), r
              n.push(r)
              return null
            }
            e.prototype.Um = function (f, e, w) {
              var x = this.zu(f, e, this.oz)
              ;(f = this.h6(x, e, this.oz, w, this.Ue)) && f.request.start(Object(r.d)(f))
              return function () {
                var f = Object(r.c)(x, e, h)
                if (-1 !== f) {
                  var w = --h[f].NB
                  0 === w && h[f].request && h[f].request.abort()
                } else
                  (f = Object(r.c)(x, e, n)),
                    -1 !== f && ((w = --n[f].NB), 0 === w && n.splice(f, 1))
              }
            }
            e.prototype.OQ = function () {
              return { start: -ha.a }
            }
            e.prototype.r9 = function () {
              var f = -(ha.a + ha.e)
              return { start: f - ha.d, end: f }
            }
            e.prototype.Vr = function (f) {
              var e = this
              this.vz = !0
              var h = ha.a
              this.Um(this.url, this.OQ(), function (n, r, w) {
                function x() {
                  var h = e.Ld.KQ()
                  e.Um(e.url, h, function (n, r) {
                    if (n) return Object(aa.i)("Error loading central directory: " + n), f(n)
                    r = Object(z.a)(r)
                    if (r.length !== h.stop - h.start)
                      return f(
                        "Invalid XOD file: Zip central directory data is wrong size! Should be " +
                          (h.stop - h.start) +
                          " but is " +
                          r.length
                      )
                    e.Ld.pU(r)
                    e.yF = !0
                    e.vz = !1
                    return f(!1)
                  })
                }
                if (n) return Object(aa.i)("Error loading end header: " + n), f(n, r, w)
                r = Object(z.a)(r)
                if (r.length !== h) return f("Invalid XOD file: Zip end header data is wrong size!")
                try {
                  e.Ld = new ca.a(r)
                } catch (ka) {
                  return f(ka)
                }
                e.Ld.S$
                  ? e.Um(e.url, e.r9(), function (h, n) {
                      if (h) return Object(aa.i)("Error loading zip64 header: " + h), f(h)
                      n = Object(z.a)(n)
                      e.Ld.jaa(n)
                      x()
                    })
                  : x()
              })
            }
            e.prototype.fR = function (f) {
              f(Object.keys(this.Ld.ym))
            }
            e.prototype.tJ = function (f, e) {
              var h = this
              if (this.Ld.iP(f)) {
                var n = this.Ld.FA(f)
                if (n in this.ul) {
                  var r = this.vh[f]
                  r.Qq = this.ul[n]
                  r.Qq.sl++
                  r.cancel = r.Qq.cancel
                } else {
                  var w = this.Ld.N7(f),
                    y = this.Um(this.url, w, function (r, x) {
                      r
                        ? (Object(aa.i)('Error loading part "' + f + '": ' + r),
                          h.Um(h.url, w, function (r, x) {
                            if (r) return e(r, f)
                            h.tU(x, w, n, f, e)
                          }))
                        : h.tU(x, w, n, f, e)
                    }),
                    z = this.vh[f]
                  z &&
                    ((z.rW = !0),
                    (z.cancel = function () {
                      z.Qq.sl--
                      0 === z.Qq.sl && (y(), delete h.ul[n])
                    }),
                    (this.ul[n] = new x(n)),
                    (z.Qq = this.ul[n]),
                    (z.Qq.cancel = z.cancel))
                }
              } else delete this.vh[f], e(Error('File not found: "' + f + '"'), f)
            }
            e.prototype.tU = function (f, e, h, n, r) {
              if (f.length !== e.stop - e.start) r(Error("Part data is wrong size!"), n)
              else {
                do {
                  if (!this.ul[h]) return
                  n = this.ul[h].sl
                  for (var w = e.Dp.length, x = 0; x < w; ++x) {
                    var y = e.Dp[x]
                    r(
                      !1,
                      y.yp,
                      f["string" === typeof f ? "substring" : "subarray"](y.start, y.stop),
                      this.Ld.dS(y.yp)
                    )
                    y.yp in this.vh && delete this.vh[y.yp]
                  }
                } while (n !== this.ul[h].sl)
                delete this.ul[h]
              }
            }
            e.DISABLE_RANGE_HEADER = !1
            e.AL = 3
            return e
          })(ia.a)
        ;(function (f) {
          function e(e, h, n) {
            var r = f.call(this) || this,
              w
            for (w in e) r[w] = e[w]
            r.bla = e
            r.startOffset = h
            r.endOffset = n
            r.sP = function (f, h, n, w) {
              Object(ea.isUndefined)(h.stop)
                ? ((h.start += r.endOffset), (h.stop = r.endOffset))
                : ((h.start += r.startOffset), (h.stop += r.startOffset))
              f = r.zu(r.url, h, r.oz)
              return new e.pw(f, h, n, w)
            }
            return r
          }
          Object(ba.c)(e, f)
          return e
        })(ja)
        Object(e.a)(ja)
        Object(e.b)(ja)
        da["default"] = ja
      },
    },
  ])
}.call(this || window))
