import { Component, OnInit } from '@angular/core';
import * as fromStore from './store';
import * as fromActions from './store/actions';
import { Store } from '@ngrx/store';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public movies: any[];
  constructor(
    private store: Store<fromStore.MoviesState>,
    private papa: Papa,
    private httpClient: HttpClient
  ) {
    const csvUrl = 'assets/tmdb_5000_movies.csv';

    this.httpClient.get(csvUrl, { responseType: 'text' }).subscribe(
      (data) => {
        const options = {
          complete: (result) => {
            this.movies = result.data;
            console.log(result.data);
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

  public ngOnInit(): void {}
}
