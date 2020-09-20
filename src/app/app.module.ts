import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderComponent } from './order/order.component';
import { RegisterComponent } from './login/register/register.component';
import { LoginComponent } from './login/login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { TokenInterceptorService } from './token-interceptor.service';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatIconModule} from '@angular/material/icon'
import {MatFormFieldModule} from '@angular/material/form-field'
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import {MatStepperModule}  from '@angular/material/stepper'
import {MatDividerModule}  from '@angular/material/divider'
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import {MatListModule} from '@angular/material/list'
import { LegendService, MarkerService, MapsTooltipService, DataLabelService, BubbleService, NavigationLineService, SelectionService, AnnotationsService, ZoomService } from '@syncfusion/ej2-angular-maps';
/**
 * Module
 */
//import { AgmCoreModule } from '@agm/core';


import { NewOrderComponent } from './new-order/new-order.component';
import { GetAddressComponent } from './get-address/get-address.component'



@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NewOrderComponent,
    GetAddressComponent
  ],
  imports: [
    //AgmCoreModule,
    MatDividerModule,
    MapsModule,
    MatListModule,
    MatStepperModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    BrowserModule,
    //AgmCoreModule.forRoot({
      //apiKey: ''
    //}),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  },
  LegendService, MarkerService, MapsTooltipService, DataLabelService, BubbleService, NavigationLineService , SelectionService, AnnotationsService, ZoomService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
