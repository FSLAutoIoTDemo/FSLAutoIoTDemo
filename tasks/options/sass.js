// - Look for CSS files in 'assets/html'
// - Dist: Compresses CSS files
module.exports = {
	dist: {
		options:{
			sourcemap: 'none',
			trace: true,
			style: 'expanded'
		},
		files: [{
			src: 'assets/sass/main.scss',
			dest: 'build/css/main.css',
		}]
	},
	dev: {
		options:{
			sourcemap: 'auto',
			trace: true,
			style: 'expanded'
		},
		files: [{
			src: 'assets/sass/main.scss',
			dest: 'build/css/main.css',
		}]
	},

	
};
