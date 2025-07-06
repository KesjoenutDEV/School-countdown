// Bereken de target datum (volgende woensdag over 2 weken om 12:00)
function calculateTargetDate() {
    const now = new Date();
    let target = new Date(now);
    
    // Ga naar volgende woensdag over 2 weken
    target.setDate(now.getDate() + ((2 * 7) + (3 + 7 - now.getDay()) % 7));
    target.setHours(12, 0, 0, 0); // 12:00 's middags
    
    return target;
}

// Controleer of we in een actief schooltijdvenster zitten
function isSchoolTime(now) {
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMins = hours * 60 + minutes;

    // Weekend? Niet actief
    if (day === 0 || day === 6) return false;

    // Maandag t/m vrijdag
    return (totalMins >= 8.5 * 60 && totalMins <= 14.75 * 60); // 8:30-14:45
}

// Formatteer tijd als DD:HH:MM:SS.ms
function formatTime(diff) {
    if (diff <= 0) return "00:00:00:00.00";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const ms = Math.floor((diff % 1000) / 10);

    return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

// Hoofd update functie
function updateClocks() {
    const now = new Date();
    const target = calculateTargetDate();
    const diff = target - now;

    // Update totale tijd clock
    document.getElementById('totalClock').innerHTML = 
        formatTime(diff).replace('.', '<span class="milliseconds">.') + '</span>';

    // Update schooltijd clock
    if (isSchoolTime(now)) {
        document.getElementById('schoolClock').innerHTML = 
            formatTime(diff).replace('.', '<span class="milliseconds">.') + '</span>';
    } else {
        document.getElementById('schoolClock').innerHTML = 
            "--:--:--:--<span class=\"milliseconds\">.--</span>";
    }

    // Herhaal elke 10ms voor vloeiende milliseconde weergave
    setTimeout(updateClocks, 10);
}

// Start de clocks
updateClocks();
