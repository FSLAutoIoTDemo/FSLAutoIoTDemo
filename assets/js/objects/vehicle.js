//######### VEHICLE obj - Parent Obj ###########################/
// Create object that contains data for one vehicle
function Vehicle(){

	var id = null;
	var time = null;
	var vehicle = 0;
	
	// Default all display text to "--"
	var speed = "--";		// Speed
	var accel = "--";		// Acceleration
	var heart = "--";		// Heart Rate

	var fGax = "--";		// X-Accel
	var fGay = "--";		// Y-Accel
	var fGaz = "--";		// Z-Accel

	// Default map location to Marriot Downtown Austin
	var lat = 30.264524;	// Latitude
	var lng = -97.743435;	// Longtitude

	// Default insurance to 50%
	var insurance = 500;	// Insurance cost ($'s)

	var driverimg = "imgs/fill.svg";		// Driver Camera
	var roadimg = "imgs/fill.svg";			// Road Camera
}

//######### VEHICLE obj - PROTOTYPES ###########################/

// Prototype function to set all the Alpha Numberic Values of Vehicle (i.e. all but imgs)
Vehicle.prototype.updateData = function(_id, _vehicle, _speed, _accel, _heart, _fGax, _fGay, _fGaz, _lat, _lng, _insurance,_time){
	
	this.id = _id;
	this.time = _time;
	this.vehicle = _vehicle;
	
	// Default all display text to "--"
	this.speed = _speed;		// Speed
	this.accel = _accel;		// Acceleration
	
	// Only update heart rate if greater than 0
	if(_heart>0)
		this.heart = _heart;		// Heart Rate

	this.fGax = _fGax;		// X-Accel
	this.fGay = _fGay;		// Y-Accel
	this.fGaz = _fGaz;		// Z-Accel

	// Default map location to Marriot Downtown Austin
	this.lat = _lat;	// Latitude
	this.lng = _lng;	// Longtitude

	// Default insurance to 50%
	this.insurance = _insurance;	// Insurance cost ($'s)
}

// Prototype function to update source of driver facing image
Vehicle.prototype.updateDriverImg = function(img_src){
	this.driverimg = GLB.IMGROOT + img_src + GLB.IMGAPPEND;
}

// Prototype function to update source of front facing image
Vehicle.prototype.updateRoadImg = function(img_src){
	this.roadimg = GLB.IMGROOT + img_src + GLB.IMGAPPEND;
}

// Returns ID value
Vehicle.prototype.getVehicle = function(){
	return this.vehicle;
}

// Returns ID value
Vehicle.prototype.setVehicle = function(vID){
	this.vehicle = vID;
}