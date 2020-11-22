import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Papa} from 'ngx-papaparse';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient, private papa: Papa) {}

  public getMovies(): any {
    const csvUrl = 'assets/tmdb_5000_movies.csv';

    return this.httpClient.get(csvUrl, { responseType: 'text' }).subscribe(
      (data) => {
        const options = {
          complete: (result) => {
            console.log('Parsed: ', result);
          },
          header: true,
        };
        this.papa.parse(data, options);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
