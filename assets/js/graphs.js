

function initGraphs(pieHtmlId,chartHtmlId){

//function initGraphs(){	
	// Create Speed Graph
	drawInitSpeedPieChart(pieHtmlId);

	// Create Accel Graph
	drawInitAccelChart(chartHtmlId);
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
		newSpeedValue *= 2.25; 								//change to degrees
		GLB.speedPieData.setValue(1, 1, newSpeedValue); 		//mph
		GLB.speedPieData.setValue(2, 1, (270-newSpeedValue)); 	//empty segment

		// Update the Pie Chart
		GLB.speedPiechart.draw(GLB.speedPieData, GLB.speedPieOptions);
}





// Function to initialise & draw the speed Pie Chart
function drawInitAccelChart(chartHtmlId) {
		  
	GLB.accelLinedata = google.visualization.arrayToDataTable([
      ['Time', 'X-Axis', 'Y-Axis'],
      [0, 0.003,	-0.185],
	  [1, -0.026,	0.971],
	  [2, -0.085,	0.095],
	  [3, 0.655,	-0.077],
	  [4, 0.048,	0.015],
	  [5, 0.095,	-0.213],
	  [6, -0.426,	0.609],
	  [7, 0.19,	0.032],
	  [8, 0.04,	0.001],
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
	
	//##### DEBUG  - remove later
//	setInterval(updateAccelData, 1000); //trigger the update function every 1 seconds
}

function updateAccelData(xAccel,yAccel) {
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

