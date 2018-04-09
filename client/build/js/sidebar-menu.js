

/*====================================
=            ON DOM READY            =
====================================*/
$(function() {
 
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
	
    
});
/***** SIDE BAR JS ****/ 

/*$(function(){
  $( ".sidebar-wrapper" ).hide();
   $("#showbtn").click(function(){
    $( ".sidebar-wrapper" ).show('slide', {direction: 'right'}, 500);
  });
  $("#closebtn").click(function(){
    $( ".sidebar-wrapper" ).hide('slide', {direction: 'right'}, 500);
  });
 
});*/
function openNav() {
    document.getElementById("mySidenav").style.width = "280px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
/***** SIDE BAR JS ****/ 

/******** NICE SCROLL JS **************/
  $(document).ready(function() {
	// $("html").niceScroll({
	// 	cursorcolor:"#A5ADB0",
	// 	cursorwidth:"8px",
	// 	cursorborder:"0", 
	// });
///*Vidoe Box js*/
// 		$(".fancybox").attr('rel', 'gallery')
//    	.fancybox({
//        openEffect  : 'none',
//        closeEffect : 'none',
//        nextEffect  : 'none',
//        prevEffect  : 'none',
//        padding     : 0,
//		padding : 0,
//        openEffect  : 'elastic',
//		locked     : true ,
//        closeBtn: true,
//        margin      : [80, 20, 20, 20] // Increase left/right margin
//		
//    });
///*Vidoe Box js*/

/******Video Iframe ******/ 
$(".video-popup-btn").click(function(){
	$('.video-container').hide();
    $('.video-iframe').show();
});


/******Video Iframe ******/ 


   });
   
 
   
/*********** NICE SCROLL JS *************/

/***** PRELOADER JS ***/

	$(window).load(function() { // makes sure the whole site is loaded
		$('#status').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(350).css({'overflow':'visible'});
	})
	
/***** PRELOADER JS ***/



  $(function() {
        $("#showbtn").click(function() {
            animate(".sidebar-wrapper", 'slideInRight');
            return false;
        });
    });
     
    function animate(element_ID, animation) {
        $(element_ID).addClass(animation);
        var wait = window.setTimeout( function(){
            $(element_ID).removeClass(animation)}, 1300
        );
    }


/*========================================
=            CUSTOM FUNCTIONS            =
========================================*/

