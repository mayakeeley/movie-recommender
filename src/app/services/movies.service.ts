import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public config: Observable<string>;

  constructor(private httpClient: HttpClient) {
  }

  public getMovies(): Observable<string> {
    const jsonFile = 'assets/tmdb_5000_movies.json';
    return this.httpClient.get(jsonFile, {responseType: 'text'});
  }

  public getConfig(): Observable<string> {
    const config = 'assets/config.json';
    this.config = this.httpClient.get(config, {responseType: 'text'});
    return this.config;
  }

  public getConfigData(): Observable<string> {
    if (!this.config) {
      return this.getConfig();
    } else {
      return this.config;
    }
  }
}
