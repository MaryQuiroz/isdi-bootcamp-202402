import getFormattedDate from "./getFomattedDate.ts";

const addConcurrency = (dueDate: Date, concurrency: string): string => {
   

    switch (concurrency.toLowerCase()) {
        case 'daily':
            dueDate.setDate(dueDate.getDate() + 1);
            break;
        case 'weekly':
            dueDate.setDate(dueDate.getDate() + 7);
            break;
        case 'monthly':
            dueDate.setMonth(dueDate.getMonth() + 1);
            break;
        case 'yearly':
            dueDate.setFullYear(dueDate.getFullYear() + 1);
            break;
        default:
            break
    }

    return getFormattedDate(dueDate)
}

export default addConcurrency
