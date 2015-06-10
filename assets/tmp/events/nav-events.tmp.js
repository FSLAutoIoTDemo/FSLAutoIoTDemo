function navSetup() {
    $("#navSelectBut").click(navMenuExpose), $("#navSelectBut").hover(function() {
        GLB.navMenuStatus = !1, navMenuExpose();
    }, function() {
        GLB.navMenuStatus = !0, navMenuExpose();
    }), navMenuStatusSetVeh();
}

function navMenuExpose() {
    1 == GLB.navMenuStatus ? ($("#navSubMenu").css("visibility", "hidden"), $("#navSubMenu").css("opacity", "0"), 
    GLB.navMenuStatus = !1) : ($("#navSubMenu").css("visibility", "visible"), $("#navSubMenu").css("opacity", "1"), 
    GLB.navMenuStatus = !0);
}

function navMenuStatusSetVeh() {
    var a;
    switch (GLB.currVID) {
      case "1":
        a = "Live A";
        break;

      case "2":
        a = "Live B";
        break;

      case "3":
        a = "Live C";
        break;

      case "4":
        a = "Live D";
        break;

      case "5":
        a = "Live E";
        break;

      case "6":
        a = "Live F";
        break;

      default:
        a = "Demo";
    }
    $("#navMenuStatusId").text(a);
}