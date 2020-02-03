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

            default:
            break;
        }    
    }

    /*
    En este caso es el evento de la pregunta recogemos las preguntas de un JSON y mediante
    un random (de nuevo) elegimos cual mostrar.
    */

    function eventoPregunta() {    
        var numero = Math.floor(Math.random() * 10);
        
        var preguntas =[{
            "pregunta": "¿Cual es la ciudad olimpica de 2020?",
            "respuestas": [
            "Tokio",
            "Toronto",
            "Madrid"
            ],
            "acertada": "3"
        },
        {
            "pregunta": "¿Cuantas medallas nos vamos a llevar?",
            "respuestas": [
            "0",
            "1",
            "Todas"
            ],
            "acertada": "3" 
        }
        ];
        if (numero%2==0) {
            muestrame(preguntas[0]);
        }else{
            muestrame(preguntas[1]);
        }
    }

    function muestrame(pregunta) {        
        $("#contenedor_texto").css("display", "block");

        $(".texto_contenedor").text(pregunta.pregunta);    
        let index = 1;
        
        pregunta.respuestas.forEach(element => {
            var boton =$("<button>").text(element); 
            boton.attr("id", index);
            boton.attr("class", "botonRespuesta");
            var salto =$("<br>"); 
            $("#respuestas").append(boton); 
            $("#respuestas").append(salto); 
            index ++;            
        });
        var respuesta =$("<p>").text(pregunta.acertada); 

        respuesta.attr("id", "acertada");
        respuesta.css("display", "none");  
        $("#respuestas").append(respuesta); 
        escuchaRespuesta();

    }

    function escuchaRespuesta() {
        var respuestas = document.getElementsByClassName("botonRespuesta");
        for (let i = 0; i < respuestas.length; i++) {
            console.log("escucha "+i);
            respuestas[i].addEventListener("click", eventoRespuesta, false);
        }
    }

    /*
    * Función que indica si se ha respondido correctamente o no; dependiendo de ello, se
    * muestra un mensaje u otro; en ambos casos se llama a la función mostrarBotones()
    */
    function eventoRespuesta(e) {
     let respuesta =  e.currentTarget.id;
     let acertada = $("#acertada").text();
     if (respuesta == acertada) {
            //alert("Has acertado");
            //mostrarBotones
            cambioPantalla();
        }else{
            alert("Has fallado");
        }
    }

    /*Función que muestra los botones una vez que se ha completado el evento (respondido a la pregunta, etc.)
    *Debe llamarse ANTES de mostrar la pantalla
    */
    function mostrarBotones(){
        var id=$("divfondo > img").css("display","block").attr("id");
        var botones=$("divbotones > img");
        for (var i = 0; i < botones.length; i++) {
            if (botones[i].attr("id")==id) {
                botones[i].css("display","block");
            }
        }
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
})