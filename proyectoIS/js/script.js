// script.js

let productos = JSON.parse(localStorage.getItem('productos')) || [];

function mostrarFormulario() {
    document.getElementById('formulario').style.display = 'block';
}

function agregarProducto() {
    const imagen = document.querySelector('#imagen'); // Aquí deberías manejar la carga de la imagen
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;

    const archivo = imagen.files[0];
    console.log(archivo)
    console.log(archivo.src)

    if (!imagen || !nombre || !descripcion) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    
    const nuevoProducto = {
        imagen: archivo.src,
        nombre: nombre,
        descripcion: descripcion
    };

    productos.push(nuevoProducto);
    console.log(productos);

    document.getElementById('addProductForm').reset();
    document.getElementById('formulario').style.display = 'none';

    actualizarVisualizacion();
}

function editarProducto(btn) {
    const index = productos.findIndex(p => p.nombre === btn.parentNode.querySelector('h2').innerText);

    document.getElementById('imagen').value = productos[index].imagen; // Aquí deberías manejar la carga de la imagen
    document.getElementById('nombre').value = productos[index].nombre;
    document.getElementById('descripcion').value = productos[index].descripcion;

    productos.splice(index, 1);

    mostrarFormulario();
}

function eliminarProducto(btn) {
    const index = productos.findIndex(p => p.nombre === btn.parentNode.querySelector('h2').innerText);

    productos.splice(index, 1);

    actualizarVisualizacion();
}

function actualizarVisualizacion() {
    localStorage.setItem('productos', JSON.stringify(productos));

    const container = document.getElementById('inicio');
    console.log(container);
    container.innerHTML = ''; // Limpiar el contenedor antes de actualizar

    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const image = document.createElement('img');
        image.src = producto.imagen; // Aquí deberías manejar la carga de la imagen
        image.alt = producto.nombre;

        const title = document.createElement('h2');
        title.textContent = producto.nombre;

        const description = document.createElement('p');
        description.textContent = producto.descripcion;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.addEventListener('click', function () {
            editarProducto(this);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', function () {
            eliminarProducto(this);
        });

        productCard.appendChild(image);
        productCard.appendChild(title);
        productCard.appendChild(description);
        productCard.appendChild(editBtn);
        productCard.appendChild(deleteBtn);

        container.appendChild(productCard);
    });
}
