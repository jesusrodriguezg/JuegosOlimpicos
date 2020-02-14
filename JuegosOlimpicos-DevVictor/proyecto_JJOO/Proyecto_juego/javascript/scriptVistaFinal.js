$(document).ready(function () {

    pruebaMuestra();

    function pruebaMuestra() {
        let inicio= Date.now()-264000;
        let aciertos= 3;
        let puntuacionAciertos = aciertos * 100;
        let maximo= inicio + 300000;
        let fin = Date.now() ;
        let puntosTiempo = (maximo-fin)/100;
        //sessionStorage.clear();
        //alert("Puntuacion aciertos= "+puntuacionAciertos+", Puntos tiempo= "+puntosTiempo);
        //console.log("Puntuacion aciertos= "+puntuacionAciertos+", Puntos tiempo= "+puntosTiempo);
        let puntosTotales = puntuacionAciertos+puntosTiempo;
        let puntos = $("<div>");
        puntos.attr("class", "muestraPuntos");
        let textoPuntos1 = $("<h2>").text("Tu puntuacion es: ");
        let textoPuntos2 = $("<h2>").text("Puntuacion aciertos= "+puntuacionAciertos+", Puntos tiempo= "+puntosTiempo);
        let textoPuntos3 = $("<h2>").text("Total = "+puntosTotales);
        puntos.append(textoPuntos1);
        puntos.append(textoPuntos2);
        puntos.append(textoPuntos3);
        let nombre = $("<input>").attr("type", "text");
        nombre.attr("id", "nombreUsuario");
        let boton = $("<button>").attr("class", "botonNombre").text("Guardar Nombre");
        puntos.append(nombre);
        puntos.append(boton);
        $(".finaliza").append(puntos);
        guardaNombre(puntosTotales);      
    }
    function guardaNombre(puntosTotales) {
        $(".botonNombre").click(function () {
            let puntos = $(".muestraPuntos")            
            let nombreUsuario=$("#nombreUsuario").val();
            $.ajax({
                url: "php/metodos.php",
                type: "POST",
                data: {nombre: nombreUsuario, puntos: puntosTotales, funcion: "puntuaciones"},
                //dataType: "JSON",
                success: function (jsonStr) {
                    let json = JSON.parse(jsonStr);  
                    puntos.empty();
                    puntos.append("<h2>La Tabla de Puntuaciones es: </h2>");
                    for (let index = 0; index < json.length; index++) {
                        let element = json[index];
                        puntos.append("<h2>"+parseInt(index+1)+"º: "+"Nombre: " +element.nombre + " -> "+" Puntos: "+ element.puntos+"</h2>");
                        console.log(index+1+"º: "+"Nombre: " +element.nombre + " -> "+" Puntos: "+ element.puntos );                      
                    }
                }
            });  
        });
    }
})