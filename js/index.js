import {
    dateDuJour,
    écrituresFilename,
    BdCFilename
} from './environnements.js'
import écritures from './écritures.js'
import buildPanel from './panel.js'
import drawChart from './chart.js'
import BdC from './bdc.js'

const Écritures = new écritures(dateDuJour)
const BdCÉcritures = new BdC()

BdCÉcritures.fetch(BdCFilename).then(() => {
    fs.readdir('./BdCs', (err, files) => {
        files.forEach(file => {
            console.log(file);
        })
    });
    console.log("BDC", BdCÉcritures.data)

})



Écritures.fetch(écrituresFilename).then(() => {
    buildPanel(Écritures, dateDuJour.month() + 1)
    drawChart(Écritures, dateDuJour)
})