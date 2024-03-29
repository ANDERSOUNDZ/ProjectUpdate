import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountryService {

  private apiurl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  searchCountryAlphaCode(code: string):Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiurl}/alpha/${code}`).
    pipe(
      map( countries => countries.length > 0 ? countries[0]: null ),
      catchError( () => of(null) )
    )
  }

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
