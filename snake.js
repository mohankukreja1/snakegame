const cvs=document.getElementById('snake');
const ctx=cvs.getContext('2d');

//create the unit

const box=32;

const ground=new Image();
ground.src="img/ground.png";

const food=new Image();
food.src="img/food.png";