export const validateEmail = email =>/[^@]+@[^.]+\..+/.test(email) ? false : 'This is not a valid email';

export const validateRequired = field => field && field !== '' ? false : 'Field is required';

export const validateAll = obj => {
    for (const field in obj) {
        if (obj.hasOwnProperty(field) && (!obj[field] || obj[field] === '')) {
            return false;
        }
    }
    return true;
};
