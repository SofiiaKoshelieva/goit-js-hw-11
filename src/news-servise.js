const axios = require('axios').default;
export default class NewsApiServise {
  constructor() {
    this.key = '25847066-2357e1a89d6256fab4fbd0686';
    this.BASE_URL = 'https://pixabay.com/api/';
    this.image_type = 'image_type=photo';
    this.orientation = 'orientation=horizontal';
    this.safesearch = 'safesearch=true';
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 'per_page=40';
  }
  async fetchPhotos() {
    const options = {
      fields: 'webformatURL,largeImageURL,tags,likes,views,comments,downloads',
    };
    const response = await axios.get(
      `${this.BASE_URL}?key=${this.key}&${this.image_type}&${this.orientation}&${this.safesearch}&q=${this.searchQuery}&page=${this.page}&${this.per_page}`,
      options,
    );
    console.log(response);
    this.page += 1;
    return response;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}
