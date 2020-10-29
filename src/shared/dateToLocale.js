export default function dateToLocale(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const newDate = new Date(dateString)
    return newDate.toLocaleDateString('de-DE', options)
}
