import { Component } from '@angular/core';
import { RouterOutlet,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Book Management System';
  getUser: any;
  destroy: any;
  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.getUser = this.authService.getUser();
    // console.log("user",this.getUser);
  }
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  logout(){
    localStorage.clear(); // Clear local storage
    this.authService.setAuth(false); // Update auth state
    this.router.navigate(['/login']); 
  }

}