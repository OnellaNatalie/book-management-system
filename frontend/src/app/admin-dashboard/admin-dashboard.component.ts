import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule , HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  authors: any[] = [];
  books: any[] = [];
  selectedAuthorId: number | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAuthors();
    this.getBooks();
  }

  getAuthors() {
    this.adminService.listAuthors().subscribe(
      (data) => {
        this.authors = data;
        console.log(this.authors);
      },
      (error) => {
        // console.error('Error fetching authors:', error);
      }
    );
  }

  updateAuthorStatus(authorId: number, status: string) {
    console.log(authorId,status);
    this.adminService.updateAuthorStatus(authorId, status).subscribe(
      (response) => {
        // console.log('Author status updated:', response);
        this.getAuthors();
      },
      (error) => {
        // console.error('Error updating author status:', error);
      }
    );
  }

  getBooks() {
    this.adminService.listBooks().subscribe(
      (data) => {
        this.books = data;
        // console.log("list- books",this.books);
      },
      (error) => {
        // console.error('Error fetching books:', error);
      }
    );
  }

  getBooksByAuthor(authorId: number) {
    this.adminService.listBooksByAuthor(authorId).subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        // console.error('Error fetching books by author:', error);
      }
    );
  }
}