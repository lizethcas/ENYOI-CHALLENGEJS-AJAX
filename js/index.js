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

    let user = {
      email: $("input[type='email']").val(),
      password: $("input[type='password']").val(),
    };
    if (user.email.length != 0 && user.password.length != 0) {
      let existUser = users.find(
        (m) => m.email === $("input[type='email']").val().toLowerCase()
      );

      if (existUser != undefined) {
        if (existUser.password === user.password) {
          console.log('exitoso')
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
        if (existUser.password !== user.password) {
          const markup = `<div class="error">Usuario y/o Contraseña no 
          concuerdan.</div>`;
          $(".container").append(markup);

          $(".error").hide(3000);
        }
      }

      if (existUser === undefined) {
        const markup = `<div class="error">El Usuario no existe</div>`;
        $(".container").append(markup);

        $(".error").hide(3000);
      }
    } else {
      const markup = `<div class="error">Todos los campos son obligatorios</div>`;
      $(".container").append(markup);

      $(".error").hide(3000);
    }

    $(this).find("input").val("");
  });
});
