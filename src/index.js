// 1 dostać liste gatunków kotików
// 2 fn onSelect robi fetch info o kotiku

// 3 zdenderować info o kotiku
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchPic, fetchBreeds, catInfo, getBreedInfo } from '../src/cat-api';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

// RENDER
function renderBreeds() {
  // selectEl.classList.add('is-hidden');
  loaderEl.classList.remove('is-hidden');

  fetchBreeds()
    .then(data => {
      selectEl.classList.remove('is-hidden');
      loaderEl.classList.add('is-hidden');

      data.map(cat => {
        const markup = document.createElement('option');
        markup.innerHTML = `<option value="${cat.id}">${cat.name}</option>`;
        selectEl.append(markup);
      });
    })
    .catch(error => {
      selectEl.classList.add('is-hidden');
      onError();
    });
}

function onSelect(e) {
  getBreedInfo(e.target.value);

  catInfoEl.classList.add('is-hidden');
  loaderEl.classList.remove('is-hidden');

  fetchPic(catInfo.id)
    .then(data => {
      catInfoEl.classList.remove('is-hidden');
      loaderEl.classList.add('is-hidden');
      return data;
    })
    .then(data => renderCat(data))
    .catch(error => {
      onError();
      loaderEl.classList.add('is-hidden');
    });
}

function onError() {
  Report.failure('Kitties do not answer =(', '', 'Try again');
  const reloadEl = document.querySelector('#NXReportButton');
  reloadEl.addEventListener('click', () => {
    window.location.reload();
  });
}

function renderCat(url) {
  catInfoEl.innerHTML = `<div><img class="pic" src="${url}"/></div>
      <div class='cat-text'><h1>${catInfo.name}</h1><p class='cat-desc'>${catInfo.desc}</p><p><strong>Temperament: </strong>${catInfo.temper}</p></div>`;

  const picEl = document.querySelector('.pic');
  picEl.addEventListener('click', onSelect);
}

// MAIN
renderBreeds();

selectEl.addEventListener('change', onSelect);
