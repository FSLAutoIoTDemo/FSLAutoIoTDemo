module.exports = function(grunt) {
//  grunt.registerTask('helloWorld', 'Say hello!', function() {
//    grunt.log.writeln("Hello world!");
//  });

	grunt.registerTask('buildhtmlFSLfull-dist',  ['htmlbuild:FSLfull', 'htmlhint', 'htmlmin:dist' ]);
	grunt.registerTask('buildhtmlFSLfull-dev',  ['htmlbuild:FSLfull', 'htmlhint', 'htmlmin:dev']);
	
	grunt.registerTask('buildhtmlIBMcols-dist',  ['htmlbuild:IBMcols', 'htmlhint', 'htmlmin:dist' ]);
	grunt.registerTask('buildhtmlIBMcols-dev',  ['htmlbuild:IBMcols', 'htmlhint', 'htmlmin:dev']);

	grunt.registerTask('buildjs-dist',  ['clean', 'uglify:dist', 'concat' ]);
    grunt.registerTask('buildjs-dev',  ['clean', 'uglify:dev', 'concat' ]);
    
    grunt.registerTask('buildcss-dist',  ['sass:dist', 'cssmin']);
    grunt.registerTask('buildcss-dev',  ['sass:dev']);

    grunt.registerTask('buildFSLfull-dev',  ['buildhtmlFSLfull-dev','buildjs-dev', 'buildcss-dev']);
    grunt.registerTask('buildFSLfull-dist', ['buildhtmlFSLfull-dist','buildjs-dist', 'buildcss-dist']);

    grunt.registerTask('buildIBMcols-dev',  ['buildhtmlIBMcols-dev','buildjs-dev', 'buildcss-dev']);
    grunt.registerTask('buildIBMcols-dist', ['buildhtmlIBMcols-dist','buildjs-dist', 'buildcss-dist']);
};