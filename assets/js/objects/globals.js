// Add global namespace
var GLB = GLB || {};

// Initialise Global vars
GLB.map = null;				// Map object
GLB.mapCurrCenter = null;	// Center point of map
GLB.mapMarker = null;		// Marker on map

GLB.vehile = null;			// Vehicle Object

GLB.vdDemoData = null;		// Vehicle Dashboard Demo Data
GLB.vdDemoIdx = 0;			// Index for current VD Demo Data entry being used

GLB.speedPieData = null;		// Soeed Pie Chart Data
GLB.speedPieOptions = null;		// Speed Pie Chart Options
GLB.speedPiechart = null;		// Speed Pit Chart object

GLB.accelLinedata = null;		// Accel Line Graph Data
GLB.accelLineoptions = null;	// Accel Line Graph Options
GLB.accelLinegraph = null;		// Accel Line Graph object

// Speed Pie Chart variables
GLB.maxSpeed=120; //set the maximum speed for the speedometer
GLB.cssSppedPieSemiTransparent='#004461';
GLB.cssSppedPieFill='#ffffff';

// Accel Line Graph variable
GLB.dataPoints = 9; //set the number of points to be plotted
GLB.loopCount = GLB.dataPoints;