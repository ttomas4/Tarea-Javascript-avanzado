// ==============================
// Clase Tarea
// ==============================

class Tarea {

    constructor(id, titulo, completada = false) {

        this.id = id;
        this.titulo = titulo;
        this.completada = completada;

    }

    toggleEstado() {

        this.completada = !this.completada;

    }

}

// ==============================
// Clase GestorTareas
// ==============================

class GestorTareas {

    constructor() {

        this.tareas = [];

    }

    agregarTarea(titulo) {

        const nuevaTarea = new Tarea(
            this.tareas.length + 1,
            titulo,
            false
        );

        this.tareas.push(nuevaTarea);

    }

    listarTareas() {

        console.log("----- LISTA DE TAREAS -----");

        this.tareas.forEach((tarea) => {

            console.log(
                `${tarea.id} - ${tarea.titulo} - ${tarea.completada ? "Completada" : "Pendiente"}`
            );

        });

        mostrarEnPantalla(this.tareas);

    }

    buscarPorTitulo(titulo) {

        return this.tareas.find(
            tarea => tarea.titulo.toLowerCase() === titulo.toLowerCase()
        );

    }

    listarCompletadas() {

        return this.tareas.filter(
            tarea => tarea.completada
        );

    }

}

// ==============================
// Mostrar tareas en HTML
// ==============================

const lista = document.querySelector("#listaTareas");

function mostrarEnPantalla(tareas){

    lista.innerHTML = "";

    tareas.forEach((tarea)=>{

        const li = document.createElement("li");

        li.textContent =
        `${tarea.id} - ${tarea.titulo} (${tarea.completada ? " Completada" : " Pendiente"})`;

        lista.appendChild(li);

    });

}

// ==============================
// Promesa
// ==============================

function cargarTareas(){

    return new Promise((resolve)=>{

        setTimeout(()=>{

            resolve([

                new Tarea(1,"Estudiar JavaScript",true),

                new Tarea(2,"Hacer la tarea",false),

                new Tarea(3,"Practicar Async Await",true)

            ]);

        },2000);

    });

}

// ==============================
// Segunda promesa (Extra)
// ==============================

function cargarUsuarios(){

    return new Promise((resolve)=>{

        setTimeout(()=>{

            resolve(["Tomás","Juan","María"]);

        },1500);

    });

}

// ==============================
// Gestor
// ==============================

const gestor = new GestorTareas();

// ==============================
// Botón cargar
// ==============================

const btnCargar = document.querySelector("#btnCargar");

btnCargar.addEventListener("click", async ()=>{

    console.clear();

    const resultado = await Promise.all([
        cargarTareas(),
        cargarUsuarios()
    ]);

    gestor.tareas = resultado[0];

    console.log("Tareas cargadas correctamente");

    console.log("Usuarios:");

    console.log(resultado[1]);

    gestor.listarTareas();

});

// ==============================
// Botón agregar
// ==============================

const btnAgregar = document.querySelector("#btnAgregar");

btnAgregar.addEventListener("click",()=>{

    const titulo = prompt("Ingrese una nueva tarea");

    if(titulo === null || titulo.trim()===""){

        return;

    }

    gestor.agregarTarea(titulo);

    gestor.listarTareas();

});

// ==============================
// Botón buscar
// ==============================

const btnBuscar = document.querySelector("#btnBuscar");

btnBuscar.addEventListener("click",()=>{

    const titulo = prompt("Título a buscar");

    const tarea = gestor.buscarPorTitulo(titulo);

    if(tarea){

        alert(
            `Encontrada:\n${tarea.titulo}`
        );

    }else{

        alert("No se encontró la tarea");

    }

});

// ==============================
// Botón completadas
// ==============================

const btnCompletadas = document.querySelector("#btnCompletadas");

btnCompletadas.addEventListener("click",()=>{

    const completadas = gestor.listarCompletadas();

    console.log("Tareas completadas");

    console.log(completadas);

    mostrarEnPantalla(completadas);

});

// ==============================
// Botón títulos (map)
// ==============================

const btnTitulos = document.querySelector("#btnTitulos");

btnTitulos.addEventListener("click",()=>{

    const titulos = gestor.tareas.map(

        tarea => tarea.titulo

    );

    console.log("Títulos:");

    console.log(titulos);

});
