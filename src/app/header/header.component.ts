import { Component, OnInit } from '@angular/core';
import { DataSharedService } from '../services/dataShared.service';
import { LanguageService } from '../services/language.service';


@Component({
 selector: 'app-header',
 templateUrl: './header.component.html',
 styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
 getLanguageList : any [] = [];
 selectedLanguageDisplay: string = '' ;
 constructor(private languageService: LanguageService, private dataShared: DataSharedService){ 
  
      this.getLanguageList = this.languageService.getData();
      console.log(this.getLanguageList);
      
      this.selectedLanguageDisplay = this.languageService.selectLanguage;   
      console.log(this.languageService.selectLanguage);
      
 }

ngOnInit(): void {

 this.dataShared.dialogData$.subscribe(data => {
 console.log("Received data in HeaderComponent :",data);
       
});
}

onChange(selectedLanguageValue : any) {

    console.log('Selected value:', selectedLanguageValue);

    this.dataShared.sendDataFromHeader(selectedLanguageValue);

}

onLogin(){
    alert('login successfully!');    
}
onSignup(){
    alert('SignUp successfully');
    
}

}

