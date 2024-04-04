import { RegionCountries } from './../interfaces/cache-store.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, pipe, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiurl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('CacheStorage', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('CacheStorage')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('CacheStorage')!);
  }

  private getCountriessRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError(() => of([]))
      //delay(2000),
    );
  }

  searchCountryAlphaCode(code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiurl}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiurl}/capital/${term}`;
    return this.getCountriessRequest(url).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCapital = { term: term, countries: countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiurl}/name/${term}`;
    return this.getCountriessRequest(url).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCountries = { term: term, countries: countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchRegion(term: Region): Observable<Country[]> {
    const url = `${this.apiurl}/region/${term}`;
    return this.getCountriessRequest(url).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byRegion = { region: term, countries: countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }
}
