export let moviesList = null;
export let inputSearch = null;
export let triggerMode = false;

export const createStyle = () => {
  createElement({
    type: 'style',
    attrs: {
      innerHTML: `
      * {
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
      }
      html {
          font-family: 'Open Sans', sans-serif;
          font-size: 12px;
          overflow-x: hidden;
      }
      body {
          margin: 0 auto;
          padding: 5px 10px;
          color: white;
          background: rgb(98, 7, 7);
      }
      h1 {
          font-size: 3em;
          text-align: center;
      }
      .container {
          width: min(100% - 15px, 1340px);
          margin-inline: auto;
      }
      .movies {
          display: grid;
          padding: 10px 10px;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
      }
      .movie {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          border: 1px solid rgb(29, 105, 152);
          border-radius: 10px;
          -ms-flex-line-pack: center;
          align-content: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
      }
      .movie__image {
          width: 100%;
          border-radius: 10px;
          -o-object-fit: cover;
             object-fit: cover;
      }
      .search {
          font-size: 2em;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-bottom: 20px;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
      }
      .search__group--input {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          flex-direction: column;
          width: 100%;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
      }
      .search__group--checkbox {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          flex-direction: row;
          width: 100%;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -ms-flex-direction: row;
          gap: 10px;
      }
      .search__input {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 100%;
          max-width: 600px;
          margin-bottom: 20px;
          padding: 10px 15px;
          border: 1px solid lightskyblue;
          font-size: 1em;
      }
      .search__input-label {
          display: block;
          margin-bottom: 12px;
          padding: 0 1px;
      }
      .search__checkbox {
          display: block;
      }
      .search__checkbox-label {
          font-size: .8em;
          display: inline-block;
          -webkit-transform: translate(10px, 0px);
          -ms-transform: translate(10px, 0px);
          transform: translate(10px, 0px);
      }`
    },
    container: document.head
  });
};

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
    container: moviesList
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
