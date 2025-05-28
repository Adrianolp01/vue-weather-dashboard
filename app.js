const { createApp, ref, watch, onMounted } = Vue;

createApp({
  setup() {
    const anoSelecionado = ref("2024");

    const dados = {
      "2024": {
        temp: [28.1, 28.3, 28.4, 28.6],
        prec: [190, 220, 180, 140],
        vento: [14, 13, 15, 14]
      },
      "2023": {
        temp: [27.8, 27.9, 28.1, 28.2],
        prec: [210, 240, 200, 170],
        vento: [13, 14, 13, 12]
      }
    };

    const estacoes = [
      { nome: "EST", coord: [-3.1100, -60.0200], instalado: "nov/2012" },
      { nome: "POLICLINICA", coord: [-3.1150, -60.0050], instalado: "abr/2013" },
      { nome: "IFAM", coord: [-3.1300, -60.0150], instalado: "jun/2013" },
      { nome: "EMBRAPA AM-010", coord: [-3.0900, -59.9900], instalado: "jun/2013" },
      { nome: "CMM", coord: [-3.0950, -60.0300], instalado: "jul/2013" },
      { nome: "MUSA", coord: [-3.1400, -60.0250], instalado: "ago/2013" },
      { nome: "EMBRAPA CALDEIRÃO", coord: [-3.0850, -59.9850], instalado: "set/2013" },
      { nome: "INPA", coord: [-3.1000, -60.0100], instalado: "out/2013" },
      { nome: "TUPE", coord: [-3.2800, -60.6100], instalado: "fev/2017" },
      { nome: "PONTE", coord: [-3.1200, -60.0400], instalado: "abr/2016" }
    ];

    let tempChart, precChart, ventoChart;

    function atualizarGraficos(ano) {
      const d = dados[ano];
      tempChart.data.datasets[0].data = d.temp;
      precChart.data.datasets[0].data = d.prec;
      ventoChart.data.datasets[0].data = d.vento;

      tempChart.update();
      precChart.update();
      ventoChart.update();
    }

    watch(anoSelecionado, atualizarGraficos);

    onMounted(() => {
      tempChart = new Chart(document.getElementById('tempChart'), {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr'],
          datasets: [{
            label: 'Temperatura Média (°C)',
            data: [],
            backgroundColor: '#ff7043'
          }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: false } } }
      });

      precChart = new Chart(document.getElementById('precChart'), {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr'],
          datasets: [{
            label: 'Precipitação (mm)',
            data: [],
            borderColor: '#42a5f5',
            backgroundColor: 'rgba(66,165,245,0.2)',
            fill: true,
            tension: 0.4
          }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
      });

      ventoChart = new Chart(document.getElementById('ventoChart'), {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr'],
          datasets: [{
            label: 'Velocidade do Vento (km/h)',
            data: [],
            borderColor: '#26a69a',
            backgroundColor: 'rgba(38,166,154,0.2)',
            fill: true,
            tension: 0.4
          }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
      });

      atualizarGraficos(anoSelecionado.value);

      const map = L.map('map').setView([-3.1190, -60.0217], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>'
      }).addTo(map);

      estacoes.forEach(est => {
        L.marker(est.coord)
          .addTo(map)
          .bindPopup(`<strong>${est.nome}</strong><br/>Instalada: ${est.instalado}`);
      });
    });

    return { anoSelecionado };
  }
}).mount('#app');
