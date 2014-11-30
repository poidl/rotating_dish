// credits: 
// *) Ken Fyrstenberg http://stackoverflow.com/questions/19071975/javascript-animation-with-multiple-settimeout
// *) Fulton, S., Fulton, J. (2013): HTML5 Canvas http://chimera.labs.oreilly.com/books/1234000001654/index.html
// *) Modernizr http://modernizr.com/
// *) Olbers, Dirk, Jürgen Willebrand, and Carsten Eden. Ocean Dynamics. Springer, 2012.

window.addEventListener('load', eventWindowLoaded, false);
var id = null;

function eventWindowLoaded() {
	cvs1 = document.getElementById("canvasOne")
	ctx1= cvs1.getContext("2d");
	ctx2 = document.getElementById("canvasTwo").getContext("2d");
    ctx1.translate(0,cvs1.height);
	ctx1.scale(1,-1);
    ctx2.translate(0,cvs1.height);
	ctx2.scale(1,-1);
	
	cvs1 = document.getElementById("canvasLOne")
	ctx1= cvs1.getContext("2d");
	ctx2 = document.getElementById("canvasLTwo").getContext("2d");
    ctx1.translate(0,cvs1.height);
	ctx1.scale(1,-1);
    ctx2.translate(0,cvs1.height);
	ctx2.scale(1,-1);		
	drawDish();
//	drawPuck();
    canvasApp();
}

function canvasSupport () {
     return Modernizr.canvas;
}


function drawDish() {
	cvs = document.getElementById("canvasOne");
	ctx = cvs.getContext("2d");

	var cx = cvs.width / 2;
	var cy = cvs.height / 2;
	var radius = cx-1;
	
	ctx.beginPath();
	ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = '#EEEEEE';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#000000';
	ctx.stroke(); 
	ctx.beginPath();
	ctx.arc(cx, cy, radius/2, 0, 2 * Math.PI, false);
	ctx.stroke();
		
	// green dish decoration
    ctx.beginPath();
	ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fillStyle = '#00FF00';
	ctx.fill();			
	posx=0.5*cx;
	ctx.arc(cx+posx, cy, 20, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fillStyle = '#00FF00';
	ctx.fill();
	ctx.arc(cx-posx, cy, 20, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fillStyle = '#00FF00';
	ctx.fill();	
	
	// right
	cvs = document.getElementById("canvasLOne");
	ctx = cvs.getContext("2d");
	
	ctx.beginPath();
	ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = '#EEEEEE';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#000000';
	ctx.stroke(); 	
	ctx.beginPath();
	ctx.arc(cx, cy, radius/2, 0, 2 * Math.PI, false);
	ctx.stroke();
		
	ctx.beginPath();
	ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fillStyle = '#00FF00';
	ctx.fill();	
}

   //var speed = 5;
   //var p1 = {x:20,y:20};
   //var angle = 35;
   //var radians = 0;
   //var xunits = 0;
   //var yunits = 0;
   //var ball = {x:p1.x, y:p1.y};
   //updateBall();


function canvasApp() {
	
	function animCircle(ctx,ctx2, x, y, u, v) {

		/// keep a reference to 'this' context for external calls
		var me = this;

		/// make the parameters public so we can alter them
		this.x = x;
		this.y = y;
		this.u = u;
		this.v = v;    
		//this.dudt = dudt;
		//this.dvdt = dvdt;
		

		/// this will update the object by incrementing x and y
		this.update = function() {
		    px=9.81*(2/Math.pow(a,2))*(me.x-cx);
			py=9.81*(2/Math.pow(a,2))*(me.y-cy);
		    dudt= 2*om*me.v - r*me.u + Math.pow(om,2)*(me.x-cx) - px;
		    dvdt=-2*om*me.u - r*me.v + Math.pow(om,2)*(me.y-cy) - py;
			
			me.u += dudt*dt;
			me.v += dvdt*dt;
			me.x += me.u*dt;
			me.y += me.v*dt;
			t += dt;
			/// additional updates can be inserted here

			render();
		}

		/// and this takes care of drawing the object with current settings
		function render() {
			ctx.beginPath();
			ctx.arc(me.x, me.y, 10, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fillStyle = '#000000';
			ctx.fill();
			

			phi=om*t; // from the non-inertial frame to the inertial one
			
			posx=0.5*cx;
			posy=0;
			ctx2.beginPath();
			ctx2.arc(cx+posx*Math.cos(phi)-posy*Math.sin(phi), cy+posx*Math.sin(phi)+posy*Math.cos(phi), 20, 0, 2 * Math.PI);
			ctx2.closePath();
			ctx2.fillStyle = '#00FF00';
			ctx2.fill();
			posx=-0.5*cx;
			ctx2.arc(cx+posx*Math.cos(phi)-posy*Math.sin(phi), cy+posx*Math.sin(phi)+posy*Math.cos(phi), 20, 0, 2 * Math.PI);
			ctx2.closePath();
			ctx2.fillStyle = '#00FF00';
			ctx2.fill();	
			
			ctx2.beginPath();			
			posx=me.x-cx;
			posy=me.y-cy;
			ctx2.arc(cx+posx*Math.cos(phi)-posy*Math.sin(phi), cy+posx*Math.sin(phi)+posy*Math.cos(phi), 10, 0, 2 * Math.PI);
			ctx2.closePath();
			ctx2.fillStyle = '#000000';
			ctx2.fill();

						

		}
		return this;
	}

	//function drawPuck() {
		//cvs = document.getElementById("canvasTwo");
		//ctx = cvs.getContext("2d");

		//var x = cvs.width / 2;
		//var y = 2*cvs.height / 5;
		//circ=animCircle(ctx, x, y, 0,0,0,0)	
		//circ.update()
	//}

	function loop() {
		
		ctx.clearRect(0, 0, cvs.width, cvs.height); // clear
        ctx2.clearRect(0, 0, cvs.width, cvs.height); // clear
		
		//puck.dudt=0;
		//puck.dvdt=9.81;
		
		puck.update();
		

		/// use this instead of setTimeout/setInterval (!)
		id=requestAnimationFrame(loop);
	}
	window.loop=loop; // make it globally available

	cvs = document.getElementById("canvasTwo");
	ctx = cvs.getContext("2d");
	cvs2 = document.getElementById("canvasLTwo");
	ctx2 = cvs2.getContext("2d");
	
	var cx= cvs.width/2; // circle center
	var cy= cvs.height/2; // circle center	
	var x = (3/2)*cx;
	var y = cy;
	
	t=0;
	dt=0.1;
	om=0.1; // angular velocity omega 0.1
	r=0.0; // friction 0.0
	a=44	; // parabola constant 44
	u0= 0*om*(y-cy); // start with no friction
	v0= -0*om*(x-cx);
	//dudt0= 2*om*v0 - r*(puck.u+om*puck.y) + Math.pow(om,2)*puck.x;
	//dvdt0=-2*om*puck.u - r*(puck.v-om*puck.x) + Math.pow(om,2)*puck.y;	
	puck=animCircle(ctx,ctx2, x, y, u0, v0);
	puck.update();
	//requestAnimationFrame(loop)
	document.getElementById('slope').innerHTML = 'Slope: '+1/a
	document.getElementById('friction').innerHTML = 'Friction: '+r
	window.r=r
	window.a=a
}

function start_animation() {

	////start the first frame
	id = requestAnimationFrame(loop);
}

function cancel_animation() {
	////cancel the latest frame.
	cancelAnimationFrame(id);
}
	
function slope_increase() {
	a-=1;
	document.getElementById('slope').innerHTML = 'Slope: '+1/a
}
function slope_decrease() {
	a+=1;
	document.getElementById('slope').innerHTML = 'Slope: '+1/a
}
function friction_increase() {
	r+=0.1;
	document.getElementById('friction').innerHTML = 'Friction: '+r
}
function friction_decrease() {
	r-=0.1;
	document.getElementById('friction').innerHTML = 'Friction: '+r
}
