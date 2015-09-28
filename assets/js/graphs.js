

function initGraphs(pie,pieHtmlId,chart,chartHtmlId,gforce,gforceHtmlId,bar,barHtmlId){

//function initGraphs(){	
	// Create Speed Graph
	if(pie)
		drawInitSpeedPieChart(pieHtmlId);

	// Create Accel Graph
	if(chart)
		drawInitAccelChart(chartHtmlId);

	// Create G-Force Graph
	if(gforce)
		drawInitGforceGraph(gforceHtmlId);		

	// Create Bar Graph
	if(bar)
		drawInitBarGraph(barHtmlId);
}


function resizeChart (graphObj,gdata,goptions) {
    graphObj.draw(gdata,goptions);
} 

function addGraphResizeListener(graphObj,gdata,goptions){
// Resize the graph if the window resizes (graphs not dynamic)
    if (document.addEventListener) {
    	window.addEventListener('resize', function(){resizeChart(graphObj,gdata,goptions)});
	}
	else if (document.attachEvent) {
    	window.attachEvent('onresize',  function(){resizeChart(graphObj,gdata,goptions)});
	}
	else {
    	window.resize =  function(){resizeChart(graphObj,gdata,goptions)};
	}
}

// Function to initialise & draw the speed Pie Chart
function drawInitSpeedPieChart(pieHtmlId) {
	
	// Create default data for Speed Pie Chart
	GLB.speedPieData = google.visualization.arrayToDataTable([
	  ['segment', 'speed'],
	  ['bottom',  90],
	  ['mph',     0],
	  ['empty',    270],
	]);

	// Create Options for Speed Pie Chart
	GLB.speedPieOptions = {

	  pieHole: 0.5,					// Size of hole

	  // Set area of the chart within containing div (use full space)
	  chartArea: {left:0,top:0,width:'100%',height:'100%'},

	  legend: 'none',				// No legend
	  pieSliceText: 'none',			//turn off text in each slice

	  enableInteractivity: false,	// View only
	  tooltip: { trigger: 'none' },	//turn off pop up value when mouse scrolls over chart

	  pieStartAngle: 135,			

	  // Set colour for pie chart (use glob vars above)
	  slices: {
	    0: { color: 'transparent' },
	    1: { color: GLB.cssSppedPieFill },
		2: { color: GLB.cssSppedPieSemiTransparent},
	  },

	  // Make background components transparent
	  backgroundColor: 'transparent',
	  pieSliceBorderColor: 'transparent',
	};

	// Create a new chart object at the correct HTML ID location
	GLB.speedPiechart = new google.visualization.PieChart($(pieHtmlId)[0]);
	
	// Draw Chart
	GLB.speedPiechart.draw(GLB.speedPieData,GLB.speedPieOptions);

	// Add listener to resize graph dynamically
	addGraphResizeListener(GLB.speedPiechart, GLB.speedPieData, GLB.speedPieOptions);
	//###### Debug mode only - REMOVE later
//	setInterval(updateSpeedData, 1000); //trigger the update function every 1 seconds

}

// Update the Speed of the speed pie chart + text
function updateSpeedData(speed) {		//###need to pass in new val from websocket
		
		// #####DEBUG - remove later with websockets data
		//there are 3 segments that need to be updated
		//var newSpeedValue = (Math.floor(Math.random()*GLB.maxSpeed));
		
		newSpeedValue = speed;

		// Check if exceeds max speed, if so: set to max
		if(newSpeedValue>GLB.maxSpeed) {
			newSpeedValue = GLB.maxSpeed;
		}

		
		newSpeedValue = (newSpeedValue / GLB.maxSpeed) * 270;	// Ratio of speed in 270deg segment
		//newSpeedValue *= 2.25; 								//change to degrees
	
		// Check that chart exists on page		
		if(GLB.speedPieData){
			GLB.speedPieData.setValue(1, 1, newSpeedValue); 		//mph
			GLB.speedPieData.setValue(2, 1, (270-newSpeedValue)); 	//empty segment

			// Update the Pie Chart
			GLB.speedPiechart.draw(GLB.speedPieData, GLB.speedPieOptions);
		}
}





// Function to initialise & draw the speed Pie Chart
function drawInitAccelChart(chartHtmlId) {
		  
	GLB.accelLinedata = google.visualization.arrayToDataTable([
      ['Time', 'X-Axis', 'Y-Axis'],
      [0,0.000,0.000],
	  [1,0.000,0.000],
	  [2,0.000,0.000],
	  [3,0.000,0.000],
	  [4,0.000,0.000],
	  [5,0.000,0.000],
	  [6,0.000,0.000],
	  [7,0.000,0.000],
	  [8,0.000,0.000],
    ]);

	GLB.accelLineoptions = {
	  title: 'G-Forces',
	  titleTextStyle: {color: 'white', fontSize: 20, fontName: 'Roboto'},
	  hAxis: {
	    baselineColor: 'transparent',
	    gridlines: {
	      count: 0,
	    },
	    viewWindow: {min:0, max:(GLB.dataPoints-1)},
	  },
	  legend: 'none',
	  vAxis: {
	    baselineColor: 'white',
	    maxValue: 1,
	    minValue: -1,
	    gridlines: {
	      count: 0,
	    },
	  },

	  // Set area of the chart within containing div (use full space)
	  chartArea: {left:0,top:0,width:'100%',height:'100%'},

	  //width: '100%',
	  //height: '100%',
	  animation:{
	  	duration: 750, //also change value in updateAccelData function.
	  	easing: 'out',
	  	startup: false,
	  },
	  backgroundColor: '#6f6fcc',
	  series: {
	    0:{color: '#f2f4f6', visibleInLegend: true},
	    1:{color: '#c4e4ee', visibleInLegend: true}
	  },
	};

	GLB.accelLinegraph = new google.visualization.AreaChart($(chartHtmlId)[0]);

	// Draw Acceleration Line Graph
	GLB.accelLinegraph.draw(GLB.accelLinedata, GLB.accelLineoptions);

	// Add listener to resize graph dynamically
	addGraphResizeListener(GLB.accelLinegraph, GLB.accelLinedata, GLB.accelLineoptions);
	
	//##### DEBUG  - remove later
//	setInterval(updateAccelData, 1000); //trigger the update function every 1 seconds
}

function updateAccelData(xAccel,yAccel) {
	// Check if graph exists on page
	if(GLB.accelLinegraph){
		GLB.accelLinedata.addRows([[GLB.loopCount,  xAccel, yAccel]]); //add new data in row corresponding to loopCount
		GLB.accelLineoptions.hAxis.viewWindow.min += 1;
	    GLB.accelLineoptions.hAxis.viewWindow.max += 1;
		
		if (GLB.loopCount==1000) {
		  // Clean up time!
		  //we need to clean up array to prevent it from growing too large
		  //removing cells causes issues with animation so do not want to do this every loop
		  //hence the reason to do it periodically
		  GLB.accelLineoptions.hAxis.viewWindow.min = 0;
	      GLB.accelLineoptions.hAxis.viewWindow.max = (GLB.dataPoints-1);
		  GLB.accelLineoptions.animation.duration = 0; //turn off animation for this
		  GLB.accelLinedata.removeRows(0, (GLB.loopCount+1)-GLB.dataPoints);
		  //renumber the rows
		  for(var i=0; i<GLB.dataPoints; i++) {
		    GLB.accelLinedata.setValue(i,0,i);
		  }
		  GLB.accelLinegraph.draw(GLB.accelLinedata, GLB.accelLineoptions);
		  GLB.loopCount = GLB.dataPoints;
		  GLB.accelLineoptions.animation.duration = 750; 
		  return;
		}
		
		GLB.loopCount++;
		GLB.accelLinegraph.draw(GLB.accelLinedata, GLB.accelLineoptions);
	}
}



// Function to initialise & draw the speed Pie Chart
function drawInitGforceGraph(gforceHtmlId) {
	GLB.gforceGraphData = new google.visualization.DataTable();
    GLB.gforceGraphData.addColumn('number');
    GLB.gforceGraphData.addColumn('number');

    //add 50 rows
    for(var i=0; i<50;i++)
        GLB.gforceGraphData.addRow([null, null]);
    
    GLB.gforceGraphOptions = {
        
        hAxis: {title: 'Lateral', minValue: -0.5, maxValue: 0.5, minorGridlines: {count: 4}},
        vAxis: {title: 'Longitudinal', minValue: -0.5, maxValue: 0.5, minorGridlines: {count: 4}},
        legend: 'none',
   		chartArea: {width: '80%', height: '80%'},
        pointShape: 'circle',
        series: {
            0:{color: '#e66a08', visibleInLegend: true},
        },
        dataOpacity: 0.5, //make it easier to see overlapping points
        pointSize: 10,
        animation: {
            duration: 200,
            easing: 'inAndOut',
            startup: true,
        },
        tooltip: {trigger: 'selection'},
        //explorer: {}, //allows panning and zooming etc. listed as experimental in API guide.
        backgroundColor: {fill:'transparent'}
    };

    GLB.gforceGraph = new google.visualization.ScatterChart($(gforceHtmlId)[0]);
    
    // setup a listener to capture click events
    google.visualization.events.addListener(GLB.gforceGraph, 'select', processGforceEvent);

	// Add listener to resize graph dynamically
	addGraphResizeListener(GLB.gforceGraph, GLB.gforceGraphData, GLB.gforceGraphOptions);
    
    GLB.gforceGraph.draw(GLB.gforceGraphData, GLB.gforceGraphOptions);

    //## Hack (Not best way to implement) Only load Big Data application once graph is ready
    start_bigd_session();
}

function updateGforceData(gforce) {
	// If graph exists on page
	if(GLB.gforceGraph){
		// For length of new points
		for(var i=0; i<gforce.length;i++) {
	        if(gforce[i] === null) {
	            // If get to a null point before end of array, 
	            // then assume array is not full & initiate drawing graphs
	            GLB.gforceGraph.draw(GLB.gforceGraphData, GLB.gforceGraphOptions);
	            return;
	        }
	        // Add new list of Lat/Lng Values
	        GLB.gforceGraphData.setValue(i, 0, gforce[i].gLat);
	        GLB.gforceGraphData.setValue(i, 1, gforce[i].gLng);
	    }
	    
	    // At end of array, draw graph
	    GLB.gforceGraph.draw(GLB.gforceGraphData, GLB.gforceGraphOptions);
	}
}

function processGforceEvent(){
	// Get the current row selected
	var selection = GLB.gforceGraph.getSelection()[0];

	//make sure event was not triggered by deselection or reselection of currently displayed point.
    if (selection == null || selection.row == processGforceEvent.currentSelection) { 
        GLB.gforceGraph.setSelection([{row: processGforceEvent.currentSelection}]);
        return;
    } 
    processGforceEvent.currentSelection = selection.row;

    GLB.fleet.requestBDEvent(selection.row);
}


// Function to initialise & draw the speed Pie Chart
function drawInitBarGraph(barHtmlId) {
	
	GLB.insurBarData = google.visualization.arrayToDataTable([
		['Name', 'Premium', {role: 'style'},'Other',{role: 'style'}],
        ['', 400, 'color: #2ca02c; opacity: 1.0',600, 'color: black; opacity: 0.5'],
        ]);

	GLB.insurBarOptions = {
//		title: 'Live Insurance Premium',
//		titleTextStyle: {color: 'white', fontSize: 20, fontName: 'Roboto'},
        chartArea: {width: '100%'},
        hAxis: {
          minValue: 0,
		  maxValue: 1000,
		  baselineColor: 'white',
		  format: '$#,###',
		  gridlines: {color: 'white', count: 5},
		  textStyle: {color: 'white', fontSize: 15, fontName: 'Roboto'},
        },
        vAxis: {
			//textPosition: 'in',
        },
		isStacked: true,
		//bar: {groupWidth: "75%"},
		legend: 'none',
        backgroundColor: {fill:'transparent'},
		animation: {
          duration: 200,
          easing: 'inAndOut',
		  startup: true,
        }
	}
  
  	// Create bar graph object
  	GLB.insurBarGraph = new google.visualization.BarChart($(barHtmlId)[0]);
    
    // Draw bar graph
    GLB.insurBarGraph.draw(GLB.insurBarData, GLB.insurBarOptions);

    // Add listener to resize graph dynamically
	addGraphResizeListener(GLB.insurBarGraph, GLB.insurBarData, GLB.insurBarOptions);
}


// Update the Insurance Graph
function updateInsurGraphData(insur) {		
		// If bar chart exists on page
		if (GLB.insurBarData){
			// Update the graph data
			GLB.insurBarData.setValue(0, 1, insur); 
			GLB.insurBarData.setValue(0, 3, (1000-insur)); //this is the greyed area

			// Update the Bar Chart
			GLB.insurBarGraph.draw(GLB.insurBarData, GLB.insurBarOptions);
		}
}










