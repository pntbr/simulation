import Dates from './dates.js'

class Écritures {
    constructor(date) {
        // Define a range of one semester.
        this.jourStart = date
        this.jourEnd = date.add(6, 'month')
        this.data = []
    }
    async fetch(écrituresFilename) {
        return fetch(écrituresFilename)
            .then(response => response.text())
            .catch(error => {
                throw `écritures loading error: ${error}`
            })
            .then(response => {
                let écritures
                try {
                    écritures = jsyaml.safeLoad(response)
                } catch (error) {
                    throw `yaml to json error: ${error}`
                }
                this.data = this.avecDateEtChargesFixes(écritures)
            })
    }

    extractSortedISODates() {
        return [
            ...new Set(
                this.data
                .filter(
                    écriture => (!écriture.date.isBefore(this.jourStart) &&
                        !this.jourEnd.isBefore(écriture.date)
                    )
                )
                .map(écriture => écriture.date)
                .map(date => date.format('YYYY-MM-DD'))
            )
        ].sort()
    }

    dataChart() {
        const sortedDates = this.extractSortedISODates()
            // La première valeur est fausse, alors on ne la passe pas au graphe.
        return {
            dates: sortedDates.slice(1),
            soldes: this.soldesBancaire(sortedDates).map(écriture =>
                parseInt(écriture.solde)
            ).slice(1),
            détails: this.soldesBancaire(sortedDates).map(écriture =>
                Object.keys(écriture.détails).map(
                    catégorie =>
                    `${catégorie} : ${parseInt(
                            écriture.détails[catégorie]
                        )}`
                )
            ).slice(1),
            soldesRéserve: this.soldesRéserve(sortedDates).map(écriture =>
                parseInt(écriture.solde)
            ).slice(1)
        }
    }

    soldesRéserve(dates) {
        return dates.map(date =>
            this.soldeRéserve(Dates.futureDate(dayjs(date), this.jourStart))
        )
    }

    soldeRéserve(date) {
        const point = {
            détails: {}
        }
        point.solde = this.data
            .filter(écriture => {
                return (!écriture.date.isBefore(this.jourStart) &&
                    !date.isBefore(écriture.date)
                )
            })
            .reduce((acc, cur) => {
                switch (cur.catégorie) {
                    case 'divers':
                        if (cur.sousCatégorie === 'dettes') {
                            return acc - cur.montant
                        } else if (cur.sousCatégorie === 'part-travail') {
                            return acc - cur.montant
                        } else if (cur.sousCatégorie === 'tva') {
                            return acc - cur.montant
                        } else if (cur.sousCatégorie === 'avances') {
                            return acc - cur.montant
                        }
                        return acc
                    case 'dépenses':
                        if (
                            cur.sousCatégorie === 'sous-traitance' &&
                            cur.compte === 'dettes'
                        ) {
                            return acc + cur.montant
                        }
                        return acc
                    case 'factures':
                        if (cur.compte === 'dettes') {
                            return acc + cur.montant
                        }
                        return acc
                    default:
                        return acc
                }
            }, 0)

        return point
    }

    soldesBancaire(dates) {
        return dates.map(date =>
            this.soldeBancaire(Dates.futureDate(dayjs(date), this.jourStart))
        )
    }

    soldeBancaire(date) {
        const point = {
            détails: {}
        }
        point.solde = this.data
            .filter(écriture => {
                return (!écriture.date.isBefore(this.jourStart) &&
                    !date.isBefore(écriture.date)
                )
            })
            .reduce((acc, cur) => {
                switch (cur.catégorie) {
                    case 'factures':
                        if (cur.compte === 'dettes') {
                            return acc
                        }
                        point.détails.factures =
                            (point.détails.factures || 0) + cur.montant

                        return acc + cur.montant

                    case 'dépenses':
                        point.détails.dépenses =
                            (point.détails.dépenses || 0) + cur.montant

                        return acc + cur.montant

                    case 'chargesFixes':
                        point.détails.chargesFixes =
                            (point.détails.chargesFixes || 0) + cur.montant

                        return acc + cur.montant

                    case 'divers':
                        if (cur.sousCatégorie === 'solde-bancaire') {
                            return acc + cur.montant
                        }
                        return acc

                    default:
                        return acc
                }
            }, 0)

        return point
    }

    ajouteSolde(écritures) {
        return {
            solde: écritures.reduce((acc, cur) => acc + cur.montant, 0),
            écritures: écritures
        }
    }

    dépensesFixes(month) {
        return this.soldesDesSousCatégories(
            this.data.filter(
                écriture =>
                écriture.date.month() + 1 === month &&
                écriture.catégorie === 'chargesFixes'
            )
        )
    }

    dépensesRéglées() {
        return this.ajouteSolde(
            this.data.filter(
                écriture =>
                écriture.catégorie === 'dépenses' &&
                écriture.statut === 'réglée'
            )
        )
    }

    avances() {
        return this.ajouteSolde(
            this.data.filter(
                écriture =>
                écriture.catégorie === 'divers' &&
                écriture.sousCatégorie === 'avances'
            )
        )
    }

    facturesEnCours() {
        return this.ajouteSolde(
            this.data.filter(
                écriture =>
                écriture.catégorie === 'factures' &&
                écriture.sousCatégorie === 'dev' &&
                écriture.statut === 'émise'
            )
        )
    }

    facturesRéglées() {
        return this.ajouteSolde(
            this.data.filter(
                écriture =>
                écriture.catégorie === 'factures' &&
                écriture.sousCatégorie === 'dev' &&
                écriture.statut === 'réglée'
            )
        )
    }

    facturesPrévues() {
        return this.ajouteSolde(
            this.data.filter(
                écriture =>
                écriture.catégorie === 'factures' &&
                écriture.sousCatégorie === 'dev' &&
                écriture.prévue
            )
        )
    }

    sousTraitance() {
        return this.ajouteSolde(
            this.data.filter(
                écriture =>
                écriture.catégorie === 'dépenses' &&
                écriture.sousCatégorie === 'sous-traitance'
            )
        )
    }

    sousCatégories(écritures) {
        return Array.from(
            new Set(écritures.map(écriture => écriture.sousCatégorie))
        )
    }

    soldesDesSousCatégories(écritures) {
        const soldesDesSousCatégories = {}
        const sousCatégories = Array.from(
            new Set(écritures.map(écriture => écriture.sousCatégorie))
        )
        sousCatégories.forEach(
            sousCatégorie =>
            (soldesDesSousCatégories[sousCatégorie] = {
                solde: this.solde(écritures, sousCatégorie)
            })
        )

        return soldesDesSousCatégories
    }

    soldeSousCatégories(écritures) {
        return Object.keys(écritures).reduce(
            (acc, cur) => acc + écritures[cur].solde,
            0
        )
    }

    solde(écritures, sousCatégorie) {
        return écritures
            .filter(écriture => écriture.sousCatégorie === sousCatégorie)
            .reduce((acc, cur) => acc + cur.montant, 0)
    }

    avecDateEtChargesFixes(écritures) {
        return this.avecChargesFixes(
            this.avecDateEtStatut(this.avecCatégories(écritures))
        )
    }

    /**
     * Récupère une tableau avec les écritures
     * en intégrant la catégorie et le sous-catégorie
     *
     *
     * @param {écritures} object
     *  écritures récupérées du fichier Yaml.
     * @return array
     *  écritures intégrant la catégorie et la sous-catégorie
     */
    avecCatégories(écritures) {
        function addCatégories(écriture, catégorie, sousCatégorie) {
            const écritureAvecCatégories = écriture
            écritureAvecCatégories.catégorie = catégorie
            écritureAvecCatégories.sousCatégorie = sousCatégorie

            return écritureAvecCatégories
        }

        return Object.keys(écritures)
            .map(catégorie =>
                Object.keys(écritures[catégorie]).map(sousCatégorie =>
                    écritures[catégorie][sousCatégorie].map(écriture =>
                        addCatégories(écriture, catégorie, sousCatégorie)
                    )
                )
            )
            .flat()
            .reduce((acc, val) => acc.concat(val), [])
    }

    /**
     * Récupère une tableau avec les écritures
     * en intégrant la catégorie et le sous-catégorie
     *
     *
     * @param {écritures} object
     *  écritures récupérées du fichier Yaml.
     * @return array
     *  écritures intégrant la catégorie et la sous-catégorie
     */
    avecDateEtStatut(écritures) {
        return écritures.map(écriture => {
            écriture.description = `${écriture.projet} - ${écriture.montant}`
            if (écriture.prévue) {
                if (écriture.pièce) {
                    throw `Erreur: facture prévue avec pièce: ${écriture.description}`
                }
                écriture.date = Dates.futureDate(dayjs(écriture.prévue), this.jourStart)
                écriture.statut = 'prévue'
            }
            if (écriture.émise) {
                if (!écriture.pièce) {
                    throw `Erreur: facture émise sans pièce: ${écriture.description}`
                }
                écriture.date = Dates.futureDate(dayjs(écriture.émise), this.jourStart)
                écriture.statut = 'émise'
            }
            if (écriture['jour-de-prélèvement']) {
                const month = this.jourStart.month() + 1
                const year = this.jourStart.year()
                const isoDate = `${year}-${month}-${écriture['jour-de-prélèvement']}`
                écriture.date = Dates.futureDate(dayjs(isoDate), this.jourStart)
                écriture.statut = 'prélevée'
            }
            if (!écriture.date) {
                écriture.date = this.jourStart
                écriture.statut = 'autre'
            }

            return écriture
        })
    }

    /*
        Ajoute la TVA jusqu'au dernier mois
        (mois de l'écritures la plus dans le futur)
    */
    avecTVA(écritures) {
        const écrituresTVA = écritures
        const lastMonth =
            écritures.reduce(
                (acc, cur) =>
                acc < cur.date.month() ? cur.date.month() : acc,
                0
            ) + 1

        return écrituresTVA
    }

    /*
        Ajoute les charges fixes jusqu'au dernier mois
        (mois de l'écritures la plus dans le futur)
    */
    avecChargesFixes(écritures) {
        const chargesFixes = écritures.filter(
            écriture => écriture.catégorie === 'chargesFixes'
        )
        const nextMonth = this.jourStart.add(1, 'month')
        const annéeMoisÀCharger = Dates.prochainSemestre(nextMonth, this.jourEnd)

        annéeMoisÀCharger.forEach(([année, mois]) => {
            chargesFixes.forEach(écriture => {
                const écrituresToAdd = JSON.parse(JSON.stringify(écriture))
                const isoDate = `${année}-${mois}-${écriture['jour-de-prélèvement']}`
                écrituresToAdd.date = Dates.futureDate(dayjs(isoDate), this.jourStart)
                écritures.push(écrituresToAdd)
            })
        })

        return écritures
    }
}

export default Écritures