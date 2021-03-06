/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [14],
    {
      392: function (ia, da, e) {
        e.r(da)
        var ba = e(1),
          ea = e(0)
        e.n(ea)
        var aa = e(2),
          ha = e(138)
        ia = e(48)
        var ca = e(88),
          z = e(233),
          w = e(64),
          y = e(232)
        e = e(351)
        var r = window,
          n = (function () {
            function e(e, f, h) {
              var n = -1 === e.indexOf("?") ? "?" : "&"
              switch (f) {
                case w.a.NEVER_CACHE:
                  this.url = e + n + "_=" + Object(ea.uniqueId)()
                  break
                default:
                  this.url = e
              }
              this.Ue = h
              this.request = new XMLHttpRequest()
              this.request.open("GET", this.url, !0)
              this.request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
              this.request.overrideMimeType
                ? this.request.overrideMimeType("text/plain; charset=x-user-defined")
                : this.request.setRequestHeader("Accept-Charset", "x-user-defined")
              this.status = y.a.NOT_STARTED
            }
            e.prototype.start = function (f, h) {
              var n = this,
                r = this,
                w = this.request,
                x
              r.Iv = 0
              f &&
                Object.keys(f).forEach(function (e) {
                  n.request.setRequestHeader(e, f[e])
                })
              h && (this.request.withCredentials = h)
              this.jC = setInterval(function () {
                var f = 0 === window.document.URL.indexOf("file:///")
                f = 200 === w.status || (f && 0 === w.status)
                if (w.readyState !== y.b.DONE || f) {
                  try {
                    w.responseText
                  } catch (oa) {
                    return
                  }
                  r.Iv < w.responseText.length && (x = r.tca()) && r.trigger(e.Events.DATA, [x])
                  0 === w.readyState && (clearInterval(r.jC), r.trigger(e.Events.DONE))
                } else clearInterval(r.jC), r.trigger(e.Events.DONE, ["Error received return status " + w.status])
              }, 1e3)
              this.request.send(null)
              this.status = y.a.STARTED
            }
            e.prototype.tca = function () {
              var f = this.request,
                h = f.responseText
              if (0 !== h.length)
                if (this.Iv === h.length) clearInterval(this.jC), this.trigger(e.Events.DONE)
                else
                  return (
                    (h = Math.min(this.Iv + 3e6, h.length)),
                    (f = r.iR(f, this.Iv, !0, h)),
                    (this.Iv = h),
                    f
                  )
            }
            e.prototype.abort = function () {
              clearInterval(this.jC)
              var f = this
              this.request.onreadystatechange = function () {
                Object(aa.i)("StreamingRequest aborted")
                f.status = y.a.ABORTED
                return f.trigger(e.Events.ABORTED)
              }
              this.request.abort()
            }
            e.prototype.finish = function () {
              var f = this
              this.request.onreadystatechange = function () {
                f.status = y.a.SUCCESS
                return f.trigger(e.Events.DONE)
              }
              this.request.abort()
            }
            e.Events = { DONE: "done", DATA: "data", ABORTED: "aborted" }
            return e
          })()
        Object(ia.a)(n)
        var h
        ;(function (e) {
          e[(e.LOCAL_HEADER = 0)] = "LOCAL_HEADER"
          e[(e.FILE = 1)] = "FILE"
          e[(e.CENTRAL_DIR = 2)] = "CENTRAL_DIR"
        })(h || (h = {}))
        var f = (function (e) {
          function f() {
            var f = e.call(this) || this
            f.buffer = ""
            f.state = h.LOCAL_HEADER
            f.FK = 4
            f.gl = null
            f.Zr = ha.c
            f.ym = {}
            return f
          }
          Object(ba.c)(f, e)
          f.prototype.nca = function (e) {
            var n
            for (e = this.buffer + e; e.length >= this.Zr; )
              switch (this.state) {
                case h.LOCAL_HEADER:
                  this.gl = n = this.xca(e.slice(0, this.Zr))
                  if (n.Hs !== ha.g) throw Error("Wrong signature in local header: " + n.Hs)
                  e = e.slice(this.Zr)
                  this.state = h.FILE
                  this.Zr = n.pF + n.pp + n.Ou + this.FK
                  this.trigger(f.Events.HEADER, [n])
                  break
                case h.FILE:
                  this.gl.name = e.slice(0, this.gl.pp)
                  this.ym[this.gl.name] = this.gl
                  n = this.Zr - this.FK
                  var r = e.slice(this.gl.pp + this.gl.Ou, n)
                  this.trigger(f.Events.FILE, [this.gl.name, r, this.gl.GF])
                  e = e.slice(n)
                  if (e.slice(0, this.FK) === ha.h) (this.state = h.LOCAL_HEADER), (this.Zr = ha.c)
                  else return (this.state = h.CENTRAL_DIR), !0
              }
            this.buffer = e
            return !1
          }
          f.Events = { HEADER: "header", FILE: "file" }
          return f
        })(z.a)
        Object(ia.a)(f)
        ia = (function (e) {
          function h(h, r, w, x, y) {
            w = e.call(this, h, w, x) || this
            w.url = h
            w.stream = new n(h, r)
            w.Ld = new f()
            w.$T = window.createPromiseCapability()
            w.zU = {}
            w.Ue = y
            return w
          }
          Object(ba.c)(h, e)
          h.prototype.yw = function (e) {
            var h = this
            this.request([this.Ii, this.$j, this.Hi])
            this.stream.addEventListener(n.Events.DATA, function (f) {
              try {
                if (h.Ld.nca(f)) return h.stream.finish()
              } catch (pa) {
                throw (h.stream.abort(), h.Lu(pa), e(pa), pa)
              }
            })
            this.stream.addEventListener(n.Events.DONE, function (f) {
              h.Sba = !0
              h.$T.resolve()
              f && (h.Lu(f), e(f))
            })
            this.Ld.addEventListener(f.Events.HEADER, Object(ea.bind)(this.yU, this))
            this.Ld.addEventListener(f.Events.FILE, Object(ea.bind)(this.Nca, this))
            return this.stream.start(this.Ue, this.withCredentials)
          }
          h.prototype.fR = function (e) {
            var f = this
            this.$T.promise.then(function () {
              e(Object.keys(f.Ld.ym))
            })
          }
          h.prototype.bn = function () {
            return !0
          }
          h.prototype.request = function (e) {
            var f = this
            this.Sba &&
              e.forEach(function (e) {
                f.zU[e] || f.dha(e)
              })
          }
          h.prototype.yU = function () {}
          h.prototype.abort = function () {
            this.stream && this.stream.abort()
          }
          h.prototype.dha = function (e) {
            this.trigger(ca.a.Events.PART_READY, [
              { bb: e, error: "Requested part not found", Uh: !1, Jf: !1 },
            ])
          }
          h.prototype.Nca = function (e, f, h) {
            this.zU[e] = !0
            this.trigger(ca.a.Events.PART_READY, [
              { bb: e, data: f, Uh: !1, Jf: !1, error: null, Vc: h },
            ])
          }
          return h
        })(ca.a)
        Object(e.a)(ia)
        Object(e.b)(ia)
        da["default"] = ia
      },
    },
  ])
}.call(this || window))
