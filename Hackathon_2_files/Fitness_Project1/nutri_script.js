document.addEventListener('DOMContentLoaded', function() {
    fetch('strategies.json')
      .then(response => response.json())
      .then(data => {
          createNutritionCards(data);
      })
      .catch(error => console.error('Error loading strategies:', error));
});

function createNutritionCards(strategies) {
    const container = document.querySelector('.nutrition-cards');
    container.innerHTML = ''; 
    
    strategies.forEach(strategy => {
        const card = document.createElement('div');
        card.className = 'card';
    
        const image = document.createElement('img');
        image.src = strategy.imgSrc;
        image.alt = strategy.altText;
        image.addEventListener('click', () => updateText(strategy));
    
        const description = document.createElement('p');
        description.className = 'description';
        description.textContent = strategy.description;
    
        card.appendChild(image);
        card.appendChild(description);
    
        container.appendChild(card);
    });
}

function updateText(strategy) {
    const detailText = strategy.detailedDescription || "No detailed description available.";
    const detailContainer = document.getElementById('strategy-detail');
    if(detailContainer) {
        detailContainer.textContent = detailText;
    } else {
        console.error('Detail container not found');
    }
}
