$(document).ready(function () {

    pruebaMuestra();

    function pruebaMuestra() {
        //Recogemos todas las sesiones de puntuaciones obtenidas durante el juego y las sumamos
        let inicio = sessionStorage.getItem('inicioJuego');
        let aciertos = sessionStorage.getItem('aciertosJuego');
        let puntosAntorcha = parseInt(sessionStorage.getItem('puntosAntorcha'));
        let puntuacionAciertos = aciertos * 100;
        let maximo= parseInt(inicio) + 300000;
        let fin = Date.now() ;

        let puntosTiempo = Math.trunc((maximo-fin)/1000);       
        let puntosTotales = puntuacionAciertos+puntosTiempo+puntosAntorcha;

        //Creacion de lista con las puntuaciones hasta el momento
        let lista = $("<ul>");
        lista.attr("class", "list-group");
        $(".finaliza").append(lista);

        var elemento = $("<li>").text("Tabla de puntuaciones: "+ puntuacionAciertos); 
        elemento.attr("class", "respuesta list-group-item");
        elemento.css('text-align','center');
        lista.append(elemento);

        var elemento = $("<li>").text("Tiempo: "+ puntosTiempo); 
        elemento.attr("class", "respuesta list-group-item");
        elemento.css('text-align','center');
        lista.append(elemento);

        var elemento = $("<li>").text("Puntos Evento final: "+ puntosAntorcha); 
        elemento.attr("class", "respuesta list-group-item");
        elemento.css('text-align','center');
        lista.append(elemento);

        var elemento = $("<li>").text("Puntos Totales: "+ puntosTotales); 
        elemento.attr("class", "respuesta list-group-item");
        elemento.css('text-align','center');
        lista.append(elemento);

        var elemento = $("<li>"); 
        elemento.attr("class", "respuesta list-group-item");
        elemento.css('text-align','center');
        lista.append(elemento);

        //Pedimos registro de usuario para guardarlo en la base de datos
        var nombre = $("<input>").attr("type", "text");
        nombre.attr("id", "nombreUsuario");
        nombre.attr("required",true);


        var boton = $("<button>").attr("class", "botonNombre").text("Guardar Nombre");
        elemento.append(nombre);
        elemento.append(boton);
        // eliminamos las sesiones de puntos y tiempo
		sessionStorage.removeItem('inicioJuego');
        sessionStorage.removeItem('aciertosJuego');
        sessionStorage.removeItem('puntosAntorcha');

        guardaNombre(puntosTotales);      
    }
    function guardaNombre(puntosTotales) {
        //Una vez introduce el nombre de usuario/grupo lo guardamos con una peticion ajax y al terminar lo redireccionamos a la tabla general de marcadores

            $(".botonNombre").click(


                function () {
        if ($("#nombreUsuario").val()=="") {
            $("#pantalla-Fallo").modal('show');
        }else{
            let puntos = $(".muestraPuntos")            
            let nombreUsuario=$("#nombreUsuario").val();
            $.ajax({
                url: "../controlador/metodos.php",
                type: "POST",
                data: {nombre: nombreUsuario, puntos: puntosTotales, funcion: "puntuaciones"},
                success: function (jsonStr) {
                    $(location).attr('href', 'marcador.html');
                }
            });  
        }
            
        });

    }
})