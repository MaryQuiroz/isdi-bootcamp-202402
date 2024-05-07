export const calculateAge = (date) => {
    if (date) return new Date().getFullYear() - new Date(date).getFullYear()
}