export default class SearchMovies {
  apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=5ef48972310b83a9569c2449ed33b900';

  async SearchMovies(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (res.ok) return res.json();
    throw new Error('Ошибка запроса');
  }

  async getSearch(request, page) {
    const res = await this.SearchMovies(`&query=${request}&page=${page}`);
    return res;
  }
}
