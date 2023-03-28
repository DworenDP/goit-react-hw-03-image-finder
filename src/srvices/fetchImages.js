import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api/`;
const API_KEY = `33273025-546ff08445fd4a61172a6ea0a`;

export const getImages = (inputValue, pageNum) => {
  return axios
    .get(
      `?q=${inputValue}&page=${pageNum}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(response => {
      return response.data.hits.map(image => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
        tags: image.tags,
      }));
    });
};
