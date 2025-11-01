import { Component, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';



import { MatMenuModule } from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { ExampleDialogComponent } from './example-dialog/example-dialog.component';

import { HeaderComponent } from './header/header.component'
import { MatDialogModule } from '@angular/material/dialog';

import { DataSharedService } from './services/dataShared.service';
import { CategoryComponent } from './category/category.component';
import { MyCustomPipe } from './pipes/my-custom.pipe'
import { RouterModule, Routes } from '@angular/router';
import { DriverRecordComponent } from './driver-record/driver-record.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import {DatepickerMinMaxExample} from './app/datepicker-min-max-example';

import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LangCatComponent } from './lang-cat/lang-cat.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './driver-record/home/home.component';
import { TruckRecordComponent } from './truck-record/truck-record.component';
import { BrowserModule } from '@angular/platform-browser';
import {MatStepperModule} from '@angular/material/stepper';
import { AllrecordComponent } from './allrecord/allrecord.component';
import { LayoutdesignComponent } from './layoutdesign/layoutdesign.component';
  


const routes: Routes = [
  { path: 'DriverRegistration', component: DriverRecordComponent },
  { path: '', redirectTo: '/driverAllRecord', pathMatch: 'full' },
  { path: 'DriverRecord', component: HomeComponent }, 
  { path: 'Categories', component: LangCatComponent },
  { path: 'TruckContainerRecord', component: TruckRecordComponent},
  { path: 'driverAllRecord', component: AllrecordComponent},
  { path: 'LayoutDesign', component: LayoutdesignComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ExampleDialogComponent,
    CategoryComponent,
    HeaderComponent,
    MyCustomPipe,
    DriverRecordComponent,
    LangCatComponent,
    HomeComponent,
    TruckRecordComponent,
    AllrecordComponent,
    LayoutdesignComponent,
    
    


  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatTableModule,
    MatStepperModule,
    FormsModule

  ],
  providers: [DataSharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }