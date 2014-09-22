<?php

	require "ayar.php";

	if ($_POST && $_SERVER["HTTP_X_REQUESTED_WITH"]=="XMLHttpRequest"){
	    $sonuc = array();
		
	    $tip = $_POST["tip"];
		Switch ($tip){
		
		case "kategoriEkle":
			$katadi = htmlspecialchars(addslashes(trim($_POST["kat_adi"])));
			$uzunluk=strlen($katadi);
			if($uzunluk>20){
			$sonhali = substr($katadi, 0, 20);
			$katadi=$sonhali."....";
			}

			
			if (!$katadi){
				$sonuc["hata"] = "Lütfen boş alan bırakmayınızzzzzzzzzzz..";

			} else {
			$sessiond=$_SESSION['mesaj'];
			$query=$db->query("SELECT * FROM ana_kategori WHERE session='$sessiond'");
			if($count=$query->rowCount()){
			$count++;
			}else{
			$count=1;
			}
			if($count>5){
			$sonuc["hata"]="Kategori olarak maksimum sayıya ulaştınız.";
			}else{
			
				$query=$db->prepare("INSERT INTO ana_kategori SET
					ana_kategori_adi   =?,
					session  	   =?
					");
				  $insert=$query->execute(array(
					  $katadi,
					  $_SESSION['mesaj']
					));  
			
			if ($insert){
			$sonuc["ok"] = "<font color='green'>Başarıyla ekleme yaptınız, tebrikler...</font>";
				
			}else {
			$sonuc["hata"]="Bir sorun oluştu..";
			}
			}
			}
			
		break;
		
		case "altKategori":
		$alt_kategori = htmlspecialchars(addslashes(trim($_POST["alt_kategori"])));
		$alt_kat = htmlspecialchars(addslashes(trim($_POST["alt_kat"])));
		
		$uzunluk=strlen($alt_kategori);
		if($uzunluk>20){
		$sonhali = substr($alt_kategori, 0, 20);
		$alt_kategori=$sonhali."....";
		}
		
		
		if (!$alt_kategori){
			$sonuc["hata"] = "Lütfen boş alan bırakmayınız...";

		} else {
		$sessionl=$_SESSION['mesaj'];
		$query=$db->query("SELECT * FROM alt_kategoriler WHERE alt_ana_kategori=$alt_kat && alt_session='$sessionl'");
		if($count=$query->rowCount()){
		$count++;
		}else{
		$count=1;
		}
		if($count>4){
		$sonuc["hata"]="Alt kategori olarak maksimum sayıya ulaştınız.";
		}else{
			$query=$db->prepare("INSERT INTO alt_kategoriler SET
				alt_kategori_adi   =?,
				alt_ana_kategori   =?,
				alt_session   =?
				");
			  $insert=$query->execute(array(
				  $alt_kategori,
				  $alt_kat,
				  $_SESSION['mesaj']
				));  
		
		if ($insert){

		$sonuc["ok"] = "<font color='green'>Başarıyla alt kategori eklemesi yaptınız, tebrikler...</font>";
			
		}else {
		$sonuc["hata"]="Bir sorun oluştu..";
		}
		}
		
		}
		break;
		
		
		case "gorselanaKategori":
		$gorselim_ana = $_POST["gorselim_ana"];
		$sessioni=$_SESSION['mesaj'];
		
		if (!$gorselim_ana){
			$sonuc["hata"] = "Geçersiz İşlem";

		} else {
	    
		$query  =$db->query("SELECT  * FROM ana_kategori WHERE ana_kategori_id >= $gorselim_ana && session='$sessioni' ORDER BY ana_kategori_id  ASC",PDO::FETCH_ASSOC);
		if ($query -> rowCount()) {
          foreach ($query   as  $row) {
            $sonuc["veriler"]= ('<li class="'.$row["ana_kategori_id"].'"><a href="#">'.$row["ana_kategori_adi"].'</a></li>');
          }
          } 
	    }
		break;
		
		case "gorselAltKategori":
		$sessionw=$_SESSION['mesaj'];
		$gorselim_ana = $_POST["gorselim_ana"];
		$alt_gorsel = $_POST["alt_bosluk"];
		if (!$gorselim_ana){
			$sonuc["hata"] = "Geçersiz İşlem";
		} else {	  
	     $query  =$db->query("SELECT  * FROM ana_kategori WHERE session='$sessionw' ORDER BY ana_kategori_id  ASC",PDO::FETCH_ASSOC);
	     if ($altcount=$query -> rowCount()) {
          foreach ($query   as  $row) {
            $sonuc["veriler1"]=('<li class="'.$row["ana_kategori_id"].'" id="'.$row["ana_kategori_id"].'"><a href="#">'.$row["ana_kategori_adi"].'</a>'); 
				$querym =$db->query("SELECT * FROM alt_kategoriler WHERE alt_ana_kategori=".$row["ana_kategori_id"]." && ".$row["ana_kategori_id"]."=$gorselim_ana && alt_session='$sessionw'");
				if($querym -> rowCount()){ 
				$sonuc["veriler2"]=('<ul class="'.$row["ana_kategori_id"].'" id="'.$row["ana_kategori_id"].'" >');
				 foreach ($querym as $row){
				   $sonuc["veriler3"]=('<li><a href="#">'.$row["alt_kategori_adi"].'</a></li>');
				  }
			    $sonuc["veriler4"]=('</ul>');
          }
		
      }
	    
	}
		}
		break;
		
		

		
		case "ajaxEkle":
		$lastid = $_POST["lastid"];
		$sessions=$_SESSION['mesaj'];
		if (!$lastid){
			$sonuc["hata"] = "Geçersiz İşlem";

		} else {
		  $query  =$db->query("SELECT  * FROM ana_kategori WHERE ana_kategori_id >= $lastid && session='$sessions' ORDER BY ana_kategori_id ASC",   PDO::FETCH_ASSOC);
		  if ($query -> rowCount()) {
			  foreach ($query   as  $row) {
				$sonuc["veriler"]=('<option selected id="'.$row["ana_kategori_id"].'" value="'.$row["ana_kategori_id"].'">'.$row["ana_kategori_adi"].'</option>');
               }
			  
		  }
		}
		break;
		
		}
		
		
		echo json_encode($sonuc);
	
	}else {
	   die("Hacking?");
	}

?>