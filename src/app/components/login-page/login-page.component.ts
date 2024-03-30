import { Component } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AngularFireAuth) {}

  login() {
    console.log('Login button clicked');
    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Login successful
        console.log('User logged in:', userCredential.user);
        // Redirect user or perform other actions
      })
      .catch((error) => {
        // Handle login error
        console.error('Login error:', error);
      });
  }
    
}


