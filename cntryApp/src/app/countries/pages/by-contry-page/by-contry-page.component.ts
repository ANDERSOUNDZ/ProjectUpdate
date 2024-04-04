import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-contry-page',
  templateUrl: './by-contry-page.component.html',
  styles: ``
})
export class ByContryPageComponent implements OnInit{

  public countries: Country[] = [];
  public initialValue: string = '';

  constructor ( private countryService: CountryService ){}
  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountries.countries;
    this.initialValue = this.countryService.cacheStore.byCountries.term;
  }

  @Output() onValue = new EventEmitter();

  searchByCountry( term: string ):void {
    this.countryService.searchCountry(term).subscribe(
      countries => {
        this.countries = countries
      }
    );
  }

}
