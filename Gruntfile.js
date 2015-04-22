module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
		 * Set project object
		 */
		project: {
		  assets: 'assets',
		  build: 'build',
		  scss: '<%= project.assets %>/sass/main.scss',
		  js: [
		    '<%= project.assets %>/js/**/*.js'
		  ],
		  css: '<%= project.build %>/css/main.css',
		},

        htmlhint: {
		    build: {
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
		        src: ['index.html']
		    }
		},

		uglify: {
		    build: {
		        files: {
		            'build/js/base.min.js': ['assets/js/base.js']
		        }
		    }
		},


		cssc: {
		    build: {
		        options: {
		            consolidateViaDeclarations: true,
		            consolidateViaSelectors:    true,
		            consolidateMediaQueries:    true
		        },
		        files: {
		            'build/css/main.css': 'build/css/main.css'
		        }
		    }
		},

		cssmin: {
		    build: {
		        src: 'build/css/main.css',
		        dest: 'build/css/main.css'
		    }
		},

		sass: {
		    build: {
		        files: {
		            'build/css/main.css' : 'assets/sass/main.scss'
		        }
		    }
		},



		watch: {
		    html: {
		        files: ['index.html'],
		        tasks: ['htmlhint']
		    },
		 	js: {
		        files: ['assets/js/base.js'],
		        tasks: ['uglify']
			},  
		 	css: {
		        files: ['assets/sass/**/*.scss'],
		        tasks: ['buildcss']
			}  
		}


    });

    grunt.registerTask('default', []);
    grunt.registerTask('buildcss-prod',  ['sass', 'cssc', 'cssmin']);
    grunt.registerTask('buildcss-dev',  ['sass']);

};



  