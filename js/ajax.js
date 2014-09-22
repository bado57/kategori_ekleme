$(function(){

     $.ajaxSetup({
		type: "post",
		url: "ajax.php",
		dataType:"json",
		error: function(a, b){
				if (b == "timeout"){
					alert("Ajax isteği zaman aşımına uğradı!");
				}
			},
		statusCode: {
			404 : function(){
				alert("Ajax dosyası bulunamadı!");
			}
		}
		});

	$.Blog = {

		anaKategori: function(){
				
				
				var kat_adi = $("input[name=ana_kategori]").val();
				if(kat_adi=='Lütfen bir kategori adı giriniz..')
				{
				   kat_adi=' ';
				}
				kat_adi = $.trim(kat_adi);

				if (!kat_adi){
					alert("Lütfen boş bırakmayınız..");
				}else {
					$.ajax({ 
						data: {"kat_adi":kat_adi,"tip":"kategoriEkle"},
						success: function(cevap){
							if (cevap.hata){
								alert(cevap.hata);
							}else {
								$("div#sonuc").html(cevap.ok).show();
							}
						}
					});
				
				}
		},
		
		altKategori: function(){
	    	var alt_kat=$("select option:selected").val(); 
			var alt_kategori = $("input[name=alt_kategori]").val();
			if(alt_kategori=='Lütfen bir alt kategori adı giriniz..')
			{
			   alt_kategori=' ';
			}
			alt_kategori = $.trim(alt_kategori);
				
			if (!alt_kategori ){
				alert("Lütfen boş bırakmayınız..");
			}else {
			
			$.ajax({
				data: {"alt_kategori":alt_kategori,"alt_kat":alt_kat, "tip":"altKategori"},
				success: function(cevap){
					if (cevap.hata){
						alert(cevap.hata);
					}else {
						$("div#alt_sonuc").html(cevap.ok).show();
					}
				}
			});
		}
	 }
		
	}
	$("button#ekleme").click(function(){
			var gecen=$("select option:selected").val();
			var kat_adi = $("input[name=ana_kategori]").val();

			var kat_adi = $("input[name=ana_kategori]").val();
				if(kat_adi=='Lütfen bir kategori adı giriniz..')
				{
				   kat_adi=' ';
				}
				kat_adi = $.trim(kat_adi);

				if (!kat_adi){
					
				}else{
				
				
			if(!gecen){
			 gecen=1;
			}
			$.ajax({
			 data: {"lastid":gecen,"kategori_adi":kat_adi,"tip":"ajaxEkle"},
			 success:function(cevap){
				if(cevap.hata){
				   alert(cevap.hata);
				}else{
				var sayac=$("ul.anasayfa>li").size();
					if(sayac>4){
					 //alert("5 ten fazla ana kategori eklenemez");
					}else{
			    $("select").prepend(cevap.veriler).show();
				}
				}
			 }
			});
}
		});
		
		$("button#ekleme").click(function(){
		    var gorsel_ana=$("select option:selected").val();
            var kat_adi = $("input[name=ana_kategori]").val();

				if(kat_adi=='Lütfen bir kategori adı giriniz..')
				{
				   kat_adi=' ';
				}
				kat_adi = $.trim(kat_adi);

				if (!kat_adi){
					
				}else{
				
			if(!gorsel_ana){
			 gorsel_ana=1;
			}
			$.ajax({
				data: {"gorselim_ana":gorsel_ana,"kategori_adi":kat_adi,"tip":"gorselanaKategori"},
				success: function(cevap){
					if (cevap.hata){
					alert(cevap.hata);
					}else {
					var sayac=$("ul.anasayfa>li").size();
					sayac++;
					if(sayac>5){
					 alert("5 ten fazla ana kategori eklenemez");
					}else{
					 $("div#menu > ul").append(cevap.veriler).show();
					}
					}
				}
			});
        }
		});
		
		$("button#alt_gorsel").click(function(){
		    var gorsel_ana=$("select option:selected").val();
            var alt_bosluk = $("input[name=alt_kategori]").val();
			if(!gorsel_ana){
			 gorsel_ana=1;
			}
			$.ajax({
				data: {"gorselim_ana":gorsel_ana,"alt_bosluk":alt_bosluk,"tip":"gorselAltKategori"},
				success: function(cevap){
					if (cevap.hata){
						alert(cevap.hata);
					}else {
					var sayac=$("ul.anasayfa>li>ul."+gorsel_ana+">li").size();
                    
					if(sayac>=4){
					 alert("4 ten fazla alt kategori eklenemez");
					}else{
					
					var sonuc=$("ul.anasayfa>li>ul").hasClass(gorsel_ana);
					    if(sonuc){
						var basari=$("ul.anasayfa > li>ul."+gorsel_ana).append(cevap.veriler3).show();
						if(basari){
							$("ul.anasayfa>li>ul>li").css({"border":"3px solid #ddd","width":"250px"});
							$("ul.anasayfa>li>ul").hide();
							$("ul.anasayfa>li").hover(function(){
							  var index=$(this).index();
							  $(this).children().show();
								},function(){
							  $("ul.anasayfa>li>ul").hide();
							});
						}else{
							alert("Still işleminde bir sıkıntı var, Lütfen sayfayı refresh ediniz.");
						}
						
						
						}else{
							$("ul.anasayfa > li."+gorsel_ana).append(cevap.veriler2).show();
							$("ul.anasayfa > li."+gorsel_ana).append(cevap.veriler4).show();
							$("ul.anasayfa > li>ul."+gorsel_ana).append(cevap.veriler3).show();
							$("ul.anasayfa>li>ul").css({"position":"absolute","width":"250px","z-index":"1","display":"none"});
							$("ul.anasayfa>li>ul>li").css({"border":"3px solid #ddd","width":"250px","text-decoration":"none"});
							$("ul.anasayfa>li>ul").hide();
							$("ul.anasayfa>li").hover(function(){
							  var index=$(this).index();
							  $(this).children().show();
								},function(){
							  $("ul.anasayfa>li>ul").hide();
							});
						}
					}
				}
				
				}
			});

		});

});