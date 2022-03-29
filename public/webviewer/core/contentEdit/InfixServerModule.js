;(function () {
  ;(function (l) {
    function b(d) {
      if (g[d]) return g[d].exports
      var e = (g[d] = { i: d, l: !1, exports: {} })
      l[d].call(e.exports, e, e.exports, b)
      e.l = !0
      return e.exports
    }
    var g = {}
    b.m = l
    b.c = g
    b.d = function (d, e, k) {
      b.o(d, e) || Object.defineProperty(d, e, { enumerable: !0, get: k })
    }
    b.r = function (d) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(d, Symbol.toStringTag, { value: "Module" })
      Object.defineProperty(d, "__esModule", { value: !0 })
    }
    b.t = function (d, e) {
      e & 1 && (d = b(d))
      if (e & 8 || (e & 4 && "object" === typeof d && d && d.__esModule)) return d
      var k = Object.create(null)
      b.r(k)
      Object.defineProperty(k, "default", { enumerable: !0, value: d })
      if (e & 2 && "string" != typeof d)
        for (var g in d)
          b.d(
            k,
            g,
            function (e) {
              return d[e]
            }.bind(null, g)
          )
      return k
    }
    b.n = function (d) {
      var e =
        d && d.__esModule
          ? function () {
              return d["default"]
            }
          : function () {
              return d
            }
      b.d(e, "a", e)
      return e
    }
    b.o = function (d, e) {
      return Object.prototype.hasOwnProperty.call(d, e)
    }
    b.p = "/core/contentEdit"
    return b((b.s = 0))
  })([
    function (l, b, g) {
      l.exports = g(1)
    },
    function (l, b, g) {
      function d(a, d, c) {
        commandFName = "importCommand" + c + ".xml"
        FS.writeFile(commandFName, "<InfixServer>" + a + "</InfixServer>")
        p.ccall("wasmRunXML", "number", ["string", "string"], [commandFName, d])
        FS.unlink(commandFName)
      }
      function e() {
        1 == r ? postMessage({ cmd: "isReady" }) : setTimeout(e, 300)
      }
      function k(a, f, c, e, b) {
        f
          ? ((c = new Uint8Array(c)),
            (f = "inputFile" + a + ".pdf"),
            FS.writeFile(f, c),
            (e = new Uint8Array(e)),
            (e = new TextDecoder("utf-8").decode(e)),
            (exportedFName = "exported" + a + ".xml"),
            (objectFName = "objects" + a + ".xml"),
            (resultsFName = "results" + a + ".xml"),
            (c =
              '<Commands><Command Name="LoadPDF">' +
              ("<File>" + f + "</File></Command>") +
              '<Command Name="Page BBox"><StartPage>1</StartPage><EndPage>1</EndPage></Command>'),
            "" != e && (c += '<Command Name="AddTableBoxes">' + e + "</Command>"),
            (c =
              c +
              '<Command Name="Translate Export">' +
              ("<File>" + exportedFName + "</File><TransXML>coreTransXML.cfg</TransXML>")),
            (c =
              c +
              '<StartPage>1</StartPage><EndPage>1</EndPage></Command><Command Name="Edit Page">' +
              ("<Output>" + objectFName + "</Output><ImagesOnly/></Command>")),
            d(c, resultsFName, 1),
            (n = a),
            b &&
              ((b = FS.readFile(f).buffer),
              (f = FS.readFile(exportedFName).buffer),
              (e = FS.readFile(objectFName).buffer),
              (c = FS.readFile(resultsFName).buffer),
              FS.unlink(resultsFName),
              FS.unlink(exportedFName),
              FS.unlink(objectFName),
              (hasBeenExported = !0),
              postMessage(
                {
                  cmd: "exportFile",
                  pageNumber: a,
                  exportPerformed: !0,
                  pdfBuffer: b,
                  exportXML: f,
                  objectXML: e,
                  resultsXML: c,
                },
                [b, f, c]
              )))
          : postMessage({ cmd: "exportFile", pageNumber: a, exportPerformed: !1 })
      }
      var r = !1,
        n = -1,
        p = {
          noInitialRun: !0,
          onRuntimeInitialized: function () {
            r = !0
          },
        }
      self.Module = p
      importScripts("InfixServer.js")
      onmessage = function (a) {
        a = a.data
        switch (a.cmd) {
          case "isReady":
            e()
            break
          case "initialiseInfixServer":
            a = a.l
            p.callMain([""])
            p.ccall(
              "wasmInitInfixServer",
              "number",
              ["string", "string", "string"],
              ["infixcore.cfg", a, "results"]
            )
            a = FS.readFile("results").buffer
            postMessage({ cmd: "initialiseInfixServer", resultsXML: a }, [a])
            break
          case "exportFile":
            k(a.pageNumber, a.performExport, a.pdfFile, a.tableData, !0)
            break
          case "importText":
            var f = a.pdfFile,
              c = a.pageNumber,
              b = a.webFontURL,
              g = a.galleyId,
              m = a.tableData
            a = new Uint8Array(a.importData)
            var h = new TextDecoder("utf-8").decode(a)
            c != n && k(c, !0, f, m, !1)
            a = "editText" + c + ".xml"
            FS.writeFile(a, h)
            f = "outputFile" + c + ".pdf"
            m = resultsFName = "results" + c + ".xml"
            h =
              '<Commands><Command Name="Translate Import">' +
              ("<File>" + a + "</File><StartPage>1</StartPage><EndPage>LastPage</EndPage>") +
              '<AutoSubstitute/><AutoDeleteParas/><Fitting><Shrink><FontSize Min="0.65">true</FontSize><Leading>False</Leading></Shrink><Stretch><FontSize>False</FontSize>'
            h += "<Leading>False</Leading></Stretch></Fitting>"
            h += "<ResetLetterSpacing/><IgnoreFlightCheck/>"
            h += "<MissingFont>Noto Sans Regular</MissingFont><SubstituteAllChars/>"
            h += "<WebFontURL>" + b + "</WebFontURL>"
            h += "<TargetLang>en</TargetLang></Command>"
            h += '<Command Name="SavePDF"><File>' + f + "</File></Command>"
            h += '<Command Name="DumpObjectBBox"><GID>' + g + "</GID></Command></Commands>"
            d(h, m, c)
            b = FS.readFile(f).buffer
            m = FS.readFile(resultsFName).buffer
            FS.unlink(f)
            FS.unlink(resultsFName)
            FS.unlink(a)
            postMessage({ cmd: "importText", pageNumber: c, pdfBuffer: b, resultsXML: m, id: g }, [
              b,
              m,
            ])
            break
          case "transformObject":
            c = a.pageNumber
            g = a.objectID
            var l = a.isText
            b = a.topVal
            f = a.leftVal
            m = a.bottomVal
            h = a.rightVal
            var q = '<Commands><Command Name="TransformToRect">'
            c != n && k(c, !0, a.pdfFile, a.tableData, !1)
            a = "outputFile" + c + ".pdf"
            resultsFName = "results" + c + ".xml"
            l = !0 === l ? "<GID>" + g + "</GID>" : "<OID>" + g + "</OID>"
            q =
              q +
              l +
              ("<Rect><Top>" + b + "</Top><Left>" + f + "</Left>") +
              ("<Bottom>" + m + "</Bottom><Right>" + h + "</Right></Rect></Command>")
            q += '<Command Name="SavePDF"><File>' + a + "</File></Command>"
            d(
              q + ('<Command Name="DumpObjectBBox">' + l + "</Command></Commands>"),
              resultsFName,
              c
            )
            b = FS.readFile(a).buffer
            f = FS.readFile(resultsFName).buffer
            FS.unlink(a)
            FS.unlink(resultsFName)
            postMessage(
              { cmd: "transformObject", pageNumber: c, pdfBuffer: b, resultsXML: f, id: g },
              [b, f]
            )
            break
          case "deleteObject":
            ;(c = a.pageNumber),
              (g = a.objectID),
              (b = a.isText),
              c != n && k(c, !0, a.pdfFile, a.tableData, !1),
              (a = "outputFile" + c + ".pdf"),
              (resultsFName = "results" + c + ".xml"),
              (f = '<Commands><Command Name="DeleteObject">'),
              (f =
                (!0 === b
                  ? f + ("<GID>" + g + "</GID></Command>")
                  : f + ("<OID>" + g + "</OID></Command>")) +
                ('<Command Name="SavePDF"><File>' + a + "</File>") +
                "</Command></Commands>"),
              d(f, resultsFName, c),
              (b = FS.readFile(a).buffer),
              (f = FS.readFile(resultsFName).buffer),
              FS.unlink(a),
              FS.unlink(resultsFName),
              postMessage(
                { cmd: "deleteObject", pageNumber: c, pdfBuffer: b, resultsXML: f, id: g },
                [b, f]
              )
        }
      }
    },
  ])
}.call(this || window))
