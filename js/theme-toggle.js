document.addEventListener("DOMContentLoaded", function () {
    const themeTrigger = document.getElementById("theme-trigger");
    const themeDropdown = document.getElementById("theme-dropdown");
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    const currentThemeIcon = document.getElementById("current-theme-icon");

    function applyTheme(theme) {
        document.body.classList.remove("light", "dark", "system");
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);

        switch (theme) {
            case 'light':
                currentThemeIcon.src = "img/sun.svg";
                break;
            case 'dark':
                currentThemeIcon.src = "img/moon.svg";
                break;
            case 'system':
                // Verificar a preferência de cores do sistema
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                document.body.classList.add(systemTheme);
                currentThemeIcon.src = "img/system.svg";
                break;
        }
    }

    themeTrigger.addEventListener("click", function () {
        if (themeDropdown.style.display === "block") {
            themeDropdown.style.opacity = "0";
            themeDropdown.style.transform = "translateY(-10px)";
            setTimeout(() => {
                themeDropdown.style.display = "none";
            }, 300);
        } else {
            themeDropdown.style.display = "block";
            setTimeout(() => {
                themeDropdown.style.opacity = "1";
                themeDropdown.style.transform = "translateY(0)";
            }, 10);
        }
    });

    dropdownItems.forEach(item => {
        item.addEventListener("click", function () {
            const theme = this.getAttribute("data-theme");
            applyTheme(theme);
            themeDropdown.style.opacity = "0";
            themeDropdown.style.transform = "translateY(-10px)";
            setTimeout(() => {
                themeDropdown.style.display = "none";
            }, 300);
        });
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme("system");
    }

    // Atualizar tema automaticamente se o usuário mudar as preferências do sistema
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
        if (document.body.classList.contains("system")) {
            applyTheme("system");
        }
    });

    window.addEventListener("click", function (event) {
        if (!event.target.closest('.theme-switcher')) {
            themeDropdown.style.opacity = "0";
            themeDropdown.style.transform = "translateY(-10px)";
            setTimeout(() => {
                themeDropdown.style.display = "none";
            }, 300);
        }
    });
});
