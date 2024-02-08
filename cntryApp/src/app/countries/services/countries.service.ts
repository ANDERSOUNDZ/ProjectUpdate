import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountryService {

  private apiurl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  searchCapital(term: string): Observable<Country[]> {

    return this.httpClient.get<Country[]>(`${this.apiurl}/capital/${term}`).
    pipe(
      catchError( () => of([]) )
    );
  }

  searchCountry(term: string): Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.apiurl}/name/${term}`).
    pipe(
      catchError( () => of([]) )
    );
  }

  searchRegion(term: string): Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.apiurl}/region/${term}`).
    pipe(
      catchError( () => of([]) )
    );
  }

}
