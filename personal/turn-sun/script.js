var n = 1;

function myfunc(){
	var audio = document.getElementsByTagName("audio")[0];
	audio.play();
	if (n % 2 == 0)
	{
		document.getElementById('turn').style.background = 'url(img/turn.jpg) -118px -23px';
		n++;
		$("#main2").fadeIn(1000);
	}
	else
	{
		document.getElementById('turn').style.background = 'url(img/turn.jpg) -9px -23px';
		n++;
		$("#main2").fadeOut(1000);
	}
};


/*
function thover(){
	if (n % 2 == 0)
	{
		document.getElementById('turn').style.background = 'url(img/turn_hover.jpg) -9px -23px';
	}
	else{
		document.getElementById('turn').style.background = 'url(img/turn_hover.jpg) -118px -23px';
	}
};

function thoverout(){
	if (n % 2 == 0)
	{
		document.getElementById('turn').style.background = 'url(img/turn.jpg) -9px -23px';
	}
	else
	{
		document.getElementById('turn').style.background = 'url(img/turn.jpg) -118px -23px';
	}
};*/