(function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a)
            return a(o, !0);
          if (i)
            return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND",
            f
        }
        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n ? n : e)
        }, l, l.exports, e, t, n, r)
      }
      return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)
      s(r[o]);
    return s
  }
)({
  "https://embed.runkit.com/app/embed.runkit.com/embed.runkit.com.js": [function(require, module, exports) {
    "use strict";
    var __hoisted_0 = function(t) {
      return "complete" === document.readyState ? t() : window.addEventListener("load", t)
    }
      , __hoisted_1 = function(t) {
      return /^data-env-/.test(t.name)
    }
      , __hoisted_2 = function(t) {
      return t.name.replace("data-env-", "").toLowerCase() + "=" + t.value
    }
      , __hoisted_3 = function() {
      function t() {
        window[i] && window[i]()
      }
      var e = scriptTag.getAttribute("data-element-id")
        , a = scriptTag.getAttribute("data-notebook-url")
        , i = scriptTag.getAttribute("data-load-callback")
        , r = scriptTag.getAttribute("data-node-version")
        , n = scriptTag.getAttribute("data-title")
        , o = scriptTag.getAttribute("data-preamble")
        , d = scriptTag.getAttribute("data-mode")
        , c = scriptTag.getAttribute("data-min-height")
        , s = scriptTag.getAttribute("data-package-timestamp")
        , u = scriptTag.getAttribute("data-tab-width")
        , g = (scriptTag.getAttribute("data-syntax-theme") || "").replace(/-syntax$/, "")
        , p = scriptTag.getAttribute("data-ui-theme")
        , l = scriptTag.getAttribute("data-theme") || ""
        , m = scriptTag.getAttribute("data-gutter-style")
        , b = scriptTag.getAttribute("data-evaluate-on-load")
        , T = [].filter.call(scriptTag.attributes, __hoisted_1).map(__hoisted_2);
      if (e || a) {
        var _ = e && document.getElementById(e)
          , h = scriptTag.hasAttribute("data-read-only");
        if (_) {
          var w = RunKit.sourceFromElement(_);
          _.innerHTML = ""
        } else
          _ = document.createElement("div"),
            _.className = "runkit-notebook-container",
            scriptTag.parentNode.replaceChild(_, scriptTag);
        RunKit.createNotebook({
          element: _,
          source: w,
          preamble: o,
          notebookURL: a,
          readOnly: h,
          env: T,
          mode: d,
          nodeVersion: r,
          title: n,
          onLoad: i && t,
          packageTimestamp: s,
          tabSize: u,
          syntaxTheme: g,
          uiTheme: p,
          theme: l,
          gutterStyle: m,
          minHeight: c,
          evaluateOnLoad: b
        })
      }
    };
    window.RunKit || window.Tonic || (window.RunKit = window.Tonic = require("./public-api"));
    var onLoad = __hoisted_0
      , scriptTag = require("./get-current-script-tag");
    onLoad(__hoisted_3);
  }
    , {
      "./get-current-script-tag": "https://embed.runkit.com/app/embed.runkit.com/get-current-script-tag.js",
      "./public-api": "https://embed.runkit.com/app/embed.runkit.com/public-api.js"
    }],
  "https://embed.runkit.com/app/embed.runkit.com/get-current-script-tag.js": [function(require, module, exports) {
    "use strict";
    var __hoisted_0 = function(t) {
      return t[t.length - 1]
    };
    module.exports = document.currentScript || __hoisted_0(document.getElementsByTagName("script"));
  }
    , {}],
  "https://embed.runkit.com/app/embed.runkit.com/notebook.js": [function(require, module, exports) {
    "use strict";
    function Notebook(e) {
      var t = this.name = "runkit-embed-" + (COUNTER++).toString();
      window.RunKit["$" + t] = this;
      var o = e.element
        , s = (e.source || "").trim()
        , i = e.readOnly
        , n = e.mode
        , r = e.nodeVersion
        , a = e.title
        , d = e.packageTimestamp
        , h = parseInt(e.minHeight, 10) + 30 || 124.25
        , _ = e.preamble
        , m = e.tabSize && parseInt(e.tabSize, 10)
        , p = e.minHeight
        , c = e.theme
        , u = e.syntaxTheme && e.syntaxTheme.replace(/-syntax$/, "")
        , l = e.uiTheme
        , g = "inside" === e.gutterStyle ? "inside" : "outside"
        , y = e.evaluateOnLoad
        , b = ["syntaxTheme", "uiTheme", "uiStyles", "styles"]
        , f = [];
      if (b.forEach(function(t) {
        e[t] && (f.push(t),
          logDeprecated("option", t, "theme", "https://runkit.com/docs/theme-maker"))
      }),
      "" !== s && (h = Math.max(18.75 * s.split("\n").length + 49.25, h)),
        d) {
        var k = new Date(parseInt(d, 10));
        isNaN(k) && (console.error("Ignoring invalid provided timestamp ('" + d + "'). Expected a UTC timestamp in milliseconds (e.g. '" + (new Date).getTime() + "')."),
          d = null)
      }
      var v = {
        name: t,
        preamble: (_ || "").trim(),
        location: window.location.toString(),
        readOnly: i,
        mode: n,
        nodeVersion: r,
        minHeight: p || "",
        title: a,
        packageTimestamp: d,
        tabSize: m,
        theme: c,
        syntaxTheme: u,
        uiTheme: l,
        gutterStyle: g,
        evaluateOnLoad: y,
        usedDeprecatedOptions: JSON.stringify(f)
      };
      s && window.btoa ? v.base64source = window.btoa(unescape(encodeURIComponent(s.trim()))) : v.source = (s || "").trim();
      var S = "?" + Object.keys(v).map(function(e) {
        if (void 0 !== v[e] && null !== v[e])
          return e + "=" + encodeURIComponent(v[e])
      }).filter(__hoisted_1).join("&");
      Array.isArray(e.env) && (S += "&" + e.env.map(__hoisted_2).join("&"));
      var M = this.iframe = document.createElement("iframe");
      if (M.src = scriptOrigin + "/e" + S,
        M.style.height = h + "px",
        M.style.width = "100%",
        M.style.padding = "0px",
        M.style.margin = "0px",
        M.style.border = "0px",
        M.style.backgroundColor = "transparent",
        M.frameBorder = "0",
        M.allowTransparency = "true",
        M.name = t,
        setIframeStylesForGutter(M, v.gutterStyle),
      !o instanceof Element)
        throw Error("You must provide a valid parent element for the embedded notebook.\nSee https://runkit.com/docs/embed for documentation.");
      o.appendChild(M),
        this.handleMessage = function(o) {
          try {
            if (o.origin !== scriptOrigin)
              return;
            var s = o.data;
            if (s.name === t)
              switch (s.event) {
                case "height":
                  M.style.height = s.height + "px";
                  break;
                case "loaded":
                  e.onLoad && e.onLoad(this);
                  break;
                case "url":
                  this.URL = s.shareableURL,
                    this.endpointURL = s.endpointURL,
                  e.onURLChanged && e.onURLChanged(this);
                  break;
                case "evaluate":
                  e.onEvaluate && e.onEvaluate();
                  break;
                case "callback":
                  var i = CALLBACKS[s.message_id];
                  delete CALLBACKS[s.message_id],
                    i(s.message)
              }
          } catch (e) {}
        }
          .bind(this),
        window.addEventListener("message", this.handleMessage)
    }
    function setIframeStylesForGutter(e, t) {
      e.style.width = "outside" === t ? "calc(100% + 200px)" : "100%",
        e.style.marginLeft = "outside" === t ? "calc(-100px)" : "0px"
    }
    function logDeprecated(e, t, o, s) {
      console.error("The " + e + " '" + t + "' has been deprecated in favor of '" + o + "'. Check out " + s + " for more information.")
    }
    function logDeprecatedMethod(e, t, o) {
      logDeprecated("method", e, t, o)
    }
    function deprecatedThemeMethod(e) {
      return function() {
        logDeprecatedMethod(e, "theme", "https://runkit.com/docs/theme-maker")
      }
    }
    var __hoisted_0 = function() {
      var e = document.createElement("a");
      e.href = tag.src;
      var t = e.host.split(".");
      return 3 === t.length && (t = t.slice(1)),
      "tonicdev" === t[0] && (t[0] = "runkit"),
      "https://" + t.join(".")
    }
      , __hoisted_1 = function(e) {
      return !!e
    }
      , __hoisted_2 = function(e) {
      return "env=" + encodeURIComponent(e)
    }
      , __hoisted_3 = function(e, t) {
      var o = MESSAGE_ID++;
      CALLBACKS[o] = t;
      var s = {
        name: this.name,
        message_id: o,
        message: e
      };
      this.iframe.contentWindow.postMessage(s, scriptOrigin)
    }
      , __hoisted_4 = function(e) {
      this._sendMessage({
        method: "get_source"
      }, e)
    }
      , __hoisted_5 = function(e, t) {
      this._sendMessage({
        method: "set_source",
        source: e
      }, t)
    }
      , __hoisted_6 = function(e, t) {
      this._sendMessage({
        method: "set_mode",
        mode: e
      }, t)
    }
      , __hoisted_7 = function(e, t) {
      this._sendMessage({
        method: "set_min_height",
        minHeight: e
      }, t)
    }
      , __hoisted_8 = function(e, t) {
      this._sendMessage({
        method: "set_node_version",
        nodeVersion: e
      }, t)
    }
      , __hoisted_9 = function(e, t) {
      this._sendMessage({
        method: "set_preamble",
        preamble: e
      }, t)
    }
      , __hoisted_10 = function(e) {
      this._sendMessage({
        method: "get_preamble"
      }, e)
    }
      , __hoisted_11 = function(e, t) {
      this._sendMessage({
        method: "get_theme",
        theme: e
      }, t)
    }
      , __hoisted_12 = function(e, t) {
      this._sendMessage({
        method: "set_theme",
        theme: e
      }, t)
    }
      , __hoisted_13 = function(e, t) {
      this._sendMessage({
        method: "set_ui_theme",
        uiTheme: e
      }, t)
    }
      , __hoisted_14 = function(e, t) {
      setIframeStylesForGutter(this.iframe, e),
        this._sendMessage({
          method: "set_gutter_style",
          gutterStyle: e
        }, t)
    }
      , __hoisted_15 = function(e) {
      this._sendMessage({
        method: "evaluate"
      }, e)
    }
      , __hoisted_16 = function() {
      this.iframe.remove(),
        window.removeEventListener("message", this.handleMessage),
        delete window.RunKit["$" + this.name]
    }
      , __hoisted_17 = function(e) {
      this._sendMessage({
        method: "get_shareable_url"
      }, e)
    }
      , tag = require("./get-current-script-tag")
      , scriptOrigin = __hoisted_0()
      , COUNTER = 0
      , MESSAGE_ID = 1
      , CALLBACKS = {};
    module.exports = Notebook,
      Notebook.prototype._sendMessage = __hoisted_3,
      Notebook.prototype.getSource = __hoisted_4,
      Notebook.prototype.setSource = __hoisted_5,
      Notebook.prototype.setMode = __hoisted_6,
      Notebook.prototype.setMinHeight = __hoisted_7,
      Notebook.prototype.setNodeVersion = __hoisted_8,
      Notebook.prototype.setPreamble = __hoisted_9,
      Notebook.prototype.getPreamble = __hoisted_10,
      Notebook.prototype.getTheme = __hoisted_11,
      Notebook.prototype.setTheme = __hoisted_12,
      Notebook.prototype.setSyntaxTheme = Notebook.prototype.setTheme,
      Notebook.prototype.setUITheme = __hoisted_13,
      Notebook.prototype.setGutterStyle = __hoisted_14,
      Notebook.prototype.evaluate = __hoisted_15,
      Notebook.prototype.destroy = __hoisted_16,
      Notebook.prototype.getShareableURL = __hoisted_17,
      Notebook.prototype.setSyntaxTheme = deprecatedThemeMethod("setSyntaxTheme"),
      Notebook.prototype.setUITheme = deprecatedThemeMethod("setUITheme"),
      Notebook.prototype.setUIStyles = deprecatedThemeMethod("setUIStyles"),
      Notebook.prototype.setStyles = deprecatedThemeMethod("setStyles");
  }
    , {
      "./get-current-script-tag": "https://embed.runkit.com/app/embed.runkit.com/get-current-script-tag.js"
    }],
  "https://embed.runkit.com/app/embed.runkit.com/public-api.js": [function(require, module, exports) {
    "use strict";
    var __hoisted_0 = function(e) {
      return new Notebook(e)
    }
      , __hoisted_1 = function(e) {
      var t = e.textContent || e.innerText || "";
      t = t.replace(/\r\n/g, "\n"),
        t = t.replace(/\r/g, "\n");
      for (var n = t.split("\n"); n.length && 0 === n[0].trim().length; )
        n.shift();
      var r = n.length > 0 && n[0].length - n[0].replace(/^\s+/, "").length;
      return n.map(function(e) {
        return e.substring(0, r).match(/[^\s]/) ? e : e.substring(r)
      }).join("\n")
    }
      , Notebook = require("./notebook");
    module.exports = {
      createNotebook: __hoisted_0,
      sourceFromElement: __hoisted_1
    };
  }
    , {
      "./notebook": "https://embed.runkit.com/app/embed.runkit.com/notebook.js"
    }]
}, {}, ["https://embed.runkit.com/app/embed.runkit.com/embed.runkit.com.js"]);

//# sourceMappingURL=embed.js.map
