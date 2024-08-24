const map = L.map('map').setView([0, 0], 2); // Initialize the map with a default view

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

const marker = L.marker([0, 0]).addTo(map); // Add a marker to the map
const coordinatesElement = document.getElementById('coordinates');
const lastUpdateElement = document.getElementById('lastUpdate');
const updateTimeElement = document.getElementById('updateTime');
const countdownElement = document.getElementById('countdown');
const errorElement = document.getElementById('error');
const errorMessageElement = document.getElementById('errorMessage');

let lastUpdateTime = new Date();

function updateISSLocation() {
    fetch('http://api.open-notify.org/iss-now.json')
        .then(response => response.json())
        .then(data => {
            if (data.message === 'success') {
                const { latitude, longitude } = data.iss_position;
                const lat = parseFloat(latitude);
                const lng = parseFloat(longitude);

                // Update the marker position and map view
                marker.setLatLng([lat, lng]);
                map.setView([lat, lng], 4);

                // Update coordinates info
                coordinatesElement.textContent = `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`;
                
                // Update last update time
                const now = new Date();
                lastUpdateElement.textContent = `Last Update: ${now.toLocaleTimeString()}`;
                const timeSinceUpdate = Math.floor((now - lastUpdateTime) / 1000);
                updateTimeElement.textContent = `Time Since Last Update: ${timeSinceUpdate} seconds`;
                
                lastUpdateTime = now;

                // Update countdown to next pass over a specific location
                getNextPassOverLocation(lat, lng);
            } else {
                handleError('Failed to retrieve ISS location.');
            }
        })
        .catch(error => {
            console.error('Error fetching ISS location:', error);
            handleError('Error fetching ISS location.');
        });
}

function getNextPassOverLocation(lat, lng) {
    // Dummy implementation for demonstration
    // You would replace this with actual calculation or API call
    const nextPassTime = new Date(Date.now() + 3600000); // 1 hour from now
    countdownElement.textContent = `Next Pass Over Location: ${nextPassTime.toLocaleTimeString()}`;
}

function handleError(message) {
    errorMessageElement.textContent = message;
    errorElement.style.display = 'block';
}

// Update the ISS location every 5 seconds
setInterval(updateISSLocation, 5000);

// Initial update
updateISSLocation();
