let yugiohCards = []; 

async function conexionLista() {
  const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`);
  const data = await res.json();
  
  return data.data; 
}

async function General() {
  if (yugiohCards.length === 0) {
    yugiohCards = await conexionLista();
  }
  
  home(yugiohCards); 
  

  console.log(`Total de cartas cargadas: ${yugiohCards.length}`);
  console.log(`Nombre de la primera carta: ${yugiohCards[0].name}`); 
}

General();