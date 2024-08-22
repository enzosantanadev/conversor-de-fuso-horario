document.addEventListener('DOMContentLoaded', () => {
    const { DateTime } = luxon;

    // lista dos fusos horarios
    const timezones = [
        'UTC', 
        'America/Sao Paulo', 
        'America/Manaus', 
        'America/Cuiaba', 
        'America/Porto Velho', 
        'America/Rio Branco',
        'Europe/London', 
        'Europe/Paris', 
        'Europe/Berlin', 
        'America/New York', 
        'America/Chicago', 
        'America/Denver', 
        'America/Los Angeles', 
        'Asia/Tokyo', 
        'Australia/Sydney'
    ];

    
    const fromTimezoneSelect = document.getElementById('from-timezone');
    const toTimezoneSelect = document.getElementById('to-timezone');

    timezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz;
        option.textContent = tz;
        fromTimezoneSelect.appendChild(option);
        toTimezoneSelect.appendChild(option.cloneNode(true));
    });

    
    document.getElementById('convert-btn').addEventListener('click', () => {
        const timeInput = document.getElementById('time-input').value;
        const fromTimezone = fromTimezoneSelect.value;
        const toTimezone = toTimezoneSelect.value;

        if (!timeInput || fromTimezone === toTimezone) {
            document.getElementById('result').textContent = 'preencha todos os campos e escolha fusos horários diferentes.';
            return;
        }

        const [hours, minutes] = timeInput.split(':');
        const localTime = DateTime.now().set({ hour: hours, minute: minutes }).setZone(fromTimezone);

        const convertedTime = localTime.setZone(toTimezone).toFormat('HH:mm');

        document.getElementById('result').textContent = `Horário em ${toTimezone}: ${convertedTime}`;
    });
});
