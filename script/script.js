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
                cellContent = '<div class="circle"></div>';
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

// // Beispielaufruf der Funktion
// document.addEventListener('DOMContentLoaded', () => {
//     renderPlayingField();
// });