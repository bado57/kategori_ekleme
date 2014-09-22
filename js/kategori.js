$(function(){

	  
      $("input[value~='kategori'").css("background-color", "orange");
	  $("input[name=ana_kategori]").focus(function(){
		if($("#bosluk").val()=='Lütfen bir kategori adı giriniz..'){
			$(this).val('');
		}
	  }).focusout(function(){
		if($(this).val()==''){
			$(this).val('Lütfen bir kategori adı giriniz..');
		}
	  });
	  
	  
	  $("#alt_kategori ul li input[value~='alt'").css("background-color", "orange");
	  $("input[name=alt_kategori]").focus(function(){
		if($("#alt_bosluk").val()=='Lütfen bir alt kategori adı giriniz..'){
			$(this).val('');
		}
	  }).focusout(function(){
		if($(this).val()==''){
			$(this).val('Lütfen bir alt kategori adı giriniz..');
		}
	  });
});
