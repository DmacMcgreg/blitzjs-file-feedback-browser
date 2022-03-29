/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [7],
    {
      398: function (ia, da, e) {
        e.r(da)
        var ba = e(1),
          ea = e(424),
          aa = e(425),
          ha
        ;(function (e) {
          e[(e.EXTERNAL_XFDF_NOT_REQUESTED = 0)] = "EXTERNAL_XFDF_NOT_REQUESTED"
          e[(e.EXTERNAL_XFDF_NOT_AVAILABLE = 1)] = "EXTERNAL_XFDF_NOT_AVAILABLE"
          e[(e.EXTERNAL_XFDF_AVAILABLE = 2)] = "EXTERNAL_XFDF_AVAILABLE"
        })(ha || (ha = {}))
        ia = (function () {
          function e(e) {
            this.V = e
            this.state = ha.EXTERNAL_XFDF_NOT_REQUESTED
          }
          e.prototype.i9 = function () {
            var e = this
            return function (w, y, r) {
              return Object(ba.b)(e, void 0, void 0, function () {
                var e,
                  h,
                  f,
                  x,
                  z,
                  aa,
                  ca,
                  da = this,
                  ea
                return Object(ba.d)(this, function (n) {
                  switch (n.label) {
                    case 0:
                      if (this.state !== ha.EXTERNAL_XFDF_NOT_REQUESTED) return [3, 2]
                      e = this.V.getDocument().lr()
                      return [4, this.G7(e)]
                    case 1:
                      ;(h = n.da()),
                        (f = this.b3(h)),
                        (this.rG =
                          null !== (ea = null === f || void 0 === f ? void 0 : f.parse()) &&
                          void 0 !== ea
                            ? ea
                            : null),
                        (this.state =
                          null === this.rG
                            ? ha.EXTERNAL_XFDF_NOT_AVAILABLE
                            : ha.EXTERNAL_XFDF_AVAILABLE),
                        (n.label = 2)
                    case 2:
                      if (this.state === ha.EXTERNAL_XFDF_NOT_AVAILABLE) return r(w), [2]
                      x = new DOMParser()
                      z = x.parseFromString(w, "text/xml")
                      y.forEach(function (e) {
                        da.merge(z, da.rG, e - 1)
                      })
                      aa = new XMLSerializer()
                      ca = aa.serializeToString(z)
                      r(ca)
                      return [2]
                  }
                })
              })
            }
          }
          e.prototype.cK = function (e) {
            this.G7 = e
          }
          e.prototype.be = function () {
            this.rG = void 0
            this.state = ha.EXTERNAL_XFDF_NOT_REQUESTED
          }
          e.prototype.b3 = function (e) {
            return e
              ? Array.isArray(e)
                ? new ea.a(e)
                : "string" !== typeof e
                ? null
                : new DOMParser().parseFromString(e, "text/xml").querySelector("xfdf > add")
                ? new ea.a(e)
                : new aa.a(e)
              : null
          }
          e.prototype.merge = function (e, w, y) {
            var r = this
            0 === y && (this.vaa(e, w.io), this.xaa(e, w.ZF))
            var n = w.ba[y]
            n &&
              (this.yaa(e, n.hm),
              this.Aaa(e, n.iX, w.Pu),
              this.zaa(e, n.page, y),
              this.waa(e, n.CP))
            n = this.V.Jc()
            if (y === n - 1) {
              var h = w.Pu
              Object.keys(h).forEach(function (f) {
                h[f].DH || r.YS(e, f, h[f])
              })
            }
          }
          e.prototype.vaa = function (e, w) {
            null !== w && ((e = this.hu(e)), this.Cp(e, "calculation-order", w))
          }
          e.prototype.xaa = function (e, w) {
            null !== w && ((e = this.hu(e)), this.Cp(e, "document-actions", w))
          }
          e.prototype.yaa = function (e, w) {
            var y = this,
              r = this.gu(e.querySelector("xfdf"), "annots")
            Object.keys(w).forEach(function (e) {
              y.Cp(r, '[name="' + e + '"]', w[e])
            })
          }
          e.prototype.Aaa = function (e, w, y) {
            var r = this
            if (0 !== w.length) {
              var n = this.hu(e)
              w.forEach(function (h) {
                var f = h.getAttribute("field"),
                  w = y[f]
                w && (r.YS(e, f, w), r.Cp(n, "null", h))
              })
            }
          }
          e.prototype.YS = function (e, w, y) {
            var r = this.hu(e)
            null !== y.lA && this.Cp(r, 'ffield [name="' + w + '"]', y.lA)
            e = this.gu(e.querySelector("xfdf"), "fields")
            w = w.split(".")
            this.qJ(e, w, 0, y.value)
            y.DH = !0
          }
          e.prototype.zaa = function (e, w, y) {
            null !== w &&
              ((e = this.hu(e)),
              (e = this.gu(e, "pages")),
              this.Cp(e, '[number="' + (y + 1) + '"]', w))
          }
          e.prototype.waa = function (e, w) {
            Object.keys(w).forEach(function (w) {
              ;(w = e.querySelector('annots [name="' + w + '"]')) && w.parentElement.removeChild(w)
            })
          }
          e.prototype.qJ = function (e, w, y, r) {
            if (y === w.length)
              (w = document.createElementNS("", "value")),
                (w.textContent = r),
                this.Cp(e, "value", w)
            else {
              var n = w[y]
              this.gu(e, '[name="' + n + '"]', "field").setAttribute("name", n)
              e = e.querySelectorAll('[name="' + n + '"]')
              1 === e.length
                ? this.qJ(e[0], w, y + 1, r)
                : ((n = this.D6(e)), this.qJ(y === w.length - 1 ? n : this.Tga(e, n), w, y + 1, r))
            }
          }
          e.prototype.D6 = function (e) {
            for (var w = null, y = 0; y < e.length; y++) {
              var r = e[y]
              if (
                0 === r.childElementCount ||
                (1 === r.childElementCount && "value" === r.children[0].tagName)
              ) {
                w = r
                break
              }
            }
            return w
          }
          e.prototype.Tga = function (e, w) {
            for (var y = 0; y < e.length; y++) if (e[y] !== w) return e[y]
            return null
          }
          e.prototype.Cp = function (e, w, y) {
            w = e.querySelector(w)
            null !== w && e.removeChild(w)
            e.appendChild(y)
          }
          e.prototype.hu = function (e) {
            var w = e.querySelector("pdf-info")
            if (null !== w) return w
            w = this.gu(e.querySelector("xfdf"), "pdf-info")
            w.setAttribute("xmlns", "http://www.pdftron.com/pdfinfo")
            w.setAttribute("version", "2")
            w.setAttribute("import-version", "4")
            return w
          }
          e.prototype.gu = function (e, w, y) {
            var r = e.querySelector(w)
            if (null !== r) return r
            r = document.createElementNS("", y || w)
            e.appendChild(r)
            return r
          }
          return e
        })()
        da["default"] = ia
      },
      409: function (ia, da) {
        ia = (function () {
          function e() {}
          e.prototype.Ry = function (e) {
            var ba = { io: null, ZF: null, Pu: {}, ba: {} }
            e = new DOMParser().parseFromString(e, "text/xml")
            ba.io = e.querySelector("pdf-info calculation-order")
            ba.ZF = e.querySelector("pdf-info document-actions")
            ba.Pu = this.oba(e)
            ba.ba = this.Aba(e)
            return ba
          }
          e.prototype.oba = function (e) {
            var ba = e.querySelector("fields")
            e = e.querySelectorAll("pdf-info > ffield")
            if (null === ba && null === e) return {}
            var aa = {}
            this.E0(aa, ba)
            this.C0(aa, e)
            return aa
          }
          e.prototype.E0 = function (e, da) {
            if (null !== da && da.children) {
              for (var aa = [], ba = 0; ba < da.children.length; ba++) {
                var ca = da.children[ba]
                aa.push({ name: ca.getAttribute("name"), element: ca })
              }
              for (; 0 !== aa.length; )
                for (da = aa.shift(), ba = 0; ba < da.element.children.length; ba++)
                  (ca = da.element.children[ba]),
                    "value" === ca.tagName
                      ? (e[da.name] = { value: ca.textContent, lA: null, DH: !1 })
                      : ca.children &&
                        aa.push({ name: da.name + "." + ca.getAttribute("name"), element: ca })
            }
          }
          e.prototype.C0 = function (e, da) {
            da.forEach(function (aa) {
              var ba = aa.getAttribute("name")
              e[ba] ? (e[ba].lA = aa) : (e[ba] = { value: null, lA: aa, DH: !1 })
            })
          }
          e.prototype.Aba = function (e) {
            var ba = this,
              aa = {}
            e.querySelectorAll("pdf-info widget").forEach(function (e) {
              var ca = parseInt(e.getAttribute("page"), 10) - 1
              ba.lB(aa, ca)
              aa[ca].iX.push(e)
            })
            e.querySelectorAll("pdf-info page").forEach(function (e) {
              var ca = parseInt(e.getAttribute("number"), 10) - 1
              ba.lB(aa, ca)
              aa[ca].page = e
            })
            this.XQ(e).forEach(function (e) {
              var ca = parseInt(e.getAttribute("page"), 10),
                z = e.getAttribute("name")
              ba.lB(aa, ca)
              aa[ca].hm[z] = e
            })
            this.JQ(e).forEach(function (e) {
              var ca = parseInt(e.getAttribute("page"), 10)
              e = e.textContent
              ba.lB(aa, ca)
              aa[ca].CP[e] = !0
            })
            return aa
          }
          e.prototype.lB = function (e, da) {
            e[da] || (e[da] = { hm: {}, CP: {}, iX: [], page: null })
          }
          return e
        })()
        da.a = ia
      },
      424: function (ia, da, e) {
        var ba = e(1),
          ea = e(0)
        e.n(ea)
        ia = (function (e) {
          function aa(aa) {
            var z = e.call(this) || this
            z.q6 = Array.isArray(aa) ? aa : [aa]
            return z
          }
          Object(ba.c)(aa, e)
          aa.prototype.parse = function () {
            var e = this,
              z = { io: null, ZF: null, Pu: {}, ba: {} }
            this.q6.forEach(function (w) {
              z = Object(ea.merge)(z, e.Ry(w))
            })
            return z
          }
          aa.prototype.XQ = function (e) {
            var z = []
            e.querySelectorAll("add > *").forEach(function (e) {
              z.push(e)
            })
            e.querySelectorAll("modify > *").forEach(function (e) {
              z.push(e)
            })
            return z
          }
          aa.prototype.JQ = function (e) {
            return e.querySelectorAll("delete > *")
          }
          return aa
        })(e(409).a)
        da.a = ia
      },
      425: function (ia, da, e) {
        var ba = e(1)
        ia = (function (e) {
          function aa(aa) {
            var ba = e.call(this) || this
            ba.r6 = aa
            return ba
          }
          Object(ba.c)(aa, e)
          aa.prototype.parse = function () {
            return this.Ry(this.r6)
          }
          aa.prototype.XQ = function (e) {
            return e.querySelectorAll("annots > *")
          }
          aa.prototype.JQ = function () {
            return []
          }
          return aa
        })(e(409).a)
        da.a = ia
      },
    },
  ])
}.call(this || window))
