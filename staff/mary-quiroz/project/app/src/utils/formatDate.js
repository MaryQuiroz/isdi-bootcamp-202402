export const formatDate = (dueDate) => {
    const options = { weekday: 'short', day: 'numeric', month: 'long' };
    const date = new Date(dueDate);
    const formattedDate = date.toLocaleDateString('en-EN', options);
    return formattedDate
}