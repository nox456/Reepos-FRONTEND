export default function timeago(timestamp) {
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    let diff
    if (year > timestamp.year) {
        diff = year - timestamp.year
        return `Hace ${diff} ${diff > 1 ? "años" : "año"}`
    } else if (month > timestamp.month) {
        diff = month - timestamp.month
        return `Hace ${diff} ${diff > 1 ? "meses" : "mes"}`
    } else if (day > timestamp.day) {
        diff = day - timestamp.day
        return `Hace ${diff} ${diff > 1 ? "días" : "día"}`
    } else if (day == timestamp.day) {
        return "Hoy"
    }
}
