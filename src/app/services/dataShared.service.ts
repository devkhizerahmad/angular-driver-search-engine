import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataSharedService {

  private dialogDataSubject = new Subject<any>();
  private headerDataSubject = new Subject<any>(); 

  public dialogData$: Observable<any> = this.dialogDataSubject.asObservable();
  public headerData$: Observable<any> = this.headerDataSubject.asObservable(); 
  private _authenticationStatus = new BehaviorSubject<boolean>(false);

  submittedLanguages: any[] = [];

  constructor() {}

  sendDataFromDialogOfSelectedLanguages(data: any) {

    this.dialogDataSubject.next(data);
    this.submittedLanguages.push( data.categories);
   // console.log("Submitted Languages in service :", this.submittedLanguages);
    
  }

  sendDataFromHeader(data: any) { 

    this.headerDataSubject.next(data);
    console.log("header data in service :", data);
  }

  updateAuthenticationStatus(status: boolean) {
    this._authenticationStatus.next(status);
  }

}