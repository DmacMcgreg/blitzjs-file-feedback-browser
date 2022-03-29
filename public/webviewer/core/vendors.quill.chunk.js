/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [2],
    {
      352: function (ia, da, e) {
        ;(function (e) {
          ;(function (e, aa) {
            ia.exports = aa()
          })("undefined" !== typeof self ? self : this, function () {
            return (function (e) {
              function aa(ca) {
                if (ea[ca]) return ea[ca].exports
                var z = (ea[ca] = { i: ca, l: !1, exports: {} })
                e[ca].call(z.exports, z, z.exports, aa)
                z.l = !0
                return z.exports
              }
              var ea = {}
              aa.m = e
              aa.c = ea
              aa.d = function (e, z, w) {
                aa.o(e, z) ||
                  Object.defineProperty(e, z, { configurable: !1, enumerable: !0, get: w })
              }
              aa.n = function (e) {
                var z =
                  e && e.__esModule
                    ? function () {
                        return e["default"]
                      }
                    : function () {
                        return e
                      }
                aa.d(z, "a", z)
                return z
              }
              aa.o = function (e, z) {
                return Object.prototype.hasOwnProperty.call(e, z)
              }
              aa.p = ""
              return aa((aa.s = 109))
            })([
              function (e, aa, ha) {
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = ha(17)
                var ca = ha(18),
                  z = ha(19),
                  w = ha(45),
                  y = ha(46),
                  r = ha(47),
                  n = ha(48),
                  h = ha(49),
                  f = ha(12),
                  x = ha(32),
                  fa = ha(33),
                  ea = ha(31)
                ha = ha(1)
                aa.default = {
                  Scope: ha.Scope,
                  create: ha.create,
                  find: ha.find,
                  query: ha.query,
                  register: ha.register,
                  Container: e.default,
                  Format: ca.default,
                  Leaf: z.default,
                  Embed: n.default,
                  Scroll: w.default,
                  Block: r.default,
                  Inline: y.default,
                  Text: h.default,
                  Attributor: {
                    Attribute: f.default,
                    Class: x.default,
                    Style: fa.default,
                    Store: ea.default,
                  },
                }
              },
              function (e, aa) {
                function ea(f, e) {
                  void 0 === e && (e = !1)
                  return null == f
                    ? null
                    : null != f[aa.DATA_KEY]
                    ? f[aa.DATA_KEY].blot
                    : e
                    ? ea(f.parentNode, e)
                    : null
                }
                function ca(e, w) {
                  void 0 === w && (w = x.ANY)
                  if ("string" === typeof e) var y = f[e] || r[e]
                  else if (e instanceof Text || e.nodeType === Node.TEXT_NODE) y = f.text
                  else if ("number" === typeof e)
                    e & x.LEVEL & x.BLOCK ? (y = f.block) : e & x.LEVEL & x.INLINE && (y = f.inline)
                  else if (e instanceof HTMLElement) {
                    var z = (e.getAttribute("class") || "").split(/\s+/),
                      aa
                    for (aa in z) if ((y = n[z[aa]])) break
                    y = y || h[e.tagName]
                  }
                  return null == y ? null : w & x.LEVEL & y.scope && w & x.TYPE & y.scope ? y : null
                }
                function z() {
                  for (var e = [], w = 0; w < arguments.length; w++) e[w] = arguments[w]
                  if (1 < e.length)
                    return e.map(function (f) {
                      return z(f)
                    })
                  var x = e[0]
                  if ("string" !== typeof x.blotName && "string" !== typeof x.attrName)
                    throw new y("Invalid definition")
                  if ("abstract" === x.blotName) throw new y("Cannot register abstract class")
                  f[x.blotName || x.attrName] = x
                  "string" === typeof x.keyName
                    ? (r[x.keyName] = x)
                    : (null != x.className && (n[x.className] = x),
                      null != x.tagName &&
                        (Array.isArray(x.tagName)
                          ? (x.tagName = x.tagName.map(function (f) {
                              return f.toUpperCase()
                            }))
                          : (x.tagName = x.tagName.toUpperCase()),
                        (Array.isArray(x.tagName) ? x.tagName : [x.tagName]).forEach(function (f) {
                          if (null == h[f] || null == x.className) h[f] = x
                        })))
                  return x
                }
                var w =
                  (this && this.__extends) ||
                  (function () {
                    var f =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (f, e) {
                          f.__proto__ = e
                        }) ||
                      function (f, e) {
                        for (var h in e) e.hasOwnProperty(h) && (f[h] = e[h])
                      }
                    return function (e, h) {
                      function n() {
                        this.constructor = e
                      }
                      f(e, h)
                      e.prototype =
                        null === h ? Object.create(h) : ((n.prototype = h.prototype), new n())
                    }
                  })()
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var y = (function (f) {
                  function e(e) {
                    e = "[Parchment] " + e
                    var h = f.call(this, e) || this
                    h.message = e
                    h.name = h.constructor.name
                    return h
                  }
                  w(e, f)
                  return e
                })(Error)
                aa.ParchmentError = y
                var r = {},
                  n = {},
                  h = {},
                  f = {}
                aa.DATA_KEY = "__blot"
                var x
                ;(function (f) {
                  f[(f.TYPE = 3)] = "TYPE"
                  f[(f.LEVEL = 12)] = "LEVEL"
                  f[(f.ATTRIBUTE = 13)] = "ATTRIBUTE"
                  f[(f.BLOT = 14)] = "BLOT"
                  f[(f.INLINE = 7)] = "INLINE"
                  f[(f.BLOCK = 11)] = "BLOCK"
                  f[(f.BLOCK_BLOT = 10)] = "BLOCK_BLOT"
                  f[(f.INLINE_BLOT = 6)] = "INLINE_BLOT"
                  f[(f.BLOCK_ATTRIBUTE = 9)] = "BLOCK_ATTRIBUTE"
                  f[(f.INLINE_ATTRIBUTE = 5)] = "INLINE_ATTRIBUTE"
                  f[(f.ANY = 15)] = "ANY"
                })((x = aa.Scope || (aa.Scope = {})))
                aa.create = function (f, e) {
                  var h = ca(f)
                  if (null == h) throw new y("Unable to create " + f + " blot")
                  f = f instanceof Node || f.nodeType === Node.TEXT_NODE ? f : h.create(e)
                  return new h(f, e)
                }
                aa.find = ea
                aa.query = ca
                aa.register = z
              },
              function (e, aa, ha) {
                function ca(e) {
                  Array.isArray(e)
                    ? (this.ops = e)
                    : null != e && Array.isArray(e.ops)
                    ? (this.ops = e.ops)
                    : (this.ops = [])
                }
                var z = ha(51),
                  w = ha(11),
                  y = ha(3),
                  r = ha(20),
                  n = String.fromCharCode(0)
                ca.prototype.insert = function (e, f) {
                  var h = {}
                  if (0 === e.length) return this
                  h.insert = e
                  null != f &&
                    "object" === typeof f &&
                    0 < Object.keys(f).length &&
                    (h.attributes = f)
                  return this.push(h)
                }
                ca.prototype["delete"] = function (e) {
                  return 0 >= e ? this : this.push({ delete: e })
                }
                ca.prototype.retain = function (e, f) {
                  if (0 >= e) return this
                  e = { retain: e }
                  null != f &&
                    "object" === typeof f &&
                    0 < Object.keys(f).length &&
                    (e.attributes = f)
                  return this.push(e)
                }
                ca.prototype.push = function (e) {
                  var f = this.ops.length,
                    h = this.ops[f - 1]
                  e = y(!0, {}, e)
                  if ("object" === typeof h) {
                    if ("number" === typeof e["delete"] && "number" === typeof h["delete"])
                      return (this.ops[f - 1] = { delete: h["delete"] + e["delete"] }), this
                    if (
                      "number" === typeof h["delete"] &&
                      null != e.insert &&
                      (--f, (h = this.ops[f - 1]), "object" !== typeof h)
                    )
                      return this.ops.unshift(e), this
                    if (w(e.attributes, h.attributes)) {
                      if ("string" === typeof e.insert && "string" === typeof h.insert)
                        return (
                          (this.ops[f - 1] = { insert: h.insert + e.insert }),
                          "object" === typeof e.attributes &&
                            (this.ops[f - 1].attributes = e.attributes),
                          this
                        )
                      if ("number" === typeof e.retain && "number" === typeof h.retain)
                        return (
                          (this.ops[f - 1] = { retain: h.retain + e.retain }),
                          "object" === typeof e.attributes &&
                            (this.ops[f - 1].attributes = e.attributes),
                          this
                        )
                    }
                  }
                  f === this.ops.length ? this.ops.push(e) : this.ops.splice(f, 0, e)
                  return this
                }
                ca.prototype.chop = function () {
                  var e = this.ops[this.ops.length - 1]
                  e && e.retain && !e.attributes && this.ops.pop()
                  return this
                }
                ca.prototype.filter = function (e) {
                  return this.ops.filter(e)
                }
                ca.prototype.forEach = function (e) {
                  this.ops.forEach(e)
                }
                ca.prototype.map = function (e) {
                  return this.ops.map(e)
                }
                ca.prototype.partition = function (e) {
                  var f = [],
                    h = []
                  this.forEach(function (n) {
                    ;(e(n) ? f : h).push(n)
                  })
                  return [f, h]
                }
                ca.prototype.reduce = function (e, f) {
                  return this.ops.reduce(e, f)
                }
                ca.prototype.changeLength = function () {
                  return this.reduce(function (e, f) {
                    return f.insert ? e + r.length(f) : f.delete ? e - f.delete : e
                  }, 0)
                }
                ca.prototype.length = function () {
                  return this.reduce(function (e, f) {
                    return e + r.length(f)
                  }, 0)
                }
                ca.prototype.slice = function (e, f) {
                  e = e || 0
                  "number" !== typeof f && (f = Infinity)
                  for (var h = [], n = r.iterator(this.ops), w = 0; w < f && n.hasNext(); ) {
                    if (w < e) var y = n.next(e - w)
                    else (y = n.next(f - w)), h.push(y)
                    w += r.length(y)
                  }
                  return new ca(h)
                }
                ca.prototype.compose = function (e) {
                  var f = r.iterator(this.ops)
                  e = r.iterator(e.ops)
                  var h = [],
                    n = e.peek()
                  if (null != n && "number" === typeof n.retain && null == n.attributes) {
                    for (var y = n.retain; "insert" === f.peekType() && f.peekLength() <= y; )
                      (y -= f.peekLength()), h.push(f.next())
                    0 < n.retain - y && e.next(n.retain - y)
                  }
                  for (h = new ca(h); f.hasNext() || e.hasNext(); )
                    if ("insert" === e.peekType()) h.push(e.next())
                    else if ("delete" === f.peekType()) h.push(f.next())
                    else {
                      y = Math.min(f.peekLength(), e.peekLength())
                      var z = f.next(y),
                        aa = e.next(y)
                      if ("number" === typeof aa.retain) {
                        n = {}
                        "number" === typeof z.retain ? (n.retain = y) : (n.insert = z.insert)
                        if (
                          (y = r.attributes.compose(
                            z.attributes,
                            aa.attributes,
                            "number" === typeof z.retain
                          ))
                        )
                          n.attributes = y
                        h.push(n)
                        if (!e.hasNext() && w(h.ops[h.ops.length - 1], n))
                          return (f = new ca(f.rest())), h.concat(f).chop()
                      } else
                        "number" === typeof aa["delete"] &&
                          "number" === typeof z.retain &&
                          h.push(aa)
                    }
                  return h.chop()
                }
                ca.prototype.concat = function (e) {
                  var f = new ca(this.ops.slice())
                  0 < e.ops.length && (f.push(e.ops[0]), (f.ops = f.ops.concat(e.ops.slice(1))))
                  return f
                }
                ca.prototype.diff = function (e, f) {
                  if (this.ops === e.ops) return new ca()
                  var h = [this, e].map(function (f) {
                      return f
                        .map(function (h) {
                          if (null != h.insert) return "string" === typeof h.insert ? h.insert : n
                          throw Error(
                            "diff() called " + (f === e ? "on" : "with") + " non-document"
                          )
                        })
                        .join("")
                    }),
                    y = new ca()
                  f = z(h[0], h[1], f)
                  var aa = r.iterator(this.ops),
                    ea = r.iterator(e.ops)
                  f.forEach(function (f) {
                    for (var e = f[1].length; 0 < e; ) {
                      var h = 0
                      switch (f[0]) {
                        case z.INSERT:
                          h = Math.min(ea.peekLength(), e)
                          y.push(ea.next(h))
                          break
                        case z.DELETE:
                          h = Math.min(e, aa.peekLength())
                          aa.next(h)
                          y["delete"](h)
                          break
                        case z.EQUAL:
                          h = Math.min(aa.peekLength(), ea.peekLength(), e)
                          var n = aa.next(h),
                            x = ea.next(h)
                          if (w(n.insert, x.insert))
                            y.retain(h, r.attributes.diff(n.attributes, x.attributes))
                          else y.push(x)["delete"](h)
                      }
                      e -= h
                    }
                  })
                  return y.chop()
                }
                ca.prototype.eachLine = function (e, f) {
                  f = f || "\n"
                  for (var h = r.iterator(this.ops), n = new ca(), w = 0; h.hasNext(); ) {
                    if ("insert" !== h.peekType()) return
                    var y = h.peek(),
                      z = r.length(y) - h.peekLength()
                    y = "string" === typeof y.insert ? y.insert.indexOf(f, z) - z : -1
                    if (0 > y) n.push(h.next())
                    else if (0 < y) n.push(h.next(y))
                    else {
                      if (!1 === e(n, h.next(1).attributes || {}, w)) return
                      w += 1
                      n = new ca()
                    }
                  }
                  0 < n.length() && e(n, {}, w)
                }
                ca.prototype.transform = function (e, f) {
                  f = !!f
                  if ("number" === typeof e) return this.transformPosition(e, f)
                  var h = r.iterator(this.ops)
                  e = r.iterator(e.ops)
                  for (var n = new ca(); h.hasNext() || e.hasNext(); )
                    if ("insert" !== h.peekType() || (!f && "insert" === e.peekType()))
                      if ("insert" === e.peekType()) n.push(e.next())
                      else {
                        var w = Math.min(h.peekLength(), e.peekLength()),
                          y = h.next(w),
                          z = e.next(w)
                        y["delete"] ||
                          (z["delete"]
                            ? n.push(z)
                            : n.retain(w, r.attributes.transform(y.attributes, z.attributes, f)))
                      }
                    else n.retain(r.length(h.next()))
                  return n.chop()
                }
                ca.prototype.transformPosition = function (e, f) {
                  f = !!f
                  for (var h = r.iterator(this.ops), n = 0; h.hasNext() && n <= e; ) {
                    var w = h.peekLength(),
                      y = h.peekType()
                    h.next()
                    "delete" === y
                      ? (e -= Math.min(w, e - n))
                      : ("insert" === y && (n < e || !f) && (e += w), (n += w))
                  }
                  return e
                }
                e.exports = ca
              },
              function (e) {
                function aa(e, f) {
                  if ("__proto__" === f) {
                    if (!w.call(e, f)) return
                    if (n) return n(e, f).value
                  }
                  return e[f]
                }
                function ea(e, f) {
                  r && "__proto__" === f.name
                    ? r(e, f.name, {
                        enumerable: !0,
                        configurable: !0,
                        value: f.newValue,
                        writable: !0,
                      })
                    : (e[f.name] = f.newValue)
                }
                function ca(e) {
                  if (!e || "[object Object]" !== y.call(e)) return !1
                  var f = w.call(e, "constructor"),
                    h =
                      e.constructor &&
                      e.constructor.prototype &&
                      w.call(e.constructor.prototype, "isPrototypeOf")
                  if (e.constructor && !f && !h) return !1
                  for (var n in e);
                  return "undefined" === typeof n || w.call(e, n)
                }
                function z(e) {
                  return "function" === typeof Array.isArray
                    ? Array.isArray(e)
                    : "[object Array]" === y.call(e)
                }
                var w = Object.prototype.hasOwnProperty,
                  y = Object.prototype.toString,
                  r = Object.defineProperty,
                  n = Object.getOwnPropertyDescriptor
                e.exports = function f() {
                  var e,
                    n,
                    r = arguments[0],
                    w = 1,
                    y = arguments.length,
                    ha = !1
                  "boolean" === typeof r && ((ha = r), (r = arguments[1] || {}), (w = 2))
                  if (null == r || ("object" !== typeof r && "function" !== typeof r)) r = {}
                  for (; w < y; ++w) {
                    var ba = arguments[w]
                    if (null != ba)
                      for (e in ba) {
                        var da = aa(r, e)
                        var ia = aa(ba, e)
                        r !== ia &&
                          (ha && ia && (ca(ia) || (n = z(ia)))
                            ? (n
                                ? ((n = !1), (da = da && z(da) ? da : []))
                                : (da = da && ca(da) ? da : {}),
                              ea(r, { name: e, newValue: f(ha, da, ia) }))
                            : "undefined" !== typeof ia && ea(r, { name: e, newValue: ia }))
                      }
                  }
                  return r
                }
              },
              function (e, aa, ha) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e) {
                  if (!(f instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                function w(f, e) {
                  if (!f)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ("object" !== typeof e && "function" !== typeof e) ? f : e
                }
                function y(f, e) {
                  if ("function" !== typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof e
                    )
                  f.prototype = Object.create(e && e.prototype, {
                    constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : (f.__proto__ = e))
                }
                function r(e) {
                  var h = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
                  if (null == e) return h
                  "function" === typeof e.formats && (h = (0, f.default)(h, e.formats()))
                  return null == e.parent ||
                    "scroll" == e.parent.blotName ||
                    e.parent.statics.scope !== e.statics.scope
                    ? h
                    : r(e.parent, h)
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.default = aa.BlockEmbed = aa.bubbleFormats = void 0
                var n = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })(),
                  h = function ya(f, e, h) {
                    null === f && (f = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(f, e)
                    if (void 0 === n) {
                      if (((f = Object.getPrototypeOf(f)), null !== f)) return ya(f, e, h)
                    } else {
                      if ("value" in n) return n.value
                      e = n.get
                      return void 0 === e ? void 0 : e.call(h)
                    }
                  }
                e = ha(3)
                var f = ca(e)
                e = ha(2)
                var x = ca(e)
                e = ha(0)
                var fa = ca(e)
                e = ha(16)
                var ea = ca(e)
                e = ha(6)
                e = ca(e)
                ha = ha(7)
                ha = ca(ha)
                var ba = (function (e) {
                  function r() {
                    z(this, r)
                    return w(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments))
                  }
                  y(r, e)
                  n(r, [
                    {
                      key: "attach",
                      value: function () {
                        h(
                          r.prototype.__proto__ || Object.getPrototypeOf(r.prototype),
                          "attach",
                          this
                        ).call(this)
                        this.attributes = new fa.default.Attributor.Store(this.domNode)
                      },
                    },
                    {
                      key: "delta",
                      value: function () {
                        return new x.default().insert(
                          this.value(),
                          (0, f.default)(this.formats(), this.attributes.values())
                        )
                      },
                    },
                    {
                      key: "format",
                      value: function (f, e) {
                        f = fa.default.query(f, fa.default.Scope.BLOCK_ATTRIBUTE)
                        null != f && this.attributes.attribute(f, e)
                      },
                    },
                    {
                      key: "formatAt",
                      value: function (f, e, h, n) {
                        this.format(h, n)
                      },
                    },
                    {
                      key: "insertAt",
                      value: function (f, e, n) {
                        "string" === typeof e && e.endsWith("\n")
                          ? ((n = fa.default.create(da.blotName)),
                            this.parent.insertBefore(n, 0 === f ? this : this.next),
                            n.insertAt(0, e.slice(0, -1)))
                          : h(
                              r.prototype.__proto__ || Object.getPrototypeOf(r.prototype),
                              "insertAt",
                              this
                            ).call(this, f, e, n)
                      },
                    },
                  ])
                  return r
                })(fa.default.Embed)
                ba.scope = fa.default.Scope.BLOCK_BLOT
                var da = (function (f) {
                  function e(f) {
                    z(this, e)
                    f = w(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, f))
                    f.cache = {}
                    return f
                  }
                  y(e, f)
                  n(e, [
                    {
                      key: "delta",
                      value: function () {
                        null == this.cache.delta &&
                          (this.cache.delta = this.descendants(fa.default.Leaf)
                            .reduce(function (f, e) {
                              return 0 === e.length() ? f : f.insert(e.value(), r(e))
                            }, new x.default())
                            .insert("\n", r(this)))
                        return this.cache.delta
                      },
                    },
                    {
                      key: "deleteAt",
                      value: function (f, n) {
                        h(
                          e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                          "deleteAt",
                          this
                        ).call(this, f, n)
                        this.cache = {}
                      },
                    },
                    {
                      key: "formatAt",
                      value: function (f, n, r, w) {
                        0 >= n ||
                          (fa.default.query(r, fa.default.Scope.BLOCK)
                            ? f + n === this.length() && this.format(r, w)
                            : h(
                                e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                                "formatAt",
                                this
                              ).call(this, f, Math.min(n, this.length() - f - 1), r, w),
                          (this.cache = {}))
                      },
                    },
                    {
                      key: "insertAt",
                      value: function (f, n, r) {
                        if (null != r)
                          return h(
                            e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                            "insertAt",
                            this
                          ).call(this, f, n, r)
                        if (0 !== n.length) {
                          n = n.split("\n")
                          r = n.shift()
                          0 < r.length &&
                            (f < this.length() - 1 || null == this.children.tail
                              ? h(
                                  e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                                  "insertAt",
                                  this
                                ).call(this, Math.min(f, this.length() - 1), r)
                              : this.children.tail.insertAt(this.children.tail.length(), r),
                            (this.cache = {}))
                          var w = this
                          n.reduce(function (f, e) {
                            w = w.split(f, !0)
                            w.insertAt(0, e)
                            return e.length
                          }, f + r.length)
                        }
                      },
                    },
                    {
                      key: "insertBefore",
                      value: function (f, n) {
                        var r = this.children.head
                        h(
                          e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                          "insertBefore",
                          this
                        ).call(this, f, n)
                        r instanceof ea.default && r.remove()
                        this.cache = {}
                      },
                    },
                    {
                      key: "length",
                      value: function () {
                        null == this.cache.length &&
                          (this.cache.length =
                            h(
                              e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                              "length",
                              this
                            ).call(this) + 1)
                        return this.cache.length
                      },
                    },
                    {
                      key: "moveChildren",
                      value: function (f, n) {
                        h(
                          e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                          "moveChildren",
                          this
                        ).call(this, f, n)
                        this.cache = {}
                      },
                    },
                    {
                      key: "optimize",
                      value: function (f) {
                        h(
                          e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                          "optimize",
                          this
                        ).call(this, f)
                        this.cache = {}
                      },
                    },
                    {
                      key: "path",
                      value: function (f) {
                        return h(
                          e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                          "path",
                          this
                        ).call(this, f, !0)
                      },
                    },
                    {
                      key: "removeChild",
                      value: function (f) {
                        h(
                          e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                          "removeChild",
                          this
                        ).call(this, f)
                        this.cache = {}
                      },
                    },
                    {
                      key: "split",
                      value: function (f) {
                        var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !1
                        if (n && (0 === f || f >= this.length() - 1)) {
                          n = this.clone()
                          if (0 === f) return this.parent.insertBefore(n, this), this
                          this.parent.insertBefore(n, this.next)
                          return n
                        }
                        n = h(
                          e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                          "split",
                          this
                        ).call(this, f, n)
                        this.cache = {}
                        return n
                      },
                    },
                  ])
                  return e
                })(fa.default.Block)
                da.blotName = "block"
                da.tagName = "P"
                da.defaultChild = "break"
                da.allowedChildren = [e.default, fa.default.Embed, ha.default]
                aa.bubbleFormats = r
                aa.BlockEmbed = ba
                aa.default = da
              },
              function (e, aa, ha) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e, h) {
                  e in f
                    ? Object.defineProperty(f, e, {
                        value: h,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (f[e] = h)
                  return f
                }
                function w(f, e) {
                  e = (0, oa.default)(
                    !0,
                    { container: f, modules: { clipboard: !0, keyboard: !0, history: !0 } },
                    e
                  )
                  if (e.theme && e.theme !== qa.DEFAULTS.theme) {
                    if (((e.theme = qa.import("themes/" + e.theme)), null == e.theme))
                      throw Error("Invalid theme " + e.theme + ". Did you register it?")
                  } else e.theme = Fa.default
                  f = (0, oa.default)(!0, {}, e.theme.DEFAULTS)
                  ;[f, e].forEach(function (f) {
                    f.modules = f.modules || {}
                    Object.keys(f.modules).forEach(function (e) {
                      !0 === f.modules[e] && (f.modules[e] = {})
                    })
                  })
                  var h = Object.keys(f.modules)
                    .concat(Object.keys(e.modules))
                    .reduce(function (f, e) {
                      var h = qa.import("modules/" + e)
                      null == h
                        ? ua.error("Cannot load " + e + " module. Are you sure you registered it?")
                        : (f[e] = h.DEFAULTS || {})
                      return f
                    }, {})
                  null != e.modules &&
                    e.modules.toolbar &&
                    e.modules.toolbar.constructor !== Object &&
                    (e.modules.toolbar = { container: e.modules.toolbar })
                  e = (0, oa.default)(!0, {}, qa.DEFAULTS, { modules: h }, f, e)
                  ;["bounds", "container", "scrollingContainer"].forEach(function (f) {
                    "string" === typeof e[f] && (e[f] = document.querySelector(e[f]))
                  })
                  e.modules = Object.keys(e.modules).reduce(function (f, h) {
                    e.modules[h] && (f[h] = e.modules[h])
                    return f
                  }, {})
                  return e
                }
                function y(f, e, h, r) {
                  if (this.options.strict && !this.isEnabled() && e === ba.default.sources.USER)
                    return new fa.default()
                  var w = null == h ? null : this.getSelection(),
                    x = this.editor.delta
                  f = f()
                  null != w &&
                    (!0 === h && (h = w.index),
                    null == r ? (w = n(w, f, e)) : 0 !== r && (w = n(w, h, r, e)),
                    this.setSelection(w, ba.default.sources.SILENT))
                  if (0 < f.length()) {
                    var y
                    h = [ba.default.events.TEXT_CHANGE, f, x, e]
                    ;(y = this.emitter).emit.apply(y, [ba.default.events.EDITOR_CHANGE].concat(h))
                    if (e !== ba.default.sources.SILENT) {
                      var z
                      ;(z = this.emitter).emit.apply(z, h)
                    }
                  }
                  return f
                }
                function r(f, e, n, r, w) {
                  var x = {}
                  "number" === typeof f.index && "number" === typeof f.length
                    ? ("number" !== typeof e
                        ? ((w = r), (r = n), (n = e), (e = f.length))
                        : (e = f.length),
                      (f = f.index))
                    : "number" !== typeof e && ((w = r), (r = n), (n = e), (e = 0))
                  "object" === ("undefined" === typeof n ? "undefined" : h(n))
                    ? ((x = n), (w = r))
                    : "string" === typeof n && (null != r ? (x[n] = r) : (w = n))
                  w = w || ba.default.sources.API
                  return [f, e, x, w]
                }
                function n(e, h, n, r) {
                  if (null == e) return null
                  var w = void 0,
                    x = void 0
                  h instanceof fa.default
                    ? ((w = [e.index, e.index + e.length].map(function (f) {
                        return h.transformPosition(f, r !== ba.default.sources.USER)
                      })),
                      (e = f(w, 2)),
                      (w = e[0]),
                      (x = e[1]))
                    : ((w = [e.index, e.index + e.length].map(function (f) {
                        return f < h || (f === h && r === ba.default.sources.USER)
                          ? f
                          : 0 <= n
                          ? f + n
                          : Math.max(h, f + n)
                      })),
                      (e = f(w, 2)),
                      (w = e[0]),
                      (x = e[1]))
                  return new la.Range(w, x - w)
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.default = aa.overload = aa.expandConfig = void 0
                var h =
                    "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
                      ? function (f) {
                          return typeof f
                        }
                      : function (f) {
                          return f &&
                            "function" === typeof Symbol &&
                            f.constructor === Symbol &&
                            f !== Symbol.prototype
                            ? "symbol"
                            : typeof f
                        },
                  f = (function () {
                    return function (f, e) {
                      if (Array.isArray(f)) return f
                      if (Symbol.iterator in Object(f)) {
                        var h = [],
                          n = !0,
                          r = !1,
                          w = void 0
                        try {
                          for (
                            var x = f[Symbol.iterator](), y;
                            !(n = (y = x.next()).done) && (h.push(y.value), !e || h.length !== e);
                            n = !0
                          );
                        } catch (Ca) {
                          ;(r = !0), (w = Ca)
                        } finally {
                          try {
                            if (!n && x["return"]) x["return"]()
                          } finally {
                            if (r) throw w
                          }
                        }
                        return h
                      }
                      throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                  })(),
                  x = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })()
                ha(50)
                e = ha(2)
                var fa = ca(e)
                e = ha(14)
                var ea = ca(e)
                e = ha(8)
                var ba = ca(e)
                e = ha(9)
                e = ca(e)
                var da = ha(0),
                  ia = ca(da),
                  la = ha(15),
                  ra = ca(la)
                da = ha(3)
                var oa = ca(da)
                da = ha(10)
                var ya = ca(da)
                ha = ha(34)
                var Fa = ca(ha),
                  ua = (0, ya.default)("quill"),
                  qa = (function () {
                    function e(f) {
                      var h = this,
                        n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
                      if (!(this instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                      this.options = w(f, n)
                      this.container = this.options.container
                      if (null == this.container) return ua.error("Invalid Quill container", f)
                      this.options.debug && e.debug(this.options.debug)
                      n = this.container.innerHTML.trim()
                      this.container.classList.add("ql-container")
                      this.container.innerHTML = ""
                      this.container.__quill = this
                      this.root = this.addContainer("ql-editor")
                      this.root.classList.add("ql-blank")
                      this.root.setAttribute("data-gramm", !1)
                      this.scrollingContainer = this.options.scrollingContainer || this.root
                      this.emitter = new ba.default()
                      this.scroll = ia.default.create(this.root, {
                        emitter: this.emitter,
                        whitelist: this.options.formats,
                      })
                      this.editor = new ea.default(this.scroll)
                      this.selection = new ra.default(this.scroll, this.emitter)
                      this.theme = new this.options.theme(this, this.options)
                      this.keyboard = this.theme.addModule("keyboard")
                      this.clipboard = this.theme.addModule("clipboard")
                      this.history = this.theme.addModule("history")
                      this.theme.init()
                      this.emitter.on(ba.default.events.EDITOR_CHANGE, function (f) {
                        f === ba.default.events.TEXT_CHANGE &&
                          h.root.classList.toggle("ql-blank", h.editor.isBlank())
                      })
                      this.emitter.on(ba.default.events.SCROLL_UPDATE, function (f, e) {
                        var n = h.selection.lastRange,
                          r = n && 0 === n.length ? n.index : void 0
                        y.call(
                          h,
                          function () {
                            return h.editor.update(null, e, r)
                          },
                          f
                        )
                      })
                      n = this.clipboard.convert(
                        "<div class='ql-editor' style=\"white-space: normal;\">" +
                          n +
                          "<p><br></p></div>"
                      )
                      this.setContents(n)
                      this.history.clear()
                      this.options.placeholder &&
                        this.root.setAttribute("data-placeholder", this.options.placeholder)
                      this.options.readOnly && this.disable()
                    }
                    x(e, null, [
                      {
                        key: "debug",
                        value: function (f) {
                          !0 === f && (f = "log")
                          ya.default.level(f)
                        },
                      },
                      {
                        key: "find",
                        value: function (f) {
                          return f.__quill || ia.default.find(f)
                        },
                      },
                      {
                        key: "import",
                        value: function (f) {
                          null == this.imports[f] &&
                            ua.error("Cannot import " + f + ". Are you sure it was registered?")
                          return this.imports[f]
                        },
                      },
                      {
                        key: "register",
                        value: function (f, e) {
                          var h = this,
                            n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !1
                          "string" !== typeof f
                            ? ((n = f.attrName || f.blotName),
                              "string" === typeof n
                                ? this.register("formats/" + n, f, e)
                                : Object.keys(f).forEach(function (n) {
                                    h.register(n, f[n], e)
                                  }))
                            : (null == this.imports[f] ||
                                n ||
                                ua.warn("Overwriting " + f + " with", e),
                              (this.imports[f] = e),
                              (f.startsWith("blots/") || f.startsWith("formats/")) &&
                              "abstract" !== e.blotName
                                ? ia.default.register(e)
                                : f.startsWith("modules") &&
                                  "function" === typeof e.register &&
                                  e.register())
                        },
                      },
                    ])
                    x(e, [
                      {
                        key: "addContainer",
                        value: function (f) {
                          var e =
                            1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null
                          if ("string" === typeof f) {
                            var h = f
                            f = document.createElement("div")
                            f.classList.add(h)
                          }
                          this.container.insertBefore(f, e)
                          return f
                        },
                      },
                      {
                        key: "blur",
                        value: function () {
                          this.selection.setRange(null)
                        },
                      },
                      {
                        key: "deleteText",
                        value: function (e, h, n) {
                          var w = this
                          n = r(e, h, n)
                          n = f(n, 4)
                          e = n[0]
                          h = n[1]
                          n = n[3]
                          return y.call(
                            this,
                            function () {
                              return w.editor.deleteText(e, h)
                            },
                            n,
                            e,
                            -1 * h
                          )
                        },
                      },
                      {
                        key: "disable",
                        value: function () {
                          this.enable(!1)
                        },
                      },
                      {
                        key: "enable",
                        value: function () {
                          var f =
                            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : !0
                          this.scroll.enable(f)
                          this.container.classList.toggle("ql-disabled", !f)
                        },
                      },
                      {
                        key: "focus",
                        value: function () {
                          var f = this.scrollingContainer.scrollTop
                          this.selection.focus()
                          this.scrollingContainer.scrollTop = f
                          this.scrollIntoView()
                        },
                      },
                      {
                        key: "format",
                        value: function (f, e) {
                          var h = this
                          return y.call(
                            this,
                            function () {
                              var n = h.getSelection(!0),
                                r = new fa.default()
                              if (null == n) return r
                              if (ia.default.query(f, ia.default.Scope.BLOCK))
                                r = h.editor.formatLine(n.index, n.length, z({}, f, e))
                              else {
                                if (0 === n.length) return h.selection.format(f, e), r
                                r = h.editor.formatText(n.index, n.length, z({}, f, e))
                              }
                              h.setSelection(n, ba.default.sources.SILENT)
                              return r
                            },
                            2 < arguments.length && void 0 !== arguments[2]
                              ? arguments[2]
                              : ba.default.sources.API
                          )
                        },
                      },
                      {
                        key: "formatLine",
                        value: function (e, h, n, w, x) {
                          var z = this,
                            aa = void 0
                          n = r(e, h, n, w, x)
                          n = f(n, 4)
                          e = n[0]
                          h = n[1]
                          aa = n[2]
                          x = n[3]
                          return y.call(
                            this,
                            function () {
                              return z.editor.formatLine(e, h, aa)
                            },
                            x,
                            e,
                            0
                          )
                        },
                      },
                      {
                        key: "formatText",
                        value: function (e, h, n, w, x) {
                          var z = this,
                            aa = void 0
                          n = r(e, h, n, w, x)
                          n = f(n, 4)
                          e = n[0]
                          h = n[1]
                          aa = n[2]
                          x = n[3]
                          return y.call(
                            this,
                            function () {
                              return z.editor.formatText(e, h, aa)
                            },
                            x,
                            e,
                            0
                          )
                        },
                      },
                      {
                        key: "getBounds",
                        value: function (f) {
                          var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0
                          e =
                            "number" === typeof f
                              ? this.selection.getBounds(f, e)
                              : this.selection.getBounds(f.index, f.length)
                          var h = this.container.getBoundingClientRect()
                          return {
                            bottom: e.bottom - h.top,
                            height: e.height,
                            left: e.left - h.left,
                            right: e.right - h.left,
                            top: e.top - h.top,
                            width: e.width,
                          }
                        },
                      },
                      {
                        key: "getContents",
                        value: function () {
                          var e =
                              0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                            h =
                              1 < arguments.length && void 0 !== arguments[1]
                                ? arguments[1]
                                : this.getLength() - e
                          e = r(e, h)
                          h = f(e, 2)
                          e = h[0]
                          h = h[1]
                          return this.editor.getContents(e, h)
                        },
                      },
                      {
                        key: "getFormat",
                        value: function () {
                          var f =
                              0 < arguments.length && void 0 !== arguments[0]
                                ? arguments[0]
                                : this.getSelection(!0),
                            e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0
                          return "number" === typeof f
                            ? this.editor.getFormat(f, e)
                            : this.editor.getFormat(f.index, f.length)
                        },
                      },
                      {
                        key: "getIndex",
                        value: function (f) {
                          return f.offset(this.scroll)
                        },
                      },
                      {
                        key: "getLength",
                        value: function () {
                          return this.scroll.length()
                        },
                      },
                      {
                        key: "getLeaf",
                        value: function (f) {
                          return this.scroll.leaf(f)
                        },
                      },
                      {
                        key: "getLine",
                        value: function (f) {
                          return this.scroll.line(f)
                        },
                      },
                      {
                        key: "getLines",
                        value: function () {
                          var f =
                              0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                            e =
                              1 < arguments.length && void 0 !== arguments[1]
                                ? arguments[1]
                                : Number.MAX_VALUE
                          return "number" !== typeof f
                            ? this.scroll.lines(f.index, f.length)
                            : this.scroll.lines(f, e)
                        },
                      },
                      {
                        key: "getModule",
                        value: function (f) {
                          return this.theme.modules[f]
                        },
                      },
                      {
                        key: "getSelection",
                        value: function () {
                          0 < arguments.length &&
                            void 0 !== arguments[0] &&
                            arguments[0] &&
                            this.focus()
                          this.update()
                          return this.selection.getRange()[0]
                        },
                      },
                      {
                        key: "getText",
                        value: function () {
                          var e =
                              0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                            h =
                              1 < arguments.length && void 0 !== arguments[1]
                                ? arguments[1]
                                : this.getLength() - e
                          e = r(e, h)
                          h = f(e, 2)
                          e = h[0]
                          h = h[1]
                          return this.editor.getText(e, h)
                        },
                      },
                      {
                        key: "hasFocus",
                        value: function () {
                          return this.selection.hasFocus()
                        },
                      },
                      {
                        key: "insertEmbed",
                        value: function (f, h, n) {
                          var r = this
                          return y.call(
                            this,
                            function () {
                              return r.editor.insertEmbed(f, h, n)
                            },
                            3 < arguments.length && void 0 !== arguments[3]
                              ? arguments[3]
                              : e.sources.API,
                            f
                          )
                        },
                      },
                      {
                        key: "insertText",
                        value: function (e, h, n, w, x) {
                          var z = this,
                            aa = void 0
                          n = r(e, 0, n, w, x)
                          n = f(n, 4)
                          e = n[0]
                          aa = n[2]
                          x = n[3]
                          return y.call(
                            this,
                            function () {
                              return z.editor.insertText(e, h, aa)
                            },
                            x,
                            e,
                            h.length
                          )
                        },
                      },
                      {
                        key: "isEnabled",
                        value: function () {
                          return !this.container.classList.contains("ql-disabled")
                        },
                      },
                      {
                        key: "off",
                        value: function () {
                          return this.emitter.off.apply(this.emitter, arguments)
                        },
                      },
                      {
                        key: "on",
                        value: function () {
                          return this.emitter.on.apply(this.emitter, arguments)
                        },
                      },
                      {
                        key: "once",
                        value: function () {
                          return this.emitter.once.apply(this.emitter, arguments)
                        },
                      },
                      {
                        key: "pasteHTML",
                        value: function (f, e, h) {
                          this.clipboard.dangerouslyPasteHTML(f, e, h)
                        },
                      },
                      {
                        key: "removeFormat",
                        value: function (e, h, n) {
                          var w = this
                          n = r(e, h, n)
                          n = f(n, 4)
                          e = n[0]
                          h = n[1]
                          n = n[3]
                          return y.call(
                            this,
                            function () {
                              return w.editor.removeFormat(e, h)
                            },
                            n,
                            e
                          )
                        },
                      },
                      {
                        key: "scrollIntoView",
                        value: function () {
                          this.selection.scrollIntoView(this.scrollingContainer)
                        },
                      },
                      {
                        key: "setContents",
                        value: function (f) {
                          var e = this
                          return y.call(
                            this,
                            function () {
                              f = new fa.default(f)
                              var h = e.getLength()
                              h = e.editor.deleteText(0, h)
                              var n = e.editor.applyDelta(f),
                                r = n.ops[n.ops.length - 1]
                              null != r &&
                                "string" === typeof r.insert &&
                                "\n" === r.insert[r.insert.length - 1] &&
                                (e.editor.deleteText(e.getLength() - 1, 1), n.delete(1))
                              return h.compose(n)
                            },
                            1 < arguments.length && void 0 !== arguments[1]
                              ? arguments[1]
                              : ba.default.sources.API
                          )
                        },
                      },
                      {
                        key: "setSelection",
                        value: function (h, n, w) {
                          null == h
                            ? this.selection.setRange(null, n || e.sources.API)
                            : ((h = r(h, n, w)),
                              (w = f(h, 4)),
                              (h = w[0]),
                              (n = w[1]),
                              (w = w[3]),
                              this.selection.setRange(new la.Range(h, n), w),
                              w !== ba.default.sources.SILENT &&
                                this.selection.scrollIntoView(this.scrollingContainer))
                        },
                      },
                      {
                        key: "setText",
                        value: function (f) {
                          var e =
                              1 < arguments.length && void 0 !== arguments[1]
                                ? arguments[1]
                                : ba.default.sources.API,
                            h = new fa.default().insert(f)
                          return this.setContents(h, e)
                        },
                      },
                      {
                        key: "update",
                        value: function () {
                          var f =
                              0 < arguments.length && void 0 !== arguments[0]
                                ? arguments[0]
                                : ba.default.sources.USER,
                            e = this.scroll.update(f)
                          this.selection.update(f)
                          return e
                        },
                      },
                      {
                        key: "updateContents",
                        value: function (f) {
                          var e = this,
                            h =
                              1 < arguments.length && void 0 !== arguments[1]
                                ? arguments[1]
                                : ba.default.sources.API
                          return y.call(
                            this,
                            function () {
                              f = new fa.default(f)
                              return e.editor.applyDelta(f, h)
                            },
                            h,
                            !0
                          )
                        },
                      },
                    ])
                    return e
                  })()
                qa.DEFAULTS = {
                  bounds: null,
                  formats: null,
                  modules: {},
                  placeholder: "",
                  readOnly: !1,
                  scrollingContainer: null,
                  strict: !0,
                  theme: "default",
                }
                qa.events = ba.default.events
                qa.sources = ba.default.sources
                qa.version = "1.3.7"
                qa.imports = {
                  delta: fa.default,
                  parchment: ia.default,
                  "core/module": e.default,
                  "core/theme": Fa.default,
                }
                aa.expandConfig = w
                aa.overload = r
                aa.default = qa
              },
              function (e, aa, ba) {
                function ca(e, n) {
                  if ("function" !== typeof n && null !== n)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof n
                    )
                  e.prototype = Object.create(n && n.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : (e.__proto__ = n))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var z = (function () {
                    function e(e, h) {
                      for (var f = 0; f < h.length; f++) {
                        var n = h[f]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(e, n.key, n)
                      }
                    }
                    return function (n, h, f) {
                      h && e(n.prototype, h)
                      f && e(n, f)
                      return n
                    }
                  })(),
                  w = function x(e, h, f) {
                    null === e && (e = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(e, h)
                    if (void 0 === n) {
                      if (((e = Object.getPrototypeOf(e)), null !== e)) return x(e, h, f)
                    } else {
                      if ("value" in n) return n.value
                      h = n.get
                      return void 0 === h ? void 0 : h.call(f)
                    }
                  }
                e = (e = ba(7)) && e.__esModule ? e : { default: e }
                var y = (ba = ba(0)) && ba.__esModule ? ba : { default: ba }
                ba = (function (e) {
                  function h() {
                    if (!(this instanceof h))
                      throw new TypeError("Cannot call a class as a function")
                    var f = (h.__proto__ || Object.getPrototypeOf(h)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !f || ("object" !== typeof f && "function" !== typeof f) ? this : f
                  }
                  ca(h, e)
                  z(
                    h,
                    [
                      {
                        key: "formatAt",
                        value: function (f, e, n, z) {
                          0 > h.compare(this.statics.blotName, n) &&
                          y.default.query(n, y.default.Scope.BLOT)
                            ? ((f = this.isolate(f, e)), z && f.wrap(n, z))
                            : w(
                                h.prototype.__proto__ || Object.getPrototypeOf(h.prototype),
                                "formatAt",
                                this
                              ).call(this, f, e, n, z)
                        },
                      },
                      {
                        key: "optimize",
                        value: function (f) {
                          w(
                            h.prototype.__proto__ || Object.getPrototypeOf(h.prototype),
                            "optimize",
                            this
                          ).call(this, f)
                          this.parent instanceof h &&
                            0 < h.compare(this.statics.blotName, this.parent.statics.blotName) &&
                            ((f = this.parent.isolate(this.offset(), this.length())),
                            this.moveChildren(f),
                            f.wrap(this))
                        },
                      },
                    ],
                    [
                      {
                        key: "compare",
                        value: function (f, e) {
                          var n = h.order.indexOf(f),
                            w = h.order.indexOf(e)
                          return 0 <= n || 0 <= w ? n - w : f === e ? 0 : f < e ? -1 : 1
                        },
                      },
                    ]
                  )
                  return h
                })(y.default.Inline)
                ba.allowedChildren = [ba, y.default.Embed, e.default]
                ba.order = "cursor inline underline strike italic bold script link code".split(" ")
                aa.default = ba
              },
              function (e, aa, ba) {
                function ca(e, w) {
                  if ("function" !== typeof w && null !== w)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof w
                    )
                  e.prototype = Object.create(w && w.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  w && (Object.setPrototypeOf ? Object.setPrototypeOf(e, w) : (e.__proto__ = w))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = (function (e) {
                  function w() {
                    if (!(this instanceof w))
                      throw new TypeError("Cannot call a class as a function")
                    var e = (w.__proto__ || Object.getPrototypeOf(w)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e || ("object" !== typeof e && "function" !== typeof e) ? this : e
                  }
                  ca(w, e)
                  return w
                })(
                  (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(0)).default.Text
                )
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(e, n) {
                  if ("function" !== typeof n && null !== n)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof n
                    )
                  e.prototype = Object.create(n && n.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : (e.__proto__ = n))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var z = (function () {
                    function e(e, h) {
                      for (var f = 0; f < h.length; f++) {
                        var n = h[f]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(e, n.key, n)
                      }
                    }
                    return function (n, h, f) {
                      h && e(n.prototype, h)
                      f && e(n, f)
                      return n
                    }
                  })(),
                  w = function x(e, h, f) {
                    null === e && (e = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(e, h)
                    if (void 0 === n) {
                      if (((e = Object.getPrototypeOf(e)), null !== e)) return x(e, h, f)
                    } else {
                      if ("value" in n) return n.value
                      h = n.get
                      return void 0 === h ? void 0 : h.call(f)
                    }
                  }
                e = (e = ba(54)) && e.__esModule ? e : { default: e }
                ba = (ba = ba(10)) && ba.__esModule ? ba : { default: ba }
                var y = (0, ba.default)("quill:events")
                ;["selectionchange", "mousedown", "mouseup", "click"].forEach(function (e) {
                  document.addEventListener(e, function () {
                    for (var e = arguments.length, f = Array(e), n = 0; n < e; n++)
                      f[n] = arguments[n]
                    ;[].slice
                      .call(document.querySelectorAll(".ql-container"))
                      .forEach(function (e) {
                        if (e.__quill && e.__quill.emitter) {
                          var h
                          ;(h = e.__quill.emitter).handleDOM.apply(h, f)
                        }
                      })
                  })
                })
                ba = (function (e) {
                  function h() {
                    if (!(this instanceof h))
                      throw new TypeError("Cannot call a class as a function")
                    var f = (h.__proto__ || Object.getPrototypeOf(h)).call(this)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    f = !f || ("object" !== typeof f && "function" !== typeof f) ? this : f
                    f.listeners = {}
                    f.on("error", y.error)
                    return f
                  }
                  ca(h, e)
                  z(h, [
                    {
                      key: "emit",
                      value: function () {
                        y.log.apply(y, arguments)
                        w(
                          h.prototype.__proto__ || Object.getPrototypeOf(h.prototype),
                          "emit",
                          this
                        ).apply(this, arguments)
                      },
                    },
                    {
                      key: "handleDOM",
                      value: function (f) {
                        for (
                          var e = arguments.length, h = Array(1 < e ? e - 1 : 0), n = 1;
                          n < e;
                          n++
                        )
                          h[n - 1] = arguments[n]
                        ;(this.listeners[f.type] || []).forEach(function (e) {
                          var n = e.node
                          e = e.handler
                          ;(f.target === n || n.contains(f.target)) &&
                            e.apply(void 0, [f].concat(h))
                        })
                      },
                    },
                    {
                      key: "listenDOM",
                      value: function (f, e, h) {
                        this.listeners[f] || (this.listeners[f] = [])
                        this.listeners[f].push({ node: e, handler: h })
                      },
                    },
                  ])
                  return h
                })(e.default)
                ba.events = {
                  EDITOR_CHANGE: "editor-change",
                  SCROLL_BEFORE_UPDATE: "scroll-before-update",
                  SCROLL_OPTIMIZE: "scroll-optimize",
                  SCROLL_UPDATE: "scroll-update",
                  SELECTION_CHANGE: "selection-change",
                  TEXT_CHANGE: "text-change",
                }
                ba.sources = { API: "api", SILENT: "silent", USER: "user" }
                aa.default = ba
              },
              function (e, aa) {
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = function z(e) {
                  var w = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
                  if (!(this instanceof z)) throw new TypeError("Cannot call a class as a function")
                  this.quill = e
                  this.options = w
                }
                e.DEFAULTS = {}
                aa.default = e
              },
              function (e, aa) {
                function ea(e) {
                  if (z.indexOf(e) <= z.indexOf(w)) {
                    for (
                      var r, n = arguments.length, h = Array(1 < n ? n - 1 : 0), f = 1;
                      f < n;
                      f++
                    )
                      h[f - 1] = arguments[f]
                    ;(r = console)[e].apply(r, h)
                  }
                }
                function ca(e) {
                  return z.reduce(function (r, n) {
                    r[n] = ea.bind(console, n, e)
                    return r
                  }, {})
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var z = ["error", "warn", "log", "info"],
                  w = "warn"
                ea.level = ca.level = function (e) {
                  w = e
                }
                aa.default = ca
              },
              function (e, aa, ba) {
                function ca(e) {
                  return !e ||
                    "object" !== typeof e ||
                    "number" !== typeof e.length ||
                    "function" !== typeof e.copy ||
                    "function" !== typeof e.slice ||
                    (0 < e.length && "number" !== typeof e[0])
                    ? !1
                    : !0
                }
                function z(e, f, x) {
                  var h
                  if (
                    null === e ||
                    void 0 === e ||
                    null === f ||
                    void 0 === f ||
                    e.prototype !== f.prototype
                  )
                    return !1
                  if (r(e)) {
                    if (!r(f)) return !1
                    e = w.call(e)
                    f = w.call(f)
                    return n(e, f, x)
                  }
                  if (ca(e)) {
                    if (!ca(f) || e.length !== f.length) return !1
                    for (h = 0; h < e.length; h++) if (e[h] !== f[h]) return !1
                    return !0
                  }
                  try {
                    var z = y(e)
                    var aa = y(f)
                  } catch (na) {
                    return !1
                  }
                  if (z.length != aa.length) return !1
                  z.sort()
                  aa.sort()
                  for (h = z.length - 1; 0 <= h; h--) if (z[h] != aa[h]) return !1
                  for (h = z.length - 1; 0 <= h; h--)
                    if (((aa = z[h]), !n(e[aa], f[aa], x))) return !1
                  return typeof e === typeof f
                }
                var w = Array.prototype.slice,
                  y = ba(52),
                  r = ba(53),
                  n = (e.exports = function (e, f, n) {
                    n || (n = {})
                    return e === f
                      ? !0
                      : e instanceof Date && f instanceof Date
                      ? e.getTime() === f.getTime()
                      : !e || !f || ("object" != typeof e && "object" != typeof f)
                      ? n.strict
                        ? e === f
                        : e == f
                      : z(e, f, n)
                  })
              },
              function (e, aa, ba) {
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var ca = ba(1)
                e = (function () {
                  function e(e, y, r) {
                    void 0 === r && (r = {})
                    this.attrName = e
                    this.keyName = y
                    e = ca.Scope.TYPE & ca.Scope.ATTRIBUTE
                    this.scope =
                      null != r.scope ? (r.scope & ca.Scope.LEVEL) | e : ca.Scope.ATTRIBUTE
                    null != r.whitelist && (this.whitelist = r.whitelist)
                  }
                  e.keys = function (e) {
                    return [].map.call(e.attributes, function (e) {
                      return e.name
                    })
                  }
                  e.prototype.add = function (e, y) {
                    if (!this.canAdd(e, y)) return !1
                    e.setAttribute(this.keyName, y)
                    return !0
                  }
                  e.prototype.canAdd = function (e, y) {
                    return null == ca.query(e, ca.Scope.BLOT & (this.scope | ca.Scope.TYPE))
                      ? !1
                      : null == this.whitelist
                      ? !0
                      : "string" === typeof y
                      ? -1 < this.whitelist.indexOf(y.replace(/["']/g, ""))
                      : -1 < this.whitelist.indexOf(y)
                  }
                  e.prototype.remove = function (e) {
                    e.removeAttribute(this.keyName)
                  }
                  e.prototype.value = function (e) {
                    var w = e.getAttribute(this.keyName)
                    return this.canAdd(e, w) && w ? w : ""
                  }
                  return e
                })()
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e) {
                  if (!(f instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                function w(f, e) {
                  if (!f)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ("object" !== typeof e && "function" !== typeof e) ? f : e
                }
                function y(f, e) {
                  if ("function" !== typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof e
                    )
                  f.prototype = Object.create(e && e.prototype, {
                    constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : (f.__proto__ = e))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.default = aa.Code = void 0
                var r = (function () {
                    return function (f, e) {
                      if (Array.isArray(f)) return f
                      if (Symbol.iterator in Object(f)) {
                        var h = [],
                          n = !0,
                          r = !1,
                          w = void 0
                        try {
                          for (
                            var x = f[Symbol.iterator](), y;
                            !(n = (y = x.next()).done) && (h.push(y.value), !e || h.length !== e);
                            n = !0
                          );
                        } catch (ua) {
                          ;(r = !0), (w = ua)
                        } finally {
                          try {
                            if (!n && x["return"]) x["return"]()
                          } finally {
                            if (r) throw w
                          }
                        }
                        return h
                      }
                      throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                  })(),
                  n = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })(),
                  h = function ra(f, e, h) {
                    null === f && (f = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(f, e)
                    if (void 0 === n) {
                      if (((f = Object.getPrototypeOf(f)), null !== f)) return ra(f, e, h)
                    } else {
                      if ("value" in n) return n.value
                      e = n.get
                      return void 0 === e ? void 0 : e.call(h)
                    }
                  }
                e = ba(2)
                var f = ca(e)
                e = ba(0)
                var x = ca(e)
                e = ba(4)
                e = ca(e)
                var fa = ba(6)
                fa = ca(fa)
                ba = ba(7)
                var ea = ca(ba)
                ba = (function (f) {
                  function e() {
                    z(this, e)
                    return w(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
                  }
                  y(e, f)
                  return e
                })(fa.default)
                ba.blotName = "code"
                ba.tagName = "CODE"
                e = (function (e) {
                  function aa() {
                    z(this, aa)
                    return w(
                      this,
                      (aa.__proto__ || Object.getPrototypeOf(aa)).apply(this, arguments)
                    )
                  }
                  y(aa, e)
                  n(
                    aa,
                    [
                      {
                        key: "delta",
                        value: function () {
                          var e = this,
                            h = this.domNode.textContent
                          h.endsWith("\n") && (h = h.slice(0, -1))
                          return h.split("\n").reduce(function (f, h) {
                            return f.insert(h).insert("\n", e.formats())
                          }, new f.default())
                        },
                      },
                      {
                        key: "format",
                        value: function (f, e) {
                          if (f !== this.statics.blotName || !e) {
                            var n = this.descendant(ea.default, this.length() - 1)
                            n = r(n, 1)[0]
                            null != n && n.deleteAt(n.length() - 1, 1)
                            h(
                              aa.prototype.__proto__ || Object.getPrototypeOf(aa.prototype),
                              "format",
                              this
                            ).call(this, f, e)
                          }
                        },
                      },
                      {
                        key: "formatAt",
                        value: function (f, e, h, n) {
                          if (
                            0 !== e &&
                            null != x.default.query(h, x.default.Scope.BLOCK) &&
                            (h !== this.statics.blotName ||
                              n !== this.statics.formats(this.domNode))
                          ) {
                            var r = this.newlineIndex(f)
                            if (!(0 > r || r >= f + e)) {
                              var w = this.newlineIndex(f, !0) + 1
                              r = r - w + 1
                              var y = this.isolate(w, r),
                                z = y.next
                              y.format(h, n)
                              z instanceof aa && z.formatAt(0, f - w + e - r, h, n)
                            }
                          }
                        },
                      },
                      {
                        key: "insertAt",
                        value: function (f, e, h) {
                          null == h &&
                            ((f = this.descendant(ea.default, f)),
                            (f = r(f, 2)),
                            f[0].insertAt(f[1], e))
                        },
                      },
                      {
                        key: "length",
                        value: function () {
                          var f = this.domNode.textContent.length
                          return this.domNode.textContent.endsWith("\n") ? f : f + 1
                        },
                      },
                      {
                        key: "newlineIndex",
                        value: function (f) {
                          if (1 < arguments.length && void 0 !== arguments[1] && arguments[1])
                            return this.domNode.textContent.slice(0, f).lastIndexOf("\n")
                          var e = this.domNode.textContent.slice(f).indexOf("\n")
                          return -1 < e ? f + e : -1
                        },
                      },
                      {
                        key: "optimize",
                        value: function (f) {
                          this.domNode.textContent.endsWith("\n") ||
                            this.appendChild(x.default.create("text", "\n"))
                          h(
                            aa.prototype.__proto__ || Object.getPrototypeOf(aa.prototype),
                            "optimize",
                            this
                          ).call(this, f)
                          var e = this.next
                          null != e &&
                            e.prev === this &&
                            e.statics.blotName === this.statics.blotName &&
                            this.statics.formats(this.domNode) === e.statics.formats(e.domNode) &&
                            (e.optimize(f), e.moveChildren(this), e.remove())
                        },
                      },
                      {
                        key: "replace",
                        value: function (f) {
                          h(
                            aa.prototype.__proto__ || Object.getPrototypeOf(aa.prototype),
                            "replace",
                            this
                          ).call(this, f)
                          ;[].slice.call(this.domNode.querySelectorAll("*")).forEach(function (f) {
                            var e = x.default.find(f)
                            null == e
                              ? f.parentNode.removeChild(f)
                              : e instanceof x.default.Embed
                              ? e.remove()
                              : e.unwrap()
                          })
                        },
                      },
                    ],
                    [
                      {
                        key: "create",
                        value: function (f) {
                          f = h(aa.__proto__ || Object.getPrototypeOf(aa), "create", this).call(
                            this,
                            f
                          )
                          f.setAttribute("spellcheck", !1)
                          return f
                        },
                      },
                      {
                        key: "formats",
                        value: function () {
                          return !0
                        },
                      },
                    ]
                  )
                  return aa
                })(e.default)
                e.blotName = "code-block"
                e.tagName = "PRE"
                e.TAB = "  "
                aa.Code = ba
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e, h) {
                  e in f
                    ? Object.defineProperty(f, e, {
                        value: h,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (f[e] = h)
                  return f
                }
                function w(f, e) {
                  return Object.keys(e).reduce(function (h, n) {
                    if (null == f[n]) return h
                    e[n] === f[n]
                      ? (h[n] = e[n])
                      : Array.isArray(e[n])
                      ? 0 > e[n].indexOf(f[n]) && (h[n] = e[n].concat([f[n]]))
                      : (h[n] = [e[n], f[n]])
                    return h
                  }, {})
                }
                function y(e) {
                  return e.reduce(function (f, e) {
                    if (1 === e.insert) {
                      var h = (0, ra.default)(e.attributes)
                      delete h.image
                      return f.insert({ image: e.attributes.image }, h)
                    }
                    null == e.attributes ||
                      (!0 !== e.attributes.list && !0 !== e.attributes.bullet) ||
                      ((e = (0, ra.default)(e)),
                      e.attributes.list
                        ? (e.attributes.list = "ordered")
                        : ((e.attributes.list = "bullet"), delete e.attributes.bullet))
                    return "string" === typeof e.insert
                      ? ((h = e.insert.replace(/\r\n/g, "\n").replace(/\r/g, "\n")),
                        f.insert(h, e.attributes))
                      : f.push(e)
                  }, new f.default())
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var r =
                    "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
                      ? function (f) {
                          return typeof f
                        }
                      : function (f) {
                          return f &&
                            "function" === typeof Symbol &&
                            f.constructor === Symbol &&
                            f !== Symbol.prototype
                            ? "symbol"
                            : typeof f
                        },
                  n = (function () {
                    return function (f, e) {
                      if (Array.isArray(f)) return f
                      if (Symbol.iterator in Object(f)) {
                        var h = [],
                          n = !0,
                          r = !1,
                          w = void 0
                        try {
                          for (
                            var x = f[Symbol.iterator](), y;
                            !(n = (y = x.next()).done) && (h.push(y.value), !e || h.length !== e);
                            n = !0
                          );
                        } catch (za) {
                          ;(r = !0), (w = za)
                        } finally {
                          try {
                            if (!n && x["return"]) x["return"]()
                          } finally {
                            if (r) throw w
                          }
                        }
                        return h
                      }
                      throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                  })(),
                  h = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })()
                e = ba(2)
                var f = ca(e)
                e = ba(20)
                var x = ca(e)
                e = ba(0)
                var fa = ca(e)
                e = ba(13)
                var ea = ca(e)
                e = ba(24)
                var ha = ca(e),
                  da = ba(4),
                  ia = ca(da)
                e = ba(16)
                var la = ca(e)
                e = ba(21)
                var ra = ca(e)
                e = ba(11)
                var oa = ca(e)
                ba = ba(3)
                var ya = ca(ba),
                  Fa = /^[ -~]*$/
                ba = (function () {
                  function e(f) {
                    if (!(this instanceof e))
                      throw new TypeError("Cannot call a class as a function")
                    this.scroll = f
                    this.delta = this.getDelta()
                  }
                  h(e, [
                    {
                      key: "applyDelta",
                      value: function (f) {
                        var e = this,
                          h = !1
                        this.scroll.update()
                        var w = this.scroll.length()
                        this.scroll.batchStart()
                        f = y(f)
                        f.reduce(function (f, y) {
                          var z = y.retain || y.delete || y.insert.length || 1,
                            aa = y.attributes || {}
                          if (null != y.insert) {
                            if ("string" === typeof y.insert) {
                              y = y.insert
                              y.endsWith("\n") && h && ((h = !1), (y = y.slice(0, -1)))
                              f >= w && !y.endsWith("\n") && (h = !0)
                              e.scroll.insertAt(f, y)
                              y = e.scroll.line(f)
                              y = n(y, 2)
                              var ca = y[0],
                                ea = y[1]
                              y = (0, ya.default)({}, (0, da.bubbleFormats)(ca))
                              ca instanceof ia.default &&
                                ((ca = ca.descendant(fa.default.Leaf, ea)),
                                (ca = n(ca, 1)[0]),
                                (y = (0, ya.default)(y, (0, da.bubbleFormats)(ca))))
                              aa = x.default.attributes.diff(y, aa) || {}
                            } else if ("object" === r(y.insert)) {
                              ca = Object.keys(y.insert)[0]
                              if (null == ca) return f
                              e.scroll.insertAt(f, ca, y.insert[ca])
                            }
                            w += z
                          }
                          Object.keys(aa).forEach(function (h) {
                            e.scroll.formatAt(f, z, h, aa[h])
                          })
                          return f + z
                        }, 0)
                        f.reduce(function (f, h) {
                          return "number" === typeof h.delete
                            ? (e.scroll.deleteAt(f, h.delete), f)
                            : f + (h.retain || h.insert.length || 1)
                        }, 0)
                        this.scroll.batchEnd()
                        return this.update(f)
                      },
                    },
                    {
                      key: "deleteText",
                      value: function (e, h) {
                        this.scroll.deleteAt(e, h)
                        return this.update(new f.default().retain(e).delete(h))
                      },
                    },
                    {
                      key: "formatLine",
                      value: function (e, h) {
                        var n = this,
                          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
                        this.scroll.update()
                        Object.keys(r).forEach(function (f) {
                          if (null == n.scroll.whitelist || n.scroll.whitelist[f]) {
                            var w = n.scroll.lines(e, Math.max(h, 1)),
                              x = h
                            w.forEach(function (h) {
                              var w = h.length()
                              if (h instanceof ea.default) {
                                var y = e - h.offset(n.scroll),
                                  z = h.newlineIndex(y + x) - y + 1
                                h.formatAt(y, z, f, r[f])
                              } else h.format(f, r[f])
                              x -= w
                            })
                          }
                        })
                        this.scroll.optimize()
                        return this.update(new f.default().retain(e).retain(h, (0, ra.default)(r)))
                      },
                    },
                    {
                      key: "formatText",
                      value: function (e, h) {
                        var n = this,
                          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
                        Object.keys(r).forEach(function (f) {
                          n.scroll.formatAt(e, h, f, r[f])
                        })
                        return this.update(new f.default().retain(e).retain(h, (0, ra.default)(r)))
                      },
                    },
                    {
                      key: "getContents",
                      value: function (f, e) {
                        return this.delta.slice(f, f + e)
                      },
                    },
                    {
                      key: "getDelta",
                      value: function () {
                        return this.scroll.lines().reduce(function (f, e) {
                          return f.concat(e.delta())
                        }, new f.default())
                      },
                    },
                    {
                      key: "getFormat",
                      value: function (f) {
                        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                          h = [],
                          r = []
                        0 === e
                          ? this.scroll.path(f).forEach(function (f) {
                              f = n(f, 1)[0]
                              f instanceof ia.default
                                ? h.push(f)
                                : f instanceof fa.default.Leaf && r.push(f)
                            })
                          : ((h = this.scroll.lines(f, e)),
                            (r = this.scroll.descendants(fa.default.Leaf, f, e)))
                        e = [h, r].map(function (f) {
                          if (0 === f.length) return {}
                          for (
                            var e = (0, da.bubbleFormats)(f.shift());
                            0 < Object.keys(e).length;

                          ) {
                            var h = f.shift()
                            if (null == h) break
                            e = w((0, da.bubbleFormats)(h), e)
                          }
                          return e
                        })
                        return ya.default.apply(ya.default, e)
                      },
                    },
                    {
                      key: "getText",
                      value: function (f, e) {
                        return this.getContents(f, e)
                          .filter(function (f) {
                            return "string" === typeof f.insert
                          })
                          .map(function (f) {
                            return f.insert
                          })
                          .join("")
                      },
                    },
                    {
                      key: "insertEmbed",
                      value: function (e, h, n) {
                        this.scroll.insertAt(e, h, n)
                        return this.update(new f.default().retain(e).insert(z({}, h, n)))
                      },
                    },
                    {
                      key: "insertText",
                      value: function (e, h) {
                        var n = this,
                          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
                        h = h.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
                        this.scroll.insertAt(e, h)
                        Object.keys(r).forEach(function (f) {
                          n.scroll.formatAt(e, h.length, f, r[f])
                        })
                        return this.update(new f.default().retain(e).insert(h, (0, ra.default)(r)))
                      },
                    },
                    {
                      key: "isBlank",
                      value: function () {
                        if (0 == this.scroll.children.length) return !0
                        if (1 < this.scroll.children.length) return !1
                        var f = this.scroll.children.head
                        return f.statics.blotName !== ia.default.blotName || 1 < f.children.length
                          ? !1
                          : f.children.head instanceof la.default
                      },
                    },
                    {
                      key: "removeFormat",
                      value: function (e, h) {
                        var r = this.getText(e, h),
                          w = this.scroll.line(e + h),
                          x = n(w, 2)
                        w = x[0]
                        x = x[1]
                        var y = 0,
                          z = new f.default()
                        null != w &&
                          ((y =
                            w instanceof ea.default ? w.newlineIndex(x) - x + 1 : w.length() - x),
                          (z = w
                            .delta()
                            .slice(x, x + y - 1)
                            .insert("\n")))
                        h = this.getContents(e, h + y).diff(new f.default().insert(r).concat(z))
                        e = new f.default().retain(e).concat(h)
                        return this.applyDelta(e)
                      },
                    },
                    {
                      key: "update",
                      value: function (e) {
                        var h = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [],
                          n =
                            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : void 0,
                          r = this.delta
                        if (
                          1 === h.length &&
                          "characterData" === h[0].type &&
                          h[0].target.data.match(Fa) &&
                          fa.default.find(h[0].target)
                        ) {
                          var w = fa.default.find(h[0].target),
                            x = (0, da.bubbleFormats)(w),
                            y = w.offset(this.scroll)
                          h = h[0].oldValue.replace(ha.default.CONTENTS, "")
                          h = new f.default().insert(h)
                          w = new f.default().insert(w.value())
                          e = new f.default()
                            .retain(y)
                            .concat(h.diff(w, n))
                            .reduce(function (f, e) {
                              return e.insert ? f.insert(e.insert, x) : f.push(e)
                            }, new f.default())
                          this.delta = r.compose(e)
                        } else
                          (this.delta = this.getDelta()),
                            (e && (0, oa.default)(r.compose(e), this.delta)) ||
                              (e = r.diff(this.delta, n))
                        return e
                      },
                    },
                  ])
                  return e
                })()
                aa.default = ba
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f) {
                  if (Array.isArray(f)) {
                    for (var e = 0, h = Array(f.length); e < f.length; e++) h[e] = f[e]
                    return h
                  }
                  return Array.from(f)
                }
                function w(f, e) {
                  if (!(f instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                function y(f, e) {
                  try {
                    e.parentNode
                  } catch (la) {
                    return !1
                  }
                  e instanceof Text && (e = e.parentNode)
                  return f.contains(e)
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.default = aa.Range = void 0
                var r = (function () {
                    return function (f, e) {
                      if (Array.isArray(f)) return f
                      if (Symbol.iterator in Object(f)) {
                        var h = [],
                          n = !0,
                          r = !1,
                          w = void 0
                        try {
                          for (
                            var x = f[Symbol.iterator](), y;
                            !(n = (y = x.next()).done) && (h.push(y.value), !e || h.length !== e);
                            n = !0
                          );
                        } catch (qa) {
                          ;(r = !0), (w = qa)
                        } finally {
                          try {
                            if (!n && x["return"]) x["return"]()
                          } finally {
                            if (r) throw w
                          }
                        }
                        return h
                      }
                      throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                  })(),
                  n = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })()
                e = ba(0)
                var h = ca(e)
                e = ba(21)
                var f = ca(e)
                e = ba(11)
                var x = ca(e)
                e = ba(8)
                var fa = ca(e)
                ba = ba(10)
                ba = ca(ba)
                var ea = (0, ba.default)("quill:selection"),
                  ha = function la(f) {
                    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0
                    w(this, la)
                    this.index = f
                    this.length = e
                  }
                ba = (function () {
                  function e(f, n) {
                    var r = this
                    w(this, e)
                    this.emitter = n
                    this.scroll = f
                    this.mouseDown = this.composing = !1
                    this.root = this.scroll.domNode
                    this.cursor = h.default.create("cursor", this)
                    this.lastRange = this.savedRange = new ha(0, 0)
                    this.handleComposition()
                    this.handleDragging()
                    this.emitter.listenDOM("selectionchange", document, function () {
                      r.mouseDown || setTimeout(r.update.bind(r, fa.default.sources.USER), 1)
                    })
                    this.emitter.on(fa.default.events.EDITOR_CHANGE, function (f, e) {
                      f === fa.default.events.TEXT_CHANGE &&
                        0 < e.length() &&
                        r.update(fa.default.sources.SILENT)
                    })
                    this.emitter.on(fa.default.events.SCROLL_BEFORE_UPDATE, function () {
                      if (r.hasFocus()) {
                        var f = r.getNativeRange()
                        if (null != f && f.start.node !== r.cursor.textNode)
                          r.emitter.once(fa.default.events.SCROLL_UPDATE, function () {
                            try {
                              r.setNativeRange(
                                f.start.node,
                                f.start.offset,
                                f.end.node,
                                f.end.offset
                              )
                            } catch (Fa) {}
                          })
                      }
                    })
                    this.emitter.on(fa.default.events.SCROLL_OPTIMIZE, function (f, e) {
                      e.range &&
                        ((f = e.range),
                        r.setNativeRange(f.startNode, f.startOffset, f.endNode, f.endOffset))
                    })
                    this.update(fa.default.sources.SILENT)
                  }
                  n(e, [
                    {
                      key: "handleComposition",
                      value: function () {
                        var f = this
                        this.root.addEventListener("compositionstart", function () {
                          f.composing = !0
                        })
                        this.root.addEventListener("compositionend", function () {
                          f.composing = !1
                          if (f.cursor.parent) {
                            var e = f.cursor.restore()
                            e &&
                              setTimeout(function () {
                                f.setNativeRange(e.startNode, e.startOffset, e.endNode, e.endOffset)
                              }, 1)
                          }
                        })
                      },
                    },
                    {
                      key: "handleDragging",
                      value: function () {
                        var f = this
                        this.emitter.listenDOM("mousedown", document.body, function () {
                          f.mouseDown = !0
                        })
                        this.emitter.listenDOM("mouseup", document.body, function () {
                          f.mouseDown = !1
                          f.update(fa.default.sources.USER)
                        })
                      },
                    },
                    {
                      key: "focus",
                      value: function () {
                        this.hasFocus() || (this.root.focus(), this.setRange(this.savedRange))
                      },
                    },
                    {
                      key: "format",
                      value: function (f, e) {
                        if (null == this.scroll.whitelist || this.scroll.whitelist[f]) {
                          this.scroll.update()
                          var n = this.getNativeRange()
                          if (
                            null != n &&
                            n.native.collapsed &&
                            !h.default.query(f, h.default.Scope.BLOCK)
                          ) {
                            if (n.start.node !== this.cursor.textNode) {
                              var r = h.default.find(n.start.node, !1)
                              if (null == r) return
                              r instanceof h.default.Leaf
                                ? ((n = r.split(n.start.offset)),
                                  r.parent.insertBefore(this.cursor, n))
                                : r.insertBefore(this.cursor, n.start.node)
                              this.cursor.attach()
                            }
                            this.cursor.format(f, e)
                            this.scroll.optimize()
                            this.setNativeRange(
                              this.cursor.textNode,
                              this.cursor.textNode.data.length
                            )
                            this.update()
                          }
                        }
                      },
                    },
                    {
                      key: "getBounds",
                      value: function (f) {
                        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                          h = this.scroll.length()
                        f = Math.min(f, h - 1)
                        e = Math.min(f + e, h - 1) - f
                        h = this.scroll.leaf(f)
                        var n = r(h, 2)
                        h = n[0]
                        var w = n[1]
                        if (null == h) return null
                        n = h.position(w, !0)
                        n = r(n, 2)
                        var x = n[0]
                        w = n[1]
                        n = document.createRange()
                        if (0 < e) {
                          n.setStart(x, w)
                          e = this.scroll.leaf(f + e)
                          e = r(e, 2)
                          h = e[0]
                          w = e[1]
                          if (null == h) return null
                          e = h.position(w, !0)
                          e = r(e, 2)
                          x = e[0]
                          w = e[1]
                          n.setEnd(x, w)
                          return n.getBoundingClientRect()
                        }
                        e = "left"
                        x instanceof Text
                          ? (w < x.data.length
                              ? (n.setStart(x, w), n.setEnd(x, w + 1))
                              : (n.setStart(x, w - 1), n.setEnd(x, w), (e = "right")),
                            (h = n.getBoundingClientRect()))
                          : ((h = h.domNode.getBoundingClientRect()), 0 < w && (e = "right"))
                        return {
                          bottom: h.top + h.height,
                          height: h.height,
                          left: h[e],
                          right: h[e],
                          top: h.top,
                          width: 0,
                        }
                      },
                    },
                    {
                      key: "getNativeRange",
                      value: function () {
                        var f = document.getSelection()
                        if (null == f || 0 >= f.rangeCount) return null
                        f = f.getRangeAt(0)
                        if (null == f) return null
                        f = this.normalizeNative(f)
                        ea.info("getNativeRange", f)
                        return f
                      },
                    },
                    {
                      key: "getRange",
                      value: function () {
                        var f = this.getNativeRange()
                        return null == f ? [null, null] : [this.normalizedToRange(f), f]
                      },
                    },
                    {
                      key: "hasFocus",
                      value: function () {
                        return document.activeElement === this.root
                      },
                    },
                    {
                      key: "normalizedToRange",
                      value: function (f) {
                        var e = this,
                          n = [[f.start.node, f.start.offset]]
                        f.native.collapsed || n.push([f.end.node, f.end.offset])
                        n = n.map(function (f) {
                          var n = r(f, 2)
                          f = n[0]
                          n = n[1]
                          var w = h.default.find(f, !0),
                            x = w.offset(e.scroll)
                          return 0 === n
                            ? x
                            : w instanceof h.default.Container
                            ? x + w.length()
                            : x + w.index(f, n)
                        })
                        f = Math.min(Math.max.apply(Math, z(n)), this.scroll.length() - 1)
                        n = Math.min.apply(Math, [f].concat(z(n)))
                        return new ha(n, f - n)
                      },
                    },
                    {
                      key: "normalizeNative",
                      value: function (f) {
                        if (
                          !y(this.root, f.startContainer) ||
                          (!f.collapsed && !y(this.root, f.endContainer))
                        )
                          return null
                        f = {
                          start: { node: f.startContainer, offset: f.startOffset },
                          end: { node: f.endContainer, offset: f.endOffset },
                          native: f,
                        }
                        ;[f.start, f.end].forEach(function (f) {
                          for (
                            var e = f.node, h = f.offset;
                            !(e instanceof Text) && 0 < e.childNodes.length;

                          )
                            if (e.childNodes.length > h) (e = e.childNodes[h]), (h = 0)
                            else if (e.childNodes.length === h)
                              (e = e.lastChild),
                                (h = e instanceof Text ? e.data.length : e.childNodes.length + 1)
                            else break
                          f.node = e
                          f.offset = h
                        })
                        return f
                      },
                    },
                    {
                      key: "rangeToNative",
                      value: function (f) {
                        var e = this
                        f = f.collapsed ? [f.index] : [f.index, f.index + f.length]
                        var h = [],
                          n = this.scroll.length()
                        f.forEach(function (f, w) {
                          f = Math.min(n - 1, f)
                          f = e.scroll.leaf(f)
                          var x = r(f, 2)
                          f = x[1]
                          w = x[0].position(f, 0 !== w)
                          f = r(w, 2)
                          w = f[0]
                          f = f[1]
                          h.push(w, f)
                        })
                        2 > h.length && (h = h.concat(h))
                        return h
                      },
                    },
                    {
                      key: "scrollIntoView",
                      value: function (f) {
                        var e = this.lastRange
                        if (null != e) {
                          var h = this.getBounds(e.index, e.length)
                          if (null != h) {
                            var n = this.scroll.length() - 1,
                              w = this.scroll.line(Math.min(e.index, n)),
                              x = (w = r(w, 1)[0])
                            0 < e.length &&
                              ((e = this.scroll.line(Math.min(e.index + e.length, n))),
                              (x = r(e, 1)[0]))
                            null != w &&
                              null != x &&
                              ((e = f.getBoundingClientRect()),
                              h.top < e.top
                                ? (f.scrollTop -= e.top - h.top)
                                : h.bottom > e.bottom && (f.scrollTop += h.bottom - e.bottom))
                          }
                        }
                      },
                    },
                    {
                      key: "setNativeRange",
                      value: function (f, e) {
                        var h = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : f,
                          n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : e,
                          r = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : !1
                        ea.info("setNativeRange", f, e, h, n)
                        if (
                          null == f ||
                          (null != this.root.parentNode &&
                            null != f.parentNode &&
                            null != h.parentNode)
                        ) {
                          var w = document.getSelection()
                          if (null != w)
                            if (null != f) {
                              this.hasFocus() || this.root.focus()
                              var x = (this.getNativeRange() || {}).native
                              if (
                                null == x ||
                                r ||
                                f !== x.startContainer ||
                                e !== x.startOffset ||
                                h !== x.endContainer ||
                                n !== x.endOffset
                              )
                                "BR" == f.tagName &&
                                  ((e = [].indexOf.call(f.parentNode.childNodes, f)),
                                  (f = f.parentNode)),
                                  "BR" == h.tagName &&
                                    ((n = [].indexOf.call(h.parentNode.childNodes, h)),
                                    (h = h.parentNode)),
                                  (r = document.createRange()),
                                  r.setStart(f, e),
                                  r.setEnd(h, n),
                                  w.removeAllRanges(),
                                  w.addRange(r)
                            } else w.removeAllRanges(), this.root.blur(), document.body.focus()
                        }
                      },
                    },
                    {
                      key: "setRange",
                      value: function (f) {
                        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !1,
                          h =
                            2 < arguments.length && void 0 !== arguments[2]
                              ? arguments[2]
                              : fa.default.sources.API
                        "string" === typeof e && ((h = e), (e = !1))
                        ea.info("setRange", f)
                        if (null != f) {
                          var n = this.rangeToNative(f)
                          this.setNativeRange.apply(this, z(n).concat([e]))
                        } else this.setNativeRange(null)
                        this.update(h)
                      },
                    },
                    {
                      key: "update",
                      value: function () {
                        var e =
                            0 < arguments.length && void 0 !== arguments[0]
                              ? arguments[0]
                              : fa.default.sources.USER,
                          h = this.lastRange,
                          n = this.getRange()
                        n = r(n, 2)
                        var w = n[1]
                        this.lastRange = n[0]
                        null != this.lastRange && (this.savedRange = this.lastRange)
                        if (!(0, x.default)(h, this.lastRange)) {
                          var y
                          !this.composing &&
                            null != w &&
                            w.native.collapsed &&
                            w.start.node !== this.cursor.textNode &&
                            this.cursor.restore()
                          h = [
                            fa.default.events.SELECTION_CHANGE,
                            (0, f.default)(this.lastRange),
                            (0, f.default)(h),
                            e,
                          ]
                          ;(y = this.emitter).emit.apply(
                            y,
                            [fa.default.events.EDITOR_CHANGE].concat(h)
                          )
                          if (e !== fa.default.sources.SILENT) {
                            var z
                            ;(z = this.emitter).emit.apply(z, h)
                          }
                        }
                      },
                    },
                  ])
                  return e
                })()
                aa.Range = ha
                aa.default = ba
              },
              function (e, aa, ba) {
                function ca(e, r) {
                  if ("function" !== typeof r && null !== r)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof r
                    )
                  e.prototype = Object.create(r && r.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : (e.__proto__ = r))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var z = (function () {
                    function e(e, n) {
                      for (var h = 0; h < n.length; h++) {
                        var f = n[h]
                        f.enumerable = f.enumerable || !1
                        f.configurable = !0
                        "value" in f && (f.writable = !0)
                        Object.defineProperty(e, f.key, f)
                      }
                    }
                    return function (r, n, h) {
                      n && e(r.prototype, n)
                      h && e(r, h)
                      return r
                    }
                  })(),
                  w = function f(e, n, h) {
                    null === e && (e = Function.prototype)
                    var r = Object.getOwnPropertyDescriptor(e, n)
                    if (void 0 === r) {
                      if (((e = Object.getPrototypeOf(e)), null !== e)) return f(e, n, h)
                    } else {
                      if ("value" in r) return r.value
                      n = r.get
                      return void 0 === n ? void 0 : n.call(h)
                    }
                  }
                e = (function (e) {
                  function n() {
                    if (!(this instanceof n))
                      throw new TypeError("Cannot call a class as a function")
                    var e = (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e || ("object" !== typeof e && "function" !== typeof e) ? this : e
                  }
                  ca(n, e)
                  z(
                    n,
                    [
                      {
                        key: "insertInto",
                        value: function (e, f) {
                          0 === e.children.length
                            ? w(
                                n.prototype.__proto__ || Object.getPrototypeOf(n.prototype),
                                "insertInto",
                                this
                              ).call(this, e, f)
                            : this.remove()
                        },
                      },
                      {
                        key: "length",
                        value: function () {
                          return 0
                        },
                      },
                      {
                        key: "value",
                        value: function () {
                          return ""
                        },
                      },
                    ],
                    [{ key: "value", value: function () {} }]
                  )
                  return n
                })(
                  (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(0)).default.Embed
                )
                e.blotName = "break"
                e.tagName = "BR"
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(e) {
                  var n = y.find(e)
                  if (null == n)
                    try {
                      n = y.create(e)
                    } catch (h) {
                      ;(n = y.create(y.Scope.INLINE)),
                        [].slice.call(e.childNodes).forEach(function (f) {
                          n.domNode.appendChild(f)
                        }),
                        e.parentNode && e.parentNode.replaceChild(n.domNode, e),
                        n.attach()
                    }
                  return n
                }
                var z =
                  (this && this.__extends) ||
                  (function () {
                    var e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, h) {
                          e.__proto__ = h
                        }) ||
                      function (e, h) {
                        for (var f in h) h.hasOwnProperty(f) && (e[f] = h[f])
                      }
                    return function (n, h) {
                      function f() {
                        this.constructor = n
                      }
                      e(n, h)
                      n.prototype =
                        null === h ? Object.create(h) : ((f.prototype = h.prototype), new f())
                    }
                  })()
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var w = ba(44)
                e = ba(30)
                var y = ba(1)
                ba = (function (e) {
                  function n(h) {
                    h = e.call(this, h) || this
                    h.build()
                    return h
                  }
                  z(n, e)
                  n.prototype.appendChild = function (e) {
                    this.insertBefore(e)
                  }
                  n.prototype.attach = function () {
                    e.prototype.attach.call(this)
                    this.children.forEach(function (e) {
                      e.attach()
                    })
                  }
                  n.prototype.build = function () {
                    var e = this
                    this.children = new w.default()
                    ;[].slice
                      .call(this.domNode.childNodes)
                      .reverse()
                      .forEach(function (f) {
                        try {
                          var h = ca(f)
                          e.insertBefore(h, e.children.head || void 0)
                        } catch (fa) {
                          if (!(fa instanceof y.ParchmentError)) throw fa
                        }
                      })
                  }
                  n.prototype.deleteAt = function (e, f) {
                    if (0 === e && f === this.length()) return this.remove()
                    this.children.forEachAt(e, f, function (f, e, h) {
                      f.deleteAt(e, h)
                    })
                  }
                  n.prototype.descendant = function (e, f) {
                    var h = this.children.find(f)
                    f = h[0]
                    h = h[1]
                    return (null == e.blotName && e(f)) || (null != e.blotName && f instanceof e)
                      ? [f, h]
                      : f instanceof n
                      ? f.descendant(e, h)
                      : [null, -1]
                  }
                  n.prototype.descendants = function (e, f, r) {
                    void 0 === f && (f = 0)
                    void 0 === r && (r = Number.MAX_VALUE)
                    var h = [],
                      w = r
                    this.children.forEachAt(f, r, function (f, r, x) {
                      ;((null == e.blotName && e(f)) || (null != e.blotName && f instanceof e)) &&
                        h.push(f)
                      f instanceof n && (h = h.concat(f.descendants(e, r, w)))
                      w -= x
                    })
                    return h
                  }
                  n.prototype.detach = function () {
                    this.children.forEach(function (e) {
                      e.detach()
                    })
                    e.prototype.detach.call(this)
                  }
                  n.prototype.formatAt = function (e, f, n, r) {
                    this.children.forEachAt(e, f, function (f, e, h) {
                      f.formatAt(e, h, n, r)
                    })
                  }
                  n.prototype.insertAt = function (e, f, n) {
                    var h = this.children.find(e)
                    e = h[0]
                    h = h[1]
                    e
                      ? e.insertAt(h, f, n)
                      : ((f = null == n ? y.create("text", f) : y.create(f, n)),
                        this.appendChild(f))
                  }
                  n.prototype.insertBefore = function (e, f) {
                    if (
                      null != this.statics.allowedChildren &&
                      !this.statics.allowedChildren.some(function (f) {
                        return e instanceof f
                      })
                    )
                      throw new y.ParchmentError(
                        "Cannot insert " + e.statics.blotName + " into " + this.statics.blotName
                      )
                    e.insertInto(this, f)
                  }
                  n.prototype.length = function () {
                    return this.children.reduce(function (e, f) {
                      return e + f.length()
                    }, 0)
                  }
                  n.prototype.moveChildren = function (e, f) {
                    this.children.forEach(function (h) {
                      e.insertBefore(h, f)
                    })
                  }
                  n.prototype.optimize = function (h) {
                    e.prototype.optimize.call(this, h)
                    if (0 === this.children.length)
                      if (null != this.statics.defaultChild) {
                        var f = y.create(this.statics.defaultChild)
                        this.appendChild(f)
                        f.optimize(h)
                      } else this.remove()
                  }
                  n.prototype.path = function (e, f) {
                    void 0 === f && (f = !1)
                    var h = this.children.find(e, f),
                      r = h[0]
                    h = h[1]
                    e = [[this, e]]
                    if (r instanceof n) return e.concat(r.path(h, f))
                    null != r && e.push([r, h])
                    return e
                  }
                  n.prototype.removeChild = function (e) {
                    this.children.remove(e)
                  }
                  n.prototype.replace = function (h) {
                    h instanceof n && h.moveChildren(this)
                    e.prototype.replace.call(this, h)
                  }
                  n.prototype.split = function (e, f) {
                    void 0 === f && (f = !1)
                    if (!f) {
                      if (0 === e) return this
                      if (e === this.length()) return this.next
                    }
                    var h = this.clone()
                    this.parent.insertBefore(h, this.next)
                    this.children.forEachAt(e, this.length(), function (e, n) {
                      e = e.split(n, f)
                      h.appendChild(e)
                    })
                    return h
                  }
                  n.prototype.unwrap = function () {
                    this.moveChildren(this.parent, this.next)
                    this.remove()
                  }
                  n.prototype.update = function (e) {
                    var f = this,
                      h = [],
                      n = []
                    e.forEach(function (e) {
                      e.target === f.domNode &&
                        "childList" === e.type &&
                        (h.push.apply(h, e.addedNodes), n.push.apply(n, e.removedNodes))
                    })
                    n.forEach(function (e) {
                      ;(null != e.parentNode &&
                        "IFRAME" !== e.tagName &&
                        document.body.compareDocumentPosition(e) &
                          Node.DOCUMENT_POSITION_CONTAINED_BY) ||
                        ((e = y.find(e)),
                        null != e &&
                          ((null != e.domNode.parentNode && e.domNode.parentNode !== f.domNode) ||
                            e.detach()))
                    })
                    h.filter(function (e) {
                      return e.parentNode == f.domNode
                    })
                      .sort(function (f, e) {
                        return f === e
                          ? 0
                          : f.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING
                          ? 1
                          : -1
                      })
                      .forEach(function (e) {
                        var h = null
                        null != e.nextSibling && (h = y.find(e.nextSibling))
                        e = ca(e)
                        if (e.next != h || null == e.next)
                          null != e.parent && e.parent.removeChild(f),
                            f.insertBefore(e, h || void 0)
                      })
                  }
                  return n
                })(e.default)
                aa.default = ba
              },
              function (e, aa, ba) {
                var ca =
                  (this && this.__extends) ||
                  (function () {
                    var e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, h) {
                          e.__proto__ = h
                        }) ||
                      function (e, h) {
                        for (var f in h) h.hasOwnProperty(f) && (e[f] = h[f])
                      }
                    return function (n, h) {
                      function f() {
                        this.constructor = n
                      }
                      e(n, h)
                      n.prototype =
                        null === h ? Object.create(h) : ((f.prototype = h.prototype), new f())
                    }
                  })()
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var z = ba(12),
                  w = ba(31)
                e = ba(17)
                var y = ba(1)
                ba = (function (e) {
                  function n(h) {
                    h = e.call(this, h) || this
                    h.attributes = new w.default(h.domNode)
                    return h
                  }
                  ca(n, e)
                  n.formats = function (e) {
                    if ("string" === typeof this.tagName) return !0
                    if (Array.isArray(this.tagName)) return e.tagName.toLowerCase()
                  }
                  n.prototype.format = function (e, f) {
                    var h = y.query(e)
                    h instanceof z.default
                      ? this.attributes.attribute(h, f)
                      : f &&
                        (null == h ||
                          (e === this.statics.blotName && this.formats()[e] === f) ||
                          this.replaceWith(e, f))
                  }
                  n.prototype.formats = function () {
                    var e = this.attributes.values(),
                      f = this.statics.formats(this.domNode)
                    null != f && (e[this.statics.blotName] = f)
                    return e
                  }
                  n.prototype.replaceWith = function (h, f) {
                    h = e.prototype.replaceWith.call(this, h, f)
                    this.attributes.copy(h)
                    return h
                  }
                  n.prototype.update = function (h, f) {
                    var n = this
                    e.prototype.update.call(this, h, f)
                    h.some(function (f) {
                      return f.target === n.domNode && "attributes" === f.type
                    }) && this.attributes.build()
                  }
                  n.prototype.wrap = function (h, f) {
                    h = e.prototype.wrap.call(this, h, f)
                    h instanceof n &&
                      h.statics.scope === this.statics.scope &&
                      this.attributes.move(h)
                    return h
                  }
                  return n
                })(e.default)
                aa.default = ba
              },
              function (e, aa, ba) {
                var ca =
                  (this && this.__extends) ||
                  (function () {
                    var e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, r) {
                          e.__proto__ = r
                        }) ||
                      function (e, r) {
                        for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n])
                      }
                    return function (w, r) {
                      function n() {
                        this.constructor = w
                      }
                      e(w, r)
                      w.prototype =
                        null === r ? Object.create(r) : ((n.prototype = r.prototype), new n())
                    }
                  })()
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = ba(30)
                var z = ba(1)
                ba = (function (e) {
                  function w() {
                    return (null !== e && e.apply(this, arguments)) || this
                  }
                  ca(w, e)
                  w.value = function () {
                    return !0
                  }
                  w.prototype.index = function (e, n) {
                    return this.domNode === e ||
                      this.domNode.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY
                      ? Math.min(n, 1)
                      : -1
                  }
                  w.prototype.position = function (e) {
                    var n = [].indexOf.call(this.parent.domNode.childNodes, this.domNode)
                    0 < e && (n += 1)
                    return [this.parent.domNode, n]
                  }
                  w.prototype.value = function () {
                    var e
                    return (
                      (e = {}),
                      (e[this.statics.blotName] = this.statics.value(this.domNode) || !0),
                      e
                    )
                  }
                  w.scope = z.Scope.INLINE_BLOT
                  return w
                })(e.default)
                aa.default = ba
              },
              function (e, aa, ba) {
                function ca(e) {
                  this.ops = e
                  this.offset = this.index = 0
                }
                var z = ba(11),
                  w = ba(3),
                  y = {
                    attributes: {
                      compose: function (e, n, h) {
                        "object" !== typeof e && (e = {})
                        "object" !== typeof n && (n = {})
                        var f = w(!0, {}, n)
                        h ||
                          (f = Object.keys(f).reduce(function (e, h) {
                            null != f[h] && (e[h] = f[h])
                            return e
                          }, {}))
                        for (var r in e) void 0 !== e[r] && void 0 === n[r] && (f[r] = e[r])
                        return 0 < Object.keys(f).length ? f : void 0
                      },
                      diff: function (e, n) {
                        "object" !== typeof e && (e = {})
                        "object" !== typeof n && (n = {})
                        var h = Object.keys(e)
                          .concat(Object.keys(n))
                          .reduce(function (f, h) {
                            z(e[h], n[h]) || (f[h] = void 0 === n[h] ? null : n[h])
                            return f
                          }, {})
                        return 0 < Object.keys(h).length ? h : void 0
                      },
                      transform: function (e, n, h) {
                        if ("object" !== typeof e) return n
                        if ("object" === typeof n) {
                          if (!h) return n
                          h = Object.keys(n).reduce(function (f, h) {
                            void 0 === e[h] && (f[h] = n[h])
                            return f
                          }, {})
                          return 0 < Object.keys(h).length ? h : void 0
                        }
                      },
                    },
                    iterator: function (e) {
                      return new ca(e)
                    },
                    length: function (e) {
                      return "number" === typeof e["delete"]
                        ? e["delete"]
                        : "number" === typeof e.retain
                        ? e.retain
                        : "string" === typeof e.insert
                        ? e.insert.length
                        : 1
                    },
                  }
                ca.prototype.hasNext = function () {
                  return Infinity > this.peekLength()
                }
                ca.prototype.next = function (e) {
                  e || (e = Infinity)
                  var n = this.ops[this.index]
                  if (n) {
                    var h = this.offset,
                      f = y.length(n)
                    e >= f - h
                      ? ((e = f - h), (this.index += 1), (this.offset = 0))
                      : (this.offset += e)
                    if ("number" === typeof n["delete"]) return { delete: e }
                    f = {}
                    n.attributes && (f.attributes = n.attributes)
                    "number" === typeof n.retain
                      ? (f.retain = e)
                      : (f.insert = "string" === typeof n.insert ? n.insert.substr(h, e) : n.insert)
                    return f
                  }
                  return { retain: Infinity }
                }
                ca.prototype.peek = function () {
                  return this.ops[this.index]
                }
                ca.prototype.peekLength = function () {
                  return this.ops[this.index]
                    ? y.length(this.ops[this.index]) - this.offset
                    : Infinity
                }
                ca.prototype.peekType = function () {
                  if (this.ops[this.index]) {
                    if ("number" === typeof this.ops[this.index]["delete"]) return "delete"
                    if ("number" !== typeof this.ops[this.index].retain) return "insert"
                  }
                  return "retain"
                }
                ca.prototype.rest = function () {
                  if (this.hasNext()) {
                    if (0 === this.offset) return this.ops.slice(this.index)
                    var e = this.offset,
                      n = this.index,
                      h = this.next(),
                      f = this.ops.slice(this.index)
                    this.offset = e
                    this.index = n
                    return [h].concat(f)
                  }
                  return []
                }
                e.exports = y
              },
              function (ea) {
                var aa = (function () {
                  function aa(e, f) {
                    return null != f && e instanceof f
                  }
                  function ca(h, f, x, z, ea) {
                    function fa(h, x) {
                      if (null === h) return null
                      if (0 === x || "object" != typeof h) return h
                      if (aa(h, y)) var ja = new y()
                      else if (aa(h, r)) ja = new r()
                      else if (aa(h, n))
                        ja = new n(function (f, e) {
                          h.then(
                            function (e) {
                              f(fa(e, x - 1))
                            },
                            function (f) {
                              e(fa(f, x - 1))
                            }
                          )
                        })
                      else if (ca.__isArray(h)) ja = []
                      else if (ca.__isRegExp(h))
                        (ja = new RegExp(h.source, w(h))),
                          h.lastIndex && (ja.lastIndex = h.lastIndex)
                      else if (ca.__isDate(h)) ja = new Date(h.getTime())
                      else {
                        if (da && e.isBuffer(h))
                          return (
                            (ja = e.allocUnsafe ? e.allocUnsafe(h.length) : new e(h.length)),
                            h.copy(ja),
                            ja
                          )
                        if (aa(h, Error)) ja = Object.create(h)
                        else if ("undefined" == typeof z) {
                          var ia = Object.getPrototypeOf(h)
                          ja = Object.create(ia)
                        } else (ja = Object.create(z)), (ia = z)
                      }
                      if (f) {
                        var ua = ba.indexOf(h)
                        if (-1 != ua) return ha[ua]
                        ba.push(h)
                        ha.push(ja)
                      }
                      aa(h, y) &&
                        h.forEach(function (f, e) {
                          e = fa(e, x - 1)
                          f = fa(f, x - 1)
                          ja.set(e, f)
                        })
                      aa(h, r) &&
                        h.forEach(function (f) {
                          f = fa(f, x - 1)
                          ja.add(f)
                        })
                      for (var na in h) {
                        var ka
                        ia && (ka = Object.getOwnPropertyDescriptor(ia, na))
                        ;(ka && null == ka.set) || (ja[na] = fa(h[na], x - 1))
                      }
                      if (Object.getOwnPropertySymbols)
                        for (ua = Object.getOwnPropertySymbols(h), na = 0; na < ua.length; na++)
                          if (
                            ((ka = ua[na]),
                            (ia = Object.getOwnPropertyDescriptor(h, ka)),
                            !ia || ia.enumerable || ea)
                          )
                            (ja[ka] = fa(h[ka], x - 1)),
                              ia.enumerable || Object.defineProperty(ja, ka, { enumerable: !1 })
                      if (ea)
                        for (ua = Object.getOwnPropertyNames(h), na = 0; na < ua.length; na++)
                          (ka = ua[na]),
                            (ia = Object.getOwnPropertyDescriptor(h, ka)),
                            (ia && ia.enumerable) ||
                              ((ja[ka] = fa(h[ka], x - 1)),
                              Object.defineProperty(ja, ka, { enumerable: !1 }))
                      return ja
                    }
                    "object" === typeof f &&
                      ((x = f.depth),
                      (z = f.prototype),
                      (ea = f.includeNonEnumerable),
                      (f = f.circular))
                    var ba = [],
                      ha = [],
                      da = "undefined" != typeof e
                    "undefined" == typeof f && (f = !0)
                    "undefined" == typeof x && (x = Infinity)
                    return fa(h, x)
                  }
                  function z(e) {
                    return Object.prototype.toString.call(e)
                  }
                  function w(e) {
                    var f = ""
                    e.global && (f += "g")
                    e.ignoreCase && (f += "i")
                    e.multiline && (f += "m")
                    return f
                  }
                  try {
                    var y = Map
                  } catch (h) {
                    y = function () {}
                  }
                  try {
                    var r = Set
                  } catch (h) {
                    r = function () {}
                  }
                  try {
                    var n = Promise
                  } catch (h) {
                    n = function () {}
                  }
                  ca.clonePrototype = function (e) {
                    function f() {}
                    if (null === e) return null
                    f.prototype = e
                    return new f()
                  }
                  ca.__objToStr = z
                  ca.__isDate = function (e) {
                    return "object" === typeof e && "[object Date]" === z(e)
                  }
                  ca.__isArray = function (e) {
                    return "object" === typeof e && "[object Array]" === z(e)
                  }
                  ca.__isRegExp = function (e) {
                    return "object" === typeof e && "[object RegExp]" === z(e)
                  }
                  ca.__getRegExpFlags = w
                  return ca
                })()
                "object" === typeof ea && ea.exports && (ea.exports = aa)
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e) {
                  if (!f)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ("object" !== typeof e && "function" !== typeof e) ? f : e
                }
                function w(f, e) {
                  if ("function" !== typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof e
                    )
                  f.prototype = Object.create(e && e.prototype, {
                    constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : (f.__proto__ = e))
                }
                function y(f) {
                  return f instanceof ea.default || f instanceof fa.BlockEmbed
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var r = (function () {
                    return function (f, e) {
                      if (Array.isArray(f)) return f
                      if (Symbol.iterator in Object(f)) {
                        var h = [],
                          n = !0,
                          r = !1,
                          w = void 0
                        try {
                          for (
                            var x = f[Symbol.iterator](), y;
                            !(n = (y = x.next()).done) && (h.push(y.value), !e || h.length !== e);
                            n = !0
                          );
                        } catch (ka) {
                          ;(r = !0), (w = ka)
                        } finally {
                          try {
                            if (!n && x["return"]) x["return"]()
                          } finally {
                            if (r) throw w
                          }
                        }
                        return h
                      }
                      throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                  })(),
                  n = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })(),
                  h = function ya(f, e, h) {
                    null === f && (f = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(f, e)
                    if (void 0 === n) {
                      if (((f = Object.getPrototypeOf(f)), null !== f)) return ya(f, e, h)
                    } else {
                      if ("value" in n) return n.value
                      e = n.get
                      return void 0 === e ? void 0 : e.call(h)
                    }
                  }
                e = ba(0)
                var f = ca(e)
                e = ba(8)
                var x = ca(e),
                  fa = ba(4),
                  ea = ca(fa)
                e = ba(16)
                var ha = ca(e)
                e = ba(13)
                var da = ca(e)
                ba = ba(25)
                ba = ca(ba)
                e = (function (e) {
                  function aa(f, e) {
                    if (!(this instanceof aa))
                      throw new TypeError("Cannot call a class as a function")
                    f = z(this, (aa.__proto__ || Object.getPrototypeOf(aa)).call(this, f))
                    f.emitter = e.emitter
                    Array.isArray(e.whitelist) &&
                      (f.whitelist = e.whitelist.reduce(function (f, e) {
                        f[e] = !0
                        return f
                      }, {}))
                    f.domNode.addEventListener("DOMNodeInserted", function () {})
                    f.optimize()
                    f.enable()
                    return f
                  }
                  w(aa, e)
                  n(aa, [
                    {
                      key: "batchStart",
                      value: function () {
                        this.batch = !0
                      },
                    },
                    {
                      key: "batchEnd",
                      value: function () {
                        this.batch = !1
                        this.optimize()
                      },
                    },
                    {
                      key: "deleteAt",
                      value: function (f, e) {
                        var n = this.line(f),
                          w = r(n, 2)
                        n = w[0]
                        var x = w[1]
                        w = this.line(f + e)
                        w = r(w, 1)[0]
                        h(
                          aa.prototype.__proto__ || Object.getPrototypeOf(aa.prototype),
                          "deleteAt",
                          this
                        ).call(this, f, e)
                        if (null != w && n !== w && 0 < x) {
                          if (n instanceof fa.BlockEmbed || w instanceof fa.BlockEmbed) {
                            this.optimize()
                            return
                          }
                          if (n instanceof da.default) {
                            if (
                              ((f = n.newlineIndex(n.length(), !0)),
                              -1 < f && ((n = n.split(f + 1)), n === w))
                            ) {
                              this.optimize()
                              return
                            }
                          } else
                            w instanceof da.default &&
                              ((f = w.newlineIndex(0)), -1 < f && w.split(f + 1))
                          n.moveChildren(
                            w,
                            w.children.head instanceof ha.default ? null : w.children.head
                          )
                          n.remove()
                        }
                        this.optimize()
                      },
                    },
                    {
                      key: "enable",
                      value: function () {
                        this.domNode.setAttribute(
                          "contenteditable",
                          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : !0
                        )
                      },
                    },
                    {
                      key: "formatAt",
                      value: function (f, e, n, r) {
                        if (null == this.whitelist || this.whitelist[n])
                          h(
                            aa.prototype.__proto__ || Object.getPrototypeOf(aa.prototype),
                            "formatAt",
                            this
                          ).call(this, f, e, n, r),
                            this.optimize()
                      },
                    },
                    {
                      key: "insertAt",
                      value: function (e, n, r) {
                        if (null == r || null == this.whitelist || this.whitelist[n])
                          e >= this.length()
                            ? null == r || null == f.default.query(n, f.default.Scope.BLOCK)
                              ? ((e = f.default.create(this.statics.defaultChild)),
                                this.appendChild(e),
                                null == r && n.endsWith("\n") && (n = n.slice(0, -1)),
                                e.insertAt(0, n, r))
                              : ((n = f.default.create(n, r)), this.appendChild(n))
                            : h(
                                aa.prototype.__proto__ || Object.getPrototypeOf(aa.prototype),
                                "insertAt",
                                this
                              ).call(this, e, n, r),
                            this.optimize()
                      },
                    },
                    {
                      key: "insertBefore",
                      value: function (e, n) {
                        if (e.statics.scope === f.default.Scope.INLINE_BLOT) {
                          var r = f.default.create(this.statics.defaultChild)
                          r.appendChild(e)
                          e = r
                        }
                        h(
                          aa.prototype.__proto__ || Object.getPrototypeOf(aa.prototype),
                          "insertBefore",
                          this
                        ).call(this, e, n)
                      },
                    },
                    {
                      key: "leaf",
                      value: function (f) {
                        return this.path(f).pop() || [null, -1]
                      },
                    },
                    {
                      key: "line",
                      value: function (f) {
                        return f === this.length() ? this.line(f - 1) : this.descendant(y, f)
                      },
                    },
                    {
                      key: "lines",
                      value: function () {
                        return (function qa(e, h, n) {
                          var r = [],
                            w = n
                          e.children.forEachAt(h, n, function (e, h, n) {
                            y(e)
                              ? r.push(e)
                              : e instanceof f.default.Container && (r = r.concat(qa(e, h, w)))
                            w -= n
                          })
                          return r
                        })(
                          this,
                          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                          1 < arguments.length && void 0 !== arguments[1]
                            ? arguments[1]
                            : Number.MAX_VALUE
                        )
                      },
                    },
                    {
                      key: "optimize",
                      value: function () {
                        var f = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [],
                          e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
                        !0 !== this.batch &&
                          (h(
                            aa.prototype.__proto__ || Object.getPrototypeOf(aa.prototype),
                            "optimize",
                            this
                          ).call(this, f, e),
                          0 < f.length && this.emitter.emit(x.default.events.SCROLL_OPTIMIZE, f, e))
                      },
                    },
                    {
                      key: "path",
                      value: function (f) {
                        return h(
                          aa.prototype.__proto__ || Object.getPrototypeOf(aa.prototype),
                          "path",
                          this
                        )
                          .call(this, f)
                          .slice(1)
                      },
                    },
                    {
                      key: "update",
                      value: function (f) {
                        if (!0 !== this.batch) {
                          var e = x.default.sources.USER
                          "string" === typeof f && (e = f)
                          Array.isArray(f) || (f = this.observer.takeRecords())
                          0 < f.length &&
                            this.emitter.emit(x.default.events.SCROLL_BEFORE_UPDATE, e, f)
                          h(
                            aa.prototype.__proto__ || Object.getPrototypeOf(aa.prototype),
                            "update",
                            this
                          ).call(this, f.concat([]))
                          0 < f.length && this.emitter.emit(x.default.events.SCROLL_UPDATE, e, f)
                        }
                      },
                    },
                  ])
                  return aa
                })(f.default.Scroll)
                e.blotName = "scroll"
                e.className = "ql-editor"
                e.tagName = "DIV"
                e.defaultChild = "block"
                e.allowedChildren = [ea.default, fa.BlockEmbed, ba.default]
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e, h) {
                  e in f
                    ? Object.defineProperty(f, e, {
                        value: h,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (f[e] = h)
                  return f
                }
                function w(f, e) {
                  if (!f)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ("object" !== typeof e && "function" !== typeof e) ? f : e
                }
                function y(f, e) {
                  if ("function" !== typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof e
                    )
                  f.prototype = Object.create(e && e.prototype, {
                    constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : (f.__proto__ = e))
                }
                function r(f, e) {
                  var h,
                    n = f === ta.keys.LEFT ? "prefix" : "suffix"
                  return (
                    (h = { key: f, shiftKey: e, altKey: null }),
                    z(h, n, /^$/),
                    z(h, "handler", function (h) {
                      var n = h.index
                      f === ta.keys.RIGHT && (n += h.length + 1)
                      n = this.quill.getLeaf(n)
                      if (!(ia(n, 1)[0] instanceof qa.default.Embed)) return !0
                      f === ta.keys.LEFT
                        ? e
                          ? this.quill.setSelection(
                              h.index - 1,
                              h.length + 1,
                              ka.default.sources.USER
                            )
                          : this.quill.setSelection(h.index - 1, ka.default.sources.USER)
                        : e
                        ? this.quill.setSelection(h.index, h.length + 1, ka.default.sources.USER)
                        : this.quill.setSelection(h.index + h.length + 1, ka.default.sources.USER)
                      return !1
                    }),
                    h
                  )
                }
                function n(f, e) {
                  if (!(0 === f.index || 1 >= this.quill.getLength())) {
                    var h = this.quill.getLine(f.index),
                      n = ia(h, 1)[0]
                    h = {}
                    if (0 === e.offset) {
                      var r = this.quill.getLine(f.index - 1)
                      r = ia(r, 1)[0]
                      null != r &&
                        1 < r.length() &&
                        ((h = n.formats()),
                        (n = this.quill.getFormat(f.index - 1, 1)),
                        (h = ua.default.attributes.diff(h, n) || {}))
                    }
                    e = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(e.prefix) ? 2 : 1
                    this.quill.deleteText(f.index - e, e, ka.default.sources.USER)
                    0 < Object.keys(h).length &&
                      this.quill.formatLine(f.index - e, e, h, ka.default.sources.USER)
                    this.quill.focus()
                  }
                }
                function h(f, e) {
                  var h = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e.suffix) ? 2 : 1
                  if (!(f.index >= this.quill.getLength() - h)) {
                    var n = {},
                      r = 0,
                      w = this.quill.getLine(f.index)
                    w = ia(w, 1)[0]
                    e.offset >= w.length() - 1 &&
                      ((e = this.quill.getLine(f.index + 1)), (e = ia(e, 1)[0])) &&
                      ((n = w.formats()),
                      (r = this.quill.getFormat(f.index, 1)),
                      (n = ua.default.attributes.diff(n, r) || {}),
                      (r = e.length()))
                    this.quill.deleteText(f.index, h, ka.default.sources.USER)
                    0 < Object.keys(n).length &&
                      this.quill.formatLine(f.index + r - 1, h, n, ka.default.sources.USER)
                  }
                }
                function f(f) {
                  var e = this.quill.getLines(f),
                    h = {}
                  1 < e.length &&
                    ((h = e[0].formats()),
                    (e = e[e.length - 1].formats()),
                    (h = ua.default.attributes.diff(e, h) || {}))
                  this.quill.deleteText(f, ka.default.sources.USER)
                  0 < Object.keys(h).length &&
                    this.quill.formatLine(f.index, 1, h, ka.default.sources.USER)
                  this.quill.setSelection(f.index, ka.default.sources.SILENT)
                  this.quill.focus()
                }
                function x(f, e) {
                  var h = this
                  0 < f.length && this.quill.scroll.deleteAt(f.index, f.length)
                  var n = Object.keys(e.format).reduce(function (f, h) {
                    qa.default.query(h, qa.default.Scope.BLOCK) &&
                      !Array.isArray(e.format[h]) &&
                      (f[h] = e.format[h])
                    return f
                  }, {})
                  this.quill.insertText(f.index, "\n", n, ka.default.sources.USER)
                  this.quill.setSelection(f.index + 1, ka.default.sources.SILENT)
                  this.quill.focus()
                  Object.keys(e.format).forEach(function (f) {
                    null == n[f] &&
                      (Array.isArray(e.format[f]) ||
                        ("link" !== f && h.quill.format(f, e.format[f], ka.default.sources.USER)))
                  })
                }
                function fa(f) {
                  return {
                    key: ta.keys.TAB,
                    shiftKey: !f,
                    format: { "code-block": !0 },
                    handler: function (e) {
                      var h = qa.default.query("code-block"),
                        n = e.index,
                        r = e.length
                      e = this.quill.scroll.descendant(h, n)
                      e = ia(e, 2)
                      var w = e[0],
                        x = e[1]
                      if (null != w) {
                        e = this.quill.getIndex(w)
                        var y = w.newlineIndex(x, !0) + 1
                        e = w.newlineIndex(e + x + r)
                        e = w.domNode.textContent.slice(y, e).split("\n")
                        x = 0
                        e.forEach(function (e, z) {
                          f
                            ? (w.insertAt(y + x, h.TAB),
                              (x += h.TAB.length),
                              0 === z ? (n += h.TAB.length) : (r += h.TAB.length))
                            : e.startsWith(h.TAB) &&
                              (w.deleteAt(y + x, h.TAB.length),
                              (x -= h.TAB.length),
                              0 === z ? (n -= h.TAB.length) : (r -= h.TAB.length))
                          x += e.length + 1
                        })
                        this.quill.update(ka.default.sources.USER)
                        this.quill.setSelection(n, r, ka.default.sources.SILENT)
                      }
                    },
                  }
                }
                function ea(f) {
                  return {
                    key: f[0].toUpperCase(),
                    shortKey: !0,
                    handler: function (e, h) {
                      this.quill.format(f, !h.format[f], ka.default.sources.USER)
                    },
                  }
                }
                function ha(f) {
                  if ("string" === typeof f || "number" === typeof f) return ha({ key: f })
                  "object" === ("undefined" === typeof f ? "undefined" : da(f)) &&
                    (f = (0, ra.default)(f, !1))
                  if ("string" === typeof f.key)
                    if (null != ta.keys[f.key.toUpperCase()]) f.key = ta.keys[f.key.toUpperCase()]
                    else if (1 === f.key.length) f.key = f.key.toUpperCase().charCodeAt(0)
                    else return null
                  f.shortKey && ((f[Aa] = f.shortKey), delete f.shortKey)
                  return f
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.SHORTKEY = aa.default = void 0
                var da =
                    "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
                      ? function (f) {
                          return typeof f
                        }
                      : function (f) {
                          return f &&
                            "function" === typeof Symbol &&
                            f.constructor === Symbol &&
                            f !== Symbol.prototype
                            ? "symbol"
                            : typeof f
                        },
                  ia = (function () {
                    return function (f, e) {
                      if (Array.isArray(f)) return f
                      if (Symbol.iterator in Object(f)) {
                        var h = [],
                          n = !0,
                          r = !1,
                          w = void 0
                        try {
                          for (
                            var x = f[Symbol.iterator](), y;
                            !(n = (y = x.next()).done) && (h.push(y.value), !e || h.length !== e);
                            n = !0
                          );
                        } catch (Ha) {
                          ;(r = !0), (w = Ha)
                        } finally {
                          try {
                            if (!n && x["return"]) x["return"]()
                          } finally {
                            if (r) throw w
                          }
                        }
                        return h
                      }
                      throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                  })(),
                  la = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })()
                e = ba(21)
                var ra = ca(e)
                e = ba(11)
                var oa = ca(e)
                e = ba(3)
                var ya = ca(e)
                e = ba(2)
                var Fa = ca(e)
                e = ba(20)
                var ua = ca(e)
                e = ba(0)
                var qa = ca(e)
                e = ba(5)
                var ka = ca(e)
                e = ba(10)
                e = ca(e)
                ba = ba(9)
                ba = ca(ba)
                var wa = (0, e.default)("quill:keyboard"),
                  Aa = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey",
                  ta = (function (e) {
                    function r(e, y) {
                      if (!(this instanceof r))
                        throw new TypeError("Cannot call a class as a function")
                      var z = w(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e, y))
                      z.bindings = {}
                      Object.keys(z.options.bindings).forEach(function (f) {
                        ;("list autofill" !== f ||
                          null == e.scroll.whitelist ||
                          e.scroll.whitelist.list) &&
                          z.options.bindings[f] &&
                          z.addBinding(z.options.bindings[f])
                      })
                      z.addBinding({ key: r.keys.ENTER, shiftKey: null }, x)
                      z.addBinding(
                        { key: r.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null },
                        function () {}
                      )
                      ;/Firefox/i.test(navigator.userAgent)
                        ? (z.addBinding({ key: r.keys.BACKSPACE }, { collapsed: !0 }, n),
                          z.addBinding({ key: r.keys.DELETE }, { collapsed: !0 }, h))
                        : (z.addBinding(
                            { key: r.keys.BACKSPACE },
                            { collapsed: !0, prefix: /^.?$/ },
                            n
                          ),
                          z.addBinding(
                            { key: r.keys.DELETE },
                            { collapsed: !0, suffix: /^.?$/ },
                            h
                          ))
                      z.addBinding({ key: r.keys.BACKSPACE }, { collapsed: !1 }, f)
                      z.addBinding({ key: r.keys.DELETE }, { collapsed: !1 }, f)
                      z.addBinding(
                        {
                          key: r.keys.BACKSPACE,
                          altKey: null,
                          ctrlKey: null,
                          metaKey: null,
                          shiftKey: null,
                        },
                        { collapsed: !0, offset: 0 },
                        n
                      )
                      z.listen()
                      return z
                    }
                    y(r, e)
                    la(r, null, [
                      {
                        key: "match",
                        value: function (f, e) {
                          e = ha(e)
                          return ["altKey", "ctrlKey", "metaKey", "shiftKey"].some(function (h) {
                            return !!e[h] !== f[h] && null !== e[h]
                          })
                            ? !1
                            : e.key === (f.which || f.keyCode)
                        },
                      },
                    ])
                    la(r, [
                      {
                        key: "addBinding",
                        value: function (f) {
                          var e =
                              1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                            h = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
                            n = ha(f)
                          if (null == n || null == n.key)
                            return wa.warn("Attempted to add invalid keyboard binding", n)
                          "function" === typeof e && (e = { handler: e })
                          "function" === typeof h && (h = { handler: h })
                          n = (0, ya.default)(n, e, h)
                          this.bindings[n.key] = this.bindings[n.key] || []
                          this.bindings[n.key].push(n)
                        },
                      },
                      {
                        key: "listen",
                        value: function () {
                          var f = this
                          this.quill.root.addEventListener("keydown", function (e) {
                            if (!e.defaultPrevented) {
                              var h = (f.bindings[e.which || e.keyCode] || []).filter(function (f) {
                                return r.match(e, f)
                              })
                              if (0 !== h.length) {
                                var n = f.quill.getSelection()
                                if (null != n && f.quill.hasFocus()) {
                                  var w = f.quill.getLine(n.index),
                                    x = ia(w, 2)
                                  w = x[0]
                                  x = x[1]
                                  var y = f.quill.getLeaf(n.index),
                                    z = ia(y, 2)
                                  y = z[0]
                                  z = z[1]
                                  var aa =
                                      0 === n.length ? [y, z] : f.quill.getLeaf(n.index + n.length),
                                    ca = ia(aa, 2)
                                  aa = ca[0]
                                  ca = ca[1]
                                  y = y instanceof qa.default.Text ? y.value().slice(0, z) : ""
                                  z = aa instanceof qa.default.Text ? aa.value().slice(ca) : ""
                                  var fa = {
                                    collapsed: 0 === n.length,
                                    empty: 0 === n.length && 1 >= w.length(),
                                    format: f.quill.getFormat(n),
                                    offset: x,
                                    prefix: y,
                                    suffix: z,
                                  }
                                  h.some(function (e) {
                                    if (
                                      (null != e.collapsed && e.collapsed !== fa.collapsed) ||
                                      (null != e.empty && e.empty !== fa.empty) ||
                                      (null != e.offset && e.offset !== fa.offset)
                                    )
                                      return !1
                                    if (Array.isArray(e.format)) {
                                      if (
                                        e.format.every(function (f) {
                                          return null == fa.format[f]
                                        })
                                      )
                                        return !1
                                    } else if (
                                      "object" === da(e.format) &&
                                      !Object.keys(e.format).every(function (f) {
                                        return !0 === e.format[f]
                                          ? null != fa.format[f]
                                          : !1 === e.format[f]
                                          ? null == fa.format[f]
                                          : (0, oa.default)(e.format[f], fa.format[f])
                                      })
                                    )
                                      return !1
                                    return (null != e.prefix && !e.prefix.test(fa.prefix)) ||
                                      (null != e.suffix && !e.suffix.test(fa.suffix))
                                      ? !1
                                      : !0 !== e.handler.call(f, n, fa)
                                  }) && e.preventDefault()
                                }
                              }
                            }
                          })
                        },
                      },
                    ])
                    return r
                  })(ba.default)
                ta.keys = {
                  BACKSPACE: 8,
                  TAB: 9,
                  ENTER: 13,
                  ESCAPE: 27,
                  LEFT: 37,
                  UP: 38,
                  RIGHT: 39,
                  DOWN: 40,
                  DELETE: 46,
                }
                ta.DEFAULTS = {
                  bindings: {
                    bold: ea("bold"),
                    italic: ea("italic"),
                    underline: ea("underline"),
                    indent: {
                      key: ta.keys.TAB,
                      format: ["blockquote", "indent", "list"],
                      handler: function (f, e) {
                        if (e.collapsed && 0 !== e.offset) return !0
                        this.quill.format("indent", "+1", ka.default.sources.USER)
                      },
                    },
                    outdent: {
                      key: ta.keys.TAB,
                      shiftKey: !0,
                      format: ["blockquote", "indent", "list"],
                      handler: function (f, e) {
                        if (e.collapsed && 0 !== e.offset) return !0
                        this.quill.format("indent", "-1", ka.default.sources.USER)
                      },
                    },
                    "outdent backspace": {
                      key: ta.keys.BACKSPACE,
                      collapsed: !0,
                      shiftKey: null,
                      metaKey: null,
                      ctrlKey: null,
                      altKey: null,
                      format: ["indent", "list"],
                      offset: 0,
                      handler: function (f, e) {
                        null != e.format.indent
                          ? this.quill.format("indent", "-1", ka.default.sources.USER)
                          : null != e.format.list &&
                            this.quill.format("list", !1, ka.default.sources.USER)
                      },
                    },
                    "indent code-block": fa(!0),
                    "outdent code-block": fa(!1),
                    "remove tab": {
                      key: ta.keys.TAB,
                      shiftKey: !0,
                      collapsed: !0,
                      prefix: /\t$/,
                      handler: function (f) {
                        this.quill.deleteText(f.index - 1, 1, ka.default.sources.USER)
                      },
                    },
                    tab: {
                      key: ta.keys.TAB,
                      handler: function (f) {
                        this.quill.history.cutoff()
                        var e = new Fa.default().retain(f.index).delete(f.length).insert("\t")
                        this.quill.updateContents(e, ka.default.sources.USER)
                        this.quill.history.cutoff()
                        this.quill.setSelection(f.index + 1, ka.default.sources.SILENT)
                      },
                    },
                    "list empty enter": {
                      key: ta.keys.ENTER,
                      collapsed: !0,
                      format: ["list"],
                      empty: !0,
                      handler: function (f, e) {
                        this.quill.format("list", !1, ka.default.sources.USER)
                        e.format.indent && this.quill.format("indent", !1, ka.default.sources.USER)
                      },
                    },
                    "checklist enter": {
                      key: ta.keys.ENTER,
                      collapsed: !0,
                      format: { list: "checked" },
                      handler: function (f) {
                        var e = this.quill.getLine(f.index),
                          h = ia(e, 2)
                        e = h[0]
                        h = h[1]
                        var n = (0, ya.default)({}, e.formats(), { list: "checked" })
                        e = new Fa.default()
                          .retain(f.index)
                          .insert("\n", n)
                          .retain(e.length() - h - 1)
                          .retain(1, { list: "unchecked" })
                        this.quill.updateContents(e, ka.default.sources.USER)
                        this.quill.setSelection(f.index + 1, ka.default.sources.SILENT)
                        this.quill.scrollIntoView()
                      },
                    },
                    "header enter": {
                      key: ta.keys.ENTER,
                      collapsed: !0,
                      format: ["header"],
                      suffix: /^$/,
                      handler: function (f, e) {
                        var h = this.quill.getLine(f.index),
                          n = ia(h, 2)
                        h = n[0]
                        n = n[1]
                        e = new Fa.default()
                          .retain(f.index)
                          .insert("\n", e.format)
                          .retain(h.length() - n - 1)
                          .retain(1, { header: null })
                        this.quill.updateContents(e, ka.default.sources.USER)
                        this.quill.setSelection(f.index + 1, ka.default.sources.SILENT)
                        this.quill.scrollIntoView()
                      },
                    },
                    "list autofill": {
                      key: " ",
                      collapsed: !0,
                      format: { list: !1 },
                      prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
                      handler: function (f, e) {
                        var h = e.prefix.length,
                          n = this.quill.getLine(f.index),
                          r = ia(n, 2)
                        n = r[0]
                        r = r[1]
                        if (r > h) return !0
                        switch (e.prefix.trim()) {
                          case "[]":
                          case "[ ]":
                            e = "unchecked"
                            break
                          case "[x]":
                            e = "checked"
                            break
                          case "-":
                          case "*":
                            e = "bullet"
                            break
                          default:
                            e = "ordered"
                        }
                        this.quill.insertText(f.index, " ", ka.default.sources.USER)
                        this.quill.history.cutoff()
                        e = new Fa.default()
                          .retain(f.index - r)
                          .delete(h + 1)
                          .retain(n.length() - 2 - r)
                          .retain(1, { list: e })
                        this.quill.updateContents(e, ka.default.sources.USER)
                        this.quill.history.cutoff()
                        this.quill.setSelection(f.index - h, ka.default.sources.SILENT)
                      },
                    },
                    "code exit": {
                      key: ta.keys.ENTER,
                      collapsed: !0,
                      format: ["code-block"],
                      prefix: /\n\n$/,
                      suffix: /^\s+$/,
                      handler: function (f) {
                        var e = this.quill.getLine(f.index),
                          h = ia(e, 2)
                        e = h[0]
                        h = h[1]
                        f = new Fa.default()
                          .retain(f.index + e.length() - h - 2)
                          .retain(1, { "code-block": null })
                          .delete(1)
                        this.quill.updateContents(f, ka.default.sources.USER)
                      },
                    },
                    "embed left": r(ta.keys.LEFT, !1),
                    "embed left shift": r(ta.keys.LEFT, !0),
                    "embed right": r(ta.keys.RIGHT, !1),
                    "embed right shift": r(ta.keys.RIGHT, !0),
                  },
                }
                aa.default = ta
                aa.SHORTKEY = Aa
              },
              function (e, aa, ba) {
                function ca(e, f) {
                  if ("function" !== typeof f && null !== f)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof f
                    )
                  e.prototype = Object.create(f && f.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  f && (Object.setPrototypeOf ? Object.setPrototypeOf(e, f) : (e.__proto__ = f))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var z = (function () {
                    return function (e, f) {
                      if (Array.isArray(e)) return e
                      if (Symbol.iterator in Object(e)) {
                        var h = [],
                          n = !0,
                          r = !1,
                          w = void 0
                        try {
                          for (
                            var y = e[Symbol.iterator](), z;
                            !(n = (z = y.next()).done) && (h.push(z.value), !f || h.length !== f);
                            n = !0
                          );
                        } catch (la) {
                          ;(r = !0), (w = la)
                        } finally {
                          try {
                            if (!n && y["return"]) y["return"]()
                          } finally {
                            if (r) throw w
                          }
                        }
                        return h
                      }
                      throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                  })(),
                  w = function ma(f, e, n) {
                    null === f && (f = Function.prototype)
                    var r = Object.getOwnPropertyDescriptor(f, e)
                    if (void 0 === r) {
                      if (((f = Object.getPrototypeOf(f)), null !== f)) return ma(f, e, n)
                    } else {
                      if ("value" in r) return r.value
                      e = r.get
                      return void 0 === e ? void 0 : e.call(n)
                    }
                  },
                  y = (function () {
                    function f(f, e) {
                      for (var n = 0; n < e.length; n++) {
                        var r = e[n]
                        r.enumerable = r.enumerable || !1
                        r.configurable = !0
                        "value" in r && (r.writable = !0)
                        Object.defineProperty(f, r.key, r)
                      }
                    }
                    return function (e, n, r) {
                      n && f(e.prototype, n)
                      r && f(e, r)
                      return e
                    }
                  })(),
                  r = (e = ba(0)) && e.__esModule ? e : { default: e },
                  n = (ba = ba(7)) && ba.__esModule ? ba : { default: ba }
                ba = (function (f) {
                  function e(f, n) {
                    if (!(this instanceof e))
                      throw new TypeError("Cannot call a class as a function")
                    f = (e.__proto__ || Object.getPrototypeOf(e)).call(this, f)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    f = !f || ("object" !== typeof f && "function" !== typeof f) ? this : f
                    f.selection = n
                    f.textNode = document.createTextNode(e.CONTENTS)
                    f.domNode.appendChild(f.textNode)
                    f._length = 0
                    return f
                  }
                  ca(e, f)
                  y(e, null, [{ key: "value", value: function () {} }])
                  y(e, [
                    {
                      key: "detach",
                      value: function () {
                        null != this.parent && this.parent.removeChild(this)
                      },
                    },
                    {
                      key: "format",
                      value: function (f, n) {
                        if (0 !== this._length)
                          return w(
                            e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                            "format",
                            this
                          ).call(this, f, n)
                        for (
                          var x = this, y = 0;
                          null != x && x.statics.scope !== r.default.Scope.BLOCK_BLOT;

                        )
                          (y += x.offset(x.parent)), (x = x.parent)
                        null != x &&
                          ((this._length = e.CONTENTS.length),
                          x.optimize(),
                          x.formatAt(y, e.CONTENTS.length, f, n),
                          (this._length = 0))
                      },
                    },
                    {
                      key: "index",
                      value: function (f, n) {
                        return f === this.textNode
                          ? 0
                          : w(
                              e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                              "index",
                              this
                            ).call(this, f, n)
                      },
                    },
                    {
                      key: "length",
                      value: function () {
                        return this._length
                      },
                    },
                    {
                      key: "position",
                      value: function () {
                        return [this.textNode, this.textNode.data.length]
                      },
                    },
                    {
                      key: "remove",
                      value: function () {
                        w(
                          e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                          "remove",
                          this
                        ).call(this)
                        this.parent = null
                      },
                    },
                    {
                      key: "restore",
                      value: function () {
                        if (!this.selection.composing && null != this.parent) {
                          var f = this.textNode,
                            w = this.selection.getNativeRange(),
                            x = void 0,
                            y = void 0,
                            aa = void 0
                          null != w &&
                            w.start.node === f &&
                            w.end.node === f &&
                            ((aa = [f, w.start.offset, w.end.offset]),
                            (x = aa[0]),
                            (y = aa[1]),
                            (aa = aa[2]))
                          for (
                            ;
                            null != this.domNode.lastChild &&
                            this.domNode.lastChild !== this.textNode;

                          )
                            this.domNode.parentNode.insertBefore(
                              this.domNode.lastChild,
                              this.domNode
                            )
                          this.textNode.data !== e.CONTENTS &&
                            ((f = this.textNode.data.split(e.CONTENTS).join("")),
                            this.next instanceof n.default
                              ? ((x = this.next.domNode),
                                this.next.insertAt(0, f),
                                (this.textNode.data = e.CONTENTS))
                              : ((this.textNode.data = f),
                                this.parent.insertBefore(r.default.create(this.textNode), this),
                                (this.textNode = document.createTextNode(e.CONTENTS)),
                                this.domNode.appendChild(this.textNode)))
                          this.remove()
                          if (null != y)
                            return (
                              (y = [y, aa].map(function (f) {
                                return Math.max(0, Math.min(x.data.length, f - 1))
                              })),
                              (aa = z(y, 2)),
                              (y = aa[0]),
                              (aa = aa[1]),
                              { startNode: x, startOffset: y, endNode: x, endOffset: aa }
                            )
                        }
                      },
                    },
                    {
                      key: "update",
                      value: function (f, e) {
                        var n = this
                        f.some(function (f) {
                          return "characterData" === f.type && f.target === n.textNode
                        }) &&
                          (f = this.restore()) &&
                          (e.range = f)
                      },
                    },
                    {
                      key: "value",
                      value: function () {
                        return ""
                      },
                    },
                  ])
                  return e
                })(r.default.Embed)
                ba.blotName = "cursor"
                ba.className = "ql-cursor"
                ba.tagName = "span"
                ba.CONTENTS = "\ufeff"
                aa.default = ba
              },
              function (e, aa, ba) {
                function ca(e, y) {
                  if ("function" !== typeof y && null !== y)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof y
                    )
                  e.prototype = Object.create(y && y.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  y && (Object.setPrototypeOf ? Object.setPrototypeOf(e, y) : (e.__proto__ = y))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = (e = ba(0)) && e.__esModule ? e : { default: e }
                var z = (ba = ba(4)) && ba.__esModule ? ba : { default: ba }
                e = (function (e) {
                  function w() {
                    if (!(this instanceof w))
                      throw new TypeError("Cannot call a class as a function")
                    var e = (w.__proto__ || Object.getPrototypeOf(w)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e || ("object" !== typeof e && "function" !== typeof e) ? this : e
                  }
                  ca(w, e)
                  return w
                })(e.default.Container)
                e.allowedChildren = [z.default, ba.BlockEmbed, e]
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(e, n) {
                  if ("function" !== typeof n && null !== n)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof n
                    )
                  e.prototype = Object.create(n && n.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : (e.__proto__ = n))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.ColorStyle = aa.ColorClass = aa.ColorAttributor = void 0
                var z = (function () {
                    function e(e, h) {
                      for (var f = 0; f < h.length; f++) {
                        var n = h[f]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(e, n.key, n)
                      }
                    }
                    return function (n, h, f) {
                      h && e(n.prototype, h)
                      f && e(n, f)
                      return n
                    }
                  })(),
                  w = function x(e, h, f) {
                    null === e && (e = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(e, h)
                    if (void 0 === n) {
                      if (((e = Object.getPrototypeOf(e)), null !== e)) return x(e, h, f)
                    } else {
                      if ("value" in n) return n.value
                      h = n.get
                      return void 0 === h ? void 0 : h.call(f)
                    }
                  },
                  y = (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(0))
                e = (function (e) {
                  function h() {
                    if (!(this instanceof h))
                      throw new TypeError("Cannot call a class as a function")
                    var f = (h.__proto__ || Object.getPrototypeOf(h)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !f || ("object" !== typeof f && "function" !== typeof f) ? this : f
                  }
                  ca(h, e)
                  z(h, [
                    {
                      key: "value",
                      value: function (f) {
                        f = w(
                          h.prototype.__proto__ || Object.getPrototypeOf(h.prototype),
                          "value",
                          this
                        ).call(this, f)
                        if (!f.startsWith("rgb(")) return f
                        f = f.replace(/^[^\d]+/, "").replace(/[^\d]+$/, "")
                        return (
                          "#" +
                          f
                            .split(",")
                            .map(function (f) {
                              return ("00" + parseInt(f).toString(16)).slice(-2)
                            })
                            .join("")
                        )
                      },
                    },
                  ])
                  return h
                })(y.default.Attributor.Style)
                ba = new y.default.Attributor.Class("color", "ql-color", {
                  scope: y.default.Scope.INLINE,
                })
                y = new e("color", "color", { scope: y.default.Scope.INLINE })
                aa.ColorAttributor = e
                aa.ColorClass = ba
                aa.ColorStyle = y
              },
              function (e, aa, ba) {
                function ca(e, n) {
                  if ("function" !== typeof n && null !== n)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof n
                    )
                  e.prototype = Object.create(n && n.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : (e.__proto__ = n))
                }
                function z(e, n) {
                  var h = document.createElement("a")
                  h.href = e
                  e = h.href.slice(0, h.href.indexOf(":"))
                  return -1 < n.indexOf(e)
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.sanitize = aa.default = void 0
                var w = (function () {
                    function e(e, h) {
                      for (var f = 0; f < h.length; f++) {
                        var n = h[f]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(e, n.key, n)
                      }
                    }
                    return function (n, h, f) {
                      h && e(n.prototype, h)
                      f && e(n, f)
                      return n
                    }
                  })(),
                  y = function x(e, h, f) {
                    null === e && (e = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(e, h)
                    if (void 0 === n) {
                      if (((e = Object.getPrototypeOf(e)), null !== e)) return x(e, h, f)
                    } else {
                      if ("value" in n) return n.value
                      h = n.get
                      return void 0 === h ? void 0 : h.call(f)
                    }
                  }
                e = (function (e) {
                  function h() {
                    if (!(this instanceof h))
                      throw new TypeError("Cannot call a class as a function")
                    var f = (h.__proto__ || Object.getPrototypeOf(h)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !f || ("object" !== typeof f && "function" !== typeof f) ? this : f
                  }
                  ca(h, e)
                  w(
                    h,
                    [
                      {
                        key: "format",
                        value: function (f, e) {
                          if (f !== this.statics.blotName || !e)
                            return y(
                              h.prototype.__proto__ || Object.getPrototypeOf(h.prototype),
                              "format",
                              this
                            ).call(this, f, e)
                          e = this.constructor.sanitize(e)
                          this.domNode.setAttribute("href", e)
                        },
                      },
                    ],
                    [
                      {
                        key: "create",
                        value: function (f) {
                          var e = y(h.__proto__ || Object.getPrototypeOf(h), "create", this).call(
                            this,
                            f
                          )
                          f = this.sanitize(f)
                          e.setAttribute("href", f)
                          e.setAttribute("rel", "noopener noreferrer")
                          e.setAttribute("target", "_blank")
                          return e
                        },
                      },
                      {
                        key: "formats",
                        value: function (f) {
                          return f.getAttribute("href")
                        },
                      },
                      {
                        key: "sanitize",
                        value: function (f) {
                          return z(f, this.PROTOCOL_WHITELIST) ? f : this.SANITIZED_URL
                        },
                      },
                    ]
                  )
                  return h
                })(
                  (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(6)).default
                )
                e.blotName = "link"
                e.tagName = "A"
                e.SANITIZED_URL = "about:blank"
                e.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"]
                aa.default = e
                aa.sanitize = z
              },
              function (e, aa, ba) {
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var ca =
                    "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
                      ? function (e) {
                          return typeof e
                        }
                      : function (e) {
                          return e &&
                            "function" === typeof Symbol &&
                            e.constructor === Symbol &&
                            e !== Symbol.prototype
                            ? "symbol"
                            : typeof e
                        },
                  z = (function () {
                    function e(e, f) {
                      for (var h = 0; h < f.length; h++) {
                        var n = f[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(e, n.key, n)
                      }
                    }
                    return function (h, f, n) {
                      f && e(h.prototype, f)
                      n && e(h, n)
                      return h
                    }
                  })(),
                  w = (e = ba(23)) && e.__esModule ? e : { default: e },
                  y = (ba = ba(107)) && ba.__esModule ? ba : { default: ba },
                  r = 0
                ba = (function () {
                  function e(h) {
                    var f = this
                    if (!(this instanceof e))
                      throw new TypeError("Cannot call a class as a function")
                    this.select = h
                    this.container = document.createElement("span")
                    this.buildPicker()
                    this.select.style.display = "none"
                    this.select.parentNode.insertBefore(this.container, this.select)
                    this.label.addEventListener("mousedown", function () {
                      f.togglePicker()
                    })
                    this.label.addEventListener("keydown", function (e) {
                      switch (e.keyCode) {
                        case w.default.keys.ENTER:
                          f.togglePicker()
                          break
                        case w.default.keys.ESCAPE:
                          f.escape(), e.preventDefault()
                      }
                    })
                    this.select.addEventListener("change", this.update.bind(this))
                  }
                  z(e, [
                    {
                      key: "togglePicker",
                      value: function () {
                        this.container.classList.toggle("ql-expanded")
                        var e = this.label
                        e.setAttribute("aria-expanded", "true" !== e.getAttribute("aria-expanded"))
                        e = this.options
                        e.setAttribute("aria-hidden", "true" !== e.getAttribute("aria-hidden"))
                      },
                    },
                    {
                      key: "buildItem",
                      value: function (e) {
                        var f = this,
                          h = document.createElement("span")
                        h.tabIndex = "0"
                        h.setAttribute("role", "button")
                        h.classList.add("ql-picker-item")
                        e.hasAttribute("value") &&
                          h.setAttribute("data-value", e.getAttribute("value"))
                        e.textContent && h.setAttribute("data-label", e.textContent)
                        h.addEventListener("click", function () {
                          f.selectItem(h, !0)
                        })
                        h.addEventListener("keydown", function (e) {
                          switch (e.keyCode) {
                            case w.default.keys.ENTER:
                              f.selectItem(h, !0)
                              e.preventDefault()
                              break
                            case w.default.keys.ESCAPE:
                              f.escape(), e.preventDefault()
                          }
                        })
                        return h
                      },
                    },
                    {
                      key: "buildLabel",
                      value: function () {
                        var e = document.createElement("span")
                        e.classList.add("ql-picker-label")
                        e.innerHTML = y.default
                        e.tabIndex = "0"
                        e.setAttribute("role", "button")
                        e.setAttribute("aria-expanded", "false")
                        this.container.appendChild(e)
                        return e
                      },
                    },
                    {
                      key: "buildOptions",
                      value: function () {
                        var e = this,
                          f = document.createElement("span")
                        f.classList.add("ql-picker-options")
                        f.setAttribute("aria-hidden", "true")
                        f.tabIndex = "-1"
                        f.id = "ql-picker-options-" + r
                        r += 1
                        this.label.setAttribute("aria-controls", f.id)
                        this.options = f
                        ;[].slice.call(this.select.options).forEach(function (h) {
                          var n = e.buildItem(h)
                          f.appendChild(n)
                          !0 === h.selected && e.selectItem(n)
                        })
                        this.container.appendChild(f)
                      },
                    },
                    {
                      key: "buildPicker",
                      value: function () {
                        var e = this
                        ;[].slice.call(this.select.attributes).forEach(function (f) {
                          e.container.setAttribute(f.name, f.value)
                        })
                        this.container.classList.add("ql-picker")
                        this.label = this.buildLabel()
                        this.buildOptions()
                      },
                    },
                    {
                      key: "escape",
                      value: function () {
                        var e = this
                        this.close()
                        setTimeout(function () {
                          return e.label.focus()
                        }, 1)
                      },
                    },
                    {
                      key: "close",
                      value: function () {
                        this.container.classList.remove("ql-expanded")
                        this.label.setAttribute("aria-expanded", "false")
                        this.options.setAttribute("aria-hidden", "true")
                      },
                    },
                    {
                      key: "selectItem",
                      value: function (e) {
                        var f = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !1,
                          h = this.container.querySelector(".ql-selected")
                        e !== h &&
                          (null != h && h.classList.remove("ql-selected"),
                          null != e &&
                            (e.classList.add("ql-selected"),
                            (this.select.selectedIndex = [].indexOf.call(e.parentNode.children, e)),
                            e.hasAttribute("data-value")
                              ? this.label.setAttribute("data-value", e.getAttribute("data-value"))
                              : this.label.removeAttribute("data-value"),
                            e.hasAttribute("data-label")
                              ? this.label.setAttribute("data-label", e.getAttribute("data-label"))
                              : this.label.removeAttribute("data-label"),
                            f &&
                              ("function" === typeof Event
                                ? this.select.dispatchEvent(new Event("change"))
                                : "object" ===
                                    ("undefined" === typeof Event ? "undefined" : ca(Event)) &&
                                  ((f = document.createEvent("Event")),
                                  f.initEvent("change", !0, !0),
                                  this.select.dispatchEvent(f)),
                              this.close())))
                      },
                    },
                    {
                      key: "update",
                      value: function () {
                        var e = void 0
                        if (-1 < this.select.selectedIndex) {
                          var f =
                            this.container.querySelector(".ql-picker-options").children[
                              this.select.selectedIndex
                            ]
                          e = this.select.options[this.select.selectedIndex]
                          this.selectItem(f)
                        } else this.selectItem(null)
                        this.label.classList.toggle(
                          "ql-active",
                          null != e && e !== this.select.querySelector("option[selected]")
                        )
                      },
                    },
                  ])
                  return e
                })()
                aa.default = ba
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = ba(0)
                e = ca(e)
                var z = ba(5)
                z = ca(z)
                var w = ba(4),
                  y = ca(w),
                  r = ba(16)
                r = ca(r)
                var n = ba(25)
                n = ca(n)
                var h = ba(24)
                h = ca(h)
                var f = ba(35)
                f = ca(f)
                var x = ba(6)
                x = ca(x)
                var fa = ba(22)
                fa = ca(fa)
                var ea = ba(7)
                ea = ca(ea)
                var ha = ba(55)
                ha = ca(ha)
                var da = ba(42)
                da = ca(da)
                ba = ba(23)
                z.default.register({
                  "blots/block": y.default,
                  "blots/block/embed": w.BlockEmbed,
                  "blots/break": r.default,
                  "blots/container": n.default,
                  "blots/cursor": h.default,
                  "blots/embed": f.default,
                  "blots/inline": x.default,
                  "blots/scroll": fa.default,
                  "blots/text": ea.default,
                  "modules/clipboard": ha.default,
                  "modules/history": da.default,
                  "modules/keyboard": ca(ba).default,
                })
                e.default.register(
                  y.default,
                  r.default,
                  h.default,
                  x.default,
                  fa.default,
                  ea.default
                )
                aa.default = z.default
              },
              function (e, aa, ba) {
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var ca = ba(1)
                e = (function () {
                  function e(e) {
                    this.domNode = e
                    this.domNode[ca.DATA_KEY] = { blot: this }
                  }
                  Object.defineProperty(e.prototype, "statics", {
                    get: function () {
                      return this.constructor
                    },
                    enumerable: !0,
                    configurable: !0,
                  })
                  e.create = function (e) {
                    if (null == this.tagName)
                      throw new ca.ParchmentError("Blot definition missing tagName")
                    Array.isArray(this.tagName)
                      ? ("string" === typeof e &&
                          ((e = e.toUpperCase()),
                          parseInt(e).toString() === e && (e = parseInt(e))),
                        (e =
                          "number" === typeof e
                            ? document.createElement(this.tagName[e - 1])
                            : -1 < this.tagName.indexOf(e)
                            ? document.createElement(e)
                            : document.createElement(this.tagName[0])))
                      : (e = document.createElement(this.tagName))
                    this.className && e.classList.add(this.className)
                    return e
                  }
                  e.prototype.attach = function () {
                    null != this.parent && (this.scroll = this.parent.scroll)
                  }
                  e.prototype.clone = function () {
                    var e = this.domNode.cloneNode(!1)
                    return ca.create(e)
                  }
                  e.prototype.detach = function () {
                    null != this.parent && this.parent.removeChild(this)
                    delete this.domNode[ca.DATA_KEY]
                  }
                  e.prototype.deleteAt = function (e, y) {
                    this.isolate(e, y).remove()
                  }
                  e.prototype.formatAt = function (e, y, r, n) {
                    e = this.isolate(e, y)
                    null != ca.query(r, ca.Scope.BLOT) && n
                      ? e.wrap(r, n)
                      : null != ca.query(r, ca.Scope.ATTRIBUTE) &&
                        ((y = ca.create(this.statics.scope)), e.wrap(y), y.format(r, n))
                  }
                  e.prototype.insertAt = function (e, y, r) {
                    y = null == r ? ca.create("text", y) : ca.create(y, r)
                    e = this.split(e)
                    this.parent.insertBefore(y, e)
                  }
                  e.prototype.insertInto = function (e, y) {
                    void 0 === y && (y = null)
                    null != this.parent && this.parent.children.remove(this)
                    var r = null
                    e.children.insertBefore(this, y)
                    null != y && (r = y.domNode)
                    ;(this.domNode.parentNode == e.domNode && this.domNode.nextSibling == r) ||
                      e.domNode.insertBefore(this.domNode, r)
                    this.parent = e
                    this.attach()
                  }
                  e.prototype.isolate = function (e, y) {
                    e = this.split(e)
                    e.split(y)
                    return e
                  }
                  e.prototype.length = function () {
                    return 1
                  }
                  e.prototype.offset = function (e) {
                    void 0 === e && (e = this.parent)
                    return null == this.parent || this == e
                      ? 0
                      : this.parent.children.offset(this) + this.parent.offset(e)
                  }
                  e.prototype.optimize = function () {
                    null != this.domNode[ca.DATA_KEY] && delete this.domNode[ca.DATA_KEY].mutations
                  }
                  e.prototype.remove = function () {
                    null != this.domNode.parentNode &&
                      this.domNode.parentNode.removeChild(this.domNode)
                    this.detach()
                  }
                  e.prototype.replace = function (e) {
                    null != e.parent && (e.parent.insertBefore(this, e.next), e.remove())
                  }
                  e.prototype.replaceWith = function (e, y) {
                    e = "string" === typeof e ? ca.create(e, y) : e
                    e.replace(this)
                    return e
                  }
                  e.prototype.split = function (e) {
                    return 0 === e ? this : this.next
                  }
                  e.prototype.update = function () {}
                  e.prototype.wrap = function (e, y) {
                    e = "string" === typeof e ? ca.create(e, y) : e
                    null != this.parent && this.parent.insertBefore(e, this.next)
                    e.appendChild(this)
                    return e
                  }
                  e.blotName = "abstract"
                  return e
                })()
                aa.default = e
              },
              function (e, aa, ba) {
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var ca = ba(12),
                  z = ba(32),
                  w = ba(33),
                  y = ba(1)
                e = (function () {
                  function e(e) {
                    this.attributes = {}
                    this.domNode = e
                    this.build()
                  }
                  e.prototype.attribute = function (e, h) {
                    h
                      ? e.add(this.domNode, h) &&
                        (null != e.value(this.domNode)
                          ? (this.attributes[e.attrName] = e)
                          : delete this.attributes[e.attrName])
                      : (e.remove(this.domNode), delete this.attributes[e.attrName])
                  }
                  e.prototype.build = function () {
                    var e = this
                    this.attributes = {}
                    var h = ca.default.keys(this.domNode),
                      f = z.default.keys(this.domNode),
                      r = w.default.keys(this.domNode)
                    h.concat(f)
                      .concat(r)
                      .forEach(function (f) {
                        f = y.query(f, y.Scope.ATTRIBUTE)
                        f instanceof ca.default && (e.attributes[f.attrName] = f)
                      })
                  }
                  e.prototype.copy = function (e) {
                    var h = this
                    Object.keys(this.attributes).forEach(function (f) {
                      var n = h.attributes[f].value(h.domNode)
                      e.format(f, n)
                    })
                  }
                  e.prototype.move = function (e) {
                    var h = this
                    this.copy(e)
                    Object.keys(this.attributes).forEach(function (f) {
                      h.attributes[f].remove(h.domNode)
                    })
                    this.attributes = {}
                  }
                  e.prototype.values = function () {
                    var e = this
                    return Object.keys(this.attributes).reduce(function (h, f) {
                      h[f] = e.attributes[f].value(e.domNode)
                      return h
                    }, {})
                  }
                  return e
                })()
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(e, y) {
                  return (e.getAttribute("class") || "").split(/\s+/).filter(function (e) {
                    return 0 === e.indexOf(y + "-")
                  })
                }
                var z =
                  (this && this.__extends) ||
                  (function () {
                    var e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, r) {
                          e.__proto__ = r
                        }) ||
                      function (e, r) {
                        for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n])
                      }
                    return function (w, r) {
                      function n() {
                        this.constructor = w
                      }
                      e(w, r)
                      w.prototype =
                        null === r ? Object.create(r) : ((n.prototype = r.prototype), new n())
                    }
                  })()
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = (function (e) {
                  function w() {
                    return (null !== e && e.apply(this, arguments)) || this
                  }
                  z(w, e)
                  w.keys = function (e) {
                    return (e.getAttribute("class") || "").split(/\s+/).map(function (e) {
                      return e.split("-").slice(0, -1).join("-")
                    })
                  }
                  w.prototype.add = function (e, n) {
                    if (!this.canAdd(e, n)) return !1
                    this.remove(e)
                    e.classList.add(this.keyName + "-" + n)
                    return !0
                  }
                  w.prototype.remove = function (e) {
                    ca(e, this.keyName).forEach(function (n) {
                      e.classList.remove(n)
                    })
                    0 === e.classList.length && e.removeAttribute("class")
                  }
                  w.prototype.value = function (e) {
                    var n = (ca(e, this.keyName)[0] || "").slice(this.keyName.length + 1)
                    return this.canAdd(e, n) ? n : ""
                  }
                  return w
                })(ba(12).default)
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(e) {
                  e = e.split("-")
                  var w = e
                    .slice(1)
                    .map(function (e) {
                      return e[0].toUpperCase() + e.slice(1)
                    })
                    .join("")
                  return e[0] + w
                }
                var z =
                  (this && this.__extends) ||
                  (function () {
                    var e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, r) {
                          e.__proto__ = r
                        }) ||
                      function (e, r) {
                        for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n])
                      }
                    return function (w, r) {
                      function n() {
                        this.constructor = w
                      }
                      e(w, r)
                      w.prototype =
                        null === r ? Object.create(r) : ((n.prototype = r.prototype), new n())
                    }
                  })()
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = (function (e) {
                  function w() {
                    return (null !== e && e.apply(this, arguments)) || this
                  }
                  z(w, e)
                  w.keys = function (e) {
                    return (e.getAttribute("style") || "").split(";").map(function (e) {
                      return e.split(":")[0].trim()
                    })
                  }
                  w.prototype.add = function (e, n) {
                    if (!this.canAdd(e, n)) return !1
                    e.style[ca(this.keyName)] = n
                    return !0
                  }
                  w.prototype.remove = function (e) {
                    e.style[ca(this.keyName)] = ""
                    e.getAttribute("style") || e.removeAttribute("style")
                  }
                  w.prototype.value = function (e) {
                    var n = e.style[ca(this.keyName)]
                    return this.canAdd(e, n) ? n : ""
                  }
                  return w
                })(ba(12).default)
                aa.default = e
              },
              function (e, aa) {
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var ba = (function () {
                  function e(e, w) {
                    for (var y = 0; y < w.length; y++) {
                      var r = w[y]
                      r.enumerable = r.enumerable || !1
                      r.configurable = !0
                      "value" in r && (r.writable = !0)
                      Object.defineProperty(e, r.key, r)
                    }
                  }
                  return function (z, w, y) {
                    w && e(z.prototype, w)
                    y && e(z, y)
                    return z
                  }
                })()
                e = (function () {
                  function e(z, w) {
                    if (!(this instanceof e))
                      throw new TypeError("Cannot call a class as a function")
                    this.quill = z
                    this.options = w
                    this.modules = {}
                  }
                  ba(e, [
                    {
                      key: "init",
                      value: function () {
                        var e = this
                        Object.keys(this.options.modules).forEach(function (w) {
                          null == e.modules[w] && e.addModule(w)
                        })
                      },
                    },
                    {
                      key: "addModule",
                      value: function (e) {
                        var w = this.quill.constructor.import("modules/" + e)
                        this.modules[e] = new w(this.quill, this.options.modules[e] || {})
                        return this.modules[e]
                      },
                    },
                  ])
                  return e
                })()
                e.DEFAULTS = { modules: {} }
                e.themes = { default: e }
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(e, f) {
                  if (!e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !f || ("object" !== typeof f && "function" !== typeof f) ? e : f
                }
                function z(e, f) {
                  if ("function" !== typeof f && null !== f)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof f
                    )
                  e.prototype = Object.create(f && f.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  f && (Object.setPrototypeOf ? Object.setPrototypeOf(e, f) : (e.__proto__ = f))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var w = (function () {
                    function e(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (f, h, n) {
                      h && e(f.prototype, h)
                      n && e(f, n)
                      return f
                    }
                  })(),
                  y = function ma(f, e, n) {
                    null === f && (f = Function.prototype)
                    var r = Object.getOwnPropertyDescriptor(f, e)
                    if (void 0 === r) {
                      if (((f = Object.getPrototypeOf(f)), null !== f)) return ma(f, e, n)
                    } else {
                      if ("value" in r) return r.value
                      e = r.get
                      return void 0 === e ? void 0 : e.call(n)
                    }
                  },
                  r = (e = ba(0)) && e.__esModule ? e : { default: e },
                  n = (ba = ba(7)) && ba.__esModule ? ba : { default: ba }
                ba = (function (f) {
                  function e(f) {
                    if (!(this instanceof e))
                      throw new TypeError("Cannot call a class as a function")
                    var n = ca(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, f))
                    n.contentNode = document.createElement("span")
                    n.contentNode.setAttribute("contenteditable", !1)
                    ;[].slice.call(n.domNode.childNodes).forEach(function (f) {
                      n.contentNode.appendChild(f)
                    })
                    n.leftGuard = document.createTextNode("\ufeff")
                    n.rightGuard = document.createTextNode("\ufeff")
                    n.domNode.appendChild(n.leftGuard)
                    n.domNode.appendChild(n.contentNode)
                    n.domNode.appendChild(n.rightGuard)
                    return n
                  }
                  z(e, f)
                  w(e, [
                    {
                      key: "index",
                      value: function (f, n) {
                        return f === this.leftGuard
                          ? 0
                          : f === this.rightGuard
                          ? 1
                          : y(
                              e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                              "index",
                              this
                            ).call(this, f, n)
                      },
                    },
                    {
                      key: "restore",
                      value: function (f) {
                        var e = void 0,
                          w = f.data.split("\ufeff").join("")
                        f === this.leftGuard
                          ? this.prev instanceof n.default
                            ? ((e = this.prev.length()),
                              this.prev.insertAt(e, w),
                              (e = { startNode: this.prev.domNode, startOffset: e + w.length }))
                            : ((e = document.createTextNode(w)),
                              this.parent.insertBefore(r.default.create(e), this),
                              (e = { startNode: e, startOffset: w.length }))
                          : f === this.rightGuard &&
                            (this.next instanceof n.default
                              ? (this.next.insertAt(0, w),
                                (e = { startNode: this.next.domNode, startOffset: w.length }))
                              : ((e = document.createTextNode(w)),
                                this.parent.insertBefore(r.default.create(e), this.next),
                                (e = { startNode: e, startOffset: w.length })))
                        f.data = "\ufeff"
                        return e
                      },
                    },
                    {
                      key: "update",
                      value: function (f, e) {
                        var n = this
                        f.forEach(function (f) {
                          "characterData" !== f.type ||
                            (f.target !== n.leftGuard && f.target !== n.rightGuard) ||
                            !(f = n.restore(f.target)) ||
                            (e.range = f)
                        })
                      },
                    },
                  ])
                  return e
                })(r.default.Embed)
                aa.default = ba
              },
              function (e, aa, ba) {
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.AlignStyle = aa.AlignClass = aa.AlignAttribute = void 0
                var ca = (e = ba(0)) && e.__esModule ? e : { default: e }
                var z = { scope: ca.default.Scope.BLOCK, whitelist: ["right", "center", "justify"] }
                e = new ca.default.Attributor.Attribute("align", "align", z)
                ba = new ca.default.Attributor.Class("align", "ql-align", z)
                ca = new ca.default.Attributor.Style("align", "text-align", z)
                aa.AlignAttribute = e
                aa.AlignClass = ba
                aa.AlignStyle = ca
              },
              function (e, aa, ba) {
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.BackgroundStyle = aa.BackgroundClass = void 0
                e = (e = ba(0)) && e.__esModule ? e : { default: e }
                var ca = ba(26)
                ba = new e.default.Attributor.Class("background", "ql-bg", {
                  scope: e.default.Scope.INLINE,
                })
                e = new ca.ColorAttributor("background", "background-color", {
                  scope: e.default.Scope.INLINE,
                })
                aa.BackgroundClass = ba
                aa.BackgroundStyle = e
              },
              function (e, aa, ba) {
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.DirectionStyle = aa.DirectionClass = aa.DirectionAttribute = void 0
                var ca = (e = ba(0)) && e.__esModule ? e : { default: e }
                var z = { scope: ca.default.Scope.BLOCK, whitelist: ["rtl"] }
                e = new ca.default.Attributor.Attribute("direction", "dir", z)
                ba = new ca.default.Attributor.Class("direction", "ql-direction", z)
                ca = new ca.default.Attributor.Style("direction", "direction", z)
                aa.DirectionAttribute = e
                aa.DirectionClass = ba
                aa.DirectionStyle = ca
              },
              function (e, aa, ba) {
                function ca(e, n) {
                  if ("function" !== typeof n && null !== n)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof n
                    )
                  e.prototype = Object.create(n && n.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : (e.__proto__ = n))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.FontClass = aa.FontStyle = void 0
                var z = (function () {
                    function e(e, h) {
                      for (var f = 0; f < h.length; f++) {
                        var n = h[f]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(e, n.key, n)
                      }
                    }
                    return function (n, h, f) {
                      h && e(n.prototype, h)
                      f && e(n, f)
                      return n
                    }
                  })(),
                  w = function x(e, h, f) {
                    null === e && (e = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(e, h)
                    if (void 0 === n) {
                      if (((e = Object.getPrototypeOf(e)), null !== e)) return x(e, h, f)
                    } else {
                      if ("value" in n) return n.value
                      h = n.get
                      return void 0 === h ? void 0 : h.call(f)
                    }
                  }
                ba = (function (e) {
                  return e && e.__esModule ? e : { default: e }
                })(ba(0))
                var y = { scope: ba.default.Scope.INLINE, whitelist: ["serif", "monospace"] }
                e = new ba.default.Attributor.Class("font", "ql-font", y)
                ba = new ((function (e) {
                  function h() {
                    if (!(this instanceof h))
                      throw new TypeError("Cannot call a class as a function")
                    var f = (h.__proto__ || Object.getPrototypeOf(h)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !f || ("object" !== typeof f && "function" !== typeof f) ? this : f
                  }
                  ca(h, e)
                  z(h, [
                    {
                      key: "value",
                      value: function (f) {
                        return w(
                          h.prototype.__proto__ || Object.getPrototypeOf(h.prototype),
                          "value",
                          this
                        )
                          .call(this, f)
                          .replace(/["']/g, "")
                      },
                    },
                  ])
                  return h
                })(ba.default.Attributor.Style))("font", "font-family", y)
                aa.FontStyle = ba
                aa.FontClass = e
              },
              function (e, aa, ba) {
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.SizeStyle = aa.SizeClass = void 0
                ba = (e = ba(0)) && e.__esModule ? e : { default: e }
                e = new ba.default.Attributor.Class("size", "ql-size", {
                  scope: ba.default.Scope.INLINE,
                  whitelist: ["small", "large", "huge"],
                })
                ba = new ba.default.Attributor.Style("size", "font-size", {
                  scope: ba.default.Scope.INLINE,
                  whitelist: ["10px", "18px", "32px"],
                })
                aa.SizeClass = e
                aa.SizeStyle = ba
              },
              function (e, aa, ba) {
                e.exports = {
                  align: { "": ba(76), center: ba(77), right: ba(78), justify: ba(79) },
                  background: ba(80),
                  blockquote: ba(81),
                  bold: ba(82),
                  clean: ba(83),
                  code: ba(58),
                  "code-block": ba(58),
                  color: ba(84),
                  direction: { "": ba(85), rtl: ba(86) },
                  float: { center: ba(87), full: ba(88), left: ba(89), right: ba(90) },
                  formula: ba(91),
                  header: { 1: ba(92), 2: ba(93) },
                  italic: ba(94),
                  image: ba(95),
                  indent: { "+1": ba(96), "-1": ba(97) },
                  link: ba(98),
                  list: { ordered: ba(99), bullet: ba(100), check: ba(101) },
                  script: { sub: ba(102), super: ba(103) },
                  strike: ba(104),
                  underline: ba(105),
                  video: ba(106),
                }
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e) {
                  if (!f)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ("object" !== typeof e && "function" !== typeof e) ? f : e
                }
                function w(f, e) {
                  if ("function" !== typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof e
                    )
                  f.prototype = Object.create(e && e.prototype, {
                    constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : (f.__proto__ = e))
                }
                function y(f) {
                  f = f.ops[f.ops.length - 1]
                  return null == f
                    ? !1
                    : null != f.insert
                    ? "string" === typeof f.insert && f.insert.endsWith("\n")
                    : null != f.attributes
                    ? Object.keys(f.attributes).some(function (f) {
                        return null != h.default.query(f, h.default.Scope.BLOCK)
                      })
                    : !1
                }
                function r(f) {
                  var e = f.reduce(function (f, e) {
                    return (f += e.delete || 0)
                  }, 0)
                  e = f.length() - e
                  y(f) && --e
                  return e
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.getLastChangeIndex = aa.default = void 0
                var n = (function () {
                  function f(f, e) {
                    for (var h = 0; h < e.length; h++) {
                      var n = e[h]
                      n.enumerable = n.enumerable || !1
                      n.configurable = !0
                      "value" in n && (n.writable = !0)
                      Object.defineProperty(f, n.key, n)
                    }
                  }
                  return function (e, h, n) {
                    h && f(e.prototype, h)
                    n && f(e, n)
                    return e
                  }
                })()
                e = ba(0)
                var h = ca(e)
                e = ba(5)
                var f = ca(e)
                ba = ba(9)
                ba = (function (e) {
                  function h(e, n) {
                    if (!(this instanceof h))
                      throw new TypeError("Cannot call a class as a function")
                    var r = z(this, (h.__proto__ || Object.getPrototypeOf(h)).call(this, e, n))
                    r.lastRecorded = 0
                    r.ignoreChange = !1
                    r.clear()
                    r.quill.on(f.default.events.EDITOR_CHANGE, function (e, h, n, w) {
                      e !== f.default.events.TEXT_CHANGE ||
                        r.ignoreChange ||
                        (r.options.userOnly && w !== f.default.sources.USER
                          ? r.transform(h)
                          : r.record(h, n))
                    })
                    r.quill.keyboard.addBinding({ key: "Z", shortKey: !0 }, r.undo.bind(r))
                    r.quill.keyboard.addBinding(
                      { key: "Z", shortKey: !0, shiftKey: !0 },
                      r.redo.bind(r)
                    )
                    ;/Win/i.test(navigator.platform) &&
                      r.quill.keyboard.addBinding({ key: "Y", shortKey: !0 }, r.redo.bind(r))
                    return r
                  }
                  w(h, e)
                  n(h, [
                    {
                      key: "change",
                      value: function (e, h) {
                        if (0 !== this.stack[e].length) {
                          var n = this.stack[e].pop()
                          this.stack[h].push(n)
                          this.lastRecorded = 0
                          this.ignoreChange = !0
                          this.quill.updateContents(n[e], f.default.sources.USER)
                          this.ignoreChange = !1
                          e = r(n[e])
                          this.quill.setSelection(e)
                        }
                      },
                    },
                    {
                      key: "clear",
                      value: function () {
                        this.stack = { undo: [], redo: [] }
                      },
                    },
                    {
                      key: "cutoff",
                      value: function () {
                        this.lastRecorded = 0
                      },
                    },
                    {
                      key: "record",
                      value: function (f, e) {
                        if (0 !== f.ops.length) {
                          this.stack.redo = []
                          e = this.quill.getContents().diff(e)
                          var h = Date.now()
                          this.lastRecorded + this.options.delay > h && 0 < this.stack.undo.length
                            ? ((h = this.stack.undo.pop()),
                              (e = e.compose(h.undo)),
                              (f = h.redo.compose(f)))
                            : (this.lastRecorded = h)
                          this.stack.undo.push({ redo: f, undo: e })
                          this.stack.undo.length > this.options.maxStack && this.stack.undo.shift()
                        }
                      },
                    },
                    {
                      key: "redo",
                      value: function () {
                        this.change("redo", "undo")
                      },
                    },
                    {
                      key: "transform",
                      value: function (f) {
                        this.stack.undo.forEach(function (e) {
                          e.undo = f.transform(e.undo, !0)
                          e.redo = f.transform(e.redo, !0)
                        })
                        this.stack.redo.forEach(function (e) {
                          e.undo = f.transform(e.undo, !0)
                          e.redo = f.transform(e.redo, !0)
                        })
                      },
                    },
                    {
                      key: "undo",
                      value: function () {
                        this.change("undo", "redo")
                      },
                    },
                  ])
                  return h
                })(ca(ba).default)
                ba.DEFAULTS = { delay: 1e3, maxStack: 100, userOnly: !1 }
                aa.default = ba
                aa.getLastChangeIndex = r
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e) {
                  if (!(f instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                function w(f, e) {
                  if (!f)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ("object" !== typeof e && "function" !== typeof e) ? f : e
                }
                function y(f, e) {
                  if ("function" !== typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof e
                    )
                  f.prototype = Object.create(e && e.prototype, {
                    constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : (f.__proto__ = e))
                }
                function r(f, e) {
                  var h = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !1
                  e.forEach(function (e) {
                    var n = document.createElement("option")
                    e === h ? n.setAttribute("selected", "selected") : n.setAttribute("value", e)
                    f.appendChild(n)
                  })
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.default = aa.BaseTooltip = void 0
                var n = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })(),
                  h = function ta(f, e, h) {
                    null === f && (f = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(f, e)
                    if (void 0 === n) {
                      if (((f = Object.getPrototypeOf(f)), null !== f)) return ta(f, e, h)
                    } else {
                      if ("value" in n) return n.value
                      e = n.get
                      return void 0 === e ? void 0 : e.call(h)
                    }
                  }
                e = ba(3)
                e = ca(e)
                var f = ba(2),
                  x = ca(f)
                f = ba(8)
                var fa = ca(f)
                f = ba(23)
                var ea = ca(f)
                f = ba(34)
                f = ca(f)
                var ha = ba(59),
                  da = ca(ha)
                ha = ba(60)
                var ia = ca(ha)
                ha = ba(28)
                var la = ca(ha)
                ba = ba(61)
                ha = ca(ba)
                var ra = [!1, "center", "right", "justify"],
                  oa =
                    "#000000 #e60000 #ff9900 #ffff00 #008a00 #0066cc #9933ff #ffffff #facccc #ffebcc #ffffcc #cce8cc #cce0f5 #ebd6ff #bbbbbb #f06666 #ffc266 #ffff66 #66b966 #66a3e0 #c285ff #888888 #a10000 #b26b00 #b2b200 #006100 #0047b2 #6b24b2 #444444 #5c0000 #663d00 #666600 #003700 #002966 #3d1466".split(
                      " "
                    ),
                  ya = [!1, "serif", "monospace"],
                  Fa = ["1", "2", "3", !1],
                  ua = ["small", !1, "large", "huge"]
                ba = (function (f) {
                  function e(f, h) {
                    z(this, e)
                    var n = w(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, f, h))
                    f.emitter.listenDOM("click", document.body, function Ga(e) {
                      if (!document.body.contains(f.root))
                        return document.body.removeEventListener("click", Ga)
                      null == n.tooltip ||
                        n.tooltip.root.contains(e.target) ||
                        document.activeElement === n.tooltip.textbox ||
                        n.quill.hasFocus() ||
                        n.tooltip.hide()
                      null != n.pickers &&
                        n.pickers.forEach(function (f) {
                          f.container.contains(e.target) || f.close()
                        })
                    })
                    return n
                  }
                  y(e, f)
                  n(e, [
                    {
                      key: "addModule",
                      value: function (f) {
                        var n = h(
                          e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                          "addModule",
                          this
                        ).call(this, f)
                        "toolbar" === f && this.extendToolbar(n)
                        return n
                      },
                    },
                    {
                      key: "buildButtons",
                      value: function (f, e) {
                        f.forEach(function (f) {
                          ;(f.getAttribute("class") || "").split(/\s+/).forEach(function (h) {
                            if (h.startsWith("ql-") && ((h = h.slice(3)), null != e[h]))
                              if ("direction" === h) f.innerHTML = e[h][""] + e[h].rtl
                              else if ("string" === typeof e[h]) f.innerHTML = e[h]
                              else {
                                var n = f.value || ""
                                null != n && e[h][n] && (f.innerHTML = e[h][n])
                              }
                          })
                        })
                      },
                    },
                    {
                      key: "buildPickers",
                      value: function (f, e) {
                        var h = this
                        this.pickers = f.map(function (f) {
                          if (f.classList.contains("ql-align"))
                            return (
                              null == f.querySelector("option") && r(f, ra),
                              new ia.default(f, e.align)
                            )
                          if (
                            f.classList.contains("ql-background") ||
                            f.classList.contains("ql-color")
                          ) {
                            var h = f.classList.contains("ql-background") ? "background" : "color"
                            null == f.querySelector("option") &&
                              r(f, oa, "background" === h ? "#ffffff" : "#000000")
                            return new da.default(f, e[h])
                          }
                          null == f.querySelector("option") &&
                            (f.classList.contains("ql-font")
                              ? r(f, ya)
                              : f.classList.contains("ql-header")
                              ? r(f, Fa)
                              : f.classList.contains("ql-size") && r(f, ua))
                          return new la.default(f)
                        })
                        this.quill.on(fa.default.events.EDITOR_CHANGE, function () {
                          h.pickers.forEach(function (f) {
                            f.update()
                          })
                        })
                      },
                    },
                  ])
                  return e
                })(f.default)
                ba.DEFAULTS = (0, e.default)(!0, {}, f.default.DEFAULTS, {
                  modules: {
                    toolbar: {
                      handlers: {
                        formula: function () {
                          this.quill.theme.tooltip.edit("formula")
                        },
                        image: function () {
                          var f = this,
                            e = this.container.querySelector("input.ql-image[type=file]")
                          null == e &&
                            ((e = document.createElement("input")),
                            e.setAttribute("type", "file"),
                            e.setAttribute(
                              "accept",
                              "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
                            ),
                            e.classList.add("ql-image"),
                            e.addEventListener("change", function () {
                              if (null != e.files && null != e.files[0]) {
                                var h = new FileReader()
                                h.onload = function (h) {
                                  var n = f.quill.getSelection(!0)
                                  f.quill.updateContents(
                                    new x.default()
                                      .retain(n.index)
                                      .delete(n.length)
                                      .insert({ image: h.target.result }),
                                    fa.default.sources.USER
                                  )
                                  f.quill.setSelection(n.index + 1, fa.default.sources.SILENT)
                                  e.value = ""
                                }
                                h.readAsDataURL(e.files[0])
                              }
                            }),
                            this.container.appendChild(e))
                          e.click()
                        },
                        video: function () {
                          this.quill.theme.tooltip.edit("video")
                        },
                      },
                    },
                  },
                })
                e = (function (f) {
                  function e(f, h) {
                    z(this, e)
                    f = w(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, f, h))
                    f.textbox = f.root.querySelector('input[type="text"]')
                    f.listen()
                    return f
                  }
                  y(e, f)
                  n(e, [
                    {
                      key: "listen",
                      value: function () {
                        var f = this
                        this.textbox.addEventListener("keydown", function (e) {
                          ea.default.match(e, "enter")
                            ? (f.save(), e.preventDefault())
                            : ea.default.match(e, "escape") && (f.cancel(), e.preventDefault())
                        })
                      },
                    },
                    {
                      key: "cancel",
                      value: function () {
                        this.hide()
                      },
                    },
                    {
                      key: "edit",
                      value: function () {
                        var f =
                            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "link",
                          e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null
                        this.root.classList.remove("ql-hidden")
                        this.root.classList.add("ql-editing")
                        null != e
                          ? (this.textbox.value = e)
                          : f !== this.root.getAttribute("data-mode") && (this.textbox.value = "")
                        this.position(this.quill.getBounds(this.quill.selection.savedRange))
                        this.textbox.select()
                        this.textbox.setAttribute(
                          "placeholder",
                          this.textbox.getAttribute("data-" + f) || ""
                        )
                        this.root.setAttribute("data-mode", f)
                      },
                    },
                    {
                      key: "restoreFocus",
                      value: function () {
                        var f = this.quill.scrollingContainer.scrollTop
                        this.quill.focus()
                        this.quill.scrollingContainer.scrollTop = f
                      },
                    },
                    {
                      key: "save",
                      value: function () {
                        var f = this.textbox.value
                        switch (this.root.getAttribute("data-mode")) {
                          case "link":
                            var e = this.quill.root.scrollTop
                            this.linkRange
                              ? (this.quill.formatText(
                                  this.linkRange,
                                  "link",
                                  f,
                                  fa.default.sources.USER
                                ),
                                delete this.linkRange)
                              : (this.restoreFocus(),
                                this.quill.format("link", f, fa.default.sources.USER))
                            this.quill.root.scrollTop = e
                            break
                          case "video":
                            f = (e =
                              f.match(
                                /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/
                              ) ||
                              f.match(
                                /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/
                              ))
                              ? (e[1] || "https") +
                                "://www.youtube.com/embed/" +
                                e[2] +
                                "?showinfo=0"
                              : (e = f.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/))
                              ? (e[1] || "https") + "://player.vimeo.com/video/" + e[2] + "/"
                              : f
                          case "formula":
                            f &&
                              ((e = this.quill.getSelection(!0)),
                              null != e &&
                                ((e = e.index + e.length),
                                this.quill.insertEmbed(
                                  e,
                                  this.root.getAttribute("data-mode"),
                                  f,
                                  fa.default.sources.USER
                                ),
                                "formula" === this.root.getAttribute("data-mode") &&
                                  this.quill.insertText(e + 1, " ", fa.default.sources.USER),
                                this.quill.setSelection(e + 2, fa.default.sources.USER)))
                        }
                        this.textbox.value = ""
                        this.hide()
                      },
                    },
                  ])
                  return e
                })(ha.default)
                aa.BaseTooltip = e
                aa.default = ba
              },
              function (e, aa) {
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = (function () {
                  function e() {
                    this.head = this.tail = null
                    this.length = 0
                  }
                  e.prototype.append = function () {
                    for (var e = [], z = 0; z < arguments.length; z++) e[z] = arguments[z]
                    this.insertBefore(e[0], null)
                    1 < e.length && this.append.apply(this, e.slice(1))
                  }
                  e.prototype.contains = function (e) {
                    for (var z, w = this.iterator(); (z = w()); ) if (z === e) return !0
                    return !1
                  }
                  e.prototype.insertBefore = function (e, z) {
                    e &&
                      ((e.next = z),
                      null != z
                        ? ((e.prev = z.prev),
                          null != z.prev && (z.prev.next = e),
                          (z.prev = e),
                          z === this.head && (this.head = e))
                        : null != this.tail
                        ? ((this.tail.next = e), (e.prev = this.tail), (this.tail = e))
                        : ((e.prev = null), (this.head = this.tail = e)),
                      (this.length += 1))
                  }
                  e.prototype.offset = function (e) {
                    for (var z = 0, w = this.head; null != w; ) {
                      if (w === e) return z
                      z += w.length()
                      w = w.next
                    }
                    return -1
                  }
                  e.prototype.remove = function (e) {
                    this.contains(e) &&
                      (null != e.prev && (e.prev.next = e.next),
                      null != e.next && (e.next.prev = e.prev),
                      e === this.head && (this.head = e.next),
                      e === this.tail && (this.tail = e.prev),
                      --this.length)
                  }
                  e.prototype.iterator = function (e) {
                    void 0 === e && (e = this.head)
                    return function () {
                      var z = e
                      null != e && (e = e.next)
                      return z
                    }
                  }
                  e.prototype.find = function (e, z) {
                    void 0 === z && (z = !1)
                    for (var w, y = this.iterator(); (w = y()); ) {
                      var r = w.length()
                      if (e < r || (z && e === r && (null == w.next || 0 !== w.next.length())))
                        return [w, e]
                      e -= r
                    }
                    return [null, 0]
                  }
                  e.prototype.forEach = function (e) {
                    for (var z, w = this.iterator(); (z = w()); ) e(z)
                  }
                  e.prototype.forEachAt = function (e, z, w) {
                    if (!(0 >= z))
                      for (
                        var y = this.find(e), r = e - y[1], n = this.iterator(y[0]);
                        (y = n()) && r < e + z;

                      ) {
                        var h = y.length()
                        e > r
                          ? w(y, e - r, Math.min(z, r + h - e))
                          : w(y, 0, Math.min(h, e + z - r))
                        r += h
                      }
                  }
                  e.prototype.map = function (e) {
                    return this.reduce(function (z, w) {
                      z.push(e(w))
                      return z
                    }, [])
                  }
                  e.prototype.reduce = function (e, z) {
                    for (var w, y = this.iterator(); (w = y()); ) z = e(z, w)
                    return z
                  }
                  return e
                })()
                aa.default = e
              },
              function (e, aa, ba) {
                var ca =
                  (this && this.__extends) ||
                  (function () {
                    var e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, h) {
                          e.__proto__ = h
                        }) ||
                      function (e, h) {
                        for (var f in h) h.hasOwnProperty(f) && (e[f] = h[f])
                      }
                    return function (n, h) {
                      function f() {
                        this.constructor = n
                      }
                      e(n, h)
                      n.prototype =
                        null === h ? Object.create(h) : ((f.prototype = h.prototype), new f())
                    }
                  })()
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var z = ba(17),
                  w = ba(1),
                  y = {
                    attributes: !0,
                    characterData: !0,
                    characterDataOldValue: !0,
                    childList: !0,
                    subtree: !0,
                  }
                e = (function (e) {
                  function n(h) {
                    var f = e.call(this, h) || this
                    f.scroll = f
                    f.observer = new MutationObserver(function (e) {
                      f.update(e)
                    })
                    f.observer.observe(f.domNode, y)
                    f.attach()
                    return f
                  }
                  ca(n, e)
                  n.prototype.detach = function () {
                    e.prototype.detach.call(this)
                    this.observer.disconnect()
                  }
                  n.prototype.deleteAt = function (h, f) {
                    this.update()
                    0 === h && f === this.length()
                      ? this.children.forEach(function (f) {
                          f.remove()
                        })
                      : e.prototype.deleteAt.call(this, h, f)
                  }
                  n.prototype.formatAt = function (h, f, n, r) {
                    this.update()
                    e.prototype.formatAt.call(this, h, f, n, r)
                  }
                  n.prototype.insertAt = function (h, f, n) {
                    this.update()
                    e.prototype.insertAt.call(this, h, f, n)
                  }
                  n.prototype.optimize = function (h, f) {
                    function n(e) {
                      null != e.domNode[w.DATA_KEY] &&
                        null != e.domNode[w.DATA_KEY].mutations &&
                        (e instanceof z.default && e.children.forEach(n), e.optimize(f))
                    }
                    function r(f, e) {
                      void 0 === e && (e = !0)
                      null != f &&
                        f !== y &&
                        null != f.domNode.parentNode &&
                        (null == f.domNode[w.DATA_KEY].mutations &&
                          (f.domNode[w.DATA_KEY].mutations = []),
                        e && r(f.parent))
                    }
                    var y = this
                    void 0 === h && (h = [])
                    void 0 === f && (f = {})
                    e.prototype.optimize.call(this, f)
                    for (var aa = [].slice.call(this.observer.takeRecords()); 0 < aa.length; )
                      h.push(aa.pop())
                    for (var ca = h, ba = 0; 0 < ca.length; ba += 1) {
                      if (100 <= ba) throw Error("[Parchment] Maximum optimize iterations reached")
                      ca.forEach(function (f) {
                        var e = w.find(f.target, !0)
                        null != e &&
                          (e.domNode === f.target &&
                            ("childList" === f.type
                              ? (r(w.find(f.previousSibling, !1)),
                                [].forEach.call(f.addedNodes, function (f) {
                                  f = w.find(f, !1)
                                  r(f, !1)
                                  f instanceof z.default &&
                                    f.children.forEach(function (f) {
                                      r(f, !1)
                                    })
                                }))
                              : "attributes" === f.type && r(e.prev)),
                          r(e))
                      })
                      this.children.forEach(n)
                      ca = [].slice.call(this.observer.takeRecords())
                      for (aa = ca.slice(); 0 < aa.length; ) h.push(aa.pop())
                    }
                  }
                  n.prototype.update = function (h, f) {
                    var n = this
                    void 0 === f && (f = {})
                    h = h || this.observer.takeRecords()
                    h.map(function (f) {
                      var e = w.find(f.target, !0)
                      if (null == e) return null
                      if (null == e.domNode[w.DATA_KEY].mutations)
                        return (e.domNode[w.DATA_KEY].mutations = [f]), e
                      e.domNode[w.DATA_KEY].mutations.push(f)
                      return null
                    }).forEach(function (e) {
                      null != e &&
                        e !== n &&
                        null != e.domNode[w.DATA_KEY] &&
                        e.update(e.domNode[w.DATA_KEY].mutations || [], f)
                    })
                    null != this.domNode[w.DATA_KEY].mutations &&
                      e.prototype.update.call(this, this.domNode[w.DATA_KEY].mutations, f)
                    this.optimize(h, f)
                  }
                  n.blotName = "scroll"
                  n.defaultChild = "block"
                  n.scope = w.Scope.BLOCK_BLOT
                  n.tagName = "DIV"
                  return n
                })(z.default)
                aa.default = e
              },
              function (e, aa, ba) {
                var ca =
                  (this && this.__extends) ||
                  (function () {
                    var e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, n) {
                          e.__proto__ = n
                        }) ||
                      function (e, n) {
                        for (var h in n) n.hasOwnProperty(h) && (e[h] = n[h])
                      }
                    return function (r, n) {
                      function h() {
                        this.constructor = r
                      }
                      e(r, n)
                      r.prototype =
                        null === n ? Object.create(n) : ((h.prototype = n.prototype), new h())
                    }
                  })()
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var z = ba(18),
                  w = ba(1)
                e = (function (e) {
                  function r() {
                    return (null !== e && e.apply(this, arguments)) || this
                  }
                  ca(r, e)
                  r.formats = function (n) {
                    if (n.tagName !== r.tagName) return e.formats.call(this, n)
                  }
                  r.prototype.format = function (n, h) {
                    var f = this
                    n !== this.statics.blotName || h
                      ? e.prototype.format.call(this, n, h)
                      : (this.children.forEach(function (e) {
                          e instanceof z.default || (e = e.wrap(r.blotName, !0))
                          f.attributes.copy(e)
                        }),
                        this.unwrap())
                  }
                  r.prototype.formatAt = function (n, h, f, r) {
                    null != this.formats()[f] || w.query(f, w.Scope.ATTRIBUTE)
                      ? this.isolate(n, h).format(f, r)
                      : e.prototype.formatAt.call(this, n, h, f, r)
                  }
                  r.prototype.optimize = function (n) {
                    e.prototype.optimize.call(this, n)
                    n = this.formats()
                    if (0 === Object.keys(n).length) return this.unwrap()
                    var h = this.next,
                      f
                    if ((f = h instanceof r && h.prev === this))
                      a: if (((f = h.formats()), Object.keys(n).length !== Object.keys(f).length))
                        f = !1
                      else {
                        for (var w in n)
                          if (n[w] !== f[w]) {
                            f = !1
                            break a
                          }
                        f = !0
                      }
                    f && (h.moveChildren(this), h.remove())
                  }
                  r.blotName = "inline"
                  r.scope = w.Scope.INLINE_BLOT
                  r.tagName = "SPAN"
                  return r
                })(z.default)
                aa.default = e
              },
              function (e, aa, ba) {
                var ca =
                  (this && this.__extends) ||
                  (function () {
                    var e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, r) {
                          e.__proto__ = r
                        }) ||
                      function (e, r) {
                        for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n])
                      }
                    return function (w, r) {
                      function n() {
                        this.constructor = w
                      }
                      e(w, r)
                      w.prototype =
                        null === r ? Object.create(r) : ((n.prototype = r.prototype), new n())
                    }
                  })()
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = ba(18)
                var z = ba(1)
                ba = (function (e) {
                  function w() {
                    return (null !== e && e.apply(this, arguments)) || this
                  }
                  ca(w, e)
                  w.formats = function (r) {
                    var n = z.query(w.blotName).tagName
                    if (r.tagName !== n) return e.formats.call(this, r)
                  }
                  w.prototype.format = function (r, n) {
                    null != z.query(r, z.Scope.BLOCK) &&
                      (r !== this.statics.blotName || n
                        ? e.prototype.format.call(this, r, n)
                        : this.replaceWith(w.blotName))
                  }
                  w.prototype.formatAt = function (r, n, h, f) {
                    null != z.query(h, z.Scope.BLOCK)
                      ? this.format(h, f)
                      : e.prototype.formatAt.call(this, r, n, h, f)
                  }
                  w.prototype.insertAt = function (r, n, h) {
                    null == h || null != z.query(n, z.Scope.INLINE)
                      ? e.prototype.insertAt.call(this, r, n, h)
                      : ((r = this.split(r)), (n = z.create(n, h)), r.parent.insertBefore(n, r))
                  }
                  w.prototype.update = function (r, n) {
                    navigator.userAgent.match(/Trident/)
                      ? this.build()
                      : e.prototype.update.call(this, r, n)
                  }
                  w.blotName = "block"
                  w.scope = z.Scope.BLOCK_BLOT
                  w.tagName = "P"
                  return w
                })(e.default)
                aa.default = ba
              },
              function (e, aa, ba) {
                var ca =
                  (this && this.__extends) ||
                  (function () {
                    var e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, y) {
                          e.__proto__ = y
                        }) ||
                      function (e, y) {
                        for (var r in y) y.hasOwnProperty(r) && (e[r] = y[r])
                      }
                    return function (w, y) {
                      function r() {
                        this.constructor = w
                      }
                      e(w, y)
                      w.prototype =
                        null === y ? Object.create(y) : ((r.prototype = y.prototype), new r())
                    }
                  })()
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = (function (e) {
                  function w() {
                    return (null !== e && e.apply(this, arguments)) || this
                  }
                  ca(w, e)
                  w.formats = function () {}
                  w.prototype.format = function (w, r) {
                    e.prototype.formatAt.call(this, 0, this.length(), w, r)
                  }
                  w.prototype.formatAt = function (w, r, n, h) {
                    0 === w && r === this.length()
                      ? this.format(n, h)
                      : e.prototype.formatAt.call(this, w, r, n, h)
                  }
                  w.prototype.formats = function () {
                    return this.statics.formats(this.domNode)
                  }
                  return w
                })(ba(19).default)
                aa.default = e
              },
              function (e, aa, ba) {
                var ca =
                  (this && this.__extends) ||
                  (function () {
                    var e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, r) {
                          e.__proto__ = r
                        }) ||
                      function (e, r) {
                        for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n])
                      }
                    return function (w, r) {
                      function n() {
                        this.constructor = w
                      }
                      e(w, r)
                      w.prototype =
                        null === r ? Object.create(r) : ((n.prototype = r.prototype), new n())
                    }
                  })()
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = ba(19)
                var z = ba(1)
                ba = (function (e) {
                  function w(r) {
                    r = e.call(this, r) || this
                    r.text = r.statics.value(r.domNode)
                    return r
                  }
                  ca(w, e)
                  w.create = function (e) {
                    return document.createTextNode(e)
                  }
                  w.value = function (e) {
                    e = e.data
                    e.normalize && (e = e.normalize())
                    return e
                  }
                  w.prototype.deleteAt = function (e, n) {
                    this.domNode.data = this.text = this.text.slice(0, e) + this.text.slice(e + n)
                  }
                  w.prototype.index = function (e, n) {
                    return this.domNode === e ? n : -1
                  }
                  w.prototype.insertAt = function (r, n, h) {
                    null == h
                      ? ((this.text = this.text.slice(0, r) + n + this.text.slice(r)),
                        (this.domNode.data = this.text))
                      : e.prototype.insertAt.call(this, r, n, h)
                  }
                  w.prototype.length = function () {
                    return this.text.length
                  }
                  w.prototype.optimize = function (r) {
                    e.prototype.optimize.call(this, r)
                    this.text = this.statics.value(this.domNode)
                    0 === this.text.length
                      ? this.remove()
                      : this.next instanceof w &&
                        this.next.prev === this &&
                        (this.insertAt(this.length(), this.next.value()), this.next.remove())
                  }
                  w.prototype.position = function (e) {
                    return [this.domNode, e]
                  }
                  w.prototype.split = function (e, n) {
                    void 0 === n && (n = !1)
                    if (!n) {
                      if (0 === e) return this
                      if (e === this.length()) return this.next
                    }
                    e = z.create(this.domNode.splitText(e))
                    this.parent.insertBefore(e, this.next)
                    this.text = this.statics.value(this.domNode)
                    return e
                  }
                  w.prototype.update = function (e) {
                    var n = this
                    e.some(function (e) {
                      return "characterData" === e.type && e.target === n.domNode
                    }) && (this.text = this.statics.value(this.domNode))
                  }
                  w.prototype.value = function () {
                    return this.text
                  }
                  w.blotName = "text"
                  w.scope = z.Scope.INLINE_BLOT
                  return w
                })(e.default)
                aa.default = ba
              },
              function () {
                var e = document.createElement("div")
                e.classList.toggle("test-class", !1)
                if (e.classList.contains("test-class")) {
                  var aa = DOMTokenList.prototype.toggle
                  DOMTokenList.prototype.toggle = function (e, ba) {
                    return 1 < arguments.length && !this.contains(e) === !ba ? ba : aa.call(this, e)
                  }
                }
                String.prototype.startsWith ||
                  (String.prototype.startsWith = function (e, aa) {
                    return this.substr(aa || 0, e.length) === e
                  })
                String.prototype.endsWith ||
                  (String.prototype.endsWith = function (e, aa) {
                    var z = this.toString()
                    if (
                      "number" !== typeof aa ||
                      !isFinite(aa) ||
                      Math.floor(aa) !== aa ||
                      aa > z.length
                    )
                      aa = z.length
                    aa -= e.length
                    e = z.indexOf(e, aa)
                    return -1 !== e && e === aa
                  })
                Array.prototype.find ||
                  Object.defineProperty(Array.prototype, "find", {
                    value: function (e, aa) {
                      if (null === this)
                        throw new TypeError("Array.prototype.find called on null or undefined")
                      if ("function" !== typeof e)
                        throw new TypeError("predicate must be a function")
                      for (var z = Object(this), w = z.length >>> 0, y, r = 0; r < w; r++)
                        if (((y = z[r]), e.call(aa, y, r, z))) return y
                    },
                  })
                document.addEventListener("DOMContentLoaded", function () {
                  document.execCommand("enableObjectResizing", !1, !1)
                  document.execCommand("autoUrlDetect", !1, !1)
                })
              },
              function (e) {
                function aa(f, e, y) {
                  if (f == e) return f ? [[0, f]] : []
                  if (0 > y || f.length < y) y = null
                  var x = z(f, e),
                    aa = f.substring(0, x)
                  f = f.substring(x)
                  e = e.substring(x)
                  x = w(f, e)
                  var ca = f.substring(f.length - x)
                  f = f.substring(0, f.length - x)
                  e = e.substring(0, e.length - x)
                  f = ba(f, e)
                  aa && f.unshift([0, aa])
                  ca && f.push([0, ca])
                  r(f)
                  null != y && (f = n(f, y))
                  return (f = h(f))
                }
                function ba(f, e) {
                  if (!f) return [[1, e]]
                  if (!e) return [[-1, f]]
                  var h = f.length > e.length ? f : e
                  var n = f.length > e.length ? e : f,
                    r = h.indexOf(n)
                  if (-1 != r)
                    return (
                      (h = [
                        [1, h.substring(0, r)],
                        [0, n],
                        [1, h.substring(r + n.length)],
                      ]),
                      f.length > e.length && (h[0][0] = h[2][0] = -1),
                      h
                    )
                  if (1 == n.length)
                    return [
                      [-1, f],
                      [1, e],
                    ]
                  if ((h = y(f, e)))
                    return (
                      (e = h[1]),
                      (n = h[3]),
                      (f = h[4]),
                      (h = aa(h[0], h[2])),
                      (e = aa(e, n)),
                      h.concat([[0, f]], e)
                    )
                  a: {
                    h = f.length
                    n = e.length
                    r = Math.ceil((h + n) / 2)
                    for (var w = 2 * r, x = Array(w), z = Array(w), ba = 0; ba < w; ba++)
                      (x[ba] = -1), (z[ba] = -1)
                    x[r + 1] = 0
                    z[r + 1] = 0
                    ba = h - n
                    for (
                      var fa = 0 != ba % 2, ea = 0, ha = 0, da = 0, ia = 0, wa = 0;
                      wa < r;
                      wa++
                    ) {
                      for (var Aa = -wa + ea; Aa <= wa - ha; Aa += 2) {
                        var ta = r + Aa
                        var Da =
                          Aa == -wa || (Aa != wa && x[ta - 1] < x[ta + 1])
                            ? x[ta + 1]
                            : x[ta - 1] + 1
                        for (var Ea = Da - Aa; Da < h && Ea < n && f.charAt(Da) == e.charAt(Ea); )
                          Da++, Ea++
                        x[ta] = Da
                        if (Da > h) ha += 2
                        else if (Ea > n) ea += 2
                        else if (fa && ((ta = r + ba - Aa), 0 <= ta && ta < w && -1 != z[ta])) {
                          var za = h - z[ta]
                          if (Da >= za) {
                            f = ca(f, e, Da, Ea)
                            break a
                          }
                        }
                      }
                      for (Aa = -wa + da; Aa <= wa - ia; Aa += 2) {
                        ta = r + Aa
                        za =
                          Aa == -wa || (Aa != wa && z[ta - 1] < z[ta + 1])
                            ? z[ta + 1]
                            : z[ta - 1] + 1
                        for (
                          Da = za - Aa;
                          za < h && Da < n && f.charAt(h - za - 1) == e.charAt(n - Da - 1);

                        )
                          za++, Da++
                        z[ta] = za
                        if (za > h) ia += 2
                        else if (Da > n) da += 2
                        else if (
                          !fa &&
                          ((ta = r + ba - Aa),
                          0 <= ta &&
                            ta < w &&
                            -1 != x[ta] &&
                            ((Da = x[ta]), (Ea = r + Da - ta), (za = h - za), Da >= za))
                        ) {
                          f = ca(f, e, Da, Ea)
                          break a
                        }
                      }
                    }
                    f = [
                      [-1, f],
                      [1, e],
                    ]
                  }
                  return f
                }
                function ca(f, e, h, n) {
                  var r = f.substring(h),
                    w = e.substring(n)
                  f = aa(f.substring(0, h), e.substring(0, n))
                  r = aa(r, w)
                  return f.concat(r)
                }
                function z(f, e) {
                  if (!f || !e || f.charAt(0) != e.charAt(0)) return 0
                  for (var h = 0, n = Math.min(f.length, e.length), r = n, w = 0; h < r; )
                    f.substring(w, r) == e.substring(w, r) ? (w = h = r) : (n = r),
                      (r = Math.floor((n - h) / 2 + h))
                  return r
                }
                function w(f, e) {
                  if (!f || !e || f.charAt(f.length - 1) != e.charAt(e.length - 1)) return 0
                  for (var h = 0, n = Math.min(f.length, e.length), r = n, w = 0; h < r; )
                    f.substring(f.length - r, f.length - w) ==
                    e.substring(e.length - r, e.length - w)
                      ? (w = h = r)
                      : (n = r),
                      (r = Math.floor((n - h) / 2 + h))
                  return r
                }
                function y(f, e) {
                  function h(f, e, h) {
                    for (
                      var n = f.substring(h, h + Math.floor(f.length / 4)),
                        r = -1,
                        x = "",
                        y,
                        aa,
                        ba,
                        ca;
                      -1 != (r = e.indexOf(n, r + 1));

                    ) {
                      var fa = z(f.substring(h), e.substring(r)),
                        ea = w(f.substring(0, h), e.substring(0, r))
                      x.length < ea + fa &&
                        ((x = e.substring(r - ea, r) + e.substring(r, r + fa)),
                        (y = f.substring(0, h - ea)),
                        (aa = f.substring(h + fa)),
                        (ba = e.substring(0, r - ea)),
                        (ca = e.substring(r + fa)))
                    }
                    return 2 * x.length >= f.length ? [y, aa, ba, ca, x] : null
                  }
                  var n = f.length > e.length ? f : e,
                    r = f.length > e.length ? e : f
                  if (4 > n.length || 2 * r.length < n.length) return null
                  var x = h(n, r, Math.ceil(n.length / 4))
                  n = h(n, r, Math.ceil(n.length / 2))
                  if (x || n) x = n ? (x ? (x[4].length > n[4].length ? x : n) : n) : x
                  else return null
                  f.length > e.length
                    ? ((f = x[0]), (e = x[1]), (n = x[2]), (r = x[3]))
                    : ((n = x[0]), (r = x[1]), (f = x[2]), (e = x[3]))
                  return [f, e, n, r, x[4]]
                }
                function r(f) {
                  f.push([0, ""])
                  for (var e = 0, h = 0, n = 0, x = "", y = "", aa; e < f.length; )
                    switch (f[e][0]) {
                      case 1:
                        n++
                        y += f[e][1]
                        e++
                        break
                      case -1:
                        h++
                        x += f[e][1]
                        e++
                        break
                      case 0:
                        1 < h + n
                          ? (0 !== h &&
                              0 !== n &&
                              ((aa = z(y, x)),
                              0 !== aa &&
                                (0 < e - h - n && 0 == f[e - h - n - 1][0]
                                  ? (f[e - h - n - 1][1] += y.substring(0, aa))
                                  : (f.splice(0, 0, [0, y.substring(0, aa)]), e++),
                                (y = y.substring(aa)),
                                (x = x.substring(aa))),
                              (aa = w(y, x)),
                              0 !== aa &&
                                ((f[e][1] = y.substring(y.length - aa) + f[e][1]),
                                (y = y.substring(0, y.length - aa)),
                                (x = x.substring(0, x.length - aa)))),
                            0 === h
                              ? f.splice(e - n, h + n, [1, y])
                              : 0 === n
                              ? f.splice(e - h, h + n, [-1, x])
                              : f.splice(e - h - n, h + n, [-1, x], [1, y]),
                            (e = e - h - n + (h ? 1 : 0) + (n ? 1 : 0) + 1))
                          : 0 !== e && 0 == f[e - 1][0]
                          ? ((f[e - 1][1] += f[e][1]), f.splice(e, 1))
                          : e++,
                          (h = n = 0),
                          (y = x = "")
                    }
                  "" === f[f.length - 1][1] && f.pop()
                  h = !1
                  for (e = 1; e < f.length - 1; )
                    0 == f[e - 1][0] &&
                      0 == f[e + 1][0] &&
                      (f[e][1].substring(f[e][1].length - f[e - 1][1].length) == f[e - 1][1]
                        ? ((f[e][1] =
                            f[e - 1][1] +
                            f[e][1].substring(0, f[e][1].length - f[e - 1][1].length)),
                          (f[e + 1][1] = f[e - 1][1] + f[e + 1][1]),
                          f.splice(e - 1, 1),
                          (h = !0))
                        : f[e][1].substring(0, f[e + 1][1].length) == f[e + 1][1] &&
                          ((f[e - 1][1] += f[e + 1][1]),
                          (f[e][1] = f[e][1].substring(f[e + 1][1].length) + f[e + 1][1]),
                          f.splice(e + 1, 1),
                          (h = !0))),
                      e++
                  h && r(f)
                }
                function n(e, h) {
                  a: {
                    var n = e
                    if (0 === h) var r = [0, n]
                    else {
                      var w = 0
                      for (r = 0; r < n.length; r++) {
                        var x = n[r]
                        if (-1 === x[0] || 0 === x[0]) {
                          var y = w + x[1].length
                          if (h === y) {
                            r = [r + 1, n]
                            break a
                          }
                          if (h < y) {
                            n = n.slice()
                            w = h - w
                            h = [x[0], x[1].slice(0, w)]
                            x = [x[0], x[1].slice(w)]
                            n.splice(r, 1, h, x)
                            r = [r + 1, n]
                            break a
                          }
                          w = y
                        }
                      }
                      throw Error("cursor_pos is out of bounds!")
                    }
                  }
                  n = r[1]
                  r = r[0]
                  h = n[r]
                  x = n[r + 1]
                  return null == h || 0 !== h[0]
                    ? e
                    : null != x && h[1] + x[1] === x[1] + h[1]
                    ? (n.splice(r, 2, x, h), f(n, r, 2))
                    : null != x && 0 === x[1].indexOf(h[1])
                    ? (n.splice(r, 2, [x[0], h[1]], [0, h[1]]),
                      (e = x[1].slice(h[1].length)),
                      0 < e.length && n.splice(r + 2, 0, [x[0], e]),
                      f(n, r, 3))
                    : e
                }
                function h(f) {
                  function e(f) {
                    return (
                      55296 <= f.charCodeAt(f.length - 1) && 56319 >= f.charCodeAt(f.length - 1)
                    )
                  }
                  function h(f) {
                    return 56320 <= f.charCodeAt(0) && 57343 >= f.charCodeAt(0)
                  }
                  for (var n = !1, r = 2; r < f.length; r += 1)
                    0 === f[r - 2][0] &&
                      e(f[r - 2][1]) &&
                      -1 === f[r - 1][0] &&
                      h(f[r - 1][1]) &&
                      1 === f[r][0] &&
                      h(f[r][1]) &&
                      ((n = !0),
                      (f[r - 1][1] = f[r - 2][1].slice(-1) + f[r - 1][1]),
                      (f[r][1] = f[r - 2][1].slice(-1) + f[r][1]),
                      (f[r - 2][1] = f[r - 2][1].slice(0, -1)))
                  if (!n) return f
                  n = []
                  for (r = 0; r < f.length; r += 1) 0 < f[r][1].length && n.push(f[r])
                  return n
                }
                function f(f, e, h) {
                  for (h = e + h - 1; 0 <= h && h >= e - 1; h--)
                    if (h + 1 < f.length) {
                      var n = f[h],
                        r = f[h + 1]
                      n[0] === r[1] && f.splice(h, 2, [n[0], n[1] + r[1]])
                    }
                  return f
                }
                aa.INSERT = 1
                aa.DELETE = -1
                aa.EQUAL = 0
                e.exports = aa
              },
              function (e, aa) {
                function ba(e) {
                  var z = [],
                    w
                  for (w in e) z.push(w)
                  return z
                }
                aa = e.exports = "function" === typeof Object.keys ? Object.keys : ba
                aa.shim = ba
              },
              function (e, aa) {
                function ba(e) {
                  return "[object Arguments]" == Object.prototype.toString.call(e)
                }
                function ca(e) {
                  return (
                    (e &&
                      "object" == typeof e &&
                      "number" == typeof e.length &&
                      Object.prototype.hasOwnProperty.call(e, "callee") &&
                      !Object.prototype.propertyIsEnumerable.call(e, "callee")) ||
                    !1
                  )
                }
                aa =
                  "[object Arguments]" ==
                  (function () {
                    return Object.prototype.toString.call(arguments)
                  })()
                aa = e.exports = aa ? ba : ca
                aa.supported = ba
                aa.unsupported = ca
              },
              function (e) {
                function aa() {}
                function ba(e, r, n) {
                  this.fn = e
                  this.context = r
                  this.once = n || !1
                }
                function ca() {
                  this._events = new aa()
                  this._eventsCount = 0
                }
                var z = Object.prototype.hasOwnProperty,
                  w = "~"
                Object.create &&
                  ((aa.prototype = Object.create(null)), new aa().__proto__ || (w = !1))
                ca.prototype.eventNames = function () {
                  var e = [],
                    r,
                    n
                  if (0 === this._eventsCount) return e
                  for (n in (r = this._events)) z.call(r, n) && e.push(w ? n.slice(1) : n)
                  return Object.getOwnPropertySymbols
                    ? e.concat(Object.getOwnPropertySymbols(r))
                    : e
                }
                ca.prototype.listeners = function (e, r) {
                  e = this._events[w ? w + e : e]
                  if (r) return !!e
                  if (!e) return []
                  if (e.fn) return [e.fn]
                  r = 0
                  for (var n = e.length, h = Array(n); r < n; r++) h[r] = e[r].fn
                  return h
                }
                ca.prototype.emit = function (e, r, n, h, f, x) {
                  var y = w ? w + e : e
                  if (!this._events[y]) return !1
                  y = this._events[y]
                  var z = arguments.length,
                    aa
                  if (y.fn) {
                    y.once && this.removeListener(e, y.fn, void 0, !0)
                    switch (z) {
                      case 1:
                        return y.fn.call(y.context), !0
                      case 2:
                        return y.fn.call(y.context, r), !0
                      case 3:
                        return y.fn.call(y.context, r, n), !0
                      case 4:
                        return y.fn.call(y.context, r, n, h), !0
                      case 5:
                        return y.fn.call(y.context, r, n, h, f), !0
                      case 6:
                        return y.fn.call(y.context, r, n, h, f, x), !0
                    }
                    var ba = 1
                    for (aa = Array(z - 1); ba < z; ba++) aa[ba - 1] = arguments[ba]
                    y.fn.apply(y.context, aa)
                  } else {
                    var ca = y.length
                    for (ba = 0; ba < ca; ba++)
                      switch ((y[ba].once && this.removeListener(e, y[ba].fn, void 0, !0), z)) {
                        case 1:
                          y[ba].fn.call(y[ba].context)
                          break
                        case 2:
                          y[ba].fn.call(y[ba].context, r)
                          break
                        case 3:
                          y[ba].fn.call(y[ba].context, r, n)
                          break
                        case 4:
                          y[ba].fn.call(y[ba].context, r, n, h)
                          break
                        default:
                          if (!aa) {
                            var ea = 1
                            for (aa = Array(z - 1); ea < z; ea++) aa[ea - 1] = arguments[ea]
                          }
                          y[ba].fn.apply(y[ba].context, aa)
                      }
                  }
                  return !0
                }
                ca.prototype.on = function (e, r, n) {
                  r = new ba(r, n || this)
                  e = w ? w + e : e
                  this._events[e]
                    ? this._events[e].fn
                      ? (this._events[e] = [this._events[e], r])
                      : this._events[e].push(r)
                    : ((this._events[e] = r), this._eventsCount++)
                  return this
                }
                ca.prototype.once = function (e, r, n) {
                  r = new ba(r, n || this, !0)
                  e = w ? w + e : e
                  this._events[e]
                    ? this._events[e].fn
                      ? (this._events[e] = [this._events[e], r])
                      : this._events[e].push(r)
                    : ((this._events[e] = r), this._eventsCount++)
                  return this
                }
                ca.prototype.removeListener = function (e, r, n, h) {
                  e = w ? w + e : e
                  if (!this._events[e]) return this
                  if (!r)
                    return (
                      0 === --this._eventsCount
                        ? (this._events = new aa())
                        : delete this._events[e],
                      this
                    )
                  var f = this._events[e]
                  if (f.fn)
                    f.fn !== r ||
                      (h && !f.once) ||
                      (n && f.context !== n) ||
                      (0 === --this._eventsCount
                        ? (this._events = new aa())
                        : delete this._events[e])
                  else {
                    for (var x = 0, y = [], z = f.length; x < z; x++)
                      (f[x].fn !== r || (h && !f[x].once) || (n && f[x].context !== n)) &&
                        y.push(f[x])
                    y.length
                      ? (this._events[e] = 1 === y.length ? y[0] : y)
                      : 0 === --this._eventsCount
                      ? (this._events = new aa())
                      : delete this._events[e]
                  }
                  return this
                }
                ca.prototype.removeAllListeners = function (e) {
                  e
                    ? ((e = w ? w + e : e),
                      this._events[e] &&
                        (0 === --this._eventsCount
                          ? (this._events = new aa())
                          : delete this._events[e]))
                    : ((this._events = new aa()), (this._eventsCount = 0))
                  return this
                }
                ca.prototype.off = ca.prototype.removeListener
                ca.prototype.addListener = ca.prototype.on
                ca.prototype.setMaxListeners = function () {
                  return this
                }
                ca.prefixed = w
                ca.EventEmitter = ca
                "undefined" !== typeof e && (e.exports = ca)
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e, h) {
                  e in f
                    ? Object.defineProperty(f, e, {
                        value: h,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (f[e] = h)
                  return f
                }
                function w(f, e) {
                  if (!f)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ("object" !== typeof e && "function" !== typeof e) ? f : e
                }
                function y(f, e) {
                  if ("function" !== typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof e
                    )
                  f.prototype = Object.create(e && e.prototype, {
                    constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : (f.__proto__ = e))
                }
                function r(f, e, h) {
                  return "object" === ("undefined" === typeof e ? "undefined" : ra(e))
                    ? Object.keys(e).reduce(function (f, h) {
                        return r(f, h, e[h])
                      }, f)
                    : f.reduce(function (f, n) {
                        return n.attributes && n.attributes[e]
                          ? f.push(n)
                          : f.insert(n.insert, (0, Fa.default)({}, z({}, e, h), n.attributes))
                      }, new ua.default())
                }
                function n(f) {
                  return f.nodeType !== Node.ELEMENT_NODE
                    ? {}
                    : f["__ql-computed-style"] ||
                        (f["__ql-computed-style"] = window.getComputedStyle(f))
                }
                function h(f, e) {
                  for (var h = "", n = f.ops.length - 1; 0 <= n && h.length < e.length; --n) {
                    var r = f.ops[n]
                    if ("string" !== typeof r.insert) break
                    h = r.insert + h
                  }
                  return h.slice(-1 * e.length) === e
                }
                function f(f) {
                  if (0 === f.childNodes.length) return !1
                  f = n(f)
                  return -1 < ["block", "list-item"].indexOf(f.display)
                }
                function x(f, e, h) {
                  return f.nodeType === f.TEXT_NODE
                    ? h.reduce(function (e, h) {
                        return h(f, e)
                      }, new ua.default())
                    : f.nodeType === f.ELEMENT_NODE
                    ? [].reduce.call(
                        f.childNodes || [],
                        function (n, r) {
                          var w = x(r, e, h)
                          r.nodeType === f.ELEMENT_NODE &&
                            ((w = e.reduce(function (f, e) {
                              return e(r, f)
                            }, w)),
                            (w = (r["__ql-matcher"] || []).reduce(function (f, e) {
                              return e(r, f)
                            }, w)))
                          return n.concat(w)
                        },
                        new ua.default()
                      )
                    : new ua.default()
                }
                function ea(f, e, h) {
                  return r(h, f, !0)
                }
                function ha(f, e) {
                  var h = qa.default.Attributor.Attribute.keys(f),
                    n = qa.default.Attributor.Class.keys(f),
                    w = qa.default.Attributor.Style.keys(f),
                    x = {}
                  h.concat(n)
                    .concat(w)
                    .forEach(function (e) {
                      var h = qa.default.query(e, qa.default.Scope.ATTRIBUTE)
                      if (null != h && ((x[h.attrName] = h.value(f)), x[h.attrName])) return
                      h = Ba[e]
                      null == h ||
                        (h.attrName !== e && h.keyName !== e) ||
                        (x[h.attrName] = h.value(f) || void 0)
                      h = va[e]
                      null == h ||
                        (h.attrName !== e && h.keyName !== e) ||
                        ((h = va[e]), (x[h.attrName] = h.value(f) || void 0))
                    })
                  0 < Object.keys(x).length && (e = r(e, x))
                  return e
                }
                function da(f, e) {
                  var h = qa.default.query(f)
                  if (null == h) return e
                  if (h.prototype instanceof qa.default.Embed) {
                    var n = {},
                      w = h.value(f)
                    null != w &&
                      ((n[h.blotName] = w), (e = new ua.default().insert(n, h.formats(f))))
                  } else "function" === typeof h.formats && (e = r(e, h.blotName, h.formats(f)))
                  return e
                }
                function ia(e, n) {
                  h(n, "\n") ||
                    ((f(e) || (0 < n.length() && e.nextSibling && f(e.nextSibling))) &&
                      n.insert("\n"))
                  return n
                }
                function pa(e, r) {
                  if (f(e) && null != e.nextElementSibling && !h(r, "\n\n")) {
                    var w =
                      e.offsetHeight + parseFloat(n(e).marginTop) + parseFloat(n(e).marginBottom)
                    e.nextElementSibling.offsetTop > e.offsetTop + 1.5 * w && r.insert("\n")
                  }
                  return r
                }
                function la(e, h) {
                  var r = e.data
                  if ("O:P" === e.parentNode.tagName) return h.insert(r.trim())
                  if (0 === r.trim().length && e.parentNode.classList.contains("ql-clipboard"))
                    return h
                  if (!n(e.parentNode).whiteSpace.startsWith("pre")) {
                    var w = function (f, e) {
                      e = e.replace(/[^\u00a0]/g, "")
                      return 1 > e.length && f ? " " : e
                    }
                    r = r.replace(/\r\n/g, " ").replace(/\n/g, " ")
                    r = r.replace(/\s\s+/g, w.bind(w, !0))
                    if (
                      (null == e.previousSibling && f(e.parentNode)) ||
                      (null != e.previousSibling && f(e.previousSibling))
                    )
                      r = r.replace(/^\s+/, w.bind(w, !1))
                    if (
                      (null == e.nextSibling && f(e.parentNode)) ||
                      (null != e.nextSibling && f(e.nextSibling))
                    )
                      r = r.replace(/\s+$/, w.bind(w, !1))
                  }
                  return h.insert(r)
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.matchText =
                  aa.matchSpacing =
                  aa.matchNewline =
                  aa.matchBlot =
                  aa.matchAttributor =
                  aa.default =
                    void 0
                var ra =
                    "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
                      ? function (f) {
                          return typeof f
                        }
                      : function (f) {
                          return f &&
                            "function" === typeof Symbol &&
                            f.constructor === Symbol &&
                            f !== Symbol.prototype
                            ? "symbol"
                            : typeof f
                        },
                  oa = (function () {
                    return function (f, e) {
                      if (Array.isArray(f)) return f
                      if (Symbol.iterator in Object(f)) {
                        var h = [],
                          n = !0,
                          r = !1,
                          w = void 0
                        try {
                          for (
                            var x = f[Symbol.iterator](), y;
                            !(n = (y = x.next()).done) && (h.push(y.value), !e || h.length !== e);
                            n = !0
                          );
                        } catch (Sa) {
                          ;(r = !0), (w = Sa)
                        } finally {
                          try {
                            if (!n && x["return"]) x["return"]()
                          } finally {
                            if (r) throw w
                          }
                        }
                        return h
                      }
                      throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                  })(),
                  ya = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })()
                e = ba(3)
                var Fa = ca(e)
                e = ba(2)
                var ua = ca(e)
                e = ba(0)
                var qa = ca(e)
                e = ba(5)
                var ka = ca(e)
                e = ba(10)
                e = ca(e)
                var wa = ba(9)
                wa = ca(wa)
                var Aa = ba(36),
                  ta = ba(37),
                  Da = ba(13),
                  Ea = ca(Da)
                Da = ba(26)
                var za = ba(38),
                  Ga = ba(39)
                ba = ba(40)
                var Ca = (0, e.default)("quill:clipboard"),
                  Ja = [
                    [Node.TEXT_NODE, la],
                    [Node.TEXT_NODE, ia],
                    [
                      "br",
                      function (f, e) {
                        h(e, "\n") || e.insert("\n")
                        return e
                      },
                    ],
                    [Node.ELEMENT_NODE, ia],
                    [Node.ELEMENT_NODE, da],
                    [Node.ELEMENT_NODE, pa],
                    [Node.ELEMENT_NODE, ha],
                    [
                      Node.ELEMENT_NODE,
                      function (f, e) {
                        var h = {},
                          w = f.style || {}
                        w.fontStyle && "italic" === n(f).fontStyle && (h.italic = !0)
                        w.fontWeight &&
                          (n(f).fontWeight.startsWith("bold") ||
                            700 <= parseInt(n(f).fontWeight)) &&
                          (h.bold = !0)
                        0 < Object.keys(h).length && (e = r(e, h))
                        0 < parseFloat(w.textIndent || 0) &&
                          (e = new ua.default().insert("\t").concat(e))
                        return e
                      },
                    ],
                    [
                      "li",
                      function (f, e) {
                        var n = qa.default.query(f)
                        if (null == n || "list-item" !== n.blotName || !h(e, "\n")) return e
                        n = -1
                        for (f = f.parentNode; !f.classList.contains("ql-clipboard"); )
                          "list" === (qa.default.query(f) || {}).blotName && (n += 1),
                            (f = f.parentNode)
                        return 0 >= n
                          ? e
                          : e.compose(
                              new ua.default().retain(e.length() - 1).retain(1, { indent: n })
                            )
                      },
                    ],
                    ["b", ea.bind(ea, "bold")],
                    ["i", ea.bind(ea, "italic")],
                    [
                      "style",
                      function () {
                        return new ua.default()
                      },
                    ],
                  ],
                  Ba = [Aa.AlignAttribute, za.DirectionAttribute].reduce(function (f, e) {
                    f[e.keyName] = e
                    return f
                  }, {}),
                  va = [
                    Aa.AlignStyle,
                    ta.BackgroundStyle,
                    Da.ColorStyle,
                    za.DirectionStyle,
                    Ga.FontStyle,
                    ba.SizeStyle,
                  ].reduce(function (f, e) {
                    f[e.keyName] = e
                    return f
                  }, {})
                ba = (function (f) {
                  function e(f, h) {
                    if (!(this instanceof e))
                      throw new TypeError("Cannot call a class as a function")
                    var n = w(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, f, h))
                    n.quill.root.addEventListener("paste", n.onPaste.bind(n))
                    n.container = n.quill.addContainer("ql-clipboard")
                    n.container.setAttribute("contenteditable", !0)
                    n.container.setAttribute("tabindex", -1)
                    n.matchers = []
                    Ja.concat(n.options.matchers).forEach(function (f) {
                      f = oa(f, 2)
                      var e = f[1]
                      ;(h.matchVisual || e !== pa) && n.addMatcher(f[0], e)
                    })
                    return n
                  }
                  y(e, f)
                  ya(e, [
                    {
                      key: "addMatcher",
                      value: function (f, e) {
                        this.matchers.push([f, e])
                      },
                    },
                    {
                      key: "convert",
                      value: function (f) {
                        if ("string" === typeof f)
                          return (
                            (this.container.innerHTML = f.replace(/>\r?\n +</g, "><")),
                            this.convert()
                          )
                        f = this.quill.getFormat(this.quill.selection.savedRange.index)
                        if (f[Ea.default.blotName]) {
                          var e = this.container.innerText
                          this.container.innerHTML = ""
                          return new ua.default().insert(
                            e,
                            z({}, Ea.default.blotName, f[Ea.default.blotName])
                          )
                        }
                        f = this.prepareMatching()
                        f = oa(f, 2)
                        f = x(this.container, f[0], f[1])
                        h(f, "\n") &&
                          null == f.ops[f.ops.length - 1].attributes &&
                          (f = f.compose(new ua.default().retain(f.length() - 1).delete(1)))
                        Ca.log("convert", this.container.innerHTML, f)
                        this.container.innerHTML = ""
                        return f
                      },
                    },
                    {
                      key: "dangerouslyPasteHTML",
                      value: function (f, e) {
                        var h =
                          2 < arguments.length && void 0 !== arguments[2]
                            ? arguments[2]
                            : ka.default.sources.API
                        if ("string" === typeof f)
                          this.quill.setContents(this.convert(f), e),
                            this.quill.setSelection(0, ka.default.sources.SILENT)
                        else {
                          var n = this.convert(e)
                          this.quill.updateContents(new ua.default().retain(f).concat(n), h)
                          this.quill.setSelection(f + n.length(), ka.default.sources.SILENT)
                        }
                      },
                    },
                    {
                      key: "onPaste",
                      value: function (f) {
                        var e = this
                        if (!f.defaultPrevented && this.quill.isEnabled()) {
                          var h = this.quill.getSelection(),
                            n = new ua.default().retain(h.index),
                            r = this.quill.scrollingContainer.scrollTop
                          this.container.focus()
                          this.quill.selection.update(ka.default.sources.SILENT)
                          setTimeout(function () {
                            n = n.concat(e.convert()).delete(h.length)
                            e.quill.updateContents(n, ka.default.sources.USER)
                            e.quill.setSelection(n.length() - h.length, ka.default.sources.SILENT)
                            e.quill.scrollingContainer.scrollTop = r
                            e.quill.focus()
                          }, 1)
                        }
                      },
                    },
                    {
                      key: "prepareMatching",
                      value: function () {
                        var f = this,
                          e = [],
                          h = []
                        this.matchers.forEach(function (n) {
                          n = oa(n, 2)
                          var r = n[0],
                            w = n[1]
                          switch (r) {
                            case Node.TEXT_NODE:
                              h.push(w)
                              break
                            case Node.ELEMENT_NODE:
                              e.push(w)
                              break
                            default:
                              ;[].forEach.call(f.container.querySelectorAll(r), function (f) {
                                f["__ql-matcher"] = f["__ql-matcher"] || []
                                f["__ql-matcher"].push(w)
                              })
                          }
                        })
                        return [e, h]
                      },
                    },
                  ])
                  return e
                })(wa.default)
                ba.DEFAULTS = { matchers: [], matchVisual: !0 }
                aa.default = ba
                aa.matchAttributor = ha
                aa.matchBlot = da
                aa.matchNewline = ia
                aa.matchSpacing = pa
                aa.matchText = la
              },
              function (e, aa, ba) {
                function ca(e, r) {
                  if ("function" !== typeof r && null !== r)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof r
                    )
                  e.prototype = Object.create(r && r.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : (e.__proto__ = r))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var z = (function () {
                    function e(e, n) {
                      for (var h = 0; h < n.length; h++) {
                        var f = n[h]
                        f.enumerable = f.enumerable || !1
                        f.configurable = !0
                        "value" in f && (f.writable = !0)
                        Object.defineProperty(e, f.key, f)
                      }
                    }
                    return function (r, n, h) {
                      n && e(r.prototype, n)
                      h && e(r, h)
                      return r
                    }
                  })(),
                  w = function f(e, n, h) {
                    null === e && (e = Function.prototype)
                    var r = Object.getOwnPropertyDescriptor(e, n)
                    if (void 0 === r) {
                      if (((e = Object.getPrototypeOf(e)), null !== e)) return f(e, n, h)
                    } else {
                      if ("value" in r) return r.value
                      n = r.get
                      return void 0 === n ? void 0 : n.call(h)
                    }
                  }
                e = (function (e) {
                  function n() {
                    if (!(this instanceof n))
                      throw new TypeError("Cannot call a class as a function")
                    var e = (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e || ("object" !== typeof e && "function" !== typeof e) ? this : e
                  }
                  ca(n, e)
                  z(
                    n,
                    [
                      {
                        key: "optimize",
                        value: function (e) {
                          w(
                            n.prototype.__proto__ || Object.getPrototypeOf(n.prototype),
                            "optimize",
                            this
                          ).call(this, e)
                          this.domNode.tagName !== this.statics.tagName[0] &&
                            this.replaceWith(this.statics.blotName)
                        },
                      },
                    ],
                    [
                      {
                        key: "create",
                        value: function () {
                          return w(n.__proto__ || Object.getPrototypeOf(n), "create", this).call(
                            this
                          )
                        },
                      },
                      {
                        key: "formats",
                        value: function () {
                          return !0
                        },
                      },
                    ]
                  )
                  return n
                })(
                  (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(6)).default
                )
                e.blotName = "bold"
                e.tagName = ["STRONG", "B"]
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e, h) {
                  e in f
                    ? Object.defineProperty(f, e, {
                        value: h,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (f[e] = h)
                  return f
                }
                function w(f, e) {
                  if (!f)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ("object" !== typeof e && "function" !== typeof e) ? f : e
                }
                function y(f, e) {
                  if ("function" !== typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof e
                    )
                  f.prototype = Object.create(e && e.prototype, {
                    constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : (f.__proto__ = e))
                }
                function r(f, e, h) {
                  var n = document.createElement("button")
                  n.setAttribute("type", "button")
                  n.classList.add("ql-" + e)
                  null != h && (n.value = h)
                  f.appendChild(n)
                }
                function n(f, e) {
                  Array.isArray(e[0]) || (e = [e])
                  e.forEach(function (e) {
                    var n = document.createElement("span")
                    n.classList.add("ql-formats")
                    e.forEach(function (f) {
                      if ("string" === typeof f) r(n, f)
                      else {
                        var e = Object.keys(f)[0]
                        f = f[e]
                        Array.isArray(f) ? h(n, e, f) : r(n, e, f)
                      }
                    })
                    f.appendChild(n)
                  })
                }
                function h(f, e, h) {
                  var n = document.createElement("select")
                  n.classList.add("ql-" + e)
                  h.forEach(function (f) {
                    var e = document.createElement("option")
                    !1 !== f ? e.setAttribute("value", f) : e.setAttribute("selected", "selected")
                    n.appendChild(e)
                  })
                  f.appendChild(n)
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.addControls = aa.default = void 0
                var f = (function () {
                    return function (f, e) {
                      if (Array.isArray(f)) return f
                      if (Symbol.iterator in Object(f)) {
                        var h = [],
                          n = !0,
                          r = !1,
                          w = void 0
                        try {
                          for (
                            var x = f[Symbol.iterator](), y;
                            !(n = (y = x.next()).done) && (h.push(y.value), !e || h.length !== e);
                            n = !0
                          );
                        } catch (ka) {
                          ;(r = !0), (w = ka)
                        } finally {
                          try {
                            if (!n && x["return"]) x["return"]()
                          } finally {
                            if (r) throw w
                          }
                        }
                        return h
                      }
                      throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                  })(),
                  x = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })()
                e = ba(2)
                var ea = ca(e)
                e = ba(0)
                var ha = ca(e)
                e = ba(5)
                var da = ca(e)
                e = ba(10)
                e = ca(e)
                ba = ba(9)
                ba = ca(ba)
                var ia = (0, e.default)("quill:toolbar")
                ba = (function (e) {
                  function h(e, r) {
                    if (!(this instanceof h))
                      throw new TypeError("Cannot call a class as a function")
                    var x = w(this, (h.__proto__ || Object.getPrototypeOf(h)).call(this, e, r))
                    Array.isArray(x.options.container)
                      ? ((r = document.createElement("div")),
                        n(r, x.options.container),
                        e.container.parentNode.insertBefore(r, e.container),
                        (x.container = r))
                      : (x.container =
                          "string" === typeof x.options.container
                            ? document.querySelector(x.options.container)
                            : x.options.container)
                    if (!(x.container instanceof HTMLElement)) {
                      var y
                      return (y = ia.error("Container required for toolbar", x.options)), w(x, y)
                    }
                    x.container.classList.add("ql-toolbar")
                    x.controls = []
                    x.handlers = {}
                    Object.keys(x.options.handlers).forEach(function (f) {
                      x.addHandler(f, x.options.handlers[f])
                    })
                    ;[].forEach.call(x.container.querySelectorAll("button, select"), function (f) {
                      x.attach(f)
                    })
                    x.quill.on(da.default.events.EDITOR_CHANGE, function (f, e) {
                      f === da.default.events.SELECTION_CHANGE && x.update(e)
                    })
                    x.quill.on(da.default.events.SCROLL_OPTIMIZE, function () {
                      var e = x.quill.selection.getRange()
                      e = f(e, 1)[0]
                      x.update(e)
                    })
                    return x
                  }
                  y(h, e)
                  x(h, [
                    {
                      key: "addHandler",
                      value: function (f, e) {
                        this.handlers[f] = e
                      },
                    },
                    {
                      key: "attach",
                      value: function (e) {
                        var h = this,
                          n = [].find.call(e.classList, function (f) {
                            return 0 === f.indexOf("ql-")
                          })
                        if (n) {
                          n = n.slice(3)
                          "BUTTON" === e.tagName && e.setAttribute("type", "button")
                          if (null == this.handlers[n]) {
                            if (
                              null != this.quill.scroll.whitelist &&
                              null == this.quill.scroll.whitelist[n]
                            ) {
                              ia.warn("ignoring attaching to disabled format", n, e)
                              return
                            }
                            if (null == ha.default.query(n)) {
                              ia.warn("ignoring attaching to nonexistent format", n, e)
                              return
                            }
                          }
                          e.addEventListener(
                            "SELECT" === e.tagName ? "change" : "click",
                            function (r) {
                              if ("SELECT" === e.tagName) {
                                if (0 > e.selectedIndex) return
                                var w = e.options[e.selectedIndex]
                                w = w.hasAttribute("selected") ? !1 : w.value || !1
                              } else
                                (w = e.classList.contains("ql-active")
                                  ? !1
                                  : e.value || !e.hasAttribute("value")),
                                  r.preventDefault()
                              h.quill.focus()
                              r = h.quill.selection.getRange()
                              r = f(r, 1)[0]
                              if (null != h.handlers[n]) h.handlers[n].call(h, w)
                              else if (ha.default.query(n).prototype instanceof ha.default.Embed) {
                                w = prompt("Enter " + n)
                                if (!w) return
                                h.quill.updateContents(
                                  new ea.default()
                                    .retain(r.index)
                                    .delete(r.length)
                                    .insert(z({}, n, w)),
                                  da.default.sources.USER
                                )
                              } else h.quill.format(n, w, da.default.sources.USER)
                              h.update(r)
                            }
                          )
                          this.controls.push([n, e])
                        }
                      },
                    },
                    {
                      key: "update",
                      value: function (e) {
                        var h = null == e ? {} : this.quill.getFormat(e)
                        this.controls.forEach(function (n) {
                          n = f(n, 2)
                          var r = n[0]
                          n = n[1]
                          if ("SELECT" === n.tagName) {
                            var w = void 0
                            null == e
                              ? (w = null)
                              : null == h[r]
                              ? (w = n.querySelector("option[selected]"))
                              : Array.isArray(h[r]) ||
                                ((r = h[r]),
                                "string" === typeof r && (r = r.replace(/"/g, '\\"')),
                                (w = n.querySelector('option[value="' + r + '"]')))
                            null == w ? ((n.value = ""), (n.selectedIndex = -1)) : (w.selected = !0)
                          } else null == e ? n.classList.remove("ql-active") : n.hasAttribute("value") ? ((r = h[r] === n.getAttribute("value") || (null != h[r] && h[r].toString() === n.getAttribute("value")) || (null == h[r] && !n.getAttribute("value"))), n.classList.toggle("ql-active", r)) : n.classList.toggle("ql-active", null != h[r])
                        })
                      },
                    },
                  ])
                  return h
                })(ba.default)
                ba.DEFAULTS = {}
                ba.DEFAULTS = {
                  container: null,
                  handlers: {
                    clean: function () {
                      var f = this,
                        e = this.quill.getSelection()
                      null != e &&
                        (0 == e.length
                          ? ((e = this.quill.getFormat()),
                            Object.keys(e).forEach(function (e) {
                              null != ha.default.query(e, ha.default.Scope.INLINE) &&
                                f.quill.format(e, !1)
                            }))
                          : this.quill.removeFormat(e, da.default.sources.USER))
                    },
                    direction: function (f) {
                      var e = this.quill.getFormat().align
                      "rtl" === f && null == e
                        ? this.quill.format("align", "right", da.default.sources.USER)
                        : f ||
                          "right" !== e ||
                          this.quill.format("align", !1, da.default.sources.USER)
                      this.quill.format("direction", f, da.default.sources.USER)
                    },
                    indent: function (f) {
                      var e = this.quill.getFormat(this.quill.getSelection()),
                        h = parseInt(e.indent || 0)
                      if ("+1" === f || "-1" === f)
                        (f = "+1" === f ? 1 : -1),
                          "rtl" === e.direction && (f *= -1),
                          this.quill.format("indent", h + f, da.default.sources.USER)
                    },
                    link: function (f) {
                      !0 === f && (f = prompt("Enter link URL:"))
                      this.quill.format("link", f, da.default.sources.USER)
                    },
                    list: function (f) {
                      var e = this.quill.getFormat(this.quill.getSelection())
                      "check" === f
                        ? "checked" === e.list || "unchecked" === e.list
                          ? this.quill.format("list", !1, da.default.sources.USER)
                          : this.quill.format("list", "unchecked", da.default.sources.USER)
                        : this.quill.format("list", f, da.default.sources.USER)
                    },
                  },
                }
                aa.default = ba
                aa.addControls = n
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>'
              },
              function (e, aa, ba) {
                function ca(e, n) {
                  if (!e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !n || ("object" !== typeof n && "function" !== typeof n) ? e : n
                }
                function z(e, n) {
                  if ("function" !== typeof n && null !== n)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof n
                    )
                  e.prototype = Object.create(n && n.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : (e.__proto__ = n))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var w = (function () {
                    function e(e, h) {
                      for (var f = 0; f < h.length; f++) {
                        var n = h[f]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(e, n.key, n)
                      }
                    }
                    return function (n, h, f) {
                      h && e(n.prototype, h)
                      f && e(n, f)
                      return n
                    }
                  })(),
                  y = function x(e, h, f) {
                    null === e && (e = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(e, h)
                    if (void 0 === n) {
                      if (((e = Object.getPrototypeOf(e)), null !== e)) return x(e, h, f)
                    } else {
                      if ("value" in n) return n.value
                      h = n.get
                      return void 0 === h ? void 0 : h.call(f)
                    }
                  }
                e = (function (e) {
                  function h(f, e) {
                    if (!(this instanceof h))
                      throw new TypeError("Cannot call a class as a function")
                    f = ca(this, (h.__proto__ || Object.getPrototypeOf(h)).call(this, f))
                    f.label.innerHTML = e
                    f.container.classList.add("ql-color-picker")
                    ;[].slice
                      .call(f.container.querySelectorAll(".ql-picker-item"), 0, 7)
                      .forEach(function (f) {
                        f.classList.add("ql-primary")
                      })
                    return f
                  }
                  z(h, e)
                  w(h, [
                    {
                      key: "buildItem",
                      value: function (f) {
                        var e = y(
                          h.prototype.__proto__ || Object.getPrototypeOf(h.prototype),
                          "buildItem",
                          this
                        ).call(this, f)
                        e.style.backgroundColor = f.getAttribute("value") || ""
                        return e
                      },
                    },
                    {
                      key: "selectItem",
                      value: function (f, e) {
                        y(
                          h.prototype.__proto__ || Object.getPrototypeOf(h.prototype),
                          "selectItem",
                          this
                        ).call(this, f, e)
                        e = this.label.querySelector(".ql-color-label")
                        f = f ? f.getAttribute("data-value") || "" : ""
                        e && ("line" === e.tagName ? (e.style.stroke = f) : (e.style.fill = f))
                      },
                    },
                  ])
                  return h
                })(
                  (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(28)).default
                )
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(e, n) {
                  if (!e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !n || ("object" !== typeof n && "function" !== typeof n) ? e : n
                }
                function z(e, n) {
                  if ("function" !== typeof n && null !== n)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof n
                    )
                  e.prototype = Object.create(n && n.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : (e.__proto__ = n))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var w = (function () {
                    function e(e, h) {
                      for (var f = 0; f < h.length; f++) {
                        var n = h[f]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(e, n.key, n)
                      }
                    }
                    return function (n, h, f) {
                      h && e(n.prototype, h)
                      f && e(n, f)
                      return n
                    }
                  })(),
                  y = function x(e, h, f) {
                    null === e && (e = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(e, h)
                    if (void 0 === n) {
                      if (((e = Object.getPrototypeOf(e)), null !== e)) return x(e, h, f)
                    } else {
                      if ("value" in n) return n.value
                      h = n.get
                      return void 0 === h ? void 0 : h.call(f)
                    }
                  }
                e = (function (e) {
                  function h(f, e) {
                    if (!(this instanceof h))
                      throw new TypeError("Cannot call a class as a function")
                    f = ca(this, (h.__proto__ || Object.getPrototypeOf(h)).call(this, f))
                    f.container.classList.add("ql-icon-picker")
                    ;[].forEach.call(f.container.querySelectorAll(".ql-picker-item"), function (f) {
                      f.innerHTML = e[f.getAttribute("data-value") || ""]
                    })
                    f.defaultItem = f.container.querySelector(".ql-selected")
                    f.selectItem(f.defaultItem)
                    return f
                  }
                  z(h, e)
                  w(h, [
                    {
                      key: "selectItem",
                      value: function (f, e) {
                        y(
                          h.prototype.__proto__ || Object.getPrototypeOf(h.prototype),
                          "selectItem",
                          this
                        ).call(this, f, e)
                        f = f || this.defaultItem
                        this.label.innerHTML = f.innerHTML
                      },
                    },
                  ])
                  return h
                })(
                  (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(28)).default
                )
                aa.default = e
              },
              function (e, aa) {
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var ba = (function () {
                  function e(e, w) {
                    for (var y = 0; y < w.length; y++) {
                      var r = w[y]
                      r.enumerable = r.enumerable || !1
                      r.configurable = !0
                      "value" in r && (r.writable = !0)
                      Object.defineProperty(e, r.key, r)
                    }
                  }
                  return function (z, w, y) {
                    w && e(z.prototype, w)
                    y && e(z, y)
                    return z
                  }
                })()
                e = (function () {
                  function e(z, w) {
                    var y = this
                    if (!(this instanceof e))
                      throw new TypeError("Cannot call a class as a function")
                    this.quill = z
                    this.boundsContainer = w || document.body
                    this.root = z.addContainer("ql-tooltip")
                    this.root.innerHTML = this.constructor.TEMPLATE
                    this.quill.root === this.quill.scrollingContainer &&
                      this.quill.root.addEventListener("scroll", function () {
                        y.root.style.marginTop = -1 * y.quill.root.scrollTop + "px"
                      })
                    this.hide()
                  }
                  ba(e, [
                    {
                      key: "hide",
                      value: function () {
                        this.root.classList.add("ql-hidden")
                      },
                    },
                    {
                      key: "position",
                      value: function (e) {
                        var w = e.left + e.width / 2 - this.root.offsetWidth / 2,
                          y = e.bottom + this.quill.root.scrollTop
                        this.root.style.left = w + "px"
                        this.root.style.top = y + "px"
                        this.root.classList.remove("ql-flip")
                        var r = this.boundsContainer.getBoundingClientRect(),
                          n = this.root.getBoundingClientRect(),
                          h = 0
                        n.right > r.right &&
                          ((h = r.right - n.right), (this.root.style.left = w + h + "px"))
                        n.left < r.left &&
                          ((h = r.left - n.left), (this.root.style.left = w + h + "px"))
                        n.bottom > r.bottom &&
                          ((this.root.style.top =
                            y - (e.bottom - e.top + (n.bottom - n.top)) + "px"),
                          this.root.classList.add("ql-flip"))
                        return h
                      },
                    },
                    {
                      key: "show",
                      value: function () {
                        this.root.classList.remove("ql-editing")
                        this.root.classList.remove("ql-hidden")
                      },
                    },
                  ])
                  return e
                })()
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e) {
                  if (!(f instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                function w(f, e) {
                  if (!f)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ("object" !== typeof e && "function" !== typeof e) ? f : e
                }
                function y(f, e) {
                  if ("function" !== typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof e
                    )
                  f.prototype = Object.create(e && e.prototype, {
                    constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : (f.__proto__ = e))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var r = (function () {
                    return function (f, e) {
                      if (Array.isArray(f)) return f
                      if (Symbol.iterator in Object(f)) {
                        var h = [],
                          n = !0,
                          r = !1,
                          w = void 0
                        try {
                          for (
                            var x = f[Symbol.iterator](), y;
                            !(n = (y = x.next()).done) && (h.push(y.value), !e || h.length !== e);
                            n = !0
                          );
                        } catch (ta) {
                          ;(r = !0), (w = ta)
                        } finally {
                          try {
                            if (!n && x["return"]) x["return"]()
                          } finally {
                            if (r) throw w
                          }
                        }
                        return h
                      }
                      throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                  })(),
                  n = function qa(f, e, h) {
                    null === f && (f = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(f, e)
                    if (void 0 === n) {
                      if (((f = Object.getPrototypeOf(f)), null !== f)) return qa(f, e, h)
                    } else {
                      if ("value" in n) return n.value
                      e = n.get
                      return void 0 === e ? void 0 : e.call(h)
                    }
                  },
                  h = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })()
                e = ba(3)
                e = ca(e)
                var f = ba(8),
                  x = ca(f)
                f = ba(43)
                var ea = ca(f),
                  da = ba(27),
                  ha = ca(da),
                  ia = ba(15)
                ba = ba(41)
                var pa = ca(ba),
                  la = [
                    [{ header: ["1", "2", "3", !1] }],
                    ["bold", "italic", "underline", "link"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"],
                  ]
                ba = (function (f) {
                  function e(f, h) {
                    z(this, e)
                    null != h.modules.toolbar &&
                      null == h.modules.toolbar.container &&
                      (h.modules.toolbar.container = la)
                    f = w(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, f, h))
                    f.quill.container.classList.add("ql-snow")
                    return f
                  }
                  y(e, f)
                  h(e, [
                    {
                      key: "extendToolbar",
                      value: function (f) {
                        f.container.classList.add("ql-snow")
                        this.buildButtons(
                          [].slice.call(f.container.querySelectorAll("button")),
                          pa.default
                        )
                        this.buildPickers(
                          [].slice.call(f.container.querySelectorAll("select")),
                          pa.default
                        )
                        this.tooltip = new ra(this.quill, this.options.bounds)
                        f.container.querySelector(".ql-link") &&
                          this.quill.keyboard.addBinding(
                            { key: "K", shortKey: !0 },
                            function (e, h) {
                              f.handlers.link.call(f, !h.format.link)
                            }
                          )
                      },
                    },
                  ])
                  return e
                })(ea.default)
                ba.DEFAULTS = (0, e.default)(!0, {}, ea.default.DEFAULTS, {
                  modules: {
                    toolbar: {
                      handlers: {
                        link: function (f) {
                          f
                            ? ((f = this.quill.getSelection()),
                              null != f &&
                                0 != f.length &&
                                ((f = this.quill.getText(f)),
                                /^\S+@\S+\.\S+$/.test(f) &&
                                  0 !== f.indexOf("mailto:") &&
                                  (f = "mailto:" + f),
                                this.quill.theme.tooltip.edit("link", f)))
                            : this.quill.format("link", !1)
                        },
                      },
                    },
                  },
                })
                var ra = (function (f) {
                  function e(f, h) {
                    z(this, e)
                    f = w(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, f, h))
                    f.preview = f.root.querySelector("a.ql-preview")
                    return f
                  }
                  y(e, f)
                  h(e, [
                    {
                      key: "listen",
                      value: function () {
                        var f = this
                        n(
                          e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                          "listen",
                          this
                        ).call(this)
                        this.root
                          .querySelector("a.ql-action")
                          .addEventListener("click", function (e) {
                            f.root.classList.contains("ql-editing")
                              ? f.save()
                              : f.edit("link", f.preview.textContent)
                            e.preventDefault()
                          })
                        this.root
                          .querySelector("a.ql-remove")
                          .addEventListener("click", function (e) {
                            if (null != f.linkRange) {
                              var h = f.linkRange
                              f.restoreFocus()
                              f.quill.formatText(h, "link", !1, x.default.sources.USER)
                              delete f.linkRange
                            }
                            e.preventDefault()
                            f.hide()
                          })
                        this.quill.on(x.default.events.SELECTION_CHANGE, function (e, h, n) {
                          if (null != e) {
                            if (0 === e.length && n === x.default.sources.USER) {
                              if (
                                ((h = f.quill.scroll.descendant(ha.default, e.index)),
                                (n = r(h, 2)),
                                (h = n[0]),
                                (n = n[1]),
                                null != h)
                              ) {
                                f.linkRange = new ia.Range(e.index - n, h.length())
                                e = ha.default.formats(h.domNode)
                                f.preview.textContent = e
                                f.preview.setAttribute("href", e)
                                f.show()
                                f.position(f.quill.getBounds(f.linkRange))
                                return
                              }
                            } else delete f.linkRange
                            f.hide()
                          }
                        })
                      },
                    },
                    {
                      key: "show",
                      value: function () {
                        n(
                          e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                          "show",
                          this
                        ).call(this)
                        this.root.removeAttribute("data-mode")
                      },
                    },
                  ])
                  return e
                })(f.BaseTooltip)
                ra.TEMPLATE =
                  '<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a><input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL"><a class="ql-action"></a><a class="ql-remove"></a>'
                aa.default = ba
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = ba(29)
                e = ca(e)
                var z = ba(36),
                  w = ba(38),
                  y = ba(64),
                  r = ba(65)
                r = ca(r)
                var n = ba(66)
                n = ca(n)
                var h = ba(67),
                  f = ca(h),
                  x = ba(37),
                  ea = ba(26),
                  da = ba(39),
                  ha = ba(40),
                  ia = ba(56)
                ia = ca(ia)
                var pa = ba(68)
                pa = ca(pa)
                var la = ba(27)
                la = ca(la)
                var ra = ba(69)
                ra = ca(ra)
                var oa = ba(70)
                oa = ca(oa)
                var ya = ba(71)
                ya = ca(ya)
                var Fa = ba(72)
                Fa = ca(Fa)
                var ua = ba(73)
                ua = ca(ua)
                var qa = ba(13),
                  ka = ca(qa),
                  wa = ba(74)
                wa = ca(wa)
                var Aa = ba(75)
                Aa = ca(Aa)
                var ta = ba(57)
                ta = ca(ta)
                var Da = ba(41)
                Da = ca(Da)
                var Ea = ba(28)
                Ea = ca(Ea)
                var za = ba(59)
                za = ca(za)
                var Ga = ba(60)
                Ga = ca(Ga)
                var Ca = ba(61)
                Ca = ca(Ca)
                var Ja = ba(108)
                Ja = ca(Ja)
                ba = ba(62)
                ba = ca(ba)
                e.default.register(
                  {
                    "attributors/attribute/direction": w.DirectionAttribute,
                    "attributors/class/align": z.AlignClass,
                    "attributors/class/background": x.BackgroundClass,
                    "attributors/class/color": ea.ColorClass,
                    "attributors/class/direction": w.DirectionClass,
                    "attributors/class/font": da.FontClass,
                    "attributors/class/size": ha.SizeClass,
                    "attributors/style/align": z.AlignStyle,
                    "attributors/style/background": x.BackgroundStyle,
                    "attributors/style/color": ea.ColorStyle,
                    "attributors/style/direction": w.DirectionStyle,
                    "attributors/style/font": da.FontStyle,
                    "attributors/style/size": ha.SizeStyle,
                  },
                  !0
                )
                e.default.register(
                  {
                    "formats/align": z.AlignClass,
                    "formats/direction": w.DirectionClass,
                    "formats/indent": y.IndentClass,
                    "formats/background": x.BackgroundStyle,
                    "formats/color": ea.ColorStyle,
                    "formats/font": da.FontClass,
                    "formats/size": ha.SizeClass,
                    "formats/blockquote": r.default,
                    "formats/code-block": ka.default,
                    "formats/header": n.default,
                    "formats/list": f.default,
                    "formats/bold": ia.default,
                    "formats/code": qa.Code,
                    "formats/italic": pa.default,
                    "formats/link": la.default,
                    "formats/script": ra.default,
                    "formats/strike": oa.default,
                    "formats/underline": ya.default,
                    "formats/image": Fa.default,
                    "formats/video": ua.default,
                    "formats/list/item": h.ListItem,
                    "modules/formula": wa.default,
                    "modules/syntax": Aa.default,
                    "modules/toolbar": ta.default,
                    "themes/bubble": Ja.default,
                    "themes/snow": ba.default,
                    "ui/icons": Da.default,
                    "ui/picker": Ea.default,
                    "ui/icon-picker": Ga.default,
                    "ui/color-picker": za.default,
                    "ui/tooltip": Ca.default,
                  },
                  !0
                )
                aa.default = e.default
              },
              function (e, aa, ba) {
                function ca(e, r) {
                  if ("function" !== typeof r && null !== r)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof r
                    )
                  e.prototype = Object.create(r && r.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : (e.__proto__ = r))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.IndentClass = void 0
                var z = (function () {
                    function e(e, n) {
                      for (var h = 0; h < n.length; h++) {
                        var f = n[h]
                        f.enumerable = f.enumerable || !1
                        f.configurable = !0
                        "value" in f && (f.writable = !0)
                        Object.defineProperty(e, f.key, f)
                      }
                    }
                    return function (r, n, h) {
                      n && e(r.prototype, n)
                      h && e(r, h)
                      return r
                    }
                  })(),
                  w = function f(e, n, h) {
                    null === e && (e = Function.prototype)
                    var r = Object.getOwnPropertyDescriptor(e, n)
                    if (void 0 === r) {
                      if (((e = Object.getPrototypeOf(e)), null !== e)) return f(e, n, h)
                    } else {
                      if ("value" in r) return r.value
                      n = r.get
                      return void 0 === n ? void 0 : n.call(h)
                    }
                  }
                e = (function (e) {
                  return e && e.__esModule ? e : { default: e }
                })(ba(0))
                e = new ((function (e) {
                  function n() {
                    if (!(this instanceof n))
                      throw new TypeError("Cannot call a class as a function")
                    var e = (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e || ("object" !== typeof e && "function" !== typeof e) ? this : e
                  }
                  ca(n, e)
                  z(n, [
                    {
                      key: "add",
                      value: function (e, f) {
                        if ("+1" === f || "-1" === f) {
                          var h = this.value(e) || 0
                          f = "+1" === f ? h + 1 : h - 1
                        }
                        return 0 === f
                          ? (this.remove(e), !0)
                          : w(
                              n.prototype.__proto__ || Object.getPrototypeOf(n.prototype),
                              "add",
                              this
                            ).call(this, e, f)
                      },
                    },
                    {
                      key: "canAdd",
                      value: function (e, f) {
                        return (
                          w(
                            n.prototype.__proto__ || Object.getPrototypeOf(n.prototype),
                            "canAdd",
                            this
                          ).call(this, e, f) ||
                          w(
                            n.prototype.__proto__ || Object.getPrototypeOf(n.prototype),
                            "canAdd",
                            this
                          ).call(this, e, parseInt(f))
                        )
                      },
                    },
                    {
                      key: "value",
                      value: function (e) {
                        return (
                          parseInt(
                            w(
                              n.prototype.__proto__ || Object.getPrototypeOf(n.prototype),
                              "value",
                              this
                            ).call(this, e)
                          ) || void 0
                        )
                      },
                    },
                  ])
                  return n
                })(e.default.Attributor.Class))("indent", "ql-indent", {
                  scope: e.default.Scope.BLOCK,
                  whitelist: [1, 2, 3, 4, 5, 6, 7, 8],
                })
                aa.IndentClass = e
              },
              function (e, aa, ba) {
                function ca(e, w) {
                  if ("function" !== typeof w && null !== w)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof w
                    )
                  e.prototype = Object.create(w && w.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  w && (Object.setPrototypeOf ? Object.setPrototypeOf(e, w) : (e.__proto__ = w))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = (function (e) {
                  function w() {
                    if (!(this instanceof w))
                      throw new TypeError("Cannot call a class as a function")
                    var e = (w.__proto__ || Object.getPrototypeOf(w)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e || ("object" !== typeof e && "function" !== typeof e) ? this : e
                  }
                  ca(w, e)
                  return w
                })(
                  (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(4)).default
                )
                e.blotName = "blockquote"
                e.tagName = "blockquote"
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(e, y) {
                  if ("function" !== typeof y && null !== y)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof y
                    )
                  e.prototype = Object.create(y && y.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  y && (Object.setPrototypeOf ? Object.setPrototypeOf(e, y) : (e.__proto__ = y))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var z = (function () {
                  function e(e, r) {
                    for (var n = 0; n < r.length; n++) {
                      var h = r[n]
                      h.enumerable = h.enumerable || !1
                      h.configurable = !0
                      "value" in h && (h.writable = !0)
                      Object.defineProperty(e, h.key, h)
                    }
                  }
                  return function (w, r, n) {
                    r && e(w.prototype, r)
                    n && e(w, n)
                    return w
                  }
                })()
                e = (function (e) {
                  function w() {
                    if (!(this instanceof w))
                      throw new TypeError("Cannot call a class as a function")
                    var e = (w.__proto__ || Object.getPrototypeOf(w)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e || ("object" !== typeof e && "function" !== typeof e) ? this : e
                  }
                  ca(w, e)
                  z(w, null, [
                    {
                      key: "formats",
                      value: function (e) {
                        return this.tagName.indexOf(e.tagName) + 1
                      },
                    },
                  ])
                  return w
                })(
                  (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(4)).default
                )
                e.blotName = "header"
                e.tagName = "H1 H2 H3 H4 H5 H6".split(" ")
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e) {
                  if (!(f instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                function w(f, e) {
                  if (!f)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ("object" !== typeof e && "function" !== typeof e) ? f : e
                }
                function y(f, e) {
                  if ("function" !== typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof e
                    )
                  f.prototype = Object.create(e && e.prototype, {
                    constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : (f.__proto__ = e))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.default = aa.ListItem = void 0
                var r = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })(),
                  n = function pa(f, e, h) {
                    null === f && (f = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(f, e)
                    if (void 0 === n) {
                      if (((f = Object.getPrototypeOf(f)), null !== f)) return pa(f, e, h)
                    } else {
                      if ("value" in n) return n.value
                      e = n.get
                      return void 0 === e ? void 0 : e.call(h)
                    }
                  }
                e = ba(0)
                var h = ca(e)
                e = ba(4)
                e = ca(e)
                ba = ba(25)
                ba = ca(ba)
                var f = (function (f) {
                  function e() {
                    z(this, e)
                    return w(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
                  }
                  y(e, f)
                  r(
                    e,
                    [
                      {
                        key: "format",
                        value: function (f, r) {
                          f !== x.blotName || r
                            ? n(
                                e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                                "format",
                                this
                              ).call(this, f, r)
                            : this.replaceWith(h.default.create(this.statics.scope))
                        },
                      },
                      {
                        key: "remove",
                        value: function () {
                          null == this.prev && null == this.next
                            ? this.parent.remove()
                            : n(
                                e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                                "remove",
                                this
                              ).call(this)
                        },
                      },
                      {
                        key: "replaceWith",
                        value: function (f, h) {
                          this.parent.isolate(this.offset(this.parent), this.length())
                          if (f === this.parent.statics.blotName)
                            return this.parent.replaceWith(f, h), this
                          this.parent.unwrap()
                          return n(
                            e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                            "replaceWith",
                            this
                          ).call(this, f, h)
                        },
                      },
                    ],
                    [
                      {
                        key: "formats",
                        value: function (f) {
                          return f.tagName === this.tagName
                            ? void 0
                            : n(e.__proto__ || Object.getPrototypeOf(e), "formats", this).call(
                                this,
                                f
                              )
                        },
                      },
                    ]
                  )
                  return e
                })(e.default)
                f.blotName = "list-item"
                f.tagName = "LI"
                var x = (function (e) {
                  function x(f) {
                    function e(e) {
                      if (e.target.parentNode === f) {
                        var r = n.statics.formats(f)
                        e = h.default.find(e.target)
                        "checked" === r
                          ? e.format("list", "unchecked")
                          : "unchecked" === r && e.format("list", "checked")
                      }
                    }
                    z(this, x)
                    var n = w(this, (x.__proto__ || Object.getPrototypeOf(x)).call(this, f))
                    f.addEventListener("touchstart", e)
                    f.addEventListener("mousedown", e)
                    return n
                  }
                  y(x, e)
                  r(x, null, [
                    {
                      key: "create",
                      value: function (f) {
                        var e = "ordered" === f ? "OL" : "UL"
                        e = n(x.__proto__ || Object.getPrototypeOf(x), "create", this).call(this, e)
                        ;("checked" !== f && "unchecked" !== f) ||
                          e.setAttribute("data-checked", "checked" === f)
                        return e
                      },
                    },
                    {
                      key: "formats",
                      value: function (f) {
                        if ("OL" === f.tagName) return "ordered"
                        if ("UL" === f.tagName)
                          return f.hasAttribute("data-checked")
                            ? "true" === f.getAttribute("data-checked")
                              ? "checked"
                              : "unchecked"
                            : "bullet"
                      },
                    },
                  ])
                  r(x, [
                    {
                      key: "format",
                      value: function (f, e) {
                        0 < this.children.length && this.children.tail.format(f, e)
                      },
                    },
                    {
                      key: "formats",
                      value: function () {
                        var f = {},
                          e = this.statics.blotName,
                          h = this.statics.formats(this.domNode)
                        e in f
                          ? Object.defineProperty(f, e, {
                              value: h,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0,
                            })
                          : (f[e] = h)
                        return f
                      },
                    },
                    {
                      key: "insertBefore",
                      value: function (e, h) {
                        e instanceof f
                          ? n(
                              x.prototype.__proto__ || Object.getPrototypeOf(x.prototype),
                              "insertBefore",
                              this
                            ).call(this, e, h)
                          : ((h = null == h ? this.length() : h.offset(this)),
                            (h = this.split(h)),
                            h.parent.insertBefore(e, h))
                      },
                    },
                    {
                      key: "optimize",
                      value: function (f) {
                        n(
                          x.prototype.__proto__ || Object.getPrototypeOf(x.prototype),
                          "optimize",
                          this
                        ).call(this, f)
                        f = this.next
                        null != f &&
                          f.prev === this &&
                          f.statics.blotName === this.statics.blotName &&
                          f.domNode.tagName === this.domNode.tagName &&
                          f.domNode.getAttribute("data-checked") ===
                            this.domNode.getAttribute("data-checked") &&
                          (f.moveChildren(this), f.remove())
                      },
                    },
                    {
                      key: "replace",
                      value: function (f) {
                        if (f.statics.blotName !== this.statics.blotName) {
                          var e = h.default.create(this.statics.defaultChild)
                          f.moveChildren(e)
                          this.appendChild(e)
                        }
                        n(
                          x.prototype.__proto__ || Object.getPrototypeOf(x.prototype),
                          "replace",
                          this
                        ).call(this, f)
                      },
                    },
                  ])
                  return x
                })(ba.default)
                x.blotName = "list"
                x.scope = h.default.Scope.BLOCK_BLOT
                x.tagName = ["OL", "UL"]
                x.defaultChild = "list-item"
                x.allowedChildren = [f]
                aa.ListItem = f
                aa.default = x
              },
              function (e, aa, ba) {
                function ca(e, w) {
                  if ("function" !== typeof w && null !== w)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof w
                    )
                  e.prototype = Object.create(w && w.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  w && (Object.setPrototypeOf ? Object.setPrototypeOf(e, w) : (e.__proto__ = w))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = (function (e) {
                  function w() {
                    if (!(this instanceof w))
                      throw new TypeError("Cannot call a class as a function")
                    var e = (w.__proto__ || Object.getPrototypeOf(w)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e || ("object" !== typeof e && "function" !== typeof e) ? this : e
                  }
                  ca(w, e)
                  return w
                })(
                  (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(56)).default
                )
                e.blotName = "italic"
                e.tagName = ["EM", "I"]
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(e, r) {
                  if ("function" !== typeof r && null !== r)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof r
                    )
                  e.prototype = Object.create(r && r.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : (e.__proto__ = r))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var z = (function () {
                    function e(e, n) {
                      for (var h = 0; h < n.length; h++) {
                        var f = n[h]
                        f.enumerable = f.enumerable || !1
                        f.configurable = !0
                        "value" in f && (f.writable = !0)
                        Object.defineProperty(e, f.key, f)
                      }
                    }
                    return function (r, n, h) {
                      n && e(r.prototype, n)
                      h && e(r, h)
                      return r
                    }
                  })(),
                  w = function f(e, n, h) {
                    null === e && (e = Function.prototype)
                    var r = Object.getOwnPropertyDescriptor(e, n)
                    if (void 0 === r) {
                      if (((e = Object.getPrototypeOf(e)), null !== e)) return f(e, n, h)
                    } else {
                      if ("value" in r) return r.value
                      n = r.get
                      return void 0 === n ? void 0 : n.call(h)
                    }
                  }
                e = (function (e) {
                  function n() {
                    if (!(this instanceof n))
                      throw new TypeError("Cannot call a class as a function")
                    var e = (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e || ("object" !== typeof e && "function" !== typeof e) ? this : e
                  }
                  ca(n, e)
                  z(n, null, [
                    {
                      key: "create",
                      value: function (e) {
                        return "super" === e
                          ? document.createElement("sup")
                          : "sub" === e
                          ? document.createElement("sub")
                          : w(n.__proto__ || Object.getPrototypeOf(n), "create", this).call(this, e)
                      },
                    },
                    {
                      key: "formats",
                      value: function (e) {
                        if ("SUB" === e.tagName) return "sub"
                        if ("SUP" === e.tagName) return "super"
                      },
                    },
                  ])
                  return n
                })(
                  (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(6)).default
                )
                e.blotName = "script"
                e.tagName = ["SUB", "SUP"]
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(e, w) {
                  if ("function" !== typeof w && null !== w)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof w
                    )
                  e.prototype = Object.create(w && w.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  w && (Object.setPrototypeOf ? Object.setPrototypeOf(e, w) : (e.__proto__ = w))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = (function (e) {
                  function w() {
                    if (!(this instanceof w))
                      throw new TypeError("Cannot call a class as a function")
                    var e = (w.__proto__ || Object.getPrototypeOf(w)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e || ("object" !== typeof e && "function" !== typeof e) ? this : e
                  }
                  ca(w, e)
                  return w
                })(
                  (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(6)).default
                )
                e.blotName = "strike"
                e.tagName = "S"
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(e, w) {
                  if ("function" !== typeof w && null !== w)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof w
                    )
                  e.prototype = Object.create(w && w.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  w && (Object.setPrototypeOf ? Object.setPrototypeOf(e, w) : (e.__proto__ = w))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                e = (function (e) {
                  function w() {
                    if (!(this instanceof w))
                      throw new TypeError("Cannot call a class as a function")
                    var e = (w.__proto__ || Object.getPrototypeOf(w)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e || ("object" !== typeof e && "function" !== typeof e) ? this : e
                  }
                  ca(w, e)
                  return w
                })(
                  (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(6)).default
                )
                e.blotName = "underline"
                e.tagName = "U"
                aa.default = e
              },
              function (e, aa, ba) {
                function ca(e, h) {
                  if ("function" !== typeof h && null !== h)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof h
                    )
                  e.prototype = Object.create(h && h.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  h && (Object.setPrototypeOf ? Object.setPrototypeOf(e, h) : (e.__proto__ = h))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var z = (function () {
                    function e(e, f) {
                      for (var h = 0; h < f.length; h++) {
                        var n = f[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(e, n.key, n)
                      }
                    }
                    return function (h, f, n) {
                      f && e(h.prototype, f)
                      n && e(h, n)
                      return h
                    }
                  })(),
                  w = function fa(e, f, r) {
                    null === e && (e = Function.prototype)
                    var h = Object.getOwnPropertyDescriptor(e, f)
                    if (void 0 === h) {
                      if (((e = Object.getPrototypeOf(e)), null !== e)) return fa(e, f, r)
                    } else {
                      if ("value" in h) return h.value
                      f = h.get
                      return void 0 === f ? void 0 : f.call(r)
                    }
                  }
                e = (function (e) {
                  return e && e.__esModule ? e : { default: e }
                })(ba(0))
                var y = ba(27),
                  r = ["alt", "height", "width"]
                ba = (function (e) {
                  function f() {
                    if (!(this instanceof f))
                      throw new TypeError("Cannot call a class as a function")
                    var e = (f.__proto__ || Object.getPrototypeOf(f)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e || ("object" !== typeof e && "function" !== typeof e) ? this : e
                  }
                  ca(f, e)
                  z(
                    f,
                    [
                      {
                        key: "format",
                        value: function (e, h) {
                          ;-1 < r.indexOf(e)
                            ? h
                              ? this.domNode.setAttribute(e, h)
                              : this.domNode.removeAttribute(e)
                            : w(
                                f.prototype.__proto__ || Object.getPrototypeOf(f.prototype),
                                "format",
                                this
                              ).call(this, e, h)
                        },
                      },
                    ],
                    [
                      {
                        key: "create",
                        value: function (e) {
                          var h = w(f.__proto__ || Object.getPrototypeOf(f), "create", this).call(
                            this,
                            e
                          )
                          "string" === typeof e && h.setAttribute("src", this.sanitize(e))
                          return h
                        },
                      },
                      {
                        key: "formats",
                        value: function (f) {
                          return r.reduce(function (e, h) {
                            f.hasAttribute(h) && (e[h] = f.getAttribute(h))
                            return e
                          }, {})
                        },
                      },
                      {
                        key: "match",
                        value: function (f) {
                          return /\.(jpe?g|gif|png)$/.test(f) || /^data:image\/.+;base64/.test(f)
                        },
                      },
                      {
                        key: "sanitize",
                        value: function (f) {
                          return (0, y.sanitize)(f, ["http", "https", "data"]) ? f : "//:0"
                        },
                      },
                      {
                        key: "value",
                        value: function (f) {
                          return f.getAttribute("src")
                        },
                      },
                    ]
                  )
                  return f
                })(e.default.Embed)
                ba.blotName = "image"
                ba.tagName = "IMG"
                aa.default = ba
              },
              function (e, aa, ba) {
                function ca(e, h) {
                  if ("function" !== typeof h && null !== h)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof h
                    )
                  e.prototype = Object.create(h && h.prototype, {
                    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  h && (Object.setPrototypeOf ? Object.setPrototypeOf(e, h) : (e.__proto__ = h))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                var z = (function () {
                    function e(e, f) {
                      for (var h = 0; h < f.length; h++) {
                        var n = f[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(e, n.key, n)
                      }
                    }
                    return function (h, f, n) {
                      f && e(h.prototype, f)
                      n && e(h, n)
                      return h
                    }
                  })(),
                  w = function fa(e, f, r) {
                    null === e && (e = Function.prototype)
                    var h = Object.getOwnPropertyDescriptor(e, f)
                    if (void 0 === h) {
                      if (((e = Object.getPrototypeOf(e)), null !== e)) return fa(e, f, r)
                    } else {
                      if ("value" in h) return h.value
                      f = h.get
                      return void 0 === f ? void 0 : f.call(r)
                    }
                  }
                e = ba(4)
                var y = (function (e) {
                    return e && e.__esModule ? e : { default: e }
                  })(ba(27)),
                  r = ["height", "width"]
                ba = (function (e) {
                  function f() {
                    if (!(this instanceof f))
                      throw new TypeError("Cannot call a class as a function")
                    var e = (f.__proto__ || Object.getPrototypeOf(f)).apply(this, arguments)
                    if (!this)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e || ("object" !== typeof e && "function" !== typeof e) ? this : e
                  }
                  ca(f, e)
                  z(
                    f,
                    [
                      {
                        key: "format",
                        value: function (e, h) {
                          ;-1 < r.indexOf(e)
                            ? h
                              ? this.domNode.setAttribute(e, h)
                              : this.domNode.removeAttribute(e)
                            : w(
                                f.prototype.__proto__ || Object.getPrototypeOf(f.prototype),
                                "format",
                                this
                              ).call(this, e, h)
                        },
                      },
                    ],
                    [
                      {
                        key: "create",
                        value: function (e) {
                          var h = w(f.__proto__ || Object.getPrototypeOf(f), "create", this).call(
                            this,
                            e
                          )
                          h.setAttribute("frameborder", "0")
                          h.setAttribute("allowfullscreen", !0)
                          h.setAttribute("src", this.sanitize(e))
                          return h
                        },
                      },
                      {
                        key: "formats",
                        value: function (f) {
                          return r.reduce(function (e, h) {
                            f.hasAttribute(h) && (e[h] = f.getAttribute(h))
                            return e
                          }, {})
                        },
                      },
                      {
                        key: "sanitize",
                        value: function (f) {
                          return y.default.sanitize(f)
                        },
                      },
                      {
                        key: "value",
                        value: function (f) {
                          return f.getAttribute("src")
                        },
                      },
                    ]
                  )
                  return f
                })(e.BlockEmbed)
                ba.blotName = "video"
                ba.className = "ql-video"
                ba.tagName = "IFRAME"
                aa.default = ba
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e) {
                  if (!(f instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                function w(f, e) {
                  if (!f)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ("object" !== typeof e && "function" !== typeof e) ? f : e
                }
                function y(f, e) {
                  if ("function" !== typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof e
                    )
                  f.prototype = Object.create(e && e.prototype, {
                    constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : (f.__proto__ = e))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.default = aa.FormulaBlot = void 0
                var r = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })(),
                  n = function pa(f, e, h) {
                    null === f && (f = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(f, e)
                    if (void 0 === n) {
                      if (((f = Object.getPrototypeOf(f)), null !== f)) return pa(f, e, h)
                    } else {
                      if ("value" in n) return n.value
                      e = n.get
                      return void 0 === e ? void 0 : e.call(h)
                    }
                  }
                e = ba(35)
                e = ca(e)
                var h = ba(5),
                  f = ca(h)
                ba = ba(9)
                ba = ca(ba)
                var x = (function (f) {
                  function e() {
                    z(this, e)
                    return w(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
                  }
                  y(e, f)
                  r(e, null, [
                    {
                      key: "create",
                      value: function (f) {
                        var h = n(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(
                          this,
                          f
                        )
                        "string" === typeof f &&
                          (window.katex.render(f, h, { throwOnError: !1, errorColor: "#f00" }),
                          h.setAttribute("data-value", f))
                        return h
                      },
                    },
                    {
                      key: "value",
                      value: function (f) {
                        return f.getAttribute("data-value")
                      },
                    },
                  ])
                  return e
                })(e.default)
                x.blotName = "formula"
                x.className = "ql-formula"
                x.tagName = "SPAN"
                ba = (function (e) {
                  function h() {
                    z(this, h)
                    var f = w(this, (h.__proto__ || Object.getPrototypeOf(h)).call(this))
                    if (null == window.katex) throw Error("Formula module requires KaTeX.")
                    return f
                  }
                  y(h, e)
                  r(h, null, [
                    {
                      key: "register",
                      value: function () {
                        f.default.register(x, !0)
                      },
                    },
                  ])
                  return h
                })(ba.default)
                aa.FormulaBlot = x
                aa.default = ba
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e) {
                  if (!(f instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                function w(f, e) {
                  if (!f)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ("object" !== typeof e && "function" !== typeof e) ? f : e
                }
                function y(f, e) {
                  if ("function" !== typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof e
                    )
                  f.prototype = Object.create(e && e.prototype, {
                    constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : (f.__proto__ = e))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.default = aa.CodeToken = aa.CodeBlock = void 0
                var r = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })(),
                  n = function la(f, e, h) {
                    null === f && (f = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(f, e)
                    if (void 0 === n) {
                      if (((f = Object.getPrototypeOf(f)), null !== f)) return la(f, e, h)
                    } else {
                      if ("value" in n) return n.value
                      e = n.get
                      return void 0 === e ? void 0 : e.call(h)
                    }
                  }
                e = ba(0)
                e = ca(e)
                var h = ba(5),
                  f = ca(h)
                h = ba(9)
                h = ca(h)
                ba = ba(13)
                var x = (function (f) {
                  function e() {
                    z(this, e)
                    return w(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
                  }
                  y(e, f)
                  r(e, [
                    {
                      key: "replaceWith",
                      value: function (f) {
                        this.domNode.textContent = this.domNode.textContent
                        this.attach()
                        n(
                          e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                          "replaceWith",
                          this
                        ).call(this, f)
                      },
                    },
                    {
                      key: "highlight",
                      value: function (f) {
                        var e = this.domNode.textContent
                        if (this.cachedText !== e) {
                          if (0 < e.trim().length || null == this.cachedText)
                            (this.domNode.innerHTML = f(e)), this.domNode.normalize(), this.attach()
                          this.cachedText = e
                        }
                      },
                    },
                  ])
                  return e
                })(ca(ba).default)
                x.className = "ql-syntax"
                var ea = new e.default.Attributor.Class("token", "hljs", {
                  scope: e.default.Scope.INLINE,
                })
                ba = (function (e) {
                  function h(e, n) {
                    z(this, h)
                    var r = w(this, (h.__proto__ || Object.getPrototypeOf(h)).call(this, e, n))
                    if ("function" !== typeof r.options.highlight)
                      throw Error(
                        "Syntax module requires highlight.js. Please include the library on the page before Quill."
                      )
                    var x = null
                    r.quill.on(f.default.events.SCROLL_OPTIMIZE, function () {
                      clearTimeout(x)
                      x = setTimeout(function () {
                        r.highlight()
                        x = null
                      }, r.options.interval)
                    })
                    r.highlight()
                    return r
                  }
                  y(h, e)
                  r(h, null, [
                    {
                      key: "register",
                      value: function () {
                        f.default.register(ea, !0)
                        f.default.register(x, !0)
                      },
                    },
                  ])
                  r(h, [
                    {
                      key: "highlight",
                      value: function () {
                        var e = this
                        if (!this.quill.selection.composing) {
                          this.quill.update(f.default.sources.USER)
                          var h = this.quill.getSelection()
                          this.quill.scroll.descendants(x).forEach(function (f) {
                            f.highlight(e.options.highlight)
                          })
                          this.quill.update(f.default.sources.SILENT)
                          null != h && this.quill.setSelection(h, f.default.sources.SILENT)
                        }
                      },
                    },
                  ])
                  return h
                })(h.default)
                ba.DEFAULTS = {
                  highlight: (function () {
                    return null == window.hljs
                      ? null
                      : function (f) {
                          return window.hljs.highlightAuto(f).value
                        }
                  })(),
                  interval: 1e3,
                }
                aa.CodeBlock = x
                aa.CodeToken = ea
                aa.default = ba
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <g class="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points="5.5 13 9 5 12.5 13"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <rect class="ql-fill ql-stroke" height=3 width=3 x=4 y=5></rect> <rect class="ql-fill ql-stroke" height=3 width=3 x=11 y=5></rect> <path class="ql-even ql-fill ql-stroke" d=M7,8c0,4.031-3,5-3,5></path> <path class="ql-even ql-fill ql-stroke" d=M14,8c0,4.031-3,5-3,5></path> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <line class="ql-color-label ql-stroke ql-transparent" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points="5.5 11 9 3 12.5 11"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon> <line class="ql-stroke ql-fill" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon> <line class="ql-stroke ql-fill" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform="translate(24 18) rotate(-180)"/> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="5 7 5 11 3 9 5 7"></polyline> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class="ql-even ql-stroke" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class="ql-even ql-stroke" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class="ql-stroke ql-thin" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class="ql-stroke ql-thin" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class="ql-stroke ql-thin" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points="3 4 4 5 6 3"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points="3 14 4 15 6 13"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="3 9 4 10 6 8"></polyline> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <line class="ql-stroke ql-thin" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>'
              },
              function (e) {
                e.exports =
                  '<svg viewbox="0 0 18 18"> <polygon class=ql-stroke points="7 11 9 13 11 11 7 11"></polygon> <polygon class=ql-stroke points="7 7 9 5 11 7 7 7"></polygon> </svg>'
              },
              function (e, aa, ba) {
                function ca(f) {
                  return f && f.__esModule ? f : { default: f }
                }
                function z(f, e) {
                  if (!(f instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                function w(f, e) {
                  if (!f)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ("object" !== typeof e && "function" !== typeof e) ? f : e
                }
                function y(f, e) {
                  if ("function" !== typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " + typeof e
                    )
                  f.prototype = Object.create(e && e.prototype, {
                    constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 },
                  })
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : (f.__proto__ = e))
                }
                Object.defineProperty(aa, "__esModule", { value: !0 })
                aa.default = aa.BubbleTooltip = void 0
                var r = function ya(f, e, h) {
                    null === f && (f = Function.prototype)
                    var n = Object.getOwnPropertyDescriptor(f, e)
                    if (void 0 === n) {
                      if (((f = Object.getPrototypeOf(f)), null !== f)) return ya(f, e, h)
                    } else {
                      if ("value" in n) return n.value
                      e = n.get
                      return void 0 === e ? void 0 : e.call(h)
                    }
                  },
                  n = (function () {
                    function f(f, e) {
                      for (var h = 0; h < e.length; h++) {
                        var n = e[h]
                        n.enumerable = n.enumerable || !1
                        n.configurable = !0
                        "value" in n && (n.writable = !0)
                        Object.defineProperty(f, n.key, n)
                      }
                    }
                    return function (e, h, n) {
                      h && f(e.prototype, h)
                      n && f(e, n)
                      return e
                    }
                  })()
                e = ba(3)
                e = ca(e)
                var h = ba(8),
                  f = ca(h)
                h = ba(43)
                var x = ca(h),
                  ea = ba(15)
                ba = ba(41)
                var da = ca(ba),
                  ha = [
                    ["bold", "italic", "link"],
                    [{ header: 1 }, { header: 2 }, "blockquote"],
                  ]
                ba = (function (f) {
                  function e(f, h) {
                    z(this, e)
                    null != h.modules.toolbar &&
                      null == h.modules.toolbar.container &&
                      (h.modules.toolbar.container = ha)
                    f = w(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, f, h))
                    f.quill.container.classList.add("ql-bubble")
                    return f
                  }
                  y(e, f)
                  n(e, [
                    {
                      key: "extendToolbar",
                      value: function (f) {
                        this.tooltip = new ia(this.quill, this.options.bounds)
                        this.tooltip.root.appendChild(f.container)
                        this.buildButtons(
                          [].slice.call(f.container.querySelectorAll("button")),
                          da.default
                        )
                        this.buildPickers(
                          [].slice.call(f.container.querySelectorAll("select")),
                          da.default
                        )
                      },
                    },
                  ])
                  return e
                })(x.default)
                ba.DEFAULTS = (0, e.default)(!0, {}, x.default.DEFAULTS, {
                  modules: {
                    toolbar: {
                      handlers: {
                        link: function (f) {
                          f ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1)
                        },
                      },
                    },
                  },
                })
                var ia = (function (e) {
                  function h(e, n) {
                    z(this, h)
                    var r = w(this, (h.__proto__ || Object.getPrototypeOf(h)).call(this, e, n))
                    r.quill.on(f.default.events.EDITOR_CHANGE, function (e, h, n, w) {
                      e === f.default.events.SELECTION_CHANGE &&
                        (null != h && 0 < h.length && w === f.default.sources.USER
                          ? (r.show(),
                            (r.root.style.left = "0px"),
                            (r.root.style.width = ""),
                            (r.root.style.width = r.root.offsetWidth + "px"),
                            (e = r.quill.getLines(h.index, h.length)),
                            1 === e.length
                              ? r.position(r.quill.getBounds(h))
                              : ((n = e[e.length - 1]),
                                (e = r.quill.getIndex(n)),
                                (h = Math.min(n.length() - 1, h.index + h.length - e)),
                                (h = r.quill.getBounds(new ea.Range(e, h))),
                                r.position(h)))
                          : document.activeElement !== r.textbox && r.quill.hasFocus() && r.hide())
                    })
                    return r
                  }
                  y(h, e)
                  n(h, [
                    {
                      key: "listen",
                      value: function () {
                        var e = this
                        r(
                          h.prototype.__proto__ || Object.getPrototypeOf(h.prototype),
                          "listen",
                          this
                        ).call(this)
                        this.root.querySelector(".ql-close").addEventListener("click", function () {
                          e.root.classList.remove("ql-editing")
                        })
                        this.quill.on(f.default.events.SCROLL_OPTIMIZE, function () {
                          setTimeout(function () {
                            if (!e.root.classList.contains("ql-hidden")) {
                              var f = e.quill.getSelection()
                              null != f && e.position(e.quill.getBounds(f))
                            }
                          }, 1)
                        })
                      },
                    },
                    {
                      key: "cancel",
                      value: function () {
                        this.show()
                      },
                    },
                    {
                      key: "position",
                      value: function (f) {
                        f = r(
                          h.prototype.__proto__ || Object.getPrototypeOf(h.prototype),
                          "position",
                          this
                        ).call(this, f)
                        var e = this.root.querySelector(".ql-tooltip-arrow")
                        e.style.marginLeft = ""
                        if (0 === f) return f
                        e.style.marginLeft = -1 * f - e.offsetWidth / 2 + "px"
                      },
                    },
                  ])
                  return h
                })(h.BaseTooltip)
                ia.TEMPLATE =
                  '<span class="ql-tooltip-arrow"></span><div class="ql-tooltip-editor"><input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL"><a class="ql-close"></a></div>'
                aa.BubbleTooltip = ia
                aa.default = ba
              },
              function (e, aa, ba) {
                e.exports = ba(63)
              },
            ])["default"]
          })
        }.call(this, e(403).Buffer))
      },
    },
  ])
}.call(this || window))
