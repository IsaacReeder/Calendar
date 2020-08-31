function initialPageLoad() {
  localStorage.clear();
  var todaysDate = new Date(),
    todaysDayNumber = todaysDate.getDate(),
    currentMonth = todaysDate.getMonth(),
    y = todaysDate.getFullYear(),
    monthsSinceYearZero = y * 12 + currentMonth;
  localStorage.setItem("monthsSinceYearZero", monthsSinceYearZero);
  localStorage.setItem("todaysDayNumber", todaysDayNumber);

  reload(monthsSinceYearZero, todaysDayNumber);
}

////

function reload(monthsSinceYearZero, todaysDayNumber) {
  var currentYear = Math.floor(monthsSinceYearZero / 12),
    monthWereIn = (monthsSinceYearZero % 12) + 1,
    months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  const monthVerifier = monthWereIn;
  /////need to compare current month with month presented in griddies

  var selectedMonthName = months[monthWereIn - 1],
    firstDayOfTheMonth = new Date(currentYear, monthWereIn - 1, 1).getDate(),
    lastDayOfTheMonth = new Date(
      Math.floor(monthsSinceYearZero / 12),
      (monthsSinceYearZero % 12) + 1,
      0
    ).getDate();
  var newOffset = new Date(currentYear, monthWereIn - 1, 1).getDay(),
    dayOnTheGrid = newOffset + parseInt(todaysDayNumber),
    ids = new Array();
  for (var i = 1; i <= 42; i++) {
    ids.push(i);
  }
  console.log(dayOnTheGrid);
  document.getElementById("griddies").innerHTML = ids
    .map((id) =>
      id == dayOnTheGrid && monthWereIn == monthVerifier
        ? `<div class="my-date" id=${
            id - newOffset < firstDayOfTheMonth ||
            id - newOffset > lastDayOfTheMonth
              ? (id = "")
              : id - newOffset
          }>${
            id - newOffset < firstDayOfTheMonth ||
            id - newOffset > lastDayOfTheMonth
              ? (id = "")
              : id - newOffset
          }</div>`
        : `<div class="grid-item" id=${
            id - newOffset < firstDayOfTheMonth ||
            id - newOffset > lastDayOfTheMonth
              ? (id = "")
              : id - newOffset
          }>${
            id - newOffset < firstDayOfTheMonth ||
            id - newOffset > lastDayOfTheMonth
              ? (id = "&nbsp")
              : id - newOffset
          }</div>`
    )
    .join("");
  document.getElementById(
    "headerMonthAndYear"
  ).innerHTML = `<div class="header-dates">${selectedMonthName}, ${currentYear}</div>`;
  var weekDays = new Array("S", "M", "T", "W", "T", "F", "S");
  for (i = 0; i <= 6; i++) {
    document.getElementById("ans").innerHTML = weekDays
      .map(
        (weekDay) =>
          `<div class="week-day-container" id=${weekDay}>${weekDay}</div>`
      )
      .join("");
  }
}

////

function monthIncrement() {
  var monthsSinceYearZero = localStorage.getItem("monthsSinceYearZero") || 0,
    todaysDayNumber = localStorage.getItem("todaysDayNumber");
  monthsSinceYearZero++;
  localStorage.setItem("monthsSinceYearZero", monthsSinceYearZero);
  reload(monthsSinceYearZero, todaysDayNumber);
}

////

function monthDecrement() {
  var monthsSinceYearZero = localStorage.getItem("monthsSinceYearZero") || 0,
    todaysDayNumber = localStorage.getItem("todaysDayNumber");
  monthsSinceYearZero--;
  // console.log(todaysDayNumber);
  localStorage.setItem("monthsSinceYearZero", monthsSinceYearZero);
  reload(monthsSinceYearZero, todaysDayNumber);
}

////

window.onclick = (e) => {
  if (e.target.classList.contains("grid-item")) {
    document;
    e.target.classList.toggle("selected-square");
  }
  // console.log(e.target.id, " -->", e.target.innerHTML);
};

////

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      str = "Left Key pressed!";
      monthDecrement();
      break;
    case 39:
      str = "Right Key pressed!";
      monthIncrement();
      break;
  }
};
