function onClickTheme(theme) {
    if (theme === 'dark') {
        document.body.className = 'dark-theme';
        localStorage.setItem('theme', 'dark-theme');
    } else {
        document.body.className = ''; 
        localStorage.setItem('theme', ''); 
    }
    toggleDropdown();
}

window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }
};
