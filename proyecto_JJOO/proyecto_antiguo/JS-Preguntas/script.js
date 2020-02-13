$(document).ready(function () {

    /*
    Eleccion random para decidir si hay evento a la entrada de una pantalla o no
    */
    $("#boton").click(numRandom);

    function numRandom() {
        $("#pregunta").css("display", "none");
        $("#textoPregunta").text("");
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
        $("#pregunta").css("display", "block");

        $("#textoPregunta").text(pregunta.pregunta);    
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

    function eventoRespuesta(e) {
       let respuesta =  e.currentTarget.id;
       let acertada = $("#acertada").text();
        if (respuesta == acertada) {
            alert("Has acertado");
        }else{
            alert("Has fallado");
        }
    }

});
