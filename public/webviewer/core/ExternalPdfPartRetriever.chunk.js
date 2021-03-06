/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [8],
    {
      390: function (ia, da, e) {
        e.r(da)
        var ba = e(1)
        ia = e(48)
        var ea = e(158),
          aa = e(351),
          ha = e(218),
          ca = window
        e = (function () {
          function e(e, y) {
            this.mS = function (e) {
              e = e.split(".")
              return e[e.length - 1].match(/(jpg|jpeg|png|gif)$/i)
            }
            y = y || {}
            this.url = e
            this.filename = y.filename || e
            this.Ue = y.customHeaders
            this.Cha = !!y.useDownloader
            this.withCredentials = !!y.withCredentials
          }
          e.prototype.IC = function (e) {
            this.Ue = e
          }
          e.prototype.getCustomHeaders = function () {
            return this.Ue
          }
          e.prototype.getFileData = function (w) {
            var y = this,
              r = this,
              n = new XMLHttpRequest(),
              h = 0 === this.url.indexOf("blob:") ? "blob" : "arraybuffer"
            n.open("GET", this.url, !0)
            n.withCredentials = this.withCredentials
            n.responseType = h
            this.Ue &&
              Object.keys(this.Ue).forEach(function (e) {
                n.setRequestHeader(e, y.Ue[e])
              })
            var f = /^https?:/i.test(this.url)
            n.addEventListener(
              "load",
              function (h) {
                return Object(ba.b)(this, void 0, void 0, function () {
                  var n, x, y, z, aa, ca
                  return Object(ba.d)(this, function (ba) {
                    switch (ba.label) {
                      case 0:
                        if (200 !== this.status && (f || 0 !== this.status)) return [3, 10]
                        r.trigger(e.Events.DOCUMENT_LOADING_PROGRESS, [h.loaded, h.loaded])
                        if ("blob" !== this.responseType) return [3, 4]
                        n = this.response
                        return r.mS(r.filename) ? [4, Object(ha.b)(n)] : [3, 2]
                      case 1:
                        return (
                          (x = ba.da()), (r.fileSize = x.byteLength), w(new Uint8Array(x)), [3, 3]
                        )
                      case 2:
                        ;(y = new FileReader()),
                          (y.onload = function (e) {
                            e = new Uint8Array(e.target.result)
                            r.fileSize = e.length
                            w(e)
                          }),
                          y.readAsArrayBuffer(n),
                          (ba.label = 3)
                      case 3:
                        return [3, 9]
                      case 4:
                        ba.Ci.push([4, 8, , 9])
                        z = new Uint8Array(this.response)
                        if (!r.mS(r.filename)) return [3, 6]
                        n = new Blob([z.buffer])
                        return [4, Object(ha.b)(n)]
                      case 5:
                        return (
                          (x = ba.da()), (r.fileSize = x.byteLength), w(new Uint8Array(x)), [3, 7]
                        )
                      case 6:
                        ;(r.fileSize = z.length), w(z), (ba.label = 7)
                      case 7:
                        return [3, 9]
                      case 8:
                        return (
                          ba.da(), r.trigger(e.Events.ERROR, ["pdfLoad", "Out of memory"]), [3, 9]
                        )
                      case 9:
                        return [3, 11]
                      case 10:
                        ;(aa = h.currentTarget),
                          (ca = Object(ea.b)(aa)),
                          r.trigger(e.Events.ERROR, [
                            "pdfLoad",
                            this.status + " " + aa.statusText,
                            ca,
                          ]),
                          (ba.label = 11)
                      case 11:
                        return (r.rx = null), [2]
                    }
                  })
                })
              },
              !1
            )
            n.onprogress = function (f) {
              r.trigger(e.Events.DOCUMENT_LOADING_PROGRESS, [f.loaded, 0 < f.total ? f.total : 0])
            }
            n.addEventListener(
              "error",
              function () {
                r.trigger(e.Events.ERROR, ["pdfLoad", "Network failure"])
                r.rx = null
              },
              !1
            )
            n.send()
            this.rx = n
          }
          e.prototype.getFile = function () {
            var e = this
            return new Promise(function (w) {
              ca.utils.isJSWorker && w(e.url)
              if (e.Cha) {
                var r = Object(ba.a)({ url: e.url }, e.Ue ? { customHeaders: e.Ue } : {})
                w(r)
              }
              w(null)
            })
          }
          e.prototype.abort = function () {
            this.rx && (this.rx.abort(), (this.rx = null))
          }
          e.Events = { DOCUMENT_LOADING_PROGRESS: "documentLoadingProgress", ERROR: "error" }
          return e
        })()
        Object(ia.a)(e)
        Object(aa.a)(e)
        Object(aa.b)(e)
        da["default"] = e
      },
    },
  ])
}.call(this || window))
