import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public config: Observable<{}>;
  public movies: Observable<any>;

  constructor(private httpClient: HttpClient) {
  }

  public getMovies(): Observable<any> {
    const jsonFile = 'assets/tmdb_5000_movies.json';
    this.movies = this.httpClient.get(jsonFile);
    return this.movies;
  }

  public getMovieData(): Observable<any> {
    if (!this.movies) {
      return this.getMovies();
    } else {
      return this.movies;
    }
  }

  public getConfig(): Observable<{}> {
    const config = 'assets/movie-questions.json';
    this.config = this.httpClient.get(config);
    return this.config;
  }

  public getConfigData(): Observable<{}> {
    if (!this.config) {
      return this.getConfig();
    } else {
      return this.config;
    }
  }
}
