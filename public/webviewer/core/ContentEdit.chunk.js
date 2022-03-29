/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [6],
    {
      159: function (ia, da, e) {
        function ba(e, h, n, r) {
          return Object(la.b)(void 0, void 0, void 0, function () {
            var w, x, y, z
            return Object(la.d)(this, function (aa) {
              switch (aa.label) {
                case 0:
                  return (
                    (w = za.getDocument()), (x = [1]), [4, Object(ra.c)(h, { extension: "pdf" })]
                  )
                case 1:
                  return (y = aa.da()), (z = !0), [4, w.Bg(y, x, e, z)]
                case 2:
                  return aa.da(), [4, w.uh([e + 1], z)]
                case 3:
                  return (
                    aa.da(),
                    za.getDocument().zJ(),
                    za.yJ(e),
                    za.Je(),
                    ha(e),
                    f(e, n.galleys, r),
                    f(e, n.objects, r),
                    [2]
                  )
              }
            })
          })
        }
        function ea(e) {
          e = new DOMParser().parseFromString(e, "text/html").documentElement.querySelector("body")
          e.querySelectorAll("p").forEach(function (e) {
            e.querySelectorAll("span").forEach(function (e) {
              var f = e.getAttribute("style")
              f = aa(f, e.innerHTML)
              e.innerHTML = f
            })
            var f = e.getAttribute("style"),
              h = e.innerHTML.Mj("<br>", "")
            e.innerHTML = aa(f, h)
          })
          return e.innerHTML.trim()
        }
        function aa(e, f) {
          e.includes("bold") && (f = "<strong>" + f + "</strong>")
          e.includes("italic") && (f = "<em>" + f + "</em>")
          e.includes("text-decoration: underline") && (f = "<u>" + f + "</u>")
          return f
        }
        function ha(e) {
          var f = za.ta(),
            h = f.Cb().filter(function (f) {
              return f.jh() && f.PageNumber === e
            })
          f.Wh(h, { force: !0, source: "contentEditTool" })
        }
        function ca(e, f) {
          f.forEach(function (f) {
            Da[e] || (Da[e] = [])
            Da[e].find(function (e) {
              return e.id === f.id
            }) || Da[e].push(f)
          })
        }
        function z(e, f) {
          f.forEach(function (f) {
            ta[e] || (ta[e] = [])
            ta[e].find(function (e) {
              return e.id === f.id
            }) || ta[e].push(f)
          })
        }
        function w(e, f, h, n) {
          this.top = e
          this.left = f
          this.bottom = h
          this.right = n
          this.topVal = function () {
            return Math.round(this.top)
          }
          this.bottomVal = function () {
            return Math.round(this.bottom)
          }
          this.leftVal = function () {
            return Math.round(this.left)
          }
          this.rightVal = function () {
            return Math.round(this.right)
          }
          this.height = function () {
            return Math.round(Math.abs(this.top - this.bottom))
          }
          this.width = function () {
            return Math.round(this.right - this.left)
          }
          this.KO = function (e) {
            return (
              this.topVal() != e.topVal() ||
              this.leftVal() != e.leftVal() ||
              this.bottomVal() != e.bottomVal() ||
              this.rightVal() != e.rightVal()
            )
          }
        }
        function y(e, f, h, n, r) {
          this.id = e
          this.pagenum = f
          this.galleysContents = h
          this.contents = n
          this.galleyBox = r
        }
        function r(e, f, h, n) {
          this.id = f
          this.type = e
          this.bbox = h
          this.pagenum = n
        }
        function n(e, f, h, n, r) {
          this.id = e
          this.pagecount = f
          this.pageBBox = h
          this.galleys = n
          this.objects = r
        }
        function h(e, f, h, n, r) {
          var w = []
          new DOMParser()
            .parseFromString(n, "text/html")
            .documentElement.querySelectorAll("p")
            .forEach(function (e, f) {
              w[f] = e.innerHTML
            })
          h = new DOMParser().parseFromString(h, "text/html")
          var x = null
          h.documentElement.querySelectorAll("p").forEach(function (e, f) {
            f < w.length
              ? ((e.innerHTML = w[f]),
                (x = e.getAttribute("style")),
                (x = x.replace("font:italic", "font:normal")),
                (x = x.replace(" bold ", " normal ")),
                (x = x.replace("underline:1;", "underline:0;")),
                e.setAttribute("style", x))
              : e.remove()
          })
          for (n = h.documentElement.querySelectorAll("p").length; n < w.length; n++) {
            var y = document.createElement("p")
            y.setAttribute("id", "0")
            y.innerHTML = w[n]
            null != x && y.setAttribute("style", x)
            h.documentElement.querySelector("body").appendChild(y)
          }
          h = h.documentElement.querySelector("body").innerHTML
          var z = ""
          ta[e].forEach(function (e) {
            e.id == r && (z = e)
          })
          if ("" == z) return ""
          f = "<DOC id='" + f.id + "' pagecount='" + f.pagecount + "'>"
          f =
            f +
            ("<STORY galley_ids='" + r + "' pagenum='" + e + "'>") +
            ("<galleys>" + z.galleysContents + "</galleys>")
          z.contents = h
          f = f + h + "\n</STORY>"
          return (f += "</DOC>")
        }
        function f(e, f, h) {
          var n = [],
            w = za.getDocument(),
            x = null
          f.forEach(function (f) {
            if (f instanceof r) {
              var z = w.Km(e, f.bbox.leftVal(), f.bbox.topVal())
              var aa = z.x
              var ba = z.y
              var ca = w.Km(e, f.bbox.rightVal(), f.bbox.bottomVal())
              z = ca.x
              ca = ca.y
            } else if (f instanceof y)
              (z = w.Km(e, f.galleyBox.leftVal(), f.galleyBox.topVal())),
                (aa = z.x),
                (ba = z.y),
                (ca = w.Km(e, f.galleyBox.rightVal(), f.galleyBox.bottomVal())),
                (z = ca.x),
                (ca = ca.y)
            else return
            var da = new window.Core.Annotations.RectangleAnnotation(),
              ea = ka.a.OBJECT
            f instanceof y && (ea = ka.a.TEXT)
            da.Fea(f, ea)
            da.PageNumber = f.pagenum
            da.X = aa
            da.Y = ba
            da.Width = z - aa
            da.Height = ca - ba
            da.StrokeColor = new oa.a("#3183C8")
            da.FillColor = new oa.a(255, 255, 255, 0.01)
            da.Style = "dash"
            da.Dashes = "4,3"
            da.WF()
            da.selectionModel = ya.a
            n.push(da)
            "undefined" !== typeof h && h === f.id && (x = da)
          })
          f = za.ta()
          f.kg(n)
          x && f.zh(x)
          f.ce(n)
        }
        function x(e, h, n) {
          return Object(la.b)(this, void 0, void 0, function () {
            var r, w, x, y, aa
            return Object(la.d)(this, function (da) {
              switch (da.label) {
                case 0:
                  r = e.data
                  x = r.cmd
                  switch (x) {
                    case "isReady":
                      return [3, 1]
                    case "initialiseInfixServer":
                      return [3, 3]
                    case "exportFile":
                      return [3, 4]
                    case "importText":
                      return [3, 5]
                    case "transformObject":
                      return [3, 5]
                    case "deleteObject":
                      return [3, 6]
                  }
                  return [3, 7]
                case 1:
                  return [4, Object(ua.b)()]
                case 2:
                  return (
                    (y = da.da()), wa.postMessage({ cmd: "initialiseInfixServer", l: y }), [3, 7]
                  )
                case 3:
                  return (
                    (aa = fa(r.resultsXML))
                      ? h()
                      : n("License key does not have content edit permission"),
                    [3, 7]
                  )
                case 4:
                  return (
                    r.exportPerformed
                      ? ma(r.pageNumber, r.exportXML, r.objectXML, r.resultsXML)
                      : ((w = Ea[r.pageNumber]),
                        z(r.pageNumber, w.galleys),
                        ca(r.pageNumber, w.objects),
                        ha(r.pageNumber),
                        f(r.pageNumber, w.galleys),
                        f(r.pageNumber, w.objects)),
                    [3, 7]
                  )
                case 5:
                  return (
                    (w = Ea[r.pageNumber]),
                    pa(r.pageNumber, r.resultsXML),
                    ba(r.pageNumber, r.pdfBuffer, w, r.id),
                    [3, 7]
                  )
                case 6:
                  return (
                    (w = Ea[r.pageNumber]),
                    pa(r.pageNumber, r.resultsXML),
                    (w.galleys = w.galleys.filter(function (e) {
                      return e.id !== r.id
                    })),
                    (w.objects = w.objects.filter(function (e) {
                      return e.id !== r.id
                    })),
                    ba(r.pageNumber, r.pdfBuffer, w),
                    [3, 7]
                  )
                case 7:
                  return [2]
              }
            })
          })
        }
        function fa(e) {
          e = new Uint8Array(e)
          var f = new TextDecoder("utf-8").decode(e)
          e = !1
          f = new DOMParser().parseFromString(f, "text/xml").getElementsByTagName("LicenseCheck")
          null !== f &&
            0 < f.length &&
            ((f = f[0].getElementsByTagName("Status")[0].innerHTML),
            "error" != f && "ok" == f && (e = !0))
          return e
        }
        function ma(e, h, n, r) {
          var w = new Uint8Array(h),
            x = new TextDecoder("utf-8")
          h = x.decode(w)
          w = new Uint8Array(n)
          n = x.decode(w)
          w = new Uint8Array(r)
          r = x.decode(w)
          Ea[e] = na(e, h, n, r)
          r = Ea[e]
          z(e, r.galleys)
          ca(e, r.objects)
          ha(e)
          f(e, r.galleys)
          f(e, r.objects)
        }
        function ja(e, f) {
          e = parseFloat(e)
          return isNaN(f) || f < e ? e : f
        }
        function na(e, f, h, x) {
          var z
          var aa = new DOMParser()
          x = aa.parseFromString(x, "text/xml")
          Array.prototype.slice.call(x.getElementsByTagName("BBox")).forEach(function (e) {
            if ("CropBox" == e.getAttribute("Name")) {
              var f = parseFloat(e.getElementsByTagName("Top").item(0).innerHTML),
                h = parseFloat(e.getElementsByTagName("Bottom").item(0).innerHTML),
                n = parseFloat(e.getElementsByTagName("Left").item(0).innerHTML)
              e = parseFloat(e.getElementsByTagName("Right").item(0).innerHTML)
              z = new w(f, n, h, e)
            }
          })
          aa = new DOMParser()
          x = aa.parseFromString(f, "text/xml")
          var ba = []
          Array.prototype.slice.call(x.getElementsByTagName("STORY")).forEach(function (f) {
            var h = f.getAttribute("galley_ids"),
              n = Array.prototype.slice.call(f.getElementsByTagName("g"))[0],
              r = n.getAttribute("bbox").split(" ")
            r = new w(parseFloat(r[0]), parseFloat(r[1]), parseFloat(r[2]), parseFloat(r[3]))
            n = n.innerHTML
            var x = Array.prototype.slice.call(f.getElementsByTagName("galleys"))[0]
            x.parentNode.removeChild(x)
            f = f.innerHTML
            f = new DOMParser()
              .parseFromString(f, "text/html")
              .documentElement.querySelector("body")
              .innerHTML.trim()
            ba.push(new y(h, e, n, f, r))
          })
          aa = new DOMParser()
          var ca = []
          f = aa.parseFromString(h, "text/xml").getElementsByTagName("Object")
          Array.prototype.slice.call(f).forEach(function (f) {
            var h = f.getAttribute("Type"),
              n = f.getAttribute("OID")
            f = Array.prototype.slice.call(f.getElementsByTagName("Point"))
            var x = Number.NaN,
              y = Number.NaN,
              z = Number.NaN,
              aa = Number.NaN
            f.forEach(function (e) {
              var f = e.getAttribute("Name")
              "TL" == f
                ? ((x = ja(e.getAttribute("Y"), x)), (z = ja(e.getAttribute("X"), z)))
                : "TR" == f
                ? ((x = ja(e.getAttribute("Y"), x)), (aa = ja(e.getAttribute("X"), aa)))
                : "BR" == f
                ? ((y = ja(e.getAttribute("Y"), y)), (aa = ja(e.getAttribute("X"), aa)))
                : "BL" == f && ((y = ja(e.getAttribute("Y"), y)), (z = ja(e.getAttribute("X"), z)))
            })
            ca.push(new r(h, n, new w(x, z, y, aa), e))
          })
          f = Array.prototype.slice.call(x.getElementsByTagName("DOC"))[0].getAttribute("id")
          return new n(f, 1, z, ba, ca)
        }
        function pa(e, f) {
          var h
          f = new TextDecoder("utf-8").decode(f)
          f = new DOMParser().parseFromString(f, "text/xml")
          var n = f.getElementsByTagName("Galley").item(0)
          if (null != n) {
            var r = n.getAttribute("id")
            n = f.getElementsByTagName("BBox")
            n = Array.prototype.slice.call(n)
            n.forEach(function (e) {
              var f = e.getElementsByTagName("Top"),
                n = parseFloat(f.item(0).innerHTML)
              f = e.getElementsByTagName("Left")
              var r = parseFloat(f.item(0).innerHTML)
              f = e.getElementsByTagName("Bottom")
              var x = parseFloat(f.item(0).innerHTML)
              f = e.getElementsByTagName("Right")
              e = parseFloat(f.item(0).innerHTML)
              h = new w(n, r, x, e)
            })
            ta[e].forEach(function (e) {
              e.id == r && 1 == h.KO(e.galleyBox) && (e.galleyBox = h)
            })
          }
          n = f.getElementsByTagName("Object").item(0)
          if (null != n) {
            var x = n.getAttribute("OID")
            n = f.getElementsByTagName("BBox")
            n = Array.prototype.slice.call(n)
            n.forEach(function (e) {
              var f = e.getElementsByTagName("Top"),
                n = parseFloat(f.item(0).innerHTML)
              f = e.getElementsByTagName("Left")
              var r = parseFloat(f.item(0).innerHTML)
              f = e.getElementsByTagName("Bottom")
              var x = parseFloat(f.item(0).innerHTML)
              f = e.getElementsByTagName("Right")
              e = parseFloat(f.item(0).innerHTML)
              h = new w(n, r, x, e)
            })
            Da[e].forEach(function (e) {
              e.id == x && 1 == h.KO(e.bbox) && (e.bbox = h)
            })
          }
        }
        e.r(da)
        var la = e(1),
          ra = e(63),
          oa = e(7),
          ya = e(423),
          Fa = e(34),
          ua = e(73),
          qa = e(2),
          ka = e(171),
          wa = null,
          Aa = null,
          ta = {},
          Da = {},
          Ea = {},
          za
        da["default"] = {
          cca: function (e) {
            return Object(la.b)(void 0, void 0, void 0, function () {
              return Object(la.d)(this, function () {
                Aa ||
                  ((za = e),
                  (Aa = new Promise(function (e, f) {
                    wa = new Worker(
                      window.Core.getWorkerPath() + "contentEdit/InfixServerModule.js"
                    )
                    wa.onmessage = function (h) {
                      x(h, e, f)
                    }
                    wa.postMessage({ cmd: "isReady" })
                  })))
                return [2, Aa]
              })
            })
          },
          eca: function (e, f, h) {
            return Object(la.b)(void 0, void 0, void 0, function () {
              var n, r, w, x
              return Object(la.d)(this, function (y) {
                switch (y.label) {
                  case 0:
                    return ha(f), (ta[f] = []), (Da[f] = []), [4, e.Lf([f])]
                  case 1:
                    return (
                      (n = y.da()),
                      (r = new TextEncoder()),
                      (w = r.encode("")),
                      (x = w.buffer),
                      wa.postMessage(
                        {
                          cmd: "exportFile",
                          pageNumber: f,
                          performExport: h,
                          pdfFile: n,
                          tableData: x,
                        },
                        [n, x]
                      ),
                      [2]
                    )
                }
              })
            })
          },
          I3: function (e) {
            return Object(la.b)(void 0, void 0, void 0, function () {
              var f, h, n, r, w, x, y, z
              return Object(la.d)(this, function (aa) {
                switch (aa.label) {
                  case 0:
                    return (
                      (f = e.id),
                      (h = e.isText),
                      (n = e.pageNumber),
                      (r = za.getDocument()),
                      [4, r.Lf([n])]
                    )
                  case 1:
                    return (
                      (w = aa.da()),
                      (x = new TextEncoder()),
                      (y = x.encode("")),
                      (z = y.buffer),
                      wa.postMessage(
                        {
                          cmd: "deleteObject",
                          pdfFile: w,
                          pageNumber: n,
                          objectID: f,
                          isText: h,
                          tableData: z,
                        },
                        [z]
                      ),
                      [2]
                    )
                }
              })
            })
          },
          bha: function (e) {
            return Object(la.b)(void 0, void 0, void 0, function () {
              var f, h, n, r, w, x, y, z, aa, ba, ca, da, ea
              return Object(la.d)(this, function (fa) {
                switch (fa.label) {
                  case 0:
                    return (
                      (f = e.id),
                      (h = e.position),
                      (n = h.top),
                      (r = h.left),
                      (w = h.bottom),
                      (x = h.right),
                      (y = e.isText),
                      (z = e.pageNumber),
                      (aa = za.getDocument()),
                      [4, aa.Lf([z])]
                    )
                  case 1:
                    return (
                      (ba = fa.da()),
                      (ca = new TextEncoder()),
                      (da = ca.encode("")),
                      (ea = da.buffer),
                      wa.postMessage(
                        {
                          cmd: "transformObject",
                          pdfFile: ba,
                          pageNumber: z,
                          objectID: f,
                          isText: y,
                          topVal: n,
                          leftVal: r,
                          bottomVal: w,
                          rightVal: x,
                          tableData: ea,
                        },
                        [ea]
                      ),
                      [2]
                    )
                }
              })
            })
          },
          tha: function (e, f) {
            return Object(la.b)(void 0, void 0, void 0, function () {
              var n, r, w, x, y, z, aa, ba, ca, da, fa, ha, ia, ja, ka
              return Object(la.d)(this, function (la) {
                switch (la.label) {
                  case 0:
                    n = f.replace(/<span style="color: var\(--text-color\);">(.*?)<\/span>/g, "$1")
                    r = e.zt.id
                    w = e.PageNumber
                    x = Ea[w]
                    y = x.galleys.find(function (e) {
                      return e.id === r
                    })
                    z = ea(y.contents)
                    aa = h(w, x, z, n, r)
                    if ("" == aa) return [3, 2]
                    ba = new TextEncoder()
                    ca = ba.encode(aa)
                    da = ca.buffer
                    fa = Object(Fa.c)() || "https://www.pdftron.com/webfonts/v2/"
                    ha = za.getDocument()
                    return [4, ha.Lf([w])]
                  case 1:
                    return (
                      (ia = la.da()),
                      (ba = new TextEncoder()),
                      (ja = ba.encode("")),
                      (ka = ja.buffer),
                      wa.postMessage(
                        {
                          cmd: "importText",
                          pdfFile: ia,
                          pageNumber: w,
                          webFontURL: fa,
                          galleyId: r,
                          importData: da,
                          tableData: ka,
                        },
                        [da, ka]
                      ),
                      [3, 3]
                    )
                  case 2:
                    Object(qa.f)("Unable to generate import XML"), (la.label = 3)
                  case 3:
                    return [2]
                }
              })
            })
          },
          C7: function (e) {
            if (e) return ea(e.contents)
            Object(qa.f)("Unable to extract document content")
          },
        }
      },
      423: function (ia, da, e) {
        var ba = e(1)
        ia = e(78)
        var ea = e(44)
        e = (function (e) {
          function aa() {
            return (null !== e && e.apply(this, arguments)) || this
          }
          Object(ba.c)(aa, e)
          aa.prototype.testSelection = function (e, z, w) {
            return ea.a.sk(e, z, w)
          }
          return aa
        })(ia.a)
        da.a = e
      },
    },
  ])
}.call(this || window))
