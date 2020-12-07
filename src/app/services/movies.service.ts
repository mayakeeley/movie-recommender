import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}

  public getMovies(): Observable<string> {
    const jsonFile = 'assets/tmdb_5000_movies.json';
    return this.httpClient.get(jsonFile, { responseType: 'text' });
  }
}
