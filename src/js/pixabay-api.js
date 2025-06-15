import axios from 'axios';
import iziToast from 'izitoast';4
import 'izitoast/dist/css/iziToast.min.css';
const API_KEY = '50842900-bcdcb4b14e1b1067d3f853731';
const URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  return axios
    .get(URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      const hits = response.data.hits;
      if (hits.length < 1) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#EF4040',
          messageColor: '#FAFAFB',
          iconUrl: './img/cross.png',
        });
        return [];
      }
      return hits;
    })
    .catch(error => {
      iziToast.show({
        message: `Error: ${error.message}`,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        messageColor: 'black',
      });
      return [];
    });
}
