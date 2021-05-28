const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const fullDate = date => {
    const year = date.substring(0, 4)
    const month = parseInt(date.substring(5, 7))
    const day = date.substring(8, 10)
    return `${months[month-1]} ${day}, ${year}`
}