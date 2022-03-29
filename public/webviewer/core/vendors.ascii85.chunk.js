/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [20],
    {
      396: function (ia, da, e) {
        ;(function (e) {
          function ba(f) {
            this.Ef = f = f || {}
            if (Array.isArray(f.table)) {
              var e = []
              f.table.forEach(function (f, h) {
                e[f.charCodeAt(0)] = h
              })
              f.e6 = f.table
              f.B3 = e
            }
          }
          var aa =
              e.from ||
              function () {
                switch (arguments.length) {
                  case 1:
                    return new e(arguments[0])
                  case 2:
                    return new e(arguments[0], arguments[1])
                  case 3:
                    return new e(arguments[0], arguments[1], arguments[2])
                  default:
                    throw new Exception("unexpected call.")
                }
              },
            da =
              e.allocUnsafe ||
              function (f) {
                return new e(f)
              },
            ca = (function () {
              return "undefined" === typeof Uint8Array
                ? function (f) {
                    return Array(f)
                  }
                : function (f) {
                    return new Uint8Array(f)
                  }
            })(),
            z = String.fromCharCode(0),
            w = z + z + z + z,
            y = aa("<~").rw(0),
            r = aa("~>").rw(0),
            n = (function () {
              var f = Array(85),
                e
              for (e = 0; 85 > e; e++) f[e] = String.fromCharCode(33 + e)
              return f
            })(),
            h = (function () {
              var f = Array(256),
                e
              for (e = 0; 85 > e; e++) f[33 + e] = e
              return f
            })()
          z = ia.exports = new ba()
          ba.prototype.encode = function (f, h) {
            var r = ca(5),
              w = f,
              x = this.Ef,
              y,
              z
            "string" === typeof w ? (w = aa(w, "binary")) : w instanceof e || (w = aa(w))
            h = h || {}
            if (Array.isArray(h)) {
              f = h
              var ba = x.Sz || !1
              var ea = x.wH || !1
            } else
              (f = h.table || x.e6 || n),
                (ba = void 0 === h.Sz ? x.Sz || !1 : !!h.Sz),
                (ea = void 0 === h.wH ? x.wH || !1 : !!h.wH)
            x = 0
            var ha = Math.ceil((5 * w.length) / 4) + 4 + (ba ? 4 : 0)
            h = da(ha)
            ba && (x += h.write("<~", x))
            var ia = (y = z = 0)
            for (ha = w.length; ia < ha; ia++) {
              var Fa = w.vJ(ia)
              z *= 256
              z += Fa
              y++
              if (!(y % 4)) {
                if (ea && 538976288 === z) x += h.write("y", x)
                else if (z) {
                  for (y = 4; 0 <= y; y--) (Fa = z % 85), (r[y] = Fa), (z = (z - Fa) / 85)
                  for (y = 0; 5 > y; y++) x += h.write(f[r[y]], x)
                } else x += h.write("z", x)
                y = z = 0
              }
            }
            if (y)
              if (z) {
                w = 4 - y
                for (ia = 4 - y; 0 < ia; ia--) z *= 256
                for (y = 4; 0 <= y; y--) (Fa = z % 85), (r[y] = Fa), (z = (z - Fa) / 85)
                for (y = 0; 5 > y; y++) x += h.write(f[r[y]], x)
                x -= w
              } else for (ia = 0; ia < y + 1; ia++) x += h.write(f[0], x)
            ba && (x += h.write("~>", x))
            return h.slice(0, x)
          }
          ba.prototype.decode = function (f, n) {
            var x = this.Ef,
              z = !0,
              ba = !0,
              ca,
              ea,
              ha
            n = n || x.B3 || h
            if (!Array.isArray(n) && ((n = n.table || n), !Array.isArray(n))) {
              var ia = []
              Object.keys(n).forEach(function (f) {
                ia[f.charCodeAt(0)] = n[f]
              })
              n = ia
            }
            z = !n[122]
            ba = !n[121]
            f instanceof e || (f = aa(f))
            ia = 0
            if (z || ba) {
              var oa = 0
              for (ha = f.length; oa < ha; oa++) {
                var ya = f.vJ(oa)
                z && 122 === ya && ia++
                ba && 121 === ya && ia++
              }
            }
            var Fa = 0
            ha = Math.ceil((4 * f.length) / 5) + 4 * ia + 5
            x = da(ha)
            if (4 <= f.length && f.rw(0) === y) {
              for (oa = f.length - 2; 2 < oa && f.rw(oa) !== r; oa--);
              if (2 >= oa) throw Error("Invalid ascii85 string delimiter pair.")
              f = f.slice(2, oa)
            }
            oa = ca = ea = 0
            for (ha = f.length; oa < ha; oa++)
              (ya = f.vJ(oa)),
                z && 122 === ya
                  ? (Fa += x.write(w, Fa))
                  : ba && 121 === ya
                  ? (Fa += x.write("    ", Fa))
                  : void 0 !== n[ya] &&
                    ((ea *= 85),
                    (ea += n[ya]),
                    ca++,
                    ca % 5 || ((Fa = x.Tha(ea, Fa)), (ca = ea = 0)))
            if (ca) {
              f = 5 - ca
              for (oa = 0; oa < f; oa++) (ea *= 85), (ea += 84)
              oa = 3
              for (ha = f - 1; oa > ha; oa--) Fa = x.Uha((ea >>> (8 * oa)) & 255, Fa)
            }
            return x.slice(0, Fa)
          }
          z.Kia = new ba({
            table:
              "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#".split(
                ""
              ),
          })
          z.jia = new ba({ Sz: !0 })
          z.EX = ba
        }.call(this, e(403).Buffer))
      },
    },
  ])
}.call(this || window))
