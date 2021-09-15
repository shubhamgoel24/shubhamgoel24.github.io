var ind = 1;
show(ind);

function change(n) {
  show(ind += n);
}

function show(n) {
  var i;
  var imgs = document.getElementsByClassName("imagec");
  if (n > imgs.length){ind = 1;}    
  if (n < 1) {ind = imgs.length}
  for (i = 0; i < imgs.length; i++) {
      imgs[i].style.display = "none";  
  }
  imgs[ind-1].style.display = "block";
}