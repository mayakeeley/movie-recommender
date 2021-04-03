import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public config: Observable<{}>;

  constructor(private httpClient: HttpClient) {
  }

  public getMovies(): Observable<{}> {
    const jsonFile = 'assets/tmdb_5000_movies.json';
    return this.httpClient.get(jsonFile);
  }

  public getConfig(): Observable<{}> {
    const config = 'assets/config.json';
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
