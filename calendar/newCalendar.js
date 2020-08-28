function initialPageLoad2() {
  var todaysDate = new Date();
  var todaysDayNumber = todaysDate.getDay();
  y = todaysDate.getFullYear();
  var monthsSinceYearZero = y * 12 + 6;
  localStorage.setItem("monthsSinceYearZero", monthsSinceYearZero);
  reload(monthsSinceYearZero, todaysDayNumber);
}
//Possible second function --------------------------
function reload(monthsSinceYearZero, todaysDayNumber) {
  var currentYearNoMatterWhichOne = Math.floor(monthsSinceYearZero / 12);
  var monthWereIn = (monthsSinceYearZero % 12) + 1;
  var dayOnTheGrid = newOffset + todaysDayNumber;
  var months = [
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

  var selectedMonthName = months[monthWereIn - 1];
  var firstDayOfTheMonth = new Date(
    currentYearNoMatterWhichOne,
    monthWereIn - 1,
    1
  ).getDate();
  var lastDayOfTheMonth = new Date(
    Math.floor(monthsSinceYearZero / 12),
    (monthsSinceYearZero % 12) + 1,
    0
  ).getDate();
  var newOffset = new Date(
    currentYearNoMatterWhichOne,
    monthWereIn - 1,
    1
  ).getDay();
  var date = new Date();
  currentMonth = date.getMonth();
  var ids = new Array();
  for (var i = 1; i <= 42; i++) {
    ids.push(i);
  }
  document.getElementById("griddies").innerHTML = ids
    .map((id) =>
      id == dayOnTheGrid && monthWereIn == currentMonth
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
  ).innerHTML = `<div class="header-dates">${selectedMonthName}, ${currentYearNoMatterWhichOne}</div>`;
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
//------------------------------------------

////
function monthIncrement() {
  var monthsSinceYearZero = localStorage.getItem("monthsSinceYearZero") || 0;
  monthsSinceYearZero++;
  localStorage.setItem("monthsSinceYearZero", monthsSinceYearZero);
  reload(monthsSinceYearZero);
}
////
function monthDecrement() {
  var monthsSinceYearZero = localStorage.getItem("monthsSinceYearZero") || 0;
  monthsSinceYearZero--;
  localStorage.setItem("monthsSinceYearZero", monthsSinceYearZero);
  reload(monthsSinceYearZero);
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
