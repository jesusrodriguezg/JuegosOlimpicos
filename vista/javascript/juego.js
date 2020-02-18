    $(document).ready(function(){
      // creamos un intervalo de tiempo de 30 segundos y una variable contador inicializada en 0
      var n = 0;
      var l = document.getElementById("number");
      var a = window.setInterval(function(){
        l.innerHTML = n;
        n++;
      },1000);

      tiempo();
      var contador=30;
      var intervalo;
      var puntuacion;

      // llamamos a la funcion MostrarTiempo cada segundo, para simular una cuenta atras
      function tiempo(){
        intervalo=window.setInterval(mostrarTiempo,1000);

      }
      function mostrarTiempo(){
        //Mientras el contador sea mayor que 0 actualizamos y mostramos al usuario el tiempo restante, si no lo consigue le comunicamos que ha fallado y redirigimos a marcadores
          if (contador > 0) {
            $("#contador").text("Tienes "+contador-- +" s");
          } else{
            clearInterval(intervalo);
            clearInterval(a);
            $("#pantalla-Fallo").modal('show');
            
            sessionStorage.setItem('puntosAntorcha', 0);
            setTimeout(function(){
              window.location="ending.html";
            },3000);
          }
        }
      
      
      $("#foto").click(function(){
        //establecemos la puntuacion segun el tiempo en encontrar la antorcha
        puntuacion=contador*10;
        contador=0;
        //limpiamos los intervalos de tiempo
        clearInterval(intervalo);
        clearInterval(a);
        //añadimos la puntuacion a la sesion para la suma en la tabla de puntuaciones y redirigimos
        sessionStorage.setItem('puntosAntorcha', puntuacion); 
        $("#pantalla-Acierto").modal('show');
        setTimeout(function(){
          window.location="ending.html";
        },3000);
      });


    });