var GLB = GLB || {};

GLB.currVID = 1, GLB.PGVD = "pgVD", GLB.PGCONS = "pgCONS", GLB.PGSTRESS = "pgSRESS", 
GLB.PGBIGD = "pgBIGD", GLB.map = null, GLB.mapCurrCenter = null, GLB.mapMarker = null, 
GLB.carRoute = null, GLB.mapStrokeColour = "#FF0000", GLB.vehile = null, GLB.vdDemoData = null, 
GLB.vdDemoIdx = 0, GLB.speedPieData = null, GLB.speedPieOptions = null, GLB.speedPiechart = null, 
GLB.accelLinedata = null, GLB.accelLineoptions = null, GLB.accelLinegraph = null, 
GLB.maxSpeed = 120, GLB.cssSppedPieSemiTransparent = "#004461", GLB.cssSppedPieFill = "#ffffff", 
GLB.dataPoints = 9, GLB.loopCount = GLB.dataPoints, GLB.socket = null, GLB.currSOCK = null, 
GLB.sockAddr = null, GLB.SOCKROOT = "ws://fslautoiotdemobackend.mybluemix.net", 
GLB.SOCKETA = "/ws/vehicleA", GLB.SOCKETB = "/ws/vehicleB", GLB.SOCKETC = "/ws/vehicleC", 
GLB.SOCKETD = "/ws/vehicleD", GLB.SOCKETE = "/ws/vehicleE", GLB.SOCKETF = "/ws/vehicleF", 
GLB.SOCKETG = "/ws/vehicleG", GLB.SOCKETH = "/ws/vehicleH", GLB.SOCKETI = "/ws/vehicleI", 
GLB.SOCKETJ = "/ws/vehicleJ", GLB.SOCKETSTRESS = "/ws/stress", GLB.SOCKETBIGD = "/ws/bigdata", 
GLB.SOCKETSTRESSREQ = "request!", GLB.SOCKETBIGDFLEETREQ = "Fleet Data Request!", 
GLB.IMGROOT = "https://03e88029-53b4-4909-93a8-24348cae4f74-bluemix.cloudant.com/ftfimages/", 
GLB.IMGAPPEND = "/image.jpg";