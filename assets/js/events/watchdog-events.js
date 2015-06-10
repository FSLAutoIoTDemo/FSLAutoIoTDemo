// Function to support nav bar button click to reveal menu
function watchdogInit(){
	setInterval(watchdogCount,GLB.watchdogInterval);	// Call every 30 seconds
}

// Checks the limit of the watchdog and increments
// Will update the Nav status color with correct colour
function watchdogCount(){

	// Test status of watchdog, update status icon
	// -> If above amber limit, change status to orange
	if(GLB.watchdogCount > GLB.watchdogLimitAmber)
		$("#navMenuStatusId").css("background-color", '#e66a08');
	// -> If above red limit, change status to orange
	else if(GLB.watchdogCount > GLB.watchdogLimitRed)
		$("#navMenuStatusId").css("background-color", 'red');
	else
		$("#navMenuStatusId").css("background-color", 'green');
	
	// Increment Watchdog Count
	GLB.watchdogCount += 1;
}

function watchdogClear(){
	GLB.watchdogCount = 0;
}