$(function(){
	$(".boton1").click(function(){
		var numero = $(this).attr("alt");
		var split = $(this).attr("class").split(" ");
		var clase = split[1];
		alert(clase);
		$("#carouselExampleControls").carousel(parseInt(numero));
	});
	$(".boton2").click(function(){
		var numero = $(this).attr("alt");
		var split = $(this).attr("class").split(" ");
		var clase = split[1];
		alert(clase);
		$("#carouselExampleControls").carousel(parseInt(numero));
	});

}); 