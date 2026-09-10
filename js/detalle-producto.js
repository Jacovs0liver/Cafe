const parametros = new URLSearchParams(window.location.search);

const idProducto = Number(parametros.get("id"));

const producto = productos.find(
    producto => producto.id === idProducto
);

const detalleProducto = document.getElementById("detalle-producto");

if (producto) {

    detalleProducto.innerHTML = `
        <img
            src="${producto.imagen}"
            alt="${producto.nombre}"
            class="imagen-producto"
        >

        <h2>${producto.nombre}</h2>

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

        <button
            type="button"
            onclick="agregarAlCarrito(${producto.id})">
            Agregar al carrito
        </button>

        <br><br>

        <a href="productos.html">
            Volver a productos
        </a>
    `;

} else {

    detalleProducto.innerHTML = `
        <h2>Producto no encontrado</h2>

        <p>
            El producto que buscas no existe.
        </p>

        <a href="productos.html" class="boton">
            Volver a productos
        </a>
    `;
}