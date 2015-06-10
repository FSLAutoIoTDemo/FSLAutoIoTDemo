function navSetup() {
    $("#navSelectBut").click(function() {
        1 == GLB.navMenuStatus ? ($("#navSubMenu").css("visibility", "hidden"), $("#navSubMenu").css("opacity", "0"), 
        GLB.navMenuStatus = !1) : ($("#navSubMenu").css("visibility", "visible"), $("#navSubMenu").css("opacity", "1"), 
        GLB.navMenuStatus = !0);
    });
}