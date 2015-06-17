// Start events to provide page with Demo Data
function init_stressDemo(){
	console.log("OnPageLoad: Stress-Demo Mode Started");

	// Clear watchdog
	watchdogClear();

	// Load data for Stressful Street Dash page
	initStressDemoData();

	// Change Image Root to Local
	GLB.IMGROOT = "imgs/demo/stress/";
	GLB.IMGAPPEND = ".jpg";
	
	// SETUP TIMERS TO KICK OFF UPDATES
	//-> Update information @ t1

	setInterval(ssDemo_modifyStressData,60000);	// 1 minute
	setInterval(watchdogClear,10000);		// Clear Watchdog every 10 seconds

	ssDemo_modifyStressData();
}


// Update stressful street data
function ssDemo_modifyStressData(){
	
	var idx = GLB.stressDemoIdx;
	// Update stressful street data with new locations
	GLB.fleet.updateStessData(GLB.stressDemoData[idx].locations, GLB.stressDemoData[idx].mostStressful);

	console.log('Updated Stressful Street Demo Data');

	GLB.fleet.modifyStressMap();
	GLB.fleet.modifyStressCams();

	// Check if index has reached end of array
	// - If no: update by 1
	// - If yes: rollover
	if(idx==(GLB.stressDemoData.length-1))
		GLB.stressDemoIdx=0;
	else
		GLB.stressDemoIdx++;
}
