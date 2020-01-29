$(document).ready(function(){
  $(".opcion1_1_jugador").click(function(){
    $("#imagen_fondo1").fadeOut(200, function(){
        $("#imagen_fondo2").show();
        $(".texto_contenedor").text("VAYA QUE SITIO ES ESTE");
    });
});
  $(".opcion2_2_jugador").click(function(){
  	$("#imagen_fondo2").fadeOut(200, function(){
  		$("#imagen_fondo1").show();
  		$(".texto_contenedor").text("VAYA LAGO MAS GRANDE");
  	});
	});

});









/*
$(document).ready(function(){
  $(".opcion1_jugador").click(function(){
  	var imagen = $("#imagen_fondo");
  	imagen.fadeOut('fast', function () {
  		imagen.attr('src', 'fondo2.jpg');
  	});
  	$("#contenedor_texto").fadeOut('fast', function () {
  		imagen.attr('src', 'fondo2.jpg');
  	});
  	imagen.one("load",function(){
  		imagen.fadeIn('fast');
  		$("#contenedor_texto").fadeIn('fast');
  	});
});
});
*/