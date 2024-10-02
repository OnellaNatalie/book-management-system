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
  successMessage: any;
  errorMessage: any;

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
    console.log(authorId, status);
    
    this.adminService.updateAuthorStatus(authorId, status).subscribe(
      (response) => {

        this.successMessage = `Author status updated to ${status} successfully!`;

        this.getAuthors();
        setTimeout(() => {
          this.successMessage = null;
        }, 3000); 
      },
      (error) => {
        // Handle error
        console.error('Error updating author status:', error);
        this.errorMessage = 'Failed to update author status. Please try again.';
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

}