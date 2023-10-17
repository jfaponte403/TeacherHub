export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const udistritalEmailRegex = /^[^\s@]+@udistrital\.edu\.co$/;
    return emailRegex.test(email) && udistritalEmailRegex.test(email);
};