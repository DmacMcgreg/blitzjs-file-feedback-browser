;(function () {
  var $jscomp = $jscomp || {}
  $jscomp.scope = {}
  $jscomp.arrayIteratorImpl = function (c) {
    var b = 0
    return function () {
      return b < c.length ? { done: !1, value: c[b++] } : { done: !0 }
    }
  }
  $jscomp.arrayIterator = function (c) {
    return { next: $jscomp.arrayIteratorImpl(c) }
  }
  $jscomp.makeIterator = function (c) {
    var b = "undefined" != typeof Symbol && Symbol.iterator && c[Symbol.iterator]
    return b ? b.call(c) : $jscomp.arrayIterator(c)
  }
  $jscomp.getGlobal = function (c) {
    return "undefined" != typeof window && window === c
      ? c
      : "undefined" != typeof global && null != global
      ? global
      : c
  }
  $jscomp.global = $jscomp.getGlobal(this)
  $jscomp.ASSUME_ES5 = !1
  $jscomp.ASSUME_NO_NATIVE_MAP = !1
  $jscomp.ASSUME_NO_NATIVE_SET = !1
  $jscomp.SIMPLE_FROUND_POLYFILL = !1
  $jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
      ? Object.defineProperty
      : function (c, b, l) {
          c != Array.prototype && c != Object.prototype && (c[b] = l.value)
        }
  $jscomp.polyfill = function (c, b, l, g) {
    if (b) {
      l = $jscomp.global
      c = c.split(".")
      for (g = 0; g < c.length - 1; g++) {
        var a = c[g]
        a in l || (l[a] = {})
        l = l[a]
      }
      c = c[c.length - 1]
      g = l[c]
      b = b(g)
      b != g &&
        null != b &&
        $jscomp.defineProperty(l, c, { configurable: !0, writable: !0, value: b })
    }
  }
  $jscomp.FORCE_POLYFILL_PROMISE = !1
  $jscomp.polyfill(
    "Promise",
    function (c) {
      function b() {
        this.batch_ = null
      }
      function l(k) {
        return k instanceof a
          ? k
          : new a(function (a, b) {
              a(k)
            })
      }
      if (c && !$jscomp.FORCE_POLYFILL_PROMISE) return c
      b.prototype.asyncExecute = function (k) {
        null == this.batch_ && ((this.batch_ = []), this.asyncExecuteBatch_())
        this.batch_.push(k)
        return this
      }
      b.prototype.asyncExecuteBatch_ = function () {
        var k = this
        this.asyncExecuteFunction(function () {
          k.executeBatch_()
        })
      }
      var g = $jscomp.global.setTimeout
      b.prototype.asyncExecuteFunction = function (k) {
        g(k, 0)
      }
      b.prototype.executeBatch_ = function () {
        for (; this.batch_ && this.batch_.length; ) {
          var k = this.batch_
          this.batch_ = []
          for (var a = 0; a < k.length; ++a) {
            var b = k[a]
            k[a] = null
            try {
              b()
            } catch (q) {
              this.asyncThrow_(q)
            }
          }
        }
        this.batch_ = null
      }
      b.prototype.asyncThrow_ = function (k) {
        this.asyncExecuteFunction(function () {
          throw k
        })
      }
      var a = function (k) {
        this.state_ = 0
        this.result_ = void 0
        this.onSettledCallbacks_ = []
        var a = this.createResolveAndReject_()
        try {
          k(a.resolve, a.reject)
        } catch (u) {
          a.reject(u)
        }
      }
      a.prototype.createResolveAndReject_ = function () {
        function a(a) {
          return function (k) {
            d || ((d = !0), a.call(b, k))
          }
        }
        var b = this,
          d = !1
        return { resolve: a(this.resolveTo_), reject: a(this.reject_) }
      }
      a.prototype.resolveTo_ = function (k) {
        if (k === this) this.reject_(new TypeError("A Promise cannot resolve to itself"))
        else if (k instanceof a) this.settleSameAsPromise_(k)
        else {
          a: switch (typeof k) {
            case "object":
              var b = null != k
              break a
            case "function":
              b = !0
              break a
            default:
              b = !1
          }
          b ? this.resolveToNonPromiseObj_(k) : this.fulfill_(k)
        }
      }
      a.prototype.resolveToNonPromiseObj_ = function (a) {
        var b = void 0
        try {
          b = a.then
        } catch (u) {
          this.reject_(u)
          return
        }
        "function" == typeof b ? this.settleSameAsThenable_(b, a) : this.fulfill_(a)
      }
      a.prototype.reject_ = function (a) {
        this.settle_(2, a)
      }
      a.prototype.fulfill_ = function (a) {
        this.settle_(1, a)
      }
      a.prototype.settle_ = function (a, b) {
        if (0 != this.state_)
          throw Error(
            "Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.state_
          )
        this.state_ = a
        this.result_ = b
        this.executeOnSettledCallbacks_()
      }
      a.prototype.executeOnSettledCallbacks_ = function () {
        if (null != this.onSettledCallbacks_) {
          for (var a = 0; a < this.onSettledCallbacks_.length; ++a)
            d.asyncExecute(this.onSettledCallbacks_[a])
          this.onSettledCallbacks_ = null
        }
      }
      var d = new b()
      a.prototype.settleSameAsPromise_ = function (a) {
        var b = this.createResolveAndReject_()
        a.callWhenSettled_(b.resolve, b.reject)
      }
      a.prototype.settleSameAsThenable_ = function (a, b) {
        var d = this.createResolveAndReject_()
        try {
          a.call(b, d.resolve, d.reject)
        } catch (q) {
          d.reject(q)
        }
      }
      a.prototype.then = function (b, d) {
        function g(a, b) {
          return "function" == typeof a
            ? function (b) {
                try {
                  k(a(b))
                } catch (v) {
                  c(v)
                }
              }
            : b
        }
        var k,
          c,
          l = new a(function (a, b) {
            k = a
            c = b
          })
        this.callWhenSettled_(g(b, k), g(d, c))
        return l
      }
      a.prototype.catch = function (a) {
        return this.then(void 0, a)
      }
      a.prototype.callWhenSettled_ = function (a, b) {
        function g() {
          switch (k.state_) {
            case 1:
              a(k.result_)
              break
            case 2:
              b(k.result_)
              break
            default:
              throw Error("Unexpected state: " + k.state_)
          }
        }
        var k = this
        null == this.onSettledCallbacks_ ? d.asyncExecute(g) : this.onSettledCallbacks_.push(g)
      }
      a.resolve = l
      a.reject = function (b) {
        return new a(function (a, d) {
          d(b)
        })
      }
      a.race = function (b) {
        return new a(function (a, d) {
          for (var g = $jscomp.makeIterator(b), k = g.next(); !k.done; k = g.next())
            l(k.value).callWhenSettled_(a, d)
        })
      }
      a.all = function (b) {
        var d = $jscomp.makeIterator(b),
          g = d.next()
        return g.done
          ? l([])
          : new a(function (a, b) {
              function k(b) {
                return function (d) {
                  c[b] = d
                  x--
                  0 == x && a(c)
                }
              }
              var c = [],
                x = 0
              do
                c.push(void 0), x++, l(g.value).callWhenSettled_(k(c.length - 1), b), (g = d.next())
              while (!g.done)
            })
      }
      return a
    },
    "es6",
    "es3"
  )
  ;(function (c) {
    function b(g) {
      if (l[g]) return l[g].exports
      var a = (l[g] = { i: g, l: !1, exports: {} })
      c[g].call(a.exports, a, a.exports, b)
      a.l = !0
      return a.exports
    }
    var l = {}
    b.m = c
    b.c = l
    b.d = function (g, a, d) {
      b.o(g, a) || Object.defineProperty(g, a, { enumerable: !0, get: d })
    }
    b.r = function (b) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(b, Symbol.toStringTag, { value: "Module" })
      Object.defineProperty(b, "__esModule", { value: !0 })
    }
    b.t = function (g, a) {
      a & 1 && (g = b(g))
      if (a & 8 || (a & 4 && "object" === typeof g && g && g.__esModule)) return g
      var d = Object.create(null)
      b.r(d)
      Object.defineProperty(d, "default", { enumerable: !0, value: g })
      if (a & 2 && "string" != typeof g)
        for (var k in g)
          b.d(
            d,
            k,
            function (a) {
              return g[a]
            }.bind(null, k)
          )
      return d
    }
    b.n = function (g) {
      var a =
        g && g.__esModule
          ? function () {
              return g["default"]
            }
          : function () {
              return g
            }
      b.d(a, "a", a)
      return a
    }
    b.o = function (b, a) {
      return Object.prototype.hasOwnProperty.call(b, a)
    }
    b.p = "/core"
    return b((b.s = 1))
  })([
    function (c, b, l) {
      ;(function (g) {
        l.d(b, "b", function () {
          return p
        })
        l.d(b, "a", function () {
          return E
        })
        l.d(b, "c", function () {
          return r
        })
        l.d(b, "d", function () {
          return D
        })
        var a = l(4)
        l.n(a)
        var d = window,
          k = (function () {
            return function (a, n) {
              this.fs_q = this.fs_read_counter = 0
              this.needCallback = !1
              this.fs_read_total = a
              this.fs_q = n
            }
          })()
        d.AsyncFSHack = { readingAsyncFS: 0, readingCounter: 0, readCalls: {} }
        var c = d.Module,
          u = 0,
          q = {},
          z = function (a) {
            d.AsyncFSHack.readingAsyncFS = 1
            a in d.AsyncFSHack.readCalls ||
              (d.AsyncFSHack.readCalls[a] = new k(d.AsyncFSHack.read_total, d.AsyncFSHack.q))
          },
          A = function (a) {
            var n = d.AsyncFSHack.readCalls[a]
            ++n.fs_read_counter
            n.fs_read_counter >= n.fs_read_total &&
              (n.needCallback
                ? c._finish_do_call_operation(n.fs_q)
                : (d.AsyncFSHack.readingAsyncFS = 0),
              delete d.AsyncFSHack.readCalls[a])
          },
          C = function (a, n, b, h, f, e) {
            this.lruList = []
            this.chunkMap = {}
            this.chunkReader = {}
            this.chunkMap[n] = h
            this.length = n
            this.cacheDataSize = b
            this.url = a
            this.customHeaders = f
            this.withCredentials = e
            this.chunkSize = 1048576
          }
        C.prototype = {
          lruUpdate: function (a) {
            var b = this.lruList.lastIndexOf(a)
            0 <= b && this.lruList.splice(b, 1)
            this.lruList.push(a)
          },
          downloadChunk: function (a, b) {
            var n = !1
            a in this.chunkReader || ((this.chunkReader[a] = []), (n = !0))
            b && this.chunkReader[a].push(b)
            if (n) {
              b = Math.min(a + this.chunkSize, this.length) - 1
              var h = new XMLHttpRequest()
              h.open("GET", this.url, !0)
              h.responseType = "arraybuffer"
              h.setRequestHeader("Range", ["bytes=", a, "-", b].join(""))
              this.withCredentials && (h.withCredentials = this.withCredentials)
              if (this.customHeaders)
                for (var f in this.customHeaders) h.setRequestHeader(f, this.customHeaders[f])
              h.send()
              var e = this
              h.onload = function () {
                if (200 === h.status || 206 === h.status) {
                  var b = new Int8Array(h.response)
                  e.writeChunk(b, a)
                } else
                  window.parent.parentWarn("Failed to load data from" + e.url),
                    (b = new Int8Array(0))
                for (var n = e.chunkReader[a], f = 0; f < n.length; f++) n[f](b)
                delete e.chunkReader[a]
              }
            }
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
          updateCache: function (a) {
            for (var b = 0; b < a.length; b++) {
              var t = a[b]
              this.hadChunk(t) && (this.hasChunk(t) ? this.lruUpdate(t) : this.downloadChunk(t))
            }
          },
          wrapChunkRetrieval: function (a, b, d) {
            this.downloadChunk(a, function (a) {
              d(a, b)
            })
          },
          downloadChunks: function (a, b) {
            for (
              var n = a.length,
                h = Array(n),
                f = 0,
                e = function (a, e) {
                  h[e] = a
                  ++f
                  f === n && b(h)
                },
                m = 0;
              m < n;
              ++m
            )
              this.wrapChunkRetrieval(a[m][0], m, e)
          },
          readFromCache: function (a, b, d) {
            var h = [],
              f = 0,
              e = Math.floor(b / this.chunkSize) * this.chunkSize,
              m = b % this.chunkSize
            b = this.chunkSize - m
            b = b > d ? d : b
            this.chunkMap[e]
              ? ((m = this.chunkMap[e].subarray(m, m + b)), a.set(m), this.lruUpdate(e))
              : this.hadChunk(e)
              ? h.push([e, m, b, f])
              : ((m = new Int8Array(b)), a.set(m))
            for (d -= b; 0 < d; )
              (f += b),
                (e += this.chunkSize),
                (b = this.chunkSize > d ? d : this.chunkSize),
                this.chunkMap[e]
                  ? ((m = this.chunkMap[e].subarray(0, b)), a.set(m, f), this.lruUpdate(e))
                  : this.hadChunk(e)
                  ? h.push([e, 0, b, f])
                  : ((m = new Int8Array(b)), a.set(m, f)),
                (d -= b)
            return h
          },
          writeChunk: function (a, b, d) {
            d = d || 0
            var h = this.chunkMap[b],
              f = a.length,
              e = this.lruList.length >= c.chunkMax && !h
            f !== this.chunkSize || a.buffer.byteLength !== f
              ? (e
                  ? ((h = this.lruList.shift()),
                    (e = this.chunkMap[h]),
                    e.length < this.chunkSize && (e = new Int8Array(this.chunkSize)),
                    (this.chunkMap[h] = null))
                  : (e = h ? this.chunkMap[b] : new Int8Array(this.chunkSize)),
                e.subarray(d, d + f).set(a),
                (a = e))
              : e && ((h = this.lruList.shift()), (this.chunkMap[h] = null))
            this.lruUpdate(b)
            this.chunkMap[b] = a
          },
        }
        var B = function (a) {
          this.chunkStorage = a
          this.position = 0
          this.length = this.chunkStorage.length
        }
        B.prototype = {
          read: function (a, b, c, h) {
            var f = h + c <= this.length,
              e = f ? c : this.length - h,
              m = d.AsyncFSHack.readingCounter.toString()
            if (0 < e) {
              z(m)
              var n = a.subarray(b, b + e)
              var g = this.chunkStorage.readFromCache(n, h, e)
              g.length
                ? ((d.AsyncFSHack.readCalls[m].needCallback = !0),
                  this.chunkStorage.downloadChunks(g, function (a) {
                    for (var b = 0; b < a.length; ++b) {
                      var e = g[b],
                        f = a[b].subarray(e[1], e[1] + e[2])
                      n.set(f, e[3])
                    }
                    A(m)
                  }))
                : f && A(m)
              h += e
            } else e = 0
            if (!f) {
              z(m)
              b += e
              if ((c -= e)) {
                f = this.chunkStorage.getCacheData()
                c > f.length && (c = f.length)
                var t = h - this.length
                c -= t
                a = a.subarray(b, b + c)
                b = f.subarray(t, t + c)
                a.set(b)
              }
              ;(g && g.length) || A(m)
              h += c
              e += c
            }
            this.position = h
            return e
          },
          write: function (a, b, d, h) {
            var f = h + d <= this.length,
              e = h + d <= this.length ? d : this.length - h
            if (0 < e) {
              var m = a.subarray(b, b + e),
                c = h % 1048576
              this.chunkStorage.writeChunk(m, h - c, c)
              h += e
            } else e = 0
            if (!f) {
              m = b + e
              if ((d -= e))
                (b = this.chunkStorage.getCacheData()),
                  d > b.length && (d = b.length),
                  (f = h - this.length),
                  (d -= f),
                  (m = a.subarray(m, m + d)),
                  b.subarray(f, f + d).set(m)
              h += d
              e += d
            }
            this.position = h
            return e
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
            return this.length + this.chunkStorage.cacheDataSize
          },
        }
        var w = function (a) {
          this.file = a
          this.filePosition = 0
          this.fileLength = a.size
          this.readerPool = []
        }
        w.prototype = {
          readFromFile: function (a, b, d) {
            var h = this.readerPool.length ? this.readerPool.pop() : new FileReader()
            var f = this
            h.onload = function () {
              var a = new Int8Array(h.result)
              f.readerPool.push(h)
              d(a)
            }
            h.readAsArrayBuffer(this.file.slice(b, b + a))
          },
          read: function (a, b, c, h) {
            c = h + c <= this.fileLength ? c : this.fileLength - h
            if (0 < c) {
              var f = d.AsyncFSHack.readingCounter.toString()
              z(f)
              var e = a.subarray(b, b + c)
              d.AsyncFSHack.readCalls[f].needCallback = !0
              this.readFromFile(c, h, function (a) {
                e.set(a)
                A(f)
              })
              this.filePosition = h + c
            }
            return c
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
        var v = {
            open: function (a) {
              var b = a.path.slice(1)
              a.provider = c.docs[b].chunkStorage ? new B(c.docs[b].chunkStorage) : new w(c.docs[b])
            },
            close: function (a) {
              a.provider.close()
            },
            read: function (a, b, d, h, f) {
              return a.provider.read(b, d, h, f)
            },
            llseek: function (a, b, c) {
              a = a.provider
              1 === c ? (b += a.getPos()) : 2 === c && (b = a.getTotalSize() + b)
              if (0 > b) throw new d.FS.ErrnoError(g.ERRNO_CODES.EINVAL)
              a.seek(b)
              return b
            },
            write: function (a, b, d, c, f) {
              return c ? a.provider.write(b, d, c, f) : 0
            },
          },
          y = function (a) {
            if (!q[a]) {
              var b = d.FS.makedev(3, 5)
              d.FS.registerDevice(b, v)
              d.FS.mkdev(a, 511, b)
              q[a] = !0
            }
          },
          p = function (a, b, d, h) {
            var f = "docdev" + ++u
            y(f)
            var e = Math.ceil((b + 1048576 - 1) / 1048576 / 8),
              m = new Int8Array(new ArrayBuffer(e))
            a = new C(a, b, e, m, d, h)
            c.docs[f] = { chunkStorage: a }
            return f
          },
          E = function (a) {
            var b = "docdev" + ++u
            y(b)
            c.docs[b] = a
            return b
          },
          r = function (a) {
            d.FS.unlink(a)
            c.docs[a] && delete c.docs[a]
          },
          D = function (a) {
            var b = Object.prototype.toString.call(a)
            return (
              "object" === typeof a &&
              null !== a &&
              ("[object File]" === b || "[object Blob]" === b)
            )
          }
      }.call(this, l(3)))
    },
    function (c, b, l) {
      c.exports = l(2)
    },
    function (c, b, l) {
      function g(a) {
        "@babel/helpers - typeof"
        return (
          (g =
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
          g(a)
        )
      }
      l.r(b)
      var a = l(0),
        d = window,
        k
      d.Module.onRuntimeInitialized = function () {
        x = !0
        q || (r.handleMessage({ action: "workerLoaded", data: {} }), (q = !0))
        r.sendTestResponse()
        d.PThread.receiveObjectTransfer = function () {
          var a = d.Module.GetNextResponseMessage()
          d.getThreadedWasmWorker().handleMessage(a)
          d.Module.PopNextResponseMessage()
        }
      }
      d.Module.locateFile = function (a) {
        return k + a
      }
      d.Module.INITIAL_MEMORY = 100663296
      var x = !1,
        u = !1,
        q = !1,
        z = 1,
        A = function f(a) {
          if ("object" === g(a) && null !== a)
            if ("undefined" !== typeof a.byteLength) {
              var b = "mainThreadArrayBuffer".concat(z)
              z++
              a = new Uint8Array(a)
              d.FS.writeFile(b, a)
              a = { handle: b, isArrayBufferRef: !0 }
            } else for (b in a) a.hasOwnProperty(b) && (a[b] = f(a[b]))
          return a
        },
        C = function e(a) {
          if ("object" === g(a) && null !== a)
            if (a.isArrayBufferRef) {
              var b = d.FS.readFile(a.handle, { encoding: "binary" })
              d.FS.unlink(a.handle)
              a = b.buffer
            } else if (a.constructor === Uint8Array) a = new Uint8Array(a).buffer
            else for (b in a) a.hasOwnProperty(b) && (a[b] = e(a[b]))
          return a
        },
        B = 0,
        w = {},
        v = {},
        y = {},
        p = {},
        E = function (b) {
          var e = b.action,
            c = b.data,
            f = b.callbackId
          if ("NewDoc" === e && c)
            (e = c.value),
              "url" === c.type
                ? ((e = Object(a.b)(e.url, e.size, e.customHeaders, e.withCredentials)),
                  (v[f] = e),
                  (c.value.docDevId = e))
                : Object(a.d)(e) && ((e = Object(a.a)(e)), (v[f] = e), (c.value = e))
          else if (("SaveDoc" !== e && "SaveDocFromFixedElements" !== e) || !c)
            "GetCanvas" === e && c
              ? ((f = c.docId),
                f in p &&
                  ((e = p[f]),
                  e in d.Module.docs &&
                    ((e = d.Module.docs[e]),
                    "chunkStorage" in e &&
                      ((c = d.Module.GetRequiredChunkOffsetArray(f, c.pageIndex + 1)),
                      c.length && e.chunkStorage.updateCache(c)))))
              : "DeleteDocument" === e && c && ((c = c.docId), c in p && (y[f] = c))
          else {
            e = c.docId
            var g = c.finishedWithDocument,
              k = "docFilePath".concat(B)
            w[f] = { filePath: k, docId: e, finishedWithDocument: g }
            B++
            c.filePath = k
          }
          d.Module.HandleMessage(A(b))
        },
        r
      d.MainThreadLabel = !0
      d.getThreadedWasmWorker = function () {
        return r
      }
      var D = function (a) {
        window.parent.loadThreadedBackend(a, { "Wasm.wasm": 1e7, "Wasm.js": 2e5 }, window)
        this.eventListeners = []
      }
      D.prototype = {
        addEventListener: function (a, b) {
          if ("message" === a) this.eventListeners.push(b)
          else throw Error("event type ".concat(a, " is not supported by WasmWorker."))
        },
        removeEventListener: function (a, b) {
          "message" === a &&
            (this.eventListeners = this.eventListeners.filter(function (a) {
              return a !== b
            }))
        },
        sendTestResponse: function () {
          x &&
            u &&
            (this.handleMessage({
              action: "test",
              data: { supportTypedArray: !0, supportTransfers: !0 },
            }),
            (this.postMessage = E))
        },
        postMessage: function (a) {
          if ("test" === a.action) (u = !0), this.sendTestResponse()
          else throw Error("Need to do handshake first!")
        },
        handleMessage: function (b) {
          var e = b.callbackId,
            c = b.data
          if (e in v) c && c.docId ? (p[c.docId] = v[e]) : Object(a.c)(v[e]), delete v[e]
          else if (e in w) {
            if (!b.hasOwnProperty("error")) {
              var f = w[e].filePath,
                g = d.FS.readFile(f, { encoding: "binary" })
              c.fileData = g.buffer
              c = w[e].docId
              c in p && (Object(a.c)(p[c]), delete p[c])
              c && !w[e].finishedWithDocument ? (p[c] = f) : d.FS.unlink(f)
            }
            delete w[e]
          } else e in y && ((f = y[e]), f in p && (Object(a.c)(p[f]), delete p[f]), delete y[e])
          b = C(b)
          window.parent.postMessage(b)
        },
        reset: function () {
          r = null
          q = u = x = !1
        },
      }
      var t = (function () {
          var a = {},
            b = new Promise(function (b, c) {
              a.resolve = b
              a.reject = c
            })
          a.promise = b
          return a
        })(),
        n = function m(a) {
          "object" === g(a.data) &&
            "action" in a.data &&
            "workerLoaded" === a.data.action &&
            (t.resolve(r), r.removeEventListener("message", m))
        }
      window.addEventListener("message", function (a) {
        a = a.data
        "loadWasmWorker" === a.action
          ? ((k = a.isFull ? "full/" : "lean/"),
            (r = new D("".concat(a.wasmSource, "PDFNetThreaded"))),
            q || r.addEventListener("message", n))
          : r.postMessage(a)
      })
      d.getWasmWorkerPromise = function () {
        return t.promise
      }
    },
    function (c, b) {
      b = (function () {
        return this
      })()
      try {
        b = b || new Function("return this")()
      } catch (l) {
        "object" === typeof window && (b = window)
      }
      c.exports = b
    },
    function (c, b) {
      window.Module = { chunkMax: 100, docs: {} }
    },
  ])
}.call(this || window))
