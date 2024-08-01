// Recolher cards
document.addEventListener("DOMContentLoaded", function () {
    const expandToggle = document.getElementById('expand-toggle');
    const expandCardTitle = document.querySelector('.expand-card-title');

    expandCardTitle.addEventListener('click', function() {
        expandToggle.checked = !expandToggle.checked;
    });
});

