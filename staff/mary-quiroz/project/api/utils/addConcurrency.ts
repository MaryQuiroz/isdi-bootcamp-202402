import getFormattedDate from "./getFomattedDate";

const addConcurrency = (dueDate: Date, concurrency: string): string => {
    let finalDate = new Date(dueDate)

    switch (concurrency.toLowerCase()) {
        case 'daily':
            finalDate.setDate(finalDate.getDate() + 1);
            break;
        case 'weekly':
            finalDate.setDate(finalDate.getDate() + 7);
            break;
        case 'monthly':
            finalDate.setMonth(finalDate.getMonth() + 1);
            break;
        case 'yearly':
            finalDate.setFullYear(finalDate.getFullYear() + 1);
            break;
        default:
            break
    }

    return getFormattedDate(finalDate)
}

export default addConcurrency
