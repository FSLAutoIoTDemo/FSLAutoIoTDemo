var GLB = GLB || {};

GLB.navMenuStatus = !1, GLB.watchdogInterval = 1e4, GLB.watchdogCount = 100, GLB.watchdogLimitAmber = 3, 
GLB.watchdogLimitRed = 11, GLB.currVID = 100, GLB.pgID = null, GLB.PGVD = "pgVD", 
GLB.PGCONS = "pgCONS", GLB.PGSTRESS = "pgSTRESS", GLB.PGBIGD = "pgBIGD", GLB.map = null, 
GLB.mapCurrCenter = null, GLB.mapMarker = null, GLB.carRoute = null, GLB.mapStrokeColour = "#FF0000", 
GLB.heatmap = null, GLB.vehile = null, GLB.fleet = null, GLB.vdDemoData = null, 
GLB.vdDemoIdx = 0, GLB.speedPieData = null, GLB.speedPieOptions = null, GLB.speedPiechart = null, 
GLB.accelLinedata = null, GLB.accelLineoptions = null, GLB.accelLinegraph = null, 
GLB.gforceGraphData = null, GLB.gforceGraphOptions = null, GLB.gforceGraph = null, 
GLB.insurBarData = null, GLB.insurBarOptions = null, GLB.insurBarGraph = null, GLB.maxSpeed = 120, 
GLB.cssSppedPieSemiTransparent = "#004461", GLB.cssSppedPieFill = "#ffffff", GLB.dataPoints = 9, 
GLB.loopCount = GLB.dataPoints, GLB.socket = null, GLB.currSOCK = null, GLB.sockAddr = null, 
GLB.SOCKROOT = "wss://fslautoiotdemobackend.mybluemix.net", GLB.SOCKETVEH = [ "/ws/vehicleA", "/ws/vehicleB", "/ws/vehicleC", "/ws/vehicleD", "/ws/vehicleE", "/ws/vehicleF", "/ws/vehicleG", "/ws/vehicleH", "/ws/vehicleI", "/ws/vehicleJ" ], 
GLB.SOCKETSTRESS = "/ws/stress", GLB.SOCKETBIGD = "/ws/bigdata", GLB.SOCKETSTRESSREQ = "request!", 
GLB.SOCKETBIGDFLEETREQ = "Fleet Data Request!", GLB.SOCKETBIGDEVREQ_S = "Event ", 
GLB.SOCKETBIGDEVREQ_E = " Request!", GLB.IMGROOT = "https://03e88029-53b4-4909-93a8-24348cae4f74-bluemix.cloudant.com/ftfimages/", 
GLB.IMGAPPEND = "/image.jpg";