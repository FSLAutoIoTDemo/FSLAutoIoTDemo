// Add global namespace
var GLB = GLB || {};

GLB.navMenuStatus=false;	// Nav Menu Open/Close status (true=opened/false=closed)

GLB.watchdogInterval = 10000;		// Check watchdog count every 10s
GLB.watchdogCount = 100;			// Inital watchdog count should be > Red Limit (i.e. default=offline)
GLB.watchdogLimitAmber = 3;			// Amber Limit (40seconds)
GLB.watchdogLimitRed = 11;			// Red Limit (120seconds)

GLB.currVID = 100;			// Vehicle ID - default to 100 (demo mode).
GLB.MaxVeh = 10;			// Max number of live vehicles

// CONSTANT definitions for page IDs
GLB.pgID = null;			// Page ID
GLB.PGVD = 'pgVD';
GLB.PGCONS = 'pgCONS';
GLB.PGSTRESS = 'pgSTRESS';
GLB.PGBIGD = 'pgBIGD';
GLB.PGFLEET = 'pgFLEET';

// Initialise Global vars
GLB.map = null;						// Map object
GLB.mapCurrCenter = null;			// Center point of map
GLB.mapMarker = null;				// Marker on map
GLB.carRoute = null;				// Polyline trace for map
GLB.mapStrokeColour = '#FF0000';	// Map Polyline colour
GLB.heatmap = null;					// Heat Map overlay

GLB.vehile = null;			// Vehicle Object
GLB.fleet = null;			// Fleet Object


GLB.vdDemoData = null;		// Vehicle Dashboard Demo Data
GLB.vdDemoIdx = 0;			// Index for current VD Demo Data entry being used

GLB.stressDemoData = null;	// Stressful Street Demo Data
GLB.stressDemoIdx = 0;		// Index for current SS Demo Data entry being used

GLB.bigdDemoData = null;	// Big Data Demo Data
GLB.bigdDemoIdx = 0;		// Index for current BD Demo Data entry being used

GLB.speedPieData = null;		// Soeed Pie Chart Data
GLB.speedPieOptions = null;		// Speed Pie Chart Options
GLB.speedPiechart = null;		// Speed Pit Chart object

GLB.accelLinedata = null;		// Accel Line Graph Data
GLB.accelLineoptions = null;	// Accel Line Graph Options
GLB.accelLinegraph = null;		// Accel Line Graph object

GLB.gforceGraphData = null;		// G-Force Graph Data
GLB.gforceGraphOptions = null;	// G-Force Graph Options
GLB.gforceGraph = null;			// G-Force Graph Object

GLB.insurBarData = null;		// Insurance Graph Data
GLB.insurBarOptions = null;		// Insurance Graph Options
GLB.insurBarGraph = null;		// Insurance Graph Object

// Speed Pie Chart variables
GLB.maxSpeed=120; //set the maximum speed for the speedometer
GLB.cssSppedPieSemiTransparent='#004461';
GLB.cssSppedPieFill='#ffffff';

// Accel Line Graph variable
GLB.dataPoints = 9; //set the number of points to be plotted
GLB.loopCount = GLB.dataPoints;

// WebSocket Definitions
GLB.socket = null;			// Current socket object
GLB.currSOCK = null;		// Current socket in session
GLB.sockAddr = null;		// Socket Address

GLB.multiSocket = [];			// Array of socket objects

GLB.SOCKROOT  = "wss://fslautoiotdemobackend.mybluemix.net"		// Use wss: (443) (vs ws: (80)) to get past mobile proxy

GLB.SOCKETVEH = ['/ws/vehicleA',
				'/ws/vehicleB',
				'/ws/vehicleC',
				'/ws/vehicleD',
				'/ws/vehicleE',
				'/ws/vehicleF',
				'/ws/vehicleG',
				'/ws/vehicleH',
				'/ws/vehicleI',
				'/ws/vehicleJ'];

GLB.SOCKETVEHALL = '/ws/vehicleAll';
GLB.SOCKETSTRESS = '/ws/stress';
GLB.SOCKETBIGD = '/ws/bigdata';
GLB.SOCKETDEBUG = '/ws/debug';


GLB.SOCKETSTRESSREQ = "request!";
GLB.SOCKETBIGDFLEETREQ = "Fleet Data Request!";
GLB.SOCKETBIGDEVREQ_S = "Event ";
GLB.SOCKETBIGDEVREQ_E = " Request!";

// Image SRC definitions
GLB.IMGROOT = 'https://03e88029-53b4-4909-93a8-24348cae4f74-bluemix.cloudant.com/ftfimages/';
GLB.IMGAPPEND = '/image.jpg';

// EKB Central Location
//GLB.DEFAULTLAT = 55.748223;
//GLB.DEFAULTLNG = -4.168670;

// JW Marriot Central Location
GLB.DEFAULTLAT = 30.261473;
GLB.DEFAULTLNG = -97.745283;
