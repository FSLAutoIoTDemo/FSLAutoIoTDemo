function inherit(a, b) {
    a.prototype = new b();
}

function getQueryVariable(a) {
    for (var b = window.location.search.substring(1), c = b.split("&"), d = 0; d < c.length; d++) {
        var e = c[d].split("=");
        if (e[0] == a) return e[1];
    }
    return !1;
}