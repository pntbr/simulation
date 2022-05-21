import fs from 'fs'
import { promisify } from 'util'
import jsyaml from 'js-yaml'
import { expect } from 'chai/chai'
import dayjs from 'dayjs/dayjs.min'
import Écritures from '../js/écritures.js'

const readFileAsync = promisify(fs.readFile)
const écrituresfileName = './test/écritures-fixtures.yml'

describe('tests unitaires : écritures.js', () => {
    const dateDuJour = dayjs('2019-08-09')
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
            expect(écrituresFormatées).to.have.lengthOf(185)
        })

        it('les écritures ont une propriété date', () => {
            const écrituresFormatées = fixtures.avecDateEtChargesFixes(
                écritures
            )
            expect(
                écrituresFormatées.filter(écriture => écriture.date)
            ).to.have.lengthOf(185)
        })

        it('les écritures ont une propriété statut', () => {
            const écrituresFormatées = fixtures.avecDateEtChargesFixes(
                écritures
            )
            expect(
                écrituresFormatées.filter(écriture => écriture.statut)
            ).to.have.lengthOf(185)
        })

        it('des écritures charges fixes ont étés ajoutées sur le mois suivant', () => {
            const écrituresFormatées = fixtures.avecDateEtChargesFixes(
                écritures
            )
            expect(
                écrituresFormatées
                    .filter(
                        écriture =>
                            écriture.date.month() + 1 ===
                            dateDuJour.month() + 2
                    )
                    .filter(écriture => écriture.catégorie === 'chargesFixes')
            ).to.have.lengthOf(25)
        })
    })

    describe('tests des méthodes : écritures.js', () => {
        before(() => {
            fixtures.data = fixtures.avecDateEtChargesFixes(écritures)
        })

        it('soldeBancaire()', () => {})

        it("ajouteSolde() : regarde le solde d'une collection d'écritures", () => {
            expect(
                fixtures.ajouteSolde(
                    fixtures.data.filter(
                        écriture => écriture.catégorie === 'dépenses'
                    )
                ).solde
            ).to.be.closeTo(-204593, 1)
        })

        it("ajouteSolde() : vérifie le nombre d'écritures", () => {
            expect(
                fixtures.ajouteSolde(
                    fixtures.data.filter(
                        écriture => écriture.catégorie === 'chargesFixes'
                    )
                ).écritures
            ).to.have.lengthOf(150)
        })
    })
})
