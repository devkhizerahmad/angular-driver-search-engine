import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
   private allCountriesList = [
      { name: 'Pakistan-PAK'},
      { name: 'India-IND' },
      { name: 'Japan-JPN' },
      { name: 'Nepal-NPL' }, 
      { name: 'Russia-RUS'},
      { name: 'Germany-GER' },
      { name: 'Oman-OMN' },
      { name: 'Turkey-TUR' }, 

    ];

  constructor() { }
   getDataOfAllCountriesList() {
      return this.allCountriesList; 
    }

}
