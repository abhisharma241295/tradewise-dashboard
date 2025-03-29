export const formatWeddingDate = (weddingDate: string | Date | undefined) => {
    if (!weddingDate) return '';

    let dateObject;
    if (typeof weddingDate === 'string') {
        // const [day, month, year] = weddingDate.split('.');
        dateObject = new Date(weddingDate);
    } else {
        dateObject = weddingDate;
    }
    console.log('dateObject', dateObject)
    if (isNaN(dateObject.getTime())) return '';

    return dateObject.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
};

export const getWeekday = (weddingDate: string | Date | undefined): string => {
    if (!weddingDate) return '';
    let dateObject;
    if (typeof weddingDate === 'string') {
        // const [day, month, year] = weddingDate.split('.');
        dateObject = new Date(weddingDate);
    } else {
        dateObject = weddingDate;
    }
    return dateObject.toLocaleDateString('en-US', {
        weekday: 'long'
    });
};
export const getInitials = (name: string): string => {
    if (!name) return '';

    return name
        .trim()
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export const getDateOrMonthOrYear = (weddingDate: string | Date | undefined, returnValue: string): string => {
    if (!weddingDate) return '';

    let dateObject: Date;

    if (typeof weddingDate === 'string') {
        dateObject = new Date(weddingDate);
    } else {
        dateObject = weddingDate;
    }

    switch (returnValue) {
        case 'day':
            return dateObject.getDate().toString().padStart(2, '0');
        case 'month':
            return (dateObject.getMonth() + 1).toString().padStart(2, '0');
        case 'year':
            return dateObject.getFullYear().toString().slice(-2);
        default:
            return '';
    }
};
