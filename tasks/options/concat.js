// - Look for JS files in 'assets/js'
// - Dist: Find all JS files and concatenate into 'build/_base.js'
module.exports = {
	options: {
		separator: ';',
	},
	dist: {
		files: [{
			//expand: true,
			//cwd: 'assets/js/',
			src:['assets/js/tmp/*.tmp.js'],
			dest: 'build/js/base.js'
		}]
	}
};
