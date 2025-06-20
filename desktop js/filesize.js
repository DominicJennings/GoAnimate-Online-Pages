/*!
 2022 Jason Mulligan <jason.mulligan@avoidwork.com>
 @version 8.0.7
*/
!function (i, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (i = "undefined" != typeof globalThis ? globalThis : i || self).filesize = t();
}(this, function () {
  "use strict";

  var i = /^(b|B)$/,
      t = {
    iec: {
      bits: ["bit", "Kibit", "Mibit", "Gibit", "Tibit", "Pibit", "Eibit", "Zibit", "Yibit"],
      bytes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
    },
    jedec: {
      bits: ["bit", "Kbit", "Mbit", "Gbit", "Tbit", "Pbit", "Ebit", "Zbit", "Ybit"],
      bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    }
  },
      e = {
    iec: ["", "kibi", "mebi", "gibi", "tebi", "pebi", "exbi", "zebi", "yobi"],
    jedec: ["", "kilo", "mega", "giga", "tera", "peta", "exa", "zetta", "yotta"]
  },
      o = {
    floor: Math.floor,
    ceil: Math.ceil
  };

  function n(n) {
    var r,
        a,
        b,
        s,
        l,
        c,
        f,
        d,
        p,
        u,
        h,
        B,
        g,
        y,
        M,
        m,
        v,
        x,
        N,
        T,
        j,
        E = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        w = [],
        P = 0;
    if (isNaN(n)) throw new TypeError("Invalid number");
    if (b = !0 === E.bits, M = !0 === E.unix, B = !0 === E.pad, a = E.base || 10, g = void 0 !== E.round ? E.round : M ? 1 : 2, f = void 0 !== E.locale ? E.locale : "", d = E.localeOptions || {}, m = void 0 !== E.separator ? E.separator : "", v = void 0 !== E.spacer ? E.spacer : M ? "" : " ", N = E.symbols || {}, x = 2 === a ? E.standard || "iec" : "jedec", h = E.output || "string", l = !0 === E.fullform, c = E.fullforms instanceof Array ? E.fullforms : [], r = void 0 !== E.exponent ? E.exponent : -1, T = o[E.roundingMethod] || Math.round, p = (u = Number(n)) < 0, s = a > 2 ? 1e3 : 1024, j = !1 === isNaN(E.precision) ? parseInt(E.precision, 10) : 0, p && (u = -u), (-1 === r || isNaN(r)) && (r = Math.floor(Math.log(u) / Math.log(s))) < 0 && (r = 0), r > 8 && (j > 0 && (j += 8 - r), r = 8), "exponent" === h) return r;
    if (0 === u) w[0] = 0, y = w[1] = M ? "" : t[x][b ? "bits" : "bytes"][r];else {
      P = u / (2 === a ? Math.pow(2, 10 * r) : Math.pow(1e3, r)), b && (P *= 8) >= s && r < 8 && (P /= s, r++);
      var k = Math.pow(10, r > 0 ? g : 0);
      w[0] = T(P * k) / k, w[0] === s && r < 8 && void 0 === E.exponent && (w[0] = 1, r++), y = w[1] = 10 === a && 1 === r ? b ? "kbit" : "kB" : t[x][b ? "bits" : "bytes"][r], M && (w[1] = w[1].charAt(0), i.test(w[1]) && (w[0] = Math.floor(w[0]), w[1] = ""));
    }

    if (p && (w[0] = -w[0]), j > 0 && (w[0] = w[0].toPrecision(j)), w[1] = N[w[1]] || w[1], !0 === f ? w[0] = w[0].toLocaleString() : f.length > 0 ? w[0] = w[0].toLocaleString(f, d) : m.length > 0 && (w[0] = w[0].toString().replace(".", m)), B && !1 === Number.isInteger(w[0]) && g > 0) {
      var G = m || ".",
          K = w[0].toString().split(G),
          S = K[1] || "",
          Y = S.length,
          Z = g - Y;
      w[0] = "".concat(K[0]).concat(G).concat(S.padEnd(Y + Z, "0"));
    }

    return l && (w[1] = c[r] ? c[r] : e[x][r] + (b ? "bit" : "byte") + (1 === w[0] ? "" : "s")), "array" === h ? w : "object" === h ? {
      value: w[0],
      symbol: w[1],
      exponent: r,
      unit: y
    } : w.join(v);
  }

  return n.partial = function (i) {
    return function (t) {
      return n(t, i);
    };
  }, n;
});