;(function () {
  var P =
    "undefined" != typeof window && window === this
      ? this
      : "undefined" != typeof global && null != global
      ? global
      : this
  function Q(n) {
    var f = 0
    return function () {
      return f < n.length ? { done: !1, value: n[f++] } : { done: !0 }
    }
  }
  var T =
    "function" == typeof Object.defineProperties
      ? Object.defineProperty
      : function (n, f, l) {
          n != Array.prototype && n != Object.prototype && (n[f] = l.value)
        }
  function U() {
    U = function () {}
    P.Symbol || (P.Symbol = V)
  }
  var V = (function () {
    var n = 0
    return function (f) {
      return "jscomp_symbol_" + (f || "") + n++
    }
  })()
  function X() {
    U()
    var n = P.Symbol.iterator
    n || (n = P.Symbol.iterator = P.Symbol("iterator"))
    "function" != typeof Array.prototype[n] &&
      T(Array.prototype, n, {
        configurable: !0,
        writable: !0,
        value: function () {
          return aa(Q(this))
        },
      })
    X = function () {}
  }
  function aa(n) {
    X()
    n = { next: n }
    n[P.Symbol.iterator] = function () {
      return this
    }
    return n
  }
  function Y(n, f) {
    return Object.prototype.hasOwnProperty.call(n, f)
  }
  function Z(n, f) {
    if (f) {
      var l = P
      n = n.split(".")
      for (var h = 0; h < n.length - 1; h++) {
        var d = n[h]
        d in l || (l[d] = {})
        l = l[d]
      }
      n = n[n.length - 1]
      h = l[n]
      f = f(h)
      f != h && null != f && T(l, n, { configurable: !0, writable: !0, value: f })
    }
  }
  Z("WeakMap", function (n) {
    function f(d) {
      this.wb = (y += Math.random() + 1).toString()
      if (d) {
        var p = "undefined" != typeof Symbol && Symbol.iterator && d[Symbol.iterator]
        for (d = p ? p.call(d) : { next: Q(d) }; !(p = d.next()).done; )
          (p = p.value), this.set(p[0], p[1])
      }
    }
    function l() {}
    function h(d) {
      Y(d, D) || T(d, D, { value: new l() })
    }
    function d(d) {
      var p = Object[d]
      p &&
        (Object[d] = function (b) {
          if (b instanceof l) return b
          h(b)
          return p(b)
        })
    }
    if (
      (function () {
        if (!n || !Object.seal) return !1
        try {
          var d = Object.seal({}),
            p = Object.seal({}),
            b = new n([
              [d, 2],
              [p, 3],
            ])
          if (2 != b.get(d) || 3 != b.get(p)) return !1
          b.delete(d)
          b.set(p, 4)
          return !b.has(d) && 4 == b.get(p)
        } catch (a) {
          return !1
        }
      })()
    )
      return n
    var D = "$jscomp_hidden_" + Math.random()
    d("freeze")
    d("preventExtensions")
    d("seal")
    var y = 0
    f.prototype.set = function (d, p) {
      h(d)
      if (!Y(d, D)) throw Error("WeakMap key fail: " + d)
      d[D][this.wb] = p
      return this
    }
    f.prototype.get = function (d) {
      return Y(d, D) ? d[D][this.wb] : void 0
    }
    f.prototype.has = function (d) {
      return Y(d, D) && Y(d[D], this.wb)
    }
    f.prototype.delete = function (d) {
      return Y(d, D) && Y(d[D], this.wb) ? delete d[D][this.wb] : !1
    }
    return f
  })
  Z("String.fromCodePoint", function (n) {
    return n
      ? n
      : function (f) {
          for (var l = "", h = 0; h < arguments.length; h++) {
            var d = Number(arguments[h])
            if (0 > d || 1114111 < d || d !== Math.floor(d))
              throw new RangeError("invalid_code_point " + d)
            65535 >= d
              ? (l += String.fromCharCode(d))
              : ((d -= 65536),
                (l += String.fromCharCode(((d >>> 10) & 1023) | 55296)),
                (l += String.fromCharCode((d & 1023) | 56320)))
          }
          return l
        }
  })
  function ba(n, f) {
    X()
    n instanceof String && (n += "")
    var l = 0,
      h = {
        next: function () {
          if (l < n.length) {
            var d = l++
            return { value: f(d, n[d]), done: !1 }
          }
          h.next = function () {
            return { done: !0, value: void 0 }
          }
          return h.next()
        },
      }
    h[Symbol.iterator] = function () {
      return h
    }
    return h
  }
  Z("Array.prototype.keys", function (n) {
    return n
      ? n
      : function () {
          return ba(this, function (f) {
            return f
          })
        }
  })
  ;(function (n) {
    function f(h) {
      if (l[h]) return l[h].la
      var d = (l[h] = { Af: h, ue: !1, la: {} })
      n[h].call(d.la, d, d.la, f)
      d.ue = !0
      return d.la
    }
    var l = {}
    f.Gf = n
    f.c = l
    f.d = function (h, d, D) {
      f.xe(h, d) || Object.defineProperty(h, d, { enumerable: !0, get: D })
    }
    f.r = function (h) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(h, Symbol.toStringTag, { value: "Module" })
      Object.defineProperty(h, "__esModule", { value: !0 })
    }
    f.t = function (h, d) {
      d & 1 && (h = f(h))
      if (d & 8 || (d & 4 && "object" === typeof h && h && h.kd)) return h
      var D = Object.create(null)
      f.r(D)
      Object.defineProperty(D, "default", { enumerable: !0, value: h })
      if (d & 2 && "string" != typeof h)
        for (var y in h)
          f.d(
            D,
            y,
            function (d) {
              return h[d]
            }.bind(null, y)
          )
      return D
    }
    f.n = function (h) {
      var d =
        h && h.kd
          ? function () {
              return h["default"]
            }
          : function () {
              return h
            }
      f.d(d, "a", d)
      return d
    }
    f.xe = function (h, d) {
      return Object.prototype.hasOwnProperty.call(h, d)
    }
    f.p = "/core/"
    return f((f.Hf = 9))
  })([
    function (n, f, l) {
      function h(d, h) {
        d.splice(h, 1)
      }
      function d(d) {
        return d.length ? d[d.length - 1] : null
      }
      l.d(f, "a", function () {
        return d
      })
      l.d(f, "b", function () {
        return h
      })
      l(6)
    },
    function (n, f, l) {
      function h(d, h) {
        var b
        y[d] = h
        null === (b = D[d]) || void 0 === b
          ? void 0
          : b.forEach(function (a) {
              a(h)
            })
      }
      function d(d) {
        return y[d]
      }
      l.d(f, "a", function () {
        return d
      })
      l.d(f, "b", function () {
        return h
      })
      var D = {},
        y = {
          flattenedResources: !1,
          CANVAS_CACHE_SIZE: void 0,
          maxPagesBefore: void 0,
          maxPagesAhead: void 0,
          disableLogs: !1,
          wvsQueryParameters: {},
          _trnDebugMode: !1,
          _logFiltersEnabled: null,
        }
    },
    function (n, f, l) {
      function h(h, f) {
        Object(d.a)("disableLogs") || (f ? console.warn(h + ": " + f) : console.warn(h))
      }
      l.d(f, "a", function () {
        return h
      })
      var d = l(1)
    },
    function (n, f) {
      n =
        "undefined" !== typeof Uint8Array &&
        "undefined" !== typeof Uint16Array &&
        "undefined" !== typeof Int32Array
      f.assign = function (d) {
        for (var h = Array.prototype.slice.call(arguments, 1); h.length; ) {
          var f = h.shift()
          if (f) {
            if ("object" !== typeof f) throw new TypeError(f + "must be non-object")
            for (var l in f) Object.prototype.hasOwnProperty.call(f, l) && (d[l] = f[l])
          }
        }
        return d
      }
      f.shrinkBuf = function (d, h) {
        if (d.length === h) return d
        if (d.subarray) return d.subarray(0, h)
        d.length = h
        return d
      }
      var l = {
          arraySet: function (d, h, f, l, p) {
            if (h.subarray && d.subarray) d.set(h.subarray(f, f + l), p)
            else for (var b = 0; b < l; b++) d[p + b] = h[f + b]
          },
          flattenChunks: function (d) {
            var h, f
            var l = (f = 0)
            for (h = d.length; l < h; l++) f += d[l].length
            var p = new Uint8Array(f)
            l = f = 0
            for (h = d.length; l < h; l++) {
              var b = d[l]
              p.set(b, f)
              f += b.length
            }
            return p
          },
        },
        h = {
          arraySet: function (d, h, f, l, p) {
            for (var b = 0; b < l; b++) d[p + b] = h[f + b]
          },
          flattenChunks: function (d) {
            return [].concat.apply([], d)
          },
        }
      f.ze = function (d) {
        d
          ? ((f.Buf8 = Uint8Array), (f.kb = Uint16Array), (f.lb = Int32Array), f.assign(f, l))
          : ((f.Buf8 = Array), (f.kb = Array), (f.lb = Array), f.assign(f, h))
      }
      f.ze(n)
    },
    function (n, f) {
      n = (function () {
        function f(h) {
          this.depth = this.index = 0
          this.M = h
          this.location = { start: 0, Rb: 1, Sb: 1, end: !!h.length, empty: !0 }
          this.xb = [this.location]
          this.oc = !1
          "?" === this.M.charAt(1) && this.dd()
          this.location.empty = !1
        }
        f.prototype.advance = function () {
          this.Ea = null
          this.dd()
          var h = this.location.start
          ++h
          this.location.empty = !1
          if ("/" !== this.M.charAt(h))
            return (this.location.empty = "/" === this.M.charAt(this.M.indexOf(">", h) - 1)), !0
          this.location.end = !0
          return !1
        }
        f.prototype.gd = function () {
          var h = this.location.start + 1,
            d = this.M.indexOf(">", h)
          this.location.empty && --d
          h = this.M.substring(h, d)
          this.Ea = {}
          d = h.indexOf(" ")
          if (-1 !== d) {
            this.bd = h.substring(0, d)
            h = h.slice(d)
            h = h.split('"')
            d = h.length - 1
            for (var f = 0; f < d; ++f) {
              var l = h[f],
                n = h[++f]
              this.Ea[l.substring(1, l.length - 1)] = n
            }
          } else this.bd = h
        }
        f.prototype.dd = function () {
          if (this.oc)
            (this.oc = !1), (this.location.start = this.M.indexOf("<", this.location.start + 1))
          else {
            var h = this.location.Rb
            if (!this.location.empty)
              for (var d = this.location.Sb; 0 < d; )
                (h = this.M.indexOf("<", h)),
                  "/" === this.M.charAt(++h)
                    ? --d
                    : ((h = this.M.indexOf(">", h)), "/" !== this.M.charAt(h - 1) && ++d)
            this.location.start = this.M.indexOf("<", h)
          }
          this.location.Rb = this.location.start + 1
          this.location.Sb = 1
        }
        f.prototype.mark = function () {
          this.M.mark && this.M.mark(this.location.start)
        }
        f.prototype.O = function () {
          ;(null !== this.Ea && "undefined" !== typeof this.Ea) || this.gd()
          return this.bd
        }
        f.prototype.J = function () {
          ++this.depth
          this.location = { start: this.location.start }
          this.xb[this.xb.length] = this.location
          this.oc = !0
        }
        f.prototype.I = function () {
          --this.depth
          this.Ea = null
          var h = this.location.Rb,
            d = this.location.Sb,
            f = this.location.empty,
            l = this.location.end
          this.xb.pop()
          this.location = this.xb[this.xb.length - 1]
          this.location.Rb = h
          this.location.Sb = l ? 0 : f ? d : d + 1
        }
        f.prototype.V = function () {
          return this.location.empty
            ? !0
            : "/" === this.M.charAt(this.M.indexOf("<", this.location.start + 1) + 1)
        }
        f.prototype.D = function (h) {
          ;(null !== this.Ea && "undefined" !== typeof this.Ea) || this.gd()
          return this.Be(this.Ea[h])
        }
        f.prototype.Be = function (h) {
          if (h)
            return h.replace(/&[^;]*;/g, function (d) {
              switch (d.charAt(1)) {
                case "q":
                  return '"'
                case "a":
                  return "&"
                case "l":
                  return "<"
                case "g":
                  return ">"
                case "#":
                  return "x" === d.charAt(2)
                    ? String.fromCharCode(parseInt(d.substring(3, d.length - 1), 16))
                    : String.fromCharCode(parseInt(d.substring(2, d.length - 1), 10))
              }
              return d
            })
        }
        return f
      })()
      f.a = n
    },
    function (n, f, l) {
      function h(h) {
        return new d(h)
      }
      l.d(f, "a", function () {
        return h
      })
      var d = (function () {
        function d(d) {
          this.uc = d
          this.Ha = -1
          this.current = null
        }
        d.prototype.ve = function () {
          this.Ha++
          this.current = this.uc[this.Ha]
          return this.Ha < this.uc.length
        }
        d.prototype.reset = function () {
          this.Ha = -1
          this.current = null
        }
        return d
      })()
    },
    function (n, f, l) {
      function h() {
        for (var d = 0, h = 0, f = arguments.length; h < f; h++) d += arguments[h].length
        d = Array(d)
        var l = 0
        for (h = 0; h < f; h++)
          for (var p = arguments[h], b = 0, a = p.length; b < a; b++, l++) d[l] = p[b]
        return d
      }
      l.d(f, "a", function () {
        return h
      })
    },
    function (n, f, l) {
      function h(d) {
        if ("string" !== typeof d) {
          for (var h = "", f = 0, l = d.length, p; f < l; )
            (p = d.subarray(f, f + 1024)), (f += 1024), (h += String.fromCharCode.apply(null, p))
          return h
        }
        return d
      }
      l.d(f, "a", function () {
        return h
      })
    },
    function (n, f, l) {
      function h(A) {
        if (!(this instanceof h)) return new h(A)
        var m = (this.options = y.assign({ chunkSize: 16384, windowBits: 0, to: "" }, A || {}))
        m.raw &&
          0 <= m.windowBits &&
          16 > m.windowBits &&
          ((m.windowBits = -m.windowBits), 0 === m.windowBits && (m.windowBits = -15))
        !(0 <= m.windowBits && 16 > m.windowBits) || (A && A.windowBits) || (m.windowBits += 32)
        15 < m.windowBits && 48 > m.windowBits && 0 === (m.windowBits & 15) && (m.windowBits |= 15)
        this.err = 0
        this.msg = ""
        this.ended = !1
        this.chunks = []
        this.strm = new a()
        this.strm.avail_out = 0
        A = D.inflateInit2(this.strm, m.windowBits)
        if (A !== p.Z_OK) throw Error(b[A])
        this.header = new k()
        D.inflateGetHeader(this.strm, this.header)
        if (
          m.dictionary &&
          ("string" === typeof m.dictionary
            ? (m.dictionary = v.string2buf(m.dictionary))
            : "[object ArrayBuffer]" === e.call(m.dictionary) &&
              (m.dictionary = new Uint8Array(m.dictionary)),
          m.raw && ((A = D.inflateSetDictionary(this.strm, m.dictionary)), A !== p.Z_OK))
        )
          throw Error(b[A])
      }
      function d(a, e) {
        e = new h(e)
        e.push(a, !0)
        if (e.err) throw e.msg || b[e.err]
        return e.result
      }
      var D = l(13),
        y = l(3),
        v = l(18),
        p = l(19),
        b = l(20),
        a = l(21),
        k = l(22),
        e = Object.prototype.toString
      h.prototype.push = function (a, b) {
        var k = this.strm,
          m = this.options.chunkSize,
          A = this.options.dictionary,
          t = !1
        if (this.ended) return !1
        b = b === ~~b ? b : !0 === b ? p.Z_FINISH : p.Z_NO_FLUSH
        "string" === typeof a
          ? (k.input = v.binstring2buf(a))
          : "[object ArrayBuffer]" === e.call(a)
          ? (k.input = new Uint8Array(a))
          : (k.input = a)
        k.next_in = 0
        k.avail_in = k.input.length
        do {
          0 === k.avail_out && ((k.output = new y.Buf8(m)), (k.next_out = 0), (k.avail_out = m))
          a = D.inflate(k, p.Z_NO_FLUSH)
          a === p.Z_NEED_DICT && A && (a = D.inflateSetDictionary(this.strm, A))
          a === p.Z_BUF_ERROR && !0 === t && ((a = p.Z_OK), (t = !1))
          if (a !== p.Z_STREAM_END && a !== p.Z_OK) return this.onEnd(a), (this.ended = !0), !1
          if (
            k.next_out &&
            (0 === k.avail_out ||
              a === p.Z_STREAM_END ||
              (0 === k.avail_in && (b === p.Z_FINISH || b === p.Z_SYNC_FLUSH)))
          )
            if ("string" === this.options.to) {
              var d = v.utf8border(k.output, k.next_out)
              var h = k.next_out - d
              var f = v.buf2string(k.output, d)
              k.next_out = h
              k.avail_out = m - h
              h && y.arraySet(k.output, k.output, d, h, 0)
              this.onData(f)
            } else this.onData(y.shrinkBuf(k.output, k.next_out))
          0 === k.avail_in && 0 === k.avail_out && (t = !0)
        } while ((0 < k.avail_in || 0 === k.avail_out) && a !== p.Z_STREAM_END)
        a === p.Z_STREAM_END && (b = p.Z_FINISH)
        if (b === p.Z_FINISH)
          return (a = D.inflateEnd(this.strm)), this.onEnd(a), (this.ended = !0), a === p.Z_OK
        b === p.Z_SYNC_FLUSH && (this.onEnd(p.Z_OK), (k.avail_out = 0))
        return !0
      }
      h.prototype.onData = function (a) {
        this.chunks.push(a)
      }
      h.prototype.onEnd = function (a) {
        a === p.Z_OK &&
          (this.result =
            "string" === this.options.to ? this.chunks.join("") : y.flattenChunks(this.chunks))
        this.chunks = []
        this.err = a
        this.msg = this.strm.msg
      }
      f.Inflate = h
      f.inflate = d
      f.inflateRaw = function (a, b) {
        b = b || {}
        b.raw = !0
        return d(a, b)
      }
      f.ungzip = d
    },
    function (n, f, l) {
      n.la = l(10)
    },
    function (n, f, l) {
      l.r(f)
      l(4)
      l(11)
      l(12)
    },
    function (n, f, l) {
      function h(d) {
        "@babel/helpers - typeof"
        return (
          (h =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (d) {
                  return typeof d
                }
              : function (d) {
                  return d &&
                    "function" == typeof Symbol &&
                    d.constructor === Symbol &&
                    d !== Symbol.prototype
                    ? "symbol"
                    : typeof d
                }),
          h(d)
        )
      }
      var d = l(2),
        D = l(5),
        y = l(0)
      ;(function (f) {
        function p(a, b) {
          this.v = []
          this.A = []
          a && this.L(a, b)
        }
        var b = f.trn || {}
        f.trn = b
        String.fromCodePoint ||
          (function () {
            function a() {
              var a = [],
                b = -1,
                k = arguments.length
              if (!k) return ""
              for (var A = ""; ++b < k; ) {
                var t = Number(arguments[b])
                if (!isFinite(t) || 0 > t || 1114111 < t || d(t) !== t)
                  throw RangeError("Invalid code point: ".concat(t))
                if (65535 >= t) a.push(t)
                else {
                  t -= 65536
                  var h = (t >> 10) + 55296
                  t = (t % 1024) + 56320
                  a.push(h, t)
                }
                if (b + 1 === k || 16384 < a.length) (A += e.apply(void 0, a)), (a.length = 0)
              }
              return A
            }
            var b = (function () {
                try {
                  var a = {},
                    b = Object.defineProperty
                  var e = b(a, a, a) && b
                } catch (R) {}
                return e
              })(),
              e = String.fromCharCode,
              d = Math.floor
            b
              ? b(String, "fromCodePoint", { value: a, configurable: !0, writable: !0 })
              : (String.fromCodePoint = a)
          })()
        Array.prototype.Pa &&
          Object(d.a)(
            "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
          )
        Array.prototype.Pa = function (a) {
          if (!a || this.length !== a.length) return !1
          for (var b = 0, e = this.length; b < e; b++)
            if (this[b] instanceof Array && a[b] instanceof Array) {
              if (!this[b].Pa(a[b])) return !1
            } else if (this[b] !== a[b]) return !1
          return !0
        }
        Object.defineProperty(Array.prototype, "equals", { enumerable: !1, writable: !0 })
        p.prototype = {
          C: function (a) {
            this.v = this.v.concat(a.v)
            this.A = this.A.concat(a.A)
          },
          L: function (a, b) {
            this.v.push(a)
            a = h(b)
            this.A.push("object" === a ? b : "undefined" === a ? null : [b])
          },
          Pa: function (a) {
            return this.v.Pa(a.v) && this.A.Pa(a.A)
          },
          save: function () {
            this.v.push(b.f.Nd)
            this.A.push(null)
          },
          restore: function () {
            this.L(b.f.Md, null)
          },
        }
        b.f = function (a, k, e, d) {
          this.done = !1
          this.Hc = 2e3
          this.Ja = {}
          this.La = 0
          this.P = []
          this.Jb = []
          this.fa = []
          this.fa.push({})
          this.g = a
          this.Lc = this.zb("Width")
          this.Kc = this.zb("Height")
          this.P.push(b.Sa.se(this.Lc, this.Kc))
          this.ca = !1
          this.Ib = e
          this.ce =
            -1 < navigator.userAgent.indexOf("Android") &&
            -1 === navigator.userAgent.indexOf("Chrome") &&
            -1 === navigator.userAgent.indexOf("Firefox")
          this.v = []
          this.A = []
          this.g.J()
          this.g.advance()
          this.lc = d
          a = this.g.O()
          b.f.m(a, "FixedPage.Resources", b.f.l) &&
            (this.g.J(), this.g.advance(), this.Qc(), this.g.I())
          this.Ia = !1
        }
        b.f.m = function (a, b, e) {
          return a === b ? !0 : a === e + b
        }
        b.f.ad = function (a) {
          return b.f.ne(a)
        }
        b.f.ne = function (a) {
          var b = 3,
            e = Math.abs(a)
          0.5 > e && (b = 5e-4 > e ? (5e-7 > e ? 9 : 7) : 5)
          b = Math.pow(10, b)
          a = Math.round(a * b) / b
          return a.toString()
        }
        b.f.H = function (a, b) {
          if (!a) throw Error(b)
        }
        b.f.zf = function (a) {
          return new b.f(a, !1).Td()
        }
        b.f.prototype = {
          $d: function () {
            return this.ac()
          },
          Wb: function (a, k, e) {
            var d = this.Sd(),
              m = this.g.O()
            if (b.f.m(m, "Path", b.f.l)) var h = this.Zb()
            else
              b.f.m(m, "Canvas", b.f.l)
                ? (h = this.Fb())
                : b.f.m(m, "Glyphs", b.f.l)
                ? (h = this.Yb())
                : ((h = null), b.f.H(!1, "Invalid Element ".concat(m)))
            h.gb(d)
            if (h.te()) {
              d = this.$d()
              m = this.Ua()
              d.mtx = [m.W, m.X, m.Y, m.Z, m.ba, m.da]
              if (a) {
                a = { operators: a.v, data: a.A }
                var f = this.g.D("RenderTransform")
                if (null != f) {
                  var p = new b.K()
                  p.$(f)
                  f = new b.K()
                  f.bc(m)
                  f.Ga(p)
                  m = f
                }
                a.mtx = [m.W, m.X, m.Y, m.Z, m.ba, m.da]
              }
              this.L(b.f.Qd, [d, { x1: h.s, y1: h.u, x2: h.s + h.G, y2: h.u + h.F }, k, a, e])
              this.Mc = !0
            } else this.ca = !1
          },
          Fb: function () {
            var a = new b.ha()
            this.aa()
            var k = this.g.D("RenderTransform")
            if (null != k) {
              var e = new b.K()
              e.$(k)
              this.S(e)
            }
            k = this.g.D("Clip")
            null != k && (a = this.Ba(k))
            k = null
            if (!this.g.V()) {
              for (this.g.J(); this.g.advance(); )
                (e = this.g.O()),
                  b.f.m(e, "Canvas.Clip", b.f.l)
                    ? (b.f.H(!this.g.V(), "Canvas.Clip: Must contain PathGeometry element"),
                      this.g.J(),
                      this.g.advance() &&
                        ((e = new b.K()),
                        e.$(this.B("Transform")),
                        this.S(e),
                        a.gb(this.Ba(this.B("Figures"))),
                        (e = e.Va()),
                        this.S(e)),
                      this.g.I())
                    : b.f.m(e, "Path", b.f.l)
                    ? null != k
                      ? k.sc(this.Zb())
                      : (k = this.Zb())
                    : b.f.m(e, "Glyphs", b.f.l)
                    ? null != k
                      ? k.sc(this.Yb())
                      : (k = this.Yb())
                    : b.f.m(e, "Canvas", b.f.l) && (null != k ? k.sc(this.Fb()) : (k = this.Fb()))
              this.g.I()
            }
            null != k && a.gb(k)
            this.qa()
            return a
          },
          ge: function () {
            var a = this.sa("trn:BlendMode", "source-over")
            a = this.ca ? "source-over" : a
            var k = this.hc()
            k || (this.save(), this.aa())
            var e = null,
              A = this.g.D("OpacityMask")
            null != A && (Object(d.a)("Uh oh OpacityMask Resource!"), (e = this.Ca(A)))
            A = this.ma("Opacity", 1)
            if (!this.g.V()) {
              for (this.g.J(); this.g.advance(); ) {
                var m = this.g.O()
                if (b.f.m(m, "Canvas.Resources", b.f.l))
                  this.g.V()
                    ? b.f.H(!1, "Canvas.Resources must contain ResourceDictionary element")
                    : (this.g.J(), this.g.advance(), this.Qc(), this.g.I())
                else if (b.f.m(m, "Canvas.Clip", b.f.l))
                  b.f.H(!this.g.V(), "Canvas.Clip: Must contain PathGeometry element"),
                    this.g.J(),
                    this.g.advance() &&
                      (k || (this.save(), (k = !0), this.aa()),
                      (m = new b.K()),
                      m.$(this.B("Transform")),
                      this.C(this.S(m)),
                      b.f.H(
                        b.f.m(this.g.O(), "PathGeometry", b.f.l),
                        "Path.Clip must contain PathGeometry"
                      ),
                      this.Pb(this.B("Figures")),
                      (m = m.Va()),
                      this.C(this.S(m))),
                    this.g.I()
                else if (b.f.m(m, "Canvas.OpacityMask", b.f.l))
                  this.ca ||
                    (this.g.J(), this.g.advance(), (e = this.Ta(b.f.na, new p(b.f.Cb))), this.g.I())
                else if (
                  b.f.m(m, "Path", b.f.l) ||
                  b.f.m(m, "Glyphs", b.f.l) ||
                  b.f.m(m, "Canvas", b.f.l) ||
                  b.f.m(m, "trn:Glyphs", b.f.l)
                ) {
                  if (null != e || "source-over" !== a || (1 > A && !this.ca)) {
                    this.vb()
                    this.g.I()
                    this.ca = !0
                    this.Wb(e, a, A)
                    return
                  }
                  this.Ia = !1
                  break
                }
              }
              this.Ia && this.g.I()
            }
            this.Ia && this.vb()
            this.ca = !1
          },
          vb: function () {
            this.restore()
            this.qa()
          },
          zb: function (a) {
            a = this.g.D(a)
            b.f.H(null != a, "".concat(this.g.O(), ": ").concat(a, " is not defined"))
            return parseFloat(a)
          },
          ma: function (a, b) {
            a = this.g.D(a)
            return null != a ? parseFloat(a) : b
          },
          B: function (a) {
            a = this.g.D(a)
            b.f.H(null != a, "".concat(this.g.O(), ": ").concat(a, " is not defined"))
            return a
          },
          sa: function (a, b) {
            a = this.g.D(a)
            return null != a ? a : b
          },
          cd: function () {
            var a = this.g.D("x:Key")
            b.f.H(null != a, "Key must be defined for elements in a resource dictionary")
            return a
          },
          hc: function () {
            0 === this.La && this.g.mark()
            var a = !1,
              b = this.ma("Opacity", 1)
            1 > b && !this.ca && (a || ((a = !0), this.save(), this.aa()), this.C(this.Ra(b)))
            b = this.g.D("RenderTransform")
            null != b && (a || ((a = !0), this.save(), this.aa()), this.ie(b))
            b = this.g.D("Clip")
            null != b && (a || (this.save(), this.aa()), this.Pb(b), (a = !0))
            return a
          },
          Pb: function (a) {
            var k = !0
            a && "F" === a[0] && (k = !1)
            this.Sc(k ? "evenodd" : "nonzero")
            this.be(this.Ba(a))
            this.Oc(a)
            this.v.push(b.f.rd)
            this.A.push(k ? ["evenodd"] : [])
          },
          fe: function (a) {
            var k = []
            for (a = Object(D.a)(a.split(";")); a.ve(); ) {
              var e = a.current,
                d = new b.Ha()
              e = e.split(",")
              if (1 <= e.length) {
                if (0 < e[0].length) {
                  var m = e[0].split(")")
                  if (2 <= m.length) {
                    var h = m[0].substr(1).split(":")
                    d.rb = parseInt(h[0])
                    d.dc = parseInt(h[1])
                  }
                  d.Mb = parseInt(m[m.length - 1])
                  d.ub = !0
                }
                2 <= e.length &&
                  (0 < e[1].length && ((d.cc = parseFloat(e[1])), (d.fc = !0)),
                  3 <= e.length &&
                    (0 < e[2].length && (d.Nb = parseFloat(e[2])),
                    4 <= e.length && 0 < e[3].length && (d.Ob = parseFloat(e[3]))))
              }
              k.push(d)
            }
            return k
          },
          ae: function () {
            var a = this.B("UnicodeString"),
              b = "",
              e = 0
            for (
              2 <= a.length && "{" === a.charAt(0) && "}" === a.charAt(1) && (a = a.substr(2));
              e < a.length;

            ) {
              var h = a.charCodeAt(e)
              if (9 == h) (b += String.fromCharCode(10)), e++
              else if (128 > h) (b += String.fromCharCode(h)), e++
              else if (191 < h)
                if (224 > h) {
                  var m = a.charCodeAt(e + 1)
                  b += String.fromCharCode(((h & 31) << 6) | (m & 63))
                  e += 2
                } else if (240 > h) {
                  m = a.charCodeAt(e + 1)
                  var f = a.charCodeAt(e + 2)
                  b += String.fromCharCode(((h & 15) << 12) | ((m & 63) << 6) | (f & 63))
                  e += 3
                } else {
                  m = a.charCodeAt(e + 1)
                  f = a.charCodeAt(e + 2)
                  var p = a.charCodeAt(e + 3)
                  b += String.fromCodePoint(
                    ((h & 7) << 18) | ((m & 63) << 12) | ((f & 63) << 6) | (p & 63)
                  )
                  e += 4
                }
              else Object(d.a)("Invalid UTF-8 character")
            }
            return b
          },
          Yb: function () {
            var a = new b.ha(),
              k = this.g.D("Clip")
            null != k && (a = this.Ba(k))
            return a
          },
          $b: function (a, k) {
            return this.ce && 1 === a.length
              ? k === b.f.wc
                ? b.f.yd
                : k === b.f.Xb
                ? b.f.Xb
                : b.f.zd
              : k
          },
          tc: function (a) {
            return 0 === Object.keys(a).length && a.constructor === Object
          },
          Nc: function (a) {
            var k = this.sa("trn:BlendMode", "source-over")
            k = this.ca ? "source-over" : k
            var e = "source-over" != k && !this.Ib,
              h = this.hc()
            this.Ib && this.Rc(k)
            var m = this.zb("OriginX"),
              f = this.zb("OriginY"),
              E = this.B("FontUri")
            this.qb[E] = null
            var l = this.zb("FontRenderingEmSize"),
              t = this.fe(this.sa("Indices", ""))
            if (200 > l) {
              var z = l / 200
              h || (this.aa(), this.save(), (h = !0))
              var n = new b.K()
              n.ob(z, 0, 0, z, m, f)
              l = 200
              f = 0
              this.v.push(b.f.Eb)
              this.A.push(n.Gb())
            }
            var C = 0
            m = new p()
            var w = this.ae(),
              g = 0,
              y = 0,
              D = l / 100,
              v = ""
            n = null
            var O = this.g.D("Stroke")
            a = O ? b.f.Xb : a ? b.f.wc : b.f.xd
            m.L(b.f.Od, 0)
            for (var K = {}, x, r = 0; r < t.length; ) {
              var q = t[r],
                M = w.charCodeAt(C)
              M = 55296 <= M && 57344 > M ? Math.max(2, q.rb) : q.rb
              if (g !== q.Nb || y !== q.Ob)
                v && (m.L(this.$b(x, a), [v, g ? g * D : 0, f - y * D]), m.L(b.f.yc, [v])),
                  (g = q.Nb),
                  (y = q.Ob),
                  (v = "")
              q.ub && (K[v.length] = w.substr(C, q.rb))
              q.fc
                ? (this.tc(K) || m.L(b.f.Bc, [K]),
                  (x = v + (q.ub ? String.fromCharCode(q.Mb + 57344) : w.substr(C, M))),
                  m.L(this.$b(x, a), [x, g ? g * D : 0, f - y * D]),
                  v && m.L(b.f.yc, [v]),
                  m.L(b.f.od, [q.cc * D]),
                  (K = {}),
                  (v = ""))
                : (v += q.ub ? String.fromCharCode(q.Mb + 57344) : w.substr(C, M))
              r += q.dc
              C += M
            }
            if (v || C < w.length)
              this.tc(K) || m.L(b.f.Bc, [K]),
                (x = v + w.substr(C, w.length - C)),
                m.L(this.$b(x, a), [x, 0, 0])
            f = x = null
            g = this.g.D("Fill")
            C = !1
            null != g &&
              (this.Hb(g) ? (x = this.Ca(g, b.f.na, m)) : ((C = !0), (x = this.nb(g, b.f.na, m))))
            t = !1
            null != O &&
              (this.Hb(O) ? (n = this.Ca(O, b.f.Aa, m)) : ((t = !0), (n = this.nb(O, b.f.Aa, m))))
            g = this.g.D("OpacityMask")
            null != g && (Object(d.a)("Uh oh OpacityMask Resource!"), (f = this.Ca(g)))
            if (!this.g.V() && !a) {
              for (this.g.J(); this.g.advance(); )
                (a = this.g.O()),
                  b.f.m(a, "Glyphs.Clip", b.f.l)
                    ? (b.f.H(!this.g.V(), "Canvas.Clip: Must contain PathGeometry element"),
                      this.g.J(),
                      this.g.advance() &&
                        (h || ((h = !0), this.save(), this.aa()),
                        (a = new b.K()),
                        a.$(this.B("Transform")),
                        this.v.push(b.f.Eb),
                        this.A.push(a.Gb()),
                        b.f.H(
                          b.f.m(this.g.O(), "PathGeometry", b.f.l),
                          "Path.Clip must contain PathGeometry"
                        ),
                        (O = this.B("Figures")),
                        this.Pb(O),
                        (a = a.Va()),
                        this.v.push(b.f.Eb),
                        this.A.push(a.Gb())),
                      this.g.I())
                    : b.f.m(a, "Glyphs.Fill", b.f.l)
                    ? (this.g.J(), this.g.advance(), (x = this.Ta(b.f.na, m)), this.g.I())
                    : b.f.m(a, "Glyphs.OpacityMask", b.f.l) &&
                      !this.ca &&
                      (this.g.J(),
                      this.g.advance(),
                      (f = this.Ta(b.f.na, new p(b.f.Cb))),
                      this.g.I())
              this.g.I()
            }
            if (null == f || e)
              "otf" === E.substr(E.indexOf(".") + 1)
                ? ((E = E.substr(0, E.length - 4)), (E = parseInt(E.substr(7))))
                : (E = parseInt(E.substr(35, 8), 16)),
                (E = "f".concat(this.lc, "-").concat(E)),
                this.Ja[E]
                  ? 10 > this.Ja[E].length && (this.Ja[E] += w.substr(0, 10 - this.Ja[E].length))
                  : (this.Ja[E] = w.substr(0, 10)),
                this.ke("".concat(b.f.ad(l), "px ").concat(E)),
                null !== x && (C || ((x = new p(b.f.na, "#000000")), x.C(m)), this.ic(x, m)),
                null != n &&
                  ((l = this.ma("StrokeThickness", 1)),
                  (E = this.g.D("RenderTransform")),
                  (w = new b.K()),
                  null != E && w.$(E),
                  this.jc(l / (z * w.Qa())),
                  this.Tc(this.Ec(this.sa("StrokeStartLineCap", "Flat"))),
                  this.Uc(this.sa("StrokeLineJoin", "miter").toLowerCase()),
                  this.Vc(this.ma("StrokeMiterLimit", 10)),
                  t || ((n = new p(b.f.Aa, "#000000")), n.C(m)),
                  this.Wc(n, m))
            h && (this.restore(), this.qa())
            if (null != f || e) (this.ca = !0), this.Wb(f, k)
            this.ca = !1
          },
          Dc: function () {
            var a = []
            this.g.J()
            b.f.H(this.g.advance(), "Gradient brushes must contain GradientStops")
            for (this.g.J(); this.g.advance(); ) {
              var k = this.B("Color"),
                e = this.B("Offset")
              a.push(e)
              a.push(this.Cc(k))
            }
            this.g.I()
            this.g.I()
            return a
          },
          Wd: function (a, k, e) {
            var d = this.g.D("Transform"),
              m = new p()
            m.save()
            this.aa()
            null != d && (e.$(d), m.C(this.S(e)))
            e = this.ma("Opacity", 1)
            1 > e && m.C(this.Ra(e))
            d = this.B("StartPoint").split(",")
            e = parseFloat(d[0])
            d = parseFloat(d[1])
            var h = this.B("EndPoint").split(",")
            e = {
              type: b.f.Hd,
              x0: e,
              y0: d,
              x1: parseFloat(h[0]),
              y1: parseFloat(h[1]),
              stops: this.Dc(),
            }
            m.L(a, [e])
            m.C(k)
            m.restore()
            this.qa()
            return m
          },
          Yd: function (a, k, e) {
            var d = this.g.D("Transform"),
              m = new p(),
              h = this.B("RadiusX"),
              f = this.B("RadiusY"),
              l = this.B("GradientOrigin"),
              t = this.B("Center")
            m.save()
            this.aa()
            var z = parseFloat(h),
              n = parseFloat(f)
            b.f.H(0 < z && 0 < n, "Invalid radius value")
            var C = t.split(",")
            t = parseFloat(C[0])
            C = parseFloat(C[1])
            var w = l.split(",")
            l = parseFloat(w[0])
            w = parseFloat(w[1])
            if (null != d || h !== f)
              null != d && e.$(d),
                (d = n / z),
                (w /= d),
                (C /= d),
                (f = new b.K()),
                f.ob(1, 0, 0, d, 0, 0),
                e.Ga(f),
                m.C(this.S(e))
            e = this.ma("Opacity", 1)
            1 > e && m.C(this.Ra(e))
            h = { type: b.f.Kd, x0: l, y0: w, x1: t, y1: C, r: h, stops: this.Dc() }
            m.L(a, [h])
            m.C(k)
            m.restore()
            this.qa()
            return m
          },
          le: function () {
            b.f.H(!this.Lb, "Incorrect custom glyph start")
            this.v.push(b.f.td)
            this.A.push(null)
            this.Lb = !0
          },
          Rd: function () {
            b.f.H(this.Lb, "Incorrect custom glyph end")
            this.v.push(b.f.ud)
            this.A.push(null)
            this.Lb = !1
          },
          C: p.prototype.C,
          L: p.prototype.L,
          Wc: function (a, k) {
            var e = Object(y.a)(this.P)
            a.Pa(e.cb)
              ? k
                ? this.C(k)
                : this.L(b.f.Db, null)
              : (a.v[0] === b.f.Aa && (e.cb = a), this.C(a))
          },
          ic: function (a, k) {
            var e = Object(y.a)(this.P)
            a.Pa(e.Xa) ? this.C(k) : (a.v[0] === b.f.na && (e.Xa = a), this.C(a))
          },
          Rc: function (a) {
            var k = Object(y.a)(this.P)
            a !== k.tb && ((k.tb = a), this.L(b.f.Cd, [a]))
          },
          Ra: function (a) {
            var k = Object(y.a)(this.P)
            k.Ka *= a
            return new p(b.f.Bd, [k.Ka])
          },
          Sc: function (a) {
            var b = Object(y.a)(this.P)
            a !== b.Wa && (b.Wa = a)
          },
          jc: function (a) {
            var k = Object(y.a)(this.P)
            a !== k.ab && ((k.ab = a), this.v.push(b.f.Gd), this.A.push([a, this.Ua().Qa()]))
          },
          Tc: function (a) {
            var k = Object(y.a)(this.P)
            a !== k.Za && ((k.Za = a), this.v.push(b.f.Ed), this.A.push([a]))
          },
          Uc: function (a) {
            var k = Object(y.a)(this.P)
            a !== k.$a && ((k.$a = a), this.v.push(b.f.Fd), this.A.push([a]))
          },
          Vc: function (a) {
            var k = Object(y.a)(this.P)
            a !== k.bb && ((k.bb = a), this.v.push(b.f.Id), this.A.push([a]))
          },
          ke: function (a) {
            var k = Object(y.a)(this.P)
            a !== k.Ya && ((k.Ya = a), this.v.push(b.f.Ad), this.A.push([a]))
          },
          S: function (a) {
            Object(y.a)(this.P).wa.Ga(a)
            return new p(b.f.Eb, a.Gb())
          },
          Ua: function () {
            return Object(y.a)(this.P).wa
          },
          Sd: function () {
            return Object(y.a)(this.P).ta
          },
          be: function (a) {
            Object(y.a)(this.P).ta.gb(a)
          },
          aa: function (a) {
            a = a ? Object(y.a)(this.P).we() : Object(y.a)(this.P).clone()
            this.P.push(a)
            this.fa.push({})
          },
          qa: function () {
            this.P.pop()
            for (var a = Object.keys(this.fa[this.fa.length - 1]), k = 0; k < a; ++k) this.L(b.f.wd)
            Object(y.b)(this.fa, this.fa.length - 1)
          },
          Ud: function (a, k, e) {
            var d = new p(),
              m = this.g.D("Transform")
            d.save()
            this.aa()
            var h = this.B("Viewbox"),
              f = new b.ha()
            f.fb(h)
            h = this.B("Viewport")
            var l = new b.ha()
            l.fb(h)
            if (null != m || f !== l) {
              h = l.G / f.G
              var t = l.F / f.F,
                z = l.s - f.s * h
              f = l.u - f.u * t
              null != m && e.$(m)
              m = new b.K()
              m.ob(h, 0, 0, t, z, f)
              e.Ga(m)
              d.C(this.S(e))
            }
            e = this.ma("Opacity", 1)
            1 > e && d.C(this.Ra(e))
            e = this.sa("TileMode", "None")
            m = this.B("ImageSource")
            this.qb[m] = null
            d.L(a, [
              {
                type: b.f.Dd,
                name: "i".concat(this.lc, "-").concat(parseInt(m.split("/")[2])),
                tm: "None" === e ? "no-repeat" : "repeat",
              },
            ])
            d.C(k)
            d.restore()
            this.qa()
            return d
          },
          Vd: function () {
            var a = new p(),
              k = this.g.D("Transform")
            a.save()
            this.aa()
            var e = this.B("Viewbox"),
              d = new b.ha()
            d.fb(e)
            e = this.B("Viewport")
            var m = new b.ha()
            m.fb(e)
            if (null != k || d !== m) {
              e = m.G / d.G
              var h = m.F / d.F,
                f = m.s - d.s * e
              d = m.u - d.u * h
              m = new b.K()
              null != k && m.$(k)
              k = new b.K()
              k.ob(e, 0, 0, h, f, d)
              m.Ga(k)
              a.C(this.S(m))
            }
            k = this.ma("Opacity", 1)
            1 > k && a.C(this.Ra(k))
            this.sa("TileMode", "None")
            k = this.B("ImageSource")
            this.qb[k] = null
            k = "i".concat(this.lc, "-").concat(parseInt(k.split("/")[2]))
            e = "false" !== this.sa("trn:smooth", "true")
            a.L(b.f.vd, [k, this.Ua().Qa(), e])
            a.restore()
            this.qa()
            return a
          },
          ie: function (a) {
            if (null != a) {
              var k = new b.K()
              k.$(a)
              this.C(this.S(k))
            }
          },
          o: function (a) {
            for (var b, e = (b = a.N), d = a.ga, m = d[b]; " " !== m && "," !== m; ) ++b, (m = d[b])
            e = d.substring(e, b)
            ++b
            a.N = b
            return parseFloat(e)
          },
          Ba: function (a) {
            var k = " ",
              e = new b.Vb(a, null, 0),
              d = new b.ha(),
              m = !0
            d.initData(0, 0, 0, 0)
            if (e.N < e.ga.length) for (; " " === e.ga.charAt(e.N); ) e.N++
            for (; e.N < a.length; ) {
              if (
                ("A" <= e.ga.charAt(e.N) && "Z" >= e.ga.charAt(e.N)) ||
                ("a" <= e.ga.charAt(e.N) && "z" >= e.ga.charAt(e.N))
              )
                (k = e.ga.charAt(e.N)), e.N++
              else
                switch (("a" > k && ("H" !== k && (e.j = 0), "V" !== k && (e.i = 0)), k)) {
                  case "m":
                  case "M":
                    e.i += this.o(e)
                    e.j += this.o(e)
                    m ? (d.initData(e.i, e.j, e.i, e.j), (m = !1)) : d.ia(e.i, e.j)
                    e.T = !1
                    break
                  case "l":
                  case "L":
                    e.i += this.o(e)
                    e.j += this.o(e)
                    d.ia(e.i, e.j)
                    e.T = !1
                    break
                  case "c":
                  case "C":
                    var h = this.o(e) + e.i
                    var f = this.o(e) + e.j
                    d.ia(h, f)
                    e.T = !0
                    e.oa = this.o(e) + e.i
                    e.pa = this.o(e) + e.j
                    d.ia(e.oa, e.pa)
                    e.i += this.o(e)
                    e.j += this.o(e)
                    d.ia(e.i, e.j)
                    break
                  case "q":
                  case "Q":
                    h = this.o(e) + e.i
                    f = this.o(e) + e.j
                    d.ia(h, f)
                    e.i += this.o(e)
                    e.j += this.o(e)
                    d.ia(e.i, e.j)
                    e.T = !1
                    break
                  case "s":
                  case "S":
                    e.T || ((e.oa = e.i), (e.pa = e.j))
                    h = 2 * e.i - e.oa
                    f = 2 * e.j - e.pa
                    d.ia(h, f)
                    e.T = !0
                    e.oa = this.o(e) + e.i
                    e.pa = this.o(e) + e.j
                    d.ia(e.oa, e.pa)
                    e.i += this.o(e)
                    e.j += this.o(e)
                    d.ia(e.i, e.j)
                    break
                  case "h":
                  case "H":
                    e.i += this.o(e)
                    d.ia(e.i, e.j)
                    e.T = !1
                    break
                  case "v":
                  case "V":
                    e.j += this.o(e)
                    d.ia(e.i, e.j)
                    e.T = !1
                    break
                  default:
                    this.o(e), (e.T = !1)
                }
              for (; " " === a.charAt(e.N); ) ++e.N
            }
            return d.qe(this.Ua())
          },
          Zb: function () {
            var a = null
            this.aa()
            var k = this.g.D("RenderTransform")
            if (null != k) {
              var e = new b.K()
              e.$(k)
              this.S(e)
            }
            e = this.g.D("Stroke")
            var d = this.ma("StrokeThickness", 1)
            k = this.g.D("Clip")
            null != k && (a = this.Ba(k))
            k = this.g.D("Data")
            if (!this.g.V()) {
              for (this.g.J(); this.g.advance(); ) {
                var m = this.g.O()
                if (b.f.m(m, "Path.Data", b.f.l) && !this.g.V()) {
                  this.g.J()
                  this.g.advance() &&
                    ((k = new b.K()),
                    k.$(this.B("Transform")),
                    this.S(k),
                    b.f.H(
                      b.f.m(this.g.O(), "PathGeometry", b.f.l),
                      "Path.Data must contain PathGeometry"
                    ),
                    (k = this.B("Figures")))
                  this.g.I()
                  break
                } else
                  b.f.m(m, "Path.Clip", b.f.l)
                    ? (b.f.H(!this.g.V(), "Path.Clip: Must contain PathGeometry element"),
                      this.g.J(),
                      this.g.advance() &&
                        ((m = new b.K()),
                        m.$(this.B("Transform")),
                        this.S(m),
                        (a = this.Ba(this.B("Figures"))),
                        (m = m.Va()),
                        this.S(m)),
                      this.g.I())
                    : b.f.m(m, "Path.Stroke", b.f.l) && (e = !0)
              }
              this.g.I()
            }
            null != a ? a.gb(this.Ba(k)) : (a = this.Ba(k))
            this.qa()
            e && a.inflate(d)
            return a
          },
          pb: function (a, k, e) {
            a.T = !1
            if (null == a.ua) this.v.push(b.f.xc), this.A.push([a.i, a.j])
            else
              for (
                var d = a.ua.length,
                  m = a.i - k,
                  h = a.j - e,
                  f = h / m,
                  p = Math.sqrt(m * m + h * h);
                1e-10 < p;

              ) {
                var t = a.ua[a.Kb % d] - a.sb,
                  l = t > p
                l && ((a.sb += p), (t = p))
                if (m) {
                  var n = Math.sqrt((t * t) / (1 + f * f))
                  0 > m && (n = -n)
                  k += n
                  e += f * n
                } else e += 0 < h ? t : -t
                this.v.push(a.Kb % 2 ? b.f.zc : b.f.xc)
                this.A.push([k, e])
                p -= t
                l || (++a.Kb, (a.sb = 0))
              }
          },
          vc: function (a, k, e, d, m) {
            a.T = !0
            if (null == a.ua) this.v.push(b.f.qd), this.A.push([d, m, a.oa, a.pa, a.i, a.j])
            else {
              var h = this.Ua().Qa()
              h *= (Math.abs(a.i - k) + Math.abs(a.j - e)) / 5
              var f = a.i,
                p = a.j
              a.i = k
              a.j = e
              h = 1 / parseInt(h)
              for (var t = 0; 1 >= t; t += h) {
                var l = 1 - t,
                  A = a.i,
                  n = a.j
                a.i = l * l * l * k + 3 * l * l * t * d + 3 * l * t * t * a.oa + t * t * t * f
                a.j = l * l * l * e + 3 * l * l * t * m + 3 * l * t * t * a.pa + t * t * t * p
                this.pb(a, A, n)
              }
            }
          },
          nd: function (a) {
            if (null == a.ua) this.v.push(b.f.sd), this.A.push(null)
            else {
              var k = a.i,
                e = a.j
              a.i = a.Ic
              a.j = a.Jc
              this.pb(a, k, e)
            }
          },
          de: function (a) {
            a.Ic = a.i
            a.Jc = a.j
            this.v.push(b.f.zc)
            this.A.push([a.i, a.j])
            a.T = !1
            a.Kb = a.ec
            a.sb = a.Da
          },
          he: function (a, k) {
            var e = a.i,
              d = a.j
            "a" > k && ("H" !== k && (a.j = 0), "V" !== k && (a.i = 0))
            switch (k) {
              case "m":
              case "M":
                a.i += this.o(a)
                a.j += this.o(a)
                this.de(a)
                break
              case "l":
              case "L":
                a.i += this.o(a)
                a.j += this.o(a)
                this.pb(a, e, d)
                break
              case "c":
              case "C":
                k = this.o(a) + a.i
                var h = this.o(a) + a.j
                a.oa = this.o(a) + a.i
                a.pa = this.o(a) + a.j
                a.i += this.o(a)
                a.j += this.o(a)
                this.vc(a, e, d, k, h)
                break
              case "q":
              case "Q":
                k = this.o(a) + a.i
                h = this.o(a) + a.j
                a.i += this.o(a)
                a.j += this.o(a)
                this.L(b.f.Jd, [k, h, a.i, a.j])
                a.T = !1
                break
              case "s":
              case "S":
                a.T || ((a.oa = a.i), (a.pa = a.j))
                k = 2 * a.i - a.oa
                h = 2 * a.j - a.pa
                a.T = !0
                a.oa = this.o(a) + a.i
                a.pa = this.o(a) + a.j
                a.i += this.o(a)
                a.j += this.o(a)
                this.vc(a, e, d, k, h)
                break
              case "h":
              case "H":
                a.i += this.o(a)
                this.pb(a, e, d)
                a.T = !1
                break
              case "v":
              case "V":
                a.j += this.o(a)
                this.pb(a, e, d)
                a.T = !1
                break
              default:
                this.o(a), (a.T = !1)
            }
          },
          Ec: function (a) {
            if ("Flat" === a) return "butt"
            if ("Square" === a) return "square"
            if ("Round" === a || "Triangle" === a) return "round"
            b.f.H(!1, "Invalid line cap ".concat(a))
            return ""
          },
          Oc: function (a) {
            this.Pc(a, null, 0)
          },
          Pc: function (a, k, e) {
            var d = " "
            k = new b.Vb(a, k, e)
            e = k.ga.charAt(k.N)
            this.v.push(b.f.pd)
            this.A.push(null)
            if (k.N < k.ga.length) for (; " " === e; ) k.N++, (e = k.ga.charAt(k.N))
            for (; k.N < a.length; )
              for (
                ("A" <= e && "Z" >= e) || ("a" <= e && "z" >= e)
                  ? ((d = e), ("z" !== e && "Z" !== e) || this.nd(k), k.N++)
                  : this.he(k, d),
                  e = k.ga.charAt(k.N);
                " " === e;

              )
                ++k.N, (e = k.ga.charAt(k.N))
          },
          save: p.prototype.save,
          restore: p.prototype.restore,
          je: function () {
            var a = this.sa("trn:BlendMode", "source-over")
            a = this.ca ? "source-over" : a
            var k = "source-over" != a && !this.Ib,
              e = this.g.D("Data"),
              h = !0
            e && "F" === e[0] && (h = !1)
            var m = new p(b.f.Cb, h ? ["evenodd"] : null),
              f = !1,
              l = this.hc(),
              n = null,
              t = this.g.D("Fill")
            null != t && (n = this.Hb(t) ? this.Ca(t, b.f.na, m) : this.nb(t, b.f.na, m))
            this.Ib && this.Rc(a)
            var z = (t = null),
              y = this.ma("StrokeThickness", 1),
              C = this.g.D("Stroke")
            null != C &&
              (this.jc(y),
              (t = this.Hb(C)
                ? this.Ca(C, b.f.Aa, new p(b.f.Db))
                : this.nb(C, b.f.Aa, new p(b.f.Db))))
            C = null
            var w = this.g.D("OpacityMask")
            null != w && (Object(d.a)("Uh oh OpacityMask Resource!"), (C = this.Ca(w)))
            w = null
            if (!this.g.V()) {
              for (this.g.J(); this.g.advance(); ) {
                var g = this.g.O()
                b.f.m(g, "Path.Clip", b.f.l)
                  ? (b.f.H(!this.g.V(), "Path.Clip: Must contain PathGeometry element"),
                    this.g.J(),
                    this.g.advance() &&
                      (l || ((l = !0), this.save(), this.aa()),
                      (w = new b.K()),
                      w.$(this.B("Transform")),
                      this.C(this.S(w)),
                      b.f.H(
                        b.f.m(this.g.O(), "PathGeometry", b.f.l),
                        "Path.Clip must contain PathGeometry"
                      ),
                      (g = this.B("Figures")),
                      this.Pb(g),
                      (w = w.Va())),
                    this.g.I())
                  : b.f.m(g, "Path.Data", b.f.l) && !this.g.V()
                  ? (this.g.J(),
                    this.g.advance() &&
                      ((e = new b.K()),
                      e.$(this.B("Transform")),
                      null != w ? w.Ga(e) : (w = e),
                      this.C(this.S(w)),
                      b.f.H(
                        b.f.m(this.g.O(), "PathGeometry", b.f.l),
                        "Path.Data must contain PathGeometry"
                      ),
                      (e = this.B("Figures"))),
                    this.g.I())
                  : b.f.m(g, "Path.Fill", b.f.l)
                  ? (this.g.J(),
                    this.g.advance(),
                    null != C || k || "ImageBrush" !== this.g.O()
                      ? (n = this.Ta(b.f.na, m))
                      : ((f = !0), this.C(this.Vd())),
                    this.g.I())
                  : b.f.m(g, "Path.OpacityMask", b.f.l)
                  ? this.ca || (this.g.J(), this.g.advance(), (C = this.Ta(b.f.na, m)), this.g.I())
                  : b.f.m(g, "Path.Stroke", b.f.l) &&
                    (this.g.J(),
                    this.g.advance(),
                    (t = this.Ta(b.f.Aa, new p(b.f.Db), y)),
                    this.g.I())
              }
              this.g.I()
            }
            if (null == C && !k && !f) {
              b.f.H(null != e, "Paths must have Data defined")
              f = this.g.D("StrokeDashArray")
              if (null != f)
                for (f = f.split(" "), z = Array(f.length), w = 0; w < f.length; ++w)
                  if (((z[w] = parseFloat(f[w]) * y), !z[w] || 0.02 > z[w])) z[w] = 0.02
              this.Sc(h ? "evenodd" : "nonzero")
              h = this.ma("StrokeDashOffset", 0)
              null != z && null != n && (this.Oc(e), null != n && this.ic(n, m), (n = null))
              this.Pc(e, z, h)
              null != n && this.ic(n, m)
              null != t &&
                (this.Tc(this.Ec(this.sa("StrokeStartLineCap", "Flat"))),
                this.Uc(this.sa("StrokeLineJoin", "miter").toLowerCase()),
                this.Vc(this.ma("StrokeMiterLimit", 10)),
                this.Wc(t))
            }
            l && (this.restore(), this.qa())
            if (null != C || k) (this.ca = !0), this.Wb(C, a)
            this.ca = !1
          },
          Cc: function (a) {
            var k = 1,
              e = [255, 255, 255, 255]
            if ("#" === a.charAt(0)) {
              if (7 === a.length) return a
              b.f.H(9 === a.length, "Color ".concat(a, " is invalid in a XOD file"))
              k = a.substr(1, 2)
              var d = a.substr(3, 2)
              var h = a.substr(5, 2)
              a = a.substr(7, 2)
              k = parseInt(k, 16) / 255
              e[0] = parseInt(d, 16)
              e[1] = parseInt(h, 16)
              e[2] = parseInt(a, 16)
            } else
              "s" === a.charAt(0)
                ? ((d = a.split("#")[1].split(",")),
                  3 < d.length
                    ? ((k = parseFloat(d[0])),
                      (h = 255 * parseFloat(d[1])),
                      (e[0] = parseInt(0 > h ? 0 : 255 < h ? 255 : h)),
                      (h = 255 * parseFloat(d[2])),
                      (e[1] = parseInt(0 > h ? 0 : 255 < h ? 255 : h)),
                      (h = 255 * parseFloat(d[3])),
                      (e[2] = parseInt(0 > h ? 0 : 255 < h ? 255 : h)))
                    : ((h = 255 * parseFloat(d[0])),
                      (e[0] = parseInt(0 > h ? 0 : 255 < h ? 255 : h)),
                      (h = 255 * parseFloat(d[1])),
                      (e[1] = parseInt(0 > h ? 0 : 255 < h ? 255 : h)),
                      (h = 255 * parseFloat(d[2])),
                      (e[2] = parseInt(0 > h ? 0 : 255 < h ? 255 : h))))
                : b.f.H(!1, "Invalid color for a XOD file")
            return "rgba("
              .concat(e[0], ",")
              .concat(e[1], ",")
              .concat(e[2], ",")
              .concat(b.f.ad(k), ")")
          },
          Zd: function (a, b) {
            return this.nb(this.B("Color"), a, b)
          },
          nb: function (a, b, e) {
            a = new p(b, this.Cc(a))
            a.C(e)
            return a
          },
          ac: function () {
            var a = this.La,
              k = this.v,
              e = this.A
            this.v = []
            this.A = []
            this.La = this.g.depth
            this.aa(!0)
            if (!this.g.V() || !b.f.m(this.g.O(), "Canvas", b.f.l)) for (this.Ia = !1; this.gc(); );
            this.qa()
            var d = { operators: this.v, data: this.A }
            this.La = a
            this.v = k
            this.A = e
            return d
          },
          Fc: function (a, k, e, d) {
            var h = new p(),
              f = this.B("Viewbox"),
              l = new b.ha()
            l.fb(f)
            f = this.B("Viewport")
            var n = new b.ha()
            n.fb(f)
            f = this.g.D("Transform")
            h.save()
            this.aa()
            if (!this.g.V()) {
              for (this.g.J(); this.g.advance(); ) {
                var t = this.g.O()
                if (b.f.m(t, "VisualBrush.Visual", b.f.l)) {
                  this.g.J()
                  b.f.H(
                    this.g.advance(),
                    "VisualBrush.Visual must contain Canvas, Path or Glyphs element"
                  )
                  this.aa(!0)
                  Object(y.a)(this.P).wa = new b.K()
                  var z = this.Fb()
                  this.qa()
                  this.g.I()
                }
              }
              this.g.I()
            }
            if ("undefined" !== typeof z && 0 !== z.F && 0 !== z.G) {
              t = n.s - l.s
              var A = n.u - l.u
              l.gb(z)
              n = l
              n.s += t
              n.u += A
            }
            if (0 === l.G || 0 === l.F) return (a = new p(a, "rgba(0,0,0,0)")), a.C(k), a
            if (null != f || l !== n)
              (z = n.G / l.G),
                (t = n.F / l.F),
                (A = n.s - l.s * z),
                (n = n.u - l.u * t),
                null != f && e.$(f),
                (f = new b.K()),
                f.ob(z, 0, 0, t, A, n),
                e.Ga(f),
                h.C(this.S(e))
            n = this.Ua().Qa()
            f = Math.min(l.G, l.F)
            z = this.ma("Opacity", 1)
            1 > z && h.C(this.Ra(z))
            z = this.sa("TileMode", "None")
            t = {}
            A = this.g.D("Visual")
            null != A && ((A = this.Ca(A)), (t.operators = { operators: A.v, data: A.A }))
            if (!this.g.V()) {
              for (this.g.J(); this.g.advance(); )
                (A = this.g.O()),
                  b.f.m(A, "VisualBrush.Visual", b.f.l) &&
                    (this.g.J(),
                    b.f.H(
                      this.g.advance(),
                      "VisualBrush.Visual must contain Canvas, Path or Glyphs element"
                    ),
                    (t.operators = this.ac()),
                    this.g.I())
              this.g.I()
            }
            t.type = b.f.Pd
            t.tm = "None" === z ? "no-repeat" : "repeat"
            a === b.f.Aa && (t.strokeAdjust = d / e.Qa())
            if (l.s || l.u) (t.x = l.s), (t.y = l.u)
            t.w = l.G
            t.h = l.F
            t.minwh = f
            t.scale = n
            h.L(a, [t])
            h.C(k)
            h.restore()
            this.qa()
            return h
          },
          Hb: function (a) {
            return "{" === a.charAt(0)
          },
          Ca: function (a) {
            var k = a.indexOf("StaticResource")
            b.f.H(0 < k, "Invalid resource reference: ".concat(a))
            k += 15
            a = a.substr(k, a.length - 1 - k)
            k = null
            for (var e = this.fa.length - 1; 0 <= e; --e)
              if (this.fa[e][a]) {
                k = this.fa[e][a]
                break
              }
            b.f.H(null != k, "Dictionary key ".concat(a, " does not exist."))
            return new p(b.f.Ld, [a])
          },
          gc: function () {
            if (this.Ia) {
              if (this.g.depth === this.La)
                return b.f.m(this.g.O(), "Canvas", b.f.l) && this.vb(), !1
              var a = this.g.advance()
              if (!a) {
                this.g.I()
                if (Object(y.a)(this.Jb) === this.g.depth) return this.Jb.pop(), this.Rd(), !0
                if (this.g.depth === this.La)
                  return b.f.m(this.g.O(), "Canvas", b.f.l) && this.vb(), !1
                this.vb()
                return !0
              }
            }
            this.Ia = !0
            a = this.g.O()
            b.f.m(a, "Canvas", b.f.l)
              ? this.ge()
              : b.f.m(a, "Path", b.f.l)
              ? this.je()
              : b.f.m(a, "Glyphs", b.f.l)
              ? this.Nc(!1)
              : b.f.m(a, "trn:Glyphs", b.f.l) &&
                (this.g.V() || this.Jb.push(this.g.depth),
                this.Nc(!0),
                this.g.V() || (this.g.J(), this.le()))
            return !0
          },
          md: function () {
            var a = b.f.na,
              k = new p(b.f.Cb)
            a = this.Fc(a, k, new b.K())
            k = this.cd()
            this.fa[this.fa.length - 1][k] = a
            this.L(b.f.Ac, [k, a.v, a.A])
          },
          ld: function (a) {
            a = this.ac()
            var k = this.cd()
            this.fa[this.fa.length - 1][k] = a
            this.L(b.f.Ac, [k, a.operators, a.data])
          },
          Ta: function (a, k, e) {
            var d = new b.K(),
              h = this.g.O()
            if (b.f.m(h, "VisualBrush", b.f.l)) var f = this.Fc(a, k, d, e)
            else
              b.f.m(h, "ImageBrush", b.f.l)
                ? (f = this.Ud(a, k, d))
                : b.f.m(h, "LinearGradientBrush", b.f.l)
                ? (f = this.Wd(a, k, d))
                : b.f.m(h, "RadialGradientBrush", b.f.l)
                ? (f = this.Yd(a, k, d))
                : b.f.m(h, "SolidColorBrush", b.f.l)
                ? (f = this.Zd(a, k))
                : b.f.H(!1, "Invalid Brush Type: ".concat(h)),
                "undefined" !== typeof e && (this.S(d), this.jc(e / d.Qa()), this.S(d.Va()))
            return f
          },
          Qc: function () {
            var a = this.g.O()
            if (b.f.m(a, "ResourceDictionary", b.f.l) && !this.g.V()) {
              for (this.g.J(); this.g.advance(); )
                (a = this.g.O()),
                  b.f.m(a, "VisualBrush", b.f.l)
                    ? this.md()
                    : b.f.m(a, "Canvas", b.f.l)
                    ? this.ld()
                    : b.f.H(!1, "Resource type is invalid: ".concat(a))
              this.g.I()
            }
          },
          Td: function () {
            for (var a = ""; !this.done; ) a += this.hb()
            return a
          },
          hb: function () {
            this.Mc = !1
            for (this.qb = {}; this.v.length < this.Hc && !this.Mc && this.gc(); );
            this.gc() || (this.done = !0)
            var a = { operators: this.v, data: this.A }
            this.v = []
            this.A = []
            return a
          },
          oe: function () {
            var a = [],
              b = this.qb,
              e
            for (e in b) a.push(e.substr(1))
            return a
          },
          done: !1,
          Ia: !1,
          ca: !1,
          Lc: 0,
          Kc: 0,
          Hc: 0,
          Ja: null,
          qb: null,
          La: 0,
          fa: null,
          P: null,
          g: null,
          Jb: null,
          Lb: !1,
        }
        b.Ha = function () {
          this.fc = this.ub = !1
          this.rb = this.dc = 1
          this.cc = this.Nb = this.Ob = this.Mb = 0
        }
        b.Ha.prototype = { ub: !1, fc: !1, rb: 0, dc: 0, Mb: 0, cc: 0, Nb: 0, Ob: 0 }
        b.Sa = function () {}
        b.Sa.se = function (a, k) {
          var e = new b.Sa()
          e.cb = "black"
          e.Xa = "black"
          e.Wa = "nonzero"
          e.Ka = 1
          e.tb = "source-over"
          e.ab = 1
          e.Za = "butt"
          e.$a = "miter"
          e.bb = 10
          e.Ya = "10px sans-serif"
          e.wa = new b.K()
          e.ta = new b.ha()
          e.ta.initData(0, 0, a, k)
          return e
        }
        b.Sa.prototype = {
          clone: function () {
            var a = new b.Sa()
            a.cb = this.cb
            a.Xa = this.Xa
            a.Wa = this.Wa
            a.Ka = this.Ka
            a.tb = this.tb
            a.ab = this.ab
            a.Za = this.Za
            a.$a = this.$a
            a.bb = this.bb
            a.Ya = this.Ya
            a.wa = new b.K()
            a.wa.bc(this.wa)
            a.ta = new b.ha()
            a.ta.initData(this.ta.s, this.ta.u, this.ta.G, this.ta.F)
            return a
          },
          we: function () {
            var a = new b.Sa()
            a.cb = "black"
            a.Xa = "black"
            a.Wa = "nonzero"
            a.Ka = 1
            a.tb = "source-over"
            a.ab = 1
            a.Za = "butt"
            a.$a = "miter"
            a.bb = 10
            a.Ya = "10px sans-serif"
            a.wa = new b.K()
            a.wa.bc(this.wa)
            a.ta = new b.ha()
            return a
          },
          cb: null,
          Xa: null,
          Wa: null,
          Ka: 0,
          ab: 0,
          Za: null,
          $a: null,
          bb: 0,
          Ya: null,
          wa: null,
          ta: null,
        }
        b.mb = function (a, b) {
          this.x = a
          this.y = b
        }
        b.mb.prototype = { x: 0, y: 0 }
        b.ha = function () {
          this.u = this.s = -1e6
          this.G = this.F = 2e6
        }
        b.ha.prototype = {
          initData: function (a, b, e, d) {
            this.s = a
            this.u = b
            this.G = e
            this.F = d
          },
          te: function () {
            return 0 < this.G && 0 < this.F
          },
          fb: function (a) {
            a = a.split(",")
            b.f.H(4 === a.length, "Rectangles should contain 4 numbers")
            this.s = parseFloat(a[0])
            this.u = parseFloat(a[1])
            this.G = parseFloat(a[2])
            this.F = parseFloat(a[3])
          },
          qe: function (a) {
            if (a.Gc()) return this
            var d = new b.mb(this.s, this.u),
              e = new b.mb(this.s, this.u + this.F),
              h = new b.mb(this.s + this.G, this.u),
              f = new b.mb(this.s + this.G, this.u + this.F)
            a.Ub(d)
            a.Ub(e)
            a.Ub(h)
            a.Ub(f)
            a = Math.min(d.x, e.x, h.x, f.x)
            var l = Math.min(d.y, e.y, h.y, f.y),
              p = new b.ha()
            p.initData(a, l, Math.max(d.x, e.x, h.x, f.x) - a, Math.max(d.y, e.y, h.y, f.y) - l)
            return p
          },
          ia: function (a, b) {
            a < this.s
              ? ((this.G += this.s - a), (this.s = a))
              : a > this.s + this.G && (this.G = a - this.s)
            b < this.u
              ? ((this.F += this.u - b), (this.u = b))
              : b > this.u + this.F && (this.F = b - this.u)
          },
          sc: function (a) {
            this.ia(a.s, a.u)
            this.ia(a.s + a.G, a.u + a.F)
          },
          gb: function (a) {
            var b = this.s
            var e = this.s + this.G
            var d = this.u
            var h = this.u + this.F
            var f = a.s
            var l = a.s + a.G
            var p = a.u
            a = a.u + a.F
            e < f || l < b || h < p || a < d
              ? (this.s = this.G = this.u = this.F = 0)
              : ((this.s = b < f ? f : b),
                (this.G = (e < l ? e : l) - this.s),
                (this.u = d < p ? p : d),
                (this.F = (h < a ? h : a) - this.u),
                (this.G && this.F) || (this.s = this.G = this.u = this.F = 0))
          },
          inflate: function (a) {
            this.s -= a
            this.u -= a
            this.G += 2 * a
            this.F += 2 * a
          },
          s: 0,
          u: 0,
          G: 0,
          F: 0,
        }
        b.K = function () {}
        b.K.prototype = {
          W: 1,
          X: 0,
          Y: 0,
          Z: 1,
          ba: 0,
          da: 0,
          $: function (a) {
            var b = [1, 0, 0, 1, 0, 0]
            a = a.split(",")
            for (var e = 0; e < a.length && 6 > e; ++e) b[e] = parseFloat(a[e])
            this.W = b[0]
            this.X = b[1]
            this.Y = b[2]
            this.Z = b[3]
            this.ba = b[4]
            this.da = b[5]
          },
          ob: function (a, b, e, d, h, f) {
            this.W = a
            this.X = b
            this.Y = e
            this.Z = d
            this.ba = h
            this.da = f
          },
          bc: function (a) {
            this.W = a.W
            this.X = a.X
            this.Y = a.Y
            this.Z = a.Z
            this.ba = a.ba
            this.da = a.da
          },
          Ga: function (a) {
            var b = this.W,
              e = this.X,
              d = this.Y,
              h = this.Z
            this.W = a.W * b + a.X * d
            this.X = a.W * e + a.X * h
            this.Y = a.Y * b + a.Z * d
            this.Z = a.Y * e + a.Z * h
            this.ba = a.ba * b + a.da * d + this.ba
            this.da = a.ba * e + a.da * h + this.da
          },
          Va: function () {
            var a = new b.K(),
              d = this.W * this.Z - this.X * this.Y
            if (!d) return a
            a.W = this.Z / d
            a.Y = -this.Y / d
            a.ba = (this.Y * this.da - this.ba * this.Z) / d
            a.X = -this.X / d
            a.Z = this.W / d
            a.da = -(this.W * this.da - this.ba * this.X) / d
            return a
          },
          Ub: function (a) {
            var b = a.x * this.X + a.y * this.Z + this.da
            a.x = a.x * this.W + a.y * this.Y + this.ba
            a.y = b
          },
          Qa: function () {
            var a = 0.707106781 * this.W + 0.707106781 * this.X,
              b = 0.707106781 * this.Y + 0.707106781 * this.Z
            return Math.sqrt(a * a + b * b)
          },
          Gc: function () {
            return 1 !== this.W || this.X || this.Y || 1 !== this.Z || this.ba || this.da ? !1 : !0
          },
          Gb: function () {
            return this.Xd()
          },
          Xd: function () {
            return this.Gc() ? null : [this.W, this.X, this.Y, this.Z, this.ba, this.da]
          },
        }
        b.Vb = function (a, b, e) {
          this.ga = a
          this.i = this.j = this.N = 0
          this.T = !1
          this.ua = b
          if (null != this.ua) {
            for (b = a = 0; b < this.ua.length; ++b) a += this.ua[b]
            this.Da = e % a
            0 > this.Da && (this.Da += a)
            for (e = this.ec = 0; this.Da > this.ua[e]; ++e) (this.Da -= this.ua[e]), ++this.ec
          }
        }
        b.Vb.prototype = {
          ga: null,
          N: 0,
          ua: null,
          Kb: 0,
          sb: 0,
          ec: 0,
          Da: 0,
          i: 0,
          j: 0,
          Ic: 0,
          Jc: 0,
          T: !1,
          oa: 0,
          pa: 0,
        }
        b.ee = function () {}
        b.ee.prototype = {}
        b.f.ff = "http://schemas.microsoft.com/xps/2005/06/resourcedictionary-key"
        b.f.mf = "http://schemas.openxps.org/oxps/v1.0/resourcedictionary-key"
        b.f.tf = "http://schemas.microsoft.com/winfx/2006/xaml"
        b.f.l = "http://schemas.microsoft.com/xps/2005/06"
        b.f.uf = "http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        b.f.nf = "http://schemas.openxps.org/oxps/v1.0"
        b.f.wf = "http://schemas.microsoft.com/xps/2005/06/documentstructure"
        b.f.lf = "http://schemas.openxps.org/oxps/v1.0/documentstructure"
        b.f.rf = "http://schemas.openxmlformats.org/package/2006/relationships"
        b.f.Ye = "http://schemas.openxmlformats.org/package/2006/content-types"
        b.f.gf = "http://schemas.openxmlformats.org/markup-compatibility/2006"
        b.f.Ze = "http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
        b.f.$e = "http://purl.org/dc/elements/1.1/"
        b.f.af = "http://purl.org/dc/terms/"
        b.f.vf = "http://www.w3.org/XML/1998/namespace"
        b.f.sf = "clr-namespace:PDFTron.SilverDox.Internal;assembly=SilverDox"
        b.f.xf = "http://schemas.microsoft.com/xps/2005/06/restricted-font"
        b.f.pf = "http://schemas.openxps.org/oxps/v1.0/restricted-font"
        b.f.hf = "application/vnd.ms-package.obfuscated-opentype"
        b.f.qf = "http://www.pdftron.com/silverdox/2010/09"
        b.f.Nd = 0
        b.f.Md = 1
        b.f.Eb = 2
        b.f.ef = 3
        b.f.Gd = 4
        b.f.Ed = 5
        b.f.Aa = 6
        b.f.na = 7
        b.f.Bd = 8
        b.f.Ac = 9
        b.f.wd = 10
        b.f.od = 11
        b.f.Ld = 12
        b.f.pd = 13
        b.f.sd = 14
        b.f.Cb = 15
        b.f.Db = 16
        b.f.rd = 17
        b.f.zc = 18
        b.f.xc = 19
        b.f.Jd = 20
        b.f.qd = 21
        b.f.Ad = 22
        b.f.xd = 23
        b.f.yc = 24
        b.f.Od = 25
        b.f.Id = 26
        b.f.Fd = 27
        b.f.vd = 28
        b.f.df = 29
        b.f.cf = 30
        b.f.zd = 31
        b.f.td = 32
        b.f.ud = 33
        b.f.Cd = 34
        b.f.Bc = 35
        b.f.Qd = 36
        b.f.bf = 37
        b.f.wc = 38
        b.f.yd = 39
        b.f.Xb = 40
        b.f.Pd = 1
        b.f.Hd = 2
        b.f.Kd = 3
        b.f.Dd = 4
        b.f.jf =
          "S r t T w c s f a L R P A b z F X C M l q B n x m W i j I Z d D e xw cgb cge g bO tm".split(
            " "
          )
        b.f.kf =
          "S r t T w c s f a L R P A b z F X C M l q B n xc m W i j I Z d D e xcw cgb cge g bO tm".split(
            " "
          )
      })("undefined" !== typeof window ? window : self)
    },
    function (n, f, l) {
      var h = l(7),
        d = l(4),
        D = l(8)
      l.n(D)
      ;(function (f) {
        f.trn.f || (f.trn = trn)
        var l = function k(a) {
          this.M = ""
          this.data = a
          this.ed = new D.Inflate({ windowBits: -15, chunkSize: k.prototype.chunkSize })
          this.pc()
          this.start = 0
        }
        l.prototype = {
          chunkSize: 102400,
          mark: function (a) {
            var d = a - this.start
            d > l.prototype.chunkSize && ((this.M = this.M.slice(d)), (this.start = a))
          },
          indexOf: function (a, d) {
            d -= this.start
            do var e = this.M.indexOf(a, d)
            while (-1 === e && this.pc())
            return e + this.start
          },
          charAt: function (a) {
            a -= this.start
            a >= this.M.length && this.pc()
            return this.M.charAt(a)
          },
          substring: function (a, d) {
            a -= this.start
            d -= this.start
            return this.M.substring(a, d)
          },
          pe: function () {
            var a = ""
            this.ed.onData = function (d) {
              a += Object(h.a)(d)
            }
            this.ed.push(this.data.slice(0, l.prototype.chunkSize), 2)
            this.data = this.data.slice(l.prototype.chunkSize)
            return a
          },
          pc: function () {
            var a = this.pe()
            return a.length ? ((this.M += a), !0) : !1
          },
        }
        f.hb = function () {
          if (f.Na.done) return f.postMessage({ command: "done" }), (f.Na = null), !1
          var a = f.Na.hb()
          f.postMessage({ command: "nextChunk", resources: f.Na.oe(), dataString: a })
          return !0
        }
        var p = (function () {
          var a = navigator.userAgent.toLowerCase()
          return (a = /(msie) ([\w.]+)/.exec(a) || /(trident)(?:.*? rv:([\w.]+)|)/.exec(a))
            ? parseInt(a[2], 10)
            : a
        })()
        f.Yc = function () {
          if (9 === p) for (; f.hb(); );
          else
            setTimeout(function () {
              f.Na && f.hb() && f.Yc()
            }, 0)
        }
        f.jd = l
        f.Xc = !1
        f.onmessage = function (a) {
          switch (a.data.command) {
            case "data":
              var h = new d.a(new f.jd(a.data.dataString))
              f.Na = new f.trn.f(h, f.Xc, f.Ae, a.data.docId)
              f.Zc && f.Yc()
              break
            case "nextChunk":
              f.Zc || (f.Na && f.hb())
              break
            case "cancel":
              f.Na = null
              f.postMessage({ command: "done" })
              break
            case "options":
              f.Xc = a.data.imageScaling
              f.Ae = a.data.specialBlendSupported
              f.Zc = a.data.continueWithoutPrompt
              break
            default:
              throw Error("Unknown message command ".concat(a.data.command))
          }
        }
      })(self)
    },
    function (n, f, l) {
      function h(a) {
        return ((a >>> 24) & 255) + ((a >>> 8) & 65280) + ((a & 65280) << 8) + ((a & 255) << 24)
      }
      function d() {
        this.mode = 0
        this.Tb = !1
        this.va = 0
        this.nc = !1
        this.total = this.check = this.Qb = this.flags = 0
        this.head = null
        this.ja = this.za = this.ka = this.jb = 0
        this.window = null
        this.U = this.offset = this.length = this.R = this.Fa = 0
        this.Oa = this.ya = null
        this.ra = this.yb = this.ib = this.hd = this.eb = this.xa = 0
        this.next = null
        this.ea = new a.kb(320)
        this.Bb = new a.kb(288)
        this.$c = this.fd = null
        this.Ce = this.back = this.qc = 0
      }
      function D(b) {
        if (!b || !b.state) return -2
        var e = b.state
        b.rc = b.Ab = e.total = 0
        b.msg = ""
        e.va && (b.Ma = e.va & 1)
        e.mode = 1
        e.Tb = 0
        e.nc = 0
        e.Qb = 32768
        e.head = null
        e.Fa = 0
        e.R = 0
        e.ya = e.fd = new a.lb(852)
        e.Oa = e.$c = new a.lb(592)
        e.qc = 1
        e.back = -1
        return 0
      }
      function y(a) {
        if (!a || !a.state) return -2
        var b = a.state
        b.ka = 0
        b.za = 0
        b.ja = 0
        return D(a)
      }
      function v(a, b) {
        if (!a || !a.state) return -2
        var e = a.state
        if (0 > b) {
          var d = 0
          b = -b
        } else (d = (b >> 4) + 1), 48 > b && (b &= 15)
        if (b && (8 > b || 15 < b)) return -2
        null !== e.window && e.jb !== b && (e.window = null)
        e.va = d
        e.jb = b
        return y(a)
      }
      function p(a, b) {
        if (!a) return -2
        var e = new d()
        a.state = e
        e.window = null
        b = v(a, b)
        0 !== b && (a.state = null)
        return b
      }
      function b(b, e, d, h) {
        var f = b.state
        null === f.window &&
          ((f.ka = 1 << f.jb), (f.ja = 0), (f.za = 0), (f.window = new a.Buf8(f.ka)))
        h >= f.ka
          ? (a.arraySet(f.window, e, d - f.ka, f.ka, 0), (f.ja = 0), (f.za = f.ka))
          : ((b = f.ka - f.ja),
            b > h && (b = h),
            a.arraySet(f.window, e, d - h, b, f.ja),
            (h -= b)
              ? (a.arraySet(f.window, e, d - h, h, 0), (f.ja = h), (f.za = f.ka))
              : ((f.ja += b), f.ja === f.ka && (f.ja = 0), f.za < f.ka && (f.za += b)))
        return 0
      }
      var a = l(3),
        k = l(14),
        e = l(15),
        A = l(16),
        m = l(17),
        F = !0,
        E,
        R
      f.Df = y
      f.Ef = v
      f.Ff = D
      f.Cf = function (a) {
        return p(a, 15)
      }
      f.inflateInit2 = p
      f.inflate = function (d, f) {
        var l,
          p = new a.Buf8(4),
          n = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
        if (!d || !d.state || !d.output || (!d.input && 0 !== d.avail_in)) return -2
        var g = d.state
        12 === g.mode && (g.mode = 13)
        var t = d.next_out
        var D = d.output
        var y = d.avail_out
        var v = d.next_in
        var z = d.input
        var x = d.avail_in
        var r = g.Fa
        var q = g.R
        var M = x
        var I = y
        var N = 0
        a: for (;;)
          switch (g.mode) {
            case 1:
              if (0 === g.va) {
                g.mode = 13
                break
              }
              for (; 16 > q; ) {
                if (0 === x) break a
                x--
                r += z[v++] << q
                q += 8
              }
              if (g.va & 2 && 35615 === r) {
                g.check = 0
                p[0] = r & 255
                p[1] = (r >>> 8) & 255
                g.check = e(g.check, p, 2, 0)
                q = r = 0
                g.mode = 2
                break
              }
              g.flags = 0
              g.head && (g.head.done = !1)
              if (!(g.va & 1) || (((r & 255) << 8) + (r >> 8)) % 31) {
                d.msg = "incorrect header check"
                g.mode = 30
                break
              }
              if (8 !== (r & 15)) {
                d.msg = "unknown compression method"
                g.mode = 30
                break
              }
              r >>>= 4
              q -= 4
              var B = (r & 15) + 8
              if (0 === g.jb) g.jb = B
              else if (B > g.jb) {
                d.msg = "invalid window size"
                g.mode = 30
                break
              }
              g.Qb = 1 << B
              d.Ma = g.check = 1
              g.mode = r & 512 ? 10 : 12
              q = r = 0
              break
            case 2:
              for (; 16 > q; ) {
                if (0 === x) break a
                x--
                r += z[v++] << q
                q += 8
              }
              g.flags = r
              if (8 !== (g.flags & 255)) {
                d.msg = "unknown compression method"
                g.mode = 30
                break
              }
              if (g.flags & 57344) {
                d.msg = "unknown header flags set"
                g.mode = 30
                break
              }
              g.head && (g.head.text = (r >> 8) & 1)
              g.flags & 512 &&
                ((p[0] = r & 255), (p[1] = (r >>> 8) & 255), (g.check = e(g.check, p, 2, 0)))
              q = r = 0
              g.mode = 3
            case 3:
              for (; 32 > q; ) {
                if (0 === x) break a
                x--
                r += z[v++] << q
                q += 8
              }
              g.head && (g.head.time = r)
              g.flags & 512 &&
                ((p[0] = r & 255),
                (p[1] = (r >>> 8) & 255),
                (p[2] = (r >>> 16) & 255),
                (p[3] = (r >>> 24) & 255),
                (g.check = e(g.check, p, 4, 0)))
              q = r = 0
              g.mode = 4
            case 4:
              for (; 16 > q; ) {
                if (0 === x) break a
                x--
                r += z[v++] << q
                q += 8
              }
              g.head && ((g.head.De = r & 255), (g.head.ye = r >> 8))
              g.flags & 512 &&
                ((p[0] = r & 255), (p[1] = (r >>> 8) & 255), (g.check = e(g.check, p, 2, 0)))
              q = r = 0
              g.mode = 5
            case 5:
              if (g.flags & 1024) {
                for (; 16 > q; ) {
                  if (0 === x) break a
                  x--
                  r += z[v++] << q
                  q += 8
                }
                g.length = r
                g.head && (g.head.mc = r)
                g.flags & 512 &&
                  ((p[0] = r & 255), (p[1] = (r >>> 8) & 255), (g.check = e(g.check, p, 2, 0)))
                q = r = 0
              } else g.head && (g.head.U = null)
              g.mode = 6
            case 6:
              if (g.flags & 1024) {
                var u = g.length
                u > x && (u = x)
                u &&
                  (g.head &&
                    ((B = g.head.mc - g.length),
                    g.head.U || (g.head.U = Array(g.head.mc)),
                    a.arraySet(g.head.U, z, v, u, B)),
                  g.flags & 512 && (g.check = e(g.check, z, u, v)),
                  (x -= u),
                  (v += u),
                  (g.length -= u))
                if (g.length) break a
              }
              g.length = 0
              g.mode = 7
            case 7:
              if (g.flags & 2048) {
                if (0 === x) break a
                u = 0
                do
                  (B = z[v + u++]),
                    g.head && B && 65536 > g.length && (g.head.name += String.fromCharCode(B))
                while (B && u < x)
                g.flags & 512 && (g.check = e(g.check, z, u, v))
                x -= u
                v += u
                if (B) break a
              } else g.head && (g.head.name = null)
              g.length = 0
              g.mode = 8
            case 8:
              if (g.flags & 4096) {
                if (0 === x) break a
                u = 0
                do
                  (B = z[v + u++]),
                    g.head && B && 65536 > g.length && (g.head.kc += String.fromCharCode(B))
                while (B && u < x)
                g.flags & 512 && (g.check = e(g.check, z, u, v))
                x -= u
                v += u
                if (B) break a
              } else g.head && (g.head.kc = null)
              g.mode = 9
            case 9:
              if (g.flags & 512) {
                for (; 16 > q; ) {
                  if (0 === x) break a
                  x--
                  r += z[v++] << q
                  q += 8
                }
                if (r !== (g.check & 65535)) {
                  d.msg = "header crc mismatch"
                  g.mode = 30
                  break
                }
                q = r = 0
              }
              g.head && ((g.head.re = (g.flags >> 9) & 1), (g.head.done = !0))
              d.Ma = g.check = 0
              g.mode = 12
              break
            case 10:
              for (; 32 > q; ) {
                if (0 === x) break a
                x--
                r += z[v++] << q
                q += 8
              }
              d.Ma = g.check = h(r)
              q = r = 0
              g.mode = 11
            case 11:
              if (0 === g.nc)
                return (
                  (d.next_out = t),
                  (d.avail_out = y),
                  (d.next_in = v),
                  (d.avail_in = x),
                  (g.Fa = r),
                  (g.R = q),
                  2
                )
              d.Ma = g.check = 1
              g.mode = 12
            case 12:
              if (5 === f || 6 === f) break a
            case 13:
              if (g.Tb) {
                r >>>= q & 7
                q -= q & 7
                g.mode = 27
                break
              }
              for (; 3 > q; ) {
                if (0 === x) break a
                x--
                r += z[v++] << q
                q += 8
              }
              g.Tb = r & 1
              r >>>= 1
              --q
              switch (r & 3) {
                case 0:
                  g.mode = 14
                  break
                case 1:
                  B = g
                  if (F) {
                    E = new a.lb(512)
                    R = new a.lb(32)
                    for (u = 0; 144 > u; ) B.ea[u++] = 8
                    for (; 256 > u; ) B.ea[u++] = 9
                    for (; 280 > u; ) B.ea[u++] = 7
                    for (; 288 > u; ) B.ea[u++] = 8
                    m(1, B.ea, 0, 288, E, 0, B.Bb, { R: 9 })
                    for (u = 0; 32 > u; ) B.ea[u++] = 5
                    m(2, B.ea, 0, 32, R, 0, B.Bb, { R: 5 })
                    F = !1
                  }
                  B.ya = E
                  B.xa = 9
                  B.Oa = R
                  B.eb = 5
                  g.mode = 20
                  if (6 === f) {
                    r >>>= 2
                    q -= 2
                    break a
                  }
                  break
                case 2:
                  g.mode = 17
                  break
                case 3:
                  ;(d.msg = "invalid block type"), (g.mode = 30)
              }
              r >>>= 2
              q -= 2
              break
            case 14:
              r >>>= q & 7
              for (q -= q & 7; 32 > q; ) {
                if (0 === x) break a
                x--
                r += z[v++] << q
                q += 8
              }
              if ((r & 65535) !== ((r >>> 16) ^ 65535)) {
                d.msg = "invalid stored block lengths"
                g.mode = 30
                break
              }
              g.length = r & 65535
              q = r = 0
              g.mode = 15
              if (6 === f) break a
            case 15:
              g.mode = 16
            case 16:
              if ((u = g.length)) {
                u > x && (u = x)
                u > y && (u = y)
                if (0 === u) break a
                a.arraySet(D, z, v, u, t)
                x -= u
                v += u
                y -= u
                t += u
                g.length -= u
                break
              }
              g.mode = 12
              break
            case 17:
              for (; 14 > q; ) {
                if (0 === x) break a
                x--
                r += z[v++] << q
                q += 8
              }
              g.ib = (r & 31) + 257
              r >>>= 5
              q -= 5
              g.yb = (r & 31) + 1
              r >>>= 5
              q -= 5
              g.hd = (r & 15) + 4
              r >>>= 4
              q -= 4
              if (286 < g.ib || 30 < g.yb) {
                d.msg = "too many length or distance symbols"
                g.mode = 30
                break
              }
              g.ra = 0
              g.mode = 18
            case 18:
              for (; g.ra < g.hd; ) {
                for (; 3 > q; ) {
                  if (0 === x) break a
                  x--
                  r += z[v++] << q
                  q += 8
                }
                g.ea[n[g.ra++]] = r & 7
                r >>>= 3
                q -= 3
              }
              for (; 19 > g.ra; ) g.ea[n[g.ra++]] = 0
              g.ya = g.fd
              g.xa = 7
              u = { R: g.xa }
              N = m(0, g.ea, 0, 19, g.ya, 0, g.Bb, u)
              g.xa = u.R
              if (N) {
                d.msg = "invalid code lengths set"
                g.mode = 30
                break
              }
              g.ra = 0
              g.mode = 19
            case 19:
              for (; g.ra < g.ib + g.yb; ) {
                for (;;) {
                  var H = g.ya[r & ((1 << g.xa) - 1)]
                  u = H >>> 24
                  H &= 65535
                  if (u <= q) break
                  if (0 === x) break a
                  x--
                  r += z[v++] << q
                  q += 8
                }
                if (16 > H) (r >>>= u), (q -= u), (g.ea[g.ra++] = H)
                else {
                  if (16 === H) {
                    for (B = u + 2; q < B; ) {
                      if (0 === x) break a
                      x--
                      r += z[v++] << q
                      q += 8
                    }
                    r >>>= u
                    q -= u
                    if (0 === g.ra) {
                      d.msg = "invalid bit length repeat"
                      g.mode = 30
                      break
                    }
                    B = g.ea[g.ra - 1]
                    u = 3 + (r & 3)
                    r >>>= 2
                    q -= 2
                  } else if (17 === H) {
                    for (B = u + 3; q < B; ) {
                      if (0 === x) break a
                      x--
                      r += z[v++] << q
                      q += 8
                    }
                    r >>>= u
                    q -= u
                    B = 0
                    u = 3 + (r & 7)
                    r >>>= 3
                    q -= 3
                  } else {
                    for (B = u + 7; q < B; ) {
                      if (0 === x) break a
                      x--
                      r += z[v++] << q
                      q += 8
                    }
                    r >>>= u
                    q -= u
                    B = 0
                    u = 11 + (r & 127)
                    r >>>= 7
                    q -= 7
                  }
                  if (g.ra + u > g.ib + g.yb) {
                    d.msg = "invalid bit length repeat"
                    g.mode = 30
                    break
                  }
                  for (; u--; ) g.ea[g.ra++] = B
                }
              }
              if (30 === g.mode) break
              if (0 === g.ea[256]) {
                d.msg = "invalid code -- missing end-of-block"
                g.mode = 30
                break
              }
              g.xa = 9
              u = { R: g.xa }
              N = m(1, g.ea, 0, g.ib, g.ya, 0, g.Bb, u)
              g.xa = u.R
              if (N) {
                d.msg = "invalid literal/lengths set"
                g.mode = 30
                break
              }
              g.eb = 6
              g.Oa = g.$c
              u = { R: g.eb }
              N = m(2, g.ea, g.ib, g.yb, g.Oa, 0, g.Bb, u)
              g.eb = u.R
              if (N) {
                d.msg = "invalid distances set"
                g.mode = 30
                break
              }
              g.mode = 20
              if (6 === f) break a
            case 20:
              g.mode = 21
            case 21:
              if (6 <= x && 258 <= y) {
                d.next_out = t
                d.avail_out = y
                d.next_in = v
                d.avail_in = x
                g.Fa = r
                g.R = q
                A(d, I)
                t = d.next_out
                D = d.output
                y = d.avail_out
                v = d.next_in
                z = d.input
                x = d.avail_in
                r = g.Fa
                q = g.R
                12 === g.mode && (g.back = -1)
                break
              }
              for (g.back = 0; ; ) {
                H = g.ya[r & ((1 << g.xa) - 1)]
                u = H >>> 24
                B = (H >>> 16) & 255
                H &= 65535
                if (u <= q) break
                if (0 === x) break a
                x--
                r += z[v++] << q
                q += 8
              }
              if (B && 0 === (B & 240)) {
                var L = u
                var W = B
                for (l = H; ; ) {
                  H = g.ya[l + ((r & ((1 << (L + W)) - 1)) >> L)]
                  u = H >>> 24
                  B = (H >>> 16) & 255
                  H &= 65535
                  if (L + u <= q) break
                  if (0 === x) break a
                  x--
                  r += z[v++] << q
                  q += 8
                }
                r >>>= L
                q -= L
                g.back += L
              }
              r >>>= u
              q -= u
              g.back += u
              g.length = H
              if (0 === B) {
                g.mode = 26
                break
              }
              if (B & 32) {
                g.back = -1
                g.mode = 12
                break
              }
              if (B & 64) {
                d.msg = "invalid literal/length code"
                g.mode = 30
                break
              }
              g.U = B & 15
              g.mode = 22
            case 22:
              if (g.U) {
                for (B = g.U; q < B; ) {
                  if (0 === x) break a
                  x--
                  r += z[v++] << q
                  q += 8
                }
                g.length += r & ((1 << g.U) - 1)
                r >>>= g.U
                q -= g.U
                g.back += g.U
              }
              g.Ce = g.length
              g.mode = 23
            case 23:
              for (;;) {
                H = g.Oa[r & ((1 << g.eb) - 1)]
                u = H >>> 24
                B = (H >>> 16) & 255
                H &= 65535
                if (u <= q) break
                if (0 === x) break a
                x--
                r += z[v++] << q
                q += 8
              }
              if (0 === (B & 240)) {
                L = u
                W = B
                for (l = H; ; ) {
                  H = g.Oa[l + ((r & ((1 << (L + W)) - 1)) >> L)]
                  u = H >>> 24
                  B = (H >>> 16) & 255
                  H &= 65535
                  if (L + u <= q) break
                  if (0 === x) break a
                  x--
                  r += z[v++] << q
                  q += 8
                }
                r >>>= L
                q -= L
                g.back += L
              }
              r >>>= u
              q -= u
              g.back += u
              if (B & 64) {
                d.msg = "invalid distance code"
                g.mode = 30
                break
              }
              g.offset = H
              g.U = B & 15
              g.mode = 24
            case 24:
              if (g.U) {
                for (B = g.U; q < B; ) {
                  if (0 === x) break a
                  x--
                  r += z[v++] << q
                  q += 8
                }
                g.offset += r & ((1 << g.U) - 1)
                r >>>= g.U
                q -= g.U
                g.back += g.U
              }
              if (g.offset > g.Qb) {
                d.msg = "invalid distance too far back"
                g.mode = 30
                break
              }
              g.mode = 25
            case 25:
              if (0 === y) break a
              u = I - y
              if (g.offset > u) {
                u = g.offset - u
                if (u > g.za && g.qc) {
                  d.msg = "invalid distance too far back"
                  g.mode = 30
                  break
                }
                u > g.ja ? ((u -= g.ja), (B = g.ka - u)) : (B = g.ja - u)
                u > g.length && (u = g.length)
                L = g.window
              } else (L = D), (B = t - g.offset), (u = g.length)
              u > y && (u = y)
              y -= u
              g.length -= u
              do D[t++] = L[B++]
              while (--u)
              0 === g.length && (g.mode = 21)
              break
            case 26:
              if (0 === y) break a
              D[t++] = g.length
              y--
              g.mode = 21
              break
            case 27:
              if (g.va) {
                for (; 32 > q; ) {
                  if (0 === x) break a
                  x--
                  r |= z[v++] << q
                  q += 8
                }
                I -= y
                d.Ab += I
                g.total += I
                I && (d.Ma = g.check = g.flags ? e(g.check, D, I, t - I) : k(g.check, D, I, t - I))
                I = y
                if ((g.flags ? r : h(r)) !== g.check) {
                  d.msg = "incorrect data check"
                  g.mode = 30
                  break
                }
                q = r = 0
              }
              g.mode = 28
            case 28:
              if (g.va && g.flags) {
                for (; 32 > q; ) {
                  if (0 === x) break a
                  x--
                  r += z[v++] << q
                  q += 8
                }
                if (r !== (g.total & 4294967295)) {
                  d.msg = "incorrect length check"
                  g.mode = 30
                  break
                }
                q = r = 0
              }
              g.mode = 29
            case 29:
              N = 1
              break a
            case 30:
              N = -3
              break a
            case 31:
              return -4
            default:
              return -2
          }
        d.next_out = t
        d.avail_out = y
        d.next_in = v
        d.avail_in = x
        g.Fa = r
        g.R = q
        if (
          (g.ka || (I !== d.avail_out && 30 > g.mode && (27 > g.mode || 4 !== f))) &&
          b(d, d.output, d.next_out, I - d.avail_out)
        )
          return (g.mode = 31), -4
        M -= d.avail_in
        I -= d.avail_out
        d.rc += M
        d.Ab += I
        g.total += I
        g.va &&
          I &&
          (d.Ma = g.check =
            g.flags ? e(g.check, D, I, d.next_out - I) : k(g.check, D, I, d.next_out - I))
        d.me =
          g.R +
          (g.Tb ? 64 : 0) +
          (12 === g.mode ? 128 : 0) +
          (20 === g.mode || 15 === g.mode ? 256 : 0)
        ;((0 === M && 0 === I) || 4 === f) && 0 === N && (N = -5)
        return N
      }
      f.inflateEnd = function (a) {
        if (!a || !a.state) return -2
        var b = a.state
        b.window && (b.window = null)
        a.state = null
        return 0
      }
      f.inflateGetHeader = function (a, b) {
        if (!a || !a.state) return -2
        a = a.state
        if (0 === (a.va & 2)) return -2
        a.head = b
        b.done = !1
        return 0
      }
      f.inflateSetDictionary = function (a, d) {
        var e = d.length
        if (!a || !a.state) return -2
        var f = a.state
        if (0 !== f.va && 11 !== f.mode) return -2
        if (11 === f.mode) {
          var h = k(1, d, e, 0)
          if (h !== f.check) return -3
        }
        if (b(a, d, e, e)) return (f.mode = 31), -4
        f.nc = 1
        return 0
      }
      f.Bf = "pako inflate (from Nodeca project)"
    },
    function (n) {
      n.la = function (f, l, h, d) {
        var n = (f & 65535) | 0
        f = ((f >>> 16) & 65535) | 0
        for (var y; 0 !== h; ) {
          y = 2e3 < h ? 2e3 : h
          h -= y
          do (n = (n + l[d++]) | 0), (f = (f + n) | 0)
          while (--y)
          n %= 65521
          f %= 65521
        }
        return n | (f << 16) | 0
      }
    },
    function (n) {
      var f = (function () {
        for (var f, h = [], d = 0; 256 > d; d++) {
          f = d
          for (var n = 0; 8 > n; n++) f = f & 1 ? 3988292384 ^ (f >>> 1) : f >>> 1
          h[d] = f
        }
        return h
      })()
      n.la = function (l, h, d, n) {
        d = n + d
        for (l ^= -1; n < d; n++) l = (l >>> 8) ^ f[(l ^ h[n]) & 255]
        return l ^ -1
      }
    },
    function (n) {
      n.la = function (f, l) {
        var h = f.state
        var d = f.next_in
        var n = f.input
        var y = d + (f.avail_in - 5)
        var v = f.next_out
        var p = f.output
        l = v - (l - f.avail_out)
        var b = v + (f.avail_out - 257)
        var a = h.Qb
        var k = h.ka
        var e = h.za
        var A = h.ja
        var m = h.window
        var F = h.Fa
        var E = h.R
        var R = h.ya
        var t = h.Oa
        var z = (1 << h.xa) - 1
        var ca = (1 << h.eb) - 1
        a: do {
          15 > E && ((F += n[d++] << E), (E += 8), (F += n[d++] << E), (E += 8))
          var C = R[F & z]
          b: for (;;) {
            var w = C >>> 24
            F >>>= w
            E -= w
            w = (C >>> 16) & 255
            if (0 === w) p[v++] = C & 65535
            else if (w & 16) {
              var g = C & 65535
              if ((w &= 15))
                E < w && ((F += n[d++] << E), (E += 8)),
                  (g += F & ((1 << w) - 1)),
                  (F >>>= w),
                  (E -= w)
              15 > E && ((F += n[d++] << E), (E += 8), (F += n[d++] << E), (E += 8))
              C = t[F & ca]
              c: for (;;) {
                w = C >>> 24
                F >>>= w
                E -= w
                w = (C >>> 16) & 255
                if (w & 16) {
                  C &= 65535
                  w &= 15
                  E < w && ((F += n[d++] << E), (E += 8), E < w && ((F += n[d++] << E), (E += 8)))
                  C += F & ((1 << w) - 1)
                  if (C > a) {
                    f.msg = "invalid distance too far back"
                    h.mode = 30
                    break a
                  }
                  F >>>= w
                  E -= w
                  w = v - l
                  if (C > w) {
                    w = C - w
                    if (w > e && h.qc) {
                      f.msg = "invalid distance too far back"
                      h.mode = 30
                      break a
                    }
                    var G = 0
                    var J = m
                    if (0 === A) {
                      if (((G += k - w), w < g)) {
                        g -= w
                        do p[v++] = m[G++]
                        while (--w)
                        G = v - C
                        J = p
                      }
                    } else if (A < w) {
                      if (((G += k + A - w), (w -= A), w < g)) {
                        g -= w
                        do p[v++] = m[G++]
                        while (--w)
                        G = 0
                        if (A < g) {
                          w = A
                          g -= w
                          do p[v++] = m[G++]
                          while (--w)
                          G = v - C
                          J = p
                        }
                      }
                    } else if (((G += A - w), w < g)) {
                      g -= w
                      do p[v++] = m[G++]
                      while (--w)
                      G = v - C
                      J = p
                    }
                    for (; 2 < g; )
                      (p[v++] = J[G++]), (p[v++] = J[G++]), (p[v++] = J[G++]), (g -= 3)
                    g && ((p[v++] = J[G++]), 1 < g && (p[v++] = J[G++]))
                  } else {
                    G = v - C
                    do (p[v++] = p[G++]), (p[v++] = p[G++]), (p[v++] = p[G++]), (g -= 3)
                    while (2 < g)
                    g && ((p[v++] = p[G++]), 1 < g && (p[v++] = p[G++]))
                  }
                } else if (0 === (w & 64)) {
                  C = t[(C & 65535) + (F & ((1 << w) - 1))]
                  continue c
                } else {
                  f.msg = "invalid distance code"
                  h.mode = 30
                  break a
                }
                break
              }
            } else if (0 === (w & 64)) {
              C = R[(C & 65535) + (F & ((1 << w) - 1))]
              continue b
            } else {
              w & 32 ? (h.mode = 12) : ((f.msg = "invalid literal/length code"), (h.mode = 30))
              break a
            }
            break
          }
        } while (d < y && v < b)
        g = E >> 3
        d -= g
        E -= g << 3
        f.next_in = d
        f.next_out = v
        f.avail_in = d < y ? 5 + (y - d) : 5 - (d - y)
        f.avail_out = v < b ? 257 + (b - v) : 257 - (v - b)
        h.Fa = F & ((1 << E) - 1)
        h.R = E
      }
    },
    function (n, f, l) {
      var h = l(3),
        d = [
          3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115,
          131, 163, 195, 227, 258, 0, 0,
        ],
        D = [
          16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20,
          20, 20, 21, 21, 21, 21, 16, 72, 78,
        ],
        y = [
          1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537,
          2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0,
        ],
        v = [
          16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25,
          26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
        ]
      n.la = function (f, b, a, k, e, l, m, n) {
        var p = n.R,
          A,
          t,
          z,
          F,
          C,
          w,
          g = 0,
          G = new h.kb(16)
        var J = new h.kb(16)
        var S,
          O = 0
        for (A = 0; 15 >= A; A++) G[A] = 0
        for (t = 0; t < k; t++) G[b[a + t]]++
        var K = p
        for (z = 15; 1 <= z && 0 === G[z]; z--);
        K > z && (K = z)
        if (0 === z) return (e[l++] = 20971520), (e[l++] = 20971520), (n.R = 1), 0
        for (p = 1; p < z && 0 === G[p]; p++);
        K < p && (K = p)
        for (A = F = 1; 15 >= A; A++) if (((F <<= 1), (F -= G[A]), 0 > F)) return -1
        if (0 < F && (0 === f || 1 !== z)) return -1
        J[1] = 0
        for (A = 1; 15 > A; A++) J[A + 1] = J[A] + G[A]
        for (t = 0; t < k; t++) 0 !== b[a + t] && (m[J[b[a + t]]++] = t)
        if (0 === f) {
          var x = (S = m)
          var r = 19
        } else
          1 === f
            ? ((x = d), (g -= 257), (S = D), (O -= 257), (r = 256))
            : ((x = y), (S = v), (r = -1))
        t = C = 0
        A = p
        var q = l
        k = K
        J = 0
        var M = -1
        var I = 1 << K
        var N = I - 1
        if ((1 === f && 852 < I) || (2 === f && 592 < I)) return 1
        for (;;) {
          var B = A - J
          if (m[t] < r) {
            var u = 0
            var H = m[t]
          } else m[t] > r ? ((u = S[O + m[t]]), (H = x[g + m[t]])) : ((u = 96), (H = 0))
          F = 1 << (A - J)
          p = w = 1 << k
          do (w -= F), (e[q + (C >> J) + w] = (B << 24) | (u << 16) | H | 0)
          while (0 !== w)
          for (F = 1 << (A - 1); C & F; ) F >>= 1
          0 !== F ? ((C &= F - 1), (C += F)) : (C = 0)
          t++
          if (0 === --G[A]) {
            if (A === z) break
            A = b[a + m[t]]
          }
          if (A > K && (C & N) !== M) {
            0 === J && (J = K)
            q += p
            k = A - J
            for (F = 1 << k; k + J < z; ) {
              F -= G[k + J]
              if (0 >= F) break
              k++
              F <<= 1
            }
            I += 1 << k
            if ((1 === f && 852 < I) || (2 === f && 592 < I)) return 1
            M = C & N
            e[M] = (K << 24) | (k << 16) | (q - l) | 0
          }
        }
        0 !== C && (e[q + C] = ((A - J) << 24) | 4194304)
        n.R = K
        return 0
      }
    },
    function (n, f, l) {
      function h(f, b) {
        if (65534 > b && ((f.subarray && y) || (!f.subarray && D)))
          return String.fromCharCode.apply(null, d.shrinkBuf(f, b))
        for (var a = "", h = 0; h < b; h++) a += String.fromCharCode(f[h])
        return a
      }
      var d = l(3),
        D = !0,
        y = !0,
        v = new d.Buf8(256)
      for (n = 0; 256 > n; n++)
        v[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1
      v[254] = v[254] = 1
      f.string2buf = function (f) {
        var b,
          a,
          h = f.length,
          e = 0
        for (b = 0; b < h; b++) {
          var l = f.charCodeAt(b)
          if (55296 === (l & 64512) && b + 1 < h) {
            var m = f.charCodeAt(b + 1)
            56320 === (m & 64512) && ((l = 65536 + ((l - 55296) << 10) + (m - 56320)), b++)
          }
          e += 128 > l ? 1 : 2048 > l ? 2 : 65536 > l ? 3 : 4
        }
        var p = new d.Buf8(e)
        for (b = a = 0; a < e; b++)
          (l = f.charCodeAt(b)),
            55296 === (l & 64512) &&
              b + 1 < h &&
              ((m = f.charCodeAt(b + 1)),
              56320 === (m & 64512) && ((l = 65536 + ((l - 55296) << 10) + (m - 56320)), b++)),
            128 > l
              ? (p[a++] = l)
              : (2048 > l
                  ? (p[a++] = 192 | (l >>> 6))
                  : (65536 > l
                      ? (p[a++] = 224 | (l >>> 12))
                      : ((p[a++] = 240 | (l >>> 18)), (p[a++] = 128 | ((l >>> 12) & 63))),
                    (p[a++] = 128 | ((l >>> 6) & 63))),
                (p[a++] = 128 | (l & 63)))
        return p
      }
      f.yf = function (d) {
        return h(d, d.length)
      }
      f.binstring2buf = function (f) {
        for (var b = new d.Buf8(f.length), a = 0, h = b.length; a < h; a++) b[a] = f.charCodeAt(a)
        return b
      }
      f.buf2string = function (d, b) {
        var a,
          f = b || d.length,
          e = Array(2 * f)
        for (b = a = 0; b < f; ) {
          var l = d[b++]
          if (128 > l) e[a++] = l
          else {
            var m = v[l]
            if (4 < m) (e[a++] = 65533), (b += m - 1)
            else {
              for (l &= 2 === m ? 31 : 3 === m ? 15 : 7; 1 < m && b < f; )
                (l = (l << 6) | (d[b++] & 63)), m--
              1 < m
                ? (e[a++] = 65533)
                : 65536 > l
                ? (e[a++] = l)
                : ((l -= 65536),
                  (e[a++] = 55296 | ((l >> 10) & 1023)),
                  (e[a++] = 56320 | (l & 1023)))
            }
          }
        }
        return h(e, a)
      }
      f.utf8border = function (d, b) {
        var a
        b = b || d.length
        b > d.length && (b = d.length)
        for (a = b - 1; 0 <= a && 128 === (d[a] & 192); ) a--
        return 0 > a || 0 === a ? b : a + v[d[a]] > b ? a : b
      }
    },
    function (n) {
      n.la = {
        Z_NO_FLUSH: 0,
        Se: 1,
        Z_SYNC_FLUSH: 2,
        Pe: 3,
        Z_FINISH: 4,
        He: 5,
        We: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Me: -1,
        Ue: -2,
        Ie: -3,
        Z_BUF_ERROR: -5,
        Re: 0,
        Fe: 1,
        Ee: 9,
        Je: -1,
        Ne: 1,
        Qe: 2,
        Te: 3,
        Oe: 4,
        Ke: 0,
        Ge: 0,
        Ve: 1,
        Xe: 2,
        Le: 8,
      }
    },
    function (n) {
      n.la = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version",
      }
    },
    function (n) {
      n.la = function () {
        this.input = null
        this.rc = this.avail_in = this.next_in = 0
        this.output = null
        this.Ab = this.avail_out = this.next_out = 0
        this.msg = ""
        this.state = null
        this.me = 2
        this.Ma = 0
      }
    },
    function (n) {
      n.la = function () {
        this.ye = this.De = this.time = this.text = 0
        this.U = null
        this.mc = 0
        this.kc = this.name = ""
        this.re = 0
        this.done = !1
      }
    },
  ])
}.call(this || window))
