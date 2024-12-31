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
];

let currentPlayer = 'circle'; // Start mit "circle"

function init() {
    renderPlayingField();
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

    return `
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
        // Setze das aktuelle Feld
        fields[index] = currentPlayer;

        // Zeichne den aktuellen Spieler in die Zelle
        const cell = document.querySelectorAll('td')[index];
        cell.innerHTML = currentPlayer === 'circle' ? generateSVGCircle() : generateSVGCross();
        cell.removeAttribute('onclick');

        // Überprüfe nach einem kurzen Timeout, ob jemand gewonnen hat
        setTimeout(() => {
            const winner = checkWinner();
if (winner) {
    drawWinningLine(winner.line);
    setTimeout(() => {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = `${winner.player} hat gewonnen!`; // Nachricht einfügen
        messageDiv.classList.remove('hidden'); // Sichtbar machen
        document.getElementById('restart').classList.remove('hidden'); // Restart-Button sichtbar machen
    }, 1200); // Zeit für das Zeichnen der Linie
            } else {
                // Wechsle zum nächsten Spieler, wenn kein Gewinner
                currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
            }
        }, 800); // Warte, bis die Zelle gezeichnet ist
    }
}


// Gewinnkombinationen
const winningCombinations = [
    [0, 1, 2], // Zeile oben
    [3, 4, 5], // Zeile Mitte
    [6, 7, 8], // Zeile unten
    [0, 3, 6], // Spalte links
    [1, 4, 7], // Spalte Mitte
    [2, 5, 8], // Spalte rechts
    [0, 4, 8], // Diagonale von oben links
    [2, 4, 6], // Diagonale von oben rechts
];

// Funktion zur Gewinnprüfung
function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return { player: fields[a], line: combination };
        }
    }
    return null; // Kein Gewinner
}

// Funktion, um die Sieg-Linie zu zeichnen
function drawWinningLine(line) {
    const table = document.querySelector('.playing-field');
    const cells = document.querySelectorAll('td');
    const positions = line.map(index => cells[index].getBoundingClientRect());

    const startX = positions[0].left + positions[0].width / 2;
    const startY = positions[0].top + positions[0].height / 2;
    const endX = positions[2].left + positions[2].width / 2;
    const endY = positions[2].top + positions[2].height / 2;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';

    const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineElement.setAttribute('x1', startX);
    lineElement.setAttribute('y1', startY);
    lineElement.setAttribute('x2', endX);
    lineElement.setAttribute('y2', endY);
    lineElement.setAttribute('stroke', 'white');
    lineElement.setAttribute('stroke-width', '5');
    svg.appendChild(lineElement);

    document.body.appendChild(svg);
}

function restartGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];
     // Entferne alle SVG-Linien
     const svgElements = document.querySelectorAll('body > svg');
     svgElements.forEach(svg => svg.remove());

    renderPlayingField();
    document.getElementById('restart').classList.add('hidden'); // Klasse "hidden" hinzufügen
}
