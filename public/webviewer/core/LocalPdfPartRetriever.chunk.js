/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [11],
    {
      386: function (ia, da, e) {
        e.r(da)
        var ba = e(1)
        ia = e(48)
        var ea = e(351),
          aa = e(218),
          ha = e(21),
          ca = window
        e = (function () {
          function e(e) {
            var w = this
            this.u$ = function (e) {
              return (
                e &&
                ("image" === e.type.split("/")[0].toLowerCase() ||
                  (e.name && !!e.name.match(/.(jpg|jpeg|png|gif)$/i)))
              )
            }
            this.file = e
            this.H$ = new Promise(function (r) {
              return Object(ba.b)(w, void 0, void 0, function () {
                var n
                return Object(ba.d)(this, function (h) {
                  switch (h.label) {
                    case 0:
                      return this.u$(this.file) ? [4, Object(aa.b)(e)] : [3, 2]
                    case 1:
                      ;(n = h.da()),
                        (this.file = ha.o
                          ? new Blob([n], { type: e.type })
                          : new File([n], null === e || void 0 === e ? void 0 : e.name, {
                              type: e.type,
                            })),
                        (h.label = 2)
                    case 2:
                      return r(!0), [2]
                  }
                })
              })
            })
          }
          e.prototype.getFileData = function (w) {
            var y = this,
              r = new FileReader()
            r.onload = function (n) {
              y.trigger(e.Events.DOCUMENT_LOADING_PROGRESS, [n.loaded, n.loaded])
              w(new Uint8Array(n.target.result))
            }
            r.onprogress = function (n) {
              n.lengthComputable &&
                y.trigger(e.Events.DOCUMENT_LOADING_PROGRESS, [n.loaded, 0 < n.total ? n.total : 0])
            }
            r.readAsArrayBuffer(this.file)
          }
          e.prototype.getFile = function () {
            return Object(ba.b)(this, void 0, Promise, function () {
              return Object(ba.d)(this, function (e) {
                switch (e.label) {
                  case 0:
                    return [4, this.H$]
                  case 1:
                    return e.da(), ca.utils.isJSWorker ? [2, this.file.path] : [2, this.file]
                }
              })
            })
          }
          e.Events = { DOCUMENT_LOADING_PROGRESS: "documentLoadingProgress" }
          return e
        })()
        Object(ia.a)(e)
        Object(ea.a)(e)
        Object(ea.b)(e)
        da["default"] = e
      },
    },
  ])
}.call(this || window))
