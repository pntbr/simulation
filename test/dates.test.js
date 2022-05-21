import { expect } from 'chai/chai'
import dayjs from 'dayjs/dayjs.min'

import Dates from '../js/dates.js'

describe('tests unitaires : date.js', () => {
    const dateDuJour = dayjs()
    describe('futureDate', () => {
        it('renvoie la date courante', () => {
            const date = dayjs()
            expect(Dates.futureDate(date, dateDuJour).toString()).to.equal(
                date.toString()
            )
        })
        it('renvoie la date si elle est dans le futur', () => {
            const date = dayjs().add(1, 'month')
            expect(Dates.futureDate(date, dateDuJour).toString()).to.equal(
                date.toString()
            )
        })
        it('renvoie la date + un an si elle est dans le passé', () => {
            const date = dayjs().subtract(1, 'month')
            expect(Dates.futureDate(date, dateDuJour).toString()).to.not.equal(
                date.toString()
            )
            expect(Dates.futureDate(date, dateDuJour).year()).to.equal(
                date.year() + 1
            )
        })
    })
    describe('prochainSemestre', () => {
        it('vérifie que l’on a les 6 prochains mois', () => {
            const startDate = dayjs(new Date(2020, 11 - 1, 1))
            const endDate = dayjs(new Date(2021, 4, 30))
            expect(Dates.prochainSemestre(startDate, endDate)).to.deep.equal([
                [2020, 11],
                [2020, 12],
                [2021, 1],
                [2021, 2],
                [2021, 3],
                [2021, 4],
            ])
        })
    })
})
