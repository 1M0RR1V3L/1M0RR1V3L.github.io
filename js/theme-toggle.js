/* eslint-env browser */
/* global document, window, localStorage */
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
            case 'system': {
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                document.body.classList.remove("system");
                document.body.classList.add(systemTheme);
                currentThemeIcon.src = "img/system.svg";
                break;
            }
        }
    }

    function toggleDropdown(show) {
        if (show) {
            themeDropdown.classList.add('show');
        } else {
            themeDropdown.classList.remove('show');
        }
    }

    themeTrigger.addEventListener("click", function (e) {
        e.stopPropagation();
        const isVisible = themeDropdown.classList.contains('show');
        toggleDropdown(!isVisible);
    });

    dropdownItems.forEach(item => {
        item.addEventListener("click", function () {
            const theme = this.getAttribute("data-theme");
            applyTheme(theme);
            toggleDropdown(false);
        });
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme("system");
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "system") {
            applyTheme("system");
        }
    });

    window.addEventListener("click", function (event) {
        if (!event.target.closest('.theme-switcher')) {
            toggleDropdown(false);
        }
    });
});
