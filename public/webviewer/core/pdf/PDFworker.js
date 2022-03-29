;(function () {
  /*
 *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
*****************************************************************************/
  var $jscomp = $jscomp || {}
  $jscomp.scope = {}
  $jscomp.arrayIteratorImpl = function (e) {
    var n = 0
    return function () {
      return n < e.length ? { done: !1, value: e[n++] } : { done: !0 }
    }
  }
  $jscomp.arrayIterator = function (e) {
    return { next: $jscomp.arrayIteratorImpl(e) }
  }
  $jscomp.makeIterator = function (e) {
    var n = "undefined" != typeof Symbol && Symbol.iterator && e[Symbol.iterator]
    return n ? n.call(e) : $jscomp.arrayIterator(e)
  }
  $jscomp.getGlobal = function (e) {
    return "undefined" != typeof window && window === e
      ? e
      : "undefined" != typeof global && null != global
      ? global
      : e
  }
  $jscomp.global = $jscomp.getGlobal(this)
  $jscomp.ASSUME_ES5 = !1
  $jscomp.ASSUME_NO_NATIVE_MAP = !1
  $jscomp.ASSUME_NO_NATIVE_SET = !1
  $jscomp.SIMPLE_FROUND_POLYFILL = !1
  $jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
      ? Object.defineProperty
      : function (e, n, g) {
          e != Array.prototype && e != Object.prototype && (e[n] = g.value)
        }
  $jscomp.polyfill = function (e, n, g, d) {
    if (n) {
      g = $jscomp.global
      e = e.split(".")
      for (d = 0; d < e.length - 1; d++) {
        var m = e[d]
        m in g || (g[m] = {})
        g = g[m]
      }
      e = e[e.length - 1]
      d = g[e]
      n = n(d)
      n != d &&
        null != n &&
        $jscomp.defineProperty(g, e, { configurable: !0, writable: !0, value: n })
    }
  }
  $jscomp.FORCE_POLYFILL_PROMISE = !1
  $jscomp.polyfill(
    "Promise",
    function (e) {
      function n() {
        this.batch_ = null
      }
      function g(c) {
        return c instanceof m
          ? c
          : new m(function (a, b) {
              a(c)
            })
      }
      if (e && !$jscomp.FORCE_POLYFILL_PROMISE) return e
      n.prototype.asyncExecute = function (c) {
        null == this.batch_ && ((this.batch_ = []), this.asyncExecuteBatch_())
        this.batch_.push(c)
        return this
      }
      n.prototype.asyncExecuteBatch_ = function () {
        var c = this
        this.asyncExecuteFunction(function () {
          c.executeBatch_()
        })
      }
      var d = $jscomp.global.setTimeout
      n.prototype.asyncExecuteFunction = function (c) {
        d(c, 0)
      }
      n.prototype.executeBatch_ = function () {
        for (; this.batch_ && this.batch_.length; ) {
          var c = this.batch_
          this.batch_ = []
          for (var a = 0; a < c.length; ++a) {
            var b = c[a]
            c[a] = null
            try {
              b()
            } catch (h) {
              this.asyncThrow_(h)
            }
          }
        }
        this.batch_ = null
      }
      n.prototype.asyncThrow_ = function (c) {
        this.asyncExecuteFunction(function () {
          throw c
        })
      }
      var m = function (c) {
        this.state_ = 0
        this.result_ = void 0
        this.onSettledCallbacks_ = []
        var a = this.createResolveAndReject_()
        try {
          c(a.resolve, a.reject)
        } catch (b) {
          a.reject(b)
        }
      }
      m.prototype.createResolveAndReject_ = function () {
        function c(h) {
          return function (c) {
            b || ((b = !0), h.call(a, c))
          }
        }
        var a = this,
          b = !1
        return { resolve: c(this.resolveTo_), reject: c(this.reject_) }
      }
      m.prototype.resolveTo_ = function (c) {
        if (c === this) this.reject_(new TypeError("A Promise cannot resolve to itself"))
        else if (c instanceof m) this.settleSameAsPromise_(c)
        else {
          a: switch (typeof c) {
            case "object":
              var a = null != c
              break a
            case "function":
              a = !0
              break a
            default:
              a = !1
          }
          a ? this.resolveToNonPromiseObj_(c) : this.fulfill_(c)
        }
      }
      m.prototype.resolveToNonPromiseObj_ = function (c) {
        var a = void 0
        try {
          a = c.then
        } catch (b) {
          this.reject_(b)
          return
        }
        "function" == typeof a ? this.settleSameAsThenable_(a, c) : this.fulfill_(c)
      }
      m.prototype.reject_ = function (c) {
        this.settle_(2, c)
      }
      m.prototype.fulfill_ = function (c) {
        this.settle_(1, c)
      }
      m.prototype.settle_ = function (c, a) {
        if (0 != this.state_)
          throw Error(
            "Cannot settle(" + c + ", " + a + "): Promise already settled in state" + this.state_
          )
        this.state_ = c
        this.result_ = a
        this.executeOnSettledCallbacks_()
      }
      m.prototype.executeOnSettledCallbacks_ = function () {
        if (null != this.onSettledCallbacks_) {
          for (var d = 0; d < this.onSettledCallbacks_.length; ++d)
            c.asyncExecute(this.onSettledCallbacks_[d])
          this.onSettledCallbacks_ = null
        }
      }
      var c = new n()
      m.prototype.settleSameAsPromise_ = function (c) {
        var a = this.createResolveAndReject_()
        c.callWhenSettled_(a.resolve, a.reject)
      }
      m.prototype.settleSameAsThenable_ = function (c, a) {
        var b = this.createResolveAndReject_()
        try {
          c.call(a, b.resolve, b.reject)
        } catch (h) {
          b.reject(h)
        }
      }
      m.prototype.then = function (c, a) {
        function b(a, b) {
          return "function" == typeof a
            ? function (b) {
                try {
                  h(a(b))
                } catch (t) {
                  v(t)
                }
              }
            : b
        }
        var h,
          v,
          d = new m(function (a, b) {
            h = a
            v = b
          })
        this.callWhenSettled_(b(c, h), b(a, v))
        return d
      }
      m.prototype.catch = function (c) {
        return this.then(void 0, c)
      }
      m.prototype.callWhenSettled_ = function (d, a) {
        function b() {
          switch (h.state_) {
            case 1:
              d(h.result_)
              break
            case 2:
              a(h.result_)
              break
            default:
              throw Error("Unexpected state: " + h.state_)
          }
        }
        var h = this
        null == this.onSettledCallbacks_ ? c.asyncExecute(b) : this.onSettledCallbacks_.push(b)
      }
      m.resolve = g
      m.reject = function (c) {
        return new m(function (a, b) {
          b(c)
        })
      }
      m.race = function (c) {
        return new m(function (a, b) {
          for (var h = $jscomp.makeIterator(c), v = h.next(); !v.done; v = h.next())
            g(v.value).callWhenSettled_(a, b)
        })
      }
      m.all = function (c) {
        var a = $jscomp.makeIterator(c),
          b = a.next()
        return b.done
          ? g([])
          : new m(function (h, c) {
              function v(a) {
                return function (b) {
                  p[a] = b
                  d--
                  0 == d && h(p)
                }
              }
              var p = [],
                d = 0
              do
                p.push(void 0), d++, g(b.value).callWhenSettled_(v(p.length - 1), c), (b = a.next())
              while (!b.done)
            })
      }
      return m
    },
    "es6",
    "es3"
  )
  $jscomp.checkStringArgs = function (e, n, g) {
    if (null == e)
      throw new TypeError(
        "The 'this' value for String.prototype." + g + " must not be null or undefined"
      )
    if (n instanceof RegExp)
      throw new TypeError(
        "First argument to String.prototype." + g + " must not be a regular expression"
      )
    return e + ""
  }
  $jscomp.polyfill(
    "String.prototype.endsWith",
    function (e) {
      return e
        ? e
        : function (e, g) {
            var d = $jscomp.checkStringArgs(this, e, "endsWith")
            e += ""
            void 0 === g && (g = d.length)
            g = Math.max(0, Math.min(g | 0, d.length))
            for (var m = e.length; 0 < m && 0 < g; ) if (d[--g] != e[--m]) return !1
            return 0 >= m
          }
    },
    "es6",
    "es3"
  )
  $jscomp.checkEs6ConformanceViaProxy = function () {
    try {
      var e = {},
        n = Object.create(
          new $jscomp.global.Proxy(e, {
            get: function (g, d, m) {
              return g == e && "q" == d && m == n
            },
          })
        )
      return !0 === n.q
    } catch (g) {
      return !1
    }
  }
  $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1
  $jscomp.ES6_CONFORMANCE =
    $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy()
  $jscomp.SYMBOL_PREFIX = "jscomp_symbol_"
  $jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {}
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
  }
  $jscomp.Symbol = (function () {
    var e = 0
    return function (n) {
      return $jscomp.SYMBOL_PREFIX + (n || "") + e++
    }
  })()
  $jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol()
    var e = $jscomp.global.Symbol.iterator
    e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"))
    "function" != typeof Array.prototype[e] &&
      $jscomp.defineProperty(Array.prototype, e, {
        configurable: !0,
        writable: !0,
        value: function () {
          return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
        },
      })
    $jscomp.initSymbolIterator = function () {}
  }
  $jscomp.initSymbolAsyncIterator = function () {
    $jscomp.initSymbol()
    var e = $jscomp.global.Symbol.asyncIterator
    e || (e = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"))
    $jscomp.initSymbolAsyncIterator = function () {}
  }
  $jscomp.iteratorPrototype = function (e) {
    $jscomp.initSymbolIterator()
    e = { next: e }
    e[$jscomp.global.Symbol.iterator] = function () {
      return this
    }
    return e
  }
  $jscomp.owns = function (e, n) {
    return Object.prototype.hasOwnProperty.call(e, n)
  }
  $jscomp.polyfill(
    "WeakMap",
    function (e) {
      function n() {
        if (!e || !Object.seal) return !1
        try {
          var a = Object.seal({}),
            h = Object.seal({}),
            c = new e([
              [a, 2],
              [h, 3],
            ])
          if (2 != c.get(a) || 3 != c.get(h)) return !1
          c.delete(a)
          c.set(h, 4)
          return !c.has(a) && 4 == c.get(h)
        } catch (y) {
          return !1
        }
      }
      function g() {}
      function d(a) {
        if (!$jscomp.owns(a, c)) {
          var b = new g()
          $jscomp.defineProperty(a, c, { value: b })
        }
      }
      function m(a) {
        var b = Object[a]
        b &&
          (Object[a] = function (a) {
            if (a instanceof g) return a
            d(a)
            return b(a)
          })
      }
      if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (e && $jscomp.ES6_CONFORMANCE) return e
      } else if (n()) return e
      var c = "$jscomp_hidden_" + Math.random()
      m("freeze")
      m("preventExtensions")
      m("seal")
      var r = 0,
        a = function (a) {
          this.id_ = (r += Math.random() + 1).toString()
          if (a) {
            a = $jscomp.makeIterator(a)
            for (var b; !(b = a.next()).done; ) (b = b.value), this.set(b[0], b[1])
          }
        }
      a.prototype.set = function (a, h) {
        d(a)
        if (!$jscomp.owns(a, c)) throw Error("WeakMap key fail: " + a)
        a[c][this.id_] = h
        return this
      }
      a.prototype.get = function (a) {
        return $jscomp.owns(a, c) ? a[c][this.id_] : void 0
      }
      a.prototype.has = function (a) {
        return $jscomp.owns(a, c) && $jscomp.owns(a[c], this.id_)
      }
      a.prototype.delete = function (a) {
        return $jscomp.owns(a, c) && $jscomp.owns(a[c], this.id_) ? delete a[c][this.id_] : !1
      }
      return a
    },
    "es6",
    "es3"
  )
  $jscomp.MapEntry = function () {}
  $jscomp.polyfill(
    "Map",
    function (e) {
      function n() {
        if (
          $jscomp.ASSUME_NO_NATIVE_MAP ||
          !e ||
          "function" != typeof e ||
          !e.prototype.entries ||
          "function" != typeof Object.seal
        )
          return !1
        try {
          var a = Object.seal({ x: 4 }),
            h = new e($jscomp.makeIterator([[a, "s"]]))
          if (
            "s" != h.get(a) ||
            1 != h.size ||
            h.get({ x: 4 }) ||
            h.set({ x: 4 }, "t") != h ||
            2 != h.size
          )
            return !1
          var c = h.entries(),
            d = c.next()
          if (d.done || d.value[0] != a || "s" != d.value[1]) return !1
          d = c.next()
          return d.done || 4 != d.value[0].x || "t" != d.value[1] || !c.next().done ? !1 : !0
        } catch (p) {
          return !1
        }
      }
      if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (e && $jscomp.ES6_CONFORMANCE) return e
      } else if (n()) return e
      $jscomp.initSymbolIterator()
      var g = new WeakMap(),
        d = function (a) {
          this.data_ = {}
          this.head_ = r()
          this.size = 0
          if (a) {
            a = $jscomp.makeIterator(a)
            for (var b; !(b = a.next()).done; ) (b = b.value), this.set(b[0], b[1])
          }
        }
      d.prototype.set = function (a, c) {
        a = 0 === a ? 0 : a
        var b = m(this, a)
        b.list || (b.list = this.data_[b.id] = [])
        b.entry
          ? (b.entry.value = c)
          : ((b.entry = {
              next: this.head_,
              previous: this.head_.previous,
              head: this.head_,
              key: a,
              value: c,
            }),
            b.list.push(b.entry),
            (this.head_.previous.next = b.entry),
            (this.head_.previous = b.entry),
            this.size++)
        return this
      }
      d.prototype.delete = function (a) {
        a = m(this, a)
        return a.entry && a.list
          ? (a.list.splice(a.index, 1),
            a.list.length || delete this.data_[a.id],
            (a.entry.previous.next = a.entry.next),
            (a.entry.next.previous = a.entry.previous),
            (a.entry.head = null),
            this.size--,
            !0)
          : !1
      }
      d.prototype.clear = function () {
        this.data_ = {}
        this.head_ = this.head_.previous = r()
        this.size = 0
      }
      d.prototype.has = function (a) {
        return !!m(this, a).entry
      }
      d.prototype.get = function (a) {
        return (a = m(this, a).entry) && a.value
      }
      d.prototype.entries = function () {
        return c(this, function (a) {
          return [a.key, a.value]
        })
      }
      d.prototype.keys = function () {
        return c(this, function (a) {
          return a.key
        })
      }
      d.prototype.values = function () {
        return c(this, function (a) {
          return a.value
        })
      }
      d.prototype.forEach = function (a, c) {
        for (var b = this.entries(), h; !(h = b.next()).done; )
          (h = h.value), a.call(c, h[1], h[0], this)
      }
      d.prototype[Symbol.iterator] = d.prototype.entries
      var m = function (b, c) {
          var h = c && typeof c
          "object" == h || "function" == h
            ? g.has(c)
              ? (h = g.get(c))
              : ((h = "" + ++a), g.set(c, h))
            : (h = "p_" + c)
          var d = b.data_[h]
          if (d && $jscomp.owns(b.data_, h))
            for (b = 0; b < d.length; b++) {
              var p = d[b]
              if ((c !== c && p.key !== p.key) || c === p.key)
                return { id: h, list: d, index: b, entry: p }
            }
          return { id: h, list: d, index: -1, entry: void 0 }
        },
        c = function (a, c) {
          var b = a.head_
          return $jscomp.iteratorPrototype(function () {
            if (b) {
              for (; b.head != a.head_; ) b = b.previous
              for (; b.next != b.head; ) return (b = b.next), { done: !1, value: c(b) }
              b = null
            }
            return { done: !0, value: void 0 }
          })
        },
        r = function () {
          var a = {}
          return (a.previous = a.next = a.head = a)
        },
        a = 0
      return d
    },
    "es6",
    "es3"
  )
  $jscomp.findInternal = function (e, n, g) {
    e instanceof String && (e = String(e))
    for (var d = e.length, m = 0; m < d; m++) {
      var c = e[m]
      if (n.call(g, c, m, e)) return { i: m, v: c }
    }
    return { i: -1, v: void 0 }
  }
  $jscomp.polyfill(
    "Array.prototype.find",
    function (e) {
      return e
        ? e
        : function (e, g) {
            return $jscomp.findInternal(this, e, g).v
          }
    },
    "es6",
    "es3"
  )
  $jscomp.underscoreProtoCanBeSet = function () {
    var e = { a: !0 },
      n = {}
    try {
      return (n.__proto__ = e), n.a
    } catch (g) {}
    return !1
  }
  $jscomp.setPrototypeOf =
    "function" == typeof Object.setPrototypeOf
      ? Object.setPrototypeOf
      : $jscomp.underscoreProtoCanBeSet()
      ? function (e, n) {
          e.__proto__ = n
          if (e.__proto__ !== n) throw new TypeError(e + " is not extensible")
          return e
        }
      : null
  $jscomp.polyfill(
    "Object.setPrototypeOf",
    function (e) {
      return e || $jscomp.setPrototypeOf
    },
    "es6",
    "es5"
  )
  $jscomp.assign =
    "function" == typeof Object.assign
      ? Object.assign
      : function (e, n) {
          for (var g = 1; g < arguments.length; g++) {
            var d = arguments[g]
            if (d) for (var m in d) $jscomp.owns(d, m) && (e[m] = d[m])
          }
          return e
        }
  $jscomp.polyfill(
    "Object.assign",
    function (e) {
      return e || $jscomp.assign
    },
    "es6",
    "es3"
  )
  $jscomp.polyfill(
    "Set",
    function (e) {
      function n() {
        if (
          $jscomp.ASSUME_NO_NATIVE_SET ||
          !e ||
          "function" != typeof e ||
          !e.prototype.entries ||
          "function" != typeof Object.seal
        )
          return !1
        try {
          var d = Object.seal({ x: 4 }),
            m = new e($jscomp.makeIterator([d]))
          if (
            !m.has(d) ||
            1 != m.size ||
            m.add(d) != m ||
            1 != m.size ||
            m.add({ x: 4 }) != m ||
            2 != m.size
          )
            return !1
          var c = m.entries(),
            g = c.next()
          if (g.done || g.value[0] != d || g.value[1] != d) return !1
          g = c.next()
          return g.done || g.value[0] == d || 4 != g.value[0].x || g.value[1] != g.value[0]
            ? !1
            : c.next().done
        } catch (a) {
          return !1
        }
      }
      if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (e && $jscomp.ES6_CONFORMANCE) return e
      } else if (n()) return e
      $jscomp.initSymbolIterator()
      var g = function (d) {
        this.map_ = new Map()
        if (d) {
          d = $jscomp.makeIterator(d)
          for (var m; !(m = d.next()).done; ) this.add(m.value)
        }
        this.size = this.map_.size
      }
      g.prototype.add = function (d) {
        d = 0 === d ? 0 : d
        this.map_.set(d, d)
        this.size = this.map_.size
        return this
      }
      g.prototype.delete = function (d) {
        d = this.map_.delete(d)
        this.size = this.map_.size
        return d
      }
      g.prototype.clear = function () {
        this.map_.clear()
        this.size = 0
      }
      g.prototype.has = function (d) {
        return this.map_.has(d)
      }
      g.prototype.entries = function () {
        return this.map_.entries()
      }
      g.prototype.values = function () {
        return this.map_.values()
      }
      g.prototype.keys = g.prototype.values
      g.prototype[Symbol.iterator] = g.prototype.values
      g.prototype.forEach = function (d, m) {
        var c = this
        this.map_.forEach(function (e) {
          return d.call(m, e, e, c)
        })
      }
      return g
    },
    "es6",
    "es3"
  )
  $jscomp.iteratorFromArray = function (e, n) {
    $jscomp.initSymbolIterator()
    e instanceof String && (e += "")
    var g = 0,
      d = {
        next: function () {
          if (g < e.length) {
            var m = g++
            return { value: n(m, e[m]), done: !1 }
          }
          d.next = function () {
            return { done: !0, value: void 0 }
          }
          return d.next()
        },
      }
    d[Symbol.iterator] = function () {
      return d
    }
    return d
  }
  $jscomp.polyfill(
    "Array.prototype.keys",
    function (e) {
      return e
        ? e
        : function () {
            return $jscomp.iteratorFromArray(this, function (e) {
              return e
            })
          }
    },
    "es6",
    "es3"
  )
  ;(function (e) {
    function n(d) {
      if (g[d]) return g[d].exports
      var m = (g[d] = { i: d, l: !1, exports: {} })
      e[d].call(m.exports, m, m.exports, n)
      m.l = !0
      return m.exports
    }
    var g = {}
    n.m = e
    n.c = g
    n.d = function (d, m, c) {
      n.o(d, m) || Object.defineProperty(d, m, { enumerable: !0, get: c })
    }
    n.r = function (d) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(d, Symbol.toStringTag, { value: "Module" })
      Object.defineProperty(d, "__esModule", { value: !0 })
    }
    n.t = function (d, m) {
      m & 1 && (d = n(d))
      if (m & 8 || (m & 4 && "object" === typeof d && d && d.__esModule)) return d
      var c = Object.create(null)
      n.r(c)
      Object.defineProperty(c, "default", { enumerable: !0, value: d })
      if (m & 2 && "string" != typeof d)
        for (var e in d)
          n.d(
            c,
            e,
            function (a) {
              return d[a]
            }.bind(null, e)
          )
      return c
    }
    n.n = function (d) {
      var m =
        d && d.__esModule
          ? function () {
              return d["default"]
            }
          : function () {
              return d
            }
      n.d(m, "a", m)
      return m
    }
    n.o = function (d, m) {
      return Object.prototype.hasOwnProperty.call(d, m)
    }
    n.p = "/core/pdf/"
    return n((n.s = 18))
  })([
    function (e, n, g) {
      g.d(n, "d", function () {
        return r
      })
      g.d(n, "e", function () {
        return m
      })
      g.d(n, "c", function () {
        return a
      })
      g.d(n, "a", function () {
        return b
      })
      g.d(n, "b", function () {
        return c
      })
      var d = g(3),
        m = function (a, b) {
          Object(d.a)("disableLogs") || (b ? console.warn(a + ": " + b) : console.warn(a))
        },
        c = function (a, b, c) {
          var h = c.pop()
          c = c.length ? c.join(", ") + " and " + h : h
          m("'" + b + "' is deprecated since version " + a + ". Please use " + c + " instead.")
        },
        r = function (a, b) {
          Object(d.a)("disableLogs") || (b ? console.log(a + ": " + b) : console.log(a))
        },
        a = function (a) {
          if (!Object(d.a)("disableLogs")) throw (console.error(a), Error(a))
        },
        b = function (a, b) {}
    },
    function (e, n, g) {
      g.d(n, "c", function () {
        return b
      })
      g.d(n, "a", function () {
        return h
      })
      g.d(n, "b", function () {
        return v
      })
      g.d(n, "d", function () {
        return y
      })
      var d = g(15),
        m = console.log,
        c = console.warn,
        r = console.error,
        a = function (a) {
          void 0 === a && (a = !0)
          a
            ? ((console.log = function () {}),
              (console.warn = function () {}),
              (console.error = function () {}))
            : ((console.log = m), (console.warn = c), (console.error = r))
        },
        b = function () {
          var b = Object(d.a)(location.search)
          a("1" === b.disableLogs)
        },
        h = function (b) {
          b.on("disableLogs", function (b) {
            a(b.disabled)
          })
        },
        v = function (a, b) {
          return function () {}
        },
        y = function (a, b) {
          b ? console.warn(a + ": " + b) : console.warn(a)
        }
    },
    function (e, n, g) {
      g.d(n, "a", function () {
        return w
      })
      g.d(n, "b", function () {
        return l
      })
      g.d(n, "c", function () {
        return f
      })
      var d = g(12),
        m = g(0),
        c = g(8),
        r = g(4),
        a = "undefined" === typeof window ? self : window,
        b = a.importScripts,
        h = !1,
        v = function (k, f) {
          h || (b(a.basePath + "decode.min.js"), (h = !0))
          k = self.BrotliDecode(Object(r.b)(k))
          return f ? k : Object(r.a)(k)
        },
        y = function (k, f) {
          return Object(d.a)(void 0, void 0, Promise, function () {
            var l
            return Object(d.b)(this, function (a) {
              switch (a.label) {
                case 0:
                  return h
                    ? [3, 2]
                    : [
                        4,
                        Object(c.a)(
                          self.Core.getWorkerPath() + "external/decode.min.js",
                          "Failed to download decode.min.js",
                          window
                        ),
                      ]
                case 1:
                  a.sent(), (h = !0), (a.label = 2)
                case 2:
                  return (l = self.BrotliDecode(Object(r.b)(k))), [2, f ? l : Object(r.a)(l)]
              }
            })
          })
        }
      ;(function () {
        function k() {
          this.remainingDataArrays = []
        }
        k.prototype.processRaw = function (k) {
          return k
        }
        k.prototype.processBrotli = function (k) {
          this.remainingDataArrays.push(k)
          return null
        }
        k.prototype.GetNextChunk = function (k) {
          this.decodeFunction ||
            (this.decodeFunction =
              0 === k[0] && 97 === k[1] && 115 === k[2] && 109 === k[3]
                ? this.processRaw
                : this.processBrotli)
          return this.decodeFunction(k)
        }
        k.prototype.End = function () {
          if (this.remainingDataArrays.length) {
            for (var k = this.arrays, f = 0, l = 0; l < k.length; ++l) f += k[l].length
            f = new Uint8Array(f)
            var a = 0
            for (l = 0; l < k.length; ++l) {
              var b = k[l]
              f.set(b, a)
              a += b.length
            }
            return v(f, !0)
          }
          return null
        }
        return k
      })()
      var p = !1,
        u = function (k) {
          p || (b(a.basePath + "pako_inflate.min.js"), (p = !0))
          var f = 10
          if ("string" === typeof k) {
            if (k.charCodeAt(3) & 8) {
              for (; 0 !== k.charCodeAt(f); ++f);
              ++f
            }
          } else if (k[3] & 8) {
            for (; 0 !== k[f]; ++f);
            ++f
          }
          k = Object(r.b)(k)
          k = k.subarray(f, k.length - 8)
          return a.pako.inflate(k, { windowBits: -15 })
        },
        z = function (k, f) {
          return f ? k : Object(r.a)(k)
        },
        t = function (k) {
          var f = !k.shouldOutputArray,
            l = new XMLHttpRequest()
          l.open("GET", k.url, k.isAsync)
          var a = f && l.overrideMimeType
          l.responseType = a ? "text" : "arraybuffer"
          a && l.overrideMimeType("text/plain; charset=x-user-defined")
          l.send()
          var c = function () {
            var c = Date.now()
            var h = a ? l.responseText : new Uint8Array(l.response)
            Object(m.a)("worker", "Result length is " + h.length)
            h.length < k.compressedMaximum
              ? ((h = k.decompressFunction(h, k.shouldOutputArray)),
                Object(m.e)(
                  "There may be some degradation of performance. Your server has not been configured to serve .gz. and .br. files with the expected Content-Encoding. See http://www.pdftron.com/kb_content_encoding for instructions on how to resolve this."
                ),
                b && Object(m.a)("worker", "Decompressed length is " + h.length))
              : f && (h = Object(r.a)(h))
            b && Object(m.a)("worker", k.url + " Decompression took " + (Date.now() - c))
            return h
          }
          if (k.isAsync)
            var h = new Promise(function (f, a) {
              l.onload = function () {
                200 === this.status || 0 === this.status ? f(c()) : a("Download Failed " + k.url)
              }
              l.onerror = function () {
                a("Network error occurred " + k.url)
              }
            })
          else {
            if (200 === l.status || 0 === l.status) return c()
            throw Error("Failed to load " + k.url)
          }
          return h
        },
        w = function (k) {
          var f = k.lastIndexOf("/")
          ;-1 === f && (f = 0)
          var l = k.slice(f).replace(".", ".br.")
          b ||
            (l.endsWith(".js.mem")
              ? (l = l.replace(".js.mem", ".mem"))
              : l.endsWith(".js") && (l = l.concat(".mem")))
          return k.slice(0, f) + l
        },
        A = function (f, l) {
          var k = f.lastIndexOf("/")
          ;-1 === k && (k = 0)
          var a = f.slice(k).replace(".", ".gz.")
          l.url = f.slice(0, k) + a
          l.decompressFunction = u
          return t(l)
        },
        q = function (f, l) {
          l.url = w(f)
          l.decompressFunction = b ? v : y
          return t(l)
        },
        B = function (f, l) {
          f.endsWith(".js.mem")
            ? (f = f.slice(0, -4))
            : f.endsWith(".mem") && (f = f.slice(0, -4) + ".js.mem")
          l.url = f
          l.decompressFunction = z
          return t(l)
        },
        J = function (f, l, a, b) {
          return f.catch(function (f) {
            Object(m.e)(f)
            return b(l, a)
          })
        },
        F = function (f, l, a) {
          var k
          if (a.isAsync) {
            var b = l[0](f, a)
            for (k = 1; k < l.length; ++k) b = J(b, f, a, l[k])
            return b
          }
          for (k = 0; k < l.length; ++k)
            try {
              return l[k](f, a)
            } catch (H) {
              Object(m.e)(H.message)
            }
          throw Error("")
        },
        f = function (f, l, a, b) {
          return F(f, [A, q, B], { compressedMaximum: l, isAsync: a, shouldOutputArray: b })
        },
        l = function (f, l, a, b) {
          return F(f, [q, A, B], { compressedMaximum: l, isAsync: a, shouldOutputArray: b })
        }
    },
    function (e, n, g) {
      g.d(n, "a", function () {
        return c
      })
      g.d(n, "b", function () {
        return r
      })
      var d = {},
        m = {
          flattenedResources: !1,
          CANVAS_CACHE_SIZE: void 0,
          maxPagesBefore: void 0,
          maxPagesAhead: void 0,
          disableLogs: !1,
          wvsQueryParameters: {},
          _trnDebugMode: !1,
          _logFiltersEnabled: null,
        },
        c = function (a) {
          return m[a]
        },
        r = function (a, b) {
          var c
          m[a] = b
          null === (c = d[a]) || void 0 === c
            ? void 0
            : c.forEach(function (a) {
                a(b)
              })
        }
    },
    function (e, n, g) {
      g.d(n, "b", function () {
        return d
      })
      g.d(n, "a", function () {
        return m
      })
      var d = function (c) {
          if ("string" === typeof c) {
            for (var d = new Uint8Array(c.length), a = c.length, b = 0; b < a; b++)
              d[b] = c.charCodeAt(b)
            return d
          }
          return c
        },
        m = function (c) {
          if ("string" !== typeof c) {
            for (var d = "", a = 0, b = c.length, h; a < b; )
              (h = c.subarray(a, a + 1024)), (a += 1024), (d += String.fromCharCode.apply(null, h))
            return d
          }
          return c
        }
    },
    function (e, n, g) {
      g.d(n, "c", function () {
        return y
      })
      g.d(n, "b", function () {
        return p
      })
      g.d(n, "a", function () {
        return u
      })
      g(0)
      var d = "undefined" === typeof window ? self : window
      e = (function () {
        var a = navigator.userAgent.toLowerCase()
        return (a = /(msie) ([\w.]+)/.exec(a) || /(trident)(?:.*? rv:([\w.]+)|)/.exec(a))
          ? parseInt(a[2], 10)
          : a
      })()
      var m = (function () {
        var a = d.navigator.userAgent.match(/OPR/),
          b = d.navigator.userAgent.match(/Maxthon/),
          c = d.navigator.userAgent.match(/Edge/)
        return d.navigator.userAgent.match(/Chrome\/(.*?) /) && !a && !b && !c
      })()
      ;(function () {
        if (!m) return null
        var a = d.navigator.userAgent.match(/Chrome\/([0-9]+)\./)
        return a ? parseInt(a[1], 10) : a
      })()
      var c =
        !!navigator.userAgent.match(/Edge/i) ||
        (navigator.userAgent.match(/Edg\/(.*?)/) && d.navigator.userAgent.match(/Chrome\/(.*?) /))
      ;(function () {
        if (!c) return null
        var a = d.navigator.userAgent.match(/Edg\/([0-9]+)\./)
        return a ? parseInt(a[1], 10) : a
      })()
      n =
        /iPad|iPhone|iPod/.test(d.navigator.platform) ||
        ("MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints)
      var r = (function () {
          var a = d.navigator.userAgent.match(/.*\/([0-9\.]+)\s(Safari|Mobile).*/i)
          return a ? parseFloat(a[1]) : a
        })(),
        a =
          /^((?!chrome|android).)*safari/i.test(d.navigator.userAgent) ||
          (/^((?!chrome|android).)*$/.test(d.navigator.userAgent) && n)
      ;/Android/i.test(navigator.userAgent)
      var b = d.navigator.userAgent.match(/Firefox/)
      ;(function () {
        if (!b) return null
        var a = d.navigator.userAgent.match(/Firefox\/([0-9]+)\./)
        return a ? parseInt(a[1], 10) : a
      })()
      e || /Android|webOS|Touch|IEMobile|Silk/i.test(navigator.userAgent)
      navigator.userAgent.match(/(iPad|iPhone|iPod)/i)
      d.navigator.userAgent.indexOf("Android")
      var h = /Mac OS X 10_13_6.*\(KHTML, like Gecko\)$/.test(d.navigator.userAgent),
        v = d.navigator.userAgent.match(/(iPad|iPhone).+\sOS\s((\d+)(_\d)*)/i)
          ? 14 <= parseInt(d.navigator.userAgent.match(/(iPad|iPhone).+\sOS\s((\d+)(_\d)*)/i)[3])
          : !1,
        y = function () {
          return !v && ((a && 14 > r) || h)
        },
        p = !(!self.WebAssembly || !self.WebAssembly.validate),
        u =
          -1 < d.navigator.userAgent.indexOf("Edge/16") ||
          -1 < d.navigator.userAgent.indexOf("MSAppHost")
    },
    function (e, n, g) {
      function d(a) {
        "@babel/helpers - typeof"
        return (
          (d =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (a) {
                  return typeof a
                }
              : function (a) {
                  return a &&
                    "function" == typeof Symbol &&
                    a.constructor === Symbol &&
                    a !== Symbol.prototype
                    ? "symbol"
                    : typeof a
                }),
          d(a)
        )
      }
      var m, c, r
      !(function (a) {
        "object" === d(n) && "undefined" !== typeof e
          ? (e.exports = a())
          : !((c = []),
            (m = a),
            (r = "function" === typeof m ? m.apply(n, c) : m),
            void 0 !== r && (e.exports = r))
      })(function () {
        return (function y(b, c, d) {
          function h(p, e) {
            if (!c[p]) {
              if (!b[p]) {
                if (m) return m(p, !0)
                e = Error("Cannot find module '".concat(p, "'"))
                throw ((e.code = "MODULE_NOT_FOUND"), e)
              }
              e = c[p] = { exports: {} }
              b[p][0].call(
                e.exports,
                function (c) {
                  return h(b[p][1][c] || c)
                },
                e,
                e.exports,
                y,
                b,
                c,
                d
              )
            }
            return c[p].exports
          }
          for (var m = !1, e = 0; e < d.length; e++) h(d[e])
          return h
        })(
          {
            1: [
              function (b, c, d) {
                var h = {}.hasOwnProperty,
                  p = function (b, c) {
                    function p() {
                      this.constructor = b
                    }
                    for (var d in c) h.call(c, d) && (b[d] = c[d])
                    p.prototype = c.prototype
                    b.prototype = new p()
                    b.__super__ = c.prototype
                    return b
                  }
                d = b("./PriorityQueue/AbstractPriorityQueue")
                b = b("./PriorityQueue/ArrayStrategy")
                d = (function (b) {
                  function c(b) {
                    b || (b = {})
                    b.strategy || (b.strategy = BinaryHeapStrategy)
                    b.comparator ||
                      (b.comparator = function (b, c) {
                        return (b || 0) - (c || 0)
                      })
                    c.__super__.constructor.call(this, b)
                  }
                  p(c, b)
                  return c
                })(d)
                d.ArrayStrategy = b
                c.exports = d
              },
              { "./PriorityQueue/AbstractPriorityQueue": 2, "./PriorityQueue/ArrayStrategy": 3 },
            ],
            2: [
              function (b, c, d) {
                c.exports = (function () {
                  function b(b) {
                    if (null == (null != b ? b.strategy : void 0))
                      throw "Must pass options.strategy, a strategy"
                    if (null == (null != b ? b.comparator : void 0))
                      throw "Must pass options.comparator, a comparator"
                    this.priv = new b.strategy(b)
                    this.length = 0
                  }
                  b.prototype.queue = function (b) {
                    this.length++
                    this.priv.queue(b)
                  }
                  b.prototype.dequeue = function (b) {
                    if (!this.length) throw "Empty queue"
                    this.length--
                    return this.priv.dequeue()
                  }
                  b.prototype.peek = function (b) {
                    if (!this.length) throw "Empty queue"
                    return this.priv.peek()
                  }
                  b.prototype.remove = function (b) {
                    this.priv.remove(b) && --this.length
                  }
                  b.prototype.find = function (b) {
                    return 0 <= this.priv.find(b)
                  }
                  b.prototype.removeAllMatching = function (b, c) {
                    b = this.priv.removeAllMatching(b, c)
                    this.length -= b
                  }
                  return b
                })()
              },
              {},
            ],
            3: [
              function (b, c, d) {
                var h = function (b, c, h) {
                  var d
                  var p = 0
                  for (d = b.length; p < d; ) {
                    var e = (p + d) >>> 1
                    0 <= h(b[e], c) ? (p = e + 1) : (d = e)
                  }
                  return p
                }
                c.exports = (function () {
                  function b(b) {
                    var c
                    this.options = b
                    this.comparator = this.options.comparator
                    this.data =
                      (null != (c = this.options.initialValues) ? c.slice(0) : void 0) || []
                    this.data.sort(this.comparator).reverse()
                  }
                  b.prototype.queue = function (b) {
                    var c = h(this.data, b, this.comparator)
                    this.data.splice(c, 0, b)
                  }
                  b.prototype.dequeue = function () {
                    return this.data.pop()
                  }
                  b.prototype.peek = function () {
                    return this.data[this.data.length - 1]
                  }
                  b.prototype.find = function (b) {
                    var c = h(this.data, b, this.comparator) - 1
                    return 0 <= c && !this.comparator(this.data[c], b) ? c : -1
                  }
                  b.prototype.remove = function (b) {
                    b = this.find(b)
                    return 0 <= b ? (this.data.splice(b, 1), !0) : !1
                  }
                  b.prototype.removeAllMatching = function (b, c) {
                    for (var h = 0, d = this.data.length - 1; 0 <= d; --d)
                      if (b(this.data[d])) {
                        var p = this.data.splice(d, 1)[0]
                        c && c(p)
                        ++h
                      }
                    return h
                  }
                  return b
                })()
              },
              {},
            ],
          },
          {},
          [1]
        )(1)
      })
    },
    function (e, n, g) {
      ;(function (d) {
        function e(a, b) {
          this._id = a
          this._clearFn = b
        }
        var c = ("undefined" !== typeof d && d) || ("undefined" !== typeof self && self) || window,
          r = Function.prototype.apply
        n.setTimeout = function () {
          return new e(r.call(setTimeout, c, arguments), clearTimeout)
        }
        n.setInterval = function () {
          return new e(r.call(setInterval, c, arguments), clearInterval)
        }
        n.clearTimeout = n.clearInterval = function (a) {
          a && a.close()
        }
        e.prototype.unref = e.prototype.ref = function () {}
        e.prototype.close = function () {
          this._clearFn.call(c, this._id)
        }
        n.enroll = function (a, b) {
          clearTimeout(a._idleTimeoutId)
          a._idleTimeout = b
        }
        n.unenroll = function (a) {
          clearTimeout(a._idleTimeoutId)
          a._idleTimeout = -1
        }
        n._unrefActive = n.active = function (a) {
          clearTimeout(a._idleTimeoutId)
          var b = a._idleTimeout
          0 <= b &&
            (a._idleTimeoutId = setTimeout(function () {
              a._onTimeout && a._onTimeout()
            }, b))
        }
        g(22)
        n.setImmediate =
          ("undefined" !== typeof self && self.setImmediate) ||
          ("undefined" !== typeof d && d.setImmediate) ||
          (this && this.setImmediate)
        n.clearImmediate =
          ("undefined" !== typeof self && self.clearImmediate) ||
          ("undefined" !== typeof d && d.clearImmediate) ||
          (this && this.clearImmediate)
      }.call(this, g(10)))
    },
    function (e, n, g) {
      function d(c, d, a) {
        return new Promise(function (b) {
          if (!c) return b()
          var h = a.document.createElement("script")
          h.type = "text/javascript"
          h.onload = function () {
            b()
          }
          h.onerror = function () {
            d && Object(m.e)(d)
            b()
          }
          h.src = c
          a.document.getElementsByTagName("head")[0].appendChild(h)
        })
      }
      g.d(n, "a", function () {
        return d
      })
      var m = g(0)
    },
    function (e, n, g) {
      function d(a, b, h) {
        function d(g) {
          p = p || Date.now()
          return g
            ? (Object(m.a)("load", "Try instantiateStreaming"),
              fetch(Object(c.a)(a))
                .then(function (a) {
                  return WebAssembly.instantiateStreaming(a, b)
                })
                .catch(function (b) {
                  Object(m.a)("load", "instantiateStreaming Failed " + a + " message " + b.message)
                  return d(!1)
                }))
            : Object(c.b)(a, h, !0, !0).then(function (a) {
                e = Date.now()
                Object(m.a)("load", "Request took " + (e - p) + " ms")
                return WebAssembly.instantiate(a, b)
              })
        }
        var e, p
        return d(!!WebAssembly.instantiateStreaming).then(function (a) {
          Object(m.a)("load", "WASM compilation took " + (Date.now() - (e || p)) + " ms")
          return a
        })
      }
      g.d(n, "a", function () {
        return d
      })
      var m = g(0),
        c = g(2),
        r = g(8)
      g.d(n, "b", function () {
        return r.a
      })
    },
    function (e, n) {
      n = (function () {
        return this
      })()
      try {
        n = n || new Function("return this")()
      } catch (g) {
        "object" === typeof window && (n = window)
      }
      e.exports = n
    },
    function (e, n, g) {
      g.d(n, "b", function () {
        return r
      })
      g.d(n, "a", function () {
        return b
      })
      var d = g(2),
        m = g(9),
        c = g(5),
        r = function () {
          return c.b && !c.a && !Object(c.c)()
        },
        a = (function () {
          function a(a) {
            var b = this
            this.promise = a.then(function (a) {
              b.response = a
              b.status = 200
            })
          }
          a.prototype.addEventListener = function (a, b) {
            this.promise.then(b)
          }
          return a
        })(),
        b = function (b, c, e) {
          if (r() && !e)
            (self.Module.instantiateWasm = function (a, h) {
              return Object(m.a)(b + "Wasm.wasm", a, c["Wasm.wasm"]).then(function (a) {
                h(a.instance)
              })
            }),
              (e = Object(d.b)(b + "Wasm.js.mem", c["Wasm.js.mem"], !1, !1))
          else {
            e = Object(d.b)(
              (self.Module.asmjsPrefix ? self.Module.asmjsPrefix : "") + b + ".js.mem",
              c[".js.mem"],
              !1
            )
            var h = Object(d.c)(
              (self.Module.memoryInitializerPrefixURL
                ? self.Module.memoryInitializerPrefixURL
                : "") +
                b +
                ".mem",
              c[".mem"],
              !0,
              !0
            )
            self.Module.memoryInitializerRequest = new a(h)
          }
          e = new Blob([e], { type: "application/javascript" })
          importScripts(URL.createObjectURL(e))
        }
    },
    function (e, n, g) {
      function d(c, d, a, b) {
        function h(b) {
          return b instanceof a
            ? b
            : new a(function (a) {
                a(b)
              })
        }
        return new (a || (a = Promise))(function (a, e) {
          function p(a) {
            try {
              g(b.next(a))
            } catch (w) {
              e(w)
            }
          }
          function m(a) {
            try {
              g(b["throw"](a))
            } catch (w) {
              e(w)
            }
          }
          function g(b) {
            b.done ? a(b.value) : h(b.value).then(p, m)
          }
          g((b = b.apply(c, d || [])).next())
        })
      }
      function m(c, d) {
        function a(a) {
          return function (c) {
            return b([a, c])
          }
        }
        function b(a) {
          if (e) throw new TypeError("Generator is already executing.")
          for (; h; )
            try {
              if (
                ((e = 1),
                m &&
                  (p =
                    a[0] & 2
                      ? m["return"]
                      : a[0]
                      ? m["throw"] || ((p = m["return"]) && p.call(m), 0)
                      : m.next) &&
                  !(p = p.call(m, a[1])).done)
              )
                return p
              if (((m = 0), p)) a = [a[0] & 2, p.value]
              switch (a[0]) {
                case 0:
                case 1:
                  p = a
                  break
                case 4:
                  return h.label++, { value: a[1], done: !1 }
                case 5:
                  h.label++
                  m = a[1]
                  a = [0]
                  continue
                case 7:
                  a = h.ops.pop()
                  h.trys.pop()
                  continue
                default:
                  if (
                    !((p = h.trys), (p = 0 < p.length && p[p.length - 1])) &&
                    (6 === a[0] || 2 === a[0])
                  ) {
                    h = 0
                    continue
                  }
                  if (3 === a[0] && (!p || (a[1] > p[0] && a[1] < p[3]))) h.label = a[1]
                  else if (6 === a[0] && h.label < p[1]) (h.label = p[1]), (p = a)
                  else if (p && h.label < p[2]) (h.label = p[2]), h.ops.push(a)
                  else {
                    p[2] && h.ops.pop()
                    h.trys.pop()
                    continue
                  }
              }
              a = d.call(c, h)
            } catch (t) {
              ;(a = [6, t]), (m = 0)
            } finally {
              e = p = 0
            }
          if (a[0] & 5) throw a[1]
          return { value: a[0] ? a[1] : void 0, done: !0 }
        }
        var h = {
            label: 0,
            sent: function () {
              if (p[0] & 1) throw p[1]
              return p[1]
            },
            trys: [],
            ops: [],
          },
          e,
          m,
          p,
          g
        return (
          (g = { next: a(0), throw: a(1), return: a(2) }),
          "function" === typeof Symbol &&
            (g[Symbol.iterator] = function () {
              return this
            }),
          g
        )
      }
      g.d(n, "a", function () {
        return d
      })
      g.d(n, "b", function () {
        return m
      })
    },
    function (e, n) {
      function g() {
        throw Error("setTimeout has not been defined")
      }
      function d() {
        throw Error("clearTimeout has not been defined")
      }
      function m(a) {
        if (v === setTimeout) return setTimeout(a, 0)
        if ((v === g || !v) && setTimeout) return (v = setTimeout), setTimeout(a, 0)
        try {
          return v(a, 0)
        } catch (A) {
          try {
            return v.call(null, a, 0)
          } catch (q) {
            return v.call(this, a, 0)
          }
        }
      }
      function c(a) {
        if (y === clearTimeout) return clearTimeout(a)
        if ((y === d || !y) && clearTimeout) return (y = clearTimeout), clearTimeout(a)
        try {
          return y(a)
        } catch (A) {
          try {
            return y.call(null, a)
          } catch (q) {
            return y.call(this, a)
          }
        }
      }
      function r() {
        u && z && ((u = !1), z.length ? (p = z.concat(p)) : (t = -1), p.length && a())
      }
      function a() {
        if (!u) {
          var a = m(r)
          u = !0
          for (var b = p.length; b; ) {
            z = p
            for (p = []; ++t < b; ) z && z[t].run()
            t = -1
            b = p.length
          }
          z = null
          u = !1
          c(a)
        }
      }
      function b(a, b) {
        this.fun = a
        this.array = b
      }
      function h() {}
      e = e.exports = {}
      try {
        var v = "function" === typeof setTimeout ? setTimeout : g
      } catch (w) {
        v = g
      }
      try {
        var y = "function" === typeof clearTimeout ? clearTimeout : d
      } catch (w) {
        y = d
      }
      var p = [],
        u = !1,
        z,
        t = -1
      e.nextTick = function (c) {
        var h = Array(arguments.length - 1)
        if (1 < arguments.length) for (var d = 1; d < arguments.length; d++) h[d - 1] = arguments[d]
        p.push(new b(c, h))
        1 !== p.length || u || m(a)
      }
      b.prototype.run = function () {
        this.fun.apply(null, this.array)
      }
      e.title = "browser"
      e.browser = !0
      e.env = {}
      e.argv = []
      e.version = ""
      e.versions = {}
      e.on = h
      e.addListener = h
      e.once = h
      e.off = h
      e.removeListener = h
      e.removeAllListeners = h
      e.emit = h
      e.prependListener = h
      e.prependOnceListener = h
      e.listeners = function (a) {
        return []
      }
      e.binding = function (a) {
        throw Error("process.binding is not supported")
      }
      e.cwd = function () {
        return "/"
      }
      e.chdir = function (a) {
        throw Error("process.chdir is not supported")
      }
      e.umask = function () {
        return 0
      }
    },
    function (e, n, g) {
      n.a = function () {
        ArrayBuffer.prototype.slice ||
          (ArrayBuffer.prototype.slice = function (d, e) {
            void 0 === d && (d = 0)
            void 0 === e && (e = this.byteLength)
            d = Math.floor(d)
            e = Math.floor(e)
            0 > d && (d += this.byteLength)
            0 > e && (e += this.byteLength)
            d = Math.min(Math.max(0, d), this.byteLength)
            e = Math.min(Math.max(0, e), this.byteLength)
            if (0 >= e - d) return new ArrayBuffer(0)
            var c = new ArrayBuffer(e - d),
              m = new Uint8Array(c)
            d = new Uint8Array(this, d, e - d)
            m.set(d)
            return c
          })
      }
    },
    function (e, n, g) {
      n.a = function (d) {
        var e = {}
        decodeURIComponent(d.slice(1))
          .split("&")
          .forEach(function (c) {
            c = c.split("=", 2)
            e[c[0]] = c[1]
          })
        return e
      }
    },
    function (e, n, g) {
      ;(function (d) {
        function e(a) {
          "function" !== typeof a && (a = new Function("" + a))
          for (var b = Array(arguments.length - 1), c = 0; c < b.length; c++)
            b[c] = arguments[c + 1]
          z[u] = { callback: a, args: b }
          A(u)
          return u++
        }
        function c(a) {
          delete z[a]
        }
        function g(a) {
          if (t) setTimeout(g, 0, a)
          else {
            var b = z[a]
            if (b) {
              t = !0
              try {
                var h = b.callback,
                  f = b.args
                switch (f.length) {
                  case 0:
                    h()
                    break
                  case 1:
                    h(f[0])
                    break
                  case 2:
                    h(f[0], f[1])
                    break
                  case 3:
                    h(f[0], f[1], f[2])
                    break
                  default:
                    h.apply(void 0, f)
                }
              } finally {
                c(a), (t = !1)
              }
            }
          }
        }
        function a() {
          A = function (a) {
            d.nextTick(function () {
              g(a)
            })
          }
        }
        function b() {
          if (p.postMessage && !p.importScripts) {
            var a = !0,
              b = p.onmessage
            p.onmessage = function () {
              a = !1
            }
            p.postMessage("", "*")
            p.onmessage = b
            return a
          }
        }
        function h() {
          var a = "setImmediate$" + Math.random() + "$",
            b = function (b) {
              ;(b.source !== p && b.source !== p.parent) ||
                "string" !== typeof b.data ||
                0 !== b.data.indexOf(a) ||
                g(+b.data.slice(a.length))
            }
          p.addEventListener ? p.addEventListener("message", b, !1) : p.attachEvent("onmessage", b)
          A = function (b) {
            p.postMessage(a + b, "*")
          }
        }
        function v() {
          var a = w.documentElement
          A = function (b) {
            var c = w.createElement("script")
            c.onreadystatechange = function () {
              g(b)
              c.onreadystatechange = null
              a.removeChild(c)
              c = null
            }
            a.appendChild(c)
          }
        }
        function y() {
          A = function (a) {
            setTimeout(g, 0, a)
          }
        }
        var p = "undefined" === typeof window ? self : window,
          u = 1,
          z = {},
          t = !1,
          w = p.document,
          A,
          q = Object.getPrototypeOf && Object.getPrototypeOf(p)
        q = q && q.setTimeout ? q : p
        "[object process]" === {}.toString.call(p.process)
          ? a()
          : b()
          ? h()
          : w && "onreadystatechange" in w.createElement("script")
          ? v()
          : y()
        q.setImmediate = e
        q.clearImmediate = c
        n.a = { setImmediate: e, clearImmediate: c }
      }.call(this, g(13)))
    },
    function (e, n, g) {
      var d = g(0)
      e = (function () {
        function e(c, e) {
          this.name = c
          this.comObj = e
          this.callbackIndex = 1
          this.postMessageTransfers = !0
          this.callbacksCapabilities = {}
          this.actionHandler = {}
          this.actionHandlerAsync = {}
          this.pdfnetCommandChain = this.nextAsync = null
          this.pdfnetActiveCommands = new Set()
          this.actionHandler.console_log = [
            function (a) {
              Object(d.d)(a)
            },
          ]
          this.actionHandler.console_error = [
            function (a) {
              Object(d.c)(a)
            },
          ]
          this.actionHandler.workerLoaded = [function () {}]
          this.msgHandler = this.handleMessage.bind(this)
          e.addEventListener("message", this.msgHandler)
        }
        e.prototype.on = function (c, e, a) {
          var b = this.actionHandler
          b[c] && Object(d.c)('There is already an actionName called "' + c + '"')
          b[c] = [e, a]
        }
        e.prototype.clearActionHandlers = function () {
          this.actionHandler = {}
          this.comObj.removeEventListener("message", this.msgHandler)
        }
        e.prototype.reset = function () {
          this.clearActionHandlers()
          this.comObj.reset && this.comObj.reset()
        }
        e.prototype.replace = function (c, d, a) {
          this.actionHandler[c] = [d, a]
        }
        e.prototype.onAsync = function (c, e, a) {
          var b = this.actionHandlerAsync
          b[c] && Object(d.c)('There is already an actionName called "' + c + '"')
          b[c] = [e, a]
        }
        e.prototype.replaceAsync = function (c, d, a) {
          var b = this.actionHandlerAsync,
            h = this.actionHandler
          h[c] && delete h[c]
          b[c] = [d, a]
        }
        e.prototype.onNextAsync = function (c) {
          this.nextAsync = c
        }
        e.prototype.send = function (c, d) {
          this.postMessage({ action: c, data: d })
        }
        e.prototype.getNextId = function () {
          return this.callbackIndex++
        }
        e.prototype.sendWithPromise = function (c, d, a) {
          var b = this.getNextId()
          c = { action: c, data: d, callbackId: b, priority: a }
          d = window.createPromiseCapability()
          this.callbacksCapabilities[b] = d
          try {
            this.postMessage(c)
          } catch (h) {
            d.reject(h)
          }
          return d.promise
        }
        e.prototype.sendWithPromiseReturnId = function (c, d, a) {
          var b = this.getNextId()
          c = { action: c, data: d, callbackId: b, priority: a }
          d = window.createPromiseCapability()
          this.callbacksCapabilities[b] = d
          try {
            this.postMessage(c)
          } catch (h) {
            d.reject(h)
          }
          return { promise: d.promise, callbackId: b }
        }
        e.prototype.sendWithPromiseWithId = function (c, e, a) {
          e > this.callbackIndex &&
            Object(d.c)(
              "Can't reuse callbackId " + e + " lesser than callbackIndex " + this.callbackIndex
            )
          e in this.callbacksCapabilities &&
            Object(d.c)(
              "Can't reuse callbackId " + e + ". There is a capability waiting to be resolved. "
            )
          c = { action: c, data: a, callbackId: e }
          a = window.createPromiseCapability()
          this.callbacksCapabilities[e] = a
          try {
            this.postMessage(c)
          } catch (b) {
            a.reject(b)
          }
          return a.promise
        }
        e.prototype.sendError = function (c, d) {
          if (c.message || c.errorData) {
            c.message && c.message.message && (c.message = c.message.message)
            var a = c.errorData
            c = { type: c.type ? c.type : "JavascriptError", message: c.message }
            a &&
              Object.keys(a).forEach(function (b) {
                a.hasOwnProperty(b) && (c[b] = a[b])
              })
          }
          this.postMessage({ isReply: !0, callbackId: d, error: c })
        }
        e.prototype.getPromise = function (c) {
          if (c in this.callbacksCapabilities) return this.callbacksCapabilities[c]
          Object(d.c)("Cannot get promise for callback " + c)
        }
        e.prototype.cancelPromise = function (c) {
          if (c in this.callbacksCapabilities) {
            var e = this.callbacksCapabilities[c]
            delete this.callbacksCapabilities[c]
            this.pdfnetActiveCommands.has(c) && this.pdfnetActiveCommands.delete(c)
            e.reject({ type: "Cancelled", message: "Request has been cancelled." })
            this.postMessage({ action: "actionCancel", data: { callbackId: c } })
          } else Object(d.e)("Cannot cancel callback " + c)
        }
        e.prototype.postMessage = function (c) {
          if (this.postMessageTransfers) {
            var d = this.getTransfersArray(c)
            this.comObj.postMessage(c, d)
          } else this.comObj.postMessage(c)
        }
        e.prototype.getObjectTransfers = function (c, d) {
          var a = this
          null !== c &&
            "object" === typeof c &&
            (c instanceof Uint8Array
              ? d.push(c.buffer)
              : c instanceof ArrayBuffer
              ? d.push(c)
              : Object.keys(c).forEach(function (b) {
                  c.hasOwnProperty(b) && a.getObjectTransfers(c[b], d)
                }))
        }
        e.prototype.getTransfersArray = function (c) {
          var d = []
          this.getObjectTransfers(c, d)
          return 0 === d.length ? void 0 : d
        }
        e.prototype.handleMessage = function (c) {
          var e = this,
            a = c.data,
            b = this.actionHandler,
            h = this.actionHandlerAsync
          c = this.callbacksCapabilities
          var g = this.pdfnetActiveCommands
          if (a.isReply)
            (b = a.callbackId),
              b in c
                ? ((h = c[b]),
                  delete c[b],
                  g.has(b) && g.delete(b),
                  "error" in a ? h.reject(a.error) : h.resolve(a.data))
                : Object(d.a)("Cannot resolve callback " + b)
          else if (a.action in b) {
            var m = b[a.action]
            a.callbackId
              ? Promise.resolve()
                  .then(function () {
                    return m[0].call(m[1], a.data)
                  })
                  .then(
                    function (b) {
                      e.postMessage({ isReply: !0, callbackId: a.callbackId, data: b })
                    },
                    function (b) {
                      e.sendError(b, a.callbackId)
                    }
                  )
              : m[0].call(m[1], a.data)
          } else
            a.action in h
              ? ((m = h[a.action]),
                a.callbackId
                  ? m[0].call(m[1], a).then(
                      function (b) {
                        e.postMessage({ isReply: !0, callbackId: a.callbackId, data: b })
                        e.nextAsync()
                      },
                      function (b) {
                        e.sendError(b, a.callbackId)
                        e.nextAsync()
                      }
                    )
                  : m[0].call(m[1], a).then(
                      function () {
                        e.nextAsync()
                      },
                      function () {
                        e.nextAsync()
                      }
                    ))
              : Object(d.c)("Unknown action from worker: " + a.action)
        }
        return e
      })()
      n.a = e
    },
    function (e, n, g) {
      e.exports = g(19)
    },
    function (e, n, g) {
      g.r(n)
      g(5)
      e = g(14)
      g(20)
      g(21)
      g(24)
      g(25)
      g(26)
      g(27)
      g(28)
      Object(e.a)()
    },
    function (e, n, g) {
      ;(function (d) {
        "undefined" === typeof d.crypto &&
          (d.crypto = {
            getRandomValues: function (d) {
              for (var c = 0; c < d.length; c++) d[c] = 256 * Math.random()
            },
          })
      })("undefined" === typeof window ? self : window)
    },
    function (e, n, g) {
      ;(function (d, e) {
        function c(d) {
          "@babel/helpers - typeof"
          return (
            (c =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (a) {
                    return typeof a
                  }
                : function (a) {
                    return a &&
                      "function" == typeof Symbol &&
                      a.constructor === Symbol &&
                      a !== Symbol.prototype
                      ? "symbol"
                      : typeof a
                  }),
            c(d)
          )
        }
        ;(function (d) {
          function a() {
            for (var a = 0; a < C.length; a++) C[a][0](C[a][1])
            C = []
            E = !1
          }
          function b(f, l) {
            C.push([f, l])
            E || ((E = !0), D(a, 0))
          }
          function h(a, f) {
            function l(a) {
              p(f, a)
            }
            function k(a) {
              z(f, a)
            }
            try {
              a(l, k)
            } catch (G) {
              k(G)
            }
          }
          function m(a) {
            var f = a.owner,
              b = f.state_
            f = f.data_
            var c = a[b]
            a = a.then
            if ("function" === typeof c) {
              b = l
              try {
                f = c(f)
              } catch (G) {
                z(a, G)
              }
            }
            n(a, f) || (b === l && p(a, f), b === k && z(a, f))
          }
          function n(a, f) {
            var l
            try {
              if (a === f)
                throw new TypeError("A promises callback cannot return that same promise.")
              if (f && ("function" === typeof f || "object" === c(f))) {
                var k = f.then
                if ("function" === typeof k)
                  return (
                    k.call(
                      f,
                      function (k) {
                        l || ((l = !0), f !== k ? p(a, k) : u(a, k))
                      },
                      function (f) {
                        l || ((l = !0), z(a, f))
                      }
                    ),
                    !0
                  )
              }
            } catch (G) {
              return l || z(a, G), !0
            }
            return !1
          }
          function p(a, f) {
            ;(a !== f && n(a, f)) || u(a, f)
          }
          function u(a, l) {
            a.state_ === F && ((a.state_ = f), (a.data_ = l), b(w, a))
          }
          function z(a, l) {
            a.state_ === F && ((a.state_ = f), (a.data_ = l), b(A, a))
          }
          function t(a) {
            var f = a.then_
            a.then_ = void 0
            for (a = 0; a < f.length; a++) m(f[a])
          }
          function w(a) {
            a.state_ = l
            t(a)
          }
          function A(a) {
            a.state_ = k
            t(a)
          }
          function q(a) {
            if ("function" !== typeof a)
              throw new TypeError("Promise constructor takes a function argument")
            if (!(this instanceof q))
              throw new TypeError(
                "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
              )
            this.then_ = []
            h(a, this)
          }
          d.createPromiseCapability = function () {
            var a = {}
            a.promise = new q(function (f, l) {
              a.resolve = f
              a.reject = l
            })
            return a
          }
          var B = d.Promise,
            r =
              B &&
              "resolve" in B &&
              "reject" in B &&
              "all" in B &&
              "race" in B &&
              (function () {
                var a
                new B(function (f) {
                  a = f
                })
                return "function" === typeof a
              })()
          "undefined" !== typeof exports && exports
            ? ((exports.Promise = r ? B : q), (exports.Polyfill = q))
            : "function" === typeof define && g(23)
            ? define(function () {
                return r ? B : q
              })
            : r || (d.Promise = q)
          var F = "pending",
            f = "sealed",
            l = "fulfilled",
            k = "rejected",
            x = function () {},
            D = "undefined" !== typeof e ? e : setTimeout,
            C = [],
            E
          q.prototype = {
            constructor: q,
            state_: F,
            then_: null,
            data_: void 0,
            then: function (a, f) {
              a = { owner: this, then: new this.constructor(x), fulfilled: a, rejected: f }
              this.state_ === l || this.state_ === k ? b(m, a) : this.then_.push(a)
              return a.then
            },
            catch: function (a) {
              return this.then(null, a)
            },
          }
          q.all = function (a) {
            if ("[object Array]" !== Object.prototype.toString.call(a))
              throw new TypeError("You must pass an array to Promise.all().")
            return new this(function (f, l) {
              function k(a) {
                c++
                return function (l) {
                  b[a] = l
                  --c || f(b)
                }
              }
              for (var b = [], c = 0, d = 0, e; d < a.length; d++)
                (e = a[d]) && "function" === typeof e.then ? e.then(k(d), l) : (b[d] = e)
              c || f(b)
            })
          }
          q.race = function (a) {
            if ("[object Array]" !== Object.prototype.toString.call(a))
              throw new TypeError("You must pass an array to Promise.race().")
            return new this(function (f, l) {
              for (var k = 0, b; k < a.length; k++)
                (b = a[k]) && "function" === typeof b.then ? b.then(f, l) : f(b)
            })
          }
          q.resolve = function (a) {
            return a && "object" === c(a) && a.constructor === this
              ? a
              : new this(function (f) {
                  f(a)
                })
          }
          q.reject = function (a) {
            return new this(function (f, l) {
              l(a)
            })
          }
        })(
          "undefined" !== typeof window
            ? window
            : "undefined" !== typeof d
            ? d
            : "undefined" !== typeof self
            ? self
            : void 0
        )
      }.call(this, g(10), g(7).setImmediate))
    },
    function (e, n, g) {
      ;(function (d, e) {
        ;(function (c, d) {
          function a(a) {
            delete w[a]
          }
          function b(c) {
            if (A) setTimeout(b, 0, c)
            else {
              var f = w[c]
              if (f) {
                A = !0
                try {
                  var l = f.callback,
                    k = f.args
                  switch (k.length) {
                    case 0:
                      l()
                      break
                    case 1:
                      l(k[0])
                      break
                    case 2:
                      l(k[0], k[1])
                      break
                    case 3:
                      l(k[0], k[1], k[2])
                      break
                    default:
                      l.apply(d, k)
                  }
                } finally {
                  a(c), (A = !1)
                }
              }
            }
          }
          function h() {
            B = function (a) {
              e.nextTick(function () {
                b(a)
              })
            }
          }
          function g() {
            if (c.postMessage && !c.importScripts) {
              var a = !0,
                f = c.onmessage
              c.onmessage = function () {
                a = !1
              }
              c.postMessage("", "*")
              c.onmessage = f
              return a
            }
          }
          function m() {
            var a = "setImmediate$" + Math.random() + "$",
              f = function (f) {
                f.source === c &&
                  "string" === typeof f.data &&
                  0 === f.data.indexOf(a) &&
                  b(+f.data.slice(a.length))
              }
            c.addEventListener
              ? c.addEventListener("message", f, !1)
              : c.attachEvent("onmessage", f)
            B = function (f) {
              c.postMessage(a + f, "*")
            }
          }
          function p() {
            var a = new MessageChannel()
            a.port1.onmessage = function (a) {
              b(a.data)
            }
            B = function (f) {
              a.port2.postMessage(f)
            }
          }
          function n() {
            var a = q.documentElement
            B = function (f) {
              var l = q.createElement("script")
              l.onreadystatechange = function () {
                b(f)
                l.onreadystatechange = null
                a.removeChild(l)
                l = null
              }
              a.appendChild(l)
            }
          }
          function z() {
            B = function (a) {
              setTimeout(b, 0, a)
            }
          }
          if (!c.setImmediate) {
            var t = 1,
              w = {},
              A = !1,
              q = c.document,
              B,
              r = Object.getPrototypeOf && Object.getPrototypeOf(c)
            r = r && r.setTimeout ? r : c
            "[object process]" === {}.toString.call(c.process)
              ? h()
              : g()
              ? m()
              : c.MessageChannel
              ? p()
              : q && "onreadystatechange" in q.createElement("script")
              ? n()
              : z()
            r.setImmediate = function (a) {
              "function" !== typeof a && (a = new Function("" + a))
              for (var f = Array(arguments.length - 1), l = 0; l < f.length; l++)
                f[l] = arguments[l + 1]
              w[t] = { callback: a, args: f }
              B(t)
              return t++
            }
            r.clearImmediate = a
          }
        })("undefined" === typeof self ? ("undefined" === typeof d ? this : d) : self)
      }.call(this, g(10), g(13)))
    },
    function (e, n) {
      e.exports = {}
    },
    function (e, n, g) {
      ;(function (d) {
        var e = function (c, d) {
          var a = function y(a) {
              a = this["catch"](a)
              return { cancel: d, promise: a, then: b.bind(a), catch: y.bind(a) }
            },
            b = function u(b, c) {
              b = this.then(b, c)
              return { cancel: d, promise: b, then: u.bind(b), catch: a.bind(b) }
            }
          return { cancel: d, promise: c, then: b.bind(c), catch: a.bind(c) }
        }
        d.CancellablePromise = function (c, d) {
          var a = !1,
            b,
            h = new Promise(function (e, h) {
              b = function () {
                a || (d(), h("cancelled"))
              }
              new Promise(c).then(
                function (b) {
                  a = !0
                  e(b)
                },
                function (b) {
                  a = !0
                  h(b)
                }
              )
            })
          return e(h, b)
        }
        d.CancellablePromise.all = function (c) {
          var d = Promise.all(c)
          return e(d, function () {
            c.forEach(function (a) {
              a.cancel && a.cancel()
            })
          })
        }
      })("undefined" === typeof self ? void 0 : self)
    },
    function (e, n, g) {
      ;(function (d, e) {
        var c = g(1)
        ;(function (g) {
          g.Module = {
            INITIAL_MEMORY: 50331648,
            noExitRuntime: !0,
            devicePixelRatio: 1,
            cur_doc: null,
            cachePtrSize: 0,
            hasBufOwnership: !0,
            loaded: !1,
            initCb: null,
            cachePtr: null,
            cleanupState: null,
            docs: {},
            postEvent: function (a, b, c) {
              Module.workerMessageHandler.send("event", { docId: a, type: b, data: c })
            },
            postPagesUpdatedEvent: function (a, b, c, d) {
              a = { pageDimensions: Module.GetPageDimensions(a) }
              if (c)
                for (var e = 0; e < c.length; ++e)
                  c[e] in a.pageDimensions
                    ? ((a.pageDimensions[c[e]].contentChanged = !0),
                      d && (a.pageDimensions[c[e]].annotationsUnchanged = !0))
                    : console.warn("Invalid Page Number ".concat(c[e]))
              Module.postEvent(b, "pagesUpdated", a)
              return a
            },
            postPagesRenamedEvent: function (a, b) {
              var c = {}
              a = Module.PDFDocGetPageIterator(a, 1)
              for (var d = 1; Module.IteratorHasNext(a); ++d) {
                var e = Module.stackSave(),
                  p = Module.IteratorCurrent(a)
                c[d] = Module.PageGetId(p)
                Module.IteratorNext(a)
                Module.stackRestore(e)
              }
              Module.postEvent(b, "pagesRenamed", { pageNumToId: c })
            },
            GetIndividualPageDimensions: function (a, b, c) {
              a = Module.PageGetPageInfo(c)
              a.id = Module.PageGetId(c)
              return a
            },
            GetPageDimensionsRange: function (a, b, c) {
              for (
                var d = {}, e = Module.PDFDocGetPageIterator(a, b);
                b < c && Module.IteratorHasNext(e);
                ++b
              ) {
                var h = Module.stackSave(),
                  g = Module.IteratorCurrent(e)
                d[b] = this.GetIndividualPageDimensions(a, b, g)
                Module.IteratorNext(e)
                Module.stackRestore(h)
              }
              return d
            },
            GetPageDimensionsContentChangedList: function (a, b) {
              b.sort(function (a, b) {
                return a - b
              })
              for (
                var c = {},
                  d = b[0],
                  e = b[b.length - 1],
                  p = 0,
                  g = Module.PDFDocGetPageIterator(a, d);
                d <= e && Module.IteratorHasNext(g);
                ++d
              ) {
                if (b[p] == d) {
                  ++p
                  var m = Module.stackSave(),
                    t = Module.IteratorCurrent(g)
                  t = this.GetIndividualPageDimensions(a, d, t)
                  t.contentChanged = !0
                  c[d] = t
                  Module.stackRestore(m)
                }
                Module.IteratorNext(g)
              }
              return c
            },
            GetPageDimensions: function (a) {
              try {
                var b = Module.stackSave()
                var c = Module.GetPageCount(a)
                if (0 === c) throw "This document has no pages."
                return Module.GetPageDimensionsRange(a, 1, c + 1)
              } finally {
                Module.stackRestore(b)
              }
            },
            loadDoc: function (a, b) {
              "undefined" === typeof Module && this._main()
              var c = null
              try {
                var d = Module.stackSave()
                a.customHandlerId && Module._TRN_PDFNetAddPDFTronCustomHandler(a.customHandlerId)
                b = Module.CreateDoc(a, b)
                var e = Module.GetDoc(b)
                if (Module.PDFDocInitSecurityHandler(e))
                  return { docId: b, pageDimensions: Module.GetPageDimensions(e) }
                c = {
                  type: "NeedsPassword",
                  errorData: { docId: b },
                  message: "This document requires a password",
                }
              } catch (p) {
                c = { type: "InvalidPDF", message: p }
              } finally {
                Module.stackRestore(d)
              }
              throw c
            },
            loadCanvas: function (a, b, c, d, e, p, g, m) {
              return new Promise(function (h, n) {
                var t = Module.GetDoc(a),
                  q = b + 1,
                  v = function () {
                    h(Module.RasterizePage(t, q, c, d, p, e, g, m))
                  },
                  w = Module.docs[a].chunkStorage
                if (w) {
                  var u = Module.GetDownloadData(t).downloader,
                    f = w.getRequiredChunkOffsetArrays(u, q)
                  w.keepChunks(f.have)
                  u = function () {
                    var a = w.getChunks(f.missing)
                    Module.loadPromise = a
                      .then(function () {
                        var a = Module.loadPromise.cancelled
                        Module.loadPromise = null
                        a || v()
                      })
                      ["catch"](function (a) {
                        "cancelled" !== a ? n(a) : (Module.loadPromise = null)
                      })
                  }
                  Module.loadPromise ? Module.loadPromise.then(u, u) : u()
                } else v()
              })
            },
            loadResources: function (a, b) {
              Module.Initialize(b)
              Object(c.b)("worker", "PDFNet initialized!")
              Module._TRN_PDFNetSetDefaultDiskCachingEnabled(!1)
              a = new Uint8Array(a)
              Module.PDFNetSetResourceData(a)
            },
            onRuntimeInitialized: function () {
              "undefined" === typeof Module &&
                (("undefined" !== typeof window ? window : self).Module = {})
              ;(function (a) {
                a.PDFDocExportXFDF = function (a, c) {
                  a = Module.GetDoc(a)
                  var b = Module.stackSave()
                  try {
                    var d = c ? Module.PDFDocFDFExtract(a, c) : Module.PDFDocFDFExtract(a)
                    var e = Module.FDFDocSaveAsXFDF(d)
                    Module.stackRestore(b)
                  } catch (u) {
                    throw (Module.stackRestore(b), u)
                  }
                  return e
                }
                a.PageArrayToPageSet = function (a) {
                  var b = Module.stackSave()
                  try {
                    var c = Module.PageSetCreate()
                    for (var d = 0; d < a.length; ++d) Module.PageSetAddPage(c, a[d])
                    Module.stackRestore(b)
                  } catch (p) {
                    throw (Module.stackRestore(b), p)
                  }
                  return c
                }
                a.cancelCurrent = function () {
                  var a = Module.loadPromise
                  return a
                    ? (a.cancel(), (a.cancelled = !0))
                    : (a = Module.cleanupState)
                    ? (d(a.timeout),
                      a.cleanupArr.reverse().forEach(function (a) {
                        a()
                      }),
                      (Module.cleanupState = null),
                      !0)
                    : !1
                }
                a.SetWorkerRestartCallback = function (a) {
                  Module.workerRestartCallback = a
                }
                a.XFDFMerge = function (a, d, e) {
                  if (d) {
                    var b = []
                    try {
                      Object(c.b)("worker", "Merge XFDF of length ".concat(d.length))
                      var h = Module.GetUStringFromJSString(d, !0)
                      b.push(function () {
                        Module.UStringDestroy(h)
                      })
                      var g = Module.allocate(4, "i8", Module.ALLOC_STACK)
                      REX(Module._TRN_FDFDocCreateFromXFDF(h, g))
                      var m = Module.getValue(g, "i8*")
                      b.push(function () {
                        Module.FDFDocDestroy(m)
                      })
                      Module.PDFDocFDFUpdate(a, m, e)
                    } finally {
                      b.reverse().forEach(function (a) {
                        a()
                      })
                    }
                  }
                }
                a.MergeXFDF = function (a, c, d) {
                  return new Promise(function (b, e) {
                    var h = []
                    try {
                      var p = Module.stackSave()
                      h[h.length] = function () {
                        Module.stackRestore(p)
                      }
                      var g = Module.GetDoc(a)
                      Module.XFDFMerge(g, c, d)
                      h.forEach(function (a) {
                        a()
                      })
                      b({})
                    } catch (w) {
                      h.forEach(function (a) {
                        a()
                      }),
                        e(w)
                    }
                  })
                }
                a.CreateBufferFile = function (a, c, d) {
                  Module.MakeDev(a)
                  var b = new ArrayBuffer(c)
                  b = new Uint8Array(b)
                  d = d ? 0 : 255
                  for (var e = 0; e < c; ++e) b[e] = d
                  Module.docs[a] = { buffer: b }
                }
                a.ReadBufferFile = function (a, c) {
                  var b = Module.docs[a].buffer
                  c && (Module.docs[a].buffer = new Uint8Array(b.buffer.slice(0)))
                  return b
                }
                a.RemoveBufferFile = function (a) {
                  Module.docs[a] = null
                }
                a.SaveHelper = function (a, c, d) {
                  d = "undefined" === typeof d ? 2 : d
                  Module.MakeDev(c)
                  var b = Module._TRN_PDFDocSave(a, Module.GetUStringFromJSString(c), d, 0)
                  Module.docs[c].sink = null
                  REX(b)
                  d & 16 && Module.postPagesRenamedEvent(a, c)
                  return Module.docs[c].buffer.buffer
                }
                a.SaveDoc = function (a, c, d, e, p, m, n) {
                  return new Promise(function (b, h) {
                    var t = []
                    try {
                      var q = Module.GetDoc(a),
                        w = Module.stackSave()
                      t[t.length] = function () {
                        Module.stackRestore(w)
                      }
                      Module.XFDFMerge(q, c, n)
                      var u = Module.allocate(8, "i8", Module.ALLOC_STACK),
                        v = Module.allocate(
                          Module.intArrayFromString('{"UseNonStandardRotation": true}'),
                          "i8",
                          Module.ALLOC_STACK
                        )
                      Module.setValue(u, v, "i8*")
                      Module.setValue(u + 4, 0, "i32")
                      Module._TRN_PDFDocRefreshAnnotAppearances(q, u)
                      if (m) {
                        u = function (a) {
                          a = new Uint8Array(a)
                          g.FS.writeFile("watermarkFile", a)
                          a = Module.ImageCreateFromFile(
                            q,
                            Module.GetUStringFromJSString("watermarkFile")
                          )
                          g.FS.unlink("watermarkFile")
                          return a
                        }
                        var f = Module.ElementBuilderCreate()
                        t.push(function () {
                          Module.ElementBuilderDestroy(f)
                        })
                        var l = Module.ElementWriterCreate()
                        t.push(function () {
                          Module.ElementWriterDestroy(l)
                        })
                        try {
                          if (!m.hasOwnProperty("default"))
                            throw Error("Watermark dictionary has no 'default' key!")
                          var k = u(m["default"]),
                            x = Module.PDFDocGetPageIterator(q, 1)
                          for (v = -1; Module.IteratorHasNext(x); ) {
                            var D = Module.IteratorCurrent(x)
                            Module.IteratorNext(x)
                            v++
                            var C = v.toString()
                            try {
                              var E = void 0
                              if (m.hasOwnProperty(C)) {
                                var H = m[C]
                                if (H) E = u(H)
                                else continue
                              } else E = k
                              var y = Module.PageGetPageInfo(D),
                                z = Module.ElementBuilderCreateImage(f, E, 0, 0, y.width, y.height)
                              Module.ElementWriterBegin(l, D)
                              Module.ElementWriterWritePlacedElement(l, z)
                              Module.ElementWriterEnd(l)
                            } catch (I) {
                              console.warn(
                                "Watermark for page " + C + "can not be added due to error: " + I
                              )
                            }
                          }
                        } catch (I) {
                          console.warn("Watermarks can not be added due to error: " + I)
                        }
                      }
                      k = 0
                      if (e) {
                        var r = Module.PDFDocGetRoot(q)
                        ;(k = Module.ObjFindObj(r, "OpenAction")) &&
                          Module.ObjPut(r, "__OpenActionBackup__", k)
                        var G = Module.ObjPutDict(r, "OpenAction")
                        Module.ObjPutName(G, "Type", "Action")
                        Module.ObjPutName(G, "S", "JavaScript")
                        Module.ObjPutString(G, "JS", "this.print()")
                      }
                      var K = Module.SaveHelper(q, a, p)
                      e &&
                        (k
                          ? Module.ObjPut(
                              r,
                              "OpenAction",
                              Module.ObjFindObj(r, "__OpenActionBackup__")
                            )
                          : Module.ObjErase(r, "OpenAction"))
                      t.reverse().forEach(function (a) {
                        a()
                      })
                      if (d) b({ fileData: K })
                      else {
                        var L = K.slice(0)
                        b({ fileData: L })
                      }
                    } catch (I) {
                      t.reverse().forEach(function (a) {
                        a()
                      }),
                        h(I)
                    }
                  })
                }
                a.SaveDocFromFixedElements = function (a, c, d, e) {
                  a = Module.PDFDocCreateFromLayoutEls(a)
                  a = Module.CreateDoc({ type: "ptr", value: a })
                  return Module.SaveDoc(a, c, !0, !1, d, e)
                }
                a.GetCurrentCanvasData = function (a) {
                  var b = Module.currentRenderData
                  if (!b) return null
                  a && REX(Module._TRN_PDFRasterizerUpdateBuffer(b.rast))
                  var d = Date.now()
                  if (b.bufPtr) {
                    a = new Uint8Array(new ArrayBuffer(b.buf_size))
                    for (var e = 0, p = 0; p < b.out_height; ++p)
                      for (var g = b.bufPtr + b.stride * p, m = 0; m < b.out_width; ++m)
                        (a[e++] = Module.HEAPU8[g + 2]),
                          (a[e++] = Module.HEAPU8[g + 1]),
                          (a[e++] = Module.HEAPU8[g]),
                          (a[e++] = Module.HEAPU8[g + 3]),
                          (g += 4)
                  } else a = Module.ReadBufferFile("b", a)
                  Object(c.b)("bufferTiming", "Copy took ".concat(Date.now() - d))
                  return { pageBuf: a.buffer, pageWidth: b.out_width, pageHeight: b.out_height }
                }
                a.RasterizePage = function (a, d, g, m, p, n, r, t) {
                  return new Promise(function (b, h) {
                    Module.currentRenderData = {}
                    var q = Module.currentRenderData
                    q.out_width = parseInt(g, 10)
                    q.out_height = parseInt(m, 10)
                    var w = []
                    w.push(function () {
                      Module.currentRenderData = null
                    })
                    try {
                      var A = Module.stackSave()
                      w[w.length] = function () {
                        Module.stackRestore(A)
                      }
                      var u = Module.GetPage(a, d),
                        f = Module.PageGetPageWidth(u),
                        l = Module.PageGetPageHeight(u)
                      q.stride = 4 * q.out_width
                      q.buf_size = q.out_width * q.out_height * 4
                      Object(c.b)("Memory", "Created rasterizer")
                      q.rast = Module.PDFRasterizerCreate()
                      w.push(function () {
                        Object(c.b)("Memory", "Destroyed rasterizer")
                        Module._TRN_PDFRasterizerDestroy(q.rast)
                      })
                      if (r) {
                        var k = Module.EMSCreateUpdatedLayersContext(a, r)
                        0 !== k &&
                          (REX(Module._TRN_PDFRasterizerSetOCGContext(q.rast, k)),
                          w.push(function () {
                            Module._TRN_OCGContextDestroy(k)
                          }))
                      }
                      var x = !1
                      t.hasOwnProperty("renderAnnots")
                        ? (t.renderAnnots && (x = !0),
                          REX(
                            Module._TRN_PDFRasterizerSetDrawAnnotations(
                              q.rast,
                              t.renderAnnots ? 1 : 0
                            )
                          ))
                        : REX(Module._TRN_PDFRasterizerSetDrawAnnotations(q.rast, 0))
                      t.hasOwnProperty("highlightFields") &&
                        (t.highlightFields && (x = !0),
                        REX(Module._TRN_PDFRasterizerSetHighlightFields(q.rast, t.highlightFields)))
                      t.hasOwnProperty("antiAliasing") &&
                        REX(Module._TRN_PDFRasterizerSetAntiAliasing(q.rast, t.antiAliasing))
                      t.hasOwnProperty("pathHinting") &&
                        REX(Module._TRN_PDFRasterizerSetPathHinting(q.rast, t.pathHinting))
                      if (t.hasOwnProperty("thinLinePixelGridFit")) {
                        var D = !0
                        t.hasOwnProperty("thinLineStrokeAdjust") && (D = t.thinLineStrokeAdjust)
                        REX(
                          Module._TRN_PDFRasterizerSetThinLineAdjustment(
                            q.rast,
                            t.thinLinePixelGridFit,
                            D
                          )
                        )
                      } else t.hasOwnProperty("thinLineStrokeAdjust") && REX(Module._TRN_PDFRasterizerSetThinLineAdjustment(q.rast, !1, t.thinLineStrokeAdjust))
                      t.hasOwnProperty("imageSmoothing")
                        ? ((D = !1),
                          t.hasOwnProperty("hqImageResampling") && (D = t.hqImageResampling),
                          REX(
                            Module._TRN_PDFRasterizerSetImageSmoothing(q.rast, t.imageSmoothing, D)
                          ))
                        : t.hasOwnProperty("hqImageResampling") &&
                          REX(
                            Module._TRN_PDFRasterizerSetImageSmoothing(
                              q.rast,
                              !0,
                              t.hqImageResampling
                            )
                          )
                      t.hasOwnProperty("caching") &&
                        REX(Module._TRN_PDFRasterizerSetCaching(q.rast, t.caching))
                      t.hasOwnProperty("expGamma") &&
                        REX(Module._TRN_PDFRasterizerSetGamma(q.rast, t.expGamma))
                      t.hasOwnProperty("isPrinting") &&
                        (t.isPrinting && (x = !0),
                        REX(Module._TRN_PDFRasterizerSetPrintMode(q.rast, t.isPrinting)))
                      t.hasOwnProperty("colorPostProcessMode") &&
                        (t.colorPostProcessMode && (x = !0),
                        REX(
                          Module._TRN_PDFRasterizerSetColorPostProcessMode(
                            q.rast,
                            t.colorPostProcessMode
                          )
                        ))
                      var C = Module.PageGetRotation(u)
                      D = 1 === n || 3 === n
                      C = (1 === C || 3 === C) !== D
                      var E = Module.allocate(48, "i8", Module.ALLOC_STACK)
                      if (p) {
                        p.x1 = p[0]
                        p.y1 = p[1]
                        p.x2 = p[2]
                        p.y2 = p[3]
                        var H = Module.PageGetDefaultMatrix(u, 0),
                          v = Module.Matrix2DInverse(H)
                        p = Module.Matrix2DMultBBox(v, p)
                        if (p.x2 < p.x1) {
                          var y = p.x1
                          p.x1 = p.x2
                          p.x2 = y
                        }
                        p.y2 < p.y1 && ((y = p.y1), (p.y1 = p.y2), (p.y2 = y))
                        var z = q.out_width / (C ? p.y2 - p.y1 : p.x2 - p.x1)
                        var G = Module.GetDefaultMatrixBox(u, p, n)
                      } else (G = Module.PageGetDefaultMatrix(u, n)), (z = q.out_width / (D ? l : f))
                      Module.Matrix2DSet(E, z, 0, 0, z, 0, 0)
                      Module.Matrix2DConcat(E, G)
                      var K = Module.allocate(4, "i8", Module.ALLOC_STACK),
                        L = Module.allocate(4, "i8", Module.ALLOC_STACK)
                      x
                        ? ((q.bufPtr = Module._malloc(q.buf_size)),
                          Module._memset(q.bufPtr, t.pageTransparent ? 0 : 255, q.buf_size),
                          w.push(function () {
                            Module._free(q.bufPtr)
                          }))
                        : (Module.CreateBufferFile("b", q.buf_size, t.pageTransparent),
                          w.push(function () {
                            Module.RemoveBufferFile("b")
                          }))
                      var I = t.overprintMode
                      if (10 === I) {
                        REX(Module._TRN_PDFRasterizerSetOverprint(q.rast, 1))
                        var O = Module.PDFRasterizerRasterizeSeparations(
                          q.rast,
                          u,
                          q.out_width,
                          q.out_height,
                          E,
                          0,
                          0
                        )
                        b({ pageBuf: O, pageWidth: q.out_width, pageHeight: q.out_height })
                      } else {
                        REX(Module._TRN_PDFRasterizerSetOverprint(q.rast, I))
                        x
                          ? REX(
                              Module._TRN_PDFRasterizerGetChunkRenderer(
                                q.rast,
                                u,
                                q.bufPtr,
                                q.out_width,
                                q.out_height,
                                q.stride,
                                4,
                                !0,
                                E,
                                0,
                                0,
                                0,
                                K
                              )
                            )
                          : REX(
                              Module._TRN_PDFRasterizerGetChunkRendererPath(
                                q.rast,
                                u,
                                Module.GetUStringFromJSString("b"),
                                q.out_width,
                                q.out_height,
                                !0,
                                E,
                                0,
                                0,
                                0,
                                K
                              )
                            )
                        var M = Module.getValue(K, "i8*")
                        w.push(function () {
                          REX(Module._TRN_ChunkRendererDestroy(M))
                        })
                      }
                      var P = new Date().getTime(),
                        S = e(function Q() {
                          try {
                            for (var a = 0, f = new Date().getTime(), l = !1; 200 > a; ) {
                              REX(Module._TRN_ChunkRendererRenderNext(M, L))
                              if (!Module.getValue(L, "i8")) {
                                l = !0
                                break
                              }
                              a = new Date().getTime() - f
                            }
                            if (l) {
                              var k = Module.GetCurrentCanvasData(!1)
                              Object(c.b)(
                                "worker",
                                "Total Page Time ".concat(new Date().getTime() - P)
                              )
                              w.reverse().forEach(function (a) {
                                a()
                              })
                              b(k)
                            } else Module.cleanupState.timeout = e(Q)
                          } catch (R) {
                            w.reverse().forEach(function (a) {
                              a()
                            }),
                              h(R)
                          }
                        })
                      Module.cleanupState = { cleanupArr: w, timeout: S }
                      w.push(function () {
                        Module.cleanupState = null
                      })
                    } catch (T) {
                      w.reverse().forEach(function (a) {
                        a()
                      }),
                        h(T)
                    }
                  })
                }
                a.UpdatePassword = function (a, c) {
                  try {
                    var b = Module.stackSave()
                    var d = Module.GetDoc(a)
                    return Module.PDFDocInitStdSecurityHandler(d, c)
                      ? (d in downloadDataMap &&
                          REX(
                            Module._TRN_PDFDocDownloaderInitialize(d, downloadDataMap[d].downloader)
                          ),
                        { success: !0, pageDimensions: Module.GetPageDimensions(d) })
                      : { success: !1 }
                  } finally {
                    Module.stackRestore(b)
                  }
                }
                a.InsertBlankPages = function (a, c, d, e) {
                  return new Promise(function (b, h) {
                    var g = [],
                      p = Module.GetDoc(a)
                    try {
                      var m = Module.stackSave()
                      g[g.length] = function () {
                        Module.stackRestore(m)
                      }
                      for (var n = c.length - 1; 0 <= n; --n) {
                        var q = Module.PDFDocGetPageIterator(p, c[n]),
                          u = Module.PDFDocPageCreate(p, d, e)
                        Module.PDFDocPageInsert(p, q, u)
                      }
                      var v = Module.postPagesUpdatedEvent(p, a)
                      g.forEach(function (a) {
                        a()
                      })
                      b(v)
                    } catch (F) {
                      g.forEach(function (a) {
                        a()
                      }),
                        h(F)
                    }
                  })
                }
                a.InsertPages = function (a, c, d, e, g, m) {
                  return new Promise(function (b, h) {
                    var p = [],
                      n = Module.GetDoc(a)
                    try {
                      var q = Module.stackSave()
                      p[p.length] = function () {
                        Module.stackRestore(q)
                      }
                      if (c instanceof ArrayBuffer) {
                        var t = Module.CreateDoc(c)
                        var u = Module.GetDoc(t)
                        p[p.length] = function () {
                          Module.DeleteDoc(t)
                        }
                      } else u = Module.GetDoc(c)
                      for (var v = d.length, f = Module.PageSetCreate(), l = 0; l < v; ++l)
                        Module.PageSetAddPage(f, d[l])
                      Module.PDFDocInsertPages(n, e, u, f, g)
                      var k
                      m || (k = Module.postPagesUpdatedEvent(n, a))
                      p.reverse().forEach(function (a) {
                        a()
                      })
                      b(k)
                    } catch (x) {
                      p.reverse().forEach(function (a) {
                        a()
                      }),
                        h(x)
                    }
                  })
                }
                a.MovePages = function (a, c, d) {
                  return new Promise(function (b, e) {
                    var h = [],
                      g = Module.GetDoc(a)
                    try {
                      var p = Module.stackSave()
                      h[h.length] = function () {
                        Module.stackRestore(p)
                      }
                      for (var m = c.length, n = Module.PageSetCreate(), q = 0; q < m; ++q)
                        Module.PageSetAddPage(n, c[q])
                      Module.PDFDocMovePages(g, d, n)
                      var v = Module.postPagesUpdatedEvent(g, a)
                      h.forEach(function (a) {
                        a()
                      })
                      b(v)
                    } catch (J) {
                      h.forEach(function (a) {
                        a()
                      }),
                        e(J)
                    }
                  })
                }
                a.RemovePages = function (a, c, d) {
                  return new Promise(function (b, e) {
                    var h = Module.GetDoc(a),
                      g = []
                    try {
                      var p = Module.stackSave()
                      g[g.length] = function () {
                        Module.stackRestore(p)
                      }
                      for (var m = c.length - 1; 0 <= m; --m) {
                        var n = Module.PDFDocGetPageIterator(h, c[m])
                        Module.IteratorHasNext(n) && Module.PDFDocPageRemove(h, n)
                      }
                      var q
                      d || (q = Module.postPagesUpdatedEvent(h, a))
                      g.forEach(function (a) {
                        a()
                      })
                      b(q)
                    } catch (B) {
                      g.forEach(function (a) {
                        a()
                      }),
                        e(B)
                    }
                  })
                }
                a.RotatePages = function (a, c, d) {
                  return new Promise(function (b, e) {
                    var g = Module.GetDoc(a),
                      h = []
                    try {
                      var p = Module.stackSave()
                      h[h.length] = function () {
                        Module.stackRestore(p)
                      }
                      var m = c.length,
                        n = 0,
                        q = Module.PDFDocGetPageIterator(g, c[0]),
                        r = []
                      h.push(function () {
                        Module._TRN_IteratorDestroy(q)
                      })
                      for (var v = c[0]; Module.IteratorHasNext(q) && n < c[m - 1]; ++v) {
                        if (v === c[n]) {
                          var y = Module.IteratorCurrent(q),
                            f = (Module.PageGetRotation(y) + d) % 4
                          Module.PageSetRotation(y, f)
                          r.push(v)
                          n++
                        }
                        Module.IteratorNext(q)
                      }
                      var l = Module.postPagesUpdatedEvent(g, a, r, !0)
                      h.reverse().forEach(function (a) {
                        a()
                      })
                      b(l)
                    } catch (k) {
                      h.reverse().forEach(function (a) {
                        a()
                      }),
                        e(k)
                    }
                  })
                }
                a.ExtractPages = function (a, c, d, e, g) {
                  return new Promise(function (b, h) {
                    var p = []
                    try {
                      var m = Module.GetDoc(a),
                        n = Module.stackSave()
                      p[p.length] = function () {
                        Module.stackRestore(n)
                      }
                      var q = function (a) {
                        p.reverse().forEach(function (a) {
                          a()
                        })
                        h(a)
                      }
                      Module.XFDFMerge(m, d, g)
                      var u = Module.CreateEmptyDoc()
                      p[p.length] = function () {
                        Module.DeleteDoc(u)
                      }
                      var r = Module.InsertPages(u, a, c, 1, !0)
                        .then(function () {
                          return Module.SaveDoc(u, void 0, !0, !1, void 0, e)
                        })
                        .then(function (a) {
                          p.reverse().forEach(function (a) {
                            a()
                          })
                          return a
                        })
                        ["catch"](q)
                      b(r)
                    } catch (F) {
                      q(F)
                    }
                  })
                }
                a.CropPages = function (a, c, d, e, g, m) {
                  return new Promise(function (b, h) {
                    var p = Module.GetDoc(a),
                      n = []
                    try {
                      var q = Module.stackSave()
                      n[n.length] = function () {
                        Module.stackRestore(q)
                      }
                      var t = c.length,
                        u = 0,
                        r = Module.PDFDocGetPageIterator(p, c[0])
                      n.push(function () {
                        Module._TRN_IteratorDestroy(r)
                      })
                      for (var f = [], l = c[0]; Module.IteratorHasNext(r) && u < c[t - 1]; ++l) {
                        if (l === c[u]) {
                          var k = Module.IteratorCurrent(r),
                            x = Module.allocate(8, "i8", Module.ALLOC_STACK)
                          REX(Module._TRN_PageGetCropBox(k, x))
                          var D = Module.PageGetRotation(k),
                            C = Module.getValue(x, "double"),
                            E = Module.getValue(x + 8, "double"),
                            H = Module.getValue(x + 16, "double"),
                            v = Module.getValue(x + 24, "double")
                          0 === D % 4
                            ? (Module.setValue(x, C + g, "double"),
                              Module.setValue(x + 8, E + e, "double"),
                              Module.setValue(x + 16, H - m, "double"),
                              Module.setValue(x + 24, v - d, "double"))
                            : 1 === D % 4
                            ? (Module.setValue(x, C + d, "double"),
                              Module.setValue(x + 8, E + g, "double"),
                              Module.setValue(x + 16, H - e, "double"),
                              Module.setValue(x + 24, v - m, "double"))
                            : 2 === D % 4
                            ? (Module.setValue(x, C + m, "double"),
                              Module.setValue(x + 8, E + d, "double"),
                              Module.setValue(x + 16, H - g, "double"),
                              Module.setValue(x + 24, v - e, "double"))
                            : 3 === D % 4 &&
                              (Module.setValue(x, C + e, "double"),
                              Module.setValue(x + 8, E + m, "double"),
                              Module.setValue(x + 16, H - d, "double"),
                              Module.setValue(x + 24, v - g, "double"))
                          Module.setValue(x + 32, 0, "double")
                          REX(Module._TRN_PageSetBox(k, 0, x))
                          REX(Module._TRN_PageSetBox(k, 1, x))
                          f.push(l)
                          u++
                        }
                        Module.IteratorNext(r)
                      }
                      var y = Module.postPagesUpdatedEvent(p, a, f, !0)
                      n.reverse().forEach(function (a) {
                        a()
                      })
                      b(y)
                    } catch (N) {
                      n.reverse().forEach(function (a) {
                        a()
                      }),
                        h(N)
                    }
                  })
                }
              })("undefined" === typeof self ? this.Module : self.Module)
              this.loaded = !0
              Module.initCb && Module.initCb()
            },
          }
        })(self)
      }.call(this, g(7).clearImmediate, g(7).setImmediate))
    },
    function (e, n, g) {
      ;(function (d) {
        function e(a) {
          "@babel/helpers - typeof"
          return (
            (e =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (a) {
                    return typeof a
                  }
                : function (a) {
                    return a &&
                      "function" == typeof Symbol &&
                      a.constructor === Symbol &&
                      a !== Symbol.prototype
                      ? "symbol"
                      : typeof a
                  }),
            e(a)
          )
        }
        var c = g(1),
          n = "undefined" !== typeof window ? window : self
        n.global = n
        ;(function (a) {
          a.currentFileString = "/current"
          var b = 0,
            g = 0,
            m = {},
            r = null
          Module.chunkMax = 200
          var p = function (a, l, k, b, c) {
              var f = new XMLHttpRequest()
              return CancellablePromise(
                function (d, e) {
                  f.open("GET", a, !0)
                  f.responseType = "arraybuffer"
                  f.onerror = function () {
                    e("Network error occurred")
                  }
                  f.onload = function () {
                    if (206 === this.status && f.response.byteLength === k) {
                      var a = new Int8Array(f.response)
                      d(a)
                    } else e("Download Failed")
                  }
                  var g = ["bytes=", l, "-", l + k - 1].join("")
                  f.setRequestHeader("Range", g)
                  c && (f.withCredentials = c)
                  b &&
                    Object.keys(b).forEach(function (a) {
                      f.setRequestHeader(a, b[a])
                    })
                  f.send()
                },
                function () {
                  f.abort()
                }
              )
            },
            u = function (a) {
              this.maxChunkNum = a
              this.lruList = []
              this.chunkMap = {}
            }
          u.prototype = {
            has: function (a) {
              return a in this.chunkMap
            },
            insert: function (a, l) {
              this.lruList.length >= this.maxChunkNum &&
                (delete this.chunkMap[this.lruList[0]], this.lruList.shift())
              this.lruList.push(l)
              this.chunkMap[l] = a
            },
            get: function (a) {
              var f = this.lruList.lastIndexOf(a)
              0 <= f && this.lruList.splice(f, 1)
              this.lruList.push(a)
              return this.chunkMap[a]
            },
          }
          var z = function (a) {
            this.file = a
            this.filePosition = 0
            this.fileLength = a.size
            this.chunkSize = 1048576
            this.chunkCache = new u(8)
            this.reader = new FileReaderSync()
          }
          z.prototype = {
            read: function (a, l, k) {
              k = this.filePosition + k <= this.fileLength ? k : this.fileLength - this.filePosition
              a = a.subarray(l, l + k)
              l = k
              for (
                var f = this.filePosition % this.chunkSize, b = this.filePosition - f, c = 0;
                0 < k;

              ) {
                if (this.chunkCache.has(b)) var d = this.chunkCache.get(b)
                else
                  (d = new Int8Array(
                    this.reader.readAsArrayBuffer(this.file.slice(b, b + this.chunkSize))
                  )),
                    this.chunkCache.insert(d, b)
                var e = d.length,
                  g = f + k
                g <= e
                  ? (a.set(d.subarray(f, g), c), (this.filePosition += k), (k = 0))
                  : (a.set(d.subarray(f), c),
                    (this.filePosition += e - f),
                    (f = 0),
                    (b = this.filePosition),
                    (k = g - e),
                    (c = l - k))
              }
              return l
            },
            seek: function (a) {
              this.filePosition = a
            },
            close: function () {
              this.reader = this.file = null
            },
            getPos: function () {
              return this.filePosition
            },
            getTotalSize: function () {
              return this.fileLength
            },
          }
          var t = function (a) {
            this.data = a
            this.position = 0
            this.length = this.data.length
          }
          t.prototype = {
            read: function (a, l, k) {
              k = this.position + k <= this.length ? k : this.length - this.position
              a = a.subarray(l, l + k)
              l = this.data.subarray(this.position, this.position + k)
              a.set(l)
              this.position += k
              return k
            },
            write: function (a, l, k) {
              k = this.position + k <= this.length ? k : this.length - this.position
              a = a.subarray(l, l + k)
              this.data.subarray(this.position, this.position + k).set(a)
              this.position += k
              return k
            },
            seek: function (a) {
              this.position = a
            },
            close: function () {
              this.data = null
            },
            getPos: function () {
              return this.position
            },
            getTotalSize: function () {
              return this.length
            },
          }
          var w = function (a, l, k, b, c) {
            "object" === e(a)
              ? ((this.lruList = a.lruList),
                (this.chunkMap = a.chunkMap),
                (this.length = a.length),
                (this.url = a.url),
                (this.customHeaders = a.customHeaders),
                (this.withCredentials = a.withCredentials))
              : ((this.lruList = []),
                (this.chunkMap = {}),
                (this.chunkMap[l] = c),
                (this.length = l),
                (this.url = a),
                (this.customHeaders = k),
                (this.withCredentials = b))
          }
          w.prototype = {
            lruUpdate: function (a) {
              var f = this.lruList.lastIndexOf(a)
              0 <= f && this.lruList.splice(f, 1)
              this.lruList.push(a)
            },
            getChunk: function (a) {
              var f = this
              if (this.chunkMap[a]) this.lruUpdate(a)
              else {
                var k = Math.min(a + 1048576, this.length) - 1,
                  b = new XMLHttpRequest()
                b.open("GET", this.url, !1)
                b.responseType = "arraybuffer"
                b.setRequestHeader("Range", ["bytes=", a, "-", k].join(""))
                this.withCredentials && (b.withCredentials = this.withCredentials)
                this.customHeaders &&
                  Object.keys(this.customHeaders).forEach(function (a) {
                    b.setRequestHeader(a, f.customHeaders[a])
                  })
                b.send()
                if (200 === b.status || 206 === b.status)
                  this.writeChunk(new Int8Array(b.response), a)
                else throw Error("Failed to load data from")
              }
              return this.chunkMap[a]
            },
            hadChunk: function (a) {
              return a in this.chunkMap
            },
            hasChunk: function (a) {
              return this.chunkMap[a]
            },
            getCacheData: function () {
              return this.chunkMap[this.length]
            },
            getRequiredChunkOffsetArrays: function (a, l) {
              var f = { have: [], downloading: [], missing: [] }
              try {
                var b = Module.stackSave()
                var c = Module.allocate(4, "i8", Module.ALLOC_STACK)
                REX(Module._TRN_DownloaderGetRequiredChunksSize(a, l, c))
                var d = Module.getValue(c, "i8*")
                if (d) {
                  var e = Module._malloc(4 * d)
                  REX(Module._TRN_DownloaderGetRequiredChunks(a, l, e, d))
                  for (a = 0; a < d; ++a) {
                    var g = Module.getValue(e + 4 * a, "i8*")
                    this.hasChunk(g)
                      ? f.have.push(g)
                      : this.hadChunk(g)
                      ? f.missing.push(g)
                      : f.downloading.push(g)
                  }
                }
              } finally {
                e && Module._free(e), Module.stackRestore(b)
              }
              return f
            },
            keepVisibleChunks: function (a, l) {
              for (var f = l.length, b = Module.chunkMax / 2, c = 0, d = 0; d < f; ++d) {
                var e = this.getRequiredChunkOffsetArrays(a, l[d]),
                  g = e.have,
                  h = g.length
                c += h
                if (c > b) {
                  this.keepChunks(g.slice(0, h - c + b))
                  break
                }
                this.keepChunks(e.have)
              }
            },
            getChunkAsync: function (a) {
              var f = this,
                k = a + 1048576,
                b = 1048576
              k > this.length && (b -= k - this.length)
              return p(this.url, a, b, this.customHeaders, this.withCredentials).then(function (l) {
                f.writeChunk(l, a)
              })
            },
            getChunks: function (a) {
              for (var f = a.length, k = Array(f), b = 0; b < f; ++b)
                k[b] = this.getChunkAsync(a[b])
              return CancellablePromise.all(k)
            },
            keepChunks: function (a) {
              for (var f = a.length, k = 0; k < f; ++k) this.lruUpdate(a[k])
            },
            writeChunk: function (a, l, k) {
              k = k || 0
              var f = this.chunkMap[l],
                b = a.length,
                c = this.lruList.length >= Module.chunkMax && !f
              1048576 !== b || a.buffer.byteLength !== b
                ? (c
                    ? ((f = this.lruList.shift()),
                      (c = this.chunkMap[f]),
                      1048576 > c.length && (c = new Int8Array(1048576)),
                      (this.chunkMap[f] = null))
                    : (c = f ? this.chunkMap[l] : new Int8Array(1048576)),
                  c.subarray(k, k + b).set(a),
                  (a = c))
                : c && ((f = this.lruList.shift()), (this.chunkMap[f] = null))
              this.lruUpdate(l)
              this.chunkMap[l] = a
            },
          }
          var A = function (a) {
            this.chunkStorage = a
            this.position = 0
            this.length = this.chunkStorage.length
          }
          A.prototype = {
            read: function (a, l, k) {
              var f = this.position + k <= this.length,
                b = f ? k : this.length - this.position
              if (this.position < this.length) {
                var c
                for (c = 0; c < b; ) {
                  var d = this.position % 1048576
                  var e = this.position - d
                  var g = b - c,
                    h = a.subarray(l + c, l + c + g)
                  if (this.chunkStorage.hadChunk(e))
                    (e = this.chunkStorage.getChunk(e).subarray(d, d + g)),
                      h.set(e),
                      (h = e.length),
                      (c += h),
                      (this.position += h)
                  else for (this.position += g; c < b; ++c) h[c] = 0
                }
              }
              if (!f) {
                l += b
                if ((k -= b))
                  (f = this.chunkStorage.getCacheData()),
                    k > f.length && (k = f.length),
                    (c = this.position - this.length),
                    (a = a.subarray(l, l + k)),
                    (e = f.subarray(c, c + k)),
                    a.set(e)
                this.position += k
                return b + k
              }
              return b
            },
            write: function (a, l, k) {
              var f = this.position + k <= this.length,
                b = this.position + k <= this.length ? k : this.length - this.position,
                c = a.subarray(l, l + b),
                d = this.position % 1048576
              this.chunkStorage.writeChunk(c, this.position - d, d)
              this.position += b
              if (!f) {
                c = l + b
                if ((k -= b))
                  (l = this.chunkStorage.getCacheData()),
                    k > l.length && (k = l.length),
                    (f = this.position - this.length),
                    (c = a.subarray(c, c + k)),
                    l.subarray(f, f + k).set(c)
                this.position += k
                return b + k
              }
              return b
            },
            seek: function (a) {
              this.position = a
            },
            close: function () {
              this.chunkStorage = null
            },
            getPos: function () {
              return this.position
            },
            getTotalSize: function () {
              return this.length
            },
          }
          var q = function (a) {
            this.docId = a
            this.length = 0
            this.data = new Int8Array(8192)
            this.position = 0
          }
          q.prototype = {
            seek: function (a) {
              this.position = a
            },
            close: function () {
              var a = new Int8Array(this.data.buffer.slice(0, this.length))
              Module.ChangeDocBackend(this.docId, { ptr: Module.GetDoc(this.docId), buffer: a })
              this.data = null
            },
            getPos: function () {
              return this.position
            },
            getTotalSize: function () {
              return this.length
            },
            read: function (a, l, b) {
              var f = this.data.length
              b = b + l < f ? b : f - l
              a = a.subarray(l, l + b)
              l = this.data.subarray(this.position, this.position + b)
              a.set(l)
              this.position += b
              return b
            },
            write: function (a, l, b) {
              for (var f = this.position + b, k = this.data.length; f > k; ) {
                k = Math.max(k * (16777216 < k ? 1.5 : 2), f)
                var c = new Int8Array(k)
                c.set(this.data.subarray(0, this.length), 0)
                this.data = c
              }
              a = a.subarray(l, l + b)
              this.data.set(a, this.position)
              this.position += b
              this.position > this.length && (this.length = this.position)
              return b
            },
          }
          var B = {
            IsSink: function (a) {
              return 66 === (a.flags & 255)
            },
            open: function (a) {
              var f = a.path.slice(1)
              this.IsSink(a)
                ? ((a.provider = new q(f)), (Module.docs[f].sink = a.provider))
                : (a.provider = Module.docs[f].sink
                    ? new t(Module.docs[f].sink.data)
                    : Module.docs[f].chunkStorage
                    ? new A(Module.docs[f].chunkStorage)
                    : Module.docs[f].buffer
                    ? new t(Module.docs[f].buffer)
                    : new z(Module.docs[f].file))
            },
            close: function (a) {
              a.provider.close()
            },
            read: function (a, b, k, c, d) {
              return a.provider.read(b, k, c)
            },
            llseek: function (a, b, k) {
              a = a.provider
              1 === k ? (b += a.getPos()) : 2 === k && (b = a.getTotalSize() + b)
              if (0 > b) throw new FS.ErrnoError(n.ERRNO_CODES.EINVAL)
              a.seek(b)
              return b
            },
            write: function (a, b, k, c, d) {
              return c ? a.provider.write(b, k, c) : 0
            },
          }
          n.THROW = function (a) {
            throw { type: "InvalidPDF", message: a }
          }
          var J = function (f) {
            return "Exception: \n\t Message: "
              .concat(a.GetJSStringFromCString(Module._TRN_GetMessage(f)), "\n\t Filename: ")
              .concat(a.GetJSStringFromCString(Module._TRN_GetFileName(f)), "\n\t Function: ")
              .concat(a.GetJSStringFromCString(Module._TRN_GetFunction(f)), "\n\t Linenumber: ")
              .concat(a.GetJSStringFromCString(Module._TRN_GetLineNum(f)))
          }
          a.GetErrToString = J
          n.REX = function (a) {
            a && THROW(J(a))
          }
          a.Initialize = function (a) {
            var b = Module.stackSave()
            a = a ? Module.allocate(Module.intArrayFromString(a), "i8", Module.ALLOC_STACK) : 0
            REX(Module._TRN_PDFNetInitialize(a))
            Module.stackRestore(b)
          }
          a.GetDoc = function (a) {
            if (a in Module.docs) return Module.docs[a].ptr
            throw {
              type: "InvalidDocReference",
              message: "Unable to access Document id=".concat(
                a,
                ". The document appears to be invalid or was deleted."
              ),
            }
          }
          a.clearDocBackend = function () {
            null !== Module.cachePtr
              ? (Module.hasBufOwnership && Module._free(Module.cachePtr), (Module.cachePtr = null))
              : Module.docs[a.currentFileString] && delete Module.docs[a.currentFileString]
          }
          a.MakeDev = function (a) {
            if (!m[a]) {
              var b = FS.makedev(3, 5)
              FS.registerDevice(b, B)
              FS.mkdev(a, 511, b)
              m[a] = !0
            }
          }
          a.CreateDocFileBackend = function (a, b) {
            Module.MakeDev(b)
            var f = Module.allocate(4, "i8", Module.ALLOC_STACK)
            Module.docs[b] = { file: a }
            a = Module.allocate(Module.intArrayFromString(b), "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PDFDocCreateFromFilePath(a, f))
            f = Module.getValue(f, "i8*")
            Module.docs[b].ptr = f
          }
          a.InsertImageIntoDoc = function (a, b, k) {
            var f = []
            try {
              var l = Module.ElementBuilderCreate()
              f.push(function () {
                Module.ElementBuilderDestroy(l)
              })
              var c = Module.ElementWriterCreate()
              f.push(function () {
                Module.ElementWriterDestroy(c)
              })
              if (k) {
                var d = k.width
                var e = k.height
              } else
                (d = Module.ImageGetImageWidth(b)),
                  (e = Module.ImageGetImageHeight(b)),
                  (k = d / e),
                  k > 612 / 792
                    ? ((d = 612), (e = parseInt(d / k, 10)))
                    : ((e = 792), (d = parseInt(e * k, 10)))
              var g = Module.ElementBuilderCreateImage(l, b, 0, 0, d, e),
                h = Module.PDFDocPageCreate(a, d, e)
              Module.ElementWriterBegin(c, h)
              Module.ElementWriterWritePlacedElement(c, g)
              Module.ElementWriterEnd(c)
              Module.PDFDocPagePushBack(a, h)
            } finally {
              f.reverse().forEach(function (a) {
                a()
              })
            }
          }
          var F = function (a, b, k) {
            "object" === e(a)
              ? ((this.m_pages = a.m_pages),
                (this.m_has_named_dests = a.m_has_named_dests),
                (this.m_finished_download = a.m_finished_download),
                (this.m_has_outline = a.m_has_outline),
                (this.m_current_page = a.m_current_page),
                (this.m_id = a.m_id),
                (this.size = a.size),
                (this.timeout = a.timeout),
                (this.eventPageArray = a.eventPageArray),
                (this.requirePageCallbacks = a.requirePageCallbacks))
              : ((this.m_pages = []),
                (this.m_has_outline = this.m_finished_download = this.m_has_named_dests = !1),
                (this.m_current_page = 1),
                (this.m_id = k),
                (this.size = a),
                (this.timeout = null),
                (this.eventPageArray = []),
                (this.requirePageCallbacks = {}))
            this.downloadUserData = Module.createDownloadUserData(b, k)
          }
          F.prototype = {
            getJSUrl: function () {
              return Module.extractDownloadUserData(this.downloadUserData).url
            },
            getDocId: function () {
              return Module.extractDownloadUserData(this.downloadUserData).docId
            },
            destroyUserData: function () {
              this.m_id in Module.withCredentials && delete Module.withCredentials[this.m_id]
              this.m_id in Module.customHeadersMap && delete Module.customHeadersMap[this.m_id]
              Module.destroyDownloadUserData(this.downloadUserData)
            },
          }
          a.createDownloadUserData = function (a, b) {
            a = Module.allocate(Module.intArrayFromString(a), "i8", Module.ALLOC_NORMAL)
            var f = Module.allocate(8, "i8", Module.ALLOC_NORMAL)
            Module.setValue(f, a, "i8*")
            Module.setValue(f + 4, parseInt(b, 10), "i32")
            return (this.downloadUserData = f)
          }
          a.extractDownloadUserData = function (b) {
            var f = Module.getValue(b, "i8*")
            f = a.GetJSStringFromCString(f)
            b = Module.getValue(b + 4, "i32").toString()
            return { url: f, docId: b }
          }
          a.destroyDownloadUserData = function (a) {
            Module._free(Module.getValue(a, "i8*"))
            Module._free(a)
          }
          n.downloadDataMap = {}
          Module.customHeadersMap = {}
          Module.withCredentials = {}
          a.GetDownloadData = function (a) {
            if (a in downloadDataMap) return downloadDataMap[a]
          }
          a.DownloaderHint = function (a, b) {
            var f = Module.GetDoc(a),
              c = downloadDataMap[f]
            b.currentPage && (c.m_current_page = b.currentPage)
            if (b.visiblePages) {
              var l = b.visiblePages
              for (b = 0; b < l.length; ++b) ++l[b]
              Object.keys(c.requirePageCallbacks).forEach(function (a) {
                c.requirePageCallbacks.hasOwnProperty(a) && l.push(parseInt(a, 10))
              })
              ;(b = Module.docs[a].chunkStorage) && b.keepVisibleChunks(c.downloader, l)
              a = l.length
              var d = Module.allocate(4 * a, "i8", Module.ALLOC_STACK)
              for (b = 0; b < a; ++b) Module.setValue(d + 4 * b, l[b], "i32")
              REX(Module._TRN_PDFDocDownloadPages(f, d, a, 1, 0))
            }
          }
          a.RequirePage = function (a, b) {
            return new Promise(function (f, c) {
              c = Module.GetDoc(a)
              var k = downloadDataMap[c]
              !k || k.m_finished_download || k.m_pages[b]
                ? f()
                : (b in k.requirePageCallbacks
                    ? k.requirePageCallbacks[b].push(f)
                    : (k.requirePageCallbacks[b] = [f]),
                  (f = Module.allocate(4, "i8", Module.ALLOC_STACK)),
                  Module.setValue(f, b, "i32"),
                  Module._TRN_PDFDocDownloadPages(c, f, 1, 0, 0))
            })
          }
          a.IsLinearizationValid = function (a) {
            a = Module.GetDoc(a)
            if ((a = downloadDataMap[a])) {
              var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
              REX(Module._TRN_DownloaderIsLinearizationValid(a.downloader, b))
              return 0 !== Module.getValue(b, "i8")
            }
            return !1
          }
          a.ShouldRunRender = function (a, b) {
            a = Module.GetDoc(a)
            return (a = downloadDataMap[a]) ? (a.m_finished_download ? !0 : a.m_pages[b]) : !0
          }
          a.postPagesDownloadedEvent = function (a, b, c) {
            a = { pageDimensions: Module.GetPageDimensionsContentChangedList(a, c), pageNumbers: c }
            Module.postEvent(b, "pagesDownloaded", a)
            return a
          }
          a.createCallbacksStruct = function (a) {
            if (!r) {
              var b = function (a) {
                return function (b) {
                  var c = arguments
                  b in downloadDataMap
                    ? a.apply(this, c)
                    : d(function () {
                        b in downloadDataMap && a.apply(this, c)
                      }, 0)
                }
              }
              r = {
                downloadProc: Module.addFunction(function (a, b, c, f, l) {
                  f = Module.extractDownloadUserData(f)
                  var k = f.docId
                  p(f.url, b, c, Module.customHeadersMap[k], Module.withCredentials[k]).then(
                    function (f) {
                      k in Module.docs &&
                        Module.docs[k].chunkStorage &&
                        Module.docs[k].chunkStorage.writeChunk(f, b)
                      Module._TRN_DownloadComplete(0, b, c, a)
                    }
                  )
                }, "viiiii"),
                notifyUpdatePage: Module.addFunction(
                  b(function (a, b, c, f) {
                    var k = downloadDataMap[a]
                    k.m_pages[b] = !0
                    var l = k.eventPageArray
                    if (b in k.requirePageCallbacks)
                      for (c = k.requirePageCallbacks[b], f = 0; f < c.length; ++f) c[f]()
                    k.timeout
                      ? l.push(b)
                      : ((l = k.eventPageArray = [b]),
                        (k.timeout = setTimeout(function () {
                          Module.postPagesDownloadedEvent(a, k.m_id, l)
                          k.timeout = null
                        }, 100)))
                  }),
                  "viiii"
                ),
                notifyUpdateOutline: Module.addFunction(
                  b(function (a, b) {
                    a = downloadDataMap[a]
                    a.m_has_outline ||
                      ((a.m_has_outline = !0), Module.postEvent(a.m_id, "bookmarksUpdated", {}))
                  }),
                  "vii"
                ),
                notifyUpdateNamedDests: Module.addFunction(
                  b(function (a, b) {
                    a = downloadDataMap[a]
                    a.m_has_named_dests || (a.m_has_named_dests = !0)
                  }),
                  "vii"
                ),
                notifyUpdateThumb: Module.addFunction(
                  b(function (a, b) {}),
                  "viiii"
                ),
                notifyFinishedDownload: Module.addFunction(
                  b(function (a, b) {
                    a = downloadDataMap[a]
                    a.m_finished_download ||
                      ((a.m_finished_download = !0),
                      Module.postEvent(a.m_id, "documentComplete", {}))
                  }),
                  "vii"
                ),
                notifyDocumentError: Module.addFunction(function (a, b) {}, "viii"),
                getCurrentPage: Module.addFunction(function (a, b) {
                  return downloadDataMap[a].m_current_page
                }, "iii"),
              }
            }
            b = Module.allocate(40, "i8", Module.ALLOC_STACK)
            Module.setValue(b, r.downloadProc, "i8*")
            Module.setValue(b + 4, a, "i8*")
            Module.setValue(b + 8, r.notifyUpdatePage, "i8*")
            Module.setValue(b + 12, r.notifyUpdateOutline, "i8*")
            Module.setValue(b + 16, r.notifyUpdateNamedDests, "i8*")
            Module.setValue(b + 20, r.notifyUpdateThumb, "i8*")
            Module.setValue(b + 24, r.notifyFinishedDownload, "i8*")
            Module.setValue(b + 28, r.notifyDocumentError, "i8*")
            Module.setValue(b + 32, r.getCurrentPage, "i8*")
            Module.setValue(b + 36, 0, "i8*")
            return b
          }
          a.CreateDocDownloaderBackend = function (a, b, c) {
            var f = a.url,
              k = a.size,
              l = a.customHeaders,
              d = a.withCredentials
            l && (Module.customHeadersMap[c] = l)
            d && (Module.withCredentials[c] = d)
            var e = a.downloadData ? new F(a.downloadData, f, c, l, d) : new F(a.size, f, c, l, d)
            var g = Module.createCallbacksStruct(e.downloadUserData),
              h = Module.allocate(4, "i8", Module.ALLOC_STACK)
            Module.MakeDev(c)
            a.chunkStorage
              ? (f = new w(a.chunkStorage))
              : ((a = new Int8Array(
                  new ArrayBuffer(Math.ceil((a.size + 1048576 - 1) / 1048576 / 8))
                )),
                (f = new w(f, k, l, d, a)))
            Module.docs[c] = { chunkStorage: f }
            REX(Module._TRN_DownloaderCreate(g, k, Module.GetUStringFromJSString(c), h))
            e.downloader = Module.getValue(h, "i8*")
            if ((k = Module._TRN_PDFDocCreateFromFilter(e.downloader, b)))
              Module._TRN_FilterDestroy(e.downloader), REX(k)
            b = Module.getValue(b, "i8*")
            Module.docs[c].ptr = b
            Module.PDFDocInitSecurityHandler(b) &&
              REX(Module._TRN_PDFDocDownloaderInitialize(b, e.downloader))
            downloadDataMap[b] = e
          }
          a.CreateDocBackend = function (c, l) {
            var f = c.value,
              d = c.extension,
              g = c.type,
              h = Module.allocate(4, "i8", Module.ALLOC_STACK),
              p = Module.stackSave()
            try {
              if (f)
                if ("ptr" === g) Module.docs[l] = { ptr: f }
                else {
                  var m = "object" === e(f) && f.url
                  g = d && "pdf" !== d
                  if (m) a.CreateDocDownloaderBackend(f, h, l)
                  else {
                    var n = f instanceof ArrayBuffer
                    m = n ? "buffer" : "file"
                    if (n && ((f = new Uint8Array(f)), 10485760 > f.length + b && !g)) {
                      b += f.length
                      var q = f.length,
                        t = Module._malloc(f.length)
                      Module.HEAPU8.set(f, t)
                      REX(Module._TRN_PDFDocCreateFromBuffer(t, q, h))
                      var w = Module.getValue(h, "i8*")
                      Module.docs[l] = { ptr: w, bufPtr: t, bufPtrSize: q, ownership: !0 }
                      Module.docs[l].extension = d
                      return
                    }
                    Module.MakeDev(l)
                    n = {}
                    n[m] = f
                    Module.docs[l] = n
                    if (g) {
                      if (c.pageSizes && c.pageSizes.length) var r = c.pageSizes[0]
                      else c.defaultPageSize && (r = c.defaultPageSize)
                      var u = Module.GetUStringFromJSString(l)
                      REX(Module._TRN_PDFDocCreate(h))
                      w = Module.getValue(h, "i8*")
                      var v = Module.ImageCreateFromFile(w, u)
                      Module.InsertImageIntoDoc(w, v, r)
                    } else {
                      var A = Module.allocate(
                        Module.intArrayFromString(l),
                        "i8",
                        Module.ALLOC_STACK
                      )
                      REX(Module._TRN_PDFDocCreateFromFilePath(A, h))
                      w = Module.getValue(h, "i8*")
                    }
                    Module.docs[l].extension = d
                    Module.docs[l].ptr = w
                  }
                }
              else
                REX(Module._TRN_PDFDocCreate(h)),
                  (w = Module.getValue(h, "i8*")),
                  (Module.docs[l] = { ptr: w }),
                  (Module.docs[l].extension = d)
            } finally {
              Module.stackRestore(p)
            }
          }
          a.ChangeDocBackend = function (a, l) {
            var f = Module.docs[a]
            f
              ? (f.bufPtr && f.ownership && (Module._free(f.bufPtr), (b -= f.bufPtrSize)),
                delete Module.docs[a])
              : Object(c.d)("Trying to delete document ".concat(a, " that does not exist."))
            Module.docs[a] = l
          }
          a.DeleteDoc = function (a) {
            var f = Module.docs[a]
            f
              ? (f.ptr &&
                  (f.ptr in downloadDataMap &&
                    (clearTimeout(downloadDataMap[f.ptr].timeout),
                    downloadDataMap[f.ptr].destroyUserData(),
                    delete downloadDataMap[f.ptr]),
                  Module.PDFDocDestroy(f.ptr)),
                f.bufPtr && f.ownership && (Module._free(f.bufPtr), (b -= f.bufPtrSize)),
                delete Module.docs[a])
              : Object(c.d)("Trying to delete document ".concat(a, " that does not exist."))
          }
          a.CreateDoc = function (b, c) {
            if ("id" === b.type) return Module.docPtrStringToIdMap[b.value]
            if (!c) {
              do c = (++g).toString()
              while (c in Module.docs)
            }
            Module.hasBufOwnership = !0
            a.CreateDocBackend(b, c)
            return c
          }
          a.CreateEmptyDoc = function () {
            var a = (++g).toString(),
              b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PDFDocCreate(b))
            b = Module.getValue(b, "i8*")
            Module.docs[a] = { ptr: b }
            return a
          }
          a.PDFDocCreateFromLayoutEls = function (a) {
            var b = new Uint8Array(a)
            a = Module._malloc(b.length)
            var c = Module.stackSave(),
              f = Module.allocate(4, "i8", Module.ALLOC_STACK)
            Module.HEAPU8.set(b, a)
            b = Module._TRN_PDFDocCreateFromLayoutEls(a, b.length, f)
            f = Module.getValue(f, "i8*")
            Module._free(a)
            Module.stackRestore(c)
            REX(b)
            return f
          }
          a.GetPageCount = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PDFDocGetPageCount(a, b))
            return Module.getValue(b, "i8*")
          }
          a.GetPage = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PDFDocGetPage(a, b, c))
            a = Module.getValue(c, "i8*")
            Module.PageIsValid(a) ||
              THROW("Trying to access page that doesn't exist at index ".concat(b))
            return a
          }
          a.PageGetPageWidth = function (a) {
            var b = Module.allocate(8, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PageGetPageWidth(a, 1, b))
            return Module.getValue(b, "double")
          }
          a.PageGetPageHeight = function (a) {
            var b = Module.allocate(8, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PageGetPageHeight(a, 1, b))
            return Module.getValue(b, "double")
          }
          a.PageGetDefaultMatrix = function (a, b) {
            var c = Module.allocate(48, "i8", Module.ALLOC_STACK)
            b || (b = 0)
            REX(Module._TRN_PageGetDefaultMatrix(a, !0, 1, b, c))
            return c
          }
          a.GetMatrixAsArray = function (a) {
            for (var b = [], c = 0; 6 > c; ++c) b[c] = Module.getValue(a + 8 * c, "double")
            return b
          }
          a.PageGetPageInfo = function (a) {
            var b = Module.allocate(48, "i8", Module.ALLOC_STACK),
              c = Module.allocate(8, "i8", Module.ALLOC_STACK),
              f = Module.allocate(8, "i8", Module.ALLOC_STACK),
              d = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PageGetPageInfo(a, !0, 1, 0, c, f, b, d))
            return {
              rotation: Module.getValue(d, "i8*"),
              width: Module.getValue(c, "double"),
              height: Module.getValue(f, "double"),
              matrix: Module.GetMatrixAsArray(b),
            }
          }
          a.GetUStringFromJSString = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK),
              f = 2 * (a.length + 1),
              d = Module.allocate(f, "i8", b ? Module.ALLOC_NORMAL : Module.ALLOC_STACK)
            Module.stringToUTF16(a, d, f)
            a = Module._TRN_UStringCreateFromString(d, c)
            b && Module._free(d)
            REX(a)
            return Module.getValue(c, "i8*")
          }
          a.GetJSStringFromUString = function (a) {
            var b = Module.allocate(4, "i16*", Module.ALLOC_STACK)
            REX(Module._TRN_UStringCStr(a, b))
            return Module.UTF16ToString(Module.getValue(b, "i16*"))
          }
          a.GetJSStringFromCString = function (a) {
            return Module.UTF8ToString(a)
          }
          a.PDFNetSetResourceData = function (a) {
            Module.res_ptr = Module._malloc(a.length)
            Module.HEAPU8.set(a, Module.res_ptr)
            REX(Module._TRN_PDFNetSetResourceData(Module.res_ptr, a.length))
            Module.res_ptr_size = a.length
          }
          a.PDFDocDestroy = function (a) {
            REX(Module._TRN_PDFDocDestroy(a))
          }
          a.VectorGetSize = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_VectorGetSize(a, b))
            return Module.getValue(b, "i32")
          }
          a.VectorGetAt = function (a, b) {
            var c = Module.allocate(1, "i8*", Module.ALLOC_STACK)
            REX(Module._TRN_VectorGetAt(a, b, c))
            return Module.getValue(c, "i8*")
          }
          a.VectorDestroy = function (a) {
            REX(Module._TRN_VectorDestroy(a))
          }
          a.PDFRasterizerCreate = function () {
            var a = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PDFRasterizerCreate(0, a))
            return Module.getValue(a, "i8*")
          }
          a.ExtractSeparationData = function (a) {
            var b = Module.getValue(a, "i8*"),
              c = Module.getValue(a + 4, "i32"),
              f = Module.getValue(a + 8, "i8*"),
              d = Module.HEAPU8[a + 12],
              e = Module.HEAPU8[a + 13],
              g = Module.HEAPU8[a + 14]
            a = Module.HEAPU8[a + 15]
            var h = new Uint8Array(c)
            h.set(Module.HEAPU8.subarray(b, b + c))
            b = Module.GetJSStringFromUString(f)
            return { color: [d, e, g, a], data: h.buffer, name: b }
          }
          a.PDFRasterizerRasterizeSeparations = function (a, b, c, d, e, g, h) {
            var f = Module.allocate(8, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PDFRasterizerRasterizeSeparations(a, b, c, d, e, g, h, f))
            a = Module.getValue(f, "i8*")
            b = Module.VectorGetSize(a)
            c = Array(b)
            for (d = 0; d < b; ++d)
              (e = Module.VectorGetAt(a, d)), (c[d] = Module.ExtractSeparationData(e))
            Module.VectorDestroy(a)
            return c
          }
          a.PageGetRotation = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PageGetRotation(a, b))
            return Module.getValue(b, "i8*")
          }
          a.PageGetId = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PageGetSDFObj(a, b))
            b = Module.getValue(b, "i8*")
            a = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ObjGetObjNum(b, a))
            a = Module.getValue(a, "i32")
            var c = Module.allocate(2, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ObjGetGenNum(b, c))
            c = Module.getValue(c, "i16")
            return "".concat(a, "-").concat(c)
          }
          a.PageSetRotation = function (a, b) {
            REX(Module._TRN_PageSetRotation(a, b))
          }
          a.GetDefaultMatrixBox = function (a, b, c) {
            var f = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PageGetRotation(a, f))
            a = (Module.getValue(f, "i32") + c) % 4
            c = Module.allocate(48, "i8", Module.ALLOC_STACK)
            switch (a) {
              case 0:
                return REX(Module._TRN_Matrix2DSet(c, 1, 0, 0, -1, -b.x1, b.y2)), c
              case 1:
                return REX(Module._TRN_Matrix2DSet(c, 0, 1, 1, 0, -b.y1, -b.x1)), c
              case 2:
                return REX(Module._TRN_Matrix2DSet(c, -1, 0, 0, 1, b.x2, -b.y1)), c
              case 3:
                return REX(Module._TRN_Matrix2DSet(c, 0, -1, -1, 0, b.y2, b.x2)), c
            }
            throw Error("Yikes, we don't support that rotation type")
          }
          a.Matrix2DMultBBox = function (a, b) {
            var c = Module.allocate(8, "i8", Module.ALLOC_STACK),
              f = Module.allocate(8, "i8", Module.ALLOC_STACK)
            Module.setValue(c, b.x1, "double")
            Module.setValue(f, b.y1, "double")
            REX(Module._TRN_Matrix2DMult(a, c, f))
            b.x1 = Module.getValue(c, "double")
            b.y1 = Module.getValue(f, "double")
            Module.setValue(c, b.x2, "double")
            Module.setValue(f, b.y2, "double")
            REX(Module._TRN_Matrix2DMult(a, c, f))
            b.x2 = Module.getValue(c, "double")
            b.y2 = Module.getValue(f, "double")
            return b
          }
          a.Matrix2DMult = function (a, b) {
            var c = Module.allocate(8, "i8", Module.ALLOC_STACK),
              f = Module.allocate(8, "i8", Module.ALLOC_STACK)
            Module.setValue(c, b.x, "double")
            Module.setValue(f, b.y, "double")
            REX(Module._TRN_Matrix2DMult(a, c, f))
            b.x = Module.getValue(c, "double")
            b.y = Module.getValue(f, "double")
            return b
          }
          a.Matrix2DConcat = function (a, b) {
            var c = Module.getValue(b, "double"),
              f = Module.getValue(b + 8, "double"),
              d = Module.getValue(b + 16, "double"),
              e = Module.getValue(b + 24, "double"),
              l = Module.getValue(b + 32, "double")
            b = Module.getValue(b + 40, "double")
            REX(Module._TRN_Matrix2DConcat(a, c, f, d, e, l, b))
          }
          a.Matrix2DSet = function (a, b, c, d, e, g, h) {
            REX(Module._TRN_Matrix2DSet(a, b, c, d, e, g, h))
          }
          a.IteratorHasNext = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_IteratorHasNext(a, b))
            return 0 !== Module.getValue(b, "i8")
          }
          a.IteratorCurrent = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_IteratorCurrent(a, b))
            return Module.getValue(Module.getValue(b, "i8*"), "i8*")
          }
          a.IteratorNext = function (a) {
            REX(Module._TRN_IteratorNext(a))
          }
          a.PageGetNumAnnots = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PageGetNumAnnots(a, b))
            return Module.getValue(b, "i32")
          }
          a.PageGetAnnot = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PageGetAnnot(a, b, c))
            return Module.getValue(c, "i8*")
          }
          a.PageAnnotRemove = function (a, b) {
            REX(Module._TRN_PageAnnotRemoveByIndex(a, b))
          }
          a.AnnotGetType = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_AnnotGetType(a, b))
            return Module.getValue(b, "i32")
          }
          a.AnnotHasAppearance = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_AnnotGetAppearance(a, 0, 0, b))
            return 0 !== Module.getValue(b, "i8*")
          }
          a.AnnotRefreshAppearance = function (a) {
            REX(Module._TRN_AnnotRefreshAppearance(a))
          }
          a.ObjErase = function (a, b) {
            b = Module.allocate(Module.intArrayFromString(b), "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ObjEraseFromKey(a, b))
          }
          a.GetJSDoubleArrFromCore = function (a, b) {
            for (var c = Array(b), d = 0; d < b; ++d)
              (c[d] = Module.getValue(a, "double")), (a += 8)
            return c
          }
          a.GetJSIntArrayFromCore = function (a, b) {
            for (var c = Array(b), d = 0; d < b; ++d) (c[d] = Module.getValue(a, "i32")), (a += 4)
            return c
          }
          a.BookmarkIsValid = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_BookmarkIsValid(a, b))
            return 0 !== Module.getValue(b, "i8")
          }
          a.BookmarkGetNext = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_BookmarkGetNext(a, b))
            return Module.getValue(b, "i8*")
          }
          a.BookmarkGetFirstChild = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_BookmarkGetFirstChild(a, b))
            return Module.getValue(b, "i8*")
          }
          a.BookmarkHasChildren = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_BookmarkHasChildren(a, b))
            return 0 !== Module.getValue(b, "i8")
          }
          a.BookmarkGetAction = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_BookmarkGetAction(a, b))
            return Module.getValue(b, "i8*")
          }
          a.BookmarkGetTitle = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_BookmarkGetTitle(a, b))
            a = Module.getValue(b, "i8*")
            return Module.GetJSStringFromUString(a)
          }
          a.ActionIsValid = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ActionIsValid(a, b))
            return 0 !== Module.getValue(b, "i8")
          }
          a.ActionGetType = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ActionGetType(a, b))
            return Module.getValue(b, "i32")
          }
          a.ActionGetDest = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ActionGetDest(a, b))
            return Module.getValue(b, "i8*")
          }
          a.DestinationIsValid = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_DestinationIsValid(a, b))
            return 0 !== Module.getValue(b, "i8")
          }
          a.DestinationGetPage = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_DestinationGetPage(a, b))
            return Module.getValue(b, "i8*")
          }
          a.PageIsValid = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PageIsValid(a, b))
            return 0 !== Module.getValue(b, "i8")
          }
          a.PageGetIndex = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PageGetIndex(a, b))
            return Module.getValue(b, "i32")
          }
          a.ObjGetAsPDFText = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ObjGetAsPDFText(a, b))
            a = Module.getValue(b, "i8*")
            return Module.GetJSStringFromUString(a)
          }
          a.ObjFindObj = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK)
            b = Module.allocate(Module.intArrayFromString(b), "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ObjFindObj(a, b, c))
            return Module.getValue(c, "i8*")
          }
          a.PDFDocGetFirstBookmark = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PDFDocGetFirstBookmark(a, b))
            return Module.getValue(b, "i8*")
          }
          a.DestinationGetExplicitDestObj = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_DestinationGetExplicitDestObj(a, b))
            return Module.getValue(b, "i8*")
          }
          a.DestinationGetFitType = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_DestinationGetFitType(a, b))
            return Module.getValue(b, "i32")
          }
          a.ObjIsNumber = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ObjIsNumber(a, b))
            return 0 !== Module.getValue(b, "i8")
          }
          a.ObjGetNumber = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ObjGetNumber(a, b))
            return Module.getValue(b, "double")
          }
          a.PDFDocGetRoot = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PDFDocGetRoot(a, b))
            return Module.getValue(b, "i8*")
          }
          a.ObjPutName = function (a, b, c) {
            b = Module.allocate(Module.intArrayFromString(b), "i8", Module.ALLOC_STACK)
            c = Module.allocate(Module.intArrayFromString(c), "i8", Module.ALLOC_STACK)
            var d = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ObjPutName(a, b, c, d))
            return Module.getValue(d, "i8*")
          }
          a.ObjPutDict = function (a, b) {
            b = Module.allocate(Module.intArrayFromString(b), "i8", Module.ALLOC_STACK)
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ObjPutDict(a, b, c))
            return Module.getValue(c, "i8*")
          }
          a.ObjPutString = function (a, b, c) {
            b = Module.allocate(Module.intArrayFromString(b), "i8", Module.ALLOC_STACK)
            c = Module.allocate(Module.intArrayFromString(c), "i8", Module.ALLOC_STACK)
            var d = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ObjPutString(a, b, c, d))
            return Module.getValue(d, "i8*")
          }
          a.ObjPut = function (a, b, c) {
            b = Module.allocate(Module.intArrayFromString(b), "i8", Module.ALLOC_STACK)
            var d = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ObjPut(a, b, c, d))
            return Module.getValue(d, "i8*")
          }
          a.ObjGetAt = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ObjGetAt(a, b, c))
            return Module.getValue(c, "i8*")
          }
          a.Matrix2DInverse = function (a) {
            var b = Module.allocate(48, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_Matrix2DInverse(a, b))
            return b
          }
          a.PDFDocInitSecurityHandler = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PDFDocInitSecurityHandler(a, 0, b))
            return 0 !== Module.getValue(b, "i8")
          }
          a.PDFDocInitStdSecurityHandler = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(
              Module._TRN_PDFDocInitStdSecurityHandlerUString(
                a,
                Module.GetUStringFromJSString(b),
                c
              )
            )
            return 0 !== Module.getValue(c, "i8")
          }
          a.PDFDocInsertPages = function (a, b, c, d, e) {
            REX(Module._TRN_PDFDocInsertPageSet(a, b, c, d, e ? 1 : 0, 0))
          }
          a.PDFDocMovePages = function (a, b, c) {
            REX(Module._TRN_PDFDocMovePageSet(a, b, a, c, 0, 0))
          }
          a.PDFDocGetPageIterator = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PDFDocGetPageIterator(a, b, c))
            return Module.getValue(c, "i8*")
          }
          a.PDFDocPageRemove = function (a, b) {
            REX(Module._TRN_PDFDocPageRemove(a, b))
          }
          a.PDFDocPageCreate = function (a, b, c) {
            var d = Module.allocate(40, "i8", Module.ALLOC_STACK)
            Module.setValue(d, 0, "double")
            Module.setValue(d + 8, 0, "double")
            Module.setValue(d + 16, b, "double")
            Module.setValue(d + 24, c, "double")
            Module.setValue(d + 32, 0, "double")
            b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PDFDocPageCreate(a, d, b))
            return Module.getValue(b, "i8*")
          }
          a.PDFDocPageInsert = function (a, b, c) {
            REX(Module._TRN_PDFDocPageInsert(a, b, c))
          }
          a.PageSetCreate = function () {
            var a = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PageSetCreate(a))
            return Module.getValue(a, "i8*")
          }
          a.PageSetCreateRange = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PageSetCreateRange(c, a, b))
            return Module.getValue(c, "i8*")
          }
          a.PageSetAddPage = function (a, b) {
            REX(Module._TRN_PageSetAddPage(a, b))
          }
          a.ElementBuilderCreate = function () {
            var a = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ElementBuilderCreate(a))
            return Module.getValue(a, "i8*")
          }
          a.ElementBuilderDestroy = function (a) {
            REX(Module._TRN_ElementBuilderDestroy(a))
          }
          a.ElementBuilderCreateImage = function (a, b, c, d, e, g) {
            var k = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ElementBuilderCreateImageScaled(a, b, c, d, e, g, k))
            return Module.getValue(k, "i8*")
          }
          a.ElementWriterCreate = function () {
            var a = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ElementWriterCreate(a))
            return Module.getValue(a, "i8*")
          }
          a.ElementWriterDestroy = function (a) {
            REX(Module._TRN_ElementWriterDestroy(a))
          }
          a.ElementWriterBegin = function (a, b) {
            REX(Module._TRN_ElementWriterBeginOnPage(a, b, 1, 1, 1, 0))
          }
          a.ElementWriterWritePlacedElement = function (a, b) {
            REX(Module._TRN_ElementWriterWritePlacedElement(a, b))
          }
          a.ElementWriterEnd = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ElementWriterEnd(a, b))
          }
          a.ImageGetImageWidth = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ImageGetImageWidth(a, b))
            return Module.getValue(b, "i32")
          }
          a.ImageGetImageHeight = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ImageGetImageHeight(a, b))
            return Module.getValue(b, "i32")
          }
          a.ImageCreateFromMemory2 = function (a, b, c) {
            var d = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ImageCreateFromMemory2(a, b, c, 0, d))
            return Module.getValue(d, "i8*")
          }
          a.ImageCreateFromFile = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_ImageCreateFromFile(a, b, 0, c))
            return Module.getValue(c, "i8*")
          }
          a.PDFDocPagePushBack = function (a, b) {
            REX(Module._TRN_PDFDocPagePushBack(a, b))
          }
          a.PDFDocHasOC = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PDFDocHasOC(a, b))
            return 0 !== Module.getValue(b, "i8")
          }
          a.PDFDocGetOCGConfig = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_PDFDocGetOCGConfig(a, b))
            return Module.getValue(b, "i8*")
          }
          a.OCGContextCreate = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK)
            REX(Module._TRN_OCGContextCreateFromConfig(a, b))
            return Module.getValue(b, "i8*")
          }
          a.UStringDestroy = function (a) {
            REX(Module._TRN_UStringDestroy(a))
          }
          a.PDFDocFDFUpdate = function (a, b, c) {
            if (c) {
              for (
                var d = Object.keys(c), e = d.length, k = Module._malloc(8 * e), f = 0;
                f < e;
                ++f
              ) {
                var g = 8 * f,
                  h = d[f],
                  p = Module.GetDoc(c[h])
                h = Module.GetUStringFromJSString(h)
                Module.setValue(k + g, p, "i8*")
                Module.setValue(k + g + 4, h, "i8*")
              }
              REX(Module._TRN_PDFDocFDFUpdateAppearanceDocs(a, b, k, e))
            } else REX(Module._TRN_PDFDocFDFUpdate(a, b))
          }
          a.FDFDocDestroy = function (a) {
            REX(Module._TRN_FDFDocDestroy(a))
          }
        })(n.Module)
      }.call(this, g(7).setImmediate))
    },
    function (e, n, g) {
      function d(e) {
        "@babel/helpers - typeof"
        return (
          (d =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (c) {
                  return typeof c
                }
              : function (c) {
                  return c &&
                    "function" == typeof Symbol &&
                    c.constructor === Symbol &&
                    c !== Symbol.prototype
                    ? "symbol"
                    : typeof c
                }),
          d(e)
        )
      }
      ;(function (e) {
        e.SetupPDFNetFunctions = function (c) {
          Module._IB_ = []
          for (
            var g = function A(a) {
                if ("object" === d(a) && null !== a)
                  if ("undefined" !== typeof a.byteLength) {
                    var b = Module._IB_.length
                    Module._IB_[b] = new Uint8Array(a)
                    a = { handle: b, isArrayBufferRef: !0 }
                  } else
                    Object.keys(a).forEach(function (b) {
                      a.hasOwnProperty(b) && (a[b] = A(a[b]))
                    })
                return a
              },
              a = function q(a) {
                "object" === d(a) &&
                  null !== a &&
                  (a.buffer
                    ? (a = a.buffer.slice(a.byteOffset, a.byteOffset + a.length))
                    : a.isArrayBufferRef
                    ? (a = Module._IB_[a.handle].buffer)
                    : Object.keys(a).forEach(function (b) {
                        a.hasOwnProperty(b) && (a[b] = q(a[b]))
                      }))
                return a
              },
              b = Module._TRN_EMSCreateSharedWorkerInstance(),
              h,
              m = Module._TRN_EMSWorkerInstanceGetFunctionIterator(b),
              n = function (c, d) {
                return new Promise(function (e, h) {
                  c = g(c)
                  var p = c.docId
                  p = p ? Module.GetDoc(p) : 0
                  ;(p = Module.EMSCallSharedFunction(b, d, p))
                    ? h({ type: "InvalidPDF", message: Module.GetErrToString(p) })
                    : ((h = Module.EMSGetLastResponse(b)), (h = a(h)), e(h))
                })
              };
            (h = Module._TRN_EMSFunctionIteratorGetNextCommandName(m));

          )
            (h = Module.GetJSStringFromCString(h)), e.queue.onAsync(h, n)
          Module._TRN_EMSFunctionIteratorDestroy(m)
          if (Module._TRN_EMSCreatePDFNetWorkerInstance) {
            var p = {}
            m = function (a, b) {
              c.on(a, b)
              p[a] = !0
            }
            Module.docPtrStringToIdMap = {}
            var u = function (a) {
              if (a in Module.docPtrStringToIdMap) return Module.docPtrStringToIdMap[a]
              throw Error("Couldn't find document ".concat(a))
            }
            e.queue.onAsync("PDFDoc.RequirePage", function (a) {
              return Module.RequirePage(u(a.docId), a.pageNum)
            })
            m("pdfDocCreateFromBuffer", function (a) {
              a = Module.CreateDoc({ type: "array", value: a.buf })
              var b = Module.GetDoc(a).toString(16)
              Module.docPtrStringToIdMap[b] = a
              return b
            })
            m("PDFDoc.destroy", function (a) {
              a = u(a.auto_dealloc_obj)
              Module.DeleteDoc(a)
            })
            m("PDFDoc.saveMemoryBuffer", function (a) {
              var b = u(a.doc)
              return Module.SaveHelper(Module.GetDoc(b), b, a.flags).slice(0)
            })
            m("pdfDocCreate", function () {
              var a = Module.CreateDoc({ type: "new" }),
                b = Module.GetDoc(a).toString(16)
              Module.docPtrStringToIdMap[b] = a
              return b
            })
            m("GetPDFDoc", function (a) {
              a = a.docId
              var b = Module.GetDoc(a).toString(16)
              Module.docPtrStringToIdMap[b] = a
              return b
            })
            m("ExtractPDFNetLayersContext", function (a) {
              var b = a.layers
              a = Module.GetDoc(a.docId)
              var c = 0
              b
                ? (c = Module.EMSCreateUpdatedLayersContext(a, b))
                : Module.PDFDocHasOC(a) &&
                  ((b = Module.PDFDocGetOCGConfig(a)), (c = Module.OCGContextCreate(b)))
              return c.toString(16)
            })
            var z = Module._TRN_EMSCreatePDFNetWorkerInstance()
            m = Module._TRN_EMSWorkerInstanceGetFunctionIterator(z)
            for (
              n = function (b) {
                return new Promise(function (c, d) {
                  b = g(b)
                  var e = Module.EMSCallPDFNetFunction(z, b)
                  e
                    ? d(Module.GetErrToString(e))
                    : ((d = Module.EMSGetLastResponse(z)), (d = a(d)), c(d))
                })
              };
              (h = Module._TRN_EMSFunctionIteratorGetNextCommandName(m));

            )
              if (((h = Module.GetJSStringFromCString(h)), !p[h])) c.onAsync(h, n)
            Module._TRN_EMSFunctionIteratorDestroy(m)
          }
        }
      })(self)
    },
    function (e, n, g) {
      e = g(6)
      var d = g.n(e),
        m = g(16),
        c = g(17),
        r = g(11),
        a = g(1)
      ;(function (b) {
        var e = null
        b.basePath = "../"
        var g = function () {
          var c = b.pdfWorkerPath || ""
          b.workerBasePath && (b.basePath = b.workerBasePath)
          var d = b.isFull,
            e = d ? "full/" : "lean/",
            g = b.wasmDisabled
          Object(a.c)()
          b.overriddenPdfWorkerPath &&
            ((c = b.overriddenPdfWorkerPath), (b.basePath = "../"), !Object(r.b)() || g) &&
            (c = "")
          b.basePath = b.externalPath ? b.externalPath : b.basePath + "external/"
          var h = b.isAndroid && d && !g ? "Android" : ""
          Object(r.a)(
            "".concat(c + e, "PDFNetC").concat(h),
            {
              "Wasm.wasm": d ? 1e7 : 4e6,
              "Wasm.js.mem": 1e5,
              ".js.mem": 6e6,
              ".mem": d ? 2e6 : 4e5,
            },
            g
          )
        }
        b.EmscriptenPDFManager = function () {}
        b.EmscriptenPDFManager.prototype = {
          OnInitialized: function (b) {
            Module.loaded
              ? b()
              : ((Module.initCb = function () {
                  b()
                }),
                Object(a.b)("worker", "PDFNet is not initialized yet!"))
          },
          NewDoc: function (a, b) {
            return new Promise(function (c, d) {
              try {
                c(Module.loadDoc(a, b))
              } catch (w) {
                d(w)
              }
            })
          },
          Initialize: function (a, c, d, e) {
            a && (Module.TOTAL_MEMORY = a)
            Module.memoryInitializerPrefixURL = c
            Module.asmjsPrefix = d
            b.basePath = e
            g()
          },
          shouldRunRender: function (a) {
            return Module.ShouldRunRender(a.docId, a.pageIndex + 1)
          },
        }
        var n = {
          setup: function (c) {
            function g(c) {
              var d = c.data,
                k = c.action
              var f = "GetCanvas" === k || "GetCanvasPartial" === k ? r.shouldRunRender(d) : !0
              if (f) {
                e = c
                var g = c.asyncCallCapability
                Object(a.b)("Memory", "Worker running command: ".concat(k))
                q.actionMap[k](d, c).then(
                  function (a) {
                    "BeginOperation" !== e.action && (e = null)
                    g.resolve(a)
                  },
                  function (a) {
                    e = null
                    g.reject(a)
                  }
                )
              } else b.deferredQueue.queue(c), n()
            }
            function h(a) {
              a.asyncCallCapability = createPromiseCapability()
              e || q.length ? q.queue(a) : g(a)
              return a.asyncCallCapability.promise
            }
            function p(a) {
              self.shouldResize &&
                r.Initialize(
                  a.options.workerHeapSize,
                  a.options.pdfResourcePath,
                  a.options.pdfAsmPath,
                  a.options.parentUrl
                )
              Module.chunkMax = a.options.chunkMax
              if (a.array instanceof Uint8Array) {
                var d = 255 === a.array[0]
                c.postMessageTransfers = d
                "response" in new XMLHttpRequest()
                  ? r.OnInitialized(function () {
                      b.SetupPDFNetFunctions(c)
                      F()
                      c.send("test", { supportTypedArray: !0, supportTransfers: d })
                    })
                  : c.send("test", !1)
              } else c.send("test", !1)
            }
            function n() {
              m.a.setImmediate(function () {
                if ((!e || "BeginOperation" !== e.action) && q.length && !e) {
                  var a = q.dequeue()
                  g(a)
                }
              })
            }
            var r = new b.EmscriptenPDFManager(),
              q,
              v = !1,
              y = !1
            Module.workerMessageHandler = c
            var F = function () {
              v ? y || (c.send("workerLoaded", {}), (y = !0)) : (v = !0)
            }
            r.OnInitialized(F)
            ;(function () {
              b.queue = q = new d.a({
                strategy: d.a.ArrayStrategy,
                comparator: function (a, b) {
                  return a.priority === b.priority
                    ? a.callbackId - b.callbackId
                    : b.priority - a.priority
                },
              })
              b.deferredQueue = new d.a({
                strategy: d.a.ArrayStrategy,
                comparator: function (a, b) {
                  return a.priority === b.priority
                    ? a.callbackId - b.callbackId
                    : b.priority - a.priority
                },
              })
              q.actionMap = {}
              q.onAsync = function (a, b) {
                c.onAsync(a, h)
                q.actionMap[a] = b
              }
            })()
            c.on("test", p)
            c.on("InitWorker", p)
            var f = function (a) {
                e && a(e) && (Module.cancelCurrent(), (e = null))
                q.removeAllMatching(a, function (a) {
                  a.asyncCallCapability.reject({
                    type: "Cancelled",
                    message:
                      "Operation was cancelled due to a change affecting the loaded document.",
                  })
                })
              },
              l = function (a) {
                f(function (b) {
                  return b.data && b.data.docId === a
                })
              }
            c.on("UpdatePassword", function (a) {
              return Module.UpdatePassword(a.docId, a.password)
            })
            c.on("LoadRes", function (a) {
              Module.loadResources(a.array, a.l)
              return {}
            })
            c.on("DownloaderHint", function (a) {
              Module.DownloaderHint(a.docId, a.hint)
            })
            c.on("IsLinearized", function (a) {
              return Module.IsLinearizationValid(a.docId)
            })
            c.onNextAsync(n)
            q.onAsync("NewDoc", function (a) {
              return r.NewDoc(a)
            })
            q.onAsync("GetCanvas", function (b) {
              Object(a.b)(
                "workerdetails",
                "Run GetCanvas PageIdx: ".concat(b.pageIndex, " Width: ").concat(b.width)
              )
              Object(a.b)(
                "Memory",
                "loadCanvas with potential memory usage ".concat(b.width * b.height * 8)
              )
              return Module.loadCanvas(
                b.docId,
                b.pageIndex,
                b.width,
                b.height,
                b.rotation,
                null,
                b.layers,
                b.renderOptions
              )
            })
            q.onAsync("GetCanvasPartial", function (b) {
              Object(a.b)(
                "Memory",
                "GetCanvasPartial with potential memory usage ".concat(b.width * b.height * 8)
              )
              return Module.loadCanvas(
                b.docId,
                b.pageIndex,
                b.width,
                b.height,
                b.rotation,
                b.bbox,
                b.layers,
                b.renderOptions
              )
            })
            q.onAsync("SaveDoc", function (a) {
              return Module.SaveDoc(
                a.docId,
                a.xfdfString,
                a.finishedWithDocument,
                a.printDocument,
                a.flags,
                a.watermarks,
                a.apdocs
              )
            })
            q.onAsync("SaveDocFromFixedElements", function (a) {
              return Module.SaveDocFromFixedElements(a.bytes, a.xfdfString, a.flags, a.watermarks)
            })
            q.onAsync("MergeXFDF", function (a) {
              return Module.MergeXFDF(a.docId, a.xfdf, a.apdocs)
            })
            q.onAsync("InsertPages", function (a) {
              return Module.InsertPages(
                a.docId,
                a.doc,
                a.pageArray,
                a.destPos,
                a.insertBookmarks,
                a.skipUpdateEvent
              )
            })
            q.onAsync("MovePages", function (a) {
              return Module.MovePages(a.docId, a.pageArray, a.destPos)
            })
            q.onAsync("RemovePages", function (a) {
              return Module.RemovePages(a.docId, a.pageArray, a.skipUpdateEvent)
            })
            q.onAsync("RotatePages", function (a) {
              return Module.RotatePages(a.docId, a.pageArray, a.rotation)
            })
            q.onAsync("ExtractPages", function (a) {
              return Module.ExtractPages(a.docId, a.pageArray, a.xfdfString, a.watermarks, a.apdocs)
            })
            q.onAsync("CropPages", function (a) {
              return Module.CropPages(
                a.docId,
                a.pageArray,
                a.topMargin,
                a.botMargin,
                a.leftMargin,
                a.rightMargin
              )
            })
            q.onAsync("InsertBlankPages", function (a) {
              return Module.InsertBlankPages(a.docId, a.pageArray, a.width, a.height)
            })
            q.onAsync("BeginOperation", function () {
              return Promise.resolve()
            })
            q.onAsync("RequirePage", function (a, b) {
              return Module.RequirePage(a.docId, a.pageNum)
            })
            c.on("FinishOperation", function () {
              if (e && "BeginOperation" === e.action) (e = null), n()
              else throw { message: "Operation has not started." }
            })
            c.on("DeleteDocument", function (a) {
              a = a.docId
              l(a)
              Module.DeleteDoc(a)
            })
            c.on("GetCanvasProgressive", function (c) {
              if (e && e.callbackId === c.callbackId) {
                Object(a.b)("worker", "Progressive request in progress")
                var d = Module.GetCurrentCanvasData(!0)
              } else {
                if (q.find({ priority: 0, callbackId: c.callbackId }))
                  throw (
                    (Object(a.b)("worker", "Progressive request Queued"),
                    { type: "Queued", message: "Rendering has not started yet." })
                  )
                if (b.deferredQueue.find({ priority: 0, callbackId: c.callbackId }))
                  throw (
                    (Object(a.b)("worker", "Progressive request Deferred"),
                    { type: "Queued", message: "Rendering has not started yet." })
                  )
              }
              if (!d)
                throw (
                  (Object(a.b)("worker", "Progressive request invalid (render already complete)"),
                  { type: "Unavailable", message: "Rendering is complete or was cancelled." })
                )
              return d
            })
            c.on("actionCancel", function (c) {
              e && e.callbackId === c.callbackId
                ? (Object(a.b)("workerdetails", "Cancelled Current Operation"),
                  Module.cancelCurrent() && ((e = null), n()))
                : (Object(a.b)("workerdetails", "Cancelled queued operation"),
                  q.remove({ priority: 0, callbackId: c.callbackId }),
                  b.deferredQueue.remove({ priority: 0, callbackId: c.callbackId }))
            })
          },
        }
        b.onmessage = function (d) {
          if ("init" === d.data.action) {
            var e = d.data.shouldResize
            b.shouldResize = e
            b.isFull = d.data.isFull
            b.isAndroid = d.data.isAndroid
            b.wasmDisabled = !d.data.wasm
            b.externalPath = d.data.externalPath
            if ((d = d.data.pdfWorkerPath)) b.overriddenPdfWorkerPath = d
            e || g()
            e = new c.a("worker_processor", self)
            Object(a.a)(e)
            n.setup(e)
          }
        }
      })("undefined" === typeof window ? self : window)
    },
  ])
}.call(this || window))
