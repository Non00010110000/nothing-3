const apiKey = "04c35731a5ee918f014970082a0088b1";
const defaultApiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc";
const searchApiUrl = "https://api.themoviedb.org/3/search/movie";
const main = document.getElementById("main");
const search = document.getElementById("search");
const form = document.querySelector("form");
const imgPath = "https://image.tmdb.org/t/p/w1280";

// Function to fetch movies from API
async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  // Clear previous search results
  main.innerHTML = "";

  // Display search results or popular movies
  if (url.includes("search")) {
    respData.results.forEach((movie) => {
      const { poster_path, title, vote_average,overview } = movie;
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
        <img src="${imgPath + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          <div class="overview"><h3>OverView:</h3>
          ${overview}</div>
        </div>
      `;
      main.appendChild(movieEl);
    });
  } else {
    respData.results.forEach((movie) => {
      const { poster_path, title, vote_average,overview } = movie;
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
        <img src="${imgPath + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          <div class="overview"><h2>OverView : </h2>
          ${overview}</div>
          </div>
        </div>
      `;
      main.appendChild(movieEl);
    });
  }
}

// Function to determine CSS class based on movie rating
function getClassByRate(vote) {
  if (vote > 8) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "red";
  }
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (searchTerm) {
    const url = `${searchApiUrl}?api_key=${apiKey}&query=${searchTerm}`;
    getMovies(url);
    search.value = "";
  } else {
    getMovies(defaultApiUrl + `&api_key=${apiKey}`);
  }
});

// Load popular movies on page load
getMovies(defaultApiUrl + `&api_key=${apiKey}`);





















