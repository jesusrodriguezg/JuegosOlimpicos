$(document).ready(function () {

	$(".boton1").click(function(){
		var numero = $(this).attr("alt");
		var split = $(this).attr("class").split(" ");
		var clase = split[1];
		alert(clase);
        $("#carouselExampleControls").carousel(parseInt(numero));
        numRandom();
        
    });
    
	$(".boton2").click(function(){
		var numero = $(this).attr("alt");
		var split = $(this).attr("class").split(" ");
		var clase = split[1];
		alert(clase);
        $("#carouselExampleControls").carousel(parseInt(numero));
        numRandom();
	});

    /*
    Eleccion random para decidir si hay evento a la entrada de una pantalla o no
    */
    //$(".boton2").click(numRandom);
    //$(".boton1").click(numRandom);

    function numRandom() {
        alert("entra");
        var numero = Math.floor(Math.random() * 10);
        if (numero%2==0) {
            generaEvento();
        }
    }

    /*
    Si ha salido que se genera evento elegimos QUE evento se genera de forma aleatoria
    de un numero predefinido
    */

    function generaEvento() { 
        //var numero = Math.floor(Math.random() * 10);
        let numero =1;
        switch (numero) {
            case 1:
            eventoPregunta();
            break;
            case 2:
            eventoImagen();
            break;

            default:
            break;
        }    
    }

    /*
    En este caso es el evento de la pregunta recogemos las preguntas de un JSON y mediante
    un random (de nuevo) elegimos cual mostrar.
    */

    function eventoPregunta() {   
        alert("evento");   
        var numero = Math.floor(Math.random() * 3);
        $.ajax({
            url: "../../proyecto_antiguo/php/metodos.php",
            type: "POST",
            data: {numero:numero+1,funcion: "funcion1"},
            dataType: "JSON",
            success: function (jsonStr) {
                muestrame(jsonStr);
                console.log(jsonStr);
            }
        });               
    }

    function muestrame(pregunta) {   
       // $(".panel").css("display", "block");

        $(".panel").text(pregunta[0]);    
        let index = 1;
        let lista=$("ul");
        lista.attr("class", "list-group");
        let cuestion =$("<li>").text(pregunta[0]); 
        cuestion.attr("class", "list-group-item");
        lista.append(cuestion); 
        
        pregunta[1].split(",").forEach(element => {
            var elemento =$("<li>").text(element); 
            elemento.attr("id", index);
            elemento.attr("class", "respuesta list-group-item");
            lista.append(elemento); 
            index ++;            
        });

        var respuesta =$("<p>").text(pregunta[2]); 
        respuesta.attr("id", "acertada");
        respuesta.css("display", "none");  
        $(".panel").append(respuesta); 
        escuchaRespuesta();
    }

    function escuchaRespuesta() {
        
        var respuestas = document.getElementsByClassName("respuesta");
        for (let i = 0; i < respuestas.length; i++) {
            respuestas[i].addEventListener("click", eventoRespuesta, false);
        }
    }

    function eventoRespuesta(e) {
     let respuesta = $(e.currentTarget).text();
     let acertada = $("#acertada").text();
     if (respuesta == acertada) {
            alert("Has acertado");
            //mostrarBotones
            //cambioPantalla();
        }else{
            alert("Has fallado");
        }
    }

    /*Función que muestra los botones una vez que se ha completado el evento (respondido a la pregunta, etc.)
    *Debe llamarse ANTES de mostrar la pantalla
    */
    function mostrarBotones(){
        //cambioPantalla();
    }

    /*Función que cambia la pantalla cuando se muestran los botones para elegir nuevo destino
    *Se le llama después de que el usuario haya pulsado uno de los botones mostrados con mostrarBotones()
    *Recibe por argumentos un ID del botón que hemos pulsado, que nos sirve para saber qué imagen debemos mostrar a continuación
    */
    function cambioPantalla(id){
            $("#imagen_fondo1").fadeOut(200, function(){
                $("#imagen_fondo2").show();
                $(".texto_contenedor").text("VAYA QUE SITIO ES ESTE");
            });
     }





     function eventoImagen(){
        var numero = Math.floor(Math.random() * 3);
        $.ajax({
            url: "php/metodos.php",
            type: "POST",
            data: {numero:numero+1,funcion: "funcion2"},
            dataType: "JSON",
            success: function (jsonStr) {
                muestrameiMAGEN(jsonStr);
            }
        });     
     }
     function muestrameiMAGEN(imagen) {   
        $("#contenedor_texto").css("display", "block");

        $(".texto_contenedor").text(imagen[0]);    
        let img=$("img");
        img.attr("src", "../"+imagen[2]);
        let entrada=$("input");
        entrada.attr("type","text");
        entrada.attr("id","respuesta");
        entrada.text(imagen[1]);
        let boton=$("button");
        boton.attr("id","responde");

        
        var respuesta =$("<p>").text(pregunta[2]); 

        respuesta.attr("id", "acertada");
        respuesta.css("display", "none");  
        $("#respuestas").append(respuesta); 
        escuchaRespuesta();
    }
})