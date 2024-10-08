export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}


export const toBoolean = (str: string) => {

    return str.toLowerCase() === 'true'
}