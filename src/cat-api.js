const API_KEY =
  'live_wff01YUcmJjX9YEZvRl39ipXoQ88z558HPd3vtaNC3ighGssiNDpxK94FJVeGvpN';
const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, { 'x-api-key': `${API_KEY}` }).then(
    result =>
      result.json().then(data => {
        return data;
      })
  );
}

function fetchCatByBreed(id) {
  return fetch(
    `${BASE_URL}/images/search?&api_key=${API_KEY}&breed_ids=${id}`
  ).then(result =>
    result.json().then(data => {
      // GET PIC
      const dataName = data[0].breeds[0];

      return (catInfo = {
        pic: data[0].url,
        name: dataName.name,
        desc: dataName.description,
        temper: dataName.temperament,
        id: dataName.id,
      });
    })
  );
}

export { fetchBreeds, fetchCatByBreed };
