function home(cardsArray){
    const rootElement = document.getElementById("root");
    rootElement.innerHTML = ''; // Limpia el contenido anterior

    // Itera sobre las primeras 9 cartas
    for(var i = 0; i < 30; i++){
        // Verificamos que la carta exista antes de intentar acceder a sus propiedades
        if (cardsArray[i]) {
            const card = cardsArray[i];
            
            // La API de Yu-Gi-Oh! tiene la información relevante:
            const cardName = card.name;
            const cardId = card.id; // Usamos el ID de la carta para el Detalle() si lo necesitas
            
            // La URL de la imagen de arte oficial está en card_images[0].image_url
            // Usamos el 'image_url' en lugar del arte de tamaño completo ('image_url_cropped')
            const cardImageUrl = card.card_images[0].image_url;

            rootElement.innerHTML += `
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
    }
}