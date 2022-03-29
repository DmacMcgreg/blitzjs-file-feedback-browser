/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [22],
    {
      400: function (ia, da, e) {
        e.r(da)
        var ba = e(1),
          ea = e(12),
          aa = e(2)
        ia = e(48)
        var ha = e(29),
          ca = e(10)
        e = (function () {
          function e() {
            this.init()
          }
          e.prototype.init = function () {
            this.w2 = !1
            this.df = this.uk = this.connection = null
            this.Mq = {}
            this.fa = this.lD = null
          }
          e.prototype.oha = function (e) {
            for (var w = this, r = 0; r < e.length; ++r) {
              var n = e[r]
              switch (n.at) {
                case "create":
                  this.Mq[n.author] || (this.Mq[n.author] = n.aName)
                  this.P9(n)
                  break
                case "modify":
                  this.fa.Uk(n.xfdf).then(function (e) {
                    w.fa.Gb(e[0])
                  })
                  break
                case "delete":
                  this.fa.Uk("<delete><id>" + n.aId + "</id></delete>")
              }
            }
          }
          e.prototype.P9 = function (e) {
            var w = this
            this.fa.Uk(e.xfdf).then(function (r) {
              r = r[0]
              r.authorId = e.author
              w.fa.Gb(r)
              w.fa.trigger(ea.a.UPDATE_ANNOTATION_PERMISSION, [r])
            })
          }
          e.prototype.o9 = function (e, y, r) {
            this.uk && this.uk(e, y, r)
          }
          e.prototype.preloadAnnotations = function (e) {
            this.addEventListener(
              "webViewerServerAnnotationsEnabled",
              this.o9.bind(this, e, "add", { imported: !1 }),
              { once: !0 }
            )
          }
          e.prototype.initiateCollaboration = function (w, y, r) {
            var n = this
            if (w) {
              n.df = y
              n.fa = r.ta()
              r.addEventListener(ea.c.DOCUMENT_UNLOADED, function () {
                n.disableCollaboration()
              })
              n.Oha(w)
              var h = new XMLHttpRequest()
              h.addEventListener("load", function () {
                if (200 === h.status && 0 < h.responseText.length)
                  try {
                    var f = JSON.parse(h.responseText)
                    n.connection = exports.Ya.oia(Object(ha.j)(n.df, "blackbox/"), "annot")
                    n.lD = f.id
                    n.Mq[f.id] = f.user_name
                    n.fa.bK(f.id)
                    n.connection.IK(
                      function (e) {
                        e.t && e.t.startsWith("a_") && e.data && n.oha(e.data)
                      },
                      function () {
                        n.connection.send({ t: "a_retrieve", dId: w })
                        n.trigger(e.Events.WEBVIEWER_SERVER_ANNOTATIONS_ENABLED, [n.Mq[f.id], n.lD])
                      },
                      function () {
                        n.disableCollaboration()
                      }
                    )
                  } catch (x) {
                    Object(aa.f)(x.message)
                  }
              })
              h.open("GET", Object(ha.j)(this.df, "demo/SessionInfo.jsp"))
              h.withCredentials = !0
              h.send()
              n.w2 = !0
              n.fa.wV(function (e) {
                return n.Mq[e.Author] || e.Author
              })
            } else Object(aa.f)("Document ID required for collaboration")
          }
          e.prototype.disableCollaboration = function () {
            this.uk &&
              (this.fa.removeEventListener(ca.a.Events.ANNOTATION_CHANGED, this.uk),
              (this.uk = null))
            this.connection && this.connection.lG()
            this.fa && this.fa.bK("Guest")
            this.init()
            this.trigger(e.Events.WEBVIEWER_SERVER_ANNOTATIONS_DISABLED)
          }
          e.prototype.Oha = function (e) {
            var w = this
            this.uk && this.fa.removeEventListener(ca.a.Events.ANNOTATION_CHANGED, this.uk)
            this.uk = function (r, n, h) {
              return Object(ba.b)(this, void 0, void 0, function () {
                var f, x, y, z, aa, ca, da, ea, ha
                return Object(ba.d)(this, function (ba) {
                  switch (ba.label) {
                    case 0:
                      if (h.imported) return [2]
                      f = { t: "a_" + n, dId: e, annots: [] }
                      return [4, w.fa.qG()]
                    case 1:
                      x = ba.da()
                      "delete" !== n &&
                        ((y = new DOMParser().parseFromString(x, "text/xml")),
                        (z = new XMLSerializer()))
                      for (aa = 0; aa < r.length; aa++)
                        (ca = r[aa]),
                          (ea = da = void 0),
                          "add" === n
                            ? ((da = y.querySelector('[name="' + ca.Id + '"]')),
                              (ea = z.serializeToString(da)),
                              (ha = null),
                              ca.InReplyTo && (ha = w.fa.Mf(ca.InReplyTo).authorId || "default"),
                              f.annots.push({
                                at: "create",
                                aId: ca.Id,
                                author: w.lD,
                                aName: w.Mq[w.lD],
                                parent: ha,
                                xfdf: "<add>" + ea + "</add>",
                              }))
                            : "modify" === n
                            ? ((da = y.querySelector('[name="' + ca.Id + '"]')),
                              (ea = z.serializeToString(da)),
                              f.annots.push({
                                at: "modify",
                                aId: ca.Id,
                                xfdf: "<modify>" + ea + "</modify>",
                              }))
                            : "delete" === n && f.annots.push({ at: "delete", aId: ca.Id })
                      0 < f.annots.length && w.connection.send(f)
                      return [2]
                  }
                })
              })
            }.bind(w)
            this.fa.addEventListener(ca.a.Events.ANNOTATION_CHANGED, this.uk)
          }
          e.Events = {
            WEBVIEWER_SERVER_ANNOTATIONS_ENABLED: "webViewerServerAnnotationsEnabled",
            WEBVIEWER_SERVER_ANNOTATIONS_DISABLED: "webViewerServerAnnotationsDisabled",
          }
          return e
        })()
        Object(ia.a)(e)
        da["default"] = e
      },
    },
  ])
}.call(this || window))
