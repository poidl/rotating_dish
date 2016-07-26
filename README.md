# rotating_dish

Simple web-based experiment kit for studying inertial oscillations and 
Coriolis force on a rotating parabolic dish.

Intersting for students of geophysical fluid dynamics. Try it here: [external link](https://s3-ap-southeast-1.amazonaws.com/srihafiles/rotating_dish/dish.html)

[![Unable to load screenshot][2]][1]

  [1]: https://s3-ap-southeast-1.amazonaws.com/srihafiles/rotating_dish/dish.html
  [2]: https://github.com/poidl/rotating_dish/blob/master/pics/screenshot.png (Click to play!)

The MIT has a website describing an experiment with a real rotating parabolic turntable: <a href=http://paoc.mit.edu/labweb/lab5/gfd_v.htm>GFDLab V: Inertial Circles</a>.

### Experiment 1: Inertial Oscillation
* What looks like two discs is in fact one single parabolic dish viewed from above,
med with two different cameras. There is a red puck on the dish. The black paint 
on the dish is just there for decoration.

* The dish is rotating. The left image is produced by a camera that rotates with
 the same angular speed as the dish, therefore it seems still. The right image 
 is produced by a fixed camera, and we can see that the dish actually rotates. 
 In a geophysical context, which hemisphere are we looking at?

* The puck doesn't move in the rotating frame, it has exactly the same velocity 
as the point on the dish below it. This is just a consequence of how the initial 
conditions are defined in this animation. Firstly, the velocity of the puck is 
initially set to zero in the rotating frame. Secondly, the slope (or steepness) 
of the parabolic turntable and its angular velocity are initially adjusted such 
that after the animation starts, the centrifugal and the 
gravitational force acting on the puck cancel each other out. This means that 
the acceleration of the puck is zero in the rotating frame. To change the initial
 conditions for (1) velocity in the rotating frame, (2) slope (steepness) of the 
 turntable or (3) its speed of rotation, you'd have to modify the javascript file
  of the source code. Try it!

* To perturb this balance, press  **Nudge puck northwards**, to give the puck a 
northward velocity. Note that "northwards" refers to the orientation of an axis 
in the **rotating frame of reference** (i.e. the direction of the vertical axis of the left 
image).

* This results in an inertial oscillation of the puck. 

### Experiment 2: "Geostrophic" motion superimposed on inertial oscillations

* Before continuing, note that the word "geostrophy" is borrowed from geophysical
 fluid dynamics. However, one could argue that this simple dish has little to do 
 with planet Earth. For expample, the coriolis parameter is constant here. 
 Also, comparing the movement of a solid puck with that of a fluid requires
  a lot of fancy imagination.

* Press **Reset** to start from scratch.

* **Increase the dish slope**. If the resulting movement is weak, 
press the button a couple of times. The movement can be thought of to two 
contain two separate contributions: (1), the puck will start to move slowly around 
the center of the dish, and (2), may slightly oscillate along its path.

* In a geophysical context, this is somewhat analogous to creating high pressure 
in the subpolar region of the northern hemisphere (outer rim of the dish) and low
 pressure at the north pole (center of the dish).


### Experiment 3: Friction

* After setting up a "geostrophic" motion, increase the friction. What happens?
