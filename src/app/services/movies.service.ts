import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}

  public getMovies(): Observable<string> {
    const csvUrl = 'assets/tmdb_5000_movies.csv';
    return this.httpClient.get(csvUrl, { responseType: 'text' });
  }
}
