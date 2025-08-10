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
