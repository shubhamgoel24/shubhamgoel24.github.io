function openmenu(){
    var x=document.getElementById("menubar");
    navigator.vibrate(2000);
    if(x.className == "menuclose")
        x.className="menuopen";
    else if(x.className == "menuopen")
        x.className="menuclose";
}
