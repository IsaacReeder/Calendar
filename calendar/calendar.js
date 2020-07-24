function initialPageLoad() {
  console.log("initialPageLoad() has been called");
  zeroYearCreator();
  dateExtractor();
  dayDisplay();
  calenderPopulator();
  headerPopulator();
}

////

function dateExtractor() {
  console.log("dateExtractor() has been called");
  currentMonthAndYear();
  headerMonthCreator();
  firstLastOffset();
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

function monthIncrement() {
  console.log("monthIncrement() has been called");
  var monthsSinceYearZero = localStorage.getItem("monthsSinceYearZero") || 0;
  monthsSinceYearZero++;
  localStorage.setItem("monthsSinceYearZero", monthsSinceYearZero);
  dateExtractor();
  calenderPopulator();
}

////

function monthDecrement() {
  console.log("monthDecrement() has been called");
  var monthsSinceYearZero = localStorage.getItem("monthsSinceYearZero") || 0;
  monthsSinceYearZero--;
  localStorage.setItem("monthsSinceYearZero", monthsSinceYearZero);
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

////

function dayDisplay() {
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

function zeroYearCreator() {
  var todaysDate = new Date();
  localStorage.setItem("todaysDate", todaysDate);
  y = todaysDate.getFullYear();
  // The input from which all date calculations arise
  var monthsSinceYearZero = y * 12 + 6;
  // Johannes Kepler's Rudolphine Tables, year zero (1627)
  localStorage.setItem("monthsSinceYearZero", monthsSinceYearZero);
}

////

function headerPopulator() {
  var selectedMonthName = localStorage.getItem("selectedMonthName");
  var currentYearNoMatterWhichOne = localStorage.getItem(
    "currentYearNoMatterWhichOne"
  );
  document.getElementById(
    "headerMonthAndYear"
  ).innerHTML = `<div class="header-dates">${selectedMonthName}, ${currentYearNoMatterWhichOne}</div>`;
}

////

function currentMonthAndYear() {
  var monthsSinceYearZero = localStorage.getItem("monthsSinceYearZero");
  var currentYearNoMatterWhichOne = Math.floor(monthsSinceYearZero / 12);
  var monthWereIn = (monthsSinceYearZero % 12) + 1;
  localStorage.setItem("monthWereIn", monthWereIn);
  localStorage.setItem(
    "currentYearNoMatterWhichOne",
    currentYearNoMatterWhichOne
  );
}

////

function headerMonthCreator() {
  var todaysDate = localStorage.getItem("todaysDate");
  var newOffset = localStorage.setItem("newOffset", newOffset);
  var monthWereIn = localStorage.getItem("monthWereIn");
  var currentYearNoMatterWhichOne = localStorage.getItem(
    "currentYearNoMatterWhichOne"
  );

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
  console.log(selectedMonthName);
  var selectedMonthName = localStorage.setItem(
    "selectedMonthName",
    selectedMonthName
  );
  headerPopulator();
}

////

function firstLastOffset() {
  var currentYearNoMatterWhichOne = localStorage.getItem(
    "currentYearNoMatterWhichOne"
  );
  var monthWereIn = localStorage.getItem("monthWereIn");
  var monthsSinceYearZero = localStorage.getItem("monthsSinceYearZero");

  var firstDayOfTheMonth = new Date(
    currentYearNoMatterWhichOne,
    monthWereIn - 1,
    1
  ).getDate();
  localStorage.setItem("firstDayOfTheMonth", firstDayOfTheMonth);

  var lastDayOfTheMonth = new Date(
    Math.floor(monthsSinceYearZero / 12),
    (monthsSinceYearZero % 12) + 1,
    0
  ).getDate();
  console.log(lastDayOfTheMonth);
  localStorage.setItem("lastDayOfTheMonth", lastDayOfTheMonth);

  var newOffset = new Date(
    currentYearNoMatterWhichOne,
    monthWereIn - 1,
    1
  ).getDay();
  localStorage.setItem("newOffset", newOffset);
}
