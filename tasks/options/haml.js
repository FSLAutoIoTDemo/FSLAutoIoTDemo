// - Look for HTML files in 'assets/html'
// - Dist: Remove comments & whitespace
// - Dev: Keep comments & whitespace
module.exports = {
	dist: {
		options:[{
			context: {
				'greet': 'Morgan Freeman'
			}
		}],
		files: [{
			expand: true,
			cwd: 'assets/haml/',
			src:['**/*.haml'],
			dest: 'buildHaml/',
			ext: '.html'
		}]
	},

	dev: {
		options:{
		},
		files: [{
			expand: true,
			cwd: 'assets/haml/',
			src:['**/*.haml'],
			dest: 'buildHaml/',
			ext: '.html'
		}]
	}
};
