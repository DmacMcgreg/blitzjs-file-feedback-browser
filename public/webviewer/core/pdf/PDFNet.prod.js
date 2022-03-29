!function () {
  var n,
    i,
    a = {}
  function r(e) {
    if (i[e]) return i[e].exports
    var t = (i[e] = { i: e, l: !1, exports: {} })
    return n[e].call(t.exports, t, t.exports, r), (t.l = !0), t.exports
  }
  ;(a.scope = {}),
    (a.arrayIteratorImpl = function (e) {
      var t = 0
      return function () {
        return t < e.length ? { done: !1, value: e[t++] } : { done: !0 }
      }
    }),
    (a.arrayIterator = function (e) {
      return { next: a.arrayIteratorImpl(e) }
    }),
    (a.makeIterator = function (e) {
      var t = "undefined" != typeof Symbol && Symbol.iterator && e[Symbol.iterator]
      return t ? t.call(e) : a.arrayIterator(e)
    }),
    (a.getGlobal = function (e) {
      return ("undefined" == typeof window || window !== e) &&
        "undefined" != typeof global &&
        null != global
        ? global
        : e
    }),
    (a.global = a.getGlobal(this)),
    (a.ASSUME_ES5 = !1),
    (a.ASSUME_NO_NATIVE_MAP = !1),
    (a.ASSUME_NO_NATIVE_SET = !1),
    (a.SIMPLE_FROUND_POLYFILL = !1),
    (a.defineProperty =
      a.ASSUME_ES5 || "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (e, t, n) {
            e != Array.prototype && e != Object.prototype && (e[t] = n.value)
          }),
    (a.polyfill = function (e, t, n, i) {
      if (t) {
        for (n = a.global, e = e.split("."), i = 0; i < e.length - 1; i++) {
          var r = e[i]
          r in n || (n[r] = {}), (n = n[r])
        }
        ;(t = t((i = n[(e = e[e.length - 1])]))) != i &&
          null != t &&
          a.defineProperty(n, e, { configurable: !0, writable: !0, value: t })
      }
    }),
    (a.FORCE_POLYFILL_PROMISE = !1),
    a.polyfill(
      "Promise",
      function (e) {
        function t() {
          this.batch_ = null
        }
        function s(n) {
          return n instanceof u
            ? n
            : new u(function (e, t) {
                e(n)
              })
        }
        if (e && !a.FORCE_POLYFILL_PROMISE) return e
        ;(t.prototype.asyncExecute = function (e) {
          return (
            null == this.batch_ && ((this.batch_ = []), this.asyncExecuteBatch_()),
            this.batch_.push(e),
            this
          )
        }),
          (t.prototype.asyncExecuteBatch_ = function () {
            var e = this
            this.asyncExecuteFunction(function () {
              e.executeBatch_()
            })
          })
        function u(e) {
          ;(this.state_ = 0), (this.result_ = void 0), (this.onSettledCallbacks_ = [])
          var t = this.createResolveAndReject_()
          try {
            e(t.resolve, t.reject)
          } catch (e) {
            t.reject(e)
          }
        }
        var n = a.global.setTimeout,
          r =
            ((t.prototype.asyncExecuteFunction = function (e) {
              n(e, 0)
            }),
            (t.prototype.executeBatch_ = function () {
              for (; this.batch_ && this.batch_.length; ) {
                var e = this.batch_
                this.batch_ = []
                for (var t = 0; t < e.length; ++t) {
                  var n = e[t]
                  e[t] = null
                  try {
                    n()
                  } catch (e) {
                    this.asyncThrow_(e)
                  }
                }
              }
              this.batch_ = null
            }),
            (t.prototype.asyncThrow_ = function (e) {
              this.asyncExecuteFunction(function () {
                throw e
              })
            }),
            (u.prototype.createResolveAndReject_ = function () {
              function e(t) {
                return function (e) {
                  i || ((i = !0), t.call(n, e))
                }
              }
              var n = this,
                i = !1
              return { resolve: e(this.resolveTo_), reject: e(this.reject_) }
            }),
            (u.prototype.resolveTo_ = function (e) {
              if (e === this) this.reject_(new TypeError("A Promise cannot resolve to itself"))
              else if (e instanceof u) this.settleSameAsPromise_(e)
              else {
                switch (typeof e) {
                  case "object":
                    var t = null != e
                    break
                  case "function":
                    t = !0
                    break
                  default:
                    t = !1
                }
                t ? this.resolveToNonPromiseObj_(e) : this.fulfill_(e)
              }
            }),
            (u.prototype.resolveToNonPromiseObj_ = function (e) {
              var t = void 0
              try {
                t = e.then
              } catch (e) {
                return void this.reject_(e)
              }
              "function" == typeof t ? this.settleSameAsThenable_(t, e) : this.fulfill_(e)
            }),
            (u.prototype.reject_ = function (e) {
              this.settle_(2, e)
            }),
            (u.prototype.fulfill_ = function (e) {
              this.settle_(1, e)
            }),
            (u.prototype.settle_ = function (e, t) {
              if (0 != this.state_)
                throw Error(
                  "Cannot settle(" +
                    e +
                    ", " +
                    t +
                    "): Promise already settled in state" +
                    this.state_
                )
              ;(this.state_ = e), (this.result_ = t), this.executeOnSettledCallbacks_()
            }),
            (u.prototype.executeOnSettledCallbacks_ = function () {
              if (null != this.onSettledCallbacks_) {
                for (var e = 0; e < this.onSettledCallbacks_.length; ++e)
                  r.asyncExecute(this.onSettledCallbacks_[e])
                this.onSettledCallbacks_ = null
              }
            }),
            new t())
        return (
          (u.prototype.settleSameAsPromise_ = function (e) {
            var t = this.createResolveAndReject_()
            e.callWhenSettled_(t.resolve, t.reject)
          }),
          (u.prototype.settleSameAsThenable_ = function (e, t) {
            var n = this.createResolveAndReject_()
            try {
              e.call(t, n.resolve, n.reject)
            } catch (e) {
              n.reject(e)
            }
          }),
          (u.prototype.then = function (e, t) {
            function n(t, e) {
              return "function" == typeof t
                ? function (e) {
                    try {
                      i(t(e))
                    } catch (e) {
                      r(e)
                    }
                  }
                : e
            }
            var i,
              r,
              o = new u(function (e, t) {
                ;(i = e), (r = t)
              })
            return this.callWhenSettled_(n(e, i), n(t, r)), o
          }),
          (u.prototype.catch = function (e) {
            return this.then(void 0, e)
          }),
          (u.prototype.callWhenSettled_ = function (e, t) {
            function n() {
              switch (i.state_) {
                case 1:
                  e(i.result_)
                  break
                case 2:
                  t(i.result_)
                  break
                default:
                  throw Error("Unexpected state: " + i.state_)
              }
            }
            var i = this
            null == this.onSettledCallbacks_ ? r.asyncExecute(n) : this.onSettledCallbacks_.push(n)
          }),
          (u.resolve = s),
          (u.reject = function (n) {
            return new u(function (e, t) {
              t(n)
            })
          }),
          (u.race = function (r) {
            return new u(function (e, t) {
              for (var n = a.makeIterator(r), i = n.next(); !i.done; i = n.next())
                s(i.value).callWhenSettled_(e, t)
            })
          }),
          (u.all = function (e) {
            var t = a.makeIterator(e),
              o = t.next()
            return o.done
              ? s([])
              : new u(function (n, e) {
                  for (
                    var i = [], r = 0;
                    i.push(void 0),
                      r++,
                      s(o.value).callWhenSettled_(
                        (function e(t) {
                          return function (e) {
                            ;(i[t] = e), 0 == --r && n(i)
                          }
                        })(i.length - 1),
                        e
                      ),
                      !(o = t.next()).done;

                  );
                })
          }),
          u
        )
      },
      "es6",
      "es3"
    ),
    (a.checkStringArgs = function (e, t, n) {
      if (null == e)
        throw new TypeError(
          "The 'this' value for String.prototype." + n + " must not be null or undefined"
        )
      if (t instanceof RegExp)
        throw new TypeError(
          "First argument to String.prototype." + n + " must not be a regular expression"
        )
      return e + ""
    }),
    a.polyfill(
      "String.prototype.startsWith",
      function (e) {
        return (
          e ||
          function (e, t) {
            var n = a.checkStringArgs(this, e, "startsWith"),
              i = n.length,
              r = (e += "").length
            t = Math.max(0, Math.min(0 | t, n.length))
            for (var o = 0; o < r && t < i; ) if (n[t++] != e[o++]) return !1
            return r <= o
          }
        )
      },
      "es6",
      "es3"
    ),
    a.polyfill(
      "Array.from",
      function (e) {
        return (
          e ||
          function (e, t, n) {
            t =
              null != t
                ? t
                : function (e) {
                    return e
                  }
            var i = [],
              r = "undefined" != typeof Symbol && Symbol.iterator && e[Symbol.iterator]
            if ("function" == typeof r) {
              e = r.call(e)
              for (var o = 0; !(r = e.next()).done; ) i.push(t.call(n, r.value, o++))
            } else for (r = e.length, o = 0; o < r; o++) i.push(t.call(n, e[o], o))
            return i
          }
        )
      },
      "es6",
      "es3"
    ),
    (n = [
      function (e, t, n) {
        e.exports = n(1)
      },
      function (e, t) {
        function c(e) {
          return (c =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e
                })(e)
        }
        var g = [],
          s = [],
          f = 0,
          n = 0,
          P = [],
          F = [],
          b = "undefined" == typeof window ? this : window
        function i() {
          return {
            putBool: function (e, t, n) {
              if (!1 !== n && !0 !== n)
                throw new TypeError("An boolean value is expected for putBool")
              e[t] = n
            },
            putNumber: function (e, t, n) {
              e[t] = 0 + n
            },
            jsColorToNumber: function (e) {
              return 4278190080 + 65536 * Math.floor(e.R) + 256 * Math.floor(e.G) + Math.floor(e.B)
            },
            jsColorFromNumber: function (e) {
              return {
                A: (5.960464477539063e-8 * e) & 255,
                R: (16711680 & (0 | e)) >>> 16,
                G: (65280 & (0 | e)) >>> 8,
                B: 255 & (0 | e),
              }
            },
          }
        }
        function r(i) {
          return Promise.resolve().then(function e(t) {
            var n = (t = i.next(t)).value
            return t.done ? t.value : n.then(e)
          })
        }
        var d = b.Core.PDFNet || {}
        ;(d.Convert = b.Core.PDFNet && b.Core.PDFNet.Convert ? b.Core.PDFNet.Convert : {}),
          (d.Optimizer = {}),
          b.Core && b.Core.enableFullPDF(),
          (b.isArrayBuffer = function (e) {
            return (
              e instanceof ArrayBuffer ||
              (null != e &&
                null != e.constructor &&
                "ArrayBuffer" === e.constructor.name &&
                "number" == typeof e.byteLength)
            )
          }),
          (d.Destroyable = function () {
            if (this.constructor === d.Destroyable) throw Error("Can't instantiate abstract class!")
          }),
          (d.Destroyable.prototype.takeOwnership = function () {
            O(this.id)
          }),
          (d.Destroyable.prototype.destroy = function () {
            return (
              this.takeOwnership(),
              d.sendWithPromise(this.name + ".destroy", { auto_dealloc_obj: this.id })
            )
          }),
          (d.Action = function (e) {
            ;(this.name = "Action"), (this.id = e)
          }),
          (d.ActionParameter = function (e) {
            ;(this.name = "ActionParameter"), (this.id = e)
          }),
          (d.ActionParameter.prototype = Object.create(d.Destroyable.prototype)),
          (d.Annot = function (e) {
            ;(this.name = "Annot"), (this.id = e)
          }),
          (d.AnnotBorderStyle = function (e) {
            ;(this.name = "AnnotBorderStyle"), (this.id = e)
          }),
          (d.AnnotBorderStyle.prototype = Object.create(d.Destroyable.prototype)),
          (d.AttrObj = function (e) {
            ;(this.name = "AttrObj"), (this.id = e)
          }),
          (d.Bookmark = function (e) {
            ;(this.name = "Bookmark"), (this.id = e)
          }),
          (d.ByteRange = function (e, t) {
            if (((this.name = "ByteRange"), !e || void 0 !== t))
              return new d.ByteRange({
                m_offset: (e = void 0 === e ? 0 : e),
                m_size: (t = void 0 === t ? 0 : t),
              })
            m(e, this)
          }),
          (d.CaretAnnot = function (e) {
            ;(this.name = "CaretAnnot"), (this.id = e)
          }),
          (d.CheckBoxWidget = function (e) {
            ;(this.name = "CheckBoxWidget"), (this.id = e)
          }),
          (d.ChunkRenderer = function (e) {
            ;(this.name = "ChunkRenderer"), (this.id = e)
          }),
          (d.CircleAnnot = function (e) {
            ;(this.name = "CircleAnnot"), (this.id = e)
          }),
          (d.ClassMap = function (e) {
            ;(this.name = "ClassMap"), (this.id = e)
          }),
          (d.ColorPt = function (e) {
            ;(this.name = "ColorPt"), (this.id = e)
          }),
          (d.ColorPt.prototype = Object.create(d.Destroyable.prototype)),
          (d.ColorSpace = function (e) {
            ;(this.name = "ColorSpace"), (this.id = e)
          }),
          (d.ColorSpace.prototype = Object.create(d.Destroyable.prototype)),
          (d.ComboBoxWidget = function (e) {
            ;(this.name = "ComboBoxWidget"), (this.id = e)
          }),
          (d.ContentItem = function (e, t) {
            if (((this.name = "ContentItem"), !e || void 0 !== t))
              return new d.ContentItem({
                o: (e = void 0 === e ? "0" : e),
                p: (t = void 0 === t ? "0" : t),
              })
            m(e, this)
          }),
          (d.ContentReplacer = function (e) {
            ;(this.name = "ContentReplacer"), (this.id = e)
          }),
          (d.ContentReplacer.prototype = Object.create(d.Destroyable.prototype)),
          (d.ConversionMonitor = function (e) {
            ;(this.name = "ConversionMonitor"), (this.id = e)
          }),
          (d.ConversionMonitor.prototype = Object.create(d.Destroyable.prototype)),
          (d.Date = function (e, t, n, i, r, o, s, u, a, c) {
            if (((this.name = "Date"), !e || void 0 !== t))
              return new d.Date({
                year: (e = void 0 === e ? 0 : e),
                month: (t = void 0 === t ? 0 : t),
                day: (n = void 0 === n ? 0 : n),
                hour: (i = void 0 === i ? 0 : i),
                minute: (r = void 0 === r ? 0 : r),
                second: (o = void 0 === o ? 0 : o),
                UT: (s = void 0 === s ? 0 : s),
                UT_hour: (u = void 0 === u ? 0 : u),
                UT_minutes: (a = void 0 === a ? 0 : a),
                mp_obj: (c = void 0 === c ? "0" : c),
              })
            m(e, this)
          }),
          (d.Destination = function (e) {
            ;(this.name = "Destination"), (this.id = e)
          }),
          (d.DictIterator = function (e) {
            ;(this.name = "DictIterator"), (this.id = e)
          }),
          (d.DictIterator.prototype = Object.create(d.Destroyable.prototype)),
          (d.DigestAlgorithm = function (e) {
            ;(this.name = "DigestAlgorithm"), (this.id = e)
          }),
          (d.DigitalSignatureField = function (e) {
            if (((this.name = "DigitalSignatureField"), "object" === c(e))) m(e, this)
            else if (void 0 !== e) return new d.DigitalSignatureField({ mp_field_dict_obj: e })
          }),
          (d.DisallowedChange = function (e) {
            ;(this.name = "DisallowedChange"), (this.id = e)
          }),
          (d.DisallowedChange.prototype = Object.create(d.Destroyable.prototype)),
          (d.DocSnapshot = function (e) {
            ;(this.name = "DocSnapshot"), (this.id = e)
          }),
          (d.DocSnapshot.prototype = Object.create(d.Destroyable.prototype)),
          (d.Element = function (e) {
            ;(this.name = "Element"), (this.id = e)
          }),
          (d.ElementBuilder = function (e) {
            ;(this.name = "ElementBuilder"), (this.id = e)
          }),
          (d.ElementBuilder.prototype = Object.create(d.Destroyable.prototype)),
          (d.ElementReader = function (e) {
            ;(this.name = "ElementReader"), (this.id = e)
          }),
          (d.ElementReader.prototype = Object.create(d.Destroyable.prototype)),
          (d.ElementWriter = function (e) {
            ;(this.name = "ElementWriter"), (this.id = e)
          }),
          (d.ElementWriter.prototype = Object.create(d.Destroyable.prototype)),
          (d.EmbeddedTimestampVerificationResult = function (e) {
            ;(this.name = "EmbeddedTimestampVerificationResult"), (this.id = e)
          }),
          (d.EmbeddedTimestampVerificationResult.prototype = Object.create(
            d.Destroyable.prototype
          )),
          (d.FDFDoc = function (e) {
            ;(this.name = "FDFDoc"), (this.id = e)
          }),
          (d.FDFDoc.prototype = Object.create(d.Destroyable.prototype)),
          (d.FDFField = function (e, t) {
            if (((this.name = "FDFField"), !e || void 0 !== t))
              return new d.FDFField({
                mp_leaf_node: (e = void 0 === e ? "0" : e),
                mp_root_array: (t = void 0 === t ? "0" : t),
              })
            m(e, this)
          }),
          (d.Field = function (e, t) {
            if (((this.name = "Field"), !e || void 0 !== t))
              return new d.Field({
                leaf_node: (e = void 0 === e ? "0" : e),
                builder: (t = void 0 === t ? "0" : t),
              })
            m(e, this)
          }),
          (d.FileAttachmentAnnot = function (e) {
            ;(this.name = "FileAttachmentAnnot"), (this.id = e)
          }),
          (d.FileSpec = function (e) {
            ;(this.name = "FileSpec"), (this.id = e)
          }),
          (d.Filter = function (e) {
            ;(this.name = "Filter"), (this.id = e)
          }),
          (d.Filter.prototype = Object.create(d.Destroyable.prototype)),
          (d.FilterReader = function (e) {
            ;(this.name = "FilterReader"), (this.id = e)
          }),
          (d.FilterReader.prototype = Object.create(d.Destroyable.prototype)),
          (d.FilterWriter = function (e) {
            ;(this.name = "FilterWriter"), (this.id = e)
          }),
          (d.FilterWriter.prototype = Object.create(d.Destroyable.prototype)),
          (d.Flattener = function (e) {
            ;(this.name = "Flattener"), (this.id = e)
          }),
          (d.Flattener.prototype = Object.create(d.Destroyable.prototype)),
          (d.Font = function (e) {
            ;(this.name = "Font"), (this.id = e)
          }),
          (d.Font.prototype = Object.create(d.Destroyable.prototype)),
          (d.FreeTextAnnot = function (e) {
            ;(this.name = "FreeTextAnnot"), (this.id = e)
          }),
          (d.Function = function (e) {
            ;(this.name = "Function"), (this.id = e)
          }),
          (d.Function.prototype = Object.create(d.Destroyable.prototype)),
          (d.GState = function (e) {
            ;(this.name = "GState"), (this.id = e)
          }),
          (d.GeometryCollection = function (e) {
            ;(this.name = "GeometryCollection"), (this.id = e)
          }),
          (d.GeometryCollection.prototype = Object.create(d.Destroyable.prototype)),
          (d.HighlightAnnot = function (e) {
            ;(this.name = "HighlightAnnot"), (this.id = e)
          }),
          (d.Highlights = function (e) {
            ;(this.name = "Highlights"), (this.id = e)
          }),
          (d.Highlights.prototype = Object.create(d.Destroyable.prototype)),
          (d.Image = function (e) {
            ;(this.name = "Image"), (this.id = e)
          }),
          (d.InkAnnot = function (e) {
            ;(this.name = "InkAnnot"), (this.id = e)
          }),
          (d.Iterator = function (e, t) {
            ;(this.name = "Iterator"), (this.id = e), (this.type = t)
          }),
          (d.Iterator.prototype = Object.create(d.Destroyable.prototype)),
          (d.KeyStrokeActionResult = function (e) {
            ;(this.name = "KeyStrokeActionResult"), (this.id = e)
          }),
          (d.KeyStrokeActionResult.prototype = Object.create(d.Destroyable.prototype)),
          (d.KeyStrokeEventData = function (e) {
            ;(this.name = "KeyStrokeEventData"), (this.id = e)
          }),
          (d.KeyStrokeEventData.prototype = Object.create(d.Destroyable.prototype)),
          (d.LineAnnot = function (e) {
            ;(this.name = "LineAnnot"), (this.id = e)
          }),
          (d.LinkAnnot = function (e) {
            ;(this.name = "LinkAnnot"), (this.id = e)
          }),
          (d.ListBoxWidget = function (e) {
            ;(this.name = "ListBoxWidget"), (this.id = e)
          }),
          (d.MarkupAnnot = function (e) {
            ;(this.name = "MarkupAnnot"), (this.id = e)
          }),
          (d.Matrix2D = function (e, t, n, i, r, o) {
            if (((this.name = "Matrix2D"), !e || void 0 !== t))
              return new d.Matrix2D({
                m_a: (e = void 0 === e ? 0 : e),
                m_b: (t = void 0 === t ? 0 : t),
                m_c: (n = void 0 === n ? 0 : n),
                m_d: (i = void 0 === i ? 0 : i),
                m_h: (r = void 0 === r ? 0 : r),
                m_v: (o = void 0 === o ? 0 : o),
              })
            m(e, this)
          }),
          (d.MovieAnnot = function (e) {
            ;(this.name = "MovieAnnot"), (this.id = e)
          }),
          (d.NameTree = function (e) {
            ;(this.name = "NameTree"), (this.id = e)
          }),
          (d.NumberTree = function (e) {
            ;(this.name = "NumberTree"), (this.id = e)
          }),
          (d.OCG = function (e) {
            ;(this.name = "OCG"), (this.id = e)
          }),
          (d.OCGConfig = function (e) {
            ;(this.name = "OCGConfig"), (this.id = e)
          }),
          (d.OCGContext = function (e) {
            ;(this.name = "OCGContext"), (this.id = e)
          }),
          (d.OCGContext.prototype = Object.create(d.Destroyable.prototype)),
          (d.OCMD = function (e) {
            ;(this.name = "OCMD"), (this.id = e)
          }),
          (d.OCRModule = function (e) {
            ;(this.name = "OCRModule"), (this.id = e)
          }),
          (d.Obj = function (e) {
            ;(this.name = "Obj"), (this.id = e)
          }),
          (d.ObjSet = function (e) {
            ;(this.name = "ObjSet"), (this.id = e)
          }),
          (d.ObjSet.prototype = Object.create(d.Destroyable.prototype)),
          (d.ObjectIdentifier = function (e) {
            ;(this.name = "ObjectIdentifier"), (this.id = e)
          }),
          (d.ObjectIdentifier.prototype = Object.create(d.Destroyable.prototype)),
          (d.OwnedBitmap = function (e) {
            ;(this.name = "OwnedBitmap"), (this.id = e)
          }),
          (d.PDFACompliance = function (e) {
            ;(this.name = "PDFACompliance"), (this.id = e)
          }),
          (d.PDFACompliance.prototype = Object.create(d.Destroyable.prototype)),
          (d.PDFDC = function (e) {
            ;(this.name = "PDFDC"), (this.id = e)
          }),
          (d.PDFDCEX = function (e) {
            ;(this.name = "PDFDCEX"), (this.id = e)
          }),
          (d.PDFDoc = function (e) {
            ;(this.name = "PDFDoc"), (this.id = e)
          }),
          (d.PDFDoc.prototype = Object.create(d.Destroyable.prototype)),
          (d.PDFDocInfo = function (e) {
            ;(this.name = "PDFDocInfo"), (this.id = e)
          }),
          (d.PDFDocViewPrefs = function (e) {
            ;(this.name = "PDFDocViewPrefs"), (this.id = e)
          }),
          (d.PDFDraw = function (e) {
            ;(this.name = "PDFDraw"), (this.id = e)
          }),
          (d.PDFDraw.prototype = Object.create(d.Destroyable.prototype)),
          (d.PDFRasterizer = function (e) {
            ;(this.name = "PDFRasterizer"), (this.id = e)
          }),
          (d.PDFRasterizer.prototype = Object.create(d.Destroyable.prototype)),
          (d.PDFTronCustomSecurityHandler = function (e) {
            ;(this.name = "PDFTronCustomSecurityHandler"), (this.id = e)
          }),
          (d.PDFView = function (e) {
            ;(this.name = "PDFView"), (this.id = e)
          }),
          (d.PDFViewCtrl = function (e) {
            ;(this.name = "PDFViewCtrl"), (this.id = e)
          }),
          (d.Page = function (e) {
            ;(this.name = "Page"), (this.id = e)
          }),
          (d.PageLabel = function (e, t, n) {
            if (((this.name = "PageLabel"), !e || void 0 !== t))
              return new d.PageLabel({
                mp_obj: (e = void 0 === e ? "0" : e),
                m_first_page: (t = void 0 === t ? 0 : t),
                m_last_page: (n = void 0 === n ? 0 : n),
              })
            m(e, this)
          }),
          (d.PageSet = function (e) {
            ;(this.name = "PageSet"), (this.id = e)
          }),
          (d.PageSet.prototype = Object.create(d.Destroyable.prototype)),
          (d.PatternColor = function (e) {
            ;(this.name = "PatternColor"), (this.id = e)
          }),
          (d.PatternColor.prototype = Object.create(d.Destroyable.prototype)),
          (d.PolyLineAnnot = function (e) {
            ;(this.name = "PolyLineAnnot"), (this.id = e)
          }),
          (d.PolygonAnnot = function (e) {
            ;(this.name = "PolygonAnnot"), (this.id = e)
          }),
          (d.PopupAnnot = function (e) {
            ;(this.name = "PopupAnnot"), (this.id = e)
          }),
          (d.PrinterMode = function (e) {
            ;(this.name = "PrinterMode"), (this.id = e)
          }),
          (d.PushButtonWidget = function (e) {
            ;(this.name = "PushButtonWidget"), (this.id = e)
          }),
          (d.RadioButtonGroup = function (e) {
            ;(this.name = "RadioButtonGroup"), (this.id = e)
          }),
          (d.RadioButtonGroup.prototype = Object.create(d.Destroyable.prototype)),
          (d.RadioButtonWidget = function (e) {
            ;(this.name = "RadioButtonWidget"), (this.id = e)
          }),
          (d.Rect = function (e, t, n, i, r) {
            if (((this.name = "Rect"), !e || void 0 !== t))
              return new d.Rect({
                x1: (e = void 0 === e ? 0 : e),
                y1: (t = void 0 === t ? 0 : t),
                x2: (n = void 0 === n ? 0 : n),
                y2: (i = void 0 === i ? 0 : i),
                mp_rect: (r = void 0 === r ? "0" : r),
              })
            m(e, this)
          }),
          (d.Redaction = function (e) {
            ;(this.name = "Redaction"), (this.id = e)
          }),
          (d.RedactionAnnot = function (e) {
            ;(this.name = "RedactionAnnot"), (this.id = e)
          }),
          (d.Redactor = function (e) {
            ;(this.name = "Redactor"), (this.id = e)
          }),
          (d.Reflow = function (e) {
            ;(this.name = "Reflow"), (this.id = e)
          }),
          (d.Reflow.prototype = Object.create(d.Destroyable.prototype)),
          (d.ResultSnapshot = function (e) {
            ;(this.name = "ResultSnapshot"), (this.id = e)
          }),
          (d.ResultSnapshot.prototype = Object.create(d.Destroyable.prototype)),
          (d.RoleMap = function (e) {
            ;(this.name = "RoleMap"), (this.id = e)
          }),
          (d.RubberStampAnnot = function (e) {
            ;(this.name = "RubberStampAnnot"), (this.id = e)
          }),
          (d.SDFDoc = function (e) {
            ;(this.name = "SDFDoc"), (this.id = e)
          }),
          (d.SElement = function (e, t) {
            if (((this.name = "SElement"), !e || void 0 !== t))
              return new d.SElement({
                obj: (e = void 0 === e ? "0" : e),
                k: (t = void 0 === t ? "0" : t),
              })
            m(e, this)
          }),
          (d.STree = function (e) {
            ;(this.name = "STree"), (this.id = e)
          }),
          (d.ScreenAnnot = function (e) {
            ;(this.name = "ScreenAnnot"), (this.id = e)
          }),
          (d.SecurityHandler = function (e) {
            ;(this.name = "SecurityHandler"), (this.id = e)
          }),
          (d.SecurityHandler.prototype = Object.create(d.Destroyable.prototype)),
          (d.Shading = function (e) {
            ;(this.name = "Shading"), (this.id = e)
          }),
          (d.Shading.prototype = Object.create(d.Destroyable.prototype)),
          (d.ShapedText = function (e) {
            ;(this.name = "ShapedText"), (this.id = e)
          }),
          (d.ShapedText.prototype = Object.create(d.Destroyable.prototype)),
          (d.SignatureHandler = function (e) {
            ;(this.name = "SignatureHandler"), (this.id = e)
          }),
          (d.SignatureWidget = function (e) {
            ;(this.name = "SignatureWidget"), (this.id = e)
          }),
          (d.SoundAnnot = function (e) {
            ;(this.name = "SoundAnnot"), (this.id = e)
          }),
          (d.SquareAnnot = function (e) {
            ;(this.name = "SquareAnnot"), (this.id = e)
          }),
          (d.SquigglyAnnot = function (e) {
            ;(this.name = "SquigglyAnnot"), (this.id = e)
          }),
          (d.Stamper = function (e) {
            ;(this.name = "Stamper"), (this.id = e)
          }),
          (d.Stamper.prototype = Object.create(d.Destroyable.prototype)),
          (d.StrikeOutAnnot = function (e) {
            ;(this.name = "StrikeOutAnnot"), (this.id = e)
          }),
          (d.TextAnnot = function (e) {
            ;(this.name = "TextAnnot"), (this.id = e)
          }),
          (d.TextExtractor = function (e) {
            ;(this.name = "TextExtractor"), (this.id = e)
          }),
          (d.TextExtractor.prototype = Object.create(d.Destroyable.prototype)),
          (d.TextExtractorLine = function (e, t, n, i, r, o) {
            if (((this.name = "TextExtractorLine"), !e || void 0 !== t))
              return new d.TextExtractorLine({
                line: (e = void 0 === e ? "0" : e),
                uni: (t = void 0 === t ? "0" : t),
                num: (n = void 0 === n ? 0 : n),
                cur_num: (i = void 0 === i ? 0 : i),
                m_direction: (r = void 0 === r ? 0 : r),
                mp_bld: (o = void 0 === o ? "0" : o),
              })
            m(e, this)
          }),
          (d.TextExtractorStyle = function (e) {
            if (((this.name = "TextExtractorStyle"), "object" === c(e))) m(e, this)
            else if (void 0 !== e) return new d.TextExtractorStyle({ mp_imp: e })
          }),
          (d.TextExtractorWord = function (e, t, n, i, r, o) {
            if (((this.name = "TextExtractorWord"), !e || void 0 !== t))
              return new d.TextExtractorWord({
                line: (e = void 0 === e ? "0" : e),
                word: (t = void 0 === t ? "0" : t),
                uni: (n = void 0 === n ? "0" : n),
                num: (i = void 0 === i ? 0 : i),
                cur_num: (r = void 0 === r ? 0 : r),
                mp_bld: (o = void 0 === o ? "0" : o),
              })
            m(e, this)
          }),
          (d.TextMarkupAnnot = function (e) {
            ;(this.name = "TextMarkupAnnot"), (this.id = e)
          }),
          (d.TextRange = function (e) {
            ;(this.name = "TextRange"), (this.id = e)
          }),
          (d.TextSearch = function (e) {
            ;(this.name = "TextSearch"), (this.id = e)
          }),
          (d.TextSearch.prototype = Object.create(d.Destroyable.prototype)),
          (d.TextWidget = function (e) {
            ;(this.name = "TextWidget"), (this.id = e)
          }),
          (d.TimestampingConfiguration = function (e) {
            ;(this.name = "TimestampingConfiguration"), (this.id = e)
          }),
          (d.TimestampingConfiguration.prototype = Object.create(d.Destroyable.prototype)),
          (d.TimestampingResult = function (e) {
            ;(this.name = "TimestampingResult"), (this.id = e)
          }),
          (d.TimestampingResult.prototype = Object.create(d.Destroyable.prototype)),
          (d.TrustVerificationResult = function (e) {
            ;(this.name = "TrustVerificationResult"), (this.id = e)
          }),
          (d.TrustVerificationResult.prototype = Object.create(d.Destroyable.prototype)),
          (d.UnderlineAnnot = function (e) {
            ;(this.name = "UnderlineAnnot"), (this.id = e)
          }),
          (d.UndoManager = function (e) {
            ;(this.name = "UndoManager"), (this.id = e)
          }),
          (d.UndoManager.prototype = Object.create(d.Destroyable.prototype)),
          (d.VerificationOptions = function (e) {
            ;(this.name = "VerificationOptions"), (this.id = e)
          }),
          (d.VerificationOptions.prototype = Object.create(d.Destroyable.prototype)),
          (d.VerificationResult = function (e) {
            ;(this.name = "VerificationResult"), (this.id = e)
          }),
          (d.VerificationResult.prototype = Object.create(d.Destroyable.prototype)),
          (d.ViewChangeCollection = function (e) {
            ;(this.name = "ViewChangeCollection"), (this.id = e)
          }),
          (d.ViewChangeCollection.prototype = Object.create(d.Destroyable.prototype)),
          (d.WatermarkAnnot = function (e) {
            ;(this.name = "WatermarkAnnot"), (this.id = e)
          }),
          (d.WebFontDownloader = function (e) {
            ;(this.name = "WebFontDownloader"), (this.id = e)
          }),
          (d.WidgetAnnot = function (e) {
            ;(this.name = "WidgetAnnot"), (this.id = e)
          }),
          (d.X501AttributeTypeAndValue = function (e) {
            ;(this.name = "X501AttributeTypeAndValue"), (this.id = e)
          }),
          (d.X501AttributeTypeAndValue.prototype = Object.create(d.Destroyable.prototype)),
          (d.X501DistinguishedName = function (e) {
            ;(this.name = "X501DistinguishedName"), (this.id = e)
          }),
          (d.X501DistinguishedName.prototype = Object.create(d.Destroyable.prototype)),
          (d.X509Certificate = function (e) {
            ;(this.name = "X509Certificate"), (this.id = e)
          }),
          (d.X509Certificate.prototype = Object.create(d.Destroyable.prototype)),
          (d.X509Extension = function (e) {
            ;(this.name = "X509Extension"), (this.id = e)
          }),
          (d.X509Extension.prototype = Object.create(d.Destroyable.prototype)),
          (d.PDFDoc.createRefreshOptions = function () {
            return Promise.resolve(new d.PDFDoc.RefreshOptions())
          }),
          (d.PDFDoc.RefreshOptions = function () {
            ;(this.mImpl = {}), (this.mHelpers = i())
          }),
          (d.PDFDoc.RefreshOptions.prototype.getDrawBackgroundOnly = function () {
            return !("DrawBackgroundOnly" in mImpl) || !!mImpl.DrawBackgroundOnly
          }),
          (d.PDFDoc.RefreshOptions.prototype.setDrawBackgroundOnly = function (e) {
            return mHelpers.putBool(mImpl, "DrawBackgroundOnly", e), this
          }),
          (d.PDFDoc.RefreshOptions.prototype.getRefreshExisting = function () {
            return !("RefreshExisting" in mImpl) || !!mImpl.RefreshExisting
          }),
          (d.PDFDoc.RefreshOptions.prototype.setRefreshExisting = function (e) {
            return mHelpers.putBool(mImpl, "RefreshExisting", e), this
          }),
          (d.PDFDoc.RefreshOptions.prototype.getUseNonStandardRotation = function () {
            return "UseNonStandardRotation" in mImpl && !!mImpl.UseNonStandardRotation
          }),
          (d.PDFDoc.RefreshOptions.prototype.setUseNonStandardRotation = function (e) {
            return mHelpers.putBool(mImpl, "UseNonStandardRotation", e), this
          }),
          (d.PDFDoc.RefreshOptions.prototype.getUseRoundedCorners = function () {
            return "UseRoundedCorners" in mImpl && !!mImpl.UseRoundedCorners
          }),
          (d.PDFDoc.RefreshOptions.prototype.setUseRoundedCorners = function (e) {
            return mHelpers.putBool(mImpl, "UseRoundedCorners", e), this
          }),
          (d.PDFDoc.RefreshOptions.prototype.getJsonString = function () {
            return JSON.stringify(this.mImpl)
          }),
          (d.createRefreshOptions = d.PDFDoc.createRefreshOptions),
          (d.RefreshOptions = d.PDFDoc.RefreshOptions),
          (d.PDFDoc.createDiffOptions = function () {
            return Promise.resolve(new d.PDFDoc.DiffOptions())
          }),
          (d.PDFDoc.DiffOptions = function () {
            ;(this.mImpl = {}), (this.mHelpers = i())
          }),
          (d.PDFDoc.DiffOptions.prototype.getAddGroupAnnots = function () {
            return "AddGroupAnnots" in this.mImpl && !!this.mImpl.AddGroupAnnots
          }),
          (d.PDFDoc.DiffOptions.prototype.setAddGroupAnnots = function (e) {
            return this.mHelpers.putBool(this.mImpl, "AddGroupAnnots", e), this
          }),
          (d.PDFDoc.DiffOptions.prototype.getBlendMode = function () {
            return "BlendMode" in this.mImpl ? this.mImpl.BlendMode : 5
          }),
          (d.PDFDoc.DiffOptions.prototype.setBlendMode = function (e) {
            return this.mHelpers.putNumber(this.mImpl, "BlendMode", e), this
          }),
          (d.PDFDoc.DiffOptions.prototype.getColorA = function () {
            return "ColorA" in this.mImpl
              ? this.mHelpers.jsColorFromNumber(this.mImpl.ColorA)
              : this.mHelpers.jsColorFromNumber(4291559424)
          }),
          (d.PDFDoc.DiffOptions.prototype.setColorA = function (e) {
            return (
              this.mHelpers.putNumber(this.mImpl, "ColorA", this.mHelpers.jsColorToNumber(e)), this
            )
          }),
          (d.PDFDoc.DiffOptions.prototype.getColorB = function () {
            return "ColorB" in this.mImpl
              ? this.mHelpers.jsColorFromNumber(this.mImpl.ColorB)
              : this.mHelpers.jsColorFromNumber(4278242508)
          }),
          (d.PDFDoc.DiffOptions.prototype.setColorB = function (e) {
            return (
              this.mHelpers.putNumber(this.mImpl, "ColorB", this.mHelpers.jsColorToNumber(e)), this
            )
          }),
          (d.PDFDoc.DiffOptions.prototype.getLuminosityCompression = function () {
            return "LuminosityCompression" in this.mImpl ? this.mImpl.LuminosityCompression : 10
          }),
          (d.PDFDoc.DiffOptions.prototype.setLuminosityCompression = function (e) {
            return this.mHelpers.putNumber(this.mImpl, "LuminosityCompression", e), this
          }),
          (d.PDFDoc.DiffOptions.prototype.getJsonString = function () {
            return JSON.stringify(this.mImpl)
          }),
          (d.createDiffOptions = d.PDFDoc.createDiffOptions),
          (d.DiffOptions = d.PDFDoc.DiffOptions),
          (d.PDFDoc.createTextDiffOptions = function () {
            return Promise.resolve(new d.PDFDoc.TextDiffOptions())
          }),
          (d.PDFDoc.TextDiffOptions = function () {
            ;(this.name = "PDFNet.PDFDoc.TextDiffOptions"), (this.mImpl = {}), (this.mHelpers = i())
          }),
          (d.PDFDoc.TextDiffOptions.prototype.getColorA = function () {
            return "ColorA" in this.mImpl
              ? this.mHelpers.jsColorFromNumber(this.mImpl.ColorA)
              : this.mHelpers.jsColorFromNumber(4293284423)
          }),
          (d.PDFDoc.TextDiffOptions.prototype.setColorA = function (e) {
            return (
              this.mHelpers.putNumber(this.mImpl, "ColorA", this.mHelpers.jsColorToNumber(e)), this
            )
          }),
          (d.PDFDoc.TextDiffOptions.prototype.getOpacityA = function () {
            return "OpacityA" in this.mImpl ? this.mImpl.OpacityA : 0.5
          }),
          (d.PDFDoc.TextDiffOptions.prototype.setOpacityA = function (e) {
            return this.mHelpers.putNumber(this.mImpl, "OpacityA", e), this
          }),
          (d.PDFDoc.TextDiffOptions.prototype.getColorB = function () {
            return "ColorB" in this.mImpl
              ? this.mHelpers.jsColorFromNumber(this.mImpl.ColorB)
              : this.mHelpers.jsColorFromNumber(4284278322)
          }),
          (d.PDFDoc.TextDiffOptions.prototype.setColorB = function (e) {
            return (
              this.mHelpers.putNumber(this.mImpl, "ColorB", this.mHelpers.jsColorToNumber(e)), this
            )
          }),
          (d.PDFDoc.TextDiffOptions.prototype.getOpacityB = function () {
            return "OpacityB" in this.mImpl ? this.mImpl.OpacityB : 0.5
          }),
          (d.PDFDoc.TextDiffOptions.prototype.setOpacityB = function (e) {
            return this.mHelpers.putNumber(this.mImpl, "OpacityB", e), this
          }),
          (d.PDFDoc.TextDiffOptions.prototype.addZonesForPage = function (e, t, n) {
            if ((void 0 === this.mImpl[e] && (this.mImpl[e] = []), this.mImpl[e].length < n))
              for (var i = this.mImpl[e].length; i < n; i++) this.mImpl[e].push([])
            ;(t = t.map(function (e) {
              return [e.x1, e.y1, e.x2, e.y2]
            })),
              (this.mImpl[e][n - 1] = t)
          }),
          (d.PDFDoc.TextDiffOptions.prototype.addIgnoreZonesForPage = function (e, t) {
            return this.addZonesForPage("IgnoreZones", e, t), this
          }),
          (d.PDFDoc.TextDiffOptions.prototype.getJsonString = function () {
            return JSON.stringify(this.mImpl)
          }),
          (d.FDFDoc.createXFDFExportOptions = function () {
            return Promise.resolve(new d.FDFDoc.XFDFExportOptions())
          }),
          (d.FDFDoc.XFDFExportOptions = function () {
            ;(this.name = "PDFNet.FDFDoc.XFDFExportOptions"),
              (this.mImpl = {}),
              (this.mHelpers = i())
          }),
          (d.FDFDoc.XFDFExportOptions.prototype.getWriteAnnotationAppearance = function () {
            return (
              "WriteAnnotationAppearance" in this.mImpl && !!this.mImpl.WriteAnnotationAppearance
            )
          }),
          (d.FDFDoc.XFDFExportOptions.prototype.setWriteAnnotationAppearance = function (e) {
            return this.mHelpers.putBool(this.mImpl, "WriteAnnotationAppearance", e), this
          }),
          (d.FDFDoc.XFDFExportOptions.prototype.getWriteImagedata = function () {
            return !("WriteImagedata" in this.mImpl) || !!this.mImpl.WriteImagedata
          }),
          (d.FDFDoc.XFDFExportOptions.prototype.setWriteImagedata = function (e) {
            return this.mHelpers.putBool(this.mImpl, "WriteImagedata", e), this
          }),
          (d.FDFDoc.XFDFExportOptions.prototype.getJsonString = function () {
            return JSON.stringify(this.mImpl)
          }),
          (d.Convert.createAdvancedImagingConvertOptions = function () {
            return Promise.resolve(new d.Convert.AdvancedImagingConvertOptions())
          }),
          (d.Convert.AdvancedImagingConvertOptions = function () {
            ;(this.name = "PDFNet.Convert.AdvancedImagingConvertOptions"),
              (this.mImpl = {}),
              (this.mHelpers = i())
          }),
          (d.Convert.AdvancedImagingConvertOptions.prototype.getDefaultDPI = function () {
            return "DefaultDPI" in this.mImpl ? this.mImpl.DefaultDPI : 72
          }),
          (d.Convert.AdvancedImagingConvertOptions.prototype.setDefaultDPI = function (e) {
            return this.mHelpers.putNumber(this.mImpl, "DefaultDPI", e), this
          }),
          (d.Convert.AdvancedImagingConvertOptions.prototype.getEnableAutoLevel = function () {
            return "EnableAutoLevel" in this.mImpl && !!this.mImpl.EnableAutoLevel
          }),
          (d.Convert.AdvancedImagingConvertOptions.prototype.setEnableAutoLevel = function (e) {
            return this.mHelpers.putBool(this.mImpl, "EnableAutoLevel", e), this
          }),
          (d.PDFDoc.createMergeXFDFOptions = function () {
            return Promise.resolve(new d.PDFDoc.MergeXFDFOptions())
          }),
          (d.PDFDoc.MergeXFDFOptions = function () {
            ;(this.name = "PDFNet.PDFDoc.MergeXFDFOptions"),
              (this.mImpl = {}),
              (this.mHelpers = i())
          }),
          (d.PDFDoc.MergeXFDFOptions.prototype.getForce = function () {
            return "Force" in this.mImpl && !!this.mImpl.Force
          }),
          (d.PDFDoc.MergeXFDFOptions.prototype.setForce = function (e) {
            return this.mHelpers.putBool(this.mImpl, "Force", e), this
          }),
          (d.PDFDoc.MergeXFDFOptions.prototype.getJsonString = function () {
            return JSON.stringify(this.mImpl)
          }),
          (d.QuadPoint = function (e, t, n, i, r, o, s, u) {
            if (((this.name = "QuadPoint"), !e || void 0 !== t))
              return new d.QuadPoint({
                p1x: (e = void 0 === e ? 0 : e),
                p1y: (t = void 0 === t ? 0 : t),
                p2x: (n = void 0 === n ? 0 : n),
                p2y: (i = void 0 === i ? 0 : i),
                p3x: (r = void 0 === r ? 0 : r),
                p3y: (o = void 0 === o ? 0 : o),
                p4x: (s = void 0 === s ? 0 : s),
                p4y: (u = void 0 === u ? 0 : u),
              })
            m(e, this)
          }),
          (d.Point = function (e, t) {
            if (((this.name = "Point"), !e || void 0 !== t))
              return new d.Point({ x: (e = void 0 === e ? 0 : e), y: (t = void 0 === t ? 0 : t) })
            m(e, this)
          }),
          (d.CharData = function (e) {
            if (void 0 === e) throw new TypeError("CharData requires an object to construct with.")
            ;(this.name = "CharData"), m(e, this)
          }),
          (d.Separation = function (e) {
            if (void 0 === e)
              throw new TypeError("Separation requires an object to construct with.")
            ;(this.name = "Separation"), m(e, this)
          }),
          (d.Optimizer.createImageSettings = function () {
            return Promise.resolve(new d.Optimizer.ImageSettings())
          }),
          (d.Optimizer.ImageSettings = function () {
            ;(this.m_max_pixels = 4294967295),
              (this.m_max_dpi = 225),
              (this.m_resample_dpi = 150),
              (this.m_quality = 5),
              (this.m_compression_mode = d.Optimizer.ImageSettings.CompressionMode.e_retain),
              (this.m_downsample_mode = d.Optimizer.ImageSettings.DownsampleMode.e_default),
              (this.m_force_changes = this.m_force_recompression = !1)
          }),
          (d.Optimizer.ImageSettings.prototype.setImageDPI = function (e, t) {
            return (this.m_max_dpi = e), (this.m_resample_dpi = t), this
          }),
          (d.Optimizer.ImageSettings.prototype.setCompressionMode = function (e) {
            return (this.m_compression_mode = e), this
          }),
          (d.Optimizer.ImageSettings.prototype.setDownsampleMode = function (e) {
            return (this.m_downsample_mode = e), this
          }),
          (d.Optimizer.ImageSettings.prototype.setQuality = function (e) {
            return (this.m_quality = e), this
          }),
          (d.Optimizer.ImageSettings.prototype.forceRecompression = function (e) {
            return (this.m_force_recompression = e), this
          }),
          (d.Optimizer.ImageSettings.prototype.forceChanges = function (e) {
            return (this.m_force_changes = e), this
          }),
          (d.Optimizer.createMonoImageSettings = function () {
            return Promise.resolve(new d.Optimizer.MonoImageSettings())
          }),
          (d.Optimizer.MonoImageSettings = function () {
            ;(this.m_max_pixels = 4294967295),
              (this.m_max_dpi = 450),
              (this.m_resample_dpi = 300),
              (this.m_jbig2_threshold = 8.5),
              (this.m_compression_mode = d.Optimizer.ImageSettings.CompressionMode.e_retain),
              (this.m_downsample_mode = d.Optimizer.ImageSettings.DownsampleMode.e_default),
              (this.m_force_changes = this.m_force_recompression = !1)
          }),
          (d.Optimizer.MonoImageSettings.prototype.setImageDPI = function (e, t) {
            return (this.m_max_dpi = e), (this.m_resample_dpi = t), this
          }),
          (d.Optimizer.MonoImageSettings.prototype.setCompressionMode = function (e) {
            return (this.m_compression_mode = e), this
          }),
          (d.Optimizer.MonoImageSettings.prototype.setDownsampleMode = function (e) {
            return (this.m_downsample_mode = e), this
          }),
          (d.Optimizer.MonoImageSettings.prototype.setJBIG2Threshold = function (e) {
            return (this.m_jbig2_threshold = quality), this
          }),
          (d.Optimizer.MonoImageSettings.prototype.forceRecompression = function (e) {
            return (this.m_force_recompression = e), this
          }),
          (d.Optimizer.MonoImageSettings.prototype.forceChanges = function (e) {
            return (this.m_force_changes = e), this
          }),
          (d.Optimizer.createTextSettings = function () {
            return Promise.resolve(new d.Optimizer.TextSettings())
          }),
          (d.Optimizer.TextSettings = function () {
            this.m_embed_fonts = this.m_subset_fonts = !1
          }),
          (d.Optimizer.TextSettings.prototype.subsetFonts = function (e) {
            return (this.m_subset_fonts = e), this
          }),
          (d.Optimizer.TextSettings.prototype.embedFonts = function (e) {
            return (this.m_embed_fonts = e), this
          }),
          (d.Optimizer.createOptimizerSettings = function () {
            return Promise.resolve(new d.Optimizer.OptimizerSettings())
          }),
          (d.Optimizer.OptimizerSettings = function () {
            ;(this.color_image_settings = new d.Optimizer.ImageSettings()),
              (this.grayscale_image_settings = new d.Optimizer.ImageSettings()),
              (this.mono_image_settings = new d.Optimizer.MonoImageSettings()),
              (this.text_settings = new d.Optimizer.TextSettings()),
              (this.remove_custom = !0)
          }),
          (d.Optimizer.OptimizerSettings.prototype.setColorImageSettings = function (e) {
            return (this.color_image_settings = e), this
          }),
          (d.Optimizer.OptimizerSettings.prototype.setGrayscaleImageSettings = function (e) {
            return (this.grayscale_image_settings = e), this
          }),
          (d.Optimizer.OptimizerSettings.prototype.setMonoImageSettings = function (e) {
            return (this.mono_image_settings = e), this
          }),
          (d.Optimizer.OptimizerSettings.prototype.setTextSettings = function (e) {
            return (this.text_settings = e), this
          }),
          (d.Optimizer.OptimizerSettings.prototype.removeCustomEntries = function (e) {
            return (this.remove_custom = e), this
          }),
          (d.Optimizer.ImageSettings.CompressionMode = {
            e_retain: 0,
            e_flate: 1,
            e_jpeg: 2,
            e_jpeg2000: 3,
            e_none: 4,
          }),
          (d.Optimizer.ImageSettings.DownsampleMode = { e_off: 0, e_default: 1 }),
          (d.Optimizer.MonoImageSettings.CompressionMode = { e_jbig2: 0, e_flate: 1, e_none: 2 }),
          (d.Optimizer.MonoImageSettings.DownsampleMode = { e_off: 0, e_default: 1 }),
          (d.Convert.ConversionOptions = function (e) {
            ;(this.name = "PDFNet.Convert.ConversionOptions"), e && m(JSON.parse(e), this)
          }),
          (d.Convert.createOfficeToPDFOptions = function (e) {
            return Promise.resolve(new d.Convert.OfficeToPDFOptions(e))
          }),
          (d.Convert.OfficeToPDFOptions = function (e) {
            d.Convert.ConversionOptions.call(this, e)
          }),
          (d.Convert.OfficeToPDFOptions.prototype.setApplyPageBreaksToSheet = function (e) {
            return (this.ApplyPageBreaksToSheet = e), this
          }),
          (d.Convert.OfficeToPDFOptions.prototype.setDisplayChangeTracking = function (e) {
            return (this.DisplayChangeTracking = e), this
          }),
          (d.Convert.OfficeToPDFOptions.prototype.setExcelDefaultCellBorderWidth = function (e) {
            return (this.ExcelDefaultCellBorderWidth = e), this
          }),
          (d.Convert.OfficeToPDFOptions.prototype.setExcelMaxAllowedCellCount = function (e) {
            return (this.ExcelMaxAllowedCellCount = e), this
          }),
          (d.Convert.OfficeToPDFOptions.prototype.setLocale = function (e) {
            return (this.Locale = e), this
          }),
          (d.Convert.OfficeToPDFOptions.prototype.setTemplateParamsJson = function (e) {
            return (this.TemplateParamsJson = e), this
          }),
          (d.Convert.OverprintPreviewMode = { e_op_off: 0, e_op_on: 1, e_op_pdfx_on: 2 }),
          (d.Convert.XPSOutputCommonOptions = function () {
            this.name = "PDFNet.Convert.XPSOutputCommonOptions"
          }),
          (d.Convert.XPSOutputCommonOptions.prototype.setPrintMode = function (e) {
            return (this.PRINTMODE = e), this
          }),
          (d.Convert.XPSOutputCommonOptions.prototype.setDPI = function (e) {
            return (this.DPI = e), this
          }),
          (d.Convert.XPSOutputCommonOptions.prototype.setRenderPages = function (e) {
            return (this.RENDER = e), this
          }),
          (d.Convert.XPSOutputCommonOptions.prototype.setThickenLines = function (e) {
            return (this.THICKENLINES = e), this
          }),
          (d.Convert.XPSOutputCommonOptions.prototype.generateURLLinks = function (e) {
            return (this.URL_LINKS = e), this
          }),
          (d.Convert.XPSOutputCommonOptions.prototype.setOverprint = function (e) {
            switch (e) {
              case d.Convert.OverprintPreviewMode.e_op_off:
                this.OVERPRINT_MODE = "OFF"
                break
              case d.Convert.OverprintPreviewMode.e_op_on:
                this.OVERPRINT_MODE = "ON"
                break
              case d.Convert.OverprintPreviewMode.e_op_pdfx_on:
                this.OVERPRINT_MODE = "PDFX"
            }
            return this
          }),
          (d.Convert.createXPSOutputOptions = function () {
            return Promise.resolve(new d.Convert.XPSOutputOptions())
          }),
          (d.Convert.XPSOutputOptions = function () {
            this.name = "PDFNet.Convert.XPSOutputOptions"
          }),
          (d.Convert.XPSOutputOptions.prototype = Object.create(
            d.Convert.XPSOutputCommonOptions.prototype
          )),
          (d.Convert.XPSOutputOptions.prototype.setOpenXps = function (e) {
            return (this.OPENXPS = e), this
          }),
          (d.Convert.FlattenFlag = { e_off: 0, e_simple: 1, e_fast: 2, e_high_quality: 3 }),
          (d.Convert.FlattenThresholdFlag = {
            e_very_strict: 0,
            e_strict: 1,
            e_default: 2,
            e_keep_most: 3,
            e_keep_all: 4,
          }),
          (d.Convert.AnnotationOutputFlag = {
            e_internal_xfdf: 0,
            e_external_xfdf: 1,
            e_flatten: 2,
          }),
          (d.Convert.createXODOutputOptions = function () {
            return Promise.resolve(new d.Convert.XODOutputOptions())
          }),
          (d.Convert.XODOutputOptions = function () {
            this.name = "PDFNet.Convert.XODOutputOptions"
          }),
          (d.Convert.XODOutputOptions.prototype = Object.create(
            d.Convert.XPSOutputCommonOptions.prototype
          )),
          (d.Convert.XODOutputOptions.prototype.setOutputThumbnails = function (e) {
            return (this.NOTHUMBS = e), this
          }),
          (d.Convert.XODOutputOptions.prototype.setOutputThumbnails = function (e) {
            return (this.NOTHUMBS = e), this
          }),
          (d.Convert.XODOutputOptions.prototype.setThumbnailSize = function (e, t) {
            return (this.THUMB_SIZE = e), (this.LARGE_THUMB_SIZE = t || e), this
          }),
          (d.Convert.XODOutputOptions.prototype.setElementLimit = function (e) {
            return (this.ELEMENTLIMIT = e), this
          }),
          (d.Convert.XODOutputOptions.prototype.setOpacityMaskWorkaround = function (e) {
            return (this.MASKRENDER = e), this
          }),
          (d.Convert.XODOutputOptions.prototype.setMaximumImagePixels = function (e) {
            return (this.MAX_IMAGE_PIXELS = e), this
          }),
          (d.Convert.XODOutputOptions.prototype.setFlattenContent = function (e) {
            switch (e) {
              case d.Convert.FlattenFlag.e_off:
                this.FLATTEN_CONTENT = "OFF"
                break
              case d.Convert.FlattenFlag.e_simple:
                this.FLATTEN_CONTENT = "SIMPLE"
                break
              case d.Convert.FlattenFlag.e_fast:
                this.FLATTEN_CONTENT = "FAST"
                break
              case d.Convert.FlattenFlag.e_high_quality:
                this.FLATTEN_CONTENT = "HIGH_QUALITY"
            }
            return this
          }),
          (d.Convert.XODOutputOptions.prototype.setFlattenThreshold = function (e) {
            switch (e) {
              case d.Convert.FlattenThresholdFlag.e_very_strict:
                this.FLATTEN_THRESHOLD = "VERY_STRICT"
                break
              case d.Convert.FlattenThresholdFlag.e_strict:
                this.FLATTEN_THRESHOLD = "STRICT"
                break
              case d.Convert.FlattenThresholdFlag.e_default:
                this.FLATTEN_THRESHOLD = "DEFAULT"
                break
              case d.Convert.FlattenThresholdFlag.e_keep_most:
                this.FLATTEN_THRESHOLD = "KEEP_MOST"
                break
              case d.Convert.FlattenThresholdFlag.e_keep_all:
                this.FLATTEN_THRESHOLD = "KEEP_ALL"
            }
            return this
          }),
          (d.Convert.XODOutputOptions.prototype.setPreferJPG = function (e) {
            return (this.PREFER_JPEG = e), this
          }),
          (d.Convert.XODOutputOptions.prototype.setJPGQuality = function (e) {
            return (this.JPEG_QUALITY = e), this
          }),
          (d.Convert.XODOutputOptions.prototype.setSilverlightTextWorkaround = function (e) {
            return (this.REMOVE_ROTATED_TEXT = e), this
          }),
          (d.Convert.XODOutputOptions.prototype.setAnnotationOutput = function (e) {
            switch (e) {
              case d.Convert.AnnotationOutputFlag.e_internal_xfdf:
                this.ANNOTATION_OUTPUT = "INTERNAL"
                break
              case d.Convert.AnnotationOutputFlag.e_external_xfdf:
                this.ANNOTATION_OUTPUT = "EXTERNAL"
                break
              case d.Convert.AnnotationOutputFlag.e_flatten:
                this.ANNOTATION_OUTPUT = "FLATTEN"
            }
            return this
          }),
          (d.Convert.XODOutputOptions.prototype.setExternalParts = function (e) {
            return (this.EXTERNAL_PARTS = e), this
          }),
          (d.Convert.XODOutputOptions.prototype.setEncryptPassword = function (e) {
            return (this.ENCRYPT_PASSWORD = e), this
          }),
          (d.Convert.XODOutputOptions.prototype.useSilverlightFlashCompatible = function (e) {
            return (this.COMPATIBLE_XOD = e), this
          }),
          (d.Convert.createTiffOutputOptions = function () {
            return Promise.resolve(new d.Convert.TiffOutputOptions())
          }),
          (d.Convert.TiffOutputOptions = function () {
            this.name = "PDFNet.Convert.TiffOutputOptions"
          }),
          (d.Convert.TiffOutputOptions.prototype.setBox = function (e) {
            switch (e) {
              case d.Page.Box.e_media:
                this.BOX = "media"
                break
              case d.Page.Box.e_crop:
                this.BOX = "crop"
                break
              case d.Page.Box.e_bleed:
                this.BOX = "bleed"
                break
              case d.Page.Box.e_trim:
                this.BOX = "trim"
                break
              case d.Page.Box.e_art:
                this.BOX = "art"
            }
            return this
          }),
          (d.Convert.TiffOutputOptions.prototype.setRotate = function (e) {
            switch (e) {
              case d.Page.Box.e_0:
                this.ROTATE = "0"
                break
              case d.Page.Box.e_90:
                this.ROTATE = "90"
                break
              case d.Page.Box.e_180:
                this.ROTATE = "180"
                break
              case d.Page.Box.e_270:
                this.ROTATE = "270"
            }
            return this
          }),
          (d.Convert.TiffOutputOptions.prototype.setClip = function (e, t, n, i) {
            return (
              (this.CLIP_X1 = e), (this.CLIP_Y1 = t), (this.CLIP_X2 = n), (this.CLIP_Y2 = i), this
            )
          }),
          (d.Convert.TiffOutputOptions.prototype.setPages = function (e) {
            return (this.PAGES = e), this
          }),
          (d.Convert.TiffOutputOptions.prototype.setOverprint = function (e) {
            switch (e) {
              case d.PDFRasterizer.OverprintPreviewMode.e_op_off:
                this.OVERPRINT_MODE = "OFF"
                break
              case d.PDFRasterizer.OverprintPreviewMode.e_op_on:
                this.OVERPRINT_MODE = "ON"
                break
              case d.PDFRasterizer.OverprintPreviewMode.e_op_pdfx_on:
                this.OVERPRINT_MODE = "PDFX"
            }
            return this
          }),
          (d.Convert.TiffOutputOptions.prototype.setCMYK = function (e) {
            return (this.CMYK = e), this
          }),
          (d.Convert.TiffOutputOptions.prototype.setDither = function (e) {
            return (this.DITHER = e), this
          }),
          (d.Convert.TiffOutputOptions.prototype.setGray = function (e) {
            return (this.GRAY = e), this
          }),
          (d.Convert.TiffOutputOptions.prototype.setMono = function (e) {
            return (this.MONO = e), this
          }),
          (d.Convert.TiffOutputOptions.prototype.setAnnots = function (e) {
            return (this.ANNOTS = e), this
          }),
          (d.Convert.TiffOutputOptions.prototype.setSmooth = function (e) {
            return (this.SMOOTH = e), this
          }),
          (d.Convert.TiffOutputOptions.prototype.setPrintmode = function (e) {
            return (this.PRINTMODE = e), this
          }),
          (d.Convert.TiffOutputOptions.prototype.setTransparentPage = function (e) {
            return (this.TRANSPARENT_PAGE = e), this
          }),
          (d.Convert.TiffOutputOptions.prototype.setPalettized = function (e) {
            return (this.PALETTIZED = e), this
          }),
          (d.Convert.TiffOutputOptions.prototype.setDPI = function (e) {
            return (this.DPI = e), this
          }),
          (d.Convert.TiffOutputOptions.prototype.setGamma = function (e) {
            return (this.GAMMA = e), this
          }),
          (d.Convert.TiffOutputOptions.prototype.setHRes = function (e) {
            return (this.HRES = e), this
          }),
          (d.Convert.TiffOutputOptions.prototype.setVRes = function (e) {
            return (this.VRES = e), this
          }),
          (d.Convert.createHTMLOutputOptions = function () {
            return Promise.resolve(new d.Convert.HTMLOutputOptions())
          }),
          (d.Convert.HTMLOutputOptions = function () {
            this.name = "PDFNet.Convert.HTMLOutputOptions"
          }),
          (d.Convert.HTMLOutputOptions.prototype.setPreferJPG = function (e) {
            return (this.PREFER_JPEG = e), this
          }),
          (d.Convert.HTMLOutputOptions.prototype.setJPGQuality = function (e) {
            return (this.JPEG_QUALITY = e), this
          }),
          (d.Convert.HTMLOutputOptions.prototype.setDPI = function (e) {
            return (this.DPI = e), this
          }),
          (d.Convert.HTMLOutputOptions.prototype.setMaximumImagePixels = function (e) {
            return (this.MAX_IMAGE_PIXELS = e), this
          }),
          (d.Convert.HTMLOutputOptions.prototype.setScale = function (e) {
            return (this.SCALE = e), this
          }),
          (d.Convert.HTMLOutputOptions.prototype.setExternalLinks = function (e) {
            return (this.EXTERNAL_LINKS = e), this
          }),
          (d.Convert.HTMLOutputOptions.prototype.setInternalLinks = function (e) {
            return (this.INTERNAL_LINKS = e), this
          }),
          (d.Convert.HTMLOutputOptions.prototype.setSimplifyText = function (e) {
            return (this.SIMPLIFY_TEXT = e), this
          }),
          (d.Convert.createEPUBOutputOptions = function () {
            return Promise.resolve(new d.Convert.EPUBOutputOptions())
          }),
          (d.Convert.EPUBOutputOptions = function () {
            this.name = "PDFNet.Convert.EPUBOutputOptions"
          }),
          (d.Convert.EPUBOutputOptions.prototype.setExpanded = function (e) {
            return (this.EPUB_EXPANDED = e), this
          }),
          (d.Convert.EPUBOutputOptions.prototype.setReuseCover = function (e) {
            return (this.EPUB_REUSE_COVER = e), this
          }),
          (d.Convert.createSVGOutputOptions = function () {
            return Promise.resolve(new d.Convert.SVGOutputOptions())
          }),
          (d.Convert.SVGOutputOptions = function () {
            this.name = "PDFNet.Convert.SVGOutputOptions"
          }),
          (d.Convert.SVGOutputOptions.prototype.setEmbedImages = function (e) {
            return (this.EMBEDIMAGES = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setNoFonts = function (e) {
            return (this.NOFONTS = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setSvgFonts = function (e) {
            return (this.SVGFONTS = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setEmbedFonts = function (e) {
            return (this.EMBEDFONTS = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setNoUnicode = function (e) {
            return (this.NOUNICODE = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setIndividualCharPlacement = function (e) {
            return (this.INDIVIDUALCHARPLACEMENT = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setRemoveCharPlacement = function (e) {
            return (this.REMOVECHARPLACEMENT = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setFlattenContent = function (e) {
            switch (e) {
              case d.Convert.FlattenFlag.e_off:
                this.FLATTEN_CONTENT = "OFF"
                break
              case d.Convert.FlattenFlag.e_simple:
                this.FLATTEN_CONTENT = "SIMPLE"
                break
              case d.Convert.FlattenFlag.e_fast:
                this.FLATTEN_CONTENT = "FAST"
                break
              case d.Convert.FlattenFlag.e_high_quality:
                this.FLATTEN_CONTENT = "HIGH_QUALITY"
            }
            return this
          }),
          (d.Convert.SVGOutputOptions.prototype.setFlattenThreshold = function (e) {
            switch (e) {
              case d.Convert.FlattenThresholdFlag.e_very_strict:
                this.FLATTEN_THRESHOLD = "VERY_STRICT"
                break
              case d.Convert.FlattenThresholdFlag.e_strict:
                this.FLATTEN_THRESHOLD = "STRICT"
                break
              case d.Convert.FlattenThresholdFlag.e_default:
                this.FLATTEN_THRESHOLD = "DEFAULT"
                break
              case d.Convert.FlattenThresholdFlag.e_keep_most:
                this.FLATTEN_THRESHOLD = "KEEP_MOST"
                break
              case d.Convert.FlattenThresholdFlag.e_keep_all:
                this.FLATTEN_THRESHOLD = "KEEP_ALL"
            }
            return this
          }),
          (d.Convert.SVGOutputOptions.prototype.setFlattenDPI = function (e) {
            return (this.DPI = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setFlattenMaximumImagePixels = function (e) {
            return (this.MAX_IMAGE_PIXELS = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setCompress = function (e) {
            return (this.SVGZ = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setOutputThumbnails = function (e) {
            return (this.NOTHUMBS = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setThumbnailSize = function (e) {
            return (this.THUMB_SIZE = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setCreateXmlWrapper = function (e) {
            return (this.NOXMLDOC = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setDtd = function (e) {
            return (this.OMITDTD = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setAnnots = function (e) {
            return (this.NOANNOTS = e), this
          }),
          (d.Convert.SVGOutputOptions.prototype.setOverprint = function (e) {
            switch (e) {
              case d.PDFRasterizer.OverprintPreviewMode.e_op_off:
                this.OVERPRINT_MODE = "OFF"
                break
              case d.PDFRasterizer.OverprintPreviewMode.e_op_on:
                this.OVERPRINT_MODE = "ON"
                break
              case d.PDFRasterizer.OverprintPreviewMode.e_op_pdfx_on:
                this.OVERPRINT_MODE = "PDFX"
            }
            return this
          }),
          (d.PDFDoc.createViewerOptimizedOptions = function () {
            return Promise.resolve(new d.PDFDoc.ViewerOptimizedOptions())
          }),
          (d.PDFDoc.ViewerOptimizedOptions = function () {
            this.name = "PDFNet.PDFDoc.ViewerOptimizedOptions"
          }),
          (d.PDFDoc.ViewerOptimizedOptions.prototype.setThumbnailRenderingThreshold = function (e) {
            return (this.COMPLEXITY_THRESHOLD = e), this
          }),
          (d.PDFDoc.ViewerOptimizedOptions.prototype.setMinimumInitialThumbnails = function (e) {
            return (this.MINIMUM_INITIAL_THUMBNAILS = e), this
          }),
          (d.PDFDoc.ViewerOptimizedOptions.prototype.setThumbnailSize = function (e) {
            return (this.THUMB_SIZE = e), this
          }),
          (d.PDFDoc.ViewerOptimizedOptions.prototype.setOverprint = function (e) {
            switch (e) {
              case d.PDFRasterizer.OverprintPreviewMode.e_op_off:
                this.OVERPRINT_MODE = "OFF"
                break
              case d.PDFRasterizer.OverprintPreviewMode.e_op_on:
                this.OVERPRINT_MODE = "ON"
                break
              case d.PDFRasterizer.OverprintPreviewMode.e_op_pdfx_on:
                this.OVERPRINT_MODE = "PDFX"
            }
            return this
          }),
          (d.MarkupAnnot.prototype = new d.Annot()),
          (d.TextMarkupAnnot.prototype = new d.MarkupAnnot()),
          (d.CaretAnnot.prototype = new d.MarkupAnnot()),
          (d.LineAnnot.prototype = new d.MarkupAnnot()),
          (d.CircleAnnot.prototype = new d.MarkupAnnot()),
          (d.FileAttachmentAnnot.prototype = new d.MarkupAnnot()),
          (d.FreeTextAnnot.prototype = new d.MarkupAnnot()),
          (d.HighlightAnnot.prototype = new d.TextMarkupAnnot()),
          (d.InkAnnot.prototype = new d.MarkupAnnot()),
          (d.LinkAnnot.prototype = new d.Annot()),
          (d.MovieAnnot.prototype = new d.Annot()),
          (d.PolyLineAnnot.prototype = new d.LineAnnot()),
          (d.PolygonAnnot.prototype = new d.PolyLineAnnot()),
          (d.PopupAnnot.prototype = new d.Annot()),
          (d.RedactionAnnot.prototype = new d.MarkupAnnot()),
          (d.RubberStampAnnot.prototype = new d.MarkupAnnot()),
          (d.ScreenAnnot.prototype = new d.Annot()),
          (d.SoundAnnot.prototype = new d.MarkupAnnot()),
          (d.SquareAnnot.prototype = new d.MarkupAnnot()),
          (d.SquigglyAnnot.prototype = new d.TextMarkupAnnot()),
          (d.StrikeOutAnnot.prototype = new d.TextMarkupAnnot()),
          (d.TextAnnot.prototype = new d.MarkupAnnot()),
          (d.UnderlineAnnot.prototype = new d.TextMarkupAnnot()),
          (d.WatermarkAnnot.prototype = new d.Annot()),
          (d.WidgetAnnot.prototype = new d.Annot()),
          (d.SignatureWidget.prototype = new d.WidgetAnnot()),
          (d.ComboBoxWidget.prototype = new d.WidgetAnnot()),
          (d.ListBoxWidget.prototype = new d.WidgetAnnot()),
          (d.TextWidget.prototype = new d.WidgetAnnot()),
          (d.CheckBoxWidget.prototype = new d.WidgetAnnot()),
          (d.RadioButtonWidget.prototype = new d.WidgetAnnot()),
          (d.PushButtonWidget.prototype = new d.WidgetAnnot()),
          (d.PrinterMode.PaperSize = {
            e_custom: 0,
            e_letter: 1,
            e_letter_small: 2,
            e_tabloid: 3,
            e_ledger: 4,
            e_legal: 5,
            e_statement: 6,
            e_executive: 7,
            e_a3: 8,
            e_a4: 9,
            e_a4_mall: 10,
            e_a5: 11,
            e_b4_jis: 12,
            e_b5_jis: 13,
            e_folio: 14,
            e_quarto: 15,
            e_10x14: 16,
            e_11x17: 17,
            e_note: 18,
            e_envelope_9: 19,
            e_envelope_10: 20,
            e_envelope_11: 21,
            e_envelope_12: 22,
            e_envelope_14: 23,
            e_c_size_sheet: 24,
            e_d_size_sheet: 25,
            e_e_size_sheet: 26,
            e_envelope_dl: 27,
            e_envelope_c5: 28,
            e_envelope_c3: 29,
            e_envelope_c4: 30,
            e_envelope_c6: 31,
            e_envelope_c65: 32,
            e_envelope_b4: 33,
            e_envelope_b5: 34,
            e_envelope_b6: 35,
            e_envelope_italy: 36,
            e_envelope_monarch: 37,
            e_6_3_quarters_envelope: 38,
            e_us_std_fanfold: 39,
            e_german_std_fanfold: 40,
            e_german_legal_fanfold: 41,
            e_b4_iso: 42,
            e_japanese_postcard: 43,
            e_9x11: 44,
            e_10x11: 45,
            e_15x11: 46,
            e_envelope_invite: 47,
            e_reserved_48: 48,
            e_reserved_49: 49,
            e_letter_extra: 50,
            e_legal_extra: 51,
            e_tabloid_extra: 52,
            e_a4_extra: 53,
            e_letter_transverse: 54,
            e_a4_transverse: 55,
            e_letter_extra_transverse: 56,
            e_supera_supera_a4: 57,
            e_Superb_Superb_a3: 58,
            e_letter_plus: 59,
            e_a4_plus: 60,
            e_a5_transverse: 61,
            e_b5_jis_transverse: 62,
            e_a3_extra: 63,
            e_a5_extra: 64,
            e_b5_iso_extra: 65,
            e_a2: 66,
            e_a3_transverse: 67,
            e_a3_extra_transverse: 68,
            e_japanese_double_postcard: 69,
            e_a6: 70,
            e_japanese_envelope_kaku_2: 71,
            e_japanese_envelope_kaku_3: 72,
            e_japanese_envelope_chou_3: 73,
            e_japanese_envelope_chou_4: 74,
            e_letter_rotated: 75,
            e_a3_rotated: 76,
            e_a4_rotated: 77,
            e_a5_rotated: 78,
            e_b4_jis_rotated: 79,
            e_b5_jis_rotated: 80,
            e_japanese_postcard_rotated: 81,
            e_double_japanese_postcard_rotated: 82,
            e_a6_rotated: 83,
            e_japanese_envelope_kaku_2_rotated: 84,
            e_japanese_envelope_kaku_3_rotated: 85,
            e_japanese_envelope_chou_3_rotated: 86,
            e_japanese_envelope_chou_4_rotated: 87,
            e_b6_jis: 88,
            e_b6_jis_rotated: 89,
            e_12x11: 90,
            e_japanese_envelope_you_4: 91,
            e_japanese_envelope_you_4_rotated: 92,
            e_PrinterMode_prc_16k: 93,
            e_prc_32k: 94,
            e_prc_32k_big: 95,
            e_prc_envelop_1: 96,
            e_prc_envelop_2: 97,
            e_prc_envelop_3: 98,
            e_prc_envelop_4: 99,
            e_prc_envelop_5: 100,
            e_prc_envelop_6: 101,
            e_prc_envelop_7: 102,
            e_prc_envelop_8: 103,
            e_prc_envelop_9: 104,
            e_prc_envelop_10: 105,
            e_prc_16k_rotated: 106,
            e_prc_32k_rotated: 107,
            e_prc_32k_big__rotated: 108,
            e_prc_envelop_1_rotated: 109,
            e_prc_envelop_2_rotated: 110,
            e_prc_envelop_3_rotated: 111,
            e_prc_envelop_4_rotated: 112,
            e_prc_envelop_5_rotated: 113,
            e_prc_envelop_6_rotated: 114,
            e_prc_envelop_7_rotated: 115,
            e_prc_envelop_8_rotated: 116,
            e_prc_envelop_9_rotated: 117,
            e_prc_envelop_10_rotated: 118,
          }),
          (d.Field.EventType = {
            e_action_trigger_keystroke: 13,
            e_action_trigger_format: 14,
            e_action_trigger_validate: 15,
            e_action_trigger_calculate: 16,
          }),
          (d.Field.Type = {
            e_button: 0,
            e_check: 1,
            e_radio: 2,
            e_text: 3,
            e_choice: 4,
            e_signature: 5,
            e_null: 6,
          }),
          (d.Field.Flag = {
            e_read_only: 0,
            e_required: 1,
            e_no_export: 2,
            e_pushbutton_flag: 3,
            e_radio_flag: 4,
            e_toggle_to_off: 5,
            e_radios_in_unison: 6,
            e_multiline: 7,
            e_password: 8,
            e_file_select: 9,
            e_no_spellcheck: 10,
            e_no_scroll: 11,
            e_comb: 12,
            e_rich_text: 13,
            e_combo: 14,
            e_edit: 15,
            e_sort: 16,
            e_multiselect: 17,
            e_commit_on_sel_change: 18,
          }),
          (d.Field.TextJustification = {
            e_left_justified: 0,
            e_centered: 1,
            e_right_justified: 2,
          }),
          (d.Filter.StdFileOpenMode = { e_read_mode: 0, e_write_mode: 1, e_append_mode: 2 }),
          (d.Filter.ReferencePos = { e_begin: 0, e_end: 2, e_cur: 1 }),
          (d.OCGContext.OCDrawMode = { e_VisibleOC: 0, e_AllOC: 1, e_NoOC: 2 }),
          (d.OCMD.VisibilityPolicyType = { e_AllOn: 0, e_AnyOn: 1, e_AnyOff: 2, e_AllOff: 3 }),
          (d.PDFACompliance.Conformance = {
            e_Level1A: 1,
            e_Level1B: 2,
            e_Level2A: 3,
            e_Level2B: 4,
            e_Level2U: 5,
            e_Level3A: 6,
            e_Level3B: 7,
            e_Level3U: 8,
          }),
          (d.PDFACompliance.ErrorCode = {
            e_PDFA0_1_0: 10,
            e_PDFA0_1_1: 11,
            e_PDFA0_1_2: 12,
            e_PDFA0_1_3: 13,
            e_PDFA0_1_4: 14,
            e_PDFA0_1_5: 15,
            e_PDFA1_2_1: 121,
            e_PDFA1_2_2: 122,
            e_PDFA1_3_1: 131,
            e_PDFA1_3_2: 132,
            e_PDFA1_3_3: 133,
            e_PDFA1_3_4: 134,
            e_PDFA1_4_1: 141,
            e_PDFA1_4_2: 142,
            e_PDFA1_6_1: 161,
            e_PDFA1_7_1: 171,
            e_PDFA1_7_2: 172,
            e_PDFA1_7_3: 173,
            e_PDFA1_7_4: 174,
            e_PDFA1_8_1: 181,
            e_PDFA1_8_2: 182,
            e_PDFA1_8_3: 183,
            e_PDFA1_8_4: 184,
            e_PDFA1_8_5: 185,
            e_PDFA1_8_6: 186,
            e_PDFA1_10_1: 1101,
            e_PDFA1_11_1: 1111,
            e_PDFA1_11_2: 1112,
            e_PDFA1_12_1: 1121,
            e_PDFA1_12_2: 1122,
            e_PDFA1_12_3: 1123,
            e_PDFA1_12_4: 1124,
            e_PDFA1_12_5: 1125,
            e_PDFA1_12_6: 1126,
            e_PDFA1_13_1: 1131,
            e_PDFA2_2_1: 221,
            e_PDFA2_3_2: 232,
            e_PDFA2_3_3: 233,
            e_PDFA2_3_3_1: 2331,
            e_PDFA2_3_3_2: 2332,
            e_PDFA2_3_4_1: 2341,
            e_PDFA2_4_1: 241,
            e_PDFA2_4_2: 242,
            e_PDFA2_4_3: 243,
            e_PDFA2_4_4: 244,
            e_PDFA2_5_1: 251,
            e_PDFA2_5_2: 252,
            e_PDFA2_6_1: 261,
            e_PDFA2_7_1: 271,
            e_PDFA2_8_1: 281,
            e_PDFA2_9_1: 291,
            e_PDFA2_10_1: 2101,
            e_PDFA3_2_1: 321,
            e_PDFA3_3_1: 331,
            e_PDFA3_3_2: 332,
            e_PDFA3_3_3_1: 3331,
            e_PDFA3_3_3_2: 3332,
            e_PDFA3_4_1: 341,
            e_PDFA3_5_1: 351,
            e_PDFA3_5_2: 352,
            e_PDFA3_5_3: 353,
            e_PDFA3_5_4: 354,
            e_PDFA3_5_5: 355,
            e_PDFA3_5_6: 356,
            e_PDFA3_6_1: 361,
            e_PDFA3_7_1: 371,
            e_PDFA3_7_2: 372,
            e_PDFA3_7_3: 373,
            e_PDFA4_1: 41,
            e_PDFA4_2: 42,
            e_PDFA4_3: 43,
            e_PDFA4_4: 44,
            e_PDFA4_5: 45,
            e_PDFA4_6: 46,
            e_PDFA5_2_1: 521,
            e_PDFA5_2_2: 522,
            e_PDFA5_2_3: 523,
            e_PDFA5_2_4: 524,
            e_PDFA5_2_5: 525,
            e_PDFA5_2_6: 526,
            e_PDFA5_2_7: 527,
            e_PDFA5_2_8: 528,
            e_PDFA5_2_9: 529,
            e_PDFA5_2_10: 5210,
            e_PDFA5_2_11: 5211,
            e_PDFA5_3_1: 531,
            e_PDFA5_3_2_1: 5321,
            e_PDFA5_3_2_2: 5322,
            e_PDFA5_3_2_3: 5323,
            e_PDFA5_3_2_4: 5324,
            e_PDFA5_3_2_5: 5325,
            e_PDFA5_3_3_1: 5331,
            e_PDFA5_3_3_2: 5332,
            e_PDFA5_3_3_3: 5333,
            e_PDFA5_3_3_4: 5334,
            e_PDFA5_3_4_0: 5340,
            e_PDFA5_3_4_1: 5341,
            e_PDFA5_3_4_2: 5342,
            e_PDFA5_3_4_3: 5343,
            e_PDFA6_1_1: 611,
            e_PDFA6_1_2: 612,
            e_PDFA6_2_1: 621,
            e_PDFA6_2_2: 622,
            e_PDFA6_2_3: 623,
            e_PDFA7_2_1: 721,
            e_PDFA7_2_2: 722,
            e_PDFA7_2_3: 723,
            e_PDFA7_2_4: 724,
            e_PDFA7_2_5: 725,
            e_PDFA7_3_1: 731,
            e_PDFA7_3_2: 732,
            e_PDFA7_3_3: 733,
            e_PDFA7_3_4: 734,
            e_PDFA7_3_5: 735,
            e_PDFA7_3_6: 736,
            e_PDFA7_3_7: 737,
            e_PDFA7_3_8: 738,
            e_PDFA7_3_9: 739,
            e_PDFA7_5_1: 751,
            e_PDFA7_8_1: 781,
            e_PDFA7_8_2: 782,
            e_PDFA7_8_3: 783,
            e_PDFA7_8_4: 784,
            e_PDFA7_8_5: 785,
            e_PDFA7_8_6: 786,
            e_PDFA7_8_7: 787,
            e_PDFA7_8_8: 788,
            e_PDFA7_8_9: 789,
            e_PDFA7_8_10: 7810,
            e_PDFA7_8_11: 7811,
            e_PDFA7_8_12: 7812,
            e_PDFA7_8_13: 7813,
            e_PDFA7_8_14: 7814,
            e_PDFA7_8_15: 7815,
            e_PDFA7_8_16: 7816,
            e_PDFA7_8_17: 7817,
            e_PDFA7_8_18: 7818,
            e_PDFA7_8_19: 7819,
            e_PDFA7_8_20: 7820,
            e_PDFA7_8_21: 7821,
            e_PDFA7_8_22: 7822,
            e_PDFA7_8_23: 7823,
            e_PDFA7_8_24: 7824,
            e_PDFA7_8_25: 7825,
            e_PDFA7_8_26: 7826,
            e_PDFA7_8_27: 7827,
            e_PDFA7_8_28: 7828,
            e_PDFA7_8_29: 7829,
            e_PDFA7_8_30: 7830,
            e_PDFA7_8_31: 7831,
            e_PDFA7_11_1: 7111,
            e_PDFA7_11_2: 7112,
            e_PDFA7_11_3: 7113,
            e_PDFA7_11_4: 7114,
            e_PDFA7_11_5: 7115,
            e_PDFA9_1: 91,
            e_PDFA9_2: 92,
            e_PDFA9_3: 93,
            e_PDFA9_4: 94,
            e_PDFA3_8_1: 381,
            e_PDFA8_2_2: 822,
            e_PDFA8_3_3_1: 8331,
            e_PDFA8_3_3_2: 8332,
            e_PDFA8_3_4_1: 8341,
            e_PDFA1_2_3: 123,
            e_PDFA1_10_2: 1102,
            e_PDFA1_10_3: 1103,
            e_PDFA1_12_10: 11210,
            e_PDFA1_13_5: 1135,
            e_PDFA2_3_10: 2310,
            e_PDFA2_4_2_10: 24220,
            e_PDFA2_4_2_11: 24221,
            e_PDFA2_4_2_12: 24222,
            e_PDFA2_4_2_13: 24223,
            e_PDFA2_5_10: 2510,
            e_PDFA2_5_11: 2511,
            e_PDFA2_5_12: 2512,
            e_PDFA2_8_3_1: 2831,
            e_PDFA2_8_3_2: 2832,
            e_PDFA2_8_3_3: 2833,
            e_PDFA2_8_3_4: 2834,
            e_PDFA2_8_3_5: 2835,
            e_PDFA2_10_20: 21020,
            e_PDFA2_10_21: 21021,
            e_PDFA11_0_0: 11e3,
            e_PDFA6_2_11_8: 62118,
            e_PDFA8_1: 81,
            e_PDFA_3E1: 1,
            e_PDFA_3E2: 2,
            e_PDFA_3E3: 3,
            e_PDFA_LAST: 4,
          }),
          (d.ContentItem.Type = { e_MCR: 0, e_MCID: 1, e_OBJR: 2, e_Unknown: 3 }),
          (d.Action.Type = {
            e_GoTo: 0,
            e_GoToR: 1,
            e_GoToE: 2,
            e_Launch: 3,
            e_Thread: 4,
            e_URI: 5,
            e_Sound: 6,
            e_Movie: 7,
            e_Hide: 8,
            e_Named: 9,
            e_SubmitForm: 10,
            e_ResetForm: 11,
            e_ImportData: 12,
            e_JavaScript: 13,
            e_SetOCGState: 14,
            e_Rendition: 15,
            e_Trans: 16,
            e_GoTo3DView: 17,
            e_RichMediaExecute: 18,
            e_Unknown: 19,
          }),
          (d.Action.FormActionFlag = {
            e_exclude: 0,
            e_include_no_value_fields: 1,
            e_export_format: 2,
            e_get_method: 3,
            e_submit_coordinates: 4,
            e_xfdf: 5,
            e_include_append_saves: 6,
            e_include_annotations: 7,
            e_submit_pdf: 8,
            e_canonical_format: 9,
            e_excl_non_user_annots: 10,
            e_excl_F_key: 11,
            e_embed_form: 13,
          }),
          (d.Page.EventType = { e_action_trigger_page_open: 11, e_action_trigger_page_close: 12 }),
          (d.Page.Box = { e_media: 0, e_crop: 1, e_bleed: 2, e_trim: 3, e_art: 4, e_user_crop: 5 }),
          (d.Page.Rotate = { e_0: 0, e_90: 1, e_180: 2, e_270: 3 }),
          (d.Annot.EventType = {
            e_action_trigger_activate: 0,
            e_action_trigger_annot_enter: 1,
            e_action_trigger_annot_exit: 2,
            e_action_trigger_annot_down: 3,
            e_action_trigger_annot_up: 4,
            e_action_trigger_annot_focus: 5,
            e_action_trigger_annot_blur: 6,
            e_action_trigger_annot_page_open: 7,
            e_action_trigger_annot_page_close: 8,
            e_action_trigger_annot_page_visible: 9,
            e_action_trigger_annot_page_invisible: 10,
          }),
          (d.Annot.Type = {
            e_Text: 0,
            e_Link: 1,
            e_FreeText: 2,
            e_Line: 3,
            e_Square: 4,
            e_Circle: 5,
            e_Polygon: 6,
            e_Polyline: 7,
            e_Highlight: 8,
            e_Underline: 9,
            e_Squiggly: 10,
            e_StrikeOut: 11,
            e_Stamp: 12,
            e_Caret: 13,
            e_Ink: 14,
            e_Popup: 15,
            e_FileAttachment: 16,
            e_Sound: 17,
            e_Movie: 18,
            e_Widget: 19,
            e_Screen: 20,
            e_PrinterMark: 21,
            e_TrapNet: 22,
            e_Watermark: 23,
            e_3D: 24,
            e_Redact: 25,
            e_Projection: 26,
            e_RichMedia: 27,
            e_Unknown: 28,
          }),
          (d.Annot.Flag = {
            e_invisible: 0,
            e_hidden: 1,
            e_print: 2,
            e_no_zoom: 3,
            e_no_rotate: 4,
            e_no_view: 5,
            e_annot_read_only: 6,
            e_locked: 7,
            e_toggle_no_view: 8,
            e_locked_contents: 9,
          }),
          (d.AnnotBorderStyle.Style = {
            e_solid: 0,
            e_dashed: 1,
            e_beveled: 2,
            e_inset: 3,
            e_underline: 4,
          }),
          (d.Annot.State = { e_normal: 0, e_rollover: 1, e_down: 2 }),
          (d.LineAnnot.EndingStyle = {
            e_Square: 0,
            e_Circle: 1,
            e_Diamond: 2,
            e_OpenArrow: 3,
            e_ClosedArrow: 4,
            e_Butt: 5,
            e_ROpenArrow: 6,
            e_RClosedArrow: 7,
            e_Slash: 8,
            e_None: 9,
            e_Unknown: 10,
          }),
          (d.LineAnnot.IntentType = { e_LineArrow: 0, e_LineDimension: 1, e_null: 2 }),
          (d.LineAnnot.CapPos = { e_Inline: 0, e_Top: 1 }),
          (d.FileAttachmentAnnot.Icon = {
            e_Graph: 0,
            e_PushPin: 1,
            e_Paperclip: 2,
            e_Tag: 3,
            e_Unknown: 4,
          }),
          (d.FreeTextAnnot.IntentName = {
            e_FreeText: 0,
            e_FreeTextCallout: 1,
            e_FreeTextTypeWriter: 2,
            e_Unknown: 3,
          }),
          (d.LinkAnnot.HighlightingMode = { e_none: 0, e_invert: 1, e_outline: 2, e_push: 3 }),
          (d.MarkupAnnot.BorderEffect = { e_None: 0, e_Cloudy: 1 }),
          (d.PolyLineAnnot.IntentType = {
            e_PolygonCloud: 0,
            e_PolyLineDimension: 1,
            e_PolygonDimension: 2,
            e_Unknown: 3,
          }),
          (d.RedactionAnnot.QuadForm = {
            e_LeftJustified: 0,
            e_Centered: 1,
            e_RightJustified: 2,
            e_None: 3,
          }),
          (d.RubberStampAnnot.Icon = {
            e_Approved: 0,
            e_Experimental: 1,
            e_NotApproved: 2,
            e_AsIs: 3,
            e_Expired: 4,
            e_NotForPublicRelease: 5,
            e_Confidential: 6,
            e_Final: 7,
            e_Sold: 8,
            e_Departmental: 9,
            e_ForComment: 10,
            e_TopSecret: 11,
            e_ForPublicRelease: 12,
            e_Draft: 13,
            e_Unknown: 14,
          }),
          (d.ScreenAnnot.ScaleType = { e_Anamorphic: 0, e_Proportional: 1 }),
          (d.ScreenAnnot.ScaleCondition = {
            e_Always: 0,
            e_WhenBigger: 1,
            e_WhenSmaller: 2,
            e_Never: 3,
          }),
          (d.ScreenAnnot.IconCaptionRelation = {
            e_NoIcon: 0,
            e_NoCaption: 1,
            e_CBelowI: 2,
            e_CAboveI: 3,
            e_CRightILeft: 4,
            e_CLeftIRight: 5,
            e_COverlayI: 6,
          }),
          (d.SoundAnnot.Icon = { e_Speaker: 0, e_Mic: 1, e_Unknown: 2 }),
          (d.TextAnnot.Icon = {
            e_Comment: 0,
            e_Key: 1,
            e_Help: 2,
            e_NewParagraph: 3,
            e_Paragraph: 4,
            e_Insert: 5,
            e_Note: 6,
            e_Unknown: 7,
          }),
          (d.WidgetAnnot.HighlightingMode = {
            e_none: 0,
            e_invert: 1,
            e_outline: 2,
            e_push: 3,
            e_toggle: 4,
          }),
          (d.WidgetAnnot.ScaleType = { e_Anamorphic: 0, e_Proportional: 1 }),
          (d.WidgetAnnot.IconCaptionRelation = {
            e_NoIcon: 0,
            e_NoCaption: 1,
            e_CBelowI: 2,
            e_CAboveI: 3,
            e_CRightILeft: 4,
            e_CLeftIRight: 5,
            e_COverlayI: 6,
          }),
          (d.WidgetAnnot.ScaleCondition = {
            e_Always: 0,
            e_WhenBigger: 1,
            e_WhenSmaller: 2,
            e_Never: 3,
          }),
          (d.ColorSpace.Type = {
            e_device_gray: 0,
            e_device_rgb: 1,
            e_device_cmyk: 2,
            e_cal_gray: 3,
            e_cal_rgb: 4,
            e_lab: 5,
            e_icc: 6,
            e_indexed: 7,
            e_pattern: 8,
            e_separation: 9,
            e_device_n: 10,
            e_null: 11,
          }),
          (d.Convert.PrinterMode = {
            e_auto: 0,
            e_interop_only: 1,
            e_printer_only: 2,
            e_prefer_builtin_converter: 3,
          }),
          (d.Destination.FitType = {
            e_XYZ: 0,
            e_Fit: 1,
            e_FitH: 2,
            e_FitV: 3,
            e_FitR: 4,
            e_FitB: 5,
            e_FitBH: 6,
            e_FitBV: 7,
          }),
          (d.GState.Attribute = {
            e_transform: 0,
            e_rendering_intent: 1,
            e_stroke_cs: 2,
            e_stroke_color: 3,
            e_fill_cs: 4,
            e_fill_color: 5,
            e_line_width: 6,
            e_line_cap: 7,
            e_line_join: 8,
            e_flatness: 9,
            e_miter_limit: 10,
            e_dash_pattern: 11,
            e_char_spacing: 12,
            e_word_spacing: 13,
            e_horizontal_scale: 14,
            e_leading: 15,
            e_font: 16,
            e_font_size: 17,
            e_text_render_mode: 18,
            e_text_rise: 19,
            e_text_knockout: 20,
            e_text_pos_offset: 21,
            e_blend_mode: 22,
            e_opacity_fill: 23,
            e_opacity_stroke: 24,
            e_alpha_is_shape: 25,
            e_soft_mask: 26,
            e_smoothnes: 27,
            e_auto_stoke_adjust: 28,
            e_stroke_overprint: 29,
            e_fill_overprint: 30,
            e_overprint_mode: 31,
            e_transfer_funct: 32,
            e_BG_funct: 33,
            e_UCR_funct: 34,
            e_halftone: 35,
            e_null: 36,
          }),
          (d.GState.LineCap = { e_butt_cap: 0, e_round_cap: 1, e_square_cap: 2 }),
          (d.GState.LineJoin = { e_miter_join: 0, e_round_join: 1, e_bevel_join: 2 }),
          (d.GState.TextRenderingMode = {
            e_fill_text: 0,
            e_stroke_text: 1,
            e_fill_stroke_text: 2,
            e_invisible_text: 3,
            e_fill_clip_text: 4,
            e_stroke_clip_text: 5,
            e_fill_stroke_clip_text: 6,
            e_clip_text: 7,
          }),
          (d.GState.RenderingIntent = {
            e_absolute_colorimetric: 0,
            e_relative_colorimetric: 1,
            e_saturation: 2,
            e_perceptual: 3,
          }),
          (d.GState.BlendMode = {
            e_bl_compatible: 0,
            e_bl_normal: 1,
            e_bl_multiply: 2,
            e_bl_screen: 3,
            e_bl_difference: 4,
            e_bl_darken: 5,
            e_bl_lighten: 6,
            e_bl_color_dodge: 7,
            e_bl_color_burn: 8,
            e_bl_exclusion: 9,
            e_bl_hard_light: 10,
            e_bl_overlay: 11,
            e_bl_soft_light: 12,
            e_bl_luminosity: 13,
            e_bl_hue: 14,
            e_bl_saturation: 15,
            e_bl_color: 16,
          }),
          (d.Element.Type = {
            e_null: 0,
            e_path: 1,
            e_text_begin: 2,
            e_text: 3,
            e_text_new_line: 4,
            e_text_end: 5,
            e_image: 6,
            e_inline_image: 7,
            e_shading: 8,
            e_form: 9,
            e_group_begin: 10,
            e_group_end: 11,
            e_marked_content_begin: 12,
            e_marked_content_end: 13,
            e_marked_content_point: 14,
          }),
          (d.Element.PathSegmentType = {
            e_moveto: 1,
            e_lineto: 2,
            e_cubicto: 3,
            e_conicto: 4,
            e_rect: 5,
            e_closepath: 6,
          }),
          (d.ShapedText.ShapingStatus = { e_FullShaping: 0, e_PartialShaping: 1, e_NoShaping: 2 }),
          (d.ShapedText.FailureReason = {
            e_NoFailure: 0,
            e_UnsupportedFontType: 1,
            e_NotIndexEncoded: 2,
            e_FontDataNotFound: 3,
          }),
          (d.ElementWriter.WriteMode = { e_underlay: 0, e_overlay: 1, e_replacement: 2 }),
          (d.Flattener.Threshold = {
            e_very_strict: 0,
            e_strict: 1,
            e_default: 2,
            e_keep_most: 3,
            e_keep_all: 4,
          }),
          (d.Flattener.Mode = { e_simple: 0, e_fast: 1 }),
          (d.Font.StandardType1Font = {
            e_times_roman: 0,
            e_times_bold: 1,
            e_times_italic: 2,
            e_times_bold_italic: 3,
            e_helvetica: 4,
            e_helvetica_bold: 5,
            e_helvetica_oblique: 6,
            e_helvetica_bold_oblique: 7,
            e_courier: 8,
            e_courier_bold: 9,
            e_courier_oblique: 10,
            e_courier_bold_oblique: 11,
            e_symbol: 12,
            e_zapf_dingbats: 13,
            e_null: 14,
          }),
          (d.Font.Encoding = { e_IdentityH: 0, e_Indices: 1 }),
          (d.Font.Type = {
            e_Type1: 0,
            e_TrueType: 1,
            e_MMType1: 2,
            e_Type3: 3,
            e_Type0: 4,
            e_CIDType0: 5,
            e_CIDType2: 6,
          }),
          (d.Function.Type = { e_sampled: 0, e_exponential: 2, e_stitching: 3, e_postscript: 4 }),
          (d.Image.InputFilter = {
            e_none: 0,
            e_jpeg: 1,
            e_jp2: 2,
            e_flate: 3,
            e_g3: 4,
            e_g4: 5,
            e_ascii_hex: 6,
          }),
          (d.PageLabel.Style = {
            e_decimal: 0,
            e_roman_uppercase: 1,
            e_roman_lowercase: 2,
            e_alphabetic_uppercase: 3,
            e_alphabetic_lowercase: 4,
            e_none: 5,
          }),
          (d.PageSet.Filter = { e_all: 0, e_even: 1, e_odd: 2 }),
          (d.PatternColor.Type = {
            e_uncolored_tiling_pattern: 0,
            e_colored_tiling_pattern: 1,
            e_shading: 2,
            e_null: 3,
          }),
          (d.PatternColor.TilingType = {
            e_constant_spacing: 0,
            e_no_distortion: 1,
            e_constant_spacing_fast_fill: 2,
          }),
          (d.GeometryCollection.SnappingMode = {
            e_DefaultSnapMode: 14,
            e_PointOnLine: 1,
            e_LineMidpoint: 2,
            e_LineIntersection: 4,
            e_PathEndpoint: 8,
          }),
          (d.DigestAlgorithm.Type = {
            e_SHA1: 0,
            e_SHA256: 1,
            e_SHA384: 2,
            e_SHA512: 3,
            e_RIPEMD160: 4,
            e_unknown_digest_algorithm: 5,
          }),
          (d.ObjectIdentifier.Predefined = {
            e_commonName: 0,
            e_surname: 1,
            e_countryName: 2,
            e_localityName: 3,
            e_stateOrProvinceName: 4,
            e_streetAddress: 5,
            e_organizationName: 6,
            e_organizationalUnitName: 7,
            e_SHA1: 8,
            e_SHA256: 9,
            e_SHA384: 10,
            e_SHA512: 11,
            e_RIPEMD160: 12,
            e_RSA_encryption_PKCS1: 13,
          }),
          (d.DigitalSignatureField.SubFilterType = {
            e_adbe_x509_rsa_sha1: 0,
            e_adbe_pkcs7_detached: 1,
            e_adbe_pkcs7_sha1: 2,
            e_ETSI_CAdES_detached: 3,
            e_ETSI_RFC3161: 4,
            e_unknown: 5,
            e_absent: 6,
          }),
          (d.DigitalSignatureField.DocumentPermissions = {
            e_no_changes_allowed: 1,
            e_formfilling_signing_allowed: 2,
            e_annotating_formfilling_signing_allowed: 3,
            e_unrestricted: 4,
          }),
          (d.DigitalSignatureField.FieldPermissions = {
            e_lock_all: 0,
            e_include: 1,
            e_exclude: 2,
          }),
          (d.PDFDoc.EventType = {
            e_action_trigger_doc_will_close: 17,
            e_action_trigger_doc_will_save: 18,
            e_action_trigger_doc_did_save: 19,
            e_action_trigger_doc_will_print: 20,
            e_action_trigger_doc_did_print: 21,
          }),
          (d.PDFDoc.InsertFlag = { e_none: 0, e_insert_bookmark: 1 }),
          (d.PDFDoc.ExtractFlag = { e_forms_only: 0, e_annots_only: 1, e_both: 2 }),
          (d.PDFDoc.SignaturesVerificationStatus = {
            e_unsigned: 0,
            e_failure: 1,
            e_untrusted: 2,
            e_unsupported: 3,
            e_verified: 4,
          }),
          (d.PDFDocViewPrefs.PageMode = {
            e_UseNone: 0,
            e_UseThumbs: 1,
            e_UseBookmarks: 2,
            e_FullScreen: 3,
            e_UseOC: 4,
            e_UseAttachments: 5,
          }),
          (d.PDFDocViewPrefs.PageLayout = {
            e_Default: 0,
            e_SinglePage: 1,
            e_OneColumn: 2,
            e_TwoColumnLeft: 3,
            e_TwoColumnRight: 4,
            e_TwoPageLeft: 5,
            e_TwoPageRight: 6,
          }),
          (d.PDFDocViewPrefs.ViewerPref = {
            e_HideToolbar: 0,
            e_HideMenubar: 1,
            e_HideWindowUI: 2,
            e_FitWindow: 3,
            e_CenterWindow: 4,
            e_DisplayDocTitle: 5,
          }),
          (d.PDFRasterizer.Type = { e_BuiltIn: 0, e_GDIPlus: 1 }),
          (d.PDFRasterizer.OverprintPreviewMode = { e_op_off: 0, e_op_on: 1, e_op_pdfx_on: 2 }),
          (d.PDFRasterizer.ColorPostProcessMode = {
            e_postprocess_none: 0,
            e_postprocess_invert: 1,
            e_postprocess_gradient_map: 2,
            e_postprocess_night_mode: 3,
          }),
          (d.PDFDraw.PixelFormat = {
            e_rgba: 0,
            e_bgra: 1,
            e_rgb: 2,
            e_bgr: 3,
            e_gray: 4,
            e_gray_alpha: 5,
            e_cmyk: 6,
          }),
          (d.CMSType = { e_lcms: 0, e_icm: 1, e_no_cms: 2 }),
          (d.CharacterOrdering = {
            e_Identity: 0,
            e_Japan1: 1,
            e_Japan2: 2,
            e_GB1: 3,
            e_CNS1: 4,
            e_Korea1: 5,
          }),
          (d.LogLevel = {
            e_LogLevel_Off: -1,
            e_LogLevel_Fatal: 5,
            e_LogLevel_Error: 4,
            e_LogLevel_Warning: 3,
            e_LogLevel_Info: 2,
            e_LogLevel_Trace: 1,
            e_LogLevel_Debug: 0,
          }),
          (d.ConnectionErrorHandlingMode = {
            e_continue: 0,
            e_continue_unless_switching_to_demo: 1,
            e_stop: 2,
          }),
          (d.Shading.Type = {
            e_function_shading: 0,
            e_axial_shading: 1,
            e_radial_shading: 2,
            e_free_gouraud_shading: 3,
            e_lattice_gouraud_shading: 4,
            e_coons_shading: 5,
            e_tensor_shading: 6,
            e_null: 7,
          }),
          (d.Stamper.SizeType = { e_relative_scale: 1, e_absolute_size: 2, e_font_size: 3 }),
          (d.Stamper.TextAlignment = { e_align_left: -1, e_align_center: 0, e_align_right: 1 }),
          (d.Stamper.HorizontalAlignment = {
            e_horizontal_left: -1,
            e_horizontal_center: 0,
            e_horizontal_right: 1,
          }),
          (d.Stamper.VerticalAlignment = {
            e_vertical_bottom: -1,
            e_vertical_center: 0,
            e_vertical_top: 1,
          }),
          (d.TextExtractor.ProcessingFlags = {
            e_no_ligature_exp: 1,
            e_no_dup_remove: 2,
            e_punct_break: 4,
            e_remove_hidden_text: 8,
            e_no_invisible_text: 16,
            e_no_watermarks: 128,
            e_extract_using_zorder: 256,
          }),
          (d.TextExtractor.XMLOutputFlags = {
            e_words_as_elements: 1,
            e_output_bbox: 2,
            e_output_style_info: 4,
          }),
          (d.TextSearch.ResultCode = { e_done: 0, e_page: 1, e_found: 2 }),
          (d.TextSearch.Mode = {
            e_reg_expression: 1,
            e_case_sensitive: 2,
            e_whole_word: 4,
            e_search_up: 8,
            e_page_stop: 16,
            e_highlight: 32,
            e_ambient_string: 64,
          }),
          (d.Obj.Type = {
            e_null: 0,
            e_bool: 1,
            e_number: 2,
            e_name: 3,
            e_string: 4,
            e_dict: 5,
            e_array: 6,
            e_stream: 7,
          }),
          (d.SDFDoc.SaveOptions = {
            e_incremental: 1,
            e_remove_unused: 2,
            e_hex_strings: 4,
            e_omit_xref: 8,
            e_linearized: 16,
            e_compatibility: 32,
          }),
          (d.SecurityHandler.Permission = {
            e_owner: 1,
            e_doc_open: 2,
            e_doc_modify: 3,
            e_print: 4,
            e_print_high: 5,
            e_extract_content: 6,
            e_mod_annot: 7,
            e_fill_forms: 8,
            e_access_support: 9,
            e_assemble_doc: 10,
          }),
          (d.SecurityHandler.AlgorithmType = { e_RC4_40: 1, e_RC4_128: 2, e_AES: 3, e_AES_256: 4 }),
          (d.VerificationOptions.SecurityLevel = {
            e_compatibility_and_archiving: 0,
            e_maximum: 1,
          }),
          (d.VerificationOptions.TimeMode = { e_signing: 0, e_timestamp: 1, e_current: 2 }),
          (d.VerificationOptions.CertificateTrustFlag = {
            e_signing_trust: 1,
            e_certification_trust: 2,
            e_dynamic_content: 4,
            e_javascript: 16,
            e_identity: 32,
            e_trust_anchor: 64,
            e_default_trust: 97,
            e_complete_trust: 119,
          }),
          (d.VerificationResult.DocumentStatus = {
            e_no_error: 0,
            e_corrupt_file: 1,
            e_unsigned: 2,
            e_bad_byteranges: 3,
            e_corrupt_cryptographic_contents: 4,
          }),
          (d.VerificationResult.DigestStatus = {
            e_digest_invalid: 0,
            e_digest_verified: 1,
            e_digest_verification_disabled: 2,
            e_weak_digest_algorithm_but_digest_verifiable: 3,
            e_no_digest_status: 4,
            e_unsupported_encoding: 5,
          }),
          (d.VerificationResult.TrustStatus = {
            e_trust_verified: 0,
            e_untrusted: 1,
            e_trust_verification_disabled: 2,
            e_no_trust_status: 3,
          }),
          (d.VerificationResult.ModificationPermissionsStatus = {
            e_invalidated_by_disallowed_changes: 0,
            e_has_allowed_changes: 1,
            e_unmodified: 2,
            e_permissions_verification_disabled: 3,
            e_no_permissions_status: 4,
          }),
          (d.DisallowedChange.Type = {
            e_form_filled: 0,
            e_digital_signature_signed: 1,
            e_page_template_instantiated: 2,
            e_annotation_created_or_updated_or_deleted: 3,
            e_other: 4,
            e_unknown: 5,
          }),
          (d.Iterator.prototype.hasNext = function () {
            return d.sendWithPromise("Iterator.hasNext", { itr: this.id })
          }),
          (d.Iterator.prototype.next = function () {
            return d.sendWithPromise("Iterator.next", { itr: this.id })
          }),
          (d.DictIterator.prototype.hasNext = function () {
            return d.sendWithPromise("DictIterator.hasNext", { itr: this.id })
          }),
          (d.DictIterator.prototype.key = function () {
            return d.sendWithPromise("DictIterator.key", { itr: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.DictIterator.prototype.value = function () {
            return d.sendWithPromise("DictIterator.value", { itr: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.DictIterator.prototype.next = function () {
            return d.sendWithPromise("DictIterator.next", { itr: this.id })
          }),
          (d.Matrix2D.prototype.copy = function () {
            return (
              u("copy", this.yieldFunction),
              d.sendWithPromise("Matrix2D.copy", { m: this }).then(function (e) {
                return new d.Matrix2D(e)
              })
            )
          }),
          (d.Matrix2D.prototype.set = function (e, t, n, i, r, o) {
            h(arguments.length, 6, "set", "(number, number, number, number, number, number)", [
              [e, "number"],
              [t, "number"],
              [n, "number"],
              [i, "number"],
              [r, "number"],
              [o, "number"],
            ]),
              u("set", this.yieldFunction)
            var s = this
            return (
              (this.yieldFunction = "Matrix2D.set"),
              d
                .sendWithPromise("Matrix2D.set", {
                  matrix: this,
                  a: e,
                  b: t,
                  c: n,
                  d: i,
                  h: r,
                  v: o,
                })
                .then(function (e) {
                  ;(s.yieldFunction = void 0), m(e, s)
                })
            )
          }),
          (d.Matrix2D.prototype.concat = function (e, t, n, i, r, o) {
            h(arguments.length, 6, "concat", "(number, number, number, number, number, number)", [
              [e, "number"],
              [t, "number"],
              [n, "number"],
              [i, "number"],
              [r, "number"],
              [o, "number"],
            ]),
              u("concat", this.yieldFunction)
            var s = this
            return (
              (this.yieldFunction = "Matrix2D.concat"),
              d
                .sendWithPromise("Matrix2D.concat", {
                  matrix: this,
                  a: e,
                  b: t,
                  c: n,
                  d: i,
                  h: r,
                  v: o,
                })
                .then(function (e) {
                  ;(s.yieldFunction = void 0), m(e, s)
                })
            )
          }),
          (d.Matrix2D.prototype.equals = function (e) {
            return (
              h(arguments.length, 1, "equals", "(PDFNet.Matrix2D)", [
                [e, "Structure", d.Matrix2D, "Matrix2D"],
              ]),
              u("equals", this.yieldFunction),
              l("equals", [[e, 0]]),
              d.sendWithPromise("Matrix2D.equals", { m1: this, m2: e })
            )
          }),
          (d.Matrix2D.prototype.inverse = function () {
            return (
              u("inverse", this.yieldFunction),
              d.sendWithPromise("Matrix2D.inverse", { matrix: this }).then(function (e) {
                return new d.Matrix2D(e)
              })
            )
          }),
          (d.Matrix2D.prototype.translate = function (e, t) {
            h(arguments.length, 2, "translate", "(number, number)", [
              [e, "number"],
              [t, "number"],
            ]),
              u("translate", this.yieldFunction)
            var n = this
            return (
              (this.yieldFunction = "Matrix2D.translate"),
              d
                .sendWithPromise("Matrix2D.translate", { matrix: this, h: e, v: t })
                .then(function (e) {
                  ;(n.yieldFunction = void 0), m(e, n)
                })
            )
          }),
          (d.Matrix2D.prototype.preTranslate = function (e, t) {
            h(arguments.length, 2, "preTranslate", "(number, number)", [
              [e, "number"],
              [t, "number"],
            ]),
              u("preTranslate", this.yieldFunction)
            var n = this
            return (
              (this.yieldFunction = "Matrix2D.preTranslate"),
              d
                .sendWithPromise("Matrix2D.preTranslate", { matrix: this, h: e, v: t })
                .then(function (e) {
                  ;(n.yieldFunction = void 0), m(e, n)
                })
            )
          }),
          (d.Matrix2D.prototype.postTranslate = function (e, t) {
            h(arguments.length, 2, "postTranslate", "(number, number)", [
              [e, "number"],
              [t, "number"],
            ]),
              u("postTranslate", this.yieldFunction)
            var n = this
            return (
              (this.yieldFunction = "Matrix2D.postTranslate"),
              d
                .sendWithPromise("Matrix2D.postTranslate", { matrix: this, h: e, v: t })
                .then(function (e) {
                  ;(n.yieldFunction = void 0), m(e, n)
                })
            )
          }),
          (d.Matrix2D.prototype.scale = function (e, t) {
            h(arguments.length, 2, "scale", "(number, number)", [
              [e, "number"],
              [t, "number"],
            ]),
              u("scale", this.yieldFunction)
            var n = this
            return (
              (this.yieldFunction = "Matrix2D.scale"),
              d.sendWithPromise("Matrix2D.scale", { matrix: this, h: e, v: t }).then(function (e) {
                ;(n.yieldFunction = void 0), m(e, n)
              })
            )
          }),
          (d.Matrix2D.createZeroMatrix = function () {
            return d.sendWithPromise("matrix2DCreateZeroMatrix", {}).then(function (e) {
              return new d.Matrix2D(e)
            })
          }),
          (d.Matrix2D.createIdentityMatrix = function () {
            return d.sendWithPromise("matrix2DCreateIdentityMatrix", {}).then(function (e) {
              return new d.Matrix2D(e)
            })
          }),
          (d.Matrix2D.createRotationMatrix = function (e) {
            return (
              h(arguments.length, 1, "createRotationMatrix", "(number)", [[e, "number"]]),
              d.sendWithPromise("matrix2DCreateRotationMatrix", { angle: e }).then(function (e) {
                return new d.Matrix2D(e)
              })
            )
          }),
          (d.Matrix2D.prototype.multiply = function (e) {
            h(arguments.length, 1, "multiply", "(PDFNet.Matrix2D)", [
              [e, "Structure", d.Matrix2D, "Matrix2D"],
            ]),
              u("multiply", this.yieldFunction),
              l("multiply", [[e, 0]])
            var t = this
            return (
              (this.yieldFunction = "Matrix2D.multiply"),
              d.sendWithPromise("Matrix2D.multiply", { matrix: this, m: e }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.Field.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("fieldCreate", { field_dict: e.id }).then(function (e) {
                return new d.Field(e)
              })
            )
          }),
          (d.Field.prototype.isValid = function () {
            return (
              u("isValid", this.yieldFunction), d.sendWithPromise("Field.isValid", { field: this })
            )
          }),
          (d.Field.prototype.getType = function () {
            return (
              u("getType", this.yieldFunction), d.sendWithPromise("Field.getType", { field: this })
            )
          }),
          (d.Field.prototype.getValue = function () {
            return (
              u("getValue", this.yieldFunction),
              d.sendWithPromise("Field.getValue", { field: this }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Field.prototype.getValueAsString = function () {
            return (
              u("getValueAsString", this.yieldFunction),
              d.sendWithPromise("Field.getValueAsString", { field: this })
            )
          }),
          (d.Field.prototype.getDefaultValueAsString = function () {
            return (
              u("getDefaultValueAsString", this.yieldFunction),
              d.sendWithPromise("Field.getDefaultValueAsString", { field: this })
            )
          }),
          (d.Field.prototype.setValueAsString = function (e) {
            h(arguments.length, 1, "setValueAsString", "(string)", [[e, "string"]]),
              u("setValueAsString", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Field.setValueAsString"),
              d
                .sendWithPromise("Field.setValueAsString", { field: this, value: e })
                .then(function (e) {
                  return (
                    (t.yieldFunction = void 0),
                    (e.result = o(d.ViewChangeCollection, e.result)),
                    m(e.field, t),
                    e.result
                  )
                })
            )
          }),
          (d.Field.prototype.setValue = function (e) {
            h(arguments.length, 1, "setValue", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              u("setValue", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Field.setValue"),
              d.sendWithPromise("Field.setValue", { field: this, value: e.id }).then(function (e) {
                return (
                  (t.yieldFunction = void 0),
                  (e.result = o(d.ViewChangeCollection, e.result)),
                  m(e.field, t),
                  e.result
                )
              })
            )
          }),
          (d.Field.prototype.setValueAsBool = function (e) {
            h(arguments.length, 1, "setValueAsBool", "(boolean)", [[e, "boolean"]]),
              u("setValueAsBool", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Field.setValueAsBool"),
              d
                .sendWithPromise("Field.setValueAsBool", { field: this, value: e })
                .then(function (e) {
                  return (
                    (t.yieldFunction = void 0),
                    (e.result = o(d.ViewChangeCollection, e.result)),
                    m(e.field, t),
                    e.result
                  )
                })
            )
          }),
          (d.Field.prototype.getTriggerAction = function (e) {
            return (
              h(arguments.length, 1, "getTriggerAction", "(number)", [[e, "number"]]),
              u("getTriggerAction", this.yieldFunction),
              d
                .sendWithPromise("Field.getTriggerAction", { field: this, trigger: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Field.prototype.getValueAsBool = function () {
            return (
              u("getValueAsBool", this.yieldFunction),
              d.sendWithPromise("Field.getValueAsBool", { field: this })
            )
          }),
          (d.Field.prototype.refreshAppearance = function () {
            u("refreshAppearance", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Field.refreshAppearance"),
              d.sendWithPromise("Field.refreshAppearance", { field: this }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.Field.prototype.eraseAppearance = function () {
            u("eraseAppearance", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Field.eraseAppearance"),
              d.sendWithPromise("Field.eraseAppearance", { field: this }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.Field.prototype.getDefaultValue = function () {
            return (
              u("getDefaultValue", this.yieldFunction),
              d.sendWithPromise("Field.getDefaultValue", { field: this }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Field.prototype.getName = function () {
            return (
              u("getName", this.yieldFunction), d.sendWithPromise("Field.getName", { field: this })
            )
          }),
          (d.Field.prototype.getPartialName = function () {
            return (
              u("getPartialName", this.yieldFunction),
              d.sendWithPromise("Field.getPartialName", { field: this })
            )
          }),
          (d.Field.prototype.rename = function (e) {
            h(arguments.length, 1, "rename", "(string)", [[e, "string"]]),
              u("rename", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Field.rename"),
              d.sendWithPromise("Field.rename", { field: this, field_name: e }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.Field.prototype.isAnnot = function () {
            return (
              u("isAnnot", this.yieldFunction), d.sendWithPromise("Field.isAnnot", { field: this })
            )
          }),
          (d.Field.prototype.useSignatureHandler = function (e) {
            h(arguments.length, 1, "useSignatureHandler", "(number)", [[e, "number"]]),
              u("useSignatureHandler", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Field.useSignatureHandler"),
              d
                .sendWithPromise("Field.useSignatureHandler", {
                  field: this,
                  signature_handler_id: e,
                })
                .then(function (e) {
                  return (
                    (t.yieldFunction = void 0),
                    (e.result = p(d.Obj, e.result)),
                    m(e.field, t),
                    e.result
                  )
                })
            )
          }),
          (d.Field.prototype.getFlag = function (e) {
            return (
              h(arguments.length, 1, "getFlag", "(number)", [[e, "number"]]),
              u("getFlag", this.yieldFunction),
              d.sendWithPromise("Field.getFlag", { field: this, flag: e })
            )
          }),
          (d.Field.prototype.setFlag = function (e, t) {
            h(arguments.length, 2, "setFlag", "(number, boolean)", [
              [e, "number"],
              [t, "boolean"],
            ]),
              u("setFlag", this.yieldFunction)
            var n = this
            return (
              (this.yieldFunction = "Field.setFlag"),
              d
                .sendWithPromise("Field.setFlag", { field: this, flag: e, value: t })
                .then(function (e) {
                  ;(n.yieldFunction = void 0), m(e, n)
                })
            )
          }),
          (d.Field.prototype.getJustification = function () {
            u("getJustification", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Field.getJustification"),
              d.sendWithPromise("Field.getJustification", { field: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.field, t), e.result
              })
            )
          }),
          (d.Field.prototype.setJustification = function (e) {
            h(arguments.length, 1, "setJustification", "(number)", [[e, "number"]]),
              u("setJustification", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Field.setJustification"),
              d.sendWithPromise("Field.setJustification", { field: this, j: e }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.Field.prototype.setMaxLen = function (e) {
            h(arguments.length, 1, "setMaxLen", "(number)", [[e, "number"]]),
              u("setMaxLen", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Field.setMaxLen"),
              d.sendWithPromise("Field.setMaxLen", { field: this, max_len: e }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.Field.prototype.getMaxLen = function () {
            return (
              u("getMaxLen", this.yieldFunction),
              d.sendWithPromise("Field.getMaxLen", { field: this })
            )
          }),
          (d.Field.prototype.getDefaultAppearance = function () {
            u("getDefaultAppearance", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Field.getDefaultAppearance"),
              d.sendWithPromise("Field.getDefaultAppearance", { field: this }).then(function (e) {
                return (
                  (t.yieldFunction = void 0),
                  (e.result = p(d.GState, e.result)),
                  m(e.field, t),
                  e.result
                )
              })
            )
          }),
          (d.Field.prototype.getUpdateRect = function () {
            return (
              u("getUpdateRect", this.yieldFunction),
              d.sendWithPromise("Field.getUpdateRect", { field: this }).then(function (e) {
                return new d.Rect(e)
              })
            )
          }),
          (d.Field.prototype.flatten = function (e) {
            h(arguments.length, 1, "flatten", "(PDFNet.Page)", [[e, "Object", d.Page, "Page"]]),
              u("flatten", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Field.flatten"),
              d.sendWithPromise("Field.flatten", { field: this, page: e.id }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.Field.prototype.findInheritedAttribute = function (e) {
            return (
              h(arguments.length, 1, "findInheritedAttribute", "(string)", [[e, "string"]]),
              u("findInheritedAttribute", this.yieldFunction),
              d
                .sendWithPromise("Field.findInheritedAttribute", { field: this, attrib: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Field.prototype.getSDFObj = function () {
            return (
              u("getSDFObj", this.yieldFunction),
              d.sendWithPromise("Field.getSDFObj", { field: this }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Field.prototype.getOptCount = function () {
            return (
              u("getOptCount", this.yieldFunction),
              d.sendWithPromise("Field.getOptCount", { field: this })
            )
          }),
          (d.Field.prototype.getOpt = function (e) {
            return (
              h(arguments.length, 1, "getOpt", "(number)", [[e, "number"]]),
              u("getOpt", this.yieldFunction),
              d.sendWithPromise("Field.getOpt", { field: this, index: e })
            )
          }),
          (d.Field.prototype.isLockedByDigitalSignature = function () {
            return (
              u("isLockedByDigitalSignature", this.yieldFunction),
              d.sendWithPromise("Field.isLockedByDigitalSignature", { field: this })
            )
          }),
          (d.FDFDoc.create = function () {
            return d.sendWithPromise("fdfDocCreate", {}).then(function (e) {
              return o(d.FDFDoc, e)
            })
          }),
          (d.FDFDoc.createFromStream = function (e) {
            return (
              h(arguments.length, 1, "createFromStream", "(PDFNet.Filter)", [
                [e, "Object", d.Filter, "Filter"],
              ]),
              0 != e.id && O(e.id),
              d
                .sendWithPromise("fdfDocCreateFromStream", { no_own_stream: e.id })
                .then(function (e) {
                  return o(d.FDFDoc, e)
                })
            )
          }),
          (d.FDFDoc.createFromMemoryBuffer = function (e) {
            h(arguments.length, 1, "createFromMemoryBuffer", "(ArrayBuffer|TypedArray)", [
              [e, "ArrayBuffer"],
            ])
            var t = a(e, !1)
            return d.sendWithPromise("fdfDocCreateFromMemoryBuffer", { buf: t }).then(function (e) {
              return o(d.FDFDoc, e)
            })
          }),
          (d.FDFDoc.prototype.isModified = function () {
            return d.sendWithPromise("FDFDoc.isModified", { doc: this.id })
          }),
          (d.FDFDoc.prototype.saveMemoryBuffer = function () {
            return d
              .sendWithPromise("FDFDoc.saveMemoryBuffer", { doc: this.id })
              .then(function (e) {
                return new Uint8Array(e)
              })
          }),
          (d.FDFDoc.prototype.getTrailer = function () {
            return d.sendWithPromise("FDFDoc.getTrailer", { doc: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.FDFDoc.prototype.getRoot = function () {
            return d.sendWithPromise("FDFDoc.getRoot", { doc: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.FDFDoc.prototype.getFDF = function () {
            return d.sendWithPromise("FDFDoc.getFDF", { doc: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.FDFDoc.prototype.getPDFFileName = function () {
            return d.sendWithPromise("FDFDoc.getPDFFileName", { doc: this.id })
          }),
          (d.FDFDoc.prototype.setPDFFileName = function (e) {
            return (
              h(arguments.length, 1, "setPDFFileName", "(string)", [[e, "string"]]),
              d.sendWithPromise("FDFDoc.setPDFFileName", { doc: this.id, filepath: e })
            )
          }),
          (d.FDFDoc.prototype.getID = function () {
            return d.sendWithPromise("FDFDoc.getID", { doc: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.FDFDoc.prototype.setID = function (e) {
            return (
              h(arguments.length, 1, "setID", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("FDFDoc.setID", { doc: this.id, id: e.id })
            )
          }),
          (d.FDFDoc.prototype.getFieldIteratorBegin = function () {
            return d
              .sendWithPromise("FDFDoc.getFieldIteratorBegin", { doc: this.id })
              .then(function (e) {
                return o(d.Iterator, e, "FDFField")
              })
          }),
          (d.FDFDoc.prototype.getFieldIterator = function (e) {
            return (
              h(arguments.length, 1, "getFieldIterator", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("FDFDoc.getFieldIterator", { doc: this.id, field_name: e })
                .then(function (e) {
                  return o(d.Iterator, e, "FDFField")
                })
            )
          }),
          (d.FDFDoc.prototype.getField = function (e) {
            return (
              h(arguments.length, 1, "getField", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("FDFDoc.getField", { doc: this.id, field_name: e })
                .then(function (e) {
                  return new d.FDFField(e)
                })
            )
          }),
          (d.FDFDoc.prototype.fieldCreate = function (e, t, n) {
            return (
              void 0 === n && (n = new d.Obj("0")),
              h(arguments.length, 2, "fieldCreate", "(string, number, PDFNet.Obj)", [
                [e, "string"],
                [t, "number"],
                [n, "Object", d.Obj, "Obj"],
              ]),
              d
                .sendWithPromise("FDFDoc.fieldCreate", {
                  doc: this.id,
                  field_name: e,
                  type: t,
                  field_value: n.id,
                })
                .then(function (e) {
                  return new d.FDFField(e)
                })
            )
          }),
          (d.FDFDoc.prototype.fieldCreateFromString = function (e, t, n) {
            return (
              h(arguments.length, 3, "fieldCreateFromString", "(string, number, string)", [
                [e, "string"],
                [t, "number"],
                [n, "string"],
              ]),
              d
                .sendWithPromise("FDFDoc.fieldCreateFromString", {
                  doc: this.id,
                  field_name: e,
                  type: t,
                  field_value: n,
                })
                .then(function (e) {
                  return new d.FDFField(e)
                })
            )
          }),
          (d.FDFDoc.prototype.getSDFDoc = function () {
            return d.sendWithPromise("FDFDoc.getSDFDoc", { doc: this.id }).then(function (e) {
              return p(d.SDFDoc, e)
            })
          }),
          (d.FDFDoc.createFromXFDF = function (e) {
            return (
              h(arguments.length, 1, "createFromXFDF", "(string)", [[e, "string"]]),
              d.sendWithPromise("fdfDocCreateFromXFDF", { file_name: e }).then(function (e) {
                return o(d.FDFDoc, e)
              })
            )
          }),
          (d.FDFDoc.prototype.saveAsXFDFWithOptions = function (e, t) {
            return (
              void 0 === t && (t = null),
              h(arguments.length, 1, "saveAsXFDFWithOptions", "(string, PDFNet.OptionBase)", [
                [e, "string"],
                [t, "OptionBase"],
              ]),
              l("saveAsXFDFWithOptions", [[t, 1]]),
              (t = t ? t.getJsonString() : "{}"),
              d.sendWithPromise("FDFDoc.saveAsXFDFWithOptions", {
                doc: this.id,
                filepath: e,
                opts: t,
              })
            )
          }),
          (d.FDFDoc.prototype.saveAsXFDFAsString = function () {
            return d.sendWithPromise("FDFDoc.saveAsXFDFAsString", { doc: this.id })
          }),
          (d.FDFDoc.prototype.saveAsXFDFAsStringWithOptions = function (e) {
            return (
              void 0 === e && (e = null),
              h(arguments.length, 0, "saveAsXFDFAsStringWithOptions", "(PDFNet.OptionBase)", [
                [e, "OptionBase"],
              ]),
              l("saveAsXFDFAsStringWithOptions", [[e, 0]]),
              (e = e ? e.getJsonString() : "{}"),
              d.sendWithPromise("FDFDoc.saveAsXFDFAsStringWithOptions", { doc: this.id, opts: e })
            )
          }),
          (d.FDFDoc.prototype.mergeAnnots = function (e, t) {
            return (
              void 0 === t && (t = ""),
              h(arguments.length, 1, "mergeAnnots", "(string, string)", [
                [e, "string"],
                [t, "string"],
              ]),
              d.sendWithPromise("FDFDoc.mergeAnnots", {
                doc: this.id,
                command_file: e,
                permitted_user: t,
              })
            )
          }),
          (d.FDFField.create = function (e, t) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              void 0 === t && (t = new d.Obj("0")),
              h(arguments.length, 0, "create", "(PDFNet.Obj, PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
                [t, "Object", d.Obj, "Obj"],
              ]),
              d
                .sendWithPromise("fdfFieldCreate", { field_dict: e.id, fdf_dict: t.id })
                .then(function (e) {
                  return new d.FDFField(e)
                })
            )
          }),
          (d.FDFField.prototype.getValue = function () {
            u("getValue", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "FDFField.getValue"),
              d.sendWithPromise("FDFField.getValue", { field: this }).then(function (e) {
                return (
                  (t.yieldFunction = void 0),
                  (e.result = p(d.Obj, e.result)),
                  m(e.field, t),
                  e.result
                )
              })
            )
          }),
          (d.FDFField.prototype.setValue = function (e) {
            h(arguments.length, 1, "setValue", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              u("setValue", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "FDFField.setValue"),
              d
                .sendWithPromise("FDFField.setValue", { field: this, value: e.id })
                .then(function (e) {
                  ;(t.yieldFunction = void 0), m(e, t)
                })
            )
          }),
          (d.FDFField.prototype.getName = function () {
            u("getName", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "FDFField.getName"),
              d.sendWithPromise("FDFField.getName", { field: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.field, t), e.result
              })
            )
          }),
          (d.FDFField.prototype.getPartialName = function () {
            u("getPartialName", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "FDFField.getPartialName"),
              d.sendWithPromise("FDFField.getPartialName", { field: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.field, t), e.result
              })
            )
          }),
          (d.FDFField.prototype.getSDFObj = function () {
            return (
              u("getSDFObj", this.yieldFunction),
              d.sendWithPromise("FDFField.getSDFObj", { field: this }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.FDFField.prototype.findAttribute = function (e) {
            return (
              h(arguments.length, 1, "findAttribute", "(string)", [[e, "string"]]),
              u("findAttribute", this.yieldFunction),
              d
                .sendWithPromise("FDFField.findAttribute", { field: this, attrib: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Filter.prototype.createASCII85Encode = function (e, t) {
            return (
              h(arguments.length, 2, "createASCII85Encode", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("Filter.createASCII85Encode", {
                  no_own_input_filter: this.id,
                  line_width: e,
                  buf_sz: t,
                })
                .then(function (e) {
                  return o(d.Filter, e)
                })
            )
          }),
          (d.Filter.createMemoryFilter = function (e, t) {
            return (
              h(arguments.length, 2, "createMemoryFilter", "(number, boolean)", [
                [e, "number"],
                [t, "boolean"],
              ]),
              d
                .sendWithPromise("filterCreateMemoryFilter", { buf_sz: e, is_input: t })
                .then(function (e) {
                  return o(d.Filter, e)
                })
            )
          }),
          (d.Filter.createImage2RGBFromElement = function (e) {
            return (
              h(arguments.length, 1, "createImage2RGBFromElement", "(PDFNet.Element)", [
                [e, "Object", d.Element, "Element"],
              ]),
              d
                .sendWithPromise("filterCreateImage2RGBFromElement", { elem: e.id })
                .then(function (e) {
                  return o(d.Filter, e)
                })
            )
          }),
          (d.Filter.createImage2RGBFromObj = function (e) {
            return (
              h(arguments.length, 1, "createImage2RGBFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("filterCreateImage2RGBFromObj", { obj: e.id }).then(function (e) {
                return o(d.Filter, e)
              })
            )
          }),
          (d.Filter.createImage2RGB = function (e) {
            return (
              h(arguments.length, 1, "createImage2RGB", "(PDFNet.Image)", [
                [e, "Object", d.Image, "Image"],
              ]),
              d.sendWithPromise("filterCreateImage2RGB", { img: e.id }).then(function (e) {
                return o(d.Filter, e)
              })
            )
          }),
          (d.Filter.createImage2RGBAFromElement = function (e, t) {
            return (
              h(arguments.length, 2, "createImage2RGBAFromElement", "(PDFNet.Element, boolean)", [
                [e, "Object", d.Element, "Element"],
                [t, "boolean"],
              ]),
              d
                .sendWithPromise("filterCreateImage2RGBAFromElement", {
                  elem: e.id,
                  premultiply: t,
                })
                .then(function (e) {
                  return o(d.Filter, e)
                })
            )
          }),
          (d.Filter.createImage2RGBAFromObj = function (e, t) {
            return (
              h(arguments.length, 2, "createImage2RGBAFromObj", "(PDFNet.Obj, boolean)", [
                [e, "Object", d.Obj, "Obj"],
                [t, "boolean"],
              ]),
              d
                .sendWithPromise("filterCreateImage2RGBAFromObj", { obj: e.id, premultiply: t })
                .then(function (e) {
                  return o(d.Filter, e)
                })
            )
          }),
          (d.Filter.createImage2RGBA = function (e, t) {
            return (
              h(arguments.length, 2, "createImage2RGBA", "(PDFNet.Image, boolean)", [
                [e, "Object", d.Image, "Image"],
                [t, "boolean"],
              ]),
              d
                .sendWithPromise("filterCreateImage2RGBA", { img: e.id, premultiply: t })
                .then(function (e) {
                  return o(d.Filter, e)
                })
            )
          }),
          (d.Filter.prototype.attachFilter = function (e) {
            return (
              h(arguments.length, 1, "attachFilter", "(PDFNet.Filter)", [
                [e, "Object", d.Filter, "Filter"],
              ]),
              0 != e.id && O(e.id),
              d.sendWithPromise("Filter.attachFilter", {
                filter: this.id,
                no_own_attach_filter: e.id,
              })
            )
          }),
          (d.Filter.prototype.releaseAttachedFilter = function () {
            return d
              .sendWithPromise("Filter.releaseAttachedFilter", { filter: this.id })
              .then(function (e) {
                return o(d.Filter, e)
              })
          }),
          (d.Filter.prototype.getAttachedFilter = function () {
            return d
              .sendWithPromise("Filter.getAttachedFilter", { filter: this.id })
              .then(function (e) {
                return p(d.Filter, e)
              })
          }),
          (d.Filter.prototype.getSourceFilter = function () {
            return d
              .sendWithPromise("Filter.getSourceFilter", { filter: this.id })
              .then(function (e) {
                return p(d.Filter, e)
              })
          }),
          (d.Filter.prototype.getName = function () {
            return d.sendWithPromise("Filter.getName", { filter: this.id })
          }),
          (d.Filter.prototype.getDecodeName = function () {
            return d.sendWithPromise("Filter.getDecodeName", { filter: this.id })
          }),
          (d.Filter.prototype.begin = function () {
            return d.sendWithPromise("Filter.begin", { filter: this.id })
          }),
          (d.Filter.prototype.size = function () {
            return d.sendWithPromise("Filter.size", { filter: this.id })
          }),
          (d.Filter.prototype.consume = function (e) {
            return (
              h(arguments.length, 1, "consume", "(number)", [[e, "number"]]),
              d.sendWithPromise("Filter.consume", { filter: this.id, num_bytes: e })
            )
          }),
          (d.Filter.prototype.count = function () {
            return d.sendWithPromise("Filter.count", { filter: this.id })
          }),
          (d.Filter.prototype.setCount = function (e) {
            return (
              h(arguments.length, 1, "setCount", "(number)", [[e, "number"]]),
              d.sendWithPromise("Filter.setCount", { filter: this.id, new_count: e })
            )
          }),
          (d.Filter.prototype.setStreamLength = function (e) {
            return (
              h(arguments.length, 1, "setStreamLength", "(number)", [[e, "number"]]),
              d.sendWithPromise("Filter.setStreamLength", { filter: this.id, bytes: e })
            )
          }),
          (d.Filter.prototype.flush = function () {
            return d.sendWithPromise("Filter.flush", { filter: this.id })
          }),
          (d.Filter.prototype.flushAll = function () {
            return d.sendWithPromise("Filter.flushAll", { filter: this.id })
          }),
          (d.Filter.prototype.isInputFilter = function () {
            return d.sendWithPromise("Filter.isInputFilter", { filter: this.id })
          }),
          (d.Filter.prototype.canSeek = function () {
            return d.sendWithPromise("Filter.canSeek", { filter: this.id })
          }),
          (d.Filter.prototype.seek = function (e, t) {
            return (
              h(arguments.length, 2, "seek", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("Filter.seek", { filter: this.id, offset: e, origin: t })
            )
          }),
          (d.Filter.prototype.tell = function () {
            return d.sendWithPromise("Filter.tell", { filter: this.id })
          }),
          (d.Filter.prototype.createInputIterator = function () {
            return d
              .sendWithPromise("Filter.createInputIterator", { filter: this.id })
              .then(function (e) {
                return o(d.Filter, e)
              })
          }),
          (d.Filter.prototype.getFilePath = function () {
            return d.sendWithPromise("Filter.getFilePath", { filter: this.id })
          }),
          (d.Filter.prototype.memoryFilterGetBuffer = function () {
            return d.sendWithPromise("Filter.memoryFilterGetBuffer", { filter: this.id })
          }),
          (d.Filter.prototype.memoryFilterSetAsInputFilter = function () {
            return d.sendWithPromise("Filter.memoryFilterSetAsInputFilter", { filter: this.id })
          }),
          (d.Filter.prototype.memoryFilterReset = function () {
            return d.sendWithPromise("Filter.memoryFilterReset", { filter: this.id })
          }),
          (d.FilterReader.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(PDFNet.Filter)", [
                [e, "Object", d.Filter, "Filter"],
              ]),
              d.sendWithPromise("filterReaderCreate", { filter: e.id }).then(function (e) {
                return o(d.FilterReader, e)
              })
            )
          }),
          (d.FilterReader.prototype.attachFilter = function (e) {
            return (
              h(arguments.length, 1, "attachFilter", "(PDFNet.Filter)", [
                [e, "Object", d.Filter, "Filter"],
              ]),
              d.sendWithPromise("FilterReader.attachFilter", { reader: this.id, filter: e.id })
            )
          }),
          (d.FilterReader.prototype.getAttachedFilter = function () {
            return d
              .sendWithPromise("FilterReader.getAttachedFilter", { reader: this.id })
              .then(function (e) {
                return p(d.Filter, e)
              })
          }),
          (d.FilterReader.prototype.seek = function (e, t) {
            return (
              h(arguments.length, 2, "seek", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("FilterReader.seek", { reader: this.id, offset: e, origin: t })
            )
          }),
          (d.FilterReader.prototype.tell = function () {
            return d.sendWithPromise("FilterReader.tell", { reader: this.id })
          }),
          (d.FilterReader.prototype.count = function () {
            return d.sendWithPromise("FilterReader.count", { reader: this.id })
          }),
          (d.FilterReader.prototype.flush = function () {
            return d.sendWithPromise("FilterReader.flush", { reader: this.id })
          }),
          (d.FilterReader.prototype.flushAll = function () {
            return d.sendWithPromise("FilterReader.flushAll", { reader: this.id })
          }),
          (d.FilterReader.prototype.get = function () {
            return d.sendWithPromise("FilterReader.get", { reader: this.id })
          }),
          (d.FilterReader.prototype.peek = function () {
            return d.sendWithPromise("FilterReader.peek", { reader: this.id })
          }),
          (d.FilterWriter.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(PDFNet.Filter)", [
                [e, "Object", d.Filter, "Filter"],
              ]),
              d.sendWithPromise("filterWriterCreate", { filter: e.id }).then(function (e) {
                return o(d.FilterWriter, e)
              })
            )
          }),
          (d.FilterWriter.prototype.attachFilter = function (e) {
            return (
              h(arguments.length, 1, "attachFilter", "(PDFNet.Filter)", [
                [e, "Object", d.Filter, "Filter"],
              ]),
              d.sendWithPromise("FilterWriter.attachFilter", { writer: this.id, filter: e.id })
            )
          }),
          (d.FilterWriter.prototype.getAttachedFilter = function () {
            return d
              .sendWithPromise("FilterWriter.getAttachedFilter", { writer: this.id })
              .then(function (e) {
                return p(d.Filter, e)
              })
          }),
          (d.FilterWriter.prototype.seek = function (e, t) {
            return (
              h(arguments.length, 2, "seek", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("FilterWriter.seek", { writer: this.id, offset: e, origin: t })
            )
          }),
          (d.FilterWriter.prototype.tell = function () {
            return d.sendWithPromise("FilterWriter.tell", { writer: this.id })
          }),
          (d.FilterWriter.prototype.count = function () {
            return d.sendWithPromise("FilterWriter.count", { writer: this.id })
          }),
          (d.FilterWriter.prototype.flush = function () {
            return d.sendWithPromise("FilterWriter.flush", { writer: this.id })
          }),
          (d.FilterWriter.prototype.flushAll = function () {
            return d.sendWithPromise("FilterWriter.flushAll", { writer: this.id })
          }),
          (d.FilterWriter.prototype.writeUChar = function (e) {
            return (
              h(arguments.length, 1, "writeUChar", "(number)", [[e, "number"]]),
              d.sendWithPromise("FilterWriter.writeUChar", { writer: this.id, ch: e })
            )
          }),
          (d.FilterWriter.prototype.writeInt16 = function (e) {
            return (
              h(arguments.length, 1, "writeInt16", "(number)", [[e, "number"]]),
              d.sendWithPromise("FilterWriter.writeInt16", { writer: this.id, num: e })
            )
          }),
          (d.FilterWriter.prototype.writeUInt16 = function (e) {
            return (
              h(arguments.length, 1, "writeUInt16", "(number)", [[e, "number"]]),
              d.sendWithPromise("FilterWriter.writeUInt16", { writer: this.id, num: e })
            )
          }),
          (d.FilterWriter.prototype.writeInt32 = function (e) {
            return (
              h(arguments.length, 1, "writeInt32", "(number)", [[e, "number"]]),
              d.sendWithPromise("FilterWriter.writeInt32", { writer: this.id, num: e })
            )
          }),
          (d.FilterWriter.prototype.writeUInt32 = function (e) {
            return (
              h(arguments.length, 1, "writeUInt32", "(number)", [[e, "number"]]),
              d.sendWithPromise("FilterWriter.writeUInt32", { writer: this.id, num: e })
            )
          }),
          (d.FilterWriter.prototype.writeInt64 = function (e) {
            return (
              h(arguments.length, 1, "writeInt64", "(number)", [[e, "number"]]),
              d.sendWithPromise("FilterWriter.writeInt64", { writer: this.id, num: e })
            )
          }),
          (d.FilterWriter.prototype.writeUInt64 = function (e) {
            return (
              h(arguments.length, 1, "writeUInt64", "(number)", [[e, "number"]]),
              d.sendWithPromise("FilterWriter.writeUInt64", { writer: this.id, num: e })
            )
          }),
          (d.FilterWriter.prototype.writeString = function (e) {
            return (
              h(arguments.length, 1, "writeString", "(string)", [[e, "string"]]),
              d.sendWithPromise("FilterWriter.writeString", { writer: this.id, str: e })
            )
          }),
          (d.FilterWriter.prototype.writeFilter = function (e) {
            return (
              h(arguments.length, 1, "writeFilter", "(PDFNet.FilterReader)", [
                [e, "Object", d.FilterReader, "FilterReader"],
              ]),
              d.sendWithPromise("FilterWriter.writeFilter", { writer: this.id, reader: e.id })
            )
          }),
          (d.FilterWriter.prototype.writeLine = function (e, t) {
            return (
              void 0 === t && (t = 13),
              h(arguments.length, 1, "writeLine", "(string, number)", [
                [e, "const char* = 0"],
                [t, "number"],
              ]),
              d.sendWithPromise("FilterWriter.writeLine", { writer: this.id, line: e, eol: t })
            )
          }),
          (d.FilterWriter.prototype.writeBuffer = function (e) {
            h(arguments.length, 1, "writeBuffer", "(ArrayBuffer|TypedArray)", [[e, "ArrayBuffer"]])
            var t = a(e, !1)
            return d.sendWithPromise("FilterWriter.writeBuffer", { writer: this.id, buf: t })
          }),
          (d.OCG.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.PDFDoc, string)", [
                [e, "PDFDoc"],
                [t, "string"],
              ]),
              d.sendWithPromise("ocgCreate", { pdfdoc: e.id, name: t }).then(function (e) {
                return p(d.OCG, e)
              })
            )
          }),
          (d.OCG.createFromObj = function (e) {
            return (
              h(arguments.length, 1, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("ocgCreateFromObj", { ocg_dict: e.id }).then(function (e) {
                return p(d.OCG, e)
              })
            )
          }),
          (d.OCG.prototype.copy = function () {
            return d.sendWithPromise("OCG.copy", { ocg: this.id }).then(function (e) {
              return p(d.OCG, e)
            })
          }),
          (d.OCG.prototype.getSDFObj = function () {
            return d.sendWithPromise("OCG.getSDFObj", { ocg: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.OCG.prototype.isValid = function () {
            return d.sendWithPromise("OCG.isValid", { ocg: this.id })
          }),
          (d.OCG.prototype.getName = function () {
            return d.sendWithPromise("OCG.getName", { c: this.id })
          }),
          (d.OCG.prototype.setName = function (e) {
            return (
              h(arguments.length, 1, "setName", "(string)", [[e, "string"]]),
              d.sendWithPromise("OCG.setName", { c: this.id, value: e })
            )
          }),
          (d.OCG.prototype.getIntent = function () {
            return d.sendWithPromise("OCG.getIntent", { c: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.OCG.prototype.setIntent = function (e) {
            return (
              h(arguments.length, 1, "setIntent", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("OCG.setIntent", { c: this.id, value: e.id })
            )
          }),
          (d.OCG.prototype.hasUsage = function () {
            return d.sendWithPromise("OCG.hasUsage", { c: this.id })
          }),
          (d.OCG.prototype.getUsage = function (e) {
            return (
              h(arguments.length, 1, "getUsage", "(string)", [[e, "string"]]),
              d.sendWithPromise("OCG.getUsage", { c: this.id, key: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.OCG.prototype.getCurrentState = function (e) {
            return (
              h(arguments.length, 1, "getCurrentState", "(PDFNet.OCGContext)", [
                [e, "Object", d.OCGContext, "OCGContext"],
              ]),
              d.sendWithPromise("OCG.getCurrentState", { c: this.id, ctx: e.id })
            )
          }),
          (d.OCG.prototype.setCurrentState = function (e, t) {
            return (
              h(arguments.length, 2, "setCurrentState", "(PDFNet.OCGContext, boolean)", [
                [e, "Object", d.OCGContext, "OCGContext"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("OCG.setCurrentState", { c: this.id, ctx: e.id, state: t })
            )
          }),
          (d.OCG.prototype.getInitialState = function (e) {
            return (
              h(arguments.length, 1, "getInitialState", "(PDFNet.OCGConfig)", [
                [e, "Object", d.OCGConfig, "OCGConfig"],
              ]),
              d.sendWithPromise("OCG.getInitialState", { c: this.id, cfg: e.id })
            )
          }),
          (d.OCG.prototype.setInitialState = function (e, t) {
            return (
              h(arguments.length, 2, "setInitialState", "(PDFNet.OCGConfig, boolean)", [
                [e, "Object", d.OCGConfig, "OCGConfig"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("OCG.setInitialState", { c: this.id, cfg: e.id, state: t })
            )
          }),
          (d.OCG.prototype.isLocked = function (e) {
            return (
              h(arguments.length, 1, "isLocked", "(PDFNet.OCGConfig)", [
                [e, "Object", d.OCGConfig, "OCGConfig"],
              ]),
              d.sendWithPromise("OCG.isLocked", { c: this.id, cfg: e.id })
            )
          }),
          (d.OCG.prototype.setLocked = function (e, t) {
            return (
              h(arguments.length, 2, "setLocked", "(PDFNet.OCGConfig, boolean)", [
                [e, "Object", d.OCGConfig, "OCGConfig"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("OCG.setLocked", { c: this.id, cfg: e.id, state: t })
            )
          }),
          (d.OCGConfig.createFromObj = function (e) {
            return (
              h(arguments.length, 1, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("ocgConfigCreateFromObj", { dict: e.id }).then(function (e) {
                return p(d.OCGConfig, e)
              })
            )
          }),
          (d.OCGConfig.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.PDFDoc, boolean)", [
                [e, "PDFDoc"],
                [t, "boolean"],
              ]),
              d
                .sendWithPromise("ocgConfigCreate", { pdfdoc: e.id, default_config: t })
                .then(function (e) {
                  return p(d.OCGConfig, e)
                })
            )
          }),
          (d.OCGConfig.prototype.copy = function () {
            return d.sendWithPromise("OCGConfig.copy", { c: this.id }).then(function (e) {
              return p(d.OCGConfig, e)
            })
          }),
          (d.OCGConfig.prototype.getSDFObj = function () {
            return d.sendWithPromise("OCGConfig.getSDFObj", { c: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.OCGConfig.prototype.getOrder = function () {
            return d.sendWithPromise("OCGConfig.getOrder", { c: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.OCGConfig.prototype.setOrder = function (e) {
            return (
              h(arguments.length, 1, "setOrder", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("OCGConfig.setOrder", { c: this.id, value: e.id })
            )
          }),
          (d.OCGConfig.prototype.getName = function () {
            return d.sendWithPromise("OCGConfig.getName", { c: this.id })
          }),
          (d.OCGConfig.prototype.setName = function (e) {
            return (
              h(arguments.length, 1, "setName", "(string)", [[e, "string"]]),
              d.sendWithPromise("OCGConfig.setName", { c: this.id, value: e })
            )
          }),
          (d.OCGConfig.prototype.getCreator = function () {
            return d.sendWithPromise("OCGConfig.getCreator", { c: this.id })
          }),
          (d.OCGConfig.prototype.setCreator = function (e) {
            return (
              h(arguments.length, 1, "setCreator", "(string)", [[e, "string"]]),
              d.sendWithPromise("OCGConfig.setCreator", { c: this.id, value: e })
            )
          }),
          (d.OCGConfig.prototype.getInitBaseState = function () {
            return d.sendWithPromise("OCGConfig.getInitBaseState", { c: this.id })
          }),
          (d.OCGConfig.prototype.setInitBaseState = function (e) {
            return (
              void 0 === e && (e = "ON"),
              h(arguments.length, 0, "setInitBaseState", "(string)", [[e, "const char* = 0"]]),
              d.sendWithPromise("OCGConfig.setInitBaseState", { c: this.id, value: e })
            )
          }),
          (d.OCGConfig.prototype.getInitOnStates = function () {
            return d
              .sendWithPromise("OCGConfig.getInitOnStates", { c: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.OCGConfig.prototype.setInitOnStates = function (e) {
            return (
              h(arguments.length, 1, "setInitOnStates", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("OCGConfig.setInitOnStates", { c: this.id, value: e.id })
            )
          }),
          (d.OCGConfig.prototype.getInitOffStates = function () {
            return d
              .sendWithPromise("OCGConfig.getInitOffStates", { c: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.OCGConfig.prototype.setInitOffStates = function (e) {
            return (
              h(arguments.length, 1, "setInitOffStates", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("OCGConfig.setInitOffStates", { c: this.id, value: e.id })
            )
          }),
          (d.OCGConfig.prototype.getIntent = function () {
            return d.sendWithPromise("OCGConfig.getIntent", { c: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.OCGConfig.prototype.setIntent = function (e) {
            return (
              h(arguments.length, 1, "setIntent", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("OCGConfig.setIntent", { c: this.id, value: e.id })
            )
          }),
          (d.OCGConfig.prototype.getLockedOCGs = function () {
            return d.sendWithPromise("OCGConfig.getLockedOCGs", { c: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.OCGConfig.prototype.setLockedOCGs = function (e) {
            return (
              h(arguments.length, 1, "setLockedOCGs", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("OCGConfig.setLockedOCGs", { c: this.id, value: e.id })
            )
          }),
          (d.OCGContext.createFromConfig = function (e) {
            return (
              h(arguments.length, 1, "createFromConfig", "(PDFNet.OCGConfig)", [
                [e, "Object", d.OCGConfig, "OCGConfig"],
              ]),
              d.sendWithPromise("ocgContextCreateFromConfig", { cfg: e.id }).then(function (e) {
                return o(d.OCGContext, e)
              })
            )
          }),
          (d.OCGContext.prototype.copy = function () {
            return d.sendWithPromise("OCGContext.copy", { c: this.id }).then(function (e) {
              return o(d.OCGContext, e)
            })
          }),
          (d.OCGContext.prototype.getState = function (e) {
            return (
              h(arguments.length, 1, "getState", "(PDFNet.OCG)", [[e, "Object", d.OCG, "OCG"]]),
              d.sendWithPromise("OCGContext.getState", { c: this.id, grp: e.id })
            )
          }),
          (d.OCGContext.prototype.setState = function (e, t) {
            return (
              h(arguments.length, 2, "setState", "(PDFNet.OCG, boolean)", [
                [e, "Object", d.OCG, "OCG"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("OCGContext.setState", { c: this.id, grp: e.id, state: t })
            )
          }),
          (d.OCGContext.prototype.resetStates = function (e) {
            return (
              h(arguments.length, 1, "resetStates", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("OCGContext.resetStates", { c: this.id, all_on: e })
            )
          }),
          (d.OCGContext.prototype.setNonOCDrawing = function (e) {
            return (
              h(arguments.length, 1, "setNonOCDrawing", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("OCGContext.setNonOCDrawing", { c: this.id, draw_non_OC: e })
            )
          }),
          (d.OCGContext.prototype.getNonOCDrawing = function () {
            return d.sendWithPromise("OCGContext.getNonOCDrawing", { c: this.id })
          }),
          (d.OCGContext.prototype.setOCDrawMode = function (e) {
            return (
              h(arguments.length, 1, "setOCDrawMode", "(number)", [[e, "number"]]),
              d.sendWithPromise("OCGContext.setOCDrawMode", { c: this.id, oc_draw_mode: e })
            )
          }),
          (d.OCGContext.prototype.getOCMode = function () {
            return d.sendWithPromise("OCGContext.getOCMode", { c: this.id })
          }),
          (d.OCMD.createFromObj = function (e) {
            return (
              h(arguments.length, 1, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("ocmdCreateFromObj", { ocmd_dict: e.id }).then(function (e) {
                return p(d.OCMD, e)
              })
            )
          }),
          (d.OCMD.create = function (e, t, n) {
            return (
              h(arguments.length, 3, "create", "(PDFNet.PDFDoc, PDFNet.Obj, number)", [
                [e, "PDFDoc"],
                [t, "Object", d.Obj, "Obj"],
                [n, "number"],
              ]),
              d
                .sendWithPromise("ocmdCreate", { pdfdoc: e.id, ocgs: t.id, vis_policy: n })
                .then(function (e) {
                  return p(d.OCMD, e)
                })
            )
          }),
          (d.OCMD.prototype.copy = function () {
            return d.sendWithPromise("OCMD.copy", { ocmd: this.id }).then(function (e) {
              return p(d.OCMD, e)
            })
          }),
          (d.OCMD.prototype.getSDFObj = function () {
            return d.sendWithPromise("OCMD.getSDFObj", { ocmd: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.OCMD.prototype.getOCGs = function () {
            return d.sendWithPromise("OCMD.getOCGs", { ocmd: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.OCMD.prototype.getVisibilityExpression = function () {
            return d
              .sendWithPromise("OCMD.getVisibilityExpression", { ocmd: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.OCMD.prototype.isValid = function () {
            return d.sendWithPromise("OCMD.isValid", { ocmd: this.id })
          }),
          (d.OCMD.prototype.isCurrentlyVisible = function (e) {
            return (
              h(arguments.length, 1, "isCurrentlyVisible", "(PDFNet.OCGContext)", [
                [e, "Object", d.OCGContext, "OCGContext"],
              ]),
              d.sendWithPromise("OCMD.isCurrentlyVisible", { ocmd: this.id, ctx: e.id })
            )
          }),
          (d.OCMD.prototype.getVisibilityPolicy = function () {
            return d.sendWithPromise("OCMD.getVisibilityPolicy", { ocmd: this.id })
          }),
          (d.OCMD.prototype.setVisibilityPolicy = function (e) {
            return (
              h(arguments.length, 1, "setVisibilityPolicy", "(number)", [[e, "number"]]),
              d.sendWithPromise("OCMD.setVisibilityPolicy", { ocmd: this.id, vis_policy: e })
            )
          }),
          (d.PDFACompliance.prototype.getErrorCount = function () {
            return d.sendWithPromise("PDFACompliance.getErrorCount", { pdfac: this.id })
          }),
          (d.PDFACompliance.prototype.getError = function (e) {
            return (
              h(arguments.length, 1, "getError", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFACompliance.getError", { pdfac: this.id, idx: e })
            )
          }),
          (d.PDFACompliance.prototype.getRefObjCount = function (e) {
            return (
              h(arguments.length, 1, "getRefObjCount", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFACompliance.getRefObjCount", { pdfac: this.id, id: e })
            )
          }),
          (d.PDFACompliance.prototype.getRefObj = function (e, t) {
            return (
              h(arguments.length, 2, "getRefObj", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("PDFACompliance.getRefObj", { pdfac: this.id, id: e, err_idx: t })
            )
          }),
          (d.PDFACompliance.getPDFAErrorMessage = function (e) {
            return (
              h(arguments.length, 1, "getPDFAErrorMessage", "(number)", [[e, "number"]]),
              d.sendWithPromise("pdfaComplianceGetPDFAErrorMessage", { id: e })
            )
          }),
          (d.PDFACompliance.getDeclaredConformance = function (e) {
            return (
              h(arguments.length, 1, "getDeclaredConformance", "(PDFNet.PDFDoc)", [[e, "PDFDoc"]]),
              d.sendWithPromise("pdfaComplianceGetDeclaredConformance", { doc: e.id })
            )
          }),
          (d.PDFACompliance.prototype.saveAsFromBuffer = function (e) {
            return (
              void 0 === e && (e = !1),
              h(arguments.length, 0, "saveAsFromBuffer", "(boolean)", [[e, "boolean"]]),
              d
                .sendWithPromise("PDFACompliance.saveAsFromBuffer", {
                  pdfac: this.id,
                  linearized: e,
                })
                .then(function (e) {
                  return new Uint8Array(e)
                })
            )
          }),
          (d.AttrObj.create = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("attrObjCreate", { dict: e.id }).then(function (e) {
                return p(d.AttrObj, e)
              })
            )
          }),
          (d.AttrObj.prototype.copy = function () {
            return d.sendWithPromise("AttrObj.copy", { a: this.id }).then(function (e) {
              return p(d.AttrObj, e)
            })
          }),
          (d.AttrObj.prototype.getOwner = function () {
            return d.sendWithPromise("AttrObj.getOwner", { obj: this.id })
          }),
          (d.AttrObj.prototype.getSDFObj = function () {
            return d.sendWithPromise("AttrObj.getSDFObj", { obj: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.ClassMap.create = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("classMapCreate", { dict: e.id }).then(function (e) {
                return p(d.ClassMap, e)
              })
            )
          }),
          (d.ClassMap.prototype.copy = function () {
            return d.sendWithPromise("ClassMap.copy", { p: this.id }).then(function (e) {
              return p(d.ClassMap, e)
            })
          }),
          (d.ClassMap.prototype.isValid = function () {
            return d.sendWithPromise("ClassMap.isValid", { map: this.id })
          }),
          (d.ClassMap.prototype.getSDFObj = function () {
            return d.sendWithPromise("ClassMap.getSDFObj", { map: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.ContentItem.prototype.copy = function () {
            return (
              u("copy", this.yieldFunction),
              d.sendWithPromise("ContentItem.copy", { c: this }).then(function (e) {
                return new d.ContentItem(e)
              })
            )
          }),
          (d.ContentItem.prototype.getType = function () {
            return (
              u("getType", this.yieldFunction),
              d.sendWithPromise("ContentItem.getType", { item: this })
            )
          }),
          (d.ContentItem.prototype.getParent = function () {
            u("getParent", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "ContentItem.getParent"),
              d.sendWithPromise("ContentItem.getParent", { item: this }).then(function (e) {
                return (
                  (t.yieldFunction = void 0),
                  (e.result = new d.SElement(e.result)),
                  m(e.item, t),
                  e.result
                )
              })
            )
          }),
          (d.ContentItem.prototype.getPage = function () {
            u("getPage", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "ContentItem.getPage"),
              d.sendWithPromise("ContentItem.getPage", { item: this }).then(function (e) {
                return (
                  (t.yieldFunction = void 0),
                  (e.result = p(d.Page, e.result)),
                  m(e.item, t),
                  e.result
                )
              })
            )
          }),
          (d.ContentItem.prototype.getSDFObj = function () {
            return (
              u("getSDFObj", this.yieldFunction),
              d.sendWithPromise("ContentItem.getSDFObj", { item: this }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.ContentItem.prototype.getMCID = function () {
            return (
              u("getMCID", this.yieldFunction),
              d.sendWithPromise("ContentItem.getMCID", { item: this })
            )
          }),
          (d.ContentItem.prototype.getContainingStm = function () {
            return (
              u("getContainingStm", this.yieldFunction),
              d.sendWithPromise("ContentItem.getContainingStm", { item: this }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.ContentItem.prototype.getStmOwner = function () {
            return (
              u("getStmOwner", this.yieldFunction),
              d.sendWithPromise("ContentItem.getStmOwner", { item: this }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.ContentItem.prototype.getRefObj = function () {
            return (
              u("getRefObj", this.yieldFunction),
              d.sendWithPromise("ContentItem.getRefObj", { item: this }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.RoleMap.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("roleMapCreate", { dict: e.id }).then(function (e) {
                return p(d.RoleMap, e)
              })
            )
          }),
          (d.RoleMap.prototype.copy = function () {
            return d.sendWithPromise("RoleMap.copy", { p: this.id }).then(function (e) {
              return p(d.RoleMap, e)
            })
          }),
          (d.RoleMap.prototype.isValid = function () {
            return d.sendWithPromise("RoleMap.isValid", { map: this.id })
          }),
          (d.RoleMap.prototype.getDirectMap = function (e) {
            return (
              h(arguments.length, 1, "getDirectMap", "(string)", [[e, "string"]]),
              d.sendWithPromise("RoleMap.getDirectMap", { map: this.id, type: e })
            )
          }),
          (d.RoleMap.prototype.getSDFObj = function () {
            return d.sendWithPromise("RoleMap.getSDFObj", { map: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.SElement.create = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("sElementCreate", { dict: e.id }).then(function (e) {
                return new d.SElement(e)
              })
            )
          }),
          (d.SElement.createFromPDFDoc = function (e, t) {
            return (
              h(arguments.length, 2, "createFromPDFDoc", "(PDFNet.PDFDoc, string)", [
                [e, "PDFDoc"],
                [t, "string"],
              ]),
              d
                .sendWithPromise("sElementCreateFromPDFDoc", { doc: e.id, struct_type: t })
                .then(function (e) {
                  return new d.SElement(e)
                })
            )
          }),
          (d.SElement.prototype.insert = function (t, e) {
            h(arguments.length, 2, "insert", "(PDFNet.SElement, number)", [
              [t, "Structure", d.SElement, "SElement"],
              [e, "number"],
            ]),
              u("insert", this.yieldFunction),
              l("insert", [[t, 0]])
            var n = this
            return (
              (this.yieldFunction = "SElement.insert"),
              (t.yieldFunction = "SElement.insert"),
              d
                .sendWithPromise("SElement.insert", { e: this, kid: t, insert_before: e })
                .then(function (e) {
                  ;(n.yieldFunction = void 0), (t.yieldFunction = void 0), m(e.e, n), m(e.kid, t)
                })
            )
          }),
          (d.SElement.prototype.createContentItem = function (e, t, n) {
            void 0 === n && (n = -1),
              h(arguments.length, 2, "createContentItem", "(PDFNet.PDFDoc, PDFNet.Page, number)", [
                [e, "PDFDoc"],
                [t, "Object", d.Page, "Page"],
                [n, "number"],
              ]),
              u("createContentItem", this.yieldFunction)
            var i = this
            return (
              (this.yieldFunction = "SElement.createContentItem"),
              d
                .sendWithPromise("SElement.createContentItem", {
                  e: this,
                  doc: e.id,
                  page: t.id,
                  insert_before: n,
                })
                .then(function (e) {
                  return (i.yieldFunction = void 0), m(e.e, i), e.result
                })
            )
          }),
          (d.SElement.prototype.isValid = function () {
            return (
              u("isValid", this.yieldFunction), d.sendWithPromise("SElement.isValid", { e: this })
            )
          }),
          (d.SElement.prototype.getType = function () {
            return (
              u("getType", this.yieldFunction), d.sendWithPromise("SElement.getType", { e: this })
            )
          }),
          (d.SElement.prototype.getNumKids = function () {
            return (
              u("getNumKids", this.yieldFunction),
              d.sendWithPromise("SElement.getNumKids", { e: this })
            )
          }),
          (d.SElement.prototype.isContentItem = function (e) {
            return (
              h(arguments.length, 1, "isContentItem", "(number)", [[e, "number"]]),
              u("isContentItem", this.yieldFunction),
              d.sendWithPromise("SElement.isContentItem", { e: this, index: e })
            )
          }),
          (d.SElement.prototype.getAsContentItem = function (e) {
            return (
              h(arguments.length, 1, "getAsContentItem", "(number)", [[e, "number"]]),
              u("getAsContentItem", this.yieldFunction),
              d
                .sendWithPromise("SElement.getAsContentItem", { e: this, index: e })
                .then(function (e) {
                  return new d.ContentItem(e)
                })
            )
          }),
          (d.SElement.prototype.getAsStructElem = function (e) {
            return (
              h(arguments.length, 1, "getAsStructElem", "(number)", [[e, "number"]]),
              u("getAsStructElem", this.yieldFunction),
              d
                .sendWithPromise("SElement.getAsStructElem", { e: this, index: e })
                .then(function (e) {
                  return new d.SElement(e)
                })
            )
          }),
          (d.SElement.prototype.getParent = function () {
            return (
              u("getParent", this.yieldFunction),
              d.sendWithPromise("SElement.getParent", { e: this }).then(function (e) {
                return new d.SElement(e)
              })
            )
          }),
          (d.SElement.prototype.getStructTreeRoot = function () {
            return (
              u("getStructTreeRoot", this.yieldFunction),
              d.sendWithPromise("SElement.getStructTreeRoot", { e: this }).then(function (e) {
                return p(d.STree, e)
              })
            )
          }),
          (d.SElement.prototype.hasTitle = function () {
            return (
              u("hasTitle", this.yieldFunction), d.sendWithPromise("SElement.hasTitle", { e: this })
            )
          }),
          (d.SElement.prototype.getTitle = function () {
            return (
              u("getTitle", this.yieldFunction), d.sendWithPromise("SElement.getTitle", { e: this })
            )
          }),
          (d.SElement.prototype.getID = function () {
            return (
              u("getID", this.yieldFunction),
              d.sendWithPromise("SElement.getID", { e: this }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.SElement.prototype.hasActualText = function () {
            return (
              u("hasActualText", this.yieldFunction),
              d.sendWithPromise("SElement.hasActualText", { e: this })
            )
          }),
          (d.SElement.prototype.getActualText = function () {
            return (
              u("getActualText", this.yieldFunction),
              d.sendWithPromise("SElement.getActualText", { e: this })
            )
          }),
          (d.SElement.prototype.hasAlt = function () {
            return (
              u("hasAlt", this.yieldFunction), d.sendWithPromise("SElement.hasAlt", { e: this })
            )
          }),
          (d.SElement.prototype.getAlt = function () {
            return (
              u("getAlt", this.yieldFunction), d.sendWithPromise("SElement.getAlt", { e: this })
            )
          }),
          (d.SElement.prototype.getSDFObj = function () {
            return (
              u("getSDFObj", this.yieldFunction),
              d.sendWithPromise("SElement.getSDFObj", { e: this }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.STree.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("sTreeCreate", { struct_dict: e.id }).then(function (e) {
                return p(d.STree, e)
              })
            )
          }),
          (d.STree.createFromPDFDoc = function (e) {
            return (
              h(arguments.length, 1, "createFromPDFDoc", "(PDFNet.PDFDoc)", [[e, "PDFDoc"]]),
              d.sendWithPromise("sTreeCreateFromPDFDoc", { doc: e.id }).then(function (e) {
                return p(d.STree, e)
              })
            )
          }),
          (d.STree.prototype.insert = function (t, e) {
            return (
              h(arguments.length, 2, "insert", "(PDFNet.SElement, number)", [
                [t, "Structure", d.SElement, "SElement"],
                [e, "number"],
              ]),
              l("insert", [[t, 0]]),
              (t.yieldFunction = "STree.insert"),
              d
                .sendWithPromise("STree.insert", { tree: this.id, kid: t, insert_before: e })
                .then(function (e) {
                  ;(t.yieldFunction = void 0), m(e, t)
                })
            )
          }),
          (d.STree.prototype.copy = function () {
            return d.sendWithPromise("STree.copy", { c: this.id }).then(function (e) {
              return p(d.STree, e)
            })
          }),
          (d.STree.prototype.isValid = function () {
            return d.sendWithPromise("STree.isValid", { tree: this.id })
          }),
          (d.STree.prototype.getNumKids = function () {
            return d.sendWithPromise("STree.getNumKids", { tree: this.id })
          }),
          (d.STree.prototype.getKid = function (e) {
            return (
              h(arguments.length, 1, "getKid", "(number)", [[e, "number"]]),
              d.sendWithPromise("STree.getKid", { tree: this.id, index: e }).then(function (e) {
                return new d.SElement(e)
              })
            )
          }),
          (d.STree.prototype.getRoleMap = function () {
            return d.sendWithPromise("STree.getRoleMap", { tree: this.id }).then(function (e) {
              return p(d.RoleMap, e)
            })
          }),
          (d.STree.prototype.getClassMap = function () {
            return d.sendWithPromise("STree.getClassMap", { tree: this.id }).then(function (e) {
              return p(d.ClassMap, e)
            })
          }),
          (d.STree.prototype.getSDFObj = function () {
            return d.sendWithPromise("STree.getSDFObj", { tree: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Action.createGoto = function (e) {
            return (
              h(arguments.length, 1, "createGoto", "(PDFNet.Destination)", [
                [e, "Object", d.Destination, "Destination"],
              ]),
              d.sendWithPromise("actionCreateGoto", { dest: e.id }).then(function (e) {
                return p(d.Action, e)
              })
            )
          }),
          (d.Action.createGotoWithKey = function (e, t) {
            return (
              h(arguments.length, 2, "createGotoWithKey", "(string, PDFNet.Destination)", [
                [e, "string"],
                [t, "Object", d.Destination, "Destination"],
              ]),
              d
                .sendWithPromise("actionCreateGotoWithKey", { key: e, dest: t.id })
                .then(function (e) {
                  return p(d.Action, e)
                })
            )
          }),
          (d.Action.createGotoRemote = function (e, t) {
            return (
              h(arguments.length, 2, "createGotoRemote", "(PDFNet.FileSpec, number)", [
                [e, "Object", d.FileSpec, "FileSpec"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("actionCreateGotoRemote", { file: e.id, page_num: t })
                .then(function (e) {
                  return p(d.Action, e)
                })
            )
          }),
          (d.Action.createGotoRemoteSetNewWindow = function (e, t, n) {
            return (
              h(
                arguments.length,
                3,
                "createGotoRemoteSetNewWindow",
                "(PDFNet.FileSpec, number, boolean)",
                [
                  [e, "Object", d.FileSpec, "FileSpec"],
                  [t, "number"],
                  [n, "boolean"],
                ]
              ),
              d
                .sendWithPromise("actionCreateGotoRemoteSetNewWindow", {
                  file: e.id,
                  page_num: t,
                  new_window: n,
                })
                .then(function (e) {
                  return p(d.Action, e)
                })
            )
          }),
          (d.Action.createURI = function (e, t) {
            return (
              h(arguments.length, 2, "createURI", "(PDFNet.SDFDoc, string)", [
                [e, "SDFDoc"],
                [t, "string"],
              ]),
              d.sendWithPromise("actionCreateURI", { sdfdoc: e.id, uri: t }).then(function (e) {
                return p(d.Action, e)
              })
            )
          }),
          (d.Action.createURIWithUString = function (e, t) {
            return (
              h(arguments.length, 2, "createURIWithUString", "(PDFNet.SDFDoc, string)", [
                [e, "SDFDoc"],
                [t, "string"],
              ]),
              d
                .sendWithPromise("actionCreateURIWithUString", { sdfdoc: e.id, uri: t })
                .then(function (e) {
                  return p(d.Action, e)
                })
            )
          }),
          (d.Action.createSubmitForm = function (e) {
            return (
              h(arguments.length, 1, "createSubmitForm", "(PDFNet.FileSpec)", [
                [e, "Object", d.FileSpec, "FileSpec"],
              ]),
              d.sendWithPromise("actionCreateSubmitForm", { url: e.id }).then(function (e) {
                return p(d.Action, e)
              })
            )
          }),
          (d.Action.createLaunch = function (e, t) {
            return (
              h(arguments.length, 2, "createLaunch", "(PDFNet.SDFDoc, string)", [
                [e, "SDFDoc"],
                [t, "string"],
              ]),
              d.sendWithPromise("actionCreateLaunch", { sdfdoc: e.id, path: t }).then(function (e) {
                return p(d.Action, e)
              })
            )
          }),
          (d.Action.createHideField = function (e, t) {
            return (
              h(arguments.length, 2, "createHideField", "(PDFNet.SDFDoc, Array<string>)", [
                [e, "SDFDoc"],
                [t, "Array"],
              ]),
              d
                .sendWithPromise("actionCreateHideField", { sdfdoc: e.id, field_names_list: t })
                .then(function (e) {
                  return p(d.Action, e)
                })
            )
          }),
          (d.Action.createImportData = function (e, t) {
            return (
              h(arguments.length, 2, "createImportData", "(PDFNet.SDFDoc, string)", [
                [e, "SDFDoc"],
                [t, "string"],
              ]),
              d
                .sendWithPromise("actionCreateImportData", { sdfdoc: e.id, path: t })
                .then(function (e) {
                  return p(d.Action, e)
                })
            )
          })
        ;(d.Action.createResetForm = function (e) {
          return (
            h(arguments.length, 1, "createResetForm", "(PDFNet.SDFDoc)", [[e, "SDFDoc"]]),
            d.sendWithPromise("actionCreateResetForm", { sdfdoc: e.id }).then(function (e) {
              return p(d.Action, e)
            })
          )
        }),
          (d.Action.createJavaScript = function (e, t) {
            return (
              h(arguments.length, 2, "createJavaScript", "(PDFNet.SDFDoc, string)", [
                [e, "SDFDoc"],
                [t, "string"],
              ]),
              d
                .sendWithPromise("actionCreateJavaScript", { sdfdoc: e.id, script: t })
                .then(function (e) {
                  return p(d.Action, e)
                })
            )
          }),
          (d.Action.create = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("actionCreate", { in_obj: e.id }).then(function (e) {
                return p(d.Action, e)
              })
            )
          }),
          (d.Action.prototype.copy = function () {
            return d.sendWithPromise("Action.copy", { in_action: this.id }).then(function (e) {
              return p(d.Action, e)
            })
          }),
          (d.Action.prototype.compare = function (e) {
            return (
              h(arguments.length, 1, "compare", "(PDFNet.Action)", [
                [e, "Object", d.Action, "Action"],
              ]),
              d.sendWithPromise("Action.compare", { action: this.id, in_action: e.id })
            )
          }),
          (d.Action.prototype.isValid = function () {
            return d.sendWithPromise("Action.isValid", { action: this.id })
          }),
          (d.Action.prototype.getType = function () {
            return d.sendWithPromise("Action.getType", { action: this.id })
          }),
          (d.Action.prototype.getDest = function () {
            return d.sendWithPromise("Action.getDest", { action: this.id }).then(function (e) {
              return p(d.Destination, e)
            })
          }),
          (d.Action.prototype.getNext = function () {
            return d.sendWithPromise("Action.getNext", { action: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Action.prototype.getSDFObj = function () {
            return d.sendWithPromise("Action.getSDFObj", { action: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Action.prototype.getFormActionFlag = function (e) {
            return (
              h(arguments.length, 1, "getFormActionFlag", "(number)", [[e, "number"]]),
              d.sendWithPromise("Action.getFormActionFlag", { action: this.id, flag: e })
            )
          }),
          (d.Action.prototype.setFormActionFlag = function (e, t) {
            return (
              h(arguments.length, 2, "setFormActionFlag", "(number, boolean)", [
                [e, "number"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("Action.setFormActionFlag", { action: this.id, flag: e, value: t })
            )
          }),
          (d.Action.prototype.needsWriteLock = function () {
            return d.sendWithPromise("Action.needsWriteLock", { action: this.id })
          }),
          (d.Action.prototype.execute = function () {
            return d.sendWithPromise("Action.execute", { action: this.id })
          }),
          (d.Action.prototype.executeKeyStrokeAction = function (e) {
            return (
              h(arguments.length, 1, "executeKeyStrokeAction", "(PDFNet.KeyStrokeEventData)", [
                [e, "Object", d.KeyStrokeEventData, "KeyStrokeEventData"],
              ]),
              d
                .sendWithPromise("Action.executeKeyStrokeAction", { action: this.id, data: e.id })
                .then(function (e) {
                  return o(d.KeyStrokeActionResult, e)
                })
            )
          }),
          (d.KeyStrokeActionResult.prototype.isValid = function () {
            return d.sendWithPromise("KeyStrokeActionResult.isValid", { action_ret: this.id })
          }),
          (d.KeyStrokeActionResult.prototype.getText = function () {
            return d.sendWithPromise("KeyStrokeActionResult.getText", { action_ret: this.id })
          }),
          (d.KeyStrokeActionResult.prototype.copy = function () {
            return d
              .sendWithPromise("KeyStrokeActionResult.copy", { action_ret: this.id })
              .then(function (e) {
                return o(d.KeyStrokeActionResult, e)
              })
          }),
          (d.KeyStrokeEventData.create = function (e, t, n, i, r) {
            return (
              h(arguments.length, 5, "create", "(string, string, string, number, number)", [
                [e, "string"],
                [t, "string"],
                [n, "string"],
                [i, "number"],
                [r, "number"],
              ]),
              d
                .sendWithPromise("keyStrokeEventDataCreate", {
                  field_name: e,
                  current: t,
                  change: n,
                  selection_start: i,
                  selection_end: r,
                })
                .then(function (e) {
                  return o(d.KeyStrokeEventData, e)
                })
            )
          }),
          (d.KeyStrokeEventData.prototype.copy = function () {
            return d
              .sendWithPromise("KeyStrokeEventData.copy", { data: this.id })
              .then(function (e) {
                return o(d.KeyStrokeEventData, e)
              })
          }),
          (d.Page.create = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("pageCreate", { page_dict: e.id }).then(function (e) {
                return p(d.Page, e)
              })
            )
          }),
          (d.Page.prototype.copy = function () {
            return d.sendWithPromise("Page.copy", { p: this.id }).then(function (e) {
              return p(d.Page, e)
            })
          }),
          (d.Page.prototype.isValid = function () {
            return d.sendWithPromise("Page.isValid", { page: this.id })
          }),
          (d.Page.prototype.getIndex = function () {
            return d.sendWithPromise("Page.getIndex", { page: this.id })
          }),
          (d.Page.prototype.getTriggerAction = function (e) {
            return (
              h(arguments.length, 1, "getTriggerAction", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("Page.getTriggerAction", { page: this.id, trigger: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Page.prototype.getBox = function (e) {
            return (
              h(arguments.length, 1, "getBox", "(number)", [[e, "number"]]),
              d.sendWithPromise("Page.getBox", { page: this.id, type: e }).then(function (e) {
                return new d.Rect(e)
              })
            )
          }),
          (d.Page.prototype.setBox = function (e, t) {
            return (
              h(arguments.length, 2, "setBox", "(number, PDFNet.Rect)", [
                [e, "number"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("setBox", [[t, 1]]),
              d.sendWithPromise("Page.setBox", { page: this.id, type: e, box: t })
            )
          }),
          (d.Page.prototype.getCropBox = function () {
            return d.sendWithPromise("Page.getCropBox", { page: this.id }).then(function (e) {
              return new d.Rect(e)
            })
          }),
          (d.Page.prototype.setCropBox = function (e) {
            return (
              h(arguments.length, 1, "setCropBox", "(PDFNet.Rect)", [
                [e, "Structure", d.Rect, "Rect"],
              ]),
              l("setCropBox", [[e, 0]]),
              d.sendWithPromise("Page.setCropBox", { page: this.id, box: e })
            )
          }),
          (d.Page.prototype.getMediaBox = function () {
            return d.sendWithPromise("Page.getMediaBox", { page: this.id }).then(function (e) {
              return new d.Rect(e)
            })
          }),
          (d.Page.prototype.setMediaBox = function (e) {
            return (
              h(arguments.length, 1, "setMediaBox", "(PDFNet.Rect)", [
                [e, "Structure", d.Rect, "Rect"],
              ]),
              l("setMediaBox", [[e, 0]]),
              d.sendWithPromise("Page.setMediaBox", { page: this.id, box: e })
            )
          }),
          (d.Page.prototype.getVisibleContentBox = function () {
            return d
              .sendWithPromise("Page.getVisibleContentBox", { page: this.id })
              .then(function (e) {
                return new d.Rect(e)
              })
          }),
          (d.Page.prototype.getRotation = function () {
            return d.sendWithPromise("Page.getRotation", { page: this.id })
          }),
          (d.Page.prototype.setRotation = function (e) {
            return (
              h(arguments.length, 1, "setRotation", "(number)", [[e, "number"]]),
              d.sendWithPromise("Page.setRotation", { page: this.id, angle: e })
            )
          }),
          (d.Page.addRotations = function (e, t) {
            return (
              h(arguments.length, 2, "addRotations", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("pageAddRotations", { r0: e, r1: t })
            )
          }),
          (d.Page.subtractRotations = function (e, t) {
            return (
              h(arguments.length, 2, "subtractRotations", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("pageSubtractRotations", { r0: e, r1: t })
            )
          }),
          (d.Page.rotationToDegree = function (e) {
            return (
              h(arguments.length, 1, "rotationToDegree", "(number)", [[e, "number"]]),
              d.sendWithPromise("pageRotationToDegree", { r: e })
            )
          }),
          (d.Page.degreeToRotation = function (e) {
            return (
              h(arguments.length, 1, "degreeToRotation", "(number)", [[e, "number"]]),
              d.sendWithPromise("pageDegreeToRotation", { r: e })
            )
          }),
          (d.Page.prototype.getPageWidth = function (e) {
            return (
              void 0 === e && (e = d.Page.Box.e_crop),
              h(arguments.length, 0, "getPageWidth", "(number)", [[e, "number"]]),
              d.sendWithPromise("Page.getPageWidth", { page: this.id, box_type: e })
            )
          }),
          (d.Page.prototype.getPageHeight = function (e) {
            return (
              void 0 === e && (e = d.Page.Box.e_crop),
              h(arguments.length, 0, "getPageHeight", "(number)", [[e, "number"]]),
              d.sendWithPromise("Page.getPageHeight", { page: this.id, box_type: e })
            )
          }),
          (d.Page.prototype.getDefaultMatrix = function (e, t, n) {
            return (
              void 0 === e && (e = !1),
              void 0 === t && (t = d.Page.Box.e_crop),
              void 0 === n && (n = d.Page.Rotate.e_0),
              h(arguments.length, 0, "getDefaultMatrix", "(boolean, number, number)", [
                [e, "boolean"],
                [t, "number"],
                [n, "number"],
              ]),
              d
                .sendWithPromise("Page.getDefaultMatrix", {
                  page: this.id,
                  flip_y: e,
                  box_type: t,
                  angle: n,
                })
                .then(function (e) {
                  return new d.Matrix2D(e)
                })
            )
          }),
          (d.Page.prototype.getAnnots = function () {
            return d.sendWithPromise("Page.getAnnots", { page: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Page.prototype.getNumAnnots = function () {
            return d.sendWithPromise("Page.getNumAnnots", { page: this.id })
          }),
          (d.Page.prototype.getAnnot = function (e) {
            return (
              h(arguments.length, 1, "getAnnot", "(number)", [[e, "number"]]),
              d.sendWithPromise("Page.getAnnot", { page: this.id, index: e }).then(function (e) {
                return p(d.Annot, e)
              })
            )
          }),
          (d.Page.prototype.annotInsert = function (e, t) {
            return (
              h(arguments.length, 2, "annotInsert", "(number, PDFNet.Annot)", [
                [e, "number"],
                [t, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("Page.annotInsert", { page: this.id, pos: e, annot: t.id })
            )
          }),
          (d.Page.prototype.annotPushBack = function (e) {
            return (
              h(arguments.length, 1, "annotPushBack", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("Page.annotPushBack", { page: this.id, annot: e.id })
            )
          }),
          (d.Page.prototype.annotPushFront = function (e) {
            return (
              h(arguments.length, 1, "annotPushFront", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("Page.annotPushFront", { page: this.id, annot: e.id })
            )
          }),
          (d.Page.prototype.annotRemove = function (e) {
            return (
              h(arguments.length, 1, "annotRemove", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("Page.annotRemove", { page: this.id, annot: e.id })
            )
          }),
          (d.Page.prototype.annotRemoveByIndex = function (e) {
            return (
              h(arguments.length, 1, "annotRemoveByIndex", "(number)", [[e, "number"]]),
              d.sendWithPromise("Page.annotRemoveByIndex", { page: this.id, index: e })
            )
          }),
          (d.Page.prototype.scale = function (e) {
            return (
              h(arguments.length, 1, "scale", "(number)", [[e, "number"]]),
              d.sendWithPromise("Page.scale", { page: this.id, scale: e })
            )
          }),
          (d.Page.prototype.flattenField = function (t) {
            return (
              h(arguments.length, 1, "flattenField", "(PDFNet.Field)", [
                [t, "Structure", d.Field, "Field"],
              ]),
              l("flattenField", [[t, 0]]),
              (t.yieldFunction = "Page.flattenField"),
              d
                .sendWithPromise("Page.flattenField", { page: this.id, field_to_flatten: t })
                .then(function (e) {
                  ;(t.yieldFunction = void 0), m(e, t)
                })
            )
          }),
          (d.Page.prototype.hasTransition = function () {
            return d.sendWithPromise("Page.hasTransition", { page: this.id })
          }),
          (d.Page.prototype.getUserUnitSize = function () {
            return d.sendWithPromise("Page.getUserUnitSize", { page: this.id })
          }),
          (d.Page.prototype.setUserUnitSize = function (e) {
            return (
              h(arguments.length, 1, "setUserUnitSize", "(number)", [[e, "number"]]),
              d.sendWithPromise("Page.setUserUnitSize", { page: this.id, unit_size: e })
            )
          }),
          (d.Page.prototype.getResourceDict = function () {
            return d.sendWithPromise("Page.getResourceDict", { page: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Page.prototype.getContents = function () {
            return d.sendWithPromise("Page.getContents", { page: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Page.prototype.getThumb = function () {
            return d.sendWithPromise("Page.getThumb", { page: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Page.prototype.getSDFObj = function () {
            return d.sendWithPromise("Page.getSDFObj", { page: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Page.prototype.findInheritedAttribute = function (e) {
            return (
              h(arguments.length, 1, "findInheritedAttribute", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("Page.findInheritedAttribute", { page: this.id, attrib: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Annot.create = function (e, t, n) {
            return (
              h(arguments.length, 3, "create", "(PDFNet.SDFDoc, number, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "number"],
                [n, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[n, 2]]),
              d.sendWithPromise("annotCreate", { doc: e.id, type: t, pos: n }).then(function (e) {
                return p(d.Annot, e)
              })
            )
          }),
          (d.Annot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("annotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.Annot, e)
              })
            )
          }),
          (d.Annot.prototype.copy = function () {
            return d.sendWithPromise("Annot.copy", { d: this.id }).then(function (e) {
              return p(d.Annot, e)
            })
          }),
          (d.Annot.prototype.compare = function (e) {
            return (
              h(arguments.length, 1, "compare", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("Annot.compare", { annot: this.id, d: e.id })
            )
          }),
          (d.Annot.prototype.isValid = function () {
            return d.sendWithPromise("Annot.isValid", { annot: this.id })
          }),
          (d.Annot.prototype.getSDFObj = function () {
            return d.sendWithPromise("Annot.getSDFObj", { annot: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Annot.prototype.getType = function () {
            return d.sendWithPromise("Annot.getType", { annot: this.id })
          }),
          (d.Annot.prototype.isMarkup = function () {
            return d.sendWithPromise("Annot.isMarkup", { annot: this.id })
          }),
          (d.Annot.prototype.getRect = function () {
            return d.sendWithPromise("Annot.getRect", { annot: this.id }).then(function (e) {
              return new d.Rect(e)
            })
          }),
          (d.Annot.prototype.getVisibleContentBox = function () {
            return d
              .sendWithPromise("Annot.getVisibleContentBox", { annot: this.id })
              .then(function (e) {
                return new d.Rect(e)
              })
          }),
          (d.Annot.prototype.setRect = function (e) {
            return (
              h(arguments.length, 1, "setRect", "(PDFNet.Rect)", [
                [e, "Structure", d.Rect, "Rect"],
              ]),
              l("setRect", [[e, 0]]),
              d.sendWithPromise("Annot.setRect", { annot: this.id, pos: e })
            )
          }),
          (d.Annot.prototype.resize = function (e) {
            return (
              h(arguments.length, 1, "resize", "(PDFNet.Rect)", [[e, "Structure", d.Rect, "Rect"]]),
              l("resize", [[e, 0]]),
              d.sendWithPromise("Annot.resize", { annot: this.id, newrect: e })
            )
          }),
          (d.Annot.prototype.setContents = function (e) {
            return (
              h(arguments.length, 1, "setContents", "(string)", [[e, "string"]]),
              d.sendWithPromise("Annot.setContents", { annot: this.id, contents: e })
            )
          }),
          (d.Annot.prototype.getContents = function () {
            return d.sendWithPromise("Annot.getContents", { annot: this.id })
          }),
          (d.Annot.prototype.getTriggerAction = function (e) {
            return (
              h(arguments.length, 1, "getTriggerAction", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("Annot.getTriggerAction", { annot: this.id, trigger: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Annot.prototype.getCustomData = function (e) {
            return (
              h(arguments.length, 1, "getCustomData", "(string)", [[e, "string"]]),
              d.sendWithPromise("Annot.getCustomData", { annot: this.id, key: e })
            )
          }),
          (d.Annot.prototype.setCustomData = function (e, t) {
            return (
              h(arguments.length, 2, "setCustomData", "(string, string)", [
                [e, "string"],
                [t, "string"],
              ]),
              d.sendWithPromise("Annot.setCustomData", { annot: this.id, key: e, value: t })
            )
          }),
          (d.Annot.prototype.deleteCustomData = function (e) {
            return (
              h(arguments.length, 1, "deleteCustomData", "(string)", [[e, "string"]]),
              d.sendWithPromise("Annot.deleteCustomData", { annot: this.id, key: e })
            )
          }),
          (d.Annot.prototype.getPage = function () {
            return d.sendWithPromise("Annot.getPage", { annot: this.id }).then(function (e) {
              return p(d.Page, e)
            })
          }),
          (d.Annot.prototype.setPage = function (e) {
            return (
              h(arguments.length, 1, "setPage", "(PDFNet.Page)", [[e, "Object", d.Page, "Page"]]),
              d.sendWithPromise("Annot.setPage", { annot: this.id, page: e.id })
            )
          }),
          (d.Annot.prototype.getUniqueID = function () {
            return d.sendWithPromise("Annot.getUniqueID", { annot: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Annot.prototype.setUniqueID = function (e) {
            h(arguments.length, 1, "setUniqueID", "(ArrayBuffer|TypedArray)", [[e, "ArrayBuffer"]])
            var t = a(e, !1)
            return d.sendWithPromise("Annot.setUniqueID", { annot: this.id, id_buf: t })
          }),
          (d.Annot.prototype.getDate = function () {
            return d.sendWithPromise("Annot.getDate", { annot: this.id }).then(function (e) {
              return new d.Date(e)
            })
          }),
          (d.Annot.prototype.setDate = function (e) {
            return (
              h(arguments.length, 1, "setDate", "(PDFNet.Date)", [
                [e, "Structure", d.Date, "Date"],
              ]),
              l("setDate", [[e, 0]]),
              d.sendWithPromise("Annot.setDate", { annot: this.id, date: e })
            )
          }),
          (d.Annot.prototype.getFlag = function (e) {
            return (
              h(arguments.length, 1, "getFlag", "(number)", [[e, "number"]]),
              d.sendWithPromise("Annot.getFlag", { annot: this.id, flag: e })
            )
          }),
          (d.Annot.prototype.setFlag = function (e, t) {
            return (
              h(arguments.length, 2, "setFlag", "(number, boolean)", [
                [e, "number"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("Annot.setFlag", { annot: this.id, flag: e, value: t })
            )
          }),
          (d.AnnotBorderStyle.create = function (e, t, n, i) {
            return (
              void 0 === n && (n = 0),
              void 0 === i && (i = 0),
              h(arguments.length, 2, "create", "(number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
              ]),
              d
                .sendWithPromise("annotBorderStyleCreate", { s: e, b_width: t, b_hr: n, b_vr: i })
                .then(function (e) {
                  return o(d.AnnotBorderStyle, e)
                })
            )
          }),
          (d.AnnotBorderStyle.createWithDashPattern = function (e, t, n, i, r) {
            return (
              h(
                arguments.length,
                5,
                "createWithDashPattern",
                "(number, number, number, number, Array<number>)",
                [
                  [e, "number"],
                  [t, "number"],
                  [n, "number"],
                  [i, "number"],
                  [r, "Array"],
                ]
              ),
              d
                .sendWithPromise("annotBorderStyleCreateWithDashPattern", {
                  s: e,
                  b_width: t,
                  b_hr: n,
                  b_vr: i,
                  b_dash_list: r,
                })
                .then(function (e) {
                  return o(d.AnnotBorderStyle, e)
                })
            )
          }),
          (d.AnnotBorderStyle.prototype.copy = function () {
            return d.sendWithPromise("AnnotBorderStyle.copy", { bs: this.id }).then(function (e) {
              return o(d.AnnotBorderStyle, e)
            })
          }),
          (d.AnnotBorderStyle.prototype.getStyle = function () {
            return d.sendWithPromise("AnnotBorderStyle.getStyle", { bs: this.id })
          }),
          (d.AnnotBorderStyle.prototype.setStyle = function (e) {
            return (
              h(arguments.length, 1, "setStyle", "(number)", [[e, "number"]]),
              d.sendWithPromise("AnnotBorderStyle.setStyle", { bs: this.id, style: e })
            )
          }),
          (d.Annot.prototype.getAppearance = function (e, t) {
            return (
              void 0 === e && (e = d.Annot.State.e_normal),
              void 0 === t && (t = null),
              h(arguments.length, 0, "getAppearance", "(number, string)", [
                [e, "number"],
                [t, "const char* = 0"],
              ]),
              d
                .sendWithPromise("Annot.getAppearance", {
                  annot: this.id,
                  annot_state: e,
                  app_state: t,
                })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Annot.prototype.setAppearance = function (e, t, n) {
            return (
              void 0 === t && (t = d.Annot.State.e_normal),
              void 0 === n && (n = null),
              h(arguments.length, 1, "setAppearance", "(PDFNet.Obj, number, string)", [
                [e, "Object", d.Obj, "Obj"],
                [t, "number"],
                [n, "const char* = 0"],
              ]),
              d.sendWithPromise("Annot.setAppearance", {
                annot: this.id,
                app_stream: e.id,
                annot_state: t,
                app_state: n,
              })
            )
          }),
          (d.Annot.prototype.removeAppearance = function (e, t) {
            return (
              void 0 === e && (e = d.Annot.State.e_normal),
              void 0 === t && (t = null),
              h(arguments.length, 0, "removeAppearance", "(number, string)", [
                [e, "number"],
                [t, "const char* = 0"],
              ]),
              d.sendWithPromise("Annot.removeAppearance", {
                annot: this.id,
                annot_state: e,
                app_state: t,
              })
            )
          }),
          (d.Annot.prototype.flatten = function (e) {
            return (
              h(arguments.length, 1, "flatten", "(PDFNet.Page)", [[e, "Object", d.Page, "Page"]]),
              d.sendWithPromise("Annot.flatten", { annot: this.id, page: e.id })
            )
          }),
          (d.Annot.prototype.getActiveAppearanceState = function () {
            return d.sendWithPromise("Annot.getActiveAppearanceState", { annot: this.id })
          }),
          (d.Annot.prototype.setActiveAppearanceState = function (e) {
            return (
              h(arguments.length, 1, "setActiveAppearanceState", "(string)", [[e, "string"]]),
              d.sendWithPromise("Annot.setActiveAppearanceState", { annot: this.id, astate: e })
            )
          }),
          (d.Annot.prototype.getColor = function () {
            return d.sendWithPromise("Annot.getColor", { annot: this.id }).then(function (e) {
              return o(d.ColorPt, e)
            })
          }),
          (d.Annot.prototype.getColorAsRGB = function () {
            return d.sendWithPromise("Annot.getColorAsRGB", { annot: this.id }).then(function (e) {
              return o(d.ColorPt, e)
            })
          }),
          (d.Annot.prototype.getColorAsCMYK = function () {
            return d.sendWithPromise("Annot.getColorAsCMYK", { annot: this.id }).then(function (e) {
              return o(d.ColorPt, e)
            })
          }),
          (d.Annot.prototype.getColorAsGray = function () {
            return d.sendWithPromise("Annot.getColorAsGray", { annot: this.id }).then(function (e) {
              return o(d.ColorPt, e)
            })
          }),
          (d.Annot.prototype.getColorCompNum = function () {
            return d.sendWithPromise("Annot.getColorCompNum", { annot: this.id })
          }),
          (d.Annot.prototype.setColorDefault = function (e) {
            return (
              h(arguments.length, 1, "setColorDefault", "(PDFNet.ColorPt)", [
                [e, "Object", d.ColorPt, "ColorPt"],
              ]),
              d.sendWithPromise("Annot.setColorDefault", { annot: this.id, col: e.id })
            )
          }),
          (d.Annot.prototype.setColor = function (e, t) {
            return (
              void 0 === t && (t = 3),
              h(arguments.length, 1, "setColor", "(PDFNet.ColorPt, number)", [
                [e, "Object", d.ColorPt, "ColorPt"],
                [t, "number"],
              ]),
              d.sendWithPromise("Annot.setColor", { annot: this.id, col: e.id, numcomp: t })
            )
          }),
          (d.Annot.prototype.getStructParent = function () {
            return d.sendWithPromise("Annot.getStructParent", { annot: this.id })
          }),
          (d.Annot.prototype.setStructParent = function (e) {
            return (
              h(arguments.length, 1, "setStructParent", "(number)", [[e, "number"]]),
              d.sendWithPromise("Annot.setStructParent", { annot: this.id, parkeyval: e })
            )
          }),
          (d.Annot.prototype.getOptionalContent = function () {
            return d
              .sendWithPromise("Annot.getOptionalContent", { annot: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.Annot.prototype.setOptionalContent = function (e) {
            return (
              h(arguments.length, 1, "setOptionalContent", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("Annot.setOptionalContent", { annot: this.id, content: e.id })
            )
          }),
          (d.Annot.prototype.refreshAppearance = function () {
            return d.sendWithPromise("Annot.refreshAppearance", { annot: this.id })
          }),
          (d.Annot.prototype.refreshAppearanceRefreshOptions = function (e) {
            return (
              void 0 === e && (e = null),
              h(arguments.length, 0, "refreshAppearanceRefreshOptions", "(PDFNet.OptionBase)", [
                [e, "OptionBase"],
              ]),
              l("refreshAppearanceRefreshOptions", [[e, 0]]),
              (e = e ? e.getJsonString() : "{}"),
              d.sendWithPromise("Annot.refreshAppearanceRefreshOptions", {
                annot: this.id,
                options: e,
              })
            )
          }),
          (d.Annot.prototype.getRotation = function () {
            return d.sendWithPromise("Annot.getRotation", { annot: this.id })
          }),
          (d.Annot.prototype.setRotation = function (e) {
            return (
              h(arguments.length, 1, "setRotation", "(number)", [[e, "number"]]),
              d.sendWithPromise("Annot.setRotation", { annot: this.id, angle: e })
            )
          }),
          (d.AnnotBorderStyle.prototype.getWidth = function () {
            return d.sendWithPromise("AnnotBorderStyle.getWidth", { bs: this.id })
          }),
          (d.AnnotBorderStyle.prototype.setWidth = function (e) {
            return (
              h(arguments.length, 1, "setWidth", "(number)", [[e, "number"]]),
              d.sendWithPromise("AnnotBorderStyle.setWidth", { bs: this.id, width: e })
            )
          }),
          (d.AnnotBorderStyle.prototype.getHR = function () {
            return d.sendWithPromise("AnnotBorderStyle.getHR", { bs: this.id })
          }),
          (d.AnnotBorderStyle.prototype.setHR = function (e) {
            return (
              h(arguments.length, 1, "setHR", "(number)", [[e, "number"]]),
              d.sendWithPromise("AnnotBorderStyle.setHR", { bs: this.id, horizontal_radius: e })
            )
          }),
          (d.AnnotBorderStyle.prototype.getVR = function () {
            return d.sendWithPromise("AnnotBorderStyle.getVR", { bs: this.id })
          }),
          (d.AnnotBorderStyle.prototype.setVR = function (e) {
            return (
              h(arguments.length, 1, "setVR", "(number)", [[e, "number"]]),
              d.sendWithPromise("AnnotBorderStyle.setVR", { bs: this.id, vertical_radius: e })
            )
          }),
          (d.AnnotBorderStyle.prototype.getDashPattern = function () {
            return d
              .sendWithPromise("AnnotBorderStyle.getDashPattern", { bs: this.id })
              .then(function (e) {
                return new Float64Array(e)
              })
          }),
          (d.Annot.prototype.getBorderStyle = function () {
            return d.sendWithPromise("Annot.getBorderStyle", { annot: this.id }).then(function (e) {
              return o(d.AnnotBorderStyle, e)
            })
          }),
          (d.Annot.prototype.setBorderStyle = function (e, t) {
            return (
              void 0 === t && (t = !1),
              h(arguments.length, 1, "setBorderStyle", "(PDFNet.AnnotBorderStyle, boolean)", [
                [e, "Object", d.AnnotBorderStyle, "AnnotBorderStyle"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("Annot.setBorderStyle", {
                annot: this.id,
                bs: e.id,
                oldStyleOnly: t,
              })
            )
          }),
          (d.Annot.getBorderStyleStyle = function (e) {
            return (
              h(arguments.length, 1, "getBorderStyleStyle", "(PDFNet.AnnotBorderStyle)", [
                [e, "Object", d.AnnotBorderStyle, "AnnotBorderStyle"],
              ]),
              d.sendWithPromise("annotGetBorderStyleStyle", { bs: e.id })
            )
          }),
          (d.Annot.setBorderStyleStyle = function (e, t) {
            return (
              h(arguments.length, 2, "setBorderStyleStyle", "(PDFNet.AnnotBorderStyle, number)", [
                [e, "Object", d.AnnotBorderStyle, "AnnotBorderStyle"],
                [t, "number"],
              ]),
              d.sendWithPromise("annotSetBorderStyleStyle", { bs: e.id, bst: t })
            )
          }),
          (d.AnnotBorderStyle.prototype.compare = function (e) {
            return (
              h(arguments.length, 1, "compare", "(PDFNet.AnnotBorderStyle)", [
                [e, "Object", d.AnnotBorderStyle, "AnnotBorderStyle"],
              ]),
              d.sendWithPromise("AnnotBorderStyle.compare", { a: this.id, b: e.id })
            )
          }),
          (d.CaretAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("caretAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.CaretAnnot, e)
              })
            )
          }),
          (d.CaretAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("caretAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.CaretAnnot, e)
              })
            )
          }),
          (d.CaretAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("caretAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.CaretAnnot, e)
              })
            )
          }),
          (d.CaretAnnot.prototype.getSymbol = function () {
            return d.sendWithPromise("CaretAnnot.getSymbol", { caret: this.id })
          }),
          (d.CaretAnnot.prototype.setSymbol = function (e) {
            return (
              h(arguments.length, 1, "setSymbol", "(string)", [[e, "string"]]),
              d.sendWithPromise("CaretAnnot.setSymbol", { caret: this.id, symbol: e })
            )
          }),
          (d.LineAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("lineAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.LineAnnot, e)
              })
            )
          }),
          (d.LineAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("lineAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.LineAnnot, e)
              })
            )
          }),
          (d.LineAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("lineAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.LineAnnot, e)
              })
            )
          }),
          (d.LineAnnot.prototype.getStartPoint = function () {
            return d.sendWithPromise("LineAnnot.getStartPoint", { line: this.id })
          }),
          (d.LineAnnot.prototype.setStartPoint = function (e) {
            return (
              h(arguments.length, 1, "setStartPoint", "(PDFNet.Point)", [
                [e, "Structure", d.Point, "Point"],
              ]),
              l("setStartPoint", [[e, 0]]),
              d.sendWithPromise("LineAnnot.setStartPoint", { line: this.id, sp: e })
            )
          }),
          (d.LineAnnot.prototype.getEndPoint = function () {
            return d.sendWithPromise("LineAnnot.getEndPoint", { line: this.id })
          }),
          (d.LineAnnot.prototype.setEndPoint = function (e) {
            return (
              h(arguments.length, 1, "setEndPoint", "(PDFNet.Point)", [
                [e, "Structure", d.Point, "Point"],
              ]),
              l("setEndPoint", [[e, 0]]),
              d.sendWithPromise("LineAnnot.setEndPoint", { line: this.id, ep: e })
            )
          }),
          (d.LineAnnot.prototype.getStartStyle = function () {
            return d.sendWithPromise("LineAnnot.getStartStyle", { line: this.id })
          }),
          (d.LineAnnot.prototype.setStartStyle = function (e) {
            return (
              h(arguments.length, 1, "setStartStyle", "(number)", [[e, "number"]]),
              d.sendWithPromise("LineAnnot.setStartStyle", { line: this.id, ss: e })
            )
          }),
          (d.LineAnnot.prototype.getEndStyle = function () {
            return d.sendWithPromise("LineAnnot.getEndStyle", { line: this.id })
          }),
          (d.LineAnnot.prototype.setEndStyle = function (e) {
            return (
              h(arguments.length, 1, "setEndStyle", "(number)", [[e, "number"]]),
              d.sendWithPromise("LineAnnot.setEndStyle", { line: this.id, es: e })
            )
          }),
          (d.LineAnnot.prototype.getLeaderLineLength = function () {
            return d.sendWithPromise("LineAnnot.getLeaderLineLength", { line: this.id })
          }),
          (d.LineAnnot.prototype.setLeaderLineLength = function (e) {
            return (
              h(arguments.length, 1, "setLeaderLineLength", "(number)", [[e, "number"]]),
              d.sendWithPromise("LineAnnot.setLeaderLineLength", { line: this.id, length: e })
            )
          }),
          (d.LineAnnot.prototype.getLeaderLineExtensionLength = function () {
            return d.sendWithPromise("LineAnnot.getLeaderLineExtensionLength", { line: this.id })
          }),
          (d.LineAnnot.prototype.setLeaderLineExtensionLength = function (e) {
            return (
              h(arguments.length, 1, "setLeaderLineExtensionLength", "(number)", [[e, "number"]]),
              d.sendWithPromise("LineAnnot.setLeaderLineExtensionLength", {
                line: this.id,
                length: e,
              })
            )
          }),
          (d.LineAnnot.prototype.getShowCaption = function () {
            return d.sendWithPromise("LineAnnot.getShowCaption", { line: this.id })
          }),
          (d.LineAnnot.prototype.setShowCaption = function (e) {
            return (
              h(arguments.length, 1, "setShowCaption", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("LineAnnot.setShowCaption", { line: this.id, showCaption: e })
            )
          }),
          (d.LineAnnot.prototype.getIntentType = function () {
            return d.sendWithPromise("LineAnnot.getIntentType", { line: this.id })
          }),
          (d.LineAnnot.prototype.setIntentType = function (e) {
            return (
              h(arguments.length, 1, "setIntentType", "(number)", [[e, "number"]]),
              d.sendWithPromise("LineAnnot.setIntentType", { line: this.id, it: e })
            )
          }),
          (d.LineAnnot.prototype.getCapPos = function () {
            return d.sendWithPromise("LineAnnot.getCapPos", { line: this.id })
          }),
          (d.LineAnnot.prototype.setCapPos = function (e) {
            return (
              h(arguments.length, 1, "setCapPos", "(number)", [[e, "number"]]),
              d.sendWithPromise("LineAnnot.setCapPos", { line: this.id, it: e })
            )
          }),
          (d.LineAnnot.prototype.getLeaderLineOffset = function () {
            return d.sendWithPromise("LineAnnot.getLeaderLineOffset", { line: this.id })
          }),
          (d.LineAnnot.prototype.setLeaderLineOffset = function (e) {
            return (
              h(arguments.length, 1, "setLeaderLineOffset", "(number)", [[e, "number"]]),
              d.sendWithPromise("LineAnnot.setLeaderLineOffset", { line: this.id, length: e })
            )
          }),
          (d.LineAnnot.prototype.getTextHOffset = function () {
            return d.sendWithPromise("LineAnnot.getTextHOffset", { line: this.id })
          }),
          (d.LineAnnot.prototype.setTextHOffset = function (e) {
            return (
              h(arguments.length, 1, "setTextHOffset", "(number)", [[e, "number"]]),
              d.sendWithPromise("LineAnnot.setTextHOffset", { line: this.id, offset: e })
            )
          }),
          (d.LineAnnot.prototype.getTextVOffset = function () {
            return d.sendWithPromise("LineAnnot.getTextVOffset", { line: this.id })
          }),
          (d.LineAnnot.prototype.setTextVOffset = function (e) {
            return (
              h(arguments.length, 1, "setTextVOffset", "(number)", [[e, "number"]]),
              d.sendWithPromise("LineAnnot.setTextVOffset", { line: this.id, offset: e })
            )
          }),
          (d.CircleAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("circleAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.CircleAnnot, e)
              })
            )
          }),
          (d.CircleAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("circleAnnotCreateFromAnnot", { circle: e.id }).then(function (e) {
                return p(d.CircleAnnot, e)
              })
            )
          }),
          (d.CircleAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("circleAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.CircleAnnot, e)
              })
            )
          }),
          (d.CircleAnnot.prototype.getInteriorColor = function () {
            return d
              .sendWithPromise("CircleAnnot.getInteriorColor", { circle: this.id })
              .then(function (e) {
                return o(d.ColorPt, e)
              })
          }),
          (d.CircleAnnot.prototype.getInteriorColorCompNum = function () {
            return d.sendWithPromise("CircleAnnot.getInteriorColorCompNum", { circle: this.id })
          }),
          (d.CircleAnnot.prototype.setInteriorColorDefault = function (e) {
            return (
              h(arguments.length, 1, "setInteriorColorDefault", "(PDFNet.ColorPt)", [
                [e, "Object", d.ColorPt, "ColorPt"],
              ]),
              d.sendWithPromise("CircleAnnot.setInteriorColorDefault", {
                circle: this.id,
                col: e.id,
              })
            )
          }),
          (d.CircleAnnot.prototype.setInteriorColor = function (e, t) {
            return (
              h(arguments.length, 2, "setInteriorColor", "(PDFNet.ColorPt, number)", [
                [e, "Object", d.ColorPt, "ColorPt"],
                [t, "number"],
              ]),
              d.sendWithPromise("CircleAnnot.setInteriorColor", {
                circle: this.id,
                col: e.id,
                numcomp: t,
              })
            )
          }),
          (d.CircleAnnot.prototype.getContentRect = function () {
            return d
              .sendWithPromise("CircleAnnot.getContentRect", { circle: this.id })
              .then(function (e) {
                return new d.Rect(e)
              })
          }),
          (d.CircleAnnot.prototype.setContentRect = function (e) {
            return (
              h(arguments.length, 1, "setContentRect", "(PDFNet.Rect)", [
                [e, "Structure", d.Rect, "Rect"],
              ]),
              l("setContentRect", [[e, 0]]),
              d.sendWithPromise("CircleAnnot.setContentRect", { circle: this.id, cr: e })
            )
          }),
          (d.CircleAnnot.prototype.getPadding = function () {
            return d
              .sendWithPromise("CircleAnnot.getPadding", { circle: this.id })
              .then(function (e) {
                return new d.Rect(e)
              })
          }),
          (d.CircleAnnot.prototype.setPadding = function (e) {
            return (
              h(arguments.length, 1, "setPadding", "(PDFNet.Rect)", [
                [e, "Structure", d.Rect, "Rect"],
              ]),
              l("setPadding", [[e, 0]]),
              d.sendWithPromise("CircleAnnot.setPadding", { circle: this.id, cr: e })
            )
          }),
          (d.FileAttachmentAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("fileAttachmentAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.FileAttachmentAnnot, e)
              })
            )
          }),
          (d.FileAttachmentAnnot.prototype.export = function (e) {
            return (
              void 0 === e && (e = ""),
              h(arguments.length, 0, "export", "(string)", [[e, "string"]]),
              d.sendWithPromise("FileAttachmentAnnot.export", { fileatt: this.id, save_as: e })
            )
          }),
          (d.FileAttachmentAnnot.prototype.createFromAnnot = function () {
            return d
              .sendWithPromise("FileAttachmentAnnot.createFromAnnot", { fileatt: this.id })
              .then(function (e) {
                return p(d.Annot, e)
              })
          }),
          (d.FileAttachmentAnnot.createWithFileSpec = function (e, t, n, i) {
            return (
              void 0 === i && (i = d.FileAttachmentAnnot.Icon.e_PushPin),
              h(
                arguments.length,
                3,
                "createWithFileSpec",
                "(PDFNet.SDFDoc, PDFNet.Rect, PDFNet.FileSpec, number)",
                [
                  [e, "SDFDoc"],
                  [t, "Structure", d.Rect, "Rect"],
                  [n, "Object", d.FileSpec, "FileSpec"],
                  [i, "number"],
                ]
              ),
              l("createWithFileSpec", [[t, 1]]),
              d
                .sendWithPromise("fileAttachmentAnnotCreateWithFileSpec", {
                  doc: e.id,
                  pos: t,
                  fs: n.id,
                  icon_name: i,
                })
                .then(function (e) {
                  return p(d.FileAttachmentAnnot, e)
                })
            )
          }),
          (d.FileAttachmentAnnot.createDefault = function (e, t, n) {
            return (
              h(arguments.length, 3, "createDefault", "(PDFNet.SDFDoc, PDFNet.Rect, string)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
                [n, "string"],
              ]),
              l("createDefault", [[t, 1]]),
              d
                .sendWithPromise("fileAttachmentAnnotCreateDefault", { doc: e.id, pos: t, path: n })
                .then(function (e) {
                  return p(d.FileAttachmentAnnot, e)
                })
            )
          }),
          (d.FileAttachmentAnnot.prototype.getFileSpec = function () {
            return d
              .sendWithPromise("FileAttachmentAnnot.getFileSpec", { fileatt: this.id })
              .then(function (e) {
                return p(d.FileSpec, e)
              })
          }),
          (d.FileAttachmentAnnot.prototype.setFileSpec = function (e) {
            return (
              h(arguments.length, 1, "setFileSpec", "(PDFNet.FileSpec)", [
                [e, "Object", d.FileSpec, "FileSpec"],
              ]),
              d.sendWithPromise("FileAttachmentAnnot.setFileSpec", { fileatt: this.id, file: e.id })
            )
          }),
          (d.FileAttachmentAnnot.prototype.getIcon = function () {
            return d.sendWithPromise("FileAttachmentAnnot.getIcon", { fileatt: this.id })
          }),
          (d.FileAttachmentAnnot.prototype.setIcon = function (e) {
            return (
              void 0 === e && (e = d.FileAttachmentAnnot.Icon.e_PushPin),
              h(arguments.length, 0, "setIcon", "(number)", [[e, "number"]]),
              d.sendWithPromise("FileAttachmentAnnot.setIcon", { fileatt: this.id, type: e })
            )
          }),
          (d.FileAttachmentAnnot.prototype.getIconName = function () {
            return d.sendWithPromise("FileAttachmentAnnot.getIconName", { fileatt: this.id })
          }),
          (d.FileAttachmentAnnot.prototype.setIconName = function (e) {
            return (
              h(arguments.length, 1, "setIconName", "(string)", [[e, "string"]]),
              d.sendWithPromise("FileAttachmentAnnot.setIconName", { fileatt: this.id, iname: e })
            )
          }),
          (d.FreeTextAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("freeTextAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.FreeTextAnnot, e)
              })
            )
          }),
          (d.FreeTextAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("freeTextAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.FreeTextAnnot, e)
              })
            )
          }),
          (d.FreeTextAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("freeTextAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.FreeTextAnnot, e)
              })
            )
          }),
          (d.FreeTextAnnot.prototype.getDefaultAppearance = function () {
            return d.sendWithPromise("FreeTextAnnot.getDefaultAppearance", { ft: this.id })
          }),
          (d.FreeTextAnnot.prototype.setDefaultAppearance = function (e) {
            return (
              h(arguments.length, 1, "setDefaultAppearance", "(string)", [[e, "string"]]),
              d.sendWithPromise("FreeTextAnnot.setDefaultAppearance", { ft: this.id, app_str: e })
            )
          }),
          (d.FreeTextAnnot.prototype.getQuaddingFormat = function () {
            return d.sendWithPromise("FreeTextAnnot.getQuaddingFormat", { ft: this.id })
          }),
          (d.FreeTextAnnot.prototype.setQuaddingFormat = function (e) {
            return (
              h(arguments.length, 1, "setQuaddingFormat", "(number)", [[e, "number"]]),
              d.sendWithPromise("FreeTextAnnot.setQuaddingFormat", { ft: this.id, format: e })
            )
          }),
          (d.FreeTextAnnot.prototype.getCalloutLinePoints = function () {
            return d.sendWithPromise("FreeTextAnnot.getCalloutLinePoints", { ft: this.id })
          }),
          (d.FreeTextAnnot.prototype.setCalloutLinePoints = function (e, t, n) {
            return (
              h(
                arguments.length,
                3,
                "setCalloutLinePoints",
                "(PDFNet.Point, PDFNet.Point, PDFNet.Point)",
                [
                  [e, "Structure", d.Point, "Point"],
                  [t, "Structure", d.Point, "Point"],
                  [n, "Structure", d.Point, "Point"],
                ]
              ),
              l("setCalloutLinePoints", [
                [e, 0],
                [t, 1],
                [n, 2],
              ]),
              d.sendWithPromise("FreeTextAnnot.setCalloutLinePoints", {
                ft: this.id,
                p1: e,
                p2: t,
                p3: n,
              })
            )
          }),
          (d.FreeTextAnnot.prototype.setCalloutLinePointsTwo = function (e, t) {
            return (
              h(arguments.length, 2, "setCalloutLinePointsTwo", "(PDFNet.Point, PDFNet.Point)", [
                [e, "Structure", d.Point, "Point"],
                [t, "Structure", d.Point, "Point"],
              ]),
              l("setCalloutLinePointsTwo", [
                [e, 0],
                [t, 1],
              ]),
              d.sendWithPromise("FreeTextAnnot.setCalloutLinePointsTwo", {
                ft: this.id,
                p1: e,
                p2: t,
              })
            )
          }),
          (d.FreeTextAnnot.prototype.getIntentName = function () {
            return d.sendWithPromise("FreeTextAnnot.getIntentName", { ft: this.id })
          }),
          (d.FreeTextAnnot.prototype.setIntentName = function (e) {
            return (
              void 0 === e && (e = d.FreeTextAnnot.IntentName.e_FreeText),
              h(arguments.length, 0, "setIntentName", "(number)", [[e, "number"]]),
              d.sendWithPromise("FreeTextAnnot.setIntentName", { ft: this.id, mode: e })
            )
          }),
          (d.FreeTextAnnot.prototype.setIntentNameDefault = function () {
            return d.sendWithPromise("FreeTextAnnot.setIntentNameDefault", { ft: this.id })
          }),
          (d.FreeTextAnnot.prototype.getEndingStyle = function () {
            return d.sendWithPromise("FreeTextAnnot.getEndingStyle", { ft: this.id })
          }),
          (d.FreeTextAnnot.prototype.setEndingStyle = function (e) {
            return (
              h(arguments.length, 1, "setEndingStyle", "(number)", [[e, "number"]]),
              d.sendWithPromise("FreeTextAnnot.setEndingStyle", { ft: this.id, style: e })
            )
          }),
          (d.FreeTextAnnot.prototype.setEndingStyleName = function (e) {
            return (
              h(arguments.length, 1, "setEndingStyleName", "(string)", [[e, "string"]]),
              d.sendWithPromise("FreeTextAnnot.setEndingStyleName", { ft: this.id, est: e })
            )
          }),
          (d.FreeTextAnnot.prototype.setTextColor = function (e, t) {
            return (
              h(arguments.length, 2, "setTextColor", "(PDFNet.ColorPt, number)", [
                [e, "Object", d.ColorPt, "ColorPt"],
                [t, "number"],
              ]),
              d.sendWithPromise("FreeTextAnnot.setTextColor", {
                ft: this.id,
                color: e.id,
                col_comp: t,
              })
            )
          }),
          (d.FreeTextAnnot.prototype.getTextColor = function () {
            return d
              .sendWithPromise("FreeTextAnnot.getTextColor", { ft: this.id })
              .then(function (e) {
                return (e.color = o(d.ColorPt, e.color)), e
              })
          }),
          (d.FreeTextAnnot.prototype.setLineColor = function (e, t) {
            return (
              h(arguments.length, 2, "setLineColor", "(PDFNet.ColorPt, number)", [
                [e, "Object", d.ColorPt, "ColorPt"],
                [t, "number"],
              ]),
              d.sendWithPromise("FreeTextAnnot.setLineColor", {
                ft: this.id,
                color: e.id,
                col_comp: t,
              })
            )
          }),
          (d.FreeTextAnnot.prototype.getLineColor = function () {
            return d
              .sendWithPromise("FreeTextAnnot.getLineColor", { ft: this.id })
              .then(function (e) {
                return (e.color = o(d.ColorPt, e.color)), e
              })
          }),
          (d.FreeTextAnnot.prototype.setFontSize = function (e) {
            return (
              h(arguments.length, 1, "setFontSize", "(number)", [[e, "number"]]),
              d.sendWithPromise("FreeTextAnnot.setFontSize", { ft: this.id, font_size: e })
            )
          }),
          (d.FreeTextAnnot.prototype.getFontSize = function () {
            return d.sendWithPromise("FreeTextAnnot.getFontSize", { ft: this.id })
          }),
          (d.HighlightAnnot.createFromObj = function (e) {
            return (
              h(arguments.length, 1, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("highlightAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.HighlightAnnot, e)
              })
            )
          }),
          (d.HighlightAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("highlightAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.HighlightAnnot, e)
              })
            )
          }),
          (d.HighlightAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("highlightAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.HighlightAnnot, e)
              })
            )
          }),
          (d.InkAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("inkAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.InkAnnot, e)
              })
            )
          }),
          (d.InkAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("inkAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.InkAnnot, e)
              })
            )
          }),
          (d.InkAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("inkAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.InkAnnot, e)
              })
            )
          }),
          (d.InkAnnot.prototype.getPathCount = function () {
            return d.sendWithPromise("InkAnnot.getPathCount", { ink: this.id })
          }),
          (d.InkAnnot.prototype.getPointCount = function (e) {
            return (
              h(arguments.length, 1, "getPointCount", "(number)", [[e, "number"]]),
              d.sendWithPromise("InkAnnot.getPointCount", { ink: this.id, pathindex: e })
            )
          }),
          (d.InkAnnot.prototype.getPoint = function (e, t) {
            return (
              h(arguments.length, 2, "getPoint", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("InkAnnot.getPoint", { ink: this.id, pathindex: e, pointindex: t })
            )
          }),
          (d.InkAnnot.prototype.setPoint = function (e, t, n) {
            return (
              h(arguments.length, 3, "setPoint", "(number, number, PDFNet.Point)", [
                [e, "number"],
                [t, "number"],
                [n, "Structure", d.Point, "Point"],
              ]),
              l("setPoint", [[n, 2]]),
              d.sendWithPromise("InkAnnot.setPoint", {
                ink: this.id,
                pathindex: e,
                pointindex: t,
                pt: n,
              })
            )
          }),
          (d.InkAnnot.prototype.erase = function (e, t, n) {
            return (
              h(arguments.length, 3, "erase", "(PDFNet.Point, PDFNet.Point, number)", [
                [e, "Structure", d.Point, "Point"],
                [t, "Structure", d.Point, "Point"],
                [n, "number"],
              ]),
              l("erase", [
                [e, 0],
                [t, 1],
              ]),
              d.sendWithPromise("InkAnnot.erase", { ink: this.id, pt1: e, pt2: t, width: n })
            )
          }),
          (d.InkAnnot.prototype.getHighlightIntent = function () {
            return d.sendWithPromise("InkAnnot.getHighlightIntent", { ink: this.id })
          }),
          (d.InkAnnot.prototype.setHighlightIntent = function (e) {
            return (
              h(arguments.length, 1, "setHighlightIntent", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("InkAnnot.setHighlightIntent", { ink: this.id, highlight: e })
            )
          }),
          (d.LinkAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("linkAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.LinkAnnot, e)
              })
            )
          }),
          (d.LinkAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("linkAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.LinkAnnot, e)
              })
            )
          }),
          (d.LinkAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("linkAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.LinkAnnot, e)
              })
            )
          }),
          (d.LinkAnnot.prototype.removeAction = function () {
            return d.sendWithPromise("LinkAnnot.removeAction", { link: this.id })
          }),
          (d.LinkAnnot.prototype.getAction = function () {
            return d.sendWithPromise("LinkAnnot.getAction", { link: this.id }).then(function (e) {
              return p(d.Action, e)
            })
          }),
          (d.LinkAnnot.prototype.setAction = function (e) {
            return (
              h(arguments.length, 1, "setAction", "(PDFNet.Action)", [
                [e, "Object", d.Action, "Action"],
              ]),
              d.sendWithPromise("LinkAnnot.setAction", { link: this.id, action: e.id })
            )
          }),
          (d.LinkAnnot.prototype.getHighlightingMode = function () {
            return d.sendWithPromise("LinkAnnot.getHighlightingMode", { link: this.id })
          }),
          (d.LinkAnnot.prototype.setHighlightingMode = function (e) {
            return (
              h(arguments.length, 1, "setHighlightingMode", "(number)", [[e, "number"]]),
              d.sendWithPromise("LinkAnnot.setHighlightingMode", { link: this.id, value: e })
            )
          }),
          (d.LinkAnnot.prototype.getQuadPointCount = function () {
            return d.sendWithPromise("LinkAnnot.getQuadPointCount", { link: this.id })
          }),
          (d.LinkAnnot.prototype.getQuadPoint = function (e) {
            return (
              h(arguments.length, 1, "getQuadPoint", "(number)", [[e, "number"]]),
              d.sendWithPromise("LinkAnnot.getQuadPoint", { link: this.id, idx: e })
            )
          }),
          (d.LinkAnnot.prototype.setQuadPoint = function (e, t) {
            return (
              h(arguments.length, 2, "setQuadPoint", "(number, PDFNet.QuadPoint)", [
                [e, "number"],
                [t, "Structure", d.QuadPoint, "QuadPoint"],
              ]),
              l("setQuadPoint", [[t, 1]]),
              d.sendWithPromise("LinkAnnot.setQuadPoint", { link: this.id, idx: e, qp: t })
            )
          }),
          (d.getNormalizedUrl = function (e) {
            return (
              h(arguments.length, 1, "getNormalizedUrl", "(string)", [[e, "string"]]),
              d.sendWithPromise("getNormalizedUrl", { url: e })
            )
          }),
          (d.MarkupAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("markupAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.MarkupAnnot, e)
              })
            )
          }),
          (d.MarkupAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("markupAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.MarkupAnnot, e)
              })
            )
          }),
          (d.MarkupAnnot.prototype.getTitle = function () {
            return d.sendWithPromise("MarkupAnnot.getTitle", { markup: this.id })
          }),
          (d.MarkupAnnot.prototype.setTitle = function (e) {
            return (
              h(arguments.length, 1, "setTitle", "(string)", [[e, "string"]]),
              d.sendWithPromise("MarkupAnnot.setTitle", { markup: this.id, title: e })
            )
          }),
          (d.MarkupAnnot.prototype.setTitleUString = function (e) {
            return (
              h(arguments.length, 1, "setTitleUString", "(string)", [[e, "string"]]),
              d.sendWithPromise("MarkupAnnot.setTitleUString", { markup: this.id, title: e })
            )
          }),
          (d.MarkupAnnot.prototype.getPopup = function () {
            return d
              .sendWithPromise("MarkupAnnot.getPopup", { markup: this.id })
              .then(function (e) {
                return p(d.Annot, e)
              })
          }),
          (d.MarkupAnnot.prototype.setPopup = function (e) {
            return (
              h(arguments.length, 1, "setPopup", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("MarkupAnnot.setPopup", { markup: this.id, ppup: e.id })
            )
          }),
          (d.MarkupAnnot.prototype.getOpacity = function () {
            return d.sendWithPromise("MarkupAnnot.getOpacity", { markup: this.id })
          }),
          (d.MarkupAnnot.prototype.setOpacity = function (e) {
            return (
              h(arguments.length, 1, "setOpacity", "(number)", [[e, "number"]]),
              d.sendWithPromise("MarkupAnnot.setOpacity", { markup: this.id, op: e })
            )
          }),
          (d.MarkupAnnot.prototype.getSubject = function () {
            return d.sendWithPromise("MarkupAnnot.getSubject", { markup: this.id })
          }),
          (d.MarkupAnnot.prototype.setSubject = function (e) {
            return (
              h(arguments.length, 1, "setSubject", "(string)", [[e, "string"]]),
              d.sendWithPromise("MarkupAnnot.setSubject", { markup: this.id, contents: e })
            )
          }),
          (d.MarkupAnnot.prototype.getCreationDates = function () {
            return d
              .sendWithPromise("MarkupAnnot.getCreationDates", { markup: this.id })
              .then(function (e) {
                return new d.Date(e)
              })
          }),
          (d.MarkupAnnot.prototype.getBorderEffect = function () {
            return d.sendWithPromise("MarkupAnnot.getBorderEffect", { markup: this.id })
          }),
          (d.MarkupAnnot.prototype.setBorderEffect = function (e) {
            return (
              void 0 === e && (e = d.MarkupAnnot.BorderEffect.e_None),
              h(arguments.length, 0, "setBorderEffect", "(number)", [[e, "number"]]),
              d.sendWithPromise("MarkupAnnot.setBorderEffect", { markup: this.id, effect: e })
            )
          }),
          (d.MarkupAnnot.prototype.getBorderEffectIntensity = function () {
            return d.sendWithPromise("MarkupAnnot.getBorderEffectIntensity", { markup: this.id })
          }),
          (d.MarkupAnnot.prototype.setBorderEffectIntensity = function (e) {
            return (
              void 0 === e && (e = 0),
              h(arguments.length, 0, "setBorderEffectIntensity", "(number)", [[e, "number"]]),
              d.sendWithPromise("MarkupAnnot.setBorderEffectIntensity", {
                markup: this.id,
                intensity: e,
              })
            )
          }),
          (d.MarkupAnnot.prototype.setCreationDates = function (e) {
            return (
              h(arguments.length, 1, "setCreationDates", "(PDFNet.Date)", [
                [e, "Structure", d.Date, "Date"],
              ]),
              l("setCreationDates", [[e, 0]]),
              d.sendWithPromise("MarkupAnnot.setCreationDates", { markup: this.id, dt: e })
            )
          }),
          (d.MarkupAnnot.prototype.getInteriorColor = function () {
            return d
              .sendWithPromise("MarkupAnnot.getInteriorColor", { markup: this.id })
              .then(function (e) {
                return o(d.ColorPt, e)
              })
          }),
          (d.MarkupAnnot.prototype.getInteriorColorCompNum = function () {
            return d.sendWithPromise("MarkupAnnot.getInteriorColorCompNum", { markup: this.id })
          }),
          (d.MarkupAnnot.prototype.setInteriorColorRGB = function (e) {
            return (
              h(arguments.length, 1, "setInteriorColorRGB", "(PDFNet.ColorPt)", [
                [e, "Object", d.ColorPt, "ColorPt"],
              ]),
              d.sendWithPromise("MarkupAnnot.setInteriorColorRGB", { markup: this.id, col: e.id })
            )
          }),
          (d.MarkupAnnot.prototype.setInteriorColor = function (e, t) {
            return (
              h(arguments.length, 2, "setInteriorColor", "(PDFNet.ColorPt, number)", [
                [e, "Object", d.ColorPt, "ColorPt"],
                [t, "number"],
              ]),
              d.sendWithPromise("MarkupAnnot.setInteriorColor", {
                markup: this.id,
                c: e.id,
                CompNum: t,
              })
            )
          }),
          (d.MarkupAnnot.prototype.getContentRect = function () {
            return d
              .sendWithPromise("MarkupAnnot.getContentRect", { markup: this.id })
              .then(function (e) {
                return new d.Rect(e)
              })
          }),
          (d.MarkupAnnot.prototype.setContentRect = function (e) {
            return (
              h(arguments.length, 1, "setContentRect", "(PDFNet.Rect)", [
                [e, "Structure", d.Rect, "Rect"],
              ]),
              l("setContentRect", [[e, 0]]),
              d.sendWithPromise("MarkupAnnot.setContentRect", { markup: this.id, cr: e })
            )
          }),
          (d.MarkupAnnot.prototype.getPadding = function () {
            return d
              .sendWithPromise("MarkupAnnot.getPadding", { markup: this.id })
              .then(function (e) {
                return new d.Rect(e)
              })
          }),
          (d.MarkupAnnot.prototype.setPadding = function (e) {
            return (
              h(arguments.length, 1, "setPadding", "(PDFNet.Rect)", [
                [e, "Structure", d.Rect, "Rect"],
              ]),
              l("setPadding", [[e, 0]]),
              d.sendWithPromise("MarkupAnnot.setPadding", { markup: this.id, rd: e })
            )
          }),
          (d.MarkupAnnot.prototype.rotateAppearance = function (e) {
            return (
              h(arguments.length, 1, "rotateAppearance", "(number)", [[e, "number"]]),
              d.sendWithPromise("MarkupAnnot.rotateAppearance", { markup: this.id, angle: e })
            )
          }),
          (d.MovieAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("movieAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.MovieAnnot, e)
              })
            )
          }),
          (d.MovieAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("movieAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.MovieAnnot, e)
              })
            )
          }),
          (d.MovieAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("movieAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.MovieAnnot, e)
              })
            )
          }),
          (d.MovieAnnot.prototype.getTitle = function () {
            return d.sendWithPromise("MovieAnnot.getTitle", { movie: this.id })
          }),
          (d.MovieAnnot.prototype.setTitle = function (e) {
            return (
              h(arguments.length, 1, "setTitle", "(string)", [[e, "string"]]),
              d.sendWithPromise("MovieAnnot.setTitle", { movie: this.id, title: e })
            )
          }),
          (d.MovieAnnot.prototype.isToBePlayed = function () {
            return d.sendWithPromise("MovieAnnot.isToBePlayed", { movie: this.id })
          }),
          (d.MovieAnnot.prototype.setToBePlayed = function (e) {
            return (
              void 0 === e && (e = !0),
              h(arguments.length, 0, "setToBePlayed", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("MovieAnnot.setToBePlayed", { movie: this.id, isplay: e })
            )
          }),
          (d.PolyLineAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("polyLineAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.PolyLineAnnot, e)
              })
            )
          }),
          (d.PolyLineAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("polyLineAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.PolyLineAnnot, e)
              })
            )
          }),
          (d.PolyLineAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("polyLineAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.PolyLineAnnot, e)
              })
            )
          }),
          (d.PolyLineAnnot.prototype.getVertexCount = function () {
            return d.sendWithPromise("PolyLineAnnot.getVertexCount", { polyline: this.id })
          }),
          (d.PolyLineAnnot.prototype.getVertex = function (e) {
            return (
              h(arguments.length, 1, "getVertex", "(number)", [[e, "number"]]),
              d.sendWithPromise("PolyLineAnnot.getVertex", { polyline: this.id, idx: e })
            )
          }),
          (d.PolyLineAnnot.prototype.setVertex = function (e, t) {
            return (
              h(arguments.length, 2, "setVertex", "(number, PDFNet.Point)", [
                [e, "number"],
                [t, "Structure", d.Point, "Point"],
              ]),
              l("setVertex", [[t, 1]]),
              d.sendWithPromise("PolyLineAnnot.setVertex", { polyline: this.id, idx: e, pt: t })
            )
          }),
          (d.PolyLineAnnot.prototype.getStartStyle = function () {
            return d.sendWithPromise("PolyLineAnnot.getStartStyle", { polyline: this.id })
          }),
          (d.PolyLineAnnot.prototype.setStartStyle = function (e) {
            return (
              h(arguments.length, 1, "setStartStyle", "(number)", [[e, "number"]]),
              d.sendWithPromise("PolyLineAnnot.setStartStyle", { polyline: this.id, style: e })
            )
          }),
          (d.PolyLineAnnot.prototype.getEndStyle = function () {
            return d.sendWithPromise("PolyLineAnnot.getEndStyle", { polyline: this.id })
          }),
          (d.PolyLineAnnot.prototype.setEndStyle = function (e) {
            return (
              h(arguments.length, 1, "setEndStyle", "(number)", [[e, "number"]]),
              d.sendWithPromise("PolyLineAnnot.setEndStyle", { polyline: this.id, style: e })
            )
          }),
          (d.PolyLineAnnot.prototype.getIntentName = function () {
            return d.sendWithPromise("PolyLineAnnot.getIntentName", { polyline: this.id })
          }),
          (d.PolyLineAnnot.prototype.setIntentName = function (e) {
            return (
              h(arguments.length, 1, "setIntentName", "(number)", [[e, "number"]]),
              d.sendWithPromise("PolyLineAnnot.setIntentName", { polyline: this.id, mode: e })
            )
          }),
          (d.PolygonAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("polygonAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.PolygonAnnot, e)
              })
            )
          }),
          (d.PolygonAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("polygonAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.PolygonAnnot, e)
              })
            )
          }),
          (d.PolygonAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("polygonAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.PolygonAnnot, e)
              })
            )
          }),
          (d.PopupAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("popupAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.PopupAnnot, e)
              })
            )
          }),
          (d.PopupAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("popupAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.PopupAnnot, e)
              })
            )
          }),
          (d.PopupAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("popupAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.PopupAnnot, e)
              })
            )
          }),
          (d.PopupAnnot.prototype.getParent = function () {
            return d.sendWithPromise("PopupAnnot.getParent", { popup: this.id }).then(function (e) {
              return p(d.Annot, e)
            })
          }),
          (d.PopupAnnot.prototype.setParent = function (e) {
            return (
              h(arguments.length, 1, "setParent", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("PopupAnnot.setParent", { popup: this.id, parent: e.id })
            )
          }),
          (d.PopupAnnot.prototype.isOpen = function () {
            return d.sendWithPromise("PopupAnnot.isOpen", { popup: this.id })
          }),
          (d.PopupAnnot.prototype.setOpen = function (e) {
            return (
              h(arguments.length, 1, "setOpen", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PopupAnnot.setOpen", { popup: this.id, isopen: e })
            )
          }),
          (d.RedactionAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("redactionAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.RedactionAnnot, e)
              })
            )
          }),
          (d.RedactionAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("redactionAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.RedactionAnnot, e)
              })
            )
          }),
          (d.RedactionAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("redactionAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.RedactionAnnot, e)
              })
            )
          }),
          (d.RedactionAnnot.prototype.getQuadPointCount = function () {
            return d.sendWithPromise("RedactionAnnot.getQuadPointCount", { redaction: this.id })
          }),
          (d.RedactionAnnot.prototype.getQuadPoint = function (e) {
            return (
              h(arguments.length, 1, "getQuadPoint", "(number)", [[e, "number"]]),
              d.sendWithPromise("RedactionAnnot.getQuadPoint", { redaction: this.id, idx: e })
            )
          }),
          (d.RedactionAnnot.prototype.setQuadPoint = function (e, t) {
            return (
              h(arguments.length, 2, "setQuadPoint", "(number, PDFNet.QuadPoint)", [
                [e, "number"],
                [t, "Structure", d.QuadPoint, "QuadPoint"],
              ]),
              l("setQuadPoint", [[t, 1]]),
              d.sendWithPromise("RedactionAnnot.setQuadPoint", {
                redaction: this.id,
                idx: e,
                qp: t,
              })
            )
          }),
          (d.RedactionAnnot.prototype.setAppFormXO = function (e) {
            return (
              h(arguments.length, 1, "setAppFormXO", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("RedactionAnnot.setAppFormXO", { redaction: this.id, formxo: e.id })
            )
          }),
          (d.RedactionAnnot.prototype.getOverlayText = function () {
            return d.sendWithPromise("RedactionAnnot.getOverlayText", { redaction: this.id })
          }),
          (d.RedactionAnnot.prototype.setOverlayText = function (e) {
            return (
              h(arguments.length, 1, "setOverlayText", "(string)", [[e, "string"]]),
              d.sendWithPromise("RedactionAnnot.setOverlayText", { redaction: this.id, title: e })
            )
          }),
          (d.RedactionAnnot.prototype.getUseRepeat = function () {
            return d.sendWithPromise("RedactionAnnot.getUseRepeat", { redaction: this.id })
          }),
          (d.RedactionAnnot.prototype.setUseRepeat = function (e) {
            return (
              void 0 === e && (e = !1),
              h(arguments.length, 0, "setUseRepeat", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("RedactionAnnot.setUseRepeat", { redaction: this.id, userepeat: e })
            )
          }),
          (d.RedactionAnnot.prototype.getOverlayTextAppearance = function () {
            return d.sendWithPromise("RedactionAnnot.getOverlayTextAppearance", {
              redaction: this.id,
            })
          }),
          (d.RedactionAnnot.prototype.setOverlayTextAppearance = function (e) {
            return (
              h(arguments.length, 1, "setOverlayTextAppearance", "(string)", [[e, "string"]]),
              d.sendWithPromise("RedactionAnnot.setOverlayTextAppearance", {
                redaction: this.id,
                app: e,
              })
            )
          }),
          (d.RedactionAnnot.prototype.getQuadForm = function () {
            return d.sendWithPromise("RedactionAnnot.getQuadForm", { redaction: this.id })
          }),
          (d.RedactionAnnot.prototype.setQuadForm = function (e) {
            return (
              void 0 === e && (e = d.RedactionAnnot.QuadForm.e_LeftJustified),
              h(arguments.length, 0, "setQuadForm", "(number)", [[e, "number"]]),
              d.sendWithPromise("RedactionAnnot.setQuadForm", { redaction: this.id, form: e })
            )
          }),
          (d.RedactionAnnot.prototype.getAppFormXO = function () {
            return d
              .sendWithPromise("RedactionAnnot.getAppFormXO", { redaction: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.RubberStampAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("rubberStampAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.RubberStampAnnot, e)
              })
            )
          }),
          (d.RubberStampAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d
                .sendWithPromise("rubberStampAnnotCreateFromAnnot", { ann: e.id })
                .then(function (e) {
                  return p(d.RubberStampAnnot, e)
                })
            )
          }),
          (d.RubberStampAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("rubberStampAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.RubberStampAnnot, e)
              })
            )
          }),
          (d.RubberStampAnnot.createCustom = function (e, t, n) {
            return (
              h(arguments.length, 3, "createCustom", "(PDFNet.SDFDoc, PDFNet.Rect, PDFNet.Obj)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
                [n, "Object", d.Obj, "Obj"],
              ]),
              l("createCustom", [[t, 1]]),
              d
                .sendWithPromise("rubberStampAnnotCreateCustom", {
                  doc: e.id,
                  pos: t,
                  form_xobject: n.id,
                })
                .then(function (e) {
                  return p(d.RubberStampAnnot, e)
                })
            )
          }),
          (d.RubberStampAnnot.prototype.getIcon = function () {
            return d.sendWithPromise("RubberStampAnnot.getIcon", { stamp: this.id })
          }),
          (d.RubberStampAnnot.prototype.setIcon = function (e) {
            return (
              void 0 === e && (e = d.RubberStampAnnot.Icon.e_Draft),
              h(arguments.length, 0, "setIcon", "(number)", [[e, "number"]]),
              d.sendWithPromise("RubberStampAnnot.setIcon", { stamp: this.id, type: e })
            )
          }),
          (d.RubberStampAnnot.prototype.setIconDefault = function () {
            return d.sendWithPromise("RubberStampAnnot.setIconDefault", { stamp: this.id })
          }),
          (d.RubberStampAnnot.prototype.getIconName = function () {
            return d.sendWithPromise("RubberStampAnnot.getIconName", { stamp: this.id })
          }),
          (d.RubberStampAnnot.prototype.setIconName = function (e) {
            return (
              h(arguments.length, 1, "setIconName", "(string)", [[e, "string"]]),
              d.sendWithPromise("RubberStampAnnot.setIconName", { stamp: this.id, iconstring: e })
            )
          }),
          (d.ScreenAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("screenAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.ScreenAnnot, e)
              })
            )
          }),
          (d.ScreenAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("screenAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.ScreenAnnot, e)
              })
            )
          }),
          (d.ScreenAnnot.prototype.getTitle = function () {
            return d.sendWithPromise("ScreenAnnot.getTitle", { s: this.id })
          }),
          (d.ScreenAnnot.prototype.setTitle = function (e) {
            return (
              h(arguments.length, 1, "setTitle", "(string)", [[e, "string"]]),
              d.sendWithPromise("ScreenAnnot.setTitle", { s: this.id, title: e })
            )
          }),
          (d.ScreenAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("screenAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.ScreenAnnot, e)
              })
            )
          }),
          (d.ScreenAnnot.prototype.getAction = function () {
            return d.sendWithPromise("ScreenAnnot.getAction", { s: this.id }).then(function (e) {
              return p(d.Action, e)
            })
          }),
          (d.ScreenAnnot.prototype.setAction = function (e) {
            return (
              h(arguments.length, 1, "setAction", "(PDFNet.Action)", [
                [e, "Object", d.Action, "Action"],
              ]),
              d.sendWithPromise("ScreenAnnot.setAction", { s: this.id, action: e.id })
            )
          }),
          (d.ScreenAnnot.prototype.getBorderColor = function () {
            return d
              .sendWithPromise("ScreenAnnot.getBorderColor", { s: this.id })
              .then(function (e) {
                return o(d.ColorPt, e)
              })
          }),
          (d.ScreenAnnot.prototype.setBorderColor = function (e, t) {
            return (
              h(arguments.length, 2, "setBorderColor", "(PDFNet.ColorPt, number)", [
                [e, "Object", d.ColorPt, "ColorPt"],
                [t, "number"],
              ]),
              d.sendWithPromise("ScreenAnnot.setBorderColor", { s: this.id, col: e.id, numcomp: t })
            )
          }),
          (d.ScreenAnnot.prototype.getBorderColorCompNum = function () {
            return d.sendWithPromise("ScreenAnnot.getBorderColorCompNum", { s: this.id })
          }),
          (d.ScreenAnnot.prototype.getBackgroundColorCompNum = function () {
            return d.sendWithPromise("ScreenAnnot.getBackgroundColorCompNum", { s: this.id })
          }),
          (d.ScreenAnnot.prototype.getBackgroundColor = function () {
            return d
              .sendWithPromise("ScreenAnnot.getBackgroundColor", { s: this.id })
              .then(function (e) {
                return o(d.ColorPt, e)
              })
          }),
          (d.ScreenAnnot.prototype.setBackgroundColor = function (e, t) {
            return (
              h(arguments.length, 2, "setBackgroundColor", "(PDFNet.ColorPt, number)", [
                [e, "Object", d.ColorPt, "ColorPt"],
                [t, "number"],
              ]),
              d.sendWithPromise("ScreenAnnot.setBackgroundColor", {
                s: this.id,
                col: e.id,
                numcomp: t,
              })
            )
          }),
          (d.ScreenAnnot.prototype.getStaticCaptionText = function () {
            return d.sendWithPromise("ScreenAnnot.getStaticCaptionText", { s: this.id })
          }),
          (d.ScreenAnnot.prototype.setStaticCaptionText = function (e) {
            return (
              h(arguments.length, 1, "setStaticCaptionText", "(string)", [[e, "string"]]),
              d.sendWithPromise("ScreenAnnot.setStaticCaptionText", { s: this.id, contents: e })
            )
          }),
          (d.ScreenAnnot.prototype.getRolloverCaptionText = function () {
            return d.sendWithPromise("ScreenAnnot.getRolloverCaptionText", { s: this.id })
          }),
          (d.ScreenAnnot.prototype.setRolloverCaptionText = function (e) {
            return (
              h(arguments.length, 1, "setRolloverCaptionText", "(string)", [[e, "string"]]),
              d.sendWithPromise("ScreenAnnot.setRolloverCaptionText", { s: this.id, contents: e })
            )
          }),
          (d.ScreenAnnot.prototype.getMouseDownCaptionText = function () {
            return d.sendWithPromise("ScreenAnnot.getMouseDownCaptionText", { s: this.id })
          }),
          (d.ScreenAnnot.prototype.setMouseDownCaptionText = function (e) {
            return (
              h(arguments.length, 1, "setMouseDownCaptionText", "(string)", [[e, "string"]]),
              d.sendWithPromise("ScreenAnnot.setMouseDownCaptionText", { s: this.id, contents: e })
            )
          }),
          (d.ScreenAnnot.prototype.getStaticIcon = function () {
            return d
              .sendWithPromise("ScreenAnnot.getStaticIcon", { s: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.ScreenAnnot.prototype.setStaticIcon = function (e) {
            return (
              h(arguments.length, 1, "setStaticIcon", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("ScreenAnnot.setStaticIcon", { s: this.id, icon: e.id })
            )
          }),
          (d.ScreenAnnot.prototype.getRolloverIcon = function () {
            return d
              .sendWithPromise("ScreenAnnot.getRolloverIcon", { s: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.ScreenAnnot.prototype.setRolloverIcon = function (e) {
            return (
              h(arguments.length, 1, "setRolloverIcon", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("ScreenAnnot.setRolloverIcon", { s: this.id, icon: e.id })
            )
          }),
          (d.ScreenAnnot.prototype.getMouseDownIcon = function () {
            return d
              .sendWithPromise("ScreenAnnot.getMouseDownIcon", { s: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.ScreenAnnot.prototype.setMouseDownIcon = function (e) {
            return (
              h(arguments.length, 1, "setMouseDownIcon", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("ScreenAnnot.setMouseDownIcon", { s: this.id, icon: e.id })
            )
          }),
          (d.ScreenAnnot.prototype.getScaleType = function () {
            return d.sendWithPromise("ScreenAnnot.getScaleType", { s: this.id })
          }),
          (d.ScreenAnnot.prototype.setScaleType = function (e) {
            return (
              h(arguments.length, 1, "setScaleType", "(number)", [[e, "number"]]),
              d.sendWithPromise("ScreenAnnot.setScaleType", { s: this.id, st: e })
            )
          }),
          (d.ScreenAnnot.prototype.getIconCaptionRelation = function () {
            return d.sendWithPromise("ScreenAnnot.getIconCaptionRelation", { s: this.id })
          }),
          (d.ScreenAnnot.prototype.setIconCaptionRelation = function (e) {
            return (
              h(arguments.length, 1, "setIconCaptionRelation", "(number)", [[e, "number"]]),
              d.sendWithPromise("ScreenAnnot.setIconCaptionRelation", { s: this.id, icr: e })
            )
          }),
          (d.ScreenAnnot.prototype.getScaleCondition = function () {
            return d.sendWithPromise("ScreenAnnot.getScaleCondition", { s: this.id })
          }),
          (d.ScreenAnnot.prototype.setScaleCondition = function (e) {
            return (
              h(arguments.length, 1, "setScaleCondition", "(number)", [[e, "number"]]),
              d.sendWithPromise("ScreenAnnot.setScaleCondition", { s: this.id, sc: e })
            )
          }),
          (d.ScreenAnnot.prototype.getFitFull = function () {
            return d.sendWithPromise("ScreenAnnot.getFitFull", { s: this.id })
          }),
          (d.ScreenAnnot.prototype.setFitFull = function (e) {
            return (
              h(arguments.length, 1, "setFitFull", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("ScreenAnnot.setFitFull", { s: this.id, ff: e })
            )
          }),
          (d.ScreenAnnot.prototype.getHIconLeftOver = function () {
            return d.sendWithPromise("ScreenAnnot.getHIconLeftOver", { s: this.id })
          }),
          (d.ScreenAnnot.prototype.setHIconLeftOver = function (e) {
            return (
              h(arguments.length, 1, "setHIconLeftOver", "(number)", [[e, "number"]]),
              d.sendWithPromise("ScreenAnnot.setHIconLeftOver", { s: this.id, hl: e })
            )
          }),
          (d.ScreenAnnot.prototype.getVIconLeftOver = function () {
            return d.sendWithPromise("ScreenAnnot.getVIconLeftOver", { s: this.id })
          }),
          (d.ScreenAnnot.prototype.setVIconLeftOver = function (e) {
            return (
              h(arguments.length, 1, "setVIconLeftOver", "(number)", [[e, "number"]]),
              d.sendWithPromise("ScreenAnnot.setVIconLeftOver", { s: this.id, vl: e })
            )
          }),
          (d.SoundAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("soundAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.SoundAnnot, e)
              })
            )
          }),
          (d.SoundAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("soundAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.SoundAnnot, e)
              })
            )
          }),
          (d.SoundAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("soundAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.SoundAnnot, e)
              })
            )
          }),
          (d.SoundAnnot.createWithData = function (e, t, n, i, r, o) {
            return (
              h(
                arguments.length,
                6,
                "createWithData",
                "(PDFNet.SDFDoc, PDFNet.Rect, PDFNet.Filter, number, number, number)",
                [
                  [e, "SDFDoc"],
                  [t, "Structure", d.Rect, "Rect"],
                  [n, "Object", d.Filter, "Filter"],
                  [i, "number"],
                  [r, "number"],
                  [o, "number"],
                ]
              ),
              l("createWithData", [[t, 1]]),
              0 != n.id && O(n.id),
              d
                .sendWithPromise("soundAnnotCreateWithData", {
                  doc: e.id,
                  pos: t,
                  no_own_stream: n.id,
                  sample_bits: i,
                  sample_freq: r,
                  num_channels: o,
                })
                .then(function (e) {
                  return p(d.SoundAnnot, e)
                })
            )
          }),
          (d.SoundAnnot.createAtPoint = function (e, t) {
            return (
              h(arguments.length, 2, "createAtPoint", "(PDFNet.SDFDoc, PDFNet.Point)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Point, "Point"],
              ]),
              l("createAtPoint", [[t, 1]]),
              d
                .sendWithPromise("soundAnnotCreateAtPoint", { doc: e.id, pos: t })
                .then(function (e) {
                  return p(d.SoundAnnot, e)
                })
            )
          }),
          (d.SoundAnnot.prototype.getSoundStream = function () {
            return d
              .sendWithPromise("SoundAnnot.getSoundStream", { sound: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.SoundAnnot.prototype.setSoundStream = function (e) {
            return (
              h(arguments.length, 1, "setSoundStream", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("SoundAnnot.setSoundStream", { sound: this.id, icon: e.id })
            )
          }),
          (d.SoundAnnot.prototype.getIcon = function () {
            return d.sendWithPromise("SoundAnnot.getIcon", { sound: this.id })
          }),
          (d.SoundAnnot.prototype.setIcon = function (e) {
            return (
              void 0 === e && (e = d.SoundAnnot.Icon.e_Speaker),
              h(arguments.length, 0, "setIcon", "(number)", [[e, "number"]]),
              d.sendWithPromise("SoundAnnot.setIcon", { sound: this.id, type: e })
            )
          }),
          (d.SoundAnnot.prototype.getIconName = function () {
            return d.sendWithPromise("SoundAnnot.getIconName", { sound: this.id })
          }),
          (d.SoundAnnot.prototype.setIconName = function (e) {
            return (
              h(arguments.length, 1, "setIconName", "(string)", [[e, "string"]]),
              d.sendWithPromise("SoundAnnot.setIconName", { sound: this.id, type: e })
            )
          }),
          (d.SquareAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("squareAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.SquareAnnot, e)
              })
            )
          }),
          (d.SquareAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("squareAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.SquareAnnot, e)
              })
            )
          }),
          (d.SquareAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("squareAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.SquareAnnot, e)
              })
            )
          }),
          (d.SquareAnnot.prototype.getInteriorColor = function () {
            return d
              .sendWithPromise("SquareAnnot.getInteriorColor", { square: this.id })
              .then(function (e) {
                return o(d.ColorPt, e)
              })
          }),
          (d.SquareAnnot.prototype.getInteriorColorCompNum = function () {
            return d.sendWithPromise("SquareAnnot.getInteriorColorCompNum", { square: this.id })
          }),
          (d.SquareAnnot.prototype.setInteriorColorDefault = function (e) {
            return (
              h(arguments.length, 1, "setInteriorColorDefault", "(PDFNet.ColorPt)", [
                [e, "Object", d.ColorPt, "ColorPt"],
              ]),
              d.sendWithPromise("SquareAnnot.setInteriorColorDefault", {
                square: this.id,
                col: e.id,
              })
            )
          }),
          (d.SquareAnnot.prototype.setInteriorColor = function (e, t) {
            return (
              h(arguments.length, 2, "setInteriorColor", "(PDFNet.ColorPt, number)", [
                [e, "Object", d.ColorPt, "ColorPt"],
                [t, "number"],
              ]),
              d.sendWithPromise("SquareAnnot.setInteriorColor", {
                square: this.id,
                col: e.id,
                numcomp: t,
              })
            )
          }),
          (d.SquareAnnot.prototype.getContentRect = function () {
            return d
              .sendWithPromise("SquareAnnot.getContentRect", { square: this.id })
              .then(function (e) {
                return new d.Rect(e)
              })
          }),
          (d.SquareAnnot.prototype.setContentRect = function (e) {
            return (
              h(arguments.length, 1, "setContentRect", "(PDFNet.Rect)", [
                [e, "Structure", d.Rect, "Rect"],
              ]),
              l("setContentRect", [[e, 0]]),
              d.sendWithPromise("SquareAnnot.setContentRect", { square: this.id, cr: e })
            )
          }),
          (d.SquareAnnot.prototype.getPadding = function () {
            return d
              .sendWithPromise("SquareAnnot.getPadding", { square: this.id })
              .then(function (e) {
                return new d.Rect(e)
              })
          }),
          (d.SquareAnnot.prototype.setPadding = function (e) {
            return (
              h(arguments.length, 1, "setPadding", "(PDFNet.Rect)", [
                [e, "Structure", d.Rect, "Rect"],
              ]),
              l("setPadding", [[e, 0]]),
              d.sendWithPromise("SquareAnnot.setPadding", { square: this.id, cr: e })
            )
          }),
          (d.SquigglyAnnot.createFromObj = function (e) {
            return (
              h(arguments.length, 1, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("squigglyAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.SquigglyAnnot, e)
              })
            )
          }),
          (d.SquigglyAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("squigglyAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.SquigglyAnnot, e)
              })
            )
          }),
          (d.SquigglyAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("squigglyAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.SquigglyAnnot, e)
              })
            )
          }),
          (d.StrikeOutAnnot.createFromObj = function (e) {
            return (
              h(arguments.length, 1, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("strikeOutAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.StrikeOutAnnot, e)
              })
            )
          }),
          (d.StrikeOutAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("strikeOutAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.StrikeOutAnnot, e)
              })
            )
          }),
          (d.StrikeOutAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("strikeOutAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.StrikeOutAnnot, e)
              })
            )
          }),
          (d.TextAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("textAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.TextAnnot, e)
              })
            )
          }),
          (d.TextAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("textAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.TextAnnot, e)
              })
            )
          }),
          (d.TextAnnot.createAtPoint = function (e, t) {
            return (
              h(arguments.length, 2, "createAtPoint", "(PDFNet.SDFDoc, PDFNet.Point)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Point, "Point"],
              ]),
              l("createAtPoint", [[t, 1]]),
              d.sendWithPromise("textAnnotCreateAtPoint", { doc: e.id, pos: t }).then(function (e) {
                return p(d.TextAnnot, e)
              })
            )
          }),
          (d.TextAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("textAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.TextAnnot, e)
              })
            )
          }),
          (d.TextAnnot.prototype.isOpen = function () {
            return d.sendWithPromise("TextAnnot.isOpen", { text: this.id })
          }),
          (d.TextAnnot.prototype.setOpen = function (e) {
            return (
              h(arguments.length, 1, "setOpen", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("TextAnnot.setOpen", { text: this.id, isopen: e })
            )
          }),
          (d.TextAnnot.prototype.getIcon = function () {
            return d.sendWithPromise("TextAnnot.getIcon", { text: this.id })
          }),
          (d.TextAnnot.prototype.setIcon = function (e) {
            return (
              void 0 === e && (e = d.TextAnnot.Icon.e_Note),
              h(arguments.length, 0, "setIcon", "(number)", [[e, "number"]]),
              d.sendWithPromise("TextAnnot.setIcon", { text: this.id, icon: e })
            )
          }),
          (d.TextAnnot.prototype.setIconDefault = function () {
            return d.sendWithPromise("TextAnnot.setIconDefault", { text: this.id })
          }),
          (d.TextAnnot.prototype.getIconName = function () {
            return d.sendWithPromise("TextAnnot.getIconName", { text: this.id })
          }),
          (d.TextAnnot.prototype.setIconName = function (e) {
            return (
              h(arguments.length, 1, "setIconName", "(string)", [[e, "string"]]),
              d.sendWithPromise("TextAnnot.setIconName", { text: this.id, icon: e })
            )
          }),
          (d.TextAnnot.prototype.getState = function () {
            return d.sendWithPromise("TextAnnot.getState", { text: this.id })
          }),
          (d.TextAnnot.prototype.setState = function (e) {
            return (
              void 0 === e && (e = ""),
              h(arguments.length, 0, "setState", "(string)", [[e, "string"]]),
              d.sendWithPromise("TextAnnot.setState", { text: this.id, state: e })
            )
          }),
          (d.TextAnnot.prototype.getStateModel = function () {
            return d.sendWithPromise("TextAnnot.getStateModel", { text: this.id })
          }),
          (d.TextAnnot.prototype.setStateModel = function (e) {
            return (
              h(arguments.length, 1, "setStateModel", "(string)", [[e, "string"]]),
              d.sendWithPromise("TextAnnot.setStateModel", { text: this.id, sm: e })
            )
          }),
          (d.TextAnnot.prototype.getAnchorPosition = function (t) {
            return (
              h(arguments.length, 1, "getAnchorPosition", "(PDFNet.Point)", [
                [t, "Structure", d.Point, "Point"],
              ]),
              l("getAnchorPosition", [[t, 0]]),
              (t.yieldFunction = "TextAnnot.getAnchorPosition"),
              d
                .sendWithPromise("TextAnnot.getAnchorPosition", { text: this.id, anchor: t })
                .then(function (e) {
                  ;(t.yieldFunction = void 0), m(e, t)
                })
            )
          }),
          (d.TextAnnot.prototype.setAnchorPosition = function (e) {
            return (
              h(arguments.length, 1, "setAnchorPosition", "(PDFNet.Point)", [
                [e, "Structure", d.Point, "Point"],
              ]),
              l("setAnchorPosition", [[e, 0]]),
              d.sendWithPromise("TextAnnot.setAnchorPosition", { text: this.id, anchor: e })
            )
          }),
          (d.UnderlineAnnot.createFromObj = function (e) {
            return (
              h(arguments.length, 1, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("underlineAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.UnderlineAnnot, e)
              })
            )
          }),
          (d.UnderlineAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("underlineAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.UnderlineAnnot, e)
              })
            )
          }),
          (d.UnderlineAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("underlineAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.UnderlineAnnot, e)
              })
            )
          }),
          (d.WatermarkAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("watermarkAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.WatermarkAnnot, e)
              })
            )
          }),
          (d.WatermarkAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("watermarkAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.WatermarkAnnot, e)
              })
            )
          }),
          (d.WatermarkAnnot.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, PDFNet.Rect)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
              ]),
              l("create", [[t, 1]]),
              d.sendWithPromise("watermarkAnnotCreate", { doc: e.id, pos: t }).then(function (e) {
                return p(d.WatermarkAnnot, e)
              })
            )
          }),
          (d.TextMarkupAnnot.createFromObj = function (e) {
            return (
              h(arguments.length, 1, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("textMarkupAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.TextMarkupAnnot, e)
              })
            )
          }),
          (d.TextMarkupAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("textMarkupAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.TextMarkupAnnot, e)
              })
            )
          }),
          (d.TextMarkupAnnot.prototype.getQuadPointCount = function () {
            return d.sendWithPromise("TextMarkupAnnot.getQuadPointCount", { textmarkup: this.id })
          }),
          (d.TextMarkupAnnot.prototype.getQuadPoint = function (e) {
            return (
              h(arguments.length, 1, "getQuadPoint", "(number)", [[e, "number"]]),
              d.sendWithPromise("TextMarkupAnnot.getQuadPoint", { textmarkup: this.id, idx: e })
            )
          }),
          (d.TextMarkupAnnot.prototype.setQuadPoint = function (e, t) {
            return (
              h(arguments.length, 2, "setQuadPoint", "(number, PDFNet.QuadPoint)", [
                [e, "number"],
                [t, "Structure", d.QuadPoint, "QuadPoint"],
              ]),
              l("setQuadPoint", [[t, 1]]),
              d.sendWithPromise("TextMarkupAnnot.setQuadPoint", {
                textmarkup: this.id,
                idx: e,
                qp: t,
              })
            )
          }),
          (d.WidgetAnnot.create = function (e, t, n) {
            return (
              h(arguments.length, 3, "create", "(PDFNet.SDFDoc, PDFNet.Rect, PDFNet.Field)", [
                [e, "SDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
                [n, "Structure", d.Field, "Field"],
              ]),
              l("create", [
                [t, 1],
                [n, 2],
              ]),
              (n.yieldFunction = "WidgetAnnot.create"),
              d
                .sendWithPromise("widgetAnnotCreate", { doc: e.id, pos: t, field: n })
                .then(function (e) {
                  return (
                    (n.yieldFunction = void 0),
                    (e.result = p(d.WidgetAnnot, e.result)),
                    m(e.field, n),
                    e.result
                  )
                })
            )
          }),
          (d.WidgetAnnot.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("widgetAnnotCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.WidgetAnnot, e)
              })
            )
          }),
          (d.WidgetAnnot.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("widgetAnnotCreateFromAnnot", { ann: e.id }).then(function (e) {
                return p(d.WidgetAnnot, e)
              })
            )
          }),
          (d.WidgetAnnot.prototype.getField = function () {
            return d
              .sendWithPromise("WidgetAnnot.getField", { widget: this.id })
              .then(function (e) {
                return new d.Field(e)
              })
          }),
          (d.WidgetAnnot.prototype.getHighlightingMode = function () {
            return d.sendWithPromise("WidgetAnnot.getHighlightingMode", { widget: this.id })
          }),
          (d.WidgetAnnot.prototype.setHighlightingMode = function (e) {
            return (
              void 0 === e && (e = d.WidgetAnnot.HighlightingMode.e_invert),
              h(arguments.length, 0, "setHighlightingMode", "(number)", [[e, "number"]]),
              d.sendWithPromise("WidgetAnnot.setHighlightingMode", { widget: this.id, value: e })
            )
          }),
          (d.WidgetAnnot.prototype.getAction = function () {
            return d
              .sendWithPromise("WidgetAnnot.getAction", { widget: this.id })
              .then(function (e) {
                return p(d.Action, e)
              })
          }),
          (d.WidgetAnnot.prototype.setAction = function (e) {
            return (
              h(arguments.length, 1, "setAction", "(PDFNet.Action)", [
                [e, "Object", d.Action, "Action"],
              ]),
              d.sendWithPromise("WidgetAnnot.setAction", { widget: this.id, action: e.id })
            )
          }),
          (d.WidgetAnnot.prototype.getBorderColor = function () {
            return d
              .sendWithPromise("WidgetAnnot.getBorderColor", { widget: this.id })
              .then(function (e) {
                return o(d.ColorPt, e)
              })
          }),
          (d.WidgetAnnot.prototype.setBorderColor = function (e, t) {
            return (
              h(arguments.length, 2, "setBorderColor", "(PDFNet.ColorPt, number)", [
                [e, "Object", d.ColorPt, "ColorPt"],
                [t, "number"],
              ]),
              d.sendWithPromise("WidgetAnnot.setBorderColor", {
                widget: this.id,
                col: e.id,
                compnum: t,
              })
            )
          }),
          (d.WidgetAnnot.prototype.getBorderColorCompNum = function () {
            return d.sendWithPromise("WidgetAnnot.getBorderColorCompNum", { widget: this.id })
          }),
          (d.WidgetAnnot.prototype.getBackgroundColorCompNum = function () {
            return d.sendWithPromise("WidgetAnnot.getBackgroundColorCompNum", { widget: this.id })
          }),
          (d.WidgetAnnot.prototype.getBackgroundColor = function () {
            return d
              .sendWithPromise("WidgetAnnot.getBackgroundColor", { widget: this.id })
              .then(function (e) {
                return o(d.ColorPt, e)
              })
          }),
          (d.WidgetAnnot.prototype.setBackgroundColor = function (e, t) {
            return (
              h(arguments.length, 2, "setBackgroundColor", "(PDFNet.ColorPt, number)", [
                [e, "Object", d.ColorPt, "ColorPt"],
                [t, "number"],
              ]),
              d.sendWithPromise("WidgetAnnot.setBackgroundColor", {
                widget: this.id,
                col: e.id,
                compnum: t,
              })
            )
          }),
          (d.WidgetAnnot.prototype.getStaticCaptionText = function () {
            return d.sendWithPromise("WidgetAnnot.getStaticCaptionText", { widget: this.id })
          }),
          (d.WidgetAnnot.prototype.setStaticCaptionText = function (e) {
            return (
              h(arguments.length, 1, "setStaticCaptionText", "(string)", [[e, "string"]]),
              d.sendWithPromise("WidgetAnnot.setStaticCaptionText", {
                widget: this.id,
                contents: e,
              })
            )
          }),
          (d.WidgetAnnot.prototype.getRolloverCaptionText = function () {
            return d.sendWithPromise("WidgetAnnot.getRolloverCaptionText", { widget: this.id })
          }),
          (d.WidgetAnnot.prototype.setRolloverCaptionText = function (e) {
            return (
              h(arguments.length, 1, "setRolloverCaptionText", "(string)", [[e, "string"]]),
              d.sendWithPromise("WidgetAnnot.setRolloverCaptionText", {
                widget: this.id,
                contents: e,
              })
            )
          }),
          (d.WidgetAnnot.prototype.getMouseDownCaptionText = function () {
            return d.sendWithPromise("WidgetAnnot.getMouseDownCaptionText", { widget: this.id })
          }),
          (d.WidgetAnnot.prototype.setMouseDownCaptionText = function (e) {
            return (
              h(arguments.length, 1, "setMouseDownCaptionText", "(string)", [[e, "string"]]),
              d.sendWithPromise("WidgetAnnot.setMouseDownCaptionText", {
                widget: this.id,
                contents: e,
              })
            )
          }),
          (d.WidgetAnnot.prototype.getStaticIcon = function () {
            return d
              .sendWithPromise("WidgetAnnot.getStaticIcon", { widget: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.WidgetAnnot.prototype.setStaticIcon = function (e) {
            return (
              h(arguments.length, 1, "setStaticIcon", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("WidgetAnnot.setStaticIcon", { widget: this.id, icon: e.id })
            )
          }),
          (d.WidgetAnnot.prototype.getRolloverIcon = function () {
            return d
              .sendWithPromise("WidgetAnnot.getRolloverIcon", { widget: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.WidgetAnnot.prototype.setRolloverIcon = function (e) {
            return (
              h(arguments.length, 1, "setRolloverIcon", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("WidgetAnnot.setRolloverIcon", { widget: this.id, icon: e.id })
            )
          }),
          (d.WidgetAnnot.prototype.getMouseDownIcon = function () {
            return d
              .sendWithPromise("WidgetAnnot.getMouseDownIcon", { widget: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.WidgetAnnot.prototype.setMouseDownIcon = function (e) {
            return (
              h(arguments.length, 1, "setMouseDownIcon", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("WidgetAnnot.setMouseDownIcon", { widget: this.id, icon: e.id })
            )
          }),
          (d.WidgetAnnot.prototype.getScaleType = function () {
            return d.sendWithPromise("WidgetAnnot.getScaleType", { widget: this.id })
          }),
          (d.WidgetAnnot.prototype.setScaleType = function (e) {
            return (
              h(arguments.length, 1, "setScaleType", "(number)", [[e, "number"]]),
              d.sendWithPromise("WidgetAnnot.setScaleType", { widget: this.id, st: e })
            )
          }),
          (d.WidgetAnnot.prototype.getIconCaptionRelation = function () {
            return d.sendWithPromise("WidgetAnnot.getIconCaptionRelation", { widget: this.id })
          }),
          (d.WidgetAnnot.prototype.setIconCaptionRelation = function (e) {
            return (
              h(arguments.length, 1, "setIconCaptionRelation", "(number)", [[e, "number"]]),
              d.sendWithPromise("WidgetAnnot.setIconCaptionRelation", { widget: this.id, icr: e })
            )
          }),
          (d.WidgetAnnot.prototype.getScaleCondition = function () {
            return d.sendWithPromise("WidgetAnnot.getScaleCondition", { widget: this.id })
          }),
          (d.WidgetAnnot.prototype.setScaleCondition = function (e) {
            return (
              h(arguments.length, 1, "setScaleCondition", "(number)", [[e, "number"]]),
              d.sendWithPromise("WidgetAnnot.setScaleCondition", { widget: this.id, sd: e })
            )
          }),
          (d.WidgetAnnot.prototype.getFitFull = function () {
            return d.sendWithPromise("WidgetAnnot.getFitFull", { widget: this.id })
          }),
          (d.WidgetAnnot.prototype.setFitFull = function (e) {
            return (
              h(arguments.length, 1, "setFitFull", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("WidgetAnnot.setFitFull", { widget: this.id, ff: e })
            )
          }),
          (d.WidgetAnnot.prototype.getHIconLeftOver = function () {
            return d.sendWithPromise("WidgetAnnot.getHIconLeftOver", { widget: this.id })
          }),
          (d.WidgetAnnot.prototype.setHIconLeftOver = function (e) {
            return (
              h(arguments.length, 1, "setHIconLeftOver", "(number)", [[e, "number"]]),
              d.sendWithPromise("WidgetAnnot.setHIconLeftOver", { widget: this.id, hl: e })
            )
          }),
          (d.WidgetAnnot.prototype.getVIconLeftOver = function () {
            return d.sendWithPromise("WidgetAnnot.getVIconLeftOver", { widget: this.id })
          }),
          (d.WidgetAnnot.prototype.setVIconLeftOver = function (e) {
            return (
              h(arguments.length, 1, "setVIconLeftOver", "(number)", [[e, "number"]]),
              d.sendWithPromise("WidgetAnnot.setVIconLeftOver", { widget: this.id, vl: e })
            )
          }),
          (d.WidgetAnnot.prototype.setFontSize = function (e) {
            return (
              h(arguments.length, 1, "setFontSize", "(number)", [[e, "number"]]),
              d.sendWithPromise("WidgetAnnot.setFontSize", { widget: this.id, font_size: e })
            )
          }),
          (d.WidgetAnnot.prototype.setTextColor = function (e, t) {
            return (
              h(arguments.length, 2, "setTextColor", "(PDFNet.ColorPt, number)", [
                [e, "Object", d.ColorPt, "ColorPt"],
                [t, "number"],
              ]),
              d.sendWithPromise("WidgetAnnot.setTextColor", {
                widget: this.id,
                color: e.id,
                col_comp: t,
              })
            )
          }),
          (d.WidgetAnnot.prototype.setFont = function (e) {
            return (
              h(arguments.length, 1, "setFont", "(PDFNet.Font)", [[e, "Object", d.Font, "Font"]]),
              d.sendWithPromise("WidgetAnnot.setFont", { widget: this.id, font: e.id })
            )
          }),
          (d.WidgetAnnot.prototype.getFontSize = function () {
            return d.sendWithPromise("WidgetAnnot.getFontSize", { widget: this.id })
          }),
          (d.WidgetAnnot.prototype.getTextColor = function () {
            return d
              .sendWithPromise("WidgetAnnot.getTextColor", { widget: this.id })
              .then(function (e) {
                return (e.col = o(d.ColorPt, e.col)), e
              })
          }),
          (d.WidgetAnnot.prototype.getFont = function () {
            return d.sendWithPromise("WidgetAnnot.getFont", { widget: this.id }).then(function (e) {
              return o(d.Font, e)
            })
          }),
          (d.SignatureWidget.create = function (e, t, n) {
            return (
              void 0 === n && (n = ""),
              h(arguments.length, 2, "create", "(PDFNet.PDFDoc, PDFNet.Rect, string)", [
                [e, "PDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
                [n, "string"],
              ]),
              l("create", [[t, 1]]),
              d
                .sendWithPromise("signatureWidgetCreate", { doc: e.id, pos: t, field_name: n })
                .then(function (e) {
                  return p(d.SignatureWidget, e)
                })
            )
          }),
          (d.SignatureWidget.createWithField = function (e, t, n) {
            return (
              h(
                arguments.length,
                3,
                "createWithField",
                "(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.Field)",
                [
                  [e, "PDFDoc"],
                  [t, "Structure", d.Rect, "Rect"],
                  [n, "Structure", d.Field, "Field"],
                ]
              ),
              l("createWithField", [
                [t, 1],
                [n, 2],
              ]),
              d
                .sendWithPromise("signatureWidgetCreateWithField", { doc: e.id, pos: t, field: n })
                .then(function (e) {
                  return p(d.SignatureWidget, e)
                })
            )
          }),
          (d.SignatureWidget.createWithDigitalSignatureField = function (e, t, n) {
            return (
              h(
                arguments.length,
                3,
                "createWithDigitalSignatureField",
                "(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.DigitalSignatureField)",
                [
                  [e, "PDFDoc"],
                  [t, "Structure", d.Rect, "Rect"],
                  [n, "Structure", d.DigitalSignatureField, "DigitalSignatureField"],
                ]
              ),
              l("createWithDigitalSignatureField", [
                [t, 1],
                [n, 2],
              ]),
              d
                .sendWithPromise("signatureWidgetCreateWithDigitalSignatureField", {
                  doc: e.id,
                  pos: t,
                  field: n,
                })
                .then(function (e) {
                  return p(d.SignatureWidget, e)
                })
            )
          }),
          (d.SignatureWidget.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("signatureWidgetCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.SignatureWidget, e)
              })
            )
          }),
          (d.SignatureWidget.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d
                .sendWithPromise("signatureWidgetCreateFromAnnot", { annot: e.id })
                .then(function (e) {
                  return p(d.SignatureWidget, e)
                })
            )
          }),
          (d.SignatureWidget.prototype.createSignatureAppearance = function (e) {
            return (
              h(arguments.length, 1, "createSignatureAppearance", "(PDFNet.Image)", [
                [e, "Object", d.Image, "Image"],
              ]),
              d.sendWithPromise("SignatureWidget.createSignatureAppearance", {
                self: this.id,
                img: e.id,
              })
            )
          }),
          (d.SignatureWidget.prototype.getDigitalSignatureField = function () {
            return d
              .sendWithPromise("SignatureWidget.getDigitalSignatureField", { self: this.id })
              .then(function (e) {
                return new d.DigitalSignatureField(e)
              })
          }),
          (d.ComboBoxWidget.create = function (e, t, n) {
            return (
              void 0 === n && (n = ""),
              h(arguments.length, 2, "create", "(PDFNet.PDFDoc, PDFNet.Rect, string)", [
                [e, "PDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
                [n, "string"],
              ]),
              l("create", [[t, 1]]),
              d
                .sendWithPromise("comboBoxWidgetCreate", { doc: e.id, pos: t, field_name: n })
                .then(function (e) {
                  return p(d.ComboBoxWidget, e)
                })
            )
          }),
          (d.ComboBoxWidget.createWithField = function (e, t, n) {
            return (
              h(
                arguments.length,
                3,
                "createWithField",
                "(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.Field)",
                [
                  [e, "PDFDoc"],
                  [t, "Structure", d.Rect, "Rect"],
                  [n, "Structure", d.Field, "Field"],
                ]
              ),
              l("createWithField", [
                [t, 1],
                [n, 2],
              ]),
              d
                .sendWithPromise("comboBoxWidgetCreateWithField", { doc: e.id, pos: t, field: n })
                .then(function (e) {
                  return p(d.ComboBoxWidget, e)
                })
            )
          }),
          (d.ComboBoxWidget.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("comboBoxWidgetCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.ComboBoxWidget, e)
              })
            )
          }),
          (d.ComboBoxWidget.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d
                .sendWithPromise("comboBoxWidgetCreateFromAnnot", { annot: e.id })
                .then(function (e) {
                  return p(d.ComboBoxWidget, e)
                })
            )
          }),
          (d.ComboBoxWidget.prototype.addOption = function (e) {
            return (
              h(arguments.length, 1, "addOption", "(string)", [[e, "string"]]),
              d.sendWithPromise("ComboBoxWidget.addOption", { combobox: this.id, value: e })
            )
          }),
          (d.ComboBoxWidget.prototype.addOptions = function (e) {
            return (
              h(arguments.length, 1, "addOptions", "(Array<string>)", [[e, "Array"]]),
              d.sendWithPromise("ComboBoxWidget.addOptions", { combobox: this.id, opts_list: e })
            )
          }),
          (d.ComboBoxWidget.prototype.setSelectedOption = function (e) {
            return (
              h(arguments.length, 1, "setSelectedOption", "(string)", [[e, "string"]]),
              d.sendWithPromise("ComboBoxWidget.setSelectedOption", { combobox: this.id, value: e })
            )
          }),
          (d.ComboBoxWidget.prototype.getSelectedOption = function () {
            return d.sendWithPromise("ComboBoxWidget.getSelectedOption", { combobox: this.id })
          }),
          (d.ComboBoxWidget.prototype.replaceOptions = function (e) {
            return (
              h(arguments.length, 1, "replaceOptions", "(Array<string>)", [[e, "Array"]]),
              d.sendWithPromise("ComboBoxWidget.replaceOptions", {
                combobox: this.id,
                new_opts_list: e,
              })
            )
          }),
          (d.ComboBoxWidget.prototype.removeOption = function (e) {
            return (
              h(arguments.length, 1, "removeOption", "(string)", [[e, "string"]]),
              d.sendWithPromise("ComboBoxWidget.removeOption", { combobox: this.id, value: e })
            )
          }),
          (d.ListBoxWidget.create = function (e, t, n) {
            return (
              void 0 === n && (n = ""),
              h(arguments.length, 2, "create", "(PDFNet.PDFDoc, PDFNet.Rect, string)", [
                [e, "PDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
                [n, "string"],
              ]),
              l("create", [[t, 1]]),
              d
                .sendWithPromise("listBoxWidgetCreate", { doc: e.id, pos: t, field_name: n })
                .then(function (e) {
                  return p(d.ListBoxWidget, e)
                })
            )
          }),
          (d.ListBoxWidget.createWithField = function (e, t, n) {
            return (
              h(
                arguments.length,
                3,
                "createWithField",
                "(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.Field)",
                [
                  [e, "PDFDoc"],
                  [t, "Structure", d.Rect, "Rect"],
                  [n, "Structure", d.Field, "Field"],
                ]
              ),
              l("createWithField", [
                [t, 1],
                [n, 2],
              ]),
              d
                .sendWithPromise("listBoxWidgetCreateWithField", { doc: e.id, pos: t, field: n })
                .then(function (e) {
                  return p(d.ListBoxWidget, e)
                })
            )
          }),
          (d.ListBoxWidget.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("listBoxWidgetCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.ListBoxWidget, e)
              })
            )
          }),
          (d.ListBoxWidget.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("listBoxWidgetCreateFromAnnot", { annot: e.id }).then(function (e) {
                return p(d.ListBoxWidget, e)
              })
            )
          }),
          (d.ListBoxWidget.prototype.addOption = function (e) {
            return (
              h(arguments.length, 1, "addOption", "(string)", [[e, "string"]]),
              d.sendWithPromise("ListBoxWidget.addOption", { listbox: this.id, value: e })
            )
          }),
          (d.ListBoxWidget.prototype.addOptions = function (e) {
            return (
              h(arguments.length, 1, "addOptions", "(Array<string>)", [[e, "Array"]]),
              d.sendWithPromise("ListBoxWidget.addOptions", { listbox: this.id, opts_list: e })
            )
          }),
          (d.ListBoxWidget.prototype.setSelectedOptions = function (e) {
            return (
              h(arguments.length, 1, "setSelectedOptions", "(Array<string>)", [[e, "Array"]]),
              d.sendWithPromise("ListBoxWidget.setSelectedOptions", {
                listbox: this.id,
                selected_opts_list: e,
              })
            )
          }),
          (d.ListBoxWidget.prototype.replaceOptions = function (e) {
            return (
              h(arguments.length, 1, "replaceOptions", "(Array<string>)", [[e, "Array"]]),
              d.sendWithPromise("ListBoxWidget.replaceOptions", {
                listbox: this.id,
                new_opts_list: e,
              })
            )
          }),
          (d.ListBoxWidget.prototype.removeOption = function (e) {
            return (
              h(arguments.length, 1, "removeOption", "(string)", [[e, "string"]]),
              d.sendWithPromise("ListBoxWidget.removeOption", { listbox: this.id, value: e })
            )
          }),
          (d.TextWidget.create = function (e, t, n) {
            return (
              void 0 === n && (n = ""),
              h(arguments.length, 2, "create", "(PDFNet.PDFDoc, PDFNet.Rect, string)", [
                [e, "PDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
                [n, "string"],
              ]),
              l("create", [[t, 1]]),
              d
                .sendWithPromise("textWidgetCreate", { doc: e.id, pos: t, field_name: n })
                .then(function (e) {
                  return p(d.TextWidget, e)
                })
            )
          }),
          (d.TextWidget.createWithField = function (e, t, n) {
            return (
              h(
                arguments.length,
                3,
                "createWithField",
                "(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.Field)",
                [
                  [e, "PDFDoc"],
                  [t, "Structure", d.Rect, "Rect"],
                  [n, "Structure", d.Field, "Field"],
                ]
              ),
              l("createWithField", [
                [t, 1],
                [n, 2],
              ]),
              d
                .sendWithPromise("textWidgetCreateWithField", { doc: e.id, pos: t, field: n })
                .then(function (e) {
                  return p(d.TextWidget, e)
                })
            )
          }),
          (d.TextWidget.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("textWidgetCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.TextWidget, e)
              })
            )
          }),
          (d.TextWidget.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("textWidgetCreateFromAnnot", { annot: e.id }).then(function (e) {
                return p(d.TextWidget, e)
              })
            )
          }),
          (d.TextWidget.prototype.setText = function (e) {
            return (
              h(arguments.length, 1, "setText", "(string)", [[e, "string"]]),
              d.sendWithPromise("TextWidget.setText", { widget: this.id, text: e })
            )
          }),
          (d.TextWidget.prototype.getText = function () {
            return d.sendWithPromise("TextWidget.getText", { widget: this.id })
          }),
          (d.CheckBoxWidget.create = function (e, t, n) {
            return (
              void 0 === n && (n = ""),
              h(arguments.length, 2, "create", "(PDFNet.PDFDoc, PDFNet.Rect, string)", [
                [e, "PDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
                [n, "string"],
              ]),
              l("create", [[t, 1]]),
              d
                .sendWithPromise("checkBoxWidgetCreate", { doc: e.id, pos: t, field_name: n })
                .then(function (e) {
                  return p(d.CheckBoxWidget, e)
                })
            )
          }),
          (d.CheckBoxWidget.createWithField = function (e, t, n) {
            return (
              h(
                arguments.length,
                3,
                "createWithField",
                "(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.Field)",
                [
                  [e, "PDFDoc"],
                  [t, "Structure", d.Rect, "Rect"],
                  [n, "Structure", d.Field, "Field"],
                ]
              ),
              l("createWithField", [
                [t, 1],
                [n, 2],
              ]),
              d
                .sendWithPromise("checkBoxWidgetCreateWithField", { doc: e.id, pos: t, field: n })
                .then(function (e) {
                  return p(d.CheckBoxWidget, e)
                })
            )
          }),
          (d.CheckBoxWidget.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("checkBoxWidgetCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.CheckBoxWidget, e)
              })
            )
          }),
          (d.CheckBoxWidget.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d
                .sendWithPromise("checkBoxWidgetCreateFromAnnot", { annot: e.id })
                .then(function (e) {
                  return p(d.CheckBoxWidget, e)
                })
            )
          }),
          (d.CheckBoxWidget.prototype.isChecked = function () {
            return d.sendWithPromise("CheckBoxWidget.isChecked", { button: this.id })
          }),
          (d.CheckBoxWidget.prototype.setChecked = function (e) {
            return (
              h(arguments.length, 1, "setChecked", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("CheckBoxWidget.setChecked", { button: this.id, checked: e })
            )
          }),
          (d.RadioButtonWidget.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("radioButtonWidgetCreateFromObj", { d: e.id }).then(function (e) {
                return p(d.RadioButtonWidget, e)
              })
            )
          }),
          (d.RadioButtonWidget.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d
                .sendWithPromise("radioButtonWidgetCreateFromAnnot", { annot: e.id })
                .then(function (e) {
                  return p(d.RadioButtonWidget, e)
                })
            )
          }),
          (d.RadioButtonWidget.prototype.isEnabled = function () {
            return d.sendWithPromise("RadioButtonWidget.isEnabled", { button: this.id })
          }),
          (d.RadioButtonWidget.prototype.enableButton = function () {
            return d.sendWithPromise("RadioButtonWidget.enableButton", { button: this.id })
          }),
          (d.RadioButtonWidget.prototype.getGroup = function () {
            return d
              .sendWithPromise("RadioButtonWidget.getGroup", { button: this.id })
              .then(function (e) {
                return o(d.RadioButtonGroup, e)
              })
          }),
          (d.PushButtonWidget.create = function (e, t, n) {
            return (
              void 0 === n && (n = ""),
              h(arguments.length, 2, "create", "(PDFNet.PDFDoc, PDFNet.Rect, string)", [
                [e, "PDFDoc"],
                [t, "Structure", d.Rect, "Rect"],
                [n, "string"],
              ]),
              l("create", [[t, 1]]),
              d
                .sendWithPromise("pushButtonWidgetCreate", { doc: e.id, pos: t, field_name: n })
                .then(function (e) {
                  return p(d.PushButtonWidget, e)
                })
            )
          }),
          (d.PushButtonWidget.createWithField = function (e, t, n) {
            return (
              h(
                arguments.length,
                3,
                "createWithField",
                "(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.Field)",
                [
                  [e, "PDFDoc"],
                  [t, "Structure", d.Rect, "Rect"],
                  [n, "Structure", d.Field, "Field"],
                ]
              ),
              l("createWithField", [
                [t, 1],
                [n, 2],
              ]),
              d
                .sendWithPromise("pushButtonWidgetCreateWithField", { doc: e.id, pos: t, field: n })
                .then(function (e) {
                  return p(d.PushButtonWidget, e)
                })
            )
          }),
          (d.PushButtonWidget.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("pushButtonWidgetCreateFromObj", { obj: e.id }).then(function (e) {
                return p(d.PushButtonWidget, e)
              })
            )
          }),
          (d.PushButtonWidget.createFromAnnot = function (e) {
            return (
              h(arguments.length, 1, "createFromAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d
                .sendWithPromise("pushButtonWidgetCreateFromAnnot", { annot: e.id })
                .then(function (e) {
                  return p(d.PushButtonWidget, e)
                })
            )
          }),
          (d.Bookmark.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.PDFDoc, string)", [
                [e, "PDFDoc"],
                [t, "string"],
              ]),
              d.sendWithPromise("bookmarkCreate", { in_doc: e.id, in_title: t }).then(function (e) {
                return p(d.Bookmark, e)
              })
            )
          }),
          (d.Bookmark.createFromObj = function (e) {
            return (
              h(arguments.length, 1, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d
                .sendWithPromise("bookmarkCreateFromObj", { in_bookmark_dict: e.id })
                .then(function (e) {
                  return p(d.Bookmark, e)
                })
            )
          }),
          (d.Bookmark.prototype.copy = function () {
            return d.sendWithPromise("Bookmark.copy", { in_bookmark: this.id }).then(function (e) {
              return p(d.Bookmark, e)
            })
          }),
          (d.Bookmark.prototype.compare = function (e) {
            return (
              h(arguments.length, 1, "compare", "(PDFNet.Bookmark)", [
                [e, "Object", d.Bookmark, "Bookmark"],
              ]),
              d.sendWithPromise("Bookmark.compare", { bm: this.id, in_bookmark: e.id })
            )
          }),
          (d.Bookmark.prototype.isValid = function () {
            return d.sendWithPromise("Bookmark.isValid", { bm: this.id })
          }),
          (d.Bookmark.prototype.hasChildren = function () {
            return d.sendWithPromise("Bookmark.hasChildren", { bm: this.id })
          }),
          (d.Bookmark.prototype.getNext = function () {
            return d.sendWithPromise("Bookmark.getNext", { bm: this.id }).then(function (e) {
              return p(d.Bookmark, e)
            })
          }),
          (d.Bookmark.prototype.getPrev = function () {
            return d.sendWithPromise("Bookmark.getPrev", { bm: this.id }).then(function (e) {
              return p(d.Bookmark, e)
            })
          }),
          (d.Bookmark.prototype.getFirstChild = function () {
            return d.sendWithPromise("Bookmark.getFirstChild", { bm: this.id }).then(function (e) {
              return p(d.Bookmark, e)
            })
          }),
          (d.Bookmark.prototype.getLastChild = function () {
            return d.sendWithPromise("Bookmark.getLastChild", { bm: this.id }).then(function (e) {
              return p(d.Bookmark, e)
            })
          }),
          (d.Bookmark.prototype.getParent = function () {
            return d.sendWithPromise("Bookmark.getParent", { bm: this.id }).then(function (e) {
              return p(d.Bookmark, e)
            })
          }),
          (d.Bookmark.prototype.find = function (e) {
            return (
              h(arguments.length, 1, "find", "(string)", [[e, "string"]]),
              d.sendWithPromise("Bookmark.find", { bm: this.id, in_title: e }).then(function (e) {
                return p(d.Bookmark, e)
              })
            )
          }),
          (d.Bookmark.prototype.addNewChild = function (e) {
            return (
              h(arguments.length, 1, "addNewChild", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("Bookmark.addNewChild", { bm: this.id, in_title: e })
                .then(function (e) {
                  return p(d.Bookmark, e)
                })
            )
          }),
          (d.Bookmark.prototype.addChild = function (e) {
            return (
              h(arguments.length, 1, "addChild", "(PDFNet.Bookmark)", [
                [e, "Object", d.Bookmark, "Bookmark"],
              ]),
              d.sendWithPromise("Bookmark.addChild", { bm: this.id, in_bookmark: e.id })
            )
          }),
          (d.Bookmark.prototype.addNewNext = function (e) {
            return (
              h(arguments.length, 1, "addNewNext", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("Bookmark.addNewNext", { bm: this.id, in_title: e })
                .then(function (e) {
                  return p(d.Bookmark, e)
                })
            )
          }),
          (d.Bookmark.prototype.addNext = function (e) {
            return (
              h(arguments.length, 1, "addNext", "(PDFNet.Bookmark)", [
                [e, "Object", d.Bookmark, "Bookmark"],
              ]),
              d.sendWithPromise("Bookmark.addNext", { bm: this.id, in_bookmark: e.id })
            )
          }),
          (d.Bookmark.prototype.addNewPrev = function (e) {
            return (
              h(arguments.length, 1, "addNewPrev", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("Bookmark.addNewPrev", { bm: this.id, in_title: e })
                .then(function (e) {
                  return p(d.Bookmark, e)
                })
            )
          }),
          (d.Bookmark.prototype.addPrev = function (e) {
            return (
              h(arguments.length, 1, "addPrev", "(PDFNet.Bookmark)", [
                [e, "Object", d.Bookmark, "Bookmark"],
              ]),
              d.sendWithPromise("Bookmark.addPrev", { bm: this.id, in_bookmark: e.id })
            )
          }),
          (d.Bookmark.prototype.delete = function () {
            return d.sendWithPromise("Bookmark.delete", { bm: this.id })
          }),
          (d.Bookmark.prototype.unlink = function () {
            return d.sendWithPromise("Bookmark.unlink", { bm: this.id })
          }),
          (d.Bookmark.prototype.getIndent = function () {
            return d.sendWithPromise("Bookmark.getIndent", { bm: this.id })
          }),
          (d.Bookmark.prototype.isOpen = function () {
            return d.sendWithPromise("Bookmark.isOpen", { bm: this.id })
          }),
          (d.Bookmark.prototype.setOpen = function (e) {
            return (
              h(arguments.length, 1, "setOpen", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Bookmark.setOpen", { bm: this.id, in_open: e })
            )
          }),
          (d.Bookmark.prototype.getOpenCount = function () {
            return d.sendWithPromise("Bookmark.getOpenCount", { bm: this.id })
          }),
          (d.Bookmark.prototype.getTitle = function () {
            return d.sendWithPromise("Bookmark.getTitle", { bm: this.id })
          }),
          (d.Bookmark.prototype.getTitleObj = function () {
            return d.sendWithPromise("Bookmark.getTitleObj", { bm: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Bookmark.prototype.setTitle = function (e) {
            return (
              h(arguments.length, 1, "setTitle", "(string)", [[e, "string"]]),
              d.sendWithPromise("Bookmark.setTitle", { bm: this.id, title: e })
            )
          }),
          (d.Bookmark.prototype.getAction = function () {
            return d.sendWithPromise("Bookmark.getAction", { bm: this.id }).then(function (e) {
              return p(d.Action, e)
            })
          }),
          (d.Bookmark.prototype.setAction = function (e) {
            return (
              h(arguments.length, 1, "setAction", "(PDFNet.Action)", [
                [e, "Object", d.Action, "Action"],
              ]),
              d.sendWithPromise("Bookmark.setAction", { bm: this.id, in_action: e.id })
            )
          }),
          (d.Bookmark.prototype.removeAction = function () {
            return d.sendWithPromise("Bookmark.removeAction", { bm: this.id })
          }),
          (d.Bookmark.prototype.getFlags = function () {
            return d.sendWithPromise("Bookmark.getFlags", { bm: this.id })
          }),
          (d.Bookmark.prototype.setFlags = function (e) {
            return (
              h(arguments.length, 1, "setFlags", "(number)", [[e, "number"]]),
              d.sendWithPromise("Bookmark.setFlags", { bm: this.id, in_flags: e })
            )
          }),
          (d.Bookmark.prototype.getColor = function () {
            return d.sendWithPromise("Bookmark.getColor", { bm: this.id })
          }),
          (d.Bookmark.prototype.setColor = function (e, t, n) {
            return (
              void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              void 0 === n && (n = 0),
              h(arguments.length, 0, "setColor", "(number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
              ]),
              d.sendWithPromise("Bookmark.setColor", { bm: this.id, in_r: e, in_g: t, in_b: n })
            )
          }),
          (d.Bookmark.prototype.getSDFObj = function () {
            return d.sendWithPromise("Bookmark.getSDFObj", { bm: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.ColorPt.init = function (e, t, n, i) {
            return (
              void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              void 0 === n && (n = 0),
              void 0 === i && (i = 0),
              h(arguments.length, 0, "init", "(number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
              ]),
              d.sendWithPromise("colorPtInit", { x: e, y: t, z: n, w: i }).then(function (e) {
                return o(d.ColorPt, e)
              })
            )
          }),
          (d.ColorPt.prototype.compare = function (e) {
            return (
              h(arguments.length, 1, "compare", "(PDFNet.ColorPt)", [
                [e, "Object", d.ColorPt, "ColorPt"],
              ]),
              d.sendWithPromise("ColorPt.compare", { left: this.id, right: e.id })
            )
          }),
          (d.ColorPt.prototype.set = function (e, t, n, i) {
            return (
              void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              void 0 === n && (n = 0),
              void 0 === i && (i = 0),
              h(arguments.length, 0, "set", "(number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
              ]),
              d.sendWithPromise("ColorPt.set", { cp: this.id, x: e, y: t, z: n, w: i })
            )
          }),
          (d.ColorPt.prototype.setByIndex = function (e, t) {
            return (
              h(arguments.length, 2, "setByIndex", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("ColorPt.setByIndex", {
                cp: this.id,
                colorant_index: e,
                colorant_value: t,
              })
            )
          }),
          (d.ColorPt.prototype.get = function (e) {
            return (
              h(arguments.length, 1, "get", "(number)", [[e, "number"]]),
              d.sendWithPromise("ColorPt.get", { cp: this.id, colorant_index: e })
            )
          }),
          (d.ColorPt.prototype.setColorantNum = function (e) {
            return (
              h(arguments.length, 1, "setColorantNum", "(number)", [[e, "number"]]),
              d.sendWithPromise("ColorPt.setColorantNum", { cp: this.id, num: e })
            )
          }),
          (d.ColorSpace.createDeviceGray = function () {
            return d.sendWithPromise("colorSpaceCreateDeviceGray", {}).then(function (e) {
              return o(d.ColorSpace, e)
            })
          }),
          (d.ColorSpace.createDeviceRGB = function () {
            return d.sendWithPromise("colorSpaceCreateDeviceRGB", {}).then(function (e) {
              return o(d.ColorSpace, e)
            })
          }),
          (d.ColorSpace.createDeviceCMYK = function () {
            return d.sendWithPromise("colorSpaceCreateDeviceCMYK", {}).then(function (e) {
              return o(d.ColorSpace, e)
            })
          }),
          (d.ColorSpace.createPattern = function () {
            return d.sendWithPromise("colorSpaceCreatePattern", {}).then(function (e) {
              return o(d.ColorSpace, e)
            })
          }),
          (d.ColorSpace.create = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("colorSpaceCreate", { color_space: e.id }).then(function (e) {
                return o(d.ColorSpace, e)
              })
            )
          }),
          (d.ColorSpace.createICCFromFilter = function (e, t) {
            return (
              h(arguments.length, 2, "createICCFromFilter", "(PDFNet.SDFDoc, PDFNet.Filter)", [
                [e, "SDFDoc"],
                [t, "Object", d.Filter, "Filter"],
              ]),
              0 != t.id && O(t.id),
              d
                .sendWithPromise("colorSpaceCreateICCFromFilter", {
                  doc: e.id,
                  no_own_filter: t.id,
                })
                .then(function (e) {
                  return o(d.ColorSpace, e)
                })
            )
          }),
          (d.ColorSpace.createICCFromBuffer = function (e, t) {
            h(
              arguments.length,
              2,
              "createICCFromBuffer",
              "(PDFNet.SDFDoc, ArrayBuffer|TypedArray)",
              [
                [e, "SDFDoc"],
                [t, "ArrayBuffer"],
              ]
            )
            var n = a(t, !1)
            return d
              .sendWithPromise("colorSpaceCreateICCFromBuffer", { doc: e.id, buf: n })
              .then(function (e) {
                return o(d.ColorSpace, e)
              })
          }),
          (d.ColorSpace.getComponentNumFromObj = function (e, t) {
            return (
              h(arguments.length, 2, "getComponentNumFromObj", "(number, PDFNet.Obj)", [
                [e, "number"],
                [t, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("colorSpaceGetComponentNumFromObj", { cs_type: e, cs_obj: t.id })
            )
          }),
          (d.ColorSpace.getTypeFromObj = function (e) {
            return (
              h(arguments.length, 1, "getTypeFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("colorSpaceGetTypeFromObj", { cs_obj: e.id })
            )
          }),
          (d.ColorSpace.prototype.getType = function () {
            return d.sendWithPromise("ColorSpace.getType", { cs: this.id })
          }),
          (d.ColorSpace.prototype.getSDFObj = function () {
            return d.sendWithPromise("ColorSpace.getSDFObj", { cs: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.ColorSpace.prototype.getComponentNum = function () {
            return d.sendWithPromise("ColorSpace.getComponentNum", { cs: this.id })
          }),
          (d.ColorSpace.prototype.initColor = function () {
            return d.sendWithPromise("ColorSpace.initColor", { cs: this.id }).then(function (e) {
              return o(d.ColorPt, e)
            })
          }),
          (d.ColorSpace.prototype.initComponentRanges = function (e) {
            return (
              h(arguments.length, 1, "initComponentRanges", "(number)", [[e, "number"]]),
              d.sendWithPromise("ColorSpace.initComponentRanges", { cs: this.id, num_comps: e })
            )
          }),
          (d.ColorSpace.prototype.convert2Gray = function (e) {
            return (
              h(arguments.length, 1, "convert2Gray", "(PDFNet.ColorPt)", [
                [e, "Object", d.ColorPt, "ColorPt"],
              ]),
              d
                .sendWithPromise("ColorSpace.convert2Gray", { cs: this.id, in_color: e.id })
                .then(function (e) {
                  return o(d.ColorPt, e)
                })
            )
          }),
          (d.ColorSpace.prototype.convert2RGB = function (e) {
            return (
              h(arguments.length, 1, "convert2RGB", "(PDFNet.ColorPt)", [
                [e, "Object", d.ColorPt, "ColorPt"],
              ]),
              d
                .sendWithPromise("ColorSpace.convert2RGB", { cs: this.id, in_color: e.id })
                .then(function (e) {
                  return o(d.ColorPt, e)
                })
            )
          }),
          (d.ColorSpace.prototype.convert2CMYK = function (e) {
            return (
              h(arguments.length, 1, "convert2CMYK", "(PDFNet.ColorPt)", [
                [e, "Object", d.ColorPt, "ColorPt"],
              ]),
              d
                .sendWithPromise("ColorSpace.convert2CMYK", { cs: this.id, in_color: e.id })
                .then(function (e) {
                  return o(d.ColorPt, e)
                })
            )
          }),
          (d.ColorSpace.prototype.getAlternateColorSpace = function () {
            return d
              .sendWithPromise("ColorSpace.getAlternateColorSpace", { cs: this.id })
              .then(function (e) {
                return o(d.ColorSpace, e)
              })
          }),
          (d.ColorSpace.prototype.getBaseColorSpace = function () {
            return d
              .sendWithPromise("ColorSpace.getBaseColorSpace", { cs: this.id })
              .then(function (e) {
                return o(d.ColorSpace, e)
              })
          }),
          (d.ColorSpace.prototype.getHighVal = function () {
            return d.sendWithPromise("ColorSpace.getHighVal", { cs: this.id })
          }),
          (d.ColorSpace.prototype.getLookupTable = function () {
            return d.sendWithPromise("ColorSpace.getLookupTable", { cs: this.id })
          }),
          (d.ColorSpace.prototype.getBaseColor = function (e) {
            return (
              h(arguments.length, 1, "getBaseColor", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("ColorSpace.getBaseColor", { cs: this.id, color_idx: e })
                .then(function (e) {
                  return o(d.ColorPt, e)
                })
            )
          }),
          (d.ColorSpace.prototype.getTintFunction = function () {
            return d
              .sendWithPromise("ColorSpace.getTintFunction", { cs: this.id })
              .then(function (e) {
                return o(d.Function, e)
              })
          }),
          (d.ColorSpace.prototype.isAll = function () {
            return d.sendWithPromise("ColorSpace.isAll", { cs: this.id })
          }),
          (d.ColorSpace.prototype.isNone = function () {
            return d.sendWithPromise("ColorSpace.isNone", { cs: this.id })
          }),
          (d.ContentReplacer.create = function () {
            return d.sendWithPromise("contentReplacerCreate", {}).then(function (e) {
              return o(d.ContentReplacer, e)
            })
          }),
          (d.ContentReplacer.prototype.addImage = function (e, t) {
            return (
              h(arguments.length, 2, "addImage", "(PDFNet.Rect, PDFNet.Obj)", [
                [e, "Structure", d.Rect, "Rect"],
                [t, "Object", d.Obj, "Obj"],
              ]),
              l("addImage", [[e, 0]]),
              d.sendWithPromise("ContentReplacer.addImage", {
                cr: this.id,
                target_region: e,
                replacement_image: t.id,
              })
            )
          }),
          (d.ContentReplacer.prototype.addText = function (e, t) {
            return (
              h(arguments.length, 2, "addText", "(PDFNet.Rect, string)", [
                [e, "Structure", d.Rect, "Rect"],
                [t, "string"],
              ]),
              l("addText", [[e, 0]]),
              d.sendWithPromise("ContentReplacer.addText", {
                cr: this.id,
                target_region: e,
                replacement_text: t,
              })
            )
          }),
          (d.ContentReplacer.prototype.addString = function (e, t) {
            return (
              h(arguments.length, 2, "addString", "(string, string)", [
                [e, "string"],
                [t, "string"],
              ]),
              d.sendWithPromise("ContentReplacer.addString", {
                cr: this.id,
                template_text: e,
                replacement_text: t,
              })
            )
          }),
          (d.ContentReplacer.prototype.setMatchStrings = function (e, t) {
            return (
              h(arguments.length, 2, "setMatchStrings", "(string, string)", [
                [e, "string"],
                [t, "string"],
              ]),
              d.sendWithPromise("ContentReplacer.setMatchStrings", {
                cr: this.id,
                start_str: e,
                end_str: t,
              })
            )
          }),
          (d.ContentReplacer.prototype.process = function (e) {
            return (
              h(arguments.length, 1, "process", "(PDFNet.Page)", [[e, "Object", d.Page, "Page"]]),
              d.sendWithPromise("ContentReplacer.process", { cr: this.id, page: e.id })
            )
          }),
          (d.Reflow.prototype.getHtml = function () {
            return d.sendWithPromise("Reflow.getHtml", { self: this.id })
          }),
          (d.Reflow.prototype.getAnnot = function (e) {
            return (
              h(arguments.length, 1, "getAnnot", "(string)", [[e, "string"]]),
              d.sendWithPromise("Reflow.getAnnot", { self: this.id, in_id: e })
            )
          }),
          (d.Reflow.prototype.setAnnot = function (e) {
            return (
              h(arguments.length, 1, "setAnnot", "(string)", [[e, "string"]]),
              d.sendWithPromise("Reflow.setAnnot", { self: this.id, in_json: e })
            )
          }),
          (d.Reflow.prototype.setIncludeImages = function (e) {
            return (
              h(arguments.length, 1, "setIncludeImages", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Reflow.setIncludeImages", { self: this.id, include: e })
            )
          }),
          (d.Reflow.prototype.setHTMLOutputTextMarkup = function (e) {
            return (
              h(arguments.length, 1, "setHTMLOutputTextMarkup", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Reflow.setHTMLOutputTextMarkup", { self: this.id, include: e })
            )
          }),
          (d.Reflow.prototype.setMessageWhenNoReflowContent = function (e) {
            return (
              h(arguments.length, 1, "setMessageWhenNoReflowContent", "(string)", [[e, "string"]]),
              d.sendWithPromise("Reflow.setMessageWhenNoReflowContent", {
                self: this.id,
                content: e,
              })
            )
          }),
          (d.Reflow.prototype.setMessageWhenReflowFailed = function (e) {
            return (
              h(arguments.length, 1, "setMessageWhenReflowFailed", "(string)", [[e, "string"]]),
              d.sendWithPromise("Reflow.setMessageWhenReflowFailed", { self: this.id, content: e })
            )
          }),
          (d.Reflow.prototype.setHideBackgroundImages = function (e) {
            return (
              h(arguments.length, 1, "setHideBackgroundImages", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Reflow.setHideBackgroundImages", {
                self: this.id,
                hide_background_images: e,
              })
            )
          }),
          (d.Reflow.prototype.setHideImagesUnderText = function (e) {
            return (
              h(arguments.length, 1, "setHideImagesUnderText", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Reflow.setHideImagesUnderText", {
                self: this.id,
                hide_images_under_text: e,
              })
            )
          }),
          (d.Reflow.prototype.setHideImagesUnderInvisibleText = function (e) {
            return (
              h(arguments.length, 1, "setHideImagesUnderInvisibleText", "(boolean)", [
                [e, "boolean"],
              ]),
              d.sendWithPromise("Reflow.setHideImagesUnderInvisibleText", {
                self: this.id,
                hide_images_under_invisible_text: e,
              })
            )
          }),
          (d.Reflow.prototype.setDoNotReflowTextOverImages = function (e) {
            return (
              h(arguments.length, 1, "setDoNotReflowTextOverImages", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Reflow.setDoNotReflowTextOverImages", {
                self: this.id,
                do_not_reflow_text_over_images: e,
              })
            )
          }),
          (d.Reflow.prototype.setFontOverrideName = function (e) {
            return (
              h(arguments.length, 1, "setFontOverrideName", "(string)", [[e, "string"]]),
              d.sendWithPromise("Reflow.setFontOverrideName", { self: this.id, font_family: e })
            )
          }),
          (d.Reflow.prototype.setCustomStyles = function (e) {
            return (
              h(arguments.length, 1, "setCustomStyles", "(string)", [[e, "string"]]),
              d.sendWithPromise("Reflow.setCustomStyles", { self: this.id, styles: e })
            )
          }),
          (d.Reflow.prototype.setIncludeBBoxForRecognizedZones = function (e) {
            return (
              h(arguments.length, 1, "setIncludeBBoxForRecognizedZones", "(boolean)", [
                [e, "boolean"],
              ]),
              d.sendWithPromise("Reflow.setIncludeBBoxForRecognizedZones", {
                self: this.id,
                include: e,
              })
            )
          }),
          (d.Convert.fromXpsMem = function (e, t) {
            h(arguments.length, 2, "fromXpsMem", "(PDFNet.PDFDoc, ArrayBuffer|TypedArray)", [
              [e, "PDFDoc"],
              [t, "ArrayBuffer"],
            ])
            var n = a(t, !1)
            return d.sendWithPromise("convertFromXpsMem", { in_pdfdoc: e.id, buf: n })
          }),
          (d.Convert.createReflow = function (e, t) {
            return (
              h(arguments.length, 2, "createReflow", "(PDFNet.Page, string)", [
                [e, "Object", d.Page, "Page"],
                [t, "string"],
              ]),
              d
                .sendWithPromise("convertCreateReflow", { in_page: e.id, json_zones: t })
                .then(function (e) {
                  return o(d.Reflow, e)
                })
            )
          }),
          (d.Convert.fromTextWithBuffer = function (e, t, n) {
            return (
              void 0 === n && (n = new d.Obj("0")),
              h(
                arguments.length,
                2,
                "fromTextWithBuffer",
                "(PDFNet.PDFDoc, ArrayBuffer|TypedArray, PDFNet.Obj)",
                [
                  [e, "PDFDoc"],
                  [t, "ArrayBuffer"],
                  [n, "Object", d.Obj, "Obj"],
                ]
              ),
              (t = a(t, !1)),
              d.sendWithPromise("convertFromTextWithBuffer", {
                in_pdfdoc: e.id,
                in_filename: t,
                options: n.id,
              })
            )
          }),
          (d.Convert.toXpsBuffer = function (t, e) {
            var n
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 1, "toXpsBuffer", "(PDFNet.PDFDoc, PDFNet.Obj)", [
                [t, "PDFDoc"],
                [e, "OptionObject", d.Obj, "Obj", "PDFNet.Convert.XPSOutputOptions"],
              ]),
              (e =
                "PDFNet.Convert.XPSOutputOptions" === e.name
                  ? ((n = e),
                    d.ObjSet.create().then(function (e) {
                      return e.createFromJson(JSON.stringify(n))
                    }))
                  : Promise.resolve(e)).then(function (e) {
                return d
                  .sendWithPromise("convertToXpsBuffer", { in_pdfdoc: t.id, options: e.id })
                  .then(function (e) {
                    return new Uint8Array(e)
                  })
              })
            )
          }),
          (d.Convert.fileToXpsWithBuffer = function (t, n, e) {
            var i
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(
                arguments.length,
                2,
                "fileToXpsWithBuffer",
                "(ArrayBuffer|TypedArray, string, PDFNet.Obj)",
                [
                  [t, "ArrayBuffer"],
                  [n, "string"],
                  [e, "OptionObject", d.Obj, "Obj", "PDFNet.Convert.XPSOutputOptions"],
                ]
              ),
              n.startsWith(".") || (n = "." + n),
              (t = a(t, !1)),
              (e =
                "PDFNet.Convert.XPSOutputOptions" === e.name
                  ? ((i = e),
                    d.ObjSet.create().then(function (e) {
                      return e.createFromJson(JSON.stringify(i))
                    }))
                  : Promise.resolve(e)).then(function (e) {
                return d
                  .sendWithPromise("convertFileToXpsWithBuffer", {
                    in_inputFilename: t,
                    in_inputFilename_extension: n,
                    options: e.id,
                  })
                  .then(function (e) {
                    return new Uint8Array(e)
                  })
              })
            )
          }),
          (d.Convert.fileToXodWithBuffer = function (t, n, e) {
            var i
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(
                arguments.length,
                2,
                "fileToXodWithBuffer",
                "(ArrayBuffer|TypedArray, string, PDFNet.Obj)",
                [
                  [t, "ArrayBuffer"],
                  [n, "string"],
                  [e, "OptionObject", d.Obj, "Obj", "PDFNet.Convert.XODOutputOptions"],
                ]
              ),
              n.startsWith(".") || (n = "." + n),
              (t = a(t, !1)),
              (e =
                "PDFNet.Convert.XODOutputOptions" === e.name
                  ? ((i = e),
                    d.ObjSet.create().then(function (e) {
                      return e.createFromJson(JSON.stringify(i))
                    }))
                  : Promise.resolve(e)).then(function (e) {
                return d
                  .sendWithPromise("convertFileToXodWithBuffer", {
                    in_filename: t,
                    in_filename_extension: n,
                    options: e.id,
                  })
                  .then(function (e) {
                    return new Uint8Array(e)
                  })
              })
            )
          }),
          (d.Convert.toXodBuffer = function (t, e) {
            var n
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 1, "toXodBuffer", "(PDFNet.PDFDoc, PDFNet.Obj)", [
                [t, "PDFDoc"],
                [e, "OptionObject", d.Obj, "Obj", "PDFNet.Convert.XODOutputOptions"],
              ]),
              (e =
                "PDFNet.Convert.XODOutputOptions" === e.name
                  ? ((n = e),
                    d.ObjSet.create().then(function (e) {
                      return e.createFromJson(JSON.stringify(n))
                    }))
                  : Promise.resolve(e)).then(function (e) {
                return d
                  .sendWithPromise("convertToXodBuffer", { in_pdfdoc: t.id, options: e.id })
                  .then(function (e) {
                    return new Uint8Array(e)
                  })
              })
            )
          }),
          (d.ConversionMonitor.prototype.next = function () {
            return d.sendWithPromise("ConversionMonitor.next", { conversionMonitor: this.id })
          }),
          (d.ConversionMonitor.prototype.ready = function () {
            return d.sendWithPromise("ConversionMonitor.ready", { conversionMonitor: this.id })
          }),
          (d.ConversionMonitor.prototype.progress = function () {
            return d.sendWithPromise("ConversionMonitor.progress", { conversionMonitor: this.id })
          }),
          (d.ConversionMonitor.prototype.filter = function () {
            return d
              .sendWithPromise("ConversionMonitor.filter", { conversionMonitor: this.id })
              .then(function (e) {
                return o(d.Filter, e)
              })
          }),
          (d.Convert.officeToPdfWithFilter = function (t, n, e) {
            var i
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(
                arguments.length,
                2,
                "officeToPdfWithFilter",
                "(PDFNet.PDFDoc, PDFNet.Filter, PDFNet.Obj)",
                [
                  [t, "PDFDoc"],
                  [n, "Object", d.Filter, "Filter"],
                  [e, "OptionObject", d.Obj, "Obj", "PDFNet.Convert.ConversionOptions"],
                ]
              ),
              0 != n.id && O(n.id),
              (e =
                "PDFNet.Convert.ConversionOptions" === e.name
                  ? ((i = e),
                    d.ObjSet.create().then(function (e) {
                      return e.createFromJson(JSON.stringify(i))
                    }))
                  : Promise.resolve(e)).then(function (e) {
                return d.sendWithPromise("convertOfficeToPdfWithFilter", {
                  in_pdfdoc: t.id,
                  no_own_in_stream: n.id,
                  options: e.id,
                })
              })
            )
          }),
          (d.Convert.toPdfWithBuffer = function (e, t, n) {
            return (
              h(
                arguments.length,
                3,
                "toPdfWithBuffer",
                "(PDFNet.PDFDoc, ArrayBuffer|TypedArray, string)",
                [
                  [e, "PDFDoc"],
                  [t, "ArrayBuffer"],
                  [n, "string"],
                ]
              ),
              n.startsWith(".") || (n = "." + n),
              (t = a(t, !1)),
              d.sendWithPromise("convertToPdfWithBuffer", {
                in_pdfdoc: e.id,
                in_filename: t,
                in_filename_extension: n,
              })
            )
          }),
          (d.Convert.fromTiff = function (e, t) {
            return (
              h(arguments.length, 2, "fromTiff", "(PDFNet.PDFDoc, PDFNet.Filter)", [
                [e, "PDFDoc"],
                [t, "Object", d.Filter, "Filter"],
              ]),
              d.sendWithPromise("convertFromTiff", { in_pdfdoc: e.id, in_data: t.id })
            )
          }),
          (d.Convert.pageToHtml = function (e) {
            return (
              h(arguments.length, 1, "pageToHtml", "(PDFNet.Page)", [
                [e, "Object", d.Page, "Page"],
              ]),
              d.sendWithPromise("convertPageToHtml", { page: e.id })
            )
          }),
          (d.Convert.pageToHtmlZoned = function (e, t) {
            return (
              h(arguments.length, 2, "pageToHtmlZoned", "(PDFNet.Page, string)", [
                [e, "Object", d.Page, "Page"],
                [t, "string"],
              ]),
              d.sendWithPromise("convertPageToHtmlZoned", { page: e.id, json_zones: t })
            )
          }),
          (d.Convert.fileToTiffWithBuffer = function (t, n, e) {
            var i
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(
                arguments.length,
                2,
                "fileToTiffWithBuffer",
                "(ArrayBuffer|TypedArray, string, PDFNet.Obj)",
                [
                  [t, "ArrayBuffer"],
                  [n, "string"],
                  [e, "OptionObject", d.Obj, "Obj", "PDFNet.Convert.TiffOutputOptions"],
                ]
              ),
              n.startsWith(".") || (n = "." + n),
              (t = a(t, !1)),
              (e =
                "PDFNet.Convert.TiffOutputOptions" === e.name
                  ? ((i = e),
                    d.ObjSet.create().then(function (e) {
                      return e.createFromJson(JSON.stringify(i))
                    }))
                  : Promise.resolve(e)).then(function (e) {
                return d
                  .sendWithPromise("convertFileToTiffWithBuffer", {
                    in_filename: t,
                    in_filename_extension: n,
                    options: e.id,
                  })
                  .then(function (e) {
                    return new Uint8Array(e)
                  })
              })
            )
          }),
          (d.Convert.toTiffBuffer = function (t, e) {
            var n
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 1, "toTiffBuffer", "(PDFNet.PDFDoc, PDFNet.Obj)", [
                [t, "PDFDoc"],
                [e, "OptionObject", d.Obj, "Obj", "PDFNet.Convert.TiffOutputOptions"],
              ]),
              (e =
                "PDFNet.Convert.TiffOutputOptions" === e.name
                  ? ((n = e),
                    d.ObjSet.create().then(function (e) {
                      return e.createFromJson(JSON.stringify(n))
                    }))
                  : Promise.resolve(e)).then(function (e) {
                return d
                  .sendWithPromise("convertToTiffBuffer", { in_pdfdoc: t.id, options: e.id })
                  .then(function (e) {
                    return new Uint8Array(e)
                  })
              })
            )
          }),
          (d.Date.init = function (e, t, n, i, r, o) {
            return (
              h(arguments.length, 6, "init", "(number, number, number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
                [r, "number"],
                [o, "number"],
              ]),
              d
                .sendWithPromise("dateInit", {
                  year: e,
                  month: t,
                  day: n,
                  hour: i,
                  minute: r,
                  second: o,
                })
                .then(function (e) {
                  return new d.Date(e)
                })
            )
          }),
          (d.Date.prototype.isValid = function () {
            return (
              u("isValid", this.yieldFunction), d.sendWithPromise("Date.isValid", { date: this })
            )
          }),
          (d.Date.prototype.attach = function (e) {
            h(arguments.length, 1, "attach", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              u("attach", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Date.attach"),
              d.sendWithPromise("Date.attach", { date: this, d: e.id }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.Date.prototype.update = function (e) {
            void 0 === e && (e = new d.Obj("__null")),
              h(arguments.length, 0, "update", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              u("update", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Date.update"),
              d.sendWithPromise("Date.update", { date: this, d: e.id }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.date, t), e.result
              })
            )
          }),
          (d.Date.prototype.setCurrentTime = function () {
            u("setCurrentTime", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Date.setCurrentTime"),
              d.sendWithPromise("Date.setCurrentTime", { date: this }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.Destination.createXYZ = function (e, t, n, i) {
            return (
              h(arguments.length, 4, "createXYZ", "(PDFNet.Page, number, number, number)", [
                [e, "Object", d.Page, "Page"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
              ]),
              d
                .sendWithPromise("destinationCreateXYZ", { page: e.id, left: t, top: n, zoom: i })
                .then(function (e) {
                  return p(d.Destination, e)
                })
            )
          }),
          (d.Destination.createFit = function (e) {
            return (
              h(arguments.length, 1, "createFit", "(PDFNet.Page)", [[e, "Object", d.Page, "Page"]]),
              d.sendWithPromise("destinationCreateFit", { page: e.id }).then(function (e) {
                return p(d.Destination, e)
              })
            )
          }),
          (d.Destination.createFitH = function (e, t) {
            return (
              h(arguments.length, 2, "createFitH", "(PDFNet.Page, number)", [
                [e, "Object", d.Page, "Page"],
                [t, "number"],
              ]),
              d.sendWithPromise("destinationCreateFitH", { page: e.id, top: t }).then(function (e) {
                return p(d.Destination, e)
              })
            )
          }),
          (d.Destination.createFitV = function (e, t) {
            return (
              h(arguments.length, 2, "createFitV", "(PDFNet.Page, number)", [
                [e, "Object", d.Page, "Page"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("destinationCreateFitV", { page: e.id, left: t })
                .then(function (e) {
                  return p(d.Destination, e)
                })
            )
          }),
          (d.Destination.createFitR = function (e, t, n, i, r) {
            return (
              h(
                arguments.length,
                5,
                "createFitR",
                "(PDFNet.Page, number, number, number, number)",
                [
                  [e, "Object", d.Page, "Page"],
                  [t, "number"],
                  [n, "number"],
                  [i, "number"],
                  [r, "number"],
                ]
              ),
              d
                .sendWithPromise("destinationCreateFitR", {
                  page: e.id,
                  left: t,
                  bottom: n,
                  right: i,
                  top: r,
                })
                .then(function (e) {
                  return p(d.Destination, e)
                })
            )
          }),
          (d.Destination.createFitB = function (e) {
            return (
              h(arguments.length, 1, "createFitB", "(PDFNet.Page)", [
                [e, "Object", d.Page, "Page"],
              ]),
              d.sendWithPromise("destinationCreateFitB", { page: e.id }).then(function (e) {
                return p(d.Destination, e)
              })
            )
          }),
          (d.Destination.createFitBH = function (e, t) {
            return (
              h(arguments.length, 2, "createFitBH", "(PDFNet.Page, number)", [
                [e, "Object", d.Page, "Page"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("destinationCreateFitBH", { page: e.id, top: t })
                .then(function (e) {
                  return p(d.Destination, e)
                })
            )
          }),
          (d.Destination.createFitBV = function (e, t) {
            return (
              h(arguments.length, 2, "createFitBV", "(PDFNet.Page, number)", [
                [e, "Object", d.Page, "Page"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("destinationCreateFitBV", { page: e.id, left: t })
                .then(function (e) {
                  return p(d.Destination, e)
                })
            )
          }),
          (d.Destination.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("destinationCreate", { dest: e.id }).then(function (e) {
                return p(d.Destination, e)
              })
            )
          }),
          (d.Destination.prototype.copy = function () {
            return d.sendWithPromise("Destination.copy", { d: this.id }).then(function (e) {
              return p(d.Destination, e)
            })
          }),
          (d.Destination.prototype.isValid = function () {
            return d.sendWithPromise("Destination.isValid", { dest: this.id })
          }),
          (d.Destination.prototype.getFitType = function () {
            return d.sendWithPromise("Destination.getFitType", { dest: this.id })
          }),
          (d.Destination.prototype.getPage = function () {
            return d.sendWithPromise("Destination.getPage", { dest: this.id }).then(function (e) {
              return p(d.Page, e)
            })
          }),
          (d.Destination.prototype.setPage = function (e) {
            return (
              h(arguments.length, 1, "setPage", "(PDFNet.Page)", [[e, "Object", d.Page, "Page"]]),
              d.sendWithPromise("Destination.setPage", { dest: this.id, page: e.id })
            )
          }),
          (d.Destination.prototype.getSDFObj = function () {
            return d.sendWithPromise("Destination.getSDFObj", { dest: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Destination.prototype.getExplicitDestObj = function () {
            return d
              .sendWithPromise("Destination.getExplicitDestObj", { dest: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.GState.prototype.getTransform = function () {
            return d.sendWithPromise("GState.getTransform", { gs: this.id }).then(function (e) {
              return new d.Matrix2D(e)
            })
          }),
          (d.GState.prototype.getStrokeColorSpace = function () {
            return d
              .sendWithPromise("GState.getStrokeColorSpace", { gs: this.id })
              .then(function (e) {
                return o(d.ColorSpace, e)
              })
          }),
          (d.GState.prototype.getFillColorSpace = function () {
            return d
              .sendWithPromise("GState.getFillColorSpace", { gs: this.id })
              .then(function (e) {
                return o(d.ColorSpace, e)
              })
          }),
          (d.GState.prototype.getStrokeColor = function () {
            return d.sendWithPromise("GState.getStrokeColor", { gs: this.id }).then(function (e) {
              return o(d.ColorPt, e)
            })
          }),
          (d.GState.prototype.getStrokePattern = function () {
            return d.sendWithPromise("GState.getStrokePattern", { gs: this.id }).then(function (e) {
              return o(d.PatternColor, e)
            })
          }),
          (d.GState.prototype.getFillColor = function () {
            return d.sendWithPromise("GState.getFillColor", { gs: this.id }).then(function (e) {
              return o(d.ColorPt, e)
            })
          }),
          (d.GState.prototype.getFillPattern = function () {
            return d.sendWithPromise("GState.getFillPattern", { gs: this.id }).then(function (e) {
              return o(d.PatternColor, e)
            })
          }),
          (d.GState.prototype.getFlatness = function () {
            return d.sendWithPromise("GState.getFlatness", { gs: this.id })
          }),
          (d.GState.prototype.getLineCap = function () {
            return d.sendWithPromise("GState.getLineCap", { gs: this.id })
          }),
          (d.GState.prototype.getLineJoin = function () {
            return d.sendWithPromise("GState.getLineJoin", { gs: this.id })
          }),
          (d.GState.prototype.getLineWidth = function () {
            return d.sendWithPromise("GState.getLineWidth", { gs: this.id })
          }),
          (d.GState.prototype.getMiterLimit = function () {
            return d.sendWithPromise("GState.getMiterLimit", { gs: this.id })
          }),
          (d.GState.prototype.getPhase = function () {
            return d.sendWithPromise("GState.getPhase", { gs: this.id })
          }),
          (d.GState.prototype.getCharSpacing = function () {
            return d.sendWithPromise("GState.getCharSpacing", { gs: this.id })
          }),
          (d.GState.prototype.getWordSpacing = function () {
            return d.sendWithPromise("GState.getWordSpacing", { gs: this.id })
          }),
          (d.GState.prototype.getHorizontalScale = function () {
            return d.sendWithPromise("GState.getHorizontalScale", { gs: this.id })
          }),
          (d.GState.prototype.getLeading = function () {
            return d.sendWithPromise("GState.getLeading", { gs: this.id })
          }),
          (d.GState.prototype.getFont = function () {
            return d.sendWithPromise("GState.getFont", { gs: this.id }).then(function (e) {
              return o(d.Font, e)
            })
          }),
          (d.GState.prototype.getFontSize = function () {
            return d.sendWithPromise("GState.getFontSize", { gs: this.id })
          }),
          (d.GState.prototype.getTextRenderMode = function () {
            return d.sendWithPromise("GState.getTextRenderMode", { gs: this.id })
          }),
          (d.GState.prototype.getTextRise = function () {
            return d.sendWithPromise("GState.getTextRise", { gs: this.id })
          }),
          (d.GState.prototype.isTextKnockout = function () {
            return d.sendWithPromise("GState.isTextKnockout", { gs: this.id })
          }),
          (d.GState.prototype.getRenderingIntent = function () {
            return d.sendWithPromise("GState.getRenderingIntent", { gs: this.id })
          }),
          (d.GState.getRenderingIntentType = function (e) {
            return (
              h(arguments.length, 1, "getRenderingIntentType", "(string)", [[e, "string"]]),
              d.sendWithPromise("gStateGetRenderingIntentType", { name: e })
            )
          }),
          (d.GState.prototype.getBlendMode = function () {
            return d.sendWithPromise("GState.getBlendMode", { gs: this.id })
          }),
          (d.GState.prototype.getFillOpacity = function () {
            return d.sendWithPromise("GState.getFillOpacity", { gs: this.id })
          }),
          (d.GState.prototype.getStrokeOpacity = function () {
            return d.sendWithPromise("GState.getStrokeOpacity", { gs: this.id })
          }),
          (d.GState.prototype.getAISFlag = function () {
            return d.sendWithPromise("GState.getAISFlag", { gs: this.id })
          }),
          (d.GState.prototype.getSoftMask = function () {
            return d.sendWithPromise("GState.getSoftMask", { gs: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.GState.prototype.getSoftMaskTransform = function () {
            return d
              .sendWithPromise("GState.getSoftMaskTransform", { gs: this.id })
              .then(function (e) {
                return new d.Matrix2D(e)
              })
          }),
          (d.GState.prototype.getStrokeOverprint = function () {
            return d.sendWithPromise("GState.getStrokeOverprint", { gs: this.id })
          }),
          (d.GState.prototype.getFillOverprint = function () {
            return d.sendWithPromise("GState.getFillOverprint", { gs: this.id })
          }),
          (d.GState.prototype.getOverprintMode = function () {
            return d.sendWithPromise("GState.getOverprintMode", { gs: this.id })
          }),
          (d.GState.prototype.getAutoStrokeAdjust = function () {
            return d.sendWithPromise("GState.getAutoStrokeAdjust", { gs: this.id })
          }),
          (d.GState.prototype.getSmoothnessTolerance = function () {
            return d.sendWithPromise("GState.getSmoothnessTolerance", { gs: this.id })
          }),
          (d.GState.prototype.getTransferFunct = function () {
            return d.sendWithPromise("GState.getTransferFunct", { gs: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.GState.prototype.getBlackGenFunct = function () {
            return d.sendWithPromise("GState.getBlackGenFunct", { gs: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.GState.prototype.getUCRFunct = function () {
            return d.sendWithPromise("GState.getUCRFunct", { gs: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.GState.prototype.getHalftone = function () {
            return d.sendWithPromise("GState.getHalftone", { gs: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.GState.prototype.setTransformMatrix = function (e) {
            return (
              h(arguments.length, 1, "setTransformMatrix", "(PDFNet.Matrix2D)", [
                [e, "Structure", d.Matrix2D, "Matrix2D"],
              ]),
              l("setTransformMatrix", [[e, 0]]),
              d.sendWithPromise("GState.setTransformMatrix", { gs: this.id, mtx: e })
            )
          }),
          (d.GState.prototype.setTransform = function (e, t, n, i, r, o) {
            return (
              h(
                arguments.length,
                6,
                "setTransform",
                "(number, number, number, number, number, number)",
                [
                  [e, "number"],
                  [t, "number"],
                  [n, "number"],
                  [i, "number"],
                  [r, "number"],
                  [o, "number"],
                ]
              ),
              d.sendWithPromise("GState.setTransform", {
                gs: this.id,
                a: e,
                b: t,
                c: n,
                d: i,
                h: r,
                v: o,
              })
            )
          }),
          (d.GState.prototype.concatMatrix = function (e) {
            return (
              h(arguments.length, 1, "concatMatrix", "(PDFNet.Matrix2D)", [
                [e, "Structure", d.Matrix2D, "Matrix2D"],
              ]),
              l("concatMatrix", [[e, 0]]),
              d.sendWithPromise("GState.concatMatrix", { gs: this.id, mtx: e })
            )
          }),
          (d.GState.prototype.concat = function (e, t, n, i, r, o) {
            return (
              h(arguments.length, 6, "concat", "(number, number, number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
                [r, "number"],
                [o, "number"],
              ]),
              d.sendWithPromise("GState.concat", {
                gs: this.id,
                a: e,
                b: t,
                c: n,
                d: i,
                h: r,
                v: o,
              })
            )
          }),
          (d.GState.prototype.setStrokeColorSpace = function (e) {
            return (
              h(arguments.length, 1, "setStrokeColorSpace", "(PDFNet.ColorSpace)", [
                [e, "Object", d.ColorSpace, "ColorSpace"],
              ]),
              d.sendWithPromise("GState.setStrokeColorSpace", { gs: this.id, cs: e.id })
            )
          }),
          (d.GState.prototype.setFillColorSpace = function (e) {
            return (
              h(arguments.length, 1, "setFillColorSpace", "(PDFNet.ColorSpace)", [
                [e, "Object", d.ColorSpace, "ColorSpace"],
              ]),
              d.sendWithPromise("GState.setFillColorSpace", { gs: this.id, cs: e.id })
            )
          }),
          (d.GState.prototype.setStrokeColorWithColorPt = function (e) {
            return (
              h(arguments.length, 1, "setStrokeColorWithColorPt", "(PDFNet.ColorPt)", [
                [e, "Object", d.ColorPt, "ColorPt"],
              ]),
              d.sendWithPromise("GState.setStrokeColorWithColorPt", { gs: this.id, c: e.id })
            )
          }),
          (d.GState.prototype.setStrokeColorWithPattern = function (e) {
            return (
              h(arguments.length, 1, "setStrokeColorWithPattern", "(PDFNet.PatternColor)", [
                [e, "Object", d.PatternColor, "PatternColor"],
              ]),
              d.sendWithPromise("GState.setStrokeColorWithPattern", { gs: this.id, pattern: e.id })
            )
          }),
          (d.GState.prototype.setStrokeColor = function (e, t) {
            return (
              h(arguments.length, 2, "setStrokeColor", "(PDFNet.PatternColor, PDFNet.ColorPt)", [
                [e, "Object", d.PatternColor, "PatternColor"],
                [t, "Object", d.ColorPt, "ColorPt"],
              ]),
              d.sendWithPromise("GState.setStrokeColor", { gs: this.id, pattern: e.id, c: t.id })
            )
          }),
          (d.GState.prototype.setFillColorWithColorPt = function (e) {
            return (
              h(arguments.length, 1, "setFillColorWithColorPt", "(PDFNet.ColorPt)", [
                [e, "Object", d.ColorPt, "ColorPt"],
              ]),
              d.sendWithPromise("GState.setFillColorWithColorPt", { gs: this.id, c: e.id })
            )
          }),
          (d.GState.prototype.setFillColorWithPattern = function (e) {
            return (
              h(arguments.length, 1, "setFillColorWithPattern", "(PDFNet.PatternColor)", [
                [e, "Object", d.PatternColor, "PatternColor"],
              ]),
              d.sendWithPromise("GState.setFillColorWithPattern", { gs: this.id, pattern: e.id })
            )
          }),
          (d.GState.prototype.setFillColor = function (e, t) {
            return (
              h(arguments.length, 2, "setFillColor", "(PDFNet.PatternColor, PDFNet.ColorPt)", [
                [e, "Object", d.PatternColor, "PatternColor"],
                [t, "Object", d.ColorPt, "ColorPt"],
              ]),
              d.sendWithPromise("GState.setFillColor", { gs: this.id, pattern: e.id, c: t.id })
            )
          }),
          (d.GState.prototype.setFlatness = function (e) {
            return (
              h(arguments.length, 1, "setFlatness", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setFlatness", { gs: this.id, flatness: e })
            )
          }),
          (d.GState.prototype.setLineCap = function (e) {
            return (
              h(arguments.length, 1, "setLineCap", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setLineCap", { gs: this.id, cap: e })
            )
          }),
          (d.GState.prototype.setLineJoin = function (e) {
            return (
              h(arguments.length, 1, "setLineJoin", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setLineJoin", { gs: this.id, join: e })
            )
          }),
          (d.GState.prototype.setLineWidth = function (e) {
            return (
              h(arguments.length, 1, "setLineWidth", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setLineWidth", { gs: this.id, width: e })
            )
          }),
          (d.GState.prototype.setMiterLimit = function (e) {
            return (
              h(arguments.length, 1, "setMiterLimit", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setMiterLimit", { gs: this.id, miter_limit: e })
            )
          }),
          (d.GState.prototype.setDashPattern = function (e, t) {
            return (
              h(arguments.length, 2, "setDashPattern", "(Array<number>, number)", [
                [e, "Array"],
                [t, "number"],
              ]),
              d.sendWithPromise("GState.setDashPattern", { gs: this.id, dash_array: e, phase: t })
            )
          }),
          (d.GState.prototype.setCharSpacing = function (e) {
            return (
              h(arguments.length, 1, "setCharSpacing", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setCharSpacing", { gs: this.id, char_spacing: e })
            )
          }),
          (d.GState.prototype.setWordSpacing = function (e) {
            return (
              h(arguments.length, 1, "setWordSpacing", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setWordSpacing", { gs: this.id, word_spacing: e })
            )
          }),
          (d.GState.prototype.setHorizontalScale = function (e) {
            return (
              h(arguments.length, 1, "setHorizontalScale", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setHorizontalScale", { gs: this.id, hscale: e })
            )
          }),
          (d.GState.prototype.setLeading = function (e) {
            return (
              h(arguments.length, 1, "setLeading", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setLeading", { gs: this.id, leading: e })
            )
          }),
          (d.GState.prototype.setFont = function (e, t) {
            return (
              h(arguments.length, 2, "setFont", "(PDFNet.Font, number)", [
                [e, "Object", d.Font, "Font"],
                [t, "number"],
              ]),
              d.sendWithPromise("GState.setFont", { gs: this.id, font: e.id, font_sz: t })
            )
          }),
          (d.GState.prototype.setTextRenderMode = function (e) {
            return (
              h(arguments.length, 1, "setTextRenderMode", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setTextRenderMode", { gs: this.id, rmode: e })
            )
          }),
          (d.GState.prototype.setTextRise = function (e) {
            return (
              h(arguments.length, 1, "setTextRise", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setTextRise", { gs: this.id, rise: e })
            )
          }),
          (d.GState.prototype.setTextKnockout = function (e) {
            return (
              h(arguments.length, 1, "setTextKnockout", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("GState.setTextKnockout", { gs: this.id, knockout: e })
            )
          }),
          (d.GState.prototype.setRenderingIntent = function (e) {
            return (
              h(arguments.length, 1, "setRenderingIntent", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setRenderingIntent", { gs: this.id, intent: e })
            )
          }),
          (d.GState.prototype.setBlendMode = function (e) {
            return (
              h(arguments.length, 1, "setBlendMode", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setBlendMode", { gs: this.id, BM: e })
            )
          }),
          (d.GState.prototype.setFillOpacity = function (e) {
            return (
              h(arguments.length, 1, "setFillOpacity", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setFillOpacity", { gs: this.id, ca: e })
            )
          }),
          (d.GState.prototype.setStrokeOpacity = function (e) {
            return (
              h(arguments.length, 1, "setStrokeOpacity", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setStrokeOpacity", { gs: this.id, ca: e })
            )
          }),
          (d.GState.prototype.setAISFlag = function (e) {
            return (
              h(arguments.length, 1, "setAISFlag", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("GState.setAISFlag", { gs: this.id, AIS: e })
            )
          }),
          (d.GState.prototype.setSoftMask = function (e) {
            return (
              h(arguments.length, 1, "setSoftMask", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("GState.setSoftMask", { gs: this.id, SM: e.id })
            )
          }),
          (d.GState.prototype.setStrokeOverprint = function (e) {
            return (
              h(arguments.length, 1, "setStrokeOverprint", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("GState.setStrokeOverprint", { gs: this.id, OP: e })
            )
          }),
          (d.GState.prototype.setFillOverprint = function (e) {
            return (
              h(arguments.length, 1, "setFillOverprint", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("GState.setFillOverprint", { gs: this.id, op: e })
            )
          }),
          (d.GState.prototype.setOverprintMode = function (e) {
            return (
              h(arguments.length, 1, "setOverprintMode", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setOverprintMode", { gs: this.id, OPM: e })
            )
          }),
          (d.GState.prototype.setAutoStrokeAdjust = function (e) {
            return (
              h(arguments.length, 1, "setAutoStrokeAdjust", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("GState.setAutoStrokeAdjust", { gs: this.id, SA: e })
            )
          }),
          (d.GState.prototype.setSmoothnessTolerance = function (e) {
            return (
              h(arguments.length, 1, "setSmoothnessTolerance", "(number)", [[e, "number"]]),
              d.sendWithPromise("GState.setSmoothnessTolerance", { gs: this.id, SM: e })
            )
          }),
          (d.GState.prototype.setBlackGenFunct = function (e) {
            return (
              h(arguments.length, 1, "setBlackGenFunct", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("GState.setBlackGenFunct", { gs: this.id, BG: e.id })
            )
          }),
          (d.GState.prototype.setUCRFunct = function (e) {
            return (
              h(arguments.length, 1, "setUCRFunct", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("GState.setUCRFunct", { gs: this.id, UCR: e.id })
            )
          }),
          (d.GState.prototype.setTransferFunct = function (e) {
            return (
              h(arguments.length, 1, "setTransferFunct", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("GState.setTransferFunct", { gs: this.id, TR: e.id })
            )
          }),
          (d.GState.prototype.setHalftone = function (e) {
            return (
              h(arguments.length, 1, "setHalftone", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("GState.setHalftone", { gs: this.id, HT: e.id })
            )
          }),
          (d.Element.prototype.getType = function () {
            return d.sendWithPromise("Element.getType", { e: this.id })
          }),
          (d.Element.prototype.getGState = function () {
            return d.sendWithPromise("Element.getGState", { e: this.id }).then(function (e) {
              return p(d.GState, e)
            })
          }),
          (d.Element.prototype.getCTM = function () {
            return d.sendWithPromise("Element.getCTM", { e: this.id }).then(function (e) {
              return new d.Matrix2D(e)
            })
          }),
          (d.Element.prototype.getParentStructElement = function () {
            return d
              .sendWithPromise("Element.getParentStructElement", { e: this.id })
              .then(function (e) {
                return new d.SElement(e)
              })
          }),
          (d.Element.prototype.getStructMCID = function () {
            return d.sendWithPromise("Element.getStructMCID", { e: this.id })
          }),
          (d.Element.prototype.isOCVisible = function () {
            return d.sendWithPromise("Element.isOCVisible", { e: this.id })
          }),
          (d.Element.prototype.isClippingPath = function () {
            return d.sendWithPromise("Element.isClippingPath", { e: this.id })
          }),
          (d.Element.prototype.isStroked = function () {
            return d.sendWithPromise("Element.isStroked", { e: this.id })
          }),
          (d.Element.prototype.isFilled = function () {
            return d.sendWithPromise("Element.isFilled", { e: this.id })
          }),
          (d.Element.prototype.isWindingFill = function () {
            return d.sendWithPromise("Element.isWindingFill", { e: this.id })
          }),
          (d.Element.prototype.isClipWindingFill = function () {
            return d.sendWithPromise("Element.isClipWindingFill", { e: this.id })
          }),
          (d.Element.prototype.setPathClip = function (e) {
            return (
              h(arguments.length, 1, "setPathClip", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Element.setPathClip", { e: this.id, clip: e })
            )
          }),
          (d.Element.prototype.setPathStroke = function (e) {
            return (
              h(arguments.length, 1, "setPathStroke", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Element.setPathStroke", { e: this.id, stroke: e })
            )
          }),
          (d.Element.prototype.setPathFill = function (e) {
            return (
              h(arguments.length, 1, "setPathFill", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Element.setPathFill", { e: this.id, fill: e })
            )
          }),
          (d.Element.prototype.setWindingFill = function (e) {
            return (
              h(arguments.length, 1, "setWindingFill", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Element.setWindingFill", { e: this.id, winding_rule: e })
            )
          }),
          (d.Element.prototype.setClipWindingFill = function (e) {
            return (
              h(arguments.length, 1, "setClipWindingFill", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Element.setClipWindingFill", { e: this.id, winding_rule: e })
            )
          }),
          (d.Element.prototype.setPathTypes = function (e, t) {
            return (
              h(arguments.length, 2, "setPathTypes", "(string, number)", [
                [e, "string"],
                [t, "number"],
              ]),
              d.sendWithPromise("Element.setPathTypes", { e: this.id, in_seg_types: e, count: t })
            )
          }),
          (d.Element.prototype.getXObject = function () {
            return d.sendWithPromise("Element.getXObject", { e: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Element.prototype.getImageData = function () {
            return d.sendWithPromise("Element.getImageData", { e: this.id }).then(function (e) {
              return p(d.Filter, e)
            })
          }),
          (d.Element.prototype.getImageDataSize = function () {
            return d.sendWithPromise("Element.getImageDataSize", { e: this.id })
          }),
          (d.Element.prototype.getImageColorSpace = function () {
            return d
              .sendWithPromise("Element.getImageColorSpace", { e: this.id })
              .then(function (e) {
                return o(d.ColorSpace, e)
              })
          }),
          (d.Element.prototype.getImageWidth = function () {
            return d.sendWithPromise("Element.getImageWidth", { e: this.id })
          }),
          (d.Element.prototype.getImageHeight = function () {
            return d.sendWithPromise("Element.getImageHeight", { e: this.id })
          }),
          (d.Element.prototype.getDecodeArray = function () {
            return d.sendWithPromise("Element.getDecodeArray", { e: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Element.prototype.getBitsPerComponent = function () {
            return d.sendWithPromise("Element.getBitsPerComponent", { e: this.id })
          }),
          (d.Element.prototype.getComponentNum = function () {
            return d.sendWithPromise("Element.getComponentNum", { e: this.id })
          }),
          (d.Element.prototype.isImageMask = function () {
            return d.sendWithPromise("Element.isImageMask", { e: this.id })
          }),
          (d.Element.prototype.isImageInterpolate = function () {
            return d.sendWithPromise("Element.isImageInterpolate", { e: this.id })
          }),
          (d.Element.prototype.getMask = function () {
            return d.sendWithPromise("Element.getMask", { e: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Element.prototype.getImageRenderingIntent = function () {
            return d.sendWithPromise("Element.getImageRenderingIntent", { e: this.id })
          }),
          (d.Element.prototype.getTextString = function () {
            return d.sendWithPromise("Element.getTextString", { e: this.id })
          }),
          (d.Element.prototype.getTextMatrix = function () {
            return d.sendWithPromise("Element.getTextMatrix", { e: this.id }).then(function (e) {
              return new d.Matrix2D(e)
            })
          }),
          (d.Element.prototype.getCharIterator = function () {
            return d.sendWithPromise("Element.getCharIterator", { e: this.id }).then(function (e) {
              return o(d.Iterator, e, "CharData")
            })
          }),
          (d.Element.prototype.getTextLength = function () {
            return d.sendWithPromise("Element.getTextLength", { e: this.id })
          }),
          (d.Element.prototype.getPosAdjustment = function () {
            return d.sendWithPromise("Element.getPosAdjustment", { e: this.id })
          }),
          (d.Element.prototype.getNewTextLineOffset = function () {
            return d.sendWithPromise("Element.getNewTextLineOffset", { e: this.id })
          }),
          (d.Element.prototype.hasTextMatrix = function () {
            return d.sendWithPromise("Element.hasTextMatrix", { e: this.id })
          }),
          (d.Element.prototype.setTextData = function (e) {
            h(arguments.length, 1, "setTextData", "(ArrayBuffer|TypedArray)", [[e, "ArrayBuffer"]])
            var t = a(e, !1)
            return d.sendWithPromise("Element.setTextData", { e: this.id, buf_text_data: t })
          }),
          (d.Element.prototype.setTextMatrix = function (e) {
            return (
              h(arguments.length, 1, "setTextMatrix", "(PDFNet.Matrix2D)", [
                [e, "Structure", d.Matrix2D, "Matrix2D"],
              ]),
              l("setTextMatrix", [[e, 0]]),
              d.sendWithPromise("Element.setTextMatrix", { e: this.id, mtx: e })
            )
          }),
          (d.Element.prototype.setTextMatrixEntries = function (e, t, n, i, r, o) {
            return (
              h(
                arguments.length,
                6,
                "setTextMatrixEntries",
                "(number, number, number, number, number, number)",
                [
                  [e, "number"],
                  [t, "number"],
                  [n, "number"],
                  [i, "number"],
                  [r, "number"],
                  [o, "number"],
                ]
              ),
              d.sendWithPromise("Element.setTextMatrixEntries", {
                e: this.id,
                a: e,
                b: t,
                c: n,
                d: i,
                h: r,
                v: o,
              })
            )
          }),
          (d.Element.prototype.setPosAdjustment = function (e) {
            return (
              h(arguments.length, 1, "setPosAdjustment", "(number)", [[e, "number"]]),
              d.sendWithPromise("Element.setPosAdjustment", { e: this.id, adjust: e })
            )
          }),
          (d.Element.prototype.updateTextMetrics = function () {
            return d.sendWithPromise("Element.updateTextMetrics", { e: this.id })
          }),
          (d.Element.prototype.setNewTextLineOffset = function (e, t) {
            return (
              h(arguments.length, 2, "setNewTextLineOffset", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("Element.setNewTextLineOffset", { e: this.id, dx: e, dy: t })
            )
          }),
          (d.Element.prototype.getShading = function () {
            return d.sendWithPromise("Element.getShading", { e: this.id }).then(function (e) {
              return o(d.Shading, e)
            })
          }),
          (d.Element.prototype.getMCPropertyDict = function () {
            return d
              .sendWithPromise("Element.getMCPropertyDict", { e: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.Element.prototype.getMCTag = function () {
            return d.sendWithPromise("Element.getMCTag", { e: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.ShapedText.prototype.getScale = function () {
            return d.sendWithPromise("ShapedText.getScale", { self: this.id })
          }),
          (d.ShapedText.prototype.getShapingStatus = function () {
            return d.sendWithPromise("ShapedText.getShapingStatus", { self: this.id })
          }),
          (d.ShapedText.prototype.getFailureReason = function () {
            return d.sendWithPromise("ShapedText.getFailureReason", { self: this.id })
          }),
          (d.ShapedText.prototype.getText = function () {
            return d.sendWithPromise("ShapedText.getText", { self: this.id })
          }),
          (d.ShapedText.prototype.getNumGlyphs = function () {
            return d.sendWithPromise("ShapedText.getNumGlyphs", { self: this.id })
          }),
          (d.ShapedText.prototype.getGlyph = function (e) {
            return (
              h(arguments.length, 1, "getGlyph", "(number)", [[e, "number"]]),
              d.sendWithPromise("ShapedText.getGlyph", { self: this.id, index: e })
            )
          }),
          (d.ShapedText.prototype.getGlyphXPos = function (e) {
            return (
              h(arguments.length, 1, "getGlyphXPos", "(number)", [[e, "number"]]),
              d.sendWithPromise("ShapedText.getGlyphXPos", { self: this.id, index: e })
            )
          }),
          (d.ShapedText.prototype.getGlyphYPos = function (e) {
            return (
              h(arguments.length, 1, "getGlyphYPos", "(number)", [[e, "number"]]),
              d.sendWithPromise("ShapedText.getGlyphYPos", { self: this.id, index: e })
            )
          }),
          (d.ElementBuilder.create = function () {
            return d.sendWithPromise("elementBuilderCreate", {}).then(function (e) {
              return o(d.ElementBuilder, e)
            })
          }),
          (d.ElementBuilder.prototype.reset = function (e) {
            return (
              void 0 === e && (e = new d.GState("0")),
              h(arguments.length, 0, "reset", "(PDFNet.GState)", [
                [e, "Object", d.GState, "GState"],
              ]),
              d.sendWithPromise("ElementBuilder.reset", { b: this.id, gs: e.id })
            )
          }),
          (d.ElementBuilder.prototype.createImage = function (e) {
            return (
              h(arguments.length, 1, "createImage", "(PDFNet.Image)", [
                [e, "Object", d.Image, "Image"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createImage", { b: this.id, img: e.id })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createImageFromMatrix = function (e, t) {
            return (
              h(arguments.length, 2, "createImageFromMatrix", "(PDFNet.Image, PDFNet.Matrix2D)", [
                [e, "Object", d.Image, "Image"],
                [t, "Structure", d.Matrix2D, "Matrix2D"],
              ]),
              l("createImageFromMatrix", [[t, 1]]),
              d
                .sendWithPromise("ElementBuilder.createImageFromMatrix", {
                  b: this.id,
                  img: e.id,
                  mtx: t,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createImageScaled = function (e, t, n, i, r) {
            return (
              h(
                arguments.length,
                5,
                "createImageScaled",
                "(PDFNet.Image, number, number, number, number)",
                [
                  [e, "Object", d.Image, "Image"],
                  [t, "number"],
                  [n, "number"],
                  [i, "number"],
                  [r, "number"],
                ]
              ),
              d
                .sendWithPromise("ElementBuilder.createImageScaled", {
                  b: this.id,
                  img: e.id,
                  x: t,
                  y: n,
                  hscale: i,
                  vscale: r,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createGroupBegin = function () {
            return d
              .sendWithPromise("ElementBuilder.createGroupBegin", { b: this.id })
              .then(function (e) {
                return p(d.Element, e)
              })
          }),
          (d.ElementBuilder.prototype.createGroupEnd = function () {
            return d
              .sendWithPromise("ElementBuilder.createGroupEnd", { b: this.id })
              .then(function (e) {
                return p(d.Element, e)
              })
          }),
          (d.ElementBuilder.prototype.createShading = function (e) {
            return (
              h(arguments.length, 1, "createShading", "(PDFNet.Shading)", [
                [e, "Object", d.Shading, "Shading"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createShading", { b: this.id, sh: e.id })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createFormFromStream = function (e) {
            return (
              h(arguments.length, 1, "createFormFromStream", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createFormFromStream", { b: this.id, form: e.id })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createFormFromPage = function (e) {
            return (
              h(arguments.length, 1, "createFormFromPage", "(PDFNet.Page)", [
                [e, "Object", d.Page, "Page"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createFormFromPage", { b: this.id, page: e.id })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createFormFromDoc = function (e, t) {
            return (
              h(arguments.length, 2, "createFormFromDoc", "(PDFNet.Page, PDFNet.PDFDoc)", [
                [e, "Object", d.Page, "Page"],
                [t, "PDFDoc"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createFormFromDoc", {
                  b: this.id,
                  page: e.id,
                  doc: t.id,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createTextBeginWithFont = function (e, t) {
            return (
              h(arguments.length, 2, "createTextBeginWithFont", "(PDFNet.Font, number)", [
                [e, "Object", d.Font, "Font"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createTextBeginWithFont", {
                  b: this.id,
                  font: e.id,
                  font_sz: t,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createTextBegin = function () {
            return d
              .sendWithPromise("ElementBuilder.createTextBegin", { b: this.id })
              .then(function (e) {
                return p(d.Element, e)
              })
          }),
          (d.ElementBuilder.prototype.createTextEnd = function () {
            return d
              .sendWithPromise("ElementBuilder.createTextEnd", { b: this.id })
              .then(function (e) {
                return p(d.Element, e)
              })
          }),
          (d.ElementBuilder.prototype.createTextRun = function (e, t, n) {
            return (
              h(arguments.length, 3, "createTextRun", "(string, PDFNet.Font, number)", [
                [e, "string"],
                [t, "Object", d.Font, "Font"],
                [n, "number"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createTextRun", {
                  b: this.id,
                  text_data: e,
                  font: t.id,
                  font_sz: n,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createTextRunUnsigned = function (e, t, n) {
            return (
              h(arguments.length, 3, "createTextRunUnsigned", "(string, PDFNet.Font, number)", [
                [e, "string"],
                [t, "Object", d.Font, "Font"],
                [n, "number"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createTextRunUnsigned", {
                  b: this.id,
                  text_data: e,
                  font: t.id,
                  font_sz: n,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createNewTextRun = function (e) {
            return (
              h(arguments.length, 1, "createNewTextRun", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("ElementBuilder.createNewTextRun", { b: this.id, text_data: e })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createNewTextRunUnsigned = function (e) {
            return (
              h(arguments.length, 1, "createNewTextRunUnsigned", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("ElementBuilder.createNewTextRunUnsigned", {
                  b: this.id,
                  text_data: e,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createShapedTextRun = function (e) {
            return (
              h(arguments.length, 1, "createShapedTextRun", "(PDFNet.ShapedText)", [
                [e, "Object", d.ShapedText, "ShapedText"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createShapedTextRun", {
                  b: this.id,
                  text_data: e.id,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createTextNewLineWithOffset = function (e, t) {
            return (
              h(arguments.length, 2, "createTextNewLineWithOffset", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createTextNewLineWithOffset", {
                  b: this.id,
                  dx: e,
                  dy: t,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createTextNewLine = function () {
            return d
              .sendWithPromise("ElementBuilder.createTextNewLine", { b: this.id })
              .then(function (e) {
                return p(d.Element, e)
              })
          }),
          (d.ElementBuilder.prototype.createPath = function (e, t) {
            h(arguments.length, 2, "createPath", "(Array<number>, ArrayBuffer|TypedArray)", [
              [e, "Array"],
              [t, "ArrayBuffer"],
            ])
            var n = a(t, !1)
            return d
              .sendWithPromise("ElementBuilder.createPath", {
                b: this.id,
                points_list: e,
                buf_seg_types: n,
              })
              .then(function (e) {
                return p(d.Element, e)
              })
          }),
          (d.ElementBuilder.prototype.createRect = function (e, t, n, i) {
            return (
              h(arguments.length, 4, "createRect", "(number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createRect", {
                  b: this.id,
                  x: e,
                  y: t,
                  width: n,
                  height: i,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createEllipse = function (e, t, n, i) {
            return (
              h(arguments.length, 4, "createEllipse", "(number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createEllipse", {
                  b: this.id,
                  x: e,
                  y: t,
                  width: n,
                  height: i,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.pathBegin = function () {
            return d.sendWithPromise("ElementBuilder.pathBegin", { b: this.id })
          }),
          (d.ElementBuilder.prototype.pathEnd = function () {
            return d.sendWithPromise("ElementBuilder.pathEnd", { b: this.id }).then(function (e) {
              return p(d.Element, e)
            })
          }),
          (d.ElementBuilder.prototype.rect = function (e, t, n, i) {
            return (
              h(arguments.length, 4, "rect", "(number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
              ]),
              d.sendWithPromise("ElementBuilder.rect", {
                b: this.id,
                x: e,
                y: t,
                width: n,
                height: i,
              })
            )
          }),
          (d.ElementBuilder.prototype.ellipse = function (e, t, n, i) {
            return (
              h(arguments.length, 4, "ellipse", "(number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
              ]),
              d.sendWithPromise("ElementBuilder.ellipse", {
                b: this.id,
                x: e,
                y: t,
                width: n,
                height: i,
              })
            )
          }),
          (d.ElementBuilder.prototype.moveTo = function (e, t) {
            return (
              h(arguments.length, 2, "moveTo", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("ElementBuilder.moveTo", { b: this.id, x: e, y: t })
            )
          }),
          (d.ElementBuilder.prototype.lineTo = function (e, t) {
            return (
              h(arguments.length, 2, "lineTo", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("ElementBuilder.lineTo", { b: this.id, x: e, y: t })
            )
          }),
          (d.ElementBuilder.prototype.curveTo = function (e, t, n, i, r, o) {
            return (
              h(
                arguments.length,
                6,
                "curveTo",
                "(number, number, number, number, number, number)",
                [
                  [e, "number"],
                  [t, "number"],
                  [n, "number"],
                  [i, "number"],
                  [r, "number"],
                  [o, "number"],
                ]
              ),
              d.sendWithPromise("ElementBuilder.curveTo", {
                b: this.id,
                cx1: e,
                cy1: t,
                cx2: n,
                cy2: i,
                x2: r,
                y2: o,
              })
            )
          }),
          (d.ElementBuilder.prototype.arcTo = function (e, t, n, i, r, o) {
            return (
              h(arguments.length, 6, "arcTo", "(number, number, number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
                [r, "number"],
                [o, "number"],
              ]),
              d.sendWithPromise("ElementBuilder.arcTo", {
                b: this.id,
                x: e,
                y: t,
                width: n,
                height: i,
                start: r,
                extent: o,
              })
            )
          }),
          (d.ElementBuilder.prototype.arcTo2 = function (e, t, n, i, r, o, s) {
            return (
              h(
                arguments.length,
                7,
                "arcTo2",
                "(number, number, number, boolean, boolean, number, number)",
                [
                  [e, "number"],
                  [t, "number"],
                  [n, "number"],
                  [i, "boolean"],
                  [r, "boolean"],
                  [o, "number"],
                  [s, "number"],
                ]
              ),
              d.sendWithPromise("ElementBuilder.arcTo2", {
                b: this.id,
                xr: e,
                yr: t,
                rx: n,
                isLargeArc: i,
                sweep: r,
                endX: o,
                endY: s,
              })
            )
          }),
          (d.ElementBuilder.prototype.closePath = function () {
            return d.sendWithPromise("ElementBuilder.closePath", { b: this.id })
          }),
          (d.ElementBuilder.prototype.createMarkedContentBeginInlineProperties = function (e) {
            return (
              h(arguments.length, 1, "createMarkedContentBeginInlineProperties", "(string)", [
                [e, "string"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createMarkedContentBeginInlineProperties", {
                  b: this.id,
                  tag: e,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createMarkedContentBegin = function (e, t) {
            return (
              h(arguments.length, 2, "createMarkedContentBegin", "(string, PDFNet.Obj)", [
                [e, "string"],
                [t, "Object", d.Obj, "Obj"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createMarkedContentBegin", {
                  b: this.id,
                  tag: e,
                  property_dict: t.id,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createMarkedContentEnd = function () {
            return d
              .sendWithPromise("ElementBuilder.createMarkedContentEnd", { b: this.id })
              .then(function (e) {
                return p(d.Element, e)
              })
          }),
          (d.ElementBuilder.prototype.createMarkedContentPointInlineProperties = function (e) {
            return (
              h(arguments.length, 1, "createMarkedContentPointInlineProperties", "(string)", [
                [e, "string"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createMarkedContentPointInlineProperties", {
                  b: this.id,
                  tag: e,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementBuilder.prototype.createMarkedContentPoint = function (e, t) {
            return (
              h(arguments.length, 2, "createMarkedContentPoint", "(string, PDFNet.Obj)", [
                [e, "string"],
                [t, "Object", d.Obj, "Obj"],
              ]),
              d
                .sendWithPromise("ElementBuilder.createMarkedContentPoint", {
                  b: this.id,
                  tag: e,
                  property_dict: t.id,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.ElementReader.create = function () {
            return d.sendWithPromise("elementReaderCreate", {}).then(function (e) {
              return o(d.ElementReader, e)
            })
          }),
          (d.ElementReader.prototype.beginOnPage = function (e, t) {
            return (
              void 0 === t && (t = new d.OCGContext("0")),
              h(arguments.length, 1, "beginOnPage", "(PDFNet.Page, PDFNet.OCGContext)", [
                [e, "Object", d.Page, "Page"],
                [t, "Object", d.OCGContext, "OCGContext"],
              ]),
              d.sendWithPromise("ElementReader.beginOnPage", { r: this.id, page: e.id, ctx: t.id })
            )
          }),
          (d.ElementReader.prototype.begin = function (e, t, n) {
            return (
              void 0 === t && (t = new d.Obj("0")),
              void 0 === n && (n = new d.OCGContext("0")),
              h(arguments.length, 1, "begin", "(PDFNet.Obj, PDFNet.Obj, PDFNet.OCGContext)", [
                [e, "Object", d.Obj, "Obj"],
                [t, "Object", d.Obj, "Obj"],
                [n, "Object", d.OCGContext, "OCGContext"],
              ]),
              d.sendWithPromise("ElementReader.begin", {
                r: this.id,
                content_stream: e.id,
                resource_dict: t.id,
                ctx: n.id,
              })
            )
          }),
          (d.ElementReader.prototype.appendResource = function (e) {
            return (
              h(arguments.length, 1, "appendResource", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("ElementReader.appendResource", { r: this.id, res: e.id })
            )
          }),
          (d.ElementReader.prototype.next = function () {
            return d.sendWithPromise("ElementReader.next", { r: this.id }).then(function (e) {
              return p(d.Element, e)
            })
          }),
          (d.ElementReader.prototype.current = function () {
            return d.sendWithPromise("ElementReader.current", { r: this.id }).then(function (e) {
              return p(d.Element, e)
            })
          }),
          (d.ElementReader.prototype.formBegin = function () {
            return d.sendWithPromise("ElementReader.formBegin", { r: this.id })
          }),
          (d.ElementReader.prototype.patternBegin = function (e, t) {
            return (
              void 0 === t && (t = !1),
              h(arguments.length, 1, "patternBegin", "(boolean, boolean)", [
                [e, "boolean"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("ElementReader.patternBegin", {
                r: this.id,
                fill_pattern: e,
                reset_ctm_tfm: t,
              })
            )
          }),
          (d.ElementReader.prototype.type3FontBegin = function (t, e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 1, "type3FontBegin", "(PDFNet.CharData, PDFNet.Obj)", [
                [t, "Structure", d.CharData, "CharData"],
                [e, "Object", d.Obj, "Obj"],
              ]),
              l("type3FontBegin", [[t, 0]]),
              (t.yieldFunction = "ElementReader.type3FontBegin"),
              d
                .sendWithPromise("ElementReader.type3FontBegin", {
                  r: this.id,
                  char_data: t,
                  resource_dict: e.id,
                })
                .then(function (e) {
                  ;(t.yieldFunction = void 0), m(e, t)
                })
            )
          }),
          (d.ElementReader.prototype.end = function () {
            return d.sendWithPromise("ElementReader.end", { r: this.id })
          }),
          (d.ElementReader.prototype.getChangesIterator = function () {
            return d
              .sendWithPromise("ElementReader.getChangesIterator", { r: this.id })
              .then(function (e) {
                return o(d.Iterator, e, "Int")
              })
          }),
          (d.ElementReader.prototype.isChanged = function (e) {
            return (
              h(arguments.length, 1, "isChanged", "(number)", [[e, "number"]]),
              d.sendWithPromise("ElementReader.isChanged", { r: this.id, attrib: e })
            )
          }),
          (d.ElementReader.prototype.clearChangeList = function () {
            return d.sendWithPromise("ElementReader.clearChangeList", { r: this.id })
          }),
          (d.ElementReader.prototype.getFont = function (e) {
            return (
              h(arguments.length, 1, "getFont", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("ElementReader.getFont", { r: this.id, name: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          })
        function y(r, o) {
          o = o || {}
          var s = new XMLHttpRequest()
          return new Promise(
            function (t, n) {
              s.open("GET", r, !0),
                (s.responseType = "arraybuffer"),
                o.withCredentials && (s.withCredentials = o.withCredentials),
                (s.onerror = function () {
                  n(Error("Network error occurred"))
                }),
                (s.onload = function (e) {
                  200 == this.status
                    ? ((e = new Uint8Array(s.response)), t(e))
                    : n(Error("Download Failed"))
                })
              var e = o.customHeaders
              if (e) for (var i in e) s.setRequestHeader(i, e[i])
              s.send()
            },
            function () {
              s.abort()
            }
          )
        }
        function D(e) {
          return 0 === e ? "1st" : 1 === e ? "2nd" : 2 === e ? "3rd" : e + 1 + "th"
        }
        ;(d.ElementReader.prototype.getXObject = function (e) {
          return (
            h(arguments.length, 1, "getXObject", "(string)", [[e, "string"]]),
            d
              .sendWithPromise("ElementReader.getXObject", { r: this.id, name: e })
              .then(function (e) {
                return p(d.Obj, e)
              })
          )
        }),
          (d.ElementReader.prototype.getShading = function (e) {
            return (
              h(arguments.length, 1, "getShading", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("ElementReader.getShading", { r: this.id, name: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.ElementReader.prototype.getColorSpace = function (e) {
            return (
              h(arguments.length, 1, "getColorSpace", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("ElementReader.getColorSpace", { r: this.id, name: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.ElementReader.prototype.getPattern = function (e) {
            return (
              h(arguments.length, 1, "getPattern", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("ElementReader.getPattern", { r: this.id, name: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.ElementReader.prototype.getExtGState = function (e) {
            return (
              h(arguments.length, 1, "getExtGState", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("ElementReader.getExtGState", { r: this.id, name: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.ElementWriter.create = function () {
            return d.sendWithPromise("elementWriterCreate", {}).then(function (e) {
              return o(d.ElementWriter, e)
            })
          }),
          (d.ElementWriter.prototype.beginOnPage = function (e, t, n, i, r) {
            return (
              void 0 === t && (t = d.ElementWriter.WriteMode.e_overlay),
              void 0 === n && (n = !0),
              void 0 === i && (i = !0),
              void 0 === r && (r = new d.Obj("0")),
              h(
                arguments.length,
                1,
                "beginOnPage",
                "(PDFNet.Page, number, boolean, boolean, PDFNet.Obj)",
                [
                  [e, "Object", d.Page, "Page"],
                  [t, "number"],
                  [n, "boolean"],
                  [i, "boolean"],
                  [r, "Object", d.Obj, "Obj"],
                ]
              ),
              d.sendWithPromise("ElementWriter.beginOnPage", {
                w: this.id,
                page: e.id,
                placement: t,
                page_coord_sys: n,
                compress: i,
                resources: r.id,
              })
            )
          }),
          (d.ElementWriter.prototype.begin = function (e, t) {
            return (
              void 0 === t && (t = !0),
              h(arguments.length, 1, "begin", "(PDFNet.SDFDoc, boolean)", [
                [e, "SDFDoc"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("ElementWriter.begin", { w: this.id, doc: e.id, compress: t })
            )
          }),
          (d.ElementWriter.prototype.beginOnObj = function (e, t, n) {
            return (
              void 0 === t && (t = !0),
              void 0 === n && (n = new d.Obj("0")),
              h(arguments.length, 1, "beginOnObj", "(PDFNet.Obj, boolean, PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
                [t, "boolean"],
                [n, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("ElementWriter.beginOnObj", {
                w: this.id,
                stream_obj_to_update: e.id,
                compress: t,
                resources: n.id,
              })
            )
          }),
          (d.ElementWriter.prototype.end = function () {
            return d.sendWithPromise("ElementWriter.end", { w: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.ElementWriter.prototype.writeElement = function (e) {
            return (
              h(arguments.length, 1, "writeElement", "(PDFNet.Element)", [
                [e, "Object", d.Element, "Element"],
              ]),
              d.sendWithPromise("ElementWriter.writeElement", { w: this.id, element: e.id })
            )
          }),
          (d.ElementWriter.prototype.writePlacedElement = function (e) {
            return (
              h(arguments.length, 1, "writePlacedElement", "(PDFNet.Element)", [
                [e, "Object", d.Element, "Element"],
              ]),
              d.sendWithPromise("ElementWriter.writePlacedElement", { w: this.id, element: e.id })
            )
          }),
          (d.ElementWriter.prototype.flush = function () {
            return d.sendWithPromise("ElementWriter.flush", { w: this.id })
          }),
          (d.ElementWriter.prototype.writeBuffer = function (e) {
            h(arguments.length, 1, "writeBuffer", "(ArrayBuffer|TypedArray)", [[e, "ArrayBuffer"]])
            var t = a(e, !1)
            return d.sendWithPromise("ElementWriter.writeBuffer", { w: this.id, data_buf: t })
          }),
          (d.ElementWriter.prototype.writeString = function (e) {
            return (
              h(arguments.length, 1, "writeString", "(string)", [[e, "string"]]),
              d.sendWithPromise("ElementWriter.writeString", { w: this.id, str: e })
            )
          }),
          (d.ElementWriter.prototype.setDefaultGState = function (e) {
            return (
              h(arguments.length, 1, "setDefaultGState", "(PDFNet.ElementReader)", [
                [e, "Object", d.ElementReader, "ElementReader"],
              ]),
              d.sendWithPromise("ElementWriter.setDefaultGState", { w: this.id, reader: e.id })
            )
          }),
          (d.ElementWriter.prototype.writeGStateChanges = function (e) {
            return (
              h(arguments.length, 1, "writeGStateChanges", "(PDFNet.Element)", [
                [e, "Object", d.Element, "Element"],
              ]),
              d.sendWithPromise("ElementWriter.writeGStateChanges", { w: this.id, element: e.id })
            )
          }),
          (d.FileSpec.create = function (e, t, n) {
            return (
              void 0 === n && (n = !0),
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, string, boolean)", [
                [e, "SDFDoc"],
                [t, "string"],
                [n, "boolean"],
              ]),
              d
                .sendWithPromise("fileSpecCreate", { doc: e.id, path: t, embed: n })
                .then(function (e) {
                  return p(d.FileSpec, e)
                })
            )
          }),
          (d.FileSpec.createURL = function (e, t) {
            return (
              h(arguments.length, 2, "createURL", "(PDFNet.SDFDoc, string)", [
                [e, "SDFDoc"],
                [t, "string"],
              ]),
              d.sendWithPromise("fileSpecCreateURL", { doc: e.id, url: t }).then(function (e) {
                return p(d.FileSpec, e)
              })
            )
          }),
          (d.FileSpec.createFromObj = function (e) {
            return (
              h(arguments.length, 1, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("fileSpecCreateFromObj", { f: e.id }).then(function (e) {
                return p(d.FileSpec, e)
              })
            )
          }),
          (d.FileSpec.prototype.copy = function () {
            return d.sendWithPromise("FileSpec.copy", { d: this.id }).then(function (e) {
              return p(d.FileSpec, e)
            })
          }),
          (d.FileSpec.prototype.compare = function (e) {
            return (
              h(arguments.length, 1, "compare", "(PDFNet.FileSpec)", [
                [e, "Object", d.FileSpec, "FileSpec"],
              ]),
              d.sendWithPromise("FileSpec.compare", { fs: this.id, d: e.id })
            )
          }),
          (d.FileSpec.prototype.isValid = function () {
            return d.sendWithPromise("FileSpec.isValid", { fs: this.id })
          }),
          (d.FileSpec.prototype.export = function (e) {
            return (
              void 0 === e && (e = ""),
              h(arguments.length, 0, "export", "(string)", [[e, "string"]]),
              d.sendWithPromise("FileSpec.export", { fs: this.id, save_as: e })
            )
          }),
          (d.FileSpec.prototype.getFileData = function () {
            return d.sendWithPromise("FileSpec.getFileData", { fs: this.id }).then(function (e) {
              return p(d.Filter, e)
            })
          }),
          (d.FileSpec.prototype.getFilePath = function () {
            return d.sendWithPromise("FileSpec.getFilePath", { fs: this.id })
          }),
          (d.FileSpec.prototype.setDesc = function (e) {
            return (
              h(arguments.length, 1, "setDesc", "(string)", [[e, "string"]]),
              d.sendWithPromise("FileSpec.setDesc", { fs: this.id, desc: e })
            )
          }),
          (d.FileSpec.prototype.getSDFObj = function () {
            return d.sendWithPromise("FileSpec.getSDFObj", { fs: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Flattener.create = function () {
            return d.sendWithPromise("flattenerCreate", {}).then(function (e) {
              return o(d.Flattener, e)
            })
          }),
          (d.Flattener.prototype.setDPI = function (e) {
            return (
              h(arguments.length, 1, "setDPI", "(number)", [[e, "number"]]),
              d.sendWithPromise("Flattener.setDPI", { flattener: this.id, dpi: e })
            )
          }),
          (d.Flattener.prototype.setThreshold = function (e) {
            return (
              h(arguments.length, 1, "setThreshold", "(number)", [[e, "number"]]),
              d.sendWithPromise("Flattener.setThreshold", { flattener: this.id, threshold: e })
            )
          }),
          (d.Flattener.prototype.setMaximumImagePixels = function (e) {
            return (
              h(arguments.length, 1, "setMaximumImagePixels", "(number)", [[e, "number"]]),
              d.sendWithPromise("Flattener.setMaximumImagePixels", {
                flattener: this.id,
                max_pixels: e,
              })
            )
          }),
          (d.Flattener.prototype.setPreferJPG = function (e) {
            return (
              h(arguments.length, 1, "setPreferJPG", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Flattener.setPreferJPG", { flattener: this.id, jpg: e })
            )
          }),
          (d.Flattener.prototype.setJPGQuality = function (e) {
            return (
              h(arguments.length, 1, "setJPGQuality", "(number)", [[e, "number"]]),
              d.sendWithPromise("Flattener.setJPGQuality", { flattener: this.id, quality: e })
            )
          }),
          (d.Flattener.prototype.setPathHinting = function (e) {
            return (
              h(arguments.length, 1, "setPathHinting", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Flattener.setPathHinting", { flattener: this.id, hinting: e })
            )
          }),
          (d.Flattener.prototype.process = function (e, t) {
            return (
              h(arguments.length, 2, "process", "(PDFNet.PDFDoc, number)", [
                [e, "PDFDoc"],
                [t, "number"],
              ]),
              d.sendWithPromise("Flattener.process", { flattener: this.id, doc: e.id, mode: t })
            )
          }),
          (d.Flattener.prototype.processPage = function (e, t) {
            return (
              h(arguments.length, 2, "processPage", "(PDFNet.Page, number)", [
                [e, "Object", d.Page, "Page"],
                [t, "number"],
              ]),
              d.sendWithPromise("Flattener.processPage", {
                flattener: this.id,
                page: e.id,
                mode: t,
              })
            )
          }),
          (d.Font.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("fontCreateFromObj", { font_dict: e.id }).then(function (e) {
                return o(d.Font, e)
              })
            )
          }),
          (d.Font.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, number)", [
                [e, "SDFDoc"],
                [t, "number"],
              ]),
              d.sendWithPromise("fontCreate", { doc: e.id, type: t }).then(function (e) {
                return o(d.Font, e)
              })
            )
          }),
          (d.Font.createFromFontDescriptor = function (e, t, n) {
            return (
              h(
                arguments.length,
                3,
                "createFromFontDescriptor",
                "(PDFNet.SDFDoc, PDFNet.Font, string)",
                [
                  [e, "SDFDoc"],
                  [t, "Object", d.Font, "Font"],
                  [n, "string"],
                ]
              ),
              d
                .sendWithPromise("fontCreateFromFontDescriptor", {
                  doc: e.id,
                  from: t.id,
                  char_set: n,
                })
                .then(function (e) {
                  return o(d.Font, e)
                })
            )
          }),
          (d.Font.createFromName = function (e, t, n) {
            return (
              h(arguments.length, 3, "createFromName", "(PDFNet.SDFDoc, string, string)", [
                [e, "SDFDoc"],
                [t, "string"],
                [n, "string"],
              ]),
              d
                .sendWithPromise("fontCreateFromName", { doc: e.id, name: t, char_set: n })
                .then(function (e) {
                  return o(d.Font, e)
                })
            )
          }),
          (d.Font.createAndEmbed = function (e, t) {
            return (
              h(arguments.length, 2, "createAndEmbed", "(PDFNet.SDFDoc, number)", [
                [e, "SDFDoc"],
                [t, "number"],
              ]),
              d.sendWithPromise("fontCreateAndEmbed", { doc: e.id, type: t }).then(function (e) {
                return o(d.Font, e)
              })
            )
          }),
          (d.Font.prototype.getType = function () {
            return d.sendWithPromise("Font.getType", { font: this.id })
          }),
          (d.Font.prototype.isSimple = function () {
            return d.sendWithPromise("Font.isSimple", { font: this.id })
          }),
          (d.Font.getTypeFromObj = function (e) {
            return (
              h(arguments.length, 1, "getTypeFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("fontGetTypeFromObj", { font_dict: e.id })
            )
          }),
          (d.Font.prototype.getSDFObj = function () {
            return d.sendWithPromise("Font.getSDFObj", { font: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Font.prototype.getDescriptor = function () {
            return d.sendWithPromise("Font.getDescriptor", { font: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Font.prototype.getName = function () {
            return d.sendWithPromise("Font.getName", { font: this.id })
          }),
          (d.Font.prototype.getFamilyName = function () {
            return d.sendWithPromise("Font.getFamilyName", { font: this.id })
          }),
          (d.Font.prototype.isFixedWidth = function () {
            return d.sendWithPromise("Font.isFixedWidth", { font: this.id })
          }),
          (d.Font.prototype.isSerif = function () {
            return d.sendWithPromise("Font.isSerif", { font: this.id })
          }),
          (d.Font.prototype.isSymbolic = function () {
            return d.sendWithPromise("Font.isSymbolic", { font: this.id })
          }),
          (d.Font.prototype.isItalic = function () {
            return d.sendWithPromise("Font.isItalic", { font: this.id })
          }),
          (d.Font.prototype.isAllCap = function () {
            return d.sendWithPromise("Font.isAllCap", { font: this.id })
          }),
          (d.Font.prototype.isForceBold = function () {
            return d.sendWithPromise("Font.isForceBold", { font: this.id })
          }),
          (d.Font.prototype.isHorizontalMode = function () {
            return d.sendWithPromise("Font.isHorizontalMode", { font: this.id })
          }),
          (d.Font.prototype.getWidth = function (e) {
            return (
              h(arguments.length, 1, "getWidth", "(number)", [[e, "number"]]),
              d.sendWithPromise("Font.getWidth", { font: this.id, char_code: e })
            )
          }),
          (d.Font.prototype.getMaxWidth = function () {
            return d.sendWithPromise("Font.getMaxWidth", { font: this.id })
          }),
          (d.Font.prototype.getMissingWidth = function () {
            return d.sendWithPromise("Font.getMissingWidth", { font: this.id })
          }),
          (d.Font.prototype.getCharCodeIterator = function () {
            return d
              .sendWithPromise("Font.getCharCodeIterator", { font: this.id })
              .then(function (e) {
                return o(d.Iterator, e, "Int")
              })
          }),
          (d.Font.prototype.getShapedText = function (e) {
            return (
              h(arguments.length, 1, "getShapedText", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("Font.getShapedText", { font: this.id, text_to_shape: e })
                .then(function (e) {
                  return o(d.ShapedText, e)
                })
            )
          }),
          (d.Font.prototype.getEncoding = function () {
            return d.sendWithPromise("Font.getEncoding", { font: this.id })
          }),
          (d.Font.prototype.isEmbedded = function () {
            return d.sendWithPromise("Font.isEmbedded", { font: this.id })
          }),
          (d.Font.prototype.getEmbeddedFontName = function () {
            return d.sendWithPromise("Font.getEmbeddedFontName", { font: this.id })
          }),
          (d.Font.prototype.getEmbeddedFont = function () {
            return d.sendWithPromise("Font.getEmbeddedFont", { font: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Font.prototype.getEmbeddedFontBufSize = function () {
            return d.sendWithPromise("Font.getEmbeddedFontBufSize", { font: this.id })
          }),
          (d.Font.prototype.getUnitsPerEm = function () {
            return d.sendWithPromise("Font.getUnitsPerEm", { font: this.id })
          }),
          (d.Font.prototype.getBBox = function () {
            return d.sendWithPromise("Font.getBBox", { font: this.id }).then(function (e) {
              return new d.Rect(e)
            })
          }),
          (d.Font.prototype.getAscent = function () {
            return d.sendWithPromise("Font.getAscent", { font: this.id })
          }),
          (d.Font.prototype.getDescent = function () {
            return d.sendWithPromise("Font.getDescent", { font: this.id })
          }),
          (d.Font.prototype.getStandardType1FontType = function () {
            return d.sendWithPromise("Font.getStandardType1FontType", { font: this.id })
          }),
          (d.Font.prototype.isCFF = function () {
            return d.sendWithPromise("Font.isCFF", { font: this.id })
          }),
          (d.Font.prototype.getType3FontMatrix = function () {
            return d
              .sendWithPromise("Font.getType3FontMatrix", { font: this.id })
              .then(function (e) {
                return new d.Matrix2D(e)
              })
          }),
          (d.Font.prototype.getType3GlyphStream = function (e) {
            return (
              h(arguments.length, 1, "getType3GlyphStream", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("Font.getType3GlyphStream", { font: this.id, char_code: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Font.prototype.getVerticalAdvance = function (e) {
            return (
              h(arguments.length, 1, "getVerticalAdvance", "(number)", [[e, "number"]]),
              d.sendWithPromise("Font.getVerticalAdvance", { font: this.id, char_code: e })
            )
          }),
          (d.Font.prototype.getDescendant = function () {
            return d.sendWithPromise("Font.getDescendant", { font: this.id }).then(function (e) {
              return o(d.Font, e)
            })
          }),
          (d.Font.prototype.mapToCID = function (e) {
            return (
              h(arguments.length, 1, "mapToCID", "(number)", [[e, "number"]]),
              d.sendWithPromise("Font.mapToCID", { font: this.id, char_code: e })
            )
          }),
          (d.Function.create = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("functionCreate", { funct_dict: e.id }).then(function (e) {
                return o(d.Function, e)
              })
            )
          }),
          (d.Function.prototype.getType = function () {
            return d.sendWithPromise("Function.getType", { f: this.id })
          }),
          (d.Function.prototype.getInputCardinality = function () {
            return d.sendWithPromise("Function.getInputCardinality", { f: this.id })
          }),
          (d.Function.prototype.getOutputCardinality = function () {
            return d.sendWithPromise("Function.getOutputCardinality", { f: this.id })
          }),
          (d.Function.prototype.eval = function (e, t) {
            return (
              h(arguments.length, 2, "eval", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("Function.eval", { f: this.id, inval: e, outval: t })
            )
          }),
          (d.Function.prototype.getSDFObj = function () {
            return d.sendWithPromise("Function.getSDFObj", { f: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Highlights.create = function () {
            return d.sendWithPromise("highlightsCreate", {}).then(function (e) {
              return o(d.Highlights, e)
            })
          }),
          (d.Highlights.prototype.copyCtor = function () {
            return d.sendWithPromise("Highlights.copyCtor", { hlts: this.id }).then(function (e) {
              return o(d.Highlights, e)
            })
          }),
          (d.Highlights.prototype.add = function (e) {
            return (
              h(arguments.length, 1, "add", "(PDFNet.Highlights)", [
                [e, "Object", d.Highlights, "Highlights"],
              ]),
              d.sendWithPromise("Highlights.add", { hlts2: this.id, hlts: e.id })
            )
          }),
          (d.Highlights.prototype.saveToString = function () {
            return d.sendWithPromise("Highlights.saveToString", { hlts: this.id })
          }),
          (d.Highlights.prototype.clear = function () {
            return d.sendWithPromise("Highlights.clear", { hlts: this.id })
          }),
          (d.Highlights.prototype.begin = function (e) {
            return (
              h(arguments.length, 1, "begin", "(PDFNet.PDFDoc)", [[e, "PDFDoc"]]),
              d.sendWithPromise("Highlights.begin", { hlts: this.id, doc: e.id })
            )
          }),
          (d.Highlights.prototype.hasNext = function () {
            return d.sendWithPromise("Highlights.hasNext", { hlts: this.id })
          }),
          (d.Highlights.prototype.next = function () {
            return d.sendWithPromise("Highlights.next", { hlts: this.id })
          }),
          (d.Highlights.prototype.getCurrentPageNumber = function () {
            return d.sendWithPromise("Highlights.getCurrentPageNumber", { hlts: this.id })
          }),
          (d.Highlights.prototype.getCurrentTextRange = function () {
            return d
              .sendWithPromise("Highlights.getCurrentTextRange", { hlts: this.id })
              .then(function (e) {
                return p(d.TextRange, e)
              })
          }),
          (d.Image.createFromMemory = function (e, t, n, i, r, o, s) {
            void 0 === s && (s = new d.Obj("0")),
              h(
                arguments.length,
                6,
                "createFromMemory",
                "(PDFNet.SDFDoc, ArrayBuffer|TypedArray, number, number, number, PDFNet.ColorSpace, PDFNet.Obj)",
                [
                  [e, "SDFDoc"],
                  [t, "ArrayBuffer"],
                  [n, "number"],
                  [i, "number"],
                  [r, "number"],
                  [o, "Object", d.ColorSpace, "ColorSpace"],
                  [s, "Object", d.Obj, "Obj"],
                ]
              )
            var u = a(t, !1)
            return d
              .sendWithPromise("imageCreateFromMemory", {
                doc: e.id,
                buf: u,
                width: n,
                height: i,
                bpc: r,
                color_space: o.id,
                encoder_hints: s.id,
              })
              .then(function (e) {
                return p(d.Image, e)
              })
          }),
          (d.Image.createFromMemory2 = function (e, t, n) {
            void 0 === n && (n = new d.Obj("0")),
              h(
                arguments.length,
                2,
                "createFromMemory2",
                "(PDFNet.SDFDoc, ArrayBuffer|TypedArray, PDFNet.Obj)",
                [
                  [e, "SDFDoc"],
                  [t, "ArrayBuffer"],
                  [n, "Object", d.Obj, "Obj"],
                ]
              )
            var i = a(t, !1)
            return d
              .sendWithPromise("imageCreateFromMemory2", { doc: e.id, buf: i, encoder_hints: n.id })
              .then(function (e) {
                return p(d.Image, e)
              })
          }),
          (d.Image.createFromStream = function (e, t, n, i, r, o, s) {
            return (
              void 0 === s && (s = new d.Obj("0")),
              h(
                arguments.length,
                6,
                "createFromStream",
                "(PDFNet.SDFDoc, PDFNet.FilterReader, number, number, number, PDFNet.ColorSpace, PDFNet.Obj)",
                [
                  [e, "SDFDoc"],
                  [t, "Object", d.FilterReader, "FilterReader"],
                  [n, "number"],
                  [i, "number"],
                  [r, "number"],
                  [o, "Object", d.ColorSpace, "ColorSpace"],
                  [s, "Object", d.Obj, "Obj"],
                ]
              ),
              d
                .sendWithPromise("imageCreateFromStream", {
                  doc: e.id,
                  image_data: t.id,
                  width: n,
                  height: i,
                  bpc: r,
                  color_space: o.id,
                  encoder_hints: s.id,
                })
                .then(function (e) {
                  return p(d.Image, e)
                })
            )
          }),
          (d.Image.createFromStream2 = function (e, t, n) {
            return (
              void 0 === n && (n = new d.Obj("0")),
              h(
                arguments.length,
                2,
                "createFromStream2",
                "(PDFNet.SDFDoc, PDFNet.Filter, PDFNet.Obj)",
                [
                  [e, "SDFDoc"],
                  [t, "Object", d.Filter, "Filter"],
                  [n, "Object", d.Obj, "Obj"],
                ]
              ),
              0 != t.id && O(t.id),
              d
                .sendWithPromise("imageCreateFromStream2", {
                  doc: e.id,
                  no_own_image_data: t.id,
                  encoder_hints: n.id,
                })
                .then(function (e) {
                  return p(d.Image, e)
                })
            )
          }),
          (d.Image.createImageMask = function (e, t, n, i, r) {
            void 0 === r && (r = new d.Obj("0")),
              h(
                arguments.length,
                4,
                "createImageMask",
                "(PDFNet.SDFDoc, ArrayBuffer|TypedArray, number, number, PDFNet.Obj)",
                [
                  [e, "SDFDoc"],
                  [t, "ArrayBuffer"],
                  [n, "number"],
                  [i, "number"],
                  [r, "Object", d.Obj, "Obj"],
                ]
              )
            var o = a(t, !1)
            return d
              .sendWithPromise("imageCreateImageMask", {
                doc: e.id,
                buf: o,
                width: n,
                height: i,
                encoder_hints: r.id,
              })
              .then(function (e) {
                return p(d.Image, e)
              })
          }),
          (d.Image.createImageMaskFromStream = function (e, t, n, i, r) {
            return (
              void 0 === r && (r = new d.Obj("0")),
              h(
                arguments.length,
                4,
                "createImageMaskFromStream",
                "(PDFNet.SDFDoc, PDFNet.FilterReader, number, number, PDFNet.Obj)",
                [
                  [e, "SDFDoc"],
                  [t, "Object", d.FilterReader, "FilterReader"],
                  [n, "number"],
                  [i, "number"],
                  [r, "Object", d.Obj, "Obj"],
                ]
              ),
              d
                .sendWithPromise("imageCreateImageMaskFromStream", {
                  doc: e.id,
                  image_data: t.id,
                  width: n,
                  height: i,
                  encoder_hints: r.id,
                })
                .then(function (e) {
                  return p(d.Image, e)
                })
            )
          }),
          (d.Image.createSoftMask = function (e, t, n, i, r, o) {
            void 0 === o && (o = new d.Obj("0")),
              h(
                arguments.length,
                5,
                "createSoftMask",
                "(PDFNet.SDFDoc, ArrayBuffer|TypedArray, number, number, number, PDFNet.Obj)",
                [
                  [e, "SDFDoc"],
                  [t, "ArrayBuffer"],
                  [n, "number"],
                  [i, "number"],
                  [r, "number"],
                  [o, "Object", d.Obj, "Obj"],
                ]
              )
            var s = a(t, !1)
            return d
              .sendWithPromise("imageCreateSoftMask", {
                doc: e.id,
                buf: s,
                width: n,
                height: i,
                bpc: r,
                encoder_hints: o.id,
              })
              .then(function (e) {
                return p(d.Image, e)
              })
          }),
          (d.Image.createSoftMaskFromStream = function (e, t, n, i, r, o) {
            return (
              void 0 === o && (o = new d.Obj("0")),
              h(
                arguments.length,
                5,
                "createSoftMaskFromStream",
                "(PDFNet.SDFDoc, PDFNet.FilterReader, number, number, number, PDFNet.Obj)",
                [
                  [e, "SDFDoc"],
                  [t, "Object", d.FilterReader, "FilterReader"],
                  [n, "number"],
                  [i, "number"],
                  [r, "number"],
                  [o, "Object", d.Obj, "Obj"],
                ]
              ),
              d
                .sendWithPromise("imageCreateSoftMaskFromStream", {
                  doc: e.id,
                  image_data: t.id,
                  width: n,
                  height: i,
                  bpc: r,
                  encoder_hints: o.id,
                })
                .then(function (e) {
                  return p(d.Image, e)
                })
            )
          }),
          (d.Image.createDirectFromMemory = function (e, t, n, i, r, o, s) {
            h(
              arguments.length,
              7,
              "createDirectFromMemory",
              "(PDFNet.SDFDoc, ArrayBuffer|TypedArray, number, number, number, PDFNet.ColorSpace, number)",
              [
                [e, "SDFDoc"],
                [t, "ArrayBuffer"],
                [n, "number"],
                [i, "number"],
                [r, "number"],
                [o, "Object", d.ColorSpace, "ColorSpace"],
                [s, "number"],
              ]
            )
            var u = a(t, !1)
            return d
              .sendWithPromise("imageCreateDirectFromMemory", {
                doc: e.id,
                buf: u,
                width: n,
                height: i,
                bpc: r,
                color_space: o.id,
                input_format: s,
              })
              .then(function (e) {
                return p(d.Image, e)
              })
          }),
          (d.Image.createDirectFromStream = function (e, t, n, i, r, o, s) {
            return (
              h(
                arguments.length,
                7,
                "createDirectFromStream",
                "(PDFNet.SDFDoc, PDFNet.FilterReader, number, number, number, PDFNet.ColorSpace, number)",
                [
                  [e, "SDFDoc"],
                  [t, "Object", d.FilterReader, "FilterReader"],
                  [n, "number"],
                  [i, "number"],
                  [r, "number"],
                  [o, "Object", d.ColorSpace, "ColorSpace"],
                  [s, "number"],
                ]
              ),
              d
                .sendWithPromise("imageCreateDirectFromStream", {
                  doc: e.id,
                  image_data: t.id,
                  width: n,
                  height: i,
                  bpc: r,
                  color_space: o.id,
                  input_format: s,
                })
                .then(function (e) {
                  return p(d.Image, e)
                })
            )
          }),
          (d.Image.createFromObj = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("imageCreateFromObj", { image_xobject: e.id }).then(function (e) {
                return p(d.Image, e)
              })
            )
          }),
          (d.Image.prototype.copy = function () {
            return d.sendWithPromise("Image.copy", { c: this.id }).then(function (e) {
              return p(d.Image, e)
            })
          }),
          (d.Image.prototype.getSDFObj = function () {
            return d.sendWithPromise("Image.getSDFObj", { img: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Image.prototype.isValid = function () {
            return d.sendWithPromise("Image.isValid", { img: this.id })
          }),
          (d.Image.prototype.getImageData = function () {
            return d.sendWithPromise("Image.getImageData", { img: this.id }).then(function (e) {
              return p(d.Filter, e)
            })
          }),
          (d.Image.prototype.getImageDataSize = function () {
            return d.sendWithPromise("Image.getImageDataSize", { img: this.id })
          }),
          (d.Image.prototype.getImageColorSpace = function () {
            return d
              .sendWithPromise("Image.getImageColorSpace", { img: this.id })
              .then(function (e) {
                return o(d.ColorSpace, e)
              })
          }),
          (d.Image.prototype.getImageWidth = function () {
            return d.sendWithPromise("Image.getImageWidth", { img: this.id })
          }),
          (d.Image.prototype.getImageHeight = function () {
            return d.sendWithPromise("Image.getImageHeight", { img: this.id })
          }),
          (d.Image.prototype.getDecodeArray = function () {
            return d.sendWithPromise("Image.getDecodeArray", { img: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Image.prototype.getBitsPerComponent = function () {
            return d.sendWithPromise("Image.getBitsPerComponent", { img: this.id })
          }),
          (d.Image.prototype.getComponentNum = function () {
            return d.sendWithPromise("Image.getComponentNum", { img: this.id })
          }),
          (d.Image.prototype.isImageMask = function () {
            return d.sendWithPromise("Image.isImageMask", { img: this.id })
          }),
          (d.Image.prototype.isImageInterpolate = function () {
            return d.sendWithPromise("Image.isImageInterpolate", { img: this.id })
          }),
          (d.Image.prototype.getMask = function () {
            return d.sendWithPromise("Image.getMask", { img: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Image.prototype.setMask = function (e) {
            return (
              h(arguments.length, 1, "setMask", "(PDFNet.Image)", [
                [e, "Object", d.Image, "Image"],
              ]),
              d.sendWithPromise("Image.setMask", { img: this.id, image_mask: e.id })
            )
          }),
          (d.Image.prototype.setMaskWithObj = function (e) {
            return (
              h(arguments.length, 1, "setMaskWithObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("Image.setMaskWithObj", { img: this.id, mask: e.id })
            )
          }),
          (d.Image.prototype.getSoftMask = function () {
            return d.sendWithPromise("Image.getSoftMask", { img: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Image.prototype.setSoftMask = function (e) {
            return (
              h(arguments.length, 1, "setSoftMask", "(PDFNet.Image)", [
                [e, "Object", d.Image, "Image"],
              ]),
              d.sendWithPromise("Image.setSoftMask", { img: this.id, soft_mask: e.id })
            )
          }),
          (d.Image.prototype.getImageRenderingIntent = function () {
            return d.sendWithPromise("Image.getImageRenderingIntent", { img: this.id })
          }),
          (d.Image.prototype.exportFromStream = function (e) {
            return (
              h(arguments.length, 1, "exportFromStream", "(PDFNet.FilterWriter)", [
                [e, "Object", d.FilterWriter, "FilterWriter"],
              ]),
              d.sendWithPromise("Image.exportFromStream", { img: this.id, writer: e.id })
            )
          }),
          (d.Image.prototype.exportAsTiffFromStream = function (e) {
            return (
              h(arguments.length, 1, "exportAsTiffFromStream", "(PDFNet.FilterWriter)", [
                [e, "Object", d.FilterWriter, "FilterWriter"],
              ]),
              d.sendWithPromise("Image.exportAsTiffFromStream", { img: this.id, writer: e.id })
            )
          }),
          (d.Image.prototype.exportAsPngFromStream = function (e) {
            return (
              h(arguments.length, 1, "exportAsPngFromStream", "(PDFNet.FilterWriter)", [
                [e, "Object", d.FilterWriter, "FilterWriter"],
              ]),
              d.sendWithPromise("Image.exportAsPngFromStream", { img: this.id, writer: e.id })
            )
          }),
          (d.PageLabel.create = function (e, t, n, i) {
            return (
              void 0 === n && (n = ""),
              void 0 === i && (i = 1),
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, number, string, number)", [
                [e, "SDFDoc"],
                [t, "number"],
                [n, "string"],
                [i, "number"],
              ]),
              d
                .sendWithPromise("pageLabelCreate", { doc: e.id, style: t, prefix: n, start_at: i })
                .then(function (e) {
                  return new d.PageLabel(e)
                })
            )
          }),
          (d.PageLabel.createFromObj = function (e, t, n) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              void 0 === t && (t = -1),
              void 0 === n && (n = -1),
              h(arguments.length, 0, "createFromObj", "(PDFNet.Obj, number, number)", [
                [e, "Object", d.Obj, "Obj"],
                [t, "number"],
                [n, "number"],
              ]),
              d
                .sendWithPromise("pageLabelCreateFromObj", { l: e.id, first_page: t, last_page: n })
                .then(function (e) {
                  return new d.PageLabel(e)
                })
            )
          }),
          (d.PageLabel.prototype.compare = function (e) {
            h(arguments.length, 1, "compare", "(PDFNet.PageLabel)", [
              [e, "Structure", d.PageLabel, "PageLabel"],
            ]),
              u("compare", this.yieldFunction),
              l("compare", [[e, 0]])
            var t = this
            return (
              (this.yieldFunction = "PageLabel.compare"),
              d.sendWithPromise("PageLabel.compare", { l: this, d: e }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.l, t), e.result
              })
            )
          }),
          (d.PageLabel.prototype.isValid = function () {
            return (
              u("isValid", this.yieldFunction), d.sendWithPromise("PageLabel.isValid", { l: this })
            )
          }),
          (d.PageLabel.prototype.getLabelTitle = function (e) {
            h(arguments.length, 1, "getLabelTitle", "(number)", [[e, "number"]]),
              u("getLabelTitle", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "PageLabel.getLabelTitle"),
              d
                .sendWithPromise("PageLabel.getLabelTitle", { l: this, page_num: e })
                .then(function (e) {
                  return (t.yieldFunction = void 0), m(e.l, t), e.result
                })
            )
          }),
          (d.PageLabel.prototype.setStyle = function (e) {
            h(arguments.length, 1, "setStyle", "(number)", [[e, "number"]]),
              u("setStyle", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "PageLabel.setStyle"),
              d.sendWithPromise("PageLabel.setStyle", { l: this, style: e }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.PageLabel.prototype.getStyle = function () {
            return (
              u("getStyle", this.yieldFunction),
              d.sendWithPromise("PageLabel.getStyle", { l: this })
            )
          }),
          (d.PageLabel.prototype.getPrefix = function () {
            return (
              u("getPrefix", this.yieldFunction),
              d.sendWithPromise("PageLabel.getPrefix", { l: this })
            )
          }),
          (d.PageLabel.prototype.setPrefix = function (e) {
            h(arguments.length, 1, "setPrefix", "(string)", [[e, "string"]]),
              u("setPrefix", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "PageLabel.setPrefix"),
              d.sendWithPromise("PageLabel.setPrefix", { l: this, prefix: e }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.PageLabel.prototype.getStart = function () {
            return (
              u("getStart", this.yieldFunction),
              d.sendWithPromise("PageLabel.getStart", { l: this })
            )
          }),
          (d.PageLabel.prototype.setStart = function (e) {
            h(arguments.length, 1, "setStart", "(number)", [[e, "number"]]),
              u("setStart", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "PageLabel.setStart"),
              d.sendWithPromise("PageLabel.setStart", { l: this, start_at: e }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.PageLabel.prototype.getFirstPageNum = function () {
            u("getFirstPageNum", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "PageLabel.getFirstPageNum"),
              d.sendWithPromise("PageLabel.getFirstPageNum", { l: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.l, t), e.result
              })
            )
          }),
          (d.PageLabel.prototype.getLastPageNum = function () {
            u("getLastPageNum", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "PageLabel.getLastPageNum"),
              d.sendWithPromise("PageLabel.getLastPageNum", { l: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.l, t), e.result
              })
            )
          }),
          (d.PageLabel.prototype.getSDFObj = function () {
            return (
              u("getSDFObj", this.yieldFunction),
              d.sendWithPromise("PageLabel.getSDFObj", { l: this }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.PageSet.create = function () {
            return d.sendWithPromise("pageSetCreate", {}).then(function (e) {
              return o(d.PageSet, e)
            })
          }),
          (d.PageSet.createSinglePage = function (e) {
            return (
              h(arguments.length, 1, "createSinglePage", "(number)", [[e, "number"]]),
              d.sendWithPromise("pageSetCreateSinglePage", { one_page: e }).then(function (e) {
                return o(d.PageSet, e)
              })
            )
          }),
          (d.PageSet.createRange = function (e, t) {
            return (
              h(arguments.length, 2, "createRange", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("pageSetCreateRange", { range_start: e, range_end: t })
                .then(function (e) {
                  return o(d.PageSet, e)
                })
            )
          }),
          (d.PageSet.createFilteredRange = function (e, t, n) {
            return (
              void 0 === n && (n = d.PageSet.Filter.e_all),
              h(arguments.length, 2, "createFilteredRange", "(number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
              ]),
              d
                .sendWithPromise("pageSetCreateFilteredRange", {
                  range_start: e,
                  range_end: t,
                  filter: n,
                })
                .then(function (e) {
                  return o(d.PageSet, e)
                })
            )
          }),
          (d.PageSet.prototype.addPage = function (e) {
            return (
              h(arguments.length, 1, "addPage", "(number)", [[e, "number"]]),
              d.sendWithPromise("PageSet.addPage", { page_set: this.id, one_page: e })
            )
          }),
          (d.PageSet.prototype.addRange = function (e, t, n) {
            return (
              void 0 === n && (n = d.PageSet.Filter.e_all),
              h(arguments.length, 2, "addRange", "(number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
              ]),
              d.sendWithPromise("PageSet.addRange", {
                page_set: this.id,
                range_start: e,
                range_end: t,
                filter: n,
              })
            )
          }),
          (d.PatternColor.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("patternColorCreate", { pattern: e.id }).then(function (e) {
                return o(d.PatternColor, e)
              })
            )
          }),
          (d.PatternColor.getTypeFromObj = function (e) {
            return (
              h(arguments.length, 1, "getTypeFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("patternColorGetTypeFromObj", { pattern: e.id })
            )
          }),
          (d.PatternColor.prototype.getType = function () {
            return d.sendWithPromise("PatternColor.getType", { pc: this.id })
          }),
          (d.PatternColor.prototype.getSDFObj = function () {
            return d.sendWithPromise("PatternColor.getSDFObj", { pc: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.PatternColor.prototype.getMatrix = function () {
            return d.sendWithPromise("PatternColor.getMatrix", { pc: this.id }).then(function (e) {
              return new d.Matrix2D(e)
            })
          }),
          (d.PatternColor.prototype.getShading = function () {
            return d.sendWithPromise("PatternColor.getShading", { pc: this.id }).then(function (e) {
              return o(d.Shading, e)
            })
          }),
          (d.PatternColor.prototype.getTilingType = function () {
            return d.sendWithPromise("PatternColor.getTilingType", { pc: this.id })
          }),
          (d.PatternColor.prototype.getBBox = function () {
            return d.sendWithPromise("PatternColor.getBBox", { pc: this.id }).then(function (e) {
              return new d.Rect(e)
            })
          }),
          (d.PatternColor.prototype.getXStep = function () {
            return d.sendWithPromise("PatternColor.getXStep", { pc: this.id })
          }),
          (d.PatternColor.prototype.getYStep = function () {
            return d.sendWithPromise("PatternColor.getYStep", { pc: this.id })
          }),
          (d.GeometryCollection.prototype.snapToNearest = function (e, t, n) {
            return (
              h(arguments.length, 3, "snapToNearest", "(number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
              ]),
              d.sendWithPromise("GeometryCollection.snapToNearest", {
                self: this.id,
                x: e,
                y: t,
                mode: n,
              })
            )
          }),
          (d.GeometryCollection.prototype.snapToNearestPixel = function (e, t, n, i) {
            return (
              h(arguments.length, 4, "snapToNearestPixel", "(number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
              ]),
              d.sendWithPromise("GeometryCollection.snapToNearestPixel", {
                self: this.id,
                x: e,
                y: t,
                dpi: n,
                mode: i,
              })
            )
          }),
          (d.DigestAlgorithm.calculateDigest = function (e, t) {
            h(arguments.length, 2, "calculateDigest", "(number, ArrayBuffer|TypedArray)", [
              [e, "number"],
              [t, "ArrayBuffer"],
            ])
            var n = a(t, !1)
            return d
              .sendWithPromise("digestAlgorithmCalculateDigest", { in_algorithm: e, in_buffer: n })
              .then(function (e) {
                return new Uint8Array(e)
              })
          }),
          (d.ObjectIdentifier.createFromPredefined = function (e) {
            return (
              h(arguments.length, 1, "createFromPredefined", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("objectIdentifierCreateFromPredefined", { in_oid_enum: e })
                .then(function (e) {
                  return o(d.ObjectIdentifier, e)
                })
            )
          }),
          (d.ObjectIdentifier.createFromIntArray = function (e) {
            return (
              h(arguments.length, 1, "createFromIntArray", "(Array<number>)", [[e, "Array"]]),
              d
                .sendWithPromise("objectIdentifierCreateFromIntArray", { in_list: e })
                .then(function (e) {
                  return o(d.ObjectIdentifier, e)
                })
            )
          }),
          (d.ObjectIdentifier.createFromDigestAlgorithm = function (e) {
            return (
              h(arguments.length, 1, "createFromDigestAlgorithm", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("objectIdentifierCreateFromDigestAlgorithm", { in_algorithm: e })
                .then(function (e) {
                  return o(d.ObjectIdentifier, e)
                })
            )
          }),
          (d.ObjectIdentifier.prototype.getRawValue = function () {
            return d.sendWithPromise("ObjectIdentifier.getRawValue", { self: this.id })
          }),
          (d.X501DistinguishedName.prototype.hasAttribute = function (e) {
            return (
              h(arguments.length, 1, "hasAttribute", "(PDFNet.ObjectIdentifier)", [
                [e, "Object", d.ObjectIdentifier, "ObjectIdentifier"],
              ]),
              d.sendWithPromise("X501DistinguishedName.hasAttribute", {
                self: this.id,
                in_oid: e.id,
              })
            )
          }),
          (d.X501DistinguishedName.prototype.getStringValuesForAttribute = function (e) {
            return (
              h(arguments.length, 1, "getStringValuesForAttribute", "(PDFNet.ObjectIdentifier)", [
                [e, "Object", d.ObjectIdentifier, "ObjectIdentifier"],
              ]),
              d.sendWithPromise("X501DistinguishedName.getStringValuesForAttribute", {
                self: this.id,
                in_oid: e.id,
              })
            )
          }),
          (d.X501DistinguishedName.prototype.getAllAttributesAndValues = function () {
            return d
              .sendWithPromise("X501DistinguishedName.getAllAttributesAndValues", { self: this.id })
              .then(function (e) {
                for (var t = [], n = 0; n < e.length; ++n) {
                  var i = e[n]
                  if ("0" === i) return null
                  ;(i = new d.X501AttributeTypeAndValue(i)),
                    t.push(i),
                    g.push({ name: i.name, id: i.id })
                }
                return t
              })
          }),
          (d.X509Certificate.createFromBuffer = function (e) {
            h(arguments.length, 1, "createFromBuffer", "(ArrayBuffer|TypedArray)", [
              [e, "ArrayBuffer"],
            ])
            var t = a(e, !1)
            return d
              .sendWithPromise("x509CertificateCreateFromBuffer", { in_cert_buf: t })
              .then(function (e) {
                return o(d.X509Certificate, e)
              })
          }),
          (d.X509Certificate.prototype.getIssuerField = function () {
            return d
              .sendWithPromise("X509Certificate.getIssuerField", { self: this.id })
              .then(function (e) {
                return o(d.X501DistinguishedName, e)
              })
          }),
          (d.X509Certificate.prototype.getSubjectField = function () {
            return d
              .sendWithPromise("X509Certificate.getSubjectField", { self: this.id })
              .then(function (e) {
                return o(d.X501DistinguishedName, e)
              })
          }),
          (d.X509Certificate.prototype.getNotBeforeEpochTime = function () {
            return d.sendWithPromise("X509Certificate.getNotBeforeEpochTime", { self: this.id })
          }),
          (d.X509Certificate.prototype.getNotAfterEpochTime = function () {
            return d.sendWithPromise("X509Certificate.getNotAfterEpochTime", { self: this.id })
          }),
          (d.X509Certificate.prototype.getRawX509VersionNumber = function () {
            return d.sendWithPromise("X509Certificate.getRawX509VersionNumber", { self: this.id })
          }),
          (d.X509Certificate.prototype.toString = function () {
            return d.sendWithPromise("X509Certificate.toString", { self: this.id })
          }),
          (d.X509Certificate.prototype.getFingerprint = function (e) {
            return (
              void 0 === e && (e = d.DigestAlgorithm.Type.e_SHA256),
              h(arguments.length, 0, "getFingerprint", "(number)", [[e, "number"]]),
              d.sendWithPromise("X509Certificate.getFingerprint", {
                self: this.id,
                in_digest_algorithm: e,
              })
            )
          }),
          (d.X509Certificate.prototype.getSerialNumber = function () {
            return d
              .sendWithPromise("X509Certificate.getSerialNumber", { self: this.id })
              .then(function (e) {
                return new Uint8Array(e)
              })
          }),
          (d.X509Certificate.prototype.getExtensions = function () {
            return d
              .sendWithPromise("X509Certificate.getExtensions", { self: this.id })
              .then(function (e) {
                for (var t = [], n = 0; n < e.length; ++n) {
                  var i = e[n]
                  if ("0" === i) return null
                  ;(i = new d.X509Extension(i)), t.push(i), g.push({ name: i.name, id: i.id })
                }
                return t
              })
          }),
          (d.X509Certificate.prototype.getData = function () {
            return d
              .sendWithPromise("X509Certificate.getData", { self: this.id })
              .then(function (e) {
                return new Uint8Array(e)
              })
          }),
          (d.TimestampingConfiguration.createFromURL = function (e) {
            return (
              h(arguments.length, 1, "createFromURL", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("timestampingConfigurationCreateFromURL", { in_url: e })
                .then(function (e) {
                  return o(d.TimestampingConfiguration, e)
                })
            )
          }),
          (d.TimestampingConfiguration.prototype.setTimestampAuthorityServerURL = function (e) {
            return (
              h(arguments.length, 1, "setTimestampAuthorityServerURL", "(string)", [[e, "string"]]),
              d.sendWithPromise("TimestampingConfiguration.setTimestampAuthorityServerURL", {
                self: this.id,
                in_url: e,
              })
            )
          }),
          (d.TimestampingConfiguration.prototype.setTimestampAuthorityServerUsername = function (
            e
          ) {
            return (
              h(arguments.length, 1, "setTimestampAuthorityServerUsername", "(string)", [
                [e, "string"],
              ]),
              d.sendWithPromise("TimestampingConfiguration.setTimestampAuthorityServerUsername", {
                self: this.id,
                in_username: e,
              })
            )
          }),
          (d.TimestampingConfiguration.prototype.setTimestampAuthorityServerPassword = function (
            e
          ) {
            return (
              h(arguments.length, 1, "setTimestampAuthorityServerPassword", "(string)", [
                [e, "string"],
              ]),
              d.sendWithPromise("TimestampingConfiguration.setTimestampAuthorityServerPassword", {
                self: this.id,
                in_password: e,
              })
            )
          }),
          (d.TimestampingConfiguration.prototype.setUseNonce = function (e) {
            return (
              h(arguments.length, 1, "setUseNonce", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("TimestampingConfiguration.setUseNonce", {
                self: this.id,
                in_use_nonce: e,
              })
            )
          }),
          (d.TimestampingConfiguration.prototype.testConfiguration = function (e) {
            return (
              h(arguments.length, 1, "testConfiguration", "(PDFNet.VerificationOptions)", [
                [e, "Object", d.VerificationOptions, "VerificationOptions"],
              ]),
              d
                .sendWithPromise("TimestampingConfiguration.testConfiguration", {
                  self: this.id,
                  in_opts: e.id,
                })
                .then(function (e) {
                  return o(d.TimestampingResult, e)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.hasCryptographicSignature = function () {
            return (
              u("hasCryptographicSignature", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.hasCryptographicSignature", { self: this })
            )
          }),
          (d.DigitalSignatureField.prototype.getSubFilter = function () {
            return (
              u("getSubFilter", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.getSubFilter", { self: this })
            )
          }),
          (d.DigitalSignatureField.prototype.getSignatureName = function () {
            return (
              u("getSignatureName", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.getSignatureName", { self: this })
            )
          }),
          (d.DigitalSignatureField.prototype.getLocation = function () {
            return (
              u("getLocation", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.getLocation", { self: this })
            )
          }),
          (d.DigitalSignatureField.prototype.getReason = function () {
            return (
              u("getReason", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.getReason", { self: this })
            )
          }),
          (d.DigitalSignatureField.prototype.getContactInfo = function () {
            return (
              u("getContactInfo", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.getContactInfo", { self: this })
            )
          }),
          (d.DigitalSignatureField.prototype.getCertCount = function () {
            return (
              u("getCertCount", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.getCertCount", { self: this })
            )
          }),
          (d.DigitalSignatureField.prototype.hasVisibleAppearance = function () {
            return (
              u("hasVisibleAppearance", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.hasVisibleAppearance", { self: this })
            )
          }),
          (d.DigitalSignatureField.prototype.setContactInfo = function (e) {
            h(arguments.length, 1, "setContactInfo", "(string)", [[e, "string"]]),
              u("setContactInfo", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "DigitalSignatureField.setContactInfo"),
              d
                .sendWithPromise("DigitalSignatureField.setContactInfo", {
                  self: this,
                  in_contact_info: e,
                })
                .then(function (e) {
                  ;(t.yieldFunction = void 0), m(e, t)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.setLocation = function (e) {
            h(arguments.length, 1, "setLocation", "(string)", [[e, "string"]]),
              u("setLocation", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "DigitalSignatureField.setLocation"),
              d
                .sendWithPromise("DigitalSignatureField.setLocation", {
                  self: this,
                  in_location: e,
                })
                .then(function (e) {
                  ;(t.yieldFunction = void 0), m(e, t)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.setReason = function (e) {
            h(arguments.length, 1, "setReason", "(string)", [[e, "string"]]),
              u("setReason", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "DigitalSignatureField.setReason"),
              d
                .sendWithPromise("DigitalSignatureField.setReason", { self: this, in_reason: e })
                .then(function (e) {
                  ;(t.yieldFunction = void 0), m(e, t)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.setDocumentPermissions = function (e) {
            h(arguments.length, 1, "setDocumentPermissions", "(number)", [[e, "number"]]),
              u("setDocumentPermissions", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "DigitalSignatureField.setDocumentPermissions"),
              d
                .sendWithPromise("DigitalSignatureField.setDocumentPermissions", {
                  self: this,
                  in_perms: e,
                })
                .then(function (e) {
                  ;(t.yieldFunction = void 0), m(e, t)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.signOnNextSave = function (e, t) {
            h(arguments.length, 2, "signOnNextSave", "(string, string)", [
              [e, "string"],
              [t, "string"],
            ]),
              u("signOnNextSave", this.yieldFunction)
            var n = this
            return (
              (this.yieldFunction = "DigitalSignatureField.signOnNextSave"),
              d
                .sendWithPromise("DigitalSignatureField.signOnNextSave", {
                  self: this,
                  in_pkcs12_keyfile_path: e,
                  in_password: t,
                })
                .then(function (e) {
                  ;(n.yieldFunction = void 0), m(e, n)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.certifyOnNextSave = function (e, t) {
            h(arguments.length, 2, "certifyOnNextSave", "(string, string)", [
              [e, "string"],
              [t, "string"],
            ]),
              u("certifyOnNextSave", this.yieldFunction)
            var n = this
            return (
              (this.yieldFunction = "DigitalSignatureField.certifyOnNextSave"),
              d
                .sendWithPromise("DigitalSignatureField.certifyOnNextSave", {
                  self: this,
                  in_pkcs12_keyfile_path: e,
                  in_password: t,
                })
                .then(function (e) {
                  ;(n.yieldFunction = void 0), m(e, n)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.isLockedByDigitalSignature = function () {
            return (
              u("isLockedByDigitalSignature", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.isLockedByDigitalSignature", { self: this })
            )
          }),
          (d.DigitalSignatureField.prototype.getDocumentPermissions = function () {
            return (
              u("getDocumentPermissions", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.getDocumentPermissions", { self: this })
            )
          }),
          (d.DigitalSignatureField.prototype.clearSignature = function () {
            u("clearSignature", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "DigitalSignatureField.clearSignature"),
              d
                .sendWithPromise("DigitalSignatureField.clearSignature", { self: this })
                .then(function (e) {
                  ;(t.yieldFunction = void 0), m(e, t)
                })
            )
          }),
          (d.DigitalSignatureField.createFromField = function (e) {
            return (
              h(arguments.length, 1, "createFromField", "(PDFNet.Field)", [
                [e, "Structure", d.Field, "Field"],
              ]),
              l("createFromField", [[e, 0]]),
              d
                .sendWithPromise("digitalSignatureFieldCreateFromField", { in_field: e })
                .then(function (e) {
                  return new d.DigitalSignatureField(e)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.getSigningTime = function () {
            return (
              u("getSigningTime", this.yieldFunction),
              d
                .sendWithPromise("DigitalSignatureField.getSigningTime", { self: this })
                .then(function (e) {
                  return new d.Date(e)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.getCert = function (e) {
            return (
              h(arguments.length, 1, "getCert", "(number)", [[e, "number"]]),
              u("getCert", this.yieldFunction),
              d
                .sendWithPromise("DigitalSignatureField.getCert", { self: this, in_index: e })
                .then(function (e) {
                  return new Uint8Array(e)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.setFieldPermissions = function (e, t) {
            void 0 === t && (t = []),
              h(arguments.length, 1, "setFieldPermissions", "(number, Array<string>)", [
                [e, "number"],
                [t, "Array"],
              ]),
              u("setFieldPermissions", this.yieldFunction)
            var n = this
            return (
              (this.yieldFunction = "DigitalSignatureField.setFieldPermissions"),
              d
                .sendWithPromise("DigitalSignatureField.setFieldPermissions", {
                  self: this,
                  in_action: e,
                  in_field_names_list: t,
                })
                .then(function (e) {
                  ;(n.yieldFunction = void 0), m(e, n)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.signOnNextSaveFromBuffer = function (e, t) {
            h(arguments.length, 2, "signOnNextSaveFromBuffer", "(ArrayBuffer|TypedArray, string)", [
              [e, "ArrayBuffer"],
              [t, "string"],
            ]),
              u("signOnNextSaveFromBuffer", this.yieldFunction)
            var n = this,
              i =
                ((this.yieldFunction = "DigitalSignatureField.signOnNextSaveFromBuffer"), a(e, !1))
            return d
              .sendWithPromise("DigitalSignatureField.signOnNextSaveFromBuffer", {
                self: this,
                in_pkcs12_buffer: i,
                in_password: t,
              })
              .then(function (e) {
                ;(n.yieldFunction = void 0), m(e, n)
              })
          }),
          (d.DigitalSignatureField.prototype.signOnNextSaveWithCustomHandler = function (e) {
            h(arguments.length, 1, "signOnNextSaveWithCustomHandler", "(number)", [[e, "number"]]),
              u("signOnNextSaveWithCustomHandler", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "DigitalSignatureField.signOnNextSaveWithCustomHandler"),
              d
                .sendWithPromise("DigitalSignatureField.signOnNextSaveWithCustomHandler", {
                  self: this,
                  in_signature_handler_id: e,
                })
                .then(function (e) {
                  ;(t.yieldFunction = void 0), m(e, t)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.certifyOnNextSaveFromBuffer = function (e, t) {
            h(
              arguments.length,
              2,
              "certifyOnNextSaveFromBuffer",
              "(ArrayBuffer|TypedArray, string)",
              [
                [e, "ArrayBuffer"],
                [t, "string"],
              ]
            ),
              u("certifyOnNextSaveFromBuffer", this.yieldFunction)
            var n = this,
              i =
                ((this.yieldFunction = "DigitalSignatureField.certifyOnNextSaveFromBuffer"),
                a(e, !1))
            return d
              .sendWithPromise("DigitalSignatureField.certifyOnNextSaveFromBuffer", {
                self: this,
                in_pkcs12_buffer: i,
                in_password: t,
              })
              .then(function (e) {
                ;(n.yieldFunction = void 0), m(e, n)
              })
          }),
          (d.DigitalSignatureField.prototype.certifyOnNextSaveWithCustomHandler = function (e) {
            h(arguments.length, 1, "certifyOnNextSaveWithCustomHandler", "(number)", [
              [e, "number"],
            ]),
              u("certifyOnNextSaveWithCustomHandler", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "DigitalSignatureField.certifyOnNextSaveWithCustomHandler"),
              d
                .sendWithPromise("DigitalSignatureField.certifyOnNextSaveWithCustomHandler", {
                  self: this,
                  in_signature_handler_id: e,
                })
                .then(function (e) {
                  ;(t.yieldFunction = void 0), m(e, t)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.getSDFObj = function () {
            return (
              u("getSDFObj", this.yieldFunction),
              d
                .sendWithPromise("DigitalSignatureField.getSDFObj", { self: this })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.getLockedFields = function () {
            return (
              u("getLockedFields", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.getLockedFields", { self: this })
            )
          }),
          (d.DigitalSignatureField.prototype.verify = function (e) {
            return (
              h(arguments.length, 1, "verify", "(PDFNet.VerificationOptions)", [
                [e, "Object", d.VerificationOptions, "VerificationOptions"],
              ]),
              u("verify", this.yieldFunction),
              d
                .sendWithPromise("DigitalSignatureField.verify", { self: this, in_opts: e.id })
                .then(function (e) {
                  return o(d.VerificationResult, e)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.isCertification = function () {
            return (
              u("isCertification", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.isCertification", { self: this })
            )
          }),
          (d.DigitalSignatureField.prototype.getSignerCertFromCMS = function () {
            return (
              u("getSignerCertFromCMS", this.yieldFunction),
              d
                .sendWithPromise("DigitalSignatureField.getSignerCertFromCMS", { self: this })
                .then(function (e) {
                  return o(d.X509Certificate, e)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.getByteRanges = function () {
            return (
              u("getByteRanges", this.yieldFunction),
              d
                .sendWithPromise("DigitalSignatureField.getByteRanges", { self: this })
                .then(function (e) {
                  for (var t = [], n = 0; n < e.length; ++n) {
                    var i = e[n]
                    if ("0" === i) return null
                    ;(i = new d.ByteRange(i)), t.push(i)
                  }
                  return t
                })
            )
          }),
          (d.DigitalSignatureField.prototype.enableLTVOfflineVerification = function (e) {
            return (
              h(
                arguments.length,
                1,
                "enableLTVOfflineVerification",
                "(PDFNet.VerificationResult)",
                [[e, "Object", d.VerificationResult, "VerificationResult"]]
              ),
              u("enableLTVOfflineVerification", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.enableLTVOfflineVerification", {
                self: this,
                in_verification_result: e.id,
              })
            )
          }),
          (d.DigitalSignatureField.prototype.timestampOnNextSave = function (e, t) {
            return (
              h(
                arguments.length,
                2,
                "timestampOnNextSave",
                "(PDFNet.TimestampingConfiguration, PDFNet.VerificationOptions)",
                [
                  [e, "Object", d.TimestampingConfiguration, "TimestampingConfiguration"],
                  [t, "Object", d.VerificationOptions, "VerificationOptions"],
                ]
              ),
              u("timestampOnNextSave", this.yieldFunction),
              d.sendWithPromise("DigitalSignatureField.timestampOnNextSave", {
                self: this,
                in_timestamping_config: e.id,
                in_timestamp_response_verification_options: t.id,
              })
            )
          }),
          (d.DigitalSignatureField.prototype.generateContentsWithEmbeddedTimestamp = function (
            e,
            t
          ) {
            return (
              h(
                arguments.length,
                2,
                "generateContentsWithEmbeddedTimestamp",
                "(PDFNet.TimestampingConfiguration, PDFNet.VerificationOptions)",
                [
                  [e, "Object", d.TimestampingConfiguration, "TimestampingConfiguration"],
                  [t, "Object", d.VerificationOptions, "VerificationOptions"],
                ]
              ),
              u("generateContentsWithEmbeddedTimestamp", this.yieldFunction),
              d
                .sendWithPromise("DigitalSignatureField.generateContentsWithEmbeddedTimestamp", {
                  self: this,
                  in_timestamping_config: e.id,
                  in_timestamp_response_verification_options: t.id,
                })
                .then(function (e) {
                  return o(d.TimestampingResult, e)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.useSubFilter = function (e, t) {
            void 0 === t && (t = !0),
              h(arguments.length, 1, "useSubFilter", "(number, boolean)", [
                [e, "number"],
                [t, "boolean"],
              ]),
              u("useSubFilter", this.yieldFunction)
            var n = this
            return (
              (this.yieldFunction = "DigitalSignatureField.useSubFilter"),
              d
                .sendWithPromise("DigitalSignatureField.useSubFilter", {
                  self: this,
                  in_subfilter_type: e,
                  in_make_mandatory: t,
                })
                .then(function (e) {
                  ;(n.yieldFunction = void 0), m(e, n)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.calculateDigest = function (e) {
            void 0 === e && (e = d.DigestAlgorithm.Type.e_SHA256),
              h(arguments.length, 0, "calculateDigest", "(number)", [[e, "number"]]),
              u("calculateDigest", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "DigitalSignatureField.calculateDigest"),
              d
                .sendWithPromise("DigitalSignatureField.calculateDigest", {
                  self: this,
                  in_digest_algorithm_type: e,
                })
                .then(function (e) {
                  return (
                    (t.yieldFunction = void 0),
                    (e.result = new Uint8Array(e.result)),
                    m(e.self, t),
                    e.result
                  )
                })
            )
          }),
          (d.DigitalSignatureField.prototype.setPreferredDigestAlgorithm = function (e, t) {
            void 0 === t && (t = !0),
              h(arguments.length, 1, "setPreferredDigestAlgorithm", "(number, boolean)", [
                [e, "number"],
                [t, "boolean"],
              ]),
              u("setPreferredDigestAlgorithm", this.yieldFunction)
            var n = this
            return (
              (this.yieldFunction = "DigitalSignatureField.setPreferredDigestAlgorithm"),
              d
                .sendWithPromise("DigitalSignatureField.setPreferredDigestAlgorithm", {
                  self: this,
                  in_digest_algorithm_type: e,
                  in_make_mandatory: t,
                })
                .then(function (e) {
                  ;(n.yieldFunction = void 0), m(e, n)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.createSigDictForCustomCertification = function (
            e,
            t,
            n
          ) {
            h(
              arguments.length,
              3,
              "createSigDictForCustomCertification",
              "(string, number, number)",
              [
                [e, "string"],
                [t, "number"],
                [n, "number"],
              ]
            ),
              u("createSigDictForCustomCertification", this.yieldFunction)
            var i = this
            return (
              (this.yieldFunction = "DigitalSignatureField.createSigDictForCustomCertification"),
              d
                .sendWithPromise("DigitalSignatureField.createSigDictForCustomCertification", {
                  self: this,
                  in_filter_name: e,
                  in_subfilter_type: t,
                  in_contents_size_to_reserve: n,
                })
                .then(function (e) {
                  ;(i.yieldFunction = void 0), m(e, i)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.createSigDictForCustomSigning = function (e, t, n) {
            h(arguments.length, 3, "createSigDictForCustomSigning", "(string, number, number)", [
              [e, "string"],
              [t, "number"],
              [n, "number"],
            ]),
              u("createSigDictForCustomSigning", this.yieldFunction)
            var i = this
            return (
              (this.yieldFunction = "DigitalSignatureField.createSigDictForCustomSigning"),
              d
                .sendWithPromise("DigitalSignatureField.createSigDictForCustomSigning", {
                  self: this,
                  in_filter_name: e,
                  in_subfilter_type: t,
                  in_contents_size_to_reserve: n,
                })
                .then(function (e) {
                  ;(i.yieldFunction = void 0), m(e, i)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.setSigDictTimeOfSigning = function (e) {
            h(arguments.length, 1, "setSigDictTimeOfSigning", "(PDFNet.Date)", [
              [e, "Structure", d.Date, "Date"],
            ]),
              u("setSigDictTimeOfSigning", this.yieldFunction),
              l("setSigDictTimeOfSigning", [[e, 0]])
            var t = this
            return (
              (this.yieldFunction = "DigitalSignatureField.setSigDictTimeOfSigning"),
              d
                .sendWithPromise("DigitalSignatureField.setSigDictTimeOfSigning", {
                  self: this,
                  in_date: e,
                })
                .then(function (e) {
                  ;(t.yieldFunction = void 0), m(e, t)
                })
            )
          }),
          (d.DigitalSignatureField.signDigestBuffer = function (e, t, n, i, r) {
            h(
              arguments.length,
              5,
              "signDigestBuffer",
              "(ArrayBuffer|TypedArray, ArrayBuffer|TypedArray, string, boolean, number)",
              [
                [e, "ArrayBuffer"],
                [t, "ArrayBuffer"],
                [n, "string"],
                [i, "boolean"],
                [r, "number"],
              ]
            )
            var o = a(e, !1),
              s = a(t, !1)
            return d
              .sendWithPromise("digitalSignatureFieldSignDigestBuffer", {
                in_digest_buf: o,
                in_pkcs12_buffer: s,
                in_keyfile_password: n,
                in_pades_mode: i,
                in_digest_algorithm_type: r,
              })
              .then(function (e) {
                return new Uint8Array(e)
              })
          }),
          (d.DigitalSignatureField.generateESSSigningCertPAdESAttribute = function (e, t) {
            return (
              h(
                arguments.length,
                2,
                "generateESSSigningCertPAdESAttribute",
                "(PDFNet.X509Certificate, number)",
                [
                  [e, "Object", d.X509Certificate, "X509Certificate"],
                  [t, "number"],
                ]
              ),
              d
                .sendWithPromise("digitalSignatureFieldGenerateESSSigningCertPAdESAttribute", {
                  in_signer_cert: e.id,
                  in_digest_algorithm_type: t,
                })
                .then(function (e) {
                  return new Uint8Array(e)
                })
            )
          }),
          (d.DigitalSignatureField.generateCMSSignedAttributes = function (e, t) {
            void 0 === t && (t = new ArrayBuffer(0)),
              h(
                arguments.length,
                1,
                "generateCMSSignedAttributes",
                "(ArrayBuffer|TypedArray, ArrayBuffer|TypedArray)",
                [
                  [e, "ArrayBuffer"],
                  [t, "ArrayBuffer"],
                ]
              )
            var n = a(e, !1),
              i = a(t, !1)
            return d
              .sendWithPromise("digitalSignatureFieldGenerateCMSSignedAttributes", {
                in_digest_buf: n,
                in_custom_signedattributes_buf: i,
              })
              .then(function (e) {
                return new Uint8Array(e)
              })
          }),
          (d.DigitalSignatureField.generateCMSSignature = function (e, t, n, i, r, o) {
            h(
              arguments.length,
              6,
              "generateCMSSignature",
              "(PDFNet.X509Certificate, Array<Core.PDFNet.X509Certificate>, PDFNet.ObjectIdentifier, PDFNet.ObjectIdentifier, ArrayBuffer|TypedArray, ArrayBuffer|TypedArray)",
              [
                [e, "Object", d.X509Certificate, "X509Certificate"],
                [t, "Array"],
                [n, "Object", d.ObjectIdentifier, "ObjectIdentifier"],
                [i, "Object", d.ObjectIdentifier, "ObjectIdentifier"],
                [r, "ArrayBuffer"],
                [o, "ArrayBuffer"],
              ]
            )
            var s = a(r, !1),
              u = a(o, !1)
            return (
              (t = Array.from(t, function (e) {
                return e.id
              })),
              d
                .sendWithPromise("digitalSignatureFieldGenerateCMSSignature", {
                  in_signer_cert: e.id,
                  in_chain_certs_list: t,
                  in_digest_algorithm_oid: n.id,
                  in_signature_algorithm_oid: i.id,
                  in_signature_value_buf: s,
                  in_signedattributes_buf: u,
                })
                .then(function (e) {
                  return new Uint8Array(e)
                })
            )
          }),
          (d.PDFDoc.prototype.getTriggerAction = function (e) {
            return (
              h(arguments.length, 1, "getTriggerAction", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("PDFDoc.getTriggerAction", { doc: this.id, trigger: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.PDFDoc.create = function () {
            return d.sendWithPromise("pdfDocCreate", {}).then(function (e) {
              return o(d.PDFDoc, e)
            })
          }),
          (d.PDFDoc.createFromFilter = function (e) {
            return (
              h(arguments.length, 1, "createFromFilter", "(PDFNet.Filter)", [
                [e, "Object", d.Filter, "Filter"],
              ]),
              0 != e.id && O(e.id),
              d
                .sendWithPromise("pdfDocCreateFromFilter", { no_own_stream: e.id })
                .then(function (e) {
                  return o(d.PDFDoc, e)
                })
            )
          }),
          (d.PDFDoc.createFromBuffer = function (e) {
            h(arguments.length, 1, "createFromBuffer", "(ArrayBuffer|TypedArray)", [
              [e, "ArrayBuffer"],
            ])
            var t = a(e, !1)
            return d.sendWithPromise("pdfDocCreateFromBuffer", { buf: t }).then(function (e) {
              return o(d.PDFDoc, e)
            })
          }),
          (d.PDFDoc.createFromLayoutEls = function (e) {
            h(arguments.length, 1, "createFromLayoutEls", "(ArrayBuffer|TypedArray)", [
              [e, "ArrayBuffer"],
            ])
            var t = a(e, !1)
            return d.sendWithPromise("pdfDocCreateFromLayoutEls", { buf: t }).then(function (e) {
              return o(d.PDFDoc, e)
            })
          }),
          (d.PDFDoc.prototype.createShallowCopy = function () {
            return d
              .sendWithPromise("PDFDoc.createShallowCopy", { source: this.id })
              .then(function (e) {
                return o(d.PDFDoc, e)
              })
          }),
          (d.PDFDoc.prototype.isEncrypted = function () {
            return d.sendWithPromise("PDFDoc.isEncrypted", { doc: this.id })
          }),
          (d.PDFDoc.prototype.initStdSecurityHandlerUString = function (e) {
            return (
              h(arguments.length, 1, "initStdSecurityHandlerUString", "(string)", [[e, "string"]]),
              d.sendWithPromise("PDFDoc.initStdSecurityHandlerUString", {
                doc: this.id,
                password: e,
              })
            )
          }),
          (d.PDFDoc.prototype.initStdSecurityHandlerBuffer = function (e) {
            h(arguments.length, 1, "initStdSecurityHandlerBuffer", "(ArrayBuffer|TypedArray)", [
              [e, "ArrayBuffer"],
            ])
            var t = a(e, !1)
            return d.sendWithPromise("PDFDoc.initStdSecurityHandlerBuffer", {
              doc: this.id,
              password_buf: t,
            })
          }),
          (d.PDFDoc.prototype.getSecurityHandler = function () {
            return d
              .sendWithPromise("PDFDoc.getSecurityHandler", { doc: this.id })
              .then(function (e) {
                return p(d.SecurityHandler, e)
              })
          }),
          (d.PDFDoc.prototype.setSecurityHandler = function (e) {
            return (
              h(arguments.length, 1, "setSecurityHandler", "(PDFNet.SecurityHandler)", [
                [e, "Object", d.SecurityHandler, "SecurityHandler"],
              ]),
              0 != e.id && O(e.id),
              d.sendWithPromise("PDFDoc.setSecurityHandler", { doc: this.id, no_own_handler: e.id })
            )
          }),
          (d.PDFDoc.prototype.removeSecurity = function () {
            return d.sendWithPromise("PDFDoc.removeSecurity", { doc: this.id })
          }),
          (d.PDFDoc.prototype.getDocInfo = function () {
            return d.sendWithPromise("PDFDoc.getDocInfo", { doc: this.id }).then(function (e) {
              return p(d.PDFDocInfo, e)
            })
          }),
          (d.PDFDoc.prototype.getViewPrefs = function () {
            return d.sendWithPromise("PDFDoc.getViewPrefs", { doc: this.id }).then(function (e) {
              return p(d.PDFDocViewPrefs, e)
            })
          }),
          (d.PDFDoc.prototype.isModified = function () {
            return d.sendWithPromise("PDFDoc.isModified", { doc: this.id })
          }),
          (d.PDFDoc.prototype.hasRepairedXRef = function () {
            return d.sendWithPromise("PDFDoc.hasRepairedXRef", { doc: this.id })
          }),
          (d.PDFDoc.prototype.isLinearized = function () {
            return d.sendWithPromise("PDFDoc.isLinearized", { doc: this.id })
          }),
          (d.PDFDoc.prototype.saveMemoryBuffer = function (e) {
            return (
              h(arguments.length, 1, "saveMemoryBuffer", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("PDFDoc.saveMemoryBuffer", { doc: this.id, flags: e })
                .then(function (e) {
                  return new Uint8Array(e)
                })
            )
          }),
          (d.PDFDoc.prototype.saveStream = function (e, t) {
            return (
              h(arguments.length, 2, "saveStream", "(PDFNet.Filter, number)", [
                [e, "Object", d.Filter, "Filter"],
                [t, "number"],
              ]),
              d.sendWithPromise("PDFDoc.saveStream", { doc: this.id, stream: e.id, flags: t })
            )
          }),
          (d.PDFDoc.prototype.saveCustomSignatureBuffer = function (e, t) {
            h(
              arguments.length,
              2,
              "saveCustomSignatureBuffer",
              "(ArrayBuffer|TypedArray, PDFNet.DigitalSignatureField)",
              [
                [e, "ArrayBuffer"],
                [t, "Structure", d.DigitalSignatureField, "DigitalSignatureField"],
              ]
            ),
              l("saveCustomSignatureBuffer", [[t, 1]])
            var n = a(e, !1)
            return d
              .sendWithPromise("PDFDoc.saveCustomSignatureBuffer", {
                doc: this.id,
                in_signature_buf: n,
                in_field: t,
              })
              .then(function (e) {
                return new Uint8Array(e)
              })
          }),
          (d.PDFDoc.prototype.saveCustomSignatureStream = function (e, t) {
            h(
              arguments.length,
              2,
              "saveCustomSignatureStream",
              "(ArrayBuffer|TypedArray, PDFNet.DigitalSignatureField)",
              [
                [e, "ArrayBuffer"],
                [t, "Structure", d.DigitalSignatureField, "DigitalSignatureField"],
              ]
            ),
              l("saveCustomSignatureStream", [[t, 1]])
            var n = a(e, !1)
            return d
              .sendWithPromise("PDFDoc.saveCustomSignatureStream", {
                doc: this.id,
                in_signature_buf: n,
                in_field: t,
              })
              .then(function (e) {
                return o(d.Filter, e)
              })
          }),
          (d.PDFDoc.prototype.getPageIterator = function (e) {
            return (
              void 0 === e && (e = 1),
              h(arguments.length, 0, "getPageIterator", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("PDFDoc.getPageIterator", { doc: this.id, page_number: e })
                .then(function (e) {
                  return o(d.Iterator, e, "Page")
                })
            )
          }),
          (d.PDFDoc.prototype.getPage = function (e) {
            return (
              h(arguments.length, 1, "getPage", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("PDFDoc.getPage", { doc: this.id, page_number: e })
                .then(function (e) {
                  return p(d.Page, e)
                })
            )
          }),
          (d.PDFDoc.prototype.pageRemove = function (e) {
            return (
              h(arguments.length, 1, "pageRemove", "(PDFNet.Iterator)", [
                [e, "Object", d.Iterator, "Iterator"],
              ]),
              d.sendWithPromise("PDFDoc.pageRemove", { doc: this.id, page_itr: e.id })
            )
          }),
          (d.PDFDoc.prototype.pageInsert = function (e, t) {
            return (
              h(arguments.length, 2, "pageInsert", "(PDFNet.Iterator, PDFNet.Page)", [
                [e, "Object", d.Iterator, "Iterator"],
                [t, "Object", d.Page, "Page"],
              ]),
              d.sendWithPromise("PDFDoc.pageInsert", { doc: this.id, where: e.id, page: t.id })
            )
          }),
          (d.PDFDoc.prototype.insertPages = function (e, t, n, i, r) {
            return (
              h(
                arguments.length,
                5,
                "insertPages",
                "(number, PDFNet.PDFDoc, number, number, number)",
                [
                  [e, "number"],
                  [t, "PDFDoc"],
                  [n, "number"],
                  [i, "number"],
                  [r, "number"],
                ]
              ),
              d.sendWithPromise("PDFDoc.insertPages", {
                dest_doc: this.id,
                insert_before_page_number: e,
                src_doc: t.id,
                start_page: n,
                end_page: i,
                flag: r,
              })
            )
          }),
          (d.PDFDoc.prototype.insertPageSet = function (e, t, n, i) {
            return (
              h(
                arguments.length,
                4,
                "insertPageSet",
                "(number, PDFNet.PDFDoc, PDFNet.PageSet, number)",
                [
                  [e, "number"],
                  [t, "PDFDoc"],
                  [n, "Object", d.PageSet, "PageSet"],
                  [i, "number"],
                ]
              ),
              d.sendWithPromise("PDFDoc.insertPageSet", {
                dest_doc: this.id,
                insert_before_page_number: e,
                src_doc: t.id,
                source_page_set: n.id,
                flag: i,
              })
            )
          }),
          (d.PDFDoc.prototype.movePages = function (e, t, n, i, r) {
            return (
              h(
                arguments.length,
                5,
                "movePages",
                "(number, PDFNet.PDFDoc, number, number, number)",
                [
                  [e, "number"],
                  [t, "PDFDoc"],
                  [n, "number"],
                  [i, "number"],
                  [r, "number"],
                ]
              ),
              d.sendWithPromise("PDFDoc.movePages", {
                dest_doc: this.id,
                move_before_page_number: e,
                src_doc: t.id,
                start_page: n,
                end_page: i,
                flag: r,
              })
            )
          }),
          (d.PDFDoc.prototype.movePageSet = function (e, t, n, i) {
            return (
              h(
                arguments.length,
                4,
                "movePageSet",
                "(number, PDFNet.PDFDoc, PDFNet.PageSet, number)",
                [
                  [e, "number"],
                  [t, "PDFDoc"],
                  [n, "Object", d.PageSet, "PageSet"],
                  [i, "number"],
                ]
              ),
              d.sendWithPromise("PDFDoc.movePageSet", {
                dest_doc: this.id,
                move_before_page_number: e,
                src_doc: t.id,
                source_page_set: n.id,
                flag: i,
              })
            )
          }),
          (d.PDFDoc.prototype.pagePushFront = function (e) {
            return (
              h(arguments.length, 1, "pagePushFront", "(PDFNet.Page)", [
                [e, "Object", d.Page, "Page"],
              ]),
              d.sendWithPromise("PDFDoc.pagePushFront", { doc: this.id, page: e.id })
            )
          }),
          (d.PDFDoc.prototype.pagePushBack = function (e) {
            return (
              h(arguments.length, 1, "pagePushBack", "(PDFNet.Page)", [
                [e, "Object", d.Page, "Page"],
              ]),
              d.sendWithPromise("PDFDoc.pagePushBack", { doc: this.id, page: e.id })
            )
          }),
          (d.PDFDoc.prototype.pageCreate = function (e) {
            return (
              void 0 === e && (e = new d.Rect(0, 0, 612, 792)),
              h(arguments.length, 0, "pageCreate", "(PDFNet.Rect)", [
                [e, "Structure", d.Rect, "Rect"],
              ]),
              l("pageCreate", [[e, 0]]),
              d
                .sendWithPromise("PDFDoc.pageCreate", { doc: this.id, media_box: e })
                .then(function (e) {
                  return p(d.Page, e)
                })
            )
          }),
          (d.PDFDoc.prototype.appendTextDiffPage = function (e, t) {
            return (
              h(arguments.length, 2, "appendTextDiffPage", "(PDFNet.Page, PDFNet.Page)", [
                [e, "Object", d.Page, "Page"],
                [t, "Object", d.Page, "Page"],
              ]),
              d.sendWithPromise("PDFDoc.appendTextDiffPage", {
                doc: this.id,
                page1: e.id,
                page2: t.id,
              })
            )
          }),
          (d.PDFDoc.prototype.appendTextDiffDoc = function (e, t, n) {
            return (
              void 0 === n && (n = null),
              h(
                arguments.length,
                2,
                "appendTextDiffDoc",
                "(PDFNet.PDFDoc, PDFNet.PDFDoc, PDFNet.OptionBase)",
                [
                  [e, "PDFDoc"],
                  [t, "PDFDoc"],
                  [n, "OptionBase"],
                ]
              ),
              l("appendTextDiffDoc", [[n, 2]]),
              (n = n ? n.getJsonString() : "{}"),
              d.sendWithPromise("PDFDoc.appendTextDiffDoc", {
                doc: this.id,
                doc1: e.id,
                doc2: t.id,
                options: n,
              })
            )
          }),
          (d.PDFDoc.highlightTextDiff = function (e, t, n) {
            return (
              void 0 === n && (n = null),
              h(
                arguments.length,
                2,
                "highlightTextDiff",
                "(PDFNet.PDFDoc, PDFNet.PDFDoc, PDFNet.OptionBase)",
                [
                  [e, "PDFDoc"],
                  [t, "PDFDoc"],
                  [n, "OptionBase"],
                ]
              ),
              l("highlightTextDiff", [[n, 2]]),
              (n = n ? n.getJsonString() : "{}"),
              d.sendWithPromise("pdfDocHighlightTextDiff", { doc1: e.id, doc2: t.id, options: n })
            )
          }),
          (d.PDFDoc.prototype.getFirstBookmark = function () {
            return d
              .sendWithPromise("PDFDoc.getFirstBookmark", { doc: this.id })
              .then(function (e) {
                return p(d.Bookmark, e)
              })
          }),
          (d.PDFDoc.prototype.addRootBookmark = function (e) {
            return (
              h(arguments.length, 1, "addRootBookmark", "(PDFNet.Bookmark)", [
                [e, "Object", d.Bookmark, "Bookmark"],
              ]),
              d.sendWithPromise("PDFDoc.addRootBookmark", { doc: this.id, root_bookmark: e.id })
            )
          }),
          (d.PDFDoc.prototype.getTrailer = function () {
            return d.sendWithPromise("PDFDoc.getTrailer", { doc: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.PDFDoc.prototype.getRoot = function () {
            return d.sendWithPromise("PDFDoc.getRoot", { doc: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.PDFDoc.prototype.jsContextInitialize = function () {
            return d.sendWithPromise("PDFDoc.jsContextInitialize", { doc: this.id })
          }),
          (d.PDFDoc.prototype.getPages = function () {
            return d.sendWithPromise("PDFDoc.getPages", { doc: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.PDFDoc.prototype.getPageCount = function () {
            return d.sendWithPromise("PDFDoc.getPageCount", { doc: this.id })
          }),
          (d.PDFDoc.prototype.getDownloadedByteCount = function () {
            return d.sendWithPromise("PDFDoc.getDownloadedByteCount", { doc: this.id })
          }),
          (d.PDFDoc.prototype.getTotalRemoteByteCount = function () {
            return d.sendWithPromise("PDFDoc.getTotalRemoteByteCount", { doc: this.id })
          }),
          (d.PDFDoc.prototype.getFieldIteratorBegin = function () {
            return d
              .sendWithPromise("PDFDoc.getFieldIteratorBegin", { doc: this.id })
              .then(function (e) {
                return o(d.Iterator, e, "Field")
              })
          }),
          (d.PDFDoc.prototype.getFieldIterator = function (e) {
            return (
              h(arguments.length, 1, "getFieldIterator", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("PDFDoc.getFieldIterator", { doc: this.id, field_name: e })
                .then(function (e) {
                  return o(d.Iterator, e, "Field")
                })
            )
          }),
          (d.PDFDoc.prototype.getField = function (e) {
            return (
              h(arguments.length, 1, "getField", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("PDFDoc.getField", { doc: this.id, field_name: e })
                .then(function (e) {
                  return new d.Field(e)
                })
            )
          }),
          (d.PDFDoc.prototype.fieldCreate = function (e, t, n, i) {
            return (
              void 0 === n && (n = new d.Obj("0")),
              void 0 === i && (i = new d.Obj("0")),
              h(arguments.length, 2, "fieldCreate", "(string, number, PDFNet.Obj, PDFNet.Obj)", [
                [e, "string"],
                [t, "number"],
                [n, "Object", d.Obj, "Obj"],
                [i, "Object", d.Obj, "Obj"],
              ]),
              d
                .sendWithPromise("PDFDoc.fieldCreate", {
                  doc: this.id,
                  field_name: e,
                  type: t,
                  field_value: n.id,
                  def_field_value: i.id,
                })
                .then(function (e) {
                  return new d.Field(e)
                })
            )
          }),
          (d.PDFDoc.prototype.fieldCreateFromStrings = function (e, t, n, i) {
            return (
              void 0 === i && (i = ""),
              h(arguments.length, 3, "fieldCreateFromStrings", "(string, number, string, string)", [
                [e, "string"],
                [t, "number"],
                [n, "string"],
                [i, "string"],
              ]),
              d
                .sendWithPromise("PDFDoc.fieldCreateFromStrings", {
                  doc: this.id,
                  field_name: e,
                  type: t,
                  field_value: n,
                  def_field_value: i,
                })
                .then(function (e) {
                  return new d.Field(e)
                })
            )
          }),
          (d.PDFDoc.prototype.refreshFieldAppearances = function () {
            return d.sendWithPromise("PDFDoc.refreshFieldAppearances", { doc: this.id })
          }),
          (d.PDFDoc.prototype.refreshAnnotAppearances = function (e) {
            return (
              void 0 === e && (e = null),
              h(arguments.length, 0, "refreshAnnotAppearances", "(PDFNet.OptionBase)", [
                [e, "OptionBase"],
              ]),
              l("refreshAnnotAppearances", [[e, 0]]),
              (e = e ? e.getJsonString() : "{}"),
              d.sendWithPromise("PDFDoc.refreshAnnotAppearances", { doc: this.id, options: e })
            )
          }),
          (d.PDFDoc.prototype.flattenAnnotations = function (e) {
            return (
              void 0 === e && (e = !1),
              h(arguments.length, 0, "flattenAnnotations", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFDoc.flattenAnnotations", { doc: this.id, forms_only: e })
            )
          }),
          (d.PDFDoc.prototype.flattenAnnotationsAdvanced = function (e) {
            return (
              h(arguments.length, 1, "flattenAnnotationsAdvanced", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDoc.flattenAnnotationsAdvanced", { doc: this.id, flags: e })
            )
          }),
          (d.PDFDoc.prototype.getAcroForm = function () {
            return d.sendWithPromise("PDFDoc.getAcroForm", { doc: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.PDFDoc.prototype.fdfExtract = function (e) {
            return (
              void 0 === e && (e = d.PDFDoc.ExtractFlag.e_forms_only),
              h(arguments.length, 0, "fdfExtract", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDoc.fdfExtract", { doc: this.id, flag: e }).then(function (e) {
                return o(d.FDFDoc, e)
              })
            )
          }),
          (d.PDFDoc.prototype.fdfExtractPageSet = function (e, t) {
            return (
              void 0 === t && (t = d.PDFDoc.ExtractFlag.e_forms_only),
              h(arguments.length, 1, "fdfExtractPageSet", "(PDFNet.PageSet, number)", [
                [e, "Object", d.PageSet, "PageSet"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("PDFDoc.fdfExtractPageSet", {
                  doc: this.id,
                  pages_to_extract: e.id,
                  flag: t,
                })
                .then(function (e) {
                  return o(d.FDFDoc, e)
                })
            )
          }),
          (d.PDFDoc.prototype.fdfMerge = function (e) {
            return (
              h(arguments.length, 1, "fdfMerge", "(PDFNet.FDFDoc)", [[e, "FDFDoc"]]),
              d.sendWithPromise("PDFDoc.fdfMerge", { doc: this.id, fdf_doc: e.id })
            )
          }),
          (d.PDFDoc.prototype.fdfUpdate = function (e) {
            return (
              h(arguments.length, 1, "fdfUpdate", "(PDFNet.FDFDoc)", [[e, "FDFDoc"]]),
              d.sendWithPromise("PDFDoc.fdfUpdate", { doc: this.id, fdf_doc: e.id })
            )
          }),
          (d.PDFDoc.prototype.getOpenAction = function () {
            return d.sendWithPromise("PDFDoc.getOpenAction", { doc: this.id }).then(function (e) {
              return p(d.Action, e)
            })
          }),
          (d.PDFDoc.prototype.setOpenAction = function (e) {
            return (
              h(arguments.length, 1, "setOpenAction", "(PDFNet.Action)", [
                [e, "Object", d.Action, "Action"],
              ]),
              d.sendWithPromise("PDFDoc.setOpenAction", { doc: this.id, action: e.id })
            )
          }),
          (d.PDFDoc.prototype.addFileAttachment = function (e, t) {
            return (
              h(arguments.length, 2, "addFileAttachment", "(string, PDFNet.FileSpec)", [
                [e, "string"],
                [t, "Object", d.FileSpec, "FileSpec"],
              ]),
              d.sendWithPromise("PDFDoc.addFileAttachment", {
                doc: this.id,
                file_key: e,
                embedded_file: t.id,
              })
            )
          }),
          (d.PDFDoc.prototype.getPageLabel = function (e) {
            return (
              h(arguments.length, 1, "getPageLabel", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("PDFDoc.getPageLabel", { doc: this.id, page_num: e })
                .then(function (e) {
                  return new d.PageLabel(e)
                })
            )
          }),
          (d.PDFDoc.prototype.setPageLabel = function (e, t) {
            return (
              h(arguments.length, 2, "setPageLabel", "(number, PDFNet.PageLabel)", [
                [e, "number"],
                [t, "Structure", d.PageLabel, "PageLabel"],
              ]),
              l("setPageLabel", [[t, 1]]),
              d.sendWithPromise("PDFDoc.setPageLabel", { doc: this.id, page_num: e, label: t })
            )
          }),
          (d.PDFDoc.prototype.removePageLabel = function (e) {
            return (
              h(arguments.length, 1, "removePageLabel", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDoc.removePageLabel", { doc: this.id, page_num: e })
            )
          }),
          (d.PDFDoc.prototype.getStructTree = function () {
            return d.sendWithPromise("PDFDoc.getStructTree", { doc: this.id }).then(function (e) {
              return p(d.STree, e)
            })
          }),
          (d.PDFDoc.prototype.hasOC = function () {
            return d.sendWithPromise("PDFDoc.hasOC", { doc: this.id })
          }),
          (d.PDFDoc.prototype.getOCGs = function () {
            return d.sendWithPromise("PDFDoc.getOCGs", { doc: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.PDFDoc.prototype.getOCGConfig = function () {
            return d.sendWithPromise("PDFDoc.getOCGConfig", { doc: this.id }).then(function (e) {
              return p(d.OCGConfig, e)
            })
          }),
          (d.PDFDoc.prototype.createIndirectName = function (e) {
            return (
              h(arguments.length, 1, "createIndirectName", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("PDFDoc.createIndirectName", { doc: this.id, name: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.PDFDoc.prototype.createIndirectArray = function () {
            return d
              .sendWithPromise("PDFDoc.createIndirectArray", { doc: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.PDFDoc.prototype.createIndirectBool = function (e) {
            return (
              h(arguments.length, 1, "createIndirectBool", "(boolean)", [[e, "boolean"]]),
              d
                .sendWithPromise("PDFDoc.createIndirectBool", { doc: this.id, value: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.PDFDoc.prototype.createIndirectDict = function () {
            return d
              .sendWithPromise("PDFDoc.createIndirectDict", { doc: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.PDFDoc.prototype.createIndirectNull = function () {
            return d
              .sendWithPromise("PDFDoc.createIndirectNull", { doc: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.PDFDoc.prototype.createIndirectNumber = function (e) {
            return (
              h(arguments.length, 1, "createIndirectNumber", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("PDFDoc.createIndirectNumber", { doc: this.id, value: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.PDFDoc.prototype.createIndirectString = function (e, t) {
            return (
              h(arguments.length, 2, "createIndirectString", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("PDFDoc.createIndirectString", {
                  doc: this.id,
                  value: e,
                  buf_size: t,
                })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.PDFDoc.prototype.createIndirectStringFromUString = function (e) {
            return (
              h(arguments.length, 1, "createIndirectStringFromUString", "(string)", [
                [e, "string"],
              ]),
              d
                .sendWithPromise("PDFDoc.createIndirectStringFromUString", { doc: this.id, str: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.PDFDoc.prototype.createIndirectStreamFromFilter = function (e, t) {
            return (
              void 0 === t && (t = new d.Filter("0")),
              h(
                arguments.length,
                1,
                "createIndirectStreamFromFilter",
                "(PDFNet.FilterReader, PDFNet.Filter)",
                [
                  [e, "Object", d.FilterReader, "FilterReader"],
                  [t, "Object", d.Filter, "Filter"],
                ]
              ),
              0 != t.id && O(t.id),
              d
                .sendWithPromise("PDFDoc.createIndirectStreamFromFilter", {
                  doc: this.id,
                  data: e.id,
                  no_own_filter_chain: t.id,
                })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.PDFDoc.prototype.createIndirectStream = function (e, t) {
            h(
              arguments.length,
              2,
              "createIndirectStream",
              "(ArrayBuffer|TypedArray, PDFNet.Filter)",
              [
                [e, "ArrayBuffer"],
                [t, "Object", d.Filter, "Filter"],
              ]
            )
            var n = a(e, !1)
            return (
              0 != t.id && O(t.id),
              d
                .sendWithPromise("PDFDoc.createIndirectStream", {
                  doc: this.id,
                  data_buf: n,
                  no_own_filter_chain: t.id,
                })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.PDFDoc.prototype.getSDFDoc = function () {
            return d.sendWithPromise("PDFDoc.getSDFDoc", { doc: this.id }).then(function (e) {
              return p(d.SDFDoc, e)
            })
          }),
          (d.PDFDoc.prototype.unlock = function () {
            var e = this
            return d.sendWithPromise("PDFDoc.unlock", { doc: this.id }).then(function () {
              _(e)
            })
          }),
          (d.PDFDoc.prototype.unlockRead = function () {
            var e = this
            return d.sendWithPromise("PDFDoc.unlockRead", { doc: this.id }).then(function () {
              _(e)
            })
          }),
          (d.PDFDoc.prototype.addHighlights = function (e) {
            return (
              h(arguments.length, 1, "addHighlights", "(string)", [[e, "string"]]),
              d.sendWithPromise("PDFDoc.addHighlights", { doc: this.id, hilite: e })
            )
          }),
          (d.PDFDoc.prototype.isTagged = function () {
            return d.sendWithPromise("PDFDoc.isTagged", { doc: this.id })
          }),
          (d.PDFDoc.prototype.hasSignatures = function () {
            return d.sendWithPromise("PDFDoc.hasSignatures", { doc: this.id })
          }),
          (d.PDFDoc.prototype.addSignatureHandler = function (e) {
            return (
              h(arguments.length, 1, "addSignatureHandler", "(PDFNet.SignatureHandler)", [
                [e, "Object", d.SignatureHandler, "SignatureHandler"],
              ]),
              d.sendWithPromise("PDFDoc.addSignatureHandler", {
                doc: this.id,
                signature_handler: e.id,
              })
            )
          }),
          (d.PDFDoc.prototype.addStdSignatureHandlerFromBuffer = function (e, t) {
            h(
              arguments.length,
              2,
              "addStdSignatureHandlerFromBuffer",
              "(ArrayBuffer|TypedArray, string)",
              [
                [e, "ArrayBuffer"],
                [t, "string"],
              ]
            )
            var n = a(e, !1)
            return d.sendWithPromise("PDFDoc.addStdSignatureHandlerFromBuffer", {
              doc: this.id,
              pkcs12_buffer: n,
              pkcs12_pass: t,
            })
          }),
          (d.PDFDoc.prototype.removeSignatureHandler = function (e) {
            return (
              h(arguments.length, 1, "removeSignatureHandler", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDoc.removeSignatureHandler", {
                doc: this.id,
                signature_handler_id: e,
              })
            )
          }),
          (d.PDFDoc.prototype.getSignatureHandler = function (e) {
            return (
              h(arguments.length, 1, "getSignatureHandler", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("PDFDoc.getSignatureHandler", {
                  doc: this.id,
                  signature_handler_id: e,
                })
                .then(function (e) {
                  return p(d.SignatureHandler, e)
                })
            )
          }),
          (d.PDFDoc.prototype.generateThumbnails = function (e) {
            return (
              h(arguments.length, 1, "generateThumbnails", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDoc.generateThumbnails", { doc: this.id, size: e })
            )
          }),
          (d.PDFDoc.prototype.appendVisualDiff = function (e, t, n) {
            return (
              void 0 === n && (n = null),
              h(
                arguments.length,
                2,
                "appendVisualDiff",
                "(PDFNet.Page, PDFNet.Page, PDFNet.OptionBase)",
                [
                  [e, "Object", d.Page, "Page"],
                  [t, "Object", d.Page, "Page"],
                  [n, "OptionBase"],
                ]
              ),
              l("appendVisualDiff", [[n, 2]]),
              (n = n ? n.getJsonString() : "{}"),
              d.sendWithPromise("PDFDoc.appendVisualDiff", {
                doc: this.id,
                p1: e.id,
                p2: t.id,
                opts: n,
              })
            )
          }),
          (d.PDFDoc.prototype.getGeometryCollectionForPage = function (e) {
            return (
              h(arguments.length, 1, "getGeometryCollectionForPage", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("PDFDoc.getGeometryCollectionForPage", {
                  in_pdfdoc: this.id,
                  page_num: e,
                })
                .then(function (e) {
                  return o(d.GeometryCollection, e)
                })
            )
          }),
          (d.PDFDoc.prototype.getUndoManager = function () {
            return d.sendWithPromise("PDFDoc.getUndoManager", { doc: this.id }).then(function (e) {
              return o(d.UndoManager, e)
            })
          }),
          (d.PDFDoc.prototype.createDigitalSignatureField = function (e) {
            return (
              void 0 === e && (e = ""),
              h(arguments.length, 0, "createDigitalSignatureField", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("PDFDoc.createDigitalSignatureField", {
                  doc: this.id,
                  in_sig_field_name: e,
                })
                .then(function (e) {
                  return new d.DigitalSignatureField(e)
                })
            )
          }),
          (d.PDFDoc.prototype.getDigitalSignatureFieldIteratorBegin = function () {
            return d
              .sendWithPromise("PDFDoc.getDigitalSignatureFieldIteratorBegin", { doc: this.id })
              .then(function (e) {
                return o(d.Iterator, e, "DigitalSignatureField")
              })
          }),
          (d.PDFDoc.prototype.getDigitalSignaturePermissions = function () {
            return d.sendWithPromise("PDFDoc.getDigitalSignaturePermissions", { doc: this.id })
          }),
          (d.PDFDoc.prototype.saveViewerOptimizedBuffer = function (e) {
            h(arguments.length, 1, "saveViewerOptimizedBuffer", "(PDFNet.Obj)", [
              [e, "OptionObject", d.Obj, "Obj", "PDFNet.PDFDoc.ViewerOptimizedOptions"],
            ]),
              (e =
                "PDFNet.PDFDoc.ViewerOptimizedOptions" === e.name
                  ? ((t = e),
                    d.ObjSet.create().then(function (e) {
                      return e.createFromJson(JSON.stringify(t))
                    }))
                  : Promise.resolve(e))
            var t,
              n = this
            return e.then(function (e) {
              return d
                .sendWithPromise("PDFDoc.saveViewerOptimizedBuffer", { doc: n.id, opts: e.id })
                .then(function (e) {
                  return new Uint8Array(e)
                })
            })
          }),
          (d.PDFDoc.prototype.verifySignedDigitalSignatures = function (e) {
            return (
              h(
                arguments.length,
                1,
                "verifySignedDigitalSignatures",
                "(PDFNet.VerificationOptions)",
                [[e, "Object", d.VerificationOptions, "VerificationOptions"]]
              ),
              d.sendWithPromise("PDFDoc.verifySignedDigitalSignatures", {
                doc: this.id,
                opts: e.id,
              })
            )
          }),
          (d.convertPageToAnnotAppearance = function (e, t, n, i) {
            return (
              h(
                arguments.length,
                4,
                "convertPageToAnnotAppearance",
                "(PDFNet.PDFDoc, number, number, string)",
                [
                  [e, "PDFDoc"],
                  [t, "number"],
                  [n, "number"],
                  [i, "string"],
                ]
              ),
              d.sendWithPromise("convertPageToAnnotAppearance", {
                docWithAppearance: e.id,
                objNum: t,
                annot_state: n,
                appearance_state: i,
              })
            )
          }),
          (d.PDFDoc.prototype.mergeXFDF = function (e, t) {
            return (
              void 0 === t && (t = null),
              h(arguments.length, 1, "mergeXFDF", "(PDFNet.Filter, PDFNet.OptionBase)", [
                [e, "Object", d.Filter, "Filter"],
                [t, "OptionBase"],
              ]),
              l("mergeXFDF", [[t, 1]]),
              (t = t ? t.getJsonString() : "{}"),
              d.sendWithPromise("PDFDoc.mergeXFDF", { doc: this.id, stream: e.id, options: t })
            )
          }),
          (d.PDFDoc.prototype.mergeXFDFString = function (e, t) {
            return (
              void 0 === t && (t = null),
              h(arguments.length, 1, "mergeXFDFString", "(string, PDFNet.OptionBase)", [
                [e, "string"],
                [t, "OptionBase"],
              ]),
              l("mergeXFDFString", [[t, 1]]),
              (t = t ? t.getJsonString() : "{}"),
              d.sendWithPromise("PDFDoc.mergeXFDFString", { doc: this.id, xfdf: e, options: t })
            )
          }),
          (d.PDFDocInfo.prototype.getTitle = function () {
            return d.sendWithPromise("PDFDocInfo.getTitle", { info: this.id })
          }),
          (d.PDFDocInfo.prototype.getTitleObj = function () {
            return d
              .sendWithPromise("PDFDocInfo.getTitleObj", { info: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.PDFDocInfo.prototype.setTitle = function (e) {
            return (
              h(arguments.length, 1, "setTitle", "(string)", [[e, "string"]]),
              d.sendWithPromise("PDFDocInfo.setTitle", { info: this.id, title: e })
            )
          }),
          (d.PDFDocInfo.prototype.getAuthor = function () {
            return d.sendWithPromise("PDFDocInfo.getAuthor", { info: this.id })
          }),
          (d.PDFDocInfo.prototype.getAuthorObj = function () {
            return d
              .sendWithPromise("PDFDocInfo.getAuthorObj", { info: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.PDFDocInfo.prototype.setAuthor = function (e) {
            return (
              h(arguments.length, 1, "setAuthor", "(string)", [[e, "string"]]),
              d.sendWithPromise("PDFDocInfo.setAuthor", { info: this.id, author: e })
            )
          }),
          (d.PDFDocInfo.prototype.getSubject = function () {
            return d.sendWithPromise("PDFDocInfo.getSubject", { info: this.id })
          }),
          (d.PDFDocInfo.prototype.getSubjectObj = function () {
            return d
              .sendWithPromise("PDFDocInfo.getSubjectObj", { info: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.PDFDocInfo.prototype.setSubject = function (e) {
            return (
              h(arguments.length, 1, "setSubject", "(string)", [[e, "string"]]),
              d.sendWithPromise("PDFDocInfo.setSubject", { info: this.id, subject: e })
            )
          }),
          (d.PDFDocInfo.prototype.getKeywords = function () {
            return d.sendWithPromise("PDFDocInfo.getKeywords", { info: this.id })
          }),
          (d.PDFDocInfo.prototype.getKeywordsObj = function () {
            return d
              .sendWithPromise("PDFDocInfo.getKeywordsObj", { info: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.PDFDocInfo.prototype.setKeywords = function (e) {
            return (
              h(arguments.length, 1, "setKeywords", "(string)", [[e, "string"]]),
              d.sendWithPromise("PDFDocInfo.setKeywords", { info: this.id, keywords: e })
            )
          }),
          (d.PDFDocInfo.prototype.getCreator = function () {
            return d.sendWithPromise("PDFDocInfo.getCreator", { info: this.id })
          }),
          (d.PDFDocInfo.prototype.getCreatorObj = function () {
            return d
              .sendWithPromise("PDFDocInfo.getCreatorObj", { info: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.PDFDocInfo.prototype.setCreator = function (e) {
            return (
              h(arguments.length, 1, "setCreator", "(string)", [[e, "string"]]),
              d.sendWithPromise("PDFDocInfo.setCreator", { info: this.id, creator: e })
            )
          }),
          (d.PDFDocInfo.prototype.getProducer = function () {
            return d.sendWithPromise("PDFDocInfo.getProducer", { info: this.id })
          }),
          (d.PDFDocInfo.prototype.getProducerObj = function () {
            return d
              .sendWithPromise("PDFDocInfo.getProducerObj", { info: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.PDFDocInfo.prototype.setProducer = function (e) {
            return (
              h(arguments.length, 1, "setProducer", "(string)", [[e, "string"]]),
              d.sendWithPromise("PDFDocInfo.setProducer", { info: this.id, producer: e })
            )
          }),
          (d.PDFDocInfo.prototype.getCreationDate = function () {
            return d
              .sendWithPromise("PDFDocInfo.getCreationDate", { info: this.id })
              .then(function (e) {
                return new d.Date(e)
              })
          }),
          (d.PDFDocInfo.prototype.setCreationDate = function (e) {
            return (
              h(arguments.length, 1, "setCreationDate", "(PDFNet.Date)", [
                [e, "Structure", d.Date, "Date"],
              ]),
              l("setCreationDate", [[e, 0]]),
              d.sendWithPromise("PDFDocInfo.setCreationDate", { info: this.id, creation_date: e })
            )
          }),
          (d.PDFDocInfo.prototype.getModDate = function () {
            return d.sendWithPromise("PDFDocInfo.getModDate", { info: this.id }).then(function (e) {
              return new d.Date(e)
            })
          }),
          (d.PDFDocInfo.prototype.setModDate = function (e) {
            return (
              h(arguments.length, 1, "setModDate", "(PDFNet.Date)", [
                [e, "Structure", d.Date, "Date"],
              ]),
              l("setModDate", [[e, 0]]),
              d.sendWithPromise("PDFDocInfo.setModDate", { info: this.id, mod_date: e })
            )
          }),
          (d.PDFDocInfo.prototype.getSDFObj = function () {
            return d.sendWithPromise("PDFDocInfo.getSDFObj", { info: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.PDFDocInfo.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("pdfDocInfoCreate", { tr: e.id }).then(function (e) {
                return p(d.PDFDocInfo, e)
              })
            )
          }),
          (d.PDFDocInfo.prototype.copy = function () {
            return d.sendWithPromise("PDFDocInfo.copy", { info: this.id }).then(function (e) {
              return p(d.PDFDocInfo, e)
            })
          }),
          (d.PDFDocViewPrefs.prototype.setInitialPage = function (e) {
            return (
              h(arguments.length, 1, "setInitialPage", "(PDFNet.Destination)", [
                [e, "Object", d.Destination, "Destination"],
              ]),
              d.sendWithPromise("PDFDocViewPrefs.setInitialPage", { p: this.id, dest: e.id })
            )
          }),
          (d.PDFDocViewPrefs.prototype.setPageMode = function (e) {
            return (
              h(arguments.length, 1, "setPageMode", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDocViewPrefs.setPageMode", { p: this.id, mode: e })
            )
          }),
          (d.PDFDocViewPrefs.prototype.getPageMode = function () {
            return d.sendWithPromise("PDFDocViewPrefs.getPageMode", { p: this.id })
          }),
          (d.PDFDocViewPrefs.prototype.setLayoutMode = function (e) {
            return (
              h(arguments.length, 1, "setLayoutMode", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDocViewPrefs.setLayoutMode", { p: this.id, mode: e })
            )
          }),
          (d.PDFDocViewPrefs.prototype.getLayoutMode = function () {
            return d.sendWithPromise("PDFDocViewPrefs.getLayoutMode", { p: this.id })
          }),
          (d.PDFDocViewPrefs.prototype.setPref = function (e, t) {
            return (
              h(arguments.length, 2, "setPref", "(number, boolean)", [
                [e, "number"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("PDFDocViewPrefs.setPref", { p: this.id, pref: e, value: t })
            )
          }),
          (d.PDFDocViewPrefs.prototype.getPref = function (e) {
            return (
              h(arguments.length, 1, "getPref", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDocViewPrefs.getPref", { p: this.id, pref: e })
            )
          }),
          (d.PDFDocViewPrefs.prototype.setNonFullScreenPageMode = function (e) {
            return (
              h(arguments.length, 1, "setNonFullScreenPageMode", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDocViewPrefs.setNonFullScreenPageMode", { p: this.id, mode: e })
            )
          }),
          (d.PDFDocViewPrefs.prototype.getNonFullScreenPageMode = function () {
            return d.sendWithPromise("PDFDocViewPrefs.getNonFullScreenPageMode", { p: this.id })
          }),
          (d.PDFDocViewPrefs.prototype.setDirection = function (e) {
            return (
              h(arguments.length, 1, "setDirection", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFDocViewPrefs.setDirection", { p: this.id, left_to_right: e })
            )
          }),
          (d.PDFDocViewPrefs.prototype.getDirection = function () {
            return d.sendWithPromise("PDFDocViewPrefs.getDirection", { p: this.id })
          }),
          (d.PDFDocViewPrefs.prototype.setViewArea = function (e) {
            return (
              h(arguments.length, 1, "setViewArea", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDocViewPrefs.setViewArea", { p: this.id, box: e })
            )
          }),
          (d.PDFDocViewPrefs.prototype.getViewArea = function () {
            return d.sendWithPromise("PDFDocViewPrefs.getViewArea", { p: this.id })
          }),
          (d.PDFDocViewPrefs.prototype.setViewClip = function (e) {
            return (
              h(arguments.length, 1, "setViewClip", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDocViewPrefs.setViewClip", { p: this.id, box: e })
            )
          }),
          (d.PDFDocViewPrefs.prototype.getViewClip = function () {
            return d.sendWithPromise("PDFDocViewPrefs.getViewClip", { p: this.id })
          }),
          (d.PDFDocViewPrefs.prototype.setPrintArea = function (e) {
            return (
              h(arguments.length, 1, "setPrintArea", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDocViewPrefs.setPrintArea", { p: this.id, box: e })
            )
          }),
          (d.PDFDocViewPrefs.prototype.getPrintArea = function () {
            return d.sendWithPromise("PDFDocViewPrefs.getPrintArea", { p: this.id })
          }),
          (d.PDFDocViewPrefs.prototype.setPrintClip = function (e) {
            return (
              h(arguments.length, 1, "setPrintClip", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDocViewPrefs.setPrintClip", { p: this.id, box: e })
            )
          }),
          (d.PDFDocViewPrefs.prototype.getPrintClip = function () {
            return d.sendWithPromise("PDFDocViewPrefs.getPrintClip", { p: this.id })
          }),
          (d.PDFDocViewPrefs.prototype.getSDFObj = function () {
            return d
              .sendWithPromise("PDFDocViewPrefs.getSDFObj", { p: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.PDFDocViewPrefs.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("pdfDocViewPrefsCreate", { tr: e.id }).then(function (e) {
                return p(d.PDFDocViewPrefs, e)
              })
            )
          }),
          (d.PDFDocViewPrefs.prototype.copy = function () {
            return d.sendWithPromise("PDFDocViewPrefs.copy", { prefs: this.id }).then(function (e) {
              return p(d.PDFDocViewPrefs, e)
            })
          }),
          (d.PDFRasterizer.create = function (e) {
            return (
              void 0 === e && (e = d.PDFRasterizer.Type.e_BuiltIn),
              h(arguments.length, 0, "create", "(number)", [[e, "number"]]),
              d.sendWithPromise("pdfRasterizerCreate", { type: e }).then(function (e) {
                return o(d.PDFRasterizer, e)
              })
            )
          }),
          (d.PDFRasterizer.prototype.setDrawAnnotations = function (e) {
            return (
              h(arguments.length, 1, "setDrawAnnotations", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFRasterizer.setDrawAnnotations", {
                r: this.id,
                render_annots: e,
              })
            )
          }),
          (d.PDFRasterizer.prototype.setHighlightFields = function (e) {
            return (
              h(arguments.length, 1, "setHighlightFields", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFRasterizer.setHighlightFields", { r: this.id, highlight: e })
            )
          }),
          (d.PDFRasterizer.prototype.setAntiAliasing = function (e) {
            return (
              h(arguments.length, 1, "setAntiAliasing", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFRasterizer.setAntiAliasing", { r: this.id, enable_aa: e })
            )
          }),
          (d.PDFRasterizer.prototype.setPathHinting = function (e) {
            return (
              h(arguments.length, 1, "setPathHinting", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFRasterizer.setPathHinting", { r: this.id, enable_hinting: e })
            )
          }),
          (d.PDFRasterizer.prototype.setThinLineAdjustment = function (e, t) {
            return (
              h(arguments.length, 2, "setThinLineAdjustment", "(boolean, boolean)", [
                [e, "boolean"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("PDFRasterizer.setThinLineAdjustment", {
                r: this.id,
                grid_fit: e,
                stroke_adjust: t,
              })
            )
          }),
          (d.PDFRasterizer.prototype.setGamma = function (e) {
            return (
              h(arguments.length, 1, "setGamma", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFRasterizer.setGamma", { r: this.id, expgamma: e })
            )
          }),
          (d.PDFRasterizer.prototype.setOCGContext = function (e) {
            return (
              h(arguments.length, 1, "setOCGContext", "(PDFNet.OCGContext)", [
                [e, "Object", d.OCGContext, "OCGContext"],
              ]),
              d.sendWithPromise("PDFRasterizer.setOCGContext", { r: this.id, ctx: e.id })
            )
          }),
          (d.PDFRasterizer.prototype.setPrintMode = function (e) {
            return (
              h(arguments.length, 1, "setPrintMode", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFRasterizer.setPrintMode", { r: this.id, is_printing: e })
            )
          }),
          (d.PDFRasterizer.prototype.setImageSmoothing = function (e, t) {
            return (
              void 0 === e && (e = !0),
              void 0 === t && (t = !1),
              h(arguments.length, 0, "setImageSmoothing", "(boolean, boolean)", [
                [e, "boolean"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("PDFRasterizer.setImageSmoothing", {
                r: this.id,
                smoothing_enabled: e,
                hq_image_resampling: t,
              })
            )
          }),
          (d.PDFRasterizer.prototype.setOverprint = function (e) {
            return (
              h(arguments.length, 1, "setOverprint", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFRasterizer.setOverprint", { r: this.id, op: e })
            )
          }),
          (d.PDFRasterizer.prototype.setCaching = function (e) {
            return (
              void 0 === e && (e = !0),
              h(arguments.length, 0, "setCaching", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFRasterizer.setCaching", { r: this.id, enabled: e })
            )
          }),
          (d.PDFDraw.prototype.setOCGContext = function (e) {
            return (
              h(arguments.length, 1, "setOCGContext", "(PDFNet.OCGContext)", [
                [e, "Object", d.OCGContext, "OCGContext"],
              ]),
              d.sendWithPromise("PDFDraw.setOCGContext", { r: this.id, ctx: e.id })
            )
          }),
          (d.PDFRasterizer.prototype.setAnnotationState = function (e, t) {
            return (
              h(arguments.length, 2, "setAnnotationState", "(PDFNet.Annot, number)", [
                [e, "Object", d.Annot, "Annot"],
                [t, "number"],
              ]),
              d.sendWithPromise("PDFRasterizer.setAnnotationState", {
                r: this.id,
                annot: e.id,
                new_view_state: t,
              })
            )
          }),
          (d.PDFRasterizer.prototype.setRasterizerType = function (e) {
            return (
              h(arguments.length, 1, "setRasterizerType", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFRasterizer.setRasterizerType", { r: this.id, type: e })
            )
          }),
          (d.PDFRasterizer.prototype.getRasterizerType = function () {
            return d.sendWithPromise("PDFRasterizer.getRasterizerType", { r: this.id })
          }),
          (d.PDFRasterizer.prototype.setColorPostProcessMode = function (e) {
            return (
              h(arguments.length, 1, "setColorPostProcessMode", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFRasterizer.setColorPostProcessMode", { r: this.id, mode: e })
            )
          }),
          (d.PDFRasterizer.prototype.getColorPostProcessMode = function () {
            return d.sendWithPromise("PDFRasterizer.getColorPostProcessMode", { r: this.id })
          }),
          (d.PDFRasterizer.prototype.enableDisplayListCaching = function (e) {
            return (
              h(arguments.length, 1, "enableDisplayListCaching", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFRasterizer.enableDisplayListCaching", {
                r: this.id,
                enabled: e,
              })
            )
          }),
          (d.PDFRasterizer.prototype.updateBuffer = function () {
            return d.sendWithPromise("PDFRasterizer.updateBuffer", { r: this.id })
          }),
          (d.PDFRasterizer.prototype.rasterizeAnnot = function (e, t, n, i, r) {
            return (
              h(
                arguments.length,
                5,
                "rasterizeAnnot",
                "(PDFNet.Annot, PDFNet.Page, PDFNet.Matrix2D, boolean, boolean)",
                [
                  [e, "Object", d.Annot, "Annot"],
                  [t, "Object", d.Page, "Page"],
                  [n, "Structure", d.Matrix2D, "Matrix2D"],
                  [i, "boolean"],
                  [r, "boolean"],
                ]
              ),
              l("rasterizeAnnot", [[n, 2]]),
              d
                .sendWithPromise("PDFRasterizer.rasterizeAnnot", {
                  r: this.id,
                  annot: e.id,
                  page: t.id,
                  device_mtx: n,
                  demult: i,
                  cancel: r,
                })
                .then(function (e) {
                  return p(d.OwnedBitmap, e)
                })
            )
          }),
          (d.PDFRasterizer.prototype.rasterizeSeparations = function (e, t, n, i, r, o) {
            return (
              h(
                arguments.length,
                6,
                "rasterizeSeparations",
                "(PDFNet.Page, number, number, PDFNet.Matrix2D, PDFNet.Rect, boolean)",
                [
                  [e, "Object", d.Page, "Page"],
                  [t, "number"],
                  [n, "number"],
                  [i, "Structure", d.Matrix2D, "Matrix2D"],
                  [r, "Structure", d.Rect, "Rect"],
                  [o, "boolean"],
                ]
              ),
              l("rasterizeSeparations", [
                [i, 3],
                [r, 4],
              ]),
              d
                .sendWithPromise("PDFRasterizer.rasterizeSeparations", {
                  r: this.id,
                  page: e.id,
                  width: t,
                  height: n,
                  mtx: i,
                  clip: r,
                  cancel: o,
                })
                .then(function (e) {
                  for (var t = [], n = 0; n < e.length; ++n) {
                    var i = e[n]
                    if ("0" === i) return null
                    ;(i = new d.Separation(i)), t.push(i)
                  }
                  return t
                })
            )
          }),
          (d.PDFDraw.create = function (e) {
            return (
              void 0 === e && (e = 92),
              h(arguments.length, 0, "create", "(number)", [[e, "number"]]),
              d.sendWithPromise("pdfDrawCreate", { dpi: e }).then(function (e) {
                return o(d.PDFDraw, e)
              })
            )
          }),
          (d.PDFDraw.prototype.setRasterizerType = function (e) {
            return (
              h(arguments.length, 1, "setRasterizerType", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDraw.setRasterizerType", { d: this.id, type: e })
            )
          }),
          (d.PDFDraw.prototype.setDPI = function (e) {
            return (
              h(arguments.length, 1, "setDPI", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDraw.setDPI", { d: this.id, dpi: e })
            )
          }),
          (d.PDFDraw.prototype.setImageSize = function (e, t, n) {
            return (
              void 0 === n && (n = !0),
              h(arguments.length, 2, "setImageSize", "(number, number, boolean)", [
                [e, "number"],
                [t, "number"],
                [n, "boolean"],
              ]),
              d.sendWithPromise("PDFDraw.setImageSize", {
                d: this.id,
                width: e,
                height: t,
                preserve_aspect_ratio: n,
              })
            )
          }),
          (d.PDFDraw.prototype.setPageBox = function (e) {
            return (
              h(arguments.length, 1, "setPageBox", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDraw.setPageBox", { d: this.id, region: e })
            )
          }),
          (d.PDFDraw.prototype.setClipRect = function (e) {
            return (
              h(arguments.length, 1, "setClipRect", "(PDFNet.Rect)", [
                [e, "Structure", d.Rect, "Rect"],
              ]),
              l("setClipRect", [[e, 0]]),
              d.sendWithPromise("PDFDraw.setClipRect", { d: this.id, rect: e })
            )
          }),
          (d.PDFDraw.prototype.setFlipYAxis = function (e) {
            return (
              h(arguments.length, 1, "setFlipYAxis", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFDraw.setFlipYAxis", { d: this.id, flip_y: e })
            )
          }),
          (d.PDFDraw.prototype.setRotate = function (e) {
            return (
              h(arguments.length, 1, "setRotate", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDraw.setRotate", { d: this.id, angle: e })
            )
          }),
          (d.PDFDraw.prototype.setDrawAnnotations = function (e) {
            return (
              h(arguments.length, 1, "setDrawAnnotations", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFDraw.setDrawAnnotations", { d: this.id, render_annots: e })
            )
          }),
          (d.PDFDraw.prototype.setHighlightFields = function (e) {
            return (
              h(arguments.length, 1, "setHighlightFields", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFDraw.setHighlightFields", { d: this.id, highlight: e })
            )
          }),
          (d.PDFDraw.prototype.setAntiAliasing = function (e) {
            return (
              h(arguments.length, 1, "setAntiAliasing", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFDraw.setAntiAliasing", { d: this.id, enable_aa: e })
            )
          }),
          (d.PDFDraw.prototype.setPathHinting = function (e) {
            return (
              h(arguments.length, 1, "setPathHinting", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFDraw.setPathHinting", { d: this.id, enable_hinting: e })
            )
          }),
          (d.PDFDraw.prototype.setThinLineAdjustment = function (e, t) {
            return (
              h(arguments.length, 2, "setThinLineAdjustment", "(boolean, boolean)", [
                [e, "boolean"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("PDFDraw.setThinLineAdjustment", {
                d: this.id,
                grid_fit: e,
                stroke_adjust: t,
              })
            )
          }),
          (d.PDFDraw.prototype.setGamma = function (e) {
            return (
              h(arguments.length, 1, "setGamma", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDraw.setGamma", { d: this.id, exp: e })
            )
          }),
          (d.PDFDraw.prototype.setPrintMode = function (e) {
            return (
              h(arguments.length, 1, "setPrintMode", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFDraw.setPrintMode", { d: this.id, is_printing: e })
            )
          }),
          (d.PDFDraw.prototype.setPageTransparent = function (e) {
            return (
              h(arguments.length, 1, "setPageTransparent", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFDraw.setPageTransparent", { d: this.id, is_transparent: e })
            )
          }),
          (d.PDFDraw.prototype.setDefaultPageColor = function (e, t, n) {
            return (
              h(arguments.length, 3, "setDefaultPageColor", "(number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
              ]),
              d.sendWithPromise("PDFDraw.setDefaultPageColor", { d: this.id, r: e, g: t, b: n })
            )
          }),
          (d.PDFDraw.prototype.setOverprint = function (e) {
            return (
              h(arguments.length, 1, "setOverprint", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDraw.setOverprint", { d: this.id, op: e })
            )
          }),
          (d.PDFDraw.prototype.setImageSmoothing = function (e, t) {
            return (
              void 0 === e && (e = !0),
              void 0 === t && (t = !1),
              h(arguments.length, 0, "setImageSmoothing", "(boolean, boolean)", [
                [e, "boolean"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("PDFDraw.setImageSmoothing", {
                d: this.id,
                smoothing_enabled: e,
                hq_image_resampling: t,
              })
            )
          }),
          (d.PDFDraw.prototype.setCaching = function (e) {
            return (
              void 0 === e && (e = !0),
              h(arguments.length, 0, "setCaching", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("PDFDraw.setCaching", { d: this.id, enabled: e })
            )
          }),
          (d.PDFDraw.prototype.setColorPostProcessMode = function (e) {
            return (
              h(arguments.length, 1, "setColorPostProcessMode", "(number)", [[e, "number"]]),
              d.sendWithPromise("PDFDraw.setColorPostProcessMode", { d: this.id, mode: e })
            )
          }),
          (d.PDFDraw.prototype.getSeparationBitmaps = function (e) {
            return (
              h(arguments.length, 1, "getSeparationBitmaps", "(PDFNet.Page)", [
                [e, "Object", d.Page, "Page"],
              ]),
              d
                .sendWithPromise("PDFDraw.getSeparationBitmaps", { d: this.id, page: e.id })
                .then(function (e) {
                  for (var t = [], n = 0; n < e.length; ++n) {
                    var i = e[n]
                    if ("0" === i) return null
                    ;(i = new d.Separation(i)), t.push(i)
                  }
                  return t
                })
            )
          }),
          (d.enableJavaScript = function (e) {
            return (
              h(arguments.length, 1, "enableJavaScript", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("pdfNetEnableJavaScript", { enable: e })
            )
          }),
          (d.isJavaScriptEnabled = function () {
            return d.sendWithPromise("pdfNetIsJavaScriptEnabled", {})
          }),
          (d.terminateEx = function (e) {
            return (
              h(arguments.length, 1, "terminateEx", "(number)", [[e, "number"]]),
              d.sendWithPromise("pdfNetTerminateEx", { termination_level: e })
            )
          }),
          (d.setColorManagement = function (e) {
            return (
              void 0 === e && (e = d.CMSType.e_lcms),
              h(arguments.length, 0, "setColorManagement", "(number)", [[e, "number"]]),
              d.sendWithPromise("pdfNetSetColorManagement", { t: e })
            )
          }),
          (d.setDefaultDeviceCMYKProfileFromFilter = function (e) {
            return (
              h(arguments.length, 1, "setDefaultDeviceCMYKProfileFromFilter", "(PDFNet.Filter)", [
                [e, "Object", d.Filter, "Filter"],
              ]),
              d.sendWithPromise("pdfNetSetDefaultDeviceCMYKProfileFromFilter", { stream: e.id })
            )
          }),
          (d.setDefaultDeviceRGBProfileFromFilter = function (e) {
            return (
              h(arguments.length, 1, "setDefaultDeviceRGBProfileFromFilter", "(PDFNet.Filter)", [
                [e, "Object", d.Filter, "Filter"],
              ]),
              d.sendWithPromise("pdfNetSetDefaultDeviceRGBProfileFromFilter", { stream: e.id })
            )
          }),
          (d.setDefaultFlateCompressionLevel = function (e) {
            return (
              h(arguments.length, 1, "setDefaultFlateCompressionLevel", "(number)", [
                [e, "number"],
              ]),
              d.sendWithPromise("pdfNetSetDefaultFlateCompressionLevel", { level: e })
            )
          }),
          (d.setViewerCache = function (e, t) {
            return (
              h(arguments.length, 2, "setViewerCache", "(number, boolean)", [
                [e, "number"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("pdfNetSetViewerCache", { max_cache_size: e, on_disk: t })
            )
          }),
          (d.getVersion = function () {
            return d.sendWithPromise("pdfNetGetVersion", {})
          }),
          (d.setLogLevel = function (e) {
            return (
              void 0 === e && (e = d.LogLevel.e_LogLevel_Fatal),
              h(arguments.length, 0, "setLogLevel", "(number)", [[e, "number"]]),
              d.sendWithPromise("pdfNetSetLogLevel", { level: e })
            )
          }),
          (d.getSystemFontList = function () {
            return d.sendWithPromise("pdfNetGetSystemFontList", {})
          }),
          (d.addPDFTronCustomHandler = function (e) {
            return (
              h(arguments.length, 1, "addPDFTronCustomHandler", "(number)", [[e, "number"]]),
              d.sendWithPromise("pdfNetAddPDFTronCustomHandler", { custom_id: e })
            )
          }),
          (d.getVersionString = function () {
            return d.sendWithPromise("pdfNetGetVersionString", {})
          }),
          (d.setConnectionErrorHandlingMode = function (e) {
            return (
              h(arguments.length, 1, "setConnectionErrorHandlingMode", "(number)", [[e, "number"]]),
              d.sendWithPromise("pdfNetSetConnectionErrorHandlingMode", { mode: e })
            )
          }),
          (d.Rect.init = function (e, t, n, i) {
            return (
              h(arguments.length, 4, "init", "(number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
              ]),
              d.sendWithPromise("rectInit", { x1: e, y1: t, x2: n, y2: i }).then(function (e) {
                return new d.Rect(e)
              })
            )
          }),
          (d.Rect.prototype.attach = function (e) {
            h(arguments.length, 1, "attach", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              u("attach", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Rect.attach"),
              d.sendWithPromise("Rect.attach", { rect: this, obj: e.id }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.Rect.prototype.update = function (e) {
            void 0 === e && (e = new d.Obj("__null")),
              h(arguments.length, 0, "update", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              u("update", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Rect.update"),
              d.sendWithPromise("Rect.update", { rect: this, obj: e.id }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.rect, t), e.result
              })
            )
          }),
          (d.Rect.prototype.get = function () {
            return u("get", this.yieldFunction), d.sendWithPromise("Rect.get", { rect: this })
          }),
          (d.Rect.prototype.set = function (e, t, n, i) {
            h(arguments.length, 4, "set", "(number, number, number, number)", [
              [e, "number"],
              [t, "number"],
              [n, "number"],
              [i, "number"],
            ]),
              u("set", this.yieldFunction)
            var r = this
            return (
              (this.yieldFunction = "Rect.set"),
              d
                .sendWithPromise("Rect.set", { rect: this, x1: e, y1: t, x2: n, y2: i })
                .then(function (e) {
                  ;(r.yieldFunction = void 0), m(e, r)
                })
            )
          }),
          (d.Rect.prototype.width = function () {
            return u("width", this.yieldFunction), d.sendWithPromise("Rect.width", { rect: this })
          }),
          (d.Rect.prototype.height = function () {
            return u("height", this.yieldFunction), d.sendWithPromise("Rect.height", { rect: this })
          }),
          (d.Rect.prototype.contains = function (e, t) {
            return (
              h(arguments.length, 2, "contains", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              u("contains", this.yieldFunction),
              d.sendWithPromise("Rect.contains", { rect: this, x: e, y: t })
            )
          }),
          (d.Rect.prototype.intersectRect = function (e, t) {
            h(arguments.length, 2, "intersectRect", "(PDFNet.Rect, PDFNet.Rect)", [
              [e, "Structure", d.Rect, "Rect"],
              [t, "Structure", d.Rect, "Rect"],
            ]),
              u("intersectRect", this.yieldFunction),
              l("intersectRect", [
                [e, 0],
                [t, 1],
              ])
            var n = this
            return (
              (this.yieldFunction = "Rect.intersectRect"),
              d
                .sendWithPromise("Rect.intersectRect", { rect: this, rect1: e, rect2: t })
                .then(function (e) {
                  return (n.yieldFunction = void 0), m(e.rect, n), e.result
                })
            )
          }),
          (d.Rect.prototype.normalize = function () {
            u("normalize", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Rect.normalize"),
              d.sendWithPromise("Rect.normalize", { rect: this }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.Rect.prototype.inflate1 = function (e) {
            h(arguments.length, 1, "inflate1", "(number)", [[e, "number"]]),
              u("inflate1", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "Rect.inflate1"),
              d.sendWithPromise("Rect.inflate1", { rect: this, amount: e }).then(function (e) {
                ;(t.yieldFunction = void 0), m(e, t)
              })
            )
          }),
          (d.Rect.prototype.inflate2 = function (e, t) {
            h(arguments.length, 2, "inflate2", "(number, number)", [
              [e, "number"],
              [t, "number"],
            ]),
              u("inflate2", this.yieldFunction)
            var n = this
            return (
              (this.yieldFunction = "Rect.inflate2"),
              d.sendWithPromise("Rect.inflate2", { rect: this, x: e, y: t }).then(function (e) {
                ;(n.yieldFunction = void 0), m(e, n)
              })
            )
          }),
          (d.Redactor.redactionCreate = function (e, t, n, i) {
            return (
              h(arguments.length, 4, "redactionCreate", "(number, PDFNet.Rect, boolean, string)", [
                [e, "number"],
                [t, "Structure", d.Rect, "Rect"],
                [n, "boolean"],
                [i, "string"],
              ]),
              l("redactionCreate", [[t, 1]]),
              d
                .sendWithPromise("Redactor.redactionCreate", {
                  page_num: e,
                  bbox: t,
                  negative: n,
                  text: i,
                })
                .then(function (e) {
                  return p(d.Redaction, e)
                })
            )
          }),
          (d.Redactor.redactionDestroy = function (e) {
            return (
              h(arguments.length, 1, "redactionDestroy", "(PDFNet.Redaction)", [
                [e, "Object", d.Redaction, "Redaction"],
              ]),
              d.sendWithPromise("Redactor.redactionDestroy", { redaction: e.id })
            )
          }),
          (d.Redactor.redactionCopy = function (e) {
            return (
              h(arguments.length, 1, "redactionCopy", "(PDFNet.Redaction)", [
                [e, "Object", d.Redaction, "Redaction"],
              ]),
              d.sendWithPromise("Redactor.redactionCopy", { other: e.id }).then(function (e) {
                return p(d.Redaction, e)
              })
            )
          }),
          (d.Shading.create = function (e) {
            return (
              void 0 === e && (e = new d.Obj("0")),
              h(arguments.length, 0, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("shadingCreate", { shading_dict: e.id }).then(function (e) {
                return o(d.Shading, e)
              })
            )
          }),
          (d.Shading.getTypeFromObj = function (e) {
            return (
              h(arguments.length, 1, "getTypeFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("shadingGetTypeFromObj", { shading_dict: e.id })
            )
          }),
          (d.Shading.prototype.getType = function () {
            return d.sendWithPromise("Shading.getType", { s: this.id })
          }),
          (d.Shading.prototype.getSDFObj = function () {
            return d.sendWithPromise("Shading.getSDFObj", { s: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Shading.prototype.getBaseColorSpace = function () {
            return d
              .sendWithPromise("Shading.getBaseColorSpace", { s: this.id })
              .then(function (e) {
                return o(d.ColorSpace, e)
              })
          }),
          (d.Shading.prototype.hasBBox = function () {
            return d.sendWithPromise("Shading.hasBBox", { s: this.id })
          }),
          (d.Shading.prototype.getBBox = function () {
            return d.sendWithPromise("Shading.getBBox", { s: this.id }).then(function (e) {
              return new d.Rect(e)
            })
          }),
          (d.Shading.prototype.hasBackground = function () {
            return d.sendWithPromise("Shading.hasBackground", { s: this.id })
          }),
          (d.Shading.prototype.getBackground = function () {
            return d.sendWithPromise("Shading.getBackground", { s: this.id }).then(function (e) {
              return o(d.ColorPt, e)
            })
          }),
          (d.Shading.prototype.getAntialias = function () {
            return d.sendWithPromise("Shading.getAntialias", { s: this.id })
          }),
          (d.Shading.prototype.getParamStart = function () {
            return d.sendWithPromise("Shading.getParamStart", { s: this.id })
          }),
          (d.Shading.prototype.getParamEnd = function () {
            return d.sendWithPromise("Shading.getParamEnd", { s: this.id })
          }),
          (d.Shading.prototype.isExtendStart = function () {
            return d.sendWithPromise("Shading.isExtendStart", { s: this.id })
          }),
          (d.Shading.prototype.isExtendEnd = function () {
            return d.sendWithPromise("Shading.isExtendEnd", { s: this.id })
          }),
          (d.Shading.prototype.getColor = function (e) {
            return (
              h(arguments.length, 1, "getColor", "(number)", [[e, "number"]]),
              d.sendWithPromise("Shading.getColor", { s: this.id, t: e }).then(function (e) {
                return o(d.ColorPt, e)
              })
            )
          }),
          (d.Shading.prototype.getCoords = function () {
            return d.sendWithPromise("Shading.getCoords", { s: this.id })
          }),
          (d.Shading.prototype.getCoordsRadial = function () {
            return d.sendWithPromise("Shading.getCoordsRadial", { s: this.id })
          }),
          (d.Shading.prototype.getDomain = function () {
            return d.sendWithPromise("Shading.getDomain", { s: this.id })
          }),
          (d.Shading.prototype.getMatrix = function () {
            return d.sendWithPromise("Shading.getMatrix", { s: this.id }).then(function (e) {
              return new d.Matrix2D(e)
            })
          }),
          (d.Shading.prototype.getColorForFunction = function (e, t) {
            return (
              h(arguments.length, 2, "getColorForFunction", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("Shading.getColorForFunction", { s: this.id, t1: e, t2: t })
                .then(function (e) {
                  return o(d.ColorPt, e)
                })
            )
          }),
          (d.Stamper.create = function (e, t, n) {
            return (
              h(arguments.length, 3, "create", "(number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
              ]),
              d.sendWithPromise("stamperCreate", { size_type: e, a: t, b: n }).then(function (e) {
                return o(d.Stamper, e)
              })
            )
          }),
          (d.Stamper.prototype.stampImage = function (e, t, n) {
            return (
              h(
                arguments.length,
                3,
                "stampImage",
                "(PDFNet.PDFDoc, PDFNet.Image, PDFNet.PageSet)",
                [
                  [e, "PDFDoc"],
                  [t, "Object", d.Image, "Image"],
                  [n, "Object", d.PageSet, "PageSet"],
                ]
              ),
              d.sendWithPromise("Stamper.stampImage", {
                stamp: this.id,
                dest_doc: e.id,
                img: t.id,
                dest_pages: n.id,
              })
            )
          }),
          (d.Stamper.prototype.stampPage = function (e, t, n) {
            return (
              h(arguments.length, 3, "stampPage", "(PDFNet.PDFDoc, PDFNet.Page, PDFNet.PageSet)", [
                [e, "PDFDoc"],
                [t, "Object", d.Page, "Page"],
                [n, "Object", d.PageSet, "PageSet"],
              ]),
              d.sendWithPromise("Stamper.stampPage", {
                stamp: this.id,
                dest_doc: e.id,
                page: t.id,
                dest_pages: n.id,
              })
            )
          }),
          (d.Stamper.prototype.stampText = function (e, t, n) {
            return (
              h(arguments.length, 3, "stampText", "(PDFNet.PDFDoc, string, PDFNet.PageSet)", [
                [e, "PDFDoc"],
                [t, "string"],
                [n, "Object", d.PageSet, "PageSet"],
              ]),
              d.sendWithPromise("Stamper.stampText", {
                stamp: this.id,
                dest_doc: e.id,
                txt: t,
                dest_pages: n.id,
              })
            )
          }),
          (d.Stamper.prototype.setFont = function (e) {
            return (
              h(arguments.length, 1, "setFont", "(PDFNet.Font)", [[e, "Object", d.Font, "Font"]]),
              d.sendWithPromise("Stamper.setFont", { stamp: this.id, font: e.id })
            )
          }),
          (d.Stamper.prototype.setFontColor = function (e) {
            return (
              h(arguments.length, 1, "setFontColor", "(PDFNet.ColorPt)", [
                [e, "Object", d.ColorPt, "ColorPt"],
              ]),
              d.sendWithPromise("Stamper.setFontColor", { stamp: this.id, font_color: e.id })
            )
          }),
          (d.Stamper.prototype.setTextAlignment = function (e) {
            return (
              h(arguments.length, 1, "setTextAlignment", "(number)", [[e, "number"]]),
              d.sendWithPromise("Stamper.setTextAlignment", { stamp: this.id, text_alignment: e })
            )
          }),
          (d.Stamper.prototype.setOpacity = function (e) {
            return (
              h(arguments.length, 1, "setOpacity", "(number)", [[e, "number"]]),
              d.sendWithPromise("Stamper.setOpacity", { stamp: this.id, opacity: e })
            )
          }),
          (d.Stamper.prototype.setRotation = function (e) {
            return (
              h(arguments.length, 1, "setRotation", "(number)", [[e, "number"]]),
              d.sendWithPromise("Stamper.setRotation", { stamp: this.id, rotation: e })
            )
          }),
          (d.Stamper.prototype.setAsBackground = function (e) {
            return (
              h(arguments.length, 1, "setAsBackground", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Stamper.setAsBackground", { stamp: this.id, background: e })
            )
          }),
          (d.Stamper.prototype.setAsAnnotation = function (e) {
            return (
              h(arguments.length, 1, "setAsAnnotation", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Stamper.setAsAnnotation", { stamp: this.id, annotation: e })
            )
          }),
          (d.Stamper.prototype.showsOnScreen = function (e) {
            return (
              h(arguments.length, 1, "showsOnScreen", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Stamper.showsOnScreen", { stamp: this.id, on_screen: e })
            )
          }),
          (d.Stamper.prototype.showsOnPrint = function (e) {
            return (
              h(arguments.length, 1, "showsOnPrint", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Stamper.showsOnPrint", { stamp: this.id, on_print: e })
            )
          }),
          (d.Stamper.prototype.setAlignment = function (e, t) {
            return (
              h(arguments.length, 2, "setAlignment", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("Stamper.setAlignment", {
                stamp: this.id,
                horizontal_alignment: e,
                vertical_alignment: t,
              })
            )
          }),
          (d.Stamper.prototype.setPosition = function (e, t, n) {
            return (
              void 0 === n && (n = !1),
              h(arguments.length, 2, "setPosition", "(number, number, boolean)", [
                [e, "number"],
                [t, "number"],
                [n, "boolean"],
              ]),
              d.sendWithPromise("Stamper.setPosition", {
                stamp: this.id,
                horizontal_distance: e,
                vertical_distance: t,
                use_percentage: n,
              })
            )
          }),
          (d.Stamper.prototype.setSize = function (e, t, n) {
            return (
              h(arguments.length, 3, "setSize", "(number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
              ]),
              d.sendWithPromise("Stamper.setSize", { stamp: this.id, size_type: e, a: t, b: n })
            )
          }),
          (d.Stamper.deleteStamps = function (e, t) {
            return (
              h(arguments.length, 2, "deleteStamps", "(PDFNet.PDFDoc, PDFNet.PageSet)", [
                [e, "PDFDoc"],
                [t, "Object", d.PageSet, "PageSet"],
              ]),
              d.sendWithPromise("stamperDeleteStamps", { doc: e.id, page_set: t.id })
            )
          }),
          (d.Stamper.hasStamps = function (e, t) {
            return (
              h(arguments.length, 2, "hasStamps", "(PDFNet.PDFDoc, PDFNet.PageSet)", [
                [e, "PDFDoc"],
                [t, "Object", d.PageSet, "PageSet"],
              ]),
              d.sendWithPromise("stamperHasStamps", { doc: e.id, page_set: t.id })
            )
          }),
          (d.TextExtractor.create = function () {
            return d.sendWithPromise("textExtractorCreate", {}).then(function (e) {
              return o(d.TextExtractor, e)
            })
          }),
          (d.TextExtractor.prototype.setOCGContext = function (e) {
            return (
              h(arguments.length, 1, "setOCGContext", "(PDFNet.OCGContext)", [
                [e, "Object", d.OCGContext, "OCGContext"],
              ]),
              d.sendWithPromise("TextExtractor.setOCGContext", { te: this.id, ctx: e.id })
            )
          }),
          (d.TextExtractor.prototype.begin = function (e, t, n) {
            return (
              void 0 === t && (t = null),
              void 0 === n && (n = 0),
              h(arguments.length, 1, "begin", "(PDFNet.Page, PDFNet.Rect, number)", [
                [e, "Object", d.Page, "Page"],
                [t, "Structure", d.Rect, "Rect"],
                [n, "number"],
              ]),
              l("begin", [[t, 1]]),
              d.sendWithPromise("TextExtractor.begin", {
                te: this.id,
                page: e.id,
                clip_ptr: t,
                flags: n,
              })
            )
          }),
          (d.TextExtractor.prototype.getWordCount = function () {
            return d.sendWithPromise("TextExtractor.getWordCount", { te: this.id })
          }),
          (d.TextExtractor.prototype.setRightToLeftLanguage = function (e) {
            return (
              h(arguments.length, 1, "setRightToLeftLanguage", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("TextExtractor.setRightToLeftLanguage", { te: this.id, rtl: e })
            )
          }),
          (d.TextExtractor.prototype.getRightToLeftLanguage = function () {
            return d.sendWithPromise("TextExtractor.getRightToLeftLanguage", { te: this.id })
          }),
          (d.TextExtractor.prototype.getAsText = function (e) {
            return (
              void 0 === e && (e = !0),
              h(arguments.length, 0, "getAsText", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("TextExtractor.getAsText", { te: this.id, dehyphen: e })
            )
          }),
          (d.TextExtractor.prototype.getTextUnderAnnot = function (e) {
            return (
              h(arguments.length, 1, "getTextUnderAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d.sendWithPromise("TextExtractor.getTextUnderAnnot", { te: this.id, annot: e.id })
            )
          }),
          (d.TextExtractor.prototype.getAsXML = function (e) {
            return (
              void 0 === e && (e = 0),
              h(arguments.length, 0, "getAsXML", "(number)", [[e, "number"]]),
              d.sendWithPromise("TextExtractor.getAsXML", { te: this.id, xml_output_flags: e })
            )
          }),
          (d.TextExtractor.prototype.getHighlights = function (e, t) {
            return (
              h(arguments.length, 2, "getHighlights", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("TextExtractor.getHighlights", {
                  te: this.id,
                  char_ranges: e,
                  char_ranges_size: t,
                })
                .then(function (e) {
                  return o(d.Highlights, e)
                })
            )
          }),
          (d.TextExtractorStyle.prototype.getFont = function () {
            u("getFont", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorStyle.getFont"),
              d.sendWithPromise("TextExtractorStyle.getFont", { tes: this }).then(function (e) {
                return (
                  (t.yieldFunction = void 0), (e.result = p(d.Obj, e.result)), m(e.tes, t), e.result
                )
              })
            )
          }),
          (d.TextExtractorStyle.prototype.getFontName = function () {
            u("getFontName", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorStyle.getFontName"),
              d.sendWithPromise("TextExtractorStyle.getFontName", { tes: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.tes, t), e.result
              })
            )
          }),
          (d.TextExtractorStyle.prototype.getFontSize = function () {
            u("getFontSize", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorStyle.getFontSize"),
              d.sendWithPromise("TextExtractorStyle.getFontSize", { tes: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.tes, t), e.result
              })
            )
          }),
          (d.TextExtractorStyle.prototype.getWeight = function () {
            u("getWeight", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorStyle.getWeight"),
              d.sendWithPromise("TextExtractorStyle.getWeight", { tes: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.tes, t), e.result
              })
            )
          }),
          (d.TextExtractorStyle.prototype.isItalic = function () {
            u("isItalic", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorStyle.isItalic"),
              d.sendWithPromise("TextExtractorStyle.isItalic", { tes: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.tes, t), e.result
              })
            )
          }),
          (d.TextExtractorStyle.prototype.isSerif = function () {
            u("isSerif", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorStyle.isSerif"),
              d.sendWithPromise("TextExtractorStyle.isSerif", { tes: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.tes, t), e.result
              })
            )
          }),
          (d.TextExtractorStyle.prototype.compare = function (e) {
            return (
              h(arguments.length, 1, "compare", "(PDFNet.TextExtractorStyle)", [
                [e, "Structure", d.TextExtractorStyle, "TextExtractorStyle"],
              ]),
              u("compare", this.yieldFunction),
              l("compare", [[e, 0]]),
              d.sendWithPromise("TextExtractorStyle.compare", { tes: this, s: e })
            )
          }),
          (d.TextExtractorStyle.create = function () {
            return d.sendWithPromise("textExtractorStyleCreate", {}).then(function (e) {
              return new d.TextExtractorStyle(e)
            })
          }),
          (d.TextExtractorStyle.prototype.copy = function () {
            u("copy", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorStyle.copy"),
              d.sendWithPromise("TextExtractorStyle.copy", { s: this }).then(function (e) {
                return (
                  (t.yieldFunction = void 0),
                  (e.result = new d.TextExtractorStyle(e.result)),
                  m(e.s, t),
                  e.result
                )
              })
            )
          }),
          (d.TextExtractorWord.prototype.getNumGlyphs = function () {
            u("getNumGlyphs", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorWord.getNumGlyphs"),
              d.sendWithPromise("TextExtractorWord.getNumGlyphs", { tew: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.tew, t), e.result
              })
            )
          }),
          (d.TextExtractorWord.prototype.getCharStyle = function (e) {
            h(arguments.length, 1, "getCharStyle", "(number)", [[e, "number"]]),
              u("getCharStyle", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorWord.getCharStyle"),
              d
                .sendWithPromise("TextExtractorWord.getCharStyle", { tew: this, char_idx: e })
                .then(function (e) {
                  return (
                    (t.yieldFunction = void 0),
                    (e.result = new d.TextExtractorStyle(e.result)),
                    m(e.tew, t),
                    e.result
                  )
                })
            )
          }),
          (d.TextExtractorWord.prototype.getStyle = function () {
            u("getStyle", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorWord.getStyle"),
              d.sendWithPromise("TextExtractorWord.getStyle", { tew: this }).then(function (e) {
                return (
                  (t.yieldFunction = void 0),
                  (e.result = new d.TextExtractorStyle(e.result)),
                  m(e.tew, t),
                  e.result
                )
              })
            )
          }),
          (d.TextExtractorWord.prototype.getStringLen = function () {
            u("getStringLen", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorWord.getStringLen"),
              d.sendWithPromise("TextExtractorWord.getStringLen", { tew: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.tew, t), e.result
              })
            )
          }),
          (d.TextExtractorWord.prototype.getNextWord = function () {
            u("getNextWord", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorWord.getNextWord"),
              d.sendWithPromise("TextExtractorWord.getNextWord", { tew: this }).then(function (e) {
                return (
                  (t.yieldFunction = void 0),
                  (e.result = new d.TextExtractorWord(e.result)),
                  m(e.tew, t),
                  e.result
                )
              })
            )
          }),
          (d.TextExtractorWord.prototype.getCurrentNum = function () {
            u("getCurrentNum", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorWord.getCurrentNum"),
              d
                .sendWithPromise("TextExtractorWord.getCurrentNum", { tew: this })
                .then(function (e) {
                  return (t.yieldFunction = void 0), m(e.tew, t), e.result
                })
            )
          }),
          (d.TextExtractorWord.prototype.compare = function (e) {
            return (
              h(arguments.length, 1, "compare", "(PDFNet.TextExtractorWord)", [
                [e, "Structure", d.TextExtractorWord, "TextExtractorWord"],
              ]),
              u("compare", this.yieldFunction),
              l("compare", [[e, 0]]),
              d.sendWithPromise("TextExtractorWord.compare", { tew: this, word: e })
            )
          }),
          (d.TextExtractorWord.create = function () {
            return d.sendWithPromise("textExtractorWordCreate", {}).then(function (e) {
              return new d.TextExtractorWord(e)
            })
          }),
          (d.TextExtractorWord.prototype.isValid = function () {
            u("isValid", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorWord.isValid"),
              d.sendWithPromise("TextExtractorWord.isValid", { tew: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.tew, t), e.result
              })
            )
          }),
          (d.TextExtractorLine.prototype.getNumWords = function () {
            u("getNumWords", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorLine.getNumWords"),
              d.sendWithPromise("TextExtractorLine.getNumWords", { line: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.line, t), e.result
              })
            )
          }),
          (d.TextExtractorLine.prototype.isSimpleLine = function () {
            u("isSimpleLine", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorLine.isSimpleLine"),
              d
                .sendWithPromise("TextExtractorLine.isSimpleLine", { line: this })
                .then(function (e) {
                  return (t.yieldFunction = void 0), m(e.line, t), e.result
                })
            )
          }),
          (d.TextExtractorLine.prototype.getFirstWord = function () {
            u("getFirstWord", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorLine.getFirstWord"),
              d
                .sendWithPromise("TextExtractorLine.getFirstWord", { line: this })
                .then(function (e) {
                  return (
                    (t.yieldFunction = void 0),
                    (e.result = new d.TextExtractorWord(e.result)),
                    m(e.line, t),
                    e.result
                  )
                })
            )
          }),
          (d.TextExtractorLine.prototype.getWord = function (e) {
            h(arguments.length, 1, "getWord", "(number)", [[e, "number"]]),
              u("getWord", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorLine.getWord"),
              d
                .sendWithPromise("TextExtractorLine.getWord", { line: this, word_idx: e })
                .then(function (e) {
                  return (
                    (t.yieldFunction = void 0),
                    (e.result = new d.TextExtractorWord(e.result)),
                    m(e.line, t),
                    e.result
                  )
                })
            )
          }),
          (d.TextExtractorLine.prototype.getNextLine = function () {
            u("getNextLine", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorLine.getNextLine"),
              d.sendWithPromise("TextExtractorLine.getNextLine", { line: this }).then(function (e) {
                return (
                  (t.yieldFunction = void 0),
                  (e.result = new d.TextExtractorLine(e.result)),
                  m(e.line, t),
                  e.result
                )
              })
            )
          }),
          (d.TextExtractorLine.prototype.getCurrentNum = function () {
            u("getCurrentNum", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorLine.getCurrentNum"),
              d
                .sendWithPromise("TextExtractorLine.getCurrentNum", { line: this })
                .then(function (e) {
                  return (t.yieldFunction = void 0), m(e.line, t), e.result
                })
            )
          }),
          (d.TextExtractorLine.prototype.getStyle = function () {
            u("getStyle", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorLine.getStyle"),
              d.sendWithPromise("TextExtractorLine.getStyle", { line: this }).then(function (e) {
                return (
                  (t.yieldFunction = void 0),
                  (e.result = new d.TextExtractorStyle(e.result)),
                  m(e.line, t),
                  e.result
                )
              })
            )
          }),
          (d.TextExtractorLine.prototype.getParagraphID = function () {
            u("getParagraphID", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorLine.getParagraphID"),
              d
                .sendWithPromise("TextExtractorLine.getParagraphID", { line: this })
                .then(function (e) {
                  return (t.yieldFunction = void 0), m(e.line, t), e.result
                })
            )
          }),
          (d.TextExtractorLine.prototype.getFlowID = function () {
            u("getFlowID", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorLine.getFlowID"),
              d.sendWithPromise("TextExtractorLine.getFlowID", { line: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.line, t), e.result
              })
            )
          }),
          (d.TextExtractorLine.prototype.endsWithHyphen = function () {
            u("endsWithHyphen", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorLine.endsWithHyphen"),
              d
                .sendWithPromise("TextExtractorLine.endsWithHyphen", { line: this })
                .then(function (e) {
                  return (t.yieldFunction = void 0), m(e.line, t), e.result
                })
            )
          }),
          (d.TextExtractorLine.prototype.compare = function (e) {
            return (
              h(arguments.length, 1, "compare", "(PDFNet.TextExtractorLine)", [
                [e, "Structure", d.TextExtractorLine, "TextExtractorLine"],
              ]),
              u("compare", this.yieldFunction),
              l("compare", [[e, 0]]),
              d.sendWithPromise("TextExtractorLine.compare", { line: this, line2: e })
            )
          }),
          (d.TextExtractorLine.create = function () {
            return d.sendWithPromise("textExtractorLineCreate", {}).then(function (e) {
              return new d.TextExtractorLine(e)
            })
          }),
          (d.TextExtractorLine.prototype.isValid = function () {
            u("isValid", this.yieldFunction)
            var t = this
            return (
              (this.yieldFunction = "TextExtractorLine.isValid"),
              d.sendWithPromise("TextExtractorLine.isValid", { line: this }).then(function (e) {
                return (t.yieldFunction = void 0), m(e.line, t), e.result
              })
            )
          }),
          (d.TextExtractor.prototype.getNumLines = function () {
            return d.sendWithPromise("TextExtractor.getNumLines", { te: this.id })
          }),
          (d.TextExtractor.prototype.getFirstLine = function () {
            return d
              .sendWithPromise("TextExtractor.getFirstLine", { te: this.id })
              .then(function (e) {
                return new d.TextExtractorLine(e)
              })
          }),
          (d.TextExtractor.prototype.getQuads = function (e, t, n) {
            return (
              h(arguments.length, 3, "getQuads", "(PDFNet.Matrix2D, number, number)", [
                [e, "Structure", d.Matrix2D, "Matrix2D"],
                [t, "number"],
                [n, "number"],
              ]),
              l("getQuads", [[e, 0]]),
              d.sendWithPromise("TextExtractor.getQuads", {
                te: this.id,
                mtx: e,
                quads: t,
                quads_size: n,
              })
            )
          }),
          (d.TextSearch.create = function () {
            return d.sendWithPromise("textSearchCreate", {}).then(function (e) {
              return o(d.TextSearch, e)
            })
          }),
          (d.TextSearch.prototype.begin = function (e, t, n, i, r) {
            return (
              void 0 === i && (i = -1),
              void 0 === r && (r = -1),
              h(arguments.length, 3, "begin", "(PDFNet.PDFDoc, string, number, number, number)", [
                [e, "PDFDoc"],
                [t, "string"],
                [n, "number"],
                [i, "number"],
                [r, "number"],
              ]),
              d.sendWithPromise("TextSearch.begin", {
                ts: this.id,
                doc: e.id,
                pattern: t,
                mode: n,
                start_page: i,
                end_page: r,
              })
            )
          }),
          (d.TextSearch.prototype.setPattern = function (e) {
            return (
              h(arguments.length, 1, "setPattern", "(string)", [[e, "string"]]),
              d.sendWithPromise("TextSearch.setPattern", { ts: this.id, pattern: e })
            )
          }),
          (d.TextSearch.prototype.getMode = function () {
            return d.sendWithPromise("TextSearch.getMode", { ts: this.id })
          }),
          (d.TextSearch.prototype.setMode = function (e) {
            return (
              h(arguments.length, 1, "setMode", "(number)", [[e, "number"]]),
              d.sendWithPromise("TextSearch.setMode", { ts: this.id, mode: e })
            )
          }),
          (d.TextSearch.prototype.setRightToLeftLanguage = function (e) {
            return (
              h(arguments.length, 1, "setRightToLeftLanguage", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("TextSearch.setRightToLeftLanguage", { ts: this.id, flag: e })
            )
          }),
          (d.TextSearch.prototype.getCurrentPage = function () {
            return d.sendWithPromise("TextSearch.getCurrentPage", { ts: this.id })
          }),
          (d.TextSearch.prototype.setOCGContext = function (e) {
            return (
              h(arguments.length, 1, "setOCGContext", "(PDFNet.OCGContext)", [
                [e, "Object", d.OCGContext, "OCGContext"],
              ]),
              d.sendWithPromise("TextSearch.setOCGContext", { te: this.id, ctx: e.id })
            )
          }),
          (d.NameTree.create = function (e, t) {
            return (
              h(arguments.length, 2, "create", "(PDFNet.SDFDoc, string)", [
                [e, "SDFDoc"],
                [t, "string"],
              ]),
              d.sendWithPromise("nameTreeCreate", { doc: e.id, name: t }).then(function (e) {
                return p(d.NameTree, e)
              })
            )
          }),
          (d.NameTree.find = function (e, t) {
            return (
              h(arguments.length, 2, "find", "(PDFNet.SDFDoc, string)", [
                [e, "SDFDoc"],
                [t, "string"],
              ]),
              d.sendWithPromise("nameTreeFind", { doc: e.id, name: t }).then(function (e) {
                return p(d.NameTree, e)
              })
            )
          }),
          (d.NameTree.createFromObj = function (e) {
            return (
              h(arguments.length, 1, "createFromObj", "(PDFNet.Obj)", [
                [e, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("nameTreeCreateFromObj", { name_tree: e.id }).then(function (e) {
                return p(d.NameTree, e)
              })
            )
          }),
          (d.NameTree.prototype.copy = function () {
            return d.sendWithPromise("NameTree.copy", { d: this.id }).then(function (e) {
              return p(d.NameTree, e)
            })
          }),
          (d.NameTree.prototype.isValid = function () {
            return d.sendWithPromise("NameTree.isValid", { tree: this.id })
          }),
          (d.NameTree.prototype.getIterator = function (e) {
            return (
              h(arguments.length, 1, "getIterator", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("NameTree.getIterator", { tree: this.id, key: e })
                .then(function (e) {
                  return o(d.DictIterator, e)
                })
            )
          }),
          (d.NameTree.prototype.getValue = function (e) {
            return (
              h(arguments.length, 1, "getValue", "(string)", [[e, "string"]]),
              d.sendWithPromise("NameTree.getValue", { tree: this.id, key: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.NameTree.prototype.getIteratorBegin = function () {
            return d
              .sendWithPromise("NameTree.getIteratorBegin", { tree: this.id })
              .then(function (e) {
                return o(d.DictIterator, e)
              })
          }),
          (d.NameTree.prototype.put = function (e, t) {
            return (
              h(arguments.length, 2, "put", "(string, PDFNet.Obj)", [
                [e, "string"],
                [t, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("NameTree.put", { tree: this.id, key: e, value: t.id })
            )
          }),
          (d.NameTree.prototype.eraseKey = function (e) {
            return (
              h(arguments.length, 1, "eraseKey", "(string)", [[e, "string"]]),
              d.sendWithPromise("NameTree.eraseKey", { tree: this.id, key: e })
            )
          }),
          (d.NameTree.prototype.erase = function (e) {
            return (
              h(arguments.length, 1, "erase", "(PDFNet.DictIterator)", [
                [e, "Object", d.DictIterator, "DictIterator"],
              ]),
              d.sendWithPromise("NameTree.erase", { tree: this.id, pos: e.id })
            )
          }),
          (d.NameTree.prototype.getSDFObj = function () {
            return d.sendWithPromise("NameTree.getSDFObj", { tree: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.NumberTree.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("numberTreeCreate", { number_tree: e.id }).then(function (e) {
                return p(d.NumberTree, e)
              })
            )
          }),
          (d.NumberTree.prototype.copy = function () {
            return d.sendWithPromise("NumberTree.copy", { tree: this.id }).then(function (e) {
              return p(d.NumberTree, e)
            })
          }),
          (d.NumberTree.prototype.isValid = function () {
            return d.sendWithPromise("NumberTree.isValid", { tree: this.id })
          }),
          (d.NumberTree.prototype.getIterator = function (e) {
            return (
              h(arguments.length, 1, "getIterator", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("NumberTree.getIterator", { tree: this.id, key: e })
                .then(function (e) {
                  return o(d.DictIterator, e)
                })
            )
          }),
          (d.NumberTree.prototype.getValue = function (e) {
            return (
              h(arguments.length, 1, "getValue", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("NumberTree.getValue", { tree: this.id, key: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.NumberTree.prototype.getIteratorBegin = function () {
            return d
              .sendWithPromise("NumberTree.getIteratorBegin", { tree: this.id })
              .then(function (e) {
                return o(d.DictIterator, e)
              })
          }),
          (d.NumberTree.prototype.put = function (e, t) {
            return (
              h(arguments.length, 2, "put", "(number, PDFNet.Obj)", [
                [e, "number"],
                [t, "Object", d.Obj, "Obj"],
              ]),
              d.sendWithPromise("NumberTree.put", { tree: this.id, key: e, value: t.id })
            )
          }),
          (d.NumberTree.prototype.eraseKey = function (e) {
            return (
              h(arguments.length, 1, "eraseKey", "(number)", [[e, "number"]]),
              d.sendWithPromise("NumberTree.eraseKey", { tree: this.id, key: e })
            )
          }),
          (d.NumberTree.prototype.erase = function (e) {
            return (
              h(arguments.length, 1, "erase", "(PDFNet.DictIterator)", [
                [e, "Object", d.DictIterator, "DictIterator"],
              ]),
              d.sendWithPromise("NumberTree.erase", { tree: this.id, pos: e.id })
            )
          }),
          (d.NumberTree.prototype.getSDFObj = function () {
            return d.sendWithPromise("NumberTree.getSDFObj", { tree: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Obj.prototype.getType = function () {
            return d.sendWithPromise("Obj.getType", { o: this.id })
          }),
          (d.Obj.prototype.getDoc = function () {
            return d.sendWithPromise("Obj.getDoc", { o: this.id }).then(function (e) {
              return p(d.SDFDoc, e)
            })
          }),
          (d.Obj.prototype.write = function (e) {
            return (
              h(arguments.length, 1, "write", "(PDFNet.FilterWriter)", [
                [e, "Object", d.FilterWriter, "FilterWriter"],
              ]),
              d.sendWithPromise("Obj.write", { o: this.id, stream: e.id })
            )
          }),
          (d.Obj.prototype.isEqual = function (e) {
            return (
              h(arguments.length, 1, "isEqual", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("Obj.isEqual", { o: this.id, to: e.id })
            )
          }),
          (d.Obj.prototype.isBool = function () {
            return d.sendWithPromise("Obj.isBool", { o: this.id })
          }),
          (d.Obj.prototype.getBool = function () {
            return d.sendWithPromise("Obj.getBool", { o: this.id })
          }),
          (d.Obj.prototype.setBool = function (e) {
            return (
              h(arguments.length, 1, "setBool", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Obj.setBool", { o: this.id, b: e })
            )
          }),
          (d.Obj.prototype.isNumber = function () {
            return d.sendWithPromise("Obj.isNumber", { o: this.id })
          }),
          (d.Obj.prototype.getNumber = function () {
            return d.sendWithPromise("Obj.getNumber", { o: this.id })
          }),
          (d.Obj.prototype.setNumber = function (e) {
            return (
              h(arguments.length, 1, "setNumber", "(number)", [[e, "number"]]),
              d.sendWithPromise("Obj.setNumber", { o: this.id, n: e })
            )
          }),
          (d.Obj.prototype.isNull = function () {
            return d.sendWithPromise("Obj.isNull", { o: this.id })
          }),
          (d.Obj.prototype.isString = function () {
            return d.sendWithPromise("Obj.isString", { o: this.id })
          }),
          (d.Obj.prototype.getBuffer = function () {
            return d.sendWithPromise("Obj.getBuffer", { o: this.id })
          }),
          (d.Obj.prototype.setString = function (e) {
            return (
              h(arguments.length, 1, "setString", "(string)", [[e, "string"]]),
              d.sendWithPromise("Obj.setString", { o: this.id, value: e })
            )
          }),
          (d.Obj.prototype.setUString = function (e) {
            return (
              h(arguments.length, 1, "setUString", "(string)", [[e, "string"]]),
              d.sendWithPromise("Obj.setUString", { o: this.id, value: e })
            )
          }),
          (d.Obj.prototype.isName = function () {
            return d.sendWithPromise("Obj.isName", { o: this.id })
          }),
          (d.Obj.prototype.getName = function () {
            return d.sendWithPromise("Obj.getName", { o: this.id })
          }),
          (d.Obj.prototype.setName = function (e) {
            return (
              h(arguments.length, 1, "setName", "(string)", [[e, "string"]]),
              d.sendWithPromise("Obj.setName", { o: this.id, name: e })
            )
          }),
          (d.Obj.prototype.isIndirect = function () {
            return d.sendWithPromise("Obj.isIndirect", { o: this.id })
          }),
          (d.Obj.prototype.getObjNum = function () {
            return d.sendWithPromise("Obj.getObjNum", { o: this.id })
          }),
          (d.Obj.prototype.getGenNum = function () {
            return d.sendWithPromise("Obj.getGenNum", { o: this.id })
          }),
          (d.Obj.prototype.getOffset = function () {
            return d.sendWithPromise("Obj.getOffset", { o: this.id })
          }),
          (d.Obj.prototype.isFree = function () {
            return d.sendWithPromise("Obj.isFree", { o: this.id })
          }),
          (d.Obj.prototype.setMark = function (e) {
            return (
              h(arguments.length, 1, "setMark", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Obj.setMark", { o: this.id, mark: e })
            )
          }),
          (d.Obj.prototype.isMarked = function () {
            return d.sendWithPromise("Obj.isMarked", { o: this.id })
          }),
          (d.Obj.prototype.isLoaded = function () {
            return d.sendWithPromise("Obj.isLoaded", { o: this.id })
          }),
          (d.Obj.prototype.isContainer = function () {
            return d.sendWithPromise("Obj.isContainer", { o: this.id })
          }),
          (d.Obj.prototype.size = function () {
            return d.sendWithPromise("Obj.size", { o: this.id })
          }),
          (d.Obj.prototype.getDictIterator = function () {
            return d.sendWithPromise("Obj.getDictIterator", { o: this.id }).then(function (e) {
              return o(d.DictIterator, e)
            })
          }),
          (d.Obj.prototype.isDict = function () {
            return d.sendWithPromise("Obj.isDict", { o: this.id })
          }),
          (d.Obj.prototype.find = function (e) {
            return (
              h(arguments.length, 1, "find", "(string)", [[e, "string"]]),
              d.sendWithPromise("Obj.find", { o: this.id, key: e }).then(function (e) {
                return o(d.DictIterator, e)
              })
            )
          }),
          (d.Obj.prototype.findObj = function (e) {
            return (
              h(arguments.length, 1, "findObj", "(string)", [[e, "string"]]),
              d.sendWithPromise("Obj.findObj", { o: this.id, key: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.get = function (e) {
            return (
              h(arguments.length, 1, "get", "(string)", [[e, "string"]]),
              d.sendWithPromise("Obj.get", { o: this.id, key: e }).then(function (e) {
                return o(d.DictIterator, e)
              })
            )
          }),
          (d.Obj.prototype.putName = function (e, t) {
            return (
              h(arguments.length, 2, "putName", "(string, string)", [
                [e, "string"],
                [t, "string"],
              ]),
              d.sendWithPromise("Obj.putName", { o: this.id, key: e, name: t }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.putArray = function (e) {
            return (
              h(arguments.length, 1, "putArray", "(string)", [[e, "string"]]),
              d.sendWithPromise("Obj.putArray", { o: this.id, key: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.putBool = function (e, t) {
            return (
              h(arguments.length, 2, "putBool", "(string, boolean)", [
                [e, "string"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("Obj.putBool", { o: this.id, key: e, value: t }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.putDict = function (e) {
            return (
              h(arguments.length, 1, "putDict", "(string)", [[e, "string"]]),
              d.sendWithPromise("Obj.putDict", { o: this.id, key: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.putNumber = function (e, t) {
            return (
              h(arguments.length, 2, "putNumber", "(string, number)", [
                [e, "string"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("Obj.putNumber", { o: this.id, key: e, value: t })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Obj.prototype.putString = function (e, t) {
            return (
              h(arguments.length, 2, "putString", "(string, string)", [
                [e, "string"],
                [t, "string"],
              ]),
              d
                .sendWithPromise("Obj.putString", { o: this.id, key: e, value: t })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Obj.prototype.putText = function (e, t) {
            return (
              h(arguments.length, 2, "putText", "(string, string)", [
                [e, "string"],
                [t, "string"],
              ]),
              d.sendWithPromise("Obj.putText", { o: this.id, key: e, t: t }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.putNull = function (e) {
            return (
              h(arguments.length, 1, "putNull", "(string)", [[e, "string"]]),
              d.sendWithPromise("Obj.putNull", { o: this.id, key: e })
            )
          }),
          (d.Obj.prototype.put = function (e, t) {
            return (
              h(arguments.length, 2, "put", "(string, PDFNet.Obj)", [
                [e, "string"],
                [t, "Object", d.Obj, "Obj"],
              ]),
              d
                .sendWithPromise("Obj.put", { o: this.id, key: e, input_obj: t.id })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Obj.prototype.putRect = function (e, t, n, i, r) {
            return (
              h(arguments.length, 5, "putRect", "(string, number, number, number, number)", [
                [e, "string"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
                [r, "number"],
              ]),
              d
                .sendWithPromise("Obj.putRect", { o: this.id, key: e, x1: t, y1: n, x2: i, y2: r })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Obj.prototype.putMatrix = function (e, t) {
            return (
              h(arguments.length, 2, "putMatrix", "(string, PDFNet.Matrix2D)", [
                [e, "string"],
                [t, "Structure", d.Matrix2D, "Matrix2D"],
              ]),
              l("putMatrix", [[t, 1]]),
              d.sendWithPromise("Obj.putMatrix", { o: this.id, key: e, mtx: t }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.eraseFromKey = function (e) {
            return (
              h(arguments.length, 1, "eraseFromKey", "(string)", [[e, "string"]]),
              d.sendWithPromise("Obj.eraseFromKey", { o: this.id, key: e })
            )
          }),
          (d.Obj.prototype.erase = function (e) {
            return (
              h(arguments.length, 1, "erase", "(PDFNet.DictIterator)", [
                [e, "Object", d.DictIterator, "DictIterator"],
              ]),
              d.sendWithPromise("Obj.erase", { o: this.id, pos: e.id })
            )
          }),
          (d.Obj.prototype.rename = function (e, t) {
            return (
              h(arguments.length, 2, "rename", "(string, string)", [
                [e, "string"],
                [t, "string"],
              ]),
              d.sendWithPromise("Obj.rename", { o: this.id, old_key: e, new_key: t })
            )
          }),
          (d.Obj.prototype.isArray = function () {
            return d.sendWithPromise("Obj.isArray", { o: this.id })
          }),
          (d.Obj.prototype.getAt = function (e) {
            return (
              h(arguments.length, 1, "getAt", "(number)", [[e, "number"]]),
              d.sendWithPromise("Obj.getAt", { o: this.id, index: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.insertName = function (e, t) {
            return (
              h(arguments.length, 2, "insertName", "(number, string)", [
                [e, "number"],
                [t, "string"],
              ]),
              d
                .sendWithPromise("Obj.insertName", { o: this.id, pos: e, name: t })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Obj.prototype.insertArray = function (e) {
            return (
              h(arguments.length, 1, "insertArray", "(number)", [[e, "number"]]),
              d.sendWithPromise("Obj.insertArray", { o: this.id, pos: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.insertBool = function (e, t) {
            return (
              h(arguments.length, 2, "insertBool", "(number, boolean)", [
                [e, "number"],
                [t, "boolean"],
              ]),
              d
                .sendWithPromise("Obj.insertBool", { o: this.id, pos: e, value: t })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Obj.prototype.insertDict = function (e) {
            return (
              h(arguments.length, 1, "insertDict", "(number)", [[e, "number"]]),
              d.sendWithPromise("Obj.insertDict", { o: this.id, pos: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.insertNumber = function (e, t) {
            return (
              h(arguments.length, 2, "insertNumber", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d
                .sendWithPromise("Obj.insertNumber", { o: this.id, pos: e, value: t })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Obj.prototype.insertString = function (e, t) {
            return (
              h(arguments.length, 2, "insertString", "(number, string)", [
                [e, "number"],
                [t, "string"],
              ]),
              d
                .sendWithPromise("Obj.insertString", { o: this.id, pos: e, value: t })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Obj.prototype.insertText = function (e, t) {
            return (
              h(arguments.length, 2, "insertText", "(number, string)", [
                [e, "number"],
                [t, "string"],
              ]),
              d.sendWithPromise("Obj.insertText", { o: this.id, pos: e, t: t }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.insertNull = function (e) {
            return (
              h(arguments.length, 1, "insertNull", "(number)", [[e, "number"]]),
              d.sendWithPromise("Obj.insertNull", { o: this.id, pos: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.insert = function (e, t) {
            return (
              h(arguments.length, 2, "insert", "(number, PDFNet.Obj)", [
                [e, "number"],
                [t, "Object", d.Obj, "Obj"],
              ]),
              d
                .sendWithPromise("Obj.insert", { o: this.id, pos: e, input_obj: t.id })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Obj.prototype.insertRect = function (e, t, n, i, r) {
            return (
              h(arguments.length, 5, "insertRect", "(number, number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
                [r, "number"],
              ]),
              d
                .sendWithPromise("Obj.insertRect", {
                  o: this.id,
                  pos: e,
                  x1: t,
                  y1: n,
                  x2: i,
                  y2: r,
                })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Obj.prototype.insertMatrix = function (e, t) {
            return (
              h(arguments.length, 2, "insertMatrix", "(number, PDFNet.Matrix2D)", [
                [e, "number"],
                [t, "Structure", d.Matrix2D, "Matrix2D"],
              ]),
              l("insertMatrix", [[t, 1]]),
              d
                .sendWithPromise("Obj.insertMatrix", { o: this.id, pos: e, mtx: t })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Obj.prototype.pushBackName = function (e) {
            return (
              h(arguments.length, 1, "pushBackName", "(string)", [[e, "string"]]),
              d.sendWithPromise("Obj.pushBackName", { o: this.id, name: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.pushBackArray = function () {
            return d.sendWithPromise("Obj.pushBackArray", { o: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Obj.prototype.pushBackBool = function (e) {
            return (
              h(arguments.length, 1, "pushBackBool", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Obj.pushBackBool", { o: this.id, value: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.pushBackDict = function () {
            return d.sendWithPromise("Obj.pushBackDict", { o: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Obj.prototype.pushBackNumber = function (e) {
            return (
              h(arguments.length, 1, "pushBackNumber", "(number)", [[e, "number"]]),
              d.sendWithPromise("Obj.pushBackNumber", { o: this.id, value: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.pushBackString = function (e) {
            return (
              h(arguments.length, 1, "pushBackString", "(string)", [[e, "string"]]),
              d.sendWithPromise("Obj.pushBackString", { o: this.id, value: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.pushBackText = function (e) {
            return (
              h(arguments.length, 1, "pushBackText", "(string)", [[e, "string"]]),
              d.sendWithPromise("Obj.pushBackText", { o: this.id, t: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.pushBackNull = function () {
            return d.sendWithPromise("Obj.pushBackNull", { o: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.Obj.prototype.pushBack = function (e) {
            return (
              h(arguments.length, 1, "pushBack", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("Obj.pushBack", { o: this.id, input_obj: e.id }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.pushBackRect = function (e, t, n, i) {
            return (
              h(arguments.length, 4, "pushBackRect", "(number, number, number, number)", [
                [e, "number"],
                [t, "number"],
                [n, "number"],
                [i, "number"],
              ]),
              d
                .sendWithPromise("Obj.pushBackRect", { o: this.id, x1: e, y1: t, x2: n, y2: i })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.Obj.prototype.pushBackMatrix = function (e) {
            return (
              h(arguments.length, 1, "pushBackMatrix", "(PDFNet.Matrix2D)", [
                [e, "Structure", d.Matrix2D, "Matrix2D"],
              ]),
              l("pushBackMatrix", [[e, 0]]),
              d.sendWithPromise("Obj.pushBackMatrix", { o: this.id, mtx: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.Obj.prototype.eraseAt = function (e) {
            return (
              h(arguments.length, 1, "eraseAt", "(number)", [[e, "number"]]),
              d.sendWithPromise("Obj.eraseAt", { o: this.id, pos: e })
            )
          }),
          (d.Obj.prototype.isStream = function () {
            return d.sendWithPromise("Obj.isStream", { o: this.id })
          }),
          (d.Obj.prototype.getRawStreamLength = function () {
            return d.sendWithPromise("Obj.getRawStreamLength", { o: this.id })
          }),
          (d.Obj.prototype.setStreamData = function (e) {
            h(arguments.length, 1, "setStreamData", "(ArrayBuffer|TypedArray)", [
              [e, "ArrayBuffer"],
            ])
            var t = a(e, !1)
            return d.sendWithPromise("Obj.setStreamData", { obj: this.id, data_buf: t })
          }),
          (d.Obj.prototype.setStreamDataWithFilter = function (e, t) {
            h(
              arguments.length,
              2,
              "setStreamDataWithFilter",
              "(ArrayBuffer|TypedArray, PDFNet.Filter)",
              [
                [e, "ArrayBuffer"],
                [t, "Object", d.Filter, "Filter"],
              ]
            )
            var n = a(e, !1)
            return (
              0 != t.id && O(t.id),
              d.sendWithPromise("Obj.setStreamDataWithFilter", {
                obj: this.id,
                data_buf: n,
                no_own_filter_chain: t.id,
              })
            )
          }),
          (d.Obj.prototype.getRawStream = function (e) {
            return (
              h(arguments.length, 1, "getRawStream", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("Obj.getRawStream", { o: this.id, decrypt: e }).then(function (e) {
                return p(d.Filter, e)
              })
            )
          }),
          (d.Obj.prototype.getDecodedStream = function () {
            return d.sendWithPromise("Obj.getDecodedStream", { o: this.id }).then(function (e) {
              return p(d.Filter, e)
            })
          }),
          (d.ObjSet.create = function () {
            return d.sendWithPromise("objSetCreate", {}).then(function (e) {
              return o(d.ObjSet, e)
            })
          }),
          (d.ObjSet.prototype.createName = function (e) {
            return (
              h(arguments.length, 1, "createName", "(string)", [[e, "string"]]),
              d.sendWithPromise("ObjSet.createName", { set: this.id, name: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.ObjSet.prototype.createArray = function () {
            return d.sendWithPromise("ObjSet.createArray", { set: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.ObjSet.prototype.createBool = function (e) {
            return (
              h(arguments.length, 1, "createBool", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("ObjSet.createBool", { set: this.id, value: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.ObjSet.prototype.createDict = function () {
            return d.sendWithPromise("ObjSet.createDict", { set: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.ObjSet.prototype.createNull = function () {
            return d.sendWithPromise("ObjSet.createNull", { set: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.ObjSet.prototype.createNumber = function (e) {
            return (
              h(arguments.length, 1, "createNumber", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("ObjSet.createNumber", { set: this.id, value: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.ObjSet.prototype.createString = function (e) {
            return (
              h(arguments.length, 1, "createString", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("ObjSet.createString", { set: this.id, value: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.ObjSet.prototype.createFromJson = function (e) {
            return (
              h(arguments.length, 1, "createFromJson", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("ObjSet.createFromJson", { set: this.id, json: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.SDFDoc.prototype.createShallowCopy = function () {
            return d
              .sendWithPromise("SDFDoc.createShallowCopy", { source: this.id })
              .then(function (e) {
                return p(d.SDFDoc, e)
              })
          }),
          (d.SDFDoc.prototype.releaseFileHandles = function () {
            return d.sendWithPromise("SDFDoc.releaseFileHandles", { doc: this.id })
          }),
          (d.SDFDoc.prototype.isEncrypted = function () {
            return d.sendWithPromise("SDFDoc.isEncrypted", { doc: this.id })
          }),
          (d.SDFDoc.prototype.initStdSecurityHandlerUString = function (e) {
            return (
              h(arguments.length, 1, "initStdSecurityHandlerUString", "(string)", [[e, "string"]]),
              d.sendWithPromise("SDFDoc.initStdSecurityHandlerUString", {
                doc: this.id,
                password: e,
              })
            )
          }),
          (d.SDFDoc.prototype.isModified = function () {
            return d.sendWithPromise("SDFDoc.isModified", { doc: this.id })
          }),
          (d.SDFDoc.prototype.hasRepairedXRef = function () {
            return d.sendWithPromise("SDFDoc.hasRepairedXRef", { doc: this.id })
          }),
          (d.SDFDoc.prototype.isFullSaveRequired = function () {
            return d.sendWithPromise("SDFDoc.isFullSaveRequired", { doc: this.id })
          }),
          (d.SDFDoc.prototype.getTrailer = function () {
            return d.sendWithPromise("SDFDoc.getTrailer", { doc: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.SDFDoc.prototype.getObj = function (e) {
            return (
              h(arguments.length, 1, "getObj", "(number)", [[e, "number"]]),
              d.sendWithPromise("SDFDoc.getObj", { doc: this.id, obj_num: e }).then(function (e) {
                return p(d.Obj, e)
              })
            )
          }),
          (d.SDFDoc.prototype.importObj = function (e, t) {
            return (
              h(arguments.length, 2, "importObj", "(PDFNet.Obj, boolean)", [
                [e, "Object", d.Obj, "Obj"],
                [t, "boolean"],
              ]),
              d
                .sendWithPromise("SDFDoc.importObj", { doc: this.id, obj: e.id, deep_copy: t })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.SDFDoc.prototype.importObjsWithExcludeList = function (e, t) {
            return (
              h(
                arguments.length,
                2,
                "importObjsWithExcludeList",
                "(Array<Core.PDFNet.Obj>, Array<Core.PDFNet.Obj>)",
                [
                  [e, "Array"],
                  [t, "Array"],
                ]
              ),
              (e = Array.from(e, function (e) {
                return e.id
              })),
              (t = Array.from(t, function (e) {
                return e.id
              })),
              d
                .sendWithPromise("SDFDoc.importObjsWithExcludeList", {
                  doc: this.id,
                  obj_list: e,
                  exclude_list: t,
                })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.SDFDoc.prototype.xRefSize = function () {
            return d.sendWithPromise("SDFDoc.xRefSize", { doc: this.id })
          }),
          (d.SDFDoc.prototype.clearMarks = function () {
            return d.sendWithPromise("SDFDoc.clearMarks", { doc: this.id })
          }),
          (d.SDFDoc.prototype.saveMemory = function (e, t) {
            return (
              h(arguments.length, 2, "saveMemory", "(number, string)", [
                [e, "number"],
                [t, "string"],
              ]),
              d
                .sendWithPromise("SDFDoc.saveMemory", { doc: this.id, flags: e, header: t })
                .then(function (e) {
                  return new Uint8Array(e)
                })
            )
          }),
          (d.SDFDoc.prototype.saveStream = function (e, t, n) {
            return (
              h(arguments.length, 3, "saveStream", "(PDFNet.Filter, number, string)", [
                [e, "Object", d.Filter, "Filter"],
                [t, "number"],
                [n, "string"],
              ]),
              d.sendWithPromise("SDFDoc.saveStream", {
                doc: this.id,
                stream: e.id,
                flags: t,
                header: n,
              })
            )
          }),
          (d.SDFDoc.prototype.getHeader = function () {
            return d.sendWithPromise("SDFDoc.getHeader", { doc: this.id })
          }),
          (d.SDFDoc.prototype.getSecurityHandler = function () {
            return d
              .sendWithPromise("SDFDoc.getSecurityHandler", { doc: this.id })
              .then(function (e) {
                return p(d.SecurityHandler, e)
              })
          }),
          (d.SDFDoc.prototype.setSecurityHandler = function (e) {
            return (
              h(arguments.length, 1, "setSecurityHandler", "(PDFNet.SecurityHandler)", [
                [e, "Object", d.SecurityHandler, "SecurityHandler"],
              ]),
              0 != e.id && O(e.id),
              d.sendWithPromise("SDFDoc.setSecurityHandler", { doc: this.id, no_own_handler: e.id })
            )
          }),
          (d.SDFDoc.prototype.removeSecurity = function () {
            return d.sendWithPromise("SDFDoc.removeSecurity", { doc: this.id })
          }),
          (d.SDFDoc.prototype.swap = function (e, t) {
            return (
              h(arguments.length, 2, "swap", "(number, number)", [
                [e, "number"],
                [t, "number"],
              ]),
              d.sendWithPromise("SDFDoc.swap", { doc: this.id, obj_num1: e, obj_num2: t })
            )
          }),
          (d.SDFDoc.prototype.isLinearized = function () {
            return d.sendWithPromise("SDFDoc.isLinearized", { doc: this.id })
          }),
          (d.SDFDoc.prototype.getLinearizationDict = function () {
            return d
              .sendWithPromise("SDFDoc.getLinearizationDict", { doc: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.SDFDoc.prototype.getHintStream = function () {
            return d.sendWithPromise("SDFDoc.getHintStream", { doc: this.id }).then(function (e) {
              return p(d.Obj, e)
            })
          }),
          (d.SDFDoc.prototype.enableDiskCaching = function (e) {
            return (
              h(arguments.length, 1, "enableDiskCaching", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("SDFDoc.enableDiskCaching", { doc: this.id, use_cache_flag: e })
            )
          }),
          (d.SDFDoc.prototype.lock = function () {
            var e = this
            return d.sendWithPromise("SDFDoc.lock", { doc: this.id }).then(function () {
              s.push({ name: "SDFDoc", id: e.id, unlocktype: "unlock" })
            })
          }),
          (d.SDFDoc.prototype.unlock = function () {
            var e = this
            return d.sendWithPromise("SDFDoc.unlock", { doc: this.id }).then(function () {
              _(e)
            })
          }),
          (d.SDFDoc.prototype.lockRead = function () {
            var e = this
            return d.sendWithPromise("SDFDoc.lockRead", { doc: this.id }).then(function () {
              s.push({ name: "SDFDoc", id: e.id, unlocktype: "unlockRead" })
            })
          }),
          (d.SDFDoc.prototype.unlockRead = function () {
            var e = this
            return d.sendWithPromise("SDFDoc.unlockRead", { doc: this.id }).then(function () {
              _(e)
            })
          }),
          (d.SDFDoc.prototype.tryLock = function () {
            var t = this
            return d.sendWithPromise("SDFDoc.tryLock", { doc: this.id }).then(function (e) {
              e && s.push({ name: "SDFDoc", id: t.id, unlocktype: "unlock" })
            })
          }),
          (d.SDFDoc.prototype.tryLockRead = function () {
            var t = this
            return d.sendWithPromise("SDFDoc.tryLockRead", { doc: this.id }).then(function (e) {
              e && s.push({ name: "SDFDoc", id: t.id, unlocktype: "unlockRead" })
            })
          }),
          (d.SDFDoc.prototype.getFileName = function () {
            return d.sendWithPromise("SDFDoc.getFileName", { doc: this.id })
          }),
          (d.SDFDoc.prototype.createIndirectName = function (e) {
            return (
              h(arguments.length, 1, "createIndirectName", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("SDFDoc.createIndirectName", { doc: this.id, name: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.SDFDoc.prototype.createIndirectArray = function () {
            return d
              .sendWithPromise("SDFDoc.createIndirectArray", { doc: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.SDFDoc.prototype.createIndirectBool = function (e) {
            return (
              h(arguments.length, 1, "createIndirectBool", "(boolean)", [[e, "boolean"]]),
              d
                .sendWithPromise("SDFDoc.createIndirectBool", { doc: this.id, value: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.SDFDoc.prototype.createIndirectDict = function () {
            return d
              .sendWithPromise("SDFDoc.createIndirectDict", { doc: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.SDFDoc.prototype.createIndirectNull = function () {
            return d
              .sendWithPromise("SDFDoc.createIndirectNull", { doc: this.id })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.SDFDoc.prototype.createIndirectNumber = function (e) {
            return (
              h(arguments.length, 1, "createIndirectNumber", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("SDFDoc.createIndirectNumber", { doc: this.id, value: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.SDFDoc.prototype.createIndirectString = function (e) {
            h(arguments.length, 1, "createIndirectString", "(ArrayBuffer|TypedArray)", [
              [e, "ArrayBuffer"],
            ])
            var t = a(e, !1)
            return d
              .sendWithPromise("SDFDoc.createIndirectString", { doc: this.id, buf_value: t })
              .then(function (e) {
                return p(d.Obj, e)
              })
          }),
          (d.SDFDoc.prototype.createIndirectStringFromUString = function (e) {
            return (
              h(arguments.length, 1, "createIndirectStringFromUString", "(string)", [
                [e, "string"],
              ]),
              d
                .sendWithPromise("SDFDoc.createIndirectStringFromUString", { doc: this.id, str: e })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.SDFDoc.prototype.createIndirectStreamFromFilter = function (e, t) {
            return (
              void 0 === t && (t = new d.Filter("0")),
              h(
                arguments.length,
                1,
                "createIndirectStreamFromFilter",
                "(PDFNet.FilterReader, PDFNet.Filter)",
                [
                  [e, "Object", d.FilterReader, "FilterReader"],
                  [t, "Object", d.Filter, "Filter"],
                ]
              ),
              0 != t.id && O(t.id),
              d
                .sendWithPromise("SDFDoc.createIndirectStreamFromFilter", {
                  doc: this.id,
                  data: e.id,
                  no_own_filter_chain: t.id,
                })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.SDFDoc.prototype.createIndirectStream = function (e, t) {
            h(
              arguments.length,
              2,
              "createIndirectStream",
              "(ArrayBuffer|TypedArray, PDFNet.Filter)",
              [
                [e, "ArrayBuffer"],
                [t, "Object", d.Filter, "Filter"],
              ]
            )
            var n = a(e, !1)
            return (
              0 != t.id && O(t.id),
              d
                .sendWithPromise("SDFDoc.createIndirectStream", {
                  doc: this.id,
                  data_buf: n,
                  no_own_filter_chain: t.id,
                })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.SecurityHandler.prototype.clone = function () {
            return d.sendWithPromise("SecurityHandler.clone", { sh: this.id }).then(function (e) {
              return o(d.SecurityHandler, e)
            })
          }),
          (d.SecurityHandler.prototype.getPermission = function (e) {
            return (
              h(arguments.length, 1, "getPermission", "(number)", [[e, "number"]]),
              d.sendWithPromise("SecurityHandler.getPermission", { sh: this.id, p: e })
            )
          }),
          (d.SecurityHandler.prototype.getKeyLength = function () {
            return d.sendWithPromise("SecurityHandler.getKeyLength", { sh: this.id })
          }),
          (d.SecurityHandler.prototype.getEncryptionAlgorithmID = function () {
            return d.sendWithPromise("SecurityHandler.getEncryptionAlgorithmID", { sh: this.id })
          }),
          (d.SecurityHandler.prototype.getHandlerDocName = function () {
            return d.sendWithPromise("SecurityHandler.getHandlerDocName", { sh: this.id })
          }),
          (d.SecurityHandler.prototype.isModified = function () {
            return d.sendWithPromise("SecurityHandler.isModified", { sh: this.id })
          }),
          (d.SecurityHandler.prototype.setModified = function (e) {
            return (
              void 0 === e && (e = !0),
              h(arguments.length, 0, "setModified", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("SecurityHandler.setModified", { sh: this.id, is_modified: e })
            )
          }),
          (d.SecurityHandler.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(number)", [[e, "number"]]),
              d.sendWithPromise("securityHandlerCreate", { crypt_type: e }).then(function (e) {
                return o(d.SecurityHandler, e)
              })
            )
          }),
          (d.SecurityHandler.createFromEncCode = function (e, t, n) {
            return (
              h(arguments.length, 3, "createFromEncCode", "(string, number, number)", [
                [e, "string"],
                [t, "number"],
                [n, "number"],
              ]),
              d
                .sendWithPromise("securityHandlerCreateFromEncCode", {
                  name: e,
                  key_len: t,
                  enc_code: n,
                })
                .then(function (e) {
                  return o(d.SecurityHandler, e)
                })
            )
          }),
          (d.SecurityHandler.createDefault = function () {
            return d.sendWithPromise("securityHandlerCreateDefault", {}).then(function (e) {
              return o(d.SecurityHandler, e)
            })
          }),
          (d.SecurityHandler.prototype.setPermission = function (e, t) {
            return (
              h(arguments.length, 2, "setPermission", "(number, boolean)", [
                [e, "number"],
                [t, "boolean"],
              ]),
              d.sendWithPromise("SecurityHandler.setPermission", { sh: this.id, perm: e, value: t })
            )
          }),
          (d.SecurityHandler.prototype.changeRevisionNumber = function (e) {
            return (
              h(arguments.length, 1, "changeRevisionNumber", "(number)", [[e, "number"]]),
              d.sendWithPromise("SecurityHandler.changeRevisionNumber", { sh: this.id, rev_num: e })
            )
          }),
          (d.SecurityHandler.prototype.setEncryptMetadata = function (e) {
            return (
              h(arguments.length, 1, "setEncryptMetadata", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("SecurityHandler.setEncryptMetadata", {
                sh: this.id,
                encrypt_metadata: e,
              })
            )
          }),
          (d.SecurityHandler.prototype.getRevisionNumber = function () {
            return d.sendWithPromise("SecurityHandler.getRevisionNumber", { sh: this.id })
          }),
          (d.SecurityHandler.prototype.isUserPasswordRequired = function () {
            return d.sendWithPromise("SecurityHandler.isUserPasswordRequired", { sh: this.id })
          }),
          (d.SecurityHandler.prototype.isMasterPasswordRequired = function () {
            return d.sendWithPromise("SecurityHandler.isMasterPasswordRequired", { sh: this.id })
          }),
          (d.SecurityHandler.prototype.isAES = function () {
            return d.sendWithPromise("SecurityHandler.isAES", { sh: this.id })
          }),
          (d.SecurityHandler.prototype.isAESObj = function (e) {
            return (
              h(arguments.length, 1, "isAESObj", "(PDFNet.Obj)", [[e, "Object", d.Obj, "Obj"]]),
              d.sendWithPromise("SecurityHandler.isAESObj", { sh: this.id, stream: e.id })
            )
          }),
          (d.SecurityHandler.prototype.isRC4 = function () {
            return d.sendWithPromise("SecurityHandler.isRC4", { sh: this.id })
          }),
          (d.SecurityHandler.prototype.changeUserPasswordUString = function (e) {
            return (
              h(arguments.length, 1, "changeUserPasswordUString", "(string)", [[e, "string"]]),
              d.sendWithPromise("SecurityHandler.changeUserPasswordUString", {
                sh: this.id,
                password: e,
              })
            )
          }),
          (d.SecurityHandler.prototype.changeUserPasswordBuffer = function (e) {
            h(arguments.length, 1, "changeUserPasswordBuffer", "(ArrayBuffer|TypedArray)", [
              [e, "ArrayBuffer"],
            ])
            var t = a(e, !1)
            return d.sendWithPromise("SecurityHandler.changeUserPasswordBuffer", {
              sh: this.id,
              password_buf: t,
            })
          }),
          (d.SecurityHandler.prototype.changeMasterPasswordUString = function (e) {
            return (
              h(arguments.length, 1, "changeMasterPasswordUString", "(string)", [[e, "string"]]),
              d.sendWithPromise("SecurityHandler.changeMasterPasswordUString", {
                sh: this.id,
                password: e,
              })
            )
          }),
          (d.SecurityHandler.prototype.changeMasterPasswordBuffer = function (e) {
            h(arguments.length, 1, "changeMasterPasswordBuffer", "(ArrayBuffer|TypedArray)", [
              [e, "ArrayBuffer"],
            ])
            var t = a(e, !1)
            return d.sendWithPromise("SecurityHandler.changeMasterPasswordBuffer", {
              sh: this.id,
              password_buf: t,
            })
          }),
          (d.SecurityHandler.prototype.initPasswordUString = function (e) {
            return (
              h(arguments.length, 1, "initPasswordUString", "(string)", [[e, "string"]]),
              d.sendWithPromise("SecurityHandler.initPasswordUString", { sh: this.id, password: e })
            )
          }),
          (d.SecurityHandler.prototype.initPasswordBuffer = function (e) {
            h(arguments.length, 1, "initPasswordBuffer", "(ArrayBuffer|TypedArray)", [
              [e, "ArrayBuffer"],
            ])
            var t = a(e, !1)
            return d.sendWithPromise("SecurityHandler.initPasswordBuffer", {
              sh: this.id,
              password_buf: t,
            })
          }),
          (d.SecurityHandler.prototype.authorize = function (e) {
            return (
              h(arguments.length, 1, "authorize", "(number)", [[e, "number"]]),
              d.sendWithPromise("SecurityHandler.authorize", { sh: this.id, p: e })
            )
          }),
          (d.SecurityHandler.prototype.authorizeFailed = function () {
            return d.sendWithPromise("SecurityHandler.authorizeFailed", { sh: this.id })
          }),
          (d.SecurityHandler.prototype.getAuthorizationData = function (e) {
            return (
              h(arguments.length, 1, "getAuthorizationData", "(number)", [[e, "number"]]),
              d.sendWithPromise("SecurityHandler.getAuthorizationData", { sh: this.id, req_opr: e })
            )
          }),
          (d.SecurityHandler.prototype.editSecurityData = function (e) {
            return (
              h(arguments.length, 1, "editSecurityData", "(PDFNet.SDFDoc)", [[e, "SDFDoc"]]),
              d.sendWithPromise("SecurityHandler.editSecurityData", { sh: this.id, doc: e.id })
            )
          }),
          (d.SecurityHandler.prototype.fillEncryptDict = function (e) {
            return (
              h(arguments.length, 1, "fillEncryptDict", "(PDFNet.SDFDoc)", [[e, "SDFDoc"]]),
              d
                .sendWithPromise("SecurityHandler.fillEncryptDict", { sh: this.id, doc: e.id })
                .then(function (e) {
                  return p(d.Obj, e)
                })
            )
          }),
          (d.SignatureHandler.prototype.getName = function () {
            return d.sendWithPromise("SignatureHandler.getName", { signature_handler: this.id })
          }),
          (d.SignatureHandler.prototype.reset = function () {
            return d.sendWithPromise("SignatureHandler.reset", { signature_handler: this.id })
          }),
          (d.SignatureHandler.prototype.destructor = function () {
            return d.sendWithPromise("SignatureHandler.destructor", { signature_handler: this.id })
          }),
          (d.UndoManager.prototype.discardAllSnapshots = function () {
            return d
              .sendWithPromise("UndoManager.discardAllSnapshots", { self: this.id })
              .then(function (e) {
                return o(d.DocSnapshot, e)
              })
          }),
          (d.UndoManager.prototype.undo = function () {
            return d.sendWithPromise("UndoManager.undo", { self: this.id }).then(function (e) {
              return o(d.ResultSnapshot, e)
            })
          }),
          (d.UndoManager.prototype.canUndo = function () {
            return d.sendWithPromise("UndoManager.canUndo", { self: this.id })
          }),
          (d.UndoManager.prototype.getNextUndoSnapshot = function () {
            return d
              .sendWithPromise("UndoManager.getNextUndoSnapshot", { self: this.id })
              .then(function (e) {
                return o(d.DocSnapshot, e)
              })
          }),
          (d.UndoManager.prototype.redo = function () {
            return d.sendWithPromise("UndoManager.redo", { self: this.id }).then(function (e) {
              return o(d.ResultSnapshot, e)
            })
          }),
          (d.UndoManager.prototype.canRedo = function () {
            return d.sendWithPromise("UndoManager.canRedo", { self: this.id })
          }),
          (d.UndoManager.prototype.getNextRedoSnapshot = function () {
            return d
              .sendWithPromise("UndoManager.getNextRedoSnapshot", { self: this.id })
              .then(function (e) {
                return o(d.DocSnapshot, e)
              })
          }),
          (d.UndoManager.prototype.takeSnapshot = function () {
            return d
              .sendWithPromise("UndoManager.takeSnapshot", { self: this.id })
              .then(function (e) {
                return o(d.ResultSnapshot, e)
              })
          }),
          (d.ResultSnapshot.prototype.currentState = function () {
            return d
              .sendWithPromise("ResultSnapshot.currentState", { self: this.id })
              .then(function (e) {
                return o(d.DocSnapshot, e)
              })
          }),
          (d.ResultSnapshot.prototype.previousState = function () {
            return d
              .sendWithPromise("ResultSnapshot.previousState", { self: this.id })
              .then(function (e) {
                return o(d.DocSnapshot, e)
              })
          }),
          (d.ResultSnapshot.prototype.isOk = function () {
            return d.sendWithPromise("ResultSnapshot.isOk", { self: this.id })
          }),
          (d.ResultSnapshot.prototype.isNullTransition = function () {
            return d.sendWithPromise("ResultSnapshot.isNullTransition", { self: this.id })
          }),
          (d.DocSnapshot.prototype.getHash = function () {
            return d.sendWithPromise("DocSnapshot.getHash", { self: this.id })
          }),
          (d.DocSnapshot.prototype.isValid = function () {
            return d.sendWithPromise("DocSnapshot.isValid", { self: this.id })
          }),
          (d.DocSnapshot.prototype.equals = function (e) {
            return (
              h(arguments.length, 1, "equals", "(PDFNet.DocSnapshot)", [
                [e, "Object", d.DocSnapshot, "DocSnapshot"],
              ]),
              d.sendWithPromise("DocSnapshot.equals", { self: this.id, snapshot: e.id })
            )
          }),
          (d.OCRModule.applyOCRJsonToPDF = function (e, t) {
            return (
              h(arguments.length, 2, "applyOCRJsonToPDF", "(PDFNet.PDFDoc, string)", [
                [e, "PDFDoc"],
                [t, "string"],
              ]),
              d.sendWithPromise("ocrModuleApplyOCRJsonToPDF", { dst: e.id, json: t })
            )
          }),
          (d.OCRModule.applyOCRXmlToPDF = function (e, t) {
            return (
              h(arguments.length, 2, "applyOCRXmlToPDF", "(PDFNet.PDFDoc, string)", [
                [e, "PDFDoc"],
                [t, "string"],
              ]),
              d.sendWithPromise("ocrModuleApplyOCRXmlToPDF", { dst: e.id, xml: t })
            )
          }),
          (d.VerificationOptions.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(number)", [[e, "number"]]),
              d.sendWithPromise("verificationOptionsCreate", { in_level: e }).then(function (e) {
                return o(d.VerificationOptions, e)
              })
            )
          }),
          (d.VerificationOptions.prototype.addTrustedCertificate = function (e, t) {
            void 0 === t && (t = d.VerificationOptions.CertificateTrustFlag.e_default_trust),
              h(arguments.length, 1, "addTrustedCertificate", "(ArrayBuffer|TypedArray, number)", [
                [e, "ArrayBuffer"],
                [t, "number"],
              ])
            var n = a(e, !1)
            return d.sendWithPromise("VerificationOptions.addTrustedCertificate", {
              self: this.id,
              in_certificate_buf: n,
              in_trust_flags: t,
            })
          }),
          (d.VerificationOptions.prototype.addTrustedCertificates = function (e) {
            h(arguments.length, 1, "addTrustedCertificates", "(ArrayBuffer|TypedArray)", [
              [e, "ArrayBuffer"],
            ])
            var t = a(e, !1)
            return d.sendWithPromise("VerificationOptions.addTrustedCertificates", {
              self: this.id,
              in_P7C_binary_DER_certificates_file_data_buf: t,
            })
          }),
          (d.VerificationOptions.prototype.loadTrustList = function (e) {
            return (
              h(arguments.length, 1, "loadTrustList", "(PDFNet.FDFDoc)", [[e, "FDFDoc"]]),
              d.sendWithPromise("VerificationOptions.loadTrustList", {
                self: this.id,
                in_fdf_cert_exchange_data: e.id,
              })
            )
          }),
          (d.VerificationOptions.prototype.enableModificationVerification = function (e) {
            return (
              h(arguments.length, 1, "enableModificationVerification", "(boolean)", [
                [e, "boolean"],
              ]),
              d.sendWithPromise("VerificationOptions.enableModificationVerification", {
                self: this.id,
                in_on_or_off: e,
              })
            )
          }),
          (d.VerificationOptions.prototype.enableDigestVerification = function (e) {
            return (
              h(arguments.length, 1, "enableDigestVerification", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("VerificationOptions.enableDigestVerification", {
                self: this.id,
                in_on_or_off: e,
              })
            )
          }),
          (d.VerificationOptions.prototype.enableTrustVerification = function (e) {
            return (
              h(arguments.length, 1, "enableTrustVerification", "(boolean)", [[e, "boolean"]]),
              d.sendWithPromise("VerificationOptions.enableTrustVerification", {
                self: this.id,
                in_on_or_off: e,
              })
            )
          }),
          (d.VerificationOptions.prototype.setRevocationProxyPrefix = function (e) {
            return (
              h(arguments.length, 1, "setRevocationProxyPrefix", "(string)", [[e, "string"]]),
              d.sendWithPromise("VerificationOptions.setRevocationProxyPrefix", {
                self: this.id,
                in_str: e,
              })
            )
          }),
          (d.VerificationOptions.prototype.enableOnlineCRLRevocationChecking = function (e) {
            return (
              h(arguments.length, 1, "enableOnlineCRLRevocationChecking", "(boolean)", [
                [e, "boolean"],
              ]),
              d.sendWithPromise("VerificationOptions.enableOnlineCRLRevocationChecking", {
                self: this.id,
                in_on_or_off: e,
              })
            )
          }),
          (d.VerificationOptions.prototype.enableOnlineOCSPRevocationChecking = function (e) {
            return (
              h(arguments.length, 1, "enableOnlineOCSPRevocationChecking", "(boolean)", [
                [e, "boolean"],
              ]),
              d.sendWithPromise("VerificationOptions.enableOnlineOCSPRevocationChecking", {
                self: this.id,
                in_on_or_off: e,
              })
            )
          }),
          (d.VerificationOptions.prototype.enableOnlineRevocationChecking = function (e) {
            return (
              h(arguments.length, 1, "enableOnlineRevocationChecking", "(boolean)", [
                [e, "boolean"],
              ]),
              d.sendWithPromise("VerificationOptions.enableOnlineRevocationChecking", {
                self: this.id,
                in_on_or_off: e,
              })
            )
          }),
          (d.VerificationResult.prototype.getDigitalSignatureField = function () {
            return d
              .sendWithPromise("VerificationResult.getDigitalSignatureField", { self: this.id })
              .then(function (e) {
                return new d.DigitalSignatureField(e)
              })
          }),
          (d.VerificationResult.prototype.getVerificationStatus = function () {
            return d.sendWithPromise("VerificationResult.getVerificationStatus", { self: this.id })
          }),
          (d.VerificationResult.prototype.getDocumentStatus = function () {
            return d.sendWithPromise("VerificationResult.getDocumentStatus", { self: this.id })
          }),
          (d.VerificationResult.prototype.getDigestStatus = function () {
            return d.sendWithPromise("VerificationResult.getDigestStatus", { self: this.id })
          }),
          (d.VerificationResult.prototype.getTrustStatus = function () {
            return d.sendWithPromise("VerificationResult.getTrustStatus", { self: this.id })
          }),
          (d.VerificationResult.prototype.getPermissionsStatus = function () {
            return d.sendWithPromise("VerificationResult.getPermissionsStatus", { self: this.id })
          }),
          (d.VerificationResult.prototype.getTrustVerificationResult = function () {
            return d
              .sendWithPromise("VerificationResult.getTrustVerificationResult", { self: this.id })
              .then(function (e) {
                return o(d.TrustVerificationResult, e)
              })
          }),
          (d.VerificationResult.prototype.hasTrustVerificationResult = function () {
            return d.sendWithPromise("VerificationResult.hasTrustVerificationResult", {
              self: this.id,
            })
          }),
          (d.VerificationResult.prototype.getDisallowedChanges = function () {
            return d
              .sendWithPromise("VerificationResult.getDisallowedChanges", { self: this.id })
              .then(function (e) {
                for (var t = [], n = 0; n < e.length; ++n) {
                  var i = e[n]
                  if ("0" === i) return null
                  ;(i = new d.DisallowedChange(i)), t.push(i), g.push({ name: i.name, id: i.id })
                }
                return t
              })
          }),
          (d.VerificationResult.prototype.getDigestAlgorithm = function () {
            return d.sendWithPromise("VerificationResult.getDigestAlgorithm", { self: this.id })
          }),
          (d.VerificationResult.prototype.getDocumentStatusAsString = function () {
            return d.sendWithPromise("VerificationResult.getDocumentStatusAsString", {
              self: this.id,
            })
          }),
          (d.VerificationResult.prototype.getDigestStatusAsString = function () {
            return d.sendWithPromise("VerificationResult.getDigestStatusAsString", {
              self: this.id,
            })
          }),
          (d.VerificationResult.prototype.getTrustStatusAsString = function () {
            return d.sendWithPromise("VerificationResult.getTrustStatusAsString", { self: this.id })
          }),
          (d.VerificationResult.prototype.getPermissionsStatusAsString = function () {
            return d.sendWithPromise("VerificationResult.getPermissionsStatusAsString", {
              self: this.id,
            })
          }),
          (d.VerificationResult.prototype.getUnsupportedFeatures = function () {
            return d.sendWithPromise("VerificationResult.getUnsupportedFeatures", { self: this.id })
          }),
          (d.EmbeddedTimestampVerificationResult.prototype.getVerificationStatus = function () {
            return d.sendWithPromise("EmbeddedTimestampVerificationResult.getVerificationStatus", {
              self: this.id,
            })
          }),
          (d.EmbeddedTimestampVerificationResult.prototype.getCMSDigestStatus = function () {
            return d.sendWithPromise("EmbeddedTimestampVerificationResult.getCMSDigestStatus", {
              self: this.id,
            })
          }),
          (d.EmbeddedTimestampVerificationResult.prototype.getMessageImprintDigestStatus =
            function () {
              return d.sendWithPromise(
                "EmbeddedTimestampVerificationResult.getMessageImprintDigestStatus",
                { self: this.id }
              )
            }),
          (d.EmbeddedTimestampVerificationResult.prototype.getTrustStatus = function () {
            return d.sendWithPromise("EmbeddedTimestampVerificationResult.getTrustStatus", {
              self: this.id,
            })
          }),
          (d.EmbeddedTimestampVerificationResult.prototype.getCMSDigestStatusAsString =
            function () {
              return d.sendWithPromise(
                "EmbeddedTimestampVerificationResult.getCMSDigestStatusAsString",
                { self: this.id }
              )
            }),
          (d.EmbeddedTimestampVerificationResult.prototype.getMessageImprintDigestStatusAsString =
            function () {
              return d.sendWithPromise(
                "EmbeddedTimestampVerificationResult.getMessageImprintDigestStatusAsString",
                { self: this.id }
              )
            }),
          (d.EmbeddedTimestampVerificationResult.prototype.getTrustStatusAsString = function () {
            return d.sendWithPromise("EmbeddedTimestampVerificationResult.getTrustStatusAsString", {
              self: this.id,
            })
          }),
          (d.EmbeddedTimestampVerificationResult.prototype.hasTrustVerificationResult =
            function () {
              return d.sendWithPromise(
                "EmbeddedTimestampVerificationResult.hasTrustVerificationResult",
                { self: this.id }
              )
            }),
          (d.EmbeddedTimestampVerificationResult.prototype.getTrustVerificationResult =
            function () {
              return d
                .sendWithPromise("EmbeddedTimestampVerificationResult.getTrustVerificationResult", {
                  self: this.id,
                })
                .then(function (e) {
                  return o(d.TrustVerificationResult, e)
                })
            }),
          (d.EmbeddedTimestampVerificationResult.prototype.getCMSSignatureDigestAlgorithm =
            function () {
              return d.sendWithPromise(
                "EmbeddedTimestampVerificationResult.getCMSSignatureDigestAlgorithm",
                { self: this.id }
              )
            }),
          (d.EmbeddedTimestampVerificationResult.prototype.getMessageImprintDigestAlgorithm =
            function () {
              return d.sendWithPromise(
                "EmbeddedTimestampVerificationResult.getMessageImprintDigestAlgorithm",
                { self: this.id }
              )
            }),
          (d.EmbeddedTimestampVerificationResult.prototype.getUnsupportedFeatures = function () {
            return d.sendWithPromise("EmbeddedTimestampVerificationResult.getUnsupportedFeatures", {
              self: this.id,
            })
          }),
          (d.TrustVerificationResult.prototype.wasSuccessful = function () {
            return d.sendWithPromise("TrustVerificationResult.wasSuccessful", { self: this.id })
          }),
          (d.TrustVerificationResult.prototype.getResultString = function () {
            return d.sendWithPromise("TrustVerificationResult.getResultString", { self: this.id })
          }),
          (d.TrustVerificationResult.prototype.getTimeOfTrustVerification = function () {
            return d.sendWithPromise("TrustVerificationResult.getTimeOfTrustVerification", {
              self: this.id,
            })
          }),
          (d.TrustVerificationResult.prototype.getTimeOfTrustVerificationEnum = function () {
            return d.sendWithPromise("TrustVerificationResult.getTimeOfTrustVerificationEnum", {
              self: this.id,
            })
          }),
          (d.TrustVerificationResult.prototype.hasEmbeddedTimestampVerificationResult =
            function () {
              return d.sendWithPromise(
                "TrustVerificationResult.hasEmbeddedTimestampVerificationResult",
                { self: this.id }
              )
            }),
          (d.TrustVerificationResult.prototype.getEmbeddedTimestampVerificationResult =
            function () {
              return d
                .sendWithPromise("TrustVerificationResult.getEmbeddedTimestampVerificationResult", {
                  self: this.id,
                })
                .then(function (e) {
                  return o(d.EmbeddedTimestampVerificationResult, e)
                })
            }),
          (d.TrustVerificationResult.prototype.getCertPath = function () {
            return d
              .sendWithPromise("TrustVerificationResult.getCertPath", { self: this.id })
              .then(function (e) {
                for (var t = [], n = 0; n < e.length; ++n) {
                  var i = e[n]
                  if ("0" === i) return null
                  ;(i = new d.X509Certificate(i)), t.push(i), g.push({ name: i.name, id: i.id })
                }
                return t
              })
          }),
          (d.DisallowedChange.prototype.getObjNum = function () {
            return d.sendWithPromise("DisallowedChange.getObjNum", { self: this.id })
          }),
          (d.DisallowedChange.prototype.getType = function () {
            return d.sendWithPromise("DisallowedChange.getType", { self: this.id })
          }),
          (d.DisallowedChange.prototype.getTypeAsString = function () {
            return d.sendWithPromise("DisallowedChange.getTypeAsString", { self: this.id })
          }),
          (d.X509Extension.prototype.isCritical = function () {
            return d.sendWithPromise("X509Extension.isCritical", { self: this.id })
          }),
          (d.X509Extension.prototype.getObjectIdentifier = function () {
            return d
              .sendWithPromise("X509Extension.getObjectIdentifier", { self: this.id })
              .then(function (e) {
                return o(d.ObjectIdentifier, e)
              })
          }),
          (d.X509Extension.prototype.toString = function () {
            return d.sendWithPromise("X509Extension.toString", { self: this.id })
          }),
          (d.X509Extension.prototype.getData = function () {
            return d.sendWithPromise("X509Extension.getData", { self: this.id }).then(function (e) {
              return new Uint8Array(e)
            })
          }),
          (d.X501AttributeTypeAndValue.prototype.getAttributeTypeOID = function () {
            return d
              .sendWithPromise("X501AttributeTypeAndValue.getAttributeTypeOID", { self: this.id })
              .then(function (e) {
                return o(d.ObjectIdentifier, e)
              })
          }),
          (d.X501AttributeTypeAndValue.prototype.getStringValue = function () {
            return d.sendWithPromise("X501AttributeTypeAndValue.getStringValue", { self: this.id })
          }),
          (d.ByteRange.prototype.getStartOffset = function () {
            return (
              u("getStartOffset", this.yieldFunction),
              d.sendWithPromise("ByteRange.getStartOffset", { self: this })
            )
          }),
          (d.ByteRange.prototype.getEndOffset = function () {
            return (
              u("getEndOffset", this.yieldFunction),
              d.sendWithPromise("ByteRange.getEndOffset", { self: this })
            )
          }),
          (d.ByteRange.prototype.getSize = function () {
            return (
              u("getSize", this.yieldFunction),
              d.sendWithPromise("ByteRange.getSize", { self: this })
            )
          }),
          (d.TimestampingResult.prototype.getStatus = function () {
            return d.sendWithPromise("TimestampingResult.getStatus", { self: this.id })
          }),
          (d.TimestampingResult.prototype.getString = function () {
            return d.sendWithPromise("TimestampingResult.getString", { self: this.id })
          }),
          (d.TimestampingResult.prototype.hasResponseVerificationResult = function () {
            return d.sendWithPromise("TimestampingResult.hasResponseVerificationResult", {
              self: this.id,
            })
          }),
          (d.TimestampingResult.prototype.getResponseVerificationResult = function () {
            return d
              .sendWithPromise("TimestampingResult.getResponseVerificationResult", {
                self: this.id,
              })
              .then(function (e) {
                return o(d.EmbeddedTimestampVerificationResult, e)
              })
          }),
          (d.TimestampingResult.prototype.getData = function () {
            return d
              .sendWithPromise("TimestampingResult.getData", { self: this.id })
              .then(function (e) {
                return new Uint8Array(e)
              })
          }),
          (d.ActionParameter.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(PDFNet.Action)", [
                [e, "Object", d.Action, "Action"],
              ]),
              d.sendWithPromise("actionParameterCreate", { action: e.id }).then(function (e) {
                return o(d.ActionParameter, e)
              })
            )
          })
        ;(d.Action.prototype.parameterCreateWithField = function (e) {
          return (
            h(arguments.length, 1, "parameterCreateWithField", "(PDFNet.Field)", [
              [e, "Structure", d.Field, "Field"],
            ]),
            l("parameterCreateWithField", [[e, 0]]),
            d
              .sendWithPromise("Action.parameterCreateWithField", { action: this.id, field: e })
              .then(function (e) {
                return o(d.ActionParameter, e)
              })
          )
        }),
          (d.Action.prototype.parameterCreateWithAnnot = function (e) {
            return (
              h(arguments.length, 1, "parameterCreateWithAnnot", "(PDFNet.Annot)", [
                [e, "Object", d.Annot, "Annot"],
              ]),
              d
                .sendWithPromise("Action.parameterCreateWithAnnot", {
                  action: this.id,
                  annot: e.id,
                })
                .then(function (e) {
                  return o(d.ActionParameter, e)
                })
            )
          }),
          (d.Action.prototype.parameterCreateWithPage = function (e) {
            return (
              h(arguments.length, 1, "parameterCreateWithPage", "(PDFNet.Page)", [
                [e, "Object", d.Page, "Page"],
              ]),
              d
                .sendWithPromise("Action.parameterCreateWithPage", { action: this.id, page: e.id })
                .then(function (e) {
                  return o(d.ActionParameter, e)
                })
            )
          }),
          (d.ActionParameter.prototype.getAction = function () {
            return d
              .sendWithPromise("ActionParameter.getAction", { ap: this.id })
              .then(function (e) {
                return p(d.Action, e)
              })
          }),
          (d.ViewChangeCollection.create = function () {
            return d.sendWithPromise("viewChangeCollectionCreate", {}).then(function (e) {
              return o(d.ViewChangeCollection, e)
            })
          }),
          (d.RadioButtonGroup.createFromField = function (e) {
            return (
              h(arguments.length, 1, "createFromField", "(PDFNet.Field)", [
                [e, "Structure", d.Field, "Field"],
              ]),
              l("createFromField", [[e, 0]]),
              d.sendWithPromise("radioButtonGroupCreateFromField", { field: e }).then(function (e) {
                return o(d.RadioButtonGroup, e)
              })
            )
          }),
          (d.RadioButtonGroup.create = function (e, t) {
            return (
              void 0 === t && (t = ""),
              h(arguments.length, 1, "create", "(PDFNet.PDFDoc, string)", [
                [e, "PDFDoc"],
                [t, "string"],
              ]),
              d
                .sendWithPromise("radioButtonGroupCreate", { doc: e.id, field_name: t })
                .then(function (e) {
                  return o(d.RadioButtonGroup, e)
                })
            )
          }),
          (d.RadioButtonGroup.prototype.copy = function () {
            return d
              .sendWithPromise("RadioButtonGroup.copy", { group: this.id })
              .then(function (e) {
                return o(d.RadioButtonGroup, e)
              })
          }),
          (d.RadioButtonGroup.prototype.add = function (e, t) {
            return (
              void 0 === t && (t = ""),
              h(arguments.length, 1, "add", "(PDFNet.Rect, string)", [
                [e, "Structure", d.Rect, "Rect"],
                [t, "const char* = 0"],
              ]),
              l("add", [[e, 0]]),
              d
                .sendWithPromise("RadioButtonGroup.add", { group: this.id, pos: e, onstate: t })
                .then(function (e) {
                  return p(d.RadioButtonWidget, e)
                })
            )
          }),
          (d.RadioButtonGroup.prototype.getNumButtons = function () {
            return d.sendWithPromise("RadioButtonGroup.getNumButtons", { group: this.id })
          }),
          (d.RadioButtonGroup.prototype.getButton = function (e) {
            return (
              h(arguments.length, 1, "getButton", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("RadioButtonGroup.getButton", { group: this.id, index: e })
                .then(function (e) {
                  return p(d.RadioButtonWidget, e)
                })
            )
          }),
          (d.RadioButtonGroup.prototype.getField = function () {
            return d
              .sendWithPromise("RadioButtonGroup.getField", { group: this.id })
              .then(function (e) {
                return new d.Field(e)
              })
          }),
          (d.RadioButtonGroup.prototype.addGroupButtonsToPage = function (e) {
            return (
              h(arguments.length, 1, "addGroupButtonsToPage", "(PDFNet.Page)", [
                [e, "Object", d.Page, "Page"],
              ]),
              d.sendWithPromise("RadioButtonGroup.addGroupButtonsToPage", {
                group: this.id,
                page: e.id,
              })
            )
          }),
          (d.PDFTronCustomSecurityHandler.create = function (e) {
            return (
              h(arguments.length, 1, "create", "(number)", [[e, "number"]]),
              d
                .sendWithPromise("pdfTronCustomSecurityHandlerCreate", { custom_id: e })
                .then(function (e) {
                  return o(d.SecurityHandler, e)
                })
            )
          }),
          (d.WebFontDownloader.isAvailable = function () {
            return d.sendWithPromise("webFontDownloaderIsAvailable", {})
          }),
          (d.WebFontDownloader.enableDownloads = function () {
            return d.sendWithPromise("webFontDownloaderEnableDownloads", {})
          }),
          (d.WebFontDownloader.disableDownloads = function () {
            return d.sendWithPromise("webFontDownloaderDisableDownloads", {})
          }),
          (d.WebFontDownloader.preCacheAsync = function () {
            return d.sendWithPromise("webFontDownloaderPreCacheAsync", {})
          }),
          (d.WebFontDownloader.clearCache = function () {
            return d.sendWithPromise("webFontDownloaderClearCache", {})
          }),
          (d.WebFontDownloader.setCustomWebFontURL = function (e) {
            return (
              h(arguments.length, 1, "setCustomWebFontURL", "(string)", [[e, "string"]]),
              d.sendWithPromise("webFontDownloaderSetCustomWebFontURL", { url: e })
            )
          })
        var S,
          h = function (e, t, i, r, n) {
            if (t === (maxNum = n.length)) {
              if (e !== t)
                throw new RangeError(
                  e +
                    " arguments passed into function '" +
                    i +
                    "'. Expected " +
                    t +
                    " argument. Function Signature: " +
                    i +
                    r
                )
            } else if (t <= 0) {
              if (e > maxNum)
                throw new RangeError(
                  e +
                    " arguments passed into function '" +
                    i +
                    "'. Expected at most " +
                    maxNum +
                    " arguments. Function Signature: " +
                    i +
                    r
                )
            } else if (e < t || e > maxNum)
              throw new RangeError(
                e +
                  " arguments passed into function '" +
                  i +
                  "'. Expected " +
                  t +
                  " to " +
                  maxNum +
                  " arguments. Function Signature: " +
                  i +
                  r
              )
            function o(e, t, n) {
              throw new TypeError(
                D(e) +
                  " input argument in function '" +
                  i +
                  "' is of type '" +
                  t +
                  "'. Expected type '" +
                  n +
                  "'. Function Signature: " +
                  i +
                  r
              )
            }
            for (
              e = function (e, t, n) {
                "object" === c(e) && e.name ? o(t, e.name, n) : o(t, c(e), n)
              },
                t = 0;
              t < maxNum;
              t++
            ) {
              var s = n[t],
                u = s[0],
                a = s[1]
              if (u instanceof Promise)
                throw new TypeError(
                  D(t) +
                    " input argument in function '" +
                    i +
                    "' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if ("OptionBase" === a) {
                if (u)
                  if ("object" === c(u)) {
                    if ("function" != typeof u.getJsonString)
                      throw new TypeError(
                        D(t) +
                          " input argument in function '" +
                          i +
                          "' is an 'oject' which is expected to have the 'getJsonString' function"
                      )
                  } else o(t, u.name, "object")
              } else
                "Array" === a
                  ? u.constructor !== Array && e(u, t, "Array")
                  : "ArrayBuffer" === a
                  ? b.isArrayBuffer(u) ||
                    b.isArrayBuffer(u.buffer) ||
                    e(u, t, "ArrayBuffer|TypedArray")
                  : "ArrayAsBuffer" === a
                  ? u.constructor === Array ||
                    b.isArrayBuffer(u) ||
                    b.isArrayBuffer(u.buffer) ||
                    e(u, t, "ArrayBuffer|TypedArray")
                  : "PDFDoc" === a || "SDFDoc" === a || "FDFDoc" === a
                  ? u instanceof d.PDFDoc ||
                    u instanceof d.SDFDoc ||
                    u instanceof d.FDFDoc ||
                    e(u, t, "PDFDoc|SDFDoc|FDFDoc")
                  : "Structure" === a
                  ? u instanceof s[2] || !u || u.name === s[3] || e(u, t, s[3])
                  : "OptionObject" === a
                  ? u instanceof s[2] ||
                    ("object" === c(u) && u.name
                      ? u.name !== s[4] && o(t, u.name, s[3])
                      : o(t, c(u), s[3]))
                  : "Object" === a
                  ? u instanceof s[2] || e(u, t, s[3])
                  : "const char* = 0" === a
                  ? "string" != typeof u && null !== u && o(t, c(u), "string")
                  : c(u) !== a && o(t, c(u), a)
            }
          },
          u = function (e, t) {
            if (void 0 !== t)
              throw Error(
                "Function " +
                  t +
                  " recently altered a struct object without yielding. That object is now being accessed by function '" +
                  e +
                  "'. Perhaps a yield statement is required for " +
                  t +
                  "?"
              )
          },
          l = function (e, t) {
            for (var n = 0; n < t.length; n++) {
              var i = t[n],
                r = i[0]
              if (r && void 0 !== r.yieldFunction)
                throw Error(
                  "Function '" +
                    r.yieldFunction +
                    "' recently altered a struct object without yielding. That object is now being accessed by the " +
                    D(i[1]) +
                    " input argument in function '" +
                    e +
                    "'. Perhaps a yield statement is required for '" +
                    r.yieldFunction +
                    "'?"
                )
            }
          },
          a = function (e, t) {
            var n = e
            return (
              t && e.constructor === Array && (n = new Float64Array(e)),
              b.isArrayBuffer(n) ||
                ((n = n.buffer),
                e.byteLength < n.byteLength &&
                  (n = n.slice(e.byteOffset, e.byteOffset + e.byteLength))),
              n
            )
          },
          o =
            ((g = []),
            (s = []),
            (f = n = 0),
            (P = []),
            (F = []),
            b.PDFTron &&
              PDFTron.WebViewer &&
              PDFTron.WebViewer.prototype &&
              PDFTron.WebViewer.prototype.version &&
              PDFTron.skipPDFNetWebViewerWarning,
            function (e, t, n) {
              return "0" === t ? null : ((e = new e(t, n)), g.push({ name: e.name, id: e.id }), e)
            }),
          p = function (e, t, n) {
            return "0" === t ? null : new e(t, n)
          },
          _ = function (e) {
            for (var t = -1, n = s.length - 1; 0 <= n; n--)
              if (s[n].id == e.id) {
                t = n
                break
              }
            if (-1 != t) for (s.splice(t, 1), n = F.length - 1; 0 <= n && t < F[n]; n--) --F[n]
          },
          O = function (e) {
            for (var t = -1, n = g.length - 1; 0 <= n; n--)
              if (g[n].id == e) {
                t = n
                break
              }
            if (-1 != t) for (g.splice(t, 1), n = P.length - 1; 0 <= n && t < P[n]; n--) --P[n]
          },
          m =
            ((d.messageHandler = {
              sendWithPromiseReturnId: function () {
                throw Error(
                  "PDFNet.initialize must be called and finish resolving before any other PDFNetJS function calls."
                )
              },
            }),
            (d.userPriority = 2),
            (d.sendWithPromise = function (e, t) {
              var n = this.messageHandler,
                i = n.sendWithPromiseReturnId(e, t, this.userPriority)
              return (
                (n.pdfnetCommandChain =
                  0 == n.pdfnetActiveCommands.size
                    ? i.promise
                    : n.pdfnetCommandChain.then(function () {
                        return i.promise
                      })),
                n.pdfnetActiveCommands.add(i.callbackId),
                n.pdfnetCommandChain
              )
            }),
            function (e, t) {
              for (var n in e) t[n] = e[n]
            }),
          A =
            ((d.runGeneratorWithoutCleanup = function (e, t) {
              return d.runWithoutCleanup(function () {
                return r(e)
              }, t)
            }),
            (d.runGeneratorWithCleanup = function (e, t) {
              return d.runWithCleanup(function () {
                return r(e)
              }, t)
            }),
            Promise.resolve()),
          W =
            ((d.displayAllocatedObjects = function () {
              if (0 != g.length) for (var e = 0; e < g.length; e++);
              return g.length
            }),
            (d.getAllocatedObjectsCount = function () {
              return g.length
            }),
            (d.startDeallocateStack = function () {
              return (f += 1), P.push(g.length), F.push(s.length), Promise.resolve()
            }),
            (d.endDeallocateStack = function () {
              if (0 === f) return Promise.resolve()
              var e = P.pop(),
                t = F.pop(),
                n = [],
                i = [],
                r = 0
              if (void 0 !== t && 0 !== s.length && s.length !== t)
                for (; s.length > t; ) {
                  var o = s.pop()
                  ;(o = (o = d.sendWithPromise(o.name + "." + o.unlocktype, { doc: o.id })).catch(
                    function (e) {}
                  )),
                    n.push(o),
                    r++
                }
              if (void (t = 0) !== e && 0 !== g.length && g.length !== e)
                for (; g.length > e; )
                  (r = g.pop()),
                    (r = (r = d.sendWithPromise(r.name + ".destroy", {
                      auto_dealloc_obj: r.id,
                    })).catch(function (e) {})),
                    i.push(r),
                    t++
              return (
                --f,
                Promise.all(n).then(function () {
                  return Promise.all(i)
                })
              )
            }),
            (d.getStackCount = function () {
              return Promise.resolve(f)
            }),
            (d.deallocateAllObjects = function () {
              var e
              if (0 == g.length) return (e = createPromiseCapability()).resolve(), e.promise
              for (e = [], P = []; s.length; )
                (objToUnlock = s.pop()),
                  (unlockPromise = (unlockPromise = d.sendWithPromise(
                    objToUnlock.name + "." + objToUnlock.unlocktype,
                    { doc: objToUnlock.id }
                  )).catch(function (e) {})),
                  e.push(unlockPromise)
              for (; g.length; ) {
                var t = g.pop()
                ;(t = (t = d.sendWithPromise(t.name + ".destroy", {
                  auto_dealloc_obj: t.id,
                })).catch(function (e) {})),
                  e.push(t)
              }
              return Promise.all(e)
            }),
            (d.Redactor.redact = function (e, t, n, i, r) {
              if (
                (void 0 === (n = void 0 === n ? {} : n).redaction_overlay &&
                  (n.redaction_overlay = !0),
                void 0 === n.positive_overlay_color
                  ? (n.positive_overlay_color = void 0)
                  : void 0 !== n.positive_overlay_color.id &&
                    (n.positive_overlay_color = n.positive_overlay_color.id),
                void 0 === n.negative_overlay_color
                  ? (n.negative_overlay_color = void 0)
                  : void 0 !== n.negative_overlay_color.id &&
                    (n.negative_overlay_color = n.negative_overlay_color.id),
                void 0 === n.border && (n.border = !0),
                void 0 === n.use_overlay_text && (n.use_overlay_text = !0),
                void 0 === n.font
                  ? (n.font = void 0)
                  : void 0 !== n.font.id && (n.font = n.font.id),
                void 0 === n.min_font_size && (n.min_font_size = 2),
                void 0 === n.max_font_size && (n.max_font_size = 24),
                void 0 === n.text_color
                  ? (n.text_color = void 0)
                  : void 0 !== n.text_color.id && (n.text_color = n.text_color.id),
                void 0 === n.horiz_text_alignment && (n.horiz_text_alignment = -1),
                void 0 === n.vert_text_alignment && (n.vert_text_alignment = 1),
                void 0 === n.show_redacted_content_regions &&
                  (n.show_redacted_content_regions = !1),
                void 0 === n.redacted_content_color
                  ? (n.redacted_content_color = void 0)
                  : void 0 !== n.redacted_content_color.id &&
                    (n.redacted_content_color = n.redacted_content_color.id),
                void 0 === i && (i = !0),
                void 0 === r && (r = !0),
                arguments.length < 2 || 5 < arguments.length)
              )
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'redact'. Expected 2 to 5 arguments. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean=true, boolean=true)"
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument of function 'redact'. Promises require a 'yield' statement before being accessed."
                )
              if (!(e instanceof d.PDFDoc || e instanceof d.SDFDoc || e instanceof d.FDFDoc)) {
                if ("object" == c(e))
                  throw new TypeError(
                    "1st input argument in function 'redact' is of type '" +
                      e.name +
                      "'. Expected type 'PDFDoc'. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean=true, boolean=true)."
                  )
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'redact' is of type '" +
                    c(e) +
                    "'. Expected type 'PDFDoc'. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean=true, boolean=true)."
                )
              }
              if (t instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 2nd input argument in function 'redact'. Promises require a 'yield' statement before being accessed."
                )
              if (!(t instanceof Array)) {
                if ("object" == c(t))
                  throw new TypeError(
                    "2nd input argument in function 'redact' is of type '" +
                      t.name +
                      "'. Expected an array of 'Redaction' objects. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean, boolean)."
                  )
                throw new TypeError(
                  "2nd input argument '" +
                    t +
                    "' in function 'redact' is of type '" +
                    c(t) +
                    "'. Expected type 'Redaction'. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean, boolean)."
                )
              }
              if (n instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 3rd input argument in function 'redact'. Promises require a 'yield' statement before being accessed."
                )
              if ("object" !== c(n))
                throw new TypeError(
                  "3nd input argument in function 'redact' is of type '" +
                    n.name +
                    "'. Expected a javascript object. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean, boolean)."
                )
              if (i instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 4th input argument in function 'redact'. Promises require a 'yield' statement before being accessed."
                )
              if ("boolean" != typeof i)
                throw new TypeError(
                  "4th input argument '" +
                    i +
                    "' in function 'redact' is of type '" +
                    c(i) +
                    "'. Expected type 'boolean'. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean=true, boolean=true)."
                )
              if (r instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 5th input argument in function 'redact'. Promises require a 'yield' statement before being accessed."
                )
              if ("boolean" != typeof r)
                throw new TypeError(
                  "5th input argument '" +
                    r +
                    "' in function 'redact' is of type '" +
                    c(r) +
                    "'. Expected type 'boolean'. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean=true, boolean=true)."
                )
              return d.sendWithPromise("redactorRedact", {
                doc: e.id,
                red_arr: t,
                appearance: n,
                ext_neg_mode: i,
                page_coord_sys: r,
              })
            }),
            (d.Highlights.prototype.getCurrentQuads = function () {
              return d
                .sendWithPromise("Highlights.getCurrentQuads", { hlts: this.id })
                .then(function (e) {
                  e = new Float64Array(e)
                  for (var t, n = [], i = 0; i < e.length; i += 8)
                    (t = d.QuadPoint(
                      e[i + 0],
                      e[i + 1],
                      e[i + 2],
                      e[i + 3],
                      e[i + 4],
                      e[i + 5],
                      e[i + 6],
                      e[i + 7]
                    )),
                      n.push(t)
                  return n
                })
            }),
            (d.TextSearch.prototype.run = function () {
              if (0 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'run'. Expected 0 arguments. Function Signature: run()"
                )
              return d.sendWithPromise("TextSearch.run", { ts: this.id }).then(function (e) {
                return (
                  (e.highlights = new d.Highlights(e.highlights)),
                  "0" == e.highlights.id ||
                    g.push({ name: e.highlights.name, id: e.highlights.id }),
                  e
                )
              })
            }),
            (d.Iterator.prototype.current = function () {
              if (0 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'fillEncryptDict'. Expected 0 argument."
                )
              var t = this,
                e =
                  ((this.yieldFunction = "Iterator.current"),
                  d.sendWithPromise("Iterator.current", { itr: this.id, type: this.type }))
              return (
                (t.yieldFunction = void 0),
                (e =
                  "Int" != this.type
                    ? e.then(function (e) {
                        return new d[t.type](e)
                      })
                    : e)
              )
            }),
            (d.PDFDoc.prototype.getFileData = function (e) {
              e({ type: "id", id: this.id })
            }),
            (d.PDFDoc.prototype.getFile = function (e) {
              return null
            }),
            (d.PDFDoc.createFromURL = function (e, t) {
              if (arguments.length < 1 || 2 < arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'createFromURL'. Expected 1 to 2 arguments. Function Signature: createFromURL(string, Obj)"
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'createFromURL'. Promises require a 'yield' statement before being accessed."
                )
              if ("string" != typeof e)
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'createFromURL' is of type '" +
                    c(e) +
                    "'. Expected type 'string'. Function Signature: createFromURL(string)."
                )
              return y(e, t).then(function (e) {
                return d.PDFDoc.createFromBuffer(e)
              })
            }),
            (d.PDFDraw.prototype.exportBuffer = function (e, t, n) {
              if (
                (void 0 === t && (t = "PNG"),
                void 0 === n && (n = new d.Obj("0")),
                arguments.length < 1 || 3 < arguments.length)
              )
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'exportBuffer'. Expected 1 to 3 arguments. Function Signature: exportBuffer(Page, string, Obj)"
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'exportBuffer'. Promises require a 'yield' statement before being accessed."
                )
              if (!(e instanceof d.Page)) {
                if ("object" == c(e))
                  throw new TypeError(
                    "1st input argument in function 'exportBuffer' is of type '" +
                      e.name +
                      "'. Expected type 'Page'. Function Signature: exportBuffer(Page, string, Obj)."
                  )
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'exportBuffer' is of type '" +
                    c(e) +
                    "'. Expected type 'Page'. Function Signature: exportBuffer(Page, string, Obj)."
                )
              }
              if (t instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'exportBuffer'. Promises require a 'yield' statement before being accessed."
                )
              if ("string" != typeof t)
                throw new TypeError(
                  "2nd input argument '" +
                    t +
                    "' in function 'exportBuffer' is of type '" +
                    c(t) +
                    "'. Expected type 'string'. Function Signature: exportBuffer(Page, string, Obj)."
                )
              if (n instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'exportBuffer'. Promises require a 'yield' statement before being accessed."
                )
              if (n instanceof d.Obj)
                return d
                  .sendWithPromise("PDFDraw.exportBuffer", {
                    d: this.id,
                    page: e.id,
                    format: t,
                    encoder_params: n.id,
                  })
                  .then(function (e) {
                    return "0" == e ? null : new Uint8Array(e)
                  })
              if ("object" == c(n))
                throw new TypeError(
                  "3rd input argument in function 'exportBuffer' is of type '" +
                    n.name +
                    "'. Expected type 'Obj'. Function Signature: exportBuffer(Page, string, Obj)."
                )
              throw new TypeError(
                "3rd input argument '" +
                  n +
                  "' in function 'exportBuffer' is of type '" +
                  c(n) +
                  "'. Expected type 'Obj'. Function Signature: exportBuffer(Page, string, Obj)."
              )
            }),
            (d.PDFDraw.prototype.exportStream = d.PDFDraw.prototype.exportBuffer),
            (d.Element.prototype.getTextData = function () {
              if (0 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'getTextData'. Expected 0 arguments. Function Signature: getTextData()"
                )
              return d.sendWithPromise("Element.getTextData", { e: this.id })
            }),
            (d.Element.prototype.getPathData = function () {
              if (0 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'getPathData'. Expected 0 arguments. Function Signature: getPathData()"
                )
              return d.sendWithPromise("Element.getPathData", { e: this.id }).then(function (e) {
                return (
                  (e.operators = new Uint8Array(e.operators)),
                  (e.points = new Float64Array(e.points)),
                  e
                )
              })
            }),
            (d.PDFDoc.prototype.convertToXod = function (e) {
              return d
                .sendWithPromise("PDFDoc.convertToXod", {
                  doc: this.id,
                  optionsObject: (e = void 0 === e ? {} : e),
                })
                .then(function (e) {
                  return "0" == e ? null : new Uint8Array(e)
                })
            }),
            (d.PDFDoc.prototype.convertToXodStream = function (e) {
              return d
                .sendWithPromise("PDFDoc.convertToXodStream", {
                  doc: this.id,
                  optionsObject: (e = void 0 === e ? {} : e),
                })
                .then(function (e) {
                  return "0" == e ? null : new d.Filter(e)
                })
            }),
            (d.FilterReader.prototype.read = function (e) {
              if (1 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'read'. Expected 1 argument. Function Signature: read(number)."
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'read'. Promises require a 'yield' statement before being accessed."
                )
              if ("number" != typeof e)
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'read' is of type '" +
                    c(e) +
                    "'. Expected type 'number'. Function Signature: read(number)."
                )
              return d
                .sendWithPromise("FilterReader.read", { reader: this.id, buf_size: e })
                .then(function (e) {
                  return "0" == e ? null : new Uint8Array(e)
                })
            }),
            (d.FilterReader.prototype.readAllIntoBuffer = function () {
              if (0 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'readAllIntoBuffer'. Expected 0 arguments. Function Signature: readAllIntoBuffer()"
                )
              return d
                .sendWithPromise("FilterReader.readAllIntoBuffer", { reader: this.id })
                .then(function (e) {
                  return "0" == e ? null : new Uint8Array(e)
                })
            }),
            (d.bitmapInfo = function (e) {
              m(e, this)
            }),
            (d.PDFDraw.prototype.getBitmap = function (e, t, n) {
              if (3 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'getBitmap'. Expected 3 arguments. Function Signature: getBitmap(Page, PixelFormat, boolean)."
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'getBitmap'. Promises require a 'yield' statement before being accessed."
                )
              if (!(e instanceof d.Page)) {
                if ("object" == c(e))
                  throw new TypeError(
                    "1st input argument in function 'getBitmap' is of type '" +
                      e.name +
                      "'. Expected type 'Page'. Function Signature: getBitmap(Page, PixelFormat, boolean)."
                  )
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'getBitmap' is of type '" +
                    c(e) +
                    "'. Expected type 'Page'. Function Signature: getBitmap(Page, PixelFormat, boolean)."
                )
              }
              if (t instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'getBitmap'. Promises require a 'yield' statement before being accessed."
                )
              if ("number" != typeof t)
                throw new TypeError(
                  "2nd input argument '" +
                    t +
                    "' in function 'getBitmap' is of type '" +
                    c(t) +
                    "'. Expected type 'number'. Function Signature: getBitmap(Page, PixelFormat, boolean)."
                )
              if (n instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'getBitmap'. Promises require a 'yield' statement before being accessed."
                )
              if ("boolean" != typeof n)
                throw new TypeError(
                  "3rd input argument '" +
                    n +
                    "' in function 'getBitmap' is of type '" +
                    c(n) +
                    "'. Expected type 'boolean'. Function Signature: getBitmap(Page, PixelFormat, boolean)."
                )
              return d
                .sendWithPromise("PDFDraw.getBitmap", {
                  d: this.id,
                  page: e.id,
                  pix_fmt: t,
                  demult: n,
                })
                .then(function (e) {
                  return "0" == e ? null : new d.bitmapInfo(e)
                })
            }),
            (d.Matrix2D.create = function (e, t, n, i, r, o) {
              if (
                (null == e && (e = 0),
                null == t && (t = 0),
                null == n && (n = 0),
                null == i && (i = 0),
                null == r && (r = 0),
                null == o && (o = 0),
                6 < arguments.length)
              )
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'Matrix2D.create'. Expected 6 or fewer arguments. Function Signature: create(number, number, number, number, number, number)."
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'Matrix2D.create'. Promises require a 'yield' statement before being accessed."
                )
              if ("number" != typeof e)
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'Matrix2D.create' is of type '" +
                    c(e) +
                    "'. Expected type 'number'. Function Signature: create(number, number, number, number, number, number)."
                )
              if (t instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 2nd input argument 'Matrix2D.create'. Promises require a 'yield' statement before being accessed."
                )
              if ("number" != typeof t)
                throw new TypeError(
                  "2nd input argument '" +
                    t +
                    "' in function 'Matrix2D.create' is of type '" +
                    c(t) +
                    "'. Expected type 'number'. Function Signature: create(number, number, number, number, number, number)."
                )
              if (n instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 3rd input argument 'Matrix2D.create'. Promises require a 'yield' statement before being accessed."
                )
              if ("number" != typeof n)
                throw new TypeError(
                  "3rd input argument '" +
                    n +
                    "' in function 'Matrix2D.create' is of type '" +
                    c(n) +
                    "'. Expected type 'number'. Function Signature: create(number, number, number, number, number, number)."
                )
              if (i instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 4th input argument 'Matrix2D.create'. Promises require a 'yield' statement before being accessed."
                )
              if ("number" != typeof i)
                throw new TypeError(
                  "4th input argument '" +
                    i +
                    "' in function 'Matrix2D.create' is of type '" +
                    c(i) +
                    "'. Expected type 'number'. Function Signature: create(number, number, number, number, number, number)."
                )
              if (r instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 5th input argument 'Matrix2D.create'. Promises require a 'yield' statement before being accessed."
                )
              if ("number" != typeof r)
                throw new TypeError(
                  "5th input argument '" +
                    r +
                    "' in function 'Matrix2D.create' is of type '" +
                    c(r) +
                    "'. Expected type 'number'. Function Signature: create(number, number, number, number, number, number)."
                )
              if (o instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 6th input argument 'Matrix2D.create'. Promises require a 'yield' statement before being accessed."
                )
              if ("number" != typeof o)
                throw new TypeError(
                  "6th input argument '" +
                    o +
                    "' in function 'Matrix2D.create' is of type '" +
                    c(o) +
                    "'. Expected type 'number'. Function Signature: create(number, number, number, number, number, number)."
                )
              var s = createPromiseCapability(),
                u = new d.Matrix2D({ m_a: e, m_b: t, m_c: n, m_d: i, m_h: r, m_v: o })
              return s.resolve(u), s.promise
            }),
            (d.PDFDoc.prototype.getPDFDoc = function () {
              return d.sendWithPromise("GetPDFDoc", { doc: this.id }).then(function (e) {
                return "0" == e ? null : new d.PDFDoc(e)
              })
            }),
            (d.TextExtractorLine.prototype.getBBox = function () {
              if (0 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'getBBox'. Expected 0 arguments. Function Signature: getBBox()"
                )
              if (void 0 !== this.yieldFunction)
                throw Error(
                  "Function " +
                    this.yieldFunction +
                    " recently altered a struct object without yielding. That object is now being accessed by function 'getBBox'. Perhaps a yield statement is required for " +
                    this.yieldFunction +
                    "?"
                )
              var t = this
              return (
                (this.yieldFunction = "TextExtractorLine.getBBox"),
                d.sendWithPromise("TextExtractorLine.getBBox", { line: this }).then(function (e) {
                  return (
                    (t.yieldFunction = void 0),
                    new d.Rect(e.result.x1, e.result.y1, e.result.x2, e.result.y2, e.result.mp_rect)
                  )
                })
              )
            }),
            (d.TextExtractorLine.prototype.getQuad = function () {
              if (0 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'getQuad'. Expected 0 arguments. Function Signature: getQuad()"
                )
              if (void 0 !== this.yieldFunction)
                throw Error(
                  "Function " +
                    this.yieldFunction +
                    " recently altered a struct object without yielding. That object is now being accessed by function 'getQuad'. Perhaps a yield statement is required for " +
                    this.yieldFunction +
                    "?"
                )
              var t = this
              return (
                (this.yieldFunction = "TextExtractorLine.getQuad"),
                d.sendWithPromise("TextExtractorLine.getQuad", { line: this }).then(function (e) {
                  return (
                    (t.yieldFunction = void 0),
                    new d.QuadPoint(
                      e.result.p1x,
                      e.result.p1y,
                      e.result.p2x,
                      e.result.p2y,
                      e.result.p3x,
                      e.result.p3y,
                      e.result.p4x,
                      e.result.p4y
                    )
                  )
                })
              )
            }),
            (d.TextExtractorWord.prototype.getBBox = function () {
              if (0 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'getBBox'. Expected 0 arguments. Function Signature: getBBox()"
                )
              if (void 0 !== this.yieldFunction)
                throw Error(
                  "Function " +
                    this.yieldFunction +
                    " recently altered a struct object without yielding. That object is now being accessed by function 'getBBox'. Perhaps a yield statement is required for " +
                    this.yieldFunction +
                    "?"
                )
              var t = this
              return (
                (this.yieldFunction = "TextExtractorWord.getBBox"),
                d.sendWithPromise("TextExtractorWord.getBBox", { tew: this }).then(function (e) {
                  return (
                    (t.yieldFunction = void 0),
                    new d.Rect(e.result.x1, e.result.y1, e.result.x2, e.result.y2, e.result.mp_rect)
                  )
                })
              )
            }),
            (d.TextExtractorWord.prototype.getQuad = function () {
              if (0 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'getQuad'. Expected 0 arguments. Function Signature: getQuad()"
                )
              if (void 0 !== this.yieldFunction)
                throw Error(
                  "Function " +
                    this.yieldFunction +
                    " recently altered a struct object without yielding. That object is now being accessed by function 'getQuad'. Perhaps a yield statement is required for " +
                    this.yieldFunction +
                    "?"
                )
              var t = this
              return (
                (this.yieldFunction = "TextExtractorWord.getQuad"),
                d.sendWithPromise("TextExtractorWord.getQuad", { tew: this }).then(function (e) {
                  return (
                    (t.yieldFunction = void 0),
                    new d.QuadPoint(
                      e.result.p1x,
                      e.result.p1y,
                      e.result.p2x,
                      e.result.p2y,
                      e.result.p3x,
                      e.result.p3y,
                      e.result.p4x,
                      e.result.p4y
                    )
                  )
                })
              )
            }),
            (d.TextExtractorWord.prototype.getGlyphQuad = function (e) {
              if (1 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'getGlyphQuad'. Expected 1 argument. Function Signature: getGlyphQuad(number)"
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'getGlyphQuad'. Promises require a 'yield' statement before being accessed."
                )
              if ("number" != typeof e)
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'getGlyphQuad' is of type '" +
                    c(e) +
                    "'. Expected type 'number'. Function Signature: getGlyphQuad(number)."
                )
              if (void 0 !== this.yieldFunction)
                throw Error(
                  "Function " +
                    this.yieldFunction +
                    " recently altered a struct object without yielding. That object is now being accessed by function 'getGlyphQuad'. Perhaps a yield statement is required for " +
                    this.yieldFunction +
                    "?"
                )
              var t = this
              return (
                (this.yieldFunction = "TextExtractorWord.getGlyphQuad"),
                d
                  .sendWithPromise("TextExtractorWord.getGlyphQuad", { tew: this, glyph_idx: e })
                  .then(function (e) {
                    return (
                      (t.yieldFunction = void 0),
                      new d.QuadPoint(
                        e.result.p1x,
                        e.result.p1y,
                        e.result.p2x,
                        e.result.p2y,
                        e.result.p3x,
                        e.result.p3y,
                        e.result.p4x,
                        e.result.p4y
                      )
                    )
                  })
              )
            }),
            (d.TextExtractorStyle.prototype.getColor = function () {
              if (0 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'getColor'. Expected 0 arguments. Function Signature: getColor()"
                )
              if (void 0 !== this.yieldFunction)
                throw Error(
                  "Function " +
                    this.yieldFunction +
                    " recently altered a struct object without yielding. That object is now being accessed by function 'getColor'. Perhaps a yield statement is required for " +
                    this.yieldFunction +
                    "?"
                )
              var t = this
              return (
                (this.yieldFunction = "TextExtractorStyle.getColor"),
                d.sendWithPromise("TextExtractorStyle.getColor", { tes: this }).then(function (e) {
                  return (t.yieldFunction = void 0), "0" == e ? null : new d.ColorPt(e)
                })
              )
            }),
            (d.TextExtractorWord.prototype.getString = function () {
              if (0 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'getString'. Expected 0 arguments. Function Signature: getString()"
                )
              if (void 0 !== this.yieldFunction)
                throw Error(
                  "Function " +
                    this.yieldFunction +
                    " recently altered a struct object without yielding. That object is now being accessed by function 'getString'. Perhaps a yield statement is required for " +
                    this.yieldFunction +
                    "?"
                )
              var t = this
              return (
                (this.yieldFunction = "TextExtractorWord.getString"),
                d.sendWithPromise("TextExtractorWord.getString", { tew: this }).then(function (e) {
                  return (t.yieldFunction = void 0), e
                })
              )
            }),
            (d.SecurityHandler.prototype.changeUserPasswordNonAscii = function (e) {
              if (1 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'changeUserPasswordNonAscii'. Expected 1 argument. Function Signature: changeUserPasswordNonAscii(string)"
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'changeUserPasswordNonAscii'. Promises require a 'yield' statement before being accessed."
                )
              if ("string" != typeof e)
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'changeUserPasswordNonAscii' is of type '" +
                    c(e) +
                    "'. Expected type 'string'. Function Signature: changeUserPasswordNonAscii(string)."
                )
              return d.sendWithPromise("SecurityHandler.changeUserPasswordNonAscii", {
                sh: this.id,
                password: e,
                pwd_length: e.length,
              })
            }),
            (d.SecurityHandler.prototype.changeMasterPasswordNonAscii = function (e) {
              if (1 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'changeMasterPasswordNonAscii'. Expected 1 argument. Function Signature: changeMasterPasswordNonAscii(string)"
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'changeMasterPasswordNonAscii'. Promises require a 'yield' statement before being accessed."
                )
              if ("string" != typeof e)
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'changeMasterPasswordNonAscii' is of type '" +
                    c(e) +
                    "'. Expected type 'string'. Function Signature: changeMasterPasswordNonAscii(string)."
                )
              return d.sendWithPromise("SecurityHandler.changeMasterPasswordNonAscii", {
                sh: this.id,
                password: e,
                pwd_length: e.length,
              })
            }),
            (d.SecurityHandler.prototype.initPassword = function (e) {
              if (1 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'initPassword'. Expected 1 argument. Function Signature: initPassword(string)"
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'initPassword'. Promises require a 'yield' statement before being accessed."
                )
              if ("string" != typeof e)
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'initPassword' is of type '" +
                    c(e) +
                    "'. Expected type 'string'. Function Signature: initPassword(string)."
                )
              return d.sendWithPromise("SecurityHandler.initPassword", { sh: this.id, password: e })
            }),
            (d.SecurityHandler.prototype.initPasswordNonAscii = function (e) {
              if (1 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'initPasswordNonAscii'. Expected 1 argument. Function Signature: initPasswordNonAscii(string)"
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'initPasswordNonAscii'. Promises require a 'yield' statement before being accessed."
                )
              if ("string" != typeof e)
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'initPasswordNonAscii' is of type '" +
                    c(e) +
                    "'. Expected type 'string'. Function Signature: initPasswordNonAscii(string)."
                )
              return d.sendWithPromise("SecurityHandler.initPasswordNonAscii", {
                sh: this.id,
                password: e,
                pwd_length: e.length,
              })
            }),
            (d.Element.prototype.getBBox = function () {
              if (0 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'getBBox'. Expected 0 arguments. Function Signature: getBBox()"
                )
              var t = this
              return (
                (this.yieldFunction = "Element.getBBox"),
                d.sendWithPromise("Element.getBBox", { e: this.id }).then(function (e) {
                  return (t.yieldFunction = void 0), new d.Rect(e)
                })
              )
            }),
            (d.Matrix2D.prototype.mult = function (e, t) {
              if (2 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'mult'. Expected 2 arguments. Function Signature: mult(number, number)"
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "1st input argument in function 'mult' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if ("number" != typeof e)
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'mult' is of type '" +
                    c(e) +
                    "'. Expected type 'number'. Function Signature: mult(number, number)."
                )
              if (t instanceof Promise)
                throw new TypeError(
                  "2nd input argument in function 'mult' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if ("number" != typeof t)
                throw new TypeError(
                  "2nd input argument '" +
                    t +
                    "' in function 'mult' is of type '" +
                    c(t) +
                    "'. Expected type 'number'. Function Signature: mult(number, number)."
                )
              if (void 0 !== this.yieldFunction)
                throw Error(
                  "Function " +
                    this.yieldFunction +
                    " recently altered a struct object without yielding. That object is now being accessed by function 'mult'. Perhaps a yield statement is required for " +
                    this.yieldFunction +
                    "?"
                )
              return d.sendWithPromise("Matrix2D.mult", { matrix: this, x: e, y: t })
            }),
            (d.Obj.prototype.getAsPDFText = function () {
              if (0 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'getAsPDFText'. Expected 0 arguments. Function Signature: getAsPDFText()"
                )
              return d.sendWithPromise("Obj.getAsPDFText", { o: this.id })
            }),
            (d.PDFDoc.prototype.initSecurityHandler = function (e) {
              if ((void 0 === e && (e = 0), 1 < arguments.length))
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'initSecurityHandler'. Expected at most 1 arguments. Function Signature: initSecurityHandler(void*)"
                )
              return d.sendWithPromise("PDFDoc.initSecurityHandler", {
                doc: this.id,
                custom_data: e,
              })
            }),
            (d.PDFDoc.prototype.initStdSecurityHandler =
              d.PDFDoc.prototype.initStdSecurityHandlerUString),
            (d.SDFDoc.prototype.initSecurityHandler = function (e) {
              if ((void 0 === e && (e = 0), 1 < arguments.length))
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'initSecurityHandler'. Expected at most 1 arguments. Function Signature: initSecurityHandler(void*)"
                )
              return d.sendWithPromise("SDFDoc.initSecurityHandler", {
                doc: this.id,
                custom_data: e,
              })
            }),
            (d.SDFDoc.prototype.initStdSecurityHandler =
              d.SDFDoc.prototype.initStdSecurityHandlerUString),
            (d.Image.createFromURL = function (t, e, n, i) {
              if (
                (void 0 === n && (n = new d.Obj("0")), arguments.length < 2 || 4 < arguments.length)
              )
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'createFromURL'. Expected 2 to 4 arguments. Function Signature: createFromURL(PDFDoc, string, Obj)"
                )
              if (t instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'createFromURL'. Promises require a 'yield' statement before being accessed."
                )
              if (!(t instanceof d.PDFDoc || t instanceof d.SDFDoc || t instanceof d.FDFDoc)) {
                if ("object" == c(t))
                  throw new TypeError(
                    "1st input argument in function 'createFromURL' is of type '" +
                      t.name +
                      "'. Expected type 'Page'. Function Signature: createFromURL(PDFDoc, string, Obj)."
                  )
                throw new TypeError(
                  "1st input argument '" +
                    t +
                    "' in function 'createFromURL' is of type '" +
                    c(t) +
                    "'. Expected type 'Page'. Function Signature: createFromURL(PDFDoc, string, Obj)."
                )
              }
              if (e instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'createFromURL'. Promises require a 'yield' statement before being accessed."
                )
              if ("string" != typeof e)
                throw new TypeError(
                  "2nd input argument '" +
                    e +
                    "' in function 'createFromURL' is of type '" +
                    c(e) +
                    "'. Expected type 'string'. Function Signature: createFromURL(PDFDoc, string, Obj)."
                )
              if (n instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'createFromURL'. Promises require a 'yield' statement before being accessed."
                )
              if (n instanceof d.Obj)
                return y(e, i).then(function (e) {
                  return d.Image.createFromMemory2(t, e, n)
                })
              if ("object" == c(n))
                throw new TypeError(
                  "3rd input argument in function 'createFromURL' is of type '" +
                    n.name +
                    "'. Expected type 'Obj'. Function Signature: createFromURL(PDFDoc, string, Obj)."
                )
              throw new TypeError(
                "3rd input argument '" +
                  n +
                  "' in function 'createFromURL' is of type '" +
                  c(n) +
                  "'. Expected type 'Obj'. Function Signature: createFromURL(PDFDoc, string, Obj)."
              )
            }),
            (d.PDFDoc.prototype.addStdSignatureHandlerFromURL = function (e, t) {
              if (2 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'addStdSignatureHandlerFromURL'. Expected 2 arguments. Function Signature: addStdSignatureHandlerFromURL(string, string)"
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "1st input argument in function 'addStdSignatureHandlerFromURL' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if ("string" != typeof e)
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'addStdSignatureHandlerFromURL' is of type '" +
                    c(e) +
                    "'. Expected type 'string'. Function Signature: addStdSignatureHandlerFromURL(string, string)."
                )
              if (t instanceof Promise)
                throw new TypeError(
                  "2nd input argument in function 'addStdSignatureHandlerFromURL' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if ("string" != typeof t)
                throw new TypeError(
                  "2nd input argument '" +
                    t +
                    "' in function 'addStdSignatureHandlerFromURL' is of type '" +
                    c(t) +
                    "'. Expected type 'string'. Function Signature: addStdSignatureHandlerFromURL(string, string)."
                )
              var n = this
              return y(e).then(function (e) {
                return n.addStdSignatureHandlerFromBufferWithDoc(e, t, n)
              })
            }),
            (d.PDFDoc.prototype.addStdSignatureHandlerFromBufferWithDoc = function (e, t, n) {
              if (3 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'addStdSignatureHandlerFromBuffer'. Expected 3 arguments. Function Signature: addStdSignatureHandlerFromBuffer(ArrayBuffer, string, PDFDoc)"
                )
              if (n instanceof Promise)
                throw new TypeError(
                  "1st input argument in function 'addStdSignatureHandlerFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "2nd input argument in function 'addStdSignatureHandlerFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if (!b.isArrayBuffer(e.buffer)) {
                if ("object" == c(e))
                  throw new TypeError(
                    "2nd input argument in function 'addStdSignatureHandlerFromBuffer' is of type '" +
                      e.name +
                      "'. Expected type 'ArrayBuffer'. Function Signature: addStdSignatureHandlerFromBuffer(ArrayBuffer, string, PDFDoc)."
                  )
                throw new TypeError(
                  "2nd input argument '" +
                    e +
                    "' in function 'addStdSignatureHandlerFromBuffer' is of type '" +
                    c(e) +
                    "'. Expected type 'ArrayBuffer'. Function Signature: addStdSignatureHandlerFromBuffer(ArrayBuffer, string, PDFDoc)."
                )
              }
              if (t instanceof Promise)
                throw new TypeError(
                  "3rd input argument in function 'addStdSignatureHandlerFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if ("string" != typeof t)
                throw new TypeError(
                  "3rd input argument '" +
                    t +
                    "' in function 'addStdSignatureHandlerFromBuffer' is of type '" +
                    c(t) +
                    "'. Expected type 'string'. Function Signature: addStdSignatureHandlerFromBuffer(ArrayBuffer, string, PDFDoc)."
                )
              return d.sendWithPromise("PDFDoc.addStdSignatureHandlerFromBuffer", {
                doc: n.id,
                pkcs12_buffer: e.buffer,
                pkcs12_pass: t,
              })
            }),
            (d.Filter.createFromMemory = function (e) {
              return (
                b.isArrayBuffer(e) || (e = e.buffer),
                d.sendWithPromise("filterCreateFromMemory", { buf: e }).then(function (e) {
                  return "0" == e
                    ? null
                    : ((e = new d.Filter(e)), g.push({ name: e.name, id: e.id }), e)
                })
              )
            }),
            (d.Filter.createURLFilter = function (e, t) {
              if (arguments.length < 1 || 2 < arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'createURLFilter'. Expected 1 to 2 arguments. Function Signature: createURLFilter(string, Obj)"
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "Received a Promise object in 1st input argument 'createURLFilter'. Promises require a 'yield' statement before being accessed."
                )
              if ("string" != typeof e)
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'createURLFilter' is of type '" +
                    c(e) +
                    "'. Expected type 'string'. Function Signature: createURLFilter(string, Obj)."
                )
              return y(e, t).then(function (e) {
                return d.Filter.createFromMemory(e)
              })
            }),
            (d.Filter.createFlateEncode = function (e, t, n) {
              if (
                (void 0 === e && (e = new d.Filter("0")),
                void 0 === t && (t = -1),
                void 0 === n && (n = 256),
                3 < arguments.length)
              )
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'createFlateEncode'. Expected at most 3 arguments. Function Signature: createFlateEncode(Filter, number, number)"
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "1st input argument in function 'createFlateEncode' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if (!(e instanceof d.Filter)) {
                if ("object" == c(e))
                  throw new TypeError(
                    "1st input argument in function 'createFlateEncode' is of type '" +
                      e.name +
                      "'. Expected type 'Filter'. Function Signature: createFlateEncode(Filter, number, number)."
                  )
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'createFlateEncode' is of type '" +
                    c(e) +
                    "'. Expected type 'Filter'. Function Signature: createFlateEncode(Filter, number, number)."
                )
              }
              if (t instanceof Promise)
                throw new TypeError(
                  "2nd input argument in function 'createFlateEncode' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if ("number" != typeof t)
                throw new TypeError(
                  "2nd input argument '" +
                    t +
                    "' in function 'createFlateEncode' is of type '" +
                    c(t) +
                    "'. Expected type 'number'. Function Signature: createFlateEncode(Filter, number, number)."
                )
              if (n instanceof Promise)
                throw new TypeError(
                  "3rd input argument in function 'createFlateEncode' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if ("number" != typeof n)
                throw new TypeError(
                  "3rd input argument '" +
                    n +
                    "' in function 'createFlateEncode' is of type '" +
                    c(n) +
                    "'. Expected type 'number'. Function Signature: createFlateEncode(Filter, number, number)."
                )
              return d
                .sendWithPromise("Filter.createFlateEncode", {
                  input_filter: e.id,
                  compression_level: t,
                  buf_sz: n,
                })
                .then(function (e) {
                  return "0" == e
                    ? null
                    : ((e = new d.Filter(e)), g.push({ name: e.name, id: e.id }), e)
                })
            }),
            (d.PDFDoc.prototype.importPages = function (e, t) {
              if ((void 0 === t && (t = !1), arguments.length < 1 || 2 < arguments.length))
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'importPages'. Expected 1 to 2 arguments. Function Signature: importPages(Array, boolean)"
                )
              if (e instanceof Promise)
                throw new TypeError(
                  "1st input argument in function 'importPages' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if (!(e instanceof Array)) {
                if ("object" == c(e))
                  throw new TypeError(
                    "1st input argument in function 'importPages' is of type '" +
                      e.name +
                      "'. Expected type 'Array'. Function Signature: importPages(Array, boolean)."
                  )
                throw new TypeError(
                  "1st input argument '" +
                    e +
                    "' in function 'importPages' is of type '" +
                    c(e) +
                    "'. Expected type 'Array'. Function Signature: importPages(Array, boolean)."
                )
              }
              if (t instanceof Promise)
                throw new TypeError(
                  "3rd input argument in function 'importPages' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if ("boolean" != typeof t)
                throw new TypeError(
                  "3rd input argument '" +
                    t +
                    "' in function 'importPages' is of type '" +
                    c(t) +
                    "'. Expected type 'boolean'. Function Signature: importPages(Array, boolean)."
                )
              return (
                (e = e.map(function (e) {
                  return e.id
                })),
                d
                  .sendWithPromise("PDFDoc.importPages", {
                    doc: this.id,
                    page_arr: e,
                    import_bookmarks: t,
                  })
                  .then(function (e) {
                    return e
                      ? e.map(function (e) {
                          return new d.Page(e)
                        })
                      : null
                  })
              )
            }),
            (d.SDFDoc.prototype.applyCustomQuery = function (e) {
              if (1 != arguments.length)
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'applyCustomQuery'. Expected only 1"
                )
              if ("object" != c(e))
                throw new TypeError(
                  "input argument '" + e + "' in function 'applyCustomQuery' must be an object"
                )
              return d
                .sendWithPromise("SDFDoc.applyCustomQuery", {
                  doc: this.id,
                  query: JSON.stringify(e),
                })
                .then(function (e) {
                  return JSON.parse(e)
                })
            }),
            d.PDFDoc.prototype.saveMemoryBuffer),
          C = d.PDFDoc.prototype.saveStream
        ;(d.PDFDoc.prototype.saveMemoryBuffer = function (e) {
          var t = this
          return Promise.resolve(t.documentCompletePromise).then(function () {
            return W.call(t, e)
          })
        }),
          (d.PDFDoc.prototype.saveStream = function (e) {
            var t = this
            return Promise.resolve(t.documentCompletePromise).then(function () {
              return C.call(t, e)
            })
          }),
          (d.PDFACompliance.createFromUrl = function (t, e, n, i, r, o, s) {
            if (arguments.length < 2 || 7 < arguments.length)
              throw new RangeError(
                arguments.length +
                  " arguments passed into function 'createFromUrl'. Expected 7 arguments. Function Signature: createFromUrl(convert, url, pwd, conform, excep, max_ref_objs, first_stop)"
              )
            if (
              (void 0 === n && (n = ""),
              void 0 === i && (i = d.PDFACompliance.Conformance.e_Level1B),
              void 0 === r && (r = new Int32Array(0)),
              void 0 === o && (o = 10),
              void 0 === s && (s = !1),
              t instanceof Promise)
            )
              throw new TypeError(
                "1st input argument in function 'createFromUrl' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if ("boolean" != typeof t)
              throw new TypeError(
                "1st input argument '" +
                  t +
                  "' in function 'createFromUrl' is of type '" +
                  c(t) +
                  "'. Expected type 'number'. Function Signature: createFromUrl(convert, url, pwd, conform, excep, max_ref_objs, first_stop)."
              )
            if (e instanceof Promise)
              throw new TypeError(
                "Received a Promise object in 1st input argument 'createFromURL'. Promises require a 'yield' statement before being accessed."
              )
            if ("string" != typeof e)
              throw new TypeError(
                "2nd input argument '" +
                  e +
                  "' in function 'createFromURL' is of type '" +
                  c(e) +
                  "'. Expected type 'string'. Function Signature: createFromURL(PDFDoc, string, Obj)."
              )
            if (n instanceof Promise)
              throw new TypeError(
                "3rd input argument in function 'createFromUrl' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if ("string" != typeof n)
              throw new TypeError(
                "3rd input argument '" +
                  n +
                  "' in function 'createFromUrl' is of type '" +
                  c(n) +
                  "'. Expected type 'string'. Function Signature: createFromUrl(convert, url, pwd, conform, excep, max_ref_objs, first_stop)."
              )
            if (i instanceof Promise)
              throw new TypeError(
                "4th input argument in function 'createFromUrl' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if ("number" != typeof i)
              throw new TypeError(
                "4th input argument '" +
                  i +
                  "' in function 'createFromUrl' is of type '" +
                  c(i) +
                  "'. Expected type 'number'. Function Signature: createFromUrl(convert, url, pwd, conform, excep, max_ref_objs, first_stop)."
              )
            if (r instanceof Promise)
              throw new TypeError(
                "5th input argument in function 'createFromUrl' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if (o instanceof Promise)
              throw new TypeError(
                "6th input argument in function 'createFromUrl' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if (s instanceof Promise)
              throw new TypeError(
                "7th input argument in function 'createFromUrl' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            return y(e).then(function (e) {
              return d.PDFACompliance.createFromBuffer(t, e, n, i, r, o, s)
            })
          }),
          (d.PDFACompliance.createFromBuffer = function (e, t, n, i, r, o, s) {
            void 0 === n && (n = ""),
              void 0 === i && (i = d.PDFACompliance.Conformance.e_Level1B),
              void 0 === r && (r = new Int32Array(0)),
              void 0 === o && (o = 10),
              void 0 === s && (s = !1)
            var u = t
            if (
              (b.isArrayBuffer(u) || (u = u.buffer), arguments.length < 2 || 7 < arguments.length)
            )
              throw new RangeError(
                arguments.length +
                  " arguments passed into function 'createFromBuffer'. Expected 7 arguments. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop)"
              )
            if (e instanceof Promise)
              throw new TypeError(
                "1st input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if ("boolean" != typeof e)
              throw new TypeError(
                "1st input argument '" +
                  e +
                  "' in function 'createFromBuffer' is of type '" +
                  c(e) +
                  "'. Expected type 'number'. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop)."
              )
            if (t instanceof Promise)
              throw new TypeError(
                "2nd input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if (!b.isArrayBuffer(u)) {
              if ("object" == c(t) && t.name)
                throw new TypeError(
                  "2nd input argument in function 'createFromBuffer' is of type '" +
                    t.name +
                    "'. Expected ArrayBuffer|TypedArray. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop)."
                )
              throw new TypeError(
                "2nd input argument '" +
                  t +
                  "' in function 'createFromBuffer' is of type '" +
                  c(t) +
                  "'. Expected ArrayBuffer|TypedArray. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop)."
              )
            }
            if (n instanceof Promise)
              throw new TypeError(
                "3rd input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if ("string" != typeof n)
              throw new TypeError(
                "3rd input argument '" +
                  n +
                  "' in function 'createFromBuffer' is of type '" +
                  c(n) +
                  "'. Expected type 'string'. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop)."
              )
            if (i instanceof Promise)
              throw new TypeError(
                "4th input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if ("number" != typeof i)
              throw new TypeError(
                "4th input argument '" +
                  i +
                  "' in function 'createFromBuffer' is of type '" +
                  c(i) +
                  "'. Expected type 'number'. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop)."
              )
            if (r instanceof Promise)
              throw new TypeError(
                "5th input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if (!b.isArrayBuffer(r.buffer)) {
              if ("object" == c(r))
                throw new TypeError(
                  "5th input argument in function 'createFromBuffer' is of type '" +
                    r.name +
                    "'. Expected typed array. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop)."
                )
              throw new TypeError(
                "5th input argument '" +
                  r +
                  "' in function 'createFromBuffer' is of type '" +
                  c(r) +
                  "'. Expected typed array. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop)."
              )
            }
            if (o instanceof Promise)
              throw new TypeError(
                "6th input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if ("number" != typeof o)
              throw new TypeError(
                "6th input argument '" +
                  o +
                  "' in function 'createFromBuffer' is of type '" +
                  c(o) +
                  "'. Expected type 'number'. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop)."
              )
            if (s instanceof Promise)
              throw new TypeError(
                "7th input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if ("boolean" != typeof s)
              throw new TypeError(
                "7th input argument '" +
                  s +
                  "' in function 'createFromBuffer' is of type '" +
                  c(s) +
                  "'. Expected type 'number'. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop)."
              )
            return d
              .sendWithPromise("pdfaComplianceCreateFromBuffer", {
                convert: e,
                buf: u,
                password: n,
                conform: i,
                excep: r.buffer,
                max_ref_objs: o,
                first_stop: s,
              })
              .then(function (e) {
                return (e = new d.PDFACompliance(e)), g.push({ name: e.name, id: e.id }), e
              })
          }),
          (d.PDFDoc.prototype.lock = function () {
            if (0 != arguments.length)
              throw new RangeError(
                arguments.length +
                  " arguments passed into function 'lock'. Expected 0 arguments. Function Signature: lock()"
              )
            return (
              s.push({ name: "PDFDoc", id: this.id, unlocktype: "unlock" }),
              d.sendWithPromise("PDFDoc.lock", { doc: this.id })
            )
          }),
          (d.PDFDoc.prototype.lockRead = function () {
            if (0 != arguments.length)
              throw new RangeError(
                arguments.length +
                  " arguments passed into function 'lockRead'. Expected 0 arguments. Function Signature: lockRead()"
              )
            return (
              s.push({ name: "PDFDoc", id: this.id, unlocktype: "unlockRead" }),
              d.sendWithPromise("PDFDoc.lockRead", { doc: this.id })
            )
          }),
          (d.PDFDoc.prototype.tryLock = function () {
            if (0 != arguments.length)
              throw new RangeError(
                arguments.length +
                  " arguments passed into function 'tryLock'. Expected 0 arguments. Function Signature: tryLock()"
              )
            var t = s.length
            return (
              s.push({ name: "PDFDoc", id: this.id, unlocktype: "unlock" }),
              d.sendWithPromise("PDFDoc.tryLock", { doc: this.id }).then(function (e) {
                e || s.splice(t, 1)
              })
            )
          }),
          (d.PDFDoc.prototype.timedLock = function (e) {
            if (1 < arguments.length)
              throw new RangeError(
                arguments.length +
                  " arguments passed into function 'timedLock'. Expected at most 1 arguments. Function Signature: timedLock(number)"
              )
            if (e instanceof Promise)
              throw new TypeError(
                "1st input argument in function 'timedLock' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if ("number" != typeof e)
              throw new TypeError(
                "1st input argument '" +
                  e +
                  "' in function 'timedLock' is of type '" +
                  c(e) +
                  "'. Expected type 'number'. Function Signature: timedLock(number)."
              )
            var t = s.length
            return (
              s.push({ name: "PDFDoc", id: this.id, unlocktype: "unlock" }),
              d
                .sendWithPromise("PDFDoc.timedLock", { doc: this.id, milliseconds: e })
                .then(function (e) {
                  e || s.splice(t, 1)
                })
            )
          }),
          (d.PDFDoc.prototype.tryLockRead = function () {
            if (0 != arguments.length)
              throw new RangeError(
                arguments.length +
                  " arguments passed into function 'tryLockRead'. Expected 0 arguments. Function Signature: tryLockRead()"
              )
            var t = s.length
            return (
              s.push({ name: "PDFDoc", id: this.id, unlocktype: "unlockRead" }),
              d.sendWithPromise("PDFDoc.tryLockRead", { doc: this.id }).then(function (e) {
                e || s.splice(t, 1)
              })
            )
          }),
          (d.PDFDoc.prototype.timedLockRead = function (e) {
            if (1 < arguments.length)
              throw new RangeError(
                arguments.length +
                  " arguments passed into function 'timedLockRead'. Expected at most 1 arguments. Function Signature: timedLockRead(number)"
              )
            if (e instanceof Promise)
              throw new TypeError(
                "1st input argument in function 'timedLockRead' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if ("number" != typeof e)
              throw new TypeError(
                "1st input argument '" +
                  e +
                  "' in function 'timedLockRead' is of type '" +
                  c(e) +
                  "'. Expected type 'number'. Function Signature: timedLockRead(number)."
              )
            var t = s.length
            return (
              s.push({ name: "PDFDoc", id: this.id, unlocktype: "unlockRead" }),
              d
                .sendWithPromise("PDFDoc.timedLockRead", { doc: this.id, milliseconds: e })
                .then(function (e) {
                  e || s.splice(t, 1)
                })
            )
          }),
          (d.hasFullApi = !0),
          (d.Optimizer.optimize = function (e, t) {
            if (arguments.length < 1 || 2 < arguments.length)
              throw new RangeError(
                arguments.length +
                  " arguments passed into function 'Optimizer.optimize'. Expected 1 to 2 arguments. Function Signature: optimize(PDFDoc, OptimizerSettings)"
              )
            if (e instanceof Promise)
              throw new TypeError(
                "1st input argument in function 'optimize' is a Promise object. Promises require a 'yield' statement before being accessed."
              )
            if (!(e instanceof d.PDFDoc || e instanceof d.SDFDoc || e instanceof d.FDFDoc)) {
              if ("object" == c(e))
                throw new TypeError(
                  "1st input argument in function 'optimize' is of type '" +
                    e.name +
                    "'. Expected type 'PDFDoc'. Function Signature: optimize(PDFDoc, OptimizerSettings)."
                )
              throw new TypeError(
                "1st input argument '" +
                  e +
                  "' in function 'optimize' is of type '" +
                  c(e) +
                  "'. Expected type 'PDFDoc'. Function Signature: optimize(PDFDoc, OptimizerSettings)."
              )
            }
            if (void 0 === t) t = new d.Optimizer.OptimizerSettings()
            else {
              if (t instanceof Promise)
                throw new TypeError(
                  "2nd input argument in function 'optimize' is a Promise object. Promises require a 'yield' statement before being accessed."
                )
              if ("object" !== c(t))
                throw new TypeError(
                  "2nd input argument in function 'optimize' is of type '" +
                    t.name +
                    "'. Expected type 'Object'. Function Signature: optimize(PDFDoc, OptimizerSettings)."
                )
            }
            return d.sendWithPromise("optimizerOptimize", {
              doc: e.id,
              color_image_settings: t.color_image_settings,
              grayscale_image_settings: t.grayscale_image_settings,
              mono_image_settings: t.mono_image_settings,
              text_settings: t.text_settings,
              remove_custom: t.remove_custom,
            })
          }),
          (d.VerificationOptions.prototype.addTrustedCertificateFromURL = function (e, t) {
            if (arguments.length < 1 || 2 < arguments.length)
              throw new RangeError(
                arguments.length +
                  " arguments passed into function 'addTrustedCertificateFromURL'. Expected 1 to 2 arguments. Function Signature: addTrustedCertificateFromURL(string, Obj)"
              )
            if (e instanceof Promise)
              throw new TypeError(
                "Received a Promise object in 1st input argument 'addTrustedCertificateFromURL'. Promises require a 'yield' statement before being accessed."
              )
            if ("string" != typeof e)
              throw new TypeError(
                "1st input argument '" +
                  e +
                  "' in function 'addTrustedCertificateFromURL' is of type '" +
                  c(e) +
                  "'. Expected type 'string'. Function Signature: addTrustedCertificateFromURL(string)."
              )
            var n = this
            return y(e, t).then(function (e) {
              return n.addTrustedCertificate(e)
            })
          }),
          (d.DigitalSignatureField.prototype.certifyOnNextSaveFromURL = function (e, t, n) {
            void 0 === n && (n = {}),
              h(arguments.length, 2, "certifyOnNextSaveFromURL", "(string, string, object)", [
                [e, "string"],
                [t, "string"],
                [n, "object"],
              ])
            var i = this
            return y(e, n).then(function (e) {
              return i.certifyOnNextSaveFromBuffer(e, t)
            })
          }),
          (d.DigitalSignatureField.prototype.signOnNextSaveFromURL = function (e, t, n) {
            void 0 === n && (n = {}),
              h(arguments.length, 2, "signOnNextSaveFromURL", "(string, string, object)", [
                [e, "string"],
                [t, "string"],
                [n, "object"],
              ])
            var i = this
            return y(e, n).then(function (e) {
              return i.signOnNextSaveFromBuffer(e, t)
            })
          }),
          (d.PDFRasterizer.prototype.rasterize = function (e, t, n, i, r, o, s, u, a) {
            return (
              void 0 === u && (u = null),
              void 0 === a && (a = null),
              h(
                arguments.length,
                7,
                "rasterize",
                "(PDFNet.Page, number, number, number, number, boolean, PDFNet.Matrix2D, PDFNet.Rect, PDFNet.Rect)",
                [
                  [e, "Object", d.Page, "Page"],
                  [t, "number"],
                  [n, "number"],
                  [i, "number"],
                  [r, "number"],
                  [o, "boolean"],
                  [s, "Structure", d.Matrix2D, "Matrix2D"],
                  [u, "Structure", d.Rect, "Rect"],
                  [a, "Structure", d.Rect, "Rect"],
                ]
              ),
              l("rasterize", [
                [s, 6],
                [u, 7],
                [a, 8],
              ]),
              d.sendWithPromise("PDFRasterizer.rasterize", {
                r: this.id,
                page: e.id,
                width: t,
                height: n,
                stride: i,
                num_comps: r,
                demult: o,
                device_mtx: s,
                clip: u,
                scrl_clp_regions: a,
              })
            )
          }),
          (d.ElementBuilder.prototype.createUnicodeTextRun = function (e) {
            return (
              h(arguments.length, 1, "createUnicodeTextRun", "(string)", [[e, "string"]]),
              d
                .sendWithPromise("ElementBuilder.createUnicodeTextRun", {
                  b: this.id,
                  text_data: e,
                })
                .then(function (e) {
                  return p(d.Element, e)
                })
            )
          }),
          (d.DigitalSignatureField.prototype.getCertPathsFromCMS = function () {
            return (
              u("getCertPathsFromCMS", this.yieldFunction),
              d
                .sendWithPromise("DigitalSignatureField.getCertPathsFromCMS", { self: this })
                .then(function (e) {
                  for (var t = [], n = 0; n < e.length; ++n) {
                    for (var i = e[n], r = [], o = 0; o < i.length; ++o) {
                      var s = i[o]
                      if ("0" === s) return null
                      ;(s = new d.X509Certificate(s)), r.push(s), g.push({ name: s.name, id: s.id })
                    }
                    t.push(r)
                  }
                  return t
                })
            )
          }),
          (d.Convert.office2PDF = function (e, t) {
            return d.Convert.office2PDFBuffer(e, t).then(function (e) {
              d.PDFDoc.createFromBuffer(e).then(function (e) {
                return e.initSecurityHandler(), e
              })
            })
          }),
          (d.PDFDoc.prototype.requirePage = function (e) {
            if (1 !== arguments.length)
              throw new RangeError(
                arguments.length +
                  " arguments passed into function 'requirePage'. Expected 1 argument. Function Signature: requirePage(number)"
              )
            if (e instanceof Promise)
              throw new TypeError(
                "Received a Promise object in 1st input argument 'requirePage'. Promises require a 'yield' statement before being accessed."
              )
            if ("number" != typeof e)
              throw new TypeError(
                "1st input argument '" +
                  e +
                  "' in function 'requirePage' is of type '" +
                  c(e) +
                  "'. Expected type 'number'. Function Signature: requirePage(number)."
              )
            if (e <= 0)
              throw Error(
                "1st input argument '" +
                  e +
                  "' in function 'requirePage' is invalid. Expected number between 1 and number of pages in the document."
              )
            return d.sendWithPromise("PDFDoc.RequirePage", { docId: this.id, pageNum: e })
          }),
          (d.beginOperation = function (e) {
            if (
              (void 0 === e ? (e = { allowMultipleInstances: !1 }) : e.allowMultipleInstances,
              0 < n && !e.allowMultipleInstances)
            )
              throw Error(
                "a previous instance of PDFNet.beginOperation() has been called without being terminated by PDFNet.finishOperation(). If this is intentional, pass in an options object with its parameter 'allowMultipleInstances' set to 'true' (ex. optObj={}; optObj.allowMultipleInstances=true; PDFNet.beginOperation(optObj));"
              )
            if (((n += 1), 1 < arguments.length))
              throw new RangeError(
                arguments.length +
                  " arguments passed into function 'beginOperation'. Expected 0 to 1 arguments. Function Signature: beginOperation(optObj = {})"
              )
            return d.sendWithPromise("BeginOperation", {})
          }),
          (d.finishOperation = function () {
            if (0 < n) {
              if ((--n, 0 != arguments.length))
                throw new RangeError(
                  arguments.length +
                    " arguments passed into function 'finishOperation'. Expected 0 arguments. Function Signature: finishOperation()"
                )
              return d.sendWithPromise("FinishOperation", {})
            }
          }),
          (d.runWithCleanup = function (e, t) {
            var n,
              i = !1,
              r = !1
            return (A = A.then(
              function () {},
              function () {}
            )
              .then(function () {
                return d.initialize(t)
              })
              .then(function () {
                return (i = !0), d.beginOperation()
              })
              .then(function () {
                return (r = !0), d.startDeallocateStack(), e()
              })
              .then(function (e) {
                return (n = e), (r = !1), d.endDeallocateStack()
              })
              .then(function () {
                if (((i = !1), d.finishOperation(), 0 < f))
                  throw Error(
                    'Detected not yet deallocated stack. You may have called "PDFNet.startDeallocateStack()" somewhere without calling "PDFNet.endDeallocateStack()" afterwards.'
                  )
                return n
              })
              .catch(function (e) {
                throw (r && d.endDeallocateStack(), i && d.finishOperation(), e)
              }))
          }),
          (d.runWithoutCleanup = function (e, t) {
            var n = !1
            return (A = A.then(
              function () {},
              function () {}
            )
              .then(function () {
                return d.initialize(t)
              })
              .then(function () {
                return (n = !0), d.beginOperation()
              })
              .then(function () {
                return e()
              })
              .then(function (e) {
                return (n = !1), d.finishOperation(), e
              })
              .catch(function (e) {
                throw (n && d.finishOperation(), e)
              }))
          }),
          (d.initialize = function (t, e) {
            var n, i
            return (
              S ||
                ((n = { emsWorkerError: function (e, t) {} }),
                (S = createPromiseCapability()),
                (i = function (e) {
                  b.Core.preloadPDFWorker(e, n),
                    b.Core.initPDFWorkerTransports(e, n, t).then(
                      function (e) {
                        ;(d.messageHandler = e.messageHandler), S.resolve()
                      },
                      function (e) {
                        S.reject(e)
                      }
                    )
                }),
                e && "auto" !== e
                  ? i(e)
                  : b.Core.getDefaultBackendType().then(i, function (e) {
                      S.reject(e)
                    })),
              S.promise
            )
          }),
          (b.Core.PDFNet = d)
      },
    ]),
    (i = {}),
    (r.m = n),
    (r.c = i),
    (r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n })
    }),
    (r.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 })
    }),
    (r.t = function (t, e) {
      if ((1 & e && (t = r(t)), 8 & e || (4 & e && "object" == typeof t && t && t.__esModule)))
        return t
      var n = Object.create(null)
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var i in t)
          r.d(
            n,
            i,
            function (e) {
              return t[e]
            }.bind(null, i)
          )
      return n
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default
            }
          : function () {
              return e
            }
      return r.d(t, "a", t), t
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (r.p = "/core/pdf/"),
    r((r.s = 0))
}.call(this || window)
