import { Injectable } from '@angular/core';
import { DataSharedService } from './dataShared.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService { 

    selectLanguage: any = '';      
  
    private allLanguageList = [
      { name: 'English', default: false },
      { name: 'Urdu',    default: false },
      { name: 'Punjabi', default: false },
      { name: 'Arabic',  default: false },
      { name: 'Spanish', default: false },
      { name: 'Japan',   default: false },
      { name: 'Russia',  default: false },
      { name: 'German',  default: true  },
      { name: 'Chinese', default: false },
      { name: 'Latin',   default: false },
    ];
    
  
   constructor(private datashared: DataSharedService) {
  
    this.selectLanguage = this.allLanguageList
    .find(lang => lang.default === true)?.name || '';
     console.log("default lenguage in service :", this.selectLanguage);
  
       this.datashared.headerData$
       .subscribe(data => {
         this.selectLanguage = data; //every selected laguage is change this will subscribe into data variable ab selectLang variable who will be updated on every change
          console.log("select language value :", 
         this.selectLanguage);    

          })    
  }
    getData() {
      return this.allLanguageList; 
    }
}
