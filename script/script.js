let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]

function init(){
    renderPlayingField()
}

// Funktion zum Rendern des Spielfelds
function renderPlayingField() {
    // Referenz auf den DIV-Container mit der id="content"
    const contentDiv = document.getElementById('content');

    // HTML-Code für die Tabelle erstellen
    let tableHTML = '<table class="playing-field">';

    for (let row = 0; row < 3; row++) {
        tableHTML += '<tr>';
        for (let col = 0; col < 3; col++) {
            // Berechnung des Index im Array "fields"
            const index = row * 3 + col;

            // Inhalt basierend auf dem Zustand des Arrays
            const cellContent = fields[index] === 'O' ? 'O' : (fields[index] === 'X' ? 'X' : '');

            // HTML für die Zelle hinzufügen
            tableHTML += `<td>${cellContent}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';

    // Tabelle in den Container rendern
    contentDiv.innerHTML = tableHTML;
}

// // Beispielaufruf der Funktion
// document.addEventListener('DOMContentLoaded', () => {
//     renderPlayingField();
// });