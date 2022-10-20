import {
  createMarkup,
  createStyle,
  addMovieToList, 
  clearMoviesMarkup, 
  inputSearch, 
  moviesList, 
  triggerMode
} from './dom.js';

let searchLast = null;
let apiURL = null;

const API_KEY = '9aa0dabb';

const getData = (url) => fetch(url)
.then((response) => response.json())
.then((json) => json.Search);

const debounce = (() => {
  let timer = null;
  return (cb, ms) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
  }
    timer = setTimeout(cb, ms);
  };
})();

export const inputSearchHandler = (e) => {
  debounce(() => {
    const searchString = e.target.value.trim();
    if (searchString && searchString.length > 2 && searchString !== searchLast) {
      if (!triggerMode) clearMoviesMarkup(moviesList);
      getData(`${apiURL}/?apikey=${API_KEY}&s=${searchString}`)
      .then((movies) => movies.forEach(movie => addMovieToList(movie)))
      .catch((err) => console.log(err));
    }
    searchLast = searchString;
  }, 2000);
};

export const appInit = (url) => {
  createMarkup();
  createStyle();
  apiURL = url || 'https://www.omdbapi.com'
  inputSearch.addEventListener('keyup', inputSearchHandler); 
};