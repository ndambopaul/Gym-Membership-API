function calculateEndDate(subscriptionType, startDate) {
    const currentDate = new Date(startDate);

    switch (subscriptionType) {
        case 'daily':
            return new Date(currentDate.getTime() + (24 * 60 * 60 * 1000)); // 24 hours
        case 'weekly':
            return new Date(currentDate.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
        case 'monthly':
            const nextMonthDate = new Date(currentDate);
            nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
            return nextMonthDate;
        case 'quarterly':
            const nextQuarterDate = new Date(currentDate);
            nextQuarterDate.setMonth(nextQuarterDate.getMonth() + 3);
            return nextQuarterDate;
        case 'semi-annually':
            const nextSemiAnnualDate = new Date(currentDate);
            nextSemiAnnualDate.setMonth(nextSemiAnnualDate.getMonth() + 6);
            return nextSemiAnnualDate;
        case 'yearly':
            const nextYearDate = new Date(currentDate);
            nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
            return nextYearDate;
        default:
            throw new Error('Invalid subscription type');
    }
}


module.exports = {
    calculateEndDate
}
