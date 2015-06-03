// - Look for CSS files in 'assets/html'
// - Dist: Compresses CSS files
module.exports = {
	dist: {
		options:{
			consolidateViaDeclarations: true,
		    consolidateViaSelectors:    true,
		    consolidateMediaQueries:    true
		},
		files: [{
			src: 'build/css/_main.css',
			dest: 'build/css/main.css',
		}]
	}
};
