import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

export const routes: Routes = [
{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
},
{
    path: 'login',
    component: LoginComponent
},
{
    //path: '',
    //component: LayoutComponent,
    //children: [
       // {
            path: 'dashboard',
            component: DashboardComponent
       // }
    //]
},
{
    //path: '',
    //component: LayoutComponent,
    //children: [
       // {
            path: 'home',
            component: HomeComponent
       // }
    //]
},
{
    path: 'edit/:id',
    component: EditComponent
},
{
    path: 'register',
    component: RegisterComponent
},
{
    path: 'resetpassword/:id',
    component: ResetpasswordComponent
}


];
