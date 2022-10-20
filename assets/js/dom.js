export let moviesList = null;
export let inputSearch = null;
export let triggerMode = false;

export const createElement = ({type, attrs, container = null, position = 'append', evt = null, handler = null}) => {
  const el = document.createElement(type);
  
  Object.keys(attrs).forEach((key) => {
    if (key !== 'innerHTML') el.setAttribute(key, attrs[key])
    else el.innerHTML = attrs[key];
  });

  if (container && position === 'append') container.append(el)
  if (container && position === 'prepend') container.prepend(el)
  if (evt && handler && typeof handler === 'function') el.addEventListener(evt, handler);

  return el;
};

export const createMarkup = () => {
  const container = createElement({
   type: 'div',
   attrs: {class: 'container'},
   container: document.body,
   position: 'prepend'
  });

  createElement({
    type: 'h1', 
    attrs: {innerHTML : 'Приложение для поиска фильмов'},
    container});
    
  const searchBox = createElement({
    type: 'div', 
    attrs: {class: 'search'},
    container
  });
  
  const inputBox = createElement({
    type: 'div',
    attrs: {
      class: 'search__group search__group--input'
    },
    container: searchBox
  });

  createElement({
    type: 'label',
    attrs: {
      class: 'search__input-label',
      for: 'search',
      innerHTML: 'Поиск фильмов'
    },
    container: inputBox
  });

  inputSearch = createElement({
    type: 'input', 
    attrs: {class: 'search__input', 
    id: 'search',
    type: 'search',
    placeholder: 'Начните вводить текст'},
    container: inputBox
  });

  const checkBox = createElement({
    type: 'div',
    attrs: {
      class: 'search__group search__group--checkbox'
    },
    container: searchBox
  });

  createElement({
    type: 'input',
    attrs: {
      class: 'search__checkbox',
      id: 'checkbox',
      type: 'checkbox'
    },
    container: checkBox,
    evt: 'click',
    handler: () => triggerMode = !triggerMode
  });
  
  createElement({
    type: 'label',
    attrs: {
      class: 'search__checkbox-label',
      for: 'checkbox',
      innerHTML: 'Добавлять фильмы к уже найденным'
    },
    container: checkBox
  });

  moviesList  = createElement({
    type: 'div',
    attrs: {class: 'movies'},
    container
  });
};

export const addMovieToList = (movie) => {
  const item = createElement({
    type: 'div',
    attrs: {class: 'movie'},
    container: moviesList,
    position: 'prepend'
  });

  createElement({
    type: 'img',
    attrs: {
      class: 'movie__image',
      src: /(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/No-Image-Placeholder.png',
      alt: `${movie.Title}, ${movie.Year}`,
      title: `${movie.Title}, ${movie.Year}`
    },
    container: item
  });
};

export const clearMoviesMarkup = (el) => el && (el.innerHTML = '');
