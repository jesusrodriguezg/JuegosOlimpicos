$(document).ready(function () {
    verPuntuacion();
    function verPuntuacion(){       
        // realizamos una peticion ajax para mostrar las 10 mejores puntuaciones 
            let puntos = $(".muestraPuntos")            
            $.ajax({
                url: "../controlador/metodos.php",
                type: "POST",
                data: {funcion: "verpuntuaciones"},
                success: function (jsonStr){
                    let json = JSON.parse(jsonStr);
                    if (json.length==0){
                        //En caso de que no haya puntuaciones anteriores mostramos que no hay
                        let lista = $("<ul>");
                        lista.attr("class", "list-group");
                        $(".muestraPuntos").append(lista);
                        let elemento = $("<li>").text("No hay puntuaciones todavía"); 
                        elemento.attr("class", "respuesta list-group-item");
                        elemento.css('text-align','center');
                        lista.append(elemento);
                    } 
                    else{
                        puntos.empty();
                         if (json.length<=10) {
                            var total = json.length;
                        } else {
                            var total =10;
                        }
                        //creamos el dom con la lista y las puntuaciones con un for
                        let lista = $("<ul>");
                        lista.attr("class", "list-group");
                        $(".muestraPuntos").append(lista);
                        for (let index = 0; index < total; index++){
                            let element = json[index];
                            let elemento = $("<li>").text((index+1)+"º puesto "); 
                            elemento.attr("class", "respuesta list-group-item");
                            lista.append(elemento);
                            $(elemento).append(element.puntos+" puntos");
                            $(elemento).append(" Nombre Jugador: "+element.nombre);
                        }
                    }
                }
            });  
        }
})