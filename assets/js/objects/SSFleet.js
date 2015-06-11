//######### VDVEHICLE obj - Child Obj of VEHICLE ###########################/
// Create child element of Vehicle, specifically for Stressfull Street
function SSFleet(){}

inherit(SSFleet, Fleet);

// Update the SS Map element on page
SSFleet.prototype.modifyStressMap = function(){
	
	//Update heat map
	updateHeatMapData(this.locations);
}

// Update the VD Page Map with Vehicle object data
SSFleet.prototype.modifyStressCams = function(){
	
	// Cycle through top 3 entries
	for (var i=0; i<3; i++){

		// Update Camera, check for valid entry - use fallback if not present
		if (this.mostStressful[i].camPic === null){
			$('#stress-RoadCam-img'+ i).attr('src', "imgs/fill.svg");	
		}
		else{
			var imgSrc = GLB.IMGROOT + this.mostStressful[i].camPic + GLB.IMGAPPEND;
			$('#stress-RoadCam-img'+ i).attr('src', imgSrc);
		}

		// Update Street Name, check for valid entry - use fallback if not present
		if (this.mostStressful[i].streetName === null)
			$('#stressStreet'+ i).text('--');
		else
			// Streetname
			$('#stressStreet'+ i).text(this.mostStressful[i].streetName);

		// Update Heart Rate Change, check for valid entry - use fallback if not present
		if (this.mostStressful[i].heartDelta === null)
			$('#stressHeart'+ i).text('-- %');
		else
			// Heart Rate change
			$('#stressHeart'+ i).text(this.mostStressful[i].heartDelta);
	}
}

// Update stressful street data
SSFleet.prototype.processSocketStress = function(dIn){
	
	// Update stressful street data with new locations
	this.updateStessData(dIn.locations, dIn.mostStressful);

	console.log('Updated Stressful Street Data');

	this.modifyStressMap();
	this.modifyStressCams();
}
