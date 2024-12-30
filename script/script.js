let fields = [
    null,
    null,
    null,
    null,
    'cross',
    null,
    null,
    'circle',
    null,
]

function init(){
    renderPlayingField()
}

function generateSVGCircle() {
    return `
        <svg viewBox="0 0 70 70">
        <circle class="circle" cx="35" cy="35" r="30"></circle>
    </svg>
    `;
}


function renderPlayingField() {
    const contentDiv = document.getElementById('content');
    let tableHTML = '<table class="playing-field">';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const fieldValue = fields[index];
            let cellContent = '';

            if (fieldValue === 'circle') {
                cellContent = generateSVGCircle();
            } else if (fieldValue === 'cross') {
                cellContent = '<div class="cross"></div>';
            }

            tableHTML += `<td onclick="handleCellClick(${index})">${cellContent}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
}


function handleCellClick(index) {
    if (!fields[index]) {
        fields[index] = 'circle'; // Setze hier 'circle' oder 'cross' je nach Spieler
        renderPlayingField();
    }
}


// // Beispielaufruf der Funktion
// document.addEventListener('DOMContentLoaded', () => {
//     renderPlayingField();
// });