function GeneralLista(cardsArray){
    const rootElement = document.getElementById("root");
    
    // Renderiza la lista completa directamente en el root
    const listaHTML = generarListaHTML(cardsArray);
    
    rootElement.innerHTML = listaHTML; 
}

function Home(filtro){
    var root = document.getElementById("root");
    root.innerHTML = ''; 
    
    // buscador
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar Carta Yu-Gi-Oh!..."; 
    buscador.addEventListener("input", () => {
        buscadorfuncion(buscador.value); 
    });

    // contenedor filtro
    const tipos = [
        "Normal Monster", "Effect Monster", "Fusion Monster", "Synchro Monster", 
        "Xyz Monster", "Link Monster", "Ritual Monster", "Pendulum Monster", 
        "Spell", "Trap",
        "DARK", "DIVINE", "EARTH", "FIRE", "LIGHT", "WATER", "WIND"
    ];

    const contenedorFiltro = document.createElement("div");
    contenedorFiltro.classList.add("tipos-container"); 

    for (let i = 0; i < tipos.length; i++) {
        const tipo = tipos[i];
        const btn = document.createElement("button");
        btn.textContent = tipo;
        
        btn.addEventListener("click", () => {
            FiltroConexion(tipo); 
        });

        contenedorFiltro.appendChild(btn);
    }

    // add contenedor lista
    // Aquí se genera el HTML de la lista inicial usando los datos cargados en conexion.js
    const listaHTML = generarListaHTML(yugiohCards); 
    var contenedorLista = document.createElement("div");
    contenedorLista.classList.add("c-contenedor-lista"); 
    contenedorLista.id = "la-lista"; 
    contenedorLista.innerHTML = listaHTML; 

    // agregar contenedores
    root.appendChild(buscador);
    root.appendChild(contenedorFiltro);
    root.appendChild(contenedorLista);
}