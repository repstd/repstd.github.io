	function Enity(w,h,r,x,y,vx,vy,angular_v,density,friction,restitution,allowsleep,usrData){
	this.w=w;
	this.h=h;
	this.r=r;
	this.x=x;
	this.t=y;
	this.density=density;
	this.friction=friction;
	this.restitution=restitution;
	this.allowsleep=allowsleep;
	this.UsrData=usrData;
	};
    var SCALE =30;
     var canvasSize;
    canvasSize = {
        w:canvas.width/SCALE,
        h:canvas.height/SCALE
    };
    var ground_1;
    ground_1={
    groundSize: {
     w:canvasSize.h*0.01,
     h:canvasSize.h
             },
    density:1.0,
    friction:1.0,
    restitution:1.01,
      UsrData:{
          type:4,
          img:function(){
              var Img=new Image();
             // Img.src="lib/star_img.png";
              return Img;
          }
      },
        isSensor:false
};
    var ground_2;
    ground_2={
        groundSize : {
            w:canvasSize.w,
            h:canvasSize.w*0.01
        },
        density:2,
        friction:1.0,
        restitution:0.001,
        UsrData:{
            type:5,
            img:function(){
                var Img=new Image();
               // Img.src="lib/star_img.png";
                return Img;
            }
        },
        isSensor:false

    };

    var insect;
    insect={
        w:canvasSize.h*0.06,
        h:canvasSize.h*0.06,
        density:2,
        friction:0,
        restitution:0.2,
        allowSleep:false,
        UsrData:{
            type:1,
            img:function(){
                var Img=new Image();
                Img.src="images/target_img.png";
                return Img;
            }
        }
 };

    var slip_board;
    slip_board={
        w:3.5*insect.w,
        h:insect.h*0.2,
        x:(canvasSize.w)/2,
        y:ground_1.groundSize.h-0.2,
        vx:0,
        vy:0,
        density:10000,
        friction:1.0,
        restitution:1.01,
        allowSleep:false,
        shape:null,
        isSensor:false,
        UsrData:{
            type:2,
            img:function(){
                var Img=new Image();
               Img.src="images/slip_board_img_3.png";
                return Img;
            }
       }
};
	var ball;
    ball={
        r:insect.w/4,
        x:24*(ground_1.groundSize.w),
        y:ground_1.groundSize.h-13*(ground_2.groundSize.h/2)-insect.w/4,
		angle:0,
        vx:0,
        vy:0,
        density:30,
		angular_V:0,
        friction:0.9,
        restitution:1,
        allowSleep:false,
        UsrData:{
            type:3,
            img:function(){
               var Img=new Image();
                Img.src="images/bird_img.png";
                return Img;
            }

}
    };
    var rotating_Stick_Base;
    rotating_Stick_Base ={
        r:insect.w/4,
        x:ground_2.groundSize.w/2+ground_1.groundSize.w,
        y:	ground_1.groundSize.h*0.75,

        vx:0,
        vy:0,
        density:9,
        friction:0,
        restitution:0,
        allowSleep:false,
        shape:null,
        isSensor:false,
        UsrData:{
            type:6,
            img:function(){
                var Img=new Image();
                //Img.src="lib/star_img.png";
                return Img;
            }
        }
    };
    var rotating_Stick;
    rotating_Stick={
        h:2*rotating_Stick_Base.r,
        w:17*rotating_Stick_Base.r,
        x:ground_2.groundSize.w/2+ground_1.groundSize.w,
        y:ground_1.groundSize.h*0.75,
        vx:0,
        vy:0,
        angular_V:0,
        density:1,
        friction:8,
        restitution:0.5,
        allowSleep:false,
        shape:null,
		angle:Math.PI/2,
        isSensor:false,
        UsrData:{
            type:7,
            img:function(){
                var Img=new Image();
                Img.src="images/slip_board_img.png";
                return Img;
            }
        }
    };
  var  N=Math.round(canvasSize.w/insect.w)*0.6;

  var body_location;
    body_location={
        step_x:insect.w*0.2+insect.w,
        step_y:insect.h*0.2+insect.h,
        offset_x:((ground_2.groundSize.w - ground_1.groundSize.w) - N*insect.w - (N - 1) * insect.w*0.2)*0.5,
        offset_y:insect.w*0.01
    };
  var Impulse;
  Impulse={
	left:new b2Vec2(-800,0),
	right:new b2Vec2(800,0)
	
};






