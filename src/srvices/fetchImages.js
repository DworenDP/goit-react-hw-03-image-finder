import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api/`;
const API_KEY = `33273025-546ff08445fd4a61172a6ea0a`;

export const getImages = async (inputValue, pageNum) => {
  const response = await axios.get(
    `?q=${inputValue}&page=${pageNum}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data.hits.map(image => {
    return {
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    };
  });
};
