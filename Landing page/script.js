function findProperty() {
    const location = document.getElementById('location').value;
    
    if (location.trim() === '') {
        alert('Please enter a location to search for properties.');
        return;
    }
    
    alert(`Searching for properties in: ${location}`);

    console.log('Searching for properties in:', location);
}

function setupPropertyFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const propertyCards = document.querySelectorAll('.property-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.textContent.trim();
      
      propertyCards.forEach(card => {
        if (filter === 'All') {
          card.style.display = 'block';
        } else {
          const propertyType = card.querySelector('h3').textContent;
          if (propertyType.includes(filter.split(' ')[1])) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  const viewButtons = document.querySelectorAll('.view-btn');
  viewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const propertyCard = button.closest('.property-card');
      const propertyName = propertyCard.querySelector('h3').textContent;
      alert(`Viewing details for: ${propertyName}`);
    });
  });

 
  const viewAllBtn = document.querySelector('.view-all-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {

      propertyCards.forEach(card => {
        card.style.display = 'block';
      });

      filterButtons.forEach(btn => btn.classList.remove('active'));
      filterButtons[0].classList.add('active');
 
      document.querySelector('.properties').scrollIntoView({ behavior: 'smooth' });
    });
  }
}
document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('location');
    if (locationInput) {
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                findProperty();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
  setupPropertyFilters();
});
