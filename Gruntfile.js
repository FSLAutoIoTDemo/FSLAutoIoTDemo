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
		        src: ['assets/html/index.html']
		    }
		},

		htmlmin: {
			dist: {
				options:{
					'removeComments': true,
					'collapseWhitespace': true
				},
				files: {
					'build/index.html' : 'assets/html/index-src.html'
				}

			},
			dev: {
				files: {
					'build/index.html' : 'assets/html/index-src.html'
				}
			}

		},

		uglify: {
		    dist: {
		        files: {
		            'build/js/base.min.js': ['assets/js/base.js']
		        }
		    }
		},


		cssc: {
		    dist: {
		        options: {
		            consolidateViaDeclarations: true,
		            consolidateViaSelectors:    true,
		            consolidateMediaQueries:    true
		        },
		        files: {
		            '<%= project.css %>': '<%= project.scss %>'
		        }
		    }
		},

		cssmin: {
		    dist: {
		        src: '<%= project.css %>',
		        dest: '<%= project.scss %>'
		    }
		},

		sass: {
		    dist: {
		    	options: {
			    	sourcemap: 'auto',
			    	trace: true,
			    	style: 'expanded'
			    },
		        files: {
		            '<%= project.css %>' : '<%= project.scss %>'
		        }
		    }
		},



		watch: {
		    html: {
		        files: ['assets/html/**/*.html'],
		        tasks: ['buildhtml-dev']
		    },
/*		 	js: {
		        files: ['assets/js/base.js'],
		        tasks: ['uglify']
			},  
*/
		 	css: {
		        files: ['assets/sass/**/*.scss'],
		        tasks: ['buildcss-dev']
			}  
		}


    });

    grunt.registerTask('default', []);
    
    grunt.registerTask('buildhtml-dist',  ['htmlhint', 'htmlmin:dist' ]);
    grunt.registerTask('buildhtml-dev',  ['htmlhint', 'htmlmin:dev']);
	
	grunt.registerTask('buildjs-dist',  ['uglify']);
    grunt.registerTask('buildjs-dev',  ['uglify']);
    
    grunt.registerTask('buildcss-dist',  ['sass:dist', 'cssc', 'cssmin']);
    grunt.registerTask('buildcss-dev',  ['sass:dist']);

};



  