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

let currentPlayer = 'circle'; // Start mit "circle"

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


function generateSVGCross() {
    
        const color = '#FFC000';
    
        const width = 70;
    
        const height = 70;
    
    


        const svgHtml = `

          <svg width="${width}" height="${height}">

            <line x1="0" y1="0" x2="${width}" y2="${height}"

              stroke="${color}" stroke-width="5">

              <animate attributeName="x2" values="0; ${width}" dur="200ms" />

              <animate attributeName="y2" values="0; ${height}" dur="200ms" />

            </line>

            <line x1="${width}" y1="0" x2="0" y2="${height}"

              stroke="${color}" stroke-width="5">

              <animate attributeName="x2" values="${width}; 0" dur="200ms" />

              <animate attributeName="y2" values="0; ${height}" dur="200ms" />

            </line>

          </svg>

        `;
return svgHtml;
}


// Spielfeld rendern
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
    cellContent = generateSVGCross();
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
    // Aktualisiere das Array mit dem aktuellen Spieler
    fields[index] = currentPlayer;
        
    // Füge das entsprechende SVG direkt in das <td> ein
    const cell = document.querySelectorAll('td')[index];
    cell.innerHTML = currentPlayer === 'circle' ? generateSVGCircle() : generateSVGCross();
        
    // Entferne das onclick-Attribut
    cell.removeAttribute('onclick');
        
    // Wechsle den Spieler
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
} 
}


// // Beispielaufruf der Funktion
// document.addEventListener('DOMContentLoaded', () => {
//     renderPlayingField();
// });