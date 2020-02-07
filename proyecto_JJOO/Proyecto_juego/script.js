//Imágenes a 240 * 240

$(document).ready(function () {

    /*
    Eleccion random para decidir si hay evento a la entrada de una pantalla o no
    */
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
        //var numero = Math.floor(Math.random() * 10);
        let numero =1;
        switch (numero) {
            case 1:
            eventoPregunta();
            break;
            case 2:
            eventoImagen();
            break;
            case 3:
            eventoPuzzle();
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
        var numero = Math.floor(Math.random() * 3);
        $.ajax({
            url: "php/metodos.php",
            type: "POST",
            data: {numero:numero+1},
            dataType: "JSON",
            success: function (jsonStr) {
                muestrame(jsonStr);
            }
        });        
       
    }

    function muestrame(pregunta) {   
        $("#contenedor_texto").css("display", "block");

        $(".texto_contenedor").text(pregunta[0]);    
        let index = 1;
        
        pregunta[1].split(",").forEach(element => {
            var boton =$("<button>").text(element); 
            boton.attr("id", index);
            boton.attr("class", "botonRespuesta");
            var salto =$("<br>"); 
            $("#respuestas").append(boton); 
            $("#respuestas").append(salto); 
            index ++;            
        });
        var respuesta =$("<p>").text(pregunta[2]); 

        respuesta.attr("id", "acertada");
        respuesta.css("display", "none");  
        $("#respuestas").append(respuesta); 
        escuchaRespuesta();

    }

    function escuchaRespuesta() {
        
        var respuestas = document.getElementsByClassName("botonRespuesta");
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

    //a partir de aqui evento imagen, evento puzzle
    function eventoImagen(){

    }

    function eventoPuzzle(){
        //0-4
        var numero = Math.floor(Math.random() * 5);
        $.ajax({
            url: "php/metodo_puzzle.php",
            type: "POST",
            //data: {numero:numero+1},
            dataType: "JSON",
            success: function (jsonStr) {
                //metodo recibe el array de objetos con los datos de puzzle alamacenados en bbdd.
            }
        });
    }

    function mostrarPuzzle(apuzzles) {
    	//var numero = Math.floor(Math.random() * 5);
        $("#contenedor_puzzle").css("display", "block");
        //preguntar
        $("#contenedor_puzzle script").css("src",""+apuzzles[][]);    
        //llamar a metodo "x", una vez completado el puzzle
        //cambioPantalla();
    }

})