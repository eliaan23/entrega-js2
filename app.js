const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");

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

let carrito = [];

productos.forEach((product)=> {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.img}"
        <h3>${product.nombre}</h3
        <p class="price">${product.precio} $</p>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () =>{
        carrito.push({
            id : product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
        });
    console.log(carrito);
    });
});

verCarrito.addEventListener("click", () => {
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
        <h3>${product.nombre} $</h3>
        <p>${product.precio} $</p>
    `;

    modalContainer.append(carritoContent);
    });

    const total = carrito.reduce ((acc, el) => acc + el.precio, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalBuying);
});