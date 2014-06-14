	//preSetting
	{var world,Listener,Insect,slip_Board,Ball,rotating_stick;
     var Score,Acceration_Cnt,insect_num;

	var b2Vec2,b2BodyDef, b2Body, b2FixtureDef, b2Fixture, b2World, b2MassData, b2PolygonShape, b2CircleShape,
	b2DebugDraw,b2RevoluteJointDef,b2RevoluteJoint,b2JointDef,b2JointDef,b2PrismaticJoint,b2PrismaticJointDef;

	var offset_x;
	b2Vec2 = Box2D.Common.Math.b2Vec2;
	b2BodyDef = Box2D.Dynamics.b2BodyDef;
	b2Body = Box2D.Dynamics.b2Body;
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	b2Fixture = Box2D.Dynamics.b2Fixture;
	b2World = Box2D.Dynamics.b2World;
	b2MassData = Box2D.Collision.Shapes.b2MassData;
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
	b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint;
	b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint;
	b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
	b2Joint = Box2D.Dynamics.Joints.b2Joint;
	b2JointDef = Box2D.Dynamics.Joints.b2JointDef;
        b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint;
            b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;
	world = new b2World(
	new b2Vec2(0,10)    //gravity
	, true                 //allow sleep
	);

        world.draw=function(canvas) {
            var context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);
            for(var b = world.GetBodyList(); b !== null; b = b.GetNext()) {
                if(b.GetUserData()) {
						
                        var data = b.GetUserData(),Image=data.img();
						if(data.type){
                        var position= b.GetWorldCenter();
                        var s_x=-(Image.width)/2,s_y=-(Image.height)/2;

                        context.save();
						
						context.translate((position.x)*SCALE,(position.y)*SCALE);
						context.rotate(b.GetAngle());

                        
						context.drawImage(Image,s_x,s_y,Image.width,Image.height);
                        context.restore();
						}
						}
						

                
            }
        };


    }
	function init_world() {


	//create ground
	{
	var groundDef = new b2BodyDef;
	groundDef.type = b2Body.b2_staticBody;
	groundDef.userData=ground_1.UsrData;
	var groundFixDef = new b2FixtureDef;
	groundFixDef.density =ground_1.density;
	groundFixDef.friction =ground_1.friction,
	groundFixDef.restitution =ground_1.friction;
	groundFixDef.isSensor=ground_1.isSensor;
	groundDef.position.x = ground_1.groundSize.w / 2;
	groundDef.position.y = ground_1.groundSize.h / 2;
	groundFixDef.shape = new b2PolygonShape;
	groundFixDef.shape.SetAsBox((ground_1.groundSize.w) / 2, (ground_1.groundSize.h) / 2);
	world.CreateBody(groundDef).CreateFixture(groundFixDef);//upper boarder
	groundDef.position.x = ground_2.groundSize.w-ground_1.groundSize.w / 2;
	groundDef.position.y = ground_1.groundSize.h / 2;
	world.CreateBody(groundDef).CreateFixture(groundFixDef);////lower boarder
	groundDef.position.x = ground_2.groundSize.w / 2;
	groundDef.position.y = ground_2.groundSize.h / 2;
	groundFixDef.shape = new b2PolygonShape;
	groundFixDef.shape.SetAsBox((ground_2.groundSize.w) / 2, (ground_2.groundSize.h) / 2);
	world.CreateBody(groundDef).CreateFixture(groundFixDef);//left boarder
	groundDef.userData=ground_2.UsrData;
	groundDef.position.x = ground_2.groundSize.w / 2;
	groundDef.position.y = ground_1.groundSize.h-ground_2.groundSize.h / 2;
	world.CreateBody(groundDef).CreateFixture(groundFixDef);//right boarder
	}
	//create insects
	{
	Insect=new Array;
	var insectDef=new b2BodyDef;
	insectDef.type=b2Body.b2_staticBody;
	insectDef.allowSleep=insect.allowSleep;
	insectDef.userData=insect.UsrData;
	var insectFixDef=new b2FixtureDef;
	insectFixDef.density =insect.density;
	insectFixDef.friction =insect.friction;
	insectFixDef.restitution =insect.restitution;
	insectFixDef.shape=new b2PolygonShape;
	insectFixDef.shape.SetAsBox((insect.w)/2,(insect.h)/2);
    var x_0=ground_1.groundSize.w+body_location.offset_x,
	y_0=ground_2.groundSize.h+body_location.offset_y,
    N_=N;
	insect_num=0;
	for(var j=0;j<=6;j++){
	N_-=2;
	x_0+=body_location.step_x;
	y_0+=body_location.step_y;
	for(var i=0;i<=N_;i++)
	{
	insectDef.position.x=x_0+i*body_location.step_x;
	insectDef.position.y=y_0;
	insect_num++;
	Insect[insect_num]=world.CreateBody(insectDef);
	Insect[insect_num].CreateFixture(insectFixDef);
	}
	}
	}
	var vertexCount=3;
	//create a slip board
	{
	var slip_BoardDef=new b2BodyDef;
	slip_BoardDef.type=b2Body.b2_dynamicBody;
	slip_BoardDef.allowSleep=slip_board.allowSleep;
	slip_BoardDef.userData=slip_board.UsrData;
	slip_BoardDef.fixedRotation=true;
	var slip_BoardFixDef=new b2FixtureDef;
	slip_BoardFixDef.density=slip_board.density;
	slip_BoardFixDef.friction=slip_board.friction;
	slip_BoardFixDef.restitution=slip_board.restitution;
	slip_BoardFixDef.isSensor=slip_board.isSensor;
	slip_BoardFixDef.shape=new b2PolygonShape;
	slip_BoardFixDef.shape.SetAsBox(slip_board.w/2,slip_board.h/2);
	slip_BoardDef.position.x=slip_board.x;
	slip_BoardDef.position.y=slip_board.y;
	slip_BoardDef.linearVelocity=new b2Vec2(slip_board.vx,slip_board.vy);
	var slip_BoardDef_l=new b2FixtureDef;
	slip_BoardDef_l.shape=new b2PolygonShape;
        slip_BoardDef_l.restitution=slip_board.restitution;
	var vertices= new Array();
	vertices[0]=new b2Vec2(-slip_board.w*0.5,-slip_board.h/2);
	vertices[1]=new b2Vec2(0,-slip_board.h/2-slip_board.h*2.8);
	vertices[2]=new b2Vec2(0,slip_board.h/2);
	slip_BoardDef_l.shape.SetAsVector(vertices,vertexCount); var
	slip_BoardDef_r=new b2FixtureDef;
    slip_BoardDef_r.shape=new b2PolygonShape;
        slip_BoardDef_r.restitution=slip_board.restitution;

        var vertices= new Array();
    vertices[0]=new b2Vec2(0,-slip_board.h/2-slip_board.h*2.8);
     vertices[1]=new b2Vec2(slip_board.w*0.5,-slip_board.h/2);
     vertices[2]=new b2Vec2(0,slip_board.h/2);
     slip_BoardDef_r.shape.SetAsVector(vertices,vertexCount);
	
	slip_Board=world.CreateBody(slip_BoardDef);

	slip_Board.CreateFixture(slip_BoardFixDef);
	slip_Board.CreateFixture(slip_BoardDef_l);
	slip_Board.CreateFixture(slip_BoardDef_r);

	}
	//create a shooting base
	{

	var shoot_base_1_Def=new b2BodyDef;
	shoot_base_1_Def.type=b2Body.b2_staticBody;
	shoot_base_1_Def.userData=ground_1.userData;
	var shoot_base_1_FixDef=new b2FixtureDef;
	shoot_base_1_FixDef.density=slip_board.density;
	shoot_base_1_FixDef.friction=slip_board.friction;
	shoot_base_1_FixDef.restitution=slip_board.restitution;
	shoot_base_1_FixDef.shape=new b2PolygonShape;
	var vertices_2= new Array(),vertex_count_2=4;
        vertices_2[0]=new b2Vec2(ground_1.groundSize.w,
                                 ground_1.groundSize.h-ground_2.groundSize.h/2);
        vertices_2[1]=new b2Vec2(ground_1.groundSize.w,
                                 ground_1.groundSize.h-5*(ground_2.groundSize.h/2));
        vertices_2[2]=new b2Vec2(25*(ground_1.groundSize.w),
                                 ground_1.groundSize.h-13*(ground_2.groundSize.h/2));
        vertices_2[3]=new b2Vec2(25*(ground_1.groundSize.w),
                                    ground_1.groundSize.h-ground_2.groundSize.h/2);
	shoot_base_1_FixDef.shape.SetAsVector(vertices_2,vertex_count_2,true);

	var shoot_base_1=world.CreateBody(shoot_base_1_Def);
	shoot_base_1.CreateFixture(shoot_base_1_FixDef);

	}

	//game start---create a ball
	{//ball
	var ballDef=new b2BodyDef;
	ballDef.userData=ball.UsrData;
	ballDef.type=b2Body.b2_dynamicBody;
	ballDef.allowSleep=ball.allowSleep;
	ballDef.angularVelocity=ball.angular_V;
	var ballFixDef=new b2FixtureDef;
	ballFixDef.density=ball.density;
	ballFixDef.friction=ball.friction;
	ballFixDef.restitution=ball.restitution;

	ballFixDef.shape=new b2CircleShape(ball.r);
	ballDef.position.x=ball.x;
	ballDef.position.y=ball.y;
	ballDef.linearVelocity=new b2Vec2(ball.vx,ball.vy);
    Ball=world.CreateBody(ballDef);
	Ball.CreateFixture(ballFixDef);
    }
	//create a rotating body
	{
	var fixed_base_Def=new b2BodyDef;
	fixed_base_Def.type=b2Body.b2_staticBody;
	fixed_base_Def.position=new b2Vec2(rotating_Stick_Base.x,rotating_Stick_Base.y);
	var fixed_base_fix_Def=new b2FixtureDef;
	fixed_base_fix_Def.density=rotating_Stick_Base.density;
	fixed_base_fix_Def.friction=rotating_Stick_Base.friction;
	fixed_base_fix_Def.shape=new b2CircleShape(rotating_Stick_Base.r);
	var fixed_base=world.CreateBody(fixed_base_Def);
	fixed_base.CreateFixture(fixed_base_fix_Def);
	
	var rotating_stick_Def=new b2BodyDef;
	rotating_stick_Def.type=b2Body.b2_dynamicBody;
	rotating_stick_Def.userData=rotating_Stick.UsrData;
		rotating_stick_Def.angle=rotating_Stick.angle;

	rotating_stick_Def.position=new b2Vec2(rotating_Stick.x,rotating_Stick.y);
        rotating_stick_Def.angularVelocity=rotating_Stick.angular_V;

        var rotating_stick_fix_Def=new b2FixtureDef;
        rotating_stick_fix_Def.density=rotating_Stick.density;
        rotating_stick_fix_Def.friction=rotating_Stick.friction;
	rotating_stick_fix_Def.shape=new b2PolygonShape;
	rotating_stick_fix_Def.shape.SetAsBox(rotating_Stick.w/2,rotating_Stick.h/2);
	rotating_stick_fix_Def.allowSleep=rotating_Stick.allowSleep;
	rotating_stick=world.CreateBody(rotating_stick_Def);
	rotating_stick.CreateFixture(rotating_stick_fix_Def);
	var ReJointDef=new b2RevoluteJointDef;
    ReJointDef.maxMotorTorque=400;
	ReJointDef.lowerAngle=0;
	ReJointDef.upperAngle=(Math.PI);
	ReJointDef.enableLimit = false;
	ReJointDef.maxMotorTorque = 50.0;
	ReJointDef.motorSpeed = 50.0;
	ReJointDef.enableMotor = true;
	ReJointDef.Initialize(fixed_base,rotating_stick,fixed_base.GetWorldCenter());

	world.CreateJoint(ReJointDef);
	
	}
	//stimulating the physical world
	{
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFillAlpha(50);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit);
	world.SetDebugDraw(debugDraw);

        window.setInterval(update, 60/100);

	}
	Listener=new MyListener();
	
	world.SetContactListener(Listener);
	window.addEventListener('keydown',keyPressed_handler,false);
	window.addEventListener('keypressed',keyPressed_handler,false);
	window.addEventListener('keyup',keyReleased_handler,false);

        unloaded = 0;
       Score=0;
        Acceration_Cnt=300;


    };
	function update() {

      world.Step(
	1 /300  //frame-rate
	, 1000   //velocity iterations
	, 1000//position iterations
	);
		End_Game_Check(insect_num,canvas)
		Score=CollisionProcessing(Listener,Score);
		update_score(Score,score_canvas);

        keyContactProcessing(ControlState);
		


        world.DrawDebugData();
		world.draw(canvas);

        world.ClearForces();



    };
	
	
	function MyListener(){
	this.ContactStore=new Array;
	this.name="I'm a Listener!";
	this.ContactNum=0;
	}
	MyListener.prototype=new Box2D.Dynamics.b2ContactListener;
	MyListener.prototype.BeginContact=function(contact){
	console.log("contact dectected.");
	
	
	};
	MyListener.prototype.EndContact=function(contact){
	var data_A=contact.GetFixtureA().GetBody().GetUserData().type,data_B=contact.GetFixtureB().GetBody().GetUserData().type;
	if((data_A+data_B)==4||(data_A+data_B)==8||(data_A+data_B)==10||(data_A+data_B)==5)
	{
	this.ContactStore[this.ContactNum]=contact;
        (this.ContactNum)++;
	}
	
	};
	
	function CollisionProcessing(listener,score,canvas_name){
	var _score=score;
	for(var j=0;j<listener.ContactNum;j++){
	var MyContact=listener.ContactStore[j];
	listener.ContactStore[j]=null;
	var data_1=MyContact.GetFixtureA().GetBody().GetUserData().type,
	data_2=MyContact.GetFixtureB().GetBody().GetUserData().type;
	if(data_1==1){
	  var impulse=(MyContact.GetFixtureB().GetBody()
	  .GetMass())*(MyContact.GetFixtureB().GetBody().GetLinearVelocity().Length());
		console.log(impulse.toString());

        if(impulse>400){
		    vanish(canvas,MyContact.GetFixtureA().GetBody());

           world.DestroyBody(MyContact.GetFixtureA().GetBody());
            _score+=1000;
            insect_num--;
        }
        else if(impulse>=200){
		    vanish(canvas,MyContact.GetFixtureA().GetBody());

            world.DestroyBody(MyContact.GetFixtureA().GetBody());
            _score+=200;
            insect_num--;
        }
		else
		Acceration_Cnt+=30;
	}
	if(data_2==1){
	  var impulse=(MyContact.GetFixtureA().GetBody().GetMass())*(MyContact.GetFixtureA().GetBody().GetLinearVelocity().Length());
		console.log(impulse.toString());
        if(impulse>400){
			 world.DestroyBody(MyContact.GetFixtureB().GetBody());
            _score+=1000;
            insect_num--;
        }
        else if(impulse>=200){
           vanish(canvas,MyContact.GetFixtureB().GetBody());

            world.DestroyBody(MyContact.GetFixtureB().GetBody());
            _score+=200;
            insect_num--;
        }
		else
		Acceration_Cnt+=30;
		


  }

    if(data_1==7||data_2==7){            _score-=50;
    }
    if(data_1==2||data_2==2){            _score+=300;
    }
        if(data_1==5){
          
            world.DestroyBody(MyContact.GetFixtureB().GetBody());

            end_page(_score,canvas);
            _score=0;
			Acceration_Cnt=300;
        

        }
        if(data_2==5){
          
            world.DestroyBody(MyContact.GetFixtureA().GetBody());

            end_page(_score,canvas);
            _score=0;
			Acceration_Cnt=300;

        }

    }
        listener.ContactNum=0;

          return _score;

    };
	var Keyboard = {
	LEFT: 37,
	RIGHT: 39,
	A: 65,
	D: 68,
    SPACE:32,
    W:87,
    UP:38
	};
	
	var ControlState = {
	LEFT: 0,
	RIGHT: 0,
	A: 0,
	D: 0,
    SPACE:0,
    W:0,
        UP:0
	};
	
	function keyPressed_handler(e) {
	if(e.keyCode == Keyboard.A) {
	ControlState.A = 1;
	}
	if(e.keyCode == Keyboard.D) {
	ControlState.D = 1;
	}
	if(e.keyCode == Keyboard.RIGHT) {
	ControlState.RIGHT = 1;
	}
	if(e.keyCode == Keyboard.LEFT) {
	ControlState.LEFT = 1;
	}
    if(e.keyCode == Keyboard.SPACE) {
     ControlState.SPACE = 1;
    }
        if(e.keyCode == Keyboard.W) {
            ControlState.W = 1;
        }
        if(e.keyCode == Keyboard.UP) {
            ControlState.UP = 1;
        }
		keyContactProcessing(ControlState);
	}


    function keyReleased_handler(e){
            if(e.keyCode == Keyboard.LEFT   ) ControlState.LEFT = 0;
            if(e.keyCode == Keyboard.RIGHT) ControlState.RIGHT = 0;
            if(e.keyCode == Keyboard.A) ControlState.A = 0;
            if(e.keyCode == Keyboard.D) ControlState.D = 0;
         if(e.keyCode == Keyboard.W) ControlState.W = 0;
         if(e.keyCode == Keyboard.UP) ControlState.UP = 0;
            if(e.keyCode == Keyboard.SPACE) ControlState.SPACE =0;
			}


        function keyContactProcessing(keyState){
            if(keyState.RIGHT){
                var position=slip_Board.GetWorldCenter();
                var newPosition=new b2Vec2(position.x+10/SCALE,position.y);
                if(newPosition.x+slip_board.w/2<(ground_1.groundSize.w/2+ground_2.groundSize.w-0.04))
                    slip_Board.SetPosition(newPosition);
            }
            if(keyState.LEFT){
                var position=slip_Board.GetWorldCenter();
                var newPosition=new b2Vec2(position.x-10/SCALE,position.y);
                if(newPosition.x-slip_board.w/2>=26*(ground_1.groundSize.w))
                    slip_Board.SetPosition(newPosition);
            }
            if(keyState.D){
				
                slip_Board.ApplyForce(new b2Vec2(10000,0),slip_Board.GetWorldCenter());
            }
            if(keyState.A){

              slip_Board.ApplyImpulse(new b2Vec2(-10000,0),slip_Board.GetWorldCenter());

            }
            if(keyState.W){
                rotating_stick.ApplyTorque(200);
            }
            if(keyState.UP){
				rotating_stick.ApplyTorque(-200);

            }
            if(keyState.SPACE){
                if(Acceration_Cnt>=1){
                    String_Effect(Ball);
                    Acceration_Cnt-=1;

                }
            }
    }

    function update_score(score,canvas){
        var phrase_describe="Score:",phrase_accerate="Acceration Remains:",
			phrase_target="Target Remains:";
        var phrase_score=score.toString(),
            phrase_num=Acceration_Cnt.toString(),
			phrase_target_num=insect_num.toString();

			
            _c=canvas.getContext('2d');
		 _c.clearRect(0, 0, canvas.width, canvas.height);

        _c.fillStyle = 'red';
        _c.font = 'bold 15px Arial,sans-serif';
        

        _c.fillText(phrase_describe,0, score_canvas.height /(1.4));
        _c.fillText(phrase_accerate,score_canvas.width*0.4, score_canvas.height /(1.4));
        _c.fillText(phrase_target,score_canvas.width*0.75, score_canvas.height /(1.4));

        _c.font = 'bold 15px Arial,sans-serif';
       

        _c.fillText(phrase_score,canvas.width*0.10, canvas.height /(1.4));
        _c.fillText(phrase_num,score_canvas.width*0.6, canvas.height /(1.4));
		_c.fillText(phrase_target_num,score_canvas.width*0.92, score_canvas.height /(1.4));



    }
    function end_page(score,canvas){

      var result=confirm("Game Ended and You have Scored:\t"+score+"\n\tContinue?");
        if(result){
             for(var b=world.GetBodyList();b;b=b.GetNext()){
                         var temp=b;
             world.DestroyBody(temp);
						  }
					world.ClearForces();
					init_world();
					//slip_Board.SetLinearVelocity(new b2Vec2(0,0));
					update_score(Score,canvas);

        }
        else{
		for(var b=world.GetBodyList();b;b=b.GetNext()){
			var temp=b;
             world.DestroyBody(temp);
			 }
        }

    }
    function String_Effect(Enity){//adding the effect of prdushing a string when loading the bird
        var step=8/SCALE,k=60000;//the Theory of Hooker:F=k*x
        var ForceUnit=step*k;
        var force=new b2Vec2(3*ForceUnit,-ForceUnit),Postion=Enity.GetWorldCenter();
        var NewPosition=new b2Vec2(Postion.x-step*0.949,Postion.y+step*0.316);
        if(NewPosition.x>2*(ground_1.groundSize.w)){
      Enity.SetPosition(NewPosition);
      Enity.ApplyForce(force,new b2Vec2(0.949,-0.316));}



    }
	function End_Game_Check(target,canvas){
				if(target==0){
						end_page(target,canvas);
						return true;
						}
			else{
				return false;
					}

			
	}
	//to do: adding a key to pause the world and wake it up
function Pause(world){
			for(var b=world.GetBodyList();;b=b.GetNext()){
					b.Freeze();
					}
	
	
	
	}
function vanish(canvas,body){
	
		var context=canvas.getContext("2d");
		var vanish=new Image();
		vanish.src="images/vanish_img.png";
        var position= body.GetWorldCenter();
         var s_x=-(vanish.width)/2,s_y=-(vanish.height)/2;
		context.save();
		context.translate((position.x)*SCALE,(position.y)*SCALE);
		context.drawImage(vanish,s_x,s_y,vanish.width,vanish.height);
	

        context.restore();
						

	}

