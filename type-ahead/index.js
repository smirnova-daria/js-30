const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

let cities = [];

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => (cities = data));

function findMatches(wordToMatch, cities) {
  const regex = new RegExp(wordToMatch, "gi");

  return cities.filter(
    (place) => place.city.match(regex) || place.state.match(regex)
  );
}

function displayMatches(e) {
  const matchArray = findMatches(e.target.value, cities);

  const html = matchArray
    .map((place) => {
      const regex = new RegExp(e.target.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${e.target.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${e.target.value}</span>`
      );
      return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${Number(
              place.population
            ).toLocaleString()}</span>
        </li>        
        `;
    })
    .join("");

  matchesList.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const matchesList = document.querySelector(".suggestions");

searchInput.addEventListener("input", displayMatches);
