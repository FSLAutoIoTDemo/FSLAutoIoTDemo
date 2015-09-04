// - Look for HTML files in 'assets/html'
// - Dist: Remove comments & whitespace
// - Dev: Keep comments & whitespace
module.exports = {
	FSLfull: {
		options:{
			beautify: true,
            relative: true,
	        sections: {
	            indexNav: 'assets/html/indexNav/_indexNavFSLfull.html', 
	            indexMessage: 'assets/html/indexMessage/_indexMessageFSLfull.html', 
	            indexTitle: 'assets/html/indexTitle/_indexTitleFSLfull.html', 
	            vehicleNavVd: 'assets/html/vehNav/FSLfull/_vehNavVdFSLfull.html',
	            vehicleNavCons: 'assets/html/vehNav/FSLfull/_vehNavConsFSLfull.html',
	            vehicleNavFleet: 'assets/html/vehNav/FSLfull/_vehNavFleetFSLfull.html',
	        }
		},
		files: [{
			expand: true,
			cwd: 'assets/html/',
			src: ['*.__html'],
			dest: 'assets/tmp/',
			ext: '.html'
		}]
	},
	IBMcols: {
		options:{
			beautify: true,
            relative: true,
	        sections: {
	            indexNav: 'assets/html/indexNav/_indexNavIBMcols.html', 
	            indexMessage: 'assets/html/indexMessage/_indexMessageIBMcols.html', 
	            indexTitle: 'assets/html/indexTitle/_indexTitleIBMcols.html', 
	            vehicleNavVd: 'assets/html/vehNav/IBMcols/_vehNavVdIBMcols.html',
	            vehicleNavCons: 'assets/html/vehNav/IBMcols/_vehNavConsIBMcols.html',
	            vehicleNavFleet: 'assets/html/vehNav/IBMcols/_vehNavFleetIBMcols.html',
	        }
		},
		files: [{
			expand: true,
			cwd: 'assets/html/',
			src: ['*.__html'],
			dest: 'assets/tmp/',
			ext: '.html'
		}]
	}
};
