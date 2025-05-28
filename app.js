const { createApp, onMounted } = Vue;

createApp({
  setup() {
    onMounted(() => {
      // Temperatura
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
        options: { responsive: true }
      });

      // Precipitação
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
        options: { responsive: true }
      });

      // Vento
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
        options: { responsive: true }
      });
    });

    return {};
  }
}).mount('#app');
