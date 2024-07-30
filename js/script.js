// Aplly theme
function applyTheme(theme) {
    document.body.classList.remove('light', 'dark', 'system');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme); // Salva o tema selecionado no localStorage
}

// detect selector color
document.getElementById('theme-select').addEventListener('change', function() {
    applyTheme(this.value);
});

// verify the item for save in local storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    // if the theme was not selected use the dark theme
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(systemTheme);
}
