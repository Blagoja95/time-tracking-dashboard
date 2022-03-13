"use strict";
// const btnDaily = document.querySelector(".btn-daily");
// const btnWeekly = document.querySelector(".btn-weekly");
// const btnMonthly = document.querySelector(".btn-monthly");
const component = document.querySelector(".component");
const btn = document.querySelectorAll(".btn-time");

const renderData = function (object, timeframe) {
  // console.log(document.querySelectorAll(".data-box").length);
  if (document.querySelectorAll(".data-box").length <= 5) {
    let html = `
    <div class="data-box ${object.title
      .toLowerCase()
      .replace(" ", "-")
      .trim()}">
    <div class="data-ilustration"></div>
    <div class="data-inner">
    <div class="nav">
    <h2 class="title nav-title">${object.title.trim()}</h2>
    <button class="btn nav-menu">
    <img src="src/images/icon-ellipsis.svg" alt="menu icon dots" />
    </button>
    </div>
    <div class="stats">
    <p class="stats-hours">${object.timeframes[timeframe].current}hrs</p>
    <p class="stats-archive">Last time-period - ${
      object.timeframes[timeframe].previous
    }hrs</p>
    </div>
    </div>
    </div>`;

    component.insertAdjacentHTML("beforeend", html);
  } else {
    document.querySelectorAll(".data-box").forEach((el) => {
      el.parentElement.removeChild(el);
    });
    renderData(object, timeframe);
  }
};

const getJson = async function (url) {
  try {
    const input = await fetch(url);
    const data = await input.json();
    if (!data) throw new Error("No data");
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getData = async function (timeframe) {
  const arr = await getJson("./src/js/data.json");
  arr.forEach((element) => {
    renderData(element, timeframe);
  });
};

//.timeframes[time]
btn.forEach((el) =>
  el.addEventListener("click", function () {
    const timeframe = el.innerHTML.toLowerCase().trim();
    getData(timeframe);
    btn.forEach((el) => el.classList.remove("btn--selected"));
    el.classList.add("btn--selected");
  })
);

getData("weekly");
