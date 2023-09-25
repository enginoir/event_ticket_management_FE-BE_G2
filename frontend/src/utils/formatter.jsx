export const dateFormat = (date) => {
    let newDate = new Date(date).toLocaleDateString('en-GB', {day:"numeric",month:"short",year:"2-digit"})
    return newDate
}

export const currencyFormat = (value) => {
    return `IDR ${value.toLocaleString('id-ID')}`
}