import { Component, EventEmitter, Output } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-contry-page',
  templateUrl: './by-contry-page.component.html',
  styles: ``
})
export class ByContryPageComponent {

  public countries: Country[] = [];

  constructor ( private countryService: CountryService ){}

  @Output() onValue = new EventEmitter();

  searchByCountry( term: string ):void {
    this.countryService.searchCountry(term).subscribe(
      countries => {
        this.countries = countries
      }
    );
  }

}
