// Function to support nav bar button click to reveal menu
function navSetup(){
	$("#navSelectBut").click(function(){
		
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
	});
}
