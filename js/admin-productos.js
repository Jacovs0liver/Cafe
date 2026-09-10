const listaProductos = document.getElementById("lista-productos-admin");

let productosAdmin = JSON.parse(
    localStorage.getItem("productosAdmin")
) || [];


function mostrarProductosAdmin() {

    listaProductos.innerHTML = "";

    if (productosAdmin.length === 0) {

        listaProductos.innerHTML = `
            <p>No hay productos registrados.</p>
        `;

        return;
    }

    productosAdmin.forEach((producto, indice) => {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>

            <p>
                <strong>Código:</strong>
                ${producto.codigo}
            </p>

            <p>
                <strong>Categoría:</strong>
                ${producto.categoria}
            </p>

            <p>
                ${producto.descripcion}
            </p>

            <p class="precio">
                $${producto.precio.toLocaleString("es-CL")}
            </p>

            <p>
                <strong>Stock:</strong>
                ${producto.stock}
            </p>

            <p>
                <strong>Stock crítico:</strong>
                ${producto.stockCritico === null
                    ? "No definido"
                    : producto.stockCritico}
            </p>

            <a href="admin-producto-form.html?indice=${indice}" class="boton">
                Editar
            </a>

            <button type="button" onclick="eliminarProducto(${indice})">
                Eliminar
            </button>
        `;

        listaProductos.appendChild(tarjeta);
    });
}


function eliminarProducto(indice) {

    productosAdmin.splice(indice, 1);

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(productosAdmin)
    );

    mostrarProductosAdmin();
}


mostrarProductosAdmin();