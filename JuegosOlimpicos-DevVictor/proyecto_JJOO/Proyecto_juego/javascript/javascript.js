$(document).ready(function () {
    
    /*
    * Se genera un evento de click por cada botón que se muestre
    * Se extrae el atributo "alt" de la imagen
    * Cuando se pulsa en el botón, se llama a slider.php y se le manda "alt" como parámetro
    * El script de PHP utiliza "alt" para hacer una select en la BD y devolver el CONTENIDO de la siguiente imagen
    * Con el contenido que devuelve  el script se crea el elemento con la siguiente imagen y todos sus atribtutos
    * Se hace fadeOut del contenedor de respuestas, de los botones y de la imagen antigua y aparece la nueva
    */



    //Para que funciones he hecho cambiado el sitio de la carpeta php, dentro de evento.php cambiar registro[0] a registro["PREGUNTA"] y 
    //ademas cambiar el nombre de la base de datos y password


    cambiarImagen();

    function cambiarImagen(){
        $(".boton1").click(function(event){
            var alt=$(event.currentTarget).attr("alt");
            $("#carouselExampleControls").carousel(parseInt(alt));

            if( parseInt(alt) +2 > $('#carouselExampleControls').length){
                $(event.currentTarget).attr("alt",parseInt(alt)+1);
                $(".boton2").attr("alt",parseInt(alt)+1);
            }
            else{
                $(event.currentTarget).attr("alt",parseInt(alt)+2);
                $(".boton2").attr("alt",parseInt(alt)+2);
            }
            numRandom();
        });

         $(".boton2").click(function(event){
            var alt=$(event.currentTarget).attr("alt");
            $("#carouselExampleControls").carousel(parseInt(alt));

            if( parseInt(alt) + 1 > $('#carouselExampleControls').length){
                $(event.currentTarget).attr("alt",parseInt(alt)+1);
                $(".boton1").attr("alt",parseInt(alt)+1);
            }
            else{
                $(event.currentTarget).attr("alt",parseInt(alt)+1);
                $(".boton1").attr("alt",parseInt(alt)+1);
            }
            numRandom();     
        });
    }



    function numRandom() {
        let numero = Math.floor(Math.random() * 2);
        /*if (numero+1%2==0) {
            generaEvento();
        }*/
        generaEvento();
    }

    /*
    Si ha salido que se genera evento elegimos QUE evento se genera de forma aleatoria
    de un numero predefinido
    */

    function generaEvento() { 
        //let numero = Math.floor(Math.random() * 2);
        let numero = 1;
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
        $.ajax({
            type: "post",
            url: "php/metodos.php",
            data: {numero: numero, funcion: "funcion1"},
            //dataType: "JSON",
            fail(xhr,status,error){console.log(xhr+" "+" "+status+" "+error);
            },
            success: function (jsonStr){
                
                let json = JSON.parse(jsonStr);
                muestrame(json);
                
            }
        });               
    }

    function muestrame(pregunta) {   
        
        //$(".fixed-bottom:first-child").css("display", "block");
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
        let aciertos = sessionStorage.getItem('aciertosJuego');
        aciertos++;
        sessionStorage.setItem('aciertosJuego', aciertos);
        //mostrarBotones
        //cambioPantalla();
    }else{
        $("#evt-pregunta").remove();
        alert("Has fallado");
    }
    $("#acertada").remove();
    }




     function eventoImagen(){
        let numero = Math.floor(Math.random() * 5);
        console.log("random imagen: "+numero);
        $.ajax({
            type: "post",
            url: "php/metodos.php",
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
                let aciertos = sessionStorage.getItem('aciertosJuego');
                aciertos++;
                sessionStorage.setItem('aciertosJuego', aciertos);
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

    $(".botonFinal").click(function () {     
        window.location="ending.html";
    })


})
