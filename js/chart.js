function drawChart(Écritures) {
    const dataChart = Écritures.dataChart()
    const svg = document.getElementById('myChart')

    new Chart.Line(svg, {
        type: 'line',
        xLabel: 'Jours',
        yLabel: 'Euros',
        data: {
            labels: dataChart.dates,
            datasets: [{
                    label: 'Solde bancaire',
                    data: dataChart.soldes,
                    borderColor: '#e299ab'
                },
                {
                    label: 'Réserve (Part travail + Dettes + Avances + TVA)',
                    data: dataChart.soldesRéserve,
                    borderColor: '#398eb6'
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    title: function(t, d) {
                        return (
                            t[0].xLabel +
                            ' ' +
                            d.datasets[t[0].datasetIndex].label +
                            ': ' +
                            t[0].value
                        )
                    },
                    label: t =>
                        'cumul : ' + dataChart.détails[t.index].join(' + ')
                }
            }
        }
    })
}

export default drawChart