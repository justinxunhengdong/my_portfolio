//Justin Dong Purdue University CGT35300 Project 1. ID = 00311-46338
//Scripts:
var sticky;
$(document).ready(function(){
	sticky = $("#title").offset().top;
	//initial header fade in
	$(".initial").fadeIn();

});


//Functional
//Sticky header
$(window).scroll(function(){
	stickyFunction();
	chapterFunction();
	handleNavPosition();
});
//hide side bar when not in use


//Modal Show Code
$(".myClass").click(function(){
	var correspondingModal = $(this).next(".modal");
	correspondingModal.modal("show");
	//animation: delay for 200ms then fade in

	$(".modal_text").css({"opacity":0});
	$(".modal_text").animate({"opacity":1},700);
});


//Controls collapsing and opening of header
function stickyFunction(){

	//console.log(window.pageYOffset + "||" + sticky);
	if(window.pageYOffset > sticky){
		$("#title").addClass("collapsed");
		$("#title").removeClass("initial");

	} else {

		$("#title").removeClass("collapsed");
		$("#title").addClass("initial");
	}
}

//checks to see if current window is portrait or landscape
function isPortrait(){
	if($(window).height() / $(window).width() > 1){
		//height is larger than width
		return true;

	} else {
		//width is wider than height
		//console.log("landscape")
		return false;
	}
};

function handleNavPosition(){

	var top = $(".collapsed").height();

	//console.log(top);

	if(isPortrait()){
		//moves nav up to just below collapsed header on mobile
		$("#nav_container").css({"top": top + "px"});
	
	} else {
		//default
		$("#nav_container").css({"top": "40vh"});
	}

}

$(window).on("orientationchange resize", function() {
	handleNavPosition();
});


//treats each section as a "chapter"
function chapterFunction(){
	//points:
	var about = $("#about").offset().top;
	var skills = $("#resume").offset().top;
	var works = $("#work").offset().top;
	var contact = $("#contact").offset().top;

	var navArray = [about, skills, works, contact];

	//add an offset of a fraction of the viewport height so it reacts to expectations

	var fraction;
	//react differently to if it's a landscape or portrait shaped screen
	if(isPortrait()){
		//portrait
		fraction = 0.7;
	} else {
		//landscape
		fraction = 0.4;
	}

	var current = window.pageYOffset + ($(window).height() * fraction);

	var differences = [];
	for(i=0; i<navArray.length; i++){
		//console.log(current + "||" + navArray[i])
		differences.push([Math.abs(current - navArray[i]), navArray[i]]);
	//puts all differences into array with navArray value
	}
	//compare and sort all differences
	function sortNumber(a, b){
		return a[0]-b[0]; //ascending
	}

	differences.sort(sortNumber);
	//console.log(differences);
	//get first element and return scroll value
	var closest = differences[0][1];
	//remove any previous borders

	$(".smooth").css({
		"border": "1px solid rgba(0,0,0,0)"
	})

	if(closest == about){
		$("#nav_container ul #chapter_about").css({
			"border": "1px solid rgba(255,255,255,0.7)"
		});
	} else if(closest == skills) {
		$("#nav_container ul #chapter_skills").css({
			"border": "1px solid rgba(255,255,255,0.7)"
		});
	} else if (closest == works){
		$("#nav_container ul #chapter_works").css({
			"border": "1px solid rgba(255,255,255,0.7)"
		});
	} else if (closest == contact){ 
	//will never be "closest" to contact, should
	//find out if player is scrolled to the bottom of page
		$("#nav_container ul #chapter_contact").css({
			"border": "1px solid rgba(255,255,255,0.7)"
		});
	} else {

	}



}


//controls caption on resume image hover


$(".resume_icon").on(
	//works weirdly with scrolling
	"touchstart touchenter mouseenter", function(){
	var mouseX, mouseY, testX, testY, finalX, finalY;

		$(this).on(
			"touchmove mousemove",
			function(e){
			mouseX = e.clientX;
			mouseY = e.clientY;

			testX = this.getBoundingClientRect().x;
			testY = this.getBoundingClientRect().y;

			finalX = mouseX + 30;
			finalY = testY - (testY - mouseY)/2; //works weirdly with scroll

			//console.log(testY)

			//console.log(mouseX + "||" + mouseY)


				$(this).next(".hover_caption").css({
				"visibility":"visible",
				"top": finalY,
				"left": finalX
			});
		});

	

});


 $(".resume_icon").on(
 	"touchend touchleave mouseleave",
 	function(){
	$(this).next(".hover_caption").css({
		"visibility":"hidden"
	});
});


//Pause youtube video when modal is closed
/*
$(".modal").on("hidden.bs.modal", function (){

	
	//console.log("stop");
	//if any video has the class playing mode then remove it, and reset it to stop loading
	//TODO: Get working
	//$(".playing-mode").removeClass("playing-mode");\
});
*/