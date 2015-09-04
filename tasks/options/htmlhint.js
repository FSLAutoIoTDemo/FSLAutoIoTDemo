// - Look for HTML files in 'assets/html'
// - Perform Lint check on html files
module.exports = {
	dist: {
	    options: {
	        'tag-pair': true,
	        'tagname-lowercase': true,
	        'attr-lowercase': true,
	        'attr-value-double-quotes': true,
	        'doctype-first': true,
	        'spec-char-escape': true,
	        'id-unique': true,
	        'head-script-disabled': true,
	        'style-disabled': true
	    },
	    files: [{
			expand: true,
			cwd: 'assets/tmp/',
			src:['**/*.html'],
		}]
	}
};

