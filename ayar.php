<?php

  session_start();
  ob_start("ob_gzhandler");

  ## Hataları Gizle ##
  //error_reporting(0);
     try{
       $db  =new  PDO("mysql:host=localhost;dbname=kategori; charset=utf8",  "root",   "");
       $db-> query("SET CHARACTER SET utf8");
     }catch(PDOExcepiton    $e){
         print  $e ->getMessage();
     }
	 

?>
