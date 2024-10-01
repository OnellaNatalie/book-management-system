import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../services/author.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule , HttpClientModule],
  templateUrl: './author-dashboard.component.html',
  styleUrl: './author-dashboard.component.css'
})
export class AuthorDashboardComponent implements OnInit {
  books: any[] = [];
  newBookTitle: string = '';
  selectedFile: File | null = null; 
  selectedMenu: string = 'list-books';  
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authorService: AuthorService, private router: Router) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.authorService.listBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        // console.error('Failed to fetch books', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];  
  }

  addBook(): void {
    if (!this.newBookTitle || !this.selectedFile) {
      // console.error('Book title or image file is missing.');
      this.errorMessage = 'Book title or Cover image is missing.';
      this.successMessage = null
      return;
    }

    const formData = new FormData();
    formData.append('title', this.newBookTitle); 
    formData.append('cover_image', this.selectedFile);  


    this.authorService.addBook(formData).subscribe(
      (response) => {
        // console.log('Book added successfully', response);
        this.successMessage = 'Book added successfully!'; 
        this.errorMessage = null; 
        this.getBooks();  
        this.newBookTitle = '';
        this.selectedFile = null;
      },
      (error) => {
        // console.error('Failed to add book', error);
        this.errorMessage = 'Failed to add book. Please try again.'; 
        this.successMessage = null; 
      }
    );
  }

 
  switchMenu(menu: string) {
    this.selectedMenu = menu;
  }
}