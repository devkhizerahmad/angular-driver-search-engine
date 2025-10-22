import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title: string = 'my-dialog-app';
  // submittedCategories: any[] = [];
  // getLanguageList: any []= [];


  // constructor(private langList: LanguageData ) {
  //   this.getLanguageList = this.langList.getData();
  //   console.log(this.getLanguageList);    
  // }

  // openDialog() {
  //   const dialogRef = this.dialog.open(ExampleDialogComponent,
  //     {
  //       panelClass: 'custom-dialog-container', 
  //       width: '600px', 
  //       height: '500px', 
  // }
  //   );

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       console.log("before push :",this.submittedCategories);
        
  //       this.submittedCategories.push(result);
  //       console.log("after push :", this.submittedCategories);
        
  //       console.log("result", result);
  //     }
  //   });
  // }
}