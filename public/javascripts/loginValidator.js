console.log("login validator success!");
const exRegEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const $ = (id) => document.getElementById(id);

    //añade las clases que marcan los errores
    const ClassesInvalid = function(input, msgError) {
    
        const inputLabel = document.querySelector(`label[for=${input.id}]`)
    
        inputLabel.classList.add('invalidForm--label')
        input.classList.add('invalidForm')
        $(`error-${input.id}`).innerHTML = msgError
        $(`error-${input.id}`).style.visibility = "visible"
    }

//Quita el color rojo de los campos y labels en foco
for (let i = 0; i < $('form-login').elements.length - 2; i++) {
    
    const inputName = $('form-login').elements[i].name;
    
    $(inputName).addEventListener("focus", function () {

    const inputLabel = document.querySelector(`label[for=${this.id}]`)

    this.classList.remove('invalidForm')
    inputLabel.classList.remove('invalidForm--label')
    $(`error-${this.id}`).innerHTML = "no error"
    $(`error-${this.id}`).style.visibility = "hidden"
    });
}


//email
$("email").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            ClassesInvalid(this);
            $('error-email').innerHTML = "El email es obligatorio"
            break;
        case !exRegEmail.test(this.value):
            ClassesInvalid(this);
            $('error-email').innerHTML = "El mail tiene un formato inválido"
            break;
    }
});
//password
$("password").addEventListener("focus",function () {
    console.log(this.value.length)
    $("password").addEventListener("keyup", function (e) {
        e.target.value.length > 0 ? $("button-eye").hidden = false : $("button-eye").hidden = true
 })
 })
$("password").addEventListener("blur", function (e) {
    switch (true) {
        case !this.value:
            ClassesInvalid(this, "La contraseña es obligatoria");
            break;
    }
});

//botón de ojito (button-eye)

$("button-eye").addEventListener("click", function () {
    this.firstElementChild.classList.toggle('fa-eye');
    this.firstElementChild.classList.toggle('fa-eye-slash');
    $("password").type = $('password').type ===  "password" ? "text" : "password"
    $("password").focus()
});


$("form-login").addEventListener("submit", function (e) {
    e.preventDefault();

  let error = false;
  
  for (let i = 0; i < this.elements.length - 2; i++) {
      if (!this.elements[i].value) {
          error = true;
          const inputLabel = document.querySelector(`label[for=${this.elements[i].id}]`)
            this.elements[i].classList.add("invalidForm");
            inputLabel.classList.add("invalidForm--label");
            $(`error-${this.elements[i].id}`).innerHTML = "Este campo es obligatorio"
            $(`error-${this.elements[i].id}`).style.visibility = "visible"
    }
  }

  if (!error) {
    this.submit()
}else{
    $('msg-error').hidden = false
}
   
});
