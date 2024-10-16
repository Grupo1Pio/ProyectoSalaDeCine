
document.querySelectorAll('.seat').forEach(div => {
    div.addEventListener('click', (event) => {
        // Elimina la clase 'selected' de cualquier div previamente seleccionado
        const previouslySelected = document.querySelector('.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }
        
        // Agrega la clase 'selected' al div que se hizo clic
        event.target.classList.add('selected');
    });
});