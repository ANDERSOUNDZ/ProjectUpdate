import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountryService {

  private apiurl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  private getCountriessRequest(url: string): Observable<Country[]>{
    return this.httpClient.get<Country[]>(url).pipe(
      catchError(() => of([])),
      //delay(2000),
    );
  }

  searchCountryAlphaCode(code: string):Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiurl}/alpha/${code}`).
    pipe(
      map( countries => countries.length > 0 ? countries[0]: null ),
      catchError( () => of(null) )
    )
  }

  searchCapital(term: string): Observable<Country[]> {

    const url = `${this.apiurl}/capital/${term}`;
    return this.getCountriessRequest(url);
  }

  searchCountry(term: string): Observable<Country[]>{
    const url = `${this.apiurl}/name/${term}`;
    return this.getCountriessRequest(url);
  }

  searchRegion(term: string): Observable<Country[]>{
    const url = `${this.apiurl}/region/${term}`;
    return this.getCountriessRequest(url);
  }

}
