import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../services/author.service';
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
        console.error('Failed to fetch books', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];  
  }

  addBook(): void {
    if (!this.newBookTitle || !this.selectedFile) {
      console.error('Book title or image file is missing.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.newBookTitle); 
    formData.append('cover_image', this.selectedFile);  


    this.authorService.addBook(formData).subscribe(
      (response) => {
        console.log('Book added successfully', response);
        this.getBooks();  
      },
      (error) => {
        console.error('Failed to add book', error);
      }
    );
  }

 
  switchMenu(menu: string) {
    this.selectedMenu = menu;
  }
}