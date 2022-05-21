function futureDate(isoDate, dateDuJour) {
    let date = isoDate
    if (date.isBefore(dateDuJour)) {
        date = date.add(1, 'year')
    }
    return date
}

function prochainSemestre(jourStart, jourEnd) {
    const annéeMois = []
    let currentDate = jourStart

    while (currentDate.isBefore(jourEnd) && annéeMois.length < 6) {
        annéeMois.push([currentDate.year(), currentDate.month() + 1])
        currentDate = currentDate.add(1, 'month')
    }
    return annéeMois
}

export default {
    futureDate,
    prochainSemestre,
}
