const users = [
  {
    name: "Lizeth Castillo",
    email: "lizcg.8@gmail.com",
    password: "123789",
  },
  {
    name: "Juan Alzate",
    email: "juanalzate@gmail.com",
    password: "abcd12345",
  },
  {
    name: "Carmensa Suarez",
    email: "suarez@gmail.com",
    password: "Medellin2023",
  },
];
$(function () {
  $("form").submit(function (e) {
    e.preventDefault();
    //GUARDAR EN UN OBJETO LOS DATOS INGRESADOS
    let user = {
      email: $("input[type='email']").val(),
      password: $("input[type='password']").val(),
    };
    //EVALUAR QUE TODOS LOS CAMPOS TENGAN INFORMACIÓN
    if (user.email.length != 0 && user.password.length != 0) {
      let existUser = users.find(
        (m) => m.email === $("input[type='email']").val().toLowerCase()
      ); //ENCONTRAR EL CORREO EN EL ARRAY DE OBJETOS USERS

      //EVALUAR QUE EL CORREO INGRESADO EXISTA
      if (existUser != undefined) {
        //EVALUAR QUE LA CONTRASEÑA INGRESADA CORRESPONDA A LA CONTRASEÑA CONTENIDA EN EL ARRAY DE OBJETOS USERS
        if (existUser.password === user.password) {
          console.log("exitoso");
          //TRAER EL HTML DEL ARCHIVO BIENVENIDO Y MOSTRARLO EN PANTALLA
          $.ajax({
            url: "bienvenido.html",
            type: "get",
            succes: function (resp) {
              console.log(resp);
              $(".container").html(resp);
              $(".sp").text(existUser.name);
            },
            error: function (error) {
              console.log("aquis");
              console.log(error);
            },
          });
        }
        //EVALUAR QUE LA CONTRASEÑA SEA VALIDA
        if (existUser.password !== user.password) {
          const error = "Usuario y/o Contraseña no concuerdan.";
          Error(error);
        }
      }

      //EVALUAR LA EXISTENCIA DEL CORREO INGRESADO EN EL FORMULARIO
      if (existUser === undefined) {
        const error = "El Usuario no existe";
        Error(error);
      }
      //EVALUAR QUE TODOS LOS CAMPOS ESTEN LLENOS
    } else {
      const error = "Todos los campos son obligatorios";
      Error(error);
    }
    //BORRAR DATOS DEL FORMULARIO UNA VEZ SON ENVIADOS
    $(this).find("input").val("");
  });
  //MOSTRAR MENSAJE DE ERROR SEGUN LA CONDICION
  function Error(error) {
    console.log(error);
    const markup = `<div class="error">${error}</div>`;
    $(".container").append(markup); //MOSTRAR EL ERROR EN PANTALLA

    $(".error").hide(3000); //MOSTRAR POR 3 SEGUNDOS EL MENSAJE DE ERROR
  }
});
