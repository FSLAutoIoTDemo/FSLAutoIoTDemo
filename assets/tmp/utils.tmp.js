function inherit(a, b) {
    a.prototype = new b();
}