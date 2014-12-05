//@licstart  The following is the entire license notice for the 
//JavaScript code in this page.

//Copyright (C) 2014  Stefan Riha

//The JavaScript code in this page is free software: you can
//redistribute it and/or modify it under the terms of the GNU
//General Public License (GNU GPL) as published by the Free Software
//Foundation, either version 3 of the License, or (at your option)
//any later version.  The code is distributed WITHOUT ANY WARRANTY;
//without even the implied warranty of MERCHANTABILITY or FITNESS
//FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

//As additional permission under GNU GPL version 3 section 7, you
//may distribute non-source (e.g., minimized or compacted) forms of
//that code without the copy of the GNU GPL normally required by
//section 4, provided you include this license notice and a URL
//through which recipients can access the Corresponding Source.

//@licend  The above is the entire license notice
//for the JavaScript code in this page.
    
// credits: 
// *) Ken Fyrstenberg http://stackoverflow.com/questions/19071975/javascript-animation-with-multiple-settimeout
// *) Fulton, S., Fulton, J. (2013): HTML5 Canvas http://chimera.labs.oreilly.com/books/1234000001654/index.html
// *) Cory and Gabe http://stackoverflow.com/questions/7641130/center-text-in-table-cell/7641141#7641141
// *) Modernizr http://modernizr.com/
// *) Olbers, Dirk, Jürgen Willebrand, and Carsten Eden. Ocean Dynamics. Springer, 2012.
// *) Wallace, John M., and Peter V. Hobbs. Atmospheric science: an introductory survey. Vol. 92. Academic press, 2006.
//       http://books.google.com.au/books?id=HZ2wNtDOU0oC&pg=PA278&lpg=PA278&dq=rotating+dish&source=bl&ots=C3LHphsXRY&sig=4JvN0NazVGJqRXyE-A246dlzlgI&hl=en&sa=X&ei=yiJ9VNHTHom58gX09IGwCQ&ved=0CDwQ6AEwBA#v=onepage&q=rotating%20dish&f=false
// *) Marshall, J., 2003 http://paoc.mit.edu/labweb/lab5/inertial%20circles/inertial_circle.pdf

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
	
	//// radial bar
	//ctx.beginPath();
	//ctx.rect(0, cy-0.5, cvs.width,1);
	//ctx.fillStyle = '#000000';
	//ctx.fill();
		
	// green dish decoration
    ctx.beginPath();
	ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fillStyle = '#000000';
	ctx.fill();			
	posx=0.5*cx;
	ctx.arc(cx+posx, cy, 20, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fillStyle = '#000000';
	ctx.fill();
	ctx.arc(cx-posx, cy, 20, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fillStyle = '#000000';
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
	ctx.fillStyle = '#000000';
	ctx.fill();	
}


function canvasApp() {
	
	function animCircle(ctx,ctx2, x, y, u, v) {

		/// keep a reference to 'this' context for external calls
		var me = this;

		/// make the parameters public so we can alter them
		this.x = x;
		this.y = y;
		this.u = u;
		this.v = v;    
		

		/// this will update the object by incrementing x and y
		this.update = function() {
		    px=9.81*(2/Math.pow(a,2))*(me.x-cx);
			py=9.81*(2/Math.pow(a,2))*(me.y-cy);
			// linear friction
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
			ctx.fillStyle = '#FF0000';
			ctx.fill();

			phi=om*t; // from the non-inertial frame to the inertial one
			
			posx=0.5*cx;
			posy=0;
			ctx2.beginPath();
			cosi=Math.cos(phi);
			sine=Math.sin(phi);
			ctx2.arc(cx+posx*cosi-posy*sine, cy+posx*sine+posy*cosi, 20, 0, 2 * Math.PI);
			ctx2.closePath();
			ctx2.fillStyle = '#000000';
			ctx2.fill();
			posx=-0.5*cx;
			ctx2.arc(cx+posx*cosi-posy*sine, cy+posx*sine+posy*cosi, 20, 0, 2 * Math.PI);
			ctx2.closePath();
			ctx2.fillStyle = '#000000';
			ctx2.fill();	
			
			ctx2.beginPath();			
			posx=me.x-cx;
			posy=me.y-cy;
			ctx2.arc(cx+posx*cosi-posy*sine, cy+posx*sine+posy*cosi, 10, 0, 2 * Math.PI);
			ctx2.closePath();
			ctx2.fillStyle = '#FF0000';
			ctx2.fill();

		}
		return this;
	}


	function loop() {
		
		ctx.clearRect(0, 0, cvs.width, cvs.height); // clear
        ctx2.clearRect(0, 0, cvs.width, cvs.height); // clear
		
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
	
	// start with zero u,v-> no coriolis force
	u0= 0; 
	v0= 0;
	// Compute parabola constant such that at there is an equilibrium between 
	// gravity and centrifugal force at the start.
	// In case the coriolis force vanishes, this means no acceleration in the 
	// rotating frame.
	a=Math.sqrt(2*9.81)/om; // parabola constant

	
	puck=animCircle(ctx,ctx2, x, y, u0, v0);
	puck.update();


	window.r=r
	window.a=a
	window.a0=a; // initial values. Stored for update via button.
	window.r0=r; 
	
	update_slope();
	update_friction();
}


c_r=0; // ?? for update via button, use integer factors to avoid roundoff drift ??
c_a=0;
step_r=0.1;
step_a=1;
function start_animation() {

	////start the first frame
	id = requestAnimationFrame(loop);
}

function cancel_animation() {
	////cancel the latest frame.
	cancelAnimationFrame(id);
}

function reset_animation() {
	location.reload();
}
	
function slope_increase() {
	c_a+=1;
    update_slope();
}
function slope_decrease() {
	c_a-=1;
    update_slope();
}
function friction_increase() {
	c_r+=1;
	update_friction();
}
function friction_decrease() {
	c_r-=1;
	update_friction();
}
function nudge_puck() {
	puck.v+= 5.;
}

function update_slope() {
	a=a0-c_a*step_a; // steepness increases with decreasing a
	document.getElementById('slope').innerHTML = '"Slope": '+Math.round(1e4/a)/10;
}

function update_friction() {
	r=r0+c_r*step_r;
	if (r<0){
		r=0;
		c_r=0;
	} 
	document.getElementById('friction').innerHTML = '"Friction": '+Math.round(10*r)/10
}
