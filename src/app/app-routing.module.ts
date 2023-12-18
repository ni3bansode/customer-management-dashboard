import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AllCustomerComponent } from './all-customer/all-customer.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: 'all-customers',
    component: AllCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'add-customer',
    component: AddCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-customer/:id',
    component: AddCustomerComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'edit-customer/:id',
  //   component: EditCustomerComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
