
$(document).ready(function () {

	$(".boton1").click(function(){
		let numero = $(this).attr("alt");
		let split = $(this).attr("class").split(" ");
		let clase = split[1];
        $("#carouselExampleControls").carousel(parseInt(numero));
        numRandom();
        
    });
    
	$(".boton2").click(function(){
		let numero = $(this).attr("alt");
		let split = $(this).attr("class").split(" ");
		let clase = split[1];
        $("#carouselExampleControls").carousel(parseInt(numero));
        numRandom();
	});
//Imágenes a 240 * 240

$(document).ready(function () {


    /*
    * Se genera un evento de click por cada botón que se muestre
    * Se extrae el atributo "alt" de la imagen
    * Cuando se pulsa en el botón, se llama a slider.php y se le manda "alt" como parámetro
    * El script de PHP utiliza "alt" para hacer una select en la BD y devolver el CONTENIDO de la siguiente imagen
    * Con el contenido que devuelve  el script se crea el elemento con la siguiente imagen y todos sus atribtutos
    */
    var botones=$(".contenedor_opciones > ul > li");
    for (var i = 0; i < botones.length; i++) {
        $(botones[i]).click(function(e){
            var alt=$(event.currentTarget).attr("alt");
            $.ajax({
                url: "../php/slider.php",
                type: "POST",
                data: {"alt":alt},
                dataType: "text",
                success: function (response) {
                    //crear / sustituir 
                    $("#carouselExampleControls").carousel(response);
                }
            });
        }); 
    }

    //Eventos originales para cambiar de imagen pulsando en los botones

    /*$(".boton1").click(function(){
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
    });*/


    /*
    Eleccion random para decidir si hay evento a la entrada de una pantalla o no
    */
    //$(".boton2").click(numRandom);
    //$(".boton1").click(numRandom);

    function numRandom() {
        //alert("entra");
        let numero = Math.floor(Math.random() * 2);
        /*if (numero+1%2==0) {
            generaEvento();
        }*/
        generaEvento();

    $(".opcion2_2_jugador").click(numRandom);
    $(".opcion1_1_jugador").click(numRandom);

    function numRandom() {
        $("#contenedor_texto").css("display", "none");
        $(".texto_contenedor").text("");
        $("#respuestas").text("");

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
        let numero = Math.floor(Math.random() * 2);
        switch (numero) {
            case 0:
            eventoPregunta();
            break;
            case 1:
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
        let numero = Math.floor(Math.random() * (6 - 1)) + 1;
        alert(numero);
        $.ajax({
            type: "post",
            url: "php/metodos.php",
            data: {numero:numero, funcion: "funcion1"},
            //dataType: "JSON",
            error(xhr,status,error){console.log("nope");
            },
            success: function (jsonStr) {
                let json = JSON.parse(jsonStr);
                muestrame(json);
            }
        });               
    }

    function muestrame(pregunta) {   
       // $(".fixed-bottom:first-child").css("display", "block");
        let index = 1;
        let lista=$("<ul>");
        lista.attr("class", "list-group");
        lista.attr("id", "evt-pregunta");
        let cuestion =$("<li>").text(pregunta[0]); 
        cuestion.attr("class", "list-group-item");
        lista.append(cuestion); 
        //console.log(cuestion);
        pregunta[1].split(",").forEach(element => {
            let elemento =$("<li>").text(element); 
            elemento.attr("id", index);
            elemento.attr("class", "respuesta list-group-item");
            lista.append(elemento); 
            //console.log(elemento);

            index ++;            
        });
        $(".fixed-bottom").append(lista); 

        let respuesta =$("<p>").text(pregunta[2]); 
        respuesta.attr("id", "acertada");
        respuesta.css("display", "none");  
        $(".fixed-bottom").append(respuesta); 
        escuchaRespuesta();
    }

    function escuchaRespuesta() {
        

        let respuestas = document.getElementsByClassName("respuesta");
        for (let i = 0; i < respuestas.length; i++) {
            respuestas[i].addEventListener("click", eventoRespuesta, false);
        }
    }

    function eventoRespuesta(e) {
     let respuesta = $(e.currentTarget).text();
     let acertada = $("#acertada").text();
     if (respuesta == acertada) {

        $("#evt-pregunta").remove();
            alert("Has acertado");
            //mostrarBotones
            //cambioPantalla();
    }else{
        $("#evt-pregunta").remove();
        alert("Has fallado");
    }
    $("#acertada").remove();
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
        let numero = Math.floor(Math.random() * 5);
        console.log("random imagen: "+numero);
        $.ajax({
            url: "php/metodos.php",
            type: "POST",
            data: {numero:numero,funcion: "funcion2"},
            //dataType: "JSON",
            success: function (jsonStr) {
                let json = JSON.parse(jsonStr);
                muestrameiMAGEN(json);
            }
        });     
     }
     function muestrameiMAGEN(imagen) {  
        //console.log(imagen);
        let lista=$("<ul>");
        lista.attr("class", "list-group");
        lista.attr("id", "evt-imagen");
        let cuestion =$("<li>").text(imagen[0]); 
        cuestion.attr("class", "list-group-item");
        lista.append(cuestion);         
        let elemento =$("<li>"); 
        elemento.attr("class", "list-group-item");
        let entrada = $("<input>");
        entrada.attr("id", "respuesta");
        entrada.attr("placeholder", imagen[1]);
        elemento.append(entrada);
        let boton = $("<button>").text("Responder");
        boton.attr("id","responderImagen");
        elemento.append(boton);
        lista.append(elemento); 
        $(".fixed-bottom").append(lista); 
        let respuesta =$("<p>").text(imagen[3]); 
        respuesta.attr("id", "acertada");
        respuesta.css("display", "none");  
        $(".fixed-bottom").append(respuesta); 
        $(".contenedor_opciones .list-group").css("display", "none");

        let cara = $("<img>").attr("src",imagen[2]);
        cara.attr("id","imgPregunta");
        $(".contenedor_opciones").append(cara);
        $(".contenedor_opciones").css("left","20%");
        $(".contenedor_opciones").css("top","5%");
        escuchaImagen();
    }

    function escuchaImagen() {
        let acertada = $("#acertada").text();    
        acertada= acertada.toUpperCase();
        $("#responderImagen").click( function (){
            let respuesta = $("#respuesta").val();
            respuesta =respuesta.toUpperCase();
            if (acertada==respuesta) {
                $("#evt-imagen").remove();
                alert("Has acertado");
            }else{
                $("#evt-imagen").remove();
                alert("Has fallado");
            }
            $("#imgPregunta").remove();
            $("#acertada").remove();
            $(".contenedor_opciones .list-group").css("display", "block");
            $(".contenedor_opciones").removeAttr("style");
            

        });        
    }
})