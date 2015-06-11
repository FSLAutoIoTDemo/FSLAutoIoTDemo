// Function to support nav bar button click to reveal menu
function navSetup(){
	// bind clicks to 'Select' button
	$("#navSelectBut").click(navMenuExpose);		
	// bind hovers over 'Select' button, pass in with either hide/unhide depending on hoverIn/hoverOut
	$("#navSelectBut").hover(function(){GLB.navMenuStatus=false; navMenuExpose();},function(){GLB.navMenuStatus=true; navMenuExpose();}); 

	// Update which vehicle is currently in use on the Nav bar
	navMenuStatusSetVeh();
}

// Function to hide/unhide the navigation menu
function navMenuExpose(){
		
		// Close the menu bar
		if(GLB.navMenuStatus==true){
			$("#navSubMenu").css('visibility','hidden');
			$("#navSubMenu").css('opacity','0');	
			GLB.navMenuStatus=false;
		}
		// Open the menu bar
		else{
			$("#navSubMenu").css('visibility','visible');
			$("#navSubMenu").css('opacity','1');	
			GLB.navMenuStatus=true;
		}
}

function navMenuStatusSetVeh(){

	var id;			// Vehicle ID

	switch(GLB.currVID){
		case "1":
			id="Live A";
			break;
		case "2":
			id="Live B";		
			break;
		case "3":
			id="Live C";
			break;
		case "4":
			id="Live D";
			break;
		case "5":
			id="Live E";
			break;
		case "6":
			id="Live F";
			break;
		case "7":
			id="Live G";
			break;		
		case "8":
			id="Live H";
			break;	
		case "50":	
			id="Live";		// All vehicles (BigData/Stress Street)
			break;	
		default:
			id="Demo";
	}

	$("#navMenuStatusText").text(id);
}