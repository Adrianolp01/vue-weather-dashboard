const { createApp, onMounted } = Vue;

createApp({
  setup() {
    onMounted(() => {
      // Gráfico de Temperatura
      new Chart(document.getElementById('tempChart'), {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr'],
          datasets: [{
            label: 'Temperatura Média (°C)',
            data: [27.4, 27.6, 27.8, 28.1],
            backgroundColor: '#ff7043'
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: false }
          }
        }
      });

      // Gráfico de Precipitação
      new Chart(document.getElementById('precChart'), {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr'],
          datasets: [{
            label: 'Precipitação (mm)',
            data: [250, 310, 280, 200],
            borderColor: '#42a5f5',
            backgroundColor: 'rgba(66,165,245,0.2)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });

      // Gráfico de Velocidade do Vento
      new Chart(document.getElementById('ventoChart'), {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr'],
          datasets: [{
            label: 'Velocidade do Vento (km/h)',
            data: [12, 14, 11, 13],
            borderColor: '#26a69a',
            backgroundColor: 'rgba(38,166,154,0.2)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });

      // Mapa com Leaflet
      const map = L.map('map').setView([-3.1190, -60.0217], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap'
      }).addTo(map);

      L.marker([-3.1190, -60.0217])
        .addTo(map)
        .bindPopup('Estação Meteorológica - Manaus')
        .openPopup();
    });

    return {};
  }
}).mount('#app');
