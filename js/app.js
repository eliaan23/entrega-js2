const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

const productos = [
    { 
        id: 1,
        nombre: "harina",
        precio: 400,
        img: 
        "https://imgs.search.brave.com/0rADYsSqCFD-yqCFOUMxwOROnbXHQOzX6yzH2pzLuQU/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5B/bUJIUFJEUjNKVXRT/MVRqY0lTVnVRSGFI/YSZwaWQ9QXBp",
    },
    {
        id: 2,
        nombre: "galletitas",
        precio: 200,
        img:
        "https://imgs.search.brave.com/55gNtIZbX6WBcYtNlQj2RALgF7MGXj5-inCG7S7AQno/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/ZGlzdHJpYnVpZG9y/YXBvcC5jb20uYXIv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvZ2FsbGV0aXRh/cy1jYWNoYWZhei5q/cGc",
    },
    {
        id: 3,
        nombre: "cerveza",
        precio: 700,
        img:"https://imgs.search.brave.com/lc3-PPZWksqJxFiD1l6eNOo9mrEMhzxuih1JKx2BDp8/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5M/YXJZdUNORkFtX20w/Q09YT1JJRXFnSGFI/YSZwaWQ9QXBp", 
    },
    {
        id: 4,
        nombre: "leche",
        precio: 320,
        img:"https://imgs.search.brave.com/PhMcsRWeRAxZ1FGNiP_W_31dJNkZz1vmgwvtjQqs-YI/rs:fit:423:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4x/Y0JHYm00cWViT3hB/NDVLZzBmTnJnQUFB/QSZwaWQ9QXBp",
    },
];



let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


productos.forEach((product) => {
let content = document.createElement("div");
content.className = "card";
content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
`;


shopContent.append(content);

let comprar = document.createElement("button");
comprar.innerText = "comprar";
comprar.className = "comprar";

content.append(comprar);


comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
    carrito.map((prod) => {
        if (prod.id === product.id) {
        prod.cantidad++;
        }
    });
    } else {
    carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
    });
    console.log(carrito);
    console.log(carrito.length);
    carritoCounter();
    saveLocal();
    }
});
});



//set item
const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <span class="restar"> - </span>
        <!--recomiendo no escribir la palabra cantidad para que no quede tan largo :)-->
        <p>${product.cantidad}</p>
        <span class="sumar"> + </span>
          <p>Total: ${product.cantidad * product.precio} $</p>
        <span class="delete-product"> ❌ </span>
        `;

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
        if (product.cantidad !== 1) {
        product.cantidad--;
        }
        saveLocal();
        pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
        product.cantidad++;
        saveLocal();
        pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
        eliminarProducto(product.id);
    });

      // let eliminar = document.createElement("span");
      // eliminar.innerText = "❌";
      // eliminar.classList = "delete-product";
      // carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: ${total} $`;
    modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    console.log(foundId);

    carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
    });

    carritoCounter();
    saveLocal();
    pintarCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();

//get item