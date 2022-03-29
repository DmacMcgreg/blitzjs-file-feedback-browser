/*
@license

dhtmlxVault v.4.1.0 Evaluation

This software is covered by DHTMLX Evaluation License and purposed only for evaluation.
Contact sales@dhtmlx.com to get Commercial or Enterprise license.
Usage without proper license is prohibited.

(c) XB Software.

*/
if (
  (window.dhx && ((window.dhx_legacy = dhx), delete window.dhx),
  (function (t, e) {
    "object" == typeof exports && "object" == typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define([], e)
      : "object" == typeof exports
      ? (exports.dhx = e())
      : (t.dhx = e())
  })(window, function () {
    return (
      (n = {}),
      (o.m = i =
        [
          function (t, o, n) {
            "use strict"
            ;(function (t) {
              Object.defineProperty(o, "__esModule", { value: !0 })
              var e = n(87)
              function i(i) {
                function e(t) {
                  var e = t.el.offsetHeight,
                    t = t.el.offsetWidth
                  i(t, e)
                }
                var n = window.ResizeObserver
                return n
                  ? o.el("div.dhx-resize-observer", {
                      _hooks: {
                        didInsert: function (t) {
                          new n(function () {
                            return e(t)
                          }).observe(t.el)
                        },
                      },
                    })
                  : o.el("iframe.dhx-resize-observer", {
                      _hooks: {
                        didInsert: function (t) {
                          ;(t.el.contentWindow.onresize = function () {
                            return e(t)
                          }),
                            e(t)
                        },
                      },
                    })
              }
              ;(o.el = e.defineElement),
                (o.sv = e.defineSvgElement),
                (o.view = e.defineView),
                (o.create = e.createView),
                (o.inject = e.injectView),
                (o.KEYED_LIST = e.KEYED_LIST),
                (o.disableHelp = function () {
                  ;(e.DEVMODE.mutations = !1),
                    (e.DEVMODE.warnings = !1),
                    (e.DEVMODE.verbose = !1),
                    (e.DEVMODE.UNKEYED_INPUT = !1)
                }),
                (o.resizer = i),
                (o.resizeHandler = function (t, e) {
                  return o
                    .create({
                      render: function () {
                        return i(e)
                      },
                    })
                    .mount(t)
                }),
                (o.awaitRedraw = function () {
                  return new t(function (t) {
                    requestAnimationFrame(function () {
                      t()
                    })
                  })
                })
            }.call(this, n(9)))
          },
          function (t, e, i) {
            "use strict"
            var o =
              (this && this.__assign) ||
              function () {
                return (o =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(2),
              r = new Date().valueOf()
            ;(e.uid = function () {
              return "u" + r++
            }),
              (e.extend = function t(e, i, n) {
                if ((void 0 === n && (n = !0), i))
                  for (var o in i) {
                    var r = i[o],
                      s = e[o]
                    void 0 === r
                      ? delete e[o]
                      : !n || "object" != typeof s || s instanceof Date || s instanceof Array
                      ? (e[o] = r)
                      : t(s, r)
                  }
                return e
              }),
              (e.copy = function (t, e) {
                var i,
                  n = {}
                for (i in t) (e && i.startsWith("$")) || (n[i] = t[i])
                return n
              }),
              (e.naturalSort = function (t) {
                return t.sort(function (t, e) {
                  return "string" == typeof t ? t.localeCompare(e) : t - e
                })
              }),
              (e.findIndex = function (t, e) {
                for (var i = t.length, n = 0; n < i; n++) if (e(t[n])) return n
                return -1
              }),
              (e.isEqualString = function (t, e) {
                if (((t = t.toString()), (e = e.toString()), t.length > e.length)) return !1
                for (var i = 0; i < t.length; i++)
                  if (t[i].toLowerCase() !== e[i].toLowerCase()) return !1
                return !0
              }),
              (e.singleOuterClick = function (e) {
                var i = function (t) {
                  e(t) && document.removeEventListener("click", i)
                }
                document.addEventListener("click", i)
              }),
              (e.detectWidgetClick = function (e, i) {
                function t(t) {
                  return i(n.locate(t, "dhx_widget_id") === e)
                }
                return (
                  document.addEventListener("click", t),
                  function () {
                    return document.removeEventListener("click", t)
                  }
                )
              }),
              (e.unwrapBox = function (t) {
                return Array.isArray(t) ? t[0] : t
              }),
              (e.wrapBox = function (t) {
                return Array.isArray(t) ? t : [t]
              }),
              (e.isDefined = function (t) {
                return null != t
              }),
              (e.range = function (t, e) {
                if (e < t) return []
                for (var i = []; t <= e; ) i.push(t++)
                return i
              }),
              (e.isNumeric = function (t) {
                return !isNaN(t - parseFloat(t))
              }),
              (e.downloadFile = function (t, e, i) {
                void 0 === i && (i = "text/plain")
                var n,
                  o,
                  i = new Blob([t], { type: i })
                window.navigator.msSaveOrOpenBlob
                  ? window.navigator.msSaveOrOpenBlob(i, e)
                  : ((n = document.createElement("a")),
                    (o = URL.createObjectURL(i)),
                    (n.href = o),
                    (n.download = e),
                    document.body.appendChild(n),
                    n.click(),
                    setTimeout(function () {
                      document.body.removeChild(n), window.URL.revokeObjectURL(o)
                    }, 0))
              }),
              (e.debounce = function (o, r, s) {
                var a
                return function () {
                  for (var t = this, e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i]
                  var n = s && !a
                  clearTimeout(a),
                    (a = setTimeout(function () {
                      ;(a = null), s || o.apply(t, e)
                    }, r)),
                    n && o.apply(this, e)
                }
              }),
              (e.compare = function t(e, i) {
                for (var n in e) {
                  if (e.hasOwnProperty(n) !== i.hasOwnProperty(n)) return !1
                  switch (typeof e[n]) {
                    case "object":
                      if (!t(e[n], i[n])) return !1
                      break
                    case "function":
                      if (
                        void 0 === i[n] ||
                        ("compare" !== n && e[n].toString() !== i[n].toString())
                      )
                        return !1
                      break
                    default:
                      if (e[n] !== i[n]) return !1
                  }
                }
                for (var n in i) if (void 0 === e[n]) return !1
                return !0
              }),
              (e.isType = function (t) {
                return (
                  (Object.prototype.toString.call(t).match(/^\[object (\S+?)\]$/) || [])[1] ||
                  "undefined"
                ).toLowerCase()
              }),
              (e.isEmptyObj = function (t) {
                for (var e in t) return !1
                return !0
              }),
              (e.getMaxArrayNymber = function (t) {
                if (t.length) {
                  for (var e = -1 / 0, i = 0, n = t.length; i < n; i++) t[i] > e && (e = t[i])
                  return e
                }
              }),
              (e.getMinArrayNymber = function (t) {
                if (t.length) {
                  for (var e = 1 / 0, i = 0, n = t.length; i < n; i++) t[i] < e && (e = t[i])
                  return e
                }
              }),
              (e.getStringWidth = function (t, e) {
                e = o({ font: "normal 14px Roboto", lineHeight: 20 }, e)
                var i = document.createElement("canvas"),
                  n = i.getContext("2d")
                e.font && (n.font = e.font)
                t = n.measureText(t).width
                return i.remove(), t
              }),
              (e.rgbToHex = function (t) {
                if ("#" === t.substr(0, 1)) return t
                t = /(.*?)rgb[a]?\((\d+), *(\d+), *(\d+),* *([\d+.]*)\)/.exec(t)
                return (
                  "#" +
                  parseInt(t[2], 10).toString(16).padStart(2, "0") +
                  parseInt(t[3], 10).toString(16).padStart(2, "0") +
                  parseInt(t[4], 10).toString(16).padStart(2, "0")
                )
              })
          },
          function (t, e, i) {
            "use strict"
            var c =
              (this && this.__assign) ||
              function () {
                return (c =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            function n(t, e, i) {
              for (
                void 0 === e && (e = "dhx_id"),
                  void 0 === i && (i = "target"),
                  t instanceof Event && (t = t[i]);
                t;

              ) {
                if (t.getAttribute && t.getAttribute(e)) return t
                t = t.parentNode
              }
            }
            Object.defineProperty(e, "__esModule", { value: !0 }),
              (e.toNode = function (t) {
                var e
                return "string" == typeof t
                  ? document.getElementById(t) ||
                      document.querySelector(t) ||
                      (null === (e = document.querySelector("[dhx_root_id=" + t + "]")) ||
                      void 0 === e
                        ? void 0
                        : e.parentElement) ||
                      document.body
                  : t || document.body
              }),
              (e.eventHandler = function (s, a, l) {
                var c = Object.keys(a)
                return function (t) {
                  var e = s(t)
                  if (void 0 !== e) {
                    var i = t.target
                    t: for (; i; ) {
                      var n = (i.getAttribute && i.getAttribute("class")) || ""
                      if (n.length)
                        for (var o = n.split(" "), r = 0; r < c.length; r++)
                          if (o.includes(c[r])) {
                            if (!1 === a[c[r]](t, e)) return !1
                            break t
                          }
                      i = i.parentNode
                    }
                  }
                  return l && l(t), !0
                }
              }),
              (e.locateNode = n),
              (e.locate = function (t, e) {
                return void 0 === e && (e = "dhx_id"), (t = n(t, e)) ? t.getAttribute(e) : ""
              }),
              (e.locateNodeByClassName = function (t, e) {
                for (t instanceof Event && (t = t.target); t; ) {
                  if (e) {
                    if (t.classList && t.classList.contains(e)) return t
                  } else if (t.getAttribute && t.getAttribute("dhx_id")) return t
                  t = t.parentNode
                }
              }),
              (e.getBox = function (t) {
                var e = t.getBoundingClientRect(),
                  i = document.body,
                  n = window.pageYOffset || i.scrollTop,
                  t = window.pageXOffset || i.scrollLeft
                return {
                  top: e.top + n,
                  left: e.left + t,
                  right: i.offsetWidth - e.right,
                  bottom: i.offsetHeight - e.bottom,
                  width: e.right - e.left,
                  height: e.bottom - e.top,
                }
              })
            var o = -1
            e.getScrollbarWidth = function () {
              if (-1 < o) return o
              var t = document.createElement("div")
              return (
                document.body.appendChild(t),
                (t.style.cssText =
                  "position: absolute;left: -99999px;overflow:scroll;width: 100px;height: 100px;"),
                (o = t.offsetWidth - t.clientWidth),
                document.body.removeChild(t),
                o
              )
            }
            var r = -1
            function s(t) {
              t = t.getBoundingClientRect()
              return {
                left: t.left + window.pageXOffset,
                right: t.right + window.pageXOffset,
                top: t.top + window.pageYOffset,
                bottom: t.bottom + window.pageYOffset,
              }
            }
            function d() {
              return {
                rightBorder: window.pageXOffset + window.innerWidth,
                bottomBorder: window.pageYOffset + window.innerHeight,
              }
            }
            function l(t, e) {
              var i,
                n,
                o,
                r = d(),
                s = r.rightBorder,
                a = r.bottomBorder - t.bottom - e.height,
                l = t.top - e.height
              if (
                ("bottom" === e.mode
                  ? 0 <= a
                    ? (i = t.bottom)
                    : 0 <= l && (i = l)
                  : 0 <= l
                  ? (i = l)
                  : 0 <= a && (i = t.bottom),
                a < 0 && l < 0)
              ) {
                if (e.auto) return u(t, c(c({}, e), { mode: "right", auto: !1 }))
                i = l < a ? t.bottom : l
              }
              return {
                left: e.centering
                  ? ((n = t),
                    (o = e.width),
                    (r = s),
                    (a = (o - (n.right - n.left)) / 2),
                    (l = n.left - a),
                    (a = n.right + a),
                    0 <= l && a <= r ? l : l < 0 ? 0 : r - o)
                  : ((s = s - t.left - e.width),
                    (e = t.right - e.width),
                    0 <= s || (!(0 <= e) && s < e) ? t.left : e),
                top: i,
              }
            }
            function u(t, e) {
              var i,
                n,
                o = d(),
                r = o.rightBorder,
                s = o.bottomBorder,
                a = r - t.right - e.width,
                o = t.left - e.width
              if (
                ("right" === e.mode
                  ? 0 <= a
                    ? (n = t.right)
                    : 0 <= o && (n = o)
                  : 0 <= o
                  ? (n = o)
                  : 0 <= a && (n = t.right),
                o < 0 && a < 0)
              ) {
                if (e.auto) return l(t, c(c({}, e), { mode: "bottom", auto: !1 }))
                n = a < o ? o : t.right
              }
              return {
                left: n,
                top: e.centering
                  ? ((a = t),
                    (i = e.height),
                    (o = r),
                    (n = (i - (a.bottom - a.top)) / 2),
                    (r = a.top - n),
                    (n = a.bottom + n),
                    0 <= r && n <= o ? r : r < 0 ? 0 : o - i)
                  : ((i = t.bottom - e.height),
                    !(0 <= (e = s - t.top - e.height)) && (0 < i || e < i) ? i : t.top),
              }
            }
            function a(t, e) {
              var i = ("bottom" === e.mode || "top" === e.mode ? l : u)(t, e),
                t = i.left,
                i = i.top
              return {
                left: Math.round(t) + "px",
                top: Math.round(i) + "px",
                minWidth: Math.round(e.width) + "px",
                position: "absolute",
              }
            }
            ;(e.getScrollbarHeight = function () {
              if (-1 < r) return r
              var t = document.createElement("div")
              return (
                document.body.appendChild(t),
                (t.style.cssText =
                  "position: absolute;left: -99999px;overflow:scroll;width: 100px;height: 100px;"),
                (r = t.offsetHeight - t.clientHeight),
                document.body.removeChild(t),
                r
              )
            }),
              (e.isIE = function () {
                var t = window.navigator.userAgent
                return t.includes("MSIE ") || t.includes("Trident/")
              }),
              (e.isSafari = function () {
                function t(t) {
                  return t.test(window.navigator.userAgent)
                }
                var e = t(/Chrome/),
                  i = t(/Firefox/)
                return !e && !i && t(/Safari/)
              }),
              (e.isFirefox = function () {
                function t(t) {
                  return t.test(window.navigator.userAgent)
                }
                var e = t(/Chrome/),
                  i = t(/Safari/)
                return !e && !i && t(/Firefox/)
              }),
              (e.getRealPosition = s),
              (e.calculatePosition = a),
              (e.fitPosition = function (t, e) {
                return a(s(t), e)
              }),
              (e.getPageCss = function () {
                for (var t = [], e = 0; e < document.styleSheets.length; e++)
                  for (
                    var i = document.styleSheets[e],
                      n = ("cssRules" in i) ? i.cssRules : i.rules,
                      o = 0;
                    o < n.length;
                    o++
                  ) {
                    var r = n[o]
                    "cssText" in r
                      ? t.push(r.cssText)
                      : t.push(r.selectorText + " {\n" + r.style.cssText + "\n}\n")
                  }
                return t.join("\n")
              }),
              (e.getLabelStyle = function (t) {
                var e = t.helpMessage,
                  i = t.type,
                  n = t.labelWidth,
                  o = t.label,
                  r = n && n.toString().startsWith("0"),
                  t = "text" !== i && t.required
                return (
                  !!(e || t || !(!o || (o && r)) || (n && !r)) && {
                    style: (o || n) && !r && { width: n, "max-width": "100%" },
                    label: o && r ? null : o,
                  }
                )
              })
          },
          function (t, e, i) {
            "use strict"
            var n
            Object.defineProperty(e, "__esModule", { value: !0 }),
              ((n = e.GridEvents || (e.GridEvents = {})).scroll = "scroll"),
              (n.expand = "expand"),
              (n.filterChange = "filterChange"),
              (n.beforeResizeStart = "beforeResizeStart"),
              (n.resize = "resize"),
              (n.afterResizeEnd = "afterResizeEnd"),
              (n.cellClick = "cellClick"),
              (n.cellRightClick = "cellRightClick"),
              (n.cellMouseOver = "cellMouseOver"),
              (n.cellMouseDown = "cellMouseDown"),
              (n.cellDblClick = "cellDblClick"),
              (n.headerCellClick = "headerCellClick"),
              (n.footerCellClick = "footerCellClick"),
              (n.headerCellMouseOver = "headerCellMouseOver"),
              (n.footerCellMouseOver = "footerCellMouseOver"),
              (n.headerCellMouseDown = "headerCellMouseDown"),
              (n.footerCellMouseDown = "footerCellMouseDown"),
              (n.headerCellDblClick = "headerCellDblClick"),
              (n.footerCellDblClick = "footerCellDblClick"),
              (n.headerCellRightClick = "headerCellRightClick"),
              (n.footerCellRightClick = "footerCellRightClick"),
              (n.beforeEditStart = "beforeEditStart"),
              (n.afterEditStart = "afterEditStart"),
              (n.beforeEditEnd = "beforeEditEnd"),
              (n.afterEditEnd = "afterEditEnd"),
              (n.beforeKeyDown = "beforeKeyDown"),
              (n.afterKeyDown = "afterKeyDown"),
              (n.beforeColumnHide = "beforeColumnHide"),
              (n.afterColumnHide = "afterColumnHide"),
              (n.beforeColumnShow = "beforeColumnShow"),
              (n.afterColumnShow = "afterColumnShow"),
              (n.beforeRowHide = "beforeRowHide"),
              (n.afterRowHide = "afterRowHide"),
              (n.beforeRowShow = "beforeRowShow"),
              (n.afterRowShow = "afterRowShow"),
              (n.beforeRowDrag = "beforeRowDrag"),
              (n.dragRowStart = "dragRowStart"),
              (n.dragRowOut = "dragRowOut"),
              (n.dragRowIn = "dragRowIn"),
              (n.canRowDrop = "canRowDrop"),
              (n.cancelRowDrop = "cancelRowDrop"),
              (n.beforeRowDrop = "beforeRowDrop"),
              (n.afterRowDrop = "afterRowDrop"),
              (n.afterRowDrag = "afterRowDrag"),
              (n.beforeColumnDrag = "beforeColumnDrag"),
              (n.dragColumnStart = "dragColumnStart"),
              (n.dragColumnOut = "dragColumnOut"),
              (n.dragColumnIn = "dragColumnIn"),
              (n.canColumnDrop = "canColumnDrop"),
              (n.cancelColumnDrop = "cancelColumnDrop"),
              (n.beforeColumnDrop = "beforeColumnDrop"),
              (n.afterColumnDrop = "afterColumnDrop"),
              (n.afterColumnDrag = "afterColumnDrag"),
              (n.beforeRowResize = "beforeRowResize"),
              (n.afterRowResize = "afterRowResize"),
              (n.beforeSort = "beforeSort"),
              (n.afterSort = "afterSort"),
              ((n = e.GridSystemEvents || (e.GridSystemEvents = {})).cellTouchMove =
                "cellTouchMove"),
              (n.cellTouchEnd = "cellTouchEnd"),
              (n.headerCellTouchMove = "headerCellTouchMove"),
              (n.headerCellTouchEnd = "headerCellTouchEnd"),
              ((e = e.GridSelectionEvents || (e.GridSelectionEvents = {})).beforeUnSelect =
                "beforeUnSelect"),
              (e.afterUnSelect = "afterUnSelect"),
              (e.beforeSelect = "beforeSelect"),
              (e.afterSelect = "afterSelect")
          },
          function (t, i, e) {
            "use strict"
            function n(t) {
              for (var e in t) i.hasOwnProperty(e) || (i[e] = t[e])
            }
            Object.defineProperty(i, "__esModule", { value: !0 }),
              n(e(10)),
              n(e(36)),
              n(e(85)),
              n(e(86)),
              n(e(14)),
              n(e(121)),
              n(e(11)),
              n(e(39)),
              n(e(38)),
              n(e(122)),
              n(e(37)),
              n(e(29))
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n =
              ((o.prototype.on = function (t, e, i) {
                t = t.toLowerCase()
                ;(this.events[t] = this.events[t] || []),
                  this.events[t].push({ callback: e, context: i || this.context })
              }),
              (o.prototype.detach = function (t, e) {
                var t = t.toLowerCase(),
                  i = this.events[t]
                if (e && i && i.length)
                  for (var n = i.length - 1; 0 <= n; n--) i[n].context === e && i.splice(n, 1)
                else this.events[t] = []
              }),
              (o.prototype.fire = function (t, e) {
                void 0 === e && (e = [])
                t = t.toLowerCase()
                return (
                  !this.events[t] ||
                  !this.events[t]
                    .map(function (t) {
                      return t.callback.apply(t.context, e)
                    })
                    .includes(!1)
                )
              }),
              (o.prototype.clear = function () {
                this.events = {}
              }),
              o)
            function o(t) {
              ;(this.events = {}), (this.context = t || this)
            }
            ;(e.EventSystem = n),
              (e.EventsMixin = function (t) {
                var e = new n((t = t || {}))
                ;(t.detachEvent = e.detach.bind(e)),
                  (t.attachEvent = e.on.bind(e)),
                  (t.callEvent = e.fire.bind(e))
              })
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(1),
              o = i(2),
              i =
                ((r.prototype.mount = function (t, e) {
                  e && (this._view = e),
                    t &&
                      this._view &&
                      this._view.mount &&
                      ((this._container = o.toNode(t)),
                      this._container.tagName
                        ? this._view.mount(this._container)
                        : this._container.attach && this._container.attach(this))
                }),
                (r.prototype.unmount = function () {
                  var t = this.getRootView()
                  t && t.node && (t.unmount(), (this._view = null))
                }),
                (r.prototype.getRootView = function () {
                  return this._view
                }),
                (r.prototype.getRootNode = function () {
                  return this._view && this._view.node && this._view.node.el
                }),
                (r.prototype.paint = function () {
                  this._view &&
                    (this._view.node || this._container) &&
                    ((this._doNotRepaint = !1), this._view.redraw())
                }),
                r)
            function r(t, e) {
              ;(this.config = e || {}), (this._uid = this.config.rootId || n.uid())
            }
            ;(e.View = i),
              (e.toViewLike = function (e) {
                return {
                  getRootView: function () {
                    return e
                  },
                  paint: function () {
                    return e.node && e.redraw()
                  },
                  mount: function (t) {
                    return e.mount(t)
                  },
                }
              })
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var o = i(1)
            ;(e.transpose = function (t, e) {
              for (var i = [], n = 0; n < t.length; n++)
                for (var o = t[n], r = 0; r < o.length; r++) {
                  i[r] = i[r] || []
                  var s = e ? e(o[r]) : o[r]
                  i[r].push(s)
                }
              return i
            }),
              (e.getStyleByClass = function (t, e, i, n) {
                return (
                  (e = e.querySelector("." + i)),
                  (i = e),
                  (i =
                    "string" == typeof (t = '<div class="' + t + '"></div>')
                      ? (i.insertAdjacentHTML("beforeend", t), i.lastChild)
                      : (i.appendChild(t), t)),
                  (t = {
                    color:
                      "rgb(0, 0, 0)" === (t = window.getComputedStyle(i)).color
                        ? n.color
                        : o.rgbToHex(t.color),
                    background:
                      "rgba(0, 0, 0, 0)" === t.backgroundColor
                        ? n.background
                        : o.rgbToHex(t.backgroundColor),
                    fontSize: parseFloat(t.fontSize),
                  }),
                  e.removeChild(i),
                  t.color === n.color && t.background === n.background && t.fontSize === n.fontSize
                    ? null
                    : t
                )
              }),
              (e.removeHTMLTags = function (t) {
                return "string" != typeof t && "number" != typeof t && "boolean" != typeof t
                  ? ""
                  : ("" + (null == t ? "" : t))
                      .replace(/<[^>]*>/g, "")
                      .replace(/["]/g, "&quot;")
                      .trim()
              }),
              (e.isCssSupport = function (e, i) {
                try {
                  return CSS.supports(e, i)
                } catch (t) {
                  var n = document.createElement("div")
                  return (n.style[e] = i), n.style[e] === i
                }
              }),
              (e.isRowEmpty = function (i) {
                if (i)
                  return Object.keys(i).reduce(function (t, e) {
                    return "id" !== e && !e.startsWith("$") && t && void 0 !== i[e] && "" !== i[e]
                      ? void 0
                      : t
                  }, !0)
              }),
              (e.isSortable = function (t, e) {
                return (!1 !== e.sortable && t.sortable) || e.sortable
              }),
              (e.isAutoWidth = function (e, t) {
                if (t) return (!1 !== t.autoWidth && e.autoWidth) || t.autoWidth
                var i = !1
                return (
                  e.columns.map(function (t) {
                    ;((!1 !== t.autoWidth && e.autoWidth) || t.autoWidth) && (i = !0)
                  }),
                  i
                )
              }),
              (e.isTooltip = function (t, e) {
                return (!1 !== e.tooltip && t.tooltip) || e.tooltip
              }),
              (e.isHtmlEnable = function (t, e) {
                return (!1 !== e.htmlEnable && t.htmlEnable) || e.htmlEnable
              }),
              (e.getTotalWidth = function (t) {
                return t.reduce(function (t, e) {
                  return t + (e.$width || 0)
                }, 0)
              }),
              (e.getTotalHeight = function (t) {
                return t.reduce(function (t, e) {
                  return t + (e.$height || 0)
                }, 0)
              })
          },
          function (t, i, e) {
            "use strict"
            function n(t) {
              for (var e in t) i.hasOwnProperty(e) || (i[e] = t[e])
            }
            Object.defineProperty(i, "__esModule", { value: !0 }),
              n(e(70)),
              n(e(71)),
              n(e(75)),
              n(e(76)),
              n(e(27))
          },
          function (t, e, i) {
            ;(function (o, r) {
              !(function () {
                var e = 1,
                  i = {},
                  n = !1
                function d(t) {
                  o.setImmediate
                    ? r(t)
                    : o.importScripts
                    ? setTimeout(t)
                    : ((i[++e] = t), o.postMessage(e, "*"))
                }
                function u(t) {
                  "use strict"
                  if ("function" != typeof t && null != t) throw TypeError()
                  if ("object" != typeof this || (this && this.then)) throw TypeError()
                  var e,
                    i,
                    n = this,
                    r = 0,
                    s = 0,
                    o = []
                  ;((n.promise = n).resolve = function (t) {
                    return (e = n.fn), (i = n.er), r || ((s = t), (r = 1), d(c)), n
                  }),
                    (n.reject = function (t) {
                      return (e = n.fn), (i = n.er), r || ((s = t), (r = 2), d(c)), n
                    }),
                    (n._d = 1),
                    (n.then = function (t, e) {
                      if (1 != this._d) throw TypeError()
                      var i = new u()
                      return (
                        (i.fn = t),
                        (i.er = e),
                        3 == r ? i.resolve(s) : 4 == r ? i.reject(s) : o.push(i),
                        i
                      )
                    }),
                    (n.catch = function (t) {
                      return n.then(null, t)
                    })
                  var a = function (t) {
                    ;(r = t || 4),
                      o.map(function (t) {
                        ;(3 == r && t.resolve(s)) || t.reject(s)
                      })
                  }
                  try {
                    "function" == typeof t && t(n.resolve, n.reject)
                  } catch (t) {
                    n.reject(t)
                  }
                  return n
                  function l(t, e, i, n) {
                    if (2 == r) return n()
                    if (("object" != typeof s && "function" != typeof s) || "function" != typeof t)
                      n()
                    else
                      try {
                        var o = 0
                        t.call(
                          s,
                          function (t) {
                            o++ || ((s = t), e())
                          },
                          function (t) {
                            o++ || ((s = t), i())
                          }
                        )
                      } catch (t) {
                        ;(s = t), i()
                      }
                  }
                  function c() {
                    var t
                    try {
                      t = s && s.then
                    } catch (t) {
                      return (s = t), (r = 2), c()
                    }
                    l(
                      t,
                      function () {
                        ;(r = 1), c()
                      },
                      function () {
                        ;(r = 2), c()
                      },
                      function () {
                        try {
                          1 == r && "function" == typeof e
                            ? (s = e(s))
                            : 2 == r && "function" == typeof i && ((s = i(s)), (r = 1))
                        } catch (t) {
                          return (s = t), a()
                        }
                        s == n
                          ? ((s = TypeError()), a())
                          : l(
                              t,
                              function () {
                                a(3)
                              },
                              a,
                              function () {
                                a(1 == r && 3)
                              }
                            )
                      }
                    )
                  }
                }
                ;(o = this).setImmediate ||
                  o.addEventListener("message", function (t) {
                    if (t.source == o)
                      if (n) d(i[t.data])
                      else {
                        n = !0
                        try {
                          i[t.data]()
                        } catch (t) {}
                        delete i[t.data], (n = !1)
                      }
                  }),
                  (u.resolve = function (e) {
                    if (1 != this._d) throw TypeError()
                    return e instanceof u
                      ? e
                      : new u(function (t) {
                          t(e)
                        })
                  }),
                  (u.reject = function (i) {
                    if (1 != this._d) throw TypeError()
                    return new u(function (t, e) {
                      e(i)
                    })
                  }),
                  (u.all = function (n) {
                    if (1 != this._d) throw TypeError()
                    if (!(n instanceof Array)) return u.reject(TypeError())
                    var o = new u()
                    return (
                      (function i(t, e) {
                        return e
                          ? o.resolve(e)
                          : t
                          ? o.reject(t)
                          : (0 ==
                              n.reduce(function (t, e) {
                                return e && e.then ? t + 1 : t
                              }, 0) && o.resolve(n),
                            void n.map(function (t, e) {
                              t &&
                                t.then &&
                                t.then(function (t) {
                                  return (n[e] = t), i(), t
                                }, i)
                            }))
                      })(),
                      o
                    )
                  }),
                  (u.race = function (n) {
                    if (1 != this._d) throw TypeError()
                    if (!(n instanceof Array)) return u.reject(TypeError())
                    if (0 == n.length) return new u()
                    var o = new u()
                    return (
                      (function i(t, e) {
                        return e
                          ? o.resolve(e)
                          : t
                          ? o.reject(t)
                          : (0 ==
                              n.reduce(function (t, e) {
                                return e && e.then ? t + 1 : t
                              }, 0) && o.resolve(n),
                            void n.map(function (t, e) {
                              t &&
                                t.then &&
                                t.then(function (t) {
                                  i(null, t)
                                }, i)
                            }))
                      })(),
                      o
                    )
                  }),
                  (u._d = 1),
                  (t.exports = u)
              })()
            }.call(this, i(28), i(72).setImmediate))
          },
          function (t, e, i) {
            "use strict"
            var n
            Object.defineProperty(e, "__esModule", { value: !0 }),
              ((n = e.TreeFilterType || (e.TreeFilterType = {})).all = "all"),
              (n.level = "level"),
              (n.leafs = "leafs"),
              ((n = e.DataEvents || (e.DataEvents = {})).afterAdd = "afteradd"),
              (n.beforeAdd = "beforeadd"),
              (n.removeAll = "removeall"),
              (n.beforeRemove = "beforeremove"),
              (n.afterRemove = "afterremove"),
              (n.change = "change"),
              (n.load = "load"),
              (n.loadError = "loaderror"),
              (n.beforeLazyLoad = "beforelazyload"),
              (n.afterLazyLoad = "afterlazyload"),
              ((n = e.DragEvents || (e.DragEvents = {})).beforeDrag = "beforeDrag"),
              (n.dragStart = "dragStart"),
              (n.dragOut = "dragOut"),
              (n.dragIn = "dragIn"),
              (n.canDrop = "canDrop"),
              (n.cancelDrop = "cancelDrop"),
              (n.beforeDrop = "beforeDrop"),
              (n.afterDrop = "afterDrop"),
              (n.afterDrag = "afterDrag"),
              ((e = e.DataDriver || (e.DataDriver = {})).json = "json"),
              (e.csv = "csv"),
              (e.xml = "xml")
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(14),
              o = i(37)
            ;(e.isEqualObj = function (t, e) {
              for (var i in t) if (t[i] !== e[i] || Array.isArray(t[i])) return !1
              return !0
            }),
              (e.naturalCompare = function (t, e) {
                if (isNaN(t) || isNaN(e)) {
                  var n = [],
                    o = []
                  for (
                    t.replace(/(\d+)|(\D+)/g, function (t, e, i) {
                      n.push([e || 1 / 0, i || ""])
                    }),
                      e.replace(/(\d+)|(\D+)/g, function (t, e, i) {
                        o.push([e || 1 / 0, i || ""])
                      });
                    n.length && o.length;

                  ) {
                    var i = n.shift(),
                      r = o.shift(),
                      r = i[0] - r[0] || i[1].localeCompare(r[1])
                    if (r) return r
                  }
                  return n.length - o.length
                }
                return t - e
              }),
              (e.findByConf = function (t, e) {
                if ("function" == typeof e) {
                  if (e.call(this, t)) return t
                } else if (e.by && e.match && t[e.by] === e.match) return t
              }),
              (e.isDebug = function () {
                var t = window.dhx
                if (void 0 !== t) return void 0 !== t.debug && t.debug
              }),
              (e.dhxWarning = function (t) {
                console.warn(t)
              }),
              (e.dhxError = function (t) {
                throw new Error(t)
              }),
              (e.toProxy = function (t) {
                var e = typeof t
                return "string" == e ? new n.DataProxy(t) : "object" == e ? t : void 0
              }),
              (e.toDataDriver = function (t) {
                if ("string" == typeof t) {
                  var e = window.dhx,
                    e = (e && e.dataDrivers) || o.dataDrivers
                  if (e[t]) return new e[t]()
                  console.warn("Incorrect data driver type:", t),
                    console.warn("Available types:", JSON.stringify(Object.keys(e)))
                } else if ("object" == typeof t) return t
              }),
              (e.copyWithoutInner = function (t, e) {
                var i,
                  n = {}
                for (i in t) i.startsWith("$") || (e && e[i]) || (n[i] = t[i])
                return n
              }),
              (e.isTreeCollection = function (t) {
                return Boolean(t.getRoot)
              }),
              (e.hasJsonOrArrayStructure = function (t) {
                if ("object" == typeof t) return !0
                if ("string" != typeof t) return !1
                try {
                  var e = JSON.parse(t)
                  return "[object Object]" === Object.prototype.toString.call(e) || Array.isArray(e)
                } catch (t) {
                  return !1
                }
              })
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var v = i(1),
              b = i(7),
              x = i(20)
            function l(t, e) {
              t[e] &&
                ("string" == typeof t[e]
                  ? (t[e] = [{ text: "" + t[e] }])
                  : (t[e] = t[e].map(function (t) {
                      return "string" == typeof t && (t = { text: t }), t
                    })))
            }
            ;(e.normalizeColumns = function (t, e) {
              var i = t.columns,
                n = t.htmlEnable
              void 0 === e && (e = !1)
              for (var o = 0, r = i; o < r.length; o++) {
                var s = r[o]
                ;(s.$htmlEnable = !(!s.htmlEnable && !n)),
                  (s.$cellCss = s.$cellCss || {}),
                  l(s, "header"),
                  l(s, "footer"),
                  s.header.reduce(function (t, e) {
                    return t || !!e.content
                  }, !1) && (s.$uniqueData = []),
                  s.minWidth && s.minWidth < 20 && (s.minWidth = 20),
                  s.maxWidth && s.maxWidth < 20 && (s.maxWidth = 20)
                var a = s.minWidth || 100
                s.width &&
                  (a =
                    (a =
                      s.maxWidth && s.minWidth
                        ? s.width >= s.minWidth && s.width <= s.maxWidth
                          ? s.width
                          : s.width >= s.maxWidth
                          ? s.maxWidth
                          : s.minWidth
                        : s.maxWidth
                        ? s.width <= s.maxWidth
                          ? s.width
                          : 100 < s.maxWidth
                          ? s.maxWidth
                          : 100
                        : !s.minWidth || s.width >= s.minWidth
                        ? s.width
                        : s.minWidth) < 20
                      ? 20
                      : a),
                  (s.$width = s.$width && !e ? s.$width : a),
                  s.$width > s.maxWidth && (s.$width = s.maxWidth),
                  s.$width < s.minWidth && (s.$width = s.minWidth)
              }
            }),
              (e.countColumns = function (t, e) {
                var n = 0,
                  o = 0,
                  r = 0,
                  s = !1,
                  i = 0,
                  a = !1
                return (
                  e.forEach(function (t) {
                    if (
                      ((n = Math.max(n, t.header.length)),
                      (r += t.$width),
                      t.footer && ((o = Math.max(o, t.footer.length)), (a = a || !0)),
                      !s)
                    )
                      for (var e = 0, i = t.header; e < i.length; e++)
                        if (i[e].colspan) return void (s = !0)
                  }),
                  e.forEach(function (t) {
                    if (t.header.length < n)
                      for (var e = 0; e < n; e++) t.header[e] = t.header[e] || { text: "" }
                    if ((a && (t.footer = t.footer || []), t.footer && t.footer.length < o))
                      for (e = 0; e < o; e++) t.footer[e] = t.footer[e] || { text: "" }
                    ;(t.header = t.header.map(function (t) {
                      return (
                        "object" != typeof t && (t = { text: t }),
                        (t.css = t.css || ""),
                        t.text || t.css.includes("dhx_cell-empty") || (t.css += " dhx_cell-empty"),
                        t
                      )
                    })),
                      "" === t.header[0].text && i++
                  }),
                  (t.$totalWidth = r),
                  (t.$headerLevel = n),
                  (t.$footerLevel = o),
                  (t.$colspans = s),
                  (t.$footer = a),
                  i
                )
              }),
              (e.calculatePositions = function (t, e, i, n, o) {
                for (
                  var r = n.columns || [],
                    s = r.length,
                    a = o || [],
                    l = a.length,
                    c = -1 / 0,
                    d = 0;
                  d < s;
                  d++
                )
                  r[d].$width > c && (c = r[d].$width)
                for (var u = 1 / 0, d = 0; d < s; d++) r[d].$width < u && (u = r[d].$width)
                for (var h = -1 / 0, d = 0; d < l; d++) a[d].$height > h && (h = a[d].$height)
                for (
                  var f = n.rowHeight,
                    o = Math.round(c / u),
                    f = Math.round(h / f),
                    p = n.$totalWidth / s,
                    t = Math.round(t / p),
                    _ = n.$totalHeight / l,
                    e = Math.round(e / _),
                    g = 0,
                    v = i.left,
                    m = 0;
                  m < r.length;
                  m++
                ) {
                  if (!(0 < (v -= r[m].$width) + p / 2)) break
                  g++
                }
                for (var y = 0, b = i.top, m = 0; m < a.length; m++) {
                  if (!(0 < (b -= a[m].$height) + _ / 2)) break
                  y++
                }
                return {
                  xStart: 0 <= g - o ? g - o : 0,
                  xEnd: g + t + o,
                  yStart: 0 <= y - f ? y - f : 0,
                  yEnd: y + e + f,
                }
              }),
              (e.getUnique = function (t, e, i) {
                var n = t.map(function (t) {
                  return t[e]
                })
                return (
                  i &&
                    n.forEach(function (t, e) {
                      t.includes(", ") &&
                        (t.split(", ").forEach(function (t) {
                          return n.push(t)
                        }),
                        delete n[e])
                    }),
                  n
                    .filter(function (t, e, i) {
                      return i.indexOf(t) === e && v.isDefined(t)
                    })
                    .sort()
                )
              }),
              (e.getMaxRowHeight = function (t, e, i) {
                void 0 === i && (i = { font: "20px Roboto", lineHeight: 20 })
                var n = document.createElement("canvas"),
                  o = n.getContext("2d", { alpha: !1 })
                o.font = i.font
                for (var r = {}, s = e.length, a = 0; a < s; a++)
                  e[a].template
                    ? (r[e[a].id] = {
                        width: e[a].$width || 0,
                        htmlEnable: e[a].$htmlEnable,
                        template: e[a].template,
                        cols: e[a],
                      })
                    : (r[e[a].id] = { width: e[a].$width || 0, htmlEnable: e[a].$htmlEnable })
                for (var l = [], c = [], d = 0, u = Object.entries(t); d < u.length; d++) {
                  var h,
                    f = u[d],
                    p = f[0],
                    _ = f[1]
                  !r[p] ||
                    "id" === p ||
                    "height" === p ||
                    p.startsWith("$") ||
                    ("string" != typeof _ && "number" != typeof _) ||
                    ((h = ""),
                    (h =
                      null !== (f = r[p]) && void 0 !== f && f.template
                        ? ((f = r[p].template(_, t, r[p].cols)),
                          r[p].htmlEnable ? b.removeHTMLTags(f) : f)
                        : "string" == typeof _
                        ? r[p].htmlEnable
                          ? b.removeHTMLTags(_)
                          : _
                        : _.toString()),
                    l.push(h.split("\n").length),
                    c.push(
                      Math.round(
                        o.measureText(h).width /
                          (null === (p = r[p]) || void 0 === p ? void 0 : p.width)
                      )
                    ))
                }
                var g = Math.max(v.getMaxArrayNymber(l), v.getMaxArrayNymber(c))
                return n.remove(), g * i.lineHeight
              }),
              (e.getCalculatedRowHeight = function (t, e) {
                void 0 === e && (e = { rowHeight: 40, padding: 8 })
                var i = e.rowHeight < 40 ? t : t + 2 * e.padding
                return t < e.rowHeight ? e.rowHeight : i
              }),
              (e.getTreeCellWidthOffset = function (t) {
                return 20 + 20 * t.$level - (t.$items ? 20 : 0)
              }),
              (e.getMaxColsWidth = function (t, e, i, n) {
                if ((void 0 === i && (i = { font: "normal 14.4px Arial" }), t.length && e.length)) {
                  var o = document.createElement("canvas"),
                    r = o.getContext("2d", { alpha: !1 })
                  r.font = i.font
                  for (var s = {}, a = e.length, l = 0; l < a; l++)
                    e[l].template && "data" === n
                      ? (s[e[l].id] = {
                          width: 20,
                          htmlEnable: e[l].$htmlEnable,
                          template: e[l].template,
                          cols: e[l],
                        })
                      : (s[e[l].id] = {
                          width: 20,
                          htmlEnable: e[l].$htmlEnable,
                          format: e[l].format,
                        })
                  for (var c = t.length, l = 0; l < c; l++)
                    for (var d = 0, u = Object.entries(t[l]); d < u.length; d++) {
                      var h,
                        f = u[d],
                        p = f[0],
                        _ = f[1]
                      s[p] &&
                        "id" !== p &&
                        "height" !== p &&
                        !p.startsWith("$") &&
                        ("string" == typeof _ || "number" == typeof _ || _ instanceof Date) &&
                        ((h = void 0),
                        (h =
                          "function" !=
                            typeof (null === (f = s[p]) || void 0 === f ? void 0 : f.template) ||
                          _ instanceof Date
                            ? _ instanceof Date
                              ? x.getFormattedDate(s[p].format || "%M %d %Y", _)
                              : s[p].htmlEnable
                              ? b.removeHTMLTags(_)
                              : _.toString()
                            : ((f = s[p].template(_, t[l], s[p].cols)),
                              s[p].htmlEnable ? b.removeHTMLTags(f) : f)),
                        (h = r.measureText(h).width) > s[p].width && (s[p].width = h))
                    }
                  o.remove()
                  for (var g = {}, v = 0, m = Object.entries(s); v < m.length; v++) {
                    var y = m[v],
                      p = y[0],
                      _ = y[1]
                    g[p] = Math.ceil(_.width)
                  }
                  return g
                }
              }),
              (e.toFormat = function (r, t, s) {
                if (!r && "number" != typeof r) return r
                switch (t) {
                  case "number":
                  case "percent":
                    return (
                      (s = s || "#"),
                      v.isDefined(r) && !isNaN(Number(r))
                        ? (function (t) {
                            r = r.toString()
                            var e = s
                              .replace(/#+/g, "#")
                              .split("#")
                              .filter(function (t) {
                                return t
                              })
                            r = "percent" === t ? (100 * Number(r)).toString() : r
                            var i = Math.trunc(Number(r)).toString(),
                              n = s.match(/0/g) && s.match(/0/g).length,
                              o = e.find(function (t) {
                                return !t.includes("0")
                              }),
                              o = o ? i.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1" + o) : i
                            return (
                              n &&
                                ((i = e
                                  .find(function (t) {
                                    return t.includes("0")
                                  })
                                  .replace(/0+/g, "")),
                                (e = r.split(".")[1] || "0"),
                                (e = Number("0." + e).toFixed(n)),
                                1 <= Number(e) && (o++).toString(),
                                (o += i + (e = e.toString().split(".")[1].padEnd(n, "0")))),
                              "percent" === t ? o + "%" : o
                            )
                          })(t)
                        : r
                    )
                  case "date":
                    return (
                      (s = s || "%M %d %Y"),
                      "string" == typeof r
                        ? (r = x.getFormattedDate(s, x.stringToDate(r, s)))
                        : "object" == typeof r && (r = x.getFormattedDate(s, r)),
                      r
                    )
                  default:
                    return r
                }
              })
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            e.default = {
              dragAndDrop: "Drag & drop",
              or: "or",
              grid: "Grid",
              list: "List",
              browse: "Browse files",
              filesOrFoldersHere: "files or folders here",
              cancel: "Cancel",
              clearAll: "Clear all",
              clearAllSelected: "Clear selected",
              clear: "Clear",
              add: "Add",
              upload: "Upload",
              download: "Download",
              error: "error",
              byte: "B",
              kilobyte: "KB",
              megabyte: "MB",
              gigabyte: "GB",
            }
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(29),
              i =
                ((o.prototype.updateUrl = function (t, e) {
                  for (var i in (void 0 === e && (e = {}),
                  (this._url = this.url = t || this._url),
                  (this.url += this.url.includes("?") ? "&" : "?"),
                  e))
                    (this.config[i] = e[i]), (this.url += i + "=" + encodeURIComponent(e[i]) + "&")
                  this.url = this.url.slice(0, -1)
                }),
                (o.prototype.load = function () {
                  return n.ajax.get(this.url, null, { responseType: "text" })
                }),
                (o.prototype.save = function (t, e) {
                  switch (e) {
                    case "delete":
                      return n.ajax.delete(this.url, t)
                    case "update":
                      return n.ajax.put(this.url, t)
                    case "insert":
                    default:
                      return n.ajax.post(this.url, t)
                  }
                }),
                o)
            function o(t, e) {
              ;(this.url = this._url = t), (this.config = e)
            }
            e.DataProxy = i
          },
          function (t, i, e) {
            "use strict"
            Object.defineProperty(i, "__esModule", { value: !0 })
            var s = e(1),
              o = e(0),
              v = e(2)
            i.scrollViewConfig = {
              enable: !1,
              autoHide: !0,
              timeout: 1e3,
              scrollHandler: function () {},
            }
            ;(n.prototype.enable = function () {
              ;(this.config.enable = !0), this._getRootView().redraw()
            }),
              (n.prototype.disable = function () {
                ;(this.config.enable = !1), this._getRootView().redraw()
              }),
              (n.prototype.render = function (t, e) {
                var i = this
                if (
                  (void 0 === e && (e = ""),
                  0 === this._scrollWidth || !this.config.enable || !t.length)
                )
                  return t
                e && (this._uid = e)
                var n = this.config.enable
                  ? [
                      o.el(
                        ".y-scroll",
                        (((n = {})[this._wheelName] = this._handlers[this._wheelName]),
                        (n._ref = e ? "scroll-y-area-" + e : "scroll-y-area"),
                        (n.onmousedown = this._handlers.onmousedownArea),
                        (n.onmouseenter = this._handlers.onmouseenter),
                        (n.onmouseleave = this._handlers.onmouseleave),
                        (n.style = {
                          width: "6px",
                          height: "100%",
                          right: 0,
                          top: 0,
                          position: "absolute",
                        }),
                        n),
                        [
                          o.el(".scroll-runner", {
                            _ref: e ? "scroll-y-runner-" + e : "scroll-y-runner",
                            onmousedown: this._handlers.onmousedownRunner,
                            style: { height: this._runnerHeight + "px", top: this._runnerYTop },
                          }),
                        ]
                      ),
                      o.el(
                        ".x-scroll",
                        (((n = {})[this._wheelName] = this._handlers[this._wheelName]),
                        (n._ref = e ? "scroll-x-area-" + e : "scroll-x-area"),
                        (n.onmousedown = this._handlers.onmousedownArea),
                        (n.onmouseenter = this._handlers.onmouseenter),
                        (n.onmouseleave = this._handlers.onmouseleave),
                        (n.style = {
                          width: "100%",
                          height: "6px",
                          left: 0,
                          bottom: 0,
                          position: "absolute",
                        }),
                        n),
                        [
                          o.el(".scroll-runner", {
                            _ref: e ? "scroll-x-runner-" + e : "scroll-x-runner",
                            onmousedown: this._handlers.onmousedownRunner,
                            style: { width: this._runnerWidth + "px", left: this._runnerXLeft },
                          }),
                        ]
                      ),
                    ]
                  : null
                return o.el(
                  ".scroll-view-wrapper",
                  [
                    o.el(
                      ".scroll-view",
                      {
                        onscroll: this._handlers.onscroll,
                        _ref: e ? "scroll-view-" + e : "scroll-view",
                        _hooks: {
                          didInsert: function () {
                            i.update()
                          },
                          didRecycle: function () {
                            i.update()
                          },
                        },
                        style: {
                          width: "calc(100% + " + this._scrollWidth + "px)",
                          height: "calc(100% + " + this._scrollHeight + "px)",
                        },
                      },
                      t
                    ),
                  ].concat(n)
                )
              }),
              (n.prototype.update = function () {
                var t,
                  e,
                  i,
                  n,
                  o,
                  r = this._getRefs()
                r &&
                  ((o = r.area),
                  (t = r.areaX),
                  (e = r.areaY),
                  (i = r.runnerY),
                  (n = r.runnerX),
                  (this._visibleYArea = o.clientHeight / o.scrollHeight),
                  (this._visibleXArea = o.clientWidth / o.scrollWidth),
                  (this._scrollYTop = o.scrollTop),
                  (this._scrollXLeft = o.scrollLeft),
                  (this._runnerYTop = this._scrollYTop * this._visibleYArea),
                  (this._runnerXLeft = this._scrollXLeft * this._visibleXArea),
                  (this._runnerHeight =
                    this._visibleYArea < 1 ? o.clientHeight * this._visibleYArea : 0),
                  (this._runnerWidth =
                    this._visibleXArea < 1 ? o.clientWidth * this._visibleXArea : 0),
                  (r = i.style.top),
                  (o = n.style.left),
                  (i.style.opacity = 1),
                  (i.style.top = this._runnerYTop + "px"),
                  (i.style.height = this._runnerHeight + "px"),
                  (n.style.opacity = 1),
                  (n.style.left = this._runnerXLeft + "px"),
                  (n.style.width = this._runnerWidth + "px"),
                  r !== i.style.top && ((e.style.opacity = 0.9), (e.style.width = "10px")),
                  o !== n.style.left && ((t.style.opacity = 0.9), (t.style.height = "10px")),
                  this.config.autoHide
                    ? this._autoHideFunc ||
                      (this._autoHideFunc = s.debounce(function () {
                        ;(i.style.opacity = 0),
                          (e.style.width = "6px"),
                          (n.style.opacity = 0),
                          (t.style.height = "6px")
                      }, this.config.timeout))
                    : (this._autoHideFunc = s.debounce(function () {
                        ;(e.style.width = "6px"), (t.style.height = "6px")
                      }, this.config.timeout)),
                  this._autoHideFunc())
              }),
              (n.prototype._getRefs = function () {
                var t = this._getRootView(),
                  e = !(
                    !t.refs["scroll-view"] ||
                    (!t.refs["scroll-x-runner"] && !t.refs["scroll-y-runner"])
                  ),
                  i = !(
                    !this._uid ||
                    !t.refs["scroll-view-" + this._uid] ||
                    (!t.refs["scroll-x-runner-" + this._uid] &&
                      !t.refs["scroll-y-runner-" + this._uid])
                  )
                if (t.refs)
                  return e
                    ? {
                        area: t.refs["scroll-view"].el,
                        areaY: t.refs["scroll-y-area"].el,
                        areaX: t.refs["scroll-x-area"].el,
                        runnerY: t.refs["scroll-y-runner"].el,
                        runnerX: t.refs["scroll-x-runner"].el,
                      }
                    : i
                    ? {
                        area: t.refs["scroll-view-" + this._uid].el,
                        areaY: t.refs["scroll-y-area-" + this._uid].el,
                        areaX: t.refs["scroll-x-area-" + this._uid].el,
                        runnerY: t.refs["scroll-y-runner-" + this._uid].el,
                        runnerX: t.refs["scroll-x-runner-" + this._uid].el,
                      }
                    : void 0
              }),
              (e = n)
            function n(t, e) {
              var g = this
              void 0 === e && (e = {}),
                (this.config = s.extend(
                  {
                    enable: i.scrollViewConfig.enable,
                    autoHide: i.scrollViewConfig.autoHide,
                    timeout: i.scrollViewConfig.timeout,
                    scrollHandler: i.scrollViewConfig.scrollHandler,
                  },
                  e
                )),
                (this._wheelName = v.isIE() ? "onmousewheel" : "onwheel"),
                (this._getRootView = t),
                (this._scrollYTop =
                  this._scrollXLeft =
                  this._runnerYTop =
                  this._runnerXLeft =
                  this._runnerHeight =
                  this._runnerWidth =
                    0),
                (this._visibleYArea = this._visibleXArea = 1),
                (this._scrollWidth = v.getScrollbarWidth()),
                (this._scrollHeight = v.getScrollbarHeight()),
                (this._handlers =
                  (((t = {
                    onscroll: function (t) {
                      g.config.scrollHandler(t), g.update()
                    },
                  })[this._wheelName] = function (t) {
                    var e = !!v.locateNodeByClassName(t.target, "y-scroll")
                    t.preventDefault()
                    var i,
                      n = 40 * (0 < (t.deltaY || -t.wheelDelta) ? 1 : -1),
                      t = g._getRefs().area
                    e
                      ? ((e = t.scrollHeight - g._runnerHeight),
                        (i = g._scrollYTop + n),
                        (t.scrollTop = i < 0 ? 0 : e < i ? e : i))
                      : ((i = t.scrollWidth - g._runnerWidth),
                        (n = g._scrollXLeft + n),
                        (t.scrollLeft = n < 0 ? 0 : i < n ? i : n)),
                      g.update()
                  }),
                  (t.onmousedownRunner = function (t) {
                    t.preventDefault()
                    function e(t) {
                      var e
                      i
                        ? ((e = t.pageY - d),
                          (o.scrollTop = e <= a ? 0 : l < e ? c : (e - a) / g._visibleYArea))
                        : ((t = t.pageX - p),
                          (o.scrollLeft = t <= u ? 0 : h < t ? f : (t - u) / g._visibleXArea)),
                        g.update()
                    }
                    var i = !!v.locateNodeByClassName(t.target, "y-scroll"),
                      n = g._getRefs(),
                      o = n.area,
                      r = n.runnerY,
                      s = n.runnerX,
                      n = o.getBoundingClientRect(),
                      a = n.top + window.pageYOffset,
                      l = n.bottom + window.pageYOffset,
                      c = o.scrollHeight - g._runnerHeight,
                      d = t.pageY - r.getBoundingClientRect().top - window.pageYOffset,
                      u = n.left + window.pageXOffset,
                      h = n.right + window.pageXOffset,
                      f = o.scrollWidth - g._runnerWidth,
                      p = t.pageX - s.getBoundingClientRect().left - window.pageXOffset,
                      _ = function () {
                        document.removeEventListener("mousemove", e),
                          document.removeEventListener("mouseup", _),
                          document.body.classList.remove("dhx-no-select")
                      }
                    document.body.classList.add("dhx-no-select"),
                      document.addEventListener("mousemove", e),
                      document.addEventListener("mouseup", _)
                  }),
                  (t.onmousedownArea = function (t) {
                    var e, i, n, o
                    v.locateNodeByClassName(t, "scroll-runner") ||
                      (t.preventDefault(),
                      (e = !!v.locateNodeByClassName(t.target, "y-scroll")),
                      (i = (o = g._getRefs()).area),
                      (n = o.runnerY),
                      (o = o.runnerX),
                      e
                        ? (i.scrollTop +=
                            (t.pageY - n.getBoundingClientRect().top) / g._visibleYArea)
                        : (i.scrollLeft +=
                            (t.pageX - o.getBoundingClientRect().left) / g._visibleXArea),
                      g.update())
                  }),
                  (t.onmouseenter = function (t) {
                    var e, i
                    v.locateNodeByClassName(t, "scroll-runner") ||
                      ((i = g._getRefs()) &&
                        ((e = !!v.locateNodeByClassName(t.target, "y-scroll")),
                        (t = i.areaX),
                        (i = i.areaY),
                        e && 0 < g._runnerHeight
                          ? (i.style.background = "#eee")
                          : !e && 0 < g._runnerWidth && (t.style.background = "#eee")))
                  }),
                  (t.onmouseleave = function (t) {
                    var e, i
                    v.locateNodeByClassName(t, "scroll-runner") ||
                      ((i = g._getRefs()) &&
                        ((e = !!v.locateNodeByClassName(t.target, "y-scroll")),
                        (t = i.areaX),
                        (i = i.areaY),
                        e && 0 < g._runnerHeight
                          ? (i.style.background = "transparent")
                          : !e && 0 < g._runnerWidth && (t.style.background = "transparent")))
                  }),
                  t))
            }
            i.ScrollView = e
          },
          function (t, e, i) {
            "use strict"
            var o =
              (this && this.__assign) ||
              function () {
                return (o =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r = i(0),
              u = i(1)
            ;(e.getCount = function (t, e, i) {
              var n =
                {
                  danger: " dhx_navbar-count--color_danger",
                  secondary: " dhx_navbar-count--color_secondary",
                  primary: " dhx_navbar-count--color_primary",
                  success: " dhx_navbar-count--color_success",
                }[t.countColor] || " dhx_navbar-count--color_danger"
              return r.el(
                ".dhx_navbar-count",
                {
                  class:
                    e +
                    n +
                    (!i && 99 < parseInt(t.count, 10) ? " dhx_navbar-count--overlimit" : ""),
                },
                i && 99 < parseInt(t.count, 10) ? "99+" : t.count
              )
            }),
              (e.getIcon = function (t, e) {
                return (
                  void 0 === t && (t = ""),
                  t.startsWith("dxi") && (t = "dxi " + t),
                  r.el("span", { class: "dhx_" + e + "__icon " + t, "aria-hidden": "true" })
                )
              })
            var s = function (t, e, i) {
              var n = "",
                o = "",
                o = (n = i ? "dhx_menu-item" : "dhx_" + t + "__item") + (e.css ? " " + e.css : "")
              return (
                ("spacer" !== e.type && "separator" !== e.type) || (o += " " + n + "--" + e.type),
                "button" !== e.type ||
                  "sidebar" !== t ||
                  e.icon ||
                  (o += " dhx_navbar-item--colapse_hidden"),
                o
              )
            }
            ;(e.navbarComponentMixin = function (t, e, i, n) {
              var i = s(t, e, i),
                t = "ribbon" === t && ("navItem" === e.type || "imageButton" === e.type)
              return r.el(
                "li",
                o(
                  {
                    _key: e.id,
                    class:
                      i +
                      (e.icon && !e.value && t ? " dhx_ribbon__item--icon" : "") +
                      (e.src && !e.value && t ? " dhx_ribbon__item--icon" : "") +
                      (e.size && t ? " dhx_ribbon__item--" + e.size : ""),
                    ".innerHTML": "customHTML" === e.type ? e.html : void 0,
                    dhx_id: "customHTML" === e.type ? e.id : void 0,
                  },
                  ((i = e.type),
                  (t = { role: "none" }),
                  "separator" === i &&
                    ((t.role = "separator"), (t["aria-orientation"] = "vertical")),
                  t)
                ),
                "customHTML" !== e.type ? [n] : void 0
              )
            }),
              (e.getNavbarButtonCSS = function (t, e) {
                var i = t.color,
                  n = t.size,
                  o = t.view,
                  r = t.full,
                  s = t.icon,
                  a = t.circle,
                  l = t.loading,
                  c = t.value,
                  d = t.active,
                  t = t.count
                return (
                  ({
                    danger: " dhx_button--color_danger",
                    secondary: " dhx_button--color_secondary",
                    primary: " dhx_button--color_primary",
                    success: " dhx_button--color_success",
                  }[i] || " dhx_button--color_primary") +
                  ({ small: " dhx_button--size_small", medium: " dhx_button--size_medium" }[n] ||
                    " dhx_button--size_medium") +
                  ({ flat: " dhx_button--view_flat", link: " dhx_button--view_link" }[o] ||
                    " dhx_button--view_flat") +
                  (r ? " dhx_button--width_full" : "") +
                  (a ? " dhx_button--circle" : "") +
                  (l ? " dhx_button--loading" : "") +
                  (d ? " dhx_button--active" : "") +
                  (s && !c ? " dhx_button--icon" : "") +
                  (u.isDefined(t) ? " dhx_button--count" : "")
                )
              })
          },
          function (t, e, i) {
            "use strict"
            var n
            Object.defineProperty(e, "__esModule", { value: !0 }),
              ((n = e.UploaderEvents || (e.UploaderEvents = {})).uploadBegin = "uploadbegin"),
              (n.beforeUploadFile = "beforeuploadfile"),
              (n.uploadFile = "uploadfile"),
              (n.uploadFail = "uploadfail"),
              (n.uploadComplete = "uploadcomplete"),
              (n.uploadProgress = "uploadprogress"),
              ((e.ProgressBarEvents || (e.ProgressBarEvents = {})).cancel = "cancel"),
              ((n = e.FileStatus || (e.FileStatus = {})).queue = "queue"),
              (n.uploaded = "uploaded"),
              (n.failed = "failed"),
              (n.inprogress = "inprogress"),
              ((e = e.VaultMode || (e.VaultMode = {})).grid = "grid"),
              (e.list = "list")
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r = i(19),
              s = i(2)
            function a(t) {
              for (var e = t.toLowerCase().match(/\w+/g), i = 0, n = "", o = 0; o < e.length; o++) {
                var r = e[o]
                "ctrl" === r
                  ? (i += 4)
                  : "shift" === r
                  ? (i += 2)
                  : "alt" === r
                  ? (i += 1)
                  : (n = r)
              }
              return i + n
            }
            var l = {
                Up: "arrowUp",
                Down: "arrowDown",
                Right: "arrowRight",
                Left: "arrowLeft",
                Esc: "escape",
                Spacebar: "space",
              },
              i =
                ((n.prototype.destructor = function () {
                  document.removeEventListener("keydown", this._initHandler), this.removeHotKey()
                }),
                (n.prototype.addHotKey = function (t, e) {
                  t = a(t)
                  this._keysStorage[t] || (this._keysStorage[t] = []),
                    this._keysStorage[t].push({ handler: e })
                }),
                (n.prototype.removeHotKey = function (t, i) {
                  var n,
                    o,
                    r = this
                  t
                    ? t && i
                      ? ((n = a(t)),
                        (o = function (t) {
                          return t.toString().replace(/\n/g, "").replace(/\s/g, "")
                        }),
                        this._keysStorage[n].forEach(function (t, e) {
                          o(t.handler) === o(i) &&
                            (delete r._keysStorage[n][e],
                            (r._keysStorage[n] = r._keysStorage[n].filter(function (t) {
                              return t
                            })))
                        }))
                      : ((t = a(t)), delete this._keysStorage[t])
                    : (this._keysStorage = {})
                }),
                (n.prototype.exist = function (t) {
                  t = a(t)
                  return !!this._keysStorage[t]
                }),
                n)
            function n(t) {
              var o = this
              ;(this._keysStorage = {}),
                (this._initHandler = function (t) {
                  var e
                  e =
                    (48 <= t.which && t.which <= 57) || (65 <= t.which && t.which <= 90)
                      ? String.fromCharCode(t.which)
                      : ((e = 32 === t.which ? t.code : t.key), (s.isIE() && l[e]) || e)
                  var i =
                    o._keysStorage[
                      (t.ctrlKey || t.metaKey ? 4 : 0) +
                        (t.shiftKey ? 2 : 0) +
                        (t.altKey ? 1 : 0) +
                        (e && e.toLowerCase())
                    ]
                  if (i)
                    for (var n = 0; n < i.length; n++) {
                      if (o._beforeCall && !1 === o._beforeCall(t, r.focusManager.getFocusId()))
                        return
                      i[n].handler(t)
                    }
                }),
                t && (this._beforeCall = t),
                document.addEventListener("keydown", this._initHandler)
            }
            e.KeyManager = i
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(2),
              i =
                ((o.prototype.getFocusId = function () {
                  return this._activeWidgetId
                }),
                (o.prototype.setFocusId = function (t) {
                  this._activeWidgetId = t
                }),
                o)
            function o() {
              var e = this
              ;(this._initHandler = function (t) {
                return (e._activeWidgetId = n.locate(t, "dhx_widget_id"))
              }),
                (this._removeFocusClass = function (t) {
                  var e = document.body.classList
                  e.contains("utilityfocus") && e.remove("utilityfocus")
                }),
                (this._addFocusClass = function (t) {
                  var e = document.body.classList
                  "Tab" === t.code
                    ? e.contains("utilityfocus") || e.add("utilityfocus")
                    : e.contains("utilityfocus") && e.remove("utilityfocus")
                }),
                document.addEventListener("focusin", this._initHandler),
                document.addEventListener("click", this._initHandler),
                document.addEventListener("mousedown", this._removeFocusClass),
                document.addEventListener("keydown", this._addFocusClass)
            }
            e.focusManager = new i()
          },
          function (t, n, e) {
            "use strict"
            Object.defineProperty(n, "__esModule", { value: !0 })
            var i = e(1),
              o = e(1)
            n.locale = {
              monthsShort: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              days: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Monday",
              ],
              cancel: "Cancel",
            }
            var v,
              r = {
                "%d": function (t) {
                  t = t.getDate()
                  return t < 10 ? "0" + t : t
                },
                "%j": function (t) {
                  return t.getDate()
                },
                "%l": function (t) {
                  return n.locale.days[t.getDay()]
                },
                "%D": function (t) {
                  return n.locale.daysShort[t.getDay()]
                },
                "%m": function (t) {
                  t = t.getMonth() + 1
                  return t < 10 ? "0" + t : t
                },
                "%n": function (t) {
                  return t.getMonth() + 1
                },
                "%M": function (t) {
                  return n.locale.monthsShort[t.getMonth()]
                },
                "%F": function (t) {
                  return n.locale.months[t.getMonth()]
                },
                "%y": function (t) {
                  return t.getFullYear().toString().slice(2)
                },
                "%Y": function (t) {
                  return t.getFullYear()
                },
                "%h": function (t) {
                  t = t.getHours() % 12
                  return 0 === t && (t = 12), t < 10 ? "0" + t : t
                },
                "%g": function (t) {
                  t = t.getHours() % 12
                  return 0 === t && (t = 12), t
                },
                "%H": function (t) {
                  t = t.getHours()
                  return t < 10 ? "0" + t : t
                },
                "%G": function (t) {
                  return t.getHours()
                },
                "%i": function (t) {
                  t = t.getMinutes()
                  return t < 10 ? "0" + t : t
                },
                "%s": function (t) {
                  t = t.getSeconds()
                  return t < 10 ? "0" + t : t
                },
                "%a": function (t) {
                  return 12 <= t.getHours() ? "pm" : "am"
                },
                "%A": function (t) {
                  return 12 <= t.getHours() ? "PM" : "AM"
                },
                "%u": function (t) {
                  return t.getMilliseconds()
                },
              },
              m = {
                "%d": function (t, e) {
                  ;/(^([0-9][0-9])$)/i.test(e) ? t.setDate(Number(e)) : t.setDate(Number(1))
                },
                "%j": function (t, e) {
                  ;/(^([0-9]?[0-9])$)/i.test(e) ? t.setDate(Number(e)) : t.setDate(Number(1))
                },
                "%m": function (t, e) {
                  var i = /(^([0-9][0-9])$)/i.test(e)
                  i ? t.setMonth(Number(e) - 1) : t.setMonth(Number(0)),
                    i && t.getMonth() !== Number(e) - 1 && t.setMonth(Number(e) - 1)
                },
                "%n": function (t, e) {
                  var i = /(^([0-9]?[0-9])$)/i.test(e)
                  i ? t.setMonth(Number(e) - 1) : t.setMonth(Number(0)),
                    i && t.getMonth() !== Number(e) - 1 && t.setMonth(Number(e) - 1)
                },
                "%M": function (t, e) {
                  var i = o.findIndex(n.locale.monthsShort, function (t) {
                    return t === e
                  })
                  ;-1 === i ? t.setMonth(0) : t.setMonth(i),
                    -1 !== i && t.getMonth() !== i && t.setMonth(i)
                },
                "%F": function (t, e) {
                  var i = o.findIndex(n.locale.months, function (t) {
                    return t === e
                  })
                  ;-1 === i ? t.setMonth(0) : t.setMonth(i),
                    -1 !== i && t.getMonth() !== i && t.setMonth(i)
                },
                "%y": function (t, e) {
                  ;/(^([0-9][0-9])$)/i.test(e)
                    ? t.setFullYear(Number("20" + e))
                    : t.setFullYear(Number("2000"))
                },
                "%Y": function (t, e) {
                  ;/(^([0-9][0-9][0-9][0-9])$)/i.test(e)
                    ? t.setFullYear(Number(e))
                    : t.setFullYear(Number("2000"))
                },
                "%h": function (t, e, i) {
                  ;(/(^0[1-9]|1[0-2]$)/i.test(e) && "pm" === i) || "PM" === i
                    ? t.setHours(Number(e))
                    : t.setHours(Number(0))
                },
                "%g": function (t, e, i) {
                  ;(/(^[1-9]$)|(^0[1-9]|1[0-2]$)/i.test(e) && "pm" === i) || "PM" === i
                    ? t.setHours(Number(e))
                    : t.setHours(Number(0))
                },
                "%H": function (t, e) {
                  ;/(^[0-2][0-9]$)/i.test(e) ? t.setHours(Number(e)) : t.setHours(Number(0))
                },
                "%G": function (t, e) {
                  ;/(^[1-9][0-9]?$)/i.test(e) ? t.setHours(Number(e)) : t.setHours(Number(0))
                },
                "%i": function (t, e) {
                  ;/(^([0-5][0-9])$)/i.test(e) ? t.setMinutes(Number(e)) : t.setMinutes(Number(0))
                },
                "%s": function (t, e) {
                  ;/(^([0-5][0-9])$)/i.test(e) ? t.setSeconds(Number(e)) : t.setSeconds(Number(0))
                },
                "%a": function (t, e) {
                  "pm" === e && t.setHours(t.getHours() + 12)
                },
                "%A": function (t, e) {
                  "PM" === e && t.setHours(t.getHours() + 12)
                },
              }
            function y(t) {
              for (var e = [], i = "", n = 0; n < t.length; n++)
                "%" === t[n]
                  ? (0 < i.length && (e.push({ type: v.separator, value: i }), (i = "")),
                    e.push({ type: v.datePart, value: t[n] + t[n + 1] }),
                    n++)
                  : (i += t[n])
              return 0 < i.length && e.push({ type: v.separator, value: i }), e
            }
            function s(t, e, i) {
              if ("string" == typeof t) {
                for (var n, o = [], r = 0, s = null, a = 0, l = y(e); a < l.length; a++) {
                  var c = l[a]
                  if (c.type === v.separator) {
                    var d = t.indexOf(c.value, r)
                    if (-1 === d) {
                      if (i) return !1
                      throw new Error(
                        "Incorrect date, see docs: https://docs.dhtmlx.com/suite/calendar__api__calendar_dateformat_config.html"
                      )
                    }
                    s && (o.push({ formatter: s, value: t.slice(r, d) }), (s = null)),
                      (r = d + c.value.length)
                  } else c.type === v.datePart && (s = c.value)
                }
                "%A" === s || "%a" === s
                  ? o.unshift({ formatter: s, value: t.slice(r) })
                  : s && o.push({ formatter: s, value: t.slice(r) }),
                  o.reverse()
                for (var u = 0, h = o; u < h.length; u++)
                  ("%A" !== (g = h[u]).formatter && "%a" !== g.formatter) || (n = g.value)
                for (var f = new Date(0), p = 0, _ = o; p < _.length; p++) {
                  var g = _[p]
                  m[g.formatter] && m[g.formatter](f, g.value, n)
                }
                return !!i || f
              }
            }
            ;((e = v = v || {})[(e.separator = 0)] = "separator"),
              (e[(e.datePart = 1)] = "datePart"),
              (n.getFormattedDate = function (t, i) {
                return y(t).reduce(function (t, e) {
                  return e.type === v.separator ? t + e.value : r[e.value] ? t + r[e.value](i) : t
                }, "")
              }),
              (n.stringToDate = s)
            ;(a.copy = function (t) {
              return new Date(t)
            }),
              (a.fromYear = function (t) {
                return new Date(t, 0, 1)
              }),
              (a.fromYearAndMonth = function (t, e) {
                return new Date(t, e, 1)
              }),
              (a.weekStart = function (t, e) {
                e = (t.getDay() + 7 - e) % 7
                return new Date(t.getFullYear(), t.getMonth(), t.getDate() - e)
              }),
              (a.monthStart = function (t) {
                return new Date(t.getFullYear(), t.getMonth(), 1)
              }),
              (a.yearStart = function (t) {
                return new Date(t.getFullYear(), 0, 1)
              }),
              (a.dayStart = function (t) {
                return new Date(t.getFullYear(), t.getMonth(), t.getDate())
              }),
              (a.addDay = function (t, e) {
                return (
                  void 0 === e && (e = 1), new Date(t.getFullYear(), t.getMonth(), t.getDate() + e)
                )
              }),
              (a.addMonth = function (t, e) {
                return void 0 === e && (e = 1), new Date(t.getFullYear(), t.getMonth() + e)
              }),
              (a.addYear = function (t, e) {
                return void 0 === e && (e = 1), new Date(t.getFullYear() + e, t.getMonth())
              }),
              (a.withHoursAndMinutes = function (t, e, i, n) {
                return void 0 === n || (!n && 12 === e) || (n && 12 !== e)
                  ? new Date(t.getFullYear(), t.getMonth(), t.getDate(), e, i)
                  : n && 12 === e
                  ? new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, i)
                  : new Date(t.getFullYear(), t.getMonth(), t.getDate(), e + 12, i)
              }),
              (a.setMonth = function (t, e) {
                t.setMonth(e)
              }),
              (a.setYear = function (t, e) {
                t.setFullYear(e)
              }),
              (a.mergeHoursAndMinutes = function (t, e) {
                return new Date(
                  t.getFullYear(),
                  t.getMonth(),
                  t.getDate(),
                  e.getHours(),
                  e.getMinutes()
                )
              }),
              (a.isWeekEnd = function (t) {
                return 0 === t.getDay() || 6 === t.getDay()
              }),
              (a.getTwelweYears = function (t) {
                ;(t = t.getFullYear()), (t -= t % 12)
                return i.range(t, 11 + t)
              }),
              (a.getWeekNumber = function (t) {
                6 !== t.getDay() && (t = a.addDay(t, 6 - t.getDay()))
                var e = (t.valueOf() - a.yearStart(t).valueOf()) / 864e5
                return Math.floor((e - t.getDay() + 10) / 7)
              }),
              (a.isSameDay = function (t, e) {
                return (
                  t.getFullYear() === e.getFullYear() &&
                  t.getMonth() === e.getMonth() &&
                  t.getDate() === e.getDate()
                )
              }),
              (a.toDateObject = function (t, e) {
                return "string" == typeof t ? s(t, e) : new Date(t)
              }),
              (a.nullTimestampDate = new Date(0)),
              (e = a)
            function a() {}
            n.DateHelper = e
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              (e.getWidth = function (t, n, o) {
                return (
                  (t = t.filter(function (t) {
                    return !t.hidden
                  })),
                  n
                    ? t.reduce(function (t, e, i) {
                        e = e.$width
                        return (t += o <= i && i < o + n ? e : 0)
                      }, 0)
                    : t[o].$width
                )
              }),
              (e.getHeight = function (t, n, o) {
                return (
                  (t = t.filter(function (t) {
                    return !t.hidden
                  })),
                  n
                    ? t.reduce(function (t, e, i) {
                        e = e.$height
                        return (t += o <= i && i < o + n ? e : 0)
                      }, 0)
                    : t[o].$height
                )
              })
          },
          function (t, i, e) {
            "use strict"
            function n(t) {
              for (var e in t) i.hasOwnProperty(e) || (i[e] = t[e])
            }
            Object.defineProperty(i, "__esModule", { value: !0 }), n(e(44)), n(e(98)), n(e(31))
          },
          function (t, i, e) {
            "use strict"
            function n(t) {
              for (var e in t) i.hasOwnProperty(e) || (i[e] = t[e])
            }
            Object.defineProperty(i, "__esModule", { value: !0 }), n(e(102)), n(e(46))
          },
          function (t, i, e) {
            "use strict"
            function n(t) {
              for (var e in t) i.hasOwnProperty(e) || (i[e] = t[e])
            }
            Object.defineProperty(i, "__esModule", { value: !0 }),
              n(e(52)),
              n(e(111)),
              n(e(53)),
              n(e(32))
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              ((e = e.SelectionEvents || (e.SelectionEvents = {})).beforeUnSelect =
                "beforeunselect"),
              (e.afterUnSelect = "afterunselect"),
              (e.beforeSelect = "beforeselect"),
              (e.afterSelect = "afterselect")
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            i = i(4)
            ;(e.DataEvents = i.DataEvents),
              ((e = e.NavigationBarEvents || (e.NavigationBarEvents = {})).inputCreated =
                "inputCreated"),
              (e.click = "click"),
              (e.openMenu = "openMenu"),
              (e.beforeHide = "beforeHide"),
              (e.afterHide = "afterHide"),
              (e.inputFocus = "inputFocus"),
              (e.inputBlur = "inputBlur"),
              (e.inputChange = "inputChange")
          },
          function (t, e, i) {
            "use strict"
            var n
            Object.defineProperty(e, "__esModule", { value: !0 }),
              ((n = e.RealPosition || (e.RealPosition = {})).left = "left"),
              (n.right = "right"),
              (n.top = "top"),
              (n.bottom = "bottom"),
              (n.center = "center"),
              ((n = e.Position || (e.Position = {})).right = "right"),
              (n.bottom = "bottom"),
              (n.center = "center"),
              ((e = e.MessageContainerPosition || (e.MessageContainerPosition = {})).topLeft =
                "top-left"),
              (e.topRight = "top-right"),
              (e.bottomLeft = "bottom-left"),
              (e.bottomRight = "bottom-right")
          },
          function (t, e) {
            "use strict"
            var i =
                "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                  ? function (t) {
                      return typeof t
                    }
                  : function (t) {
                      return t &&
                        "function" == typeof Symbol &&
                        t.constructor === Symbol &&
                        t !== Symbol.prototype
                        ? "symbol"
                        : typeof t
                    },
              n = (function () {
                return this
              })()
            try {
              n = n || new Function("return this")()
            } catch (t) {
              "object" === ("undefined" == typeof window ? "undefined" : i(window)) && (n = window)
            }
            t.exports = n
          },
          function (t, e, i) {
            "use strict"
            ;(function (c) {
              Object.defineProperty(e, "__esModule", { value: !0 })
              var d = i(10),
                u = i(11)
              function h(t) {
                return t
                  ? t.includes("json")
                    ? "json"
                    : t.includes("xml")
                    ? "xml"
                    : "text"
                  : "text"
              }
              function n(o, r, s, t, a) {
                var n,
                  l = t || {}
                return (
                  a && (l.Accept = "application/" + a),
                  "GET" !== s && (l["Content-Type"] = l["Content-Type"] || "application/json"),
                  "GET" === s &&
                    ((t =
                      r && "object" == typeof r
                        ? ((n = r),
                          Object.keys(n)
                            .reduce(function (t, e) {
                              var i = "object" == typeof n[e] ? JSON.stringify(n[e]) : n[e]
                              return t.push(e + "=" + encodeURIComponent(i)), t
                            }, [])
                            .join("&"))
                        : r && "string" == typeof r
                        ? r
                        : "") && ((o += o.includes("?") ? "&" : "?"), (o += t)),
                    (r = null)),
                  window.fetch
                    ? window
                        .fetch(o, { method: s, body: r ? JSON.stringify(r) : null, headers: l })
                        .then(function (e) {
                          if (!e.ok)
                            return e.text().then(function (t) {
                              return c.reject({
                                status: e.status,
                                statusText: e.statusText,
                                message: t,
                              })
                            })
                          var t = a || h(e.headers.get("Content-Type"))
                          if ("raw" === t)
                            return {
                              headers: Object.fromEntries(e.headers.entries()),
                              url: e.url,
                              body: e.body,
                            }
                          if (204 !== e.status)
                            switch (t) {
                              case "json":
                                return e.json()
                              case "xml":
                                var i = u.toDataDriver(d.DataDriver.xml)
                                return i
                                  ? e.text().then(function (t) {
                                      return i.toJsonObject(t)
                                    })
                                  : e.text()
                              default:
                                return e.text()
                            }
                        })
                    : new c(function (t, e) {
                        var i,
                          n = new XMLHttpRequest()
                        for (i in ((n.onload = function () {
                          200 <= n.status && n.status < 300
                            ? ("raw" === a &&
                                t({
                                  url: n.responseURL,
                                  headers: n
                                    .getAllResponseHeaders()
                                    .trim()
                                    .split(/[\r\n]+/)
                                    .reduce(function (t, e) {
                                      e = e.split(": ")
                                      return (t[e[0]] = e[1]), t
                                    }, {}),
                                  body: n.response,
                                }),
                              204 === n.status
                                ? t()
                                : t(
                                    (function (t, e) {
                                      switch (e) {
                                        case "json":
                                          return JSON.parse(t)
                                        case "text":
                                          return t
                                        case "xml":
                                          var i = u.toDataDriver(d.DataDriver.xml)
                                          return i
                                            ? i.toJsonObject(t)
                                            : { parseError: "Incorrect data driver type: 'xml'" }
                                        default:
                                          return t
                                      }
                                    })(n.responseText, a || h(n.getResponseHeader("Content-Type")))
                                  ))
                            : e({ status: n.status, statusText: n.statusText })
                        }),
                        (n.onerror = function () {
                          e({ status: n.status, statusText: n.statusText, message: n.responseText })
                        }),
                        n.open(s, o),
                        l))
                          n.setRequestHeader(i, l[i])
                        switch (s) {
                          case "POST":
                          case "DELETE":
                          case "PUT":
                            n.send(void 0 !== r ? JSON.stringify(r) : "")
                            break
                          case "GET":
                          default:
                            n.send()
                        }
                      })
                )
              }
              e.ajax = {
                get: function (t, e, i) {
                  return n(t, e, "GET", i && i.headers, void 0 !== i ? i.responseType : void 0)
                },
                post: function (t, e, i) {
                  return n(t, e, "POST", i && i.headers, void 0 !== i ? i.responseType : void 0)
                },
                put: function (t, e, i) {
                  return n(t, e, "PUT", i && i.headers, void 0 !== i ? i.responseType : void 0)
                },
                delete: function (t, e, i) {
                  return n(t, e, "DELETE", i && i.headers, void 0 !== i ? i.responseType : void 0)
                },
              }
            }.call(this, i(9)))
          },
          function (t, e, i) {
            "use strict"
            var k =
              (this && this.__assign) ||
              function () {
                return (k =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var S = i(1),
              D = i(0),
              O = i(21),
              v = i(7),
              n = i(3),
              m = i(90),
              d = i(2),
              y = i(12)
            function o(t, e, i, n, o) {
              e = d.locateNodeByClassName(o.target, "dhx_grid-fixed-cols-wrap") ? 0 : e
              var r,
                s,
                a,
                l = d.locateNodeByClassName(o.target, "dhx_grid-cell"),
                c = d.locateNodeByClassName(o.target, "dhx_span-cell")
              ;(l || c) &&
                n &&
                ((r = (a = l ? l.parentNode : c).parentNode),
                (s = l
                  ? Array.prototype.indexOf.call(a.childNodes, l)
                  : i.columns.findIndex(function (t) {
                      return t.id === c.getAttribute("dhx_col_id")
                    })),
                (s = i.columns.filter(function (t) {
                  return !t.hidden
                })[e + s]),
                (a = l
                  ? Array.prototype.indexOf.call(r.childNodes, a)
                  : Number(c.getAttribute("dhx_id")) - 1),
                (a = i.data["" + ((l ? t : 0) + a)]),
                (n.toLocaleLowerCase().includes("touch") ? i._events : i.events).fire(n, [a, s, o]))
            }
            function M(t, e, i) {
              return {
                onclick: [o, t, e, i, n.GridEvents.cellClick],
                onmouseover: [o, t, e, i, n.GridEvents.cellMouseOver],
                onmousedown: [o, t, e, i, n.GridEvents.cellMouseDown],
                ondblclick: [o, t, e, i, n.GridEvents.cellDblClick],
                oncontextmenu: [o, t, e, i, n.GridEvents.cellRightClick],
                ontouchstart: [o, t, e, i, n.GridEvents.cellMouseDown],
                ontouchmove: [o, t, e, i, n.GridSystemEvents.cellTouchMove],
                ontouchend: [o, t, e, i, n.GridSystemEvents.cellTouchEnd],
              }
            }
            function b(t, e, i, n) {
              var o = n.$editable && n.$editable.row === e.id && n.$editable.col === i.id,
                r = "",
                s = i.align ? " dhx_align-" + i.align : "dhx_align-left"
              n.dragMode &&
                "row" === n.dragItem &&
                (r +=
                  (e.$drophere && !o ? " dhx_grid-cell--drophere" : "") +
                  (e.$dragtarget && !o ? " dhx_grid-cell--dragtarget" : "") +
                  (o ? "" : " dhx_grid-cell--drag"))
              var a = y.getTreeCellWidthOffset(e)
              return D.el(
                ".dhx_grid-cell",
                k(
                  {
                    class:
                      "dhx_tree-cell " +
                      (i.$cellCss[e.id] || "") +
                      " " +
                      (e.$items ? "dhx_grid-expand-cell" : "") +
                      " " +
                      (o ? "dhx_tree-editing-cell" : "") +
                      " " +
                      r +
                      s,
                    style: {
                      width: i.$width,
                      height: e.$height,
                      padding: e.$items ? 0 : "0 0 0 " + a + "px",
                    },
                    dhx_col_id: i.id,
                  },
                  { role: "gridcell", "aria-colindex": 1 }
                ),
                [
                  e.$items
                    ? D.el(
                        ".dhx_grid-expand-cell-icon",
                        k(
                          k(
                            {
                              class: e.$opened ? "dxi dxi-chevron-up" : "dxi dxi-chevron-down",
                              dhx_id: e.id,
                            },
                            {
                              role: "button",
                              "aria-label": e.$opened ? "Collapse group" : "Expand group",
                            }
                          ),
                          { style: { padding: e.$level ? "0 0 0 " + (4 + a) + "px" : "0 0 0 4px" } }
                        )
                      )
                    : null,
                  D.el(
                    ".dhx_tree-cell",
                    { class: s + (n.autoHeight ? " dhx_tree-cell_auto-height" : "") },
                    [t]
                  ),
                ]
              )
            }
            ;(e.getHandlers = M),
              (e.getTreeCell = b),
              (e.getCells = function (f) {
                if (!f.data || !f.columns) return []
                var p = f.$positions,
                  n = f.data ? f.data.slice(p.yStart, p.yEnd) : [],
                  o = f.columns.slice(p.xStart, p.xEnd),
                  _ = f.selection.getCell(),
                  g = !0
                return n.map(function (h, t) {
                  var e = n.length - 1 === t,
                    i = ""
                  return (
                    f.rowCss && (i = f.rowCss(h)),
                    h.$css && (i += h.$css),
                    D.el(
                      ".dhx_grid-row",
                      k(
                        {
                          style: { height: e ? h.$height + 1 : h.$height },
                          dhx_id: h.id,
                          class: i,
                          _key: h.id,
                          _flags: D.KEYED_LIST,
                        },
                        { role: "row", "aria-rowindex": p.yStart + t + 1 }
                      ),
                      h.$customRender
                        ? [h.$customRender(h, f)]
                        : o.map(function (t, e) {
                            var i, n, o, r
                            if (!t.hidden) {
                              var s = y.toFormat(h[t.id], t.type, t.format),
                                a = function (t, e, i, n) {
                                  return k(
                                    {
                                      role: "gridcell",
                                      "aria-colindex": e,
                                      "aria-readonly": n ? "false" : "true",
                                    },
                                    ((e = t),
                                    (n = h),
                                    (t = { tabindex: -1 }),
                                    _
                                      ? _.row.id === n.id &&
                                        _.column.id === e.id &&
                                        (t.tabindex = 0)
                                      : g &&
                                        ((t.tabindex = 0),
                                        (t.onfocus = function (t) {
                                          var e
                                          f.selection &&
                                            !_ &&
                                            ((e = t.target.parentNode.getAttribute("dhx_id")),
                                            (t = t.target.getAttribute("dhx_col_id")) &&
                                              e &&
                                              (f.selection.setCell(e, t),
                                              (_ = f.selection.getCell())))
                                        })),
                                    (g = !1),
                                    t)
                                  )
                                },
                                l = t.template
                                  ? t.template(s, h, t)
                                  : ("boolean" != typeof (r = s) && "boolean" !== t.type) ||
                                    "string" == typeof r
                                  ? r || 0 === r
                                    ? r
                                    : ""
                                  : "" + Boolean(r)
                              "string" == typeof l &&
                                (l = v.isHtmlEnable(f, t)
                                  ? D.el(
                                      "div.dhx_grid-cell__content",
                                      k(
                                        { ".innerHTML": l },
                                        { role: "button", "aria-label": "Edit content" }
                                      )
                                    )
                                  : l)
                              var c = (
                                  ((t.$cellCss && t.$cellCss[h.id]) || "") +
                                  " dhx_" +
                                  t.type +
                                  "-cell"
                                ).replace(/\s+/g, " "),
                                d = t.$width,
                                u =
                                  f.$editable &&
                                  f.$editable.row === h.id &&
                                  f.$editable.col === t.id
                              return ((u ||
                                ("boolean" === t.type &&
                                  ((f.editable &&
                                    (null === (o = t.editable) || void 0 === o || o)) ||
                                    (!f.editable && t.editable)))) &&
                                ((f.leftSplit &&
                                  f.columns.length !== f.leftSplit &&
                                  f.columns.indexOf(t) < f.leftSplit) ||
                                  ((i = h),
                                  (n = t),
                                  (o = f),
                                  (l = m.getEditor(i, n, o).toHTML()),
                                  (c += " dhx_grid-cell__editable"),
                                  f.leftSplit === f.columns.indexOf(t) + 1 && --d)),
                              "tree" === f.type && f.firstColId === t.id)
                                ? b(l, h, t, f)
                                : (f.dragMode &&
                                    "row" === f.dragItem &&
                                    (c +=
                                      (h.$drophere && !u ? " dhx_grid-cell--drophere" : "") +
                                      (h.$dragtarget && !u ? " dhx_grid-cell--dragtarget" : "") +
                                      (u ? "" : " dhx_grid-cell--drag")),
                                  t.align && (c += " dhx_align-" + t.align),
                                  f.autoHeight && (c += " dhx_grid-cell__content_auto-height"),
                                  D.el(
                                    ".dhx_grid-cell",
                                    k(
                                      {
                                        class: c,
                                        style: { width: d, height: h.$height + "px" },
                                        _key: t.id,
                                        dhx_col_id: t.id,
                                      },
                                      a(t, p.xStart + e + 1, 0, f.editable)
                                    ),
                                    [l]
                                  ))
                            }
                          })
                    )
                  )
                })
              }),
              (e.getSpans = function (m, y) {
                var b = [],
                  x = m.$positions,
                  w = m.columns,
                  C = m.data
                if (!w.length || !m.spans) return null
                for (
                  var E = m.spans.sort(function (t, e) {
                      return "string" == typeof t.row && "string" == typeof e.row
                        ? t.row.localeCompare(e.row)
                        : t.row - e.row
                    }),
                    t = 0;
                  t < E.length;
                  t++
                )
                  !(function (t) {
                    var e = E[t].row,
                      i = E[t].column,
                      n = E[t].rowspan,
                      o = E[t].colspan,
                      r = E[t].css
                    if (1 === n) return
                    var s = S.findIndex(w, function (t) {
                        return "" + t.id == "" + i
                      }),
                      a = S.findIndex(C, function (t) {
                        return "" + t.id == "" + e
                      })
                    if (s < 0 || a < 0) return
                    if (!0 === y && ((o || 1) + s > m.leftSplit || s + 1 > m.leftSplit)) return
                    var l = w[s],
                      c = C[a]
                    if (l.hidden) return
                    var d = E[t].text || (void 0 === c[i] ? "" : c[i])
                    d =
                      "string" ==
                      typeof (d = (
                        l.template ||
                        function (t, e, i) {
                          return t || 0 === t ? t : ""
                        }
                      )(d, c, l))
                        ? D.el("div.dhx_span-cell-content", { ".innerHTML": d })
                        : d
                    for (var u = 0, h = 0; h < a; h++) u += C[h].$height
                    for (var f = u - 1, p = 0, _ = s - 1; 0 <= _; _--) p += w[_].$width
                    var g = s === w.length - 1,
                      v = s + o === w.length,
                      t = l.header[0].text
                        ? " dhx_span-cell"
                        : " dhx_span-cell dhx_span-cell--title"
                    ;(t += r ? " " + r : ""),
                      (t += 0 === a ? " dhx_span-first-row" : ""),
                      (t += 0 === s ? " dhx_span-first-col" : ""),
                      (t += g || v ? " dhx_span-last-col" : ""),
                      (t += o
                        ? " dhx_span-string-cell"
                        : " dhx_span-" + (l.type || "string") + "-cell"),
                      (t += l.align ? " dhx_align-" + l.align : " dhx_align-left")
                    ;(l = 1 < o ? O.getWidth(w, o, s) : l.$width),
                      (c = 1 < n ? O.getHeight(C, n, a) : c.$height)
                    b.push(
                      D.el(
                        "div",
                        k(
                          {
                            class: t,
                            style: { width: l, height: c, top: f, left: p },
                            dhx_col_id: i,
                            dhx_id: e,
                            "aria-hidden": "true",
                          },
                          M(x.yStart, x.xStart, m)
                        ),
                        [d]
                      )
                    )
                  })(t)
                return b
              }),
              (e.getShifts = function (t) {
                var e = t.columns.slice(0, t.$positions.xStart),
                  t = t.data.slice(0, t.$positions.yStart)
                return { x: v.getTotalWidth(e), y: v.getTotalHeight(t) }
              })
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              ((e = e.LayoutEvents || (e.LayoutEvents = {})).beforeShow = "beforeShow"),
              (e.afterShow = "afterShow"),
              (e.beforeHide = "beforeHide"),
              (e.afterHide = "afterHide"),
              (e.beforeResizeStart = "beforeResizeStart"),
              (e.resize = "resize"),
              (e.afterResizeEnd = "afterResizeEnd"),
              (e.beforeAdd = "beforeAdd"),
              (e.afterAdd = "afterAdd"),
              (e.beforeRemove = "beforeRemove"),
              (e.afterRemove = "afterRemove"),
              (e.beforeCollapse = "beforeCollapse"),
              (e.afterCollapse = "afterCollapse"),
              (e.beforeExpand = "beforeExpand"),
              (e.afterExpand = "afterExpand")
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              ((e = e.ListEvents || (e.ListEvents = {})).click = "click"),
              (e.doubleClick = "doubleclick"),
              (e.focusChange = "focuschange"),
              (e.beforeEditStart = "beforeEditStart"),
              (e.afterEditStart = "afterEditStart"),
              (e.beforeEditEnd = "beforeEditEnd"),
              (e.afterEditEnd = "afterEditEnd"),
              (e.itemRightClick = "itemRightClick"),
              (e.itemMouseOver = "itemMouseOver"),
              (e.contextmenu = "contextmenu")
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            e.default = { apply: "apply", reject: "reject" }
          },
          function (t, e, i) {
            "use strict"
            function n(t) {
              var e = document.activeElement
              ;(e.classList.contains("dhx_alert__apply-button") && "Enter" === t.key) ||
                e.classList.contains("dhx_alert__confirm-reject") ||
                e.classList.contains("dhx_alert__confirm-aply") ||
                t.preventDefault()
            }
            Object.defineProperty(e, "__esModule", { value: !0 }),
              (e.blockScreen = function (t) {
                var e = document.createElement("div")
                return (
                  (e.className = "dhx_alert__overlay " + (t || "")),
                  document.body.appendChild(e),
                  document.addEventListener("keydown", n),
                  function () {
                    document.body.removeChild(e), document.removeEventListener("keydown", n)
                  }
                )
              })
          },
          function (t, e, i) {},
          function (t, e, i) {
            "use strict"
            var a =
                (this && this.__assign) ||
                function () {
                  return (a =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                },
              n =
                (this && this.__spreadArrays) ||
                function () {
                  for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length
                  for (var n = Array(t), o = 0, e = 0; e < i; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s]
                  return n
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var o = i(5),
              r = i(81),
              s = i(84),
              l = i(14),
              c = i(11),
              d = i(10),
              p = i(1),
              i =
                ((u.prototype._reset = function () {
                  ;(this._order = []),
                    (this._pull = {}),
                    (this._changes = { order: [] }),
                    (this._initOrder = null),
                    (this._meta = new WeakMap()),
                    (this._loaded = !1)
                }),
                (u.prototype.add = function (t, i) {
                  var n = this
                  if (this.events.fire(d.DataEvents.beforeAdd, [t])) {
                    t = Array.isArray(t)
                      ? t.map(function (t, e) {
                          return 0 !== e && (i += 1), n._add(t, i)
                        })
                      : this._add(t, i)
                    return this._applySmart(), t
                  }
                }),
                (u.prototype.remove = function (t) {
                  var e = this
                  t &&
                    (t instanceof Array
                      ? n(t).map(function (t) {
                          e._remove(t)
                        })
                      : this._remove(t))
                }),
                (u.prototype.removeAll = function () {
                  this._reset(),
                    this.events.fire(d.DataEvents.removeAll),
                    this.events.fire(d.DataEvents.change)
                }),
                (u.prototype.exists = function (t) {
                  return !!this._pull[t]
                }),
                (u.prototype.getNearId = function (t) {
                  if (!this._pull[t]) return this._order[0].id || ""
                }),
                (u.prototype.getItem = function (t) {
                  return this._pull[t]
                }),
                (u.prototype.update = function (t, e, i) {
                  var n = this.getItem(t)
                  n
                    ? c.isEqualObj(e, n) ||
                      (e.id && t !== e.id
                        ? (c.dhxWarning("this method doesn't allow change id"), c.isDebug())
                        : (e.parent &&
                            n.parent &&
                            e.parent !== n.parent &&
                            this.move(t, -1, this, e.parent),
                          p.extend(this._pull[t], e, !1),
                          this.config.update && this.config.update(this._pull[t]),
                          i || this._onChange("update", t, this._pull[t])),
                      this._applySmart())
                    : c.dhxWarning("item not found")
                }),
                (u.prototype.getIndex = function (e) {
                  if (!e) return -1
                  var t = p.findIndex(this._order, function (t) {
                    return t && t.id.toString() === e.toString()
                  })
                  return this._pull[e] && 0 <= t ? t : void 0
                }),
                (u.prototype.getId = function (t) {
                  if (this._order[t]) return this._order[t].id
                }),
                (u.prototype.getLength = function () {
                  return this._order.length
                }),
                (u.prototype.isDataLoaded = function (t, e) {
                  return (
                    void 0 === t && (t = 0),
                    void 0 === e && (e = this._order.length),
                    p.isNumeric(t) && p.isNumeric(e)
                      ? 0 ===
                        this._order.slice(t, e).filter(function (t) {
                          return t && t.$empty
                        }).length
                      : (this._loaded ||
                          (this._loaded = !this.find(function (t) {
                            return t.$empty
                          })),
                        !!this._loaded)
                  )
                }),
                (u.prototype.filter = function (t, e) {
                  var i
                  this.isDataLoaded()
                    ? ((e && e.add) ||
                        ((this._order = this._initOrder || this._order), (this._initOrder = null)),
                      !t ||
                        "function" == typeof t ||
                        (void 0 !== (i = t).by &&
                          void 0 !== i.match &&
                          (t = i.compare
                            ? function (t) {
                                return i.compare(t[i.by], i.match, t, i.multi)
                              }
                            : function (t) {
                                return t[i.by] == i.match
                              })),
                      (this._filter = e && e.smartFilter ? t : null),
                      this._applyFilters(t),
                      this.events.fire(d.DataEvents.change))
                    : c.dhxWarning("the method doesn't work with lazyLoad")
                }),
                (u.prototype.find = function (t) {
                  for (var e in this._pull) {
                    var i = c.findByConf(this._pull[e], t)
                    if (i) return i
                  }
                  return null
                }),
                (u.prototype.findAll = function (t) {
                  var e,
                    i = []
                  for (e in this._pull) {
                    var n = c.findByConf(this._pull[e], t)
                    n && i.push(n)
                  }
                  return i
                }),
                (u.prototype.sort = function (t, e) {
                  this.isDataLoaded()
                    ? (e && e.smartSorting && (this._sorter = t),
                      t && this._applySorters(t),
                      this.events.fire(d.DataEvents.change))
                    : c.dhxWarning("the method doesn't work with lazyLoad")
                }),
                (u.prototype.copy = function (t, i, n, o) {
                  var r = this
                  return t instanceof Array
                    ? t.map(function (t, e) {
                        return r._copy(t, i, n, o, e)
                      })
                    : this._copy(t, i, n, o)
                }),
                (u.prototype.move = function (t, i, n, o, e) {
                  var r = this
                  return t instanceof Array
                    ? t.map(function (t, e) {
                        return r._move(t, i, n, o, e)
                      })
                    : this._move(t, i, n, o, 0, e)
                }),
                (u.prototype.forEach = function (t) {
                  for (var e = 0; e < this._order.length; e++)
                    t.call(this, this._order[e], e, this._order)
                }),
                (u.prototype.load = function (t, e) {
                  return (
                    "string" == typeof t && (this.dataProxy = t = new l.DataProxy(t)),
                    (this.dataProxy = t),
                    this._loader.load(t, e)
                  )
                }),
                (u.prototype.parse = function (t, e) {
                  return this._reset(), this._loader.parse(t, e)
                }),
                (u.prototype.$parse = function (t) {
                  var e = this.config.approximate
                  e && (t = this._approximate(t, e.value, e.maxNum)),
                    this._parse_data(t),
                    this._applySmart(),
                    this.events.fire(d.DataEvents.change, ["load"]),
                    this.events.fire(d.DataEvents.load)
                }),
                (u.prototype.save = function (t) {
                  "string" == typeof t && (t = new l.DataProxy(t)), this._loader.save(t)
                }),
                (u.prototype.changeId = function (t, e, i) {
                  var n
                  void 0 === e && (e = p.uid()),
                    i || this.isDataLoaded()
                      ? (n = this.getItem(t))
                        ? ((n.id = e),
                          p.extend(this._pull[t], n),
                          (this._pull[e] = this._pull[t]),
                          i || this._onChange("update", e, this._pull[e]),
                          delete this._pull[t])
                        : c.dhxWarning("item not found")
                      : c.dhxWarning("the method doesn't work with lazyLoad")
                }),
                (u.prototype.isSaved = function () {
                  return !this._changes.order.length
                }),
                (u.prototype.map = function (t) {
                  for (var e = [], i = 0; i < this._order.length; i++)
                    e.push(t.call(this, this._order[i], i, this._order))
                  return e
                }),
                (u.prototype.mapRange = function (t, e, i) {
                  t < 0 && (t = 0), e > this._order.length - 1 && (e = this._order.length - 1)
                  for (var n = this._order.slice(t, e), o = [], r = t; r <= e; r++)
                    o.push(i.call(this, this._order[r], r, n))
                  return o
                }),
                (u.prototype.reduce = function (t, e) {
                  for (var i = 0; i < this._order.length; i++)
                    e = t.call(this, e, this._order[i], i)
                  return e
                }),
                (u.prototype.serialize = function (t) {
                  void 0 === t && (t = d.DataDriver.json)
                  var e = this.map(function (t) {
                      var e = a({}, t)
                      return (
                        Object.keys(e).forEach(function (t) {
                          t.startsWith("$") && delete e[t]
                        }),
                        e
                      )
                    }),
                    t = c.toDataDriver(t)
                  if (t) return t.serialize(e)
                }),
                (u.prototype.getInitialData = function () {
                  return this._initOrder
                }),
                (u.prototype.setMeta = function (t, e, i) {
                  var n
                  t && ((n = this._meta.get(t)) || ((n = {}), this._meta.set(t, n)), (n[e] = i))
                }),
                (u.prototype.getMeta = function (t, e) {
                  t = this._meta.get(t)
                  return t ? t[e] : null
                }),
                (u.prototype.getMetaMap = function (t) {
                  return this._meta.get(t)
                }),
                (u.prototype.setRange = function (t, e) {
                  this._range = e ? [t, e] : null
                }),
                (u.prototype.getRawData = function (t, e, i, n) {
                  if (((i = i || this._order), 1 === n)) return i
                  var o
                  if (
                    (this._range &&
                      ((t = this._range[0] + t),
                      (e = -1 === e || t + (o = e - t) > this._range[1] ? this._range[1] : t + o)),
                    !e || (0 === t && (-1 === e || e === i.length)))
                  )
                    return i
                  if (t >= i.length) return []
                  ;(-1 === e || e > i.length) && (e = i.length)
                  i = i.slice(t, e)
                  return (
                    0 !==
                      i.filter(function (t) {
                        return t.$empty
                      }).length && this.events.fire("dataRequest", [t, e]),
                    i
                  )
                }),
                (u.prototype._add = function (t, e) {
                  if (this.isDataLoaded()) {
                    e = this._addCore(t, e)
                    return (
                      this._onChange("add", t.id, t),
                      this.events.fire(d.DataEvents.afterAdd, [t]),
                      e
                    )
                  }
                  c.dhxWarning("the method doesn't work with lazyLoad")
                }),
                (u.prototype._remove = function (t) {
                  if (this.isDataLoaded()) {
                    var e = this._pull[t]
                    if (e) {
                      if (!this.events.fire(d.DataEvents.beforeRemove, [e])) return
                      this._removeCore(e.id), this._onChange("remove", t, e)
                    }
                    this.events.fire(d.DataEvents.afterRemove, [e])
                  } else c.dhxWarning("the method doesn't work with lazyLoad")
                }),
                (u.prototype._copy = function (t, e, i, n, o) {
                  if (this.isDataLoaded()) {
                    if (!this.exists(t)) return null
                    var r = p.uid()
                    return (o && (e = -1 === e ? -1 : e + o), i)
                      ? i instanceof u || !n
                        ? i.exists(t)
                          ? (i.add(a(a({}, c.copyWithoutInner(this.getItem(t))), { id: r }), e), r)
                          : (i.add(c.copyWithoutInner(this.getItem(t)), e), t)
                        : void i.add(c.copyWithoutInner(this.getItem(t)), e)
                      : (this.add(a(a({}, c.copyWithoutInner(this.getItem(t))), { id: r }), e), r)
                  }
                  c.dhxWarning("the method doesn't work with lazyLoad")
                }),
                (u.prototype._move = function (t, e, i, n, o, r) {
                  if (this.isDataLoaded()) {
                    if ((o && (e = -1 === e ? -1 : e + o), i && i !== this && this.exists(t))) {
                      var s = p.copy(this.getItem(t), !0)
                      return (
                        r && (s.id = r),
                        ((!r && i.exists(t)) || i.exists(r)) && (s.id = p.uid()),
                        n && (s.parent = n),
                        i.add(s, e),
                        this.remove(t),
                        s.id
                      )
                    }
                    if (this.getIndex(t) === e) return null
                    s = this._order.splice(this.getIndex(t), 1)[0]
                    return (
                      -1 === e && (e = this._order.length),
                      this._order.splice(e, 0, s),
                      this.events.fire(d.DataEvents.change, [t, "update", this.getItem(t)]),
                      t
                    )
                  }
                  c.dhxWarning("the method doesn't work with lazyLoad")
                }),
                (u.prototype._addCore = function (t, e) {
                  var i
                  return (
                    this.config.init && (t = this.config.init(t)),
                    (t.id = null !== (i = t.id) && void 0 !== i ? i : p.uid()),
                    this._pull[t.id] && c.dhxError("Item " + t.id + " already exist"),
                    this._initOrder &&
                      !c.isTreeCollection(this) &&
                      this._addToOrder(this._initOrder, t, e),
                    this._addToOrder(this._order, t, e),
                    t.id
                  )
                }),
                (u.prototype._removeCore = function (e) {
                  0 <= this.getIndex(e) &&
                    ((this._order = this._order.filter(function (t) {
                      return t.id !== e
                    })),
                    delete this._pull[e]),
                    this._initOrder &&
                      this._initOrder.length &&
                      ((this._initOrder = this._initOrder.filter(function (t) {
                        return t.id !== e
                      })),
                      delete this._pull[e])
                }),
                (u.prototype._parse_data = function (t) {
                  var e = this._order.length
                  this.config.prep && (t = this.config.prep(t))
                  for (var i = 0, n = t; i < n.length; i++) {
                    var o = n[i]
                    this._addCore(o, e++)
                  }
                }),
                (u.prototype._approximate = function (t, e, i) {
                  for (
                    var n = t.length,
                      o = e.length,
                      r = Math.floor(n / i),
                      s = Array(Math.ceil(n / r)),
                      a = 0,
                      l = 0;
                    l < n;
                    l += r
                  ) {
                    for (var c = p.copy(t[l]), d = Math.min(n, l + r), u = 0; u < o; u++) {
                      for (var h = 0, f = l; f < d; f++) h += t[f][e[u]]
                      c[e[u]] = h / (d - l)
                    }
                    s[a++] = c
                  }
                  return s
                }),
                (u.prototype._onChange = function (t, e, i) {
                  for (var n = 0, o = this._changes.order; n < o.length; n++)
                    if ((s = o[n]).id === e && !s.saving) {
                      s.error && (s.error = !1), "add" === s.status && (t = "add")
                      var r = this._changes.order.indexOf(s),
                        s = a(a({}, s), { obj: i, status: t })
                      return (this._changes.order.splice(r, 1, s),
                      this._loader.updateChanges(this._changes),
                      "remove" === t && i.$emptyRow)
                        ? void 0
                        : void this.events.fire(d.DataEvents.change, [e, t, i])
                    }
                  this._changes.order.push({ id: e, status: t, obj: a({}, i), saving: !1 }),
                    this._loader.updateChanges(this._changes),
                    this.events.fire(d.DataEvents.change, [e, t, i])
                }),
                (u.prototype._addToOrder = function (t, e, i) {
                  0 <= i && t[i]
                    ? ((this._pull[e.id] = e), t.splice(i, 0, e))
                    : ((this._pull[e.id] = e), t.push(e))
                }),
                (u.prototype._applySmart = function () {
                  this._filter && this._applyFilters(), this._sorter && this._applySorters()
                }),
                (u.prototype._applySorters = function (t) {
                  this._sort.sort(this._order, t, this._sorter),
                    this._initOrder &&
                      this._initOrder.length &&
                      this._sort.sort(this._initOrder, t, this._sorter)
                }),
                (u.prototype._applyFilters = function (e) {
                  var t,
                    i = this._filter
                  e === i && (e = null),
                    (e || i) &&
                      ((t = this._order.filter(function (t) {
                        return (!e || e(t)) && (!i || i(t))
                      })),
                      this._initOrder || (this._initOrder = this._order),
                      (this._order = t))
                }),
                u)
            function u(t, e) {
              var n = this
              ;(this._changes = { order: [] }),
                (this.config = t || {}),
                (this._sort = new s.Sort()),
                (this._loader = new r.Loader(this, this._changes)),
                (this.events = e || new o.EventSystem(this)),
                this.events.on("dataRequest", function (t, e) {
                  var i = n.dataProxy
                  i &&
                    i.updateUrl &&
                    (i.updateUrl(null, { from: t, limit: i.config.limit || e - t }), n.load(i))
                }),
                this.events.on(d.DataEvents.loadError, function (t) {
                  "string" != typeof t ? c.dhxError(t) : c.dhxWarning(t)
                }),
                this._reset()
            }
            e.DataCollection = i
          },
          function (t, e, i) {
            "use strict"
            var n =
              (this && this.__assign) ||
              function () {
                return (n =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var o = i(38),
              r = i(39),
              i = i(82)
            ;(e.dataDrivers = { json: o.JsonDriver, csv: r.CsvDriver }),
              (e.dataDriversPro = n(n({}, e.dataDrivers), { xml: i.XMLDriver }))
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n =
              ((o.prototype.toJsonArray = function (t) {
                return this.getRows(t)
              }),
              (o.prototype.serialize = function (t) {
                return t
              }),
              (o.prototype.getFields = function (t) {
                return t
              }),
              (o.prototype.getRows = function (t) {
                return "string" == typeof t ? JSON.parse(t) : t
              }),
              o)
            function o() {}
            e.JsonDriver = n
          },
          function (t, e, i) {
            "use strict"
            var n =
              (this && this.__assign) ||
              function () {
                return (n =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var o =
              ((r.prototype.getFields = function (t, e) {
                for (
                  var i = t.trim().split(this.config.columnDelimiter), n = {}, o = 0;
                  o < i.length;
                  o++
                )
                  n[e ? e[o] : o + 1] = isNaN(Number(i[o])) ? i[o] : parseFloat(i[o])
                return n
              }),
              (r.prototype.getRows = function (t) {
                return t.trim().split(this.config.rowDelimiter)
              }),
              (r.prototype.toJsonArray = function (t) {
                var e = this,
                  i = this.getRows(t),
                  n = this.config.names
                return (
                  this.config.skipHeader &&
                    ((t = i.splice(0, this.config.skipHeader)),
                    this.config.nameByHeader &&
                      (n = t[0].trim().split(this.config.columnDelimiter))),
                  i.map(function (t) {
                    return e.getFields(t, n)
                  })
                )
              }),
              (r.prototype.serialize = function (t, e) {
                var i = t[0]
                    ? Object.keys(t[0])
                        .filter(function (t) {
                          return !t.startsWith("$")
                        })
                        .join(this.config.columnDelimiter) +
                      this.config.columnDelimiter +
                      this.config.rowDelimiter
                    : "",
                  t = this._serialize(t)
                return e ? t : i + t
              }),
              (r.prototype._serialize = function (t) {
                var o = this
                return t.reduce(function (t, n) {
                  var e = Object.keys(n).reduce(function (t, e, i) {
                    return e.startsWith("$") || "items" === e
                      ? t
                      : "" + t + n[e] + (i === n.length - 1 ? "" : o.config.columnDelimiter)
                  }, "")
                  return n.items
                    ? t + (t ? "\n" : "") + e + o._serialize(n.items)
                    : "" + t + (t ? o.config.rowDelimiter : "") + e
                }, "")
              }),
              r)
            function r(t) {
              ;(this.config = n(
                n(
                  {},
                  { skipHeader: 0, nameByHeader: !1, rowDelimiter: "\n", columnDelimiter: "," }
                ),
                t
              )),
                this.config.nameByHeader && (this.config.skipHeader = 1)
            }
            e.CsvDriver = o
          },
          function (t, i, e) {
            "use strict"
            function n(t) {
              for (var e in t) i.hasOwnProperty(e) || (i[e] = t[e])
            }
            Object.defineProperty(i, "__esModule", { value: !0 }),
              n(e(41)),
              n(e(119)),
              n(e(3)),
              n(e(21))
            var o = e(30)
            ;(i.getTreeCell = o.getTreeCell), n(e(12)), n(e(7))
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              _ =
                (this && this.__assign) ||
                function () {
                  return (_ =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var s,
              a = i(0),
              r = i(5),
              l = i(2),
              p = i(1),
              c = i(18),
              d = i(6),
              h = i(4),
              u = i(88),
              v = i(12),
              f = i(21),
              m = i(7),
              g = i(89),
              y = i(3),
              b = i(42),
              x = i(20),
              w = i(116),
              C = i(117),
              E = i(8),
              k = i(118),
              S = i(19),
              o =
                ((s = d.View),
                o(D, s),
                (D.prototype.destructor = function () {
                  this._destroyContent(),
                    this.keyManager && this.keyManager.destructor(),
                    (this.events.events = {}),
                    (this.events.context = null),
                    (this._activeFilters = this._filterData = this._scroll = this.content = null),
                    this.unmount()
                }),
                (D.prototype.setColumns = function (t) {
                  var e = this
                  ;(this.config.columns = t),
                    this._parseColumns(!0),
                    this._adjustColumns(),
                    this._checkFilters(),
                    this._checkMarks(),
                    this.paint(),
                    a.awaitRedraw().then(function () {
                      e.config.keyNavigation && e._initHotKey(!0)
                    })
                }),
                (D.prototype.addRowCss = function (t, e) {
                  var i = this.data.getItem(t),
                    t = i.$css || ""
                  t.match(new RegExp(e, "g")) || ((i.$css = t + " " + e), this.paint())
                }),
                (D.prototype.removeRowCss = function (t, e) {
                  ;(t = this.data.getItem(t)), (e = t.$css ? t.$css.replace(e, "") : "")
                  ;(t.$css = e), this.paint()
                }),
                (D.prototype.addCellCss = function (t, e, i) {
                  e = this._getColumn(e)
                  e &&
                    (e.$cellCss[t]
                      ? (e.$cellCss[t] += e.$cellCss[t].match(new RegExp(i, "g")) ? "" : " " + i)
                      : this.data.getItem(t) && (e.$cellCss[t] = i + " "),
                    this.paint())
                }),
                (D.prototype.removeCellCss = function (t, e, i) {
                  e = this._getColumn(e)
                  e &&
                    (e.$cellCss[t]
                      ? ((e.$cellCss[t] = e.$cellCss[t].replace(i, "")), this.paint())
                      : this.data.getItem(t) && (e.$cellCss[t] = ""))
                }),
                (D.prototype.showColumn = function (t) {
                  var e = this._getColumn(t)
                  e &&
                    e.hidden &&
                    this.events.fire(y.GridEvents.beforeColumnShow, [e]) &&
                    ((e.hidden = !1),
                    (this.config.$totalWidth += e.$width),
                    (t = this._hiddenFilters && this._hiddenFilters[e.id]) &&
                      ((this._activeFilters[e.id] = t), delete this._hiddenFilters[e.id]),
                    this.paint(),
                    this._checkFilters(),
                    this.events.fire(y.GridEvents.afterColumnShow, [e]))
                }),
                (D.prototype.hideColumn = function (t) {
                  var e = this._getColumn(t)
                  e &&
                    !e.hidden &&
                    this.events.fire(y.GridEvents.beforeColumnHide, [e]) &&
                    ((e.hidden = !0),
                    (this.config.$totalWidth -= e.$width),
                    (t = this._activeFilters && this._activeFilters[e.id]) &&
                      (this._hiddenFilters || (this._hiddenFilters = {}),
                      (this._hiddenFilters[e.id] = t),
                      delete this._activeFilters[e.id],
                      this.data.filter()),
                    this.paint(),
                    this._checkFilters(),
                    this.events.fire(y.GridEvents.afterColumnHide, [e]))
                }),
                (D.prototype.isColumnHidden = function (t) {
                  t = this._getColumn(t)
                  if (t) return !!t.hidden
                }),
                (D.prototype.showRow = function (t) {
                  var e
                  p.isDefined(t) &&
                    ((e = t.toString()),
                    (t = this.data.getItem(e)) &&
                      t.hidden &&
                      this.events.fire(y.GridEvents.beforeRowShow, [t]) &&
                      (this.data.update(e, { hidden: !1 }),
                      this.data.filter(function (t) {
                        return !t.hidden
                      }),
                      this.events.fire(y.GridEvents.afterRowShow, [t])))
                }),
                (D.prototype.hideRow = function (t) {
                  var e
                  p.isDefined(t) &&
                    ((e = t.toString()),
                    (t = this.data.getItem(e)) &&
                      this.events.fire(y.GridEvents.beforeRowHide, [t]) &&
                      (this.data.update(e, { hidden: !0 }),
                      this.data.filter(function (t) {
                        return !t.hidden
                      }),
                      this.events.fire(y.GridEvents.afterRowHide, [t])))
                }),
                (D.prototype.isRowHidden = function (t) {
                  if (p.isDefined(t)) {
                    t = this.data.getItem(t.toString())
                    return t ? !!t.hidden : void 0
                  }
                }),
                (D.prototype.getScrollState = function () {
                  return { x: this._scroll.left, y: this._scroll.top }
                }),
                (D.prototype.scroll = function (t, e) {
                  var i = this.getRootView().refs.grid_body.el
                  ;(i.scrollLeft = "number" == typeof t ? t : i.scrollLeft),
                    (i.scrollTop = "number" == typeof e ? e : i.scrollTop),
                    this.paint()
                }),
                (D.prototype.scrollTo = function (e, i) {
                  var t = this.selection.getCell(),
                    n = this.config.columns.filter(function (t) {
                      return !t.hidden
                    }),
                    o = p.findIndex(n, function (t) {
                      return t.id == i
                    }),
                    r = t ? t.column : this.config.columns[0],
                    s = p.findIndex(n, function (t) {
                      return t.id == r.id
                    }),
                    a = this.config.leftSplit
                      ? m.getTotalWidth(n.slice(0, this.config.leftSplit))
                      : 0,
                    l = m.getTotalWidth(n.slice(0, o)) - (o - s < 0 ? a : 0),
                    c = this.data.getRawData(0, -1),
                    d = p.findIndex(c, function (t) {
                      return t.id == e
                    }),
                    u = m.getTotalHeight(c.slice(0, d)),
                    h = this.getScrollState(),
                    f = this.config.width + h.x,
                    t =
                      this.config.height +
                      h.y -
                      this.config.headerRowHeight * this.config.$headerLevel,
                    s = u - h.y - c[d].$height,
                    a = l - h.x - n[o].$width,
                    t = u + 2 * c[d].$height + 18 - t,
                    f = l + 2 * n[o].$width + 18 - f,
                    t = 0 < s && t < 0 ? 0 : s < 0 ? s : t,
                    f = 0 < a && f < 0 ? 0 : a < 0 ? a : f
                  this.scroll(f + h.x, t + h.y)
                }),
                (D.prototype.adjustColumnWidth = function (e, t) {
                  void 0 === t && (t = !0)
                  var i = this.config.columns.filter(function (t) {
                      return !t.hidden
                    }),
                    n = i.filter(function (t) {
                      return t.id === e
                    }),
                    r = this._adjustColumnsWidth(this.config.data, n, t)
                  ;(this.config.$totalWidth = i.reduce(function (t, e) {
                    var i, n, o
                    return (
                      r[e.id] &&
                        ((e.$fixed = !0),
                        (i = e.maxWidth),
                        (n = e.minWidth),
                        (o = r[e.id]),
                        (e.$width = o),
                        i && i < o && (e.$width = i),
                        n && e.$width < n && (e.$width = n)),
                      t + e.$width
                    )
                  }, 0)),
                    this.paint()
                }),
                (D.prototype.getCellRect = function (e, i) {
                  var t = this.config.columns.filter(function (t) {
                      return !t.hidden
                    }),
                    n = this.data.getRawData(0, -1),
                    o = this.getSpan(e, i),
                    r = p.findIndex(t, function (t) {
                      return t.id == i
                    }),
                    s = p.findIndex(n, function (t) {
                      return t.id == e
                    })
                  return {
                    x: m.getTotalWidth(t.slice(0, r)),
                    y: m.getTotalHeight(n.slice(0, s)),
                    height:
                      null != o && o.rowspan
                        ? f.getHeight(n, o.rowspan, s)
                        : n[s]
                        ? n[s].$height
                        : 0,
                    width:
                      null != o && o.colspan ? f.getWidth(t, o.colspan, r) : t[r] ? t[r].$width : 0,
                  }
                }),
                (D.prototype.getColumn = function (e) {
                  var t = p.findIndex(this.config.columns, function (t) {
                    return t.id == e
                  })
                  if (0 <= t) return this.config.columns[t]
                }),
                (D.prototype.addSpan = function (e) {
                  this.config.spans = this.config.spans || []
                  var t = p.findIndex(this.config.spans, function (t) {
                    return "" + t.row == "" + e.row && "" + t.column == "" + e.column
                  })
                  0 <= t ? (this.config.spans[t] = e) : (this.config.spans.push(e), this.paint())
                }),
                (D.prototype.getSpan = function (e, i) {
                  if (this.config.spans) {
                    var t = p.findIndex(this.config.spans, function (t) {
                      return "" + t.row == "" + e && "" + t.column == "" + i
                    })
                    return this.config.spans[t]
                  }
                }),
                (D.prototype.removeSpan = function (e, i) {
                  var t
                  this.config.spans &&
                    ((t = p.findIndex(this.config.spans, function (t) {
                      return "" + t.row == "" + e && "" + t.column == "" + i
                    })),
                    this.config.spans.splice(t, 1),
                    this.paint())
                }),
                (D.prototype.editCell = function (t, e, i) {
                  var n,
                    o = this.data.getItem(t),
                    r = this.getColumn(e)
                  o && r
                    ? ((n = r.editorType),
                      i ||
                        ("date" === r.type && (i = "datePicker"),
                        "boolean" === r.type && (i = "checkbox"),
                        n && (i = n)),
                      this.events.fire(y.GridEvents.beforeEditStart, [o, r, i]) &&
                        ((null !== (n = this.config.$editable) && void 0 !== n && n.editor) ||
                          (this.config.$editable &&
                            this.config.$editable.row === t &&
                            this.config.$editable.col === e &&
                            this.config.$editable.editorType === i) ||
                          ((this.config.$editable = { row: o.id, col: r.id, editorType: i }),
                          this.selection.config.disabled ||
                            this.selection.setCell(t.toString(), e.toString()),
                          this.paint(),
                          this.events.fire(y.GridEvents.afterEditStart, [o, r, i]))))
                    : h.dhxWarning("item not found")
                }),
                (D.prototype.editEnd = function (t) {
                  this.config.$editable &&
                    this.config.$editable.editor &&
                    this.config.$editable.editor.endEdit(t)
                }),
                (D.prototype.getSortingState = function () {
                  return { dir: this._sortDir, by: this._sortBy }
                }),
                (D.prototype.getHeaderFilter = function (i) {
                  var n = this,
                    t = this.getColumn(i)
                  if (t) {
                    var o = null
                    return (
                      t.header.forEach(function (t) {
                        var e
                        t.content &&
                          ((e = n.content[t.content].element[i]),
                          (o =
                            "comboFilter" === t.content
                              ? e
                              : n.getRootView().refs[i + "_filter"].el))
                      }),
                      o
                    )
                  }
                }),
                (D.prototype.edit = function (t, e, i) {
                  this.editCell(t, e, i)
                }),
                (D.prototype._createView = function () {
                  var i = this
                  return a.create(
                    {
                      render: function (t, e) {
                        return b.render(t, e, i._htmlEvents, i.selection, i._uid)
                      },
                    },
                    this
                  )
                }),
                (D.prototype._parseColumns = function (t) {
                  void 0 === t && (t = !1), v.normalizeColumns(this.config, t)
                  t = this.config.columns.filter(function (t) {
                    return !t.hidden
                  })
                  v.countColumns(this.config, t)
                }),
                (D.prototype._parseData = function () {
                  ;(this.config.data = this._prepareData(this.data)),
                    this._detectColsTypes(),
                    this._checkFilters(),
                    this._checkMarks(),
                    this.data.filter(function (t) {
                      return !t.hidden
                    }),
                    this._render()
                }),
                (D.prototype._createCollection = function (t) {
                  this.data = new h.DataCollection({ prep: t }, this.events)
                }),
                (D.prototype._getRowIndex = function (t) {
                  return this.data.getIndex(t)
                }),
                (D.prototype._setEventHandlers = function () {
                  function i(t) {
                    return 1
                  }
                  var u = this
                  this.data.events.on(h.DataEvents.load, function () {
                    u.data.filter(function (t) {
                      return t
                    }),
                      u._parseData(),
                      u._checkFilters()
                  }),
                    this.data.events.on(h.DataEvents.change, function (t, e, i) {
                      if ("setPage" !== e) {
                        if (
                          (("add" !== e && "update" !== e && "remove" !== e) ||
                            (u.config.data = u._prepareData(u.data)),
                          t &&
                            ((u._filterData =
                              u.data.map(function (t) {
                                return t
                              }) || []),
                            u._checkFilters()),
                          u._detectColsTypes(),
                          u._removeMarks(),
                          u._checkMarks(),
                          u.config.autoEmptyRow &&
                            (!u._activeFilters || p.isEmptyObj(u._activeFilters)))
                        ) {
                          e = u.data.find({ by: "$emptyRow", match: !0 })
                          if (e) {
                            if (e.id === t) return
                            u.data.move(e.id, u.data.getLength() - 1)
                          } else u._addEmptyRow()
                        }
                        u._render()
                      } else
                        a.awaitRedraw().then(function () {
                          u.scrollTo(
                            u.data.getId(i[0]).toString(),
                            u.config.columns[0].id.toString()
                          ),
                            u._render()
                        })
                    }),
                    this.data.events.on(h.DataEvents.removeAll, function () {
                      u.config.columns.map(function (e) {
                        e.header.map(function (t) {
                          !t.content ||
                            ("selectFilter" !== t.content && "comboFilter" !== t.content) ||
                            (e.$uniqueData = [])
                        })
                      })
                    }),
                    this.events.on(h.DragEvents.beforeDrag, function (t, e) {
                      return u.data.getItem(t.start)
                        ? u.events.fire(y.GridEvents.beforeRowDrag, [t, e])
                        : "column" === u.config.dragItem || "both" === u.config.dragItem
                        ? u.events.fire(y.GridEvents.beforeColumnDrag, [t, e])
                        : void 0
                    }),
                    this.events.on(h.DragEvents.dragStart, function (t, e) {
                      i({ $dragtarget: !0 }),
                        u.data.getItem(t.start)
                          ? u.events.fire(y.GridEvents.dragRowStart, [t, e])
                          : ("column" !== u.config.dragItem && "both" !== u.config.dragItem) ||
                            u.events.fire(y.GridEvents.dragColumnStart, [t, e])
                    }),
                    this.events.on(h.DragEvents.dragIn, function (t, e) {
                      u.data.getItem(t.start)
                        ? u.events.fire(y.GridEvents.dragRowIn, [t, e])
                        : ("column" !== u.config.dragItem && "both" !== u.config.dragItem) ||
                          u.events.fire(y.GridEvents.dragColumnIn, [t, e])
                    }),
                    this.events.on(h.DragEvents.dragOut, function (t, e) {
                      u.data.getItem(t.start)
                        ? u.events.fire(y.GridEvents.dragRowOut, [t, e])
                        : ("column" !== u.config.dragItem && "both" !== u.config.dragItem) ||
                          u.events.fire(y.GridEvents.dragColumnOut, [t, e])
                    }),
                    this.events.on(h.DragEvents.canDrop, function (t, e) {
                      i({ $drophere: !0 }),
                        u.data.getItem(t.start)
                          ? u.events.fire(y.GridEvents.canRowDrop, [t, e])
                          : ("column" !== u.config.dragItem && "both" !== u.config.dragItem) ||
                            u.events.fire(y.GridEvents.canColumnDrop, [t, e])
                    }),
                    this.events.on(h.DragEvents.cancelDrop, function (t, e) {
                      i({ $drophere: void 0 }),
                        u.data.getItem(t.start)
                          ? u.events.fire(y.GridEvents.cancelRowDrop, [t, e])
                          : ("column" !== u.config.dragItem && "both" !== u.config.dragItem) ||
                            u.events.fire(y.GridEvents.cancelColumnDrop, [t, e])
                    }),
                    this.events.on(h.DragEvents.beforeDrop, function (t, e) {
                      return "row" !== u.config.dragItem ||
                        ("both" !== u.config.dragMode && "target" !== u.config.dragMode)
                        ? "column" === u.config.dragItem || "both" === u.config.dragItem
                          ? u.events.fire(y.GridEvents.beforeColumnDrop, [t, e])
                          : void 0
                        : u.events.fire(y.GridEvents.beforeRowDrop, [t, e])
                    }),
                    this.events.on(h.DragEvents.afterDrop, function (e, t) {
                      var i
                      if (u.data.getItem(e.start)) {
                        u.events.fire(y.GridEvents.afterRowDrop, [e, t])
                        for (
                          var n = u.data.getItem(e.start), o = 0, r = u.config.columns;
                          o < r.length;
                          o++
                        ) {
                          var s = r[o]
                          void 0 === n[s.id] &&
                            u.data.update(n.id, (((i = {})[s.id] = null), i), !0)
                        }
                        var a,
                          l = u.data.getInitialData(),
                          c =
                            null == l
                              ? void 0
                              : l.findIndex(function (t) {
                                  return t.id === e.start
                                }),
                          d =
                            null == l
                              ? void 0
                              : l.findIndex(function (t) {
                                  return t.id === e.target
                                })
                        for (a in (c &&
                          -1 < d &&
                          null != l &&
                          l.splice(d, 0, null == l ? void 0 : l.splice(c, 1)[0]),
                        (u.config.data = u._prepareData(
                          l ||
                            u.data.map(function (t) {
                              return t
                            })
                        )),
                        u.data.parse(u.config.data),
                        u._activeFilters))
                          u.data.filter(u._activeFilters[a], { add: !0 })
                      } else ("column" !== u.config.dragItem && "both" !== u.config.dragItem) || u.events.fire(y.GridEvents.afterColumnDrop, [e, t])
                    }),
                    this.events.on(h.DragEvents.afterDrag, function (t, e) {
                      i({ $dragtarget: void 0 }),
                        u.data.getItem(t.start)
                          ? u.events.fire(y.GridEvents.afterRowDrag, [t, e])
                          : ("column" !== u.config.dragItem && "both" !== u.config.dragItem) ||
                            u.events.fire(y.GridEvents.afterColumnDrag, [t, e]),
                        (u.config.data = u._prepareData(
                          u.data instanceof Array
                            ? u.data.map(function (t) {
                                return t
                              })
                            : u.data.getInitialData() || u.data
                        )),
                        u.data.parse(u.config.data)
                    }),
                    this.events.on(y.GridEvents.cellMouseDown, function (t, e, i) {
                      i.targetTouches
                        ? ((u._touch.timer = setTimeout(function () {
                            u._dragStart(i)
                          }, u._touch.duration)),
                          u._touch.timeStamp
                            ? (u._touch.dblDuration >=
                                u._touch.timeStamp - +i.timeStamp.toFixed() &&
                                (((!1 !== e.editable && u.config.editable) || e.editable) &&
                                  u.editCell(t.id, e.id, e.editorType),
                                i.preventDefault(),
                                u.events.fire(y.GridEvents.cellDblClick, [t, e, i])),
                              (u._touch.timeStamp = null))
                            : (u._touch.timeStamp = +i.timeStamp.toFixed()),
                          setTimeout(function () {
                            u._touch.timeStamp = null
                          }, u._touch.dblDuration))
                        : u._dragStart(i)
                    }),
                    this._events.on(y.GridSystemEvents.cellTouchMove, function (t, e, i) {
                      u._touch.start && i.preventDefault(), u._clearTouchTimer()
                    }),
                    this._events.on(y.GridSystemEvents.cellTouchEnd, function () {
                      ;(u._touch.start = !1), u._clearTouchTimer()
                    }),
                    this.events.on(y.GridEvents.filterChange, function (t, e, i) {
                      ;(t = null != t ? t : ""),
                        !u.config.autoEmptyRow ||
                          ((o = u.data.find({ by: "$emptyRow", match: !0 })) &&
                            u.data.remove(o.id)),
                        u._activeFilters || (u._activeFilters = {})
                      var n,
                        o = u._getColumn(e)
                      for (n in ("" !== t
                        ? (u._activeFilters[e] = {
                            by: e,
                            match: t,
                            compare: u.content[i].match,
                            multi: "multiselect" === (null == o ? void 0 : o.editorType),
                          })
                        : delete u._activeFilters[e],
                      u.data.filter(function (t) {
                        return t
                      }),
                      u._activeFilters))
                        u.data.filter(u._activeFilters[n], { add: !0 })
                    }),
                    this.events.on(y.GridEvents.scroll, function (t) {
                      ;(u._scroll = { top: t.y, left: t.x }), u.editEnd(), u.paint()
                    }),
                    this.events.on(y.GridEvents.cellDblClick, function (t, e) {
                      ;((!1 !== e.editable && u.config.editable) || e.editable) &&
                        u.editCell(t.id, e.id, e.editorType)
                    }),
                    this.events.on(y.GridEvents.afterEditEnd, function (e, t, i) {
                      var n, o, r
                      ;(null !== (o = u.config.$editable) &&
                        void 0 !== o &&
                        o.editor &&
                        (u.config.$editable.col !== i.id || u.config.$editable.row !== t.id)) ||
                        ((o = u.config.$editable
                          ? ((n = u.config.$editable.row), u.config.$editable.col)
                          : ((n = t.id), i.id)),
                        delete (t = u.data.getItem(n)).$emptyRow,
                        void 0 !== e &&
                          ((r =
                            "select" === i.editorType || "combobox" === i.editorType
                              ? null === (r = i.options) || void 0 === r
                                ? void 0
                                : r.find(function (t) {
                                    return t.id === e
                                  })
                              : null),
                          u.data.update(
                            n,
                            _(_({}, t), (((t = {})[o] = (null == r ? void 0 : r.value) || e), t))
                          )),
                        (u.config.$editable = null),
                        u._checkFilters(),
                        u.paint())
                    }),
                    this.events.on(y.GridEvents.headerCellMouseDown, function (t, e) {
                      var i = e.target.getAttribute("dhx_resized")
                      i &&
                        u.events.fire(y.GridEvents.beforeResizeStart, [t, e]) &&
                        C.startResize(u, i.toString(), e, function () {
                          u.paint(),
                            (u.config.$resizing = null),
                            u.events.fire(y.GridEvents.afterResizeEnd, [t, e])
                        }),
                        e.targetTouches &&
                          (u._touch.timeStamp
                            ? (u._touch.dblDuration >=
                                u._touch.timeStamp - +e.timeStamp.toFixed() &&
                                (e.preventDefault(),
                                u.events.fire(y.GridEvents.headerCellDblClick, [t, e])),
                              (u._touch.timeStamp = null))
                            : (u._touch.timeStamp = +e.timeStamp.toFixed()),
                          setTimeout(function () {
                            u._touch.timeStamp = null
                          }, u._touch.dblDuration))
                    }),
                    this.events.on(y.GridEvents.footerCellDblClick, function (t, e) {
                      e.targetTouches &&
                        (u._touch.timeStamp
                          ? (u._touch.dblDuration >= u._touch.timeStamp - +e.timeStamp.toFixed() &&
                              (e.preventDefault(),
                              u.events.fire(y.GridEvents.footerCellDblClick, [t, e])),
                            (u._touch.timeStamp = null))
                          : (u._touch.timeStamp = +e.timeStamp.toFixed()),
                        setTimeout(function () {
                          u._touch.timeStamp = null
                        }, u._touch.dblDuration))
                    }),
                    this.events.on(y.GridEvents.resize, function () {
                      u._parseColumns(), u._checkFilters()
                    })
                }),
                (D.prototype._addEmptyRow = function () {
                  var t = this.data.getId(this.data.getLength() - 1),
                    e = this.data.getItem(t),
                    t = this.config.columns.filter(function (t) {
                      return !t.hidden
                    })
                  m.isRowEmpty(e) ||
                    this.data.add(
                      t.reduce(
                        function (t, e) {
                          return (t[e.id] = ""), t
                        },
                        { $emptyRow: !0 }
                      )
                    )
                }),
                (D.prototype._sort = function (i, t, e) {
                  var n = this
                  t
                    ? (this._sortDir = t)
                    : this._sortBy === i
                    ? (this._sortDir = "asc" === this._sortDir ? "desc" : "asc")
                    : (this._sortDir = "asc")
                  ;(this._sortBy = i),
                    this.data.sort({
                      by: i,
                      dir: this._sortDir,
                      as:
                        null != e
                          ? e
                          : function (t) {
                              var e = n.getColumn(i)
                              return t && "date" === e.type
                                ? ("string" == typeof t ? x.stringToDate(t, e.format) : t).getTime()
                                : t
                                ? "" + t
                                : ""
                            },
                    }),
                    this.events.fire(y.GridEvents.afterSort, [this.getColumn(i), this._sortDir])
                }),
                (D.prototype._clearTouchTimer = function () {
                  this._touch.timer && (clearTimeout(this._touch.timer), (this._touch.timer = null))
                }),
                (D.prototype._checkFilters = function () {
                  var o = this,
                    i = this._filterData
                  if (i) {
                    this.config.columns.forEach(function (e) {
                      e.header.forEach(function (t) {
                        !t.content ||
                          ("selectFilter" !== t.content && "comboFilter" !== t.content) ||
                          ((t = e.header.find(function (t) {
                            return t.filterConfig
                          })),
                          (t = v.getUnique(i, e.id, t ? t.filterConfig.multiselection : null)),
                          e.$uniqueData && e.$uniqueData.length > t.length
                            ? t.forEach(function (t) {
                                e.$uniqueData.includes(t) || e.$uniqueData.push(t)
                              })
                            : (e.$uniqueData = t))
                      })
                    })
                    var t,
                      r = this
                    for (t in this._activeFilters)
                      !(function (e) {
                        var i = r.config.columns.find(function (t) {
                            return t.id === e
                          }),
                          t = i.header.find(function (t) {
                            return !!t.content
                          }),
                          n = !1,
                          n = Array.isArray(r._activeFilters[e].match)
                            ? r._activeFilters[e].match.reduce(function (t, e) {
                                if (
                                  i.$uniqueData.find(function (t) {
                                    return t.toString() === e
                                  })
                                )
                                  return !0
                              }, !1)
                            : i.$uniqueData.find(function (t) {
                                return t.toString() === o._activeFilters[e].match
                              })
                        !t || ("selectFilter" !== t.content && "comboFilter" !== t.content) || n
                          ? r.data.filter(r._activeFilters[e], { add: !0 })
                          : (delete r._activeFilters[e], r.data.filter())
                      })(t)
                  }
                }),
                (D.prototype._adjustColumns = function () {
                  var t,
                    r,
                    e,
                    i = this
                  "boolean" == typeof this.config.adjust ||
                  "data" === this.config.adjust ||
                  "header" === this.config.adjust ||
                  "footer" === this.config.adjust
                    ? (e = this.config.columns.filter(function (t) {
                        return !t.hidden
                      })).length &&
                      ((t =
                        this.config.data && this.config.data.length
                          ? this.config.data
                          : this.data.map(function (t) {
                              return t
                            })),
                      (r = this._adjustColumnsWidth(t, e)),
                      (this.config.$totalWidth = e.reduce(function (t, e) {
                        e.$fixed = !0
                        var i = e.maxWidth,
                          n = e.minWidth,
                          o = r[e.id]
                        return (
                          (e.$width = o),
                          i && i < o && (e.$width = i),
                          n && e.$width < n && (e.$width = n),
                          t + e.$width
                        )
                      }, 0)))
                    : (e = this.config.columns.filter(function (t) {
                        return !t.hidden && t.adjust
                      })).length &&
                      e.forEach(function (t) {
                        i.adjustColumnWidth(t.id, t.adjust)
                      })
                }),
                (D.prototype._prepareData = function (t) {
                  var e = this
                  return (
                    this.config.autoHeight && (this.config.autoHeight = !1),
                    this._adjustColumns(),
                    t.map(function (t) {
                      return (t.$height = t.height || e.config.rowHeight), t
                    })
                  )
                }),
                (D.prototype._adjustColumnsWidth = function (t, e, i) {
                  void 0 === i && (i = this.config.adjust)
                  var n = {}
                  if ("header" === i || !0 === i) {
                    var o = e.filter(function (t) {
                      return t.header
                    })
                    if (
                      (d = v.getMaxColsWidth(
                        this._prepareColumnData(o, "header"),
                        o,
                        { font: "bold 14.4px Arial" },
                        "header"
                      ))
                    )
                      for (var r = 0, s = Object.entries(d); r < s.length; r++)
                        var a = s[r],
                          l = a[0],
                          c = a[1],
                          n = Object.assign(
                            n,
                            (((a = {})[l] =
                              +c + (m.isSortable(this.config, this.getColumn(l)) ? 36 : 16)),
                            a)
                          )
                  }
                  if ("footer" === i || !0 === i) {
                    var d,
                      o = e.filter(function (t) {
                        return t.footer
                      })
                    if (
                      (d = v.getMaxColsWidth(
                        this._prepareColumnData(o, "footer"),
                        o,
                        { font: "bold 14.4px Arial" },
                        "footer"
                      ))
                    )
                      for (var u = 0, h = Object.entries(d); u < h.length; u++) {
                        var f = h[u],
                          l = f[0],
                          c = f[1]
                        ;((n[l] && n[l] < +c + 16) || !n[l]) &&
                          (n = Object.assign(n, (((f = {})[l] = +c + 16), f)))
                      }
                  }
                  if (
                    ("data" === i || !0 === i) &&
                    (d = v.getMaxColsWidth(t, e, { font: "normal 14.4px Arial" }, "data"))
                  )
                    for (var p = 0, _ = Object.entries(d); p < _.length; p++) {
                      var g = _[p],
                        l = g[0],
                        c = g[1]
                      ;((n[l] && n[l] < +c + 16) || !n[l]) &&
                        (n = Object.assign(n, (((g = {})[l] = +c + 16), g)))
                    }
                  return n
                }),
                (D.prototype._prepareColumnData = function (t, e) {
                  for (var i, n, o = [], r = 0; r < t.length; r++) {
                    for (
                      var s = [], a = 0;
                      a < (null === (i = t[a]) || void 0 === i ? void 0 : i[e].length);
                      a++
                    ) {
                      var l = {}
                      null !== (i = null === (i = t[r]) || void 0 === i ? void 0 : i[e][a]) &&
                      void 0 !== i &&
                      i.text
                        ? ((l[t[r].id] =
                            (null ===
                              (n = null === (n = t[r]) || void 0 === n ? void 0 : n[e][a]) ||
                            void 0 === n
                              ? void 0
                              : n.text) || ""),
                          s.push(l))
                        : null !== (n = null === (n = t[r]) || void 0 === n ? void 0 : n[e][a]) &&
                          void 0 !== n &&
                          n.content &&
                          ((l[t[r].id] =
                            this.content[
                              null ===
                                (n = null === (n = t[r]) || void 0 === n ? void 0 : n[e][a]) ||
                              void 0 === n
                                ? void 0
                                : n.content
                            ].toHtml(this.getColumn(t[r].id), this.config) || ""),
                          s.push(l))
                    }
                    for (var c = 0; c < s.length; c++)
                      for (var d = 0, u = Object.entries(s[c]); d < u.length; d++) {
                        var h = u[d],
                          f = h[0],
                          p = h[1]
                        ;(o[c] = _({}, o[c]) || {}),
                          (o[c] = Object.assign(o[c], (((h = {})[f] = p), h)))
                      }
                  }
                  return o
                }),
                (D.prototype._dragStart = function (t) {
                  if (
                    this.config.dragMode &&
                    ("row" === this.config.dragItem || "both" === this.config.dragItem) &&
                    !this.config.$editable
                  ) {
                    var e = this._getColumn(t.target.getAttribute("dhx_col_id"))
                    if (!1 !== (null == e ? void 0 : e.draggable)) {
                      ;(e = l.locateNode(t, "dhx_id")), (e = e && e.getAttribute("dhx_id"))
                      return (
                        t.targetTouches && (this._touch.start = !0),
                        h.dragManager.onMouseDown(t, [e])
                      )
                    }
                  }
                }),
                (D.prototype._getColumn = function (t) {
                  for (var e = 0, i = this.config.columns; e < i.length; e++) {
                    var n = i[e]
                    if (n.id == t) return n
                  }
                }),
                (D.prototype._init = function () {
                  ;(this.events = new r.EventSystem(this)),
                    (this._events = new r.EventSystem(this)),
                    this._attachDataCollection(),
                    (this.export = new u.Exporter(this)),
                    this._setEventHandlers()
                }),
                (D.prototype._attachDataCollection = function () {
                  var e = this
                  if (this.config.data instanceof h.DataCollection)
                    return (
                      (this.data = this.config.data),
                      void (this.config.data = this.data.serialize())
                    )
                  this._createCollection(function (t) {
                    return t.spans && ((e.config.spans = t.spans), (t = t.data)), t
                  })
                }),
                (D.prototype._setMarks = function (n, o) {
                  for (
                    var t = this.data.map(function (t) {
                        return { id: t.id, data: t[n.id], row: t }
                      }),
                      r = this.data.map(function (t) {
                        return t[n.id]
                      }),
                      e = 0,
                      i = t;
                    e < i.length;
                    e++
                  )
                    !(function (t) {
                      var e,
                        i = o(t.data, r, t.row, n)
                      i &&
                        ((n.$cellCss = n.$cellCss || {}),
                        (e = (n.$cellCss[t.id] || "").split(" ")),
                        i.split(" ").map(function (t) {
                          e.includes(t) || e.push(t)
                        }),
                        (n.$cellCss[t.id] = e.join(" ")))
                    })(i[e])
                }),
                (D.prototype._checkMarks = function () {
                  var e = this
                  this.config.columns.map(function (t) {
                    var o = t.mark
                    o &&
                      ("function" == typeof o
                        ? e._setMarks(t, o)
                        : e._setMarks(t, function (t, e) {
                            var i = []
                            e.forEach(function (t) {
                              null != t && "" !== t && i.push(parseFloat(t))
                            })
                            var n = p.getMinArrayNymber(i),
                              e = p.getMaxArrayNymber(i)
                            return o.max && e === parseFloat(t)
                              ? o.max
                              : !(!o.min || n !== parseFloat(t)) && o.min
                          }))
                  })
                }),
                (D.prototype._removeMarks = function () {
                  this.config.columns.forEach(function (t) {
                    t.mark && (t.$cellCss = {})
                  })
                }),
                (D.prototype._detectColsTypes = function () {
                  this.config.columns.forEach(function (t) {
                    return t.type
                      ? t
                      : t.format
                      ? ((t.type = "number"), t)
                      : void (t.type || (t.type = "string"))
                  })
                }),
                (D.prototype._destroyContent = function () {
                  for (var t in this.content) "comboFilter" === t && this.content[t].destroy()
                }),
                (D.prototype._render = function () {
                  this.paint()
                }),
                (D.prototype._initHotKey = function (t) {
                  void 0 === t && (t = !1)
                  var e = k.getKeysHandlers(this)
                  for (i in e) this.keyManager.exist(i) || this.keyManager.addHotKey(i, e[i])
                  if (!t)
                    for (var i in this.config.hotkeys)
                      this.keyManager.addHotKey(i, this.config.hotkeys[i])
                }),
                D)
            function D(t, e) {
              var r = s.call(this, t, e) || this
              ;(r._touch = {
                duration: 350,
                dblDuration: 300,
                timer: null,
                start: !1,
                timeStamp: null,
              }),
                (r.config = p.extend(
                  {
                    rowHeight: 40,
                    headerRowHeight: 40,
                    footerRowHeight: 40,
                    keyNavigation: !0,
                    sortable: !0,
                    columns: [],
                    data: [],
                    tooltip: !0,
                    rootParent: ("string" == typeof t && t) || r._uid,
                    headerSort: !0,
                  },
                  e
                )),
                (r.content = w.getContent()),
                (r._scroll = { top: 0, left: 0 }),
                (r.config.autoWidth = r.config.autoWidth || r.config.fitToContainer),
                (r.config.adjust = r.config.adjust || r.config.columnsAutoWidth),
                (r.config.editable = r.config.editable || r.config.editing),
                (r.config.leftSplit = r.config.leftSplit || r.config.splitAt),
                (r.config.sortable && r.config.headerSort) || (r.config.sortable = !1),
                r.config.columns.forEach(function (t) {
                  t.format = t.format || t.dateFormat
                })
              function n(t, e, i) {
                var n
                t &&
                  e &&
                  m.isTooltip(r.config, e) &&
                  ((n = v.toFormat(t[e.id], e.type, e.format)),
                  e.tooltipTemplate
                    ? (n = e.tooltipTemplate(n, t, e))
                    : n && e.template && (n = e.template(n, t, e)),
                  n &&
                    E.tooltip(n, {
                      css: "dhx_grid_tooltip",
                      node: i,
                      htmlEnable: m.isHtmlEnable(r.config, e),
                    }))
              }
              function i(t, e) {
                var i
                e &&
                  m.isTooltip(r.config, e) &&
                  (i =
                    (t.target.querySelector(".dhx_grid-header-cell-text span") &&
                      t.target.querySelector(".dhx_grid-header-cell-text span").textContent) ||
                    (t.target.querySelector(".dhx_grid-footer-cell-text span") &&
                      t.target.querySelector(".dhx_grid-footer-cell-text span").textContent) ||
                    "") &&
                  E.tooltip(i, {
                    css: "dhx_grid_tooltip",
                    node: t.target,
                    htmlEnable: m.isHtmlEnable(r.config, e),
                  })
              }
              return (
                (r._htmlEvents = {
                  onclick: l.eventHandler(
                    function (t) {
                      return l.locate(t)
                    },
                    {
                      "dhx_grid-header-cell--sortable": function (t, e) {
                        var i,
                          n = t.target.getAttribute("dhx_resized"),
                          o = r._getColumn(e)
                        o &&
                          m.isSortable(r.config, o) &&
                          !n &&
                          r.events.fire(y.GridEvents.beforeSort, [
                            o,
                            r._sortDir ? "asc" : "desc",
                          ]) &&
                          ((t = (i =
                            null === (t = l.locateNodeByClassName(t, "dhx_grid-header-cell")) ||
                            void 0 === t
                              ? void 0
                              : t.querySelector(".dhx_grid-header-cell-text_content").innerHTML)
                            ? o.header.find(function (t) {
                                return t.text === i
                              })
                            : null),
                          (o = "asc" === r._sortDir ? "desc" : "asc"),
                          r._sort(e, o, null == t ? void 0 : t.sortAs))
                      },
                      "dhx_grid-expand-cell": function (t, e) {
                        t.target.classList.contains("dhx_grid-expand-cell-icon") &&
                          r.events.fire(y.GridEvents.expand, [e])
                      },
                    }
                  ),
                  onscroll: function (t) {
                    r.events.fire(y.GridEvents.scroll, [
                      { y: t.target.scrollTop, x: t.target.scrollLeft },
                    ])
                  },
                  onmouseover: {
                    ".dhx_grid-cell": function (t) {
                      var e = r.data.getItem(t.composedPath()[1].getAttribute("dhx_id")),
                        i = r._getColumn(t.target.getAttribute("dhx_col_id"))
                      n(e, i, t.target)
                    },
                    ".dhx_grid-cell:not(.dhx_tree-cell) .dhx_grid-cell__content, .dhx_tree-cell :not(.dhx_grid-cell__content)":
                      function (t) {
                        var e = t.composedPath(),
                          i = r.data.getItem(e[2].getAttribute("dhx_id")),
                          e = r._getColumn(e[1].getAttribute("dhx_col_id"))
                        n(i, e, t.target)
                      },
                    ".dhx_grid-cell.dhx_tree-cell .dhx_grid-cell__content": function (t) {
                      var e = t.composedPath(),
                        i = r.data.getItem(e[3].getAttribute("dhx_id")),
                        t = r._getColumn(e[2].getAttribute("dhx_col_id"))
                      n(i, t, e[2])
                    },
                    ".dhx_span-cell:not(.dhx_grid-header-cell)": function (t) {
                      var e,
                        i = r.data.getItem(t.target.getAttribute("dhx_id")),
                        n = r._getColumn(t.target.getAttribute("dhx_col_id")),
                        o = r.getSpan(i.id, n.id)
                      i &&
                        o &&
                        m.isTooltip(r.config, o) &&
                        ((e = o.text || v.toFormat(i[n.id], n.type, n.format)),
                        o.tooltipTemplate
                          ? (e = o.tooltipTemplate(e, o))
                          : n.template && (e = n.template(e, i, n)),
                        e &&
                          E.tooltip(e, { css: "dhx_grid_tooltip", node: t.target, htmlEnable: !0 }))
                    },
                    ".dhx_grid-header-cell:not(.dhx_span-cell)": function (t) {
                      var e = r._getColumn(t.target.getAttribute("dhx_id"))
                      i(t, e)
                    },
                    ".dhx_grid-footer-cell:not(.dhx_span-cell)": function (t) {
                      var e = r._getColumn(t.target.getAttribute("dhx_id"))
                      i(t, e)
                    },
                    ".dhx_grid-header-cell.dhx_span-cell": function (t) {
                      var e = r._getColumn(t.target.getAttribute("dhx_id")),
                        i =
                          e &&
                          e.header.find(function (t) {
                            return !(!t.rowspan && !t.colspan)
                          })
                      e &&
                        i &&
                        m.isTooltip(r.config, e) &&
                        (i = i.text || "") &&
                        E.tooltip(i, {
                          css: "dhx_grid_tooltip",
                          node: t.target,
                          htmlEnable: m.isHtmlEnable(r.config, e),
                        })
                    },
                    ".dhx_grid-header-cell-text_content": function (t) {
                      var e = t.composedPath(),
                        i = r._getColumn(e[1].getAttribute("dhx_id"))
                      i &&
                        m.isTooltip(r.config, i) &&
                        (t =
                          (e[2].querySelector(".dhx_grid-header-cell-text_content") &&
                            e[2].querySelector(".dhx_grid-header-cell-text_content").textContent) ||
                          "") &&
                        E.tooltip(t, {
                          css: "dhx_grid_tooltip",
                          node: e[1],
                          htmlEnable: m.isHtmlEnable(r.config, i),
                        })
                    },
                  },
                }),
                (r.config.dragMode || r.config.dragItem) &&
                  (h.dragManager.setItem(r._uid, r),
                  r.config.dragItem || (r.config.dragItem = "row"),
                  r.config.dragMode || (r.config.dragMode = "both")),
                r._init(),
                r.config.columns && r._parseColumns(!0),
                r.config.data &&
                  r.config.data instanceof Array &&
                  r.config.data.length &&
                  r.config.columns &&
                  r.data.parse(r.config.data),
                (r.selection = new g.Selection(
                  r,
                  { disabled: !r.config.selection },
                  r.events,
                  r._uid
                )),
                r.mount(t, r._createView()),
                r.config.autoWidth && r.config.autoHeight && r._prepareData(r.config.data),
                a.awaitRedraw().then(function () {
                  r.config.keyNavigation &&
                    ((r.keyManager = new c.KeyManager(function (t, e) {
                      return (
                        !(e !== r._uid || !r.events.fire(y.GridEvents.beforeKeyDown, [t])) &&
                        (r.events.fire(y.GridEvents.afterKeyDown, [t]), !0)
                      )
                    })),
                    r._initHotKey(),
                    S.focusManager.setFocusId(r._uid))
                }),
                e.autoEmptyRow && 0 === r.data.getLength() && (r._addEmptyRow(), r.paint()),
                r
              )
            }
            e.Grid = o
          },
          function (t, e, i) {
            "use strict"
            var y =
              (this && this.__assign) ||
              function () {
                return (y =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var b = i(0),
              u = i(2),
              a = i(12),
              x = i(7),
              w = i(30),
              C = i(115),
              E = i(57),
              h = i(1),
              k = 2
            function S(t, e, i) {
              var n = t.config,
                o = n.columns.filter(function (t) {
                  return !t.hidden
                }),
                r = a.calculatePositions(i.width, i.height, t._scroll, n, e),
                s = o.slice(r.xStart, r.xEnd),
                i = e.slice(r.yStart, r.yEnd)
              return y(y({}, n), {
                data: e,
                columns: o,
                scroll: t._scroll,
                $positions: r,
                headerHeight: n.$headerLevel * n.headerRowHeight,
                footerHeight: n.$footerLevel * n.footerRowHeight,
                firstColId: o[0] && o[0].id,
                events: t.events,
                _events: t._events,
                currentColumns: s,
                currentRows: i,
                sortBy: t._sortBy,
                sortDir: t._sortDir,
                content: t.content,
                gridId: t._uid,
              })
            }
            function D(t) {
              if (t && (t.tagName || (t = t._parent._container), t)) {
                var e = t.currentStyle || window.getComputedStyle(t),
                  i = parseFloat(e.paddingLeft) + parseFloat(e.paddingRight) || 0,
                  e = parseFloat(e.paddingTop) + parseFloat(e.paddingBottom) || 0
                return { width: t.clientWidth - i, height: t.clientHeight - e }
              }
            }
            function O(o, t) {
              var e,
                i = w.getCells(o),
                n = w.getSpans(o),
                r = o.columns
              o.$resizing &&
                ((a = h.findIndex(r, function (t) {
                  return t.id === o.$resizing
                })),
                (l = x.getTotalWidth(r.slice(0, a)) + r[a].$width),
                (e = b.el(".dhx_grid-resize-line", {
                  style: { top: 0, left: l, height: o.$totalHeight },
                })))
              var s,
                a =
                  "string" == typeof (a = o.selection ? o.selection.toHTML() : null)
                    ? b.el("div.dhx_selection", { ".innerHTML": a })
                    : a,
                l = o.$positions,
                c = {}
              if (o.eventHandlers)
                for (var d in o.eventHandlers)
                  o.eventHandlers.hasOwnProperty(d) &&
                    ((s = o.eventHandlers[d]),
                    (c[d] = u.eventHandler(function (t) {
                      return (
                        (e = t),
                        (i = u.locate(e, "dhx_id")),
                        (n = u.locate(e, "dhx_col_id")),
                        (t = o.currentRows.filter(function (t) {
                          return t.id === i
                        })[0]),
                        (e = o.currentColumns.filter(function (t) {
                          return t.id === n
                        })[0]),
                        { row: i ? t : {}, col: n ? e : {} }
                      )
                      var e, i, n
                    }, y({}, s))))
              return b.el(
                ".dhx_data-wrap",
                y(
                  {
                    style: {
                      height: o.$totalHeight,
                      width: o.$totalWidth,
                      "padding-left": t.x,
                      "padding-top": t.y,
                    },
                    role: "presentation",
                  },
                  c
                ),
                [
                  b.el(
                    ".dhx_grid_data",
                    y(y({ _flags: b.KEYED_LIST }, w.getHandlers(l.yStart, l.xStart, o)), {
                      role: "rowgroup",
                      "aria-rowcount": o.data.length,
                    }),
                    i
                  ),
                  b.el(".dhx_span-spans", { role: "presentation" }, n),
                  b.el(".dhx_grid_selection", { _ref: "selection", "aria-hidden": "true" }, [a, e]),
                ]
              )
            }
            function M(t, e, i) {
              ;(i = i.height - k), (i = e ? i : i - t.headerHeight)
              return !t.$footer || e ? i : i - t.footerHeight
            }
            function I(e, t, o, r, i) {
              void 0 === o && (o = !0), void 0 === r && (r = !1), void 0 === i && (i = !1)
              var s,
                n =
                  !i && e.$totalHeight >= t.height - e.headerRowHeight ? u.getScrollbarWidth() : 0,
                a = t.width - k - n,
                l = e.columns.filter(function (t) {
                  return !t.hidden
                }),
                n = l.filter(function (t) {
                  return !t.width && !t.$fixed && x.isAutoWidth(e, t)
                }),
                c = x.getTotalWidth(
                  l.filter(function (t) {
                    return t.width || t.$fixed || !x.isAutoWidth(e, t)
                  })
                ),
                d = n.reduce(function (t, e) {
                  return t + (e.gravity || 1)
                }, 0)
              a < e.$totalWidth
                ? ((s = n.reduce(function (t, e) {
                    return t + (e.maxWidth || e.$width)
                  }, 0)),
                  1 < n.length &&
                    n.forEach(function (t) {
                      var e = 0,
                        i =
                          (e = o
                            ? Math.abs(a - s) * ((t.gravity || 1) / d)
                            : Math.abs(a - c) * ((t.gravity || 1) / d)) < t.minWidth,
                        n = e > t.maxWidth
                      i || n
                        ? i
                          ? ((c += t.$width - e), (t.$fixed = !0))
                          : n && ((t.$width = t.maxWidth), (t.$fixed = !0))
                        : (t.$width = e)
                    }))
                : n.forEach(function (t) {
                    var e = Math.abs(a - c) * ((t.gravity || 1) / d),
                      i = e < t.minWidth,
                      n = e > t.maxWidth
                    i || n
                      ? i
                        ? ((c += t.$width - e), r && (t.$fixed = !0))
                        : n && ((t.$width = t.maxWidth), r && (t.$fixed = !0))
                      : (t.$width = e),
                      !o && t.$fixed && delete t.$fixed
                  }),
                o && I(e, t, !1, r, i)
            }
            ;(e.getRenderConfig = S),
              (e.render = function (t, e, i, n, o) {
                e._container || ((e.config.width = 1), (e.config.height = 1)),
                  t &&
                    t.node &&
                    t.node.parent &&
                    t.node.parent.el &&
                    ((m = D(t.node.parent.el)),
                    (e.config.width = m.width),
                    (e.config.height = m.height))
                var r = e.config
                if (!r) return b.el("div")
                if (!r.columns.length) return b.el(".dhx_grid", { dhx_root_id: r.rootParent })
                var s = e.data.getRawData(0, -1, null, 2)
                r.columns.reduce(function (t, e) {
                  return e.hidden && t
                }, !0)
                  ? (r.$totalHeight = 0)
                  : (r.$totalHeight = s.reduce(function (t, e) {
                      return t + (e.$height || 0)
                    }, 0))
                var a = D(e._container),
                  l = {
                    width: r.width || (a && a.width) || 0,
                    height: r.height || (a && a.height) || 0,
                  }
                x.isAutoWidth(r) &&
                  (I(r, l),
                  (r.$totalWidth = x.getTotalWidth(
                    r.columns.filter(function (t) {
                      return !t.hidden
                    })
                  ))),
                  (r.width = l.width),
                  (r.height = l.height)
                var c = S(e, s, l)
                ;(c.selection = n), (c.datacollection = e.data)
                var d,
                  u,
                  h,
                  f,
                  p = w.getShifts(c),
                  _ = x.isCssSupport("position", "sticky"),
                  g = M(c, _, l),
                  v = { wrapper: l, sticky: _, shifts: p, gridBodyHeight: g },
                  m = E.getFixedRows(c, y(y({}, v), { name: "header", position: "top" })),
                  a = c.$footer
                    ? E.getFixedRows(c, y(y({}, v), { name: "footer", position: "bottom" }))
                    : null,
                  s = c.$totalWidth + k < l.width ? "dhx_grid-less-width" : "",
                  n = c.$totalHeight + k < l.height ? "dhx_grid-less-height" : ""
                return (
                  t.node ||
                    ((t = e.getScrollState()),
                    (d = t.x),
                    (u = t.y),
                    b.awaitRedraw().then(function () {
                      e.scroll(d, u)
                    })),
                  b.el(
                    ".dhx_grid.dhx_widget",
                    y(
                      {
                        class:
                          (c.css || "") +
                          (_ ? "" : " dhx_grid_border") +
                          (r.multiselection ? " dhx_no-select--pointer" : ""),
                        dhx_widget_id: o,
                        dhx_root_id: r.rootParent,
                      },
                      ((h = c.data),
                      (f = r.columns),
                      (t = c.editable),
                      (o = c.multiselection),
                      {
                        role: "grid",
                        "aria-rowcount": h.length,
                        "aria-colcount": f.filter(function (t) {
                          return !t.hidden
                        }).length,
                        "aria-readonly": t ? "false" : "true",
                        "aria-multiselectable": o ? "true" : "false",
                      })
                    ),
                    [
                      b.resizer(function (t) {
                        return (
                          x.isAutoWidth(e.config) && t && ((r.$totalWidth = 0), I(r, l, !0, !0)),
                          e.paint()
                        )
                      }),
                      b.el(
                        ".dhx_grid-content",
                        {
                          style: y({}, l),
                          onclick: i.onclick,
                          onmouseover: i.onmouseover,
                          class: (s + " " + n).trim(),
                          role: "presentation",
                        },
                        [
                          _ ? null : m,
                          b.el(
                            ".dhx_grid-body",
                            {
                              style: { height: g, width: l.width - k },
                              onscroll: i.onscroll,
                              _ref: "grid_body",
                              role: "presentation",
                            },
                            [b.el("div", {}, [_ ? m : null, O(c, p), _ ? a : null])]
                          ),
                          C.getFixedColsHeader(c, v),
                          C.getFixedCols(c, v),
                          _ ? null : a,
                        ]
                      ),
                    ]
                  )
                )
              }),
              (e.proRender = function (t, e, i, n, o) {
                e._container || ((e.config.width = 1), (e.config.height = 1)),
                  t &&
                    t.node &&
                    t.node.parent &&
                    t.node.parent.el &&
                    ((g = D(t.node.parent.el)),
                    (e.config.width = g.width),
                    (e.config.height = g.height))
                var r = e.config
                if (!r) return b.el("div")
                if (!r.columns.length) return b.el(".dhx_grid", { dhx_root_id: r.rootParent })
                var s = e.data.getRawData(0, -1, null, 2)
                r.columns.reduce(function (t, e) {
                  return e.hidden && t
                }, !0)
                  ? (r.$totalHeight = 0)
                  : (r.$totalHeight = s.reduce(function (t, e) {
                      return t + (e.$height || 0)
                    }, 0))
                var a = D(e._container),
                  l = {
                    width: r.width || (a && a.width) || 0,
                    height: r.height || (a && a.height) || 0,
                  }
                x.isAutoWidth(r) &&
                  (I(r, l, !0, !1, e.scrollView && e.scrollView.config.enable),
                  (r.$totalWidth = x.getTotalWidth(
                    r.columns.filter(function (t) {
                      return !t.hidden
                    })
                  ))),
                  (r.width = l.width),
                  (r.height = l.height)
                var c = S(e, s, l)
                ;(c.selection = n), (c.datacollection = e.data)
                var d,
                  u,
                  h = w.getShifts(c),
                  f = x.isCssSupport("position", "sticky"),
                  p = M(c, f, l),
                  _ = { wrapper: l, sticky: f, shifts: h, gridBodyHeight: p },
                  g = E.getFixedRows(c, y(y({}, _), { name: "header", position: "top" })),
                  a = c.$footer
                    ? E.getFixedRows(c, y(y({}, _), { name: "footer", position: "bottom" }))
                    : null,
                  s = c.$totalWidth + k < l.width ? "dhx_grid-less-width" : "",
                  n = c.$totalHeight + k < l.height ? "dhx_grid-less-height" : ""
                return (
                  t.node ||
                    ((t = e.getScrollState()),
                    (d = t.x),
                    (u = t.y),
                    b.awaitRedraw().then(function () {
                      e.scroll(d, u)
                    })),
                  (h = b.el("div", {}, [f ? g : null, O(c, h), f ? a : null])),
                  b.el(
                    ".dhx_grid.dhx_widget",
                    {
                      class:
                        (c.css || "") +
                        (f ? "" : " dhx_grid_border") +
                        (r.multiselection ? " dhx_no-select--pointer" : ""),
                      dhx_widget_id: o,
                      dhx_root_id: r.rootParent,
                      role: "grid",
                      "aria-rowcount": c.data.length,
                      "aria-colcount": r.columns.filter(function (t) {
                        return !t.hidden
                      }).length,
                    },
                    [
                      b.resizer(function (t) {
                        return (
                          x.isAutoWidth(e.config) && t && ((r.$totalWidth = 0), I(r, l, !0, !0)),
                          e.paint()
                        )
                      }),
                      b.el(
                        ".dhx_grid-content",
                        {
                          style: y({}, l),
                          onclick: i.onclick,
                          onmouseover: i.onmouseover,
                          class: (s + " " + n).trim(),
                          role: "presentation",
                        },
                        [
                          f ? null : g,
                          b.el(
                            ".dhx_grid-body",
                            {
                              style: { height: p, width: l.width - k },
                              onscroll: i.onscroll,
                              _ref: "grid_body",
                              role: "presentation",
                            },
                            [
                              e.scrollView && e.scrollView.config.enable
                                ? e.scrollView.render([h])
                                : h,
                            ]
                          ),
                          C.getFixedColsHeader(c, _),
                          C.getFixedCols(c, _),
                          f ? null : a,
                        ]
                      ),
                    ]
                  )
                )
              })
          },
          function (t, i, e) {
            "use strict"
            function n(t) {
              for (var e in t) i.hasOwnProperty(e) || (i[e] = t[e])
            }
            Object.defineProperty(i, "__esModule", { value: !0 }), n(e(94)), n(e(49))
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                })
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r,
              s = i(31),
              a = i(45),
              l = i(0),
              o =
                ((r = a.Cell),
                o(c, r),
                (c.prototype.destructor = function () {
                  for (var t in this._all) {
                    var e
                    Object.prototype.hasOwnProperty.call(this._all, t) &&
                      ((e = this._all[t]).getWidget() &&
                        "function" == typeof e.getWidget().destructor &&
                        e.getWidget().destructor(),
                      e.destructor())
                  }
                  ;(this.config =
                    this._cells =
                    this._root =
                    this._xLayout =
                    this._isViewLayout =
                      null),
                    (this._all = {}),
                    this.unmount()
                }),
                (c.prototype.toVDOM = function () {
                  if (this._isViewLayout) {
                    var t = [this.getCell(this.config.activeView).toVDOM()]
                    return r.prototype.toVDOM.call(this, t)
                  }
                  var e = []
                  return (
                    this._inheritTypes(),
                    this._cells.forEach(function (t) {
                      t = t.toVDOM()
                      Array.isArray(t) ? (e = e.concat(t)) : e.push(t)
                    }),
                    r.prototype.toVDOM.call(this, e)
                  )
                }),
                (c.prototype.removeCell = function (e) {
                  if (this.events.fire(s.LayoutEvents.beforeRemove, [e])) {
                    var t = this.config.parent || this
                    if (t !== this) return t.removeCell(e)
                    t = this.getCell(e)
                    t &&
                      ((t = t.getParent()),
                      delete this._all[e],
                      (t._cells = t._cells.filter(function (t) {
                        return t.id != e
                      })),
                      t.paint()),
                      this.events.fire(s.LayoutEvents.afterRemove, [e])
                  }
                }),
                (c.prototype.addCell = function (t, e) {
                  var i
                  void 0 === e && (e = -1),
                    this.events.fire(s.LayoutEvents.beforeAdd, [t.id]) &&
                      ((i = this._createCell(t)),
                      e < 0 && (e = this._cells.length + e + 1),
                      this._cells.splice(e, 0, i),
                      this.paint(),
                      this.events.fire(s.LayoutEvents.afterAdd, [t.id]))
                }),
                (c.prototype.getId = function (t) {
                  return (
                    t < 0 && (t = this._cells.length + t),
                    this._cells[t] ? this._cells[t].id : void 0
                  )
                }),
                (c.prototype.getRefs = function (t) {
                  return this._root.getRootView().refs[t]
                }),
                (c.prototype.getCell = function (t) {
                  return this._root._all[t]
                }),
                (c.prototype.forEach = function (t, e, i) {
                  if ((void 0 === i && (i = 1 / 0), this._haveCells(e) && !(i < 1)))
                    for (
                      var n = (e ? this._root._all[e] : this._root)._cells, o = 0;
                      o < n.length;
                      o++
                    ) {
                      var r = n[o]
                      t.call(this, r, o, n), this._haveCells(r.id) && r.forEach(t, r.id, --i)
                    }
                }),
                (c.prototype.cell = function (t) {
                  return this.getCell(t)
                }),
                (c.prototype._getCss = function (t) {
                  var e = this._xLayout ? "dhx_layout-columns" : "dhx_layout-rows",
                    i = this.config.align ? " " + e + "--" + this.config.align : ""
                  if (t)
                    return (
                      e +
                      " dhx_layout-cell" +
                      (this.config.align ? " dhx_layout-cell--" + this.config.align : "")
                    )
                  var n = this.config.parent
                      ? r.prototype._getCss.call(this)
                      : "dhx_widget dhx_layout",
                    t = this.config.parent ? "" : " dhx_layout-cell"
                  return n + (this.config.full ? t : " " + e) + i
                }),
                (c.prototype._parseConfig = function () {
                  var e = this,
                    t = this.config,
                    i = t.rows || t.cols || t.views || []
                  ;(this._xLayout = !t.rows),
                    (this._cells = i.map(function (t) {
                      return e._createCell(t)
                    }))
                }),
                (c.prototype._createCell = function (t) {
                  var e =
                    t.rows || t.cols || t.views
                      ? ((t.parent = this._root), new c(this, t))
                      : new a.Cell(this, t)
                  return (this._root._all[e.id] = e), t.init && t.init(e, t), e
                }),
                (c.prototype._haveCells = function (t) {
                  if (t) {
                    t = this._root._all[t]
                    return t._cells && 0 < t._cells.length
                  }
                  return 0 < Object.keys(this._all).length
                }),
                (c.prototype._inheritTypes = function (t) {
                  var e,
                    i = this
                  void 0 === t && (t = this._cells),
                    Array.isArray(t)
                      ? t.forEach(function (t) {
                          return i._inheritTypes(t)
                        })
                      : ((e = t.config).rows || e.cols) &&
                        ((t = t.getParent()),
                        !e.type &&
                          t &&
                          (t.config.type ? (e.type = t.config.type) : this._inheritTypes(t)))
                }),
                c)
            function c(t, e) {
              var i = r.call(this, t, e) || this
              return (
                (i._root = i.config.parent || i),
                (i._all = {}),
                i._parseConfig(),
                i.config.activeTab && (i.config.activeView = i.config.activeTab),
                i.config.views &&
                  ((i.config.activeView = i.config.activeView || i._cells[0].id),
                  (i._isViewLayout = !0)),
                e.parent ||
                  ((e = l.create(
                    {
                      render: function () {
                        return i.toVDOM()
                      },
                    },
                    i
                  )),
                  i.mount(t, e)),
                i
              )
            }
            e.Layout = o
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              l =
                (this && this.__assign) ||
                function () {
                  return (l =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r,
              c = i(1),
              d = i(0),
              s = i(6),
              a = i(31),
              u = i(97),
              h = i(5),
              f = i(40),
              o =
                ((r = s.View),
                o(p, r),
                (p.prototype.paint = function () {
                  var t
                  this.isVisible() && ((t = this.getRootView()) ? t.redraw() : this._parent.paint())
                }),
                (p.prototype.isVisible = function () {
                  if (!this._parent)
                    return (
                      !(!this._container || !this._container.tagName) || Boolean(this.getRootNode())
                    )
                  var t = this._parent.config.activeView
                  return (
                    (!t || t === this.id) &&
                    !this.config.hidden &&
                    (!this._parent || this._parent.isVisible())
                  )
                }),
                (p.prototype.hide = function () {
                  this.events.fire(a.LayoutEvents.beforeHide, [this.id]) &&
                    ((this.config.hidden = !0),
                    this._parent && this._parent.paint && this._parent.paint(),
                    this.events.fire(a.LayoutEvents.afterHide, [this.id]))
                }),
                (p.prototype.show = function () {
                  var t = this
                  this.events.fire(a.LayoutEvents.beforeShow, [this.id]) &&
                    (this._parent &&
                    this._parent.config &&
                    void 0 !== this._parent.config.activeView
                      ? (this._parent.config.activeView = this.id)
                      : (this.config.hidden = !1),
                    this._parent && !this._parent.isVisible() && this._parent.show(),
                    this.paint(),
                    this._ui instanceof f.Grid &&
                      this._ui.config.keyNavigation &&
                      d.awaitRedraw().then(function () {
                        t._ui.setColumns(t._ui.config.columns)
                      }),
                    this.events.fire(a.LayoutEvents.afterShow, [this.id]))
                }),
                (p.prototype.expand = function () {
                  this.events.fire(a.LayoutEvents.beforeExpand, [this.id]) &&
                    ((this.config.collapsed = !1),
                    this.events.fire(a.LayoutEvents.afterExpand, [this.id]),
                    this.paint())
                }),
                (p.prototype.collapse = function () {
                  this.events.fire(a.LayoutEvents.beforeCollapse, [this.id]) &&
                    ((this.config.collapsed = !0),
                    this.events.fire(a.LayoutEvents.afterCollapse, [this.id]),
                    this.paint())
                }),
                (p.prototype.toggle = function () {
                  this.config.collapsed ? this.expand() : this.collapse()
                }),
                (p.prototype.getParent = function () {
                  return this._parent
                }),
                (p.prototype.destructor = function () {
                  this.events && this.events.clear(),
                    (this.config = this.events = this.id = null),
                    (this._parent =
                      this._handlers =
                      this._uid =
                      this._disabled =
                      this._resizerHandlers =
                        null),
                    this.unmount()
                }),
                (p.prototype.getWidget = function () {
                  return this._ui
                }),
                (p.prototype.getCellView = function () {
                  return this._parent && this._parent.getRefs(this._uid)
                }),
                (p.prototype.attach = function (t, e) {
                  var i = this
                  return (
                    (this.config.html = null),
                    "object" == typeof t
                      ? (this._ui = t)
                      : "string" == typeof t
                      ? (this._ui = new window.dhx[t](null, e))
                      : "function" == typeof t &&
                        (t.prototype instanceof s.View
                          ? (this._ui = new t(null, e))
                          : (this._ui = {
                              getRootView: function () {
                                return t(e)
                              },
                            })),
                    this.paint(),
                    this._ui instanceof f.Grid &&
                      this._ui.config.keyNavigation &&
                      d.awaitRedraw().then(function () {
                        i._ui.setColumns(i._ui.config.columns)
                      }),
                    this._ui
                  )
                }),
                (p.prototype.attachHTML = function (t) {
                  ;(this.config.html = t), this.paint()
                }),
                (p.prototype.toVDOM = function (t) {
                  if ((null === this.config && (this.config = {}), !this.config.hidden)) {
                    var e,
                      i = this._calculateStyle(),
                      n = c.isDefined(this.config.padding)
                        ? isNaN(Number(this.config.padding))
                          ? { padding: this.config.padding }
                          : { padding: this.config.padding + "px" }
                        : "",
                      i = this.config.full || this.config.html ? i : l(l({}, i), n)
                    this.config.html ||
                      (e = this._ui
                        ? ((o = this._ui.getRootView()).render && (o = d.inject(o)), [o])
                        : t || null)
                    var o =
                        !this.config.resizable || this._isLastCell() || this.config.collapsed
                          ? null
                          : d.el(
                              ".dhx_layout-resizer." +
                                (this._isXDirection()
                                  ? "dhx_layout-resizer--x"
                                  : "dhx_layout-resizer--y"),
                              l(l({}, this._resizerHandlers), {
                                _ref: "resizer_" + this._uid,
                                tabindex: 0,
                              }),
                              [
                                d.el("span.dhx_layout-resizer__icon", {
                                  class:
                                    "dxi " +
                                    (this._isXDirection()
                                      ? "dxi-dots-vertical"
                                      : "dxi-dots-horizontal"),
                                }),
                              ]
                            ),
                      r = {}
                    if (this.config.on)
                      for (var s in this.config.on) r["on" + s] = this.config.on[s]
                    var a = "",
                      t = this.config.cols || this.config.rows
                    if (this.config.type && t)
                      switch (this.config.type) {
                        case "line":
                          a = " dhx_layout-line"
                          break
                        case "wide":
                          a = " dhx_layout-wide"
                          break
                        case "space":
                          a = " dhx_layout-space"
                      }
                    n = d.el(
                      "div",
                      l(
                        l(
                          (((t = { _key: this._uid, _ref: this._uid })["aria-label"] = this.config
                            .id
                            ? "tab-content-" + this.config.id
                            : null),
                          t),
                          r
                        ),
                        {
                          class:
                            this._getCss(!1) +
                            (this.config.css ? " " + this.config.css : "") +
                            (this.config.collapsed ? " dhx_layout-cell--collapsed" : "") +
                            (this.config.resizable ? " dhx_layout-cell--resizable" : "") +
                            (this.config.type && !this.config.full ? a : ""),
                          style: i,
                        }
                      ),
                      this.config.full
                        ? [
                            d.el(
                              "div",
                              {
                                tabindex: this.config.collapsable ? "0" : "-1",
                                role: this.config.collapsable ? "button" : null,
                                "aria-label": this.config.collapsable
                                  ? "click to " + (this.config.collapsed ? "expand" : "collapse")
                                  : null,
                                class:
                                  "dhx_layout-cell-header" +
                                  (this._isXDirection()
                                    ? " dhx_layout-cell-header--col"
                                    : " dhx_layout-cell-header--row") +
                                  (this.config.collapsable
                                    ? " dhx_layout-cell-header--collapseble"
                                    : "") +
                                  (this.config.collapsed
                                    ? " dhx_layout-cell-header--collapsed"
                                    : "") +
                                  (((this.getParent() || {}).config || {}).isAccordion
                                    ? " dhx_layout-cell-header--accordion"
                                    : ""),
                                style: { height: this.config.headerHeight },
                                onclick: this._handlers.toggle,
                                onkeydown: this._handlers.enterCollapse,
                              },
                              [
                                this.config.headerIcon &&
                                  d.el("span.dhx_layout-cell-header__icon", {
                                    class: this.config.headerIcon,
                                  }),
                                this.config.headerImage &&
                                  d.el(".dhx_layout-cell-header__image-wrapper", [
                                    d.el("img", {
                                      src: this.config.headerImage,
                                      class: "dhx_layout-cell-header__image",
                                    }),
                                  ]),
                                this.config.header &&
                                  d.el("h3.dhx_layout-cell-header__title", this.config.header),
                                this.config.collapsable
                                  ? d.el("div.dhx_layout-cell-header__collapse-icon", {
                                      class: this._getCollapseIcon(),
                                    })
                                  : d.el("div.dhx_layout-cell-header__collapse-icon", {
                                      class: "dxi dxi-empty",
                                    }),
                              ]
                            ),
                            this.config.collapsed
                              ? null
                              : d.el(
                                  "div",
                                  {
                                    style: l(l({}, n), {
                                      height:
                                        "calc(100% - " + (this.config.headerHeight || 37) + "px)",
                                    }),
                                    ".innerHTML": this.config.html,
                                    class:
                                      this._getCss(!0) +
                                      " dhx_layout-cell-content" +
                                      (this.config.type ? a : ""),
                                  },
                                  e
                                ),
                          ]
                        : !this.config.html ||
                          (this.config.rows && this.config.cols && this.config.views)
                        ? e
                        : [
                            this.config.collapsed
                              ? null
                              : d.el(".dhx_layout-cell-content", {
                                  ".innerHTML": this.config.html,
                                  style: n,
                                }),
                          ]
                    )
                    return o ? [n, o] : n
                  }
                }),
                (p.prototype._getCss = function (t) {
                  return "dhx_layout-cell"
                }),
                (p.prototype._initHandlers = function () {
                  function e(t) {
                    var e
                    r.isActive &&
                      ((e = (t.targetTouches ? t.targetTouches[0] : t).clientX),
                      (t = (t.targetTouches ? t.targetTouches[0] : t).clientY),
                      (e = r.xLayout
                        ? e - r.range.min + window.pageXOffset
                        : t - r.range.min + window.pageYOffset),
                      (t = r.xLayout ? "width" : "height"),
                      e < 0
                        ? (e = r.resizerLength / 2)
                        : e > r.size && (e = r.size - r.resizerLength),
                      (o.config[t] = e - r.resizerLength / 2 + "px"),
                      (r.nextCell.config[t] = r.size - e - r.resizerLength / 2 + "px"),
                      o.paint(),
                      o.events.fire(a.LayoutEvents.resize, [o.id]))
                  }
                  function i(t) {
                    var e, i, n
                    t.targetTouches && t.preventDefault(),
                      3 !== t.which &&
                        (r.isActive && s(t),
                        o.events.fire(a.LayoutEvents.beforeResizeStart, [o.id]) &&
                          (document.body.classList.add("dhx_no-select--resize"),
                          (i = o.getCellView()),
                          (n = (e = o._getNextCell()).getCellView()),
                          (t = o._getResizerView()),
                          (i = i.el.getBoundingClientRect()),
                          (t = t.el.getBoundingClientRect()),
                          (n = n.el.getBoundingClientRect()),
                          (r.xLayout = o._isXDirection()),
                          (r.left = i.left + window.pageXOffset),
                          (r.top = i.top + window.pageYOffset),
                          (r.margin = u.getMarginSize(o.getParent().config, r.xLayout)),
                          (r.range = u.getBlockRange(i, n, r.xLayout)),
                          (r.size = r.range.max - r.range.min - r.margin),
                          (r.isActive = !0),
                          (r.nextCell = e),
                          (r.resizerLength = r.xLayout ? t.width : t.height)))
                  }
                  var o = this,
                    r = {
                      left: null,
                      top: null,
                      isActive: !(this._handlers = {
                        enterCollapse: function (t) {
                          13 === t.keyCode && o._handlers.toggle()
                        },
                        collapse: function () {
                          o.config.collapsable && o.collapse()
                        },
                        expand: function () {
                          o.config.collapsable && o.expand()
                        },
                        toggle: function () {
                          o.config.collapsable && o.toggle()
                        },
                      }),
                      range: null,
                      xLayout: null,
                      nextCell: null,
                      size: null,
                      resizerLength: null,
                      margin: null,
                    },
                    s = function (t) {
                      ;(r.isActive = !1),
                        document.body.classList.remove("dhx_no-select--resize"),
                        t.targetTouches
                          ? (document.removeEventListener("touchend", s),
                            document.removeEventListener("touchmove", e))
                          : (document.removeEventListener("mouseup", s),
                            document.removeEventListener("mousemove", e)),
                        o.events.fire(a.LayoutEvents.afterResizeEnd, [o.id])
                    }
                  this._resizerHandlers = {
                    onmousedown: function (t) {
                      i(t),
                        document.addEventListener("mouseup", s),
                        document.addEventListener("mousemove", e)
                    },
                    ontouchstart: function (t) {
                      i(t),
                        document.addEventListener("touchend", s),
                        document.addEventListener("touchmove", e)
                    },
                    ondragstart: function (t) {
                      return t.preventDefault()
                    },
                  }
                }),
                (p.prototype._getCollapseIcon = function () {
                  return this._isXDirection() && this.config.collapsed
                    ? "dxi dxi-chevron-right"
                    : this._isXDirection() && !this.config.collapsed
                    ? "dxi dxi-chevron-left"
                    : !this._isXDirection() && this.config.collapsed
                    ? "dxi dxi-chevron-up"
                    : this._isXDirection() || this.config.collapsed
                    ? void 0
                    : "dxi dxi-chevron-down"
                }),
                (p.prototype._isLastCell = function () {
                  var t = this._parent
                  return t && t._cells.indexOf(this) === t._cells.length - 1
                }),
                (p.prototype._getNextCell = function () {
                  var t = this._parent,
                    e = t._cells.indexOf(this)
                  return t._cells[e + 1].config.hidden
                    ? t._cells[e + 1]._getNextCell()
                    : t._cells[e + 1]
                }),
                (p.prototype._getResizerView = function () {
                  return this._parent.getRefs("resizer_" + this._uid)
                }),
                (p.prototype._isXDirection = function () {
                  return this._parent && this._parent._xLayout
                }),
                (p.prototype._calculateStyle = function () {
                  var t = this.config
                  if (t) {
                    var e = {},
                      i = !1,
                      n = !1
                    isNaN(Number(t.width)) || (t.width = t.width + "px"),
                      isNaN(Number(t.height)) || (t.height = t.height + "px"),
                      isNaN(Number(t.minWidth)) || (t.minWidth = t.minWidth + "px"),
                      isNaN(Number(t.minHeight)) || (t.minHeight = t.minHeight + "px"),
                      isNaN(Number(t.maxWidth)) || (t.maxWidth = t.maxWidth + "px"),
                      isNaN(Number(t.maxHeight)) || (t.maxHeight = t.maxHeight + "px"),
                      "content" === t.width && (i = !0),
                      "content" === t.height && (n = !0)
                    var o = t.width,
                      r = t.height,
                      s = t.cols,
                      a = t.rows,
                      l = t.minWidth,
                      c = t.minHeight,
                      d = t.maxWidth,
                      u = t.maxHeight,
                      h = t.gravity,
                      f = t.collapsed,
                      p = t.$fixed,
                      _ = -1 === Math.sign(h) ? 0 : h
                    "boolean" == typeof h && (_ = h ? 1 : 0)
                    var g = "boolean" == typeof h ? !h : -1 === Math.sign(h)
                    this._isXDirection()
                      ? (p || o || (void 0 === h && (l || d))) && (g = !0)
                      : (p || r || (void 0 === h && (c || u))) && (g = !0)
                    var v,
                      g = g ? 0 : _ || 1,
                      _ = this._isXDirection() ? "x" : "y"
                    return (
                      void 0 !== l && (e.minWidth = l),
                      void 0 !== c && (e.minHeight = c),
                      void 0 !== d && (e.maxWidth = d),
                      void 0 !== u && (e.maxHeight = u),
                      void 0 === this._parent && (_ = !0),
                      void 0 !== o && "content" !== o
                        ? (e.width = o)
                        : !0 === _
                        ? (e.width = "100%")
                        : "x" === _ &&
                          (i
                            ? (e.flex = "0 0 auto")
                            : ((v = this._isXDirection() ? "1px" : "auto"),
                              (e.flex = g + " " + (s || a ? "0 " + v : "1 auto")))),
                      void 0 !== r && "content" !== r
                        ? (e.height = r)
                        : !0 === _
                        ? (e.height = "100%")
                        : "y" === _ &&
                          (n
                            ? (e.flex = "0 0 auto")
                            : ((v = this._isXDirection() ? "auto" : "1px"),
                              (e.flex = g + " " + (s || a ? "0 " + v : "1 auto")))),
                      !0 === _ &&
                        void 0 === t.width &&
                        void 0 === t.height &&
                        (e.flex = g + " 1 auto"),
                      f &&
                        (this._isXDirection() ? (e.width = "auto") : (e.height = "auto"),
                        (e.flex = "0 0 auto")),
                      e
                    )
                  }
                }),
                p)
            function p(t, e) {
              e = r.call(this, t, e) || this
              return (
                (e._disabled = []),
                t && t.isVisible && (e._parent = t),
                e._parent && e._parent.events
                  ? (e.events = e._parent.events)
                  : (e.events = new h.EventSystem(e)),
                (e.config.full =
                  void 0 === e.config.full
                    ? Boolean(
                        e.config.header ||
                          e.config.collapsable ||
                          e.config.headerHeight ||
                          e.config.headerIcon ||
                          e.config.headerImage
                      )
                    : e.config.full),
                e._initHandlers(),
                (e.id = e.config.id || c.uid()),
                e
              )
            }
            e.Cell = o
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              ((e = e.PopupEvents || (e.PopupEvents = {})).beforeHide = "beforeHide"),
              (e.beforeShow = "beforeShow"),
              (e.afterHide = "afterHide"),
              (e.afterShow = "afterShow"),
              (e.click = "click")
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              ((e = e.SliderEvents || (e.SliderEvents = {})).change = "change"),
              (e.focus = "focus"),
              (e.blur = "blur"),
              (e.keydown = "keydown"),
              (e.mousedown = "mousedown"),
              (e.mouseup = "mouseup")
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              ((e = e.TimepickerEvents || (e.TimepickerEvents = {})).change = "change"),
              (e.beforeApply = "beforeApply"),
              (e.afterApply = "afterApply"),
              (e.beforeClose = "beforeClose"),
              (e.afterClose = "afterClose"),
              (e.apply = "apply"),
              (e.close = "close"),
              (e.save = "save")
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              ((e = e.CalendarEvents || (e.CalendarEvents = {})).change = "change"),
              (e.beforeChange = "beforechange"),
              (e.modeChange = "modeChange"),
              (e.monthSelected = "monthSelected"),
              (e.yearSelected = "yearSelected"),
              (e.cancelClick = "cancelClick"),
              (e.dateMouseOver = "dateMouseOver"),
              (e.dateHover = "dateHover")
          },
          function (t, i, e) {
            "use strict"
            function n(t) {
              for (var e in t) i.hasOwnProperty(e) || (i[e] = t[e])
            }
            Object.defineProperty(i, "__esModule", { value: !0 }), n(e(51)), n(e(113)), n(e(56))
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              u =
                (this && this.__spreadArrays) ||
                function () {
                  for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length
                  for (var n = Array(t), o = 0, e = 0; e < i; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s]
                  return n
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r = i(1),
              h = i(0),
              s = i(5),
              f = i(2),
              a = i(108),
              l = i(6),
              c = i(4),
              d = i(22),
              p = i(24),
              _ = i(23),
              g = i(112),
              v = i(54),
              m = i(25),
              y = i(55),
              b = i(56)
            function x(t) {
              return t.icon
                ? '<span class="' +
                    t.icon +
                    ' dhx_combobox-options__icon"></span> <span class="dhx_combobox-options__value">' +
                    t.value +
                    "</span>"
                : t.src
                ? '<img src="' +
                  t.src +
                  '" class="dhx_combobox-options__image" alt=' +
                  t.value +
                  '></img> <span class="dhx_combobox-options__value">' +
                  t.value +
                  "</span>"
                : '<span class="dhx_combobox-options__value">' + t.value + "</span>"
            }
            var w,
              o =
                ((w = l.View),
                o(C, w),
                (C.prototype.focus = function () {
                  if (this.config.disabled) return !1
                  this.getRootView().refs.input.el.focus()
                }),
                (C.prototype.blur = function () {
                  if (this.config.disabled) return !1
                  this.getRootView().refs.input.el.blur(), this.popup.hide()
                }),
                (C.prototype.enable = function () {
                  ;(this.config.disabled = !1), this.paint()
                }),
                (C.prototype.disable = function () {
                  ;(this.config.disabled = !0), this.paint()
                }),
                (C.prototype.isDisabled = function () {
                  return this.config.disabled
                }),
                (C.prototype.clear = function () {
                  if (this.config.disabled) return !1
                  this.list.selection.remove(),
                    (this._state.value = ""),
                    this._filter(),
                    this.paint()
                }),
                (C.prototype.getValue = function (t) {
                  var e = this.list.selection.getId()
                  return t ? r.wrapBox(e) : Array.isArray(e) ? e.join(",") : e
                }),
                (C.prototype.setValue = function (t) {
                  return this._setValue(t)
                }),
                (C.prototype.destructor = function () {
                  this.popup && this.popup.destructor(),
                    this.events && this.events.clear(),
                    this.list && this.list.destructor(),
                    this._helper && this._helper.destructor(),
                    this._layout && this._layout.destructor(),
                    (this.config = this.events = this.list = this.popup = null),
                    (this._helper =
                      this._keyListener =
                      this._handlers =
                      this._state =
                      this._uid =
                      this._isPopupConfiqureted =
                        null),
                    this.unmount()
                }),
                (C.prototype.setState = function (t) {
                  switch (t) {
                    case "success":
                      this._state.currentState = b.ComboState.success
                      break
                    case "error":
                      this._state.currentState = b.ComboState.error
                      break
                    default:
                      this._state.currentState = b.ComboState.default
                  }
                  this.paint()
                }),
                (C.prototype._setValue = function (t, e) {
                  var i = this
                  if ((void 0 === e && (e = !1), this.config.disabled || !this._exsistId(t)))
                    return !1
                  this._filter(),
                    this.config.multiselection ||
                      (this.list.selection.remove(), (this._state.value = "")),
                    this.config.multiselection
                      ? ("string" == typeof t && (t = t.split(",")),
                        "number" == typeof t && (t = [t]),
                        t.forEach(function (t) {
                          i.list.selection.add(t, !1, !1, e)
                        }))
                      : ((t = r.unwrapBox(t)),
                        this.list.selection.add(t, !1, !1, e),
                        (t = this.data.getItem(t)) && (this._state.value = this._getItemText(t))),
                    this.paint()
                }),
                (C.prototype._createLayout = function () {
                  var t = (this.list = new p.List(null, {
                      template: this.config.template,
                      virtual: this.config.virtual,
                      keyNavigation: !1,
                      multiselection: this.config.multiselection,
                      itemHeight: this.config.itemHeight,
                      height: this.config.listHeight,
                      data: this.data,
                    })),
                    e = (this._layout = new d.Layout(this.popup.getContainer(), {
                      css: "dhx_combobox-options dhx_combobox__options",
                      rows: [
                        {
                          id: "select-unselect-all",
                          hidden: !this.config.multiselection || !this.config.selectAllButton,
                        },
                        { id: "list", height: "content" },
                        { id: "not-found", hidden: !0 },
                      ],
                      on: {
                        click: { ".dhx_combobox__action-select-all": this._handlers.selectAll },
                      },
                    }))
                  e.getCell("list").attach(t),
                    this.config.multiselection &&
                      this.config.selectAllButton &&
                      e.getCell("select-unselect-all").attach(y.selectAllView)
                }),
                (C.prototype._initHandlers = function () {
                  var i = this
                  this.config.helpMessage &&
                    ((this._helper = new _.Popup({
                      css: "dhx_tooltip dhx_tooltip--forced dhx_tooltip--light",
                    })),
                    this._helper.attachHTML(this.config.helpMessage)),
                    (this._handlers = {
                      showHelper: function (t) {
                        t.preventDefault(),
                          t.stopPropagation(),
                          i._helper.show(t.target, {
                            mode: "left" === i.config.labelPosition ? "bottom" : "right",
                          })
                      },
                      selectAll: function () {
                        i._state.unselectActive
                          ? (i.list.selection.remove(),
                            i.config.selectAllButton &&
                              (i._layout.getCell("select-unselect-all").attach(y.selectAllView),
                              (i._state.unselectActive = !1)))
                          : (i.data.filter(),
                            i.list.selection.add(),
                            i.config.selectAllButton &&
                              (i._layout.getCell("select-unselect-all").attach(y.unselectAllView),
                              (i._state.unselectActive = !0))),
                          i._changePopupPosition(),
                          i.paint()
                      },
                      onkeydown: function (t) {
                        "Tab" === t.key && i.popup.isVisible()
                          ? i._hideOptions()
                          : (i.popup.isVisible() ||
                              t.which !== a.KEY_CODES.DOWN_ARROW ||
                              i._showOptions(),
                            i.popup.isVisible() &&
                              t.which === a.KEY_CODES.RIGHT_ARROW &&
                              i.config.readOnly &&
                              !i.config.multiselection &&
                              (i.list.moveFocus(p.MOVE_DOWN), t.preventDefault()),
                            i.popup.isVisible() &&
                              t.which === a.KEY_CODES.LEFT_ARROW &&
                              i.config.readOnly &&
                              !i.config.multiselection &&
                              (i.list.moveFocus(p.MOVE_UP), t.preventDefault()),
                            i.popup.isVisible() &&
                              t.which === a.KEY_CODES.DOWN_ARROW &&
                              (i.list.moveFocus(p.MOVE_DOWN), t.preventDefault()),
                            i.popup.isVisible() &&
                              t.which === a.KEY_CODES.UP_ARROW &&
                              (i.list.moveFocus(p.MOVE_UP), t.preventDefault()),
                            i.popup.isVisible() && t.which === a.KEY_CODES.ESC && i._hideOptions(),
                            i.popup.isVisible() &&
                              t.which === a.KEY_CODES.ENTER &&
                              (i.setValue(i.list.getFocus()),
                              i.config.multiselection || i._hideOptions())),
                          i.events.fire(b.ComboboxEvents.keydown, [
                            t,
                            i.popup.isVisible() && i.list.getFocus(),
                          ])
                      },
                      onkeyup: function (t) {
                        i.config.multiselection &&
                          !i.config.itemsCount &&
                          (i._state.ignoreNext
                            ? (i._state.ignoreNext = !1)
                            : t.which === a.KEY_CODES.BACKSPACE &&
                              !i._state.value &&
                              i.config.multiselection &&
                              i.list.selection.getId().length &&
                              ((t = (t = i.list.selection.getId())[t.length - 1]),
                              i.list.selection.remove(t),
                              i._changePopupPosition(),
                              i.paint()))
                      },
                      oninput: function (t) {
                        i.config.disabled ||
                          ((t = t.target.value),
                          i.events.fire(b.ComboboxEvents.input, [t]),
                          (i._state.value = t),
                          i._filter(),
                          t.length
                            ? (i._state.canDelete = !1)
                            : ((i._state.ignoreNext = !0), (i._state.canDelete = !0)),
                          i.config.multiselection || (i.list.selection.remove(), i.paint()),
                          i.popup.isVisible() || i._showOptions(),
                          i._updatePopup())
                      },
                      oninputclick: function (t) {
                        if (!i.config.disabled) {
                          if (
                            (i.focus(), t.target.classList.contains("dhx_combobox__action-remove"))
                          ) {
                            var e = f.locate(t)
                            return e
                              ? (i.list.selection.remove(e),
                                i._changePopupPosition(),
                                void i.paint())
                              : void 0
                          }
                          if (t.target.classList.contains("dhx_combobox__action-clear-all"))
                            return (
                              i.list.selection.getId().forEach(function (t) {
                                return i.list.selection.remove(t)
                              }),
                              i.config.selectAllButton &&
                                i._state.unselectActive &&
                                (i._layout.getCell("select-unselect-all").attach(y.selectAllView),
                                (i._state.unselectActive = !1)),
                              void i.paint()
                            )
                          t.preventDefault(), i.popup.isVisible() ? i.focus() : i._showOptions()
                        }
                      },
                      toggleIcon: function () {
                        i.focus(), i.popup.isVisible() ? i._hideOptions() : i._showOptions()
                      },
                      onfocus: function () {
                        var t
                        return null === (t = i.events) || void 0 === t
                          ? void 0
                          : t.fire(b.ComboboxEvents.focus, [])
                      },
                      onblur: function () {
                        var t
                        return null === (t = i.events) || void 0 === t
                          ? void 0
                          : t.fire(b.ComboboxEvents.blur, [])
                      },
                    })
                }),
                (C.prototype._initEvents = function () {
                  var i = this
                  this.data.events.on(c.DataEvents.load, function () {
                    i.config.value && i._setValue(i.config.value, !0)
                  }),
                    this.list.events.on(p.ListEvents.click, function () {
                      i.config.multiselection || i._hideOptions(), i._changePopupPosition()
                    }),
                    this.list.selection.events.on(m.SelectionEvents.afterSelect, function () {
                      var t = i.getValue(i.config.multiselection)
                      i.events.fire(b.ComboboxEvents.change, [t]), i._updateSelectedItem(t)
                    }),
                    this.list.selection.events.on(m.SelectionEvents.afterUnSelect, function () {
                      var t,
                        e = i.config.multiselection
                      ;(i.config.readOnly && !e) ||
                        ((t = i.getValue(e)),
                        i.events.fire(b.ComboboxEvents.change, [t]),
                        e && i._updateSelectedItem(t))
                    }),
                    this.popup.events.on(_.PopupEvents.beforeShow, function () {
                      if (!i.popup.isVisible() && !i._isPopupConfiqureted)
                        return i._configurePopup(), !1
                    }),
                    this.config.readOnly &&
                      this.popup.events.on(_.PopupEvents.afterShow, function () {
                        var t
                        i._state.value
                          ? ((t = i.list.selection.getId()), i.list.setFocus(t))
                          : i.list.setFocus(i.data.getId(0)),
                          i._keyListener.startNewListen(function (t) {
                            return i._findBest(t)
                          })
                      })
                }),
                (C.prototype._showOptions = function () {
                  this.events.fire(b.ComboboxEvents.beforeOpen) &&
                    (this._state.value.length && (this._state.canDelete = !0),
                    this._filter(),
                    this._configurePopup() &&
                      (this.events.fire(b.ComboboxEvents.open),
                      this.events.fire(b.ComboboxEvents.afterOpen)))
                }),
                (C.prototype._configurePopup = function () {
                  this._isPopupConfiqureted = !0
                  var t = this.getRootView()
                  return (
                    !!(t && t.refs && t.refs.holder) &&
                    (this.popup.isVisible() || this._updatePopup(), !0)
                  )
                }),
                (C.prototype._hideOptions = function () {
                  var t = this
                  this.events.fire(b.ComboboxEvents.beforeClose) &&
                    (this.config.readOnly && this._keyListener.endListen(),
                    this.list.setFocus(this.data.getId(0)),
                    this.config.multiselection ||
                      this.config.readOnly ||
                      this.list.selection.contains() ||
                      (this._state.value = ""),
                    h.awaitRedraw().then(function () {
                      return t.popup.isVisible() && t.popup.hide()
                    }),
                    this.events.fire(b.ComboboxEvents.afterClose),
                    this.events.fire(b.ComboboxEvents.close),
                    this._filter(),
                    this.paint())
                }),
                (C.prototype._filter = function () {
                  var t,
                    e = this
                  this.config.readOnly ||
                    (this.data.filter(function (t) {
                      return e.config.filter
                        ? e.config.filter(t, e._state.value)
                        : r.isEqualString(e._state.value, e._getItemText(t))
                    }),
                    this.config.multiselection
                      ? this.list.setFocus(this.data.getId(0))
                      : ((t = this.data.getIndex(this.list.selection.getId())),
                        this.list.setFocus(this.data.getId(-1 < t ? t : 0))),
                    0 === this.data.getLength()
                      ? (this.config.multiselection &&
                          this.config.selectAllButton &&
                          this._layout.getCell("select-unselect-all").hide(),
                        this._layout.getCell("list").hide(),
                        this._layout.getCell("not-found").attach(y.emptyListView),
                        this._layout.getCell("not-found").show())
                      : (this.config.multiselection &&
                          this.config.selectAllButton &&
                          this._layout.getCell("select-unselect-all").show(),
                        this._layout.getCell("not-found").isVisible() &&
                          (this._layout.getCell("list").show(),
                          this._layout.getCell("not-found").hide())))
                }),
                (C.prototype._findBest = function (e) {
                  var i = this,
                    t = this.data.find(function (t) {
                      return r.isEqualString(e, i._getItemText(t))
                    })
                  t &&
                    this.list.selection.getId() !== t.id &&
                    (this.list.setFocus(t.id), this.paint())
                }),
                (C.prototype._exsistId = function (t) {
                  var e = this
                  return t instanceof Array
                    ? t.every(function (t) {
                        return e.data.exists(t)
                      })
                    : this.data.exists(t)
                }),
                (C.prototype._draw = function () {
                  if (!this.config) return h.el("div")
                  var t = this.config,
                    e = t.multiselection,
                    i = t.labelPosition,
                    n = t.hiddenLabel,
                    o = t.required,
                    r = t.disabled,
                    s = t.css,
                    a = t.helpMessage,
                    l = t.readOnly,
                    c = t.placeholder,
                    d = e ? null : this.data.getItem(this.list.selection.getId()),
                    t =
                      !this.list.selection.getId() ||
                      ("object" == typeof this.list.selection.getId() &&
                        0 === this.list.selection.getId().length),
                    e = f.getLabelStyle(this.config)
                  return h.el(
                    "div",
                    {
                      dhx_widget_id: this._uid,
                      onkeydown: this._handlers.onkeydown,
                      onkeyup: this._handlers.onkeyup,
                      class:
                        "dhx_widget dhx_combobox" +
                        ("left" === i ? " dhx_combobox--label-inline" : "") +
                        (n ? " dhx_combobox--sr_only" : "") +
                        (o ? " dhx_combobox--required" : "") +
                        (r ? " dhx_combobox--disabled" : "") +
                        (s ? " " + s : ""),
                    },
                    [
                      e
                        ? h.el(
                            "label.dhx_label.dhx_combobox__label",
                            {
                              style: e.style,
                              class: a ? "dhx_label--with-help" : "",
                              onclick: this._handlers.oninputclick,
                            },
                            a
                              ? [
                                  (e.label || o) && h.el("span.dhx_label__holder", e.label),
                                  h.el("span.dhx_label-help.dxi.dxi-help-circle-outline", {
                                    tabindex: "0",
                                    role: "button",
                                    onclick: this._handlers.showHelper,
                                    id: "dhx_label__help_" + this._uid,
                                  }),
                                ]
                              : e.label
                          )
                        : null,
                      h.el(
                        "div.dhx_combobox-input-box" +
                          (r ? ".dhx_combobox-input-box--disabled" : "") +
                          (l ? ".dhx_combobox-input-box--readonly" : "") +
                          (this._state.currentState === b.ComboState.error
                            ? ".dhx_combobox-input-box--state_error"
                            : "") +
                          (this._state.currentState === b.ComboState.success
                            ? ".dhx_combobox-input-box--state_success"
                            : ""),
                        { _ref: "holder" },
                        [
                          h.el(
                            "div.dhx_combobox-input__icon",
                            { onclick: this._handlers.toggleIcon },
                            [
                              h.el(
                                "span" +
                                  (this.popup.isVisible()
                                    ? ".dxi.dxi-menu-up"
                                    : ".dxi.dxi-menu-down")
                              ),
                            ]
                          ),
                          h.el(
                            "div.dhx_combobox-input-list-wrapper",
                            { onclick: this._handlers.oninputclick },
                            [
                              h.el(
                                "ul.dhx_combobox-input-list",
                                u(this._drawSelectedItems(), [
                                  h.el(
                                    "li.dhx_combobox-input-list__item.dhx_combobox-input-list__item--input",
                                    [
                                      h.el("input.dhx_combobox-input", {
                                        oninput: this._handlers.oninput,
                                        onfocus: this._handlers.onfocus,
                                        onblur: this._handlers.onblur,
                                        _ref: "input",
                                        _key: this._uid,
                                        type: "text",
                                        placeHolder: t && c ? c : void 0,
                                        value: l && d ? this._getItemText(d) : this._state.value,
                                        readOnly: l || r,
                                        required: o,
                                        "aria-label": l ? "Select value" : "Type or select value",
                                        "aria-describedby": a
                                          ? "dhx_label__help_" + this._uid
                                          : null,
                                        "aria-expanded": !0,
                                      }),
                                    ]
                                  ),
                                ])
                              ),
                            ]
                          ),
                        ]
                      ),
                    ]
                  )
                }),
                (C.prototype._drawSelectedItems = function () {
                  var t,
                    i = this
                  if (!this.config.multiselection) return []
                  if (this.config.itemsCount) {
                    var e = this.list.selection.getId().length
                    return e
                      ? [
                          h.el("li.dhx_combobox-input-list__item.dhx_combobox-tag", [
                            h.el(
                              "span.dhx_combobox-tag__value",
                              ((t = e),
                              "function" == typeof (e = this.config.itemsCount)
                                ? e(t)
                                : t + " " + v.default.selectedItems)
                            ),
                            h.el(
                              "button.dhx_button.dhx_combobox-tag__action.dhx_combobox__action-clear-all",
                              { "aria-label": "clear all" },
                              [h.el("span.dhx_button__icon.dxi.dxi-close-circle")]
                            ),
                          ]),
                        ]
                      : []
                  }
                  return this.list.selection.getId().map(function (t) {
                    var e = i.data.getItem(t)
                    return e
                      ? h.el("li.dhx_combobox-input-list__item.dhx_combobox-tag", { dhx_id: t }, [
                          i._drawImageOrIcon(e),
                          h.el("span.dhx_combobox-tag__value", i._getItemText(e)),
                          h.el(
                            "button.dhx_button.dhx_button--icon.dhx_combobox-tag__action.dhx_combobox__action-remove",
                            { type: "button", "aria-label": "remove" },
                            [h.el("span.dhx_button__icon.dxi.dxi-close-circle")]
                          ),
                        ])
                      : null
                  })
                }),
                (C.prototype._drawImageOrIcon = function (t) {
                  return t.src
                    ? h.el("img.dhx_combobox-tag__image", { src: t.src, alt: "" })
                    : t.icon
                    ? h.el("span.dhx_combobox-tag__icon", { class: t.icon })
                    : null
                }),
                (C.prototype._getItemText = function (t) {
                  return t ? t.value : null
                }),
                (C.prototype._updateSelectedItem = function (t) {
                  this.config.multiselection
                    ? (this.config.selectAllButton &&
                      !this._state.unselectActive &&
                      this.data.getLength() === t.length
                        ? (this._layout.getCell("select-unselect-all").attach(y.unselectAllView),
                          (this._state.unselectActive = !0))
                        : this.config.selectAllButton &&
                          this._state.unselectActive &&
                          (this._layout.getCell("select-unselect-all").attach(y.selectAllView),
                          (this._state.unselectActive = !1)),
                      this._state.value &&
                        ((this._state.value = ""),
                        (this._state.canDelete = 0 === t.length),
                        this._filter()))
                    : (this._state.value =
                        null !== (t = this._getItemText(this.data.getItem(t))) && void 0 !== t
                          ? t
                          : ""),
                    this.paint()
                }),
                (C.prototype._changePopupPosition = function () {
                  var t = this
                  this.config.multiselection &&
                    h.awaitRedraw().then(function () {
                      t._updatePopup()
                    })
                }),
                (C.prototype._updatePopup = function () {
                  var t = this.getRootView().refs.holder.el
                  this.popup.getContainer().style.width = t.offsetWidth + "px"
                  var e = this.data.getLength() * (this.config.itemHeight || 36)
                  "string" == typeof this.config.listHeight &&
                    this.config.listHeight.includes("px") &&
                    (this.config.listHeight = this.config.listHeight.replace("px", ""))
                  e = e < this.config.listHeight ? e : this.config.listHeight
                  ;(this.popup.getContainer().style.height =
                    (this.config.selectAllButton && this.config.multiselection ? e + 33 : e) +
                    "px"),
                    this.popup.show(t, { mode: "bottom" })
                }),
                C)
            function C(t, e) {
              var i =
                w.call(
                  this,
                  t,
                  r.extend(
                    { template: x, listHeight: 224, itemHeight: 36, disabled: !1, readOnly: !1 },
                    e
                  )
                ) || this
              ;(i.config.itemsCount = i.config.itemsCount || i.config.showItemsCount),
                (i.config.helpMessage = i.config.helpMessage || i.config.help),
                i.config.cellHeight &&
                  36 === i.config.itemHeight &&
                  (i.config.itemHeight = i.config.cellHeight),
                i.config.labelInline && (i.config.labelPosition = "left"),
                Array.isArray(i.config.data)
                  ? ((i.events = new s.EventSystem(i)),
                    (i.data = new c.DataCollection({})),
                    i.data.parse(i.config.data))
                  : i.config.data
                  ? ((i.data = i.config.data),
                    (i.events = new s.EventSystem(i)),
                    (i.events.context = i))
                  : ((i.events = new s.EventSystem(i)), (i.data = new c.DataCollection({}))),
                (i.popup = new _.Popup()),
                i.popup.events.on(_.PopupEvents.afterShow, function () {
                  i.paint()
                }),
                i.popup.events.on(_.PopupEvents.afterHide, function () {
                  i.config.multiselection && (i._state.value = ""), i.paint()
                }),
                i.popup.events.on(_.PopupEvents.beforeHide, function (t) {
                  t && i._hideOptions()
                }),
                (i.config.readonly || i.config.readOnly) &&
                  ((i.config.readOnly = i.config.readOnly || i.config.readonly),
                  (i._keyListener = new g.KeyListener())),
                (i._state = {
                  value: "",
                  ignoreNext: !1,
                  canDelete: !1,
                  unselectActive: !1,
                  currentState: b.ComboState.default,
                }),
                i._initHandlers(),
                i._createLayout(),
                i.config.value && i._setValue(i.config.value, !0),
                i._initEvents()
              e = h.create({
                render: function () {
                  return i._draw()
                },
                hooks: {
                  didRedraw: function () {
                    i.popup.isVisible() && (i.focus(), i._configurePopup())
                  },
                },
              })
              return i.mount(t, e), i
            }
            e.Combobox = o
          },
          function (t, r, e) {
            "use strict"
            var n,
              i =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              s =
                (this && this.__assign) ||
                function () {
                  return (s =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                },
              a =
                (this && this.__spreadArrays) ||
                function () {
                  for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length
                  for (var n = Array(t), o = 0, e = 0; e < i; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s]
                  return n
                }
            Object.defineProperty(r, "__esModule", { value: !0 })
            var l = e(1),
              c = e(4),
              d = e(0),
              u = e(18),
              h = e(25),
              o = e(6),
              f = e(53),
              p = e(2),
              _ = e(32),
              g = e(109)
            ;(r.MOVE_UP = 1), (r.MOVE_DOWN = 2)
            var v,
              i =
                ((v = o.View),
                i(m, v),
                (m.prototype._didRedraw = function (t) {}),
                (m.prototype._dblClick = function (t) {
                  var e = p.locate(t)
                  e &&
                    ((e = this.data.getItem(e).id),
                    this.config.editable && this.editItem(e),
                    this.events.fire(_.ListEvents.doubleClick, [e, t]))
                }),
                (m.prototype._clearTouchTimer = function () {
                  this._touch.timer && (clearTimeout(this._touch.timer), (this._touch.timer = null))
                }),
                (m.prototype._dragStart = function (t) {
                  var e = this
                  this._touch.start = !0
                  var i = [],
                    n = p.locateNode(t, "dhx_id"),
                    o = n && n.getAttribute("dhx_id"),
                    n = this.selection.getId()
                  return (
                    this.config.multiselection &&
                      n instanceof Array &&
                      (n.map(function (t) {
                        t !== o && e.getRootView().refs[t] && i.push(e.getRootView().refs[t].el)
                      }),
                      (n = a(n))),
                    "string" == typeof n && (n = [n]),
                    this.config.dragMode && !this._edited
                      ? c.dragManager.onMouseDown(t, n || [o], i)
                      : null
                  )
                }),
                (m.prototype.disableSelection = function () {
                  this.selection.disable()
                }),
                (m.prototype.enableSelection = function () {
                  this.selection.enable()
                }),
                (m.prototype.editItem = function (t) {
                  ;(this._edited = t),
                    this.data.getItem(this._edited) &&
                    this.events.fire(_.ListEvents.beforeEditStart, [t])
                      ? (this._getHotkeys(),
                        this.paint(),
                        this.events.fire(_.ListEvents.afterEditStart, [t]))
                      : (this._edited = null)
                }),
                (m.prototype.editEnd = function (t, e) {
                  var i
                  this._edited &&
                    (null !== t &&
                      ((i = this.data.getItem(e)), this.data.update(e, s(s({}, i), { value: t }))),
                    (this._edited = null),
                    this.paint())
                }),
                (m.prototype.getFocusItem = function () {
                  return this.data.getItem(this._focus)
                }),
                (m.prototype.setFocus = function (t) {
                  this._focus != t &&
                    this.data.exists(t) &&
                    ((this._focus = t),
                    this.showItem(t),
                    this.events.fire(_.ListEvents.focusChange, [
                      this.data.getIndex(this._focus),
                      this._focus,
                    ]),
                    this.paint())
                }),
                (m.prototype.getFocus = function () {
                  return this._focus
                }),
                (m.prototype.destructor = function () {
                  this.events && this.events.clear(),
                    this.keyManager && this.keyManager.destructor(),
                    this.selection && this.selection.destructor(),
                    (this.config = this.events = this.selection = this.keyManager = null),
                    (this._handlers =
                      this._focus =
                      this._edited =
                      this._events =
                      this._topOffset =
                      this._visibleHeight =
                      this._touch =
                        null),
                    this.unmount()
                }),
                (m.prototype.showItem = function (t) {
                  var e,
                    i,
                    n,
                    o = this.getRootView()
                  o &&
                    o.node &&
                    o.node.el &&
                    void 0 !== t &&
                    (e = this.getRootNode()) &&
                    ((i = this.config.virtual),
                    (n = this.data.getIndex(t)),
                    (o = Math.floor(n / e.children.length) || 0),
                    (t = e.children[n - e.children.length * o]),
                    (i || t) &&
                      ((o = i ? parseInt(this.config.itemHeight) : t.clientHeight),
                      (t = i ? n * o : t.offsetTop) >= e.scrollTop + e.clientHeight - o
                        ? e.scrollTo(0, t - e.clientHeight + o)
                        : t < e.scrollTop && e.scrollTo(0, t)))
                }),
                (m.prototype._renderItem = function (t, e) {
                  var i = this.config.itemHeight
                  if (t.$empty) return d.el("li", { class: "dhx_list-item", style: { height: i } })
                  var n = (this.config.template && this.config.template(t)) || t.html,
                    o = t.id == this._focus
                  if (t.id == this._edited) return g.getEditor(t, this).toHTML()
                  var r = this.data.getMetaMap(t),
                    o = s(
                      s(
                        s(s({}, this._events), {
                          class:
                            "dhx_list-item" +
                            (r && r.selected ? " dhx_list-item--selected" : "") +
                            (o ? " dhx_list-item--focus" : "") +
                            (r && r.drop && !this._edited ? " dhx_list-item--drophere" : "") +
                            (r && r.drag && !this._edited ? " dhx_list-item--dragtarget" : "") +
                            (this.config.dragMode && !this._edited ? " dhx_list-item--drag" : "") +
                            (t.css ? " " + t.css : ""),
                          dhx_id: t.id,
                          _ref: t.id.toString(),
                          style: { height: i },
                          _key: t.id,
                          ".innerHTML": n,
                        }),
                        this.getItemAriaAttrs(this, t)
                      ),
                      { tabindex: o ? 0 : -1 }
                    )
                  return n
                    ? ((o[".innerHTML"] = n), d.el("li", o))
                    : ((o.class += " dhx_list-item--text"), d.el("li", o, t.text || t.value))
                }),
                (m.prototype._renderList = function () {
                  var i = this,
                    t = this._getRange(),
                    e = this.data.getRawData(t[0], t[1]).map(function (t, e) {
                      return i._renderItem(t, e)
                    })
                  return (
                    this.config.virtual &&
                      (e = a([d.el(".div", { style: { height: t[2] + "px" } })], e, [
                        d.el(".div", { style: { height: t[3] + "px" } }),
                      ])),
                    d.el(
                      "ul.dhx_widget.dhx_list",
                      s(
                        s(
                          {
                            style: { "max-height": this.config.height, position: "relative" },
                            tabindex: 0,
                            class:
                              (this.config.css || "") +
                              (this.config.multiselection && this.selection.getItem()
                                ? " dhx_no-select--pointer"
                                : ""),
                            dhx_widget_id: this._uid,
                          },
                          this._handlers
                        ),
                        this._getListAriaAttrs(this.config, this.data.getLength())
                      ),
                      e
                    )
                  )
                }),
                (m.prototype.moveFocus = function (t, e) {
                  var i,
                    n,
                    o = this.data.getLength()
                  o &&
                    ((n = (i = this._focus) ? this.data.getIndex(i) : -1),
                    (e = e || 1),
                    t === r.MOVE_DOWN
                      ? (i = this.data.getId(Math.min(n + e, o - 1)))
                      : t === r.MOVE_UP && (i = this.data.getId(Math.max(n - e, 0))),
                    this.setFocus(i))
                }),
                (m.prototype._getRange = function () {
                  if (this.config.virtual) {
                    var t = this._visibleHeight || parseInt(this.config.height),
                      e = parseInt(this.config.itemHeight),
                      i = this.data.getLength(),
                      n = this.data.getLength() * e,
                      o = this._topOffset,
                      o = Math.max(0, Math.min(o, n - t)),
                      r = Math.floor(o / e),
                      t = Math.min(i - r, Math.floor(t / e) + 5)
                    return (this._topOffset = o), [r, t + r, r * e, n - e * (t + r)]
                  }
                  return [0, -1, 0, 0]
                }),
                (m.prototype._getHotkeys = function () {
                  var n = this
                  return {
                    arrowDown: function (t) {
                      n.moveFocus(r.MOVE_DOWN), t.preventDefault()
                    },
                    arrowUp: function (t) {
                      n.moveFocus(r.MOVE_UP), t.preventDefault()
                    },
                    escape: function () {
                      n.editEnd(null)
                    },
                    enter: function (t) {
                      var e = n.selection.getItem(),
                        i =
                          e instanceof Array
                            ? null === (i = e[0]) || void 0 === i
                              ? void 0
                              : i.id
                            : null == e
                            ? void 0
                            : e.id
                      n.config.editable && ((e && i === n._focus) || !e)
                        ? n.editItem(n._focus)
                        : n.selection.add(n._focus),
                        n.events.fire(_.ListEvents.click, [n._focus, t])
                    },
                    "shift+enter": function (t) {
                      n.selection.add(n._focus, !1, !0),
                        n.events.fire(_.ListEvents.click, [n._focus, t])
                    },
                    "ctrl+enter": function (t) {
                      n.selection.add(n._focus, !0, !1),
                        n.events.fire(_.ListEvents.click, [n._focus, t])
                    },
                    "ctrl+a": function (t) {
                      n.config.multiselection &&
                        (t.preventDefault(),
                        n.selection.remove(),
                        n.data
                          .map(function (t) {
                            return t.id
                          })
                          .forEach(function (t) {
                            "ctrlClick" === n.config.multiselection
                              ? n.selection.add(t, !0)
                              : n.selection.add(t)
                          }))
                    },
                  }
                }),
                (m.prototype._initHotKey = function () {
                  var t,
                    e = this._getHotkeys()
                  for (t in e) this.keyManager.addHotKey(t, e[t])
                  for (t in this.config.hotkeys)
                    this.keyManager.addHotKey(t, this.config.hotkeys[t])
                }),
                (m.prototype.getItemAriaAttrs = function (t, e) {
                  var i, n, o
                  return s(
                    s(
                      { role: "option", "aria-selected": e.$selected ? "true" : "false" },
                      ((o = e),
                      (n = t).config.dragMode && !n._edited
                        ? { "aria-grabbed": Boolean(o.$dragtarget && !n._edited).toString() }
                        : {})
                    ),
                    (i = t).config.editable
                      ? {
                          "aria-roledescription": i._edited
                            ? "Press Enter to stop editing"
                            : "Double click to edit content",
                        }
                      : {}
                  )
                }),
                (m.prototype._getListAriaAttrs = function (t, e) {
                  return {
                    role: "listbox",
                    "aria-label":
                      "Listbox " +
                      (t.title || "") +
                      ", count of options = " +
                      e +
                      "." +
                      (t.editable ? " Content is editable." : ""),
                    "aria-multiselectable": t.selection && t.multiselection ? "true" : "false",
                    "aria-readonly": t.editable ? "false" : "true",
                  }
                }),
                m)
            function m(t, e) {
              void 0 === e && (e = {})
              var n = this,
                i = e.itemHeight || (e.virtual ? 37 : null)
              i && "number" == typeof i && (i = i.toString() + "px"),
                ((n =
                  v.call(
                    this,
                    t,
                    l.extend({ itemHeight: i, keyNavigation: !0, editable: !1, selection: !0 }, e)
                  ) || this)._touch = {
                  duration: 350,
                  dblDuration: 300,
                  timer: null,
                  start: !1,
                  timeStamp: null,
                })
              e = n.config.data
              e instanceof c.DataCollection
                ? ((n.data = e), (n.events = e.events))
                : ((n.data = new c.DataCollection({})),
                  (n.events = n.data.events),
                  e && n.data.parse(e)),
                (n.selection = new f.Selection(
                  { disabled: !n.config.selection, multiselection: n.config.multiselection },
                  n.data,
                  n.events
                )),
                n.config.keyNavigation &&
                  ((n.keyManager = new u.KeyManager(function (t, e) {
                    return e == n._uid && (!n._edited || (n._edited && "escape" !== t.key))
                  })),
                  n._initHotKey()),
                n.events.on(c.DataEvents.change, function (t, e, i) {
                  "setPage" === e && n.showItem(n.data.getId(i[0])), n.paint()
                }),
                n.events.on(h.SelectionEvents.afterUnSelect, function () {
                  return n.paint()
                }),
                n.events.on(h.SelectionEvents.afterSelect, function (t) {
                  t && n.config.selection && (n._focus = t), n.paint()
                }),
                n.events.on(_.ListEvents.afterEditEnd, n.editEnd.bind(n))
              e = function (e) {
                return function (t) {
                  n.data.setMeta(n.data.getItem(t.target), "drop", e), n.paint()
                }
              }
              n.events.on(c.DragEvents.canDrop, e(!0)), n.events.on(c.DragEvents.cancelDrop, e(!1))
              e = function (e) {
                return function (t) {
                  t.source.map(function (t) {
                    return n.data.setMeta(n.data.getItem(t), "drag", e)
                  }),
                    n.paint()
                }
              }
              n.events.on(c.DragEvents.dragStart, e(!0)),
                n.events.on(c.DragEvents.afterDrag, e(!1)),
                (n._handlers = {
                  onmousedown: function (t) {
                    n._dragStart(t)
                  },
                  ontouchstart: function (t) {
                    ;(n._touch.timer = setTimeout(function () {
                      n._dragStart(t)
                    }, n._touch.duration)),
                      n._touch.timeStamp
                        ? (n._touch.dblDuration >= n._touch.timeStamp - +t.timeStamp.toFixed() &&
                            (t.preventDefault(), n._dblClick(t)),
                          (n._touch.timeStamp = null))
                        : (n._touch.timeStamp = +t.timeStamp.toFixed()),
                      setTimeout(function () {
                        n._touch.timeStamp = null
                      }, n._touch.dblDuration)
                  },
                  ontouchmove: function (t) {
                    n._touch.start && t.preventDefault(), n._clearTouchTimer()
                  },
                  ontouchend: function () {
                    ;(n._touch.start = !1), n._clearTouchTimer()
                  },
                  ondragstart: function () {
                    return !(n.config.dragMode && !n._edited) && null
                  },
                  oncontextmenu: function (t) {
                    var e = p.locate(t)
                    e && n.events.fire(_.ListEvents.itemRightClick, [e, t])
                  },
                  onclick: function (t) {
                    var e = p.locate(t)
                    e &&
                      (n.selection.add(e, t.ctrlKey || t.metaKey, t.shiftKey),
                      (n._focus = e),
                      n.events.fire(_.ListEvents.click, [e, t]),
                      n.paint())
                  },
                  ondblclick: function (t) {
                    n._dblClick(t)
                  },
                  onscroll: function (t) {
                    n.config.virtual &&
                      ((n._topOffset = t.target.scrollTop),
                      (n._visibleHeight = t.target.offsetHeight),
                      n.paint())
                  },
                  onmouseover: function (t) {
                    var e = p.locate(t)
                    e &&
                      e !== p.locate(t.relatedTarget) &&
                      n.events.fire(_.ListEvents.itemMouseOver, [e, t])
                  },
                })
              e = n.config.eventHandlers
              if (e)
                for (var o = 0, r = Object.entries(e); o < r.length; o++) {
                  var s = r[o],
                    a = s[0],
                    s = s[1]
                  n._handlers[a] = p.eventHandler(
                    function (t) {
                      return p.locate(t)
                    },
                    s,
                    n._handlers[a]
                  )
                }
              n.config.dragMode && c.dragManager.setItem(n._uid, n),
                (n._topOffset = n._visibleHeight = 0)
              e = d.create({
                render: function () {
                  return n._renderList()
                },
                hooks: {
                  didMount: function (t) {
                    n.config.virtual && (n._visibleHeight = t.node.el.offsetHeight)
                  },
                  didRedraw: function (t) {
                    return n._didRedraw(t)
                  },
                },
              })
              return n.mount(t, e), n
            }
            r.List = i
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(25),
              o = i(4),
              i =
                ((r.prototype.enable = function () {
                  this.config.disabled = !1
                }),
                (r.prototype.disable = function () {
                  this.remove(), (this.config.disabled = !0)
                }),
                (r.prototype.getId = function () {
                  return this.config.multiselection ? this._selected : this._selected[0]
                }),
                (r.prototype.getItem = function () {
                  var e = this
                  return this.config.multiselection
                    ? this._selected.map(function (t) {
                        return e._data.getItem(t)
                      })
                    : this._selected.length
                    ? this._data.getItem(this._selected[0])
                    : null
                }),
                (r.prototype.contains = function (t) {
                  return t ? this._selected.includes(t) : 0 < this._selected.length
                }),
                (r.prototype.remove = function (t) {
                  var e = this
                  t
                    ? this._unselectItem(t)
                    : (this._selected.forEach(function (t) {
                        return e._unselectItem(t)
                      }),
                      (this._selected = []))
                }),
                (r.prototype.add = function (t, e, i, n) {
                  var o,
                    r = this
                  this.config.disabled ||
                    (void 0 !== t
                      ? ((o = this.config.multiselection),
                        i && this._selected.length && o
                          ? this._addMulti(t, n)
                          : this._addSingle(t, o && ("ctrlClick" !== o || e), n))
                      : this._data
                          .serialize()
                          .filter(function (t) {
                            t = t.id
                            return !r._selected.includes(t)
                          })
                          .forEach(function (t) {
                            t = t.id
                            r._addMulti(t, n)
                          }))
                }),
                (r.prototype.destructor = function () {
                  var e = this
                  this._selected.forEach(function (t) {
                    return e._unselectItem(t, !0)
                  })
                }),
                (r.prototype._addMulti = function (t, e) {
                  var i = this._selected[this._selected.length - 1],
                    n = this._data.getIndex(i),
                    o = this._data.getIndex(t)
                  for (o < n && ((n = (t = [o, n])[0]), (o = t[1])); n <= o; n++) {
                    var r = this._data.getId(n)
                    this._selectItem(r, e)
                  }
                }),
                (r.prototype._addSingle = function (e, t, i) {
                  var n = this
                  t ||
                    this._selected.forEach(function (t) {
                      t != e && n._unselectItem(t)
                    }),
                    t && this._selected.includes(e)
                      ? this._unselectItem(e, i)
                      : this._selectItem(e, i)
                }),
                (r.prototype._selectItem = function (t, e) {
                  var i = this._data.getItem(t)
                  i &&
                    !this._data.getMeta(i, "selected") &&
                    (e || this.events.fire(n.SelectionEvents.beforeSelect, [t])) &&
                    (this._selected.push(t),
                    this._data.setMeta(i, "selected", !0),
                    e || this.events.fire(n.SelectionEvents.afterSelect, [t]))
                }),
                (r.prototype._unselectItem = function (e, t) {
                  ;(t || this.events.fire(n.SelectionEvents.beforeUnSelect, [e])) &&
                    ((this._selected = this._selected.filter(function (t) {
                      return t !== e
                    })),
                    this._data.setMeta(this._data.getItem(e), "selected", !1),
                    t || this.events.fire(n.SelectionEvents.afterUnSelect, [e]))
                }),
                r)
            function r(t, e, i) {
              var n = this
              ;(this.config = t),
                (this.events = i),
                (this._data = e),
                (this._selected = []),
                this._data.events.on(o.DataEvents.removeAll, function () {
                  n._selected = []
                }),
                "string" == typeof this.config.multiselection &&
                  (["click", "ctrlClick"].includes(this.config.multiselection) ||
                    (this.config.multiselection = !1)),
                this._data.events.on(o.DataEvents.beforeRemove, function (t) {
                  var e
                  ;(n._nextSelection = null),
                    1 === n._selected.length &&
                      ((e = n._data.getIndex(t.id)),
                      1 < (t = n._data.getLength()) &&
                        ((e = t == e - 1 ? e - 1 : e + 1), (n._nextSelection = n._data.getId(e))))
                }),
                this._data.events.on(o.DataEvents.afterRemove, function (t) {
                  t = n._selected.indexOf(t.id)
                  ;-1 !== t && n._selected.splice(t, 1),
                    n._nextSelection && (n.add(n._nextSelection), (n._nextSelection = null))
                })
            }
            e.Selection = i
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              (e.default = {
                notFound: "Not Found",
                selectAll: "Select All",
                unselectAll: "Unselect All",
                selectedItems: "selected items",
              })
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(0),
              o = i(54)
            ;(e.selectAllView = function () {
              return n.el(
                ".dhx_list-item.dhx_combobox-options__item.dhx_combobox-options__item--select-all.dhx_combobox__action-select-all",
                o.default.selectAll
              )
            }),
              (e.unselectAllView = function () {
                return n.el(
                  ".dhx_list-item.dhx_combobox-options__item.dhx_combobox-options__item--select-all.dhx_combobox__action-select-all",
                  o.default.unselectAll
                )
              }),
              (e.emptyListView = function () {
                return n.el("ul.dhx_list", [
                  n.el("li.dhx_list-item.dhx_combobox-options__item", {}, o.default.notFound),
                ])
              })
          },
          function (t, e, i) {
            "use strict"
            var n
            Object.defineProperty(e, "__esModule", { value: !0 }),
              ((n = e.ComboboxEvents || (e.ComboboxEvents = {})).change = "change"),
              (n.focus = "focus"),
              (n.blur = "blur"),
              (n.keydown = "keydown"),
              (n.input = "input"),
              (n.beforeOpen = "beforeOpen"),
              (n.afterOpen = "afterOpen"),
              (n.beforeClose = "beforeClose"),
              (n.afterClose = "afterClose"),
              (n.open = "open"),
              (n.close = "close"),
              ((e = e.ComboState || (e.ComboState = {}))[(e.default = 0)] = "default"),
              (e[(e.error = 1)] = "error"),
              (e[(e.success = 2)] = "success")
          },
          function (t, e, i) {
            "use strict"
            var y =
                (this && this.__assign) ||
                function () {
                  return (y =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                },
              a =
                (this && this.__spreadArrays) ||
                function () {
                  for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length
                  for (var n = Array(t), o = 0, e = 0; e < i; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s]
                  return n
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var b = i(0),
              m = i(21),
              x = i(7),
              n = i(3),
              w = 2
            function o(t, e, i, n) {
              i && (i.toLocaleLowerCase().includes("touch") ? e._events : e.events).fire(i, [t, n])
            }
            function C(t, e, i) {
              return {
                onclick: [o, t, i, n.GridEvents[e + "CellClick"]],
                onmouseover: [o, t, i, n.GridEvents[e + "CellMouseOver"]],
                onmousedown: [o, t, i, n.GridEvents[e + "CellMouseDown"]],
                ontouchstart: [o, t, i, n.GridEvents[e + "CellMouseDown"]],
                ondblclick: [o, t, i, n.GridEvents[e + "CellDblClick"]],
                oncontextmenu: [o, t, i, n.GridEvents[e + "CellRightClick"]],
                ontouchmove: [o, t, i, n.GridSystemEvents[e + "CellTouchMove"]],
                ontouchend: [o, t, i, n.GridSystemEvents[e + "CelltouchEnd"]],
              }
            }
            function E(t, e, i, n, o, r, s) {
              void 0 === o && (o = "")
              var a = e.type ? "dhx_" + e.type + "-cell" : "dhx_string-cell",
                t = i.content[t.content] && i.content[t.content].toHtml(e, i),
                l = {}
              return (
                i.columns.forEach(function (t) {
                  var e = !!i.content[t[n][s].content]
                  l[t.id] = (e && i.content[t[n][s].content].toHtml(t, i)) || t[n][s].text
                }),
                b.el("." + a, { style: { class: o.trim(), padding: 0 } }, [
                  t &&
                    ("string" == typeof t || "number" == typeof t
                      ? b.el("div", {
                          class: "dhx_grid-footer-cell-text",
                          role: "presentation",
                          ".innerHTML":
                            e.template && "string" == typeof t ? e.template(t, l, e) : t,
                        })
                      : t),
                ])
              )
            }
            function l(f, t) {
              if (!f.data || !f.columns) return []
              var e,
                p = f.$positions,
                _ = t.name,
                g = f.currentColumns,
                v = f[_ + "RowHeight"] || 40,
                m =
                  ((e = _),
                  (t = (t = g).map(function (t) {
                    return t[e] || [{}]
                  })),
                  x.transpose(t))
              return m.map(function (t, h) {
                return b.el(
                  ".dhx_" + _ + "-row",
                  y({ style: { height: v } }, { role: "row", "aria-rowindex": h + 1 }),
                  t.map(function (n, t) {
                    var e = n.css || "",
                      i = g[t],
                      o = p.xStart + t + 1,
                      r = "dxi dxi-sort-variant dhx_grid-sort-icon",
                      s = "none"
                    f.sortBy &&
                      "" + i.id === f.sortBy &&
                      !n.content &&
                      ((r += " dhx_grid-sort-icon--" + (d = f.sortDir || "asc")),
                      (e += " dhx_grid-" + _ + "-cell--sorted "),
                      (s = "asc" === d ? "ascending" : "descending"))
                    var a = x.isSortable(f, i) && n.text && "footer" !== _ && !1 !== n.headerSort
                    a && (e += " dhx_grid-header-cell--sortable")
                    var l = 0 === t ? "dhx_first-column-cell" : "",
                      c = t === g.length - 1 ? "dhx_last-column-cell" : ""
                    n.content ||
                      (n.align
                        ? (e += " dhx_grid-header-cell--align_" + n.align + " ")
                        : (e +=
                            " dhx_grid-header-cell--" +
                            ("number" === i.type || "percent" === i.type || "date" === i.type
                              ? "align_right"
                              : "align_left") +
                            " ")),
                      (e += l + " " + c)
                    var d = (void 0 !== i.resizable ? i : f).resizable
                    d &&
                      ((d = b.el("div", { class: "dhx_resizer_grip_wrap", "aria-hidden": "true" }, [
                        b.el(
                          "div",
                          {
                            class: "dhx_resizer_grip",
                            dhx_resized: i.id,
                            style: { height: 100 * m.length + "%" },
                          },
                          [b.el("div", { class: "dhx_resizer_grip_line" })]
                        ),
                      ])),
                      ("footer" === _ || 0 < h) && (d = null)),
                      n.align && (e += " dhx_align-" + n.align)
                    l = function (t, e, i) {
                      e = { "aria-colindex": e }
                      return (
                        "footer" === t || n.content
                          ? (e.role = "gridcell")
                          : ((e.role = "columnheader"), (e["aria-sort"] = i)),
                        e
                      )
                    }
                    if (n.content)
                      return b.el(
                        ".dhx_grid-" + _ + "-cell.dhx_grid-custom-content-cell",
                        y(
                          y(
                            {
                              class: e.trim(),
                              dhx_id: i.id,
                              _key: t,
                              style: {
                                width: i.$width,
                                height: "footer" === _ ? v + w / 2 + "px" : v + "px",
                              },
                            },
                            C(i, _, f)
                          ),
                          l(_, o, s)
                        ),
                        [E(n, i, f, _, "", 0, h), d || null]
                      )
                    var u,
                      c = "dhx_grid-header-cell-text_content"
                    return (
                      f.autoHeight && (c += " dhx_grid-header-cell-text_content-auto-height"),
                      b.el(
                        ".dhx_grid-" + _ + "-cell",
                        y(
                          y(
                            {
                              class: e.trim(),
                              dhx_id: i.id,
                              _key: t,
                              style: {
                                width: i.$width,
                                height: "footer" === _ ? v + w / 2 + "px" : v + "px",
                              },
                            },
                            C(i, _, f)
                          ),
                          l(_, o, s)
                        ),
                        [
                          b.el("div.dhx_grid-header-cell-text", { role: "presentation" }, [
                            b.el(
                              "span",
                              y(
                                y(
                                  { class: c },
                                  ((u = n.text),
                                  a ? { role: "button", "aria-label": "Sort by " + u } : {})
                                ),
                                { ".innerHTML": n.text }
                              )
                            ),
                            d || null,
                          ]),
                          a && b.el("div", { class: r, "aria-hidden": "true" }),
                        ]
                      )
                    )
                  })
                )
              })
            }
            function c(u, h) {
              var f = u.columns,
                t = x.transpose(
                  f.map(function (t) {
                    return t[h.name] || []
                  })
                ),
                p = u[h.name + "RowHeight"] || 40,
                _ = h.name,
                g = u.$positions,
                v = 0
              return t.map(function (t, d) {
                return (
                  (v = 0),
                  b.el(
                    ".dhx_span-row",
                    {
                      style: { top: p * d + "px", height: p },
                      class: "dhx_header-row",
                      "aria-hidden": "true",
                    },
                    t
                      .map(function (t, e) {
                        var i = f[e]
                        g.xStart
                        v += i.hidden ? 0 : i.$width
                        var n = 0 === e ? "dhx_first-column-cell" : "",
                          o =
                            e === f.length - 1 || (t.colspan || 0) + (e - 1) >= f.length - 1
                              ? "dhx_last-column-cell"
                              : "",
                          r = p
                        t.rowspan && (r = r * t.rowspan - 1)
                        var s = x.isSortable(u, i) && t.rowspan && t.text && "footer" !== h.name,
                          a = "dxi dxi-sort-variant dhx_grid-sort-icon"
                        u.sortBy &&
                          "" + i.id === u.sortBy &&
                          !t.content &&
                          (a += " dhx_grid-sort-icon--" + (u.sortDir || "asc"))
                        var l = i.align
                            ? "dhx_align-" + i.align
                            : ("number" !== i.type && "percent" !== i.type && "date" !== i.type) ||
                              t.colspan
                            ? "dhx_align-left"
                            : "dhx_align-right",
                          c =
                            "dhx_grid-header-cell " +
                            n +
                            " " +
                            o +
                            " " +
                            (t.rowspan ? "dhx_span-cell__rowspan" : "") +
                            " " +
                            (t.align ? "dhx_align-" + t.align : l) +
                            " " +
                            (t.css || "")
                        s && (c += " dhx_grid-header-cell--sortable"),
                          t.content ||
                            (t.align
                              ? (c += " dhx_grid-header-cell--align_" + t.align + " ")
                              : (c +=
                                  " dhx_grid-header-cell--" +
                                  ("number" === i.type || "percent" === i.type || "date" === i.type
                                    ? "align_right"
                                    : "align_left") +
                                  " "))
                        n = null
                        t.content &&
                          ((n = E(t, i, u, _, c, 0, d)).attrs.style = y(y({}, n.attrs.style), {
                            width: "100%",
                            borderRight: "0",
                          }))
                        o = ""
                        0 < v - i.$width && (o = "1px solid #e4e4e4")
                        l = "dhx_grid-header-cell-text_content"
                        return (
                          u.autoHeight && (l += " dhx_grid-header-cell-text_content-auto-height"),
                          t.colspan || t.rowspan
                            ? b.el(
                                ".dhx_span-cell",
                                y(
                                  {
                                    style: {
                                      width: m.getWidth(f, t.colspan, e),
                                      height: "footer" === _ ? r + w / 2 : r,
                                      left: v - i.$width,
                                      borderLeft: o,
                                      top: p * d,
                                    },
                                    class: c.trim(),
                                    dhx_id: i.id,
                                  },
                                  C(i, _, u)
                                ),
                                [
                                  n || t.rowspan
                                    ? b.el(
                                        "div.dhx_grid-header-cell-text",
                                        { role: "presentation" },
                                        [b.el("span", { class: l, ".innerHTML": t.text })]
                                      )
                                    : b.el("span", { class: l, ".innerHTML": t.text }),
                                  s && b.el("div", { class: a }),
                                ]
                              )
                            : null
                        )
                      })
                      .filter(function (t) {
                        return t
                      })
                  )
                )
              })
            }
            ;(e.getRows = l),
              (e.getFixedSpans = c),
              (e.getFixedRows = function (t, e) {
                var i = l(t, e),
                  n = c(t, e),
                  o = null
                "footer" !== e.name ||
                  e.sticky ||
                  (o =
                    0 <= t.leftSplit &&
                    l(
                      y(y({}, t), {
                        currentColumns: t.columns.slice(0, t.leftSplit),
                        $positions: y(y({}, t.$positions), { xStart: 0, xEnd: t.leftSplit }),
                      }),
                      e
                    ))
                var r,
                  s = (((s = { position: "sticky" })[e.position] = 0), s)
                return (
                  e.sticky ||
                    ((s.left = -t.scroll.left), (r = -t.scroll.left), (s.position = "relative")),
                  b.el(
                    ".dhx_" + e.name + "-wrapper",
                    {
                      class: e.sticky ? "" : "dhx_compatible-" + e.name,
                      style: y(y({}, s), {
                        left: e.sticky ? r : 0,
                        height:
                          "footer" === e.name ? t[e.name + "Height"] + w / 2 : t[e.name + "Height"],
                        width: e.sticky ? t.$totalWidth : e.wrapper.width - w,
                      }),
                      role: "presentation",
                    },
                    [
                      b.el(
                        ".dhx_grid-" + e.name,
                        {
                          style: {
                            height:
                              "footer" === e.name
                                ? t[e.name + "Height"] + w / 2
                                : t[e.name + "Height"],
                            left: r,
                            paddingLeft: e.shifts.x,
                            width: t.$totalWidth,
                          },
                          role: "presentation",
                        },
                        [
                          b.el(
                            ".dhx_" + e.name + "-rows",
                            y({}, { role: "rowgroup", "aria-rowcount": a(i).length }),
                            a(i)
                          ),
                          b.el(
                            ".dhx_" + e.name + "-spans",
                            {
                              style: { marginLeft: -e.shifts.x },
                              class: "dhx_" + e.name + "-rows",
                              role: "presentation",
                            },
                            n
                          ),
                          o &&
                            b.el(
                              ".dhx_" + e.name + "-fixed-cols",
                              {
                                style: {
                                  position: "absolute",
                                  top: 0,
                                  left: t.scroll.left + "px",
                                  height: "100%",
                                },
                              },
                              o
                            ),
                        ]
                      ),
                      b.el("div", { style: { width: t.$totalWidth }, role: "presentation" }),
                    ]
                  )
                )
              })
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              r =
                (this && this.__assign) ||
                function () {
                  return (r =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var s,
              a = i(1),
              l = i(0),
              c = i(2),
              d = i(8),
              u = i(59),
              o =
                ((s = u.Navbar),
                o(h, s),
                (h.prototype.getState = function (t) {
                  if (!a.isDefined(t) || this.data.getItem(t)) {
                    var e,
                      i = {}
                    for (e in (this.data.eachChild(
                      this.data.getRoot(),
                      function (t) {
                        t.twoState && !t.group
                          ? (i[t.id] = t.active)
                          : ("input" !== t.type && "selectButton" !== t.type) || (i[t.id] = t.value)
                      },
                      !1
                    ),
                    this._groups))
                      this._groups[e].active && (i[e] = this._groups[e].active)
                    return t ? i[t] : i
                  }
                }),
                (h.prototype.setState = function (t) {
                  for (var e in t) {
                    var i
                    this._groups && this._groups[e]
                      ? this._groups[e].active &&
                        (this.data.update(this._groups[e].active, { active: !1 }),
                        (this._groups[e].active = t[e]),
                        this.data.update(t[e], { active: !0 }))
                      : "input" === (i = this.data.getItem(e)).type || "selectButton" === i.type
                      ? this.data.update(e, { value: t[e] })
                      : this.data.update(e, { active: t[e] })
                  }
                }),
                (h.prototype._customHandlers = function () {
                  var i = this
                  return {
                    input: function (t) {
                      var e = c.locate(t)
                      i.data.update(e, { value: t.target.value })
                    },
                    tooltip: function (t) {
                      var e = c.locateNode(t)
                      e &&
                        ((t = e.getAttribute("dhx_id")),
                        (t = i.data.getItem(t)).tooltip &&
                          d.tooltip(t.tooltip, { node: e, position: d.Position.bottom }))
                    },
                  }
                }),
                (h.prototype._getFactory = function () {
                  return u.createFactory({
                    widget: this,
                    defaultType: "navItem",
                    allowedTypes: [
                      "button",
                      "imageButton",
                      "selectButton",
                      "navItem",
                      "menuItem",
                      "separator",
                      "spacer",
                      "title",
                      "input",
                      "customHTML",
                      "datePicker",
                      "customHTMLButton",
                    ],
                    widgetName: "toolbar",
                  })
                }),
                (h.prototype._draw = function (t) {
                  var i = this,
                    e = this.data.getLength()
                      ? this.data.reduce(function (t, e) {
                          switch (e.type) {
                            case "title":
                              return t || 20
                            case "button":
                              return "small" === e.size && (!t || t <= 28) ? 28 : t || 32
                            default:
                              return 32
                          }
                        }, 0) + 24
                      : null
                  return l.el(
                    "nav.dhx_widget.dhx_toolbar",
                    { style: { height: e }, class: this.config.css || "" },
                    [
                      l.el(
                        "ul.dhx_navbar.dhx_navbar--horizontal",
                        r(
                          r(
                            { dhx_widget_id: this._uid, tabindex: 0 },
                            { role: "toolbar", "aria-label": t || "" }
                          ),
                          {
                            onclick: this._handlers.onclick,
                            onmousedown: this._handlers.onmousedown,
                            oninput: this._handlers.input,
                            onmouseover: this._handlers.tooltip,
                            _hooks: {
                              didInsert: function (t) {
                                t.el.addEventListener(
                                  "keyup",
                                  function (t) {
                                    var e
                                    9 !== t.which ||
                                      ((e = c.locateNode(document.activeElement)) &&
                                        ((t = e.getAttribute("dhx_id")),
                                        (t = i.data.getItem(t)).tooltip &&
                                          d.tooltip(t.tooltip, {
                                            node: e,
                                            position: d.Position.bottom,
                                            force: !0,
                                          })))
                                  },
                                  !0
                                )
                              },
                            },
                          }
                        ),
                        this.data.map(
                          function (t) {
                            return i._factory(t)
                          },
                          this.data.getRoot(),
                          !1
                        )
                      ),
                    ]
                  )
                }),
                (h.prototype._getMode = function (t, e) {
                  return t.id === e ? "bottom" : "right"
                }),
                (h.prototype._close = function (t) {
                  ;(this._activePosition = null),
                    (this._currentRoot = null),
                    s.prototype._close.call(this, t)
                }),
                (h.prototype._setRoot = function (t) {
                  this.data.getParent(t) === this.data.getRoot() && (this._currentRoot = t)
                }),
                h)
            function h(t, e) {
              var i = s.call(this, t, a.extend({ navigationType: "click" }, e)) || this
              i._currentRoot = null
              return (
                i.mount(
                  t,
                  l.create({
                    render: function () {
                      return i._draw(t)
                    },
                  })
                ),
                i
              )
            }
            e.Toolbar = o
          },
          function (t, i, e) {
            "use strict"
            function n(t) {
              for (var e in t) i.hasOwnProperty(e) || (i[e] = t[e])
            }
            Object.defineProperty(i, "__esModule", { value: !0 }), n(e(125)), n(e(126)), n(e(26))
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(13),
              o = ["byte", "kilobyte", "megabyte", "gigabyte"]
            e.getBasis = function (t, e) {
              return (
                void 0 === t && (t = 0),
                void 0 === e && (e = 0),
                t < 1024 ? t + " " + n.default[o[e]] : this.getBasis(Math.round(t / 1024), e + 1)
              )
            }
            var r
            function s(t) {
              return {
                extension: t.name.split(".").pop() || "none",
                mime: t.file ? t.file.type : "",
              }
            }
            function a(t, e) {
              switch (t) {
                case "jpg":
                case "jpeg":
                case "gif":
                case "png":
                case "bmp":
                case "tiff":
                case "pcx":
                case "svg":
                case "ico":
                  return r.image
                case "avi":
                case "mpg":
                case "mpeg":
                case "rm":
                case "move":
                case "mov":
                case "mkv":
                case "flv":
                case "f4v":
                case "mp4":
                case "3gp":
                case "wmv":
                case "webm":
                case "vob":
                  return r.video
                case "rar":
                case "zip":
                case "tar":
                case "tgz":
                case "arj":
                case "gzip":
                case "bzip2":
                case "7z":
                case "ace":
                case "apk":
                case "deb":
                case "zipx":
                case "cab":
                case "tar-gz":
                case "rpm":
                case "xar":
                  return r.archive
                case "xlr":
                case "xls":
                case "xlsm":
                case "xlsx":
                case "ods":
                case "csv":
                case "tsv":
                  return r.table
                case "doc":
                case "docx":
                case "docm":
                case "dot":
                case "dotx":
                case "odt":
                case "wpd":
                case "wps":
                case "pages":
                  return r.document
                case "wav":
                case "aiff":
                case "au":
                case "mp3":
                case "aac":
                case "wma":
                case "ogg":
                case "flac":
                case "ape":
                case "wv":
                case "m4a":
                case "mid":
                case "midi":
                  return r.audio
                case "pot":
                case "potm":
                case "potx":
                case "pps":
                case "ppsm":
                case "ppsx":
                case "ppt":
                case "pptx":
                case "pptm":
                case "odp":
                  return r.presentation
                case "html":
                case "htm":
                case "eml":
                  return r.web
                case "exe":
                  return r.application
                case "dmg":
                  return r.apple
                case "pdf":
                case "ps":
                case "eps":
                  return r.pdf
                case "psd":
                  return r.psd
                case "txt":
                case "djvu":
                case "nfo":
                case "xml":
                  return r.text
                default:
                  switch (e.split("/")[0]) {
                    case "image":
                      return r.image
                    case "audio":
                      return r.audio
                    case "video":
                      return r.video
                    default:
                      return r.other
                  }
              }
            }
            ;(e.truncateWord = function (t, e) {
              if ((void 0 === e && (e = 13), t.length <= e)) return t
              var i,
                n = t.lastIndexOf(".")
              return (
                (-1 === n
                  ? ((i = t.substr(t.length - 4)), t.substr(0, e - 7))
                  : ((n = n - 3), (i = t.substr(n)), t.substr(0, e - (t.length - n)))) +
                "..." +
                i
              )
            }),
              (e.calculateCover = function (t) {
                var e,
                  i,
                  n,
                  o = t.width,
                  r = t.height,
                  o =
                    1 < (t = o / r)
                      ? ((e = i = r), (n = (o - i) / 2), 0)
                      : t < 1
                      ? ((n = 0), (r - (e = i = o)) / 2)
                      : ((i = e = o), (n = 0))
                return { sx: n, sy: o, sWidth: i, sHeight: e, dx: 0, dy: 0 }
              }),
              ((i = r = e.FileType || (e.FileType = {})).image = "image"),
              (i.video = "video"),
              (i.archive = "archive"),
              (i.table = "table"),
              (i.document = "document"),
              (i.presentation = "presentation"),
              (i.application = "application"),
              (i.web = "web"),
              (i.apple = "apple"),
              (i.pdf = "pdf"),
              (i.psd = "psd"),
              (i.audio = "audio"),
              (i.other = "other"),
              (i.text = "text"),
              (e.getFileType = a),
              (e.getFileClassName = function (t) {
                var e = s(t),
                  t = e.mime
                return a((e = e.extension), t) + " extension-" + e
              }),
              (e.isImage = function (t) {
                var e = s(t),
                  t = e.mime
                return a(e.extension, t) === r.image
              }),
              (e.removeItem = function (t, e) {
                t.exists(e) &&
                  (t.update(e, { $toRemove: !0 }),
                  setTimeout(function () {
                    t.update(e, { $toRemove: !1 }, !0), t.remove(e)
                  }, 200))
              })
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              u =
                (this && this.__assign) ||
                function () {
                  return (u =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r,
              s = i(1),
              h = i(0),
              a = i(24),
              f = i(143),
              o =
                ((r = a.List),
                o(l, r),
                (l.prototype.showItem = function (t) {
                  var e,
                    i,
                    n,
                    o = this.getRootView()
                  o &&
                    o.node &&
                    o.node.el &&
                    void 0 !== t &&
                    (e = this.getRootNode()) &&
                    ((i = this.config.virtual),
                    (n = this.data.getIndex(t)),
                    (o = Math.floor(n / this.config.itemsInRow)),
                    (t = Math.ceil(o / e.children.length) || 0),
                    (t = e.children[o - e.children.length * t]),
                    (i || t) &&
                      ((t = t.children[n % this.config.itemsInRow]),
                      (n = parseInt(this.config.gap.toString().replace("px", ""), null)),
                      t.offsetTop >= e.clientHeight + e.scrollTop - t.clientHeight
                        ? (e.scrollTop = t.offsetTop - e.clientHeight + t.clientHeight + n)
                        : t.offsetTop < e.scrollTop - n && (e.scrollTop = t.offsetTop - n)))
                }),
                (l.prototype._didRedraw = function (t) {
                  var e = t.node.el,
                    i = e.scrollHeight > e.offsetHeight,
                    e = t.node.attrs.class.replace(" dhx_dataview--has-scroll", ""),
                    e = i ? e + " dhx_dataview--has-scroll" : e
                  t.node.patch({ class: e })
                }),
                (l.prototype._renderItem = function (t, e) {
                  function i(t) {
                    return parseFloat(t)
                  }
                  var n = this.config,
                    o = n.itemsInRow,
                    r = n.gap,
                    s = n.template,
                    a = n.itemHeight,
                    l = s ? s(t) : t.htmlContent,
                    c = t.id == this._focus,
                    d = (e + 1) % this.config.itemsInRow == 0
                  if (t.id == this._edited) return f.getEditor(t, this).toHTML(d)
                  ;(n = t.id.toString()), (e = this.data.getMetaMap(t))
                  return h.el(
                    "div",
                    u(
                      u(
                        {
                          class:
                            "dhx_dataview-item" +
                            (e && e.selected ? " dhx_dataview-item--selected" : "") +
                            (c ? " dhx_dataview-item--focus" : "") +
                            (e && e.drop && !this._edited ? " dhx_dataview-item--drophere" : "") +
                            (e && e.drag && !this._edited ? " dhx_dataview-item--dragtarget" : "") +
                            (this.config.dragMode && !this._edited
                              ? " dhx_dataview-item--drag"
                              : "") +
                            (i(r) ? " dhx_dataview-item--with-gap" : "") +
                            (t.css ? " " + t.css : "") +
                            (d ? " dhx_dataview-item--last-item-in-row" : ""),
                          style: {
                            width: "calc(" + 100 / o + "% - " + i(r) + " * " + (o - 1) / o + "px)",
                            "margin-right": d ? "" : r,
                            height: s ? null : a,
                          },
                          _key: n,
                          dhx_id: n,
                          _ref: n,
                        },
                        this.getDataViewItemAriaAttrs(this, t)
                      ),
                      { tabindex: c ? 0 : -1 }
                    ),
                    l
                      ? [
                          h.el(".dhx_dataview-item__inner-html", {
                            ".innerHTML": l,
                            role: "presentation",
                          }),
                        ]
                      : t.value || t.text || t.value
                  )
                }),
                (l.prototype._renderList = function () {
                  var n = this,
                    t = this.data.getRawData(0, -1),
                    e = this.config,
                    o = e.itemsInRow,
                    i = e.css,
                    r = e.gap,
                    s = 0,
                    t = t.reduce(function (t, e, i) {
                      return (
                        0 === s && t.push([]),
                        t[t.length - 1].push(n._renderItem(e, i)),
                        (s = (s + 1) % o),
                        t
                      )
                    }, [])
                  return h.el(
                    "",
                    u(
                      u(
                        u(u({}, this._handlers), {
                          dhx_widget_id: this._uid,
                          class:
                            (i || "") +
                            " dhx_widget dhx_dataview" +
                            (this.config.multiselection && this.selection.getItem()
                              ? " dhx_no-select--pointer"
                              : ""),
                          style: { height: this.config.height },
                        }),
                        this.getDataViewAriaAttrs(this.config, this.data.getLength(), t.length, o)
                      ),
                      { tabindex: 0 }
                    ),
                    t.map(function (t, e) {
                      return h.el(
                        ".dhx_dataview-row",
                        { style: { margin: r }, "aria-label": "Row " + (e + 1) },
                        t
                      )
                    })
                  )
                }),
                (l.prototype._getHotkeys = function () {
                  var e = this,
                    t = r.prototype._getHotkeys.call(this)
                  return (
                    (t.arrowUp = function (t) {
                      e.moveFocus(a.MOVE_UP, e.config.itemsInRow), t.preventDefault()
                    }),
                    (t.arrowDown = function (t) {
                      e.moveFocus(a.MOVE_DOWN, e.config.itemsInRow), t.preventDefault()
                    }),
                    (t.arrowLeft = function (t) {
                      e.moveFocus(a.MOVE_UP), t.preventDefault()
                    }),
                    (t.arrowRight = function (t) {
                      e.moveFocus(a.MOVE_DOWN), t.preventDefault()
                    }),
                    t
                  )
                }),
                (l.prototype.getDataViewItemAriaAttrs = function (t, e) {
                  var i, n, o
                  return u(
                    u(
                      { role: "option", "aria-selected": e.$selected ? "true" : "false" },
                      ((o = e),
                      (n = t).config.dragMode && !n._edited
                        ? { "aria-grabbed": Boolean(o.$dragtarget && !n._edited).toString() }
                        : {})
                    ),
                    (i = t).config.editable
                      ? {
                          "aria-roledescription": i._edited
                            ? "Press Enter to stop editing"
                            : "Double click to edit content",
                        }
                      : {}
                  )
                }),
                (l.prototype.getDataViewAriaAttrs = function (t, e, i, n) {
                  return {
                    role: "listbox",
                    "aria-label":
                      "Dataview, " +
                      e +
                      " options on " +
                      i +
                      " rows, " +
                      n +
                      " options per row." +
                      (t.editable ? " Content is editable." : ""),
                    "aria-multiselectable": t.selection && t.multiselection ? "true" : "false",
                    "aria-readonly": t.editable ? "false" : "true",
                  }
                }),
                l)
            function l(t, e) {
              return (
                void 0 === e && (e = {}),
                r.call(this, t, s.extend({ itemsInRow: 1, gap: "0px" }, e)) || this
              )
            }
            e.DataView = o
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              ((e = e.DataViewEvents || (e.DataViewEvents = {})).click = "click"),
              (e.doubleClick = "doubleclick"),
              (e.focusChange = "focuschange"),
              (e.beforeEditStart = "beforeEditStart"),
              (e.afterEditStart = "afterEditStart"),
              (e.beforeEditEnd = "beforeEditEnd"),
              (e.afterEditEnd = "afterEditEnd"),
              (e.itemRightClick = "itemRightClick"),
              (e.itemMouseOver = "itemMouseOver"),
              (e.contextmenu = "contextmenu")
          },
          function (t, e, i) {
            i(64), i(65), i(66), i(67), i(68), i(69), i(77), i(78), (t.exports = i(79))
          },
          function (t, e) {
            ;(Object.values =
              Object.values ||
              function (e) {
                var t = Object.prototype.toString.call(e)
                if (null == e) throw new TypeError("Cannot convert undefined or null to object")
                if (
                  ~[
                    "[object String]",
                    "[object Object]",
                    "[object Array]",
                    "[object Function]",
                  ].indexOf(t)
                ) {
                  if (Object.keys)
                    return Object.keys(e).map(function (t) {
                      return e[t]
                    })
                  var i,
                    n = []
                  for (i in e) e.hasOwnProperty(i) && n.push(e[i])
                  return n
                }
                return []
              }),
              Object.assign ||
                Object.defineProperty(Object, "assign", {
                  enumerable: !1,
                  configurable: !0,
                  writable: !0,
                  value: function (t) {
                    "use strict"
                    for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i]
                    if (null == t) throw new TypeError("Cannot convert first argument to object")
                    for (var n = Object(t), o = 0; o < e.length; o++) {
                      var r = e[o]
                      if (null != r)
                        for (var s = Object.keys(Object(r)), a = 0, l = s.length; a < l; a++) {
                          var c = s[a],
                            d = Object.getOwnPropertyDescriptor(r, c)
                          void 0 !== d && d.enumerable && (n[c] = r[c])
                        }
                    }
                    return n
                  },
                })
          },
          function (t, e) {
            Array.prototype.includes ||
              Object.defineProperty(Array.prototype, "includes", {
                value: function (t, e) {
                  if (null == this) throw new TypeError('"this" is null or not defined')
                  var i = Object(this),
                    n = i.length >>> 0
                  if (0 == n) return !1
                  var o,
                    r,
                    e = 0 | e,
                    s = Math.max(0 <= e ? e : n - Math.abs(e), 0)
                  for (; s < n; ) {
                    if (
                      (o = i[s]) === (r = t) ||
                      ("number" == typeof o && "number" == typeof r && isNaN(o) && isNaN(r))
                    )
                      return !0
                    s++
                  }
                  return !1
                },
                configurable: !0,
                writable: !0,
              }),
              Array.prototype.find ||
                Object.defineProperty(Array.prototype, "find", {
                  value: function (t) {
                    if (null == this) throw new TypeError('"this" is null or not defined')
                    var e = Object(this),
                      i = e.length >>> 0
                    if ("function" != typeof t) throw new TypeError("predicate must be a function")
                    for (var n = arguments[1], o = 0; o < i; ) {
                      var r = e[o]
                      if (t.call(n, r, o, e)) return r
                      o++
                    }
                  },
                  configurable: !0,
                  writable: !0,
                }),
              Array.prototype.findIndex ||
                (Array.prototype.findIndex = function (t) {
                  if (null == this)
                    throw new TypeError("Array.prototype.findIndex called on null or undefined")
                  if ("function" != typeof t) throw new TypeError("predicate must be a function")
                  for (
                    var e, i = Object(this), n = i.length >>> 0, o = arguments[1], r = 0;
                    r < n;
                    r++
                  )
                    if (((e = i[r]), t.call(o, e, r, i))) return r
                  return -1
                })
          },
          function (t, e) {
            String.prototype.includes ||
              (String.prototype.includes = function (t, e) {
                "use strict"
                return (
                  "number" != typeof e && (e = 0),
                  !(e + t.length > this.length) && -1 !== this.indexOf(t, e)
                )
              }),
              String.prototype.startsWith ||
                Object.defineProperty(String.prototype, "startsWith", {
                  enumerable: !1,
                  configurable: !0,
                  writable: !0,
                  value: function (t, e) {
                    return (e = e || 0), this.indexOf(t, e) === e
                  },
                }),
              String.prototype.padStart ||
                (String.prototype.padStart = function (t, e) {
                  return (
                    (t >>= 0),
                    (e = String(e || " ")),
                    this.length > t
                      ? String(this)
                      : ((t -= this.length) > e.length && (e += e.repeat(t / e.length)),
                        e.slice(0, t) + String(this))
                  )
                }),
              String.prototype.padEnd ||
                (String.prototype.padEnd = function (t, e) {
                  return (
                    (t >>= 0),
                    (e = String(e || " ")),
                    this.length > t
                      ? String(this)
                      : ((t -= this.length) > e.length && (e += e.repeat(t / e.length)),
                        String(this) + e.slice(0, t))
                  )
                })
          },
          function (t, e) {
            var i, n, o, r
            Element &&
              !Element.prototype.matches &&
              ((i = Element.prototype).matches =
                i.matchesSelector ||
                i.mozMatchesSelector ||
                i.msMatchesSelector ||
                i.oMatchesSelector ||
                i.webkitMatchesSelector),
              "classList" in SVGElement.prototype ||
                Object.defineProperty(SVGElement.prototype, "classList", {
                  get: function () {
                    var i = this
                    return {
                      contains: function (t) {
                        return -1 !== i.className.baseVal.split(" ").indexOf(t)
                      },
                      add: function (t) {
                        return i.setAttribute("class", i.getAttribute("class") + " " + t)
                      },
                      remove: function (t) {
                        var e = i
                          .getAttribute("class")
                          .replace(new RegExp("(\\s|^)".concat(t, "(\\s|$)"), "g"), "$2")
                        i.classList.contains(t) && i.setAttribute("class", e)
                      },
                      toggle: function (t) {
                        this.contains(t) ? this.remove(t) : this.add(t)
                      },
                    }
                  },
                  configurable: !0,
                }),
              Object.entries ||
                ((n = Function.bind.call(Function.call, Array.prototype.reduce)),
                (o = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable)),
                (r = Function.bind.call(Function.call, Array.prototype.concat)),
                (Object.entries = function (i) {
                  return n(
                    Object.keys(i),
                    function (t, e) {
                      return r(t, "string" == typeof e && o(i, e) ? [[e, i[e]]] : [])
                    },
                    []
                  )
                })),
              Event.prototype.composedPath ||
                (Event.prototype.composedPath = function () {
                  if (this.path) return this.path
                  var t = this.target
                  for (this.path = []; null !== t.parentNode; )
                    this.path.push(t), (t = t.parentNode)
                  return this.path.push(document, window), this.path
                })
          },
          function (t, e) {
            Math.sign =
              Math.sign ||
              function (t) {
                return 0 === (t = +t) || isNaN(t) ? t : 0 < t ? 1 : -1
              }
          },
          function (t, e, i) {
            "use strict"
            i.r(e)
            var n,
              o = i(8),
              e = i(35),
              r = [
                "dhx_638523928_message",
                "undefined",
                "Please contact us at <a style='color: white;' href='mailto:contact@dhtmlx.com?subject=DHTMLX Licensing - Trial End' target='_blank'>contact@dhtmlx.com</a> or visit ",
                " target='_blank'>dhtmlx.com</a> in order to obtain a proper license.",
                "Your evaluation period for DHTMLX has expired.",
                "now",
                "1648190733000",
                "join",
                "<a style='color: white;' href='https://dhtmlx.com/docs/products/licenses.shtml?expand=1&utm_source=trial&utm_medium=popup&utm_campaign=second_month#suite'",
              ]
            ;(n = r),
              (function (t) {
                for (; --t; ) n.push(n.shift())
              })(150)
            function s(t, e) {
              return r[(t -= 374)]
            }
            setTimeout(function () {
              var t,
                e,
                i = s,
                n = [i(382), i(380), i(377) + i(381)][i(376)]("<br>")
              typeof i(375) !== i(379) &&
                setInterval(function () {
                  var t,
                    e = i
                  ;(t = i),
                    2592e6 < Date[t(374)]() - t(375) &&
                      Object(o.message)({ text: n, icon: "dxi-close", css: e(378) })
                }, ((t = 6e4), (e = 12e4), Math.floor(Math.random() * (e - t + 1)) + t))
            }, 1)
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r = i(1),
              s = i(2),
              a = i(27),
              l = new WeakMap(),
              c = new Map()
            function d(t, e) {
              var i = document.createElement("div")
              return (
                i.setAttribute("data-position", e),
                (i.className =
                  "dhx_message-container dhx_message-container--" +
                  e +
                  (t === document.body ? " dhx_message-container--in-body" : "")),
                i
              )
            }
            function u(t, e) {
              e && clearTimeout(l.get(t))
              var i = t.parentNode,
                n = i.getAttribute("data-position"),
                o = i.parentNode,
                e = c.get(o)
              e &&
                (!(e = e[n]) ||
                  (-1 !== (e = (n = e.stack).indexOf(t)) &&
                    (i.removeChild(t), n.splice(e, 1), 0 === n.length && o.removeChild(i))))
            }
            e.message = function (t) {
              "string" == typeof t && (t = { text: t }),
                (t.position = t.position || a.MessageContainerPosition.topRight)
              var e = document.createElement("div")
              ;(e.className = "dhx_widget dhx_message " + (t.css || "")),
                e.setAttribute("role", "alert"),
                (o = t.text && r.uid()) && e.setAttribute("aria-describedby", o),
                t.html
                  ? (e.innerHTML = t.html)
                  : (e.innerHTML =
                      '<span class="dhx_message__text" id=' +
                      o +
                      ">" +
                      t.text +
                      "</span>\n\t\t" +
                      (t.icon ? '<span class="dhx_message__icon dxi ' + t.icon + '"></span>' : ""))
              var i = t.node ? s.toNode(t.node) : document.body
              "static" === getComputedStyle(i).position && (i.style.position = "relative"),
                (o = c.get(i))
                  ? o[t.position] || (o[t.position] = { stack: [], container: d(i, t.position) })
                  : c.set(
                      i,
                      (((n = {})[t.position] = { stack: [], container: d(i, t.position) }), n)
                    )
              var n = (o = c.get(i)[t.position]).stack,
                o = o.container
              0 === n.length && i.appendChild(o),
                n.push(e),
                o.appendChild(e),
                t.expire &&
                  ((t = setTimeout(function () {
                    return u(e)
                  }, t.expire)),
                  l.set(e, t)),
                (e.onclick = function () {
                  return u(e, !0)
                })
            }
          },
          function (t, n, o) {
            "use strict"
            ;(function (t) {
              Object.defineProperty(n, "__esModule", { value: !0 })
              var e = o(33),
                i = o(34),
                c = o(1)
              n.alert = function (s) {
                var a = s.buttons && s.buttons[0] ? s.buttons[0] : e.default.apply,
                  l = i.blockScreen(s.blockerCss)
                return new t(function (e) {
                  var t = "dhx_alert__" + c.uid() + "_content",
                    i = "dhx_alert__" + c.uid() + "_header",
                    n = document.createElement("div")
                  n.setAttribute("role", "alert"),
                    n.setAttribute("aria-modal", "true"),
                    s.text && n.setAttribute("aria-describedby", t),
                    s.header && n.setAttribute("aria-labelledby", i),
                    (n.className = "dhx_widget dhx_alert " + (s.css || ""))
                  var o = function (t) {
                    ;("Escape" !== t.key && "Esc" !== t.key) || (r(t), e(!1))
                  }
                  function r(t) {
                    t.preventDefault(),
                      l(),
                      document.body.removeChild(n),
                      document.removeEventListener("keydown", o)
                  }
                  ;(n.innerHTML =
                    "\n\t\t\t" +
                    (s.header
                      ? "<div id=" + i + ' class="dhx_alert__header"> ' + s.header + " </div>"
                      : "") +
                    "\n\t\t\t" +
                    (s.text
                      ? "<div id=" + t + ' class="dhx_alert__content">' + s.text + "</div>"
                      : "") +
                    '\n\t\t\t<div class="dhx_alert__footer ' +
                    (s.buttonsAlignment ? "dhx_alert__footer--" + s.buttonsAlignment : "") +
                    '">\n\t\t\t\t<button type="button" aria-label="confirm" class="dhx_alert__apply-button dhx_button dhx_button--view_flat dhx_button--color_primary dhx_button--size_medium">' +
                    a +
                    "</button>\n\t\t\t</div>"),
                    document.body.appendChild(n),
                    n.querySelector(".dhx_alert__apply-button").focus(),
                    n.querySelector("button").addEventListener("click", function (t) {
                      r(t), e(!0)
                    }),
                    document.addEventListener("keydown", o)
                })
              }
            }.call(this, o(9)))
          },
          function (t, o, r) {
            ;(function (t) {
              var e = (void 0 !== t && t) || ("undefined" != typeof self && self) || window,
                i = Function.prototype.apply
              function n(t, e) {
                ;(this._id = t), (this._clearFn = e)
              }
              ;(o.setTimeout = function () {
                return new n(i.call(setTimeout, e, arguments), clearTimeout)
              }),
                (o.setInterval = function () {
                  return new n(i.call(setInterval, e, arguments), clearInterval)
                }),
                (o.clearTimeout = o.clearInterval =
                  function (t) {
                    t && t.close()
                  }),
                (n.prototype.unref = n.prototype.ref = function () {}),
                (n.prototype.close = function () {
                  this._clearFn.call(e, this._id)
                }),
                (o.enroll = function (t, e) {
                  clearTimeout(t._idleTimeoutId), (t._idleTimeout = e)
                }),
                (o.unenroll = function (t) {
                  clearTimeout(t._idleTimeoutId), (t._idleTimeout = -1)
                }),
                (o._unrefActive = o.active =
                  function (t) {
                    clearTimeout(t._idleTimeoutId)
                    var e = t._idleTimeout
                    0 <= e &&
                      (t._idleTimeoutId = setTimeout(function () {
                        t._onTimeout && t._onTimeout()
                      }, e))
                  }),
                r(73),
                (o.setImmediate =
                  ("undefined" != typeof self && self.setImmediate) ||
                  (void 0 !== t && t.setImmediate) ||
                  (this && this.setImmediate)),
                (o.clearImmediate =
                  ("undefined" != typeof self && self.clearImmediate) ||
                  (void 0 !== t && t.clearImmediate) ||
                  (this && this.clearImmediate))
            }.call(this, r(28)))
          },
          function (t, e, i) {
            ;(function (t, p) {
              !(function (i, n) {
                "use strict"
                var o, r, s, a, l, c, e, d, t
                function u(t) {
                  delete r[t]
                }
                function h(t) {
                  if (s) setTimeout(h, 0, t)
                  else {
                    var e = r[t]
                    if (e) {
                      s = !0
                      try {
                        !(function (t) {
                          var e = t.callback,
                            i = t.args
                          switch (i.length) {
                            case 0:
                              e()
                              break
                            case 1:
                              e(i[0])
                              break
                            case 2:
                              e(i[0], i[1])
                              break
                            case 3:
                              e(i[0], i[1], i[2])
                              break
                            default:
                              e.apply(n, i)
                          }
                        })(e)
                      } finally {
                        u(t), (s = !1)
                      }
                    }
                  }
                }
                function f(t) {
                  t.source === i &&
                    "string" == typeof t.data &&
                    0 === t.data.indexOf(d) &&
                    h(+t.data.slice(d.length))
                }
                i.setImmediate ||
                  ((o = 1),
                  (s = !(r = {})),
                  (a = i.document),
                  (t =
                    (t = Object.getPrototypeOf && Object.getPrototypeOf(i)) && t.setTimeout
                      ? t
                      : i),
                  (l =
                    "[object process]" === {}.toString.call(i.process)
                      ? function (t) {
                          p.nextTick(function () {
                            h(t)
                          })
                        }
                      : (function () {
                          if (i.postMessage && !i.importScripts) {
                            var t = !0,
                              e = i.onmessage
                            return (
                              (i.onmessage = function () {
                                t = !1
                              }),
                              i.postMessage("", "*"),
                              (i.onmessage = e),
                              t
                            )
                          }
                        })()
                      ? ((d = "setImmediate$" + Math.random() + "$"),
                        i.addEventListener
                          ? i.addEventListener("message", f, !1)
                          : i.attachEvent("onmessage", f),
                        function (t) {
                          i.postMessage(d + t, "*")
                        })
                      : i.MessageChannel
                      ? (((e = new MessageChannel()).port1.onmessage = function (t) {
                          h(t.data)
                        }),
                        function (t) {
                          e.port2.postMessage(t)
                        })
                      : a && "onreadystatechange" in a.createElement("script")
                      ? ((c = a.documentElement),
                        function (t) {
                          var e = a.createElement("script")
                          ;(e.onreadystatechange = function () {
                            h(t), (e.onreadystatechange = null), c.removeChild(e), (e = null)
                          }),
                            c.appendChild(e)
                        })
                      : function (t) {
                          setTimeout(h, 0, t)
                        }),
                  (t.setImmediate = function (t) {
                    "function" != typeof t && (t = new Function("" + t))
                    for (var e = new Array(arguments.length - 1), i = 0; i < e.length; i++)
                      e[i] = arguments[i + 1]
                    return (t = { callback: t, args: e }), (r[o] = t), l(o), o++
                  }),
                  (t.clearImmediate = u))
              })("undefined" == typeof self ? (void 0 === t ? this : t) : self)
            }.call(this, i(28), i(74)))
          },
          function (t, e) {
            var i,
              n,
              t = (t.exports = {})
            function o() {
              throw new Error("setTimeout has not been defined")
            }
            function r() {
              throw new Error("clearTimeout has not been defined")
            }
            function s(e) {
              if (i === setTimeout) return setTimeout(e, 0)
              if ((i === o || !i) && setTimeout) return (i = setTimeout), setTimeout(e, 0)
              try {
                return i(e, 0)
              } catch (t) {
                try {
                  return i.call(null, e, 0)
                } catch (t) {
                  return i.call(this, e, 0)
                }
              }
            }
            !(function () {
              try {
                i = "function" == typeof setTimeout ? setTimeout : o
              } catch (t) {
                i = o
              }
              try {
                n = "function" == typeof clearTimeout ? clearTimeout : r
              } catch (t) {
                n = r
              }
            })()
            var a,
              l = [],
              c = !1,
              d = -1
            function u() {
              c && a && ((c = !1), a.length ? (l = a.concat(l)) : (d = -1), l.length && h())
            }
            function h() {
              if (!c) {
                var t = s(u)
                c = !0
                for (var e = l.length; e; ) {
                  for (a = l, l = []; ++d < e; ) a && a[d].run()
                  ;(d = -1), (e = l.length)
                }
                ;(a = null),
                  (c = !1),
                  (function (e) {
                    if (n === clearTimeout) return clearTimeout(e)
                    if ((n === r || !n) && clearTimeout) return (n = clearTimeout), clearTimeout(e)
                    try {
                      n(e)
                    } catch (t) {
                      try {
                        return n.call(null, e)
                      } catch (t) {
                        return n.call(this, e)
                      }
                    }
                  })(t)
              }
            }
            function f(t, e) {
              ;(this.fun = t), (this.array = e)
            }
            function p() {}
            ;(t.nextTick = function (t) {
              var e = new Array(arguments.length - 1)
              if (1 < arguments.length)
                for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i]
              l.push(new f(t, e)), 1 !== l.length || c || s(h)
            }),
              (f.prototype.run = function () {
                this.fun.apply(null, this.array)
              }),
              (t.title = "browser"),
              (t.browser = !0),
              (t.env = {}),
              (t.argv = []),
              (t.version = ""),
              (t.versions = {}),
              (t.on = p),
              (t.addListener = p),
              (t.once = p),
              (t.off = p),
              (t.removeListener = p),
              (t.removeAllListeners = p),
              (t.emit = p),
              (t.prependListener = p),
              (t.prependOnceListener = p),
              (t.listeners = function (t) {
                return []
              }),
              (t.binding = function (t) {
                throw new Error("process.binding is not supported")
              }),
              (t.cwd = function () {
                return "/"
              }),
              (t.chdir = function (t) {
                throw new Error("process.chdir is not supported")
              }),
              (t.umask = function () {
                return 0
              })
          },
          function (t, n, o) {
            "use strict"
            ;(function (t) {
              Object.defineProperty(n, "__esModule", { value: !0 })
              var e = o(33),
                i = o(34),
                h = o(1)
              n.confirm = function (l) {
                l.buttonsAlignment = l.buttonsAlignment || "right"
                var c = l.buttons && l.buttons[1] ? l.buttons[1] : e.default.apply,
                  d = l.buttons && l.buttons[0] ? l.buttons[0] : e.default.reject,
                  u = i.blockScreen(l.blockerCss)
                return new t(function (e) {
                  var i = document.createElement("div")
                  i.setAttribute("role", "alertdialog"), i.setAttribute("aria-modal", "true")
                  var n,
                    t = l.header && h.uid(),
                    o = l.header && h.uid()
                  o && i.setAttribute("aria-describedby", o),
                    t && i.setAttribute("aria-labelledby", t)
                  function r(t) {
                    u(),
                      i.removeEventListener("click", s),
                      document.removeEventListener("keydown", a),
                      document.body.removeChild(i),
                      e(t)
                  }
                  var s = function (t) {
                      "BUTTON" === t.target.tagName &&
                        r(t.target.classList.contains("dhx_alert__confirm-aply"))
                    },
                    a = function (t) {
                      "Escape" === t.key || "Esc" === t.key
                        ? (i.querySelector(".dhx_alert__confirm-aply").focus(),
                          r(t.target.classList.contains("dhx_alert__confirm-reject")))
                        : "Tab" === t.key &&
                          ("aply" === n
                            ? ((n = "reject"),
                              i.querySelector(".dhx_alert__confirm-reject").focus())
                            : ((n = "aply"), i.querySelector(".dhx_alert__confirm-aply").focus()),
                          t.preventDefault())
                    }
                  ;(i.className =
                    "dhx_widget dhx_alert dhx_alert--confirm" + (l.css ? " " + l.css : "")),
                    (i.innerHTML =
                      "\n\t\t" +
                      (l.header
                        ? '<div class="dhx_alert__header" id=' + t + "> " + l.header + " </div>"
                        : "") +
                      "\n\t\t" +
                      (l.text
                        ? '<div class="dhx_alert__content" id=' + o + ">" + l.text + "</div>"
                        : "") +
                      '\n\t\t\t<div class="dhx_alert__footer ' +
                      (l.buttonsAlignment ? "dhx_alert__footer--" + l.buttonsAlignment : "") +
                      '">\n\t\t\t\t<button type="button" aria-label="reject" class="dhx_alert__confirm-reject dhx_button dhx_button--view_link dhx_button--color_primary dhx_button--size_medium">' +
                      d +
                      '</button>\n\t\t\t\t<button type="button"  aria-label="aply"class="dhx_alert__confirm-aply dhx_button dhx_button--view_flat dhx_button--color_primary dhx_button--size_medium">' +
                      c +
                      "</button>\n\t\t\t</div>"),
                    document.body.appendChild(i),
                    (n = "aply"),
                    i.querySelector(".dhx_alert__confirm-aply").focus(),
                    i.addEventListener("click", s),
                    document.addEventListener("keydown", a)
                })
              }
            }.call(this, o(9)))
          },
          function (t, e, i) {
            "use strict"
            var n =
              (this && this.__assign) ||
              function () {
                return (n =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var o = i(2),
              d = i(27),
              u = 750,
              h = 200
            function c(t, e, i, n) {
              var o, r, s
              switch (e) {
                case d.Position.center:
                  return (
                    (r = t.left + window.pageXOffset + (t.width - i) / 2) + 8 <
                      window.pageXOffset && (r = t.left + window.pageXOffset),
                    {
                      left: r,
                      top: (s = t.top + window.pageYOffset + (t.height - n) / 2),
                      pos: (o = d.RealPosition.center),
                    }
                  )
                case d.Position.right:
                  return (
                    (o = d.RealPosition.right),
                    (r = t.right + window.pageXOffset) + i + 8 >
                      window.innerWidth + window.pageXOffset &&
                      ((r = window.pageXOffset + t.left - i), (o = d.RealPosition.left)),
                    { left: r, top: (s = window.pageYOffset + t.top + (t.height - n) / 2), pos: o }
                  )
                case d.Position.bottom:
                default:
                  return (
                    (r = window.pageXOffset + t.left + (t.width - i) / 2) + i >
                    window.innerWidth + window.pageXOffset
                      ? (r = window.innerWidth + window.pageXOffset - i)
                      : r < 0 && (r = 0),
                    (o = d.RealPosition.bottom),
                    (s = window.pageYOffset + t.bottom) + n + 8 >
                      window.innerHeight + window.pageYOffset &&
                      ((s = window.pageYOffset + t.top - n), (o = d.RealPosition.top)),
                    { left: r, top: s, pos: o }
                  )
              }
            }
            e.findPosition = c
            var f = document.createElement("div"),
              p = document.createElement("span")
            ;(p.className = "dhx_tooltip__text"),
              f.appendChild(p),
              f.setAttribute("role", "tooltip"),
              (f.style.position = "absolute")
            var _,
              g = null,
              v = !1,
              m = null,
              y = null
            function b(t) {
              return t &&
                t.classList.contains("dhx_popup--window") &&
                t.classList.contains("dhx_popup--window_active")
                ? 2147483647
                : (null != t && t.classList.contains("dhx_popup--window")) ||
                  (null != t && t.classList.contains("dhx_popup--window_modal"))
                ? 2147483646
                : t && t.offsetParent
                ? b(t.offsetParent)
                : null
            }
            function x(t, e, i, n, o, r) {
              void 0 === o && (o = !1)
              var s = t.getBoundingClientRect()
              r ? (p.innerHTML = e) : (p.textContent = e),
                document.body.appendChild(f),
                (f.className = "dhx_widget dhx_tooltip" + (o ? " dhx_tooltip--forced" : ""))
              var e = f.getBoundingClientRect(),
                e = c(s, i, e.width, e.height),
                a = e.left,
                l = e.top,
                e = e.pos,
                t = b(t)
              switch ((t && (f.style.zIndex = t.toString()), e)) {
                case d.RealPosition.bottom:
                case d.RealPosition.top:
                case d.RealPosition.left:
                case d.RealPosition.right:
                case d.RealPosition.center:
                  ;(f.style.left = a + "px"), (f.style.top = l + "px")
              }
              ;(f.className += " dhx_tooltip--" + e + " " + (n || "")),
                (v = !0),
                o ||
                  setTimeout(function () {
                    f.className += " dhx_tooltip--animate"
                  })
            }
            function r(e, t, i) {
              var n = i.force,
                o = i.showDelay,
                r = i.hideDelay,
                s = i.position,
                a = i.css,
                l = i.htmlEnable
              n ||
                (y = setTimeout(function () {
                  x(e, t, s || d.Position.bottom, a, !1, l)
                }, o || u))
              var c = function () {
                var t
                v &&
                  ((t = r),
                  g &&
                    (m = setTimeout(function () {
                      document.body.removeChild(f), (v = !1), (m = null)
                    }, t || h))),
                  clearTimeout(y),
                  e.removeEventListener("mouseleave", c),
                  e.removeEventListener("blur", c),
                  document.removeEventListener("mousedown", c),
                  (_ = g = null)
              }
              n && x(e, t, s, a, n, l),
                e.addEventListener("mouseleave", c),
                e.addEventListener("blur", c),
                document.addEventListener("mousedown", c),
                (_ = c)
            }
            function s(t, e) {
              var i = o.toNode(e.node)
              i !== g &&
                (_ && (_(), (_ = null)),
                (g = i),
                m ? (clearTimeout(m), (m = null), r(i, t, n(n({}, e), { force: !0 }))) : r(i, t, e))
            }
            function a(t) {
              t = o.locateNode(t, "dhx_tooltip_text")
              t &&
                s(t.getAttribute("dhx_tooltip_text"), {
                  position: t.getAttribute("dhx_tooltip_position") || d.Position.bottom,
                  node: t,
                })
            }
            ;(e.getZIndex = b),
              (e.tooltip = s),
              (e.enableTooltip = function () {
                document.addEventListener("mousemove", a)
              }),
              (e.disableTooltip = function () {
                document.removeEventListener("mousemove", a)
              })
          },
          function (t, e, i) {
            "use strict"
            i.r(e)
            var n,
              s = i(8),
              e = i(35),
              o = [
                "contact@dhtmlx.com</a> or visit <a style='color: #0288d1;text-decoration: unset;' href='https://dhtmlx.com/docs/products/licenses.shtml?expand=1&utm_source=trial&utm_medium=",
                "1648190733000",
                "https://dhtmlx.com/docs/products/licenses.shtml?expand=1&utm_source=trial&utm_medium=popup&utm_campaign=second_month#suite",
                "random",
                "popup&utm_campaign=second_month#suite' target='_blank'>dhtmlx.com</a> in order to obtain a proper license.",
                "<svg class='dhx_alert__header--icon' xmlns='http://www.w3.org/2000/sv' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 24 24'><path d='M11,15H13V17H",
                "now",
                "right",
                "floor",
                "open",
                "_blank",
                "Please contact us at <a style='color: #0288d1;text-decoration: unset;' href='mailto:contact@dhtmlx.com?subject=DHTMLX Licensing - Trial End' target='_blank'>",
                "dhx_547239261_alert",
                "16.42 16.42,20 12,20Z'></path></svg><div class='dhx_alert__header--text'>Your evaluation period for DHTMLX has expired</div>",
              ]
            ;(n = o),
              (function (t) {
                for (; --t; ) n.push(n.shift())
              })(148)
            function a(t, e) {
              return o[(t -= 257)]
            }
            setTimeout(function () {
              var t,
                e,
                i,
                n = a,
                o =
                  n(269) +
                  "11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20," +
                  n(263),
                r = n(261) + n(264) + n(268)
              void 0 !== n(265) &&
                setInterval(function () {
                  var t,
                    e = n
                  ;(t = n),
                    5184e6 < Date[t(270)]() - t(265) &&
                      Object(s.alert)({
                        header: o,
                        text: r,
                        buttonsAlignment: e(257),
                        buttons: ["check licensing"],
                        css: e(262),
                      }).then(function () {
                        var t = e
                        window[t(259)](t(266), t(260))
                      })
                }, ((t = 6e4), (e = 12e4), (i = n), Math[i(258)](Math[i(267)]() * (e - t + 1)) + t))
            }, 1)
          },
          function (t, e) {
            var i,
              n = ["1648190733000", "random", "undefined", "floor", "now"]
            ;(i = n),
              (function (t) {
                for (; --t; ) i.push(i.shift())
              })(179)
            function o(t, e) {
              return n[(t -= 168)]
            }
            setTimeout(function () {
              var t,
                e,
                i,
                n = o
              typeof n(170) !== n(172) &&
                setInterval(function () {
                  var t
                  ;(t = n),
                    7776e6 < Date[t(169)]() - t(170) &&
                      alert(
                        "Your evaluation period for DHTMLX has expired.\nPlease contact us at contact@dhtmlx.com or visit dhtmlx.com in order to obtain a proper license."
                      )
                }, ((t = 6e4), (e = 12e4), (i = n), Math[i(168)](Math[i(171)]() * (e - t + 1)) + t))
            }, 1)
          },
          function (t, o, e) {
            "use strict"
            function i(t) {
              for (var e in t) o.hasOwnProperty(e) || (o[e] = t[e])
            }
            Object.defineProperty(o, "__esModule", { value: !0 }), e(80)
            var n = e(13),
              r = e(4)
            o.DataCollection = r.DataCollection
            r = e(8)
            ;(o.message = r.message), i(e(123)), i(e(17))
            e = window
            ;(o.i18n = e.dhx && e.dhx.i18n ? e.dhx.i18 : {}),
              (o.i18n.setLocale = function (t, e) {
                var i,
                  n = o.i18n[t]
                for (i in e) n[i] = e[i]
              }),
              (o.i18n.vault = o.i18n.vault || n.default)
          },
          function (t, e, i) {},
          function (t, i, n) {
            "use strict"
            ;(function (s) {
              var l =
                (this && this.__assign) ||
                function () {
                  return (l =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                }
              Object.defineProperty(i, "__esModule", { value: !0 })
              var c = n(11),
                d = n(10),
                t =
                  ((e.prototype.load = function (t, e) {
                    var i = this
                    if (!t.config || this._parent.events.fire(d.DataEvents.beforeLazyLoad, []))
                      return (this._parent.loadData = t
                        .load()
                        .then(function (t) {
                          return t ? i.parse(t, e) : []
                        })
                        .catch(function (t) {
                          i._parent.events.fire(d.DataEvents.loadError, [t])
                        }))
                  }),
                  (e.prototype.parse = function (t, e) {
                    var n = this
                    if (
                      (void 0 === e && (e = d.DataDriver.json),
                      "json" !== e ||
                        c.hasJsonOrArrayStructure(t) ||
                        this._parent.events.fire(d.DataEvents.loadError, [
                          "Uncaught SyntaxError: Unexpected end of input",
                        ]),
                      !((t = (e = c.toDataDriver(e)).toJsonArray(t)) instanceof Array))
                    ) {
                      var i = t.total_count - 1,
                        o = t.from
                      if (((t = t.data), 0 !== this._parent.getLength()))
                        return (
                          t.forEach(function (t, e) {
                            var i = o + e,
                              e = n._parent.getId(i)
                            e
                              ? (i = n._parent.getItem(e)) &&
                                i.$empty &&
                                (n._parent.changeId(e, t.id, !0),
                                n._parent.update(t.id, l(l({}, t), { $empty: void 0 }), !0))
                              : c.dhxWarning("item not found")
                          }),
                          this._parent.events.fire(d.DataEvents.afterLazyLoad, [o, t.length]),
                          this._parent.events.fire(d.DataEvents.change),
                          t
                        )
                      for (var r = [], s = 0, a = 0; s <= i; s++)
                        o <= s && s <= o + t.length - 1
                          ? (r.push(t[a]), a++)
                          : r.push({ $empty: !0 })
                      t = r
                    }
                    return (
                      this._parent.getInitialData() && this._parent.removeAll(),
                      this._parent.$parse(t),
                      t
                    )
                  }),
                  (e.prototype.save = function (o) {
                    for (var r = this, e = this, t = 0, i = this._changes.order; t < i.length; t++)
                      !(function (i) {
                        var n, t
                        i.saving || i.pending
                          ? c.dhxWarning("item is saving")
                          : (n = e._findPrevState(i.id)) && n.saving
                          ? ((t = new s(function (t, e) {
                              n.promise
                                .then(function () {
                                  ;(i.pending = !1), t(r._setPromise(i, o))
                                })
                                .catch(function (t) {
                                  r._removeFromOrder(n), r._setPromise(i, o), c.dhxWarning(t), e(t)
                                })
                            })),
                            e._addToChain(t),
                            (i.pending = !0))
                          : e._setPromise(i, o)
                      })(i[t])
                    this._changes.order.length &&
                      this._parent.saveData.then(function () {
                        r._saving = !1
                      })
                  }),
                  (e.prototype.updateChanges = function (t) {
                    this._changes = t
                  }),
                  (e.prototype._setPromise = function (e, t) {
                    var i,
                      n = this
                    switch (e.status) {
                      case "remove":
                        i = "delete"
                        break
                      case "add":
                        i = "insert"
                        break
                      default:
                        i = e.status
                    }
                    return (
                      (e.promise = t.save(e.obj, i)),
                      e.promise
                        .then(function () {
                          n._removeFromOrder(e)
                        })
                        .catch(function (t) {
                          ;(e.saving = !1), (e.error = !0), c.dhxError(t)
                        }),
                      (e.saving = !0),
                      (this._saving = !0),
                      this._addToChain(e.promise),
                      e.promise
                    )
                  }),
                  (e.prototype._addToChain = function (t) {
                    this._parent.saveData && this._saving
                      ? (this._parent.saveData = this._parent.saveData.then(function () {
                          return t
                        }))
                      : (this._parent.saveData = t)
                  }),
                  (e.prototype._findPrevState = function (t) {
                    for (var e = 0, i = this._changes.order; e < i.length; e++) {
                      var n = i[e]
                      if (n.id === t) return n
                    }
                    return null
                  }),
                  (e.prototype._removeFromOrder = function (e) {
                    this._changes.order = this._changes.order.filter(function (t) {
                      return !c.isEqualObj(t, e)
                    })
                  }),
                  e)
              function e(t, e) {
                ;(this._parent = t), (this._changes = e)
              }
              i.Loader = t
            }.call(this, n(9)))
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(83)
            ;(o.prototype.toJsonArray = function (t) {
              return this.getRows(t)
            }),
              (o.prototype.toJsonObject = function (t) {
                var e
                return (
                  "string" == typeof t && (e = this._fromString(t)),
                  (function t(e, i) {
                    i = i || {}
                    var n = e.attributes
                    if (n && n.length) for (var o = 0; o < n.length; o++) i[n[o].name] = n[o].value
                    for (var r, s = e.childNodes, o = 0; o < s.length; o++)
                      1 === s[o].nodeType &&
                        (i[(r = s[o].tagName)]
                          ? ("function" != typeof i[r].push && (i[r] = [i[r]]),
                            i[r].push(t(s[o], {})))
                          : (i[r] = t(s[o], {})))
                    return i
                  })(e)
                )
              }),
              (o.prototype.serialize = function (t) {
                return n.jsonToXML(t)
              }),
              (o.prototype.getFields = function (t) {
                return t
              }),
              (o.prototype.getRows = function (t) {
                if (("string" == typeof t && (t = this._fromString(t)), t)) {
                  t = t.childNodes && t.childNodes[0] && t.childNodes[0].childNodes
                  return t && t.length ? this._getRows(t) : null
                }
                return []
              }),
              (o.prototype._getRows = function (t) {
                for (var e = [], i = 0; i < t.length; i++)
                  "item" === t[i].tagName && e.push(this._nodeToJS(t[i]))
                return e
              }),
              (o.prototype._fromString = function (t) {
                try {
                  return new DOMParser().parseFromString(t, "text/xml")
                } catch (t) {
                  return null
                }
              }),
              (o.prototype._nodeToJS = function (t) {
                var e = {}
                if (this._haveAttrs(t))
                  for (var i = t.attributes, n = 0; n < i.length; n++) {
                    var o = i[n],
                      r = o.name,
                      o = o.value
                    e[r] = this._toType(o)
                  }
                if (3 === t.nodeType) return (e.value = e.value || this._toType(t.textContent)), e
                var s = t.childNodes
                if (s)
                  for (n = 0; n < s.length; n++) {
                    var a = s[n],
                      l = a.tagName
                    l &&
                      ("items" === l && a.childNodes
                        ? (e[l] = this._getRows(a.childNodes))
                        : this._haveAttrs(a)
                        ? (e[l] = this._nodeToJS(a))
                        : (e[l] = this._toType(a.textContent)))
                  }
                return e
              }),
              (o.prototype._toType = function (t) {
                return "false" === t || "true" === t ? "true" === t : isNaN(t) ? t : Number(t)
              }),
              (o.prototype._haveAttrs = function (t) {
                return t.attributes && t.attributes.length
              }),
              (i = o)
            function o() {}
            e.XMLDriver = i
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r = 4
            function s(t) {
              return " ".repeat(t)
            }
            e.jsonToXML = function (t, e) {
              void 0 === e && (e = "root")
              for (
                var i = '<?xml version="1.0" encoding="iso-8859-1"?>\n<' + e + ">", n = 0;
                n < t.length;
                n++
              )
                i +=
                  "\n" +
                  (function e(t, i) {
                    void 0 === i && (i = r)
                    var n,
                      o = s(i) + "<item>\n"
                    for (n in t)
                      Array.isArray(t[n])
                        ? ((o += s(i + r) + "<" + n + ">\n"),
                          (o +=
                            t[n]
                              .map(function (t) {
                                return e(t, i + 2 * r)
                              })
                              .join("\n") + "\n"),
                          (o += s(i + r) + "</" + n + ">\n"))
                        : (o += s(i + r) + ("<" + n + ">" + t[n]) + "</" + n + ">\n")
                    return (o += s(i) + "</item>")
                  })(t[n])
              return i + "\n</" + e + ">"
            }
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var o = i(11),
              i =
                ((n.prototype.sort = function (t, e, i) {
                  this._createSorter(e), i === e && (e = null), (i || e) && this._sort(t, i, e)
                }),
                (n.prototype._createSorter = function (i) {
                  var n = this
                  i &&
                    !i.rule &&
                    (i.rule = function (t, e) {
                      ;(t = n._checkVal(i.as, t[i.by])), (e = n._checkVal(i.as, e[i.by]))
                      return o.naturalCompare(t.toString(), e.toString())
                    })
                }),
                (n.prototype._checkVal = function (t, e) {
                  return t ? t.call(this, e) : e
                }),
                (n.prototype._sort = function (t, n, o) {
                  var r = this,
                    s = { asc: 1, desc: -1 }
                  return t.sort(function (t, e) {
                    var i = 0
                    return (
                      n && (i = n.rule.call(r, t, e) * (s[n.dir] || s.asc)),
                      0 === i && o && (i = o.rule.call(r, t, e) * (s[o.dir] || s.asc)),
                      i
                    )
                  })
                }),
                n)
            function n() {}
            e.Sort = i
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              r =
                (this && this.__spreadArrays) ||
                function () {
                  for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length
                  for (var n = Array(t), o = 0, e = 0; e < i; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s]
                  return n
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var d = i(1),
              s = i(36),
              a = i(14),
              u = i(11),
              h = i(10)
            function l(t, e, i, n) {
              void 0 !== n && -1 !== n && t[i] && t[i][n]
                ? t[i].splice(n, 0, e)
                : (t[i] || (t[i] = []), t[i].push(e))
            }
            var c,
              o =
                ((c = s.DataCollection),
                o(f, c),
                (f.prototype.add = function (t, i, n) {
                  var o = this
                  if (
                    (void 0 === i && (i = -1),
                    void 0 === n && (n = this._root),
                    this.events.fire(h.DataEvents.beforeAdd, [t]))
                  )
                    return (
                      "object" != typeof t && (t = { value: t }),
                      Array.isArray(t)
                        ? t.map(function (t, e) {
                            return o._add(t, i, n, e)
                          })
                        : this._add(t, i, n)
                    )
                }),
                (f.prototype.getRoot = function () {
                  return this._root
                }),
                (f.prototype.getParent = function (t, e) {
                  if ((void 0 === e && (e = !1), !this._pull[t])) return null
                  t = this._pull[t].parent
                  return e ? this._pull[t] : t
                }),
                (f.prototype.getItems = function (t) {
                  return this._childs && this._childs[t] ? this._childs[t] : []
                }),
                (f.prototype.getLength = function (t) {
                  return (
                    void 0 === t && (t = this._root),
                    this._childs[t] ? this._childs[t].length : null
                  )
                }),
                (f.prototype.removeAll = function (t) {
                  if (t) {
                    if (this._childs[t])
                      for (var e = 0, i = r(this._childs[t]); e < i.length; e++) {
                        var n = i[e]
                        this.remove(n.id)
                      }
                  } else {
                    c.prototype.removeAll.call(this)
                    var o = this._root
                    ;(this._initChilds = null), (this._childs = (((t = {})[o] = []), t))
                  }
                }),
                (f.prototype.getIndex = function (e) {
                  var t = this.getParent(e)
                  return t && this._childs[t]
                    ? d.findIndex(this._childs[t], function (t) {
                        return t.id === e
                      })
                    : -1
                }),
                (f.prototype.sort = function (t) {
                  var e = this
                  if (t) {
                    for (var i in this._childs) this._sort.sort(this._childs[i], t)
                    if (this._initChilds && Object.keys(this._initChilds).length)
                      for (var i in this._initChilds) this._sort.sort(this._initChilds[i], t)
                  } else
                    (this._childs = {}),
                      this._parse_data(
                        Object.keys(this._pull).map(function (t) {
                          return e._pull[t]
                        })
                      ),
                      this._filters && this.filter(this._filters.filters, this._filters.config)
                  this.events.fire(h.DataEvents.change)
                }),
                (f.prototype.filter = function (t, e) {
                  var n = this
                  if ((void 0 === e && (e = {}), t)) {
                    if (
                      (this._initOrder || (this._initOrder = this._order),
                      this._initChilds || (this._initChilds = this._childs),
                      (e.type = e.type || h.TreeFilterType.all),
                      (this._filters = { filters: {}, config: e }),
                      "function" != typeof t)
                    )
                      if (t.by) this._filters.filters[t.by] = t
                      else for (var i in t) this._filters.filters[i] = t[i]
                    else this._filters.filters = t
                    var o = {}
                    this._recursiveFilter(this._filters.filters, e, this._root, 0, o),
                      Object.keys(o).forEach(function (t) {
                        for (var e = n.getParent(t), i = n.getItem(t); e; )
                          o[e] || (o[e] = []),
                            i &&
                              !o[e].find(function (t) {
                                return t.id === i.id
                              }) &&
                              o[e].push(i),
                            (i = n.getItem(e)),
                            (e = n.getParent(e))
                      }),
                      (this._childs = o),
                      this.events.fire(h.DataEvents.change)
                  } else this.restoreOrder()
                }),
                (f.prototype.restoreOrder = function () {
                  this._initChilds &&
                    ((this._childs = this._initChilds), (this._initChilds = null)),
                    this.events.fire(h.DataEvents.change)
                }),
                (f.prototype.copy = function (t, i, n, o) {
                  var r = this
                  return (
                    void 0 === n && (n = this),
                    void 0 === o && (o = this._root),
                    t instanceof Array
                      ? t.map(function (t, e) {
                          return r._copy(t, i, n, o, e)
                        })
                      : this._copy(t, i, n, o)
                  )
                }),
                (f.prototype.move = function (t, i, n, o) {
                  var r = this
                  return (
                    void 0 === n && (n = this),
                    void 0 === o && (o = this._root),
                    t instanceof Array
                      ? t.map(function (t, e) {
                          return r._move(t, i, n, o, e)
                        })
                      : this._move(t, i, n, o)
                  )
                }),
                (f.prototype.forEach = function (t, e, i) {
                  if (
                    (void 0 === e && (e = this._root),
                    void 0 === i && (i = 1 / 0),
                    this.haveItems(e) && !(i < 1))
                  )
                    for (var n = this._childs[e], o = 0; o < n.length; o++)
                      t.call(this, n[o], o, n),
                        this.haveItems(n[o].id) && this.forEach(t, n[o].id, --i)
                }),
                (f.prototype.eachChild = function (t, e, i, n) {
                  if (
                    (void 0 === i && (i = !0),
                    void 0 === n &&
                      (n = function () {
                        return !0
                      }),
                    this.haveItems(t))
                  )
                    for (var o = 0; o < this._childs[t].length; o++)
                      e.call(this, this._childs[t][o], o),
                        i && n(this._childs[t][o]) && this.eachChild(this._childs[t][o].id, e, i, n)
                }),
                (f.prototype.getNearId = function (t) {
                  return t
                }),
                (f.prototype.loadItems = function (e, i) {
                  var n = this
                  void 0 === i && (i = h.DataDriver.json)
                  var t = this.config.autoload + "?id=" + e
                  new a.DataProxy(t).load().then(function (t) {
                    ;(t = (i = u.toDataDriver(i)).toJsonArray(t)),
                      n._parse_data(t, e),
                      n.events.fire(h.DataEvents.change)
                  })
                }),
                (f.prototype.refreshItems = function (t, e) {
                  void 0 === e && (e = h.DataDriver.json), this.removeAll(t), this.loadItems(t, e)
                }),
                (f.prototype.eachParent = function (t, e, i) {
                  void 0 === i && (i = !1)
                  t = this.getItem(t)
                  t &&
                    (i && e.call(this, t),
                    t.parent !== this._root &&
                      ((i = this.getItem(t.parent)), e.call(this, i), this.eachParent(t.parent, e)))
                }),
                (f.prototype.haveItems = function (t) {
                  return t in this._childs
                }),
                (f.prototype.canCopy = function (e, t) {
                  if (e === t) return !1
                  var i = !0
                  return (
                    this.eachParent(t, function (t) {
                      return t.id === e ? (i = !1) : null
                    }),
                    i
                  )
                }),
                (f.prototype.serialize = function (t, e) {
                  void 0 === t && (t = h.DataDriver.json)
                  ;(e = this._serialize(this._root, e)), (t = u.toDataDriver(t))
                  if (t) return t.serialize(e)
                }),
                (f.prototype.getId = function (t, e) {
                  if ((void 0 === e && (e = this._root), this._childs[e] && this._childs[e][t]))
                    return this._childs[e][t].id
                }),
                (f.prototype.map = function (t, e, i) {
                  void 0 === e && (e = this._root), void 0 === i && (i = !0)
                  var n = []
                  if (!this.haveItems(e)) return n
                  for (var o, r = 0; r < this._childs[e].length; r++)
                    n.push(t.call(this, this._childs[e][r], r, this._childs)),
                      i && ((o = this.map(t, this._childs[e][r].id, i)), (n = n.concat(o)))
                  return n
                }),
                (f.prototype.getRawData = function (t, e, i, n, o) {
                  return (
                    (o = o || this._root),
                    this._childs[o]
                      ? ((o =
                          o === this._root
                            ? c.prototype.getRawData.call(this, t, e, this._childs[o])
                            : this._childs[o]),
                        2 === n ? this.flatten(o) : o)
                      : []
                  )
                }),
                (f.prototype.flatten = function (t) {
                  var i = this,
                    n = []
                  return (
                    t.forEach(function (t) {
                      n.push(t)
                      var e = i._childs[t.id]
                      e && t.$opened && (n = n.concat(i.flatten(e)))
                    }),
                    n
                  )
                }),
                (f.prototype._add = function (t, e, i, n) {
                  void 0 === e && (e = -1),
                    void 0 === i && (i = this._root),
                    (t.parent = t.parent ? t.parent.toString() : i),
                    0 < n && -1 !== e && (e += 1)
                  e = c.prototype._add.call(this, t, e)
                  if (Array.isArray(t.items))
                    for (var o = 0, r = t.items; o < r.length; o++) {
                      var s = r[o]
                      this.add(s, -1, t.id)
                    }
                  return e
                }),
                (f.prototype._copy = function (t, e, i, n, o) {
                  if (
                    (void 0 === i && (i = this), void 0 === n && (n = this._root), !this.exists(t))
                  )
                    return null
                  var r = this._childs[t]
                  if ((o && (e = -1 === e ? -1 : e + o), i === this && !this.canCopy(t, n)))
                    return null
                  o = u.copyWithoutInner(this.getItem(t), { items: !0 })
                  if ((i.exists(t) && (o.id = d.uid()), u.isTreeCollection(i))) {
                    if (
                      (this.exists(t) &&
                        ((o.parent = n),
                        i !== this && n === this._root && (o.parent = i.getRoot()),
                        i.add(o, e),
                        (t = o.id)),
                      r)
                    )
                      for (var s = 0, a = r; s < a.length; s++) {
                        var l = a[s].id,
                          c = this.getIndex(l)
                        "string" == typeof t && this.copy(l, c, i, t)
                      }
                    return t
                  }
                  i.add(o, e)
                }),
                (f.prototype._move = function (t, e, i, n, o) {
                  if (
                    (void 0 === i && (i = this), void 0 === n && (n = this._root), !this.exists(t))
                  )
                    return null
                  if ((o && (e = -1 === e ? -1 : e + o), i !== this)) {
                    if (!u.isTreeCollection(i))
                      return i.add(u.copyWithoutInner(this.getItem(t)), e), void this.remove(t)
                    var r = this.copy(t, e, i, n)
                    return this.remove(t), r
                  }
                  if (!this.canCopy(t, n)) return null
                  ;(i = this.getParent(t)),
                    (r = this.getIndex(t)),
                    (r = this._childs[i].splice(r, 1)[0])
                  return (
                    (r.parent = n),
                    this._childs[i].length || delete this._childs[i],
                    this.haveItems(n) || (this._childs[n] = []),
                    -1 === e ? (e = this._childs[n].push(r)) : this._childs[n].splice(e, 0, r),
                    this.events.fire(h.DataEvents.change, [t, "update", this.getItem(t)]),
                    t
                  )
                }),
                (f.prototype._reset = function (t) {
                  if (t)
                    for (var e = 0, i = r(this._childs[t]); e < i.length; e++) {
                      var n = i[e]
                      this.remove(n.id)
                    }
                  else {
                    c.prototype._reset.call(this)
                    var o = this._root
                    ;(this._initChilds = null), (this._childs = (((t = {})[o] = []), t))
                  }
                }),
                (f.prototype._removeCore = function (e) {
                  var t
                  this._pull[e] &&
                    ((t = this.getParent(e)),
                    (this._childs[t] = this._childs[t].filter(function (t) {
                      return t.id !== e
                    })),
                    t === this._root || this._childs[t].length || delete this._childs[t],
                    this._initChilds &&
                      this._initChilds[t] &&
                      ((this._initChilds[t] = this._initChilds[t].filter(function (t) {
                        return t.id !== e
                      })),
                      t === this._root || this._initChilds[t].length || delete this._initChilds[t]),
                    this._initOrder &&
                      this._initOrder.length &&
                      (this._initOrder = this._initOrder.filter(function (t) {
                        return t.id !== e
                      })),
                    this._fastDeleteChilds(this._childs, e),
                    this._initChilds && this._fastDeleteChilds(this._initChilds, e))
                }),
                (f.prototype._addToOrder = function (t, e, i) {
                  var n = this._childs,
                    o = this._initChilds,
                    r = e.parent
                  ;(this._pull[e.id] = e).parent &&
                    this._pull[e.parent] &&
                    this._pull[e.parent].items &&
                    !this._pull[e.parent].items.find(function (t) {
                      return t.id === e.id
                    }) &&
                    this._pull[e.parent].items.push(e),
                    c.prototype._addToOrder.call(this, t, e, i),
                    l(n, e, r, i),
                    o && l(o, e, r, i)
                }),
                (f.prototype._parse_data = function (t, e) {
                  var i
                  void 0 === e && (e = this._root)
                  for (var n = this._order.length, o = 0, r = t; o < r.length; o++) {
                    var s = r[o]
                    this.config.init && (s = this.config.init(s)),
                      s && "object" != typeof s && (s = { value: s }),
                      (s.id = null !== (i = s.id) && void 0 !== i ? i : d.uid()),
                      (s.parent =
                        void 0 === s.parent || null === s.parent || (s.parent && s.$items)
                          ? e
                          : s.parent),
                      this._pull[s.id] && u.dhxError("Item " + s.id + " already exist"),
                      (this._pull[s.id] = s),
                      (this._order[n++] = s),
                      this._childs[s.parent] || (this._childs[s.parent] = []),
                      this._childs[s.parent].push(s),
                      s.items && s.items instanceof Object && this._parse_data(s.items, s.id)
                  }
                }),
                (f.prototype._fastDeleteChilds = function (t, e) {
                  if ((this._pull[e] && delete this._pull[e], t[e])) {
                    for (var i = 0; i < t[e].length; i++) this._fastDeleteChilds(t, t[e][i].id)
                    delete t[e]
                  }
                }),
                (f.prototype._recursiveFilter = function (n, e, t, i, o) {
                  var r = this,
                    s = this._childs[t]
                  if (s) {
                    var a,
                      l = function (t) {
                        switch (e.type) {
                          case h.TreeFilterType.all:
                            return !0
                          case h.TreeFilterType.level:
                            return i === e.level
                          case h.TreeFilterType.leafs:
                            return !r.haveItems(t.id)
                        }
                      }
                    ;(a =
                      "function" == typeof n
                        ? function (t) {
                            return l(t) && n(t)
                          }
                        : function (t) {
                            var e,
                              i = !0
                            for (e in n)
                              if (
                                (n[e].by &&
                                  "" !== n[e].match &&
                                  (i =
                                    t[n[e].by] &&
                                    -1 !==
                                      t[n[e].by]
                                        .toString()
                                        .toLocaleLowerCase()
                                        .indexOf(n[e].match.toString().toLowerCase())),
                                !i)
                              )
                                break
                            return l(t) && i
                          }),
                      (a = s.filter(a)).length && (o[t] = a)
                    for (var c = 0, d = s; c < d.length; c++) {
                      var u = d[c]
                      this._recursiveFilter(n, e, u.id, i + 1, o)
                    }
                  }
                }),
                (f.prototype._serialize = function (t, n) {
                  var o = this
                  return (
                    void 0 === t && (t = this._root),
                    this.map(
                      function (t) {
                        var e,
                          i = {}
                        for (e in t)
                          "parent" === e || "items" === e || e.startsWith("$") || (i[e] = t[e])
                        return (
                          n && (i = n(i)), o.haveItems(t.id) && (i.items = o._serialize(t.id, n)), i
                        )
                      },
                      t,
                      !1
                    )
                  )
                }),
                f)
            function f(t, e) {
              var i = c.call(this, t, e) || this
              i._childs = {}
              e = i._root = (t && t.rootId) || "_ROOT_" + d.uid()
              return (i._childs = (((t = {})[e] = []), t)), (i._initChilds = null), i
            }
            e.TreeCollection = o
          },
          function (t, e, i) {
            "use strict"
            var v =
                (this && this.__assign) ||
                function () {
                  return (v =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                },
              a =
                (this && this.__spreadArrays) ||
                function () {
                  for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length
                  for (var n = Array(t), o = 0, e = 0; e < i; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s]
                  return n
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var h = i(2),
              m = i(40),
              f = i(120),
              p = i(10),
              y = i(11),
              b = i(1)
            var n =
              ((o.prototype.setItem = function (t, e) {
                f.collectionStore.setItem(t, e)
              }),
              (o.prototype.onMouseDown = function (t, e, i) {
                var n, o, r, s
                ;(1 !== t.which && !t.targetTouches) ||
                  (t.targetTouches
                    ? (document.addEventListener("touchmove", this._onMouseMove, !1),
                      document.addEventListener("touchend", this._onMouseUp, !1))
                    : (document.addEventListener("mousemove", this._onMouseMove),
                      document.addEventListener("mouseup", this._onMouseUp)),
                  (o = (n = h.locateNode(t, "dhx_id")) && n.getAttribute("dhx_id")),
                  (r = h.locate(t, "dhx_widget_id")),
                  Array.isArray(e) && e.includes(o)
                    ? ((this._transferData.source = a(e)), (this._itemsForGhost = i))
                    : ((this._transferData.source = [o]), (this._itemsForGhost = null)),
                  o &&
                    r &&
                    ((e = (s = h.getBox(n)).left),
                    (i = s.top),
                    (s = (t.targetTouches ? t.targetTouches[0] : t).pageX),
                    (t = (t.targetTouches ? t.targetTouches[0] : t).pageY),
                    (this._transferData.initXOffset = s - e),
                    (this._transferData.initYOffset = t - i),
                    (this._transferData.x = s),
                    (this._transferData.y = t),
                    (this._transferData.componentId = r),
                    (this._transferData.start = o),
                    (this._transferData.item = n)))
              }),
              (o.prototype.isDrag = function () {
                return this._isDrag
              }),
              (o.prototype.cancelCanDrop = function (t) {
                ;(this._canMove = !1), (this._isDrag = !1)
                var e = this._transferData,
                  i = e.start,
                  n = e.source,
                  o = e.target,
                  e = e.dropComponentId,
                  n = { start: i, source: n, target: o },
                  e = f.collectionStore.getItem(e)
                e && o && e.events.fire(p.DragEvents.cancelDrop, [n, t]),
                  (this._transferData.dropComponentId = null),
                  (this._transferData.target = null)
              }),
              (o.prototype._moveGhost = function (t, e) {
                this._transferData.ghost &&
                  ((this._transferData.ghost.style.left =
                    t - this._transferData.initXOffset + "px"),
                  (this._transferData.ghost.style.top = e - this._transferData.initYOffset + "px"))
              }),
              (o.prototype._removeGhost = function () {
                document.body.removeChild(this._transferData.ghost)
              }),
              (o.prototype._onDrop = function (t) {
                var e, i, n, o, r
                this._canMove &&
                  ((r = (o = this._transferData).start),
                  (i = o.source),
                  (e = o.target),
                  (n = o.dropComponentId),
                  (i = { start: r, source: i, target: e, dropPosition: o.dropPosition }),
                  (n = (o = f.collectionStore.getItem(n)) && o.config),
                  o &&
                    "source" !== n.dragMode &&
                    o.events.fire(p.DragEvents.beforeDrop, [i, t]) &&
                    ((o = { id: e, component: o }),
                    (r = { id: r, component: this._transferData.component, newId: null }),
                    this._move(r, o),
                    r.newId && r.component !== o.component && (i.start = r.newId),
                    o.component.events.fire(p.DragEvents.afterDrop, [i, t]))),
                  this._endDrop(t)
              }),
              (o.prototype._onDragStart = function (t, e, i) {
                var n = f.collectionStore.getItem(e),
                  o = n.config,
                  r = this._transferData,
                  e = { start: r.start, source: r.source, target: r.target }
                if ("target" === o.dragMode || n._pregroupData) return null
                r = (function (t, e, i) {
                  void 0 === i && (i = !1)
                  var n = t.getBoundingClientRect(),
                    o = document.createElement("div"),
                    r = t.cloneNode(!0)
                  return (
                    (r.style.width = n.width + "px"),
                    (r.style.height = n.height + "px"),
                    (r.style.maxHeight = n.height + "px"),
                    (r.style.fontSize = window.getComputedStyle(t.parentElement).fontSize),
                    (r.style.opacity = "0.8"),
                    (r.style.fontSize = window.getComputedStyle(t.parentElement).fontSize),
                    (i && e && e.length) || o.appendChild(r),
                    e &&
                      e.length &&
                      e.forEach(function (t, e) {
                        t = t.cloneNode(!0)
                        ;(t.style.width = n.width + "px"),
                          (t.style.height = n.height + "px"),
                          (t.style.maxHeight = n.height + "px"),
                          (t.style.top = 12 * (e + 1) - n.height - n.height * e + "px"),
                          (t.style.left = 12 * (e + 1) + "px"),
                          (t.style.opacity = "0.6"),
                          (t.style.zIndex = "" + (-e - 1)),
                          o.appendChild(t)
                      }),
                    (o.className = "dhx_drag-ghost"),
                    o
                  )
                })(
                  this._transferData.item,
                  this._itemsForGhost,
                  "column" === o.dragItem || "both" === o.dragItem
                )
                return n.events.fire(p.DragEvents.beforeDrag, [e, i, r]) && t
                  ? (n.events.fire(p.DragEvents.dragStart, [e, i]),
                    (this._isDrag = !0),
                    this._toggleTextSelection(!0),
                    (this._transferData.component = n),
                    (this._transferData.dragConfig = o),
                    r)
                  : null
              }),
              (o.prototype._onDrag = function (t) {
                var e = (t.targetTouches ? t.targetTouches[0] : t).clientX,
                  i = (t.targetTouches ? t.targetTouches[0] : t).clientY,
                  n = document.elementFromPoint(e, i),
                  o = h.locate(n, "dhx_widget_id")
                if (o) {
                  var r = f.collectionStore.getItem(o),
                    s =
                      !!h.locateNodeByClassName(n, "dhx_grid-header") ||
                      !!h.locateNodeByClassName(n, "dhx_grid-footer"),
                    a = r && r.config.columns ? r.config : void 0,
                    l = a && ("both" === a.dragItem || "column" === a.dragItem)
                  if (!s || l) {
                    var c = h.locate(n, "dhx_id"),
                      d = h.locate(n, "dhx_root_id")
                    if (!c && !d)
                      return (
                        this.cancelCanDrop(t),
                        (this._transferData.dropComponentId = o),
                        (this._transferData.target = null),
                        void this._canDrop(t)
                      )
                    var u = this._transferData,
                      e = u.dropComponentId,
                      i = u.start,
                      a = u.source,
                      s = u.target,
                      l = u.componentId,
                      n = u.dropPosition
                    if ("complex" === r.config.dropBehaviour) {
                      u = (function (t) {
                        var e = t.clientY
                        if (!(t = h.locateNode(t))) return null
                        if ((t = t.childNodes[0])) {
                          t = t.getBoundingClientRect()
                          return (e - t.top) / t.height
                        }
                      })(t)
                      this._transferData.dropPosition =
                        u <= 0.25 ? "top" : 0.75 <= u ? "bottom" : "in"
                    } else if ((s === c || s === d) && e === o) return
                    e = { id: i, component: this._transferData.component }
                    "source" !== r.config.dragMode &&
                      (e.component.events.fire(p.DragEvents.dragOut, [
                        { start: i, source: a, target: s },
                        t,
                      ]),
                      o !== l ||
                      !y.isTreeCollection(e.component.data) ||
                      (y.isTreeCollection(e.component.data) && e.component.data.canCopy(e.id, c))
                        ? (this.cancelCanDrop(t),
                          (this._transferData.target = c || d),
                          (this._transferData.dropComponentId = o),
                          e.component.events.fire(p.DragEvents.dragIn, [
                            { start: i, source: a, target: s, dropPosition: n },
                            t,
                          ]) && this._canDrop(t))
                        : this.cancelCanDrop(t))
                  } else this._canMove && this.cancelCanDrop(t)
                } else this._canMove && this.cancelCanDrop(t)
              }),
              (o.prototype._move = function (i, e) {
                var n = i.component.data,
                  o = e.component.data,
                  r = 0,
                  s = e.id,
                  t = y.isTreeCollection(o) ? e.component.config.dropBehaviour : void 0,
                  a = i.component.config.columns ? i.component.config : void 0,
                  a =
                    a &&
                    ("both" === a.dragItem || "column" === a.dragItem) &&
                    a.columns
                      .map(function (t) {
                        return t.id
                      })
                      .filter(function (t) {
                        return t === i.id || t === e.id
                      }).length
                if (a && i.component === e.component) {
                  if (i.id === e.id) return
                  var l = (c = (d = i.component).config.columns.map(function (t) {
                    return v({}, t)
                  })).findIndex(function (t) {
                    return t.id === i.id
                  })
                  return -1 ===
                    (h = c.findIndex(function (t) {
                      return t.id === e.id
                    }))
                    ? void 0
                    : (c.splice(h, 0, c.splice(l, 1)[0]), d.setColumns(c), void d.paint())
                }
                if (a && i.component instanceof m.ProGrid && e.component instanceof m.ProGrid) {
                  var c,
                    d = i.component,
                    u = e.component,
                    l = (c = d.config.columns.map(function (t) {
                      return v({}, t)
                    })).findIndex(function (t) {
                      return t.id === i.id
                    }),
                    a = u.config.columns.map(function (t) {
                      return v({}, t)
                    }),
                    h = a.findIndex(function (t) {
                      return t.id === e.id
                    }),
                    f =
                      0 <=
                      a.findIndex(function (t) {
                        return t.id === i.id
                      })
                        ? i.id + "_copy"
                        : i.id,
                    p = []
                  d.data.forEach(function (t) {
                    var e
                    p.push((((e = {})[f] = t[i.id]), e))
                  }),
                    u.data.forEach(function (t, e) {
                      u.data.update(t.id, v(v({}, t), p[e]))
                    })
                  l = c.splice(l, 1)[0]
                  return (
                    (l.id = f),
                    a.splice(h, 0, l),
                    u.setColumns(a),
                    u.paint(),
                    d.setColumns(c),
                    void d.paint()
                  )
                }
                var _ = e.id === e.component.config.rootParent
                switch (t) {
                  case "child":
                    break
                  case "sibling":
                    ;(s = o.getParent(s)), (r = o.getIndex(e.id) + 1)
                    break
                  case "complex":
                    var g = this._transferData.dropPosition
                    _
                      ? ((s = e.id), (r = o.getLength()))
                      : "top" === g
                      ? ((s = o.getParent(s)), (r = o.getIndex(e.id)))
                      : "bottom" === g && ((s = o.getParent(s)), (r = o.getIndex(e.id) + 1))
                    break
                  default:
                    r = e.id
                      ? i.component === e.component && o.getIndex(i.id) < o.getIndex(e.id)
                        ? o.getIndex(e.id) - 1
                        : (-1 < o.getIndex(i.id) && (i.newId = b.uid()), o.getIndex(e.id))
                      : -1
                }
                this._transferData.dragConfig.dragCopy
                  ? this._transferData.source instanceof Array &&
                    1 < this._transferData.source.length
                    ? this._transferData.source.map(function (t) {
                        n.copy(t, r, o, s), -1 < r && r++
                      })
                    : n.copy(i.id, r, o, s)
                  : this._transferData.source instanceof Array &&
                    1 < this._transferData.source.length
                  ? this._transferData.source.map(function (t) {
                      n.move(t, r, o, s), -1 < r && r++
                    })
                  : n.move(i.id, r, o, s, i.newId)
              }),
              (o.prototype._endDrop = function (t) {
                var e
                this._toggleTextSelection(!1),
                  this._transferData.component &&
                    ((e = {
                      start: (e = this._transferData).start,
                      source: e.source,
                      target: e.target,
                    }),
                    this._transferData.component.events.fire(p.DragEvents.afterDrag, [e, t])),
                  this.cancelCanDrop(t),
                  (this._canMove = !0),
                  (this._transferData = {}),
                  (this._transferData.target = null),
                  (this._transferData.dropComponentId = null)
              }),
              (o.prototype._canDrop = function (t) {
                this._canMove = !0
                var e = this._transferData,
                  i = {
                    start: e.start,
                    source: e.source,
                    target: e.target,
                    dropPosition: e.dropPosition,
                  },
                  e = f.collectionStore.getItem(this._transferData.dropComponentId)
                e && this._transferData.target && e.events.fire(p.DragEvents.canDrop, [i, t])
              }),
              (o.prototype._toggleTextSelection = function (t) {
                t
                  ? document.body.classList.add("dhx_no-select")
                  : document.body.classList.remove("dhx_no-select")
              }),
              o)
            function o() {
              var a = this
              ;(this._transferData = {}),
                (this._canMove = !0),
                (this._isDrag = !1),
                (this._onMouseMove = function (t) {
                  if (a._transferData.start) {
                    var e = (t.targetTouches ? t.targetTouches[0] : t).pageX,
                      i = (t.targetTouches ? t.targetTouches[0] : t).pageY,
                      n = a._transferData,
                      o = n.x,
                      r = n.y,
                      s = n.start,
                      n = n.componentId
                    if (!a._transferData.ghost) {
                      if (Math.abs(o - e) < 3 && Math.abs(r - i) < 3) return
                      n = a._onDragStart(s, n, t)
                      if (!n) return void a._endDrop(t)
                      ;(a._transferData.ghost = n), document.body.appendChild(a._transferData.ghost)
                    }
                    a._moveGhost(e, i), a._onDrag(t)
                  }
                }),
                (this._onMouseUp = function (t) {
                  a._transferData.x &&
                    (a._transferData.ghost ? (a._removeGhost(), a._onDrop(t)) : a._endDrop(t),
                    t.targetTouches
                      ? (document.removeEventListener("touchmove", a._onMouseMove),
                        document.removeEventListener("touchend", a._onMouseUp))
                      : (document.removeEventListener("mousemove", a._onMouseMove),
                        document.removeEventListener("mouseup", a._onMouseUp)))
                })
            }
            i = window.dhxHelpers = window.dhxHelpers || {}
            ;(i.dragManager = i.dragManager || new n()), (e.dragManager = i.dragManager)
          },
          function (t, e, i) {
            /**
             * Copyright (c) 2017, Leon Sorokin
             * All rights reserved. (MIT Licensed)
             *
             * domvm.js (DOM ViewModel)
             * A thin, fast, dependency-free vdom view layer
             * @preserve https://github.com/leeoniya/domvm (v3.2.6, micro build)
             */
            t.exports = (function () {
              "use strict"
              var D = 1,
                l = 2,
                O = 3,
                M = 4,
                I = 5,
                t = typeof window !== "undefined",
                e,
                r = (t ? window : {}).requestAnimationFrame,
                c = {}
              function i() {}
              var p = Array.isArray
              function d(t) {
                return t != null
              }
              function s(t) {
                return t != null && t.constructor === Object
              }
              function o(t, e, i, n) {
                t.splice.apply(t, [i, n].concat(e))
              }
              function a(t) {
                var e = typeof t
                return e === "string" || e === "number"
              }
              function u(t) {
                return typeof t === "function"
              }
              function h(t) {
                return typeof t === "object" && u(t.then)
              }
              function f(t) {
                var e = arguments
                for (var i = 1; i < e.length; i++) for (var n in e[i]) t[n] = e[i][n]
                return t
              }
              function _(t, e, i) {
                var n
                while ((n = e.shift()))
                  if (e.length === 0) t[n] = i
                  else t[n] = t = t[n] || {}
              }
              function g(t, e) {
                var i = []
                for (var n = e; n < t.length; n++) i.push(t[n])
                return i
              }
              function v(t, e) {
                for (var i in t) if (t[i] !== e[i]) return false
                return true
              }
              function m(t, e) {
                var i = t.length
                if (e.length !== i) return false
                for (var n = 0; n < i; n++) if (t[n] !== e[n]) return false
                return true
              }
              function y(t) {
                if (!r) return t
                var e, i, n
                function o() {
                  e = 0
                  t.apply(i, n)
                }
                return function () {
                  i = this
                  n = arguments
                  if (!e) e = r(o)
                }
              }
              function b(t, e, i) {
                return function () {
                  return t.apply(i, e)
                }
              }
              function x(t) {
                var e = t.slice()
                var i = []
                i.push(0)
                var n
                var o
                for (var r = 0, s = t.length; r < s; ++r) {
                  var a = i[i.length - 1]
                  if (t[a] < t[r]) {
                    e[r] = a
                    i.push(r)
                    continue
                  }
                  n = 0
                  o = i.length - 1
                  while (n < o) {
                    var l = ((n + o) / 2) | 0
                    if (t[i[l]] < t[r]) n = l + 1
                    else o = l
                  }
                  if (t[r] < t[i[n]]) {
                    if (n > 0) e[r] = i[n - 1]
                    i[n] = r
                  }
                }
                n = i.length
                o = i[n - 1]
                while (n-- > 0) {
                  i[n] = o
                  o = e[o]
                }
                return i
              }
              function w(t, e) {
                var i = 0
                var n = e.length - 1
                var o
                var r = n <= 2147483647 ? true : false
                if (r)
                  while (i <= n) {
                    o = (i + n) >> 1
                    if (e[o] === t) return o
                    else if (e[o] < t) i = o + 1
                    else n = o - 1
                  }
                else
                  while (i <= n) {
                    o = Math.floor((i + n) / 2)
                    if (e[o] === t) return o
                    else if (e[o] < t) i = o + 1
                    else n = o - 1
                  }
                return i == e.length ? null : i
              }
              function C(t) {
                return t[0] === "o" && t[1] === "n"
              }
              function E(t) {
                return t[0] === "_"
              }
              function k(t) {
                return t === "style"
              }
              function S(t) {
                t && t.el && t.el.offsetHeight
              }
              function T(t) {
                return t.node != null && t.node.el != null
              }
              function P(t, e) {
                switch (e) {
                  case "value":
                  case "checked":
                  case "selected":
                    return true
                }
                return false
              }
              function H(t) {
                t = t || c
                while (t.vm == null && t.parent) t = t.parent
                return t.vm
              }
              function A() {}
              var n = (A.prototype = {
                constructor: A,
                type: null,
                vm: null,
                key: null,
                ref: null,
                data: null,
                hooks: null,
                ns: null,
                el: null,
                tag: null,
                attrs: null,
                body: null,
                flags: 0,
                _class: null,
                _diff: null,
                _dead: false,
                _lis: false,
                idx: null,
                parent: null,
              })
              function R(t) {
                var e = new A()
                e.type = l
                e.body = t
                return e
              }
              var L = {},
                j = /\[(\w+)(?:=(\w+))?\]/g
              function F(t) {
                {
                  var e = L[t]
                  if (e == null) {
                    var i, n, o, r
                    L[t] = e = {
                      tag: (i = t.match(/^[-\w]+/)) ? i[0] : "div",
                      id: (n = t.match(/#([-\w]+)/)) ? n[1] : null,
                      class: (o = t.match(/\.([-\w.]+)/)) ? o[1].replace(/\./g, " ") : null,
                      attrs: null,
                    }
                    while ((r = j.exec(t))) {
                      if (e.attrs == null) e.attrs = {}
                      e.attrs[r[1]] = r[2] || ""
                    }
                  }
                  return e
                }
              }
              var N = 1,
                $ = 2,
                V = 4,
                W = 8
              function z(t, e, i, n) {
                var o = new A()
                o.type = D
                if (d(n)) o.flags = n
                o.attrs = e
                var r = F(t)
                o.tag = r.tag
                if (r.id || r.class || r.attrs) {
                  var s = o.attrs || {}
                  if (r.id && !d(s.id)) s.id = r.id
                  if (r.class) {
                    o._class = r.class
                    s.class = r.class + (d(s.class) ? " " + s.class : "")
                  }
                  if (r.attrs) for (var a in r.attrs) if (!d(s[a])) s[a] = r.attrs[a]
                  o.attrs = s
                }
                var l = o.attrs
                if (d(l)) {
                  if (d(l._key)) o.key = l._key
                  if (d(l._ref)) o.ref = l._ref
                  if (d(l._hooks)) o.hooks = l._hooks
                  if (d(l._data)) o.data = l._data
                  if (d(l._flags)) o.flags = l._flags
                  if (!d(o.key))
                    if (d(o.ref)) o.key = o.ref
                    else if (d(l.id)) o.key = l.id
                    else if (d(l.name))
                      o.key = l.name + (l.type === "radio" || l.type === "checkbox" ? l.value : "")
                }
                if (i != null) o.body = i
                return o
              }
              function B(t, e, i) {
                var n = ["refs"].concat(e.split("."))
                _(t, n, i)
              }
              function G(t) {
                while ((t = t.parent)) t.flags |= N
              }
              function Y(t, e, i, n) {
                if (t.type === I || t.type === M) return
                t.parent = e
                t.idx = i
                t.vm = n
                if (t.ref != null) B(H(t), t.ref, t)
                var o = t.hooks,
                  r = n && n.hooks
                if ((o && (o.willRemove || o.didRemove)) || (r && (r.willUnmount || r.didUnmount)))
                  G(t)
                if (p(t.body)) U(t)
                else;
              }
              function U(t) {
                var e = t.body
                for (var i = 0; i < e.length; i++) {
                  var n = e[i]
                  if (n === false || n == null) e.splice(i--, 1)
                  else if (p(n)) o(e, n, i--, 1)
                  else {
                    if (n.type == null) e[i] = n = R("" + n)
                    if (n.type === l)
                      if (n.body == null || n.body === "") e.splice(i--, 1)
                      else if (i > 0 && e[i - 1].type === l) {
                        e[i - 1].body += n.body
                        e.splice(i--, 1)
                      } else Y(n, t, i, null)
                    else Y(n, t, i, null)
                  }
                }
              }
              var X = {
                animationIterationCount: true,
                boxFlex: true,
                boxFlexGroup: true,
                boxOrdinalGroup: true,
                columnCount: true,
                flex: true,
                flexGrow: true,
                flexPositive: true,
                flexShrink: true,
                flexNegative: true,
                flexOrder: true,
                gridRow: true,
                gridColumn: true,
                order: true,
                lineClamp: true,
                borderImageOutset: true,
                borderImageSlice: true,
                borderImageWidth: true,
                fontWeight: true,
                lineHeight: true,
                opacity: true,
                orphans: true,
                tabSize: true,
                widows: true,
                zIndex: true,
                zoom: true,
                fillOpacity: true,
                floodOpacity: true,
                stopOpacity: true,
                strokeDasharray: true,
                strokeDashoffset: true,
                strokeMiterlimit: true,
                strokeOpacity: true,
                strokeWidth: true,
              }
              function q(t, e) {
                return !isNaN(e) && !X[t] ? e + "px" : e
              }
              function K(t, e) {
                var i = (t.attrs || c).style
                var n = e ? (e.attrs || c).style : null
                if (i == null || a(i)) t.el.style.cssText = i
                else {
                  for (var o in i) {
                    var r = i[o]
                    if (n == null || (r != null && r !== n[o])) t.el.style[o] = q(o, r)
                  }
                  if (n) for (var s in n) if (i[s] == null) t.el.style[s] = ""
                }
              }
              var J = []
              function Z(t, e, i, n, o) {
                if (t != null) {
                  var r = i.hooks[e]
                  if (r)
                    if (e[0] === "d" && e[1] === "i" && e[2] === "d")
                      o ? S(i.parent) && r(i, n) : J.push([r, i, n])
                    else return r(i, n)
                }
              }
              function Q(t) {
                if (J.length) {
                  S(t.node)
                  var e
                  while ((e = J.shift())) e[0](e[1], e[2])
                }
              }
              var tt = t ? document : null
              function et(t) {
                while (t._node == null) t = t.parentNode
                return t._node
              }
              function it(t, e) {
                if (e != null) return tt.createElementNS(e, t)
                return tt.createElement(t)
              }
              function nt(t) {
                return tt.createTextNode(t)
              }
              function ot(t) {
                return tt.createComment(t)
              }
              function rt(t) {
                return t.nextSibling
              }
              function st(t) {
                return t.previousSibling
              }
              function at(t) {
                var e = t.vm
                var i = e != null && Z(e.hooks, "willUnmount", e, e.data)
                var n = Z(t.hooks, "willRemove", t)
                if ((t.flags & N) === N && p(t.body))
                  for (var o = 0; o < t.body.length; o++) at(t.body[o])
                return i || n
              }
              function lt(t, e, i) {
                var n = e._node,
                  o = n.vm
                if (p(n.body))
                  if ((n.flags & N) === N)
                    for (var r = 0; r < n.body.length; r++) lt(e, n.body[r].el)
                  else dt(n)
                delete e._node
                t.removeChild(e)
                Z(n.hooks, "didRemove", n, null, i)
                if (o != null) {
                  Z(o.hooks, "didUnmount", o, o.data, i)
                  o.node = null
                }
              }
              function ct(t, e) {
                var i = e._node
                if (i._dead) return
                var n = at(i)
                if (n != null && h(n)) {
                  i._dead = true
                  n.then(b(lt, [t, e, true]))
                } else lt(t, e)
              }
              function dt(t) {
                var e = t.body
                for (var i = 0; i < e.length; i++) {
                  var n = e[i]
                  delete n.el._node
                  if (n.vm != null) n.vm.node = null
                  if (p(n.body)) dt(n)
                }
              }
              function ut(t) {
                var e = t.el
                if ((t.flags & N) === 0) {
                  p(t.body) && dt(t)
                  e.textContent = null
                } else {
                  var i = e.firstChild
                  do {
                    var n = rt(i)
                    ct(e, i)
                  } while ((i = n))
                }
              }
              function ht(t, e, i) {
                var n = e._node,
                  o = e.parentNode != null
                var r = e === i || !o ? n.vm : null
                if (r != null) Z(r.hooks, "willMount", r, r.data)
                Z(n.hooks, o ? "willReinsert" : "willInsert", n)
                t.insertBefore(e, i)
                Z(n.hooks, o ? "didReinsert" : "didInsert", n)
                if (r != null) Z(r.hooks, "didMount", r, r.data)
              }
              function ft(t, e, i) {
                ht(t, e, i ? rt(i) : null)
              }
              var pt = {}
              function _t(t) {
                f(pt, t)
              }
              function gt(t) {
                var e = this,
                  i = e,
                  n = g(arguments, 1).concat(i, i.data)
                do {
                  var o = e.onemit,
                    o = o ? o[t] : null
                  if (o) {
                    o.apply(e, n)
                    break
                  }
                } while ((e = e.parent()))
                if (pt[t]) pt[t].apply(e, n)
              }
              var vt = i
              function mt(t) {
                vt = t.onevent || vt
                if (t.onemit) _t(t.onemit)
              }
              function yt(t, e, i) {
                t[e] = i
              }
              function bt(t, e, i, n, o) {
                var r = t.apply(o, e.concat([i, n, o, o.data]))
                o.onevent(i, n, o, o.data, e)
                vt.call(null, i, n, o, o.data, e)
                if (r === false) {
                  i.preventDefault()
                  i.stopPropagation()
                }
              }
              function xt(t) {
                var e = et(t.target)
                var i = H(e)
                var n = t.currentTarget._node.attrs["on" + t.type],
                  o,
                  r
                if (p(n)) {
                  o = n[0]
                  r = n.slice(1)
                  bt(o, r, t, e, i)
                } else
                  for (var s in n)
                    if (t.target.matches(s)) {
                      var a = n[s]
                      if (p(a)) {
                        o = a[0]
                        r = a.slice(1)
                      } else {
                        o = a
                        r = []
                      }
                      bt(o, r, t, e, i)
                    }
              }
              function wt(t, e, i, n) {
                if (i === n) return
                var o = t.el
                if (i == null || u(i)) yt(o, e, i)
                else if (n == null) yt(o, e, xt)
              }
              function Ct(t, e, i) {
                if (e[0] === ".") {
                  e = e.substr(1)
                  i = true
                }
                if (i) t.el[e] = ""
                else t.el.removeAttribute(e)
              }
              function Et(t, e, i, n, o) {
                var r = t.el
                if (i == null) !o && Ct(t, e, false)
                else if (t.ns != null) r.setAttribute(e, i)
                else if (e === "class") r.className = i
                else if (e === "id" || typeof i === "boolean" || n) r[e] = i
                else if (e[0] === ".") r[e.substr(1)] = i
                else r.setAttribute(e, i)
              }
              function kt(t, e, i) {
                var n = t.attrs || c
                var o = e.attrs || c
                if (n === o);
                else {
                  for (var r in n) {
                    var s = n[r]
                    var a = P(t.tag, r)
                    var l = a ? t.el[r] : o[r]
                    if (s === l);
                    else if (k(r)) K(t, e)
                    else if (E(r));
                    else if (C(r)) wt(t, r, s, l)
                    else Et(t, r, s, a, i)
                  }
                  for (var r in o) !(r in n) && !E(r) && Ct(t, r, P(t.tag, r) || C(r))
                }
              }
              function St(t, e, i, n) {
                if (t.type === M) {
                  e = t.data
                  i = t.key
                  n = t.opts
                  t = t.view
                }
                return new Yt(t, e, i, n)
              }
              function Dt(t) {
                for (var e = 0; e < t.body.length; e++) {
                  var i = t.body[e]
                  var n = i.type
                  if (n <= O) ht(t.el, Ot(i))
                  else if (n === M) {
                    var o = St(i.view, i.data, i.key, i.opts)._redraw(t, e, false)
                    n = o.node.type
                    ht(t.el, Ot(o.node))
                  } else if (n === I) {
                    var o = i.vm
                    o._redraw(t, e)
                    n = o.node.type
                    ht(t.el, o.node.el)
                  }
                }
              }
              function Ot(t, e) {
                if (t.el == null)
                  if (t.type === D) {
                    t.el = e || it(t.tag, t.ns)
                    if (t.attrs != null) kt(t, c, true)
                    if ((t.flags & W) === W) t.body.body(t)
                    if (p(t.body)) Dt(t)
                    else if (t.body != null && t.body !== "") t.el.textContent = t.body
                  } else if (t.type === l) t.el = e || nt(t.body)
                  else if (t.type === O) t.el = e || ot(t.body)
                t.el._node = t
                return t.el
              }
              function Mt(t, e) {
                return e[t.idx + 1]
              }
              function It(t, e) {
                return e[t.idx - 1]
              }
              function Tt(t) {
                return t.parent
              }
              window.lisMove = Rt
              var Pt = 1,
                Ht = 2
              function At(l, c, d, u, h, f, p, _) {
                return function (t, e, i, n, o, r) {
                  var s, a
                  if (n[u] != null) {
                    if ((s = n[u]._node) == null) {
                      n[u] = l(n[u])
                      return
                    }
                    if (Tt(s) !== t) {
                      a = l(n[u])
                      s.vm != null ? s.vm.unmount(true) : ct(e, n[u])
                      n[u] = a
                      return
                    }
                  }
                  if (n[h] == o) return Ht
                  else if (n[h].el == null) {
                    d(e, Ot(n[h]), n[u])
                    n[h] = c(n[h], i)
                  } else if (n[h].el === n[u]) {
                    n[h] = c(n[h], i)
                    n[u] = l(n[u])
                  } else if (!r && s === n[p]) {
                    a = n[u]
                    n[u] = l(a)
                    _(e, a, n[f])
                    n[f] = a
                  } else {
                    if (r && n[u] != null) return Rt(l, c, d, u, h, e, i, s, n)
                    return Pt
                  }
                }
              }
              function Rt(t, e, i, n, o, r, s, a, l) {
                if (a._lis) {
                  i(r, l[o].el, l[n])
                  l[o] = e(l[o], s)
                } else {
                  var c = w(a.idx, l.tombs)
                  a._lis = true
                  var d = t(l[n])
                  i(r, l[n], c != null ? s[l.tombs[c]].el : c)
                  if (c == null) l.tombs.push(a.idx)
                  else l.tombs.splice(c, 0, a.idx)
                  l[n] = d
                }
              }
              var Lt = At(rt, Mt, ht, "lftSib", "lftNode", "rgtSib", "rgtNode", ft),
                jt = At(st, It, ft, "rgtSib", "rgtNode", "lftSib", "lftNode", ht)
              function Ft(t, e) {
                var i = e.body,
                  n = t.el,
                  o = t.body,
                  r = {
                    lftNode: o[0],
                    rgtNode: o[o.length - 1],
                    lftSib: (i[0] || c).el,
                    rgtSib: (i[i.length - 1] || c).el,
                  }
                t: while (1) {
                  while (1) {
                    var s = Lt(t, n, o, r, null, false)
                    if (s === Pt) break
                    if (s === Ht) break t
                  }
                  while (1) {
                    var a = jt(t, n, o, r, r.lftNode, false)
                    if (a === Pt) break
                    if (a === Ht) break t
                  }
                  Nt(t, n, o, r)
                  break
                }
              }
              function Nt(t, e, i, n) {
                var o = Array.prototype.slice.call(e.childNodes)
                var r = []
                for (var s = 0; s < o.length; s++) {
                  var a = o[s]._node
                  if (a.parent === t) r.push(a.idx)
                }
                var l = x(r).map(function (t) {
                  return r[t]
                })
                for (var c = 0; c < l.length; c++) i[l[c]]._lis = true
                n.tombs = l
                while (1) {
                  var d = Lt(t, e, i, n, null, true)
                  if (d === Ht) break
                }
              }
              function $t(t) {
                return t.el._node.parent !== t.parent
              }
              function Vt(t, e, i) {
                return e[i]
              }
              function Wt(t, e, i) {
                for (; i < e.length; i++) {
                  var n = e[i]
                  if (n.vm != null) {
                    if (
                      (t.type === M && n.vm.view === t.view && n.vm.key === t.key) ||
                      (t.type === I && n.vm === t.vm)
                    )
                      return n
                  } else if (
                    !$t(n) &&
                    t.tag === n.tag &&
                    t.type === n.type &&
                    t.key === n.key &&
                    (t.flags & ~N) === (n.flags & ~N)
                  )
                    return n
                }
                return null
              }
              function zt(t, e, i) {
                return e[e._keys[t.key]]
              }
              function Bt(t, e) {
                Z(e.hooks, "willRecycle", e, t)
                var i = (t.el = e.el)
                var n = e.body
                var o = t.body
                i._node = t
                if (t.type === l && o !== n) {
                  i.nodeValue = o
                  return
                }
                if (t.attrs != null || e.attrs != null) kt(t, e, false)
                var r = p(n)
                var s = p(o)
                var a = (t.flags & W) === W
                if (r) {
                  if (s || a) Gt(t, e)
                  else if (o !== n)
                    if (o != null) i.textContent = o
                    else ut(e)
                } else if (s) {
                  ut(e)
                  Dt(t)
                } else if (o !== n)
                  if (i.firstChild) i.firstChild.nodeValue = o
                  else i.textContent = o
                Z(e.hooks, "didRecycle", e, t)
              }
              function Gt(t, e) {
                var i = t.body,
                  n = i.length,
                  o = e.body,
                  r = o.length,
                  s = (t.flags & W) === W,
                  a = (t.flags & $) === $,
                  l = (t.flags & V) === V,
                  c = !a && t.type === D,
                  d = true,
                  u = l ? zt : a || s ? Vt : Wt
                if (l) {
                  var h = {}
                  for (var f = 0; f < o.length; f++) h[o[f].key] = f
                  o._keys = h
                }
                if (c && n === 0) {
                  ut(e)
                  if (s) t.body = []
                  return
                }
                var p,
                  _,
                  g,
                  v = 0,
                  m = false,
                  y = 0
                if (s) {
                  var b = { key: null }
                  var x = Array(n)
                }
                for (var f = 0; f < n; f++) {
                  if (s) {
                    var w = false
                    var C = null
                    if (d) {
                      if (l) b.key = i.key(f)
                      p = u(b, o, y)
                    }
                    if (p != null) {
                      g = p.idx
                      C = i.diff(f, p)
                      if (C === true) {
                        _ = p
                        _.parent = t
                        _.idx = f
                        _._lis = false
                      } else w = true
                    } else w = true
                    if (w) {
                      _ = i.tpl(f)
                      Y(_, t, f)
                      _._diff = C != null ? C : i.diff(f)
                      if (p != null) Bt(_, p)
                    } else;
                    x[f] = _
                  } else {
                    var _ = i[f]
                    var E = _.type
                    if (E <= O) {
                      if ((p = d && u(_, o, y))) {
                        Bt(_, p)
                        g = p.idx
                      }
                    } else if (E === M) {
                      if ((p = d && u(_, o, y))) {
                        g = p.idx
                        var k = p.vm._update(_.data, t, f)
                      } else var k = St(_.view, _.data, _.key, _.opts)._redraw(t, f, false)
                      E = k.node.type
                    } else if (E === I) {
                      var S = T(_.vm)
                      var k = _.vm._update(_.data, t, f, S)
                      E = k.node.type
                    }
                  }
                  if (!l && p != null) {
                    if (g === y) {
                      y++
                      if (y === r && n > r) {
                        p = null
                        d = false
                      }
                    } else m = true
                    if (r > 100 && m && ++v % 10 === 0) while (y < r && $t(o[y])) y++
                  }
                }
                if (s) t.body = x
                c && Ft(t, e)
              }
              function Yt(t, e, i, n) {
                var o = this
                o.view = t
                o.data = e
                o.key = i
                if (n) {
                  o.opts = n
                  o.config(n)
                }
                var r = s(t) ? t : t.call(o, o, e, i, n)
                if (u(r)) o.render = r
                else {
                  o.render = r.render
                  o.config(r)
                }
                o._redrawAsync = y(function (t) {
                  return o.redraw(true)
                })
                o._updateAsync = y(function (t) {
                  return o.update(t, true)
                })
                o.init && o.init.call(o, o, o.data, o.key, n)
              }
              var Ut = (Yt.prototype = {
                constructor: Yt,
                _diff: null,
                init: null,
                view: null,
                key: null,
                data: null,
                state: null,
                api: null,
                opts: null,
                node: null,
                hooks: null,
                onevent: i,
                refs: null,
                render: null,
                mount: Xt,
                unmount: qt,
                config: function (t) {
                  var e = this
                  if (t.init) e.init = t.init
                  if (t.diff) e.diff = t.diff
                  if (t.onevent) e.onevent = t.onevent
                  if (t.hooks) e.hooks = f(e.hooks || {}, t.hooks)
                  if (t.onemit) e.onemit = f(e.onemit || {}, t.onemit)
                },
                parent: function () {
                  return H(this.node.parent)
                },
                root: function () {
                  var t = this.node
                  while (t.parent) t = t.parent
                  return t.vm
                },
                redraw: function (t) {
                  var e = this
                  t ? e._redraw(null, null, T(e)) : e._redrawAsync()
                  return e
                },
                update: function (t, e) {
                  var i = this
                  e ? i._update(t, null, null, T(i)) : i._updateAsync(t)
                  return i
                },
                _update: Zt,
                _redraw: Jt,
                _redrawAsync: null,
                _updateAsync: null,
              })
              function Xt(t, e) {
                var i = this
                if (e) {
                  ut({ el: t, flags: 0 })
                  i._redraw(null, null, false)
                  if (t.nodeName.toLowerCase() !== i.node.tag) {
                    Ot(i.node)
                    ht(t.parentNode, i.node.el, t)
                    t.parentNode.removeChild(t)
                  } else ht(t.parentNode, Ot(i.node, t), t)
                } else {
                  i._redraw(null, null)
                  if (t) ht(t, i.node.el)
                }
                if (t) Q(i)
                return i
              }
              function qt(t) {
                var e = this
                var i = e.node
                var n = i.el.parentNode
                ct(n, i.el)
                if (!t) Q(e)
              }
              function Kt(t, e, i, n) {
                if (i != null) {
                  i.body[n] = e
                  e.idx = n
                  e.parent = i
                  e._lis = false
                }
                return t
              }
              function Jt(t, e, i) {
                var n = t == null
                var o = this
                var r = o.node && o.node.el && o.node.el.parentNode
                var s = o.node,
                  a,
                  l
                if (o.diff != null) {
                  a = o._diff
                  o._diff = l = o.diff(o, o.data)
                  if (s != null) {
                    var c = p(a) ? m : v
                    var d = a === l || c(a, l)
                    if (d) return Kt(o, s, t, e)
                  }
                }
                r && Z(o.hooks, "willRedraw", o, o.data)
                var u = o.render.call(o, o, o.data, a, l)
                if (u === s) return Kt(o, s, t, e)
                o.refs = null
                if (o.key != null && u.key !== o.key) u.key = o.key
                o.node = u
                if (t) {
                  Y(u, t, e, o)
                  t.body[e] = u
                } else if (s && s.parent) {
                  Y(u, s.parent, s.idx, o)
                  s.parent.body[s.idx] = u
                } else Y(u, null, null, o)
                if (i !== false)
                  if (s)
                    if (s.tag !== u.tag || s.key !== u.key) {
                      s.vm = u.vm = null
                      var h = s.el.parentNode
                      var f = rt(s.el)
                      ct(h, s.el)
                      ht(h, Ot(u), f)
                      s.el = u.el
                      u.vm = o
                    } else Bt(u, s)
                  else Ot(u)
                r && Z(o.hooks, "didRedraw", o, o.data)
                if (n && r) Q(o)
                return o
              }
              function Zt(t, e, i, n) {
                var o = this
                if (t != null)
                  if (o.data !== t) {
                    Z(o.hooks, "willUpdate", o, t)
                    o.data = t
                  }
                return o._redraw(e, i, n)
              }
              function Qt(t, e, i, n) {
                var o, r
                if (i == null)
                  if (s(e)) o = e
                  else r = e
                else {
                  o = e
                  r = i
                }
                return z(t, o, r, n)
              }
              var te = "http://www.w3.org/2000/svg"
              function ee(t, e, i, n) {
                var o = Qt(t, e, i, n)
                o.ns = te
                return o
              }
              function ie(t) {
                var e = new A()
                e.type = O
                e.body = t
                return e
              }
              function ne(t, e, i, n) {
                this.view = t
                this.data = e
                this.key = i
                this.opts = n
              }
              function oe(t, e, i, n) {
                return new ne(t, e, i, n)
              }
              function re(t) {
                this.vm = t
              }
              function se(t) {
                return new re(t)
              }
              function ae(t) {
                var e = new A()
                e.type = D
                e.el = e.key = t
                return e
              }
              function le(r, s) {
                var o = r.length
                var a = {
                  items: r,
                  length: o,
                  key: function (t) {
                    return s.key(r[t], t)
                  },
                  diff: function (t, e) {
                    var i = s.diff(r[t], t)
                    if (e == null) return i
                    var n = e._diff
                    var o = i === n || p(n) ? m(i, n) : v(i, n)
                    return o || i
                  },
                  tpl: function (t) {
                    return s.tpl(r[t], t)
                  },
                  map: function (t) {
                    s.tpl = t
                    return a
                  },
                  body: function (t) {
                    var e = Array(o)
                    for (var i = 0; i < o; i++) {
                      var n = a.tpl(i)
                      n._diff = a.diff(i)
                      e[i] = n
                      Y(n, t, i)
                    }
                    t.body = e
                  },
                }
                return a
              }
              ;(ne.prototype = {
                constructor: ne,
                type: M,
                view: null,
                data: null,
                key: null,
                opts: null,
              }),
                (re.prototype = { constructor: re, type: I, vm: null })
              var ce = {
                config: mt,
                ViewModel: Yt,
                VNode: A,
                createView: St,
                defineElement: Qt,
                defineSvgElement: ee,
                defineText: R,
                defineComment: ie,
                defineView: oe,
                injectView: se,
                injectElement: ae,
                lazyList: le,
                FIXED_BODY: $,
                DEEP_REMOVE: N,
                KEYED_LIST: V,
                LAZY_LIST: W,
              }
              function de(t, e) {
                !(function (t, e, i) {
                  {
                    var n, o
                    null != e.type
                      ? null == t.vm &&
                        (Y(e, t.parent, t.idx, null),
                        Bt((t.parent.body[t.idx] = e), t),
                        i && S(e),
                        Q(H(e)))
                      : (((n = Object.create(t)).attrs = f({}, t.attrs)),
                        (o = f(t.attrs, e)),
                        null != t._class &&
                          ((e = o.class),
                          (o.class = null != e && "" !== e ? t._class + " " + e : t._class)),
                        kt(t, n),
                        i && S(t))
                  }
                })(this, t, e)
              }
              function ue(t, e, i) {
                if (null != e.type)
                  null == t.vm &&
                    (Y(e, t.parent, t.idx, null),
                    Bt((t.parent.body[t.idx] = e), t),
                    i && S(e),
                    Q(H(e)))
                else {
                  var n = Object.create(t)
                  ;(n = Object.create(t)).attrs = f({}, t.attrs)
                  var o = f(t.attrs, e),
                    s
                  null != t._class &&
                    ((e = o.class),
                    (o.class = null != e && "" !== e ? t._class + " " + e : t._class)),
                    kt(t, n),
                    i && S(t)
                }
              }
              function he(t, e) {
                var i = t.body
                if (p(i))
                  for (var n = 0; n < i.length; n++) {
                    var o = i[n]
                    if (o.vm != null) e.push(o.vm)
                    else he(o, e)
                  }
                return e
              }
              function fe(t) {
                var e = arguments
                var i = e.length
                var n, o
                if (i > 1) {
                  var r = 1
                  if (s(e[1])) {
                    o = e[1]
                    r = 2
                  }
                  if (i === r + 1 && (a(e[r]) || p(e[r]) || (o && (o._flags & W) === W))) n = e[r]
                  else n = g(e, r)
                }
                return z(t, o, n)
              }
              function pe() {
                var t = fe.apply(null, arguments)
                return (t.ns = te), t
              }
              return (
                (n.patch = function (t, e) {
                  !(function (t, e, i) {
                    {
                      var n, o
                      null != e.type
                        ? null == t.vm &&
                          (Y(e, t.parent, t.idx, null),
                          Bt((t.parent.body[t.idx] = e), t),
                          i && S(e),
                          Q(H(e)))
                        : (((n = Object.create(t)).attrs = f({}, t.attrs)),
                          (o = f(t.attrs, e)),
                          null != t._class &&
                            ((e = o.class),
                            (o.class = null != e && "" !== e ? t._class + " " + e : t._class)),
                          kt(t, n),
                          i && S(t))
                    }
                  })(this, t, e)
                }),
                (Ut.emit = function (t) {
                  var e = this,
                    i = e,
                    n = g(arguments, 1).concat(i, i.data)
                  do {
                    var o = e.onemit,
                      o = o ? o[t] : null
                    if (o) {
                      o.apply(e, n)
                      break
                    }
                  } while ((e = e.parent()))
                  pt[t] && pt[t].apply(e, n)
                }),
                (Ut.onemit = null),
                (Ut.body = function () {
                  return (function t(e, i) {
                    var n = e.body
                    if (p(n))
                      for (var o = 0; o < n.length; o++) {
                        var r = n[o]
                        null != r.vm ? i.push(r.vm) : t(r, i)
                      }
                    return i
                  })(this.node, [])
                }),
                (ce.defineElementSpread = fe),
                (ce.defineSvgElementSpread = function () {
                  var t = fe.apply(null, arguments)
                  return (t.ns = te), t
                }),
                ce
              )
            })()
          },
          function (t, e, i) {
            "use strict"
            var n =
                (this && this.__assign) ||
                function () {
                  return (n =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                },
              a =
                (this && this.__spreadArrays) ||
                function () {
                  for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length
                  for (var n = Array(t), o = 0, e = 0; e < i; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s]
                  return n
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var v = i(7),
              l = i(4),
              o = i(1)
            ;(r.prototype.xlsx = function (t) {
              return this._export(t)
            }),
              (r.prototype.csv = function (t) {
                var e
                void 0 === t && (t = {}),
                  (t = n(
                    { asFile: !0, rowDelimiter: "\n", columnDelimiter: ",", skipHeader: 0 },
                    t
                  )),
                  (e =
                    "getRoot" in this._view.data && t.flat ? this.getFlatCSV(t) : this._getCSV(t))
                var i = t.name || "grid_export"
                return t.asFile && o.downloadFile(e, i + ".csv", "text/csv"), e
              }),
              (r.prototype._export = function (t) {
                void 0 === t && (t = {})
                for (
                  var c = this._view.config.columns.filter(function (t) {
                      return !t.hidden
                    }),
                    d = {},
                    e = v.transpose(
                      c.map(function (t) {
                        return t.header.map(function (t) {
                          return t.text || " "
                        })
                      })
                    ),
                    u = [],
                    h = { default: { color: "#000000", background: "#FFFFFF", fontSize: 14 } },
                    f = [],
                    n = {},
                    i = this._view.data.serialize().map(function (i, t) {
                      return (
                        (d[i.id] = t),
                        c.map(function (t, e) {
                          return (n[t.id] = e), v.removeHTMLTags(i[t.id])
                        })
                      )
                    }),
                    p = [],
                    _ = this._view.content,
                    g = this,
                    o = 0,
                    r = c;
                  o < r.length;
                  o++
                )
                  !(function (t) {
                    var n, e, o, i, r
                    for (r in (t.footer &&
                      ((n = t.id),
                      (i = e =
                        g._view.data.serialize().reduce(function (t, e) {
                          return (
                            void 0 === e[n] ||
                              "" === e[n] ||
                              isNaN(e[n]) ||
                              t.push(parseFloat(e[n])),
                            t
                          )
                        }, [])),
                      "tree" === g._view.config.type &&
                        (i = (o = g._view.data).serialize().reduce(function (t, e) {
                          var i
                          return (
                            0 === e.$level &&
                              (void 0 === e[n] || "" === e[n] || isNaN(e[n])
                                ? ((i = 0),
                                  o.eachChild(e.id, function (t) {
                                    o.haveItems(t.id) || (i += parseFloat(t[n]))
                                  }),
                                  t.push(i))
                                : t.push(parseFloat(e[n]) || 0)),
                            t
                          )
                        }, [])),
                      t.footer[0].content
                        ? ((i = _[t.footer[0].content].calculate(e, i)), p.push(i))
                        : p.push(t.footer[0].css || t.footer[0].text || " ")),
                    u.push({ width: t.width }),
                    t.$cellCss)) {
                      var s,
                        a = t.$cellCss[r],
                        l = a
                          .split("")
                          .reduce(function (t, e) {
                            e = (t << 5) - t + e.charCodeAt(0)
                            return Math.abs(e & e)
                          }, 0)
                          .toString()
                      h[l] ||
                        ((s = document.body),
                        (s = v.getStyleByClass(a, s, "dhx_grid-row", h.default)) && (h[l] = s)),
                        h[l] && f.push([d[r], c.indexOf(t), l])
                    }
                  })(r[o])
                p.length && i.push(p)
                var s,
                  i = {
                    name: t.name || "data",
                    columns: u,
                    header: e,
                    data: i,
                    styles: { cells: f, css: h },
                  }
                return (
                  t.url &&
                    ((s = document.createElement("form")).setAttribute("target", "_blank"),
                    s.setAttribute("action", t.url),
                    s.setAttribute("method", "POST"),
                    (s.style.visibility = "hidden"),
                    (t = document.createElement("textarea")).setAttribute("name", "data"),
                    (t.value = JSON.stringify(i)),
                    s.appendChild(t),
                    document.body.appendChild(s),
                    s.submit(),
                    setTimeout(function () {
                      s.parentNode.removeChild(s)
                    }, 100)),
                  i
                )
              }),
              (r.prototype.getFlatCSV = function (o) {
                var e = this._view.data,
                  t = e.getRoot(),
                  r = this._view.config.columns[0],
                  s = e.getMaxLevel(),
                  i = ""
                e.eachChild(t, function (n) {
                  var t = (function (t, e) {
                    for (var i, n = [], o = 0; o <= s; o++)
                      t && t[r.id]
                        ? ((n[t.$level] = t[r.id]),
                          (t = (i = e.getParent(t.id, !0)) && i.id ? i : null))
                        : (n[o] = "")
                    return n
                  })(n, e).join(o.columnDelimiter)
                  ;(i +=
                    t +
                    Object.keys(n).reduce(function (t, e, i) {
                      return "id" === e || "parent" === e || e.startsWith("$") || 0 === i
                        ? t
                        : t + o.columnDelimiter + (null === n[e] ? "" : n[e])
                    }, "")),
                    (i += o.rowDelimiter)
                })
                var t = this._export(o),
                  n = (function (t, e) {
                    for (var i = 0; i < t.length; i++) t[i] = e
                    return t
                  })(new Array(s + 1), ""),
                  t = t.header.map(function (t) {
                    return t.splice.apply(t, a([0, 1], n)), t
                  })
                return new l.CsvDriver(o).serialize(t, !0) + o.rowDelimiter + i
              }),
              (r.prototype._getCSV = function (t) {
                var e = this._export(t),
                  i = e.header,
                  t = new l.CsvDriver(t)
                return t.serialize(i, !0) + "\n" + t.serialize(e.data, !0)
              }),
              (i = r)
            function r(t) {
              this._view = t
            }
            e.Exporter = i
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var h = i(0),
              d = i(1),
              o = i(4),
              r = i(5),
              f = i(3),
              p = i(19),
              i =
                ((n.prototype.setCell = function (e, i, t, n) {
                  var o,
                    r,
                    s,
                    a,
                    l,
                    c,
                    d,
                    u = this
                  void 0 === t && (t = !1),
                    void 0 === n && (n = !1),
                    this._gridId &&
                      p.focusManager.getFocusId() !== this._gridId &&
                      p.focusManager.setFocusId(this._gridId),
                    this.config.disabled ||
                      this._grid.config.$editable ||
                      (!this._multiselection &&
                        this._oldSelectedCell &&
                        this._oldSelectedCell.row.id === ((e && e.id) || e) &&
                        this._oldSelectedCell.column.id === ((i && i.id) || i)) ||
                      (this._multiselection &&
                        1 === this._selectedCells.length &&
                        this._selectedCells[0].row.id === ((e && e.id) || e) &&
                        this._selectedCells[0].column.id === ((i && i.id) || i)) ||
                      (((!this._multiselection || t || n) && this._multiselection) ||
                        (this._selectedCells.length && this._removeCells()),
                      this._multiselection &&
                      "cell" === this._type &&
                      this._selectedCells.find(function (t) {
                        return t.row.id === ((e && e.id) || e) && t.column.id === ((i && i.id) || i)
                      })
                        ? this.removeCell((e && e.id) || e, (i && i.id) || i)
                        : ((l = this._oldSelectedCell || void 0),
                          (e = this._grid.data.getItem((e && e.id) || e)),
                          (o = this._grid.config.columns.filter(function (t) {
                            return !t.hidden
                          })),
                          (i = i || o[0]),
                          (i = this._grid.getColumn(i.id || i)) &&
                            e &&
                            ((i = i.id ? i : this._grid.getColumn(i)),
                            this.events.fire(f.GridSelectionEvents.beforeSelect, [e, i]) &&
                              ((this._selectedCell = { row: e, column: i }),
                              this.events.fire(f.GridSelectionEvents.afterSelect, [e, i]),
                              this._multiselection && n && l
                                ? (this._oldSelectedCell = l)
                                : (this._oldSelectedCell = this._selectedCell),
                              this._multiselection
                                ? n && !t && 0 < this._selectedCells.length
                                  ? ((r = this._grid.data.getIndex(this._oldSelectedCell.row.id)),
                                    (s = this._grid.data.getIndex(e.id)) < r &&
                                      ((a = r), (r = s), (s = a)),
                                    (this._selectedCells = [this._oldSelectedCell]),
                                    "cell" === this._type
                                      ? ((l = (c = o.map(function (t) {
                                          return t.id
                                        })).indexOf(l.column.id)),
                                        (c = c.indexOf(i.id)),
                                        -1 !== l &&
                                          -1 !== c &&
                                          (c < l && ((a = l), (l = c), (c = a)),
                                          (d = o.slice(l, c + 1)),
                                          this._grid.data.mapRange(r, s, function (e) {
                                            d.forEach(function (t) {
                                              t = { row: e, column: t }
                                              ;-1 === u._findIndex(t) && u._selectedCells.push(t)
                                            })
                                          })))
                                      : this._grid.data.mapRange(r, s, function (t) {
                                          t = { row: t, column: i }
                                          ;-1 === u._findIndex(t) && u._selectedCells.push(t)
                                        }))
                                  : t && !n
                                  ? -1 === (n = this._findIndex())
                                    ? this._selectedCells.push({
                                        row: this._selectedCell.row,
                                        column: this._selectedCell.column,
                                      })
                                    : 1 < this._selectedCells.length &&
                                      this._selectedCells.splice(n, 1)
                                  : (this._selectedCells = [this._selectedCell])
                                : (this._selectedCells = [this._selectedCell]),
                              h.awaitRedraw().then(function () {
                                u._grid.paint(), u._setBrowserFocus()
                              })))))
                }),
                (n.prototype.getCell = function () {
                  return this._selectedCell
                }),
                (n.prototype.getCells = function () {
                  return this._selectedCells
                }),
                (n.prototype.toHTML = function () {
                  var n = this
                  if (!this._isUnselected()) {
                    if (this._multiselection) {
                      var o = []
                      return (
                        this._selectedCells.forEach(function (t, e, i) {
                          o.push(
                            n._toHTML(t.row, t.column, e === i.length - 1 || "cell" === n._type)
                          )
                        }),
                        o
                      )
                    }
                    return this._toHTML(this._selectedCell.row, this._selectedCell.column, !0)
                  }
                }),
                (n.prototype.disable = function () {
                  this.removeCell(), (this.config.disabled = !0), this._grid.paint()
                }),
                (n.prototype.enable = function () {
                  ;(this.config.disabled = !1), this._grid.paint()
                }),
                (n.prototype.removeCell = function (i, n) {
                  var t,
                    o = this
                  i && n && "cell" === this._type
                    ? (t = this._selectedCells.find(function (t) {
                        var e = t.row,
                          t = t.column
                        return e.id == i && t.id == n
                      })) && this._removeCell(t.row, t.column)
                    : i
                    ? this._selectedCells
                        .filter(function (t) {
                          return t.row.id == i
                        })
                        .forEach(function (t) {
                          var e = t.row,
                            t = t.column
                          o._removeCell(e, t)
                        })
                    : this._removeCells(),
                    h.awaitRedraw().then(function () {
                      o._grid.paint()
                    })
                }),
                (n.prototype._removeCell = function (e, i) {
                  var t
                  e &&
                    i &&
                    e.id &&
                    i.id &&
                    this.events.fire(f.GridSelectionEvents.beforeUnSelect, [e, i]) &&
                    ((t = this._selectedCells.findIndex(function (t) {
                      return t.row.id === e.id && t.column.id === i.id
                    })),
                    this._selectedCells.splice(t, 1),
                    this._selectedCell &&
                      i.id === this._selectedCell.column.id &&
                      e.id === this._selectedCell.row.id &&
                      (this._selectedCell =
                        this._selectedCells[this._selectedCells.length - 1] || void 0),
                    this.events.fire(f.GridSelectionEvents.afterUnSelect, [e, i]))
                }),
                (n.prototype._removeCells = function () {
                  var e = this
                  this._selectedCells.forEach(function (t) {
                    e._removeCell(t && t.row, t && t.column)
                  }),
                    this._selectedCells.length && this._removeCells()
                }),
                (n.prototype._init = function () {
                  var n = this
                  this._grid.events.on(f.GridEvents.cellClick, function (t, e, i) {
                    n.setCell(t, e, i.ctrlKey || i.metaKey, i.shiftKey)
                  }),
                    this._grid.data.events.on(o.DataEvents.beforeRemove, function (t) {
                      var e
                      t &&
                        n._selectedCell &&
                        n._selectedCell.row &&
                        ((e = n._grid.data.getIndex(String(n._selectedCell.row.id))),
                        (t = n._grid.data.getId(e + 1))
                          ? n.setCell(t)
                          : (e = n._grid.data.getId(e - 1)) && n.setCell(e),
                        n._grid.paint())
                    })
                }),
                (n.prototype._toHTML = function (e, t, i) {
                  void 0 === i && (i = !1)
                  var n = this._grid.data.getRawData(0, -1, null, 2)
                  if (
                    -1 ===
                    d.findIndex(n, function (t) {
                      return t.id == e.id
                    })
                  )
                    return null
                  var o,
                    r = this._grid.config.columns.filter(function (t) {
                      return !t.hidden
                    }),
                    s = this._grid.config.leftSplit ? r.slice(0, this._grid.config.leftSplit) : [],
                    a = s.map(function (t) {
                      return t.id
                    }),
                    l = s.reduce(function (t, e) {
                      return t + e.$width
                    }, 0),
                    c = this._grid.getCellRect(e.id, t.id),
                    n = this._grid.getScrollState()
                  a.includes(t.id) &&
                    i &&
                    (o = h.el(".dhx_grid-selected-cell", {
                      style: {
                        width:
                          this._grid.config.leftSplit === a.indexOf(t.id) + 1
                            ? c.width - 1
                            : c.width,
                        height: c.height,
                        top: c.y,
                        left: c.x + n.x,
                        position: "absolute",
                        zIndex: 10,
                      },
                    }))
                  ;(r = s.length && l > c.x - n.x), (a = c.width)
                  r && (a -= l - (c.x - n.x))
                  t = this._grid.config.$totalWidth
                  return h.el(
                    ".dhx_grid-selection",
                    {
                      style: {
                        zIndex:
                          o ||
                          "row" === this._grid.config.selection ||
                          "complex" === this._grid.config.selection
                            ? 20
                            : 10,
                      },
                    },
                    [
                      ("row" === this._type || "complex" === this._type) &&
                        h.el(".dhx_grid-selected-row", {
                          style: {
                            width: s.length ? t - n.x : t,
                            height: c.height - 1,
                            top: c.y,
                            left: s.length ? n.x : 0,
                            position: "absolute",
                          },
                        }),
                      (("cell" === this._type || "complex" === this._type) && o) ||
                        (("cell" === this._type || "complex" === this._type) &&
                          i &&
                          h.el(".dhx_grid-selected-cell", {
                            style: {
                              width: a,
                              height: c.height - 1,
                              top: c.y,
                              left: r ? l + n.x : c.x,
                              position: "absolute",
                              display: 0 < a ? "flex" : "none",
                              borderLeft: r ? "none" : null,
                            },
                          })),
                    ]
                  )
                }),
                (n.prototype._isUnselected = function () {
                  return (
                    !this._selectedCell ||
                    !this._selectedCell.row ||
                    !this._selectedCell.column ||
                    0 === this._selectedCells.length
                  )
                }),
                (n.prototype._findIndex = function (i) {
                  var n = this
                  void 0 === i && (i = this._selectedCell)
                  var o = -1
                  return (
                    this._selectedCells.some(function (t, e) {
                      if ("cell" === n._type) {
                        if (d.compare(t.row, i.row) && d.compare(t.column, i.column))
                          return (o = e), !0
                      } else if ("row" === n._type && d.compare(t.row, i.row)) return (o = e), !0
                    }),
                    o
                  )
                }),
                (n.prototype._setBrowserFocus = function () {
                  var t,
                    e,
                    i = this._grid.getRootView().data.getRootNode()
                  !i ||
                    ((t = i.querySelector(".dhx_grid_data")) &&
                      this._selectedCell &&
                      this._selectedCell.row &&
                      this._selectedCell.column &&
                      ((e = t.querySelector('[dhx_id="' + this._selectedCell.row.id + '"]')),
                      (t = this._grid.getSpan(
                        this._selectedCell.row.id,
                        this._selectedCell.column.id
                      )),
                      !e ||
                        ((e = (i = t ? i.querySelector(".dhx_span-spans") : null)
                          ? i.querySelector(
                              '[dhx_col_id="' + t.column + '"][dhx_id="' + t.row + '"]'
                            )
                          : e.querySelector(
                              '[dhx_col_id="' + this._selectedCell.column.id + '"]'
                            )) &&
                          ((e.tabIndex = 0), e.focus({ preventScroll: !0 })))))
                }),
                n)
            function n(t, e, i, n) {
              ;(this._grid = t),
                (this.config = e),
                (this._gridId = n),
                (this._selectedCell = void 0),
                (this._oldSelectedCell = void 0),
                (this._selectedCells = []),
                (this._type = ["cell", "row", "complex"].includes(this._grid.config.selection)
                  ? this._grid.config.selection
                  : "complex"),
                (this._multiselection = t.config.multiselection && "complex" !== this._type),
                (this.events = i || new r.EventSystem(this)),
                this._init()
            }
            e.Selection = i
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var o,
              r = i(3),
              s = i(91),
              a = i(92),
              l = i(93),
              c = i(106),
              d = i(107),
              u = i(114),
              h = { cell: { row: null, col: null }, editor: null, gridId: null }
            e.getEditor = function (t, e, i) {
              var n = "boolean" === e.type ? "checkbox" : i.$editable.editorType
              if (
                (void 0 === n && (n = i.autoHeight ? "textarea" : "input"),
                h.cell.row === t.id &&
                  h.cell.col === e.id &&
                  h.gridId === i.gridId &&
                  i.$editable.editor)
              )
                return h.editor
              switch (
                ("checkbox" !== n &&
                  (h = { cell: { row: t.id, col: e.id }, editor: h.editor, gridId: i.gridId }),
                o ||
                  ((o = function () {
                    h = { cell: { row: null, col: null }, editor: null, gridId: null }
                  }),
                  i.events.on(r.GridEvents.afterEditEnd, o)),
                n)
              ) {
                case "input":
                  return (h.editor = new s.InputEditor(t, e, i))
                case "textarea":
                  return (h.editor = new u.TextAreaEditor(t, e, i))
                case "select":
                  return (h.editor = new a.SelectEditor(t, e, i))
                case "datePicker":
                  return (h.editor = new l.DateEditor(t, e, i))
                case "checkbox":
                  return new c.CheckboxEditor(t, e, i)
                case "multiselect":
                case "combobox":
                  return (h.editor = new d.ComboboxEditor(t, e, i))
                default:
                  return (h.editor = new s.InputEditor(t, e, i))
              }
            }
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(0),
              o = i(3),
              r = i(1),
              i =
                ((s.prototype.endEdit = function (t) {
                  var e
                  t || (e = this._input.value),
                    this._config.events.fire(o.GridEvents.beforeEditEnd, [
                      e,
                      this._cell.row,
                      this._cell.col,
                    ])
                      ? (this._input.removeEventListener("blur", this._handlers.onBlur),
                        this._input.removeEventListener("change", this._handlers.onChange),
                        "string" !== this._cell.col.type && r.isNumeric(e) && (e = parseFloat(e)),
                        (this._cell.row = this._config.datacollection.getItem(this._cell.row.id)),
                        this._config.events.fire(o.GridEvents.afterEditEnd, [
                          e,
                          this._cell.row,
                          this._cell.col,
                        ]))
                      : this._input.focus()
                }),
                (s.prototype.toHTML = function () {
                  var t = this._cell.row[this._cell.col.id]
                  return (
                    this._input && (t = this._input.value),
                    (this._config.$editable.editor = this),
                    n.el("input.dhx_cell-editor.dhx_cell-editor__input", {
                      _hooks: { didInsert: this._handlers.didInsert },
                      _key: "cell_editor",
                      dhx_id: "cell_editor",
                      value: t,
                    })
                  )
                }),
                (s.prototype._initHandlers = function () {
                  var e = this
                  this._handlers = {
                    onBlur: function () {
                      e.endEdit()
                    },
                    onChange: function () {
                      e.endEdit()
                    },
                    didInsert: function (t) {
                      t = t.el
                      ;(e._input = t).focus(),
                        t.setSelectionRange(0, t.value.length),
                        t.addEventListener("change", e._handlers.onChange),
                        t.addEventListener("blur", e._handlers.onBlur)
                    },
                  }
                }),
                s)
            function s(t, e, i) {
              ;(this._config = i), (this._cell = { row: t, col: e }), this._initHandlers()
            }
            e.InputEditor = i
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(0),
              o = i(3),
              i =
                ((r.prototype.endEdit = function (t) {
                  var e
                  t || (e = this._input.value),
                    this._config.events.fire(o.GridEvents.beforeEditEnd, [
                      e,
                      this._cell.row,
                      this._cell.col,
                    ])
                      ? (this._input.removeEventListener("blur", this._handlers.onBlur),
                        this._input.removeEventListener("keydown", this._handlers.onkeydown),
                        (this._cell.row = this._config.datacollection.getItem(this._cell.row.id)),
                        this._config.events.fire(o.GridEvents.afterEditEnd, [
                          e,
                          this._cell.row,
                          this._cell.col,
                        ]))
                      : this._input.focus()
                }),
                (r.prototype.toHTML = function () {
                  var t =
                      this._cell.col.options.map(function (t) {
                        return "string" == typeof t ? { id: "" + t, value: t } : t
                      }) || [],
                    e = this._cell.row[this._cell.col.id]
                  this._input && (e = this._input.options[this._input.selectedIndex].value)
                  t = t.map(function (t) {
                    return n.el("option", { selected: t === e, value: t.id }, t.value)
                  })
                  return (
                    (this._config.$editable.editor = this),
                    n.el(
                      "select.dhx_cell-editor.dhx_cell-editor__select",
                      {
                        _hooks: { didInsert: this._handlers.didInsert },
                        _key: "cell_editor",
                        dhx_id: "cell_editor",
                      },
                      t
                    )
                  )
                }),
                (r.prototype._initHandlers = function () {
                  var e = this
                  this._handlers = {
                    onBlur: function () {
                      e.endEdit()
                    },
                    onkeydown: function (t) {
                      "Escape" === t.key && e.endEdit()
                    },
                    didInsert: function (t) {
                      t = t.el
                      ;(e._input = t).focus(),
                        t.addEventListener("blur", e._handlers.onBlur),
                        t.addEventListener("keydown", e._handlers.onkeydown)
                    },
                  }
                }),
                r)
            function r(t, e, i) {
              ;(this._config = i), (this._cell = { row: t, col: e }), this._initHandlers()
            }
            e.SelectEditor = i
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r = i(0),
              s = i(3),
              o = i(43),
              a = i(20),
              l = i(23),
              i =
                ((n.prototype.endEdit = function (t, e) {
                  var i = this
                  if (this._handlers) {
                    var n = this._calendar.config.dateFormat,
                      o = this._cell.row[this._cell.col.id]
                    if (!t) {
                      if (o instanceof Date || e)
                        return (
                          (this._value = this._calendar.getValue()),
                          (this._input.value = this._value),
                          void this._popup.hide()
                        )
                      a.stringToDate(this._input.value, n, !0) &&
                        ((o && this._input.value.length === o.length) || !o) &&
                        (this._value = this._input.value)
                    }
                    this._config.events.fire(s.GridEvents.beforeEditEnd, [
                      this._value,
                      this._cell.row,
                      this._cell.col,
                    ])
                      ? (this._input.removeEventListener("focus", this._handlers.onFocus),
                        this._input.removeEventListener("change", this._handlers.onChange),
                        document.removeEventListener("mousedown", this._handlers.onOuterClick),
                        r.awaitRedraw().then(function () {
                          i._popup.destructor(), i._calendar.destructor()
                        }),
                        (this._cell.row = this._config.datacollection.getItem(this._cell.row.id)),
                        this._config.events.fire(s.GridEvents.afterEditEnd, [
                          this._value,
                          this._cell.row,
                          this._cell.col,
                        ]))
                      : this._input.focus()
                  }
                }),
                (n.prototype.toHTML = function () {
                  var t = this._cell.row[this._cell.col.id]
                  return (
                    (this._config.$editable.editor = this),
                    document.addEventListener("mousedown", this._handlers.onOuterClick),
                    r.el(
                      "input.dhx_cell-editor.dhx_cell-editor__input.dhx_cell-editor__datepicker",
                      {
                        _hooks: { didInsert: this._handlers.didInsert },
                        _key: "cell_editor",
                        dhx_id: "cell_editor",
                        value: t,
                      }
                    )
                  )
                }),
                (n.prototype._initHandlers = function () {
                  var i = this
                  this._handlers = {
                    onFocus: function () {
                      r.awaitRedraw().then(function () {
                        i._popup.show(i._input, { centering: !0, mode: "bottom" })
                      })
                    },
                    onChange: function () {
                      i.endEdit()
                    },
                    onOuterClick: function (t) {
                      var e
                      t.target instanceof Node &&
                        ((e = i._input && i._input.contains(t.target)),
                        (t =
                          i._popup &&
                          i._popup.getRootNode() &&
                          i._popup.getRootNode().contains(t.target)),
                        e || t || i._popup.hide())
                    },
                    didInsert: function (t) {
                      t = t.el
                      ;(i._input = t),
                        i._input.addEventListener("focus", i._handlers.onFocus),
                        i._input.addEventListener("change", i._handlers.onChange),
                        t.focus(),
                        t.setSelectionRange(t.value.length, t.value.length)
                    },
                  }
                }),
                n)
            function n(t, e, i) {
              var n = this
              ;(this._config = i),
                (this._cell = { row: t, col: e }),
                (this._calendar = new o.Calendar(null, { dateFormat: e.format }))
              ;(t = this._cell.row[this._cell.col.id]), (e = this._calendar.config.dateFormat)
              ;(a.stringToDate(t, e, !0) || t instanceof Date) &&
                (this._calendar.setValue(t),
                (this._value = this._calendar.getValue()),
                (this._cell.row[this._cell.col.id] = this._value)),
                (this._popup = new l.Popup({ css: "dhx_widget--bordered" })),
                this._popup.attach(this._calendar),
                this._calendar.events.on(o.CalendarEvents.change, function () {
                  n.endEdit(!1, !0)
                }),
                this._popup.events.on(l.PopupEvents.afterHide, function () {
                  n.endEdit()
                }),
                this._initHandlers()
            }
            e.DateEditor = i
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              m =
                (this && this.__assign) ||
                function () {
                  return (m =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                },
              y =
                (this && this.__spreadArrays) ||
                function () {
                  for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length
                  for (var n = Array(t), o = 0, e = 0; e < i; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s]
                  return n
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r,
              s = i(1),
              b = i(0),
              a = i(5),
              l = i(6),
              c = i(95),
              d = i(105),
              x = i(20),
              u = i(49),
              h = i(2),
              o =
                ((r = l.View),
                o(f, r),
                (f.prototype.setValue = function (t) {
                  if (!t || (t instanceof Array && 0 === t.length)) return !1
                  this._selected = []
                  var e = t instanceof Array ? t[0] : t,
                    i = x.DateHelper.toDateObject(e, this.config.dateFormat),
                    e = x.DateHelper.copy(this._getSelected())
                  return (
                    !!this.events.fire(u.CalendarEvents.beforeChange, [i, e, !1]) &&
                    (this._setSelected(t),
                    this._timepicker &&
                      (this._timepicker.setValue(i), (this._time = this._timepicker.getValue())),
                    this.showDate(this._getSelected()),
                    this.events.fire(u.CalendarEvents.change, [i, e, !1]),
                    this.paint(),
                    !0)
                  )
                }),
                (f.prototype.getValue = function (t) {
                  var e = this
                  return (
                    void 0 === t && (t = !1),
                    this._selected[0]
                      ? this.config.range
                        ? t
                          ? this._selected.map(function (t) {
                              return x.DateHelper.copy(t)
                            })
                          : this._selected.map(function (t) {
                              return x.getFormattedDate(e.config.dateFormat, t)
                            })
                        : t
                        ? x.DateHelper.copy(this._selected[0])
                        : x.getFormattedDate(this.config.dateFormat, this._selected[0])
                      : ""
                  )
                }),
                (f.prototype.getCurrentMode = function () {
                  return this._currentViewMode
                }),
                (f.prototype.showDate = function (t, e) {
                  t && (this._currentDate = x.DateHelper.copy(t)),
                    e && (this._currentViewMode = e),
                    this.paint()
                }),
                (f.prototype.destructor = function () {
                  this._linkedCalendar && this._unlink(),
                    this._timepicker && this._timepicker.destructor(),
                    this.events && this.events.clear(),
                    (this.config = this.events = null),
                    (this._uid =
                      this._selected =
                      this._currentDate =
                      this._currentViewMode =
                      this._handlers =
                      this._timepicker =
                      this._time =
                        null),
                    this.unmount()
                }),
                (f.prototype.clear = function () {
                  var t = this.getValue(!0)
                  this.config.timePicker &&
                    (this._timepicker.clear(), (this._time = this._timepicker.getValue())),
                    (this._selected = []),
                    this.showDate(null, this.config.mode),
                    this.events.fire(u.CalendarEvents.change, [this.getValue(!0), t, !1])
                }),
                (f.prototype.link = function (t) {
                  var e = this
                  this._linkedCalendar && this._unlink(), (this._linkedCalendar = t)
                  var i = this.getValue(!0),
                    n = t.getValue(!0),
                    o = i && x.DateHelper.dayStart(i),
                    r = n && x.DateHelper.dayStart(n)
                  ;(this.config.$rangeMark && this._linkedCalendar.config.$rangeMark) ||
                    (this.config.$rangeMark = this._linkedCalendar.config.$rangeMark =
                      function (t) {
                        if (o && r)
                          return (
                            o <= t &&
                            t <= r &&
                            (function (t) {
                              if (x.DateHelper.isSameDay(r, o)) return null
                              var e = "dhx_calendar-day--in-range"
                              return (
                                x.DateHelper.isSameDay(t, o) &&
                                  (e += " dhx_calendar-day--first-date"),
                                x.DateHelper.isSameDay(t, r) &&
                                  (e += " dhx_calendar-day--last-date"),
                                e
                              )
                            })(t)
                          )
                      }),
                    (this.config.disabledDates && this._linkedCalendar.config.disabledDates) ||
                      ((this.config.disabledDates = function (t) {
                        if (r) return r < t
                      }),
                      (this._linkedCalendar.config.disabledDates = function (t) {
                        if (o) return t < o
                      })),
                    (this.config.thisMonthOnly = !0),
                    (t.config.thisMonthOnly = !0),
                    this.events.on(
                      u.CalendarEvents.change,
                      function (t) {
                        ;(o = x.DateHelper.dayStart(t)), e._linkedCalendar.paint()
                      },
                      "link"
                    ),
                    this._linkedCalendar.events.on(
                      u.CalendarEvents.change,
                      function (t) {
                        ;(r = x.DateHelper.dayStart(t)), e.paint()
                      },
                      "link"
                    ),
                    this._linkedCalendar.paint(),
                    this.paint()
                }),
                (f.prototype._unlink = function () {
                  this._linkedCalendar &&
                    ((this.config.$rangeMark = this._linkedCalendar.config.$rangeMark = null),
                    (this.config.disabledDates = this._linkedCalendar.config.disabledDates = null),
                    this.events.detach(u.CalendarEvents.change, "link"),
                    this._linkedCalendar.events.detach(u.CalendarEvents.change, "link"),
                    this._linkedCalendar.paint(),
                    (this._linkedCalendar = null))
                }),
                (f.prototype._setSelected = function (t) {
                  var i,
                    n = this,
                    e = t instanceof Array ? t[0] : t,
                    e = x.DateHelper.toDateObject(e, this.config.dateFormat)
                  t instanceof Array && this.config.range
                    ? ((i = []),
                      t.forEach(function (t, e) {
                        e < 2 && i.push(x.DateHelper.toDateObject(t, n.config.dateFormat))
                      }),
                      2 === i.length && i[0] < i[1]
                        ? i.forEach(function (t) {
                            return n._selected.push(t)
                          })
                        : (this._selected[0] = i[0]))
                    : (this._selected[0] = e)
                }),
                (f.prototype._getSelected = function () {
                  return this._selected[this._selected.length - 1]
                }),
                (f.prototype._draw = function () {
                  switch (this._currentViewMode) {
                    case "calendar":
                      return (
                        this.events.fire(u.CalendarEvents.modeChange, ["calendar"]),
                        this._drawCalendar()
                      )
                    case "month":
                      return (
                        this.events.fire(u.CalendarEvents.modeChange, ["month"]),
                        this._drawMonthSelector()
                      )
                    case "year":
                      return (
                        this.events.fire(u.CalendarEvents.modeChange, ["year"]),
                        this._drawYearSelector()
                      )
                    case "timepicker":
                      return (
                        this.events.fire(u.CalendarEvents.modeChange, ["timepicker"]),
                        this._drawTimepicker()
                      )
                  }
                }),
                (f.prototype._initHandlers = function () {
                  function n(t) {
                    void 0 === t && (t = !1)
                    var e = 0
                    switch (o._currentViewMode) {
                      case "calendar":
                        e = t ? -7 : 7
                        break
                      case "month":
                        e = t ? -4 : 4
                        break
                      case "year":
                        e = t ? -4 : 4
                    }
                    return e
                  }
                  var o = this,
                    r = {
                      Up: "ArrowUp",
                      Down: "ArrowDown",
                      Right: "ArrowRight",
                      Left: "ArrowLeft",
                      Esc: "Escape",
                      Spacebar: "Space",
                    }
                  this._handlers = {
                    onkeydown: {
                      ".dhx_calendar-year, .dhx_calendar-month, .dhx_calendar-day": function (
                        t,
                        e
                      ) {
                        switch (
                          (48 <= (i = t).which && i.which <= 57) || (65 <= i.which && i.which <= 90)
                            ? String.fromCharCode(i.which)
                            : ((i = 32 === i.which ? i.code : i.key), (h.isIE() && r[i]) || i)
                        ) {
                          case "Enter":
                            o._selectDate(t, e)
                            break
                          case "ArrowLeft":
                            o._moveBrowseFocus(t, e, -1)
                            break
                          case "ArrowRight":
                            o._moveBrowseFocus(t, e, 1)
                            break
                          case "ArrowUp":
                            o._moveBrowseFocus(t, e, n(!0))
                            break
                          case "ArrowDown":
                            o._moveBrowseFocus(t, e, n())
                        }
                        var i
                      },
                    },
                    onclick: {
                      ".dhx_calendar-year, .dhx_calendar-month, .dhx_calendar-day": function (
                        t,
                        e
                      ) {
                        o._selectDate(t, e)
                      },
                      ".dhx_calendar-action__cancel": function () {
                        o.showDate(o._getSelected(), "calendar"),
                          o.events.fire(u.CalendarEvents.cancelClick, [])
                      },
                      ".dhx_calendar-action__show-month": function () {
                        return o.showDate(null, "month")
                      },
                      ".dhx_calendar-action__show-year": function () {
                        return o.showDate(null, "year")
                      },
                      ".dhx_calendar-action__next": function () {
                        var t
                        switch (o._currentViewMode) {
                          case "calendar":
                            t = x.DateHelper.addMonth(o._currentDate, 1)
                            break
                          case "month":
                            t = x.DateHelper.addYear(o._currentDate, 1)
                            break
                          case "year":
                            t = x.DateHelper.addYear(o._currentDate, 12)
                        }
                        o.showDate(t)
                      },
                      ".dhx_calendar-action__prev": function () {
                        var t
                        switch (o._currentViewMode) {
                          case "calendar":
                            t = x.DateHelper.addMonth(o._currentDate, -1)
                            break
                          case "month":
                            t = x.DateHelper.addYear(o._currentDate, -1)
                            break
                          case "year":
                            t = x.DateHelper.addYear(o._currentDate, -12)
                        }
                        o.showDate(t)
                      },
                      ".dhx_calendar-action__show-timepicker": function () {
                        ;(o._currentViewMode = "timepicker"), o.paint()
                      },
                    },
                    onmouseover: {
                      ".dhx_calendar-day": function (t, e) {
                        o.events.fire(u.CalendarEvents.dateMouseOver, [new Date(e.attrs._date), t]),
                          o.events.fire(u.CalendarEvents.dateHover, [new Date(e.attrs._date), t])
                      },
                    },
                  }
                }),
                (f.prototype._getData = function (r) {
                  var s = this
                  this._isSelectedInCurrentRange = !1
                  for (
                    var t = "monday" === this.config.weekStart ? 1 : 0,
                      e = [],
                      i = 6,
                      a = x.DateHelper.weekStart(x.DateHelper.monthStart(r), t);
                    i--;

                  ) {
                    for (
                      var n = x.DateHelper.getWeekNumber(a),
                        l = 0,
                        o = 7,
                        c = [],
                        d = function () {
                          var t,
                            e = x.DateHelper.isWeekEnd(a),
                            i = r.getMonth() === a.getMonth(),
                            n = u.config.disabledDates && u.config.disabledDates(a),
                            o = []
                          u.config.range &&
                            u._selected[0] &&
                            u._selected[1] &&
                            ((t = function () {
                              if (s._selected[0] && s._selected[1]) {
                                var t = x.DateHelper.dayStart(s._selected[0]),
                                  e = x.DateHelper.dayStart(s._selected[1])
                                return (
                                  t <= a &&
                                  a <= e &&
                                  (x.DateHelper.isSameDay(s._selected[0], s._selected[1])
                                    ? null
                                    : "dhx_calendar-day--in-range")
                                )
                              }
                            }),
                            (u.config.$rangeMark = t)),
                            e && i && o.push("dhx_calendar-day--weekend"),
                            i ||
                              (u.config.thisMonthOnly
                                ? (l++, o.push("dhx_calendar-day--hidden"))
                                : o.push("dhx_calendar-day--muffled")),
                            !u.config.mark || ((i = u.config.mark(a)) && o.push(i)),
                            u.config.$rangeMark && (t = u.config.$rangeMark(a)) && o.push(t),
                            n &&
                              (e
                                ? o.push("dhx_calendar-day--weekend-disabled")
                                : o.push("dhx_calendar-day--disabled")),
                            u._selected.forEach(function (t, e) {
                              t &&
                                x.DateHelper.isSameDay(t, a) &&
                                ((s._isSelectedInCurrentRange = !0),
                                (t = "dhx_calendar-day--selected"),
                                s.config.range &&
                                  (t +=
                                    " dhx_calendar-day--selected-" + (0 === e ? "first " : "last")),
                                o.push(t))
                            }),
                            c.push({ date: a, day: a.getDate(), css: o.join(" ") }),
                            (a = x.DateHelper.addDay(a))
                        },
                        u = this;
                      o--;

                    )
                      d()
                    e.push({ weekNumber: n, days: c, disabledWeekNumber: 7 === l })
                  }
                  return e
                }),
                (f.prototype._drawCalendar = function () {
                  for (
                    var t,
                      i = this,
                      e = this._currentDate,
                      n = this.config,
                      o = n.weekStart,
                      r = n.thisMonthOnly,
                      s = n.css,
                      a = n.timePicker,
                      l = n.width,
                      n = (
                        "monday" === o
                          ? y(x.locale.daysShort.slice(1), [x.locale.daysShort[0]])
                          : x.locale.daysShort
                      ).map(function (t) {
                        return b.el(".dhx_calendar-weekday", t)
                      }),
                      o = this._getData(e),
                      c = !0,
                      d = this._getSelected(),
                      u = function (t) {
                        var e = { role: "button", tabindex: -1, "aria-pressed": "false" }
                        return (
                          t &&
                            (i._isSelectedInCurrentRange
                              ? (t = t.date) &&
                                d &&
                                t.getTime() === d.getTime() &&
                                ((e.tabindex = 0), (e["aria-pressed"] = "true"))
                              : c && (e.tabindex = 0),
                            (c = !1)),
                          e
                        )
                      },
                      h = [],
                      f = [],
                      p = 0,
                      _ = o;
                    p < _.length;
                    p++
                  ) {
                    var g = _[p],
                      v = g.days.map(function (t) {
                        return b.el(
                          "div.dhx_calendar-day",
                          m({ class: t.css, _date: t.date }, u(t)),
                          t.day
                        )
                      })
                    !this.config.weekNumbers ||
                      (g.disabledWeekNumber && r) ||
                      f.push(b.el("div", { class: "dhx_calendar-week-number" }, g.weekNumber)),
                      (h = h.concat(v))
                  }
                  this.config.weekNumbers && (t = b.el(".dhx_calendar__week-numbers", f))
                  s =
                    "dhx_calendar dhx_widget" +
                    (s ? " " + s : "") +
                    (a ? " dhx_calendar--with_timepicker" : "") +
                    (this.config.weekNumbers ? " dhx_calendar--with_week-numbers" : "")
                  return b.el(
                    "div",
                    m(
                      {
                        class: s,
                        style: { width: this.config.weekNumbers ? "calc(" + l + " + 48px )" : l },
                      },
                      this._handlers
                    ),
                    [
                      b.el(".dhx_calendar__wrapper", [
                        this._drawHeader(
                          b.el(
                            "button.dhx_calendar-action__show-month.dhx_button.dhx_button--view_link.dhx_button--size_small.dhx_button--color_secondary.dhx_button--circle",
                            { "aria-live": "polite", type: "button" },
                            x.locale.months[e.getMonth()] + " " + e.getFullYear()
                          )
                        ),
                        this.config.weekNumbers &&
                          b.el(".dhx_calendar__dates-wrapper", [
                            b.el(".dhx_calendar__weekdays", n),
                            b.el(".dhx_calendar__days", h),
                            t,
                          ]),
                        !this.config.weekNumbers && b.el(".dhx_calendar__weekdays", n),
                        !this.config.weekNumbers && b.el(".dhx_calendar__days", h),
                        a
                          ? b.el(".dhx_timepicker__actions", [
                              b.el(
                                "button.dhx_calendar__timepicker-button.dhx_button.dhx_button--view_link.dhx_button--size_small.dhx_button--color_secondary.dhx_button--width_full.dhx_button--circle.dhx_calendar-action__show-timepicker",
                                { type: "button" },
                                [
                                  b.el("span.dhx_button__icon.dxi.dxi-clock-outline"),
                                  b.el("span.dhx_button__text", this._time),
                                ]
                              ),
                            ])
                          : null,
                      ]),
                    ]
                  )
                }),
                (f.prototype._drawMonthSelector = function () {
                  function o(t) {
                    return d && e === t
                  }
                  var t = this._currentDate,
                    e = t.getMonth(),
                    i = this._getSelected() ? this._getSelected().getFullYear() : null,
                    n = this.config,
                    r = n.css,
                    s = n.timePicker,
                    a = n.weekNumbers,
                    l = n.width,
                    n = n.mode,
                    s =
                      "dhx_calendar dhx_widget" +
                      (r ? " " + r : "") +
                      (s ? " dhx_calendar--with_timepicker" : "") +
                      (a ? " dhx_calendar--with_week-numbers" : ""),
                    c = !0,
                    d = i === t.getFullYear()
                  return b.el(
                    "div",
                    m(
                      { class: s, style: { width: a ? "calc(" + l + " + 48px)" : l } },
                      this._handlers
                    ),
                    [
                      b.el(".dhx_calendar__wrapper", [
                        this._drawHeader(
                          b.el(
                            "button.dhx_calendar-action__show-year.dhx_button.dhx_button--view_link.dhx_button--size_small.dhx_button--color_secondary.dhx_button--circle",
                            { "aria-live": "polite", type: "button" },
                            t.getFullYear()
                          )
                        ),
                        b.el(
                          ".dhx_calendar__months",
                          x.locale.monthsShort.map(function (t, e) {
                            return b.el(
                              "div",
                              m(
                                m(
                                  {
                                    class:
                                      "dhx_calendar-month" +
                                      (o(e) ? " dhx_calendar-month--selected" : ""),
                                  },
                                  ((i = e),
                                  (n = { role: "button", tabindex: -1, "aria-pressed": "false" }),
                                  t &&
                                    (d
                                      ? o(i) && ((n.tabindex = 0), (n["aria-pressed"] = "true"))
                                      : c && (n.tabindex = 0),
                                    (c = !1)),
                                  n)
                                ),
                                { _date: e }
                              ),
                              t
                            )
                            var i, n
                          })
                        ),
                        "month" !== n
                          ? b.el(".dhx_calendar__actions", [
                              b.el(
                                "button.dhx_button.dhx_button--color_primary.dhx_button--view_link.dhx_button--size_small.dhx_button--width_full.dhx_button--circle.dhx_calendar-action__cancel",
                                { type: "button" },
                                x.locale.cancel
                              ),
                            ])
                          : null,
                      ]),
                    ]
                  )
                }),
                (f.prototype._drawYearSelector = function () {
                  function n(t) {
                    return e._getSelected() && t === e._getSelected().getFullYear()
                  }
                  var e = this,
                    t = this._currentDate,
                    i = x.DateHelper.getTwelweYears(t),
                    o = this.config,
                    r = o.css,
                    s = o.timePicker,
                    a = o.weekNumbers,
                    t = o.width,
                    o = o.mode,
                    s =
                      "dhx_calendar dhx_widget" +
                      (r ? " " + r : "") +
                      (s ? " dhx_calendar--with_timepicker" : "") +
                      (a ? " dhx_calendar--with_week-numbers" : ""),
                    l = !0,
                    c = this._getSelected() && i.includes(this._getSelected().getFullYear())
                  return b.el(
                    "div",
                    m(
                      { class: s, style: { width: a ? "calc(" + t + " + 48px)" : t } },
                      this._handlers
                    ),
                    [
                      b.el(".dhx_calendar__wrapper", [
                        this._drawHeader(
                          b.el(
                            "button.dhx_button.dhx_button--view_link.dhx_button--size_small.dhx_button--color_secondary.dhx_button--circle",
                            { "aria-live": "polite", type: "button" },
                            i[0] + "-" + i[i.length - 1]
                          )
                        ),
                        b.el(
                          ".dhx_calendar__years",
                          i.map(function (t) {
                            return b.el(
                              "div",
                              m(
                                {
                                  class:
                                    "dhx_calendar-year" +
                                    (n(t) ? " dhx_calendar-year--selected" : ""),
                                  _date: t,
                                },
                                ((i = { role: "button", tabindex: -1, "aria-pressed": "false" }),
                                (e = t) &&
                                  (c
                                    ? n(e) && ((i.tabindex = 0), (i["aria-pressed"] = "true"))
                                    : l && (i.tabindex = 0),
                                  (l = !1)),
                                i)
                              ),
                              t
                            )
                            var e, i
                          })
                        ),
                        "year" !== o && "month" !== o
                          ? b.el(".dhx_calendar__actions", [
                              b.el(
                                "button.dhx_button.dhx_button--color_primary.dhx_button--view_link.dhx_button--size_small.dhx_button--width_full.dhx_button--circle.dhx_calendar-action__cancel",
                                { type: "button" },
                                x.locale.cancel
                              ),
                            ])
                          : null,
                      ]),
                    ]
                  )
                }),
                (f.prototype._drawHeader = function (t) {
                  return b.el(".dhx_calendar__navigation", [
                    b.el(
                      "button.dhx_calendar-navigation__button.dhx_calendar-action__prev" +
                        d.linkButtonClasses +
                        ".dhx_button--icon.dhx_button--circle",
                      { "aria-label": "prev", type: "button" },
                      [b.el(".dhx_button__icon.dxi.dxi-chevron-left")]
                    ),
                    t,
                    b.el(
                      "button.dhx_calendar-navigation__button.dhx_calendar-action__next" +
                        d.linkButtonClasses +
                        ".dhx_button--icon.dhx_button--circle",
                      { "aria-label": "next", type: "button" },
                      [b.el(".dhx_button__icon.dxi.dxi-chevron-right")]
                    ),
                  ])
                }),
                (f.prototype._drawTimepicker = function () {
                  var t = this.config,
                    e = t.css,
                    i = t.weekNumbers,
                    t = t.width
                  return b.el(
                    ".dhx_widget.dhx-calendar",
                    { class: e ? " " + e : "", style: { width: i ? "calc(" + t + " + 48px)" : t } },
                    [b.inject(this._timepicker.getRootView())]
                  )
                }),
                (f.prototype._selectDate = function (t, e) {
                  var i = e.attrs._date,
                    n = x.DateHelper.copy(this._getSelected())
                  switch (this._currentViewMode) {
                    case "calendar":
                      var o = this.config.timePicker
                        ? x.DateHelper.mergeHoursAndMinutes(
                            i,
                            this._getSelected() || this._currentDate
                          )
                        : i
                      if (!this.events.fire(u.CalendarEvents.beforeChange, [o, n, !0])) return
                      this.config.range && 1 === this._selected.length && this._selected[0] < o
                        ? this._selected.push(o)
                        : ((this._selected = []), (this._selected[0] = o)),
                        e.el.blur(),
                        this.showDate(this._getSelected()),
                        this.events.fire(u.CalendarEvents.change, [i, n, !0])
                      break
                    case "month":
                      if ("month" !== this.config.mode)
                        x.DateHelper.setMonth(this._currentDate, i),
                          this.showDate(null, "calendar"),
                          this.events.fire(u.CalendarEvents.monthSelected, [i])
                      else {
                        var r = x.DateHelper.fromYearAndMonth(
                          this._currentDate.getFullYear() || this._getSelected().getFullYear(),
                          i
                        )
                        if (!this.events.fire(u.CalendarEvents.beforeChange, [r, n, !0])) return
                        ;(this._currentDate = r),
                          (this._selected[0] = r),
                          this.events.fire(u.CalendarEvents.change, [this._getSelected(), n, !0]),
                          this.events.fire(u.CalendarEvents.monthSelected, [i]),
                          this.paint()
                      }
                      break
                    case "year":
                      if ("year" !== this.config.mode)
                        x.DateHelper.setYear(this._currentDate, i),
                          this.showDate(null, "month"),
                          this.events.fire(u.CalendarEvents.yearSelected, [i])
                      else {
                        r = x.DateHelper.fromYear(i)
                        if (!this.events.fire(u.CalendarEvents.beforeChange, [r, n, !0])) return
                        ;(this._currentDate = r),
                          (this._selected[0] = r),
                          this.events.fire(u.CalendarEvents.change, [this._getSelected(), n, !0]),
                          this.events.fire(u.CalendarEvents.yearSelected, [i]),
                          this.paint()
                      }
                  }
                }),
                (f.prototype._moveBrowseFocus = function (t, e, i) {
                  e &&
                    (!(i = e.parent.body[e.idx + i]) ||
                      ((i = i.el) &&
                        ((t.target.tabIndex = -1),
                        (i.tabIndex = 0),
                        i.focus({ preventScroll: !0 }))))
                }),
                f)
            function f(t, e) {
              void 0 === e && (e = {})
              var o =
                r.call(
                  this,
                  t,
                  s.extend(
                    {
                      weekStart: "sunday",
                      thisMonthOnly: !1,
                      dateFormat: window && window.dhx && window.dhx.dateFormat,
                      width: "250px",
                    },
                    e
                  )
                ) || this
              switch (
                ((o._selected = []),
                (o.events = new a.EventSystem()),
                (o.config.disabledDates = o.config.disabledDates || o.config.block),
                (o.config.mode = o.config.mode || o.config.view),
                o.config.dateFormat ||
                  (o.config.timePicker
                    ? 12 === o.config.timeFormat
                      ? (o.config.dateFormat = "%d/%m/%y %h:%i %A")
                      : (o.config.dateFormat = "%d/%m/%y %H:%i")
                    : (o.config.dateFormat = "%d/%m/%y")),
                o.config.value && o._setSelected(o.config.value),
                o.config.date
                  ? (o._currentDate = x.DateHelper.toDateObject(o.config.date, o.config.dateFormat))
                  : o._getSelected()
                  ? (o._currentDate = x.DateHelper.copy(o._getSelected()))
                  : (o._currentDate = new Date()),
                o.config.mode)
              ) {
                case "month":
                  o._currentViewMode = "month"
                  break
                case "year":
                  o._currentViewMode = "year"
                  break
                default:
                  o._currentViewMode = "calendar"
              }
              o._initHandlers(),
                o.config.timePicker &&
                  ((o._timepicker = new c.Timepicker(null, {
                    timeFormat: o.config.timeFormat,
                    controls: !0,
                  })),
                  (e = o._getSelected() || new Date()),
                  o._timepicker.setValue(e),
                  (o._time = o._timepicker.getValue()),
                  o._timepicker.events.on(c.TimepickerEvents.afterClose, function () {
                    o._timepicker.setValue(o._time), o.showDate(null, "calendar")
                  }),
                  o._timepicker.events.on(c.TimepickerEvents.afterApply, function () {
                    var t = o._timepicker.getValue(!0),
                      e = t.hour,
                      i = t.minute,
                      n = t.AM,
                      t = o._getSelected(),
                      n = x.DateHelper.withHoursAndMinutes(o._getSelected() || new Date(), e, i, n)
                    o.events.fire(u.CalendarEvents.beforeChange, [n, t, !0]) &&
                      ((o._selected[o._selected.length - 1] = n),
                      o.events.fire(u.CalendarEvents.change, [n, t, !0])),
                      (o._time = o._timepicker.getValue()),
                      o.showDate(null, "calendar")
                  }))
              return (
                o.mount(
                  t,
                  b.create({
                    render: function () {
                      return o._draw()
                    },
                  })
                ),
                o
              )
            }
            e.Calendar = o
          },
          function (t, i, e) {
            "use strict"
            function n(t) {
              for (var e in t) i.hasOwnProperty(e) || (i[e] = t[e])
            }
            Object.defineProperty(i, "__esModule", { value: !0 }), n(e(96)), n(e(48))
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              r =
                (this && this.__assign) ||
                function () {
                  return (r =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var s = i(1),
              a = i(0),
              l = i(5),
              c = i(6),
              d = i(22),
              u = i(100),
              h = i(103),
              f = i(104),
              p = i(48),
              _ = i(2)
            function g(t, e) {
              return isNaN(t) ? 0 : Math.min(e, Math.max(0, t))
            }
            var v,
              o =
                ((v = c.View),
                o(m, v),
                (m.prototype.getValue = function (t) {
                  12 === this.config.timeFormat && (this._time.hour = this._time.hour % 12 || 12)
                  var e = this._time,
                    i = e.hour,
                    n = e.minute,
                    e = e.AM
                  if (t) {
                    t = { hour: i, minute: n }
                    return 12 === this.config.timeFormat && (t.AM = e), t
                  }
                  return (
                    (i < 10 ? "0" + i : i) +
                    ":" +
                    (n < 10 ? "0" + n : n) +
                    (12 === this.config.timeFormat ? (e ? "AM" : "PM") : "")
                  )
                }),
                (m.prototype.setValue = function (t) {
                  this._setValue(t),
                    this._hoursSlider.setValue(this._time.hour),
                    this._minutesSlider.setValue(this._time.minute),
                    this._inputsView.paint()
                }),
                (m.prototype.clear = function () {
                  24 === this.config.timeFormat ? this.setValue("00:00") : this.setValue("12:00AM")
                }),
                (m.prototype.destructor = function () {
                  this._minutesSlider && this._minutesSlider.destructor(),
                    this._hoursSlider && this._hoursSlider.destructor(),
                    this.events && this.events.clear(),
                    this.layout && this.layout.destructor(),
                    (this.config = this.events = null),
                    (this._handlers =
                      this._time =
                      this._inputsView =
                      this._minutesSlider =
                      this._hoursSlider =
                        null),
                    this.unmount()
                }),
                (m.prototype.getRootView = function () {
                  return this.layout.getRootView()
                }),
                (m.prototype._setValue = function (t) {
                  var e,
                    i,
                    n = 0,
                    o = 0
                  return (
                    "number" == typeof t && (t = new Date(t)),
                    t instanceof Date
                      ? ((n = t.getMinutes()), (o = t.getHours()))
                      : Array.isArray(t)
                      ? ((o = g(t[0], 23)),
                        (n = g(t[1], 59)),
                        t[2] && "pm" === t[2].toLowerCase() && (e = !0))
                      : "string" == typeof t
                      ? ((o = g(+(i = t.match(/\d+/g))[0], 23)),
                        (n = g(+i[1], 59)),
                        t.toLowerCase().includes("pm") && (e = !0))
                      : "object" == typeof t &&
                        t.hasOwnProperty("hour") &&
                        t.hasOwnProperty("minute") &&
                        ((o = t.hour), (n = t.minute), (e = !t.AM)),
                    e && o < 12 && (o += 12),
                    12 === this.config.timeFormat && !f.isTimeCheck(t) && 12 <= o && (e = !0),
                    (this._time = { hour: o, minute: n, AM: !e })
                  )
                }),
                (m.prototype._initUI = function (t) {
                  var e = this,
                    i = {
                      gravity: !1,
                      css:
                        "dhx_widget dhx_timepicker " +
                        (this.config.css || "") +
                        (this.config.controls ? " dhx_timepicker--with-controls" : ""),
                      rows: [
                        { id: "timepicker", css: "dhx_timepicker__inputs" },
                        { id: "hour-slider", css: "dhx_timepicker__hour" },
                        { id: "minute-slider", css: "dhx_timepicker__minute" },
                      ],
                    }
                  this.config.controls &&
                    (i.rows.unshift({ id: "close-action", css: "dhx_timepicker__close" }),
                    i.rows.push({ id: "save-action", css: "dhx_timepicker__save" }))
                  var n = (this.layout = new d.Layout(t, i)),
                    o = a.create({
                      render: function () {
                        return e._draw()
                      },
                    }),
                    t = (this._inputsView = c.toViewLike(o)),
                    i = (this._minutesSlider = new u.Slider(null, {
                      min: 0,
                      max: 59,
                      step: 1,
                      tooltip: !1,
                      labelPosition: "top",
                      label: h.default.minutes,
                      value: this.config.value ? this._time.minute : 0,
                    })),
                    o = (this._hoursSlider = new u.Slider(null, {
                      min: 0,
                      max: 23,
                      step: 1,
                      tooltip: !1,
                      labelPosition: "top",
                      label: h.default.hours,
                      value:
                        !this.config.value || (12 === this._time.hour && this._time.AM)
                          ? 0
                          : this._time.hour,
                    }))
                  n.getCell("timepicker").attach(t),
                    n.getCell("hour-slider").attach(o),
                    n.getCell("minute-slider").attach(i),
                    this.config.controls &&
                      (n.getCell("save-action").attach(function () {
                        return a.el(
                          "button.dhx_timepicker__button-save.dhx_button.dhx_button--view_flat.dhx_button--color_primary.dhx_button--size_small.dhx_button--circle.dhx_button--width_full",
                          { onclick: e._outerHandlers.save, type: "button" },
                          h.default.save
                        )
                      }),
                      n.getCell("close-action").attach(function () {
                        return a.el(
                          "button.dhx_timepicker__button-close.dhx_button.dhx_button--view_link.dhx_button--size_medium.dhx_button--view_link.dhx_button--color_secondary.dhx_button--icon.dhx_button--circle",
                          {
                            _ref: "close",
                            onclick: e._outerHandlers.close,
                            type: "button",
                            "aria-label": "close timepicker",
                          },
                          [a.el("span.dhx_button__icon.dxi.dxi-close")]
                        )
                      }))
                }),
                (m.prototype._initHandlers = function () {
                  function e(t) {
                    var e = g(parseInt(t.value, 10), 59)
                    ;(t.value = e.toString()), n._minutesSlider.setValue(e)
                  }
                  function i(t) {
                    var e = g(parseInt(t.value, 10), 23)
                    ;(t.value = e.toString()), n._hoursSlider.setValue(e)
                  }
                  var n = this
                  ;(this._handlers = {
                    onchange: {
                      ".dhx_timepicker-input--hour": function (t) {
                        return i(t.target)
                      },
                      ".dhx_timepicker-input--minutes": function (t) {
                        return e(t.target)
                      },
                    },
                    oninput: {
                      ".dhx_timepicker-input--hour": function (t) {
                        ;(_.isSafari() || _.isFirefox()) && i(t.target)
                      },
                      ".dhx_timepicker-input--minutes": function (t) {
                        ;(_.isSafari() || _.isFirefox()) && e(t.target)
                      },
                    },
                  }),
                    (this._outerHandlers = {
                      close: function () {
                        n.events.fire(p.TimepickerEvents.beforeClose, [
                          n.getValue("timeObject" === n.config.valueFormat),
                        ]) &&
                          (n.events.fire(p.TimepickerEvents.afterClose, [
                            n.getValue("timeObject" === n.config.valueFormat),
                          ]),
                          n.events.fire(p.TimepickerEvents.close, []))
                      },
                      save: function () {
                        n.events.fire(p.TimepickerEvents.beforeApply, [
                          n.getValue("timeObject" === n.config.valueFormat),
                        ]) &&
                          (n.events.fire(p.TimepickerEvents.afterApply, [
                            n.getValue("timeObject" === n.config.valueFormat),
                          ]),
                          n.events.fire(p.TimepickerEvents.apply, [n.getValue()]),
                          n.events.fire(p.TimepickerEvents.save, [n._time]))
                      },
                    })
                }),
                (m.prototype._initEvents = function () {
                  var e = this
                  this._hoursSlider.events.on(u.SliderEvents.change, function (t) {
                    t < e._hoursSlider.config.min ||
                      t > e._hoursSlider.config.max ||
                      (12 === e.config.timeFormat
                        ? ((e._time.AM = t < 12), (e._time.hour = t % 12 || 12))
                        : (e._time.hour = t),
                      e.events.fire(p.TimepickerEvents.change, [
                        e.getValue("timeObject" === e.config.valueFormat),
                      ]),
                      e._inputsView.paint())
                  }),
                    this._minutesSlider.events.on(u.SliderEvents.change, function (t) {
                      t < e._minutesSlider.config.min ||
                        t > e._minutesSlider.config.max ||
                        ((e._time.minute = t),
                        e.events.fire(p.TimepickerEvents.change, [
                          e.getValue("timeObject" === e.config.valueFormat),
                        ]),
                        e._inputsView.paint())
                    })
                }),
                (m.prototype._draw = function () {
                  return a.el(".dhx_timepicker-inputs", r({}, this._handlers), [
                    a.el("input.dhx_timepicker-input.dhx_timepicker-input--hour", {
                      _key: "hour",
                      _ref: "hour",
                      value:
                        1 < this.getValue(!0).hour.toString().length
                          ? this.getValue(!0).hour
                          : "0" + this.getValue(!0).hour,
                      "aria-label": "hours",
                    }),
                    a.el("span.dhx_timepicker-delimer", ":"),
                    a.el("input.dhx_timepicker-input.dhx_timepicker-input--minutes", {
                      _key: "minute",
                      value:
                        1 < this.getValue(!0).minute.toString().length
                          ? this.getValue(!0).minute
                          : "0" + this.getValue(!0).minute,
                      "aria-label": "minutes",
                    }),
                    12 === this.config.timeFormat
                      ? a.el(".dhx_timepicker-ampm", this._time.AM ? "AM" : "PM")
                      : null,
                  ])
                }),
                m)
            function m(t, e) {
              void 0 === e && (e = {})
              e =
                v.call(
                  this,
                  t,
                  s.extend({ timeFormat: 24, controls: !1, valueFormat: "string", actions: !1 }, e)
                ) || this
              return (
                (e.events = new l.EventSystem(e)),
                (e._time = { hour: 0, minute: 0, AM: !0 }),
                12 === e.config.timeFormat && (e._time.hour = 12),
                (e.config.controls = e.config.controls || e.config.actions),
                e.config.value && e._setValue(e.config.value),
                e._initUI(t),
                e._initHandlers(),
                e._initEvents(),
                e
              )
            }
            e.Timepicker = o
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              (e.getBlockRange = function (t, e, i) {
                return (
                  void 0 === i && (i = !0),
                  i
                    ? { min: t.left + window.pageXOffset, max: e.right + window.pageXOffset }
                    : { min: t.top + window.pageYOffset, max: e.bottom + window.pageYOffset }
                )
              }),
              (e.getMarginSize = function (t, e) {
                return t && ("space" === t.type || ("wide" === t.type && e)) ? 10 : 0
              })
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                })
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r,
              s = i(44),
              a = i(99),
              o =
                ((r = s.Layout),
                o(l, r),
                (l.prototype._createCell = function (t) {
                  var e =
                    t.rows || t.cols || t.views
                      ? ((t.parent = this._root), new l(this, t))
                      : new a.ProCell(this, t)
                  return (this._root._all[e.id] = e), t.init && t.init(e, t), e
                }),
                l)
            function l(t, e) {
              return r.call(this, t, e) || this
            }
            e.ProLayout = o
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              c =
                (this && this.__assign) ||
                function () {
                  return (c =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r,
              d = i(1),
              u = i(0),
              s = i(15),
              i = i(45),
              o =
                ((r = i.Cell),
                o(a, r),
                (a.prototype._getFirstRootView = function (t) {
                  return (
                    void 0 === t && (t = this),
                    t.getParent() && t.getParent().getRootView()
                      ? t.getParent().getRootView()
                      : this._getFirstRootView(t.getParent())
                  )
                }),
                (a.prototype.toVDOM = function (t) {
                  if ((null === this.config && (this.config = {}), !this.config.hidden)) {
                    var e,
                      i = this._calculateStyle(),
                      n = d.isDefined(this.config.padding)
                        ? isNaN(Number(this.config.padding))
                          ? { padding: this.config.padding }
                          : { padding: this.config.padding + "px" }
                        : "",
                      o = this.config.full || this.config.html ? i : c(c({}, i), n)
                    this.config.html ||
                      (e = this._ui
                        ? ((l = this._ui.getRootView()).render && (l = u.inject(l)),
                          l ? [this.scrollView.render(l)] : l || null)
                        : t
                        ? this.scrollView.render([t])
                        : t || null)
                    var i =
                        !this.config.resizable || this._isLastCell() || this.config.collapsed
                          ? null
                          : u.el(
                              ".dhx_layout-resizer." +
                                (this._isXDirection()
                                  ? "dhx_layout-resizer--x"
                                  : "dhx_layout-resizer--y"),
                              c(c({}, this._resizerHandlers), { _ref: "resizer_" + this._uid }),
                              [
                                u.el("span.dhx_layout-resizer__icon", {
                                  class:
                                    "dxi " +
                                    (this._isXDirection()
                                      ? "dxi-dots-vertical"
                                      : "dxi-dots-horizontal"),
                                }),
                              ]
                            ),
                      r = {}
                    if (this.config.on)
                      for (var s in this.config.on) r["on" + s] = this.config.on[s]
                    var a = "",
                      l = this.config.cols || this.config.rows
                    if (this.config.type && l)
                      switch (this.config.type) {
                        case "line":
                          a = " dhx_layout-line"
                          break
                        case "wide":
                          a = " dhx_layout-wide"
                          break
                        case "space":
                          a = " dhx_layout-space"
                      }
                    ;(t = u.el(".dhx_layout-cell-content", {
                      ".innerHTML": this.config.html,
                      _key: this._uid + "_html",
                      style: n,
                    })),
                      (t = u.el(
                        "div",
                        c(
                          c(
                            (((l = { _key: this._uid, _ref: this._uid })["aria-label"] = this.config
                              .id
                              ? "tab-content-" + this.config.id
                              : null),
                            l),
                            r
                          ),
                          {
                            class:
                              this._getCss(!1) +
                              (this.config.css ? " " + this.config.css : "") +
                              (this.config.collapsed ? " dhx_layout-cell--collapsed" : "") +
                              (this.config.resizable ? " dhx_layout-cell--resizable" : "") +
                              (this.config.type && !this.config.full ? a : ""),
                            style: o,
                          }
                        ),
                        this.config.full
                          ? [
                              u.el(
                                "div",
                                {
                                  tabindex: this.config.collapsable ? "0" : "-1",
                                  class:
                                    "dhx_layout-cell-header" +
                                    (this._isXDirection()
                                      ? " dhx_layout-cell-header--col"
                                      : " dhx_layout-cell-header--row") +
                                    (this.config.collapsable
                                      ? " dhx_layout-cell-header--collapseble"
                                      : "") +
                                    (this.config.collapsed
                                      ? " dhx_layout-cell-header--collapsed"
                                      : "") +
                                    (((this.getParent() || {}).config || {}).isAccordion
                                      ? " dhx_layout-cell-header--accordion"
                                      : ""),
                                  style: { height: this.config.headerHeight },
                                  onclick: this._handlers.toggle,
                                  onkeydown: this._handlers.enterCollapse,
                                },
                                [
                                  this.config.headerIcon &&
                                    u.el("span.dhx_layout-cell-header__icon", {
                                      class: this.config.headerIcon,
                                    }),
                                  this.config.headerImage &&
                                    u.el(".dhx_layout-cell-header__image-wrapper", [
                                      u.el("img", {
                                        src: this.config.headerImage,
                                        class: "dhx_layout-cell-header__image",
                                      }),
                                    ]),
                                  this.config.header &&
                                    u.el("h3.dhx_layout-cell-header__title", this.config.header),
                                  this.config.collapsable
                                    ? u.el("div.dhx_layout-cell-header__collapse-icon", {
                                        class: this._getCollapseIcon(),
                                      })
                                    : u.el("div.dhx_layout-cell-header__collapse-icon", {
                                        class: "dxi dxi-empty",
                                      }),
                                ]
                              ),
                              this.config.collapsed
                                ? null
                                : u.el(
                                    "div",
                                    {
                                      style: c(c({}, n), {
                                        height:
                                          "calc(100% - " + (this.config.headerHeight || 37) + "px)",
                                      }),
                                      ".innerHTML": this.config.html,
                                      class:
                                        this._getCss(!0) +
                                        " dhx_layout-cell-content" +
                                        (this.config.type ? a : ""),
                                    },
                                    e
                                  ),
                            ]
                          : !this.config.html ||
                            (this.config.rows && this.config.cols && this.config.views)
                          ? e
                          : [
                              this.config.collapsed
                                ? null
                                : this.scrollView && this.scrollView.config.enable
                                ? this.scrollView.render([t], this._uid)
                                : t,
                            ]
                      ))
                    return i ? [t, i] : t
                  }
                }),
                a)
            function a(t, e) {
              var i = r.call(this, t, e) || this
              return (
                (i.scrollView = new s.ScrollView(function () {
                  return i._getFirstRootView()
                })),
                i
              )
            }
            e.ProCell = o
          },
          function (t, i, e) {
            "use strict"
            function n(t) {
              for (var e in t) i.hasOwnProperty(e) || (i[e] = t[e])
            }
            Object.defineProperty(i, "__esModule", { value: !0 }), n(e(101)), n(e(47))
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              l =
                (this && this.__assign) ||
                function () {
                  return (l =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r = i(1),
              c = i(0),
              s = i(5),
              a = i(18),
              d = i(6),
              u = i(23),
              h = i(47),
              f = i(2)
            function p(t, e, i) {
              return t < e ? e : i < t ? i : t
            }
            var _,
              o =
                ((_ = d.View),
                o(g, _),
                (g.prototype.disable = function () {
                  ;(this._disabled = !0), this.paint()
                }),
                (g.prototype.enable = function () {
                  ;(this._disabled = !1), this.paint()
                }),
                (g.prototype.isDisabled = function () {
                  return this._disabled
                }),
                (g.prototype.focus = function (t) {
                  this.getRootView().refs[t ? "extraRunner" : "runner"].el.focus()
                }),
                (g.prototype.blur = function () {
                  this.getRootView().refs[this._isExtraActive ? "extraRunner" : "runner"].el.blur()
                }),
                (g.prototype.getValue = function () {
                  var t, e
                  return this.config.range
                    ? (t = this._getValue(this._currentPosition)) <
                      (e = this._getValue(this._extraCurrentPosition))
                      ? [t, e]
                      : [e, t]
                    : [this._getValue(this._currentPosition)]
                }),
                (g.prototype.setValue = function (t) {
                  var e = this._getValue(this._currentPosition)
                  if (Array.isArray(t) && 1 < t.length) {
                    var i = this._getValue(this._extraCurrentPosition)
                    this._setValue(t[0], !1),
                      this.events.fire(h.SliderEvents.change, [t[0], e, !1]),
                      this._setValue(t[1], !0),
                      this.events.fire(h.SliderEvents.change, [t[1], i, !0])
                  } else {
                    if (((t = parseFloat(t)), isNaN(t)))
                      throw new Error(
                        "Wrong value type, for more info check documentation https://docs.dhtmlx.com/suite/slider__api__slider_setvalue_method.html"
                      )
                    this._setValue(t), this.events.fire(h.SliderEvents.change, [t, e, !1])
                  }
                  this.paint()
                }),
                (g.prototype.destructor = function () {
                  this._keyManager && this._keyManager.destructor(),
                    document.body.contains(this._tooltip) &&
                      document.body.removeChild(this._tooltip),
                    (this._tooltip = null),
                    this.unmount()
                }),
                (g.prototype._calcSliderPosition = function () {
                  var t = this.getRootView()
                  t &&
                    ((t = t.refs.track.el.getBoundingClientRect()),
                    (this._offsets = {
                      left: t.left + window.pageXOffset,
                      top: t.top + window.pageYOffset,
                    }),
                    (this._length = "horizontal" === this.config.mode ? t.width : t.height))
                }),
                (g.prototype._initHotkeys = function () {
                  var t,
                    e = this,
                    i = {
                      arrowLeft: function (t) {
                        t.preventDefault(),
                          e._move(
                            -e.config.step,
                            t.target.classList.contains("dhx_slider__thumb--extra")
                          )
                      },
                      arrowRight: function (t) {
                        t.preventDefault(),
                          e._move(
                            e.config.step,
                            t.target.classList.contains("dhx_slider__thumb--extra")
                          )
                      },
                      arrowUp: function (t) {
                        t.preventDefault(),
                          e._move(
                            e.config.step,
                            t.target.classList.contains("dhx_slider__thumb--extra")
                          )
                      },
                      arrowDown: function (t) {
                        t.preventDefault(),
                          e._move(
                            -e.config.step,
                            t.target.classList.contains("dhx_slider__thumb--extra")
                          )
                      },
                    }
                  for (t in i) this._keyManager.addHotKey(t, i[t])
                }),
                (g.prototype._move = function (t, e) {
                  this.config.inverse && (t = -t)
                  var i = this.config,
                    n = i.max,
                    o = i.min,
                    r = e
                      ? this._getValue(this._extraCurrentPosition)
                      : this._getValue(this._currentPosition),
                    i = r + t
                  this._setValue(r + t, e),
                    (n < i || i < o) && (i = r),
                    this.events.fire(h.SliderEvents.change, [i, r, e]),
                    this.paint()
                }),
                (g.prototype._initStartPosition = function () {
                  var t,
                    e,
                    i = this.config,
                    n = i.max,
                    o = i.min,
                    r = i.range,
                    i =
                      ((t = this.config.value),
                      (e = this.config.min),
                      (i = this.config.max),
                      ((t =
                        void 0 === t
                          ? []
                          : Array.isArray(t)
                          ? t
                          : "string" == typeof t
                          ? t.split(",").map(function (t) {
                              return parseInt(t, 10)
                            })
                          : [t])[0] = void 0 === t[0] ? e : p(t[0], e, i)),
                      (t[1] = void 0 === t[1] ? i : p(t[1], e, i)),
                      t),
                    t = i[0],
                    i = i[1]
                  ;(this._currentPosition = ((t - o) / (n - o)) * 100),
                    r && (this._extraCurrentPosition = ((n - i) / (n - o)) * 100),
                    (this._currentPosition = ((t - o) / (n - o)) * 100),
                    r && (this._extraCurrentPosition = ((i - o) / (n - o)) * 100),
                    this._isInverse() &&
                      ((this._currentPosition = 100 - this._currentPosition),
                      r && (this._extraCurrentPosition = 100 - this._extraCurrentPosition))
                }),
                (g.prototype._getValue = function (t) {
                  this._isInverse() && (t = 100 - t)
                  var e = this.config,
                    i = e.min,
                    n = e.max,
                    e = e.step
                  if (100 === t) return n
                  if (0 === t) return i
                  ;(t = (t * (n - i)) / 100), (n = t % e), (e = e / 2 <= n ? e : 0)
                  return +(Number(i) + Number(t) - n + e).toFixed(5)
                }),
                (g.prototype._setValue = function (t, e) {
                  void 0 === e && (e = !1)
                  var i = this.config,
                    n = i.max,
                    i = i.min
                  if (n < t || t < i) return !1
                  ;(i = ((t - i) / (n - i)) * 100), (i = this._isInverse() ? 100 - i : i)
                  e ? (this._extraCurrentPosition = i) : (this._currentPosition = i)
                }),
                (g.prototype._initHandlers = function () {
                  function e(t) {
                    if (
                      (t.targetTouches || t.preventDefault(),
                      (t =
                        (((t.targetTouches ? t.targetTouches[0] : t)[n._axis] - n._getBegining()) /
                          n._length) *
                        100),
                      n._findNewDirection)
                    ) {
                      if (Math.abs(n._currentPosition - t) < 1) return
                      t > n._currentPosition
                        ? (n._possibleRange = [n._currentPosition, 100])
                        : (n._possibleRange = [0, n._currentPosition]),
                        (n._findNewDirection = null)
                    }
                    n._inSide(t) && n._updatePosition(t, n._isExtraActive), n.paint()
                  }
                  function i(t) {
                    var e, i
                    n._disabled ||
                      3 === t.which ||
                      (n.events.fire(h.SliderEvents.mousedown, [t]),
                      (n._isMouseMoving = !0),
                      (e = t.target.classList.contains("dhx_slider__thumb--extra")
                        ? ((n._isExtraActive = !0), n._extraCurrentPosition)
                        : ((n._isExtraActive = !1), n._currentPosition)),
                      (n._findNewDirection = null),
                      n.config.range
                        ? ((t = (i =
                            n._currentPosition > n._extraCurrentPosition
                              ? [n._currentPosition, n._extraCurrentPosition]
                              : [n._extraCurrentPosition, n._currentPosition])[0]),
                          (i = i[1]),
                          n._currentPosition === n._extraCurrentPosition
                            ? ((n._findNewDirection = e), (n._possibleRange = [0, 100]))
                            : (n._possibleRange = e < t ? [0, t] : [i, 100]))
                        : (n._possibleRange = [0, 100]))
                  }
                  var n = this,
                    o = function (t) {
                      n.events.fire(h.SliderEvents.mouseup, [t]),
                        setTimeout(function () {
                          ;(n._isMouseMoving = !1), n.paint()
                        }, 4),
                        t.targetTouches
                          ? (document.removeEventListener("touchend", o),
                            document.removeEventListener("touchmove", e))
                          : (document.removeEventListener("mouseup", o),
                            document.removeEventListener("mousemove", e))
                    }
                  this.config.helpMessage &&
                    ((this._helper = new u.Popup({
                      css: "dhx_tooltip dhx_tooltip--forced dhx_tooltip--light",
                    })),
                    this._helper.attachHTML(this.config.helpMessage)),
                    (this._handlers = {
                      showHelper: function (t) {
                        t.preventDefault(), t.stopPropagation(), n._helper.show(t.target)
                      },
                      onmousedown: function (t) {
                        i(t),
                          document.addEventListener("mousemove", e),
                          document.addEventListener("mouseup", o)
                      },
                      ontouchstart: function (t) {
                        n._setTooltip(t),
                          (n._mouseIn = !1),
                          i(t),
                          document.addEventListener("touchmove", e),
                          document.addEventListener("touchend", o),
                          n.paint()
                      },
                      ontouchend: function (t) {
                        n._setTooltip(t), (n._mouseIn = !1), n.paint()
                      },
                      onlabelClick: function () {
                        n.getRootView().refs.runner.el.focus()
                      },
                      onclick: function (t) {
                        var e
                        n._disabled ||
                          n._isMouseMoving ||
                          3 === t.which ||
                          ((e = ((t[n._axis] - n._getBegining()) / n._length) * 100),
                          (t = n.getRootView().refs),
                          !n.config.range ||
                          Math.abs(n._currentPosition - e) < Math.abs(n._extraCurrentPosition - e)
                            ? (n._updatePosition(e, !1), t.runner.el.focus())
                            : (n._updatePosition(e, !0), t.extraRunner.el.focus()),
                          n.paint())
                      },
                      onmouseover: function (t) {
                        n._setTooltip(t), (n._mouseIn = !0), n.paint()
                      },
                      onmouseout: function (t) {
                        n._setTooltip(t), (n._mouseIn = !1), n.paint()
                      },
                      onfocus: function (t) {
                        n._setTooltip(t),
                          (n._focusIn = !0),
                          n.events.fire(h.SliderEvents.focus, []),
                          n.paint()
                      },
                      onblur: function (t) {
                        n._setTooltip(t),
                          (n._focusIn = !1),
                          n.events.fire(h.SliderEvents.blur, []),
                          n.paint()
                      },
                      onkeydown: function (t) {
                        n.events.fire(h.SliderEvents.keydown, [t])
                      },
                    })
                }),
                (g.prototype._getBegining = function () {
                  return "horizontal" === this.config.mode
                    ? this._offsets.left - window.pageXOffset
                    : this._offsets.top - window.pageYOffset
                }),
                (g.prototype._inSide = function (t) {
                  var e = this._possibleRange
                  return t < e[0]
                    ? (this._updatePosition(e[0], this._isExtraActive), !1)
                    : !(t > e[1]) || (this._updatePosition(e[1], this._isExtraActive), !1)
                }),
                (g.prototype._updatePosition = function (t, e) {
                  void 0 === e && (e = !1), 100 < t && (t = 100), t < 0 && (t = 0)
                  var i = this.config,
                    n = i.max,
                    o = i.min,
                    i = e ? this._extraCurrentPosition : this._currentPosition,
                    i = this._getValue(i),
                    t = this._getValue(t)
                  i !== t &&
                    ((o = ((t - o) / (n - o)) * 100),
                    (o = this._isInverse() ? 100 - o : o),
                    e ? (this._extraCurrentPosition = o) : (this._currentPosition = o),
                    this.events.fire(h.SliderEvents.change, [t, i, e]))
                }),
                (g.prototype._getRunnerStyle = function (t) {
                  void 0 === t && (t = !1)
                  var e = "horizontal" === this.config.mode ? "left" : "top",
                    i = t ? this._extraCurrentPosition : this._currentPosition
                  return ((t = {})[e] = i + "%"), t
                }),
                (g.prototype._isInverse = function () {
                  return (
                    (this.config.inverse && "horizontal" === this.config.mode) ||
                    (!this.config.inverse && "vertical" === this.config.mode)
                  )
                }),
                (g.prototype._getRunnerCss = function (t) {
                  return (
                    void 0 === t && (t = !1),
                    "dhx_slider__thumb" +
                      (t ? " dhx_slider__thumb--extra" : "") +
                      (this._isMouseMoving &&
                      ((t && this._isExtraActive) || (!t && !this._isExtraActive))
                        ? " dhx_slider__thumb--active"
                        : "") +
                      (this._disabled ? " dhx_slider__thumb--disabled" : "") +
                      (this._isNullable(t ? this._extraCurrentPosition : this._currentPosition) &&
                      !this.config.range
                        ? " dhx_slider__thumb--nullable"
                        : "")
                  )
                }),
                (g.prototype._draw = function () {
                  var t = this.config,
                    e = t.labelPosition,
                    i = t.mode,
                    n = t.hiddenLabel,
                    o = t.tick,
                    r = t.majorTick,
                    s = t.css,
                    a = t.helpMessage,
                    t = f.getLabelStyle(l(l({}, this.config), { required: !1 }))
                  return (
                    !this._tooltip ||
                      (this._mouseIn && this._focusIn && this._isMouseMoving) ||
                      (document.body.contains(this._tooltip) &&
                        document.body.removeChild(this._tooltip)),
                    c.el(
                      "div",
                      {
                        class:
                          "dhx_slider dhx_slider--mode_" +
                          i +
                          ("left" === e ? " dhx_slider--label-inline" : "") +
                          (n ? " dhx_slider--label_sr" : "") +
                          (o ? " dhx_slider--ticks" : "") +
                          (r ? " dhx_slider--major-ticks" : "") +
                          (s ? " " + s : "") +
                          (this._disabled ? " dhx_slider--disabled" : ""),
                      },
                      [
                        t
                          ? c.el(
                              "label.dhx_label.dhx_slider__label",
                              {
                                style: t.style,
                                class: a ? "dhx_label--with-help" : "",
                                onclick: this._handlers.onlabelClick,
                              },
                              a
                                ? [
                                    t.label && c.el("span.dhx_label__holder", t.label),
                                    c.el("span.dhx_label-help.dxi.dxi-help-circle-outline", {
                                      tabindex: "0",
                                      role: "button",
                                      onclick: this._handlers.showHelper,
                                    }),
                                  ]
                                : t.label
                            )
                          : null,
                        this._drawSlider(),
                      ]
                    )
                  )
                }),
                (g.prototype._drawSlider = function () {
                  return c.el(
                    ".dhx_widget.dhx_slider__track-holder",
                    { dhx_widget_id: this._uid },
                    [
                      c.el(
                        ".dhx_slider__track",
                        {
                          _ref: "track",
                          onmouseover: this._handlers.onmouseover,
                          onmouseout: this._handlers.onmouseout,
                          onclick: this._handlers.onclick,
                        },
                        [
                          this._getDetector(),
                          c.el("div", {
                            _ref: "runner",
                            class: this._getRunnerCss(),
                            ontouchstart: this._handlers.ontouchstart,
                            ontouchend: this._handlers.ontouchend,
                            onmousedown: this._handlers.onmousedown,
                            onfocus: this._handlers.onfocus,
                            onblur: this._handlers.onblur,
                            onkeydown: this._handlers.onkeydown,
                            style: this._getRunnerStyle(),
                            tabindex: 0,
                          }),
                          this.config.tooltip &&
                          (this._mouseIn || this._focusIn || this._isMouseMoving)
                            ? this._drawTooltip()
                            : null,
                          this.config.tooltip &&
                          this.config.range &&
                          (this._mouseIn || this._focusIn || this._isMouseMoving)
                            ? this._drawTooltip(!0)
                            : null,
                          this.config.range
                            ? c.el("div", {
                                _ref: "extraRunner",
                                class: this._getRunnerCss(!0),
                                ontouchstart: this._handlers.ontouchstart,
                                ontouchend: this._handlers.ontouchend,
                                onmousedown: this._handlers.onmousedown,
                                onfocus: this._handlers.onfocus,
                                onblur: this._handlers.onblur,
                                onkeydown: this._handlers.onkeydown,
                                style: this._getRunnerStyle(!0),
                                tabindex: 0,
                              })
                            : null,
                        ]
                      ),
                      this.config.tick ? this._drawTicks() : null,
                    ]
                  )
                }),
                (g.prototype._getDetector = function () {
                  var t
                  if (this._disabled) return c.el(".dhx_slider__range")
                  var e = "horizontal" === this.config.mode ? "left" : "top",
                    i = "horizontal" === this.config.mode ? "width" : "height"
                  if (this.config.range) {
                    var n =
                        this._currentPosition > this._extraCurrentPosition
                          ? [this._currentPosition, this._extraCurrentPosition]
                          : [this._extraCurrentPosition, this._currentPosition],
                      o = n[0],
                      r = n[1]
                    return c.el(".dhx_slider__range", {
                      style: (((n = {})[e] = r + "%"), (n[i] = o - r + "%"), n),
                    })
                  }
                  return this._isInverse()
                    ? c.el(".dhx_slider__range", {
                        style:
                          (((t = {})[e] = this._currentPosition + "%"),
                          (t[i] = 100 - this._currentPosition + "%"),
                          t),
                      })
                    : c.el(".dhx_slider__range", {
                        style: (((t = {})[e] = 0), (t[i] = this._currentPosition + "%"), t),
                      })
                }),
                (g.prototype._drawTooltip = function (t) {
                  var e, i, n
                  void 0 === t && (t = !1),
                    "none" !== this._activeTooltip &&
                      this.getRootView() &&
                      ((e =
                        "extraTooltip" === this._activeTooltip
                          ? this._extraCurrentPosition
                          : this._currentPosition),
                      (i = "horizontal" === this.config.mode ? "left" : "top"),
                      (n = ""),
                      ((t && this._isExtraActive) || (!t && !this._isExtraActive)) &&
                        (n += " dhx_slider__thumb-label--active"),
                      this._tooltip || (this._tooltip = document.createElement("div")),
                      (t = (
                        "tooltip" === this._activeTooltip
                          ? this.getRootView().refs.runner
                          : this.getRootView().refs.extraRunner
                      ).el.getBoundingClientRect()),
                      (this._tooltip.className = "dhx_slider__thumb-label" + n),
                      (this._tooltip.style.left =
                        t.x + ("left" == i ? 6 : -30) + window.pageXOffset + "px"),
                      (this._tooltip.style.top =
                        t.y + ("left" == i ? -30 : 6) + window.pageYOffset + "px"),
                      (this._tooltip.innerText = this._getValue(e).toString()),
                      document.body.appendChild(this._tooltip))
                }),
                (g.prototype._getTicks = function () {
                  for (
                    var t = this.config,
                      e = t.max,
                      i = t.min,
                      n = t.step,
                      o = t.tick,
                      r = t.majorTick,
                      s = e - i,
                      a = (n * o) / s,
                      l = [],
                      c = 0,
                      d = 0;
                    c < 1;

                  ) {
                    var u = +(Number(i) + c * s).toFixed(5),
                      h = d % r == 0
                    l.push({
                      position: (this._isInverse() ? 100 * (1 - c) : 100 * c) + "%",
                      isMultiple: h,
                      label:
                        h && "function" == typeof this.config.tickTemplate
                          ? this.config.tickTemplate(u)
                          : null,
                    }),
                      (c += a),
                      d++
                  }
                  return (
                    l.push({
                      position: (this._isInverse() ? 0 : 100) + "%",
                      isMultiple: !0,
                      label:
                        "function" == typeof this.config.tickTemplate
                          ? this.config.tickTemplate(e)
                          : null,
                    }),
                    l
                  )
                }),
                (g.prototype._drawTicks = function () {
                  var i = "horizontal" === this.config.mode ? "left" : "top"
                  return c.el(
                    ".dhx_slider__ticks-holder",
                    this._getTicks().map(function (t) {
                      var e
                      return c.el(
                        "div",
                        {
                          class:
                            "dhx_slider__tick" + (t.isMultiple ? " dhx_slider__tick--major" : ""),
                          style: (((e = {})[i] = t.position), e),
                        },
                        void 0 !== t.label ? [c.el(".dhx_slider__tick-label", t.label)] : null
                      )
                    })
                  )
                }),
                (g.prototype._isNullable = function (t) {
                  return this._isInverse() ? 100 === t : 0 === t
                }),
                (g.prototype._setTooltip = function (t) {
                  t.target.classList.contains("dhx_slider__thumb--extra")
                    ? (this._activeTooltip = "extraTooltip")
                    : t.target.classList.contains("dhx_slider__thumb")
                    ? (this._activeTooltip = "tooltip")
                    : (this._activeTooltip = "none")
                }),
                g)
            function g(t, e) {
              var i =
                _.call(
                  this,
                  t,
                  r.extend({ mode: "horizontal", min: 0, max: 100, step: 1, tooltip: !0 }, e)
                ) || this
              ;(i._disabled = !1),
                (i.config.helpMessage = i.config.helpMessage || i.config.help),
                void 0 !== i.config.thumbLabel && (i.config.tooltip = i.config.thumbLabel),
                i.config.labelInline && (i.config.labelPosition = "left"),
                (i.events = new s.EventSystem(i)),
                (i._axis = "horizontal" === i.config.mode ? "clientX" : "clientY"),
                i._initStartPosition(),
                (i._keyManager = new a.KeyManager(function () {
                  var t
                  return (
                    document.activeElement ===
                    (null ===
                      (t = i.getRootView().refs[i._isExtraActive ? "extraRunner" : "runner"]) ||
                    void 0 === t
                      ? void 0
                      : t.el)
                  )
                })),
                i._initHotkeys()
              e = c.create({
                render: function () {
                  return i._draw()
                },
                hooks: {
                  didMount: function () {
                    return i._calcSliderPosition()
                  },
                  didRedraw: function () {
                    return i._calcSliderPosition()
                  },
                },
              })
              return i._initHandlers(), i.mount(t, e), i
            }
            e.Slider = o
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              s =
                (this && this.__assign) ||
                function () {
                  return (s =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r,
              a = i(1),
              l = i(0),
              c = i(5),
              d = i(2),
              u = i(6),
              h = i(46),
              o =
                ((r = u.View),
                o(f, r),
                (f.prototype.show = function (t, e, i) {
                  var n = this
                  void 0 === e && (e = {}),
                    this.events.fire(h.PopupEvents.beforeShow, [t]) &&
                      ((t = d.toNode(t)),
                      this._isActive
                        ? this._setPopupSize(t, e)
                        : (i && this.attach(i),
                          (this._popup.style.left = "0"),
                          (this._popup.style.top = "0"),
                          l
                            .awaitRedraw()
                            .then(function () {
                              n._setPopupSize(t, e),
                                (n._popup.style.position = "fixed"),
                                document.body.appendChild(n._popup),
                                (n._isActive = !0)
                            })
                            .then(function () {
                              ;(n._popup.style.position = "absolute"),
                                n.events.fire(h.PopupEvents.afterShow, [t]),
                                (n._outerClickDestructor = n._detectOuterClick(t))
                            })))
                }),
                (f.prototype.hide = function () {
                  this._hide(!1, null)
                }),
                (f.prototype.isVisible = function () {
                  return this._isActive
                }),
                (f.prototype.attach = function (t, e) {
                  return (
                    (this._html = null),
                    "object" == typeof t
                      ? (this._ui = t)
                      : "string" == typeof t
                      ? (this._ui = new window.dhx[t](null, e))
                      : "function" == typeof t &&
                        (t.prototype instanceof u.View
                          ? (this._ui = new t(null, e))
                          : (this._ui = {
                              getRootView: function () {
                                return t(e)
                              },
                            })),
                    this.paint(),
                    this._ui
                  )
                }),
                (f.prototype.attachHTML = function (t) {
                  ;(this._html = t), this.paint()
                }),
                (f.prototype.getWidget = function () {
                  return this._ui
                }),
                (f.prototype.getContainer = function () {
                  return this.getRootView().refs.content.el
                }),
                (f.prototype.toVDOM = function () {
                  var t
                  return (
                    this._html
                      ? (t = l.el(".dhx_popup__inner-html-content", { ".innerHTML": this._html }))
                      : (t = this._ui ? this._ui.getRootView() : null) &&
                        t.render &&
                        (t = l.inject(t)),
                    l.el(
                      "div",
                      {
                        class: "dhx_popup-content",
                        tabindex: 0,
                        onclick: this._clickEvent,
                        _key: this._uid,
                        _ref: "content",
                      },
                      [t]
                    )
                  )
                }),
                (f.prototype.destructor = function () {
                  this.hide(),
                    this._outerClickDestructor && this._outerClickDestructor(),
                    (this._popup = null)
                }),
                (f.prototype._setPopupSize = function (t, e, i) {
                  var n = this
                  void 0 === i && (i = 3)
                  var o = this._popup.getBoundingClientRect(),
                    r = o.width,
                    o = o.height
                  if (
                    (this._timeout && (clearTimeout(this._timeout), (this._timeout = null)),
                    !i || (0 !== r && 0 !== o))
                  ) {
                    ;(r = d.fitPosition(
                      t,
                      s(s({ centering: !0, mode: "bottom" }, e), { width: r, height: o })
                    )),
                      (o = r.left),
                      (r = r.top)
                    if (
                      ((this._popup.style.left = o),
                      (this._popup.style.top = r),
                      e.indent && 0 !== e.indent)
                    )
                      switch (e.mode) {
                        case "top":
                          this._popup.style.top =
                            parseInt(this._popup.style.top.slice(0, -2), null) -
                            parseInt(e.indent.toString(), null) +
                            "px"
                          break
                        case "bottom":
                          this._popup.style.top =
                            parseInt(this._popup.style.top.slice(0, -2), null) +
                            parseInt(e.indent.toString(), null) +
                            "px"
                          break
                        case "left":
                          this._popup.style.left =
                            parseInt(this._popup.style.left.slice(0, -2), null) -
                            parseInt(e.indent.toString(), null) +
                            "px"
                          break
                        case "right":
                          this._popup.style.left =
                            parseInt(this._popup.style.left.slice(0, -2), null) +
                            parseInt(e.indent.toString(), null) +
                            "px"
                          break
                        default:
                          this._popup.style.top =
                            parseInt(this._popup.style.top.slice(0, -2), null) +
                            parseInt(e.indent.toString(), null) +
                            "px"
                      }
                  } else
                    this._timeout = setTimeout(function () {
                      n._isActive && (n._setPopupSize(t, e, i - 1), (n._timeout = null))
                    })
                }),
                (f.prototype._detectOuterClick = function (i) {
                  var n = this,
                    o = function (t) {
                      for (var e = t.target; e; ) {
                        if (e === i || e === n._popup) return
                        e = e.parentNode
                      }
                      n._hide(!0, t) && document.removeEventListener("mousedown", o)
                    }
                  return (
                    document.addEventListener("mousedown", o),
                    function () {
                      return document.removeEventListener("mousedown", o)
                    }
                  )
                }),
                (f.prototype._hide = function (t, e) {
                  if (this._isActive)
                    return (
                      !!this.events.fire(h.PopupEvents.beforeHide, [t, e]) &&
                      (document.body.removeChild(this._popup),
                      (this._isActive = !1),
                      this._outerClickDestructor &&
                        (this._outerClickDestructor(), (this._outerClickDestructor = null)),
                      this.events.fire(h.PopupEvents.afterHide, [e]),
                      !0)
                    )
                }),
                f)
            function f(t) {
              void 0 === t && (t = {})
              var e = r.call(this, null, a.extend({}, t)) || this,
                i = (e._popup = document.createElement("div"))
              return (
                (i.className = "dhx_widget dhx_popup" + (e.config.css ? " " + e.config.css : "")),
                (i.style.position = "absolute"),
                i.setAttribute("role", "dialog"),
                i.setAttribute("aria-modal", "true"),
                i.setAttribute("aria-live", "polite"),
                e.mount(
                  i,
                  l.create({
                    render: function () {
                      return e.toVDOM()
                    },
                  })
                ),
                (e._clickEvent = function (t) {
                  return e.events.fire(h.PopupEvents.click, [t])
                }),
                (e.events = t.events || new c.EventSystem(e)),
                (e._isActive = !1),
                e
              )
            }
            e.Popup = o
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            e.default = { hours: "Hours", minutes: "Minutes", save: "Save" }
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              (e.isTimeCheck = function (t) {
                return /(^12:[0-5][0-9]?AM$)/i.test(t)
              })
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              (e.linkButtonClasses =
                ".dhx_button.dhx_button--view_link.dhx_button--icon.dhx_button--size_medium.dhx_button--color_secondary")
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(1),
              o = i(0),
              r = i(3),
              i =
                ((s.prototype.endEdit = function () {
                  var t = this._checked
                  this._config.events.fire(r.GridEvents.beforeEditEnd, [
                    t,
                    this._cell.row,
                    this._cell.col,
                  ])
                    ? ((this._cell.row = this._config.datacollection.getItem(this._cell.row.id)),
                      this._config.events.fire(r.GridEvents.afterEditEnd, [
                        t,
                        this._cell.row,
                        this._cell.col,
                      ]))
                    : (this._input.checked = !t)
                }),
                (s.prototype.toHTML = function () {
                  void 0 === this._checked && (this._checked = this._cell.row[this._cell.col.id])
                  var t = n.uid()
                  return o.el("div.dhx_checkbox.dhx_cell-editor__checkbox", [
                    o.el("label", { style: { display: "none" }, for: t }, this._checked || "false"),
                    o.el("input.dhx_checkbox__input", {
                      type: "checkbox",
                      _hooks: { didInsert: this._handlers.didInsert },
                      _key: "cell_editor",
                      dhx_id: "cell_editor",
                      checked: this._checked,
                      id: t,
                      style: { userSelect: "none" },
                    }),
                    o.el("span.dhx_checkbox__visual-input"),
                  ])
                }),
                (s.prototype._initHandlers = function () {
                  var e = this
                  this._handlers = {
                    onClick: function () {
                      var t = !e._input.checked
                      e._config.events.fire(r.GridEvents.beforeEditStart, [
                        e._cell.row,
                        e._cell.col,
                        "checkbox",
                      ])
                        ? ((e._checked = t),
                          e._config.events.fire(r.GridEvents.afterEditStart, [
                            e._cell.row,
                            e._cell.col,
                            "checkbox",
                          ]),
                          e.endEdit())
                        : (e._input.checked = !t)
                    },
                    didInsert: function (t) {
                      ;(e._checkbox = t.el.parentNode.lastChild),
                        (e._input = t.el.parentNode.querySelector("input")),
                        t.el.parentNode.addEventListener("click", e._handlers.onClick)
                    },
                  }
                }),
                s)
            function s(t, e, i) {
              ;(this._config = i), (this._cell = { row: t, col: e }), this._initHandlers()
            }
            e.CheckboxEditor = i
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(0),
              o = i(3),
              r = i(50),
              s = i(19),
              i =
                ((a.prototype.endEdit = function (t) {
                  var e
                  t ||
                    ((e = this._input.getValue()),
                    (e =
                      "multiselect" === this._cell.col.editorType ? e.split(",").join(", ") : e)),
                    this._config.events.fire(o.GridEvents.beforeEditEnd, [
                      e,
                      this._cell.row,
                      this._cell.col,
                    ])
                      ? (this._input.popup.hide(),
                        document.removeEventListener("mousedown", this._handlers.onOuterClick),
                        (this._cell.row = this._config.datacollection.getItem(this._cell.row.id)),
                        s.focusManager.setFocusId(this._config.gridId),
                        this._config.events.fire(o.GridEvents.afterEditEnd, [
                          e,
                          this._cell.row,
                          this._cell.col,
                        ]))
                      : this._input.focus()
                }),
                (a.prototype.toHTML = function () {
                  var e = this,
                    t =
                      this._cell.col.options.map(function (t) {
                        return "string" == typeof t ? { id: "" + t, value: t } : t
                      }) || []
                  return (
                    this._input ||
                      ((this._input = new r.Combobox(null, {
                        cellHeight: 37,
                        css: "dhx_cell-editor__combobox",
                        multiselection: "multiselect" === this._cell.col.editorType,
                      })),
                      this._input.data.parse(t),
                      (t = this._cell.row[this._cell.col.id]),
                      (t = "multiselect" === this._cell.col.editorType ? (t || "").split(", ") : t),
                      this._input.setValue(t),
                      this._input.events.on("keydown", this._handlers.onkeydown)),
                    document.addEventListener("mousedown", this._handlers.onOuterClick),
                    (this._config.$editable.editor = this),
                    n.awaitRedraw().then(function () {
                      var t = e._input.getRootView().refs.holder.el
                      ;(e._input.popup.getContainer().style.width = t.offsetWidth + "px"),
                        e._input.popup.show(t)
                    }),
                    s.focusManager.setFocusId(this._input._uid),
                    n.inject(this._input.getRootView())
                  )
                }),
                (a.prototype._initHandlers = function () {
                  var i = this
                  this._handlers = {
                    onOuterClick: function (t) {
                      var e
                      t.target instanceof Node &&
                        ((e =
                          i._input &&
                          i._input.getRootNode() &&
                          i._input.getRootNode().contains(t.target)),
                        (t =
                          i._input.popup &&
                          i._input.popup.getRootNode() &&
                          i._input.popup.getRootNode().contains(t.target)),
                        e || t || i.endEdit())
                    },
                    onkeydown: function (t) {
                      ;("Escape" !== t.key && "Tab" !== t.key) || i.endEdit()
                    },
                  }
                }),
                a)
            function a(t, e, i) {
              ;(this._config = i), (this._cell = { row: t, col: e }), this._initHandlers()
            }
            e.ComboboxEditor = i
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              (e.KEY_CODES = {
                BACKSPACE: 8,
                ENTER: 13,
                ESC: 27,
                DOWN_ARROW: 40,
                UP_ARROW: 38,
                LEFT_ARROW: 37,
                RIGHT_ARROW: 39,
              })
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(110)
            e.getEditor = function (t, e) {
              return new n.InputEditor(t, e)
            }
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(0),
              o = i(32),
              i =
                ((r.prototype.endEdit = function () {
                  var t
                  this._input &&
                    ((t = this._input.value),
                    this._list.events.fire(o.ListEvents.beforeEditEnd, [t, this._item.id])
                      ? (this._input.removeEventListener("blur", this._handlers.onBlur),
                        this._input.removeEventListener("change", this._handlers.onChange),
                        (this._handlers = {}),
                        (this._mode = !1),
                        this._list.events.fire(o.ListEvents.afterEditEnd, [t, this._item.id]))
                      : this._input.focus())
                }),
                (r.prototype.toHTML = function () {
                  this._mode = !0
                  var t = this._config.itemHeight
                  return n.el(".dhx_input__wrapper", { role: "presentation" }, [
                    n.el("div.dhx_input__container", { role: "presentation" }, [
                      n.el("input.dhx_input", {
                        class: this._item.css ? " " + this._item.css : "",
                        style: { height: t, width: "100%", padding: "8px 12px" },
                        _hooks: { didInsert: this._handlers.didInsert },
                        _key: this._item.id,
                        dhx_id: this._item.id,
                      }),
                    ]),
                  ])
                }),
                (r.prototype._initHandlers = function () {
                  var e = this
                  this._handlers = {
                    onBlur: function () {
                      e.endEdit()
                    },
                    onChange: function () {
                      e.endEdit()
                    },
                    didInsert: function (t) {
                      t = t.el
                      ;(e._input = t).focus(),
                        (t.value = e._item.value),
                        t.setSelectionRange(0, t.value.length),
                        t.addEventListener("change", e._handlers.onChange),
                        t.addEventListener("blur", e._handlers.onBlur)
                    },
                  }
                }),
                r)
            function r(t, e) {
              var i = this
              ;(this._list = e),
                (this._config = e.config),
                (this._item = t),
                this._list.events.on(o.ListEvents.focusChange, function (t, e) {
                  i._mode && e !== i._item.id && i.endEdit()
                }),
                this._initHandlers()
            }
            e.InputEditor = i
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              r =
                (this && this.__assign) ||
                function () {
                  return (r =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                },
              s =
                (this && this.__spreadArrays) ||
                function () {
                  for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length
                  for (var n = Array(t), o = 0, e = 0; e < i; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s]
                  return n
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var a,
              l = i(0),
              c = i(15),
              i = i(52),
              o =
                ((a = i.List),
                o(d, a),
                (d.prototype.destructor = function () {
                  a.prototype.destructor.call(this), (this.scrollView = null)
                }),
                (d.prototype.showItem = function (t) {
                  var e,
                    i,
                    n,
                    o = this.getRootView()
                  o &&
                    o.node &&
                    o.node.el &&
                    void 0 !== t &&
                    (e = this.getRootNode()) &&
                    ((i = this.config.virtual),
                    (n = this.data.getIndex(t)),
                    (o = Math.floor(n / e.children.length) || 0),
                    (t = e.children[n - e.children.length * o]),
                    (i || t) &&
                      ((o = i ? parseInt(this.config.itemHeight) : t.clientHeight),
                      (t = i ? n * o : t.offsetTop) >= e.scrollTop + e.clientHeight - o
                        ? e.scrollTo(0, t - e.clientHeight + o)
                        : t < e.scrollTop && e.scrollTo(0, t)))
                }),
                (d.prototype._renderList = function () {
                  var i = this,
                    t = this._getRange(),
                    e = this.data.getRawData(t[0], t[1]).map(function (t, e) {
                      return i._renderItem(t, e)
                    })
                  this.config.virtual &&
                    (e = s([l.el(".div", { style: { height: t[2] + "px" } })], e, [
                      l.el(".div", { style: { height: t[3] + "px" } }),
                    ]))
                  var n = this.scrollView && this.scrollView.config.enable,
                    t =
                      (this.config.css || "") +
                      (this.config.multiselection && this.selection.getItem()
                        ? " dhx_no-select--pointer"
                        : "") +
                      (n ? " dhx_list--scroll-view" : "")
                  return l.el(
                    "ul.dhx_widget.dhx_list",
                    r(
                      r(
                        {
                          style: { "max-height": this.config.height, position: "relative" },
                          class: t,
                          dhx_widget_id: this._uid,
                        },
                        this._handlers
                      ),
                      this._getListAriaAttrs(this.config, this.data.getLength())
                    ),
                    n ? [].concat(this.scrollView.render(e)) : e
                  )
                }),
                d)
            function d(t, e) {
              var i = a.call(this, t, e) || this
              return (
                (i.scrollView = new c.ScrollView(function () {
                  return i.getRootView()
                })),
                i.paint(),
                i
              )
            }
            e.ProList = o
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n =
              ((o.prototype.startNewListen = function (t) {
                ;(this._isActive = !0), (this._sequence = ""), (this._currentAction = t)
              }),
              (o.prototype.endListen = function () {
                ;(this._currentAction = null), this.reset(), (this._isActive = !1)
              }),
              (o.prototype.reset = function () {
                this._sequence = ""
              }),
              (o.prototype._change = function () {
                this._currentAction(this._sequence), this._addClearTimeout()
              }),
              (o.prototype._addClearTimeout = function () {
                var t = this
                this._clearTimeout && clearTimeout(this._clearTimeout),
                  (this._clearTimeout = setTimeout(function () {
                    t.reset(), (t._clearTimeout = null)
                  }, 2e3))
              }),
              o)
            function o() {
              var e = this
              ;(this._sequence = ""),
                document.addEventListener("keydown", function (t) {
                  e._isActive &&
                    ("Backspace" === (t = t.key) &&
                      0 < e._sequence.length &&
                      ((e._sequence = e._sequence.slice(0, e._sequence.length - 1)), e._change()),
                    t.length < 2 && ((e._sequence += t), e._change()))
                })
            }
            e.KeyListener = n
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                })
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r,
              s = i(51),
              a = i(24),
              l = i(22),
              c = i(55),
              o =
                ((r = s.Combobox),
                o(d, r),
                (d.prototype._createLayout = function () {
                  var t = (this.list = new a.ProList(null, {
                      template: this.config.template,
                      virtual: this.config.virtual,
                      keyNavigation: !1,
                      multiselection: this.config.multiselection,
                      itemHeight: this.config.itemHeight,
                      height: this.config.listHeight,
                      data: this.data,
                    })),
                    e = (this._layout = new l.ProLayout(this.popup.getContainer(), {
                      css: "dhx_combobox-options dhx_combobox__options",
                      rows: [
                        {
                          id: "select-unselect-all",
                          hidden: !this.config.multiselection || !this.config.selectAllButton,
                        },
                        { id: "list", height: "content" },
                        { id: "not-found", hidden: !0 },
                      ],
                      on: {
                        click: { ".dhx_combobox__action-select-all": this._handlers.selectAll },
                      },
                    }))
                  e.getCell("list").attach(t),
                    this.config.multiselection &&
                      this.config.selectAllButton &&
                      e.getCell("select-unselect-all").attach(c.selectAllView)
                }),
                d)
            function d(t, e) {
              return r.call(this, t, e) || this
            }
            e.ProCombobox = o
          },
          function (t, e, i) {
            "use strict"
            var r =
              (this && this.__assign) ||
              function () {
                return (r =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(0),
              s = i(3),
              o = i(1),
              a = i(12),
              i =
                ((l.prototype.endEdit = function (t) {
                  var e
                  t || (e = this._editor.value),
                    this._config.events.fire(s.GridEvents.beforeEditEnd, [
                      e,
                      this._cell.row,
                      this._cell.col,
                    ])
                      ? (this._editor.removeEventListener("blur", this._handlers.onBlur),
                        this._editor.removeEventListener("change", this._handlers.onChange),
                        this._editor.removeEventListener("input", this._handlers.onInput),
                        "string" !== this._cell.col.type && o.isNumeric(e) && (e = parseFloat(e)),
                        (this._cell.row = this._config.datacollection.getItem(this._cell.row.id)),
                        this._config.events.fire(s.GridEvents.afterEditEnd, [
                          e,
                          this._cell.row,
                          this._cell.col,
                        ]))
                      : this._editor.focus()
                }),
                (l.prototype.toHTML = function () {
                  var t = this._cell.row[this._cell.col.id]
                  this._editor && (t = this._editor.value)
                  var e =
                    void 0 !== (this._config.$editable.editor = this)._cell.row.height ||
                    this._cell.col.htmlEnable
                      ? "dhx_cell-editor dhx_cell-editor__textarea_constant-height"
                      : "dhx_cell-editor dhx_cell-editor__textarea"
                  return n.el("textarea", {
                    _hooks: { didInsert: this._handlers.didInsert },
                    _ref: "textarea",
                    _key: "cell_editor",
                    dhx_id: "cell_editor",
                    value: t,
                    class: e,
                    style: { width: this._width },
                  })
                }),
                (l.prototype._initHandlers = function () {
                  var o = this
                  this._handlers = {
                    onBlur: function () {
                      o.endEdit()
                    },
                    onChange: function () {
                      o.endEdit()
                    },
                    onInput: function (t) {
                      if (void 0 === o._cell.row.height && !o._cell.col.htmlEnable) {
                        var e = o._getCurrentHeight(o._editor.value, {
                          width: o._cell.col.$width - 2,
                          maxHeight: o._config.rowHeight,
                        })
                        o._cell.row[o._cell.col.id] = o._editor.value
                        var i = a.getCalculatedRowHeight(
                            a.getMaxRowHeight(o._cell.row, o._config.columns)
                          ),
                          n = a.getCalculatedRowHeight(
                            a.getMaxRowHeight(
                              (((n = {})[o._cell.col.id] = o._cell.row[o._cell.col.id]), n),
                              o._config.columns
                            )
                          )
                        if (
                          ((o._minHeight = i === n ? o._config.rowHeight : i),
                          e >= o._minHeight && e !== o._prevHeight)
                        ) {
                          if (
                            !o._config.events.fire(s.GridEvents.beforeRowResize, [
                              o._cell.row,
                              t,
                              e,
                            ])
                          )
                            return
                          o._config.events.fire(s.GridEvents.afterRowResize, [o._cell.row, t, e])
                        }
                        o._prevHeight = e
                      }
                    },
                    didInsert: function (t) {
                      ;(o._editor = t.el),
                        o._editor.focus(),
                        o._editor.setSelectionRange(0, o._editor.value.length),
                        o._editor.addEventListener("change", o._handlers.onChange),
                        o._editor.addEventListener("blur", o._handlers.onBlur),
                        o._editor.addEventListener("input", o._handlers.onInput)
                    },
                  }
                }),
                (l.prototype._getCurrentHeight = function (t, e) {
                  e = r({ width: 100, maxHeight: 40, lineHeight: 20 }, e)
                  var i = document.createElement("textarea")
                  ;(i.className = "dhx_cell-editor dhx_cell-editor__textarea"),
                    (i.value = t),
                    (i.style.width = e.width + "px"),
                    (i.style.lineHeight = e.lineHeight + "px"),
                    (i.style.maxHeight = e.maxHeight + "px"),
                    (i.style.boxSizing = "border-box"),
                    document.body.appendChild(i)
                  var n = this._getElementHeight(i),
                    o = i.value.split("\n").length,
                    t = Math.round(n / e.lineHeight),
                    n = n < e.maxHeight ? e.maxHeight : n
                  return document.body.removeChild(i), 1 === o && o === t ? e.maxHeight : n
                }),
                (l.prototype._getElementHeight = function (t) {
                  return t.scrollHeight
                }),
                l)
            function l(t, e, i) {
              ;(this._config = i),
                (this._cell = { row: t, col: e }),
                (this._width = this._cell.col.$width)
              e = 0
              this._config.firstColId === this._cell.col.id &&
                this._cell.row.hasOwnProperty("$level") &&
                (e = a.getTreeCellWidthOffset(this._cell.row)),
                (this._width -= e - 4),
                this._initHandlers()
            }
            e.TextAreaEditor = i
          },
          function (t, e, i) {
            "use strict"
            var f =
                (this && this.__assign) ||
                function () {
                  return (f =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                },
              p =
                (this && this.__spreadArrays) ||
                function () {
                  for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length
                  for (var n = Array(t), o = 0, e = 0; e < i; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s]
                  return n
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var _ = i(0),
              g = i(2),
              v = i(30),
              m = i(57),
              y = i(7)
            ;(e.getFixedColsHeader = function (t, e) {
              if ("number" == typeof t.leftSplit) {
                for (var i = 0, n = 0; n < t.leftSplit; n++) t.columns[n].hidden && i++
                if (i !== t.leftSplit) {
                  for (
                    var o = t.columns.slice(0, t.leftSplit - i), r = 0, s = 0, a = o;
                    s < a.length;
                    s++
                  )
                    r += a[s].$width
                  ;(o =
                    0 <= t.leftSplit &&
                    m.getFixedRows(
                      f(f({}, t), {
                        currentColumns: o,
                        $positions: f(f({}, t.$positions), { xStart: 0, xEnd: t.leftSplit }),
                        scroll: { top: 0, left: 0 },
                        columns: o,
                      }),
                      f(f({}, e), { name: "header", position: "top", shifts: { x: 0, y: 0 } })
                    )),
                    (e = f(f({}, e), { name: "header", position: "top" }))
                  return (
                    o &&
                    _.el(
                      ".dhx_" + e.name + "-fixed-cols",
                      f(
                        {
                          style: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            maxWidth: r,
                            overflow: "hidden",
                          },
                        },
                        { role: "rowgroup", "aria-rowcount": o.length }
                      ),
                      o.body
                    )
                  )
                }
              }
            }),
              (e.getFixedCols = function (t, e) {
                if ("number" == typeof t.leftSplit) {
                  for (var i = 0, n = 0; n < t.leftSplit; n++) t.columns[n].hidden && i++
                  if (i !== t.leftSplit) {
                    var o = t.$totalWidth <= e.wrapper.width ? 0 : g.getScrollbarWidth(),
                      r = t.$totalHeight + t.headerHeight + t.footerHeight,
                      s =
                        r > e.gridBodyHeight
                          ? r - o
                          : r < e.gridBodyHeight - o
                          ? r
                          : e.gridBodyHeight,
                      a = t.columns.slice(0, t.leftSplit - i)
                    t.fixedColumnsWidth = y.getTotalWidth(a)
                    var l = v.getCells(
                        f(f({}, t), {
                          columns: a,
                          $positions: f(f({}, t.$positions), { xStart: 0, xEnd: t.leftSplit }),
                        })
                      ),
                      c = e.sticky,
                      d = f(f({}, e), { name: "footer", position: "bottom" }),
                      u =
                        0 <= t.leftSplit &&
                        m.getRows(
                          f(f({}, t), {
                            currentColumns: a,
                            $positions: f(f({}, t.$positions), { xStart: 0, xEnd: t.leftSplit }),
                          }),
                          f(f({}, e), { name: "footer", position: "bottom" })
                        ),
                      h = 0
                    u &&
                      u.forEach(function (t) {
                        return (h += t.attrs.style.height)
                      })
                    ;(r = function (t) {
                      return { role: "rowgroup", "aria-rowcount": t }
                    }),
                      (a = c
                        ? u &&
                          _.el(
                            ".dhx_" + d.name + "-fixed-cols",
                            f(
                              {
                                style: {
                                  position: "absolute",
                                  top: s < e.gridBodyHeight ? s - h : null,
                                  left: 0,
                                  bottom: s >= e.gridBodyHeight ? 0 + (c ? o : 0) + "px" : null,
                                },
                              },
                              r(u.length)
                            ),
                            u
                          )
                        : null),
                      (d = t.$positions),
                      (u = v.getSpans(t, !0))
                    return [
                      _.el(
                        ".dhx_grid-fixed-cols-wrap",
                        f(
                          {
                            style: {
                              height:
                                s >= e.gridBodyHeight
                                  ? (c ? e.gridBodyHeight : e.gridBodyHeight + t.headerHeight) - o
                                  : s,
                              paddingTop: t.headerHeight,
                              overflow: "hidden",
                              width: t.fixedColumnsWidth,
                            },
                          },
                          { role: "presentation", "aria-label": "Fixed column" }
                        ),
                        [
                          _.el(
                            ".dhx_grid-fixed-cols",
                            f(
                              f(
                                {
                                  style: {
                                    top: -t.scroll.top + t.headerHeight - 1 + "px",
                                    paddingTop: e.shifts.y,
                                    height: t.$totalHeight,
                                    position: "absolute",
                                  },
                                  _flags: _.KEYED_LIST,
                                },
                                v.getHandlers(d.yStart, d.xStart, t)
                              ),
                              r(t.data.length)
                            ),
                            p([u && _.el(".dhx_span-spans", { role: "presentation" }, [u])], l)
                          ),
                          _.el(".dhx_frozen-cols-border", { role: "presentation" }),
                        ]
                      ),
                      t.$footer ? a : null,
                    ]
                  }
                }
              })
          },
          function (t, e, i) {
            "use strict"
            var o =
              (this && this.__spreadArrays) ||
              function () {
                for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length
                for (var n = Array(t), o = 0, e = 0; e < i; e++)
                  for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s]
                return n
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var s,
              a = i(0),
              l = i(50),
              c = i(4),
              d = i(3),
              n = i(12),
              u = i(2),
              r = i(1)
            function h(e, i, n, o, r) {
              function t() {
                var t = (
                  u.isIE() || u.isSafari()
                    ? r.target
                    : r.path
                    ? r.path[0]
                    : r.explicitOriginalTarget
                ).value
                ;(o.value[i] = t), e.fire(d.GridEvents.filterChange, [t, i, n])
              }
              "selectFilter" !== n ? (s && clearTimeout(s), (s = setTimeout(t, 250))) : t()
            }
            function f(t, n, e, i) {
              if (t && n && e) {
                var o = t.id,
                  t = i
                    ? i(o, n.data)
                    : n.data.reduce(function (t, e) {
                        return (
                          void 0 === e[o] || "" === e[o] || isNaN(e[o]) || t.push(parseFloat(e[o])),
                          t
                        )
                      }, []),
                  i = t
                return (
                  "tree" === n.type &&
                    (i = n.data.reduce(function (t, e) {
                      var i
                      return (
                        0 === e.$level &&
                          (void 0 === e[o] || "" === e[o] || isNaN(e[o])
                            ? ((i = 0),
                              n.datacollection.eachChild(e.id, function (t) {
                                n.datacollection.haveItems(t.id) || (i += parseFloat(t[o]))
                              }),
                              t.push(i))
                            : t.push(parseFloat(e[o]) || 0)),
                        t
                      )
                    }, [])),
                  e(t, i)
                )
              }
            }
            e.getContent = function () {
              var i = this
              return {
                inputFilter: {
                  element: {},
                  toHtml: function (t, e) {
                    var i = r.uid(),
                      n = t.id.toString()
                    return (
                      (this.element[n] = a.el(
                        "div.dhx_grid-filter__label.dxi.dxi-magnify",
                        { "aria-label": "Type to search", _ref: t.id + "_filter" },
                        [
                          a.el(
                            "label",
                            { style: { display: "none" }, "aria-label": "Type to search", for: i },
                            "Type to search"
                          ),
                          a.el("input", {
                            type: "text",
                            class: "dhx_input dhx_grid-filter",
                            oninput: [h, e.events, t.id, "inputFilter", this],
                            _key: t.id,
                            id: i,
                            value: this.value[t.id] || "",
                          }),
                        ]
                      )),
                      this.element[n]
                    )
                  },
                  match: function (t, e) {
                    for (var i = "", n = 0; n < e.length; n++) {
                      var o = e.charCodeAt(n)
                      i +=
                        (32 < o && o < 48) || 63 === o || (90 < o && o < 95) || 124 === o
                          ? "\\" + e[n]
                          : e[n]
                    }
                    return new RegExp("" + i, "i").test(t)
                  },
                  value: {},
                },
                selectFilter: {
                  element: {},
                  toHtml: function (e, t) {
                    var i = this,
                      n = e.id.toString()
                    return (
                      (this.element[n] = a.el(
                        "label.dhx_grid-filter__label.dxi.dxi-menu-down",
                        { _ref: e.id + "_filter" },
                        [
                          a.el(
                            "select.dxi.dxi-menu-down",
                            {
                              type: "text",
                              class: "dhx_input dhx_grid-filter dhx_grid-filter--select",
                              onchange: [h, t.events, e.id, "selectFilter", this],
                              _key: e.id,
                            },
                            o(
                              [a.el("option", { value: "" }, "")],
                              e.$uniqueData.map(function (t) {
                                return (
                                  "" !== (t = null != t ? t : "") &&
                                  a.el(
                                    "option",
                                    { value: t, selected: i.value[e.id] === t.toString() },
                                    t
                                  )
                                )
                              })
                            )
                          ),
                        ]
                      )),
                      this.element[n]
                    )
                  },
                  match: function (t, e) {
                    return !e || (t && t.toString() == e)
                  },
                  value: {},
                },
                comboFilter: {
                  element: {},
                  toHtml: function (i, n) {
                    var t,
                      o,
                      r = i.id.toString()
                    return (
                      !this.element[r] && n.events
                        ? ((t = i.header.filter(function (t) {
                            return void 0 !== t.filterConfig
                          })[0]),
                          (o =
                            t && t.filterConfig
                              ? new l.Combobox(null, Object.assign({}, t.filterConfig))
                              : new l.Combobox(null, {})).data.parse(
                            i.$uniqueData.map(function (t) {
                              return { value: t }
                            })
                          ),
                          n.events.on(c.DataEvents.load, function () {
                            o.data.parse(
                              i.$uniqueData.map(function (t) {
                                return { value: t }
                              })
                            )
                          }),
                          (this.element[r] = o).events.on("change", function (t) {
                            var e
                            t &&
                              ((e = void 0),
                              (
                                Array.isArray(t)
                                  ? t.find(function (t) {
                                      return o.data.getItem(t)
                                    })
                                  : o.data.getItem(t)
                              )
                                ? ((e = o.config.multiselection
                                    ? o.list.selection.getItem().map(function (t) {
                                        if (t && o.data.getItem(t.id)) return t.value
                                      })
                                    : o.list.selection.getItem().value),
                                  n.events.fire(d.GridEvents.filterChange, [e, r, "comboFilter"]))
                                : n.events.fire(d.GridEvents.filterChange, ["", r, "comboFilter"]))
                          }),
                          n.events.on(c.DataEvents.change, function (t, e) {
                            ;("add" !== e && "update" !== e && "remove" !== e) ||
                              (o.data.parse(
                                i.$uniqueData.map(function (t) {
                                  return { value: t }
                                })
                              ),
                              o.events.fire(l.ComboboxEvents.change, [o.list.selection.getItem()]))
                          }),
                          n.events.on(c.DataEvents.removeAll, function () {
                            o.data.parse(
                              i.$uniqueData.map(function (t) {
                                return { value: t }
                              })
                            ),
                              o.events.fire(l.ComboboxEvents.change, [o.list.selection.getItem()])
                          }),
                          o.popup.events.on("afterHide", function () {
                            ;(o.list.selection.getItem() &&
                              (!o.config.multiselection || o.list.selection.getItem().length)) ||
                              (o.clear(),
                              n.events.fire(d.GridEvents.filterChange, ["", r, "comboFilter"]))
                          }))
                        : (o = this.element[i.id] || new l.Combobox(null, {})),
                      a.inject(o.getRootView())
                    )
                  },
                  match: function (t, i, e, n) {
                    if ((void 0 === i && (i = ""), void 0 === n && (n = !1), Array.isArray(i))) {
                      for (var o = void 0, r = 0; r < i.length; r++)
                        if (
                          "break" ===
                          (function (e) {
                            if (
                              (o = n
                                ? !!t.split(", ").find(function (t) {
                                    return t === i[e]
                                  })
                                : i[e] === t)
                            )
                              return "break"
                          })(r)
                        )
                          break
                      return !i || !i.length || o
                    }
                    return "" === i || t === i
                  },
                  destroy: function () {
                    if (i.content && i.content.comboFilter.element) {
                      var t,
                        e = i.content.comboFilter.element
                      for (t in e) e[t].destructor(), delete e[t]
                    }
                  },
                  value: {},
                },
                sum: {
                  calculate: function (t, e) {
                    return e.reduce(function (t, e) {
                      return t + (parseFloat(e) || 0)
                    }, 0)
                  },
                  toHtml: function (t, e) {
                    e = f(t, e, this.calculate)
                    return t.format || "percent" === t.type
                      ? n.toFormat(e, t.type, t.format)
                      : e
                      ? e.toFixed(3)
                      : null
                  },
                },
                avg: {
                  calculate: function (t, e) {
                    return t.length
                      ? e.reduce(function (t, e) {
                          return t + e
                        }, 0) / t.length
                      : null
                  },
                  toHtml: function (t, e) {
                    e = f(t, e, this.calculate)
                    return t.format || "percent" === t.type
                      ? n.toFormat(e, t.type, t.format)
                      : e
                      ? e.toFixed(3)
                      : null
                  },
                },
                min: {
                  calculate: function (t) {
                    return t.length ? Math.min.apply(Math, t) : null
                  },
                  toHtml: function (t, e) {
                    e = f(t, e, this.calculate)
                    return t.format || "percent" === t.type
                      ? n.toFormat(e, t.type, t.format)
                      : e
                      ? e.toFixed(3)
                      : null
                  },
                },
                max: {
                  calculate: function (t) {
                    return t.length ? Math.max.apply(Math, t) : null
                  },
                  toHtml: function (t, e) {
                    e = f(t, e, this.calculate)
                    return t.format || "percent" === t.type
                      ? n.toFormat(e, t.type, t.format)
                      : e
                      ? e.toFixed(3)
                      : null
                  },
                },
                count: {
                  calculate: function (t, e) {
                    return e.reduce(function (t, e) {
                      return t + e
                    }, 0)
                  },
                  validate: function (i, t) {
                    return t.reduce(function (t, e) {
                      return void 0 !== e[i] && "" !== e[i] && (isNaN(e) ? t.push(1) : t.push(e)), t
                    }, [])
                  },
                  toHtml: function (t, e) {
                    return f(t, e, this.calculate, this.validate)
                  },
                },
              }
            }
          },
          function (t, e, i) {
            "use strict"
            var h =
              (this && this.__spreadArrays) ||
              function () {
                for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length
                for (var n = Array(t), o = 0, e = 0; e < i; e++)
                  for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s]
                return n
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var f = i(1),
              p = i(3),
              _ = i(2)
            e.startResize = function (a, l, t, e) {
              t.targetTouches && t.preventDefault()
              var c = (t.targetTouches ? t.targetTouches[0] : t).clientX,
                d = a.config.columns.filter(function (t) {
                  return !t.hidden
                }),
                u = 0
              function i(t) {
                var e,
                  i,
                  n = f.findIndex(d, function (t) {
                    return t.id === l
                  }),
                  o = (t.targetTouches ? t.targetTouches[0] : t).clientX,
                  r = o - a.getRootNode().getBoundingClientRect().left,
                  s = a.config.$totalHeight > a.config.height ? _.getScrollbarWidth() : 0
                ;(a.config.leftSplit === n + 1 && r >= a.config.width - s - 2) ||
                  ((u = u || d[n].$width),
                  (e = d[n].minWidth || 40),
                  (r = d[n].maxWidth),
                  (s = o - c),
                  (o = h(d)),
                  (s = u + s),
                  (r && r <= s) || s <= e ? (s <= e && (i = e), r <= s && (i = r)) : (i = s),
                  (o[n].$width = i),
                  (o[n].$fixed = !0),
                  a.events.fire(p.GridEvents.resize, [d[n], t]),
                  a.paint())
              }
              a.config.$resizing = l
              var n = function () {
                t.targetTouches
                  ? (document.removeEventListener("touchmove", i),
                    document.removeEventListener("touchend", n))
                  : (document.removeEventListener("mousemove", i),
                    document.removeEventListener("mouseup", n)),
                  e()
              }
              t.targetTouches
                ? (document.addEventListener("touchmove", i),
                  document.addEventListener("touchend", n))
                : (document.addEventListener("mousemove", i),
                  document.addEventListener("mouseup", n)),
                a.paint()
            }
          },
          function (t, e, i) {
            "use strict"
            var r =
              (this && this.__assign) ||
              function () {
                return (r =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var s = i(3),
              d = i(2),
              a = i(7)
            function l(t, e, i, n, o, r, s) {
              var a, l, c
              void 0 === o && (o = !1),
                void 0 === r && (r = !1),
                void 0 === s && (s = !1),
                e.config.$editable ||
                  !e.config.selection ||
                  d.locateNodeByClassName(t, "dhx_grid-header-cell") ||
                  (t && t.preventDefault(),
                  (a = e.selection.getCell()),
                  (t = e.config.columns.filter(function (t) {
                    return !t.hidden
                  })),
                  a &&
                    ("vertical" === i
                      ? o
                        ? ((l =
                            1 === n
                              ? e.data.getItem(e.data.getId(e.data.getLength() - 1))
                              : e.data.getItem(e.data.getId(0))),
                          e.selection.setCell(l.id, a.column.id, r, s),
                          e.scrollTo(l.id.toString(), a.column.id.toString()))
                        : 0 <= (c = e.data.getIndex(a.row.id.toString())) + n &&
                          c + n < e.data.getLength() &&
                          ((l = e.data.getItem(e.data.getId(c + n))),
                          e.selection.setCell(l.id, a.column.id, r, s),
                          e.scrollTo(l.id.toString(), a.column.id.toString()))
                      : o
                      ? ((l = 1 === n ? t[t.length - 1] : t[0]),
                        e.selection.setCell(a.row.id, l.id, r, s),
                        e.scrollTo(a.row.id.toString(), l.id.toString()))
                      : 0 <= (c = t.indexOf(a.column)) + n &&
                        c + n < t.length &&
                        (e.selection.setCell(a.row.id, t[c + n].id, r, s),
                        e.scrollTo(a.row.id.toString(), t[c + n].id.toString()))))
            }
            ;(e.selectionMove = l),
              (e.getKeysHandlers = function (o) {
                var t,
                  n =
                    "cell" === o.config.selection ||
                    "complex" === o.config.selection ||
                    !0 === o.config.selection,
                  e = {}
                if (o.getRootView()) {
                  var i =
                    null ===
                      (t =
                        null ===
                          (t = null === (t = o.getRootView()) || void 0 === t ? void 0 : t.refs) ||
                        void 0 === t
                          ? void 0
                          : t.grid_body) || void 0 === t
                      ? void 0
                      : t.el
                  if (!i) return
                  e = {
                    pageUp: function (t) {
                      t.preventDefault(), (i.scrollTop -= i.clientHeight)
                    },
                    pageDown: function (t) {
                      t.preventDefault(), (i.scrollTop += i.clientHeight)
                    },
                    home: function (t) {
                      t.preventDefault(), (i.scrollTop = 0)
                    },
                    end: function (t) {
                      t.preventDefault(), (i.scrollTop += i.scrollHeight)
                    },
                  }
                }
                return r(
                  {
                    enter: function (t) {
                      var e,
                        i = d.locateNodeByClassName(t, "dhx_grid-header-cell")
                      i &&
                        ((e = i.getAttribute("dhx_id")),
                        (i = t.target.getAttribute("dhx_resized")),
                        !e ||
                          ((t = o.getColumn(e)) &&
                            a.isSortable(o.config, t) &&
                            !i &&
                            o.events.fire(s.GridEvents.afterSort, [e]))),
                        n
                          ? (e = o.selection.getCell()) &&
                            ((!1 !== e.column.editable && o.config.editable) ||
                              e.column.editable) &&
                            (o.config.$editable
                              ? o.editEnd()
                              : "boolean" !== e.column.type
                              ? o.editCell(e.row.id, e.column.id, e.column.editorType)
                              : o.events.fire(s.GridEvents.afterEditEnd, [
                                  !e.row[e.column.id],
                                  e.row,
                                  e.column,
                                ]))
                          : o.config.$editable && o.editEnd()
                    },
                    space: function (t) {
                      var e,
                        i = o.selection.getCell()
                      n &&
                        (null !== (e = null == i ? void 0 : i.column.editable) && void 0 !== e
                          ? e
                          : o.config.editable) &&
                        !o.config.$editable &&
                        i &&
                        "boolean" === i.column.type &&
                        (t.preventDefault(),
                        o.events.fire(s.GridEvents.afterEditEnd, [
                          !i.row[i.column.id],
                          i.row,
                          i.column,
                        ]))
                    },
                    escape: function () {
                      o.config.$editable && o.editEnd(!0)
                    },
                    tab: function (t) {
                      var e, i, n
                      o.config.selection &&
                        !d.locateNodeByClassName(t, "dhx_grid-header-cell") &&
                        (o.config.$editable && o.editEnd(),
                        (n = o.selection.getCell()),
                        (e = o.config.columns.filter(function (t) {
                          return !t.hidden
                        })),
                        n &&
                          (0 <= (i = e.indexOf(n.column) + 1) && i < e.length
                            ? (t && t.preventDefault(),
                              o.selection.setCell(n.row.id, e[i].id),
                              o.scrollTo(n.row.id.toString(), e[i].id.toString()))
                            : 0 <= i &&
                              (n = o.data.getIndex(n.row.id.toString()) + 1) < o.data.getLength() &&
                              (t && t.preventDefault(),
                              o.selection.setCell(o.data.getId(n), e[0].id),
                              o.scrollTo(o.data.getId(n).toString(), e[0].id.toString()))))
                    },
                    "shift+tab": function (t) {
                      var e, i, n
                      o.config.selection &&
                        !d.locateNodeByClassName(t, "dhx_grid-header-cell") &&
                        (o.config.$editable && o.editEnd(),
                        (n = o.selection.getCell()),
                        (e = o.config.columns.filter(function (t) {
                          return !t.hidden
                        })),
                        n &&
                          (0 <= (i = e.indexOf(n.column) - 1) && i < e.length
                            ? (t && t.preventDefault(),
                              o.selection.setCell(n.row.id, e[i].id),
                              o.scrollTo(n.row.id.toString(), e[i].id.toString()))
                            : i < o.data.getLength() &&
                              0 <= (n = o.data.getIndex(n.row.id.toString()) - 1) &&
                              (t && t.preventDefault(),
                              o.selection.setCell(o.data.getId(n), e[e.length - 1].id),
                              o.scrollTo(
                                o.data.getId(n).toString(),
                                e[e.length - 1].id.toString()
                              ))))
                    },
                    arrowUp: function (t) {
                      l(t, o, "vertical", -1)
                    },
                    "ctrl+arrowUp": function (t) {
                      l(t, o, "vertical", -1, !0)
                    },
                    "shift+arrowUp": function (t) {
                      o.config.multiselection && l(t, o, "vertical", -1, !1, !1, !0)
                    },
                    "ctrl+shift+arrowUp": function (t) {
                      o.config.multiselection && l(t, o, "vertical", -1, !0, !1, !0)
                    },
                    arrowDown: function (t) {
                      l(t, o, "vertical", 1)
                    },
                    "ctrl+arrowDown": function (t) {
                      l(t, o, "vertical", 1, !0)
                    },
                    "shift+arrowDown": function (t) {
                      o.config.multiselection && l(t, o, "vertical", 1, !1, !1, !0)
                    },
                    "ctrl+shift+arrowDown": function (t) {
                      o.config.multiselection && l(t, o, "vertical", 1, !0, !1, !0)
                    },
                    arrowRight: function (t) {
                      l(t, o, "horizontal", 1)
                    },
                    "ctrl+arrowRight": function (t) {
                      l(t, o, "horizontal", 1, !0)
                    },
                    "shift+arrowRight": function (t) {
                      o.config.multiselection && l(t, o, "horizontal", 1, !1, !1, !0)
                    },
                    "ctrl+shift+arrowRight": function (t) {
                      o.config.multiselection && l(t, o, "horizontal", 1, !0, !1, !0)
                    },
                    arrowLeft: function (t) {
                      l(t, o, "horizontal", -1)
                    },
                    "ctrl+arrowLeft": function (t) {
                      l(t, o, "horizontal", -1, !0)
                    },
                    "shift+arrowLeft": function (t) {
                      o.config.multiselection && l(t, o, "horizontal", -1, !1, !1, !0)
                    },
                    "ctrl+shift+arrowLeft": function (t) {
                      o.config.multiselection && l(t, o, "horizontal", -1, !0, !1, !0)
                    },
                  },
                  e
                )
              })
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              r =
                (this && this.__assign) ||
                function () {
                  return (r =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var s,
              a = i(41),
              l = i(3),
              c = i(4),
              d = i(2),
              u = i(12),
              h = i(42),
              f = i(0),
              p = i(15),
              o =
                ((s = a.Grid),
                o(_, s),
                (_.prototype._createView = function () {
                  var i = this
                  return f.create(
                    {
                      render: function (t, e) {
                        return h.proRender(t, e, i._htmlEvents, i.selection, i._uid)
                      },
                    },
                    this
                  )
                }),
                (_.prototype._setEventHandlers = function () {
                  var r = this
                  s.prototype._setEventHandlers.call(this),
                    this.events.on(l.GridEvents.headerCellMouseDown, function (t, e) {
                      var i = d.locateNodeByClassName(e, "dhx_header-row"),
                        i = i && i.getAttribute("aria-rowindex")
                      ;(null !== (i = t.header[Number(i) - 1]) && void 0 !== i && i.content) ||
                        (e.targetTouches
                          ? (r._touch.timer = setTimeout(function () {
                              r._dragStartColumn(e, t)
                            }, r._touch.duration))
                          : r._dragStartColumn(e, t))
                    }),
                    this._events.on(l.GridSystemEvents.headerCellTouchMove, function (t, e) {
                      r._touch.start && e.preventDefault(), r._clearTouchTimer()
                    }),
                    this._events.on(l.GridSystemEvents.headerCellTouchEnd, function () {
                      ;(r._touch.start = !1), r._clearTouchTimer()
                    }),
                    this.events.on(l.GridEvents.resize, function () {
                      r._parseColumns(), r._checkFilters()
                    }),
                    this.events.on(l.GridEvents.afterResizeEnd, function () {
                      r.config.autoHeight &&
                        (r.config.data = r.data.map(function (t) {
                          var e = u.getMaxRowHeight(t, r.config.columns)
                          return (
                            (t.$height = u.getCalculatedRowHeight(e, {
                              rowHeight: r.config.rowHeight,
                              padding: 8,
                            })),
                            t
                          )
                        }))
                    }),
                    this.events.on(l.GridEvents.afterRowResize, function (t, e, i) {
                      var n = r.data.getItem(t.id),
                        o = n.id,
                        t = n.height,
                        n = n.$height
                      t && t !== n && r.data.update(o, { height: i }),
                        r.data.update(o, { $height: i }, !0),
                        (r.config.data = r.data.map(function (t) {
                          return t
                        })),
                        r.paint()
                    }),
                    this.events.on(l.GridEvents.scroll, function () {
                      r._lazyLoad()
                    })
                }),
                (_.prototype._prepareData = function (t) {
                  var e,
                    i = this
                  return (
                    this._adjustColumns(),
                    (Array.isArray(t) || c.isTreeCollection(t)
                      ? t
                      : 0 !== (e = t.getInitialData() || []).length
                      ? e
                      : t.getRawData(0, t.getLength())
                    ).map(function (t) {
                      var e
                      return (
                        i.config.autoHeight && void 0 === t.height
                          ? ((e = u.getMaxRowHeight(t, i.config.columns)),
                            (t.$height =
                              u.getCalculatedRowHeight(e, {
                                rowHeight: i.config.rowHeight,
                                padding: 8,
                              }) || i.config.rowHeight))
                          : (t.$height = t.height || i.config.rowHeight),
                        t
                      )
                    })
                  )
                }),
                (_.prototype._prepareDataFromTo = function (t, e, i) {
                  var n = this
                  return t.mapRange(e, i, function (t) {
                    var e = u.getMaxRowHeight(t, n.config.columns)
                    return (
                      (t.$height =
                        u.getCalculatedRowHeight(e, {
                          rowHeight: n.config.rowHeight,
                          padding: 8,
                        }) || n.config.rowHeight),
                      t
                    )
                  })
                }),
                (_.prototype._lazyLoad = function () {
                  var t,
                    e,
                    i,
                    n,
                    o = this,
                    r = this.data.dataProxy
                  r &&
                    r.config &&
                    ((t = this.data.getRawData(0, -1, null, 2)),
                    (e = h.getRenderConfig(this, t, {
                      width: this.config.width,
                      height: this.config.height,
                    })),
                    (i = this.data.getIndex(
                      null === (t = e.currentRows[0]) || void 0 === t ? void 0 : t.id.toString()
                    )),
                    (n = this.data.getIndex(
                      null === (e = e.currentRows[e.currentRows.length - 1]) || void 0 === e
                        ? void 0
                        : e.id.toString()
                    )),
                    !this.data.isDataLoaded(i, n) &&
                      this.data.events.fire(c.DataEvents.beforeLazyLoad, []) &&
                      (r.updateUrl(null, { from: i, limit: r.config.limit }),
                      this.data.load(r).then(function () {
                        o.config.autoHeight && o._prepareDataFromTo(o.data, i, n)
                      })))
                }),
                (_.prototype._getColumnGhost = function (t) {
                  var e = this._container || d.toNode(this._uid),
                    i = e.querySelector(".dhx_header-row"),
                    n = i.querySelector('.dhx_grid-header-cell[dhx_id="' + t.id + '"]'),
                    n = Array.from(i.childNodes).indexOf(n) + 1,
                    t = e.querySelectorAll(
                      '.dhx_grid-header-cell[dhx_id="' + t.id + '"]:not(.dhx_span-cell)'
                    ),
                    n = e.querySelectorAll(".dhx_grid_data .dhx_grid-cell:nth-child(" + n + ")"),
                    o = document.createElement("div")
                  return (
                    t.forEach(function (t) {
                      return o.appendChild(t.cloneNode(!0))
                    }),
                    n.forEach(function (t) {
                      return o.appendChild(t.cloneNode(!0))
                    }),
                    o
                  )
                }),
                (_.prototype._dragStartColumn = function (t, e) {
                  function i(t) {
                    return t.classList.contains("dhx_grid-custom-content-cell")
                  }
                  var n = t.target
                  i(n.parentElement) ||
                    i(n.parentElement.parentElement) ||
                    !(
                      e.draggable ||
                      ("column" === this.config.dragItem && !1 !== e.draggable) ||
                      ("both" === this.config.dragItem && !1 !== e.draggable)
                    ) ||
                    d.locateNodeByClassName(t, "dhx_resizer_grip_wrap") ||
                    (t.targetTouches && (this._touch.start = !0),
                    c.dragManager.onMouseDown(t, [e.id], [this._getColumnGhost(e)]))
                }),
                _)
            function _(t, e) {
              var i = s.call(this, t, r({ autoHeight: !1 }, e)) || this
              return (
                (i.scrollView = new p.ScrollView(
                  function () {
                    return i.getRootView()
                  },
                  {
                    scrollHandler: function (t) {
                      return i.events.fire(l.GridEvents.scroll, [
                        { y: t.target.scrollTop, x: t.target.scrollLeft },
                      ])
                    },
                  }
                )),
                i
              )
            }
            e.ProGrid = o
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n =
              ((o.prototype.setItem = function (t, e) {
                this._store[t] = e
              }),
              (o.prototype.getItem = function (t) {
                return this._store[t] || null
              }),
              o)
            function o() {
              this._store = {}
            }
            var r = (window.dhxHelpers = window.dhxHelpers || {})
            ;(r.collectionStore = r.collectionStore || new n()),
              (e.collectionStore = r.collectionStore)
          },
          function (t, l, c) {
            "use strict"
            ;(function (t) {
              var n,
                e =
                  (this && this.__extends) ||
                  ((n = function (t, e) {
                    return (n =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (t, e) {
                          t.__proto__ = e
                        }) ||
                      function (t, e) {
                        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                      })(t, e)
                  }),
                  function (t, e) {
                    function i() {
                      this.constructor = t
                    }
                    n(t, e),
                      (t.prototype =
                        null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                  })
              Object.defineProperty(l, "__esModule", { value: !0 })
              var o,
                i = c(14),
                r = c(1),
                s = c(29),
                e =
                  ((o = i.DataProxy),
                  e(a, o),
                  (a.prototype.load = function () {
                    var e = this
                    return new t(function (t) {
                      e._timeout
                        ? (clearTimeout(e._timeout),
                          (e._timeout = setTimeout(function () {
                            s.ajax.get(e.url, { responseType: "text" }).then(t), (e._cooling = !0)
                          }, e.config.delay)),
                          e._cooling && (t(null), (e._cooling = !1)))
                        : (s.ajax.get(e.url, { responseType: "text" }).then(t),
                          (e._cooling = !0),
                          (e._timeout = setTimeout(function () {})))
                    })
                  }),
                  a)
              function a(t, e) {
                var i = o.call(this, t) || this
                return (
                  (i.config = r.extend({ from: 0, limit: 50, delay: 50, prepare: 0 }, e)),
                  i.updateUrl(t, { from: i.config.from, limit: i.config.limit }),
                  i
                )
              }
              l.LazyDataProxy = e
            }.call(this, c(9)))
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var o = i(5),
              n = i(25),
              r = i(10),
              i =
                ((s.prototype.getId = function () {
                  return this._selected
                }),
                (s.prototype.getItem = function () {
                  return this._selected ? this._data.getItem(this._selected) : null
                }),
                (s.prototype.remove = function (t) {
                  return (
                    !(t = t || this._selected) ||
                    (!!this.events.fire(n.SelectionEvents.beforeUnSelect, [t]) &&
                      (this._data.update(t, { $selected: !1 }, !0),
                      (this._selected = null),
                      this.events.fire(n.SelectionEvents.afterUnSelect, [t]),
                      !0))
                  )
                }),
                (s.prototype.add = function (t) {
                  this._selected !== t &&
                    !this.config.disabled &&
                    this._data.exists(t) &&
                    (this.remove(), this._addSingle(t))
                }),
                (s.prototype.enable = function () {
                  this.config.disabled = !1
                }),
                (s.prototype.disable = function () {
                  this.remove(), (this.config.disabled = !0)
                }),
                (s.prototype._addSingle = function (t) {
                  this.events.fire(n.SelectionEvents.beforeSelect, [t]) &&
                    ((this._selected = t),
                    this._data.update(t, { $selected: !0 }, !0),
                    this.events.fire(n.SelectionEvents.afterSelect, [t]))
                }),
                s)
            function s(t, e, i) {
              var n = this
              ;(this.events = i || new o.EventSystem(this)),
                (this._data = e),
                (this.config = t),
                this._data.events.on(r.DataEvents.removeAll, function () {
                  n._selected = null
                }),
                this._data.events.on(r.DataEvents.change, function () {
                  var t
                  !n._selected ||
                    ((t = n._data.getNearId(n._selected)) !== n._selected &&
                      ((n._selected = null), t && n.add(t)))
                })
            }
            e.Selection = i
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              r =
                (this && this.__spreadArrays) ||
                function () {
                  for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length
                  for (var n = Array(t), o = 0, e = 0; e < i; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s]
                  return n
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var s,
              a = i(1),
              l = i(5),
              c = i(6),
              d = i(4),
              u = i(22),
              h = i(124),
              f = i(59),
              p = i(13),
              _ = i(17),
              g = i(138),
              v = i(139),
              m = i(60),
              y = i(140),
              b = i(141),
              x = i(142),
              w = i(24),
              C = i(0),
              o =
                ((s = c.View),
                o(E, s),
                (E.prototype.destructor = function () {
                  this.toolbar.destructor(),
                    this._readStack.stop(),
                    this.uploader.unlinkDropArea(),
                    this.uploader.abort(),
                    this.unmount()
                }),
                (E.prototype.getRootView = function () {
                  return this._layout.getRootView()
                }),
                (E.prototype.paint = function () {
                  var t = this._canDrop || !this.data.getLength()
                  ;(this._activeView = t
                    ? this._emptyField
                    : this.config.mode === _.VaultMode.grid ||
                      (this.toolbar && this.toolbar.getState().mode === _.VaultMode.grid)
                    ? this.grid
                    : this.list),
                    this._layout.getCell("vault").attach(this._activeView)
                }),
                (E.prototype._initUI = function (t) {
                  var e = (this._layout = new u.Layout(t, {
                    css: "dhx_vault",
                    rows: [
                      { id: "toolbar", css: "dhx_vault--toolbar", height: "content" },
                      { id: "vault", css: "dhx_vault--container" },
                    ],
                    on: this._getDragEvents(),
                  }))
                  this._initToolbar(),
                    e.getCell("toolbar").attach(this.toolbar),
                    this._initEmpty(),
                    this._initList(),
                    this._initGrid(t),
                    this.config.toolbar || e.getCell("toolbar").hide(),
                    this.paint()
                }),
                (E.prototype._initList = function () {
                  var n = this,
                    t = "ontouchstart" in document.documentElement
                  ;(this.list = new w.List(null, {
                    data: this.data,
                    dragMode: "both",
                    multiselection: t || "ctrlClick",
                    template: v.listTemplate,
                    eventHandlers: v.getContainersEvents(this.data),
                    keyNavigation: !0,
                    editable: this.config.editable,
                    itemHeight: 49,
                    hotkeys: {
                      delete: function () {
                        var t =
                          null === (t = n.list.selection.getItem()) || void 0 === t
                            ? void 0
                            : t.map(function (t) {
                                return t.id
                              })
                        t.length && n.data.remove(t)
                      },
                    },
                  })),
                    this.list.events.on("afterEditEnd", function (t, e) {
                      var i = n.list.data.getItem(e)
                      n.list.data.update(e, { name: t + "." + i.extension })
                    })
                }),
                (E.prototype._initGrid = function (t) {
                  var e = this,
                    i = "ontouchstart" in document.documentElement
                  ;(this.grid = new x.DataView(null, {
                    gap: 8,
                    itemsInRow: 4,
                    dragMode: "both",
                    multiselection: i || "ctrlClick",
                    data: this.data,
                    template: v.gridTemplate,
                    eventHandlers: v.getContainersEvents(this.data),
                    keyNavigation: !0,
                    editable: this.config.editable,
                    hotkeys: {
                      delete: function () {
                        var t =
                          null === (t = e.list.selection.getItem()) || void 0 === t
                            ? void 0
                            : t.map(function (t) {
                                return t.id
                              })
                        t.length && e.data.remove(t)
                      },
                    },
                  })),
                    (this.grid.selection = this.list.selection),
                    t &&
                      ("string" == typeof t && (t = document.getElementById(t)),
                      (this.grid.config.itemsInRow = Math.floor(t.offsetWidth / 100)))
                }),
                (E.prototype._initToolbar = function () {
                  ;(this.toolbar = new h.Toolbar(null, { css: "vault-toolbar" })),
                    this.toolbar.data.parse([
                      {
                        id: "add",
                        tooltip: p.default.add,
                        type: "navItem",
                        css: "dhx_toolbar-button--circle dhx_toolbar-button--icon",
                        icon: "dxi dxi-plus",
                      },
                      { id: "mode-separator", type: "separator" },
                      {
                        id: "list",
                        tooltip: p.default.list,
                        type: "navItem",
                        css: "dhx_toolbar-button--circle dhx_toolbar-button--icon",
                        icon: "dxi dxi-view-sequential",
                        active: this.config.mode === _.VaultMode.list,
                        group: "mode",
                      },
                      {
                        id: "grid",
                        tooltip: p.default.grid,
                        type: "navItem",
                        css: "dhx_toolbar-button--circle dhx_toolbar-button--icon",
                        icon: "dxi dxi-view-grid",
                        active: this.config.mode === _.VaultMode.grid,
                        group: "mode",
                      },
                      { id: "upload-separator", type: "separator" },
                      {
                        id: "upload",
                        tooltip: p.default.upload,
                        type: "navItem",
                        css: "dhx_toolbar-button--circle dhx_toolbar-button--icon",
                        icon: "dxi dxi-vault",
                      },
                      { id: "spacer", type: "spacer" },
                      {
                        id: "remove-all",
                        tooltip: p.default.clearAll,
                        type: "navItem",
                        css: "dhx_toolbar-button--circle dhx_toolbar-button--icon",
                        icon: "dxi dxi-delete-forever",
                      },
                    ]),
                    this.config.modeControls ||
                      this.toolbar.hide(["mode-separator", "list", "grid", "upload-separator"]),
                    this._hideAdditionalButtons()
                }),
                (E.prototype._initEmpty = function () {
                  var t = this
                  return (this._emptyField = c.toViewLike(
                    C.create({
                      render: function () {
                        return C.el(".dhx-dropable-area.drop-files-here", [
                          C.el(".dhx-big-icon-block", [C.el(".dxi.dxi-vault")]),
                          !t._canDrop && C.el(".drop-area-bold-text", p.default.dragAndDrop),
                          !t._canDrop && C.el(".drop-area-bold-text", p.default.filesOrFoldersHere),
                          !t._canDrop && C.el(".drop-area-light-text", p.default.or),
                          !t._canDrop &&
                            C.el(
                              "button.dhx_button.dhx_button--view_flat.dhx_btn--small.dhx_button--color_primary.dhx_button--size_small",
                              {
                                onclick: function () {
                                  return t.uploader.selectFile()
                                },
                              },
                              p.default.browse
                            ),
                        ])
                      },
                    })
                  ))
                }),
                (E.prototype._changeUI = function (t) {
                  ;(this.config.mode = t),
                    (this._activeView = t === _.VaultMode.grid ? this.grid : this.list),
                    this.data.getLength() && this.paint()
                }),
                (E.prototype._initEvents = function () {
                  var i = this
                  this.data.events.on(d.DataEvents.change, function () {
                    i.data.getLength() ? i._showAdditionalButtons() : i._hideAdditionalButtons(),
                      i.config.downloadURL &&
                        i.data.forEach(function (t) {
                          t.downloadURL || (t.downloadURL = i.config.downloadURL)
                        }),
                      i.paint()
                  }),
                    this.events.on(_.UploaderEvents.uploadBegin, function () {
                      i.config.toolbar && i._layout.getCell("toolbar").attach(i._progressBar)
                    }),
                    this.events.on(_.UploaderEvents.uploadComplete, function () {
                      i.config.toolbar && i._layout.getCell("toolbar").attach(i.toolbar)
                    }),
                    this.toolbar.events.on(f.NavigationBarEvents.click, function (t) {
                      switch (t) {
                        case "add":
                          i.uploader.selectFile()
                          break
                        case "remove-all":
                          var e
                          i.data.getLength() &&
                            ((e = i._activeView.selection.getItem()) && 0 < e.length
                              ? e.forEach(function (t) {
                                  m.removeItem(i.data, t.id)
                                })
                              : i.data.removeAll())
                          break
                        case "list":
                        case "grid":
                          i._changeUI(t)
                          break
                        case "upload":
                          i.uploader.send()
                      }
                    }),
                    this.events.on(_.ProgressBarEvents.cancel, function () {
                      i.uploader.abort(), i.paint()
                    })
                }),
                (E.prototype._getDragEvents = function () {
                  var o = this,
                    r = { left: null, top: null, width: null, height: null }
                  return {
                    dragleave: function (t) {
                      o._canDrop &&
                        (t.pageX > r.left + r.width - 1 ||
                          t.pageX < r.left ||
                          t.pageY > r.top + r.height - 1 ||
                          t.pageY < r.top) &&
                        ((o._canDrop = !1),
                        o.config.toolbar && o._layout.getCell("toolbar").show(),
                        (o._layout.config.css = "dhx_vault"),
                        o.paint())
                    },
                    dragenter: function (t) {
                      if ((t.preventDefault(), !o.uploader.isActive && !o._canDrop)) {
                        for (var e = 0, i = t.dataTransfer.types; e < i.length; e++) {
                          var n = i[e]
                          if ("Files" !== n && "application/x-moz-file" !== n)
                            return void (o._canDrop = !1)
                        }
                        o._canDrop = !0
                        t = o.getRootView().node.el.getBoundingClientRect()
                        ;(r.left = t.left + window.pageXOffset),
                          (r.top = t.top + window.pageYOffset),
                          (r.width = t.width),
                          (r.height = t.height),
                          (o._canDrop = !0),
                          o.config.toolbar && o._layout.getCell("toolbar").hide(),
                          (o._layout.config.css =
                            "dhx_vault dhx-dragin " + (o._canDrop ? " drop-here" : "")),
                          o.paint()
                      }
                    },
                    dragover: function (t) {
                      t.preventDefault()
                    },
                    drop: function (t) {
                      t.preventDefault(),
                        o._canDrop &&
                          ((t = t.dataTransfer),
                          o.uploader.parseFiles(t),
                          (o._canDrop = !1),
                          o.config.toolbar && o._layout.getCell("toolbar").show(),
                          (o._layout.config.css = "dhx_vault"),
                          o.paint())
                    },
                  }
                }),
                (E.prototype._hideAdditionalButtons = function () {
                  var e = this,
                    t = ["upload", this.config.modeControls ? "upload-separator" : ""]
                  r(["mode-separator", "list", "grid"], t, ["remove-all"]).forEach(function (t) {
                    e.toolbar.data.getItem(t) &&
                      !e.toolbar.data.getItem(t).hidden &&
                      e.toolbar.hide(t)
                  })
                }),
                (E.prototype._showAdditionalButtons = function () {
                  var e = this,
                    t = this.config.modeControls ? ["mode-separator", "list", "grid"] : [],
                    i = this.uploader.config.autosend
                      ? []
                      : ["upload", this.config.modeControls ? "upload-separator" : ""],
                    i = r(t, i, ["remove-all"])
                  this.toolbar.data.update("remove-all", {
                    tooltip:
                      this._activeView.selection && this._activeView.selection.getItem()
                        ? p.default.clearAllSelected
                        : p.default.clearAll,
                  }),
                    i.forEach(function (t) {
                      e.toolbar.data.getItem(t) &&
                        e.toolbar.data.getItem(t).hidden &&
                        e.toolbar.show(t)
                    })
                }),
                E)
            function E(t, e) {
              void 0 === e && (e = {})
              var n =
                s.call(
                  this,
                  null,
                  a.extend(
                    {
                      mode: _.VaultMode.list,
                      modeControls: !0,
                      toolbar: !0,
                      updateFromResponse: !0,
                      scaleFactor: 4,
                      customScroll: !0,
                      uploader: {},
                      progressBar: {},
                      disablePreview: !1,
                      editable: !0,
                    },
                    e
                  )
                ) || this
              return (
                n.config.toolbar || (n.config.uploader.autosend = !0),
                e.data
                  ? ((n.data = e.data), (n.events = e.data.events), (n.events.context = n))
                  : ((n.events = new l.EventSystem(n)),
                    (n.data = new d.DataCollection({}, n.events))),
                (n.data.config.init = function (t) {
                  var e
                  return (
                    (t.status = t.status || _.FileStatus.uploaded),
                    t.file
                      ? ((t.size = t.file.size),
                        (t.name = t.file.name),
                        (t.value =
                          null === (e = t.file.name) || void 0 === e
                            ? void 0
                            : e.split(".").slice(0, -1).join(".")),
                        (t.extension =
                          null === (e = t.file.name) || void 0 === e ? void 0 : e.split(".").pop()))
                      : ((t.size = t.size || 0),
                        (t.name = t.name || ""),
                        (t.value =
                          (null === (e = t.name) || void 0 === e
                            ? void 0
                            : e.split(".").slice(0, -1).join(".")) || ""),
                        (t.extension =
                          null === (e = t.name) || void 0 === e ? void 0 : e.split(".").pop())),
                    (t.preview = !n.config.disablePreview),
                    t.file &&
                      m.isImage(t) &&
                      n._readStack.add(t, n.uploader.config.autosend || n.config.disablePreview),
                    t
                  )
                }),
                (n._readStack = new b.ReadStackPreview(n.data)),
                (n.uploader = new g.Uploader(n.config.uploader, n.data, n.events)),
                (n._progressBar = new y.ProgressBar(n.events, n.config.progressBar)),
                n.events.on(_.UploaderEvents.uploadProgress, function (t, e, i) {
                  return n._progressBar.setState(t, { current: e, total: i })
                }),
                n._initUI(t),
                n._initEvents(),
                n
              )
            }
            e.Vault = o
          },
          function (t, i, e) {
            "use strict"
            function n(t) {
              for (var e in t) i.hasOwnProperty(e) || (i[e] = t[e])
            }
            Object.defineProperty(i, "__esModule", { value: !0 }), n(e(58)), n(e(137))
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              d =
                (this && this.__assign) ||
                function () {
                  return (d =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r = i(1),
              u = i(0),
              a = i(5),
              h = i(2),
              l = i(18),
              s = i(6),
              c = i(4),
              f = i(26)
            var p,
              o =
                ((p = s.View),
                o(_, p),
                (_.prototype.paint = function () {
                  p.prototype.paint.call(this),
                    this._isContextMenu && !this._vpopups && this._init(),
                    this._vpopups && this._vpopups.redraw()
                }),
                (_.prototype.disable = function (t) {
                  var e = this
                  void 0 !== t
                    ? this._setProp(t, "disabled", !0)
                    : this.data.forEach(function (t) {
                        t = t.id
                        return e._setProp(t, "disabled", !0)
                      })
                }),
                (_.prototype.enable = function (t) {
                  var e = this
                  void 0 !== t
                    ? this._setProp(t, "disabled", !1)
                    : this.data.forEach(function (t) {
                        t = t.id
                        return e._setProp(t, "disabled", !1)
                      })
                }),
                (_.prototype.isDisabled = function (t) {
                  t = this.data.getItem(t)
                  if (t) return t.disabled || !1
                }),
                (_.prototype.show = function (t) {
                  var e = this
                  void 0 !== t
                    ? this._setProp(t, "hidden", !1)
                    : this.data.forEach(function (t) {
                        t = t.id
                        return e._setProp(t, "hidden", !1)
                      })
                }),
                (_.prototype.hide = function (t) {
                  var e = this
                  void 0 !== t
                    ? this._setProp(t, "hidden", !0)
                    : this.data.forEach(function (t) {
                        t = t.id
                        return e._setProp(t, "hidden", !0)
                      })
                }),
                (_.prototype.destructor = function () {
                  this.events.clear(),
                    this._keyManager && this._keyManager.destructor(),
                    this._vpopups && this._vpopups.node && this._vpopups.unmount(),
                    this.unmount()
                }),
                (_.prototype.select = function (t, e) {
                  var i = this
                  if ((void 0 === e && (e = !0), !t))
                    throw new Error(
                      "Function argument cannot be empty, for more info check documentation https://docs.dhtmlx.com"
                    )
                  e && this.unselect(),
                    this.data.update(t, { active: !0 }),
                    this.data.eachParent(t, function (t) {
                      i.data.update(t.id, { active: !0 })
                    })
                }),
                (_.prototype.unselect = function (t) {
                  var e = this
                  t
                    ? (this.data.update(t, { active: !1 }),
                      this.data.eachChild(t, function (t) {
                        e.data.update(t.id, { active: !1 })
                      }))
                    : this.data.forEach(function (t) {
                        e.data.update(t.id, { active: !1 })
                      })
                }),
                (_.prototype.isSelected = function (t) {
                  if (t && this.data.getItem(t)) return !!this.data.getItem(t).active
                }),
                (_.prototype.getSelected = function () {
                  var e = []
                  return (
                    this.data.forEach(function (t) {
                      t.active && e.push(t.id)
                    }),
                    e
                  )
                }),
                (_.prototype._customHandlers = function () {
                  return {}
                }),
                (_.prototype._close = function (t) {
                  var e = this
                  this._popupActive &&
                    this.events.fire(f.NavigationBarEvents.beforeHide, [this._activeMenu, t]) &&
                    (this._activeParents &&
                      this._activeParents.forEach(function (t) {
                        return e.data.exists(t) && e.data.update(t, { $activeParent: !1 })
                      }),
                    "click" === this.config.navigationType && (this._isActive = !1),
                    clearTimeout(this._currentTimeout),
                    (this._popupActive = !1),
                    (this._activeMenu = null),
                    this._vpopups.node && this._vpopups.unmount(),
                    (this._vpopups = null),
                    this.events.fire(f.NavigationBarEvents.afterHide, [t]),
                    this.paint())
                }),
                (_.prototype._init = function () {
                  var t = this
                  ;(this._vpopups = u.create({
                    render: function () {
                      return u.el(
                        "div",
                        {
                          dhx_widget_id: t._uid,
                          class:
                            (t._isContextMenu ? " dhx_context-menu" : "") +
                            " " +
                            (t.config.css
                              ? t.config.css
                                  .split(" ")
                                  .map(function (t) {
                                    return t + "--context-menu"
                                  })
                                  .join(" ")
                              : ""),
                          onmousemove: t._handlers.onmousemove,
                          onmouseleave: t._handlers.onmouseleave,
                          onclick: t._handlers.onclick,
                          onmousedown: t._handlers.onmousedown,
                        },
                        t._drawPopups()
                      )
                    },
                  })),
                    this._vpopups.mount(document.body)
                }),
                (_.prototype._initHandlers = function () {
                  var a = this
                  ;(this._isActive = "click" !== this.config.navigationType),
                    (this._handlers = d(
                      {
                        onmousemove: function (t) {
                          var e, i
                          !a._isActive ||
                            ((i = h.locateNode(t)) &&
                              ((e = i.getAttribute("dhx_id")),
                              a._activeMenu !== e &&
                                (a.data.haveItems(e) &&
                                  (a._vpopups || a._init(),
                                  (i = h.getRealPosition(i)),
                                  a.data.update(e, { $position: i }, !1)),
                                a._activeItemChange(e, t))))
                        },
                        onmouseleave: function (t) {
                          var e
                          "click" !== a.config.navigationType &&
                            (a._popupActive &&
                              ((e = h.locateNode(t, "dhx_id", "relatedTarget"))
                                ? ((e = e.getAttribute("dhx_id")), a.data.getItem(e) || a._close(t))
                                : a._close(t)),
                            a._activeItemChange(null, t))
                        },
                        onclick: function (t) {
                          var e = h.locateNode(t)
                          if (e) {
                            var i = e.getAttribute("dhx_id")
                            if (!a.isDisabled(i)) {
                              var n = a.data.getItem(i)
                              if (!n.multiClick)
                                if (a.data.haveItems(i))
                                  a._vpopups || a._init(),
                                    i !== a._currentRoot &&
                                      (a._isActive || (a._isActive = !0),
                                      a._setRoot(i),
                                      (e = h.getRealPosition(e)),
                                      a.data.update(i, { $position: e }, !1),
                                      a._activeItemChange(i, t),
                                      a.events.fire(f.NavigationBarEvents.click, [i, t]))
                                else
                                  switch (n.type) {
                                    case "input":
                                    case "title":
                                      break
                                    case "menuItem":
                                    case "selectButton":
                                      a._onMenuItemClick(i, t)
                                      break
                                    case "imageButton":
                                    case "button":
                                    case "customButton":
                                    case "customHTML":
                                    case "navItem":
                                      n.twoState && a.data.update(n.id, { active: !n.active }),
                                        a.events.fire(f.NavigationBarEvents.click, [i, t]),
                                        a._close(t)
                                      break
                                    default:
                                      a._close(t)
                                  }
                            }
                          }
                        },
                        onmousedown: function (t) {
                          var e,
                            i,
                            n,
                            o,
                            r,
                            s = h.locateNode(t)
                          s &&
                            ((e = s.getAttribute("dhx_id")),
                            a.data.getItem(e).multiClick &&
                              ((i = 365),
                              (r = function () {
                                clearTimeout(n), document.removeEventListener("mouseup", r)
                              }),
                              (o = function () {
                                a.events.fire(f.NavigationBarEvents.click, [e, t]),
                                  50 < i && (i -= 55),
                                  (n = setTimeout(o, i))
                              })(),
                              document.addEventListener("mouseup", r)))
                        },
                      },
                      this._customHandlers()
                    ))
                }),
                (_.prototype._initEvents = function () {
                  var n = this,
                    t = null
                  this.data.events.on(f.DataEvents.change, function () {
                    n.paint(),
                      t && clearTimeout(t),
                      (t = setTimeout(function () {
                        var i = {}
                        n.data.eachChild(
                          n.data.getRoot(),
                          function (t) {
                            var e
                            t.group &&
                              ((t.twoState = !0),
                              (e = i)[(t = t).group]
                                ? (t.active && (e[t.group].active = t.id),
                                  e[t.group].elements.push(t.id))
                                : (e[t.group] = {
                                    active: t.active ? t.id : null,
                                    elements: [t.id],
                                  }))
                          },
                          !0
                        ),
                          (n._groups = i),
                          n._resetHotkeys(),
                          (t = null),
                          n.paint()
                      }, 100))
                  }),
                    this.events.on(f.NavigationBarEvents.click, function (t) {
                      var e = n.data.getItem(t),
                        t = n.data.getItem(e.parent)
                      t &&
                        "selectButton" === t.type &&
                        n.data.update(e.parent, { value: e.value, icon: e.icon }),
                        e.group &&
                          ((t = n._groups[e.group]).active &&
                            n.data.update(t.active, { active: !1 }),
                          (t.active = e.id),
                          n.data.update(e.id, { active: !0 }))
                    }),
                    this.events.on(f.NavigationBarEvents.inputChange, function (t, e) {
                      n.data.update(t, { value: e })
                    }),
                    this._customInitEvents()
                }),
                (_.prototype._getMode = function (t, e, i) {
                  return void 0 === i && (i = !1), t.parent === e ? "bottom" : "right"
                }),
                (_.prototype._drawMenuItems = function (t, e) {
                  var i = this
                  return (
                    void 0 === e && (e = !0),
                    this.data.map(
                      function (t) {
                        return i._factory(t, e)
                      },
                      t,
                      !1
                    )
                  )
                }),
                (_.prototype._setRoot = function (t) {}),
                (_.prototype._getParents = function (t, e) {
                  var i = [],
                    n = !1,
                    o = this.data.getItem(t),
                    o = o && o.disabled
                  return (
                    this.data.eachParent(
                      t,
                      function (t) {
                        t.id === e ? (i.push(t.id), (n = !0)) : n || i.push(t.id)
                      },
                      !o
                    ),
                    this._isContextMenu && this._activePosition && i.push(e),
                    i
                  )
                }),
                (_.prototype._listenOuterClick = function () {
                  this._documentHaveListener ||
                    (document.addEventListener("mousedown", this._documentClick, !0),
                    (this._documentHaveListener = !0))
                }),
                (_.prototype._customInitEvents = function () {}),
                (_.prototype._drawPopups = function () {
                  var a = this,
                    t = this._activeMenu
                  if (!this._isContextMenu && !t) return null
                  var e = this.getRootNode(),
                    e = e && e.offsetParent && e.offsetParent.offsetParent,
                    l = null
                  e &&
                    e.classList.contains("dhx_popup--window") &&
                    e.classList.contains("dhx_popup--window_active") &&
                    (l = 2147483647)
                  var c = this._currentRoot
                  if (this._isContextMenu && !this._activePosition) return null
                  t = this._getParents(t, c)
                  return (
                    (this._activeParents = t).forEach(function (t) {
                      return a.data.exists(t) && a.data.update(t, { $activeParent: !0 }, !1)
                    }),
                    t
                      .map(function (r) {
                        if (!a.data.haveItems(r)) return null
                        var s = a.data.getItem(r) || a._rootItem
                        return (
                          (a._popupActive = !0),
                          u.el(
                            "ul",
                            d(
                              {
                                class:
                                  "dhx_widget dhx_menu" +
                                  (a.config.menuCss ? " " + a.config.menuCss : ""),
                                _key: r,
                                _hooks: {
                                  didInsert: function (t) {
                                    var e = t.el.getBoundingClientRect(),
                                      i = e.width,
                                      n = e.height,
                                      o =
                                        a._isContextMenu && a._activePosition && r === c
                                          ? a._activePosition
                                          : s.$position,
                                      e = a._getMode(s, c, o === a._activePosition),
                                      n = h.calculatePosition(o, {
                                        mode: e,
                                        auto: !0,
                                        width: i,
                                        height: n,
                                      })
                                    ;(s.$style = d(d({}, n), {
                                      zIndex: (a._activePosition && a._activePosition.zIndex) || l,
                                    })),
                                      t.patch({ style: s.$style })
                                  },
                                  didRecycle: function (t, e) {
                                    var i, n
                                    a._isContextMenu &&
                                      a._activePosition &&
                                      r === c &&
                                      ((i = (n = e.el.getBoundingClientRect()).width),
                                      (n = n.height),
                                      (n = h.calculatePosition(a._activePosition, {
                                        mode: a._getMode(s, c, !0),
                                        width: i,
                                        height: n,
                                      })),
                                      (s.$style = d(d({}, n), {
                                        zIndex: a._activePosition.zIndex || l,
                                      })),
                                      e.patch({ style: s.$style }))
                                  },
                                },
                                tabindex: 0,
                                style: s.$style || { position: "absolute" },
                              },
                              { role: "menu", "aria-labeledby": s.id, "aria-live": "polite" }
                            ),
                            a._drawMenuItems(r)
                          )
                        )
                      })
                      .reverse()
                  )
                }),
                (_.prototype._onMenuItemClick = function (t, e) {
                  var i = this.data.getItem(t)
                  i.disabled ||
                    (i.twoState && this.data.update(i.id, { active: !i.active }),
                    this.events.fire(f.NavigationBarEvents.click, [t, e]),
                    this._close(e))
                }),
                (_.prototype._activeItemChange = function (t, e) {
                  var i,
                    n = this
                  this._activeParents &&
                    ((i = this._getParents(t, this._currentRoot)),
                    this._activeParents.forEach(function (t) {
                      n.data.exists(t) &&
                        !i.includes(t) &&
                        n.data.update(t, { $activeParent: !1 }, !1)
                    })),
                    t && !this._documentHaveListener && this._listenOuterClick(),
                    t && this.data.haveItems(t)
                      ? ((this._activeMenu === t && this._popupActive) ||
                          this.events.fire(f.NavigationBarEvents.openMenu, [t]),
                        clearTimeout(this._currentTimeout),
                        this.paint())
                      : (clearTimeout(this._currentTimeout),
                        (this._currentTimeout = setTimeout(function () {
                          return n.paint()
                        }, 400))),
                    (this._activeMenu = t)
                }),
                (_.prototype._resetHotkeys = function () {
                  var e = this
                  this._keyManager.removeHotKey(null, this),
                    this.data.map(function (t) {
                      t.hotkey &&
                        e._keyManager.addHotKey(t.hotkey, function () {
                          return e._onMenuItemClick(t.id, null)
                        })
                    })
                }),
                (_.prototype._setProp = function (t, e, i) {
                  var n = this
                  Array.isArray(t)
                    ? t.forEach(function (t) {
                        return n.data.update(t, (((t = {})[e] = i), t))
                      })
                    : this.data.update(t, (((t = {})[e] = i), t))
                }),
                _)
            function _(t, e) {
              var s = p.call(this, t, e) || this
              return (
                (s._isContextMenu = !1),
                (s._documentHaveListener = !1),
                (s.config = r.extend({ rootId: ("string" == typeof t && t) || s._uid }, e)),
                (s._rootItem = {}),
                !Array.isArray(s.config.data) && s.config.data && s.config.data.events
                  ? ((s.data = s.config.data), (s.events = s.data.events), (s.events.context = s))
                  : ((s.events = new a.EventSystem(s)),
                    (s.data = new c.TreeCollection({ rootId: s.config.rootId }, s.events))),
                (s._documentClick = function (t) {
                  var e, i, n, o, r
                  s._documentHaveListener &&
                    ((e = h.locateNode(t)),
                    (i = s.data.getRoot()),
                    (n = e && e.getAttribute("dhx_id")),
                    (o = s.data.getParent(n)),
                    (r = "ontouchstart" in window || navigator.msMaxTouchPoints),
                    document.removeEventListener("mousedown", s._documentClick),
                    (s._documentHaveListener = !1),
                    ((((!r || e) && s._isContextMenu) || (i !== o && o && s.data.getItem(n))) &&
                      o &&
                      s.data.getItem(n)) ||
                      s._close(t))
                }),
                (s._currentRoot = s.data.getRoot()),
                (s._factory = s._getFactory()),
                s._initHandlers(),
                (s._keyManager = new l.KeyManager(function (t, e) {
                  return e === s._uid
                })),
                s._initEvents(),
                Array.isArray(s.config.data) && s.data.parse(s.config.data),
                s
              )
            }
            e.Navbar = o
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var u = i(127),
              h = i(128),
              f = i(129),
              p = i(130),
              _ = i(131),
              g = i(132),
              v = i(133),
              m = i(134),
              y = i(135),
              b = i(136),
              x = i(16)
            e.createFactory = function (t) {
              for (
                var n = t.defaultType,
                  e = t.allowedTypes,
                  o = t.widgetName,
                  t = t.widget,
                  r = new Set(),
                  i = 0,
                  s = e;
                i < s.length;
                i++
              ) {
                var a = s[i]
                r.add(a)
              }
              var l = t.config,
                c = t.events,
                d = t.data
              return function (t, e) {
                if (t.hidden) return null
                if (
                  !(
                    (t.type &&
                      "button" !== t.type &&
                      "navItem" !== t.type &&
                      "menuItem" !== t.type) ||
                    t.value ||
                    t.icon ||
                    t.html
                  )
                )
                  return null
                ;(t.type = t.type || n),
                  r && !r.has(t.type) && (t.type = n),
                  "imageButton" === t.type && "ribbon" !== o && (t.active = !1),
                  e &&
                    "spacer" !== t.type &&
                    "separator" !== t.type &&
                    "customHTML" !== t.type &&
                    (t.type = "menuItem"),
                  d.haveItems(t.id) &&
                    (function (t, e, i) {
                      switch (t) {
                        case "sidebar":
                        case "context-menu":
                          e.$openIcon = "right"
                          break
                        case "toolbar":
                          e.parent === i.getRoot()
                            ? (e.$openIcon = "right")
                            : (e.$openIcon = "bottom")
                          break
                        case "menu":
                          e.parent !== this.data.getRoot() && (e.$openIcon = "right")
                          break
                        case "ribbon":
                          var n = i.getItem(e.parent)
                          n &&
                            "block" !== e.type &&
                            ("block" === n.type
                              ? (e.$openIcon = "bottom")
                              : (e.$openIcon = "right"))
                      }
                    })(o, t, d),
                  "toolbar" === o &&
                    t.items &&
                    t.items.forEach(function (t) {
                      t.type || (t.type = "menuItem")
                    })
                var i =
                  "customHTML" !== t.type &&
                  (function (t, e, i, n) {
                    switch (t.type) {
                      case "navItem":
                      case "selectButton":
                        return h.navItem(t, i, n.collapsed)
                      case "button":
                        return u.button(t, i)
                      case "title":
                        return y.title(t, i)
                      case "separator":
                        return v.separator(t, i)
                      case "spacer":
                        return m.spacer(t, i)
                      case "input":
                        return _.input(t, e, i)
                      case "imageButton":
                        return p.imageButton(t, i)
                      case "menuItem":
                        return g.menuItem(t, i, n.asMenuItem)
                      case "customHTMLButton":
                        return f.customHTMLButton(t, i, n.asMenuItem)
                      case "datePicker":
                        return b.datePicker(t, e, i)
                      case "block":
                      default:
                        throw new Error("unknown item type " + t.type)
                    }
                  })(t, c, o, { asMenuItem: e, collapsed: "sidebar" !== o || l.collapsed })
                return x.navbarComponentMixin(o, t, e, i)
              }
            }
          },
          function (t, e, i) {
            "use strict"
            var s =
              (this && this.__assign) ||
              function () {
                return (s =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var a = i(0),
              l = i(16)
            e.button = function (t, e) {
              var i,
                n,
                o = t.icon && !t.value,
                r = o ? " dhx_navbar-count--absolute" : " dhx_navbar-count--button-inline"
              return a.el(
                "button.dhx_button",
                s(
                  {
                    class: l.getNavbarButtonCSS(t, e),
                    dhx_id: t.id,
                    disabled: t.disabled,
                    type: "button",
                  },
                  ((n = (i = t).active || i.$activeParent),
                  (e = {
                    "aria-disabled": i.disabled ? "true" : "false",
                    "aria-label": i.value || i.tooltip || i.id || " " + (i.count || ""),
                  }),
                  i.items &&
                    ((e.id = i.id),
                    (e["aria-haspopup"] = "menu"),
                    n && (e["aria-expanded"] = "true")),
                  e)
                ),
                [
                  t.icon ? l.getIcon(t.icon, "button") : null,
                  t.html
                    ? a.el("div.dhx_button__text", { ".innerHTML": t.html })
                    : t.value && a.el("span.dhx_button__text", t.value),
                  0 < t.count && l.getCount(t, r, o),
                  t.value && t.$openIcon
                    ? a.el("span.dhx_button__icon.dhx_button__icon--menu.dxi.dxi-menu-right", {
                        "aria-hidden": "true",
                      })
                    : null,
                  t.loading &&
                    a.el("span.dhx_button__loading", { "aria-hidden": "true" }, [
                      a.el("span.dhx_button__loading-icon.dxi.dxi-loading"),
                    ]),
                ]
              )
            }
          },
          function (t, e, i) {
            "use strict"
            var s =
              (this && this.__assign) ||
              function () {
                return (s =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var a = i(0),
              l = i(16)
            e.navItem = function (t, e, i) {
              var n,
                o,
                r,
                e = " dhx_" + e + "-button"
              return a.el(
                "button",
                s(
                  {
                    class:
                      "dhx_button" +
                      e +
                      (t.active || t.$activeParent ? e + "--active" : "") +
                      (t.disabled ? e + "--disabled" : "") +
                      (t.$openIcon ? e + "--select" : "") +
                      (t.circle ? e + "--circle" : "") +
                      (t.size ? " " + e + "--" + t.size : "") +
                      (!t.value && t.icon ? e + "--icon" : "") +
                      (t.css ? " " + t.css : ""),
                    dhx_id: t.id,
                    disabled: t.disabled,
                    type: "button",
                  },
                  ((o = {
                    "aria-disabled": (n = t).disabled ? "true" : "false",
                    "aria-label": n.value || " ",
                  }),
                  (r = n.active || n.$activeParent),
                  "selectButton" === n.type || n.items
                    ? ((o.id = n.id),
                      (o["aria-haspopup"] = "menu"),
                      r && (o["aria-expanded"] = "true"))
                    : ((n.twoState || r) && (o["aria-pressed"] = r ? "true" : "false"),
                      !n.value &&
                        n.icon &&
                        n.tooltip &&
                        (o["aria-label"] = n.tooltip + " " + (n.count || ""))),
                  o)
                ),
                [
                  t.icon && a.el("span", { class: t.icon + e + "__icon", "aria-hidden": "true" }),
                  t.html && a.el("div", { class: e.trim() + "__html", ".innerHTML": t.html }),
                  !t.html && t.value && a.el("span", { class: e.trim() + "__text" }, t.value),
                  0 < t.count && l.getCount(t, e + "__count", i),
                  t.$openIcon &&
                    a.el("span.dxi.dxi-menu-right", {
                      class: e + "__caret",
                      "aria-hidden": "true",
                    }),
                ]
              )
            }
          },
          function (t, e, i) {
            "use strict"
            var o =
              (this && this.__assign) ||
              function () {
                return (o =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r = i(0)
            e.customHTMLButton = function (t, e, i) {
              var n,
                i = i ? " dhx_button dhx_menu-button" : " dhx_button dhx_nav-menu-button"
              return r.el(
                "button",
                o(
                  {
                    class: "dhx_custom-button" + i + (t.$activeParent ? i + "--active" : ""),
                    dhx_id: t.id,
                    type: "button",
                    ".innerHTML": t.html,
                  },
                  ((i = { "aria-disabled": (n = t).disabled ? "true" : "false" }),
                  (n.twoState || n.active || n.$activeParent) &&
                    (i["aria-pressed"] = n.active || n.$activeParent ? "true" : "false"),
                  i)
                ),
                t.html ? "" : t.value
              )
            }
          },
          function (t, e, i) {
            "use strict"
            var r =
              (this && this.__assign) ||
              function () {
                return (r =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var s = i(0),
              a = i(16)
            e.imageButton = function (t, e) {
              var i,
                n,
                o = "dhx_" + e + "-button-image",
                e = "ribbon" === e
              return s.el(
                "button.dhx_button",
                r(
                  {
                    class:
                      o +
                      (t.size ? " " + o + "--" + t.size : "") +
                      (!t.value && t.src ? " " + o + "--icon" : "") +
                      (e && t.$openIcon ? " " + o + "--select" : "") +
                      (t.active ? " " + o + "--active" : ""),
                    dhx_id: t.id,
                    type: "button",
                  },
                  ((n = { "aria-disabled": (i = t).disabled ? "true" : "false" }),
                  (i.twoState || i.active) && (n["aria-pressed"] = i.active ? "true" : "false"),
                  !i.value &&
                    i.src &&
                    i.tooltip &&
                    (n["aria-label"] = i.tooltip + " " + (i.count || "")),
                  n)
                ),
                [
                  e &&
                    t.value &&
                    t.$openIcon &&
                    s.el("span.dxi.dxi-menu-right", {
                      class: o + "__caret",
                      "aria-hidden": "true",
                    }),
                  t.html
                    ? s.el("div", { class: o + "__text", ".innerHTML": t.html })
                    : t.value && s.el("span", { class: o + "__text" }, t.value),
                  t.src &&
                    s.el("span", {
                      class: o + "__image",
                      style: { backgroundImage: "url(" + t.src + ")" },
                      role: "presentation",
                    }),
                  0 < t.count && a.getCount(t, o + "__count", !0),
                ]
              )
            }
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(0),
              o = i(26)
            function r(t, e) {
              t.fire(o.NavigationBarEvents.inputBlur, [e])
            }
            function s(t, e) {
              t.fire(o.NavigationBarEvents.inputFocus, [e])
            }
            function a(t, e, i) {
              t.fire(o.NavigationBarEvents.inputChange, [e, i.target.value])
            }
            e.input = function (e, i, t) {
              return n.el(
                ".dhx_form-group.dhx_form-group--no-message-holder.dhx_form-group--label_sr.dhx_" +
                  t +
                  "__input",
                { style: { width: e.width || "200px" }, role: "presentation" },
                [
                  e.label && n.el("label.dhx_label", { for: e.id }, e.label),
                  n.el(".dhx_input__wrapper", { role: "presentation" }, [
                    n.el("input.dhx_input", {
                      placeholder: e.placeholder,
                      class: e.icon ? "dhx_input--icon-padding" : "",
                      value: e.value,
                      disabled: e.disabled,
                      onblur: [r, i, e.id],
                      onfocus: [s, i, e.id],
                      oninput: [a, i, e.id],
                      dhx_id: e.id,
                      _hooks: {
                        didInsert: function (t) {
                          i && i.fire(o.NavigationBarEvents.inputCreated, [e.id, t.el])
                        },
                      },
                      _key: e.id,
                      "aria-label":
                        e.label ||
                        e.helpMessage ||
                        "type " + (e.placeholder ? "text like " + e.placeholder : "text"),
                    }),
                    e.icon
                      ? n.el(".dhx_input__icon", { class: e.icon, "aria-hidden": "true" })
                      : null,
                  ]),
                ]
              )
            }
          },
          function (t, e, i) {
            "use strict"
            var r =
              (this && this.__assign) ||
              function () {
                return (r =
                  Object.assign ||
                  function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                      for (var o in (e = arguments[i]))
                        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                    return t
                  }).apply(this, arguments)
              }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var s = i(0),
              a = i(16)
            e.menuItem = function (t, e, i) {
              var n,
                o = i ? " dhx_menu-button" : " dhx_nav-menu-button"
              return s.el(
                "button",
                r(
                  {
                    class:
                      "dhx_button" +
                      o +
                      (t.disabled ? o + "--disabled" : "") +
                      (t.active || t.$activeParent ? o + "--active" : ""),
                    disabled: t.disabled,
                    dhx_id: t.id,
                    type: "button",
                  },
                  ((o = { role: "menuitem", "aria-disabled": (n = t).disabled ? "true" : "false" }),
                  n.items && (o["aria-haspopup"] = "true"),
                  o)
                ),
                i
                  ? [
                      t.icon || t.value || t.html
                        ? s.el("span.dhx_menu-button__block.dhx_menu-button__block--left", [
                            t.icon && s.el("span.dhx_menu-button__icon", { class: t.icon }),
                            t.html
                              ? s.el("div.dhx_menu-button__text", { ".innerHTML": t.html })
                              : t.value && s.el("span.dhx_menu-button__text", t.value),
                          ])
                        : null,
                      0 < t.count || t.hotkey || t.items
                        ? s.el("span.dhx_menu-button__block.dhx_menu-button__block--right", [
                            0 < t.count && a.getCount(t, " dhx_menu-button__count", !1),
                            t.hotkey && s.el("span.dhx_menu-button__hotkey", t.hotkey),
                            t.items && s.el("span.dhx_menu-button__caret.dxi.dxi-menu-right"),
                          ])
                        : null,
                    ]
                  : [
                      t.icon && s.el("span.dhx_menu-button__icon", { class: t.icon }),
                      t.html
                        ? s.el("div.dhx_menu-button__text", { ".innerHTML": t.html })
                        : t.value && s.el("span.dhx_nav-menu-button__text", t.value),
                    ]
              )
            }
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              (e.separator = function (t, e) {
                return null
              })
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 }),
              (e.spacer = function (t, e) {
                return null
              })
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(0)
            e.title = function (t, e) {
              return n.el(
                "span",
                {
                  class: "dhx_navbar-title dhx_navbar-title--" + e,
                  dhx_id: t.id,
                  ".innerHTML": t.html,
                  "aria-label": t.value || "",
                },
                t.html ? null : t.value
              )
            }
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n,
              o,
              r,
              s = i(0),
              a = i(43),
              l = i(23),
              c = i(26)
            function d(t, e) {
              t.fire(c.NavigationBarEvents.inputBlur, [e])
            }
            function u(t, e, i) {
              s.awaitRedraw().then(function () {
                return r.show(i.target)
              }),
                t.fire(c.NavigationBarEvents.inputFocus, [e])
            }
            e.datePicker = function (e, i, t) {
              return (
                n ||
                  ((r = new l.Popup()),
                  (o = new a.Calendar(null, {
                    dateFormat: e.dateFormat || "%d/%m/%y",
                    value: e.value,
                    css: "dhx_widget--bordered",
                  })),
                  r.attach(o),
                  o.events.on("change", function () {
                    r.hide(), i.fire(c.NavigationBarEvents.inputChange, [e.id, o.getValue()])
                  }),
                  (n = !0)),
                s.el(
                  ".dhx_form-group.dhx_form-group--no-message-holder.dhx_form-group--label_sr.dhx_" +
                    t +
                    "__input",
                  { style: { width: e.width || "200px" }, role: "presentation" },
                  [
                    e.label && s.el("label.dhx_label", { for: e.id }, e.label),
                    s.el(".dhx_input__wrapper", { role: "presentation" }, [
                      s.el("input.dhx_input", {
                        placeholder: e.placeholder,
                        class: e.icon ? "dhx_input--icon-padding" : "",
                        value: o.getValue(),
                        disabled: e.disabled,
                        onblur: [d, i, e.id],
                        onfocus: [u, i, e.id],
                        dhx_id: e.id,
                        readOnly: !0,
                        _hooks: {
                          didInsert: function (t) {
                            i && i.fire(c.NavigationBarEvents.inputCreated, [e.id, t.el])
                          },
                        },
                        _key: e.id,
                        "aria-label":
                          e.label ||
                          e.helpMessage ||
                          "type " + (e.placeholder ? "text like " + e.placeholder : "text"),
                      }),
                      e.icon
                        ? s.el(".dhx_input__icon", { class: e.icon, "aria-hidden": "true" })
                        : null,
                    ]),
                  ]
                )
              )
            }
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              r =
                (this && this.__assign) ||
                function () {
                  return (r =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var s,
              a = i(58),
              l = i(15),
              c = i(0),
              d = i(2),
              u = i(8),
              o =
                ((s = a.Toolbar),
                o(h, s),
                (h.prototype._draw = function (t) {
                  var i = this,
                    e = this.data.getLength()
                      ? this.data.reduce(function (t, e) {
                          switch (e.type) {
                            case "title":
                              return t || 20
                            case "button":
                              return "small" === e.size && (!t || t <= 28) ? 28 : t || 32
                            default:
                              return 32
                          }
                        }, 0) + 24
                      : null,
                    t = [
                      c.el(
                        "ul.dhx_navbar.dhx_navbar--horizontal",
                        r(
                          r(
                            { dhx_widget_id: this._uid, tabindex: 0 },
                            { role: "toolbar", "aria-label": t || "" }
                          ),
                          {
                            onclick: this._handlers.onclick,
                            onmousedown: this._handlers.onmousedown,
                            oninput: this._handlers.input,
                            onmouseover: this._handlers.tooltip,
                            _hooks: {
                              didInsert: function (t) {
                                t.el.addEventListener(
                                  "keyup",
                                  function (t) {
                                    var e
                                    9 !== t.which ||
                                      ((e = d.locateNode(document.activeElement)) &&
                                        ((t = e.getAttribute("dhx_id")),
                                        (t = i.data.getItem(t)).tooltip &&
                                          u.tooltip(t.tooltip, {
                                            node: e,
                                            position: u.Position.bottom,
                                            force: !0,
                                          })))
                                  },
                                  !0
                                )
                              },
                            },
                          }
                        ),
                        this.data.map(
                          function (t) {
                            return i._factory(t)
                          },
                          this.data.getRoot(),
                          !1
                        )
                      ),
                    ]
                  return c.el(
                    "nav.dhx_widget.dhx_toolbar",
                    { style: { height: e }, class: this.config.css || "" },
                    this.scrollView && this.scrollView.config.enable
                      ? [].concat(this.scrollView.render(t))
                      : t
                  )
                }),
                h)
            function h(t, e) {
              var i = s.call(this, t, e) || this
              return (
                (i.scrollView = new l.ScrollView(function () {
                  return i.getRootView()
                })),
                i
              )
            }
            e.ProToolbar = o
          },
          function (t, i, a) {
            "use strict"
            ;(function (r) {
              Object.defineProperty(i, "__esModule", { value: !0 })
              var n = a(1),
                o = a(2),
                s = a(4),
                c = a(17),
                t =
                  ((e.prototype.selectFile = function () {
                    this._fileInput.click()
                  }),
                  (e.prototype.linkDropArea = function (t) {
                    function e(t) {
                      return t.preventDefault()
                    }
                    var i = this,
                      n = o.toNode(t),
                      t = function (t) {
                        t.preventDefault(), i.parseFiles(t.dataTransfer)
                      }
                    n.addEventListener("dragover", e),
                      n.addEventListener("drop", t),
                      this._dropAreas.set(n, { dragover: e, drop: t })
                  }),
                  (e.prototype.unlinkDropArea = function (t) {
                    var i = this
                    t
                      ? ((t = o.toNode(t)), this._unlinkDropArea(t), this._dropAreas.delete(t))
                      : (this._dropAreas.forEach(function (t, e) {
                          i._unlinkDropArea(e)
                        }),
                        this._dropAreas.clear())
                  }),
                  (e.prototype.parseFiles = function (t) {
                    if (t.items && t.items[0] && t.items[0].webkitGetAsEntry)
                      this._parseAsWebkitEntry(t.items)
                    else {
                      for (var e = t.files, i = 0; i < e.length; i++) this._addFile(e[i])
                      this.config.autosend && this.send()
                    }
                  }),
                  (e.prototype.send = function (t) {
                    var e = this
                    if (!this._uploadInfo || !this.isActive) {
                      var i = this.data
                        .findAll(function (t) {
                          return t.status === c.FileStatus.queue || t.status === c.FileStatus.failed
                        })
                        .filter(function (t) {
                          return e.events.fire(c.UploaderEvents.beforeUploadFile, [t])
                        })
                      if (i.length)
                        if (
                          ((this.isActive = !0),
                          (this._uploadInfo = {
                            files: i,
                            count: i.length,
                            size: i.reduce(function (t, e) {
                              return t + e.file.size
                            }, 0),
                          }),
                          this.events.fire(c.UploaderEvents.uploadBegin, [i]),
                          this.events.fire(c.UploaderEvents.uploadProgress, [
                            0,
                            0,
                            this._uploadInfo.size,
                          ]),
                          this.config.singleRequest)
                        )
                          this._xhrSend(i, t)
                        else
                          for (var n = 0, o = i; n < o.length; n++) {
                            var r = o[n]
                            this._xhrSend([r], t)
                          }
                    }
                  }),
                  (e.prototype.abort = function (t) {
                    if (t) {
                      t = this.data.getItem(t)
                      t && t.request && 4 !== t.request.readyState && t.request.abort()
                    } else if (this._uploadInfo && this._uploadInfo.files)
                      for (var e = 0, i = this._uploadInfo.files; e < i.length; e++) {
                        var n = i[e]
                        this.abort(n.id)
                      }
                  }),
                  (e.prototype._unlinkDropArea = function (t) {
                    var e,
                      i = this._dropAreas.get(t)
                    i &&
                      ((e = i.dragover),
                      (i = i.drop),
                      t.removeEventListener("dragover", e),
                      t.removeEventListener("drop", i))
                  }),
                  (e.prototype._initEvents = function () {
                    var i = this
                    this._fileInput.addEventListener("change", function () {
                      for (var t = i._fileInput.files, e = 0; e < t.length; e++) i._addFile(t[e])
                      i.config.autosend && i.send(), (i._fileInput.value = null)
                    })
                  }),
                  (e.prototype._xhrSend = function (a, t) {
                    for (
                      var l = this,
                        t = this._createFormData(a, t),
                        r = new XMLHttpRequest(),
                        e = this.config.headerParams,
                        i = 0,
                        n = a;
                      i < n.length;
                      i++
                    ) {
                      var o = n[i]
                      this.data.update(o.id, {
                        request: r,
                        status: c.FileStatus.inprogress,
                        progress: 0,
                      })
                    }
                    if ((r.open("POST", this.config.target), e))
                      for (var s in e) r.setRequestHeader(s, e[s])
                    ;(r.upload.onprogress = function (t) {
                      for (var e = 0, i = a; e < i.length; e++) {
                        var n = i[e]
                        l.data.update(n.id, {
                          progress: t.loaded / t.total,
                          status: c.FileStatus.inprogress,
                        })
                      }
                      var o =
                          l._uploadInfo.files.reduce(function (t, e) {
                            return t + e.size * e.progress
                          }, 0) || 0,
                        r = l._uploadInfo.size,
                        s = (o / l._uploadInfo.size) * 100 || 0
                      l.events.fire(c.UploaderEvents.uploadProgress, [s, o, r])
                    }),
                      (r.onloadend = function () {
                        l._uploadInfo.count = l.config.singleRequest ? 0 : l._uploadInfo.count - 1
                        for (
                          var t = 200 === r.status ? c.FileStatus.uploaded : c.FileStatus.failed,
                            e = 200 === r.status && r.response ? JSON.parse(r.response) : null,
                            i = 0,
                            n = a;
                          i < n.length;
                          i++
                        ) {
                          var o = n[i]
                          l.data.update(o.id, { status: t }),
                            t === c.FileStatus.uploaded
                              ? (l.config.updateFromResponse &&
                                  e &&
                                  (l.config.singleRequest && e[o.id]
                                    ? l.data.update(o.id, e[o.id])
                                    : l.config.singleRequest || l.data.update(o.id, e)),
                                l.events.fire(c.UploaderEvents.uploadFile, [o, e]))
                              : l.events.fire(c.UploaderEvents.uploadFail, [o])
                        }
                        0 === l._uploadInfo.count &&
                          ((l.isActive = !1),
                          l.events.fire(c.UploaderEvents.uploadComplete, [l._uploadInfo.files]))
                      }),
                      r.send(t)
                  }),
                  (e.prototype._parseAsWebkitEntry = function (t) {
                    for (var e = this, i = [], n = 0; n < t.length; n++) {
                      var o = t[n].webkitGetAsEntry()
                      i.push(this._traverseFileTree(o))
                    }
                    r.all(i).then(function () {
                      e.config.autosend && e.send()
                    })
                  }),
                  (e.prototype._createFormData = function (t, e) {
                    var i = this.config.fieldName,
                      n = new FormData(),
                      o = this.config.params
                    if (e) for (var r in e) n.append(r, e[r])
                    if (o) for (var r in o) n.append(r, o[r])
                    for (var s = 1 < t.length ? "[]" : "", a = 0, l = t; a < l.length; a++) {
                      var c = l[a]
                      n.append(i + s, c.file, c.file.name),
                        n.append(i + "_fullname" + s, c.path + c.file.name)
                      c = "object" == typeof c.id ? c.id : c.id.toString()
                      n.append(i + "_id" + s, c)
                    }
                    return n
                  }),
                  (e.prototype._addFile = function (t, e) {
                    void 0 === e && (e = "")
                    e = {
                      id: n.uid(),
                      file: t,
                      progress: 0,
                      status: c.FileStatus.queue,
                      src: null,
                      path: e,
                    }
                    this.data.add(e)
                  }),
                  (e.prototype._traverseFileTree = function (t) {
                    var n = this
                    return new r(function (r) {
                      var s = 0,
                        a = function (t, e) {
                          var i, o
                          t.isFile
                            ? (s++,
                              t.file(function (t) {
                                s--, n._addFile(t, e), 0 === s && r()
                              }))
                            : t.isDirectory &&
                              ((i = t.createReader()),
                              (i = i),
                              (o = e + t.name + "/"),
                              s++,
                              i.readEntries(function (t) {
                                s--
                                for (var e = 0, i = t; e < i.length; e++) {
                                  var n = i[e]
                                  a(n, o)
                                }
                                0 === s && r()
                              }))
                        }
                      a(t, "")
                    })
                  }),
                  e)
              function e(t, e, i) {
                void 0 === t && (t = {}),
                  (this.config = n.extend(
                    { autosend: !0, updateFromResponse: !0, fieldName: "file" },
                    t
                  )),
                  (this.data = e || new s.DataCollection()),
                  (this.events = i || this.data.events),
                  (this.isActive = !1),
                  (this._fileInput = document.createElement("input")),
                  (this._fileInput.type = "file"),
                  (this._fileInput.multiple = !0),
                  this._initEvents(),
                  (this._dropAreas = new Map())
              }
              i.Uploader = t
            }.call(this, a(9)))
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(2),
              o = i(8),
              l = i(60),
              c = i(17),
              d = i(13)
            ;(e.gridTemplate = function (t) {
              var e = t.status === c.FileStatus.inprogress,
                i = t.status === c.FileStatus.failed,
                n = t.status !== c.FileStatus.uploaded,
                o = "dhx_dataview-item--file__"
              switch (t.status) {
                case c.FileStatus.inprogress:
                  o += "progress"
                  break
                case c.FileStatus.queue:
                  o += "queue"
                  break
                case c.FileStatus.failed:
                  o += "failed"
                  break
                default:
                  o = ""
              }
              var r = "",
                s = ""
              t.link && (s = (r = (t.downloadURL || "") + t.link).split("/").pop().split("?")[0])
              var a = ""
              return (
                /image/.exec(l.getFileClassName(t)) &&
                  t.preview &&
                  (t.image && t.image.src
                    ? (a =
                        "style=\"background:url('" +
                        t.image.src +
                        "') center center no-repeat;background-size:cover\"")
                    : t.link &&
                      (a =
                        "style=\"background:url('" +
                        r +
                        "') center center no-repeat;background-size:cover\"")),
                '<div class="dhx_dataview-item--file ' +
                  o +
                  '">\n\t\t<div class="dhx_dataview-item--file-type ' +
                  l.getFileClassName(t) +
                  '" ' +
                  a +
                  "></div>\n\t\t" +
                  (e
                    ? '<div class="dhx_dataview-item--progress-block">\n\t\t\t\t\t<div class="dhx_dataview-item--progress-value">' +
                      (100 * t.progress).toFixed(1) +
                      '%</div>\n\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" class="dhx_vault-item--progress-circle" viewBox="0 0 60 60">\n\t\t\t\t\t\t<circle cx="30" cy="30" r="28" stroke-width="4" class="dhx_vault-item--progress-bar-background"></circle>\n\t\t\t\t\t\t<circle cx="30" cy="30" r="28" stroke-width="4" stroke-dasharray="175.9 175.9" stroke-dashoffset="' +
                      175.9 * (1 - t.progress) +
                      '" class="active-circle dhx_vault-item--progress-bar-active"></circle>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>'
                    : '<div class="dhx_dataview-item--default-block">\n\t\t\t\t\t' +
                      (i
                        ? '<div class="dhx_dataview-item--error-mark dxi dxi-alert-circle"></div>'
                        : n
                        ? '<div class="dhx_dataview-item--error-mark dxi dxi-vault"></div>'
                        : '<div class="dhx_dataview-item--success-mark dxi dxi-checkbox-marked-circle"></div>') +
                      '\n\t\t\t\t</div>\n\t\t\t\t<div class="dhx_dataview-item--hover-block">\n\t\t\t\t\t<div class="dhx_dataview-item--control-block ' +
                      (i || n || !t.link ? "dhx_dataview-item--control-block__withoutLink" : "") +
                      '">\n\t\t\t\t\t\t' +
                      (i || n || !t.link
                        ? '<div class="dhx_dataview-item--remove-btn dxi dxi-delete-forever"></div>'
                        : '<a href="' +
                          r +
                          '" class="dhx_dataview-item--download-btn dxi dxi-download" download="' +
                          s +
                          '"></a>\n\t\t\t\t\t\t\t\t\t<div class="dhx_dataview-item--remove-btn dxi dxi-delete-forever"></div>') +
                      "\n\t\t\t\t\t</div>\n\t\t\t\t\t" +
                      (i
                        ? '<div class="dhx_dataview-item--error-text">' + d.default.error + "</div>"
                        : '<div class="dhx_dataview-item--file-size">' +
                          l.getBasis(t.size) +
                          "</div>") +
                      "\n\t\t\t\t</div>") +
                  '\n\t\t</div>\n\t<div class="dhx_dataview-item--file-name">' +
                  l.truncateWord(t.name) +
                  "</div>"
              )
            }),
              (e.listTemplate = function (t) {
                var e = t.status === c.FileStatus.failed,
                  i = t.status === c.FileStatus.inprogress,
                  n = t.status !== c.FileStatus.uploaded && !e,
                  o = "",
                  r = ""
                return (
                  t.link &&
                    (r = (o = (t.downloadURL || "") + t.link).split("/").pop().split("?")[0]),
                  '<div class="dhx_list-item--icon ' +
                    (n ? "dhx_list-item--queue" : "") +
                    '">\n\t\t\t<div class="dhx_list-item--file-type ' +
                    l.getFileClassName(t) +
                    '"></div>\n\t\t</div>\n\t\t<div class="dhx_list-item--content">\n\t\t' +
                    (i
                      ? '<div class="dhx_list-item--name">' +
                        t.value +
                        "." +
                        t.extension +
                        '\n\t\t\t\t\t<p class="dhx_item--progress-value">' +
                        (100 * t.progress).toFixed(1) +
                        "%</p>\n\t\t\t\t</div>"
                      : '<div class="dhx_list-item--name">' +
                        t.value +
                        "." +
                        t.extension +
                        "</div>\n\t\t\t\t\t" +
                        (e
                          ? '<div class="dhx_list-item--error-info">' + d.default.error + "</div>"
                          : "") +
                        '\n\t\t\t\t\t<div class="dhx_list-item--size ' +
                        (e ? "error" : "") +
                        '">' +
                        l.getBasis(t.size) +
                        "</div>\t\n\t\t\t\t</div>") +
                    "\n\t\t</div>\n\t\t" +
                    (i
                      ? '<div class="dhx_item--download-progress" style="width:' +
                        (100 * t.progress).toFixed(1) +
                        '%"></div>'
                      : '<div class="dhx_item--info">\n\t\t\t\t\t' +
                        (e
                          ? '<div class="dhx_item--error-mark dxi dxi-alert-circle"></div><div class="dhx_item--btn-remove dxi dxi-delete-forever"></div>'
                          : (n
                              ? '<div class="dhx_item--error-mark dxi dxi-vault"></div>'
                              : '<div class="dhx_item--success-mark dxi dxi-checkbox-marked-circle"></div>') +
                            '\n\t\t\t\t\t\t\t<div class="dhx_item--hover-block">\n\t\t\t\t\t\t\t\t' +
                            (e || n || !t.link
                              ? ""
                              : '<a href="' +
                                o +
                                '" class="dhx_item--download-btn dxi dxi-download" download="' +
                                r +
                                '"></a>') +
                            '\n\t\t\t\t\t\t\t\t<div class="dhx_item--btn-remove dxi dxi-delete-forever"></div>\n\t\t\t\t\t\t\t</div>') +
                        "\n\t\t\t\t</div>")
                )
              }),
              (e.getContainersEvents = function (i) {
                function t(t) {
                  var e = n.locate(t)
                  e &&
                    ((e = i.getItem(e)),
                    o.tooltip(e.name, { node: t.target, position: o.Position.bottom }))
                }
                return {
                  onclick: {
                    "dxi-delete-forever": function (t) {
                      t = n.locate(t)
                      t && l.removeItem(i, t)
                    },
                  },
                  onmouseover: {
                    "dxi-download": function (t) {
                      o.tooltip(d.default.download, { node: t.target, position: o.Position.bottom })
                    },
                    "dxi-delete-forever": function (t) {
                      o.tooltip(d.default.clear, { node: t.target, position: o.Position.bottom })
                    },
                    "dhx_list-item--name": t,
                    "dhx_dataview-item--file-name": t,
                  },
                }
              })
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                })
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r,
              s = i(0),
              a = i(6),
              l = i(13),
              c = i(17),
              o =
                ((r = a.View),
                o(d, r),
                (d.prototype.setState = function (t, e) {
                  ;(this._progress = t),
                    this.config.template
                      ? (this._progressText = this.config.template(t, e))
                      : (this._progressText = this._progress.toFixed(1) + "%"),
                    this.paint()
                }),
                (d.prototype._draw = function () {
                  return s.el(".progress-bar", { _key: this._uid }, [
                    s.el(".progress-indicator", { style: { width: this._progress + "%" } }),
                    s.el(".progress-text", { ".innerHTML": this._progressText }),
                    s.el(
                      "button",
                      {
                        class:
                          "dhx_button dhx_button--color_primary dhx_button--size_small dhx_button--view_flat action-abort-all",
                        onclick: this._abortUpload,
                      },
                      l.default.cancel
                    ),
                  ])
                }),
                d)
            function d(t, e) {
              var i = r.call(this, null, e) || this
              ;(i.events = t), (i._progress = 0)
              return (
                i.mount(
                  null,
                  s.create({
                    render: function () {
                      return i._draw()
                    },
                  })
                ),
                (i._abortUpload = function () {
                  i.events.fire(c.ProgressBarEvents.cancel)
                }),
                i
              )
            }
            e.ProgressBar = o
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n =
              ((o.prototype.add = function (t, e) {
                void 0 === e && (e = !1), this._readerStack.push(t), e || this.read()
              }),
              (o.prototype.read = function () {
                var i,
                  t,
                  n = this
                this._readerStack.length &&
                  !this._isActive &&
                  ((i = this._readerStack.shift()),
                  (this._isActive = !0),
                  (t = new FileReader()).readAsDataURL(i.file),
                  (t.onload = function (t) {
                    var e = new Image()
                    ;(e.src = t.target.result),
                      (e.onload = function () {
                        n._data.exists(i.id) && n._data.update(i.id, { image: e }),
                          (n._isActive = !1),
                          n.read()
                      })
                  }),
                  (t.onerror = function () {
                    ;(n._isActive = !1), n.read()
                  }))
              }),
              (o.prototype.stop = function () {
                this._readerStack = []
              }),
              o)
            function o(t) {
              ;(this._readerStack = []), (this._isActive = !1), (this._data = t)
            }
            e.ReadStackPreview = n
          },
          function (t, i, e) {
            "use strict"
            function n(t) {
              for (var e in t) i.hasOwnProperty(e) || (i[e] = t[e])
            }
            Object.defineProperty(i, "__esModule", { value: !0 }), n(e(61)), n(e(145)), n(e(62))
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var n = i(144)
            e.getEditor = function (t, e) {
              return new n.InputEditor(t, e)
            }
          },
          function (t, e, i) {
            "use strict"
            Object.defineProperty(e, "__esModule", { value: !0 })
            var o = i(0),
              n = i(62),
              i =
                ((r.prototype.endEdit = function () {
                  var t
                  this._input &&
                    ((t = this._input.value),
                    this._dataView.events.fire(n.DataViewEvents.beforeEditEnd, [t, this._item.id])
                      ? (this._input.removeEventListener("blur", this._handlers.onBlur),
                        this._input.removeEventListener("change", this._handlers.onChange),
                        (this._handlers = {}),
                        (this._mode = !1),
                        this._dataView.events.fire(n.DataViewEvents.afterEditEnd, [
                          t,
                          this._item.id,
                        ]))
                      : this._input.focus())
                }),
                (r.prototype.toHTML = function (t) {
                  this._mode = !0
                  var e = this._config,
                    i = e.itemsInRow,
                    n = e.gap,
                    e = function (t) {
                      return parseFloat(t)
                    }
                  return o.el(
                    ".dhx_input__wrapper",
                    {
                      style: {
                        width: "calc(" + 100 / i + "% - " + e(n) + " * " + (i - 1) / i + "px)",
                        maxWidth: "calc(" + 100 / i + "% - " + e(n) + " * " + (i - 1) / i + "px)",
                        marginRight: t ? "" : n,
                      },
                      role: "presentation",
                    },
                    [
                      o.el(
                        "div.dhx_input__container",
                        { style: { height: "100%" }, role: "presentation" },
                        [
                          o.el("input.dhx_input", {
                            class:
                              (this._item.css ? " " + this._item.css : "") +
                              (t ? " dhx_dataview-item--last-item-in-row" : ""),
                            style: { padding: "8px, 12px", width: "100%", height: "100%" },
                            _hooks: { didInsert: this._handlers.didInsert },
                            _key: this._item.id,
                            dhx_id: this._item.id,
                          }),
                        ]
                      ),
                    ]
                  )
                }),
                (r.prototype._initHandlers = function () {
                  var e = this
                  this._handlers = {
                    onBlur: function () {
                      e.endEdit()
                    },
                    onChange: function () {
                      e.endEdit()
                    },
                    didInsert: function (t) {
                      t = t.el
                      ;(e._input = t).focus(),
                        (t.value = e._item.value),
                        t.setSelectionRange(0, t.value.length),
                        t.addEventListener("change", e._handlers.onChange),
                        t.addEventListener("blur", e._handlers.onBlur)
                    },
                  }
                }),
                r)
            function r(t, e) {
              var i = this
              ;(this._dataView = e),
                (this._config = e.config),
                (this._item = t),
                this._dataView.events.on(n.DataViewEvents.focusChange, function (t, e) {
                  i._mode && e !== i._item.id && i.endEdit()
                }),
                this._initHandlers()
            }
            e.InputEditor = i
          },
          function (t, e, i) {
            "use strict"
            var n,
              o =
                (this && this.__extends) ||
                ((n = function (t, e) {
                  return (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e
                      }) ||
                    function (t, e) {
                      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
                }),
                function (t, e) {
                  function i() {
                    this.constructor = t
                  }
                  n(t, e),
                    (t.prototype =
                      null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()))
                }),
              l =
                (this && this.__assign) ||
                function () {
                  return (l =
                    Object.assign ||
                    function (t) {
                      for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var o in (e = arguments[i]))
                          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                      return t
                    }).apply(this, arguments)
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r,
              s = i(15),
              a = i(61),
              c = i(0),
              o =
                ((r = a.DataView),
                o(d, r),
                (d.prototype.destructor = function () {
                  r.prototype.destructor.call(this), (this.scrollView = null)
                }),
                (d.prototype.showItem = function (t) {
                  var e,
                    i,
                    n,
                    o = this.getRootView()
                  o &&
                    o.node &&
                    o.node.el &&
                    void 0 !== t &&
                    (e = this.getRootNode().getElementsByClassName("scroll-view")[0]) &&
                    ((i = this.config.virtual),
                    (n = this.data.getIndex(t)),
                    (o = Math.floor(n / this.config.itemsInRow)),
                    (t = Math.floor(o / e.children.length) || 0),
                    (t = e.children[o - e.children.length * t]),
                    (i || t) &&
                      ((t = t.children[n % this.config.itemsInRow]),
                      (n = parseInt(this.config.gap.toString().replace("px", ""), null)),
                      t.offsetTop >= e.clientHeight + e.scrollTop - t.clientHeight
                        ? (e.scrollTop = t.offsetTop - e.clientHeight + t.clientHeight + n)
                        : t.offsetTop < e.scrollTop - n && (e.scrollTop = t.offsetTop - n)))
                }),
                (d.prototype._renderList = function () {
                  var n = this,
                    t = this.data.getRawData(0, -1),
                    e = this.config,
                    o = e.itemsInRow,
                    i = e.css,
                    r = e.gap,
                    s = 0,
                    a = t.reduce(function (t, e, i) {
                      return (
                        0 === s && t.push([]),
                        t[t.length - 1].push(n._renderItem(e, i)),
                        (s = (s + 1) % o),
                        t
                      )
                    }, []),
                    e = a.map(function (t, e) {
                      return c.el(
                        ".dhx_dataview-row",
                        { style: { margin: r }, "aria-label": "Row " + (e + 1) },
                        t
                      )
                    }),
                    t = this.scrollView && this.scrollView.config.enable,
                    i =
                      (i || "") +
                      " dhx_widget dhx_dataview" +
                      (this.config.multiselection && this.selection.getItem()
                        ? " dhx_no-select--pointer"
                        : "") +
                      (t ? " dhx_dataview--scroll-view" : "")
                  return c.el(
                    "",
                    l(
                      l(l({}, this._handlers), {
                        dhx_widget_id: this._uid,
                        class: i,
                        style: { height: this.config.height },
                      }),
                      this.getDataViewAriaAttrs(this.config, this.data.getLength(), a.length, o)
                    ),
                    t ? [this.scrollView.render(e)] : e
                  )
                }),
                d)
            function d(t, e) {
              void 0 === e && (e = {})
              var i = r.call(this, t, e) || this
              return (
                (i.scrollView = new s.ScrollView(function () {
                  return i.getRootView()
                })),
                i.paint(),
                i
              )
            }
            e.ProDataView = o
          },
        ]),
      (o.c = n),
      (o.d = function (t, e, i) {
        o.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i })
      }),
      (o.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 })
      }),
      (o.t = function (e, t) {
        if ((1 & t && (e = o(e)), 8 & t)) return e
        if (4 & t && "object" == typeof e && e && e.__esModule) return e
        var i = Object.create(null)
        if (
          (o.r(i),
          Object.defineProperty(i, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var n in e)
            o.d(
              i,
              n,
              function (t) {
                return e[t]
              }.bind(null, n)
            )
        return i
      }),
      (o.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default
              }
            : function () {
                return t
              }
        return o.d(e, "a", e), e
      }),
      (o.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }),
      (o.p = "/codebase/"),
      o((o.s = 63))
    )
    function o(t) {
      if (n[t]) return n[t].exports
      var e = (n[t] = { i: t, l: !1, exports: {} })
      return i[t].call(e.exports, e, e.exports, o), (e.l = !0), e.exports
    }
    var i, n
  }),
  window.dhx_legacy)
) {
  if (window.dhx) for (var key in dhx) dhx_legacy[key] = dhx[key]
  ;(window.dhx = dhx_legacy), delete window.dhx_legacy
}
