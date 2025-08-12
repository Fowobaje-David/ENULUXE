function findProperty() {
    const location = document.getElementById('location').value;
    
    if (location.trim() === '') {
        alert('Please enter a location to search for properties.');
        return;
    }
    
    // After integration, this would make an API call to search for properties
    alert(`Searching for properties in: ${location}`);
    
    // search functionality 
    console.log('Searching for properties in:', location);
}

// Function to handle property filtering
function setupPropertyFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const propertyCards = document.querySelectorAll('.property-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filter = button.textContent.trim();
      
      // Filter properties based on the button clicked
      propertyCards.forEach(card => {
        if (filter === 'All') {
          card.style.display = 'block';
        } else {
          const propertyType = card.querySelector('h3').textContent;
          // This is a simple filter - you can expand this logic based on your needs
          if (propertyType.includes(filter.split(' ')[1])) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // Add click event to view property buttons
  const viewButtons = document.querySelectorAll('.view-btn');
  viewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const propertyCard = button.closest('.property-card');
      const propertyName = propertyCard.querySelector('h3').textContent;
      alert(`Viewing details for: ${propertyName}`);
      // Here you would typically redirect to a property details page
      // window.location.href = `/property/${propertyId}`;
    });
  });

  // View all properties button
  const viewAllBtn = document.querySelector('.view-all-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      // Show all properties
      propertyCards.forEach(card => {
        card.style.display = 'block';
      });
      // Reset active filter button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      filterButtons[0].classList.add('active');
      
      // Scroll to properties section
      document.querySelector('.properties').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Enter key support for the search input
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

// Initialize property filters when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  setupPropertyFilters();
});
