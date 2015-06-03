// - Watch for changes in files and envoke dev builds automatically'
module.exports = {
	html: {
        files: ['assets/html/**/*.html'],
        tasks: ['buildhtml-dev']
    },

 	js: {
        files: ['assets/js/**/*.js'],
        tasks: ['buildjs-dev']
	},  

 	css: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['buildcss-dev']
	}  

};
