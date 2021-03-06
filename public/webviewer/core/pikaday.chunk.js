/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
;(function () {
  /*
 Pikaday

 Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/Pikaday/Pikaday
*/
  ;(window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [19],
    {
      384: function (ia, da) {
        !(function (e, ba) {
          if ("object" == typeof da) {
            try {
              var ea = require("moment")
            } catch (aa) {}
            ia.exports = ba(ea)
          } else
            "function" == typeof define && define.amd
              ? define(function (e) {
                  try {
                    ea = e("moment")
                  } catch (ha) {}
                  return ba(ea)
                })
              : (e.Pikaday = ba(e.moment))
        })(this, function (e) {
          function ba(f) {
            var h = this,
              r = h.config(f)
            h._onMouseDown = function (e) {
              if (h._v) {
                var f = (e = e || window.event).target || e.srcElement
                if (f)
                  if (
                    (fa(f, "is-disabled") ||
                      (!fa(f, "pika-button") || fa(f, "is-empty") || fa(f.parentNode, "is-disabled")
                        ? fa(f, "pika-prev")
                          ? h.prevMonth()
                          : fa(f, "pika-next") && h.nextMonth()
                        : (h.setDate(
                            new Date(
                              f.getAttribute("data-pika-year"),
                              f.getAttribute("data-pika-month"),
                              f.getAttribute("data-pika-day")
                            )
                          ),
                          r.bound &&
                            ra(function () {
                              h.hide()
                              r.blurFieldOnSelect && r.field && r.field.blur()
                            }, 100))),
                    fa(f, "pika-select"))
                  )
                    h._c = !0
                  else {
                    if (!e.preventDefault) return (e.returnValue = !1), !1
                    e.preventDefault()
                  }
              }
            }
            h._onChange = function (e) {
              var f = (e = e || window.event).target || e.srcElement
              f &&
                (fa(f, "pika-select-month")
                  ? h.gotoMonth(f.value)
                  : fa(f, "pika-select-year") && h.gotoYear(f.value))
            }
            h._onKeyChange = function (e) {
              if (((e = e || window.event), h.isVisible()))
                switch (e.keyCode) {
                  case 13:
                  case 27:
                    r.field && r.field.blur()
                    break
                  case 37:
                    e.preventDefault()
                    h.adjustDate("subtract", 1)
                    break
                  case 38:
                    h.adjustDate("subtract", 7)
                    break
                  case 39:
                    h.adjustDate("add", 1)
                    break
                  case 40:
                    h.adjustDate("add", 7)
                }
            }
            h._onInputChange = function (f) {
              var w
              f.firedBy !== h &&
                ((w = r.parse
                  ? r.parse(r.field.value, r.format)
                  : na
                  ? (w = e(r.field.value, r.format, r.formatStrict)) && w.isValid()
                    ? w.toDate()
                    : null
                  : new Date(Date.parse(r.field.value))),
                n(w) && h.setDate(w),
                h._v || h.show())
            }
            h._onInputFocus = function () {
              h.show()
            }
            h._onInputClick = function () {
              h.show()
            }
            h._onInputBlur = function () {
              var e = la.activeElement
              do if (fa(e, "pika-single")) return
              while ((e = e.parentNode))
              h._c ||
                (h._b = ra(function () {
                  h.hide()
                }, 50))
              h._c = !1
            }
            h._onClick = function (e) {
              var f = (e = e || window.event).target || e.srcElement
              if ((e = f)) {
                !pa &&
                  fa(f, "pika-select") &&
                  (f.onchange ||
                    (f.setAttribute("onchange", "return;"), ja(f, "change", h._onChange)))
                do if (fa(e, "pika-single") || e === r.trigger) return
                while ((e = e.parentNode))
                h._v && f !== r.trigger && e !== r.trigger && h.hide()
              }
            }
            h.el = la.createElement("div")
            h.el.className =
              "pika-single" + (r.isRTL ? " is-rtl" : "") + (r.theme ? " " + r.theme : "")
            ja(h.el, "mousedown", h._onMouseDown, !0)
            ja(h.el, "touchend", h._onMouseDown, !0)
            ja(h.el, "change", h._onChange)
            r.keyboardInput && ja(la, "keydown", h._onKeyChange)
            r.field &&
              (r.container
                ? r.container.appendChild(h.el)
                : r.bound
                ? la.body.appendChild(h.el)
                : r.field.parentNode.insertBefore(h.el, r.field.nextSibling),
              ja(r.field, "change", h._onInputChange),
              r.defaultDate ||
                (na && r.field.value
                  ? (r.defaultDate = e(r.field.value, r.format).toDate())
                  : (r.defaultDate = new Date(Date.parse(r.field.value))),
                (r.setDefaultDate = !0)))
            f = r.defaultDate
            n(f) ? (r.setDefaultDate ? h.setDate(f, !0) : h.gotoDate(f)) : h.gotoDate(new Date())
            r.bound
              ? (this.hide(),
                (h.el.className += " is-bound"),
                ja(r.trigger, "click", h._onInputClick),
                ja(r.trigger, "focus", h._onInputFocus),
                ja(r.trigger, "blur", h._onInputBlur))
              : this.show()
          }
          function ea(e, f, n, r, w, x) {
            var y,
              z,
              aa = e._o,
              ba = n === aa.minYear,
              ca = n === aa.maxYear,
              ea = '<div id="' + x + '" class="pika-title" role="heading" aria-live="assertive">',
              fa = !0,
              da = !0
            var ha = []
            for (x = 0; 12 > x; x++)
              ha.push(
                '<option value="' +
                  (n === w ? x - f : 12 + x - f) +
                  '"' +
                  (x === r ? ' selected="selected"' : "") +
                  ((ba && x < aa.minMonth) || (ca && x > aa.maxMonth)
                    ? 'disabled="disabled"'
                    : "") +
                  ">" +
                  aa.i18n.months[x] +
                  "</option>"
              )
            w =
              '<div class="pika-label">' +
              aa.i18n.months[r] +
              '<select class="pika-select pika-select-month" tabindex="-1">' +
              ha.join("") +
              "</select></div>"
            h(aa.yearRange)
              ? ((x = aa.yearRange[0]), (y = aa.yearRange[1] + 1))
              : ((x = n - aa.yearRange), (y = 1 + n + aa.yearRange))
            for (ha = []; x < y && x <= aa.maxYear; x++)
              x >= aa.minYear &&
                ha.push(
                  '<option value="' +
                    x +
                    '"' +
                    (x === n ? ' selected="selected"' : "") +
                    ">" +
                    x +
                    "</option>"
                )
            return (
              (z =
                '<div class="pika-label">' +
                n +
                aa.yearSuffix +
                '<select class="pika-select pika-select-year" tabindex="-1">' +
                ha.join("") +
                "</select></div>"),
              aa.showMonthAfterYear ? (ea += z + w) : (ea += w + z),
              ba && (0 === r || aa.minMonth >= r) && (fa = !1),
              ca && (11 === r || aa.maxMonth <= r) && (da = !1),
              0 === f &&
                (ea +=
                  '<button class="pika-prev' +
                  (fa ? "" : " is-disabled") +
                  '" type="button">' +
                  aa.i18n.previousMonth +
                  "</button>"),
              f === e._o.numberOfMonths - 1 &&
                (ea +=
                  '<button class="pika-next' +
                  (da ? "" : " is-disabled") +
                  '" type="button">' +
                  aa.i18n.nextMonth +
                  "</button>"),
              ea + "</div>"
            )
          }
          function aa(e, f, h, n) {
            return (
              '<tr class="pika-row' +
              (h ? " pick-whole-week" : "") +
              (n ? " is-selected" : "") +
              '">' +
              (f ? e.reverse() : e).join("") +
              "</tr>"
            )
          }
          function da(e) {
            var f = [],
              h = "false"
            if (e.isEmpty) {
              if (!e.showDaysInNextAndPreviousMonths) return '<td class="is-empty"></td>'
              f.push("is-outside-current-month")
              e.enableSelectionDaysInNextAndPreviousMonths || f.push("is-selection-disabled")
            }
            return (
              e.isDisabled && f.push("is-disabled"),
              e.isToday && f.push("is-today"),
              e.isSelected && (f.push("is-selected"), (h = "true")),
              e.hasEvent && f.push("has-event"),
              e.isInRange && f.push("is-inrange"),
              e.isStartRange && f.push("is-startrange"),
              e.isEndRange && f.push("is-endrange"),
              '<td data-day="' +
                e.day +
                '" class="' +
                f.join(" ") +
                '" aria-selected="' +
                h +
                '"><button class="pika-button pika-day" type="button" data-pika-year="' +
                e.year +
                '" data-pika-month="' +
                e.month +
                '" data-pika-day="' +
                e.day +
                '">' +
                e.day +
                "</button></td>"
            )
          }
          function ca(e, f, h) {
            for (f += e.firstDay; 7 <= f; ) f -= 7
            return h ? e.i18n.weekdaysShort[f] : e.i18n.weekdays[f]
          }
          function z(e) {
            return (
              0 > e.month && ((e.year -= Math.ceil(Math.abs(e.month) / 12)), (e.month += 12)),
              11 < e.month && ((e.year += Math.floor(Math.abs(e.month) / 12)), (e.month -= 12)),
              e
            )
          }
          function w(e, f, h) {
            var n
            la.createEvent
              ? ((n = la.createEvent("HTMLEvents")).initEvent(f, !0, !1),
                (n = y(n, h)),
                e.dispatchEvent(n))
              : la.createEventObject &&
                ((n = la.createEventObject()), (n = y(n, h)), e.fireEvent("on" + f, n))
          }
          function y(e, f, r) {
            var w, x
            for (w in f)
              (x = void 0 !== e[w]) &&
              "object" == typeof f[w] &&
              null !== f[w] &&
              void 0 === f[w].nodeName
                ? n(f[w])
                  ? r && (e[w] = new Date(f[w].getTime()))
                  : h(f[w])
                  ? r && (e[w] = f[w].slice(0))
                  : (e[w] = y({}, f[w], r))
                : (!r && x) || (e[w] = f[w])
            return e
          }
          function r(e) {
            n(e) && e.setHours(0, 0, 0, 0)
          }
          function n(e) {
            return /Date/.test(Object.prototype.toString.call(e)) && !isNaN(e.getTime())
          }
          function h(e) {
            return /Array/.test(Object.prototype.toString.call(e))
          }
          function f(e, f) {
            var h
            e.className = (h = (" " + e.className + " ").replace(" " + f + " ", " ")).trim
              ? h.trim()
              : h.replace(/^\s+|\s+$/g, "")
          }
          function x(e, f) {
            fa(e, f) || (e.className = "" === e.className ? f : e.className + " " + f)
          }
          function fa(e, f) {
            return -1 !== (" " + e.className + " ").indexOf(" " + f + " ")
          }
          function ia(e, f, h, n) {
            pa ? e.removeEventListener(f, h, !!n) : e.detachEvent("on" + f, h)
          }
          function ja(e, f, h, n) {
            pa ? e.addEventListener(f, h, !!n) : e.attachEvent("on" + f, h)
          }
          var na = "function" == typeof e,
            pa = !!window.addEventListener,
            la = window.document,
            ra = window.setTimeout,
            oa = {
              field: null,
              bound: void 0,
              ariaLabel: "Use the arrow keys to pick a date",
              position: "bottom left",
              reposition: !0,
              format: "YYYY-MM-DD",
              toString: null,
              parse: null,
              defaultDate: null,
              setDefaultDate: !1,
              firstDay: 0,
              formatStrict: !1,
              minDate: null,
              maxDate: null,
              yearRange: 10,
              showWeekNumber: !1,
              pickWholeWeek: !1,
              minYear: 0,
              maxYear: 9999,
              minMonth: void 0,
              maxMonth: void 0,
              startRange: null,
              endRange: null,
              isRTL: !1,
              yearSuffix: "",
              showMonthAfterYear: !1,
              showDaysInNextAndPreviousMonths: !1,
              enableSelectionDaysInNextAndPreviousMonths: !1,
              numberOfMonths: 1,
              mainCalendar: "left",
              container: void 0,
              blurFieldOnSelect: !0,
              i18n: {
                previousMonth: "Previous Month",
                nextMonth: "Next Month",
                months:
                  "January February March April May June July August September October November December".split(
                    " "
                  ),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                weekdaysShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
              },
              theme: null,
              events: [],
              onSelect: null,
              onOpen: null,
              onClose: null,
              onDraw: null,
              keyboardInput: !0,
            }
          return (
            (ba.prototype = {
              config: function (e) {
                this._o || (this._o = y({}, oa, !0))
                e = y(this._o, e, !0)
                e.isRTL = !!e.isRTL
                e.field = e.field && e.field.nodeName ? e.field : null
                e.theme = "string" == typeof e.theme && e.theme ? e.theme : null
                e.bound = !!(void 0 !== e.bound ? e.field && e.bound : e.field)
                e.trigger = e.trigger && e.trigger.nodeName ? e.trigger : e.field
                e.disableWeekends = !!e.disableWeekends
                e.disableDayFn = "function" == typeof e.disableDayFn ? e.disableDayFn : null
                var f = parseInt(e.numberOfMonths, 10) || 1
                ;((e.numberOfMonths = 4 < f ? 4 : f),
                n(e.minDate) || (e.minDate = !1),
                n(e.maxDate) || (e.maxDate = !1),
                e.minDate && e.maxDate && e.maxDate < e.minDate && (e.maxDate = e.minDate = !1),
                e.minDate && this.setMinDate(e.minDate),
                e.maxDate && this.setMaxDate(e.maxDate),
                h(e.yearRange))
                  ? ((f = new Date().getFullYear() - 10),
                    (e.yearRange[0] = parseInt(e.yearRange[0], 10) || f),
                    (e.yearRange[1] = parseInt(e.yearRange[1], 10) || f))
                  : ((e.yearRange = Math.abs(parseInt(e.yearRange, 10)) || oa.yearRange),
                    100 < e.yearRange && (e.yearRange = 100))
                return e
              },
              toString: function (f) {
                return (
                  (f = f || this._o.format),
                  n(this._d)
                    ? this._o.toString
                      ? this._o.toString(this._d, f)
                      : na
                      ? e(this._d).format(f)
                      : this._d.toDateString()
                    : ""
                )
              },
              getMoment: function () {
                return na ? e(this._d) : null
              },
              setMoment: function (f, h) {
                na && e.isMoment(f) && this.setDate(f.toDate(), h)
              },
              getDate: function () {
                return n(this._d) ? new Date(this._d.getTime()) : null
              },
              setDate: function (e, f) {
                if (!e)
                  return (
                    (this._d = null),
                    this._o.field &&
                      ((this._o.field.value = ""), w(this._o.field, "change", { firedBy: this })),
                    this.draw()
                  )
                if (("string" == typeof e && (e = new Date(Date.parse(e))), n(e))) {
                  var h = this._o.minDate,
                    x = this._o.maxDate
                  n(h) && e < h ? (e = h) : n(x) && e > x && (e = x)
                  this._d = new Date(e.getTime())
                  r(this._d)
                  this.gotoDate(this._d)
                  this._o.field &&
                    ((this._o.field.value = this.toString()),
                    w(this._o.field, "change", { firedBy: this }))
                  f ||
                    "function" != typeof this._o.onSelect ||
                    this._o.onSelect.call(this, this.getDate())
                }
              },
              gotoDate: function (e) {
                var f = !0
                if (n(e)) {
                  if (this.calendars) {
                    f = new Date(this.calendars[0].year, this.calendars[0].month, 1)
                    var h = new Date(
                        this.calendars[this.calendars.length - 1].year,
                        this.calendars[this.calendars.length - 1].month,
                        1
                      ),
                      r = e.getTime()
                    h.setMonth(h.getMonth() + 1)
                    h.setDate(h.getDate() - 1)
                    f = r < f.getTime() || h.getTime() < r
                  }
                  f &&
                    ((this.calendars = [{ month: e.getMonth(), year: e.getFullYear() }]),
                    "right" === this._o.mainCalendar &&
                      (this.calendars[0].month += 1 - this._o.numberOfMonths))
                  this.adjustCalendars()
                }
              },
              adjustDate: function (e, f) {
                var h,
                  n = this.getDate() || new Date()
                f = 864e5 * parseInt(f)
                "add" === e
                  ? (h = new Date(n.valueOf() + f))
                  : "subtract" === e && (h = new Date(n.valueOf() - f))
                this.setDate(h)
              },
              adjustCalendars: function () {
                this.calendars[0] = z(this.calendars[0])
                for (var e = 1; e < this._o.numberOfMonths; e++)
                  this.calendars[e] = z({
                    month: this.calendars[0].month + e,
                    year: this.calendars[0].year,
                  })
                this.draw()
              },
              gotoToday: function () {
                this.gotoDate(new Date())
              },
              gotoMonth: function (e) {
                isNaN(e) || ((this.calendars[0].month = parseInt(e, 10)), this.adjustCalendars())
              },
              nextMonth: function () {
                this.calendars[0].month++
                this.adjustCalendars()
              },
              prevMonth: function () {
                this.calendars[0].month--
                this.adjustCalendars()
              },
              gotoYear: function (e) {
                isNaN(e) || ((this.calendars[0].year = parseInt(e, 10)), this.adjustCalendars())
              },
              setMinDate: function (e) {
                e instanceof Date
                  ? (r(e),
                    (this._o.minDate = e),
                    (this._o.minYear = e.getFullYear()),
                    (this._o.minMonth = e.getMonth()))
                  : ((this._o.minDate = oa.minDate),
                    (this._o.minYear = oa.minYear),
                    (this._o.minMonth = oa.minMonth),
                    (this._o.startRange = oa.startRange))
                this.draw()
              },
              setMaxDate: function (e) {
                e instanceof Date
                  ? (r(e),
                    (this._o.maxDate = e),
                    (this._o.maxYear = e.getFullYear()),
                    (this._o.maxMonth = e.getMonth()))
                  : ((this._o.maxDate = oa.maxDate),
                    (this._o.maxYear = oa.maxYear),
                    (this._o.maxMonth = oa.maxMonth),
                    (this._o.endRange = oa.endRange))
                this.draw()
              },
              setStartRange: function (e) {
                this._o.startRange = e
              },
              setEndRange: function (e) {
                this._o.endRange = e
              },
              draw: function (e) {
                if (this._v || e) {
                  var f = this._o
                  var h = f.minYear
                  var n = f.maxYear,
                    r = f.minMonth,
                    w = f.maxMonth
                  e = ""
                  this._y <= h && ((this._y = h), !isNaN(r) && this._m < r && (this._m = r))
                  this._y >= n && ((this._y = n), !isNaN(w) && this._m > w && (this._m = w))
                  h =
                    "pika-title-" +
                    Math.random()
                      .toString(36)
                      .replace(/[^a-z]+/g, "")
                      .substr(0, 2)
                  for (n = 0; n < f.numberOfMonths; n++)
                    e +=
                      '<div class="pika-lendar">' +
                      ea(
                        this,
                        n,
                        this.calendars[n].year,
                        this.calendars[n].month,
                        this.calendars[0].year,
                        h
                      ) +
                      this.render(this.calendars[n].year, this.calendars[n].month, h) +
                      "</div>"
                  this.el.innerHTML = e
                  f.bound &&
                    "hidden" !== f.field.type &&
                    ra(function () {
                      f.trigger.focus()
                    }, 1)
                  "function" == typeof this._o.onDraw && this._o.onDraw(this)
                  f.bound && f.field.setAttribute("aria-label", f.ariaLabel)
                }
              },
              adjustPosition: function () {
                var e, h, n, r, w, y, z, aa, ba
                if (!this._o.container) {
                  if (
                    ((this.el.style.position = "absolute"),
                    (h = e = this._o.trigger),
                    (n = this.el.offsetWidth),
                    (r = this.el.offsetHeight),
                    (w = window.innerWidth || la.documentElement.clientWidth),
                    (y = window.innerHeight || la.documentElement.clientHeight),
                    (z = window.pageYOffset || la.body.scrollTop || la.documentElement.scrollTop),
                    (aa = !0),
                    (ba = !0),
                    "function" == typeof e.getBoundingClientRect)
                  ) {
                    var ca = (h = e.getBoundingClientRect()).left + window.pageXOffset
                    var ea = h.bottom + window.pageYOffset
                  } else
                    for (
                      ca = h.offsetLeft, ea = h.offsetTop + h.offsetHeight;
                      (h = h.offsetParent);

                    )
                      (ca += h.offsetLeft), (ea += h.offsetTop)
                  ;((this._o.reposition && ca + n > w) ||
                    (-1 < this._o.position.indexOf("right") && 0 < ca - n + e.offsetWidth)) &&
                    ((ca = ca - n + e.offsetWidth), (aa = !1))
                  ;((this._o.reposition && ea + r > y + z) ||
                    (-1 < this._o.position.indexOf("top") && 0 < ea - r - e.offsetHeight)) &&
                    ((ea = ea - r - e.offsetHeight), (ba = !1))
                  this.el.style.left = ca + "px"
                  this.el.style.top = ea + "px"
                  x(this.el, aa ? "left-aligned" : "right-aligned")
                  x(this.el, ba ? "bottom-aligned" : "top-aligned")
                  f(this.el, aa ? "right-aligned" : "left-aligned")
                  f(this.el, ba ? "top-aligned" : "bottom-aligned")
                }
              },
              render: function (e, f, h) {
                var w = this._o,
                  x = new Date(),
                  y = [
                    31,
                    (0 == e % 4 && 0 != e % 100) || 0 == e % 400 ? 29 : 28,
                    31,
                    30,
                    31,
                    30,
                    31,
                    31,
                    30,
                    31,
                    30,
                    31,
                  ][f],
                  z = new Date(e, f, 1).getDay(),
                  ba = [],
                  ea = []
                r(x)
                0 < w.firstDay && 0 > (z -= w.firstDay) && (z += 7)
                for (
                  var fa = 0 === f ? 11 : f - 1,
                    ha = 11 === f ? 0 : f + 1,
                    ia = 0 === f ? e - 1 : e,
                    ja = 11 === f ? e + 1 : e,
                    oa = [
                      31,
                      (0 == ia % 4 && 0 != ia % 100) || 0 == ia % 400 ? 29 : 28,
                      31,
                      30,
                      31,
                      30,
                      31,
                      31,
                      30,
                      31,
                      30,
                      31,
                    ][fa],
                    ua = y + z,
                    la = ua;
                  7 < la;

                )
                  la -= 7
                ua += 7 - la
                var ma, na, sa, pa
                la = !1
                for (var ra = 0, xa = 0; ra < ua; ra++) {
                  var ya = new Date(e, f, ra - z + 1),
                    Fa = !!n(this._d) && ya.getTime() === this._d.getTime(),
                    Sa = ya.getTime() === x.getTime(),
                    Qa = -1 !== w.events.indexOf(ya.toDateString()),
                    Ra = ra < z || ra >= y + z,
                    eb = ra - z + 1,
                    Mb = f,
                    Cb = e,
                    Nb = w.startRange && w.startRange.getTime() === ya.getTime(),
                    Hb = w.endRange && w.endRange.getTime() === ya.getTime(),
                    tb = w.startRange && w.endRange && w.startRange < ya && ya < w.endRange
                  Ra &&
                    (ra < z
                      ? ((eb = oa + eb), (Mb = fa), (Cb = ia))
                      : ((eb -= y), (Mb = ha), (Cb = ja)))
                  var ib
                  !(ib = (w.minDate && ya < w.minDate) || (w.maxDate && ya > w.maxDate)) &&
                    (ib = w.disableWeekends) &&
                    ((ib = ya.getDay()), (ib = 0 === ib || 6 === ib))
                  ya = {
                    day: eb,
                    month: Mb,
                    year: Cb,
                    hasEvent: Qa,
                    isSelected: Fa,
                    isToday: Sa,
                    isDisabled: ib || (w.disableDayFn && w.disableDayFn(ya)),
                    isEmpty: Ra,
                    isStartRange: Nb,
                    isEndRange: Hb,
                    isInRange: tb,
                    showDaysInNextAndPreviousMonths: w.showDaysInNextAndPreviousMonths,
                    enableSelectionDaysInNextAndPreviousMonths:
                      w.enableSelectionDaysInNextAndPreviousMonths,
                  }
                  w.pickWholeWeek && Fa && (la = !0)
                  ea.push(da(ya))
                  7 == ++xa &&
                    (w.showWeekNumber &&
                      ea.unshift(
                        ((ma = ra - z),
                        (na = f),
                        (sa = e),
                        (pa = void 0),
                        (pa = new Date(sa, 0, 1)),
                        '<td class="pika-week">' +
                          Math.ceil(((new Date(sa, na, ma) - pa) / 864e5 + pa.getDay() + 1) / 7) +
                          "</td>")
                      ),
                    ba.push(aa(ea, w.isRTL, w.pickWholeWeek, la)),
                    (ea = []),
                    (xa = 0),
                    (la = !1))
                }
                f = []
                w.showWeekNumber && f.push("<th></th>")
                for (e = 0; 7 > e; e++)
                  f.push(
                    '<th scope="col"><abbr title="' +
                      ca(w, e) +
                      '">' +
                      ca(w, e, !0) +
                      "</abbr></th>"
                  )
                w = "<thead><tr>" + (w.isRTL ? f.reverse() : f).join("") + "</tr></thead>"
                return (
                  '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' +
                  h +
                  '">' +
                  w +
                  ("<tbody>" + ba.join("") + "</tbody>") +
                  "</table>"
                )
              },
              isVisible: function () {
                return this._v
              },
              show: function () {
                this.isVisible() ||
                  ((this._v = !0),
                  this.draw(),
                  f(this.el, "is-hidden"),
                  this._o.bound && (ja(la, "click", this._onClick), this.adjustPosition()),
                  "function" == typeof this._o.onOpen && this._o.onOpen.call(this))
              },
              hide: function () {
                var e = this._v
                !1 !== e &&
                  (this._o.bound && ia(la, "click", this._onClick),
                  (this.el.style.position = "static"),
                  (this.el.style.left = "auto"),
                  (this.el.style.top = "auto"),
                  x(this.el, "is-hidden"),
                  (this._v = !1),
                  void 0 !== e &&
                    "function" == typeof this._o.onClose &&
                    this._o.onClose.call(this))
              },
              destroy: function () {
                var e = this._o
                this.hide()
                ia(this.el, "mousedown", this._onMouseDown, !0)
                ia(this.el, "touchend", this._onMouseDown, !0)
                ia(this.el, "change", this._onChange)
                e.keyboardInput && ia(la, "keydown", this._onKeyChange)
                e.field &&
                  (ia(e.field, "change", this._onInputChange),
                  e.bound &&
                    (ia(e.trigger, "click", this._onInputClick),
                    ia(e.trigger, "focus", this._onInputFocus),
                    ia(e.trigger, "blur", this._onInputBlur)))
                this.el.parentNode && this.el.parentNode.removeChild(this.el)
              },
            }),
            ba
          )
        })
      },
    },
  ])
}.call(this || window))
