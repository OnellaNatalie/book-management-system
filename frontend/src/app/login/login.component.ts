import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule , HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';  
  password: string = '';  
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(form: any) {
    const { email, password } = form.value;

    this.authService.login(email, password).subscribe(
        (response) => {
            console.log('Login successful', response);
            localStorage.setItem('token', response.token); 
            localStorage.setItem('user', JSON.stringify({ role: response.role }));
      
        },
        (error) => {
            console.error('Login error', error);
            this.errorMessage = error.error?.error || 'Login failed, please check your credentials.';
        }
    );
}

}