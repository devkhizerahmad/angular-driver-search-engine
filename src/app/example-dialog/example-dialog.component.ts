import { Component, Inject, inject, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import { LanguageService } from '../services/language.service';




@Component({
  selector: 'app-example-dialog',
  templateUrl: './example-dialog.component.html',
  styleUrls: ['./example-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExampleDialogComponent implements OnInit {
  mainForm: FormGroup;

  getLanguageList: any[] = []
  private defaultLanguage: string = '';
  private allReadyAddedLanguages: any[] = [];
  
  colorList = [
    { value: "#46d78cff", color: "Sea Green" },
    { value: "#D2691E", color: "Chocolate" },
    { value: "#40E0D0", color: "Turquoise" },
    { value: "#F5DEB3", color: "Wheat" },
    { value: "#DA70D6", color: "Orchid" }
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private languageService: LanguageService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExampleDialogComponent>,
  ) {

    this.getLanguageList = this.languageService.getData();
    //console.log(this.getLanguageList);

    //his.defaultLanguage = this.getLanguageList.find(lang => lang.default === true)?.name || '';
    this.defaultLanguage = this.languageService.selectLanguage;
    this.allReadyAddedLanguages.push(this.defaultLanguage);
    // console.log('All Ready Added Languages',this.allReadyAddedLanguages);

    const initialColor = this.colorList[0]?.value;

    this.mainForm = this.fb.group({
      color: [initialColor],
      categories: this.fb.array([this.createCategoryGroup(this.allReadyAddedLanguages[0])])
    });
  }

  ngOnInit(): void {    
    
    console.log("received data of dilog for updates : ", this.data?.dataToUpdate);
    
    if (this.data?.dataToUpdate) {
      
      
      this.forUpdated();
    }

  }
  forUpdated() {

     const dataToPatch = this.data.dataToUpdate; 
    this.mainForm.patchValue({ color: dataToPatch.color });

    let categoryFormArray = this.mainForm.get('categories') as FormArray;
    console.log("categories before:", categoryFormArray.value);
    categoryFormArray.clear();
    console.log("categories after:", categoryFormArray.value);

    if(dataToPatch?.categories){

      dataToPatch.categories.forEach((cat: any) => {
      const newCategoryGroup = this.createCategoryGroup(cat.category.language);

      newCategoryGroup.patchValue({ category: cat.category });

      categoryFormArray.push(newCategoryGroup);

    });
  }

  }

  get categories(): FormArray {
    return this.mainForm.get('categories') as FormArray;
  }

  createCategoryGroup(name: string): FormGroup {
    return this.fb.group({
      category: this.fb.group({ name: [null ,Validators.required], language: [name] }),
    });
  }

  addCategory() {

    const remainingItemsForDefault = this.getLanguageList.filter(item => !this.allReadyAddedLanguages.includes(item.name));
    // console.log("remain list for input :",remainingItemsForDefault);    

    const nextLanguage = remainingItemsForDefault[0];
    //  console.log("next language pass to alreadyadded array ", nextLanguage );

    this.categories.push(this.createCategoryGroup(remainingItemsForDefault[0].name));
    this.allReadyAddedLanguages.push(nextLanguage.name)
  }

  onSubmit() {

    if (this.mainForm.invalid) {
      console.log("for is invalid, form field is required on submit dialog");
      return alert("FIll THE ALL FORM FIELDS!");
      
    }

    const allFormData = this.mainForm.getRawValue();

    if(this.categories.length > 0 ){
 
      allFormData.id = this.data.dataToUpdate ? this.data.dataToUpdate.id : this.data.id;
      //allFormData.id =this.data.id;

      console.log("all Form data :" ,allFormData);
      this.dialogRef.close(allFormData);  

    }     
     this.dialogRef.close(allFormData);
    console.log("raw values :",this.mainForm.getRawValue());
  }

  onClose() {

   if (this.mainForm.invalid) {
      console.log("for is invalid, form field is required on close dialog");
      return alert("FIll THE ALL FORM FIELDS!");
      
    }
    this.dialogRef.close(this.mainForm.getRawValue());
  }
}
