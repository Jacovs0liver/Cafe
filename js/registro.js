const regiones = [
    {
        nombre: "Región de Arica y Parinacota",
        comunas: ["Arica", "Camarones", "Putre", "General Lagos"]
    },
    {
        nombre: "Región de Tarapacá",
        comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte"]
    },
    {
        nombre: "Región de Antofagasta",
        comunas: ["Antofagasta", "Calama", "Mejillones"]
    },
    {
        nombre: "Región de Atacama",
        comunas: ["Copiapó", "Caldera", "Vallenar"]
    },
    {
        nombre: "Región de Coquimbo",
        comunas: ["La Serena", "Coquimbo", "Ovalle"]
    },
    {
        nombre: "Región de Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué"]
    },
    {
        nombre: "Región Metropolitana de Santiago",
        comunas: [
            "Santiago",
            "Cerrillos",
            "Cerro Navia",
            "Conchalí",
            "El Bosque",
            "Estación Central",
            "Huechuraba",
            "Independencia",
            "La Cisterna",
            "La Florida",
            "La Granja",
            "La Pintana",
            "La Reina",
            "Las Condes",
            "Lo Barnechea",
            "Lo Espejo",
            "Lo Prado",
            "Macul",
            "Maipú",
            "Ñuñoa",
            "Pedro Aguirre Cerda",
            "Peñalolén",
            "Providencia",
            "Pudahuel",
            "Quilicura",
            "Quinta Normal",
            "Recoleta",
            "Renca",
            "San Joaquín",
            "San Miguel",
            "San Ramón",
            "Vitacura",
            "Puente Alto",
            "Pirque",
            "San José de Maipo",
            "Colina",
            "Lampa",
            "Tiltil",
            "San Bernardo",
            "Buin",
            "Calera de Tango",
            "Paine",
            "Melipilla",
            "Alhué",
            "Curacaví",
            "María Pinto",
            "San Pedro",
            "Talagante",
            "El Monte",
            "Isla de Maipo",
            "Padre Hurtado",
            "Peñaflor"
        ]
    },
    {
        nombre: "Región del Libertador General Bernardo O'Higgins",
        comunas: ["Rancagua", "Machalí", "San Fernando"]
    },
    {
        nombre: "Región del Maule",
        comunas: ["Talca", "Curicó", "Linares"]
    },
    {
        nombre: "Región de Ñuble",
        comunas: ["Chillán", "Chillán Viejo", "San Carlos"]
    },
    {
        nombre: "Región del Biobío",
        comunas: ["Concepción", "Talcahuano", "Los Ángeles"]
    },
    {
        nombre: "Región de La Araucanía",
        comunas: ["Temuco", "Padre Las Casas", "Villarrica"]
    },
    {
        nombre: "Región de Los Ríos",
        comunas: ["Valdivia", "La Unión", "Panguipulli"]
    },
    {
        nombre: "Región de Los Lagos",
        comunas: ["Puerto Montt", "Osorno", "Castro"]
    },
    {
        nombre: "Región de Aysén",
        comunas: ["Coyhaique", "Aysén", "Chile Chico"]
    },
    {
        nombre: "Región de Magallanes y de la Antártica Chilena",
        comunas: ["Punta Arenas", "Puerto Natales", "Porvenir"]
    }
];

const formularioRegistro = document.getElementById("form-registro");
const campoRun = document.getElementById("txtRun");
const campoNombre = document.getElementById("txtNombre");
const campoApellido = document.getElementById("txtApellido");
const campoEmail = document.getElementById("txtEmail");
const campoFechaNacimiento = document.getElementById("txtFechaNacimiento");
const campoRegion = document.getElementById("txtRegion");
const campoComuna = document.getElementById("txtComuna");
const campoDireccion = document.getElementById("txtDireccion");
const campoPassword = document.getElementById("txtPassword");
const campoConfirmarPassword = document.getElementById("txtConfirmarPassword");

function cargarRegiones() {
    regiones.forEach(region => {
        const opcion = document.createElement("option");
        opcion.value = region.nombre;
        opcion.textContent = region.nombre;
        campoRegion.appendChild(opcion);
    });
}

function cargarComunas() {
    campoComuna.innerHTML = '<option value="">Seleccione una comuna</option>';

    const regionSeleccionada = regiones.find(
        region => region.nombre === campoRegion.value
    );

    if (regionSeleccionada) {
        regionSeleccionada.comunas.forEach(comuna => {
            const opcion = document.createElement("option");
            opcion.value = comuna;
            opcion.textContent = comuna;
            campoComuna.appendChild(opcion);
        });
    }
}

function validarRun() {
    const run = campoRun.value.trim().toUpperCase();
    const errorRun = document.getElementById("error-run");

    errorRun.textContent = "";

    if (run === "") {
        errorRun.textContent = "El RUN es obligatorio.";
        return false;
    }

    if (run.length < 7 || run.length > 9) {
        errorRun.textContent = "El RUN debe tener entre 7 y 9 caracteres.";
        return false;
    }

    if (!/^\d{6,8}[0-9K]$/.test(run)) {
        errorRun.textContent = "Ingresa el RUN sin puntos ni guion.";
        return false;
    }

    const cuerpo = run.slice(0, -1);
    const digitoIngresado = run.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplicador;
        multiplicador++;

        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    const resto = 11 - (suma % 11);

    let digitoCalculado;

    if (resto === 11) {
        digitoCalculado = "0";
    } else if (resto === 10) {
        digitoCalculado = "K";
    } else {
        digitoCalculado = resto.toString();
    }

    if (digitoIngresado !== digitoCalculado) {
        errorRun.textContent = "El RUN ingresado no es válido.";
        return false;
    }

    return true;
}

function validarNombre() {
    const nombre = campoNombre.value.trim();
    const errorNombre = document.getElementById("error-nombre");

    errorNombre.textContent = "";

    if (nombre === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        return false;
    }

    if (nombre.length > 50) {
        errorNombre.textContent = "El nombre no puede superar los 50 caracteres.";
        return false;
    }

    return true;
}

function validarApellido() {
    const apellido = campoApellido.value.trim();
    const errorApellido = document.getElementById("error-apellido");

    errorApellido.textContent = "";

    if (apellido === "") {
        errorApellido.textContent = "Los apellidos son obligatorios.";
        return false;
    }

    if (apellido.length > 100) {
        errorApellido.textContent = "Los apellidos no pueden superar los 100 caracteres.";
        return false;
    }

    return true;
}

function validarCorreo() {
    const correo = campoEmail.value.trim();
    const errorEmail = document.getElementById("error-email");

    errorEmail.textContent = "";

    if (correo === "") {
        errorEmail.textContent = "El correo electrónico es obligatorio.";
        return false;
    }

    if (correo.length > 100) {
        errorEmail.textContent = "El correo electrónico no puede superar los 100 caracteres.";
        return false;
    }

    if (
        !correo.endsWith("@duoc.cl") &&
        !correo.endsWith("@profesor.duoc.cl") &&
        !correo.endsWith("@gmail.com")
    ) {
        errorEmail.textContent = "Ingresa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        return false;
    }

    return true;
}

function validarRegion() {
    const errorRegion = document.getElementById("error-region");

    errorRegion.textContent = "";

    if (campoRegion.value === "") {
        errorRegion.textContent = "Debes seleccionar una región.";
        return false;
    }

    return true;
}

function validarComuna() {
    const errorComuna = document.getElementById("error-comuna");

    errorComuna.textContent = "";

    if (campoComuna.value === "") {
        errorComuna.textContent = "Debes seleccionar una comuna.";
        return false;
    }

    return true;
}

function validarDireccion() {
    const direccion = campoDireccion.value.trim();
    const errorDireccion = document.getElementById("error-direccion");

    errorDireccion.textContent = "";

    if (direccion === "") {
        errorDireccion.textContent = "La dirección es obligatoria.";
        return false;
    }

    if (direccion.length > 300) {
        errorDireccion.textContent = "La dirección no puede superar los 300 caracteres.";
        return false;
    }

    return true;
}

function validarPassword() {
    const password = campoPassword.value;
    const errorPassword = document.getElementById("error-password");

    errorPassword.textContent = "";

    if (password === "") {
        errorPassword.textContent = "La contraseña es obligatoria.";
        return false;
    }

    if (password.length < 4 || password.length > 10) {
        errorPassword.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
        return false;
    }

    return true;
}

function validarConfirmacionPassword() {
    const password = campoPassword.value;
    const confirmarPassword = campoConfirmarPassword.value;
    const errorConfirmarPassword = document.getElementById("error-confirmar-password");

    errorConfirmarPassword.textContent = "";

    if (confirmarPassword === "") {
        errorConfirmarPassword.textContent = "Debes confirmar tu contraseña.";
        return false;
    }

    if (password !== confirmarPassword) {
        errorConfirmarPassword.textContent = "Las contraseñas no coinciden.";
        return false;
    }

    return true;
}

function validarRegistro(event) {
    event.preventDefault();

    const runValido = validarRun();
    const nombreValido = validarNombre();
    const apellidoValido = validarApellido();
    const correoValido = validarCorreo();
    const regionValida = validarRegion();
    const comunaValida = validarComuna();
    const direccionValida = validarDireccion();
    const passwordValido = validarPassword();
    const confirmacionValida = validarConfirmacionPassword();

    const mensajeRegistro = document.getElementById("mensaje-registro");

    mensajeRegistro.textContent = "";

    if (
        runValido &&
        nombreValido &&
        apellidoValido &&
        correoValido &&
        regionValida &&
        comunaValida &&
        direccionValida &&
        passwordValido &&
        confirmacionValida
    ) {
        mensajeRegistro.textContent = "Registro válido. Tu cuenta puede ser creada.";
        mensajeRegistro.style.marginTop = "20px";
    }
}

campoRegion.addEventListener("change", function () {
    cargarComunas();
    validarRegion();
});

campoComuna.addEventListener("change", validarComuna);
campoRun.addEventListener("input", validarRun);
campoNombre.addEventListener("input", validarNombre);
campoApellido.addEventListener("input", validarApellido);
campoEmail.addEventListener("input", validarCorreo);
campoDireccion.addEventListener("input", validarDireccion);

campoPassword.addEventListener("input", function () {
    validarPassword();

    if (campoConfirmarPassword.value !== "") {
        validarConfirmacionPassword();
    }
});

campoConfirmarPassword.addEventListener("input", validarConfirmacionPassword);
formularioRegistro.addEventListener("submit", validarRegistro);

cargarRegiones();