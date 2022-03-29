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
  $jscomp.arrayIteratorImpl = function (b) {
    var c = 0
    return function () {
      return c < b.length ? { done: !1, value: b[c++] } : { done: !0 }
    }
  }
  $jscomp.arrayIterator = function (b) {
    return { next: $jscomp.arrayIteratorImpl(b) }
  }
  $jscomp.makeIterator = function (b) {
    var c = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator]
    return c ? c.call(b) : $jscomp.arrayIterator(b)
  }
  $jscomp.getGlobal = function (b) {
    return "undefined" != typeof window && window === b
      ? b
      : "undefined" != typeof global && null != global
      ? global
      : b
  }
  $jscomp.global = $jscomp.getGlobal(this)
  $jscomp.ASSUME_ES5 = !1
  $jscomp.ASSUME_NO_NATIVE_MAP = !1
  $jscomp.ASSUME_NO_NATIVE_SET = !1
  $jscomp.SIMPLE_FROUND_POLYFILL = !1
  $jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
      ? Object.defineProperty
      : function (b, c, f) {
          b != Array.prototype && b != Object.prototype && (b[c] = f.value)
        }
  $jscomp.polyfill = function (b, c, f, a) {
    if (c) {
      f = $jscomp.global
      b = b.split(".")
      for (a = 0; a < b.length - 1; a++) {
        var g = b[a]
        g in f || (f[g] = {})
        f = f[g]
      }
      b = b[b.length - 1]
      a = f[b]
      c = c(a)
      c != a &&
        null != c &&
        $jscomp.defineProperty(f, b, { configurable: !0, writable: !0, value: c })
    }
  }
  $jscomp.FORCE_POLYFILL_PROMISE = !1
  $jscomp.polyfill(
    "Promise",
    function (b) {
      function c() {
        this.batch_ = null
      }
      function f(a) {
        return a instanceof g
          ? a
          : new g(function (d, e) {
              d(a)
            })
      }
      if (b && !$jscomp.FORCE_POLYFILL_PROMISE) return b
      c.prototype.asyncExecute = function (a) {
        null == this.batch_ && ((this.batch_ = []), this.asyncExecuteBatch_())
        this.batch_.push(a)
        return this
      }
      c.prototype.asyncExecuteBatch_ = function () {
        var a = this
        this.asyncExecuteFunction(function () {
          a.executeBatch_()
        })
      }
      var a = $jscomp.global.setTimeout
      c.prototype.asyncExecuteFunction = function (b) {
        a(b, 0)
      }
      c.prototype.executeBatch_ = function () {
        for (; this.batch_ && this.batch_.length; ) {
          var a = this.batch_
          this.batch_ = []
          for (var d = 0; d < a.length; ++d) {
            var e = a[d]
            a[d] = null
            try {
              e()
            } catch (l) {
              this.asyncThrow_(l)
            }
          }
        }
        this.batch_ = null
      }
      c.prototype.asyncThrow_ = function (a) {
        this.asyncExecuteFunction(function () {
          throw a
        })
      }
      var g = function (a) {
        this.state_ = 0
        this.result_ = void 0
        this.onSettledCallbacks_ = []
        var d = this.createResolveAndReject_()
        try {
          a(d.resolve, d.reject)
        } catch (e) {
          d.reject(e)
        }
      }
      g.prototype.createResolveAndReject_ = function () {
        function a(a) {
          return function (b) {
            e || ((e = !0), a.call(d, b))
          }
        }
        var d = this,
          e = !1
        return { resolve: a(this.resolveTo_), reject: a(this.reject_) }
      }
      g.prototype.resolveTo_ = function (a) {
        if (a === this) this.reject_(new TypeError("A Promise cannot resolve to itself"))
        else if (a instanceof g) this.settleSameAsPromise_(a)
        else {
          a: switch (typeof a) {
            case "object":
              var d = null != a
              break a
            case "function":
              d = !0
              break a
            default:
              d = !1
          }
          d ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a)
        }
      }
      g.prototype.resolveToNonPromiseObj_ = function (a) {
        var d = void 0
        try {
          d = a.then
        } catch (e) {
          this.reject_(e)
          return
        }
        "function" == typeof d ? this.settleSameAsThenable_(d, a) : this.fulfill_(a)
      }
      g.prototype.reject_ = function (a) {
        this.settle_(2, a)
      }
      g.prototype.fulfill_ = function (a) {
        this.settle_(1, a)
      }
      g.prototype.settle_ = function (a, d) {
        if (0 != this.state_)
          throw Error(
            "Cannot settle(" + a + ", " + d + "): Promise already settled in state" + this.state_
          )
        this.state_ = a
        this.result_ = d
        this.executeOnSettledCallbacks_()
      }
      g.prototype.executeOnSettledCallbacks_ = function () {
        if (null != this.onSettledCallbacks_) {
          for (var a = 0; a < this.onSettledCallbacks_.length; ++a)
            h.asyncExecute(this.onSettledCallbacks_[a])
          this.onSettledCallbacks_ = null
        }
      }
      var h = new c()
      g.prototype.settleSameAsPromise_ = function (a) {
        var d = this.createResolveAndReject_()
        a.callWhenSettled_(d.resolve, d.reject)
      }
      g.prototype.settleSameAsThenable_ = function (a, d) {
        var e = this.createResolveAndReject_()
        try {
          a.call(d, e.resolve, e.reject)
        } catch (l) {
          e.reject(l)
        }
      }
      g.prototype.then = function (a, d) {
        function e(a, e) {
          return "function" == typeof a
            ? function (e) {
                try {
                  b(a(e))
                } catch (p) {
                  c(p)
                }
              }
            : e
        }
        var b,
          c,
          f = new g(function (a, e) {
            b = a
            c = e
          })
        this.callWhenSettled_(e(a, b), e(d, c))
        return f
      }
      g.prototype.catch = function (a) {
        return this.then(void 0, a)
      }
      g.prototype.callWhenSettled_ = function (a, d) {
        function e() {
          switch (b.state_) {
            case 1:
              a(b.result_)
              break
            case 2:
              d(b.result_)
              break
            default:
              throw Error("Unexpected state: " + b.state_)
          }
        }
        var b = this
        null == this.onSettledCallbacks_ ? h.asyncExecute(e) : this.onSettledCallbacks_.push(e)
      }
      g.resolve = f
      g.reject = function (a) {
        return new g(function (b, e) {
          e(a)
        })
      }
      g.race = function (a) {
        return new g(function (b, e) {
          for (var d = $jscomp.makeIterator(a), g = d.next(); !g.done; g = d.next())
            f(g.value).callWhenSettled_(b, e)
        })
      }
      g.all = function (a) {
        var b = $jscomp.makeIterator(a),
          e = b.next()
        return e.done
          ? f([])
          : new g(function (a, d) {
              function g(e) {
                return function (b) {
                  c[e] = b
                  l--
                  0 == l && a(c)
                }
              }
              var c = [],
                l = 0
              do
                c.push(void 0), l++, f(e.value).callWhenSettled_(g(c.length - 1), d), (e = b.next())
              while (!e.done)
            })
      }
      return g
    },
    "es6",
    "es3"
  )
  $jscomp.checkStringArgs = function (b, c, f) {
    if (null == b)
      throw new TypeError(
        "The 'this' value for String.prototype." + f + " must not be null or undefined"
      )
    if (c instanceof RegExp)
      throw new TypeError(
        "First argument to String.prototype." + f + " must not be a regular expression"
      )
    return b + ""
  }
  $jscomp.polyfill(
    "String.prototype.endsWith",
    function (b) {
      return b
        ? b
        : function (b, f) {
            var a = $jscomp.checkStringArgs(this, b, "endsWith")
            b += ""
            void 0 === f && (f = a.length)
            f = Math.max(0, Math.min(f | 0, a.length))
            for (var g = b.length; 0 < g && 0 < f; ) if (a[--f] != b[--g]) return !1
            return 0 >= g
          }
    },
    "es6",
    "es3"
  )
  $jscomp.checkEs6ConformanceViaProxy = function () {
    try {
      var b = {},
        c = Object.create(
          new $jscomp.global.Proxy(b, {
            get: function (f, a, g) {
              return f == b && "q" == a && g == c
            },
          })
        )
      return !0 === c.q
    } catch (f) {
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
    var b = 0
    return function (c) {
      return $jscomp.SYMBOL_PREFIX + (c || "") + b++
    }
  })()
  $jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol()
    var b = $jscomp.global.Symbol.iterator
    b || (b = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"))
    "function" != typeof Array.prototype[b] &&
      $jscomp.defineProperty(Array.prototype, b, {
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
    var b = $jscomp.global.Symbol.asyncIterator
    b || (b = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"))
    $jscomp.initSymbolAsyncIterator = function () {}
  }
  $jscomp.iteratorPrototype = function (b) {
    $jscomp.initSymbolIterator()
    b = { next: b }
    b[$jscomp.global.Symbol.iterator] = function () {
      return this
    }
    return b
  }
  $jscomp.owns = function (b, c) {
    return Object.prototype.hasOwnProperty.call(b, c)
  }
  $jscomp.polyfill(
    "WeakMap",
    function (b) {
      function c() {
        if (!b || !Object.seal) return !1
        try {
          var a = Object.seal({}),
            d = Object.seal({}),
            g = new b([
              [a, 2],
              [d, 3],
            ])
          if (2 != g.get(a) || 3 != g.get(d)) return !1
          g.delete(a)
          g.set(d, 4)
          return !g.has(a) && 4 == g.get(d)
        } catch (v) {
          return !1
        }
      }
      function f() {}
      function a(a) {
        if (!$jscomp.owns(a, h)) {
          var e = new f()
          $jscomp.defineProperty(a, h, { value: e })
        }
      }
      function g(e) {
        var b = Object[e]
        b &&
          (Object[e] = function (e) {
            if (e instanceof f) return e
            a(e)
            return b(e)
          })
      }
      if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (b && $jscomp.ES6_CONFORMANCE) return b
      } else if (c()) return b
      var h = "$jscomp_hidden_" + Math.random()
      g("freeze")
      g("preventExtensions")
      g("seal")
      var k = 0,
        d = function (a) {
          this.id_ = (k += Math.random() + 1).toString()
          if (a) {
            a = $jscomp.makeIterator(a)
            for (var e; !(e = a.next()).done; ) (e = e.value), this.set(e[0], e[1])
          }
        }
      d.prototype.set = function (e, b) {
        a(e)
        if (!$jscomp.owns(e, h)) throw Error("WeakMap key fail: " + e)
        e[h][this.id_] = b
        return this
      }
      d.prototype.get = function (a) {
        return $jscomp.owns(a, h) ? a[h][this.id_] : void 0
      }
      d.prototype.has = function (a) {
        return $jscomp.owns(a, h) && $jscomp.owns(a[h], this.id_)
      }
      d.prototype.delete = function (a) {
        return $jscomp.owns(a, h) && $jscomp.owns(a[h], this.id_) ? delete a[h][this.id_] : !1
      }
      return d
    },
    "es6",
    "es3"
  )
  $jscomp.MapEntry = function () {}
  $jscomp.polyfill(
    "Map",
    function (b) {
      function c() {
        if (
          $jscomp.ASSUME_NO_NATIVE_MAP ||
          !b ||
          "function" != typeof b ||
          !b.prototype.entries ||
          "function" != typeof Object.seal
        )
          return !1
        try {
          var a = Object.seal({ x: 4 }),
            d = new b($jscomp.makeIterator([[a, "s"]]))
          if (
            "s" != d.get(a) ||
            1 != d.size ||
            d.get({ x: 4 }) ||
            d.set({ x: 4 }, "t") != d ||
            2 != d.size
          )
            return !1
          var g = d.entries(),
            c = g.next()
          if (c.done || c.value[0] != a || "s" != c.value[1]) return !1
          c = g.next()
          return c.done || 4 != c.value[0].x || "t" != c.value[1] || !g.next().done ? !1 : !0
        } catch (q) {
          return !1
        }
      }
      if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (b && $jscomp.ES6_CONFORMANCE) return b
      } else if (c()) return b
      $jscomp.initSymbolIterator()
      var f = new WeakMap(),
        a = function (a) {
          this.data_ = {}
          this.head_ = k()
          this.size = 0
          if (a) {
            a = $jscomp.makeIterator(a)
            for (var e; !(e = a.next()).done; ) (e = e.value), this.set(e[0], e[1])
          }
        }
      a.prototype.set = function (a, b) {
        a = 0 === a ? 0 : a
        var e = g(this, a)
        e.list || (e.list = this.data_[e.id] = [])
        e.entry
          ? (e.entry.value = b)
          : ((e.entry = {
              next: this.head_,
              previous: this.head_.previous,
              head: this.head_,
              key: a,
              value: b,
            }),
            e.list.push(e.entry),
            (this.head_.previous.next = e.entry),
            (this.head_.previous = e.entry),
            this.size++)
        return this
      }
      a.prototype.delete = function (a) {
        a = g(this, a)
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
      a.prototype.clear = function () {
        this.data_ = {}
        this.head_ = this.head_.previous = k()
        this.size = 0
      }
      a.prototype.has = function (a) {
        return !!g(this, a).entry
      }
      a.prototype.get = function (a) {
        return (a = g(this, a).entry) && a.value
      }
      a.prototype.entries = function () {
        return h(this, function (a) {
          return [a.key, a.value]
        })
      }
      a.prototype.keys = function () {
        return h(this, function (a) {
          return a.key
        })
      }
      a.prototype.values = function () {
        return h(this, function (a) {
          return a.value
        })
      }
      a.prototype.forEach = function (a, b) {
        for (var e = this.entries(), d; !(d = e.next()).done; )
          (d = d.value), a.call(b, d[1], d[0], this)
      }
      a.prototype[Symbol.iterator] = a.prototype.entries
      var g = function (a, b) {
          var e = b && typeof b
          "object" == e || "function" == e
            ? f.has(b)
              ? (e = f.get(b))
              : ((e = "" + ++d), f.set(b, e))
            : (e = "p_" + b)
          var g = a.data_[e]
          if (g && $jscomp.owns(a.data_, e))
            for (a = 0; a < g.length; a++) {
              var c = g[a]
              if ((b !== b && c.key !== c.key) || b === c.key)
                return { id: e, list: g, index: a, entry: c }
            }
          return { id: e, list: g, index: -1, entry: void 0 }
        },
        h = function (a, b) {
          var e = a.head_
          return $jscomp.iteratorPrototype(function () {
            if (e) {
              for (; e.head != a.head_; ) e = e.previous
              for (; e.next != e.head; ) return (e = e.next), { done: !1, value: b(e) }
              e = null
            }
            return { done: !0, value: void 0 }
          })
        },
        k = function () {
          var a = {}
          return (a.previous = a.next = a.head = a)
        },
        d = 0
      return a
    },
    "es6",
    "es3"
  )
  $jscomp.underscoreProtoCanBeSet = function () {
    var b = { a: !0 },
      c = {}
    try {
      return (c.__proto__ = b), c.a
    } catch (f) {}
    return !1
  }
  $jscomp.setPrototypeOf =
    "function" == typeof Object.setPrototypeOf
      ? Object.setPrototypeOf
      : $jscomp.underscoreProtoCanBeSet()
      ? function (b, c) {
          b.__proto__ = c
          if (b.__proto__ !== c) throw new TypeError(b + " is not extensible")
          return b
        }
      : null
  $jscomp.polyfill(
    "Object.setPrototypeOf",
    function (b) {
      return b || $jscomp.setPrototypeOf
    },
    "es6",
    "es5"
  )
  $jscomp.assign =
    "function" == typeof Object.assign
      ? Object.assign
      : function (b, c) {
          for (var f = 1; f < arguments.length; f++) {
            var a = arguments[f]
            if (a) for (var g in a) $jscomp.owns(a, g) && (b[g] = a[g])
          }
          return b
        }
  $jscomp.polyfill(
    "Object.assign",
    function (b) {
      return b || $jscomp.assign
    },
    "es6",
    "es3"
  )
  ;(function (b) {
    function c(a) {
      if (f[a]) return f[a].exports
      var g = (f[a] = { i: a, l: !1, exports: {} })
      b[a].call(g.exports, g, g.exports, c)
      g.l = !0
      return g.exports
    }
    var f = {}
    c.m = b
    c.c = f
    c.d = function (a, b, f) {
      c.o(a, b) || Object.defineProperty(a, b, { enumerable: !0, get: f })
    }
    c.r = function (a) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(a, Symbol.toStringTag, { value: "Module" })
      Object.defineProperty(a, "__esModule", { value: !0 })
    }
    c.t = function (a, b) {
      b & 1 && (a = c(a))
      if (b & 8 || (b & 4 && "object" === typeof a && a && a.__esModule)) return a
      var g = Object.create(null)
      c.r(g)
      Object.defineProperty(g, "default", { enumerable: !0, value: a })
      if (b & 2 && "string" != typeof a)
        for (var f in a)
          c.d(
            g,
            f,
            function (b) {
              return a[b]
            }.bind(null, f)
          )
      return g
    }
    c.n = function (a) {
      var b =
        a && a.__esModule
          ? function () {
              return a["default"]
            }
          : function () {
              return a
            }
      c.d(b, "a", b)
      return b
    }
    c.o = function (a, b) {
      return Object.prototype.hasOwnProperty.call(a, b)
    }
    c.p = "/core/office/"
    return c((c.s = 13))
  })([
    function (b, c, f) {
      f.d(c, "c", function () {
        return g
      })
      f.d(c, "a", function () {
        return k
      })
      f.d(c, "b", function () {
        return h
      })
      var a = f(2),
        g = function (b, e) {
          Object(a.a)("disableLogs") || (e ? console.warn(b + ": " + e) : console.warn(b))
        },
        h = function (a, b, c) {
          var e = c.pop()
          c = c.length ? c.join(", ") + " and " + e : e
          g("'" + b + "' is deprecated since version " + a + ". Please use " + c + " instead.")
        },
        k = function (a, b) {}
    },
    function (b, c, f) {
      f.d(c, "a", function () {
        return u
      })
      f.d(c, "b", function () {
        return A
      })
      f.d(c, "c", function () {
        return E
      })
      var a = f(8),
        g = f(0),
        h = f(4),
        k = f(3),
        d = "undefined" === typeof window ? self : window,
        e = d.importScripts,
        l = !1,
        y = function (a, b) {
          l || (e(d.basePath + "decode.min.js"), (l = !0))
          a = self.BrotliDecode(Object(k.b)(a))
          return b ? a : Object(k.a)(a)
        },
        v = function (b, e) {
          return Object(a.a)(void 0, void 0, Promise, function () {
            var d
            return Object(a.b)(this, function (a) {
              switch (a.label) {
                case 0:
                  return l
                    ? [3, 2]
                    : [
                        4,
                        Object(h.a)(
                          self.Core.getWorkerPath() + "external/decode.min.js",
                          "Failed to download decode.min.js",
                          window
                        ),
                      ]
                case 1:
                  a.sent(), (l = !0), (a.label = 2)
                case 2:
                  return (d = self.BrotliDecode(Object(k.b)(b))), [2, e ? d : Object(k.a)(d)]
              }
            })
          })
        }
      ;(function () {
        function a() {
          this.remainingDataArrays = []
        }
        a.prototype.processRaw = function (a) {
          return a
        }
        a.prototype.processBrotli = function (a) {
          this.remainingDataArrays.push(a)
          return null
        }
        a.prototype.GetNextChunk = function (a) {
          this.decodeFunction ||
            (this.decodeFunction =
              0 === a[0] && 97 === a[1] && 115 === a[2] && 109 === a[3]
                ? this.processRaw
                : this.processBrotli)
          return this.decodeFunction(a)
        }
        a.prototype.End = function () {
          if (this.remainingDataArrays.length) {
            for (var a = this.arrays, b = 0, e = 0; e < a.length; ++e) b += a[e].length
            b = new Uint8Array(b)
            var d = 0
            for (e = 0; e < a.length; ++e) {
              var c = a[e]
              b.set(c, d)
              d += c.length
            }
            return y(b, !0)
          }
          return null
        }
        return a
      })()
      var q = !1,
        r = function (a) {
          q || (e(d.basePath + "pako_inflate.min.js"), (q = !0))
          var b = 10
          if ("string" === typeof a) {
            if (a.charCodeAt(3) & 8) {
              for (; 0 !== a.charCodeAt(b); ++b);
              ++b
            }
          } else if (a[3] & 8) {
            for (; 0 !== a[b]; ++b);
            ++b
          }
          a = Object(k.b)(a)
          a = a.subarray(b, a.length - 8)
          return d.pako.inflate(a, { windowBits: -15 })
        },
        t = function (a, b) {
          return b ? a : Object(k.a)(a)
        },
        p = function (a) {
          var b = !a.shouldOutputArray,
            d = new XMLHttpRequest()
          d.open("GET", a.url, a.isAsync)
          var c = b && d.overrideMimeType
          d.responseType = c ? "text" : "arraybuffer"
          c && d.overrideMimeType("text/plain; charset=x-user-defined")
          d.send()
          var f = function () {
            var f = Date.now()
            var h = c ? d.responseText : new Uint8Array(d.response)
            Object(g.a)("worker", "Result length is " + h.length)
            h.length < a.compressedMaximum
              ? ((h = a.decompressFunction(h, a.shouldOutputArray)),
                Object(g.c)(
                  "There may be some degradation of performance. Your server has not been configured to serve .gz. and .br. files with the expected Content-Encoding. See http://www.pdftron.com/kb_content_encoding for instructions on how to resolve this."
                ),
                e && Object(g.a)("worker", "Decompressed length is " + h.length))
              : b && (h = Object(k.a)(h))
            e && Object(g.a)("worker", a.url + " Decompression took " + (Date.now() - f))
            return h
          }
          if (a.isAsync)
            var h = new Promise(function (b, e) {
              d.onload = function () {
                200 === this.status || 0 === this.status ? b(f()) : e("Download Failed " + a.url)
              }
              d.onerror = function () {
                e("Network error occurred " + a.url)
              }
            })
          else {
            if (200 === d.status || 0 === d.status) return f()
            throw Error("Failed to load " + a.url)
          }
          return h
        },
        u = function (a) {
          var b = a.lastIndexOf("/")
          ;-1 === b && (b = 0)
          var d = a.slice(b).replace(".", ".br.")
          e ||
            (d.endsWith(".js.mem")
              ? (d = d.replace(".js.mem", ".mem"))
              : d.endsWith(".js") && (d = d.concat(".mem")))
          return a.slice(0, b) + d
        },
        w = function (a, b) {
          var e = a.lastIndexOf("/")
          ;-1 === e && (e = 0)
          var d = a.slice(e).replace(".", ".gz.")
          b.url = a.slice(0, e) + d
          b.decompressFunction = r
          return p(b)
        },
        n = function (a, b) {
          b.url = u(a)
          b.decompressFunction = e ? y : v
          return p(b)
        },
        m = function (a, b) {
          a.endsWith(".js.mem")
            ? (a = a.slice(0, -4))
            : a.endsWith(".mem") && (a = a.slice(0, -4) + ".js.mem")
          b.url = a
          b.decompressFunction = t
          return p(b)
        },
        x = function (a, b, e, d) {
          return a.catch(function (a) {
            Object(g.c)(a)
            return d(b, e)
          })
        },
        z = function (a, b, e) {
          var d
          if (e.isAsync) {
            var c = b[0](a, e)
            for (d = 1; d < b.length; ++d) c = x(c, a, e, b[d])
            return c
          }
          for (d = 0; d < b.length; ++d)
            try {
              return b[d](a, e)
            } catch (I) {
              Object(g.c)(I.message)
            }
          throw Error("")
        },
        E = function (a, b, d, e) {
          return z(a, [w, n, m], { compressedMaximum: b, isAsync: d, shouldOutputArray: e })
        },
        A = function (a, b, d, e) {
          return z(a, [n, w, m], { compressedMaximum: b, isAsync: d, shouldOutputArray: e })
        }
    },
    function (b, c, f) {
      f.d(c, "a", function () {
        return h
      })
      f.d(c, "b", function () {
        return k
      })
      var a = {},
        g = {
          flattenedResources: !1,
          CANVAS_CACHE_SIZE: void 0,
          maxPagesBefore: void 0,
          maxPagesAhead: void 0,
          disableLogs: !1,
          wvsQueryParameters: {},
          _trnDebugMode: !1,
          _logFiltersEnabled: null,
        },
        h = function (a) {
          return g[a]
        },
        k = function (b, e) {
          var d
          g[b] = e
          null === (d = a[b]) || void 0 === d
            ? void 0
            : d.forEach(function (a) {
                a(e)
              })
        }
    },
    function (b, c, f) {
      f.d(c, "b", function () {
        return a
      })
      f.d(c, "a", function () {
        return g
      })
      var a = function (a) {
          if ("string" === typeof a) {
            for (var b = new Uint8Array(a.length), d = a.length, e = 0; e < d; e++)
              b[e] = a.charCodeAt(e)
            return b
          }
          return a
        },
        g = function (a) {
          if ("string" !== typeof a) {
            for (var b = "", d = 0, e = a.length, c; d < e; )
              (c = a.subarray(d, d + 1024)), (d += 1024), (b += String.fromCharCode.apply(null, c))
            return b
          }
          return a
        }
    },
    function (b, c, f) {
      function a(a, b, d) {
        return new Promise(function (e) {
          if (!a) return e()
          var c = d.document.createElement("script")
          c.type = "text/javascript"
          c.onload = function () {
            e()
          }
          c.onerror = function () {
            b && Object(g.c)(b)
            e()
          }
          c.src = a
          d.document.getElementsByTagName("head")[0].appendChild(c)
        })
      }
      f.d(c, "a", function () {
        return a
      })
      var g = f(0)
    },
    function (b, c, f) {
      function a(a, b, c) {
        function e(l) {
          f = f || Date.now()
          return l
            ? (Object(g.a)("load", "Try instantiateStreaming"),
              fetch(Object(h.a)(a))
                .then(function (a) {
                  return WebAssembly.instantiateStreaming(a, b)
                })
                .catch(function (b) {
                  Object(g.a)("load", "instantiateStreaming Failed " + a + " message " + b.message)
                  return e(!1)
                }))
            : Object(h.b)(a, c, !0, !0).then(function (a) {
                d = Date.now()
                Object(g.a)("load", "Request took " + (d - f) + " ms")
                return WebAssembly.instantiate(a, b)
              })
        }
        var d, f
        return e(!!WebAssembly.instantiateStreaming).then(function (a) {
          Object(g.a)("load", "WASM compilation took " + (Date.now() - (d || f)) + " ms")
          return a
        })
      }
      f.d(c, "a", function () {
        return a
      })
      var g = f(0),
        h = f(1),
        k = f(4)
      f.d(c, "b", function () {
        return k.a
      })
    },
    function (b, c, f) {
      f.d(c, "c", function () {
        return v
      })
      f.d(c, "b", function () {
        return q
      })
      f.d(c, "a", function () {
        return r
      })
      f(0)
      var a = "undefined" === typeof window ? self : window
      b = (function () {
        var a = navigator.userAgent.toLowerCase()
        return (a = /(msie) ([\w.]+)/.exec(a) || /(trident)(?:.*? rv:([\w.]+)|)/.exec(a))
          ? parseInt(a[2], 10)
          : a
      })()
      var g = (function () {
        var b = a.navigator.userAgent.match(/OPR/),
          e = a.navigator.userAgent.match(/Maxthon/),
          d = a.navigator.userAgent.match(/Edge/)
        return a.navigator.userAgent.match(/Chrome\/(.*?) /) && !b && !e && !d
      })()
      ;(function () {
        if (!g) return null
        var b = a.navigator.userAgent.match(/Chrome\/([0-9]+)\./)
        return b ? parseInt(b[1], 10) : b
      })()
      var h =
        !!navigator.userAgent.match(/Edge/i) ||
        (navigator.userAgent.match(/Edg\/(.*?)/) && a.navigator.userAgent.match(/Chrome\/(.*?) /))
      ;(function () {
        if (!h) return null
        var b = a.navigator.userAgent.match(/Edg\/([0-9]+)\./)
        return b ? parseInt(b[1], 10) : b
      })()
      c =
        /iPad|iPhone|iPod/.test(a.navigator.platform) ||
        ("MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints)
      var k = (function () {
          var b = a.navigator.userAgent.match(/.*\/([0-9\.]+)\s(Safari|Mobile).*/i)
          return b ? parseFloat(b[1]) : b
        })(),
        d =
          /^((?!chrome|android).)*safari/i.test(a.navigator.userAgent) ||
          (/^((?!chrome|android).)*$/.test(a.navigator.userAgent) && c)
      ;/Android/i.test(navigator.userAgent)
      var e = a.navigator.userAgent.match(/Firefox/)
      ;(function () {
        if (!e) return null
        var b = a.navigator.userAgent.match(/Firefox\/([0-9]+)\./)
        return b ? parseInt(b[1], 10) : b
      })()
      b || /Android|webOS|Touch|IEMobile|Silk/i.test(navigator.userAgent)
      navigator.userAgent.match(/(iPad|iPhone|iPod)/i)
      a.navigator.userAgent.indexOf("Android")
      var l = /Mac OS X 10_13_6.*\(KHTML, like Gecko\)$/.test(a.navigator.userAgent),
        y = a.navigator.userAgent.match(/(iPad|iPhone).+\sOS\s((\d+)(_\d)*)/i)
          ? 14 <= parseInt(a.navigator.userAgent.match(/(iPad|iPhone).+\sOS\s((\d+)(_\d)*)/i)[3])
          : !1,
        v = function () {
          return !y && ((d && 14 > k) || l)
        },
        q = !(!self.WebAssembly || !self.WebAssembly.validate),
        r =
          -1 < a.navigator.userAgent.indexOf("Edge/16") ||
          -1 < a.navigator.userAgent.indexOf("MSAppHost")
    },
    function (b, c) {
      c = (function () {
        return this
      })()
      try {
        c = c || new Function("return this")()
      } catch (f) {
        "object" === typeof window && (c = window)
      }
      b.exports = c
    },
    function (b, c, f) {
      function a(a, b, d, e) {
        function c(a) {
          return a instanceof d
            ? a
            : new d(function (b) {
                b(a)
              })
        }
        return new (d || (d = Promise))(function (d, g) {
          function f(a) {
            try {
              l(e.next(a))
            } catch (u) {
              g(u)
            }
          }
          function h(a) {
            try {
              l(e["throw"](a))
            } catch (u) {
              g(u)
            }
          }
          function l(a) {
            a.done ? d(a.value) : c(a.value).then(f, h)
          }
          l((e = e.apply(a, b || [])).next())
        })
      }
      function g(a, b) {
        function d(a) {
          return function (b) {
            return e([a, b])
          }
        }
        function e(d) {
          if (g) throw new TypeError("Generator is already executing.")
          for (; c; )
            try {
              if (
                ((g = 1),
                f &&
                  (h =
                    d[0] & 2
                      ? f["return"]
                      : d[0]
                      ? f["throw"] || ((h = f["return"]) && h.call(f), 0)
                      : f.next) &&
                  !(h = h.call(f, d[1])).done)
              )
                return h
              if (((f = 0), h)) d = [d[0] & 2, h.value]
              switch (d[0]) {
                case 0:
                case 1:
                  h = d
                  break
                case 4:
                  return c.label++, { value: d[1], done: !1 }
                case 5:
                  c.label++
                  f = d[1]
                  d = [0]
                  continue
                case 7:
                  d = c.ops.pop()
                  c.trys.pop()
                  continue
                default:
                  if (
                    !((h = c.trys), (h = 0 < h.length && h[h.length - 1])) &&
                    (6 === d[0] || 2 === d[0])
                  ) {
                    c = 0
                    continue
                  }
                  if (3 === d[0] && (!h || (d[1] > h[0] && d[1] < h[3]))) c.label = d[1]
                  else if (6 === d[0] && c.label < h[1]) (c.label = h[1]), (h = d)
                  else if (h && c.label < h[2]) (c.label = h[2]), c.ops.push(d)
                  else {
                    h[2] && c.ops.pop()
                    c.trys.pop()
                    continue
                  }
              }
              d = b.call(a, c)
            } catch (p) {
              ;(d = [6, p]), (f = 0)
            } finally {
              g = h = 0
            }
          if (d[0] & 5) throw d[1]
          return { value: d[0] ? d[1] : void 0, done: !0 }
        }
        var c = {
            label: 0,
            sent: function () {
              if (h[0] & 1) throw h[1]
              return h[1]
            },
            trys: [],
            ops: [],
          },
          g,
          f,
          h,
          k
        return (
          (k = { next: d(0), throw: d(1), return: d(2) }),
          "function" === typeof Symbol &&
            (k[Symbol.iterator] = function () {
              return this
            }),
          k
        )
      }
      f.d(c, "a", function () {
        return a
      })
      f.d(c, "b", function () {
        return g
      })
    },
    function (b, c, f) {
      c.a = function () {
        ArrayBuffer.prototype.slice ||
          (ArrayBuffer.prototype.slice = function (a, b) {
            void 0 === a && (a = 0)
            void 0 === b && (b = this.byteLength)
            a = Math.floor(a)
            b = Math.floor(b)
            0 > a && (a += this.byteLength)
            0 > b && (b += this.byteLength)
            a = Math.min(Math.max(0, a), this.byteLength)
            b = Math.min(Math.max(0, b), this.byteLength)
            if (0 >= b - a) return new ArrayBuffer(0)
            var c = new ArrayBuffer(b - a),
              f = new Uint8Array(c)
            a = new Uint8Array(this, a, b - a)
            f.set(a)
            return c
          })
      }
    },
    function (b, c, f) {
      f.d(c, "a", function () {
        return a
      })
      f(11)
      var a = function (a, b) {
        return function () {}
      }
    },
    function (b, c, f) {
      c.a = function (a) {
        var b = {}
        decodeURIComponent(a.slice(1))
          .split("&")
          .forEach(function (a) {
            a = a.split("=", 2)
            b[a[0]] = a[1]
          })
        return b
      }
    },
    function (b, c, f) {
      f.d(c, "a", function () {
        return d
      })
      var a = f(1),
        g = f(5),
        h = f(6),
        k = (function () {
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
        d = function (b, d, c) {
          if (!h.b || h.a || Object(h.c)() || c) {
            c = Object(a.b)(
              (self.Module.asmjsPrefix ? self.Module.asmjsPrefix : "") + b + ".js.mem",
              d[".js.mem"],
              !1
            )
            var e = Object(a.c)(
              (self.Module.memoryInitializerPrefixURL
                ? self.Module.memoryInitializerPrefixURL
                : "") +
                b +
                ".mem",
              d[".mem"],
              !0,
              !0
            )
            self.Module.memoryInitializerRequest = new k(e)
          } else
            (self.Module.instantiateWasm = function (a, e) {
              return Object(g.a)(b + "Wasm.wasm", a, d["Wasm.wasm"]).then(function (a) {
                e(a.instance)
              })
            }),
              (c = Object(a.b)(b + "Wasm.js.mem", d["Wasm.js.mem"], !1, !1))
          c = new Blob([c], { type: "application/javascript" })
          importScripts(URL.createObjectURL(c))
        }
    },
    function (b, c, f) {
      b.exports = f(14)
    },
    function (b, c, f) {
      f.r(c)
      f(15)
      f(20)
      b = f(9)
      f(21)
      Object(b.a)()
    },
    function (b, c, f) {
      ;(function (a, b) {
        function c(a) {
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
            c(a)
          )
        }
        ;(function (a) {
          function d() {
            for (var a = 0; a < C.length; a++) C[a][0](C[a][1])
            C = []
            F = !1
          }
          function e(a, b) {
            C.push([a, b])
            F || ((F = !0), H(d, 0))
          }
          function g(a, b) {
            function d(a) {
              q(b, a)
            }
            function c(a) {
              t(b, a)
            }
            try {
              a(d, c)
            } catch (D) {
              c(D)
            }
          }
          function h(a) {
            var b = a.owner,
              d = b.state_
            b = b.data_
            var c = a[d]
            a = a.then
            if ("function" === typeof c) {
              d = A
              try {
                b = c(b)
              } catch (D) {
                t(a, D)
              }
            }
            k(a, b) || (d === A && q(a, b), d === B && t(a, b))
          }
          function k(a, b) {
            var d
            try {
              if (a === b)
                throw new TypeError("A promises callback cannot return that same promise.")
              if (b && ("function" === typeof b || "object" === c(b))) {
                var e = b.then
                if ("function" === typeof e)
                  return (
                    e.call(
                      b,
                      function (c) {
                        d || ((d = !0), b !== c ? q(a, c) : r(a, c))
                      },
                      function (b) {
                        d || ((d = !0), t(a, b))
                      }
                    ),
                    !0
                  )
              }
            } catch (D) {
              return d || t(a, D), !0
            }
            return !1
          }
          function q(a, b) {
            ;(a !== b && k(a, b)) || r(a, b)
          }
          function r(a, b) {
            a.state_ === z && ((a.state_ = E), (a.data_ = b), e(u, a))
          }
          function t(a, b) {
            a.state_ === z && ((a.state_ = E), (a.data_ = b), e(w, a))
          }
          function p(a) {
            var b = a.then_
            a.then_ = void 0
            for (a = 0; a < b.length; a++) h(b[a])
          }
          function u(a) {
            a.state_ = A
            p(a)
          }
          function w(a) {
            a.state_ = B
            p(a)
          }
          function n(a) {
            if ("function" !== typeof a)
              throw new TypeError("Promise constructor takes a function argument")
            if (!(this instanceof n))
              throw new TypeError(
                "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
              )
            this.then_ = []
            g(a, this)
          }
          a.createPromiseCapability = function () {
            var a = {}
            a.promise = new n(function (b, d) {
              a.resolve = b
              a.reject = d
            })
            return a
          }
          var m = a.Promise,
            x =
              m &&
              "resolve" in m &&
              "reject" in m &&
              "all" in m &&
              "race" in m &&
              (function () {
                var a
                new m(function (b) {
                  a = b
                })
                return "function" === typeof a
              })()
          "undefined" !== typeof exports && exports
            ? ((exports.Promise = x ? m : n), (exports.Polyfill = n))
            : "function" === typeof define && f(19)
            ? define(function () {
                return x ? m : n
              })
            : x || (a.Promise = n)
          var z = "pending",
            E = "sealed",
            A = "fulfilled",
            B = "rejected",
            G = function () {},
            H = "undefined" !== typeof b ? b : setTimeout,
            C = [],
            F
          n.prototype = {
            constructor: n,
            state_: z,
            then_: null,
            data_: void 0,
            then: function (a, b) {
              a = { owner: this, then: new this.constructor(G), fulfilled: a, rejected: b }
              this.state_ === A || this.state_ === B ? e(h, a) : this.then_.push(a)
              return a.then
            },
            catch: function (a) {
              return this.then(null, a)
            },
          }
          n.all = function (a) {
            if ("[object Array]" !== Object.prototype.toString.call(a))
              throw new TypeError("You must pass an array to Promise.all().")
            return new this(function (b, d) {
              function c(a) {
                f++
                return function (d) {
                  e[a] = d
                  --f || b(e)
                }
              }
              for (var e = [], f = 0, g = 0, h; g < a.length; g++)
                (h = a[g]) && "function" === typeof h.then ? h.then(c(g), d) : (e[g] = h)
              f || b(e)
            })
          }
          n.race = function (a) {
            if ("[object Array]" !== Object.prototype.toString.call(a))
              throw new TypeError("You must pass an array to Promise.race().")
            return new this(function (b, d) {
              for (var c = 0, e; c < a.length; c++)
                (e = a[c]) && "function" === typeof e.then ? e.then(b, d) : b(e)
            })
          }
          n.resolve = function (a) {
            return a && "object" === c(a) && a.constructor === this
              ? a
              : new this(function (b) {
                  b(a)
                })
          }
          n.reject = function (a) {
            return new this(function (b, d) {
              d(a)
            })
          }
        })(
          "undefined" !== typeof window
            ? window
            : "undefined" !== typeof a
            ? a
            : "undefined" !== typeof self
            ? self
            : void 0
        )
      }.call(this, f(7), f(16).setImmediate))
    },
    function (b, c, f) {
      ;(function (a) {
        function b(a, b) {
          this._id = a
          this._clearFn = b
        }
        var h = ("undefined" !== typeof a && a) || ("undefined" !== typeof self && self) || window,
          k = Function.prototype.apply
        c.setTimeout = function () {
          return new b(k.call(setTimeout, h, arguments), clearTimeout)
        }
        c.setInterval = function () {
          return new b(k.call(setInterval, h, arguments), clearInterval)
        }
        c.clearTimeout = c.clearInterval = function (a) {
          a && a.close()
        }
        b.prototype.unref = b.prototype.ref = function () {}
        b.prototype.close = function () {
          this._clearFn.call(h, this._id)
        }
        c.enroll = function (a, b) {
          clearTimeout(a._idleTimeoutId)
          a._idleTimeout = b
        }
        c.unenroll = function (a) {
          clearTimeout(a._idleTimeoutId)
          a._idleTimeout = -1
        }
        c._unrefActive = c.active = function (a) {
          clearTimeout(a._idleTimeoutId)
          var b = a._idleTimeout
          0 <= b &&
            (a._idleTimeoutId = setTimeout(function () {
              a._onTimeout && a._onTimeout()
            }, b))
        }
        f(17)
        c.setImmediate =
          ("undefined" !== typeof self && self.setImmediate) ||
          ("undefined" !== typeof a && a.setImmediate) ||
          (this && this.setImmediate)
        c.clearImmediate =
          ("undefined" !== typeof self && self.clearImmediate) ||
          ("undefined" !== typeof a && a.clearImmediate) ||
          (this && this.clearImmediate)
      }.call(this, f(7)))
    },
    function (b, c, f) {
      ;(function (a, b) {
        ;(function (a, c) {
          function d(a) {
            delete u[a]
          }
          function e(a) {
            if (w) setTimeout(e, 0, a)
            else {
              var b = u[a]
              if (b) {
                w = !0
                try {
                  var f = b.callback,
                    g = b.args
                  switch (g.length) {
                    case 0:
                      f()
                      break
                    case 1:
                      f(g[0])
                      break
                    case 2:
                      f(g[0], g[1])
                      break
                    case 3:
                      f(g[0], g[1], g[2])
                      break
                    default:
                      f.apply(c, g)
                  }
                } finally {
                  d(a), (w = !1)
                }
              }
            }
          }
          function f() {
            m = function (a) {
              b.nextTick(function () {
                e(a)
              })
            }
          }
          function g() {
            if (a.postMessage && !a.importScripts) {
              var b = !0,
                d = a.onmessage
              a.onmessage = function () {
                b = !1
              }
              a.postMessage("", "*")
              a.onmessage = d
              return b
            }
          }
          function h() {
            var b = "setImmediate$" + Math.random() + "$",
              d = function (d) {
                d.source === a &&
                  "string" === typeof d.data &&
                  0 === d.data.indexOf(b) &&
                  e(+d.data.slice(b.length))
              }
            a.addEventListener
              ? a.addEventListener("message", d, !1)
              : a.attachEvent("onmessage", d)
            m = function (d) {
              a.postMessage(b + d, "*")
            }
          }
          function k() {
            var a = new MessageChannel()
            a.port1.onmessage = function (a) {
              e(a.data)
            }
            m = function (b) {
              a.port2.postMessage(b)
            }
          }
          function r() {
            var a = n.documentElement
            m = function (b) {
              var d = n.createElement("script")
              d.onreadystatechange = function () {
                e(b)
                d.onreadystatechange = null
                a.removeChild(d)
                d = null
              }
              a.appendChild(d)
            }
          }
          function t() {
            m = function (a) {
              setTimeout(e, 0, a)
            }
          }
          if (!a.setImmediate) {
            var p = 1,
              u = {},
              w = !1,
              n = a.document,
              m,
              x = Object.getPrototypeOf && Object.getPrototypeOf(a)
            x = x && x.setTimeout ? x : a
            "[object process]" === {}.toString.call(a.process)
              ? f()
              : g()
              ? h()
              : a.MessageChannel
              ? k()
              : n && "onreadystatechange" in n.createElement("script")
              ? r()
              : t()
            x.setImmediate = function (a) {
              "function" !== typeof a && (a = new Function("" + a))
              for (var b = Array(arguments.length - 1), d = 0; d < b.length; d++)
                b[d] = arguments[d + 1]
              u[p] = { callback: a, args: b }
              m(p)
              return p++
            }
            x.clearImmediate = d
          }
        })("undefined" === typeof self ? ("undefined" === typeof a ? this : a) : self)
      }.call(this, f(7), f(18)))
    },
    function (b, c) {
      function f() {
        throw Error("setTimeout has not been defined")
      }
      function a() {
        throw Error("clearTimeout has not been defined")
      }
      function g(a) {
        if (y === setTimeout) return setTimeout(a, 0)
        if ((y === f || !y) && setTimeout) return (y = setTimeout), setTimeout(a, 0)
        try {
          return y(a, 0)
        } catch (w) {
          try {
            return y.call(null, a, 0)
          } catch (n) {
            return y.call(this, a, 0)
          }
        }
      }
      function h(b) {
        if (v === clearTimeout) return clearTimeout(b)
        if ((v === a || !v) && clearTimeout) return (v = clearTimeout), clearTimeout(b)
        try {
          return v(b)
        } catch (w) {
          try {
            return v.call(null, b)
          } catch (n) {
            return v.call(this, b)
          }
        }
      }
      function k() {
        r && t && ((r = !1), t.length ? (q = t.concat(q)) : (p = -1), q.length && d())
      }
      function d() {
        if (!r) {
          var a = g(k)
          r = !0
          for (var b = q.length; b; ) {
            t = q
            for (q = []; ++p < b; ) t && t[p].run()
            p = -1
            b = q.length
          }
          t = null
          r = !1
          h(a)
        }
      }
      function e(a, b) {
        this.fun = a
        this.array = b
      }
      function l() {}
      b = b.exports = {}
      try {
        var y = "function" === typeof setTimeout ? setTimeout : f
      } catch (u) {
        y = f
      }
      try {
        var v = "function" === typeof clearTimeout ? clearTimeout : a
      } catch (u) {
        v = a
      }
      var q = [],
        r = !1,
        t,
        p = -1
      b.nextTick = function (a) {
        var b = Array(arguments.length - 1)
        if (1 < arguments.length) for (var c = 1; c < arguments.length; c++) b[c - 1] = arguments[c]
        q.push(new e(a, b))
        1 !== q.length || r || g(d)
      }
      e.prototype.run = function () {
        this.fun.apply(null, this.array)
      }
      b.title = "browser"
      b.browser = !0
      b.env = {}
      b.argv = []
      b.version = ""
      b.versions = {}
      b.on = l
      b.addListener = l
      b.once = l
      b.off = l
      b.removeListener = l
      b.removeAllListeners = l
      b.emit = l
      b.prependListener = l
      b.prependOnceListener = l
      b.listeners = function (a) {
        return []
      }
      b.binding = function (a) {
        throw Error("process.binding is not supported")
      }
      b.cwd = function () {
        return "/"
      }
      b.chdir = function (a) {
        throw Error("process.chdir is not supported")
      }
      b.umask = function () {
        return 0
      }
    },
    function (b, c) {
      b.exports = {}
    },
    function (b, c, f) {
      ;(function (a) {
        "undefined" === typeof a.crypto &&
          (a.crypto = {
            getRandomValues: function (a) {
              for (var b = 0; b < a.length; b++) a[b] = 256 * Math.random()
            },
          })
      })("undefined" === typeof window ? self : window)
    },
    function (b, c, f) {
      function a(b) {
        "@babel/helpers - typeof"
        return (
          (a =
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
          a(b)
        )
      }
      var g = f(10),
        h = f(12),
        k = null
      ;(function (b) {
        function d() {
          r = function () {}
        }
        function c(b) {
          var d = []
          return {
            resource_array: d,
            msg: JSON.stringify(b.data, function (b, c) {
              if (
                "object" === a(c) &&
                ((b = null),
                c instanceof Uint8Array
                  ? (b = c)
                  : c instanceof ArrayBuffer && (b = new Uint8Array(c)),
                b)
              ) {
                c = p(b.length)
                var e = u(c)
                e && new Uint8Array(Module.HEAPU8.buffer, e, b.length).set(b)
                d.push(c)
                return { __trn_res_id: c }
              }
              return c
            }),
          }
        }
        function f(a) {
          m || (m = [])
          m.push(a)
        }
        function v() {
          w = !0
          postMessage({
            type: "abort",
            data: { error: "Office worker has terminated unexpectedly" },
          })
        }
        function q(a) {
          if (!w)
            try {
              var b = c(a)
              t(b.msg)
            } catch (B) {
              v(B)
            }
        }
        var r,
          t,
          p,
          u,
          w = !1
        b.basePath = "../"
        var n = b.officeWorkerPath || ""
        b.workerBasePath && (b.basePath = b.workerBasePath)
        b.basePath = b.externalPath ? b.externalPath : b.basePath + "external/"
        importScripts("".concat(b.basePath, "Promise.js"))
        var m = []
        b.ContinueFunc = function (a) {
          r("ContinueFunc called")
          setTimeout(function () {
            onmessage({ data: { action: "continue" } })
          }, a)
        }
        if (b.pdfWorkerPath) var x = b.pdfWorkerPath
        if (b.officeAsmPath) var z = b.officeAsmPath
        b.Module = {
          memoryInitializerPrefixURL: x,
          asmjsPrefix: z,
          onRuntimeInitialized: function () {
            r || d()
            var a = Date.now() - k
            Object(g.a)("load", "time duration from start to ready: ".concat(JSON.stringify(a)))
            t = function (a) {
              if (null !== a && void 0 !== a && 0 !== a && !w) {
                var b = (a.length << 2) + 1,
                  c = Module._malloc(b)
                0 < stringToUTF8(a, c, b) && Module._TRN_OnMessage(c)
              }
            }
            p = function (a) {
              return Module._TRN_CreateBufferResource(a)
            }
            u = function (a) {
              return Module._TRN_GetResourcePointer(a)
            }
            r("OnReady called")
            onmessage = q
            Module._TRN_InitWorker()
            for (a = 0; a < m.length; ++a) onmessage(m[a])
            m = null
          },
          fetchSelf: function () {
            k = Date.now()
            Object(h.a)(
              "".concat(n, "WebOfficeWorker"),
              { "Wasm.wasm": 5e6, "Wasm.js.mem": 1e5, ".js.mem": 5e6, ".mem": 3e6 },
              !!navigator.userAgent.match(/Edge/i) || b.wasmDisabled
            )
          },
          onAbort: v,
          noExitRuntime: !0,
        }
        b.onmessage = function (a) {
          "init" === a.data.action &&
            ((b.wasmDisabled = !a.data.wasm),
            (b.externalPath = a.data.externalPath),
            (b.officeAsmPath = a.data.officeAsmPath),
            (b.pdfWorkerPath = a.data.pdfWorkerPath),
            (b.onmessage = f),
            b.Module.fetchSelf())
        }
      })("undefined" === typeof window ? self : window)
    },
  ])
}.call(this || window))
