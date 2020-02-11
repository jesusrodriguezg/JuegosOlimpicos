//Imágenes a 240 * 240

$(document).ready(function () {


    /*
    * Se genera un evento de click por cada botón que se muestre
    * Se extrae el atributo "alt" de la imagen
    * Cuando se pulsa en el botón, se llama a slider.php y se le manda "alt" como parámetro
    * El script de PHP utiliza "alt" para hacer una select en la BD y devolver el CONTENIDO de la siguiente imagen
    * Con el contenido que devuelve  el script se crea el elemento con la siguiente imagen y todos sus atribtutos
    */
    $(".contenedor_opciones > ul > li").click(function(event){
            var alt=$(event.currentTarget).attr("alt");
            $.ajax({
                url: "php/slider.php",
                type: "POST",
                data: {"alt":alt},
                success: function (response) {
                    $(".fixed-bottom").fadeOut();
                    $(".active").append(response);
                    $(".active > img:first").fadeOut(1000,function(){
                        $(".active > img:first").remove();
                    });                    
                }
            });
        }); 

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
        var numero = Math.floor(Math.random() * 3);
        $.ajax({
            url: "php/eventoPregunta.php",
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
})