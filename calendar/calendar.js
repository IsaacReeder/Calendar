function initialPageLoad() {
  console.log("initialPageLoad() has been called");
  var todaysDate = new Date();
  localStorage.setItem("todaysDate", todaysDate);
  m = todaysDate.getMonth();
  y = todaysDate.getFullYear();

  var monthsSinceChristBirth = y * 12 + 6;
  localStorage.setItem("monthsSinceChristBirth", monthsSinceChristBirth);

  var weekDays = new Array("S", "M", "T", "W", "T", "F", "S");
  for (i = 0; i <= 6; i++) {
    document.getElementById("ans").innerHTML = weekDays
      .map(
        (weekDay) =>
          `<div class="week-day-container" id=${weekDay}>${weekDay}</div>`
      )
      .join("");
  }

  var selectedMonthName = localStorage.getItem("selectedMonthName");
  var currentYearNoMatterWhichOne = localStorage.getItem(
    "currentYearNoMatterWhichOne"
  );
  document.getElementById(
    "selectedMonthName"
  ).innerHTML = `<div class="header-dates">${selectedMonthName}, ${currentYearNoMatterWhichOne}</div>`;
  calenderPopulator();
}

////

function calenderPopulator() {
  console.log("calenderPopulator()has been called");
  var newOffset = localStorage.getItem("newOffset");
  var monthWereIn = localStorage.getItem("monthWereIn");
  var dayOnTheGrid = localStorage.getItem("dayOnTheGrid");
  var firstDayOfTheMonth = localStorage.getItem("firstDayOfTheMonth");
  var lastDayOfTheMonth = localStorage.getItem("lastDayOfTheMonth");
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
}

////

function dateExtractor() {
  console.log("dateExtractor() has been called");
  var monthsSinceChristBirth = localStorage.getItem(
    "monthsSinceChristBirth",
    monthsSinceChristBirth
  );
  var currentYearNoMatterWhichOne = Math.floor(monthsSinceChristBirth / 12);
  var monthWereIn = (monthsSinceChristBirth % 12) + 1;
  localStorage.setItem("monthWereIn", monthWereIn);

  var firstDayOfTheMonth = new Date(
    currentYearNoMatterWhichOne,
    monthWereIn - 1,
    1
  ).getDate();
  var lastDayOfTheMonth = new Date(
    currentYearNoMatterWhichOne,
    monthWereIn - 1,
    0
  ).getDate();
  localStorage.setItem("firstDayOfTheMonth", firstDayOfTheMonth);
  localStorage.setItem("lastDayOfTheMonth", lastDayOfTheMonth);

  var newOffset = new Date(
    currentYearNoMatterWhichOne,
    monthWereIn - 1,
    1
  ).getDay();

  localStorage.setItem("newOffset", newOffset);
  var todaysDate = localStorage.getItem("todaysDate");
  var dayOnTheGrid = newOffset + todaysDate;
  localStorage.setItem("dayOnTheGrid", dayOnTheGrid);
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
  localStorage.setItem("monthWereIn", monthWereIn);
  document.getElementById(
    "selectedMonthName"
  ).innerHTML = `<div class="header-dates">${selectedMonthName}, ${currentYearNoMatterWhichOne}</div>`;
}

////

function monthIncrement() {
  console.log("monthIncrement() has been called");
  var monthsSinceChristBirth =
    localStorage.getItem("monthsSinceChristBirth") || 0;
  monthsSinceChristBirth++;
  localStorage.setItem("monthsSinceChristBirth", monthsSinceChristBirth);
  dateExtractor();
  calenderPopulator();
}

////

function monthDecrement() {
  console.log("monthDecrement() has been called");
  var monthsSinceChristBirth =
    localStorage.getItem("monthsSinceChristBirth") || 0;
  monthsSinceChristBirth--;
  localStorage.setItem("monthsSinceChristBirth", monthsSinceChristBirth);
  dateExtractor();
  calenderPopulator();
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
