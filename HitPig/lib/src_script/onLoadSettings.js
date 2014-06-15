var canvas;
canvas=document.getElementById('canvas');
var score_canvas=document.getElementById('score');




var unloaded = 1;
function init() {

    var phrase = "Click or tap the screen to start the game";
    var c = canvas.getContext('2d');
    c.fillStyle = "#000000";
     c.fillRect(0, 0, canvas.width, canvas.height);
   var frontImg = new Image();
    frontImg.src = "lib/logo_spe.png";
    originalWidth = frontImg.width;
    frontImg.width = Math.round((canvas.width) * 0.4);
    frontImg.height = Math.round((frontImg.width / originalWidth) * frontImg.height);
    var front = {
        x:canvas.width / 2 - frontImg.width / 2,
        y:canvas.height / 2 - frontImg.height / 2,
        W:frontImg.width,
        H:frontImg.height
    };
    c.drawImage(frontImg, front.x, front.y, front.W, front.H);


     c.fillStyle = 'green';
     c.font = 'bold 25px Arial,sans-serif';
      var phrase_size = c.measureText(phrase);
     c.fillText(phrase, canvas.width / 2 - phrase_size.width / 2, (canvas.height / 2 + frontImg.height / 2) * 1.1);

    _c=score_canvas.getContext('2d');



    window.addEventListener('click', handleClick, false);
}

function handleClick(){
    if(unloaded==1)
        init_world();
}

