const listaUsuarios = document.getElementById("lista-usuarios-admin");

let usuariosAdmin = JSON.parse(
    localStorage.getItem("usuariosAdmin")
) || [];

function mostrarUsuariosAdmin() {

    listaUsuarios.innerHTML = "";

    if (usuariosAdmin.length === 0) {

        listaUsuarios.innerHTML = `
            <p>No hay usuarios registrados.</p>
        `;

        return;
    }

    usuariosAdmin.forEach((usuario, indice) => {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <h3>${usuario.nombre} ${usuario.apellido}</h3>

            <p>
                <strong>RUN:</strong>
                ${usuario.run}
            </p>

            <p>
                <strong>Correo:</strong>
                ${usuario.email}
            </p>

            <p>
                <strong>Tipo:</strong>
                ${usuario.tipoUsuario}
            </p>

            <p>
                <strong>Ubicación:</strong>
                ${usuario.comuna}, ${usuario.region}
            </p>

            <p>
                <strong>Dirección:</strong>
                ${usuario.direccion}
            </p>

            <a href="admin-usuario-form.html?indice=${indice}" class="boton">
                Editar
            </a>

            <button type="button" onclick="eliminarUsuario(${indice})">
                Eliminar
            </button>
        `;

        listaUsuarios.appendChild(tarjeta);
    });
}

function eliminarUsuario(indice) {

    usuariosAdmin.splice(indice, 1);

    localStorage.setItem(
        "usuariosAdmin",
        JSON.stringify(usuariosAdmin)
    );

    mostrarUsuariosAdmin();
}

mostrarUsuariosAdmin();