
$(function(){


    $("ul.anasayfa>li>ul").hide();
	$("ul.anasayfa>li").hover(function(){
	  var index=$(this).index();
	  $(this).children().show();
	    },function(){
	  $("ul.anasayfa>li>ul").hide();
	});
	
	
    $("ul.anasayfa>li>ul").css({"position":"absolute","width":"250px","z-index":"1","display":"none"});
    $("ul.anasayfa>li>ul>li").css({"border":"3px solid #ddd","width":"250px"});
    $("ul.anasayfa>li>ul>li").hover(function(){
	$(this).css({"border":"3px solid #ddd","width":"250px","text-decoration":"none"});
	});

   
   
});
