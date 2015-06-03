function loadConfig(path){
		var glob = require('glob');
		var object = {};
		var key;

		glob.sync('*', {cwd: path}).forEach(function(option) {
	    	key = option.replace(/\.js$/,'');
	    	object[key] = require(path + option);
  		});
 
  		return object;
}

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.loadTasks('tasks');

	var config = {
		pkg: grunt.file.readJSON('package.json'),
		env: process.env
	};
	 
	grunt.util._.extend(config, loadConfig('./tasks/options/'));
	 
	grunt.initConfig(config);

/*	// Loads task options from `tasks/options/` and `tasks/custom-options`
  	// and loads tasks defined in `package.json`
	var config = _.extend({},
	require('load-grunt-config')(grunt, {
	    configPath: path.join(__dirname, 'tasks/options'),
	    loadGruntTasks: false,
	    init: false
	  }),
	require('load-grunt-config')(grunt, { // Custom options have precedence
	    configPath: path.join(__dirname, 'tasks/custom-options'),
	    init: false
	  })
	);



	grunt.loadTasks('tasks');	// Load tasks in task/ folder




	grunt.registerTask('build', ['htmlmin:dist']);

	grunt.initConfig(config);

*/	
};

