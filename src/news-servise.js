export default class NewsApiServise{
    constructor() {
        this.key = '25847066-2357e1a89d6256fab4fbd0686';
        this.BASE_URL = 'https://pixabay.com/api/';
        this.image_type = 'image_type = photo';
        this.orientation = 'orientation = horizontal';
        this.safesearch = 'safesearch = true';
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 'per_page = 40'
    }
    fetchPhotos() {
        return fetch(`${this.BASE_URL}?key=${this.key}&${this.image_type}&${this.orientation}&${this.safesearch}&${this.searchQuery}&page=${this.page}&${this.per_page}`)
            .then(r => r.json)
            .then(data => {
                this.page += 1
            })

    }
}
