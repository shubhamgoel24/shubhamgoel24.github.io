

let screen= document.getElementById('ans'); 
buttons = document.querySelectorAll('button');

for(item of buttons){ 
    item.addEventListener('click', (e)=>{ 

        inp = e.target.innerText;
        if(screen.value=="Invalid" || screen.value=="undefined" || screen.value=="Infinity")
        {
            screen.value="";
        }

        if(inp=='='){
            try{
                screen.value=eval(screen.value);
                screen.value=screen.value.toString(10);
            }
            catch{
                screen.value="Invalid";
            }
        }

        else if(inp=='C'){ 
            screen.value = "";
        }

        else{
            screen.value += inp;
        }

    }) 
    function clears()
        {
            if(screen.value=="Invalid" || screen.value=="undefined" || screen.value=="Infinity")
            {
                screen.value="";
            }
            else{
                screen.value=screen.value.substring(0,screen.value.length-1);
            }
        }

} 