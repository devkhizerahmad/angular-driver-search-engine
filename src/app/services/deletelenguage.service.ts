import { afterNextRender, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeletelenguageService {

  constructor() { }
   del( submittedCategories: any []  ,catDelForData: any): any [] {
    console.log(" submittedCategories before deletion:", submittedCategories);
    console.log(" catDataForDel item to delete:", catDelForData);

    const getNameToDelete = catDelForData.categories[0].category.name;
    console.log(" Name to delete:", getNameToDelete);

    const delSubmittedCategoriesList =  submittedCategories

    .filter(submittedCat => 
      {
       const delcategory = submittedCat.categories.some((innerCategory: any) => {
        return innerCategory.category.name === getNameToDelete;
      });
     
      return !delcategory;
    });
    console.log(" updatedCategories after deletion:", delSubmittedCategoriesList);
    
    return delSubmittedCategoriesList; 
  }
  }
