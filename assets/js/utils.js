// Inheritance Function for objects
// Stefanov, Stoyan (2010-09-16). JavaScript Patterns (p. 127). OReilly Media - A. Kindle Edition. 
function inherit(C, P) {
	
	// Inherting this way allows child to access parent private members (not ideal, but quicker)
	// i.e. In child: 'this.variable' will access 'var variable' in parent.
	C.prototype = new P();		

	// Inheriting this way allows the child in inherit only the parent prototypes, keeping private members 
	// of the parent private.
	// - This is the proper way for reuse, but means that must have good prototypes
/*	 var F = function () {};     
	F.prototype = P.prototype;     
	C.prototype = new F();     
	C.uber = P.prototype;     
	C.prototype.constructor = C;
*/	
}

// Get the URL variables
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}