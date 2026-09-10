function mostrarCarrito() {

    const contenidoCarrito = document.getElementById("contenido-carrito");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {

        contenidoCarrito.innerHTML = `
            <p>Tu carrito está vacío.</p>

            <a href="productos.html" class="boton">
                Ver productos
            </a>
        `;

        return;
    }

    let productosCarrito = agruparProductos(carrito);

    let total = 0;

    let contenido = `
        <div class="lista-carrito">
    `;

    productosCarrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        contenido += `
            <article class="producto carrito-producto">

                <h3>${producto.nombre}</h3>

                <p>
                    <strong>Categoría:</strong>
                    ${producto.categoria}
                </p>

                <p>
                    Precio unitario:
                    $${producto.precio.toLocaleString("es-CL")}
                </p>

                <div class="cantidad">

                    <button
                        type="button"
                        onclick="disminuirCantidad(${producto.id})">
                        -
                    </button>

                    <span>
                        ${producto.cantidad}
                    </span>

                    <button
                        type="button"
                        onclick="aumentarCantidad(${producto.id})">
                        +
                    </button>

                </div>

                <p class="precio">
                    Subtotal:
                    $${subtotal.toLocaleString("es-CL")}
                </p>

                <button
                    type="button"
                    onclick="eliminarProducto(${producto.id})">
                    Eliminar
                </button>

            </article>
        `;
    });

    contenido += `
        </div>

        <div class="total-carrito">

            <h3>
                Total: $${total.toLocaleString("es-CL")}
            </h3>

            <button
                type="button"
                onclick="vaciarCarrito()">
                Vaciar carrito
            </button>

        </div>
    `;

    contenidoCarrito.innerHTML = contenido;
}

function agruparProductos(carrito) {

    const productosAgrupados = [];

    carrito.forEach(producto => {

        const productoExistente = productosAgrupados.find(
            item => item.id === producto.id
        );

        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            const nuevoProducto = {
                id: producto.id,
                nombre: producto.nombre,
                categoria: producto.categoria,
                precio: producto.precio,
                descripcion: producto.descripcion,
                imagen: producto.imagen,
                cantidad: 1
            };

            productosAgrupados.push(nuevoProducto);
        }
    });

    return productosAgrupados;
}

function aumentarCantidad(idProducto) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = carrito.find(
        producto => producto.id === idProducto
    );

    if (producto) {
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

function disminuirCantidad(idProducto) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const indice = carrito.findIndex(
        producto => producto.id === idProducto
    );

    if (indice !== -1) {
        carrito.splice(indice, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

function eliminarProducto(idProducto) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito = carrito.filter(
        producto => producto.id !== idProducto
    );

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

function vaciarCarrito() {

    localStorage.removeItem("carrito");

    mostrarCarrito();
}

mostrarCarrito();