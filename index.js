// Linea 1, declarar la variable! (mejor usar let en vez de var y tratar de aplicarlo en todo el codigo) ;)!!
let carrito = [];


class Producto {
    constructor(nombre, cantidad) {
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
}


function agregarAlCarrito(nombre, cantidad) {
    const producto = new Producto(nombre, cantidad);
    carrito.push(producto);
    console.log(`Agregaste ${cantidad} artículo(s) de "${nombre}" al carrito.`);
}


function mostrarCarrito() {
    console.log('Productos en el carrito:');
    carrito.forEach(producto => {
        console.log(`Producto: ${producto.nombre}, Cantidad: ${producto.cantidad}`);
    });
}

function obtenerResumenCarrito() {
    let totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    let productosUnicos = carrito.map(producto => producto.nombre)
                                  .filter((valor, indice, self) => self.indexOf(valor) === indice);
    let resumen = productosUnicos.map(nombre => {
        let cantidad = carrito.filter(producto => producto.nombre === nombre)
                              .reduce((total, producto) => total + producto.cantidad, 0);
        return `${nombre}: ${cantidad} unidades`;
    });

    console.log('Resumen de la compra:');
    resumen.forEach(linea => console.log(linea));
    console.log(`Total de productos: ${totalProductos}`);
}


function mostrarCarritoEnPagina() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = ''; 
    const carritoHTML = document.createElement('ul');

    carrito.forEach(producto => {
        const item = document.createElement('li');
        item.textContent = `Producto: ${producto.nombre}, Cantidad: ${producto.cantidad}`;
        carritoHTML.appendChild(item);
    });

    carritoDiv.appendChild(carritoHTML);
}


function mostrarResumenCarritoEnPagina() {
    const resumenDiv = document.getElementById('resumen');
    resumenDiv.innerHTML = ''; 

    let totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    let productosUnicos = carrito.map(producto => producto.nombre)
                                  .filter((valor, indice, self) => self.indexOf(valor) === indice);
    let resumenHTML = document.createElement('ul');

    productosUnicos.forEach(nombre => {
        let cantidad = carrito.filter(producto => producto.nombre === nombre)
                              .reduce((total, producto) => total + producto.cantidad, 0);
        const item = document.createElement('li');
        item.textContent = `${nombre}: ${cantidad} unidades`;
        resumenHTML.appendChild(item);
    });

    resumenDiv.appendChild(resumenHTML);

    const totalProductosP = document.createElement('p');
    totalProductosP.textContent = `Total de productos: ${totalProductos}`;
    resumenDiv.appendChild(totalProductosP);
}

// Esta parte  es la de agregar al Carrito!!!!!!!!(usar const)!!!!!!!

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let cantidad = prompt(`¿Cuántas unidades de PC Gamer ${index + 1} deseas agregar al carrito?`);
        cantidad = parseInt(cantidad);
        if (!isNaN(cantidad) && cantidad > 0) {
            agregarAlCarrito(`PC Gamer ${index + 1}`, cantidad);
        } else {
            alert('Por favor, ingresa un número válido.');
        }
    });
});

const carritoIcono = document.getElementById('carrito-icono');
carritoIcono.addEventListener('click', () => {
    mostrarCarritoEnPagina();
    mostrarResumenCarritoEnPagina();
});



const buyButton = document.getElementById('buy');
buyButton.addEventListener('click', () => {
    mostrarCarrito();
    obtenerResumenCarrito();
    mostrarCarritoEnPagina(); 
    mostrarResumenCarritoEnPagina(); 
});




// Nota personal: Practicar mucho mas el js, entender mas la logica, si bien conozco el funcionamiento entenderlo mejor es fundamental.