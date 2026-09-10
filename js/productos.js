const productos = [
    {
        id: 1,
        nombre: "Café Colombia 250 g",
        categoria: "Café",
        precio: 8990,
        descripcion: "Café colombiano de sabor suave y equilibrado.",
        imagen: "img/cafe-colombia.jpg"
    },
    {
        id: 2,
        nombre: "Café Brasil 250 g",
        categoria: "Café",
        precio: 8490,
        descripcion: "Café brasileño con notas dulces y buen cuerpo.",
        imagen: "img/cafe-brasil.jpg"
    },
    {
        id: 3,
        nombre: "Café Etiopía 250 g",
        categoria: "Café",
        precio: 9990,
        descripcion: "Café de origen etíope con notas florales y frutales.",
        imagen: "img/cafe-etiopia.jpg"
    },
    {
        id: 4,
        nombre: "Prensa Francesa",
        categoria: "Métodos",
        precio: 14990,
        descripcion: "Método práctico para preparar café con cuerpo y aroma.",
        imagen: "img/prensa-francesa.jpg"
    },
    {
        id: 5,
        nombre: "Moka",
        categoria: "Métodos",
        precio: 16990,
        descripcion: "Método clásico para preparar café estilo espresso.",
        imagen: "img/moka.jpg"
    },
    {
        id: 6,
        nombre: "V60",
        categoria: "Métodos",
        precio: 12990,
        descripcion: "Método de filtrado para preparar un café limpio y aromático.",
        imagen: "img/v60.jpg"
    },
    {
        id: 7,
        nombre: "Molinillo Manual",
        categoria: "Molinillos",
        precio: 19990,
        descripcion: "Molinillo manual para moler café justo antes de prepararlo.",
        imagen: "img/molinillo.jpg"
    },
    {
        id: 8,
        nombre: "Taza de Café",
        categoria: "Accesorios",
        precio: 6990,
        descripcion: "Taza ideal para disfrutar tu café diariamente.",
        imagen: "img/taza.jpg"
    },
    {
        id: 9,
        nombre: "Termo",
        categoria: "Accesorios",
        precio: 15990,
        descripcion: "Termo para mantener tu café caliente durante más tiempo.",
        imagen: "img/termo.jpg"
    }
];


function mostrarProductos() {

    const listaProductos = document.getElementById("lista-productos");

    productos.forEach(producto => {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">

            <h3>${producto.nombre}</h3>

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

            <a href="producto-detalle.html?id=${producto.id}">
                Ver detalle
            </a>

            <button
                type="button"
                onclick="agregarAlCarrito(${producto.id})">
                Agregar al carrito
            </button>
        `;

        listaProductos.appendChild(tarjeta);
    });
}


function agregarAlCarrito(idProducto) {

    const producto = productos.find(
        producto => producto.id === idProducto
    );

    let carrito = JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

    carrito.push(producto);

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    alert(`${producto.nombre} fue agregado al carrito.`);
}



if (document.getElementById("lista-productos")) {
    mostrarProductos();
}