import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {getClientRate} from "../utils/filter";

const BAR_HEIGHT = 50;
const HOUR = 60;

const TIME_GAPS = {
  "today": {
    days: `1`,
    type: `today`
  },
  "week": {
    days: `7`,
    type: `week`
  },
  "month": {
    days: `30`,
    type: `month`
  },
  "year": {
    days: `365`,
    type: `year`
  },
  "all-time": {
    days: null,
    type: `all-time`
  },
};

const getWatchedFilms = (films, from, to) => {
  return films.filter((item) => {
    return item.isHistory === true &&
    item.watchingDate >= from &&
    item.watchingDate <= to;
  });
};

const getTotalDuration = (films) => {
  const total = films.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.duration;
  }, 0);

  return {
    hours: Math.floor(total / HOUR),
    minutes: total % HOUR
  };
};

const getGenresRate = (films) => {
  const genres = films.reduce((arr, item) => {
    arr = arr.concat(item.genres);
    return arr;
  }, [])
  .reduce((total, item) => {
    if (!total[item]) {
      total[item] = 1;
    } else {
      total[item] = total[item] + 1;
    }
    return total;
  }, {});

  return genres;
};

const getTopGenre = (films) => {
  const genres = getGenresRate(films);

  return Object.keys(genres).length !== 0 ? Object.keys(genres).reduce((a, b) => genres[a] > genres[b] ? a : b) : ``;
};

const renderChart = (chart, films, dateFrom, dateTo) => {
  const filmsWatched = getWatchedFilms(films, dateFrom, dateTo);
  const getGenres = getGenresRate(filmsWatched);

  const statisticCtx = chart;
  statisticCtx.height = BAR_HEIGHT * Object.keys(getGenres).length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(getGenres),
      datasets: [{
        data: Object.values(getGenres),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};


const createStatisticsTemplate = ({films, dateFrom, dateTo, type}) => {
  const filmsWatched = getWatchedFilms(films, dateFrom, dateTo);
  const totalDuration = getTotalDuration(filmsWatched);
  const topGenre = getTopGenre(filmsWatched);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${getClientRate(films.length)}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input ${type === TIME_GAPS[`all-time`].type ? `checked` : ``} type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time">
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input ${type === TIME_GAPS[`today`].type ? `checked` : ``} type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input ${type === TIME_GAPS[`week`].type ? `checked` : ``} type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input ${type === TIME_GAPS[`month`].type ? `checked` : ``} type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input ${type === TIME_GAPS[`year`].type ? `checked` : ``} type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${filmsWatched.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${totalDuration.hours} <span class="statistic__item-description">h</span> ${totalDuration.minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(films) {
    super();

    this._films = films;
    this._dateFrom = null;
    this._dateTo = new Date();
    this._type = TIME_GAPS[`all-time`].type;

    this._chart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate({films: this._films.getFilmsAll(), dateFrom: this._dateFrom, dateTo: this._dateTo, type: this._type});
  }

  rerender(films, dateFrom, dateTo) {
    this._films = films;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;

    super.rerender();

    this._renderCharts();
    this.setTimeGap();
  }

  _renderCharts() {
    const element = this.getElement();

    const chart = element.querySelector(`.statistic__chart`);

    this._resetCharts();

    this._chart = renderChart(chart, this._films.getFilmsAll(), this._dateFrom, this._dateTo);
  }

  _resetCharts() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }

  recoveryListeners() {}

  show() {
    super.show();
    this.rerender(this._films, this._dateFrom, this._dateTo, this._type = TIME_GAPS[`all-time`].type);
  }

  setTimeGap() {
    const element = this.getElement();
    element.querySelector(`.statistic__filters`)
    .addEventListener(`change`, () => {
      const target = element.querySelector(`input[name="statistic-filter"]:checked`).value;
      const time = TIME_GAPS[target].days;
      this._type = TIME_GAPS[target].type;
      if (time) {
        this._dateFrom = new Date(this._dateTo);
        this._dateFrom.setDate(this._dateFrom.getDate() - time);
      } else {
        this._dateFrom = null;
      }
      this.rerender(this._films, this._dateFrom, this._dateTo);
    });
  }
}
