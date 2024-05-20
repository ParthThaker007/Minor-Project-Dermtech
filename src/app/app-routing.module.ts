// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpPageComponent } from    './components/sign-up-page/sign-up-page.component';
import { DiagnoseComponent } from './components/diagnose/diagnose.component';
import { DiseaseInfoComponent } from './components/disease-info/disease-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect root path to home
  { path: 'home', component: HomeComponent},
  {path:"login", component:LoginPageComponent},
  {path:"signUp", component:SignUpPageComponent},
  {path:'diagnose',component:DiagnoseComponent},
  
  { path: 'info/:disease', component: DiseaseInfoComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


