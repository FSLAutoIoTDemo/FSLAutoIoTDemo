// - Look for HTML files in 'assets/html'
// - Dist: Remove comments & whitespace
// - Dev: Keep comments & whitespace
module.exports = {
	dist: {
		options:{
			'removeComments': true,
			'collapseWhitespace': true
		},
		files: [{
			expand: true,
			cwd: 'assets/html/',
			src:['**/*.html'],
			dest: 'build/',
			ext: '.html'
		}]
	},

	dev: {
		options:{
			'removeComments': false,
			'collapseWhitespace': false
		},
		files: [{
			expand: true,
			cwd: 'assets/html/',
			src:['**/*.html'],
			dest: 'build/',
			ext: '.html'
		}]
	}
};
