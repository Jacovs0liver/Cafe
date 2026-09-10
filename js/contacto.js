function validarNombre() {

    const nombre = document.getElementById("txtNombre").value.trim();
    const errorNombre = document.getElementById("error-nombre");

    errorNombre.textContent = "";


    if (nombre === "") {

        errorNombre.textContent =
            "El nombre es obligatorio.";

        return false;
    }


    if (nombre.length > 100) {

        errorNombre.textContent =
            "El nombre no puede superar los 100 caracteres.";

        return false;
    }


    return true;
}



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



function validarComentario() {

    const comentario =
        document.getElementById("txtComentario").value.trim();

    const errorComentario =
        document.getElementById("error-comentario");

    errorComentario.textContent = "";


    if (comentario === "") {

        errorComentario.textContent =
            "El comentario es obligatorio.";

        return false;
    }


    if (comentario.length > 500) {

        errorComentario.textContent =
            "El comentario no puede superar los 500 caracteres.";

        return false;
    }


    return true;
}



function validarContacto(event) {

    event.preventDefault();


    const nombreValido = validarNombre();
    const correoValido = validarCorreo();
    const comentarioValido = validarComentario();


    const mensajeContacto =
        document.getElementById("mensaje-contacto");

    mensajeContacto.textContent = "";


    if (
        nombreValido &&
        correoValido &&
        comentarioValido
    ) {

        mensajeContacto.textContent =
            "Mensaje enviado correctamente.";

        mensajeContacto.style.marginTop = "20px";
    }
}



const formularioContacto =
    document.getElementById("form-contacto");


const campoNombre =
    document.getElementById("txtNombre");


const campoEmail =
    document.getElementById("txtEmail");


const campoComentario =
    document.getElementById("txtComentario");





campoNombre.addEventListener(
    "input",
    validarNombre
);


campoEmail.addEventListener(
    "input",
    validarCorreo
);


campoComentario.addEventListener(
    "input",
    validarComentario
);



formularioContacto.addEventListener(
    "submit",
    validarContacto
);
