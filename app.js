const { createApp, onMounted } = Vue;

createApp({
  setup() {
    onMounted(() => {
      // Temperatura
      new Chart(document.getElementById('tempChart'), {
        type: 'bar',
        data: {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
          datasets: [{
            label: 'Temperatura Média (°C)',
            data: [18.1, 18.3, 19.2, 19.6],
            backgroundColor: '#0072c6'
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } }
        }
      });

      // Precipitação
      new Chart(document.getElementById('precChart'), {
        type: 'line',
        data: {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
          datasets: [{
            label: 'Precipitação (mm)',
            data: [75, 120, 160, 200],
            borderColor: '#00b0f0',
            backgroundColor: 'rgba(0,176,240,0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } }
        }
      });

      // Mapa
      const map = L.map('map').setView([32.6509, -16.9080], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>'
      }).addTo(map);

      L.marker([32.6509, -16.9080])
        .addTo(map)
        .bindPopup('Estação Meteorológica - Funchal')
        .openPopup();
    });

    return {};
  }
}).mount('#app');
