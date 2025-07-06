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

// Update de klokken
function updateClocks() {
    const now = new Date();
    const target = calculateTargetDate();
    const diff = target - now;

    // Bereken alle tijdseenheden
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update totale tijd
    document.getElementById('totalDays').textContent = days.toString().padStart(2, '0');
    document.getElementById('totalHours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('totalMinutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('totalSeconds').textContent = seconds.toString().padStart(2, '0');

    // Update schooltijd (altijd zichtbaar)
    document.getElementById('schoolDays').textContent = days.toString().padStart(2, '0');
    document.getElementById('schoolHours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('schoolMinutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('schoolSeconds').textContent = seconds.toString().padStart(2, '0');

    // Update status schooltijd
    const schoolActive = isSchoolTime(now);
    const statusElement = document.getElementById('schoolStatus');
    statusElement.textContent = schoolActive ? "Schooltijd actief" : "Schooltijd niet actief";
    statusElement.className = `status ${schoolActive ? 'active' : 'inactive'}`;

    // Herhaal elke seconde
    setTimeout(updateClocks, 1000);
}

// Start de klokken
updateClocks();
