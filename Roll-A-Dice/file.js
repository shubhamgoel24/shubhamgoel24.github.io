function intr(){
    z=(Math.floor(Math.random() * Math.floor(7)));
    if(z==0){
        z=3;
    }
    y=document.getElementById('si').innerHTML=z;
    x=document.getElementsByClassName('cube')[0];
    x.classList.remove('leftr');
}

function roll(){
    y=document.getElementById('si').innerHTML="";
    x=document.getElementsByClassName('cube')[0];
    x.classList.add('leftr');
    setTimeout(intr,1000)
}

