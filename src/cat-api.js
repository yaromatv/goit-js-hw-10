// const API_KEY =
//   'live_wff01YUcmJjX9YEZvRl39ipXoQ88z558HPd3vtaNC3ighGssiNDpxK94FJVeGvpN';
const BASE_URL = 'https://api.thecatapi.com/v1';
let catDB = [];
let catInfo = {};

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`).then(result =>
    result.json().then(data => {
      catDB = data;
      return data;
    })
  );
}

function getBreedInfo(name) {
  catDB.map(cat => {
    if (name === cat.name) {
      catInfo = {
        name: cat.name,
        desc: cat.description,
        temper: cat.temperament,
        id: cat.id,
      };
    }
  });
}

function fetchPic(id) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${id}`).then(result =>
    result.json().then(data => data[0].url)
  );
}

export { fetchBreeds, catInfo, fetchPic, getBreedInfo };
