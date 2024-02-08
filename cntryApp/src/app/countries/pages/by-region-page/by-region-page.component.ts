import { Component, EventEmitter, Output } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  constructor ( private countryService: CountryService ){}

  @Output() onValue = new EventEmitter();

  searchByRegion( term: string ):void {
    this.countryService.searchRegion(term).subscribe(
      countries => {
        this.countries = countries
      }
    );
  }

}
