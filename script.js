// Utility to calculate ms from days
function daysToMs(days) {
  return days * 24 * 60 * 60 * 1000;
}

function getTimeUntilNextMonday() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    
    // Calculate days until next Monday
    const daysUntilMonday = (currentDay === 0) ? 1 : (8 - currentDay);
    
    // Get next Monday's date
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + daysUntilMonday);
    nextMonday.setHours(0, 0, 0, 0); // Set time to midnight

// Check if it's an odd or even week
    const currentWeek = Math.floor((nextMonday.getTime() / daysToMs(7)) % 2);
    if (currentWeek === 1) {
        nextMonday.setDate(nextMonday.getDate() + 7);
    }

    return nextMonday - now; // Returns time in milliseconds
}

function getTimeUntilNextMonth() {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    
    // Set time to midnight (start of the day)
    nextMonth.setHours(0, 0, 0, 0);

    // Calculate time difference in milliseconds
    return nextMonth - now;
}

// Initialize countdowns on all task cards
document.querySelectorAll('.task').forEach(card => {
  const display = card.querySelector('.time');
  const days = parseInt(card.dataset.intervalDays, 10);

  // Update every second :contentReference[oaicite:5]{index=5}
  setInterval(() => {

    if (days === 30) {

      let display_text = getTimeUntilNextMonth()

      const d = Math.floor(display_text / (1000*60*60*24));
      const h = Math.floor((display_text % (1000*60*60*24)) / (1000*60*60));
      const m = Math.floor((display_text % (1000*60*60)) / (1000*60));
      const s = Math.floor((display_text % (1000*60)) / 1000);

      if (display_text <= daysToMs(6)) {
          display.innerHTML = `<span style="font-size: 24px; color: red;">${d}d ${h}h ${m}m ${s}s</span>`;
          return;
      } else if (display_text <= daysToMs(10)) {
          display.innerHTML = `<span style="font-size: 20px; color: red;">${d}d ${h}h ${m}m ${s}s</span>`;
          return;
      } else {
        display.textContent = `${d}d ${h}h ${m}m ${s}s`;
      }

    } else if (days === 14) {

      let display_text = getTimeUntilNextMonday()

      const d = Math.floor(display_text / (1000*60*60*24));
      const h = Math.floor((display_text % (1000*60*60*24)) / (1000*60*60));
      const m = Math.floor((display_text % (1000*60*60)) / (1000*60));
      const s = Math.floor((display_text % (1000*60)) / 1000);

      if (display_text <= daysToMs(3)) {
          display.innerHTML = `<span style="font-size: 24px; color: red;">${d}d ${h}h ${m}m ${s}s</span>`;
          return;
      } else if (display_text <= daysToMs(5)) {
          display.innerHTML = `<span style="font-size: 20px; color: red;">${d}d ${h}h ${m}m ${s}s</span>`;
          return;
      } else {
        display.textContent = `${d}d ${h}h ${m}m ${s}s`;
      }
    } else {

        display.textContent = `Done <3`;
        console.log("No suitable date marker provided");

    }

  }, 1000);
});
