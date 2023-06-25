import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchCatByBreed, fetchBreeds } from '../src/cat-api';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

// MAIN
renderBreeds();
selectEl.addEventListener('change', onSelect);

// RENDER
function renderBreeds() {
  loaderEl.classList.remove('is-hidden');

  fetchBreeds()
    .then(data => {
      selectEl.classList.remove('is-hidden');
      loaderEl.classList.add('is-hidden');

      const markup = data
        .map(cat => {
          return `<option value="${cat.id}">${cat.name}</option>`;
        })
        .join('');

      selectEl.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => {
      loaderEl.classList.add('is-hidden');
      onError();
    });
}

function onSelect(e) {
  loaderEl.classList.remove('is-hidden');

  fetchCatByBreed(e.target.value)
    .then(data => {
      renderCat(data);

      loaderEl.classList.add('is-hidden');
      catInfoEl.classList.remove('is-hidden');
    })
    .catch(error => {
      console.log(error);
      onError();
      loaderEl.classList.add('is-hidden');
    });
}

function onError() {
  catInfoEl.innerHTML = '';
  Report.failure('Kitties do not answer =(', '', 'OK');
}

function renderCat(catInfo) {
  catInfoEl.innerHTML = `<div><img class="pic" src="${catInfo.pic}"/></div>
      <div class='cat-text'><h1>${catInfo.name}</h1><p class='cat-desc'>${catInfo.desc}</p><p><strong>Temperament: </strong>${catInfo.temper}</p></div>`;
}
