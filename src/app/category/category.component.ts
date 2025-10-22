import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExampleDialogComponent } from '../example-dialog/example-dialog.component';
import { DataSharedService } from '../services/dataShared.service';
import { LanguageService } from '../services/language.service';
import { DeletelenguageService } from '../services/deletelenguage.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

    submittedCategories: any[] = [];
    defaultSubmittedCategories: any[] = [];
    onChangeShowDefaultLang: any;
    selectLang: any;
     constructor(
        private dialog: MatDialog,
        private dataShared: DataSharedService,
        private languageService: LanguageService,
        private deleteLanguage: DeletelenguageService       
      ) { 
        this.selectLang = this.languageService.selectLanguage
        this.onChangeShowDefaultLang = this.selectLang;
        this.dataShared.headerData$
        .subscribe(data => {
           this.selectLang = data
        })
      }

openUpdateDialog(catDataForUpdate: any): void {
  console.log("cat data for updated :", catDataForUpdate);
  this.dataShared.updateAuthenticationStatus(true);

  const updateDialogRef = this.dialog.open(ExampleDialogComponent, {
        data: {dataToUpdate: catDataForUpdate},
        panelClass: 'custom-dialog-container',
        width: '600px',
        height: '500px'
    });
updateDialogRef.afterClosed()
   .subscribe((result) =>
   {    
     if (result) 
      { 
        const updatedId = result.id;
         console.log("before updated SC :", this.submittedCategories, "and result : ", result, "updated color :", updatedId);
          
         this.submittedCategories = this.submittedCategories.map(item => {
            
            const isMatch = item.id === updatedId;
            
            console.log("isMAtch :",isMatch , "item :", item);
            
            if (isMatch) {
              return result;
            } else {                       
              return item;
            }
          });
          console.log("Updated submitted categories:", this.submittedCategories);            
      }
   });
}

deleteItem(catDataForDel: any) {
  console.log("cat data for delete :", catDataForDel);
  this.submittedCategories = this.deleteLanguage.del(this.submittedCategories, catDataForDel);
}
  openDialog(): void {
     this.dataShared.updateAuthenticationStatus(true); 

     const dialogRef = this.dialog.open(ExampleDialogComponent,
      {
        panelClass: 'custom-dialog-container',
         width: '600px',
         height: '500px',
         data: {id: this.submittedCategories.length +1}
        } );    
    
        dialogRef.afterClosed()
        .subscribe((result) =>
          {    
            if (result) 
            {      
              
              this.submittedCategories.push(result);   
              console.log("updated submitted cat :", this.submittedCategories);
              
            }
          }
        );
      }  
someText: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat architecto fuga eius mollitia beatae facilis nemo ducimus. Molestias neque sapiente, ad temporibus facilis consequatur. Voluptatem sunt nesciunt nemo ea temporibus!';
}



