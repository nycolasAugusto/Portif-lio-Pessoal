
function filterProjects(category, buttonElement) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    if(buttons.length > 0) {
        buttons.forEach(btn => btn.classList.remove('active'));
        buttonElement.classList.add('active');
    }

    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}


