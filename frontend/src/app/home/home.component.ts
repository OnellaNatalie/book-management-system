import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule , HttpClientModule],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books: any[] = [];
  searchTerm: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.getBooks();
  }
  getBooks() {
    this.authService.listBooks().subscribe(
      (data) => {
        this.books = data;
        // console.log("list- books",this.books);
      },
      (error) => {
        // console.error('Error fetching books:', error);
      }
    );
  }
  get filteredBooks() {
    return this.books.filter(book => 
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
