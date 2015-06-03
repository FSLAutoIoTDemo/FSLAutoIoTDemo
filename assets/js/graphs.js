var maxSpeed=120; //set the maximum speed for the speedometer
var cssSppedPieSemiTransparent='#004461';
var cssSppedPieFill='#ffffff';

function initGraphs(){
	
	// Create Speed Graph
	drawSpeedPieChart();

	// Create Accel Graph
	drawAccelChart();

}


// Function to draw the speed Pie Chart
function drawSpeedPieChart() {
	
	speedPieData = google.visualization.arrayToDataTable([
	  ['segment', 'speed'],
	  ['bottom',  90],
	  ['mph',     0],
	  ['empty',    270],
	]);


	speedPieOptions = {

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
	    1: { color: cssSppedPieFill },
		2: { color: cssSppedPieSemiTransparent},
	  },

	  // Make background components transparent
	  backgroundColor: 'transparent',
	  pieSliceBorderColor: 'transparent',
	};

	// Create a new chart object at div with id:'#vd-Speed-obj'
	speedPiechart = new google.visualization.PieChart($('#vd-Speed-obj')[0]);
	
	// Draw Chart
	speedPiechart.draw(speedPieData,speedPieOptions);

	//###### Debug mode only - REMOVE later
	setInterval(updateSpeedData, 1000); //trigger the update function every 1 seconds

}

// Update the Speed of the speed pie chart + text
function updateSpeedData() {		//###need to pass in new val from websocket
		
		// #####DEBUG - remove later with websockets data
		//there are 3 segments that need to be updated
		var newSpeedValue = (Math.floor(Math.random()*maxSpeed));
		
		// Check if exceeds max speed
		if(newSpeedValue>maxSpeed) {
			throw 'Error: Speed value is greater than max speed';
		}
		newSpeedValue *= 2.25; 						//change to degrees
		speedPieData.setValue(1, 1, newSpeedValue); 		//mph
		speedPieData.setValue(2, 1, (270-newSpeedValue)); 	//empty segment

		// Update the Pie Chart
		speedPiechart.draw(speedPieData, speedPieOptions);

		// Update the speed text
		$('#vd-Speed-speedtext').text(newSpeedValue);
}



var dataPoints = 9; //set the number of points to be plotted
var loopCount = dataPoints;

function drawAccelChart() {
		  
	accelLinedata = google.visualization.arrayToDataTable([
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

	accelLineoptions = {
	  title: 'G-Forces',
	  titleTextStyle: {color: 'white', fontSize: 20, fontName: 'Roboto'},
	  hAxis: {
	    baselineColor: 'transparent',
	    gridlines: {
	      count: 0,
	    },
	    viewWindow: {min:0, max:(dataPoints-1)},
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

	accelLinegraph = new google.visualization.AreaChart($('#vd-Accel-obj')[0]);

	// Draw Acceleration Line Graph
	accelLinegraph.draw(accelLinedata, accelLineoptions);
	
	//##### DEBUG  - remove later
	setInterval(updateAccelData, 1000); //trigger the update function every 1 seconds
}

function updateAccelData() {
	accelLinedata.addRows([[loopCount,  ((Math.random()*2)-1), ((Math.random()*2)-1)]]); //add new data in row corresponding to loopCount
	accelLineoptions.hAxis.viewWindow.min += 1;
    accelLineoptions.hAxis.viewWindow.max += 1;
	
	if (loopCount==1000) {
	  // Clean up time!
	  //we need to clean up array to prevent it from growing too large
	  //removing cells causes issues with animation so do not want to do this every loop
	  //hence the reason to do it periodically
	  accelLineoptions.hAxis.viewWindow.min = 0;
      accelLineoptions.hAxis.viewWindow.max = (dataPoints-1);
	  accelLineoptions.animation.duration = 0; //turn off animation for this
	  accelLinedata.removeRows(0, (loopCount+1)-dataPoints);
	  //renumber the rows
	  for(var i=0; i<dataPoints; i++) {
	    accelLinedata.setValue(i,0,i);
	  }
	  accelLinegraph.draw(accelLinedata, accelLineoptions);
	  loopCount = dataPoints;
	  accelLineoptions.animation.duration = 750; 
	  return;
	}
	
	loopCount++;
	accelLinegraph.draw(accelLinedata, accelLineoptions);
}

