import { Component } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  
  

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    try {
      const result = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      console.log(result);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Login error:', error); 
  }
}
}
