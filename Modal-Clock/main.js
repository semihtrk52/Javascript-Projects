const moment = require("moment-timezone");

function updateClock(timezone) {
  const now = moment().tz(timezone).format("HH:mm:ss");
  const formattedDate = moment().tz(timezone).format("dddd, D MMMM, YYYY");

  const clockElement = document.getElementById("clock");
  const currentDay = document.querySelector(".current-date");

  if (clockElement) {
    clockElement.textContent = now;
  }

  if (currentDay) {
    currentDay.textContent = formattedDate;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const timezoneSelect = document.getElementById("timezone-select");
  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");
  const applyButton = document.getElementById("apply");

  const defaultTimezone = "Europe/London";
  updateClock(defaultTimezone);
  setInterval(() => updateClock(timezoneSelect.value || defaultTimezone), 1000);

  function openModal() {
    modal.style.display = "block";
    modal.querySelector(".modal-content").focus();
  }

  function closeModal() {
    modal.style.display = "none";
  }

  openModalBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  applyButton.addEventListener("click", () => {
    const selectedTimezone = timezoneSelect.value;
    if (selectedTimezone) {
      getZoneName(selectedTimezone);
      updateClock(selectedTimezone);
      closeModal();
    }
  });
});

function getZoneName(selectedTimezone) {
  const timezoneSelect = document.getElementById("timezone-select");
  const zoneElement = document.getElementById("zone");

  if (zoneElement) {
    const options = timezoneSelect.options;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === selectedTimezone) {
        zoneElement.textContent = options[i].text;
        break;
      }
    }
  }
}
