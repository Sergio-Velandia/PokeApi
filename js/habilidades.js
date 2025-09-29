
function renderizarDetalle(card) {
   document.getElementById("root").innerHTML = "Detalle de Carta";
    if (!card) {
        return '<p class="error">No se encontró información para esta carta.</p>';
    }

    const cardImageUrl = card.card_images && card.card_images.length > 0 
                         ? card.card_images[0].image_url : 'assets/default_card.jpg'; 
    
    const description = card.desc || 'No hay descripción disponible.';
    const race = card.race || 'N/A';
    const attribute = card.attribute || 'N/A';
    const atk = card.atk !== undefined ? card.atk : 'N/A';
    const def = card.def !== undefined ? card.def : 'N/A';
    const level = card.level !== undefined ? card.level : 'N/A';
    const isMonster = card.type.includes("Monster");

    return `
        <div class="c-detalle">
            <button onclick="Home()" class="btn-volver">← Volver a la Lista</button>
            <div class="detalle-card-header">
                <img src="${cardImageUrl}" alt="${card.name}" class="detalle-imagen">
                <div class="detalle-titulo">
                    <h1>${card.name} (${card.type})</h1>
                    <p class="id-card">ID: #${card.id}</p>
                </div>
            </div>
            <div class="detalle-cuerpo">
                <h2>Descripción</h2>
                <p class="card-descripcion">${description}</p>
                
                <h2>Estadísticas</h2>
                <ul class="card-stats">
                    <li><strong>Atributo:</strong> ${attribute}</li>
                    <li><strong>Tipo/Clase:</strong> ${race}</li>
                    ${isMonster ? 
                        `<li><strong>Nivel/Rango:</strong> ${level}</li>
                         <li><strong>ATK / DEF:</strong> ${atk} / ${def}</li>` 
                        : ''}
                </ul>
            </div>
        </div>
    `;
}

function Detalle(cardId) {
    const root = document.getElementById("root");
    
    const card = yugiohCards.find(c => c.id == cardId);

    if (!card) {
        root.innerHTML = '<p class="error">Carta no encontrada.</p>';
        console.error(`ERROR: No se encontró la carta con ID: ${cardId}`);
        return;
    }

    // Mostrar información en consola
    console.log("--- Detalle de Carta ---");
    console.log(`Nombre: ${card.name}`);
    console.log(`ID: ${card.id}`);
    console.log(`Tipo: ${card.type}`);
    console.log(`ATK/DEF: ${card.atk} / ${card.def}`);
    console.log(`Descripción: ${card.desc.substring(0, 100)}...`);
    console.log("------------------------");

    // Renderizar detalle en pantalla
    root.innerHTML = renderizarDetalle(card);
}