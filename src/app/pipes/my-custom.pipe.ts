import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomPipe'
})
export class MyCustomPipe implements PipeTransform {
  

  transform(catValue: any, selectLang: string): any {

    //console.log("value of cat in pipe :", catValue, "selected Language :", selectLang);  

    //onChangeShowDefaultLang = catValue.categories[0].category.name;

    const foundData = catValue.categories.find((item: any) => 
      item.category.language === selectLang);
      //console.log("new data according to selected option value: ", foundData);  
      return foundData?.category?.name || catValue.categories[0].category.name;       

  }
  

}


