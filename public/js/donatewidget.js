(function () {
    var JSON;
    JSON || (JSON = {});
    (function () {
        function b(z) {
            return z < 10 ? "0" + z : z
        }

        function c(z) {
            v.lastIndex = 0;
            return v.test(z) ? '"' + z.replace(v, function (t) {
                var k = U[t];
                return typeof k === "string" ? k : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + z + '"'
        }

        function j(z, t) {
            var k, y, G, A, s = u,
                E, B = t[z];
            if (B && typeof B === "object" && typeof B.toJSON === "function") B = B.toJSON(z);
            if (typeof N === "function") B = N.call(t, z, B);
            switch (typeof B) {
            case "string":
                return c(B);
            case "number":
                return isFinite(B) ? String(B) : "null";
            case "boolean":
            case "null":
                return String(B);
            case "object":
                if (!B) return "null";
                u += O;
                E = [];
                if (Object.prototype.toString.apply(B) === "[object Array]") {
                    A = B.length;
                    for (k = 0; k < A; k += 1) E[k] = j(k, B) || "null";
                    G = E.length === 0 ? "[]" : u ? "[\n" + u + E.join(",\n" + u) + "\n" + s + "]" : "[" + E.join(",") + "]";
                    u = s;
                    return G
                }
                if (N && typeof N === "object") {
                    A = N.length;
                    for (k = 0; k < A; k += 1)
                        if (typeof N[k] === "string") {
                            y = N[k];
                            if (G = j(y, B)) E.push(c(y) + (u ? ": " : ":") + G)
                        }
                } else
                    for (y in B)
                        if (Object.prototype.hasOwnProperty.call(B, y))
                            if (G = j(y, B)) E.push(c(y) + (u ? ": " : ":") + G);
                G = E.length === 0 ? "{}" : u ? "{\n" + u + E.join(",\n" + u) + "\n" + s + "}" : "{" + E.join(",") +
                    "}";
                u = s;
                return G
            }
        }
        if (typeof Date.prototype.toJSON !== "function") {
            Date.prototype.toJSON = function () {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + b(this.getUTCMonth() + 1) + "-" + b(this.getUTCDate()) + "T" + b(this.getUTCHours()) + ":" + b(this.getUTCMinutes()) + ":" + b(this.getUTCSeconds()) + "Z" : null
            };
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
                return this.valueOf()
            }
        }
        var h = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            v = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            u, O, U = {
                "\u0008": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\u000c": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            N;
        if (typeof JSON.stringify !== "function") JSON.stringify = function (z, t, k) {
            var y;
            O = u = "";
            if (typeof k === "number")
                for (y = 0; y < k; y += 1) O += " ";
            else if (typeof k === "string") O = k;
            if ((N = t) && typeof t !== "function" && (typeof t !== "object" || typeof t.length !== "number")) throw Error("JSON.stringify");
            return j("", {
                "": z
            })
        };
        if (typeof JSON.parse !== "function") JSON.parse = function (z, t) {
            function k(G, A) {
                var s, E, B = G[A];
                if (B && typeof B === "object")
                    for (s in B)
                        if (Object.prototype.hasOwnProperty.call(B, s)) {
                            E = k(B, s);
                            if (E !== undefined) B[s] = E;
                            else delete B[s]
                        }
                return t.call(G, A, B)
            }
            var y;
            z = String(z);
            h.lastIndex = 0;
            if (h.test(z)) z = z.replace(h, function (G) {
                return "\\u" + ("0000" + G.charCodeAt(0).toString(16)).slice(-4)
            });
            if (/^[\],:{}\s]*$/.test(z.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                y = eval("(" + z + ")");
                return typeof t === "function" ? k({
                    "": y
                }, "") : y
            }
            throw new SyntaxError("JSON.parse");
        }
    })();
    (function (b, c, j, h, v, u) {
        function O(a, d) {
            var g = typeof a[d];
            return g == "function" || !!(g == "object" && a[d]) || g == "unknown"
        }

        function U() {
            if (!A(navigator.plugins) && typeof navigator.plugins["Shockwave Flash"] == "object") {
                var a = navigator.plugins["Shockwave Flash"].description;
                if (a && !A(navigator.mimeTypes) && navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) ea = a.match(/\d+/g)
            }
            if (!ea) {
                var d;
                try {
                    d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    ea = Array.prototype.slice.call(d.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/), 1)
                } catch (g) {}
            }
            if (!ea) return false;
            a = parseInt(ea[0], 10);
            d = parseInt(ea[1], 10);
            aa = a > 9 && d > 0;
            return true
        }

        function N() {
            if (!Y) {
                Y = true;
                for (var a = 0; a < T.length; a++) T[a]();
                T.length = 0
            }
        }

        function z(a, d) {
            Y ? a.call(d) : T.push(function () {
                a.call(d)
            })
        }

        function t() {
            var a = parent;
            if (l !== "")
                for (var d = 0, g = l.split("."); d < g.length; d++) a = a[g[d]];
            return a.easyXDM
        }

        function k(a) {
            var d = a.toLowerCase().match(D);
            a = d[2];
            var g = d[3];
            d = d[4] || "";
            if (a ==
                "http:" && d == ":80" || a == "https:" && d == ":443") d = "";
            return a + "//" + g + d
        }

        function y(a) {
            a = a.replace(f, "$1/");
            if (!a.match(/^(http||https):\/\//)) {
                var d = a.substring(0, 1) === "/" ? "" : j.pathname;
                if (d.substring(d.length - 1) !== "/") d = d.substring(0, d.lastIndexOf("/") + 1);
                a = j.protocol + "//" + j.host + d + a
            }
            for (; m.test(a);) a = a.replace(m, "");
            return a
        }

        function G(a, d) {
            var g = "",
                e = a.indexOf("#");
            if (e !== -1) {
                g = a.substring(e);
                a = a.substring(0, e)
            }
            e = [];
            for (var q in d) d.hasOwnProperty(q) && e.push(q + "=" + u(d[q]));
            return a + (M ? "#" : a.indexOf("?") ==
                -1 ? "?" : "&") + e.join("&") + g
        }

        function A(a) {
            return typeof a === "undefined"
        }

        function s(a, d, g) {
            var e, q;
            for (q in d)
                if (d.hasOwnProperty(q))
                    if (q in a) {
                        e = d[q];
                        if (typeof e === "object") s(a[q], e, g);
                        else g || (a[q] = d[q])
                    } else a[q] = d[q];
            return a
        }

        function E(a) {
            if (A($)) {
                var d = c.body.appendChild(c.createElement("form")),
                    g = d.appendChild(c.createElement("input"));
                g.name = Q + "TEST" + oa;
                $ = g !== d.elements[g.name];
                c.body.removeChild(d)
            }
            if ($) d = c.createElement('<iframe name="' + a.props.name + '"/>');
            else {
                d = c.createElement("IFRAME");
                d.name = a.props.name
            }
            d.id = d.name = a.props.name;
            delete a.props.name;
            if (typeof a.container == "string") a.container = c.getElementById(a.container);
            var e = a.replaceElement,
                q = e && e.parentNode;
            if (q) a.container = e.parentNode;
            if (!a.container && !q) {
                s(d.style, {
                    position: "absolute",
                    top: "-2000px",
                    left: "0px"
                });
                a.container = c.body
            }
            g = a.props.src;
            a.props.src = "javascript:false";
            s(d, a.props);
            d.border = d.frameBorder = 0;
            d.allowTransparency = true;
            q ? e.parentNode.replaceChild(d, e) : a.container.appendChild(d);
            a.onLoad && S(d, "load", a.onLoad);
            if (a.usePost) {
                e = a.container.appendChild(c.createElement("form"));
                e.target = d.name;
                e.action = g;
                e.method = "POST";
                if (typeof a.usePost === "object")
                    for (var p in a.usePost)
                        if (a.usePost.hasOwnProperty(p)) {
                            if ($) q = c.createElement('<input name="' + p + '"/>');
                            else {
                                q = c.createElement("INPUT");
                                q.name = p
                            }
                            q.value = a.usePost[p];
                            e.appendChild(q)
                        }
                e.submit();
                e.parentNode.removeChild(e)
            } else d.src = g;
            a.props.src = g;
            return d
        }

        function B(a) {
            var d = a.protocol,
                g;
            a.isHost = a.isHost || A(C.xdm_p);
            M = a.hash || false;
            if (!a.props) a.props = {};
            if (a.isHost) {
                a.remote =
                    y(a.remote);
                a.channel = a.channel || "default" + oa++;
                a.secret = Math.random().toString(16).substring(2);
                if (A(d)) d = k(j.href) == k(a.remote) ? "4" : O(b, "postMessage") || O(c, "postMessage") ? "1" : a.swf && O(b, "ActiveXObject") && U() ? "6" : navigator.product === "Gecko" && "frameElement" in b && navigator.userAgent.indexOf("WebKit") == -1 ? "5" : a.remoteHelper ? "2" : "0"
            } else {
                a.channel = C.xdm_c.replace(/["'<>\\]/g, "");
                a.secret = C.xdm_s;
                a.remote = C.xdm_e.replace(/["'<>\\]/g, "");
                d = C.xdm_p;
                var e;
                if (e = a.acl) {
                    a: {
                        e = a.acl;
                        var q = a.remote;
                        if (typeof e ==
                            "string") e = [e];
                        for (var p, w = e.length; w--;) {
                            p = e[w];
                            p = RegExp(p.substr(0, 1) == "^" ? p : "^" + p.replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$");
                            if (p.test(q)) {
                                e = true;
                                break a
                            }
                        }
                        e = false
                    }
                    e = !e
                }
                if (e) throw Error("Access denied for " + a.remote);
            }
            a.protocol = d;
            switch (d) {
            case "0":
                s(a, {
                    interval: 100,
                    delay: 2E3,
                    useResize: true,
                    useParent: false,
                    usePolling: false
                }, true);
                if (a.isHost) {
                    if (!a.local) {
                        d = j.protocol + "//" + j.host;
                        g = c.body.getElementsByTagName("img");
                        for (q = g.length; q--;) {
                            e = g[q];
                            if (e.src.substring(0, d.length) === d) {
                                a.local = e.src;
                                break
                            }
                        }
                        if (!a.local) a.local = b
                    }
                    d = {
                        xdm_c: a.channel,
                        xdm_p: 0
                    };
                    if (a.local === b) {
                        a.usePolling = true;
                        a.useParent = true;
                        a.local = j.protocol + "//" + j.host + j.pathname + j.search;
                        d.xdm_e = a.local;
                        d.xdm_pa = 1
                    } else d.xdm_e = y(a.local); if (a.container) {
                        a.useResize = false;
                        d.xdm_po = 1
                    }
                    a.remote = G(a.remote, d)
                } else s(a, {
                    channel: C.xdm_c,
                    remote: C.xdm_e,
                    useParent: !A(C.xdm_pa),
                    usePolling: !A(C.xdm_po),
                    useResize: a.useParent ? false : a.useResize
                });
                g = [new o.stack.HashTransport(a), new o.stack.ReliableBehavior({}), new o.stack.QueueBehavior({
                    encode: true,
                    maxLength: 4E3 - a.remote.length
                }), new o.stack.VerifyBehavior({
                    initiate: a.isHost
                })];
                break;
            case "1":
                g = [new o.stack.PostMessageTransport(a)];
                break;
            case "2":
                if (a.isHost) a.remoteHelper = y(a.remoteHelper);
                g = [new o.stack.NameTransport(a), new o.stack.QueueBehavior, new o.stack.VerifyBehavior({
                    initiate: a.isHost
                })];
                break;
            case "3":
                g = [new o.stack.NixTransport(a)];
                break;
            case "4":
                g = [new o.stack.SameOriginTransport(a)];
                break;
            case "5":
                g = [new o.stack.FrameElementTransport(a)];
                break;
            case "6":
                ea || U();
                g = [new o.stack.FlashTransport(a)]
            }
            g.push(new o.stack.QueueBehavior({
                lazy: a.lazy,
                remove: true
            }));
            return g
        }

        function W(a) {
            for (var d, g = {
                incoming: function (p, w) {
                    this.up.incoming(p, w)
                },
                outgoing: function (p, w) {
                    this.down.outgoing(p, w)
                },
                callback: function (p) {
                    this.up.callback(p)
                },
                init: function () {
                    this.down.init()
                },
                destroy: function () {
                    this.down.destroy()
                }
            }, e = 0, q = a.length; e < q; e++) {
                d = a[e];
                s(d, g, true);
                if (e !== 0) d.down = a[e - 1];
                if (e !== q - 1) d.up = a[e + 1]
            }
            return d
        }

        function ca(a) {
            a.up.down = a.down;
            a.down.up = a.up;
            a.up = a.down = null
        }
        var ba = this,
            oa = Math.floor(Math.random() * 1E4),
            ja = Function.prototype,
            D = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/,
            m = /[\-\w]+\/\.\.\//,
            f = /([^:])\/\//g,
            l = "",
            o = {},
            R = b.easyXDM,
            Q = "easyXDM_",
            $, M = false,
            ea, aa, S, Z;
        if (O(b, "addEventListener")) {
            S = function (a, d, g) {
                a.addEventListener(d, g, false)
            };
            Z = function (a, d, g) {
                a.removeEventListener(d, g, false)
            }
        } else if (O(b, "attachEvent")) {
            S = function (a, d, g) {
                a.attachEvent("on" + d, g)
            };
            Z = function (a, d, g) {
                a.detachEvent("on" + d, g)
            }
        } else throw Error("Browser not supported");
        var Y = false,
            T = [],
            fa;
        if ("readyState" in c) {
            fa = c.readyState;
            Y = fa == "complete" || ~navigator.userAgent.indexOf("AppleWebKit/") && (fa ==
                "loaded" || fa == "interactive")
        } else Y = !!c.body; if (!Y) {
            if (O(b, "addEventListener")) S(c, "DOMContentLoaded", N);
            else {
                S(c, "readystatechange", function () {
                    c.readyState == "complete" && N()
                });
                if (c.documentElement.doScroll && b === top) {
                    var ha = function () {
                        if (!Y) {
                            try {
                                c.documentElement.doScroll("left")
                            } catch (a) {
                                h(ha, 1);
                                return
                            }
                            N()
                        }
                    };
                    ha()
                }
            }
            S(b, "load", N)
        }
        var C = function (a) {
                a = a.substring(1).split("&");
                for (var d = {}, g, e = a.length; e--;) {
                    g = a[e].split("=");
                    d[g[0]] = v(g[1])
                }
                return d
            }(/xdm_e=/.test(j.search) ? j.search : j.hash),
            V = function () {
                var a = {},
                    d = {
                        a: [1, 2, 3]
                    };
                if (typeof JSON != "undefined" && typeof JSON.stringify === "function" && JSON.stringify(d).replace(/\s/g, "") === '{"a":[1,2,3]}') return JSON;
                if (Object.toJSON)
                    if (Object.toJSON(d).replace(/\s/g, "") === '{"a":[1,2,3]}') a.stringify = Object.toJSON;
                if (typeof String.prototype.evalJSON === "function") {
                    d = '{"a":[1,2,3]}'.evalJSON();
                    if (d.a && d.a.length === 3 && d.a[2] === 3) a.parse = function (g) {
                        return g.evalJSON()
                    }
                }
                if (a.stringify && a.parse) {
                    V = function () {
                        return a
                    };
                    return a
                }
                return null
            };
        s(o, {
            version: "2.4.19.3",
            query: C,
            stack: {},
            apply: s,
            getJSONObject: V,
            whenReady: z,
            noConflict: function (a) {
                b.easyXDM = R;
                if (l = a) Q = "easyXDM_" + l.replace(".", "_") + "_";
                return o
            }
        });
        o.DomHelper = {
            on: S,
            un: Z,
            requiresJSON: function (a) {
                typeof b.JSON == "object" && b.JSON || c.write('<script type="text/javascript" src="' + a + '"><\/script>')
            }
        };
        (function () {
            var a = {};
            o.Fn = {
                set: function (d, g) {
                    a[d] = g
                },
                get: function (d, g) {
                    if (a.hasOwnProperty(d)) {
                        var e = a[d];
                        g && delete a[d];
                        return e
                    }
                }
            }
        })();
        o.Socket = function (a) {
            var d = W(B(a).concat([{
                    incoming: function (e, q) {
                        a.onMessage(e, q)
                    },
                    callback: function (e) {
                        if (a.onReady) a.onReady(e)
                    }
                }])),
                g = k(a.remote);
            this.origin = k(a.remote);
            this.destroy = function () {
                d.destroy()
            };
            this.postMessage = function (e) {
                d.outgoing(e, g)
            };
            d.init()
        };
        o.Rpc = function (a, d) {
            if (d.local)
                for (var g in d.local)
                    if (d.local.hasOwnProperty(g)) {
                        var e = d.local[g];
                        if (typeof e === "function") d.local[g] = {
                            method: e
                        }
                    }
            var q = W(B(a).concat([new o.stack.RpcBehavior(this, d), {
                callback: function (p) {
                    if (a.onReady) a.onReady(p)
                }
            }]));
            this.origin = k(a.remote);
            this.destroy = function () {
                q.destroy()
            };
            q.init()
        };
        o.stack.SameOriginTransport = function (a) {
            var d, g, e, q;
            return d = {
                outgoing: function (p, w, J) {
                    e(p);
                    J && J()
                },
                destroy: function () {
                    if (g) {
                        g.parentNode.removeChild(g);
                        g = null
                    }
                },
                onDOMReady: function () {
                    q = k(a.remote);
                    if (a.isHost) {
                        s(a.props, {
                            src: G(a.remote, {
                                xdm_e: j.protocol + "//" + j.host + j.pathname,
                                xdm_c: a.channel,
                                xdm_p: 4
                            }),
                            name: Q + a.channel + "_provider"
                        });
                        g = E(a);
                        o.Fn.set(a.channel, function (p) {
                            e = p;
                            h(function () {
                                d.up.callback(true)
                            }, 0);
                            return function (w) {
                                d.up.incoming(w, q)
                            }
                        })
                    } else {
                        e = t().Fn.get(a.channel, true)(function (p) {
                            d.up.incoming(p,
                                q)
                        });
                        h(function () {
                            d.up.callback(true)
                        }, 0)
                    }
                },
                init: function () {
                    z(d.onDOMReady, d)
                }
            }
        };
        o.stack.FlashTransport = function (a) {
            function d(K) {
                h(function () {
                    e.up.incoming(K, p)
                }, 0)
            }

            function g(K) {
                var n = a.swf + "?host=" + a.isHost,
                    I = "easyXDM_swf_" + Math.floor(Math.random() * 1E4);
                o.Fn.set("flash_loaded" + K.replace(/[\-.]/g, "_"), function () {
                    o.stack.FlashTransport[K].swf = w = J.firstChild;
                    for (var F = o.stack.FlashTransport[K].queue, H = 0; H < F.length; H++) F[H]();
                    F.length = 0
                });
                if (a.swfContainer) J = typeof a.swfContainer == "string" ? c.getElementById(a.swfContainer) :
                    a.swfContainer;
                else {
                    J = c.createElement("div");
                    s(J.style, aa && a.swfNoThrottle ? {
                        height: "20px",
                        width: "20px",
                        position: "fixed",
                        right: 0,
                        top: 0
                    } : {
                        height: "1px",
                        width: "1px",
                        position: "absolute",
                        overflow: "hidden",
                        right: 0,
                        top: 0
                    });
                    c.body.appendChild(J)
                }
                var L = "callback=flash_loaded" + u(K.replace(/[\-.]/g, "_")) + "&proto=" + ba.location.protocol + "&domain=" + u(ba.location.href.match(D)[3]) + "&port=" + u(ba.location.href.match(D)[4] || "") + "&ns=" + u(l);
                J.innerHTML = "<object height='20' width='20' type='application/x-shockwave-flash' id='" +
                    I + "' data='" + n + "'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='" + n + "'></param><param name='flashvars' value='" + L + "'></param><embed type='application/x-shockwave-flash' FlashVars='" + L + "' allowScriptAccess='always' wmode='transparent' src='" + n + "' height='1' width='1'></embed></object>"
            }
            var e, q, p, w, J;
            return e = {
                outgoing: function (K, n, I) {
                    w.postMessage(a.channel, K.toString());
                    I && I()
                },
                destroy: function () {
                    try {
                        w.destroyChannel(a.channel)
                    } catch (K) {}
                    w =
                        null;
                    if (q) {
                        q.parentNode.removeChild(q);
                        q = null
                    }
                },
                onDOMReady: function () {
                    p = a.remote;
                    o.Fn.set("flash_" + a.channel + "_init", function () {
                        h(function () {
                            e.up.callback(true)
                        })
                    });
                    o.Fn.set("flash_" + a.channel + "_onMessage", d);
                    a.swf = y(a.swf);
                    var K = a.swf.match(D)[3],
                        n = function () {
                            o.stack.FlashTransport[K].init = true;
                            w = o.stack.FlashTransport[K].swf;
                            w.createChannel(a.channel, a.secret, k(a.remote), a.isHost);
                            if (a.isHost) {
                                aa && a.swfNoThrottle && s(a.props, {
                                    position: "fixed",
                                    right: 0,
                                    top: 0,
                                    height: "20px",
                                    width: "20px"
                                });
                                s(a.props, {
                                    src: G(a.remote, {
                                        xdm_e: k(j.href),
                                        xdm_c: a.channel,
                                        xdm_p: 6,
                                        xdm_s: a.secret
                                    }),
                                    name: Q + a.channel + "_provider"
                                });
                                q = E(a)
                            }
                        };
                    if (o.stack.FlashTransport[K] && o.stack.FlashTransport[K].init) n();
                    else if (o.stack.FlashTransport[K]) o.stack.FlashTransport[K].queue.push(n);
                    else {
                        o.stack.FlashTransport[K] = {
                            queue: [n]
                        };
                        g(K)
                    }
                },
                init: function () {
                    z(e.onDOMReady, e)
                }
            }
        };
        o.stack.PostMessageTransport = function (a) {
            function d(w) {
                var J;
                if (w.origin) J = k(w.origin);
                else if (w.uri) J = k(w.uri);
                else if (w.domain) J = j.protocol + "//" + w.domain;
                else throw "Unable to retrieve the origin of the event";
                J == p && w.data.substring(0, a.channel.length + 1) == a.channel + " " && g.up.incoming(w.data.substring(a.channel.length + 1), J)
            }
            var g, e, q, p;
            return g = {
                outgoing: function (w, J, K) {
                    q.postMessage(a.channel + " " + w, J || p);
                    K && K()
                },
                destroy: function () {
                    Z(b, "message", d);
                    if (e) {
                        q = null;
                        e.parentNode.removeChild(e);
                        e = null
                    }
                },
                onDOMReady: function () {
                    p = k(a.remote);
                    if (a.isHost) {
                        var w = function (J) {
                            if (J.data == a.channel + "-ready") {
                                q = "postMessage" in e.contentWindow ? e.contentWindow : e.contentWindow.document;
                                Z(b, "message", w);
                                S(b, "message", d);
                                h(function () {
                                        g.up.callback(true)
                                    },
                                    0)
                            }
                        };
                        S(b, "message", w);
                        s(a.props, {
                            src: G(a.remote, {
                                xdm_e: k(j.href),
                                xdm_c: a.channel,
                                xdm_p: 1
                            }),
                            name: Q + a.channel + "_provider"
                        });
                        e = E(a)
                    } else {
                        S(b, "message", d);
                        q = "postMessage" in b.parent ? b.parent : b.parent.document;
                        q.postMessage(a.channel + "-ready", p);
                        h(function () {
                            g.up.callback(true)
                        }, 0)
                    }
                },
                init: function () {
                    z(g.onDOMReady, g)
                }
            }
        };
        o.stack.FrameElementTransport = function (a) {
            var d, g, e, q;
            return d = {
                outgoing: function (p, w, J) {
                    e.call(this, p);
                    J && J()
                },
                destroy: function () {
                    if (g) {
                        g.parentNode.removeChild(g);
                        g = null
                    }
                },
                onDOMReady: function () {
                    q =
                        k(a.remote);
                    if (a.isHost) {
                        s(a.props, {
                            src: G(a.remote, {
                                xdm_e: k(j.href),
                                xdm_c: a.channel,
                                xdm_p: 5
                            }),
                            name: Q + a.channel + "_provider"
                        });
                        g = E(a);
                        g.fn = function (p) {
                            delete g.fn;
                            e = p;
                            h(function () {
                                d.up.callback(true)
                            }, 0);
                            return function (w) {
                                d.up.incoming(w, q)
                            }
                        }
                    } else {
                        if (c.referrer && k(c.referrer) != C.xdm_e) b.top.location = C.xdm_e;
                        e = b.frameElement.fn(function (p) {
                            d.up.incoming(p, q)
                        });
                        d.up.callback(true)
                    }
                },
                init: function () {
                    z(d.onDOMReady, d)
                }
            }
        };
        o.stack.NameTransport = function (a) {
            function d(H) {
                J.contentWindow.sendMessage(H, a.remoteHelper +
                    (w ? "#_3" : "#_2") + a.channel)
            }

            function g() {
                if (w) {
                    if (++n === 2 || !w) p.up.callback(true)
                } else {
                    d("ready");
                    p.up.callback(true)
                }
            }

            function e(H) {
                p.up.incoming(H, L)
            }

            function q() {
                I && h(function () {
                    I(true)
                }, 0)
            }
            var p, w, J, K, n, I, L, F;
            return p = {
                outgoing: function (H, P, da) {
                    I = da;
                    d(H)
                },
                destroy: function () {
                    J.parentNode.removeChild(J);
                    J = null;
                    if (w) {
                        K.parentNode.removeChild(K);
                        K = null
                    }
                },
                onDOMReady: function () {
                    w = a.isHost;
                    n = 0;
                    L = k(a.remote);
                    a.local = y(a.local);
                    if (w) {
                        o.Fn.set(a.channel, function (P) {
                            if (w && P === "ready") {
                                o.Fn.set(a.channel,
                                    e);
                                g()
                            }
                        });
                        F = G(a.remote, {
                            xdm_e: a.local,
                            xdm_c: a.channel,
                            xdm_p: 2
                        });
                        s(a.props, {
                            src: F + "#" + a.channel,
                            name: Q + a.channel + "_provider"
                        });
                        K = E(a)
                    } else {
                        a.remoteHelper = a.remote;
                        o.Fn.set(a.channel, e)
                    }
                    var H = function () {
                        var P = J || this;
                        Z(P, "load", H);
                        o.Fn.set(a.channel + "_load", q);
                        (function da() {
                            typeof P.contentWindow.sendMessage == "function" ? g() : h(da, 50)
                        })()
                    };
                    J = E({
                        props: {
                            src: a.local + "#_4" + a.channel
                        },
                        onLoad: H
                    })
                },
                init: function () {
                    z(p.onDOMReady, p)
                }
            }
        };
        o.stack.HashTransport = function (a) {
            function d() {
                if (K) {
                    var F = K.location.href,
                        H = "",
                        P = F.indexOf("#");
                    if (P != -1) H = F.substring(P);
                    if (H && H != w) {
                        w = H;
                        g.up.incoming(w.substring(w.indexOf("_") + 1), L)
                    }
                }
            }
            var g, e, q, p, w, J, K, n, I, L;
            return g = {
                outgoing: function (F) {
                    if (n) {
                        F = a.remote + "#" + J+++"_" + F;
                        (e || !I ? n.contentWindow : n).location = F
                    }
                },
                destroy: function () {
                    b.clearInterval(q);
                    if (e || !I) n.parentNode.removeChild(n);
                    n = null
                },
                onDOMReady: function () {
                    e = a.isHost;
                    p = a.interval;
                    w = "#" + a.channel;
                    J = 0;
                    I = a.useParent;
                    L = k(a.remote);
                    if (e) {
                        s(a.props, {
                            src: a.remote,
                            name: Q + a.channel + "_provider"
                        });
                        if (I) a.onLoad = function () {
                            K =
                                b;
                            q = setInterval(d, p);
                            g.up.callback(true)
                        };
                        else {
                            var F = 0,
                                H = a.delay / 50;
                            (function P() {
                                if (++F > H) throw Error("Unable to reference listenerwindow");
                                try {
                                    K = n.contentWindow.frames[Q + a.channel + "_consumer"]
                                } catch (da) {}
                                if (K) {
                                    q = setInterval(d, p);
                                    g.up.callback(true)
                                } else h(P, 50)
                            })()
                        }
                        n = E(a)
                    } else {
                        K = b;
                        q = setInterval(d, p);
                        if (I) {
                            n = parent;
                            g.up.callback(true)
                        } else {
                            s(a, {
                                props: {
                                    src: a.remote + "#" + a.channel + new Date,
                                    name: Q + a.channel + "_consumer"
                                },
                                onLoad: function () {
                                    g.up.callback(true)
                                }
                            });
                            n = E(a)
                        }
                    }
                },
                init: function () {
                    z(g.onDOMReady,
                        g)
                }
            }
        };
        o.stack.ReliableBehavior = function () {
            var a, d, g = 0,
                e = 0,
                q = "";
            return a = {
                incoming: function (p, w) {
                    var J = p.indexOf("_"),
                        K = p.substring(0, J).split(",");
                    p = p.substring(J + 1);
                    if (K[0] == g) {
                        q = "";
                        d && d(true)
                    }
                    if (p.length > 0) {
                        a.down.outgoing(K[1] + "," + g + "_" + q, w);
                        if (e != K[1]) {
                            e = K[1];
                            a.up.incoming(p, w)
                        }
                    }
                },
                outgoing: function (p, w, J) {
                    q = p;
                    d = J;
                    a.down.outgoing(e + "," + ++g + "_" + p, w)
                }
            }
        };
        o.stack.QueueBehavior = function (a) {
            function d() {
                if (a.remove && e.length === 0) ca(g);
                else if (!(q || e.length === 0 || w)) {
                    q = true;
                    var I = e.shift();
                    g.down.outgoing(I.data,
                        I.origin, function (L) {
                            q = false;
                            I.callback && h(function () {
                                I.callback(L)
                            }, 0);
                            d()
                        })
                }
            }
            var g, e = [],
                q = true,
                p = "",
                w, J = 0,
                K = false,
                n = false;
            return g = {
                init: function () {
                    if (A(a)) a = {};
                    if (a.maxLength) {
                        J = a.maxLength;
                        n = true
                    }
                    if (a.lazy) K = true;
                    else g.down.init()
                },
                callback: function (I) {
                    q = false;
                    var L = g.up;
                    d();
                    L.callback(I)
                },
                incoming: function (I, L) {
                    if (n) {
                        var F = I.indexOf("_"),
                            H = parseInt(I.substring(0, F), 10);
                        p += I.substring(F + 1);
                        if (H === 0) {
                            if (a.encode) p = v(p);
                            g.up.incoming(p, L);
                            p = ""
                        }
                    } else g.up.incoming(I, L)
                },
                outgoing: function (I, L, F) {
                    if (a.encode) I =
                        u(I);
                    var H = [],
                        P;
                    if (n) {
                        for (; I.length !== 0;) {
                            P = I.substring(0, J);
                            I = I.substring(P.length);
                            H.push(P)
                        }
                        for (; P = H.shift();) e.push({
                            data: H.length + "_" + P,
                            origin: L,
                            callback: H.length === 0 ? F : null
                        })
                    } else e.push({
                        data: I,
                        origin: L,
                        callback: F
                    });
                    K ? g.down.init() : d()
                },
                destroy: function () {
                    w = true;
                    g.down.destroy()
                }
            }
        };
        o.stack.VerifyBehavior = function (a) {
            function d() {
                e = Math.random().toString(16).substring(2);
                g.down.outgoing(e)
            }
            var g, e, q;
            return g = {
                incoming: function (p, w) {
                    var J = p.indexOf("_");
                    if (J === -1)
                        if (p === e) g.up.callback(true);
                        else {
                            if (!q) {
                                q = p;
                                a.initiate || d();
                                g.down.outgoing(p)
                            }
                        } else p.substring(0, J) === q && g.up.incoming(p.substring(J + 1), w)
                },
                outgoing: function (p, w, J) {
                    g.down.outgoing(e + "_" + p, w, J)
                },
                callback: function () {
                    a.initiate && d()
                }
            }
        };
        o.stack.RpcBehavior = function (a, d) {
            function g(n) {
                n.jsonrpc = "2.0";
                p.down.outgoing(w.stringify(n))
            }

            function e(n, I) {
                var L = Array.prototype.slice;
                return function () {
                    var F = arguments.length,
                        H, P = {
                            method: I
                        };
                    if (F > 0 && typeof arguments[F - 1] === "function") {
                        if (F > 1 && typeof arguments[F - 2] === "function") {
                            H = {
                                success: arguments[F -
                                    2],
                                error: arguments[F - 1]
                            };
                            P.params = L.call(arguments, 0, F - 2)
                        } else {
                            H = {
                                success: arguments[F - 1]
                            };
                            P.params = L.call(arguments, 0, F - 1)
                        }
                        K["" + ++J] = H;
                        P.id = J
                    } else P.params = L.call(arguments, 0); if (n.namedParams && P.params.length === 1) P.params = P.params[0];
                    g(P)
                }
            }

            function q(n, I, L, F) {
                if (L) {
                    var H, P;
                    if (I) {
                        H = function (ia) {
                            H = ja;
                            g({
                                id: I,
                                result: ia
                            })
                        };
                        P = function (ia, ka) {
                            P = ja;
                            var pa = {
                                id: I,
                                error: {
                                    code: -32099,
                                    message: ia
                                }
                            };
                            if (ka) pa.error.data = ka;
                            g(pa)
                        }
                    } else H = P = ja;
                    Object.prototype.toString.call(F) === "[object Array]" || (F = [F]);
                    try {
                        var da =
                            L.method.apply(L.scope, F.concat([H, P]));
                        A(da) || H(da)
                    } catch (ga) {
                        P(ga.message)
                    }
                } else I && g({
                    id: I,
                    error: {
                        code: -32601,
                        message: "Procedure not found."
                    }
                })
            }
            var p, w = d.serializer || V(),
                J = 0,
                K = {};
            return p = {
                incoming: function (n) {
                    n = w.parse(n);
                    if (n.method) d.handle ? d.handle(n, g) : q(n.method, n.id, d.local[n.method], n.params);
                    else {
                        var I = K[n.id];
                        if (n.error) I.error && I.error(n.error);
                        else I.success && I.success(n.result);
                        delete K[n.id]
                    }
                },
                init: function () {
                    if (d.remote)
                        for (var n in d.remote)
                            if (d.remote.hasOwnProperty(n)) a[n] = e(d.remote[n],
                                n);
                    p.down.init()
                },
                destroy: function () {
                    for (var n in d.remote) d.remote.hasOwnProperty(n) && a.hasOwnProperty(n) && delete a[n];
                    p.down.destroy()
                }
            }
        };
        ba.easyXDM = o
    })(window, document, window.location, window.setTimeout, decodeURIComponent, encodeURIComponent);
    var FundRazr = {
        init: false,
        log: function (b) {
            window.console && window.console.log(b)
        },
        get: function (b) {
            return document.getElementById(b)
        },
        create: function (b, c, j) {
            b = b.toLowerCase();
            var h = document.createElement(b);
            if (c)
                if (b === "p" || b === "span") h.appendChild(document.createTextNode(c));
                else h.innerHTML = c;
            if (j)
                for (var v in j) h[v] = j[v];
            return h
        },
        removeAll: function (b) {
            for (; b.hasChildNodes();) b.removeChild(b.lastChild)
        },
        getByClass: function (b, c, j) {
            b = b.getElementsByTagName(c);
            c = [];
            for (var h = 0; h < b.length; h++) b[h].className ===
                j && c.push(b[h]);
            return c
        },
        getByType: function (b, c) {
            return b.getElementsByTagName(c)
        },
        loadStyleSheet: function (b) {
            if (document.createStyleSheet) document.createStyleSheet(b);
            else {
                var c = FundRazr.create("link");
                c.href = b;
                c.rel = "stylesheet";
                c.type = "text/css";
                document.getElementsByTagName("head")[0].appendChild(c)
            }
        },
        loadScript: function (b) {
            var c = document.createElement("script");
            c.type = "text/javascript";
            c.src = b;
            document.getElementsByTagName("head")[0].appendChild(c)
        },
        toArray: function (b) {
            if (!b) return [];
            if ("toArray" in
                Object(b)) return b.toArray();
            for (var c = b.length || 0, j = Array(c); c--;) j[c] = b[c];
            return j
        },
        filter: function (b) {
            for (var c = b.length, j = [], h = 0; h < c; h++)
                if (h in this) {
                    var v = b[h];
                    func.call(v, h, b) && j.push(v)
                }
            return j
        },
        isChildOf: function (b, c) {
            if (c != null)
                for (; c.parentNode;)
                    if ((c = c.parentNode) == b) return true;
            return false
        },
        hasClass: function (b, c) {
            return b.className.match(RegExp("(\\s|^)" + c + "(\\s|$)"))
        },
        addClass: function (b, c) {
            FundRazr.hasClass(b, c) || (b.className += " " + c);
            b.className.replace(/ +/g, " ");
            return b
        },
        removeClass: function (b,
            c) {
            if (FundRazr.hasClass(b, c)) b.className = b.className.replace(RegExp("(\\s|^)" + c + "(\\s|$)"), "")
        },
        target: function (b) {
            return b.target ? b.target : b.srcElement
        },
        bindEvent: function (b, c, j) {
            var h = j;
            if (c in {
                mouseout: 1
            }) h = function (v) {
                var u = v.toElement ? v.toElement : v.relatedTarget;
                !FR.isChildOf(b, u) && b != u && j(v)
            };
            if (b.addEventListener) b.addEventListener(c, h, false);
            else if (b.attachEvent) b.attachEvent("on" + c, h);
            else b["on" + c] = h
        },
        unbindEvent: function (b, c, j) {
            if (b.unbindEventListener) b.unbindEventListener(c, j, false);
            else if (b.detachEvent) b.detachEvent("on" + c, j);
            else b["on" + c] = ""
        },
        trim: function (b) {
            return b.replace(/^\s+/, "").replace(/\s+$/, "")
        },
        client: function () {
            var b = 0,
                c = 0,
                j = 0,
                h = 0;
            if (window.innerHeight && window.scrollMaxY) {
                b = document.scrollWidth;
                c = self.innerHeight + self.scrollMaxY
            } else if (document.body.scrollHeight > document.body.offsetHeight) {
                b = document.body.scrollWidth;
                c = document.body.scrollHeight
            } else {
                b = document.getElementsByTagName("html").item(0).offsetWidth;
                c = document.getElementsByTagName("html").item(0).offsetHeight;
                b = b < document.body.offsetWidth ? document.body.offsetWidth : b;
                c = c < document.body.offsetHeight ? document.body.offsetHeight : c
            } if (window.innerWidth) {
                j = window.innerWidth;
                h = window.innerHeight
            } else if (document.documentElement.clientWidth != 0) {
                j = document.documentElement.clientWidth;
                h = document.documentElement.clientHeight
            } else {
                j = document.body.clientWidth;
                h = document.body.clientHeight
            }
            return {
                pageWidth: b < j ? j : b,
                pageHeight: c < h ? h : c,
                width: j,
                height: h
            }
        },
        scroll: function () {
            var b = 0,
                c = 0;
            if (window.pageYOffset) {
                b = window.pageXOffset;
                c = window.pageYOffset
            } else if (document.documentElement.clientWidth) {
                b = document.documentElement.scrollLeft;
                c = document.documentElement.scrollTop
            } else {
                b = document.body.scrollLeft;
                c = document.body.scrollTop
            }
            return {
                left: b,
                top: c
            }
        },
        offset: function (b) {
            for (var c = b.offsetLeft, j = b.offsetTop, h = b.offsetParent;
                (b = b.parentNode) && b !== document.body && b !== document.documentElement;)
                if (b === h) {
                    c += b.offsetLeft;
                    j += b.offsetTop;
                    h = b.offsetParent
                }
            return {
                left: c,
                top: j
            }
        },
        width: function (b) {
            return b.offsetWidth
        },
        height: function (b) {
            return b.offsetHeight
        },
        json: function () {
            var b = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                c = function (j, h) {
                    function v(O, U) {
                        var N, z, t = O[U];
                        if (t && typeof t === "object")
                            for (N in t)
                                if (Object.prototype.hasOwnProperty.call(t, N)) {
                                    z = v(t, N);
                                    if (z !== undefined) t[N] = z;
                                    else delete t[N]
                                }
                        return h.call(O, U, t)
                    }
                    var u;
                    j = String(j);
                    b.lastIndex = 0;
                    if (b.test(j)) j = j.replace(b, function (O) {
                        return "\\u" + ("0000" + O.charCodeAt(0).toString(16)).slice(-4)
                    });
                    if (/^[\],:{}\s]*$/.test(j.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                        "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                        u = eval("(" + j + ")");
                        return typeof h === "function" ? v({
                            "": u
                        }, "") : u
                    }
                    throw new SyntaxError("JSON.parse");
                };
            return {
                parse: function (j) {
                    return window.JSON ? window.JSON.parse(j) : c(j, null)
                }
            }
        }(),
        xssAjax: function (b, c, j, h) {
            window.FundRazr || (window.FundRazr = {});
            window.FundRazr.callbacks || (window.FundRazr.callbacks = {});
            var v = "cb" + (new Date).getTime() + ("" + Math.floor(Math.random() * 1E4));
            b = b + (b.indexOf("?") !=
                -1 ? "&" : "?") + "jsonp=window.FundRazr.callbacks." + v;
            var u = function (O) {
                if (!window.FundRazr.callbacks[O]) return false;
                window.FundRazr.callbacks[O] = null;
                for (var U = document.getElementsByTagName("head")[0], N = U.getElementsByTagName("script"), z = 0, t; z < N.length; z++) {
                    t = N[z];
                    if (t.src.indexOf(O) != -1) {
                        U.removeChild(t);
                        break
                    }
                }
                return true
            };
            window.FundRazr.callbacks[v] = function (O) {
                c(O);
                setTimeout(function () {
                    u(v)
                }, 500)
            };
            setTimeout(function () {
                u(v) === true && j && j(h)
            }, 5E3);
            FundRazr.loadScript(b)
        },
        ajax: function () {
            var b = function () {
                var c;
                try {
                    c = new XMLHttpRequest;
                    b = function () {
                        return new XMLHttpRequest
                    }
                } catch (j) {
                    for (var h = ["MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], v = 0, u = h.length; v < u; v++) try {
                        c = new ActiveXObject(h[v]);
                        b = function () {
                            return new ActiveXObject(h[v])
                        };
                        break
                    } catch (O) {}
                }
                return c
            };
            return function (c, j, h, v) {
                var u = b();
                u.open(c, j, true);
                u.onreadystatechange = function () {
                    if (u && u.readyState == 4 && u.status == 200)
                        if (h) {
                            var O = FundRazr.trim("" + u.responseText);
                            O = FundRazr.json.parse(O);
                            h(O)
                        }
                };
                u.setRequestHeader("Accept", "application/json");
                u.send(v || null);
                return u
            }
        }(),
        currencySymbol: function (b) {
            var c = {
                EUR: "\u20ac",
                GBP: "\u00a3",
                ILS: "\u20aa",
                JPY: "\u00a5",
                CHF: "",
                NOK: "kr",
                SEK: "kr",
                DKK: "kr",
                CZK: "K\u010d",
                HUF: "Ft",
                PLN: "z\u0142"
            };
            return c[b] ? c[b] : "$"
        },
        module: {}
    };
    FundRazr.sha1 = function (b) {
        function c(B, W) {
            return B << W | B >>> 32 - W
        }

        function j(B) {
            var W = "",
                ca, ba;
            for (ca = 7; ca >= 0; ca--) {
                ba = B >>> ca * 4 & 15;
                W += ba.toString(16)
            }
            return W
        }
        var h, v, u = Array(80),
            O = 1732584193,
            U = 4023233417,
            N = 2562383102,
            z = 271733878,
            t = 3285377520,
            k, y, G, A, s;
        b = function (B) {
            B = B.replace(/\r\n/g, "\n");
            for (var W = "", ca = 0; ca < B.length; ca++) {
                var ba = B.charCodeAt(ca);
                if (ba < 128) W += String.fromCharCode(ba);
                else {
                    if (ba > 127 && ba < 2048) W += String.fromCharCode(ba >> 6 | 192);
                    else {
                        W += String.fromCharCode(ba >> 12 | 224);
                        W += String.fromCharCode(ba >>
                            6 & 63 | 128)
                    }
                    W += String.fromCharCode(ba & 63 | 128)
                }
            }
            return W
        }(b);
        k = b.length;
        var E = [];
        for (h = 0; h < k - 3; h += 4) {
            v = b.charCodeAt(h) << 24 | b.charCodeAt(h + 1) << 16 | b.charCodeAt(h + 2) << 8 | b.charCodeAt(h + 3);
            E.push(v)
        }
        switch (k % 4) {
        case 0:
            h = 2147483648;
            break;
        case 1:
            h = b.charCodeAt(k - 1) << 24 | 8388608;
            break;
        case 2:
            h = b.charCodeAt(k - 2) << 24 | b.charCodeAt(k - 1) << 16 | 32768;
            break;
        case 3:
            h = b.charCodeAt(k - 3) << 24 | b.charCodeAt(k - 2) << 16 | b.charCodeAt(k - 1) << 8 | 128
        }
        for (E.push(h); E.length % 16 != 14;) E.push(0);
        E.push(k >>> 29);
        E.push(k << 3 & 4294967295);
        for (b =
            0; b < E.length; b += 16) {
            for (h = 0; h < 16; h++) u[h] = E[b + h];
            for (h = 16; h <= 79; h++) u[h] = c(u[h - 3] ^ u[h - 8] ^ u[h - 14] ^ u[h - 16], 1);
            v = O;
            k = U;
            y = N;
            G = z;
            A = t;
            for (h = 0; h <= 19; h++) {
                s = c(v, 5) + (k & y | ~k & G) + A + u[h] + 1518500249 & 4294967295;
                A = G;
                G = y;
                y = c(k, 30);
                k = v;
                v = s
            }
            for (h = 20; h <= 39; h++) {
                s = c(v, 5) + (k ^ y ^ G) + A + u[h] + 1859775393 & 4294967295;
                A = G;
                G = y;
                y = c(k, 30);
                k = v;
                v = s
            }
            for (h = 40; h <= 59; h++) {
                s = c(v, 5) + (k & y | k & G | y & G) + A + u[h] + 2400959708 & 4294967295;
                A = G;
                G = y;
                y = c(k, 30);
                k = v;
                v = s
            }
            for (h = 60; h <= 79; h++) {
                s = c(v, 5) + (k ^ y ^ G) + A + u[h] + 3395469782 & 4294967295;
                A = G;
                G = y;
                y = c(k, 30);
                k = v;
                v =
                    s
            }
            O = O + v & 4294967295;
            U = U + k & 4294967295;
            N = N + y & 4294967295;
            z = z + G & 4294967295;
            t = t + A & 4294967295
        }
        s = j(O) + j(U) + j(N) + j(z) + j(t);
        return s.toLowerCase()
    };
    FundRazr.module.hovertip = function () {
        var b = FundRazr,
            c, j, h, v = function () {
                c = b.create("div");
                c.id = "fr_hovercard-outer";
                c.style.display = "none";
                c.style.position = "absolute";
                document.body.appendChild(c);
                b.bindEvent(c, "mouseover", function () {
                    U = true
                });
                b.bindEvent(c, "mouseout", function () {
                    N()
                })
            },
            u = null,
            O = function (t, k) {
                if (u == null) {
                    u = [];
                    var y = function (E, B) {
                        var W = b.toArray(b.getByType(document, E));
                        if (B) W = b.filter(W, B);
                        return W
                    };
                    u = u.concat(y("iframe", function (E) {
                        return !E.id || E.id.indexOf("fr-widget-iframe-") != 0
                    }));
                    u = u.concat(y("frame"));
                    u = u.concat(y("embed"))
                }
                y = 0;
                for (var G = t.x1, A; y < u.length; y++) {
                    A = u[y];
                    var s = b.offset(A);
                    s = {
                        x1: s.left,
                        x2: s.left + b.width(A),
                        y1: s.top,
                        y2: s.top + b.height(A)
                    };
                    if (k) {
                        if (A = s.x1 >= t.x1 && s.x1 < t.x2 && (t.y1 > s.y1 && t.y1 < s.y2 || t.y2 > s.y1 && t.y2 < s.y2 || t.y1 <= s.y1 && t.y2 >= s.y2)) G = Math.min(G, Math.max(0, s.x1 - (t.x2 - t.x1)))
                    } else if (A = s.x1 <= t.x1 && s.x2 > t.x1 && (t.y1 > s.y1 && t.y1 < s.y2 || t.y2 > s.y1 && t.y2 < s.y2 || t.y1 <= s.y1 && t.y2 >= s.y2)) G = Math.max(G, s.x2)
                }
                return G
            },
            U = false,
            N = function () {
                U = false;
                setTimeout(function () {
                        z()
                    },
                    250)
            },
            z = function () {
                if (U) U = false;
                else c.style.display = "none"
            };
        return {
            init: function () {
                v()
            },
            registerLink: function () {},
            getCampaignUrl: function () {
                return j
            },
            getColorscheme: function () {
                return h
            },
            getTarget: function () {
                return currentTarget
            },
            bind: function (t, k) {
                b.bindEvent(c, t, k)
            },
            show: function (t, k, y, G, A, s, E, B) {
                j = y;
                h = G;
                currentTarget = B;
                c.innerHTML = k;
                U = true;
                c.style.display = "block";
                k = b.client();
                y = b.scroll();
                B = b.offset(t);
                G = B.left;
                B = B.top;
                var W;
                if (E && !isNaN(A) && !isNaN(s)) {
                    G += A;
                    B += s;
                    W = E
                } else W = b.width(t);
                t = b.width(c);
                var ca = b.height(c);
                k.height -= 16;
                k.width -= 16;
                if (A && s && !E) {
                    A = G + A;
                    if (A + t > k.width + y.left) A -= A + t - (k.width + y.left);
                    E = B + s;
                    if (E + ca > k.height + y.top) E -= E + ca - (k.height + y.top)
                } else {
                    s = G + W + t <= k.width - y.left;
                    A = Math.min(y.left + k.width - t, Math.max(G + (s ? W : -t), y.left));
                    E = Math.min(y.top + k.height - ca, Math.max(B, y.top));
                    A = O({
                        x1: A,
                        x2: A + t,
                        y1: E,
                        y2: E + ca
                    }, s)
                }
                c.style.top = E + "px";
                c.style.left = A + "px";
                c.style.display = "block"
            },
            hide: function (t) {
                if (t === true) N();
                else {
                    U = false;
                    z()
                }
            }
        }
    };
    FundRazr.module.popup = function (b) {
        var c = FundRazr,
            j = document.location.protocol + b.serverUrl,
            h = b.embedSecure,
            v, u, O = "",
            U = "780px";
        if (b.width) U = b.width;
        var N, z, t, k, y = b.sandbox,
            G = b.gaTracker,
            A = function () {
                if (/chrome/.test(navigator.userAgent.toLowerCase())) return false;
                if ("createTouch" in document) return true;
                try {
                    return !!document.createEvent("TouchEvent").initTouchEvent
                } catch (m) {
                    return false
                }
            },
            s, E, B = function () {
                s = {};
                var m = [],
                    f = 0,
                    l = function (R, Q) {
                        var $ = c.toArray(c.getByType(document, R));
                        if (Q) $ = c.filter($, Q);
                        return $
                    };
                m = m.concat(l("iframe", function (R) {
                    return !R.id || R.id.indexOf("fr-widget-iframe-") != 0
                }));
                m = m.concat(l("frame"));
                for (m = m.concat(l("embed")); f < m.length; f++) {
                    l = m[f];
                    var o = l.tagName;
                    o = o ? o.toUpperCase() : "";
                    if (l.id != "fr-iframe" && (o == "IFRAME" || o == "FRAME")) {
                        s[l] = {};
                        s[l].original = l.style.visibility;
                        l.style.visibility = "hidden"
                    } else if (o == "EMBED") {
                        s[l] = {};
                        s[l].original = l.wmode;
                        l.wmode = "transparent"
                    }
                }
                E = m
            },
            W = function (m) {
                (window.event ? window.event.keyCode : m.keyCode) == (window.event ? 27 : m.DOM_VK_ESCAPE) &&
                oa()
            },
            ca = function () {
                var m = k.body.clientWidth,
                    f = k.body.clientHeight;
                c.get("fr_overlay").style.width = m + "px";
                c.get("fr_overlay").style.height = f + "px"
            },
            ba = function (m, f, l, o) {
                if (h) m = m.replace(/^(http:)?\/\//, "https://");
                o = v != m || o;
                v = m;
                if (G) v = G._getLinkerUrl(v) || v;
                u = f;
                N && !z && D("hide");
                ja("hide");
                m = c.client();
                f = c.get("fr_overlay");
                u == "dark" ? c.addClass(f, "dark") : c.removeClass(f, "dark");
                f.style.display = "";
                c.get("loading").style.display = "";
                if (N && !z || z && t) {
                    f.style.height = m.pageHeight + "px";
                    f.style.width = m.pageWidth +
                        "px";
                    c.bindEvent(window, "resize", ca)
                }
                m = c.get("fr-body");
                m.style.top = c.scroll().top + 5 + "px";
                m.style.display = "";
                var R = function () {
                    oa();
                    return false
                };
                c.get("fr_close-link").onclick = R;
                c.bindEvent(document, "keydown", W);
                m = c.get("fr-outerbox");
                m.style.width = parseInt(U, 10) + 23 + "px";
                m.style.height = parseInt("914px", 10) + 15 + "px";
                m.style.border = "none";
                c.get("fr-loading").style.display = "none";
                var Q = c.get("fr-iframe");
                if (o) {
                    if (Q) l ? Q.setAttribute("id", "temp-id") : Q.parentNode.removeChild(Q);
                    var $ = new window.FundRazr.easyXDM.Socket({
                        remote: v,
                        swf: j + "/widgets/js/easyxdm.swf",
                        container: c.get("fr-iframebox"),
                        props: {
                            style: {
                                border: u == "dark" ? "1px solid #444444" : "1px solid #999999",
                                background: u == "dark" ? "#111111" : "#FFFFFF",
                                visibility: "hidden",
                                width: U,
                                height: "914px"
                            },
                            id: "fr-iframe",
                            scrolling: "no",
                            frameBorder: "0",
                            allowTransparency: true
                        },
                        onReady: function () {
                            Q && Q.parentNode && l && Q.parentNode.removeChild(Q);
                            c.get("fr-iframe").style.visibility = "visible"
                        },
                        onMessage: function (M) {
                            M = JSON.parse(M);
                            var ea = c.get("fr-iframe");
                            switch (M.type) {
                            case "setSize":
                                if (M.data.type !=
                                    "cluetip" || parseInt(ea.style.height) <= M.data.height) {
                                    var aa = c.get("fr-outerbox"),
                                        S = c.get("loading");
                                    ea.style.height = M.data.height + "px";
                                    aa.style.height = parseInt(M.data.height, 10) + 23 + "px";
                                    S.style.display = "none"
                                }
                                break;
                            case "scrollTo":
                                ea = c.get("fr-iframe");
                                M = c.offset(ea).top + M.data.top;
                                window.scrollTo(0, M);
                                break;
                            case "getPageInfo":
                                M = {
                                    type: "setPageInfo",
                                    data: {
                                        offsetTop: c.offset(ea).top,
                                        scrollTop: c.scroll().top,
                                        clientHeight: c.client().height
                                    }
                                };
                                $.postMessage(JSON.stringify(M));
                                break;
                            case "iframe-reload":
                                if (M.data.persist) {
                                    if (M.data.url.indexOf("embed/logout") ==
                                        -1) O = M.data.url
                                } else O = "";
                                ba(M.data.url, "light", true, M.data.forceReload);
                                break;
                            case "close-lightbox":
                                R();
                                break;
                            case "show-content":
                                y.notify({
                                    name: "show-content",
                                    data: M.data
                                });
                                break;
                            case "hide-content":
                                y.notify({
                                    name: "hide-content",
                                    data: M.data
                                })
                            }
                        }
                    });
                    c.get("fr-iframe").onload = function () {
                        Q && Q.parentNode && l && Q.parentNode.removeChild(Q)
                    };
                    o = c.get("fr-iframebox");
                    o.style.border = "none";
                    o.style.display = "";
                    setTimeout(function () {
                        Q && Q.parentNode && l && Q.parentNode.removeChild(Q);
                        c.get("fr-iframe").style.visibility =
                            "visible"
                    }, 2E3);
                    o = function () {
                        var M = c.get("fr-outerbox");
                        M.style.top = "1px";
                        M.style.top = "0px"
                    };
                    m = document.documentMode;
                    if (N && m && !t)
                        for (m = 1; m <= 20; m++) setTimeout(o, 500 * m)
                } else Q.style.display = "";
                B()
            },
            oa = function () {
                if (N && !z || z && t) c.unbindEvent(window, "resize", ca);
                c.unbindEvent(document, "keydown", W);
                c.get("fr-body").style.display = "none";
                c.get("fr_overlay").style.display = "none";
                D("visible");
                ja("visible");
                for (var m = 0, f, l; m < E.length; m++) {
                    f = E[m];
                    l = (l = f.tagName) ? l.toUpperCase() : "";
                    if (f.id != "fr-iframe" && (l ==
                        "IFRAME" || l == "FRAME")) f.style.visibility = s[f].original;
                    else if (l == "EMBED") f.wmode = s[f].original
                }
            },
            ja = function (m) {
                for (var f = k.getElementsByTagName("object"), l = 0; l < f.length; l++) f[l].style.visibility = m == "hide" ? "hidden" : "visible";
                f = k.getElementsByTagName("embed");
                for (l = 0; l < f.length; l++) f[l].style.visibility = m == "hide" ? "hidden" : "visible"
            },
            D = function (m) {
                for (var f = k.getElementsByTagName("select"), l = 0; l < f.length; l++) f[l].style.visibility = m == "hide" ? "hidden" : "visible"
            };
        return {
            init: function () {
                k = document;
                z = (N =
                    document.all && !window.opera) && window.XMLHttpRequest;
                t = N && k.compatMode == "BackCompat";
                var m = A(),
                    f = k.getElementsByTagName("body").item(0);
                if (c.get("fr_overlay")) {
                    f.removeChild(c.get("fr_overlay"));
                    f.removeChild(c.get("fr-body"))
                }
                var l = c.create("div");
                l.setAttribute("id", "fr_overlay");
                if (N && !z || z && t) l.style.position = "absolute";
                l.style.display = "none";
                var o = c.create("div");
                o.setAttribute("id", "loading");
                var R = c.create("img");
                R.src = j + "/img/loader-light-big.gif";
                R.setAttribute("style", "margin-top: 200px; display: block; margin-left: " +
                    (m ? "33%" : "auto") + "; margin-right: auto;");
                o.appendChild(R);
                l.appendChild(o);
                var Q = c.create("a", "\u2715", {
                    id: "fr_close-link",
                    title: "Close"
                });
                o = c.create("div");
                o.setAttribute("id", "fr-body");
                o.style.display = "none";
                R = c.create("div");
                R.setAttribute("id", "fr-outerbox");
                o.appendChild(R);
                var $ = c.create("div");
                $.setAttribute("id", "fr-iframebox");
                $.style.display = "none";
                R.appendChild($);
                R.appendChild(Q);
                Q = c.create("div");
                Q.setAttribute("id", "fr-loading");
                R.appendChild(Q);
                f.appendChild(l);
                f.appendChild(o);
                if (!(N &&
                    !z || z && t))
                    if (m) {
                        l.style.width = parseInt(document.body.clientWidth * 1.5) + "px";
                        l.style.height = document.body.clientHeight + "px";
                        l.style.position = "absolute"
                    }
            },
            show: function (m, f, l) {
                if (l && O) m = O;
                ba(m, f)
            }
        }
    };
    var SERVER_URL = "//fundrazr.com",
        STYLESHEET_URL = "//static.fundrazr.com/widgets/1957/style/main.css",
        STYLESHEET_SECURE_URL = "//s3.amazonaws.com/fundrazr-platform/widgets/1957/style/main.css",
        STATIC_URL = "static.fundrazr.com/widgets/1957/",
        STATIC_SECURE_URL = "s3.amazonaws.com/fundrazr-platform/widgets/1957/",
        EMBED_SECURE = true,
        WIDGET_CLASS = "fr-widget",
        FR = FundRazr,
        isSecure = document.location.protocol == "https:",
        staticUrl = isSecure ? STATIC_SECURE_URL : STATIC_URL,
        stylesheetUrl = isSecure ? STYLESHEET_SECURE_URL : STYLESHEET_URL;
    FR.loadStyleSheet(stylesheetUrl);
    if (!window.FundRazr || !window.FundRazr.WidgetManager) {
        Sandbox = function () {
            var b = {},
                c = function (j) {
                    var h = b[j.name];
                    if (h && h.length > 0) {
                        var v = 0;
                        for (h = h.length; v < h; v++) b[j.name][v](j)
                    }
                };
            return {
                notify: function (j) {
                    j.async === false ? c(j) : setTimeout(function () {
                        c(j)
                    }, 1)
                },
                listen: function (j, h) {
                    if (j.toLowerCase) {
                        b[j] || (b[j] = []);
                        b[j].push(h)
                    } else
                        for (var v = 0, u = j.length; v < u; v++) {
                            b[j[v]] || (b[j[v]] = []);
                            b[j[v]].push(h)
                        }
                }
            }
        };
        window.FundRazr || (window.FundRazr = {});
        var DEFAULT_IMAGE_URL = "//" + staticUrl + "img/hands-together_320x180.jpg",
            WidgetManager = function () {
                var b, c, j, h = {},
                    v = false,
                    u = [],
                    O = new Sandbox,
                    U = [],
                    N = [],
                    z = 0,
                    t, k = false;
                document.addEventListener || (k = true);
                var y = function (D, m) {
                        var f = RegExp("[\\?&]" + m + "=([^&#]*)").exec(D);
                        return f ? f[1] : null
                    },
                    G = function (D) {
                        return (D = D.match(/^.*(\/campaigns\/|\/activity\/|\?crid=|fnd.us\/c\/)([0-9a-zA-Z]+).*$/)) && D.length > 2 ? D[2] : ""
                    },
                    A = function (D, m, f) {
                        j.hide();
                        if (!c) {
                            var l = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 140;
                            if (l < 780) l = 780;
                            l += "px";
                            c = FundRazr.module.popup({
                                serverUrl: SERVER_URL,
                                staticUrl: staticUrl,
                                embedSecure: EMBED_SECURE,
                                sandbox: O,
                                gaTracker: t,
                                width: l
                            });
                            c.init()
                        }
                        c.show(D, m, f);
                        return false
                    },
                    s = function (D) {
                        var m = D.document,
                            f = m.compatMode;
                        r = f && /CSS/.test(f) ? m.documentElement : m.body;
                        return typeof D.innerWidth == "number" ? D.innerWidth > r.clientWidth : r.scrollWidth > r.clientWidth
                    },
                    E = function (D) {
                        var m = D.document;
                        D = m.body;
                        var f = 0;
                        if (D) {
                            m = m.createElement("div");
                            m.style.cssText = "overflow:scroll;position:absolute;top:-1000px;left:-1000px;width:50px;height:50px;";
                            D.insertBefore(m, D.firstChild);
                            f = m.offsetWidth - m.clientWidth;
                            D.removeChild(m)
                        }
                        return f
                    },
                    B = function (D, m) {
                        var f, l = 0,
                            o;
                        if (m instanceof Array) {
                            o = m;
                            m = o.onReady
                        }
                        f = h[D];
                        var R = function () {
                                var na = document.documentElement.scrollTop || document.body.scrollTop;
                                if (na != ea) {
                                    ea = na;
                                    var ra = document.body,
                                        la = document.documentElement,
                                        X = Math.max(ra.scrollHeight, ra.offsetHeight, la.clientHeight, la.scrollHeight, la.offsetHeight);
                                    if (self.innerHeight) clientHeight = self.innerHeight;
                                    else if (la && la.clientHeight) clientHeight = la.clientHeight;
                                    else if (ra) clientHeight =
                                        ra.clientHeight;
                                    na >= X - clientHeight - 30 && v && sa.postMessage(JSON.stringify({
                                        type: "show-page-" + Y
                                    }))
                                }
                            },
                            Q = "0px",
                            $ = "0px",
                            M, ea = 0,
                            aa = 0,
                            S = document.location.protocol + SERVER_URL,
                            Z = f.getAttribute("data-key"),
                            Y = "";
                        if (Z) {
                            M = Y = "smart";
                            S += "/widgets/smart?widgetKey=" + Z;
                            var T = f.getAttribute("data-partner");
                            if (T) S += "&partner=" + T;
                            if (l = f.getAttribute("data-user")) S += "&user=" + l;
                            s(window) || (aa = E(window));
                            l = k ? 0 : parseInt(window.getComputedStyle(f.parentNode, null).getPropertyValue("padding-left"));
                            Z = k ? 0 : parseInt(window.getComputedStyle(f.parentNode,
                                null).getPropertyValue("padding-right"));
                            l = isNaN(l) ? 0 : l;
                            Z = isNaN(Z) ? 0 : Z;
                            S += "&width=" + (f.parentNode.clientWidth - aa - Z - l);
                            V = C = 0
                        } else {
                            Y = f.getAttribute("data-type");
                            var fa = f.getAttribute("data-variant");
                            Z = f.getAttribute("data-colorscheme") || "light";
                            var ha = f.getAttribute("data-customer"),
                                C = f.getAttribute("data-width"),
                                V = f.getAttribute("data-height"),
                                a = f.getAttribute("data-show-rank"),
                                d = f.getAttribute("data-heading"),
                                g = f.getAttribute("data-target"),
                                e = f.getAttribute("data-url");
                            if (e) l = G(e);
                            var q = f.getAttribute("data-search-background-color") ||
                                f.getAttribute("data-background-color"),
                                p = f.getAttribute("data-search-text-color") || f.getAttribute("data-text-color"),
                                w = f.getAttribute("data-border-color"),
                                J = f.getAttribute("data-supporters") === "true",
                                K = f.getAttribute("data-stylesheet"),
                                n = "";
                            T = "false";
                            var I = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
                                L = "false";
                            if (T = f.getAttribute("data-parent")) l = T;
                            if (Y == "badge") switch (fa) {
                                case "tall":
                                    M = "badge-tall";
                                    C || (C = 200);
                                    if (C < 180) C = 180;
                                    if (C > 300) C = 300;
                                    V = 2 * C;
                                    break;
                                case "wide":
                                    M = "badge-wide";
                                    C || (C = 400);
                                    if (C < 340) C = 340;
                                    if (C > 600) C = 600;
                                    V = Math.round(C / 2);
                                    break;
                                case "avatar":
                                    V = C = 58;
                                    M = "badge-avatar";
                                    break;
                                case "photo":
                                    M = "badge-photo";
                                    if (!C || C > 640) C = 640;
                                    else if (C < 160) C = 160;
                                    if (!V || V > 360) V = 360;
                                    else if (V < 90) V = 90;
                                    e = (C - 6) * 9 / 16 + 6;
                                    fa = (V - 6) * 16 / 9 + 6;
                                    if (e > V) C = Math.floor(fa);
                                    else V = Math.floor(e);
                                    break;
                                default:
                                    M = "badge-small";
                                    C = 90;
                                    V = 150
                                } else if (Y == "gallery") M = "gallery";
                                else if (Y == "leaderboard") {
                                M = "leaderboard";
                                d || (d = "Find campaigns");
                                C || (C = 650);
                                V || (V = 500);
                                if (C != 0 && C < 450) C = 450;
                                if (C > 1E3) C = 1E3;
                                if (V < 400) V = 400;
                                if (V > 800) V = 800;
                                if (T = f.getAttribute("data-partner")) n +=
                                    "&partnerCode=" + T;
                                var F = f.getAttribute("data-organization");
                                if (F) n += "&organization=" + F;
                                var H = f.getAttribute("data-campaigns");
                                if (H) n += "&campaigns=" + H.replace(/ /g, "");
                                T = f.getAttribute("data-autoscroll");
                                pageSize = f.getAttribute("data-page-size");
                                L = f.getAttribute("data-randomize");
                                aa = f.getAttribute("data-search");
                                if (e = f.getAttribute("data-entry-focus")) n += "&entryFocus=" + e;
                                aa || (aa = "true");
                                n += "&search=" + aa;
                                T || (T = "false");
                                n += "&autoscroll=" + T;
                                if (T == "true") window.onscroll = R;
                                L || (L = "false");
                                n += "&randomize=" +
                                    L;
                                pageSize || (pageSize = 3);
                                if (pageSize < 1) pageSize = 1;
                                if (pageSize > 10) pageSize = 10;
                                n += "&pageSize=" + pageSize;
                                var P = f.getAttribute("data-tags");
                                if (P) n += "&partnerTags=" + encodeURIComponent(P)
                            } else if (Y == "carousel" || Y == "grid") {
                                F = f.getAttribute("data-organization");
                                T = f.getAttribute("data-partner");
                                H = f.getAttribute("data-campaigns");
                                var da = f.getAttribute("data-max");
                                e = f.getAttribute("data-badge-width");
                                var ga = f.getAttribute("data-style");
                                L = f.getAttribute("data-randomize");
                                P = f.getAttribute("data-tags");
                                var ia =
                                    f.getAttribute("data-seed"),
                                    ka = f.getAttribute("data-show-tooltip");
                                (fa = f.getAttribute("data-use-widget-width")) || (fa = "false");
                                n += "&useWidgetWidth=" + fa;
                                if (F) n += "&organization=" + F;
                                if (H) n += "&campaigns=" + H.replace(/ /g, "");
                                if (T) n += "&partnerCode=" + T;
                                if (P) n += "&partnerTags=" + encodeURIComponent(P);
                                if (ia) n += "&seedList=" + encodeURIComponent(ia.replace(/ /g, ""));
                                da || (da = 100);
                                n += "&max=" + da;
                                L || (L = "false");
                                n += "&randomize=" + L;
                                ka || (L = "true");
                                n += "&showTooltip=" + ka;
                                e || (e = 0);
                                ga || (ga = "tall");
                                n += "&style=" + ga;
                                n += "&badgeWidth=" +
                                    e;
                                if (Y == "carousel") {
                                    M = "carousel";
                                    T = f.getAttribute("data-variant");
                                    L = f.getAttribute("data-count");
                                    F = f.getAttribute("data-interval");
                                    H = f.getAttribute("data-show-controls");
                                    T || (T = "fader");
                                    n += "&variant=" + T;
                                    L || (L = 0);
                                    n += "&count=" + L;
                                    H || (H = "true");
                                    n += "&showControls=" + H;
                                    F || (F = "5000");
                                    n += "&interval=" + F;
                                    V = void 0 + (H == "true" ? 40 : 10);
                                    if (fa == "true") {
                                        s(window) || (aa = E(window));
                                        C = f.parentNode.clientWidth - aa
                                    } else C = (parseInt(e) + 4) * L + 17
                                } else if (Y == "grid") {
                                    M = "grid";
                                    F = f.getAttribute("data-rows");
                                    P = f.getAttribute("data-columns");
                                    T = f.getAttribute("data-autoscroll");
                                    aa = f.getAttribute("data-search");
                                    H = f.getAttribute("data-heading");
                                    da = f.getAttribute("data-header-text-color");
                                    ga = f.getAttribute("data-header-background-color");
                                    ia = f.getAttribute("data-show-user-campaigns");
                                    L = f.getAttribute("data-limit-height");
                                    ka = f.getAttribute("data-partner-fill");
                                    var pa = f.getAttribute("data-allow-paging");
                                    H || (H = "");
                                    n += "&heading=" + encodeURIComponent(H);
                                    if (da) {
                                        da = da.replace("#", "");
                                        if (I.test(da)) n += "&headerColor=" + da
                                    }
                                    if (ga) {
                                        ga = ga.replace("#", "");
                                        if (I.test(ga) || ga == "transparent") n += "&headerBackgroundColor=" + ga
                                    }
                                    F || (F = 2);
                                    if (F < 1) F = 1;
                                    if (F > 10) F = 10;
                                    n += "&rows=" + F;
                                    P || (P = 0);
                                    n += "&columns=" + P;
                                    T || (T = "true");
                                    n += "&autoscroll=" + T;
                                    if (pa) {
                                        if (pa == "false") T = "false"
                                    } else pa = "true";
                                    n += "&allowPaging=" + pa;
                                    if (T == "true" || !L) L = "false";
                                    n += "&limitHeight=" + L;
                                    if (T == "true") window.onscroll = R;
                                    aa || (aa = "true");
                                    ia || (ia = "false");
                                    n += "&search=" + aa;
                                    n += "&showUserCampaigns=" + ia;
                                    ka || (ka = "false");
                                    n += "&partnerFill=" + ka;
                                    if (fa == "true") C = f.parentNode.clientWidth;
                                    else {
                                        C = parseInt(e) * P + 5 *
                                            (P - 1);
                                        if (L != "false") C += 25
                                    }
                                    e = 25;
                                    if (aa == "true" && H != "") e += 115;
                                    else if (aa == "true" && H == "") e += 88;
                                    else if (aa != "true" && H != "") e += 84;
                                    V = (parseInt(void 0) + 4) * F + e;
                                    $ = V + "px"
                                }
                            } else if (Y == "full-campaign") {
                                if (e = /[\?&]fr-campaign=([^&#]*)/.exec(window.location.href)) l = e[1] || l;
                                V = 700;
                                T = f.getAttribute("data-autoscroll");
                                if (C) C += "px";
                                else C = "100%";
                                V += "px";
                                Q = k ? "760px" : "320px";
                                if (T == "true") window.onscroll = R
                            } else if (Y == "full-page") {
                                S = /^(http|https):\/\/([A-Za-z0-9]*\.)?(fundrazr.com)((\/|\?)(.*)?)?$/.test(e);
                                C = "100%";
                                V = k ?
                                    "0px" : "100vh";
                                if (S) S = e;
                                else return
                            } else return; if (Y == "full-campaign") {
                                S += "/campaigns/widgetembed/" + l;
                                if (K) S += "?stylesheet=" + encodeURIComponent(K);
                                Z = ["fb_action_ids", "srid", "psid", "fb_ref", "fr-action", "perk", "utm_campaign", "utm_medium", "utm_source", "feed", "fb_source"];
                                ha = "";
                                for (l = 0; l < Z.length; l++)
                                    if (a = y(window.location.href, Z[l])) {
                                        if (l > 0) ha += "&";
                                        ha += Z[l] + "=" + a
                                    }
                                S += S.indexOf("?") == -1 ? "?" + ha : "&" + ha
                            } else if (Y == "full-page") {
                                e = "setupXdm=true";
                                S += S.indexOf("?") == -1 ? "?" + e : "&" + e
                            } else {
                                e = [];
                                S += "/widgets/" + M +
                                    "?";
                                l && e.push("campaign=" + encodeURIComponent(l));
                                e.push("width=" + encodeURIComponent(C));
                                if (C == 0) C = "100%";
                                else C += "px";
                                V += "px";
                                e.push("height=" + encodeURIComponent(V));
                                Z && e.push("colorscheme=" + encodeURIComponent(Z));
                                ha && e.push("customerData=" + encodeURIComponent(ha));
                                a && e.push("doRank=" + encodeURIComponent(a));
                                d && e.push("widgetHeading=" + encodeURIComponent(d));
                                g && e.push("target=" + encodeURIComponent(g));
                                if (q) {
                                    q = q.replace("#", "");
                                    I.test(q) && e.push("searchBackgroundColor=" + encodeURIComponent(q))
                                }
                                if (p) {
                                    p =
                                        p.replace("#", "");
                                    I.test(p) && e.push("searchTextColor=" + encodeURIComponent(p))
                                }
                                if (w) {
                                    w = w.replace("#", "");
                                    I.test(w) && e.push("borderColor=" + encodeURIComponent(w))
                                }
                                J && e.push("isSupportersLeaderboard=" + J);
                                K && e.push("stylesheet=" + encodeURIComponent(K));
                                S += e.join("&") + n
                            }
                        }
                        Z = ["badge", "grid", "carousel", "leaderboard", "smart"];
                        for (l = 0; l < Z.length; l++)
                            if (Z[l] == Y) {
                                S = S.replace("/" + M + "?", "/" + M + "/" + FR.sha1(S) + "/?");
                                break
                            }
                        if (t) S = t._getLinkerUrl(S) || S;
                        var ma = "fr-widget-iframe-" + (D + z),
                            ta = function (na, ra) {
                                if (na.indexOf(document.location.protocol +
                                    SERVER_URL + "/widgets/") == -1)
                                    if (EMBED_SECURE) na = na.replace(/^(http:)?\/\//, "https://");
                                var la = new window.FundRazr.easyXDM.Socket({
                                    remote: na,
                                    swf: document.location.protocol + SERVER_URL + "/widgets/js/easyxdm.swf",
                                    replaceElement: ra,
                                    isHost: true,
                                    props: {
                                        style: {
                                            border: "0 none",
                                            background: "transparent",
                                            width: C,
                                            "min-width": Q,
                                            "min-height": $,
                                            height: V
                                        },
                                        id: ma,
                                        scrolling: "no",
                                        frameBorder: "0",
                                        allowTransparency: true
                                    },
                                    onReady: function () {
                                        m && m(f);
                                        v = true
                                    },
                                    onMessage: function (X) {
                                        X = JSON.parse(X);
                                        switch (X.type) {
                                        case "show-tooltip":
                                            var qa =
                                                FR.get(this.props.id);
                                            j.show(qa, X.data.content, X.data.campaignUrl, X.data.colorscheme, X.data.pageX, X.data.pageY, X.data.tooltipElemWidth, X.data.target);
                                            break;
                                        case "hide-tooltip":
                                            j.hide(true);
                                            break;
                                        case "show-lightbox":
                                            A(X.data.campaignUrl, X.data.colorscheme);
                                            break;
                                        case "setSize":
                                        case "resize-iframe":
                                            qa = X.data.height;
                                            X = X.data.width;
                                            FR.get(ma).style.height = qa + "px";
                                            if (X) FR.get(ma).style.width = X + "px";
                                            o && o.resizeIframe && (0, o.resizeIframe)();
                                            break;
                                        case "scroll-to-iframe":
                                            window.scroll(FR.get(ma).pageX, FR.get(ma).pageY);
                                            break;
                                        case "scrollTo":
                                            qa = FR.get(ma);
                                            X = FR.offset(qa).top + X.data.top;
                                            window.scrollTo(0, X);
                                            break;
                                        case "getPageInfo":
                                            qa = FR.get(ma);
                                            X = {
                                                type: "setPageInfo",
                                                data: {
                                                    offsetTop: FR.offset(qa).top,
                                                    scrollTop: FR.scroll().top,
                                                    clientHeight: FR.client().height
                                                }
                                            };
                                            la.postMessage(JSON.stringify(X));
                                            break;
                                        case "iframe-reload":
                                            sa = ta(X.data.url, FR.get(ma));
                                            break;
                                        case "set-autopaginate":
                                            Y = X.data.widgetType;
                                            window.onscroll = R
                                        }
                                    }
                                });
                                return la
                            },
                            sa = ta(S, f);
                        U[ma] = sa
                    },
                    W = function (D, m) {
                        var f = D || document;
                        h = FR.getByClass(f, "div", WIDGET_CLASS);
                        for (i = 0; i < h.length; i++) B(i, m);
                        z += h.length;
                        var l = FR.getByClass(f, "div", "fr-create-campaign"),
                            o = FR.getByClass(f, "a", "fr-create-campaign");
                        l = l.concat(o);
                        for (x = 0; x < l.length; x++) FR.bindEvent(l[x], "click", function (R) {
                            var Q = "http" + (EMBED_SECURE ? "s" : "") + ":" + SERVER_URL + "/embed/create";
                            R = R || window.event;
                            var $ = R.target || R.srcElement;
                            R = [];
                            var M = $.getAttribute("data-partner");
                            M && R.push("partner=" + M);
                            (M = $.getAttribute("data-category")) && R.push("category=" + M);
                            ($ = $.getAttribute("data-tags")) && R.push("partnerTags=" +
                                encodeURIComponent($));
                            if (R.length > 0) Q += "?" + R.join("&");
                            A(Q, "light", false)
                        });
                        f = FR.getByClass(f, "div", "fr-create-campaign-form");
                        for (x = 0; x < f.length; x++) ca(f[x], x)
                    },
                    ca = function (D, m) {
                        u[m] = false;
                        var f = "http" + (EMBED_SECURE ? "s" : "") + ":" + SERVER_URL + "/embed/create-form",
                            l = [],
                            o = D.getAttribute("data-partner");
                        o && l.push("partner=" + o);
                        (o = D.getAttribute("data-stylesheet")) && l.push("stylesheet=" + encodeURIComponent(o));
                        (o = D.getAttribute("data-category")) && l.push("category=" + o);
                        (o = D.getAttribute("data-tags")) && l.push("partnerTags=" +
                            encodeURIComponent(o));
                        if (l.length > 0) f += "?" + l.join("&");
                        f = new window.FundRazr.easyXDM.Socket({
                            remote: f,
                            swf: document.location.protocol + SERVER_URL + "/widgets/js/easyxdm.swf",
                            replaceElement: D,
                            props: {
                                style: {
                                    border: "none",
                                    background: "transparent",
                                    width: "340px",
                                    height: "80px"
                                },
                                id: "fr-create-campaign-form-" + m,
                                scrolling: "no",
                                frameBorder: "0",
                                allowTransparency: true
                            },
                            onReady: function () {
                                u[m] = true
                            },
                            onMessage: function (R) {
                                R = JSON.parse(R);
                                switch (R.type) {
                                case "show-lightbox":
                                    A(R.data.campaignUrl, R.data.colorscheme,
                                        false);
                                    break;
                                case "setSize":
                                case "resize-iframe":
                                    FR.get(this.props.id).style.height = R.data.height + "px";
                                    break;
                                case "continue-lightbox":
                                    A("", "", true)
                                }
                            }
                        });
                        N[m] = f
                    },
                    ba = function (D) {
                        ja("show-content", D.data)
                    },
                    oa = function (D) {
                        ja("hide-content", D.data)
                    },
                    ja = function (D, m) {
                        for (x = 0; x < N.length; x++) {
                            var f = N[x];
                            u[x] && f.postMessage(JSON.stringify({
                                type: D,
                                data: m
                            }))
                        }
                    };
                return {
                    init: function () {
                        if (!b) {
                            b = true;
                            window.FundRazr.easyXDM = window.easyXDM.noConflict("FundRazr");
                            if (window._gat && window.FundRazr.gaTrackerName !== undefined) t =
                                _gat._getTrackerByName(window.FundRazr.gaTrackerName);
                            j = new FundRazr.module.hovertip(SERVER_URL);
                            j.init();
                            j.bind("click", function () {
                                j.getTarget() ? window.open(j.getTarget().replace("&amp;", "&")) : A(j.getCampaignUrl(), j.getColorscheme())
                            });
                            W(document);
                            O.listen("show-content", ba);
                            O.listen("hide-content", oa)
                        }
                    },
                    reset: function () {
                        h = {}
                    },
                    parse: function (D, m) {
                        W(D, m)
                    },
                    destroySocket: function (D) {
                        var m = U[D];
                        if (m) {
                            m.postMessage(JSON.stringify({
                                type: "destroy"
                            }));
                            m.destroy();
                            U[D] = null
                        }
                    },
                    resizeIframe: function (D) {
                        (D =
                            U[D]) && D.postMessage(JSON.stringify({
                            type: "resize-iframe"
                        }))
                    },
                    reload: function (D, m) {
                        var f = U[D];
                        f && f.postMessage(JSON.stringify({
                            type: "reload",
                            data: {
                                widgetType: m
                            }
                        }))
                    },
                    showCampaignOverlay: function (D, m, f) {
                        A(document.location.protocol + SERVER_URL + "/embed/activity/" + D, "light", f)
                    }
                }
            }(),
            location = document.location;
        if (location.href.indexOf(SERVER_URL) == -1 || !(location.pathname.search(/^\/widgets\/.+$/) == 0 && location.pathname.search(/^\/widgets\/test\/.+$/) != 0)) {
            WidgetManager.init();
            WidgetManager.reset = WidgetManager.reset;
            WidgetManager.parse = WidgetManager.parse;
            WidgetManager.showCampaignOverlay = WidgetManager.showCampaignOverlay;
            window.FundRazr.WidgetManager = WidgetManager
        } else window.FundRazr = FundRazr
    };
})();
