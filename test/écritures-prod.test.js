import fs from 'fs'
import { promisify } from 'util'
import jsyaml from 'js-yaml'
import { expect } from 'chai/chai'
import dayjs from 'dayjs/dayjs.min'
import Écritures from '../js/écritures.js'

const readFileAsync = promisify(fs.readFile)
const écrituresfileName = './écritures.yml'

describe('tests unitaires : écritures.js (prod)', () => {
    const dateDuJour = dayjs(new Date())
    const fixtures = new Écritures(dateDuJour)
    let écritures = []

    before(() => {
        global.dayjs = dayjs
        return readFileAsync(écrituresfileName)
            .then(content => {
                écritures = jsyaml.safeLoad(String(content))
            })
            .catch(err => {
                console.log('écritures loading error:', err)
            })
    })

    describe('Formatage des écritures : avecDateEtChargesFixes()', () => {
        it("doit récupérer un tableau d'élément", () => {
            const écrituresFormatées = fixtures.avecDateEtChargesFixes(
                écritures
            )
            const length = écrituresFormatées.length
            expect(length).to.be.at.least(150)
        })
    })

})
