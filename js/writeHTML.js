import Bouture from '../node_modules/bouture/bouture.js'

import Dates from './dates.js'

function $name(name) {
    const html = document.querySelector(`[name=${name}]`)
    if (html) {
        return html
    } else {
        throw `le selecteur [name=${name}] ne retourne rien`
    }
}

const Write = {
    _solde: (selector, montant) => $name(selector).append(Math.round(montant)),

    _listePostes: (selector, postes) => {
        const thCollection = $name(selector).querySelector('thead > tr')
            .children
        const libellés = Array.from(thCollection).map(th => th.textContent)
        $name(selector).append(
            Bouture.tbody(
                Object.keys(postes).map(poste =>
                    Bouture.tr([
                        Bouture.td(poste),
                        Bouture.td(Math.round(postes[poste].solde))
                    ])
                )
            ).getElement()
        )
    },

    _listeÉcritures: (selector, éléments) => {
        const thCollection = $name(selector).querySelector('thead > tr')
            .children
        const libellés = Array.from(thCollection).map(th => th.textContent)
        $name(selector).append(
            Bouture.tbody(
                éléments.map(élément =>
                    Bouture.tr(
                        libellés.map(libellé => {
                            const value = élément[libellé]
                            if (libellé === 'montant') {
                                return Bouture.td(Math.round(value))
                            } else {
                                if (value instanceof Date) {
                                    return Bouture.td(dayjs(value).format('YYYY-MM-DD'))
                                } else {
                                    return Bouture.td(value)
                                }
                            }
                        })
                    )
                )
            ).getElement()
        )
    },
    panelSoldesEstimé: solde => {
        Write._solde('solde-estimé', solde.estimé)
        Write._solde('solde-banque', solde.banque)
        Write._solde('solde-dettes', -solde.dettes)
        Write._solde('solde-avances', -solde.avances)
        Write._solde('solde-tva', -solde.TVA)
        Write._solde('solde-part-travail', -solde.partTravail)
    },

    panelFactures: (panel, type, solde, écritures) => {
        Write._solde(`${panel}-${type}-solde`, solde.total)
        Write._solde(`${panel}-${type}-tva`, -solde.TVA)
        Write._listeÉcritures(`${panel}-${type}-liste`, écritures)
    },

    panelFacturesPrévues: (panel, type, écritures) => {
        Write._listeÉcritures(`${panel}-${type}-liste`, écritures)
    },

    panelSousTraitance: (panel, type, écritures) => {
        Write._listeÉcritures(`${panel}-${type}-liste`, écritures)
    },

    panelAvances: (panel, type, écritures) => {
        Write._listeÉcritures(`${panel}-${type}-liste`, écritures)
    },

    panelDépenses: (panel, type, solde, postes) => {
        Write._solde(`${panel}-${type}-solde`, solde)
        Write._listePostes(`${panel}-${type}-liste`, postes)
    }
}

export default Write