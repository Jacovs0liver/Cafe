function validarCorreo() {

    const correo = document.getElementById("txtEmail").value.trim();
    const errorEmail = document.getElementById("error-email");

    errorEmail.textContent = "";


    if (correo === "") {

        errorEmail.textContent =
            "El correo electrónico es obligatorio.";

        return false;
    }


    if (correo.length > 100) {

        errorEmail.textContent =
            "El correo electrónico no puede superar los 100 caracteres.";

        return false;
    }


    if (
        !correo.endsWith("@duoc.cl") &&
        !correo.endsWith("@profesor.duoc.cl") &&
        !correo.endsWith("@gmail.com")
    ) {

        errorEmail.textContent =
            "Ingresa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";

        return false;
    }


    return true;
}



function validarPassword() {

    const password = document.getElementById("txtPassword").value;
    const errorPassword = document.getElementById("error-password");

    errorPassword.textContent = "";


    if (password === "") {

        errorPassword.textContent =
            "La contraseña es obligatoria.";

        return false;
    }


    if (password.length < 4 || password.length > 10) {

        errorPassword.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";

        return false;
    }


    return true;
}



function validarLogin(event) {

    event.preventDefault();


    const correoValido = validarCorreo();
    const passwordValido = validarPassword();

    const mensajeLogin =
        document.getElementById("mensaje-login");


    mensajeLogin.textContent = "";


    if (correoValido && passwordValido) {

        mensajeLogin.textContent =
            "Inicio de sesión válido.";

        mensajeLogin.style.marginTop = "20px";
    }
}



const formularioLogin =
    document.getElementById("form-login");


const campoEmail =
    document.getElementById("txtEmail");


const campoPassword =
    document.getElementById("txtPassword");




campoEmail.addEventListener("input", validarCorreo);

campoPassword.addEventListener("input", validarPassword);




formularioLogin.addEventListener(
    "submit",
    validarLogin
);