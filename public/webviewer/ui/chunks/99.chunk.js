;(window.webpackJsonp = window.webpackJsonp || []).push([
  [99],
  {
    1186: function (e, a, n) {
      e.exports = (function (e) {
        "use strict"
        var a = (function (e) {
            return e && "object" == typeof e && "default" in e ? e : { default: e }
          })(e),
          n = {
            name: "nl-be",
            weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
            months:
              "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split(
                "_"
              ),
            monthsShort: "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
            weekStart: 1,
            weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
            weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
            ordinal: function (e) {
              return e
            },
            formats: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            relativeTime: {
              future: "over %s",
              past: "%s geleden",
              s: "een paar seconden",
              m: "één minuut",
              mm: "%d minuten",
              h: "één uur",
              hh: "%d uur",
              d: "één dag",
              dd: "%d dagen",
              M: "één maand",
              MM: "%d maanden",
              y: "één jaar",
              yy: "%d jaar",
            },
          }
        return a.default.locale(n, null, !0), n
      })(n(30))
    },
  },
])
//# sourceMappingURL=99.chunk.js.map
