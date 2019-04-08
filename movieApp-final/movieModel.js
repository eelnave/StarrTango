export default class movieModel {
    static getMovie(searchTerm) {

        let url = "http://www.omdbapi.com/?apikey=f7dd8387&t=";
        const search = searchTerm.replace(" ", "+");
        url += search;

         return fetch(url)
            .then(
                response => response.json())
    }
}
