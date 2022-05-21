import puppeteer from 'puppeteer'
import { expect } from 'chai/chai'

let browser
let page

before(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
})

describe('tests fonctionnels', () => {
    it('doit retourner -success- pour la page accueil', async () => {
        await page.goto('http://127.0.0.1:8080')
    }).timeout(25000)

    describe('Solde estimée', () => {
        it('doit retourner le solde estimés', async () => {
            const soldeEstimé = await page.$eval(
                '[name=solde-estimé]',
                text => text.textContent
            )
            expect(soldeEstimé).to.equal('solde : 29432')
        })

        it('doit retourner le solde du dettes', async () => {
            const soldeDettes = await page.$eval(
                '[name=solde-dettes]',
                text => text.textContent
            )
            expect(soldeDettes).to.equal('-60214')
        })

        it('doit retourner le solde de la TVA', async () => {
            const soldeTVA = await page.$eval(
                '[name=solde-tva]',
                text => text.textContent
            )
            expect(soldeTVA).to.equal('-14014')
        })

        it('doit retourner le solde de la part-travail', async () => {
            const soldePartTravail = await page.$eval(
                '[name=solde-part-travail]',
                text => text.textContent
            )
            expect(soldePartTravail).to.equal('-8189')
        })
    })

    describe('Factures', () => {
        it('doit retourner le solde des factures en-cours', async () => {
            const facturesEnCoursTotal = await page.$eval(
                '[name=factures-en-cours-solde]',
                text => text.textContent
            )
            expect(facturesEnCoursTotal).to.equal('solde : 15900')
        })
    })

    describe('Charges fixes', () => {
        it('doit retourner le nombre de charges fixes présentes', async () => {
            const chargesFixes = await page.$eval(
                '[name=dépenses-fixes-liste] > tbody',
                liste => liste.childElementCount
            )
            expect(chargesFixes).to.equal(7)
        })

        it('doit retourner le solde des charges', async () => {
            const chargesFixesTotal = await page.$eval(
                '[name=dépenses-fixes-solde]',
                text => text.textContent
            )
            expect(chargesFixesTotal).to.equal('solde par mois : -25245')
        })

        it('vérifie la première facture en-cours', async () => {
            const numeroPièce = await page.$eval(
                '[name=factures-en-cours-liste] > tbody > tr > td',
                text => text.textContent
            )
            expect(numeroPièce).to.equal('180')
        })
    })
})

after(async () => {
    await browser.close()
})
