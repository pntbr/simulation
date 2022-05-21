# pourquoi simulation ?

Pour voir où la trésorerie de scopyleft nous amène

Le solde bancaire ne reflète pas notre situation réelle, simulation permet de se rendre compte de notre situation à jour et pour les mois à venir

## notice pour lire les tableaux

### conventions

- les prix sont exprimés en euros et Toutes Taxes Comprises

### charges fixes

Le tableau regroupe les charges mensuelles
Les charges annuelles on été ramenées au mois

### les factures

Liste des factures que scopyleft adressent aux partenaires (clients)

#### en cours

les factures éditées et non-réglées

#### à venir

les factures que nous allons éditer bientôt

#### probables

les factures que nous prophétisons

#### anciennes

les vieilles factures à relancer

#### réglées

les factures récemment réglées, la TVA n'a pas encore été reversée à l'état

## comment actualiser les écritures

à documenter

### grammaire des fichiers yaml

à documenter

### glossaire

- **écriture** : transcription d'un flux financier pour un compte
- **compte** : un compte représente le destinataire d'un flux financier - par exemple un fournisseur, un client, un salarié
- **poste** : un poste est un regroupement de comptes - par exemple, le compte -salaires- regroupe les écritures de salaires des quatre salariés
- **charges fixes** : dépenses mensuelles récurentes qui définissent le seuil de rentabilité
- **solde** : le solde des comptes représentent le total des montants
- **pièces** : justificatif comptable : facture client ou facture dépense

## outils utilisés pour le projet

- https://github.com/redhat-developer/yaml-language-server
- https://prettier.io

## remerciements

- @thimy https://github.com/etalab/template.data.gouv.fr
- @davidbruant https://github.com/davidbruant/bouture

## Installation en local

```bash
$ npm install --only=prod
$ ln -s node_modules modules
$ python3 -m http.server 8000 --bind 127.0.0.1
```

Puis : http://127.0.0.1:8000

## développement

```bash
$ npm install
$ http-server
```

Puis : http://127.0.0.1:8080

Le _port 8080_ est identifié comme environnement de test
Les _[fixtures](https://github.com/pntbr/simulation/blob/master/test/%C3%A9critures-fixtures.yml)_ (données de test) sont chargées à la place des [écritures réelles](https://github.com/pntbr/simulation/blob/master/%C3%A9critures.yml)

## les tests

```bash
$ npm run test
```