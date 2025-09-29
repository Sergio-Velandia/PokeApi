let yugiohCards = []; 

async function conexionLista() {
    const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`);
    const data = await res.json();
    return data.data; 
}
async function conexionListaFiltro(endpoint) {
    const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php/${endpoint}`);
    const data = await res.json();
    const yugiohCardsFiltered = [];
    if (data && Array.isArray(data.data)) {
        for (let i = 0; i < data.data.length; i++) {
            yugiohCardsFiltered.push(data.data[i]);
        }
        return yugiohCardsFiltered;
    }
    return yugiohCardsFiltered;
}

async function General() {
    if (yugiohCards.length === 0) {
        yugiohCards = await conexionLista();
    }
    
    Home(); 
    
    console.log(`--- Carga Inicial de Datos ---`);
    console.log(`Total de cartas cargadas: ${yugiohCards.length}`);
    if (yugiohCards.length > 0) {
        console.log(`Nombre de la primera carta: ${yugiohCards[0].name}`); 
    }
    console.log(`------------------------------`);
}

function generarListaHTML(arrayCards) {
    let listaHTML = "";
    
    if (!Array.isArray(arrayCards) || arrayCards.length === 0) {
        return '<p class="mensaje-error">No se encontraron cartas para mostrar.</p>';
    }

    const limit = Math.min(10000, arrayCards.length); 
    
    for (let i = 0; i < limit; i++) {
        const card = arrayCards[i];
        
        const cardImageUrl = card.card_images && card.card_images.length > 0 
                             ? card.card_images[0].image_url 
                             : 'assets/default_card.jpg'; 
                             
        const cardName = card.name;
        const cardId = card.id;

        listaHTML += `
            <div class="un-yugioh-card" onclick="Detalle(${cardId})">
                <p class="card-info">#${cardId} ${cardName}</p>
                <img 
                    src="${cardImageUrl}" 
                    width="auto" 
                    height="auto" 
                    loading="lazy" 
                    alt="${cardName}"
                    class="card-image"
                >
            </div>
        `;
    }
    return listaHTML;
}

function buscadorfuncion(sza){
    const listContainer = document.getElementById("la-lista");

    if (!yugiohCards || yugiohCards.length === 0) {
        listContainer.innerHTML = '<p>Cargando datos. Por favor, espere.</p>';
        return;
    }

    if(sza && sza.length >= 3){ 
        const searchTerm = sza.toLowerCase();
        const filtrados = yugiohCards.filter(card => {
            return card.name.toLowerCase().includes(searchTerm);
        });
        
        listContainer.innerHTML = generarListaHTML(filtrados);
        console.log(`Búsqueda: "${sza}". Cartas encontradas: ${filtrados.length}`);
    }else{
        listContainer.innerHTML = generarListaHTML(yugiohCards);
        console.log(`Búsqueda borrada. Mostrando ${yugiohCards.length} cartas.`);
    }
}

function FiltroConexion(tipo){
    const listContainer = document.getElementById("la-lista");

    if (!yugiohCards || yugiohCards.length === 0) {
        listContainer.innerHTML = '<p>Cargando datos. Por favor, espere.</p>';
        return;
    }
    
    if (!tipo) {
        listContainer.innerHTML = generarListaHTML(yugiohCards);
        return;
    }

    const cartasFiltradas = yugiohCards.filter(card => {
        const tipoLower = tipo.toLowerCase();
        
        const matchesType = card.type && card.type.toLowerCase() === tipoLower;
        const matchesAttribute = card.attribute && card.attribute.toLowerCase() === tipoLower;
        
        return matchesType || matchesAttribute;
    });

    listContainer.innerHTML = generarListaHTML(cartasFiltradas);
    console.log(`--- Filtro Aplicado ---`);
    console.log(`Tipo/Atributo: ${tipo}`);
    console.log(`Cartas que coinciden: ${cartasFiltradas.length}`);
    console.log(`-----------------------`);
}

// Inicia el proceso de carga y renderizado de la interfaz
General();