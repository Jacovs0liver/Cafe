const formulario = document.getElementById("form-usuario");

const run = document.getElementById("run");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const fechaNacimiento = document.getElementById("fecha-nacimiento");
const tipoUsuario = document.getElementById("tipo-usuario");
const region = document.getElementById("region");
const comuna = document.getElementById("comuna");
const direccion = document.getElementById("direccion");

const regiones = [
    {
        nombre: "Arica y Parinacota",
        comunas: ["Arica", "Camarones", "Putre", "General Lagos"]
    },
    {
        nombre: "Tarapacá",
        comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"]
    },
    {
        nombre: "Antofagasta",
        comunas: ["Antofagasta", "Calama", "Tocopilla", "Mejillones"]
    },
    {
        nombre: "Atacama",
        comunas: ["Copiapó", "Caldera", "Vallenar", "Huasco"]
    },
    {
        nombre: "Coquimbo",
        comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel"]
    },
    {
        nombre: "Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"]
    },
    {
        nombre: "Metropolitana de Santiago",
        comunas: [
            "Santiago",
            "Estación Central",
            "Maipú",
            "Pudahuel",
            "Quinta Normal",
            "Lo Prado",
            "Cerro Navia",
            "La Florida",
            "Puente Alto",
            "La Cisterna",
            "San Miguel",
            "San Joaquín",
            "Macul",
            "Ñuñoa",
            "Providencia",
            "Las Condes",
            "Vitacura",
            "La Reina",
            "Peñalolén",
            "Recoleta",
            "Independencia",
            "Conchalí",
            "Huechuraba"
        ]
    },
    {
        nombre: "O'Higgins",
        comunas: ["Rancagua", "Machalí", "San Fernando", "Rengo"]
    },
    {
        nombre: "Maule",
        comunas: ["Talca", "Curicó", "Linares", "Molina"]
    },
    {
        nombre: "Ñuble",
        comunas: ["Chillán", "Chillán Viejo", "San Carlos", "Bulnes"]
    },
    {
        nombre: "Biobío",
        comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Coronel"]
    },
    {
        nombre: "La Araucanía",
        comunas: ["Temuco", "Angol", "Villarrica", "Pucón"]
    },
    {
        nombre: "Los Ríos",
        comunas: ["Valdivia", "La Unión", "Río Bueno", "Paillaco"]
    },
    {
        nombre: "Los Lagos",
        comunas: ["Puerto Montt", "Osorno", "Castro", "Ancud"]
    },
    {
        nombre: "Aysén",
        comunas: ["Coyhaique", "Aysén", "Chile Chico", "Cochrane"]
    },
    {
        nombre: "Magallanes y de la Antártica Chilena",
        comunas: ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"]
    }
];

const parametros = new URLSearchParams(window.location.search);
const indiceUsuario = parametros.get("indice");

let usuariosAdmin = JSON.parse(
    localStorage.getItem("usuariosAdmin")
) || [];

const modoEdicion = indiceUsuario !== null;

function cargarRegiones() {

    regiones.forEach(regionActual => {

        const opcion = document.createElement("option");

        opcion.value = regionActual.nombre;
        opcion.textContent = regionActual.nombre;

        region.appendChild(opcion);
    });
}

function cargarComunas(nombreRegion, comunaSeleccionada = "") {

    comuna.innerHTML = `
        <option value="">Seleccione una comuna</option>
    `;

    const regionSeleccionada = regiones.find(
        regionActual => regionActual.nombre === nombreRegion
    );

    if (!regionSeleccionada) {
        return;
    }

    regionSeleccionada.comunas.forEach(comunaActual => {

        const opcion = document.createElement("option");

        opcion.value = comunaActual;
        opcion.textContent = comunaActual;

        comuna.appendChild(opcion);
    });

    if (comunaSeleccionada !== "") {
        comuna.value = comunaSeleccionada;
    }
}

function validarRun() {

    const valor = run.value.trim().toUpperCase();
    const errorRun = document.getElementById("error-run");

    errorRun.textContent = "";

    if (valor === "") {
        errorRun.textContent = "El RUN es obligatorio.";
        return false;
    }

    if (!/^\d{6,8}[0-9K]$/.test(valor)) {
        errorRun.textContent =
            "El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guion.";
        return false;
    }

    const cuerpo = valor.slice(0, -1);
    const digitoVerificador = valor.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {

        suma += parseInt(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    const resto = suma % 11;
    const resultado = 11 - resto;

    let digitoCalculado;

    if (resultado === 11) {
        digitoCalculado = "0";
    } else if (resultado === 10) {
        digitoCalculado = "K";
    } else {
        digitoCalculado = resultado.toString();
    }

    if (digitoVerificador !== digitoCalculado) {
        errorRun.textContent = "El RUN ingresado no es válido.";
        return false;
    }

    return true;
}

function validarNombre() {

    const valor = nombre.value.trim();
    const errorNombre = document.getElementById("error-nombre");

    errorNombre.textContent = "";

    if (valor === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        return false;
    }

    if (valor.length > 50) {
        errorNombre.textContent =
            "El nombre no puede superar los 50 caracteres.";
        return false;
    }

    return true;
}

function validarApellido() {

    const valor = apellido.value.trim();
    const errorApellido = document.getElementById("error-apellido");

    errorApellido.textContent = "";

    if (valor === "") {
        errorApellido.textContent = "El apellido es obligatorio.";
        return false;
    }

    if (valor.length > 100) {
        errorApellido.textContent =
            "El apellido no puede superar los 100 caracteres.";
        return false;
    }

    return true;
}

function validarEmail() {

    const valor = email.value.trim().toLowerCase();
    const errorEmail = document.getElementById("error-email");

    errorEmail.textContent = "";

    if (valor === "") {
        errorEmail.textContent =
            "El correo electrónico es obligatorio.";
        return false;
    }

    if (valor.length > 100) {
        errorEmail.textContent =
            "El correo no puede superar los 100 caracteres.";
        return false;
    }

    if (
        !valor.endsWith("@duoc.cl") &&
        !valor.endsWith("@profesor.duoc.cl") &&
        !valor.endsWith("@gmail.com")
    ) {
        errorEmail.textContent =
            "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        return false;
    }

    return true;
}

function validarTipoUsuario() {

    const errorTipoUsuario =
        document.getElementById("error-tipo-usuario");

    errorTipoUsuario.textContent = "";

    if (tipoUsuario.value === "") {
        errorTipoUsuario.textContent =
            "Debe seleccionar un tipo de usuario.";
        return false;
    }

    return true;
}

function validarRegion() {

    const errorRegion = document.getElementById("error-region");

    errorRegion.textContent = "";

    if (region.value === "") {
        errorRegion.textContent =
            "Debe seleccionar una región.";
        return false;
    }

    return true;
}

function validarComuna() {

    const errorComuna = document.getElementById("error-comuna");

    errorComuna.textContent = "";

    if (comuna.value === "") {
        errorComuna.textContent =
            "Debe seleccionar una comuna.";
        return false;
    }

    return true;
}

function validarDireccion() {

    const valor = direccion.value.trim();
    const errorDireccion = document.getElementById("error-direccion");

    errorDireccion.textContent = "";

    if (valor === "") {
        errorDireccion.textContent =
            "La dirección es obligatoria.";
        return false;
    }

    if (valor.length > 300) {
        errorDireccion.textContent =
            "La dirección no puede superar los 300 caracteres.";
        return false;
    }

    return true;
}

function cargarUsuario() {

    if (!modoEdicion) {
        return;
    }

    const usuario = usuariosAdmin[parseInt(indiceUsuario)];

    if (!usuario) {
        return;
    }

    run.value = usuario.run;
    nombre.value = usuario.nombre;
    apellido.value = usuario.apellido;
    email.value = usuario.email;
    fechaNacimiento.value = usuario.fechaNacimiento;
    tipoUsuario.value = usuario.tipoUsuario;
    region.value = usuario.region;

    cargarComunas(
        usuario.region,
        usuario.comuna
    );

    direccion.value = usuario.direccion;
}

run.addEventListener("input", validarRun);
nombre.addEventListener("input", validarNombre);
apellido.addEventListener("input", validarApellido);
email.addEventListener("input", validarEmail);
tipoUsuario.addEventListener("change", validarTipoUsuario);

region.addEventListener("change", function () {

    cargarComunas(region.value);
    validarRegion();
    validarComuna();
});

comuna.addEventListener("change", validarComuna);
direccion.addEventListener("input", validarDireccion);

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const runValido = validarRun();
    const nombreValido = validarNombre();
    const apellidoValido = validarApellido();
    const emailValido = validarEmail();
    const tipoUsuarioValido = validarTipoUsuario();
    const regionValida = validarRegion();
    const comunaValida = validarComuna();
    const direccionValida = validarDireccion();

    if (
        runValido &&
        nombreValido &&
        apellidoValido &&
        emailValido &&
        tipoUsuarioValido &&
        regionValida &&
        comunaValida &&
        direccionValida
    ) {

        const usuario = {
            run: run.value.trim().toUpperCase(),
            nombre: nombre.value.trim(),
            apellido: apellido.value.trim(),
            email: email.value.trim(),
            fechaNacimiento: fechaNacimiento.value,
            tipoUsuario: tipoUsuario.value,
            region: region.value,
            comuna: comuna.value,
            direccion: direccion.value.trim()
        };

        if (modoEdicion) {

            usuariosAdmin[parseInt(indiceUsuario)] = usuario;

            alert("Usuario modificado correctamente.");

        } else {

            usuariosAdmin.push(usuario);

            alert("Usuario guardado correctamente.");
        }

        localStorage.setItem(
            "usuariosAdmin",
            JSON.stringify(usuariosAdmin)
        );

        window.location.href = "admin-usuarios.html";
    }
});

cargarRegiones();
cargarUsuario();