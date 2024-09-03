let is24HourFormat = true;

function updateClock() {
    const timeElement = document.getElementById('time');
    const timezoneSelector = document.getElementById('timezone-selector');
    const selectedTimezone = timezoneSelector.value;

    const now = new Date();

    const options = {
        timeZone: selectedTimezone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: !is24HourFormat
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);

    let hours = parts.find(part => part.type === 'hour').value;
    let minutes = parts.find(part => part.type === 'minute').value;
    let seconds = parts.find(part => part.type === 'second').value;
    const period = parts.find(part => part.type === 'dayPeriod')?.value || '';

    if (!is24HourFormat) {
        hours = hours.padStart(2, '0');
    }
    minutes = minutes.padStart(2, '0');
    seconds = seconds.padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds} ${period}`;

    timeElement.textContent = timeString.trim();
    document.title = timeString.trim();  
}

function changeBackgroundColor() {
    const colorPicker = document.getElementById('background-color-picker');
    document.body.style.backgroundColor = colorPicker.value;
}

function changeTimeColor() {
    const colorPicker = document.getElementById('time-color-picker');
    document.getElementById('time').style.color = colorPicker.value;
}

function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
    updateClock(); 
}

document.getElementById('background-color-picker').addEventListener('input', changeBackgroundColor);
document.getElementById('time-color-picker').addEventListener('input', changeTimeColor);
document.getElementById('format-switch').addEventListener('change', toggleTimeFormat);

setInterval(updateClock, 1000);
updateClock();
