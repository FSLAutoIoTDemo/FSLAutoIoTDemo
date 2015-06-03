// - Works on 'build/js/_base.js'
// - Dist: Parse, Compress, Beautify, 
// - Dev: Beautify only
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
        files: {
            expand: true,
            cwd: 'assets/js/',
            src:['**/*.js'],
            dest: 'assets/js/tmp/',
            ext: '.tmp.js'
        }
    },
    dev: {
    	options: {
    		'beautify': true
    	},
    	files: [{
            expand: true,
            cwd: 'assets/js/',
            src:['**/*.js'],
            dest: 'assets/js/tmp/',
            ext: '.tmp.js'
        }]
    }
};
