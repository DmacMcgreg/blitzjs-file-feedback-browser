/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [16],
    {
      394: function (ia, da, e) {
        function ba(e, f, h) {
          f.endsWith("/") || (f += "/")
          h = h || {}
          var n = h.disableWebsockets || !1
          this.hW = h.singleServerMode || !1
          null != h.customQueryParameters &&
            Object(x.b)("wvsQueryParameters", h.customQueryParameters)
          f.endsWith("blackbox/") || (f += "blackbox/")
          this.sn = h.uploadData || null
          this.hx = h.uriData || null
          this.QO = h.cacheKey || null
          this.mT = h.officeLocale || null
          this.yu = Object(r.a)(f, null, n)
          this.df = f
          this.YF = e
          this.uf = null
          this.Hj = aa()
          this.qm = aa()
          this.Gz = !1
          this.lg = this.Vd = this.ne = this.cf = null
          this.yf = []
          this.qA = []
          this.cache = {}
          this.timeStamp = 0
          this.Vf = []
          this.oh = []
          this.wG = null
          this.PF = !1
          this.ZJ = this.id = null
          this.xI = this.KR = ha
          this.yC = 0
          this.AH = !1
          this.hT = 1
          this.ki = {}
          this.Fq = 0
          this.ps = ea()
          this.Sp(!0)
        }
        function ea() {
          var e = {
            Fr: {},
            Fb: [],
            pop: function () {
              var f = e.Fb.pop()
              e.Fr[f.key] = void 0
              return f
            },
            push: function (f, h) {
              h = { key: f, data: h }
              e.Fb.push(h)
              e.Fr[f] = h.data
            },
            contains: function (f) {
              return !!e.Fr[f]
            },
            get: function (f) {
              return e.Fr[f]
            },
            set: function (f, h) {
              e.Fr[f] = h
              e.Fb.forEach(function (h, n) {
                h.key == f && (e.Fb[n] = h)
              })
            },
            remove: function (f) {
              e.Fr[f] = void 0
              e.Fb.forEach(function (h, n) {
                h.key == f && e.Fb.splice(n, 1)
              })
            },
            length: function () {
              return e.Fb.length
            },
          }
          return e
        }
        function aa() {
          var e = {
            promise: null,
            resolve: null,
            reject: null,
            state: 0,
            result: null,
            request: null,
            Qr: function () {
              return 1 === (e.state & 1)
            },
            I$: function () {
              return 2 === (e.state & 2)
            },
            hi: function () {
              return !e.I$() && !e.Qr()
            },
            l$: function () {
              return 4 === (e.state & 4)
            },
            CV: function () {
              e.state |= 4
            },
          }
          e.promise = new Promise(function (f, h) {
            e.resolve = function () {
              if (0 === e.state || 4 === e.state)
                (e.state = 1), (e.result = arguments[0]), f.apply(null, arguments)
            }
            e.reject = function () {
              if (0 === e.state || 4 === e.state) (e.state = 2), h.apply(null, arguments)
            }
          })
          return e
        }
        function ha() {
          return !1
        }
        function ca(e, f, h) {
          if (!(f in ma)) return !0
          f = ma[f]
          for (var n = 0; n < f.length; n++) {
            var r = e
            var w = f[n]
            var x = h
            if (w.name in r) {
              var y = "",
                aa = !1
              r = r[w.name]
              switch (w.type) {
                case "s":
                  y = "String"
                  aa = Object(z.isString)(r)
                  break
                case "a":
                  y = "Array"
                  aa = Object(z.isArray)(r)
                  break
                case "n":
                  y = "Number"
                  aa = Object(z.isNumber)(r) && Object(z.isFinite)(r)
                  break
                case "o":
                  ;(y = "Object"), (aa = Object(z.isObject)(r) && !Object(z.isArray)(r))
              }
              aa || x.reject('Expected response field "' + w.name + '" to have type ' + y)
              w = aa
            } else x.reject('Response missing field "' + w.name + '"'), (w = !1)
            if (!w) return !1
          }
          return !0
        }
        e.r(da)
        var z = e(0)
        e.n(z)
        var w = e(2)
        ia = e(48)
        var y = e(29),
          r = e(411),
          n = e(88),
          h = e(351),
          f = e(108),
          x = e(42),
          fa = e(158),
          ma = {
            pages: [{ name: "pages", type: "a" }],
            pdf: [{ name: "url", type: "s" }],
            docmod: [
              { name: "url", type: "s" },
              { name: "rID", type: "s" },
            ],
            health: [],
            tiles: [
              { name: "z", type: "n" },
              { name: "rID", type: "n" },
              { name: "tiles", type: "a" },
              { name: "size", type: "n" },
            ],
            annots: [
              { name: "url", type: "s" },
              { name: "name", type: "s" },
            ],
            image: [
              { name: "url", type: "s" },
              { name: "name", type: "s" },
              { name: "p", type: "n" },
            ],
            text: [
              { name: "url", type: "s" },
              { name: "name", type: "s" },
              { name: "p", type: "n" },
            ],
            ApString2Xod: [
              { name: "url", type: "s" },
              { name: "rID", type: "s" },
            ],
          }
        ba.prototype = Object(z.extend)(ba.prototype, {
          M3: function () {
            var e = this
            return new Promise(function (f, h) {
              var n = new XMLHttpRequest()
              n.open("GET", e.df + "ck")
              n.withCredentials = e.Nk()
              n.onreadystatechange = function () {
                n.readyState === XMLHttpRequest.DONE && (200 === n.status ? f() : h())
              }
              n.send()
            })
          },
          ifa: function (e, f) {
            this.KR = e || ha
            this.xI = f || ha
          },
          fP: function () {
            var e = this
            this.qm = aa()
            this.Hj = aa()
            return this.yu.lG().then(function () {
              e.Gz = !1
              e.id = null
              e.PF = !1
              return e.M3()
            })
          },
          KJ: function () {
            this.KR()
            this.TH()
            this.cf &&
              (this.cf.hi()
                ? this.Lg(this.cf.request)
                : this.cf.Qr() &&
                  this.xI(this.cf.result.url, "pdf") &&
                  ((this.cf = null), this.aV()))
            this.lg && this.lg.hi() && this.Lg(this.lg.request)
            this.ne && this.ne.hi()
              ? this.Lg(this.ne.request)
              : this.Vd && this.Vd.hi() && this.zR(this.Vd.request)
            var e
            for (e = 0; e < this.Vf.length; e++)
              this.Vf[e] &&
                this.Vf[e] &&
                (this.Vf[e].hi()
                  ? this.Lg(this.Vf[e].request)
                  : this.Vf[e].Qr() &&
                    this.xI(this.Vf[e].result.url, "image") &&
                    ((this.Vf[e] = null), this.vC(Object(z.uniqueId)(), e)))
            for (e = 0; e < this.oh.length; e++)
              this.oh[e] &&
                this.oh[e] &&
                this.oh[e].hi() &&
                !this.oh[e].l$() &&
                this.Lg(this.oh[e].request)
            for (e = 0; e < this.yf.length; e++)
              this.yf[e] && this.yf[e].hi() && this.Lg(this.yf[e].request)
          },
          TH: function (e) {
            var h = this
            this.Gz ||
              ((this.timeStamp = Date.now()),
              this.yu
                .IK(
                  function (e) {
                    h.Vaa(e)
                  },
                  function () {
                    return null
                  },
                  function () {
                    return null
                  },
                  !0
                )
                .then(
                  function () {
                    clearInterval(h.nC)
                    h.nC = null
                  },
                  function (n) {
                    h.Gz = !1
                    if (!h.nC) {
                      var r = 0
                      h.PF = !0
                      h.ZJ = 0
                      h.nC = setInterval(function () {
                        2 > r++
                          ? h.KJ()
                          : (clearInterval(h.nC),
                            e && e.reject(f.a),
                            Object(w.f)("WebViewerServer connection failed:" + n))
                      }, 5e3)
                    }
                  }
                ),
              (this.Gz = !0))
          },
          zha: function () {
            var e = this,
              f = createPromiseCapability()
            if (this.sn) {
              var h = new FormData()
              h.append("file", this.sn.fileHandle, this.sn.fileHandle.name)
              var n = this.sn.loadCallback
              var r = "upload"
              var w = this.sn.extension
            } else if (this.hx) {
              h = { uri: this.hx.uri, zla: this.hx.shareId }
              h = Object.keys(h)
                .map(function (e) {
                  return e + "=" + (h[e] ? encodeURIComponent(h[e]) : "")
                })
                .join("&")
              var x = "application/x-www-form-urlencoded; charset=UTF-8"
              n = this.hx.loadCallback
              r = "url"
              w = this.hx.extension
            } else return Promise.resolve()
            var z = new XMLHttpRequest(),
              aa = Object(y.j)(e.df, "AuxUpload")
            aa = Object(fa.a)(aa) + "&type=" + r + "&ext=" + w
            z.open("POST", aa)
            z.withCredentials = this.Nk()
            x && z.setRequestHeader("Content-Type", x)
            z.addEventListener("load", function () {
              if (z.readyState === z.DONE && 200 === z.status) {
                var h = JSON.parse(z.response)
                e.YF = h.uri
                n(h)
                f.resolve(h)
              }
            })
            z.addEventListener("error", function () {
              f.reject(z.statusText + " " + JSON.stringify(z))
            })
            this.sn &&
              null != this.sn.onProgress &&
              (z.upload.onprogress = function (f) {
                e.sn.onProgress(f)
              })
            z.send(h)
            return f.promise
          },
          Lda: function (e) {
            this.password = e || null
            this.Hj.Qr() || ((this.Hj = aa()), this.Lg({ t: "pages" }))
            return this.Hj.promise
          },
          yw: function (e) {
            this.wG = e || null
            this.Hj.Qr() || (this.TH(this.Hj), this.Lg({ t: "pages" }))
            return this.Hj.promise
          },
          xu: function (e) {
            e = Object.assign(e, { uri: encodeURIComponent(this.YF) })
            this.wG && (e.ext = this.wG)
            this.uf && (e.c = this.uf)
            this.password && (e.pswd = this.password)
            this.QO && (e.cacheKey = this.QO)
            this.mT && (e.locale = this.mT)
            return e
          },
          oea: function () {
            0 < this.ps.length() && 10 >= this.Fq && this.pea(this.ps.pop().data)
          },
          Z1: function (e) {
            return 0 < this.ps.length() && this.ps.contains(e) ? (this.ps.remove(e), !0) : !1
          },
          Lg: function (e) {
            e = this.xu(e)
            this.yu.send(e)
          },
          rV: function (e, f) {
            10 < this.Fq ? this.ps.push(e, f) : (this.Fq++, (e = this.xu(f)), this.yu.send(e))
          },
          pea: function (e) {
            this.Fq++
            e = this.xu(e)
            this.yu.send(e)
          },
          zk: function (e) {
            return e
          },
          Vaa: function (e) {
            var f = this,
              h = e.data,
              r = e.err,
              y = e.t
            switch (y) {
              case "upload":
                r ? f.Aha.reject(r) : f.Aha.resolve("Success")
                break
              case "pages":
                r ? f.Hj.reject(r) : ca(h, y, f.Hj) && f.Hj.resolve(h)
                break
              case "config":
                if (r) f.qm.reject(r)
                else if (ca(h, y, f.qm)) {
                  h.id && (f.id = h.id)
                  if (h.auth) {
                    var z = Object(x.a)("wvsQueryParameters")
                    z.auth = h.auth
                    Object(x.b)("wvsQueryParameters", z)
                  }
                  h.serverVersion &&
                    ((f.rX = h.serverVersion),
                    Object(w.g)("[WebViewer Server] server version: " + f.rX))
                  h.serverID
                    ? ((f.yC = h.serverID === f.ZJ && f.AH ? f.yC + 1 : 0), (f.ZJ = h.serverID))
                    : (f.yC = 0)
                  f.AH = !1
                  f.qm.resolve(h)
                }
                break
              case "health":
                r
                  ? f.qm.reject(r)
                  : ca(h, y, f.qm) &&
                    ((h = h.unhealthy),
                    f.hW && h
                      ? Object(w.i)(
                          "Server failed health check. Single server mode ignoring check."
                        )
                      : !f.Pja &&
                        h &&
                        1 >= f.yC &&
                        ((f.AH = !0),
                        f.fP().then(
                          function () {
                            f.KJ()
                          },
                          function () {
                            f.KJ()
                          }
                        )))
                break
              case "pdf":
                h.url = Object(fa.a)(f.df + "../" + encodeURI(h.url))
                r ? f.cf.reject(r) : ca(h, y, f.cf) && f.cf.resolve(h)
                break
              case "ApString2Xod":
                h.url = Object(fa.a)(f.df + "../data/" + encodeURI(h.url))
                r ? f.ki[h.rID].reject(r) : ca(h, y, f.ki[h.rID]) && f.ki[h.rID].resolve(h)
                break
              case "docmod":
                h.url = Object(fa.a)(f.df + "../" + encodeURI(h.url))
                r ? f.ki[h.rID].reject(r) : ca(h, y, f.cf) && f.ki[h.rID].resolve(h)
                break
              case "xod":
                if (r)
                  this.ne && this.ne.hi() && this.ne.reject(r),
                    this.Vd && this.Vd.hi() && this.Vd.reject(r)
                else if (h.notFound)
                  h.noCreate || (this.ne && this.ne.hi() && this.ne.resolve(h)),
                    this.Vd && this.Vd.hi() && this.Vd.resolve(h)
                else {
                  h.url && (h.url = Object(fa.a)(f.df + "../" + encodeURI(h.url)))
                  if (!this.Vd || this.Vd.Qr())
                    (this.Vd = aa()), (this.Vd.request = { t: "xod", noCreate: !0 })
                  this.ne || ((this.ne = aa()), (this.ne.request = { t: "xod" }))
                  this.Vd.resolve(h)
                  this.ne.resolve(h)
                }
                break
              case "annots":
                if (r) f.lg.reject(r)
                else if (ca(h, y, f.lg)) {
                  f.lg.CV()
                  var ba = new XMLHttpRequest()
                  z = f.df + "../" + encodeURI(h.url)
                  var ea = h.hasAppearance ? Object(fa.a)(z + ".xodapp") : null
                  ba.open("GET", Object(fa.a)(z))
                  ba.responseType = "text"
                  ba.withCredentials = this.Nk()
                  ba.addEventListener("load", function () {
                    ba.readyState === ba.DONE &&
                      200 === ba.status &&
                      f.lg.resolve({ cL: ba.response, jz: ea })
                  })
                  ba.addEventListener("error", function () {
                    f.lg.reject(ba.statusText + " " + JSON.stringify(ba))
                  })
                  ba.send()
                }
                break
              case "image":
                f.Fq--
                var da = this.Vf[h.p]
                r
                  ? da.promise.reject(r)
                  : ca(h, y, da) &&
                    ((da.result = h),
                    (da.result.url = Object(fa.a)(f.df + "../" + encodeURI(da.result.url))),
                    da.resolve(da.result))
                break
              case "tiles":
                f.Fq--
                da = h.rID
                z = this.yf[da]
                this.yf[da] = null
                this.qA.push(da)
                if (r) z.reject(r)
                else if (ca(h, y, z)) {
                  for (r = 0; r < h.tiles.length; r++)
                    h.tiles[r] = Object(fa.a)(f.df + "../" + encodeURI(h.tiles[r]))
                  z.resolve(h)
                }
                break
              case "text":
                da = this.oh[h.p]
                if (r) da.reject(r)
                else if (ca(h, y, da)) {
                  da.CV()
                  var ha = new XMLHttpRequest()
                  h = Object(fa.a)(f.df + "../" + encodeURI(h.url))
                  ha.open("GET", h)
                  ha.withCredentials = this.Nk()
                  ha.addEventListener("load", function () {
                    ha.readyState === ha.DONE &&
                      200 === ha.status &&
                      ((da.result = JSON.parse(ha.response)), da.resolve(da.result))
                  })
                  ha.addEventListener("error", function (e) {
                    da.reject(ha.statusText + " " + JSON.stringify(e))
                  })
                  ha.send()
                }
                break
              case "progress":
                "loading" === h.t &&
                  f.trigger(n.a.Events.DOCUMENT_LOADING_PROGRESS, [h.bytes, h.total])
            }
            this.oea()
            !y &&
              e.echo &&
              e &&
              "apstring2xod" == e.echo.t &&
              (e = e.echo.reqID) &&
              (2 <= parseInt(f.rX)
                ? f.ki[e].reject("Message unhandled by server")
                : f.ki[e].reject())
          },
          GQ: function () {
            this.TH(this.qm)
            return this.qm.promise
          },
          g7: function (e) {
            for (
              var f = this,
                h = new XMLHttpRequest(),
                n = Object(fa.a)(this.df + "aul") + "&id=" + this.id,
                r = new FormData(),
                w = {},
                x = 0;
              x < e.body.length;
              x++
            ) {
              var y = e.body[x]
              w[y.id] = y.eF.w + ";" + y.eF.h
              r.append(y.id, y.eF.dataString)
            }
            e = { t: "apstring2xod", reqID: this.hT++, parts: w }
            var z = this.xu(e)
            r.append("msg", JSON.stringify(z))
            f.ki[z.reqID] = aa()
            h.open("POST", n)
            h.withCredentials = f.Nk
            n = new Promise(function (e, f) {
              h.onreadystatechange = function () {
                4 === h.readyState &&
                  (200 === h.status
                    ? e()
                    : f("An error occurred while sending down appearance strings to the server"))
              }
            })
            h.send(r)
            return n.then(function () {
              return f.ki[z.reqID].promise
            })
          },
          f7: function () {
            this.lg ||
              ((this.lg = aa()), (this.lg.request = { t: "annots" }), this.Lg(this.lg.request))
            return this.lg.promise
          },
          vC: function (e, f) {
            this.Vf[f] ||
              ((this.Vf[f] = aa()),
              (this.Vf[f].request = { t: "image", p: f }),
              this.rV(e, this.Vf[f].request))
            return this.Vf[f].promise
          },
          Mda: function (e) {
            this.oh[e] ||
              ((this.oh[e] = aa()),
              (this.oh[e].request = { t: "text", p: e }),
              this.Lg(this.oh[e].request))
            return this.oh[e].promise
          },
          Nda: function (e, f, h, n, r) {
            var w = this.yf.length
            this.qA.length && (w = this.qA.pop())
            this.yf[w] = aa()
            this.yf[w].request = { t: "tiles", p: f, z: h, r: n, size: r, rID: w }
            this.rV(e, this.yf[w].request)
            return this.yf[w].promise
          },
          aV: function () {
            this.cf ||
              ((this.cf = aa()),
              (this.cf.request = { t: "pdf" }),
              this.PF ? this.cf.resolve({ url: this.YF }) : this.Lg(this.cf.request))
            return this.cf.promise
          },
          YQ: function (e) {
            var f = this,
              h = new XMLHttpRequest(),
              n = Object(fa.a)(this.df + "aul") + "&id=" + this.id,
              r = new FormData(),
              w = {}
            e.annots && (w.annots = "xfdf")
            e.watermark && (w.watermark = "png")
            e.redactions && (w.redactions = "redact")
            w = { t: "docmod", reqID: this.hT++, parts: w }
            e.print && (w.print = !0)
            var x = this.xu(w)
            r.append("msg", JSON.stringify(x))
            return Promise.all(
              [e.annots, e.watermark, e.redactions].map(function (e) {
                return Promise.resolve(e)
              })
            ).then(function (e) {
              var w = e[0],
                y = e[1],
                z = e[2]
              w && r.append("annots", w)
              y && r.append("watermark", e.watermark)
              z && r.append("redactions", z)
              f.ki[x.reqID] = aa()
              h.open("POST", n)
              h.withCredentials = f.Nk
              e = new Promise(function (e, f) {
                h.onreadystatechange = function () {
                  4 === h.readyState &&
                    (200 === h.status
                      ? e()
                      : f("An error occurred while sending down annotation data to the server"))
                }
              })
              h.send(r)
              return e.then(function () {
                return f.ki[x.reqID].promise
              })
            })
          },
          zR: function () {
            this.Vd ||
              ((this.Vd = aa()),
              (this.Vd.request = { t: "xod", noCreate: !0 }),
              this.Lg(this.Vd.request))
            return this.Vd.promise
          },
          Oda: function () {
            this.ne ||
              ((this.ne = aa()), (this.ne.request = { t: "xod" }), this.Lg(this.ne.request))
            return this.ne.promise
          },
          bn: function () {
            return !0
          },
          request: function () {},
          yU: function () {},
          abort: function () {
            for (var e = 0; e < this.yf.length; e++)
              this.yf[e] && (this.yf[e].resolve(null), (this.yf[e] = null), this.qA.push(e))
            this.close()
          },
          IC: function (e) {
            this.uf = this.uf || {}
            this.uf.headers = e
          },
          nka: function () {
            return this.uf ? Object(z.omit)(this.uf.headers, ["Cookie", "cookie"]) : null
          },
          Sp: function (e) {
            this.uf = this.uf || {}
            this.uf.internal = this.uf.internal || {}
            this.uf.internal.withCredentials = e
          },
          Nk: function () {
            return this.uf && this.uf.internal ? this.uf.internal.withCredentials : null
          },
          getFileData: function () {
            return Promise.reject()
          },
        })
        Object(ia.a)(ba)
        Object(h.a)(ba)
        Object(h.b)(ba)
        da["default"] = ba
      },
      411: function (ia, da, e) {
        function ba(e, w, y) {
          function r(e, f) {
            function h(e) {
              r().then(function (f) {
                da && !ia
                  ? setTimeout(function () {
                      h(e)
                    }, 1)
                  : f.send(JSON.stringify(e))
              })
            }
            function n(e, f, n, r) {
              var x = window.createPromiseCapability(),
                fa = !1,
                ja = x
              z = e
              ba = f
              ea = n
              y = null
              r &&
                ((e = Object(ha.a)("wvsQueryParameters")),
                (e.bcid = Object(aa.k)(8)),
                Object(ha.b)("wvsQueryParameters", e))
              try {
                e = Fa ? ua + "/" + Fa : ua + "/ws"
                e = Object(ca.a)(e)
                var ka = new WebSocket(e)
                ka.onopen = function () {
                  x.resolve()
                  fa = !0
                  x = null
                  da = !1
                  w.resolve(ka)
                  ba && ba()
                }
                ka.onerror = function (e) {
                  da = ia = !0
                  x && x.reject(e)
                  y && y.reject()
                }
                ka.onclose = function () {
                  w = window.createPromiseCapability()
                  da = !0
                  y || (y = window.createPromiseCapability())
                  y.resolve()
                  ea && ea()
                  z && fa && z({ t: "health", data: { unhealthy: !0, isDead: !0 } })
                }
                ka.onmessage = function (e) {
                  e &&
                    e.data &&
                    ((e = JSON.parse(e.data)), e.hb ? h({ hb: !0 }) : e.end ? close() : z(e))
                }
              } catch (Ga) {
                x.reject(Ga), (x = null)
              }
              return ja.promise
            }
            function r() {
              da && z && n(z)
              return w.promise
            }
            var w = window.createPromiseCapability(),
              y = null,
              z,
              ba,
              ea = null,
              da = !1,
              ia = !1,
              Fa = f,
              ua = (function (e) {
                var f = e.indexOf("://"),
                  h = "ws://"
                0 > f ? (f = 0) : (5 === f && (h = "wss://"), (f += 3))
                var n = e.lastIndexOf("/")
                0 > n && (n = e.length)
                return h + e.slice(f, n)
              })(e)
            return {
              send: h,
              IK: n,
              lG: function () {
                return y
                  ? y.promise
                  : r().then(function (e) {
                      y = window.createPromiseCapability()
                      z = null
                      e.close()
                      return y.promise
                    })
              },
            }
          }
          function n(e) {
            var f = e.lastIndexOf("/")
            0 > f && (f = e.length)
            return e.slice(0, f)
          }
          return window.WebSocket && !y
            ? r(e, w)
            : (function (e, f) {
                function h(e) {
                  ;(da ? da.promise : Promise.resolve(ba)).then(function (f) {
                    var h = new XMLHttpRequest(),
                      n = aa ? z + "/" + aa + "pf" : z + "/pf"
                    n = Object(ca.a)(n) + "&id=" + f
                    f = new FormData()
                    f.append("data", JSON.stringify(e))
                    h.open("POST", n)
                    h.withCredentials = !0
                    h.send(f)
                  })
                }
                function r() {
                  ba = 0
                  da || (da = window.createPromiseCapability())
                }
                function w() {
                  y = new XMLHttpRequest()
                  var e = z + "/pf"
                  e += 0 !== ba ? "?id=" + ba + "&uc=" + ua : "?uc=" + ua
                  ua++
                  y.open("GET", e, !0)
                  y.withCredentials = !0
                  y.setRequestHeader("Cache-Control", "no-cache")
                  y.setRequestHeader("X-Requested-With", "XMLHttpRequest")
                  var f = y,
                    n = !1
                  y.onreadystatechange = function () {
                    a: if (3 <= f.readyState && !n) {
                      try {
                        var e = f.responseText.length
                      } catch (Ea) {
                        Object(ea.g)("caught exception")
                        break a
                      }
                      if (0 < e)
                        try {
                          var x = f.responseText.split("\n")
                          for (
                            x[x.length - 1] && x.pop();
                            0 < x.length && 3 > x[x.length - 1].length;

                          )
                            "]" === x.pop() && r()
                          0 < x.length && 3 > x[0].length && x.shift()
                          for (e = 0; e < x.length; ++e)
                            x[e].endsWith(",") && (x[e] = x[e].substr(0, x[e].length - 1))
                          0 === ba &&
                            0 < x.length &&
                            ((ba = JSON.parse(x.shift()).id), (e = da), (da = null), e.resolve(ba))
                          var y
                          for (e = 0; e < x.length; ++e)
                            (y = JSON.parse(x[e])) && y.end
                              ? close()
                              : y && y.hb && y.id === ba
                              ? h({ hb: !0 })
                              : Fa(y)
                        } catch (Ea) {}
                      ha || ((n = !0), w())
                    }
                  }
                  y.send()
                }
                var y,
                  z = n(e),
                  aa = f,
                  ba = 0,
                  da = window.createPromiseCapability(),
                  ha = !1,
                  ia = null,
                  Fa = null,
                  ua = 0
                return {
                  send: h,
                  IK: function (e, f, h) {
                    Fa = e
                    ia = h
                    ha = !1
                    r()
                    w()
                    f && f()
                    return Promise.resolve()
                  },
                  lG: function () {
                    r()
                    Fa = null
                    ha = !0
                    ia && ia()
                    y.abort()
                    return Promise.resolve()
                  },
                }
              })(e, w)
        }
        e.d(da, "a", function () {
          return ba
        })
        var ea = e(2),
          aa = e(29),
          ha = e(42),
          ca = e(158)
      },
    },
  ])
}.call(this || window))
