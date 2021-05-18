function openmenu(){
    var x=document.getElementById("menubar");
    if(x.className == "menuclose")
        x.className="menuopen";
    else if(x.className == "menuopen")
        x.className="menuclose";
}
