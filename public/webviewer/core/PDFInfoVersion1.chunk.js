/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [12],
    {
      397: function (ia, da, e) {
        function ba(f) {
          f.Ia()
          f.advance()
          var e = f.current.textContent
          f.Za()
          return e
        }
        function ea(f) {
          var e = []
          for (f.Ia(); f.advance(); ) {
            var h = f.La()
            "field" === h
              ? e.push(String(f.ea("name")))
              : Object(fa.i)("unrecognised field list element: " + h)
          }
          f.Za()
          return e
        }
        function aa(f, e) {
          return e ? "false" !== f : "true" === f
        }
        function ha(f, e) {
          var h = f.La()
          switch (h) {
            case "javascript":
              return { name: "JavaScript", javascript: f.current.textContent }
            case "uri":
              return { name: "URI", uri: f.ea("uri") }
            case "goto":
              h = null
              f.Ia()
              if (f.advance()) {
                var n = f.ea("fit")
                h = { page: f.ea("page"), fit: n }
                if ("0" === h.page) Object(fa.i)("null page encountered in dest")
                else
                  switch (((e = e(Number(h.page))), n)) {
                    case "Fit":
                    case "FitB":
                      break
                    case "FitH":
                    case "FitBH":
                      h.top = e.qa({ x: 0, y: f.ea("top") || 0 }).y
                      break
                    case "FitV":
                    case "FitBV":
                      h.left = e.qa({ x: f.ea("left") || 0, y: 0 }).x
                      break
                    case "FitR":
                      n = e.qa({ x: f.ea("left") || 0, y: f.ea("top") || 0 })
                      e = e.qa({ x: f.ea("right") || 0, y: f.ea("bottom") || 0 })
                      e = new na.d(n.x, n.y, e.x, e.y)
                      h.top = e.ia
                      h.left = e.la
                      h.bottom = e.ja
                      h.right = e.ma
                      break
                    case "XYZ":
                      n = e.qa({ x: f.ea("left") || 0, y: f.ea("top") || 0 })
                      h.top = n.y
                      h.left = n.x
                      h.zoom = f.ea("zoom") || 0
                      break
                    default:
                      Object(fa.i)("unknown dest fit: " + n)
                  }
                h = { name: "GoTo", dest: h }
              } else Object(fa.i)("missing dest in GoTo action")
              f.Za()
              return h
            case "submit-form":
              h = {
                name: "SubmitForm",
                url: f.ea("url"),
                format: f.ea("format"),
                method: f.ea("method") || "POST",
                exclude: aa(f.ea("exclude"), !1),
              }
              e = f.ea("flags")
              h.flags = e ? e.split(" ") : []
              for (f.Ia(); f.advance(); )
                switch (((e = f.La()), e)) {
                  case "fields":
                    h.fields = ea(f)
                    break
                  default:
                    Object(fa.i)("unrecognised submit-form child: " + e)
                }
              f.Za()
              return h
            case "reset-form":
              h = { name: "ResetForm", exclude: aa(f.ea("exclude"), !1) }
              for (f.Ia(); f.advance(); )
                switch (((e = f.La()), e)) {
                  case "fields":
                    h.fields = ea(f)
                    break
                  default:
                    Object(fa.i)("unrecognised reset-form child: " + e)
                }
              f.Za()
              return h
            case "hide":
              h = { name: "Hide", hide: aa(f.ea("hide"), !0) }
              for (f.Ia(); f.advance(); )
                switch (((e = f.La()), e)) {
                  case "fields":
                    h.fields = ea(f)
                    break
                  default:
                    Object(fa.i)("unrecognised hide child: " + e)
                }
              f.Za()
              return h
            case "named":
              return { name: "Named", action: f.ea("name") }
            default:
              Object(fa.i)("Encountered unexpected action type: " + h)
          }
          return null
        }
        function ca(f, e, h) {
          var n = {}
          for (f.Ia(); f.advance(); ) {
            var r = f.La()
            switch (r) {
              case "action":
                r = f.ea("trigger")
                if (e ? -1 !== e.indexOf(r) : 1) {
                  n[r] = []
                  for (f.Ia(); f.advance(); ) {
                    var w = ha(f, h)
                    Object(ma.isNull)(w) || n[r].push(w)
                  }
                  f.Za()
                } else Object(fa.i)("encountered unexpected trigger on field: " + r)
                break
              default:
                Object(fa.i)("encountered unknown action child: " + r)
            }
          }
          f.Za()
          return n
        }
        function z(f) {
          return new pa.a(f.ea("r") || 0, f.ea("g") || 0, f.ea("b") || 0, f.ea("a") || 1)
        }
        function w(f, e) {
          var h = f.ea("name"),
            n = f.ea("type") || "Type1",
            r = f.ea("size"),
            w = e.qa({ x: 0, y: 0 })
          r = e.qa({ x: Number(r), y: 0 })
          e = w.x - r.x
          w = w.y - r.y
          h = {
            name: h,
            type: n,
            size: Math.sqrt(e * e + w * w) || 0,
            strokeColor: [0, 0, 0],
            fillColor: [0, 0, 0],
          }
          for (f.Ia(); f.advance(); )
            switch (((n = f.La()), n)) {
              case "stroke-color":
                h.strokeColor = z(f)
                break
              case "fill-color":
                h.fillColor = z(f)
                break
              default:
                Object(fa.i)("unrecognised font child: " + n)
            }
          f.Za()
          return h
        }
        function y(f) {
          return { value: f.ea("value"), displayValue: f.ea("display-value") || void 0 }
        }
        function r(f) {
          var e = []
          for (f.Ia(); f.advance(); ) {
            var h = f.La()
            switch (h) {
              case "option":
                e.push(y(f))
                break
              default:
                Object(fa.i)("unrecognised options child: " + h)
            }
          }
          f.Za()
          return e
        }
        function n(f, e) {
          var h = f.ea("name"),
            n = {
              type: f.ea("type"),
              quadding: f.ea("quadding") || "Left-justified",
              maxLen: f.ea("max-len") || -1,
            },
            x = f.ea("flags")
          Object(ma.isString)(x) && (n.flags = x.split(" "))
          for (f.Ia(); f.advance(); )
            switch (((x = f.La()), x)) {
              case "actions":
                n.actions = ca(f, ["C", "F", "K", "V"], function () {
                  return e
                })
                break
              case "default-value":
                n.defaultValue = ba(f)
                break
              case "font":
                n.font = w(f, e)
                break
              case "options":
                n.options = r(f)
                break
              default:
                Object(fa.i)("unknown field child: " + x)
            }
          f.Za()
          return new window.Annotations.ga.pa(h, n)
        }
        function h(f, e) {
          switch (f.type) {
            case "Tx":
              try {
                if (Object(ra.c)(f.actions)) return new ja.a.DatePickerWidgetAnnotation(f, e)
              } catch (ua) {
                Object(fa.i)(ua)
              }
              return new ja.a.TextWidgetAnnotation(f, e)
            case "Ch":
              return f.flags.get(oa.WidgetFlags.COMBO)
                ? new ja.a.ChoiceWidgetAnnotation(f, e)
                : new ja.a.ListWidgetAnnotation(f, e)
            case "Btn":
              return f.flags.get(oa.WidgetFlags.PUSH_BUTTON)
                ? new ja.a.PushButtonWidgetAnnotation(f, e)
                : f.flags.get(oa.WidgetFlags.RADIO)
                ? new ja.a.RadioButtonWidgetAnnotation(f, e)
                : new ja.a.CheckButtonWidgetAnnotation(f, e)
            case "Sig":
              return new ja.a.SignatureWidgetAnnotation(f, e)
            default:
              Object(fa.i)("Unrecognised field type: " + f.type)
          }
          return null
        }
        function f(f, e) {
          var h = { number: f.ea("number") }
          for (f.Ia(); f.advance(); ) {
            var n = f.La()
            switch (n) {
              case "actions":
                h.actions = ca(f, ["O", "C"], e)
                break
              default:
                Object(fa.i)("unrecognised page child: " + n)
            }
          }
          f.Za()
          return h
        }
        function x(e, r, x, y) {
          var aa = [],
            ba = {}
          e.Ia()
          var da = [],
            ha = {},
            ia = []
          Object(la.a)(
            function () {
              if (e.advance()) {
                var x = e.La()
                switch (x) {
                  case "calculation-order":
                    da = "calculation-order" === e.La() ? ea(e) : []
                    break
                  case "document-actions":
                    ha = ca(e, ["Init", "Open"], r)
                    break
                  case "pages":
                    x = []
                    for (e.Ia(); e.advance(); ) {
                      var y = e.La()
                      switch (y) {
                        case "page":
                          x.push(f(e, r))
                          break
                        default:
                          Object(fa.i)("unrecognised page child: " + y)
                      }
                    }
                    e.Za()
                    ia = x
                    break
                  case "field":
                    y = n(e, r(1))
                    ba[y.name] = y
                    break
                  case "widget":
                    x = {
                      border: { style: "Solid", width: 1 },
                      backgroundColor: [],
                      fieldName: e.ea("field"),
                      page: e.ea("page"),
                      index: e.ea("index") || 0,
                      rotation: e.ea("rotation") || 0,
                      flags: [],
                      isImporting: !0,
                    }
                    ;(y = e.ea("appearance")) && (x.appearance = y)
                    ;(y = e.ea("flags")) && (x.flags = y.split(" "))
                    for (e.Ia(); e.advance(); )
                      switch (((y = e.La()), y)) {
                        case "rect":
                          var ja = e,
                            ka = r(Number(x.page))
                          y = ka.qa({ x: ja.ea("x1") || 0, y: ja.ea("y1") || 0 })
                          ja = ka.qa({ x: ja.ea("x2") || 0, y: ja.ea("y2") || 0 })
                          y = new na.d(y.x, y.y, ja.x, ja.y)
                          y.normalize()
                          x.rect = { x1: y.x1, y1: y.y1, x2: y.x2, y2: y.y2 }
                          break
                        case "border":
                          y = e
                          ja = {
                            style: y.ea("style") || "Solid",
                            width: y.ea("width") || 1,
                            color: [0, 0, 0],
                          }
                          for (y.Ia(); y.advance(); )
                            switch (((ka = y.La()), ka)) {
                              case "color":
                                ja.color = z(y)
                                break
                              default:
                                Object(fa.i)("unrecognised border child: " + ka)
                            }
                          y.Za()
                          x.border = ja
                          break
                        case "background-color":
                          x.backgroundColor = z(e)
                          break
                        case "actions":
                          x.actions = ca(e, "E X D U Fo Bl PO PC PV PI".split(" "), r)
                          break
                        case "appearances":
                          y = e
                          ja = Object(ra.b)(x, "appearances")
                          for (y.Ia(); y.advance(); )
                            if (((ka = y.La()), "appearance" === ka)) {
                              ka = y.ea("name")
                              var ua = Object(ra.b)(ja, ka)
                              ka = y
                              for (ka.Ia(); ka.advance(); ) {
                                var oa = ka.La()
                                switch (oa) {
                                  case "Normal":
                                    Object(ra.b)(ua, "Normal").data = ka.current.textContent
                                    break
                                  default:
                                    Object(fa.i)("unexpected appearance state: ", oa)
                                }
                              }
                              ka.Za()
                            } else Object(fa.i)("unexpected appearances child: " + ka)
                          y.Za()
                          break
                        case "extra":
                          y = e
                          ja = r
                          ka = {}
                          for (y.Ia(); y.advance(); )
                            switch (((ua = y.La()), ua)) {
                              case "font":
                                ka.font = w(y, ja(1))
                                break
                              default:
                                Object(fa.i)("unrecognised extra child: " + ua)
                            }
                          y.Za()
                          y = ka
                          y.font && (x.font = y.font)
                          break
                        case "captions":
                          ja = e
                          y = {}
                          ;(ka = ja.ea("Normal")) && (y.Normal = ka)
                          ;(ka = ja.ea("Rollover")) && (y.Rollover = ka)
                          ;(ja = ja.ea("Down")) && (y.Down = ja)
                          x.captions = y
                          break
                        default:
                          Object(fa.i)("unrecognised widget child: " + y)
                      }
                    e.Za()
                    ;(y = ba[x.fieldName])
                      ? ((x = h(y, x)), aa.push(x))
                      : Object(fa.i)(
                          "ignoring widget with no corresponding field data: " + x.fieldName
                        )
                    break
                  default:
                    Object(fa.i)("Unknown element encountered in PDFInfo: " + x)
                }
                return !0
              }
              return !1
            },
            function () {
              e.Za()
              x({
                calculationOrder: da,
                widgets: aa,
                fields: ba,
                documentActions: ha,
                pages: ia,
                custom: [],
              })
            },
            y
          )
        }
        e.r(da)
        e.d(da, "parse", function () {
          return x
        })
        var fa = e(2),
          ma = e(0)
        e.n(ma)
        var ja = e(112),
          na = e(4),
          pa = e(7),
          la = e(21),
          ra = e(98),
          oa = e(15)
      },
    },
  ])
}.call(this || window))
