import WriteHTML from './writeHTML.js'

function build(Écritures, moisEnCours) {
    const écritures = Écritures.data
        // * présentation des soldes par mois
    panelSoldesEstimé(écritures)

    panelFactures({
        panel: 'factures',
        type: 'en-cours',
        pièces: Écritures.facturesEnCours()
    })

    panelFacturesPrévues({
        panel: 'factures',
        type: 'prévues',
        pièces: Écritures.facturesPrévues()
    })

    panelSousTraitance({
        panel: 'factures',
        type: 'sous-traitance',
        pièces: Écritures.sousTraitance()
    })

    panelAvances({
        panel: 'avances',
        type: 'fixes',
        pièces: Écritures.avances()
    })

    panelDépenses({
        panel: 'dépenses',
        type: 'fixes',
        solde: Écritures.soldeSousCatégories(
            Écritures.dépensesFixes(moisEnCours)
        ),
        pièces: Écritures.dépensesFixes(moisEnCours)
    })

    function panelSoldesEstimé(écritures) {
        const solde = {
            banque: Écritures.solde(écritures, 'solde-bancaire'),
            dettes: -Écritures.solde(écritures, 'dettes'),
            avances: -Écritures.solde(écritures, 'avances'),
            TVA: calculTVA(
                Écritures.facturesRéglées().solde,
                Écritures.dépensesRéglées().solde
            ) - Écritures.solde(écritures, 'tva'),
            partTravail: -Écritures.solde(écritures, 'part-travail'),
            résultatEstimé: Écritures.solde(écritures, 'résultat'),
            partTravailIndividuelle: (Écritures.solde(écritures, 'résultat') * 75) / 100 / 4
        }

        solde.estimé =
            solde.banque - (solde.TVA + solde.partTravail + solde.dettes)

        WriteHTML.panelSoldesEstimé(solde)
    }

    function panelAvances({
        panel,
        type,
        pièces
    }) {
        WriteHTML.panelAvances(panel, type, pièces.écritures)
    }

    function panelFactures({
        panel,
        type,
        pièces
    }) {
        const soldes = {
            total: pièces.solde,
            TVA: pièces.solde * (1 / 6)
        }
        WriteHTML.panelFactures(panel, type, soldes, pièces.écritures)
    }

    function panelFacturesPrévues({
        panel,
        type,
        pièces
    }) {
        const écritures = pièces.écritures.sort((a, b) => a.prévue > b.prévue)
        WriteHTML.panelFacturesPrévues(panel, type, écritures)
    }

    function panelSousTraitance({
        panel,
        type,
        pièces
    }) {
        const écritures = pièces.écritures.sort((a, b) => a.prévue > b.prévue)
        WriteHTML.panelSousTraitance(panel, type, écritures)
    }

    function panelDépenses({
        panel,
        type,
        solde,
        pièces
    }) {
        WriteHTML.panelDépenses(panel, type, solde, pièces)
    }

    function calculTVA(facturesSolde, dépensesPostes) {
        return facturesSolde * (1 / 6) - dépensesPostes * (1 / 6)
    }
}

export default build