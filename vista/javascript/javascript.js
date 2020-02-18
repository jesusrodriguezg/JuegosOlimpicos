$(document).ready(function () {
    
    /*
    * Iniciamos sesiones para el tiempo de juego que repercutira en la puntuacion  y llamamos a cambiarImagen que empieza el juego
    * 
    * Importante: Hacemos un control del recorrido mediante incrementando un numero que es el identificador de las imagenes.
    * 
    */
    cambiarImagen();    
    sessionStorage.setItem('inicioJuego', Date.now());
    sessionStorage.setItem('aciertosJuego', 0);

    //var arrayPreguntas=new Array();
    //var arrayImagenes=new Array();        
    
    //Al hacer click en un boton aumentamos un contador +1 o +2 dependiendo del boton, con el identificador de las imagenes, para así partir de una ruta distinta en cada juego
    function cambiarImagen(){
        $(".boton1").click(function(event){

            if(compruebaEstado() == false){
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
                //Llamamos a la funcion que genera un evento
                generaEvento();
            }
        });

         $(".boton2").click(function(event){
            if(compruebaEstado() == false){
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
                //Llamamos a la funcion que genera un evento
                generaEvento();
            }
        });
        //en caso de llegar al final lo redireccionamos a la pagina con el evento final
        $(".botonFin").click(function(){
            $(location).attr('href', 'encuentrawally.html');  
        });
    }
    // funcion que comprueba si hemos llegado al final del recorrido y prepara el boton de redirrecion
    function compruebaEstado(){
        var slide = $('.item.active').attr("alt");

        if(slide.includes("final")){
            var alt=$(event.currentTarget).attr("alt");
            $(event.currentTarget).attr("alt",parseInt(alt)+1);
            $(".contenedor_opciones .list-group").css("display", "block");
            $(".boton1").css("display", "none");
            $(".boton2").css("display", "none");
            $("div.contenedor_opciones > ul.list-group.fin_juego").css("display","block");

            $(".botonFin").css("display","block");
            return true;
        }

            var tituloPagina=$(".active").attr("alt");
            $("overlay").text(tituloPagina);

        return false;
    }

    

    //probabilidad de generar un evento o en su defecto de seguir avanzando
            
    

    /*
    Si ha salido que se genera evento elegimos QUE evento se genera de forma aleatoria
    de un numero predefinido
    */

    function generaEvento() { 
        let numero = Math.floor(Math.random() * 2);
        //if (numero==1&&arrayImagenes.length>=8) {
        //    numero=0;
       // }
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
        let numero = Math.floor(Math.random() * 14);


        //Creamos un array para que no se repita evento_pregunta
        //while(arrayPreguntas.includes(numero)){
        //    let numero = Math.floor(Math.random() * (6 - 1)) + 1;
        //}
        //arrayPreguntas[arrayPreguntas.length]=numero;
        //peticion ajax para obtener una pregunta aleatoria de la base de datos
        $.ajax({
            type: "post",
            url: "../controlador/metodos.php",
            data: {numero:numero+1, funcion: "funcion1"},
            error(xhr,status,error){console.log("nope");
            },
            success: function (jsonStr) {
                let json = JSON.parse(jsonStr);
                muestrame(json);
            }
        });               
    }

    function muestrame(pregunta) {   
        //Creamos una lista con las respuestas con el json y lo añadimos al contenedor de respuestas
        let index = 1;
        let lista=$("<ul>");
        lista.attr("class", "list-group");
        lista.attr("id", "evt-pregunta");
        let cuestion =$("<li>").text(pregunta[0]); 
        cuestion.attr("class", "list-group-item");
        lista.append(cuestion); 
        pregunta[1].split(",").forEach(element => {
            let elemento =$("<li>").text(element); 
            elemento.attr("id", index);
            elemento.attr("class", "respuesta list-group-item");
            lista.append(elemento); 
            index ++;            
        });
        //ocultamos los botones de direccion mientras se muestre la pregunta       
        $(".contenedor_opciones .list-group").css("display", "none");
        $(".fixed-bottom").append(lista); 

        //guardamos la respuesta correcta en variable para comprobarla una vez que responda
        let respuesta =$("<p>").text(pregunta[2]); 
        respuesta.attr("id", "acertada");
        respuesta.css("display", "none");  
        $(".fixed-bottom").append(respuesta); 
        escuchaRespuesta();
    }
    //Fijamos un evento por cada posible respuesta
    function escuchaRespuesta() {        
        let respuestas = document.getElementsByClassName("respuesta");
        for (let i = 0; i < respuestas.length; i++) {
            respuestas[i].addEventListener("click", eventoRespuesta, false);
        }
    }
    // evento de comprobacion de respuesta y avance en el juego
    function eventoRespuesta(e) {
     let respuesta = $(e.currentTarget).text();
     let acertada = $("#acertada").text();
     if (respuesta == acertada) {
        $("#evt-pregunta").remove();
        $("#pantalla-Acierto").modal('show'); 

        //sumamos 1 a la sesion por acertar la pregunta
        let aciertos = sessionStorage.getItem('aciertosJuego');
        aciertos++;
        sessionStorage.setItem('aciertosJuego', aciertos);
    }else{
        $("#evt-pregunta").remove();
        $("#pantalla-Fallo").modal('show');
    }
    //deshacemos todo lo creado y volvemos a visualizar los botones
    $("#acertada").remove();
    $(".contenedor_opciones .list-group").css("display", "block");
    $(".fin_juego").css("display","none");
    /* MARCADO */ var rere = compruebaEstado(); 
    

    }
    //Realizamos una peticion ajax y obtenemos un evento imagen aleatorio de la base de datos
     function eventoImagen(){
        let numero = Math.floor(Math.random() * 8);
        //Creamos un array para que no se repita evento_imagen
        //while(arrayImagenes.includes(numero)) {
        //    let numero = Math.floor(Math.random() * (6 - 1)) + 1;
        //}
        //arrayImagenes[arrayImagenes.length]=numero;
        $.ajax({
            url: "../controlador/metodos.php",
            type: "POST",
            data: {numero:numero+1,funcion: "funcion2"},
            success: function (jsonStr) {
                let json = JSON.parse(jsonStr);
                muestrameiMAGEN(json);
            }
        });     
     }
     function muestrameiMAGEN(imagen) {
    //al igual que en evento pregunta creamos la estructura de modo que el usuario escriba la respuesta ayudandose de la imagen y la ayuda proporcionada
        let lista=$("<ul>");
        lista.attr("class", "list-group");
        lista.attr("id", "evt-imagen");
        //texto de la pregunta
        let cuestion =$("<li>").text(imagen[0]); 
        cuestion.attr("class", "list-group-item");
        lista.append(cuestion);         
        let elemento =$("<li>"); 
        elemento.attr("class", "list-group-item");
        let entrada = $("<input>");
        entrada.attr("id", "respuesta");
        //ayuda *******
        entrada.attr("placeholder", imagen[1]);
        elemento.append(entrada);
        let boton = $("<button>").text("Responder");
        boton.attr("id","responderImagen");
        elemento.append(boton);
        lista.append(elemento); 
        $(".fixed-bottom").append(lista);
        // guardamos la respuesta correcta
        let respuesta =$("<p>").text(imagen[3]); 
        respuesta.attr("id", "acertada");
        respuesta.css("display", "none");  
        $(".fixed-bottom").append(respuesta);
        //ocultamos los botones y mostramos la imagen en su lugar
        $(".contenedor_opciones .list-group").css("display", "none");
        $("div.ontop2.container > div.row > div.col-12").css("background-image","url(imagenes/evento_imagenes/"+imagen[2]+")");
        $(".contenedor_opciones").css("left","20%");
        $(".contenedor_opciones").css("top","5%");
        escuchaImagen();
    }
    //Comprobamos la respuesta y avanzamos
    function escuchaImagen(){
        let acertada = $("#acertada").text();    
        acertada= acertada.toUpperCase();
        $("#respuesta").keyup(function(event) {
            if (event.keyCode === 13) {
                $("#responderImagen").click();
            }
        });
        $("#responderImagen").click( function (){
            let respuesta = $("#respuesta").val();
            respuesta =respuesta.toUpperCase();
            if (acertada==respuesta) {

                //eliminamos los relaciones con la imagen y notificamos al usuario si ha respondido correctamente o de forma erronea
                $("#evt-imagen").remove();
                $("#pantalla-Acierto").modal('show');
                //sumamos uno a los aciertos si es el caso
                let aciertos = sessionStorage.getItem('aciertosJuego');
                aciertos++;
                sessionStorage.setItem('aciertosJuego', aciertos);
            }else{
                $("#evt-imagen").remove();
                $("#pantalla-Fallo").modal('show');
            }
            //eliminamos los relaciones con la imagen y mostramos nuevamente los botones
            $("#imgPregunta").remove();
            $("div.ontop2.container > div.row > div.col-12").css("background-image","url()");    
            $("#acertada").remove();
            $(".contenedor_opciones .list-group").css("display", "block");
            $(".fin_juego").css("display","none");
            $(".contenedor_opciones").removeAttr("style");
            /* MARCADO */ var rere = compruebaEstado();      
        });    
    }

    //Función que coge la ubicación de la imagen de fondo actual y lo muestra en un faldón;
    //lo cambia automáticamente cada vez que hay un cambio de imagen
    function cambiaTitulo(){
        var tituloPagina=$(".active").attr("alt");
        $("overlay").text(tituloPagina);

    }

    //en caso de llegar al final lo redireccionamos a la pagina con el evento final
    $(".botonFinal").click(function () {     
        window.location="encuentrawally.html";
    })


})
