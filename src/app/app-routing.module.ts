import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { GetAddressComponent } from './get-address/get-address.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';
import { NewOrderComponent } from './new-order/new-order.component';


const routes: Routes = [
 
  {path:'login',component:LoginComponent,},
  {path:'',component:HomeComponent,canActivate:[AuthGuard], children:[
    {path:'order',component:NewOrderComponent,canActivate:[AuthGuard]},
    {path:'checkout',component:GetAddressComponent,canActivate:[AuthGuard]}],
  },


 

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
