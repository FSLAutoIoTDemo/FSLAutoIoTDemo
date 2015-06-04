module.exports = function(grunt) {
//  grunt.registerTask('helloWorld', 'Say hello!', function() {
//    grunt.log.writeln("Hello world!");
//  });

	grunt.registerTask('buildhtml-dist',  ['htmlhint', 'htmlmin:dist' ]);
	grunt.registerTask('buildhtml-dev',  ['htmlhint', 'htmlmin:dev']);
	
	grunt.registerTask('buildjs-dist',  ['clean', 'uglify:dist', 'concat' ]);
    grunt.registerTask('buildjs-dev',  ['clean', 'uglify:dev', 'concat' ]);
    
    grunt.registerTask('buildcss-dist',  ['sass:dist', 'cssc', 'cssmin']);
    grunt.registerTask('buildcss-dev',  ['sass:dev']);

    grunt.registerTask('build-dev',  ['buildhtml-dev','buildjs-dev', 'buildcss-dev']);
    grunt.registerTask('build-dist', ['buildhtml-dist','buildjs-dist', 'buildcss-dist']);

};