const url = 'https://api.wheretheiss.at/v1/satellites/25544';

const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

let issMarker = L.marker([0, 0]).addTo(map);

function updateISS() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const lat = data.latitude;
      const lon = data.longitude;
      const alt = data.altitude.toFixed(2);
      const vel = data.velocity.toFixed(2);
      
      issMarker.setLatLng([lat, lon]);
      map.setView([lat, lon], 4);

      document.getElementById('latitude').textContent = `Latitude: ${lat.toFixed(2)}°`;
      document.getElementById('longitude').textContent = `Longitude: ${lon.toFixed(2)}°`;
      document.getElementById('altitude').textContent = `Altitude: ${alt} km`;
      document.getElementById('velocity').textContent = `Velocity: ${vel} km/h`;
    })
    .catch(error => console.error('Error fetching data:', error));
}

updateISS();
setInterval(updateISS, 5000);  // Update ISS position every 5 seconds
