;(window.webpackJsonp = window.webpackJsonp || []).push([
  [72],
  {
    1159: function (e, _, o) {
      e.exports = (function (e) {
        "use strict"
        var _ = (function (e) {
            return e && "object" == typeof e && "default" in e ? e : { default: e }
          })(e),
          o = {
            name: "it-ch",
            weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"),
            months:
              "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split(
                "_"
              ),
            weekStart: 1,
            weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
            monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
            weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
            ordinal: function (e) {
              return e
            },
            formats: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
          }
        return _.default.locale(o, null, !0), o
      })(o(30))
    },
  },
])
//# sourceMappingURL=72.chunk.js.map
