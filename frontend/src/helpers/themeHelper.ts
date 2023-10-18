export const isDarkTheme = (): boolean => {
    const theme = localStorage.getItem('theme');
    return theme === 'dark' ? true : false;
};


export const setTheme = (theme: string) => {
    localStorage.setItem('theme', theme);
    changeTheme();
}

export const changeTheme = () => {
    if(!localStorage.getItem('theme') || localStorage.getItem('theme') == undefined){
        localStorage.setItem('theme', 'dark');
    } 
    document.documentElement.setAttribute('data-bs-theme', isDarkTheme() ?'dark' : 'light');
}