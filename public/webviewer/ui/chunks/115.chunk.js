;(window.webpackJsonp = window.webpackJsonp || []).push([
  [115],
  {
    1202: function (t, _, r) {
      t.exports = (function (t) {
        "use strict"
        var _ = (function (t) {
            return t && "object" == typeof t && "default" in t ? t : { default: t }
          })(t),
          r = {
            name: "sq",
            weekdays: "E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),
            months:
              "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split(
                "_"
              ),
            weekStart: 1,
            weekdaysShort: "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
            monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
            weekdaysMin: "D_H_Ma_Më_E_P_Sh".split("_"),
            ordinal: function (t) {
              return t
            },
            formats: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            relativeTime: {
              future: "në %s",
              past: "%s më parë",
              s: "disa sekonda",
              m: "një minutë",
              mm: "%d minuta",
              h: "një orë",
              hh: "%d orë",
              d: "një ditë",
              dd: "%d ditë",
              M: "një muaj",
              MM: "%d muaj",
              y: "një vit",
              yy: "%d vite",
            },
          }
        return _.default.locale(r, null, !0), r
      })(r(30))
    },
  },
])
//# sourceMappingURL=115.chunk.js.map
