const formulario = document.getElementById("form-producto");

const codigo = document.getElementById("codigo");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const stock = document.getElementById("stock");
const stockCritico = document.getElementById("stock-critico");
const categoria = document.getElementById("categoria");
const imagen = document.getElementById("imagen");

const parametros = new URLSearchParams(window.location.search);
const indiceProducto = parametros.get("indice");

let productosAdmin = JSON.parse(
    localStorage.getItem("productosAdmin")
) || [];

let modoEdicion = indiceProducto !== null;


function cargarProducto() {

    if (!modoEdicion) {
        return;
    }

    const producto = productosAdmin[parseInt(indiceProducto)];

    if (!producto) {
        return;
    }

    codigo.value = producto.codigo;
    nombre.value = producto.nombre;
    descripcion.value = producto.descripcion;
    precio.value = producto.precio;
    stock.value = producto.stock;

    if (producto.stockCritico !== null) {
        stockCritico.value = producto.stockCritico;
    }

    categoria.value = producto.categoria;
}


function validarCodigo() {

    if (codigo.value.trim() === "") {
        document.getElementById("error-codigo").textContent =
            "El código es obligatorio.";
        return false;
    }

    if (codigo.value.trim().length < 3) {
        document.getElementById("error-codigo").textContent =
            "El código debe tener al menos 3 caracteres.";
        return false;
    }

    document.getElementById("error-codigo").textContent = "";
    return true;
}


function validarNombre() {

    if (nombre.value.trim() === "") {
        document.getElementById("error-nombre").textContent =
            "El nombre es obligatorio.";
        return false;
    }

    if (nombre.value.trim().length > 100) {
        document.getElementById("error-nombre").textContent =
            "El nombre no puede superar los 100 caracteres.";
        return false;
    }

    document.getElementById("error-nombre").textContent = "";
    return true;
}


function validarDescripcion() {

    if (descripcion.value.length > 500) {
        document.getElementById("error-descripcion").textContent =
            "La descripción no puede superar los 500 caracteres.";
        return false;
    }

    document.getElementById("error-descripcion").textContent = "";
    return true;
}


function validarPrecio() {

    if (precio.value === "") {
        document.getElementById("error-precio").textContent =
            "El precio es obligatorio.";
        return false;
    }

    if (parseFloat(precio.value) < 0) {
        document.getElementById("error-precio").textContent =
            "El precio no puede ser menor que 0.";
        return false;
    }

    document.getElementById("error-precio").textContent = "";
    return true;
}


function validarStock() {

    if (stock.value === "") {
        document.getElementById("error-stock").textContent =
            "El stock es obligatorio.";
        return false;
    }

    if (parseInt(stock.value) < 0) {
        document.getElementById("error-stock").textContent =
            "El stock no puede ser menor que 0.";
        return false;
    }

    if (!Number.isInteger(Number(stock.value))) {
        document.getElementById("error-stock").textContent =
            "El stock debe ser un número entero.";
        return false;
    }

    document.getElementById("error-stock").textContent = "";
    return true;
}


function validarStockCritico() {

    if (stockCritico.value === "") {
        document.getElementById("error-stock-critico").textContent = "";
        return true;
    }

    if (parseInt(stockCritico.value) < 0) {
        document.getElementById("error-stock-critico").textContent =
            "El stock crítico no puede ser menor que 0.";
        return false;
    }

    if (!Number.isInteger(Number(stockCritico.value))) {
        document.getElementById("error-stock-critico").textContent =
            "El stock crítico debe ser un número entero.";
        return false;
    }

    document.getElementById("error-stock-critico").textContent = "";
    return true;
}


function validarCategoria() {

    if (categoria.value === "") {
        document.getElementById("error-categoria").textContent =
            "Debe seleccionar una categoría.";
        return false;
    }

    document.getElementById("error-categoria").textContent = "";
    return true;
}


codigo.addEventListener("input", validarCodigo);
nombre.addEventListener("input", validarNombre);
descripcion.addEventListener("input", validarDescripcion);
precio.addEventListener("input", validarPrecio);
stock.addEventListener("input", validarStock);
stockCritico.addEventListener("input", validarStockCritico);
categoria.addEventListener("change", validarCategoria);


formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigoValido = validarCodigo();
    const nombreValido = validarNombre();
    const descripcionValida = validarDescripcion();
    const precioValido = validarPrecio();
    const stockValido = validarStock();
    const stockCriticoValido = validarStockCritico();
    const categoriaValida = validarCategoria();

    if (
        codigoValido &&
        nombreValido &&
        descripcionValida &&
        precioValido &&
        stockValido &&
        stockCriticoValido &&
        categoriaValida
    ) {

        const producto = {
            codigo: codigo.value.trim(),
            nombre: nombre.value.trim(),
            descripcion: descripcion.value.trim(),
            precio: parseFloat(precio.value),
            stock: parseInt(stock.value),
            stockCritico: stockCritico.value === ""
                ? null
                : parseInt(stockCritico.value),
            categoria: categoria.value
        };

        if (modoEdicion) {

            productosAdmin[parseInt(indiceProducto)] = producto;

            alert("Producto modificado correctamente.");

        } else {

            productosAdmin.push(producto);

            alert("Producto guardado correctamente.");
        }

        localStorage.setItem(
            "productosAdmin",
            JSON.stringify(productosAdmin)
        );

        if (
            producto.stockCritico !== null &&
            producto.stock <= producto.stockCritico
        ) {
            alert(
                `Alerta: ${producto.nombre} tiene stock crítico.`
            );
        }

        window.location.href = "admin-productos.html";
    }

});


cargarProducto();