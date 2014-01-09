$(document).ready(function(){
	$("#hw_html, #hw_JS, #personal").hide();
	$("#ahw_html").click(function(){
		$("#hw_html").slideToggle(300);
	});
	$("#ahw_JS").click(function(){
		$("#hw_JS").slideToggle(300);
	});
	$("#apersonal").click(function(){
		$("#personal").slideToggle(300);
	});
});

