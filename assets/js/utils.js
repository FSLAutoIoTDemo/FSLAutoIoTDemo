// Inheritance Function for objects
// Stefanov, Stoyan (2010-09-16). JavaScript Patterns (p. 127). OReilly Media - A. Kindle Edition. 
function inherit(C, P) {
	C.prototype = new P();
/*	 var F = function () {};     
	F.prototype = P.prototype;     
	C.prototype = new F();     
	C.uber = P.prototype;     
	C.prototype.constructor = C;
*/	
}