const BdCFilename = './BdCs/ma-cantine.yml'
let écrituresFilename = './écritures.yml'
let dateDuJour = dayjs()
    // environnement de test
if (document.location.port === '8080') {
    écrituresFilename = './test/écritures-fixtures.yml'
    dateDuJour = dayjs(new Date(2019, 8, 9))
}

export {
    BdCFilename,
    écrituresFilename,
    dateDuJour
}